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
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>ネットワーキングとコンテンツ配信 ― クラウド上に自分の建物を建てる</h1>
        <Lead>
          <Term>VPC</Term>は、GCPの共有インフラの中に、自分たちだけの閉じたネットワークを区切って持つための土台です。この土台の上に、住所を割り当てる<Term>Cloud DNS</Term>と、世界中に配達拠点を置く<Term>Cloud CDN</Term>を組み合わせることで、外部の利用者に安全かつ高速にサービスを届けられます。
        </Lead>
      </Hero>

      <Heading num="01">VPC ― 自分専用の仮想ネットワーク</Heading>
      <p><Term>VPC(Virtual Private Cloud)</Term>は、GCP上に自分専用の論理的に隔離されたネットワーク区画を作る仕組みで、AWSのVPCと同じ概念です。<Link href="/network/ip">IPアドレスと経路</Link>ページで見たCIDRを自分で決め、その中を<Term>サブネット</Term>という単位でさらに区切って使います。GCPのVPCは<Term>リージョン単位</Term>で作成され、サブネットは<Term>ゾーン</Term>に紐づきます。</p>

      <table>
        <thead>
          <tr><th>構成要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パブリックサブネット</td><td>外部IPまたはCloud NAT経由でインターネットと通信できる区画。</td></tr>
          <tr><td className="hl">プライベートサブネット</td><td>外部から直接到達できない区画。データベースなど。</td></tr>
          <tr><td className="hl">ファイアウォールルール</td><td>VPC内の通信の許可・拒否を制御。AWSのセキュリティグループに近い。</td></tr>
          <tr><td className="hl">Cloud NAT</td><td>プライベートサブネット内のVMがインターネットへ出るための出口。</td></tr>
        </tbody>
      </table>

      <Heading num="02">Cloud DNS ― 住所(ドメイン)を管理する</Heading>
      <p><Term>Cloud DNS</Term>はGCPの<Term>DNS</Term>(<Link href="/network/applications/dns">DNS</Link>ページ参照)サービスで、AWSの<Term>Route 53</Term>に相当します。ドメイン名をIPアドレスへ変換するほか、プライベートゾーンでVPC内専用の名前解決も行えます。詳細は<Link href="/cloud/gcp/network/cloud-dns">Cloud DNSのページ</Link>で扱います。</p>

      <Heading num="03">Cloud CDN ― 世界中に配達拠点を置く</Heading>
      <p><Term>Cloud CDN</Term>はGoogleの<Term>CDN(Content Delivery Network)</Term>で、AWSの<Term>CloudFront</Term>に相当します。<Link href="/cloud/gcp/storage/cloud-storage">Cloud Storage</Link>や<Term>Cloud Run</Term>・<Term>Compute Engine</Term>上のオリジンから、Googleのグローバルエッジネットワーク経由でコンテンツを配信し、表示速度を上げつつオリジンへの負荷を減らします。詳細は<Link href="/cloud/gcp/network/cloud-cdn">Cloud CDNのページ</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        VPCは「自分たちで塀を建てた敷地」、Cloud DNSは「案内所の住所録」、Cloud CDNは「全国にあるコンビニの受け取りロッカー」です。この3層の比喩は<Link href="/cloud/aws/network">AWSのネットワーキング</Link>ページと同じ考え方です。
      </Analogy>

      <Heading num="04">その他のネットワーキングサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud Load Balancing</h4>
          <p>HTTP(S)・TCP・UDPの負荷分散。グローバルLBとリージョンLBがあり、Cloud CDNと組み合わせて使う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud VPN / Interconnect</h4>
          <p>社内ネットワークとVPCを、VPNトンネルまたは専用線(Interconnect)で接続する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4><Link href="/cloud/gcp/network/certificate-manager">Certificate Manager</Link></h4>
          <p>Cloud Load BalancingやCloud CDNで使うSSL/TLS証明書を発行・自動更新する。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Shared VPCで、1つのVPCを複数プロジェクトから共有する構成もある(大規模組織向け)。</MarkNote>

      <Heading num="まとめ">「区画」「住所」「配達拠点」の3層</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>VPCが土台の区画を作る</h4><p>パブリック・プライベートにサブネットを分け、どこを外部に晒すかを設計する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud DNSが入口の住所を管理する</h4><p>ドメイン名を適切な宛先へ振り分けるDNSサービス。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud CDNが配達を高速化する</h4><p>Googleのエッジネットワークにキャッシュを置き、待ち時間とオリジン負荷を減らす。</p></Card>
      </CardGrid>
      <p>次のページでは「<Link href="/cloud/gcp/security">セキュリティ、アイデンティティ、コンプライアンス</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/security" tag="Google Cloud">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/gcp/compute" tag="Google Cloud">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキング(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
