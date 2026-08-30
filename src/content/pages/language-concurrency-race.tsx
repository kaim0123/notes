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
  DiagramFrame,
  Steps,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "競合状態とデータ競合",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>競合状態とデータ競合 ― 読んでから書くまでの隙間</h1>
        <Lead>
          在庫が1個しかないのに2人の注文が通ってしまった。ポイントを2回押したら2回加算された。テストは全部通るのに、本番でだけ数字が合わない ―
          これらはすべて同じ原因から生まれます。「値を読む」と「値を書く」の間に、他の誰かが割り込む隙間があることです。ここではその隙間がどこにあり、なぜ再現しないのかを解剖します。
        </Lead>
      </Hero>

      <Heading num="01">競合状態とは ― 結果が順序に依存すること</Heading>
      <p>
        <Term>競合状態(race condition)</Term>とは、複数の処理が同じ資源を触るとき、<Term>どちらが先に進んだかによって結果が変わってしまう</Term>状態を指します。たまたま速かったほうが勝ち、遅かったほうの更新が消えます。
      </p>
      <p>
        厄介なのは、これがコードを読んでも間違いに見えないことです。1件ずつ順番に実行すれば、そのコードは100%正しく動きます。壊れるのは「同時に2件来たとき」だけです。
      </p>

      <Heading num="02">壊れる瞬間 ― read-modify-write</Heading>
      <p>
        典型は<Term>read-modify-write</Term>(読んで、計算して、書き戻す)という3段構えの処理です。
      </p>

      <pre>
        <code>{`// 危険 ― 読み取りと書き込みが分かれている
const item = await db.query("SELECT stock FROM items WHERE id = $1", [id]);
if (item.stock < 1) throw new Error("在庫なし");
await db.query("UPDATE items SET stock = $1 WHERE id = $2", [
  item.stock - 1, // 「さっき読んだ値」から計算している
  id,
]);`}</code>
      </pre>

      <p>
        在庫が1個の状態で2件の注文が同時に来ると、どちらも「在庫1」を読んでしまい、2人とも購入に成功します。先に書いたほうの更新は、あとから書いたほうに上書きされて消えます。これを<Term>ロストアップデート(更新の喪失)</Term>と呼びます。
      </p>

      <Heading num="03">クリティカルセクションとアトミック性</Heading>
      <p>
        この「他人に割り込まれると壊れる区間」を<Term>クリティカルセクション</Term>と呼びます。そして、区間全体が<Term>途中の状態を他から観測されない</Term>ことを<Term>アトミック(不可分)</Term>であるといいます。アトミックであれば、他の処理から見えるのは「処理前」か「処理後」のどちらかだけです。
      </p>

      <Analogy label="💡 たとえるなら">
        更衣室に鍵がない状態がクリティカルセクションです。着替えの途中を他人に見られるどころか、他人が同時に入ってきて服を持っていってしまいます。鍵をかけて「入ったら出るまでを1つの操作にする」のがアトミック化です。
      </Analogy>

      <p>
        実はさきほどの在庫処理は、SQLの書き方を変えるだけでアトミックになります。読み取りと計算をデータベース側で1文にまとめてしまう方法です。
      </p>

      <DiagramFrame
        slug="language-concurrency-atomic"
        aspect="640 / 300"
        caption="読んで書く処理を1つの操作にまとめると競合が消える。上段の危険な書き方は、在庫を読む・判定する・書き戻すの3つに分かれ、その間の隙間に別のリクエストが割り込める。下段の安全な書き方は、更新文の中に条件を含めて読み取りと判定と書き込みを1文にまとめており、データベース側で1つの不可分な操作として実行されるため、割り込む隙間がそもそも存在しない。"
      />

      <pre>
        <code>{`// 安全 ― 読み取り・判定・書き込みが1文(= 1つのアトミックな操作)
const res = await db.query(
  "UPDATE items SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING stock",
  [id],
);
if (res.rowCount === 0) throw new Error("在庫なし");`}</code>
      </pre>

      <p>
        <code>stock = stock - 1</code>は「今のDBの値」を基準に計算され、条件の判定も同じ行ロックの中で行われます。アプリが握った古い値は登場しません。<Term>競合対策の第一手は、ロックを足すことではなく、操作を1つにまとめられないか考えること</Term>です。
      </p>

      <Heading num="04">データ競合と競合状態は同じではない</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>データ競合(data race)</th>
            <th>競合状態(race condition)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">定義</td>
            <td>同じメモリ番地に同期なしで同時アクセスし、一方が書き込み</td>
            <td>実行順序によって結果が変わる論理的な誤り</td>
          </tr>
          <tr>
            <td className="hl">レイヤ</td>
            <td>メモリ・言語仕様のレベル</td>
            <td>アプリケーションの意味のレベル</td>
          </tr>
          <tr>
            <td className="hl">JavaScriptでは</td>
            <td>基本的に起きない(単一スレッド)</td>
            <td>普通に起きる</td>
          </tr>
          <tr>
            <td className="hl">検出</td>
            <td>ツールで機械的に検出しやすい</td>
            <td>仕様を知らないと検出できない</td>
          </tr>
        </tbody>
      </table>

      <p>
        データ競合がなくても競合状態は起きます。上の在庫の例はDBへのアクセスが1件ずつ正しく行われていても壊れました ―
        メモリの読み書きは適切なのに、業務ロジックとして間違っているからです。「単一スレッドだから安全」が通用しないのはこのためです。
      </p>

      <Heading num="05">JavaScriptでは await が中断点になる</Heading>
      <p>
        Node.jsのイベントループは、<code>await</code>に到達すると<Term>その関数の続きを一旦棚上げして、他の仕事に取りかかります</Term>。つまり<code>await</code>を挟むたびに、他のリクエストが割り込む隙間ができます。
      </p>

      <pre>
        <code>{`let processing = false;

async function handleWebhook(event: Event) {
  if (processing) return;      // ① ここでは false
  processing = true;           // ③ 別のリクエストもここに到達しうる
  await saveToDatabase(event); // ② ここで中断 → 他のリクエストが①へ進む
  processing = false;
}`}</code>
      </pre>

      <p>
        この<code>processing</code>フラグは、同期的なコードなら正しく動きます。しかし<code>await</code>をまたぐ場合、①の判定から③の代入までの間に別の呼び出しが①を通過してしまうため、ガードとして機能しません。
      </p>

      <Aside label="レビューでの見分け方">
        <code>await</code>をまたいで「読んだ値」を使っている箇所は、すべて競合の候補です。<Term>読み取りと書き込みの間に<code>await</code>があるか</Term> ―
        ここだけ見れば大半の競合を拾えます(<Link href="/language/js-async">非同期処理</Link>)。
      </Aside>

      <Heading num="06">プロセスが複数になると、逃げ場がなくなる</Heading>
      <p>
        仮にプロセス内のフラグやロックを正しく実装できても、本番環境ではそのプロセスが複数動いています。
      </p>

      <table>
        <thead>
          <tr>
            <th>状況</th>
            <th>プロセス内ロックが効かない理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">複数プロセスで起動</td>
            <td>変数はプロセスごとに別物。ロックが独立して複数存在する</td>
          </tr>
          <tr>
            <td className="hl">コンテナを複数レプリカで運用</td>
            <td>そもそもメモリ空間が別のマシンにある</td>
          </tr>
          <tr>
            <td className="hl">オートスケール</td>
            <td>実行中にインスタンス数が変わる</td>
          </tr>
          <tr>
            <td className="hl">ジョブワーカーの並列実行</td>
            <td>同じジョブが別ワーカーで再試行されうる</td>
          </tr>
        </tbody>
      </table>

      <p>
        したがって共有資源を守る場所は、アプリのメモリではなく<Term>全員が共通して見る場所 ― データベースやRedis</Term>になります。具体的な手段は<Link href="/language/concurrency-lock">排他制御</Link>で扱います。
      </p>

      <Heading num="07">なぜ見つからないのか</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>テストが通る</h4>
          <p>
            テストは1件ずつ順番に実行されます。順番に実行すれば、そのコードは常に正しい。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再現しない</h4>
          <p>
            タイミングが数ミリ秒ずれるだけで起きません。ログを足すと、その遅延で消えます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>負荷で表面化する</h4>
          <p>
            利用者が増えるほど同時実行の確率が上がり、いちばん忙しい日に初めて起きます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>被害が後から効く</h4>
          <p>
            その場では落ちず、集計が合わない・二重課金といったデータの矛盾として後日発覚します。
          </p>
        </Card>
      </CardGrid>

      <p>
        だからこそ、対処は「起きてから直す」ではなく<Term>同時に来ても壊れない書き方を最初から選ぶ</Term>になります。
      </p>

      <Heading num="08">競合に強いコードの探し方</Heading>
      <p>設計時のチェックはこの順番が有効です。上から順に、コストが低く安全な手段です。</p>

      <Steps>
        <li>
          共有しない ― その状態は本当にリクエストをまたいで持つ必要があるか
        </li>
        <li>
          書き換えない ―{" "}
          <Link href="/design/paradigm-functional-foundations">イミュータブル</Link>にして、更新ではなく追記にできないか
        </li>
        <li>
          1操作にまとめる ― アトミックな更新文やユニーク制約でまとめられないか
        </li>
        <li>
          楽観ロック ― 「読んだときから変わっていないこと」を条件にし、変わっていたらやり直す
        </li>
        <li>
          悲観ロック ― そもそも同時に入れないようにする
        </li>
      </Steps>

      <Aside label="ユニーク制約は最強の競合対策">
        「同じメールアドレスで2回登録できてしまう」「同じ注文が2件作られる」といった競合は、アプリ側でいくら確認しても防ぎ切れません。DBに一意制約を張れば、同時に来ても必ず片方が失敗します。アプリの<code>if</code>文ではなく、<Link href="/database/design">データベースに守らせる</Link>のが定石です。
      </Aside>

      <Heading num="まとめ">「読んで書く」を疑う</Heading>
      <p>
        競合状態の正体は、読み取りと書き込みの間に空いた隙間です。隙間はスレッドだけでなく、<code>await</code>・複数プロセス・再試行によっても生まれます。まず隙間をなくせないか(1操作にまとめる・共有しない)を考え、どうしても必要なときに初めてロックを持ち出す ―
        次は<Link href="/language/concurrency-lock">そのロックの使い方</Link>を見ていきます。
      </p>

      <DocsFooter href="/language/concurrency-race" />
    </DocsPage>
  );
}
