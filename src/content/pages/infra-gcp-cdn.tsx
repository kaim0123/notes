import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud CDN" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud CDN ― 入口と一体になった配信</h1>
        <Lead>
          配信網の役割は<Link href="/infra/aws-cloudfront">CloudFront</Link>と同じ ― 最寄りから返し、オリジンに届く量を減らします。構成上の違いは、<Term>負荷分散の入口に統合されている</Term>ことです。別の製品を前に置くのではなく、既存の入口で配信を有効にする形なので、設定箇所が減り、<strong>どこで何が起きているかを追いやすくなります</strong>。
        </Lead>
      </Hero>

      <Heading num="01">入口に組み込む</Heading>

      <DiagramFrame
        slug="infra-gcp-cdn-position"
        aspect="700 / 280"
        caption="配信網が負荷分散の仕組みと一体になっている構成。要求はまず最寄りの拠点に着き、キャッシュがあればその場で返る。無ければ内側の負荷分散へ渡り、背後のサービスで応答が作られ、その応答が拠点にも蓄えられる。配信の層と振り分けの層が同じ入口にあるため、キャッシュの条件も振り分けの条件も1か所で設定でき、どこで何が起きているかを追いやすい。"
      />

      <Heading num="02">何を同じものと見なすか</Heading>
      <p>
        設定の中心は<Link href="/infra/aws-cloudfront">共通</Link>で、<strong>キャッシュを同じものと見なす条件</strong>です。応答が変わる要素だけを条件に含め、それ以外は含めない。利用者ごとに変わる要素を入れると当たらなくなり、応答が変わる要素を外すと他人の内容が配られます。
      </p>
      <p>
        あわせて、<strong>キャッシュしてはいけない応答</strong>をアプリ側から明示します。ログイン後の画面のような個別の内容は、応答側で共有のキャッシュを禁じます(<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>)。配信側の設定だけに頼らないのが安全です。
      </p>

      <Heading num="03">更新の届け方</Heading>
      <p>
        内容を差し替えたときに古いものが配られ続ける問題への対処も同じです。日常は<strong>ファイル名を変える</strong>(内容が変われば名前も変わる)、緊急時だけ明示的な破棄を使う。<Link href="/dev/tooling-build">ビルド</Link>がハッシュ付きの名前を出力する構成にしておけば、この問題はほぼ起きません。
      </p>

      <Aside label="配信網は費用対策でもある">
        オリジンから外へ出るデータには転送料がかかります。配信網で返せた分はオリジンから出ていかないので、<strong>速さだけでなく費用にも効きます</strong>。画像や動画の比率が高いサービスほど差が大きくなります(<Link href="/infra/ops">コスト管理</Link>)。
      </Aside>

      <Heading num="まとめ">1か所で設定できる利点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>入口と一体</h4><p>配信と振り分けが同じ場所。設定箇所が減り、追いやすくなる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>条件は応答が変わる要素だけ</h4><p>多すぎれば当たらず、少なすぎれば他人の内容が配られる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>更新は名前で届ける</h4><p>破棄は緊急手段。名前が変わる形にしておけば、待たされない。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-cdn" />
    </DocsPage>
  );
}
