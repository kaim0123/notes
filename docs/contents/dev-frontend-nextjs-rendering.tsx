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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "配信を最適化する",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Streaming & Suspense", desc: "ページの一部を先に返し、時間のかかる部分は<Suspense>で後から流し込む", tier: "must" },
  { name: "Partial Prerendering(PPR)", desc: "静的な部分と動的な部分を1つのレスポンスの中で組み合わせて配信する", tier: "niche" },
  { name: "Proxy(旧Middleware)", desc: "リクエストがルートに到達する前に実行される、認証やリダイレクトなどの共通処理", tier: "must", note: "→ Next.js 16でMiddlewareからProxyに改称された。機能は同じ" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Next.js &middot; パターン</Eyebrow>
        <h1>配信を最適化する ― Streaming・PPR・Proxy</h1>
        <Lead>
          <Link href="/dev/frontend/nextjs/components">Server/Clientコンポーネントの境界</Link>と<Link href="/dev/frontend/nextjs/data">キャッシュ・再検証</Link>を押さえたら、最後は「ユーザーに何をいつ届けるか」です。App Routerは<Term>Suspense</Term>境界を軸に、遅い部分を待たずにページの一部を先に届ける仕組みを標準で持っています。Next.js 16では、リクエストの入口を担う仕組みの名前も変わりました。
        </Lead>
      </Hero>

      <Heading num="01">3つの定石</Heading>
      <table>
        <thead><tr><th>パターン</th><th>目的</th><th>区分</th></tr></thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name}>
              <td className="hl">{p.name}</td>
              <td>{p.desc}</td>
              <td><TierBadge tier={p.tier} />{p.note && <MarkNote>{p.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Streaming & Suspense ― 遅い部分を待たずに先に届ける</Heading>
      <p>従来のサーバーサイドレンダリングは、ページ全体のHTMLが完成するまで何も送りません。1つの遅いデータ取得が、ページ全体をブロックしてしまいます。<Term>Streaming</Term>は、準備できた部分から順にHTTPレスポンスを分割して送ることで、この問題を解決します。ブラウザは、サーバーが残りを生成している間にも先頭から描画を始められます。</p>
      <p>最も簡単な方法は<code>loading.tsx</code>を置くことです。Next.jsが自動的にページを<code>&lt;Suspense&gt;</code>で包み、このファイルの内容をフォールバックとして表示します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/dashboard/loading.tsx
export default function Loading() {
  return <p className="animate-pulse">読み込み中...</p>;
}`}</code>
      </pre>
      <p>ページの中で複数の非同期処理を個別に並行させたい場合は、<code>&lt;Suspense&gt;</code>を直接ネストして使います。それぞれの境界は独立して解決し、互いをブロックしません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/dashboard/page.tsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>売上を読み込み中...</p>}>
        <Revenue />
      </Suspense>
      <Suspense fallback={<p>注文を読み込み中...</p>}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}`}</code>
      </pre>
      <p>ポイントは、<code>params</code>・<code>searchParams</code>・<code>cookies()</code>・データ取得のような「動的なアクセス」を、できるだけ必要なコンポーネントの内側まで押し下げることです。レイアウトやページの先頭で<code>await</code>してしまうと、それより下のツリー全体が動的になり、先に静的な部分を送る恩恵を失います。</p>

      <Heading num="03">Partial Prerendering(PPR) ― 静的な殻と動的な穴を1レスポンスにまとめる</Heading>
      <p>ビルド時に事前生成できる「静的シェル」(レイアウト・ナビゲーション・Suspenseのフォールバック)と、リクエストごとに変わる「動的な部分」を、1つのHTTPレスポンスの中で組み合わせて配信する仕組みが<Term>Partial Prerendering(PPR)</Term>です。<code>next.config.ts</code>で<code>cacheComponents: true</code>を有効にした場合のデフォルトの挙動で、<Link href="/dev/frontend/nextjs/data">「use cache」でキャッシュした部分</Link>と、Suspenseでラップした動的な部分が組み合わさって静的シェルを構成します。</p>
      <p>静的シェルは他のリクエストと共有して即座に配信でき、動的な部分だけがリクエストごとにストリーミングされます。「ページ全体を静的にするか動的にするか」の二択ではなく、1ページの中で両方を組み合わせられる点が、従来のSSR/SSGとの大きな違いです。</p>

      <Heading num="04">Proxy(旧Middleware) ― ルートに届く前の共通処理</Heading>
      <p><strong>Next.js 16から、これまで「Middleware」と呼ばれていた仕組みは「Proxy」という名前に変わりました。機能そのものは変わっていません。</strong>リクエストが完了する前にコードを実行し、リダイレクト・リライト・リクエスト/レスポンスヘッダーの書き換えなどを行える点は同じです。</p>
      <p>プロジェクトルート(または<code>src</code>配下)に<code>proxy.ts</code>を置き、<code>proxy</code>という名前の関数をエクスポートします。<code>config.matcher</code>で実行対象のパスを絞り込めるのも従来通りです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};`}</code>
      </pre>
      <p>Proxyは認可チェックのような「楽観的な」判定には向いていますが、遅いデータ取得や、セッション管理・認可の全責任を負わせる場所ではありません。重い処理はRoute HandlerやServer Componentに任せ、Proxyは軽量な振り分けに留めます。</p>

      <Analogy label="💡 たとえるなら">
        StreamingとPPRは「料理を1品ずつ出す」ことに似ています。全品が揃うまで客を待たせず、できた料理から順にテーブルへ運びます。Proxyは、料理が客に届く前に立つ「受付」のようなもので、注文内容(リクエスト)を見て席を振り分けたり、入店をお断りしたりしますが、料理そのもの(実際のレンダリング)は作りません。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Streaming & Suspense</h4><p>遅い部分を待たず、準備できた順に画面を届ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>PPR</h4><p>静的シェルと動的な穴を1レスポンスに組み合わせる、Cache Components配下のデフォルト。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Proxy(旧Middleware)</h4><p>ルートに届く前の軽量な共通処理。Next.js 16で改称。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/nextjs/data" tag="開発">データフェッチ・キャッシュ・再検証</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs/components" tag="開発">Server/Clientコンポーネントの境界</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
