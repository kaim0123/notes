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
  title: "Lambda",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; コンピューティング</Eyebrow>
        <h1>Lambda ― イベントが起きた時だけコードを動かす</h1>
        <Lead>
          <Term>Lambda</Term>は、コードの断片(関数)をアップロードしておくと、指定したイベントが発生した瞬間だけ実行環境が自動的に用意され、処理が終われば消える<Term>サーバーレス</Term>のコンピューティングサービスです。サーバーの起動・停止・パッチ適用といった管理作業自体が発生しません。
        </Lead>
      </Hero>

      <Heading num="01">実行モデルとコールドスタート</Heading>
      <p>Lambda関数はイベントが発生するたびに、必要であれば新しい実行環境を用意してからコードを実行します。しばらく呼び出されていない関数を久しぶりに呼び出すと、この実行環境の準備(ランタイムの起動、初期化コードの実行)に余分な時間がかかり、これを<Term>コールドスタート</Term>と呼びます。逆に短時間に連続して呼び出されると、既存の実行環境が再利用される<Term>ウォームスタート</Term>となり、応答が速くなります。</p>

      <Heading num="02">イベントソースによる呼び出し方の違い</Heading>
      <p>Lambdaを呼び出す<Term>イベントソース</Term>によって、呼び出しの性質が変わります。</p>
      <table>
        <thead>
          <tr><th>呼び出し方</th><th>代表的なイベントソース</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同期呼び出し</td><td>API Gateway</td><td>呼び出し元が処理結果をその場で受け取り、応答としてすぐ使う</td></tr>
          <tr><td className="hl">非同期呼び出し</td><td>S3・<Link href="/cloud/aws/integration/sns">SNS</Link></td><td>呼び出し元は結果を待たず、失敗時はLambda側で自動リトライされる</td></tr>
          <tr><td className="hl">ポーリング呼び出し</td><td><Link href="/cloud/aws/integration/sqs">SQS</Link>・DynamoDB Streams</td><td>Lambdaのサービス側が定期的にキューやストリームを監視し、たまったデータをまとめて処理する</td></tr>
        </tbody>
      </table>

      <Heading num="03">メモリ設定とCPU性能の連動</Heading>
      <p>Lambdaの設定項目のうち直接指定できるのは主に<Term>メモリサイズ</Term>で、CPU性能やネットワーク帯域はこのメモリサイズに比例して自動的に割り当てられます。処理が重くCPUを多く使う関数では、メモリを増やすことで実行時間そのものが短くなり、結果的に「メモリ単価は上がるが実行時間が縮む分、総コストは変わらない、あるいは下がる」ケースも珍しくありません。</p>

      <Heading num="04">同時実行数と処理の詰まり</Heading>
      <p>大量のイベントが一度に発生すると、Lambdaはその分だけ実行環境を並行して立ち上げる<Term>同時実行</Term>でさばこうとします。ただしアカウントごとに同時実行数の上限があり、これを超えるリクエストはスロットリング(制限)されます。急激なアクセスでもコールドスタートを避けたい重要な関数には、事前に実行環境を温めておく<Term>プロビジョニング済み同時実行</Term>を設定できます。</p>

      <Analogy label="💡 たとえるなら">
        Lambdaは「必要な時だけ開く屋台」に似ています。お客(イベント)が来るたびに屋台を組み立てて調理を始め、注文が途切れれば屋台はしまわれます。しばらく誰も来ていないと組み立てから始める分、最初の1杯は少し時間がかかります(コールドスタート)が、お客が続けて来る間は組み立てたままなので、すぐに提供できます(ウォームスタート)。
      </Analogy>

      <Heading num="まとめ">Lambdaを使いこなす3つの観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>呼び出し方でリトライの挙動が変わる</h4><p>同期・非同期・ポーリングのどれかによって、失敗時の扱いや呼び出し元への影響が異なる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メモリ設定がCPU性能も左右する</h4><p>メモリを増やすと処理速度も上がるため、コストと実行時間はセットで考える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>同時実行数の上限を意識する</h4><p>急激な負荷ではスロットリングが起こり得るため、重要な関数はプロビジョニング済み同時実行で備える。</p></Card>
      </CardGrid>
      <p>Lambdaが返す・受け取るイベントの多くは<Link href="/cloud/aws/integration">アプリケーション統合</Link>で見たSQS・SNS・EventBridge経由でやり取りされます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sqs" tag="AWS">SQS</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd/codebuild" tag="AWS">CodeBuild</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
