import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "リクエストIDと分散トレーシング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>リクエストIDと分散トレーシング ― 1本の線として追う</h1>
        <Lead>
          <Link href="/backend/express-logging">ログ</Link>を構造化して出せるようになっても、本番のログには<Term>数百人分の行が入り混じって流れています</Term>。「この利用者のこのエラー」に関係する行だけを取り出せなければ、ログは量が多いだけの記録です。ここでは<Term>相関ID</Term>で1本を串刺しにし、さらにサービスをまたぐ<Term>分散トレーシング</Term>へ広げます。
        </Lead>
      </Hero>

      <Heading num="01">ログが役に立たなくなる瞬間</Heading>
      <p>
        問い合わせが来ました。「15時ごろ、注文でエラーが出た」。ログを開くと、毎秒数十行が流れています。
      </p>

      <table>
        <thead>
          <tr><th>困ること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">エラー行は見つかったが、<strong>その手前で何をしていたか</strong>が分からない</td></tr>
          <tr><td className="hl">同時刻の他の利用者の行と混ざり、どれが同じ処理か区別できない</td></tr>
          <tr><td className="hl">サーバーが3台あり、ログが3箇所に分かれている</td></tr>
          <tr><td className="hl">呼び出した別サービスのログと、どう対応するのか分からない</td></tr>
        </tbody>
      </table>

      <p>
        解決は単純です。<Term>1つのリクエストに1つのIDを振り、そのリクエストが出すすべてのログに必ず付ける</Term>。これだけで、IDによる絞り込みが1本の物語を再現します。
      </p>

      <Heading num="02">発行して、持ち回る</Heading>
      <p>
        入口でIDを用意します。すでに上流が付けていればそれを引き継ぎ、無ければ生成します。
      </p>

      <pre>
        <code>{`import { AsyncLocalStorage } from "node:async_hooks";

export const context = new AsyncLocalStorage<{ requestId: string }>();

app.use((req, res, next) => {
  const requestId = req.header("x-request-id") ?? crypto.randomUUID();

  // 応答にも返す ― 問い合わせを受けたときに突き合わせできる
  res.setHeader("x-request-id", requestId);

  // この中で動く非同期処理すべてから参照できる
  context.run({ requestId }, () => next());
});`}</code>
      </pre>

      <p>
        要は<code>AsyncLocalStorage</code>です。<Link href="/language/js-async">非同期</Link>に処理が飛び回るため、「いまどのリクエストの処理中か」は普通の変数では追えません。これは<Term>非同期の呼び出し連鎖をまたいで値を保持する</Term>仕組みで、全関数に識別子を引数で渡さずに済みます。
      </p>

      <pre>
        <code>{`// ロガー側で自動的に差し込む ― 呼び出し側は何も意識しない
export const logger = pino({
  mixin() {
    return { requestId: context.getStore()?.requestId };
  },
});

// アプリのどこで呼んでも requestId が付く
logger.info({ orderId }, "order placed");`}</code>
      </pre>

      <p>
        そして<Term>下流へ伝播させます</Term>。外部を呼ぶときはヘッダーに付け、<Link href="/backend/jobs">ジョブ</Link>を登録するときは内容に含めます。こうすると、非同期処理の先まで同じIDで追えます。
      </p>

      <Heading num="03">観測の3つの柱</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>答える問い</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">指標</td><td><strong>何か起きているか</strong></td><td>集計値。安価。異常の<strong>検知</strong>に使う</td></tr>
          <tr><td className="hl">トレース</td><td><strong>どこが遅い・失敗しているか</strong></td><td>1リクエストの流れ。<strong>切り分け</strong>に使う</td></tr>
          <tr><td className="hl">ログ</td><td><strong>なぜそうなったか</strong></td><td>詳細な事実。高価。<strong>原因究明</strong>に使う</td></tr>
        </tbody>
      </table>

      <p>
        調査は<Term>指標 → トレース → ログ</Term>の順に降りていきます。いきなりログを全文検索するのは、<Term>地図を持たずに探し回る</Term>のに似ています。
      </p>

      <Heading num="04">作業単位に分けて、時間を測る</Heading>
      <p>
        相関IDは「同じリクエストの行を集める」ことしかできません。<Term>どの処理がどれだけ時間を使ったか</Term>を知るには、構造が要ります。
      </p>

      <DiagramFrame
        slug="backend-ops-trace"
        aspect="640 / 320"
        caption="1本のリクエストを構成する作業単位を、横軸を時間として入れ子に並べた図。いちばん上に注文の作成という全体の帯があり、その下に認証・商品の取得・決済サービスの呼び出し・保存が並ぶ。決済サービスの呼び出しだけが他より際立って長く、その中を覗くと別サービス側のデータベース書き込みがほとんどを占めていることが分かる。別のサービスの中で起きていることだが、共通の識別子を引き継いでいるため1本の木として再構成できる。横軸が時間なので、どこが遅いのかを探さずに特定できる。下部には、識別子だけでは同じリクエストの行を集めることしかできず、どこで何秒使ったかを知るにはこの構造が要る、と記されている。"
      />

      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トレース</td><td>1つのリクエスト全体。共通のIDで識別する</td></tr>
          <tr><td className="hl">スパン</td><td>その中の1つの作業単位。開始と終了の時刻を持つ</td></tr>
          <tr><td className="hl">親子関係</td><td>スパンは親を持ち、木構造になる</td></tr>
          <tr><td className="hl">属性</td><td>スパンに付ける情報(メソッド、ステータス、クエリの形)</td></tr>
        </tbody>
      </table>

      <p>
        サービスをまたぐときは、専用のヘッダー(標準規格が定まっています)でトレースのIDと親スパンのIDを伝えます。これにより<Term>複数のサービスにまたがる1本の木</Term>が再構成されます。
      </p>

      <Heading num="05">計装は標準に寄せる</Heading>
      <p>
        <Term>OpenTelemetry</Term>は、この計装を行うためのベンダー中立な標準です。<Term>アプリのコードを特定の監視サービスに縛られないようにする</Term>のが最大の価値で、送信先はあとから設定で変えられます。
      </p>
      <p>
        ありがたいことに、多くの部分は<Term>自動で計装されます</Term>。Webフレームワーク、HTTPクライアント、データベースドライバに自動でフックが入り、コードを書かずにスパンが生成されます。
      </p>

      <pre>
        <code>{`// instrumentation.ts ― アプリより先に読み込む
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

new NodeSDK({
  serviceName: "orders-api",
  instrumentations: [getNodeAutoInstrumentations()],
}).start();`}</code>
      </pre>

      <p>
        業務上の意味がある区切りだけ、手で足します。
      </p>

      <pre>
        <code>{`const tracer = trace.getTracer("orders");

await tracer.startActiveSpan("place-order", async (span) => {
  span.setAttribute("order.item_count", items.length);
  try {
    return await placeOrder.execute(input);
  } catch (err) {
    span.recordException(err);
    span.setStatus({ code: SpanStatusCode.ERROR });
    throw err;
  } finally {
    span.end();   // 忘れると、そのスパンは永遠に閉じない
  }
});`}</code>
      </pre>

      <Aside label="ログとトレースを繋ぐ">
        ログの出力にトレースのIDを含めておくと、<Term>トレース画面から該当ログへ直接飛べます</Term>。「遅いスパンを見つける → その時点のログを読む」という調査が一続きになり、これが3つの柱を組み合わせる最大の効果です。相関IDを自前で持ち回っているなら、トレースのIDに統一してしまうのが簡潔です。
      </Aside>

      <Heading num="06">全部は保存できない</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>問題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開始時に決める</td><td>確率で決める(例: 1%)</td><td><strong>調べたいエラーが記録されていない</strong>ことが多い</td></tr>
          <tr><td className="hl">完了後に決める</td><td>遅いもの・失敗したものを残す</td><td>全部を一旦保持する必要があり、構成が複雑</td></tr>
          <tr><td className="hl">優先度を付ける</td><td>エラーは全部、正常系は1%</td><td><strong>実務での落とし所</strong></td></tr>
        </tbody>
      </table>

      <p>
        判断は<Term>トレース全体で一貫している</Term>必要があります。途中のサービスだけが記録をやめると、木が途切れて役に立ちません。伝播用のヘッダーが、この一貫性を担っています。
      </p>

      <Heading num="07">何を記録し、何を記録しないか</Heading>
      <table>
        <thead>
          <tr><th>記録する</th><th>記録しない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者の内部識別子</td><td>個人情報、メールアドレス、氏名</td></tr>
          <tr><td className="hl">エンドポイント、ステータス、所要時間</td><td>認証トークン、Cookie、パスワード</td></tr>
          <tr><td className="hl">エラーの種別と発生箇所</td><td>リクエスト本文の全体(機密が混ざる)</td></tr>
          <tr><td className="hl">クエリの<strong>形</strong></td><td>クエリの実際のパラメータ</td></tr>
          <tr><td className="hl">件数、サイズ、再試行回数</td><td>決済情報などの機微な値</td></tr>
        </tbody>
      </table>

      <p>
        トレースやログは外部の監視サービスに送られ、社内の多くの人が閲覧できます。<Term>これは外部に送ってよい情報か</Term>を基準に判断してください。
      </p>
      <p>
        あわせて<Term>値の種類の多さ</Term>に注意します。利用者の識別子のように取りうる値が膨大な項目を指標のラベルにすると、データが爆発して監視基盤が壊れます。<Term>種類の多い値はトレースやログへ、少ない値だけを指標へ</Term>が原則です。
      </p>

      <Analogy label="💡 たとえるなら">
        相関IDは宅配便の追跡番号です。番号があれば、いつ集荷され、どの営業所を通り、いま何をしているかが1本の線で分かります。番号が無ければ、各営業所の作業日誌をそれぞれ読み、同じ荷物らしきものを人力で突き合わせることになります。分散トレーシングは、その追跡情報に<Term>各区間の所要時間まで書き込んだ</Term>ものです。「配送が遅い」ではなく「A営業所での仕分けに10時間かかっている」と分かるからこそ、直す場所が決まります。
      </Analogy>

      <Heading num="まとめ">IDで串刺しにし、時間で切り分ける</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず相関ID</h4>
          <p>入口で発行し、非同期をまたいで持ち回り、全ログに付け、下流へ伝播させる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>指標→トレース→ログ</h4>
          <p>検知・切り分け・原因究明で役割が違う。トレースとログをIDで繋ぐ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>送ってよい情報だけ</h4>
          <p>資格情報や個人情報を計装に含めない。種類の多い値は指標に載せない。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでで、判断すべきことは一通り揃いました。次はそれを実際のコードにします ― <Link href="/backend/express">Node.js・Express</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/ops-tracing" />
    </DocsPage>
  );
}
