import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Requestオブジェクト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>Requestオブジェクト ― 届いたものを読む</h1>
        <Lead>
          ハンドラの第1引数には、クライアントから届いた<Term>リクエストの中身</Term>がすべて詰まっています。<Term>どこに何が入るか</Term>を覚えれば、読み取りは一通り書けるようになります。そして同時に、<Term>ここに入る値は何ひとつ保証されていない</Term>という前提も押さえます。
        </Lead>
      </Hero>

      <Heading num="01">生のリクエストとの対応</Heading>
      <p>
        <code>req</code>は、受け取ったHTTPリクエストを1つのオブジェクトにまとめたものです。文面のどこがどのプロパティになるかを見ると、覚えることが一気に減ります。
      </p>

      <DiagramFrame
        slug="backend-express-req-anatomy"
        aspect="640 / 340"
        caption="生のHTTPリクエストの各部分が、reqのどのプロパティに対応するかを示した図。1行目のメソッドとURL、続くヘッダーの並び、空行を挟んだ本文という構造に対し、ルートで定義したパラメータ部分・疑問符以降・ヘッダー・本文が、それぞれ対応するプロパティに入る。ただし本文だけは扱いが違い、解釈するミドルウェアを先に登録していないと中身が入らない。下部には、ここに入る値はすべて外から来たもので、型も範囲も何ひとつ保証されていないという注意が置かれている。"
      />

      <table>
        <thead>
          <tr><th>プロパティ</th><th>中身</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>req.params</code></td><td>パスから取り出した値</td><td>常に文字列</td></tr>
          <tr><td className="hl"><code>req.query</code></td><td>クエリ文字列</td><td>文字列、<strong>または文字列の配列</strong></td></tr>
          <tr><td className="hl"><code>req.body</code></td><td>リクエスト本文</td><td><strong>解釈するミドルウェアが要る</strong></td></tr>
          <tr><td className="hl"><code>req.headers</code></td><td>ヘッダー</td><td>キーは小文字に正規化される</td></tr>
          <tr><td className="hl"><code>req.method</code> / <code>req.url</code></td><td>メソッドとURL</td><td>ログ出力で頻出</td></tr>
          <tr><td className="hl"><code>req.ip</code></td><td>接続元</td><td><Link href="/backend/ops-rate-limit">プロキシ配下では要設定</Link></td></tr>
        </tbody>
      </table>

      <Heading num="02">パスから取り出す</Heading>
      <p>
        <Link href="/backend/express-routing">ルーティング</Link>で<code>:名前</code>と書いた部分が、同じ名前のキーで入ります。
      </p>

      <pre>
        <code>{`// GET /users/42/posts/7
app.get("/users/:userId/posts/:postId", (req, res) => {
  console.log(req.params.userId);   // "42"
  console.log(req.params.postId);   // "7"
});`}</code>
      </pre>

      <Heading num="03">クエリは型が揺れる</Heading>
      <pre>
        <code>{`// GET /search?keyword=express&page=2
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;          // "express"
  const page    = Number(req.query.page ?? 1);
});`}</code>
      </pre>

      <p>
        ここで見落としやすいのが、<Term>同じキーを複数回書かれると配列になる</Term>ことです。<code>?tag=a&amp;tag=b</code>で<code>req.query.tag</code>は配列になります。文字列を前提に書いたコードは、この入力で静かに壊れます ― 呼ぶ側の書き方ひとつで型が変わるということです。
      </p>

      <Heading num="04">本文だけは前提が要る</Heading>
      <p>
        送られたデータは<code>req.body</code>に入ります。ただし<Term>本文を解釈するミドルウェアを入れて初めて</Term>読めるようになります。
      </p>

      <pre>
        <code>{`const app = express();

app.use(express.json());   // これが無いと req.body は空のまま

// POST /users  { "name": "Alice" }
app.post("/users", (req, res) => {
  const name = req.body.name;   // "Alice"
  res.status(201).json({ created: name });
});`}</code>
      </pre>

      <Aside label="本文が読めないときの原因">
        ほとんどは<Term>解釈する段の登録漏れ</Term>か、送る側が形式を宣言していないかのどちらかです。Cookieも同じ考え方で、専用の段を入れて初めて読めるようになります。<Term>読めないのは値が無いからではなく、読む道具を用意していないから</Term>という切り分けを覚えておくと、無駄に悩まずに済みます。
      </Aside>

      <Heading num="05">読んだ値を、そのまま信じない</Heading>
      <p>
        ここが本ページで最も重要な点です。<code>req</code>に入っている値は、<Term>すべて外部から送られてきたもの</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>思い込み</th><th>実際に起こり得ること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">IDは数値だろう</td><td>文字列。数値に変換できない値も来る</td></tr>
          <tr><td className="hl">この項目は必ずある</td><td>無い。あるいは<code>null</code></td></tr>
          <tr><td className="hl">配列は来ない</td><td>同じキーを重ねられれば配列になる</td></tr>
          <tr><td className="hl">形式を宣言しているから安全</td><td>宣言と中身は一致しない</td></tr>
        </tbody>
      </table>

      <p>
        だから実務では、読み取った直後に<Link href="/backend/express-validation">形を検証して、信頼できる値に変える</Link>のが定石になります。<Term>境界の内側と外側で、扱いを変える</Term>ということです。
      </p>

      <Analogy label="💡 たとえるなら">
        受付に届いた1通の封筒です。宛先の部屋番号が<code>params</code>、宛名脇のメモ書きが<code>query</code>、中に入った書類そのものが<code>body</code>、差出人や消印の欄が<code>headers</code>。中の書類を読むには封を開ける道具が要り、そして<Term>書類の内容が本当かどうかは、封筒には書いていません</Term>。
      </Analogy>

      <Heading num="まとめ">どこを見るか、そして信じないこと</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>URL由来とヘッダー由来</h4>
          <p>パスの一部と、疑問符以降と、付随情報。それぞれ入る場所が違う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>本文は道具が要る</h4>
          <p>解釈する段を入れて初めて読める。読めないのは値が無いからではない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型は保証されていない</h4>
          <p>文字列、配列、欠損。読んだ直後に信頼できる形へ変える。</p>
        </Card>
      </CardGrid>

      <p>
        読み取れたら、次は応答を組み立てる番です。<Link href="/backend/express-response">Responseオブジェクト</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-request" />
    </DocsPage>
  );
}
