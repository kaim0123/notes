# notes 基本設計 (v0.1)

最終更新: 2026-08-30

[`01requirements/REQUIREMENTS.md`](../01requirements/REQUIREMENTS.md)を受けて、実際の構成を決める。本書で[要件定義の未決の論点](../01requirements/REQUIREMENTS.md#未決の論点)をすべて解消する。

## 1. プロジェクトの立ち上げ方(決定)

**新規作成**。`atlas`をforkせず、`create-next-app`(TypeScript / App Router / Tailwind CSS / ESLint)でゼロから作る。Atlasからは以下だけを選択的に移植し、蓄積コンテンツや旧設計(アップロード式Wikiの残骸等)は持ち込まない。

- `globals.css`のデザイントークン(色・フォント・角丸。[`00background/03_diagram-policy.md`](../00background/03_diagram-policy.md)参照)
- shadcn/uiのセットアップ・使用コンポーネント
- レイアウト系コンポーネント(ヘッダー・サイドバー・パンくず・モバイル下部ナビ)の構成方針
- `.html`埋め込み(`iframe sandbox srcdoc`)のパターン

`docs/`コンポーネント群(`Hero`/`Eyebrow`/`Card`等)はAtlasのAPIを参考にしつつ、必要なものだけ作り直す。

## 2. ディレクトリ構成

Atlasが移行済みの「コンテンツ実体・URLルーティング・ナビ階層」3層分離構成を、再編を経験する前の**最初から**採用する([`00background/02_lessons-from-atlas.md`](../00background/02_lessons-from-atlas.md)参照)。

```
src/
  app/
    [...slug]/page.tsx      -- 全コンテンツページの受け口。routes.tsを引いて動的import
    layout.tsx               -- RootLayout
    page.tsx                 -- ホーム "/"
    search/page.tsx           -- 検索結果画面(Pagefind)
  content/
    routes.ts                 -- URLパス → pages/配下モジュールの対応表(手動保守)
    pages/
      <section>-...-<leaf>.tsx  -- コンテンツページ本体(ファイル名はURLセグメントをハイフン連結。ディレクトリを持たない)
    diagrams/
      <slug>.html             -- 図解の実体(単体で完結したHTML。§4参照)
  components/
    docs/                     -- コンテンツページ共通部品(DiagramFrameを含む)
    layout/                   -- ヘッダー・サイドバー・パンくず・モバイル下部ナビ
    search/
    ui/                        -- shadcn/ui
  lib/
    nav.ts                    -- ナビゲーション構造(サイドバー・パンくず・前後ページ)の単一の情報源
    diagrams.ts                -- 図解HTMLをビルド時に読み込むヘルパー(§4参照)
    utils.ts
  hooks/
    use-pagefind-search.ts
scripts/
  check-content-integrity.mjs -- routes.ts・nav.ts・実ファイルの整合性検証(§6参照)
```

## 3. コンテンツページの作り方

Atlasと同じ運用ルールを踏襲する。新しいページを追加したら、次の3箇所をすべて更新する(いずれか1つでも欠けると壊れ方が異なり気づきにくい)。

1. `src/content/pages/`にコンテンツファイルを追加する
2. `src/content/routes.ts`にURLパス→`import()`のエントリを追加する(ここが無いと404)
3. `src/lib/nav.ts`の該当セクションに追加する(ここが無いとビルドは通るがサイドバーから辿り着けない孤立ページになる)

ページ数・連番のハードコード(「全◯ページ」「20/23」等)は行わない。連番バッジは単一の配列・グリッド内で完結するものに限定する。

## 4. 図解(Diagram)の実装(未決の論点を解消)

### 4.1 保存場所・読み込み方法

図解のHTMLは`src/content/diagrams/<slug>.html`に、単体で完結したファイル(外部CDN依存なし)として保存する。コンテンツページ(Reactサーバーコンポーネント)からは、ビルド時に`fs.readFileSync`でファイル内容を読み込み、文字列として埋め込む。

```ts
// src/lib/diagrams.ts
import fs from "node:fs";
import path from "node:path";

export function readDiagram(slug: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/diagrams", `${slug}.html`),
    "utf-8"
  );
}
```

静的Export(`next build`)はビルド時にサーバーコンポーネントを実行してHTMLを生成するため、この読み込みはビルド成果物に埋め込まれる。ランタイムでのファイルI/Oは発生しない。

### 4.2 埋め込みコンポーネント

`components/docs/diagram-frame.tsx`に`DiagramFrame`を用意し、Atlasの`Diagram`(枠+キャプションのみ)を置き換える。

```tsx
export function DiagramFrame({ slug, caption }: { slug: string; caption: ReactNode }) {
  const html = readDiagram(slug);
  return (
    <figure className="my-6 rounded-xl border border-border bg-card p-2">
      <iframe sandbox="" srcDoc={html} className="w-full" style={{ border: "none" }} />
      <figcaption className="mt-2.5 px-3 pb-2 text-[0.85rem] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
```

`sandbox=""`(スクリプト実行不可)を既定とし、Atlasの`.html`埋め込みルールを踏襲する。動くデモ等でJS実行が必要な場合は個別に検討する。

## 5. 検索(決定: Pagefind継続)

Atlasと同じくPagefindを採用する。`npm run build`で`next build && pagefind --site out`を実行し、`/search`ページと`use-pagefind-search.ts`相当のフックで検索する。

日本語の分かち書きがなく部分一致中心になる精度課題([`00background/02_lessons-from-atlas.md`](../00background/02_lessons-from-atlas.md)参照)は解消しないが、初期実装のコストを優先しAtlasの構成をそのまま流用する。精度が実際に問題になった時点で代替エンジンを検討する。

なお図解(`iframe sandbox`内のHTML)のテキストはPagefindのクロール対象外とする(Atlasの`.html`埋め込みと同じ扱い)。図解の内容は必ずキャプション(本文のテキスト)として本体側にも書くため、検索からは本文経由で辿れる。

## 6. アクセシビリティ方針(決定)

`sandbox`化されたiframe内のテキストはスクリーンリーダー等で拾いにくい。そのため、**すべての図解に対してキャプション(内容の要約テキスト)を必須とする**(`DiagramFrame`の`caption`は必須props)。キャプションは図の装飾的な一言タイトルではなく、「その図が何を示しているか」を文章として理解できる要約にする。図解の視覚的な内容そのものへの代替アクセシビリティ対応(構造化データ等)までは行わない。

## 7. 整合性チェックの自動化(決定)

Atlasの教訓([`00background/02_lessons-from-atlas.md`](../00background/02_lessons-from-atlas.md)、「次回への改善案」)を初期段階から実施する。`scripts/check-content-integrity.mjs`を用意し、以下を検証してpre-commitで実行する。

- `routes.ts`に登録されたモジュールパスが`content/pages/`に実在すること
- `content/pages/`の全ファイルが`routes.ts`に登録されていること(孤立ファイル検出)
- `routes.ts`の全エントリが`nav.ts`の`tree`のどこかに存在すること(サイドバーから辿れないページの検出)

具体的なCI組み込み(GitHub Actions等)はデプロイ設計時に決める。

## 8. ビルド・デプロイ

`next.config.ts`で`output: "export"`を指定した静的Export構成。ホスティング先・カスタムドメイン等の詳細は別途デプロイ設計で扱う(Atlasの`00devflow/STATIC_DEPLOY_PLAN.md`相当)。
