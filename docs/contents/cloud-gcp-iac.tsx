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
  title: "IaC",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>IaC ― インフラをコードで組み立てる</h1>
        <Lead>
          ここまで見てきたCompute EngineやCloud Storage、VPCといったサービスは、実際には「どんな設定で」「いくつ」「どう組み合わせて」使うかを定義しなければ動きません。その定義をコンソールでのクリック操作ではなくコードとして書き、何度でも同じ結果を再現できる形でデプロイする考え方が<Term>IaC(Infrastructure as Code)</Term>です。GCPでは<Term>Terraform</Term>が最も広く使われ、Google純正の<Term>Deployment Manager</Term>や<Term>Config Connector</Term>も選択肢に入ります。
        </Lead>
      </Hero>

      <Heading num="01">Terraform ― マルチクラウド対応の宣言型IaC</Heading>
      <p><Term>Terraform</Term>は、HashiCorpが提供する宣言型IaCツールで、GCP・AWS・Azureを同じ<Term>HCL</Term>言語で記述できます。GCP向けには<Term>Google Provider</Term>を使い、プロジェクト・リージョン・リソースを<code>terraform apply</code>で作成・更新します。状態は<Term>state</Term>ファイル(ローカルまたはCloud Storage上)で管理し、チーム開発ではリモートバックエンドが推奨されます。</p>

      <Heading num="02">Deployment Manager ― Google純正のテンプレート</Heading>
      <p><Term>Deployment Manager</Term>は、GCPが提供するYAML/PythonベースのIaCサービスで、AWSの<Term>CloudFormation</Term>に近い位置づけです。Google Providerのエコシステムほど広くはないものの、GCP内に閉じたシンプルな構成では選択肢になります。新規プロジェクトではTerraformを選ぶケースが圧倒的に多いです。</p>

      <Heading num="03">Config Connector ― Kubernetes上でGCPリソースを管理</Heading>
      <p><Term>Config Connector</Term>は、<Link href="/cloud/gcp/container">GKE</Link>クラスター上でGCPリソースをKubernetesのカスタムリソース(CRD)として定義・管理する仕組みです。アプリとインフラを同じKubernetesマニフェストの流れで扱いたいチーム向けです。</p>

      <table>
        <thead>
          <tr><th>ツール</th><th>特徴</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Terraform</td><td>マルチクラウド、コミュニティとモジュールが豊富</td><td>一般的なGCPインフラ定義の第一選択</td></tr>
          <tr><td className="hl">Deployment Manager</td><td>GCP純正、YAML/Python</td><td>GCPのみ・Google純正に統一したい場合</td></tr>
          <tr><td className="hl">Config Connector</td><td>GKE + CRDでGCPリソースを管理</td><td>Kubernetes中心のGitOps運用</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Terraformは「どのメーカーの部品でも同じ設計図言語(HCL)で書ける製図ソフト」、Deployment Managerは「Google製部品専用の申請書フォーマット」、Config Connectorは「KubernetesのリモコンからGCPの機械も動かす仕組み」です。
      </Analogy>

      <Heading num="04">その他の関連ツール</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Pulumi</h4>
          <p>TypeScript・Pythonなどの一般言語でインフラを定義するIaC。Terraformと同様にGCPをサポート。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud Foundation Toolkit</h4>
          <p>組織・ネットワーク・セキュリティのベストプラクティスをTerraformモジュールとして提供するGoogle公式テンプレート集。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ AWS側のCDKに相当するGoogle純正の高レベルフレームワークは、現状Terraform + モジュールが実務の主流。</MarkNote>

      <Heading num="まとめ">ツールは用途で選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Terraformが汎用的な第一選択</h4><p>マルチクラウド・モジュール再利用・チーム開発に強い。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Deployment ManagerはGCP純正の選択肢</h4><p>シンプルなGCP専用構成向け。新規はTerraformが多い。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Config ConnectorはGKE/GitOps向け</h4><p>KubernetesマニフェストとGCPリソースを同じ流れで管理する。</p></Card>
      </CardGrid>
      <p>手を動かして構築する際は、<Link href="/cloud/gcp/basics">Google Cloudの基礎</Link>で見たプロジェクト・リージョン・ゾーンの構造を踏まえ、まずはTerraformの小さなモジュールから始めるのが定石です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/cicd/cloud-build" tag="Google Cloud">Cloud Build</RelatedLink>
                    <RelatedLink href="/cloud/gcp/container" tag="Google Cloud">コンテナ</RelatedLink>
                    <RelatedLink href="/cloud/aws/iac" tag="AWS">IaC(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
