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
        <Eyebrow>AWS</Eyebrow>
        <h1>データベース ― 管理されたデータの置き場所</h1>
        <Lead>
          自分でEC2上にデータベースを構築することもできますが、バックアップ・パッチ適用・障害時の切り替えといった運用作業は決して軽くありません。AWSの<Term>マネージド型データベース</Term>は、この運用作業の大半を肩代わりし、利用者はデータの設計と利用に集中できるようにします。
        </Lead>
      </Hero>

      <Heading num="01">RDS ― マネージドなリレーショナルデータベース</Heading>
      <p><Term>RDS(Relational Database Service)</Term>は、MySQL・PostgreSQLなど既存のリレーショナルデータベースエンジンを、AWSが構築・運用まで肩代わりして提供するサービスです。バックアップの自動取得、パッチ適用、そして次の2つの仕組みで可用性・性能を高められます。</p>

      <table>
        <thead>
          <tr><th>仕組み</th><th>目的</th><th>動き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Multi-AZ配置</td><td>可用性(落ちないこと)</td><td>別のデータセンター(AZ)に待機系を常時同期し、障害時に自動的に切り替える</td></tr>
          <tr><td className="hl">リードレプリカ</td><td>性能(読み取りの負荷分散)</td><td>読み取り専用の複製を増やし、参照クエリを分散させる</td></tr>
        </tbody>
      </table>

      <Heading num="02">Aurora ― AWS自製の高性能エンジン</Heading>
      <p><Term>Aurora</Term>はAWSが独自に開発したデータベースエンジンで、MySQL・PostgreSQLと互換性を保ちながら、ストレージ層をコンピュート層から分離することで高いスループットと耐障害性を実現しています。RDS上の選択肢の1つとして提供され、「RDSの機能に、より高い性能と可用性を載せたもの」と捉えると位置づけが分かりやすくなります。</p>

      <Heading num="03">DynamoDB ― マネージドなNoSQL</Heading>
      <p><Term>DynamoDB</Term>は<Term>キーバリュー型</Term>のNoSQLデータベースです。RDSやAuroraのような固定のテーブルスキーマ・JOINを前提とせず、<Term>パーティションキー</Term>(データの置き場所を決める主キー)による高速な読み書きに特化しています。アクセス数に応じて自動的にスケールするため、アクセス量の予測が難しいサービスや、大量の書き込みをさばく必要がある用途に向いています。</p>

      <Analogy label="💡 たとえるなら">
        RDSは「昔からある図書館」に似ています。本は分類記号(スキーマ)に従って整理され、複雑な条件での検索(JOIN)にも強いですが、蔵書のルールを大きく変えるのは大変です。Auroraはその図書館の書庫を最新の自動搬送システムに入れ替えたようなもので、見た目と使い方は同じでも中身の効率が違います。DynamoDBは「巨大なコインロッカー」で、ロッカー番号(キー)さえ分かれば一瞬で出し入れできますが、「3階のロッカーに入っている本をジャンルで検索する」といった横断的な検索は得意ではありません。
      </Analogy>

      <Heading num="04">その他のデータベース関連サービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>ElastiCache</h4>
          <p>Redis・Memcached互換のマネージド型インメモリキャッシュ。<Link href="/dev/cache">キャッシュの全体像</Link>で見た「頻繁に読むデータを高速な場所に置く」役割をデータベースの手前で担う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Redshift</h4>
          <p>大量データの集計・分析に特化したデータウェアハウス。日々の取引処理(OLTP)ではなく、後からまとめて分析する(OLAP)用途向け。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ どのデータベースを選ぶかは、<Link href="/design/methodology/data-centric">データ中心設計</Link>ページで見た「スキーマを先に固める」発想とも関わる判断になる。</MarkNote>

      <Heading num="まとめ">「運用の肩代わり」と「モデルの違い」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>RDS・Auroraはリレーショナル</h4><p>複雑な検索・JOINに強く、既存の知識をそのまま活かせる。運用はAWSが肩代わりする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DynamoDBはキーバリュー型</h4><p>キーによる高速な読み書きとスケーラビリティに特化し、柔軟なスキーマで運用できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ElastiCache・Redshiftは補完役</h4><p>手前でのキャッシュ、後段での大規模分析という、それぞれ別の役割を担う。</p></Card>
      </CardGrid>
      <p>データベースを含むすべてのサービスは、実際に「今どう動いているか」を可視化しなければ異常に気づけません。次のページでは「<Link href="/cloud/aws/monitoring">モニタリングと管理</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/design/methodology/data-centric" tag="設計">データ中心設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
