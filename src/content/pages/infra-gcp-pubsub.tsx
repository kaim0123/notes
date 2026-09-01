import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Pub/Sub" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Pub/Sub ― 配るのと溜めるのを、1つで担う</h1>
        <Lead>
          <Link href="/infra/aws-integration">AWS</Link>ではキューと通知が別のサービスでしたが、ここでは1つの仕組みが両方を担います。話題に対して発行し、購読ごとに配る ― そして<strong>購読はメッセージを溜めます</strong>。つまり<Term>広げること</Term>と<Term>取りこぼさないこと</Term>が最初から同居しており、宛先ごとにキューを置く構成を自分で組む必要がありません。
        </Lead>
      </Hero>

      <Heading num="01">発行と購読、そして溜まる場所</Heading>
      <p>
        発行側は話題へ1回送るだけです。購読が複数あれば、それぞれに<strong>独立してメッセージが溜まります</strong>。片方の受け手が落ちていても、その購読に溜まり続けるので、復旧後に処理されます ― これが<Link href="/infra/aws-sns">通知とキューを重ねる構成</Link>を、1つの仕組みで実現している形です。
      </p>

      <Heading num="02">受け取り方を選ぶ</Heading>

      <DiagramFrame
        slug="infra-gcp-pubsub-delivery"
        aspect="760 / 280"
        caption="メッセージの受け取り方を2種類に分けた図。プル型では受け手が自分から取りに行き、処理を終えたと伝えて初めて取り除かれるため、受け手の速さで流量が決まり押し潰されない。プッシュ型では指定した受け口へ送りつけられ、成功の応答を返すと取り除かれる。受け口を用意するだけで手軽だが、送る速さは相手の都合を見てくれるとは限らない。処理が重いならプル、軽くて即座に返せるならプッシュが向く。"
      />

      <p>
        選ぶ基準は<strong>誰が流量を決めるか</strong>です。処理が重い、あるいは下流に上限がある(<Link href="/backend/data-pool">データベースの接続数</Link>など)場合はプル型にして、受け手の速さで流量を決めます。軽い処理で即座に応答を返せるならプッシュ型のほうが構成は簡単です。
      </p>

      <Heading num="03">重複と順序</Heading>
      <p>
        保証は<strong>少なくとも一度は届く</strong>です。同じメッセージが二度来ることがあるので、処理は<Link href="/backend/jobs">二度実行しても結果が変わらない</Link>形にします。順序が必要な場合は、順序を保つ単位を指定できますが、<strong>その単位の中では並列に処理できなくなる</strong>ため、必要な範囲だけ狭く指定します。
      </p>

      <Aside label="処理できないものを逃がす">
        <Link href="/infra/aws-sqs">SQS</Link>と同じく、何度試しても処理できないメッセージは退避先へ送ります。そして<strong>退避先の件数を監視して、増えたら鳴らす</strong>。ここが増えるということは、処理できない何かが起き続けているということなので、優先度の高い異常として扱えます。
      </Aside>

      <Heading num="まとめ">1つで両方を担う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>購読ごとに溜まる</h4><p>広げることと取りこぼさないことが同居する。自分で重ねる必要がない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>流量を誰が決めるか</h4><p>処理が重いならプル、軽ければプッシュ。下流の上限から逆算する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>二度来る前提で書く</h4><p>順序を保つ単位は狭く。広く取ると並列に処理できなくなる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-pubsub" />
    </DocsPage>
  );
}
