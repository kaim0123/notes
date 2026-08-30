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
  title: "認証・認可",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>認証・認可 ― 誰なのか・何をしてよいか</h1>
        <Lead>
          公開APIでない限り、リクエストを処理する前に「これは誰からのリクエストか」「その人はこの操作をしてよいのか」を確かめる必要があります。前者が<Term>認証</Term>、後者が<Term>認可</Term>です。Expressでは、どちらも<Link href="/dev/backend/express/middleware">ミドルウェア</Link>としてルートの手前に差し込むのが基本形。ここではその置き場所と流れをつかみ、方式そのものの詳細はセキュリティの章へ委ねます。
        </Lead>
      </Hero>

      <Heading num="01">認証と認可 ― 混同しやすい2つ</Heading>
      <p><Term>認証</Term>(Authentication)は「あなたは誰か」を確かめること。ログインでパスワードやトークンを検証し、リクエストの送り主を特定します。<Term>認可</Term>(Authorization)は「その人が何をしてよいか」を決めること。認証で本人だと分かった上で、そのリソースを読んでよいか・消してよいかを判断します。順番は必ず<strong>認証 → 認可</strong>で、誰かも分からない相手に権限の判断はできません。</p>
      <table>
        <thead>
          <tr><th></th><th>認証 (Authentication)</th><th>認可 (Authorization)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">問い</td><td>あなたは誰か</td><td>それをしてよいか</td></tr>
          <tr><td className="hl">材料</td><td>パスワード・トークン・セッション</td><td>ロール・所有者・権限リスト</td></tr>
          <tr><td className="hl">失敗時</td><td><code>401 Unauthorized</code></td><td><code>403 Forbidden</code></td></tr>
          <tr><td className="hl">順番</td><td>先</td><td>後(認証済みが前提)</td></tr>
        </tbody>
      </table>
      <p>ステータスコードも役割が分かれます。「誰か分からない/ログインしていない」は<code>401</code>、「誰かは分かっているが権限がない」は<code>403</code>です。</p>

      <Heading num="02">認証の方式 ― セッションかトークンか</Heading>
      <p>「一度ログインした人を、次のリクエストでも同じ人だと認識する」ための仕組みには、大きく2系統あります。サーバー側に本人の情報を持つ<Term>セッション認証</Term>と、本人の情報を署名付きの<Term>トークン</Term>に載せてクライアントに持たせる<Term>JWT認証</Term>です。</p>
      <table>
        <thead>
          <tr><th></th><th>セッション / Cookie 認証</th><th>JWT / Bearer Token</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">状態の置き場</td><td>サーバー側にセッションを保存</td><td>トークン自体に情報。サーバーは保持しない</td></tr>
          <tr><td className="hl">運び方</td><td>Cookieに<code>session_id</code>を入れて自動送信</td><td><code>Authorization: Bearer &lt;token&gt;</code>ヘッダ</td></tr>
          <tr><td className="hl">性質</td><td>ステートフル</td><td>ステートレス(スケールしやすい)</td></tr>
          <tr><td className="hl">失効</td><td>サーバーで即座に破棄できる</td><td>有効期限まで有効。取り消しは工夫が要る</td></tr>
          <tr><td className="hl">向く場面</td><td>同一ドメインのWebアプリ</td><td>SPA・モバイル・複数サービス間</td></tr>
        </tbody>
      </table>
      <p><Term>Cookie認証</Term>はセッション認証の運び方で、ブラウザが<code>session_id</code>入りのCookieを毎回自動で送ってくれます。<Term>Bearer Token</Term>はJWTなどのトークンを<code>Authorization</code>ヘッダに手で載せる方式で、<Link href="/dev/backend/express/request">req.headers</Link>から取り出して検証します。どちらが正解ということはなく、アプリの形に合わせて選びます。</p>

      <Heading num="03">ログイン・ログアウトの流れ</Heading>
      <p>認証は「ログイン時に本人確認して身分証を渡す」「以降のリクエストでその身分証を検証する」の2段階です。JWTを例にとると、次のような流れになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET!;

// ① ログイン: 本人確認が済んだらトークンを発行して返す
app.post("/login", async (req, res) => {
  const user = await findUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "認証に失敗しました" });
  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// ② 認証ミドルウェア: 以降のリクエストでトークンを検証する
function authenticate(req, res, next) {
  const header = req.headers.authorization; // "Bearer xxx"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "トークンがありません" });
  try {
    req.user = jwt.verify(token, SECRET); // 本人情報を req に載せる
    next();
  } catch {
    return res.status(401).json({ error: "トークンが無効です" });
  }
}

app.get("/me", authenticate, (req, res) => {
  res.json({ id: req.user.sub });
});`}</code>
      </pre>
      <p><Term>ログアウト</Term>の実装は方式で変わります。セッションならサーバー側のセッションを破棄すれば即座に無効化できますが、ステートレスなJWTはサーバーが状態を持たないため、有効期限を短くする・失効リストを別途持つ、といった工夫が必要になります。ここがステートレスの引き換えです。</p>
      <Aside label="req.user への格納">
        認証ミドルウェアが検証した本人情報を<code>req.user</code>に載せておくのが定石です。以降のハンドラや認可ミドルウェアは、トークンを再検証せずこの値を見るだけで「誰か」を知れます。
      </Aside>

      <Heading num="04">認可 ― ミドルウェアで権限を確かめる</Heading>
      <p>認証で<code>req.user</code>が埋まったら、次は<Term>認可</Term>です。これも<Link href="/dev/backend/express/middleware">ミドルウェア</Link>として書きます。「管理者だけ」というロール判定や、「自分のリソースだけ」という所有者判定を、ルートハンドラの手前で行い、条件を満たさなければ<code>403</code>で打ち切ります。「誰が何をしてよいか」を各ハンドラに散らさず、一段の関門にまとめるのがコツです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ロールによる認可。authenticate の後ろに差し込む
function requireRole(role: string) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "権限がありません" });
    }
    next();
  };
}

// 認証 → 認可 → ハンドラ の順に並べる
app.delete("/posts/:id", authenticate, requireRole("admin"), (req, res) => {
  res.json({ deleted: req.params.id });
});`}</code>
      </pre>
      <p><Link href="/dev/backend/express/middleware">ミドルウェア</Link>で見た<code>requireAuth</code>を発展させると、こうした認証・認可の関門が自然に組み上がります。パイプラインの手前に関門を積むだけで、守りたいルートを宣言的に囲えるわけです。</p>

      <Analogy label="💡 たとえるなら">
        認証は「入館証の確認」、認可は「その入館証でこの部屋に入れるか」の判定です。受付(認証ミドルウェア)が入館証を見て本人を確かめ、名札(req.user)を付けます。各部屋のドア(認可ミドルウェア)は、その名札の役職を見て「役員フロアは役員のみ」と通す・通さないを決めます。本人確認と、部屋ごとの権限判定は別の関門なのです。
      </Analogy>

      <Heading num="まとめ">身分の確認と権限の判定を関門に積む</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>認証 → 認可の順</h4><p>「誰か」を確かめてから「してよいか」を判定する。失敗は401と403で区別する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>方式はセッションかJWTか</h4><p>サーバーに状態を持つか、署名付きトークンに載せるか。アプリの形で選ぶ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>どちらもミドルウェア</h4><p>ルートの手前に関門として積み、権限判定をハンドラから追い出す。</p></Card>
      </CardGrid>
      <p>認証・認可の方式そのもの(パスワードの保存、トークンの設計、権限モデル)は、Expressの枠を越えた大きなテーマです。深く知りたくなったら<Link href="/security/auth">認証</Link>・<Link href="/security/authz">認可</Link>の章へ。ここまでで守られたAPIが実際に読み書きするデータは、多くの場合データベースにあります。最後は<Link href="/dev/backend/express/database">データベース連携</Link>を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
            <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
            <RelatedLink href="/dev/backend/express/middleware" tag="開発">ミドルウェア</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
