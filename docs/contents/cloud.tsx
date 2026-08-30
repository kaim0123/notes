import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クラウド",
};

const topics = [
  {
    href: "/cloud/aws",
    title: "AWS",
    desc: "リージョン・AZの基礎から、コンピューティング・ストレージ、CI/CD・アプリケーション統合まで",
  },
  {
    href: "/cloud/gcp",
    title: "Google Cloud",
    desc: "プロジェクト・リージョンの基礎から、Compute Engine・Cloud Run、Pub/Sub・Cloud Buildまで",
  },
  {
    href: "/cloud/cloudflare",
    title: "Cloudflare",
    desc: "CDN・DNS・セキュリティを本業とするエッジプラットフォーム。Workersでのエッジ実行、Pagesでのデプロイ、独自ドメインのメール送受信まで",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>クラウド</Eyebrow>
        <h1>クラウド ― 事業者から借りるインフラ</h1>
        <Lead>
          サーバーやストレージを自前で持たず、事業者から必要な分だけ借りて使うのが<Term>クラウド</Term>です。まずは管理範囲による分類(IaaS・PaaS・SaaS)と主要事業者の位置づけを押さえ、そのうえで最もドキュメント・利用実績の多い<strong>AWS</strong>の個別サービスを深掘りしていきます。
        </Lead>
      </Hero>

      <Heading num="01">IaaS・PaaS・SaaS ― どこまでを事業者に任せるか</Heading>
      <p>
        自前でサーバーを持つ<Term>オンプレミス</Term>では、電源・空調・物理サーバーからOS・ミドルウェア・アプリケーションまで、すべてを自社で管理します。クラウドはこの管理範囲を事業者側にどこまで肩代わりしてもらうかによって、3段階に分かれます。
      </p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>IaaS(Infrastructure as a Service)</h4>
          <p>サーバー・ストレージ・ネットワークといった土台だけを借りる形態。OS以上はすべて自分で構築・運用する。EC2やVPCが該当し、自由度が最も高い代わりに管理の手間も大きい。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>PaaS(Platform as a Service)</h4>
          <p>OSやミドルウェアの管理まで事業者が肩代わりし、アプリケーションのコードを載せるだけで動く形態。RDSやLambdaが該当し、インフラ管理を減らしてアプリ開発に集中できる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>SaaS(Software as a Service)</h4>
          <p>完成したアプリケーションをそのまま利用する形態。Gmailや Slack のように、インフラもコードも意識せずサービスとして使う。</p>
        </Card>
      </CardGrid>
      <Aside label="豆知識">
        同じAWSの中でもサービスごとに立ち位置は異なります。EC2(仮想サーバーを自分で構築)はIaaS寄り、Lambda(コードを置くだけで実行基盤は意識しない)はPaaS寄り、というように「AWS = IaaS」と単純化はできません。
      </Aside>

      <Heading num="02">AWS・Azure・Google Cloud ― 主要3事業者の位置づけ</Heading>
      <p>
        クラウド事業者は数多くありますが、シェア・機能の広さで先行しているのが<Term>AWS(Amazon Web Services)</Term>・<Term>Azure(Microsoft)</Term>・<Term>Google Cloud(GCP)</Term>の3社です。基本的な考え方(リージョン/AZによる地理的分割、従量課金など)はどの事業者もほぼ共通しており、サービス名が違うだけで対応する概念が存在することが多くあります。
      </p>
      <table>
        <thead>
          <tr><th>用途</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">仮想サーバー</td><td>EC2</td><td>Virtual Machines</td><td>Compute Engine</td></tr>
          <tr><td className="hl">サーバーレス関数</td><td>Lambda</td><td>Functions</td><td>Cloud Functions</td></tr>
          <tr><td className="hl">オブジェクトストレージ</td><td>S3</td><td>Blob Storage</td><td>Cloud Storage</td></tr>
          <tr><td className="hl">マネージドDB</td><td>RDS</td><td>Azure SQL Database</td><td>Cloud SQL</td></tr>
        </tbody>
      </table>
      <p>
        Azureは既存のMicrosoft製品(Windows Server・Active Directory)との親和性、Google Cloudはデータ分析・機械学習の分野で強みがあると言われます。本サイトではAWSを最も詳しく扱いつつ、<Link href="/cloud/gcp/basics">Google Cloudの基礎</Link>から同じ10分野の構成でGCPも読み進められます。
      </p>

      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter />
    </DocsPage>
  );
}
