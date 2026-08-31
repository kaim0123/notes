import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "認証・認可の実装" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>認証・認可の実装 ― 関門を積む、そして積みきれないもの</h1>
        <Lead>
          リクエストを処理する前に、「これは誰からか」「その人はこの操作をしてよいか」を確かめます。Expressでは、どちらも<Link href="/backend/express-middleware">ミドルウェア</Link>としてルートの手前に差し込むのが基本形です。ただし<Term>関門だけでは守りきれないものがある</Term> ― そこが本ページの要点になります。
        </Lead>
      </Hero>

      <Heading num="01">2つの関門</Heading>
      <p>
        <Term>認証</Term>は「あなたは誰か」、<Term>認可</Term>は「その人が何をしてよいか」です。順番は必ず認証が先で、<Term>誰かも分からない相手に権限の判断はできません</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-auth-gates"
        aspect="640 / 340"
        caption="認証と認可を2つの関門として積む形と、関門だけでは足りない場合を示した図。リクエストはまず認証の関門を通り、身元が確かめられなければ401として返される。次に役割による認可の関門があり、権限が足りなければ403として返される。下段では、ある注文が本当にその人のものかという判定は注文を取得してみるまで分からないため、所有者の確認は入口では行えず取得したあとに行うしかないことが示される。そこを飛ばすと、URLの番号を1つ変えるだけで他人のデータが見える状態になる。認証が完璧に動いていてもこの確認が抜けていれば成立してしまうため、最も多い事故の形になっている。"
      />

      <table>
        <thead>
          <tr><th></th><th>認証</th><th>認可</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">問い</td><td>あなたは誰か</td><td>それをしてよいか</td></tr>
          <tr><td className="hl">材料</td><td>提示された証</td><td>役割・所有者・対象データ</td></tr>
          <tr><td className="hl">失敗時</td><td><code>401</code></td><td><code>403</code></td></tr>
          <tr><td className="hl">置ける場所</td><td>入口で足りる</td><td><strong>入口だけでは足りないことがある</strong></td></tr>
        </tbody>
      </table>

      <Heading num="02">検証して、名札を付ける</Heading>
      <p>
        認証は「ログイン時に本人確認して証を渡す」「以降のリクエストでその証を検証する」の2段階です。
      </p>

      <pre>
        <code>{`// ① ログイン ― 本人確認が済んだら証を発行して返す
app.post("/login", async (req, res) => {
  const user = await findUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ code: "invalid_credentials" });

  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// ② 認証の関門 ― 以降のリクエストで検証する
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ code: "no_token" });

  try {
    req.user = jwt.verify(token, SECRET, { algorithms: ["HS256"] });
    next();
  } catch {
    return res.status(401).json({ code: "invalid_token" });
  }
}`}</code>
      </pre>

      <Aside label="方式の選択そのものは前の見出しで">
        サーバー側に状態を持つ方式と、証に情報を載せる方式のどちらを選ぶか、失効をどう扱うかは<Link href="/backend/auth-token">トークンの運用</Link>で扱いました。ここで押さえるのは<Term>検証した結果を<code>req.user</code>に載せる</Term>という置き方です。以降のハンドラは、証を再検証せずにこの値を見るだけで済みます。
      </Aside>

      <Heading num="03">役割による認可は、関門で済む</Heading>
      <pre>
        <code>{`function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ code: "forbidden" });
    }
    next();
  };
}

// 認証 → 認可 → ハンドラ の順に並べる
app.delete("/posts/:id", authenticate, requireRole("admin"), handler);`}</code>
      </pre>

      <p>
        「管理者だけ」のような判定は、<Term>対象データを見なくても決まる</Term>ので入口で済みます。守りたいルートを宣言的に囲えるのが、この形の利点です。
      </p>

      <Heading num="04">所有者の確認は、関門に置けない</Heading>
      <p>
        ここが本ページで最も重要な点です。「その注文は本当にこの人のものか」は、<Term>注文を取得してみるまで分かりません</Term>。だから入口の関門では判定できず、取得したあとに確かめるしかありません。
      </p>

      <pre>
        <code>{`app.get("/orders/:id", authenticate, async (req, res, next) => {
  try {
    const order = await orderRepo.findById(req.params.id);
    if (!order) return res.status(404).json({ code: "not_found" });

    // ← ここを飛ばすと、番号を変えるだけで他人の注文が見える
    if (order.userId !== req.user.sub) {
      return res.status(404).json({ code: "not_found" });
    }

    res.json({ data: order });
  } catch (err) {
    next(err);
  }
});`}</code>
      </pre>

      <p>
        <Term>ここで403ではなく404を返している</Term>のは意図的です。403は「あるけれど見せない」という意味なので、<Term>そのIDが存在することを教えてしまいます</Term>。他人のリソースは「無い」ものとして扱うほうが、多くの場合は安全です。
      </p>
      <p>
        より確実なのは、そもそも<Term>取得の条件に所有者を含める</Term>ことです。「このIDで、かつこの利用者のもの」を1つの問い合わせにすれば、確認を書き忘れる余地がなくなります ― <Term>忘れうる確認を、忘れられない形に変える</Term>という設計です。
      </p>

      <Analogy label="💡 たとえるなら">
        認証は入館証の確認、役割による認可は「その入館証でこのフロアに入れるか」の判定です。受付が本人を確かめて名札を付け、各フロアのドアが名札の役職を見て通す・通さないを決めます。しかし<Term>「この書類はあなた宛てか」は、書類を開けてみないと分かりません</Term> ― ドアの前では判定できない種類の確認が、必ず残ります。
      </Analogy>

      <Heading num="まとめ">積める関門と、積めない確認</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>認証 → 認可の順</h4>
          <p>誰かを確かめてからしてよいかを判定する。401と403で区別する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>役割の判定は入口で</h4>
          <p>対象データを見なくても決まるものは、関門として宣言的に積める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>所有者の確認は取得後に</h4>
          <p>入口では判定できない。条件に含めてしまえば、書き忘れようがない。</p>
        </Card>
      </CardGrid>

      <p>
        最後は、その守られたAPIが読み書きする先です。<Link href="/backend/express-database">データベース連携</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-auth" />
    </DocsPage>
  );
}
