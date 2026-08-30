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
  CodeCompare,
} from "@/components/docs";

export const metadata: Metadata = { title: "ジェネリクスとユーティリティ型" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第9章 ジェネリクスとユーティリティ型</h1>
        <Lead>
          前章「<Link href="/dev/language/browser">ブラウザ ― Web API</Link>」までで、値・関数・データ・非同期処理と、プログラムを組み立てる道具がひととおりそろいました。この章では、それらを
          <strong>より安全に、より使い回しやすく</strong>するTypeScriptの2つの仕組み ―{" "}
          <Term>ジェネリクス</Term>(型パラメータ)と<Term>ユーティリティ型</Term>{" "}
          を学びます。どちらも「同じJavaScriptのコードに、型の再利用性を足す」ものです。概要ページ
          <Link href="/dev/language">JavaScript・TypeScript</Link>
          で触れた「型という契約」を、いよいよ<strong>使い回せる契約</strong>へと育てていきます。いつもどおり、まず素直なJavaScriptで書き、同じ結果になるTypeScriptを並べて確かめます。
        </Lead>
      </Hero>

      <Heading num="9.1">ジェネリクス ― 型を後から受け取る</Heading>
      <p>
        第2章「<Link href="/dev/language/functions">関数</Link>」では、関数が値を<strong>引数</strong>として後から受け取ることを学びました。
        <Term>ジェネリクス</Term>は、これと同じことを<strong>型</strong>に対して行う仕組みです。関数が「どんな型でも受け取れて、その型をそのまま覚えておく」ようにするための<Term>型パラメータ</Term>を、
        <code>{"<T>"}</code>{" "}という書き方で宣言します。
      </p>
      <p>
        いちばん小さな例が、<strong>受け取った値をそのまま返すだけ</strong>の関数
        <code>identity</code>です。JavaScriptでは何の変哲もない関数ですが、TypeScriptでは
        <code>{"identity<T>(x: T): T"}</code>{" "}と書くことで「引数<code>x</code>の型を{" "}
        <code>T</code>と名づけ、戻り値も同じ<code>T</code>である」という契約になります。
      </p>
      <Analogy label="🔷 ここからジェネリクスが加わる">
        <code>T</code>は「型の入れ物」です。関数を呼び出した瞬間に、渡された値から{" "}
        <code>T</code>の中身が決まります。<code>identity(42)</code>なら<code>T</code>は{" "}
        <code>number</code>、<code>{'identity("hello")'}</code>なら<code>T</code>は{" "}
        <code>string</code> ― 1つの関数定義が、あらゆる型に対応できるようになります。
      </Analogy>
      <CodeCompare
        js={`function identity(x) {
  return x;
}

console.log(identity(42));      // => 42
console.log(identity("hello")); // => "hello"`}
        ts={`function identity<T>(x: T): T {
  return x;
}

console.log(identity(42));      // => 42
console.log(identity("hello")); // => "hello"`}
      />
      <p>
        実行結果はJavaScript版とまったく同じ ― <code>42</code>と{" "}
        <code>{'"hello"'}</code>がそのまま返ります。違うのは、TypeScript版では
        <code>identity(42)</code>の戻り値が<code>number</code>、
        <code>{'identity("hello")'}</code>の戻り値が<code>string</code>だと
        <strong>呼び出しごとに正確に分かる</strong>点です。そのため戻り値に対する補完(数値なら
        <code>.toFixed()</code>、文字列なら<code>.toUpperCase()</code>)まで効きます。
      </p>
      <p>
        型パラメータは配列にも使えます。配列の先頭要素を返す<code>first</code>を考えると、要素の型を{" "}
        <code>T</code>とすれば、引数は<code>{"T[]"}</code>(<code>T</code>の配列)、戻り値は{" "}
        <code>T</code>です。ここでも<strong>返す値そのものはJavaScriptと同一</strong>で、TypeScriptは「渡した配列の要素型」を戻り値まで運んでくれます。
      </p>
      <CodeCompare
        js={`function first(arr) {
  return arr[0];
}

console.log(first([1, 2, 3]));  // => 1
console.log(first(["a", "b"])); // => "a"`}
        ts={`function first<T>(arr: T[]): T {
  return arr[0];
}

console.log(first([1, 2, 3]));  // => 1
console.log(first(["a", "b"])); // => "a"`}
      />
      <p>
        ジェネリクスの本領は、<strong>型パラメータを複数取り、入力と出力の型が異なる</strong>変換で発揮されます。第3章「
        <Link href="/dev/language/data">データの変換 ― オブジェクトと配列</Link>」の{" "}
        <code>map</code>を、自前のジェネリック関数として書いてみましょう。入力配列の要素型を{" "}
        <code>T</code>、変換後の要素型を<code>U</code>とすると、変換関数は{" "}
        <code>{"(x: T) => U"}</code>、戻り値は<code>{"U[]"}</code>と表せます。これは第2章2.4「合成」で確立した
        <strong>「関数を引数として渡す」</strong>パターンに、型パラメータを重ねたものです。
      </p>
      <CodeCompare
        js={`function map(arr, f) {
  return arr.map(f);
}

console.log(map([1, 2, 3], (n) => n * 2));
// => [2, 4, 6]
console.log(map(["a", "b"], (s) => s.toUpperCase()));
// => ["A", "B"]`}
        ts={`function map<T, U>(arr: T[], f: (x: T) => U): U[] {
  return arr.map(f);
}

console.log(map([1, 2, 3], (n) => n * 2));
// => [2, 4, 6]
console.log(map(["a", "b"], (s) => s.toUpperCase()));
// => ["A", "B"]`}
      />
      <p>
        <code>{"map([1, 2, 3], (n) => n * 2)"}</code>では<code>T</code>が{" "}
        <code>number</code>・<code>U</code>も<code>number</code>、
        <code>{'map(["a", "b"], (s) => s.toUpperCase())'}</code>では<code>T</code>が{" "}
        <code>string</code>・<code>U</code>も<code>string</code>と、呼び出しごとに型が決まります。だからコールバックの引数
        <code>n</code>や<code>s</code>に補完が効き、戻り値の配列の型も正しく{" "}
        <code>{"number[]"}</code>・<code>{"string[]"}</code>になります。実は標準の{" "}
        <code>Array</code>の<code>map</code>もこのようにジェネリクスで定義されており、私たちは知らないうちにその恩恵を受けていました。
      </p>
      <Aside label="関数だけではない">
        ジェネリクスは<code>interface</code>や<code>type</code>にも付けられます。「中身の型が違うだけで、形は同じ」オブジェクトを、1つの定義で表せます。
      </Aside>
      <p>
        たとえば「何か1つの値を包む箱」を考えます。中身が数値でも文字列でも、
        <code>value</code>というプロパティを持つ形は共通です。JavaScriptなら単なるオブジェクトですが、TypeScriptでは
        <code>{"Box<T>"}</code>という<strong>1つのinterfaceを使い回して</strong>、中身の型だけを差し替えられます。
      </p>
      <CodeCompare
        js={`const numberBox = { value: 42 };
const textBox = { value: "hello" };

console.log(numberBox.value); // => 42
console.log(textBox.value);   // => "hello"`}
        ts={`interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const textBox: Box<string> = { value: "hello" };

console.log(numberBox.value); // => 42
console.log(textBox.value);   // => "hello"`}
      />
      <p>
        オブジェクトの中身も出力も、JavaScript版とまったく同じです。<strong>TypeScriptだけの価値</strong>は、
        <code>{"Box<number>"}</code>と<code>{"Box<string>"}</code>を
        <strong>たった1つの定義から作り分けられ</strong>、
        <code>numberBox.value</code>が<code>number</code>だと分かる点です。第7章で登場した{" "}
        <code>{"Promise<T>"}</code>も、まさにこの「中身の型を後から受け取るジェネリックな箱」でした。
      </p>

      <Heading num="9.2">ユーティリティ型 ― 不変データの型変換</Heading>
      <p>
        本書はここまで、データを<strong>書き換えず</strong>、
        <code>{"{ ...obj, x: 1 }"}</code>のように<strong>新しいオブジェクトを作って変換する</strong>
        不変(イミュータブル)のスタイルを貫いてきました。値をそうやって変換するように、
        <strong>型そのものを変換する</strong>道具がTypeScriptに用意されています。それが
        <Term>ユーティリティ型</Term>です。既存の型から「一部を省略可能にした型」「一部だけ取り出した型」などを
        <strong>その場で生成</strong>できます。
      </p>
      <Aside label="TS専用の機能">
        ユーティリティ型は<strong>型の世界だけ</strong>の変換で、実行されるJavaScriptには一切残りません。以下の対では、
        <strong>ランタイムの値は完全に同じ</strong>になるように、JavaScript側をスプレッドや分割代入で書いています。
      </Aside>
      <p>
        まずは共通の土台として、次の<code>User</code>型を使います。
      </p>
      <CodeCompare
        js={`const user = {
  id: 1,
  name: "Alice",
  email: "a@example.com",
};`}
        ts={`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "a@example.com",
};`}
      />
      <p>
        1つ目は<code>Partial</code>です。<code>{"Partial<User>"}</code>は「
        <code>User</code>の全プロパティを<strong>省略可能</strong>にした型」を生みます。ユーザー情報を
        <strong>一部だけ更新する</strong>関数を書くとき、更新内容(パッチ)の型としてぴったりです。実行の中身は、これまでどおりスプレッドで
        <strong>新しいオブジェクトを作る不変更新</strong>です。
      </p>
      <CodeCompare
        js={`function update(user, patch) {
  return { ...user, ...patch };
}

console.log(update(user, { name: "Bob" }));
// => { id: 1, name: "Bob", email: "a@example.com" }`}
        ts={`function update(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}

console.log(update(user, { name: "Bob" }));
// => { id: 1, name: "Bob", email: "a@example.com" }`}
      />
      <p>
        戻り値のオブジェクトはJS/TSで同一です。TypeScript版では<code>{"Partial<User>"}</code>
        のおかげで、パッチに<code>User</code>に<strong>存在しないプロパティを渡すとエラー</strong>になり、逆に
        <code>{"{ name: \"Bob\" }"}</code>のように一部だけ渡すのは許されます。
        <code>User</code>の定義を1か所直せば、この派生型も自動で追従する ―
        これが「型の再利用」の効きどころです。
      </p>
      <p>
        2つ目と3つ目は<code>Pick</code>と<code>Omit</code>です。
        <code>{"Pick<User, \"id\" | \"name\">"}</code>は「<code>User</code>から
        <code>id</code>と<code>name</code>だけ<strong>取り出した</strong>型」、
        <code>{"Omit<User, \"email\">"}</code>は「<code>User</code>から
        <code>email</code>を<strong>除いた</strong>型」です。この2つは、いまの<code>User</code>に対しては
        <strong>まったく同じ形</strong>になります。<code>email</code>を隠した「公開用ユーザー」を作る変換で使ってみましょう。実行側は分割代入で
        <code>email</code>を取り除いた新しいオブジェクトを返します。
      </p>
      <CodeCompare
        js={`function toPublic(user) {
  const { email, ...rest } = user;
  return rest;
}

console.log(toPublic(user));
// => { id: 1, name: "Alice" }`}
        ts={`type PublicUser = Omit<User, "email">;
// Pick<User, "id" | "name"> でも同じ形になる

function toPublic(user: User): PublicUser {
  const { email, ...rest } = user;
  return rest;
}

console.log(toPublic(user));
// => { id: 1, name: "Alice" }`}
      />
      <p>
        こちらも返るオブジェクトは<code>{'{ id: 1, name: "Alice" }'}</code>で同一です。TypeScript版では、戻り値が
        <code>PublicUser</code>型だと分かるので、うっかり<code>result.email</code>を読もうとすると
        <strong>実行前にエラー</strong>になります ― 隠したはずの情報を触ってしまう事故を、型が防いでくれます。
      </p>
      <p>
        4つ目は<code>Record</code>です。<code>{"Record<string, number>"}</code>は「
        <strong>文字列のキーから数値への対応表</strong>」を表す型で、名前をキーにした点数表のような
        <Term>辞書</Term>(ルックアップ)を型づけるのに使います。オブジェクトの中身はJavaScriptと変わりません。
      </p>
      <CodeCompare
        js={`const scores = {
  alice: 90,
  bob: 80,
};

console.log(scores.alice); // => 90`}
        ts={`const scores: Record<string, number> = {
  alice: 90,
  bob: 80,
};

console.log(scores.alice); // => 90`}
      />
      <p>
        <code>{"Record<string, number>"}</code>と書いておくと、
        <strong>どのキーの値も<code>number</code>として扱える</strong>ことが保証され、うっかり文字列を入れれば実行前に気づけます。
        <code>Partial</code>・<code>Pick</code>・<code>Omit</code>・<code>Record</code>{" "}
        ― どれも共通しているのは、<strong>もとの型を壊さず、そこから新しい型を派生させる</strong>という発想です。データを不変に変換してきたのと同じ考え方が、型の世界にもそのまま通じているのです。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ジェネリクスは型の引数</h4>
          <p>
            <code>{"<T>"}</code>で型パラメータを宣言すると、1つの関数やinterfaceを
            <strong>あらゆる型で使い回せます</strong>。<code>identity</code>や
            <code>map</code>がその代表です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>型が呼び出しごとに決まる</h4>
          <p>
            <code>identity(42)</code>なら<code>T</code>は<code>number</code>。渡した値から型が確定するので、戻り値の補完まで正確に効きます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ユーティリティ型は型の変換</h4>
          <p>
            <code>Partial</code>・<code>Pick</code>・<code>Omit</code>・
            <code>Record</code>で、既存の型を<strong>壊さず派生</strong>させます。TS専用で、ランタイムには残りません。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>不変の発想は型にも通じる</h4>
          <p>
            スプレッドで新しいオブジェクトを作るのと同じように、もとの型から新しい型を作る ― データも型も
            <strong>壊さず変換する</strong>のが本書の軸です。
          </p>
        </Card>
      </CardGrid>
      <p>
        ジェネリクスとユーティリティ型で、型を<strong>再利用し、安全に変換する</strong>力が身につきました。ここまでの章は、ブラウザやNode.jsといった実行環境を意識せず「言語そのもの」を見てきました。次章「
        <Link href="/dev/language/node">Node.js と標準ライブラリ</Link>
        」では、これまで書いてきた関数を<code>import</code> /{" "}
        <code>export</code>でモジュールに分け、<code>Math</code>・<code>Date</code>・
        <code>JSON</code>といった標準ライブラリを、副作用のないAPIを中心に使いこなしていきます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
