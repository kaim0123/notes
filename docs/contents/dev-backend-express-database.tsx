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
  title: "データベース連携",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>データベース連携 ― APIにデータの永続化をつなぐ</h1>
        <Lead>
          ここまでのAPIは、返すデータをコードに直接書いたり、メモリ上の配列に貯めたりしていました。しかしそれではサーバーを再起動した瞬間にすべて消えてしまいます。データを<Term>永続化</Term>し、何度でも読み書きできるようにする相手が<Term>データベース</Term>です。Expressのルートハンドラから、どうやってデータベースを呼び出すかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">なぜデータベースが必要か ― 永続化</Heading>
      <p>Node.jsのプロセスが保持するメモリ上の変数は、プロセスが止まれば消えます。デプロイのたびの再起動、クラッシュ、サーバーの複数台構成――どれをとっても「メモリに貯める」方式は破綻します。ユーザー登録や投稿のように<strong>残り続けてほしいデータ</strong>は、プロセスの外にある<Term>データベース</Term>へ書き込みます。これが<Term>永続化</Term>です。</p>
      <p>APIサーバー(Express)とデータベースは別のプログラムで、多くの場合ネットワーク越しに会話します。だからデータベースへの問い合わせは「時間のかかる待ち」であり、<Link href="/dev/backend/express/async">非同期処理</Link>で扱うことになります。</p>

      <Heading num="02">RDBMSの選択 ― まずはリレーショナルデータベース</Heading>
      <p>データの多くは「ユーザー」「投稿」「コメント」のように表(テーブル)と関係(リレーション)で素直に表せます。この形式を扱う<Term>RDBMS</Term>(リレーショナルデータベース)は、最初の選択肢として堅実です。代表的なものを軽く並べます。</p>
      <table>
        <thead>
          <tr><th>RDBMS</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PostgreSQL</td><td>機能が豊富で堅牢。本番の標準的な第一候補</td></tr>
          <tr><td className="hl">MySQL</td><td>広く普及し情報が多い。既存資産との相性で選ばれる</td></tr>
          <tr><td className="hl">SQLite</td><td>1ファイルで動く軽量DB。学習・開発・小規模に手軽</td></tr>
        </tbody>
      </table>
      <p>どれを選んでも、次に述べるORMを間に挟めばExpress側のコードはほとんど変わりません。学習段階なら準備のいらないSQLiteから始め、本番でPostgreSQLへ切り替える、といった進め方ができます。データベースそのものの役割や種類は<Link href="/database/basics">役割と種類</Link>で詳しく扱います。</p>

      <Heading num="03">ORM ― SQLを型付きの関数呼び出しで書く</Heading>
      <p>データベースへの命令は本来<Term>SQL</Term>という専用言語で書きます(<Link href="/database/sql">SQLとデータ操作</Link>)。SQLを文字列としてコードに埋め込むこともできますが、綴りの誤りや型のずれをTypeScriptが検出できず、値をそのまま連結すると<Term>SQLインジェクション</Term>の危険もあります。そこで<Term>ORM</Term>(Object-Relational Mapping)を使い、SQLを<strong>型付きの関数呼び出し</strong>として書くのが今の主流です。</p>
      <table>
        <thead>
          <tr><th>ORM</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Prisma</td><td>スキーマ定義から型とクライアントを自動生成。読みやすく学習しやすい</td></tr>
          <tr><td className="hl">Drizzle ORM</td><td>SQLに近い書き味で軽量。型安全を保ちつつ生成コードに頼らない</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient(); // 起動時に一度だけ

const CreateUser = z.object({ name: z.string(), email: z.string().email() });

app.post("/users", async (req, res, next) => {
  try {
    // req.body をそのまま渡さず、検証で得た値だけを使う
    const data = CreateUser.parse(req.body);
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  } catch (err) {
    next(err); // エラーハンドリングミドルウェアへ
  }
});`}</code>
      </pre>
      <p>ポイントは、<code>req.body</code>を<strong>そのままORMへ渡さない</strong>ことです。クライアントが送る値は信用できません。<Link href="/dev/backend/express/validation">バリデーション</Link>(上の例ではZod)を通し、検証済みの値だけをデータベースに書き込みます。ORMの戻り値には型が付くので、以降の<code>user.name</code>などもTypeScriptに守られます。</p>
      <Aside label="接続は使い回す">
        <code>new PrismaClient()</code>のようなデータベース接続は、リクエストごとに作ってはいけません。接続の確立自体が重く、数が増えるとデータベース側が枯渇します。<strong>アプリ起動時に一度だけ作り</strong>、すべてのハンドラで同じインスタンスを使い回します。
      </Aside>

      <Heading num="04">CRUDをAPIに載せる ― メソッドと操作の対応</Heading>
      <p><Link href="/dev/backend/express/routing">ルーティング</Link>で見たHTTPメソッドは、データベースの基本操作<Term>CRUD</Term>(Create・Read・Update・Delete)ときれいに対応します。ルートハンドラの中で、対応するORMの関数を<code>await</code>で呼ぶだけです。</p>
      <table>
        <thead>
          <tr><th>ルート</th><th>DB操作(CRUD)</th><th>ORMの例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">GET /users</td><td>Read(一覧)</td><td><code>prisma.user.findMany()</code></td></tr>
          <tr><td className="hl">GET /users/:id</td><td>Read(1件)</td><td><code>prisma.user.findUnique()</code></td></tr>
          <tr><td className="hl">POST /users</td><td>Create</td><td><code>prisma.user.create()</code></td></tr>
          <tr><td className="hl">PUT / PATCH /users/:id</td><td>Update</td><td><code>prisma.user.update()</code></td></tr>
          <tr><td className="hl">DELETE /users/:id</td><td>Delete</td><td><code>prisma.user.delete()</code></td></tr>
        </tbody>
      </table>
      <p>この対応こそが<Term>REST</Term>の考え方そのものです。URLが「どのリソースか」を、HTTPメソッドが「何をするか」を表し、その内側でデータベースのCRUDが動きます。<Link href="/dev/backend/express/router">Router</Link>でリソースごとにファイルを分ければ、<code>users.ts</code>にユーザーのCRUDが、<code>posts.ts</code>に投稿のCRUDがまとまり、見通しよく育てられます。</p>

      <Analogy label="💡 たとえるなら">
        メモリ上の配列は「机の上のふせん」です。手元ですぐ書けますが、席を立って戻る(再起動)と風で飛んで消えています。データベースは「鍵のかかるキャビネット」。出し入れにひと手間(ネットワーク越しの待ち)はかかりますが、閉じても・別の人が来ても・電源が落ちても、中身は残り続けます。ORMは、そのキャビネットの引き出しに正しいラベル(型)を貼ってくれる整理係です。
      </Analogy>

      <Heading num="まとめ">永続化でAPIが「使えるもの」になる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>メモリは消える、DBは残る</h4><p>残したいデータはプロセスの外のデータベースへ書き、永続化する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ORMで型付き・安全に</h4><p>PrismaやDrizzleでSQLを関数呼び出しに。検証済みの値だけを渡す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>HTTPメソッド＝CRUD</h4><p>GET/POST/PUT/DELETEが、そのままRead/Create/Update/Deleteに対応する。</p></Card>
      </CardGrid>
      <p>これでExpressの一通り――<strong>動くサーバーを作る</strong>(概要〜Response)、<strong>核心</strong>(ミドルウェア・JSON API)、<strong>コードを整理する</strong>(Router・非同期・エラー)、<strong>実用的なAPIにする</strong>(バリデーション・ログ・API設計)、<strong>本番に近づける</strong>(認証・認可、データベース連携)――が揃いました。ここから先は、その土台となる<Link href="/database/basics">データベース</Link>そのものを学び、テーブル設計やSQLへと踏み込んでいくのが自然な次の一歩です。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/basics" tag="データベース">役割と種類</RelatedLink>
            <RelatedLink href="/database/sql" tag="データベース">SQLとデータ操作</RelatedLink>
            <RelatedLink href="/dev/backend/express/async" tag="開発">非同期処理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
