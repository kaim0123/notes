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
  title: "ルーティング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>ルーティング ― パスとメソッドで処理を振り分ける</h1>
        <Lead>
          <Term>ルーティング</Term>とは「どのURLに、どのHTTPメソッドでリクエストが来たら、どの処理を実行するか」の対応づけです。Expressでは<code>app.メソッド名(パス, ハンドラ)</code>という一行で、この対応を<Term>宣言的</Term>に登録していきます。素のNode.jsのように<code>if</code>文でURLを振り分ける必要はありません。ここではメソッドの使い分け、URLからの値の取り出し方、そして「該当なし」の受け止め方までを見ます。
        </Lead>
      </Hero>

      <Heading num="01">HTTPメソッドと対応するルーティングメソッド</Heading>
      <p>同じ<code>/users</code>というURLでも、「一覧を取得したい」のか「新しく作りたい」のかは<Link href="/network/applications/web">HTTPメソッド</Link>で区別します。Expressは各メソッドに対応する関数を用意しており、<Term>URL(何を)</Term>と<Term>メソッド(どうする)</Term>の組み合わせでハンドラを決めます。</p>
      <table>
        <thead>
          <tr><th>メソッド</th><th>Express</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">GET</td><td><code>app.get()</code></td><td>データの取得(一覧・詳細)</td></tr>
          <tr><td className="hl">POST</td><td><code>app.post()</code></td><td>新規作成</td></tr>
          <tr><td className="hl">PUT</td><td><code>app.put()</code></td><td>全体の置き換え(全項目を更新)</td></tr>
          <tr><td className="hl">PATCH</td><td><code>app.patch()</code></td><td>一部だけ更新</td></tr>
          <tr><td className="hl">DELETE</td><td><code>app.delete()</code></td><td>削除</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]); // 一覧を返す
});

app.post("/users", (req, res) => {
  res.status(201).json({ created: true }); // 新規作成
});

app.delete("/users/:id", (req, res) => {
  res.status(204).end(); // 削除。本文なし
});

app.listen(3000);`}</code>
      </pre>
      <p>このように「リソース(URL)」と「操作(メソッド)」の組で処理を表す考え方は<Term>REST</Term>と呼ばれ、Express APIの土台になります。詳しくは<Link href="/dev/backend/api/rest">REST API</Link>で扱います。</p>

      <Heading num="02">パスパラメータ ― URLの一部を値として受け取る</Heading>
      <p>「ID番号<code>42</code>のユーザーを取りたい」ように、URLの一部が<Term>変わる値</Term>になる場面があります。パスの中で<code>:名前</code>と書くと、そこは<Term>パスパラメータ</Term>になり、<code>req.params</code>から取り出せます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// GET /users/42 → req.params.id は "42"
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// 複数のパラメータも置ける
// GET /users/42/posts/7
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});`}</code>
      </pre>
      <Aside label="型に注意">
        <code>req.params</code>の値は常に<Term>文字列</Term>です。数値として使いたい場合は<code>Number(req.params.id)</code>のように自分で変換します。
      </Aside>

      <Heading num="03">クエリパラメータ ― 絞り込みやページ指定</Heading>
      <p>URLの<code>?</code>以降に<code>key=value</code>の形で付く情報が<Term>クエリパラメータ</Term>です。「一覧の何ページ目か」「並び順」「検索語」など、<Term>任意で付けられるオプション</Term>を表すのに向きます。<code>req.query</code>から取り出します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// GET /users?page=2&sort=name
app.get("/users", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const sort = req.query.sort ?? "id";
  res.json({ page, sort });
});`}</code>
      </pre>
      <p>使い分けの目安は、<Term>パスパラメータ</Term>は「どのリソースか」という<strong>対象の特定</strong>に、<Term>クエリパラメータ</Term>は「その一覧をどう絞り込むか」という<strong>取得条件</strong>に使う、と覚えると整理しやすくなります。</p>
      <table>
        <thead>
          <tr><th></th><th>パスパラメータ</th><th>クエリパラメータ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">書き方</td><td><code>/users/:id</code></td><td><code>?page=2</code></td></tr>
          <tr><td className="hl">取り出す</td><td><code>req.params</code></td><td><code>req.query</code></td></tr>
          <tr><td className="hl">向く用途</td><td>対象リソースの特定</td><td>絞り込み・並び替え・ページ指定</td></tr>
        </tbody>
      </table>

      <Heading num="04">複数ルートとワイルドカード</Heading>
      <p>ルートは登録した数だけ持てます。似た処理をまとめたいときは、パスに配列やパターンを使うこともできます。すべての未定義パスを1つで受け止めたい場合は、パス全体にマッチする<Term>ワイルドカード</Term>を使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 複数のパスに同じハンドラを割り当てる
app.get(["/help", "/faq"], (req, res) => {
  res.send("ヘルプページ");
});`}</code>
      </pre>

      <Heading num="05">404処理 ― どのルートにも該当しなかったとき</Heading>
      <p>Expressはルートを<Term>上から順に</Term>照合し、最初にマッチしたハンドラを実行します。どのルートにもマッチしなかったリクエストは、すべてのルート定義の<Term>末尾</Term>に置いたハンドラへ届きます。ここで<code>404 Not Found</code>を返すのが定石です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// … ここまでに定義したどのルートにも当たらなかったリクエストが来る
// 必ず全ルートの「後ろ」に置く
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});`}</code>
      </pre>
      <p>ポイントは<strong>置く位置</strong>です。この404ハンドラを先頭に書くと、すべてのリクエストが即座に404になってしまいます。「該当なしの受け皿」は、必ず正規のルートをすべて登録した<Term>後</Term>に配置します。</p>

      <Analogy label="💡 たとえるなら">
        ルーティングは郵便の仕分けです。宛先(URL)と種別(メソッド ― 通常郵便か書留か)の組み合わせで、担当の窓口(ハンドラ)へ振り分けます。<code>:id</code>のパスパラメータは「○○様方」のように宛先の一部が可変な部分、クエリパラメータは「速達で」「午前中に」といった付帯オプション。そしてどの窓口にも当てはまらない宛先不明の郵便は、最後に「返送係(404)」がまとめて受け取ります。
      </Analogy>

      <Heading num="まとめ">URL×メソッドで宣言的に振り分ける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>メソッドで操作を区別</h4><p><code>get/post/put/patch/delete</code>を同じURLに割り当て、REST的に整理する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>params と query</h4><p>対象の特定は<code>req.params</code>、絞り込み条件は<code>req.query</code>。値は文字列。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>404は末尾で受ける</h4><p>全ルートの後ろに置いた<code>app.use</code>で、該当なしをまとめて処理する。</p></Card>
      </CardGrid>
      <p>ルーティングでハンドラが決まったら、次はそのハンドラが受け取る「リクエストの中身」を読みます。次は<Link href="/dev/backend/express/request">Requestオブジェクト</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/request" tag="開発">Requestオブジェクト</RelatedLink>
            <RelatedLink href="/dev/backend/express/response" tag="開発">Responseオブジェクト</RelatedLink>
            <RelatedLink href="/network/applications/web" tag="ネットワーク">Web(HTTP/HTTPS)</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
