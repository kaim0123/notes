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
  title: "Requestオブジェクト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>Requestオブジェクト ― クライアントから届いた情報を読む</h1>
        <Lead>
          ルートハンドラの第1引数<code>req</code>には、クライアントから届いた<Term>リクエストの中身</Term>がすべて詰まっています。パスに埋め込まれた値、URL末尾のクエリ、POSTの本文、ヘッダー ― これらを<code>req</code>のどのプロパティから取り出すかを知れば、リクエストの「読み取り」は一通り書けるようになります。
        </Lead>
      </Hero>

      <Heading num="01">reqとは ― 届いたリクエストを表すオブジェクト</Heading>
      <p><code>req</code>(request)は、Expressが受け取ったHTTPリクエストを1つのオブジェクトにまとめたものです。クライアントが「どのURLに」「どのメソッドで」「どんなデータを添えて」アクセスしてきたか ― その情報はすべて<code>req</code>のプロパティとして読み出せます。ハンドラの仕事は、この<code>req</code>から必要な値を取り出し、<Link href="/dev/backend/express/response">res</Link>で応答を組み立てることに尽きます。</p>
      <table>
        <thead>
          <tr><th>プロパティ</th><th>中身</th><th>由来</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>req.params</code></td><td>パスから取り出した値</td><td><code>/users/:id</code>の<code>:id</code>部分</td></tr>
          <tr><td className="hl"><code>req.query</code></td><td>クエリ文字列</td><td>URL末尾の<code>?page=2</code></td></tr>
          <tr><td className="hl"><code>req.body</code></td><td>リクエスト本文</td><td>POST/PUTで送られたデータ</td></tr>
          <tr><td className="hl"><code>req.headers</code></td><td>リクエストヘッダ</td><td><code>Authorization</code>・<code>Content-Type</code>など</td></tr>
          <tr><td className="hl"><code>req.method</code> / <code>req.url</code></td><td>メソッドとURL</td><td><code>&quot;GET&quot;</code>・<code>&quot;/users?page=2&quot;</code></td></tr>
          <tr><td className="hl"><code>req.ip</code> / <code>req.cookies</code></td><td>接続元IP・Cookie</td><td>アクセス元情報(Cookieは別途設定が必要)</td></tr>
        </tbody>
      </table>

      <Heading num="02">params ― パスに埋め込まれた値</Heading>
      <p><Link href="/dev/backend/express/routing">ルーティング</Link>で<code>:id</code>のように書いたパラメータは、<code>req.params</code>に同じ名前のキーで入ります。「どのリソースか」をURLで指定するREST的な設計では、まずここを読むことになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// GET /users/42/posts/7
app.get("/users/:userId/posts/:postId", (req, res) => {
  console.log(req.params.userId); // "42"
  console.log(req.params.postId); // "7"
  res.json({ userId: req.params.userId, postId: req.params.postId });
});`}</code>
      </pre>
      <p><code>req.params</code>の値は<strong>常に文字列</strong>です。数値として扱いたいときは<code>Number(req.params.id)</code>で変換します。URLから来た値は信用せず、型や範囲を確かめる姿勢が後の<Link href="/dev/backend/express/validation">バリデーション</Link>につながります。</p>

      <Heading num="03">query ― URL末尾のクエリ文字列</Heading>
      <p><code>?</code>以降の<Term>クエリ文字列</Term>は<code>req.query</code>にオブジェクトとして入ります。一覧の絞り込みやページ送りのように、「リソースそのものではなく、取り出し方を指定する」条件を渡す場所です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// GET /search?keyword=express&page=2
app.get("/search", (req, res) => {
  const keyword = req.query.keyword; // "express"
  const page = Number(req.query.page ?? 1); // "2" → 2
  res.json({ keyword, page });
});`}</code>
      </pre>
      <p>こちらも値は文字列(または文字列の配列)です。<code>?tag=a&amp;tag=b</code>のように同じキーを複数回書くと配列になる点も覚えておくと、想定外の型に振り回されずに済みます。</p>

      <Heading num="04">body ― POSTなどで送られた本文</Heading>
      <p>フォーム送信やAPIの作成リクエストで送られたデータは<code>req.body</code>に入ります。ただし<code>req.body</code>は、<strong>本文を解釈するミドルウェアを入れて初めて</strong>読めるようになります。JSONを受け取るなら、後述の<code>express.json()</code>をアプリに登録しておく必要があります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";
const app = express();

app.use(express.json()); // これが無いと req.body は undefined

// POST /users  { "name": "Alice" }
app.post("/users", (req, res) => {
  const name = req.body.name; // "Alice"
  res.status(201).json({ created: name });
});`}</code>
      </pre>
      <Aside label="req.bodyがundefined?">
        <code>req.body</code>が<code>undefined</code>になる原因のほとんどは、<code>express.json()</code>の登録漏れか、リクエスト側の<code>Content-Type: application/json</code>指定漏れです。本文の解釈はミドルウェアの仕事 ― この仕組みは<Link href="/dev/backend/express/json">JSON API</Link>で詳しく扱います。
      </Aside>

      <Heading num="05">headers・その他 ― メタ情報を読む</Heading>
      <p>本文以外の付随情報は<code>req.headers</code>や個別のプロパティから読みます。<code>req.headers.authorization</code>は認証トークンの受け取り口、<code>req.method</code>・<code>req.url</code>はログ出力で頻出、<code>req.ip</code>はアクセス元の記録に使います。<code>req.cookies</code>は<code>cookie-parser</code>のようなミドルウェアを入れて初めて読める点は<code>req.body</code>と同じ考え方です。</p>
      <table>
        <thead>
          <tr><th>読みたいもの</th><th>プロパティ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">認証トークン</td><td><code>req.headers.authorization</code></td></tr>
          <tr><td className="hl">本文の形式</td><td><code>req.headers[&quot;content-type&quot;]</code></td></tr>
          <tr><td className="hl">アクセス元</td><td><code>req.ip</code></td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        <code>req</code>は、受付に届いた「1通の封筒」です。封筒に書かれた宛先の部屋番号が<code>params</code>、宛名脇のメモ書き(「至急」「2部ください」)が<code>query</code>、封筒の中に入った書類そのものが<code>body</code>、差出人や消印などの欄が<code>headers</code>。中の書類(body)を読むには封を開ける道具 ―<code>express.json()</code>― が要る、というわけです。
      </Analogy>

      <Heading num="まとめ">reqは「どこを見るか」を覚えれば読める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>params / query はURL由来</h4><p>パスの<code>:id</code>は<code>params</code>、<code>?</code>以降は<code>query</code>。どちらも値は文字列。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>body はミドルウェア前提</h4><p><code>express.json()</code>を入れて初めて<code>req.body</code>が読める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>headers ほかはメタ情報</h4><p>認証トークン・アクセス元など、本文以外の付随情報を読む。</p></Card>
      </CardGrid>
      <p>リクエストを読み取れたら、次は応答を組み立てる番です。<Link href="/dev/backend/express/response">Responseオブジェクト</Link>で、<code>res</code>を使った返し方を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/response" tag="開発">Responseオブジェクト</RelatedLink>
            <RelatedLink href="/dev/backend/express/routing" tag="開発">ルーティング</RelatedLink>
            <RelatedLink href="/dev/backend/express/json" tag="開発">JSON API</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
