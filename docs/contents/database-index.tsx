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
  title: "索引とアクセス制御",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 発展</Eyebrow>
        <h1>索引とアクセス制御 ― 速さと安全のための土台</h1>
        <Lead>
          テーブル設計とトランザクションを押さえたら、次に効いてくるのが「検索をどう速くするか」と「誰にどこまで触らせるか」です。ここでは索引(インデックス)の考え方と、DBMSのアクセス制御の基本を、発展トピックとして概観します。
        </Lead>
      </Hero>

      <Heading num="01">インデックス ― 巻末索引で検索を速くする</Heading>
      <p><Term>インデックス(索引)</Term>は、本の巻末索引のように「この値を持つ行はどこにあるか」をあらかじめ整列させておくデータ構造です。インデックスがない状態で特定の行を探すと、テーブルを先頭から1行ずつ確認する<Term>フルスキャン</Term>になりますが、検索対象の列にインデックスがあれば、その値から該当行の位置を素早く辿れます。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>仕組み</th><th>得意なこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">B-treeインデックス</td><td>値を木構造で整列して保持する。もっとも一般的</td><td>範囲検索(<code>&gt;</code>・<code>BETWEEN</code>)や並べ替えにも効く</td></tr>
          <tr><td className="hl">ハッシュインデックス</td><td>値をハッシュ関数で位置に変換する</td><td>完全一致(<code>=</code>)の検索が高速。範囲検索は苦手</td></tr>
        </tbody>
      </table>
      <p>主キーには自動でインデックスが張られます。それ以外でも、頻繁に検索・結合(JOIN)の条件に使う列には明示的にインデックスを作成します。ただし万能ではなく、行を追加・更新・削除するたびにインデックスも更新されるため、張りすぎると<strong>書き込みが遅くなり</strong>、保存領域も増えます。「よく検索する列に絞って張る」のが基本です。</p>

      <Analogy label="💡 たとえるなら">
        インデックスは辞書の「つめ(インデックスタブ)」や巻末索引です。目的の語を1ページ目から探す代わりに、索引から一気にページを開けます。ただし本を改訂するたびに索引も作り直す手間がかかるのと同じで、更新のコストは増えます。
      </Analogy>

      <Heading num="02">アクセス制御 ― 誰に何を許すか</Heading>
      <p>データベースには、利用者やアプリごとに「どのテーブルに、どんな操作を許すか」を設定する<Term>アクセス制御</Term>の仕組みがあります。SQLでは<code>GRANT</code>で権限を付与し、<code>REVOKE</code>で剥奪します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`GRANT SELECT, INSERT ON orders TO app_user;  -- 参照と追加だけ許可
REVOKE INSERT ON orders FROM app_user;       -- 追加の許可を取り消す`}</code>
      </pre>
      <p>アプリ用のアカウントには必要最小限の権限だけを与える(<Term>最小権限の原則</Term>)のが基本です。特定の列だけを見せたい場合は、<Term>ビュー</Term>を経由させて、元テーブルへの直接アクセスを禁じる方法も使われます。こうしたアクセス制御は、SQLインジェクションなどの攻撃による被害範囲を抑えるうえでも重要です(「<Link href="/security/sqli">SQLインジェクション対策</Link>」)。</p>

      <Heading num="まとめ">速さと安全の2軸</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>インデックスは検索を速く、書き込みを重く</h4><p>B-treeやハッシュで検索を高速化する代わりに、更新時の維持コストがかかります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>権限は最小限に</h4><p>GRANT/REVOKEで、アプリや利用者に必要な操作だけを許可します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
                    <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
                    <RelatedLink href="/security/sqli" tag="セキュリティ">SQLインジェクション対策</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
