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
  title: "マネジメント理論家",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>マネジメント理論家 ― 巨人たちの地図</h1>
        <Lead>
          ここまで見てきたモチベーション・リーダーシップ・組織変革といったテーマは、多くが20世紀の研究者たちの理論に根を持ちます。個々の施策を「なぜそうするのか」まで遡って理解するために、代表的な理論家をモチベーション・組織／リーダーシップ・変革／品質の3系統に分けて概観します。名前と要点をひもづけて覚えておくと、実践の引き出しが増えます。
        </Lead>
      </Hero>

      <Heading num="01">モチベーションの理論家</Heading>
      <p>「人は何によって動くのか」を探究した系譜です。<Link href="/management/individual">個人のマネジメント</Link>で扱ったモチベーションの土台になります。</p>
      <table>
        <thead>
          <tr><th>人物</th><th>理論</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">マズロー</td><td>欲求5段階説</td><td>人の欲求は生理・安全・社会・承認・自己実現の順に高次へ向かう</td></tr>
          <tr><td className="hl">ハーズバーグ</td><td>二要因理論</td><td>満足を生む「動機づけ要因」と、不満を防ぐ「衛生要因」は別物</td></tr>
          <tr><td className="hl">マクレガー</td><td>X理論・Y理論</td><td>人を「怠ける前提（X）」で見るか「自ら働く前提（Y）」で見るか</td></tr>
          <tr><td className="hl">アダムス</td><td>公平理論</td><td>人は自分の貢献と報酬の比を、他者と比べて公平さを判断する</td></tr>
          <tr><td className="hl">ブルーム（Vroom）</td><td>期待理論</td><td>やる気＝期待×手段性×誘意性。頑張れば報われる見通しが動機を生む</td></tr>
          <tr><td className="hl">ロック（Locke）</td><td>目標設定理論</td><td>明確で挑戦的な目標が、曖昧な目標より高い成果を導く</td></tr>
        </tbody>
      </table>
      <p>とりわけロックの<Term>目標設定理論</Term>は、「明確で少し背伸びした目標が人を動かす」という点で、<Link href="/management/team/goals">実践編：目標設定</Link>の考え方と直結します。</p>

      <Heading num="02">組織・リーダーシップの理論家</Heading>
      <p>個人ではなく、集団や組織、リーダーの役割に光を当てた系譜です。<Link href="/management/team">チームのマネジメント</Link>や<Link href="/management/org">組織のマネジメント</Link>の背景になります。</p>
      <table>
        <thead>
          <tr><th>人物</th><th>理論</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アージリス</td><td>組織学習・成熟論</td><td>個人の成熟と組織の要請の対立を説き、学習する組織の基礎を築いた</td></tr>
          <tr><td className="hl">タックマン</td><td>チーム発達段階</td><td>チームは形成・混乱・統一・機能・散会の段階を経て育つ</td></tr>
          <tr><td className="hl">ベルビン</td><td>チームロール理論</td><td>チームには9つの役割があり、多様な役割の噛み合わせが成果を生む</td></tr>
          <tr><td className="hl">シャイン</td><td>組織文化・キャリア論</td><td>組織文化を3層で捉え、キャリアの拠り所（キャリアアンカー）を示した</td></tr>
          <tr><td className="hl">ドラッカー</td><td>マネジメント論</td><td>「マネジメントの父」。目標管理（MBO）や知識労働者の概念を提唱</td></tr>
          <tr><td className="hl">ミンツバーグ</td><td>マネジャーの役割論</td><td>管理職の仕事を観察し、対人・情報・意思決定の10役割に整理した</td></tr>
        </tbody>
      </table>

      <Heading num="03">変革・品質の理論家</Heading>
      <p>組織をどう変え、質をどう高め続けるかを探究した系譜です。<Link href="/management/org">組織開発（OD）</Link>やチェンジマネジメントの源流にあたります。</p>
      <table>
        <thead>
          <tr><th>人物</th><th>理論</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レヴィン</td><td>変革の3段階モデル</td><td>「解凍→変化→再凍結」。変化には既存のやり方を一度ゆるめる段階が要る</td></tr>
          <tr><td className="hl">コッター</td><td>変革の8段階</td><td>危機感の醸成から定着まで、変革を成功させる8つのステップを示した</td></tr>
          <tr><td className="hl">デミング</td><td>品質管理・PDCA</td><td>継続的改善のPDCAサイクルを広め、品質は工程でつくり込むと説いた</td></tr>
        </tbody>
      </table>
      <p>レヴィンの「<Term>解凍→変化→再凍結</Term>」は、なぜ変革がしばしば抵抗にあうのかを見事に説明します。既存のやり方をいったんゆるめる「解凍」を飛ばして新しいやり方を押しつけても、人は元に戻ってしまうのです。デミングの<Term>PDCA</Term>は、開発や運用を含むあらゆる継続的改善の共通言語になっています。</p>

      <Analogy label="💡 たとえるなら">
        理論家の地図を持つことは、<Term>登山の先人の記録</Term>を読むようなものです。自分で一から道を探さなくても、「この尾根は危ない」「ここに水場がある」と教えてくれます。実践で迷ったとき、「これはハーズバーグの言う衛生要因の話だ」と名前がつけられると、打ち手の見通しが一気に良くなります。
      </Analogy>

      <Heading num="まとめ">名前と要点をひもづける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>モチベーション</h4><p>マズロー・ハーズバーグ・マクレガー・アダムス・ブルーム・ロック ― 人が動く仕組み。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>組織・リーダーシップ</h4><p>アージリス・タックマン・ベルビン・シャイン・ドラッカー・ミンツバーグ ― 集団と管理職の役割。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>変革・品質</h4><p>レヴィン・コッター・デミング ― 変える技術と、良くし続ける技術。</p></Card>
      </CardGrid>
      <p>理論は地図であり、地図だけでは山は登れません。次は現場で使える歩き方 ― <Link href="/management/team/operation">実践編：チーム運営と3つの力</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">実践編 ― チーム運営と3つの力</RelatedLink>
                    <RelatedLink href="/management/individual" tag="マネジメント">個人のマネジメント（ミクロ）</RelatedLink>
                    <RelatedLink href="/management" tag="マネジメント">マネジメントの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
