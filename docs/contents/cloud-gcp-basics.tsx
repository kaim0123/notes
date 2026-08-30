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
  title: "Google Cloudの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>Google Cloudの基礎 ― プロジェクトとリージョン・ゾーン</h1>
        <Lead>
          GCPは1つの巨大なコンピュータではなく、<Term>プロジェクト</Term>という単位でリソースを区切り、その中で<Term>リージョン</Term>と<Term>ゾーン</Term>という地理的な階層に沿ってサービスを配置します。<Link href="/cloud/aws/basics">AWSの基礎</Link>で見たリージョン・AZに相当する考え方を、GCP固有の「誰のリソースか(プロジェクト)」という軸とあわせて押さえておきましょう。
        </Lead>
      </Hero>

      <Heading num="01">プロジェクト ― リソースの入れ物</Heading>
      <p><Term>プロジェクト</Term>は、GCP上のすべてのリソース(VM・バケット・データベースなど)を束ねる最小の管理単位です。請求・IAM・API有効化はプロジェクト単位で行われ、<code>my-app-prod</code>のような一意のIDで識別されます。大規模な組織では<Term>Organization</Term> → <Term>Folder</Term> → <Term>Project</Term>という階層で複数プロジェクトをまとめ、部門や環境(本番・開発)ごとに分けることが多いです。</p>

      <table>
        <thead>
          <tr><th>階層</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Organization</td><td>会社全体のGCP利用を統括する最上位。ドメインに紐づく。</td></tr>
          <tr><td className="hl">Folder</td><td>部門・チーム単位でプロジェクトをグループ化する中間層(任意)。</td></tr>
          <tr><td className="hl">Project</td><td>実際のリソースと請求が紐づく単位。ほとんどの操作はここを指定する。</td></tr>
        </tbody>
      </table>

      <Heading num="02">リージョン ― 独立した地理的エリア</Heading>
      <p><Term>リージョン</Term>は、東京(<code>asia-northeast1</code>)・アイオワ(<code>us-central1</code>)など、世界各地に置かれたGCPの拠点です。<Link href="/cloud/aws/basics">AWS</Link>のリージョンと同様、レイテンシー・データ所在地・耐障害性の単位として選びます。多くのリソースはリージョンごとに独立して存在し、あるリージョンで作ったVMやバケットは、原則として他リージョンから直接は見えません。</p>

      <Heading num="03">ゾーン ― リージョン内の独立したデータセンター群</Heading>
      <p>1つのリージョンは、複数の<Term>ゾーン</Term>に分かれています。東京リージョンであれば<code>asia-northeast1-a</code>・<code>1-b</code>・<code>1-c</code>のように、通常3つ以上のゾーンで構成されます。各ゾーンは電源・空調・ネットワークが独立した物理的に別のデータセンター群で、AWSの<Term>アベイラビリティゾーン(AZ)</Term>に相当します。同じリージョン内のゾーン同士は低遅延で接続されているため、<Link href="/cloud/gcp/database">Cloud SQL</Link>の高可用性構成や<Link href="/cloud/gcp/network">VPC</Link>のサブネット分散の基本単位になります。</p>

      <Heading num="04">Multi-Region とエッジ ― さらに広いスコープ</Heading>
      <p>一部のサービスは、単一リージョンではなく<Term>Multi-Region</Term>(複数リージョンにまたがる)や<Term>Dual-Region</Term>(2リージョン)で提供されます。<Link href="/cloud/gcp/storage/cloud-storage">Cloud Storage</Link>の<code>US</code>や<code>EU</code>バケット、<Link href="/cloud/gcp/database">Firestore</Link>のマルチリージョン配置などが該当します。また、<Link href="/cloud/gcp/network/cloud-cdn">Cloud CDN</Link>のキャッシュ配信は、Googleのグローバルエッジネットワークから行われ、リージョンに従属する概念ではありません。</p>

      <Heading num="05">サービスごとのスコープの違い</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="must">グローバル</Mark></div>
          <h4>IAM・Cloud DNS(ゾーン)・Artifact Registry(一部)</h4>
          <p>特定のリージョンに属さず、プロジェクトまたは組織全体で共有される設定。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="must">リージョン単位</Mark></div>
          <h4>VPC・Cloud SQL・GKEクラスター</h4>
          <p>リージョンごとに独立して存在し、同じ名前でも別リージョンでは別物として扱われる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="must">ゾーン単位</Mark></div>
          <h4>Compute Engine VM・Persistent Disk・サブネット</h4>
          <p>特定の1つのゾーンに配置され、そのゾーンが落ちれば単体では影響を受ける。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Persistent Diskは同じゾーン内のVMにしかアタッチできない。別ゾーンへ移す場合はスナップショットから復元し直す必要がある。</MarkNote>

      <Analogy label="💡 たとえるなら">
        プロジェクトは「1つの事業部が借りているオフィスフロア」、リージョンは「都市」、ゾーンは「その都市内にある、電源も回線も別系統の複数のビル」に似ています。AWSの「アカウント → リージョン → AZ」に対し、GCPは「プロジェクト → リージョン → ゾーン」という並びで、請求と権限の入口がプロジェクトにある点が大きな違いです。
      </Analogy>

      <Heading num="まとめ">「プロジェクト → リージョン → ゾーン」の3階層</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>プロジェクトがリソースと請求の単位</h4><p>すべての操作はプロジェクトを指定して行い、Organization/Folderで大規模に整理できる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リージョンが地理的な分割単位</h4><p>レイテンシー・データ所在地・耐障害性を決める。多くのリソースはリージョンをまたがない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ゾーンがリージョン内の障害単位</h4><p>複数ゾーンへの分散が可用性設計の基本。Multi-Regionサービスはさらにその上のスコープ。</p></Card>
      </CardGrid>
      <p>この土台の上に、実際に処理を動かす場所を選ぶのが次のテーマです。次のページでは「<Link href="/cloud/gcp/compute">コンピューティング</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/compute" tag="Google Cloud">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/gcp/network" tag="Google Cloud">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/basics" tag="AWS">AWSの基礎</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
