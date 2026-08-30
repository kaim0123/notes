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
  title: "必修イディオムを深く理解する",
};

const codeBlock =
  "overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed";
const badBlock =
  "overflow-x-auto rounded-xl border border-destructive/30 bg-destructive/[0.05] p-4 px-[18px] text-[0.85rem] leading-relaxed";
const goodBlock =
  "overflow-x-auto rounded-xl border border-primary/30 bg-primary/[0.06] p-4 px-[18px] text-[0.85rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 実装パターン・イディオム</Eyebrow>
        <h1>必修イディオムを深く理解する ― 5つの定石を書けるようになる</h1>
        <Lead>
          <Link href="/design/idioms">前ページ</Link>の一覧で<strong>必修</strong>とした5つのイディオム ―
          <Term>Guard Clause</Term>・<Term>Dependency Injection</Term>・<Term>Builder</Term>・
          <Term>Middleware Chain</Term>・<Term>Optional Chaining</Term> ―
          は、言語やフレームワークを問わず現在のアプリ開発で毎日のように登場します。ここでは一覧の1行説明を超えて、
          「なぜそう書くのか」「どんなコードが良くないのか」を、Before/Afterのコードとともに1つずつ掘り下げます。
        </Lead>
      </Hero>

      <Heading num="01">なぜこの5つが必修なのか</Heading>
      <p>
        一覧の中でこの5つだけは、<strong>特定の言語機能に依存せず、書き方の発想そのものが移植可能</strong>である点で共通しています。
        Extension MethodやMixinは対応する言語機能がないと使えませんが、この5つは「早期returnする」「依存を外から渡す」「処理を連鎖させる」といった
        考え方であり、TypeScriptでもJavaでもGoでも形を変えて現れます。だからこそ、どのプロジェクトに配属されても最初に効いてくる基礎体力になります。
      </p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Guard Clause</h4><p>深いネストを、早期returnで平らにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Dependency Injection</h4><p>依存を外から注入し、差し替え・テストを可能にする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Builder</h4><p>複雑な生成を、読めるメソッドチェーンに変える。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Middleware Chain</h4><p>横断的な処理を、小さな関数の連鎖に合成する。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>Optional Chaining</h4><p>null/undefinedを安全にたどる。</p></Card>
      </CardGrid>

      <Heading num="02">Guard Clause ― ネストを早期returnで平らにする</Heading>
      <p>
        <Term>Guard Clause(ガード節)</Term>は、関数の入口で「処理を続けられない条件」を先に潰し、
        早期return・早期例外でその場を離れる書き方です。正常系(=本来やりたい処理)を、ifのネストの奥深くではなく
        関数の一番外側に置けるため、コードが「上から下へ」まっすぐ読めるようになります。
      </p>
      <p>次の2つは同じ処理ですが、左は条件が増えるほど右へ字下がりしていきます。</p>
      <pre className={badBlock}>
        <code>{`// ✗ ネストが深く、正常系が奥に隠れる
function checkout(cart: Cart, user: User | null): Receipt {
  if (user !== null) {
    if (user.isActive) {
      if (cart.items.length > 0) {
        return pay(cart, user); // ← 本命がネスト3段の奥
      } else {
        throw new Error("カートが空です");
      }
    } else {
      throw new Error("無効なユーザーです");
    }
  } else {
    throw new Error("ログインが必要です");
  }
}`}</code>
      </pre>
      <pre className={goodBlock}>
        <code>{`// ✓ 続けられない条件を先に潰す。正常系が一番外に出る
function checkout(cart: Cart, user: User | null): Receipt {
  if (user === null) throw new Error("ログインが必要です");
  if (!user.isActive) throw new Error("無効なユーザーです");
  if (cart.items.length === 0) throw new Error("カートが空です");

  return pay(cart, user); // ← ネストゼロ。ここが主役だと一目で分かる
}`}</code>
      </pre>
      <p>
        ガード節は<Link href="/design/principles/modern">設計原則</Link>の<Term>Fail Fast</Term>(問題は早い段階で失敗させる)を、
        関数レベルで具体化したものでもあります。例外を投げるだけでなく、<code>return</code>で早く抜ける・
        デフォルト値を返すといった形でも使えます。
      </p>
      <Aside label="注意:">
        else節を消すことが目的ではありません。「その先の処理に進む前提が崩れているなら、ここで打ち切る」という意図が明確なときに使います。
        本質的に対等な分岐(Aか、Bか)を無理に早期returnで書くと、かえって読みにくくなります。
      </Aside>

      <Heading num="03">Dependency Injection ― 依存を外から渡す</Heading>
      <p>
        <Term>Dependency Injection(DI / 依存性注入)</Term>は、あるオブジェクトが必要とする他のオブジェクト(依存)を、
        自分の内部で<code>new</code>するのではなく、<strong>外から受け取る</strong>設計です。これにより、本番では実DB、
        テストではモックといった<strong>差し替え</strong>が可能になります。
      </p>
      <pre className={badBlock}>
        <code>{`// ✗ 依存を内部で直接生成 ― テスト時に本物のDBを叩いてしまう
class UserService {
  private repo = new PostgresUserRepository(); // 固定されている

  getName(id: string) {
    return this.repo.findById(id)?.name;
  }
}`}</code>
      </pre>
      <pre className={goodBlock}>
        <code>{`// ✓ 依存をコンストラクタで受け取る(コンストラクタ・インジェクション)
interface UserRepository {
  findById(id: string): User | null;
}

class UserService {
  constructor(private readonly repo: UserRepository) {} // 外から注入

  getName(id: string) {
    return this.repo.findById(id)?.name;
  }
}

// 本番
new UserService(new PostgresUserRepository());
// テスト
new UserService(new InMemoryUserRepository());`}</code>
      </pre>
      <p>
        ポイントは、<code>UserService</code>が<code>PostgresUserRepository</code>という<strong>具体</strong>ではなく、
        <code>UserRepository</code>という<strong>抽象(インターフェース)</strong>に依存していることです。これは
        <Link href="/design/principles/solid">SOLID</Link>の<Term>依存性逆転の原則(DIP)</Term>そのものであり、
        DIはその原則をコードに落とし込む代表的な手段です。SpringやNestJSのDIコンテナは、この「誰に何を注入するか」の配線を自動化してくれる仕組みにすぎません。
      </p>

      <Heading num="04">Builder ― 複雑な生成を読めるチェーンにする</Heading>
      <p>
        引数が多い・省略可能な項目が多いオブジェクトを、位置引数のコンストラクタで組み立てると
        「その<code>true</code>は何の設定だっけ?」という読みにくいコードになります。<Term>Builder</Term>(と、その表現である
        <Term>フルーエントインターフェース</Term>)は、<code>this</code>を返すメソッドを連鎖させ、各設定に名前を付けながら段階的に組み立てます。
      </p>
      <pre className={badBlock}>
        <code>{`// ✗ 位置引数だと、各値の意味が読み取れない
const q = new Query("users", ["id", "name"], "age > 18", "name", 20, true);`}</code>
      </pre>
      <pre className={goodBlock}>
        <code>{`// ✓ 各設定に名前が付き、必要な分だけ書ける
class QueryBuilder {
  private table = "";
  private columns: string[] = ["*"];
  private conditions: string[] = [];
  private limitValue?: number;

  from(table: string): this { this.table = table; return this; }
  select(...cols: string[]): this { this.columns = cols; return this; }
  where(cond: string): this { this.conditions.push(cond); return this; }
  limit(n: number): this { this.limitValue = n; return this; }

  build(): string {
    const where = this.conditions.length ? \` WHERE \${this.conditions.join(" AND ")}\` : "";
    const limit = this.limitValue ? \` LIMIT \${this.limitValue}\` : "";
    return \`SELECT \${this.columns.join(", ")} FROM \${this.table}\${where}\${limit}\`;
  }
}

const sql = new QueryBuilder()
  .from("users")
  .select("id", "name")
  .where("age > 18")
  .limit(20)
  .build();`}</code>
      </pre>
      <p>
        各メソッドが<code>this</code>(戻り値の型も<code>this</code>)を返すのがフルーエントインターフェースの核心です。
        Prisma・Drizzle・TanStack Queryなど、現在のTypeScriptライブラリのAPIは、この形を土台にした型安全なチェーンとして設計されています。
      </p>

      <Heading num="05">Middleware Chain ― 横断的な処理を連鎖に合成する</Heading>
      <p>
        認証・ログ・エラーハンドリングのような「多くのリクエストに共通してかかる処理」を、本体のハンドラに直接書き込むと重複します。
        <Term>Middleware Chain</Term>は、リクエストを受け取り、<strong>次の処理へ渡すか(<code>next</code>)、ここで打ち切るか</strong>を
        各段が判断できる小さな関数の連鎖として、処理を組み立てます。
      </p>
      <pre className={codeBlock}>
        <code>{`type Ctx = { url: string; user?: User };
type Next = () => Response;
type Middleware = (ctx: Ctx, next: Next) => Response;

// 各ミドルウェアは「自分の仕事 → next() で次へ」の形
const logger: Middleware = (ctx, next) => {
  console.log("→", ctx.url);
  const res = next();       // 次の段へ委譲
  console.log("←", res.status);
  return res;               // 復路の処理も書ける
};

const auth: Middleware = (ctx, next) => {
  if (!ctx.user) return new Response("Unauthorized", { status: 401 }); // 打ち切り
  return next();
};

// 連鎖を1つのハンドラに畳み込む
function chain(middlewares: Middleware[], handler: Next): Next {
  return middlewares.reduceRight<Next>(
    (next, mw) => () => mw(ctx, next),
    handler,
  );
}`}</code>
      </pre>
      <p>
        各段が<code>next()</code>を呼ぶかどうかで処理を続けるか止めるかを決められる点は、GoFの
        <Link href="/design/patterns">Chain of Responsibility</Link>パターンそのものであり、データが一方向に流れていく構造は
        <Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link>と同じ発想です。Express・Hono・Koaといった
        Webフレームワークは、この慣習を標準の書き方として提供しています。
      </p>

      <Heading num="06">Optional Chaining / Maybe ― null を安全にたどる</Heading>
      <p>
        ネストしたオブジェクトの奥の値を取り出すとき、途中がnull/undefinedだと
        「<code>Cannot read properties of undefined</code>」で落ちます。<Term>Optional Chaining(<code>?.</code>)</Term>は、
        たどる途中でnull/undefinedに出会った時点で評価を打ち切り、<code>undefined</code>を返します。
      </p>
      <pre className={badBlock}>
        <code>{`// ✗ 手動のnullチェックが積み重なる
let city;
if (user && user.profile && user.profile.address) {
  city = user.profile.address.city;
}`}</code>
      </pre>
      <pre className={goodBlock}>
        <code>{`// ✓ Optional Chaining + Nullish Coalescing
const city = user?.profile?.address?.city ?? "未設定";
//                                          ↑ null/undefined のときだけ既定値`}</code>
      </pre>
      <p>
        <code>?.</code>は「値が<strong>無いかもしれない</strong>」を扱い、続く<code>??</code>(Nullish Coalescing)は
        「無かったときの既定値」を与えます。この2つはセットで使うと読みやすくなります。関数型言語の
        <Link href="/design/paradigm/functional/safety">Maybe / Option型</Link>は、この「値が無いかもしれない」という状態を
        <strong>型として明示的に</strong>表現し、値を取り出す前に必ず「有る/無い」の場合分けを強制する、より厳格な発展形です。
        TypeScriptの<code>?.</code>は言語に組み込まれた軽量版、Maybe型はライブラリ・型で表現する厳格版、と捉えると整理できます。
      </p>

      <Analogy label="💡 たとえるなら">
        5つは「良い文章を書くための基本の型」に似ています。ガード節は「結論を先に書く」、DIは「材料を持ち込み式にして使い回す」、
        Builderは「箇条書きで組み立てる」、Middlewareは「共通の前置き・後書きをテンプレート化する」、Optional Chainingは「空欄でも崩れない書式」。
        どれも派手ではありませんが、これができているだけでコードは格段に読みやすく・壊れにくくなります。
      </Analogy>

      <Heading num="07">まとめ ― 発想と対応原則</Heading>
      <table>
        <thead>
          <tr><th>イディオム</th><th>核心の発想</th><th>結びつく原則・パターン</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Guard Clause</td><td>続けられない条件を入口で潰す</td><td>Fail Fast</td></tr>
          <tr><td className="hl">Dependency Injection</td><td>依存を外から注入し抽象に依存する</td><td>依存性逆転の原則(DIP)</td></tr>
          <tr><td className="hl">Builder</td><td><code>this</code>を返し名前付きで組み立てる</td><td>フルーエントインターフェース</td></tr>
          <tr><td className="hl">Middleware Chain</td><td><code>next()</code>で次へ委譲/打ち切る</td><td>Chain of Responsibility・パイプライン</td></tr>
          <tr><td className="hl">Optional Chaining</td><td>null/undefinedで評価を打ち切る</td><td>Maybe / Option型</td></tr>
        </tbody>
      </table>
      <p>
        より具体的な書き方は<Link href="/dev/implementation">実装</Link>セクションの各言語・フレームワークのページで実例として登場します。
        次は、コードの見た目や書き方そのものを揃える<Link href="/design/conventions">コーディング規約・スタイル</Link>を見ていきましょう。
      </p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/idioms" tag="設計">実装パターン・イディオム(一覧)</RelatedLink>
                    <RelatedLink href="/design/principles/solid" tag="設計">SOLID</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/safety" tag="設計">安全に分岐する</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
