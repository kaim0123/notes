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
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Cloud Build",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; CI/CD</Eyebrow>
        <h1>Cloud Build ― cloudbuild.yamlに従ってビルドする</h1>
        <Lead>
          <Term>Cloud Build</Term>は、ソースコードからコンテナイメージや成果物をビルドするマネージドなCIサービスで、AWSの<Term>CodeBuild</Term>に相当します。<code>cloudbuild.yaml</code>にビルドステップを記述し、Git pushや手動トリガーで実行します。
        </Lead>
      </Hero>

      <Heading num="01">cloudbuild.yaml</Heading>
      <p>ビルド手順は<code>cloudbuild.yaml</code>に<Term>steps</Term>として列挙します。各ステップはDockerコンテナ上でコマンドを実行し、依存関係のインストール・テスト・イメージビルド・<Link href="/cloud/gcp/container">Artifact Registry</Link>へのpushまでを一連のパイプラインとして定義できます。</p>

      <Heading num="02">トリガー</Heading>
      <p><Term>Cloud Buildトリガー</Term>は、GitHub・GitLab・Cloud Source RepositoriesへのpushやPR、スケジュールなどをきっかけにビルドを自動起動します。ブランチやタグごとに異なる<code>cloudbuild.yaml</code>を使い分けることもできます。</p>

      <Heading num="03">Cloud Run・GKEへのデプロイ</Heading>
      <p>ビルドステップの最後に<Term>gcloud run deploy</Term>や<Term>kubectl apply</Term>を実行すれば、ビルドからデプロイまでを1本のパイプラインにできます。より本格的な段階的リリースは<Link href="/cloud/gcp/cicd">Cloud Deploy</Link>と組み合わせます。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Buildは「レシピ(cloudbuild.yaml)どおりに材料(ソース)を加工する、借りられた厨房」です。厨房自体(ビルド環境)の準備はGoogleが肩代わりし、使った分だけ課金されます。
      </Analogy>

      <Heading num="まとめ">Cloud Buildの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>cloudbuild.yamlで手順をコード化</h4><p>再現可能なビルドを、バージョン管理下に置ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>トリガーで自動化</h4><p>pushやPRをきっかけに、人手なしでビルドを回す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Artifact Registryとデプロイ先と連携</h4><p>イメージをpushし、Cloud Run・GKEへ届ける。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/cicd" tag="Google Cloud">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/gcp/container" tag="Google Cloud">コンテナ</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd/codebuild" tag="AWS">CodeBuild</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
