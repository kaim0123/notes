[← 04-code-quality.md](./04-code-quality.md) | [README](./README.md)

# 付録A: 用語集

| 用語 | 説明 |
|---|---|
| POM(Page Object Model) | 1画面/1セクションを1クラスとしてカプセル化し、要素取得と単純操作をメソッドとして提供する設計パターン |
| Fixture | Playwrightのテスト前後処理・依存性注入の仕組み。`base.extend()`で重ね掛けできる |
| Composable | 複数ページ/複数手順にまたがる業務フローをまとめたヘルパークラス(n8nの用語) |
| Locator | Playwrightの要素参照オブジェクト。取得方法に壊れにくさの優先順位がある([03-common-pitfalls.md](./03-common-pitfalls.md) 3.7節) |
| storageState | ブラウザのCookie等の状態をファイルに保存し、以降のテストで再利用する仕組み([02-architecture.md](./02-architecture.md) 2.7節) |
| フレーキー(Flaky)テスト | 同じコードに対して合格/失敗が不安定に揺れるテスト。多くはタイミング起因([03-common-pitfalls.md](./03-common-pitfalls.md) 3.6節) |
| ビジュアルリグレッション | 画面のスクリーンショットをピクセル単位でベースラインと比較するテスト手法([03-common-pitfalls.md](./03-common-pitfalls.md) 3.5節) |
| TCR(Test && Commit || Revert) | テストが通ったときだけコミットし、失敗時は自動でrevertする運用([04-code-quality.md](./04-code-quality.md) 4.3節) |
| Capability / Mode タグ | n8nにおける、追加コンテナの要否(Capability)とインフラ構成(Mode)を宣言するテストタグ([04-code-quality.md](./04-code-quality.md) 4.2節) |
| 観点表(Test Perspective Table) | テストが「何を確認しているか」を機能軸で棚卸しした一覧([01-test-design-docs.md](./01-test-design-docs.md)) |

---

# 付録B: 各アプリのドキュメント一覧・参照元対応表

| アプリ | ファイル | 内容 |
|---|---|---|
| documenso | `packages/app-tests/e2e/TEST_DESIGN.md` | 観点表+設計パターン+チェックリストを1ファイルに統合 |
| twenty | `packages/twenty-e2e-testing/docs/README.md` | 読む順番の索引 |
| twenty | `packages/twenty-e2e-testing/docs/01-architecture.md` | ディレクトリ構成、Playwright設定、認証の使い回し、fixtureの重ね方、POM/API直接操作の役割分担 |
| twenty | `packages/twenty-e2e-testing/docs/02-test-perspective-table.md` | 観点の分類、ファイル別マッピング、カバレッジのギャップ |
| twenty | `packages/twenty-e2e-testing/docs/03-test-design-guide.md` | 配置/命名/Locator優先順位/待ち方4パターン/一意性/後片付け/チェックリスト |
| n8n | `packages/testing/playwright/docs/TEST_PERSPECTIVES.ja.md` | テストの6分類、機能観点マップ、4層/2層アーキテクチャ、Fixture設計、非機能テスト |
| n8n | `packages/testing/playwright/docs/TEST_PERSPECTIVE_MATRIX.ja.md` | A〜Iの9大分類による観点表 |
| n8n | `packages/testing/playwright/docs/TEST_DESIGN_GUIDE.ja.md` | レイヤー判断基準、POMの3種類のメソッド、命名規則、アンチパターン集、チェックリスト |
| n8n | `packages/testing/playwright/docs/TROUBLESHOOTING.ja.md` | 既知のフレーキーテストとその根本原因 |
| n8n | `packages/testing/playwright/docs/ORCHESTRATION.ja.md` | Capabilityベースのシャーディング、TCR、リトライフィルタリング |
| cal.diy | `apps/web/playwright/docs/README.md` | 3ドキュメント(feature-design/scenarios/test-matrix)の位置づけと相互参照方法 |
| cal.diy | `apps/web/playwright/docs/feature-design.md` | 機能ごとの仕様・エッジケース |
| cal.diy | `apps/web/playwright/docs/scenarios.md` | 代表的な操作フロー(手順書) |
| cal.diy | `apps/web/playwright/docs/test-matrix.md` | 状態・条件×期待結果×対応テストケースの一覧 |

---
[← 04-code-quality.md](./04-code-quality.md) | [README](./README.md)
