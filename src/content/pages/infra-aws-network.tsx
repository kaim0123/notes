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
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "ネットワーキングとコンテンツ配信" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>ネットワーキングとコンテンツ配信 ― 区画・住所・配達拠点</h1>
        <Lead>
          この分野は3つの層に分かれます。自分専用の区画を作る<Term>VPC</Term>、その区画に住所を与える<Term>DNS</Term>、そして利用者の近くまで運ぶ<Term>配信網</Term>。<Link href="/network">ネットワーク</Link>で学んだ概念がそのまま道具になっているので、新しく覚えることは多くありません。ただし1点だけクラウド特有の勘所があります ― <strong>既定では何も通らない</strong>。開けた穴だけが通り道になり、つながらないときの原因はほぼそこにあります。
        </Lead>
      </Hero>

      <Heading num="01">VPC ― 自分専用の区画を切る</Heading>
      <p>
        <Term>VPC</Term>は、クラウドの中に確保する自分専用のネットワークです。その中を<Term>サブネット</Term>という区画に分け、外から直接届いてよいものと、届いてはいけないものを分けて置きます。
      </p>

      <DiagramFrame
        slug="infra-aws-network-vpc"
        aspect="760 / 320"
        caption="クラウド上に用意する自分専用のネットワークの構造。公開側の区画には外から直接届いてよいもの、たとえばロードバランサだけを置き、非公開側の区画にはアプリやデータベースのように直接届いてはいけないものを置く。非公開側から外部への通信は変換の出口を経由して出るが、外から中への接続は開かない。区画は複数のゾーンにまたがって同じ構成を用意し、片方が落ちても続けられるようにする。"
      />

      <p>
        設計の芯は1つです ― <strong>外から直接届く範囲を最小にする</strong>。届かないものは攻撃されません。データベースを非公開側に置き、アプリ経由でしか触れないようにするのは、権限の設定より確実な防御です。この考え方は<Link href="/security/network-defense">ネットワーク層の防御</Link>そのもので、クラウドでは<strong>それを構成として書き下す</strong>ことになります。
      </p>

      <Heading num="02">通す通さないを決める2つの仕組み</Heading>

      <DiagramFrame
        slug="infra-aws-network-firewall"
        aspect="700 / 300"
        caption="通信を許可する2つの仕組みの違い。サーバーごとに付ける仕組みは許可の規則だけを書き、行きを許せば戻りは自動で通るため、戻りの書き忘れが起きない。区画の境界に置く仕組みは拒否も書けて広く効くが、行きと戻りを別々に評価するので両方向を書く必要がある。日常の許可は前者で細かく行い、区画全体に効かせたい遮断だけ後者で行う。どちらも既定は「許可していないものは通さない」。"
      />

      <p>
        実務での使い分けは単純です。<strong>普段の許可はサーバーごとの仕組みで書き、境界の仕組みは広い遮断だけに使う</strong>。両方に細かい規則を書くと、後から読む人がどちらで弾かれているのか追えなくなります。
      </p>

      <Aside label="つながらないときの見方">
        原因の大半は3つのどれかです ― 許可の規則が足りない、戻り方向を書いていない、経路(ルート)が無い。<Link href="/infra/incident">切り分け</Link>の順序としては、<strong>どこまで届いているか</strong>を先に確かめると早く絞れます。届いているのに拒否されているのか、そもそも届いていないのかで、見る場所が変わります。
      </Aside>

      <Heading num="03">住所を与える ― DNS</Heading>
      <p>
        区画とサーバーができても、名前がなければ誰も来られません。<Link href="/infra/aws-route53">Route 53</Link>が名前解決を担い、単に宛先を返すだけでなく、割合で振り分ける・近い拠点を返す・落ちたら待機系へ向けるといった判断もここで行えます。
      </p>

      <Heading num="04">近くまで運ぶ ― 配信網</Heading>
      <p>
        <Link href="/infra/aws-cloudfront">CloudFront</Link>は、世界中の拠点にコンテンツを置いて利用者の最寄りから返す仕組みです。速さのためだけでなく、<strong>オリジンに届く量を減らす</strong>ことが可用性と費用の両方に効きます。前段で受け止めるという発想は<Link href="/infra/cloudflare">Cloudflare</Link>と同じで、通信の暗号化に使う証明書は<Link href="/infra/aws-acm">ACM</Link>が発行と更新を引き受けます。
      </p>

      <Analogy label="💡 たとえるなら">
        VPCは<strong>敷地と塀</strong>、サブネットは<strong>建物の区画</strong>、DNSは<strong>住所</strong>、配信網は<strong>街角の受け取りロッカー</strong>です。塀を立てて門を1つだけ開け、住所を登録し、よく出る荷物は最寄りのロッカーに置いておく ― 物理の世界でやっていることと変わりません。
      </Analogy>

      <Heading num="まとめ">3層に分けて考える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>区画は「届く範囲」を決める</h4>
          <p>外から直接届くものを最小に。届かないものは攻撃されない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>既定は「通さない」</h4>
          <p>開けた穴だけが通り道。つながらない原因は、許可・戻り・経路のどれか。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>前段で受け止める</h4>
          <p>配信網は速さだけでなく、オリジンに届く量そのものを減らす仕組みでもある。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-network" />
    </DocsPage>
  );
}
