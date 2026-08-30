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
  title: "Certificate Manager",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>Certificate Manager ― HTTPSに必要な証明書を自動管理する</h1>
        <Lead>
          <Term>Certificate Manager</Term>は、Webサイトを<Term>HTTPS</Term>で配信するために必要なSSL/TLS証明書を、発行から自動更新まで肩代わりするサービスで、AWSの<Term>ACM</Term>に相当します。
        </Lead>
      </Hero>

      <Heading num="01">Google管理証明書</Heading>
      <p><Term>Google管理証明書</Term>は、Let&apos;s Encryptなどの公開認証局から証明書を取得し、期限が切れる前に自動更新します。ドメインの所有確認には<Term>DNS検証</Term>または<Term>HTTP検証</Term>を使い、<Link href="/cloud/gcp/network/cloud-dns">Cloud DNS</Link>を使っていればDNS検証のCNAMEレコード追加をほぼ自動化できます。</p>

      <table>
        <thead>
          <tr><th>検証方式</th><th>内容</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DNS検証</td><td>指定されたCNAMEレコードをドメインのDNSに追加する</td><td>Cloud DNS利用時。レコードを残す限り自動更新され続ける</td></tr>
          <tr><td className="hl">HTTP検証</td><td>指定されたURLパスにトークンを配置する</td><td>既にWebサーバーが動いている場合</td></tr>
        </tbody>
      </table>

      <Heading num="02">アタッチ先</Heading>
      <p>Certificate Managerの証明書は、<Link href="/cloud/gcp/network/cloud-cdn">Cloud CDN</Link>・<Term>Cloud Load Balancing</Term>・<Term>Cloud Run</Term>のカスタムドメインなど、GCPの主要なHTTPSエンドポイントに直接アタッチして使えます。証明書の購入・更新作業を手作業で追いかける必要がなくなります。</p>

      <Heading num="まとめ">Certificate Managerの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Google管理証明書で更新を自動化</h4><p>期限切れ前の更新を任せ、運用負荷を減らす。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud DNSと組み合わせるとDNS検証が楽</h4><p>ドメイン管理をGCP内に揃えやすい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>LB・CDN・Cloud Runに直接アタッチ</h4><p>HTTPS公開の定番構成にそのまま組み込める。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/network/cloud-dns" tag="Google Cloud">Cloud DNS</RelatedLink>
                    <RelatedLink href="/cloud/gcp/network/cloud-cdn" tag="Google Cloud">Cloud CDN</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/acm" tag="AWS">ACM</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
