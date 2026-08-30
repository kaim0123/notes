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
  title: "並行モデル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 並行処理</Eyebrow>
        <h1>並行モデル ― スレッド・イベントループ・アクター</h1>
        <Lead>
          「同時に走らせる」の実現方法は1つではありません。スレッドとロックで真正面から取り組む言語もあれば、そもそも状態を共有させない言語もあります。どのモデルを選ぶかで、書けるコードの形も、起こりうるバグの種類も変わります。ここでは代表的なモデルを比べ、JavaScriptで実際に使える選択肢に落とし込みます。
        </Lead>
      </Hero>

      <Heading num="01">系統は2つ ― 共有するか、送るか</Heading>
      <p>数あるモデルも、状態の扱い方で見れば2系統に分かれます。</p>
      <table>
        <tbody>
          <tr><th></th><th>共有メモリ系</th><th>メッセージパッシング系</th></tr>
          <tr><td className="hl">発想</td><td>同じデータをみんなで直接触る。触る順番をロックで整理する</td><td>データを持つのは1人だけ。他はメッセージで依頼する</td></tr>
          <tr><td className="hl">正しさの担保</td><td>プログラマがロックを正しく使うこと</td><td>構造上、同時アクセスが起きないこと</td></tr>
          <tr><td className="hl">典型的なバグ</td><td>競合状態・デッドロック</td><td>メッセージの順序・欠落・キューの滞留</td></tr>
          <tr><td className="hl">代表</td><td>スレッド + ロック(Java・C++・C#)</td><td>アクター(Erlang)・チャネル(Go)・ジョブキュー</td></tr>
        </tbody>
      </table>
      <p>後者はバグが起きにくい代わりに、データのコピーや通信のコストを払います。Webアプリのようにプロセスをまたいで動くシステムでは、そもそも共有メモリが使えないため、自然と後者の形になります。</p>

      <Heading num="02">スレッド + ロック ― 素朴で強力、そして難しい</Heading>
      <p>OSのスレッドを直接使い、共有データをロックで守る古典的なモデルです。CPUコアを素直に使い切れるため計算処理に強く、Java・C#・C++・Rustなど多くの言語の基本形になっています。</p>
      <p>弱点は2つ。ひとつは<strong>正しく書くのが難しい</strong>こと(競合とデッドロックの責任がすべてプログラマにある)、もうひとつは<strong>数を増やせない</strong>ことです。OSスレッドは1本あたり数百KBから1MB程度のスタックを持ち、生成も<Link href="/os/process">コンテキストスイッチ</Link>も高コストなので、1万接続に1万スレッドを割り当てる、といった使い方はできません。</p>
      <Aside label="C10K問題">
        「1台のサーバーで同時1万接続をどうさばくか」という問題は、1接続=1スレッドという素朴なモデルの限界から生まれました。この課題への回答が、次に見るイベントループと軽量スレッドです。
      </Aside>

      <Heading num="03">イベントループ ― 1本のスレッドで待たない</Heading>
      <p>Node.jsやブラウザが採用するモデルです。スレッドは1本だけ。I/Oを開始したら結果を待たずに次の仕事へ移り、準備ができたものからコールバックを実行します。</p>
      <Diagram caption="待ちの間も1本のスレッドは止まらない ― 完了したものから順に処理する">
        <svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
          <circle cx={110} cy={90} r={55} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={110} y={86} fill="#f2f2f2" fontSize="12" textAnchor="middle">イベント</text>
          <text x={110} y={102} fill="#f2f2f2" fontSize="12" textAnchor="middle">ループ</text>
          <rect x={230} y={20} width={170} height={32} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={40} fill="#f2f2f2" fontSize="11" textAnchor="middle">タイマー</text>
          <rect x={230} y={72} width={170} height={32} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={92} fill="#f2f2f2" fontSize="11" textAnchor="middle">ソケット・ファイルI/O</text>
          <rect x={230} y={124} width={170} height={32} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={144} fill="#f2f2f2" fontSize="11" textAnchor="middle">完了したコールバック</text>
          <line x1={165} y1={80} x2={230} y2={40} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={165} y1={90} x2={230} y2={88} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={230} y1={140} x2={165} y2={105} stroke="#39ff6a" strokeWidth="1.5" />
        </svg>
      </Diagram>
      <p>共有メモリを複数スレッドが触らないため、ロックが要らないのが最大の利点です。一方で<strong>1本のスレッドを止めるとすべてが止まります</strong>。JSONの巨大なパース、同期的なファイル読み込み、重いループ ― こうしたCPU処理を書くと、その間すべてのリクエストが待たされます。</p>
      <p>したがってNode.jsの設計指針は明快です ― <strong>I/Oは並行に、CPU処理は外に出す</strong>。詳しい内部構造は「<Link href="/dev/language/engine">第6章 実行の仕組み</Link>」と「<Link href="/dev/backend/node">Node.jsの運用特性</Link>」を参照してください。</p>

      <Heading num="04">コルーチン・軽量スレッド ― 数万個作れる実行単位</Heading>
      <p>OSではなく<strong>言語ランタイムが</strong>切り替えを担当する、極めて軽い実行単位です。スタックは数KBから始まり、必要に応じて伸びます。生成コストが低いため、接続ごと・リクエストごとに1つ作れます。</p>
      <table>
        <tbody>
          <tr><th>言語</th><th>呼び名</th><th>特徴</th></tr>
          <tr><td className="hl">JavaScript</td><td>async関数(Promise)</td><td><code>await</code> で中断・再開する。切り替え点がコード上に明示される</td></tr>
          <tr><td className="hl">Go</td><td>goroutine</td><td><code>go f()</code> と書くだけ。ランタイムが複数のOSスレッドへ自動的に割り当てる</td></tr>
          <tr><td className="hl">Java</td><td>仮想スレッド</td><td>従来のスレッドAPIのまま軽量化。既存コードを活かせる</td></tr>
          <tr><td className="hl">Python</td><td>asyncio</td><td>イベントループ上で動く。CPU並列にはGILの制約がある</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        OSスレッドが「正社員(採用コストが高く、席も必要)」なら、コルーチンは「タスクごとの付箋」です。何万枚でも作れて、必要なときだけデスク(スレッド)に載せて処理します。
      </Analogy>
      <p>なお、<code>await</code> のように<strong>中断点が明示される</strong>方式を協調的、goroutineのようにランタイムが任意の場所で切り替える方式をプリエンプティブと呼びます。前者は「どこで割り込まれるか」が読めるため競合を追いやすく、後者は書きやすい代わりに割り込み位置が読めません。</p>

      <Heading num="05">アクターモデル ― 状態を1人に閉じ込める</Heading>
      <p>アクターは「自分の状態」と「受信箱」を持つ独立した実行単位です。他のアクターの状態を直接読み書きすることはできず、<strong>メッセージを送ることしかできません</strong>。各アクターはメッセージを1件ずつ順番に処理するため、その内部では並行性を考える必要がありません。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>競合が起きない</h4>
          <p>状態を触れるのは自分だけ。ロックという概念自体が不要になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>分散に自然に伸びる</h4>
          <p>メッセージ送信は相手が別マシンでも同じ形。スケールアウトしやすい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>障害を隔離できる</h4>
          <p>1つが落ちても他は動き続ける。監視役が再起動する(Erlangの「let it crash」)。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>代わりに難しくなること</h4>
          <p>処理が非同期になり、順序保証・タイムアウト・受信箱の滞留を自分で設計する必要がある。</p>
        </Card>
      </CardGrid>
      <p>Erlang/Elixir・Akkaが代表格ですが、発想自体はWebアプリでもそのまま使えます ― <strong>「対象ごとにジョブキューを分け、1件ずつ処理する」</strong>のは小さなアクターモデルです。</p>

      <Heading num="06">CSPとチャネル ― 通信そのものを設計する</Heading>
      <p>Goが採用する<Term>CSP(Communicating Sequential Processes)</Term>では、実行単位ではなく<strong>チャネル(通信路)</strong>が主役になります。送り手と受け手はチャネルを介してのみやり取りし、互いを直接は知りません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Go ― 3つのワーカーが同じチャネルから仕事を取り、結果を別のチャネルへ返す
jobs := make(chan Job, 100)
results := make(chan Result, 100)

for w := 0; w < 3; w++ {
    go worker(jobs, results)   // goroutineを3つ起動
}`}</code>
      </pre>
      <p>バッファ付きチャネルは、そのままキューとして働きます。受け手が遅ければ送り手がブロックされるため、<strong>バックプレッシャー(詰まりの逆流)</strong>が言語機能として自然に手に入るのがCSPの強みです。</p>

      <Heading num="07">JavaScript / TypeScript での選択肢</Heading>
      <p>Node.jsとブラウザで実際に使える手段を整理します。</p>
      <table>
        <tbody>
          <tr><th>手段</th><th>実体</th><th>向いている用途</th></tr>
          <tr><td className="hl">async / await</td><td>単一スレッド上の並行</td><td>DB・API呼び出しなどI/O待ちの重ね合わせ</td></tr>
          <tr><td className="hl">worker_threads</td><td>同一プロセス内の別スレッド</td><td>画像処理・暗号計算などCPUバウンドな処理</td></tr>
          <tr><td className="hl">Web Worker</td><td>ブラウザの別スレッド</td><td>UIを止めずに重い計算をする</td></tr>
          <tr><td className="hl">cluster / 複数コンテナ</td><td>別プロセス</td><td>コア数に合わせてサーバーをスケールさせる</td></tr>
          <tr><td className="hl">child_process</td><td>別プログラムの起動</td><td>外部コマンド(ffmpegなど)の実行</td></tr>
          <tr><td className="hl">ジョブキュー + ワーカー</td><td>別プロセス・別マシン</td><td>時間のかかる処理をリクエストから切り離す</td></tr>
        </tbody>
      </table>
      <p>ワーカースレッドとメインスレッドの間はメッセージパッシング(値のコピー)が基本で、共有メモリを使いたい場合のみ <code>SharedArrayBuffer</code> と <code>Atomics</code> を使います ― ただしこれは共有メモリ系のモデルに戻ることを意味し、データ競合の危険も戻ってきます。</p>

      <Heading num="08">どう選ぶか</Heading>
      <p>判断の軸は2つだけです ― <strong>待っているのか、計算しているのか</strong>。そして<strong>状態を共有する必要があるのか</strong>。</p>
      <Steps>
        <li>処理の大半がI/O待ちなら → <code>async / await</code> で十分。並列度の上限だけ決める</li>
        <li>CPUを使い切る処理があるなら → ワーカースレッド、または別プロセス・別サービスへ切り出す</li>
        <li>リクエストより長く生きる処理なら → ジョブキューに載せ、ワーカーで処理する</li>
        <li>状態を共有したいなら → まずDBやRedisに置けないか検討する(プロセスが増えても壊れない)</li>
        <li>どうしてもメモリを共有するなら → ロックの設計とテストに時間を割く覚悟をする</li>
      </Steps>

      <Heading num="まとめ">モデルはバグの種類を決める</Heading>
      <p>スレッドを選べば競合とデッドロックが、メッセージパッシングを選べば順序とキューの滞留が課題になります。どちらが楽かではなく、<strong>どちらの難しさなら自分たちが扱えるか</strong>で選ぶのが実務的です。Webアプリの多くは「I/Oはイベントループ、重い処理はキュー、状態はDB」で足ります。最後に、その構成で実際に使う実装パターンを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/concurrency/patterns" tag="実装">実装パターン</RelatedLink>
            <RelatedLink href="/dev/backend/node" tag="バックエンド">Node.jsの運用特性</RelatedLink>
            <RelatedLink href="/os/process" tag="OS">プロセスとスレッド</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
