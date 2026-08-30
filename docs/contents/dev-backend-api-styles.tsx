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
  title: "APIの種類と選び方 ― REST・GraphQL・gRPC…",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>APIの種類と選び方 ― REST・GraphQL・gRPC…</h1>
        <Lead>
          「<Link href="/dev/backend/api">API ― システム同士をつなぐ窓口</Link>」で、APIは「窓口」だと見ました。実はその窓口には<b>いくつかの流儀(方式)</b>があります。<Term>REST</Term>・<Term>GraphQL</Term>・<Term>gRPC</Term>…どれも目的は同じ「頼んで返す」ですが、<b>頼み方の形式と得意分野</b>が違います。名前に圧倒されないよう、大きく捉えるところから始めます。
        </Lead>
      </Hero>

      <Heading num="01">まず全体像 ― 方式は「通信の作法」の違い</Heading>
      <p>方式を10個並べられても選べません。まずは大きく<b>3つのグループ</b>に分けて捉えると、それぞれの立ち位置が見えてきます。</p>
      <table>
        <thead>
          <tr><th>グループ</th><th>代表的な方式</th><th>ひとことで</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Web標準系</td><td><b>REST</b> / GraphQL</td><td>Webで最も普及。迷ったらまずREST</td></tr>
          <tr><td className="hl">高速・内部通信系</td><td><b>gRPC</b> / tRPC / JSON-RPC</td><td>サーバー間や、型を揃えたいときに強い</td></tr>
          <tr><td className="hl">DB特化・クエリ系</td><td>OData / SQL over HTTP / Gremlin / Cypher / SPARQL</td><td>特定の種類のDBと強く結びつく</td></tr>
        </tbody>
      </table>
      <p>初心者がまず出会うのは、ほぼ<b>Web標準系のREST</b>です。まずはRESTを軸にし、必要になったときに他を知れば十分です。</p>

      <Heading num="02">主要3方式の違い</Heading>
      <p>実務で目にする頻度が高い3つ、<Term>REST</Term>・<Term>GraphQL</Term>・<Term>gRPC</Term>を比べます。細かい仕様よりも、「どういうときに向くか」を掴んでください。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>REST</th><th>GraphQL</th><th>gRPC</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">頼み方</td><td>URL＋HTTPメソッド</td><td>1つの窓口に「欲しい形」をクエリで指定</td><td>高速なバイナリでやりとり</td></tr>
          <tr><td className="hl">得意</td><td>汎用的で学びやすい</td><td>必要なデータだけを過不足なく取得</td><td>サーバー間の高速通信</td></tr>
          <tr><td className="hl">主な使い所</td><td>一般的なWeb・公開API</td><td>画面ごとに必要データが違うアプリ</td><td>社内のサービス間通信(マイクロサービス)</td></tr>
          <tr><td className="hl">初心者</td><td>◎ まずこれ</td><td>△ 慣れてから</td><td>△ 用途が来たら</td></tr>
        </tbody>
      </table>
      <p>まず押さえるべき<b>REST</b>の設計(URL・メソッド・ステータスコード)は、「<Link href="/dev/backend/api/rest">REST API</Link>」で詳しく掘り下げます。</p>
      <Analogy label="💡 たとえるなら">
        <b>REST</b>は定食屋。「A定食ください」と決まった単位で頼みます。品目は固定で分かりやすい反面、少しだけ組み合わせを変えたいと融通が利きにくいことも。<b>GraphQL</b>はビュッフェ。「ご飯少なめ・唐揚げ2個・味噌汁なし」と欲しいものだけ正確に取れます。<b>gRPC</b>は厨房どうしの内線電話。客(ブラウザ)向けではなく、店員(サーバー)どうしが最速で連携するための専用回線です。
      </Analogy>

      <Heading num="03">データベースとの相性</Heading>
      <p>方式ごとに「このDBと相性がいい」という表を見かけます。ただし、その表の読み方には<b>大事な注意点</b>があります。</p>
      <Aside label="⚠️ 相性表の読み方(最重要)">
        相性表は「<b>この組み合わせしか使えない</b>」という意味では<b>ありません</b>。原則として<b>APIとDBは独立</b>していて、どんな方式のAPIでも、どんなDBの前に置けます(奥のバックエンドが橋渡しするため)。表が示すのは、あくまで「<b>自然でよく使われる組み合わせ</b>」です。制約ではなく、傾向として眺めてください。
      </Aside>
      <div className="my-5 overflow-x-auto">
        <table>
          <thead>
            <tr><th>方式</th><th>RDB</th><th>ドキュメントDB</th><th>Key-Value</th><th>時系列DB</th><th>グラフDB</th><th>オブジェクトストレージ</th></tr>
          </thead>
          <tbody>
            <tr><td className="hl">REST</td><td>◎</td><td>◎</td><td>○</td><td>◎</td><td>○</td><td>◎</td></tr>
            <tr><td className="hl">GraphQL</td><td>◎</td><td>◎</td><td>△</td><td>△</td><td>○</td><td>×</td></tr>
            <tr><td className="hl">gRPC</td><td>◎</td><td>◎</td><td>◎</td><td>◎</td><td>◎</td><td>○</td></tr>
            <tr><td className="hl">tRPC</td><td>◎</td><td>◎</td><td>△</td><td>△</td><td>△</td><td>×</td></tr>
            <tr><td className="hl">JSON-RPC</td><td>○</td><td>○</td><td>◎</td><td>△</td><td>△</td><td>×</td></tr>
            <tr><td className="hl">OData</td><td>◎</td><td>△</td><td>×</td><td>×</td><td>×</td><td>×</td></tr>
            <tr><td className="hl">SQL over HTTP</td><td>◎</td><td>×</td><td>×</td><td>△</td><td>×</td><td>×</td></tr>
            <tr><td className="hl">Gremlin API</td><td>×</td><td>×</td><td>×</td><td>×</td><td>◎</td><td>×</td></tr>
            <tr><td className="hl">Cypher API</td><td>×</td><td>×</td><td>×</td><td>×</td><td>◎</td><td>×</td></tr>
            <tr><td className="hl">SPARQL</td><td>×</td><td>×</td><td>×</td><td>×</td><td>◎(RDF)</td><td>×</td></tr>
          </tbody>
        </table>
      </div>
      <p>表の中でも、例外的に<b>相性が強く固定される</b>ものだけ覚えておけば十分です。グラフDB専用の<Term>Gremlin</Term>・<Term>Cypher</Term>・<Term>SPARQL</Term>は、そのDBのためのクエリ言語なので他ではほぼ使えません。逆に<Term>SQL over HTTP</Term>や<Term>OData</Term>は、表形式のRDBを前提にした方式です。それ以外(REST・gRPCなど汎用の方式)は、どのDBの前にも置ける「なんでも使える窓口」だと考えてください。</p>
      <Analogy label="💡 たとえるなら">
        DBは「倉庫の中身」、APIの方式は「受付の言葉づかい」です。倉庫が同じでも、受付の話し方(REST/GraphQL…)は自由に選べます。ただし「地図専門の倉庫(グラフDB)」には「地図用の言葉(Cypher など)」がいちばん通じる、というのがこの表の言いたいことです。
      </Analogy>

      <Heading num="まとめ">迷ったらRESTから</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>方式＝頼み方の作法</h4><p>目的は同じ「頼んで返す」。形式と得意分野が違うだけです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>まずはREST</h4><p>最も普及し学びやすい。他は必要になったときで十分です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>相性表は「傾向」</h4><p>制約ではなく、よくある組み合わせ。APIとDBは基本独立です。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api" tag="開発">API ― システム同士をつなぐ窓口</RelatedLink>
            <RelatedLink href="/dev/backend/api/rest" tag="開発">REST API</RelatedLink>
            <RelatedLink href="/dev/frontend/http" tag="開発">HTTP通信(Fetch・axios)</RelatedLink>
            <RelatedLink href="/dev/backend/express" tag="開発">Express</RelatedLink>
            <RelatedLink href="/database" tag="データベース">データベース 一覧</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
