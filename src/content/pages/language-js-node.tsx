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

export const metadata: Metadata = { title: "Node.js と標準ライブラリ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>Node.js と標準ライブラリ</h1>
        <Lead>
          ここでは視点を変え、書いたコードを<Term>複数のファイルに分けて組み立てる仕組み</Term>(モジュール)と、言語に最初から備わっている<Term>標準ライブラリ</Term>を見ていきます。どちらも「小さな関数を組み合わせて大きな処理を作る」という、ここまで大切にしてきた関数型の発想と地続きです。
        </Lead>
      </Hero>

      <Heading num="01">モジュール ― 関数の公開と取り込み</Heading>
      <p>
        <Term>Node.js</Term>は、ブラウザの外でJavaScriptを動かすための<Link href="/language/runtime">ランタイム</Link>です。プログラムが大きくなると、すべてを1つのファイルに書くのは無理があります。そこでファイルを分割し、片方で作った関数を<code>export</code>し、もう片方で<code>import</code>して使います。<Term>モジュールとは、要するに関数のexportとimport</Term>だと考えて構いません。
      </p>

      <DiagramFrame
        slug="language-js-modules"
        aspect="640 / 280"
        caption="モジュールのexportとimportの関係。左のmath.tsはadd・multiplyをexportで公開し、それぞれに引数と戻り値の型が付いている。右のmain.tsはimportで必要な関数だけを名前で取り込む。中央の矢印は、値としての関数と、その関数に付いた型情報の両方が一緒に運ばれることを示す。取り込む側のコードはJavaScriptでもTypeScriptでも一字一句同じで、TypeScriptが加えているのは公開元の型情報だけ。"
      />

      <pre>
        <code>{`// math.ts ― 公開する側
export function add(a: number, b: number): number {
  return a + b;
}
export function multiply(a: number, b: number): number {
  return a * b;
}

// main.ts ― 取り込む側(JavaScript でも書き方は同一)
import { add, multiply } from "./math.js";

console.log(add(2, 3));      // 5
add(2, "3");                 // Error: 実行前に分かる`}</code>
      </pre>

      <Aside label="import のパスは .js">
        importのパスは、TypeScriptのソース(<code>math.ts</code>)を取り込む場合でも<code>{'"./math.js"'}</code>と、変換後のJavaScriptの拡張子で書くのが現在のNode.jsの流儀です。こうしておくと、利用側のコードをJavaScriptとTypeScriptで一字一句そろえられます。
      </Aside>

      <Heading num="02">ファイル操作 ― I/Oは境界に閉じ込める</Heading>
      <p>
        ファイル操作は<code>node:fs</code>という標準モジュールが担います。ただし、ファイルを読む・書くという行為はプログラムの外の世界に触れる<Term>副作用(I/O)</Term>です。副作用は関数の境界にまとめて閉じ込め、読み込んだあとの処理は純粋な変換だけにするのが読みやすい書き方です。
      </p>

      <pre>
        <code>{`import { readFile } from "node:fs/promises";

// 副作用は async 関数の中に閉じ込める
async function loadConfig(): Promise<Config> {
  const text = await readFile("./config.json", "utf-8");
  return JSON.parse(text) as Config; // 読んだ後は純粋な変換だけ
}`}</code>
      </pre>

      <p>
        戻り値型<code>{"Promise<Config>"}</code>を宣言しておけば、この関数が最終的に何を返すのかが、実行しなくても呼び出し側から見えます。
      </p>

      <p>
        プロジェクトの土台になるのが<code>package.json</code>です。名前・依存ライブラリ・実行コマンドを記録した設定ファイルで、<code>{'"type": "module"'}</code>を書いておくと、ここで使っている<code>import</code>/<code>export</code>の構文(<Term>ESモジュール</Term>)がそのまま使えます。TypeScriptではこれに加えて<code>tsconfig.json</code>を置き、型チェックのルールや変換方法を指定します。
      </p>

      <Analogy label="💡 たとえるなら">
        <code>package.json</code>は、料理でいう「材料リストと手順書」です。どんな材料(ライブラリ)を使い、どのコマンドで調理するのかが1枚にまとまっているので、他の人が同じ環境をそのまま再現できます。
      </Analogy>

      <Heading num="03">標準ライブラリ ― 純粋なものから使う</Heading>
      <p>
        JavaScriptには、<code>import</code>しなくても最初から使える道具が組み込まれています。これを<Term>標準ライブラリ</Term>と呼びます。方針として、<Term>元の値を書き換えない(副作用のない)API</Term>から先に押さえます。これらは呼び出すコード自体がJavaScriptとTypeScriptで完全に同じで、増えるのは戻り値の型注釈だけです。
      </p>

      <table>
        <thead>
          <tr>
            <th>道具</th>
            <th>性質</th>
            <th>使いどころ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>Math</code>
            </td>
            <td>純粋 ― 引数から新しい数値を返すだけ</td>
            <td>
              <code>Math.max</code>・<code>Math.round</code>・<code>Math.pow</code>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>JSON</code>
            </td>
            <td>純粋 ― 元の値に触れず変換した値を返す</td>
            <td>
              <code>JSON.parse</code>(文字列 → オブジェクト)・<code>JSON.stringify</code>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>Date</code>
            </td>
            <td>
              引数付きなら純粋。<code>new Date()</code>は現在時刻を読むので副作用
            </td>
            <td>日付の計算は引数で受け取って純粋に</td>
          </tr>
          <tr>
            <td className="hl">
              <code>RegExp</code>
            </td>
            <td>
              純粋 ― <code>test</code>は<code>boolean</code>を返すだけ
            </td>
            <td>
              形式の判定(<Link href="/language/regex">正規表現</Link>)
            </td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`type User = { id: number; name: string };

// JSON.parse の結果に型を与えると、以降は型付きで扱える
const user = JSON.parse('{"id":1,"name":"Alice"}') as User;
console.log(user.name); // "Alice"

// 日付は引数で受け取れば、いつ実行しても同じ結果になる純粋な関数
function toYear(date: Date): number {
  return date.getUTCFullYear();
}
console.log(toYear(new Date("2026-07-20T00:00:00Z"))); // 2026

// 正規表現の test は boolean を返すだけ
const zip = /^\\d{3}-\\d{4}$/;
zip.test("123-4567"); // true`}</code>
      </pre>

      <Aside label="現在時刻は入口で一度だけ">
        引数なしの<code>new Date()</code>は「今この瞬間」を読み取るため、呼ぶたびに結果が変わる副作用を含みます。現在時刻の取得はできるだけ関数の入口で一度だけ行い、そのあとの計算は渡された日付をもとにした純粋な変換にすると、テストも書きやすくなります。
      </Aside>

      <p>
        これらの標準APIはすべて、<Term>引数を受け取って新しい値を返す小さな純粋関数</Term>として理解しておくと、<code>map</code>や<code>filter</code>と組み合わせて自然につながっていきます。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>モジュールは公開と取り込み</h4>
          <p>
            <code>export</code>と<code>import</code>。利用側のコードはJS/TSで同じです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>I/Oは境界にまとめる</h4>
          <p>
            ファイルの読み書きは副作用。<code>async</code>関数に閉じ込め、あとは純粋な変換に。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>標準APIは小さな純粋関数</h4>
          <p>
            <code>Math</code>・<code>JSON</code>・<code>RegExp</code>は元の値を書き換えません。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>時刻の取得だけは別扱い</h4>
          <p>
            <code>new Date()</code>は副作用。入口で一度だけ取り、あとは引数で渡します。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/js-node" />
    </DocsPage>
  );
}
