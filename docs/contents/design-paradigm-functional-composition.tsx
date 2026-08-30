import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "関数を組み合わせる",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Higher-Order Function(高階関数)", desc: "関数を引数・戻り値にする", tier: "must" },
  { name: "Function Composition(関数合成)", desc: "小さな関数を組み合わせる", tier: "must" },
  { name: "Pipeline", desc: "処理を上から下へ流す", tier: "must" },
  { name: "Map / Filter / Reduce", desc: "コレクション操作", tier: "must" },
  { name: "Lazy Evaluation(遅延評価)", desc: "必要になるまで計算しない", tier: "niche", note: "→ 大量データの中間配列を作らずに済ませたい場面で効いてくる" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; 関数型 &middot; パターン</Eyebrow>
        <h1>関数を組み合わせる ― 高階関数・合成・パイプライン・遅延評価</h1>
        <Lead>
          <Link href="/design/paradigm/functional/foundations">純粋関数とイミュータビリティ</Link>を基本単位に、実際にプログラムを組み立てるための5つの技法です。どれも「小さな関数を、より大きな処理へつなげる」という1つの発想のバリエーションです。
        </Lead>
      </Hero>

      <Heading num="01">5つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Higher-Order Function(高階関数) ― 関数を引数・戻り値にする</Heading>
      <p><Term>高階関数</Term>は、関数を引数として受け取ったり、関数を戻り値として返したりする関数です。「何をするか」の詳細を、呼び出し側から渡された関数に委ねられるため、処理の骨組みと中身の実装を分離できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 関数を戻り値として返す高階関数
function multiplier(factor: number) {
  return (n: number) => n * factor;
}

const double = multiplier(2);
double(5); // 10

// 関数を引数として受け取る高階関数(配列のmapも高階関数)
numbers.map((n) => n * 2);`}</code>
      </pre>

      <Heading num="03">Function Composition(関数合成) ― 小さな関数をつなげる</Heading>
      <p>1つの関数の出力を、次の関数の入力にそのまま渡すことで、複数の小さな純粋関数から1つの大きな関数を作ります。<code>compose</code>は数学の関数合成 <code>f(g(x))</code> と同じく右から左へ、<code>pipe</code>は左から右へ順に適用する点だけが違います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const compose = <T,>(...fns: Array<(x: T) => T>) =>
  (input: T) => fns.reduceRight((acc, fn) => fn(acc), input);

const pipe = <T,>(...fns: Array<(x: T) => T>) =>
  (input: T) => fns.reduce((acc, fn) => fn(acc), input);

const shout = pipe(trim, toUpperCase, addExclamation);
shout("  hello "); // "HELLO!"`}</code>
      </pre>

      <Heading num="04">Pipeline ― 処理を上から下へ流す</Heading>
      <p><Term>Pipeline</Term>は関数合成の考え方を、読む順番どおりに上から下へ書けるように並べたものです。<code>compose</code>を何段も入れ子にすると実行順と読む順が逆になり読みにくくなりますが、<code>pipe</code>ベースのパイプラインなら「入力 → 手順1 → 手順2 → 出力」を書いた順に処理が流れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const total = pipe(
  removeCancelledOrders,
  applyDiscount,
  sumPrices,
)(orders);`}</code>
      </pre>

      <Heading num="05">Map / Filter / Reduce ― コレクション操作の3点セット</Heading>
      <p>配列の要素を1つずつ変換する<code>map</code>、条件に合う要素だけ残す<code>filter</code>、複数の要素を1つの値にまとめる<code>reduce</code>は、for文によるループを、意図が名前から読み取れる形に置き換えたものです。3つを組み合わせることで、ほとんどのコレクション操作を宣言的に書けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const total = orders
  .filter((o) => o.status !== "cancelled")
  .map((o) => o.price * (1 - o.discountRate))
  .reduce((sum, price) => sum + price, 0);`}</code>
      </pre>

      <Heading num="06">Lazy Evaluation(遅延評価) ― 必要になるまで計算しない</Heading>
      <p>上のMap/Filter/Reduceの例は、1段ごとに新しい配列を丸ごと作ってから次の段へ渡す<Term>先行評価</Term>です。データ量が多い場合や、先頭の数件だけ欲しい場合には無駄が生じます。<Term>遅延評価</Term>は、値が実際に必要になった瞬間まで計算を遅らせることで、この無駄を避けます。JavaScript/TypeScriptにはジェネレータを使うことで実現できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function* mapLazy<T, U>(iter: Iterable<T>, fn: (x: T) => U) {
  for (const x of iter) yield fn(x);
}

// ここではまだ何も計算されない
const doubled = mapLazy(hugeArray, (n) => n * 2);

// forEach的に値を取り出した瞬間、その要素分だけ計算される
for (const n of doubled) {
  if (n > 100) break; // 条件に達したら残りは一切計算しない
}`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        高階関数は「作業を丸ごと部下に任せられる上司」、関数合成とパイプラインは「工程を順番につないだベルトコンベア」、Map/Filter/Reduceは「選別・加工・集計という3つの定番工程」です。遅延評価は「注文が入ってから作り始める」ことに相当し、先に全部作り置きする(先行評価)よりも無駄がありません。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>高階関数</h4><p>関数を引数・戻り値として扱い、処理の骨組みと中身を分離する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>合成とパイプライン</h4><p>小さな関数をつなげ、読む順と実行順を揃える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Map/Filter/Reduce</h4><p>ループを、意図が読み取れる宣言的な操作に置き換える。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>遅延評価</h4><p>必要になるまで計算を遅らせ、無駄な計算・中間配列を避ける。</p></Card>
      </CardGrid>

      <p>次のページでは、関数の引数の一部だけを先に固定する<Link href="/design/paradigm/functional/currying">引数を固定する</Link>技法(カリー化・部分適用)を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional/foundations" tag="設計">純粋関数とイミュータビリティ</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/currying" tag="設計">引数を固定する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
