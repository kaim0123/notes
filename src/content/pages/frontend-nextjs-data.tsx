import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "データフェッチ・キャッシュ・再検証" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>データフェッチ・キャッシュ・再検証 ― 宣言したものだけがキャッシュされる</h1>
        <Lead>
          かつてのNext.jsは取得を自動的にキャッシュしていましたが、いまは逆です。<Term>何もしなければキャッシュされず、キャッシュしたい処理だけを宣言する</Term>。この転換は単なるAPIの変更ではなく、<Term>キャッシュされているかどうかがコードから読める</Term>ようにするための設計変更です。
        </Lead>
      </Hero>

      <Heading num="01">なぜ明示的になったのか</Heading>
      <p>
        暗黙のキャッシュは、効いているときは快適です。問題は効いていないときで、<Term>なぜ古いデータが出るのか、なぜ毎回取りに行くのかが、コードを見ても分かりません</Term>。取得の書き方や、たまたま使ったオプションによって挙動が変わるからです。
      </p>
      <p>
        いまの形では、キャッシュは<Term>書いた場所にだけ存在します</Term>。書いていなければ毎回取りに行く ― 遅いかもしれませんが、正しさは保証されます。
      </p>

      <pre>
        <code>{`// app/lib/data.ts ― キャッシュしたい処理には宣言を置く
export async function getProducts() {
  "use cache";
  return db.query("SELECT * FROM products");
}

// 常に最新であるべき処理は宣言せず、Suspense で包んで後から流し込む
async function LatestOrders() {
  const orders = await fetchOrders();   // 毎リクエスト取得し直す
  return <OrderList orders={orders} />;
}`}</code>
      </pre>

      <p>
        宣言はデータ取得の関数だけでなく、<Term>コンポーネントやページ単位でも置けます</Term>。ファイルの先頭に置けば、そこから書き出される関数すべてが対象になります。
      </p>

      <Heading num="02">寿命とラベル</Heading>
      <p>
        キャッシュには2つのことを添えます ― <Term>いつまで有効か</Term>と<Term>あとで名指しできる名前</Term>です。
      </p>

      <pre>
        <code>{`import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheLife("hours");    // 寿命のプロファイルを指定する
  cacheTag("products");  // この名前で、あとから無効化できる
  return db.query("SELECT * FROM products");
}`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>指定</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">古くなったとみなす時間</td><td>これを過ぎたら、裏で取り直す対象になる</td></tr>
          <tr><td className="hl">取り直す間隔</td><td>この間隔で新しい内容に入れ替える</td></tr>
          <tr><td className="hl">完全に失効する時間</td><td>これを過ぎたら、古い内容を見せることすらしない</td></tr>
        </tbody>
      </table>

      <p>
        3つを個別に指定することもできますが、まずは<Term>用意されたプロファイルから選ぶ</Term>のが実用的です。秒・分・時間・日・週といった名前が用意されており、<Term>どの粒度で古びるデータか</Term>を考えるだけで決まります。
      </p>

      <Aside label="リクエストごとに変わる値の扱い">
        Cookieやヘッダー、検索条件のように<Term>リクエストごとに変わる値</Term>は、キャッシュ対象の関数の<strong>外で読み取り、引数として渡します</strong>。渡した値はキャッシュの鍵の一部になるので、利用者ごとに別のキャッシュを持たせることもできます。中で直接読もうとすると、そもそもキャッシュできないことになります ― この制約が、<Term>何がキャッシュ可能かを構造的に決めています</Term>。
      </Aside>

      <Heading num="03">更新したあと、どう反映するか</Heading>
      <p>
        データを変更したら、キャッシュを最新化します。手段は3つあり、<Term>誰にいつ見えてほしいか</Term>で使い分けます。
      </p>

      <DiagramFrame
        slug="frontend-nextjs-cache"
        aspect="640 / 320"
        caption="キャッシュの宣言から再検証までの流れを示した図。左でデータ取得の関数にキャッシュの宣言を置き、寿命とラベルを添える。中央がキャッシュの保管庫で、ラベルごとに内容が保持される。右が更新処理で、変更を保存したあと3つの手段のいずれかで再検証する。1つ目は即座に入れ替える方法で、変更した本人がすぐに自分の変更を見られる。2つ目は古い内容を見せたまま裏で更新する方法で、多少の遅れが許せる場面に向く。3つ目はラベルを付けていない範囲をパスごとまとめて無効化する、粒度の粗い手段。どれを選ぶかは、誰にいつ見えてほしいかで決まる。"
      />

      <pre>
        <code>{`"use server";
import { revalidateTag, updateTag, revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: formData.get("title") } });

  // 投稿した本人にはすぐ見せたい ― 即座に入れ替える
  updateTag("posts");

  // 集計のように、少し遅れて反映されればよいもの
  revalidateTag("dashboard-stats");

  // ラベルを付けていない範囲を、パスごとまとめて無効化する
  revalidatePath("/posts");
}`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>手段</th><th>見え方</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">即座に入れ替える</td><td>次に見たとき、必ず新しい内容</td><td>自分の変更を自分がすぐ見る場面。更新処理の中でのみ使える</td></tr>
          <tr><td className="hl">古い内容を見せつつ裏で更新</td><td>しばらく古い内容が見える</td><td>一覧や集計など、多少の遅れが許せるもの</td></tr>
          <tr><td className="hl">パスごと無効化</td><td>その範囲すべてが対象</td><td>ラベルを付けていない・分からないとき。粒度は粗い</td></tr>
        </tbody>
      </table>

      <p>
        1つ目が重要なのは、<Term>自分がした変更が自分に見えない</Term>という体験が最も混乱を招くからです。「保存したのに一覧が古いまま」は、たいていここの選択を誤っています。
      </p>

      <Heading num="04">更新処理をサーバー側に置く</Heading>
      <p>
        <code>&quot;use server&quot;</code>を書いた関数は、<Term>ブラウザから直接呼べるサーバー側の処理</Term>になります。エンドポイントを別に作らなくても、フォームやボタンから呼べます。
      </p>
      <p>
        利点は、<Term>更新と再検証を1か所にまとめられる</Term>ことです。「保存した」と「キャッシュを更新した」が離れた場所に書かれていると、片方だけ忘れます。同じ関数の中に並べば、忘れようがありません。
      </p>

      <Aside label="⚠️ 呼べるということは、誰でも呼べる">
        サーバー側の処理として書き出した関数は、実質的に<Term>公開されたエンドポイントと同じ</Term>です。「この画面からしか呼ばれない」という前提は成り立ちません。<Link href="/frontend/ux-form">フォーム作成時の注意</Link>で見たとおり、認可も検証もその関数の中で必ず行います。
      </Aside>

      <Heading num="05">予期している失敗は返す</Heading>
      <p>
        フォームの検証エラーのような<Term>予期している失敗</Term>は、例外として投げずに<Term>戻り値として返します</Term>。呼び出し側はその値を受け取って画面に出せます。
      </p>
      <p>
        投げてしまうと<Link href="/frontend/react-boundary">エラー境界</Link>まで飛び、画面が差し替わって入力内容が失われます。「入力が間違っている」は異常事態ではない ― この区別が、そのまま実装の分かれ目になります。
      </p>

      <Analogy label="💡 たとえるなら">
        キャッシュの宣言は「この引き出しの中身は、頼まれるまで作り直さない」という指示です。寿命は賞味期限、ラベルは引き出しに貼る名札。即座に入れ替えるのは自分で引き出しを開けて詰め替えること、裏で更新するのは「そのラベルの引き出し、あとで詰め替えておいて」と頼むことにあたります。頼んだ直後に自分で開ければ、まだ古い中身が入っています。
      </Analogy>

      <Heading num="まとめ">書いた場所にだけキャッシュがある</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>宣言しなければキャッシュされない</h4>
          <p>遅いかもしれないが、正しさは保証される。挙動がコードから読める。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>寿命とラベルを添える</h4>
          <p>どの粒度で古びるかを選び、あとで名指しできるようにしておく。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>自分の変更は自分に見せる</h4>
          <p>「保存したのに古いまま」は、再検証の手段の選び間違い。</p>
        </Card>
      </CardGrid>

      <p>
        次は、キャッシュできない部分を含むページを<Term>どう届けるか</Term> ―
        <Link href="/frontend/nextjs-rendering">配信を最適化する</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/nextjs-data" />
    </DocsPage>
  );
}
