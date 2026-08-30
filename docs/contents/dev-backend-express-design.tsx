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
  title: "API設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>API設計 ― 使いやすく一貫したAPIにする</h1>
        <Lead>
          ルーティングもバリデーションもエラー処理も揃うと、次に効いてくるのは<Term>一貫性</Term>です。URLの付け方、成功レスポンスの形、エラーの返し方が画面(エンドポイント)ごとにバラバラだと、使う側は毎回ドキュメントを読み直すことになります。ここでは、Expressで実際にAPIを組むときの設計の指針をまとめます。「誰向けのAPIか」(<Link href="/dev/backend/api/design">LSUD / SSKD</Link>)やRESTの考え方(<Link href="/dev/backend/api/rest">REST API</Link>)はAPIセクションで扱い、ここでは「どう実装に落とすか」に絞ります。
        </Lead>
      </Hero>

      <Heading num="01">REST設計の基本 ― リソースと操作を分ける</Heading>
      <p><Term>REST</Term>の中心にあるのは、「<Term>リソース</Term>(名詞)をURLで表し、それに対する<Term>操作</Term>を<Link href="/network/applications/web">HTTPメソッド</Link>で表す」という分担です。「ユーザーを取得する」という1つの動作を、<code>/users/1</code>(何を)と<code>GET</code>(どうする)に分けて表現します。URLに操作を書かないのがコツで、<code>/getUser</code>や<code>/deleteUser</code>のような動詞入りのパスはRESTらしくありません。</p>
      <table>
        <thead>
          <tr><th>操作</th><th>メソッド + URL</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一覧</td><td><code>GET /users</code></td><td>ユーザーの集合を返す</td></tr>
          <tr><td className="hl">取得</td><td><code>GET /users/:id</code></td><td>1件を返す</td></tr>
          <tr><td className="hl">作成</td><td><code>POST /users</code></td><td>集合に1件追加する</td></tr>
          <tr><td className="hl">更新</td><td><code>PUT /users/:id</code> / <code>PATCH /users/:id</code></td><td>全体更新 / 部分更新</td></tr>
          <tr><td className="hl">削除</td><td><code>DELETE /users/:id</code></td><td>1件を削除する</td></tr>
        </tbody>
      </table>

      <Heading num="02">URL設計 ― 名詞・複数形・浅いネスト</Heading>
      <p>URLは「リソースの住所」です。読んだだけで何を指すか分かるように、いくつかの慣習に沿えます。<Term>名詞の複数形</Term>を使い(<code>/users</code>)、動詞を入れず、ネストは浅く保ちます。関連を表すネストは1段まで(<code>/users/:id/posts</code>)にとどめ、それ以上深くなるならクエリパラメータで表現するか、リソースを独立させます。</p>
      <table>
        <thead>
          <tr><th>良い例</th><th>避けたい例</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>GET /users</code></td><td><code>GET /getUsers</code></td><td>操作はメソッドで表す。URLに動詞を入れない</td></tr>
          <tr><td className="hl"><code>GET /users/1/posts</code></td><td><code>GET /users/1/posts/5/comments/9</code></td><td>深いネストは読みにくい。1段までに抑える</td></tr>
          <tr><td className="hl"><code>GET /posts?userId=1</code></td><td><code>GET /getPostsByUser?u=1</code></td><td>絞り込みはクエリで。パスは名詞の複数形で統一</td></tr>
        </tbody>
      </table>
      <Aside label="単数か複数か">
        <code>/user/1</code>のような単数形も見かけますが、集合(<code>/users</code>)と個別(<code>/users/1</code>)を同じ名詞で揃えられる複数形が扱いやすく、広く採用されています。プロジェクト内でどちらかに統一することが何より大切です。
      </Aside>

      <Heading num="03">レスポンス設計 ― 成功時の形を揃える</Heading>
      <p>使う側がいちばん困るのは「エンドポイントごとにJSONの形が違う」ことです。あるAPIは配列を直接返し、別のAPIはオブジェクトで包む、では毎回パース方法を変えなければなりません。<Term>包み方(エンベロープ)を統一</Term>しておくと、クライアント側の処理を共通化できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 成功レスポンスの形をプロジェクト全体で揃える例
// 単一リソース
res.json({ data: { id: 1, name: "Alice" } });

// 一覧 ― メタ情報を添えられる余地を最初から用意しておく
res.json({
  data: [{ id: 1, name: "Alice" }],
  meta: { total: 128, page: 1, perPage: 20 },
});`}</code>
      </pre>
      <p>常に<code>data</code>で包んでおくと、あとから<code>meta</code>(件数やページ情報)を足しても既存の形を壊しません。「配列を直接返す」設計はシンプルですが、後からメタ情報を追加できず、破壊的変更につながりがちです。</p>

      <Heading num="04">エラー設計 ― 形とコードを統一する</Heading>
      <p>エラーも、成功と同じく<Term>形を揃える</Term>ことが重要です。<Link href="/dev/backend/express/error">エラーハンドリング</Link>で見たエラーミドルウェアに集約すれば、どのエンドポイントで失敗しても同じ構造のJSONを返せます。機械が判別するための<Term>エラーコード</Term>(文字列の識別子)と、人が読むための<Term>メッセージ</Term>を分けておくと、クライアント側で分岐しやすくなります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// エラーレスポンスの統一フォーマット
res.status(404).json({
  error: {
    code: "USER_NOT_FOUND",       // 機械が分岐に使う不変の識別子
    message: "ユーザーが見つかりません", // 人が読むための説明
  },
});`}</code>
      </pre>
      <p>HTTPステータスコード(<code>400</code>・<code>404</code>・<code>500</code>など)で大分類を示し、<code>code</code>で細かい理由を伝える二段構えにすると、クライアントは「400番台なら入力ミス」と大まかに判断しつつ、必要に応じて<code>code</code>で個別対応できます。</p>

      <Heading num="05">ページネーション ― 大量データを分割して返す</Heading>
      <p>一覧APIが数万件を一度に返すと、通信も描画も重くなります。<Term>ページネーション</Term>で分割して返すのが基本です。代表的な方式は2つあります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>クエリ例</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">offset方式</td><td><code>?page=2&amp;perPage=20</code> / <code>?limit=20&amp;offset=20</code></td><td>実装が単純。ページ番号で飛べる。件数が動くとズレが出やすい</td></tr>
          <tr><td className="hl">cursor方式</td><td><code>?limit=20&amp;cursor=abc123</code></td><td>「前回の続き」を指す目印で辿る。件数が変わってもズレにくく大規模向き</td></tr>
        </tbody>
      </table>
      <p>ページ番号で任意のページへ飛びたいなら<Term>offset方式</Term>、無限スクロールのように「続きを読み込む」用途なら<Term>cursor方式</Term>が向きます。どちらでも、レスポンスの<code>meta</code>に「次があるか」「総件数」を添えておくとクライアントが扱いやすくなります。</p>

      <Heading num="06">フィルタ・ソート ― クエリパラメータで表現する</Heading>
      <p>「有効なユーザーだけ」「新しい順」といった絞り込みや並び替えは、新しいURLを増やすのではなく<Term>クエリパラメータ</Term>で表現します。<code>/users?status=active&amp;sort=-createdAt</code>のように、1つの<code>/users</code>に対する条件付き取得として組み立てます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// GET /users?status=active&sort=-createdAt&limit=20
app.get("/users", (req, res) => {
  const { status, sort, limit } = req.query;
  // status で絞り込み、sort で並び替え、limit で件数制限…
  // ("-createdAt" の先頭 "-" を降順の合図にするのが慣習)
  res.json({ data: [], meta: { total: 0 } });
});`}</code>
      </pre>
      <p>並び順は<code>sort=-createdAt</code>のように「先頭の<code>-</code>で降順」とする慣習がよく使われます。フィルタの条件名やソートのキーは、後述のバリデーションで許可した値だけを受け付けるようにすると安全です。</p>

      <Analogy label="💡 たとえるなら">
        よく設計されたAPIは「整理された図書館」です。本(リソース)は分類番号(URL)で棚に並び、「借りる・返す・探す」といった操作は共通のルール(HTTPメソッド)で行えます。どの棚に行っても案内板(レスポンスの形)の書式が同じだから、利用者は一度使い方を覚えれば館内のどこでも迷いません。棚ごとに案内板の書式が違う図書館では、利用者は本を探すたびに読み方から学び直すことになります。
      </Analogy>

      <Heading num="まとめ">一貫性が「使いやすさ」をつくる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>名詞・複数形・浅いネスト</h4><p>URLはリソースの住所。操作はメソッドで表し、動詞や深いネストを避ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>成功もエラーも形を揃える</h4><p><code>data</code>で包み、エラーは<code>code</code>と<code>message</code>で統一。クライアントの処理を共通化できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>大量データはクエリで制御</h4><p>ページネーション・フィルタ・ソートは新URLを増やさずクエリパラメータで表現する。</p></Card>
      </CardGrid>
      <p>設計が整ったら、次は「誰がそのAPIを使ってよいか」を扱います。本番に近づけるための<Link href="/dev/backend/express/auth">認証・認可</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/design" tag="開発">API設計（LSUD / SSKD）</RelatedLink>
            <RelatedLink href="/dev/backend/api/rest" tag="開発">REST API</RelatedLink>
            <RelatedLink href="/dev/backend/api/openapi" tag="開発">OpenAPIと契約</RelatedLink>
            <RelatedLink href="/dev/backend/express/error" tag="開発">エラーハンドリング</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
