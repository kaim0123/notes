import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンテナ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンテナ ― クラスタの面倒を、どこまで見るか</h1>
        <Lead>
          Google Cloudでのコンテナ運用は、<Link href="/infra/kubernetes">Kubernetes</Link>が中心にあります(そもそもKubernetesはここで生まれた仕組みの流れを汲んでいます)。選択は<Link href="/infra/aws-container">AWS</Link>と同じ構図 ― <Term>クラスタの面倒を自分で見るか、任せるか</Term>。加えて、そもそもKubernetesを使わずに<Link href="/infra/gcp-compute">コンテナを置くだけの形</Link>で足りないか、という手前の問いがあります。
        </Lead>
      </Hero>

      <Heading num="01">2つの運用方式</Heading>

      <DiagramFrame
        slug="infra-gcp-container-modes"
        aspect="700 / 280"
        caption="マネージドなKubernetesの2つの運用方式。サーバー群を自分で持つ方式は台数や種類、詰め込み方まで決められる代わりに更新も空き容量の管理も自分の仕事になる。サーバー群ごと任せる方式は要求した資源の分だけを払い、更新や台数の調整は肩代わりされる。どちらでも書くマニフェストはほぼ同じで、変わるのはクラスタを誰が面倒見るかだけ。"
      />

      <p>
        判断は稼働率で決まります。<strong>常に多くのコンテナが動いていて詰め込める</strong>なら自分で持つほうが安く、<strong>変動が大きく台数も多くない</strong>なら任せるほうが総額で安くなります。人件費まで含めれば、小さな組織では後者が有利になりやすいでしょう。
      </p>

      <Heading num="02">そもそもKubernetesが要るか</Heading>
      <p>
        Kubernetesの値打ちは<Link href="/infra/kubernetes">宣言と調整</Link>にありますが、その語彙と運用を持つ費用も現実にあります。サービスが数個で、入れ替えの頻度も高くないなら、<strong>コンテナを置くだけの実行基盤で足ります</strong>。
      </p>
      <p>
        必要になる合図は分かりやすく、次のどれかが出てきたときです ― サービス間の細かい通信制御が要る、独自の運用ルールを自動化したい、複数の事業者にまたがって同じ定義で動かしたい。<strong>合図が出るまでは、軽いほうを選ぶ</strong>のが総手間を最小にします。
      </p>

      <Aside label="イメージの置き場所も設計に入れる">
        コンテナを使う以上、イメージの保管庫が必要です。ここでも<Link href="/infra/aws-container">同じ3点</Link>が効きます ― タグを一意にする、脆弱性を検査する、古い世代を消す。とくに最後は、忘れると保存料として静かに積み上がります。
      </Aside>

      <Heading num="まとめ">軽いほうから始める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>クラスタを持つかどうか</h4><p>詰め込めるなら自前、変動が大きいなら任せる。人の時間も勘定に入れる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>要る合図を待つ</h4><p>細かい通信制御、独自の自動化、他事業者との併用。出るまでは軽い形で足りる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>保管庫の運用も設計</h4><p>一意なタグ、検査、世代の削除。イメージは放っておくと溜まる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-container" />
    </DocsPage>
  );
}
