import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GoF ― 連携・通知・走査" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>連携・通知・走査 ― Chain of Responsibility・Observer・Iterator</h1>
        <Lead>
          振る舞いに関するパターンのうち、「オブジェクト同士がどう連絡を取り合うか」に関わる3つを見ていきます。順に渡すのがChain of Responsibility、同時に知らせるのがObserver、中身を隠したまま順に取り出すのがIteratorです。
        </Lead>
      </Hero>

      <DiagramFrame
        slug="design-patterns-gof-collaboration-chain"
        aspect="700 / 300"
        caption="Chain of ResponsibilityとObserverの対比。上段では、リクエストが認証ハンドラ・入力チェック・本処理の順に鎖状に渡され、処理できるハンドラが見つかった時点で止まるため、順序が意味を持つ。下段では、注文オブジェクトの状態が変わると、在庫・通知・分析の3つの購読者へ同時に通知が飛び、発行側は誰が聞いているかを知らない。"
      />

      <Heading num="01">Chain of Responsibility ― ハンドラの鎖に委ねる</Heading>
      <p>
        <Term>Chain of Responsibility</Term>は、複数のハンドラを鎖状につなぎ、処理できる担当が見つかるまで要求を順番に渡していくパターンです。Webフレームワークのミドルウェアは、まさにこの形です。
      </p>
      <pre>
        <code>{`type Handler = (req: Request, next: () => Promise<Response>) => Promise<Response>;

const authenticate: Handler = async (req, next) => {
  if (!req.headers.get("authorization")) return new Response(null, { status: 401 });
  return next(); // 自分で処理できなければ次へ渡す
};

const validate: Handler = async (req, next) => {
  if (!req.body) return new Response(null, { status: 400 });
  return next();
};

// 鎖の順番が、そのまま処理の順番になる
const handle = compose([authenticate, validate, mainHandler]);`}</code>
      </pre>
      <p>
        個々のハンドラは「自分が処理できるか」だけを判断し、できなければ次へ渡します。ハンドラを1つ足すのに他のハンドラを触らずに済むのが利点です。
      </p>

      <Heading num="02">Observer ― 状態変化を購読者へ通知する</Heading>
      <p>
        <Term>Observer</Term>は、状態の変化を、登録された複数の購読者へ通知するパターンです。発行側は誰が購読しているかを知らないため、購読者を増やしても発行側のコードは変わりません。
      </p>
      <pre>
        <code>{`type Listener<T> = (event: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  subscribe(listener: Listener<T>): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(event: T): void {
    for (const listener of this.listeners) listener(event);
  }
}`}</code>
      </pre>
      <p>
        <Link href="/design/architecture-event-driven">イベント駆動アーキテクチャ</Link>は、この発想をプロセスをまたぐ粒度へ拡張したものです。同じく「誰が受け取るか知らない」という性質を持つ一方、ネットワークを越えるぶん配信の保証という課題が加わります。
      </p>
      <p>
        注意点も同じで、購読者が別のイベントを発行し、それがまた別の購読者を呼ぶ連鎖が広がると、何が起きているか追えなくなります。購読の解除を忘れるとメモリリークの原因にもなるため、<code>subscribe</code>が解除用の関数を返す形にしておくのが定石です。
      </p>

      <Heading num="03">Iterator ― 内部構造を隠したまま走査する</Heading>
      <p>
        <Term>Iterator</Term>は、集合の内部構造(配列か、連結リストか、ツリーか)を隠したまま、要素を順に取り出す手段を提供するパターンです。JavaScriptでは言語機能として組み込まれており、<code>Symbol.iterator</code>を実装すれば<code>for...of</code>で回せるようになります。
      </p>
      <pre>
        <code>{`class Playlist {
  private tracks: Track[] = [];

  // 内部が配列であることを外へ見せずに走査させる
  *[Symbol.iterator](): Iterator<Track> {
    for (const track of this.tracks) yield track;
  }
}

for (const track of playlist) {
  console.log(track.title);
}`}</code>
      </pre>
      <p>
        言語機能に吸収された結果、「Iteratorパターンを実装する」と意識する場面はほとんどなくなりました。パターンが役目を終えるとはこういうことだ、という良い例です。
      </p>

      <Analogy label="💡 たとえるなら">
        Chain of Responsibilityは「担当者が見つかるまで書類を回す社内の稟議」、Observerは「メーリングリストへの一斉配信」、Iteratorは「中身の並べ方を知らなくても、1つずつ取り出せる自動販売機」です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Chain of Responsibility</h4><p>1本の鎖を順に渡す。順序が意味を持ち、ハンドラの追加が容易。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Observer</h4><p>1対多で同時に知らせる。購読の解除を忘れないこと。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Iterator</h4><p>内部構造を隠して走査する。今は言語機能として組み込まれている。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/patterns-gof-collaboration" />
    </DocsPage>
  );
}
