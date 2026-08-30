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
  Timeline,
  TimelineItem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "生命保険・損害保険",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 金融・保険</Eyebrow>
        <h1>生命保険・損害保険 ― 「先にもらって後で払う」逆転の産業</h1>
        <Lead>
          保険は、一般の会社と<Term>収支の順番が逆</Term>です。ふつうの企業が「作って売って回収する」のに対し、保険は<Term>保険料を先に受け取り、将来の保険金支払いに備える</Term>。だから将来いくら払うかの見積り（<Term>責任準備金</Term>）が利益を決め、集めた保険料を運用する<Term>巨大な機関投資家</Term>にもなります。明治の制度導入、生保レディによる普及、逆ザヤ問題による相次ぐ破綻、損保のメガグループ再編と自然災害リスク ― 生保・損保それぞれの歴史と、他業界とはまるで違う会計を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1880">明治生命<br />日本初の生保</TimelineItem>
        <TimelineItem era="1879">東京海上<br />日本初の損保</TimelineItem>
        <TimelineItem era="1916">簡易保険<br />庶民への普及</TimelineItem>
        <TimelineItem era="1955">自賠責保険<br />モータリゼーション</TimelineItem>
        <TimelineItem era="1997">日産生命破綻<br />逆ザヤ問題</TimelineItem>
        <TimelineItem era="2001">損保メガ再編<br />3グループへ</TimelineItem>
        <TimelineItem era="2010">第一生命上場<br />株式会社化</TimelineItem>
        <TimelineItem era="2011">東日本大震災<br />地震保険1.2兆円</TimelineItem>
      </Timeline>

      <Heading num="01">近代保険の誕生と国民生活への定着（明治〜高度成長）</Heading>
      <p>生命保険は、福沢諭吉が著書で紹介した西洋の制度を輸入する形で始まりました。1880年、阿部泰蔵が<Term>明治生命</Term>（日本初の生保）を設立し、日本生命・第一生命・住友生命などが続きます。損害保険は、1879年に渋沢栄一が関与して設立された<Term>東京海上保険</Term>（日本初の損保）が、船舶・貨物の海上保険から始めました。木造家屋の多い日本では火災保険も重要でした。</p>
      <p>庶民への普及の転機は、1916年に逓信省が始めた国営の<Term>簡易保険</Term>（郵便局で加入できる小口保険）です。戦後の高度成長期、生保は<Term>生保レディ</Term>と呼ばれる女性外務員による訪問販売で全国に広がり、契約件数は年率20%で伸びる驚異的な成長を遂げました。損保では、モータリゼーションを背景に1955年開始の<Term>自賠責保険</Term>（強制保険）と任意の自動車保険が主力となり、火災保険を上回っていきます。集めた保険料は株式持ち合いや不動産、企業への長期貸付で運用され、保険会社は日本経済の長期資金の供給者になりました。</p>

      <Heading num="02">逆ザヤ問題と生保破綻の連鎖（1991〜2000年代）</Heading>
      <p>バブル期、生保は高い運用利回りを前提に<Term>予定利率5〜6%</Term>という高利回りの保険を大量に販売しました。ところがバブルが崩壊し株価・不動産が暴落すると、約束した予定利率が実際の運用利回りを上回る<Term>逆ザヤ</Term>が発生します。契約者に約束した利回りを運用で稼げない ― この構造的な損失が生保の経営を蝕みました。</p>
      <p>1997年、<Term>日産生命</Term>が戦後初の生保破綻を起こすと、東邦生命・第百生命・千代田生命・協栄生命など中堅・大手準ずる生保の破綻が2000年前後に相次ぎます。契約者は<Term>生命保険契約者保護機構</Term>が救済しましたが、既契約の予定利率も引き下げられました。</p>
      <Analogy label="💡 逆ザヤをたとえるなら">
        逆ザヤは「年5%で運用して返します」と約束してお金を預かったのに、実際には年1%でしか運用できない状態です。差の4%は保険会社が自腹で穴埋めするしかありません。契約が超長期（数十年）の生保では、過去の高利回り契約が何十年も損失を垂れ流します。だから保険会社は、負債（将来の支払い）の性格に合わせて資産を運用する<Term>ALM（資産負債管理）</Term>を重視するようになりました。
      </Analogy>
      <p>この危機を経て業界は再編と規制緩和へ向かいます。1996年の保険業法改正で生損保が子会社方式で相互参入し、アフラック（がん保険）やアリコなど<Term>外資</Term>が参入。2010年には第一生命が相互会社から株式会社へ転換して上場し、2007年には郵政民営化で<Term>かんぽ生命</Term>が誕生しました。損保では、2001年以降に東京海上・MS&AD・SOMPOの<Term>3メガ損保グループ</Term>へと集約が進みます。</p>

      <Heading num="03">会計・財務の特徴 ― 責任準備金と運用資産が核心</Heading>
      <p>保険会計が他業界と根本的に違うのは、この<Term>逆転した収支構造</Term>です。<Link href="/finance/pl">損益</Link>は将来債務の見積りに大きく左右され、生保と損保でも見方が異なります。</p>
      <table>
        <thead>
          <tr><th>区分</th><th>本業利益の測り方</th><th>ポイント</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">生保</td><td><strong>基礎利益</strong>（保険関係＋利差）</td><td>三利源＝死差益・費差益・利差益に分解できる</td></tr>
          <tr><td className="hl">損保</td><td><strong>コンバインド・レシオ</strong></td><td>（支払保険金＋事業費）÷収入保険料。100%未満なら引受で黒字</td></tr>
        </tbody>
      </table>
      <p>生保の<Term>三利源</Term>とは、予定より死亡が少ない<Term>死差益</Term>、予定より経費が少ない<Term>費差益</Term>、予定利率より運用が良い<Term>利差益</Term>の3つ。逆ザヤはこのうち利差がマイナスになった状態です。損保では、台風・地震などの<Term>自然災害</Term>で支払保険金が急増するとコンバインド・レシオが悪化し、損益を直撃します。</p>
      <p><Link href="/finance/bs">貸借対照表（BS）</Link>では、最大の負債が将来の保険金支払いに備える<Term>責任準備金</Term>で、その金額は予定利率・死亡率・解約率といった見積りの前提で変動します。最大の資産は国債・社債・株式・外債・貸付・不動産からなる<Term>運用資産</Term>で、生保は超長期国債が中心。損保は取引先の<Term>政策保有株</Term>を大量に持ってきましたが、ガバナンス改革で縮減が進んでいます。さらに、市況や大災害に備える<Term>価格変動準備金・異常危険準備金</Term>という保険業特有の準備金も積まれます。</p>
      <Aside label="なぜ会計上の純利益だけでは測れないのか">
        保険の利益は市況（株価・金利）で大きく振れ、契約が超長期の生保では会計上の当期純利益が実力を表しません。そこで生保は<Term>EV（エンベディッド・バリュー）</Term>＝保有契約が将来生む利益の現在価値、という独自のものさしで企業価値を測ります。健全性は、支払余力を示す<Term>ソルベンシー・マージン比率</Term>（最低ライン200%）で判断します。
      </Aside>

      <Heading num="04">保険を診る指標と会計論点</Heading>
      <p>保険会社は、<Link href="/finance/analysis">会社を診断する</Link>ときに専用の指標が必要です。会計上の純利益に頼らず、保険固有のものさしで実力と健全性を見ます。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">基礎利益（生保）</td><td>本業の実力利益</td></tr>
          <tr><td className="hl">三利源（死差・費差・利差）</td><td>生保の利益の分解</td></tr>
          <tr><td className="hl">コンバインド・レシオ（損保）</td><td>引受採算。100%未満が健全</td></tr>
          <tr><td className="hl">ソルベンシー・マージン比率</td><td>支払余力＝健全性の生命線（最低200%）</td></tr>
          <tr><td className="hl">EV（エンベディッド・バリュー）</td><td>生保の企業価値（将来利益の現在価値）</td></tr>
        </tbody>
      </table>
      <p>会計論点としては、責任準備金の見積り前提（低金利下の逆ザヤ）、保険負債を現在価値で測り利益を契約期間で認識する国際基準<Term>IFRS17</Term>への移行、有価証券の時価評価と政策株の含み損益、そして損保の<Term>支払備金</Term>（IBNR＝発生済み未報告損害）の見積りなどがあります。金利上昇は生保にとって新規運用利回りの改善というプラス面がある一方、保有債券には含み損が生じる点に注意が必要です。</p>

      <Heading num="05">企業規模・主要プレイヤー ― 生保は運用資産、損保は3メガ寡占</Heading>
      <p>保険は世界的にも巨大な市場で、生命保険が約34兆円、損害保険が約10.6兆円（いずれも保険料ベース）。規模指標は<Term>保険料収入</Term>と<Term>運用資産（総資産）</Term>です。</p>
      <table>
        <thead>
          <tr><th>生保</th><th>形態・規模</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">日本生命</td><td>相互会社・総資産約90兆円</td><td>業界最大、大同・はなさく等を傘下に</td></tr>
          <tr><td className="hl">第一生命HD</td><td>株式会社（上場）・総資産約70兆円</td><td>2010年に相互会社から株式会社化</td></tr>
          <tr><td className="hl">かんぽ生命</td><td>上場・総資産約60兆円</td><td>郵政グループ、契約数最大級</td></tr>
          <tr><td className="hl">明治安田・住友生命</td><td>相互会社</td><td>団体保険・地域密着に強み</td></tr>
        </tbody>
      </table>
      <p>生保の特徴は、大手の多くが株主のいない<Term>相互会社</Term>（契約者が社員）で上場していない点です。日本生命90兆円に代表されるように、集めた保険料を運用する巨大な機関投資家でもあります。損保は<Term>東京海上HD・MS&AD・SOMPO</Term>の3メガによる寡占で、特に東京海上は海外M&Aによって海外利益比率を高めています。SOMPOの介護事業のように、保険×ヘルスケアなど周辺領域への多角化も進んでいます。集めた保険料を運用する構造ゆえ、金利・株価・自然災害が業績を大きく左右します。</p>
      <Aside label="不祥事という影">
        近年は、かんぽ生命の不正販売（2019年発覚。不利益な乗換契約や二重払込、郵政3社長辞任）や、損保ジャパンが関与を問われたビッグモーター不正請求問題（2023年）など、営業のノルマ優先やガバナンスの歪みが表面化しました。国民生活のセーフティネットを担う産業だからこそ、信頼の回復が重い課題になっています。
      </Aside>

      <Heading num="まとめ">保険という産業をどう捉えるか</Heading>
      <p>保険は「先にもらって後で払う」逆転の収支ゆえ、将来の支払いをどう見積もり、集めた保険料をどう運用するかがすべてを決めます。逆ザヤ問題は「運用の失敗が数十年尾を引く」という保険特有のリスクを示し、自然災害の多発は損保の採算を年ごとに揺らします。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>収支の順番が逆の産業</h4><p>保険料を先に集め、将来の保険金に備える。責任準備金の見積りが利益を決める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>巨大な機関投資家でもある</h4><p>集めた保険料を国債・株式・外債で運用。金利・株価が業績を左右する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>純利益でなく保険固有の指標で見る</h4><p>生保は基礎利益・EV、損保はコンバインド・レシオ、健全性はソルベンシー比率。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>生保は相互会社、損保は3メガ寡占</h4><p>大手生保は非上場の相互会社が多い。損保は東京海上・MS&AD・SOMPOが寡占。</p></Card>
      </CardGrid>
      <p>保険の会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>で、運用資産の評価や現在価値の考え方は<Link href="/finance/thinking">会計 vs ファイナンス</Link>で、それぞれ詳しく扱っています。同じ金融でも構造の違う<Link href="/industry/bank">銀行</Link>とあわせて読むと、金融各業種の「クセ」がくっきり見えてきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/bank" tag="業界">銀行</RelatedLink>
                    <RelatedLink href="/industry/securities" tag="業界">証券</RelatedLink>
                    <RelatedLink href="/industry/credit" tag="業界">信販・クレジット・リース</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
