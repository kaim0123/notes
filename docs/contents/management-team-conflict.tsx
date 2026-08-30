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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンフリクトマネジメント",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>コンフリクトマネジメント ― 対立を成果に変える</h1>
        <Lead>
          組織の中で人がぶつかり合うのは、悪いことではありません。むしろ<Term>真面目に一生懸命やっているからこそ</Term>対立は生まれます。大切なのは対立を抑え込むことではなく、生産的な対立を健全に顕在化させ、<Term>Win-Win</Term>へ導くことです。ここでは<Term>コンフリクト</Term>の種類を見分け、会議の質を診断し、ハーバード流交渉術で解決するまでを整理します。
        </Lead>
      </Hero>

      <Heading num="01">コンフリクトは自然で、健全さの証</Heading>
      <p>人はそれぞれの主義・信条を抱えながら共通目的に向かいます。だからこそ、目的の認識やそこへの到達方法をめぐって意見が対立するのは<Term>極めて自然な現象</Term>です。ゴールややり方をどうでもよいと思っているときほど、人はぶつかりません。真剣に取り組んでいるからこそ衝突が起きるのです。したがって<Term>良き組織とは、健全にコンフリクトが起こる組織</Term>だと言えます。対立を抑え込もうとするより、適切に顕在化させ、建設的に処理する仕組みのほうが重要になります。</p>

      <Heading num="02">生産的コンフリクトと非生産的コンフリクト</Heading>
      <p>コンフリクトには、組織を強くする<Term>生産的</Term>なものと、組織を蝕む<Term>非生産的</Term>なものがあります。この2つを見分けることが出発点です。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">課題のコンフリクト</td><td>直面している課題や目指すゴールについての見解の相違（生産的）</td><td>「何を解決すべきか」</td></tr>
          <tr><td className="hl">過程のコンフリクト</td><td>ゴールに至る方法をめぐる食い違い（生産的）</td><td>既存顧客の深耕か、新規開拓か</td></tr>
          <tr><td className="hl">感情的コンフリクト</td><td>個人攻撃や敵対感情（非生産的）</td><td>ポール・マッカートニーとジョン・レノンの決裂</td></tr>
        </tbody>
      </table>
      <p><Term>課題のコンフリクト（タスクコンフリクト）</Term>は「会社が今直面している課題は何か」「目指すゴールは何か」の相違、<Term>過程のコンフリクト</Term>は「そこへどう至るか」の相違です。どちらも棚卸しすれば「そういう方法もあるね」と発見が生まれ、組織を強くします。一方<Term>感情的コンフリクト</Term>は「あいつが許せない」という個人攻撃・敵対感情で、盟友だった関係でも長く続けば組織を空中分解させます。かつての名コンビが感情的対立で決裂した例は、その怖さを物語ります。</p>

      <Heading num="03">良い会議の条件 ― 4象限で診る</Heading>
      <p>会議の質は、<Term>課題・過程のコンフリクトが顕在化しているか</Term>と<Term>感情的対立がないか</Term>の2軸で診断できます。</p>
      <table>
        <thead>
          <tr><th>会議の状態</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">課題・過程が顕在化し、感情的対立がない</td><td>◎ 生産的（目指すべき姿）</td></tr>
          <tr><td className="hl">コンフリクトが全くない（現状確認だけ）</td><td>△ 静かすぎる</td></tr>
          <tr><td className="hl">コンフリクトが激しく、感情的対立も含む</td><td>× うるさすぎる</td></tr>
          <tr><td className="hl">合意しているのに感情的対立だけがある</td><td>✕✕ どなり合い（会議ですらない）</td></tr>
        </tbody>
      </table>
      <p>もっとも良いのは、課題・過程の対立が活発に交わされつつ、感情的対立がない状態です。逆に<Term>静かすぎる会議</Term>は現状確認に終始し意味が薄く、<Term>うるさすぎる会議</Term>は決着がつきません。最悪なのは、物事には合意しているのに感情だけがぶつかる<Term>どなり合い</Term>で、これはもはや会議ですらありません。そして優れた経営者・マネージャーが必ず実践するのが、<Term>その場で解決する（持ち帰らない）</Term>ことです。会議のデザインは、感情的対立を排除しつつ課題・過程の対立を顕在化させる場づくりに尽きます。率直な意見が出る前提には、<Link href="/management/team/psychological-safety">心理的安全性</Link>が欠かせません。</p>

      <Heading num="04">ハーバード流交渉術 ― Win-Winを探す</Heading>
      <p>コンフリクト解決には<Term>定石（理論）</Term>があります。世界的に<Term>ハーバード流交渉術</Term>として知られる原則の核心は、「<Term>双方のWin-Winを探す</Term>」ことです。解決パターンは、良し悪しの順に次のように並びます。</p>
      <table>
        <thead>
          <tr><th>解決パターン</th><th>内容</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Lose-Lose</td><td>妥協できず先延ばしになり、対立構造が温存される</td><td>最悪</td></tr>
          <tr><td className="hl">Win-Lose / Lose-Win</td><td>一方が打ち負かし、他方に完全譲歩させる</td><td>しこりが残る</td></tr>
          <tr><td className="hl">妥協</td><td>双方が歩み寄る痛み分け。不満は残る</td><td>セカンドベスト</td></tr>
          <tr><td className="hl">協力（Collaboration）</td><td>双方の譲れないところがそれぞれ実現できる答えを一緒に探す</td><td>ファーストベスト</td></tr>
        </tbody>
      </table>
      <p>最悪は<Term>Lose-Lose</Term> ― お互い妥協できず先延ばしになる状態です。次に悪いのが<Term>Win-Lose / Lose-Win</Term>で、一方が勝っても相手にしこりが残ります。<Term>妥協</Term>は不満こそ残るものの、セカンドベストとして一定の評価ができます。そしてファーストベストが<Term>協力（Collaboration）</Term>です。双方の譲れないところをそれぞれ実現できる答えを、2人以上の力を使って一緒に探していく ― これこそ生産的な会議が目指す解決スタイルです。</p>
      <Aside label="つながり">Win-Winを一緒に探す姿勢は、リーダーが「ここにいたい」と思える場を整える<Link href="/management/team/leadership">M（メンテナンス）の働きかけ</Link>とも重なります。</Aside>

      <Heading num="05">実践はビジネススキル ― 繰り返しで技術が育つ</Heading>
      <p>「言うは易く行うは難し」と感じるかもしれません。しかし、<Term>ゴールを共有し、感情的対立を排し、課題・過程のコンフリクトに集中してWin-Winを探す</Term> ― これを繰り返し続けることで、組織に技術が蓄積されていきます。一人ひとりが体得すれば、生産的な会議のやり方は能力として育ちます。これはれっきとした<Term>ビジネススキル</Term>であり、身につけるほど、建設的な対立に積極的に取り組む組織文化が生まれ、組織は健全に強くなっていきます。会議運営やチームの約束ごとは<Link href="/management/team/rules">ルールと相互理解</Link>ともつながります。</p>

      <Analogy label="💡 たとえるなら">
        コンフリクトは<Term>火</Term>のようなものです。うまく扱えば料理を作り、暖をとり、鉄を鍛える ― 課題や過程をめぐる建設的な対立は、まさにこの「役立つ火」です。しかし感情的対立という<Term>燃え広がる火</Term>を放置すれば、家ごと焼き尽くしてしまいます。マネージャーの仕事は火を消すことではなく、<Term>竈（かまど）</Term>を用意して、火を安全に、生産的に燃やすことです。
      </Analogy>

      <Heading num="まとめ">対立を見分け、その場でWin-Winへ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>対立は健全さの証</h4><p>真剣だからこそぶつかる。良き組織は健全にコンフリクトが起こります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>感情を排し課題に集中</h4><p>課題・過程の対立は活かし、感情的対立は排除する。会議はその場で解決します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ファーストベストは協力</h4><p>Lose-Loseや妥協より、双方の譲れない点を一緒に実現するCollaborationを目指します。</p></Card>
      </CardGrid>
      <p>対立を成果に変える技術は、率直に言い合える場があってこそ機能します。次は<Link href="/management/team/psychological-safety">心理的安全性</Link>や、チームの約束ごとを扱う<Link href="/management/team/rules">ルールと相互理解</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/team/psychological-safety" tag="マネジメント">心理的安全性</RelatedLink>
                    <RelatedLink href="/management/team/rules" tag="マネジメント">実践編 ― ルールと相互理解</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
