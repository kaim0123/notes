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
  title: "コンテナ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>コンテナ ― 「まとめて運ぶ箱」をどう並べるか</h1>
        <Lead>
          <Term>コンテナ</Term>はアプリケーションと、それが動くために必要な依存関係をひとまとめにした「箱」です。GCPではKubernetesを生み出したGoogleが<Term>GKE</Term>を提供し、小規模向けには<Term>Cloud Run</Term>でサーバーレスにコンテナを動かす選択肢もあります。
        </Lead>
      </Hero>

      <Heading num="01">GKE ― マネージドなKubernetes</Heading>
      <p><Term>GKE(Google Kubernetes Engine)</Term>は、コンテナオーケストレーションの事実上の業界標準である<Term>Kubernetes</Term>を、Googleがコントロールプレーンの運用まで肩代わりして提供するサービスです。Kubernetesの知識やマニフェストがそのまま使え、AWSの<Term>EKS</Term>に相当します。GoogleはKubernetes自体を開発した背景があり、GKEは新機能の投入が早いことでも知られています。</p>

      <Heading num="02">Cloud Run ― コンテナのサーバーレス</Heading>
      <p><Link href="/cloud/gcp/compute">コンピューティング</Link>ページでも触れた<Term>Cloud Run</Term>は、コンテナイメージをHTTPで公開するサーバーレス実行環境です。GKEのようにクラスターを自分で設計・運用せず、コンテナをデプロイするだけでスケールするため、Kubernetesの学習コストを避けつつコンテナの恩恵を受けたい場合の入口になります。AWSの<Term>Fargate</Term> + ALBに近い位置づけです。</p>

      <table>
        <thead>
          <tr><th></th><th>GKE</th><th>Cloud Run</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">学習コスト</td><td>高い(Kubernetesの知識が必要)</td><td>低い(コンテナとHTTPの理解で始められる)</td></tr>
          <tr><td className="hl">制御の自由度</td><td>高い(ネットワーク・スケーリングを細かく設計)</td><td>中程度(プラットフォームが多くを肩代わり)</td></tr>
          <tr><td className="hl">向いている状況</td><td>大規模・マルチサービス・Kubernetes標準を活かしたい</td><td>Web API・小〜中規模サービスの素早いデプロイ</td></tr>
        </tbody>
      </table>

      <Heading num="03">Artifact Registry ― コンテナイメージの保管庫</Heading>
      <p><Term>Artifact Registry</Term>は、コンテナイメージやnpm・Mavenパッケージなどを保管するプライベートなレジストリで、AWSの<Term>ECR</Term>に相当します。GKE・Cloud Run・Cloud Buildは、多くの場合このレジストリ上のイメージを参照してデプロイします。旧<Term>Container Registry(gcr.io)</Term>はArtifact Registryへの移行が進んでいます。</p>

      <Analogy label="💡 たとえるなら">
        コンテナは「引っ越し用のコンテナボックス」、GKEは「業界標準規格に合わせた大規模配送センター」、Cloud Runは「箱を預けるだけで勝手に店舗を開閉してくれる共用キッチン」、Artifact Registryは「箱を保管しておく倉庫」です。
      </Analogy>

      <Heading num="まとめ">「オーケストレーター」と「実行形態」を選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>GKEはKubernetes標準で本格運用</h4><p>大規模・複雑な構成向け。コントロールプレーンはGoogleが運用。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud Runはサーバーレスで手軽</h4><p>HTTPコンテナのデプロイとスケールを最小の設定で済ませたいとき向け。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Artifact Registryがイメージの保管庫</h4><p>ビルド成果物を1か所に集め、GKE・Cloud Runから参照する。</p></Card>
      </CardGrid>
      <p>次は、コンテナやコードをどう自動でビルド・デプロイするかという「<Link href="/cloud/gcp/cicd">CI/CD</Link>」です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/compute" tag="Google Cloud">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/gcp/cicd" tag="Google Cloud">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/aws/container" tag="AWS">コンテナ(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
