import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ルーターに分割する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ルーターに分割する ― 前置きを1箇所に寄せる</h1>
        <Lead>
          機能が増えるほど、すべてのルートを1つのファイルに書き続けるのは苦しくなります。<Term>Router</Term>は、ルーティングを「小さなアプリ」の単位に切り出す仕組みです。単にファイルを分けるだけでなく、<Term>URLの前置きを1箇所に寄せられる</Term>ことが本当の利点です。
        </Lead>
      </Hero>

      <Heading num="01">1ファイルに全部書くと何が困るか</Heading>
      <table>
        <thead>
          <tr><th></th><th>1ファイルに全ルート</th><th>分割したとき</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">見通し</td><td>数百行から目的のルートを探す</td><td>ファイル名で対象が分かる</td></tr>
          <tr><td className="hl">変更</td><td>全員が同じファイルを触り、衝突する</td><td>担当ファイルだけを触れる</td></tr>
          <tr><td className="hl">共通処理</td><td>ルートごとに書き足す</td><td>ルーター単位でまとめて適用</td></tr>
          <tr><td className="hl">パスの変更</td><td>全行を書き換える</td><td>マウントの1行を直す</td></tr>
        </tbody>
      </table>

      <Heading num="02">ミニアプリを作る</Heading>
      <p>
        <code>Router()</code>が返すのは、いわば<Term>ミニアプリ</Term>です。本体と同じようにルートを登録でき、ミドルウェアも差し込めます。違いは、<Term>それ単体では待ち受けを始めない</Term>点です。
      </p>

      <pre>
        <code>{`// routes/users.ts ― ユーザー関連だけをまとめたミニアプリ
import { Router } from "express";

const router = Router();

// パスは "/users" を除いた残りだけを書く
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

export default router;`}</code>
      </pre>

      <p>
        要点は、ルーター内のパスが<Term>マウント先を除いた相対パス</Term>になることです。前置きは呼び出す側で一度だけ指定します。
      </p>

      <Heading num="03">積み重ねてURLになる</Heading>
      <DiagramFrame
        slug="backend-express-mount"
        aspect="640 / 300"
        caption="ルーターを重ねてマウントすると、URLが前置きの積み重ねで組み立てられることを示した図。アプリ本体がひとつの前置きでまとめ役をマウントし、まとめ役が別の前置きでユーザー用のルーターをマウントし、そのルーターには相対パスだけが書かれている。右にはこの3つが積み重なって最終的なURLになる様子が、3色に区切られた1本の帯として示される。各ファイルは自分の中の相対的な位置だけを書けばよいので、接頭辞を変えたいときはいちばん上の1行を直すだけで全体が追従する。同じ理由で、ルーター単位のミドルウェアもそのルーター配下すべてに一度で効く。"
      />

      <pre>
        <code>{`// routes/index.ts ― ルーターの取りまとめ役
const router = Router();
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
export default router;

// app.ts ― 本体はこの1行でルート全体を組み込める
app.use("/api", routes);   // → GET /api/users, GET /api/posts/:id ...`}</code>
      </pre>

      <p>
        本体・取りまとめ・各リソースという3段の役割分担にしておくと、規模が大きくなっても骨格が崩れにくくなります。<Term>共通の接頭辞を1箇所で付け替えられる</Term>ため、バージョンを切るときにも効いてきます。
      </p>

      <Heading num="04">ルーター単位で条件をかける</Heading>
      <p>
        ルーターにもミドルウェアを差し込めます。「このリソースに触る人は全員ログイン必須」といった条件を、<Term>入口に一度だけ置ける</Term>ようになります。
      </p>

      <pre>
        <code>{`// このルーター配下すべてに認証チェックをかける
router.use(requireAuth);

// ルーターの中にルーターをマウントすることもできる
router.use("/:id/posts", userPostsRouter);   // → /users/:id/posts`}</code>
      </pre>

      <Aside label="深くしすぎない">
        入れ子にできると、つい階層を深くしがちです。しかし<Term>3段を超えるURLは、たいてい別のリソースとして切り出したほうが素直</Term>になります。<Link href="/backend/api-rest">REST</Link>の階層設計と同じ判断がここでも効きます。
      </Aside>

      <Analogy label="💡 たとえるなら">
        部署ごとのフロア案内図です。会社全体の巨大な案内板に全社員の座席を描き込む代わりに、フロアごとに小さな図を用意します。各フロアの図には<Term>そのフロア内の相対的な場所</Term>だけを書けばよく、「このビルの3階です」という前置きは入口の総合案内で一度だけ示します。フロアが増えても、総合案内に1行足すだけで済みます。
      </Analogy>

      <Heading num="まとめ">切り出して、前置きは呼ぶ側に</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ルーターはミニアプリ</h4>
          <p>対象ごとに切り出す。単体では待ち受けを始めない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>前置きは1箇所に寄せる</h4>
          <p>中は相対パス。接頭辞の変更が1行で済む。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>条件も単位でかけられる</h4>
          <p>ルーターの入口に一度置けば、配下すべてに効く。</p>
        </Card>
      </CardGrid>

      <p>
        整理ができたら、次はハンドラが受け取るものの中身です。<Link href="/backend/express-request">Requestオブジェクト</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-router" />
    </DocsPage>
  );
}
