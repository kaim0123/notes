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
  title: "連携・通知・走査",
};

function TierBadge() {
  return <Mark tier="must">必修</Mark>;
}

const rows = [
  { name: "Chain of Responsibility", desc: "複数のハンドラを鎖状につなぎ、順番に処理できるか試す" },
  { name: "Observer", desc: "状態の変化を、登録された複数の購読者へ通知する" },
  { name: "Iterator", desc: "集合の内部構造を隠したまま、要素を順に走査する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; オブジェクト指向 &middot; GoFパターン</Eyebrow>
        <h1>連携・通知・走査 ― Chain of Responsibility・Observer・Iterator</h1>
        <Lead>
          オブジェクト同士が1対1で直接呼び合うのではなく、間に何かを挟んで連携する3つのパターンです。<Term>Chain of Responsibility</Term>は「鎖」を挟んで処理を委ね、<Term>Observer</Term>は「購読者リスト」を挟んで通知し、<Term>Iterator</Term>は「走査役」を挟んで内部構造を隠します。
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

      <Heading num="02">Chain of Responsibility ― ハンドラの鎖に処理を委ねる</Heading>
      <p><Term>Chain of Responsibility</Term>は、複数のハンドラを鎖状につなぎ、先頭から順に「自分が処理できるか」を試していくパターンです。Express・Next.jsのミドルウェアのように、<code>next()</code>を呼ぶことで次のハンドラに処理を委ねる構造でよく現れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Handler = (req: Request, next: () => void) => void;

function chain(handlers: Handler[]): Handler {
  return function run(req, done) {
    let i = 0;
    const next = () => {
      const handler = handlers[i++];
      handler ? handler(req, next) : done();
    };
    next();
  };
}

const pipeline = chain([
  (req, next) => { console.log("auth check"); next(); },
  (req, next) => { console.log("validation"); next(); },
  (req, next) => { console.log("handle request"); next(); },
]);`}</code>
      </pre>
      <p>バリデーションチェーンのように、各ハンドラが「自分の担当外なら次に渡す」判断を持つ場合にも同じ形が使えます。呼び出し側は鎖の長さや順序を知らなくてよい点が、単純なif-elseの連続と違うところです。</p>

      <Heading num="03">Observer ― 状態変化を購読者へ通知する</Heading>
      <p><Term>Observer</Term>は、対象(Subject)の状態が変わったときに、登録された複数の購読者(Observer)へ一斉に通知するパターンです。この考え方はDOMの<code>addEventListener</code>やRxJSのObservableなど、現代のフロントエンドに広く浸透しています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class Subject<T> {
  private observers: Array<(value: T) => void> = [];

  subscribe(observer: (value: T) => void) {
    this.observers.push(observer);
    return () => { this.observers = this.observers.filter((o) => o !== observer); };
  }

  notify(value: T) {
    this.observers.forEach((observer) => observer(value));
  }
}

const cartTotal = new Subject<number>();
const unsubscribe = cartTotal.subscribe((total) => console.log(\`合計: \${total}円\`));
cartTotal.notify(1200);`}</code>
      </pre>

      <Heading num="04">Iterator ― 内部構造を隠したまま走査する</Heading>
      <p><Term>Iterator</Term>は、集合(コレクション)が配列なのか木構造なのかを呼び出し側に知らせずに、要素を順番に取り出す手段だけを提供するパターンです。考え方自体は<code>for-of</code>・generatorとして、現代の言語に標準装備されています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class Range {
  constructor(private start: number, private end: number) {}

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next(): IteratorResult<number> {
        return current < end
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  }
}

for (const n of new Range(1, 4)) console.log(n); // 1, 2, 3`}</code>
      </pre>
      <p>自前でIteratorインターフェースを実装する機会は少なくなりましたが、<code>[Symbol.iterator]</code>を実装しておけば<code>for-of</code>や配列の分割代入がそのまま使えるようになるため、独自コレクションクラスを作るときには今も有効です。</p>

      <Heading num="05">3つがどうつながるか</Heading>
      <p>Chain of Responsibilityは「誰が処理するか」を鎖に委ね、Observerは「誰に知らせるか」を購読者リストに委ね、Iteratorは「どう取り出すか」を走査役に委ねます。いずれも呼び出し側とオブジェクト集合の間に緩い間接層を挟むことで、集合の中身や構造が変わっても呼び出し側のコードを変えずに済むようにしている点が共通しています。</p>

      <Analogy label="💡 たとえるなら">
        Chain of Responsibilityは「順番に回ってくる回覧板」、Observerは「メルマガの配信リスト」、Iteratorは「ツアーガイド」です。回覧板は次の人が誰かを知らなくても回り、メルマガは購読者が何人・誰であるかを配信側は都度確認しなくてよく、ツアーガイドは観光地の道順を知らない観光客をルート通りに案内します。3つとも「間に立つ役」を1つ用意することで、両側の結合を緩めています。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Chain of Responsibility</h4><p>鎖状のハンドラに処理を委ね、担当者を動的に決める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Observer</h4><p>状態変化を購読者リストへ一斉通知する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Iterator</h4><p>内部構造を隠したまま、走査の手段だけを提供する。</p></Card>
      </CardGrid>

      <p>次は、アルゴリズム・状態・命令をオブジェクト化する<Link href="/design/paradigm/oop/gof/algorithms">振る舞いをオブジェクト化する</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/oop/gof/algorithms" tag="設計">振る舞いをオブジェクト化する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop/gof/creation" tag="設計">生成を工夫する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
