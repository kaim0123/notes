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
  title: "推定と仮説検定",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>推定と仮説検定 ― 一部から全体を語る</h1>
        <Lead>
          「<Link href="/theory/probability">確率・統計と情報理論</Link>」では、手元のデータそのものを要約する代表値やばらつきを見ました。ここではもう一歩進んで、限られた標本から、その背後にある全体(母集団)について「どこまで言えるか」を扱います。推定と仮説検定は、A/Bテストや品質検査の判断根拠になる考え方です。
        </Lead>
      </Hero>

      <Heading num="01">母集団と標本</Heading>
      <p>知りたい対象すべての集まりを<Term>母集団</Term>、そこから実際に取り出して調べた一部を<Term>標本(サンプル)</Term>と呼びます。全数調査が難しいとき(全ユーザーの満足度、製品全数の検査など)、標本から母集団の性質を推し量ります。</p>
      <ul>
        <li>母集団の平均・分散 → <Term>母平均・母分散</Term>(本当に知りたい未知の値)</li>
        <li>標本の平均・分散 → <Term>標本平均・標本分散</Term>(手元で計算できる値)</li>
      </ul>
      <p>標本は母集団から偏りなく選ぶ(<Term>無作為抽出</Term>)ことが前提です。偏った標本からは、どんな計算をしても正しい結論は得られません。</p>

      <Heading num="02">推定 ― 点推定と区間推定</Heading>
      <p>標本から母集団の値を見積もることを<Term>推定</Term>といいます。2つのやり方があります。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>やること</th><th>例</th></tr>
          <tr><td className="hl">点推定</td><td>母平均を1つの値で言い当てる</td><td>「平均は 3.2 と推定される」</td></tr>
          <tr><td className="hl">区間推定</td><td>母平均が入る範囲を確からしさ付きで示す</td><td>「95%の信頼度で 3.0〜3.4 の範囲」</td></tr>
        </tbody>
      </table>
      <p>区間推定で使う「95%の信頼度」を <Term>信頼区間</Term>と呼びます。これは「同じ調査を何度も繰り返せば、そのうち約95%の区間が本当の母平均を含む」という意味です。標本数が多いほど区間は狭まり、推定は精密になります。</p>

      <Aside label="よくある誤解">
        95%信頼区間は「母平均がこの区間に入る確率が95%」という意味ではありません。母平均は動かない1つの値で、動くのは標本から作る区間のほうです。「区間の作り方が95%の確率で当たる」と理解すると正確です。
      </Aside>

      <Heading num="03">仮説検定</Heading>
      <p><Term>仮説検定</Term>は、「ある主張がデータと矛盾しないか」を確率的に判定する手続きです。次の2つの仮説を立てます。</p>
      <ul>
        <li><Term>帰無仮説(H₀)</Term>: 「差はない」「効果はない」という、否定したい前提</li>
        <li><Term>対立仮説(H₁)</Term>: 「差がある」「効果がある」という、示したい主張</li>
      </ul>
      <p>手順は「まず帰無仮説が正しいと仮定し、その仮定のもとで、観測されたデータ(またはそれ以上に極端なデータ)がどれくらい起こりにくいか」を測ります。この起こりにくさが <Term>p値</Term>です。</p>
      <table>
        <tbody>
          <tr><th>用語</th><th>意味</th></tr>
          <tr><td className="hl">有意水準(α)</td><td>「これより起こりにくければ偶然とは見なさない」という基準。慣習的に 0.05(5%)</td></tr>
          <tr><td className="hl">p値</td><td>帰無仮説が正しいと仮定したとき、観測結果が起こる確率</td></tr>
          <tr><td className="hl">判定</td><td>p値 &lt; α なら帰無仮説を棄却し、対立仮説を採用する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        仮説検定は「疑わしきは罰せず」の裁判に似ています。まず「被告は無罪(帰無仮説＝差はない)」と仮定し、有罪だと言い切るには「無罪ではとても説明できないほどの証拠(小さなp値)」が要る、という進め方です。証拠が足りなければ「無罪」ではなく「有罪とは言えない」で終わります。
      </Analogy>

      <p>ここで重要なのは、帰無仮説を棄却できなかったとき「差がないと証明された」わけではない点です。あくまで「差があるとは言えなかった」に留まります。また、有意水準5%は「本当は差がないのに、誤って差があると判定してしまう確率を5%まで許す」という意味でもあります。</p>

      <Heading num="04">相関と回帰の入口</Heading>
      <p>2つの量の関係を見る道具も、統計の重要な応用です。</p>
      <ul>
        <li><Term>相関</Term>: 一方が増えると他方も増える(正の相関)/減る(負の相関)という関係の強さ。<Term>相関係数</Term>は −1〜+1 の値をとる。</li>
        <li><Term>回帰</Term>: 関係を「y = ax + b」のような式で表し、値を予測する。最も広く使われるのが<Term>最小二乗法</Term>による直線あてはめ。</li>
      </ul>
      <Aside label="注意">
        相関があっても因果があるとは限りません(「アイスの売上と水難事故は相関するが、原因は共通の『気温』」)。相関は関係の有無を示すだけで、原因と結果を語るには別の根拠が要ります。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>標本から母集団を推し量る</h4>
          <p>点推定は1つの値、区間推定は確からしさ付きの範囲。無作為抽出が大前提です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>検定は「偶然で説明できるか」</h4>
          <p>帰無仮説のもとでのp値が有意水準を下回れば棄却。棄却できても「証明」ではありません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>相関≠因果</h4>
          <p>関係の強さ(相関)と、予測式(回帰)。相関があっても原因とは限らない点に注意します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/probability" tag="情報科学">確率・統計と情報理論</RelatedLink>
                    <RelatedLink href="/ops/analytics" tag="サービス運営">分析・改善</RelatedLink>
                    <RelatedLink href="/theory/algorithms" tag="情報科学">アルゴリズムとデータ構造</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
