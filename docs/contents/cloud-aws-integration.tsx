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
        <Eyebrow>AWS</Eyebrow>
        <h1>アプリケーション統合 ― サービス同士を疎結合につなぐ</h1>
        <Lead>
          <Link href="/cloud/aws/compute">コンピューティング</Link>や<Link href="/cloud/aws/container">コンテナ</Link>で見たように、処理は1つの巨大なアプリケーションではなく、複数の小さなサービスに分かれて動くことが増えています。<Term>アプリケーション統合</Term>は、その分かれたサービス同士を直接呼び合わせるのではなく、間に仲介役を挟んで<Term>疎結合</Term>につなぐための分野です。中心となる<Term>SQS</Term>・<Term>SNS</Term>・<Term>EventBridge</Term>は、それぞれ次のページで詳しく見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">3つのサービスの役割分担</Heading>
      <p>3つとも「メッセージやイベントを仲介する」点は共通していますが、<Term>誰が受け取るか</Term>と<Term>どう配る仕組みか</Term>が異なります。</p>

      <table>
        <thead>
          <tr><th></th><th>SQS</th><th>SNS</th><th>EventBridge</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">配送モデル</td><td>キュー(1対1)</td><td>Pub/Sub(1対多)</td><td>イベントルーティング(1対多)</td></tr>
          <tr><td className="hl">受け取り方</td><td>受信側がPull(取りに行く)</td><td>Push(配信される)</td><td>Push(配信される)</td></tr>
          <tr><td className="hl">振り分け基準</td><td>なし(先入れ先出しで1つずつ処理)</td><td>トピックの購読の有無</td><td>イベント内容に基づくルール(パターンマッチ)</td></tr>
          <tr><td className="hl">主な用途</td><td>処理の負荷分散・非同期タスクの積み残し防止</td><td>1つの出来事を複数の宛先に一斉配信</td><td>多数のAWSサービス・SaaSをまたぐイベント連携</td></tr>
        </tbody>
      </table>

      <p>この違いは、<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>ページで見た「イベント」と「メッセージ」の違いにも重なります。SQSはメッセージ(特定の受信者への処理依頼)を1件ずつ確実に届けることに強く、SNSとEventBridgeはイベント(起きた事実の通知)を複数の宛先へ広めることに強い、という向き不向きがあります。</p>

      <Heading num="02">よく組み合わせる形 ― ファンアウトパターン</Heading>
      <p>3つは単独でも使えますが、実務では<Term>SNS + 複数のSQS</Term>という組み合わせが頻出します。SNSトピックに1件発行するだけで、注文処理用・在庫更新用・通知メール用など複数のSQSキューへ同時に複製され、各キューの受信側は他の受信側の存在を気にせず自分の処理だけに専念できます。これを<Term>ファンアウトパターン</Term>と呼びます。</p>

      <Analogy label="💡 たとえるなら">
        SQSは「順番待ちの窓口」です。並んだ人(メッセージ)を窓口係(受信側)が1人ずつ呼び出して処理し、呼ばれるまで列に残り続けます。SNSは「館内放送」で、アナウンスが流れると、それを聞いている全部署(購読者)が同時に反応します。EventBridgeは「送り先を宛先ラベルで自動仕分けする配送センター」で、荷物(イベント)の中身を見て、あらかじめ決めたルールに従い該当する部署だけに届けます。
      </Analogy>

      <Heading num="まとめ">3つのサービスを使い分ける軸</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>SQSは「積み残さず、確実に1回処理する」</h4><p>Pull型のキューで処理を非同期化し、負荷のばらつきを吸収する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>SNSは「1つの出来事を複数へ一斉に伝える」</h4><p>Push型のPub/Subで、SQSやLambdaなど複数の宛先へ同時配信する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>EventBridgeは「内容に応じて自動で振り分ける」</h4><p>ルールベースのイベントルーティングで、多数のAWSサービス・SaaSと連携する。</p></Card>
      </CardGrid>
      <p>これで、AWSの基礎・コンピューティング・ストレージ・ネットワーキング・セキュリティ・データベース・モニタリング・コンテナ・CI/CD・アプリケーション統合という、AWSの中心となる10分野を一通り見たことになります。残る<Link href="/cloud/aws/iac">IaC</Link>では、ここまで見てきたサービス群を実際にどうコードで定義し、デプロイするかを見ていきます。まずは最も基本となる<Link href="/cloud/aws/integration/sqs">SQS</Link>から見ていきます。</p>

      <IndexGrid>
        <IndexCard href="/cloud/aws/integration/sqs" num="01" title="SQS">
          非同期処理を積み残さずに捌く、Pull型のメッセージキュー。
        </IndexCard>
        <IndexCard href="/cloud/aws/integration/sns" num="02" title="SNS">
          1つの出来事を複数の宛先へ一斉配信する、Push型のPub/Sub。
        </IndexCard>
        <IndexCard href="/cloud/aws/integration/eventbridge" num="03" title="EventBridge">
          イベントの内容に応じて自動で振り分ける、ルールベースのイベントバス。
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sqs" tag="AWS">SQS</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
