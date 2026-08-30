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
  title: "Responseオブジェクト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>Responseオブジェクト ― クライアントへ応答を返す</h1>
        <Lead>
          「<Link href="/dev/backend/express/request">Requestオブジェクト</Link>」で読み取ったリクエストに対し、応答を組み立てて送り返すのが<Term>res</Term>(レスポンス)です。何を返すか(本文)と、どう返すか(ステータスコード)を<code>res</code>のメソッドで指定します。APIでは<code>res.json()</code>と<code>res.status()</code>の2つを押さえれば、ほとんどの応答が書けます。
        </Lead>
      </Hero>

      <Heading num="01">res とは ― 応答を組み立てて送る側</Heading>
      <p><Term>res</Term>は、ハンドラの第2引数として渡されるオブジェクトで、クライアントへ返す<Term>レスポンス</Term>を表します。<code>req</code>が「届いた情報を読み取る側」だったのに対し、<code>res</code>は「返す情報を書き込んで送り出す側」です。本文・ステータスコード・ヘッダーなどを<code>res</code>のメソッドで設定し、最後に送信を確定します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app.get("/users/:id", (req, res) => {
  const id = req.params.id;      // req から読み取り
  res.status(200).json({ id });  // res で組み立てて送信
});`}</code>
      </pre>
      <p>素の<Link href="/dev/runtime">Node.js</Link>ではヘッダーとステータスコードを1つずつ手で設定する必要がありましたが、Expressの<code>res</code>はよく使う応答パターンを短いメソッドにまとめています。</p>

      <Heading num="02">主要メソッド ― 何を返すか</Heading>
      <p><code>res</code>には応答の種類ごとにメソッドが用意されています。API開発で最頻出なのは<code>res.json()</code>です。</p>
      <table>
        <thead>
          <tr><th>メソッド</th><th>返すもの</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>res.json(obj)</code></td><td>JSON</td><td>API応答の定番。オブジェクトを自動でJSON化して返す</td></tr>
          <tr><td className="hl"><code>res.send(body)</code></td><td>テキスト/HTML/Buffer</td><td>文字列やHTMLなど。型に応じてContent-Typeを推測</td></tr>
          <tr><td className="hl"><code>res.redirect(url)</code></td><td>リダイレクト</td><td>別のURLへ誘導(既定は302)</td></tr>
          <tr><td className="hl"><code>res.sendFile(path)</code></td><td>ファイル本体</td><td>画像やPDFなどをそのまま返す</td></tr>
          <tr><td className="hl"><code>res.download(path)</code></td><td>ダウンロード</td><td>ファイルを添付ファイルとして返す</td></tr>
          <tr><td className="hl"><code>res.end()</code></td><td>本文なし</td><td>本文を返さず応答を終える(204などと併用)</td></tr>
        </tbody>
      </table>
      <p><code>res.json()</code>は引数のオブジェクトを<code>JSON.stringify</code>し、<code>Content-Type: application/json</code>を付けて送ります。手動で文字列化する必要はありません。「<Link href="/dev/backend/express/json">JSON API</Link>」でリクエスト側とあわせて詳しく扱います。</p>

      <Heading num="03">res.status() ― どう返すか(ステータスコード)</Heading>
      <p><code>res.status(コード)</code>で<Term>HTTPステータスコード</Term>を指定します。<code>res.status()</code>は<code>res</code>自身を返すため、<code>res.status(201).json(...)</code>のように<Term>メソッドチェーン</Term>で本文の送信メソッドへつなげるのが定石です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 作成成功 → 201 と作られたデータ
app.post("/users", (req, res) => {
  const user = { id: 1, name: req.body.name };
  res.status(201).json(user);
});

// 見つからない → 404 とエラー本文
app.get("/users/:id", (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "not found" });
  }
  res.json(user); // status を省くと既定で 200
});`}</code>
      </pre>
      <p>ステータスコードを省略すると既定で<code>200</code>になります。代表的なコードは以下のとおりですが、それぞれの意味の全体像は「<Link href="/network/applications/web">Web(HTTP/HTTPS)</Link>」に委ねます。</p>
      <table>
        <thead>
          <tr><th>コード</th><th>意味</th><th>典型的な場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">200 / 201</td><td>成功 / 作成成功</td><td>取得できた / <code>POST</code>で作れた</td></tr>
          <tr><td className="hl">400</td><td>リクエストが不正</td><td>入力の<Link href="/dev/backend/express/validation">バリデーション</Link>失敗</td></tr>
          <tr><td className="hl">404</td><td>見つからない</td><td>該当リソースが存在しない</td></tr>
          <tr><td className="hl">500</td><td>サーバー側の失敗</td><td>想定外の<Link href="/dev/backend/express/error">エラー</Link></td></tr>
        </tbody>
      </table>

      <Heading num="04">応答は一度だけ ― 送信の確定</Heading>
      <p><code>res.json()</code>・<code>res.send()</code>・<code>res.redirect()</code>などは、呼んだ時点で応答を<Term>送信して確定</Term>します。1つのリクエストに対して応答を返せるのは一度だけで、送信後にもう一度送ろうとするとエラー(<code>Cannot set headers after they are sent</code>)になります。</p>
      <Aside label="早期returnで多重送信を防ぐ">
        条件分岐で応答を出し分けるときは、<code>return res.status(404).json(...)</code>のように<Term>return</Term>を付け、以降の処理へ進ませないのが安全です。<code>return</code>を忘れると、そのあとの<code>res.json(...)</code>まで実行されてしまい、二重送信のエラーを招きます。
      </Aside>

      <Analogy label="💡 たとえるなら">
        <code>res</code>は「返信の封筒」です。<code>res.status()</code>は封筒に押す「速達・書留」のスタンプ(どう扱う応答か)、<code>res.json()</code>や<code>res.send()</code>は「中身の便箋を入れて投函する」動作にあたります。一度投函した封筒は取り戻せません ― だから中身とスタンプをすべて整えてから、最後に一度だけ送り出すのです。
      </Analogy>

      <Heading num="まとめ">本文とステータスを組み立てて一度だけ送る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>res.json() が主役</h4><p>オブジェクトを自動でJSON化して返す。API応答の定番。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>res.status() はチェーンできる</h4><p><code>res.status(201).json(...)</code>のようにコードと本文をつなげる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>応答は一度だけ</h4><p>送信で確定するため、分岐では<code>return</code>で多重送信を防ぐ。</p></Card>
      </CardGrid>
      <p><code>req</code>で読み取り、<code>res</code>で返す ― これでリクエスト/レスポンスの往復が揃いました。次は、この往復の間に共通処理を差し込む、Expressの心臓部<Link href="/dev/backend/express/middleware">ミドルウェア</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/request" tag="開発">Requestオブジェクト</RelatedLink>
            <RelatedLink href="/dev/backend/express/json" tag="開発">JSON API</RelatedLink>
            <RelatedLink href="/dev/backend/express/routing" tag="開発">ルーティング</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
