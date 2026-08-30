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
  title: "排他制御",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>排他制御 ― 同時に触らせない仕組み</h1>
        <Lead>
          共有をやめられず、1つの操作にもまとめられない。そこで初めて「順番に入ってもらう」仕組み ―
          <Term>排他制御</Term>の出番です。教科書に出てくるミューテックスやセマフォが何を保証する道具なのかを押さえたうえで、複数プロセスで動くWebアプリで実際に使う4つの手段まで降りていきます。
        </Lead>
      </Hero>

      <p>
        <Link href="/language/concurrency-race">競合状態とデータ競合</Link>で見たとおり、壊れるのは<Term>クリティカルセクション</Term>です。排他制御とは、この区間に同時に1つ(あるいはN個)しか入れないようにすることを指します。
      </p>

      <Heading num="01">最初に検討するのは「ロックしない」選択肢</Heading>
      <p>
        ロックは正しく使えば安全ですが、代償があります ―
        待ち時間が生まれ、スループットが落ち、デッドロックの可能性が生じ、テストが難しくなります。そのため実務では次の順で検討します。
      </p>

      <table>
        <thead>
          <tr>
            <th>手段</th>
            <th>考え方</th>
            <th>コスト</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">共有しない</td>
            <td>状態をリクエスト内に閉じる。グローバルなキャッシュをやめる</td>
            <td>ゼロ</td>
          </tr>
          <tr>
            <td className="hl">不変にする</td>
            <td>書き換えず新しい値を作る。履歴を追記していく設計にする</td>
            <td>低(メモリ)</td>
          </tr>
          <tr>
            <td className="hl">アトミック操作</td>
            <td>読み取り・判定・更新を1操作にまとめる</td>
            <td>低</td>
          </tr>
          <tr>
            <td className="hl">楽観ロック</td>
            <td>ぶつからない前提で進み、ぶつかったらやり直す</td>
            <td>中(再試行の実装)</td>
          </tr>
          <tr>
            <td className="hl">悲観ロック</td>
            <td>先に鍵をかけ、他を待たせる</td>
            <td>高(待ち・デッドロック)</td>
          </tr>
        </tbody>
      </table>

      <p>
        下に行くほど強力ですが、下に行くほど遅く・壊れやすくなります。<Term>上から順に、必要になったところで止める</Term>のが原則です。
      </p>

      <Heading num="02">ミューテックスとセマフォ</Heading>
      <p>
        <Term>ミューテックス</Term>は mutual exclusion(相互排他)の略で、「同時に入れるのは1つだけ」を保証する最も基本的な錠前です。使う側は<Term>取得 → 作業 → 解放</Term>の3手順を守ります。
      </p>

      <Analogy label="💡 たとえるなら">
        1つしかないトイレの鍵です。中に人がいれば次の人は待ち、出たら次が入ります。鍵をかけたまま出ていく(解放し忘れる)と、以後誰も入れなくなります ―
        これがロックの解放漏れです。
      </Analogy>

      <pre>
        <code>{`// 例外が出ても必ず解放する ― これを外すと全体が止まる
await mutex.acquire();
try {
  await criticalSection();
} finally {
  mutex.release();
}`}</code>
      </pre>

      <p>
        <Term>セマフォ</Term>は「同時に入れるのはN個まで」を表す仕組みです。内部にカウンタを持ち、取得で減らし解放で増やします。Web開発では排他というより<Term>並列度の上限を決める道具</Term>として使う場面のほうが多く、外部APIへの同時接続を5本までに抑える、といった使い方をします(<Link href="/language/concurrency-patterns">実装パターン</Link>)。
      </p>

      <Heading num="03">読み書きロックとアトミック変数</Heading>
      <p>
        共有データの性質が分かっているなら、より緩い(=速い)手段を選べます。
      </p>

      <table>
        <thead>
          <tr>
            <th>仕組み</th>
            <th>保証</th>
            <th>向いている場面</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">読み書きロック</td>
            <td>読みは同時に何人でも、書きは1人だけ</td>
            <td>読み取りが圧倒的に多い設定キャッシュなど</td>
          </tr>
          <tr>
            <td className="hl">アトミック変数 / CAS</td>
            <td>「今の値がXならYにする」を不可分に実行</td>
            <td>カウンタ、フラグ。ロックより速い</td>
          </tr>
          <tr>
            <td className="hl">スピンロック</td>
            <td>待つ間、他へ譲らずCPUを回して待機</td>
            <td>ロック時間が極端に短いカーネル内部など</td>
          </tr>
        </tbody>
      </table>

      <p>
        <Term>CAS(Compare And Swap)</Term>は「読んだ値から変わっていなければ書き込む」というCPU命令で、後述する楽観ロックと同じ発想です。ロックを取らずに済むため<Term>ノンブロッキング</Term>と呼ばれます。
      </p>

      <Heading num="04">ロックの粒度</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>粗い(全体を1つのロックで守る)</th>
            <th>細かい(対象ごとに分ける)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">実装</td>
            <td>簡単・間違えにくい</td>
            <td>複雑・取り違えやすい</td>
          </tr>
          <tr>
            <td className="hl">性能</td>
            <td>関係ない処理まで待たされる</td>
            <td>並列に進める</td>
          </tr>
          <tr>
            <td className="hl">デッドロック</td>
            <td>起きにくい(1つしか取らない)</td>
            <td>起きやすい(複数取ると順序問題)</td>
          </tr>
        </tbody>
      </table>

      <p>
        原則は<Term>必要な範囲だけを、必要な時間だけ</Term>。ただし細かくしすぎると複数のロックを同時に持つことになり、<Link href="/language/concurrency-deadlock">デッドロック</Link>の温床になります。まず粗く作り、計測して詰まっている箇所だけを細かくするのが安全です。
      </p>

      <Heading num="05">スレッドセーフとは何を約束する言葉か</Heading>
      <p>
        <Term>スレッドセーフ</Term>は「複数の実行単位から同時に呼んでも、内部状態が壊れず正しく動く」という意味です。裏を返せば、そう書かれていないものは同時に呼んではいけません。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>不変</h4>
          <p>作った後に変わらない。誰が同時に読んでも安全で、最も強い保証です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>内部で同期している</h4>
          <p>
            ライブラリ内部でロックを取っています。安全ですが、使う側から待ちが見えません。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>条件付き</h4>
          <p>
            「インスタンスを共有しなければ安全」など。多くのDBクライアントがこの型です。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>スレッドセーフでない</h4>
          <p>
            使う側がロックする責任を負います。共有せず、実行単位ごとに作るのが無難です。
          </p>
        </Card>
      </CardGrid>

      <p>
        なお、部品ひとつひとつが安全でも、組み合わせた処理が安全とは限りません。「安全なMapに対して<code>has()</code>してから<code>set()</code>する」は、その2操作の間に割り込まれるため競合します ―
        守るべき単位は<Term>操作の組み合わせ</Term>です。
      </p>

      <Heading num="06">Webアプリでの現実的な排他 ― 4つの手段</Heading>
      <p>
        ここまでの道具はすべて1プロセス内のものです。プロセスが複数ある本番環境では、全員が共通して見る場所で排他する必要があります。
      </p>

      <DiagramFrame
        slug="language-concurrency-optimistic-pessimistic"
        aspect="640 / 300"
        caption="悲観ロックと楽観ロックの比較。上段の悲観ロックは、Aが行を掴んだ瞬間からBが待たされ、Aの解放後にBが動き出す。待ちは発生するがやり直しは起きない。下段の楽観ロックは、AもBもロックを取らず同時に進み、先に書いたAは成功、あとから書くBはバージョンが変わっているため失敗して読み直す。待ちは発生しないが、競合したぶんだけやり直しが起きる。"
      />

      <h3>① 悲観ロック ― DBの行ロック</h3>
      <p>
        トランザクションの中で<code>SELECT ... FOR UPDATE</code>を使うと、その行は他のトランザクションから更新できなくなります。確実ですが、待ちが発生します。
      </p>

      <pre>
        <code>{`await db.transaction(async (tx) => {
  // この行を掴む。他のトランザクションはここで待たされる
  const [account] = await tx.query(
    "SELECT balance FROM accounts WHERE id = $1 FOR UPDATE",
    [id],
  );
  if (account.balance < amount) throw new InsufficientFunds();
  await tx.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2",
    [amount, id]);
});`}</code>
      </pre>

      <h3>② 楽観ロック ― バージョン列</h3>
      <p>
        ぶつからない前提で更新し、<Term>更新できた行数が0なら誰かに先を越された</Term>と判断してやり直します。待ちが発生しないため、競合が稀なケースに向きます。
      </p>

      <pre>
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

      <p>
        編集画面のように「人間が数分かけて操作する」場面では、その間ずっと行を掴んでおくわけにいかないため楽観ロック一択です(<Link href="/database/transaction">トランザクションと整合性</Link>)。
      </p>

      <h3>③ 分散ロック ― 外部ストアに鍵を置く</h3>
      <p>
        「同じ処理を全インスタンスで1つだけ動かしたい」ときは、共有ストアに鍵を置きます。Redisなら「キーが無ければ作る」操作がアトミックなので、成功した1人だけがロックを得られます。
      </p>

      <Aside label="分散ロックは万能ではない">
        ロックを持ったままプロセスが落ちると、有効期限が切れるまで誰も入れません。逆に期限が短すぎると、処理が終わる前にロックが切れて2人が同時に入ります。分散ロックは「たまに二重実行される」前提で組み、最終的な安全性は<Term>冪等性やDBの一意制約</Term>で担保するのが定石です。
      </Aside>

      <h3>④ 直列化 ― そもそも同時に実行しない</h3>
      <p>
        キーごとに処理を1本のキューに流し込み、同じ対象への操作が並行しないようにする方法です。ロックを持たずに順序を保証できるため、ジョブ処理と相性が良い設計です。
      </p>

      <Heading num="07">ロック中にやってはいけないこと</Heading>
      <p>
        ロックの持ち時間は、そのままシステム全体の待ち時間になります。次の3つは典型的な悪手です。
      </p>

      <Steps>
        <li>
          ロックを持ったまま外部通信する ― 外部APIが5秒詰まれば、待ちの全員が止まる
        </li>
        <li>
          ロックを持ったまま別のロックを取る ― 取得順序が食い違えばデッドロックになる
        </li>
        <li>
          ユーザーの操作を待つ ― 画面で確認ボタンを押すまで行を掴む設計は成立しない
        </li>
      </Steps>

      <p>
        ロック区間には<Term>共有データの読み書きだけ</Term>を置き、時間のかかる処理は外に出す ―
        これがロック設計の基本形です。
      </p>

      <Heading num="まとめ">鍵は最後の手段</Heading>
      <p>
        排他制御は強力ですが、待ち・デッドロック・複雑さという代償を伴います。共有をやめる、不変にする、1操作にまとめる、楽観ロックで済ませる ―
        この順に検討し、それでも必要なときにだけ悲観ロックを使ってください。次は、ロックを使い始めた瞬間に生まれる新しい失敗 ―
        <Link href="/language/concurrency-deadlock">デッドロック</Link>です。
      </p>

      <DocsFooter href="/language/concurrency-lock" />
    </DocsPage>
  );
}
