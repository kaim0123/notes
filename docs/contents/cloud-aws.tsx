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
  title: "AWS",
};

const topics = [
  { href: "/cloud/aws/basics", title: "AWSの基礎", desc: "リージョン・AZ・エッジロケーション ― AWSの物理的な地理構造" },
  { href: "/cloud/aws/compute", title: "コンピューティング", desc: "EC2・Lambda ― どこで処理を動かすか" },
  { href: "/cloud/aws/storage", title: "ストレージ", desc: "S3・EBS・EFS ― データをどの形で置くか" },
  { href: "/cloud/aws/network", title: "ネットワーキングとコンテンツ配信", desc: "VPC・Route 53・CloudFront ― クラウド上に自分の建物を建てる" },
  { href: "/cloud/aws/security", title: "セキュリティ、アイデンティティ、コンプライアンス", desc: "IAM・KMS ― 「誰が」「何に」「何をできるか」" },
  { href: "/cloud/aws/database", title: "データベース", desc: "RDS・Aurora・DynamoDB ― 管理されたデータの置き場所" },
  { href: "/cloud/aws/monitoring", title: "モニタリングと管理", desc: "CloudWatch・CloudTrail ― 見えないシステムを見えるようにする" },
  { href: "/cloud/aws/container", title: "コンテナ", desc: "ECS・EKS・Fargate ― 「まとめて運ぶ箱」をどう並べるか" },
  { href: "/cloud/aws/cicd", title: "CI/CD", desc: "CodeBuild・CodePipeline ― ビルドとデプロイを自動化する" },
  { href: "/cloud/aws/integration", title: "アプリケーション統合", desc: "SQS・SNS・EventBridge ― サービス同士を疎結合につなぐ" },
  { href: "/cloud/aws/iac", title: "IaC", desc: "CDK・AWS Blocks ― インフラをコードでどう組み立てるか" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS</Eyebrow>
        <h1>AWS</h1>
        <Lead>
          Amazon Web Servicesは200を超えるサービス群ですが、その大半は「コンピューティング」「ストレージ」「ネットワーキング」「セキュリティ」「データベース」「モニタリング」「コンテナ」「CI/CD」「アプリケーション統合」「IaC」という少数の役割の組み合わせでできています。ここではまずリージョン・AZといったAWS共通の地理構造を押さえたうえで、実務での登場頻度が高い10分野に絞り、それぞれの中心サービスと、サービス同士がどう役割分担しているかを図解と例え話で見ていきます。
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
