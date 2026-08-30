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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "フレームワーク・ライブラリ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>フレームワーク・ライブラリ ― 主導権は誰が持つか</h1>
        <Lead>
          言語(<Link href="/dev/language">JavaScript・TypeScript</Link>)と実行環境(<Link href="/dev/runtime">ランタイム</Link>)が揃っても、アプリを毎回ゼロから組み立てるのは非効率です。<Term>フレームワーク</Term>と<Term>ライブラリ</Term>は、どちらも他人が書いたコードを再利用する道具ですが、「あなたのコードと相手のコード、どちらが主導権を持つか」という決定的な違いがあります。この違いを押さえたうえで、代表格のReact・Next.js・Tailwind CSSを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">フレームワークとライブラリの違い ― 誰が誰を呼ぶか</Heading>
      <p>「フレームワーク」と「ライブラリ」はどちらも他人が書いたコードの再利用という点では同じですが、決定的な違いが1つあります。それは<Term>制御の反転(IoC: Inversion of Control)</Term>です。</p>
      <Diagram caption="ライブラリはあなたのコードから呼び出す部品、フレームワークはあなたのコードを呼び出す土台">
        <svg viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg">
          <text x={150} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">ライブラリ</text>
          <rect x={40} y={35} width={220} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={150} y={60} fill="#f2f2f2" fontSize="11" textAnchor="middle">あなたのコード(主導権)</text>
          <rect x={80} y={100} width={140} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={122} fill="#9a9a9a" fontSize="10" textAnchor="middle">ライブラリの関数を呼ぶ</text>
          <line x1={150} y1={75} x2={150} y2={98} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowFw)" />

          <text x={470} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">フレームワーク</text>
          <rect x={360} y={35} width={220} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={470} y={60} fill="#f2f2f2" fontSize="11" textAnchor="middle">フレームワーク(主導権)</text>
          <rect x={400} y={100} width={140} height={36} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={470} y={122} fill="#c9ffd8" fontSize="10" textAnchor="middle">あなたのコードを呼ぶ</text>
          <line x1={470} y1={75} x2={470} y2={98} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowFw)" />
          <defs>
            <marker id="arrowFw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>これは「ハリウッドの原則」とも呼ばれます ―「こちらから連絡するので、そちらから電話しないでください(Don&apos;t call us, we&apos;ll call you)」。フレームワークを使うとき、あなたはメインの処理の流れを自分で書くのではなく、フレームワークが決めた場所(コンポーネントの中、ルートハンドラの中など)にコードを差し込み、あとはフレームワークがそれを適切なタイミングで呼び出します。反対にライブラリは主導権を渡しません。あなたのコードが必要なタイミングで、必要な関数だけを呼び出して使います。そのぶんフレームワークほど強い型は決まっておらず、複数のライブラリを自由に組み合わせて使えるのが特徴です。</p>

      <Heading num="02">時代変遷 ― フロントとバックの境界は何度も引き直されてきた</Heading>
      <p>この「主導権をどちらが持つか」というルールは固定ではなく、時代とともに何度も引き直されてきました。今の「フロントエンドはReact、バックエンドはAPIサーバー」という分業も最初から決まっていたわけではありません。HTMLをサーバーで組み立てて返すだけの時代から、画面側にロジックが移り、また一部がサーバーに戻ってくるまで、フロントとバックの境界線は約30年かけて何度も引き直されてきました。</p>
      <table>
        <thead>
          <tr><th>時代</th><th>フロントエンド</th><th>バックエンド</th><th>アーキテクチャ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1995〜2003</td><td>HTML + CSS + JavaScript</td><td>CGI、PHP、Servlet</td><td>サーバーサイドレンダリング(SSR)</td></tr>
          <tr><td className="hl">2004〜2010</td><td>HTML + jQuery</td><td>Rails、Django、Spring、CakePHP</td><td>MVC</td></tr>
          <tr><td className="hl">2010〜2016</td><td>jQuery + Ajax</td><td>Rails、Laravel、Express、Spring</td><td>Ajax + REST API</td></tr>
          <tr><td className="hl">2016〜2020</td><td>React、Vue、Angular</td><td>Express、Spring Boot、Django REST</td><td>SPA + API</td></tr>
          <tr><td className="hl">2018〜2023</td><td>Next.js、Nuxt</td><td>Express、NestJS、Fastify、Laravel</td><td>SSR + API</td></tr>
          <tr><td className="hl">2023〜現在</td><td>Next.js (App Router)</td><td>Hono、Fastify、NestJS、Serverless</td><td>Server Components + Edge</td></tr>
        </tbody>
      </table>
      <p>大きな流れは3つです。まずページ全体をサーバーが組み立てるSSRの時代があり、次にjQueryのAjaxでページの一部だけをJavaScriptから書き換える方法が広まり、フロントとバックがHTTP越しのREST APIで分業するSPAの時代になりました。そして2018年頃からは、SPAが抱えていた初期表示の遅さやSEOの弱さを補うために、SSRの考え方がReact/Next.jsの中に「再輸入」されています。次節以降で見るReact・Next.jsは、この表の右端(SPA + API → SSR + API → Server Components + Edge)の変化そのものを体現したフレームワークです。</p>

      <Heading num="03">React ― 宣言的にUIを組み立てる</Heading>
      <p><Term>React</Term>はMeta(旧Facebook)が開発した、画面をコンポーネント単位で組み立てるためのフレームワークです。stateが変化するとReactがコンポーネントを再実行し、前回との差分だけを実際のDOMに反映するため、開発者は「今の状態なら画面はどうあるべきか」だけを考えればよくなります。仮想DOM・単方向データフロー・Compositionといった設計指針の詳細は<Link href="/dev/frontend/react">Reactのページ</Link>で扱います。</p>

      <Heading num="04">Next.js ― Reactを土台にしたフルスタックフレームワーク</Heading>
      <p><Term>Next.js</Term>は、Reactそのものではなく、Reactを土台にしてルーティングやサーバー機能を追加した<Term>メタフレームワーク</Term>です。フォルダ構成がそのままURLになる<Term>ファイルベースルーティング</Term>や、画面をどこで組み立てるかを選べる複数の<Term>レンダリング方式</Term>を提供します。CSR・SSR・SSGの使い分けは<Link href="/dev/frontend/nextjs">Next.jsのページ</Link>で扱います。</p>

      <Heading num="05">バックエンドの定番 ― Express・Hono</Heading>
      <p><Term>Express</Term>は、Node.js向けのバックエンドフレームワークとして長年デファクトスタンダードの地位にあります。「あるURLパスに、あるHTTPメソッドでリクエストが来たら、この処理を実行する」というルーティングと、リクエストを順番に加工していく<Term>ミドルウェア</Term>という2つの概念がシンプルに組み合わさっているのが特徴です。</p>
      <p><Term>Hono</Term>は、より新しいバックエンドフレームワークで、Express同様のルーティング・ミドルウェアの考え方を踏襲しつつ、特定のランタイムに依存しない設計を特徴とします。Node.jsはもちろん、前のページで見た<Link href="/dev/runtime">Deno・Bun</Link>や、Cloudflare Workersのような<Term>エッジ環境</Term>でも、ほぼ同じコードで動作します。軽量さと起動の速さから、近年のNode.js以外のランタイムを使う場面で採用が広がっています。</p>

      <Heading num="06">CSS/UIライブラリ ― Tailwind CSS</Heading>
      <p><Term>Tailwind CSS</Term>は、<code>p-4</code>や<code>text-white</code>のように1つの役割だけを持つ小さなクラスを大量に用意し、HTML側でそれらを組み合わせてスタイルを直接指定する<Term>ユーティリティファースト</Term>のCSSライブラリです。この上に成り立つコンポーネント集<Term>shadcn/ui</Term>とあわせて、<Link href="/dev/frontend/tailwind">Tailwind CSSのページ</Link>で詳しく見ていきます。</p>

      <Heading num="07">分類早見表 ― 用途ごとに見る代表例</Heading>
      <p>ここまで見てきたReact・Next.js・Express・Hono・Tailwind CSSはフレームワーク/ライブラリ全体のごく一部です。「何のための道具か」という目的で分類すると、次のように整理できます。前半は「何を作るか」というアプリの種類、後半はその中で「どの役割を担うか」という部品の分類です。</p>
      <table>
        <thead>
          <tr><th>分類</th><th>目的</th><th>有名なもの</th><th>主な言語</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フロントエンド</td><td>Web画面を作る</td><td>React、Vue.js、Angular、Svelte</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">メタフレームワーク</td><td>ReactやVueを拡張してWebアプリを作る</td><td>Next.js、Nuxt、Remix、Astro、SvelteKit</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">バックエンド</td><td>API・サーバーを作る</td><td>Express、NestJS、FastAPI、Django、Flask、Spring Boot、ASP.NET Core、Laravel、Ruby on Rails</td><td>Node.js、Python、Java、C#、PHP、Ruby</td></tr>
          <tr><td className="hl">フルスタック</td><td>フロント・バックをまとめて開発</td><td>Next.js、Nuxt、Meteor</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">モバイル</td><td>スマホアプリを作る</td><td>Flutter、React Native、SwiftUI、Jetpack Compose</td><td>Dart、JavaScript、Swift、Kotlin</td></tr>
          <tr><td className="hl">デスクトップ</td><td>Windows・Macアプリを作る</td><td>Electron、Tauri、.NET MAUI、Qt</td><td>JavaScript、Rust、C#、C++</td></tr>
          <tr><td className="hl">ゲーム</td><td>ゲーム開発</td><td>Unity、Unreal Engine、Godot</td><td>C#、C++、GDScript</td></tr>
          <tr><td className="hl">AI・機械学習</td><td>AIモデル開発</td><td>TensorFlow、PyTorch、Keras</td><td>Python</td></tr>
          <tr><td className="hl">テスト</td><td>テスト自動化</td><td>Jest、Vitest、Playwright、Cypress、JUnit、pytest</td><td>各言語</td></tr>
          <tr><td className="hl">CSS/UI</td><td>デザイン・レイアウト</td><td>Tailwind CSS、Bootstrap、Bulma</td><td>CSS</td></tr>
          <tr><td className="hl">状態管理</td><td>クライアント側の状態を一元管理する</td><td>Redux、Zustand、Jotai、Recoil、Pinia</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">HTTPクライアント</td><td>サーバーにHTTPリクエストを送る</td><td>axios、ky、got(標準のFetch APIも同じ役割)</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">データ取得・サーバー状態</td><td>HTTPクライアントを土台にデータを取得・キャッシュ・再取得する</td><td>TanStack Query、SWR、Apollo Client</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">フォーム</td><td>入力フォームの値と検証を扱う</td><td>React Hook Form、Formik、VeeValidate</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">バリデーション</td><td>データの形を検証し型を付ける</td><td>Zod、Yup、Valibot、Joi</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">ORM・DB接続</td><td>オブジェクトとDBを橋渡しする</td><td>Prisma、Drizzle、Mongoose、TypeORM、SQLAlchemy</td><td>JavaScript、Python など</td></tr>
          <tr><td className="hl">認証・認可</td><td>ログインとアクセス制御を実装する</td><td>Auth.js(NextAuth)、Passport、Clerk</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">Lint・整形</td><td>コードの品質と体裁を揃える</td><td>ESLint、Prettier、Biome</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">ビルド・バンドル</td><td>コードをまとめて配信用に変換する</td><td>Vite、webpack、esbuild、Rollup、Turbopack</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">日付・ユーティリティ</td><td>日付処理や汎用的な小道具</td><td>date-fns、Day.js、Lodash</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">アニメーション</td><td>UIに動きをつける</td><td>Framer Motion、GSAP、React Spring</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">ルーティング</td><td>ページ遷移とURLを管理する(Next.jsは標準搭載)</td><td>React Router、TanStack Router、Vue Router</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">ヘッドレスUI</td><td>見た目を持たないアクセシブルな部品</td><td>Radix UI、Headless UI、Ariakit</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">データ可視化・チャート</td><td>データをグラフで描く</td><td>Recharts、Chart.js、D3.js、ECharts</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">国際化(i18n)</td><td>多言語・地域対応を行う</td><td>i18next、react-i18next、FormatJS</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">リアルタイム通信</td><td>サーバーと双方向にやりとりする</td><td>Socket.IO、ws、Pusher</td><td>JavaScript / TypeScript</td></tr>
          <tr><td className="hl">ロギング・監視</td><td>ログ出力とエラー・性能の監視</td><td>pino、winston、Sentry、OpenTelemetry</td><td>JavaScript / TypeScript</td></tr>
        </tbody>
      </table>
      <p>この表の「分類」は一般的な呼び方に沿ったもので、必ずしも01節の「制御の反転」の定義に厳密に一致するわけではありません。たとえばCSS/UI行のTailwind CSSは、01節の定義では自分のコードから呼び出す<Term>ライブラリ</Term>です。このAtlasが扱うNext.jsは「メタフレームワーク」かつ「フルスタック」に位置づけられます。</p>

      <Analogy label="💡 たとえるなら">
        フレームワークを使うのは「間取りが決まっている分譲住宅に入居する」ようなものです。決まった型に沿う分、基礎工事から考える必要がなく早く住み始められますが、間取りそのものを自由に変えることはできません。一方ライブラリを使うのは、家具を1つずつ選んで自分の部屋に置いていく感覚に近いものです。Tailwind CSSのようなライブラリは、規格化された家具(ユーティリティクラス)を組み合わせて部屋を仕上げるイメージです。
      </Analogy>

      <Heading num="まとめ">主導権をどちらが持つかで、使い方が決まる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>フレームワークは制御の反転</h4><p>あなたのコードを、決まったタイミングでフレームワークが呼び出します(React・Next.js・Express・Hono)。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ライブラリは主導権を渡さない</h4><p>あなたのコードが必要な関数を呼び出して使います(Tailwind CSS・shadcn/ui)。組み合わせの自由度が高い分、型は決まっていません。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分類は目的で決まる</h4><p>フロントエンド・バックエンド・モバイルなど、作りたいものが決まれば07節の表から候補を絞り込めます。</p></Card>
      </CardGrid>
      <p>ここまでで、コードを書き実行するための基本的な道具立て ― HTML/CSS・JavaScript/TypeScript・実行環境・フレームワーク・ライブラリ ― が一通り揃いました。次は「<Link href="/database/basics">データベース</Link>」で、これらを使って作ったアプリのデータをどう構造化して保存するか、リレーショナルデータベースの基礎を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/runtime" tag="開発">ランタイム</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="開発">Web基礎</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
