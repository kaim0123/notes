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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "デッドロックと枯渇",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 並行処理</Eyebrow>
        <h1>デッドロックと枯渇 ― 止まって動かなくなる</h1>
        <Lead>
          排他制御を入れた途端に現れるのが、この失敗です。CPUは暇なのに全リクエストがタイムアウトする、特定の処理だけいつまでも順番が回ってこない ―
          エラーも出ずにただ止まるため、原因にたどり着くのに時間がかかります。発生条件は明確に4つ。条件が分かれば、壊し方も決まります。
        </Lead>
      </Hero>

      <Heading num="01">デッドロックとは ― 互いに相手を待つ</Heading>
      <p><Term>デッドロック</Term>は、複数の処理が互いに相手の持つ資源を待ち、<strong>どちらも永久に進めなくなる</strong>状態です。</p>
      <Analogy label="💡 たとえるなら">
        狭い廊下で2人がすれ違おうとして、互いに同じ方向へ避け続ける状況です。ただしデッドロックの場合は、2人とも「相手が動くまで自分は動かない」と決めているため、永遠に解決しません。
      </Analogy>
      <Diagram caption="AはXを持ってYを待ち、BはYを持ってXを待つ ― 循環が閉じる">
        <svg viewBox="0 0 400 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={30} width={110} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={85} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">処理A</text>
          <rect x={260} y={30} width={110} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">処理B</text>
          <rect x={30} y={130} width={110} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={85} y={155} fill="#f2f2f2" fontSize="13" textAnchor="middle">資源X</text>
          <rect x={260} y={130} width={110} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={155} fill="#f2f2f2" fontSize="13" textAnchor="middle">資源Y</text>
          <line x1={85} y1={70} x2={85} y2={130} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={105} fill="#9a9a9a" fontSize="11">保持</text>
          <line x1={140} y1={60} x2={300} y2={130} stroke="#39ff6a" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={200} y={90} fill="#9a9a9a" fontSize="11">待機</text>
          <line x1={315} y1={70} x2={315} y2={130} stroke="#f2f2f2" strokeWidth="1.5" />
          <text x={325} y={105} fill="#9a9a9a" fontSize="11">保持</text>
          <line x1={260} y1={60} x2={110} y2={130} stroke="#f2f2f2" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={150} y={120} fill="#9a9a9a" fontSize="11">待機</text>
        </svg>
      </Diagram>

      <Heading num="02">成立する4条件 ― どれか1つを壊せばよい</Heading>
      <p>デッドロックは、次の4つが<strong>すべて同時に成り立つとき</strong>にのみ発生します(コフマンの条件)。逆に言えば、どれか1つを崩せば原理的に発生しません。</p>
      <table>
        <tbody>
          <tr><th>条件</th><th>内容</th><th>壊し方</th></tr>
          <tr><td className="hl">相互排他</td><td>その資源は同時に1つの処理しか使えない</td><td>そもそも共有しない・不変にする</td></tr>
          <tr><td className="hl">保持と待機</td><td>資源を持ったまま、別の資源を待つ</td><td>必要な資源を最初にまとめて取る</td></tr>
          <tr><td className="hl">横取り不可</td><td>他人が持つ資源を強制的に奪えない</td><td>タイムアウトで自ら手放す</td></tr>
          <tr><td className="hl">循環待ち</td><td>待ちの関係が輪になっている</td><td><strong>取得順序を全体で統一する</strong></td></tr>
        </tbody>
      </table>
      <p>実務で最も費用対効果が高いのは、右下の2つ ― <strong>取得順序の統一</strong>と<strong>タイムアウト</strong>です。</p>

      <Heading num="03">典型パターン① 逆順のロック</Heading>
      <p>最も多いのがこれです。同じ2つの行を、2つの処理が別々の順序で更新します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 送金A→B(トランザクション1)
UPDATE accounts SET balance = balance - 100 WHERE id = 'A';   -- Aを掴む
UPDATE accounts SET balance = balance + 100 WHERE id = 'B';   -- Bを待つ

// 送金B→A(トランザクション2、ほぼ同時)
UPDATE accounts SET balance = balance - 50 WHERE id = 'B';    -- Bを掴む
UPDATE accounts SET balance = balance + 50 WHERE id = 'A';    -- Aを待つ`}</code>
      </pre>
      <p>対策は、更新対象を<strong>常に同じ順序に並べ替えてから</strong>処理することです。口座IDの昇順など、全体で1つのルールを決めます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// どの送金でも「IDが小さい方から」ロックする
const [first, second] = [fromId, toId].sort();
await tx.query("SELECT 1 FROM accounts WHERE id = $1 FOR UPDATE", [first]);
await tx.query("SELECT 1 FROM accounts WHERE id = $1 FOR UPDATE", [second]);`}</code>
      </pre>
      <Aside label="順序はロックだけの話ではない">
        複数のテーブルを更新する処理でも同じです。「注文 → 在庫 → ポイント」の順で更新すると決めたら、全ユースケースでその順を守ります。順序がバラバラなコードベースは、機能が増えるほどデッドロックの確率が上がります。
      </Aside>

      <Heading num="04">典型パターン② コネクションプールの枯渇</Heading>
      <p>デッドロックの一種で、Webアプリで最もよく遭遇するのがこれです。<Link href="/dev/backend/data/pool">コネクションプール</Link>から接続を借りたまま、さらに接続を必要とする処理を呼ぶと発生します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// プールの上限が10のとき
await db.transaction(async (tx) => {   // 接続を1本借りる
  const items = await tx.query("SELECT * FROM order_items WHERE order_id = $1", [id]);

  // 危険 ― プールから「別の接続」を借りようとする
  await Promise.all(items.map((item) => db.query("...", [item.id])));
});`}</code>
      </pre>
      <p>10リクエストが同時にトランザクションを開始すると、10本すべてが使われた状態になります。その全員が「もう1本」を待つため、誰も返却できず、プール待ちのタイムアウトまで全体が固まります。</p>
      <table>
        <tbody>
          <tr><th>症状</th><th>確認するところ</th></tr>
          <tr><td className="hl">CPUもDBも暇なのに全部遅い</td><td>プールの使用中接続数・待ち行列の長さ</td></tr>
          <tr><td className="hl">タイムアウトが一斉に起きる</td><td>プール取得のタイムアウト設定</td></tr>
          <tr><td className="hl">負荷が下がると自然に回復する</td><td>トランザクション内で別接続を使っていないか</td></tr>
        </tbody>
      </table>
      <p>対策は、<strong>トランザクション中はそのトランザクションの接続(<code>tx</code>)だけを使う</strong>ことです。加えて、トランザクションの中で外部APIを呼ばない・重い処理をしない、という原則も効きます。</p>

      <Heading num="05">典型パターン③ 非同期の待ち合わせ</Heading>
      <p>ロックを使わなくても、待ちが循環すれば止まります。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>互いの完了を待つ</h4>
          <p>処理Aが「Bの結果」を、Bが「Aの結果」を待つ。解決されないPromiseを <code>await</code> し続ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ワーカーの自己参照</h4>
          <p>ジョブが「別のジョブの完了」を待ち、そのジョブが同じ(埋まった)ワーカープールに積まれる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>同期呼び出しの循環</h4>
          <p>サービスAがBを、BがCを、CがAを同期的に呼ぶ。スレッド/接続がすべて待ちで埋まる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>再入</h4>
          <p>ロックを持ったまま、同じロックを取りに行く。再入可能でないミューテックスでは即座に停止する。</p>
        </Card>
      </CardGrid>
      <p>マイクロサービス構成の③は<strong>分散デッドロック</strong>と呼ばれ、どこか1か所を見ても原因が分かりません。呼び出しの向きを一方向に保つ(循環依存を作らない)ことが最大の予防策です ― これは<Link href="/design/architecture/sys/microservices">アーキテクチャ設計</Link>の問題でもあります。</p>

      <Heading num="06">ライブロックとスタベーション</Heading>
      <p>「止まって見える」失敗はデッドロックだけではありません。</p>
      <table>
        <tbody>
          <tr><th></th><th>状態</th><th>例</th></tr>
          <tr><td className="hl">デッドロック</td><td>全員が待機したまま何もしない</td><td>互いのロックを待つ2つのトランザクション</td></tr>
          <tr><td className="hl">ライブロック</td><td>全員が動いているが、前に進まない</td><td>衝突を検知して両方が同時に譲り、再試行を繰り返す</td></tr>
          <tr><td className="hl">スタベーション(飢餓)</td><td>一部の処理にだけ順番が回らない</td><td>優先度の高いジョブが流れ続け、低優先度が実行されない</td></tr>
        </tbody>
      </table>
      <p>ライブロックの定番の解決策は、再試行の待ち時間に<strong>ランダムなゆらぎ(ジッター)</strong>を入れることです。全員が同じ間隔で再試行すると、また同時に衝突します。スタベーションには<Link href="/os/process">エージング</Link>(待ち時間に応じて優先度を上げる)や、公平なキューイングが有効です。</p>

      <Heading num="07">予防・検出・回復</Heading>
      <p>デッドロックへの備えは3段構えで考えます。</p>
      <Steps>
        <li><strong>予防</strong> ― 取得順序を統一する。複数ロックを同時に持たない。ロック区間を短くし、中で外部通信をしない</li>
        <li><strong>検出</strong> ― データベースは待ちグラフの循環を自動検出し、片方のトランザクションを強制中断する(PostgreSQLの <code>deadlock_timeout</code> など)</li>
        <li><strong>回復</strong> ― 中断された側は、少し待ってから安全に再試行する。再試行できるよう、トランザクションは冪等に組む</li>
      </Steps>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// デッドロックで中断されたら、ジッター付きで再試行する
for (let attempt = 0; attempt < 3; attempt++) {
  try {
    return await transferMoney(from, to, amount);
  } catch (err) {
    if (err.code !== "40P01") throw err;          // 40P01 = deadlock_detected
    await sleep(50 * 2 ** attempt + Math.random() * 50);
  }
}
throw new Error("再試行しても競合が解消しませんでした");`}</code>
      </pre>
      <p>DBが検出してくれるのは<strong>DB内のロックだけ</strong>です。アプリのミューテックスや分散ロックには検出機構がないため、<strong>必ずタイムアウトを設定</strong>してください。無期限に待つロックは、いつか必ずシステムを止めます。</p>

      <Heading num="08">気付くための監視</Heading>
      <p>デッドロックは例外を出さずに「遅い」としてしか観測されないことがあります。次の指標を見ておくと、原因の切り分けが一気に速くなります。</p>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th></tr>
          <tr><td className="hl">DBのデッドロック検出回数</td><td>増えているなら取得順序かトランザクションが長すぎる</td></tr>
          <tr><td className="hl">ロック待ち時間・待ちセッション数</td><td>特定の行に集中していないか(ホットロウ)</td></tr>
          <tr><td className="hl">コネクションプールの待ち時間</td><td>枯渇の直接的な兆候</td></tr>
          <tr><td className="hl">イベントループの遅延</td><td>Node.jsが詰まっているか(CPUブロックとの切り分け)</td></tr>
          <tr><td className="hl">処理中のまま終わらないジョブ数</td><td>ワーカー側の待ち合わせや再入の疑い</td></tr>
        </tbody>
      </table>
      <p>指標の集め方は「<Link href="/infra/monitoring/app">アプリ監視とビジネスKPI</Link>」を参照してください。</p>

      <Heading num="まとめ">順序を決め、必ず諦める</Heading>
      <p>デッドロックの対策は突き詰めると2つです ― <strong>資源を取る順序を全体で統一すること</strong>、そして<strong>無限に待たないこと(タイムアウトして再試行すること)</strong>。この2つを設計の初期に決めておけば、あとから機能が増えても崩れません。次は、そもそもどの並行モデルを選ぶかという一段上の判断を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/concurrency/models" tag="実装">並行モデル</RelatedLink>
            <RelatedLink href="/dev/backend/data/pool" tag="バックエンド">コネクションプールとN+1</RelatedLink>
            <RelatedLink href="/dev/backend/ops/resilience" tag="バックエンド">タイムアウト・リトライ・遮断</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
