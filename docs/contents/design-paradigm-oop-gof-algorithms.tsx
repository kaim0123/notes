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
  Mark,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "振る舞いをオブジェクト化する",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Strategy", desc: "アルゴリズムを交換可能な部品として切り出す" },
  { name: "State", desc: "状態ごとの振る舞いを状態オブジェクトとして切り出す" },
  { name: "Command", desc: "命令そのものをオブジェクトとしてカプセル化する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; オブジェクト指向 &middot; GoFパターン</Eyebrow>
        <h1>振る舞いをオブジェクト化する ― Strategy・State・Command</h1>
        <Lead>
          「今何をすべきか」を決める部分 ― アルゴリズム・状態ごとの振る舞い・命令そのもの ― を、呼び出し側のコードから切り離してオブジェクト(または関数)として外部化する3つのGoF必須パターンです。
        </Lead>
      </Hero>

      <Heading num="01">3つのパターン</Heading>
      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Strategy ― アルゴリズムを交換可能な部品にする</Heading>
      <p><Term>Strategy</Term>は、複数の実装が考えられる処理(並び替え・料金計算など)を「アルゴリズム」として切り出し、実行時に差し替え可能にするパターンです。GoFの原典ではStrategyをクラス階層(インターフェース+実装クラス群)として表現しますが、関数を第一級の値として扱えるTypeScriptでは、多くの場合クラスを作らずに関数を渡すだけで同じ効果が得られます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type PricingStrategy = (basePrice: number) => number;

const regularPricing: PricingStrategy = (base) => base;
const memberPricing: PricingStrategy = (base) => base * 0.9;
const clearancePricing: PricingStrategy = (base) => base * 0.5;

function checkout(basePrice: number, pricing: PricingStrategy): number {
  return pricing(basePrice); // どの関数を渡すかで挙動が変わる
}

checkout(1000, memberPricing);`}</code>
      </pre>
      <p>クラス階層で書く場合は<code>{`interface PricingStrategy { apply(base: number): number }`}</code>とその実装クラス群になりますが、状態を持たない単純な差し替えであれば、関数を渡すだけの形の方が見通しが良いことが多いです。</p>

      <Heading num="03">State ― 状態ごとに振る舞いを切り出す</Heading>
      <p><Term>State</Term>は、オブジェクトの状態によって振る舞いが変わる処理を、if/switchの分岐で表現するのではなく、状態ごとのオブジェクトに委譲するパターンです。状態が増えるたびに既存の分岐を書き換えるのではなく、新しい状態クラスを追加するだけで済むようにします。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface OrderState {
  pay(order: Order): OrderState;
  ship(order: Order): OrderState;
}

class Pending implements OrderState {
  pay(order: Order) { return new Paid(); }
  ship(): OrderState { throw new Error("支払い前は発送できません"); }
}

class Paid implements OrderState {
  pay(): OrderState { throw new Error("支払い済みです"); }
  ship(order: Order) { return new Shipped(); }
}

class Shipped implements OrderState {
  pay(): OrderState { throw new Error("発送済みです"); }
  ship(): OrderState { throw new Error("発送済みです"); }
}`}</code>
      </pre>
      <p>「支払い前に発送できない」といったルールが、状態オブジェクトの中に閉じ込められるため、注文クラス本体に巨大なif文が育たずに済みます。</p>

      <Heading num="04">Command ― 命令をオブジェクトとして扱う</Heading>
      <p><Term>Command</Term>は、「何を実行するか」という命令そのものをオブジェクトとして表現するパターンです。命令をただの関数呼び出しで済ませず、オブジェクト(または値)として持つことで、キューに積んで後で実行したり、実行履歴を保存して取り消し(undo)たりできるようになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface Command {
  execute(): void;
  undo(): void;
}

class AddTextCommand implements Command {
  constructor(private doc: Document, private text: string) {}
  execute() { this.doc.append(this.text); }
  undo() { this.doc.removeLast(this.text.length); }
}

class CommandHistory {
  private history: Command[] = [];
  run(command: Command) {
    command.execute();
    this.history.push(command); // 実行した命令を記録
  }
  undoLast() {
    this.history.pop()?.undo(); // 最後の命令だけ取り消す
  }
}`}</code>
      </pre>

      <Heading num="05">3つがどうつながるか</Heading>
      <p>Strategyは「アルゴリズム」を、Stateは「状態ごとの振る舞い」を、Commandは「命令」を、それぞれ呼び出し側から切り離してオブジェクト(または関数)として外部化します。3つとも「今何をすべきか」の一部分を、条件分岐で書き散らすのではなく差し替え可能な単位として切り出す、という共通の発想に基づいています。</p>

      <Analogy label="💡 たとえるなら">
        Strategyは「同じレジで、渡された割引ルールのカードに従って会計する」こと、Stateは「今の交通信号の色によって、次にどの色に変わるかのルールが変わる」こと、Commandは「口頭の指示ではなく、注文票という紙(オブジェクト)に書いて渡すことで、後から見返したり取り消したりできる」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Strategy</h4><p>アルゴリズムを外部化し、実行時に差し替える。関数を渡すだけで代替できることが多い。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>State</h4><p>状態ごとの振る舞いを状態オブジェクトに委譲し、巨大なif文を防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Command</h4><p>命令をオブジェクト化し、キューイングや取り消しを可能にする。</p></Card>
      </CardGrid>

      <p>次は、複数のオブジェクトがどう連携し、通知し合い、走査し合うかを扱う<Link href="/design/paradigm/oop/gof/collaboration">連携・通知・走査</Link>のパターンを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/oop/gof/structure" tag="設計">構造を包む・繋ぐ</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop/gof/collaboration" tag="設計">連携・通知・走査</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
