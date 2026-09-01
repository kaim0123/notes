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

export const metadata: Metadata = { title: "モニタリングと管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>モニタリングと管理 ― 今の状態と、過去の操作</h1>
        <Lead>
          <Link href="/infra/monitoring">監視と障害対応</Link>で扱った考え方が、クラウドではそのまま2つのサービス群になっています。片方は<Term>今どうなっているか</Term>を測る仕組み、もう片方は<Term>誰が何をしたか</Term>を残す仕組みです。前者は障害に気づくため、後者は監査と原因究明のためにあり、目的も保存の期間も違います。そして障害調査では、この2つを<strong>時刻で突き合わせる</strong>のが最も速い方法になります。
        </Lead>
      </Hero>

      <Heading num="01">2種類の記録</Heading>

      <DiagramFrame
        slug="infra-aws-monitoring-two"
        aspect="700 / 280"
        caption="監視が2種類の別々の記録から成り立っていることを示した図。片方は今の状態を表す数値とログで、どれだけ使われているか、遅くなっていないか、エラーが出ていないかを答える。もう片方は誰がいつどの操作を行ったかという記録で、設定が変わった経緯や意図しない権限の使われ方を後から追うために使う。前者は障害に気づくため、後者は監査と原因究明のためにあり、調査では両者を時刻で突き合わせる。"
      />

      <p>
        設定変更に起因する障害は、意外に多いものです。「何も変えていないのに壊れた」と言われた場面で操作の記録を見ると、別のチームが数分前に権限や設定を触っていた ― という筋道はよくあります。<strong>状態の変化と操作の記録を並べて見る</strong>だけで、切り分けの時間が桁で変わります。
      </p>

      <Heading num="02">状態を測る側</Heading>
      <p>
        数値・ログ・警報を扱う仕組みが<Link href="/infra/aws-cloudwatch">CloudWatch</Link>です。ほとんどのサービスが何も設定しなくても基本的な数値を出しており、アプリ固有の数値は自分で送ります。<Link href="/infra/monitoring-app">アプリ監視</Link>で見たとおり、業務の意味を持つ数値は自分で出さない限り誰も出してくれません。
      </p>

      <Heading num="03">操作を残す側</Heading>
      <p>
        誰がいつどの操作をしたかは、既定で記録されています。ここで押さえておく点は3つです。
      </p>
      <ul>
        <li><strong>保存期間</strong> ― 既定で見られる範囲は限られるので、長く残したいなら保存先を明示的に設定します。</li>
        <li><strong>改ざんへの備え</strong> ― 記録を消せる権限を持つ人が、自分の痕跡を消せてしまっては意味がありません。<strong>別のアカウントの保存先へ書き出す</strong>のが定石です。</li>
        <li><strong>読む前提を作る</strong> ― 大量の記録は、検索できる形にしておかないと使えません。調査のときに初めて整えるのでは遅すぎます。</li>
      </ul>

      <Aside label="記録は「事故の後」にしか価値が出ない">
        操作の記録は、平常時にはまったく役に立たないコストです。それでも要るのは、<strong>事故の後に、遡って取得することができない</strong>からです。取っていなかった期間の記録は永久に手に入りません。<Link href="/security/logging">ログ出力設計</Link>と同じで、必要になる前に決めておくしかない種類の備えです。
      </Aside>

      <Heading num="04">設定そのものを見張る</Heading>
      <p>
        「今の状態」には、性能だけでなく<strong>構成が方針どおりか</strong>も含まれます。公開範囲が開いていないか、暗号化が有効か、必要なタグが付いているか ― こうした点検を自動で回し、外れたものを検出する仕組みがあります。
      </p>
      <p>
        人が定期的に確認する運用は必ず形骸化するので、<strong>点検も機械にやらせる</strong>のが原則です。さらに一歩進めて、外れた設定を自動で戻すこともできますが、その前に<Link href="/infra/aws-iac">構成をコードで書く</Link>ようにするほうが根本的です ― 手で変えられない状態にすれば、外れること自体が減ります。
      </p>

      <Heading num="まとめ">両輪で持つ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>気づくためと、追うため</h4>
          <p>状態の記録と操作の記録は目的が別。障害調査では時刻で突き合わせる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>記録は消せない場所へ</h4>
          <p>消せる権限を持つ人が痕跡を消せる構成では、記録の意味が半減する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>点検も自動で</h4>
          <p>設定が方針どおりかを機械が見る。根本的には、手で変えられない形にする。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-monitoring" />
    </DocsPage>
  );
}
