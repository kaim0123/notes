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
  title: "ジョブキューとワーカー",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 非同期処理</Eyebrow>
        <h1>ジョブキューとワーカー ― リクエストの中で全部やらない</h1>
        <Lead>
          <Link href="/dev/backend/express/async">非同期処理</Link>では、1つのリクエストの中で待ち時間を効率よく扱う方法を見ました。ここで扱うのは別の話です ― <strong>そもそもリクエストの中で完結させない</strong>という判断。動画の変換、大量メールの送信、外部APIとの連携、集計バッチ。これらをリクエストから切り離してワーカーに委ねる構成と、そこで必ず向き合うことになる<Term>冪等性</Term>・<Term>再試行</Term>・<Term>順序</Term>の問題を扱います。
        </Lead>
      </Hero>

      <Heading num="01">リクエストの中に置いてはいけない処理</Heading>
      <p>HTTPリクエストは、<strong>数百ミリ秒で終わることが前提</strong>の仕組みです。ブラウザにもロードバランサにもタイムアウトがあり、途中で切れれば処理の結果は宙に浮きます。次のような処理は、リクエストの外に出す候補です。</p>
      <table>
        <thead>
          <tr><th>性質</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">時間がかかる</td><td>動画の変換、PDF生成、大量データの集計・エクスポート</td></tr>
          <tr><td className="hl">外部に依存する</td><td>メール送信、決済、他社APIの呼び出し ― <strong>相手の遅さが自分の遅さになる</strong></td></tr>
          <tr><td className="hl">失敗したら再試行したい</td><td>一時的な障害でリクエストごと失敗させたくない処理</td></tr>
          <tr><td className="hl">利用者が結果を待っていない</td><td>通知の配信、検索インデックスの更新、ログの集計</td></tr>
          <tr><td className="hl">件数が読めない</td><td>1万人へのお知らせ配信(1件でも1万件でも同じコードで動く必要がある)</td></tr>
        </tbody>
      </table>
      <p>特に重要なのは<strong>「外部に依存する」</strong>です。<Link href="/dev/backend/data/transaction">トランザクション境界</Link>で見たとおり、外部呼び出しをリクエストの処理に含めると、相手の障害がそのまま自分のAPIの障害になります。切り離せば、相手が落ちていても「あとで送る」に変わります。</p>

      <Heading num="02">基本形 ― 受け付けて、あとで処理する</Heading>
      <p>構成は単純です。APIは<strong>「やること」をキューに置くだけ</strong>で応答を返し、別プロセスの<Term>ワーカー</Term>がそれを取り出して実行します。</p>
      <Diagram caption="APIは受付だけを行い、実処理はワーカーが担う">
        <svg viewBox="0 0 540 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={15} y={45} width={110} height={55} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={40} y={70} fill="#f2f2f2" fontSize="12">API</text>
          <text x={26} y={88} fill="#9a9a9a" fontSize="10">202 を即返す</text>

          <rect x={195} y={45} width="150" height={55} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={240} y={70} fill="#f2f2f2" fontSize="12">Queue</text>
          <text x={210} y={88} fill="#9a9a9a" fontSize="10">順番に溜めておく</text>

          <rect x={415} y={20} width={110} height={45} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={440} y={47} fill="#f2f2f2" fontSize="12">Worker 1</text>
          <rect x={415} y={80} width={110} height={45} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={440} y={107} fill="#f2f2f2" fontSize="12">Worker 2</text>

          <path d="M125 72 l62 0" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M187 72 l-8 -4 v8 z" fill="#5f5f5f" />
          <path d="M345 62 l62 -18" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M407 44 l-8 0 l4 8 z" fill="#5f5f5f" />
          <path d="M345 82 l62 18" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M407 100 l-8 0 l4 -8 z" fill="#5f5f5f" />

          <text x={15} y={135} fill="#6a6a6a" fontSize="10">ワーカーを増やせば処理能力が上がる。溜まっても失われない</text>
        </svg>
      </Diagram>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// API側 ― 受け付けたことだけを返す
router.post("/reports", async (req, res) => {
  const input = CreateReportSchema.parse(req.body);
  const job = await reportQueue.add("generate", input);

  // 202 Accepted = 「受け付けたが、まだ終わっていない」
  res.status(202).json({
    jobId: job.id,
    statusUrl: \`/reports/\${job.id}\`,
  });
});`}</code>
      </pre>
      <p>ここで<strong>API設計が変わる</strong>ことに注意が必要です。<code>201 Created</code>で完成物を返す代わりに、<code>202 Accepted</code>と<strong>進捗を問い合わせる先</strong>を返します。クライアントは、その URL をポーリングするか、<Link href="/dev/frontend/realtime">SSE</Link>や通知で完了を受け取ります。「押したら終わる」から「押したら始まる」へ、体験そのものが変わるため、UIの設計とセットで決める必要があります。</p>

      <Heading num="03">キューの選択肢</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>特徴</th><th>向いている規模</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DBのテーブル</td><td><code>jobs</code>テーブルを作り<code>SELECT ... FOR UPDATE SKIP LOCKED</code>で取り出す。<strong>新しい部品が要らない</strong></td><td>小〜中。既にDBがあるなら第一候補</td></tr>
          <tr><td className="hl">Redis(BullMQ等)</td><td>高速。遅延実行・優先度・進捗通知などの機能が揃う</td><td>中規模。単一システム内</td></tr>
          <tr><td className="hl">マネージド(<Link href="/cloud/aws/integration/sqs">SQS</Link> / <Link href="/cloud/gcp/integration/pubsub">Pub/Sub</Link>)</td><td>運用が不要で耐久性が高い。DLQも標準機能</td><td>大規模、サービス間連携</td></tr>
        </tbody>
      </table>
      <p>「まずDBのテーブルで作る」は、軽視されがちですが優れた選択です。<Link href="/dev/backend/data/transaction">同じトランザクションでジョブを登録できる</Link>という決定的な利点があり、これがOutboxパターンの実体です ― 注文の保存とメール送信ジョブの登録が、原子的に成功します。Redisや外部キューでは、この原子性は得られません。</p>

      <Heading num="04">最低1回は届く ― だから冪等にする</Heading>
      <p>キューの世界で最も重要な前提がこれです。ほとんどのキューは<Term>at-least-once(最低1回)</Term>配信を保証します。<strong>「ちょうど1回」ではありません。</strong></p>
      <p>ワーカーが処理を終えた直後、完了を報告する前に落ちたとします。キューは「まだ終わっていない」と判断し、同じジョブを別のワーカーに渡します ― 処理は2回実行されます。ネットワークの遅延、可視性タイムアウトの超過でも同じことが起きます。</p>
      <p>したがって、<strong>ジョブは何度実行されても結果が同じ(<Term>冪等</Term>)でなければなりません</strong>。</p>
      <table>
        <thead>
          <tr><th>処理</th><th>冪等にする方法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レコードの作成</td><td>ジョブIDを一意キーにする。2回目は一意制約違反として無視する</td></tr>
          <tr><td className="hl">値の加算</td><td><code>balance = balance + 100</code>は危険。「この取引IDは適用済みか」を記録してから加算する</td></tr>
          <tr><td className="hl">メール送信</td><td>送信記録テーブルを持ち、記録済みならスキップする</td></tr>
          <tr><td className="hl">外部API呼び出し</td><td><Term>冪等キー</Term>をヘッダーで渡す(決済APIは大抵対応している)</td></tr>
          <tr><td className="hl">状態の更新</td><td><code>WHERE status = &apos;pending&apos;</code>を条件にする。2回目は0件更新で終わる</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`async function handleSendReceipt(job: Job<{ orderId: string }>) {
  // 「このジョブは処理済みか」を先に記録し、一意制約で二重実行を弾く
  const inserted = await db.query(
    "INSERT INTO job_executions (job_id) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id",
    [job.id],
  );
  if (inserted.rowCount === 0) return;   // すでに処理済み

  await mailer.sendReceipt(job.data.orderId);
}`}</code>
      </pre>

      <Heading num="05">再試行 ― バックオフとDLQ</Heading>
      <p>ジョブの失敗には2種類あり、区別して扱います。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一時的な失敗</td><td>ネットワーク断、相手の503、DBのデッドロック</td><td><strong>再試行する</strong>。指数バックオフで間隔を空ける</td></tr>
          <tr><td className="hl">恒久的な失敗</td><td>データが不正、対象が削除済み、バグ</td><td><strong>再試行しない</strong>。即座にDLQへ送る</td></tr>
        </tbody>
      </table>
      <p>この区別をしないと、絶対に成功しないジョブを永遠に再試行し続ける<Term>毒メッセージ</Term>が生まれます。1件のバグデータがキュー全体を詰まらせるのは、典型的な障害パターンです。</p>
      <p>再試行の上限に達したジョブは、捨てずに<Term>DLQ(Dead Letter Queue)</Term>へ移します。DLQは「人間が見るための箱」で、<strong>件数を監視してアラートを出す</strong>のが正しい使い方です。原因を直したうえで、DLQから戻して再実行できるようにしておきます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`await queue.add("send-mail", data, {
  attempts: 5,
  backoff: { type: "exponential", delay: 1000 },  // 1s, 2s, 4s, 8s, 16s
  removeOnComplete: 1000,   // 成功分は溜め込まない
  removeOnFail: false,      // 失敗は残して調査できるようにする
});`}</code>
      </pre>

      <Heading num="06">順序と並列度</Heading>
      <p>ワーカーを増やせば処理は速くなりますが、<strong>実行順序は保証されなくなります</strong>。「更新」と「削除」が並行して走り、削除後に更新が適用される、といった逆転が起こり得ます。</p>
      <table>
        <thead>
          <tr><th>要件</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">全体の順序が必要</td><td>並列度を1にする。<strong>スループットは犠牲になる</strong></td></tr>
          <tr><td className="hl">特定の単位でだけ順序が必要</td><td>ユーザーIDなどでグループ化し、同一グループは1本で処理する(FIFOキューのグループID)</td></tr>
          <tr><td className="hl">順序が不要</td><td>並列度を上げる。<strong>ほとんどの場合はこれで足りる</strong></td></tr>
          <tr><td className="hl">古い更新を捨てたい</td><td>ジョブにタイムスタンプを持たせ、現在値より古ければ無視する</td></tr>
        </tbody>
      </table>
      <p>並列度を決めるときは、<strong>下流の限界</strong>から逆算します。ワーカーを50並列にしても、<Link href="/dev/backend/data/pool">DBの接続プール</Link>が10本しかなければそこで詰まりますし、外部APIのレート制限を超えれば弾かれます。</p>

      <Heading num="07">定期実行 ― cronと重複起動</Heading>
      <p>「毎晩3時に集計する」ような定期実行にも、分散環境特有の問題があります。<strong>アプリが3台動いていれば、cronは3回起動します。</strong></p>
      <table>
        <thead>
          <tr><th>方式</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アプリ内スケジューラ</td><td>手軽だが、台数分だけ多重起動する。<strong>排他制御が必須</strong></td></tr>
          <tr><td className="hl">分散ロック</td><td>実行前にロックを取り、取れた1台だけが実行する</td></tr>
          <tr><td className="hl">専用のスケジューラ</td><td>EventBridge Scheduler、Cloud Scheduler、Kubernetes CronJob など。<strong>推奨</strong></td></tr>
        </tbody>
      </table>
      <p>定期実行のジョブも冪等にしておきます。スケジューラ自体が「最低1回」の性質を持つことが多く、また障害復旧後に同じ時刻の分が再実行されることもあるためです。あわせて、<strong>実行されなかったこと</strong>を検知する仕組み(一定時間内に完了記録が無ければ通知する)も入れておきます ― 静かに止まったバッチは、誰も気付かないまま数週間放置されます。</p>

      <Heading num="08">監視 ― 見るべき指標</Heading>
      <p>キューは「見えないところで動く」ため、監視が無ければ壊れていることに気付けません。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">キューの滞留数</td><td>増え続けていれば、投入速度が処理速度を上回っている</td></tr>
          <tr><td className="hl">最古のジョブの待ち時間</td><td>滞留数より本質的。「30分前のジョブがまだ処理されていない」</td></tr>
          <tr><td className="hl">DLQの件数</td><td><strong>1件でも入ったらアラート</strong>にしてよい</td></tr>
          <tr><td className="hl">処理時間の分布</td><td>特定のジョブだけが極端に遅くないか</td></tr>
          <tr><td className="hl">ワーカーの生存</td><td>ワーカーが全滅していても、APIは正常に応答し続ける</td></tr>
        </tbody>
      </table>
      <Aside label="ワーカーの停止">
        デプロイでワーカーを止めるとき、処理中のジョブを途中で殺すと不整合が残ります。停止シグナルを受けたら<strong>新しいジョブの取得をやめ、実行中の分が終わるのを待ってから終了</strong>します。詳しくは<Link href="/dev/backend/ops/lifecycle">起動と停止</Link>で扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        ジョブキューは、店のバックヤードに置く伝票の束です。客(リクエスト)を待たせたまま奥で調理するのではなく、伝票を受け取って番号札を渡し、できたら呼ぶ。混雑すれば調理担当(ワーカー)を増やせばよく、伝票そのものは失われません。ただし、伝票が二重に流れてくることは<strong>必ずあります</strong> ― だから「この伝票番号はもう作ったか」を確認してから作る習慣が要ります。そして、どうしても作れない伝票は捨てずに別の箱(DLQ)へ入れ、店長が後で見る。箱が空でないことに誰も気付かない店は、静かに信用を失います。
      </Analogy>

      <Heading num="まとめ">切り離し、二重実行に備える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>外部依存と長い処理は外へ</h4><p>202 Acceptedで受け付け、進捗を問い合わせる形に。相手の障害が自分の障害でなくなる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>最低1回、が前提</h4><p>ジョブは必ず冪等に書く。一意制約や実行記録で二重実行を弾く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>失敗を分類してDLQへ</h4><p>一時的なら指数バックオフ、恒久的なら即DLQ。DLQの件数は監視対象。</p></Card>
      </CardGrid>
      <p>次は、同じく「毎回やらない」ための仕組みである<Link href="/dev/backend/cache">サーバーサイドキャッシュ</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/cloud/aws/integration/sqs" tag="クラウド">SQS</RelatedLink>
            <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
            <RelatedLink href="/dev/backend/data/transaction" tag="バックエンド">トランザクション境界</RelatedLink>
            <RelatedLink href="/dev/concurrency/patterns" tag="実装">並行処理の実装パターン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
