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
  title: "並行モデル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>並行モデル ― スレッド・イベントループ・アクター</h1>
        <Lead>
          「同時に走らせる」の実現方法は1つではありません。スレッドとロックで真正面から取り組む言語もあれば、そもそも状態を共有させない言語もあります。どのモデルを選ぶかで、書けるコードの形も、起こりうるバグの種類も変わります。
        </Lead>
      </Hero>

      <Heading num="01">系統は2つ ― 共有するか、送るか</Heading>
      <p>数あるモデルも、状態の扱い方で見れば2系統に分かれます。</p>

      <DiagramFrame
        slug="language-concurrency-models"
        aspect="640 / 300"
        caption="4つの並行モデルを、状態の扱い方で2系統に分けた図。左の共有メモリ系では複数のスレッドが同じデータを直接読み書きし、順番をロックで整理する。正しさはプログラマ次第で、典型的なバグは競合状態とデッドロック。右のメッセージパッシング系ではデータを持つのは1人だけで、他はメッセージで依頼するため競合が原理的に起きず、課題は順序・欠落・キューの滞留になる。中央下のイベントループとコルーチンはスレッドを1本に保ったまま待ち時間を活用する方式。"
      />

      <table>
        <thead>
          <tr>
            <th></th>
            <th>共有メモリ系</th>
            <th>メッセージパッシング系</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">発想</td>
            <td>同じデータをみんなで直接触り、順番をロックで整理する</td>
            <td>データを持つのは1人だけ。他はメッセージで依頼する</td>
          </tr>
          <tr>
            <td className="hl">正しさの担保</td>
            <td>プログラマがロックを正しく使うこと</td>
            <td>構造上、同時アクセスが起きないこと</td>
          </tr>
          <tr>
            <td className="hl">典型的なバグ</td>
            <td>競合状態・デッドロック</td>
            <td>メッセージの順序・欠落・キューの滞留</td>
          </tr>
          <tr>
            <td className="hl">代表</td>
            <td>スレッド + ロック(Java・C++・C#)</td>
            <td>アクター(Erlang)・チャネル(Go)・ジョブキュー</td>
          </tr>
        </tbody>
      </table>

      <p>
        後者はバグが起きにくい代わりに、データのコピーや通信のコストを払います。Webアプリのようにプロセスをまたいで動くシステムでは、そもそも共有メモリが使えないため、自然と後者の形になります。
      </p>

      <Heading num="02">スレッド + ロック ― 素朴で強力、そして難しい</Heading>
      <p>
        OSのスレッドを直接使い、共有データをロックで守る古典的なモデルです。CPUコアを素直に使い切れるため計算処理に強く、多くの言語の基本形になっています。
      </p>
      <p>
        弱点は2つ。ひとつは<Term>正しく書くのが難しい</Term>こと、もうひとつは<Term>数を増やせない</Term>ことです。OSスレッドは1本あたり数百KBから1MB程度のスタックを持ち、生成も<Link href="/computer/os-process">コンテキストスイッチ</Link>も高コストなので、1万接続に1万スレッドを割り当てる使い方はできません。
      </p>

      <Aside label="C10K問題">
        「1台のサーバーで同時1万接続をどうさばくか」という問題は、1接続=1スレッドという素朴なモデルの限界から生まれました。この課題への回答が、次に見るイベントループと軽量スレッドです。
      </Aside>

      <Heading num="03">イベントループ ― 1本のスレッドで待たない</Heading>
      <p>
        Node.jsやブラウザが採用するモデルです。スレッドは1本だけ。I/Oを開始したら結果を待たずに次の仕事へ移り、準備ができたものからコールバックを実行します(<Link href="/language/js-async">非同期処理</Link>)。
      </p>
      <p>
        共有メモリを複数スレッドが触らないため、ロックが要らないのが最大の利点です。一方で<Term>1本のスレッドを止めるとすべてが止まります</Term>。巨大なJSONのパース、同期的なファイル読み込み、重いループ ―
        こうしたCPU処理を書くと、その間すべてのリクエストが待たされます。
      </p>
      <p>
        したがってNode.jsの設計指針は明快です ―
        <Term>I/Oは並行に、CPU処理は外に出す</Term>。
      </p>

      <Heading num="04">コルーチン・軽量スレッド ― 数万個作れる実行単位</Heading>
      <p>
        OSではなく<Term>言語ランタイムが</Term>切り替えを担当する、極めて軽い実行単位です。スタックは数KBから始まり、必要に応じて伸びます。生成コストが低いため、接続ごと・リクエストごとに1つ作れます。
      </p>

      <table>
        <thead>
          <tr>
            <th>言語</th>
            <th>呼び名</th>
            <th>特徴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">JavaScript</td>
            <td>async関数(Promise)</td>
            <td>
              <code>await</code>で中断・再開する。切り替え点がコード上に明示される
            </td>
          </tr>
          <tr>
            <td className="hl">Go</td>
            <td>goroutine</td>
            <td>ランタイムが複数のOSスレッドへ自動的に割り当てる</td>
          </tr>
          <tr>
            <td className="hl">Java</td>
            <td>仮想スレッド</td>
            <td>従来のスレッドAPIのまま軽量化。既存コードを活かせる</td>
          </tr>
          <tr>
            <td className="hl">Python</td>
            <td>asyncio</td>
            <td>イベントループ上で動く。CPU並列には制約がある</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        OSスレッドが「正社員(採用コストが高く、席も必要)」なら、コルーチンは「タスクごとの付箋」です。何万枚でも作れて、必要なときだけデスク(スレッド)に載せて処理します。
      </Analogy>

      <p>
        なお、<code>await</code>のように<Term>中断点が明示される</Term>方式を協調的、ランタイムが任意の場所で切り替える方式をプリエンプティブと呼びます。前者は「どこで割り込まれるか」が読めるため競合を追いやすく、後者は書きやすい代わりに割り込み位置が読めません。
      </p>

      <Heading num="05">アクターモデル ― 状態を1人に閉じ込める</Heading>
      <p>
        アクターは「自分の状態」と「受信箱」を持つ独立した実行単位です。他のアクターの状態を直接読み書きすることはできず、<Term>メッセージを送ることしかできません</Term>。各アクターはメッセージを1件ずつ順番に処理するため、その内部では並行性を考える必要がありません。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>競合が起きない</h4>
          <p>状態を触れるのは自分だけ。ロックという概念自体が不要になります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>分散に自然に伸びる</h4>
          <p>
            メッセージ送信は相手が別マシンでも同じ形。スケールアウトしやすい構造です。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>障害を隔離できる</h4>
          <p>1つが落ちても他は動き続け、監視役が再起動します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>代わりに難しくなること</h4>
          <p>
            処理が非同期になり、順序保証・タイムアウト・受信箱の滞留を自分で設計する必要があります。
          </p>
        </Card>
      </CardGrid>

      <p>
        発想自体はWebアプリでもそのまま使えます ―
        <Term>対象ごとにジョブキューを分け、1件ずつ処理する</Term>のは小さなアクターモデルです。
      </p>

      <Heading num="06">CSPとチャネル ― 通信そのものを設計する</Heading>
      <p>
        Goが採用する<Term>CSP</Term>では、実行単位ではなく<Term>チャネル(通信路)</Term>が主役になります。送り手と受け手はチャネルを介してのみやり取りし、互いを直接は知りません。
      </p>

      <pre>
        <code>{`// Go ― 3つのワーカーが同じチャネルから仕事を取り、結果を別のチャネルへ返す
jobs := make(chan Job, 100)
results := make(chan Result, 100)
for w := 0; w < 3; w++ {
    go worker(jobs, results)
}`}</code>
      </pre>

      <p>
        バッファ付きチャネルは、そのままキューとして働きます。受け手が遅ければ送り手がブロックされるため、<Term>バックプレッシャー</Term>が言語機能として自然に手に入るのがCSPの強みです。
      </p>

      <Heading num="07">JavaScript・TypeScript での選択肢</Heading>

      <table>
        <thead>
          <tr>
            <th>手段</th>
            <th>実体</th>
            <th>向いている用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">async / await</td>
            <td>単一スレッド上の並行</td>
            <td>DB・API呼び出しなどI/O待ちの重ね合わせ</td>
          </tr>
          <tr>
            <td className="hl">worker_threads</td>
            <td>同一プロセス内の別スレッド</td>
            <td>画像処理・暗号計算などCPUバウンドな処理</td>
          </tr>
          <tr>
            <td className="hl">Web Worker</td>
            <td>ブラウザの別スレッド</td>
            <td>UIを止めずに重い計算をする</td>
          </tr>
          <tr>
            <td className="hl">複数プロセス・複数コンテナ</td>
            <td>別プロセス</td>
            <td>コア数に合わせてサーバーをスケールさせる</td>
          </tr>
          <tr>
            <td className="hl">child_process</td>
            <td>別プログラムの起動</td>
            <td>外部コマンドの実行</td>
          </tr>
          <tr>
            <td className="hl">ジョブキュー + ワーカー</td>
            <td>別プロセス・別マシン</td>
            <td>時間のかかる処理をリクエストから切り離す</td>
          </tr>
        </tbody>
      </table>

      <p>
        ワーカースレッドとメインスレッドの間はメッセージパッシング(値のコピー)が基本で、共有メモリを使いたい場合のみ<code>SharedArrayBuffer</code>と<code>Atomics</code>を使います ―
        ただしこれは共有メモリ系のモデルに戻ることを意味し、<Link href="/language/concurrency-race">データ競合</Link>の危険も戻ってきます。
      </p>

      <Heading num="08">どう選ぶか</Heading>
      <p>
        判断の軸は2つだけです ―
        <Term>待っているのか、計算しているのか</Term>。そして<Term>状態を共有する必要があるのか</Term>。
      </p>

      <Steps>
        <li>
          処理の大半がI/O待ちなら → <code>async</code>/<code>await</code>で十分。並列度の上限だけ決める
        </li>
        <li>
          CPUを使い切る処理があるなら → ワーカースレッド、または別プロセスへ切り出す
        </li>
        <li>リクエストより長く生きる処理なら → ジョブキューに載せる</li>
        <li>
          状態を共有したいなら → まずDBやRedisに置けないか検討する
        </li>
        <li>
          どうしてもメモリを共有するなら → ロックの設計とテストに時間を割く覚悟をする
        </li>
      </Steps>

      <Heading num="まとめ">モデルはバグの種類を決める</Heading>
      <p>
        スレッドを選べば競合とデッドロックが、メッセージパッシングを選べば順序とキューの滞留が課題になります。どちらが楽かではなく、<Term>どちらの難しさなら自分たちが扱えるか</Term>で選ぶのが実務的です。Webアプリの多くは「I/Oはイベントループ、重い処理はキュー、状態はDB」で足ります。最後に、その構成で実際に使う<Link href="/language/concurrency-patterns">実装パターン</Link>を見ていきます。
      </p>

      <DocsFooter href="/language/concurrency-models" />
    </DocsPage>
  );
}
