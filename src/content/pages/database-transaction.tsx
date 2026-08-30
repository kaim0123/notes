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
  title: "トランザクションと整合性",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>トランザクションと整合性 ― まとめて成功か、まとめて取り消しか</h1>
        <Lead>
          銀行の振込は「Aの口座から引く」「Bの口座に足す」という2つの更新が、どちらも成功するか、どちらも取り消されるかでなければ困ります。この「分けられない一連の処理の単位」が<Term>トランザクション</Term>です。ここではその性質(ACID)、同時実行を安全にするロックと分離レベル、障害から回復するログとバックアップ、試験でも問われる2相コミットまで整理します。
        </Lead>
      </Hero>

      <Heading num="01">ACID特性 ― トランザクションが守る4つの約束</Heading>
      <p>
        <Term>トランザクション</Term>は「まとめて成功するか、まとめて取り消すか」の処理単位です。信頼できるトランザクションが満たすべき性質を、頭文字をとって<Term>ACID特性</Term>と呼びます。
      </p>
      <table>
        <thead>
          <tr>
            <th>頭文字</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <strong>A</strong>tomicity(原子性)
            </td>
            <td>全体が実行されるか、全体が取り消されるか。中途半端な状態を残さない</td>
          </tr>
          <tr>
            <td className="hl">
              <strong>C</strong>onsistency(一貫性)
            </td>
            <td>制約を満たした整合的な状態が、処理の前後で保たれる</td>
          </tr>
          <tr>
            <td className="hl">
              <strong>I</strong>solation(独立性)
            </td>
            <td>並行して動くトランザクションが互いに不適切に影響しない</td>
          </tr>
          <tr>
            <td className="hl">
              <strong>D</strong>urability(永続性)
            </td>
            <td>コミットした結果は、その後に障害が起きても失われない</td>
          </tr>
        </tbody>
      </table>
      <p>
        処理を確定させることを<Term>コミット</Term>、途中で取り消して元に戻すことを<Term>ロールバック</Term>と呼びます。原子性は、どこかで失敗したら自動でロールバックすることで守られます。
      </p>

      <DiagramFrame
        slug="database-transaction-flow"
        aspect="760 / 340"
        caption="トランザクションの流れ。BEGINで開始し、UPDATE・INSERT・DELETEなどのSQL文を1つの塊として実行する。すべて成功すればCOMMITで確定・永続化し、途中で失敗や矛盾が発生すればROLLBACKで更新前の状態へ戻す。残るのは「全部成功」か「全部取り消し」のどちらかだけで、これが原子性(Atomicity)にあたる。"
      />

      <Analogy label="💡 たとえるなら">
        原子性は「送金ボタンを押したら、引き落としと入金の両方が完了するか、どちらも起きなかったことになるか」の保証です。「引き落とされたのに相手に届かない」という中途半端が絶対に起きないよう、DBMSが2つの更新を1つの塊として扱ってくれます。
      </Analogy>

      <Heading num="02">同時実行制御 ― ロックとデッドロック</Heading>
      <p>
        複数のトランザクションが同じデータを同時に更新すると、一方の更新がもう一方に上書きされるなどの不整合が起こりえます。これを防ぐのが<Term>ロック</Term>です。データを更新する前にロックをかけ、他のトランザクションからの操作を待たせることで、独立性(Isolation)を守ります。
      </p>
      <table>
        <thead>
          <tr>
            <th>ロックの種類</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">共有ロック(読み取りロック)</td>
            <td>複数が同時に読める。他者の更新はブロックする</td>
          </tr>
          <tr>
            <td className="hl">専有ロック(書き込みロック)</td>
            <td>1つのトランザクションだけが占有し、他者の読み書きをブロックする</td>
          </tr>
        </tbody>
      </table>
      <p>
        ただしロックには落とし穴があります。トランザクションAがデータ1をロックしてデータ2を待ち、トランザクションBがデータ2をロックしてデータ1を待つ ― 互いに相手のロック解放を待ち続けて動けなくなる状態を<Term>デッドロック</Term>と呼びます。多くのDBMSはデッドロックを検知して、片方のトランザクションを強制的にロールバックさせることで解消します。
      </p>

      <DiagramFrame
        slug="database-transaction-deadlock"
        aspect="700 / 440"
        caption="デッドロックの構図。トランザクションAはデータ1をロックしたままデータ2の解放を待ち、トランザクションBはデータ2をロックしたままデータ1の解放を待つ。互いに相手の保持するロックを待つ循環待機が成立し、どちらも進めなくなる。DBMSはこの循環を検知すると、一方を強制的にロールバックして解消する。"
      />

      <p>
        ロックの対象範囲を<Term>ロック粒度</Term>と呼びます。テーブル全体・行・ページなど、粒度が粗いほど管理は簡単ですが他のトランザクションを長く待たせ、細かいほど並行性は上がる一方でオーバーヘッドが増えます。
      </p>

      <Heading num="03">分離レベル ― 独立性と並行性のトレードオフ</Heading>
      <p>
        独立性(Isolation)をどこまで厳密に保つかは<Term>分離レベル(隔離性水準)</Term>で調整します。厳しくするほど不整合は起きにくいですが、他のトランザクションを待たせる時間が増え、並行性(同時に処理できる量)は下がります。
      </p>
      <p>
        分離レベルを緩めると、次のような<Term>副作用(anomaly)</Term>が起こりえます。試験では「どのレベルで防げるか」の対応を問われます。
      </p>
      <table>
        <thead>
          <tr>
            <th>副作用</th>
            <th>起きること</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ダーティリード</td>
            <td>
              他トランザクションがまだ<Term>コミットしていない</Term>変更を読んでしまう。相手がロールバックすると、存在しなかったはずの値を読んだことになる
            </td>
          </tr>
          <tr>
            <td className="hl">反復不能読取り</td>
            <td>同じ行を2回読んだとき、間に別トランザクションが更新・コミットしていて、2回目の値が1回目と違う</td>
          </tr>
          <tr>
            <td className="hl">ファントムリード</td>
            <td>同じ条件で2回検索したとき、間に別トランザクションが行を追加・削除・コミットしていて、2回目の結果件数(または行の集合)が変わる</td>
          </tr>
        </tbody>
      </table>
      <p>SQL標準で定義される代表的な4段階は次のとおりです(下ほど厳しく、並行性は下がります)。</p>
      <table>
        <thead>
          <tr>
            <th>分離レベル</th>
            <th>防げる副作用</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Read Uncommitted(未コミット読取り)</td>
            <td>なし</td>
            <td>最も緩い。ダーティリードも起こりうる。実務ではほとんど使わない</td>
          </tr>
          <tr>
            <td className="hl">Read Committed(コミット済読取り)</td>
            <td>ダーティリード</td>
            <td>多くのDBMSのデフォルトに近い。コミット済みのデータだけ読む</td>
          </tr>
          <tr>
            <td className="hl">Repeatable Read(反復可能読取り)</td>
            <td>ダーティリード・反復不能読取り</td>
            <td>同じ行を読み直しても値が変わらない。ファントムリードは起こりうる</td>
          </tr>
          <tr>
            <td className="hl">Serializable(直列化可能)</td>
            <td>上記すべて(ファントムリード含む)</td>
            <td>最も厳しい。まるでトランザクションが1本ずつ順番に実行されたかのように見える</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="database-transaction-isolation-levels"
        aspect="760 / 320"
        caption="分離レベルと副作用の対応表。行はダーティリード・反復不能読取り・ファントムリード、列はRead Uncommitted・Read Committed・Repeatable Read・Serializable。○が防げる、×が起こりうるを表し、Read Committedでダーティリード、Repeatable Readで反復不能読取り、Serializableでファントムリードが防げるようになり、レベルが上がるごとに○が1つずつ増える。"
      />

      <Aside label="試験の覚え方">
        段階が上がるごとに「読み取り系のトラブル」が1つずつ防げる、と捉えると整理しやすいです。Read Committed でダーティリード、Repeatable Read で反復不能読取り、Serializable でファントムリード、という順番です。
      </Aside>

      <Heading num="04">障害回復 ― ログとロールフォワード</Heading>
      <p>
        永続性(Durability)と原子性(Atomicity)を支えるのが<Term>ログ(トランザクションログ)</Term>です。DBMSは、更新の前後の値や操作内容をログに記録してから実際のデータを書き換えます。このログがあることで、障害が起きても2方向の回復ができます。
      </p>
      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>使う場面</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ロールバック</td>
            <td>
              コミット前に失敗したトランザクションを、ログを使って更新前の状態へ<strong>戻す</strong>
            </td>
          </tr>
          <tr>
            <td className="hl">ロールフォワード</td>
            <td>
              バックアップ復元後に、コミット済みの更新をログから<strong>再実行</strong>して障害直前まで進める
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        ロールバックは「取り消し(元に戻す)」、ロールフォワードは「やり直し(進める)」と覚えると混同しにくくなります。
      </p>

      <Heading num="05">バックアップ ― 完全・差分・増分</Heading>
      <p>
        ログによる回復と別に、過去のある時点の状態そのものを保存しておくのが<Term>バックアップ</Term>です。取得する範囲によって3方式があります。
      </p>
      <table>
        <thead>
          <tr>
            <th>方式</th>
            <th>取得する範囲</th>
            <th>特徴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">完全バックアップ</td>
            <td>その時点のデータ全体をまるごと</td>
            <td>復元は簡単だが、取得の容量・時間が大きい</td>
          </tr>
          <tr>
            <td className="hl">差分バックアップ</td>
            <td>
              直前の<strong>完全</strong>バックアップからの変更分
            </td>
            <td>復元は「完全＋最新の差分」の2つで済む</td>
          </tr>
          <tr>
            <td className="hl">増分バックアップ</td>
            <td>直前の(方式を問わない)バックアップからの変更分</td>
            <td>取得は軽量だが、復元は完全＋すべての増分を順に適用する</td>
          </tr>
        </tbody>
      </table>
      <p>
        完全バックアップを復元(リストア)したうえで、そこから障害直前までのログを再生(ロールフォワード)すれば、直近の状態まで復旧できます。RAIDによるディスク冗長化やレプリケーションなど、より実務的な物理設計・運用は「<Link href="/database/physical">物理設計と運用</Link>」で詳しく扱います。
      </p>

      <Heading num="06">2相コミット(2PC) ― 複数DBを1つの塊として確定する</Heading>
      <p>
        ここまでの話は、原則として<Term>1つのDBMS</Term>の中でのトランザクションでした。<Term>分散データベース</Term>のように複数のDBにまたがる更新を、1つのACIDトランザクションとして扱う古典的な方式が<Term>2相コミット(Two-Phase Commit, 2PC)</Term>です。試験では「2相コミットメント」という名称で出題されます。
      </p>
      <table>
        <thead>
          <tr>
            <th>フェーズ</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">第1フェーズ(Prepare / 準備)</td>
            <td>
              <Term>コーディネータ</Term>が各参加者(各DB)に「コミットできるか」を問い合わせる。参加者はログを書いたうえで「準備OK(Yes)」か「不可(No)」を返す
            </td>
          </tr>
          <tr>
            <td className="hl">第2フェーズ(Commit / Abort)</td>
            <td>全員がYesならCommit、1人でもNoなら全員にAbort(ロールバック)を指示する</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="database-transaction-2pc-flow"
        aspect="760 / 540"
        caption="2相コミットのシーケンス。第1フェーズでコーディネータが参加者DB1・DB2にPrepareを問い合わせ、各参加者は応答前にログを書き込んだうえでYes(準備OK)を返す。全員がYesだったため、第2フェーズでコーディネータがCommitを指示し、各参加者がACK(確定完了)を返す。1人でもNoを返せば全員にAbortが指示される。"
      />

      <p>
        2PCは「全員がOKなら一斉に確定する」という点で、単一DB内のコミット/ロールバックと考え方が近いです。一方、コーディネータや参加者がネットワーク分断で応答不能になると<Term>ブロッキング</Term>が起き、他の処理が待たされ続けるリスクがあります。
      </p>
      <Aside label="この先">
        マイクロサービスなど、DBが分かれた現代のシステムでは、2PCより<Term>Saga</Term>や<Term>TCC</Term>のような結果整合性を前提にした方式がよく選ばれます。2PCとの違いや使い分けは「<Link href="/database/distributed-transactions">分散トランザクション</Link>」で詳しく扱います。
      </Aside>

      <Heading num="まとめ">一貫性を守る仕組み</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ACIDがトランザクションの品質を定義する</h4>
          <p>原子性・一貫性・独立性・永続性の4つを満たすことで、安全な更新が保証されます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ロックと分離レベルで同時実行を調停する</h4>
          <p>共有・専有ロックで排他し、分離レベルで独立性と並行性のバランスを取ります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ログとバックアップで失わない</h4>
          <p>ロールバック/ロールフォワードとバックアップの組み合わせで、障害から回復します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>2PCは複数DBの古典的な確定方式</h4>
          <p>試験ではPrepare/Commitの2段階を押さえる。実務の分散処理はSaga/TCCへ。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/database/transaction" />
    </DocsPage>
  );
}
