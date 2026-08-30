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
  title: "Cloud Monitoring",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; モニタリングと管理</Eyebrow>
        <h1>Cloud Monitoring ― メトリクス・アラートで状態を可視化する</h1>
        <Lead>
          <Term>Cloud Monitoring</Term>はGCPリソースの状態を継続的に観測するサービスで、AWSの<Term>CloudWatch</Term>に相当します。数値の時系列データである<Term>メトリクス</Term>、しきい値超えを検知する<Term>アラート</Term>、1画面にまとめた<Term>ダッシュボード</Term>を軸に、「今どうなっているか」を可視化します。
        </Lead>
      </Hero>

      <Heading num="01">標準メトリクスとカスタムメトリクス</Heading>
      <p>Compute EngineのCPU使用率のように、多くのGCPサービスは追加設定なしで基本的な<Term>標準メトリクス</Term>を自動的に送信します。アプリケーション独自の指標(例: 「注文処理の成功件数」)を計測したい場合は、<Term>カスタムメトリクス</Term>としてOpenTelemetryやMonitoring API経由で明示的に送信します。</p>

      <Heading num="02">Cloud Loggingとの統合</Heading>
      <p><Term>Cloud Logging</Term>に出力されたログは、Cloud Monitoringと同じコンソールから検索できます。ログベースのメトリクス(特定のエラーログの件数など)を定義し、それをアラート条件に使うことも可能です。<Link href="/security/logging">ログ出力設計</Link>ページで見た「後から調査できる記録」の実効性は、この検索のしやすさに大きく左右されます。</p>

      <Heading num="03">アラートポリシー</Heading>
      <p><Term>アラートポリシー</Term>は、メトリクスがしきい値を超えたり、一定時間異常が続いたりしたときに、メール・Slack・PagerDutyなどへ通知を送る仕組みです。本番環境では「ユーザーに影響が出る前に気づく」ために、SLI(サービスレベル指標)に基づいたアラート設計が重要になります。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Monitoringは「ビルに設置された温度計・人数センサーと、その記録を検索できる管理室」です。標準メトリクスは備え付けのセンサー、カスタムメトリクスは自分で追加した専用センサー、アラートは「いつもと違う数値だけを賢く見分ける警備員」のような役割です。
      </Analogy>

      <Heading num="まとめ">Cloud Monitoringを構成する要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>標準とカスタムのメトリクス</h4><p>GCPサービスは自動計測、アプリ独自の指標は明示的に送信する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Loggingと一体で扱える</h4><p>ログ検索とメトリクスを同じ画面から見渡し、ログベースのアラートも定義できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>アラートで異常を早く知らせる</h4><p>しきい値や持続時間で通知し、障害の早期対応を支える。</p></Card>
      </CardGrid>
      <p>「誰が何をしたか」を追跡する仕組みは<Link href="/cloud/gcp/monitoring">モニタリングと管理</Link>ページで見たCloud Audit Logsが担います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/monitoring" tag="Google Cloud">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/cloud/gcp/security" tag="Google Cloud">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/aws/monitoring/cloudwatch" tag="AWS">CloudWatch</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
