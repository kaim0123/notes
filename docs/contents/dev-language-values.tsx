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
  Analogy,
  CodeCompare,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "値と型" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第1章 値と型</h1>
        <Lead>
          プログラムが扱ういちばん小さな部品が<Term>値</Term>です。数値の
          <code>42</code>、文字列の<code>{'"hello"'}</code>、真偽値の
          <code>true</code> ― これらがどんな種類(型)を持ち、どう組み合わさるのかを、この章でていねいに見ていきます。概要ページ
          <Link href="/dev/language">JavaScript・TypeScript</Link>
          で触れた「型という契約」を、いよいよ自分の手で書き始めます。まずは素直なJavaScriptで理解し、同じ結果になるTypeScriptではどう書くのかを、つねに書き比べながら進めます。
        </Lead>
      </Hero>

      <Heading num="1.1">値とは何か</Heading>
      <p>
        <Term>値</Term>とは、プログラムが扱うデータそのものです。ソースコードに直接書き込んだ具体的なデータを
        <Term>リテラル</Term>と呼びます。JavaScriptでよく使う基本的なリテラルには、次のようなものがあります。
      </p>
      <ul>
        <li>
          <strong>数値</strong>: <code>42</code> や <code>3.14</code>(整数も小数も同じ「数値」)
        </li>
        <li>
          <strong>文字列</strong>: <code>{'"hello"'}</code> や <code>{"`こんにちは`"}</code>(引用符で囲んだ文字の並び)
        </li>
        <li>
          <strong>真偽値</strong>: <code>true</code> と <code>false</code>(「はい/いいえ」の2値)
        </li>
        <li>
          <strong>null</strong>: <code>null</code>(「意図的に空である」ことを表す値)
        </li>
        <li>
          <strong>undefined</strong>: <code>undefined</code>(「まだ値が入っていない」ことを表す値)
        </li>
      </ul>
      <p>
        値が「どの種類か」を実行時に確かめるには <code>typeof</code>{" "}
        演算子を使います。値の前に <code>typeof</code>{" "}
        と書くと、その種類を表す文字列が返ってきます。
      </p>
      <CodeCompare
        js={`const n = 42;
const s = "hello";
const b = true;

console.log(typeof n); // => "number"
console.log(typeof s); // => "string"
console.log(typeof b); // => "boolean"`}
        ts={`const n = 42;
const s = "hello";
const b = true;

console.log(typeof n); // => "number"
console.log(typeof s); // => "string"
console.log(typeof b); // => "boolean"`}
      />
      <p>
        ここで注目したいのが <code>const</code>{" "}
        です。値に名前をつけて後から参照できるようにする仕組みを
        <Term>変数</Term>(正確にはこの場合は<Term>定数</Term>)と呼びますが、本書では
        <strong>再代入しない <code>const</code> を基本</strong>にします。
        <code>const</code> で宣言した名前には、あとから別の値を入れ直せません。
      </p>
      <CodeCompare
        js={`const n = 42;
n = 100; // TypeError: Assignment to constant variable.`}
        ts={`const n = 42;
n = 100; // Error: 定数 n には再代入できません`}
      />
      <p>
        「値を書き換える」のではなく、必要なら
        <strong>新しい値を作って別の名前に入れる</strong>
        ― この<Term>不変(イミュータブル)</Term>の考え方が、本書全体を貫く関数型スタイルの出発点です。既存の値をこっそり書き換えないので、プログラムの動きが追いやすくなります。
      </p>
      <Analogy label="💡 たとえるなら">
        <code>const</code>{" "}
        は、いちど記入したら消せないボールペンのようなものです。書き間違えたら、消しゴムで消す(書き換える)のではなく、新しい紙に書き直します。前の紙がそのまま残るので、「いつ・何が変わったか」を後から追いかけられます。
      </Analogy>

      <Heading num="1.2">TypeScriptの型 ― 最初の一歩</Heading>
      <p>
        1.1の <code>typeof</code>{" "}
        で見えたのは、コードを<strong>実行したとき</strong>に分かる型でした。ここからは
        <strong>実行する前(コンパイル時)</strong>に型を確かめるTypeScriptを加えていきます。
      </p>
      <Analogy label="🔷 ここからTSが加わる">
        TypeScriptでは、値に「これは数値である」「これは文字列である」といった
        <Term>型注釈</Term>を書き添えられます。書き方は名前のうしろに{" "}
        <code>{": 型名"}</code>{" "}
        を足すだけ。中身のロジックはJavaScriptとまったく同じで、増えるのは型の情報だけです。
      </Analogy>
      <p>
        まず押さえる基本の型(<Term>プリミティブ型</Term>)は5つです:{" "}
        <code>string</code>、<code>number</code>、<code>boolean</code>、
        <code>null</code>、<code>undefined</code>。型を書く最初の場所は、
        <strong>変数・定数</strong>です。
      </p>
      <CodeCompare
        js={`const n = 42;
const s = "hello";
const b = true;

// JavaScriptでは、あとで何型を入れても文法上は通る`}
        ts={`const n: number = 42;
const s: string = "hello";
const b: boolean = true;

// もし const n: number = "42"; と書くと
// Error: string型はnumber型に代入できません(実行前に判明)`}
      />
      <p>
        JavaScript版とTypeScript版で、実行した結果はまったく同じです。違うのは
        <strong>TypeScriptだけが、実行する前に型の食い違いを教えてくれる</strong>
        点です。エディタ上で赤い波線が出て、ビルドも止まるので、間違ったまま動かしてしまう事故を防げます。
      </p>
      <p>
        とはいえ、毎回すべてに型を書くわけではありません。TypeScriptには
        <Term>型推論</Term>という強力な仕組みがあり、
        <strong>初期値を見れば型を自動で当ててくれます</strong>。
        <code>const n = 42</code> と書けば、TypeScriptは何も書かなくても{" "}
        <code>n</code> を <code>number</code> 型だと理解します。
      </p>
      <CodeCompare
        js={`const n = 42;
const s = "hello";

// nもsもただの値。型の概念は実行時のtypeofまで現れない`}
        ts={`const n = 42;      // number と推論される
const s = "hello"; // string と推論される

// n はすでに number 扱いなので、次の行は実行前にエラーになる
n.toUpperCase(); // Error: number型に toUpperCase は存在しません`}
      />
      <p>
        つまりTypeScriptでは、
        <strong>推論が効く場所は書かず、意図を明示したい場所や推論できない場所だけ型を書く</strong>
        のが実務での基本方針です。書きすぎず、しかし守りは効く ― これがTypeScriptの心地よさです。
      </p>

      <Heading num="1.3">演算子</Heading>
      <p>
        値どうしを計算したり比べたりするのが<Term>演算子</Term>です。まずは
        <strong>算術演算子</strong>(<code>+</code> <code>-</code> <code>*</code>{" "}
        <code>/</code> <code>%</code>)。結果として新しい値を返すだけで、元の値は変わりません。
      </p>
      <CodeCompare
        js={`const sum = 3 + 4;      // => 7
const product = 6 * 7;  // => 42
const rest = 10 % 3;    // => 1(余り)`}
        ts={`const sum: number = 3 + 4;      // => 7
const product: number = 6 * 7;  // => 42
const rest: number = 10 % 3;    // => 1(余り)`}
      />
      <p>
        次に<strong>比較演算子</strong>です。2つの値を比べて、結果は必ず
        <code>true</code> か <code>false</code>、つまり{" "}
        <code>boolean</code> になります。TypeScriptでは、比較式の結果の型が{" "}
        <code>boolean</code> であることも見えています。
      </p>
      <CodeCompare
        js={`const a = 5 > 3;   // => true
const b = 2 === 2; // => true
const c = 4 !== 4; // => false`}
        ts={`const a: boolean = 5 > 3;   // => true
const b: boolean = 2 === 2; // => true
const c: boolean = 4 !== 4; // => false`}
      />
      <p>
        比較で特に大事なのが <code>===</code>(<Term>厳密等価</Term>)です。JavaScriptには
        <code>==</code> と <code>===</code>{" "}
        の2種類がありますが、<code>==</code>{" "}
        は比べる前に型をそろえようとする<Term>型強制</Term>を行うため、直感に反する結果を生みます。
        <strong>本書では常に <code>===</code> を使います。</strong>
      </p>
      <CodeCompare
        js={`console.log(5 == "5");  // => true (文字列"5"が数値に変換される)
console.log(5 === "5"); // => false (型が違うので不一致)

// 型強制は文字列連結でも起きる
console.log("5" + 3);   // => "53" (数値3が文字列になり連結)`}
        ts={`console.log(5 === "5"); // Error: number と string は比較の型が重ならない

// "5" + 3 は "53"。TSでも結果は同じだが、型は string と推論される
const joined: string = "5" + 3; // => "53"`}
      />
      <p>
        ここでも、
        <strong>TypeScriptは「そもそも噛み合わない比較」を実行前に警告</strong>
        してくれます。<code>{"5 === \"5\""}</code>{" "}
        のように型がまったく重ならない比較は、書いた時点で「それはいつも{" "}
        <code>false</code> では?」と気づかせてくれるのです。
      </p>
      <p>
        最後に<strong>論理演算子</strong>(<code>{"&&"}</code>{" "}
        <code>{"||"}</code> <code>!</code>)。複数の条件を組み合わせます。ここで大切なのは、これらの演算はどれも
        <strong>元の値を書き換えず、結果として新しい値を返すだけ</strong>
        ということ ― 副作用のない<Term>式</Term>です。式は「値を生む小さな計算」であり、関数型スタイルの基本部品になります。
      </p>
      <CodeCompare
        js={`const canEnter = age >= 18 && hasTicket;
const isFree = isChild || isSenior;
const isClosed = !isOpen;

// age や hasTicket は変化しない。新しい真偽値が作られるだけ`}
        ts={`const canEnter: boolean = age >= 18 && hasTicket;
const isFree: boolean = isChild || isSenior;
const isClosed: boolean = !isOpen;

// 3つとも boolean。式は値を返すだけで副作用を持たない`}
      />

      <Heading num="1.4">制御構文</Heading>
      <p>
        プログラムの流れを枝分かれさせたり繰り返したりするのが
        <Term>制御構文</Term>です。まずは条件分岐の <code>if</code> /{" "}
        <code>else</code>。条件が <code>true</code> のときと{" "}
        <code>false</code> のときで処理を分けます。
      </p>
      <CodeCompare
        js={`function judge(score) {
  if (score >= 80) {
    return "合格";
  } else {
    return "不合格";
  }
}

console.log(judge(90)); // => "合格"`}
        ts={`function judge(score: number): string {
  if (score >= 80) {
    return "合格";
  } else {
    return "不合格";
  }
}

console.log(judge(90)); // => "合格"`}
      />
      <p>
        分岐の条件になるのは、1.3で見た「<code>boolean</code>{" "}
        を返す式」です。TypeScriptでは、条件に使う値へ明示的に{" "}
        <code>boolean</code> 型を付けておくと、うっかり数値や文字列を条件にしてしまうミスを防げます。
      </p>
      <CodeCompare
        js={`const hasPermission = true;

if (hasPermission) {
  console.log("許可されています");
}`}
        ts={`const hasPermission: boolean = true;

// 条件は boolean であることが型で保証される
if (hasPermission) {
  console.log("許可されています");
}`}
      />
      <p>
        選択肢が3つ以上あるときは <code>switch</code>{" "}
        が読みやすくなります。1つの値を複数の候補と突き合わせ、一致した枝を実行します。
      </p>
      <CodeCompare
        js={`function toJapanese(day) {
  switch (day) {
    case "Mon":
      return "月曜";
    case "Tue":
      return "火曜";
    default:
      return "不明";
  }
}

console.log(toJapanese("Mon")); // => "月曜"`}
        ts={`function toJapanese(day: string): string {
  switch (day) {
    case "Mon":
      return "月曜";
    case "Tue":
      return "火曜";
    default:
      return "不明";
  }
}

console.log(toJapanese("Mon")); // => "月曜"`}
      />
      <p>
        ここで、関数型スタイルで特に重宝するのが
        <Term>三項演算子</Term>です。書き方は{" "}
        <code>{"条件 ? 値A : 値B"}</code>。<code>if</code>{" "}
        文が「処理を実行する命令」なのに対し、三項演算子は
        <strong>それ自体が1つの値になる式</strong>です。値になるので、そのまま{" "}
        <code>const</code> に入れられます。同じ判定を <code>if</code>{" "}
        版と三項版で書き比べてみましょう ― どちらも結果は同じです。
      </p>
      <CodeCompare
        js={`// if 版:いったん変数を用意して、後から書き込む
let label;
if (score >= 80) {
  label = "合格";
} else {
  label = "不合格";
}

// 三項版:式なので、そのまま const に入る
const label2 = score >= 80 ? "合格" : "不合格";`}
        ts={`// if 版
let label: string;
if (score >= 80) {
  label = "合格";
} else {
  label = "不合格";
}

// 三項版:結果は string と推論され、再代入も不要
const label2: string = score >= 80 ? "合格" : "不合格";`}
      />
      <p>
        三項版は <code>let</code> と再代入を使わずに済むため、値が
        <strong>いちど決まったら変わらない</strong>
        という不変の原則を保てます。本書ではこちらを優先します。
      </p>
      <p>
        最後は繰り返しの <code>for</code> / <code>while</code>{" "}
        です。これらは「カウンタを1つずつ進めながら処理を実行する」
        <Term>命令型</Term>の書き方です。まずは1から <code>n</code>{" "}
        までの合計を <code>for</code> で求めてみます。
      </p>
      <CodeCompare
        js={`function sum(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i; // total を毎回書き換える(命令型)
  }
  return total;
}

console.log(sum(5)); // => 15`}
        ts={`function sum(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i; // total を毎回書き換える(命令型)
  }
  return total;
}

console.log(sum(5)); // => 15`}
      />
      <p>
        この <code>for</code> 版は、<code>total</code> と{" "}
        <code>i</code>{" "}
        という変数を何度も書き換えています。動きはしますが、本書が目指す「値を書き換えない」スタイルとは逆向きです。参考までに、まったく同じ結果を
        <strong>書き換えなしの宣言的なやり方</strong>で書くとこうなります。
      </p>
      <CodeCompare
        js={`// 1..n の配列を作り、reduce で畳み込む(関数型)
function sum(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
    .reduce((acc, x) => acc + x, 0);
}

console.log(sum(5)); // => 15(for版と同じ)`}
        ts={`function sum(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1)
    .reduce((acc, x) => acc + x, 0);
}

console.log(sum(5)); // => 15(for版と同じ)`}
      />
      <p>
        まだ <code>reduce</code>{" "}
        の中身は分からなくて構いません。ここで感じ取ってほしいのは、
        <strong>「変数を書き換える命令の列」から「値を変換する式」へ</strong>
        という発想の転換です。<code>for</code> や{" "}
        <code>while</code>{" "}
        は仕組みを理解するために本書でも紹介しますが、実際のデータ処理では第2章「
        <Link href="/dev/language/functions">関数</Link>」以降で学ぶ{" "}
        <code>map</code> ・ <code>filter</code> ・{" "}
        <code>reduce</code> に置き換えていきます。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>値とリテラル</h4>
          <p>
            数値・文字列・真偽値・<code>null</code>・<code>undefined</code>{" "}
            が基本の値。種類は <code>typeof</code> で確かめられます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>不変を基本に</h4>
          <p>
            再代入しない <code>const</code>{" "}
            を使い、書き換えるのではなく新しい値を作ります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型は実行前の安全網</h4>
          <p>
            TypeScriptの型注釈と型推論が、食い違いを実行する前に知らせ、補完も効かせてくれます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>式で分岐する</h4>
          <p>
            <code>===</code> で厳密に比べ、三項演算子で
            <strong>値を返す分岐</strong>を書くのが関数型の基本です。
          </p>
        </Card>
      </CardGrid>
      <p>
        値という部品と、それを分岐・比較する道具がそろいました。次章「
        <Link href="/dev/language/functions">関数</Link>
        」では、これらの値を受け取って新しい値を返す<Term>関数</Term>
        を学びます。関数こそがプログラムの中心であり、本書の関数型スタイルの主役です。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
