import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "パフォーマンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>パフォーマンス ― 順序を守れば、たいてい速くなる</h1>
        <Lead>
          速さの改善は、思いつきで手を付けると効果の薄いところに時間を使いがちです。順序は決まっていて、<Term>測る → 減らす → 繰り返さない → 近くから返す</Term>。運営として見るのは、細かな最適化ではなく<strong>放っておくと悪化する部分を止めること</strong>です。コンテンツと利用者が増えるほど、何もしなければ表示は確実に遅くなります。
        </Lead>
      </Hero>

      <Heading num="01">まず、利用者側で測る</Heading>
      <p>
        サーバーの応答時間が速くても、画面に出るまでが遅ければ意味がありません(<Link href="/infra/monitoring-frontend">フロントエンド監視</Link>)。指標は<strong>主要な内容が表示されるまで</strong>、<strong>操作に反応するまで</strong>、<strong>表示中のずれ</strong>の3つを見ます。どれも「サーバーが返すまで」ではなく「利用者の画面でどうか」を測っています。
      </p>
      <p>
        読み方は<Link href="/infra/monitoring-data">中央値と分位数</Link>で、切り口(端末・回線・地域・ページ)ごとに分けます。全体平均だけを見ていると、特定の条件だけが極端に悪い状態を見落とします。
      </p>

      <Heading num="02">効き目の順に手を付ける</Heading>

      <DiagramFrame
        slug="infra-ops-performance-layers"
        aspect="760 / 300"
        caption="表示を速くするための手立てを効き目の大きい順に並べた図。いちばん上は送る量を減らすことで、画像や動画の最適化、使っていないコードの削除、圧縮が該当する。次は繰り返さないことで、同じ計算や同じ転送をキャッシュで省く。3段目は近くから返すことで、配信網を使って距離を縮める。いちばん下は速く作ることで、処理やクエリの改善にあたる。上ほど費用対効果が大きく、下ほど手間がかかる。"
      />

      <p>
        実際のサービスで最も効くのは、たいてい<strong>いちばん上</strong>です ― 巨大な画像を原寸のまま送っている、使っていないライブラリを読み込んでいる、圧縮が効いていない。<Link href="/frontend/perf">フロントエンドのパフォーマンス</Link>で扱う具体的な手法の多くは、この段に属します。
      </p>

      <Heading num="03">キャッシュは、正しさとセットで</Heading>
      <p>
        同じ計算と同じ転送を省くのがキャッシュですが、<strong>何をどこに、どれだけ置くか</strong>を決めないと事故になります。個別の内容を共有のキャッシュに載せれば他人に配られますし(<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>)、更新しても古いものが配られ続けます。
      </p>
      <p>
        運用としての要点は、<strong>更新をどう届けるか</strong>を先に決めることです。内容が変わればURLも変わる形にしておけば、破棄を待つ必要がありません(<Link href="/dev/cache">キャッシュの考え方</Link>)。
      </p>

      <Aside label="どこまで追うか">
        速さは際限なく追えますが、費用対効果は途中で頭打ちになります。目安は<strong>利用者が離脱し始める水準を割らないこと</strong>と、<strong>悪化を検知できること</strong>。前者は目標値として、後者は<Link href="/test/non-functional-ci">継続的な計測</Link>として仕組みにします。数値を改善し続けること自体が目的になると、労力の割に成果が見えなくなります。
      </Aside>

      <Heading num="まとめ">順序と、悪化の検知</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>利用者側で測る</h4><p>切り口ごとに分けて見る。全体平均はほとんど何も教えない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>減らすのが最も効く</h4><p>画像・不要なコード・圧縮。細かい最適化より先に、大きいものから。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>悪化を止める仕組みを持つ</h4><p>改善し続けるより、放っておくと悪くなる部分を検知するほうが効く。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-performance" />
    </DocsPage>
  );
}
