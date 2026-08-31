import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ルーティング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ルーティング ― パスとメソッドで振り分ける</h1>
        <Lead>
          <Term>ルーティング</Term>は「どのURLに、どのメソッドで来たら、どの処理を実行するか」の対応づけです。Expressでは1行で<Term>宣言的に</Term>登録していきます。ここではメソッドの使い分け、URLからの値の取り出し方、そして<Term>照合の順序</Term>という見落としやすい性質を見ます。
        </Lead>
      </Hero>

      <Heading num="01">メソッドが操作を表す</Heading>
      <p>
        同じ<code>/users</code>でも、「一覧を取りたい」のか「新しく作りたい」のかはメソッドで区別します。<Term>URLが何を、メソッドがどうする</Term>を表し、その組み合わせでハンドラが決まります。
      </p>

      <table>
        <thead>
          <tr><th>メソッド</th><th>Express</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">GET</td><td><code>app.get()</code></td><td>データの取得</td></tr>
          <tr><td className="hl">POST</td><td><code>app.post()</code></td><td>新規作成</td></tr>
          <tr><td className="hl">PUT</td><td><code>app.put()</code></td><td>全体の置き換え</td></tr>
          <tr><td className="hl">PATCH</td><td><code>app.patch()</code></td><td>一部だけ更新</td></tr>
          <tr><td className="hl">DELETE</td><td><code>app.delete()</code></td><td>削除</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);      // 一覧を返す
});

app.post("/users", (req, res) => {
  res.status(201).json({ created: true });   // 新規作成
});

app.delete("/users/:id", (req, res) => {
  res.status(204).end();                     // 削除。本文なし
});`}</code>
      </pre>

      <p>
        この考え方が<Link href="/backend/api-rest">REST</Link>で、ExpressのAPIの土台になります。
      </p>

      <Heading num="02">URLの一部を値として受け取る</Heading>
      <p>
        パスの中で<code>:名前</code>と書くと、そこが<Term>パスパラメータ</Term>になります。
      </p>

      <pre>
        <code>{`// GET /users/42 → req.params.id は "42"
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// 複数置ける ― GET /users/42/posts/7
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});`}</code>
      </pre>

      <Aside label="値は常に文字列">
        パスパラメータもクエリも、取り出した値は<Term>常に文字列</Term>です。数値として使うなら自分で変換します。そして変換した結果が数値でないこともあり得る ― この「外から来た値は何も保証されていない」という前提が、<Link href="/backend/express-validation">バリデーション</Link>の出発点になります。
      </Aside>

      <Heading num="03">対象の特定と、絞り込み条件</Heading>
      <p>
        URLの<code>?</code>以降に付く<Term>クエリパラメータ</Term>は、任意で付けられるオプションを表すのに向きます。
      </p>

      <pre>
        <code>{`// GET /users?page=2&sort=name
app.get("/users", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const sort = req.query.sort ?? "id";
  res.json({ page, sort });
});`}</code>
      </pre>

      <table>
        <thead>
          <tr><th></th><th>パスパラメータ</th><th>クエリパラメータ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">書き方</td><td><code>/users/:id</code></td><td><code>?page=2</code></td></tr>
          <tr><td className="hl">取り出す</td><td><code>req.params</code></td><td><code>req.query</code></td></tr>
          <tr><td className="hl">向く用途</td><td><strong>対象の特定</strong></td><td><strong>絞り込み・並び替え・件数指定</strong></td></tr>
          <tr><td className="hl">無いとき</td><td>そのURLが存在しない</td><td>既定値で動く</td></tr>
        </tbody>
      </table>

      <p>
        最後の行が使い分けの決め手です。<Term>無くても成立するならクエリ</Term>、無いと対象が決まらないならパスです。
      </p>

      <Heading num="04">上から順に照合される</Heading>
      <p>
        ここが最も事故を生む性質です。Expressはルートを<Term>登録した順に照合し、最初に一致したものを実行します</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-match-order"
        aspect="640 / 340"
        caption="ルートが上から順に照合され、最初に一致したものが実行されることを示した図。登録順に並んだルートに対し、届いたリクエストは上から照合され、一致した時点で止まって以降は見に行かない。下段は順序を逆にした場合で、パラメータを含むパスを先に登録すると、具体的なパスの文字列がIDとして解釈されてしまい、後ろの行には永久に届かなくなる。下部には、具体的なパスをパラメータ付きより先に置くこと、該当なしの受け皿は必ず全部の後ろに置くことが記されている。"
      />

      <pre>
        <code>{`// ○ 具体的なパスを先に
app.get("/users/me", handleMe);
app.get("/users/:id", handleUser);

// ✗ 逆にすると "me" が :id として解釈され、上の行に永久に届かない`}</code>
      </pre>

      <Heading num="05">該当なしは末尾で受ける</Heading>
      <p>
        どのルートにも一致しなかったリクエストは、すべての登録の<Term>後ろ</Term>に置いたハンドラへ届きます。
      </p>

      <pre>
        <code>{`// 必ず全ルートの「後ろ」に置く
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});`}</code>
      </pre>

      <p>
        要点は<Term>置く位置</Term>です。これを先頭に書くと、<Term>すべてのリクエストが即座に404になります</Term>。前節の照合順序が、そのままここにも効いています。
      </p>

      <Analogy label="💡 たとえるなら">
        郵便の仕分けです。宛先と種別の組み合わせで担当の窓口へ振り分けます。パスパラメータは宛先の可変な部分、クエリは「速達で」「午前中に」といった付帯オプション。そして仕分け表は<Term>上から順に見る</Term>ので、「東京都全部」の行を先頭に置けば、その下の細かい行には永久に荷物が届きません。宛先不明の返送係は、いちばん最後に座らせます。
      </Analogy>

      <Heading num="まとめ">組み合わせで宣言し、順序に気をつける</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>URLとメソッドの組</h4>
          <p>対象と操作を分けて表す。これがそのままRESTになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>特定はパス、条件はクエリ</h4>
          <p>無くても成立するならクエリ。値はどちらも常に文字列。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>上から順、最初の一致</h4>
          <p>具体的なパスを先に。該当なしの受け皿は必ず最後に。</p>
        </Card>
      </CardGrid>

      <p>
        ルートが増えてくると、1つのファイルに全部書くのが辛くなります。次は<Link href="/backend/express-router">ルーターに分割する</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-routing" />
    </DocsPage>
  );
}
