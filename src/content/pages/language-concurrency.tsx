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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "並行処理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>並行処理 ― 同時に走らせると、何が壊れるのか</h1>
        <Lead>
          1件ずつ順に処理していたコードを「同時に走らせる」ようにした瞬間、それまで正しかったロジックが正しくなくなります。在庫が1つしかないのに2人に売れる、通知が2通届く、たまにだけテストが落ちる ―
          原因はほぼ例外なく並行処理です。ここでは、なぜ同時に走らせるのか、何が壊れるのか、そして「単一スレッドだから安全」がなぜ誤りなのかを扱います。
        </Lead>
      </Hero>

      <p>
        <Link href="/computer/os-process">プロセスとスレッド</Link>ではOSがCPUをどう分け合うかを、<Link href="/language/js">JavaScript・TypeScript</Link>では<code>await</code>の書き方を見ました。このページはその間を埋めるもので、<Term>アプリケーションを書く側が、同時実行をどう設計し、どう壊さないか</Term>を扱います。
      </p>

      <Heading num="01">並行と並列は別のもの</Heading>
      <p>
        どちらも日本語では「同時」と訳されがちですが、意味が違います。混同すると打つ手を間違えるので、最初に分けておきます。
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>並行(concurrency)</th>
            <th>並列(parallelism)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">意味</td>
            <td>複数の処理を扱っている状態(進行中の仕事が複数ある)</td>
            <td>複数の処理が本当に同時に走っている状態</td>
          </tr>
          <tr>
            <td className="hl">必要なもの</td>
            <td>CPUは1コアでも成立する</td>
            <td>複数コア(または複数マシン)が必須</td>
          </tr>
          <tr>
            <td className="hl">主な目的</td>
            <td>待ち時間を無駄にしない(応答性)</td>
            <td>計算そのものを速くする(スループット)</td>
          </tr>
          <tr>
            <td className="hl">典型例</td>
            <td>Node.jsのイベントループ、OSのタイムスライス</td>
            <td>マルチコアでの画像変換、分散バッチ</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        コック1人が3つの鍋を見て回り、煮えるのを待つ間に別の鍋を混ぜるのが<strong>並行</strong>です。コックが3人いて3つの鍋を同時に扱うのが<strong>並列</strong>。前者は待ち時間の活用、後者は手の数を増やすことで速くします。
      </Analogy>

      <DiagramFrame
        slug="language-concurrency-vs-parallel"
        aspect="640 / 260"
        caption="並行と並列を時間軸で比べた図。上の並行(1コア)は、1本の時間軸の上で処理Aと処理Bが交互に切り替わりながら少しずつ進む。同時に走っているのは常に1つだが、待ちの間に別の処理へ切り替えるため全体としては複数を扱っている。下の並列(2コア)は、2本の時間軸それぞれで処理Aと処理Bが最初から最後まで同時に走る。バグの原因になるのは並行のほうで、1コアでも処理の途中で切り替われば壊れる。"
      />

      <p>
        押さえておきたいのは、<Term>バグの原因になるのは並行のほうだ</Term>ということです。1コアで切り替えているだけでも、処理の途中で中断されればデータは壊れます。「うちは1プロセスだから安全」は成り立ちません。
      </p>

      <Heading num="02">なぜ並行にするのか ― 待ちの桁が違う</Heading>
      <p>
        Webアプリの処理時間の大半は計算ではなく<Term>待ち</Term>です。桁を並べると、並行にする動機がはっきりします。
      </p>

      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>おおよその時間</th>
            <th>人間の感覚に直すと</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">メモリ参照</td>
            <td>約100ナノ秒</td>
            <td>1秒</td>
          </tr>
          <tr>
            <td className="hl">SSD読み取り</td>
            <td>約100マイクロ秒</td>
            <td>約17分</td>
          </tr>
          <tr>
            <td className="hl">同一リージョン内のDB問い合わせ</td>
            <td>約1ミリ秒</td>
            <td>約3時間</td>
          </tr>
          <tr>
            <td className="hl">外部APIの呼び出し</td>
            <td>約100ミリ秒</td>
            <td>約12日</td>
          </tr>
        </tbody>
      </table>

      <p>
        外部APIを3回順に呼べば300ミリ秒かかりますが、その間CPUはほぼ何もしていません。ここで別のリクエストを進められれば、同じマシンで何倍もの利用者をさばけます。これが<Term>I/Oバウンド</Term>な処理を並行化する理由です。一方、画像変換や集計のようにCPUを使い切る<Term>CPUバウンド</Term>な処理は、コアを増やす並列化でしか速くなりません。どちらの性質かを見極めるのが先です。
      </p>

      <Heading num="03">並行にしても速くならないことがある</Heading>
      <p>
        並列化で得られる高速化には理論上の上限があります。<Term>アムダールの法則</Term>は、並列化できない直列部分の割合を<code>s</code>とすると、コアを無限に増やしても速度向上は<code>1 / s</code>倍で頭打ちになることを示します。
      </p>

      <table>
        <thead>
          <tr>
            <th>直列部分の割合</th>
            <th>4コア</th>
            <th>16コア</th>
            <th>無限のコア</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">5%</td>
            <td>約3.5倍</td>
            <td>約9.1倍</td>
            <td>20倍</td>
          </tr>
          <tr>
            <td className="hl">20%</td>
            <td>約2.5倍</td>
            <td>約4.0倍</td>
            <td>5倍</td>
          </tr>
          <tr>
            <td className="hl">50%</td>
            <td>約1.6倍</td>
            <td>約1.9倍</td>
            <td>2倍</td>
          </tr>
        </tbody>
      </table>

      <p>
        さらに現実には、スレッド生成・コンテキストスイッチ・ロックの取得待ちといった<Term>オーバーヘッド</Term>が加算されます。処理が十分に小さければ、並行化したほうが遅くなることさえあります。
      </p>

      <Aside label="先に測る">
        並行化はコードの難易度を一段引き上げます。導入する前に「どこで何ミリ秒待っているのか」を計測し、待ちが支配的であることを確認してください。ボトルネックが1本の遅いSQLなら、<Link href="/database/performance">索引を直すほう</Link>がずっと安全で効果的です。
      </Aside>

      <Heading num="04">同時に進める4つのやり方</Heading>
      <p>
        実現方法は大きく4つです。どれを選ぶかで、書けるコードの形と気をつける場所が変わります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>マルチプロセス</h4>
          <p>
            独立したメモリ空間を持つプロセスを複数動かす。壊れにくいが生成コストが高く、データ共有にはプロセス間通信が要ります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>マルチスレッド</h4>
          <p>
            1プロセス内で複数スレッドがメモリを共有する。速い代わりにデータ競合が起きやすく、ロックが必要になります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>イベントループ</h4>
          <p>
            単一スレッドで「待ちが出たら別の仕事へ」を繰り返す。ロック不要ですが、重い計算を書くと全部止まります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>コルーチン</h4>
          <p>
            OSではなくランタイムが切り替える軽量な実行単位。数万個作れます。async/awaitやgoroutineがこれにあたります。
          </p>
        </Card>
      </CardGrid>

      <p>
        Node.jsは③を基本とし、必要に応じて①(複数プロセス・複数コンテナ)や②(<code>worker_threads</code>)を足す構成が定番です。
      </p>

      <Heading num="05">難しさの根源は、状態を共有するかどうか</Heading>
      <p>
        難易度を決めているのは実行モデルよりも<Term>状態の扱い方</Term>です。
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>共有メモリ方式</th>
            <th>メッセージパッシング方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">やり方</td>
            <td>同じデータを複数の実行単位が直接読み書きする</td>
            <td>データのコピーを送り合い、状態は所有者だけが触る</td>
          </tr>
          <tr>
            <td className="hl">速度</td>
            <td>速い(コピーしない)</td>
            <td>コピーと通信のコストがかかる</td>
          </tr>
          <tr>
            <td className="hl">安全性</td>
            <td>ロックを正しく使わないと壊れる</td>
            <td>競合が原理的に起きにくい</td>
          </tr>
          <tr>
            <td className="hl">代表例</td>
            <td>Javaのスレッド、C++、共有メモリIPC</td>
            <td>Erlangのアクター、Goのチャネル、ジョブキュー</td>
          </tr>
        </tbody>
      </table>

      <p>
        Goの標語「メモリを共有して通信するのではなく、通信によってメモリを共有せよ」は、後者を選べという主張です。実務でも<Term>まず共有をやめられないか</Term>を考えるのが最短ルートで、ロックはそれが無理なときの手段です。値を書き換えずに新しい値を作る<Link href="/design/paradigm-functional">関数型</Link>の作法が並行処理と相性がよいのも、共有する可変状態を減らせるからです。
      </p>

      <Heading num="06">壊れ方は3種類しかない</Heading>
      <p>
        症状は千差万別でも、分類すると次の3つに収まります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>競合状態</h4>
          <p>
            結果が実行順序に依存してしまう。在庫の二重販売、カウンタのずれ、通知の重複。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>デッドロック</h4>
          <p>
            互いに相手の持つ資源を待ち、永久に進まない。<Link href="/database/transaction">DBのトランザクション</Link>やコネクションプールの枯渇。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スタベーション</h4>
          <p>
            動いてはいるが、特定の処理にいつまでも順番が回らない。優先度の偏り、長時間の占有。
          </p>
        </Card>
      </CardGrid>

      <p>
        3つとも<Term>タイミングが合ったときだけ</Term>起きるため、手元では再現せず、本番の負荷時に初めて姿を現します。テストで見つけるのが難しく、設計段階で潰すしかない類のバグです。
      </p>

      <Heading num="07">「JavaScriptは単一スレッドだから安全」は誤り</Heading>
      <p>
        Node.jsのJavaScriptは1本のスレッドで動くため、同じメモリを同時に書き換える<Term>データ競合</Term>は起きません。しかし<Term>競合状態は普通に起きます</Term>。理由は3つです。
      </p>

      <table>
        <thead>
          <tr>
            <th>理由</th>
            <th>何が起きるか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>await</code>は中断点
            </td>
            <td>
              <code>await</code>のたびに他のリクエストが割り込む。読んでから書くまでの間に、別の誰かが書き換えられる
            </td>
          </tr>
          <tr>
            <td className="hl">プロセスは1つではない</td>
            <td>
              本番では同じアプリが複数プロセス・複数コンテナで動く。プロセス内の変数やロックは他プロセスに効かない
            </td>
          </tr>
          <tr>
            <td className="hl">状態はDBにある</td>
            <td>
              本当の共有資源はアプリのメモリではなくデータベース。競合はそこで起きる
            </td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="language-concurrency-await-gap"
        aspect="660 / 280"
        caption="単一スレッドのJavaScriptでも競合状態が起きることを、在庫1個の二重販売で示した図。リクエスト1が在庫を読み(残り1)、awaitでデータベースの応答を待っている間に、リクエスト2が同じ在庫を読む。リクエスト2から見ても在庫はまだ1なので、両方が販売可能と判断し、それぞれ在庫を1減らして注文を作る。結果、1個しかない在庫が2人に売れ、在庫はマイナス1になる。"
      />

      <p>
        つまりWebアプリの並行制御は、多くの場合<Term>言語のロックではなくDBの機能で行う</Term>ことになります。在庫を読んでから書くまでを1つの<Link href="/database/transaction">トランザクション</Link>に収める、更新時に条件を付けて競合したら失敗させる、といった手段が現実的な対処です。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>並行と並列を分ける</h4>
          <p>
            待ちが支配的なら並行、計算が支配的なら並列。測ってから決めます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>共有をやめるのが先</h4>
          <p>
            ロックは共有をやめられないときの手段。渡す設計にできないかを先に考えます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>単一スレッドでも競合する</h4>
          <p>
            <code>await</code>は中断点で、本当の共有資源はDB。制御はDB側で行うことになります。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/concurrency" />
    </DocsPage>
  );
}
