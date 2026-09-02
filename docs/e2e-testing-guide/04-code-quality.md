[← 03-common-pitfalls.md](./03-common-pitfalls.md) | [README](./README.md) | 次: [appendix.md](./appendix.md)

# 第4部: テストコードの品質を保つ仕組み

## 4.1 命名規則は仕様である

n8nの `AGENTS.md` に明記されている考え方が、最も抽象度が高く、かつ最も重要な観点です。

> テスト名は「何をしたか」ではなく「何のルールを証明しているか」を書く。
> - 悪い例: `should open W1 as U2`(操作の記述)
> - 良い例: `should allow sharee to edit shared workflow`(ルールの記述)

twentyの `03-test-design-guide.md` 2章も同じ方向性で「『正常に〜できる』ではなく**何をするテストか**を書く」としています。

命名を「タグ」として使う運用も2アプリに見られますが、**普及度は一様ではない**ことが正直に記録されている点も参考になります。documenso `TEST_DESIGN.md` 5.1章:

> `test('[DOMAIN][SUBDOMAIN]: 振る舞いの説明', ...)` という命名規則。... ただし全ファイルがこの規約に従っているわけではなく(`api/`配下や新しめの`envelope-editor-v2/`は`test.describe`の英語タイトルのみのものも多い)、**混在**している点に注意。

**教材としての要点**: 命名規約は「決めて終わり」ではなく、新しい機能領域が増えるたびに追従しないと自然に混在していきます。ドキュメント自身がそれを隠さず記録していることが、後から読む人にとって有用な情報になっています。

## 4.2 タグ付けによる部分実行

CI実行を絞り込むためのタグ体系は、n8nで最も発達しています(`ORCHESTRATION.ja.md` / `TEST_DESIGN_GUIDE.ja.md` 8章)。

| タグ種別 | 例 | 意味 |
|---|---|---|
| Capability | `@capability:proxy` / `@capability:email` | 追加コンテナ(Mailpit, Gitea, Keycloak等)が必要 |
| Mode | `@mode:postgres` / `@mode:multi-main` | DB種別やクラスタ構成そのものを前提にする |
| 認証 | `@auth:none` / `@auth:member` | どのロールとして認証するか |
| データ分離 | `@db:reset` | テストごとにDBリセットが必要(コンテナ専用) |
| ライセンス | `@licensed` | ライセンスが必要な機能(SSO等) |

判断基準: 「どれにも当たらない → 何も付けない(ローカルでも通常CIでも実行される)」。タグを付けすぎるとCIでの実行対象から漏れ、付け忘れるとローカルで失敗する、というトレードオフが明記されています。

documensoは `[DOMAIN][SUBDOMAIN]` 形式のタグ付きタイトルで、Playwrightのレポート上で `--grep "[TEAMS]"` のような部分実行を可能にしています。仕組みはシンプルですが、目的(CI実行の絞り込みとグループ化)はn8nのCapabilityタグと同じです。

## 4.3 テストコード自体をレビューする仕組み(janitorの例)

4アプリの中で、n8nだけが**テストコード自体の静的解析ツール**(`packages/testing/janitor`)を持っています。`pnpm janitor` で以下のルールを検出します(`TEST_PERSPECTIVES.ja.md` 7章)。

| ルール | 検出する違反 |
|---|---|
| `selector-purity` | テスト/Composable内の生ロケーター使用 |
| `no-page-in-flow` | ComposableがPage Objectを介さず`page`に直接アクセス |
| `boundary-protection` | Page Object同士が互いをimportして結合度が上がる |
| `no-direct-page-instantiation` | Page Objectをテストから直接インスタンス化(fixture経由を強制) |
| `scope-lockdown` | コンテナの外にはみ出すスコープなしロケーター |
| `dead-code` | Page Object内の未使用publicメソッド |
| `duplicate-logic` | AST比較によるコピペコードの検出 |
| `deduplication` | 同じセレクタが複数ファイルに重複定義 |
| `api-purity` | API Service層の責務違反 |
| `no-raw-editor-navigation` | `page.goto()`でエディタ画面に直接遷移(読み込み待ちをバイパス) |
| `valid-owner-annotation` | チームオーナーの注記が無い/不正なspec |

さらに **TCR(Test && Commit || Revert)** という運用があります。`pnpm janitor tcr --execute` を実行すると、janitorの指摘を直しつつ、**テストが通ったときだけコミットされ、通らなければ自動でrevertされます**。「直したつもりが壊れていた」をコミットレベルで防ぐ仕組みです。

**教材としての要点**: 他の3アプリにはここまでの仕組みはありません。これは規模(56ドメイン超・数百specファイル)に達したプロジェクト特有の投資であり、「最初からjanitorのようなツールを作るべき」という結論にはなりません。むしろ[02-architecture.md](./02-architecture.md) 2.1節で述べた「1ファイルに全部書くとなぜ壊れるか」の延長線上に、**「テストコード自体がリファクタ不能になる」という次の段階の問題があり、n8nはそこに対する回答を持っている**、という到達点として捉えるのが実践的です。テストコードの量が数百ファイルを超えてきたら、こうした機械的チェックの導入を検討する目安になります。

## 4.4 新規テスト追加チェックリストの作り方(3アプリ比較)

3アプリのチェックリストを並べると、共通する核と、アプリ固有の項目が見えてきます。

| 観点 | twenty(9項目) | n8n(11項目+最終5チェック) | documenso(7項目) |
|---|---|---|---|
| 配置場所 | ○ 適切な場所か | ー(レイヤー判断が別途1章まるごと) | ○ ドメイン別ディレクトリ |
| Locator選定 | ○ getByRole優先 | ー(janitorが機械チェック) | ー |
| 待ち方 | ○ Promise.all/waitForTimeout禁止 | ○ waitForTimeout禁止 | ー |
| データの一意性 | ○ | ○ タイムスタンプ/nanoid | ー(fixtureヘルパー利用が前提) |
| 後片付け | ○ finally/fixture teardown | ー(API for setupが前提で個別言及少) | ー(既存ヘルパー優先で言及) |
| 観点表との照合 | ○ 既存テストと重複しすぎていないか | ー | ー |
| アーキテクチャ層の遵守 | ー | ○ getter/action/query 3分類、Composable分離 | ー |
| 命名 | ー | ○ 業務ルールベースの名前か | ○ `[DOMAIN]`タグ踏襲 |
| 権限系の観点 | ー | ー | ○ 新ロール/可視性区分追加時のマトリクス確認 |
| 共有状態への配慮 | ー | ー | ○ 直列実行プロジェクト化の検討 |
| 新規APIの認可テスト | ー | ー | ○ 新エンドポイント=認可テストのセットが慣例 |
| janitor通過 | ー | ○ `pnpm janitor --file=<file>` | ー |

共通する核は「**配置場所・命名・待ち方・データの一意性・後片付け**」の5点で、これは4アプリ全体を通じて繰り返し出てくるテーマ([02-architecture.md](./02-architecture.md)・[03-common-pitfalls.md](./03-common-pitfalls.md))と一致します。一方、documenso固有の「新規APIの認可テスト」やtwenty固有の「観点表との照合」は、そのアプリが最も事故りやすい領域(documensoなら権限漏洩、twentyなら観点の重複)を反映したものです。**自分のプロジェクトのチェックリストを作るときは、この5点の核を土台にしつつ、自分のドメインで最も事故りやすい観点を1〜2個足す**、というのが実践的な作り方です。

---
[← 03-common-pitfalls.md](./03-common-pitfalls.md) | [README](./README.md) | 次: [appendix.md](./appendix.md)
