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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Cloud DNS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>Cloud DNS ― ドメイン名を適切な宛先へ導く</h1>
        <Lead>
          <Term>Cloud DNS</Term>は、ドメイン名をIPアドレスへ変換するGCPの<Term>DNS</Term>サービスで、AWSの<Term>Route 53</Term>に相当します。<Link href="/network/applications/dns">DNS</Link>ページで見た名前解決の仕組みを、GCP上で運用するためのマネージドサービスです。
        </Lead>
      </Hero>

      <Heading num="01">パブリックゾーンとプライベートゾーン</Heading>
      <p><Term>パブリックゾーン</Term>は、インターネット上の利用者向けにドメイン(<code>example.com</code>)のレコードを公開します。<Term>プライベートゾーン</Term>は、特定の<Term>VPC</Term>内だけで有効な名前解決(<code>db.internal</code>など)を提供し、外部には公開されません。本番DBのエンドポイントをプライベートゾーンで管理するのが一般的なパターンです。</p>

      <Heading num="02">レコードタイプ</Heading>
      <table>
        <thead>
          <tr><th>タイプ</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">A / AAAA</td><td>ドメイン名をIPv4/IPv6アドレスへ変換する。</td></tr>
          <tr><td className="hl">CNAME</td><td>別のドメイン名へエイリアスする。Cloud CDNやCloud RunのURLへ向けるときに使う。</td></tr>
          <tr><td className="hl">MX</td><td>メールサーバーの宛先を指定する。</td></tr>
          <tr><td className="hl">TXT</td><td>ドメイン所有確認(SPF・DKIMなど)に使う。</td></tr>
        </tbody>
      </table>

      <Heading num="03">Cloud DNSと他サービスの連携</Heading>
      <p><Link href="/cloud/gcp/network/cloud-cdn">Cloud CDN</Link>や<Term>Cloud Load Balancing</Term>のフロントエンドIPへAレコードを向けると、HTTPSでサービスを公開できます。<Link href="/cloud/gcp/network/certificate-manager">Certificate Manager</Link>のDNS検証も、Cloud DNS上にCNAMEレコードを追加することで自動化しやすくなります。</p>

      <Heading num="まとめ">Cloud DNSの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>パブリックとプライベートを使い分ける</h4><p>外部向けとVPC内専用の名前解決を、ゾーン単位で分離する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>LB・CDN・Cloud Runと組み合わせる</h4><p>ドメインを入口に、バックエンドの変更をDNSで吸収できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Certificate Managerと連携</h4><p>DNS検証による証明書の自動発行・更新がしやすい。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/network" tag="Google Cloud">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/gcp/network/cloud-cdn" tag="Google Cloud">Cloud CDN</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/route53" tag="AWS">Route 53</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
