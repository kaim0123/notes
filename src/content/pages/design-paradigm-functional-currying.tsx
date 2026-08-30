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
  title: "引数を固定する",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>引数を固定する ― カリー化と部分適用</h1>
        <Lead>
          複数の引数を取る関数の一部を先に固定し、残りの引数だけを受け取る新しい関数を作る2つの技法です。<Link href="/design/paradigm-functional-composition">関数合成・パイプライン</Link>は「1引数の関数」を前提にすることが多く、この2つはその前提を満たすための下準備としてもよく使われます。
        </Lead>
      </Hero>

      <DiagramFrame
        slug="design-paradigm-functional-currying"
        aspect="660 / 280"
        caption="カリー化と部分適用の違い。上段のカリー化では、3引数の関数が割引率を受け取る関数・税率を受け取る関数・価格を受け取る関数という3段の連鎖に分解され、1つずつ渡すたびに次の関数が返る。下段の部分適用では、元の関数の形を保ったまま割引率と税率をまとめて先に固定し、価格だけを受け取る関数が作られる。狙いはどちらも、決まった分から先に固定することにある。"
      />

      <Heading num="01">カリー化 ― 常に1引数ずつ受け取る形にする</Heading>
      <p>
        <Term>カリー化</Term>は、<code>f(a, b, c)</code>のような複数引数の関数を、<code>f(a)(b)(c)</code>のように1引数ずつ受け取り、最後の引数が揃うまで関数を返し続ける形に変換することです。
      </p>
      <pre>
        <code>{`// 通常の3引数関数
function discount(rate: number, tax: number, price: number): number {
  return price * (1 - rate) * (1 + tax);
}

// カリー化した形
const curriedDiscount =
  (rate: number) => (tax: number) => (price: number) =>
    price * (1 - rate) * (1 + tax);

const withStandardTax = curriedDiscount(0.1)(0.1); // rate・tax はここで確定
withStandardTax(1000); // あとは price を渡すだけ`}</code>
      </pre>

      <Heading num="02">部分適用 ― 一部の引数だけ先に固定する</Heading>
      <p>
        <Term>部分適用</Term>は、カリー化のように必ず1引数ずつではなく、任意の個数の引数をまとめて先に固定し、残りをあとから渡せる関数を作ることです。<code>Function.prototype.bind</code>で簡単に実現できます。
      </p>
      <pre>
        <code>{`function discount(rate: number, tax: number, price: number): number {
  return price * (1 - rate) * (1 + tax);
}

// rate と tax の2つをまとめて先に固定(1引数ずつではない)
const withStandardTax = discount.bind(null, 0.1, 0.1);
withStandardTax(1000); // price だけ渡せばよい`}</code>
      </pre>

      <Heading num="03">違いと使い分け</Heading>
      <p>
        両者は「一部の引数を先に固定する」という結果は同じですが、カリー化は関数の形そのものを「常に1引数ずつ」に変換する仕組みであるのに対し、部分適用は元の関数の形を保ったまま、好きな個数の引数だけをその場で固定する操作です。カリー化された関数に1引数だけ渡すことは、結果的に部分適用の一種とも言えます。実務でどちらを選ぶか悩む必要はなく、「引数を1つずつ順番に受け取りたいか」「まとめて何個か固定したいか」で自然に決まります。
      </p>

      <Analogy label="💡 たとえるなら">
        カリー化は「注文を1品ずつ確定させ、最後の1品を頼んだ瞬間に会計が確定する」注文方法です。部分適用は「いつものセットを先に決めておき、残りの1品だけをその都度選ぶ」ことに相当します。どちらも「全部の情報が揃うまで待たず、決まった分から先に固定していく」という発想は共通しています。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>カリー化</h4>
          <p>常に1引数ずつ受け取る形に変換し、途中の段階を関数として取り出せる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>部分適用</h4>
          <p>元の関数の形のまま、任意の個数の引数をまとめて先に固定する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>使い分け</h4>
          <p>1つずつ確定させたいか、まとめて固定したいかで自然に選び分ける。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-functional-currying" />
    </DocsPage>
  );
}
