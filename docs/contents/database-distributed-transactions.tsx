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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "分散トランザクション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>分散トランザクション ― Saga / TCC / 2PC</h1>
        <Lead>
          <Link href="/design/architecture/sys/microservices">マイクロサービス</Link>では各サービスが専用のデータベースを持つため、1つの<Term>ACIDトランザクション</Term>で複数サービスの更新をまとめることはできません。ここでは、複数の参加者にまたがる処理をどう整合させるかという<Term>分散トランザクション</Term>の代表的手法 ― <Term>2相コミット(2PC)</Term>、<Term>Saga</Term>、<Term>TCC(Try-Confirm-Cancel)</Term> ― を整理し、Saga と TCC の違いと使い分けを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ単一DBのACIDでは足りないか</Heading>
      <p>1つのデータベース内では、<Link href="/database/transaction">トランザクションとACID</Link>によって「全部成功するか、全部なかったことになるか」が保証されます。ところがサービスごとにDBが分かれていると、注文サービス・在庫サービス・決済サービスそれぞれが独立してコミットするため、途中で1つだけ失敗したときに「注文は確定したが在庫は引けていない」といった<Term>中途半端な状態</Term>が起こりえます。</p>
      <p>この問題への答えは大きく2方向に分かれます。複数参加者を1つの<Term>強い一貫性</Term>の塊として扱おうとする方式(2PC)と、各サービスは自分のDB内でACIDを守りつつ、全体としては<Term>結果整合性(eventual consistency)</Term>を受け入れて段階的に進める方式(Saga・TCC)です。</p>

      <Heading num="02">2相コミット(2PC) ― 全員がOKなら確定</Heading>
      <p><Term>2相コミット(Two-Phase Commit, 2PC)</Term>は、複数の参加者(各DBやリソースマネージャ)の前に<Term>コーディネータ</Term>を置き、2段階で全員の合意を取る方式です。試験でも「2相コミットメント」として出題される古典的な手法です。</p>
      <table>
        <thead>
          <tr><th>フェーズ</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">第1フェーズ(Prepare)</td><td>コーディネータが各参加者に「コミットできるか」を問い合わせ、参加者はログを書いたうえで「準備OK(Yes)」か「不可(No)」を返す</td></tr>
          <tr><td className="hl">第2フェーズ(Commit / Abort)</td><td>全員がYesならコーディネータがCommitを指示。1人でもNoなら全員にAbort(ロールバック)を指示する</td></tr>
        </tbody>
      </table>
      <p>2PCは理論上、複数DBにまたがってもACIDに近い強い一貫性を実現できます。一方で、コーディネータや参加者がネットワーク分断で応答不能になると<Term>ブロッキング</Term>が起き、他のトランザクションが待たされ続けるリスクがあります。可用性と性能のコストが高く、マイクロサービス間の日常業務ではあまり採用されませんが、「2PCが何を目指し、何が難しいか」を知っておくと Saga / TCC の位置づけが分かりやすくなります。</p>

      <Heading num="03">Saga ― 段階実行と補償処理</Heading>
      <p><Term>Saga</Term>は、複数サービスにまたがる処理を<Term>順番に</Term>実行し、途中で失敗したら、すでに成功したステップを<Term>補償トランザクション(compensating transaction)</Term>で取り消していく方式です。各ステップは自分のDB内では通常のACIDトランザクションとしてコミットされるため、全体としては一時的に中途半端な状態が存在し得ますが、最終的には整合した状態(または取り消し済みの状態)へ収束します。</p>
      <p>オーケストレーション(中央のSagaマネージャが順序を管理)と、<Link href="/design/architecture/sys/event-driven">イベント駆動</Link>でよく使われるコレオグラフィ(各サービスがイベントを見て次の処理や補償を自律的に実行)の2つの調整方法があります。詳しくは<Link href="/database/distributed-transactions/saga">Saga</Link>を参照してください。</p>

      <Heading num="04">TCC ― Try / Confirm / Cancel</Heading>
      <p><Term>TCC(Try-Confirm-Cancel)</Term>も複数サービスにまたがる処理を段階的に進めますが、Saga とは<Term>各ステップの意味</Term>が異なります。各参加者は Try でリソースを<Term>予約</Term>し、全員成功なら Confirm で<Term>確定</Term>、失敗なら Cancel で<Term>解放</Term>します。</p>
      <p>Sagaの補償が「すでに確定した変更をビジネス上の逆操作で取り消す」ことに対し、TCCは「確定前に予約段階で止めておき、失敗時はCancelで予約だけ解く」というイメージに近いです。在庫・残高・座席など「仮押さえ」が明確なドメインでよく使われます。詳しくは<Link href="/database/distributed-transactions/tcc">TCC</Link>を参照してください。</p>

      <Heading num="05">Saga と TCC の比較</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>Saga</th><th>TCC</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">基本方針</td><td>各ステップを確定させ、失敗時は補償で取り消す</td><td>Tryで予約し、成功ならConfirm、失敗ならCancel</td></tr>
          <tr><td className="hl">一貫性のイメージ</td><td>結果整合性。途中状態が外部から見える時間がある</td><td>Try〜Confirm/Cancelの設計次第で、Sagaより「確定前の見え方」を制御しやすい</td></tr>
          <tr><td className="hl">失敗時の処理</td><td>補償トランザクション(ビジネス上の逆操作)を設計する</td><td>Cancelで予約を解放する(Confirm前なら比較的機械的)</td></tr>
          <tr><td className="hl">実装の負担</td><td>補償ロジックを業務ごとに考える必要がある</td><td>Try/Confirm/Cancelの3 APIと予約用のデータ設計が要る</td></tr>
          <tr><td className="hl">向いている例</td><td>配送手配・ポイント付与・通知など、補償が自然に定義できる長い業務フロー</td><td>在庫・残高・座席など、リソースの「仮押さえ」が明確なドメイン</td></tr>
        </tbody>
      </table>

      <Aside label="補足">
        Saga と TCC は排他的な選択肢ではありません。1つの業務フローの中で、在庫・決済は TCC、配送・通知は Saga(補償)というように組み合わせることもあります。重要なのは「各サービスは自分のDB内でACIDを守り、サービス間はどの方式で最終整合を取るか」を明示することです。
      </Aside>

      <Heading num="06">2PC / Saga / TCC の使い分け</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>一貫性</th><th>可用性・性能</th><th>採用の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">2PC</td><td>強い(全員合意)</td><td>分断・障害時にブロッキングしやすい</td><td>試験知識、同一データセンター内の少数DB連携など限定的な文脈</td></tr>
          <tr><td className="hl">Saga</td><td>結果整合性</td><td>各サービスが独立して進めやすい</td><td>マイクロサービス間の長い業務フロー全般。補償が定義できること</td></tr>
          <tr><td className="hl">TCC</td><td>予約〜確定の設計で制御</td><td>Saga同様、サービス間は疎結合</td><td>在庫・残高など「予約してから確定」のモデルがはっきりしているドメイン</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        旅行の予約を想像してください。2PCは全員が「行ける」と言い切ってから一斉に予約を確定する幹事役です。Sagaは、航空券を取ったあとホテルを取り、ダメなら航空券をキャンセル料付きで取り消す(補償)流れです。TCCは、まず航空券・ホテルそれぞれを「仮押さえ(Try)」し、全部取れたら本予約(Confirm)、どれかダメなら仮押さえだけ解除(Cancel)する方式です。
      </Analogy>

      <p>Saga と TCC をそれぞれ深掘りするページも用意しています。<Link href="/database/distributed-transactions/saga">Saga</Link>ではオーケストレーションとコレオグラフィ、補償の設計を、<Link href="/database/distributed-transactions/tcc">TCC</Link>では Try/Confirm/Cancel のデータ設計と実装の要点を扱います。次のページでは、検索や更新を速くする<Link href="/database/index">索引とアクセス制御</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>DBが分かれるとACIDは1サービス内だけ</h4><p>サービス間は結果整合性を前提に、別の調整方式が必要になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Sagaは確定後の補償、TCCは確定前の予約</h4><p>失敗時の取り消し方が本質的な違い。業務の性質で選ぶ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>2PCは強いがブロッキングに弱い</h4><p>試験と古典理論として押さえ、実務の主役は Saga / TCC 側。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
            <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
            <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
            <RelatedLink href="/database/distributed-transactions/saga" tag="データベース">Saga</RelatedLink>
            <RelatedLink href="/database/distributed-transactions/tcc" tag="データベース">TCC</RelatedLink>
            <RelatedLink href="/design/patterns" tag="設計">設計パターン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
