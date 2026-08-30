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
  title: "人事制度",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>人事制度 ― 等級・評価・報酬の三位一体</h1>
        <Lead>
          人事制度とは、社員を「格付けし・測り・報いる」仕組みの総体です。中心にあるのは<Term>等級・評価・報酬</Term>の3つで、これらが一貫した論理でつながって初めて機能します。<Link href="/management/org">組織のマネジメント（マクロ）</Link>で概観したこの三点セットを、ここでは制度設計の中身にまで踏み込んで掘り下げます。日々の<Link href="/management/individual/evaluation">人事評価</Link>や<Link href="/management/team/goals">目標設定</Link>が「なぜその形なのか」の背景も、この制度にあります。
        </Lead>
      </Hero>

      <Heading num="01">人事制度は3つの歯車でできている</Heading>
      <p>人事制度の骨格は、<Term>等級制度・評価制度・報酬制度</Term>の3つです。これらは独立して決めるものではなく、噛み合った歯車として設計します。順番にも意味があり、<Term>等級で「期待水準」を定め → 評価で「達成度」を測り → 報酬で「処遇」に反映する</Term>という一本の流れになっています。</p>
      <Diagram caption="人事制度の三位一体 ― 等級が背骨、評価が測定、報酬が反映">
        <svg viewBox="0 0 600 96" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={28} width={150} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">等級制度</text>
          <text x={95} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">期待水準を定める</text>
          <text x={188} y={55} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <rect x={210} y={28} width={150} height={48} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={285} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">評価制度</text>
          <text x={285} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">達成度を測る</text>
          <text x={378} y={55} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <rect x={400} y={28} width={150} height={48} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={475} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">報酬制度</text>
          <text x={475} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">処遇に反映する</text>
        </svg>
      </Diagram>
      <p>この3つが揃うと、「<Term>何を期待され、どう評価され、いくら報われるか</Term>」が社員から見て一貫します。逆にどれか一つでも論理がずれると ― たとえば等級の期待と評価項目が食い違う、評価は上がったのに報酬に反映されない ― 制度は納得感を失い、形骸化します。</p>

      <Heading num="02">等級制度 ― 制度の背骨</Heading>
      <p><Term>等級制度</Term>は、社員を一定の基準で格付けし、それぞれに期待水準を定める仕組みです。制度全体の背骨であり、「何を基準に人を序列づけるか」で3つの型に分かれます。</p>
      <table>
        <thead>
          <tr><th>型</th><th>格付けの基準</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">職能資格制度</td><td>人の能力（職務遂行能力）</td><td>日本の伝統型。異動しても等級が保たれ、メンバーシップ型と相性が良い。能力は下がりにくく年功的になりやすい</td></tr>
          <tr><td className="hl">職務等級制度</td><td>仕事（ジョブ）の価値</td><td>欧米型。職務記述書で仕事を定義し、その価値で格付け。ジョブ型と一体。仕事が変わらなければ上がらない</td></tr>
          <tr><td className="hl">役割等級制度</td><td>担う役割の大きさ</td><td>両者の中間。「期待される役割」で格付けし、日本企業のジョブ型移行で広く採用される</td></tr>
        </tbody>
      </table>
      <p>近年は<Term>職能資格</Term>から<Term>役割・職務等級</Term>へ移行する企業が増えています。ただし優劣の問題ではなく、<Link href="/management/org">ジョブ型／メンバーシップ型</Link>のどちらを土台にするか、事業と組織のフェーズに合うかで選びます。等級の定義は、現場で「この等級ならこの難易度が妥当」という<Link href="/management/team/goals">目標設定</Link>の物差しとしても働きます。</p>

      <Heading num="03">評価制度 ― 何を、どう測るか</Heading>
      <p><Term>評価制度</Term>は、各等級に期待される成果と行動を、どう測り処遇へ反映するかを定めます。まず「何を測るか」が2系統に分かれます。</p>
      <table>
        <thead>
          <tr><th>評価対象</th><th>代表的な手法</th><th>測るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">成果（What）</td><td>MBO / OKR</td><td>目標に対する達成度。何を成し遂げたか</td></tr>
          <tr><td className="hl">行動・能力（How）</td><td>コンピテンシー評価 / 360度評価</td><td>成果を生んだ行動の質。どう成し遂げたか</td></tr>
        </tbody>
      </table>
      <p>成果だけを見ると短期主義に、行動だけを見ると「頑張ったが成果ゼロ」を許してしまいます。多くの制度は<Term>成果評価と行動評価を組み合わせ</Term>ます。手法自体の詳しい使い分け ― MBOとOKRの違い、コンピテンシー、360度評価、フィードバックの仕方 ― は<Link href="/management/individual/evaluation">人事評価</Link>で扱います。</p>
      <p>制度設計として重要なのが、<Term>絶対評価と相対評価</Term>の選択です。絶対評価は「基準に照らして各人を評価する」方式で納得感が高い一方、全員が高評価になり報酬原資を超えることがあります。相対評価は「集団内で順位づけする」方式で原資配分はしやすいものの、良いチームほど割を食う不公平が生じます。実務では<Term>評価は絶対、処遇分配は相対</Term>のように役割を分ける折衷が多く使われます。</p>
      <Aside label="評価は処遇のためだけではない">評価には「処遇を決める（査定）」機能と「育成する（フィードバック）」機能があります。この2つを同じ面談で混ぜると、査定への警戒で育成の対話が成り立ちません。<Link href="/management/team/communication">1on1</Link>で育成を、評価面談で査定を、と場を分けるのが定石です。</Aside>

      <Heading num="04">報酬制度 ― どう配分するか</Heading>
      <p><Term>報酬制度</Term>は、等級と評価の結果を給与・賞与としてどう配分するかを定めます。報酬設計は2つの「公平性」のバランスで考えます。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>問い</th><th>崩れると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">内部公平性</td><td>社内の他の人と比べて妥当か</td><td>「あの人と同じ仕事なのに差がある」という不満</td></tr>
          <tr><td className="hl">外部競争性</td><td>他社の相場と比べて妥当か</td><td>採用で負ける・優秀な人が流出する</td></tr>
        </tbody>
      </table>
      <p>報酬は用途で分けて設計します。等級に連動して安定的に支払う<Term>基本給（月例給与）</Term>、業績や評価に連動して変動する<Term>賞与（ボーナス）</Term>、特定の成果に報いる<Term>インセンティブ</Term>の3層が基本です。安定性を高めれば安心感は増しますが成果への動機づけは弱まり、変動を大きくすればその逆になります。この配分は、報酬という外発的動機だけに頼らないという<Link href="/management/individual/motivation">モチベーション理論</Link>の視点とも切り離せません。</p>

      <Heading num="05">昇進・昇格 ― 上がる道筋を明示する</Heading>
      <p>三点セットの上に乗るのが<Term>昇進・昇格</Term>のルールです。この2つは混同されがちですが別物です。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">昇格</td><td>等級が上がること（例：グレード3→4）。期待水準そのものが上がる</td></tr>
          <tr><td className="hl">昇進</td><td>役職・ポストが上がること（例：メンバー→係長→課長）。ポストの数に限りがある</td></tr>
        </tbody>
      </table>
      <p>大切なのは「<Term>どうすれば上がれるか</Term>」が本人から見えていることです。ここが不透明だと、成長意欲は行き場を失います。また、管理職ポストは数が限られるため、専門性で上がる<Term>専門職（スペシャリスト）コース</Term>を管理職コースと並立させ、「マネージャーにならなくても等級を上げられる」複線型を用意する企業が増えています。優秀なプレイヤーを不本意な管理職にして両方失う、という典型的な失敗を避けるためです。</p>

      <Heading num="06">制度は「運用」で決まる</Heading>
      <p>どれほど精緻な制度を設計しても、<Term>運用されなければ意味がありません</Term>。よくある失敗は次のようなものです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>評価者で基準がブレる</h4><p>同じ成果でも上司によって評価が違う。評価者研修と目線合わせ（キャリブレーション）で揃えます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>制度が複雑すぎる</h4><p>誰も仕組みを理解できず、現場が形だけ回す。シンプルさは納得感の前提です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>フィードバックがない</h4><p>結果だけ通知され、なぜその評価かが伝わらない。数字の裏づけと対話が納得を生みます。</p></Card>
      </CardGrid>
      <p>制度は「ルール」ですが、それを支えるのは日々の<Term>対話</Term>という「運用」です。制度と現場の関わりが食い違うと、どんな制度も空気に負けます。この点は<Link href="/management/org">組織文化</Link>とも地続きです。</p>

      <Analogy label="💡 たとえるなら">
        人事制度は<Term>スポーツのルールブック</Term>に似ています。ポジションの定義（等級）、得点の数え方（評価）、賞金の配分（報酬）が噛み合って初めて、選手は安心して全力を出せます。ルールが曖昧だったり、頑張っても点が入らない設計だったりすれば、どんなに良い選手も白けてしまう。そして最高のルールブックも、審判（評価者）の判定がブレれば信頼を失うのです。
      </Analogy>

      <Heading num="まとめ">一貫した論理で「格付け・測定・分配」をつなぐ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>三位一体</h4><p>等級で期待を定め、評価で測り、報酬で報いる。3つが一貫して初めて機能します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>基準は事業に合わせる</h4><p>職能・職務・役割等級を、ジョブ型／メンバーシップ型とフェーズで選びます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>道筋を見せ、運用で支える</h4><p>昇進・昇格の透明性と、評価者の目線合わせ・フィードバックが納得感を生みます。</p></Card>
      </CardGrid>
      <p>制度という「仕組み」を押さえたら、それが現場でどう運用されるかは<Link href="/management/individual/evaluation">人事評価</Link>へ、器と配置の話は<Link href="/management/org/structure">組織構造とアサイン</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/org" tag="マネジメント">組織のマネジメント（マクロ）</RelatedLink>
                    <RelatedLink href="/management/individual/evaluation" tag="マネジメント">人事評価</RelatedLink>
                    <RelatedLink href="/management/org/structure" tag="マネジメント">組織構造とアサイン</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
