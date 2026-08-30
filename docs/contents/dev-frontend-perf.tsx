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
  title: "表示速度を測って直す",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>表示速度を測って直す ― 何を送らないかを決める</h1>
        <Lead>
          <Link href="/dev/frontend/react/performance">メモ化とパフォーマンス</Link>では、Reactの再描画を減らす方法を見ました。しかし利用者が感じる遅さの多くは、再描画ではなく<strong>そもそも送っているものが多すぎること</strong>から来ます。ここでは<Term>Core Web Vitals</Term>で現状を測り、<Term>コード分割</Term>・画像・フォントという「量」の問題に手を入れ、CIで回帰を防ぐまでを扱います。
        </Lead>
      </Hero>

      <Heading num="01">まず測る ― 推測で最適化しない</Heading>
      <p>最適化は、必ず<strong>計測から始めます</strong>。「たぶんここが遅い」という直感は驚くほど当たりません。Googleが定めた<Term>Core Web Vitals</Term>は、利用者の体感を3つの側面から数値化したもので、共通言語として使いやすい指標です。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>測るもの</th><th>良好の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>LCP</Term>(Largest Contentful Paint)</td><td>主要なコンテンツが表示されるまでの時間</td><td>2.5秒以下</td></tr>
          <tr><td className="hl"><Term>INP</Term>(Interaction to Next Paint)</td><td>操作してから画面が反応するまでの時間</td><td>200ミリ秒以下</td></tr>
          <tr><td className="hl"><Term>CLS</Term>(Cumulative Layout Shift)</td><td>読み込み中に画面がどれだけずれたか</td><td>0.1以下</td></tr>
          <tr><td className="hl">TTFB</td><td>最初の1バイトが届くまで(サーバーの応答速度)</td><td>0.8秒以下</td></tr>
          <tr><td className="hl">FCP</td><td>何かが最初に描画されるまで</td><td>1.8秒以下</td></tr>
        </tbody>
      </table>
      <p>この3つは、それぞれ<strong>別の原因</strong>から悪化します。LCPは主に「届くまでの重さ」、INPは「JavaScriptの実行時間」、CLSは「寸法の指定漏れ」です。まずどれが悪いのかを特定すれば、打ち手はほぼ自動的に決まります。</p>

      <Heading num="02">ラボとフィールド ― 2種類の計測</Heading>
      <p>計測には性質の異なる2つがあり、両方が必要です。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>手段</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>ラボ</Term>データ</td><td>Lighthouse、DevToolsのPerformanceタブ</td><td>条件を揃えて再現できる。原因追跡に向く。<strong>実際の利用者の速度ではない</strong></td></tr>
          <tr><td className="hl"><Term>フィールド</Term>データ(RUM)</td><td><code>web-vitals</code>ライブラリ、監視SaaS</td><td>本物の端末・回線での実測。改善の効果判定に使う</td></tr>
        </tbody>
      </table>
      <p>開発機の高速なCPUと光回線で測った数字は、実際の利用者(古いスマートフォン、混雑した回線)とは何倍も乖離します。DevToolsのCPUスロットリングを4x、ネットワークを「Slow 4G」にして測るのが最低限の作法です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 実利用者の値を集める(フィールド計測)
import { onLCP, onINP, onCLS } from "web-vitals";

const send = (metric: Metric) =>
  navigator.sendBeacon("/api/vitals", JSON.stringify(metric));

onLCP(send);
onINP(send);
onCLS(send);`}</code>
      </pre>
      <p>集めた値は<strong>平均ではなく75パーセンタイル</strong>で見ます。平均は少数の高速な環境に引っ張られ、「4人に1人が体験している遅さ」を隠してしまうためです。詳しくは<Link href="/infra/monitoring/frontend">フロントエンド監視</Link>で扱います。</p>

      <Heading num="03">送るJavaScriptを減らす</Heading>
      <p>JavaScriptは、画像と違って<strong>ダウンロードしたあとに解析と実行が必要</strong>です。同じ100KBでも、画像よりはるかに高いコストを払います。したがって最も効果的な改善は「軽くする」ではなく<strong>「送らない」</strong>ことです。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/dev/frontend/nextjs/components">Server Component</Link>にする</td><td>そのコンポーネントのJSは<strong>1バイトも送られない</strong>。最も強力</td></tr>
          <tr><td className="hl"><Term>コード分割</Term>(動的import)</td><td>初回に不要なものを、必要になった時点で読む</td></tr>
          <tr><td className="hl">依存の見直し</td><td>日付処理のために巨大なライブラリを入れていないか。<code>Intl</code>で足りることも多い</td></tr>
          <tr><td className="hl">Tree Shaking</td><td>使っていないエクスポートを除去。<code>import * as _ from</code>は妨げになる</td></tr>
        </tbody>
      </table>
      <p>コード分割は、「初回表示に要らないもの」を切り出す作業です。モーダルの中身、リッチテキストエディタ、グラフ描画ライブラリ、管理者だけが使う画面 ― これらは開いた瞬間に読み込めば十分です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import dynamic from "next/dynamic";

// 重いエディタは、使う画面に来てから読み込む
const Editor = dynamic(() => import("@/components/editor"), {
  loading: () => <EditorSkeleton />,
  ssr: false, // ブラウザAPIに依存する場合はサーバーでは描画しない
});`}</code>
      </pre>
      <Aside label="バンドルを可視化する">
        何が重いのかは、必ず<strong>見て</strong>から判断します。<code>@next/bundle-analyzer</code>を入れてビルドすると、どのモジュールがどれだけ占めているかが面積で表示されます。多くの場合、犯人は自分のコードではなく、意識せず入っていた1つの大きな依存です。
      </Aside>
      <Aside label="⚠️ バレルファイルの罠">
        <code>index.ts</code>で大量に<code>export * from</code>するいわゆる<strong>バレルファイル</strong>は、1つ importしただけで芋づる式に全部を読み込ませることがあります。共通コンポーネント置き場で便利に使われがちですが、ビルド時間とバンドルサイズの両方を悪化させる原因になります。
      </Aside>

      <Heading num="04">画像とフォント ― 一番大きいものから</Heading>
      <p>ほとんどのページで、LCPの対象は<strong>大きな画像か見出しのテキスト</strong>です。つまり画像とフォントを直すことが、そのままLCPの改善になります。</p>
      <table>
        <thead>
          <tr><th>対象</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画像形式</td><td>WebP / AVIF に変換する。写真なら半分以下になることが多い</td></tr>
          <tr><td className="hl">画像サイズ</td><td>表示サイズに合わせて配信する。4000px幅の写真をサムネイルに使わない</td></tr>
          <tr><td className="hl">寸法の指定</td><td><code>width</code>/<code>height</code>を必ず指定し、場所を予約する(CLS対策)</td></tr>
          <tr><td className="hl">遅延読み込み</td><td>画面外の画像は<code>loading=&quot;lazy&quot;</code>。ただし<strong>LCP画像には付けない</strong></td></tr>
          <tr><td className="hl">最初の1枚</td><td>ファーストビューの主役には<code>priority</code>を付け、優先的に読ませる</td></tr>
          <tr><td className="hl">フォント</td><td>サブセット化し、<code>font-display: swap</code>で「文字が見えない時間」を無くす</td></tr>
        </tbody>
      </table>
      <p>Next.jsでは<code>next/image</code>と<code>next/font</code>がこの大半を自動化します。<code>next/font</code>は、フォントファイルを<strong>ビルド時に自己ホスティング</strong>し、外部への接続を無くしたうえで、フォント読み込みによるレイアウトのずれを抑える指定まで生成します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import Image from "next/image";

// 寸法を渡すので場所が予約され、CLS が発生しない
// priority で最優先に読み込ませる(ファーストビューの主役だけ)
<Image src="/hero.jpg" alt="" width={1200} height={630} priority />`}</code>
      </pre>

      <Heading num="05">CLSを直す ― 場所を先に予約する</Heading>
      <p>CLSの原因は、ほぼ例外なく<strong>「後から入ってくるものの場所を確保していない」</strong>ことです。原因は限られているので、潰すのは難しくありません。</p>
      <table>
        <thead>
          <tr><th>原因</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画像・動画・iframeの寸法未指定</td><td><code>width</code>/<code>height</code>または<code>aspect-ratio</code>を指定する</td></tr>
          <tr><td className="hl">読み込み後に挿入されるバナー・広告</td><td>あらかじめ<code>min-height</code>で場所を空けておく</td></tr>
          <tr><td className="hl">フォント切り替えによる行の伸縮</td><td><code>size-adjust</code>付きの代替フォントを指定する(<code>next/font</code>が自動化)</td></tr>
          <tr><td className="hl">スピナー→本体の差し替え</td><td>同じ寸法の<Link href="/dev/frontend/react/boundary">スケルトン</Link>にする</td></tr>
        </tbody>
      </table>

      <Heading num="06">INPを直す ― 長い処理を割り込ませない</Heading>
      <p>ブラウザのメインスレッドは1本です。そこで50ミリ秒を超える処理(<Term>ロングタスク</Term>)が走っている間、クリックもスクロールも一切反応しません。INPが悪いというのは、<strong>この詰まりが操作の瞬間に起きている</strong>ということです。</p>
      <table>
        <thead>
          <tr><th>症状</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クリック直後に重い計算をしている</td><td>結果の反映を<code>startTransition</code>で後回しにし、まず反応を返す</td></tr>
          <tr><td className="hl">一度に数千件を描画している</td><td>ページング、または仮想スクロール(表示範囲だけ描く)</td></tr>
          <tr><td className="hl">入力のたびに再計算・再取得している</td><td>デバウンス、<code>useDeferredValue</code></td></tr>
          <tr><td className="hl">初期化処理が重い</td><td>起動時にまとめてやらず、必要になった時点まで遅らせる</td></tr>
          <tr><td className="hl">純粋に計算量が多い</td><td>Web Workerへ逃がし、メインスレッドを空ける</td></tr>
        </tbody>
      </table>
      <p>ここで初めて<Link href="/dev/frontend/react/performance">メモ化</Link>が効いてきます。ただし順序が重要で、<strong>まず送る量を減らし、次に描画量を減らし、最後にメモ化</strong>です。逆順にやると、労力の割に数字が動きません。</p>

      <Heading num="07">回帰を防ぐ ― 予算をCIに置く</Heading>
      <p>速度は、放っておけば必ず悪化します。機能追加のたびに依存が1つ増え、誰も気付かないうちに初期バンドルが倍になっている ― というのが典型的な経過です。だから<strong>閾値を決めて自動で落とす</strong>仕組みが要ります。</p>
      <table>
        <thead>
          <tr><th>仕組み</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パフォーマンス予算</td><td>「初期JSは170KB(gzip)まで」のような上限を決める</td></tr>
          <tr><td className="hl">Lighthouse CI</td><td>PRごとにスコアを測り、閾値を下回ったら失敗させる</td></tr>
          <tr><td className="hl">バンドルサイズの差分表示</td><td>PRに「+42KB」と出るようにする。増加を意識的な判断にする</td></tr>
          <tr><td className="hl">フィールド計測の継続監視</td><td>リリース後の75パーセンタイル値を追い、悪化を検知する</td></tr>
        </tbody>
      </table>
      <p>これは<Link href="/dev/ci">CI/CDパイプライン</Link>に組み込む類の話で、<Link href="/test/quality-plan">品質計画</Link>で扱う「非機能要件を測定可能にする」ことの具体例でもあります。</p>

      <Analogy label="💡 たとえるなら">
        表示速度の改善は、引っ越しの荷造りに似ています。段ボールの詰め方(メモ化)を工夫する前に、そもそも<strong>持っていく荷物を減らす</strong>方が圧倒的に効きます。使うか分からない道具は現地で買えばよく(コード分割)、家具は寸法を測ってから運び込めば部屋の中で組み替えずに済みます(CLS対策)。そして荷物が増えていないかは、毎回体重計に載せて確かめるしかありません(CIの予算)。
      </Analogy>

      <Heading num="まとめ">測り、減らし、増やさない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>指標で原因を切り分ける</h4><p>LCPは重さ、INPはJS実行、CLSは寸法漏れ。どれが悪いかで打ち手が決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>最良の最適化は送らないこと</h4><p>Server Component化と動的importで、初回のJSそのものを削る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>予算をCIに置く</h4><p>速度は放置すれば必ず悪化する。閾値を決めて自動で落とす。</p></Card>
      </CardGrid>
      <p>最後に、表示するデータそのものが利用者の言語や地域に依存する場合の扱いを見ます。<Link href="/dev/frontend/i18n">国際化と日時</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/performance" tag="フロントエンド">メモ化とパフォーマンス</RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs/rendering" tag="フロントエンド">配信を最適化する</RelatedLink>
            <RelatedLink href="/ops/performance" tag="サービス運営">パフォーマンス改善</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
