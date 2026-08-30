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
  title: "AWSの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS</Eyebrow>
        <h1>AWSの基礎 ― リージョンとアベイラビリティゾーン</h1>
        <Lead>
          AWSは世界中に張り巡らされた1つの巨大なコンピュータではなく、地理的に分割された<Term>リージョン</Term>と、その内側にある独立した<Term>アベイラビリティゾーン(AZ)</Term>という階層構造でできています。この地理的な構造を先に理解しておくと、以降の各サービスページで出てくる「どこに置くか」「どこまで壊れても大丈夫か」という設計判断が読み解きやすくなります。
        </Lead>
      </Hero>

      <Heading num="01">リージョン ― 独立した地理的エリア</Heading>
      <p><Term>リージョン</Term>は、東京・バージニア北部・シンガポールなど、世界各地に置かれた完全に独立したAWSの拠点です。<code>ap-northeast-1</code>(東京)や<code>us-east-1</code>(バージニア北部)のようなIDで識別され、大半のサービスやデータはリージョンごとに分かれて存在します。あるリージョンで作ったEC2インスタンスやS3バケットは、原則として他のリージョンからは直接見えません。リージョンを分ける理由は主に3つです。</p>

      <table>
        <thead>
          <tr><th>目的</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レイテンシー</td><td>利用者に地理的に近いリージョンを選ぶことで、通信の往復時間を短くする</td></tr>
          <tr><td className="hl">データ所在地(データレジデンシー)</td><td>法規制や社内ポリシーにより、データを特定の国・地域内に留めておく</td></tr>
          <tr><td className="hl">耐障害性</td><td>あるリージョン全体で障害が起きても、別のリージョンには影響が及ばないようにする</td></tr>
        </tbody>
      </table>

      <Heading num="02">アベイラビリティゾーン(AZ) ― リージョン内の独立したデータセンター群</Heading>
      <p>1つのリージョンは、さらに複数の<Term>アベイラビリティゾーン(AZ)</Term>に分かれています。東京リージョンであれば<code>ap-northeast-1a</code>・<code>1c</code>・<code>1d</code>のように、通常3つ以上のAZで構成されます。各AZは電源・空調・ネットワークが独立した、物理的に別の建物(データセンター群)です。同じリージョン内のAZ同士は低遅延の専用回線でつながっているため、AZをまたいでも通常のアプリケーション通信には支障がない一方、片方のAZで火災や停電が起きても、もう片方のAZは影響を受けずに稼働し続けられます。</p>
      <p>この性質を利用し、<Link href="/cloud/aws/database">データベース</Link>ページで見た<Term>RDSのMulti-AZ配置</Term>のように、同じデータを複数のAZへ複製しておくことで、1つのAZが丸ごと落ちてもサービスを止めない構成が組めます。同様に<Link href="/cloud/aws/network">VPC</Link>のサブネットも1つのAZに紐づく単位であり、Webサーバーを複数のAZのサブネットへ分散配置しておくのが可用性設計の基本パターンです。</p>

      <Heading num="03">エッジロケーション ― さらに末端の配信拠点</Heading>
      <p>リージョン・AZよりもさらに数が多く、利用者の近くに置かれているのが<Term>エッジロケーション</Term>です。<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>のキャッシュ配信や、Route 53のDNS応答などはこのエッジロケーションから行われます。エッジロケーションはリージョンに従属する概念ではなく、「コンテンツの配信・応答だけを担う末端の拠点」という別レイヤーだと捉えると位置づけが分かりやすくなります。</p>

      <Heading num="04">サービスごとのスコープの違い</Heading>
      <p>すべてのAWSサービスが同じ範囲で動いているわけではありません。あるリソースを操作するとき、それが「世界共通」なのか「リージョン単位」なのか「AZ単位」なのかを意識しておくと、思わぬハマりどころを避けられます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="must">グローバル</Mark></div>
          <h4>IAM・Route 53・CloudFront</h4>
          <p>特定のリージョンに属さず、全世界で1つの設定を共有するサービス。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="must">リージョン単位</Mark></div>
          <h4>S3・DynamoDB・VPC</h4>
          <p>リージョンごとに独立して存在し、同じ名前・設定でも別リージョンでは別物として扱われる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="must">AZ単位</Mark></div>
          <h4>EC2インスタンス・サブネット・EBSボリューム</h4>
          <p>特定の1つのAZに配置され、そのAZが落ちれば単体では影響を受ける。だからこそ複数AZへの分散が重要になる。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ 例えばEBSボリュームは同じAZ内のEC2インスタンスにしかアタッチできない。別AZのインスタンスへ付け替えたい場合はスナップショットから復元し直す必要がある。</MarkNote>

      <Analogy label="💡 たとえるなら">
        リージョンは「国や都市」、AZは「その都市内にある、電源も回線も別系統の複数のビル」に似ています。同じ都市(リージョン)の中でビル(AZ)を分けて支店を構えておけば、1つのビルが停電しても他のビルの支店は営業を続けられます。エッジロケーションはさらにその先、街角ごとに置かれた「即日受け取りロッカー」で、本社(オリジン)まで行かなくても近くのロッカーで用件が済むようにする仕組みです。
      </Analogy>

      <Heading num="まとめ">「リージョン → AZ → エッジ」の3階層</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>リージョンが世界を地理的に分割する</h4><p>レイテンシー・データ所在地・耐障害性の単位。多くのリソースはリージョンをまたがない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>AZがリージョン内の独立した障害単位になる</h4><p>電源・回線が別系統のデータセンター群。複数AZへの分散が可用性設計の基本。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>エッジロケーションが利用者の最寄りを担う</h4><p>CloudFrontやRoute 53など、配信・応答に特化した末端の拠点。</p></Card>
      </CardGrid>
      <p>この地理的な土台の上に、実際に処理を動かす場所を選ぶのが次のテーマです。次のページでは「<Link href="/cloud/aws/compute">コンピューティング</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/database" tag="AWS">データベース</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
