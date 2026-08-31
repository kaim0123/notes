import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "REST API" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>REST API ― 名詞と動詞を分ける</h1>
        <Lead>
          RESTは新しいプロトコルではありません。すでに知っている<Link href="/frontend/http">HTTP</Link>のURLとメソッドを<Term>決まった型で使うための作法</Term>です。中心にあるのはたった1つの考え方 ― <Term>何を(名詞)</Term>と<Term>どうする(動詞)</Term>を分けて表す、それだけです。
        </Lead>
      </Hero>

      <Heading num="01">データをリソースとして扱う</Heading>
      <p>
        <Term>REST</Term>(REpresentational State Transfer)は、扱うデータを<Term>リソース</Term>として捉え、それぞれにURLという住所を割り当て、HTTPメソッドという動詞で操作する設計スタイルです。
      </p>
      <p>
        分けることの見返りは、<Term>組み合わせが格子になる</Term>ことにあります。対象がN個、操作がM個あっても、覚えることはN＋M個で済みます。URLに操作を混ぜると、この掛け算がそのまま名前の数になります。
      </p>

      <DiagramFrame
        slug="backend-api-rest-grid"
        aspect="640 / 320"
        caption="RESTが名詞と動詞を分けて表す設計であることを示した格子図。縦軸に対象のURL(一覧と1件)、横軸にHTTPメソッドが並び、交点にその組み合わせが意味する操作が入る。一覧に対する一部更新や削除の交点は空欄で、すべての組み合わせが意味を持つわけではないことも示している。下部には、URLに動詞を入れてしまった悪い例が×印付きで置かれ、対象と操作が混ざると格子そのものが成立しなくなることを対比している。"
      />

      <Heading num="02">URLはリソースの名前で表す</Heading>
      <p>
        URLには操作を入れず、<Term>リソースの名前(名詞・複数形)</Term>で表すのが基本です。動詞はメソッドが担います。
      </p>

      <table>
        <thead>
          <tr><th>やりたいこと</th><th>RESTらしいURL</th><th>避けたいURL</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ユーザー一覧</td><td><code>GET /users</code></td><td><code>GET /getUsers</code></td></tr>
          <tr><td className="hl">特定のユーザー</td><td><code>GET /users/1</code></td><td><code>GET /user?id=1</code></td></tr>
          <tr><td className="hl">ユーザーの投稿一覧</td><td><code>GET /users/1/posts</code></td><td><code>GET /getUserPosts?id=1</code></td></tr>
          <tr><td className="hl">ユーザーを作成</td><td><code>POST /users</code></td><td><code>POST /createUser</code></td></tr>
          <tr><td className="hl">ユーザーを削除</td><td><code>DELETE /users/1</code></td><td><code>POST /deleteUser?id=1</code></td></tr>
        </tbody>
      </table>

      <p>
        あるリソースに属する別のリソースは、<code>/users/1/posts</code>のように階層で表せます。ただし<Term>階層を深くしすぎない</Term>のが実務の知恵で、3段を超えるURLはたいてい、別のリソースとして切り出したほうが素直になります。
      </p>

      <Heading num="03">メソッドが操作の種類を表す</Heading>
      <p>
        同じURLでも、どのメソッドで頼むかで操作が変わります。作成・読取・更新・削除という基本操作が、メソッドに対応します。
      </p>

      <table>
        <thead>
          <tr><th>メソッド</th><th>意味</th><th>同じ依頼を繰り返しても安全か</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>GET</code></td><td>読取</td><td>安全(何も変えない)</td></tr>
          <tr><td className="hl"><code>POST</code></td><td>作成</td><td><strong>安全でない</strong>(2回叩けば2件できる)</td></tr>
          <tr><td className="hl"><code>PUT</code></td><td>更新(丸ごと置き換え)</td><td>安全(結果は同じ)</td></tr>
          <tr><td className="hl"><code>PATCH</code></td><td>更新(一部だけ)</td><td>内容による</td></tr>
          <tr><td className="hl"><code>DELETE</code></td><td>削除</td><td>安全(すでに無ければ何も起きない)</td></tr>
        </tbody>
      </table>

      <p>
        右端の列は、通信が不安定なときに効いてきます。<Term>繰り返しても結果が変わらない</Term>性質を持つメソッドは、返事が来なかったときにそのまま再送できます。この性質を持たない<code>POST</code>だけは、再送すると二重登録になり得るため、別の手当てが要ります ― 詳しくは<Link href="/backend/ops-resilience">タイムアウト・リトライ・遮断</Link>で扱います。
      </p>

      <Aside label="PUTとPATCHの違い">
        どちらも更新ですが、<code>PUT</code>はリソース全体を丸ごと置き換え、<code>PATCH</code>は変えたい項目だけを送ります。この差は事故の形にも出ます。<Term><code>PUT</code>で一部の項目だけを送ると、送らなかった項目が消える</Term>のが本来の意味です。「名前だけ直したい」なら<code>PATCH</code>を使います。
      </Aside>

      <Heading num="04">結果はステータスコードで返す</Heading>
      <p>
        処理の結果は<Term>ステータスコード</Term>で返します。呼ぶ側はこの数字を見て成否を判断します。
      </p>

      <table>
        <thead>
          <tr><th>系統</th><th>意味</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">2xx</td><td>成功</td><td><code>200 OK</code> / <code>201 Created</code></td></tr>
          <tr><td className="hl">4xx</td><td><strong>頼む側</strong>のミス</td><td><code>400</code> / <code>401</code> / <code>403</code> / <code>404</code> / <code>409</code></td></tr>
          <tr><td className="hl">5xx</td><td><strong>サーバー側</strong>の不具合</td><td><code>500</code> / <code>503</code></td></tr>
        </tbody>
      </table>

      <p>
        4xxと5xxの分かれ目は<Term>責任の所在</Term>です。ここを取り違えると監視が壊れます ― 入力ミスを<code>500</code>で返すと障害アラートが鳴り続け、本物のバグが<code>400</code>で返っていると誰も気づきません。<Term>再送すれば直るのが5xx、直さない限り何度やっても同じなのが4xx</Term>と考えると、迷いにくくなります。
      </p>

      <Heading num="05">実際のやり取り</Heading>
      <p>
        ここまでの要素が、実際のリクエストとレスポンスでどう組み合わさるかを見ます。作成が成功したときは<code>201</code>と、作られたリソースを返すのが一般的です。
      </p>

      <pre>
        <code>{`# リクエスト
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{ "name": "Carol" }

# レスポンス
201 Created
Location: /users/3
Content-Type: application/json

{ "id": 3, "name": "Carol" }`}</code>
      </pre>

      <p>
        <code>Location</code>ヘッダーで<Term>作られたものの住所</Term>を返しておくと、呼ぶ側は次にどこを見ればよいかを推測せずに済みます。これを呼ぶ側から書くと、<Link href="/frontend/http">HTTP通信</Link>で見た形になります。
      </p>

      <pre>
        <code>{`const res = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Carol" }),
});
if (res.status === 201) {
  const created = await res.json();   // { id: 3, name: "Carol" }
}`}</code>
      </pre>

      <Heading num="06">状態を持たないという原則</Heading>
      <p>
        RESTの重要な考え方に<Term>ステートレス</Term>があります。サーバーがリクエスト間の状態を覚えていない、という意味です。1回1回の依頼は独立していて、必要な情報は毎回のリクエストに全部含めます。
      </p>
      <p>
        この原則が効いてくるのは<Term>サーバーを増やすとき</Term>です。どのサーバーに繋がっても同じように扱えるので、台数を増やすだけで捌ける量が増えます。逆に、サーバーのメモリにログイン状態を持たせた瞬間、「同じ人は同じ台へ」という制約が生まれ、その台が落ちればログインも消えます。認証を毎回のヘッダーで送るのは、この原則の直接の帰結です ― 詳しくは<Link href="/backend/auth-token">トークンの運用</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        RESTは住所と行動を分けた指示書です。「新宿の倉庫へ(URL)／荷物を取りに行く(GET)」「新宿の倉庫へ／荷物を届ける(POST)」のように、行き先と、やることを組み合わせて伝えます。行き先の名前に「取りに行く」まで含めてしまうと、倉庫が増えるたびに指示書の種類が倍々に増えていきます。
      </Analogy>

      <Heading num="まとめ">分けるから、掛け算が足し算になる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>URLは名詞</h4>
          <p>対象を名前で表し、操作は入れない。階層は深くしすぎない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>メソッドが動詞</h4>
          <p>繰り返して安全かどうかも、メソッドが表している。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>4xxと5xxを取り違えない</h4>
          <p>責任の所在が違う。ここが崩れると監視が機能しなくなる。</p>
        </Card>
      </CardGrid>

      <p>
        作法が分かったら、次は<Term>誰が使う窓口か</Term>で優先順位がどう変わるかです。<Link href="/backend/api-design">API設計(LSUD / SSKD)</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/api-rest" />
    </DocsPage>
  );
}
