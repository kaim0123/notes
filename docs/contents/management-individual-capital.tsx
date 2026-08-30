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
  title: "個人の力の3つの源泉",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>個人の力の3つの源泉 ― 人的・関係・心理資本</h1>
        <Lead>
          「あの人は仕事ができる」と言うとき、その力はどこから来ているのでしょうか。個人が組織のなかで発揮するパフォーマンスは、<Term>能力・動機づけ・機会</Term>の噛み合わせで決まります。そのうち「能力」をさらに解きほぐすと、<Term>人的資本・関係資本・心理資本</Term>という3つの源泉が見えてきます。ここは<Link href="/management/individual">個人のマネジメント（ミクロ）</Link>を、個人の力の内訳という角度から深掘りするページです。
        </Lead>
      </Hero>

      <Heading num="01">見取り図 ― AMOフレームワーク</Heading>
      <p>仕事の成果を整理する基本枠組みが<Term>AMOフレームワーク</Term>です。パフォーマンスは、<Term>能力（Ability）</Term>・<Term>動機づけ（Motivation）</Term>・<Term>機会（Opportunity）</Term>の3要素が噛み合ったときに最大化されると考えます。掛け算に近いイメージで、どれか一つが欠けても成果は頭打ちになります。優れた能力があっても意欲が低ければ発揮されず、能力と意欲があっても、力を発揮する<Term>機会</Term>（裁量・役割・資源）が与えられなければ成果に変わりません。</p>
      <Diagram caption="パフォーマンスは能力・動機づけ・機会の噛み合わせで決まる（AMOフレームワーク）">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={35} width={150} height={50} rx="10" fill="#1f6feb22" stroke="#1f6feb" strokeWidth="1.5" />
          <text x={85} y={58} textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="bold">能力 A</text>
          <text x={85} y={76} textAnchor="middle" fill="currentColor" fontSize="11">Ability</text>
          <text x={180} y={66} textAnchor="middle" fill="currentColor" fontSize="20">×</text>
          <rect x={200} y={35} width={150} height={50} rx="10" fill="#2ea04322" stroke="#2ea043" strokeWidth="1.5" />
          <text x={275} y={58} textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="bold">動機づけ M</text>
          <text x={275} y={76} textAnchor="middle" fill="currentColor" fontSize="11">Motivation</text>
          <text x={370} y={66} textAnchor="middle" fill="currentColor" fontSize="20">×</text>
          <rect x={390} y={35} width={150} height={50} rx="10" fill="#bb8f0922" stroke="#bb8f09" strokeWidth="1.5" />
          <text x={465} y={58} textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="bold">機会 O</text>
          <text x={465} y={76} textAnchor="middle" fill="currentColor" fontSize="11">Opportunity</text>
          <text x={560} y={66} textAnchor="middle" fill="currentColor" fontSize="20">=</text>
          <text x={600} y={66} textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="bold">成果</text>
        </svg>
      </Diagram>
      <p>このうち<Term>M（動機づけ）</Term>は<Link href="/management/individual/motivation">モチベーション理論</Link>で扱いました。<Term>O（機会）</Term>は、職場が裁量・役割・資源をどう設計するかという話で、<Link href="/management/org/delegation">権限委譲</Link>や関係性の設計につながります。本ページでは、残る<Term>A（能力）</Term>を掘り下げます。能力はさらに、注目された時期の異なる3つの源泉に分解できます。</p>
      <table>
        <thead>
          <tr><th>源泉</th><th>内容</th><th>注目された時期</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">人的資本</td><td>その人が持つ能力・知識・技能そのもの</td><td>1960年代〜</td></tr>
          <tr><td className="hl">関係資本</td><td>資源をもたらしてくれる人とのつながり</td><td>1990年代〜</td></tr>
          <tr><td className="hl">心理資本</td><td>前向きに働き続けられる健全な心理状態</td><td>2010年代〜</td></tr>
        </tbody>
      </table>

      <Heading num="02">人的資本 ― 能力そのものを磨く</Heading>
      <p><Term>人的資本（Human Capital）</Term>は、1961年のアメリカ経済学会会長講演で提唱された概念です。それまでの経済学は、成長の源泉を「金銭資本の蓄積」と「人口の増加」に求めていました。しかし成長を決めるのは人口の<Term>数</Term>ではなく、一人ひとりの知識と能力の<Term>質</Term>である、という認識が広まります。人を数として扱うのではなく、一人ひとりを育てる ― この人本主義的な転換が、現代のリスキリングや人材開発の出発点になりました。</p>
      <p>人的資本を構成するスキルを整理した古典が<Term>カッツモデル</Term>です。能力を3種類に分け、組織の階層が上がるほど重心がテクニカルからコンセプチュアルへ移ると示しました。</p>
      <table>
        <thead>
          <tr><th>スキル</th><th>内容</th><th>重要になる階層</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テクニカルスキル</td><td>経理・マーケティング・製造など、固有業務をこなす技能</td><td>現場に近いほど重要</td></tr>
          <tr><td className="hl">ヒューマンスキル</td><td>コミュニケーション・チームワーク・連携する力</td><td>すべての階層で重要</td></tr>
          <tr><td className="hl">コンセプチュアルスキル</td><td>物事を概念化・抽象化・一般化して捉える力</td><td>上位に行くほど重要</td></tr>
        </tbody>
      </table>
      <p>では、人的資本はどう磨くのか。方法は3つあります。最も重要なのが<Term>経験学習</Term>です。日々の仕事から学ぶのは自然なことですが、経験しっぱなしでは身につきが遅い。鍵は<Term>省察（リフレクション）</Term>で、「なぜうまくいったか／失敗したか」を振り返って概念化し、仮説を立て、現場で試す。この<Term>経験 → 省察 → 仮説 → 実験</Term>のサイクル（コルブの経験学習サイクル）を回すことで、経験は確かな学びに変わります。日々の育成の設計は<Link href="/management/individual/onboarding">採用・オンボーディング・育成</Link>で扱います。</p>
      <p>第二が<Term>越境学習</Term> ― 今の職場の外に出て学ぶことです。チャールズ・ハンディの<Term>4つのワーク</Term>が枠組みになります。</p>
      <table>
        <thead>
          <tr><th>ワーク</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">有給のワーク</td><td>会社での仕事</td></tr>
          <tr><td className="hl">家庭のワーク</td><td>家事・育児など、生活を成り立たせる仕事</td></tr>
          <tr><td className="hl">学習・趣味のワーク</td><td>本・動画・スクール・趣味から新しい刺激を得る</td></tr>
          <tr><td className="hl">ギフトワーク</td><td>社会への奉仕。見返りを求めない仕事</td></tr>
        </tbody>
      </table>
      <p>第三が<Term>独学</Term>です。ここで見過ごせないのが、日本が世界的に見て<Term>大人になったら極端に学ばない社会</Term>だという事実です。ベネッセのアジア比較調査では、日本ではおよそ2人に1人が仕事以外で学習していません。諸外国がリスキリングでスキルを組み替えていくなか、継続的な学習文化を取り戻すことは、個人にとっても社会にとっても課題です。</p>

      <Heading num="03">関係資本 ― つながりから資源を引き出す</Heading>
      <p>人は社会的動物であり、自分がアクセスできない情報や能力を、他者との関わりに依存しながら得ています。<Term>関係資本（Social Capital）</Term>とは、あなたに重要な資源をもたらしてくれる<Term>関わり合いの広がり</Term>のことです。1990年代から本格的に注目され、個人の能力限界を超える成果を生む<Term>レバレッジ</Term>として機能します。</p>
      <p>象徴的なのがFacebook創業の物語です。マーク・ザッカーバーグは、<Term>ウィンクルボス兄弟</Term>の「ハーバードコネクション」構想に声をかけられたことを起点に、大学寮の仲間 ― ファイナンスの<Term>サベリン</Term>、プログラミングやマーケティングの仲間 ― を巻き込んで実装します。次に起業経験者の<Term>ロスチャイルド</Term>が会社基盤を整え、Napster創業者の<Term>ショーン・パーカー</Term>が東海岸にいた彼を<Term>シリコンバレー</Term>のベンチャーキャピタルへとつなぎ、一気に成長軌道に乗せました。一人の能力では到達できない場所に、つながりが連れて行ったのです。</p>
      <p>関係資本のメリットは2種類に分かれます。<Term>ボンディング（結束）</Term>は、木工用ボンドのようにつながりを強く結びつけ、お金・知恵・労力といった具体的な支援を引き出す力（寮の仲間たち）。<Term>ブリッジング（橋渡し）</Term>は、自分が辿り着けない場所へつないでくれる力（シリコンバレーへの橋を架けたパーカー）です。この2つを、協力の性質（物理的協力／知的効果）と掛け合わせると4象限になります。</p>
      <table>
        <thead>
          <tr><th></th><th>ボンディング（結束）</th><th>ブリッジング（橋渡し）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">物理的協力</td><td>直接の協力・お金の提供</td><td>協力できる仲間を紹介してくれる</td></tr>
          <tr><td className="hl">知的効果</td><td>助言・知的能力の提供</td><td>遠くの集団が持つ情報をもたらす</td></tr>
        </tbody>
      </table>
      <p>関係資本を豊かにする方法は3つ。第一に<Term>限られたネットワークに閉じこもらない</Term>こと ― 固定メンバーに留まると考え方も固定化し、外の情報が遮断されます。第二に<Term>いろんな人に会う</Term>こと ― 打算を脇に置き、面白そうなら会ってみる。第三に<Term>遠い関係も大切にする</Term>こと ― 昔の友人や一度会っただけの人との薄いつながりも、人生の彩りになります。</p>
      <Aside label="注意">「俺は誰々を知っている」という顔の広さの自慢は、関係資本ではありません。決定的なのは、相手にとっても自分が大切な人物であるという<Term>相互性</Term>です。「あの人のために何かしよう」と思ってもらえる関係こそが、本物の関係資本です。</Aside>

      <Heading num="04">心理資本 ― 前向きさを蓄える</Heading>
      <p>3つめの源泉が<Term>心理資本（Psychological Capital）</Term>です。フレッド・ルーサンスが2004年から提唱した、<Term>目の前の物事を前向きに捉え、自分やキャリアに積極的な思考と行動をとれる精神状態</Term>、またはそれを作り出せる技能を指します。</p>
      <p>この概念は、日本社会の根深い誤解を解きほぐします。「安定した就職＝行政や大企業＝組織が潰れない場所」という常識です。しかし、組織の安定と個人の安定は<Term>相関はあっても別の現象</Term>です。会社が高業績でも、パワハラ上司やブラック労働で個人が潰れることは現実に起こります。本当の安定とは<Term>個人が潰れないこと</Term> ― メンタルが健全に保たれ、スキルが上がり、良い給料がもらえること。この順序が決定的で、メンタルがやられれば、どんな名誉ある仕事も固有スキルも意味を失います。</p>
      <p>心理資本は4要素からなり、頭文字をとって<Term>HERO</Term>と呼ばれます。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>英語</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">H</td><td>Hope（希望）</td><td>辛い状況でも「将来はなんとかなる」という明るい希望を持てる</td></tr>
          <tr><td className="hl">E</td><td>Efficacy（自己効力感）</td><td>根拠のある自信。成功体験の積み重ねによる健全な自己信頼</td></tr>
          <tr><td className="hl">R</td><td>Resilience（レジリエンス）</td><td>困難に立ち向かう心理的回復力。落ち込みから早く戻れる</td></tr>
          <tr><td className="hl">O</td><td>Optimism（楽観性）</td><td>根拠のない自信。「なんとかなる」という最後の命綱</td></tr>
        </tbody>
      </table>
      <p>「心理<Term>資本</Term>」と名付けられたことには意味があります。資本とは<Term>蓄積されていくもの</Term>だからです。良いメンタル状態でのキャリア経験を積み上げれば、転職しても働き続けても、健全なメンタルを生涯にわたり維持できます。逆に、キャリア初期に徹底的にメンタルをやられると、そこから這い上がるのは本当に大変です。<Term>最初の就職先でブラック企業を避けたほうがよい</Term>のは、このためです。</p>

      <Analogy label="💡 たとえるなら">
        個人の力は、一本の樹木のようなものです。<Term>人的資本</Term>は幹と枝葉 ― 自分の背丈と広がりそのもの。<Term>関係資本</Term>は地中で他の樹とつながる根のネットワークで、遠くの水や養分を運んできます。そして<Term>心理資本</Term>は、日照りや嵐にも枯れずに立ち続ける生命力です。幹をいくら太らせても、根が細く、生命力が尽きていれば、大樹には育ちません。3つをバランスよく育てることが、長く実りをつけ続ける条件です。
      </Analogy>

      <Heading num="まとめ">3つの源泉を育てる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>人的資本</h4><p>能力・知識・技能そのもの。経験学習・越境学習・独学で磨き続ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>関係資本</h4><p>資源を引き出すつながり。結束と橋渡しの4象限を、相互性を保って広げる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>心理資本</h4><p>前向きさを蓄えるHERO。個人が潰れないことこそ、本当の安定。</p></Card>
      </CardGrid>
      <p>能力（A）を3源泉に分けて磨いたら、それを発揮させる<Link href="/management/individual/motivation">動機づけ（M）</Link>と、力を成果へ変える<Link href="/management/org/delegation">機会（O）</Link>を組み合わせる ― これがAMOフレームワークの実践です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/individual" tag="マネジメント">個人のマネジメント（ミクロ）</RelatedLink>
                    <RelatedLink href="/management/individual/motivation" tag="マネジメント">モチベーション理論の歴史</RelatedLink>
                    <RelatedLink href="/management/individual/onboarding" tag="マネジメント">採用・オンボーディング・育成</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
