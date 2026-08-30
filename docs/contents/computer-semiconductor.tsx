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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "半導体の全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>半導体 ― ただの物質から「足し算」が生まれるまで</h1>
        <Lead>
          コンピュータは「ちっちゃな計算しかできないが、それを異常な回数こなす」機械です。ではその計算を、物理的に実現しているものは何か ― 答えが<Term>半導体</Term>です。このシリーズのゴールは、<strong>半導体で足し算ができるところまで理解する</strong>こと。石ころのような物質から、なぜ計算が生まれるのかを4ページで追いかけます。
        </Lead>
      </Hero>

      <p>「半導体」という言葉は誰もが聞いたことがありますが、「それの何がそんなに大事なのか」はぼんやりしがちです。まずは登場人物を最小限に絞り、<strong>トランジスタひとりだけ</strong>を主役として押さえることから始めます。</p>

      <Heading num="01">半導体とは何か ― まずはとりあえずの説明</Heading>
      <p><Term>半導体</Term>とは、電気を通す<strong>導体</strong>(金属など)と、電気を通さない<strong>絶縁体</strong>の、ちょうど<strong>中間</strong>の性質を持つもの ― という説明はよく聞きます。ただ、これだけだと「導体・絶縁体は物質の種類の名前だろう。じゃあ半導体という物質は何なんだ」とモヤモヤします。</p>
      <p>その答えが<Term>シリコン(Si)</Term>です。シリコンバレー、シリコンウエハーでおなじみのあれです。つまり「半導体」というのは<strong>性質を表す言葉</strong>にすぎず、しかも「中間」というあいまいな言い方なので、言葉だけではピンとこないのが普通です。ここでは深追いせず、「電気を通したり通さなかったりする、ちょっと変わった物質がある」くらいで先に進みます。</p>

      <Aside label="用語はあえてごちゃまぜに">
        電圧・電流・電位などを厳密に区別しはじめると高校物理からやり直すことになります。このシリーズでは「電気が流れる」「電流が流れる」あたりを<strong>ざっくり同じ意味</strong>として扱います。原理のイメージをつかむことを最優先します。
      </Aside>

      <Heading num="02">主役はトランジスタ、ただひとり</Heading>
      <p>「半導体で計算する」と言われても、正直「ゴミ箱でステーキを焼く」くらいに意味不明に聞こえます。電気を通したり通さなかったりする性質を、どうやって足し算に化けさせるのか ― そこへ至る前に、コンピュータを形づくる<strong>登場人物</strong>を紹介します。</p>
      <p>といっても、覚えるべきは<Term>トランジスタ</Term>ひとつだけです。<strong>半導体がすごい＝トランジスタがすごい</strong>と置き換えてしまって構いません。半導体をいくつか組み合わせるとトランジスタになり、トランジスタが集まるとコンピュータになる。まずは「半導体が集まるとトランジスタになる」ことだけ頭に入れておきます。</p>

      <p>トランジスタの語源は <strong>transfer + resistor</strong>(伝達する抵抗)。イメージは<strong>屈強な門番</strong>です。</p>

      <Analogy label="💡 たとえるなら">
        トランジスタは<strong>集中力のない門番</strong>です。基本は仕事熱心で、右から左へ通り抜けようとする電気を<strong>止めます</strong>。ところがかわいいところがあって、<strong>背中から友達(電気)がやってくると、そっちが気になって仕事をサボり、右から左へ全部通してしまう</strong>のです。つまり「背中に電気が流れている間だけ、右から左へ電気を通す」 ― <strong>条件付きで電気を流す装置</strong>、それがトランジスタです。
      </Analogy>

      <Diagram caption="トランジスタ:背中(ゲート)に電気が来ている間だけ、右から左へ電気を通す">
        <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={220} y={70} width={120} height={70} fill="none" stroke="#39ff6a" strokeWidth="1.5" rx="6" />
          <text x={280} y={110} fill="#f2f2f2" fontSize="14" textAnchor="middle">トランジスタ</text>

          <line x1={90} y1={105} x2={220} y2={105} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={110} y={95} fill="#9a9a9a" fontSize="12">入口</text>
          <line x1={340} y1={105} x2={470} y2={105} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={420} y={95} fill="#9a9a9a" fontSize="12">出口</text>

          <line x1={280} y1={200} x2={280} y2={140} stroke="#39ff6a" strokeWidth="1.5" />
          <polygon points="280,140 273,153 287,153" fill="#39ff6a" />
          <text x={280} y={218} fill="#39ff6a" fontSize="12" textAnchor="middle">背中(ゲート)= ここに電気が来ると開く</text>
        </svg>
      </Diagram>

      <p>ダイオードや抵抗、コンデンサなど、電子回路の部品は他にもたくさんあります。けれど、コンピュータの根本的な動作原理を理解するうえで本質的に重要なのは<strong>トランジスタだけ</strong>です。登場人物はトランジスタひとりと覚えておけば十分です。</p>

      <Heading num="03">身の回りは、ほとんど全部半導体</Heading>
      <p>パソコン・スマホ・カーナビ・洗濯機・炊飯器・車の電気系統 ― 身の回りの電子機器のほとんどにコンピュータが乗っており、<strong>コンピュータは半導体の塊</strong>と考えて差し支えありません。そしてそれらは、外見も用途もバラバラなのに、<strong>すべて同じたったひとつの原理</strong>で動いています。</p>
      <p>その原理を、これから3ページかけて解きほぐします。「門番であるトランジスタ」を組み合わせると、どうやって<strong>本物の足し算</strong>にたどり着くのか。順番に見ていきましょう。</p>

      <Heading num="まとめ">ここまでの3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>半導体は「性質」の名前</h4>
          <p>導体と絶縁体の中間。物質としての正体はシリコン(Si)。まずは「電気を通したり通さなかったりする物質」で十分です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>主役はトランジスタだけ</h4>
          <p>半導体を組み合わせたものがトランジスタ。背中に電気が来たときだけ通す「集中力のない門番」です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>身の回りは全部同じ原理</h4>
          <p>スマホも洗濯機も、トランジスタの集まりで同じ原理で動いています。次からその原理を掘ります。</p>
        </Card>
      </CardGrid>

      <Heading num="次へ">足し算にたどり着くまでの3ステップ</Heading>
      <p>ここから先は、「門番のトランジスタ」から「本物の足し算」までを3段階で組み立てます。上から順に読むのがおすすめです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>トランジスタの正体</h4>
          <p>n型とp型、そして「巨大プリン」のたとえで、半導体がどうやって条件付きで電気を通すのかを覗きます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>直列と並列で論理をつくる</h4>
          <p>豆電球の直列＝かけ算(AND)、並列＝足し算(OR)。トランジスタを置き換えると論理ゲートになります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>足し算をつくる ― 加算器</h4>
          <p>ゲートを組み合わせて半加算器・全加算器へ。二進数の筆算を回路で実現し、ゴールに到達します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/semiconductor/transistor" tag="コンピュータ">トランジスタの正体 ― n型・p型と巨大プリン</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/logic" tag="コンピュータ">直列と並列で論理をつくる ― AND・ORゲート</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/adder" tag="コンピュータ">足し算をつくる ― 半加算器と全加算器</RelatedLink>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
