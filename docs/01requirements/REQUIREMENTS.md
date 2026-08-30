# notes 要件定義 (v0.1)

最終更新: 2026-08-30

## 目的

個人の学習内容(メインはプログラミング・技術学習、それ以外の分野も含む)をまとめる静的な知識サイト。[`atlas`](../../../atlas)の後継として、Atlasで最大の弱点だった図解不足を作り直すことを最優先の目的とする。背景・経緯は[`00background/01_purpose.md`](../00background/01_purpose.md)・[`00background/02_lessons-from-atlas.md`](../00background/02_lessons-from-atlas.md)を参照。

## サイトの性質

Atlasと同じく、コンテンツをリポジトリ内で直接コード化する**静的サイト**。アップロード・DB・認証・CRUD・リッチテキストエディタは持たない。編集はVSCode等の外部エディタ+Claudeとの会話で行い、`next build`(静的Export)でビルドしたものをそのままホスティングする。

## やること

- 学習内容をページ単位で執筆・蓄積する(トピック追加のたびにコード変更)
- 各ページの主要概念に対応する図解を、本文と同じ単位で用意する(詳細は[`00background/03_diagram-policy.md`](../00background/03_diagram-policy.md))
  - 図解はClaudeとの会話でその場でHTMLとして作成し、**claude.aiのArtifactとしては公開しない**(公開→再実装の二度手間を避けるため)
  - 図解は単体で完結したHTML(外部CDN依存なし)とし、`<iframe sandbox srcdoc="...">`でページのMain領域に埋め込む(Atlasの`.html`埋め込みパターンを流用)
  - 図解のデザインは「背景色・基本文字色/フォント・アクセント色1色・角丸の基準値」の4項目のみサイト側に揃え、構図・配色・図の種類などの中身は都度自由に作る
- ナビゲーション(サイドバー・パンくず等)からすべてのページに辿り着けるようにする
- 全文/タグ検索(方式は「未決の論点」参照)

## やらないこと

- アップロード機能・DB接続・認証・CRUD・リッチテキストエディタ(Atlasの旧設計と同じくスコープ外)
- ページ数・総数のハードコード(「全◯ページ」「◯ / 総数」のような表現。理由は[`00background/02_lessons-from-atlas.md`](../00background/02_lessons-from-atlas.md)参照)
- ディレクトリ階層とURL・ナビ構造を直接結合させること(理由は同上。詳細は基本設計書で扱う)

## 技術要件

- Next.js(App Router)+ React + TypeScript、`output: "export"`による静的Export
- コンテンツ実体・URLルーティング・ナビ階層を3層に分離する構成(Atlasが移行済みの`content/pages/` + `routes.ts` + `nav.ts`方式を踏襲。詳細は基本設計書で扱う)
- Tailwind CSS。デザイントークン(色・フォント・角丸)はAtlasの`globals.css`を踏襲する前提とし、変更する場合は本書を更新する
- 図解HTMLの埋め込みは`iframe sandbox srcdoc`方式(サイト本体のCSSと衝突させないため)

## 非機能要件

- 外部サービス(claude.ai等)への依存なしに閲覧・ビルドができること(図解を含む全コンテンツがリポジトリ内で完結する)
- 静的ホスティングのみで動作すること(サーバー・DBを必要としない)

## 未決の論点(解消済み)

[`02basic-design/app-basic.md`](../02basic-design/app-basic.md)で以下のとおり解消した。

- **検索エンジン**: Pagefindを継続採用(§5)。日本語精度の課題は残るが、問題化した時点で代替を検討する
- **プロジェクトの立ち上げ方**: Atlasをforkせず新規作成。`create-next-app`から必要なもの(デザイントークン・HTML埋め込みパターン等)だけ選択的に移植する(§1)
- **アクセシビリティ**: すべての図解にキャプション(内容の要約テキスト)を必須とし、サンドボックス化されたHTML内テキストの代替情報源とする(§6)
- **図解HTMLファイルの配置・読み込み方法**: `src/content/diagrams/<slug>.html`に保存し、ビルド時に`fs.readFileSync`で読み込む(§4)
- **整合性チェックの自動化**: `scripts/check-content-integrity.mjs`を用意し、pre-commitで実行する(§7)
