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
  title: "最初のサーバー",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>最初のサーバー ― express() でアプリを作り listen する</h1>
        <Lead>
          Expressのサーバーは、驚くほど少ない行数で動き出します。やることは3つだけ
          ―<Term>アプリを作る</Term>・<Term>応答を登録する</Term>・
          <Term>待ち受けを始める</Term>
          。まずはこの最小構成を組み立て、以降のページで扱う<code>req</code>・
          <code>res</code>やルーティングの土台を作ります。
        </Lead>
      </Hero>

      <Heading num="01">express() ― アプリの本体を作る</Heading>
      <p>
        <code>express</code>をインポートして呼び出すと、
        <Term>アプリケーションインスタンス</Term>(慣習的に<code>app</code>
        と名付けます)が返ります。この<code>app</code>
        が、これから登録するルーティングやミドルウェアをすべて束ねる
        <Term>司令塔</Term>です。以降の<code>app.get(...)</code>や
        <code>app.use(...)</code>
        は、すべてこのオブジェクトに対して設定を積み上げていく操作になります。
      </p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";

const app = express(); // アプリ本体を1つ作る`}</code>
      </pre>
      <p>
        「<Link href="/dev/runtime">ランタイム</Link>
        」で見たとおり、Node.js自身も標準の<code>http</code>
        モジュールでサーバーを立てられます。Expressの<code>app</code>
        は、その低レベルなHTTP処理を内側に隠し、宣言的に組み立てられる薄い層としてかぶせたものだと考えると分かりやすいです。
      </p>

      <Heading num="02">最小の動くサーバー</Heading>
      <p>
        アプリに1つだけ応答を登録し、待ち受けを始めれば、それだけで動くWebサーバーになります。次のコードは、ブラウザで
        <code>http://localhost:3000/</code>を開くと「Hello
        Express」と返す、これ以上削れない最小構成です。
      </p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";

const app = express();

// ルートパス "/" に GET で来たリクエストへの応答を登録
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// 3000番ポートで待ち受け開始
app.listen(3000, () => {
  console.log("http://localhost:3000 で起動しました");
});`}</code>
      </pre>
      <p>
        行数は少なくても、ここには後続ページで深掘りする要素がひととおり顔を出しています。
        <code>app.get(&quot;/&quot;, ...)</code>が<Term>ルーティング</Term>
        、その第2引数の関数が<Term>ハンドラ</Term>、ハンドラが受け取る
        <code>req</code>・<code>res</code>が<Term>リクエスト</Term>と
        <Term>レスポンス</Term>です。
      </p>

      <Heading num="03">app.listen() ― 待ち受けを始める</Heading>
      <p>
        <code>app.listen(ポート番号)</code>
        を呼ぶと、そのポートでリクエストを待ち受けるようになります。
        <Term>ポート番号</Term>
        は「1台のサーバー上のどの入り口で待つか」を表す番号で、開発では
        <code>3000</code>
        がよく使われます。第2引数のコールバックは待ち受け開始後に一度だけ呼ばれ、起動確認のログを出すのに使います。
      </p>
      <p>
        重要なのは、<code>app.listen()</code>を呼ぶまでサーバーは
        <Term>何も待ち受けていない</Term>
        という点です。ルーティングやミドルウェアの登録は<code>listen</code>より
        <strong>前に</strong>済ませておき、最後に<code>listen</code>
        で起動する、という順序が基本の型になります。
      </p>
      <table>
        <thead>
          <tr>
            <th>ステップ</th>
            <th>やること</th>
            <th>コード</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1. 作る</td>
            <td>アプリ本体を用意</td>
            <td>
              <code>const app = express()</code>
            </td>
          </tr>
          <tr>
            <td className="hl">2. 登録する</td>
            <td>ルート・ミドルウェアを積む</td>
            <td>
              <code>app.get(...)</code> / <code>app.use(...)</code>
            </td>
          </tr>
          <tr>
            <td className="hl">3. 起動する</td>
            <td>ポートで待ち受け開始</td>
            <td>
              <code>app.listen(3000)</code>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">req と res ― この先の主役</Heading>
      <p>
        ハンドラの2つの引数<code>req</code>・<code>res</code>
        は、Expressを書くうえで最も頻繁に触れるオブジェクトです。ここでは役割のイメージだけ掴んでおけば十分です。
      </p>
      <ul>
        <li>
          <code>req</code>(リクエスト) …{" "}
          <strong>クライアントから届いた情報</strong>
          。URLのパラメータ・クエリ・本文・ヘッダーなどを読み取る側。
        </li>
        <li>
          <code>res</code>(レスポンス) … <strong>クライアントへ返す応答</strong>
          。本文・ステータスコードなどを組み立てて送り返す側。
        </li>
      </ul>
      <p>
        上の例では<code>res.send(&quot;Hello Express&quot;)</code>
        で文字列を返しました。APIでは代わりに<code>res.json(...)</code>
        でJSONを返すのが定番です。<code>req</code>から何を取り出せるかは「
        <Link href="/dev/backend/express/request">Requestオブジェクト</Link>
        」で、<code>res</code>で何を返せるかは「
        <Link href="/dev/backend/express/response">Responseオブジェクト</Link>
        」で詳しく扱います。
      </p>

      <Aside label="開発中の再起動">
        コードを変更するたびにサーバーを手で止めて起動し直すのは面倒です。ファイルの変更を検知して自動で再起動してくれる
        <Term>nodemon</Term>や、Node.js標準の<code>--watch</code>
        オプションといった手段があります。ここでは「そういう仕組みがある」とだけ覚えておけば十分です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        サーバーを立ち上げる流れは、お店を開店する準備に似ています。
        <code>express()</code>
        は「店舗を1つ借りる」こと、ルートやミドルウェアの登録は「メニューを決め、入口の受付ルールを敷く」こと。そして
        <code>app.listen()</code>
        は「暖簾を出して営業開始」の合図です。暖簾を出す前にメニューを整えておくように、
        <code>listen</code>の前に登録を済ませておくのが自然な順番なのです。
      </Analogy>

      <Heading num="まとめ">3ステップでサーバーは動き出す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>express() でアプリを作る</h4>
          <p>
            <code>app</code>がルート・ミドルウェアを束ねる司令塔になる。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ハンドラで応答を登録する</h4>
          <p>
            <code>app.get(&quot;/&quot;, (req, res) =&gt; ...)</code>
            のように、パスと処理を結びつける。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>app.listen() で起動する</h4>
          <p>登録をすべて済ませてから、最後にポートで待ち受けを始める。</p>
        </Card>
      </CardGrid>
      <p>
        最小のサーバーが動いたら、次は「どのURL・どのメソッドに、どう応えるか」を増やしていきます。次は
        <Link href="/dev/backend/express/routing">ルーティング</Link>
        を見ていきましょう。
      </p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express" tag="開発">
              Express概要
            </RelatedLink>
            <RelatedLink href="/dev/backend/express/routing" tag="開発">
              ルーティング
            </RelatedLink>
            <RelatedLink href="/dev/runtime" tag="開発">
              ランタイム
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
