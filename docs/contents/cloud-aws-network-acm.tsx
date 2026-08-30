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
  title: "ACM",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>ACM ― SSL/TLS証明書の発行と自動更新</h1>
        <Lead>
          <Term>ACM(AWS Certificate Manager)</Term>は、Webサイトを<Term>HTTPS</Term>で配信するために必要なSSL/TLS証明書を、無料で発行し、期限が切れる前に自動更新してくれるサービスです。証明書の購入・更新作業を手作業で追いかける必要がなくなります。
        </Lead>
      </Hero>

      <Heading num="01">ドメイン所有の検証方法</Heading>
      <p>証明書を発行する前に、ACMは「そのドメインを本当に所有・管理しているか」を確認します。</p>
      <table>
        <thead>
          <tr><th>検証方法</th><th>仕組み</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DNS検証</td><td>指定されたCNAMEレコードをドメインのDNSに追加する</td><td>そのレコードを残しておく限り自動更新され続ける。<Link href="/cloud/aws/network/route53">Route 53</Link>を使っていればほぼ自動で設定できる</td></tr>
          <tr><td className="hl">Eメール検証</td><td>ドメインの管理者宛メールに届く確認リンクをクリックする</td><td>更新のたびに手作業の確認が必要になりやすい</td></tr>
        </tbody>
      </table>
      <p>実務ではほぼ常に<Term>DNS検証</Term>が使われます。DNSレコードさえ残しておけば、以降の更新プロセスは完全に自動化できるためです。</p>

      <Heading num="02">自動更新の仕組み</Heading>
      <p>ACMで発行した証明書は有効期限の約60日前になると自動的に更新が試みられます。DNS検証で発行した証明書は、検証用レコードがDNSに残っている限り人の操作なしで更新が完了し、証明書の失効によってサイトが突然HTTPSで繋がらなくなるという事故を防ぎます。この検証用レコードを誤って削除してしまうと自動更新に失敗するため、削除しないよう管理する必要があります。</p>

      <Heading num="03">証明書を使えるサービスとリージョンの制約</Heading>
      <p>ACMの証明書は、<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>・ELB(ALB)・API Gatewayなど、AWSの主要なサービスに直接アタッチして使えます。ただし、CloudFrontで使う証明書だけは<Term>us-east-1(バージニア北部)リージョン</Term>で発行されている必要があるという特有の制約があり、CloudFrontを他のリージョンで運用していても証明書だけはus-east-1で発行し直す必要があります。ELBなど他のサービスでは、そのリソースと同じリージョンで発行した証明書を使います。</p>

      <Heading num="04">ワイルドカード証明書</Heading>
      <p><code>*.example.com</code>のような<Term>ワイルドカード証明書</Term>を1枚発行しておけば、<code>www.example.com</code>や<code>api.example.com</code>など任意のサブドメインをまとめてカバーできます。サブドメインを追加するたびに証明書を発行し直す必要がなくなるため、多くの構成で最初からワイルドカードを選ぶのが実務上のセオリーです。</p>

      <Analogy label="💡 たとえるなら">
        ACMは「有効期限が切れる前に自動で更新してくれるパスポート発行所」です。一度DNSに「私はこの窓口の担当者です」という印(検証用レコード)を届け出ておけば、以降は本人確認の手間なく、期限が近づくたびに新しいパスポート(証明書)が自動的に発行されます。印を消してしまうと、次の更新時に改めて本人確認からやり直しになります。
      </Analogy>

      <Heading num="まとめ">ACMが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>DNS検証で更新まで自動化する</h4><p>検証用レコードを残しておけば、以降の更新は人の操作なしで完了する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CloudFrontはus-east-1発行が必須</h4><p>他サービスは同一リージョン、CloudFrontだけは特有のリージョン制約がある。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ワイルドカード証明書でサブドメインをまとめる</h4><p>サブドメイン追加のたびの証明書発行を避けられる。</p></Card>
      </CardGrid>
      <div className="mb-1.5"><Mark tier="niche">補足</Mark></div>
      <MarkNote>→ 社内システムなど、公的な認証局ではなく組織内だけで通用する証明書を発行したい場合は「ACM Private CA」という別サービスを使う。</MarkNote>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/network/cloudfront" tag="AWS">CloudFront</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/route53" tag="AWS">Route 53</RelatedLink>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
