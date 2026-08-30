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
  CodeCompare,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = { title: "付録" };

const chapters = [
  {
    href: "/dev/language/values",
    num: "第1章",
    title: "値と型",
    desc: "const n = 42 と const n: number = 42。typeof と型注釈、=== と型強制。for 合計 と reduce 合計の対。",
  },
  {
    href: "/dev/language/functions",
    num: "第2章",
    title: "関数",
    desc: "add(a, b) と add(a: number, b: number): number。純粋関数・アロー・高階関数・クロージャの JS/TS 対。",
  },
  {
    href: "/dev/language/data",
    num: "第3章",
    title: "データの変換",
    desc: "obj.x = 1(破壊的)と { ...obj, x: 1 }(不変)。for + push と map で同じ配列を作る対。",
  },
  {
    href: "/dev/language/types",
    num: "第4章",
    title: "型を使いこなす",
    desc: "リテラル型・判別可能 Union・Narrowing・as const。try/catch と Result 型を返す純粋関数の対。",
  },
  {
    href: "/dev/language/classes",
    num: "第5章",
    title: "クラスとプロトタイプ",
    desc: "クラスインスタンスと『プレーンオブジェクト + 関数』。ファクトリ関数とプロトタイプの対。",
  },
  {
    href: "/dev/language/engine",
    num: "第6章",
    title: "実行の仕組み",
    desc: "コールスタックとヒープ / GC。for ループ版と再帰関数版で同じ結果になる対。",
  },
  {
    href: "/dev/language/async",
    num: "第7章",
    title: "非同期処理",
    desc: "then チェーンと async/await。Promise<T> の型、fetch の I/O と変換関数の分離。",
  },
  {
    href: "/dev/language/browser",
    num: "第8章",
    title: "ブラウザ ― Web API",
    desc: "データ → 描画関数 → DOM。HTMLElement | null の Narrowing、(e: MouseEvent) => void のハンドラ。",
  },
  {
    href: "/dev/language/generics",
    num: "第9章",
    title: "ジェネリクスとユーティリティ型",
    desc: "identity(x) と identity<T>(x: T): T。Partial / Pick / Omit / Record による不変データの型変換。",
  },
  {
    href: "/dev/language/node",
    num: "第10章",
    title: "Node.js と標準ライブラリ",
    desc: "named export と import/export。Math / Date / JSON / RegExp は呼び出しコード同一、TS は戻り値型のみ。",
  },
  {
    href: "/dev/language",
    num: "概要",
    title: "JavaScript・TypeScript",
    desc: "全体像と教科書の入口。動的型付けと『型という契約』、型を書く4つの対象のまとめ。",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第11章 付録</h1>
        <Lead>
          前章「<Link href="/dev/language/node">Node.js と標準ライブラリ</Link>」までで、値から関数、データ、型、非同期、そして実行環境までを一巡しました。この最終章は、これまでの内容を
          <Term>逆引き</Term>・<Term>早見</Term>としてまとめた付録です。用語の意味を引く、TSに怒られたときの対処を探す、命令型と関数型の書き方を見比べる ―
          必要になったときに戻ってこられる索引として使ってください。各項目からは本文の該当章へ<Term>リンク</Term>を張っています。
        </Lead>
      </Hero>

      <Heading num="A">用語集 ― JavaScript / TypeScript / 関数型</Heading>
      <p>
        本書に出てきた主要な用語を、意味と関連章とともにまとめます。定義があいまいになったら、まずここで引いてから該当章へ戻ると、文脈の中で意味を思い出せます。
      </p>
      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>意味</th>
            <th>関連章</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <Term>不変(イミュータブル)</Term>
            </td>
            <td>いちど作った値を書き換えず、必要なら新しい値を作る考え方。本書全体の土台。</td>
            <td>
              <Link href="/dev/language/values">1 値と型</Link> /{" "}
              <Link href="/dev/language/data">3 データ</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>型推論</Term>
            </td>
            <td>初期値などから型を書かなくてもTSが自動で型を当てる仕組み。</td>
            <td>
              <Link href="/dev/language/values">1 値と型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>純粋関数</Term>
            </td>
            <td>同じ入力なら必ず同じ出力を返し、外部を書き換えない(副作用のない)関数。</td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>副作用</Term>
            </td>
            <td>ログ出力・DOM更新・外部変数の変更など、値を返す以外の効果。境界にまとめる。</td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link> /{" "}
              <Link href="/dev/language/browser">8 ブラウザ</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>高階関数</Term>
            </td>
            <td>関数を引数に取る、または関数を返す関数。<code>map</code> などの土台。</td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>クロージャ</Term>
            </td>
            <td>関数が定義時の変数を「覚える」仕組み。状態を関数に閉じ込められる。</td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link> /{" "}
              <Link href="/dev/language/engine">6 実行</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>第一級関数</Term>
            </td>
            <td>関数を値として変数に入れたり、引数として渡したりできること。</td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>スプレッド</Term>
            </td>
            <td>
              <code>{"{ ...obj }"}</code> / <code>{"[...arr]"}</code>{" "}
              で中身を展開し、コピーや結合を不変に行う構文。
            </td>
            <td>
              <Link href="/dev/language/data">3 データ</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>Union型</Term>
            </td>
            <td>
              <code>{'"a" | "b"'}</code> のように「複数の型のいずれか」を表す型。
            </td>
            <td>
              <Link href="/dev/language/data">3 データ</Link> /{" "}
              <Link href="/dev/language/types">4 型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>判別可能Union</Term>
            </td>
            <td>
              共通のタグ(<code>kind</code> など)で見分けられるUnion。<code>switch</code>{" "}
              でパターンマッチ風に扱える。
            </td>
            <td>
              <Link href="/dev/language/types">4 型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>Narrowing(絞り込み)</Term>
            </td>
            <td>
              <code>typeof</code> / <code>in</code> / タグ判定で、Union型を分岐内でより狭い型に絞ること。
            </td>
            <td>
              <Link href="/dev/language/types">4 型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>as const</Term>
            </td>
            <td>リテラルを不変の型として固定する注釈。関数型の定数定義に有用。</td>
            <td>
              <Link href="/dev/language/types">4 型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>Result型</Term>
            </td>
            <td>
              成功 / 失敗を<code>throw</code>ではなく値として返すパターン。判別可能Unionで表す。
            </td>
            <td>
              <Link href="/dev/language/types">4 型</Link> /{" "}
              <Link href="/dev/language/async">7 非同期</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>ファクトリ関数</Term>
            </td>
            <td>
              <code>new</code>やクラスの代わりに、関数でオブジェクトを作るやり方。
            </td>
            <td>
              <Link href="/dev/language/functions">2 関数</Link> /{" "}
              <Link href="/dev/language/classes">5 クラス</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>Promise</Term>
            </td>
            <td>
              「いつか終わる処理」を値として扱うオブジェクト。<code>{"Promise<T>"}</code>{" "}
              で結果の型を表す。
            </td>
            <td>
              <Link href="/dev/language/async">7 非同期</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>ジェネリクス</Term>
            </td>
            <td>
              <code>{"<T>"}</code> の型パラメータで、型を後から差し替えられるようにする仕組み。
            </td>
            <td>
              <Link href="/dev/language/generics">9 ジェネリクス</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>ユーティリティ型</Term>
            </td>
            <td>
              <code>Partial</code> / <code>Pick</code> / <code>Omit</code> /{" "}
              <code>Record</code> など、既存の型から新しい型を作る道具。
            </td>
            <td>
              <Link href="/dev/language/generics">9 ジェネリクス</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">
              <Term>トランスパイル</Term>
            </td>
            <td>TSの構文を、実行できる通常のJavaScriptへ変換すること。</td>
            <td>
              <Link href="/dev/language">概要</Link> /{" "}
              <Link href="/dev/language/node">10 Node.js</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="B">型エラー早見表 ― 「JSでは動くがTSが怒る」</Heading>
      <p>
        TypeScriptを書き始めると、JavaScriptなら素通りしていたコードで赤い波線が出ます。多くは「実行時に事故になる前に気づかせてくれている」サインです。よく出会うパターンと対処をまとめます。
      </p>
      <table>
        <thead>
          <tr>
            <th>やりがちなコード</th>
            <th>TSのエラー内容</th>
            <th>対処</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>{'add(1, "2")'}</code>
            </td>
            <td>
              引数<code>{'"2"'}</code>は<code>string</code>型で、<code>number</code>型に代入できない
            </td>
            <td>渡す値を数値にする。文字列なら先に変換する。</td>
          </tr>
          <tr>
            <td className="hl">
              <code>{"user.name.toUpperCase()"}</code>
            </td>
            <td>
              <code>user</code>は<code>undefined</code>の可能性がある / オブジェクトは<code>null</code>かもしれない
            </td>
            <td>
              先に<code>{"if (user)"}</code>で存在を確かめる(Narrowing)か、オプショナルチェーン
              <code>{"user?.name"}</code>を使う。
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{'5 === "5"'}</code>
            </td>
            <td>
              <code>number</code>と<code>string</code>は型が重ならず、この比較はいつも<code>false</code>
            </td>
            <td>比べる前に型をそろえる。そもそも設計を見直す。</td>
          </tr>
          <tr>
            <td className="hl">
              <code>{"const el = document.getElementById('x'); el.textContent = 'hi'"}</code>
            </td>
            <td>
              <code>el</code>は<code>{"HTMLElement | null"}</code>で、<code>null</code>の可能性がある
            </td>
            <td>
              <code>{"if (el) { ... }"}</code>で<code>null</code>を除いてから使う。
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{"const data = JSON.parse(s); data.id"}</code>
            </td>
            <td>
              <code>data</code>は<code>any</code>(または<code>unknown</code>)で、形が保証されない
            </td>
            <td>
              <code>interface</code>や<code>type</code>で期待する形を定義し、注釈を付ける。
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{"arr.push(x) // arr は readonly"}</code>
            </td>
            <td>
              <code>readonly</code>な配列に破壊的メソッド<code>push</code>は呼べない
            </td>
            <td>
              <code>{"[...arr, x]"}</code>で新しい配列を作る(不変更新)。
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{"function f(kind) { switch(kind){ ... } }"}</code>
            </td>
            <td>
              引数<code>kind</code>に暗黙の<code>any</code>が付いている(<code>noImplicitAny</code>)
            </td>
            <td>
              引数に型注釈を付ける。リテラルUnion<code>{'"a" | "b"'}</code>にすると分岐漏れも防げる。
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{'obj["key"] // obj は { a: number }'}</code>
            </td>
            <td>
              プロパティ<code>{'"key"'}</code>は型<code>{"{ a: number }"}</code>に存在しない
            </td>
            <td>
              型にそのプロパティを足すか、綴りを直す。動的キーなら<code>{"Record<string, T>"}</code>。
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="C">書き方対照表 ― 命令型 / 関数型 / TS型付き</Heading>
      <p>
        同じ処理でも、書き方によって「値を書き換える命令の列」にも「値を変換する式」にもなります。本書が優先するのは後者(関数型)です。代表的な操作を、命令型と関数型(＋TS型)で並べます。
      </p>
      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>命令型(<code>for</code> / 再代入)</th>
            <th>関数型(＋TS型)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">合計</td>
            <td>
              <code>{"let t = 0; for (const x of xs) t += x;"}</code>
            </td>
            <td>
              <code>{"const t: number = xs.reduce((a, x) => a + x, 0);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">変換</td>
            <td>
              <code>{"const r = []; for (const x of xs) r.push(x * 2);"}</code>
            </td>
            <td>
              <code>{"const r: number[] = xs.map((x) => x * 2);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">フィルタ</td>
            <td>
              <code>{"const r = []; for (const x of xs) if (x > 0) r.push(x);"}</code>
            </td>
            <td>
              <code>{"const r: number[] = xs.filter((x) => x > 0);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">分岐</td>
            <td>
              <code>{'let s; if (n > 0) s = "+"; else s = "-";'}</code>
            </td>
            <td>
              <code>{'const s: string = n > 0 ? "+" : "-";'}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">状態</td>
            <td>
              <code>{"obj.count += 1; // その場で書き換え"}</code>
            </td>
            <td>
              <code>{"const next = { ...obj, count: obj.count + 1 };"}</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        なかでも本書の軸になるのが、<code>for</code> + <code>push</code>{" "}
        と<code>map</code>の対です。どちらもまったく同じ配列を作りますが、右側は「新しい配列を式で作る」ので、途中の変数を書き換えません。
      </p>
      <CodeCompare
        js={`// 命令型: 空配列を用意し、for で push して書き換えていく
function doubleAll(xs) {
  const result = [];
  for (let i = 0; i < xs.length; i++) {
    result.push(xs[i] * 2);
  }
  return result;
}

// 関数型: map が新しい配列を返す(元の xs は不変)
function doubleAllFp(xs) {
  return xs.map((x) => x * 2);
}

console.log(doubleAll([1, 2, 3]));   // => [2, 4, 6]
console.log(doubleAllFp([1, 2, 3])); // => [2, 4, 6](同じ)`}
        ts={`// 命令型
function doubleAll(xs: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < xs.length; i++) {
    result.push(xs[i] * 2);
  }
  return result;
}

// 関数型: コールバックの引数 x も戻り値も number と推論される
function doubleAllFp(xs: number[]): number[] {
  return xs.map((x) => x * 2);
}

console.log(doubleAll([1, 2, 3]));   // => [2, 4, 6]
console.log(doubleAllFp([1, 2, 3])); // => [2, 4, 6](同じ)`}
      />
      <p>
        この「命令の列から式へ」という発想は、第1章の<code>for</code>合計から第9章の型付き<code>map</code>まで、本書を一本の線で貫いています。
      </p>

      <Heading num="D">比較例インデックス ― 各章のJS/TS対</Heading>
      <p>
        「あの書き比べはどこだったか」を探すための索引です。各章の中心となるJS/TS対の要点を1〜2行でまとめました。カードから該当章へ移動できます。
      </p>
      <IndexGrid>
        {chapters.map((c) => (
          <IndexCard key={c.href} href={c.href} num={c.num} title={c.title}>
            {c.desc}
          </IndexCard>
        ))}
      </IndexGrid>
      <p>
        これで全11章の一巡が終わりました。土台になった全体像は概要ページ「
        <Link href="/dev/language">JavaScript・TypeScript</Link>
        」にまとまっています。迷ったら概要へ戻り、必要な章をこの付録から引き直してください。まず素直なJavaScriptで理解し、実務ではTypeScriptで型という契約を足す ―
        そして<Term>不変</Term>と<Term>関数型</Term>を軸に書く。この姿勢が、これから読むどんなコードにも効いてきます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
