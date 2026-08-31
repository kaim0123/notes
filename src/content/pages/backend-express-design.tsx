import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Expressでの API設計" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>Expressでの API設計 ― 一貫性を実装に落とす</h1>
        <Lead>
          ルーティングもバリデーションもエラー処理も揃うと、次に効いてくるのは<Term>一貫性</Term>です。URLの付け方、成功時の形、エラーの返し方がエンドポイントごとにバラバラだと、使う側は毎回説明を読み直すことになります。「誰向けのAPIか」は<Link href="/backend/api-design">API設計(LSUD / SSKD)</Link>、RESTの考え方は<Link href="/backend/api-rest">REST API</Link>で扱いました。ここは<Term>どう実装に落とすか</Term>に絞ります。
        </Lead>
      </Hero>

      <Heading num="01">URLの慣習</Heading>
      <p>
        URLは「対象の住所」です。読んだだけで何を指すか分かるように、いくつかの慣習に沿えます。
      </p>

      <table>
        <thead>
          <tr><th>良い例</th><th>避けたい例</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>GET /users</code></td><td><code>GET /getUsers</code></td><td>操作はメソッドで表す</td></tr>
          <tr><td className="hl"><code>GET /users/1/posts</code></td><td><code>/users/1/posts/5/comments/9</code></td><td>深い階層は読みにくい。1段までに抑える</td></tr>
          <tr><td className="hl"><code>GET /posts?userId=1</code></td><td><code>GET /getPostsByUser?u=1</code></td><td>絞り込みはクエリで。パスは名詞の複数形で統一</td></tr>
        </tbody>
      </table>

      <Aside label="単数か複数か">
        単数形も見かけますが、集合と個別を同じ名詞で揃えられる複数形が扱いやすく、広く採用されています。もっとも、<Term>プロジェクト内でどちらかに統一すること</Term>のほうが、どちらを選ぶかより重要です。
      </Aside>

      <Heading num="02">成功時の形を揃える</Heading>
      <p>
        使う側がいちばん困るのは<Term>エンドポイントごとに形が違う</Term>ことです。あるAPIは配列を直接返し、別のAPIはオブジェクトで包む、では毎回読み方を変えなければなりません。
      </p>

      <DiagramFrame
        slug="backend-express-envelope"
        aspect="640 / 320"
        caption="応答の包み方を最初に決めておくかどうかで、あとから項目を足せるかが変わることを示した図。上段の配列をそのまま返す設計では、総件数やページ情報を足したくなったときに返す形そのものを配列からオブジェクトへ変えるしかなく、すべての呼び出し側を壊す変更になる。下段の最初から名前付きの欄で包んでおく設計では、後からメタ情報の欄を足しても既存の呼び出し側は何も壊れない。追加は安全で形の変更は破壊的、というAPIの一般則が、応答の設計にもそのまま現れている。"
      />

      <pre>
        <code>{`// 単一
res.json({ data: { id: 1, name: "Alice" } });

// 一覧 ― メタ情報を添えられる余地を最初から用意しておく
res.json({
  data: [{ id: 1, name: "Alice" }],
  meta: { total: 128, page: 1, perPage: 20 },
});`}</code>
      </pre>

      <p>
        <Term>常に包んでおくと、あとから足しても既存の形を壊しません</Term>。配列を直接返す設計はその場では単純ですが、<Link href="/backend/api-versioning">壊す変更</Link>を将来に持ち越すことになります。
      </p>

      <Heading num="03">エラーは二段構えで返す</Heading>
      <p>
        <Link href="/backend/express-error">エラー用の段</Link>に集約すれば、どのエンドポイントで失敗しても同じ構造で返せます。
      </p>

      <pre>
        <code>{`res.status(404).json({
  error: {
    code: "USER_NOT_FOUND",           // 機械が分岐に使う不変の識別子
    message: "ユーザーが見つかりません",  // 人が読むための説明
  },
});`}</code>
      </pre>

      <p>
        ステータスコードで大分類を示し、<Term>コードで細かい理由を伝える</Term>二段構えにします。呼ぶ側は「4xxなら入力の問題」と大まかに判断しつつ、必要に応じて個別に対応できます。要点は<Term>コードは不変であること</Term> ― メッセージは自由に直せますが、コードを変えると呼ぶ側の分岐が壊れます。
      </p>

      <Heading num="04">一覧は必ず分割する</Heading>
      <p>
        一覧が数万件を一度に返すと、通信も描画も重くなります。<Term>件数の上限は、最初から入れておきます</Term> ― あとから入れるのは壊す変更になるからです。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>クエリ例</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">位置で指定</td><td><code>?page=2&amp;perPage=20</code></td><td>実装が単純。ページ番号で飛べる。<strong>件数が動くとズレる</strong></td></tr>
          <tr><td className="hl">続きの目印で指定</td><td><code>?limit=20&amp;cursor=abc123</code></td><td>ズレにくく、深いページでも遅くならない</td></tr>
        </tbody>
      </table>

      <p>
        任意のページへ飛びたいなら前者、「続きを読み込む」用途なら後者が向きます。<Link href="/backend/data-pool">深いページほど遅くなる</Link>という性質は後者が解決します。どちらでも、応答に<Term>次があるか</Term>を添えておくと呼ぶ側が扱いやすくなります。
      </p>

      <Heading num="05">絞り込みと並び替えはクエリで</Heading>
      <p>
        「有効なものだけ」「新しい順」といった条件は、新しいURLを増やすのではなくクエリで表現します。
      </p>

      <pre>
        <code>{`// GET /users?status=active&sort=-createdAt&limit=20
app.get("/users", (req, res) => {
  const query = ListUsersQuery.parse(req.query);   // 許可した値だけを通す
  // "-createdAt" の先頭 "-" を降順の合図にするのが慣習
  res.json({ data: [], meta: { total: 0 } });
});`}</code>
      </pre>

      <p>
        ここで重要なのは、<Term>条件名や並び替えのキーを、許可したものだけに限定する</Term>ことです。受け取った文字列をそのままクエリに渡すと、<Term>公開するつもりのない列で並び替えたり絞り込んだりできてしまいます</Term>。<Link href="/backend/express-validation">バリデーション</Link>は、ここでも境界の役割を果たします。
      </p>

      <Analogy label="💡 たとえるなら">
        よく設計されたAPIは整理された図書館です。本は分類番号で棚に並び、借りる・返す・探すといった操作は共通のルールで行えます。<Term>どの棚に行っても案内板の書式が同じ</Term>だから、利用者は一度使い方を覚えれば館内のどこでも迷いません。棚ごとに書式が違う図書館では、本を探すたびに読み方から学び直すことになります。
      </Analogy>

      <Heading num="まとめ">一貫性が、使いやすさをつくる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>名詞・複数形・浅い階層</h4>
          <p>操作はメソッドで表し、動詞と深い階層を避ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>包んでおくと後から足せる</h4>
          <p>成功もエラーも形を揃える。コードは不変、メッセージは自由。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>上限は最初から</h4>
          <p>件数制限も、許可する条件名も、あとから入れると壊す変更になる。</p>
        </Card>
      </CardGrid>

      <p>
        形が整ったら、次は「誰がそれを使ってよいか」です。<Link href="/backend/express-auth">認証・認可の実装</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-design" />
    </DocsPage>
  );
}
