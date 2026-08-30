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

export const metadata: Metadata = { title: "関数 ― プログラムの中心" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>関数 ― プログラムの中心</h1>
        <Lead>
          <Link href="/language/js-values">値と型</Link>では、数値や文字列といった値を<code>const</code>で不変に扱うことを学びました。ここでは、その値を<Term>受け取って別の値を返す</Term>仕組み ―
          <Term>関数</Term>を見ていきます。JavaScriptでは関数そのものが値であり、変数に入れたり他の関数に渡したりできます。この性質が関数型の書き方の土台です。
        </Lead>
      </Hero>

      <Heading num="01">関数の定義と呼び出し</Heading>
      <p>
        関数とは「入力(引数)を受け取り、出力(返り値)を返す小さな部品」です。JavaScriptでは<Term>関数もひとつの値</Term>で、変数に代入できます。関数を値として扱えることを<Term>第一級関数</Term>と呼び、これが以降を貫く考え方になります。
      </p>

      <pre>
        <code>{`// 関数宣言
function add(a: number, b: number): number {
  return a + b;
}

// 関数式 ― 関数を変数に代入する(関数は値)
const multiply = function (a: number, b: number): number {
  return a * b;
};

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6`}</code>
      </pre>

      <p>
        型を付ける場所は2つ ― 引数(<code>a: number</code>)と返り値(<code>): number</code>)です。<code>add(2, &quot;3&quot;)</code>のように文字列を渡すと、実行する前に警告が出ます。ロジックはJavaScriptと1文字も変わらず、増えているのは型注釈だけです。
      </p>

      <Analogy label="💡 たとえるなら">
        関数は自動販売機です。お金(引数)を入れると決まった商品(返り値)が出てきます。第一級関数とは、その自動販売機そのものを箱に入れて別の場所へ運んだり、誰かに手渡したりできる、ということです。
      </Analogy>

      <Heading num="02">純粋関数と副作用</Heading>
      <p>
        関数には大きく2つの性質があります。ひとつは<Term>純粋関数</Term> ―
        同じ入力に対して必ず同じ出力を返し、外の世界に何の影響も与えない関数です。もうひとつは<Term>副作用</Term>を持つ関数 ―
        ログの出力、画面の書き換え、外部変数の変更など、返り値以外の形で外に働きかける関数です。
      </p>

      <pre>
        <code>{`let total = 0;

// 副作用あり ― 外の変数を書き換え、ログも出す
function addToTotal(n: number): number {
  total += n;
  console.log(total);
  return total;
}

// 純粋 ― 入力だけから出力を計算する
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 5)); // 15(いつ何回呼んでも 15)`}</code>
      </pre>

      <p>
        純粋関数はテストしやすく、結果が予測でき、安心して使い回せます。関数型のスタイルでは<Term>計算(純粋関数)と効果(副作用)をできるだけ分けて書く</Term>ことを大切にします(<Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>)。
      </p>

      <Heading num="03">アロー関数</Heading>
      <p>
        関数式には、より短く書ける<Term>アロー関数</Term>という記法があります。処理が<code>return</code>だけの短い関数では、波かっこと<code>return</code>を省略でき、式の結果がそのまま返ります。
      </p>

      <pre>
        <code>{`// (1) 関数宣言
function double(n: number): number {
  return n * 2;
}

// (2) アロー関数 ― 波かっこと return を省略
const double2 = (n: number): number => n * 2;

// (3) 返り値の型は推論されるので省略も多い
const double3 = (n: number) => n * 2;`}</code>
      </pre>

      <p>
        アロー関数は短いだけでなく、<Term>自分の<code>this</code>を持たない</Term>という重要な性質があります。関数型のスタイルでは<code>this</code>にほとんど頼らないため、相性よく使えます。
      </p>

      <Heading num="04">高階関数と合成</Heading>
      <p>
        関数が値だということは、<Term>関数を引数として受け取ったり、関数を返したりできる</Term>ということです。このような関数を<Term>高階関数</Term>と呼びます。次章で学ぶ<code>map</code>や<code>filter</code>は、まさに「関数を渡して使う」高階関数です。
      </p>

      <pre>
        <code>{`// 関数 f を引数に取る ― f は「number を受け取り number を返す関数」
function applyTwice(f: (x: number) => number, x: number): number {
  return f(f(x));
}

const inc = (n: number) => n + 1;
console.log(applyTwice(inc, 10)); // 12(10 → 11 → 12)`}</code>
      </pre>

      <p>
        次は関数を<Term>返す</Term>例、そして小さな関数を組み合わせる<Term>合成</Term>です。<code>compose(f, g)</code>は「まず<code>f</code>を適用し、その結果に<code>g</code>を適用する新しい関数」を返します。
      </p>

      <pre>
        <code>{`type NumFn = (n: number) => number;

const compose = (f: NumFn, g: NumFn): NumFn => (x) => g(f(x));

const inc: NumFn = (n) => n + 1;
const double: NumFn = (n) => n * 2;

console.log(compose(inc, double)(3)); // 8 ((3 + 1) * 2)`}</code>
      </pre>

      <p>
        小さな部品を組み合わせて大きな処理を作る ―
        これが関数型の醍醐味です(<Link href="/design/paradigm-functional-composition">関数を組み合わせる</Link>)。関数の型に<code>type</code>で名前を付けておくと、繰り返し使えて読みやすくなります。
      </p>

      <Heading num="05">デフォルト引数・Rest引数・部分適用</Heading>
      <p>
        引数には<Term>デフォルト値</Term>を設定できます。引数の数が決まっていないときは<Term>Rest引数</Term>(<code>{"...args"}</code>)を使い、余った引数をすべて配列としてまとめます。
      </p>

      <pre>
        <code>{`function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}
console.log(greet("Alice"));     // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

function sum(...args: number[]): number {
  return args.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3)); // 6`}</code>
      </pre>

      <p>
        「関数を返す」を応用すると<Term>部分適用</Term>ができます。引数の一部を先に固定した新しい関数を作るテクニックです(<Link href="/design/paradigm-functional-currying">引数を固定する</Link>)。
      </p>

      <pre>
        <code>{`const multiplier = (factor: number) => (n: number): number => n * factor;

const triple = multiplier(3); // factor = 3 を固定
console.log(triple(5));  // 15
console.log(triple(10)); // 30`}</code>
      </pre>

      <p>
        <code>triple</code>は「3を掛ける」という役割だけを持った専用の関数になりました。なぜ<code>triple</code>が<code>factor</code>の値を覚えていられるのか ―
        その答えが次のクロージャです。
      </p>

      <Heading num="06">スコープとクロージャ</Heading>
      <p>
        <Term>スコープ</Term>とは「変数が見える範囲」のことです。<code>let</code>・<code>const</code>は<Term>ブロックスコープ</Term>を持ち、宣言された波かっこの中だけで有効です。そして関数は、<Term>自分が作られたときに見えていた変数を、後からでも覚えている</Term>という性質を持ちます。この「関数 + 関数が覚えている変数」の組み合わせを<Term>クロージャ</Term>と呼びます。
      </p>

      <DiagramFrame
        slug="language-js-closure"
        aspect="640 / 290"
        caption="クロージャの仕組み。createCounterを呼ぶと呼び出しごとにcountが新しく作られ、その中で定義された内側の関数が返される。返された関数は生まれた場所のcountを覚えたまま外へ持ち出されるため、next()を呼ぶたびにcountが1ずつ増える。countは外から直接触る手段がなく、返された関数を通してしか変更できない。createCounterをもう一度呼べば別のcountが作られるので、2つのカウンタは互いに影響しない。"
      />

      <pre>
        <code>{`function createCounter(): () => number {
  let count = 0; // 外からは見えない(閉じ込められた状態)
  return (): number => {
    count += 1;  // 内側の関数が count を覚えている
    return count;
  };
}

const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3`}</code>
      </pre>

      <p>
        <code>createCounter</code>のように「関数を使って部品を作る」関数を<Term>ファクトリ関数</Term>と呼びます。クラスを使わずに、状態を持った部品を関数だけで作れるのが利点です。戻り値の型<code>{"() => number"}</code>を明記しておくと、使い方も型で保証できます。
      </p>

      <Aside label="クラス版との対比">
        同じカウンタは、<Term>クラス</Term>と<code>this</code>を使っても書けます。<Link href="/language/js-classes">クラスとプロトタイプ</Link>で、このクロージャ版とオブジェクト版を同じ使い勝手のまま並べて対比します。ここではまずクロージャを基本として身につけます。
      </Aside>

      <Heading num="07">this ― 読むための最小限</Heading>
      <p>
        <code>this</code>は「関数がどう呼ばれたか」によって中身が変わる特別な変数です。オブジェクトのメソッドとして呼ぶとそのオブジェクトを指しますが、呼び方を変えると指す先も変わり、つまずきやすい原因になります。
      </p>
      <p>
        関数型のスタイルでは<code>this</code>は基本的に使いません。状態はクロージャで閉じ込め、データは引数で明示的に渡すからです。ここで扱うのは、ライブラリやDOM、クラス構文で書かれた既存コードを<Term>読む</Term>ためです。
      </p>

      <pre>
        <code>{`type User = { name: string };

// this を使う版(オブジェクトのメソッド)
const user = {
  name: "Alice",
  greet(): string {
    return \`Hello, I'm \${this.name}\`; // this は user を指す
  },
};

// this に依存しない関数版 ― データを引数で渡す
const greet = (u: User): string => \`Hello, I'm \${u.name}\`;

console.log(user.greet()); // "Hello, I'm Alice"
console.log(greet(user));  // "Hello, I'm Alice"`}</code>
      </pre>

      <p>
        関数版では、データを引数として明示的に渡すので「何を使って計算しているか」がひと目で分かり、<code>this</code>の落とし穴もありません。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>関数は値である</h4>
          <p>
            変数に入れ、引数として渡し、返り値として返せます。型は引数と返り値に付けます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>純粋関数を基本に</h4>
          <p>
            同じ入力なら同じ出力を返す関数はテストしやすい。計算と効果を分けて書きます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>高階関数と合成</h4>
          <p>
            関数を受け取る・返す関数で、小さな部品を組み合わせます。<code>map</code>へつながる考え方です。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>クロージャで状態を持つ</h4>
          <p>
            関数は生まれた場所の変数を覚えます。クラスや<code>this</code>に頼らず状態を閉じ込められます。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、この関数を<code>map</code>・<code>filter</code>・<code>reduce</code>に渡して、オブジェクトや配列を不変に変換していく
        <Link href="/language/js-data">データの変換</Link>を見ていきます。
      </p>

      <DocsFooter href="/language/js-functions" />
    </DocsPage>
  );
}
