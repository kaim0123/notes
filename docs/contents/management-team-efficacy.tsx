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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "組織効力感",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>組織効力感 ― 「私たちならやれる」という確信</h1>
        <Lead>
          同じ実力のチームでも、「<Term>自分たちならやれる</Term>」と信じているチームと、「どうせ無理だ」と諦めているチームでは、結果がまるで変わります。この集団としての手応えが<Term>組織効力感（集合的効力感）</Term>です。その源流にある個人の<Term>自己効力感</Term>から説き起こし、それをどうチーム全体に広げるかを見ていきます。<Link href="/management/team/psychological-safety">心理的安全性</Link>が「言える場」なら、組織効力感は「<Term>やれると思える場</Term>」であり、両輪でチームの力を引き出します。
        </Lead>
      </Hero>

      <Heading num="01">効力感とは ―「できそう」という予期</Heading>
      <p><Term>効力感</Term>とは、ある課題に対して「自分（たち）ならうまくやれそうだ」という<Term>見込み・確信</Term>のことです。心理学者<Term>バンデューラ</Term>が提唱した<Term>自己効力感（セルフ・エフィカシー）</Term>がその原型です。ここで大切なのは、効力感は<Term>実際の能力そのものではない</Term>という点です。同じスキルを持っていても、「やれる」と思えるかどうかで、挑戦するか・粘れるか・立ち直れるかが変わります。効力感が高い人ほど困難な目標を選び、失敗しても努力を続けます。</p>
      <Aside label="モチベーションとのつながり">効力感は、行動を起こす手前のスイッチです。「やってもできない」と思えば、どんなに魅力的な目標でも人は動きません。この点は<Link href="/management/individual/motivation">モチベーション理論</Link>、とりわけ「期待（やればできる見込み）」を重視するブルームの期待理論と深くつながっています。</Aside>

      <Heading num="02">自己効力感を生む4つの源泉</Heading>
      <p>では、効力感はどこから来るのか。バンデューラは4つの源泉を挙げました。<Term>上から順に効果が強い</Term>とされ、マネージャーが効力感を育てるための具体的なレバーになります。</p>
      <table>
        <thead>
          <tr><th>源泉</th><th>内容</th><th>現場での働きかけ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 達成体験</td><td>自分で実際にやり遂げた経験（最も強力）</td><td>小さくても「できた」を積ませる。スモールステップで成功を設計する</td></tr>
          <tr><td className="hl">② 代理体験</td><td>他者の成功を見て「自分にもできそう」と思う</td><td>似た立場の同僚のロールモデルを示す</td></tr>
          <tr><td className="hl">③ 言語的説得</td><td>信頼できる人からの励まし・承認</td><td>根拠を添えて「あなたならできる」と伝える</td></tr>
          <tr><td className="hl">④ 情緒的喚起</td><td>心身の状態（緊張・不安の少なさ）</td><td>過度なプレッシャーを下げ、落ち着ける状態を整える</td></tr>
        </tbody>
      </table>
      <p>最も効くのは<Term>達成体験</Term>です。だからこそ、いきなり大きな目標を課すより、<Term>成功できる大きさに課題を刻んで「できた」を積ませる</Term>ことが、効力感を育てる王道になります。これは<Link href="/management/org/structure">Will×Canのポテンシャルアサイン</Link>で「密に伴走して小さな成功を重ねる」考え方と同じです。</p>

      <Heading num="03">個人から集団へ ― 組織効力感とは</Heading>
      <p>この効力感を<Term>集団のレベルに広げた</Term>ものが、組織効力感（集合的効力感）です。「私はやれる」ではなく「<Term>私たちならやれる</Term>」という、チームで共有された確信を指します。重要なのは、これが<Term>個人の効力感の単なる足し算ではない</Term>ことです。</p>
      <Diagram caption="個人の自己効力感が、相互作用を通じてチームの確信へと立ち上がる">
        <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx={70} cy={50} r={16} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={70} y={54} fill="#9a9a9a" fontSize="10" textAnchor="middle">私</text>
          <circle cx={120} cy={35} r={16} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={120} y={39} fill="#9a9a9a" fontSize="10" textAnchor="middle">私</text>
          <circle cx={120} cy={70} r={16} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={120} y={74} fill="#9a9a9a" fontSize="10" textAnchor="middle">私</text>
          <text x={185} y={55} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <text x={250} y={40} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">相互作用</text>
          <text x={250} y={54} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">成功の共有</text>
          <text x={315} y={55} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <rect x={360} y={28} width={210} height={44} rx="22" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={465} y={47} fill="#f2f2f2" fontSize="12" textAnchor="middle">私たちならやれる</text>
          <text x={465} y={63} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">組織効力感</text>
        </svg>
      </Diagram>
      <p>集団のパフォーマンスは、メンバー個々の力に加えて<Term>連携・協働の質</Term>で決まります。だから組織効力感は、「一人ひとりが有能か」だけでなく「<Term>この面々で力を合わせればやれるか</Term>」という、協働への信頼を含みます。組織効力感が高いチームは、困難な目標に挑み、逆境でも粘り、メンバー同士が助け合います ― かつての日本の製造現場が<Link href="/management/team/psychological-safety">ラインで助け合って高品質を実現した</Link>のは、まさにこの状態でした。</p>

      <Heading num="04">組織効力感を高める ― マネージャーの実践</Heading>
      <p>4つの源泉を「チーム版」に読み替えると、そのまま実践のレバーになります。</p>
      <table>
        <thead>
          <tr><th>レバー</th><th>チームでの打ち手</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">チームの達成体験</td><td>チームで達成できる中間目標を設計し、勝ち癖をつける。共同の成功を全員で味わう</td></tr>
          <tr><td className="hl">成功の可視化と共有</td><td>うまくいった事例・他チームの成功を共有し、「自分たちにもできる」を伝播させる</td></tr>
          <tr><td className="hl">意味づけと承認</td><td>「この仕事は社会にこう役立つ」「あの局面はよく乗り切った」と価値と手応えを言語化する</td></tr>
          <tr><td className="hl">過度な不安を下げる</td><td>失敗を責めず学びに変える。心理的安全性を保ち、挑戦のコストを下げる</td></tr>
        </tbody>
      </table>
      <p>とりわけ効くのが<Term>小さな共同の成功体験</Term>です。大きな目標をチームで刻み、「やってみたら越えられた」を重ねると、集団としての手応えが積み上がります。<Link href="/management/team/momentum">モメンタム（勢い）</Link>をつくるという発想は、まさにこの組織効力感を高める営みでもあります。逆に、達成不可能な目標を課し続けると<Term>学習性無力感</Term>（何をしても無駄という諦め）に陥り、効力感は崩れます。</p>

      <Heading num="05">心理的安全性との関係 ― 車の両輪</Heading>
      <p>組織効力感は、単独では機能しません。<Link href="/management/team/psychological-safety">心理的安全性</Link>と組み合わさって初めてチームは高いパフォーマンスを出します。この2つは<Term>別の軸</Term>であり、混同してはいけません。</p>
      <table>
        <thead>
          <tr><th></th><th>心理的安全性 高</th><th>心理的安全性 低</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">効力感 高</td><td><strong>学習・高業績ゾーン</strong>（率直に言い合い、やれると信じて挑む）</td><td>不安ゾーン（やれる気はあるが本音を言えず空回り）</td></tr>
          <tr><td className="hl">効力感 低</td><td>快適ゾーン（仲は良いが挑戦せず、ぬるくなる）</td><td>無関心ゾーン（諦めと沈黙。最も危険）</td></tr>
        </tbody>
      </table>
      <p>「言える（安全性）」だけでは、ぬるま湯になりかねません。「やれる（効力感）」だけでは、本音を言えず一人で抱え込みます。<Term>率直に言い合え、かつ「私たちならやれる」と信じられる</Term> ― この2つが揃ったときに、チームは最も学び、最も高い成果を出します。</p>

      <Analogy label="💡 たとえるなら">
        組織効力感は<Term>綱引き</Term>に似ています。一人ひとりの腕力（能力）が同じでも、「絶対勝てる」と信じて息を合わせて引くチームと、「どうせ負ける」とバラバラに引くチームでは、生み出す力がまるで違います。効力感とは、その「せーの」で全員が同じ方向に全力を出せると信じられる状態のこと。そしてその確信は、<Term>一度勝った経験</Term>から一気に育つのです。
      </Analogy>

      <Heading num="まとめ">「やれる」という確信を、個人から集団へ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>効力感は能力とは別</h4><p>「できそう」という見込みが、挑戦・粘り・回復を左右します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>達成体験が最強</h4><p>成功できる大きさに刻み、共同の「できた」を積ませるのが王道です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>安全性と両輪</h4><p>「言える」×「やれる」が揃って、チームは最も学び、最も成果を出します。</p></Card>
      </CardGrid>
      <p>効力感を育てる土台は率直に言える場です。<Link href="/management/team/psychological-safety">心理的安全性</Link>と、勢いをつくる<Link href="/management/team/momentum">戦略方針とモメンタム</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team/psychological-safety" tag="マネジメント">心理的安全性</RelatedLink>
                    <RelatedLink href="/management/individual/motivation" tag="マネジメント">モチベーション理論の歴史</RelatedLink>
                    <RelatedLink href="/management/team/momentum" tag="マネジメント">戦略方針とモメンタム</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
