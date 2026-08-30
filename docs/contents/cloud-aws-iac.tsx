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
        <Eyebrow>AWS</Eyebrow>
        <h1>IaC ― インフラをコードで組み立てる</h1>
        <Lead>
          ここまで見てきたEC2やLambda、S3、VPCといった一つひとつのサービスは、実際には誰かが「どんな設定で」「いくつ」「どう組み合わせて」使うかを定義しなければ動きません。その定義をマネジメントコンソールでのクリック操作ではなくコードとして書き、何度でも同じ結果を再現できる形でデプロイする考え方が<Term>IaC(Infrastructure as Code)</Term>です。AWSではその中核に宣言型テンプレートの<Term>CloudFormation</Term>があり、それをプログラミング言語で書けるようにした<Term>CDK</Term>、さらにCDKの上にアプリケーションのランタイムまで束ねた新しいツールキット<Term>AWS Blocks</Term>が積み重なっています。
        </Lead>
      </Hero>

      <Heading num="01">CDK ― CloudFormationをプログラミング言語で書く</Heading>
      <p><Term>CloudFormation</Term>は、必要なAWSリソースとその設定をYAMLやJSONの<Term>宣言型テンプレート</Term>として書き、AWSに提出すると記載通りの状態を自動で作ってくれるサービスです。決まった様式の申請書に一つひとつ項目を書き込んでいくイメージに近く、テンプレートが長くなるほど同じ記述の繰り返しが増えていきます。</p>
      <p><Term>CDK(Cloud Development Kit)</Term>は、このCloudFormationテンプレートをTypeScriptやPythonなどのプログラミング言語で生成するためのフレームワークです。<code>cdk synth</code>コマンドがコードをCloudFormationテンプレートに変換し、<code>cdk deploy</code>がそれをAWSに適用します。変数・ループ・関数・クラスの継承といった言語の道具がそのまま使えるため、似た構成の繰り返しや環境ごとの差分をコードとして表現できます。</p>
      <p>CDKアプリケーションは<Term>App</Term>を頂点に、デプロイ単位である<Term>Stack</Term>、そしてその中身を構成する<Term>Construct</Term>という3層構造を持ちます。Constructは1つのAWSリソースのこともあれば、複数のリソースをまとめた部品のこともあり、この抽象度の違いがそのままCDKの学習の勘所になります。</p>

      <Heading num="02">Construct ― L1・L2・L3という抽象度の階段</Heading>
      <p>Constructは抽象度に応じて3段階に分かれており、どの段を使うかで書く量と自由度のバランスが変わります。</p>

      <table>
        <thead>
          <tr><th>レベル</th><th>特徴</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">L1(CfnXxx)</td><td>CloudFormationのリソース定義をそのままクラス化したもの。全プロパティを自分で指定する必要があり、記述量はCloudFormationとほぼ変わらない</td><td>CDKにまだ取り込まれていない最新のプロパティを使いたいとき</td></tr>
          <tr><td className="hl">L2</td><td>AWSのベストプラクティスに沿った既定値と、権限付与などの補助メソッドを備えた「意図ベース」のAPI。最もよく使われる層</td><td>通常のリソース定義のほとんど</td></tr>
          <tr><td className="hl">L3(パターン)</td><td>複数のL1・L2 Constructを組み合わせ、「Lambdaの裏にDynamoDBを置く」のような完成形の構成をひとまとめにしたもの</td><td>同じ組み合わせを何度も書いているとき</td></tr>
        </tbody>
      </table>
      <p>実務ではまずL2で書き始め、L2でカバーできない設定にぶつかったときだけL1に降り、同じL2の組み合わせをコピー&ペーストし始めたら自作のL3にまとめる、という進み方が定石とされています。</p>

      <Heading num="03">AWS Blocks ― CDKの上に立つフルスタックツールキット</Heading>
      <p><Term>AWS Blocks</Term>は、CDKの上にアプリケーションのランタイムとローカル開発環境まで束ねたバックエンドツールキットです。<Term>Block</Term>と呼ばれるnpmパッケージを1つインポートするだけで、対応するAWSリソース・実行時のSDK呼び出し・AWS環境なしで動くローカル実装の3役がまとめて手に入ります。同じ<code>import</code>文が、ローカル開発中は<Term>インメモリの実装</Term>に、<code>cdk synth</code>実行時は<Term>CDK Construct</Term>に、Lambda実行時は<Term>AWS SDK呼び出し</Term>に自動的に切り替わる仕組み(<Term>条件付きエクスポート</Term>)がこれを支えています。</p>

      <table>
        <thead>
          <tr><th>カテゴリ</th><th>代表的なBlock</th><th>実体となるAWSサービス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データ</td><td>KVStore</td><td>DynamoDB</td></tr>
          <tr><td className="hl">認証</td><td>AuthCognito</td><td>Cognito</td></tr>
          <tr><td className="hl">非同期処理</td><td>AsyncJob</td><td>SQS + Lambda</td></tr>
          <tr><td className="hl">AI</td><td>Agent</td><td>Bedrock</td></tr>
          <tr><td className="hl">ホスティング</td><td>Hosting</td><td>CloudFront + S3</td></tr>
        </tbody>
      </table>
      <MarkNote>→ このほかにもCronJob・KnowledgeBase・Realtimeなど、データ・認証・観測性にまたがる約20種類のBlockが用意されている。</MarkNote>

      <p>Blockを組み合わせるコードは<Term>IFCレイヤー</Term>(<code>aws-blocks/index.ts</code>)と呼ばれる1つのファイルにまとまり、そこでのConstructのインスタンス化からインフラ定義が自動的に導かれます(<Term>Infrastructure from Code</Term>)。個別のSQSキューなどBlock化されていないリソースを足したい場合は、任意で用意できる<Term>CDKレイヤー</Term>(<code>aws-blocks/index.cdk.ts</code>)から通常のCDK Constructに直接手を伸ばせるため、抽象化の外に出られなくなる心配はありません。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Scope</h4>
          <p>Blockをまとめる名前空間。Scope名とBlock IDからリソース名が一意に決まる。Block IDの変更はステートフルなBlockのデータ消失につながるため注意が要る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>ApiNamespace</h4>
          <p>フロントエンドから直接呼び出せる型安全なバックエンドメソッドを定義するBlock。コード生成なしにバックエンドとフロントエンドで型が共有される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>サンドボックス</h4>
          <p><code>npm run sandbox</code>で、開発者ごとに隔離された実AWS環境へ数秒単位でデプロイし、ローカル実装とは異なる挙動(IAM境界など)を検証できる。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        CloudFormationは「決まった様式の申請書」に一つひとつ手で記入していくようなものです。CDKは、その申請書をプログラムで自動生成してくれる「製図ソフト」で、変数・ループ・関数といったプログラミング言語の道具がそのまま使えます。AWS Blocksはさらに一歩進み、「配管・配線・建具まで組み込み済みのプレハブユニット」を組み合わせて家を建てるようなもので、ユニット(Block)を選ぶだけで基礎工事(インフラ)から仮住まいでの内見(ローカル動作確認)まで一度に揃います。それでも足りない部分があれば、CDKレイヤーから直接増築できます。
      </Analogy>

      <Heading num="まとめ">3つの層で抽象度を選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>CDKは「CloudFormationをコードで生成する層」</h4><p>コンソール操作やYAMLの手書きに代わり、プログラミング言語でインフラを定義し、cdk synthでテンプレートに変換する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Constructの抽象度はL1・L2・L3から選べる</h4><p>素のCloudFormationに近いL1、意図ベースで書けるL2、複数リソースをまとめたパターンのL3を、必要な自由度に応じて使い分ける。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>AWS BlocksはCDKの上にランタイムとローカル環境まで束ねる</h4><p>1つのBlockがCDK構築・Lambda実行時のSDK呼び出し・ローカルモックの3役を兼ね、足りなければCDKレイヤーに直接アクセスできる。</p></Card>
      </CardGrid>
      <p>これでAWSの基礎から、インフラを実際に定義してデプロイする層までを一通り見たことになります。手を動かして構築する際は、<Link href="/cloud/aws/basics">AWSの基礎</Link>で見たリージョン・AZの構造を踏まえながら、まずはL2 Constructから書き始めるのが定石です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/cicd/codepipeline" tag="AWS">CodePipeline</RelatedLink>
                    <RelatedLink href="/cloud/aws/compute/lambda" tag="AWS">Lambda</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sqs" tag="AWS">SQS</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
