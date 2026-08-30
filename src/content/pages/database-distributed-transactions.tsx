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
  title: "分散トランザクション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>分散トランザクション ― 2PC / Saga / TCC</h1>
        <Lead>
          <Term>マイクロサービス</Term>のように各サービスが専用のデータベースを持つ構成では、1つの<Term>ACIDトランザクション</Term>で複数サービスの更新をまとめることはできません。ここでは、複数の参加者にまたがる処理をどう整合させるかという<Term>分散トランザクション</Term>の代表的な手法 ―
          <Term>2相コミット(2PC)</Term>、<Term>Saga</Term>、<Term>TCC(Try-Confirm-Cancel)</Term> ―
          を順に見て、SagaとTCCの違いと使い分けを整理します。
        </Lead>
      </Hero>

      <Heading num="01">なぜ単一DBのACIDでは足りないか</Heading>
      <p>
        1つのデータベース内では、<Link href="/database/transaction">トランザクションとACID</Link>によって「全部成功するか、全部なかったことになるか」が保証されます。ところがサービスごとにDBが分かれていると、注文サービス・在庫サービス・決済サービスがそれぞれ独立してコミットするため、途中で1つだけ失敗したときに「注文は確定したが在庫は引けていない」といった<Term>中途半端な状態</Term>が起こりえます。
      </p>
      <p>
        この問題への答えは大きく2方向に分かれます。複数参加者を1つの<Term>強い一貫性</Term>の塊として扱おうとする方式(2PC)と、各サービスは自分のDB内でACIDを守りつつ、全体としては<Term>結果整合性(eventual consistency)</Term>を受け入れて段階的に進める方式(Saga・TCC)です。
      </p>

      <Heading num="02">2相コミット(2PC) ― 全員がOKなら確定</Heading>
      <p>
        <Term>2相コミット(Two-Phase Commit, 2PC)</Term>は、複数の参加者(各DBやリソースマネージャ)の前に<Term>コーディネータ</Term>を置き、2段階で全員の合意を取る方式です。試験でも「2相コミットメント」として出題される古典的な手法です。
      </p>

      <DiagramFrame
        slug="database-distributed-transactions-2pc"
        aspect="780 / 340"
        caption="2相コミット(2PC)のシーケンス。第1フェーズでコーディネータが参加者A・B・Cにprepareを問い合わせ、全員がYesを返す。第2フェーズで全員の合意が取れたためコーディネータがcommitを指示し、全員がコミットを完了する。1人でもNoを返した場合は全員にabortが指示される。"
      />

      <table>
        <thead>
          <tr>
            <th>フェーズ</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">第1フェーズ(Prepare)</td>
            <td>コーディネータが各参加者に「コミットできるか」を問い合わせ、参加者はログを書いたうえで「準備OK(Yes)」か「不可(No)」を返す</td>
          </tr>
          <tr>
            <td className="hl">第2フェーズ(Commit / Abort)</td>
            <td>全員がYesならコーディネータがCommitを指示。1人でもNoなら全員にAbort(ロールバック)を指示する</td>
          </tr>
        </tbody>
      </table>
      <p>
        2PCは理論上、複数DBにまたがってもACIDに近い強い一貫性を実現できます。一方で、コーディネータや参加者がネットワーク分断で応答不能になると<Term>ブロッキング</Term>が起き、他のトランザクションが待たされ続けるリスクがあります。可用性と性能のコストが高く、マイクロサービス間の日常業務ではあまり採用されませんが、「2PCが何を目指し、何が難しいか」を知っておくとSaga・TCCの位置づけが分かりやすくなります。
      </p>

      <Heading num="03">Saga ― 段階実行と補償処理</Heading>
      <p>
        <Term>Saga</Term>は、複数サービスにまたがる処理を<Term>順番に</Term>実行し、途中で失敗したら、すでに成功したステップを<Term>補償トランザクション(compensating transaction)</Term>で取り消していく方式です。各ステップは自分のDB内では通常のACIDトランザクションとしてコミットされるため、全体としては一時的に中途半端な状態が存在し得ますが、最終的には整合した状態(または取り消し済みの状態)へ収束します。
      </p>

      <DiagramFrame
        slug="database-distributed-transactions-saga"
        aspect="780 / 300"
        caption="Sagaの流れ。上段は注文確定・在庫引当・決済の順にフォワードステップが実行される様子を示す。決済ステップが失敗したため、下段では逆方向に補償トランザクションが実行され、在庫引当を取り消して在庫を戻し、続いて注文をキャンセルする。"
      />

      <table>
        <thead>
          <tr>
            <th>概念</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">フォワードステップ</td>
            <td>業務を前に進める通常の処理。各サービス内でコミットされる</td>
          </tr>
          <tr>
            <td className="hl">補償トランザクション</td>
            <td>すでに成功したステップをビジネス上の逆操作で取り消す処理</td>
          </tr>
          <tr>
            <td className="hl">Sagaインスタンス</td>
            <td>1つの業務フロー(例: 1件の注文)に対応する、ステップと状態の管理単位</td>
          </tr>
        </tbody>
      </table>

      <Aside label="補償 ≠ ロールバック">
        補償は必ずしも物理的なロールバック(UPDATEを元に戻す)ではありません。「キャンセル」「返金」「在庫を戻す」「ポイントを差し戻す」といった<Term>ビジネス上の逆操作</Term>として設計します。キャンセル料が発生する航空券の例では、元の状態には戻らない補償になることもあります。
      </Aside>

      <p>
        Sagaの調整方法には2つあります。中央の<Term>Sagaマネージャ</Term>(オーケストレータ)が各サービスを順に呼び出し、失敗時の補償の順序も管理する<Term>オーケストレーション</Term>と、各サービスがイベントを発行・購読して次の処理や補償を自律的に実行する<Term>コレオグラフィ</Term>です。オーケストレーションはフローの見通しが良くデバッグしやすい反面、Sagaマネージャが単一障害点になりやすく、コレオグラフィはサービスの独立性が高い反面、「全体で今どの段階か」を追うのが難しく、補償の順序がイベントの到着順に依存することがあります。
      </p>
      <p>
        採用する際は、同じステップや補償が再送で2回実行されても安全であること(<Term>冪等性</Term>)、各フォワードステップに対応する補償を業務ルールとして定義できること、Sagaインスタンスの進行状況をログやダッシュボードで追えること(<Term>可観測性</Term>)を先に決めておく必要があります。
      </p>

      <Heading num="04">TCC ― Try / Confirm / Cancel</Heading>
      <p>
        <Term>TCC(Try-Confirm-Cancel)</Term>も複数サービスにまたがる処理を段階的に進めますが、Sagaとは<Term>各ステップの意味</Term>が異なります。各参加者はTryでリソースを<Term>予約</Term>し、全員成功ならConfirmで<Term>確定</Term>、失敗ならCancelで<Term>解放</Term>します。Sagaの補償が「すでに確定した変更をビジネス上の逆操作で取り消す」ことに対し、TCCは「確定前に予約段階で止めておき、失敗時はCancelで予約だけ解く」というイメージに近く、在庫・残高・座席など「仮押さえ」が明確なドメインでよく使われます。
      </p>

      <DiagramFrame
        slug="database-distributed-transactions-tcc"
        aspect="760 / 320"
        caption="TCCの流れ。参加者はまずTryでリソースを予約する。全参加者のTry結果を集約し、全員成功ならConfirmで予約を確定し、誰か1人でも失敗すればCancelで予約を解放する、という2方向への分岐を示す。"
      />

      <table>
        <thead>
          <tr>
            <th>フェーズ</th>
            <th>内容</th>
            <th>例(在庫)</th>
            <th>例(口座)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Try</td>
            <td>リソースを<Term>予約</Term>する。まだ確定ではないが、他トランザクションから奪えない状態にする</td>
            <td>在庫数から「仮引当」分を減らし、reserved列に記録</td>
            <td>残高から「仮引当」分を減らし、holdレコードを作成</td>
          </tr>
          <tr>
            <td className="hl">Confirm</td>
            <td>全員のTryが成功したら、予約を<Term>確定</Term>する</td>
            <td>仮引当 → 本引当(売上計上)</td>
            <td>仮引当 → 本振替</td>
          </tr>
          <tr>
            <td className="hl">Cancel</td>
            <td>どこかで失敗したら、予約を<Term>解放</Term>する</td>
            <td>仮引当を戻し、在庫を利用可能に戻す</td>
            <td>holdを解除し、残高を元に戻す</td>
          </tr>
        </tbody>
      </table>

      <p>
        TCCを実装するには、通常の「確定済み」データとは別に<Term>予約中</Term>の状態を表現する必要があります。in-stockの行や残高に available / reserved / confirmed のような状態列を持たせる方法、holdsやreservationsといった予約専用テーブルに仮押さえを記録しConfirmで本テーブルへ反映する方法などが代表的です。
      </p>

      <Aside label="タイムアウト">
        Tryしたまま Confirm/Cancel が来ない「宙ぶらり」の予約は、一定時間で自動Cancelする<Term>予約の有効期限</Term>を設けるのが一般的です。期限切れ予約の解放は、バッチや定期ジョブで行います。
      </Aside>

      <Heading num="05">Saga と TCC の比較</Heading>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>Saga</th>
            <th>TCC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">基本方針</td>
            <td>各ステップを確定させ、失敗時は補償で取り消す</td>
            <td>Tryで予約し、成功ならConfirm、失敗ならCancel</td>
          </tr>
          <tr>
            <td className="hl">一貫性のイメージ</td>
            <td>結果整合性。途中状態が外部から見える時間がある</td>
            <td>Try〜Confirm/Cancelの設計次第で、Sagaより「確定前の見え方」を制御しやすい</td>
          </tr>
          <tr>
            <td className="hl">失敗時の処理</td>
            <td>補償トランザクション(ビジネス上の逆操作)を設計する</td>
            <td>Cancelで予約を解放する(Confirm前なら比較的機械的)</td>
          </tr>
          <tr>
            <td className="hl">実装の負担</td>
            <td>補償ロジックを業務ごとに考える必要がある</td>
            <td>Try/Confirm/Cancelの3 APIと予約用のデータ設計が要る</td>
          </tr>
          <tr>
            <td className="hl">向いている例</td>
            <td>配送手配・ポイント付与・通知など、補償が自然に定義できる長い業務フロー</td>
            <td>在庫・残高・座席など、リソースの「仮押さえ」が明確なドメイン</td>
          </tr>
        </tbody>
      </table>

      <Aside label="補足">
        SagaとTCCは排他的な選択肢ではありません。1つの業務フローの中で、在庫・決済はTCC、配送・通知はSaga(補償)というように組み合わせることもあります。重要なのは「各サービスは自分のDB内でACIDを守り、サービス間はどの方式で最終整合を取るか」を明示することです。
      </Aside>

      <Heading num="06">2PC・Saga・TCCの使い分け</Heading>
      <table>
        <thead>
          <tr>
            <th>方式</th>
            <th>一貫性</th>
            <th>可用性・性能</th>
            <th>採用の目安</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">2PC</td>
            <td>強い(全員合意)</td>
            <td>分断・障害時にブロッキングしやすい</td>
            <td>試験知識、同一データセンター内の少数DB連携など限定的な文脈</td>
          </tr>
          <tr>
            <td className="hl">Saga</td>
            <td>結果整合性</td>
            <td>各サービスが独立して進めやすい</td>
            <td>マイクロサービス間の長い業務フロー全般。補償が定義できること</td>
          </tr>
          <tr>
            <td className="hl">TCC</td>
            <td>予約〜確定の設計で制御</td>
            <td>Saga同様、サービス間は疎結合</td>
            <td>在庫・残高など「予約してから確定」のモデルがはっきりしているドメイン</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        旅行の予約を想像してください。2PCは全員が「行ける」と言い切ってから一斉に予約を確定する幹事役です。Sagaは、航空券を取ったあとホテルを取り、ダメなら航空券をキャンセル料付きで取り消す(補償)流れです。TCCは、まず航空券・ホテルそれぞれを「仮押さえ(Try)」し、全部取れたら本予約(Confirm)、どれかダメなら仮押さえだけ解除(Cancel)する方式です。
      </Analogy>

      <Heading num="まとめ">3方式の位置づけ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>DBが分かれるとACIDは1サービス内だけ</h4>
          <p>サービス間は結果整合性を前提に、別の調整方式が必要になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Sagaは確定後の補償、TCCは確定前の予約</h4>
          <p>失敗時の取り消し方が本質的な違い。業務の性質で選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>2PCは強いがブロッキングに弱い</h4>
          <p>試験と古典理論として押さえ、実務の主役はSaga・TCC側。</p>
        </Card>
      </CardGrid>
      <p>次は、検索や更新を速くする「索引とアクセス制御」を見ていきましょう。</p>

      <DocsFooter href="/database/distributed-transactions" />
    </DocsPage>
  );
}
