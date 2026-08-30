import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  Aside,
  Diagram,
  Card,
  CardGrid,
  CardNumber,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "会計 vs ファイナンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>会計 vs ファイナンス ― 過去の記録と、未来の判断</h1>
        <Lead>
          会計は<Term>過去</Term>の実績を<Term>利益</Term>で記録する営みです。対してファイナンスは<Term>未来</Term>の見込みを<Term>キャッシュ</Term>で判断する営み。決算書が「黒字か赤字か」を語るのに対し、ファイナンスは「この会社が将来いくら現金を生むか」を問います。この視点の切り替えができると、赤字でも巨額調達するスタートアップや、利益は小さいのに株価が高い企業の理屈が読めるようになります。
        </Lead>
      </Hero>

      <Heading num="01">ファイナンスとは何か ― 狭義と広義</Heading>
      <p>ファイナンスには2つの意味があります。実務で「ファイナンスどうする？」と言えば、たいてい<Term>狭義＝資金調達</Term>を指します。ただしこれは立場で反転します ― 企業側にとっては「調達」でも、VCや金融機関側から見れば同じ取引が「投資」です。</p>
      <p>一方、学問・経営としての<Term>広義のファイナンス</Term>は、お金の流れをめぐる3つの意思決定の柱で構成されます。</p>
      <table>
        <thead>
          <tr><th>柱</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">調達</td><td>お金を集める</td><td>VC出資・IPO・借入</td></tr>
          <tr><td className="hl">投資</td><td>集めたお金をどこに使うか</td><td>事業投資・M&A</td></tr>
          <tr><td className="hl">分配</td><td>ステークホルダーへの還元</td><td>配当・自社株買い・SO・取引先への支払い</td></tr>
        </tbody>
      </table>
      <Diagram caption="調達→投資→分配が回り続ける。とりわけ「分配」の考え方に企業の文化・美意識が表れる">
        <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={54} width={140} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={100} y={74} fill="#f2f2f2" fontSize="12" textAnchor="middle">① 調達</text>
          <text x={100} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">集める</text>

          <rect x={230} y={54} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={74} fill="#f2f2f2" fontSize="12" textAnchor="middle">② 投資</text>
          <text x={300} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">使う</text>

          <rect x={430} y={54} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={500} y={74} fill="#f2f2f2" fontSize="12" textAnchor="middle">③ 分配</text>
          <text x={500} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">還元する</text>

          <line x1={170} y1={76} x2={228} y2={76} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowT)" />
          <line x1={370} y1={76} x2={428} y2={76} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowT)" />
          <path d="M500,98 C500,130 100,130 100,100" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowT)" />
          <defs>
            <marker id="arrowT" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Heading num="02">会計とファイナンスの違い</Heading>
      <p>両者は扱う「時間軸」と「重視する数字」が根本的に違います。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>会計</th><th>ファイナンス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">本質</td><td>記録（Bookkeeping）</td><td>判断</td></tr>
          <tr><td className="hl">時間軸</td><td>過去の実績</td><td>未来の見込み</td></tr>
          <tr><td className="hl">重視する指標</td><td>利益（PL）</td><td>キャッシュフロー</td></tr>
          <tr><td className="hl">用途</td><td>決算報告</td><td>企業評価・調達判断</td></tr>
        </tbody>
      </table>
      <p>スタートアップが赤字でも資金調達できるのは、投資家が<Term>将来の成長見込み</Term>を買っているから ― まさにファイナンスが未来思考だからです。そして重要なのは、<Term>利益とキャッシュフローはしばしば逆方向に動く</Term>という事実です（次節）。</p>

      <Heading num="03">キャッシュフロー経営の3類型 ― 余剰資金の使い道が個性</Heading>
      <p>本業で稼いだ現金をどう使うかに、企業の哲学が表れます。同じ「稼ぐ会社」でも、投資に注ぎ込むか、株主に返すか、手元に貯めるかで性格が分かれます。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>型</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Amazon</td><td>投資型</td><td>営業CFのほぼ全額を投資（物流・AWS・M&A）に再投入。過去15年でFCFがマイナスになったのは2回だけ（Whole Foods・MGM買収）</td></tr>
          <tr><td className="hl">Apple</td><td>還元型</td><td>巨額の営業CFを配当・自社株買いに充当（財務CFが大きくマイナス）</td></tr>
          <tr><td className="hl">キーエンス</td><td>蓄積型（日本型）</td><td>純資産比率95%。余剰資金の多くを有価証券（預金・国債）＝安全資産で運用</td></tr>
        </tbody>
      </table>
      <Aside label="📎">
        <Term>利益とキャッシュが乖離する最大の理由は減価償却</Term>です。設備投資1,000万円（5年償却）なら、PL上は毎年200万円ずつ費用計上され利益は安定的に出ます。しかしCFでは1年目に1,000万円が一括で流出し、以降4年は現金流出ゼロ。Amazonは過去の巨額投資で減価償却が大きく、利益は小さくてもCFは潤沢です。同社は1998年の株主書簡で「GAAP上の見栄えを最適化するより、キャッシュフローを選ぶ」と明言しています。
      </Aside>
      <Aside label="📎">
        キーエンスは従業員には最高の会社ですが、株主視点では「もっと本業投資・還元を」というアクティビスト圧力の典型例でもあります。<Link href="/finance/valuation">伊藤レポート（ROE 8%目標）</Link>を背景に、日本全体でガバナンス改革が進んでいます。
      </Aside>

      <Heading num="04">ファイナンスの3つの軸</Heading>
      <p>投資・調達・分配のすべての判断は、次の3つの軸に還元できます。</p>
      <table>
        <thead>
          <tr><th>軸</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① リスクとリターン</td><td>ハイリスクにはハイリターンを期待する。ハイリスク・ノーリターンはNG。VCが高リスクに出資するのは高リターンを期待するため</td></tr>
          <tr><td className="hl">② 時間</td><td>現在と未来のキャッシュの交換。調達とは未来からの前借り ― だから未来を重視する</td></tr>
          <tr><td className="hl">③ キャッシュ</td><td>利益でなく、将来生み出すと予想されるCFで企業を評価する。キャッシュフロー思考の核心</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        会計は「バックミラー」、ファイナンスは「フロントガラス」です。バックミラー（会計）は今まで走ってきた道を正確に映しますが、それだけ見て運転はできません。これから曲がる道・アクセルを踏む場所を決めるには、フロントガラス（ファイナンス）で未来のキャッシュを見る必要があります。両方あって初めて安全に速く走れます。
      </Analogy>

      <Heading num="まとめ">ファイナンス思考の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3つの機能</h4><p>調達・投資・分配。とくに分配の作法に企業の美意識が表れます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>過去と未来</h4><p>会計は過去×利益、ファイナンスは未来×キャッシュ。時間軸が違います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>利益≠現金</h4><p>減価償却などで利益とCFは乖離する。Amazonが好例です。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>キャッシュで評価</h4><p>将来生み出すCFで企業価値を測る ― これが投資家の目線です。</p></Card>
      </CardGrid>
      <p>キャッシュフロー思考をさらに実践に落とすと、<Link href="/finance/pe">PE・LBO・MBO</Link>のような「安く買って価値を上げ高く売る」投資手法にたどり着きます。次はその仕組みを見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/pe" tag="会計・財務">PE・LBO・MBOの仕組み</RelatedLink>
                    <RelatedLink href="/finance/cf" tag="会計・財務">キャッシュフローと三表のつながり</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
