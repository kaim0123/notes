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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "個人のマネジメント（ミクロ）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>個人のマネジメント（ミクロ） ― 一人ひとりに向き合う</h1>
        <Lead>
          <Term>ミクロマネジメント</Term>は、一人ひとりの社員を対象にした関わりです。人がチームに加わってから力を発揮し、辞めずに働き続けるまでの流れ ― 採用・育成・評価・モチベーション・労務 ― を順に追います。これらは独立した施策ではなく、「良い人を採り、育て、正しく評価し、意欲を保ち、健やかに働いてもらう」という一本の線でつながっています。
        </Lead>
      </Hero>

      <Heading num="01">採用 ― 入り口の質が組織を決める</Heading>
      <p><Term>採用</Term>は組織づくりの起点です。どれほど育成が優れていても、要件に合わない人を採れば埋め合わせは効きません。採用は次の流れで進みます。</p>
      <table>
        <thead>
          <tr><th>ステップ</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">採用計画</td><td>事業計画から逆算し、いつ・どんな人材が・何人必要かを定める</td></tr>
          <tr><td className="hl">母集団形成</td><td>求人・スカウト・リファラルなどで候補者を集める</td></tr>
          <tr><td className="hl">面接</td><td>スキル・カルチャーフィット・入社意欲を見極め、同時に口説く</td></tr>
          <tr><td className="hl">適性検査</td><td>能力・性格を客観指標で補完し、面接の主観を補う</td></tr>
          <tr><td className="hl">オンボーディング</td><td>入社後の立ち上げを支援し、早期の戦力化と定着を図る</td></tr>
        </tbody>
      </table>
      <p>面接は「選ぶ」場であると同時に「選ばれる」場でもあります。候補者を口説く技術、入社後に最初の成果を残させる立ち上げの設計は、<Link href="/management/individual/onboarding">実践編：採用・オンボーディング・育成</Link>で具体的に扱います。</p>

      <Heading num="02">育成 ― 計画的に人を伸ばす</Heading>
      <p><Term>育成</Term>は、放っておいて「勝手に育つ」に任せるのではなく、意図をもって計画的に行うものです。育成手法は大きく2つに分けられます。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">OJT</td><td>実際の業務を通じて、現場で仕事をしながら学ぶ（On the Job Training）</td></tr>
          <tr><td className="hl">Off-JT</td><td>研修・セミナーなど、業務から離れて体系的に学ぶ</td></tr>
          <tr><td className="hl">メンター制度</td><td>斜めの関係の先輩が、業務・キャリアの相談相手になる</td></tr>
          <tr><td className="hl">コーチング</td><td>答えを教えず、問いかけで本人の中から答えを引き出す</td></tr>
          <tr><td className="hl">ティーチング</td><td>知識・やり方を直接教える。コーチングと使い分ける</td></tr>
        </tbody>
      </table>
      <p>近年は、技術や事業環境の変化に合わせて新しいスキルを学び直す<Term>リスキリング</Term>や、本人の中長期的な<Term>キャリア開発</Term>も育成の重要テーマです。「教える（ティーチング）」と「引き出す（コーチング）」を相手の習熟度で切り替えるのが基本です。人が力を発揮する土台となる能力・人間関係・メンタルの3つの資本は<Link href="/management/individual/capital">個人の力の3つの源泉</Link>で扱います。</p>

      <Heading num="03">評価 ― 成果と成長を映す鏡</Heading>
      <p><Term>人事評価</Term>には2つの目的があります。1つは<Term>処遇の決定</Term>（報酬・昇進の根拠）、もう1つは<Term>育成</Term>（強みと課題を映し、次の成長につなげる）です。評価の代表的な手法を押さえておきましょう。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MBO</td><td>目標管理制度。期首に目標を合意し、達成度で評価する（Management by Objectives）</td></tr>
          <tr><td className="hl">OKR</td><td>野心的な目標（Objective）と主要成果（Key Results）を全社で連動させる</td></tr>
          <tr><td className="hl">コンピテンシー評価</td><td>高い成果を生む行動特性を基準に、行動を評価する</td></tr>
          <tr><td className="hl">360度評価</td><td>上司だけでなく同僚・部下・他部署など多方向から評価する</td></tr>
        </tbody>
      </table>
      <p>評価の納得感を左右するのは、日々の<Term>フィードバック</Term>です。期末にまとめて伝えるのではなく、良い行動も改善点も、その都度、具体的に返すことで評価は「不意打ち」でなくなります。評価制度を貫く「公正（Justice）」の考え方は<Link href="/management/individual/evaluation">人事評価</Link>のページで、目標そのものの立て方は<Link href="/management/team/goals">実践編：目標設定</Link>で詳しく扱います。</p>

      <Heading num="04">モチベーション ― 意欲を引き出す</Heading>
      <p>採り、育て、評価しても、<Term>モチベーション</Term>が低ければ力は発揮されません。マズローやハーズバーグから内発的動機づけまでの理論の系譜は<Link href="/management/individual/motivation">モチベーション理論の歴史</Link>のページで詳しく扱います。ここでは現場で押さえたい概念を整理します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>エンゲージメント</h4><p>組織への愛着と自発的な貢献意欲。満足度より一歩踏み込んだ「前のめりさ」を指します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>心理的安全性</h4><p>「こんなことを言ったら」と恐れずに発言・失敗できる状態。学習と挑戦の土台になります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>インセンティブ</h4><p>報酬や表彰などの外的動機づけ。ただし外的報酬だけでは長続きしにくい点に注意します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>福利厚生</h4><p>働きやすさを支える制度。衛生要因として、不足すると不満の原因になります。</p></Card>
      </CardGrid>
      <p>重要なのは、モチベーションの問題を1on1の技術だけで解こうとしないことです。意欲が下がる背景に「そもそもチームの目標がない」「役割が曖昧」といった構造的な原因が潜んでいることは少なくありません。</p>

      <Heading num="05">労務管理 ― 健やかに働ける土台</Heading>
      <p><Term>労務管理</Term>は、社員が安全・健康に働ける土台を守る守備的な機能です。ここが崩れると、他のどんな施策も意味を失います。</p>
      <table>
        <thead>
          <tr><th>領域</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">勤怠・労働時間</td><td>出退勤の記録、時間外労働の上限管理、休憩の確保</td></tr>
          <tr><td className="hl">有給休暇</td><td>年次有給休暇の付与と取得促進（年5日の取得義務など）</td></tr>
          <tr><td className="hl">ハラスメント</td><td>パワハラ・セクハラの防止と相談窓口の整備</td></tr>
          <tr><td className="hl">メンタルヘルス</td><td>ストレスチェック、不調の早期発見と予防</td></tr>
          <tr><td className="hl">休職・復職</td><td>療養のための休職と、無理のない段階的な職場復帰の支援</td></tr>
        </tbody>
      </table>
      <p>労務は法令（労働基準法など）と密接に関わります。制度面の詳細は<Link href="/management/context">経営・社会とのつながり</Link>で扱います。現場マネージャーにとっては、メンバーの働きすぎや不調の兆候を早く察知することが最大の予防策です。</p>

      <Analogy label="💡 たとえるなら">
        個人のマネジメントは<Term>植物を育てる</Term>ことに似ています。良い苗を選び（採用）、水と光を与えて育て（育成）、成長を見て手入れを調整し（評価）、生き生きと保ち（モチベーション）、根腐れや病気を防ぐ（労務）。どれか一つでも欠けると、うまく育ちません。
      </Analogy>

      <Heading num="まとめ">個人マネジメントの5要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>採用</h4><p>入り口の質が組織を決める。選ぶと同時に選ばれる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>育成</h4><p>勝手に育つに任せず、計画的に伸ばす。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>評価</h4><p>処遇と育成の両輪。日々のフィードバックが納得感を生む。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>モチベーション</h4><p>心理的安全性とエンゲージメントで意欲を引き出す。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>労務</h4><p>健やかに働ける土台を守る守備の要。</p></Card>
      </CardGrid>
      <p>一人ひとりへの関わりを押さえたら、次は複数人をまとめる<Link href="/management/team">チームのマネジメント（メゾ）</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/individual/motivation" tag="マネジメント">モチベーション理論の歴史</RelatedLink>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/individual/onboarding" tag="マネジメント">実践編 ― 採用・オンボーディング・育成</RelatedLink>
                    <RelatedLink href="/management/team/goals" tag="マネジメント">実践編 ― 目標設定</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
