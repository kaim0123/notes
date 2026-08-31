import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "プロファイリング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>プロファイリング ― 遅い場所を推測しない</h1>
        <Lead>
          不具合の原因を追う手順は<Link href="/dev/debug">デバッグと性能改善</Link>で扱いました。ここでは「動くが遅い」を対象にします。性能改善で最も多い失敗は、<Term>遅いと思い込んだ場所を直して、何も変わらないこと</Term>です。測ってから直す、その測り方を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">最初にやること ― どの段が遅いかを分ける</Heading>
      <p>
        いきなりプロファイラを起動する前に、遅さがどの段にあるかを切り分けます。
      </p>

      <table>
        <thead>
          <tr><th>段</th><th>測るもの</th><th>道具</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ブラウザ</td>
            <td>描画・スクリプト・読み込み</td>
            <td>開発者ツール</td>
          </tr>
          <tr>
            <td className="hl">ネットワーク</td>
            <td>往復回数、転送量</td>
            <td>開発者ツール、トレース</td>
          </tr>
          <tr>
            <td className="hl">アプリケーション</td>
            <td>関数ごとのCPU時間、待ち時間</td>
            <td>プロファイラ、分散トレーシング</td>
          </tr>
          <tr>
            <td className="hl">データベース</td>
            <td>問い合わせの実行計画、待ち</td>
            <td>
              実行計画の確認、<Link href="/database/performance">遅い問い合わせのログ</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">インフラ</td>
            <td>CPU・メモリ・ディスクの飽和</td>
            <td>サーバー監視</td>
          </tr>
        </tbody>
      </table>

      <p>
        1リクエストの合計時間の内訳が分かるだけで、調査対象は1つの段に絞られます。Webアプリでは<Term>データベースが原因である割合が圧倒的に高い</Term>ため、そこから確認するのが現実的です(<Link href="/language/compare">時間の内訳</Link>)。
      </p>

      <Heading num="02">プロファイラの2方式</Heading>

      <table>
        <thead>
          <tr><th></th><th>サンプリング型</th><th>計装型</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">やり方</td>
            <td>一定間隔で「いまどこを実行中か」を記録する</td>
            <td>関数の出入りをすべて記録する</td>
          </tr>
          <tr>
            <td className="hl">オーバーヘッド</td>
            <td>小さい。本番でも使える</td>
            <td>大きい。結果が歪むことがある</td>
          </tr>
          <tr>
            <td className="hl">精度</td>
            <td>統計的。短時間の処理は取りこぼす</td>
            <td>正確。呼び出し回数も分かる</td>
          </tr>
          <tr>
            <td className="hl">向く用途</td>
            <td>「どこが重いか」の全体把握</td>
            <td>特定範囲の詳細な分析</td>
          </tr>
        </tbody>
      </table>

      <p>
        まずサンプリングで全体を見て、当たりが付いたら計装で詳細を見る ― この順が定石です。
      </p>

      <Heading num="03">フレームグラフの読み方</Heading>
      <p>
        <Term>フレームグラフ</Term>はプロファイル結果の標準的な可視化です。読み方の要点は3つだけです。
      </p>

      <DiagramFrame
        slug="dev-debug-flamegraph"
        aspect="640 / 290"
        caption="フレームグラフの読み方。横軸は時間の割合で、広い箱ほど多くの時間を使っている。縦は呼び出しの深さで、上に積まれた箱は下から呼び出された関数を表す。図では処理Bが62%を占め、その上にさらに深い呼び出しが積まれ、最上段の平らで広い箱が実際にCPUを使っている場所になる。読むときは横幅だけを見て、上に何も積まれていない広い箱を探す。左右の並び順に意味はない。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>横幅 = 時間</h4>
          <p>
            広い箱ほど、そこで多くの時間を使っています。<Term>横幅だけを見ます</Term>。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>縦 = 呼び出しの深さ</h4>
          <p>
            上に積まれているのは呼び出された関数。深さ自体は速度と無関係です。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>平らな頂上を探す</h4>
          <p>
            上に何も積まれていない広い箱が、実際にCPUを使っている場所です。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>左右の順序に意味はない</h4>
          <p>多くの実装では名前順に並ぶだけで、時系列ではありません。</p>
        </Card>
      </CardGrid>

      <Heading num="04">CPU時間と待ち時間は別物</Heading>
      <p>
        <Link href="/language/runtime">I/O主体のアプリ</Link>では、CPUプロファイルを見ても<Term>何も写らない</Term>ことがあります。時間の大半が「待ち」だからです。
      </p>

      <table>
        <thead>
          <tr><th>症状</th><th>疑うもの</th><th>測り方</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">CPU使用率が低いのに遅い</td>
            <td>DB・外部API・ロック待ち</td>
            <td>分散トレーシング、各処理の所要時間ログ</td>
          </tr>
          <tr>
            <td className="hl">CPU使用率が高い</td>
            <td>
              重い計算、巨大なパース、<Link href="/language/regex">正規表現</Link>
            </td>
            <td>CPUプロファイラ</td>
          </tr>
          <tr>
            <td className="hl">応答が突然詰まる</td>
            <td>
              GC、<Link href="/language/concurrency-deadlock">プール枯渇</Link>、イベントループのブロック
            </td>
            <td>イベントループ遅延、GCログ、プール指標</td>
          </tr>
          <tr>
            <td className="hl">徐々に遅くなる</td>
            <td>
              <Link href="/language/memory">メモリリーク</Link>、キャッシュの肥大化
            </td>
            <td>ヒープスナップショットの差分</td>
          </tr>
        </tbody>
      </table>

      <p>
        この切り分けを飛ばすと、「プロファイルを取ったが平坦で何も分からない」で止まります。<Term>まず待ちか計算かを決める</Term>のが先です。
      </p>

      <Heading num="05">メモリを測る</Heading>
      <p>メモリの問題は、時間軸で見ないと分かりません。</p>

      <Steps>
        <li>使用量を継続的に監視する ― 右肩上がりならリークを疑う</li>
        <li>安定した状態でヒープスナップショットを取る</li>
        <li>しばらく負荷をかけた後、もう一度取る</li>
        <li>2点の差分で、増えているオブジェクトの種類を見る</li>
        <li>その保持元をたどり、なぜ解放されないかを特定する</li>
      </Steps>

      <p>
        よくある保持元は、モジュールスコープの入れ物、解除していないイベントリスナ、止めていないタイマーです(<Link href="/language/js-engine">クロージャと参照</Link>)。
      </p>

      <Heading num="06">本番で測る</Heading>
      <p>
        性能問題の多くは、本番のデータ量・並行数・キャッシュ状態でしか再現しません。だから<Term>本番で測れること自体が能力</Term>になります。常時サンプリングして後から期間を指定して分析する仕組みや、1リクエストの内訳を可視化する分散トレーシングが、そのための道具です。
      </p>

      <Aside label="測る前に、直してはいけない">
        性能改善で最も多い失敗は、<Term>遅いと思い込んだ場所を直して何も変わらないこと</Term>です。しかもその変更でコードは複雑になり、以後の変更が難しくなります。1か所直したら測り直し、効果が無ければ<Term>元に戻す</Term> ―
        これを徹底するだけで、性能改善は失敗しにくくなります。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>段で切り分けてから測る</h4>
          <p>
            どの段が遅いかを先に決めます。Webアプリではまずデータベースを疑います。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>待ちか計算かを決める</h4>
          <p>
            待ちが支配的ならCPUプロファイルには何も写りません。道具を選び分けます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>1つ直して測り直す</h4>
          <p>効果が無ければ元に戻します。複雑さだけが残るのを避けます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/debug-profiling" />
    </DocsPage>
  );
}
