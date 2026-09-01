import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "SNS" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>SNS ― 1回の発行で、複数へ広げる</h1>
        <Lead>
          注文が確定したとき、在庫を減らし、メールを送り、集計に足す。<strong>発行する側がこの3つを順に呼ぶ</strong>作りにすると、処理が増えるたびに発行側のコードが変わり、どれか1つの失敗が全体を巻き込みます。<Term>話題</Term>に対して1回発行し、購読している側がそれぞれ反応する形にすれば、この結びつきが切れます。発行側は<strong>誰が受け取るかを知りません</strong>。
        </Lead>
      </Hero>

      <Heading num="01">発行と購読</Heading>
      <p>
        発行側は話題に対してメッセージを1回送るだけです。購読している宛先へは、同じ内容が<strong>それぞれに複製されて</strong>届きます。宛先はキュー、関数、HTTPの受け口、メールなど複数の種類を選べます。
      </p>
      <p>
        後から受け手を足すときも、<strong>購読を1つ増やすだけ</strong>で発行側は変わりません。これが<Link href="/design/architecture-event-driven">イベント駆動</Link>で言う結合の弱さで、機能追加のたびに既存のコードを触らずに済むことが、そのまま変更の安全性になります。
      </p>

      <Heading num="02">キューと組み合わせる</Heading>

      <DiagramFrame
        slug="infra-aws-sns-fanout"
        aspect="760 / 300"
        caption="1つの出来事を複数の処理へ広げる組み合わせ。発行された内容は購読しているすべての宛先へ配られ、それぞれの宛先をキューにしておくと受け手は自分の速さで取りに行けるうえ、失敗しても再配達される。通知を直接受け手へ送る形では受け手が落ちている間の分は失われるが、キューを挟めばその間も溜まる。後から受け手を足すときも、発行する側は何も変えなくてよい。"
      />

      <p>
        通知だけでは<strong>その瞬間に受け取れなければ失われます</strong>(再試行はありますが限度があります)。宛先をキューにしておけば、受け手が落ちている間も溜まり、復旧後に処理されます。<strong>広げるのは通知、取りこぼさないのはキュー</strong>という役割分担で、この2つを重ねるのが実用上の定番構成です。
      </p>

      <Heading num="03">必要なものだけ受け取る</Heading>
      <p>
        購読ごとに条件を付けると、<strong>合致するメッセージだけが届きます</strong>。たとえば「金額が一定以上の注文だけ」「特定の地域の出来事だけ」。受け手の側で受け取ってから捨てる作りにすると、その分の実行と料金が無駄になるので、<strong>手前で絞る</strong>ほうが素直です。
      </p>

      <Aside label="通知の宛先としての人">
        機械同士のつなぎ方だけでなく、人へ知らせる経路としても使えます ― <Link href="/infra/aws-cloudwatch">警報</Link>の通知先がその典型です。ただし<Link href="/infra/monitoring">アラートの設計</Link>で見たとおり、鳴らしすぎれば読まれなくなります。宛先を用意できることと、鳴らしてよいことは別です。
      </Aside>

      <Heading num="まとめ">知らないままつなぐ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>発行は1回、受け手は自由</h4>
          <p>発行側は宛先を知らない。後から足しても既存のコードは変わらない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>宛先をキューにする</h4>
          <p>広げつつ取りこぼさない。受け手が落ちている間も溜められる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>絞るのは手前で</h4>
          <p>受け取ってから捨てる作りは、実行も料金も無駄になる。購読側の条件で絞る。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-sns" />
    </DocsPage>
  );
}
