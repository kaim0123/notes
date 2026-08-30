import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GoF ― 振る舞いをオブジェクト化する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>振る舞いをオブジェクト化する ― Strategy・State・Command</h1>
        <Lead>
          振る舞いに関するパターンのうち、「処理そのものを値として扱う」3つを見ていきます。アルゴリズムを差し替え可能にするのがStrategy、状態ごとの振る舞いを切り出すのがState、命令そのものを記録・取り消し可能にするのがCommandです。
        </Lead>
      </Hero>

      <Heading num="01">Strategy ― アルゴリズムを交換可能な部品にする</Heading>
      <p>
        <Term>Strategy</Term>は、条件によって処理を変えたいという要求への答えです。構造の図解は<Link href="/design/patterns">設計パターン</Link>の03節にあります。関数を値として渡せる言語では、インターフェースとクラスを作らずに関数を渡すだけで同じ効果が得られます。
      </p>
      <pre>
        <code>{`type SortStrategy = (items: Product[]) => Product[];

const byPrice: SortStrategy = (items) =>
  [...items].sort((a, b) => a.price - b.price);

const byPopularity: SortStrategy = (items) =>
  [...items].sort((a, b) => b.reviews - a.reviews);

// 呼び出し側は「どう並べるか」を知らないまま実行できる
function render(items: Product[], sort: SortStrategy) {
  return sort(items).map(toCard);
}`}</code>
      </pre>
      <p>
        並び順を1つ増やしたいときに増えるのは関数1つだけで、<code>render</code>には手を入れません。分岐で書き分けていると、増やすたびに<code>render</code>を書き換えることになります。
      </p>

      <Heading num="02">State ― 状態ごとに振る舞いを切り出す</Heading>
      <p>
        <Term>State</Term>は、状態によってできることが変わるオブジェクトを扱うパターンです。「発送済みの注文はキャンセルできない」といったルールを、分岐の集まりではなく状態そのものに持たせます。
      </p>

      <DiagramFrame
        slug="design-patterns-gof-algorithms-state"
        aspect="660 / 280"
        caption="Stateパターンの状態遷移。下書き・確定済み・発送済み・キャンセル済みの4状態が、確定する・発送する・キャンセルするという操作の矢印で結ばれる。発送済みからキャンセル済みへの矢印には×印が付き、その状態では許されない操作であることを示す。状態が増えても、既存の状態オブジェクトには手を入れずに済む。"
      />

      <p>
        Strategyと構造はほぼ同じですが、意図が違います。Strategyは「呼び出し側が戦略を選ぶ」もの、Stateは「オブジェクト自身が状態に応じて振る舞いを変え、次の状態へ遷移する」ものです。遷移が絡む場合はStateだと考えると迷いません。
      </p>

      <Heading num="03">Command ― 命令をオブジェクトとして扱う</Heading>
      <p>
        <Term>Command</Term>は、操作そのものをオブジェクト(あるいはデータ)にして、実行・記録・取り消しを可能にするパターンです。エディタの取り消し機能や、ジョブキューに積む処理はこの形です。
      </p>
      <pre>
        <code>{`type Command = {
  execute(): void;
  undo(): void;
};

function createAddTextCommand(doc: Document, text: string): Command {
  return {
    execute: () => doc.append(text),
    undo: () => doc.removeLast(text.length),
  };
}

// 実行した命令を積んでおけば、順に取り消せる
const history: Command[] = [];
function run(command: Command) {
  command.execute();
  history.push(command);
}
function undoLast() {
  history.pop()?.undo();
}`}</code>
      </pre>
      <p>
        操作を「後から実行できるデータ」に変えるという発想は、<Link href="/design/architecture-app-cqrs">CQRS</Link>の書き込み側の表現や、ジョブキューへの投入とそのまま重なります。
      </p>

      <Analogy label="💡 たとえるなら">
        Strategyは「レシピを差し替えられる調理器具」、Stateは「信号機 ― 今が赤か青かで、次にできることが変わる」、Commandは「注文伝票 ― 伝票として残しておけば、後から実行も取り消しもできる」です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Strategy</h4><p>アルゴリズムを差し替え可能な部品にする。呼び出し側が選ぶ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>State</h4><p>状態ごとに振る舞いを切り出す。遷移が絡むならこちら。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Command</h4><p>操作をデータにして、記録・遅延実行・取り消しを可能にする。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/patterns-gof-algorithms" />
    </DocsPage>
  );
}
