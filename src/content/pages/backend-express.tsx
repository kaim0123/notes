import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Node.js・Express" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>Node.js・Express ― 2つの概念で骨格ができる</h1>
        <Lead>
          ここまでの見出しは<Term>何を作るかの判断</Term>でした。ここからは<Term>実際のコード</Term>です。Node.jsが提供するのは、HTTPリクエストを受け取る低レベルな機能まで。<Term>Express</Term>はその上に、<Term>ルーティング</Term>と<Term>ミドルウェア</Term>という2つの概念だけを足して、サーバーの骨格を整理します。
        </Lead>
      </Hero>

      <Heading num="01">Node.jsの上に、何が足りないか</Heading>
      <p>
        Node.js自体の性質 ― 1本の流れで多数の接続を捌く仕組みや、その上での注意点は<Link href="/language/runtime">ランタイム</Link>で扱いました。ここではその上に乗るものを見ます。
      </p>
      <p>
        標準の機能だけでもHTTPサーバーは書けます。しかしURLとメソッドを自分で分岐し、ヘッダーもステータスコードも1つずつ手で設定する必要があります。パスが増えるほど分岐は膨らみ、<Term>共通処理が各分岐にコピーされていきます</Term>。
      </p>

      <table>
        <thead>
          <tr><th></th><th>標準の機能だけ</th><th>Express</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">振り分け</td><td>URLとメソッドを自分で分岐</td><td>パスとメソッドの組で宣言的に登録</td></tr>
          <tr><td className="hl">共通処理</td><td>各分岐に手で書き足す</td><td>一度書けば全体に適用</td></tr>
          <tr><td className="hl">レスポンス</td><td>ヘッダー・ステータスを手動設定</td><td>目的に応じた短い呼び出しで済む</td></tr>
        </tbody>
      </table>

      <p>
        Expressは、この「振り分け」を<Term>ルーティング</Term>に、「共通処理」を<Term>ミドルウェア</Term>にそれぞれ整理する<Term>薄い層</Term>です。機能を詰め込まず、必要なものは追加のパッケージで足していく設計思想を持ちます。
      </p>

      <Heading num="02">ルーティング ― パスとメソッドで決まる</Heading>
      <pre>
        <code>{`import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

// :id の部分はパラメータとして受け取れる
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.post("/users", (req, res) => {
  res.status(201).json({ created: true });
});

app.listen(3000);`}</code>
      </pre>

      <p>
        同じ<code>/users</code>でも、メソッドが違えば別のハンドラが呼ばれます。これは<Link href="/backend/api-rest">RESTの格子</Link>をそのままコードにした形です ― <Term>対象と操作を分けて表す</Term>という設計が、そのままルーティングの書き方になっています。
      </p>

      <Heading num="03">ミドルウェア ― 順に通るパイプライン</Heading>
      <p>
        Expressの心臓部です。リクエストがハンドラに届くまでの間に、複数の関数を順番に通していく並びを作れます。各段は<Term>次へ進むかどうかを自分で決められます</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-pipeline"
        aspect="640 / 320"
        caption="リクエストがミドルウェアを順に通ってルートハンドラへ届く様子を示した図。ログ出力、本文の解釈、認証の確認という順に並んだ段を通り、最後にハンドラへ届いて応答が返る。認証の確認の段からは下向きの分岐が出ており、条件を満たさなければ次を呼ばずにその場で応答を返して打ち切る。別の経路として、途中のどの段で例外を投げても、まとめて受け止める最後の段へ飛ぶことも示されている。下部には、登録した順がそのまま実行の順になること、横断的な処理を各ハンドラに書き写す代わりにこの並びの一段として一度だけ書けることが記されている。"
      />

      <pre>
        <code>{`// app.use で登録したものは、すべてのリクエストが通る
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();                           // 次へ進む
});

app.use(express.json());            // 本文のJSONを解釈する

// 条件を満たさなければ next() を呼ばず、その場で応答を返す
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

// 特定のルートにだけ差し込むこともできる
app.get("/private", requireAuth, (req, res) => {
  res.json({ secret: true });
});`}</code>
      </pre>

      <p>
        要点は<Term>登録した順に実行される</Term>ことです。ログ・本文の解釈・認証といった<Term>横断的な関心事</Term>を、各ハンドラにコピーするのではなく、並びの一段として一度だけ書けます。この構造は、設計の視点では<Link href="/design/architecture-pipeline">パイプラインアーキテクチャ</Link>の一例と見ることもできます。
      </p>

      <Aside label="エラーも同じ並びで受ける">
        引数を4つ取る関数は、Expressが特別に<Term>エラー用の段</Term>として扱います。どの段で投げられた例外もここへ集まるため、<Term>エラー応答の形を1箇所にまとめられます</Term>。<Link href="/backend/layers">層の境界での翻訳</Link>を実装する場所も、ここになります。
      </Aside>

      <Heading num="04">薄いからこそ長く使われてきた</Heading>
      <p>
        足りない機能はパッケージを組み合わせて補う ― この柔軟さが長く使われ続けてきた理由です。一方で薄いゆえに、規模が大きくなると<Term>構成の型を自分たちで決める必要があります</Term>。それを嫌う場面のために、別の選択肢も生まれています。
      </p>

      <table>
        <thead>
          <tr><th>選択肢</th><th>上乗せしているもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Express</td><td>―(薄く柔軟)</td></tr>
          <tr><td className="hl">Fastify</td><td>速度と、スキーマによる検証</td></tr>
          <tr><td className="hl">NestJS</td><td>構造の強制。大規模でも崩れにくい型</td></tr>
          <tr><td className="hl">Hono</td><td>動く場所の広さ。Node.js以外の環境でも同じコードが動く</td></tr>
        </tbody>
      </table>

      <p>
        いずれも、Expressが確立した<Term>ルーティングとミドルウェア</Term>という基本設計を踏襲したうえでの上乗せです。だからここで学ぶことは、他へ移っても無駄になりません。
      </p>

      <Heading num="05">Next.jsを使うなら、別立ては要らないことも</Heading>
      <p>
        <Link href="/frontend/nextjs">Next.js</Link>のようなフルスタックのフレームワークでは、サーバー側の処理をフレームワーク自身が引き受けるため、別途Expressを立てないことも増えています。とはいえ、<Term>画面とは独立したAPIサーバーを持ちたい場合</Term>や、Next.js以外の構成では、今なお第一候補です。
      </p>

      <Heading num="06">配下の進め方</Heading>
      <p>
        配下の14ページは、<Term>最小のサーバーから順に組み上げていく</Term>構成になっています。前半で道具を揃え、後半で実務に必要なものを足していきます。
      </p>

      <table>
        <thead>
          <tr><th>段階</th><th>ページ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">立てる</td><td><Link href="/backend/express-hello">最初のサーバー</Link> / <Link href="/backend/express-routing">ルーティング</Link> / <Link href="/backend/express-router">ルーターに分割する</Link></td></tr>
          <tr><td className="hl">受け取る・返す</td><td><Link href="/backend/express-request">Requestオブジェクト</Link> / <Link href="/backend/express-response">Responseオブジェクト</Link> / <Link href="/backend/express-json">JSON API</Link></td></tr>
          <tr><td className="hl">組み立てる</td><td><Link href="/backend/express-middleware">ミドルウェア</Link> / <Link href="/backend/express-async">非同期処理</Link> / <Link href="/backend/express-error">エラーハンドリング</Link></td></tr>
          <tr><td className="hl">実務に耐えさせる</td><td><Link href="/backend/express-validation">バリデーション</Link> / <Link href="/backend/express-logging">ログ</Link> / <Link href="/backend/express-design">API設計</Link> / <Link href="/backend/express-auth">認証・認可</Link> / <Link href="/backend/express-database">データベース連携</Link></td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ルーティングは受付での案内です。「1階の来客は総務へ、2階は経理へ」と、来た人を行き先へ振り分けます。ミドルウェアは、案内の前に全員が通る受付記帳や入館証の確認のようなチェックポイント。条件を満たさなければそこで引き返してもらい、通過した人だけが目的の部署にたどり着きます。
      </Analogy>

      <Heading num="まとめ">2つの概念だけで骨格ができる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ルーティングで振り分ける</h4>
          <p>対象と操作の組で、処理を宣言的に登録する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ミドルウェアでまとめる</h4>
          <p>横断的な処理を、登録順に流れる並びの一段として一度だけ書く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>薄さゆえの柔軟さ</h4>
          <p>足りない機能は組み合わせて補う。この基本設計は後継にも受け継がれている。</p>
        </Card>
      </CardGrid>

      <p>
        まずは動くものを立てるところから。<Link href="/backend/express-hello">最初のサーバー</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express" />
    </DocsPage>
  );
}
