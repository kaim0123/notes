import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "表示速度を測って直す" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>表示速度を測って直す ― 何を送らないかを決める</h1>
        <Lead>
          利用者が感じる遅さの多くは、描画の工夫が足りないからではなく<Term>そもそも送っているものが多すぎる</Term>ことから来ます。ここでは<Term>Core Web Vitals</Term>で現状を測り、コード分割・画像・フォントという「量」の問題に手を入れ、最後にCIで回帰を止めるまでを扱います。
        </Lead>
      </Hero>

      <Heading num="01">まず測る ― 推測で最適化しない</Heading>
      <p>
        「たぶんここが遅い」という直感は驚くほど当たりません。最適化は必ず計測から始めます。Googleが定めた<Term>Core Web Vitals</Term>は、体感を3つの側面から数値化したもので、チームの共通言語として使いやすい指標です。
      </p>

      <table>
        <thead>
          <tr><th>指標</th><th>測るもの</th><th>良好の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">LCP</td><td>主要なコンテンツが表示されるまでの時間</td><td>2.5秒以下</td></tr>
          <tr><td className="hl">INP</td><td>操作してから画面が反応するまでの時間</td><td>200ミリ秒以下</td></tr>
          <tr><td className="hl">CLS</td><td>読み込み中に画面がどれだけずれたか</td><td>0.1以下</td></tr>
          <tr><td className="hl">TTFB</td><td>最初の1バイトが届くまで(サーバーの応答速度)</td><td>0.8秒以下</td></tr>
          <tr><td className="hl">FCP</td><td>何かが最初に描画されるまで</td><td>1.8秒以下</td></tr>
        </tbody>
      </table>

      <p>
        この3つは<Term>それぞれ別の原因から悪化します</Term>。どれが悪いかを特定できれば、打ち手はほぼ自動的に決まります。
      </p>

      <DiagramFrame
        slug="frontend-perf-vitals"
        aspect="640 / 300"
        caption="Core Web Vitalsの3指標と、それぞれの原因・打ち手の対応。LCPは主要な内容が出るまでの時間で、原因は届くまでの重さ、打ち手は画像とフォントの見直し。INPは操作への反応で、原因はJavaScriptの実行時間、打ち手は長い処理を割り込ませないこと。CLSは表示中のずれで、原因は寸法の指定漏れ、打ち手は場所を先に予約すること。どの指標が悪いかを先に見れば、打ち手を探す必要がない。"
      />

      <Heading num="02">ラボとフィールド ― 2種類の計測</Heading>
      <p>
        計測には性質の異なる2つがあり、両方が要ります。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>手段</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ラボデータ</td>
            <td>Lighthouse、DevToolsのPerformanceタブ</td>
            <td>条件を揃えて再現できる。原因追跡に向くが、実際の利用者の速度ではない</td>
          </tr>
          <tr>
            <td className="hl">フィールドデータ</td>
            <td><code>web-vitals</code>ライブラリ、監視サービス</td>
            <td>本物の端末・回線での実測。改善の効果判定に使う</td>
          </tr>
        </tbody>
      </table>

      <p>
        開発機の速いCPUと光回線で測った数字は、古いスマートフォンと混雑した回線から見れば何倍も乖離します。DevToolsでCPUを4倍遅く、ネットワークを低速に絞って測るのが最低限の作法です。
      </p>

      <pre>
        <code>{`// 実利用者の値を集める(フィールド計測)
import { onLCP, onINP, onCLS } from "web-vitals";

const send = (metric: Metric) =>
  navigator.sendBeacon("/api/vitals", JSON.stringify(metric));

onLCP(send);
onINP(send);
onCLS(send);`}</code>
      </pre>

      <p>
        集めた値は<Term>平均ではなく75パーセンタイル</Term>で見ます。平均は少数の高速な環境に引っ張られ、「4人に1人が体験している遅さ」を隠してしまうからです。
      </p>

      <Heading num="03">送るJavaScriptを減らす</Heading>
      <p>
        JavaScriptは画像と違い、ダウンロードしたあとに<Term>解析と実行</Term>が必要です。同じ100KBでも払うコストがまるで違います。したがって最も効く改善は「軽くする」ではなく<Term>送らない</Term>ことです。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <Link href="/frontend/nextjs-components">Server Component</Link>にする
            </td>
            <td>そのコンポーネントのJSは1バイトも送られない。最も強力</td>
          </tr>
          <tr><td className="hl">コード分割(動的import)</td><td>初回に不要なものを、必要になった時点で読む</td></tr>
          <tr><td className="hl">依存の見直し</td><td>日付処理のために巨大なライブラリを入れていないか。<code>Intl</code>で足りることも多い</td></tr>
          <tr><td className="hl">Tree Shaking</td><td>使っていないエクスポートを除去する。名前空間まるごとのimportは妨げになる</td></tr>
        </tbody>
      </table>

      <p>
        コード分割は「初回表示に要らないもの」を切り出す作業です。モーダルの中身、リッチテキストエディタ、グラフ描画、管理者だけが使う画面 ― どれも開いた瞬間に読み込めば十分です。
      </p>

      <pre>
        <code>{`import dynamic from "next/dynamic";

// 重いエディタは、使う画面に来てから読み込む
const Editor = dynamic(() => import("@/components/editor"), {
  loading: () => <EditorSkeleton />,
  ssr: false, // ブラウザAPIに依存するならサーバーでは描画しない
});`}</code>
      </pre>

      <Aside label="犯人は自分のコードとは限らない">
        何が重いのかは必ず見てから判断します。バンドル解析のプラグインを入れてビルドすると、どのモジュールがどれだけ占めているかが面積で出ます。多くの場合、犯人は自分のコードではなく、意識せず入っていた1つの大きな依存です。<code>index.ts</code>で大量に再エクスポートするいわゆるバレルファイルも、1つimportしただけで芋づる式に全部を読ませることがあります。
      </Aside>

      <Heading num="04">画像とフォント ― 一番大きいものから</Heading>
      <p>
        ほとんどのページで、LCPの対象は<Term>大きな画像か見出しのテキスト</Term>です。つまり画像とフォントを直すことが、そのままLCPの改善になります。
      </p>

      <table>
        <thead>
          <tr><th>対象</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画像形式</td><td>WebP / AVIFに変換する。写真なら半分以下になることが多い</td></tr>
          <tr><td className="hl">画像サイズ</td><td>表示サイズに合わせて配信する。4000px幅の写真をサムネイルに使わない</td></tr>
          <tr><td className="hl">寸法の指定</td><td>幅と高さを必ず指定し、場所を予約する(CLS対策)</td></tr>
          <tr><td className="hl">遅延読み込み</td><td>画面外の画像は遅延読み込み。ただしLCP画像には付けない</td></tr>
          <tr><td className="hl">最初の1枚</td><td>ファーストビューの主役だけは優先的に読ませる</td></tr>
          <tr><td className="hl">フォント</td><td>サブセット化し、読み込み中も代替フォントで文字を見せる</td></tr>
        </tbody>
      </table>

      <p>
        Next.jsでは<code>next/image</code>と<code>next/font</code>がこの大半を自動化します。<code>next/font</code>はフォントファイルをビルド時に自分の配信元に取り込み、外部への接続を無くしたうえで、フォント切り替えによるずれを抑える指定まで生成します。
      </p>

      <Heading num="05">CLSを直す ― 場所を先に予約する</Heading>
      <p>
        CLSの原因は、ほぼ例外なく<Term>後から入ってくるものの場所を確保していない</Term>ことです。原因が限られているので、潰すのは難しくありません。
      </p>

      <table>
        <thead>
          <tr><th>原因</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画像・動画・埋め込み枠の寸法未指定</td><td>幅と高さ、または<code>aspect-ratio</code>を指定する</td></tr>
          <tr><td className="hl">読み込み後に挿入されるバナー</td><td>あらかじめ<code>min-height</code>で場所を空けておく</td></tr>
          <tr><td className="hl">フォント切り替えによる行の伸縮</td><td>寸法を合わせた代替フォントを指定する</td></tr>
          <tr>
            <td className="hl">読み込み中表示から本体への差し替え</td>
            <td>同じ寸法の<Link href="/frontend/react-boundary">スケルトン</Link>にする</td>
          </tr>
        </tbody>
      </table>

      <Heading num="06">INPを直す ― 長い処理を割り込ませない</Heading>
      <p>
        ブラウザのメインスレッドは1本です。そこで50ミリ秒を超える処理(<Term>ロングタスク</Term>)が走っている間、クリックもスクロールも一切反応しません。INPが悪いというのは、この詰まりが<Term>操作の瞬間に起きている</Term>ということです。
      </p>

      <table>
        <thead>
          <tr><th>症状</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クリック直後に重い計算をしている</td><td>反映を後回しにし、まず反応だけ返す</td></tr>
          <tr><td className="hl">一度に数千件を描画している</td><td>ページング、または表示範囲だけを描く仮想スクロール</td></tr>
          <tr><td className="hl">入力のたびに再計算・再取得している</td><td>デバウンス、遅延した値での再計算</td></tr>
          <tr><td className="hl">初期化処理が重い</td><td>起動時にまとめてやらず、必要になるまで遅らせる</td></tr>
          <tr><td className="hl">純粋に計算量が多い</td><td>Web Workerへ逃がし、メインスレッドを空ける</td></tr>
        </tbody>
      </table>

      <p>
        ここで初めて<Link href="/frontend/react-performance">メモ化</Link>が効いてきます。ただし順序が重要で、<Term>まず送る量を減らし、次に描画量を減らし、最後にメモ化</Term>です。逆順にやると、労力の割に数字が動きません。
      </p>

      <Heading num="07">回帰を防ぐ ― 予算をCIに置く</Heading>
      <p>
        速度は放っておけば必ず悪化します。機能追加のたびに依存が1つ増え、誰も気付かないうちに初期バンドルが倍になっている ― というのが典型的な経過です。だから<Term>閾値を決めて自動で落とす</Term>仕組みが要ります。
      </p>

      <table>
        <thead>
          <tr><th>仕組み</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パフォーマンス予算</td><td>「初期JSは170KBまで」のような上限を決める</td></tr>
          <tr><td className="hl">スコアの自動計測</td><td>変更ごとに測り、閾値を下回ったら失敗させる</td></tr>
          <tr><td className="hl">バンドルサイズの差分表示</td><td>変更に「+42KB」と出るようにし、増加を意識的な判断にする</td></tr>
          <tr><td className="hl">フィールド計測の継続監視</td><td>リリース後の75パーセンタイル値を追い、悪化を検知する</td></tr>
        </tbody>
      </table>

      <p>
        仕組みとしては<Link href="/dev/ci-actions">GitHub Actionsの実務</Link>で扱った自動検査の一種です。速度を「気を付ける」対象から「落ちる条件」へ移すのが要点になります。
      </p>

      <Analogy label="💡 たとえるなら">
        表示速度の改善は引っ越しの荷造りに似ています。段ボールの詰め方(メモ化)を工夫する前に、<strong>持っていく荷物を減らす</strong>ほうが圧倒的に効きます。使うか分からない道具は現地で買えばよく(コード分割)、家具は寸法を測ってから運び込めば部屋の中で組み替えずに済みます(CLS対策)。そして荷物が増えていないかは、毎回体重計に載せて確かめるしかありません(CIの予算)。
      </Analogy>

      <Heading num="まとめ">測り、減らし、増やさない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>指標で原因を切り分ける</h4>
          <p>LCPは重さ、INPはJS実行、CLSは寸法漏れ。どれが悪いかで打ち手が決まる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>最良の最適化は送らないこと</h4>
          <p>サーバー側で描くこと、動的importで初回のJSそのものを削る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>予算をCIに置く</h4>
          <p>速度は放置すれば必ず悪化する。閾値を決めて自動で落とす。</p>
        </Card>
      </CardGrid>

      <p>
        次は、表示するデータそのものが利用者の言語や地域に依存する場合の扱い ―
        <Link href="/frontend/i18n">国際化と日時</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/perf" />
    </DocsPage>
  );
}
