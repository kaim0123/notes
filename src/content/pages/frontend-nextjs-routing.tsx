import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ルーティングとレイアウト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>ルーティングとレイアウト ― 構造がそのまま仕様になる</h1>
        <Lead>
          App Routerでは<Term>ファイルの置き場所がそのままURLと画面構造になります</Term>。<Link href="/frontend/react-boundary">エラー境界</Link>も<Link href="/frontend/nextjs-data">データ取得</Link>も、この階層の上に載ります。設定ファイルにルートを列挙する方式と何が違うのかを掴むのが、ここの目的です。
        </Lead>
      </Hero>

      <Heading num="01">フォルダがURL、ファイルが役割</Heading>
      <p>
        フォルダがURLの区切りを作り、その中の決められた名前のファイルが役割を決めます。フォルダを作っただけではURLは生えず、<code>page.tsx</code>を置いて初めてアクセスできるようになります。
      </p>

      <table>
        <thead>
          <tr><th>ファイル</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>page.tsx</code></td><td>そのURLで表示される画面。<strong>これが無いとURLとして公開されない</strong></td></tr>
          <tr><td className="hl"><code>layout.tsx</code></td><td>配下すべてを包む枠。ナビゲーションやサイドバーを置く</td></tr>
          <tr><td className="hl"><code>template.tsx</code></td><td>layoutと似ているが、遷移のたびに作り直される</td></tr>
          <tr><td className="hl"><code>loading.tsx</code></td><td>配下の読み込み中に出る代わりの表示</td></tr>
          <tr><td className="hl"><code>error.tsx</code></td><td>配下のエラー境界。<strong>Client Componentである必要がある</strong></td></tr>
          <tr><td className="hl"><code>not-found.tsx</code></td><td>見つからないときの表示</td></tr>
          <tr><td className="hl"><code>route.ts</code></td><td>画面ではなくエンドポイントを定義する(<code>page.tsx</code>とは同居できない)</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="frontend-nextjs-routing-tree"
        aspect="640 / 320"
        caption="ディレクトリ構造がURLと境界の入れ子にそのまま対応することを示した図。左にappディレクトリのツリーがあり、右にそれが生み出すURLと、適用される枠の入れ子が対応して並んでいる。ルートのlayoutは全ページを包み、dashboardフォルダのlayoutはその配下だけを包む。同じ階層に置かれたloadingとerrorも、その階層より下だけを守る。したがって、あるレイアウト自身で起きた失敗を捕まえたいなら、境界は1つ上の階層に置く必要がある。ルーティング表というファイルは存在せず、構造そのものが仕様になっている。"
      />

      <pre>
        <code>{`app/
├─ layout.tsx            ← 全ページ共通(html/bodyを含む)
├─ page.tsx              → /
└─ dashboard/
   ├─ layout.tsx         ← /dashboard 配下の共通サイドバー
   ├─ loading.tsx        ← 配下の読み込み中
   ├─ error.tsx          ← 配下のエラー境界
   ├─ page.tsx           → /dashboard
   └─ settings/
      └─ page.tsx        → /dashboard/settings`}</code>
      </pre>

      <p>
        この対応があるため、<Term>ルーティング表というファイルは存在しません</Term>。台帳と現物がずれる心配がない代わりに、「どのURLが存在するか」を一覧する手段がディレクトリツリーしかない、という裏返しの性質を持ちます。
      </p>

      <Heading num="02">レイアウトは遷移しても保たれる</Heading>
      <p>
        最も重要な性質がこれです。<code>/dashboard</code>から<code>/dashboard/settings</code>へ移動しても、<Term>間のレイアウトは作り直されません</Term>。サイドバーのスクロール位置も、開いていたアコーディオンも保たれます。
      </p>
      <p>
        逆に「遷移のたびにリセットしたい」場合に使うのが<code>template.tsx</code>です。<Term>状態を保ちたいならlayout、リセットしたいならtemplate</Term>という選択になります。
      </p>

      <Aside label="ルートレイアウトの制約">
        いちばん上の<code>layout.tsx</code>は必須で、<code>&lt;html&gt;</code>と<code>&lt;body&gt;</code>を自分で書く唯一の場所です。ここは全ページで共有されるため、<Term>重いClient Componentを置くとアプリ全体の初期読み込みに響きます</Term>。テーマ切替のような小さな部品でも、置く場所は意識する価値があります。
      </Aside>

      <Heading num="03">動的セグメント</Heading>
      <p>
        フォルダ名を<code>[]</code>で囲むと、その部分が変数になります。
      </p>

      <table>
        <thead>
          <tr><th>記法</th><th>マッチするURL</th><th>受け取る値</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>[slug]</code></td><td><code>/blog/hello</code></td><td>1つの文字列</td></tr>
          <tr><td className="hl"><code>[...slug]</code></td><td><code>/docs/a/b/c</code></td><td>配列</td></tr>
          <tr><td className="hl"><code>[[...slug]]</code></td><td>上に加えて<code>/docs</code>自体も</td><td>配列、または未定義</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`// app/blog/[slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;   // ← Promise で渡される
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <article>{post.title}</article>;
}`}</code>
      </pre>

      <Aside label="⚠️ paramsはPromise">
        現在のNext.jsでは、<code>params</code>と<code>searchParams</code>は<Term>Promiseとして渡されます</Term>。同期的にプロパティへアクセスする古いコード例をそのまま持ち込むと動きません。この変更は、<Term>リクエスト固有の値へのアクセスを明示する</Term>ためのものです。どこでリクエスト依存の値に触れたかがはっきりすると、それ以外の部分を事前に生成できるようになります。
      </Aside>

      <p>
        ビルド時にどのURLを事前生成するかは、専用の関数で列挙します。このサイトのような静的書き出しでは、<Term>そこに載らないURLは存在しないことになります</Term>。
      </p>

      <Heading num="04">URLに出ないフォルダ</Heading>
      <p>
        フォルダ名を<code>()</code>で囲むと、<Term>その名前はURLに含まれません</Term>。「コードは分けたいが、URLは分けたくない」ときに使います。
      </p>

      <pre>
        <code>{`app/
├─ (marketing)/
│  ├─ layout.tsx          ← 宣伝ページ用のヘッダー
│  ├─ page.tsx            → /
│  └─ pricing/page.tsx    → /pricing
└─ (app)/
   ├─ layout.tsx          ← ログイン後のサイドバー
   └─ dashboard/page.tsx  → /dashboard`}</code>
      </pre>

      <p>
        URLはそのままで、<Term>適用されるレイアウトだけが分かれます</Term>。ログイン前後で画面の枠がまったく違うアプリでは定番の構成です。ただし、グループが違っても<Term>同じURLになる組み合わせは作れません</Term>。
      </p>

      <Heading num="05">1画面に複数の領域</Heading>
      <p>
        <code>@名前</code>のフォルダを作ると、その中身がレイアウトへ<Term>名前付きで渡されます</Term>。1つの画面の中に、独立して読み込まれ独立して失敗する領域を複数持てます。
      </p>
      <p>
        それぞれが自前の読み込み表示とエラー境界を持てるため、<Term>集計だけ読み込み中、通知だけ失敗</Term>という粒度の細かい表示が自然に書けます。
      </p>
      <p>
        関連する記法として、「リンクを踏んだときはモーダルで開き、URLを直接叩いたときは通常のページとして開く」という挙動を実現するものもあります。写真一覧から1枚を開くとモーダル、そのURLを共有すると全画面 ― という体験の裏側がこれです。
      </p>

      <Heading num="06">遷移</Heading>
      <p>
        画面間の移動には専用のリンク部品を使います。素のアンカーと違い、ページ全体を再読み込みせず必要な部分だけを差し替え、さらに<Term>画面に入った時点で遷移先を先読み</Term>します。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リンク部品</td><td>通常の遷移。<strong>常に第一選択</strong>。右クリックや新規タブも効く</td></tr>
          <tr><td className="hl">プログラムからの遷移</td><td>送信完了後など、操作の結果として移動するとき</td></tr>
          <tr><td className="hl">サーバー側からのリダイレクト</td><td>サーバーで動く処理の中での移動</td></tr>
          <tr><td className="hl">現在地の取得</td><td>ナビゲーションの現在位置表示。ブラウザ側でのみ使える</td></tr>
        </tbody>
      </table>

      <p>
        現在地の表示は、色を変えるだけでは<Term>読み上げソフトに「いまここ」が伝わりません</Term>。<Link href="/frontend/ux-a11y">対応する属性</Link>を併せて付けます。
      </p>

      <Heading num="07">メタデータ</Heading>
      <p>
        各ページやレイアウトから<code>metadata</code>を書き出すと、<code>&lt;head&gt;</code>の内容が生成されます。親子で<Term>マージされる</Term>ため、共通部分を上の階層に置き、個別のタイトルだけを各ページで上書きするのが定石です。動的に決まる場合は関数として書き出します。
      </p>

      <Analogy label="💡 たとえるなら">
        App Routerのディレクトリは建物の見取り図そのものです。設定ファイルにルートを列挙する方式が「部屋番号の台帳」だとすれば、こちらは「壁を立てると部屋ができる」やり方。台帳と現物がずれる心配はありませんが、全体像を知るには館内を歩き回るしかありません。<code>()</code>のグループは台帳に載らない区画分けで、管理棟と来客棟を分けても住所は同じ1つのままです。
      </Analogy>

      <Heading num="まとめ">置いた場所が、守る範囲になる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>page.tsxがURLを生やす</h4>
          <p>フォルダは区切り、決められた名前のファイルが役割。ルーティング表は無い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>layoutは遷移で保たれる</h4>
          <p>状態を残したいならlayout、リセットしたいならtemplate。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>境界は置いた階層より下だけ</h4>
          <p>レイアウト自身の失敗を捕まえたいなら、1つ上に置く。</p>
        </Card>
      </CardGrid>

      <p>
        構造が決まったら、次は各部分を<Term>どこで動かすか</Term>です。
        <Link href="/frontend/nextjs-components">Server/Clientコンポーネントの境界</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/nextjs-routing" />
    </DocsPage>
  );
}
