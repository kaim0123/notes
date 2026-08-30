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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Node.jsの運用特性",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>Node.jsの運用特性 ― 1本のスレッドを止めない</h1>
        <Lead>
          <Link href="/dev/language/node">Node.js と標準ライブラリ</Link>で実行モデルを、<Link href="/dev/language/engine">実行の仕組み</Link>でイベントループを見ました。ここでは<strong>サーバーとして動かし続けたときに何が起きるか</strong>に絞ります。Node.jsの「シングルスレッド + 非同期I/O」というモデルは、I/O主体のAPIには理想的ですが、<strong>その前提から外れた瞬間に特徴的な壊れ方</strong>をします。症状から原因を辿れるようにしておくのが目的です。
        </Lead>
      </Hero>

      <Heading num="01">前提 ― JavaScriptを実行するスレッドは1本</Heading>
      <p>Node.jsは、ファイル読み込みやネットワーク通信といったI/Oを裏側のスレッドプールとOSに任せ、<strong>JavaScriptのコード自体は1本のスレッドで順番に実行します</strong>。この設計により、数千の同時接続を少ないメモリで捌けます。</p>
      <p>裏返せば、<strong>そのスレッドが1つの処理で塞がると、他の全リクエストが待たされます</strong>。他の言語のスレッドモデルなら「その1リクエストだけが遅い」で済むところが、Node.jsでは<strong>サーバー全体が止まります</strong>。運用上のほぼすべての問題が、ここから派生します。</p>

      <Heading num="02">イベントループのブロック ― 症状と原因</Heading>
      <p>症状は特徴的です。<strong>CPU使用率が100%(1コア分)に張り付き、すべてのAPIが同時に遅くなり、ヘルスチェックまで失敗する</strong>。特定のエンドポイントだけでなく、全部が等しく遅くなるのが見分け方です。</p>
      <table>
        <thead>
          <tr><th>原因</th><th>具体例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同期I/O</td><td><code>readFileSync</code>、<code>execSync</code>を起動処理以外で使う</td></tr>
          <tr><td className="hl">巨大なJSON</td><td><code>JSON.parse</code>/<code>stringify</code>は<strong>同期処理</strong>。数十MBで数百ミリ秒止まる</td></tr>
          <tr><td className="hl">大きな配列の処理</td><td>10万件の<code>map</code>/<code>sort</code>/多重ループ</td></tr>
          <tr><td className="hl">正規表現</td><td><Term>ReDoS</Term> ― 入力次第で計算量が爆発する書き方。<strong>攻撃に使える</strong></td></tr>
          <tr><td className="hl">暗号・圧縮</td><td>同期版のハッシュ計算、画像処理、PDF生成</td></tr>
          <tr><td className="hl">テンプレート描画</td><td>巨大なHTMLの文字列組み立て</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ awaitは万能ではない">
        <code>await</code>を付ければ非同期になる、というのは誤解です。<code>await</code>が意味を持つのは<strong>実際に非同期な処理を待つとき</strong>だけで、<code>async</code>関数の中で重い同期計算をすれば、その間イベントループは完全に止まります。<strong>「非同期関数の中だから安全」ということはありません。</strong>
      </Aside>

      <Heading num="03">検出 ― イベントループの遅延を測る</Heading>
      <p>ブロックは<strong>イベントループの遅延</strong>として数値化できます。「次に処理されるはずのタイマーが、どれだけ遅れて実行されたか」を測る指標です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { monitorEventLoopDelay } from "node:perf_hooks";

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  // p99 が数十msを超えていたら、どこかで詰まっている
  metrics.gauge("event_loop_delay_p99_ms", histogram.percentile(99) / 1e6);
  histogram.reset();
}, 10_000);`}</code>
      </pre>
      <p>この値を常時監視しておくと、原因不明の「全体的な遅さ」を即座に切り分けられます。<strong>平常時は数ミリ秒</strong>で、100msを超えるようなら明確に問題があります。詳しい犯人探しには、<code>--cpu-prof</code>やClinic.jsでプロファイルを取り、どの関数がCPU時間を占めているかを見ます。</p>

      <Heading num="04">CPUを使う処理の逃がし方</Heading>
      <table>
        <thead>
          <tr><th>手段</th><th>適する場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/dev/backend/jobs">ジョブキューへ出す</Link></td><td><strong>第一選択</strong>。すぐに結果が要らないなら、そもそもリクエスト内でやらない</td></tr>
          <tr><td className="hl"><code>worker_threads</code></td><td>結果がすぐ必要で、計算がまとまっている場合。プールを作って使い回す</td></tr>
          <tr><td className="hl">処理を分割して譲る</td><td>ループを分割し、途中で<code>setImmediate</code>を挟んで他の処理に順番を回す</td></tr>
          <tr><td className="hl">別サービスに切り出す</td><td>画像処理や機械学習など、そもそも適した言語・基盤がある場合</td></tr>
          <tr><td className="hl">DBにやらせる</td><td>集計やソートは<strong>アプリに持ってこずSQLで済ませる</strong></td></tr>
        </tbody>
      </table>
      <p>最後の項目は見落とされがちです。10万件を取得してアプリ側で集計するくらいなら、<code>GROUP BY</code>で1行を返してもらう方が、転送量もCPUも桁違いに小さくなります。</p>

      <Heading num="05">メモリ ― 上限とリークの源</Heading>
      <p>Node.jsのヒープには上限があり、超えると<code>JavaScript heap out of memory</code>で<strong>プロセスごと落ちます</strong>。コンテナで動かす場合、コンテナのメモリ制限とヒープ上限を整合させておく必要があります ― ヒープ上限の方が大きいと、V8が回収を試みる前にOSに強制終了(OOM Kill)されます。</p>
      <table>
        <thead>
          <tr><th>リークの源</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">上限のないキャッシュ</td><td><code>Map</code>に入れ続ける。<strong>最多の原因</strong>。件数上限かTTLを必ず設ける</td></tr>
          <tr><td className="hl">イベントリスナーの解除漏れ</td><td>登録しっぱなしで<code>off</code>しない。警告が出たら本物の疑い</td></tr>
          <tr><td className="hl">タイマーの解除漏れ</td><td><code>setInterval</code>を止めていない</td></tr>
          <tr><td className="hl">クロージャの保持</td><td>大きなオブジェクトを掴んだ関数が、長生きする場所に残っている</td></tr>
          <tr><td className="hl">グローバル変数への蓄積</td><td>ログや履歴を配列に貯め続ける</td></tr>
        </tbody>
      </table>
      <p>リークの見分け方は、<strong>ヒープ使用量が右肩上がりで、GC後も下がらない</strong>ことです。<code>process.memoryUsage()</code>を定期的に記録しておけば、グラフで一目瞭然になります。犯人の特定にはヒープスナップショットを2回取り、その差分に増えているオブジェクトを見ます。</p>
      <Aside label="再起動で誤魔化さない">
        「メモリが増えたら再起動する」という運用は動きはしますが、原因は残り続け、いずれ再起動の間隔が短くなります。<strong>グラフで増加傾向を見つけた時点で調べる</strong>方が、結局は安く済みます。
      </Aside>

      <Heading num="06">ストリーム ― 全部をメモリに載せない</Heading>
      <p>大きなデータをバッファに読み込むと、その分だけメモリを消費します。同時に10人が100MBのファイルを扱えば1GBです。<Term>ストリーム</Term>は、データを<strong>少しずつ流しながら処理する</strong>ための仕組みです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { pipeline } from "node:stream/promises";

// ✗ 全件をメモリに載せてから返す
const rows = await db.query("SELECT * FROM events");   // 数百万行
res.json(rows);

// ○ DBから流しながら、変換して、そのまま応答へ書き出す
await pipeline(
  db.queryStream("SELECT * FROM events"),
  toCsvTransform(),
  res,
);`}</code>
      </pre>
      <p>ストリームを使うときは<code>pipeline</code>を使います。手動で<code>pipe</code>を繋ぐと、途中でエラーが起きたときに<strong>後続のストリームが閉じられず、リソースが漏れます</strong>。<code>pipeline</code>はエラー時の後始末までまとめて面倒を見ます。</p>
      <p>もう1つの利点が<Term>バックプレッシャ</Term>です。書き出し先(遅いクライアント)が追いつかないとき、読み込み側の速度を自動で落としてくれます。これが無いと、遅い相手のためにデータがメモリ上に溜まり続けます。</p>

      <Heading num="07">プロセスを増やす ― クラスタかコンテナか</Heading>
      <p>1プロセスが使えるのは1コア分です。マルチコアのマシンを活かすには、プロセスを複数動かします。</p>
      <table>
        <thead>
          <tr><th>方法</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コンテナを複数動かす</td><td><strong>推奨</strong>。オーケストレータが再起動・スケール・配置を管理する</td></tr>
          <tr><td className="hl"><code>cluster</code>モジュール</td><td>1つのVMで複数コアを使いたい場合。プロセス管理を自分で書くことになる</td></tr>
          <tr><td className="hl">PM2などのプロセスマネージャ</td><td>コンテナを使わない構成では有用</td></tr>
        </tbody>
      </table>
      <p>いずれの場合も<strong>プロセス間で状態を共有できない</strong>ことに注意します。プロセス内のキャッシュ、<Link href="/dev/backend/ops/rate-limit">レート制限のカウンタ</Link>、WebSocketの接続情報は、すべてプロセスごとに独立します。共有が必要なものはRedis等の外部ストアへ出します。</p>

      <Heading num="08">落ちるときの作法</Heading>
      <p>最後に、想定外の例外が起きたときの扱いです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "uncaught exception");
  // 状態が壊れている可能性がある。処理を続けず、記録して終了する
  shutdownGracefully().finally(() => process.exit(1));
});

process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "unhandled rejection");
  shutdownGracefully().finally(() => process.exit(1));
});`}</code>
      </pre>
      <p>直感に反しますが、<strong>捕捉できなかった例外の後にプロセスを動かし続けるべきではありません</strong>。どこまで処理が進んでいたか分からず、不整合なまま応答を返し続ける可能性があるためです。<strong>記録して落ち、オーケストレータに再起動させる</strong>のが安全です。<Link href="/dev/backend/ops/lifecycle">グレースフルシャットダウン</Link>と組み合わせれば、処理中のリクエストを巻き込まずに終われます。</p>

      <Analogy label="💡 たとえるなら">
        Node.jsは、注文を取るのがきわめて上手い<strong>1人のホール係</strong>です。厨房(I/O)に指示を出して次の客へ回るので、1人でも大勢を捌けます。ところがその人が自分でジャガイモの皮を剥き始めると(CPU処理)、その間<strong>店内の全員が完全に放置されます</strong>。だから皮剥きは厨房(ワーカー)に回すか、そもそも仕込み(バッチ)でやっておく。1人で回す設計は、その1人が手を止めない限りにおいて、驚くほど効率的なのです。
      </Analogy>

      <Heading num="まとめ">止めない・溜めない・抱え込まない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>全部が同時に遅いならブロック</h4><p>イベントループ遅延を常時監視する。JSON.parseも正規表現も同期処理。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>上限のないキャッシュを作らない</h4><p>メモリリークの最多原因。件数上限かTTLを必ず設ける。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>大きなデータは流す</h4><p>pipelineでストリーム処理し、バックプレッシャを効かせる。</p></Card>
      </CardGrid>
      <p>バックエンドの最後に、ここまでの実装を検証する手立てを見ます。<Link href="/dev/backend/test">APIのテスト</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/language/node" tag="実装">Node.js と標準ライブラリ</RelatedLink>
            <RelatedLink href="/dev/language/engine" tag="実装">実行の仕組み</RelatedLink>
            <RelatedLink href="/dev/backend/ops/lifecycle" tag="バックエンド">起動と停止</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
