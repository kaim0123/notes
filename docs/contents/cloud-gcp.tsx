import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Google Cloud",
};

const topics = [
  { href: "/cloud/gcp/basics", title: "Google Cloudの基礎", desc: "プロジェクト・リージョン・ゾーン ― GCPの論理構造と地理構造" },
  { href: "/cloud/gcp/compute", title: "コンピューティング", desc: "Compute Engine・Cloud Functions・Cloud Run ― どこで処理を動かすか" },
  { href: "/cloud/gcp/storage", title: "ストレージ", desc: "Cloud Storage・Persistent Disk ― データをどの形で置くか" },
  { href: "/cloud/gcp/network", title: "ネットワーキングとコンテンツ配信", desc: "VPC・Cloud DNS・Cloud CDN ― クラウド上に自分の建物を建てる" },
  { href: "/cloud/gcp/security", title: "セキュリティ、アイデンティティ、コンプライアンス", desc: "IAM・Cloud KMS ― 「誰が」「何に」「何をできるか」" },
  { href: "/cloud/gcp/database", title: "データベース", desc: "Cloud SQL・Firestore ― 管理されたデータの置き場所" },
  { href: "/cloud/gcp/monitoring", title: "モニタリングと管理", desc: "Cloud Monitoring・Cloud Logging ― 見えないシステムを見えるようにする" },
  { href: "/cloud/gcp/container", title: "コンテナ", desc: "GKE・Artifact Registry ― 「まとめて運ぶ箱」をどう並べるか" },
  { href: "/cloud/gcp/cicd", title: "CI/CD", desc: "Cloud Build・Cloud Deploy ― ビルドとデプロイを自動化する" },
  { href: "/cloud/gcp/integration", title: "アプリケーション統合", desc: "Pub/Sub・Eventarc ― サービス同士を疎結合につなぐ" },
  { href: "/cloud/gcp/iac", title: "IaC", desc: "Terraform・Deployment Manager ― インフラをコードでどう組み立てるか" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>Google Cloud</h1>
        <Lead>
          Google Cloud Platform(GCP)は、Googleが自社の検索・YouTube・Gmailなどを支えるインフラ技術を外部向けに提供したクラウドです。100を超えるサービス群は、<Link href="/cloud/aws">AWS</Link>と同様に「コンピューティング」「ストレージ」「ネットワーキング」「セキュリティ」「データベース」「モニタリング」「コンテナ」「CI/CD」「アプリケーション統合」「IaC」という少数の役割の組み合わせでできています。ここではまずプロジェクト・リージョン・ゾーンといったGCP共通の構造を押さえたうえで、実務での登場頻度が高い10分野に絞り、それぞれの中心サービスと役割分担を見ていきます。
        </Lead>
      </Hero>

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
