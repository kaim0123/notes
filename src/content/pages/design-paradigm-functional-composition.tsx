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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "関数を組み合わせる",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>関数を組み合わせる ― 高階関数・合成・パイプライン・遅延評価</h1>
        <Lead>
          <Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>を基本単位に、実際にプログラムを組み立てるための技法です。どれも「小さな関数を、より大きな処理へつなげる」という1つの発想のバリエーションです。
        </Lead>
      </Hero>

      <Heading num="01">高階関数 ― 関数を引数・戻り値にする</Heading>
      <p>
        <Term>高階関数</Term>は、関数を引数として受け取ったり、関数を戻り値として返したりする関数です。「何をするか」の詳細を呼び出し側から渡された関数に委ねられるため、処理の骨組みと中身の実装を分離できます。
      </p>
      <pre>
        <code>{`// 関数を戻り値として返す高階関数
function multiplier(factor: number) {
  return (n: number) => n * factor;
}

const double = multiplier(2);
double(5); // 10

// 関数を引数として受け取る高階関数(配列の map も高階関数)
numbers.map((n) => n * 2);`}</code>
      </pre>

      <Heading num="02">関数合成 ― 小さな関数をつなげる</Heading>
      <p>
        1つの関数の出力を次の関数の入力にそのまま渡すことで、複数の小さな純粋関数から1つの大きな関数を作ります。<code>compose</code>は数学の関数合成と同じく右から左へ、<code>pipe</code>は左から右へ順に適用する点だけが違います。
      </p>
      <pre>
        <code>{`const compose = <T,>(...fns: Array<(x: T) => T>) =>
  (input: T) => fns.reduceRight((acc, fn) => fn(acc), input);

const pipe = <T,>(...fns: Array<(x: T) => T>) =>
  (input: T) => fns.reduce((acc, fn) => fn(acc), input);

const shout = pipe(trim, toUpperCase, addExclamation);
shout("  hello "); // "HELLO!"`}</code>
      </pre>

      <Heading num="03">パイプライン ― 処理を上から下へ流す</Heading>
      <p>
        <Term>パイプライン</Term>は、関数合成の考え方を読む順番どおりに書けるよう並べたものです。<code>compose</code>を何段も入れ子にすると実行順と読む順が逆になりますが、<code>pipe</code>ベースなら「入力 → 手順1 → 手順2 → 出力」が書いた順に流れます。
      </p>

      <DiagramFrame
        slug="design-paradigm-functional-pipeline"
        aspect="700 / 260"
        caption="パイプラインによる処理の流れ。注文一覧が、キャンセルを除く(filter)、割引後の金額にする(map)、合計する(reduce)という3段を順に通り、最後に合計金額になる。各段の下にはその時点でのデータの形が添えられ、注文の配列から金額の配列、1つの数値へと変わっていく。各段は前の段の出力だけを受け取るため、段の差し替えが他に影響しない。"
      />

      <pre>
        <code>{`const total = pipe(
  removeCancelledOrders,
  applyDiscount,
  sumPrices,
)(orders);`}</code>
      </pre>

      <Heading num="04">map / filter / reduce ― コレクション操作の3点セット</Heading>
      <p>
        配列の要素を1つずつ変換する<code>map</code>、条件に合う要素だけ残す<code>filter</code>、複数の要素を1つの値にまとめる<code>reduce</code>は、for文によるループを「意図が名前から読み取れる形」に置き換えたものです。3つの組み合わせで、ほとんどのコレクション操作を宣言的に書けます。
      </p>
      <pre>
        <code>{`const total = orders
  .filter((o) => o.status !== "cancelled")
  .map((o) => o.price * (1 - o.discountRate))
  .reduce((sum, price) => sum + price, 0);`}</code>
      </pre>

      <Heading num="05">遅延評価 ― 必要になるまで計算しない</Heading>
      <p>
        上の例は、1段ごとに新しい配列を丸ごと作ってから次の段へ渡す<Term>先行評価</Term>です。データ量が多い場合や先頭の数件だけ欲しい場合には無駄が生じます。<Term>遅延評価</Term>は、値が実際に必要になった瞬間まで計算を遅らせることでこの無駄を避けます。JavaScript/TypeScriptではジェネレータで実現できます。
      </p>
      <pre>
        <code>{`function* mapLazy<T, U>(iter: Iterable<T>, fn: (x: T) => U) {
  for (const x of iter) yield fn(x);
}

// ここではまだ何も計算されない
const doubled = mapLazy(hugeArray, (n) => n * 2);

// 値を取り出した瞬間、その要素の分だけ計算される
for (const n of doubled) {
  if (n > 100) break; // 条件に達したら残りは一切計算しない
}`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        高階関数は「作業を丸ごと部下に任せられる上司」、関数合成とパイプラインは「工程を順番につないだベルトコンベア」、map/filter/reduceは「選別・加工・集計という3つの定番工程」です。遅延評価は「注文が入ってから作り始める」ことに相当し、先に全部作り置きするより無駄がありません。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>高階関数</h4>
          <p>関数を引数・戻り値として扱い、処理の骨組みと中身を分離する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>合成とパイプライン</h4>
          <p>小さな関数をつなげ、読む順と実行順を揃える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>遅延評価</h4>
          <p>必要になるまで計算を遅らせ、無駄な中間配列を避ける。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-functional-composition" />
    </DocsPage>
  );
}
