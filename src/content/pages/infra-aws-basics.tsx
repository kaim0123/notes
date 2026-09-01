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

export const metadata: Metadata = { title: "AWSの基礎" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>AWSの基礎 ― リージョン・AZ・エッジ</h1>
        <Lead>
          <Link href="/infra/aws">AWS</Link>の見出しページで、すべてのサービスが地理の階層の上に乗っていると見ました。ここではその階層を、実務で詰まる点に絞って掘り下げます。<strong>どこに置くかを決める</strong>ことは、遅延・可用性・費用・法令のすべてを同時に決める判断です。そして「作ったはずのものが見えない」という新人が必ず一度は踏む問題も、この階層の取り違えから起きます。
        </Lead>
      </Hero>

      <Heading num="01">リージョン ― 独立した地理的な拠点</Heading>
      <p>
        <Term>リージョン</Term>は、東京・大阪・バージニア北部といった世界各地の拠点です。<code>ap-northeast-1</code> のようなIDを持ち、<strong>大半のサービスとデータはリージョンごとに分かれて存在します</strong>。あるリージョンで作ったものは、原則として他のリージョンからは直接見えません。
      </p>
      <p>
        選ぶ理由は3つあります。<strong>利用者との距離</strong>(往復の遅延はどうやっても物理の制約を受けます)、<strong>データの所在</strong>(法令や社内規程で国内に留める必要があるか)、<strong>障害の分離</strong>(リージョン全体に影響する障害から逃れられるか)。加えて実務上もう1つ ― <strong>同じサービスでもリージョンによって料金と提供状況が違う</strong>ことも判断材料になります。
      </p>

      <Heading num="02">アベイラビリティゾーン ― 障害の単位</Heading>
      <p>
        1つのリージョンは、複数の<Term>アベイラビリティゾーン(AZ)</Term>に分かれます。それぞれ電源・空調・回線が独立した別の建物群で、互いは低遅延の専用線でつながっています。つまり<strong>近いのに、壊れ方は独立している</strong>という都合のよい性質を持ちます。
      </p>

      <DiagramFrame
        slug="infra-aws-basics-multi-az"
        aspect="700 / 300"
        caption="1つのリージョン内で複数のアベイラビリティゾーンに分散した構成。ロードバランサが2つのゾーンの同じ役割のサーバーへ振り分け、データベースは片方を主系、もう片方を待機系として複製する。左のゾーンが丸ごと落ちても、応答しない側への振り分けが止まり、データベースは待機系へ切り替わるのでサービスは続く。EC2もサブネットもディスクも1つのゾーンに属するため、同じものを2つのゾーンへ置くのが可用性設計の基本になる。"
      />

      <p>
        設計としては単純で、<strong>止めたくないものは必ず2つ以上のゾーンに置く</strong>。ただし置いただけでは足りません。片方を失ったときに残りで捌けるだけの容量があるか、切り替えが自動で起きるか、切り替わったことに気づけるかまで確かめて、初めて冗長化したと言えます。
      </p>

      <Heading num="03">エッジロケーション ― 別のレイヤー</Heading>
      <p>
        リージョンやAZよりずっと数が多く、利用者の近くに置かれているのが<Term>エッジロケーション</Term>です。配信とDNSの応答を担う拠点で、<strong>リージョンに従属する概念ではありません</strong>。「コンテンツを返すためだけの末端」という別レイヤーだと捉えると位置づけを間違えません。
      </p>

      <Heading num="04">スコープの取り違えが、詰まりの原因</Heading>
      <p>
        すべてのサービスが同じ範囲で動いているわけではありません。ここが実務でいちばん引っかかります。
      </p>

      <table>
        <thead>
          <tr><th>スコープ</th><th>代表例</th><th>起きやすい詰まり</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">グローバル</td><td>IAM、Route 53、CloudFront</td><td>証明書だけは特定リージョンで発行しないと使えない、という例外がある</td></tr>
          <tr><td className="hl">リージョン単位</td><td>S3バケット、VPC、DynamoDBのテーブル</td><td>画面のリージョン切り替えを忘れて「作ったはずのものが無い」</td></tr>
          <tr><td className="hl">AZ単位</td><td>EC2インスタンス、サブネット、EBSボリューム</td><td>別のAZのインスタンスにディスクを付け替えられない</td></tr>
        </tbody>
      </table>

      <Aside label="「無い」と思ったら、まずリージョンを疑う">
        コンソールの右上に表示されているリージョンは、画面ごとに独立して効きます。前の作業で切り替えたまま別の画面を開くと、作ったばかりのものが一覧に出てきません。CLIやSDKでも同じで、既定のリージョン設定と、コード内で指定したリージョンが食い違うと、<strong>エラーではなく空の結果</strong>が返ってきます。これが原因の調査でいちばん時間を溶かすパターンです。
      </Aside>

      <Heading num="05">分ける単位はもう1つある ― アカウント</Heading>
      <p>
        地理の階層とは別に、<Term>アカウント</Term>という境界があります。本番と検証をアカウントごと分けると、権限も請求も設定の事故も完全に分離できます ― <Link href="/infra/gcp">Google Cloud</Link>のプロジェクトが担っているのと同じ役割を、AWSではアカウントが担います。
      </p>
      <p>
        小さく始めるうちは1つのアカウントでも回りますが、<strong>「本番のリソースを検証中に消してしまう」事故は、権限設定の丁寧さでは防ぎきれません</strong>。境界そのものを分けるほうが確実です。複数アカウントをまとめて管理し、請求を集約する仕組みも用意されています。
      </p>

      <Analogy label="💡 たとえるなら">
        リージョンは都市、AZはその都市にある電源も回線も別系統のビル、エッジは街角の受け取りロッカー。そしてアカウントは<strong>会社の登記そのもの</strong>です。支店を分けるのと法人を分けるのは意味が違い、後者は事故が横に漏れません。
      </Analogy>

      <Heading num="まとめ">置き場所が、性質を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>リージョンは4つの理由で選ぶ</h4>
          <p>距離・データの所在・障害の分離・料金。あとから動かすのは高くつくので最初に決める。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>AZは障害の単位</h4>
          <p>近いのに独立して壊れる。止めたくないものは2つ以上へ置き、片方で捌けるかまで確かめる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スコープを取り違えない</h4>
          <p>「無い」の大半はリージョン違い。分離したいならアカウントごと分けるのが確実。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-basics" />
    </DocsPage>
  );
}
