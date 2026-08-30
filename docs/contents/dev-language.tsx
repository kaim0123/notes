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
  Diagram,
  CodeCompare,
  RelatedList,
  RelatedLink,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

const chapters = [
  { href: "/dev/language/values", title: "値と型", desc: "リテラル・typeof・const中心の不変な値。JSの型とTSの型注釈の最初の一歩。" },
  { href: "/dev/language/functions", title: "関数 ― プログラムの中心", desc: "第一級関数・純粋関数・アロー・高階関数・クロージャ。関数型の土台。" },
  { href: "/dev/language/data", title: "データの変換 ― オブジェクトと配列", desc: "スプレッドによる不変更新とmap/filter/reduce。interfaceとUnion型。" },
  { href: "/dev/language/types", title: "型を使いこなす", desc: "リテラル型・判別可能Union・Narrowing・as const・Result型パターン。" },
  { href: "/dev/language/classes", title: "クラスとプロトタイプ", desc: "既存コードを読むための知識。ファクトリ関数との対比。" },
  { href: "/dev/language/engine", title: "実行の仕組み", desc: "コールスタック・ヒープとGC。forと再帰、クロージャと参照保持。" },
  { href: "/dev/language/async", title: "非同期処理", desc: "イベントループ・Promise・async/await・Fetch。値としての非同期。" },
  { href: "/dev/language/browser", title: "ブラウザ ― Web API", desc: "DOM・イベント・ストレージ。計算と副作用を分けて書く。" },
  { href: "/dev/language/generics", title: "ジェネリクスとユーティリティ型", desc: "型パラメータとPartial/Pick/Omit/Recordによる不変データの型変換。" },
  { href: "/dev/language/node", title: "Node.js と標準ライブラリ", desc: "import/export・Math/Date/JSON/RegExp。副作用のないAPIを優先。" },
  { href: "/dev/language/appendix", title: "付録", desc: "用語集・型エラー早見表・命令型/関数型/TSの書き方対照表。" },
];

export const metadata: Metadata = {
  title: "JavaScript・TypeScript",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>JavaScript・TypeScript ― ページに命を吹き込む言語</h1>
        <Lead>
          前のページ「<Link href="/dev/frontend/web-basics">Web基礎</Link>」で作った骨格(HTML)と見た目(CSS)に、ボタンを押したときの反応やデータの取得といった「動き」を与えるのが<Term>JavaScript</Term>です。この記事ではJavaScriptの特徴と、そこから生まれた<Term>TypeScript</Term>を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">JavaScriptとは ― 10日で生まれ、世界標準になった言語</Heading>
      <p>JavaScriptは1995年、Netscape社のBrendan Eichによってわずか10日間で設計されました。当初は「ブラウザ上でちょっとした動きをつけるための簡易言語」という位置づけでしたが、その後仕様が<Term>ECMAScript</Term>として標準化され、現在ではブラウザだけでなくサーバー(次のページで扱う<Link href="/dev/runtime">ランタイム</Link>)まで動かす、世界で最も使われる言語の1つになりました。</p>

      <Heading num="02">動的型付け ― 自由さと引き換えの落とし穴</Heading>
      <p>JavaScriptは<Term>動的型付け</Term>の言語です。変数の型を事前に宣言する必要がなく、同じ変数に数値も文字列も後から自由に代入できます。この自由さは書き始めるまでの手軽さにつながる一方、規模が大きくなると思わぬ不具合を招きます。</p>
      <table>
        <thead>
          <tr><th>コード</th><th>結果</th><th>問題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&quot;5&quot; + 3</code></td><td><code>&quot;53&quot;</code></td><td>数値のつもりが文字列として連結される</td></tr>
          <tr><td className="hl"><code>user.name.toUpperCase()</code></td><td>実行時エラー</td><td><code>user.name</code>が<code>undefined</code>だった場合、実行するまで気づけない</td></tr>
        </tbody>
      </table>
      <p>関数に渡す値の型を間違えても、実行してエラーが出るまで気づけない ― これが大規模なチーム開発では大きなリスクになります。</p>

      <Heading num="03">TypeScriptとは ― JavaScriptに型という契約を足す</Heading>
      <p><Term>TypeScript</Term>は、Microsoftが開発した、JavaScriptに<Term>静的型付け</Term>を追加した言語です。JavaScriptの上位互換(スーパーセット)として設計されており、正しいJavaScriptのコードはそのままTypeScriptとしても有効です。変数や関数の引数に「この値は文字列である」といった型を明示できるようになり、実行する前(コンパイル時)に型の不一致をエディタやビルド時に検出できます。</p>
      <Diagram caption="TypeScriptはコンパイラによって型チェックされたのち、通常のJavaScriptに変換されてから実行される">
        <svg viewBox="0 0 620 130" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={40} width={150} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={70} fill="#f2f2f2" fontSize="12" textAnchor="middle">TypeScript(.ts)</text>
          <rect x={230} y={40} width={180} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">tsc / esbuild などが</text>
          <text x={320} y={78} fill="#9a9a9a" fontSize="10" textAnchor="middle">型チェック→変換</text>
          <rect x={470} y={40} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={535} y={70} fill="#f2f2f2" fontSize="12" textAnchor="middle">JavaScript</text>
          <line x1={170} y1={65} x2={228} y2={65} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowTs)" />
          <line x1={410} y1={65} x2={468} y2={65} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowTs)" />
          <defs>
            <marker id="arrowTs" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>ブラウザやNode.jsはTypeScriptの構文をそのまま実行できないため、最終的には必ずJavaScriptに変換(<Term>トランスパイル</Term>)されてから実行されます。この変換は、前のカテゴリ「開発基盤」の「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」で見たViteのようなビルドツールが担っています。</p>

      <Analogy label="💡 たとえるなら">
        JavaScriptは「口約束だけで仕事を頼む」ようなものです。手軽ですが、頼んだ内容が正しく伝わっているかは、実際にやってみるまでわかりません。TypeScriptは「契約書を交わしてから仕事を頼む」ようなもの。契約内容(型)と食い違っていれば、着手前(コンパイル時)に指摘してもらえます。
      </Analogy>
      <p>では実際にコードのどこへ型を書いていくのか、代表的な4つの対象 ― <Term>関数</Term>・<Term>データ(オブジェクトと配列)</Term>・<Term>クラス</Term>・<Term>React</Term> ― を順番に見ていきます。</p>

      <Heading num="04">関数の型 ― 引数と戻り値に契約をつける</Heading>
      <p>型付けの基本は<Term>関数</Term>です。引数の後ろに<code>: 型名</code>を書くと「この引数はこの型でなければならない」という契約になり、戻り値にも同様に型を書けます。中身のロジックはJavaScriptと全く同じで、増えているのは型の注釈だけです。</p>
      <CodeCompare
        js={`function add(a, b) {
  return a + b;
}

add(1, "2"); // 実行できてしまう("12"になるなど、意図しない結果に)`}
        ts={`function add(a: number, b: number): number {
  return a + b;
}

add(1, "2"); // Error: 引数"2"はstring型で、number型ではありません`}
      />
      <p>アロー関数でも書き方は同じです。戻り値の型は多くの場合コンパイラが引数や処理内容から自動で推測してくれる(<Term>型推論</Term>)ため、省略されることもよくあります。</p>
      <CodeCompare
        js={`const greet = (name) => \`Hello, \${name}\`;

const double = (n) => n * 2;`}
        ts={`const greet = (name: string): string => \`Hello, \${name}\`;

// 戻り値の型は省略しても推論される
const double = (n: number) => n * 2; // 戻り値はnumberと推論される`}
      />

      <Heading num="05">データの型 ― オブジェクトと配列</Heading>
      <p>オブジェクトの形を定義するには、<Term>Type</Term>(型エイリアス)か<Term>Interface</Term>を使います。JavaScriptではオブジェクトをその場で作るだけですが、TypeScriptでは先に「形」を宣言してから、その型として値を作ります。</p>
      <CodeCompare
        js={`const user = {
  id: 1,
  name: "Alice",
};

const product = {
  id: 1,
  price: 1980,
};`}
        ts={`type User = {
  id: number;
  name: string;
  email?: string; // ?を付けると省略可能なプロパティになる
};

interface Product {
  id: number;
  price: number;
}

const user: User = { id: 1, name: "Alice" };
const product: Product = { id: 1, price: 1980 };`}
      />
      <table>
        <thead>
          <tr><th>観点</th><th>Type</th><th>Interface</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">表現できる範囲</td><td>オブジェクトに加え、共用体(<code>&quot;a&quot; | &quot;b&quot;</code>)なども表現できる</td><td>基本はオブジェクトの形だけ</td></tr>
          <tr><td className="hl">拡張のしかた</td><td><code>&amp;</code>で型同士を合成</td><td><code>extends</code>で継承、同名宣言は自動でマージされる</td></tr>
          <tr><td className="hl">向いている場面</td><td>関数の引数の共用体など柔軟な型</td><td>クラスが実装する「形」の定義</td></tr>
        </tbody>
      </table>
      <p>配列には要素の型を指定します。<code>型名[]</code>と<code>Array&lt;型名&gt;</code>は同じ意味で、どちらの書き方でも構いません。</p>
      <CodeCompare
        js={`const ids = [1, 2, 3];
const names = ["Alice", "Bob"];
const users = [{ id: 1, name: "Alice" }];`}
        ts={`const ids: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];
const users: User[] = [{ id: 1, name: "Alice" }];`}
      />

      <Heading num="06">クラスの型 ― プロパティとメソッド</Heading>
      <p><Term>クラス</Term>では、プロパティの型とメソッドの戻り値の型を書きます。<code>void</code>は「何も返さない」ことを表す型で、意味のある戻り値がないメソッドに使います。</p>
      <CodeCompare
        js={`class Account {
  balance;

  constructor(initial) {
    this.balance = initial;
  }

  deposit(amount) {
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}`}
        ts={`class Account {
  balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}`}
      />

      <Heading num="07">Reactにおける型 ― PropsとState</Heading>
      <p>次のページ以降で扱う<Term>React</Term>のようなUIライブラリでは、コンポーネントが受け取る<Term>Props</Term>と、コンポーネント内部が保持する<Term>State</Term>の2箇所に型をつけるのが基本です。Propsの型はTypeかInterfaceで定義し、コンポーネントの引数の型として指定します。</p>
      <CodeCompare
        js={`function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}`}
        ts={`type ButtonProps = {
  label: string;
  onClick: () => void; // 引数も戻り値もない関数
};

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}`}
      />
      <p>Stateはフックの型引数(<code>&lt;&gt;</code>)として型を渡します。初期値から型が明らかな場合は省略できますが、初期値が<code>null</code>など曖昧な場合は明示すると安全です。</p>
      <CodeCompare
        js={`const [count, setCount] = useState(0);
const [user, setUser] = useState(null);`}
        ts={`const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null); // まだ取得前はnull`}
      />

      <Heading num="08">非同期処理 ― 待ち時間の間、他の処理を進める</Heading>
      <p>通信でデータを取得するような「時間のかかる処理」を、結果が返るまで画面を固まらせずに実行する仕組みを<Term>非同期処理</Term>と呼びます。JavaScriptにおける非同期処理の書き方は、3つの世代を経て今の形になりました。</p>
      <table>
        <thead>
          <tr><th>世代</th><th>書き方</th><th>課題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1. コールバック</td><td>「終わったら呼んでね」という関数を渡す</td><td>ネストが深くなり読みにくい(コールバック地獄)</td></tr>
          <tr><td className="hl">2. Promise</td><td>「いつか終わる処理」をオブジェクトとして扱う</td><td><code>.then()</code>の連鎖はまだ読みにくさが残る</td></tr>
          <tr><td className="hl">3. async/await</td><td><code>await</code>で、非同期処理をあたかも同期処理のように書ける</td><td>現在の主流の書き方</td></tr>
        </tbody>
      </table>
      <p>TypeScriptでは、これらにも型をつけられます。<Term>コールバック関数</Term>は引数と戻り値の型を持つ関数として型を書き、<Term>Promise</Term>は「将来解決される値の型」を<code>Promise&lt;型&gt;</code>という形の<Term>ジェネリクス</Term>(型引数)で表します。<code>await</code>で受け取った時点で、変数はすでにその中身の型になっています。</p>
      <CodeCompare
        js={`function fetchUser(id, callback) {
  /* ... */
}

function fetchUserAsync(id) {
  return fetch(\`/api/users/\${id}\`).then((res) => res.json());
}

async function main() {
  const user = await fetchUserAsync(1);
}`}
        ts={`// コールバック: 第2引数の型が「userを受け取り何も返さない関数」
function fetchUser(id: number, callback: (user: User) => void): void {
  /* ... */
}

// Promise<User>: 「いつかUser型の値を返す」ことを表す
function fetchUserAsync(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then((res) => res.json());
}

async function main() {
  const user = await fetchUserAsync(1); // ここでuserはすでにUser型
}`}
      />

      <Heading num="まとめ">自由な言語と、契約を足した言語</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>JavaScriptは動的型付け</h4><p>手軽に書き始められる一方、型の不一致を実行するまで検出できません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>TypeScriptは型という契約</h4><p>実行前に型を検証し、変換されて最終的にJavaScriptとして動きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>型を書く対象は主に4つ</h4><p>関数(引数・戻り値)、データ(オブジェクト・配列)、クラス(プロパティ・メソッド)、Reactコンポーネント(Props・State)です。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>非同期処理はasync/awaitが主流</h4><p>コールバック→Promise→async/awaitと進化し、TypeScriptでは<code>Promise&lt;T&gt;</code>で結果の型まで表現できます。</p></Card>
      </CardGrid>
      <p>JavaScript・TypeScriptという言語そのものを見てきましたが、この言語のコードは一体どこで実行されているのでしょうか。実行環境については後のページ「<Link href="/dev/runtime">ランタイム</Link>」で扱います。</p>

      <Heading num="教科書">JavaScript / TypeScript を詳しく学ぶ</Heading>
      <p>ここまでは全体像でした。以下は<Term>初心者向けの教科書</Term>です。<strong>まず素直なJavaScriptで理解し、実務で使うTypeScriptではどう書くのか</strong>を、章ごとに<Term>書き比べ</Term>で学びます。データは<Term>不変</Term>に扱い、<code>map</code>・<code>filter</code>・<code>reduce</code>といった<Term>関数型</Term>のスタイルを軸にしています。上から順に読み進めるのがおすすめです。</p>
      <IndexGrid>
        {chapters.map((c, i) => (
          <IndexCard
            key={c.href}
            href={c.href}
            num={`第${i + 1}章`}
            title={c.title}
          >
            {c.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/runtime" tag="開発">ランタイム</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="開発">Web基礎</RelatedLink>
                    <RelatedLink href="/dev/tooling" tag="開発">パッケージ管理とビルド</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
