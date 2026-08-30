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
  title: "データベース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>データベース ― 管理されたデータの置き場所</h1>
        <Lead>
          自分でCompute Engine上にデータベースを構築することもできますが、バックアップ・パッチ適用・障害時の切り替えといった運用作業は決して軽くありません。GCPの<Term>マネージド型データベース</Term>は、この運用作業の大半を肩代わりし、利用者はデータの設計と利用に集中できるようにします。
        </Lead>
      </Hero>

      <Heading num="01">Cloud SQL ― マネージドなリレーショナルデータベース</Heading>
      <p><Term>Cloud SQL</Term>は、MySQL・PostgreSQL・SQL Serverを、GCPが構築・運用まで肩代わりして提供するサービスで、AWSの<Term>RDS</Term>に相当します。</p>

      <table>
        <thead>
          <tr><th>仕組み</th><th>目的</th><th>動き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">高可用性(HA)構成</td><td>可用性(落ちないこと)</td><td>別ゾーンに待機系を置き、障害時に自動的に切り替える</td></tr>
          <tr><td className="hl">リードレプリカ</td><td>性能(読み取りの負荷分散)</td><td>読み取り専用の複製を増やし、参照クエリを分散させる</td></tr>
        </tbody>
      </table>

      <Heading num="02">AlloyDB ― PostgreSQL互換の高性能エンジン</Heading>
      <p><Term>AlloyDB</Term>は、PostgreSQLと高い互換性を保ちながら、Google独自のストレージ層で高いスループットと可用性を実現したデータベースです。Cloud SQL上のPostgreSQLより性能を求める本番ワークロード向けの選択肢です。</p>

      <Heading num="03">Firestore ― マネージドなNoSQL</Heading>
      <p><Term>Firestore</Term>は<Term>ドキュメント型</Term>のNoSQLデータベースで、モバイル・Webアプリ向けのリアルタイム同期に強みがあります。固定のテーブルスキーマ・JOINを前提とせず、柔軟なデータモデルでスケールします。AWSの<Term>DynamoDB</Term>とはモデルが異なり、クライアントSDKからの直接アクセス(セキュリティルール付き)が特徴的です。</p>

      <Analogy label="💡 たとえるなら">
        Cloud SQLは「昔からある図書館」、AlloyDBは「最新の自動搬送システムを入れた書庫」、Firestoreは「各利用者の端末とリアルタイムで同期する共同メモ帳」に似ています。
      </Analogy>

      <Heading num="04">その他のデータベース関連サービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Memorystore</h4>
          <p>Redis・Memcached互換のマネージド型インメモリキャッシュ。<Link href="/dev/cache">キャッシュの全体像</Link>で見た役割をDBの手前で担う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>BigQuery</h4>
          <p>大量データの集計・分析に特化したサーバーレスデータウェアハウス。GCPの強みの1つで、OLAP用途向け。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Spannerはグローバル分散が必要な大規模トランザクション向け。初心者の最初の1台としてはCloud SQLが無難。</MarkNote>

      <Heading num="まとめ">「運用の肩代わり」と「モデルの違い」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Cloud SQL・AlloyDBはリレーショナル</h4><p>複雑な検索・JOINに強く、既存の知識を活かせる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Firestoreはドキュメント型NoSQL</h4><p>モバイル・Webのリアルタイム同期と柔軟なスキーマに特化。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Memorystore・BigQueryは補完役</h4><p>手前でのキャッシュ、後段での大規模分析を分担する。</p></Card>
      </CardGrid>
      <p>次のページでは「<Link href="/cloud/gcp/monitoring">モニタリングと管理</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/storage" tag="Google Cloud">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/gcp/monitoring" tag="Google Cloud">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/cloud/aws/database" tag="AWS">データベース(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
