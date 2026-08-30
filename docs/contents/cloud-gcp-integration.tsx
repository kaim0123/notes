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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "アプリケーション統合",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>アプリケーション統合 ― サービス同士を疎結合につなぐ</h1>
        <Lead>
          処理は1つの巨大なアプリケーションではなく、複数の小さなサービスに分かれて動くことが増えています。<Term>アプリケーション統合</Term>は、その分かれたサービス同士を直接呼び合わせるのではなく、間に仲介役を挟んで<Term>疎結合</Term>につなぐための分野です。GCPでは<Term>Pub/Sub</Term>が中心で、<Term>Eventarc</Term>・<Term>Cloud Tasks</Term>が用途に応じて補います。
        </Lead>
      </Hero>

      <Heading num="01">3つのサービスの役割分担</Heading>
      <table>
        <thead>
          <tr><th></th><th>Pub/Sub</th><th>Eventarc</th><th>Cloud Tasks</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">配送モデル</td><td>Pub/Sub(1対多)</td><td>イベントルーティング(1対多)</td><td>タスクキュー(1対1)</td></tr>
          <tr><td className="hl">受け取り方</td><td>PullまたはPush</td><td>Push(Cloud Run等へ)</td><td>Pull(ワーカーが取りに行く)</td></tr>
          <tr><td className="hl">振り分け基準</td><td>トピックの購読の有無</td><td>イベント内容に基づくルール</td><td>キューに積まれた順</td></tr>
          <tr><td className="hl">主な用途</td><td>非同期メッセージ・ファンアウト</td><td>GCPサービス間のイベント連携</td><td>遅延実行・リトライ付きタスク</td></tr>
        </tbody>
      </table>

      <p>この分類は<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>ページで見た「イベント」と「メッセージ」の違いにも重なります。Pub/SubはAWSの<Term>SNS + SQS</Term>の組み合わせに近い役割を1サービスで担うことが多く、Eventarcは<Term>EventBridge</Term>に相当します。</p>

      <Heading num="02">よく組み合わせる形 ― Pub/Sub + Cloud Functions / Cloud Run</Heading>
      <p>Pub/Subトピックに1件発行するだけで、複数のサブスクライバ(<Link href="/cloud/gcp/compute/cloud-functions">Cloud Functions</Link>・<Term>Cloud Run</Term>・外部Webhook)が同時に処理を開始できます。発行側は受信側の数や種類を知らなくてよい<Term>ファンアウト</Term>パターンが、GCPのイベント駆動設計の基本です。</p>

      <Analogy label="💡 たとえるなら">
        Pub/Subは「館内放送と各部署の受信機」、Eventarcは「荷物のラベルを見て自動仕分けする配送センター」、Cloud Tasksは「指定時刻に処理する順番待ちの窓口」です。
      </Analogy>

      <Heading num="まとめ">3つのサービスを使い分ける軸</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Pub/Subは非同期メッセージの中心</h4><p>1対多の配信とファンアウト。GCP統合の第一選択。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>EventarcはGCPイベントのルーティング</h4><p>Storage・Firestoreなどの変更をCloud Runへ自動配送。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud Tasksは遅延・リトライ付きタスク</h4><p>「5分後に1回だけ実行」など、スケジュールと再試行を制御。</p></Card>
      </CardGrid>
      <p>まずは最も基本となる<Link href="/cloud/gcp/integration/pubsub">Pub/Sub</Link>から見ていきます。残る<Link href="/cloud/gcp/iac">IaC</Link>では、ここまで見てきたサービス群をコードで定義する方法を扱います。</p>

      <IndexGrid>
        <IndexCard href="/cloud/gcp/integration/pubsub" num="01" title="Pub/Sub">
          非同期メッセージとファンアウトの中心。GCPのイベント駆動設計の土台。
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/cicd" tag="Google Cloud">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/gcp/integration/pubsub" tag="Google Cloud">Pub/Sub</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration" tag="AWS">アプリケーション統合(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
