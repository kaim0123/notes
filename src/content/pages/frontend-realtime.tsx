import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "リアルタイム通信" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>リアルタイム通信 ― サーバーから届く更新を受け取る</h1>
        <Lead>
          <Link href="/frontend/http">HTTP通信</Link>は「訊いて、答える」1往復のモデルです。しかしチャット・通知・進捗表示・共同編集のように、<Term>サーバー側で起きた変化を訊かれる前に届けたい</Term>場面があります。選択肢は<Term>ポーリング</Term>・<Term>SSE</Term>・<Term>WebSocket</Term>の3つ。難所は通信そのものではなく、切れたときの扱いです。
        </Lead>
      </Hero>

      <Heading num="01">なぜ1往復では足りないのか</Heading>
      <p>
        HTTPは<Term>クライアント駆動</Term>です。サーバーはリクエストが来ない限り何も送れません。「新しいメッセージが届いた」ことをサーバーが知っていても、訊きに来るまで伝える手段がない ― これが根本の制約です。
      </p>
      <p>
        回避策は突き詰めると2通りしかありません。<Term>繰り返し訊きに行く</Term>か、<Term>接続を張りっぱなしにする</Term>かです。
      </p>

      <DiagramFrame
        slug="frontend-realtime-modes"
        aspect="640 / 320"
        caption="3つの方式を接続の張り方で比べた図。ポーリングは数秒ごとにリクエストと応答を繰り返すため、更新がなくても往復が発生し空振りが多い。SSEは最初に1回リクエストを送ったあと、サーバーが応答を閉じずにデータを流し続ける片方向の通り道になる。WebSocketは接続を張ったあと、クライアントからもサーバーからも自由にメッセージを送れる双方向の通り道になる。下に行くほど遅延は小さくなるが、運用の複雑さは増える。"
      />

      <Heading num="02">ポーリング ― まずこれで足りないかを疑う</Heading>
      <p>
        一定間隔で普通のHTTPリクエストを繰り返すだけの方式です。原始的に見えますが、<Term>実務では最初に検討すべき選択肢</Term>です。特別なインフラが要らず、キャッシュ・認証・負荷分散・監視といった既存のHTTPの資産をそのまま使えます。
      </p>

      <pre>
        <code>{`// サーバー状態のライブラリなら間隔を渡すだけ
const { data } = useQuery({
  queryKey: ["notifications"],
  queryFn: fetchNotifications,
  refetchInterval: 10_000,            // 10秒ごとに取り直す
  refetchIntervalInBackground: false, // 非表示タブでは止める(重要)
});`}</code>
      </pre>

      <p>
        欠点は<Term>空振り</Term>と<Term>最大で間隔分の遅延</Term>です。10秒間隔なら平均5秒遅れます。「数十秒の遅れが許されるか」がまず分かれ目になります。非表示タブで止めるのを忘れると、開きっぱなしのタブが延々とリクエストを撃ち続けることになります。
      </p>

      <Aside label="ロングポーリング">
        中間的な方式として、サーバーがリクエストを<Term>すぐには返さず</Term>、更新が起きるまで保留し、起きた瞬間に応答して切る方式があります。遅延はほぼ無くなりますが、接続を保留する分の負担はSSEと変わりません。いまから新規に選ぶ理由は薄くなりました。
      </Aside>

      <Heading num="03">SSE ― 閉じないHTTPレスポンス</Heading>
      <p>
        SSEは、普通のHTTPレスポンスを<Term>閉じずに書き続ける</Term>仕組みです。<code>text/event-stream</code>を返して接続を開いたままテキストを追記すると、ブラウザ側の<code>EventSource</code>がそれをイベントとして受け取ります。
      </p>

      <pre>
        <code>{`// サーバー側
res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.flushHeaders();

const send = (data: unknown) =>
  res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);  // 空行までが1イベント

const timer = setInterval(() => send({ at: Date.now() }), 5000);
req.on("close", () => clearInterval(timer));   // 後始末を必ず書く`}</code>
      </pre>

      <p>
        利点は<Term>HTTPのままである</Term>ことに尽きます。認証Cookieもそのまま乗り、プロキシもファイアウォールも通常のHTTPとして扱えます。さらに<Term>切断時の再接続をブラウザが自動で行い</Term>、<code>id:</code>を付けておけば再接続時に「どこまで受け取ったか」をヘッダーで伝えてくれます。取りこぼしの復旧が仕組みとして用意されているのは大きな利点です。
      </p>
      <p>
        制約は片方向であることと、テキストしか送れないことです。クライアントからの送信は通常のPOSTで行うことになりますが、多くのアプリではそれで十分です。
      </p>

      <Heading num="04">WebSocket ― 双方向の常時接続</Heading>
      <p>
        HTTPで接続を開始したあとに<Term>プロトコルを切り替え</Term>、1本の接続を双方向の通信路として使い続ける仕組みです。双方向・低遅延・バイナリ対応と性能面では最上位ですが、<Term>HTTPの外に出てしまう</Term>代償があります。
      </p>
      <p>
        認証・再接続・エラー処理・監視をすべて自前で組み直すことになり、後述するスケールの問題も付いてきます。「チャットだからWebSocket」と反射的に決める前に、片方向で足りないかを確かめる価値があります。
      </p>

      <Heading num="05">どれを選ぶか</Heading>
      <table>
        <thead>
          <tr><th>要件</th><th>選択</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">数十秒の遅延が許容できる / 更新頻度が低い</td><td>ポーリング</td></tr>
          <tr><td className="hl">サーバーからの通知だけで足りる(通知・進捗・逐次出力)</td><td>SSE</td></tr>
          <tr><td className="hl">クライアントからも高頻度に送る(チャット・共同編集)</td><td>WebSocket</td></tr>
          <tr><td className="hl">音声・映像そのものをやり取りする</td><td>WebRTC(別系統の技術)</td></tr>
        </tbody>
      </table>

      <p>
        判断の順序は<Term>ポーリング → SSE → WebSocket</Term>です。下に行くほど実現できることは増えますが、運用の複雑さも増えます。
      </p>

      <Heading num="06">難所は繋がっている間ではなく、切れたとき</Heading>
      <p>
        常時接続の実装で難しいのは通信そのものではなく<Term>切断と再接続</Term>です。回線の切り替え、スリープ復帰、プロキシのタイムアウトで、接続は日常的に切れます。
      </p>

      <table>
        <thead>
          <tr><th>課題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再接続の集中</td><td>指数バックオフとランダムな揺らぎを入れる。全員が同時に繋ぎ直すとサーバーが落ちる</td></tr>
          <tr><td className="hl">切れたことに気付けない</td><td>定期的にハートビートを送り、応答が無ければ切断とみなす</td></tr>
          <tr><td className="hl">切断中の取りこぼし</td><td>再接続時に「最後に受け取ったID」を送り、差分を貰い直す</td></tr>
          <tr><td className="hl">重複配信</td><td>メッセージにIDを持たせ、受信側で冪等に扱う(同じIDは無視する)</td></tr>
          <tr><td className="hl">認証</td><td>WebSocketは任意のヘッダーを付けられない。短命なチケットをHTTPで発行して渡す</td></tr>
          <tr><td className="hl">認可の有効期限</td><td>接続は数時間続く。トークンの失効を接続中にも検知して切る</td></tr>
        </tbody>
      </table>

      <Aside label="設計の原則 ― 経路であって真実ではない">
        リアルタイム接続は<Term>速く届ける経路</Term>であって、<Term>唯一の正しい経路</Term>ではないと考えます。届いたイベントは「更新があった」という合図として扱い、実データは通常のHTTPで取り直す。こうすると、取りこぼしても次の再取得で必ず正しい状態に戻り、復旧処理が劇的に簡単になります。この一手が、リアルタイム機能の難易度を大きく下げます。
      </Aside>

      <Heading num="07">スケールの壁 ― サーバーが複数台になった瞬間</Heading>
      <p>
        常時接続には、ステートレスなHTTPには無い制約があります。<Term>接続はサーバーの1台に固定される</Term>ということです。
      </p>
      <p>
        2台構成で、AさんがサーバーAに、BさんがサーバーBに繋いでいるとします。AさんのメッセージをサーバーAが受け取っても、サーバーBは何も知らないのでBさんには届きません。解決にはサーバー間でイベントを配る<Term>Pub/Sub</Term>の層が要ります。
      </p>

      <table>
        <thead>
          <tr><th>制約</th><th>影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続がサーバーに固定される</td><td>負荷分散に貼り付けの設定が要る。サーバー間はPub/Subで橋渡しする</td></tr>
          <tr><td className="hl">デプロイのたびに全接続が切れる</td><td>停止時の後始末と、クライアント側の再接続が前提になる</td></tr>
          <tr><td className="hl">接続数がメモリを圧迫する</td><td>1台あたりの上限がある。増減の指標をCPUではなく接続数にする</td></tr>
          <tr><td className="hl">サーバーレスと相性が悪い</td><td>実行のたびに立ち上がるモデルでは接続を保持できず、専用の仕組みが要る</td></tr>
        </tbody>
      </table>

      <p>
        この複雑さゆえに、リアルタイム部分だけをマネージドサービスに委ねる判断も一般的です。<Link href="/design/architecture-event-driven">イベント駆動アーキテクチャ</Link>の考え方をクライアントまで延長した構成、と見ることもできます。
      </p>

      <Heading num="08">Reactでの扱い ― 開いたら必ず閉じる</Heading>
      <p>
        接続はコンポーネントの外にある資源なので、<Link href="/frontend/react-effects">Effect</Link>で開き、<Term>クリーンアップで必ず閉じます</Term>。閉じ忘れは、画面遷移のたびに接続が積み上がる典型的なリークです。
      </p>

      <pre>
        <code>{`function useEventStream(url: string, onEvent: (data: Message) => void) {
  const handler = useRef(onEvent);
  handler.current = onEvent;   // 最新のコールバックを保持し、再接続を防ぐ

  useEffect(() => {
    const es = new EventSource(url);
    es.onmessage = (e) => handler.current(JSON.parse(e.data));
    return () => es.close();   // ← これが無いと接続が残り続ける
  }, [url]);                   // 依存は接続先を決める値だけに絞る
}`}</code>
      </pre>

      <p>
        依存配列にコールバックをそのまま入れると、親が再描画されるたびに接続を張り直します。コールバックは<code>ref</code>に逃がし、依存を<Term>接続先を決める値だけ</Term>に絞るのが定石です。
      </p>

      <Analogy label="💡 たとえるなら">
        ポーリングは、郵便受けを数分おきに見に行くことです。ほとんど空振りですが、仕組みは単純で壊れません。SSEは流しっぱなしのラジオ ― 聞く一方ですが、電波が途切れても勝手に受信し直してくれます。WebSocketは繋ぎっぱなしの電話です。すぐに双方向で話せる代わりに回線を1本占有し続け、相手が席を外したかどうかも自分で確かめなければなりません。
      </Analogy>

      <Heading num="まとめ">単純な方から順に試す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ポーリングを疑ってから進む</h4>
          <p>HTTPの資産をそのまま使える。数十秒の遅延が許せるならこれで終わり。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>片方向ならSSE</h4>
          <p>HTTPのまま、自動再接続と取りこぼし復旧が標準で付く。通知や進捗の第一候補。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>イベントは合図として扱う</h4>
          <p>実データはHTTPで取り直す。取りこぼしても次の再取得で正しい状態に戻る。</p>
        </Card>
      </CardGrid>

      <p>
        次は、受け取ったデータをブラウザ側のどこに置くか ―
        <Link href="/frontend/storage">ブラウザストレージ</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/realtime" />
    </DocsPage>
  );
}
