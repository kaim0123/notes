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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Saga",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 分散トランザクション</Eyebrow>
        <h1>Saga ― 段階実行と補償処理</h1>
        <Lead>
          <Link href="/design/architecture/sys/microservices">マイクロサービス</Link>では各サービスが専用DBを持つため、1つの<Term>ACIDトランザクション</Term>で複数サービスをまとめられません。<Term>Saga</Term>は、サービス間の処理を<Term>順番に</Term>実行し、途中で失敗したらすでに成功したステップを<Term>補償トランザクション</Term>で取り消す方式です。全体としては<Term>結果整合性(eventual consistency)</Term>を受け入れつつ、最終的に整合した状態へ収束させます。
        </Lead>
      </Hero>

      <Heading num="01">Sagaが解決する問題</Heading>
      <p>1つのDB内では<Link href="/database/transaction">トランザクションとACID</Link>によって「全部成功するか、全部なかったことになるか」が保証されます。ところが注文・在庫・決済のようにサービスごとにDBが分かれていると、注文だけ確定して在庫が引けない、といった<Term>中途半端な状態</Term>が起こりえます。</p>
      <p>Sagaは、この問題を「各ステップを自分のDB内で確定させ、失敗時だけ逆方向に戻す」ことで扱います。2PCのように全員の合意を待って一斉に確定するのではなく、各サービスが独立して進められるため、可用性と性能の面でマイクロサービスに向いています。背景にある2PCやTCCとの位置づけは<Link href="/database/distributed-transactions">分散トランザクション</Link>で整理しています。</p>

      <Heading num="02">基本の流れ ― 順次実行と補償</Heading>
      <p>Sagaは、複数サービスにまたがる業務フローを<Term>ローカルトランザクションの連鎖</Term>として表現します。各ステップは自分のDB内で通常のACIDトランザクションとしてコミットされ、全体としては一時的に中途半端な状態が外部から見える時間があります。</p>
      <p>例えば「注文確定 → 在庫引当 → 決済」の3ステップで決済が失敗した場合、在庫引当を「引当を戻す」補償処理で取り消し、注文を「キャンセル済み」に更新する、という流れです。</p>
      <table>
        <thead>
          <tr><th>概念</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フォワードステップ</td><td>業務を前に進める通常の処理。各サービス内でコミットされる</td></tr>
          <tr><td className="hl">補償トランザクション</td><td>すでに成功したステップをビジネス上の逆操作で取り消す処理</td></tr>
          <tr><td className="hl">Sagaインスタンス</td><td>1つの業務フロー(例: 1件の注文)に対応する、ステップと状態の管理単位</td></tr>
        </tbody>
      </table>
      <Aside label="補償 ≠ ロールバック">
        補償は必ずしも物理的なロールバック(UPDATEを元に戻す)ではありません。「キャンセル」「返金」「在庫を戻す」「ポイントを差し戻す」といった<Term>ビジネス上の逆操作</Term>として設計します。キャンセル料が発生する航空券の例では、元の状態には戻らない補償になることもあります。
      </Aside>

      <Heading num="03">オーケストレーションとコレオグラフィ</Heading>
      <p>Sagaの調整方法には2つあります。どちらも「順番に進め、失敗時に補償する」という本質は同じですが、<Term>誰が流れを管理するか</Term>が異なります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>仕組み</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">オーケストレーション</td>
            <td>中央の<Term>Sagaマネージャ</Term>(オーケストレータ)が各サービスを順に呼び出し、失敗時に補償の順序も管理する</td>
            <td>フローが複雑で、全体の状態を1か所で把握したい。条件分岐やタイムアウト処理を明示的に書きたい</td>
          </tr>
          <tr>
            <td className="hl">コレオグラフィ</td>
            <td>各サービスが<Term>イベント</Term>を発行・購読し、次の処理や補償を自律的に実行する。中央の指揮者はいない</td>
            <td><Link href="/design/architecture/sys/event-driven">イベント駆動</Link>アーキテクチャと相性が良い。サービス間の結合を疎に保ちたい</td>
          </tr>
        </tbody>
      </table>
      <p>オーケストレーションはフローの見通しが良くデバッグしやすい反面、Sagaマネージャが単一障害点になりやすいです。コレオグラフィはサービスの独立性が高い反面、「全体で今どの段階か」を追うのが難しく、補償の順序がイベントの到着順に依存することがあります。実務では、重要な業務フローはオーケストレーション、周辺的な連携はコレオグラフィ、という使い分けもよく見られます。</p>

      <Heading num="04">設計で押さえるポイント</Heading>
      <p>Sagaを採用するとき、実装以前に次の点を決めておく必要があります。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">冪等性</td><td>同じステップや補償がネットワーク再送で2回実行されても安全であること。ステップIDやSaga IDで重複実行を検知する</td></tr>
          <tr><td className="hl">補償の定義</td><td>各フォワードステップに対応する補償を業務ルールとして定義できること。補償不能な操作(メール送信済みなど)は「意味のある補償」(再送・訂正通知)に置き換える</td></tr>
          <tr><td className="hl">可観測性</td><td>Sagaインスタンスの状態(進行中・完了・補償中)をログやダッシュボードで追えること。途中で止まったSagaの手動介入手段も検討する</td></tr>
          <tr><td className="hl">途中状態の許容</td><td>「注文は確定、在庫は未引当」のような一時状態を、利用者や他システムがどう見えるかを設計する</td></tr>
        </tbody>
      </table>

      <Heading num="05">TCCとの違いと使い分け</Heading>
      <p>Sagaは各ステップを<Term>確定させてから</Term>、失敗時に補償で取り消します。一方<Link href="/database/distributed-transactions/tcc">TCC</Link>は、Tryで<Term>予約</Term>したうえでConfirm/Cancelを選ぶ方式です。在庫・残高のように「仮押さえ → 本確定」のモデルがはっきりしているドメインではTCCの方が自然なことが多く、配送手配・通知・ポイント付与のように補償が自然に定義できる長い業務フローではSagaが向きます。</p>
      <p>排他的な選択肢ではなく、1つの業務フローの中で在庫・決済はTCC、配送・通知はSaga(補償)と組み合わせることもあります。</p>

      <Analogy label="💡 たとえるなら">
        旅行の予約で、航空券を取ったあとホテルを取り、ホテルが取れなければ航空券をキャンセル料付きで取り消す流れがSagaです。各予約はすでに確定しており、後からビジネス上の逆操作(キャンセル)で戻します。TCCの「仮押さえしてから本予約」する方式との対比は<Link href="/database/distributed-transactions/tcc">TCC</Link>のページで詳しく見ています。
      </Analogy>

      <p>次は、予約段階でリソースを確保する<Link href="/database/distributed-transactions/tcc">TCC(Try-Confirm-Cancel)</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>確定後の補償が本質</h4><p>各ステップはローカルACIDでコミットし、失敗時だけ逆操作で戻す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>オーケストレーションかコレオグラフィか</h4><p>フローの見通しとサービスの独立性のトレードオフで選ぶ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>冪等性と補償の設計が成否を分ける</h4><p>再送安全と、業務ごとの取り消しルールを先に決める。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/distributed-transactions" tag="データベース">分散トランザクション</RelatedLink>
            <RelatedLink href="/database/distributed-transactions/tcc" tag="データベース">TCC</RelatedLink>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
            <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
            <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
            <RelatedLink href="/design/patterns" tag="設計">設計パターン(Saga)</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
