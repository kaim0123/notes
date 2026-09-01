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

export const metadata: Metadata = { title: "Route 53" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Route 53 ― 名前解決を、振り分けの道具にする</h1>
        <Lead>
          <Link href="/network/nat-dhcp-dns">DNS</Link>は名前をアドレスに変える仕組みでした。マネージドのDNSがそれに足しているのは、<strong>同じ名前に対して、状況に応じて違う答えを返す</strong>という機能です。割合で分ける、近いほうを返す、落ちていたら別の宛先を返す ― つまりDNSが、負荷分散と切り替えの道具になります。ただし1つだけ性質を押さえておく必要があります。<Term>答えは相手側にしばらく残る</Term>ということです。
        </Lead>
      </Hero>

      <Heading num="01">ホストゾーンとレコード</Heading>
      <p>
        管理の単位は<Term>ホストゾーン</Term>で、1つのドメインに対して1つ作り、その中にレコードを並べます。よく使うのは、名前をアドレスに対応づけるもの、別の名前へ転送するもの、そしてクラウド上のサービスを直接指せる特別なものの3つです。
      </p>
      <p>
        最後のものが実用上は重要です。通常、ドメインの頂点(<code>example.com</code> のように前に何も付かない形)は別名で転送する形式が使えないという制約がありますが、クラウド専用のレコード形式ならその位置からロードバランサや配信網を直接指せます。<strong>料金がかからず、宛先の変化にも自動で追随する</strong>ので、対象がクラウド内のサービスなら基本的にこちらを使います。
      </p>

      <Heading num="02">状況に応じて答えを変える</Heading>

      <DiagramFrame
        slug="infra-aws-route53-policies"
        aspect="760 / 300"
        caption="同じ名前への問い合わせに対し、どの宛先を返すかを決める4つの方針。単純な方針は常に同じ宛先を返す。重みづけは割合を決めて振り分けるので、新しい版へ少しずつ流す使い方ができる。遅延で選ぶ方針は問い合わせ元から見て速い拠点を返し、切り替えの方針は主系の健全性を監視して応答しなくなったときだけ待機系を返す。いずれも宛先は名前解決の段階で決まるため、切り替わりの速さは応答の保持時間に左右される。"
      />

      <p>
        重みづけは、<Link href="/dev/ci-deploy">段階的な切り替え</Link>の手段として使えます。新しい環境へ1割だけ流し、問題がなければ比率を上げる ― ロードバランサでの振り分けより粗い代わりに、<strong>環境ごと切り替えられる</strong>のが強みです。
      </p>

      <Heading num="03">健全性の確認と自動切り替え</Heading>
      <p>
        指定した宛先へ定期的にアクセスし、応答するかを確かめる仕組みを組み合わせると、<strong>落ちた宛先を答えから外す</strong>ことができます。これは<Link href="/infra/monitoring-server">外形監視</Link>と同じことをして、その結果を名前解決に反映しているだけです。
      </p>

      <Aside label="切り替えは、思ったより速くない">
        DNSの答えは、問い合わせた側やその途中の経路にしばらく保持されます。保持時間を長く設定していると、宛先を変えてもしばらく古い答えが使われ続けます。<strong>切り替えに使うつもりの名前は、保持時間を短くしておく</strong>のが定石です ― ただし短くするほど問い合わせは増えます。何を短くするかは、切り替える必要があるものだけに絞ります。
      </Aside>

      <Heading num="04">ドメインの管理そのもの</Heading>
      <p>
        名前解決とは別に、ドメインの取得と更新も扱えます。ここでの実務上の要点は<strong>期限管理</strong>です。ドメインの失効は証明書の期限切れと並んで「必ず起きると分かっている障害」なので、自動更新を有効にし、支払い方法が生きていることまで含めて確認しておきます。
      </p>

      <Heading num="まとめ">DNSは、静的な対応表ではない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>答えを状況で変えられる</h4>
          <p>割合・距離・健全性。名前解決の層が、そのまま振り分けの層になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>クラウド内の宛先は専用の形式で</h4>
          <p>ドメインの頂点から直接指せて、宛先の変化にも自動で追随する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>保持時間が切り替えの速さ</h4>
          <p>変えても、すぐには変わらない。切り替える予定の名前だけ短くしておく。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-route53" />
    </DocsPage>
  );
}
