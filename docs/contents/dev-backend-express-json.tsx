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
  title: "JSON API",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>JSON API ― JSONでデータをやり取りする</h1>
        <Lead>
          Webの<Term>API</Term>が扱うデータ形式は、いまや<Term>JSON</Term>が事実上の標準です。Expressでは「返すとき」と「受け取るとき」の両方向でJSONを扱いますが、この2つは対称ではありません。返す側は<code>res.json()</code>一つで完結する一方、受け取る側は<strong>ひと手間の準備</strong>が要ります。この非対称さの理由を押さえると、初心者がつまずきやすい<code>req.body</code>が<code>undefined</code>問題を避けられます。
        </Lead>
      </Hero>

      <Heading num="01">JSONとは ― 言語をまたいでデータを運ぶ書式</Heading>
      <p><Term>JSON</Term>(JavaScript Object Notation)は、オブジェクトや配列を<strong>文字列</strong>として表現するためのデータ書式です。もともとJavaScriptの記法から生まれましたが、いまではPythonでもGoでも読み書きでき、言語をまたいでデータを受け渡すための共通語になっています。JavaScriptのオブジェクトによく似ていますが、キーは必ずダブルクオートで囲む、関数やコメントは書けない、といった制約のある「テキスト」である点が本質です(値としての詳細は<Link href="/dev/language">言語</Link>側に譲ります)。</p>
      <table>
        <thead>
          <tr><th></th><th>JavaScriptのオブジェクト</th><th>JSON</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">正体</td><td>メモリ上のデータ構造</td><td>ただの文字列(テキスト)</td></tr>
          <tr><td className="hl">キー</td><td>クオート省略可</td><td>必ず<code>&quot;...&quot;</code></td></tr>
          <tr><td className="hl">相互変換</td><td colSpan={2}><code>JSON.stringify()</code>で文字列へ / <code>JSON.parse()</code>でオブジェクトへ</td></tr>
        </tbody>
      </table>
      <p>ネットワークを流れるのは文字列だけなので、APIのやり取りは常に「オブジェクト ⇄ JSON文字列」の変換とセットになります。Expressはこの変換を、送受信それぞれの場面で肩代わりしてくれます。</p>

      <Heading num="02">JSONを返す ― res.json()</Heading>
      <p>レスポンスとしてJSONを返すのは<code>res.json()</code>一つで済みます。引数に渡したオブジェクトや配列を自動で<code>JSON.stringify()</code>し、さらに<code>Content-Type: application/json</code>というヘッダーも付けてくれます。「これはJSONですよ」という宣言まで面倒を見てくれる点が、素の<code>res.send()</code>との違いです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app.get("/users", (req, res) => {
  const users = [{ id: 1, name: "Alice" }];
  res.json(users); // 配列を自動でJSON文字列化し、Content-Typeも設定
});

// ステータスコードと組み合わせるのが定石
app.post("/users", (req, res) => {
  res.status(201).json({ id: 2, name: "Bob" }); // 201 Created
});`}</code>
      </pre>
      <p><code>res.status()</code>は自分自身を返すので、<code>res.status(201).json(...)</code>のように<Term>メソッドチェーン</Term>でつなげます。<Link href="/dev/backend/express/response">Response</Link>の回で見たとおり、ステータスコードで結果の種類を、ボディで中身を伝えるのがAPIの基本形です。</p>

      <Heading num="03">JSONを受け取る ― express.json()という関門</Heading>
      <p>問題は受け取る側です。クライアントが<code>POST</code>で送ってきたJSONは、Expressの初期状態では<code>req.body</code>に入っていません。<code>req.body</code>は<code>undefined</code>のままです。なぜなら、届いたリクエストのボディは<strong>まだ生の文字列(正確にはバイト列)</strong>のままで、誰もそれをオブジェクトへ変換していないからです。</p>
      <p>この変換を担うのが<code>express.json()</code>という<Link href="/dev/backend/express/middleware">ミドルウェア</Link>です。<code>app.use()</code>で登録しておくと、ボディがJSONのリクエストを見つけるたびに<code>JSON.parse()</code>し、その結果を<code>req.body</code>へ詰めてからハンドラへ渡してくれます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";

const app = express();

// これがないと req.body は undefined のまま
app.use(express.json());

app.post("/users", (req, res) => {
  // { name: "Bob" } のようなJSONを送ると、ここで取り出せる
  const { name } = req.body;
  res.status(201).json({ id: 2, name });
});`}</code>
      </pre>
      <Aside label="つまずきポイント">
        <code>req.body</code>が<code>undefined</code>になる原因の大半は、この<code>app.use(express.json())</code>の書き忘れです。しかもハンドラより<strong>前</strong>に登録しないと効きません。ミドルウェアは登録順に実行されるため、変換係が先に並んでいる必要があります。
      </Aside>

      <Heading num="04">body-parserの歴史 ― なぜ標準に取り込まれたか</Heading>
      <p>かつてExpressにはボディを解釈する機能がなく、<code>body-parser</code>という別パッケージを追加でインストールするのが定番でした。あまりに誰もが使うため、Express 4.16以降はその機能が本体に<Term>組み込み</Term>られ、<code>express.json()</code>や<code>express.urlencoded()</code>として標準で呼べるようになりました。</p>
      <table>
        <thead>
          <tr><th>時期</th><th>書き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">昔</td><td><code>npm i body-parser</code>して<code>bodyParser.json()</code></td></tr>
          <tr><td className="hl">今</td><td>追加インストール不要。<code>express.json()</code>を使う</td></tr>
        </tbody>
      </table>
      <p>古い記事やサンプルには<code>body-parser</code>を<code>import</code>するコードが残っていますが、中身は同じものです。新規に書くなら組み込みの<code>express.json()</code>で構いません。「薄いExpressに、みんなが使う機能が少しずつ取り込まれてきた」という<Link href="/dev/backend/express">Express概要</Link>で触れたミニマリスト設計の一例でもあります。</p>

      <Heading num="05">JSON APIとREST ― フロントとの分担点</Heading>
      <p>「URL(リソース)とHTTPメソッド(操作)の組で、JSONをやり取りする」という設計様式を<Term>REST API</Term>と呼びます。ここでは深入りしませんが、<code>GET /users</code>で一覧を、<code>POST /users</code>で作成を、といった対応づけの考え方は<Link href="/dev/backend/api/rest">REST API</Link>で詳しく扱います。</p>
      <p>そして、このJSONを画面側で受け取るのが<Term>フロントエンド</Term>の役目です。React コンポーネントの<code>fetch</code>や、<Link href="/dev/frontend/nextjs">Next.js</Link>の<Term>Route Handler</Term>が、Expressの返したJSONを取り込んで画面に描きます。ExpressがJSONを吐くバック、Reactがそれを受けて描くフロント ― この分担が、いまのWebアプリケーションの典型的な形です。</p>

      <Analogy label="💡 たとえるなら">
        JSONは、海外へ荷物を送るときの<strong>共通の梱包規格</strong>です。中身(データ)はそのままでは国境(ネットワーク)を越えられないので、決まった箱(文字列)に詰め直して送ります。<code>res.json()</code>は「送る前に規格どおり梱包する係」、<code>express.json()</code>は「届いた箱を開けて中身を取り出す係」。開梱係を受付に配置し忘れると、箱は届いても中身が取り出せない ― これが<code>req.body</code>が空になる正体です。
      </Analogy>

      <Heading num="まとめ">送るのは一発、受け取るには開梱係が要る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>返すのは res.json() だけ</h4><p>オブジェクトを自動でJSON文字列化し、Content-Typeも付けてくれる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>受け取るには express.json()</h4><p>ハンドラより前に<code>app.use()</code>で登録しないと<code>req.body</code>は空。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>body-parserは本体に統合済み</h4><p>今は追加インストール不要。古いサンプルの名残と割り切る。</p></Card>
      </CardGrid>
      <p>ここまでで、動いてJSONをやり取りするAPIができました。次はこの膨らんでいくコードを整理する番です。<Link href="/dev/backend/express/router">Router（ルーター分割）</Link>で、ルーティングをファイルごとに分ける方法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/rest" tag="開発">REST API</RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs" tag="開発">Next.js</RelatedLink>
            <RelatedLink href="/dev/backend/express/middleware" tag="開発">ミドルウェア</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
