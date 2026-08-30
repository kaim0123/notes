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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "引数を固定する",
};

function TierBadge() {
  return <Mark tier="niche">よく使う</Mark>;
}

const rows = [
  { name: "Currying(カリー化)", desc: "引数を分割する" },
  { name: "Partial Application(部分適用)", desc: "一部の引数だけ固定する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; 関数型 &middot; パターン</Eyebrow>
        <h1>引数を固定する ― カリー化と部分適用</h1>
        <Lead>
          複数の引数を取る関数の一部を先に固定し、残りの引数だけを受け取る新しい関数を作る2つの技法です。<Link href="/design/paradigm/functional/composition">前ページ</Link>の関数合成・パイプラインは「1引数の関数」を前提にすることが多く、この2つはその前提を満たすための下準備としてもよく使われます。
        </Lead>
      </Hero>

      <Heading num="01">2つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Currying(カリー化) ― 複数引数の関数を1引数ずつの連鎖に変換する</Heading>
      <p><Term>カリー化</Term>は、<code>f(a, b, c)</code>のような複数引数の関数を、<code>f(a)(b)(c)</code>のように1引数ずつ受け取り、最後の引数が揃うまで関数を返し続ける形に変換することです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 通常の3引数関数
function discount(rate: number, tax: number, price: number): number {
  return price * (1 - rate) * (1 + tax);
}

// カリー化した形
const curriedDiscount = (rate: number) => (tax: number) => (price: number) =>
  price * (1 - rate) * (1 + tax);

const withStandardTax = curriedDiscount(0.1)(0.1); // rate・taxはここで確定
withStandardTax(1000); // あとはpriceを渡すだけ`}</code>
      </pre>

      <Heading num="03">Partial Application(部分適用) ― 一部の引数だけ先に固定する</Heading>
      <p><Term>部分適用</Term>は、カリー化のように必ず1引数ずつではなく、任意の個数の引数をまとめて先に固定し、残りをあとから渡せる関数を作ることです。<code>Function.prototype.bind</code>を使うと簡単に実現できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function discount(rate: number, tax: number, price: number): number {
  return price * (1 - rate) * (1 + tax);
}

// rateとtaxの2つをまとめて先に固定(1引数ずつではない)
const withStandardTax = discount.bind(null, 0.1, 0.1);
withStandardTax(1000); // priceだけ渡せばよい`}</code>
      </pre>

      <Heading num="04">違いと使い分け</Heading>
      <p>両者は「一部の引数を先に固定する」という結果は同じですが、カリー化は関数の形そのものを「常に1引数ずつ」に変換する仕組みであるのに対し、部分適用は元の関数の形を保ったまま、好きな個数の引数だけをその場で固定する操作です。カリー化された関数に1引数だけ渡すことは、結果的に部分適用の1種とも言えます。実務でどちらを選ぶかで悩む必要はなく、「引数を1つずつ順番に受け取っていきたいか」「まとめて何個か固定したいか」で自然と決まります。</p>

      <Analogy label="💡 たとえるなら">
        カリー化は「注文を1品ずつ確定させ、最後の1品を頼んだ瞬間に会計が確定する」注文方法です。部分適用は「いつものセット(何品かをまとめて)を先に決めておき、残りの1品だけをその都度選ぶ」ことに相当します。どちらも「全部の情報が揃うまで待たず、決まった分から先に固定していく」という発想は共通しています。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>カリー化</h4><p><code>f(a)(b)(c)</code>のように、常に1引数ずつ受け取る形に変換する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>部分適用</h4><p>元の関数の形のまま、任意の個数の引数をまとめて先に固定する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>使い分け</h4><p>1つずつ確定させたいか、まとめて固定したいかで自然に選び分ける。</p></Card>
      </CardGrid>

      <p>最後に、値が無いかもしれないことや処理が失敗するかもしれないことを、例外ではなく型と分岐で安全に扱う<Link href="/design/paradigm/functional/safety">安全に分岐する</Link>技法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional/composition" tag="設計">関数を組み合わせる</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/safety" tag="設計">安全に分岐する</RelatedLink>
                    <RelatedLink href="/design/idioms" tag="設計">実装パターン・イディオム</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
