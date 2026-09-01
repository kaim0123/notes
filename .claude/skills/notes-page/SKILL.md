---
name: notes-page
description: notesサイトのコンテンツページを1本仕上げる(本文執筆 → 図解HTML作成 → routes.ts/nav.ts登録 → 整合性チェック)。「〇〇のページを書いて/追加して」「/theory/xxx を作って」「docs/contents の△△を移植して」「このページに図を足して」等で使う。図解はclaude.aiに公開せず src/content/diagrams/ に直接HTMLとして書き出す。
---

# notes コンテンツページの作成

このプロジェクトのページは「コンテンツ実体 / URLテーブル / ナビ階層」の3層分離で、**1ページの追加は3ファイルの同時更新**を意味する(`docs/02basic-design/app-basic.md` §3)。加えて、Atlasの最大の失敗が「図解の先送り」だったため、**図は本文と同じ作業単位で必ず仕上げる**(`docs/00background/03_diagram-policy.md`)。

判断に迷ったら、正となる情報源は次の順:

| 知りたいこと | 見る場所 |
|---|---|
| 実在するURL・ナビ階層 | `src/lib/nav.ts`(常にこれが正) |
| 目次の設計意図・未執筆の計画 | `docs/03content-plan/nav-structure.md` |
| ページ追加手順・図解の組み込み方 | `docs/02basic-design/app-basic.md` §3〜§6 |
| 図解の方針・品質基準・パレット | `docs/00background/03_diagram-policy.md` |
| 使えるコンポーネント | `src/components/docs/index.ts` の export |

## Step 0. 入力を確定する

ユーザーの指定から次を読み取る。足りないものはStep 1で自分で決めて、Step 3の構成案に含めて確認を取る(ここで質問を積み上げない)。

- 主題(トピック)
- URL(指定があればそれに従う)
- 移植元の指定(`docs/contents/` のファイル名など)

## Step 1. 配置とファイル名を決める

1. `src/lib/nav.ts` を読み、どのセクション・どの第二階層ノードの配下に置くかを決める。該当セクションが `docs/03content-plan/nav-structure.md` に計画済みなら、その意図とタイトル案に従う。
2. URLは**第二階層を挟まないフラットな1セグメント**。親の名前をハイフンでつなぐ(`/design/paradigm-oop`、`/theory/media-basics`)。ナビは第三階層が最下層。
3. ファイル名は**URLの先頭スラッシュを除き `/` を `-` に置換**したもの。
   `/theory/media-basics` → `src/content/pages/theory-media-basics.tsx`
4. 既存URLと衝突しないこと、`nav-structure.md` の「束ねノードとページを重複させない」に反しないことを確認する。

## Step 2. 下敷きになる素材を探す

`docs/contents/` はAtlas(前身プロジェクト)の全ページ写しで、**notesのURL体系ともコンポーネント構成とも一致しない参考資産**。対応するページがあれば下敷きにする。

```bash
ls docs/contents | grep -i <キーワード>
grep -rl "<主題の語>" docs/contents | head
```

見つかった場合の扱い:

- 文章は流用してよいが、**内部リンクのURLはAtlasのもの**なので、`src/content/routes.ts` に実在するURLへ貼り替える(無ければリンクを外す)。
- Atlasにしか無いコンポーネント(`RelatedList` / `RelatedLink` など)は使えない。**`src/components/docs/index.ts` の export にあるものだけ**を使う。
- `<pre>` に付いた長い `className` は剥がす。notesでは `globals.css` の `.docs-content pre` がスタイルを持つ。
- **図はほぼ付いていない**(これがAtlasの失敗そのもの)。移植は「文章の移送」ではなく「図を足して作り直す」作業と考える。

見つからなければゼロから執筆する。

## Step 3. 構成案を出して**停止する**

本文を書き始める前に、次の形で提示し、ユーザーの承認を待つ。長文を書き切ってから方向違いが判明する無駄を防ぐためのゲート。

```
URL:        /theory/media-basics
ファイル:    src/content/pages/theory-media-basics.tsx
タイトル:    マルチメディアの全体像 ― 標本化から圧縮まで
Eyebrow:    基礎理論
nav.ts:     "基礎理論" > "情報メディア"(/theory/media) の children の先頭
移植元:      docs/contents/theory-media-basics.tsx(あり / なし)

見出し構成:
  01 …
  02 …
  まとめ …

図解(N点):
  theory-media-basics-sampling  02の直後  標本化・量子化で連続量が数列になる過程  640/300
  …

本文からの内部リンク先(すべてroutes.tsに実在):
  /theory/encoding, /theory/media-image
```

承認後はStep 4〜7を止めずに走らせる。

## Step 4. 本文を書く

`reference/page-template.md` の骨格に従う。使えるコンポーネントとその props も同ファイルに一覧がある。

執筆上の決まり:

- 冒頭の `Lead` は、**既存ページからの流れ**(何を踏まえてこのページに来たか)を1文入れてから本題に入る。既存ページを `<Link>` で指す。
- `Heading` の `num` は `"01"` から連番、最後は `"まとめ"`。
- **ページ数・連番のハードコードをしない**(「全23ページ」「20/23」等)。連番バッジは単一の配列・グリッド内で完結するものだけ(`app-basic.md` §3)。
- 内部リンクは `src/content/routes.ts` に実在するURLだけ。整合性チェックは本文中のリンク切れを検出しないので、書いたリンクは自分で `grep` して確認する。
- 末尾は `<DocsFooter href="<このページ自身のURL>" />`。前後ページ・関連ページは `nav.ts` から機械的に計算されるので手で並べない。

## Step 5. 図解を作る

**`artifact-diagramming` スキルを読んでからSVGを書く**(構図・矢印・凡例の技法はそこに従う)。ただし:

- **Artifactツールは呼ばない。claude.aiには公開しない。** 図はこのリポジトリ内の通常ファイルとして `src/content/diagrams/<slug>.html` に直接書く(`03_diagram-policy.md`)。
- `artifact-design` が求めるライト/ダーク両対応は不要。notesは常時ダーク1色。
- 外部CDN依存なしの単体で完結したHTML。`sandbox=""` で埋め込まれるため**JavaScript・アニメーションは動かない**。静的なSVGで表現しきる。

手順:

1. `reference/diagram-template.md` の雛形をコピーする。`<style>` ブロックは既存350枚と1文字も違えない(パレットは `globals.css` のトークンと対応)。
2. `viewBox="0 0 W H"` を決め、その中にSVGを書く。既存の主流は幅640・高さ260〜340。
3. `role="img"` と `aria-label` を必ず付ける。aria-labelは図の内容を文章で説明したもの(単語の羅列にしない)。
4. slugは `<ページのファイル名>-<図の内容>`(例 `theory-tree-heap`)。
5. ページ側に埋め込む。`aspect` は **viewBoxと同じ比**を書く。

```tsx
<DiagramFrame
  slug="theory-tree-heap"
  aspect="820 / 320"
  caption="最小ヒープの木としての形と、それを配列に写した対応。親は子より小さいという条件だけを守るので全体は整列していないが、根は常に最小になる。"
/>
```

品質基準(`03_diagram-policy.md`):

- **1ページ最低1つ、主要概念ごとに1つ**を目安にする。構造・フロー・階層・状態遷移・比較は文章より図。
- `caption` は必須で、装飾的な一言タイトルではなく「その図が何を示しているか」が文章として分かる要約にする。sandbox内のテキストはスクリーンリーダーが拾えず、Pagefindの検索対象にもならないため、**キャプションが図の唯一の代替テキスト**(`app-basic.md` §6)。

## Step 6. 3箇所を登録する

1つでも欠けると壊れ方が変わって気づきにくい。

1. `src/content/pages/<name>.tsx` — Step 4で作成済み
2. `src/content/routes.ts` — 該当セクションの並びの中に追加(欠けると404)
   ```ts
   "/theory/media-basics": { load: () => import("@/content/pages/theory-media-basics") },
   ```
   ディレクトリスキャン+動的importへの「簡略化」はしない(ファイル冒頭のコメント参照)。
3. `src/lib/nav.ts` — 該当ノードの `children` に追加(欠けるとビルドは通るが孤立ページになる)
   ```ts
   { href: "/theory/media-basics", title: "マルチメディアの全体像" },
   ```
   `nav.ts` のタイトルはサイドバー表示用の短い名前。ページ側 `<h1>` の「― 副題」は含めない。

## Step 7. 検証する

```bash
npm run check:content   # routes.ts / nav.ts / 実ファイルの整合性
npx tsc --noEmit        # 型・JSXの検証(docsディレクトリは対象外)
npm run lint
```

3つとも通るまで直す。`npm run build` は静的Export一式が走って重いので、明示的に頼まれたときだけ。

## 完了報告

作成・変更したファイル(ページ / 図解 / routes.ts / nav.ts)、図解の点数、検証コマンドの結果を報告する。図が0点のページを「完成」と報告しない。
