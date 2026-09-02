[← 01-test-design-docs.md](./01-test-design-docs.md) | [README](./README.md) | 次: [03-common-pitfalls.md](./03-common-pitfalls.md)

# 第2部: 理想的なディレクトリ構造とアーキテクチャ

## 2.1 1ファイルに全部書くとなぜ壊れるか

E2Eテストを書き始めた最初の数ファイルは、1つの `.spec.ts` にロケーター定義・操作・アサーションを全部書いても問題になりません。しかし4アプリとも共通して、テスト数が数十〜数百に増えるにつれて次の3つの事故が起き、それを防ぐために構造化しています。

- **生ロケーターの散乱**: 同じ要素を取得するコードが複数ファイルに重複し、UI変更時の修正箇所が爆発する(n8nのjanitorが `deduplication` ルールとして機械的に検出するほど、実際に起きる問題)
- **業務ロジックの重複**: 「ワークフローを保存して通知を待つ」のような複数手順が、テストごとにコピペされる
- **セットアップ地獄**: 前提データをUI操作で毎回作ると、テストが遅く・不安定になる

4アプリすべてが、テスト本体(`*.spec.ts`)と、要素操作(Page Object)・複合フロー(Fixture/Composable)・API直接操作を別ディレクトリに分離しているのは、偶然ではなくこの3つの事故に対する共通の対策です。

## 2.2 レイヤー分解の共通パターン

最も明示的にレイヤーを定義しているのはn8nです(`TEST_DESIGN_GUIDE.ja.md` 1章)。

```
UIテスト(4層)                          APIテスト(2層)
Tests (*.spec.ts)                      Tests (*.spec.ts)
    ↓ uses                                 ↓ uses
Composables (*Composer.ts)             API Services (ApiHelpers)
    ↓ orchestrates
Page Objects (*Page.ts)
    ↓ extends
BasePage
```

判断基準も明文化されています:

- これは1画面の中の単純な操作か? → **Page Object**のメソッドとして追加
- 複数ページ/複数手順にまたがる業務フローか? → **Composable**として追加
- UIを介さずAPIだけで完結する検証か? → **API Services**を使う
- アサーションそのものか? → **Test本体**に書く。Page Object/Composableにアサーションを埋め込まない

twenty・documensoは同じ発想を、より薄い2層(POM + fixture / operational helper)で実現しています。

| レイヤー | n8n | twenty | documenso |
|---|---|---|---|
| テスト本体 | `tests/e2e/**/*.spec.ts` | `tests/*.spec.ts` | `e2e/**/*.spec.ts` |
| 複合業務フロー | Composable(`*Composer.ts`) | フォルダ専用`fixture.ts`(POM注入)、`lib/fixtures/blank-workflow.ts`(データ作成+削除を1ファイルに) | `fixtures/envelope-editor.ts`(407行、エディタの「開き方」を型で抽象化) |
| 画面操作 | Page Object(`*Page.ts`) | POM(`lib/pom/`、1画面/1セクション=1クラス) | 専用クラスはなく`fixtures/*.ts`の関数群として存在 |
| API直接操作 | API Services(`services/api-helper.ts`) | `lib/requests/`(GraphQL直叩き) | `fixtures/api-seeds.ts`(882行、最大のヘルパーファイル) |
| 共通基盤 | `BasePage` | `lib/pom/helper/` | `fixtures/generic.ts` |

**教材としての要点**: n8nの4層(Composable/PageObject分離)とdocumensoの薄い1層(操作関数の集合)は対極に見えますが、これは規模の違いに対応しています。n8nは`tests/e2e/`だけで56ドメインに分かれる巨大なアプリなので、業務フロー(Composable)と画面操作(PageObject)を明確に分離しないと保守できません。documensoは1つの`fixtures/`ディレクトリ内で用途別にファイルを分ける程度で足りています。**「4層に分けるべきか」ではなく「今の規模でどこまで分離コストに見合うか」で判断する**、というのが4アプリを横断して見えてくる結論です。

## 2.3 ディレクトリ別「何を防ぐためのものか」対応表

| 役割 | twenty | n8n | documenso | cal.diy | 防いでいる事故 |
|---|---|---|---|---|---|
| テスト本体 | `tests/*.spec.ts` | `tests/e2e/**/*.spec.ts` | `e2e/**/*.spec.ts` | `*.e2e.ts` | — |
| 画面要素操作 | `lib/pom/` | `pages/*Page.ts` | (fixtures内の関数) | (テスト内に直接、または`playwright/lib`) | ロケーター散乱・UI変更時の修正箇所爆発 |
| 複合業務フロー | フォルダ専用`fixture.ts` | `composables/*Composer.ts` | `fixtures/envelope-editor.ts`等 | `playwright/fixtures/` | 複数手順の重複コピペ |
| API直接シード/クリーンアップ | `lib/requests/` | `services/api-helper.ts` | `fixtures/api-seeds.ts` | (constants/フィクスチャ内) | UI操作起点のセットアップの遅さ・不安定さ |
| 型定義 | `lib/types/` | `Types.ts` | (TypeScript推論に依存) | — | 型の暗黙的な不一致 |
| 認証状態の使い回し | `tests/login.setup.ts` + `storageState` | タグ宣言(`@auth:*`)+ fixture | `fixtures/authentication.ts`(API直叩きログイン) | — | 全テストでログインUIを毎回通す遅さ |
| 設定 | `playwright.config.ts`(2 projects) | `playwright.config.ts` + `playwright-projects.ts`(CONTAINER_CONFIGS) | `playwright.config.ts`(3 projects: api/license/ui) | `playwright.config.ts` | 並列度・共有リソースの取り違え |
| テストコード自体の品質監査 | なし | `packages/testing/janitor` | なし | なし | アーキテクチャ違反の見逃し([04-code-quality.md](./04-code-quality.md)) |

最後の行が示す通り、**テストコード自体を静的解析する仕組みを持つのはn8nだけ**です。これは規模(56ドメイン超・数百specファイル)に達したプロジェクト特有の投資であり、小規模なうちから導入する必要はありませんが、「テストが増えたらテストコード自体の品質管理が要る」という到達点として覚えておく価値があります。

## 2.4 Page Objectのメソッドは何種類作るべきか

n8nの `TEST_DESIGN_GUIDE.ja.md` 3章が最も明確に言語化しています。Page Objectのメソッドは**3種類しか作らない**というルールです。

```typescript
// 1. Element Getter — asyncなし、Locatorを返すだけ
getExecutionItems(): Locator {
  return this.page.locator('div.execution-card');
}

// 2. Simple Action — async、voidを返す、動詞で始める
async clickDebugInEditorButton(): Promise<void> {
  await this.clickButtonByName('Debug in editor');
}

// 3. Query Method — async、データを返す
async getWorkflowCount(): Promise<number> { ... }
```

アンチパターンとして明示されているのが、**業務ロジックを含むメソッドをPage Objectに書くこと**です。

```typescript
// ❌ Page Objectに書くべきではない(業務ロジックを含む)
async handlePinnedNodesConfirmation(action: 'Unpin' | 'Cancel'): Promise<void> {
  // ダイアログの内容によって分岐する業務ロジック → Composableへ
}
```

この規律により、**テストコードを読むだけで「これはロケーター取得なのか、操作なのか、問い合わせなのか」が型シグネチャから即座に分かる**という効果が得られます(`async`の有無、戻り値の型で判別可能)。

twentyのPOM(`lib/pom/`)には同じ3分類の明文化はありませんが、「1画面 or 1セクション = 1クラス、コンストラクタでLocatorをまとめて定義、操作はメソッドとして生やす」という設計は実質的に同じ分離を実現しています。違いは、twentyでは業務ロジック(複数手順にまたがるもの)をフォルダ専用の`fixture.ts`側に置く、という置き場所の違いだけです。

## 2.5 Fixtureの重ね方・責務分割

Playwrightのfixtureは `base.extend()` で積み重ねられますが、3アプリでそれぞれ違う重ね方をしています。

**twenty**: 3段階の明示的な階層(`01-architecture.md` 4章)

```
@playwright/test の test
   └─ lib/fixtures/screenshot.ts の test    ← 全テスト共通(auto:true)
        └─ tests/authentication/fixture.ts の test  ← フォルダ専用(POM注入)
```

`auto: true` のfixtureは明示的に呼ばなくても全テストの前後に自動実行される(`beforeEach`/`afterEach`相当)ため、**全テストに影響する変更は慎重に**、と設計ガイドで釘を刺されています。

**n8n**: worker scope と test scope の使い分け(`TEST_PERSPECTIVES.ja.md` 5章)

> コンテナ(`n8nContainer`)やそのURLは worker(並列実行の1プロセス)単位で1つだけ作られ、複数テストで共有される。テストごとに作り直すと遅すぎるため。

さらに `Capability` によるオプトイン機能(`test.use({ capability: 'proxy' })`)で、必要なテストだけ追加コンテナを起動する設計になっています。これは「全部を毎回準備する」のではなく「必要な回だけ、必要なテストだけコストを払う」という考え方です。

**documenso**: Playwrightのfixture機構自体はほぼ使わず、`fixtures/*.ts` は素朴な関数のエクスポート集合です(`authentication.ts`の`apiSignin`、`envelope-editor.ts`の`openDocumentEnvelopeEditor`等)。テストから直接importして呼び出すシンプルな設計で、規模の割に複雑な仕組みを持ち込んでいません。

**教材としての要点**: fixtureの重ね方に唯一の正解はありません。twentyのように「全テスト共通の自動処理」を明確に1箇所に持つか、n8nのように「オプトインのコンテナ」で必要な時だけコストを払うか、documensoのように「Playwrightのfixture機構を使わず素朴な関数で足りるなら使わない」か。**アプリの規模と、共有リソース(コンテナ、ライセンスファイル等)の有無**が判断の分かれ目です。

## 2.6 UIを介さないAPI直接シード — なぜ・いつ使うか

n8nの `TEST_PERSPECTIVES.ja.md` 4章が原則を端的に言い表しています。

> データ準備(ユーザー作成など)は常にAPI経由で行い、UI操作は検証したい部分だけに絞る、という「API for setup, UI for verification」の原則

この原則は3アプリすべてに現れています。

- **documenso** `fixtures/api-seeds.ts`(882行、最大のヘルパーファイル): `apiCreateEnvelope`, `apiCreateRecipients`, `apiSeedDraftDocument`, `apiSeedPendingDocument` 等、API v2経由でエンベロープ/受信者/フィールド/フォルダを直接構築する高レベルヘルパー群
- **twenty** `lib/requests/`: `create-workflow.ts` / `delete-workflow.ts` / `destroy-workflow.ts` がGraphQLを直接叩く。`lib/utils/getAccessAuthToken.ts` でブラウザセッションからアクセストークンを取り出し、`page.request.post(backendGraphQLUrl, ...)` で直接リクエストする組み合わせが典型パターン
- **n8n** `api.workflowApi.createWorkflow(...)` 等のAPI Services

目的は2つに整理できます。

1. **事前準備の高速化・決定性**: UI経由でデータを作ると遅く、UIの変更に巻き込まれて壊れやすい
2. **後片付けの確実性**: UI操作自体をテストする目的でない限り、テスト終了後にAPI経由で確実に削除する

なお documenso はこの原則をプロジェクト構成にも反映しており、`playwright.config.ts` で **ブラウザを起動しない `api` プロジェクト**(`e2e/api/**/*.spec.ts`、10並列)を、UI操作を伴う `ui` プロジェクトと明確に分離しています。「UI操作テスト」と「HTTP直叩きテスト」を同じPlaywrightプロジェクト内で書き分けるのではなく、実行プロジェクト自体を分けている点が特徴的です。

## 2.7 認証を1回だけ行う仕組み

twentyの `01-architecture.md` 3章はこれを「このプロジェクトのE2E設計で一番重要な工夫」と明言しています。

1. `tests/login.setup.ts` が「setup専用テスト」として最初に実行され、実際にログイン画面からログインする
2. ログイン後、`page.context().storageState({ path: '.auth/user.json' })` でブラウザ状態をファイルに保存する
3. 以降の通常テストは `playwright.config.ts` の `storageState` 設定により、**保存済みのログイン状態を読み込んだ状態でブラウザが起動する**

```
playwright.config.ts の projects:
  setup プロジェクト(*.setup.ts) → 先に実行
  chrome プロジェクト(dependencies: ['setup']) → setupの後に実行、storageStateを引き継ぐ
```

これにより、個々のテストは「ログイン処理」からではなく「ログイン済みの状態」から始まります。ログイン自体をテストしたい場合だけ、明示的に `storageState: { cookies: [], origins: [] }` でクリアしてから始めます(`onboarding.spec.ts` がこのパターン)。

他アプリは同じ目的を別の手段で達成しています。

- **documenso**: `fixtures/authentication.ts` の `apiSignin` が、CSRFトークン取得 → `/api/auth/email-password/authorize` へのAPI直叩きでセッションを確立。**UIのログインフォームを介さない**ことで高速化。
- **n8n**: タグによる宣言的な認証(`@auth:none` / `@auth:member` 等)。何も指定しなければ自動的にownerでログインされる。テスト本文に認証処理を書かせないための工夫。

**教材としての要点**: 「ログインを1回だけにする」目的は共通ですが、手段は「ブラウザ状態を保存して再利用する(twenty)」「そもそもUIを介さずAPIでセッションを作る(documenso)」「タグで宣言し、fixture側で解決する(n8n)」の3通りがあります。**ログイン画面自体をテストしたいスイートがあるかどうか**が分岐点で、twentyのstorageState方式は「ログインをテストしたいときだけ明示的に外す」設計になっている点が実用上重要です。

## 2.8 並列実行数・プロジェクト分割の設計判断

3アプリの並列度設計を並べると、判断基準が見えてきます。

| アプリ | 並列度の設計 | 理由 |
|---|---|---|
| documenso | `api`(10並列)/ `license`(**1並列固定**)/ `ui`(コア数依存、最大6) の3プロジェクト分割 | `license`はライセンスファイルを複数テストで共有するため並列不可。APIテストはDBコネクション上限を考慮 |
| twenty | `fullyParallel: false` / `workers: 1`(**意図的に完全直列**) | 同じワークスペース・データを複数テストが共有するため |
| n8n | 並列実行が前提。`@capability:X` タグでコンテナ起動コストの高いテストをグループ化し、同じシャードに寄せてワーカーを再利用 | コンテナ起動オーバーヘッド(約20秒)を最小化しつつ、基本は並列実行の速度を活かす |

判断基準としてn8nの `TEST_DESIGN_GUIDE.ja.md` にある一文が最も実践的です。

> 判断に迷ったら「このテストが他のテストと同時に走っても壊れないか?」を自問する。

**共有リソース(ライセンスファイル、ワークスペースデータ、コンテナ)があるかどうか**で、直列化するかグループ化するかを決める、という一貫した基準が3アプリに共通しています。twentyのように「アプリ全体が共有データ前提だから最初から全直列にする」のも、documensoのように「ほとんどは並列、共有リソースがある一部だけ直列プロジェクトに切り出す」のも、根っこは同じ判断です。

---
[← 01-test-design-docs.md](./01-test-design-docs.md) | [README](./README.md) | 次: [03-common-pitfalls.md](./03-common-pitfalls.md)
