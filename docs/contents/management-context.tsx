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
  title: "経営・社会とのつながり",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>経営・社会とのつながり ― 外部環境を織り込む</h1>
        <Lead>
          組織は真空の中にあるわけではありません。人事マネジメントの最も外側のレイヤーは、会社の<Term>外部環境</Term> ― 経営、労働市場、法律、テクノロジー ― を織り込んで考える視点です。ここを見落とすと、社内では正しく見える打ち手が、市場や法の現実とずれてしまいます。
        </Lead>
      </Hero>

      <Heading num="01">人事戦略 ― 経営と一体で語る</Heading>
      <p>最も外側のレイヤーで、<Term>人事戦略</Term>は改めて<Term>経営戦略との連携</Term>として捉え直されます。人事施策は単体で評価されるのではなく、「この事業を実現するために人でどう勝つか」という経営の問いに答えるものです。</p>
      <p>その象徴が<Term>人的資本経営</Term>です。人材を投資対象と捉えるこの考え方は、いまや社内の方針にとどまりません。上場企業には人材への投資や多様性の状況を投資家へ開示する<Term>人的資本開示</Term>が求められるようになりました。人への取り組みが、企業価値の評価に直接組み込まれる時代です。人事は経営会議の議題であり、外部への説明責任を伴うものになっています。</p>

      <Heading num="02">労働市場 ― 採用の前提が変わる</Heading>
      <p>採用や定着の難しさは、社内の努力だけで決まるのではなく、<Term>労働市場</Term>という外部条件に大きく左右されます。マクロの潮流を押さえておく必要があります。</p>
      <table>
        <thead>
          <tr><th>テーマ</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">雇用形態</td><td>正社員・契約・派遣・業務委託・副業など、働き方の多様化</td></tr>
          <tr><td className="hl">少子高齢化</td><td>生産年齢人口の減少により、構造的な人手不足が続く</td></tr>
          <tr><td className="hl">人材不足</td><td>売り手市場化で、採用競争と定着の重要性が増す</td></tr>
          <tr><td className="hl">外国人雇用</td><td>労働力確保と多様性の両面から、外国人材の活用が広がる</td></tr>
        </tbody>
      </table>
      <p>日本では<Term>少子高齢化</Term>による労働力人口の減少が構造的な前提です。「採れて当たり前」ではなくなった以上、<Link href="/management/individual/onboarding">口説く採用</Link>や定着の設計、そして省人化の工夫が、これまで以上に重要になります。</p>

      <Heading num="03">法律・コンプライアンス ― 守るべき一線</Heading>
      <p>人事は人の生活そのものを扱うため、多くの<Term>法律</Term>に囲まれています。ここを軽視すると、企業の存続に関わるリスクになります。主要な法律を押さえておきましょう。</p>
      <table>
        <thead>
          <tr><th>法律</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">労働基準法</td><td>労働時間・休日・賃金など、労働条件の最低基準を定める</td></tr>
          <tr><td className="hl">労働契約法</td><td>雇用契約のルール。解雇の制限や無期転換などを定める</td></tr>
          <tr><td className="hl">育児介護休業法</td><td>育児・介護と仕事の両立を支える休業・短時間勤務を保障する</td></tr>
          <tr><td className="hl">個人情報保護法</td><td>従業員・応募者の個人情報の適正な取り扱いを義務づける</td></tr>
        </tbody>
      </table>
      <p>これらの遵守が<Term>コンプライアンス</Term>の土台です。ハラスメント防止や労働時間の上限管理は、<Link href="/management/individual">労務管理</Link>の現場実務と、法令遵守という組織責任の両面を持ちます。法令・コンプライアンスは<Link href="/ops/compliance">運用のコンプライアンス</Link>とも重なる領域です。</p>

      <Heading num="04">HRテクノロジー ― データで人事を支える</Heading>
      <p><Term>HRテクノロジー（HRTech）</Term>は、人事の実務をテクノロジーで支え、勘と経験の世界にデータの視点を持ち込む動きです。主要なツールと概念を整理します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>HRIS</h4><p>人事情報システム。社員情報・勤怠・給与などを一元管理する基盤。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ATS</h4><p>採用管理システム。応募から選考・内定までの候補者フローを管理する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>タレントマネジメントシステム</h4><p>スキル・評価・配置を可視化し、育成と配置の意思決定を支える。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>People Analytics</h4><p>人事データを分析し、離職予測や配置最適化などの示唆を得る。</p></Card>
      </CardGrid>
      <p>近年は<Term>AI</Term>の活用も進み、候補者スクリーニング、離職の兆候検知、資料作成の効率化など応用範囲が広がっています。ただしデータはあくまで意思決定を助ける材料であり、最終的に人を扱う判断の責任は人にあります。<Term>People Analytics</Term>の要点は「感覚を否定する」ことではなく、「感覚を検証可能にする」ことです。</p>

      <Analogy label="💡 たとえるなら">
        経営・社会とのつながりは、<Term>船と海</Term>の関係に似ています。船内をどれだけ整えても（組織の内部設計）、潮流・天候・海図（市場・法律・データ）を読み違えれば座礁します。良い船長は、船の中だけでなく、船を取り巻く海の状況を常に見ています。
      </Analogy>

      <Heading num="まとめ">外部環境を織り込む4視点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>人事戦略</h4><p>経営と一体で語り、人的資本を外部にも開示する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>労働市場</h4><p>少子高齢化を前提に、採れて当たり前ではない世界で戦う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>法律・コンプライアンス</h4><p>守るべき一線。軽視は企業の存続リスクに直結する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>HRテクノロジー</h4><p>データで人事を支え、感覚を検証可能にする。</p></Card>
      </CardGrid>
      <p>これで個人→チーム→組織→社会という体系のレイヤーを一通り見ました。最後に、ここまでの各テーマを支える<Link href="/management/theory">マネジメント理論家</Link>の系譜を押さえておきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/theory" tag="マネジメント">マネジメント理論家</RelatedLink>
                    <RelatedLink href="/management/org" tag="マネジメント">組織のマネジメント（マクロ）</RelatedLink>
                    <RelatedLink href="/ops/compliance" tag="サービス運営">運用 ― 法令・コンプライアンス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
