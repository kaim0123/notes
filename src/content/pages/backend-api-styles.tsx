import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "APIの種類と選び方" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>APIの種類と選び方 ― 違うのは頼み方だけ</h1>
        <Lead>
          <Link href="/backend/api">API</Link>は窓口だと見ました。その窓口には<Term>いくつかの流儀</Term>があります。REST・GraphQL・gRPC ― どれも目的は同じ「頼んで返す」で、違うのは<Term>頼み方の形式と得意分野</Term>だけです。名前の多さに圧倒されないよう、大きく捉えるところから始めます。
        </Lead>
      </Hero>

      <Heading num="01">まず3つのグループに分ける</Heading>
      <p>
        方式を10個並べられても選べません。大きく3つに分けて捉えると、それぞれの立ち位置が見えてきます。
      </p>

      <table>
        <thead>
          <tr><th>グループ</th><th>代表</th><th>ひとことで</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Web標準系</td><td><strong>REST</strong> / GraphQL</td><td>Webで最も普及。迷ったらまずREST</td></tr>
          <tr><td className="hl">高速・内部通信系</td><td><strong>gRPC</strong> / tRPC / JSON-RPC</td><td>サーバー間や、型を揃えたいときに強い</td></tr>
          <tr><td className="hl">データベース特化系</td><td>OData / Gremlin / Cypher / SPARQL</td><td>特定の種類のデータベースと強く結びつく</td></tr>
        </tbody>
      </table>

      <p>
        最初に出会うのは、ほぼ<Term>Web標準系のREST</Term>です。まずRESTを軸にし、必要になったときに他を知れば足ります。
      </p>

      <Heading num="02">主要3方式は、往復の回数と余りの量が違う</Heading>
      <p>
        実務で目にする頻度が高い3つを、同じ画面を描く場面で比べます。細かい仕様よりも、<Term>どういうときに向くか</Term>を掴むのが目的です。
      </p>

      <DiagramFrame
        slug="backend-api-styles-shape"
        aspect="640 / 300"
        caption="同じ1画面を描くのに必要なやり取りが方式ごとにどう変わるかを示した図。RESTは3つのURLへ3往復し、それぞれ画面で使わない項目まで丸ごと返る。GraphQLは1つの窓口へ欲しい形を送り、1往復で過不足のない形が返る代わりに、サーバー側の作りが複雑になる。gRPCは先に決めた型に沿ったバイナリで1往復し、人間には読めない代わりにサーバー間で速い。違いは往復の回数と、返ってくる中身の余りの量にある。"
      />

      <table>
        <thead>
          <tr><th>観点</th><th>REST</th><th>GraphQL</th><th>gRPC</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">頼み方</td><td>URL＋HTTPメソッド</td><td>1つの窓口に欲しい形を指定</td><td>先に決めた型のバイナリ</td></tr>
          <tr><td className="hl">得意</td><td>汎用的で学びやすい</td><td>必要なデータだけを取れる</td><td>サーバー間の高速通信</td></tr>
          <tr><td className="hl">主な使い所</td><td>一般的なWeb・公開API</td><td>画面ごとに必要データが違うアプリ</td><td>社内のサービス間通信</td></tr>
          <tr><td className="hl">代償</td><td>画面によっては往復が増える</td><td>サーバー側の複雑さ・重いクエリ対策</td><td>ブラウザから直接は呼びにくい</td></tr>
        </tbody>
      </table>

      <p>
        表の「代償」の列が選択の要です。GraphQLは往復を減らす代わりに、<Term>いくらでも重いクエリを書けてしまう</Term>という問題を持ち込みます。gRPCは速い代わりに、ブラウザから直接呼ぶには仲介が要ります。RESTの往復の多さは、<Link href="/backend/api-orchestration">オーケストレーションとBFF</Link>という別の解き方も持っています。
      </p>

      <Heading num="03">データベースとの相性表の読み方</Heading>
      <p>
        方式ごとに「このデータベースと相性がいい」という表を見かけます。ただし読み方に注意が要ります。
      </p>

      <Aside label="相性表は制約ではなく傾向">
        相性表は<Term>この組み合わせしか使えない</Term>という意味ではありません。原則としてAPIとデータベースは独立していて、どんな方式の窓口でも、どんなデータベースの前に置けます ― 間でバックエンドが橋渡しするからです。表が示すのは、あくまで<Term>自然でよく使われる組み合わせ</Term>です。
      </Aside>

      <p>
        例外的に相性が固定されるものだけ覚えておけば十分です。グラフデータベース専用の<Term>Gremlin・Cypher・SPARQL</Term>は、そのデータベースのための問い合わせ言語なので他ではほぼ使えません。逆に<Term>OData</Term>は表形式を前提にした方式です。それ以外の汎用の方式は、どのデータベースの前にも置ける「なんでも使える窓口」だと考えてください。
      </p>

      <Heading num="04">選び方の順序</Heading>
      <p>
        判断は上から順に行い、下に行くほど「本当に要るのか」を疑います。
      </p>

      <table>
        <thead>
          <tr><th>問い</th><th>Yesなら</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">相手がブラウザ、または不特定多数か</td><td>REST。契約は<Link href="/backend/api-openapi">機械可読な仕様</Link>で固定する</td></tr>
          <tr><td className="hl">画面ごとに必要な項目が大きく違い、往復が問題になっているか</td><td>GraphQL、または<Link href="/backend/api-orchestration">BFF</Link>で解けないかを先に検討</td></tr>
          <tr><td className="hl">呼ぶ側も自分たちで、性能と型が最優先か</td><td>gRPC(社内のサービス間)</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        RESTは定食屋で、「A定食ください」と決まった単位で頼みます。分かりやすい反面、少しだけ組み合わせを変えたいと融通が利きません。GraphQLはビュッフェで、欲しいものだけ正確に取れる代わりに、盛りすぎる客をどう止めるかという別の悩みが生まれます。gRPCは厨房どうしの内線電話で、客向けではなく店員どうしが最速で連携するための専用回線です。
      </Analogy>

      <Heading num="まとめ">迷ったらRESTから</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>方式は頼み方の作法</h4>
          <p>目的はどれも同じ。形式と得意分野が違うだけ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>まずはREST</h4>
          <p>最も普及し学びやすい。他は必要になってからで足りる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>相性表は傾向</h4>
          <p>制約ではない。APIとデータベースは基本的に独立している。</p>
        </Card>
      </CardGrid>

      <p>
        次は、その最も普及している方式を掘り下げます。<Link href="/backend/api-rest">REST API</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/api-styles" />
    </DocsPage>
  );
}
