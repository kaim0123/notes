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
  Diagram,
  CodeCompare,
} from "@/components/docs";

export const metadata: Metadata = { title: "実行の仕組み" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第6章 実行の仕組み</h1>
        <Lead>
          前章「<Link href="/dev/language/classes">クラスとプロトタイプ</Link>
          」までで、値・関数・データ・型・クラスといった「書くための部品」がひととおりそろいました。この章では少し視点を変えて、書いたコードが
          <strong>実際に動くとき、中で何が起きているのか</strong>
          を見ていきます。関数を呼ぶとどこに何が積まれるのか(<Term>コールスタック</Term>)、作ったオブジェクトはどこに置かれ、いつ片づけられるのか(<Term>ヒープ</Term>と
          <Term>ガベージコレクション</Term>)。ここで扱う実行モデルは
          <strong>JavaScriptエンジンの仕組み</strong>そのものなので、
          <strong>JavaScriptとTypeScriptで完全に共通</strong>です(TypeScriptは実行前に型を消して、素のJavaScriptとして動きます)。そのため本章のコード例は、型注釈以外に差のない書き比べが中心になります。
        </Lead>
      </Hero>

      <Heading num="6.1">実行コンテキストとコールスタック</Heading>
      <p>
        JavaScriptのコードは、いきなり関数の中身だけが動くわけではありません。まずプログラム全体を包む
        <Term>グローバルコンテキスト</Term>
        が用意され、その中で関数を呼び出すたびに、その関数専用の作業場所である
        <Term>関数コンテキスト</Term>
        が新しく作られます。ここでいう「コンテキスト(実行文脈)」とは、
        <strong>その関数が使う引数やローカル変数を置いておく作業スペース</strong>
        だとイメージしてください。
      </p>
      <p>
        問題は、関数の途中で別の関数を呼んだときです。呼ばれた関数が終わるまで、呼び出した側は「続きの場所」を覚えて待っていなければなりません。この
        <strong>「呼び出しの積み重なり」を管理する仕組み</strong>が
        <Term>コールスタック</Term>です。スタック(stack)は「積み重ね」を意味し、
        <strong>後から積んだものが先に外れる</strong>(最後に呼んだ関数が最初に終わる)という順序で動きます。
      </p>
      <Analogy label="💡 たとえるなら">
        コールスタックは、机の上に積んでいく書類トレイのようなものです。新しい作業(関数呼び出し)を始めると、その書類を一番上に積みます。作業が終わったら一番上の書類を取り除き、その下にあった「前の作業」に戻ります。積んだ順と逆の順で片づく ― これが「後入れ先出し」です。
      </Analogy>
      <p>
        まずは呼び出しが1段だけの、素直な例で確かめましょう。1から
        <code>n</code>までの合計を<code>for</code>ループで求める
        <strong>命令型</strong>のコードです。JavaScriptとTypeScriptで、増えているのは型注釈だけで、実行結果はまったく同じです。
      </p>
      <CodeCompare
        js={`function sum(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i; // total を毎回書き換える(命令型)
  }
  return total;
}

console.log(sum(3)); // => 6`}
        ts={`function sum(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i; // total を毎回書き換える(命令型)
  }
  return total;
}

console.log(sum(3)); // => 6`}
      />
      <p>
        この<code>for</code>版では、<code>sum</code>は<strong>一度だけ</strong>
        呼ばれます。コールスタックには<code>sum(3)</code>が1つ積まれ、ループを回し終えて
        <code>6</code>を返すと、そのまま外れます。スタックが深くなることはありません。
      </p>
      <p>
        次に、まったく同じ「合計」を<strong>再帰関数</strong>で書いてみます。再帰とは
        <strong>関数が自分自身を呼び出す</strong>書き方で、
        <code>for</code>のような「変数の書き換え」を使わずに繰り返しを表現できる、関数型スタイルの基本形の1つです。<code>sum(3)</code>は
        <code>3 + sum(2)</code>、その<code>sum(2)</code>は<code>2 + sum(1)</code>…というように、問題を一段ずつ小さくしていきます。
      </p>
      <CodeCompare
        js={`function sum(n) {
  if (n === 0) return 0; // これ以上呼ばない基底ケース
  return n + sum(n - 1); // 自分自身を呼ぶ(再帰)
}

console.log(sum(3)); // => 6(for版と同じ結果)`}
        ts={`function sum(n: number): number {
  if (n === 0) return 0; // これ以上呼ばない基底ケース
  return n + sum(n - 1); // 自分自身を呼ぶ(再帰)
}

console.log(sum(3)); // => 6(for版と同じ結果)`}
      />
      <p>
        結果は<code>for</code>版と同じ<code>6</code>ですが、実行中のコールスタックの様子はまったく違います。
        <code>sum(3)</code>は答えを出すために<code>sum(2)</code>を必要とし、その<code>sum(2)</code>は
        <code>sum(1)</code>を必要とします。つまり<strong>下の呼び出しが終わるまで、上の呼び出しは待ち続ける</strong>
        ので、スタックがどんどん深く積み上がっていきます。
      </p>
      <Diagram caption="再帰では、基底ケースに達するまで関数呼び出しがスタックに積み上がり(左)、そこから順に return して外れていく(右)">
        <svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
          {/* 積まれていく様子 */}
          <text x={150} y={24} fill="#9a9a9a" fontSize="11" textAnchor="middle">呼び出しで積まれる →</text>
          <rect x={50} y={188} width={200} height={34} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={210} fill="#9a9a9a" fontSize="11" textAnchor="middle">グローバルコンテキスト</text>
          <rect x={50} y={150} width={200} height={34} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={150} y={172} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(3) ← 3 + sum(2) を待つ</text>
          <rect x={50} y={112} width={200} height={34} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={150} y={134} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(2) ← 2 + sum(1) を待つ</text>
          <rect x={50} y={74} width={200} height={34} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={150} y={96} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(1) ← 1 + sum(0) を待つ</text>
          <rect x={50} y={40} width={200} height={30} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={150} y={59} fill="#9a9a9a" fontSize="11" textAnchor="middle">sum(0) → 0 を返す(基底)</text>
          {/* 外れていく様子 */}
          <text x={450} y={24} fill="#9a9a9a" fontSize="11" textAnchor="middle">← return で外れる</text>
          <text x={450} y={70} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(0) → 0</text>
          <text x={450} y={104} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(1) → 1 + 0 = 1</text>
          <text x={450} y={138} fill="#f2f2f2" fontSize="12" textAnchor="middle">sum(2) → 2 + 1 = 3</text>
          <text x={450} y={172} fill="#39ff6a" fontSize="12" textAnchor="middle">sum(3) → 3 + 3 = 6</text>
          <line x1={310} y1={130} x2={360} y2={130} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrEng)" />
          <defs>
            <marker id="arrEng" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>
        基底ケース(<code>{"n === 0"}</code>)に達すると、そこではもう自分を呼ばずに
        <code>0</code>を返します。すると一番上の呼び出しから順に答えが確定し、
        <code>sum(1)</code>→<code>sum(2)</code>→<code>sum(3)</code>と、
        <strong>積んだのと逆の順序でスタックが外れていき</strong>、最終的に<code>6</code>が戻ります。この
        <strong>基底ケースを必ず用意する</strong>ことが再帰の生命線です。もし書き忘れると呼び出しが永遠に積み上がり、スタックの上限を超えて
        <code>RangeError: Maximum call stack size exceeded</code>(スタックオーバーフロー)という実行時エラーになります。
      </p>
      <Aside label="命令型と関数型:">
        <code>for</code>版はスタックが浅いままメモリ効率がよく、再帰版は
        <strong>「何を計算するか」を宣言的に書ける</strong>読みやすさが持ち味です。どちらも結果は同じ
        <code>6</code>。本書は関数型を軸にしますが、深い再帰はスタックを消費するという実行上のコストも合わせて知っておくと、場面に応じて選べます。
      </Aside>

      <Heading num="6.2">メモリ ― ヒープとガベージコレクション</Heading>
      <p>
        コードが動くとき、値はメモリ上のどこかに置かれます。JavaScriptエンジンは、この置き場所を大きく2つに分けて使い分けています。1つは6.1で見た
        <Term>コールスタック</Term>、もう1つが<Term>ヒープ</Term>です。
      </p>
      <ul>
        <li>
          <strong>スタック</strong>: 数値・真偽値といった小さく固定サイズの値や、関数呼び出しの枠(コンテキスト)を置く場所。積んで外すだけなので高速です。
        </li>
        <li>
          <strong>ヒープ</strong>: オブジェクトや配列、関数など、大きさが決まらない値の本体を置く広い領域。スタック側には「ヒープ上のどこにあるか」を指す<Term>参照</Term>だけが入ります。
        </li>
      </ul>
      <p>
        たとえば<code>const user = {"{ name: \"Alice\" }"}</code>と書くと、
        <code>{"{ name: \"Alice\" }"}</code>という本体はヒープに置かれ、変数
        <code>user</code>はスタック側でその本体を<strong>指しているだけ</strong>です。これが、第3章
        <Link href="/dev/language/data">データの変換</Link>
        で「オブジェクトはコピーではなく参照で共有される」と学んだことの正体です。
      </p>
      <Diagram caption="小さな値と参照はスタックに、オブジェクトの本体はヒープに置かれる。どこからも参照されなくなった本体は回収の対象になる">
        <svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg">
          {/* スタック側 */}
          <text x={130} y={26} fill="#9a9a9a" fontSize="11" textAnchor="middle">コールスタック</text>
          <rect x={40} y={40} width={180} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={60} y={60} width={140} height={30} rx="5" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={80} fill="#f2f2f2" fontSize="11" textAnchor="middle">count = 3</text>
          <rect x={60} y={104} width={140} height={30} rx="5" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={124} fill="#f2f2f2" fontSize="11" textAnchor="middle">user →(参照)</text>
          <rect x={60} y={148} width={140} height={30} rx="5" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={130} y={168} fill="#9a9a9a" fontSize="11" textAnchor="middle">old →(参照が消えた)</text>
          {/* ヒープ側 */}
          <text x={470} y={26} fill="#9a9a9a" fontSize="11" textAnchor="middle">ヒープ</text>
          <rect x={330} y={40} width={250} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={360} y={64} width={190} height={40} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={455} y={88} fill="#f2f2f2" fontSize="11" textAnchor="middle">{"{ name: \"Alice\" }"}</text>
          <rect x={360} y={132} width={190} height={40} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={455} y={150} fill="#9a9a9a" fontSize="11" textAnchor="middle">{"{ name: \"古いデータ\" }"}</text>
          <text x={455} y={165} fill="#9a9a9a" fontSize="10" textAnchor="middle">到達不能 → 回収対象</text>
          {/* 参照の線 */}
          <line x1={200} y1={119} x2={358} y2={84} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrHeap)" />
          <defs>
            <marker id="arrHeap" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#39ff6a" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>
        ここで自然にわいてくる疑問が、「使い終わったヒープ上のオブジェクトは、誰が片づけるのか?」です。C言語のような一部の言語ではプログラマーが手動で解放しますが、JavaScriptには
        <Term>ガベージコレクション</Term>(GC、ごみ集め)という仕組みがあり、
        <strong>エンジンが自動で不要なメモリを回収します</strong>。判断の基準はシンプルで、
        <strong>「もうどこからもたどり着けない(到達不能な)オブジェクトは、二度と使えないので回収してよい」</strong>
        というものです。上の図で参照が消えた<code>{"{ name: \"古いデータ\" }"}</code>が、まさにこの回収対象です。
      </p>
      <Analogy label="💡 たとえるなら">
        ヒープは大きな倉庫、参照はその棚に付けた「宛名タグ」です。どの人(変数)のタグも付いていない箱は、もう誰も取りに来ません。倉庫の管理人(GC)は、そういう
        <strong>宛名タグの付いていない箱</strong>を見つけて、空いたスペースを再利用します。私たちが「捨てて」と指示する必要はありません。
      </Analogy>
      <p>
        この「参照が残っている限り回収されない」という性質が、第2章
        <Link href="/dev/language/functions">関数</Link>
        で学んだ<Term>クロージャ</Term>(2.6)と深く関わります。クロージャは
        <strong>関数が、自分の外側にある変数を「覚えている」仕組み</strong>でした。覚えているということは、その変数が指すオブジェクトへの
        <strong>参照を保持し続けている</strong>ということ。つまり<strong>クロージャが生きている間、そのオブジェクトはGCに回収されず、ヒープに残り続けます</strong>。
      </p>
      <CodeCompare
        js={`function createCounter() {
  let count = 0; // この変数はヒープに残る
  // 返した関数が count を覚えている(参照を保持)
  return () => {
    count += 1;
    return count;
  };
}

const next = createCounter();
console.log(next()); // => 1
console.log(next()); // => 2 (count が回収されず生き続けている)`}
        ts={`function createCounter(): () => number {
  let count = 0; // この変数はヒープに残る
  // 返した関数が count を覚えている(参照を保持)
  return (): number => {
    count += 1;
    return count;
  };
}

const next = createCounter();
console.log(next()); // => 1
console.log(next()); // => 2 (count が回収されず生き続けている)`}
      />
      <p>
        <code>createCounter</code>の実行が終わっても、返された関数(<code>next</code>)が
        <code>count</code>を参照し続けているため、<code>count</code>はヒープに残り、呼ぶたびに増えていきます。これは
        <strong>「状態を関数の中に閉じ込める」という便利さの正体</strong>であると同時に、注意点でもあります。もし
        <code>next</code>のような参照をどこかに持ち続けたままにすると、本来はもう不要なデータがいつまでも回収されず、メモリを圧迫することがあります(<Term>メモリリーク</Term>)。
      </p>
      <Aside label="覚えておきたい一言:">
        GCがあるおかげで、私たちは普段メモリの解放を意識せずに書けます。ただし
        <strong>「参照が残っているものは消えない」</strong>という原則だけは頭の片隅に。使い終わった参照を保持しっぱなしにしないことが、健全なメモリ管理につながります。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コールスタック</h4>
          <p>
            関数を呼ぶたびにコンテキストが積まれ、終わると外れます。後入れ先出しで、最後に呼んだ関数が最初に片づきます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再帰とスタック</h4>
          <p>
            再帰は基底ケースまで呼び出しを積み上げます。<code>for</code>版と同じ結果でも、スタックの深さが違います。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スタックとヒープ</h4>
          <p>
            小さな値と参照はスタックに、オブジェクトの本体はヒープに置かれます。変数は本体を指しているだけです。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>GCと参照</h4>
          <p>
            到達不能なオブジェクトは自動で回収されます。クロージャが参照を持つ限り、その値は残り続けます。
          </p>
        </Card>
      </CardGrid>
      <p>
        コードが動くときの「積み重ね」と「メモリの置き場所」が見えると、次に学ぶテーマがぐっと理解しやすくなります。次章「
        <Link href="/dev/language/async">非同期処理</Link>
        」では、このコールスタックが<strong>空になったとき</strong>に、待たせておいた処理をどう拾い上げて実行するのか ―
        <Term>イベントループ</Term>という、もう1つの実行の仕組みを見ていきます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
