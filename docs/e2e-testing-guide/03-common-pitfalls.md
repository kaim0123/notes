[← 02-architecture.md](./02-architecture.md) | [README](./README.md) | 次: [04-code-quality.md](./04-code-quality.md)

# 第3部: 複数アプリに共通する「よくある不具合」とそれを防ぐテスト関数の型

## 3.1 非同期待ちの事故 — 待ち方4パターン

twentyの `03-test-design-guide.md` 4章がこの節の核です。**このプロジェクトで一番事故りやすい**と明記されている領域で、独立したn8nでもほぼ同一のパターンが使われています。

### パターンA: GraphQL/APIのレスポンスを操作名で待つ

```typescript
// twenty
const [createWorkflowResponse] = await Promise.all([
  page.waitForResponse(async (response) => {
    if (!response.url().endsWith('/graphql')) return false;
    const requestBody = response.request().postDataJSON();
    return requestBody.operationName === 'CreateOneWorkflow';
  }),
  createWorkflowButton.click(), // クリックとwaitForResponseを同時に開始するのが重要
]);
```

**急所は `Promise.all` で同時に開始すること**です。`click()` を先に `await` してから `waitForResponse` を呼ぶと、レスポンスがクリックより早く返ってきた場合に待ち漏れが起きます。n8nでも全く同じ形が使われています(`TEST_DESIGN_GUIDE.ja.md` 7章):

```typescript
// n8n(twentyと独立に同じパターンに到達している)
await Promise.all([
  this.n8n.page.waitForResponse('**/rest/projects/*'),
  this.n8n.page.getByTestId('navigation-menu-item').filter({ hasText: 'Project' }).click(),
]);
```

### パターンB: URL遷移を待つ

```typescript
await page.waitForURL(/\/object\/person\//);
await page.waitForURL('**/workspace-activation', { timeout: 90000 }); // 環境依存で時間がかかる遷移はtimeoutを個別に伸ばす
```

### パターンC: 複数候補のどれかを待つ(分岐のあるUI)

```typescript
// 環境設定によって表示されるステップが変わる場合、.or()で複数候補をまとめて待つ
await expect(
  syncEmailsHeading.or(installAppsHeading).or(createProfileHeading),
).toBeVisible({ timeout: 90000 });
```

### パターンD: 個別ネットワークリクエストを待つ(GraphQL以外)

```typescript
await Promise.all([
  page.getByTestId('hide-group-').click(),
  page.waitForRequest((req) => req.url().includes('/metadata') && req.method() === 'POST'),
]);
```

**アンチパターン**: `page.waitForTimeout(1000)` のような固定時間待ちは、twenty・n8n両方の既存コードに一件も存在しません。両アプリの設計ガイドが明示的に「書かないこと」と述べており、独立に同じ結論に達しています。固定時間待ちがなぜダメかは3.6節(フレーキーテストの原因)で詳述します。

## 3.2 テスト間データ汚染を防ぐ

CIではリトライが有効な場合が多く(documenso: CI4回、twenty: CI2回)、**同じテストが同じデータで複数回動いても壊れない**設計が必須です。

| 手法 | 使う場面 | 実装例 |
|---|---|---|
| ランダム値 | メールアドレス等 | twenty: `Math.random().toString(36).substring(2, 10)` / `randomUUID()` |
| タイムスタンプ | ラベル・名前 | twenty: `Date.now()` サフィックス(コメントで「リトライで同名フィールドが重複し保存できなくなる」という理由を明記) |
| nanoid | 並列実行時の衝突回避 | n8n: `Test Workflow ${nanoid()}` |
| 一意なIDを使ったブラウザコンテキスト分離 | 別ユーザーとしての操作検証 | n8n: `n8n.start.withUser(member)` |

**test.describe.serial の扱いが2アプリで対立している点は重要な教材です**:

- **twenty**は積極的に使う(`create-kanban-view.spec.ts`: 「1. Select型カスタムフィールドを作成」→「2. そのフィールドを使ってカンバンビューを作成」という依存関係のある2ステップを順序保証)
- **n8n**は明確なアンチパターンとして掲載(`TEST_DESIGN_GUIDE.ja.md` 9章): 「1つの失敗が後続すべてを失敗させる」

一見矛盾していますが、理由は[02-architecture.md](./02-architecture.md) 2.8節の並列度設計に遡ります。twentyは元々 `workers: 1` で**全体が直列実行される前提**のアプリなので、テスト間の依存を許容しても実行モデルと矛盾しません。n8nは**並列実行が前提**のアプリなので、依存関係を作ると並列実行の利点を損ない、1つの失敗が連鎖します。**「serialを使うべきか」という問いには単独の正解がなく、そのプロジェクトの並列実行モデル全体と整合しているかで判断する**、というのがここから学べる教訓です。

## 3.3 権限・データ漏洩を防ぐテストの型

documensoの `documents/find-documents.spec.ts`(38件)や `teams/search-documents.spec.ts`(4件)は、一貫して「**個人/チームコンテキストでのデータ分離(リークなし)**」を検証しています。観点は概ね次の形に整理できます。

1. Aユーザー(またはAチーム)が作成したデータが、Bユーザー(Bチーム)の一覧・検索に**表示されないこと**
2. Aユーザーのデータに、Bユーザーが**直接URL/API経由でもアクセスできないこと**(`test-unauthorized-document-access.spec.ts` 等)
3. 一括操作(bulk actions)でチーム跨ぎの選択が**リークしないこと**(`bulk-document-actions.spec.ts`)

n8nでは同じ検証を、UIレベルではブラウザコンテキストの完全分離(`withUser`)で、機密情報については**専用ディレクトリを切り出す**ことで表現しています。`tests/e2e/redaction-enforcement/` はわずか1specしかありませんが、これは網羅性の低さではなく「セキュリティ上ここだけは絶対に落とせない」という単一責務の意図的な切り出しです(`TEST_PERSPECTIVES.ja.md` 2章)。**観点表を見るとき、spec数の多寡だけでなく「なぜこのディレクトリが単独で切られているか」を推測しながら読む**ことが推奨されています。

## 3.4 レースコンディション・二重実行・レート制限の検証法

タイミングに依存するエッジケースは、3アプリで独立に扱われています。

- **documenso** `envelope-recipient-autosave-race.spec.ts`: ネットワーク遅延を意図的に注入した状態での、受信者オートセーブの競合状態を検証
- **documenso** `recipient/report-sender.spec.ts`: 送信者通報機能の**レート制限窓内での二重カウント防止**
- **cal.diy** `booking-duplicate-api-calls.e2e.ts`: イベントタイプページの初回表示時に、空き時間取得APIが不要に重複呼び出しされていないかを検証。これは機能バグの検証というより**パフォーマンス回帰を防ぐE2E**という毛色の異なるテストで、「合計呼び出し回数が1回以下であること」をネットワークリクエストの監視によって直接アサーションしています
- **cal.diy** `booking-pages.e2e.ts`(観点No.17-18): 2つの独立したブラウザコンテキストを使い、片方がタイムスロットを選択すると、もう片方からはそのスロットが除外される(一時ロック)ことを検証。フォームから離脱すればロックが解除され、再度選択可能になることも合わせて確認

**教材としての要点**: レースコンディションのテストには、共通して「2つの独立した実行主体(別ブラウザコンテキスト、または遅延注入)を用意し、片方の状態変化がもう片方にどう見えるか」を検証するという型があります。これはUIテストとしては手間がかかりますが、実際の不具合が最も出やすい領域でもあるため、documenso・cal.diyともに専用のテストファイルを割いています。

## 3.5 ビジュアルリグレッションが要る場面・不要な場面

documenso `TEST_DESIGN.md` 5.6章にある通り、`envelope-alignment.spec.ts` / `envelope-overflow.spec.ts` / `cert-page-dimensions.spec.ts` は `pixelmatch`/`pngjs` を使い、`visual-regression/` のベースラインPNGとレンダリング結果を比較しています。

これらはいずれも**PDF上のフィールド配置**という、ピクセル単位の正確性そのものが仕様であるドメインに限定されています。他の大多数のUIテスト(documenso自身の他のテストも含む)は通常のDOMアサーション(`toBeVisible()`等)で十分としており、ビジュアルリグレッションを乱用していません。

**判断基準**: 「見た目が仕様通りか」を確認したいだけならDOM/テキストアサーションで足ります。ビジュアルリグレッションが必要になるのは、**配置座標・レイアウト崩れ・印刷/PDF出力**のように、DOM構造からは検証しきれない「ピクセル単位の正しさ」自体が機能要件であるときだけです。導入コストが高い(ベースライン画像の管理、環境依存のフレーク)ため、対象を絞り込む判断がdocumensoから読み取れます。

## 3.6 フレーキーテストの典型原因と対策

n8nの `TROUBLESHOOTING.ja.md` は短いドキュメントですが、フレーキーテストの原因分析として非常に具体的です。

**問題**: ホバー/ツールチップのテストが並列実行時に不安定になる

**根本原因**:
> 複数のテストが並列実行されると、ブラウザに負荷が集中し、パフォーマンスを維持するためにマウスイベントの統合や遅延を始める。ページ読み込みとは異なり、ホバー操作は小さく優先度の低いイベントの連鎖を発生させるため、システムに負荷がかかっている状況では遅延したり結合されたりしやすい。

具体的には、負荷がかかった状況で①複数の`mousemove`/`pointermove`イベントが1つに統合される、②レンダリングパイプラインが滞る、③ブラウザがフレームをスキップしツールチップの表示タイミングが予測不能になる、という現象が起きます。

**解決策**: これらのテストはブラウザのイベントループが過負荷にならないよう**直列で実行する**。

**教材としての要点**: フレーキーの多くは「タイミング」に起因しますが、原因は「待ち方が甘い」だけとは限りません。この例のように**負荷状況によってブラウザ自体の挙動(イベント統合)が変わる**ケースは、`waitForTimeout`を増やしても再現性のある解決にならず、根本原因(並列実行による負荷)に対処する必要があります。3.1節のアンチパターン(固定時間待ち禁止)と、この節の教訓は表裏一体です — **固定時間待ちで誤魔化せる不安定性は少なく、多くは実行モデル(並列度)自体を見直す必要がある**、というのが4アプリを通じて一貫したメッセージです。

## 3.7 Locatorの選び方の優先順位

twentyの `03-test-design-guide.md` 3章にある優先順位が最も明確です。

1. `page.getByRole('button'|'link'|'textbox'..., { name: '...' })` — アクセシビリティツリーに基づく、最も壊れにくい選択方法。第一候補
2. `page.getByTestId('...')` — role/textで一意に取れない要素、コンポーネント全体を掴みたい場合
3. `page.getByPlaceholder('...')` / `page.getByLabel('...')` — フォーム入力欄
4. `page.getByText('...')` — 最終手段。`{ exact: true }` や `.first()`/`.nth()` で曖昧さを解消する必要がある
5. CSS/クラスセレクタ — **サードパーティ製UIライブラリで他に手段がない場合のみ**の最終手段。twentyの`loginPage.ts`にある `previewImageButton = page.locator('.css-1qzw107')` には `// TODO: fix` コメントが付いており、避けるべきパターンとして明示的に扱われています

n8nは同じ優先順位を明文化してはいませんが、`data-test-id`のkebab-case規約を敷いた上で、**janitorの `selector-purity` ルールがテスト/Composable内での生ロケーター使用そのものを機械的に禁止する**、という別のアプローチを取っています([04-code-quality.md](./04-code-quality.md) 参照)。「優先順位をガイドラインとして書く」か「機械的に生ロケーターを禁止する」かの違いはありますが、狙いは同じ — **生ロケーターがテストコードに散らばることを防ぐ**ことです。

## 3.8 アンチパターン集(横断まとめ)

n8nの `TEST_DESIGN_GUIDE.ja.md` 9章の表に、他アプリの事例を合流させた統合版です。

| ❌ Bad | ✅ Good | 理由 | 出典 |
|---|---|---|---|
| `page.getByTestId('ndv-close-button').click()` をテスト内に直接書く | Page Objectにメソッドを追加してテストから呼ぶ | 生ロケーターの散乱でUI変更時の修正箇所が爆発する | n8n |
| 業務ロジックをPage Objectに書く(`handlePinnedNodesConfirmation`等) | Page Objectは単純操作のみ、業務ロジックはComposableへ | 関心の分離が崩れ再利用しづらくなる | n8n |
| 過度に特化したメソッド(`createAndSaveNewCredentialForNotionApi`) | 汎用的な小メソッドに分解 | 特化しすぎると別シナリオで再利用できない | n8n |
| `await page.waitForTimeout(2000)` | `waitForResponse()` / `toBeVisible()` 等の状態待機 | 固定時間待機はフレーキーの温床(3.6節) | n8n / twenty(既存コードに一件も存在しない) |
| 並列実行前提のプロジェクトで `test.describe.serial` を使う | 各テストが独立してセットアップする | 1つの失敗が後続すべてを失敗させる(3.2節) | n8n |
| CSSクラスセレクタを安易に使う | `getByRole`/`getByTestId`を優先(3.7節) | サードパーティ製UIの内部実装に依存し壊れやすい | twenty |
| UIクリックでテスト前提データを作る | API直接シード([02-architecture.md](./02-architecture.md) 2.6節) | 遅く、UI変更に巻き込まれて壊れやすい | 全アプリ共通 |
| データ削除の後片付けをテスト成功時のみ行う | `finally`ブロックまたはfixture teardownで、失敗時も必ず実行 | アサーション失敗時にデータが残り続け、以降のテストを汚染する | twenty(`workflow-creation.spec.ts`の`try/finally`パターン) |

---
[← 02-architecture.md](./02-architecture.md) | [README](./README.md) | 次: [04-code-quality.md](./04-code-quality.md)
