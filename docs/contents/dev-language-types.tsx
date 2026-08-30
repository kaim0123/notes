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
  Aside,
  CodeCompare,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "型を使いこなす" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第4章 型を使いこなす</h1>
        <Lead>
          前章「<Link href="/dev/language/data">データの変換</Link>」では、オブジェクトと配列を不変に扱い、
          <code>map</code>・<code>filter</code>・<code>reduce</code>
          で変換する書き方を身につけました。この章では、そのデータに
          <strong>より正確な型</strong>を与えていきます。
          「文字列」ではなく「<code>{'"success"'}</code> か <code>{'"error"'}</code> のどちらか」、
          「オブジェクト」ではなく「成功したデータ、または失敗の情報」
          ― こうしたきめ細かな型を扱えると、TypeScriptは
          <strong>ありえない状態を書いた瞬間に</strong>教えてくれます。関数型の考え方(判別可能Union・純粋関数・不変)と型が、ここでひとつに噛み合います。まずは素直なJavaScriptで理解し、同じ結果になるTypeScriptではどう書くのかを、つねに書き比べながら進めます。
        </Lead>
      </Hero>

      <Heading num="4.1">リテラル型と判別可能Union</Heading>
      <p>
        これまで型といえば <code>string</code> や <code>number</code>
        のような「種類」でした。ここからは、
        <strong>「その中でも、この特定の値だけ」</strong>という、もっと狭い型を扱います。たとえば処理の状態を表すとき、
        <code>string</code> だと <code>{'"seccess"'}</code>
        のようなタイプミスも通ってしまいます。まずはJavaScriptで、状態に応じてメッセージを返す関数を書いてみましょう。
      </p>
      <CodeCompare
        js={`function label(status) {
  switch (status) {
    case "success":
      return "成功しました";
    case "error":
      return "失敗しました";
    default:
      return "不明な状態";
  }
}

console.log(label("success")); // => "成功しました"
console.log(label("errr"));    // => "不明な状態"(タイプミスに気づけない)`}
        ts={`type Status = "success" | "error";

function label(status: Status): string {
  switch (status) {
    case "success":
      return "成功しました";
    case "error":
      return "失敗しました";
  }
}

console.log(label("success")); // => "成功しました"
// label("errr") は Error: "errr" は Status 型ではありません(実行前に判明)`}
      />
      <Analogy label="🔷 ここからTSが加わる">
        <code>{'"success" | "error"'}</code> のように、
        <strong>特定の値そのものを型にできる</strong>のが
        <Term>リテラル型</Term>です。<code>|</code>(縦棒)は「または」を表し、
        <code>Status</code> 型は「<code>{'"success"'}</code> か
        <code>{'"error"'}</code> のどちらかしか入れられない」ことを意味します。数値でも
        <code>{"0 | 1 | 2"}</code> のように書けます。取りうる値を型で絞るので、タイプミスの
        <code>{'"errr"'}</code> は<strong>書いた時点で赤い波線</strong>になります。
      </Analogy>
      <p>
        リテラル型が本領を発揮するのが、
        <Term>判別可能Union(タグ付きUnion)</Term>です。これは
        <strong>共通の目印(タグ)を持つオブジェクトの型を <code>|</code> でつないだもの</strong>で、関数型では「取りうる状態を型で列挙する」データ設計(いわゆる代数的データ型・
        <Term>ADT</Term>)の基本形になります。ここでは「成功なら数値を持ち、失敗ならメッセージを持つ」結果を表してみます。まずはJavaScriptから。
      </p>
      <CodeCompare
        js={`function describe(result) {
  switch (result.kind) {
    case "ok":
      return \`値は \${result.value}\`;
    case "err":
      return \`エラー: \${result.message}\`;
    default:
      return "不明";
  }
}

console.log(describe({ kind: "ok", value: 42 }));        // => "値は 42"
console.log(describe({ kind: "err", message: "失敗" })); // => "エラー: 失敗"`}
        ts={`type Result =
  | { kind: "ok"; value: number }
  | { kind: "err"; message: string };

function describe(result: Result): string {
  switch (result.kind) {
    case "ok":
      return \`値は \${result.value}\`;     // ここで result.value は number
    case "err":
      return \`エラー: \${result.message}\`; // ここで result.message は string
  }
}

console.log(describe({ kind: "ok", value: 42 }));        // => "値は 42"
console.log(describe({ kind: "err", message: "失敗" })); // => "エラー: 失敗"`}
      />
      <p>
        実行結果はJavaScript版とまったく同じです。違うのは、TypeScriptが
        <code>kind</code> という共通のタグを見て、
        <strong>それぞれの枝の中でオブジェクトの正体を特定してくれる</strong>点です。
        <code>{'case "ok"'}</code> の中では <code>result</code> は必ず
        <code>{'{ kind: "ok"; value: number }'}</code> なので、
        <code>result.value</code> に補完が効き、存在しない
        <code>result.message</code> を書けばエラーになります。これが
        <code>switch</code> による<strong>パターンマッチ風</strong>の処理です。
      </p>
      <Aside label="網羅性チェック">
        判別可能Unionに新しい枝(たとえば <code>{'{ kind: "loading" }'}</code>)を後から足すと、
        <code>switch</code> の <code>return</code> が足りなくなった箇所をTypeScriptが指摘してくれます。
        <strong>「対応漏れ」をコンパイル時に発見できる</strong>ことこそ、Union型の最大の価値です。
      </Aside>

      <Heading num="4.2">型推論とNarrowing</Heading>
      <p>
        TypeScriptは、こちらが型を書かなくても<strong>初期値や処理内容から型を推し量ります</strong>。これが第1章でも触れた
        <Term>型推論</Term>です。そのうえで、<code>if</code> や
        <code>switch</code> による分岐の中では、
        <strong>その条件で確実に言えることに合わせて型をさらに狭めて</strong>くれます。この絞り込みを
        <Term>Narrowing</Term>と呼びます。まずは
        <code>{"number | string"}</code> のどちらかを受け取る関数で見てみましょう。
      </p>
      <CodeCompare
        js={`function format(value) {
  if (typeof value === "number") {
    return value.toFixed(2); // 数値として扱う
  }
  return value.toUpperCase(); // それ以外は文字列として扱う
}

console.log(format(3.1));  // => "3.10"
console.log(format("hi")); // => "HI"`}
        ts={`function format(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2);  // この分岐で value は number に絞られる
  }
  return value.toUpperCase(); // ここでは value は string に絞られる
}

console.log(format(3.1));  // => "3.10"
console.log(format("hi")); // => "HI"`}
      />
      <p>
        実行結果は同じですが、TypeScript版では
        <code>{'typeof value === "number"'}</code> という条件を境に、
        <strong>ブロックの中で <code>value</code> の型が切り替わります</strong>。
        <code>if</code> の中では <code>number</code> なので
        <code>toFixed</code> の補完が効き、それを抜けた後は
        <code>string</code> なので <code>toUpperCase</code> が使えます。逆に、
        <code>string</code> に対して <code>toFixed</code>
        を呼ぶようなミスは、その分岐の中では書けなくなります。
      </p>
      <p>
        絞り込みの手がかりは <code>typeof</code> だけではありません。オブジェクトなら
        <strong>そのプロパティが存在するか</strong>を調べる <code>in</code>
        演算子でも絞り込めますし、4.1の判別可能Unionでは
        <code>kind</code> の値そのものが手がかりでした。図形の面積を求める例で
        <code>in</code> を使ってみます。
      </p>
      <CodeCompare
        js={`function area(shape) {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2;
  }
  return shape.width * shape.height;
}

console.log(area({ radius: 10 }).toFixed(1)); // => "314.2"
console.log(area({ width: 3, height: 4 }));   // => 12`}
        ts={`type Circle = { radius: number };
type Rect = { width: number; height: number };

function area(shape: Circle | Rect): number {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2; // この分岐で shape は Circle
  }
  return shape.width * shape.height;    // ここでは shape は Rect
}

console.log(area({ radius: 10 }).toFixed(1)); // => "314.2"
console.log(area({ width: 3, height: 4 }));   // => 12`}
      />
      <p>
        TypeScriptだけが得られる価値は、
        <strong>分岐の中で「今この値が何であるか」が型として保証され、補完と検査が効く</strong>ことです。JavaScriptでは同じ
        <code>if</code> を書いても、<code>shape.radius</code>
        が本当に存在するかは実行してみるまで分かりません。
      </p>

      <Heading num="4.3">型アサーション(as)と as const</Heading>
      <p>
        ときには、開発者のほうがコンパイラより値の中身を知っている場面があります。そんなときに
        <strong>「この値はこの型だと見なして」</strong>とコンパイラに言い切るのが
        <Term>型アサーション</Term>、<code>as</code> です。代表例が、型が
        <code>any</code> になりがちな <code>JSON.parse</code> の結果です。
      </p>
      <CodeCompare
        js={`const data = JSON.parse('{"id":1}');
console.log(data.id); // => 1

// 中身が違っても実行するまで気づけない
const wrong = JSON.parse('{"id":1}');
console.log(wrong.name); // => undefined`}
        ts={`// as: 「この値は { id: number } だと見なせ」と言い切る
const data = JSON.parse('{"id":1}') as { id: number };
console.log(data.id); // => 1(実行結果はJSと同じ)

// 危険: 実際の中身と食い違っても as は通ってしまう
const wrong = JSON.parse('{"id":1}') as { name: string };
console.log(wrong.name.toUpperCase()); // 実行時エラー: nameは無い`}
      />
      <p>
        <code>as</code> は<strong>型チェックを黙らせる強制力</strong>を持つため、間違った型を言い切ると、そのウソを信じて補完まで出てしまい、かえって危険です。
        <code>as</code> は<strong>本当に必要なときだけ、慎重に</strong>使います。一方で、日常的に安全に使える便利な
        <code>as</code> があります。それが <code>{"as const"}</code> です。
      </p>
      <Analogy label="🔷 ここからTSが加わる">
        値のうしろに <code>{"as const"}</code> を付けると、その値は
        <strong>「二度と書き換えない、この具体的な値そのもの」</strong>として型が固定されます。配列はふつう
        <code>string[]</code> のように推論されますが、<code>{"as const"}</code>
        を付けると<strong>順番と要素まで固定された<Term>タプル</Term></strong>になり、そこからリテラルUnion型を取り出せます。関数型で定数を定義するときに特に役立ちます。
      </Analogy>
      <CodeCompare
        js={`const routes = ["home", "about", "contact"];
// routes は普通の配列。値も要素も後から書き換え可能
routes.push("blog"); // 通ってしまう

const point = { x: 1, y: 2 };
point.x = 10; // 通ってしまう`}
        ts={`const routes = ["home", "about", "contact"] as const;
// 型は readonly ["home", "about", "contact"] に固定
// routes.push("blog") は Error: readonly なので変更不可

type Route = (typeof routes)[number]; // "home" | "about" | "contact"

const point = { x: 1, y: 2 } as const;
// { readonly x: 1; readonly y: 2 } に固定
// point.x = 10 は Error: readonly なので再代入不可`}
      />
      <p>
        <code>routes</code> の実行時の中身はJavaScript版と同じ配列ですが、TypeScript版では
        <strong>要素が固定され、そこから <code>Route</code> 型
        (<code>{'"home" | "about" | "contact"'}</code>)を自動生成できます</strong>。値の定義と型定義が一本化されるので、定数を追加すれば型も自動で追随します。これは4.1のリテラルUnionを
        <strong>手で書かずに導く</strong>実務的なテクニックです。
      </p>

      <Heading num="4.4">Result型パターン ― 失敗を値として返す</Heading>
      <p>
        処理が失敗しうるとき、JavaScriptの伝統的なやり方は
        <code>throw</code> で例外を投げ、呼び出し側が
        <code>try/catch</code> で受け止めることです。まずはその形を見てみましょう。文字列を年齢(数値)に変換する関数です。
      </p>
      <CodeCompare
        js={`function parseAge(input) {
  const n = Number(input);
  if (Number.isNaN(n)) throw new Error("数値ではありません");
  return n;
}

try {
  console.log(parseAge("30"));  // => 30
  console.log(parseAge("abc")); // ここで throw され、下へ飛ぶ
} catch (e) {
  console.log("失敗:", e.message); // => "失敗: 数値ではありません"
}`}
        ts={`function parseAge(input: string): number {
  const n = Number(input);
  if (Number.isNaN(n)) throw new Error("数値ではありません");
  return n;
}

try {
  console.log(parseAge("30"));  // => 30
  console.log(parseAge("abc")); // ここで throw され、下へ飛ぶ
} catch (e) {
  console.log("失敗:", (e as Error).message); // => "失敗: 数値ではありません"
}`}
      />
      <p>
        <code>throw</code> は手軽ですが、
        <strong>関数の型(戻り値 <code>number</code>)を見ても「失敗しうる」ことが分かりません</strong>。呼び出し側は
        <code>try/catch</code> を書き忘れても型エラーにならず、失敗の可能性が型に現れないのです。
      </p>
      <p>
        そこで関数型では、<strong>成功と失敗を<Term>値</Term>として返す</strong>やり方を使います。4.1で作った判別可能Unionの出番です。純粋関数は
        <code>throw</code> せず、<code>{'{ kind: "ok" }'}</code> か
        <code>{'{ kind: "err" }'}</code> のどちらかを必ず返します。これが
        <Term>Result型パターン</Term>です。
      </p>
      <CodeCompare
        js={`// throw せず、成功/失敗を「値」で返す純粋関数
function parseAge(input) {
  const n = Number(input);
  if (Number.isNaN(n)) return { kind: "err", message: "数値ではありません" };
  return { kind: "ok", value: n };
}

const r = parseAge("abc");
if (r.kind === "ok") {
  console.log(r.value);
} else {
  console.log("失敗:", r.message); // => "失敗: 数値ではありません"
}`}
        ts={`type Result<T> =
  | { kind: "ok"; value: T }
  | { kind: "err"; message: string };

function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (Number.isNaN(n)) return { kind: "err", message: "数値ではありません" };
  return { kind: "ok", value: n };
}

const r = parseAge("abc");
if (r.kind === "ok") {
  console.log(r.value);          // この分岐で r.value は number
} else {
  console.log("失敗:", r.message); // => "失敗: 数値ではありません"
}`}
      />
      <p>
        呼び出し側が扱う値を比べてみてください。<code>try/catch</code> 版では
        <code>catch</code> に飛んでくる値の型が曖昧(TypeScriptでは
        <code>unknown</code>)なのに対し、Result版では
        <strong>戻り値の <code>Result&lt;number&gt;</code> がそのまま
        「成功か失敗か」を型で表現</strong>しています。4.2のNarrowingが効くので、
        <code>{'r.kind === "ok"'}</code> の分岐でだけ <code>r.value</code> に、
        <code>else</code> の分岐でだけ <code>r.message</code> に安全にアクセスできます。TypeScriptだけの価値は、
        <strong>失敗の扱い忘れをコンパイル時に防げる</strong>ことです。
      </p>
      <Aside label="この先の再登場">
        Result型は、失敗しうる処理をきれいに扱うための入口です。実際の通信のように必ず失敗が起こりうる場面 ―
        第7章「<Link href="/dev/language/async">非同期処理</Link>」の
        <code>Promise</code> や <code>async/await</code> ― でも、この
        「失敗を値として返す」考え方が再び登場します。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>リテラル型と判別可能Union</h4>
          <p>
            <code>{'"success" | "error"'}</code> のように値そのものを型にし、
            <code>kind</code> タグ付きのオブジェクトを <code>|</code>
            でつないで「取りうる状態」を型で列挙します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Narrowingで絞り込む</h4>
          <p>
            <code>typeof</code>・<code>in</code>・<code>kind</code>
            を手がかりに、分岐の中で型が自動で狭まり、補完と検査が効きます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>as は慎重に、as const は積極的に</h4>
          <p>
            <code>as</code> は型チェックを黙らせる劇薬。
            <code>{"as const"}</code> は値をタプル/リテラルに固定し、定数定義を安全にします。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>失敗を値として返す</h4>
          <p>
            <code>throw</code> の代わりにResult型を返せば、成功/失敗が型に現れ、扱い忘れを実行前に防げます。
          </p>
        </Card>
      </CardGrid>
      <p>
        リテラル型・判別可能Union・Narrowing・<code>{"as const"}</code>・Result型
        ― 関数型のデータ設計を支える型の道具がそろいました。次章「
        <Link href="/dev/language/classes">クラスとプロトタイプ</Link>
        」では、これまで関数とオブジェクトで組み立ててきたものを、
        <Term>クラス</Term>という別の書き方で見ていきます。既存のコードやライブラリを読むための知識として、ファクトリ関数との対比で押さえましょう。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
