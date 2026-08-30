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

export const metadata: Metadata = { title: "Node.js と標準ライブラリ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第10章 Node.js と標準ライブラリ</h1>
        <Lead>
          前章「
          <Link href="/dev/language/generics">ジェネリクスとユーティリティ型</Link>
          」では、型そのものを部品のように組み立てる方法を学びました。この章では視点を変え、書いたコードを
          <strong>複数のファイルに分けて組み立てる仕組み</strong>(モジュール)と、言語に最初から備わっている
          <Term>標準ライブラリ</Term>を見ていきます。どちらも「小さな関数を組み合わせて大きな処理を作る」という、本書がずっと大切にしてきた関数型の発想と地続きです。ここでも、まず素直なJavaScriptで理解し、同じ結果になるTypeScriptではどう書くのかを書き比べながら進めます。
        </Lead>
      </Hero>

      <Heading num="10.1">Node.js の基礎</Heading>
      <p>
        <Term>Node.js</Term>
        は、ブラウザの外でJavaScriptを動かすための<Term>ランタイム</Term>(実行環境)です。ブラウザが持たない「ファイルを読み書きする」といった機能を備えており、サーバーや開発ツールを書くときに使います。ランタイムそのものの詳しい話は別ページ「
        <Link href="/dev/runtime">ランタイム</Link>
        」に譲り、ここでは<strong>コードを部品に分けて組み立てる</strong>ための最小限を押さえます。
      </p>

      <p>
        まず<Term>モジュール</Term>です。プログラムが大きくなると、すべてを1つのファイルに書くのは無理があります。そこでファイルを分割し、片方のファイルで作った関数を{" "}
        <code>export</code>(公開)し、もう片方で <code>import</code>
        (取り込み)して使います。<strong>モジュールとは、要するに「関数の export / import」</strong>だと考えて構いません。まずは、公開する側のファイルを見てみましょう。
      </p>
      <p>
        次の <code>math.js</code> と <code>math.ts</code>
        は、同じ2つの関数を公開しています。関数の前に <code>export</code>{" "}
        を付けて名前ごと公開する書き方を <Term>named export</Term>
        と呼びます。JavaScriptとTypeScriptの違いは、いつものように
        <strong>引数と戻り値の型注釈だけ</strong>です。
      </p>
      <CodeCompare
        js={`// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}`}
        ts={`// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}`}
      />
      <p>
        そして、この関数を<strong>使う側</strong>のコードは、JavaScriptでもTypeScriptでも
        <strong>まったく同じ</strong>です。<code>import</code>{" "}
        で必要な関数だけを名前で取り込み、あとは普通に呼び出すだけです。
      </p>
      <CodeCompare
        js={`// main.js から math.js の関数を取り込む
import { add, multiply } from "./math.js";

console.log(add(2, 3));      // => 5
console.log(multiply(4, 5)); // => 20`}
        ts={`// main.ts でも import の書き方は同一
import { add, multiply } from "./math.js";

console.log(add(2, 3));      // => 5
console.log(multiply(4, 5)); // => 20`}
      />
      <p>
        利用側が完全に同じであることに注目してください。<code>add</code> や{" "}
        <code>multiply</code>
        を呼ぶコードは、公開元がJavaScriptで書かれていようとTypeScriptで書かれていようと変わりません。TypeScriptが加えているのは、あくまで
        <strong>公開元の関数に付いた型情報</strong>
        だけです。そのおかげで、取り込んだ側で <code>{'add(2, "3")'}</code>
        のように間違った型を渡すと、実行する前にエラーとして知らせてくれます。
      </p>
      <Aside label="拡張子に注意">
        import のパスは、TypeScriptのソース(<code>math.ts</code>
        )を取り込む場合でも <code>{'"./math.js"'}</code>{" "}
        と、変換後のJavaScriptの拡張子で書くのが現在のNode.jsの流儀です。こうしておくと、利用側のコードをJavaScriptとTypeScriptで一字一句そろえられます。
      </Aside>

      <p>
        次に<strong>ファイルの読み書き</strong>です。ファイル操作はNode.jsが用意する
        <code>node:fs</code>{" "}
        という標準モジュールが担います。ただし、ファイルを読む・書くという行為は
        <strong>プログラムの外の世界に触れる<Term>副作用(I/O)</Term></strong>
        です。本書の方針どおり、こうした副作用は
        <strong>関数の境界(多くは <code>async</code> 関数)にまとめて閉じ込め</strong>
        、読み込んだあとの処理は純粋な変換だけにするのが読みやすい書き方です。
      </p>
      <CodeCompare
        js={`import { readFile } from "node:fs/promises";

// ファイル読み込みは副作用。async関数の中に閉じ込める
async function loadConfig() {
  const text = await readFile("./config.json", "utf-8");
  return JSON.parse(text); // 読んだ後は純粋な変換だけ
}`}
        ts={`import { readFile } from "node:fs/promises";

// 戻り値は「いつか設定オブジェクトを返す」= Promise<Config>
async function loadConfig(): Promise<Config> {
  const text = await readFile("./config.json", "utf-8");
  return JSON.parse(text) as Config;
}`}
      />
      <p>
        TypeScript版では、この関数が最終的に何を返すのかを{" "}
        <code>{"Promise<Config>"}</code>{" "}
        という戻り値型で宣言できます。読み込んだ設定をどう扱うのかが、実行しなくても呼び出し側から見えるようになるのがTypeScriptだけの利点です。
      </p>

      <p>
        最後に、こうしたプロジェクトの土台になるのが <code>package.json</code>{" "}
        です。これはプロジェクトの名前・依存ライブラリ・実行コマンドなどを記録した設定ファイルで、<code>{'"type": "module"'}</code>{" "}
        を書いておくと、この章で使ってきた <code>import</code> /{" "}
        <code>export</code>{" "}
        の構文(<Term>ESモジュール</Term>)がそのまま使えます。TypeScriptプロジェクトではこれに加えて{" "}
        <code>tsconfig.json</code>{" "}
        という設定ファイルを置き、型チェックのルールや、<code>.ts</code> を{" "}
        <code>.js</code>{" "}
        へ変換する方法を指定します。細かな設定は今は覚えなくて構いません。
      </p>
      <Analogy label="💡 たとえるなら">
        <code>package.json</code>{" "}
        は、料理でいう「材料リストと手順書」のようなものです。どんな材料(ライブラリ)を使い、どのコマンドで調理するのかが1枚にまとまっているので、他の人が同じ環境をそのまま再現できます。
      </Analogy>

      <Heading num="10.2">JavaScript 標準ライブラリ</Heading>
      <p>
        JavaScriptには、<code>import</code>{" "}
        しなくても最初から使える便利な道具がいくつも組み込まれています。これを
        <Term>標準ライブラリ</Term>と呼びます。ここでは特によく使う{" "}
        <code>Math</code>・<code>JSON</code>・<code>Date</code>・
        <code>RegExp</code>{" "}
        を紹介します。方針として、<strong>元の値を書き換えない(副作用のない)API</strong>
        から先に見ていきます。そして大事な点として、これらの標準APIは
        <strong>呼び出すコード自体はJavaScriptとTypeScriptで完全に同じ</strong>
        です。TypeScript版で増えるのは、受け取った結果に付ける戻り値の型注釈だけです。
      </p>

      <p>
        まず <code>Math</code> です。数値計算のための関数が集まったオブジェクトで、
        <code>Math.max</code> や <code>Math.round</code>{" "}
        などはどれも<strong>引数を受け取って新しい数値を返すだけ</strong>
        の純粋な関数です。元の値をこっそり書き換えたりしません。
      </p>
      <CodeCompare
        js={`const largest = Math.max(3, 8, 1);  // => 8
const rounded = Math.round(2.7);    // => 3
const power = Math.pow(2, 10);      // => 1024`}
        ts={`const largest: number = Math.max(3, 8, 1); // => 8
const rounded: number = Math.round(2.7);   // => 3
const power: number = Math.pow(2, 10);     // => 1024`}
      />
      <p>
        呼び出し方が一字一句同じであることに注目してください。TypeScriptは{" "}
        <code>Math.round</code> が <code>number</code>{" "}
        を返すことをあらかじめ知っているので、返ってきた値に対して数値以外のメソッドを呼ぶと実行前に警告してくれます。
      </p>

      <p>
        次に <code>JSON</code>{" "}
        です。オブジェクトと文字列を相互に変換する道具で、<code>JSON.parse</code>
        (文字列 → オブジェクト)と <code>JSON.stringify</code>
        (オブジェクト → 文字列)の2つが中心です。どちらも
        <strong>元の値には触れず、変換した新しい値を返すだけ</strong>
        の純粋な関数です。前の節でファイルを読んだあと{" "}
        <code>JSON.parse</code> を使ったのも、この道具でした。
      </p>
      <CodeCompare
        js={`const json = '{"id":1,"name":"Alice"}';

const user = JSON.parse(json);     // 文字列 → オブジェクト
console.log(user.name);            // => "Alice"

const text = JSON.stringify(user); // オブジェクト → 文字列
console.log(text);                 // => '{"id":1,"name":"Alice"}'`}
        ts={`type User = { id: number; name: string };

const json = '{"id":1,"name":"Alice"}';

// parse の結果に User 型を与えると、以降 name などが型付きで扱える
const user = JSON.parse(json) as User;
console.log(user.name);            // => "Alice"

const text: string = JSON.stringify(user);
console.log(text);                 // => '{"id":1,"name":"Alice"}'`}
      />
      <p>
        JavaScriptの <code>JSON.parse</code>{" "}
        は「何が返ってくるか分からない」値を返します。TypeScriptでは{" "}
        <code>as User</code>{" "}
        のように「これはUser型だ」と教えることで、そのあと <code>user.name</code>{" "}
        などを型の保証つきで安全に扱えるようになります ―
        これが同じ実行結果に対してTypeScriptだけが与えてくれる安心感です。
      </p>

      <p>
        <code>Date</code>{" "}
        は日付と時刻を扱う道具です。ただし1つ注意があります。引数なしの{" "}
        <code>new Date()</code>{" "}
        は<strong>「今この瞬間の時刻」を読み取る</strong>ため、呼ぶたびに結果が変わる
        <Term>副作用</Term>を含みます。副作用は境界にまとめる、という方針からすると、
        <strong>現在時刻の取得はできるだけ関数の入口で一度だけ</strong>
        行い、そのあとの計算は<strong>渡された日付をもとにした純粋な変換</strong>
        にするのがおすすめです。次の例は、日付を<strong>引数で受け取る</strong>
        ことで、いつ実行しても同じ結果になる純粋な関数にしています。
      </p>
      <CodeCompare
        js={`// 日付を引数で受け取れば、結果は常に同じ(純粋)
function toYear(date) {
  return date.getUTCFullYear();
}

const d = new Date("2026-07-20T00:00:00Z");
console.log(toYear(d)); // => 2026`}
        ts={`function toYear(date: Date): number {
  return date.getUTCFullYear();
}

const d = new Date("2026-07-20T00:00:00Z");
console.log(toYear(d)); // => 2026`}
      />

      <p>
        最後は <code>RegExp</code>(<Term>正規表現</Term>
        )です。文字列が「ある決まったパターンに一致するか」を調べる道具で、
        <code>/.../</code>{" "}
        で囲んで書きます。<code>test</code>{" "}
        メソッドは一致するかどうかを <code>true</code> / <code>false</code>{" "}
        で返すだけの純粋な判定関数です。
      </p>
      <CodeCompare
        js={`// 「数字3桁 - 数字4桁」の郵便番号パターン
const zip = /^\\d{3}-\\d{4}$/;

console.log(zip.test("123-4567")); // => true
console.log(zip.test("12-345"));   // => false`}
        ts={`const zip = /^\\d{3}-\\d{4}$/;

// test の戻り値は boolean であることが型でわかる
const ok: boolean = zip.test("123-4567"); // => true
const ng: boolean = zip.test("12-345");   // => false`}
      />
      <p>
        呼び出しコードはここでも完全に同じで、TypeScript版が加えているのは「
        <code>test</code> の結果は <code>boolean</code>{" "}
        である」という型の注釈だけです。これらの標準APIはすべて、
        <strong>引数を受け取って新しい値を返す小さな純粋関数</strong>
        として理解しておくと、<code>map</code> や <code>filter</code>{" "}
        と組み合わせて自然につながっていきます。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>モジュールは関数の公開と取り込み</h4>
          <p>
            <code>export</code> で関数を公開し、<code>import</code>{" "}
            で取り込みます。利用側のコードはJavaScriptでもTypeScriptでも同じです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>I/O は境界にまとめる</h4>
          <p>
            ファイルの読み書きは副作用です。<code>async</code>{" "}
            関数の中に閉じ込め、読んだあとは純粋な変換だけにします。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>標準ライブラリの純粋なAPI</h4>
          <p>
            <code>Math</code>・<code>JSON</code>・<code>RegExp</code>{" "}
            は値を書き換えず新しい値を返します。呼び出しコードはJS/TSで同一です。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>TSが足すのは型注釈だけ</h4>
          <p>
            標準APIの結果に戻り値型を付けたり、<code>JSON.parse</code>{" "}
            の結果に型を与えたりして、同じ実行結果をより安全に扱えます。
          </p>
        </Card>
      </CardGrid>
      <p>
        これで、言語の基本から型、実行の仕組み、ブラウザやNode.jsまでをひととおり見終えました。次の「
        <Link href="/dev/language/appendix">付録</Link>
        」では、ここまで登場した用語の整理や、「JavaScriptでは動くがTypeScriptが指摘してくれる」型エラーの早見表、命令型・関数型・TS型付きの書き方対照表をまとめます。学んだことを振り返り、いつでも引ける手引きとして活用してください。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
