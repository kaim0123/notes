import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "アプリケーションの組み立て" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>アプリケーションの組み立て ― ルーターに全部書かない</h1>
        <Lead>
          窓口の形が決まったら、次は<Term>受けた依頼をコードの中でどう配るか</Term>です。数十行のハンドラはすぐ数百行になり、テストも再利用もできなくなります。ここでは<Link href="/design/architecture-app-layered">レイヤードアーキテクチャ</Link>や<Link href="/design/architecture-app-domain-centric">ドメイン中心アーキテクチャ</Link>で学んだ理論を、<Term>実際のディレクトリとコードに落とします</Term>。
        </Lead>
      </Hero>

      <Heading num="01">全部ルーターに書くと何が起きるか</Heading>
      <p>
        まず、素直に書いたコードを見ます。「注文を確定する」という、ごく普通の処理です。
      </p>

      <pre>
        <code>{`router.post("/orders", async (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !items?.length) return res.status(400).json({ error: "invalid" });

  const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
  if (!user.rows[0]) return res.status(404).json({ error: "user not found" });

  let total = 0;
  for (const item of items) {
    const p = await db.query("SELECT * FROM products WHERE id = $1", [item.id]);
    if (p.rows[0].stock < item.qty) return res.status(409).json({ error: "out of stock" });
    total += p.rows[0].price * item.qty;
  }
  if (user.rows[0].rank === "gold") total *= 0.9;   // 業務ルール

  const order = await db.query("INSERT INTO orders ... RETURNING *", [userId, total]);
  await mailer.send(user.rows[0].email, "ご注文ありがとうございます");
  res.status(201).json(order.rows[0]);
});`}</code>
      </pre>

      <p>
        動きます。しかしこの1つの関数が、<Term>4つの異なる関心事</Term>を同時に抱えています。
      </p>

      <table>
        <thead>
          <tr><th>関心事</th><th>本来の変更理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HTTPの入出力</td><td>API仕様が変わったとき</td></tr>
          <tr><td className="hl">業務ルール(上位会員は1割引)</td><td>ビジネスの決まりが変わったとき</td></tr>
          <tr><td className="hl">永続化(SQL・テーブル名)</td><td>データベースやスキーマを変えたとき</td></tr>
          <tr><td className="hl">外部連携(メール送信)</td><td>メール基盤を変えたとき</td></tr>
        </tbody>
      </table>

      <p>
        これは<Link href="/design/principles-solid">単一責任の原則</Link>がいう「変更理由が複数ある」状態そのものです。実害は具体的に現れます ― <Term>割引ルールを試したいだけなのに、HTTPサーバーとデータベースを起動しなければならない</Term>。同じ注文処理をバッチや管理画面から呼びたくても、ルーター経由でしか呼べない。
      </p>

      <Heading num="02">3つの層に分ける</Heading>
      <p>
        解決は単純です。関心事ごとにファイルを分け、<Term>層</Term>として役割を固定します。最小構成は3層で足ります。
      </p>

      <DiagramFrame
        slug="backend-layers-3"
        aspect="640 / 380"
        caption="3つの層と依存の向きを示した図。上からRouter、Service、Repositoryの3層が並び、左側に上から下への呼び出しの流れ、右側に依存の向きが描かれる。RouterからServiceへの依存は下向きだが、RepositoryからServiceへは上向きになっている。保存機能のインターフェースをService側つまり内側に置き、外側のRepositoryがそれを実装するためで、依存が常に内向きの一方通行に保たれることを表す。下部には判定の目安として、Serviceの中にreqやresが出てきたらRouterの仕事が漏れていること、SELECTが出てきたらRepositoryの仕事が漏れていることが記されている。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>やること</th><th>やらないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Router</td><td>リクエストから値を取り出し、結果をステータスとJSONにする</td><td>業務判断、SQL</td></tr>
          <tr><td className="hl">Service</td><td>手順の組み立て、業務ルールの適用、<Link href="/backend/data-transaction">トランザクション境界</Link></td><td>HTTPに触れる、SQLを書く</td></tr>
          <tr><td className="hl">Repository</td><td>SQLの発行、行をオブジェクトへ変換</td><td>業務判断</td></tr>
        </tbody>
      </table>

      <Heading num="03">依存の向きは常に内向き</Heading>
      <p>
        層を分けるだけでは半分です。決定的に重要なのは<Term>依存の向き</Term>で、これは常に外側から内側への一方通行でなければなりません。
      </p>
      <p>
        ここで問題が起きます。Serviceは業務の手順として「保存する」必要がありますが、保存はより外側の都合です。素直に書くと内側が外側に依存します。これを解くのが<Link href="/design/principles-solid">依存関係逆転の原則</Link>で、要点は<Term>インターフェースを使う側(内側)に置く</Term>ことです。
      </p>

      <pre>
        <code>{`// domain/order-repository.ts ― 業務側が「こういう保存機能が欲しい」と宣言する
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// infra/order-repository-pg.ts ― 外側が、内側の要求を実装する
export class PgOrderRepository implements OrderRepository {
  constructor(private readonly db: Pool) {}

  async save(order: Order): Promise<void> {
    await this.db.query(
      "INSERT INTO orders (id, user_id, total) VALUES ($1, $2, $3)",
      [order.id, order.userId, order.total],
    );
  }
}`}</code>
      </pre>

      <p>
        こうすると、コード上の依存は「外側の実装 → 内側のインターフェース」となり、内向きの一方通行が保たれます。実行時には外側の具体的な実装が渡されますが、<Term>内側のコードはその存在を知りません</Term>。
      </p>

      <Heading num="04">書き直してみる</Heading>
      <p>
        冒頭のコードを分けます。Serviceには業務の手順だけが残ります。
      </p>

      <pre>
        <code>{`// application/place-order.ts ― 業務の手順そのもの
export class PlaceOrder {
  constructor(
    private readonly users: UserRepository,
    private readonly products: ProductRepository,
    private readonly orders: OrderRepository,
    private readonly notifier: Notifier,   // メールも抽象として受け取る
  ) {}

  async execute(input: PlaceOrderInput): Promise<Order> {
    const user = await this.users.findById(input.userId);
    if (!user) throw new NotFoundError("user");

    const lines = await this.products.findMany(input.items.map((i) => i.id));

    // ここが業務ルール。HTTPもSQLも登場しない
    const order = Order.place(user, lines, input.items);

    await this.orders.save(order);
    await this.notifier.orderPlaced(user, order);
    return order;
  }
}`}</code>
      </pre>

      <p>
        そしてRouterは<Term>翻訳だけ</Term>を担当します。HTTPという外界の言葉を業務の言葉に直して渡し、返ってきたものをHTTPに戻します。
      </p>

      <pre>
        <code>{`// interface/http/order-router.ts
router.post("/orders", async (req, res, next) => {
  try {
    const input = PlaceOrderSchema.parse(req.body);  // 入り口で検証する
    const order = await placeOrder.execute(input);   // 業務に委ねる
    res.status(201).json(toOrderResponse(order));    // HTTPの言葉に戻す
  } catch (err) {
    next(err);   // 変換は共通のエラーハンドラに任せる
  }
});`}</code>
      </pre>

      <p>
        分量が減ったこと以上に重要なのは、<Term>この関数を読めばAPIの仕様が分かり、業務ルールを知りたければ<code>PlaceOrder</code>だけを読めばよい</Term>という点です。
      </p>

      <Heading num="05">エラーは層の境界で翻訳する</Heading>
      <p>
        層を分けると、必ず「Serviceの中で404を返したい」という誘惑が生まれます。しかしServiceはHTTPを知らないので、ステータスコードを返せません。正しい形は、<Term>内側は業務の言葉で例外を投げ、外側がHTTPに翻訳する</Term>ことです。
      </p>

      <pre>
        <code>{`// domain/errors.ts ― 業務の語彙で定義する
export class NotFoundError extends Error {}
export class OutOfStockError extends Error {}
export class PermissionError extends Error {}

// interface/http/error-handler.ts ― ここで初めてHTTPになる
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError)   return res.status(404).json({ code: "not_found" });
  if (err instanceof OutOfStockError) return res.status(409).json({ code: "out_of_stock" });
  if (err instanceof PermissionError) return res.status(403).json({ code: "forbidden" });
  logger.error({ err }, "unhandled");
  res.status(500).json({ code: "internal_error" });
});`}</code>
      </pre>

      <p>
        対応表が1箇所に集まるため、<Link href="/backend/express-design">Expressでの API設計</Link>で決めるエラー形式との整合も取りやすくなります。<Link href="/backend/express-error">エラーハンドリング</Link>の「投げて、出口で受ける」を、層の境界に適用した形です。
      </p>

      <Heading num="06">業務ルールをどこに置くか</Heading>
      <p>
        上の例で<code>Order.place(...)</code>と書きました。ここが分岐点です。業務ルールをServiceの手続きとして書くか、ドメインオブジェクトの中に持たせるかで、設計の性格が変わります。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>ルールの置き場所</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/design/architecture-app-domain-model">トランザクションスクリプト</Link></td><td>Serviceの手続きの中</td><td>ルールが単純。CRUDが中心</td></tr>
          <tr><td className="hl"><Link href="/design/methodology-ddd-tactical">ドメインモデル</Link></td><td>エンティティ・値オブジェクトの中</td><td>ルールが複雑で、あちこちで使われる</td></tr>
        </tbody>
      </table>

      <Aside label="移行の合図">
        データを持つだけでルールが一切無い状態を<Term>ドメインモデル貧血症</Term>と呼びますが、これは常に悪ではありません。単純なCRUDにドメインモデルを被せると、層が増えるだけです。<Term>同じ検証を3箇所で書いた</Term>「この値が不正な状態で存在し得るのが怖い」と感じたときが移行の合図です。設計は後から強くできますが、最初から強く作りすぎると引き返せません。
      </Aside>

      <Heading num="07">ディレクトリは層で切るか、機能で切るか</Heading>
      <pre>
        <code>{`# A. 層で切る(小〜中規模。層の存在が一目で分かる)
src/
├─ interface/http/     ルーター・変換
├─ application/        ユースケース
├─ domain/             エンティティ・リポジトリのインターフェース
└─ infra/              データベース実装・メール実装

# B. 機能で切る(中〜大規模。1機能の全体が1箇所に集まる)
src/
├─ orders/
│  ├─ order-router.ts
│  ├─ place-order.ts
│  ├─ order.ts
│  └─ order-repository-pg.ts
├─ users/
└─ shared/`}</code>
      </pre>

      <p>
        Aは層の規律が保ちやすい反面、1つの機能を直すのに4つのディレクトリを行き来します。Bは<Term>変更が1ディレクトリに閉じる</Term>のが利点です。この発想を極めたものが<Link href="/design/architecture-modular-monolith">モジュラーモノリス</Link>で、将来<Link href="/design/architecture-microservices">マイクロサービス</Link>へ切り出すときの境界にもそのままなります。
      </p>
      <p>
        どちらでも<Term>層の依存規則は変わりません</Term>。Bの構成でもルーターがリポジトリの実装を直接呼んではいけません。この規則は、静的解析のルールとしてCIに機械的に守らせることもできます。
      </p>

      <Heading num="08">組み立ては1箇所で行う</Heading>
      <p>
        各層の部品は「使う相手を自分で作らず、外から受け取る」形にします(<Term>依存性の注入</Term>)。大がかりな仕組みを入れなくても、<Term>コンストラクタの引数で渡すだけ</Term>で十分です。
      </p>

      <pre>
        <code>{`// composition-root.ts ― 組み立てはアプリの起動時、1箇所だけで行う
const pool = new Pool({ connectionString: env.DATABASE_URL });

const users    = new PgUserRepository(pool);
const products = new PgProductRepository(pool);
const orders   = new PgOrderRepository(pool);
const notifier = new SesNotifier(sesClient);

export const placeOrder = new PlaceOrder(users, products, orders, notifier);`}</code>
      </pre>

      <p>
        この組み立て専用の場所を<Term>合成ルート</Term>と呼びます。テストでは同じ場所を差し替え、データベースの代わりにメモリ実装、メールの代わりに記録するだけの偽物を渡します。
      </p>

      <pre>
        <code>{`test("上位会員は10%引きになる", async () => {
  const placeOrder = new PlaceOrder(
    new InMemoryUserRepository([goldUser]),
    new InMemoryProductRepository([product1000yen]),
    new InMemoryOrderRepository(),
    new NullNotifier(),
  );

  const order = await placeOrder.execute({
    userId: goldUser.id,
    items: [{ id: "p1", qty: 1 }],
  });

  expect(order.total).toBe(900);   // HTTPもデータベースも起動していない
});`}</code>
      </pre>

      <p>
        <Term>データベースもメールも要らずに業務ルールを検証できる</Term> ― これが層を分ける最大の見返りです。
      </p>

      <Heading num="09">やりすぎない</Heading>
      <p>
        層は変更を局所化するための手段であって、増やすほど良いものではありません。次の兆候が出たら、切り方が実際の変更の形と合っていません。
      </p>

      <table>
        <thead>
          <tr><th>兆候</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">各層が引数をそのまま次へ渡すだけ</td><td>その層は仕事をしていない。削る候補</td></tr>
          <tr><td className="hl">同じ形のクラスが層の数だけある</td><td>変換のコストが利益を上回っている</td></tr>
          <tr><td className="hl">1行直すのに5ファイル開く</td><td>切り方が変更の形と合っていない</td></tr>
          <tr><td className="hl">実装が1つしかないインターフェースだらけ</td><td>差し替える予定が無いなら不要</td></tr>
        </tbody>
      </table>

      <p>
        管理画面のような単純なCRUDなら、ルーターが直接リポジトリを呼んで構いません。<Term>業務ルールがある処理にだけService層を置く</Term>という混在は、現実的で健全な判断です。
      </p>

      <Heading num="10">配下で扱うこと</Heading>
      <p>
        この骨格の上に、どのアプリにもだいたい出てくる機能が乗ります。いずれも<Term>層のどこに置くか</Term>と<Term>失敗したときにどうするか</Term>が論点になります。
      </p>

      <table>
        <thead>
          <tr><th>ページ</th><th>中心の問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/backend/upload">ファイルアップロード</Link></td><td>大きなデータをサーバーに通すべきか</td></tr>
          <tr><td className="hl"><Link href="/backend/mail">メール送信と通知</Link></td><td>届かないかもしれない処理を、どう本筋から外すか</td></tr>
          <tr><td className="hl"><Link href="/backend/jobs">ジョブキューとワーカー</Link></td><td>いま返さなくてよい処理を、どう後回しにするか</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        層に分けるのは、厨房とホールを分けることです。ホール係は注文を聞いて伝票に直し、料理を運びます。料理人はレシピに従って作りますが客席の様子は知りません ― だから同じ料理を、店内でもテイクアウトでも出前でも作れます。仕入れ先を変えてもレシピは書き換わりません。一方、コップに水を注ぐだけの仕事に伝票を回すのは無駄です。分業は、工程が複雑なときにだけ利益を生みます。
      </Analogy>

      <Heading num="まとめ">関心事で分け、依存を内向きにする</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>3層で足りる</h4>
          <p>Routerは翻訳、Serviceは業務、RepositoryはSQL。混ぜない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>インターフェースは内側に置く</h4>
          <p>業務側が要求し、外側が実装する。これで依存が内向きになる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>見返りはテストのしやすさ</h4>
          <p>何も起動せずに業務ルールを検証できる。これが実利。</p>
        </Card>
      </CardGrid>

      <p>
        まずは、この骨格の上で最も扱いを間違えやすい機能から見ます。<Link href="/backend/upload">ファイルアップロード</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/layers" />
    </DocsPage>
  );
}
