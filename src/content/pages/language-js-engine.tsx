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

export const metadata: Metadata = { title: "実行の仕組み" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>実行の仕組み ― スタックとヒープ</h1>
        <Lead>
          ここまでで「書くための部品」がひととおりそろいました。ここでは視点を変えて、書いたコードが<Term>実際に動くとき、中で何が起きているのか</Term>を見ます。関数を呼ぶとどこに何が積まれるのか(<Term>コールスタック</Term>)、作ったオブジェクトはどこに置かれ、いつ片づけられるのか(<Term>ヒープ</Term>と<Term>ガベージコレクション</Term>)。ここで扱う実行モデルはJavaScriptエンジンの仕組みそのものなので、TypeScriptでも完全に同じです。
        </Lead>
      </Hero>

      <Heading num="01">実行コンテキストとコールスタック</Heading>
      <p>
        関数を呼び出すたびに、その関数専用の作業スペース(<Term>実行コンテキスト</Term>)が新しく作られます。問題は、関数の途中で別の関数を呼んだときです。呼ばれた関数が終わるまで、呼び出した側は「続きの場所」を覚えて待っていなければなりません。この呼び出しの積み重なりを管理する仕組みが<Term>コールスタック</Term>で、<Term>後から積んだものが先に外れる</Term>という順序で動きます。
      </p>

      <Analogy label="💡 たとえるなら">
        コールスタックは、机の上に積んでいく書類トレイです。新しい作業を始めるとその書類を一番上に積み、終わったら一番上を取り除いて下にあった前の作業に戻ります。積んだ順と逆の順で片づく ―
        これが「後入れ先出し」です。
      </Analogy>

      <p>
        同じ「1から<code>n</code>までの合計」を、命令型の<code>for</code>と、自分自身を呼ぶ<Term>再帰</Term>の両方で書いてみます。結果はどちらも同じですが、実行中のスタックの様子はまったく違います。
      </p>

      <pre>
        <code>{`// 命令型 ― sum は一度だけ呼ばれる。スタックは深くならない
function sumLoop(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}

// 再帰 ― 下の呼び出しが終わるまで、上は待ち続ける
function sum(n: number): number {
  if (n === 0) return 0; // これ以上呼ばない基底ケース
  return n + sum(n - 1);
}

console.log(sum(3)); // 6`}</code>
      </pre>

      <DiagramFrame
        slug="language-js-callstack"
        aspect="640 / 280"
        caption="再帰呼び出しのときのコールスタック。左は積み上がっていく過程で、下からグローバルコンテキスト、sum(3)、sum(2)、sum(1)と積まれ、一番上の基底ケースsum(0)が0を返す。右は外れていく過程で、sum(0)が0を返すとsum(1)が1、sum(2)が3、sum(3)が6と順に確定し、積んだのと逆の順序で外れていく。基底ケースを書き忘れると積み上がりが止まらず、スタックオーバーフローになる。"
      />

      <p>
        基底ケースに達すると、そこではもう自分を呼ばずに値を返します。すると一番上の呼び出しから順に答えが確定し、積んだのと逆の順序でスタックが外れていきます。<Term>基底ケースを必ず用意する</Term>ことが再帰の生命線で、書き忘れると呼び出しが永遠に積み上がり、<code>RangeError: Maximum call stack size exceeded</code>になります(<Link href="/theory/recursion">再帰と分割統治</Link>)。
      </p>

      <Aside label="命令型と関数型のコスト">
        <code>for</code>版はスタックが浅いままメモリ効率がよく、再帰版は「何を計算するか」を宣言的に書ける読みやすさが持ち味です。どちらも結果は同じ。深い再帰はスタックを消費するという実行上のコストも知っておくと、場面に応じて選べます。
      </Aside>

      <Heading num="02">メモリ ― スタックとヒープ</Heading>
      <p>
        コードが動くとき、値はメモリ上のどこかに置かれます。JavaScriptエンジンは置き場所を2つに分けて使い分けています。
      </p>

      <ul>
        <li>
          <strong>スタック</strong>: 数値・真偽値といった小さく固定サイズの値や、関数呼び出しの枠を置く場所。積んで外すだけなので高速です。
        </li>
        <li>
          <strong>ヒープ</strong>: オブジェクトや配列、関数など、大きさが決まらない値の本体を置く広い領域。スタック側には「ヒープ上のどこにあるか」を指す<Term>参照</Term>だけが入ります。
        </li>
      </ul>

      <DiagramFrame
        slug="language-js-stack-heap"
        aspect="640 / 260"
        caption="スタックとヒープの役割分担。左のコールスタックには、小さく固定サイズの値と、ヒープ上の場所を指す参照が置かれる。右のヒープにはオブジェクトの本体が置かれ、userからその本体へ矢印が伸びている。変数は本体そのものではなく場所を指しているだけ。どの変数からも矢印が来ていない古いオブジェクトは到達不能なので、ガベージコレクションの回収対象になる。"
      />

      <p>
        <code>const user = &#123; name: &quot;Alice&quot; &#125;</code>と書くと、本体はヒープに置かれ、変数<code>user</code>はその本体を<Term>指しているだけ</Term>です。これが<Link href="/language/js-data">データの変換</Link>で扱った「オブジェクトはコピーではなく参照で共有される」の正体です。
      </p>

      <p>
        使い終わったヒープ上のオブジェクトは、<Term>ガベージコレクション</Term>がエンジン側で自動的に回収します。判断の基準は「もうどこからもたどり着けないオブジェクトは、二度と使えないので回収してよい」というものです(仕組みの詳細は<Link href="/language/memory">メモリ管理とGC</Link>)。
      </p>

      <Analogy label="💡 たとえるなら">
        ヒープは大きな倉庫、参照はその棚に付けた宛名タグです。どの変数のタグも付いていない箱は、もう誰も取りに来ません。倉庫の管理人(GC)は、そういう宛名タグの付いていない箱を見つけて、空いたスペースを再利用します。
      </Analogy>

      <Heading num="03">クロージャは参照を保持し続ける</Heading>
      <p>
        「参照が残っている限り回収されない」という性質は、<Link href="/language/js-functions">関数</Link>で学んだ<Term>クロージャ</Term>と深く関わります。クロージャが変数を覚えているということは、その変数が指すオブジェクトへの参照を保持し続けているということ。つまり<Term>クロージャが生きている間、そのオブジェクトはヒープに残り続けます</Term>。
      </p>

      <pre>
        <code>{`function createCounter(): () => number {
  let count = 0; // この変数はヒープに残る
  return (): number => {
    count += 1;  // 返した関数が count を参照し続けている
    return count;
  };
}

const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2 ― count が回収されず生き続けている`}</code>
      </pre>

      <p>
        これは「状態を関数の中に閉じ込める」という便利さの正体であると同時に、注意点でもあります。不要になった参照を保持しっぱなしにすると、本来もう要らないデータがいつまでも回収されず、メモリを圧迫します(<Term>メモリリーク</Term>)。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コールスタック</h4>
          <p>
            関数を呼ぶたびにコンテキストが積まれ、終わると外れます。後入れ先出しです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再帰とスタック</h4>
          <p>
            再帰は基底ケースまで積み上がります。同じ結果でもスタックの深さが違います。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スタックとヒープ</h4>
          <p>
            小さな値と参照はスタックに、オブジェクトの本体はヒープに置かれます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>GCと参照</h4>
          <p>
            到達不能なものは自動で回収されます。参照を持つ限り、その値は残ります。
          </p>
        </Card>
      </CardGrid>

      <p>
        次の<Link href="/language/js-async">非同期処理</Link>では、このコールスタックが<Term>空になったとき</Term>に、待たせておいた処理をどう拾い上げるのか ―
        イベントループという、もう1つの実行の仕組みを見ていきます。
      </p>

      <DocsFooter href="/language/js-engine" />
    </DocsPage>
  );
}
