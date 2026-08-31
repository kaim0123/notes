import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "データベース連携" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>データベース連携 ― プロセスの外に置く</h1>
        <Lead>
          ここまでのAPIは、返すデータをコードに書いたりメモリに貯めたりしていました。それでは<Term>再起動した瞬間にすべて消えます</Term>。残り続けてほしいデータは、プロセスの外に書き込みます。ここではExpressから呼び出す形と、最初に間違えやすい<Term>接続の作り方</Term>を扱います。
        </Lead>
      </Hero>

      <Heading num="01">メモリは消える</Heading>
      <p>
        プロセスが保持する変数は、プロセスが止まれば消えます。デプロイのたびの再起動、異常終了、複数台構成 ― どれをとっても「メモリに貯める」方式は破綻します。
      </p>
      <p>
        そしてAPIサーバーとデータベースは<Term>別のプログラム</Term>で、多くの場合ネットワーク越しに会話します。だから問い合わせは「時間のかかる待ち」であり、<Link href="/backend/express-async">非同期処理</Link>として扱うことになります。
      </p>

      <Heading num="02">接続はどこで作るか</Heading>
      <p>
        最初に間違えやすいのがここです。<Term>接続を作る場所を1つ間違えるだけで、本番でだけ落ちます</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-db-client"
        aspect="640 / 320"
        caption="データベースへの接続を作る場所によって何が変わるかを示した図。上段のハンドラの中で毎回作る場合は、リクエストが来るたびに新しい接続が生まれ、データベース側の受け口が次々に埋まっていく。開発中は1人で試すので気づかないが、同時アクセスが増えた瞬間に上限に達し、それ以上は誰も接続できなくなる。下段の起動時に一度だけ作る場合は、その1つを全ハンドラが使い回すため接続の数は一定に保たれ、同時アクセスが増えても待つだけで済む。下部には、ハンドラの外側は起動時に一度だけ動き内側は毎回動くという最初のページで見た区別が、ここで具体的な結果として現れることが記されている。"
      />

      <pre>
        <code>{`import { PrismaClient } from "@prisma/client";

// ハンドラの「外」― 起動時に一度だけ作る
const prisma = new PrismaClient();`}</code>
      </pre>

      <p>
        <Link href="/backend/express-hello">最初のページ</Link>で見た「外側は一度だけ、内側は毎回」という区別が、ここで具体的な結果になります。接続の詳しい本数の決め方は<Link href="/backend/data-pool">コネクションプールとN+1</Link>で扱いました。
      </p>

      <Heading num="03">SQLを型付きの呼び出しにする</Heading>
      <p>
        データベースへの命令は本来<Link href="/database/sql">SQL</Link>という専用言語です。文字列としてコードに埋め込むこともできますが、<Term>綴りの誤りも型のずれも検出できず</Term>、値をそのまま連結すれば<Term>命令を書き換えられる危険</Term>もあります。そこでORMを使い、型付きの関数呼び出しとして書くのが今の主流です。
      </p>

      <pre>
        <code>{`const CreateUser = z.object({ name: z.string(), email: z.string().email() });

app.post("/users", async (req, res, next) => {
  try {
    // req.body をそのまま渡さず、検証で得た値だけを使う
    const data = CreateUser.parse(req.body);
    const user = await prisma.user.create({ data });
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
});`}</code>
      </pre>

      <Aside label="届いた値をそのまま渡さない">
        <Term>受け取ったオブジェクトをまるごと保存に渡すのは危険です</Term>。呼ぶ側は、こちらが想定していない項目も送れます ― 権限を表す列や、本人以外が変えてはいけない列が混ざれば、そのまま書き込まれます。<Link href="/backend/express-validation">検証を通した値だけを使う</Link>と、この経路が塞がります。
      </Aside>

      <Heading num="04">メソッドと操作が対応する</Heading>
      <table>
        <thead>
          <tr><th>ルート</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>GET /users</code></td><td>一覧の取得</td></tr>
          <tr><td className="hl"><code>GET /users/:id</code></td><td>1件の取得</td></tr>
          <tr><td className="hl"><code>POST /users</code></td><td>作成</td></tr>
          <tr><td className="hl"><code>PUT</code> / <code>PATCH /users/:id</code></td><td>更新</td></tr>
          <tr><td className="hl"><code>DELETE /users/:id</code></td><td>削除</td></tr>
        </tbody>
      </table>

      <p>
        この対応こそが<Link href="/backend/api-rest">REST</Link>そのものです。<Link href="/backend/express-router">ルーターで分割</Link>すれば、対象ごとに操作がまとまり、見通しよく育てられます。
      </p>

      <Heading num="05">ここから先は、層に分ける</Heading>
      <p>
        ハンドラの中から直接データベースを呼ぶ書き方は、学習にも小さなアプリにも十分です。しかし業務のルールが増えてくると、<Term>1つの関数がHTTPと業務と永続化を同時に抱える</Term>状態になります。
      </p>
      <p>
        その先の整理が<Link href="/backend/layers">アプリケーションの組み立て</Link>です。そして<Term>2つの書き込みをまとめて成功させたい</Term>という要求が出た時点で、<Link href="/backend/data-transaction">トランザクション境界</Link>を考える段階に入ります。<Term>どちらも、必要になってから入れれば足ります</Term>。
      </p>

      <Analogy label="💡 たとえるなら">
        メモリ上の変数は机の上のふせんです。手元ですぐ書けますが、席を立って戻ると風で飛んで消えています。データベースは鍵のかかるキャビネット ― 出し入れにひと手間かかりますが、閉じても、別の人が来ても、電源が落ちても中身は残ります。そして<Term>キャビネットの鍵は、開けるたびに新しく作るものではありません</Term>。
      </Analogy>

      <Heading num="まとめ">外に置き、外から来た値は渡さない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>接続は起動時に一度</h4>
          <p>毎回作ると、同時アクセスが増えた瞬間に上限で全滅する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>型付きの呼び出しにする</h4>
          <p>文字列の組み立てをやめると、綴りの誤りも書き換えの危険も消える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>まるごと渡さない</h4>
          <p>検証で得た値だけを使う。想定していない項目が混ざる経路を塞ぐ。</p>
        </Card>
      </CardGrid>

      <p>
        これでExpressの一通りが揃いました ― 立てて、受け取って返し、組み立て、実務に耐えさせるところまで。ここから先は、その土台である<Link href="/database">データベース</Link>そのものへ踏み込むか、コードの構造を<Link href="/backend/layers">層に分ける</Link>かが、自然な次の一歩です。
      </p>

      <DocsFooter href="/backend/express-database" />
    </DocsPage>
  );
}
