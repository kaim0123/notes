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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "監視・保守",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>監視・保守 ― 正常に動いていることを確かめ続ける</h1>
        <Lead>
          サイトは公開した瞬間から劣化が始まります。<Term>異常に気づく仕組み</Term>(監視)と、<Term>劣化を先回りして防ぐ仕組み</Term>(保守)の両方がなければ、障害はユーザーからの報告で初めて発覚します。
        </Lead>
      </Hero>

      <Heading num="01">監視の3本柱 ― メトリクス・ログ・トレース</Heading>
      <p>「システムが正常に動いているか」は、役割の異なる3種類のデータから判断します。この分類はAWSのCloudWatchで見た構成と同じで、クラウド事業者を問わない一般的な考え方です(AWS固有の実装は<Link href="/cloud/aws/monitoring">モニタリングと管理</Link>を参照)。</p>

      <table>
        <thead>
          <tr><th>種類</th><th>答える問い</th><th>代表的なツール</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メトリクス</td><td>今、数値としてどんな状態か(CPU使用率、レスポンスタイム、エラー率)</td><td>Datadog、Grafana、CloudWatch</td></tr>
          <tr><td className="hl">ログ</td><td>個々のリクエスト・エラーで何が起きたか</td><td>Sentry、Datadog Logs</td></tr>
          <tr><td className="hl">トレース</td><td>1つのリクエストが複数サービスをまたぐ中で、どこで時間がかかっているか</td><td>OpenTelemetry、Datadog APM</td></tr>
        </tbody>
      </table>

      <p>Webアプリのエラー監視においては、<Term>Sentry</Term>のようなツールでフロントエンド・バックエンド双方の例外を自動収集し、スタックトレースとユーザー影響範囲を確認できるようにするのが一般的です。これは<Link href="/test">テスト</Link>セクションで扱う「デプロイ前に不具合を防ぐ」品質管理と対になる、「デプロイ後に発生した不具合に気づく」仕組みです。</p>

      <Heading num="02">アラートとヘルスチェック</Heading>
      <p>異常を検知しても、人が気づかなければ意味がありません。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ヘルスチェック</h4>
          <p>一定間隔で外形監視(UptimeRobot等)がサイトにアクセスし、応答の有無・応答時間を監視する。サーバー内部からは分からない「外から見た可用性」を担保する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>しきい値アラート</h4>
          <p>「エラー率が5%を超えたら通知」のように、異常の兆候をしきい値で定義し、Slack・メールに自動通知する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>アラート疲れへの対策</h4>
          <p>しきい値を厳しくしすぎると通知が鳴りっぱなしになり、やがて無視されるようになる(アラート疲れ)。「対応が必要な異常だけ」に絞り込む調整が欠かせない。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        監視とアラートは「健康診断」と「体温計のアラーム」の関係に似ています。メトリクス・ログ・トレースは定期健康診断で体の状態を数値化する検査、アラートは体温計が39度を超えたら鳴る警報です。警報のしきい値を36.5度に設定してしまうと四六時中鳴り続けて誰も反応しなくなる ― これがアラート疲れです。
      </Analogy>

      <Heading num="03">障害対応</Heading>
      <p>アラートが鳴った後の動きも、事前に型を決めておくと混乱が減ります。典型的には「①検知→②影響範囲の切り分け→③暫定対応(ロールバック等で被害を止める)→④根本原因の調査→⑤恒久対応→⑥ポストモーテム(振り返り)」という順で進めます。特に重要なのは<Term>ポストモーテム</Term>で、「誰が悪かったか」ではなく「なぜ検知が遅れたか」「なぜ同じ種類の障害を仕組みで防げなかったか」を記録し、再発防止につなげます。</p>

      <Heading num="04">保守 ― 劣化を先回りする</Heading>
      <p>障害が起きてから対応する監視に対し、保守は<Term>起きる前に手を打つ</Term>活動です。</p>

      <CardGrid>
        <Card>
          <div className="mb-1.5"><Mark tier="must">継続</Mark></div>
          <h4>依存ライブラリの更新</h4>
          <p>放置すると脆弱性(CVE)が既知のまま残る。Dependabot等で更新PRを自動生成し、CIでテストを通してからマージする運用が一般的。</p>
        </Card>
        <Card>
          <div className="mb-1.5"><Mark tier="must">継続</Mark></div>
          <h4>SSL証明書の更新</h4>
          <p>期限切れは即座にサイト全体が閲覧不能になる重大障害。Let&apos;s Encrypt等の自動更新や、多くのPaaS/CDNでの自動管理でこのリスク自体をなくすのが基本方針。</p>
        </Card>
        <Card>
          <div className="mb-1.5"><Mark tier="niche">定期</Mark></div>
          <h4>非推奨機能への追従</h4>
          <p>フレームワーク・APIの非推奨(deprecation)通知を放置せず、廃止される前に計画的に移行する。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ 依存ライブラリ更新のリスクをCIで機械的に検証する仕組みは、<Link href="/test/quality-plan">品質計画</Link>で扱う自動チェックの一部として組み込むのが理想的。</MarkNote>

      <Heading num="まとめ">気づく仕組みと、防ぐ仕組み</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3本柱で状態を可視化する</h4><p>メトリクス・ログ・トレースを揃え、何が起きているかを追跡できるようにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>適切な粒度でアラートを鳴らす</h4><p>ヘルスチェックとしきい値アラートで異常を検知しつつ、アラート疲れを避ける。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>保守で先回りする</h4><p>依存関係・証明書の更新を仕組み化し、障害が起きる前に手を打つ。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
                    <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
                    <RelatedLink href="/ops/cost" tag="サービス運営">コスト管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
