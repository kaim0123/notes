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
  title: "REST API ― リソースをURLで表す設計",
};

const codeBlock =
  "my-5 overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>REST API ― リソースをURLで表す設計</h1>
        <Lead>
          「<Link href="/dev/backend/api/styles">APIの種類と選び方</Link>」で、迷ったらまず<Term>REST</Term>と見ました。この記事では、そのRESTを一段深く掘り下げます。RESTは難しい新技術ではなく、すでに知っている<Link href="/dev/frontend/http">HTTP</Link>の<b>URL</b>と<b>メソッド</b>を、決まった型で使うための<b>設計のお作法</b>です。
        </Lead>
      </Hero>

      <Heading num="01">RESTとは ― データを「リソース」として扱う</Heading>
      <p><Term>REST</Term>(REpresentational State Transfer)は、扱うデータを<Term>リソース</Term>(=モノ)として捉え、それぞれに<b>URL(住所)</b>を割り当て、<b>HTTPメソッド(動詞)</b>で操作する、という設計スタイルです。新しいプロトコルではなく、いつものHTTPを「こう使いましょう」という取り決めにすぎません。</p>
      <p>ポイントは、<b>「何を(URL)」と「どうする(メソッド)」を分けて表す</b>ことです。たとえば「ユーザー一覧を取得する」なら、対象は<code>/users</code>というリソース、操作は<code>GET</code>という動詞、という具合に組み合わせます。</p>

      <Analogy label="💡 たとえるなら">
        RESTは<b>住所と行動を分けた指示書</b>です。「新宿の倉庫へ(URL)／荷物を取りに行く(GET)」「新宿の倉庫へ(URL)／荷物を届ける(POST)」のように、<b>行き先(名詞)</b>と<b>やること(動詞)</b>を組み合わせて伝えます。行き先の名前に「取りに行く」まで含めてしまうと(<code>/get-warehouse</code>のように)、住所と行動が混ざって分かりにくくなります。
      </Analogy>

      <Heading num="02">URL設計 ― リソースは「名詞」で表す</Heading>
      <p>RESTのURLは、操作(動詞)を入れず、<b>リソースの名前(名詞・複数形)</b>で表すのが基本です。動詞はHTTPメソッドが担うので、URLに<code>get</code>や<code>create</code>を含めません。</p>
      <table>
        <thead>
          <tr><th>やりたいこと</th><th>◎ RESTらしいURL</th><th>× 避けたいURL</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ユーザー一覧</td><td><code>GET /users</code></td><td><code>GET /getUsers</code></td></tr>
          <tr><td className="hl">特定のユーザー</td><td><code>GET /users/1</code></td><td><code>GET /user?id=1</code></td></tr>
          <tr><td className="hl">ユーザーの投稿一覧</td><td><code>GET /users/1/posts</code></td><td><code>GET /getUserPosts?id=1</code></td></tr>
          <tr><td className="hl">ユーザーを作成</td><td><code>POST /users</code></td><td><code>POST /createUser</code></td></tr>
          <tr><td className="hl">ユーザーを削除</td><td><code>DELETE /users/1</code></td><td><code>POST /deleteUser?id=1</code></td></tr>
        </tbody>
      </table>
      <p>「一覧」は複数形の<code>/users</code>、「その中の1件」は<code>/users/1</code>のようにIDで指定します。あるリソースに属する別のリソース(ユーザーの投稿)は、<code>/users/1/posts</code>のように<b>階層</b>で表せます。</p>

      <Heading num="03">HTTPメソッド ― 操作の種類を動詞で表す</Heading>
      <p>同じURLでも、どのメソッドで頼むかで操作が変わります。データの基本操作である<Term>CRUD</Term>(作成・読取・更新・削除)が、メソッドに対応します。</p>
      <table>
        <thead>
          <tr><th>メソッド</th><th>意味(CRUD)</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>GET</code></td><td>読取 (Read)</td><td><code>GET /users/1</code> … 1件取得</td></tr>
          <tr><td className="hl"><code>POST</code></td><td>作成 (Create)</td><td><code>POST /users</code> … 新規登録</td></tr>
          <tr><td className="hl"><code>PUT</code></td><td>更新 (Update・全体)</td><td><code>PUT /users/1</code> … 丸ごと置き換え</td></tr>
          <tr><td className="hl"><code>PATCH</code></td><td>更新 (Update・一部)</td><td><code>PATCH /users/1</code> … 一部だけ変更</td></tr>
          <tr><td className="hl"><code>DELETE</code></td><td>削除 (Delete)</td><td><code>DELETE /users/1</code> … 削除</td></tr>
        </tbody>
      </table>
      <Aside label="💡 PUTとPATCHの違い">
        どちらも「更新」ですが、<code>PUT</code>は<b>リソース全体を丸ごと置き換える</b>のに対し、<code>PATCH</code>は<b>変えたい項目だけを送る</b>点が違います。名前だけ直したいなら<code>PATCH /users/1</code>で<code>{`{ "name": "新しい名前" }`}</code>を送る、という使い分けになります。
      </Aside>

      <Heading num="04">ステータスコード ― 結果を数字で返す</Heading>
      <p>作る側は、処理の結果を<Term>HTTPステータスコード</Term>で返します。使う側はこの数字を見て成功・失敗を判断します(「<Link href="/dev/frontend/http">HTTP通信</Link>」で見た<code>res.ok</code>や<code>res.status</code>がこれです)。</p>
      <table>
        <thead>
          <tr><th>系統</th><th>意味</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">2xx</td><td>成功</td><td><code>200 OK</code> / <code>201 Created</code>(作成成功)</td></tr>
          <tr><td className="hl">4xx</td><td>依頼する側のミス</td><td><code>400 Bad Request</code> / <code>401 Unauthorized</code> / <code>404 Not Found</code></td></tr>
          <tr><td className="hl">5xx</td><td>サーバー側の不具合</td><td><code>500 Internal Server Error</code></td></tr>
        </tbody>
      </table>
      <p>ポイントは<b>4xxと5xxの責任の所在が違う</b>こと。4xxは「頼み方が間違っている(存在しないIDを指定した等)」、5xxは「サーバー側で処理に失敗した」を意味します。</p>

      <Heading num="05">実際のやりとりを見る</Heading>
      <p>ここまでの要素(URL・メソッド・ステータス・JSON本文)が、実際のリクエスト／レスポンスでどう組み合わさるかを見ます。まずは一覧取得(GET)です。</p>
      <pre className={codeBlock}>
        <code>{`# リクエスト
GET /users HTTP/1.1
Host: api.example.com

# レスポンス
200 OK
Content-Type: application/json

[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]`}</code>
      </pre>
      <p>次に新規作成(POST)です。作る対象のデータは、リクエストの<b>本文(body)</b>にJSONで載せて送ります。成功すると<code>201 Created</code>と、作られたリソースが返るのが一般的です。</p>
      <pre className={codeBlock}>
        <code>{`# リクエスト
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{ "name": "Carol" }

# レスポンス
201 Created
Content-Type: application/json

{ "id": 3, "name": "Carol" }`}</code>
      </pre>
      <p>この<code>POST /users</code>を、ブラウザ側から「<Link href="/dev/frontend/http">HTTP通信</Link>」で見た<code>fetch</code>で呼ぶと、次のようになります。RESTの設計と、使う側のコードがつながります。</p>
      <pre className={codeBlock}>
        <code>{`const res = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Carol" }),
});
if (res.status === 201) {
  const created = await res.json(); // { id: 3, name: "Carol" }
}`}</code>
      </pre>

      <Heading num="06">RESTの原則 ― ステートレス</Heading>
      <p>RESTの大事な考え方に<Term>ステートレス</Term>(状態を持たない)があります。これは、<b>サーバーがリクエスト間の状態を覚えていない</b>という意味です。1回1回のリクエストは独立していて、必要な情報(誰からの依頼か、など)は<b>毎回のリクエストに全部含める</b>のが原則です。</p>
      <p>だからこそ、認証は「前回ログインしたから覚えている」ではなく、毎回<code>Authorization</code>ヘッダーでトークンを送ります(「使う側」がAPIキー・トークン管理を重視するのはこのためです)。状態を持たないおかげで、サーバーを増やしても「どのサーバーに繋がっても同じ」に扱え、スケールしやすくなります。</p>

      <Heading num="まとめ">RESTは「名詞×動詞」の設計</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>リソースをURLで表す</h4><p>データを名詞(<code>/users/1</code>)で表し、URLに動詞を入れません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>操作はメソッドで表す</h4><p>GET/POST/PUT/PATCH/DELETEがCRUDに対応します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>結果はコードで返す</h4><p>2xx/4xx/5xxで成否を伝え、状態は持たない(ステートレス)。</p></Card>
      </CardGrid>

      <p>RESTの作法が分かったら、次は<b>誰が使うAPIか</b>で設計の優先順位がどう変わるかを「<Link href="/dev/backend/api/design">API設計 ― 誰のための窓口か</Link>」で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/design" tag="開発">API設計（LSUD / SSKD）</RelatedLink>
            <RelatedLink href="/dev/backend/api/styles" tag="開発">APIの種類と選び方</RelatedLink>
            <RelatedLink href="/dev/backend/api" tag="開発">API ― システム同士をつなぐ窓口</RelatedLink>
            <RelatedLink href="/dev/frontend/http" tag="開発">HTTP通信(Fetch・axios)</RelatedLink>
            <RelatedLink href="/dev/backend/express" tag="開発">Express</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
