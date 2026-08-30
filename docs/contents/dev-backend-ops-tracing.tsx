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
  title: "リクエストIDと分散トレーシング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>リクエストIDと分散トレーシング ― 1本の線として追う</h1>
        <Lead>
          <Link href="/dev/backend/express/logging">ログ</Link>で構造化ログを出せるようになりました。しかし本番のログには、<strong>数百人分のリクエストの行が入り混じって流れています</strong>。「この利用者のこのエラー」に関係する行だけを取り出せなければ、ログは量が多いだけの記録です。ここでは<Term>相関ID</Term>で1リクエストを串刺しにし、さらにサービスをまたぐ<Term>分散トレーシング</Term>へ広げていきます。
        </Lead>
      </Hero>

      <Heading num="01">ログが役に立たなくなる瞬間</Heading>
      <p>問い合わせが来ました。「15時ごろ、注文でエラーが出た」。ログを開くと、毎秒数十行が流れています。</p>
      <table>
        <thead>
          <tr><th>困ること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">エラー行は見つかったが、<strong>その手前に何をしていたのか</strong>が分からない</td></tr>
          <tr><td className="hl">同時刻の他の利用者の行と混ざり、どれが同じ処理か区別できない</td></tr>
          <tr><td className="hl">サーバーが3台あり、ログが3箇所に分かれている</td></tr>
          <tr><td className="hl">APIから呼ばれた別サービスのログと、どう対応するのか分からない</td></tr>
        </tbody>
      </table>
      <p>解決は単純です。<strong>1つのリクエストに1つのIDを振り、そのリクエストが出力するすべてのログに必ず付ける。</strong>これだけで、IDによる絞り込みが「1本の物語」を再現します。</p>

      <Heading num="02">相関IDを発行し、持ち回る</Heading>
      <p>入口のミドルウェアでIDを用意します。すでに上流(ロードバランサ、フロントエンド、別サービス)が付けていればそれを引き継ぎ、無ければ生成します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { AsyncLocalStorage } from "node:async_hooks";

export const context = new AsyncLocalStorage<{ requestId: string }>();

app.use((req, res, next) => {
  const requestId = req.header("x-request-id") ?? crypto.randomUUID();

  // 応答にも返す ― 利用者からの問い合わせ時に突き合わせできる
  res.setHeader("x-request-id", requestId);

  // この中で動く非同期処理すべてから参照できる
  context.run({ requestId }, () => next());
});`}</code>
      </pre>
      <p>ここで使っている<code>AsyncLocalStorage</code>が要です。Node.jsは<Link href="/dev/language/async">非同期</Link>に処理が飛び回るため、「いまどのリクエストの処理中か」は普通の変数では追えません。<code>AsyncLocalStorage</code>は<strong>非同期の呼び出し連鎖をまたいで値を保持する</strong>仕組みで、これにより全関数に<code>requestId</code>を引数で渡す必要がなくなります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ロガー側で自動的に差し込む ― 呼び出し側は何も意識しない
export const logger = pino({
  mixin() {
    return { requestId: context.getStore()?.requestId };
  },
});

// アプリのどこで呼んでも requestId が付く
logger.info({ orderId }, "order placed");`}</code>
      </pre>
      <p>そして<strong>下流へ伝播させます</strong>。外部APIを呼ぶときは<code>x-request-id</code>をヘッダーに付け、<Link href="/dev/backend/jobs">ジョブ</Link>を登録するときはペイロードに含めます。こうすると、非同期処理の先まで同じIDで追えます。</p>

      <Heading num="03">3つの柱 ― ログ・メトリクス・トレース</Heading>
      <p>相関IDの先を理解するために、観測手段の全体像を整理します。<Term>オブザーバビリティ</Term>は、性質の違う3種類のデータで構成されます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>答える問い</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メトリクス</td><td><strong>何か起きているか?</strong> エラー率、レイテンシ、スループット</td><td>集計値。安価。異常の<strong>検知</strong>に使う</td></tr>
          <tr><td className="hl">トレース</td><td><strong>どこが遅い・失敗しているか?</strong></td><td>1リクエストの流れ。<strong>切り分け</strong>に使う</td></tr>
          <tr><td className="hl">ログ</td><td><strong>なぜそうなったか?</strong></td><td>詳細な事実。高価。<strong>原因究明</strong>に使う</td></tr>
        </tbody>
      </table>
      <p>調査は<strong>メトリクス → トレース → ログ</strong>の順に降りていきます。いきなりログを全文検索するのは、地図を持たずに探し回るのに似ています。詳しくは<Link href="/infra/monitoring/app">アプリケーション監視</Link>で扱います。</p>

      <Heading num="04">分散トレーシング ― トレースとスパン</Heading>
      <p>相関IDは「同じリクエストの行を集める」ことしかできません。<strong>どの処理がどれだけ時間を使ったか</strong>を知るには、構造が要ります。それが<Term>スパン</Term>です。</p>
      <Diagram caption="1つのトレースは、入れ子になったスパンの木構造">
        <svg viewBox="0 0 540 175" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={490} height={22} rx="4" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={30} y={36} fill="#f2f2f2" fontSize="11">POST /orders  (820ms)</text>

          <rect x={45} y={52} width={120} height={22} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={54} y={68} fill="#9a9a9a" fontSize="10">auth  (12ms)</text>

          <rect x={170} y={52} width={200} height={22} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={179} y={68} fill="#9a9a9a" fontSize="10">db: select products (60ms)</text>

          <rect x={170} y={82} width={300} height={22} rx="4" fill="none" stroke="#ffb43c" />
          <text x={179} y={98} fill="#ffb43c" fontSize="10">http: payment-service  (640ms) ← ここが遅い</text>

          <rect x={195} y={112} width={250} height={22} rx="4" fill="none" stroke="#5f5f5f" strokeDasharray="3 3" />
          <text x={204} y={128} fill="#6a6a6a" fontSize="10">(別サービス側のスパン) db: charge (610ms)</text>

          <rect x={470} y={52} width={40} height={22} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={476} y={68} fill="#9a9a9a" fontSize="10">save</text>

          <text x={20} y={162} fill="#6a6a6a" fontSize="10">横軸が時間。入れ子と長さが一目で分かるため、遅い箇所の特定が即座にできる</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トレース</td><td>1つのリクエスト全体。<code>trace_id</code>で識別する</td></tr>
          <tr><td className="hl">スパン</td><td>その中の1つの作業単位(DBクエリ、外部呼び出し、関数)。開始・終了時刻を持つ</td></tr>
          <tr><td className="hl">親子関係</td><td>スパンは親スパンを持ち、木構造になる</td></tr>
          <tr><td className="hl">属性</td><td>スパンに付ける情報(HTTPメソッド、ステータス、SQL文)</td></tr>
        </tbody>
      </table>
      <p>サービスをまたぐときは、<code>traceparent</code>というヘッダー(<Term>W3C Trace Context</Term>という標準規格)で<code>trace_id</code>と親スパンのIDを伝えます。これにより、<strong>複数のサービスにまたがる1本の木</strong>が再構成されます。</p>

      <Heading num="05">OpenTelemetry ― 計装の標準</Heading>
      <p><Term>OpenTelemetry(OTel)</Term>は、この計装を行うためのベンダー中立な標準です。<strong>アプリのコードを特定の監視SaaSに縛られないようにする</strong>のが最大の価値で、送信先はあとから設定で変えられます。</p>
      <p>ありがたいことに、多くの部分は<strong>自動計装</strong>で済みます。ExpressやHTTPクライアント、DBドライバに自動でフックが入り、コードを書かずにスパンが生成されます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// instrumentation.ts ― アプリより先に読み込む
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

new NodeSDK({
  serviceName: "orders-api",
  instrumentations: [getNodeAutoInstrumentations()],
}).start();`}</code>
      </pre>
      <p>業務上の意味がある区切りだけ、手動でスパンを足します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
        ログの出力に<code>trace_id</code>と<code>span_id</code>を含めておくと、<strong>トレース画面から該当ログへ直接飛べます</strong>。「遅いスパンを見つける → その時点のログを読む」という調査が一続きになり、これが3つの柱を組み合わせる最大の効果です。相関IDを自前で持ち回っているなら、<code>trace_id</code>に統一してしまうのが簡潔です。
      </Aside>

      <Heading num="06">サンプリング ― 全部は保存できない</Heading>
      <p>全リクエストのトレースを保存すると、データ量と費用が現実的でなくなります。そこで一部だけを記録します。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>問題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ヘッドサンプリング</td><td>開始時に確率で決める(例: 1%)</td><td><strong>調べたいエラーが記録されていない</strong>ことが多い</td></tr>
          <tr><td className="hl">テールサンプリング</td><td>完了後に判断し、遅いもの・失敗したものを残す</td><td>全スパンを一旦保持する必要があり、構成が複雑</td></tr>
          <tr><td className="hl">優先度付き</td><td>エラーは100%、正常系は1%</td><td><strong>実務での落とし所</strong></td></tr>
        </tbody>
      </table>
      <p>サンプリングの判断は<strong>トレース全体で一貫している</strong>必要があります。途中のサービスだけが記録をやめると、木が途切れて役に立ちません。<code>traceparent</code>のサンプリングフラグが、この一貫性を担っています。</p>

      <Heading num="07">何を記録し、何を記録しないか</Heading>
      <table>
        <thead>
          <tr><th>記録する</th><th>記録しない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者ID(内部の識別子)</td><td>個人情報、メールアドレス、氏名</td></tr>
          <tr><td className="hl">エンドポイント、ステータス、所要時間</td><td>認証トークン、Cookie、パスワード</td></tr>
          <tr><td className="hl">エラーの種別とスタックトレース</td><td>リクエストボディ全体(機密が混ざる)</td></tr>
          <tr><td className="hl">SQLの<strong>形</strong>(パラメータは伏せる)</td><td>SQLの実パラメータ</td></tr>
          <tr><td className="hl">件数、サイズ、再試行回数</td><td>クレジットカード番号などの機微情報</td></tr>
        </tbody>
      </table>
      <p>トレースやログは監視SaaSに送られ、社内の多くの人が閲覧できます。<strong>「これは外部に送ってよい情報か」</strong>を基準に判断してください。詳細は<Link href="/security/logging">ログ出力設計</Link>のマスキングと同じ考え方です。</p>
      <p>あわせて、<strong>カーディナリティ</strong>に注意します。利用者IDのように値の種類が膨大な項目をメトリクスのラベルにすると、時系列データが爆発して監視基盤が壊れます。<strong>高カーディナリティな値はトレースやログへ、低カーディナリティな値だけをメトリクスへ</strong>が原則です。</p>

      <Analogy label="💡 たとえるなら">
        相関IDは、宅配便の追跡番号です。番号があれば、いつ集荷され、どの営業所を通り、いま何をしているかが1本の線で分かります。番号が無ければ、各営業所の作業日誌をそれぞれ読み、同じ荷物らしきものを人力で突き合わせることになります。そして分散トレーシングは、その追跡情報に<strong>各区間の所要時間まで書き込んだ</strong>ものです。「配送が遅い」ではなく「A営業所での仕分けに10時間かかっている」と分かるからこそ、直す場所が決まります。
      </Analogy>

      <Heading num="まとめ">IDで串刺しにし、時間で切り分ける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>まず相関ID</h4><p>入口で発行し、AsyncLocalStorageで持ち回り、全ログに付け、下流へ伝播させる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メトリクス→トレース→ログ</h4><p>検知・切り分け・原因究明で役割が違う。トレースとログをIDで繋ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>送ってよい情報だけ</h4><p>トークンや個人情報を計装に含めない。高カーディナリティはメトリクスに載せない。</p></Card>
      </CardGrid>
      <p>次は、これらすべてが動く土台であるNode.js自体の性質を見ます。<Link href="/dev/backend/node">Node.jsの運用特性</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/monitoring/app" tag="インフラ">アプリケーション監視</RelatedLink>
            <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
            <RelatedLink href="/dev/backend/express/logging" tag="バックエンド">ログ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
