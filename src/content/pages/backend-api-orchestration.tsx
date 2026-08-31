import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "オーケストレーションとBFF" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>オーケストレーションとBFF ― 画面の都合をどこで吸収するか</h1>
        <Lead>
          <Link href="/backend/api-design">API設計</Link>で、コアは汎用に、手前は画面向けに、と二層に分ける話をしました。その<Term>手前の層</Term>が何をする層なのかを、ここで具体的に見ます。中心にある問いは1つ ― <Term>画面ごとに違う都合を、どこで吸収するか</Term>です。
        </Lead>
      </Hero>

      <Aside label="名前の注意">
        ここでいうオーケストレーションは、<Link href="/design/architecture-soa">SOAのESB</Link>やコンテナの配置管理とは別の文脈です。Web APIでは<Term>複数のAPIを組み立て、呼ぶ側に1本のレスポンスとして返す層</Term>を指します。
      </Aside>

      <Heading num="01">細かいAPIだけでは足りない</Heading>
      <p>
        コアAPIをLSUD的に設計すると、<code>GET /users/1</code>・<code>GET /users/1/orders</code>・<code>GET /products/42</code>のように<Term>粒度の細かいエンドポイント</Term>が並びます。再利用性が高く、公開APIとしては正しい形です。
      </p>
      <p>
        一方、商品詳細画面を作る側は「必要な情報を1回で欲しい」と感じます。ここで効いてくるのは通信の回数そのものより、<Term>どの回線を何回またぐか</Term>です。画面とサーバーの間は遅く、サーバー同士の間は速い ― この非対称を無視して3往復すると、遅いほうを3回払うことになります。
      </p>

      <DiagramFrame
        slug="backend-api-bff"
        aspect="640 / 360"
        caption="オーケストレーション層を挟む前と後を比べた図。左は層がない状態で、画面から3つのコアAPIへ3本の線が伸び、遅い回線を3回またぐ。失敗時の処理も画面側で3回書くことになる。右は画面とコアAPIの間にBFFを挟んだ状態で、画面からBFFへの線は1本だけ、遅い回線をまたぐのは1回で済む。BFFからコアAPIへの3本は速い内部の回線で、しかも同時に投げられる。下部には境界の原則として、業務のルールは奥のコアに置き、BFFに置くのは集約と変換と認可の橋渡しだけ、と記されている。"
      />

      <Heading num="02">BFFは「特定の画面のための」バックエンド</Heading>
      <p>
        <Term>BFF</Term>(Backend for Frontend)は、この層の代表的な形です。名前のとおり、特定の呼び出し側に最適化したAPIを提供します。同じコアの上に、Web用とモバイル用のBFFを別々に置くこともあります。
      </p>

      <pre>
        <code>{`# 画面用に1本で返す
GET /bff/product-detail?productId=42

# レスポンス(コアAPI 3本分をBFFが裏で取得して組み立てる)
{
  "product":         { "id": 42, "name": "..." },
  "userTier":        "premium",
  "recentOrders":    [ ... ],
  "recommendations": [ ... ]
}`}</code>
      </pre>

      <p>
        呼ぶ側は1回で済み、コア側の<code>/users</code>・<code>/orders</code>・<code>/products</code>は他の利用者からもそのまま使えます。<Term>汎用性と最適化を、別々の層で同時に満たす</Term>のがこの構成の狙いです。
      </p>

      <Heading num="03">この層がする5つの仕事</Heading>
      <table>
        <thead>
          <tr><th>仕事</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">集約</td><td>複数の結果を1つのレスポンスにまとめる</td></tr>
          <tr><td className="hl">変換</td><td>コアの形を、画面が使いやすい形に整える</td></tr>
          <tr><td className="hl">並列呼び出し</td><td>裏で同時に叩き、待ち時間を足し算にしない</td></tr>
          <tr><td className="hl">部分的な代替</td><td>一部が失敗しても、表示できる範囲で返す</td></tr>
          <tr><td className="hl">認可の橋渡し</td><td>呼び出し元の資格を検証し、コアへ渡す</td></tr>
        </tbody>
      </table>

      <p>
        4つ目は方針の決めどころです。「おすすめ」だけ取れなかったときに<Term>画面全体を失敗にするのか、その欄だけ空で返すのか</Term> ― これは技術ではなく、どちらが利用者にとってましかという判断です。<Link href="/backend/ops-resilience">タイムアウト・リトライ・遮断</Link>と合わせて決めます。
      </p>

      <Heading num="04">実装方式は自由</Heading>
      <p>
        BFFがRESTである必要はありません。<Link href="/backend/api-styles">GraphQLやtRPC</Link>は「欲しい形だけ取る」という要件と相性がよく、この層の実装方式としてよく選ばれます。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>この層に向く理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">REST</td><td>画面ごとにエンドポイントを1本ずつ。単純で読みやすい</td></tr>
          <tr><td className="hl">GraphQL</td><td>呼ぶ側が項目を指定できる。画面差分に柔軟</td></tr>
          <tr><td className="hl">tRPC</td><td>同じ言語どうしなら型がそのまま契約になる</td></tr>
        </tbody>
      </table>

      <Aside label="Next.jsとの接続">
        <Link href="/frontend/nextjs-data">Next.jsのサーバー側</Link>で複数のAPIを呼び、画面用のデータを組み立てる書き方は、実質的にこの層と同じ役割です。<Term>BFFは必ず別サービス</Term>ではなく、フロントに近いサーバー層という理解で足ります。
      </Aside>

      <Heading num="05">肥大化させない</Heading>
      <p>
        便利さの代償として、この層には何でも置けてしまいます。業務ロジックまで寄せると、コアとBFFのどちらが正なのか分からなくなり、画面ごとにルールが食い違い始めます。守る線引きは次の4つです。
      </p>
      <ul>
        <li>在庫の引当や料金の計算といった<Term>業務のルールはコアに置く</Term></li>
        <li>BFFに置くのは、集約・変換・認可の橋渡し・通信の最適化まで</li>
        <li>コアはLSUD的に安定させ、公開の可否をそこで判断する</li>
        <li>呼び出し側が増えたら、1本に詰めるのではなく<Term>種別ごとにBFFを分ける</Term></li>
      </ul>

      <Analogy label="💡 たとえるなら">
        コアAPIは食材ごとの棚で、BFFは盛り付け担当です。注文に合わせて必要な食材を取り、1皿にして渡します。客が厨房の奥まで入って自分で組み立てなくてよくなる代わりに、盛り付け担当が独自に味付けを始めると、同じ料理が皿ごとに違う味になります。味付けは厨房の仕事です。
      </Analogy>

      <Heading num="まとめ">コアは汎用、手前は画面向け</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>遅い回線を何度もまたがない</h4>
          <p>往復の回数より、どの回線を何回またぐかが効く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>最適化は手前に閉じ込める</h4>
          <p>集約・変換・並列化を引き受け、コアは汎用のまま保つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ルールは奥に置く</h4>
          <p>BFFは盛り付け担当。味付けを始めると正が二重になる。</p>
        </Card>
      </CardGrid>

      <p>
        コアの側では、その約束をどう固定するかが次の問題になります。<Link href="/backend/api-openapi">OpenAPIと契約</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/api-orchestration" />
    </DocsPage>
  );
}
