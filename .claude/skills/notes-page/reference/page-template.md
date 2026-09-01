# ページの骨格とコンポーネント

## 骨格

import は**実際に使うものだけ**に絞る(未使用importはlintで落ちる)。

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "木構造とヒープ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>木構造とヒープ ― 階層で速さを稼ぐ</h1>
        <Lead>
          <Link href="/theory/hash">ハッシュ表</Link>では…(前のページからの流れを1文)。
          <strong>階層に組み替えると、一歩進むごとに候補が半分に減ります</strong>。
        </Lead>
      </Hero>

      <Heading num="01">最初の見出し</Heading>
      <p>
        <Term>木(tree)</Term>は…。
      </p>

      <DiagramFrame
        slug="theory-tree-bst"
        aspect="820 / 300"
        caption="二分探索木で8を探す経路。根の10より小さいので右部分木を丸ごと捨てて左の5へ進み、5より大きいのでその右の8にたどり着く。1段下るごとに候補が半分に減るため、バランスが取れていれば探索はO(log n)になる。"
      />

      <Heading num="まとめ">高さが性能、規則が用途を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>木の高さ=計算量</h4>
          <p>バランスが崩れれば O(n) に退化する。だから平衡木がある。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/tree" />
    </DocsPage>
  );
}
```

`metadata.title` は `<h1>` の副題(「― …」以降)を除いた短い名前。`nav.ts` のタイトルと揃える。

## コンポーネント一覧

`src/components/docs/index.ts` の export がすべて。ここに無いものは使えない。

| コンポーネント | props | 用途 |
|---|---|---|
| `DocsPage` | children | ページ全体のラッパー。`.docs-content` のスタイルはここから効く |
| `Hero` / `Eyebrow` / `Lead` | children | 冒頭。Eyebrowはセクション名、`<h1>` は直の子として書く |
| `Heading` | `num`, children | 節見出し。numは `"01"` 〜、最後は `"まとめ"` |
| `Term` | children | 初出の用語 |
| `Analogy` | `label`, children | たとえ話。labelは「たとえるなら」等 |
| `Aside` | `label`, children | 補足・注意。左に緑のライン |
| `CardGrid` / `Card` / `CardNumber` | children | まとめの要点カード。`Card` の中は `CardNumber` + `<h4>` + `<p>` |
| `DiagramFrame` | `slug`, `caption`, `aspect`(既定 `"16 / 9"`) | 図解の埋め込み。captionは必須 |
| `Timeline` / `TimelineItem` / `TimelineLabel` | `TimelineItem` に `era` | 年表。`TimelineLabel` は年表全体への一文 |
| `Steps` | children(`<li>` を並べる) | 手順。番号バッジはCSSのcounterが振る |
| `DocsFooter` | `href`(このページ自身のURL) | 末尾。前後・関連ページは `nav.ts` から自動計算 |

`SectionPlaceholder` はセクション索引ページの未執筆時の仮実装。通常のページでは使わない。

## 素のHTMLの書き方

スタイルは `globals.css` の `.docs-content` 配下が持つので、`className` はほぼ不要。

### 表

1列目(見出しにあたるセル)に `className="hl"` を付けると緑の強調になる。`<thead>` を使っても、`<tbody>` の先頭行を `<th>` にしてもよい(既存ページに両方ある)。

```tsx
<table>
  <thead>
    <tr><th>置き場所</th><th>寿命</th><th>サーバーへ送信</th></tr>
  </thead>
  <tbody>
    <tr><td className="hl">Cookie</td><td>属性で指定</td><td><strong>毎回自動で送る</strong></td></tr>
  </tbody>
</table>
```

### コード

`className` は付けない。中身はテンプレートリテラルで囲む。

```tsx
<pre>
  <code>{`res.cookie("session", sessionId, {
  httpOnly: true,
  sameSite: "lax",
});`}</code>
</pre>
```

### 強調

- `<strong>` … その節の要点。1節に1〜2箇所まで。
- `<code>` … 識別子・コマンド・属性名。
- `<Term>` … 用語の初出。2度目以降は素のテキスト。

### JSXでの注意

- 日本語の括弧内に `<` `>` を書くときは `&lt;` `&gt;`。
- `{` `}` はそのままでは式として解釈される。文字として出すなら `{"{"}`。
