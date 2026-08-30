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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Express",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク・ライブラリ</Eyebrow>
        <h1>Express ― ルーティングとミドルウェアでサーバーを組み立てる</h1>
        <Lead>
          <Term>Express</Term>はNode.js向けのバックエンドフレームワークとして、長年デファクトスタンダードの地位にあります。「<Link href="/dev/runtime">ランタイム</Link>」で見たNode.jsが提供するのは、あくまでHTTPリクエストを受け取る低レベルな機能まで。「あるURLに来たリクエストにどう応えるか」を素朴に書くと処理が複雑になりがちです。Expressは、これを<Term>ルーティング</Term>と<Term>ミドルウェア</Term>という2つの概念だけで整理します。
        </Lead>
      </Hero>

      <Heading num="01">素のNode.jsとの違い ― なぜフレームワークが必要か</Heading>
      <p>Node.jsだけでもHTTPサーバーは書けます。しかし標準の<code>http</code>モジュールでは、リクエストのURLやメソッドを自分で<code>if</code>文で振り分け、レスポンスのヘッダーやステータスコードも1つずつ手で設定する必要があります。パスが増えるほど分岐は膨らみ、共通処理(ログ出力や認証チェックなど)も各分岐にコピーされていきます。</p>
      <table>
        <thead>
          <tr><th></th><th>素のNode.js(httpモジュール)</th><th>Express</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">振り分け</td><td><code>req.url</code>・<code>req.method</code>を自分で<code>if</code>分岐</td><td><code>app.get(&quot;/users&quot;, ...)</code>のように宣言的に登録</td></tr>
          <tr><td className="hl">共通処理</td><td>各分岐に手で書き足す</td><td>ミドルウェアとして一度書けば全体に適用</td></tr>
          <tr><td className="hl">レスポンス</td><td>ヘッダー・ステータスを手動設定</td><td><code>res.json()</code>・<code>res.status()</code>で簡潔に</td></tr>
        </tbody>
      </table>
      <p>Expressは、この「振り分け」を<Term>ルーティング</Term>に、「共通処理」を<Term>ミドルウェア</Term>にそれぞれ整理する薄い層です。フレームワークといっても機能を詰め込みすぎず、必要なものは追加のパッケージで足していく<Term>ミニマリスト</Term>な設計思想を持ちます。</p>

      <Heading num="02">ルーティング ― パスとメソッドで処理を決める</Heading>
      <p><Term>ルーティング</Term>とは「どのURLパスに、どのHTTPメソッドでリクエストが来たら、どの処理を実行するか」の対応づけです。<code>app.メソッド名(パス, ハンドラ)</code>という形で登録します。ハンドラは<code>req</code>(リクエスト)と<code>res</code>(レスポンス)を受け取る関数です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";

const app = express();

// GET /users → 一覧を返す
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

// GET /users/:id → :id 部分はパラメータとして受け取れる
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// POST /users → 作成
app.post("/users", (req, res) => {
  res.status(201).json({ created: true });
});

app.listen(3000);`}</code>
      </pre>
      <p>URLの一部を<code>:id</code>のように書くと<Term>ルートパラメータ</Term>になり、<code>req.params.id</code>で取り出せます。同じ<code>/users</code>でも<code>GET</code>と<code>POST</code>で別のハンドラが呼ばれる点が、<Link href="/dev/frontend/http">HTTP</Link>のメソッドとルーティングの結びつきです。<Link href="/database/sql">SQL</Link>のCRUDを、URL(リソース)とHTTPメソッド(操作)の組で表現するこの考え方は<Term>REST</Term>と呼ばれます。</p>

      <Heading num="03">ミドルウェア ― リクエストを順番に加工するパイプライン</Heading>
      <p>Expressの心臓部が<Term>ミドルウェア</Term>です。リクエストがハンドラに届くまでの間に、複数の関数を順番に通していく「パイプライン」を作れます。各ミドルウェアは<code>req</code>・<code>res</code>に加えて<code>next</code>という第3引数を受け取り、<code>next()</code>を呼ぶと「次の処理へ進む」という意味になります。</p>
      <Diagram caption="リクエストはミドルウェアを順に通り、最後にルートハンドラへ届く。next()を呼ばなければそこで処理は止まる">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <text x={40} y={55} fill="#9a9a9a" fontSize="11" textAnchor="middle">Request</text>
          <line x1={70} y1={50} x2={110} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowEx)" />
          <rect x={112} y={32} width={110} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={167} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">ログ出力</text>
          <line x1={224} y1={50} x2={258} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowEx)" />
          <rect x={260} y={32} width={110} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">認証チェック</text>
          <line x1={372} y1={50} x2={406} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowEx)" />
          <rect x={408} y={32} width={120} height={36} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={468} y={54} fill="#c9ffd8" fontSize="10" textAnchor="middle">ルートハンドラ</text>
          <line x1={530} y1={50} x2={570} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowEx)" />
          <text x={600} y={55} fill="#9a9a9a" fontSize="11" textAnchor="middle">Response</text>
          <text x={315} y={92} fill="#9a9a9a" fontSize="9" textAnchor="middle">各段で next() を呼ぶと次へ、呼ばなければここで応答を返して終了</text>
          <defs>
            <marker id="arrowEx" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app.use で登録したミドルウェアは、すべてのリクエストが通る
app.use((req, res, next) => {
  console.log(req.method, req.url); // ログを出す
  next();                           // 次へ進む
});

// リクエストボディのJSONを解釈する組み込みミドルウェア
app.use(express.json());

// 認証チェック。条件を満たさなければ next() を呼ばず応答を返す
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

// 特定のルートにだけミドルウェアを差し込むこともできる
app.get("/private", requireAuth, (req, res) => {
  res.json({ secret: true });
});`}</code>
      </pre>
      <p>ポイントは<strong>登録した順に実行される</strong>ことです。ログ出力・ボディの解釈・認証チェックといった<Term>横断的関心事</Term>を、各ハンドラにコピーするのではなく、パイプラインの一段として一度だけ書けます。<code>next()</code>を呼ばずに<code>res</code>で応答を返せば、そこで処理は打ち切られます。この「小さな処理を数珠つなぎにする」構造は、設計の視点では「<Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link>」の一例と見ることもできます。</p>
      <Aside label="エラー処理">
        引数を4つ(<code>err, req, res, next</code>)取る関数は、Expressが特別に<Term>エラーハンドリングミドルウェア</Term>として扱います。ハンドラ内で発生した例外をここへ集約し、エラー応答を一箇所にまとめられます。
      </Aside>

      <Heading num="04">Expressの立ち位置 ― 薄いからこそ長く使われてきた</Heading>
      <p>Expressの特徴は、機能を最小限に絞り、足りないものは<Link href="/dev/tooling">npm</Link>の膨大なパッケージ群(認証・バリデーション・<Link href="/database/basics">DB接続</Link>など)を組み合わせて補う点にあります。この柔軟さが、2010年頃から現在まで長く使われ続けてきた理由です。一方で「薄い」ゆえに、大規模開発では構成の型を自分たちで決める必要があり、それを嫌う場面では別の選択肢も生まれています。</p>
      <table>
        <thead>
          <tr><th>フレームワーク</th><th>特徴</th><th>Expressとの違い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Express</td><td>薄く柔軟。デファクトスタンダード</td><td>―</td></tr>
          <tr><td className="hl">Fastify</td><td>高速さとスキーマ検証を重視</td><td>より高いパフォーマンスと型安全</td></tr>
          <tr><td className="hl">NestJS</td><td>Angular風の構造を強制するフルスタック志向</td><td>大規模でも崩れにくい型を提供</td></tr>
          <tr><td className="hl">Hono</td><td>ランタイム非依存で軽量</td><td>Node.js以外(Deno・Bun・エッジ)でも動く</td></tr>
        </tbody>
      </table>
      <p>これらは、ルーティングとミドルウェアというExpressが確立した基本設計を踏襲したうえで、それぞれ「速度」「構造の強制」「動く場所の広さ」を上乗せしたものです。中でも<Term>Hono</Term>は、<Link href="/dev/runtime">Deno・Bun</Link>やCloudflare Workersのような<Term>エッジ環境</Term>でも同じコードが動く点で、Node.js以外のランタイムを使う近年の場面で採用が広がっています。</p>

      <Heading num="05">Next.jsとの関係 ― 別立てのExpressは必ずしも要らない</Heading>
      <p>このAtlasが扱う<Link href="/dev/frontend/nextjs">Next.js</Link>のようなフルスタックフレームワークでは、サーバー側の処理をフレームワーク自身が引き受けるため、別途Expressサーバーを立てないことも増えています。Next.jsの<Term>Route Handler</Term>やServer Actionsが、Expressのルーティングに相当する役割を担うためです。とはいえ、フロントエンドとは独立したAPIサーバーを持ちたい場合や、Next.js以外の構成では、今なおExpressが第一候補になります。「主導権をどちらが持つか」という<Link href="/dev/frontend/framework">フレームワークとライブラリの違い</Link>の観点では、ExpressもNext.js同様、あなたのコードを呼び出す側の<Term>フレームワーク</Term>です。</p>

      <Analogy label="💡 たとえるなら">
        ルーティングは「受付での案内」です。「1階の来客は総務へ、2階は経理へ」と、来た人(リクエスト)を行き先(ハンドラ)へ振り分けます。ミドルウェアは、案内の前に全員が通る「検温・受付記帳・入館証の確認」のような一連のチェックポイント。条件を満たさなければ(next()を呼ばなければ)そこで引き返してもらい、通過した人だけが目的の部署にたどり着きます。
      </Analogy>

      <Heading num="まとめ">2つの概念だけでサーバーの骨格ができる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ルーティングでパス×メソッドを振り分ける</h4><p><code>app.get</code>・<code>app.post</code>のように、URLとHTTPメソッドの組で処理を宣言的に登録する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ミドルウェアで横断処理をまとめる</h4><p>ログ・認証・ボディ解釈などを、登録順に流れるパイプラインの一段として一度だけ書く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>薄さゆえの柔軟さと後継たち</h4><p>足りない機能はnpmで補う。この基本設計をFastify・NestJS・Honoが受け継いでいる。</p></Card>
      </CardGrid>
      <p>Expressで組み立てたAPIが実際に受け渡しするデータは、多くの場合<Link href="/database/basics">データベース</Link>に保存されています。次は、そのデータをどう構造化して保存するか、リレーショナルデータベースの基礎を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ概要</RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs" tag="開発">Next.js</RelatedLink>
            <RelatedLink href="/dev/frontend/http" tag="開発">HTTP通信</RelatedLink>
            <RelatedLink href="/design/architecture/sys/pipeline" tag="設計">パイプラインアーキテクチャ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
