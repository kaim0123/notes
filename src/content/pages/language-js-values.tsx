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
} from "@/components/docs";

export const metadata: Metadata = { title: "値と型" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>値と型 ― プログラムのいちばん小さな部品</h1>
        <Lead>
          プログラムが扱ういちばん小さな部品が<Term>値</Term>です。数値の<code>42</code>、文字列の<code>{'"hello"'}</code>、真偽値の<code>true</code>
          ― これらがどんな種類(型)を持ち、どう組み合わさるのかを見ていきます。<Link href="/language/js">JavaScript・TypeScript</Link>で触れた「型という契約」を、ここから自分の手で書き始めます。まず素直なJavaScriptで理解し、同じ結果になるTypeScriptではどう書くのかを書き比べながら進めます。
        </Lead>
      </Hero>

      <Heading num="01">値とリテラル</Heading>
      <p>
        <Term>値</Term>とは、プログラムが扱うデータそのものです。ソースコードに直接書き込んだ具体的なデータを<Term>リテラル</Term>と呼びます。基本になるのは次の5種類(<Term>プリミティブ型</Term>)です。
      </p>

      <ul>
        <li>
          <strong>数値</strong>: <code>42</code>や<code>3.14</code>(整数も小数も同じ「数値」)
        </li>
        <li>
          <strong>文字列</strong>: <code>{'"hello"'}</code>(引用符で囲んだ文字の並び)
        </li>
        <li>
          <strong>真偽値</strong>: <code>true</code>と<code>false</code>
        </li>
        <li>
          <strong>null</strong>: 「意図的に空である」ことを表す値
        </li>
        <li>
          <strong>undefined</strong>: 「まだ値が入っていない」ことを表す値
        </li>
      </ul>

      <p>
        値が「どの種類か」を実行時に確かめるには<code>typeof</code>演算子を使います。
      </p>

      <pre>
        <code>{`const n = 42;
const s = "hello";
const b = true;

console.log(typeof n); // => "number"
console.log(typeof s); // => "string"
console.log(typeof b); // => "boolean"`}</code>
      </pre>

      <p>
        ここで注目したいのが<code>const</code>です。値に名前をつけて後から参照できるようにする仕組みを<Term>変数</Term>(この場合は<Term>定数</Term>)と呼びますが、このセクションでは<Term>再代入しない<code>const</code>を基本</Term>にします。
      </p>

      <pre>
        <code>{`const n = 42;
n = 100; // TypeError: Assignment to constant variable.`}</code>
      </pre>

      <p>
        値を書き換えるのではなく、必要なら新しい値を作って別の名前に入れる ―
        この<Term>不変(イミュータブル)</Term>の考え方が、以降の章を貫く関数型スタイルの出発点です。既存の値をこっそり書き換えないので、プログラムの動きが追いやすくなります(<Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>)。
      </p>

      <Analogy label="💡 たとえるなら">
        <code>const</code>は、いちど記入したら消せないボールペンのようなものです。書き間違えたら、消しゴムで消すのではなく新しい紙に書き直します。前の紙がそのまま残るので、「いつ・何が変わったか」を後から追いかけられます。
      </Analogy>

      <Heading num="02">TypeScriptの型 ― 最初の一歩</Heading>
      <p>
        <code>typeof</code>で見えたのは、コードを<Term>実行したとき</Term>に分かる型でした。ここからは<Term>実行する前</Term>に型を確かめるTypeScriptを加えます。書き方は名前のうしろに<code>{": 型名"}</code>を足すだけで、中身のロジックはJavaScriptとまったく同じです。
      </p>

      <pre>
        <code>{`// JavaScript ― あとで何型を入れても文法上は通る
const n = 42;
const s = "hello";

// TypeScript ― 実行前に食い違いが分かる
const n: number = 42;
const s: string = "hello";

const bad: number = "42"; // Error: string型はnumber型に代入できません`}</code>
      </pre>

      <DiagramFrame
        slug="language-js-values-when"
        aspect="640 / 280"
        caption="同じ間違いがいつ見つかるかを時間軸で比べた図。TypeScriptでは、数値に文字列を代入する誤りや、数値に文字列用のメソッドを呼ぶ誤りが、書いている最中とビルドの段階で止まる。JavaScriptだけの場合、同じ誤りはビルドを素通りし、その行が実行された瞬間に初めて失敗する。滅多に通らない分岐にあれば、本番で利用者が踏むまで誰も気づかない。型注釈の効用は、見つかるタイミングを左へずらすことにある。"
      />

      <p>
        とはいえ、毎回すべてに型を書くわけではありません。TypeScriptには<Term>型推論</Term>があり、初期値を見れば型を自動で当ててくれます。
      </p>

      <pre>
        <code>{`const n = 42;      // number と推論される
const s = "hello"; // string と推論される

n.toUpperCase();   // Error: number型に toUpperCase は存在しません`}</code>
      </pre>

      <p>
        つまり<Term>推論が効く場所は書かず、意図を明示したい場所や推論できない場所だけ型を書く</Term>のが実務での基本方針です。書きすぎず、しかし守りは効く ―
        これがTypeScriptの心地よさです。
      </p>

      <Heading num="03">演算子 ― 値から新しい値を作る</Heading>
      <p>
        値どうしを計算したり比べたりするのが<Term>演算子</Term>です。算術演算子(<code>+</code>
        <code>-</code>
        <code>*</code>
        <code>/</code>
        <code>%</code>)は、結果として新しい値を返すだけで元の値を変えません。
      </p>

      <pre>
        <code>{`const sum = 3 + 4;      // => 7
const product = 6 * 7;  // => 42
const rest = 10 % 3;    // => 1(余り)`}</code>
      </pre>

      <p>
        比較演算子は2つの値を比べ、結果は必ず<code>boolean</code>になります。特に大事なのが<code>===</code>(<Term>厳密等価</Term>)です。JavaScriptには<code>==</code>と<code>===</code>がありますが、<code>==</code>は比べる前に型をそろえようとする<Term>型強制</Term>を行うため、直感に反する結果を生みます。
      </p>

      <pre>
        <code>{`console.log(5 == "5");  // => true  (文字列"5"が数値に変換される)
console.log(5 === "5"); // => false (型が違うので不一致)

console.log("5" + 3);   // => "53"  (型強制は文字列連結でも起きる)

// TypeScript では、そもそも噛み合わない比較を実行前に警告してくれる
5 === "5"; // Error: number と string は比較の型が重ならない`}</code>
      </pre>

      <p>
        論理演算子(<code>{"&&"}</code>
        <code>{"||"}</code>
        <code>!</code>)も同じで、元の値を書き換えず結果として新しい値を返すだけです。これを<Term>式</Term>と呼びます。式は「値を生む小さな計算」であり、関数型スタイルの基本部品になります。
      </p>

      <Heading num="04">制御構文 ― 分岐と繰り返し</Heading>
      <p>
        流れを枝分かれさせるのが<code>if</code>/<code>else</code>、選択肢が3つ以上あるときに読みやすいのが<code>switch</code>です。
      </p>

      <pre>
        <code>{`// JavaScript
function judge(score) {
  if (score >= 80) return "合格";
  return "不合格";
}

// TypeScript ― 引数と戻り値に契約が付くだけ
function judge(score: number): string {
  if (score >= 80) return "合格";
  return "不合格";
}`}</code>
      </pre>

      <p>
        ここで関数型スタイルに効いてくるのが<Term>三項演算子</Term>です。<code>if</code>文が「処理を実行する命令」なのに対し、三項演算子は<Term>それ自体が1つの値になる式</Term>なので、そのまま<code>const</code>に入れられます。
      </p>

      <pre>
        <code>{`// if 版 ― いったん let で用意して、後から書き込む
let label;
if (score >= 80) {
  label = "合格";
} else {
  label = "不合格";
}

// 三項版 ― 式なので、そのまま const に入る
const label = score >= 80 ? "合格" : "不合格";`}</code>
      </pre>

      <p>
        三項版は<code>let</code>と再代入を使わずに済むため、値がいちど決まったら変わらないという不変の原則を保てます。
      </p>

      <p>
        繰り返しの<code>for</code>・<code>while</code>は、カウンタを1つずつ進めながら処理を実行する<Term>命令型</Term>の書き方です。
      </p>

      <pre>
        <code>{`// 命令型 ― total と i を何度も書き換える
function sum(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

// 宣言的 ― 書き換えずに、値を変換していく
function sum(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1)
    .reduce((acc, x) => acc + x, 0);
}`}</code>
      </pre>

      <Aside label="まだ reduce が分からなくてよい">
        ここで感じ取ってほしいのは、<Term>「変数を書き換える命令の列」から「値を変換する式」へ</Term>という発想の転換だけです。<code>for</code>や<code>while</code>も仕組みの理解のために使いますが、実際のデータ処理は次の<Link href="/language/js-functions">関数</Link>以降で学ぶ<code>map</code>・<code>filter</code>・<code>reduce</code>に置き換えていきます。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>値とリテラル</h4>
          <p>
            数値・文字列・真偽値・<code>null</code>・<code>undefined</code>が基本の値。種類は<code>typeof</code>で確かめられます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>不変を基本に</h4>
          <p>
            再代入しない<code>const</code>を使い、書き換えるのではなく新しい値を作ります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型は実行前の安全網</h4>
          <p>型注釈と型推論が、食い違いを実行する前に知らせてくれます。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>式で分岐する</h4>
          <p>
            <code>===</code>で厳密に比べ、三項演算子で値を返す分岐を書くのが関数型の基本です。
          </p>
        </Card>
      </CardGrid>

      <p>
        値という部品と、それを分岐・比較する道具がそろいました。次は、これらの値を受け取って新しい値を返す<Link href="/language/js-functions">関数</Link>を見ていきます。
      </p>

      <DocsFooter href="/language/js-values" />
    </DocsPage>
  );
}
