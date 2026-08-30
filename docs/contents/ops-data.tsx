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
  title: "データ管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>データ管理 ― データをどう保存し、失わないか</h1>
        <Lead>
          サイトの機能や見た目はデプロイし直せば直せますが、ユーザーが作ったデータは一度失うと元に戻せません。<Term>どこに保存するか</Term>と<Term>失った時にどう戻すか</Term>を分けて考えます。
        </Lead>
      </Hero>

      <Heading num="01">どこにデータを置くか</Heading>
      <p>アプリが扱うデータは性質によって適した置き場所が異なります。個々のサービスの詳細は<Link href="/cloud/aws/database">データベース</Link>・<Link href="/cloud/aws/storage">ストレージ</Link>ページで扱っているため、ここでは「何を基準に選ぶか」を整理します。</p>

      <table>
        <thead>
          <tr><th>データの性質</th><th>適した置き場所</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">構造化データ・関係を持つデータ</td><td>RDB(リレーショナルDB)</td><td>ユーザー情報、注文履歴</td></tr>
          <tr><td className="hl">スキーマが柔軟・大量の書き込み</td><td>NoSQL(KVS・ドキュメントDB)</td><td>セッション、ログ、行動履歴</td></tr>
          <tr><td className="hl">ファイル本体(画像・動画・PDF)</td><td>オブジェクトストレージ</td><td>アップロード画像、バックアップファイル</td></tr>
          <tr><td className="hl">一時的・揮発してよいデータ</td><td>インメモリキャッシュ</td><td>キャッシュ済みAPIレスポンス</td></tr>
        </tbody>
      </table>

      <Heading num="02">バックアップとリストア</Heading>
      <p>バックアップは「取っておくこと」自体が目的ではなく、<Term>いざという時に、許容できる範囲で復元できること</Term>が目的です。この許容範囲を表す2つの指標があります。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>RPO(目標復旧時点)</h4>
          <p>「どこまで遡ったデータなら失ってよいか」。日次バックアップならRPOは最大24時間 ― 障害直前の24時間分のデータは失われうる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>RTO(目標復旧時間)</h4>
          <p>「障害発生から、どれだけの時間で復旧させるか」。バックアップがあっても、復元手順が未整備だとRTOは際限なく伸びる。</p>
        </Card>
      </CardGrid>

      <p>バックアップの設計指針として広く使われるのが<Term>3-2-1ルール</Term>です。①データを3つ以上のコピーとして持ち、②うち2つは異なる媒体・システムに保存し、③うち1つは物理的に離れた場所(別リージョン等)に置く、というものです。同じディスク・同じリージョンにしかコピーがなければ、そのディスク・リージョン単位の障害で両方失われます。</p>

      <Analogy label="💡 たとえるなら">
        バックアップのないシステムは「保険に入っていない家」です。火事が起きるまでは何の問題もありませんが、起きた瞬間にすべてを失います。3-2-1ルールは「重要書類の原本を金庫に、コピーを別の建物に、さらにデータ化したものをクラウドに」置くようなもので、1箇所が失われても他の2箇所が生き残る設計です。</Analogy>

      <Heading num="03">マイグレーションとスキーマ変更</Heading>
      <p>運用中のサービスでDBのスキーマ(テーブル構造)を変更する際は、既存データ・既に動いているアプリケーションを壊さないよう段階的に進める必要があります。運営側で押さえておくのは<strong>スキーマ変更は一発では終わらない</strong>という一点です。カラムの追加から旧カラムの削除まで、後方互換を保ったまま複数回のデプロイに分けて進めるため、その分の時間を見込んでおく必要があります。具体的な手順とツールの扱いは<Link href="/dev/backend/data/migration">マイグレーション</Link>で扱います。</p>

      <Heading num="まとめ">置き場所を選び、失う前提で備える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>データの性質に応じて置き場所を選ぶ</h4><p>構造・書き込み頻度・揮発してよいかで、RDB/NoSQL/オブジェクトストレージを使い分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>RPO・RTOを決めてからバックアップ方式を選ぶ</h4><p>「どこまで遡ってよいか」「どれだけ早く戻すか」を先に決める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>スキーマ変更は段階的に</h4><p>後方互換を保ちながら小さいステップで進め、いつでも切り戻せる状態を保つ。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database" tag="データベース">データベース ― 設計と運用</RelatedLink>
                    <RelatedLink href="/infra/storage" tag="インフラ">ストレージの仕組み ― NAS・SAN・RAID</RelatedLink>
                    <RelatedLink href="/cloud/aws/database" tag="AWS">データベース</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                    <RelatedLink href="/ops/cost" tag="サービス運営">コスト管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
