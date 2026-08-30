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
  title: "マネジリアル・グリッド",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>マネジリアル・グリッド ― 業績と人、2軸でリーダーを測る</h1>
        <Lead>
          リーダーの型を「性格」で語ると再現できません。<Term>マネジリアル・グリッド（管理格子）</Term>は、リーダーの行動を<Term>業績への関心</Term>と<Term>人への関心</Term>という2つの軸で捉え、9×9のマス目に位置づける枠組みです。ブレークとムートンが1964年に提唱したこのモデルは、<Link href="/management/team/leadership">PM理論</Link>と並ぶ行動理論の代表格。ここでは格子の読み方と5つの代表スタイル、そして「目指すべき型」を見ていきます。理論全体の位置づけは<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>で扱います。
        </Lead>
      </Hero>

      <Heading num="01">リーダー行動を「関心」の2軸で捉える</Heading>
      <p>1950〜60年代、リーダーシップ研究は「優れたリーダーは何をしているか」を探る<Term>行動理論</Term>へ移りました。その中でロバート・ブレークとジェーン・ムートンは、リーダーの行動が2種類の<Term>関心（Concern）</Term>の組み合わせで説明できると考えました。</p>
      <table>
        <thead>
          <tr><th>軸</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">業績への関心</td><td>成果・生産性・目標達成をどれだけ重視するか（仕事の側）</td></tr>
          <tr><td className="hl">人への関心</td><td>メンバーの感情・人間関係・働きがいをどれだけ重視するか（人の側）</td></tr>
        </tbody>
      </table>
      <p>ポイントは、この2つが<Term>トレードオフではなく独立した軸</Term>だとみなしたことです。「業績を取るか、人を取るか」の二者択一ではなく、<Term>両方を同時に高められる</Term>。この発想が、後述の理想型（9・9型）へとつながります。</p>

      <Heading num="02">グリッドの読み方 ― 9×9の座標</Heading>
      <p>2軸をそれぞれ1〜9の段階に刻み、リーダーの立ち位置を<Term>（業績, 人）</Term>の座標で表します。横軸が業績への関心、縦軸が人への関心です。四隅と中央の5点が、代表的なスタイルの目印になります。</p>
      <Diagram caption="マネジリアル・グリッド ― 横=業績への関心、縦=人への関心。四隅と中央に5つの型">
        <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
          {/* axes */}
          <line x1={50} y1={20} x2={50} y2={260} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={50} y1={260} x2={300} y2={260} stroke="#5f5f5f" strokeWidth="1.5" />
          {/* axis labels */}
          <text x={18} y={140} fill="#9a9a9a" fontSize="10" textAnchor="middle" transform="rotate(-90 18 140)">人への関心 →</text>
          <text x={175} y={288} fill="#9a9a9a" fontSize="10" textAnchor="middle">業績への関心 →</text>
          <text x={44} y={30} fill="#9a9a9a" fontSize="9" textAnchor="end">9</text>
          <text x={44} y={258} fill="#9a9a9a" fontSize="9" textAnchor="end">1</text>
          <text x={54} y={274} fill="#9a9a9a" fontSize="9" textAnchor="start">1</text>
          <text x={296} y={274} fill="#9a9a9a" fontSize="9" textAnchor="end">9</text>
          {/* points */}
          <circle cx={72} cy={238} r={7} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={80} y={252} fill="#9a9a9a" fontSize="9" textAnchor="start">1・1 無関心型</text>
          <circle cx={278} cy={238} r={7} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={270} y={252} fill="#9a9a9a" fontSize="9" textAnchor="end">9・1 権威型</text>
          <circle cx={72} cy={42} r={7} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={80} y={38} fill="#9a9a9a" fontSize="9" textAnchor="start">1・9 人間中心型</text>
          <circle cx={175} cy={140} r={7} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={183} y={136} fill="#9a9a9a" fontSize="9" textAnchor="start">5・5 中庸型</text>
          <circle cx={278} cy={42} r={9} fill="none" stroke="#39ff6a" strokeWidth="1.8" />
          <text x={270} y={38} fill="#f2f2f2" fontSize="9.5" textAnchor="end">9・9 理想型</text>
        </svg>
      </Diagram>
      <p>座標は「（業績への関心, 人への関心）」の順で読みます。たとえば<Term>9・1型</Term>は業績9・人1、<Term>1・9型</Term>は業績1・人9です。数字が大きいほど、その方向への関心が強いことを表します。</p>

      <Heading num="03">5つの代表スタイル</Heading>
      <p>四隅と中央に対応する5つの型が、リーダーの典型パターンです。自分がどこに寄りがちかを診断する物差しになります。</p>
      <table>
        <thead>
          <tr><th>型（業績・人）</th><th>呼称</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1・1型</td><td>無関心型（放任）</td><td>業績にも人にも関心が薄い。必要最低限だけこなし、事なかれで問題を避ける</td></tr>
          <tr><td className="hl">9・1型</td><td>権威・服従型（課題中心）</td><td>成果最優先で人を管理・統制する。短期の生産性は高いが、疲弊と離反を招きやすい</td></tr>
          <tr><td className="hl">1・9型</td><td>人間中心型（カントリークラブ型）</td><td>人間関係と居心地を最優先。雰囲気は良いが、成果への詰めが甘くぬるくなりやすい</td></tr>
          <tr><td className="hl">5・5型</td><td>中庸型（妥協型）</td><td>業績と人をほどほどに両立。無難だが、どちらも中途半端になりやすい</td></tr>
          <tr><td className="hl">9・9型</td><td>理想・チーム型</td><td>業績も人も高く追求。メンバーの主体的な参加と協働で高い成果を出す（目指す姿）</td></tr>
        </tbody>
      </table>
      <p>ブレークとムートンは、<Term>9・9型（チーム型）が最も望ましい</Term>と結論づけました。業績と人は本来トレードオフではなく、メンバーが目標に主体的にコミットし、協働することで<Term>両方を同時に高められる</Term> ― これがこのモデルの核心です。注意したいのは<Term>5・5型</Term>で、一見バランス型に見えて、実は「業績も人もそこそこで妥協した」型であり、9・9型とは別物である点です。</p>
      <Aside label="診断で終わらせない">グリッドの本来の狙いは、型を当てはめて満足することではなく、<Term>現状の型を自覚し、9・9型へ近づける訓練（組織開発）</Term>につなげることでした。ブレークらは、この診断を出発点とする体系的なリーダー育成プログラムを提供しています。</Aside>

      <Heading num="04">PM理論・オハイオ研究との関係</Heading>
      <p>マネジリアル・グリッドは、同じ「2軸で捉える」行動理論の仲間と地続きです。呼び名は違っても、指しているものはほぼ共通しています。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>業績側の軸</th><th>人側の軸</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オハイオ研究</td><td>構造づくり</td><td>配慮</td></tr>
          <tr><td className="hl">マネジリアル・グリッド</td><td>業績への関心</td><td>人への関心</td></tr>
          <tr><td className="hl">PM理論（三隅）</td><td>P機能（目標達成）</td><td>M機能（集団維持）</td></tr>
        </tbody>
      </table>
      <p>いずれも「<Term>仕事</Term>」と「<Term>人</Term>」の2軸で、両方を高めるリーダーを理想とします。グリッドの<Term>9・9型</Term>は、PM理論の<Term>PM型（両方高い「熱いリーダー」）</Term>にほぼ対応します。異なる研究者が別々に、同じ2軸構造にたどり着いたことこそ、この見方の頑健さを物語っています。</p>

      <Heading num="05">使い方 ― 自己診断から開発へ</Heading>
      <p>実務での活かし方はシンプルです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>今の型を自覚する</h4><p>自分は業績・人のどちらに寄りがちか。9・1（詰めすぎ）か、1・9（甘すぎ）かを知ります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>足りない軸を補う</h4><p>業績寄りなら人への関心（傾聴・承認）を、人寄りなら業績への関心（目標・詰め）を意識的に足します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>9・9型へ近づける</h4><p>妥協の5・5ではなく、両方を高く。主体的な参加と協働で成果を出す型を目指します。</p></Card>
      </CardGrid>
      <p>ただし、状況適合（コンティンジェンシー）理論が後に示したように、<Term>常に9・9が最善とは限りません</Term>。危機時には業績寄りの強い方向づけが要ることもあります。グリッドは「自分の偏りを知り、足りない軸を補う」ための地図として使うのが、最も実務的です。人への関心をどう具体化するかは<Link href="/management/team/communication">コミュニケーション</Link>や<Link href="/management/team/psychological-safety">心理的安全性</Link>に、業績への関心は<Link href="/management/team/goals">目標設定</Link>につながります。</p>

      <Analogy label="💡 たとえるなら">
        マネジリアル・グリッドは<Term>料理の火加減と味つけ</Term>に似ています。強火（業績への関心）だけでは焦げてしまい、味つけ（人への関心）だけでは生煮えのまま。かといって両方を弱めた無難な調理（5・5型）は、誰の記憶にも残りません。名店の一皿は、強い火をしっかり通しつつ繊細に味を決める ― 両方を高い次元で両立させた9・9型なのです。
      </Analogy>

      <Heading num="まとめ">2軸で自分を測り、両方を高める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>業績×人の2軸</h4><p>リーダー行動を9×9の座標で捉える。2つは独立した軸で両立できます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>目指すは9・9型</h4><p>妥協の5・5ではなく、業績も人も高く追求するチーム型が理想です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>PM理論の親戚</h4><p>オハイオ研究・PM理論と同じ「仕事×人」構造。自己診断の地図として使います。</p></Card>
      </CardGrid>
      <p>理論史の中での位置づけは<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>へ、現場での発揮の仕方は<Link href="/management/team/leadership">リーダーシップの実践</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team/leadership" tag="マネジメント">リーダーシップの実践</RelatedLink>
                    <RelatedLink href="/management/org/theory" tag="マネジメント">組織・リーダーシップ理論の歴史</RelatedLink>
                    <RelatedLink href="/management/theory" tag="マネジメント">マネジメント理論家</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
