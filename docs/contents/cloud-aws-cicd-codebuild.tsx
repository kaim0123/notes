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
  Steps,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CodeBuild",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; CI/CD</Eyebrow>
        <h1>CodeBuild ― 決まった手順でソースをビルド・テストする</h1>
        <Lead>
          <Term>CodeBuild</Term>は、ソースコードの取得・ビルド・テスト・成果物の作成を、あらかじめ決めた手順どおりに実行するフルマネージドのビルドサービスです。実行のたびに新しいビルド環境が起動し、終わると破棄されるため、自分でビルドサーバーを常時起動・維持する必要がありません。
        </Lead>
      </Hero>

      <Heading num="01">buildspec.yml ― ビルド手順を記述する</Heading>
      <p>CodeBuildは、リポジトリに置いた<Term>buildspec.yml</Term>というファイルに従って動作します。実行する処理を4つの<Term>フェーズ</Term>に分けて書くのが基本形です。</p>

      <table>
        <thead>
          <tr><th>フェーズ</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">install</td><td>ビルドに必要なランタイムや依存パッケージを用意する</td></tr>
          <tr><td className="hl">pre_build</td><td>ログインやテストの準備など、ビルド前の下ごしらえを行う</td></tr>
          <tr><td className="hl">build</td><td>実際のビルドコマンド(コンパイル、Dockerイメージのビルドなど)を実行する</td></tr>
          <tr><td className="hl">post_build</td><td>ビルド結果の通知や、成果物の後処理を行う</td></tr>
        </tbody>
      </table>
      <p>最後に<Term>artifacts</Term>セクションで、どのファイルを成果物として保存するかを指定します。生成された成果物は<Link href="/cloud/aws/storage/s3">S3</Link>に保存され、後続のデプロイ処理から参照されます。</p>

      <Heading num="02">使い捨てのビルド環境</Heading>
      <p>ビルドが実行されるたびに、指定したDockerイメージをもとに新しいコンテナ環境が起動し、ビルドが終わると破棄されます。この<Term>使い捨て</Term>の性質により、前回のビルドで生じた中途半端な状態(古い依存パッケージやキャッシュファイルなど)が次回のビルドに紛れ込む心配がなく、常にクリーンな状態からビルドできます。計算資源(コンピュートタイプ)はCPU・メモリの異なる複数のクラスから選び、実行にかかった時間分だけ課金されます。</p>

      <Heading num="03">ビルドキャッシュ ― 使い捨てと速度を両立させる</Heading>
      <p>使い捨て環境は毎回クリーンな一方、依存パッケージのダウンロードなど同じ作業を繰り返すため時間がかかります。CodeBuildは<Term>S3キャッシュ</Term>や<Term>ローカルキャッシュ</Term>を使って、指定したディレクトリ(依存パッケージのインストール先など)の中身をビルドをまたいで再利用でき、クリーンな環境を保ちながらビルド時間を短縮できます。</p>

      <Heading num="04">典型的な処理の流れ</Heading>
      <Steps>
        <li><strong>ソースの取得</strong> ― CodeCommit・GitHub・S3など指定したソースからコードを取得する。</li>
        <li><strong>環境の起動</strong> ― buildspecで指定したDockerイメージをもとに、使い捨てのビルド環境を用意する。</li>
        <li><strong>4フェーズの実行</strong> ― install → pre_build → build → post_buildの順にコマンドを実行する。</li>
        <li><strong>成果物の保存</strong> ― 指定されたファイルをartifactsとしてS3に保存する。</li>
        <li><strong>環境の破棄</strong> ― 使い終えたビルド環境を破棄し、次回は新しい環境から始める。</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        CodeBuildは「毎回きれいに片付けてから使う共用の作業台」です。使うたびに(前の利用者が残した道具や材料のない)まっさらな台が用意され、レシピ(buildspec)どおりに調理(ビルド)を進め、終わったら台は片付けられます。よく使う調味料だけは棚(キャッシュ)に残しておくことで、まっさらな状態を保ちながらも準備の手間を減らせます。
      </Analogy>

      <Heading num="まとめ">CodeBuildが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>buildspec.ymlで手順を宣言する</h4><p>install・pre_build・build・post_buildの4フェーズでビルド手順を記述する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>使い捨て環境でクリーンさを保つ</h4><p>実行のたびに新しい環境を用意し、終われば破棄する。サーバーの維持が不要。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>キャッシュで速度を補う</h4><p>依存パッケージなどをキャッシュし、クリーンさを保ちながらビルド時間を縮める。</p></Card>
      </CardGrid>
      <p>ビルドされた成果物をどう複数のステージに乗せて本番まで届けるかは、次に見る<Link href="/cloud/aws/cicd/codepipeline">CodePipeline</Link>の役割です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd/codepipeline" tag="AWS">CodePipeline</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage/s3" tag="AWS">S3</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
