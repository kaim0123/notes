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
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "直列と並列で論理をつくる",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>直列と並列で論理をつくる ― AND・ORゲート</h1>
        <Lead>
          トランジスタは「条件付きで電気を通す部品」でした。ここからはその門番を<strong>組み合わせて</strong>いきます。使う道具は、小学校の理科で習った<strong>豆電球の直列つなぎ・並列つなぎ</strong>だけ。実はこの2つのつなぎ方が、そのまま<Term>かけ算</Term>と<Term>足し算</Term>になります。
        </Lead>
      </Hero>

      <p>ここでは0と1を、電気が「流れない／流れる」に対応させて考えます。回路全体に電気が流れれば<strong>1</strong>、流れなければ<strong>0</strong>です。</p>

      <Heading num="01">直列つなぎ＝かけ算(AND)</Heading>
      <p>一本の道に、豆電球が2つ<strong>直列</strong>に入っている回路を考えます。このとき、<strong>どちらか1個でもフィラメントが切れていれば</strong>、回路全体に電流が流れず、もう1個も点きません。両方とも健全(1)なときだけ、全体が点灯(1)します。</p>

      <DiagramFrame
        slug="computer-semiconductor-logic-and"
        aspect="560 / 180"
        caption="直列つなぎの回路図。電源から出た一本の道に豆電球AとBが順につながり、電源へ戻る。一本道なのでどちらか一方でも切れれば全体が消える ― 両方が1のときだけ全体が1になる、かけ算(AND)の関係。"
      />

      <table>
        <tbody>
          <tr><th>A</th><th>B</th><th>全体(A × B)</th></tr>
          <tr><td className="hl">1</td><td>1</td><td>1</td></tr>
          <tr><td className="hl">1</td><td>0</td><td>0</td></tr>
          <tr><td className="hl">0</td><td>1</td><td>0</td></tr>
          <tr><td className="hl">0</td><td>0</td><td>0</td></tr>
        </tbody>
      </table>

      <p>この表は、そのまま <strong>1×1＝1、1×0＝0、0×1＝0、0×0＝0</strong> ― <strong>かけ算</strong>になっています。小学4年生の理科の実験で、私たちはすでにかけ算回路を組んでいたわけです。この「両方1のときだけ1」の演算を<Term>AND(論理積)</Term>と呼びます。</p>

      <Heading num="02">並列つなぎ＝足し算(OR)</Heading>
      <p>今度は道が二股に分かれ、それぞれに豆電球が1個ずつ付いている<strong>並列</strong>つなぎです。片方が切れていても、もう片方の道は生きているので、<strong>全体には電流が流れます</strong>。両方切れている(0と0)ときだけ、全体が消えます。</p>

      <DiagramFrame
        slug="computer-semiconductor-logic-or"
        aspect="560 / 200"
        caption="並列つなぎの回路図。電源から出た道が二股に分かれ、上の枝に豆電球A、下の枝に豆電球Bが置かれ、その先で合流して電源へ戻る。片方が生きていれば全体に電気が流れる ― どちらか一方でも1なら全体が1になる、足し算(OR)の関係。"
      />

      <table>
        <tbody>
          <tr><th>A</th><th>B</th><th>全体(A + B)</th></tr>
          <tr><td className="hl">0</td><td>0</td><td>0</td></tr>
          <tr><td className="hl">0</td><td>1</td><td>1</td></tr>
          <tr><td className="hl">1</td><td>0</td><td>1</td></tr>
          <tr><td className="hl">1</td><td>1</td><td>1</td></tr>
        </tbody>
      </table>

      <p><strong>0+0＝0、0+1＝1、1+0＝1</strong> ― ここまでは普通の足し算そのものです。最後だけ <strong>1+1＝1</strong> になり、十進数の足し算とは違いますが、これは<Term>ブール代数</Term>という世界のルール。「足し算っぽい演算」として立派に成立しています。この「どちらか1なら1」を<Term>OR(論理和)</Term>と呼びます。</p>

      <Aside label="足し算があれば四則全部">
        直列でかけ算(AND)、並列で足し算(OR)ができました。<strong>足し算さえあれば、繰り返しによって引き算・かけ算・割り算も表現できます</strong>。つまりコンピュータの基本演算は、原理的にはこの2つのつなぎ方で揃ってしまいます。
      </Aside>

      <Heading num="03">豆電球をトランジスタに置き換える</Heading>
      <p>ここまでは豆電球で考えましたが、豆電球は「切れているか」で0/1が決まる<strong>受け身</strong>の部品です。これを<strong>トランジスタ</strong>に置き換えると、話が一気にコンピュータへ近づきます。</p>
      <p>トランジスタは「<strong>背中に電流が流れているか</strong>」で、右から左へ通すか通さないかが決まりました。そこで豆電球の代わりにトランジスタを置き、その<strong>背中に別の回路(前段の計算結果)をつなぐ</strong>と、前の結果が0か1かによって、次のトランジスタが通すか通さないかが決まります ― <strong>計算結果を次々に伝えていける</strong>のです。</p>

      <Analogy label="💡 つながっていく計算">
        門番の背中に、前の門番の判定結果をつなぐ。すると「前が通したら、こっちも構える」といった連鎖が生まれます。直列・並列をトランジスタで組み、背中に入力をつなげば、<strong>いくらでも複雑な計算</strong>が作れます。スマホの中には、この直列・並列が<strong>数億〜数百億回分</strong>集積されています。
      </Analogy>

      <Heading num="04">これが論理ゲート</Heading>
      <p>直列つなぎ＝<Term>ANDゲート</Term>(両方1でないと1にならない)。並列つなぎ＝<Term>ORゲート</Term>(どちらか1なら1)。さらに、入力を反転させる<Term>NOTゲート</Term>(0と1を逆にする)を加えた3つが、あらゆるデジタル回路の基本部品です。</p>

      <table>
        <tbody>
          <tr><th>ゲート</th><th>つなぎ方</th><th>意味</th></tr>
          <tr><td className="hl">AND</td><td>直列</td><td>両方1のときだけ1(かけ算)</td></tr>
          <tr><td className="hl">OR</td><td>並列</td><td>どちらか1なら1(足し算)</td></tr>
          <tr><td className="hl">NOT</td><td>反転</td><td>0と1を入れ替える</td></tr>
        </tbody>
      </table>

      <p>ニュースで聞く「何nmのゲート」や、半導体をめぐる話に出てくる「&amp; とか or とか not」は、まさにこの直列・並列・反転のことです。仕組みが分かってしまえば、もう怖い言葉ではありません。次のページでは、このゲートを組み合わせて<strong>本物の足し算(二進数の筆算)</strong>を実現します。</p>

      <Heading num="まとめ">この回の要点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>直列＝AND、並列＝OR</h4>
          <p>直列は「両方1で1」のかけ算、並列は「どちらか1で1」の足し算。理科の実験がそのまま論理演算でした。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>背中に前段をつなぐ</h4>
          <p>豆電球をトランジスタに替え、背中に前の結果をつなぐと、計算を次々に伝えていけます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>AND・OR・NOTが基本部品</h4>
          <p>この3つの論理ゲートが、あらゆるデジタル回路の材料になります。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/computer/semiconductor-logic" />
    </DocsPage>
  );
}
