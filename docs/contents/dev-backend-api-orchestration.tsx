import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  Diagram,
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
  title: "オーケストレーションとBFF",
};

const layer =
  "rounded-lg border border-border px-4 py-3 text-[0.9rem] font-medium";

const codeBlock =
  "my-5 overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>オーケストレーションとBFF ― 画面向けの窓口を挟む</h1>
        <Lead>
          「<Link href="/dev/backend/api/design">API設計 ― 誰のための窓口か</Link>」で、<Term>SSKD</Term>向けはユースケースに最適化してよいと見ました。しかし画面が増えるほど「細かいリソースAPIをフロントが何本も呼ぶ」問題が起きます。ここでは、汎用の<Term>コアAPI</Term>と画面の間に<Term>オーケストレーション層</Term>を挟む考え方——とくに<Term>BFF</Term>(Backend for Frontend)——を整理します。
        </Lead>
      </Hero>

      <Aside label="⚠️ 名前の注意">
        ここでいう「オーケストレーション」は、<Link href="/design/architecture/sys/soa">SOAのESB</Link>や<Link href="/infra/container/kubernetes">Kubernetes</Link>のコンテナ管理とは<b>別の文脈</b>です。Web APIでは「<b>複数のAPIやサービスを組み立て、クライアント向けに1本のレスポンスにまとめる層</b>」を指します。
      </Aside>

      <Heading num="01">なぜ層を挟むのか ― 細かいAPIだけでは足りない</Heading>
      <p>コアAPIを<Term>LSUD</Term>的に設計すると、<code>GET /users/1</code>・<code>GET /users/1/orders</code>・<code>GET /products/42</code>のように<b>粒度の細かいエンドポイント</b>が並びます。これは再利用性が高く、公開APIとしては正しい形です。</p>
      <p>一方、商品詳細画面を作るフロントエンドエンジニア(SSKD)は、「ユーザー情報・注文履歴・おすすめ商品を<b>1回の通信</b>で欲しい」と感じます。フロントが5本のAPIを順番に呼び、結果を組み立て、エラー処理を5回書くのは非効率で、通信遅延も積み上がります。</p>
      <p>このギャップを埋めるのが<b>オーケストレーション層</b>です。複数のコアAPIを裏で呼び、画面に必要な形にまとめて返します。コアAPIは汎用のまま保ち、画面都合の最適化は手前の層に閉じ込めます。</p>

      <Heading num="02">BFFとは ― フロント向けの専用バックエンド</Heading>
      <p><Term>BFF</Term>(Backend for Frontend)は、オーケストレーション層の代表的な形です。名前の通り、<b>特定のフロント(Web・iOS・Androidなど)向けに最適化したAPI</b>を提供します。同じコアAPIの上に、Web用BFFとモバイル用BFFを別々に置くこともあります。</p>

      <Diagram caption="BFFがコアAPIを組み立て、画面向けに1本で返す">
        <div className="mx-auto flex max-w-md flex-col gap-2 text-left">
          <div className={`${layer} bg-card`}>Webアプリ</div>
          <div className="text-center text-muted-foreground">↓ 1リクエスト</div>
          <div className={`${layer} bg-accent/10 border-accent/40`}>Web BFF</div>
          <div className="grid grid-cols-3 gap-2 text-center text-[0.8rem] text-muted-foreground">
            <span>↓</span><span>↓</span><span>↓</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`${layer} text-[0.8rem]`}>users API</div>
            <div className={`${layer} text-[0.8rem]`}>orders API</div>
            <div className={`${layer} text-[0.8rem]`}>products API</div>
          </div>
        </div>
      </Diagram>

      <p>たとえば商品詳細画面用に、BFFが次のようなエンドポイントを提供します。</p>
      <pre className={codeBlock}>
        <code>{`// SSKD向け: 画面用に1本で返す
GET /bff/product-detail?productId=42&userId=1

// レスポンス(コアAPI 3本分をBFFが裏で取得して組み立て)
{
  "product": { "id": 42, "name": "..." },
  "userTier": "premium",
  "recentOrders": [ ... ],
  "recommendations": [ ... ]
}`}</code>
      </pre>
      <p>フロントは1回呼ぶだけで済みます。コア側の<code>/users</code>・<code>/orders</code>・<code>/products</code>は、他の利用者(公開API・別システム)からもそのまま使えます。</p>

      <Heading num="03">オーケストレーション層の仕事</Heading>
      <table>
        <thead>
          <tr><th>仕事</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">集約</td><td>複数APIの結果を1レスポンスにまとめる</td></tr>
          <tr><td className="hl">変換</td><td>コアAPIのJSONを画面用の形に整形する</td></tr>
          <tr><td className="hl">並列呼び出し</td><td>裏で複数APIを同時に叩き、待ち時間を短縮する</td></tr>
          <tr><td className="hl">フォールバック</td><td>一部APIが失敗しても、表示可能な範囲で返す(方針次第)</td></tr>
          <tr><td className="hl">認可の橋渡し</td><td>セッションやトークンを検証し、コアAPIへ渡す</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        コアAPIは<b>食材ごとの棚</b>(肉・野菜・調味料)。BFFは<b>盛り付け担当</b>で、注文(画面)に合わせて必要な食材を取り、1皿(1レスポンス)にして渡します。客(フロント)が厨房の奥まで入って自分で組み立てなくてよい、というイメージです。
      </Analogy>

      <Heading num="04">GraphQL・tRPCとの関係</Heading>
      <p>BFFは必ずしもRESTである必要はありません。「<Link href="/dev/backend/api/styles">APIの種類と選び方</Link>」で見た<Term>GraphQL</Term>や<Term>tRPC</Term>は、SSKD向けの「欲しい形だけ取る」要件と相性が良く、BFFの実装方式として選ばれることが多いです。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>BFFとして向く理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">REST BFF</td><td>画面ごとにエンドポイントを1本ずつ用意。シンプルで学びやすい</td></tr>
          <tr><td className="hl">GraphQL</td><td>クライアントがフィールドを指定。画面差分に柔軟</td></tr>
          <tr><td className="hl">tRPC</td><td>TypeScript同士なら型で契約。社内SSKD向けに強い</td></tr>
        </tbody>
      </table>
      <p>いずれも「コアAPIを直接公開する代わりに、手前で組み立てる」という構造は同じです。方式はチームの技術スタックと利用者(SSKD)の属性で選びます。</p>

      <Heading num="05">注意点 ― BFFが肥大化しないように</Heading>
      <p>BFFは便利ですが、<b>全部の業務ロジックをBFFに寄せる</b>と、再び「画面ごとにバラバラなAPI」が増え、テストもデプロイも複雑になります。守るべき線引きは次のとおりです。</p>
      <ul>
        <li><b>ドメインルール</b>(在庫引当・課金計算など)はコアAPI(バックエンド本体)に置く</li>
        <li><b>BFFに置くのは</b>集約・変換・認可の橋渡し・通信の最適化</li>
        <li><b>コアAPI</b>はLSUD的に安定させ、公開の可否をここで判断する</li>
        <li>画面が増えたら「BFFを1本に全部詰める」のではなく、<b>クライアント種別ごと</b>にBFFを分ける</li>
      </ul>
      <Aside label="Next.jsとの接続">
        <Link href="/dev/frontend/nextjs/data">Next.jsのServer Component</Link>やRoute Handlerが、サーバー側で複数APIを呼んで画面用データを組み立てるパターンも、実質的にBFFに近い役割です。「BFFは必ず別サービス」ではなく、<b>フロントに近いサーバー層</b>という理解で十分です。
      </Aside>

      <Heading num="まとめ">コアは汎用、手前は画面向け</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>細かいAPIは再利用向き</h4><p>LSUD的コアAPIは粒度が細くてよい。フロントが直接組むのは非効率。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>BFFで1本にまとめる</h4><p>SSKD向けに、集約・変換・並列呼び出しを手前の層に任せる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ロジックは奥に置く</h4><p>BFFは盛り付け担当。業務ルールはコアAPIに残す。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/design" tag="開発">API設計 ― 誰のための窓口か</RelatedLink>
            <RelatedLink href="/dev/backend/api/openapi" tag="開発">OpenAPIと契約</RelatedLink>
            <RelatedLink href="/dev/backend/api/styles" tag="開発">APIの種類と選び方</RelatedLink>
            <RelatedLink href="/dev/backend/express/design" tag="開発">ExpressのAPI設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
