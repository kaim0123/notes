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

export const metadata: Metadata = {
  title: "データの変換 ― オブジェクトと配列",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>データの変換 ― オブジェクトと配列</h1>
        <Lead>
          <Link href="/language/js-functions">関数</Link>では、関数を受け取る高階関数を学びました。ここでは、その高階関数を実際に使う相手である<Term>オブジェクト</Term>と<Term>配列</Term>を扱います。鍵になる考え方は<Term>不変(イミュータブル)</Term>
          ― 既存のデータを書き換えるのではなく、新しいデータを作って返すという関数型のスタイルです。
        </Lead>
      </Hero>

      <p>
        プログラムのほとんどは「あるデータを、別の形のデータに変換する」作業の連続です。ユーザー一覧から名前だけを取り出す、価格に消費税を足す、条件に合う商品だけを絞り込む ―
        どれもデータの変換です。変換のときに<Term>元のデータには手を触れない</Term>という原則を徹底すると、どこで何が書き換わったか分からなくなる不具合を避けられます。
      </p>

      <DiagramFrame
        slug="language-js-immutable-chain"
        aspect="640 / 300"
        caption="破壊的な更新と不変な変換の比較。上段の破壊的な更新は1つの配列の箱にpushで詰め込んでいくため、箱は1つのままで途中の状態は残らない。下段の不変な変換は、元の配列にfilterが新しい配列を作り、その結果にmapがさらに新しい配列を作る。3つの配列はすべて無傷のまま残るため、どの段階で何が起きたかを後から確かめられる。"
      />

      <Heading num="01">オブジェクト ― 不変に更新する</Heading>
      <p>
        <Term>オブジェクト</Term>は「名前(キー)と値」の組をまとめたデータです。名前を変えたいとき、もっとも素直に思いつくのはプロパティへの直接代入ですが、これは<Term>破壊的</Term>な操作で元のオブジェクトそのものを書き換えてしまいます。代わりに<Term>スプレッド構文</Term>(<code>...</code>)で中身を新しいオブジェクトにコピーし、一部だけ上書きします。
      </p>

      <pre>
        <code>{`const user = { id: 1, name: "Alice" };

// 破壊的 ― 元の user を書き換える
user.name = "Bob";

// 不変 ― 新しいオブジェクトを作る(元は無傷)
const renamed = { ...user, name: "Bob" };
console.log(renamed); // { id: 1, name: "Bob" }`}</code>
      </pre>

      <p>
        どちらも最終結果は同じですが、違うのは「元のデータが残るかどうか」です。変換の前後を両方持てることが、後の状態管理などで効いてきます。
      </p>

      <Analogy label="💡 たとえるなら">
        破壊的代入は「原本の書類に直接赤ペンで書き込む」操作です。手早いですが、元の内容は消えてしまいます。スプレッドによる不変更新は「原本をコピー機で複製し、その複製にだけ手を入れる」操作 ―
        原本はいつでも見返せます。
      </Analogy>

      <p>
        TypeScriptは値の変換ロジックには手を加えず、「このオブジェクトはどんな形か」という契約だけを足します。<code>readonly</code>を付ければ、不変のルールを型で強制できます。
      </p>

      <pre>
        <code>{`interface User {
  readonly id: number;  // 後から書き換え禁止
  name: string;
  email?: string;       // ? を付けると省略可能
}

const user: User = { id: 1, name: "Alice" };
// user.id = 2;       // Error: readonly なので代入不可
const renamed: User = { ...user, name: "Bob" };`}</code>
      </pre>

      <p>
        守りたいルールをコメントやレビューではなく型で担保できるのが、TypeScriptだけの価値です。
      </p>

      <Heading num="02">配列 ― 変換メソッドで作り直す</Heading>
      <p>
        「各要素を2倍した新しい配列がほしい」という処理を考えます。命令型では空の配列を用意して<code>for</code>で回し、<code>push</code>で詰め込みます。関数型では<code>map</code>を使い、各要素に関数を適用した新しい配列を受け取ります。
      </p>

      <pre>
        <code>{`const nums: number[] = [10, 20, 30];

// 命令型 ― 空配列に push で詰めていく(破壊的)
const doubledLoop: number[] = [];
for (let i = 0; i < nums.length; i++) {
  doubledLoop.push(nums[i] * 2);
}

// 関数型 ― map で新しい配列を作る(元は無傷)
const doubled = nums.map((n) => n * 2);

// どちらも [20, 40, 60]`}</code>
      </pre>

      <p>
        結果は同じですが、<code>map</code>版は①一時変数もループカウンタも要らず、②「各要素を2倍する」という意図がそのまま1行に表れ、③元の<code>nums</code>を壊しません。
      </p>

      <p>
        よく使う変換メソッドは4つです。いずれも元の配列を壊さず、新しい値を返します。
      </p>

      <pre>
        <code>{`const nums = [1, 2, 3, 4, 5, 6];

const evens = nums.filter((n) => n % 2 === 0);      // [2, 4, 6]
const sum   = nums.reduce((acc, n) => acc + n, 0);  // 21
const pairs = nums.flatMap((n) => [n, n * 10]);     // [1, 10, 2, 20, ...]
const names = nums.map((n) => \`#\${n}\`);            // ["#1", "#2", ...]`}</code>
      </pre>

      <Aside label="チェーンできる理由">
        <code>map</code>・<code>filter</code>・<code>flatMap</code>は新しい配列を返すので、<code>nums.filter(...).map(...)</code>のように数珠つなぎにできます。小さな変換を並べて大きな変換を組み立てられるのが、関数型スタイルの強みです。
      </Aside>

      <Heading num="03">分割代入 ― まとめて取り出す</Heading>
      <p>
        <Term>分割代入</Term>は、オブジェクトや配列の中身をまとめて取り出して変数にする書き方です。もっとも活きるのは<Term>関数の引数</Term>で、オブジェクトをそのまま受け取り、その場で必要なプロパティに分解できます。
      </p>

      <pre>
        <code>{`const user = { id: 1, name: "Alice", age: 30 };

const { name, age } = user;          // "Alice" 30
const [first, second] = ["赤", "青"]; // "赤" "青"

// 引数で直接分割して受け取る ― 関数型で頻出のパターン
function greet({ name, age }: { name: string; age: number }): string {
  return \`\${name} (\${age})\`;
}
console.log(greet(user)); // "Alice (30)"`}</code>
      </pre>

      <Heading num="04">スプレッド構文 ― コピーと結合</Heading>
      <p>
        スプレッドは「中身を展開して新しい入れ物に並べ直す」操作で、これが<Term>イミュータブルな結合</Term>の基本になります。
      </p>

      <pre>
        <code>{`const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];        // [1, 2, 3, 4](a, b は無傷)

const base = { id: 1, name: "Alice" };
const combined = { ...base, age: 30 };
// { id: 1, name: "Alice", age: 30 }(base は無傷)`}</code>
      </pre>

      <p>
        オブジェクトの結合では、<Term>後ろに書いたキーが同名の前のキーを上書きする</Term>という点だけ覚えておけば十分です。
      </p>

      <Heading num="05">オブジェクトの型を設計する</Heading>
      <p>
        型を定義する道具は<code>interface</code>と<code>type</code>の2つで、多くの場面で置き換え可能です。おおまかには、オブジェクトの形には<code>interface</code>、Union型のような柔軟な型には<code>type</code>と使い分けます。
      </p>
      <p>
        「読み込み中・成功・失敗」のように、データが<Term>いくつかの状態のどれか</Term>を取る場面はよくあります。これを表すのが<code>|</code>を使った<Term>Union型</Term>で、とくに各状態に目印を付けたものを<Term>判別可能Union</Term>と呼びます。状態と付随データをデータそのものとして表現する、関数型のやり方の入口です。
      </p>

      <pre>
        <code>{`type State =
  | { status: "loading" }
  | { status: "success"; data: string };

function render(state: State): string {
  if (state.status === "success") {
    return \`データ: \${state.data}\`; // ここでは data の存在が保証される
  }
  return "読み込み中...";
}`}</code>
      </pre>

      <p>
        <code>status</code>を調べた分岐の中では「<code>data</code>が存在すること」を型が保証してくれるため、<code>loading</code>状態なのに<code>data</code>を読もうとするミスを実行前に防げます。本格的な活用は次の<Link href="/language/js-types">型を使いこなす</Link>で扱います。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>不変更新が基本</h4>
          <p>
            破壊的代入や<code>push</code>で元を書き換えず、スプレッドや<code>map</code>で新しいデータを作ります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>配列は変換メソッドで</h4>
          <p>
            <code>map</code>・<code>filter</code>・<code>reduce</code>・<code>flatMap</code>は元を壊さず、意図がそのままコードに表れます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>分割代入とスプレッド</h4>
          <p>
            必要な値を取り出し、コピー・結合する ― 不変なデータ操作の道具立てです。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>型で形を設計する</h4>
          <p>
            <code>?</code>・<code>readonly</code>・判別可能Unionで、データの形とルールを明文化できます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/js-data" />
    </DocsPage>
  );
}
