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

export const metadata: Metadata = {
  title: "データの変換 ― オブジェクトと配列",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第3章 データの変換 ― オブジェクトと配列</h1>
        <Lead>
          前章「<Link href="/dev/language/functions">関数</Link>」では、<code>map</code> のように関数を受け取る<Term>高階関数</Term>を学びました。この章では、その高階関数を実際に使う相手である<Term>オブジェクト</Term>と<Term>配列</Term>を扱います。鍵になる考え方は<Term>不変(イミュータブル)</Term>。既存のデータを書き換えるのではなく、<strong>新しいデータを作って返す</strong>という関数型のスタイルを、JavaScriptとTypeScriptの書き比べで身につけます。
        </Lead>
      </Hero>

      <p>
        プログラムのほとんどは「あるデータを、別の形のデータに<strong>変換</strong>する」作業の連続です。ユーザー一覧から名前だけを取り出す、価格に消費税を足す、条件に合う商品だけを絞り込む ― どれもデータの変換です。この章では、変換のときに<strong>元のデータには手を触れない</strong>という原則を徹底します。元を壊さなければ、どこで何が書き換わったか分からなくなる不具合を避けられ、コードが追いやすくなるからです。
      </p>

      <Heading num="3.1">オブジェクト</Heading>
      <p>
        <Term>オブジェクト</Term>は「名前(キー)と値」の組をまとめたデータです。<code>{"{ }"}</code> の中に <code>{"キー: 値"}</code> を並べて作り、<code>obj.key</code> または <code>{'obj["key"]'}</code> で読み取ります。
      </p>
      <CodeCompare
        js={`const user = { id: 1, name: "Alice" };

console.log(user.name);   // "Alice"
console.log(user["id"]);  // 1`}
        ts={`const user = { id: 1, name: "Alice" };

console.log(user.name);   // "Alice"
console.log(user["id"]);  // 1
// TS は user を { id: number; name: string } と推論する`}
      />

      <p>
        さて、このユーザーの名前を「Bob」に変えたいとします。もっとも素直に思いつくのは、プロパティに直接代入する方法です。しかしこれは<Term>破壊的</Term>な操作 ― <strong>元の <code>user</code> そのものを書き換えてしまいます</strong>。関数型のスタイルでは、代わりに<Term>スプレッド構文</Term>(<code>...</code>)で元の中身を新しいオブジェクトにコピーし、一部だけ上書きした<strong>別のオブジェクト</strong>を作ります。
      </p>
      <CodeCompare
        js={`const user = { id: 1, name: "Alice" };

// 破壊的: 元の user を書き換える
user.name = "Bob";

// 不変: 新しいオブジェクトを作る(元は無傷)
const user2 = { id: 1, name: "Alice" };
const renamed = { ...user2, name: "Bob" };

console.log(renamed);  // { id: 1, name: "Bob" }`}
        ts={`const user = { id: 1, name: "Alice" };

// 破壊的: 元の user を書き換える
user.name = "Bob";

// 不変: 新しいオブジェクトを作る(元は無傷)
const user2 = { id: 1, name: "Alice" };
const renamed = { ...user2, name: "Bob" };

console.log(renamed);  // { id: 1, name: "Bob" }`}
      />
      <p>
        どちらの方法でも <code>{'{ id: 1, name: "Bob" }'}</code> という<strong>同じ最終結果</strong>が得られます。違うのは「元のデータが残るかどうか」です。破壊的代入では元の <code>user</code> は失われますが、スプレッドを使った <code>renamed</code> のほうは <code>user2</code> を無傷のまま残します。「変換の前後を両方持てる」ことが、後で見るReactの状態管理などで効いてきます。
      </p>

      <Analogy label="💡 たとえるなら">
        破壊的代入は「原本の書類に直接赤ペンで書き込む」操作です。手早いですが、元の内容は消えてしまいます。スプレッドによる不変更新は「原本をコピー機で複製し、その複製にだけ手を入れる」操作。原本はいつでも見返せます。
      </Analogy>

      <Aside label="ここからTSが加わる">
        ここまでのコードはJSとTSで一字一句同じでした。TypeScriptは値の変換ロジックには手を加えず、<strong>「このオブジェクトはどんな形か」という契約</strong>だけを足します。次の例で、その型を書く場所を見ます。
      </Aside>
      <p>
        オブジェクトに型を付ける場所は、<strong>その形の宣言</strong>です。<code>interface</code>(または <code>type</code>)で形を定義し、変数にその型を注釈します。さらに <code>{"readonly"}</code> を付けると「後から書き換え禁止」がコンパイル時に保証され、不変のルールを<strong>型で強制</strong>できます。
      </p>
      <CodeCompare
        js={`const user = { id: 1, name: "Alice" };

// 不変更新は「約束事」にすぎない。
// うっかり user.id = 2 と書いても JS は止めない。
const renamed = { ...user, name: "Bob" };

console.log(renamed);  // { id: 1, name: "Bob" }`}
        ts={`interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };

// user.id = 2; // Error: readonly なので代入不可
const renamed: User = { ...user, name: "Bob" };

console.log(renamed);  // { id: 1, name: "Bob" }`}
      />
      <p>
        実行結果は両者とも <code>{'{ id: 1, name: "Bob" }'}</code> で同じです。<strong>TypeScriptだけの価値</strong>は、<code>{"readonly"}</code> によって「元を壊す」書き方を実行前にエラーとして弾けること。守りたいルールをコメントやレビューでなく型で担保できます。
      </p>

      <Heading num="3.2">配列</Heading>
      <p>
        <Term>配列</Term>は値を順番に並べたデータで、<code>[ ]</code> で作り、<code>arr[0]</code> のように<strong>添字(0始まり)</strong>で読み取ります。
      </p>
      <CodeCompare
        js={`const nums = [10, 20, 30];

console.log(nums[0]);      // 10
console.log(nums.length);  // 3`}
        ts={`const nums: number[] = [10, 20, 30];

console.log(nums[0]);      // 10
console.log(nums.length);  // 3
// 要素は number。nums[0] は number 型`}
      />

      <p>
        この章の中心となるのが、配列の<strong>変換</strong>です。「各要素を2倍した新しい配列がほしい」という処理を考えます。命令型では、空の配列を用意して <code>for</code> で回し、<code>push</code> で1つずつ<strong>詰め込んで</strong>いきます。<code>push</code> は配列を<Term>破壊的</Term>に変更するメソッドです。一方、関数型では <code>map</code> を使います。<code>map</code> は各要素に関数を適用した<strong>新しい配列</strong>を返し、元の配列には触れません。
      </p>
      <CodeCompare
        js={`const nums = [10, 20, 30];

// 命令型: 空配列に push で詰めていく(破壊的)
const doubledLoop = [];
for (let i = 0; i < nums.length; i++) {
  doubledLoop.push(nums[i] * 2);
}

// 関数型: map で新しい配列を作る(元は無傷)
const doubledMap = nums.map((n) => n * 2);

console.log(doubledLoop); // [20, 40, 60]
console.log(doubledMap);  // [20, 40, 60]`}
        ts={`const nums: number[] = [10, 20, 30];

// 命令型: 空配列に push で詰めていく(破壊的)
const doubledLoop: number[] = [];
for (let i = 0; i < nums.length; i++) {
  doubledLoop.push(nums[i] * 2);
}

// 関数型: map で新しい配列を作る(元は無傷)
const doubledMap: number[] = nums.map((n: number) => n * 2);

console.log(doubledLoop); // [20, 40, 60]
console.log(doubledMap);  // [20, 40, 60]`}
      />
      <p>
        どちらも結果は <code>[20, 40, 60]</code> で<strong>同一</strong>です。しかし <code>map</code> 版は、①一時変数もループカウンタも要らず、②「各要素を2倍する」という<strong>意図がそのまま1行に</strong>表れ、③元の <code>nums</code> を壊しません。TS版では <code>map</code> のコールバック引数 <code>n</code> に <code>number</code> と型が付き、要素の型が保証されます(実際は推論されるので注釈は省略も可能です)。
      </p>

      <p>
        変換メソッドは <code>map</code> だけではありません。よく使う3つ ― <strong>絞り込む <code>filter</code></strong>、<strong>畳み込む <code>reduce</code></strong>、<strong>変換して平坦化する <code>flatMap</code></strong> ― を見ます。いずれも元の配列を壊さず、新しい値を返します。
      </p>
      <CodeCompare
        js={`const nums = [1, 2, 3, 4, 5, 6];

// filter: 条件に合う要素だけの新しい配列
const evens = nums.filter((n) => n % 2 === 0);

// reduce: 全要素を1つの値に畳み込む(合計)
const sum = nums.reduce((acc, n) => acc + n, 0);

// flatMap: 各要素を配列に変換して平坦につなぐ
const pairs = nums.flatMap((n) => [n, n * 10]);

console.log(evens); // [2, 4, 6]
console.log(sum);   // 21
console.log(pairs); // [1, 10, 2, 20, 3, 30, 4, 40, 5, 50, 6, 60]`}
        ts={`const nums: number[] = [1, 2, 3, 4, 5, 6];

// filter: 条件に合う要素だけの新しい配列
const evens: number[] = nums.filter((n: number) => n % 2 === 0);

// reduce: 全要素を1つの値に畳み込む(合計)
const sum: number = nums.reduce((acc: number, n: number) => acc + n, 0);

// flatMap: 各要素を配列に変換して平坦につなぐ
const pairs: number[] = nums.flatMap((n: number) => [n, n * 10]);

console.log(evens); // [2, 4, 6]
console.log(sum);   // 21
console.log(pairs); // [1, 10, 2, 20, 3, 30, 4, 40, 5, 50, 6, 60]`}
      />
      <p>
        結果はJS/TSで完全に同じです。TypeScriptでは <code>reduce</code> の累積値 <code>acc</code> や各コールバック引数に型が付き、「文字列と数値をうっかり足す」ような取り違えを実行前に防げます。<strong>配列に型を付ける場所</strong>は要素の型で、<code>number[]</code> と <code>{"Array<number>"}</code> はまったく同じ意味です。どちらで書いても構いません。
      </p>
      <Aside label="補足">
        <code>map</code> / <code>filter</code> / <code>flatMap</code> は「新しい配列」を返すので、<code>nums.filter(...).map(...)</code> のように<strong>数珠つなぎ(チェーン)</strong>にできます。小さな変換を並べて大きな変換を組み立てられるのが関数型スタイルの強みです。
      </Aside>

      <Heading num="3.3">分割代入</Heading>
      <p>
        <Term>分割代入</Term>は、オブジェクトや配列の中身を<strong>まとめて取り出して</strong>変数にする書き方です。<code>user.name</code>、<code>user.email</code> と一つずつ書く代わりに、必要なプロパティを一度に受け取れます。
      </p>
      <CodeCompare
        js={`const user = { id: 1, name: "Alice", age: 30 };

// オブジェクトの分割代入
const { name, age } = user;
console.log(name, age); // "Alice" 30

// 配列の分割代入(順番で受け取る)
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first, second); // "red" "green"`}
        ts={`const user = { id: 1, name: "Alice", age: 30 };

// オブジェクトの分割代入
const { name, age }: { name: string; age: number } = user;
console.log(name, age); // "Alice" 30

// 配列の分割代入(順番で受け取る)
const colors: string[] = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first, second); // "red" "green"`}
      />
      <p>
        分割代入がもっとも活きるのは、<strong>関数の引数</strong>です。オブジェクトをそのまま引数として受け取り、その場で必要なプロパティに分解できます。データを丸ごと渡し、関数側で使う部分だけ取り出す ― 関数型で頻出のパターンです。
      </p>
      <CodeCompare
        js={`const user = { id: 1, name: "Alice", age: 30 };

// 引数で直接分割して受け取る
function greet({ name, age }) {
  return \`\${name} (\${age})\`;
}

console.log(greet(user)); // "Alice (30)"`}
        ts={`const user = { id: 1, name: "Alice", age: 30 };

// 引数の型は「受け取るオブジェクトの形」として書く
function greet({ name, age }: { name: string; age: number }): string {
  return \`\${name} (\${age})\`;
}

console.log(greet(user)); // "Alice (30)"`}
      />
      <p>
        戻り値はどちらも <code>{'"Alice (30)"'}</code> で同一です。TypeScriptでは分割する引数に型を付けられ、<code>greet</code> に <code>name</code> を持たないオブジェクトを渡すとその場でエラーになります。分割の書き方(実行時の動き)は完全に同じで、増えるのは型注釈だけです。
      </p>

      <Heading num="3.4">スプレッド構文</Heading>
      <p>
        3.1で登場した<Term>スプレッド構文</Term>(<code>...</code>)を、配列とオブジェクトの<strong>コピーと結合</strong>という視点で整理します。スプレッドは「中身を展開して新しい入れ物に並べ直す」操作です。これが<Term>イミュータブルな結合</Term>の基本になります。
      </p>
      <CodeCompare
        js={`const a = [1, 2];
const b = [3, 4];

// 配列の結合(元の a, b は無傷)
const merged = [...a, ...b];

const base = { id: 1, name: "Alice" };
const extra = { age: 30 };

// オブジェクトの結合(元の base, extra は無傷)
const combined = { ...base, ...extra };

console.log(JSON.stringify(merged));   // "[1,2,3,4]"
console.log(JSON.stringify(combined)); // '{"id":1,"name":"Alice","age":30}'`}
        ts={`const a: number[] = [1, 2];
const b: number[] = [3, 4];

// 配列の結合(元の a, b は無傷)
const merged: number[] = [...a, ...b];

const base = { id: 1, name: "Alice" };
const extra = { age: 30 };

// オブジェクトの結合(元の base, extra は無傷)
const combined: { id: number; name: string; age: number } = { ...base, ...extra };

console.log(JSON.stringify(merged));   // "[1,2,3,4]"
console.log(JSON.stringify(combined)); // '{"id":1,"name":"Alice","age":30}'`}
      />
      <p>
        <code>JSON.stringify</code> で確認すると、結合結果はJS/TSで<strong>同一の文字列</strong>になります(配列は <code>[1,2,3,4]</code>、オブジェクトは <code>id / name / age</code> を持つ)。<code>push</code> や <code>Object.assign</code> のように既存のデータを書き換えるのではなく、<code>[...a, ...b]</code> / <code>{"{ ...a, ...b }"}</code> と書けば<strong>元を残したまま新しい結合結果</strong>が手に入ります。オブジェクトの結合では、後ろに書いたキーが同名の前のキーを上書きする、という点だけ覚えておけば十分です。
      </p>

      <Heading num="3.5">オブジェクトの型を設計する</Heading>
      <p>
        最後に、これまで断片的に使ってきたオブジェクトの型を、<strong>設計</strong>という観点でまとめます。型を定義する道具は <code>interface</code> と <code>type</code> の2つ。どちらもオブジェクトの形を表現でき、多くの場面で置き換え可能です。おおまかには、オブジェクトの形には <code>interface</code>、<strong>Union型</strong>(後述)のような柔軟な型には <code>type</code>、と使い分けます。
      </p>
      <CodeCompare
        js={`// JS にはオブジェクトの「形の宣言」はない。
// 値をその場で作るだけ。
const user = {
  id: 1,
  name: "Alice",
  // email は無くてもよい
};

console.log(user.name); // "Alice"`}
        ts={`// interface で形を宣言する
interface User {
  readonly id: number;       // readonly: 後から変更禁止
  name: string;
  email?: string;            // ? : 省略可能なプロパティ
}

const user: User = {
  id: 1,
  name: "Alice",
  // email は省略できる
};

console.log(user.name); // "Alice"`}
      />
      <p>
        <code>?</code>(<Term>オプショナル</Term>)は「あってもなくてもよいプロパティ」、<code>{"readonly"}</code> は「一度作ったら書き換えないプロパティ」を表します。実行時の値はJS版と同じ <code>{'{ id: 1, name: "Alice" }'}</code> ですが、TS版は「<code>email</code> は文字列か未定義」「<code>id</code> は変更不可」という設計上のルールを型として明文化できます。
      </p>
      <p>
        もう一歩進めます。「読み込み中・成功・失敗」のように、データが<strong>いくつかの状態のどれか</strong>を取る場面はよくあります。これを表すのが <code>|</code> を使った<Term>Union型</Term>です。とくに各状態に <code>status</code> のような<strong>目印(タグ)</strong>を付けたものを<Term>判別可能Union(タグ付きUnion)</Term>と呼びます。これは、状態と付随データを<strong>データそのものとして表現する</strong>関数型のやり方(いわゆるADT)の入口です。
      </p>
      <CodeCompare
        js={`// JS では「ただのオブジェクト」。どんな形が来るかは
// 実行してみないと分からない。
function render(state) {
  if (state.status === "success") {
    return \`データ: \${state.data}\`;
  }
  return "読み込み中...";
}

console.log(render({ status: "loading" }));
console.log(render({ status: "success", data: "Alice" }));`}
        ts={`// status というタグで状態を区別する判別可能 Union
type State =
  | { status: "loading" }
  | { status: "success"; data: string };

function render(state: State): string {
  if (state.status === "success") {
    return \`データ: \${state.data}\`; // ここでは data の存在が保証される
  }
  return "読み込み中...";
}

console.log(render({ status: "loading" }));
console.log(render({ status: "success", data: "Alice" }));`}
      />
      <p>
        出力はJS/TSとも <code>{'"読み込み中..."'}</code> と <code>{'"データ: Alice"'}</code> で同じです。TypeScriptでは <code>status</code> を調べた分岐の中で「<code>data</code> が存在すること」を型が保証してくれるため、<code>loading</code> 状態なのに <code>data</code> を読もうとするミスを実行前に防げます。判別可能Unionの本格的な活用 ― <code>switch</code> による網羅的な処理など ― は、次章「<Link href="/dev/language/types">型を使いこなす</Link>」で詳しく扱います。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>不変更新が基本</h4>
          <p>破壊的代入や <code>push</code> で元を書き換えず、スプレッドや <code>map</code> で<strong>新しいデータ</strong>を作ります。元が残るので変換を追いやすくなります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>配列は変換メソッドで</h4>
          <p><code>map</code> / <code>filter</code> / <code>reduce</code> / <code>flatMap</code> は元を壊さず新しい配列を返し、意図がそのままコードに表れます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>分割代入とスプレッド</h4>
          <p>分割代入で必要な値を取り出し、スプレッドでコピー・結合する ― 不変なデータ操作の道具立てです。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>型で形を設計する</h4>
          <p><code>interface</code> / <code>type</code>、<code>?</code>、<code>{"readonly"}</code>、判別可能Unionで、データの形とルールを明文化できます。</p>
        </Card>
      </CardGrid>
      <p>
        データの形を型で設計できるようになると、次はその型を<strong>使いこなす</strong>段階です。判別可能Unionの網羅的な処理、リテラル型、絞り込み(Narrowing)といった、TypeScriptの表現力を引き出す道具を、次章「<Link href="/dev/language/types">型を使いこなす</Link>」で学びます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
