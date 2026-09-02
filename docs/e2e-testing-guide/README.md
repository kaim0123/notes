# E2Eテスト実践ガイド — 4つの実プロダクトから学ぶ設計思想

このガイドは `forks/` 配下にある4つの実プロダクト、

- **documenso**(Remix + tRPC + Prisma、電子署名SaaS)— `packages/app-tests/e2e`(126ファイル・約1,100ケース)
- **twenty**(NestJS + React、CRM)— `packages/twenty-e2e-testing`
- **n8n**(Vue + Node.js、ワークフロー自動化)— `packages/testing/playwright`
- **cal.diy**(Next.js、日程調整SaaS)— `apps/web/playwright`(53ファイル)

の実際のE2Eテストコードと、そこに既に存在していた設計ドキュメント(`TEST_DESIGN.md`、`docs/*.md` 等)を横断して読み解き、「本には書かれていないが実プロダクトのコードには表れている設計判断」を抽出したものです。各セクションには参照元のファイルパスを明記しているので、より深く知りたい場合は実コードにあたってください。

4アプリは技術スタックもドメインも異なりますが、独立に収斂している設計判断が多数あります。そこが最も学ぶ価値のある部分です。

## 読む順番

| # | ファイル | 内容 |
|---|---|---|
| 1 | [01-test-design-docs.md](./01-test-design-docs.md) | コードを書く前に作る書類 — テスト観点表とは何か、どう作るか |
| 2 | [02-architecture.md](./02-architecture.md) | 理想的なディレクトリ構造とアーキテクチャ — 各層が何を防いでいるか |
| 3 | [03-common-pitfalls.md](./03-common-pitfalls.md) | 複数アプリに共通する「よくある不具合」とそれを防ぐテスト関数の型 |
| 4 | [04-code-quality.md](./04-code-quality.md) | テストコードの品質を保つ仕組み |
| — | [appendix.md](./appendix.md) | 付録A: 用語集 / 付録B: 各アプリのドキュメント一覧・参照元対応表 |

1→4の順に読むと、「書類を作る→構造を作る→よくある事故を知る→品質を維持する」という設計の流れに沿って理解できます。特定の観点(待ち方、権限テストなど)だけ知りたい場合は、各ファイル冒頭の見出し一覧から探すか、[appendix.md](./appendix.md) の参照元対応表から実コードに直接あたってください。
