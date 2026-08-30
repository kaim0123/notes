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
  title: "CodePipeline",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; CI/CD</Eyebrow>
        <h1>CodePipeline ― ソースからデプロイまでを順序立てて連結する</h1>
        <Lead>
          <Term>CodePipeline</Term>は、「ソース取得 → ビルド → テスト → デプロイ」といった一連の作業を<Term>ステージ</Term>として定義し、変更がリポジトリに入るたびに自動的に、決めた順番で実行するオーケストレーションサービスです。<Link href="/cloud/aws/cicd/codebuild">CodeBuild</Link>が「1つの作業をどう実行するか」を担うのに対し、CodePipelineは「複数の作業をどの順番でつなぐか」を担います。
        </Lead>
      </Hero>

      <Heading num="01">ステージとアクション</Heading>
      <p>パイプラインは複数の<Term>ステージ</Term>から成り、各ステージの中には1つ以上の<Term>アクション</Term>が含まれます。同じステージ内のアクションは並行して実行でき、あるステージがすべて成功して初めて次のステージへ進みます。どこかのアクションが失敗すれば、その時点でパイプライン全体が停止し、後続のステージ(特に本番デプロイ)には進みません。</p>

      <table>
        <thead>
          <tr><th>ステージ例</th><th>典型的なアクション</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Source</td><td>GitHub・CodeCommit・S3の変更を検知し、最新のソースを取得する</td></tr>
          <tr><td className="hl">Build</td><td>CodeBuildを呼び出し、ビルドとテストを実行する</td></tr>
          <tr><td className="hl">Deploy</td><td>CodeDeploy・CloudFormation・ECSなどへ成果物を配置する</td></tr>
        </tbody>
      </table>

      <Heading num="02">手動承認アクション</Heading>
      <p>本番環境へのデプロイ前に、人の目で確認してから進めたい場面では<Term>手動承認アクション</Term>をステージ間に挟めます。パイプラインはこのアクションに到達すると一時停止し、指定した承認者が内容を確認して承認するまで、後続のステージへ進みません。全自動の継続的デプロイと、人の判断を残したい本番リリースを、同じパイプラインの中で両立できます。</p>

      <Heading num="03">複数の環境をまたぐパイプライン</Heading>
      <p>実務では、開発環境・ステージング環境・本番環境と段階的にデプロイ先を分けることが多く、CodePipelineでは「ステージング環境へのDeployステージ」→「動作確認」→「手動承認」→「本番環境へのDeployステージ」というように、複数の環境をまたぐ一連の流れを1つのパイプラインとして表現できます。</p>

      <Analogy label="💡 たとえるなら">
        CodePipelineは「工場のベルトコンベア」です。材料(ソースコード)が投入口に届くと、加工(ビルド)・検品(テスト)・梱包(デプロイ準備)という各作業台を順番に流れていきます。途中の検品で不良品が見つかれば、そのラインは即座に止まり、後工程には流れません。出荷直前(本番デプロイ前)には、責任者が最終確認のハンコを押す(手動承認)工程を挟むこともできます。
      </Analogy>

      <Heading num="まとめ">CodePipelineが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ステージとアクションで流れを定義する</h4><p>ソース・ビルド・デプロイなどの作業を、順序と依存関係を持ったステージとして表現する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>失敗すれば後続に進ませない</h4><p>途中のアクションが失敗した時点でパイプラインを止め、不完全な変更が本番に届くのを防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>手動承認で人の判断を残せる</h4><p>全自動のデプロイと、本番前の人手による確認を同じパイプライン内で両立できる。</p></Card>
      </CardGrid>
      <div className="mb-1.5"><Mark tier="niche">補足</Mark></div>
      <MarkNote>→ デプロイ先が複数のサービスに分かれている場合、デプロイが終わった後にそれらのサービス同士へ処理結果を伝える仕組みとして<Link href="/cloud/aws/integration">アプリケーション統合</Link>で見たSNS・EventBridgeが使われることもある。</MarkNote>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/cicd/codebuild" tag="AWS">CodeBuild</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration" tag="AWS">アプリケーション統合</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
