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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "排他制御",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 並行処理</Eyebrow>
        <h1>排他制御 ― 同時に触らせない仕組み</h1>
        <Lead>
          共有をやめられず、1つの操作にもまとめられない。そこで初めて「順番に入ってもらう」仕組み ― <Term>排他制御</Term>の出番です。教科書に出てくるミューテックスやセマフォが何を保証する道具なのかを押さえたうえで、複数プロセスで動くWebアプリで実際に使う4つの手段まで降りていきます。
        </Lead>
      </Hero>

      <p>「<Link href="/dev/concurrency/race">競合状態とデータ競合</Link>」で見たとおり、壊れるのは<strong>クリティカルセクション</strong>です。排他制御とは、この区間に同時に1つ(あるいはN個)しか入れないようにすることを指します。</p>

      <Heading num="01">最初に検討するのは「ロックしない」選択肢</Heading>
      <p>ロックは正しく使えば安全ですが、代償があります ― 待ち時間が生まれ、スループットが落ち、デッドロックの可能性が生じ、テストが難しくなります。そのため実務では次の順で検討します。</p>
      <table>
        <tbody>
          <tr><th>手段</th><th>考え方</th><th>コスト</th></tr>
          <tr><td className="hl">共有しない</td><td>状態をリクエスト内に閉じる。グローバル変数・モジュールスコープのキャッシュをやめる</td><td>ゼロ</td></tr>
          <tr><td className="hl">不変にする</td><td>書き換えず、新しい値を作る。履歴を追記していく設計にする</td><td>低(メモリ)</td></tr>
          <tr><td className="hl">アトミック操作</td><td>読み取り・判定・更新を1操作にまとめる(<code>UPDATE ... SET x = x - 1</code>、一意制約)</td><td>低</td></tr>
          <tr><td className="hl">楽観ロック</td><td>ぶつからない前提で進み、ぶつかったらやり直す</td><td>中(再試行の実装)</td></tr>
          <tr><td className="hl">悲観ロック</td><td>先に鍵をかけ、他を待たせる</td><td>高(待ち・デッドロック)</td></tr>
        </tbody>
      </table>
      <p>下に行くほど強力ですが、下に行くほど遅く・壊れやすくなります。<strong>上から順に、必要になったところで止める</strong>のが原則です。</p>

      <Heading num="02">ミューテックス ― 1人ずつ</Heading>
      <p><Term>ミューテックス(mutex)</Term>は mutual exclusion(相互排他)の略で、「同時に入れるのは1つだけ」を保証する最も基本的な錠前です。使う側は<strong>取得(lock)→ 作業 → 解放(unlock)</strong>の3手順を守ります。</p>
      <Analogy label="💡 たとえるなら">
        1つしかないトイレの鍵です。中に人がいれば次の人は待ち、出たら次が入ります。鍵をかけたまま出ていく(解放し忘れる)と、以後誰も入れなくなります ― これがロックの解放漏れです。
      </Analogy>
      <p>解放漏れを防ぐため、多くの言語では取得と解放を構文で対にする仕組みが用意されています(Javaの <code>synchronized</code>、C#の <code>lock</code>、Goの <code>defer mu.Unlock()</code>、Rustでは値そのものをロックが包む)。JavaScriptで自前実装する場合は <code>try / finally</code> で必ず解放します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 例外が出ても必ず解放する ― これを外すと全体が止まる
await mutex.acquire();
try {
  await criticalSection();
} finally {
  mutex.release();
}`}</code>
      </pre>

      <Heading num="03">セマフォ ― N人まで</Heading>
      <p><Term>セマフォ(semaphore)</Term>は「同時に入れるのはN個まで」を表す仕組みです。内部にカウンタを持ち、取得で減らし、解放で増やします。N=1のセマフォはミューテックスとほぼ同じ働きをします。</p>
      <p>Web開発では排他というより<strong>並列度の上限を決める道具</strong>として使う場面のほうが多いでしょう ― 外部APIへの同時接続を5本までに抑える、画像変換を同時に2つまでにする、といった使い方です(「<Link href="/dev/concurrency/patterns">実装パターン</Link>」で扱います)。</p>
      <Aside label="カウンティングセマフォとバイナリセマフォ">
        N個を許すものを<strong>カウンティングセマフォ</strong>、1個だけを許すものを<strong>バイナリセマフォ</strong>と呼びます。バイナリセマフォとミューテックスの違いは所有権の有無で、ミューテックスは「ロックした本人しか解放できない」制約を持つのが一般的です。
      </Aside>

      <Heading num="04">読み書きロックとアトミック変数</Heading>
      <p>用途に合わせた変種もあります。共有データの性質が分かっているなら、より緩い(=速い)手段を選べます。</p>
      <table>
        <tbody>
          <tr><th>仕組み</th><th>保証</th><th>向いている場面</th></tr>
          <tr><td className="hl">読み書きロック(RWLock)</td><td>読みは同時に何人でも、書きは1人だけ</td><td>読み取りが圧倒的に多い設定キャッシュなど</td></tr>
          <tr><td className="hl">アトミック変数 / CAS</td><td>「今の値がXならYにする」を不可分に実行</td><td>カウンタ、フラグ。ロックより速い</td></tr>
          <tr><td className="hl">スピンロック</td><td>待つ間、他へ譲らずCPUを回して待機</td><td>ロック時間が極端に短いカーネル内部など</td></tr>
        </tbody>
      </table>
      <p><Term>CAS(Compare And Swap)</Term>は「読んだ値から変わっていなければ書き込む」というCPU命令で、後述する楽観ロックと同じ発想です。ロックを取らずに済むため<Term>ノンブロッキング</Term>と呼ばれます。</p>

      <Heading num="05">ロックの粒度 ― 太くするか、細かくするか</Heading>
      <p>どの範囲を1つのロックで守るかを<Term>ロックの粒度</Term>といいます。</p>
      <table>
        <tbody>
          <tr><th></th><th>粗い(全体を1つのロックで守る)</th><th>細かい(対象ごとにロックを分ける)</th></tr>
          <tr><td className="hl">実装</td><td>簡単・間違えにくい</td><td>複雑・取り違えやすい</td></tr>
          <tr><td className="hl">性能</td><td>関係ない処理まで待たされる</td><td>並列に進める</td></tr>
          <tr><td className="hl">デッドロック</td><td>起きにくい(1つしか取らない)</td><td>起きやすい(複数取ると順序問題)</td></tr>
          <tr><td className="hl">例</td><td>「在庫テーブル全体」をロック</td><td>「商品ID 123の行」だけをロック</td></tr>
        </tbody>
      </table>
      <p>原則は<strong>「必要な範囲だけを、必要な時間だけ」</strong>。ただし細かくしすぎると複数のロックを同時に持つことになり、<Link href="/dev/concurrency/deadlock">デッドロック</Link>の温床になります。まず粗く作り、計測して詰まっている箇所だけを細かくするのが安全です。</p>

      <Heading num="06">スレッドセーフとは何を約束する言葉か</Heading>
      <p>ライブラリの説明でよく見る<Term>スレッドセーフ</Term>は、「複数の実行単位から同時に呼んでも、内部状態が壊れず正しく動く」という意味です。裏を返せば、そう書かれていないものは同時に呼んではいけません。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>不変(immutable)</h4>
          <p>作った後に変わらない。誰が同時に読んでも安全。最も強い保証。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>内部で同期している</h4>
          <p>ライブラリ内部でロックを取っている。安全だが、使う側からは待ちが見えない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>条件付き</h4>
          <p>「インスタンスを共有しなければ安全」など。多くのDBクライアントやパーサはこの型。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>スレッドセーフでない</h4>
          <p>使う側がロックする責任を負う。共有せず、実行単位ごとに作るのが無難。</p>
        </Card>
      </CardGrid>
      <p>なお、部品ひとつひとつがスレッドセーフでも、それらを組み合わせた処理が安全とは限りません。「スレッドセーフなMapに対して <code>has()</code> してから <code>set()</code> する」は、その2操作の間に割り込まれるため競合します ― 守るべき単位は<strong>操作の組み合わせ</strong>です。</p>

      <Heading num="07">Webアプリでの現実的な排他 ― 4つの手段</Heading>
      <p>ここまでの道具はすべて「1プロセス内」のものです。プロセスが複数ある本番環境では、全員が共通して見る場所で排他する必要があります。実務で使うのは次の4つです。</p>

      <h3>① 悲観ロック ― DBの行ロック</h3>
      <p>トランザクションの中で <code>SELECT ... FOR UPDATE</code> を使うと、その行は他のトランザクションから更新できなくなります。確実ですが、待ちが発生します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`await db.transaction(async (tx) => {
  // この行を掴む。他のトランザクションはここで待たされる
  const [account] = await tx.query(
    "SELECT balance FROM accounts WHERE id = $1 FOR UPDATE",
    [id],
  );
  if (account.balance < amount) throw new InsufficientFunds();

  await tx.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [
    amount,
    id,
  ]);
});`}</code>
      </pre>

      <h3>② 楽観ロック ― バージョン列</h3>
      <p>ぶつからない前提で更新し、<strong>更新できた行数が0なら誰かに先を越された</strong>と判断してやり直します。待ちが発生しないため、競合が稀なケースに向きます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const res = await db.query(
  \`UPDATE documents SET body = $1, version = version + 1
     WHERE id = $2 AND version = $3\`,
  [body, id, readVersion],
);
if (res.rowCount === 0) {
  // 読み込んでから今までの間に、他の誰かが更新した
  throw new ConflictError("編集が競合しました");
}`}</code>
      </pre>
      <p>編集画面のように「人間が数分かけて操作する」場面では、その間ずっと行を掴んでおくわけにいかないため楽観ロック一択です。詳しい使い分けは「<Link href="/dev/backend/data/transaction">トランザクション境界</Link>」も参照してください。</p>

      <h3>③ 分散ロック ― Redisなどの外部ストア</h3>
      <p>「同じ処理を全インスタンスで1つだけ動かしたい」ときは、共有ストアに鍵を置きます。Redisなら「キーが無ければ作る」操作(<code>SET key value NX PX 30000</code>)がアトミックなので、成功した1人だけがロックを得られます。</p>
      <Aside label="分散ロックは万能ではない">
        ロックを持ったままプロセスが落ちると、有効期限(TTL)が切れるまで誰も入れません。逆にTTLが短すぎると、処理が終わる前にロックが切れて<strong>2人が同時に入ります</strong>。分散ロックは「たまに二重実行される」前提で組み、最終的な安全性は<strong>冪等性やDBの一意制約</strong>で担保するのが定石です。
      </Aside>

      <h3>④ 直列化 ― そもそも同時に実行しない</h3>
      <p>キーごとに処理を1本のキューに流し込み、同じ対象への操作が並行しないようにする方法です。ロックを持たずに順序を保証できるため、ジョブ処理と相性が良い設計です(「<Link href="/dev/backend/jobs">ジョブキューとワーカー</Link>」)。</p>

      <Heading num="08">ロック中にやってはいけないこと</Heading>
      <p>ロックの持ち時間は、そのままシステム全体の待ち時間になります。次の3つは典型的な悪手です。</p>
      <Steps>
        <li><strong>ロックを持ったまま外部通信する</strong> ― 外部APIが5秒詰まれば、その間ロック待ちの全員が止まる</li>
        <li><strong>ロックを持ったまま別のロックを取る</strong> ― 取得順序が食い違えばデッドロックになる</li>
        <li><strong>ユーザーの操作を待つ</strong> ― 画面で確認ボタンを押すまで行を掴む、といった設計は成立しない</li>
      </Steps>
      <p>ロック区間には<strong>共有データの読み書きだけ</strong>を置き、時間のかかる処理は外に出す ― これがロック設計の基本形です。</p>

      <Heading num="まとめ">鍵は最後の手段</Heading>
      <p>排他制御は強力ですが、待ち・デッドロック・複雑さという代償を伴います。共有をやめる、不変にする、1操作にまとめる、楽観ロックで済ませる ― この順に検討し、それでも必要なときにだけ悲観ロックを使ってください。そして次に見るのは、ロックを使い始めた瞬間に生まれる新しい失敗 ― デッドロックです。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/concurrency/deadlock" tag="実装">デッドロックと枯渇</RelatedLink>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
            <RelatedLink href="/dev/backend/data/transaction" tag="バックエンド">トランザクション境界</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
