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
  title: "Cloud Functions",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; コンピューティング</Eyebrow>
        <h1>Cloud Functions ― イベントが起きた時だけコードを動かす</h1>
        <Lead>
          <Term>Cloud Functions</Term>は、コードの断片(関数)をアップロードしておくと、指定したイベントが発生した瞬間だけ実行環境が自動的に用意され、処理が終われば消える<Term>サーバーレス</Term>のコンピューティングサービスです。AWSの<Term>Lambda</Term>に相当します。
        </Lead>
      </Hero>

      <Heading num="01">実行モデルとコールドスタート</Heading>
      <p>Cloud Functionsはイベントが発生するたびに、必要であれば新しい実行環境を用意してからコードを実行します。しばらく呼び出されていない関数を久しぶりに呼び出すと、実行環境の準備(ランタイムの起動、初期化コードの実行)に余分な時間がかかり、これを<Term>コールドスタート</Term>と呼びます。短時間に連続して呼び出されると、既存の実行環境が再利用される<Term>ウォームスタート</Term>となり、応答が速くなります。</p>

      <Heading num="02">イベントソースによる呼び出し方の違い</Heading>
      <table>
        <thead>
          <tr><th>呼び出し方</th><th>代表的なイベントソース</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HTTP</td><td>Cloud Functions URL・API Gateway</td><td>HTTPリクエストに直接応答する。同期呼び出し。</td></tr>
          <tr><td className="hl">イベント駆動</td><td><Link href="/cloud/gcp/integration/pubsub">Pub/Sub</Link>・Cloud Storage</td><td>メッセージやファイル操作をトリガーに非同期で実行される。</td></tr>
          <tr><td className="hl">スケジュール</td><td>Cloud Scheduler</td><td>決まった時刻・間隔で関数を起動する。</td></tr>
        </tbody>
      </table>

      <Heading num="03">第1世代と第2世代</Heading>
      <p>GCPには<Term>Cloud Functions(第1世代)</Term>と<Term>Cloud Functions(第2世代)</Term>があります。第2世代は<Term>Cloud Run</Term>上で動作し、より長い実行時間・大きなメモリ・Pub/SubやEventarcとの連携が強化されています。新規プロジェクトでは第2世代の利用が推奨されます。</p>

      <Heading num="04">同時実行数と処理の詰まり</Heading>
      <p>大量のイベントが一度に発生すると、Cloud Functionsはその分だけ実行環境を並行して立ち上げる<Term>同時実行</Term>でさばこうとします。プロジェクトやリージョンごとに同時実行数の上限があり、これを超えるリクエストはスロットリング(制限)されます。重要な関数では<Term>最小インスタンス数</Term>(第2世代)を設定し、コールドスタートを減らすこともできます。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Functionsは「必要な時だけ開く屋台」に似ています。お客(イベント)が来るたびに屋台を組み立てて調理を始め、注文が途切れれば屋台はしまわれます。しばらく誰も来ていないと組み立てから始める分、最初の1杯は少し時間がかかります(コールドスタート)が、お客が続けて来る間は組み立てたままなので、すぐに提供できます(ウォームスタート)。
      </Analogy>

      <Heading num="まとめ">Cloud Functionsを使いこなす3つの観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>イベントソースでトリガーが決まる</h4><p>HTTP・Pub/Sub・Storageなど、何をきっかけに動かすかで設計が変わる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>第2世代はCloud Run基盤で拡張性が高い</h4><p>新規は第2世代を選び、長時間実行やEventarc連携を活かす。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>同時実行数の上限を意識する</h4><p>急激な負荷ではスロットリングが起こり得るため、最小インスタンス数で備える。</p></Card>
      </CardGrid>
      <p>Cloud Functionsが処理するイベントの多くは<Link href="/cloud/gcp/integration">アプリケーション統合</Link>で見たPub/Sub経由でやり取りされます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/compute" tag="Google Cloud">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/gcp/integration/pubsub" tag="Google Cloud">Pub/Sub</RelatedLink>
                    <RelatedLink href="/cloud/aws/compute/lambda" tag="AWS">Lambda</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
