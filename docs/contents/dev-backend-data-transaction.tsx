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
  title: "トランザクション境界",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; データ層</Eyebrow>
        <h1>トランザクション境界 ― どこからどこまでを1つにするか</h1>
        <Lead>
          <Link href="/database/transaction">トランザクションと整合性</Link>で、ACIDと分離レベルという理論を見ました。ここで扱うのは、その理論を<strong>アプリケーションのコードのどこに書くか</strong>です。<Link href="/dev/backend/layers">層に分けて組み立てる</Link>でRepositoryを分けた結果、「2つのRepositoryへの書き込みを1つにまとめたい」という問題が必ず現れます。境界の置き場所を間違えると、途中まで書けた壊れたデータが本番に残ります。
        </Lead>
      </Hero>

      <Heading num="01">境界が無いと何が起きるか</Heading>
      <p>注文を保存し、在庫を減らす ― この2つを別々に実行するコードを考えます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`await this.orders.save(order);       // 成功
await this.products.decreaseStock(items); // ← ここで例外が起きたら?`}</code>
      </pre>
      <p>注文だけが記録され、在庫は減らないまま残ります。商品は売れたのに在庫はあることになっている ― <Term>部分的に成功した状態</Term>です。しかも例外はDBの障害だけでなく、プロセスの再起動、タイムアウト、単純なバグでも起こります。</p>
      <p>この2つを<strong>「両方成功するか、両方無かったことになるか」</strong>のどちらかに強制するのがトランザクションです。理論としては当たり前でも、Repositoryを分けた設計では「両方が同じトランザクションに乗っている」ことを明示的に作り込む必要があります。</p>

      <Heading num="02">境界はユースケースに置く</Heading>
      <p>結論から言うと、トランザクションの開始と終了は<strong>Service(ユースケース)層</strong>に置きます。理由は、<strong>「どこまでが1つの業務単位か」を知っているのはService層だけ</strong>だからです。</p>
      <table>
        <thead>
          <tr><th>置き場所</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Repositoryのメソッドごと</td><td><strong>✗</strong> 複数のRepositoryをまたげない。1メソッド=1トランザクションに固定されてしまう</td></tr>
          <tr><td className="hl">Service(ユースケース)</td><td><strong>○</strong> 業務単位と一致する。「注文を確定する」が1トランザクション</td></tr>
          <tr><td className="hl">Router / ミドルウェア</td><td><strong>△</strong> 一律に張れて楽だが、外部API呼び出しまで巻き込みやすい</td></tr>
        </tbody>
      </table>
      <Aside label="1リクエスト=1トランザクションの罠">
        ミドルウェアで全リクエストをトランザクションで包む手法は手軽ですが、<strong>読み取りだけのAPIでも接続を占有し</strong>、後述する「外部API呼び出しを巻き込む」問題も避けられません。明示的に必要な箇所だけ張るほうが安全です。
      </Aside>

      <Heading num="03">実装 ― 同じ接続を使い回す</Heading>
      <p>技術的な要点は1つだけです。<strong>トランザクションは接続に紐づく</strong>ため、同じトランザクションに乗せたいクエリは<strong>すべて同じ接続で実行する</strong>必要があります。プールから別々に接続を取ってしまうと、それは別のトランザクションです。</p>
      <p>最も素直なのは、Service層でトランザクションを開始し、その中の実行環境をRepositoryへ渡す<strong>コールバック方式</strong>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// infra/unit-of-work.ts ― トランザクションの開始・終了をここに閉じ込める
export class PgUnitOfWork implements UnitOfWork {
  constructor(private readonly pool: Pool) {}

  async run<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();   // 1本の接続を確保
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
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
      <p>ORMを使う場合も考え方は同じです。Prismaの<code>$transaction</code>、TypeORMの<code>transaction</code>、Drizzleの<code>db.transaction</code>は、いずれも<strong>コールバック内で使うべき専用のクライアント</strong>を渡してきます。うっかり外側のクライアントを使うと、そのクエリだけトランザクションの外で実行されます。</p>
      <Aside label="引数で渡したくない場合">
        全メソッドに<code>tx</code>を足すのが煩わしい場合、Node.jsの<code>AsyncLocalStorage</code>で「いま実行中のトランザクション」を暗黙に持ち回る手法があります。コードは綺麗になりますが、<strong>どのクエリがどのトランザクションに属するかがコードから見えなくなる</strong>代償があります。規模と好みで選んでください。
      </Aside>

      <Heading num="04">同時実行の競合 ― 楽観ロックと悲観ロック</Heading>
      <p>トランザクションを張っても、<strong>「読んで、判断して、書く」の間に他の人が書き換える</strong>問題は残ります。在庫を読んで「1個ある」と判断した直後、別のリクエストが同じ1個を買う ― 古典的な競合状態です。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>やり方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>悲観ロック</Term></td><td>読む時点で行をロックする(<code>SELECT ... FOR UPDATE</code>)</td><td>競合が頻繁。在庫や残高など、失敗させたくない処理</td></tr>
          <tr><td className="hl"><Term>楽観ロック</Term></td><td><code>version</code>列を持ち、更新時に一致を条件にする</td><td>競合が稀。画面での編集など、衝突時にやり直しが効く処理</td></tr>
          <tr><td className="hl">DBに任せる</td><td><code>UPDATE ... SET stock = stock - 1 WHERE stock &gt;= 1</code></td><td>単純な増減。<strong>読まずに1文で済むなら最も安全</strong></td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`-- 楽観ロック: 読んだときの version と一致する場合だけ更新する
UPDATE orders
   SET status = 'shipped', version = version + 1
 WHERE id = $1 AND version = $2;
-- 更新件数が 0 なら、他の誰かが先に更新した → 競合として扱う`}</code>
      </pre>
      <p>楽観ロックでは、更新件数が0だったときに<code>ConflictError</code>を投げ、<Link href="/dev/backend/layers">エラー変換</Link>で<code>409 Conflict</code>として返すのが定石です。利用者には「他の人が更新しました。再読み込みしてください」と伝えます。</p>

      <Heading num="05">分離レベルは意識して選ぶ</Heading>
      <p><Link href="/database/transaction">分離レベル</Link>の既定値はDBによって違います ― PostgreSQLとOracleは<code>READ COMMITTED</code>、MySQL(InnoDB)は<code>REPEATABLE READ</code>です。<strong>「同じコードがDBを変えると挙動を変える」</strong>ことを知っておく必要があります。</p>
      <p>実務では、既定値のまま進めて競合が問題になった箇所だけを引き上げます。<code>SERIALIZABLE</code>まで上げると多くの異常は消えますが、代わりに<strong>シリアライズ失敗の例外が日常的に発生する</strong>ようになり、アプリ側での再試行が必須になります。</p>

      <Heading num="06">トランザクションの中でやってはいけないこと</Heading>
      <p>ここが実務で最も事故を生む点です。<strong>トランザクションは、開いている間ずっとDBの接続とロックを占有します。</strong></p>
      <table>
        <thead>
          <tr><th>やってはいけないこと</th><th>何が起きるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">外部APIの呼び出し</td><td>相手が3秒応答しなければ、3秒間ロックを握り続ける。相手の障害が自DBの障害になる</td></tr>
          <tr><td className="hl">メール送信・通知</td><td>同上。しかも<strong>ロールバックしてもメールは取り消せない</strong></td></tr>
          <tr><td className="hl">ファイルのアップロード</td><td>数十秒の占有。接続プールが枯渇する</td></tr>
          <tr><td className="hl">大量データのループ処理</td><td>ロックの範囲と時間が広がり、デッドロックの温床になる</td></tr>
          <tr><td className="hl">利用者の入力待ち</td><td>論外。人間の応答速度でDBを占有することになる</td></tr>
        </tbody>
      </table>
      <p>原則は<strong>「トランザクションは短く、DBの操作だけ」</strong>です。副作用のある外部への通知は、コミット後に行います。</p>
      <Aside label="コミット後に確実に通知したい ― Outboxパターン">
        「コミット後に送る」では、コミット直後にプロセスが落ちると通知が失われます。確実性が要る場合は<Term>Outboxパターン</Term>を使います ― 送りたいメッセージを<strong>同じトランザクションの中で<code>outbox</code>テーブルに書き</strong>、別のワーカーがそれを読んで送信する。DBの整合性と外部送信を、1つのコミットで結びつける手法です。<Link href="/database/distributed-transactions/saga">Saga</Link>や<Link href="/dev/backend/jobs">ジョブキュー</Link>と組み合わせて使います。
      </Aside>

      <Heading num="07">再試行 ― 失敗は起こる前提で書く</Heading>
      <p>デッドロックやシリアライズ失敗は、バグではなく<strong>正常な運用の一部</strong>です。DBは競合を検出すると片方を中断させますが、これは「もう一度やれば成功する」種類の失敗です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`async function withRetry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let i = 0; ; i++) {
    try {
      return await fn();
    } catch (err) {
      // 40001: シリアライズ失敗 / 40P01: デッドロック検出 (PostgreSQL)
      const retryable = err.code === "40001" || err.code === "40P01";
      if (!retryable || i >= max) throw err;
      await sleep(50 * 2 ** i + Math.random() * 50);  // 指数バックオフ
    }
  }
}`}</code>
      </pre>
      <p>再試行が安全なのは、<strong>その処理が<Term>冪等</Term>である</strong>ときだけです。トランザクション全体がロールバックされているなら再実行して問題ありませんが、途中でメールを送っていれば2通届きます。前節の原則がここでも効いてきます。</p>

      <Heading num="08">1つのDBに収まらなくなったら</Heading>
      <p>ここまでは「1つのデータベース」が前提でした。サービスを分割し、注文と在庫が別々のDBになった瞬間、<strong>この単純なトランザクションは使えなくなります</strong>。</p>
      <p>その先の選択肢は<Link href="/database/distributed-transactions/saga">Saga</Link>(補償処理で打ち消す)や<Link href="/database/distributed-transactions/tcc">TCC</Link>(仮押さえしてから確定する)です。ただしどちらも、強い一貫性を捨てて<strong>結果整合性</strong>を受け入れる設計になります。<strong>1つのDBで済むうちは、素直にトランザクションを使うのが最も安く確実です</strong> ― 分割は、それができなくなってからの手段です。</p>

      <Analogy label="💡 たとえるなら">
        トランザクションは、銀行の窓口で行う一連の手続きです。「口座から引き出して、別の口座へ入れる」の途中で席を立たれては困るので、手続きが終わるまで窓口は他の客に使わせません。だからこそ、その窓口で<strong>取引先に電話をかけて返事を待つ</strong>のは最悪の行為です ― 電話が繋がるまでの数分間、他の客全員が待たされます。電話は手続きを終え、窓口を空けてからかけるべきなのです。
      </Analogy>

      <Heading num="まとめ">短く、DBだけ、業務単位で</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>境界はユースケース</h4><p>「何が1つの業務単位か」を知るのはService層。Repository単位では跨げない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>同じ接続に乗せる</h4><p>トランザクションは接続に紐づく。txを渡し忘れたクエリは外で実行される。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>外部呼び出しを入れない</h4><p>相手の遅さが自DBの障害になる。通知はコミット後、確実性が要るならOutboxで。</p></Card>
      </CardGrid>
      <p>次は、そのトランザクションが載る<strong>接続そのもの</strong>と、クエリの発行回数の話です。<Link href="/dev/backend/data/pool">コネクションプールとN+1</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
            <RelatedLink href="/database/distributed-transactions/saga" tag="データベース">Saga</RelatedLink>
            <RelatedLink href="/dev/backend/layers" tag="バックエンド">層に分けて組み立てる</RelatedLink>
            <RelatedLink href="/dev/concurrency/lock" tag="実装">排他制御</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
