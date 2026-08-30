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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "並行処理の全体像",
};

const topics = [
  {
    href: "/dev/concurrency/race",
    title: "競合状態とデータ競合",
    desc: "同じデータを同時に触ると何が起きるか ― 読んで書くまでの隙間",
  },
  {
    href: "/dev/concurrency/lock",
    title: "排他制御",
    desc: "ミューテックス・セマフォと、Web開発で実際に使う4つの排他手段",
  },
  {
    href: "/dev/concurrency/deadlock",
    title: "デッドロックと枯渇",
    desc: "止まって動かなくなる4条件と、予防・検出・回復",
  },
  {
    href: "/dev/concurrency/models",
    title: "並行モデル",
    desc: "スレッド・イベントループ・コルーチン・アクター ― 何を選ぶか",
  },
  {
    href: "/dev/concurrency/patterns",
    title: "実装パターン",
    desc: "並列度制御・キャンセル・バックプレッシャー・冪等性",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 並行処理</Eyebrow>
        <h1>並行処理の全体像 ― 同時に走らせると何が壊れるのか</h1>
        <Lead>
          1件ずつ順番に処理していたコードを「同時に走らせる」ようにした瞬間、それまで正しかったロジックが正しくなくなります。在庫が1つしかないのに2人に売れてしまう、メールが2通届く、たまにだけテストが落ちる ―
          原因はほぼ例外なく並行処理です。ここでは並行と並列の違いから、何が壊れるのか、どの実行モデルを選ぶのかまで、このセクション全体の地図を描きます。
        </Lead>
      </Hero>

      <p>「<Link href="/os/process">プロセスとスレッド</Link>」ではOSがCPUをどう分け合うかを、「<Link href="/dev/language/async">第7章 非同期処理</Link>」ではJavaScriptでPromiseをどう書くかを見ました。このセクションはその間を埋めるものです ― <strong>アプリケーションを書く側が、同時実行をどう設計し、どう壊さないか</strong>を扱います。</p>

      <Heading num="01">並行(concurrency)と並列(parallelism)は別物</Heading>
      <p>この2つは日本語ではどちらも「同時」と訳されがちですが、意味が違います。</p>
      <table>
        <tbody>
          <tr><th></th><th>並行(concurrency)</th><th>並列(parallelism)</th></tr>
          <tr><td className="hl">意味</td><td>複数の処理を<strong>扱っている</strong>状態(進行中の仕事が複数ある)</td><td>複数の処理が<strong>本当に同時に走っている</strong>状態</td></tr>
          <tr><td className="hl">必要なもの</td><td>CPUは1コアでも成立する</td><td>複数コア(または複数マシン)が必須</td></tr>
          <tr><td className="hl">主な目的</td><td>待ち時間を無駄にしない(応答性)</td><td>計算そのものを速くする(スループット)</td></tr>
          <tr><td className="hl">典型例</td><td>Node.jsのイベントループ、OSのタイムスライス</td><td>マルチコアでの画像変換、分散バッチ</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        コック1人が3つの鍋を見て回り、煮えるのを待つ間に別の鍋を混ぜるのが<strong>並行</strong>です。コックが3人いて3つの鍋を同時に扱うのが<strong>並列</strong>。前者は「待ち時間の活用」、後者は「手の数を増やす」ことで速くします。
      </Analogy>
      <Diagram caption="並行は切り替えて進める。並列は本当に同時に進む">
        <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <text x={10} y={20} fill="#9a9a9a" fontSize="12">並行(1コア)</text>
          <rect x={10} y={30} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={45} y={45} fill="#f2f2f2" fontSize="11" textAnchor="middle">A</text>
          <rect x={80} y={30} width={70} height={22} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={115} y={45} fill="#f2f2f2" fontSize="11" textAnchor="middle">B</text>
          <rect x={150} y={30} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={185} y={45} fill="#f2f2f2" fontSize="11" textAnchor="middle">A</text>
          <rect x={220} y={30} width={70} height={22} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={255} y={45} fill="#f2f2f2" fontSize="11" textAnchor="middle">B</text>
          <text x={10} y={100} fill="#9a9a9a" fontSize="12">並列(2コア)</text>
          <rect x={10} y={110} width={200} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={110} y={125} fill="#f2f2f2" fontSize="11" textAnchor="middle">A</text>
          <rect x={10} y={140} width={200} height={22} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={110} y={155} fill="#f2f2f2" fontSize="11" textAnchor="middle">B</text>
          <line x1={10} y1={180} x2={410} y2={180} stroke="#5f5f5f" strokeWidth="1" />
          <text x={410} y={195} fill="#9a9a9a" fontSize="11" textAnchor="end">時間 →</text>
        </svg>
      </Diagram>
      <p>重要なのは、<strong>バグの原因になるのは「並行」の方だ</strong>ということです。1コアで切り替えているだけでも、処理の途中で中断されればデータは壊れます。「うちは1プロセスだから安全」は成り立ちません。</p>

      <Heading num="02">なぜ並行にするのか ― 待ち時間の桁が違う</Heading>
      <p>Webアプリの処理時間の大半は「計算」ではなく「<strong>待ち</strong>」です。桁を並べると理由がはっきりします。</p>
      <table>
        <tbody>
          <tr><th>操作</th><th>おおよその時間</th><th>人間の感覚に直すと</th></tr>
          <tr><td className="hl">メモリ参照</td><td>約100ナノ秒</td><td>1秒</td></tr>
          <tr><td className="hl">SSD読み取り</td><td>約100マイクロ秒</td><td>約17分</td></tr>
          <tr><td className="hl">同一リージョン内のDB問い合わせ</td><td>約1ミリ秒</td><td>約3時間</td></tr>
          <tr><td className="hl">外部APIの呼び出し</td><td>約100ミリ秒</td><td>約12日</td></tr>
        </tbody>
      </table>
      <p>外部APIを3回順番に呼べば300ミリ秒かかりますが、その間CPUはほぼ何もしていません。ここで別のリクエストを進められれば、同じマシンで何倍もの利用者をさばけます。これが<Term>I/Oバウンド</Term>な処理を並行化する動機です。</p>
      <p>一方、画像変換や集計のようにCPUを使い切る処理は<Term>CPUバウンド</Term>と呼び、こちらは<strong>並列化(コアを増やす)</strong>でしか速くなりません。どちらの性質かで打つ手が変わるので、まずここを見極めます。</p>

      <Heading num="03">並行にしても速くならないことがある</Heading>
      <p>並列化で得られる高速化には理論上の上限があります。<Term>アムダールの法則</Term>は、処理のうち並列化できない直列部分の割合を <code>s</code> とすると、コアを無限に増やしても速度向上は <code>1 / s</code> 倍で頭打ちになることを示します。</p>
      <table>
        <tbody>
          <tr><th>直列部分の割合</th><th>4コア</th><th>16コア</th><th>無限のコア</th></tr>
          <tr><td className="hl">5%</td><td>約3.5倍</td><td>約9.1倍</td><td>20倍</td></tr>
          <tr><td className="hl">20%</td><td>約2.5倍</td><td>約4.0倍</td><td>5倍</td></tr>
          <tr><td className="hl">50%</td><td>約1.6倍</td><td>約1.9倍</td><td>2倍</td></tr>
        </tbody>
      </table>
      <p>さらに現実には、スレッド生成・<Link href="/os/process">コンテキストスイッチ</Link>・ロックの取得待ちといった<Term>オーバーヘッド</Term>が加算されます。処理が十分に小さいと、並行化したほうが遅くなることさえあります。</p>
      <Aside label="先に測る">
        並行化はコードの難易度を一段引き上げます。導入する前に「どこで何ミリ秒待っているのか」を計測し、待ちが支配的であることを確認してください。ボトルネックが1本の遅いSQLなら、<Link href="/database/performance">インデックスを直すほうが</Link>ずっと安全で効果的です。
      </Aside>

      <Heading num="04">4つの実行モデル</Heading>
      <p>「同時に進める」実現方法は大きく4つです。詳しくは「<Link href="/dev/concurrency/models">並行モデル</Link>」で扱いますが、まず全体像を押さえます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>マルチプロセス</h4>
          <p>独立したメモリ空間を持つプロセスを複数動かす。安全だが生成コストが高く、データ共有にはIPCが要る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>マルチスレッド</h4>
          <p>1プロセス内で複数スレッドがメモリを共有する。速いがデータ競合が起きやすく、ロックが必要。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>イベントループ</h4>
          <p>単一スレッドで「待ちが発生したら別の仕事へ」を繰り返す。ロック不要だが、重い計算を書くと全部止まる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>コルーチン(軽量スレッド)</h4>
          <p>OSではなくランタイムが切り替える極小の実行単位。数万個作れる。async/await・goroutineがこれにあたる。</p>
        </Card>
      </CardGrid>
      <p>Node.jsは③を基本とし、必要に応じて①(<code>cluster</code> / 複数コンテナ)や②(<code>worker_threads</code>)を足す構成が定番です。</p>

      <Heading num="05">難しさの根源 ― 共有するか、渡すか</Heading>
      <p>並行処理の難易度を決めているのは、実行モデルよりも<strong>状態をどう扱うか</strong>です。</p>
      <table>
        <tbody>
          <tr><th></th><th>共有メモリ方式</th><th>メッセージパッシング方式</th></tr>
          <tr><td className="hl">やり方</td><td>同じデータを複数の実行単位が直接読み書きする</td><td>データのコピーを送り合い、状態は所有者だけが触る</td></tr>
          <tr><td className="hl">速度</td><td>速い(コピーしない)</td><td>コピーと通信のコストがかかる</td></tr>
          <tr><td className="hl">安全性</td><td>ロックを正しく使わないと壊れる</td><td>競合が原理的に起きにくい</td></tr>
          <tr><td className="hl">代表例</td><td>Javaのスレッド、C++、共有メモリIPC</td><td>Erlangのアクター、Goのチャネル、ジョブキュー</td></tr>
        </tbody>
      </table>
      <p>Goの標語「メモリを共有して通信するのではなく、通信によってメモリを共有せよ」は、後者を選べという主張です。実務でも<strong>まず共有をやめられないかを考える</strong>のが最短ルートで、ロックはそれが無理なときの手段です。</p>

      <Heading num="06">壊れ方は3種類しかない</Heading>
      <p>並行処理の不具合は、見た目は千差万別でも、分類すると次の3つに収まります。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>競合状態(race condition)</h4>
          <p>結果が実行順序に依存してしまう。在庫の二重販売、カウンタのずれ、通知の重複。→ <Link href="/dev/concurrency/race">詳細</Link></p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>デッドロック</h4>
          <p>互いに相手が持つ資源を待ち、永久に進まない。DBのトランザクション、コネクションプールの枯渇。→ <Link href="/dev/concurrency/deadlock">詳細</Link></p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スタベーション(飢餓)</h4>
          <p>動いてはいるが、特定の処理にいつまでも順番が回らない。優先度の偏り、ロングポーリングの占有。</p>
        </Card>
      </CardGrid>
      <p>この3つはいずれも<strong>「タイミングが合ったときだけ」</strong>起きるため、ローカルでは再現せず、本番の負荷時に初めて姿を現します。設計段階で潰すしかない類のバグです。</p>

      <Heading num="07">「JavaScriptは単一スレッドだから安全」は誤り</Heading>
      <p>Node.jsのJavaScriptは1本のスレッドで動くため、C言語のような<Term>データ競合</Term>(同じメモリを同時に書き換える)は起きません。しかし<strong>競合状態は普通に起きます</strong>。理由は3つです。</p>
      <table>
        <tbody>
          <tr><th>理由</th><th>何が起きるか</th></tr>
          <tr><td className="hl"><code>await</code> は中断点</td><td><code>await</code> のたびに他のリクエストの処理が割り込む。「読んでから書くまで」の間に別の誰かが書き換えられる</td></tr>
          <tr><td className="hl">プロセスは1つではない</td><td>本番ではPM2やコンテナで同じアプリが何個も動く。プロセス内の変数やロックは他プロセスに効かない</td></tr>
          <tr><td className="hl">状態はDBにある</td><td>本当の共有資源はアプリのメモリではなくデータベース。競合はそこで起きる</td></tr>
        </tbody>
      </table>
      <p>つまりWebアプリの並行制御は、多くの場合<strong>言語のロックではなくDBの機能で行う</strong>ことになります。この現実的な対処は「<Link href="/dev/concurrency/lock">排他制御</Link>」で詳しく扱います。</p>

      <Heading num="まとめ">このセクションの歩き方</Heading>
      <p>並行処理は「速くするための技術」であると同時に、「壊さないための技術」です。以下の順に読むと、原因(競合)→対処(排他)→対処の副作用(デッドロック)→そもそもの設計(モデル)→実務の型(パターン)という流れになります。</p>
      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/os/process" tag="OS">プロセスとスレッド</RelatedLink>
            <RelatedLink href="/dev/language/async" tag="実装">第7章 非同期処理</RelatedLink>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
