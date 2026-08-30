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
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "型を使いこなす" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>型を使いこなす ― ありえない状態を書けなくする</h1>
        <Lead>
          <Link href="/language/js-data">データの変換</Link>では、オブジェクトと配列を不変に扱う書き方を身につけました。ここでは、そのデータに<Term>より正確な型</Term>を与えていきます。「文字列」ではなく「<code>{'"success"'}</code>か<code>{'"error"'}</code>のどちらか」、「オブジェクト」ではなく「成功したデータ、または失敗の情報」
          ― こうしたきめ細かな型を扱えると、ありえない状態を書いた瞬間に気づけるようになります。
        </Lead>
      </Hero>

      <Heading num="01">リテラル型と判別可能Union</Heading>
      <p>
        これまで型といえば<code>string</code>や<code>number</code>のような「種類」でした。ここからは<Term>その中でも、この特定の値だけ</Term>という、もっと狭い型を扱います。<code>{'"success" | "error"'}</code>のように特定の値そのものを型にできるのが<Term>リテラル型</Term>で、<code>|</code>は「または」を表します。
      </p>

      <pre>
        <code>{`// JavaScript ― string なので "errr" のようなタイプミスも通ってしまう
function label(status) {
  switch (status) {
    case "success": return "成功しました";
    case "error":   return "失敗しました";
    default:        return "不明な状態";
  }
}

// TypeScript ― 取りうる値を型で絞る
type Status = "success" | "error";

function label(status: Status): string {
  switch (status) {
    case "success": return "成功しました";
    case "error":   return "失敗しました";
  }
}

label("errr"); // Error: "errr" は Status 型ではありません`}</code>
      </pre>

      <p>
        リテラル型が本領を発揮するのが<Term>判別可能Union(タグ付きUnion)</Term>です。共通の目印(タグ)を持つオブジェクトの型を<code>|</code>でつないだもので、関数型では「取りうる状態を型で列挙する」データ設計の基本形になります。
      </p>

      <pre>
        <code>{`type Result =
  | { kind: "ok"; value: number }
  | { kind: "err"; message: string };

function describe(result: Result): string {
  switch (result.kind) {
    case "ok":
      return \`値は \${result.value}\`;      // ここで value は number
    case "err":
      return \`エラー: \${result.message}\`; // ここで message は string
  }
}`}</code>
      </pre>

      <p>
        TypeScriptは<code>kind</code>という共通のタグを見て、それぞれの枝の中でオブジェクトの正体を特定してくれます。<code>{'case "ok"'}</code>の中では<code>result.value</code>に補完が効き、存在しない<code>result.message</code>を書けばエラーになります。
      </p>

      <Aside label="網羅性チェック">
        判別可能Unionに新しい枝(たとえば<code>{'{ kind: "loading" }'}</code>)を後から足すと、<code>switch</code>の対応が足りなくなった箇所をTypeScriptが指摘してくれます。<Term>対応漏れをコンパイル時に発見できる</Term>ことこそ、Union型の最大の価値です。
      </Aside>

      <Heading num="02">Narrowing ― 分岐の中で型が狭まる</Heading>
      <p>
        <code>if</code>や<code>switch</code>による分岐の中では、その条件で確実に言えることに合わせて型がさらに狭まります。この絞り込みを<Term>Narrowing</Term>と呼びます。
      </p>

      <DiagramFrame
        slug="language-js-narrowing"
        aspect="640 / 290"
        caption="Narrowing(絞り込み)の仕組み。関数の入口では引数がnumberかstringか分からない状態で入ってくるが、typeofで調べる分岐を書くと、trueの枝では型がnumberに確定してtoFixedなどの数値用メソッドだけが使え、falseの枝ではstringに確定してtoUpperCaseなどの文字列用メソッドだけが使える。判別可能Unionでも同じで、kindやstatusといったタグを調べる分岐に入ると、その枝の中でオブジェクトの正体が1つに特定される。"
      />

      <pre>
        <code>{`function format(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2);  // この分岐で value は number
  }
  return value.toUpperCase(); // ここでは value は string
}`}</code>
      </pre>

      <p>
        絞り込みの手がかりは<code>typeof</code>だけではありません。オブジェクトなら、そのプロパティが存在するかを調べる<code>in</code>演算子でも絞り込めます。
      </p>

      <pre>
        <code>{`type Circle = { radius: number };
type Rect = { width: number; height: number };

function area(shape: Circle | Rect): number {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2; // この分岐で shape は Circle
  }
  return shape.width * shape.height;    // ここでは shape は Rect
}`}</code>
      </pre>

      <p>
        JavaScriptでは同じ<code>if</code>を書いても、<code>shape.radius</code>が本当に存在するかは実行してみるまで分かりません。分岐の中で「今この値が何であるか」が型として保証されるのが、TypeScriptだけが得られる価値です。
      </p>

      <Heading num="03">型アサーション(as)と as const</Heading>
      <p>
        ときには、開発者のほうがコンパイラより値の中身を知っている場面があります。そんなときに「この値はこの型だと見なして」と言い切るのが<Term>型アサーション</Term>(<code>as</code>)です。
      </p>

      <pre>
        <code>{`// as ― 「この値は { id: number } だと見なせ」と言い切る
const data = JSON.parse('{"id":1}') as { id: number };

// 危険 ― 実際の中身と食い違っても as は通ってしまう
const wrong = JSON.parse('{"id":1}') as { name: string };
wrong.name.toUpperCase(); // 実行時エラー: name は無い`}</code>
      </pre>

      <p>
        <code>as</code>は型チェックを黙らせる強制力を持つため、間違った型を言い切るとそのウソを信じて補完まで出てしまい、かえって危険です。本当に必要なときだけ慎重に使います(<Link href="/language/types">型システムの健全性</Link>で扱った「穴」のひとつです)。
      </p>
      <p>
        一方、日常的に安全に使える<code>as</code>が<code>as const</code>です。値のうしろに付けると、その値は「二度と書き換えない、この具体的な値そのもの」として型が固定されます。
      </p>

      <pre>
        <code>{`const routes = ["home", "about", "contact"] as const;
// 型は readonly ["home", "about", "contact"] に固定される
// routes.push("blog") は Error

type Route = (typeof routes)[number]; // "home" | "about" | "contact"

const point = { x: 1, y: 2 } as const;
// { readonly x: 1; readonly y: 2 } に固定`}</code>
      </pre>

      <p>
        値の定義と型定義が一本化されるので、定数を追加すれば型も自動で追随します。リテラルUnionを<Term>手で書かずに導く</Term>実務的なテクニックです。
      </p>

      <Heading num="04">Result型パターン ― 失敗を値として返す</Heading>
      <p>
        処理が失敗しうるとき、伝統的なやり方は<code>throw</code>で例外を投げ、呼び出し側が<code>try/catch</code>で受け止めることです。手軽ですが、<Term>関数の型を見ても「失敗しうる」ことが分かりません</Term>。呼び出し側は<code>try/catch</code>を書き忘れても型エラーにならないのです。
      </p>

      <pre>
        <code>{`// throw 版 ― 戻り値の型 number に、失敗の可能性が現れない
function parseAge(input: string): number {
  const n = Number(input);
  if (Number.isNaN(n)) throw new Error("数値ではありません");
  return n;
}`}</code>
      </pre>

      <p>
        そこで関数型では、成功と失敗を<Term>値</Term>として返します。判別可能Unionの出番です。純粋関数は<code>throw</code>せず、成功か失敗のどちらかを必ず返します。これが<Term>Result型パターン</Term>です。
      </p>

      <pre>
        <code>{`type Result<T> =
  | { kind: "ok"; value: T }
  | { kind: "err"; message: string };

function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (Number.isNaN(n)) return { kind: "err", message: "数値ではありません" };
  return { kind: "ok", value: n };
}

const r = parseAge("abc");
if (r.kind === "ok") {
  console.log(r.value);            // この分岐で value は number
} else {
  console.log("失敗:", r.message); // "失敗: 数値ではありません"
}`}</code>
      </pre>

      <p>
        <code>try/catch</code>版では<code>catch</code>に飛んでくる値の型が<code>unknown</code>で曖昧なのに対し、Result版では戻り値の型がそのまま「成功か失敗か」を表現しています。Narrowingが効くので、それぞれの分岐でだけ安全にアクセスできます(<Link href="/design/paradigm-functional-safety">安全に分岐する</Link>)。
      </p>

      <Aside label="この先の再登場">
        Result型は、失敗しうる処理をきれいに扱うための入口です。実際の通信のように必ず失敗が起こりうる場面 ―
        <Link href="/language/js-async">非同期処理</Link>の<code>Promise</code>や<code>async</code>/<code>await</code> ―
        でも、この「失敗を値として返す」考え方が再び登場します。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>リテラル型と判別可能Union</h4>
          <p>
            値そのものを型にし、タグ付きのオブジェクトを<code>|</code>でつないで取りうる状態を列挙します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Narrowingで絞り込む</h4>
          <p>
            <code>typeof</code>・<code>in</code>・タグを手がかりに、分岐の中で型が自動で狭まります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>as は慎重に、as const は積極的に</h4>
          <p>
            <code>as</code>は型チェックを黙らせる劇薬。<code>as const</code>は定数定義を安全にします。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>失敗を値として返す</h4>
          <p>
            Result型なら、失敗の可能性が戻り値の型に現れ、扱い忘れを防げます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/js-types" />
    </DocsPage>
  );
}
