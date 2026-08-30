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
  title: "モニタリングと管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>モニタリングと管理 ― 見えないシステムを見えるようにする</h1>
        <Lead>
          クラウド上のリソースは物理的に手で触れられないぶん、「今どう動いているか」「誰が何をしたか」を可視化する仕組みがなければ、障害にも不正操作にも気づけません。<Term>Cloud Monitoring</Term>が「今の状態」を、<Term>Cloud Audit Logs</Term>が「誰が何をしたかの記録」を担います。
        </Lead>
      </Hero>

      <Heading num="01">Cloud Monitoring ― 状態を測り、異常を知らせる</Heading>
      <p><Term>Cloud Monitoring</Term>はGCPリソースの状態を継続的に観測するサービスで、AWSの<Term>CloudWatch</Term>に相当します。メトリクス・ログ・アラームの詳細は<Link href="/cloud/gcp/monitoring/cloud-monitoring">Cloud Monitoringのページ</Link>で扱います。</p>

      <table>
        <thead>
          <tr><th>機能</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メトリクス</td><td>CPU使用率・リクエスト数など、数値の時系列データを収集・可視化する。</td></tr>
          <tr><td className="hl">アラート</td><td>しきい値超えや異常検知で通知(Slack・メール・PagerDutyなど)を送る。</td></tr>
          <tr><td className="hl">ダッシュボード</td><td>複数のメトリクスを1画面にまとめ、システム全体の状態を見渡す。</td></tr>
        </tbody>
      </table>

      <Heading num="02">Cloud Logging ― ログを集約・検索する</Heading>
      <p><Term>Cloud Logging</Term>は、アプリケーションやGCPサービスが出力する<Term>ログ</Term>を一元収集するサービスです。<Term>Logs Explorer</Term>で条件検索し、<Link href="/security/logging">ログ出力設計</Link>ページで見た「後から調査できる記録を残す」原則をGCP環境で実践します。Cloud Monitoringと統合され、メトリクスとログを同じ画面から扱えます。</p>

      <Heading num="03">Cloud Audit Logs ― 「誰が何をしたか」を記録する</Heading>
      <p><Term>Cloud Audit Logs</Term>は、GCPプロジェクト内で行われた管理操作(API呼び出し)を記録する監査ログで、AWSの<Term>CloudTrail</Term>に相当します。Cloud Monitoringが「システムの健康状態」を見るのに対し、Audit Logsは「誰が、いつ、何を変更したか」という<Term>操作の追跡可能性</Term>を保証します。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Monitoringは「ビルに設置された温度計・人数センサー」、Cloud Audit Logsは「入退室記録簿」です。前者は「今、何かおかしくないか」を、後者は「後から、何が起きたか」を担当する、補い合う2つの記録です。
      </Analogy>

      <Heading num="まとめ">Cloud Monitoringが今を測り、Audit Logsが過去を記録する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Cloud Monitoringが今を測る</h4><p>メトリクス・アラート・ダッシュボードで、システムの健康状態をリアルタイムに把握する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud Loggingが記録を集約する</h4><p>アプリとGCPサービスのログを1か所に集め、検索・分析する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud Audit Logsが操作を追跡する</h4><p>管理API呼び出しを記録し、誰が何をしたかを事後に遡れるようにする。</p></Card>
      </CardGrid>
      <p>次のページでは「<Link href="/cloud/gcp/container">コンテナ</Link>」を扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/security" tag="Google Cloud">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/gcp/container" tag="Google Cloud">コンテナ</RelatedLink>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリング(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
