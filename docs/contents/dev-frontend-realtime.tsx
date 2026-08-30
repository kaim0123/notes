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
  title: "リアルタイム通信",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>リアルタイム通信 ― サーバーから届く更新を受け取る</h1>
        <Lead>
          <Link href="/dev/frontend/http">HTTP通信</Link>は「クライアントが訊いて、サーバーが答える」1往復のモデルです。しかしチャット・通知・進捗表示・共同編集のように、<strong>サーバー側で起きた変化を、訊かれる前に届けたい</strong>場面があります。ここでは<Term>ポーリング</Term>・<Term>SSE</Term>・<Term>WebSocket</Term>という3つの選択肢と、その選び方・実装上の難所を扱います。
        </Lead>
      </Hero>

      <Heading num="01">なぜ1往復では足りないのか</Heading>
      <p>HTTPは<Term>クライアント駆動</Term>です。サーバーは、リクエストが来ない限り何も送れません。「新しいメッセージが届いた」ことをサーバーが知っていても、クライアントが訊きに来るまで伝える手段がない ― これが根本的な制約です。</p>
      <p>この制約を回避する方法は、突き詰めると2通りしかありません。<strong>クライアントが繰り返し訊きに行く</strong>(ポーリング)か、<strong>接続を張りっぱなしにする</strong>(SSE・WebSocket)かです。</p>
      <Diagram caption="接続の張り方で3つの方式に分かれる">
        <svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={20} fill="#9a9a9a" fontSize="11">クライアント</text>
          <text x={430} y={20} fill="#9a9a9a" fontSize="11">サーバー</text>

          <text x={20} y={52} fill="#39ff6a" fontSize="12">ポーリング</text>
          <line x1={110} y1={45} x2={410} y2={45} stroke="#5f5f5f" />
          <path d="M410 45 l-8 -4 v8 z" fill="#5f5f5f" />
          <line x1={410} y1={62} x2={110} y2={62} stroke="#5f5f5f" />
          <path d="M110 62 l8 -4 v8 z" fill="#5f5f5f" />
          <text x={200} y={78} fill="#6a6a6a" fontSize="10">数秒ごとに繰り返す(空振りが多い)</text>

          <text x={20} y={132} fill="#39ff6a" fontSize="12">SSE</text>
          <line x1={110} y1={125} x2={410} y2={125} stroke="#5f5f5f" />
          <path d="M410 125 l-8 -4 v8 z" fill="#5f5f5f" />
          <line x1={410} y1={145} x2={110} y2={145} stroke="#39ff6a" strokeWidth="1.5" />
          <line x1={410} y1={158} x2={110} y2={158} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={200} y={175} fill="#6a6a6a" fontSize="10">1本の接続でサーバーから流し続ける(単方向)</text>

          <text x={20} y={215} fill="#39ff6a" fontSize="12">WebSocket</text>
          <line x1={110} y1={208} x2={410} y2={208} stroke="#39ff6a" strokeWidth="1.5" />
          <path d="M410 208 l-8 -4 v8 z" fill="#39ff6a" />
          <line x1={410} y1={222} x2={110} y2={222} stroke="#39ff6a" strokeWidth="1.5" />
          <path d="M110 222 l8 -4 v8 z" fill="#39ff6a" />
          <text x={200} y={240} fill="#6a6a6a" fontSize="10">1本の接続で双方向にやり取りする</text>
        </svg>
      </Diagram>

      <Heading num="02">ポーリング ― まずこれで足りないかを疑う</Heading>
      <p><Term>ポーリング</Term>は、一定間隔で通常のHTTPリクエストを繰り返すだけの方式です。原始的に見えますが、<strong>実務では最初に検討すべき選択肢</strong>です。特別なインフラが要らず、キャッシュ・認証・ロードバランサ・監視といった既存のHTTPの資産をそのまま使えます。</p>
      <p><Link href="/dev/frontend/state">サーバー状態</Link>のライブラリを使っているなら、実装は1行で済みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// TanStack Query なら間隔を渡すだけ
const { data } = useQuery({
  queryKey: ["notifications"],
  queryFn: fetchNotifications,
  refetchInterval: 10_000,          // 10秒ごとに取り直す
  refetchIntervalInBackground: false, // 非表示タブでは止める(重要)
});`}</code>
      </pre>
      <p>欠点は、更新が無くてもリクエストが飛ぶ<strong>空振り</strong>と、最大で間隔分の<strong>遅延</strong>です。10秒間隔なら平均5秒遅れます。「数十秒の遅れが許されるか」がまず分かれ目になります。</p>
      <Aside label="ロングポーリング">
        中間的な方式として<Term>ロングポーリング</Term>があります。サーバーがリクエストを<strong>すぐには返さず</strong>、更新が起きるまで保留し、起きた瞬間に応答して切断する ― クライアントは応答を受け取ったらまた繋ぎに行きます。遅延はほぼ無くなりますが、接続を保留する分サーバー側の負担はSSEと変わらず、いまから新規に選ぶ理由は薄くなりました。
      </Aside>

      <Heading num="03">SSE ― サーバーから流し続ける片方向の通り道</Heading>
      <p><Term>SSE(Server-Sent Events)</Term>は、<strong>普通のHTTPレスポンスを閉じずに書き続ける</strong>仕組みです。<code>Content-Type: text/event-stream</code>を返し、接続を開いたままテキストを追記していくと、ブラウザ側の<code>EventSource</code>がそれをイベントとして受け取ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サーバー側(Express)
app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const send = (data: unknown) => {
    // "data: <JSON>\\n\\n" が1イベントの単位
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  const timer = setInterval(() => send({ at: Date.now() }), 5000);

  // 切断時の後始末を必ず書く(書き忘れるとハンドラが残り続ける)
  req.on("close", () => clearInterval(timer));
});`}</code>
      </pre>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// クライアント側
const es = new EventSource("/api/events");
es.onmessage = (e) => console.log(JSON.parse(e.data));
es.onerror = () => { /* ブラウザが自動で再接続する */ };
// 使い終わったら es.close()`}</code>
      </pre>
      <p>SSEの利点は、<strong>HTTPのままである</strong>ことに尽きます。認証Cookieもそのまま乗り、プロキシもファイアウォールも通常のHTTPとして扱えます。さらに<strong>切断時の再接続をブラウザが自動で行い</strong>、<code>id:</code>フィールドを付けておけば再接続時に<code>Last-Event-ID</code>ヘッダーで「どこまで受け取ったか」をサーバーに伝えてくれます。取りこぼしの復旧が仕組みとして用意されているのは大きな利点です。</p>
      <p>制約は、<strong>サーバー→クライアントの片方向</strong>であることと、テキストしか送れないことです。クライアントからの送信は通常のPOSTで行うことになりますが、多くのアプリではそれで十分です。</p>

      <Heading num="04">WebSocket ― 双方向の常時接続</Heading>
      <p><Term>WebSocket</Term>は、HTTPで接続を開始したあとに<Term>プロトコルを切り替える</Term>(<code>Upgrade: websocket</code>)ことで、1本のTCP接続を双方向の通信路として使い続ける仕組みです。URLスキームは<code>ws://</code> / <code>wss://</code>(TLS版)になります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サーバー側(ws パッケージ)
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  socket.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());
    // 接続中の全員へ配信する
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(msg));
      }
    }
  });
});`}</code>
      </pre>
      <p>双方向・低遅延・バイナリ対応と性能面では最上位ですが、<strong>HTTPの外に出てしまう</strong>代償があります。認証・再接続・エラー処理・監視のすべてを自前で組み直す必要があり、後述するスケールの問題も付いてきます。</p>

      <Heading num="05">どれを選ぶか</Heading>
      <table>
        <thead>
          <tr><th>要件</th><th>選択</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">数十秒の遅延が許容できる / 更新頻度が低い</td><td><strong>ポーリング</strong></td></tr>
          <tr><td className="hl">サーバーからの通知だけで足りる(通知・進捗・ダッシュボード・LLMの逐次出力)</td><td><strong>SSE</strong></td></tr>
          <tr><td className="hl">クライアントからも高頻度に送る(チャット・共同編集・ゲーム)</td><td><strong>WebSocket</strong></td></tr>
          <tr><td className="hl">音声・映像そのものをやり取りする</td><td>WebRTC(別系統の技術)</td></tr>
        </tbody>
      </table>
      <p>判断の順序は<strong>ポーリング → SSE → WebSocket</strong>です。下に行くほど実現できることは増えますが、運用の複雑さも増えます。「双方向が本当に必要か」を一度疑うと、多くのケースはSSEで足ります。</p>

      <Heading num="06">実装の難所 ― 繋がっている間より、切れたとき</Heading>
      <p>常時接続の実装で難しいのは、通信そのものではなく<strong>切断と再接続</strong>です。モバイル回線の切り替え、スリープ復帰、プロキシのタイムアウトで、接続は日常的に切れます。</p>
      <table>
        <thead>
          <tr><th>課題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再接続の集中</td><td><Term>指数バックオフ</Term>とランダムな揺らぎ(jitter)を入れる。全員が同時に繋ぎ直すとサーバーが落ちる</td></tr>
          <tr><td className="hl">切れたことに気付けない</td><td>定期的に<Term>ハートビート</Term>(ping/pong)を送り、応答が無ければ切断とみなす</td></tr>
          <tr><td className="hl">切断中の取りこぼし</td><td>再接続時に「最後に受け取ったID」を送り、差分を貰い直す。SSEは<code>Last-Event-ID</code>が標準で担う</td></tr>
          <tr><td className="hl">重複配信</td><td>メッセージにIDを持たせ、受信側で<Term>冪等</Term>に扱う(同じIDは無視する)</td></tr>
          <tr><td className="hl">認証</td><td>WebSocketはカスタムヘッダーを付けられない。接続前に短命な<strong>チケット</strong>をHTTPで発行し、それをクエリで渡す。SSEはCookieがそのまま使える</td></tr>
          <tr><td className="hl">認可の有効期限</td><td>接続は数時間続く。トークンの失効を接続中にも検知し、切断する</td></tr>
        </tbody>
      </table>
      <Aside label="設計の原則">
        リアルタイム接続は<strong>「速く届ける経路」であって、「唯一の真実の経路」ではない</strong>と考えます。届いたイベントは「更新があった」という合図として扱い、実データは通常のHTTPで取り直す(いわゆる<Term>キャッシュ無効化としてのイベント</Term>)。こうすると、取りこぼしても次の再取得で必ず正しい状態に戻り、復旧処理が劇的に簡単になります。
      </Aside>

      <Heading num="07">スケールの壁 ― サーバーが複数台になった瞬間</Heading>
      <p>常時接続には、ステートレスなHTTPには無い制約があります。<strong>接続はサーバーの1台に固定される</strong>ということです。</p>
      <p>2台構成で、AさんがサーバーAに、BさんがサーバーBに繋いでいるとします。AさんのメッセージをサーバーAが受け取っても、サーバーBは何も知らないのでBさんには届きません。この解決には、サーバー間でイベントを配る<Term>Pub/Sub</Term>の層(Redis Pub/Sub、<Link href="/cloud/aws/integration/sns">SNS</Link>、<Link href="/cloud/gcp/integration/pubsub">Pub/Sub</Link>など)が必要になります。</p>
      <table>
        <thead>
          <tr><th>制約</th><th>影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続がサーバーに固定される</td><td>ロードバランサに<Term>スティッキーセッション</Term>が要る。サーバー間はPub/Subで橋渡しする</td></tr>
          <tr><td className="hl">デプロイのたびに全接続が切れる</td><td><Link href="/dev/backend/ops/lifecycle">グレースフルシャットダウン</Link>と、クライアント側の再接続が前提になる</td></tr>
          <tr><td className="hl">接続数がメモリを圧迫する</td><td>1台あたりの同時接続数に上限がある。オートスケールの指標をCPUではなく接続数にする</td></tr>
          <tr><td className="hl">サーバーレスと相性が悪い</td><td>Lambdaのような実行モデルでは接続を保持できず、API Gateway の WebSocket 等の専用機能が必要</td></tr>
        </tbody>
      </table>
      <p>この複雑さゆえに、リアルタイム部分だけをマネージドサービス(Pusher、Ably、Supabase Realtime など)に委ねる判断も一般的です。<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>の考え方をそのままクライアントまで延長した構成、と見ることもできます。</p>

      <Heading num="08">Reactでの扱い ― 接続はEffectで開き、必ず閉じる</Heading>
      <p>接続はコンポーネントの外にある資源なので、<Link href="/dev/frontend/react/effects">Effect</Link>で開き、<strong>クリーンアップで必ず閉じます</strong>。閉じ忘れは、画面遷移のたびに接続が積み上がる典型的なリークになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function useEventStream(url: string, onEvent: (data: Message) => void) {
  const handler = useRef(onEvent);
  handler.current = onEvent; // 最新のコールバックを保持し、再接続を防ぐ

  useEffect(() => {
    const es = new EventSource(url);
    es.onmessage = (e) => handler.current(JSON.parse(e.data));
    return () => es.close();   // ← これが無いと接続が残り続ける
  }, [url]);                   // 依存は url だけに絞る
}`}</code>
      </pre>
      <p>依存配列に<code>onEvent</code>をそのまま入れると、親が再描画されるたびに接続を張り直してしまいます。コールバックは<code>ref</code>に逃がし、依存を<strong>接続先を決める値だけ</strong>に絞るのが定石です。受け取ったイベントは、前節のとおり「再取得の合図」として<Link href="/dev/frontend/state">サーバー状態</Link>のキャッシュを無効化するのが最も堅実な使い方になります。</p>

      <Analogy label="💡 たとえるなら">
        ポーリングは、郵便受けを数分おきに見に行くことです。ほとんどは空振りですが、仕組みは単純で壊れません。SSEは、放送を流しっぱなしのラジオです ― 聞く一方ですが、電波が途切れても勝手に受信し直してくれます。WebSocketは、繋ぎっぱなしの電話です。すぐに双方向で話せる代わりに、回線を1本占有し続け、相手が席を外したかどうかも自分で確かめなければなりません。
      </Analogy>

      <Heading num="まとめ">単純な方から順に試す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ポーリングを疑ってから進む</h4><p>HTTPの資産をそのまま使える。数十秒の遅延が許せるならこれで終わり。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>片方向ならSSE</h4><p>HTTPのまま、自動再接続と取りこぼし復旧が標準で付く。通知や進捗表示の第一候補。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>難しいのは切れたとき</h4><p>バックオフ・ハートビート・冪等な受信を設計する。イベントは合図とし、実データはHTTPで取り直す。</p></Card>
      </CardGrid>
      <p>次は、受け取ったデータをブラウザ側のどこに置くかです。Cookie・localStorage・IndexedDBを使い分ける<Link href="/dev/frontend/storage">ブラウザストレージ</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/http" tag="フロントエンド">HTTP通信（Fetch・axios）</RelatedLink>
            <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層</RelatedLink>
            <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
