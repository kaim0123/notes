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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "層に分けて組み立てる",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>層に分けて組み立てる ― ルーターに全部書かない</h1>
        <Lead>
          <Link href="/dev/backend/express">Express</Link>の章では、ルーターの中に処理を直接書いてきました。学習にはそれで十分ですが、実際のアプリでは数十行のハンドラがすぐに数百行になり、テストも再利用もできなくなります。ここでは<Link href="/design/architecture/app/layered">レイヤードアーキテクチャ</Link>や<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ</Link>で学んだ理論を、<strong>実際のディレクトリとコードに落とします</strong>。設計セクションとExpressの章をつなぐ回です。
        </Lead>
      </Hero>

      <Heading num="01">全部ルーターに書くと何が起きるか</Heading>
      <p>まず、素直に書いたコードを見ます。「注文を確定する」という、ごく普通の処理です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
      <p>動きます。しかし、この1つの関数が<strong>4つの異なる関心事</strong>を同時に抱えています。</p>
      <table>
        <thead>
          <tr><th>関心事</th><th>本来の変更理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HTTPの入出力(ステータス、JSON)</td><td>API仕様が変わったとき</td></tr>
          <tr><td className="hl">業務ルール(ゴールド会員は1割引)</td><td>ビジネスの決まりが変わったとき</td></tr>
          <tr><td className="hl">永続化(SQL、テーブル名)</td><td>DBやスキーマを変えたとき</td></tr>
          <tr><td className="hl">外部連携(メール送信)</td><td>メール基盤を変えたとき</td></tr>
        </tbody>
      </table>
      <p>これは<Link href="/design/principles/solid">単一責任の原則</Link>が言う「変更理由が複数ある」状態そのものです。実害は具体的に現れます ― <strong>割引ルールをテストしたいだけなのに、HTTPサーバーとDBを起動しなければならない</strong>。同じ注文処理をバッチや管理画面から呼びたくても、ルーター経由でしか呼べない。DBをPostgreSQLから変えたければ、業務ルールの書かれたファイルを開いて直すことになります。</p>

      <Heading num="02">3つの層に分ける</Heading>
      <p>解決は単純です。関心事ごとにファイルを分け、<strong>層</strong>として役割を固定します。最小構成は3層で足ります。</p>
      <Diagram caption="外側がHTTP、内側が業務ルール。依存は常に内向き">
        <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={480} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={36} y={42} fill="#f2f2f2" fontSize="13">Router / Controller</text>
          <text x={36} y={60} fill="#9a9a9a" fontSize="11">HTTPを読み、値を渡し、結果をJSONとステータスに直す</text>

          <rect x={20} y={90} width={480} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={36} y={112} fill="#f2f2f2" fontSize="13">Service / UseCase</text>
          <text x={36} y={130} fill="#9a9a9a" fontSize="11">業務の手順とルール。HTTPもSQLも知らない</text>

          <rect x={20} y={160} width={480} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={36} y={182} fill="#f2f2f2" fontSize="13">Repository</text>
          <text x={36} y={200} fill="#9a9a9a" fontSize="11">永続化。SQLとテーブルの知識をここだけに閉じ込める</text>

          <path d="M255 70 l0 18" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M255 88 l-4 -8 h8 z" fill="#5f5f5f" />
          <path d="M255 140 l0 18" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M255 158 l-4 -8 h8 z" fill="#5f5f5f" />
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>層</th><th>やること</th><th>やらないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Router</td><td><code>req</code>から値を取り出す。結果をステータス+JSONにする</td><td>業務判断、SQL</td></tr>
          <tr><td className="hl">Service(UseCase)</td><td>手順の組み立て、業務ルールの適用、トランザクション境界</td><td><code>req</code>/<code>res</code>に触れる、SQLを書く</td></tr>
          <tr><td className="hl">Repository</td><td>SQLの発行、行をオブジェクトへ変換</td><td>業務判断</td></tr>
        </tbody>
      </table>
      <p>判定基準は簡単です。<strong>Serviceの中に<code>req</code>や<code>res</code>、<code>status</code>が出てきたら層が漏れています。</strong>同様に、Serviceに<code>SELECT</code>が出てきたらRepositoryの仕事が漏れています。</p>

      <Heading num="03">依存の向き ― 内側は外側を知らない</Heading>
      <p>層を分けるだけでは半分です。決定的に重要なのは<strong>依存の向き</strong>で、これは常に<Term>外側から内側へ</Term>の一方向でなければなりません。</p>
      <p>Routerは Service を知っていてよい。Service は Router を知ってはいけない。この一方通行があるからこそ、Service を HTTP 以外(バッチ、CLI、キューのワーカー)からも呼べるようになります。</p>
      <p>ここで問題が起きます。Service は業務の手順として「保存する」必要がありますが、保存は Repository ― つまり<strong>より外側の、DBに近い都合</strong>です。素直に書くと内側が外側に依存してしまいます。これを解くのが<Link href="/design/principles/solid">依存関係逆転の原則</Link>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// domain/order-repository.ts ― 「インターフェースは内側に置く」
// 業務側が「こういう保存機能が欲しい」と要求する形で宣言する
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
  // ...
}`}</code>
      </pre>
      <p>インターフェースを<strong>使う側(内側)に置く</strong>のがこの手法の要点です。こうすると、コンパイル時の依存は「外側の実装 → 内側のインターフェース」となり、内向きの一方通行が保たれます。実行時には外側の具体クラスが注入されますが、内側のコードはその存在を知りません。</p>

      <Heading num="04">書き直してみる</Heading>
      <p>冒頭のコードを3層に分けます。まずRepository ― SQLはここだけに閉じます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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

    // ここが「業務ルール」。HTTPもSQLも登場しない
    const order = Order.place(user, lines, input.items);

    await this.orders.save(order);
    await this.notifier.orderPlaced(user, order);
    return order;
  }
}`}</code>
      </pre>
      <p>そしてRouterは、<strong>翻訳だけ</strong>を担当します。HTTPという外界の言葉を、業務の言葉に直して渡し、返ってきたものをHTTPに戻します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// interface/http/order-router.ts
router.post("/orders", async (req, res, next) => {
  try {
    // 1. 入り口で検証し、信頼できる形にする
    const input = PlaceOrderSchema.parse(req.body);
    // 2. 業務に委ねる
    const order = await placeOrder.execute(input);
    // 3. HTTPの言葉に戻す
    res.status(201).json(toOrderResponse(order));
  } catch (err) {
    next(err);   // 変換は共通のエラーハンドラに任せる
  }
});`}</code>
      </pre>
      <p>ルーターが10行になりました。分量が減ったこと以上に重要なのは、<strong>この関数を読めばAPIの仕様が分かり、業務ルールを知りたければ<code>PlaceOrder</code>だけを読めばよい</strong>という点です。</p>

      <Heading num="05">エラーの扱い ― 層をまたぐときに翻訳する</Heading>
      <p>層を分けると、必ず「Serviceの中で404を返したい」という誘惑が生まれます。しかしServiceはHTTPを知らないので、ステータスコードを返せません。</p>
      <p>正しい形は、<strong>内側は業務の言葉で例外を投げ、外側がHTTPに翻訳する</strong>ことです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// domain/errors.ts ― 業務の語彙で定義する
export class NotFoundError extends Error {}
export class OutOfStockError extends Error {}
export class PermissionError extends Error {}

// interface/http/error-handler.ts ― ここで初めてHTTPになる
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError)    return res.status(404).json({ code: "not_found" });
  if (err instanceof OutOfStockError)  return res.status(409).json({ code: "out_of_stock" });
  if (err instanceof PermissionError)  return res.status(403).json({ code: "forbidden" });
  logger.error({ err }, "unhandled");
  res.status(500).json({ code: "internal_error" });
});`}</code>
      </pre>
      <p>対応表が1箇所に集まるため、<Link href="/dev/backend/express/design">API設計</Link>で決めたエラー形式との整合も取りやすくなります。<Link href="/dev/backend/express/error">エラーハンドリング</Link>で見た「投げて、出口で受ける」を、層の境界に適用した形です。</p>

      <Heading num="06">ドメインモデルをどこまで作るか</Heading>
      <p>上の例で<code>Order.place(...)</code>と書きました。ここが分岐点です。業務ルールを<strong>Serviceの手続きとして書く</strong>か、<strong>ドメインオブジェクトの中に持たせる</strong>かで、設計の性格が変わります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>業務ルールの置き場所</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/design/architecture/app/domain-model">トランザクションスクリプト</Link></td><td>Serviceの手続きの中</td><td>ルールが単純。CRUDが中心</td></tr>
          <tr><td className="hl"><Link href="/design/methodology/ddd/tactical">ドメインモデル</Link></td><td>エンティティ・値オブジェクトの中</td><td>ルールが複雑で、あちこちで使われる</td></tr>
        </tbody>
      </table>
      <p>データを持つだけのクラスにルールが一切無い状態を<Term>ドメインモデル貧血症</Term>と呼びます。ただし<strong>これは常に悪ではありません</strong>。単純なCRUDにドメインモデルを被せると、ただ層が増えるだけです。</p>
      <Aside label="判断の目安">
        「同じ検証ロジックを3箇所で書いた」「この値が不正な状態で存在し得るのが怖い」と感じたときが、ドメインモデルへ移行する合図です。逆に言えば、その兆候が出るまでは Service に手続きとして書いておいて構いません。設計は<strong>後から強くできます</strong>が、最初から強く作りすぎると引き返せません。
      </Aside>

      <Heading num="07">ディレクトリ構成 ― 層で切るか、機能で切るか</Heading>
      <p>ファイルの並べ方には2通りあり、規模で使い分けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# A. 層で切る(小〜中規模。層の存在が一目で分かる)
src/
├─ interface/http/     ルーター・DTO変換
├─ application/        ユースケース
├─ domain/             エンティティ・リポジトリのインターフェース
└─ infra/              DB実装・メール実装

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
      <p>Aは層の規律が保ちやすい反面、1つの機能を直すのに4つのディレクトリを行き来します。Bは<strong>変更が1ディレクトリに閉じる</strong>のが利点で、機能が増えても迷いません。この「機能ごとに閉じる」という発想を極めたものが<Link href="/design/architecture/sys/modular-monolith">モジュラーモノリス</Link>で、将来<Link href="/design/architecture/sys/microservices">マイクロサービス</Link>へ切り出すときの境界にもそのままなります。</p>
      <p>どちらでも、<strong>層の依存規則は変わりません</strong>。Bの構成でも<code>order-router.ts</code>が<code>order-repository-pg.ts</code>を直接呼んではいけません。<code>eslint-plugin-boundaries</code>のようなツールで、この依存規則をCIで機械的に守らせることもできます。</p>

      <Heading num="08">依存の注入 ― コンテナは要るか</Heading>
      <p>各層の部品は「使う相手を自分で作らず、外から受け取る」形にします(<Term>依存性の注入</Term>)。JavaScriptでは、大げさなDIコンテナを入れなくても<strong>コンストラクタ引数で渡すだけ</strong>で十分です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// composition-root.ts ― 組み立てはアプリの起動時、1箇所だけで行う
const pool = new Pool({ connectionString: env.DATABASE_URL });

const users    = new PgUserRepository(pool);
const products = new PgProductRepository(pool);
const orders   = new PgOrderRepository(pool);
const notifier = new SesNotifier(sesClient);

export const placeOrder = new PlaceOrder(users, products, orders, notifier);`}</code>
      </pre>
      <p>この「組み立て専用の場所」を<Term>合成ルート</Term>と呼びます。テストでは同じ場所を差し替え、DBの代わりにメモリ実装、メールの代わりに記録するだけの偽物を渡します。<strong>DBもSMTPも要らずに業務ルールをテストできる</strong> ― これが層を分けた最大の見返りです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`test("ゴールド会員は10%引きになる", async () => {
  const placeOrder = new PlaceOrder(
    new InMemoryUserRepository([goldUser]),
    new InMemoryProductRepository([product1000yen]),
    new InMemoryOrderRepository(),
    new NullNotifier(),
  );

  const order = await placeOrder.execute({ userId: goldUser.id, items: [{ id: "p1", qty: 1 }] });

  expect(order.total).toBe(900);   // HTTPもDBも起動していない
});`}</code>
      </pre>

      <Heading num="09">やりすぎない ― 層は目的ではない</Heading>
      <p>最後に釘を刺しておきます。層は<strong>変更を局所化するための手段</strong>であって、増やすほど良いものではありません。</p>
      <table>
        <thead>
          <tr><th>兆候</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">各層が引数をそのまま次へ渡すだけ</td><td>その層は仕事をしていない。削る候補</td></tr>
          <tr><td className="hl">同じ形のクラスが層の数だけある(DTOの山)</td><td>変換コストが利益を上回っている</td></tr>
          <tr><td className="hl">1行直すのに5ファイル開く</td><td>切り方が実際の変更の形と合っていない</td></tr>
          <tr><td className="hl">実装が1つしかないインターフェースだらけ</td><td>差し替える予定が無いなら不要</td></tr>
        </tbody>
      </table>
      <p>管理画面のような単純なCRUDなら、Routerが直接Repositoryを呼んで構いません。<strong>業務ルールがある処理にだけService層を置く</strong>という混在は、現実的で健全な判断です。</p>

      <Analogy label="💡 たとえるなら">
        層に分けるのは、飲食店の厨房とホールを分けることです。ホール係(Router)は注文を聞いて伝票に直し、料理を運びます。料理人(Service)はレシピに従って作りますが、客席の様子は知りません ― だから同じ料理を、店内でもテイクアウトでも出前でも作れます。食材の仕入れ(Repository)を市場から業者に変えても、レシピは書き換わりません。一方、コップに水を注ぐだけの仕事に伝票を回すのは無駄です。分業は、工程が複雑なときにだけ利益を生みます。
      </Analogy>

      <Heading num="まとめ">関心事で分け、依存を内向きにする</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3層で足りる</h4><p>Routerは翻訳、Serviceは業務、RepositoryはSQL。ServiceにreqもSELECTも出さない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>インターフェースは内側に置く</h4><p>業務側が要求し、外側が実装する。これで依存が内向きの一方通行になる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>見返りはテスト容易性</h4><p>DBもHTTPも起動せずに業務ルールを検証できる。これが層を分ける実利。</p></Card>
      </CardGrid>
      <p>層が決まると、次に問題になるのが「Repositoryをまたぐ処理をどう1つにまとめるか」です。<Link href="/dev/backend/data/transaction">トランザクション境界</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ</RelatedLink>
            <RelatedLink href="/design/methodology/ddd/tactical" tag="設計">戦術的DDDをコードに書く</RelatedLink>
            <RelatedLink href="/design/architecture/app/data-access/patterns" tag="設計">永続化層の定石</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
