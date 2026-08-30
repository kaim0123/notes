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
  title: "データベースの役割と種類",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>データベースの役割と種類 ― なぜファイルではダメなのか</h1>
        <Lead>
          データをCSVやJSONのファイルに書き込むだけでも記録はできます。それでもわざわざ<Term>データベース</Term>という専用の仕組みを使うのは、複数人の同時利用・整合性の保証・高速な検索・障害からの回復といった、自前では作り込みにくい課題をまとめて解決してくれるからです。まずその役割を押さえ、続いてデータベースの代表的な種類を俯瞰します。
        </Lead>
      </Hero>

      <Heading num="01">DBMSの役割 ― ファイル管理との違い</Heading>
      <p>データベースそのものを管理するソフトウェアを<Term>DBMS(データベース管理システム)</Term>と呼びます。ファイルに直接読み書きする方式と比べると、DBMSが引き受けてくれる仕事の多さが役割の違いになります。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>ファイル管理(CSV/JSONなど)</th><th>DBMS</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同時アクセス</td><td>複数プロセスの同時書き込みで壊れやすい</td><td>ロックや<Term>トランザクション</Term>で安全に調停する</td></tr>
          <tr><td className="hl">整合性</td><td>チェックする仕組みを自前で書く必要がある</td><td><Term>制約(NOT NULL・UNIQUEなど)</Term>をDBMS自身が強制する</td></tr>
          <tr><td className="hl">検索</td><td>基本は全件読み込んで自前でフィルタ</td><td>SQLと<Term>インデックス</Term>で必要な行だけ高速に取得</td></tr>
          <tr><td className="hl">障害回復</td><td>途中で失敗すると中途半端な状態が残る</td><td>ログ・バックアップで一貫した状態に戻せる</td></tr>
        </tbody>
      </table>
      <p>特に重要なのが<Term>同時実行制御</Term>と<Term>障害回復</Term>です。複数の利用者が同じデータを同時に更新しても矛盾が起きないように調停し、途中で障害が起きても「全部成功か、全部なかったことにするか」をDBMSが保証します。この仕組みの中身は「<Link href="/database/transaction">トランザクションと整合性</Link>」で詳しく見ていきます。</p>

      <Analogy label="💡 たとえるなら">
        ファイル管理は「1冊のノートに全員が同時に書き込む」ようなものです。誰かが書いている途中で別の人も書き始めれば、すぐにぐちゃぐちゃになります。DBMSは「窓口の受付係」を立てて、順番や整合性を管理しながら記帳を代行してくれる仕組みです。
      </Analogy>

      <Heading num="02">データベースの種類 ― モデルによる分類</Heading>
      <p>データベースは、データをどんな構造で表すか(<Term>データモデル</Term>)によって種類が分かれます。現在の主流は表形式の関係データベースですが、用途に応じてさまざまな方式が使われます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>データの持ち方</th><th>主な用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">関係データベース(RDB)</td><td>行と列を持つ表(テーブル)。SQLで操作</td><td>業務システム全般。事実上の標準</td></tr>
          <tr><td className="hl">階層型・網型</td><td>データを木構造・網目状につなぐ(RDB以前の古典的モデル)</td><td>汎用機時代のシステムなど</td></tr>
          <tr><td className="hl">NoSQL(キーバリュー型・ドキュメント型など)</td><td>柔軟な構造。表に縛られない</td><td>大量データ・高速アクセス・スキーマが定まらない用途</td></tr>
          <tr><td className="hl">分散データベース</td><td>複数のサーバーにデータを分散して保持</td><td>大規模・高可用が求められるサービス</td></tr>
        </tbody>
      </table>
      <p>このセクションでは、もっとも広く使われる<Term>関係データベース(RDB)</Term>を軸に解説します。RDBは1970年にE. F. Coddが提唱した<Term>関係モデル</Term>にもとづき、データをすべて表として表現し、<Term>SQL</Term>という共通言語で操作します。MySQL・PostgreSQL・Oracle Database・SQL Serverなど、広く使われるDBMSの多くがこのモデルを実装しています。</p>

      <Heading num="まとめ">DBMSが引き受ける仕事</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>DBMSは整合性と同時実行を保証する</h4><p>ファイル管理では作り込みづらい制約・同時アクセス・検索・回復を、DBMS自身が担います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>種類はデータモデルで分かれる</h4><p>関係DB・階層型/網型・NoSQL・分散DBなど。現在の主流は表形式の関係DBです。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>RDBはSQLで操作する</h4><p>データを表として表し、共通言語SQLで検索・更新します。次はその表の仕組みを見ます。</p></Card>
      </CardGrid>
      <p>次は、RDBがデータを表でどう表し、論理と物理をどう分けて考えるのか、「関係モデルと3層スキーマ」を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
                    <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
                    <RelatedLink href="/database" tag="データベース">データベース(開発者向け)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
