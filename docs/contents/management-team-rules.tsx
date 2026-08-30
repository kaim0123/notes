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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ルールと相互理解",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>ルールと相互理解 ― 急拡大でも壊れないチーム</h1>
        <Lead>
          人が急に増えるフェーズで最も危険なのは、<Term>ルールなき丸投げ</Term>です。バックグラウンドの違うメンバーが混ざるほど、少数の<Term>ルール</Term>で足並みを揃え、意図的に設計された<Term>相互理解</Term>で信頼を積む ― この2つが、拡大しても壊れないチームの背骨になります。
        </Lead>
      </Hero>

      <Heading num="01">急拡大では、まずルールを決める</Heading>
      <p>人が急増するフェーズでは、ルールなき丸投げが最も危険です。最低限のルールを決めることが、急拡大期の第一歩になります。ここでいう<Term>ルール</Term>とは、チームの価値観・運営方針に基づき、<Term>必ず全員で守りたいこと</Term>です。</p>
      <ul>
        <li>能力に関係なく、<Term>努力次第で誰もが守れる</Term>こと</li>
        <li>守れなければ<Term>チームメンバーの要件を満たさない</Term>と判断されるもの</li>
      </ul>
      <p>信号と同じです。青なら進め、赤なら止まれ ― <Term>能力の良し悪しは関係ありません</Term>。</p>

      <Heading num="02">ルールを守る3つの効果</Heading>
      <table>
        <thead>
          <tr><th>効果</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">マネジメントコストが下がる</td><td>都度の指摘が減る</td></tr>
          <tr><td className="hl">価値観を超えた連携</td><td>中途採用・バックグラウンドの違うメンバーが混在しても足並みが揃う</td></tr>
          <tr><td className="hl">チームビルディングになる</td><td>「ルールを守れた」という成功体験が、お互いを信頼できる人だと感じさせる</td></tr>
        </tbody>
      </table>

      <Heading num="03">運用の鉄則 ― 少なく、絶対に守らせる</Heading>
      <p>ルールは、成果や能力がどれだけ高くても<Term>例外を作らない</Term>ことが肝心です。違反は<Term>能力評価と切り離し</Term>、大幅減点（10点マイナス程度）にとどめます。「成果が良いからルール違反は許す」としてしまうと、周囲に<Term>「ルールを守らなくても高評価」</Term>という事実が残り、ルールが<Term>「推奨」に格下げ</Term>されてしまいます。</p>
      <p>また、ルールが5個・10個・20個と増えると、守るだけで意識が疲弊します。<Term>少なく絞り、絶対に守らせる</Term>ほうが組織運営として優れています。日本は油断するとルールが増えやすいので、<Term>ルールとポリシー（方針）</Term>を明確に区別します。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>性質</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ルール</td><td>絶対に守る。能力は問わない</td><td>出勤報告、信号</td></tr>
          <tr><td className="hl">ポリシー</td><td>心がけ。能力に依存する</td><td>会議で積極的に発言しましょう</td></tr>
        </tbody>
      </table>
      <Aside label="ポリシーをルール化しない">
        「会議で発言しましょう」をルールにすると、発言のための発言が増えて非効率になります。<Term>ポリシー</Term>として整理すれば、発言できなかったこと自体は問題になりません。
      </Aside>

      <Heading num="04">チームを強くする「相互理解」</Heading>
      <p>急拡大期は、ルールを意図的に増やすタイミングでもあります。<Term>ルールによる信頼の成功体験 × 深い相互理解</Term> が、急拡大しても壊れないチームをつくります。相互理解には2種類あります。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>内容</th><th>達成方法</th><th>限界</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">認知の相互理解</td><td>顔・名前・所属が分かる</td><td>名簿、自己紹介、歓迎会</td><td>仕事仲間としての信頼には不十分</td></tr>
          <tr><td className="hl">仲間の相互理解</td><td>仕事への考え方・人間性を深く知る</td><td>マネージャーが設計する</td><td>自然発生しない</td></tr>
        </tbody>
      </table>

      <Heading num="05">仲間の相互理解を生む3つの手法</Heading>
      <Steps>
        <li><Term>繋げる</Term>：AさんとBさんを、お互いの強み・経歴を紹介したうえで「一度話してみて」とつなぐ。お互いのニーズを理解した状態で接点が生まれる。</li>
        <li><Term>一緒に仕事をする</Term>：ブレストなど、3〜4人を巻き込みやすい仕事の場をデザインし、同じ場で議論する体験をつくる。</li>
        <li><Term>共に学ぶ</Term>：勉強会をしたら、その内容を業務にどう活かすかを全員でディスカッションする。共通言語＋業務の話で深い会話がしやすい。</li>
      </Steps>
      <p>「2人で話しといて」だけでは<Term>絶対に生まれません</Term>。現代のマネージャーは、成果を出すことに加えて<Term>コミュニティマネージャー</Term>的な要素も担う必要があります。これは<Term>管理職自身</Term>が担うのがベストです（当事者意識が高いため）。人事が横から支援することはあり得ますが、部署への踏み込みは弱くなります。</p>

      <Heading num="06">飲み会は必要か？ ― 頼らない方がよい</Heading>
      <p>結論として、<Term>飲み会に頼らない方がよい</Term>です。</p>
      <ul>
        <li>意図のない飲み会・カラオケに相互理解の効果は<Term>ほぼありません</Term>。</li>
        <li>場の設計が乱暴だと、逆に<Term>心の距離が遠くなる</Term>・チームが嫌になることもあります。</li>
        <li>中途採用で価値観・バックグラウンドがバラバラなほど、自分の「良し」と相手の「良し」がズレやすくなります。</li>
        <li>参加メンバーだけで固まると、不参加者に<Term>疎外感</Term>が生じます。</li>
      </ul>
      <p><Term>繋げる・一緒に仕事・共に学ぶ</Term>を愚直にやる方が、コントロールしやすく効果的です。内向的で集団行動が苦手なマネージャーほど、この3手法を意識して実践すればよい、というメッセージです。</p>

      <Analogy label="💡 たとえるなら">
        ルールは交通信号、相互理解は運転者同士のアイコンタクトのようなものです。信号（ルール）は能力に関係なく全員が従うから事故が減り、少ないほど機能します。一方、狭い道でどちらが先に行くかは、目を合わせて意思疎通する（相互理解）から譲り合える。どちらか片方だけでは、急に交通量が増えたときに渋滞や衝突が起きます。
      </Analogy>

      <Heading num="まとめ">ルールと相互理解の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ルールは少なく絶対に</h4><p>努力で誰もが守れることに絞り、能力評価と切り離して例外を作らない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ポリシーと区別する</h4><p>心がけ（能力依存）はルール化しない。増やしすぎると全員が疲弊する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>相互理解は設計する</h4><p>繋げる・一緒に仕事・共に学ぶ。自然発生には任せない。飲み会に頼らない。</p></Card>
      </CardGrid>
      <p>ルールと相互理解は、方針に沿って前進する<Link href="/management/team/momentum">戦略方針とモメンタム</Link>や、チームを対象にした<Link href="/management/team">チームのマネジメント（メゾ）</Link>と響き合います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team/momentum" tag="マネジメント">戦略方針とモメンタム</RelatedLink>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">チーム運営と3つの力</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
