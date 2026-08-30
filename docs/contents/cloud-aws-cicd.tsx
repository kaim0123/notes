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
        <Eyebrow>AWS</Eyebrow>
        <h1>CI/CD ― ビルドとデプロイを自動化する</h1>
        <Lead>
          <Link href="/cloud/aws/container">コンテナ</Link>ページで見た「箱」も、その中身であるコードも、人手でビルドしてサーバーへ配置していては、変更のたびに時間がかかり、手順のミスも起こります。<Term>CI/CD(継続的インテグレーション/継続的デリバリー)</Term>は、コードのビルド・テスト・デプロイを自動化し、変更を安全かつ高頻度に本番へ届けるための仕組みです。AWSでは<Term>CodeBuild</Term>がビルドを、<Term>CodePipeline</Term>がその一連の流れの調整を担います。
        </Lead>
      </Hero>

      <Heading num="01">CodeBuildとCodePipelineの役割分担</Heading>
      <p>2つは役割の階層が異なります。CodeBuildは「ビルドを実行する1つの作業」を担う実行エンジンで、CodePipelineは「ソース取得 → ビルド → テスト → デプロイ」という複数の作業を順序立てて連結する調整役です。CodePipelineの1つの段階(ステージ)の中でCodeBuildが呼び出される、という関係になります。</p>

      <table>
        <thead>
          <tr><th></th><th>CodeBuild</th><th>CodePipeline</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">担う範囲</td><td>ビルド・テストという1つの作業</td><td>ソース取得からデプロイまでの一連の流れ全体</td></tr>
          <tr><td className="hl">実体</td><td>コンテナ上で指定のコマンドを実行するビルド環境</td><td>複数のステージ・アクションを順序管理するオーケストレーター</td></tr>
          <tr><td className="hl">単独での用途</td><td>ビルドだけをCLIやフックから都度実行することも可能</td><td>単独では動かず、各ステージに実行役(CodeBuildなど)を割り当てる</td></tr>
        </tbody>
      </table>

      <Heading num="02">よく組み合わせるサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>CodeCommit</h4>
          <p>AWSが提供するマネージドなGitリポジトリ。現在は新規リポジトリの作成が制限されており、実務ではGitHubなど外部リポジトリをソースにすることが多い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>CodeDeploy</h4>
          <p>ビルド済みのアプリケーションをEC2・ECS・Lambdaへ実際に配置するデプロイ専門サービス。CodePipelineのデプロイステージから呼び出されることが多い。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ これらを含めた一式は総称して「CodeSuite」と呼ばれることがある。</MarkNote>

      <Analogy label="💡 たとえるなら">
        CodeBuildは「材料を決まった手順で加工する作業台」です。渡された材料(ソースコード)を、指定されたレシピ(buildspec)どおりに加工し、完成品(ビルド成果物)を作ります。CodePipelineは「工場のベルトコンベア」で、材料の搬入・作業台での加工・検品・出荷という各工程を決まった順番でつなぎ、どこかの工程が失敗すれば後工程に進ませず止めます。
      </Analogy>

      <Heading num="まとめ">「実行エンジン」と「調整役」を分けて考える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>CodeBuildはビルドの実行役</h4><p>指定のコマンドをコンテナ上で実行し、テストや成果物の作成を担う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CodePipelineは全体の調整役</h4><p>ソース取得からデプロイまでの複数ステージを順序立てて連結する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CodeCommit・CodeDeployが周辺を補う</h4><p>ソース管理とデプロイ実行を、それぞれ専門のサービスに任せられる。</p></Card>
      </CardGrid>
      <p>コードを自動でビルド・デプロイできるようになったら、最後は分かれたサービス同士をどうつなぐかという「<Link href="/cloud/aws/integration">アプリケーション統合</Link>」です。まずは実行エンジンである<Link href="/cloud/aws/cicd/codebuild">CodeBuild</Link>から見ていきます。</p>

      <IndexGrid>
        <IndexCard href="/cloud/aws/cicd/codebuild" num="01" title="CodeBuild">
          buildspecに従ってソースをビルド・テストする、マネージドなビルド環境。
        </IndexCard>
        <IndexCard href="/cloud/aws/cicd/codepipeline" num="02" title="CodePipeline">
          ソース取得からデプロイまでの複数ステージを順序立てて連結する調整役。
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/container" tag="AWS">コンテナ</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd/codebuild" tag="AWS">CodeBuild</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration" tag="AWS">アプリケーション統合</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
