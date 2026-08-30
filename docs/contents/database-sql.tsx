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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SQLとデータ操作",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>SQLとデータ操作 ― データベースへの共通言語</h1>
        <Lead>
          <Term>SQL</Term>は、関係データベースを操作するための共通言語です。テーブルそのものを定義する命令(DDL)と、テーブルの中身を検索・追加・更新・削除する命令(DML)に大きく分かれます。ここでは試験・実務で頻出の基本構文を、役割ごとに整理します。
        </Lead>
      </Hero>

      <Heading num="01">SQLの分類 ― DDL・DML・DCL</Heading>
      <p>SQLの命令は、何を対象にするかで3つに分類されます。</p>
      <table>
        <thead>
          <tr><th>分類</th><th>役割</th><th>主な命令</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DDL(データ定義言語)</td><td>テーブルなど入れ物の構造を定義する</td><td><code>CREATE</code>・<code>ALTER</code>・<code>DROP</code></td></tr>
          <tr><td className="hl">DML(データ操作言語)</td><td>テーブルの中身を操作する</td><td><code>SELECT</code>・<code>INSERT</code>・<code>UPDATE</code>・<code>DELETE</code></td></tr>
          <tr><td className="hl">DCL(データ制御言語)</td><td>アクセス権限やトランザクションを制御する</td><td><code>GRANT</code>・<code>REVOKE</code>・<code>COMMIT</code>・<code>ROLLBACK</code></td></tr>
        </tbody>
      </table>
      <p>テーブルの作成(<code>CREATE TABLE</code>)はDDLにあたり、その書き方は「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で見た通りです。ここでは中身を扱うDMLを中心に見ていきます。</p>

      <Heading num="02">データの検索 ― SELECT</Heading>
      <p>もっともよく使うのが、データを取り出す<Term>SELECT</Term>文です。基本形は「どの列を(<code>SELECT</code>)」「どのテーブルから(<code>FROM</code>)」「どんな条件で(<code>WHERE</code>)」の3つで組み立てます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`SELECT name, email
FROM   customers
WHERE  created_at >= '2026-01-01'
ORDER BY created_at DESC;`}</code>
      </pre>
      <p><code>WHERE</code>で行を絞り込み、<code>ORDER BY</code>で並べ替えます。条件には比較(<code>=</code>・<code>&gt;</code>など)のほか、<code>AND</code>・<code>OR</code>による組み合わせ、<code>LIKE</code>による部分一致、<code>IN</code>による複数値の指定、<code>BETWEEN</code>による範囲指定などが使えます。</p>

      <Heading num="03">集計とグループ化 ― GROUP BY</Heading>
      <p>件数や合計といった集計は、<Term>集約関数</Term>と<Term>GROUP BY</Term>で行います。集約関数には<code>COUNT</code>(件数)・<code>SUM</code>(合計)・<code>AVG</code>(平均)・<code>MAX</code>/<code>MIN</code>(最大・最小)があります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`-- 顧客ごとの注文件数と合計金額を、5件以上の顧客だけ集計する
SELECT   customer_id, COUNT(*) AS order_count, SUM(total_price) AS total
FROM     orders
GROUP BY customer_id
HAVING   COUNT(*) >= 5;`}</code>
      </pre>
      <p><code>GROUP BY</code>で指定した列の値ごとに行をまとめ、その各グループに集約関数を適用します。グループ化した<strong>後</strong>の絞り込みには<code>WHERE</code>ではなく<Term>HAVING</Term>を使う点が、試験でもよく問われる区別です。<code>WHERE</code>は集計前の individual な行に、<code>HAVING</code>は集計後のグループに効きます。</p>

      <Heading num="04">テーブルの結合 ― JOIN</Heading>
      <p>正規化で分割された複数のテーブルを、共通の列でつなぎ合わせて1つの結果にするのが<Term>結合(JOIN)</Term>です。もっとも基本的なのは、両方のテーブルに一致がある行だけを返す<Term>内部結合(INNER JOIN)</Term>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`SELECT o.id, c.name, o.total_price
FROM   orders o
JOIN   customers c ON o.customer_id = c.id;`}</code>
      </pre>
      <p>一方のテーブルには存在するが他方に一致がない行も残したい場合は<Term>外部結合(OUTER JOIN)</Term>を使います。「注文が一度もない顧客も一覧に出したい」ようなケースで、基準にする側を<code>LEFT</code>/<code>RIGHT</code>で指定します。</p>

      <Heading num="05">更新系のDMLと、ビュー・副問合せ</Heading>
      <p>データの追加・更新・削除は、それぞれ<code>INSERT</code>・<code>UPDATE</code>・<code>DELETE</code>で行います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`INSERT INTO customers (id, name, email) VALUES (10, '山田', 'yamada@example.com');
UPDATE customers SET email = 'new@example.com' WHERE id = 10;
DELETE FROM customers WHERE id = 10;`}</code>
      </pre>
      <Aside label="注意">
        <code>UPDATE</code>・<code>DELETE</code>で<code>WHERE</code>を付け忘れると、<strong>全行</strong>が対象になります。実行前に同じ条件で<code>SELECT</code>して対象を確認するのが安全です。
      </Aside>
      <p>よく使う検索は、<Term>ビュー(VIEW)</Term>として「名前の付いた仮想テーブル」に保存しておけます。実体はSELECT文で、参照するたびに元テーブルから最新の結果が得られます。また、SELECT文の中に別のSELECTを入れ子にする<Term>副問合せ(サブクエリ)</Term>を使うと、「平均以上の金額の注文だけ」といった条件を1文で表現できます。</p>

      <Analogy label="💡 たとえるなら">
        SELECTは図書館での「検索カード」です。どの棚から(<code>FROM</code>)、どんな条件の本を(<code>WHERE</code>)、どの情報だけ(<code>SELECT</code>)欲しいかを書いて渡すと、司書(DBMS)が該当する本の情報だけを揃えてくれます。JOINは「著者名簿」と「蔵書リスト」を著者IDで突き合わせる作業にあたります。
      </Analogy>

      <Heading num="まとめ">SQLは定義と操作の言語</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>DDLは器、DMLは中身</h4><p>CREATEなどでテーブルを定義し、SELECT/INSERT/UPDATE/DELETEで中身を操作します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>WHEREは行、HAVINGはグループ</h4><p>集計前の絞り込みはWHERE、GROUP BYした後の絞り込みはHAVINGです。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>JOINで分割した表をつなぐ</h4><p>正規化で分けたテーブルを、共通の列で結合して必要な形に組み立てます。</p></Card>
      </CardGrid>
      <p>SQLで安全に更新するには、複数の操作をひとまとまりで扱う仕組みが要ります。次は「トランザクションと整合性」を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
                    <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
                    <RelatedLink href="/security/sqli" tag="セキュリティ">SQLインジェクション対策</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
