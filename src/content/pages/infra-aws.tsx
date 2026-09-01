import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "AWS" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>AWS ― 200のサービスを、少ない役割で捉える</h1>
        <Lead>
          <Link href="/infra">インフラ・クラウド・運用</Link>の入口で、クラウドは「管理をどこまで任せるか」の選択だと見ました。ここからは実際に貸し出す側です。AWSは200を超えるサービスを持ちますが、名前を端から覚える必要はありません。大半は<strong>動かす・置く・つなぐ・守る・見る・作って配る</strong>という少数の役割の組み合わせで、そのすべてが<Term>どこに置くか</Term>という地理の土台に乗っています。この2つ ― 役割の分類と地理の階層 ― を先に持っておくと、個々のサービスは後から当てはめられます。
        </Lead>
      </Hero>

      <Heading num="01">サービス名ではなく、役割で並べる</Heading>
      <p>
        新しいサービス名に出会ったとき最初に決めるのは、それが<strong>どの役割の代わりになるのか</strong>です。同じ役割の中には必ず複数の選択肢があり、違いは「どこまで自分で面倒を見るか」に集約されます ― EC2は仮想マシンを丸ごと預かる代わりにOSの世話が要り、Lambdaはコードだけ置けば動く代わりに実行時間や起動の癖を受け入れることになります。
      </p>

      <DiagramFrame
        slug="infra-aws-categories"
        aspect="760 / 340"
        caption="AWSの主要サービスを役割ごとに整理した図。動かす(コンピューティング・コンテナ)、置く(ストレージ・データベース)、つなぐ(ネットワーキングと配信・アプリケーション統合)、そして守る・見る・作って配るの6つに分かれ、そのすべてがリージョン・アベイラビリティゾーン・エッジロケーションという地理の土台に乗っている。個々の名前を覚える前に、この6つのどれに当たるかで置き場所が決まる。"
      />

      <table>
        <thead>
          <tr><th>役割</th><th>中心のサービス</th><th>決めること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">動かす</td><td>EC2、Lambda、ECS / EKS / Fargate</td><td>OSまで持つか、コンテナで運ぶか、コードだけ置くか</td></tr>
          <tr><td className="hl">置く</td><td>S3、EBS、RDS、DynamoDB</td><td><Link href="/infra/server">ブロック・ファイル・オブジェクト</Link>のどれか、リレーショナルかどうか</td></tr>
          <tr><td className="hl">つなぐ</td><td>VPC、Route 53、CloudFront、SQS、EventBridge</td><td>経路をどう区切るか、サービス同士を同期でつなぐか非同期でつなぐか</td></tr>
          <tr><td className="hl">守る</td><td>IAM、KMS、Secrets Manager</td><td>誰が何にどこまで、鍵と秘密をどこに置くか</td></tr>
          <tr><td className="hl">見る</td><td>CloudWatch、CloudTrail</td><td>何を指標として集め、誰の操作を残すか</td></tr>
          <tr><td className="hl">作って配る</td><td>CodeBuild、CodePipeline、CloudFormation / CDK</td><td>ビルドと配布、構成をコードで持つかどうか</td></tr>
        </tbody>
      </table>

      <p>
        「つなぐ」の中でも、キューやイベントを挟む非同期の連絡は設計そのものに関わります。処理を後回しにして受け付けだけ先に返す形は<Link href="/backend/jobs">非同期処理とジョブ</Link>で、出来事を発行して受け手が勝手に反応する形は<Link href="/design/architecture-event-driven">イベント駆動アーキテクチャ</Link>で扱った考え方が、そのままSQSやEventBridgeに対応します。
      </p>

      <Heading num="02">地理の土台 ― リージョン・AZ・エッジ</Heading>
      <p>
        AWSは世界に広がる1台の巨大なコンピュータではありません。<Term>リージョン</Term>という独立した地理的な拠点に分かれ、その内側が<Term>アベイラビリティゾーン(AZ)</Term>という別建物のデータセンター群に分かれています。さらに外側、利用者の最寄りには配信専用の<Term>エッジロケーション</Term>があります。
      </p>

      <DiagramFrame
        slug="infra-aws-geography"
        aspect="700 / 300"
        caption="AWSの地理構造の3階層。いちばん外のエッジロケーションが利用者の最寄りで応答し、内側のリージョンは東京やバージニア北部のように地理的に独立している。1つのリージョンは電源・空調・回線が独立した複数のアベイラビリティゾーンに分かれ、1つが丸ごと落ちても他は動き続ける。だから同じものを複数のゾーンへ分散して置くのが可用性設計の基本になる。"
      />

      <p>
        実務で効いてくるのは<strong>スコープの違い</strong>です。IAMやRoute 53は全世界で1つ、S3バケットやVPCはリージョンごとに別物、EC2インスタンスやEBSボリュームは特定のAZに属します。「同じ名前で作ったのに見えない」「別のAZのインスタンスにディスクを付け替えられない」といった詰まり方は、たいていこの階層の取り違えです。リージョンを選ぶ理由も3つに整理できます ― 利用者との距離(遅延)、データを国内に留めるといった規制、そして障害の分離です。
      </p>

      <Heading num="03">責任の分かれ目</Heading>
      <p>
        クラウドを使うと、守る範囲そのものが変わります。AWSが負うのは<strong>クラウド「の」セキュリティ</strong> ― データセンターの物理管理、ハードウェア、仮想化基盤まで。利用者が負うのは<strong>クラウド「における」セキュリティ</strong> ― OSの更新、権限設定、公開範囲、保存するデータの暗号化です。
      </p>

      <Aside label="事故はたいてい、こちら側で起きる">
        報道される「クラウドからの情報漏えい」の多くは、基盤が破られたのではなく<strong>公開範囲の設定</strong>で起きています。S3バケットを誰でも読める状態にしたまま置く、強すぎる権限をアプリに与える、鍵をリポジトリに入れる ― どれも利用者側の責任範囲です。<Link href="/security/authz">認可</Link>で扱う最小権限の原則が、そのままここに効きます。
      </Aside>

      <Heading num="04">IAM ― 全部にかかる1枚</Heading>
      <p>
        <Term>IAM</Term>は「誰が」「何に」「何をしてよいか」を決める仕組みで、他のすべてのサービスに横断的にかかります。人間のログインだけでなく、<strong>サービス同士の呼び出しも同じ枠組みで許可</strong>されるのが特徴です ― Lambdaがバケットを読めるのは、そのLambdaに付いた役割(ロール)がそれを許しているからです。
      </p>
      <p>
        設計の勘所は、認証情報を配らずに済ませることです。アクセスキーを埋め込む代わりに、実行しているリソースそのものに役割を与えれば、鍵の配布も更新も要らなくなります。<Link href="/security/token">トークンの全体像</Link>で見た「短命な資格情報を都度受け取る」という発想の、インフラ側での現れ方だと考えると位置づけやすくなります。
      </p>

      <Heading num="05">料金 ― 何に対して払っているのか</Heading>
      <p>
        従量課金は「使った分だけ」と説明されますが、実際に請求を押し上げるのは次の3つです。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>持っている時間</h4>
          <p>止め忘れたインスタンス、確保したままのIPアドレスや未使用のディスクは、使っていなくても課金され続ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>出ていくデータ</h4>
          <p>入れる側は無料でも、外へ出す通信(エグレス)には料金がかかる。配信量の多いサービスではここが主役になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>回数と保持</h4>
          <p>APIの呼び出し回数、ログの保存期間、スナップショットの世代。1件は小さく、放置すると積み上がる。</p>
        </Card>
      </CardGrid>

      <p>
        だからコスト管理は「安いサービスを選ぶ」ではなく、<strong>止める・消す・保持期間を決める</strong>の運用になります。この観点は<Link href="/infra/ops">サービス運営</Link>のコスト管理として扱います。
      </p>

      <Heading num="06">最小構成を組んでみる</Heading>
      <p>
        役割と地理が分かれば、実際の構成は素直に読めます。次の図は、Webサービスをこれらの部品で組んだときのいちばん単純な形です。
      </p>

      <DiagramFrame
        slug="infra-aws-minimal"
        aspect="760 / 300"
        caption="AWSの部品で組んだWebサービスの最小構成。Route 53で名前を解決し、CloudFrontが最寄りのエッジで受け、静的なファイルはS3から返す。動的な処理はロードバランサを経て、複数のアベイラビリティゾーンに分散したアプリの実行環境へ渡り、そこからRDSへ問い合わせる。この一列の上下に、権限を決めるIAMと、状態を記録するCloudWatch・CloudTrailが横断的にかかっている。"
      />

      <p>
        <Link href="/infra/deploy">デプロイと公開</Link>で見た「DNS・TLS・CDN・オリジン」の骨格が、そのままサービス名に置き換わっているだけだと分かります。逆に言えば、骨格を持たずにサービス名から入ると、同じことをしている部品が別物に見えてしまいます。AWSの地理構造の詳細と、各カテゴリ・個別サービス(Lambda、S3、CloudFront、SQS、CloudWatch ほか)は、この見出しの配下で個別に扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        AWSは、部品と工具が一通り揃った巨大なホームセンターです。棚(カテゴリ)の名前さえ覚えれば、商品名を知らなくても目的の売り場にはたどり着けます。困るのは、棚を見ずに商品名だけで探し始めたときで、同じ用途の商品が別の棚に何種類もあることに気づけません。
      </Analogy>

      <Heading num="まとめ">名前より、役割と置き場所</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>6つの役割に割り当てる</h4>
          <p>動かす・置く・つなぐ・守る・見る・作って配る。同じ役割の中の違いは「どこまで自分で見るか」。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スコープを取り違えない</h4>
          <p>グローバル・リージョン単位・AZ単位。可用性も「見えない」の原因も、ここで決まる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>責任は途中で分かれる</h4>
          <p>基盤は事業者、設定と権限は自分。事故の多くは後者の側で起きる。</p>
        </Card>
      </CardGrid>

      <p>
        同じ骨格を別の事業者で見ると、共通する概念と、名前だけの違いが分かれます。<Link href="/infra/gcp">Google Cloud</Link>へ進みます。
      </p>

      <DocsFooter href="/infra/aws" />
    </DocsPage>
  );
}
