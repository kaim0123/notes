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
  title: "EventBridge",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; アプリケーション統合</Eyebrow>
        <h1>EventBridge ― 内容に応じて自動で振り分けるイベントバス</h1>
        <Lead>
          <Term>EventBridge</Term>は、発生したイベントの<Term>内容そのもの</Term>を見て、あらかじめ定義したルールに一致するものだけを該当する宛先へ自動的に振り分ける<Term>イベントバス</Term>サービスです。<Link href="/cloud/aws/integration/sns">SNS</Link>が「トピックを購読しているか」だけで配信先を決めるのに対し、EventBridgeは「イベントの中身がどんな条件を満たすか」で振り分け先を決められます。
        </Lead>
      </Hero>

      <Heading num="01">イベントバスとルール</Heading>
      <p>EventBridgeの中心にあるのは<Term>イベントバス</Term>です。すべてのAWSアカウントには<Term>デフォルトイベントバス</Term>があり、EC2の状態変化やS3へのアップロードなど、多くのAWSサービスが自動的にイベントを送り込みます。用途ごとに専用の<Term>カスタムイベントバス</Term>を作ることもできます。バスに届いたイベントは<Term>ルール</Term>によって評価され、ルールが定義する<Term>イベントパターン</Term>(JSON形式の条件)に一致したイベントだけが、そのルールに紐づく宛先へ送られます。</p>

      <Heading num="02">ターゲット ― 1つのルールから複数サービスへ</Heading>
      <p>1つのルールには複数の<Term>ターゲット</Term>を設定でき、Lambda・SQS・SNS・Step Functions・ECSタスクの起動など、20を超えるAWSサービスへ直接振り分けられます。SNSでファンアウトする場合はSNS自身が配信の起点でしたが、EventBridgeでは「バスに届いたイベントのうち、条件に一致するものだけ」を選んでから複数ターゲットへ配ることができ、振り分けの判断がより手前の段階(バス側)に寄っています。</p>

      <Heading num="03">パートナーイベントソース ― SaaSとの連携</Heading>
      <p>EventBridgeは自社のAWSサービスだけでなく、Datadog・PagerDuty・Zendeskなど外部の<Term>SaaS事業者からのイベント</Term>を受け取る<Term>パートナーイベントソース</Term>にも対応しています。専用の連携コードを書かなくても、対応済みのSaaS側で送信設定をするだけで、そのイベントを自社のAWS環境内のルールで処理できます。</p>

      <Heading num="04">スキーマレジストリ ― イベントの形を事前に把握する</Heading>
      <p>イベントの中身がどんな形をしているか分からないままルールを書くのは非効率です。EventBridgeの<Term>スキーマレジストリ</Term>は、バスに流れたイベントの構造を自動的に検出・記録し、その形式に合わせたコードのひな形を生成できます。これにより、ルールやターゲット側の処理を書く際に、イベントのフィールド名や型を推測する手間が減ります。</p>

      <Heading num="05">SNSとの使い分け</Heading>
      <table>
        <thead>
          <tr><th></th><th>SNS</th><th>EventBridge</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">振り分け基準</td><td>トピックを購読しているかどうか</td><td>イベント内容に基づくパターンマッチ</td></tr>
          <tr><td className="hl">送信元</td><td>基本的に自分のアプリケーションが発行</td><td>AWSサービス・自社アプリ・SaaSパートナーなど幅広い</td></tr>
          <tr><td className="hl">スキーマ管理</td><td>特になし</td><td>スキーマレジストリでイベント構造を把握できる</td></tr>
          <tr><td className="hl">向いている用途</td><td>シンプルな1対多通知、モバイルプッシュやメールを含む配信</td><td>多数のAWSサービス・SaaSをまたぐ複雑なイベント連携</td></tr>
        </tbody>
      </table>
      <p>両者は排他的ではなく、EventBridgeのターゲットとしてSNSトピックを指定することもできます。「まず内容で粗く振り分け、その先で1対多に配りたい」場合は両方を組み合わせます。</p>

      <Analogy label="💡 たとえるなら">
        EventBridgeは「宛先ラベルを見て自動で仕分ける配送センター」です。荷物(イベント)の伝票に書かれた内容(送り主・品目・宛先地域など)を機械が読み取り、あらかじめ決めたルール(このラベルならこの部署へ)に従って自動的に振り分けます。SNSの館内放送が「聞いている全員に同じ内容を届ける」のに対し、EventBridgeは「荷物の中身ごとに届け先を変える」という、より条件付きの仕分けを担います。
      </Analogy>

      <Heading num="まとめ">アプリケーション統合、3つのサービスの全体像</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>EventBridgeは「内容で振り分ける」</h4><p>イベントパターンに一致したものだけを、複数のAWSサービスやSaaSへ自動でルーティングする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>SNSは「購読者全員に配る」</h4><p>トピックを購読している宛先へ、シンプルなPush型で一斉配信する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>SQSは「1件ずつ確実に処理する」</h4><p>Pull型のキューで受信側の処理速度に合わせ、積み残しなく1回だけ処理する。</p></Card>
      </CardGrid>
      <p>これで、<Link href="/cloud/aws/basics">AWSの基礎</Link>から<Link href="/cloud/aws/integration">アプリケーション統合</Link>まで、AWSの中心となる10分野を一通り見たことになります。実際のシステムでは、ここで見た個々のサービスを組み合わせて、<Link href="/design/architecture">アーキテクチャ</Link>ページで見た構成として組み上がります。残る最後の1分野、<Link href="/cloud/aws/iac">IaC</Link>では、それらの組み合わせを実際にコードでどう定義するかを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/integration/sns" tag="AWS">SNS</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sqs" tag="AWS">SQS</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
