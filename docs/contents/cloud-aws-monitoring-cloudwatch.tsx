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
  title: "CloudWatch",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; モニタリングと管理</Eyebrow>
        <h1>CloudWatch ― メトリクス・ログ・アラームで状態を可視化する</h1>
        <Lead>
          <Term>CloudWatch</Term>はAWSリソースの状態を継続的に観測するサービスで、数値の時系列データである<Term>メトリクス</Term>、文字列の記録である<Term>ログ</Term>、しきい値超えを検知する<Term>アラーム</Term>という3つの機能を軸に、「今どうなっているか」を可視化します。
        </Lead>
      </Hero>

      <Heading num="01">標準メトリクスとカスタムメトリクス</Heading>
      <p>EC2のCPU使用率のように、多くのAWSサービスは追加設定なしで基本的な<Term>標準メトリクス</Term>を自動的に送信します。一方、アプリケーション独自の指標(例: 「注文処理の成功件数」)を計測したい場合は、<Term>カスタムメトリクス</Term>としてアプリケーション側から明示的に送信する必要があります。ログの出力と同時にメトリクスも生成できる<Term>埋め込みメトリクス形式(EMF)</Term>を使うと、専用のAPI呼び出しを増やさずにログとメトリクスを一度に扱えます。</p>

      <Heading num="02">Logs Insights ― ログをクエリで検索する</Heading>
      <p>大量に溜まったログをただ眺めるのではなく、<Term>CloudWatch Logs Insights</Term>という専用のクエリ言語で、「特定の時間帯に発生したエラーログだけを抽出する」「レスポンスタイムの上位10件を出す」といった集計・検索が行えます。<Link href="/security/logging">ログ出力設計</Link>ページで見た「後から調査できる記録を残す」ことの実効性は、この検索のしやすさに大きく左右されます。</p>

      <Heading num="03">アラームの種類</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>仕組み</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">静的しきい値アラーム</td><td>「CPU使用率が80%を5分超えたら」のように、固定の数値を基準に検知する</td></tr>
          <tr><td className="hl">異常検知アラーム</td><td>過去のデータから機械学習で「通常の変動範囲」を学習し、そこから外れた動きを検知する。曜日・時間帯で変動するトラフィックなどに向く</td></tr>
          <tr><td className="hl">複合アラーム</td><td>複数のアラームをAND/ORで組み合わせ、「CPUとメモリの両方が高い時だけ通知する」といった条件を作る</td></tr>
        </tbody>
      </table>

      <Heading num="04">ダッシュボードとエージェント</Heading>
      <p>複数のメトリクス・ログを1画面にまとめた<Term>ダッシュボード</Term>を作成すると、システム全体の状態を1か所で見渡せます。また、EC2インスタンス内部のメモリ使用率やディスク使用率のように、標準メトリクスだけではカバーされないOSレベルの指標を収集するには、インスタンスに<Term>CloudWatch Agent</Term>を導入します。</p>

      <Analogy label="💡 たとえるなら">
        CloudWatchは「ビルに設置された温度計・人数センサーと、その記録を検索できる管理室」です。標準メトリクスは備え付けのセンサーで自動計測される値、カスタムメトリクスは自分で追加した専用センサーの値にあたります。Logs Insightsは、溜まった記録用紙の山から「先週の火曜、3階で何が起きたか」を条件検索できる管理室の端末で、異常検知アラームは「いつもと違う人の出入りパターンだけを賢く見分ける警備員」のような役割です。
      </Analogy>

      <Heading num="まとめ">CloudWatchを構成する要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>標準・カスタムメトリクスで数値を集める</h4><p>多くは自動収集されるが、アプリ独自の指標は明示的に送信する必要がある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Logs Insightsでログを検索・集計する</h4><p>専用クエリ言語で、大量のログから必要な情報だけを取り出せる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>アラームの種類を使い分ける</h4><p>固定しきい値・異常検知・複合条件を、検知したい状況に応じて選ぶ。</p></Card>
      </CardGrid>
      <p>実際に「誰が何をしたか」を追跡する仕組みは<Link href="/cloud/aws/monitoring">モニタリングと管理</Link>ページで見たCloudTrailが担います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
