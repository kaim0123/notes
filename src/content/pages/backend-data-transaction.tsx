import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "トランザクション境界" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>トランザクション境界 ― どこからどこまでを1つにするか</h1>
        <Lead>
          <Link href="/database/transaction">トランザクションと整合性</Link>でACIDと分離レベルという理論を見ました。ここで扱うのは、それを<Term>コードのどこに書くか</Term>です。<Link href="/backend/layers">リポジトリを分けた</Link>結果、「2つの書き込みを1つにまとめたい」という問題が必ず現れます。境界の置き場所を間違えると、途中まで書けた壊れたデータが本番に残ります。
        </Lead>
      </Hero>

      <Heading num="01">境界が無いと何が起きるか</Heading>
      <p>
        注文を保存し、在庫を減らす ― この2つを別々に実行するコードを考えます。
      </p>

      <pre>
        <code>{`await this.orders.save(order);              // 成功
await this.products.decreaseStock(items);  // ← ここで例外が起きたら?`}</code>
      </pre>

      <p>
        注文だけが記録され、在庫は減らないまま残ります。商品は売れたのに在庫はあることになっている ― <Term>部分的に成功した状態</Term>です。しかも例外はデータベースの障害だけでなく、プロセスの再起動、タイムアウト、単純なバグでも起こります。
      </p>
      <p>
        この2つを<Term>両方成功するか、両方無かったことになるか</Term>のどちらかに強制するのがトランザクションです。理論としては当たり前でも、リポジトリを分けた設計では「両方が同じトランザクションに乗っている」ことを明示的に作り込む必要があります。
      </p>

      <Heading num="02">境界はユースケースに置く</Heading>
      <p>
        開始と終了はService層に置きます。理由は、<Term>どこまでが1つの業務単位かを知っているのはService層だけ</Term>だからです。
      </p>

      <table>
        <thead>
          <tr><th>置き場所</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リポジトリのメソッドごと</td><td><strong>✗</strong> 複数のリポジトリをまたげない</td></tr>
          <tr><td className="hl">Service(ユースケース)</td><td><strong>○</strong> 業務単位と一致する。「注文を確定する」が1つ</td></tr>
          <tr><td className="hl">ルーター / ミドルウェア</td><td><strong>△</strong> 一律に張れて楽だが、外部呼び出しまで巻き込みやすい</td></tr>
        </tbody>
      </table>

      <Aside label="1リクエスト＝1トランザクションの罠">
        ミドルウェアで全リクエストを包む手法は手軽ですが、<Term>読み取りだけのAPIでも接続を占有し</Term>、後述する「外部呼び出しを巻き込む」問題も避けられません。必要な箇所だけ明示的に張るほうが安全です。
      </Aside>

      <Heading num="03">同じ接続を使い回す</Heading>
      <p>
        技術的な要点は1つです。<Term>トランザクションは接続に紐づく</Term>ため、同じトランザクションに乗せたいクエリは<Term>すべて同じ接続で実行する</Term>必要があります。プールから別々に接続を取ってしまえば、それは別のトランザクションです。
      </p>

      <pre>
        <code>{`// infra/unit-of-work.ts ― 開始と終了をここに閉じ込める
export class PgUnitOfWork implements UnitOfWork {
  constructor(private readonly pool: Pool) {}

  async run<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();   // 1本の接続を確保する
    try {
      await client.query("BEGIN");
      const result = await fn(client);          // この中は全部同じ接続
      await client.query("COMMIT");
      return result;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();                          // 必ずプールへ返す
    }
  }
}`}</code>
      </pre>

      <pre>
        <code>{`// application/place-order.ts ― 業務単位を明示する
async execute(input: PlaceOrderInput): Promise<Order> {
  const order = await this.uow.run(async (tx) => {
    const products = await this.products.findMany(input.items, tx);
    const order = Order.place(user, products, input.items);

    await this.orders.save(order, tx);
    await this.products.decreaseStock(input.items, tx);
    return order;
  });

  // 確定した「後」に通知する(理由は06節)
  await this.notifier.orderPlaced(user, order);
  return order;
}`}</code>
      </pre>

      <p>
        ORMを使う場合も同じです。いずれも<Term>コールバックの中で使うべき専用のクライアント</Term>を渡してきます。うっかり外側のものを使うと、そのクエリだけがトランザクションの外で実行されます ― <Term>エラーにならず、静かに外れる</Term>のが厄介なところです。
      </p>

      <Heading num="04">読んで、判断して、書くの間</Heading>
      <p>
        トランザクションを張っても、<Term>読んでから書くまでの間に他の人が書き換える</Term>問題は残ります。在庫を読んで「1個ある」と判断した直後、別のリクエストが同じ1個を買う ― 古典的な競合です。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>やり方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>悲観ロック</Term></td><td>読む時点で行をロックする</td><td>競合が頻繁。在庫や残高など、失敗させたくない処理</td></tr>
          <tr><td className="hl"><Term>楽観ロック</Term></td><td>版数の列を持ち、更新時に一致を条件にする</td><td>競合が稀。画面での編集など、やり直しが効く処理</td></tr>
          <tr><td className="hl">1文に畳む</td><td><code>SET stock = stock - 1 WHERE stock &gt;= 1</code></td><td>単純な増減。<strong>読まずに済むなら最も安全</strong></td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`-- 楽観ロック: 読んだときの version と一致する場合だけ更新する
UPDATE orders
   SET status = 'shipped', version = version + 1
 WHERE id = $1 AND version = $2;
-- 更新件数が 0 なら、他の誰かが先に更新した → 競合として扱う`}</code>
      </pre>

      <p>
        更新件数が0だったときは競合として例外を投げ、<Link href="/backend/layers">層の境界での変換</Link>で<code>409</code>として返すのが定石です。利用者には「他の人が更新しました。読み直してください」と伝えます。
      </p>

      <Heading num="05">分離レベルの既定値はデータベースごとに違う</Heading>
      <p>
        <Link href="/database/transaction">分離レベル</Link>の既定値は製品によって異なります。<Term>同じコードが、データベースを変えると挙動を変える</Term>ということです。
      </p>
      <p>
        実務では既定値のまま進めて、競合が問題になった箇所だけを引き上げます。最も強い水準まで上げると多くの異常は消えますが、代わりに<Term>直列化の失敗が日常的に起きる</Term>ようになり、アプリ側での再試行が必須になります。
      </p>

      <Heading num="06">トランザクションの中でやってはいけないこと</Heading>
      <p>
        ここが実務で最も事故を生む点です。<Term>トランザクションは、開いている間ずっと接続とロックを占有します</Term>。
      </p>

      <DiagramFrame
        slug="backend-data-tx-boundary"
        aspect="640 / 320"
        caption="トランザクションの中に何を入れるかで占有時間がどれだけ変わるかを比べた図。上段は通知を中に入れた場合で、外部の相手次第で数秒かかるメール送信のせいで枠が大きく右へ伸び、その間ずっと接続とロックを握り続ける。しかも巻き戻しても送ってしまったメールは取り消せない。下段は通知を外に出した場合で、枠は保存と減算だけの短いものになり、確定したあとで通知を行う。占有時間が短くなるだけでなく、外部の障害が自分のデータベースの障害にならなくなる。下部には、確実に通知したい場合の方法として、送りたい内容を同じトランザクションで別のテーブルに書いておき、別のワーカーがそれを読んで送る手順が添えられている。"
      />

      <table>
        <thead>
          <tr><th>やってはいけないこと</th><th>何が起きるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">外部APIの呼び出し</td><td>相手が3秒応答しなければ、3秒間ロックを握る</td></tr>
          <tr><td className="hl">メール送信・通知</td><td>同上。しかも<strong>巻き戻してもメールは取り消せない</strong></td></tr>
          <tr><td className="hl">ファイルのアップロード</td><td>数十秒の占有。接続プールが枯渇する</td></tr>
          <tr><td className="hl">大量データのループ処理</td><td>ロックの範囲と時間が広がり、デッドロックの温床になる</td></tr>
          <tr><td className="hl">利用者の入力待ち</td><td>人間の応答速度でデータベースを占有することになる</td></tr>
        </tbody>
      </table>

      <p>
        原則は<Term>トランザクションは短く、データベースの操作だけ</Term>です。
      </p>

      <Aside label="確実に通知したいとき">
        「確定後に送る」では、その直後にプロセスが落ちると通知が失われます。確実性が要る場合は、送りたい内容を<Term>同じトランザクションの中で専用のテーブルに書き</Term>、別のワーカーがそれを読んで送ります。データベースの整合性と外部への送信を、1つの確定で結びつける手法です。<Link href="/backend/jobs">ジョブキュー</Link>や<Link href="/database/distributed-transactions">Saga</Link>と組み合わせて使います。
      </Aside>

      <Heading num="07">失敗は起こる前提で書く</Heading>
      <p>
        デッドロックや直列化の失敗は、バグではなく<Term>正常な運用の一部</Term>です。データベースは競合を検出すると片方を中断させますが、これは「もう一度やれば成功する」種類の失敗です。
      </p>

      <pre>
        <code>{`async function withRetry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let i = 0; ; i++) {
    try {
      return await fn();
    } catch (err) {
      // 40001: 直列化の失敗 / 40P01: デッドロック検出
      const retryable = err.code === "40001" || err.code === "40P01";
      if (!retryable || i >= max) throw err;
      await sleep(50 * 2 ** i + Math.random() * 50);  // 間隔を空けて再試行
    }
  }
}`}</code>
      </pre>

      <p>
        再試行が安全なのは、<Term>その処理が冪等であるときだけ</Term>です。全体が巻き戻っているなら再実行して構いませんが、途中でメールを送っていれば2通届きます。前節の原則がここでも効いてきます。
      </p>

      <Heading num="08">1つのデータベースに収まらなくなったら</Heading>
      <p>
        ここまでは「1つのデータベース」が前提でした。サービスを分割し、注文と在庫が別々になった瞬間、<Term>この単純なトランザクションは使えなくなります</Term>。
      </p>
      <p>
        その先の選択肢は<Link href="/database/distributed-transactions">補償処理で打ち消す方式や、仮押さえしてから確定する方式</Link>です。ただしどちらも、強い一貫性を捨てて結果整合性を受け入れる設計になります。<Term>1つのデータベースで済むうちは、素直にトランザクションを使うのが最も安く確実です</Term> ― 分割は、それができなくなってからの手段です。
      </p>

      <Analogy label="💡 たとえるなら">
        銀行の窓口で行う一連の手続きです。「口座から引き出して、別の口座へ入れる」の途中で席を立たれては困るので、終わるまで窓口は他の客に使わせません。だからこそ、その窓口で<Term>取引先に電話をかけて返事を待つ</Term>のは最悪の行為です ― 繋がるまでの数分間、他の客全員が待たされます。電話は手続きを終え、窓口を空けてからかけるべきです。
      </Analogy>

      <Heading num="まとめ">短く、データベースだけ、業務単位で</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>境界はユースケース</h4>
          <p>何が1つの業務単位かを知るのはService層。リポジトリ単位ではまたげない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>同じ接続に乗せる</h4>
          <p>渡し忘れたクエリは、エラーにならず静かに外で実行される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>外部呼び出しを入れない</h4>
          <p>相手の遅さが自分の障害になる。通知は確定後、確実性が要るなら書いてから送る。</p>
        </Card>
      </CardGrid>

      <p>
        次は、そのトランザクションが載る<Term>接続そのもの</Term>と、クエリの発行回数の話です。<Link href="/backend/data-pool">コネクションプールとN+1</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/data-transaction" />
    </DocsPage>
  );
}
