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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Google Cloud" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Google Cloud ― プロジェクトを入口にした構造</h1>
        <Lead>
          <Link href="/infra/aws">AWS</Link>で、クラウドのサービス群は少ない役割の組み合わせで捉えられると見ました。Google Cloudでも役割の分け方はほぼ同じで、<strong>名前が違うだけの対応物</strong>が並びます。だから2つ目の事業者を学ぶ手間は1つ目ほどではありません。ただし構造そのものが違う点が2つあります ― <Term>プロジェクト</Term>という請求と権限の入口があること、そして<Term>ネットワークの境界</Term>がリージョンをまたぐことです。この2つを先に押さえておけば、あとは対応表で読み替えられます。
        </Lead>
      </Hero>

      <Heading num="01">同じ役割、違う名前</Heading>
      <p>
        まず対応から見ておきます。どこまでを事業者に任せるかという段階の分け方も、地理で分割する考え方も、従量課金の性質も共通なので、名前の橋渡しができれば片方の知識はほぼそのまま使えます。
      </p>

      <table>
        <thead>
          <tr><th>役割</th><th>AWS</th><th>Google Cloud</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">仮想マシン</td><td>EC2</td><td>Compute Engine</td></tr>
          <tr><td className="hl">コンテナ実行</td><td>ECS / EKS / Fargate</td><td>GKE / Cloud Run</td></tr>
          <tr><td className="hl">関数実行</td><td>Lambda</td><td>Cloud Functions</td></tr>
          <tr><td className="hl">オブジェクトストレージ</td><td>S3</td><td>Cloud Storage</td></tr>
          <tr><td className="hl">リレーショナルDB</td><td>RDS / Aurora</td><td>Cloud SQL / Spanner</td></tr>
          <tr><td className="hl">DNS・CDN・証明書</td><td>Route 53 / CloudFront / ACM</td><td>Cloud DNS / Cloud CDN / Certificate Manager</td></tr>
          <tr><td className="hl">非同期の連絡</td><td>SQS / SNS / EventBridge</td><td>Pub/Sub / Eventarc</td></tr>
          <tr><td className="hl">監視とログ</td><td>CloudWatch</td><td>Cloud Monitoring / Cloud Logging</td></tr>
          <tr><td className="hl">秘密の管理</td><td>Secrets Manager</td><td>Secret Manager</td></tr>
          <tr><td className="hl">ビルドと配布</td><td>CodeBuild / CodePipeline</td><td>Cloud Build / Cloud Deploy</td></tr>
        </tbody>
      </table>

      <Heading num="02">プロジェクト ― 請求と権限の入口</Heading>
      <p>
        Google Cloudのすべてのリソースは、必ずどこかの<Term>プロジェクト</Term>に属します。プロジェクトは単なるフォルダではなく、<strong>請求先・IAMの権限・使えるAPIの有効化</strong>がまとめて紐づく単位です。大きな組織では、その上に会社全体を束ねる<Term>Organization</Term>と、部門や環境で仕切る<Term>Folder</Term>を置きます。
      </p>

      <DiagramFrame
        slug="infra-gcp-hierarchy"
        aspect="700 / 300"
        caption="Google Cloudのリソース階層。最上位のOrganizationは会社のドメインに紐づき、その下のFolderで部門や環境を仕切る。実際のリソースが属するのはProjectで、請求・IAM・APIの有効化はすべてこの単位で決まる。別のプロジェクトのリソースは既定では見えないため、本番と開発をプロジェクトごと分けるのが基本の使い方になる。"
      />

      <p>
        実務上の効き方は「境界がひとつ増える」ことです。本番と開発をプロジェクトごと分ければ、権限も請求も自然に分かれます。開発用の権限を持つ人が本番のリソースに触れないのは、<Link href="/security/authz">認可</Link>の設定を丁寧に書いたからではなく、そもそも別のプロジェクトだからです。AWSで同じことをしたければアカウントを分けることになるので、<strong>プロジェクトはAWSのアカウントに近い重さ</strong>だと捉えると感覚が合います。
      </p>

      <Heading num="03">リージョンとゾーン</Heading>
      <p>
        地理の階層はAWSと同じ形です。<Term>リージョン</Term>(東京なら <code>asia-northeast1</code>)が独立した地理的な拠点で、その中の<Term>ゾーン</Term>がAWSのアベイラビリティゾーンにあたります。VMやディスクは1つのゾーンに属し、リージョンをまたぐ複製は明示的に構成します。呼び名が違うだけで、可用性の設計 ― 同じものを複数のゾーンへ分散して置く ― は変わりません。
      </p>

      <Aside label="Multi-Region という第3のスコープ">
        Cloud Storageのバケットには、単一リージョンだけでなく<strong>複数リージョンにまたがる</strong>置き方があります。耐障害性は上がりますが、その分の料金と、書き込みの伝わり方(どこまで即座に一貫しているか)を確認してから選ぶ対象です。「広いほうが安全」で選ぶと、コストと整合性の両方で驚くことになります。
      </Aside>

      <Heading num="04">ネットワークの境界が違う</Heading>
      <p>
        構造の違いがはっきり出るのがネットワークです。AWSのVPCは1つのリージョンの中に閉じていますが、Google CloudのVPCは<strong>グローバルな1つのネットワーク</strong>で、その中にリージョンごとのサブネットが並びます。
      </p>

      <DiagramFrame
        slug="infra-gcp-vpc-scope"
        aspect="700 / 280"
        caption="VPCの適用範囲の違い。AWSではVPCがリージョンの中に閉じるため、別リージョンには別のVPCを作り、つなぐには追加の設定が要る。Google CloudではVPCが1つのグローバルなネットワークで、その中にリージョンごとのサブネットが並ぶため、リージョンをまたぐ通信も同じネットワークの内側の話になる。同じ名前でも境界の引き方が違うので、構成を移し替えるときはここが最初に食い違う。"
      />

      <p>
        どちらが優れているという話ではありません。境界が広いぶん設定は簡単になりますが、<strong>意図せず広くつながる</strong>ことも起こりえます。ネットワークをどこで区切り、何を通すかという判断そのものは<Link href="/security/network-defense">ネットワーク層の防御</Link>の考え方に従います。
      </p>

      <Heading num="05">動かす場所を選ぶ ― 抽象度の階段</Heading>
      <p>
        「動かす」の選択肢は、<strong>自分で面倒を見る範囲</strong>の順に並べると迷いません。下ほど自由が利き、上ほど運用が軽くなります。
      </p>

      <DiagramFrame
        slug="infra-gcp-compute-ladder"
        aspect="760 / 300"
        caption="処理を動かす4つの方法を、自分で面倒を見る範囲が広い順に並べた階段。いちばん下のCompute EngineはVMを丸ごと預かるのでOSの更新まで自分の仕事になり、そのぶん何でも動かせる。GKEはクラスタを宣言で管理し、Cloud Runはコンテナを置くだけで実行とスケールを任せられて無負荷時はゼロまで縮む。Cloud Functionsは関数1つから動かせる代わりに、実行時間や起動の癖という制約を受け入れることになる。"
      />

      <p>
        <Link href="/infra/virtualization">仮想化とコンテナ</Link>で見た「イメージにすれば同じものが同じように動く」という性質が効いてくるのがCloud Runで、コンテナイメージさえ用意できれば実行環境の面倒を見る必要がほとんどありません。逆に、常駐プロセスや特殊なミドルウェアが要るならVMまで降りることになります。<strong>先に要件を階段のどの段に置けるか</strong>を決め、そこから外れる理由が出てきたら1段下りる、という順で選ぶと選定が速くなります。
      </p>

      <Heading num="06">どちらを選ぶか</Heading>
      <p>
        機能の広さと事例の多さではAWSが先行しており、迷ったときの情報量では有利です。Google Cloudは、データ分析(BigQuery)や機械学習の周辺、そしてKubernetesを本家として扱う点に強みがあります。実務では「どちらが優れているか」より、<strong>すでに使っている道具との近さ</strong>と<strong>チームが読める資料の量</strong>で決まることがほとんどです。
      </p>
      <p>
        いずれにせよ、ここまで見てきた役割の分類・地理の階層・責任の分かれ目は事業者を問いません。だから2つ目以降は<Term>対応表で読み替える学習</Term>になります。Google Cloudの各カテゴリと個別サービス(Cloud Functions、Cloud Storage、Pub/Sub、Cloud Build ほか)は、この見出しの配下で個別に扱います。
      </p>

      <Heading num="まとめ">違うのは入口と境界</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>役割は共通、名前が違う</h4>
          <p>対応表で橋渡しできる。1つ目の事業者で作った骨格がそのまま使える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プロジェクトが請求と権限の単位</h4>
          <p>環境ごとに分ければ、権限も請求も構造として分かれる。AWSのアカウントに近い重さ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>VPCはグローバル</h4>
          <p>リージョンをまたぐ通信が内側の話になる。楽な代わりに、広がりすぎに注意する。</p>
        </Card>
      </CardGrid>

      <p>
        3つ目は、そもそも立ち位置が違う事業者です。利用者の最寄りで動くことを本業にしてきた<Link href="/infra/cloudflare">Cloudflare</Link>へ進みます。
      </p>

      <DocsFooter href="/infra/gcp" />
    </DocsPage>
  );
}
