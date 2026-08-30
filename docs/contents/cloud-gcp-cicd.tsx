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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CI/CD",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>CI/CD ― ビルドとデプロイを自動化する</h1>
        <Lead>
          <Link href="/cloud/gcp/container">コンテナ</Link>ページで見た「箱」も、その中身であるコードも、人手でビルドしてサーバーへ配置していては、変更のたびに時間がかかり、手順のミスも起こります。<Term>CI/CD</Term>は、コードのビルド・テスト・デプロイを自動化し、変更を安全かつ高頻度に本番へ届けるための仕組みです。GCPでは<Term>Cloud Build</Term>がビルドを、<Term>Cloud Deploy</Term>がリリースの段階的デプロイを担います。
        </Lead>
      </Hero>

      <Heading num="01">Cloud BuildとCloud Deployの役割分担</Heading>
      <table>
        <thead>
          <tr><th></th><th>Cloud Build</th><th>Cloud Deploy</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">担う範囲</td><td>ソースからイメージ・成果物をビルドする</td><td>ビルド済み成果物をGKE・Cloud Runなどへ段階的にデプロイする</td></tr>
          <tr><td className="hl">実体</td><td>コンテナ上で指定のステップを実行するビルド環境</td><td>パイプラインと<Term>ターゲット</Term>(dev/staging/prod)を管理するリリースオーケストレーター</td></tr>
          <tr><td className="hl">設定</td><td><code>cloudbuild.yaml</code>にビルドステップを記述</td><td>Delivery PipelineとTargetを定義し、プロモーション(昇格)で環境を進める</td></tr>
        </tbody>
      </table>

      <Heading num="02">よく組み合わせるサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Artifact Registry</h4>
          <p>Cloud Buildが生成したコンテナイメージを保管し、Cloud Run・GKEが参照する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud Source Repositories / GitHub連携</h4>
          <p>リポジトリへのpushをトリガーにCloud Buildを起動する。実務ではGitHub ActionsとCloud Buildの組み合わせも多い。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Cloud BuildはAWSのCodeBuildに、Cloud DeployはCodePipeline + CodeDeployのデプロイ部分に近い役割。</MarkNote>

      <Analogy label="💡 たとえるなら">
        Cloud Buildは「材料を決まった手順で加工する作業台」、Cloud Deployは「完成品を試験場→本番フロアへ段階的に運ぶ搬送ライン」です。
      </Analogy>

      <Heading num="まとめ">「ビルド」と「リリース」を分けて考える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Cloud Buildがビルドの実行役</h4><p>cloudbuild.yamlに従い、テストとイメージ作成を担う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud Deployが環境間の昇格を管理</h4><p>dev→staging→prodへ、承認付きで段階的にデプロイする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Artifact Registryが成果物のハブ</h4><p>ビルドと実行環境の間にイメージを置く。</p></Card>
      </CardGrid>
      <p>まずは実行エンジンである<Link href="/cloud/gcp/cicd/cloud-build">Cloud Build</Link>から見ていきます。</p>

      <IndexGrid>
        <IndexCard href="/cloud/gcp/cicd/cloud-build" num="01" title="Cloud Build">
          cloudbuild.yamlに従ってソースをビルド・テストする、マネージドなビルド環境。
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/container" tag="Google Cloud">コンテナ</RelatedLink>
                    <RelatedLink href="/cloud/gcp/cicd/cloud-build" tag="Google Cloud">Cloud Build</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
