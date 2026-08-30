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
  title: "非同期処理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>非同期処理 ― DBや外部APIを待ってから応答する</h1>
        <Lead>
          実用的なAPIのハンドラは、たいてい<Term>すぐには答えが出ない処理</Term>を含みます。データベースへの問い合わせや外部APIの呼び出しは、結果が返るまで数ミリ秒〜数百ミリ秒かかります。この「待ち」を<Term>async/await</Term>で素直に書くのが、Expressのハンドラを非同期にする基本です。
        </Lead>
      </Hero>

      <Heading num="01">なぜ非同期が必要か ― 待つ間に手を止めない</Heading>
      <p>Node.jsは<Term>シングルスレッド</Term>で動きます。もしDBの応答を「待つ」あいだサーバー全体が止まってしまうと、その間に届いた他のリクエストをまったく処理できません。そこでNode.jsは、時間のかかるI/O(DB・ファイル・ネットワーク)を<Term>非同期</Term>に扱い、結果が返るまでの間は他の仕事を進められるようにしています。ハンドラ側でこの仕組みに乗るための書き方が<code>async/await</code>です。</p>

      <Heading num="02">Promiseの復習 ― 「あとで返ってくる値」</Heading>
      <p><Term>Promise</Term>は「いま結果は無いが、あとで成功(値)か失敗(エラー)のどちらかで決着する」ことを表すオブジェクトです。DBライブラリや<code>fetch</code>は、結果そのものではなくPromiseを返します。<code>await</code>を付けると、そのPromiseが決着するまで待って、中身の値を取り出せます。</p>
      <Aside label="言語側の詳しい解説">
        Promiseやイベントループの仕組みそのものは言語の基礎です。ここでは「Expressでどう使うか」に絞ります。仕組みを掘り下げたいときは<Link href="/dev/language/async">JavaScriptの非同期処理</Link>を参照してください。
      </Aside>

      <Heading num="03">async/awaitでハンドラを書く</Heading>
      <p>ハンドラ関数の頭に<code>async</code>を付けると、中で<code>await</code>が使えます。DBから取得した結果を待ってから<code>res.json()</code>で返す、という流れがそのまま上から下に読めます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// async を付けると、ハンドラ内で await が使える
app.get("/users/:id", async (req, res) => {
  const user = await db.user.findById(req.params.id); // 結果を待つ
  res.json(user);                                      // 待ってから返す
});`}</code>
      </pre>
      <p><code>await</code>が無いと、DBの結果が返る前に次の行へ進んでしまい、まだ空のデータを返してしまいます。「結果を使う前に必ず<code>await</code>する」のが基本です。</p>

      <Heading num="04">並列処理 ― 独立した取得は同時に待つ</Heading>
      <p>互いに依存しない複数の取得を<code>await</code>で一つずつ書くと、<strong>直列</strong>に実行され、待ち時間が積み上がります。同時に走らせてまとめて待つには<code>Promise.all()</code>を使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 直列：user を待ってから posts を待つ（遅い）
const user = await db.user.findById(id);
const posts = await db.post.findByUser(id);

// 並列：両方を同時に走らせ、まとめて待つ（速い）
const [user2, posts2] = await Promise.all([
  db.user.findById(id),
  db.post.findByUser(id),
]);`}</code>
      </pre>
      <p>ただし「後の処理が前の結果を必要とする」場合(取得したユーザーIDで別のデータを引くなど)は、順序に意味があるため直列のままにします。</p>

      <Heading num="05">非同期のエラーはどう扱うか</Heading>
      <p><code>async</code>ハンドラの中で例外が起きたり、<code>await</code>したPromiseが失敗すると、その例外は<code>try-catch</code>で受け止める必要があります。捕まえずに放置すると、リクエストが応答されないまま宙に浮くことがあります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.user.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err); // エラーミドルウェアへ渡す
  }
});`}</code>
      </pre>
      <Aside label="毎回のtry-catchが冗長なら">
        すべてのハンドラに<code>try-catch</code>を書くのは繰り返しになりがちです。実務ではハンドラを包んで例外を自動で<code>next()</code>へ流す小さなラッパー関数を用意することが多く、Express 5では非同期ハンドラの拒否(reject)を自動でエラー処理に回す挙動も入りました。仕組みの詳細は次のエラーハンドリングで扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        直列の<code>await</code>は「料理を1品ずつ、作り終えてから次に取りかかる」やり方です。<code>Promise.all()</code>は「お湯を沸かしながら野菜を切る」ように、待ち時間の重なる作業を同時に進めること。ただし「炒める前に必ず切っておく」ような順序のある工程は、同時にはできません。
      </Analogy>

      <Heading num="まとめ">待つ処理はasync/awaitで素直に書く</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ハンドラにasyncを付ける</h4><p>DBや外部APIの結果を<code>await</code>で待ってから応答する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>独立した取得はPromise.all</h4><p>同時に走らせてまとめて待ち、待ち時間の積み上がりを防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>例外はtry-catchでnextへ</h4><p>捕まえ損ねると応答が返らない。エラー処理へ確実に渡す。</p></Card>
      </CardGrid>
      <p>非同期処理でつまずきやすいのは、まさにこの「失敗したときの扱い」です。次は<Link href="/dev/backend/express/error">エラーハンドリング</Link>で、エラーを一箇所にまとめて処理する方法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/error" tag="開発">エラーハンドリング</RelatedLink>
            <RelatedLink href="/dev/language/async" tag="開発">非同期処理</RelatedLink>
            <RelatedLink href="/dev/backend/express/database" tag="開発">データベース連携</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
