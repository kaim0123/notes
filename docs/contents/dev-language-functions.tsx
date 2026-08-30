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
  title: "関数 ― プログラムの中心",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第2章 関数 ― プログラムの中心</h1>
        <Lead>
          前章「<Link href="/dev/language/values">値と型</Link>」では、数値や文字列といった<Term>値</Term>を<code>const</code>で不変に扱うことを学びました。この章では、その値を<Term>受け取って別の値を返す</Term>仕組み ― <Term>関数</Term>を学びます。関数はこの本の主役です。JavaScriptでは関数そのものが値であり、変数に入れたり、他の関数に渡したりできます。この性質を土台にした<Term>関数型</Term>の書き方を、いつものように「まずJavaScript → 同じ結果になるTypeScript」の書き比べで見ていきます。
        </Lead>
      </Hero>

      <Heading num="2.1">関数の定義と呼び出し</Heading>
      <p>関数とは「入力(引数)を受け取り、出力(返り値)を返す小さな部品」です。もっとも基本的な書き方が<Term>関数宣言</Term>です。<code>function</code>キーワードで名前を付け、<code>return</code>で値を返します。</p>
      <p>前章で見た値と同じように、JavaScriptでは<strong>関数もひとつの値</strong>です。変数に代入することもでき、この形を<Term>関数式</Term>と呼びます。関数を値として扱えることを<Term>第一級関数</Term>(first-class function)と言い、これがこの章全体を貫く考え方になります。</p>
      <CodeCompare
        js={`// 関数宣言
function add(a, b) {
  return a + b;
}

// 関数式(関数を変数に代入する = 関数は値)
const multiply = function (a, b) {
  return a * b;
};

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6`}
        ts={`// 関数宣言(引数と返り値に型を付ける)
function add(a: number, b: number): number {
  return a + b;
}

// 関数式でも型を付ける場所は同じ
const multiply = function (a: number, b: number): number {
  return a * b;
};

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6`}
      />
      <p>実行結果はJavaScriptとTypeScriptで完全に同じ(<code>5</code>と<code>6</code>)です。増えているのは<strong>型注釈だけ</strong>で、ロジックは1文字も変わっていません。</p>

      <Aside label="ここからTSが加わる">
        型を付ける場所は2つ ― <strong>引数</strong>(<code>a: number</code>)と<strong>返り値</strong>(<code>): number</code>)です。<code>add(2, &quot;3&quot;)</code>のように文字列を渡すと、TypeScriptは実行する前に「<code>number</code>型が必要です」と警告します。JavaScriptでは実行するまで気づけなかった間違いを、書いている最中に発見できるのがTypeScriptの価値です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        関数は「自動販売機」です。お金(引数)を入れると、決まった商品(返り値)が出てきます。第一級関数とは、その自動販売機そのものを箱に入れて別の場所へ運んだり、誰かに手渡したりできる、ということです。JavaScriptでは関数を値として自由に持ち運べます。
      </Analogy>

      <Heading num="2.2">純粋関数と副作用</Heading>
      <p>関数には大きく2つの性質があります。ひとつは<Term>純粋関数</Term> ― <strong>同じ入力に対して必ず同じ出力を返し、外の世界に何の影響も与えない</strong>関数です。もうひとつは<Term>副作用</Term>(side effect)を持つ関数 ― ログの出力、画面(DOM)の書き換え、外部変数の変更など、返り値以外の形で外の世界に働きかける関数です。</p>
      <p>関数型のスタイルでは、<strong>計算(純粋関数)と効果(副作用)をできるだけ分けて書く</strong>ことを大切にします。純粋関数はテストしやすく、結果が予測でき、安心して使い回せるからです。</p>
      <CodeCompare
        js={`let total = 0;

// 副作用あり: 外部変数を書き換え、ログも出す
function addToTotalImpure(n) {
  total += n;           // 外の変数を変更(副作用)
  console.log(total);   // ログ出力(副作用)
  return total;
}

// 純粋: 入力だけから出力を計算する
function addPure(a, b) {
  return a + b;
}

console.log(addPure(10, 5)); // 15(何度呼んでも15)`}
        ts={`let total = 0;

// 副作用あり
function addToTotalImpure(n: number): number {
  total += n;
  console.log(total);
  return total;
}

// 純粋: 同じ入力 → 常に同じ出力
function addPure(a: number, b: number): number {
  return a + b;
}

console.log(addPure(10, 5)); // 15(何度呼んでも15)`}
      />
      <p>純粋版の<code>addPure(10, 5)</code>は、いつ・何回呼んでも必ず<code>15</code>を返します。一方、副作用版<code>addToTotalImpure</code>の結果は、それまでに何回呼ばれたか(<code>total</code>の状態)に左右されます。TypeScript版でも戻り値は同じで、加わったのは型注釈だけです。型を付けておくと、副作用関数が「本当は何を返すのか(<code>number</code>)」も一目で分かります。</p>

      <Heading num="2.3">アロー関数</Heading>
      <p>関数式には、より短く書ける<Term>アロー関数</Term>という記法があります。<code>function</code>キーワードの代わりに<code>{"=>"}</code>(矢印)を使います。処理が<code>return</code>だけの短い関数では、波かっこと<code>return</code>を省略でき、式の結果がそのまま返ります。</p>
      <p>ここでは同じ<code>double</code>(数を2倍にする)を、<strong>関数宣言版・アロー版・型付きアロー版</strong>の3点セットで並べます。どれを実行しても結果は同じ<code>10</code>です。</p>
      <CodeCompare
        js={`// (1) 関数宣言
function double(n) {
  return n * 2;
}

// (2) アロー関数(波かっこと return を省略)
const doubleArrow = (n) => n * 2;

console.log(double(5));      // 10
console.log(doubleArrow(5)); // 10`}
        ts={`// (3) 型付きアロー関数
const double = (n: number): number => n * 2;

// 返り値の型は推論されるので省略も多い
const doubleArrow = (n: number) => n * 2;

console.log(double(5));      // 10
console.log(doubleArrow(5)); // 10`}
      />
      <p>アロー関数は単に短いだけでなく、<strong><code>this</code>を自分で持たない</strong>という重要な性質があります。関数型のスタイルでは<code>this</code>にほとんど頼らないため、アロー関数がとても相性よく使えます(<code>this</code>については本章 2.8 で最小限に触れます)。</p>

      <Heading num="2.4">高階関数</Heading>
      <p>関数が値であるということは、<strong>関数を引数として受け取ったり、関数を返したりできる</strong>ということです。このような関数を<Term>高階関数</Term>(higher-order function)と呼びます。次章で学ぶ<code>map</code>や<code>filter</code>は、まさに「関数を渡して使う」高階関数です。その前振りとして、ここで「関数を渡す」感覚をつかみましょう。</p>
      <p>まずは関数を<strong>引数に取る</strong>例です。<code>applyTwice</code>は「渡された関数を2回続けて適用する」関数です。</p>
      <CodeCompare
        js={`// 関数 f を引数に取る高階関数
function applyTwice(f, x) {
  return f(f(x));
}

const inc = (n) => n + 1;

console.log(applyTwice(inc, 10)); // 12(10 → 11 → 12)`}
        ts={`// f は「number を受け取り number を返す関数」型
function applyTwice(f: (x: number) => number, x: number): number {
  return f(f(x));
}

const inc = (n: number): number => n + 1;

console.log(applyTwice(inc, 10)); // 12`}
      />
      <p>次は関数を<strong>返す</strong>例、そして小さな関数を組み合わせる<Term>合成</Term>(composition)です。<code>compose(f, g)</code>は「まず<code>f</code>を適用し、その結果に<code>g</code>を適用する新しい関数」を返します。小さな部品を組み合わせて大きな処理を作る ― これが関数型の醍醐味です。</p>
      <CodeCompare
        js={`// 2つの関数を合成して新しい関数を返す
const compose = (f, g) => (x) => g(f(x));

const inc = (n) => n + 1;
const double = (n) => n * 2;

const incThenDouble = compose(inc, double);
console.log(incThenDouble(3)); // 8((3+1) * 2)`}
        ts={`const compose =
  (f: (x: number) => number, g: (x: number) => number) =>
  (x: number): number =>
    g(f(x));

const inc = (n: number) => n + 1;
const double = (n: number) => n * 2;

const incThenDouble = compose(inc, double);
console.log(incThenDouble(3)); // 8`}
      />
      <p>どちらも結果は<code>8</code>です。TypeScript版では、渡す関数の形(<code>{"(x: number) => number"}</code>)まで型で表現できるため、うっかり形の違う関数を渡すミスを未然に防げます。</p>

      <Heading num="2.5">デフォルト引数・Rest引数</Heading>
      <p>引数には<Term>デフォルト値</Term>を設定できます。引数が渡されなかったとき(<code>undefined</code>のとき)に使われる値です。<code>引数 = 既定値</code>の形で書きます。</p>
      <CodeCompare
        js={`// greeting を省略すると "Hello" が使われる
function greet(name, greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet("Alice"));         // "Hello, Alice!"
console.log(greet("Bob", "Hi"));     // "Hi, Bob!"`}
        ts={`function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet("Alice"));     // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"`}
      />
      <p>引数の数が決まっていないときは<Term>Rest引数</Term>を使います。<code>{"...args"}</code>と書くと、余った引数がすべて配列としてまとめられます。TypeScriptでは<code>{"...args: number[]"}</code>のように「配列の要素の型」を指定します。</p>
      <CodeCompare
        js={`// 任意個の数値を受け取って合計する
function sum(...args) {
  return args.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(10, 20));     // 30`}
        ts={`function sum(...args: number[]): number {
  return args.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(10, 20));  // 30`}
      />
      <p>2.4の「関数を返す」を応用すると、<Term>部分適用</Term>ができます。引数の一部を先に固定した新しい関数を作るテクニックで、次節のクロージャがその仕組みを支えています。</p>
      <CodeCompare
        js={`// 掛ける数を先に固定して、新しい関数を作る
const multiplier = (factor) => (n) => n * factor;

const triple = multiplier(3); // factor=3 を固定
console.log(triple(5));       // 15
console.log(triple(10));      // 30`}
        ts={`const multiplier = (factor: number) => (n: number): number => n * factor;

const triple = multiplier(3);
console.log(triple(5));  // 15
console.log(triple(10)); // 30`}
      />
      <p>結果はどちらも<code>15</code>・<code>30</code>で同じです。<code>triple</code>は「3を掛ける」という役割だけを持った専用の関数になりました。なぜ<code>triple</code>が<code>factor</code>の値(3)を覚えていられるのか ― その答えが次のクロージャです。</p>

      <Heading num="2.6">スコープとクロージャ</Heading>
      <p><Term>スコープ</Term>とは「変数が見える範囲」のことです。前章で学んだ<code>let</code>・<code>const</code>は<Term>ブロックスコープ</Term>を持ち、宣言された<code>{"{ }"}</code>の中だけで有効です。そして関数は、<strong>自分が作られたときに見えていた変数を、後からでも覚えている</strong>という性質を持ちます。この「関数 + 関数が覚えている変数」の組み合わせを<Term>クロージャ</Term>(closure)と呼びます。</p>
      <p>クロージャを使うと、変数を関数の中に<strong>閉じ込めて</strong>状態を持たせることができます。代表例が<Term>カウンタ</Term>です。<code>count</code>という変数を外から直接触れないように隠しつつ、呼び出すたびに増える関数を作れます。</p>
      <CodeCompare
        js={`// カウンタを作るファクトリ関数
function createCounter() {
  let count = 0; // 外からは見えない(閉じ込められた状態)
  return () => {
    count += 1;  // 内側の関数が count を覚えている
    return count;
  };
}

const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3`}
        ts={`function createCounter(): () => number {
  let count = 0;
  return (): number => {
    count += 1;
    return count;
  };
}

const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3`}
      />
      <p><code>createCounter</code>のように「関数を使ってオブジェクト(のような部品)を作る」関数を<Term>ファクトリ関数</Term>と呼びます。クラスを使わずに、状態を持った部品を関数だけで作れるのが利点です。TypeScript版では戻り値の型<code>{"() => number"}</code>(「呼ぶと数値を返す関数」)を明記しているため、<code>next</code>の使い方を型で保証できます。</p>
      <Aside label="第5章への予告">
        同じカウンタを、<Term>クラス</Term>と<code>this</code>を使って書く方法もあります。<Link href="/dev/language/classes">第5章「クラスとプロトタイプ」</Link>で、このクロージャ版とオブジェクト版を同じAPIで並べて対比します。本書ではまずクロージャ(関数型)を基本として身につけます。
      </Aside>

      <Heading num="2.7">関数型(TypeScript)</Heading>
      <p>ここまで何度か関数の型を書いてきましたが、あらためて整理します。TypeScriptでは<strong>関数そのものにも型がある</strong>ので、「関数を受け取る/返す」高階関数もきちんと型で表現できます。基本の形は<code>{"(引数名: 型) => 戻り値の型"}</code>です。</p>
      <p>たとえばコールバック(あとで呼んでもらう関数)の型は<code>{"(n: number) => number"}</code>のように書きます。これは「数値を1つ受け取り、数値を返す関数」という意味です。2.4の高階関数に、この型注釈を足したのが次のTS版です。実行結果はJS版と完全に同じになります。</p>
      <CodeCompare
        js={`// 配列の各要素に関数を適用する簡易版 map
function mapNumbers(arr, fn) {
  const result = [];
  for (const n of arr) {
    result.push(fn(n));
  }
  return result;
}

console.log(mapNumbers([1, 2, 3], (n) => n * 2)); // [2, 4, 6]`}
        ts={`// fn の型は「number を受け取り number を返す関数」
function mapNumbers(arr: number[], fn: (n: number) => number): number[] {
  const result: number[] = [];
  for (const n of arr) {
    result.push(fn(n));
  }
  return result;
}

console.log(mapNumbers([1, 2, 3], (n) => n * 2)); // [2, 4, 6]`}
      />
      <p>高階関数を返す場合は、型の中に関数型を入れ子にします。読み方に慣れると、<code>{"(f: (x: T) => U) => ..."}</code>のような型も「関数を受け取る関数」だと分かるようになります。関数の型を独立させて<code>type</code>で名前を付けると、繰り返し使えて読みやすくなります。</p>
      <CodeCompare
        js={`const compose = (f, g) => (x) => g(f(x));

const inc = (n) => n + 1;
const double = (n) => n * 2;

console.log(compose(inc, double)(3)); // 8`}
        ts={`// 関数型に名前を付ける
type NumFn = (n: number) => number;

const compose = (f: NumFn, g: NumFn): NumFn => (x) => g(f(x));

const inc: NumFn = (n) => n + 1;
const double: NumFn = (n) => n * 2;

console.log(compose(inc, double)(3)); // 8`}
      />
      <Aside label="オーバーロード(概要)">
        同じ名前の関数でも「引数の型によって戻り値の型が変わる」ことを表現したい場面があります。TypeScriptでは<Term>オーバーロード</Term>という機能で、複数の型の組み合わせ(シグネチャ)を宣言できます。関数型のスタイルでは使う機会は多くないため、ここでは「そういう仕組みがある」とだけ覚えておけば十分です。
      </Aside>

      <Heading num="2.8">this ― 必要最小限</Heading>
      <p>最後に<code>this</code>に触れます。<code>this</code>は「関数がどう呼ばれたか」によって中身が変わる特別な変数です。オブジェクトのメソッドとして呼ぶとそのオブジェクトを指しますが、呼び方を変えると指す先も変わり、初心者がつまずきやすい原因になります。</p>
      <p><strong>関数型のスタイルでは、<code>this</code>は基本的に使いません。</strong>状態はクロージャ(2.6)で閉じ込め、データは引数で明示的に渡すからです。ここで<code>this</code>を扱うのは、<strong>ライブラリやDOM、クラス構文で書かれた既存コードを「読む」ため</strong>です。</p>
      <p>同じ処理を、<code>this</code>を使う版と、<code>this</code>を使わない関数版で比べてみましょう。どちらも結果は<code>{`"Hello, I'm Alice"`}</code>です。</p>
      <CodeCompare
        js={`// this を使う版(オブジェクトのメソッド)
const user = {
  name: "Alice",
  greet() {
    return \`Hello, I'm \${this.name}\`; // this は user を指す
  },
};
console.log(user.greet()); // "Hello, I'm Alice"

// this を使わない関数版(データを引数で渡す)
const greet = (u) => \`Hello, I'm \${u.name}\`;
console.log(greet(user)); // "Hello, I'm Alice"`}
        ts={`type User = { name: string };

const user = {
  name: "Alice",
  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  },
};
console.log(user.greet()); // "Hello, I'm Alice"

// this に依存しない関数版
const greet = (u: User): string => \`Hello, I'm \${u.name}\`;
console.log(greet(user)); // "Hello, I'm Alice"`}
      />
      <p>関数版では、データ(<code>user</code>)を引数として明示的に渡すので、「何を使って計算しているか」がひと目で分かり、<code>this</code>の落とし穴もありません。<code>this</code>は<strong>読むための知識</strong>と割り切り、自分で書くときは<code>this</code>なしの関数を基本にしましょう。</p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>関数は値である</h4>
          <p>変数に入れ、引数として渡し、返り値として返せます(第一級関数)。型は<strong>引数と返り値</strong>に付けます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>純粋関数を基本に</h4>
          <p>同じ入力なら同じ出力を返し、副作用を持たない関数はテストしやすく安心。計算と効果を分けて書きます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>高階関数と合成</h4>
          <p>関数を受け取る/返す関数で、小さな部品を組み合わせます。次章の<code>map</code>へつながる考え方です。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>クロージャで状態を持つ</h4>
          <p>関数は生まれた場所の変数を覚えます。ファクトリ関数で、クラスや<code>this</code>に頼らず状態を閉じ込められます。</p>
        </Card>
      </CardGrid>
      <p>関数という「値を変換する部品」を手に入れました。次章「<Link href="/dev/language/data">データの変換 ― オブジェクトと配列</Link>」では、この関数を<code>map</code>・<code>filter</code>・<code>reduce</code>に渡して、オブジェクトや配列を<strong>不変</strong>に変換していく方法を学びます。ここで身につけた「関数を渡す」感覚が、そのまま生きてきます。</p>

      <DocsFooter />
    </DocsPage>
  );
}
