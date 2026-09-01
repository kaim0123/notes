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

export const metadata: Metadata = { title: "EventBridge" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>EventBridge ― つなぎ方を、コードの外に出す</h1>
        <Lead>
          <Link href="/infra/aws-sns">通知</Link>は「購読している全員に配る」仕組みでした。<Term>イベントバス</Term>はもう一段進んで、<strong>届いた出来事の中身を見てから宛先を決めます</strong>。つまり「どの出来事が、どの処理を起こすか」という対応関係が、コードではなく<Term>条件の設定</Term>として外に出ます。増やすときも変えるときも、既存のコードを触らずに済むのが最大の値打ちです。
        </Lead>
      </Hero>

      <Heading num="01">中身を見て振り分ける</Heading>

      <DiagramFrame
        slug="infra-aws-eventbridge-rules"
        aspect="760 / 280"
        caption="届いた出来事の内容を見て宛先を決める仕組み。さまざまな種類の出来事がバスへ流れ込み、あらかじめ書いておいた条件と照らし合わせて、合ったものだけがその条件に紐づく宛先へ渡される。1つの条件から複数の宛先へ同時に渡すこともでき、どの条件にも合わない出来事はどこへも行かない。送る側は宛先を一切知らないため、つなぎ方の変更が設定の書き換えだけで済む。"
      />

      <p>
        条件はメッセージの中身に対して書きます ― 種類が注文の確定であること、金額が一定以上であること、特定の状態への変化であること。<strong>受け手を増やすのは条件を1つ足すこと</strong>で、送る側にも既存の受け手にも影響しません。
      </p>

      <Heading num="02">3つの入力</Heading>
      <table>
        <thead>
          <tr><th>入力</th><th>中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自分のアプリが発行する出来事</td><td>業務上の出来事。形は自分で決める</td></tr>
          <tr><td className="hl">クラウド側で起きた出来事</td><td>インスタンスの状態変化、保存先へのファイル追加など。何もしなくても流れてくる</td></tr>
          <tr><td className="hl">時刻による起動</td><td>毎朝9時、5分ごと。定期実行をここで一元管理できる</td></tr>
        </tbody>
      </table>
      <p>
        2つ目が特徴的です。<strong>基盤側で起きたことに、自分の処理を後付けで反応させられます</strong> ― 「ファイルが置かれたら変換する」「インスタンスが停止したら通知する」。監視して検知するのではなく、出来事として受け取る形になります。
      </p>
      <p>
        3つ目は地味ですが実務で効きます。サーバー内の定期実行の設定は、そのサーバーが消えれば一緒に消え、どこで何が動いているのか分からなくなりがちです。<strong>定期実行を1か所に集める</strong>だけで、棚卸しができるようになります。
      </p>

      <Heading num="03">通知との使い分け</Heading>
      <table>
        <thead>
          <tr><th></th><th>通知</th><th>イベントバス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">宛先の決まり方</td><td>購読している全員へ</td><td>条件に合った宛先だけへ</td></tr>
          <tr><td className="hl">条件の書き方</td><td>属性に対して簡単な条件</td><td>中身の構造に対して細かく書ける</td></tr>
          <tr><td className="hl">速さと量</td><td>大量・低遅延に強い</td><td>やや遅い。振り分けの分の処理が入る</td></tr>
          <tr><td className="hl">向く場面</td><td>同じ内容を大量に一斉配信</td><td>種類の違う出来事を、種類ごとに配る</td></tr>
        </tbody>
      </table>
      <p>
        単純な使い分けは、<strong>1種類の出来事を多数へ配るなら通知、多種類の出来事を振り分けるならイベントバス</strong>です。迷ったらイベントバスから始めて、量と遅延が問題になったときに通知へ寄せる、という順序でも実害は出にくいでしょう。
      </p>

      <Aside label="設定が仕様になるということ">
        つなぎ方を外に出すと、<strong>コードを読んでも全体の流れが分からなくなります</strong>。どの出来事がどの処理を呼ぶのかは条件の一覧を見るしかないので、その一覧を<Link href="/infra/aws-iac">構成のコード</Link>として管理し、レビューの対象に含めます。設定は仕様の一部です。
      </Aside>

      <Heading num="まとめ">対応関係を外に出す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中身で振り分ける</h4>
          <p>受け手を増やすのは条件を足すこと。送る側も既存の受け手も変わらない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>基盤の出来事も受けられる</h4>
          <p>監視して検知するのではなく、起きたことを受け取る形にできる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>設定を管理下に置く</h4>
          <p>流れがコードから消えるぶん、条件の一覧をコードとして管理し、レビューする。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-eventbridge" />
    </DocsPage>
  );
}
