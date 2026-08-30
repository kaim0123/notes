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
  title: "クラスとプロトタイプ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>クラスとプロトタイプ ― 読むための知識</h1>
        <Lead>
          ここまでで、値・関数・データ・型という関数型スタイルの土台がそろいました。ここでは多くの言語でおなじみの<Term>クラス</Term>と、その裏側にある<Term>プロトタイプ</Term>を扱います。位置づけは少し特別で、<Term>自分で新しく書くための道具ではなく、既存のコードやライブラリを読むための知識</Term>として見ていきます。同じ振る舞いを関数型ならどう書くかを、必ず隣に並べます。
        </Lead>
      </Hero>

      <Aside label="この章の立ち位置">
        新しく状態を持つ部品を作りたいときは、まず<Link href="/language/js-functions">関数</Link>のクロージャを優先してください。それでもクラスを学ぶのは、DOMのAPIや古いライブラリ、他人が書いたコードがクラスとプロトタイプで書かれていることが多く、それらを正しく読むために避けて通れないからです。
      </Aside>

      <Heading num="01">プロトタイプ ― 探しに行く先</Heading>
      <p>
        JavaScriptのオブジェクトには、<Term>自分が持っていないプロパティを探しに行く先</Term>がひとつ結びついています。これを<Term>プロトタイプ</Term>と呼びます。メソッドを呼ぶと、まず自分自身を探し、見つからなければプロトタイプを探し、さらにその先へ…とたどります。この連なりが<Term>プロトタイプチェーン</Term>です。
      </p>

      <DiagramFrame
        slug="language-js-prototype-chain"
        aspect="640 / 260"
        caption="プロトタイプチェーンをたどる様子。オブジェクトcは自分自身にcountというデータだけを持つ。c.next()を呼ぶと、まず自分を探し、見つからないので__proto__をたどってcounterProtoを探し、そこにnextが見つかるので借りて実行する。その先はObject.prototype、最後はnullに行き着く。カウンタを100個作っても、nextはcounterProtoに1つ置かれているだけで全員が共有し、各オブジェクトが自分で持つのはcountだけ。"
      />

      <p>
        <Link href="/language/js-functions">関数</Link>では、状態を持つカウンタを<Term>クロージャ</Term>で作りました。同じ「呼ぶたびに増えるカウンタ」を、今度はプロトタイプで書いてみます。状態<code>count</code>はオブジェクト自身が持ち、増やすメソッド<code>next</code>はプロトタイプ側に1つだけ置いて共有します。
      </p>

      <pre>
        <code>{`type Counter = { count: number; next(): number };

// 共有メソッドを持つ元オブジェクト
const counterProto = {
  next(this: Counter): number {
    this.count += 1; // this は呼び出したオブジェクト
    return this.count;
  },
};

// counterProto をプロトタイプにした新しいオブジェクト
const c: Counter = Object.create(counterProto);
c.count = 0;

console.log(c.next()); // 1
console.log(c.next()); // 2`}</code>
      </pre>

      <p>
        クロージャ版とまったく同じ結果になります。<code>c</code>自身は<code>next</code>を持っていませんが、チェーンをたどって<code>counterProto</code>の<code>next</code>を借りて実行しているのです。TypeScriptで増えたのは、形を表す<code>Counter</code>型と、メソッド内の<code>this</code>が何を指すかを教える注釈だけです。
      </p>

      <Analogy label="💡 たとえるなら">
        プロトタイプは「共用の道具箱」です。カウンタを100個作っても、増やす手順は道具箱に1つ置いておけば全員が借りて使えます。各自が持つのは自分の数え札だけ。一方クロージャ版は、道具も数え札もまとめて1人ずつの箱に閉じ込めるやり方です。
      </Analogy>

      <p>
        大きな違いは<Term>状態の隠しやすさ</Term>です。クロージャ版の<code>count</code>は関数の外から一切触れませんが、プロトタイプ版の<code>c.count</code>は外から自由に書き換えられます。
      </p>

      <Heading num="02">クラス ― プロトタイプを読みやすくした構文</Heading>
      <p>
        <Term>クラス</Term>は、プロトタイプの仕組みを分かりやすい構文で書けるようにした「設計図」です。<code>new</code>を付けて呼ぶと実体(<Term>インスタンス</Term>)が作られます。データを保持する<Term>フィールド</Term>、振る舞いを表す<Term>メソッド</Term>、生成時に一度だけ走る<Term>コンストラクタ</Term>の3つでできています。
      </p>

      <pre>
        <code>{`class BankAccount {
  private balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): number {
    this.balance += amount; // 自分の状態を書き換える
    return this.balance;
  }
}

const acc = new BankAccount(1000);
console.log(acc.deposit(500)); // 1500
// acc.balance は private なので外から触れない`}</code>
      </pre>

      <Aside label="private は実行時の壁ではない">
        <code>private</code>・<code>public</code>・<code>protected</code>はコンパイル時のチェックだけで、変換後のJavaScriptには残りません。実行時にも本当に隠したいときは、JavaScript標準の<code>#</code>付きフィールドを使うか、クロージャで関数の中に閉じ込めるのが確実です。
      </Aside>

      <p>
        同じ口座を、プレーンオブジェクトと関数で扱うとこうなります。クラス版が<code>this.balance</code>を書き換えるのに対し、関数型版は元の口座に手を触れず、新しい口座オブジェクトを作って返します。
      </p>

      <pre>
        <code>{`type Account = { readonly balance: number };

const deposit = (acc: Account, amount: number): Account => ({
  ...acc,
  balance: acc.balance + amount,
});

const account: Account = { balance: 1000 };
const account2 = deposit(account, 500);

console.log(account2.balance); // 1500
console.log(account.balance);  // 1000(元は変わらない)`}</code>
      </pre>

      <p>
        入金後の残高はどちらも1500で同じです。違うのは元のデータの扱いで、関数型版は<code>account</code>をそのまま残します。<code>readonly</code>を付けておけば、うっかり状態を壊す書き方をコンパイル時に禁止できます。
      </p>

      <Heading num="03">継承 ― 必要最小限</Heading>
      <p>
        クラスには、既存のクラスを土台に新しいクラスを作る<Term>継承</Term>があります。<code>extends</code>で親を指定し、<code>super(...)</code>で親のコンストラクタを呼びます。
      </p>

      <pre>
        <code>{`abstract class Shape {
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

const shapes: Shape[] = [new Circle(10)];
console.log(shapes.map((s) => s.area())); // [314.159...]`}</code>
      </pre>

      <p>
        継承は強力ですが、階層が深くなると「この<code>area</code>はどの親から来たのか」を追うのが難しくなります。同じことは、<Link href="/language/js-types">判別可能Union</Link>を使って、種類をタグで区別し、計算を1つの関数の分岐にまとめても書けます。
      </p>

      <pre>
        <code>{`type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

const area = (shape: Shape): number => {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "rectangle": return shape.width * shape.height;
  }
};

const shapes: Shape[] = [
  { kind: "circle", radius: 10 },
  { kind: "rectangle", width: 4, height: 5 },
];
console.log(shapes.map(area)); // [314.159..., 20]`}</code>
      </pre>

      <p>
        出力は継承版と完全に一致します。関数型版の利点は<Term>データと振る舞いが分かれている</Term>ことです。新しい計算(たとえば周囲の長さ)を足したいときは、既存のクラスをいじらず関数を1つ増やすだけで済みます。さらに種類を追加して<code>switch</code>の対応を忘れると、コンパイル時に漏れを指摘してくれます(<Link href="/design/paradigm-oop">継承より合成</Link>)。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>プロトタイプは探しに行く先</h4>
          <p>
            自分に無いプロパティは、チェーンをたどって借りてきます。共有できるのが利点です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>クラスはその読みやすい構文</h4>
          <p>
            <code>class</code>・<code>new</code>・<code>extends</code>は、プロトタイプの仕組みを整えたものです。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>private は実行時に残らない</h4>
          <p>
            本当に隠したいなら<code>#</code>付きフィールドか、クロージャで閉じ込めます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>継承より判別可能Union</h4>
          <p>
            データと振る舞いを分けたほうが、種類も計算も安全に増やせます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/js-classes" />
    </DocsPage>
  );
}
