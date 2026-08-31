import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "配信を最適化する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>配信を最適化する ― 何を、いつ届けるか</h1>
        <Lead>
          <Link href="/frontend/nextjs-components">境界</Link>と<Link href="/frontend/nextjs-data">キャッシュ</Link>を押さえたら、最後は届け方です。従来の考え方では「このページは静的、あのページは動的」と選ぶしかありませんでしたが、いまは<Term>1ページの中で両方を組み合わせて1つの応答として送れます</Term>。その仕組みと、入口での共通処理を見ます。
        </Lead>
      </Hero>

      <Heading num="01">全部そろうまで待たない</Heading>
      <p>
        従来のサーバー側描画は、ページ全体のHTMLが完成するまで何も送りませんでした。1つの遅い取得が、<Term>ページ全体を止めてしまいます</Term>。
      </p>
      <p>
        いまは、準備できた部分から順に送ります。ブラウザは、サーバーが残りを作っている間にも先頭から描き始められます。境界になるのは<Term>Suspenseで囲んだ範囲</Term>で、それぞれ独立して解決し、互いを待ちません。
      </p>

      <DiagramFrame
        slug="frontend-nextjs-streaming"
        aspect="640 / 320"
        caption="静的な殻と動的な穴が1つの応答として届く様子を時間軸で示した図。最初に届くのは静的な殻で、レイアウトとナビゲーション、そしてSuspenseで囲んだ範囲の仮表示が含まれる。これはあらかじめ生成されているため即座に表示できる。その後、遅い処理が終わった順に、それぞれの穴の中身が流れ込んで仮表示と入れ替わる。売上の集計と最近の注文はそれぞれ独立した境界にあるため、片方が遅くてももう片方は先に表示される。ページ全体を静的にするか動的にするかの二択ではなく、1ページの中で組み合わせられるのが要点。"
      />

      <pre>
        <code>{`import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>ダッシュボード</h1>
      <Suspense fallback={<RevenueSkeleton />}>
        <Revenue />        {/* 遅い集計 */}
      </Suspense>
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />   {/* こちらも独立して解決する */}
      </Suspense>
    </div>
  );
}`}</code>
      </pre>

      <p>
        セグメント全体をまとめて包みたいだけなら、<code>loading.tsx</code>を置くのが最短です。そのファイルの内容が自動的に仮表示として使われます。
      </p>

      <Heading num="02">動的なアクセスは下へ押し下げる</Heading>
      <p>
        ここが実務上いちばん効く原則です。<Term>リクエスト固有の値に触れた時点から下は、事前に生成できなくなります</Term>。
      </p>
      <p>
        レイアウトやページの先頭でCookieを読んだり検索条件を待ったりすると、<Term>その下のツリー全体が動的になり</Term>、先に静的な部分を送る利点を失います。動的なアクセスは、<Term>本当に必要なコンポーネントの内側まで押し下げます</Term>。
      </p>

      <table>
        <thead>
          <tr><th>置き方</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ページの先頭でCookieを読む</td><td>ページ全体が動的になる。静的な殻が作れない</td></tr>
          <tr><td className="hl">必要な部品の中でCookieを読む</td><td>その部品だけが動的な穴になる。残りは事前に生成できる</td></tr>
        </tbody>
      </table>

      <Heading num="03">静的な殻と動的な穴</Heading>
      <p>
        あらかじめ生成できる部分 ― レイアウト、ナビゲーション、仮表示 ― をまとめて<Term>静的な殻</Term>と呼びます。これは即座に配信でき、動的な部分だけがリクエストごとに流れ込みます。
      </p>
      <p>
        従来との違いは<Term>境界の粒度</Term>です。ページ単位で静的か動的かを選ぶのではなく、1つの応答の中に両方が入ります。<Term>ほとんど静的だが1か所だけ最新が要る</Term>ページを、丸ごと動的にせずに済むのがこの仕組みの効きどころです。
      </p>

      <Aside label="静的書き出しという選択">
        逆に、動的な部分を1つも持たないと決めれば、<Term>全ページをビルド時に生成して、出来上がったファイルだけを配信する</Term>形にできます。サーバーは動かず、置き場所を選びません。このサイトがまさにその構成です。使える機能は減りますが、<Term>減らすことが目的に合っているなら正しい選択</Term>になります。
      </Aside>

      <Heading num="04">入口での共通処理</Heading>
      <p>
        リクエストがルートに届く前に走る仕組みがあります。<Term>Next.js 16から、以前Middlewareと呼ばれていたものはProxyという名前になりました</Term>(機能は同じです)。プロジェクトの直下に<code>proxy.ts</code>を置き、決められた名前の関数を書き出します。
      </p>

      <table>
        <thead>
          <tr><th>向いていること</th><th>向いていないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ヘッダーの付与・書き換え</td><td>遅いデータ取得</td></tr>
          <tr><td className="hl">条件によるリダイレクト・書き換え</td><td>セッション管理や認可のすべてを任せること</td></tr>
          <tr><td className="hl">実験の振り分け</td><td>重い処理全般</td></tr>
        </tbody>
      </table>

      <p>
        原則は<Term>軽い振り分けに留める</Term>ことです。ここは全リクエストが通る場所なので、重い処理を置くとサイト全体が遅くなります。認可も、ここでの判定は<Term>入口での大まかな仕分け</Term>にすぎず、本当の検証は実際にデータへ触れる場所で行います。
      </p>

      <Heading num="05">送るものを減らす</Heading>
      <p>
        配信の最適化には、届け方の工夫だけでなく<Term>そもそも送る量を減らす</Term>側面もあります。フレームワークが用意している主なものは次のとおりです。
      </p>

      <table>
        <thead>
          <tr><th>対象</th><th>やってくれること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画像</td><td>形式の変換、表示サイズに応じた配信、場所の予約</td></tr>
          <tr><td className="hl">フォント</td><td>自分の配信元への取り込み、切り替え時のずれの抑制</td></tr>
          <tr><td className="hl">遷移</td><td>画面に入った時点での先読み</td></tr>
          <tr><td className="hl">分割</td><td>ルート単位での自動分割、必要な時点での読み込み</td></tr>
        </tbody>
      </table>

      <p>
        測り方と、それ以外の打ち手は<Link href="/frontend/perf">表示速度を測って直す</Link>で扱いました。<Term>フレームワークが自動でやってくれる範囲を知っておく</Term>と、自分で書くべき部分がはっきりします。
      </p>

      <Analogy label="💡 たとえるなら">
        全部そろうまで待つ配信は、コース料理を全品まとめて運ぶことです。1品が遅れれば全員が待ちます。準備できた順に送るのは、できた料理から順にテーブルへ運ぶこと。静的な殻は、席に着いた瞬間に出ている水とおしぼり ― 厨房の状況に関係なく、必ず先に置かれています。そして入口の共通処理は受付です。席へ案内したり入店を断ったりはしますが、料理は作りません。
      </Analogy>

      <Heading num="まとめ">1ページの中で組み合わせる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>境界ごとに独立して届く</h4>
          <p>遅い1か所がページ全体を止めない。粒度がそのまま体感になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>動的なアクセスは下へ</h4>
          <p>上で触れると、その下すべてが動的になる。静的な殻が作れなくなる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>入口は軽く保つ</h4>
          <p>全リクエストが通る場所。重い処理を置くとサイト全体が遅くなる。</p>
        </Card>
      </CardGrid>

      <p>
        フロントエンドセクションはここまでです。APIの向こう側はバックエンドセクション、本番でどう動かすかはインフラセクションの担当になります。
      </p>

      <DocsFooter href="/frontend/nextjs-rendering" />
    </DocsPage>
  );
}
