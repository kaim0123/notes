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
  title: "ルーティングとレイアウト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Next.js</Eyebrow>
        <h1>ルーティングとレイアウト ― ディレクトリ構造がURLになる</h1>
        <Lead>
          App Routerでは、<strong>ファイルの置き場所がそのままURLと画面構造になります</strong>。<Link href="/dev/frontend/react/boundary">エラー境界</Link>も<Link href="/dev/frontend/nextjs/data">データ取得</Link>も、この階層の上に載ります。ここでは<Term>セグメント</Term>と<Term>レイアウト</Term>という基本から、URLに現れない<Term>ルートグループ</Term>、複数画面を同時に描く<Term>並行ルート</Term>までを整理します。設定ファイルにルートを列挙する従来のやり方と何が違うのかを掴むのが目的です。
        </Lead>
      </Hero>

      <Heading num="01">ディレクトリがルートになる</Heading>
      <p><code>app</code>ディレクトリの下では、<strong>フォルダがURLの区切り(セグメント)</strong>を作り、その中の特別な名前のファイルがそのセグメントの役割を決めます。フォルダを作っただけではURLは生えず、<code>page.tsx</code>を置いて初めてアクセス可能になります。</p>
      <table>
        <thead>
          <tr><th>ファイル</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>page.tsx</code></td><td>そのURLで表示される画面。<strong>これが無いとURLとして公開されない</strong></td></tr>
          <tr><td className="hl"><code>layout.tsx</code></td><td>配下すべてを包む枠。ナビゲーションやサイドバーを置く</td></tr>
          <tr><td className="hl"><code>template.tsx</code></td><td>layoutと似ているが、遷移のたびに作り直される</td></tr>
          <tr><td className="hl"><code>loading.tsx</code></td><td>配下の読み込み中に出るフォールバック</td></tr>
          <tr><td className="hl"><code>error.tsx</code></td><td>配下のエラー境界</td></tr>
          <tr><td className="hl"><code>not-found.tsx</code></td><td>404の表示</td></tr>
          <tr><td className="hl"><code>route.ts</code></td><td>画面ではなくAPIエンドポイントを定義する(<code>page.tsx</code>とは同居できない)</td></tr>
        </tbody>
      </table>
      <p>この対応があるため、<strong>ルーティング表というファイルは存在しません</strong>。URLを知りたければディレクトリを見ればよく、逆に画面を追加したければフォルダを掘るだけです。反面、「どのURLが存在するか」を一覧する手段がディレクトリツリーしかない、という裏返しの性質も持ちます。</p>

      <Heading num="02">レイアウトは入れ子になり、状態を保つ</Heading>
      <p><code>layout.tsx</code>は<code>children</code>を受け取り、配下の画面を包みます。階層が深くなれば、レイアウトも入れ子で適用されます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app/
├─ layout.tsx            ← 全ページ共通(html/bodyを含むルートレイアウト)
├─ page.tsx              ← /
└─ dashboard/
   ├─ layout.tsx         ← /dashboard 配下の共通サイドバー
   ├─ page.tsx           ← /dashboard
   └─ settings/
      └─ page.tsx        ← /dashboard/settings`}</code>
      </pre>
      <p>最も重要な性質は、<strong>レイアウトは遷移しても再マウントされない</strong>ことです。<code>/dashboard</code>から<code>/dashboard/settings</code>へ移動しても、<code>dashboard/layout.tsx</code>は生き続けます ― サイドバーのスクロール位置も、開いていたアコーディオンも保たれます。従来のページ単位の遷移との決定的な違いです。</p>
      <p>逆に「遷移のたびにリセットしたい」場合に使うのが<code>template.tsx</code>です。こちらは遷移ごとに新しいインスタンスになるため、入力欄の値がクリアされ、<code>useEffect</code>が再実行されます。<strong>状態を保ちたいならlayout、リセットしたいならtemplate</strong>という選択になります。</p>
      <Aside label="ルートレイアウトの制約">
        <code>app/layout.tsx</code>(ルートレイアウト)は必須で、<code>&lt;html&gt;</code>と<code>&lt;body&gt;</code>を自分で書く唯一の場所です。ここは全ページで共有されるため、重いClient Componentを置くとアプリ全体の初期読み込みに響きます。
      </Aside>

      <Heading num="03">動的セグメント ― URLから値を受け取る</Heading>
      <p>フォルダ名を<code>[]</code>で囲むと、その部分が変数になります。値は<code>params</code>として画面に渡されます。</p>
      <table>
        <thead>
          <tr><th>記法</th><th>マッチするURL</th><th>params</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>[slug]</code></td><td><code>/blog/hello</code></td><td><code>{"{ slug: 'hello' }"}</code></td></tr>
          <tr><td className="hl"><code>[...slug]</code></td><td><code>/docs/a/b/c</code></td><td><code>{"{ slug: ['a','b','c'] }"}</code></td></tr>
          <tr><td className="hl"><code>[[...slug]]</code></td><td>上に加えて<code>/docs</code>自体も</td><td><code>{"{ slug: undefined }"}</code></td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/blog/[slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;  // ← Promise で渡される
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <article>{post.title}</article>;
}`}</code>
      </pre>
      <Aside label="⚠️ paramsはPromise">
        現在のNext.jsでは、<code>params</code>と<code>searchParams</code>は<strong>Promiseとして渡されます</strong>。同期的に<code>params.slug</code>と書いていた古いコード例をそのまま持ち込むと動きません。<code>await</code>してから使うか、Client Componentでは<code>use()</code>で解決します。この変更は、リクエスト固有の値へのアクセスを明示し、それ以外の部分を静的に生成できるようにするためのものです。
      </Aside>
      <p>ビルド時にどのURLを事前生成するかは<code>generateStaticParams</code>で列挙します。このサイトのような静的書き出しでは、ここに載らないURLは存在しないことになります。</p>

      <Heading num="04">ルートグループ ― URLに出ないフォルダ</Heading>
      <p>フォルダ名を<code>()</code>で囲むと、<strong>そのフォルダ名はURLに含まれません</strong>。これが<Term>ルートグループ</Term>です。「コードは分けたいが、URLは分けたくない」ときに使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app/
├─ (marketing)/
│  ├─ layout.tsx      ← 宣伝ページ用のヘッダー
│  ├─ page.tsx        → /
│  └─ pricing/page.tsx → /pricing
└─ (app)/
   ├─ layout.tsx      ← ログイン後のサイドバー
   └─ dashboard/page.tsx → /dashboard`}</code>
      </pre>
      <p>URLは<code>/pricing</code>や<code>/dashboard</code>のままで、<strong>適用されるレイアウトだけが分かれます</strong>。ログイン前後で画面の枠がまったく違うアプリでは定番の構成です。</p>
      <p>注意点は、<strong>グループが違っても同じURLになる組み合わせは作れない</strong>ことです。<code>(a)/about</code>と<code>(b)/about</code>はどちらも<code>/about</code>になり、ビルドエラーになります。</p>

      <Heading num="05">並行ルートとインターセプト ― 1画面に複数の領域</Heading>
      <p>ここからは応用ですが、「なぜこんな記法があるのか」を知っておくと設計の幅が広がります。</p>
      <p><Term>並行ルート(Parallel Routes)</Term>は、<code>@folder</code>という名前のフォルダを作ると、その中身がレイアウトへ<strong>名前付きのpropsとして渡される</strong>仕組みです。1つの画面の中に、独立して読み込まれ独立してエラー処理される領域を複数持てます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app/dashboard/
├─ @analytics/page.tsx
├─ @notifications/page.tsx
├─ layout.tsx
└─ page.tsx

// layout.tsx はスロットを props として受け取る
export default function Layout({
  children, analytics, notifications,
}: { children: ReactNode; analytics: ReactNode; notifications: ReactNode }) {
  return <>{children}{analytics}{notifications}</>;
}`}</code>
      </pre>
      <p>それぞれのスロットが自前の<code>loading.tsx</code>と<code>error.tsx</code>を持てるため、「集計だけ読み込み中」「通知だけ失敗」という粒度の細かい表示が自然に書けます。スロットに対応する内容が無いURLのために<code>default.tsx</code>を用意します。</p>
      <p><Term>インターセプトルート</Term>は<code>(.)folder</code>のような記法で、「リンクを踏んだときは<strong>モーダルで</strong>開き、URLを直接叩いたときは<strong>通常のページとして</strong>開く」という挙動を実現します。写真一覧から写真を開くとモーダル、そのURLを共有すると全画面 ― という体験の裏側がこれです。</p>

      <Heading num="06">遷移 ― LinkとRouter</Heading>
      <p>画面間の移動は<code>&lt;Link&gt;</code>を使います。単なる<code>&lt;a&gt;</code>と違い、ページ全体を再読み込みせず、必要な部分だけを差し替えます。さらに<strong>ビューポートに入った時点で遷移先を先読み</strong>するため、クリック時にはすでに準備が終わっています。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;Link href&gt;</code></td><td>通常の遷移。<strong>常に第一選択</strong>。右クリックや新規タブも効く</td></tr>
          <tr><td className="hl"><code>useRouter().push()</code></td><td>送信完了後など、操作の結果として移動するとき</td></tr>
          <tr><td className="hl"><code>redirect()</code></td><td>Server Component / Server Function内での移動</td></tr>
          <tr><td className="hl"><code>usePathname()</code> / <code>useSearchParams()</code></td><td>現在地の取得。Client Componentのみ</td></tr>
        </tbody>
      </table>
      <p>ナビゲーションの現在地表示には、<code>usePathname()</code>と<code>aria-current=&quot;page&quot;</code>を組み合わせます。色を変えるだけでは、読み上げソフトに「いまここ」が伝わりません。</p>

      <Heading num="07">メタデータ ― ページごとのtitleとOGP</Heading>
      <p>各<code>page.tsx</code>や<code>layout.tsx</code>から<code>metadata</code>をエクスポートすると、<code>&lt;head&gt;</code>の内容が生成されます。親子で<strong>マージされる</strong>ため、共通部分をルートレイアウトに置き、個別のタイトルだけを各ページで上書きするのが定石です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/layout.tsx — 共通のテンプレート
export const metadata: Metadata = {
  title: { template: "%s | Atlas", default: "Atlas" },
  description: "学習ノート",
};

// app/blog/[slug]/page.tsx — 動的に決まる場合は関数で
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, openGraph: { images: [post.cover] } };
}`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        App Routerのディレクトリは、建物の見取り図そのものです。設定ファイルにルートを列挙する方式が「部屋番号の台帳」だとすれば、こちらは「実際に壁を立てると部屋ができる」やり方です。台帳と現物がずれる心配はありませんが、代わりに全体像を知るには館内を歩き回るしかありません。ルートグループは、台帳に載らない<strong>区画分け</strong> ― 建物の中で管理棟と来客棟を分けても、住所は同じ1つのままです。
      </Analogy>

      <Heading num="まとめ">構造がそのまま仕様になる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>page.tsxがURLを生やす</h4><p>フォルダはセグメント、特別な名前のファイルが役割。ルーティング表は存在しない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>layoutは遷移で保たれる</h4><p>状態を残したいならlayout、リセットしたいならtemplate。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>()はURLに出ない</h4><p>ルートグループでレイアウトだけを分ける。ログイン前後の枠の切り替えが典型。</p></Card>
      </CardGrid>
      <p>構造が決まったら、次はその各セグメントを<strong>どこで描くか</strong>です。<Link href="/dev/frontend/nextjs/components">Server/Clientコンポーネントの境界</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/nextjs/components" tag="フロントエンド">Server/Clientコンポーネントの境界</RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs/data" tag="フロントエンド">データフェッチ・キャッシュ・再検証</RelatedLink>
            <RelatedLink href="/dev/frontend/react/boundary" tag="フロントエンド">エラー境界とフォールバックUI</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
