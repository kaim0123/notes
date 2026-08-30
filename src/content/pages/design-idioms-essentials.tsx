import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "必修イディオムを深く理解する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>必修イディオムを深く理解する ― 5つの定石を書けるようになる</h1>
        <Lead>
          <Link href="/design/idioms">実装パターン・イディオム</Link>のうち、言語を問わず日常的に使う5つ ―
          Guard Clause・Dependency Injection・Builder・Middleware Chain・Optional Chaining ―
          を、直す前と直した後のコードで見ていきます。どれも<Term>知っている</Term>ことより<Term>反射的に書ける</Term>ことに意味があるものです。
        </Lead>
      </Hero>

      <Heading num="01">Guard Clause ― ネストを早期returnで平らにする</Heading>
      <p>
        条件を満たすときだけ処理を続ける、という書き方を素直に<code>if</code>の入れ子にすると、本来の処理がどんどん奥へ押し込まれます。
      </p>
      <pre>
        <code>{`// 直す前: ネストが深く、正常系が奥に隠れる
function publish(article: Article, user: User) {
  if (user.isActive) {
    if (user.canPublish) {
      if (article.status === "draft") {
        article.publish();
      } else {
        throw new Error("下書きではありません");
      }
    } else {
      throw new Error("権限がありません");
    }
  } else {
    throw new Error("アカウントが無効です");
  }
}`}</code>
      </pre>
      <pre>
        <code>{`// 直した後: 続けられない条件を先に潰す。正常系が一番外に出る
function publish(article: Article, user: User) {
  if (!user.isActive) throw new Error("アカウントが無効です");
  if (!user.canPublish) throw new Error("権限がありません");
  if (article.status !== "draft") throw new Error("下書きではありません");

  article.publish();
}`}</code>
      </pre>
      <p>
        条件と、その条件を満たさなかったときの結末が隣り合うため、読み飛ばしやすくなります。<Link href="/design/principles-modern">Fail Fast</Link>をそのまま文の並びにしたものだと考えると分かりやすい形です。
      </p>

      <Heading num="02">Dependency Injection ― 依存を外から渡す</Heading>
      <p>
        必要なものをその場で<code>new</code>すると、テストのときに本物のDBや外部APIを呼んでしまいます。外から渡す形にすれば、テストではダミー実装を渡せます。
      </p>
      <pre>
        <code>{`// 直す前: 依存を内部で直接生成している
class UserService {
  private repo = new PrismaUserRepository(); // 差し替えられない

  async rename(id: string, name: string) {
    const user = await this.repo.findById(id);
    user.rename(name);
    await this.repo.save(user);
  }
}`}</code>
      </pre>
      <pre>
        <code>{`// 直した後: 依存をコンストラクタで受け取る
class UserService {
  constructor(private readonly repo: UserRepository) {}

  async rename(id: string, name: string) {
    const user = await this.repo.findById(id);
    user.rename(name);
    await this.repo.save(user);
  }
}

// 本番
new UserService(new PrismaUserRepository());
// テスト
new UserService(new InMemoryUserRepository());`}</code>
      </pre>
      <p>
        肝心なのは、受け取る型が具体クラスではなく<code>UserRepository</code>という抽象だという点です。これが<Link href="/design/principles-solid">依存性逆転の原則</Link>で、DIはその原則をコードにする手段にすぎません。
      </p>

      <Heading num="03">Builder ― 複雑な生成を読めるチェーンにする</Heading>
      <pre>
        <code>{`// 直す前: 位置引数だと、各値の意味が読み取れない
const conn = new Connection("db.example.com", 5432, true, false, 30, 3);

// 直した後: 各設定に名前が付き、必要な分だけ書ける
const conn = new ConnectionBuilder("db.example.com", 5432)
  .withTls()
  .withTimeout(30)
  .withRetries(3)
  .build();`}</code>
      </pre>
      <p>
        引数が増えるほど、位置で意味を覚えるのは無理になります。TypeScriptではオブジェクト引数(<code>{"{ timeout: 30, retries: 3 }"}</code>)でも同じ読みやすさを得られるため、段階的な組み立てや途中でのバリデーションが必要な場合にBuilderを選ぶ、という使い分けが現実的です。
      </p>

      <Heading num="04">Middleware Chain ― 横断的な処理を連鎖に合成する</Heading>
      <p>
        認証・ログ・エラーハンドリングのように、どの処理でも共通して必要なものを本処理に直接書くと、本処理が本題以外の記述で埋まります。
      </p>
      <pre>
        <code>{`type Ctx = { url: string; user?: User };
type Next = () => Promise<Response>;
type Middleware = (ctx: Ctx, next: Next) => Promise<Response>;

const logger: Middleware = async (ctx, next) => {
  const start = Date.now();
  const res = await next();
  console.log(ctx.url, Date.now() - start + "ms");
  return res;
};

const auth: Middleware = async (ctx, next) => {
  if (!ctx.user) return new Response(null, { status: 401 });
  return next();
};

// 並べた順に外側から実行される
const handler = compose([logger, auth, mainHandler]);`}</code>
      </pre>
      <p>
        本処理は本題だけを書けばよくなり、共通処理は付け外しが1行で済みます。<Link href="/design/patterns-gof-collaboration">Chain of Responsibility</Link>をWebフレームワークの慣習として具体化したものです。
      </p>

      <Heading num="05">Optional Chaining ― nullを安全にたどる</Heading>
      <pre>
        <code>{`// 直す前: 手動のnullチェックが積み重なる
let city = "未設定";
if (user && user.profile && user.profile.address) {
  city = user.profile.address.city;
}

// 直した後
const city = user?.profile?.address?.city ?? "未設定";`}</code>
      </pre>
      <p>
        <code>?.</code>は「途中が無いかもしれない」を、<code>??</code>は「無かったときの既定値」を扱います。この2つは役割が違うので、<code>||</code>で代用しないことが重要です。<code>||</code>は<code>0</code>や空文字も「無い」と判定してしまい、意図しない既定値に置き換わります。
      </p>

      <DiagramFrame
        slug="design-idioms-essentials-noise"
        aspect="680 / 290"
        caption="5つのイディオムが何を本題の外へ出すかの整理。中央にそのコードが本当にやりたいことがあり、前提条件をGuard Clauseが、依存の準備をDependency Injectionが、設定の羅列をBuilderが、横断的な処理をMiddleware Chainが、nullチェックをOptional Chainingが、それぞれ外へ追い出す。外へ出した結果として残るものが、そのコードの主題になる。"
      />

      <Analogy label="💡 5つに共通するもの">
        どれも「本題ではない記述を、本題から追い出す」ための道具です。Guard Clauseは前提条件を、DIは依存の準備を、Builderは設定の羅列を、Middlewareは横断的な処理を、Optional Chainingはnullチェックを、それぞれ本題の外へ出します。結果として残るのが、そのコードが本当にやりたいことだけになります。
      </Analogy>

      <Heading num="まとめ">対応する原則</Heading>
      <table>
        <thead>
          <tr><th>イディオム</th><th>もとにある考え方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Guard Clause</td><td>Fail Fast ― おかしな状態は先に潰す</td></tr>
          <tr><td className="hl">Dependency Injection</td><td>依存性逆転の原則 ― 抽象に依存する</td></tr>
          <tr><td className="hl">Builder</td><td>明示は暗黙に勝る ― 位置ではなく名前で示す</td></tr>
          <tr><td className="hl">Middleware Chain</td><td>関心の分離 ― 横断的な処理を本処理から切り離す</td></tr>
          <tr><td className="hl">Optional Chaining</td><td>値の有無を型で扱う ― 分岐を言語機能に任せる</td></tr>
        </tbody>
      </table>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>反射で書けるまで</h4><p>知識として知るより、手が勝手に動く状態を目指す5つ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>本題を浮かび上がらせる</h4><p>どれも「本題でない記述を外へ出す」ための道具。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>裏には必ず原則がある</h4><p>形だけ真似るのではなく、何を守るための形かを押さえる。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/idioms-essentials" />
    </DocsPage>
  );
}
