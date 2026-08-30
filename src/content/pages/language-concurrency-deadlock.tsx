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
  Steps,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "デッドロックと枯渇",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>デッドロックと枯渇 ― 止まって動かなくなる</h1>
        <Lead>
          排他制御を入れた途端に現れるのが、この失敗です。CPUは暇なのに全リクエストがタイムアウトする、特定の処理だけいつまでも順番が回ってこない ―
          エラーも出ずにただ止まるため、原因にたどり着くのに時間がかかります。発生条件は明確に4つ。条件が分かれば、壊し方も決まります。
        </Lead>
      </Hero>

      <Heading num="01">デッドロックとは ― 互いに相手を待つ</Heading>
      <p>
        <Term>デッドロック</Term>は、複数の処理が互いに相手の持つ資源を待ち、<Term>どちらも永久に進めなくなる</Term>状態です。
      </p>

      <Analogy label="💡 たとえるなら">
        狭い廊下で2人がすれ違おうとして、互いに同じ方向へ避け続ける状況です。ただしデッドロックの場合は、2人とも「相手が動くまで自分は動かない」と決めているため、永遠に解決しません。
      </Analogy>

      <DiagramFrame
        slug="language-concurrency-deadlock-cycle"
        aspect="640 / 300"
        caption="デッドロックが成立する循環と、その壊し方。左は循環が閉じた状態で、処理Aは資源Xを保持したままYを待ち、処理BはYを保持したままXを待つ。待ちの矢印が輪になるため、どちらも永久に進めない。右は取得順序を統一した状態で、どの処理も必ずXを先に取ると決めてある。BもXから取ろうとするため、待ちの関係が一直線になって輪が閉じない。"
      />

      <Heading num="02">成立する4条件 ― どれか1つを壊せばよい</Heading>
      <p>
        デッドロックは、次の4つが<Term>すべて同時に成り立つとき</Term>にのみ発生します。逆に言えば、どれか1つを崩せば原理的に発生しません。
      </p>

      <table>
        <thead>
          <tr>
            <th>条件</th>
            <th>内容</th>
            <th>壊し方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">相互排他</td>
            <td>その資源は同時に1つの処理しか使えない</td>
            <td>そもそも共有しない・不変にする</td>
          </tr>
          <tr>
            <td className="hl">保持と待機</td>
            <td>資源を持ったまま、別の資源を待つ</td>
            <td>必要な資源を最初にまとめて取る</td>
          </tr>
          <tr>
            <td className="hl">横取り不可</td>
            <td>他人が持つ資源を強制的に奪えない</td>
            <td>タイムアウトで自ら手放す</td>
          </tr>
          <tr>
            <td className="hl">循環待ち</td>
            <td>待ちの関係が輪になっている</td>
            <td>取得順序を全体で統一する</td>
          </tr>
        </tbody>
      </table>

      <p>
        実務で最も費用対効果が高いのは、下の2つ ―
        <Term>取得順序の統一</Term>と<Term>タイムアウト</Term>です。
      </p>

      <Heading num="03">典型パターン① 逆順のロック</Heading>
      <p>
        最も多いのがこれです。同じ2つの行を、2つの処理が別々の順序で更新します。
      </p>

      <pre>
        <code>{`-- 送金 A → B(トランザクション1)
UPDATE accounts SET balance = balance - 100 WHERE id = 'A'; -- A を掴む
UPDATE accounts SET balance = balance + 100 WHERE id = 'B'; -- B を待つ

-- 送金 B → A(トランザクション2、ほぼ同時)
UPDATE accounts SET balance = balance -  50 WHERE id = 'B'; -- B を掴む
UPDATE accounts SET balance = balance +  50 WHERE id = 'A'; -- A を待つ`}</code>
      </pre>

      <p>
        対策は、更新対象を<Term>常に同じ順序に並べ替えてから</Term>処理することです。IDの昇順など、全体で1つのルールを決めます。
      </p>

      <pre>
        <code>{`// どの送金でも「IDが小さい方から」ロックする
const [first, second] = [fromId, toId].sort();
await tx.query("SELECT 1 FROM accounts WHERE id = $1 FOR UPDATE", [first]);
await tx.query("SELECT 1 FROM accounts WHERE id = $1 FOR UPDATE", [second]);`}</code>
      </pre>

      <Aside label="順序はロックだけの話ではない">
        複数のテーブルを更新する処理でも同じです。「注文 → 在庫 → ポイント」の順で更新すると決めたら、全ユースケースでその順を守ります。順序がバラバラなコードベースは、機能が増えるほどデッドロックの確率が上がります。
      </Aside>

      <Heading num="04">典型パターン② コネクションプールの枯渇</Heading>
      <p>
        Webアプリで最もよく遭遇するのがこれです。コネクションプールから接続を借りたまま、さらに接続を必要とする処理を呼ぶと発生します。
      </p>

      <pre>
        <code>{`// プールの上限が10のとき
await db.transaction(async (tx) => {   // 接続を1本借りる
  const items = await tx.query("SELECT * FROM order_items WHERE order_id = $1", [id]);
  // 危険 ― プールから「別の接続」を借りようとする
  await Promise.all(items.map((item) => db.query("...", [item.id])));
});`}</code>
      </pre>

      <p>
        10リクエストが同時にトランザクションを開始すると、10本すべてが使われた状態になります。その全員が「もう1本」を待つため、誰も返却できず、プール待ちのタイムアウトまで全体が固まります。
      </p>

      <table>
        <thead>
          <tr>
            <th>症状</th>
            <th>確認するところ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">CPUもDBも暇なのに全部遅い</td>
            <td>プールの使用中接続数・待ち行列の長さ</td>
          </tr>
          <tr>
            <td className="hl">タイムアウトが一斉に起きる</td>
            <td>プール取得のタイムアウト設定</td>
          </tr>
          <tr>
            <td className="hl">負荷が下がると自然に回復する</td>
            <td>トランザクション内で別接続を使っていないか</td>
          </tr>
        </tbody>
      </table>

      <p>
        対策は、<Term>トランザクション中はそのトランザクションの接続だけを使う</Term>ことです。加えて、トランザクションの中で外部APIを呼ばない・重い処理をしない、という原則も効きます。
      </p>

      <Heading num="05">典型パターン③ 非同期の待ち合わせ</Heading>
      <p>ロックを使わなくても、待ちが循環すれば止まります。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>互いの完了を待つ</h4>
          <p>
            AがBの結果を、BがAの結果を待つ。解決されないPromiseを<code>await</code>し続けます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ワーカーの自己参照</h4>
          <p>
            ジョブが別のジョブの完了を待ち、そのジョブが同じ(埋まった)プールに積まれます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>同期呼び出しの循環</h4>
          <p>
            AがBを、BがCを、CがAを同期的に呼ぶ。接続がすべて待ちで埋まります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>再入</h4>
          <p>
            ロックを持ったまま同じロックを取りに行く。再入可能でなければ即座に停止します。
          </p>
        </Card>
      </CardGrid>

      <p>
        サービスをまたぐ③は<Term>分散デッドロック</Term>と呼ばれ、どこか1か所を見ても原因が分かりません。呼び出しの向きを一方向に保つ(循環依存を作らない)ことが最大の予防策で、これは<Link href="/design/architecture-microservices">アーキテクチャ設計</Link>の問題でもあります。
      </p>

      <Heading num="06">ライブロックとスタベーション</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>状態</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">デッドロック</td>
            <td>全員が待機したまま何もしない</td>
            <td>互いのロックを待つ2つのトランザクション</td>
          </tr>
          <tr>
            <td className="hl">ライブロック</td>
            <td>全員が動いているが、前に進まない</td>
            <td>衝突を検知して両方が同時に譲り、再試行を繰り返す</td>
          </tr>
          <tr>
            <td className="hl">スタベーション</td>
            <td>一部の処理にだけ順番が回らない</td>
            <td>優先度の高いジョブが流れ続け、低優先度が実行されない</td>
          </tr>
        </tbody>
      </table>

      <p>
        ライブロックの定番の解決策は、再試行の待ち時間に<Term>ランダムなゆらぎ(ジッター)</Term>を入れることです。全員が同じ間隔で再試行すると、また同時に衝突します。スタベーションには<Link href="/computer/os-process">エージング</Link>(待ち時間に応じて優先度を上げる)や、公平なキューイングが有効です。
      </p>

      <Heading num="07">予防・検出・回復</Heading>

      <Steps>
        <li>
          予防 ― 取得順序を統一する。複数ロックを同時に持たない。ロック区間を短くする
        </li>
        <li>
          検出 ― データベースは待ちグラフの循環を自動検出し、片方を強制中断する
        </li>
        <li>
          回復 ― 中断された側は少し待ってから安全に再試行する。そのため冪等に組む
        </li>
      </Steps>

      <pre>
        <code>{`// デッドロックで中断されたら、ジッター付きで再試行する
for (let attempt = 0; attempt < 3; attempt++) {
  try {
    return await transferMoney(from, to, amount);
  } catch (err) {
    if (err.code !== "40P01") throw err; // 40P01 = deadlock_detected
    await sleep(50 * 2 ** attempt + Math.random() * 50);
  }
}
throw new Error("再試行しても競合が解消しませんでした");`}</code>
      </pre>

      <p>
        DBが検出してくれるのは<Term>DB内のロックだけ</Term>です。アプリのミューテックスや分散ロックには検出機構がないため、<Term>必ずタイムアウトを設定</Term>してください。無期限に待つロックは、いつか必ずシステムを止めます。
      </p>

      <Heading num="08">気付くための監視</Heading>

      <table>
        <thead>
          <tr>
            <th>指標</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">DBのデッドロック検出回数</td>
            <td>増えているなら取得順序かトランザクションが長すぎる</td>
          </tr>
          <tr>
            <td className="hl">ロック待ち時間・待ちセッション数</td>
            <td>特定の行に集中していないか</td>
          </tr>
          <tr>
            <td className="hl">コネクションプールの待ち時間</td>
            <td>枯渇の直接的な兆候</td>
          </tr>
          <tr>
            <td className="hl">イベントループの遅延</td>
            <td>詰まっているのがCPUか待ちかの切り分けに使える</td>
          </tr>
          <tr>
            <td className="hl">処理中のまま終わらないジョブ数</td>
            <td>ワーカー側の待ち合わせや再入の疑い</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">順序を決め、必ず諦める</Heading>
      <p>
        対策は突き詰めると2つです ―
        <Term>資源を取る順序を全体で統一すること</Term>、そして<Term>無限に待たないこと</Term>。この2つを設計の初期に決めておけば、あとから機能が増えても崩れません。次は、そもそもどの<Link href="/language/concurrency-models">並行モデル</Link>を選ぶかという一段上の判断を見ていきます。
      </p>

      <DocsFooter href="/language/concurrency-deadlock" />
    </DocsPage>
  );
}
