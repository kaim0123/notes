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
  Mark,
  MarkNote,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ネットワーキングとコンテンツ配信",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS</Eyebrow>
        <h1>ネットワーキングとコンテンツ配信 ― クラウド上に自分の建物を建てる</h1>
        <Lead>
          <Term>VPC</Term>は、AWSの巨大な共有インフラの中に、自分たちだけの閉じたネットワークを区切って持つための土台です。この土台の上に、住所を割り当てる<Term>Route 53</Term>と、世界中に配達拠点を置く<Term>CloudFront</Term>を組み合わせることで、初めて外部の利用者に安全かつ高速にサービスを届けられます。
        </Lead>
      </Hero>

      <Heading num="01">VPC ― 自分専用の仮想ネットワーク</Heading>
      <p><Term>VPC(Virtual Private Cloud)</Term>は、AWS上に自分専用の論理的に隔離されたネットワーク区画を作る仕組みです。<Link href="/network/ip">IPアドレスと経路</Link>ページで見たIPアドレスの範囲(CIDR)を自分で決め、その中を<Term>サブネット</Term>という単位でさらに区切って使います。</p>

      <table>
        <thead>
          <tr><th>構成要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パブリックサブネット</td><td>インターネットゲートウェイ経由で外部と直接通信できる区画。Webサーバーなど。</td></tr>
          <tr><td className="hl">プライベートサブネット</td><td>外部から直接到達できない区画。データベースなど、外部に晒したくないもの。</td></tr>
          <tr><td className="hl">ルートテーブル</td><td>サブネットごとに「この宛先へはどこを経由するか」を決める経路表。</td></tr>
          <tr><td className="hl">セキュリティグループ</td><td>インスタンス単位で通信の許可・拒否を細かく制御するファイアウォール。</td></tr>
        </tbody>
      </table>

      <Heading num="02">Route 53 ― 住所(ドメイン)を管理する</Heading>
      <p><Term>Route 53</Term>はAWSのDNS(<Link href="/network/applications/dns">DNS</Link>ページ参照)サービスです。ドメイン名をIPアドレスへ変換するだけでなく、「最も近いリージョンへ振り分ける」「障害が起きたサーバーへは向けない」といった高度なルーティングポリシーを設定できます。ルーティングポリシーやヘルスチェックの詳細は<Link href="/cloud/aws/network/route53">Route 53のページ</Link>で扱います。</p>

      <Heading num="03">CloudFront ― 世界中に配達拠点を置く</Heading>
      <p><Term>CloudFront</Term>はAWSの<Term>CDN(Content Delivery Network)</Term>です。オリジンサーバー(S3やEC2)の内容を世界中の<Term>エッジロケーション</Term>にキャッシュし、利用者から地理的に最も近い拠点から配信することで、表示速度を上げつつオリジンサーバーへの負荷を減らします。この考え方は<Link href="/dev/cache">キャッシュの全体像</Link>ページで見た「近くに複製を置く」戦略のネットワーク版です。オリジンの保護や署名付きURLの詳細は<Link href="/cloud/aws/network/cloudfront">CloudFrontのページ</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        VPCは「自分たちで塀を建てた敷地」に似ています。塀の中をさらに「表の店舗(パブリックサブネット)」と「奥の倉庫(プライベートサブネット)」に分け、倉庫には裏口からしか入れないようにします。Route 53は「案内所の住所録」で、訪ねてきた人を適切な建物へ誘導します。CloudFrontは「全国にあるコンビニの受け取りロッカー」で、本店(オリジン)まで行かなくても、近所のロッカーで荷物(コンテンツ)を受け取れるようにする仕組みです。
      </Analogy>

      <Heading num="04">その他のネットワーキングサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>ELB(Elastic Load Balancing)</h4>
          <p>複数のEC2インスタンスやコンテナへ通信を振り分ける負荷分散装置。1台に負荷が集中するのを防ぐ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Direct Connect / VPN</h4>
          <p>社内ネットワークとVPCを、専用線(Direct Connect)またはインターネット越しの暗号化トンネル(VPN)で接続する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4><Link href="/cloud/aws/network/acm">ACM(AWS Certificate Manager)</Link></h4>
          <p>CloudFrontやELBで使うSSL/TLS証明書を無料で発行し、期限切れ前に自動更新する。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ VPCとVPCを直接つなぐ「VPC Peering」や、多数のVPCを1か所にまとめる「Transit Gateway」もある(大規模組織向け)。</MarkNote>

      <Heading num="まとめ">「区画」「住所」「配達拠点」の3層</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>VPCが土台の区画を作る</h4><p>パブリック・プライベートにサブネットを分け、どこを外部に晒すかを設計する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Route 53が入口の住所を管理する</h4><p>ドメイン名を適切な宛先へ振り分けるDNSサービス。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CloudFrontが配達を高速化する</h4><p>世界中のエッジロケーションにキャッシュを置き、オリジンへの負荷と待ち時間を減らす。</p></Card>
      </CardGrid>
      <p>この土台の上に何を置くかを決めたら、次は「誰が」「何に」アクセスできるかを決める番です。次のページでは「<Link href="/cloud/aws/security">セキュリティ、アイデンティティ、コンプライアンス</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/security" tag="AWS">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/network/ip" tag="ネットワーク">IPアドレスと経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
