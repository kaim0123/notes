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
  title: "公開先とデプロイ経路",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>公開先とデプロイ経路 ― どこで動かし、どう届けるか</h1>
        <Lead>
          コードを書いただけではユーザーには届きません。<Term>どこで動かすか</Term>(インフラ)と<Term>どうやって最新のコードを本番に反映させるか</Term>(デプロイ)は別の問いで、どちらも公開前に決めておく必要があります。ここでは<strong>公開前に選ぶこと</strong>を扱い、無停止で切り替える方式やロールバックの設計は<Link href="/dev/ci/deploy">デプロイ戦略とロールバック</Link>で扱います。
        </Lead>
      </Hero>

      <Heading num="01">どこで動かすか ― ホスティングの選択肢</Heading>
      <p>個人・小規模サイトのホスティングは、大きく「フルマネージドなPaaS」と「クラウドの部品を自分で組む」の2方向に分かれます。Atlas自身は<Term>静的Export</Term>(`next build`で生成したHTML一式をそのまま配信)なので、どちらの方式でも動かせます。</p>

      <table>
        <thead>
          <tr><th>方式</th><th>代表例</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PaaS(フルマネージド)</td><td>Vercel、Netlify、<Link href="/cloud/cloudflare">Cloudflare Pages</Link></td><td>GitリポジトリをつなぐだけでビルドとCDN配信を代行。Next.jsのISR/Server Actionsなど動的機能もフルサポート</td></tr>
          <tr><td className="hl">クラウドの部品を自分で組む</td><td>S3 + CloudFront、EC2、ECS</td><td>静的ファイルをオブジェクトストレージに置き、CDNを前段に構える。<Link href="/cloud/aws/network">構成の自由度が高い代わりに自分で組む手間が増える</Link></td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        PaaSは「家具付きの賃貸マンション」、クラウドの部品を自分で組む方式は「土地を買って自分で家を建てる」ことに似ています。前者はすぐ住めますが間取りの自由度は低く、後者は自由に設計できる代わりに水道・電気の引き込みまで自分で手配する必要があります。個人サイトなら前者、細かい制御やコスト最適化が必要な規模になったら後者、という判断が一般的です。
      </Analogy>

      <Heading num="02">DNS・SSL/TLS・CDN ― ドメインからページが届くまで</Heading>
      <p>ユーザーがドメイン名を入力してからページが表示されるまでには、<Term>DNS</Term>(ドメイン名をIPアドレスに変換)・<Term>SSL/TLS</Term>(通信の暗号化)・<Term>CDN</Term>(地理的に近い拠点からコンテンツを配信)という3つの仕組みが働いています。この一連の流れの詳細は<Link href="/network/applications/web">Webの仕組み</Link>で、AWSでの実装(Route 53・ACM・CloudFront)は<Link href="/cloud/aws/network">ネットワーキングとコンテンツ配信</Link>で扱っています。PaaSを使う場合、この3つは基本的に自動で用意されるため、個人サイトで意識するのはカスタムドメインの接続程度です。</p>

      <Heading num="03">デプロイの経路 ― 運営者として決めておくこと</Heading>
      <p>デプロイの起点は基本的に<Term>Gitへのpush</Term>です。仕組みそのもの(ブランチ戦略・CI/CDの書き方・ロールバックの手順)は実装セクションで扱っているので、ここでは<strong>公開前に決めておくべき3点</strong>だけを挙げます。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>何をもって本番反映とするか</h4>
          <p>`main`へのマージ = 本番、という単純な規則にしておくと事故が減る。詳細は<Link href="/dev/git">Gitとブランチ戦略</Link>。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>本番前に確認する場所があるか</h4>
          <p>PRごとのプレビューURLやステージング環境を用意する。自動化の実際は<Link href="/dev/ci/actions">GitHub Actionsの実務</Link>。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>戻せるか</h4>
          <p>壊れたときに直前の正常なビルドへ切り戻せること。<Link href="/dev/ci/deploy">デプロイ戦略とロールバック</Link>で扱う。</p>
        </Card>
      </CardGrid>

      <p>CI/CDそのものの考え方は<Link href="/dev/ci">CI/CDパイプライン</Link>、AWSでCodeBuild・CodePipelineを使う場合は<Link href="/cloud/aws/cicd">AWSのCI/CD</Link>を参照してください。</p>

      <Heading num="まとめ">3つの決定を先に済ませる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ホスティング方式を選ぶ</h4><p>PaaSで簡単に始めるか、クラウドの部品を組んで自由度を取るか。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ドメイン周りを整える</h4><p>DNS・SSL・CDNは多くの場合自動化されているが、仕組みを理解しておく。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>戻せる状態で出す</h4><p>本番反映の規則・確認場所・切り戻し手段の3点を、公開前に決めておく。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/dev/ci" tag="実装">CI/CDパイプライン</RelatedLink>
                    <RelatedLink href="/dev/ci/deploy" tag="実装">デプロイ戦略とロールバック</RelatedLink>
                    <RelatedLink href="/dev/sdlc/deployment" tag="開発工程">導入と受入れ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
