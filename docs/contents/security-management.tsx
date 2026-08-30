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
  title: "リスクマネジメント",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>リスクマネジメント ― 組織として安全を運用する</h1>
        <Lead>
          セキュリティは技術的な対策だけでは完結しません。どのリスクにどこまで対応するかを決め、方針を定め、体制を整え、継続的に見直す ― この組織的な枠組みがリスクマネジメントです。ここでは情報セキュリティポリシー、リスクアセスメントと対応、ISMS、そしてインシデント対応・事業継続の考え方を整理します。
        </Lead>
      </Hero>

      <Heading num="01">リスクアセスメント ― リスクを洗い出し、評価する</Heading>
      <p><Term>リスクアセスメント</Term>は、守るべき情報資産を洗い出し(<Term>リスク特定</Term>)、それぞれの脅威・脆弱性からリスクの大きさを見積もり(<Term>リスク分析</Term>)、対応の優先順位を決める(<Term>リスク評価</Term>)一連の手順です。リスクの大きさは、発生する可能性と、起きたときの影響の大きさで見積もります。</p>

      <Heading num="02">リスク対応 ― 4つの選択肢</Heading>
      <p>評価したリスクには、コストと効果を踏まえて対応方針を選びます。大きく4つに分類されます。</p>
      <table>
        <thead>
          <tr><th>対応</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リスク低減</td><td>対策を講じて発生確率や影響を下げる</td><td>暗号化、多要素認証、教育</td></tr>
          <tr><td className="hl">リスク回避</td><td>リスクの原因となる活動自体をやめる</td><td>危険な機能・サービスを提供しない</td></tr>
          <tr><td className="hl">リスク移転(共有)</td><td>影響を第三者に移す</td><td>サイバー保険、外部委託</td></tr>
          <tr><td className="hl">リスク保有(受容)</td><td>許容範囲として受け入れ、対策しない</td><td>影響が小さく対策コストが見合わない</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        リスク対応は「持ち家の水漏れ対策」に似ています。配管を直す(低減)、水回りの設備を置かない(回避)、火災保険に入る(移転)、小さなにじみは様子見(保有)。すべてを完璧に防ぐのではなく、費用対効果で選びます。
      </Analogy>

      <Heading num="03">情報セキュリティポリシーとISMS</Heading>
      <p><Term>情報セキュリティポリシー</Term>は、組織としてのセキュリティの基本方針・対策基準・実施手順を文書化したものです。これを継続的に運用・改善する仕組みが<Term>ISMS(情報セキュリティマネジメントシステム)</Term>で、国際規格<Term>ISO/IEC 27001(JIS Q 27001)</Term>にもとづきます。</p>
      <p>ISMSは<Term>PDCAサイクル</Term>(計画→実行→評価→改善)で回すのが基本です。一度決めた対策を守り続けるのではなく、脅威の変化にあわせて継続的に見直します。</p>

      <Heading num="04">インシデント対応と事業継続</Heading>
      <p>どれだけ備えても、事故(<Term>インシデント</Term>)は起こりえます。発生時に迅速に対応する専門チームが<Term>CSIRT(シーサート)</Term>です。検知・初動対応・復旧・再発防止までを担います。</p>
      <p>大規模災害やシステム停止に備え、事業を継続・早期復旧させる計画が<Term>BCP(事業継続計画)</Term>や<Term>コンティンジェンシープラン</Term>です。どこまでのデータ損失を許すか(RPO)、どれだけの時間で復旧するか(RTO)といった目標を定め、バックアップや代替拠点を準備します。</p>

      <Heading num="まとめ">技術の外側を固める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>アセスメントで優先順位を決める</h4><p>資産・脅威・脆弱性を評価し、どのリスクから対応するかを決めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>対応は低減・回避・移転・保有</h4><p>すべてを防ぐのではなく、費用対効果で対応方針を選びます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ISMSで継続的に回す</h4><p>ポリシーを定め、PDCAで見直し、インシデントと事業継続に備えます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/basics" tag="セキュリティ">情報セキュリティの目的と脅威</RelatedLink>
                    <RelatedLink href="/security/countermeasures" tag="セキュリティ">セキュリティ対策と実装</RelatedLink>
                    <RelatedLink href="/ops/compliance" tag="サービス運営">法令・コンプライアンス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
