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

export const metadata: Metadata = { title: "ジェネリクスとユーティリティ型" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>ジェネリクスとユーティリティ型</h1>
        <Lead>
          ここまでで、プログラムを組み立てる道具はひととおりそろいました。ここでは、それらを<Term>より安全に、より使い回しやすく</Term>する2つの仕組み ―
          <Term>ジェネリクス</Term>(型パラメータ)と<Term>ユーティリティ型</Term>を扱います。どちらも「同じJavaScriptのコードに、型の再利用性を足す」ものです。
        </Lead>
      </Hero>

      <Heading num="01">ジェネリクス ― 型を後から受け取る</Heading>
      <p>
        <Link href="/language/js-functions">関数</Link>では、関数が値を<Term>引数</Term>として後から受け取ることを学びました。<Term>ジェネリクス</Term>は、同じことを<Term>型</Term>に対して行う仕組みです。「どんな型でも受け取れて、その型をそのまま覚えておく」ための<Term>型パラメータ</Term>を、<code>{"<T>"}</code>という書き方で宣言します。
      </p>

      <Analogy label="💡 たとえるなら">
        <code>T</code>は「型の入れ物」です。関数を呼び出した瞬間に、渡された値から<code>T</code>の中身が決まります。<code>identity(42)</code>なら<code>T</code>は<code>number</code>、<code>{'identity("hello")'}</code>なら<code>string</code> ―
        1つの関数定義が、あらゆる型に対応できるようになります。
      </Analogy>

      <pre>
        <code>{`// 受け取った値をそのまま返すだけの関数
function identity<T>(x: T): T {
  return x;
}

identity(42);      // 戻り値は number と分かる
identity("hello"); // 戻り値は string と分かる

// 配列の先頭要素 ― 要素の型を T とすれば、引数は T[]、戻り値は T
function first<T>(arr: T[]): T {
  return arr[0];
}`}</code>
      </pre>

      <p>
        実行結果はJavaScriptとまったく同じです。違うのは、<Term>呼び出しごとに戻り値の型が正確に分かる</Term>点で、そのため数値なら<code>.toFixed()</code>、文字列なら<code>.toUpperCase()</code>と補完まで効きます。
      </p>

      <p>
        本領は、型パラメータを複数取り、<Term>入力と出力の型が異なる</Term>変換で発揮されます。<code>map</code>を自前で書いてみましょう。入力配列の要素型を<code>T</code>、変換後の要素型を<code>U</code>とすると、変換関数は<code>{"(x: T) => U"}</code>、戻り値は<code>{"U[]"}</code>と表せます。
      </p>

      <pre>
        <code>{`function map<T, U>(arr: T[], f: (x: T) => U): U[] {
  return arr.map(f);
}

map([1, 2, 3], (n) => n * 2);            // T=number, U=number → number[]
map(["a", "b"], (s) => s.toUpperCase()); // T=string, U=string → string[]`}</code>
      </pre>

      <p>
        呼び出しごとに型が決まるので、コールバックの引数に補完が効き、戻り値の配列の型も正しくなります。標準の<code>Array</code>の<code>map</code>もこのようにジェネリクスで定義されており、私たちは知らないうちにその恩恵を受けていました。
      </p>

      <p>
        ジェネリクスは<code>interface</code>や<code>type</code>にも付けられます。「中身の型が違うだけで、形は同じ」オブジェクトを、1つの定義で表せます。
      </p>

      <pre>
        <code>{`interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const textBox: Box<string> = { value: "hello" };`}</code>
      </pre>

      <p>
        <Link href="/language/js-async">非同期処理</Link>で登場した<code>{"Promise<T>"}</code>も、まさにこの「中身の型を後から受け取るジェネリックな箱」でした。実装方式としては型情報を消す<Term>型消去</Term>にあたり、実行時には残りません(<Link href="/language/types">型システム</Link>)。
      </p>

      <Heading num="02">ユーティリティ型 ― 型そのものを変換する</Heading>
      <p>
        ここまで、データを書き換えず新しいオブジェクトを作って変換する不変のスタイルを貫いてきました。値をそうやって変換するように、<Term>型そのものを変換する</Term>道具がTypeScriptに用意されています。それが<Term>ユーティリティ型</Term>です。
      </p>

      <DiagramFrame
        slug="language-js-utility-types"
        aspect="640 / 290"
        caption="ユーティリティ型が元の型から新しい型を派生させる様子。中央左のUser型から、全プロパティを省略可能にするPartial、emailを除くOmit、idとnameだけ取り出すPickの3つが派生する。元のUser型は書き換わらずそのまま残り、Userの定義を1か所直せば派生した型もすべて自動で追従する。データを不変に変換してきたのと同じ発想が、型の世界にも通じている。"
      />

      <Aside label="型の世界だけの変換">
        ユーティリティ型は型の世界だけの変換で、実行されるJavaScriptには一切残りません。値の側は、これまでどおりスプレッドや分割代入で新しいオブジェクトを作ります。
      </Aside>

      <pre>
        <code>{`interface User {
  id: number;
  name: string;
  email: string;
}

// Partial ― 全プロパティを省略可能に。一部だけ更新するパッチの型に
function update(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}
update(user, { name: "Bob" }); // 存在しないキーを渡すとエラー

// Omit ― 一部を除いた型。Pick は逆に、一部だけ取り出す
type PublicUser = Omit<User, "email">;

function toPublic(user: User): PublicUser {
  const { email, ...rest } = user;
  return rest;
}

// Record ― キーから値への対応表(辞書)を型づける
const scores: Record<string, number> = { alice: 90, bob: 80 };`}</code>
      </pre>

      <p>
        <code>toPublic</code>の戻り値が<code>PublicUser</code>型だと分かるので、うっかり<code>result.email</code>を読もうとすると実行前にエラーになります ―
        隠したはずの情報を触ってしまう事故を、型が防いでくれます。
      </p>
      <p>
        <code>Partial</code>・<code>Pick</code>・<code>Omit</code>・<code>Record</code>に共通するのは、<Term>もとの型を壊さず、そこから新しい型を派生させる</Term>という発想です。データを不変に変換してきたのと同じ考え方が、型の世界にもそのまま通じています。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ジェネリクスは型の引数</h4>
          <p>
            <code>{"<T>"}</code>で型パラメータを宣言すると、1つの定義をあらゆる型で使い回せます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>入力と出力の型を運ぶ</h4>
          <p>
            <code>{"map<T, U>"}</code>のように、変換の前後の型を型パラメータで結び付けられます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型も派生させる</h4>
          <p>
            <code>Partial</code>・<code>Pick</code>・<code>Omit</code>・<code>Record</code>で、元の型から新しい型を作ります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>1か所直せば追従する</h4>
          <p>
            派生元の型を直せば派生型も自動で追いつくので、定義の重複が減ります。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、ブラウザの外でコードを動かす<Link href="/language/js-node">Node.js と標準ライブラリ</Link>を見ていきます。
      </p>

      <DocsFooter href="/language/js-generics" />
    </DocsPage>
  );
}
