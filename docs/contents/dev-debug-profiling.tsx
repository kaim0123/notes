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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "プロファイリング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; デバッグ</Eyebrow>
        <h1>プロファイリング ― 遅い場所を推測しない</h1>
        <Lead>
          性能改善で最も多い失敗は、<strong>速くなっていない場所を頑張って速くする</strong>ことです。人間の直感は当たりません。処理時間の9割が1本のSQLだったという例はごく普通にあります。まず測り、支配的な要因を1つ見つけ、そこだけを直す ― その測り方を扱います。
        </Lead>
      </Hero>

      <p>不具合の原因を追う手順は「<Link href="/dev/debug">デバッグの技法</Link>」で扱いました。ここでは「動くが遅い」を対象にします。</p>

      <Heading num="01">最初にやること ― どこが遅いかを段で分ける</Heading>
      <p>いきなりプロファイラを起動する前に、遅さがどの段にあるかを切り分けます。</p>
      <table>
        <tbody>
          <tr><th>段</th><th>測るもの</th><th>道具</th></tr>
          <tr><td className="hl">ブラウザ</td><td>描画・スクリプト・読み込み</td><td>DevTools、<Link href="/dev/frontend/perf">Core Web Vitals</Link></td></tr>
          <tr><td className="hl">ネットワーク</td><td>往復回数、転送量、TLS、DNS</td><td>DevTools、trace</td></tr>
          <tr><td className="hl">アプリケーション</td><td>関数ごとのCPU時間、待ち時間</td><td>プロファイラ、<Link href="/dev/backend/ops/tracing">分散トレーシング</Link></td></tr>
          <tr><td className="hl">データベース</td><td>クエリの実行計画、待ち</td><td><code>EXPLAIN</code>、スロークエリログ</td></tr>
          <tr><td className="hl">インフラ</td><td>CPU・メモリ・ディスク・ネットワーク飽和</td><td><Link href="/infra/monitoring/server">インフラ監視</Link></td></tr>
        </tbody>
      </table>
      <p>1リクエストの合計時間の内訳が分かるだけで、調査対象は1つの段に絞られます。Webアプリでは<strong>データベースが原因である割合が圧倒的に高い</strong>ため、そこから確認するのが現実的です(「<Link href="/database/performance">パフォーマンスチューニング</Link>」)。</p>

      <Heading num="02">プロファイラの2方式</Heading>
      <table>
        <tbody>
          <tr><th></th><th>サンプリング型</th><th>計装(インストルメンテーション)型</th></tr>
          <tr><td className="hl">やり方</td><td>一定間隔で「いまどこを実行中か」を記録する</td><td>関数の出入りをすべて記録する</td></tr>
          <tr><td className="hl">オーバーヘッド</td><td><strong>小さい</strong>。本番でも使える</td><td>大きい。結果が歪むことがある</td></tr>
          <tr><td className="hl">精度</td><td>統計的。短時間の処理は取りこぼす</td><td>正確。呼び出し回数も分かる</td></tr>
          <tr><td className="hl">向く用途</td><td>「どこが重いか」の全体把握</td><td>特定範囲の詳細な分析</td></tr>
        </tbody>
      </table>
      <p>まずサンプリングで全体を見て、当たりが付いたら計装で詳細を見る ― この順が定石です。</p>

      <Heading num="03">フレームグラフの読み方</Heading>
      <p><Term>フレームグラフ</Term>はプロファイル結果の標準的な可視化です。読み方の要点は3つだけです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>横幅=時間</h4><p>広い箱ほど、そこで多くの時間を使っている。<strong>横幅だけを見る</strong>。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>縦=呼び出しの深さ</h4><p>上に積まれているのは呼び出された関数。深さ自体は速度と無関係。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>平らな頂上を探す</h4><p>上に何も積まれていない広い箱が、実際にCPUを使っている場所。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>左右の順序に意味はない</h4><p>多くの実装では名前順に並ぶだけ。時系列ではない。</p></Card>
      </CardGrid>
      <Analogy label="💡 たとえるなら">
        会社の経費を部門別に積み上げた棒グラフです。どの部門が幅を取っているかだけを見て、そこを掘る。組織の階層が深いこと自体は問題ではありません。
      </Analogy>

      <Heading num="04">CPU時間と待ち時間は別物</Heading>
      <p>Node.jsのようなI/O主体のアプリでは、CPUプロファイルを見ても<strong>何も写らない</strong>ことがあります。時間の大半が「待ち」だからです。</p>
      <table>
        <tbody>
          <tr><th>症状</th><th>疑うもの</th><th>測り方</th></tr>
          <tr><td className="hl">CPU使用率が低いのに遅い</td><td>DB・外部API・ロック待ち</td><td>分散トレーシング、各処理の所要時間ログ</td></tr>
          <tr><td className="hl">CPU使用率が高い</td><td>重い計算、JSONの巨大なパース、正規表現</td><td>CPUプロファイラ</td></tr>
          <tr><td className="hl">応答が突然詰まる</td><td>GC、<Link href="/dev/concurrency/deadlock">プール枯渇</Link>、イベントループのブロック</td><td>イベントループ遅延、GCログ、プール指標</td></tr>
          <tr><td className="hl">徐々に遅くなる</td><td><Link href="/dev/language-basics/memory">メモリリーク</Link>、キャッシュの肥大化</td><td>ヒープスナップショットの差分</td></tr>
        </tbody>
      </table>
      <p>この切り分けを飛ばすと、「CPUプロファイルを取ったが平坦で何も分からない」という状態で止まります。<strong>まず待ちか計算かを決める</strong>のが先です。</p>

      <Heading num="05">メモリを測る</Heading>
      <p>メモリの問題は、時間軸で見ないと分かりません。</p>
      <Steps>
        <li>使用量を継続的に監視する ― 右肩上がりならリークを疑う</li>
        <li>安定した状態でヒープスナップショットを取る</li>
        <li>しばらく負荷をかけた後、もう一度取る</li>
        <li><strong>2点の差分</strong>で増えているオブジェクトの種類を見る</li>
        <li>そのオブジェクトの<strong>保持元(retainer)</strong>をたどり、なぜ解放されないかを特定する</li>
      </Steps>
      <p>よくある保持元は、モジュールスコープの <code>Map</code>、解除していないイベントリスナ、止めていないタイマーです。</p>

      <Heading num="06">本番で測る</Heading>
      <p>性能問題の多くは、本番のデータ量・並行数・キャッシュ状態でしか再現しません。本番で測るための道具立てがあります。</p>
      <table>
        <tbody>
          <tr><th>手段</th><th>内容</th></tr>
          <tr><td className="hl">継続的プロファイリング</td><td>常時サンプリングし、期間を指定して後から分析する</td></tr>
          <tr><td className="hl">分散トレーシング</td><td>1リクエストの内訳(どの処理に何ms)を可視化する</td></tr>
          <tr><td className="hl">スロークエリログ</td><td>閾値を超えたSQLを記録する。最も費用対効果が高い</td></tr>
          <tr><td className="hl">パーセンタイル監視</td><td>平均ではなく p95 / p99 を見る(「<Link href="/infra/monitoring/data">監視データと統計</Link>」)</td></tr>
        </tbody>
      </table>
      <Aside label="平均を見ない">
        平均応答時間は、遅い一部の利用者を覆い隠します。100msが99回と10秒が1回なら平均は約200ms ですが、実際には<strong>10秒待たされた人がいる</strong>のです。改善対象はテール(p99)であることが多く、その原因はGC・ロック待ち・キャッシュミスといった<strong>たまに起きる事象</strong>です。
      </Aside>

      <Heading num="07">改善の進め方</Heading>
      <Steps>
        <li><strong>目標を決める</strong> ― 「速くする」ではなく「一覧APIの p95 を 800ms → 300ms」</li>
        <li><strong>現状を測る</strong> ― 改善前の数字を記録する。比較できなければ効果は語れない</li>
        <li><strong>支配的な要因を1つ選ぶ</strong> ― 全体の5%しか占めない処理を最適化しても、最大5%しか速くならない(<Link href="/theory/algorithms/complexity">アムダールの法則</Link>)</li>
        <li><strong>1つだけ変える</strong> ― 複数同時に変えると、何が効いたか分からない</li>
        <li><strong>測り直す</strong> ― 効果がなければ元に戻す。複雑さだけが残るのを避ける</li>
      </Steps>
      <p>効果の大きい打ち手は、たいてい微細な最適化ではありません ― <strong>N+1クエリの解消、インデックスの追加、不要な処理の削除、キャッシュの導入</strong>といった「やらなくてよい仕事を減らす」変更です。</p>

      <Heading num="08">ベンチマークの落とし穴</Heading>
      <table>
        <tbody>
          <tr><th>罠</th><th>内容</th></tr>
          <tr><td className="hl">ウォームアップ不足</td><td>JITが最適化する前の計測は実態と違う。数回空回ししてから測る</td></tr>
          <tr><td className="hl">最適化で消える</td><td>結果を使わない計算は削除されることがある。値を使う形にする</td></tr>
          <tr><td className="hl">1回だけ測る</td><td>ばらつきが大きい。複数回の分布で見る</td></tr>
          <tr><td className="hl">非現実的なデータ</td><td>10件で速くても、10万件では別の結果になる</td></tr>
          <tr><td className="hl">マイクロベンチの過信</td><td>関数単体が2倍速くても、全体の1%なら意味がない</td></tr>
        </tbody>
      </table>
      <p>本番相当の負荷で確かめる方法は「<Link href="/test/performance">性能テストと負荷テスト</Link>」で扱います。</p>

      <Heading num="まとめ">測る → 1つ直す → 測り直す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>推測しない</h4><p>直感は当たらない。支配的な要因は測ってから決める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>待ちか計算かを先に</h4><p>この切り分けを飛ばすと、プロファイルを見ても何も分からない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テールを見る</h4><p>平均は問題を隠す。p95・p99 が利用者の体験に近い。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/performance" tag="データベース">パフォーマンスチューニング</RelatedLink>
            <RelatedLink href="/dev/frontend/perf" tag="フロントエンド">表示速度を測って直す</RelatedLink>
            <RelatedLink href="/infra/monitoring/data" tag="インフラ">監視データと統計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
