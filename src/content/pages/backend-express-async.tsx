import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "非同期処理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>非同期処理 ― 待つ間に、手を止めない</h1>
        <Lead>
          実用的なハンドラは、たいてい<Term>すぐには答えが出ない処理</Term>を含みます。データベースへの問い合わせや外部の呼び出しは、結果が返るまで待たされます。この「待ち」を素直に書くのが基本ですが、<Term>待ち方の違いが、そのまま応答の速さになります</Term>。
        </Lead>
      </Hero>

      <Heading num="01">なぜ非同期が要るのか</Heading>
      <p>
        Node.jsは1本の流れで動きます。もしデータベースの応答を待つあいだサーバー全体が止まってしまうと、<Term>その間に届いた他のリクエストをまったく処理できません</Term>。そこで時間のかかる待ちを非同期に扱い、結果が返るまでの間は他の仕事を進められるようにしています。
      </p>

      <Aside label="仕組みそのものは言語の話">
        待ちを表すオブジェクトや、その裏で回っている仕組みは言語の基礎です。ここでは「Expressでどう使うか」に絞ります。掘り下げたいときは<Link href="/language/js-async">JavaScriptの非同期処理</Link>を参照してください。
      </Aside>

      <Heading num="02">上から下に読める形で書く</Heading>
      <pre>
        <code>{`app.get("/users/:id", async (req, res) => {
  const user = await db.user.findById(req.params.id);   // 結果を待つ
  res.json(user);                                       // 待ってから返す
});`}</code>
      </pre>

      <p>
        待たずに次の行へ進むと、まだ空のものを返してしまいます。<Term>結果を使う前に必ず待つ</Term>のが基本です。
      </p>

      <Heading num="03">独立した取得は同時に待つ</Heading>
      <p>
        互いに依存しない取得を1つずつ待つと、<Term>待ち時間が積み上がります</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-await-parallel"
        aspect="640 / 320"
        caption="待ち時間が重なるかどうかで応答の速さが変わることを示した図。上段の1つずつ待つ書き方では、3つの取得の帯が順に並び、合計はそれらの和になる。下段の同時に投げてまとめて待つ書き方では、3つの帯が同じ位置から始まって重なり合い、いちばん長いもので全体が終わる。ただしこの書き換えができるのは3つが互いに独立している場合だけで、前の結果を使って次を引く場合は順序に意味があるため1つずつ待つ形のままにする。下部には、待ちを減らす前にまず往復の数そのものを疑うこと、という注意も添えられている。"
      />

      <pre>
        <code>{`// 直列 ― user を待ってから posts を待つ(遅い)
const user  = await db.user.findById(id);
const posts = await db.post.findByUser(id);

// 並列 ― 両方を同時に走らせ、まとめて待つ(速い)
const [user2, posts2] = await Promise.all([
  db.user.findById(id),
  db.post.findByUser(id),
]);`}</code>
      </pre>

      <p>
        ただし、後の処理が前の結果を必要とする場合は<Term>順序に意味がある</Term>ため、直列のままにします。そしてもう1つ ― <Term>並列化する前に、そもそも往復の数を減らせないかを疑います</Term>。3本が1本のクエリで済むなら、そちらのほうが速く、接続の占有も短くて済みます(<Link href="/backend/data-pool">N+1</Link>と同じ話です)。
      </p>

      <Heading num="04">失敗をどう扱うか</Heading>
      <p>
        待っていた処理が失敗すると、その例外は受け止める必要があります。捕まえずに放置すると、<Term>リクエストが応答されないまま宙に浮くことがあります</Term>。
      </p>

      <pre>
        <code>{`app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.user.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);   // まとめて受け止める段へ渡す
  }
});`}</code>
      </pre>

      <Aside label="毎回書くのが冗長なら">
        すべてのハンドラに同じ囲みを書くのは繰り返しになります。実務ではハンドラを包んで例外を自動で流す小さなラッパーを用意することが多く、Express 5では<Term>非同期ハンドラの失敗を自動でエラー処理へ回す挙動</Term>も入りました。仕組みの詳細は次のページで扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        1つずつ待つのは「料理を1品ずつ、作り終えてから次に取りかかる」やり方です。まとめて待つのは「お湯を沸かしながら野菜を切る」ように、待ち時間の重なる作業を同時に進めること。ただし<Term>炒める前に必ず切っておく</Term>ような順序のある工程は、同時にはできません。
      </Analogy>

      <Heading num="まとめ">待ち方が、速さを決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>結果を使う前に必ず待つ</h4>
          <p>待たずに進むと、空のものを返してしまう。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>独立していれば同時に</h4>
          <p>待ち時間が和ではなく最大値になる。依存があるなら順番のまま。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>失敗は必ず受け渡す</h4>
          <p>捕まえ損ねると応答が返らない。エラー処理へ確実に流す。</p>
        </Card>
      </CardGrid>

      <p>
        つまずきやすいのは、まさにこの「失敗したときの扱い」です。次は<Link href="/backend/express-error">エラーハンドリング</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-async" />
    </DocsPage>
  );
}
