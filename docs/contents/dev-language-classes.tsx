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
  Diagram,
  CodeCompare,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クラスとプロトタイプ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第5章 クラスとプロトタイプ ― 読むための知識</h1>
        <Lead>
          前章「<Link href="/dev/language/types">型を使いこなす</Link>」までで、値・関数・データ・型という関数型スタイルの土台がそろいました。この章では、多くの言語でおなじみの<Term>クラス</Term>と、その裏側にある<Term>プロトタイプ</Term>を学びます。ただし本書での位置づけは少し特別です ― <strong>自分で新しく書くための道具ではなく、既存のコードやライブラリを「読む」ための知識</strong>として扱います。いつものように「まずJavaScript → 同じ結果になるTypeScript」で書き比べつつ、同じ振る舞いを<strong>関数型ならどう書くか</strong>を必ず隣に並べていきます。
        </Lead>
      </Hero>

      <Aside label="この章の立ち位置">
        本書は<strong>関数(ファクトリ関数 + クロージャ)を主軸</strong>にしているため、クラスの章はあえて後ろに、そして短めに置いています。新しく状態を持つ部品を作りたいときは、まず第2章「<Link href="/dev/language/functions">関数</Link>」の<Link href="/dev/language/functions">クロージャ(2.6)</Link>を優先してください。それでもクラスを学ぶのは、<strong>React以前のライブラリ・DOMのAPI・他人が書いたコード</strong>がクラスやプロトタイプで書かれていることが多く、それらを正しく読むために避けて通れないからです。
      </Aside>

      <Heading num="5.1">プロトタイプ</Heading>
      <p>
        JavaScriptのオブジェクトには、<strong>「自分が持っていないプロパティを探しに行く先」</strong>がひとつ結びついています。これを<Term>プロトタイプ</Term>と呼びます。あるオブジェクトのメソッドを呼ぶと、まず自分自身を探し、見つからなければプロトタイプを探し、さらにそのプロトタイプへ…とたどっていきます。この連なりが<Term>プロトタイプチェーン</Term>です。
      </p>
      <Diagram caption="c は自分に count を持ち、メソッド next は プロトタイプ(counterProto)から借りて使う">
        <svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={50} width={180} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={75} fill="#f2f2f2" fontSize="12" textAnchor="middle">オブジェクト c</text>
          <text x={130} y={94} fill="#9a9a9a" fontSize="10" textAnchor="middle">count: 0</text>
          <rect x={340} y={50} width={180} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={430} y={75} fill="#f2f2f2" fontSize="12" textAnchor="middle">counterProto</text>
          <text x={430} y={94} fill="#9a9a9a" fontSize="10" textAnchor="middle">{"next() {…}"}</text>
          <line x1={220} y1={80} x2={338} y2={80} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowProto)" />
          <text x={279} y={70} fill="#9a9a9a" fontSize="10" textAnchor="middle">__proto__</text>
          <defs>
            <marker id="arrowProto" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>
        第2章では、状態を持つ<Term>カウンタ</Term>を<strong>クロージャ</strong>で作りました(2.6)。<code>count</code>を関数の中に閉じ込め、呼ぶたびに1ずつ増える関数です。まずはその復習版を置きます ― 実行結果は<code>1</code>・<code>2</code>・<code>3</code>です。
      </p>
      <CodeCompare
        js={`// 【関数型】クロージャ版(2.6の復習)
function createCounter() {
  let count = 0; // 外からは見えない状態
  return () => {
    count += 1;
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
      <p>
        同じ「呼ぶたびに増えるカウンタ」を、今度は<strong>プロトタイプ</strong>で作ってみます。状態<code>count</code>はオブジェクト自身が持ち、増やすメソッド<code>next</code>は<strong>プロトタイプ側に1つだけ置いて共有</strong>します。<code>{"Object.create(proto)"}</code>は「<code>proto</code>をプロトタイプに持つ新しいオブジェクト」を作る関数です。
      </p>
      <CodeCompare
        js={`// 【プロトタイプ】共有メソッドを持つ元オブジェクト
const counterProto = {
  next() {
    this.count += 1; // this は呼び出したオブジェクト
    return this.count;
  },
};

// counterProto をプロトタイプにした新しいオブジェクト
const c = Object.create(counterProto);
c.count = 0;

console.log(c.next()); // 1
console.log(c.next()); // 2
console.log(c.next()); // 3`}
        ts={`type Counter = {
  count: number;
  next(): number;
};

const counterProto = {
  next(this: Counter): number {
    this.count += 1;
    return this.count;
  },
};

const c: Counter = Object.create(counterProto);
c.count = 0;

console.log(c.next()); // 1
console.log(c.next()); // 2
console.log(c.next()); // 3`}
      />
      <p>
        どちらのプロトタイプ版も、クロージャ版とまったく同じ<code>1</code>・<code>2</code>・<code>3</code>を出力します。<code>c</code>自身は<code>next</code>を持っていませんが、プロトタイプチェーンをたどって<code>counterProto</code>の<code>next</code>を借りて実行しているのです。TypeScript版で増えたのは、オブジェクトの形を表す<code>Counter</code>型と、メソッド内の<code>{"this"}</code>が何を指すかを教える<code>{"this: Counter"}</code>という注釈だけで、ロジックは同じです。
      </p>
      <Analogy label="💡 たとえるなら">
        プロトタイプは「共用の道具箱」です。カウンタを100個作っても、増やす手順(<code>next</code>)は道具箱に1つ置いておけば全員がそれを借りて使えます。各自が持つのは自分の数え札(<code>count</code>)だけ。一方クロージャ版は、道具も数え札もまとめて1人ずつの箱に閉じ込めるやり方です。
      </Analogy>
      <p>
        大きな違いは<strong>状態の隠しやすさ</strong>です。クロージャ版の<code>count</code>は関数の外から一切触れませんが、プロトタイプ版の<code>c.count</code>は外から自由に書き換えられてしまいます。本書がクロージャを基本にするのは、この「状態をしっかり閉じ込められる」点を重視しているからです。とはいえ、次に見る<code>class</code>構文は、このプロトタイプの仕組みを<strong>読み書きしやすい形に整えたもの</strong>です。
      </p>

      <Heading num="5.2">クラス</Heading>
      <p>
        <Term>クラス</Term>は、5.1のプロトタイプを<strong>より分かりやすい構文で書けるようにした「設計図」</strong>です。<code>{"class"}</code>で定義し、<code>{"new"}</code>を付けて呼ぶと、その設計図から実体(<Term>インスタンス</Term>)が作られます。クラスは3つの要素からできています ― データを保持する<Term>フィールド</Term>、振る舞いを表す<Term>メソッド</Term>、そして生成時に一度だけ走る初期化処理<Term>コンストラクタ</Term>です。
      </p>
      <p>
        銀行口座を例にします。<code>balance</code>(残高)というフィールドを持ち、<code>deposit</code>(入金)で残高を増やします。<code>new BankAccount(1000)</code>で残高1000の口座を作り、500入金すると残高は<strong>1500</strong>になります。
      </p>
      <CodeCompare
        js={`class BankAccount {
  balance;

  constructor(initial) {
    this.balance = initial;
  }

  deposit(amount) {
    this.balance += amount; // 自分の状態を書き換える
    return this.balance;
  }
}

const acc = new BankAccount(1000);
console.log(acc.deposit(500)); // 1500
console.log(acc.balance);      // 1500`}
        ts={`class BankAccount {
  private balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }
}

const acc = new BankAccount(1000);
console.log(acc.deposit(500)); // 1500
// acc.balance は private なので外から触れない`}
      />
      <p>
        TypeScriptでクラスに型を付ける場所は、<strong>フィールドの型・コンストラクタの引数・メソッドの引数と戻り値</strong>です。加えてTypeScriptには<Term>アクセス修飾子</Term>があり、<code>{"private"}</code>を付けたフィールドはクラスの外から読み書きできなくなります。ただし<code>{"private"}</code>・<code>{"public"}</code>・<code>{"protected"}</code>は<strong>コンパイル時のチェックだけ</strong>で、変換後のJavaScriptには残りません。実行時にも本当に隠したいときは、JavaScript標準の<code>#</code>付きフィールド(<code>{"#balance"}</code>)を使います。
      </p>
      <Aside label="ここからTSが加わる">
        クラスの<code>{"private"}</code>は「他の開発者が誤って触らないための約束事」であり、実行時の壁ではありません。TypeScriptが<strong>コンパイル時に</strong>「そのフィールドは<code>{"private"}</code>です」と警告してくれる点が価値です。本当の意味で外から見えない状態を作りたいなら、5.1のクロージャ版のように<strong>関数の中に閉じ込める</strong>のが確実です。
      </Aside>
      <p>
        では同じ口座を、本書の基本である<strong>プレーンオブジェクト + 関数(不変更新)</strong>で扱ってみましょう。クラス版が<code>this.balance</code>を<strong>書き換える</strong>のに対し、関数型版は元の口座には手を触れず、<code>{"{ ...acc, balance: ... }"}</code>で<strong>新しい口座オブジェクトを作って返します</strong>。第3章で学んだスプレッドによる不変更新です。
      </p>
      <CodeCompare
        js={`// 【関数型】プレーンオブジェクト + 不変更新
const deposit = (acc, amount) => ({
  ...acc,
  balance: acc.balance + amount,
});

const account = { balance: 1000 };
const account2 = deposit(account, 500);

console.log(account2.balance); // 1500
console.log(account.balance);  // 1000(元は変わらない)`}
        ts={`type Account = { readonly balance: number };

const deposit = (acc: Account, amount: number): Account => ({
  ...acc,
  balance: acc.balance + amount,
});

const account: Account = { balance: 1000 };
const account2 = deposit(account, 500);

console.log(account2.balance); // 1500
console.log(account.balance);  // 1000`}
      />
      <p>
        入金後の残高は、クラス版・関数型版とも<strong>1500</strong>で同じです。違うのは<strong>元のデータの扱い</strong>です。クラス版は<code>acc</code>という1つの箱の中身を書き換えていくのに対し、関数型版は<code>account</code>をそのまま残して<code>account2</code>という新しい値を作ります。<code>readonly</code>を付けておけば、<code>acc.balance = 0</code>のような書き換えを<strong>TypeScriptがコンパイル時に禁止</strong>してくれるため、「うっかり状態を壊す」事故を防げます。状態が時間とともに変化しないので、プログラムの動きを追いやすいのが関数型の利点です。
      </p>

      <Heading num="5.3">継承 ― 必要最小限</Heading>
      <p>
        クラスには、既存のクラスを土台にして新しいクラスを作る<Term>継承</Term>という仕組みがあります。<code>{"extends"}</code>で親クラスを指定し、<code>{"super(...)"}</code>で親のコンストラクタを呼び出します。図形の面積を例に、<code>Shape</code>を親として<code>Circle</code>と<code>Rectangle</code>を派生させてみます。半径10の円の面積はおよそ<strong>314.16</strong>、幅4・高さ5の長方形は<strong>20</strong>です。
      </p>
      <CodeCompare
        js={`class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("circle");     // 親の初期化を呼ぶ
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super("rectangle");
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

const shapes = [new Circle(10), new Rectangle(4, 5)];
console.log(shapes.map((s) => s.area()));
// => [314.159..., 20]`}
        ts={`abstract class Shape {
  constructor(public name: string) {}
  abstract area(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super("circle");
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super("rectangle");
  }
  area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(10), new Rectangle(4, 5)];
console.log(shapes.map((s) => s.area()));
// => [314.159..., 20]`}
      />
      <p>
        継承は強力ですが、クラスの階層(継承ツリー)が深くなると「この<code>area</code>はどの親から来たのか」を追うのが難しくなります。本書では、同じことを<strong>合成と関数</strong>で表現するほうを勧めます。第4章で学んだ<Term>判別可能Union</Term>を使えば、図形の種類を<code>kind</code>というタグで区別し、面積の計算は<strong>1つの関数の中の分岐</strong>にまとめられます。
      </p>
      <CodeCompare
        js={`// 【関数型】種類はタグ、計算は1つの関数に集約
const area = (shape) => {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
};

const shapes = [
  { kind: "circle", radius: 10 },
  { kind: "rectangle", width: 4, height: 5 },
];

console.log(shapes.map(area));
// => [314.159..., 20]`}
        ts={`type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

const area = (shape: Shape): number => {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
};

const shapes: Shape[] = [
  { kind: "circle", radius: 10 },
  { kind: "rectangle", width: 4, height: 5 },
];

console.log(shapes.map(area));
// => [314.159..., 20]`}
      />
      <p>
        出力はどちらも<code>[314.159..., 20]</code>で、継承ツリー版と完全に一致します。関数型版の利点は、<strong>データ(図形)と振る舞い(面積の計算)が分かれている</strong>ことです。新しい計算(たとえば周囲の長さ)を足したいときは、既存のクラスをいじらず<code>perimeter</code>という関数を1つ増やすだけで済みます。さらにTypeScriptの判別可能Unionでは、<code>kind</code>を追加したのに<code>switch</code>で対応し忘れると<strong>コンパイル時に漏れを指摘</strong>してくれるため、継承よりも安全に種類を増やせます。
      </p>
      <Aside label="いつクラスを使うか">
        Reactのクラスコンポーネントは関数コンポーネント + フックに置き換わり、新規実装でクラスを書く場面は年々減っています。それでも<code>{"class"}</code>・<code>{"extends"}</code>・<code>{"this"}</code>を読める必要があるのは、<strong>既存の資産がそれで書かれているから</strong>です。自分で書くときは、まず関数とクロージャ、次に判別可能Union ― これを基本にしてください。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>プロトタイプが土台</h4>
          <p>
            オブジェクトは、持っていないメソッドをプロトタイプチェーンから借ります。<code>{"class"}</code>はこの仕組みを読みやすくした構文です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>クラス vs 関数型</h4>
          <p>
            クラスは<code>this</code>の状態を書き換え、関数型はスプレッドで新しい値を作ります。入金後の残高はどちらも同じ結果になります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>private はコンパイル時だけ</h4>
          <p>
            TypeScriptの<code>{"private"}</code>は約束事。本当に隠すならクロージャか<code>#</code>フィールドを使います。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>継承より合成</h4>
          <p>
            継承ツリーは判別可能Union + 関数で置き換えられ、同じ出力をより安全に得られます。読むためにクラスを学びます。
          </p>
        </Card>
      </CardGrid>
      <p>
        クラスとプロトタイプという「もう一つの書き方」を、読むための知識として押さえました。ここまでは<strong>コードの書き方</strong>を見てきましたが、そのコードは<strong>実際にどう動いているのか</strong>。次章「<Link href="/dev/language/engine">実行の仕組み</Link>」では、JavaScriptエンジンがコードを実行するときのコールスタックやメモリ(ヒープとガベージコレクション)を覗き、これまで学んだクロージャや関数呼び出しが内部でどう扱われるのかを見ていきます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
