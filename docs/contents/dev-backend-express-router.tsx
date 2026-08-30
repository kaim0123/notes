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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Router（ルーター分割）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>Router ― ルーティングをファイルに分割する</h1>
        <Lead>
          機能が増えるほど、すべてのルートを1つのファイルに書き続けるのは苦しくなります。<Term>express.Router()</Term>は、ルーティングを「小さなアプリ」の単位に切り出し、リソースごとに別ファイルへ分けるための仕組みです。ここでは、なぜ分割するのか、どう束ねて<Link href="/dev/backend/express">アプリ</Link>に組み込むのかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">なぜコードを分割するのか</Heading>
      <p>ルートを追加するたびに<code>app.ts</code>が伸びていくと、やがて数百行の<code>app.get</code>・<code>app.post</code>が1ファイルに並びます。<code>/users</code>を直したいのに<code>/posts</code>の定義をかき分けて探すことになり、変更のたびに関係ないコードまで目に入ります。分割の狙いは、<Term>関心事ごとにファイルを分ける</Term>ことです。ユーザー関連のルートは<code>routes/users.ts</code>に、投稿関連は<code>routes/posts.ts</code>に、というように「どこを見ればいいか」がファイル名で分かる状態にします。</p>
      <table>
        <thead>
          <tr><th></th><th>1ファイルに全ルート</th><th>Routerで分割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">見通し</td><td>数百行から目的のルートを探す</td><td>ファイル名でリソースが分かる</td></tr>
          <tr><td className="hl">変更</td><td>1ファイルを全員が触り衝突しやすい</td><td>担当ファイルだけを触れる</td></tr>
          <tr><td className="hl">共通処理</td><td>ルートごとに書き足す</td><td>ルーター単位でまとめて適用</td></tr>
        </tbody>
      </table>

      <Heading num="02">express.Router() ― ミニアプリを作る</Heading>
      <p><Term>express.Router()</Term>が返すのは、いわば<Term>ミニアプリ</Term>です。<code>app</code>と同じように<code>router.get</code>・<code>router.post</code>でルートを登録でき、ミドルウェアも差し込めます。違いは、それ単体では待ち受けを始めず、あとで本体の<code>app</code>に「マウント」して初めて動く点です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// routes/users.ts ― ユーザー関連のルートだけをまとめたミニアプリ
import { Router } from "express";

const router = Router();

// パスは "/users" を除いた残りだけを書く（マウント時に前置きされる）
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

router.post("/", (req, res) => {
  res.status(201).json({ created: true });
});

export default router;`}</code>
      </pre>
      <p>ポイントは、ルーター内のパスが<strong>マウント先を除いた相対パス</strong>になることです。<code>/users</code>にマウントする前提なら、一覧は<code>&quot;/&quot;</code>、個別取得は<code>&quot;/:id&quot;</code>と書きます。前置きの<code>/users</code>は本体側で一度だけ指定します。</p>

      <Heading num="03">app.use でマウントする</Heading>
      <p>切り出したルーターは、本体の<code>app</code>で<code>app.use(パス, ルーター)</code>としてマウントします。第1引数のパスが、そのルーター内の全ルートに前置きされます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app.ts ― 本体はルーターを組み立てるだけの薄い入り口になる
import express from "express";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";

const app = express();
app.use(express.json());

app.use("/users", usersRouter); // router 内の "/" → GET /users
app.use("/posts", postsRouter); // router 内の "/:id" → GET /posts/:id

app.listen(3000);`}</code>
      </pre>
      <p>この形にすると、<code>app.ts</code>は「どのリソースをどのパスに載せるか」の一覧だけになり、実際のルート定義は各ファイルへ移ります。<code>/users</code>を直すときは<code>routes/users.ts</code>だけを開けばよく、本体を触る必要はありません。</p>

      <Heading num="04">ルーター単位のミドルウェアとネスト</Heading>
      <p>ルーターにも<code>router.use()</code>でミドルウェアを差し込めます。「このリソースにアクセスする人は全員ログイン必須」といった条件を、ルーター単位でまとめて適用できます。<Link href="/dev/backend/express/middleware">ミドルウェア</Link>をルートごとに書き足す代わりに、ルーターの入口に一度だけ置く形です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// このルーター配下すべてに認証チェックをかける
router.use(requireAuth);

// さらにルーターの中にルーターをマウントすることもできる（ネスト）
// GET /users/:id/posts のような階層を、users ルーター側で組み立てる
router.use("/:id/posts", userPostsRouter);`}</code>
      </pre>
      <p>ルーターの中にさらにルーターをマウントすれば、<code>/users/:id/posts</code>のような<Term>ネスト</Term>した階層も、親リソース側のファイルで組み立てられます。ただし深くしすぎると URL が追いづらくなるため、階層は必要な分にとどめます。</p>

      <Heading num="05">index.ts で束ねる</Heading>
      <p>ルーターのファイルが増えてきたら、<code>routes/index.ts</code>を作って「ルーター群をまとめて<code>app</code>に渡す」入口を用意すると、本体はさらに薄くなります。<Term>モジュール化</Term>の一歩です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// routes/index.ts ― ルーターの取りまとめ役
import { Router } from "express";
import usersRouter from "./users";
import postsRouter from "./posts";

const router = Router();
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
export default router;

// app.ts ― 本体はこの1行でルート全体を組み込める
import routes from "./routes";
app.use("/api", routes); // GET /api/users, GET /api/posts ...`}</code>
      </pre>
      <p>こうすると、共通の接頭辞（<code>/api</code>など）を1箇所で付け替えられ、ルーターの追加も<code>index.ts</code>への1行で済みます。本体・取りまとめ・各リソースという3段の役割分担が、コードの規模が大きくなっても崩れにくい骨格になります。</p>

      <Analogy label="💡 たとえるなら">
        Router は「部署ごとのフロア案内図」です。会社全体の巨大な案内板に全社員の座席を描き込む代わりに、フロアごとに小さな案内図を用意します。各フロアの図には「そのフロア内の相対的な場所」だけを書けばよく（ルーター内の相対パス）、「このビルの3階です」という前置きは入口の総合案内で一度だけ示します（<code>app.use(&quot;/users&quot;, ...)</code>）。フロアが増えても、総合案内に1行足すだけで済みます。
      </Analogy>

      <Heading num="まとめ">リソース単位に切り出して束ねる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Router はミニアプリ</h4><p><code>express.Router()</code>で、リソースごとのルートを別ファイルに切り出す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>app.use でマウント</h4><p>接頭辞パスを本体側で一度だけ指定し、ルーター内は相対パスで書く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>index.ts で取りまとめ</h4><p>ルーター群を束ね、本体を薄く保つ。ミドルウェアもルーター単位で適用できる。</p></Card>
      </CardGrid>
      <p>ルートを整理できたら、次は各ハンドラの中身です。データベースからの取得や外部APIの呼び出しには時間がかかるため、その待ち時間を扱う<Link href="/dev/backend/express/async">非同期処理</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/routing" tag="開発">ルーティング</RelatedLink>
            <RelatedLink href="/dev/backend/express/middleware" tag="開発">ミドルウェア</RelatedLink>
            <RelatedLink href="/dev/backend/express/async" tag="開発">非同期処理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
