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
  title: "Pub/Sub",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; アプリケーション統合</Eyebrow>
        <h1>Pub/Sub ― 非同期メッセージとファンアウトの中心</h1>
        <Lead>
          <Term>Pub/Sub(Publish/Subscribe)</Term>は、メッセージを<Term>トピック</Term>に発行(publish)し、それを購読(subscribe)した複数の受信側へ配信するマネージドなメッセージングサービスです。GCPのアプリケーション統合の中心に位置し、AWSでは<Term>SNS</Term>と<Term>SQS</Term>の組み合わせに近い役割を担うことが多いです。
        </Lead>
      </Hero>

      <Heading num="01">トピックとサブスクリプション</Heading>
      <p>発行側は<Term>トピック</Term>にメッセージを送り、受信側は<Term>サブスクリプション</Term>を通じてメッセージを受け取ります。1つのトピックに複数のサブスクリプションを張れば、同じメッセージが複数の処理系へ<Term>ファンアウト</Term>されます。各サブスクリプションは独立してメッセージを保持するため、1つの受信側が遅れても他の受信側には影響しません。</p>

      <Heading num="02">PullとPush</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>動き方</th><th>向いている受信側</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Pull</td><td>受信側がメッセージを取りに行く</td><td><Link href="/cloud/gcp/compute/cloud-functions">Cloud Functions</Link>・自前ワーカー</td></tr>
          <tr><td className="hl">Push</td><td>Pub/SubがHTTPエンドポイントへPOSTする</td><td><Term>Cloud Run</Term>・外部Webhook</td></tr>
        </tbody>
      </table>

      <Heading num="03">少なくとも1回の配信と冪等性</Heading>
      <p>Pub/Subは<Term>少なくとも1回(at-least-once)</Term>の配信を保証します。ネットワーク障害などで同じメッセージが2回届く可能性があるため、受信側の処理は<Term>冪等</Term>(同じメッセージを2回処理しても結果がおかしくならない)に設計する必要があります。</p>

      <Heading num="04">Dead Letterと再試行</Heading>
      <p>処理に何度も失敗したメッセージは<Term>Dead Letter Topic</Term>へ退避させ、本流の詰まりを防ぎます。サブスクリプションごとに再試行ポリシー(バックオフ間隔・最大試行回数)を設定できます。</p>

      <Analogy label="💡 たとえるなら">
        Pub/Subは「放送局(トピック)と、各家庭の録画機(サブスクリプション)」です。同じ番組(メッセージ)が複数の録画機に同時配信され、1台の録画機が故障しても他の家庭には届き続けます。
      </Analogy>

      <Heading num="まとめ">Pub/Subを使いこなす3つの観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>トピックとサブスクリプションで疎結合</h4><p>発行側は受信側の数を知らなくてよい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Pull/Pushで受信側に合わせる</h4><p>FunctionsはPull、Cloud RunはPushが定番。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>冪等性とDead Letterを設計に含める</h4><p>at-least-once配信を前提に、失敗メッセージの逃がし口を用意する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/integration" tag="Google Cloud">アプリケーション統合</RelatedLink>
                    <RelatedLink href="/cloud/gcp/compute/cloud-functions" tag="Google Cloud">Cloud Functions</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sns" tag="AWS">SNS</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
