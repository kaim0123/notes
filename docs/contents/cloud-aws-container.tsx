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
        <Eyebrow>AWS</Eyebrow>
        <h1>コンテナ ― 「まとめて運ぶ箱」をどう並べるか</h1>
        <Lead>
          <Term>コンテナ</Term>はアプリケーションと、それが動くために必要な依存関係をひとまとめにした「箱」です。この箱自体を作る仕組みはDockerなどが担いますが、その箱を「どのサーバー群に」「何個」「どう並べて動かし続けるか」を管理するのがAWSのコンテナサービスの役割です。
        </Lead>
      </Hero>

      <Heading num="01">ECS ― AWS純正のコンテナオーケストレーター</Heading>
      <p><Term>ECS(Elastic Container Service)</Term>は、AWSが自社開発したコンテナ管理サービスです。「どのコンテナイメージを」「いくつ」「どんな設定で」動かすかを<Term>タスク定義</Term>として記述し、その実行単位である<Term>タスク</Term>を束ねたものを<Term>サービス</Term>、それらが動く土台を<Term>クラスター</Term>と呼びます。AWSのIAM・ELB・CloudWatchなど他サービスと設定なしで密に統合されている分、AWS以外の環境への移植は前提にしていません。</p>

      <Heading num="02">EKS ― マネージドなKubernetes</Heading>
      <p><Term>EKS(Elastic Kubernetes Service)</Term>は、コンテナオーケストレーションの事実上の業界標準である<Term>Kubernetes</Term>を、AWSがコントロールプレーンの運用まで肩代わりして提供するサービスです。Kubernetesの知識やマニフェストがそのまま使えるため、複数のクラウド事業者にまたがって運用したい場合や、すでにKubernetesの知見があるチームに向いています。</p>

      <table>
        <thead>
          <tr><th></th><th>ECS</th><th>EKS</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">学習コスト</td><td>低い(AWS独自の概念のみ)</td><td>高い(Kubernetes自体の知識が必要)</td></tr>
          <tr><td className="hl">他クラウドへの可搬性</td><td>低い(AWS専用)</td><td>高い(Kubernetes標準に準拠)</td></tr>
          <tr><td className="hl">向いている状況</td><td>AWSに全面的に依存してよい・とにかく早く始めたい</td><td>マルチクラウド前提・既存のKubernetes資産がある</td></tr>
        </tbody>
      </table>

      <Heading num="03">Fargate ― コンテナのためのサーバーレス</Heading>
      <p>ECS・EKSはどちらも、コンテナを実際に動かす土台としてEC2インスタンスを自分で用意する<Term>EC2起動タイプ</Term>と、その土台自体をAWSに任せる<Term>Fargate起動タイプ</Term>を選べます。Fargateを使うと、<Link href="/cloud/aws/compute">コンピューティング</Link>ページで見たLambdaと同じように、サーバーの台数やパッチ適用を意識せず、コンテナの実行だけに集中できます。</p>

      <Heading num="04">ECR ― コンテナイメージの保管庫</Heading>
      <p><Term>ECR(Elastic Container Registry)</Term>は、コンテナイメージを保管するプライベートなレジストリです。ECS・EKSのタスク定義は、多くの場合このECR上のイメージを参照して起動します。</p>

      <Analogy label="💡 たとえるなら">
        コンテナは「引っ越し用のコンテナボックス」に似ています。中に何を詰めるか(アプリと依存関係)は箱を作る段階で決まっていて、ECSやEKSは「どのトラックに」「何個」「どの順番で」箱を積んで走らせ続けるかを管理する配送センターの役割です。ECSはAWSが用意した専用の配送センター、EKSは業界標準規格に合わせた配送センターだと考えると違いがつかめます。Fargateを使うということは、トラック自体の手配(EC2インスタンスの管理)を配送センターに任せてしまうことに相当します。
      </Analogy>

      <Heading num="まとめ">「オーケストレーター」と「土台」を別々に選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ECSは手軽さ優先</h4><p>AWS専用だが学習コストが低く、他サービスとの統合もあらかじめ整っている。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>EKSは可搬性優先</h4><p>Kubernetes標準に準拠し、マルチクラウドや既存資産の活用に向く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Fargateは土台の管理をなくす</h4><p>EC2インスタンスの管理を手放し、コンテナの実行そのものに集中できる。</p></Card>
      </CardGrid>
      <p>ここまでで、AWSの基礎・コンピューティング・ストレージ・ネットワーキング・セキュリティ・データベース・モニタリング・コンテナという、地理構造とリソースを「動かす・置く・守る・見る」ための8分野を見てきました。次は、こうして作ったコンテナやコードを、どう自動でビルド・デプロイするかという「<Link href="/cloud/aws/cicd">CI/CD</Link>」です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
