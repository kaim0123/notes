import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Responseオブジェクト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>Responseオブジェクト ― 組み立てて、一度だけ送る</h1>
        <Lead>
          <Link href="/backend/express-request">読み取った</Link>リクエストに対し、応答を組み立てて送り返すのが第2引数です。<Term>何を返すか</Term>と<Term>どう返すか</Term>を指定します。APIでは2つのメソッドを押さえればほとんど書けますが、<Term>送信は一度きり</Term>という性質だけは最初に理解しておく必要があります。
        </Lead>
      </Hero>

      <Heading num="01">組み立てて、送り出す</Heading>
      <pre>
        <code>{`app.get("/users/:id", (req, res) => {
  const id = req.params.id;         // req から読み取り
  res.status(200).json({ id });     // res で組み立てて送信
});`}</code>
      </pre>

      <p>
        素の機能ではヘッダーとステータスコードを1つずつ手で設定する必要がありましたが、ここではよく使う応答の形が短いメソッドにまとまっています。
      </p>

      <Heading num="02">何を返すか</Heading>
      <table>
        <thead>
          <tr><th>メソッド</th><th>返すもの</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>res.json(obj)</code></td><td>JSON</td><td><strong>APIの定番</strong>。自動でJSON化し、形式も宣言する</td></tr>
          <tr><td className="hl"><code>res.send(body)</code></td><td>テキスト・HTMLなど</td><td>型に応じて形式を推測する</td></tr>
          <tr><td className="hl"><code>res.redirect(url)</code></td><td>別URLへの誘導</td><td>既定は一時的な移動として扱われる</td></tr>
          <tr><td className="hl"><code>res.sendFile(path)</code></td><td>ファイル本体</td><td>画像やPDFなどをそのまま返す</td></tr>
          <tr><td className="hl"><code>res.end()</code></td><td>本文なし</td><td>削除成功など、返す中身が無いとき</td></tr>
        </tbody>
      </table>

      <Heading num="03">どう返すか</Heading>
      <p>
        <code>res.status()</code>は自分自身を返すため、<Term>つなげて書けます</Term>。
      </p>

      <pre>
        <code>{`// 作成成功 → 201 と、作られたもの
app.post("/users", (req, res) => {
  const user = { id: 1, name: req.body.name };
  res.status(201).json(user);
});

// 見つからない → 404
app.get("/users/:id", (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "not found" });
  }
  res.json(user);   // 省略すると既定で 200
});`}</code>
      </pre>

      <p>
        どのコードを返すかの判断は<Link href="/backend/api-rest">REST</Link>で見たとおりです ― <Term>4xxと5xxを取り違えない</Term>ことが、あとの監視を左右します。
      </p>

      <Heading num="04">送信で確定する</Heading>
      <p>
        本文を送るメソッドは、呼んだ時点で応答を<Term>確定して送り出します</Term>。1つのリクエストに返せるのは一度だけです。
      </p>

      <DiagramFrame
        slug="backend-express-res-once"
        aspect="640 / 300"
        caption="応答が一度しか送れないことを示した図。送信の瞬間を境に、左の組み立て中はステータスもヘッダーも本文も何度でも変えられるが、右の確定後にヘッダーを足したりもう一度送ったりすると、すでに送信済みだという例外になる。下段には典型的な失敗として、条件に当てはまって応答を返したあとreturnを書き忘れ、処理が下へ流れてもう一度送ろうとする形が示されている。1つ目の送信は成功しているので画面上は正常に見えるが、サーバー側では例外だけが静かに積み上がる。"
      />

      <Aside label="早期returnを習慣にする">
        条件分岐で応答を出し分けるときは、<Term>必ず<code>return</code>を付けて先へ進ませない</Term>のが安全です。付け忘れても1回目の送信は成功するため、<Term>画面上は正常に見えたまま、サーバー側の例外だけが増えていきます</Term>。気づきにくい種類の不具合なので、書き方を習慣にしてしまうのが確実です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        返信の封筒です。ステータスの指定は封筒に押す「速達・書留」のスタンプ、本文を送るメソッドは「便箋を入れて投函する」動作にあたります。<Term>一度投函した封筒は取り戻せません</Term> ― だから中身とスタンプをすべて整えてから、最後に一度だけ送り出します。
      </Analogy>

      <Heading num="まとめ">整えてから、一度だけ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>JSONが主役</h4>
          <p>オブジェクトを渡せば、形式の宣言まで済む。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コードと本文をつなげる</h4>
          <p>省略すれば200。どのコードを返すかは責任の所在で決める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>送信で確定する</h4>
          <p>分岐では必ず<code>return</code>。二重送信は画面からは見えない。</p>
        </Card>
      </CardGrid>

      <p>
        読み取りと返却が揃いました。次は、その往復の間に共通処理を差し込む心臓部 ― <Link href="/backend/express-middleware">ミドルウェア</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-response" />
    </DocsPage>
  );
}
