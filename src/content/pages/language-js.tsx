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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "JavaScript・TypeScript",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>JavaScript・TypeScript ― 自由な言語に、型という契約を足す</h1>
        <Lead>
          <Term>JavaScript</Term>は、10日で設計された「ブラウザにちょっとした動きをつける言語」から、サーバーまで動かす世界で最も使われる言語のひとつになりました。その速すぎた普及の代償が、規模が大きくなるほど効いてくる動的型付けの緩さです。<Term>TypeScript</Term>は、その言語を置き換えるのではなく、開発中だけ型という契約を重ねることで答えました。
        </Lead>
      </Hero>

      <Heading num="01">10日で生まれ、標準になった</Heading>
      <p>
        JavaScriptは1995年、Netscapeのブレンダン・アイクによってわずか10日間で設計されました。急ごしらえの言語が世界標準になったという出自は、この言語の長所(どこでも動く)と短所(仕様の癖が消せない)の両方を説明します。
      </p>

      <Timeline>
        <TimelineItem era="1995年">
          Netscape Navigator向けに10日間で設計される
        </TimelineItem>
        <TimelineItem era="1997年">
          仕様が<Term>ECMAScript</Term>として標準化される
        </TimelineItem>
        <TimelineItem era="2009年">
          Node.jsが登場し、ブラウザの外でも動くようになる
        </TimelineItem>
        <TimelineItem era="2012年">
          MicrosoftがTypeScriptを公開する
        </TimelineItem>
        <TimelineItem era="2015年">
          ES2015で言語仕様が大きく刷新される(クラス・モジュール・アロー関数)
        </TimelineItem>
      </Timeline>
      <TimelineLabel>
        後方互換を壊さない方針が徹底されているため、古い書き方も動き続ける。読む側は複数世代の書き方が混在する前提で読むことになる。
      </TimelineLabel>

      <Heading num="02">動的型付けの自由さと、その代償</Heading>
      <p>
        JavaScriptは<Term>動的型付け</Term>です。変数の型を宣言する必要がなく、同じ変数に数値も文字列も後から代入できます。書き始めるまでが速い一方、規模が大きくなると次のような形で跳ね返ります。
      </p>

      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>結果</th>
            <th>何が問題か</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>&quot;5&quot; + 3</code>
            </td>
            <td>
              <code>&quot;53&quot;</code>
            </td>
            <td>エラーにならず、数値のつもりが文字列として連結される</td>
          </tr>
          <tr>
            <td className="hl">
              <code>user.name.toUpperCase()</code>
            </td>
            <td>実行時エラー</td>
            <td>
              <code>user.name</code>が<code>undefined</code>でも、その行を実行するまで気づけない
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>calcTotal(items, true)</code>
            </td>
            <td>静かに誤った値</td>
            <td>引数の順序や意味を間違えても、誰も止めてくれない</td>
          </tr>
        </tbody>
      </table>

      <p>
        いずれも<Term>実行するまで分からない</Term>という共通点があります。1人で書く小さなスクリプトなら許容できますが、複数人が触る規模になると、この「あとで分かる」が事故の主な原因になります。
      </p>

      <Heading num="03">TypeScript ― 実行前に契約を検査する</Heading>
      <p>
        <Term>TypeScript</Term>はJavaScriptの<Term>スーパーセット</Term>として設計されており、正しいJavaScriptはそのままTypeScriptとしても有効です。追加されるのは型注釈と、実行前の型検査だけです。
      </p>

      <DiagramFrame
        slug="language-js-pipeline"
        aspect="640 / 250"
        caption="TypeScriptが実行されるまでの流れ。型注釈つきの.tsファイルがtscやesbuildに渡され、型チェックと型の削除が行われる。型が合わなければこの段階で失敗するため、実行する前に間違いに気づける。通過すると型情報を持たない通常のJavaScriptが出力され、ブラウザやNode.jsがそれを実行する。実行時に動いているのはJavaScriptだけで、TypeScriptの型は残らない。"
      />

      <p>
        ブラウザもNode.jsもTypeScriptの構文をそのまま実行できないため、必ずJavaScriptへ変換(<Term>トランスパイル</Term>)されてから動きます。ここで重要なのは、<Term>型は実行時に1バイトも残らない</Term>ことです。型は実行を速くする仕組みでも、実行時に値を検証する仕組みでもありません。外部から来た値(APIのレスポンスやフォーム入力)が型どおりである保証はどこにもなく、そこは実行時の検証が別途必要になります。
      </p>

      <Analogy label="💡 たとえるなら">
        JavaScriptは口約束で仕事を頼むようなものです。手軽ですが、認識が合っているかは実際にやってみるまで分かりません。TypeScriptは契約書を交わしてから頼むようなもの。食い違いがあれば着手前に指摘されます ―
        ただし契約書は、相手が本当に約束を守るかまでは保証しません。
      </Analogy>

      <Heading num="04">型を書く対象は、だいたい4つに収まる</Heading>
      <p>
        どこに型を書くのかは、実務ではほぼ次の4か所です。中身のロジックはJavaScriptとまったく同じで、増えているのは注釈だけだという点に注目してください。
      </p>

      <h3>1. 関数 ― 引数と戻り値</h3>
      <p>
        型付けの基本は関数です。引数の後ろに<code>: 型名</code>を書くと「この引数はこの型でなければならない」という契約になります。戻り値の型は多くの場合<Term>推論</Term>されるため、省略できます。
      </p>
      <pre>
        <code>{`// JavaScript: 何を渡しても実行できてしまう
function add(a, b) {
  return a + b;
}
add(1, "2"); // "12" になる

// TypeScript: 呼び出し側が実行前に止まる
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2"); // Error: string型はnumber型に代入できません`}</code>
      </pre>

      <h3>2. データ ― オブジェクトと配列</h3>
      <p>
        オブジェクトの形は<Term>型エイリアス</Term>(<code>type</code>)か<Term>インタフェース</Term>(<code>interface</code>)で先に宣言し、その型として値を作ります。配列は要素の型を指定します。
      </p>
      <pre>
        <code>{`type User = {
  id: number;
  name: string;
  email?: string; // ? を付けると省略可能になる
};

const user: User = { id: 1, name: "Alice" };
const users: User[] = [user];`}</code>
      </pre>
      <p>
        <code>type</code>と<code>interface</code>はオブジェクトの形を表す用途ではほぼ同じです。<code>type</code>は共用体(<code>&quot;draft&quot; | &quot;published&quot;</code>)なども書ける代わりに同名の再宣言ができず、<code>interface</code>はオブジェクトの形に限られる代わりに<code>extends</code>や同名宣言のマージができます。迷ったら<code>type</code>で始め、拡張前提の公開APIだけ<code>interface</code>にする、で十分実務は回ります。
      </p>

      <h3>3. クラス ― プロパティとメソッド</h3>
      <p>
        プロパティの型とメソッドの戻り値に型を書きます。<code>void</code>は「意味のある値を返さない」ことを表す型です。
      </p>
      <pre>
        <code>{`class Account {
  balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }
}`}</code>
      </pre>

      <h3>4. コンポーネント ― Propsと状態</h3>
      <p>
        Reactのようなライブラリでは、受け取る<Term>Props</Term>と内部で持つ<Term>状態</Term>の2か所に型をつけるのが基本です。初期値から型が明らかなら省略でき、<code>null</code>始まりのときだけ明示します。
      </p>
      <pre>
        <code>{`type ButtonProps = {
  label: string;
  onClick: () => void; // 引数も戻り値もない関数
};

function Button({ label, onClick }: ButtonProps) { /* ... */ }

const [count, setCount] = useState(0);            // number と推論される
const [user, setUser] = useState<User | null>(null); // 取得前は null`}</code>
      </pre>

      <Aside label="型を書きすぎない">
        推論できるものにまで注釈を足すと、値と型の二重管理になって変更のたびに両方直すことになります。<Term>境界には書き、内側は推論に任せる</Term>
        ― 関数の引数・公開する型・外部から入ってくるデータには明示し、途中の変数は推論させるのが扱いやすい分量です。
      </Aside>

      <Heading num="05">非同期処理 ― 待ち方の書き表し方が3世代で変わった</Heading>
      <p>
        通信のような時間のかかる処理を、結果を待つ間も画面を止めずに進める仕組みが<Term>非同期処理</Term>です。JavaScriptの非同期の書き方は、3世代を経て今の形になりました。
      </p>

      <DiagramFrame
        slug="language-js-async"
        aspect="640 / 280"
        caption="JavaScriptの非同期処理の書き方の3世代。①コールバックは処理を入れ子の中に書くため、続きを足すほど右へ深くなる(コールバック地獄)。②Promiseは入れ子ではなく.then()を縦につないだ鎖になり、深さは増えないが繋ぎの記述が残る。③async/awaitはawaitを付けた代入文が上から下へ並ぶだけになり、同期処理とほぼ同じ見た目で読める。どれも待っている間に他の処理を進める点は同じで、変わったのは待ちの書き表し方だけ。"
      />

      <p>
        現在の主流は<code>async</code>/<code>await</code>です。TypeScriptでは「いつかこの型の値になる」ことを<code>Promise&lt;T&gt;</code>で表し、<code>await</code>で受け取った時点で中身の型になります。
      </p>
      <pre>
        <code>{`// 「いつか User を返す」ことが型に現れている
async function fetchUser(id: number): Promise<User> {
  const res = await fetch("/api/users/" + id);
  return res.json();
}

const user = await fetchUser(1); // user は User 型`}</code>
      </pre>
      <p>
        ただし<code>res.json()</code>が本当に<code>User</code>である保証は型にはありません。ここが「型は実行時に消える」の実害が出る場所で、外部から来た値は実行時に検証してから型を名乗らせるのが安全です。
      </p>

      <Aside label="非同期は並行処理の入口">
        <code>await</code>は「ここで一旦止まって、他の処理に譲る」という中断点でもあります。この性質は便利さと同時に、単一スレッドでも競合状態が起きる原因になります。詳しくは<Link href="/language/concurrency">並行処理</Link>で扱います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>足すのは契約だけ</h4>
          <p>
            TypeScriptは別言語ではなく、JavaScriptに実行前の検査を重ねたもの。ロジックは変わりません。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>型は実行時に消える</h4>
          <p>
            速くもならず、外から来た値も検証しません。境界での実行時チェックは別に要ります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>書くのは境界</h4>
          <p>
            引数・公開する型・外部データには明示し、内側は推論に任せると分量が釣り合います。
          </p>
        </Card>
      </CardGrid>

      <p>
        言語そのものを見てきましたが、実際のアプリではこのコードが<Term>同時に何本も</Term>走ります。そこで初めて現れる壊れ方を、次の<Link href="/language/concurrency">並行処理</Link>で見ていきます。
      </p>

      <DocsFooter href="/language/js" />
    </DocsPage>
  );
}
