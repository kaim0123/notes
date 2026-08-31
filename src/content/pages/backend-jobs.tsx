import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ジョブキューとワーカー" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ジョブキューとワーカー ― リクエストの中で全部やらない</h1>
        <Lead>
          <Link href="/backend/express-async">非同期処理</Link>は、1つのリクエストの中で待ち時間を効率よく扱う話でした。ここで扱うのは別の判断です ― <Term>そもそもリクエストの中で完結させない</Term>。動画の変換、大量メールの送信、外部との連携、集計。これらを切り離す構成と、そこで必ず向き合う<Term>冪等性・再試行・順序</Term>の問題を扱います。
        </Lead>
      </Hero>

      <Heading num="01">リクエストの中に置いてはいけない処理</Heading>
      <p>
        HTTPリクエストは<Term>数百ミリ秒で終わることが前提</Term>の仕組みです。途中の機器にもタイムアウトがあり、切れれば処理の結果は宙に浮きます。
      </p>

      <table>
        <thead>
          <tr><th>性質</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">時間がかかる</td><td>動画の変換、帳票の生成、大量データの集計</td></tr>
          <tr><td className="hl">外部に依存する</td><td>メール送信、決済、他社APIの呼び出し</td></tr>
          <tr><td className="hl">失敗したら再試行したい</td><td>一時的な障害で、リクエストごと失敗させたくない処理</td></tr>
          <tr><td className="hl">利用者が結果を待っていない</td><td>通知の配信、検索用の索引更新、ログの集計</td></tr>
          <tr><td className="hl">件数が読めない</td><td>1万人へのお知らせ配信</td></tr>
        </tbody>
      </table>

      <p>
        とくに重要なのは2つ目です。外部の呼び出しをリクエストに含めると、<Term>相手の遅さがそのまま自分の遅さになり、相手の障害が自分の障害になります</Term>。切り離せば、相手が落ちていても「あとで送る」に変わります。
      </p>

      <Heading num="02">受け付けて、あとで処理する</Heading>
      <p>
        構成は単純です。APIは<Term>やることをキューに置くだけ</Term>で応答を返し、別のプロセスがそれを取り出して実行します。
      </p>

      <DiagramFrame
        slug="backend-jobs-at-least-once"
        aspect="640 / 360"
        caption="ジョブが必ず2回実行され得ることを示した図。上段の構成図では、APIがキューにジョブを置いて202を即座に返し、複数のワーカーが取り出して実行する。下段は失敗の場面で、ワーカーがジョブを取り出し、メールを実際に送信し、そして完了を報告する直前に落ちる。キューは完了の報告が来ていないため、まだ終わっていないと判断して同じジョブを別のワーカーに渡し、結果としてメールは2通送られる。保証されるのは最低1回であってちょうど1回ではないため、ジョブは何度実行されても結果が同じになるように書く必要がある。"
      />

      <pre>
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

      <p>
        ここで<Term>APIの形が変わります</Term>。完成物を返す代わりに、<code>202</code>と<Term>進捗を問い合わせる先</Term>を返します。呼ぶ側はそこを見に行くか、<Link href="/frontend/realtime">サーバーからの通知</Link>で完了を受け取ります。「押したら終わる」から「押したら始まる」へ体験そのものが変わるため、画面の設計とセットで決める必要があります。
      </p>

      <Heading num="03">キューの選択肢</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>特徴</th><th>向いている規模</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データベースのテーブル</td><td>専用のテーブルを作り、ロックを飛ばしながら取り出す。<strong>新しい部品が要らない</strong></td><td>小〜中。すでにデータベースがあるなら第一候補</td></tr>
          <tr><td className="hl">インメモリのデータストア</td><td>高速。遅延実行・優先度・進捗通知などの機能が揃う</td><td>中規模。単一システム内</td></tr>
          <tr><td className="hl">マネージドのキュー</td><td>運用が不要で耐久性が高い。失敗の受け皿も標準機能</td><td>大規模、サービス間連携</td></tr>
        </tbody>
      </table>

      <p>
        「まずデータベースのテーブルで作る」は軽視されがちですが優れた選択です。<Term>同じトランザクションでジョブを登録できる</Term>という決定的な利点があり、注文の保存とメール送信ジョブの登録が同時に成功します。外部のキューでは、この同時性は得られません ― 保存は成功したのにジョブ登録に失敗する、あるいはその逆が起こり得ます。
      </p>

      <Heading num="04">最低1回は届く。だから冪等にする</Heading>
      <p>
        キューの世界で最も重要な前提です。ほとんどのキューは<Term>最低1回</Term>の配信を保証します。ちょうど1回ではありません。上の図のとおり、処理を終えた直後に落ちれば、同じジョブがもう一度渡ります。
      </p>
      <p>
        したがって<Term>ジョブは何度実行されても結果が同じ</Term>でなければなりません。
      </p>

      <table>
        <thead>
          <tr><th>処理</th><th>冪等にする方法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レコードの作成</td><td>ジョブIDを一意キーにする。2回目は制約違反として無視する</td></tr>
          <tr><td className="hl">値の加算</td><td>足し算そのものは危険。「この取引IDは適用済みか」を記録してから加算する</td></tr>
          <tr><td className="hl">メール送信</td><td>送信記録を持ち、記録済みなら飛ばす</td></tr>
          <tr><td className="hl">外部の呼び出し</td><td><Term>冪等キー</Term>をヘッダーで渡す(決済APIはたいてい対応している)</td></tr>
          <tr><td className="hl">状態の更新</td><td>「いまこの状態なら」を条件にする。2回目は0件更新で終わる</td></tr>
        </tbody>
      </table>

      <pre>
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

      <Heading num="05">失敗を2種類に分ける</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一時的な失敗</td><td>通信断、相手の一時的な過負荷、デッドロック</td><td><strong>再試行する</strong>。間隔を指数的に空ける</td></tr>
          <tr><td className="hl">恒久的な失敗</td><td>データが不正、対象が削除済み、バグ</td><td><strong>再試行しない</strong>。即座に失敗の受け皿へ</td></tr>
        </tbody>
      </table>

      <p>
        この区別をしないと、絶対に成功しないジョブを永遠に再試行し続ける<Term>毒メッセージ</Term>が生まれます。1件の不正データがキュー全体を詰まらせるのは、典型的な障害の形です。
      </p>
      <p>
        上限に達したジョブは、捨てずに<Term>失敗の受け皿(DLQ)</Term>へ移します。ここは「人間が見るための箱」で、<Term>件数を監視して警報を出す</Term>のが正しい使い方です。原因を直したうえで、戻して再実行できるようにしておきます。
      </p>

      <pre>
        <code>{`await queue.add("send-mail", data, {
  attempts: 5,
  backoff: { type: "exponential", delay: 1000 },  // 1s, 2s, 4s, 8s, 16s
  removeOnComplete: 1000,   // 成功分は溜め込まない
  removeOnFail: false,      // 失敗は残して調査できるようにする
});`}</code>
      </pre>

      <Heading num="06">順序と並列度</Heading>
      <p>
        ワーカーを増やせば速くなりますが、<Term>実行順序は保証されなくなります</Term>。「更新」と「削除」が並行して走り、削除後に更新が適用される、といった逆転が起こり得ます。
      </p>

      <table>
        <thead>
          <tr><th>要件</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">全体の順序が必要</td><td>並列度を1にする。<strong>処理量は犠牲になる</strong></td></tr>
          <tr><td className="hl">特定の単位でだけ順序が必要</td><td>利用者IDなどでまとめ、同じ組は1本で処理する</td></tr>
          <tr><td className="hl">順序が不要</td><td>並列度を上げる。<strong>ほとんどの場合はこれで足りる</strong></td></tr>
          <tr><td className="hl">古い更新を捨てたい</td><td>ジョブに時刻を持たせ、現在値より古ければ無視する</td></tr>
        </tbody>
      </table>

      <p>
        並列度は<Term>下流の限界</Term>から逆算します。ワーカーを50並列にしても、<Link href="/backend/data-pool">接続プール</Link>が10本しかなければそこで詰まりますし、外部の<Link href="/backend/ops-rate-limit">流量制限</Link>を超えれば弾かれます。
      </p>

      <Heading num="07">定期実行は重複起動する</Heading>
      <p>
        「毎晩3時に集計する」にも、分散環境特有の問題があります。<Term>アプリが3台動いていれば、3回起動します</Term>。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アプリ内で時刻を見る</td><td>手軽だが、台数分だけ多重起動する。<strong>排他制御が必須</strong></td></tr>
          <tr><td className="hl">分散ロック</td><td>実行前にロックを取り、取れた1台だけが実行する</td></tr>
          <tr><td className="hl">専用のスケジューラ</td><td>基盤側の仕組みに任せる。<strong>推奨</strong></td></tr>
        </tbody>
      </table>

      <p>
        定期実行のジョブも冪等にしておきます。スケジューラ自体が最低1回の性質を持つことが多く、障害復旧後に同じ時刻の分が再実行されることもあるためです。あわせて<Term>実行されなかったことを検知する</Term>仕組みも入れます ― 静かに止まったバッチは、誰も気づかないまま数週間放置されます。
      </p>

      <Heading num="08">見るべき指標</Heading>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">滞留数</td><td>増え続けていれば、投入速度が処理速度を上回っている</td></tr>
          <tr><td className="hl">最も古いジョブの待ち時間</td><td>滞留数より本質的。「30分前のジョブがまだ処理されていない」</td></tr>
          <tr><td className="hl">失敗の受け皿の件数</td><td><strong>1件でも入ったら警報</strong>にしてよい</td></tr>
          <tr><td className="hl">処理時間の分布</td><td>特定の種類だけが極端に遅くないか</td></tr>
          <tr><td className="hl">ワーカーの生存</td><td>ワーカーが全滅していても、APIは正常に応答し続ける</td></tr>
        </tbody>
      </table>

      <Aside label="ワーカーの停止">
        入れ替えでワーカーを止めるとき、処理中のジョブを途中で殺すと不整合が残ります。停止の合図を受けたら<Term>新しいジョブの取得をやめ、実行中の分が終わるのを待ってから終了</Term>します。詳しくは<Link href="/backend/ops-lifecycle">起動と停止</Link>で扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        バックヤードに置く伝票の束です。客を待たせたまま奥で調理するのではなく、伝票を受け取って番号札を渡し、できたら呼ぶ。混雑すれば調理担当を増やせばよく、伝票そのものは失われません。ただし<Term>伝票が二重に流れてくることは必ずあります</Term> ― だから「この番号はもう作ったか」を確認してから作ります。どうしても作れない伝票は捨てずに別の箱へ入れ、後で人が見る。箱が空でないことに誰も気づかない店は、静かに信用を失います。
      </Analogy>

      <Heading num="まとめ">切り離し、二重実行に備える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>外部依存と長い処理は外へ</h4>
          <p>受け付けだけ返す形に変える。相手の障害が自分の障害でなくなる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>最低1回、が前提</h4>
          <p>ジョブは必ず冪等に書く。一意制約や実行記録で二重実行を弾く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>失敗を分類して受け皿へ</h4>
          <p>一時的なら間隔を空けて再試行、恒久的なら即座に人が見る箱へ。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでで組み立ての骨格が揃いました。次はその下 ― <Link href="/backend/data">データ層</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/jobs" />
    </DocsPage>
  );
}
