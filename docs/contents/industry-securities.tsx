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
  title: "証券",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 金融・保険</Eyebrow>
        <h1>証券 ― 相場に生きる、手数料とトレーディングの産業</h1>
        <Lead>
          証券会社は、株式や債券の<Term>売買を仲介</Term>し、企業の資金調達（IPO・増資）を<Term>引き受け</Term>、自らも売買（トレーディング）して稼ぐ産業です。銀行が「利ざや」で安定的に稼ぐのに対し、証券は<Term>相場（株価・売買代金）に業績が激しく連動</Term>します。明治の株式取引所開設、戦後の証券民主化、山一證券の破綻、金融ビッグバン、そして手数料無料化とネット証券の台頭 ― 約150年で「手数料商売」から「預り資産ビジネス」へ姿を変えた歴史と会計を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1878">株式取引所<br />渋沢栄一・五代友厚</TimelineItem>
        <TimelineItem era="1949">東証再開<br />戦後の再建</TimelineItem>
        <TimelineItem era="1950s">証券民主化<br />四大証券体制</TimelineItem>
        <TimelineItem era="1989">日経38,915円<br />バブルの頂点</TimelineItem>
        <TimelineItem era="1997">山一證券破綻<br />四大証券の終焉</TimelineItem>
        <TimelineItem era="1999">手数料自由化<br />金融ビッグバン</TimelineItem>
        <TimelineItem era="1999">ネット証券<br />SBI・楽天の源流</TimelineItem>
        <TimelineItem era="2024">新NISA<br />貯蓄から投資へ</TimelineItem>
      </Timeline>

      <Heading num="01">近代証券市場の誕生と四大証券（明治〜戦後）</Heading>
      <p>日本の資本市場は、1878年に<Term>渋沢栄一</Term>が設立した東京株式取引所と、<Term>五代友厚</Term>による大阪株式取引所から始まります。大阪は堂島米会所以来の相場の伝統を引き継ぐ土地でした。当初の証券会社は取引所会員として株式売買を仲介する<Term>仲買人</Term>で、収益源は手数料 ― この「売買を取り次いで手数料をもらう」構造が、その後100年以上、証券業の基本形になります。</p>
      <p>戦後、GHQの財閥解体で放出された株式を国民に広げる<Term>証券民主化運動</Term>（「証券を国民の手に」）が起こり、その旗手となったのが<Term>野村證券</Term>でした。野村・大和・日興・山一の<Term>四大証券</Term>体制が確立し、1951年には投資信託も始まります。高度成長とともに株式投資は大衆化しますが、1965年の<Term>証券不況</Term>では山一證券が経営危機に陥り、日銀特融で救済されました ― この時点では、まだ「大きすぎて潰せない」存在だったのです。</p>

      <Heading num="02">バブルの狂乱と山一破綻 ― 損失補填という病（1974〜1997）</Heading>
      <p>1980年代、企業の余剰資金運用（<Term>財テク</Term>）ブームを背景に証券会社は絶頂を迎えます。1989年12月29日、日経平均は史上最高値<Term>38,915円</Term>を記録。時価発行増資・転換社債・ワラント債の引受で証券各社は巨額の手数料を得ました。しかしその裏で、大口法人顧客に損失を穴埋めする<Term>営業特金（損失補填）</Term>が横行していました。</p>
      <p>バブル崩壊後の1991年、この損失補填が発覚し、大蔵省との接待癒着とあわせて社会の激しい批判を浴び、大手4社が業務停止処分を受けます。そして1997年11月24日、<Term>山一證券</Term>が自主廃業を発表 ― 2,600億円もの簿外債務（「飛ばし」による損失隠し）が明るみに出ました。「社員は悪くありませんから！」という野澤社長の涙の記者会見は、四大証券体制の終焉を象徴する場面として記憶されています。</p>
      <Analogy label="💡 なぜ「相場商売」は危ういのか">
        証券会社の収益は、株価が上がり売買が活発なときに膨らみ、相場が冷えると一気にしぼみます。好況期の高収益に慣れて固定費（人員・店舗）を膨らませると、相場が反転した瞬間に赤字へ転落する。損失補填や飛ばしは、この<strong>変動の激しさを無理に隠そうとした結果</strong>でした。証券業の会計を読むうえで「いまが相場のどの局面か」を意識するのは、このためです。
      </Analogy>

      <Heading num="03">金融ビッグバンとネット証券 ― 手数料革命（1996〜現在）</Heading>
      <p>1996年、橋本内閣の<Term>金融ビッグバン</Term>が「フリー・フェア・グローバル」を掲げ、証券業界に競争原理を持ち込みます。決定打が1999年の<Term>株式委託手数料の完全自由化</Term>でした。固定手数料制が廃止され、価格競争が始まります。</p>
      <p>この規制緩和が、<Term>ネット証券</Term>という新しいプレイヤーを生みました。1998年に松井証券がネット取引を開始し、1999年にはイー・トレード証券（後の<Term>SBI証券</Term>）や楽天証券の源流が設立されます。対面証券の10分の1以下という手数料は、ついに<Term>国内株の手数料無料化</Term>へと行き着きました。2014年のNISA、2024年の<Term>新NISA</Term>という「貯蓄から投資へ」の政策も追い風に、ネット証券は口座数を爆発的に伸ばしています。一方で大手証券は、対面ならではの富裕層向けウェルスマネジメントや投資銀行業務（M&A・引受）に軸足を移しました。</p>

      <Heading num="04">会計・財務の特徴 ― 市況連動とトレーディング資産</Heading>
      <p>証券会社の会計は、銀行とも異なります。<Link href="/finance/pl">損益</Link>は<Term>市況に激しく連動</Term>し、四半期ごとの振れが大きい。収益は複数の性格の異なる源泉からなります。</p>
      <table>
        <thead>
          <tr><th>収益区分</th><th>中身</th><th>性格</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">委託手数料</td><td>株式等の売買仲介</td><td>無料化で縮小した伝統的収益</td></tr>
          <tr><td className="hl">引受・売出手数料</td><td>IPO・増資・社債の引受（投資銀行業務）</td><td>市況と案件次第</td></tr>
          <tr><td className="hl">トレーディング損益</td><td>自己売買・マーケットメイク</td><td>市況で変動が最も大きい</td></tr>
          <tr><td className="hl">資産管理手数料</td><td>投信・ラップ・預り資産ベースのフィー</td><td><strong>ストック型で安定</strong>。無料化時代の生命線</td></tr>
        </tbody>
      </table>
      <p><Link href="/finance/bs">貸借対照表（BS）</Link>には、自己勘定で保有する有価証券・デリバティブが<Term>トレーディング商品</Term>として時価評価で載ります。一方、顧客から預かる資産は<Term>顧客分別金信託</Term>として自社資産と分別管理され、BSには載りません（オフバランス）。しかしこの<Term>預り資産残高</Term>こそ、手数料無料時代のフィービジネスの基盤です。健全性は銀行の自己資本比率に相当する<Term>自己資本規制比率</Term>（下限120%）で測ります。</p>
      <Aside label="収益モデルの転換 ― 「売買手数料」から「預り資産フィー」へ">
        手数料無料化で、証券会社は「たくさん売買させて手数料を取る」モデルから、「<strong>預り資産を増やし、その残高に応じたフィーを継続的に得る</strong>」モデルへ移りました。前者は相場に振り回されるフロー収益、後者は安定したストック収益。財務分析では<Term>ストック収益比率</Term>（安定収益の割合）が、その会社の市況耐性を測る鍵になります。
      </Aside>

      <Heading num="05">証券を診る指標と分析の勘所</Heading>
      <p>証券会社を見るときは、好況期の利益をそのまま実力と受け取らないことが肝心です。<Link href="/finance/analysis">会社を診断する</Link>視点を、市況産業向けに調整します。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">預り資産残高</td><td>フィービジネスの基盤。ストック収益の源泉</td></tr>
          <tr><td className="hl">口座数・アクティブ口座</td><td>ネット証券の成長指標</td></tr>
          <tr><td className="hl">売買代金・シェア</td><td>委託手数料の源泉</td></tr>
          <tr><td className="hl">ストック収益比率</td><td>市況変動への耐性（安定収益の割合）</td></tr>
          <tr><td className="hl">自己資本規制比率</td><td>レバレッジの健全性（下限120%）</td></tr>
        </tbody>
      </table>
      <p>会計上は、トレーディング資産・デリバティブの<Term>時価（公正価値）評価</Term>と評価損益のPL計上、引受手数料やM&A成功報酬の<Term>収益認識</Term>の時期、ネット証券・海外買収で生じる<Term>のれん</Term>、そしてSBI・マネックスなどが手がける<Term>暗号資産事業</Term>の会計が論点になります。なお、SMBC日興・みずほ証券・三菱UFJモルガン・スタンレー証券といったメガバンク系証券は、単独ではなく<Link href="/industry/bank">銀行グループ</Link>の連結の一部として見る必要があります。</p>

      <Heading num="06">企業規模・主要プレイヤー ― 大手・銀行系・ネットの三層</Heading>
      <p>証券業界は、大きく3つの層に分かれます。</p>
      <table>
        <thead>
          <tr><th>層</th><th>主なプレイヤー</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">大手（対面・総合）</td><td>野村HD（営業収益約1.6兆円）・大和証券G（約8,000億円）</td><td>リテール＋ホールセール＋アセットマネジメント、海外・投資銀行業務</td></tr>
          <tr><td className="hl">メガバンク系</td><td>SMBC日興・みずほ証券・三菱UFJモルガン・スタンレー</td><td>銀行グループの一部。銀証連携</td></tr>
          <tr><td className="hl">ネット証券</td><td>SBI証券（口座1,300万超）・楽天証券（1,100万超）・マネックス・松井</td><td>手数料無料化、新NISAで急拡大、経済圏連携</td></tr>
        </tbody>
      </table>
      <p>この構図を一段高いところから見ているのが、東証・大阪取引所を運営する<Term>日本取引所グループ（JPX）</Term>です。取引インフラを握る独占的な立場で、市況に関わらず高収益を上げる「別格」の存在です。SBI・楽天による手数料無料化がリテールモデルを一変させ、収益源は委託手数料から預り資産ベースのフィービジネスへとシフトしました。新NISAはこの流れを加速させ、ネット証券の口座・預り資産をさらに押し上げています。</p>

      <Heading num="まとめ">証券という産業をどう捉えるか</Heading>
      <p>証券業は、相場という不安定な土台の上で「手数料」を糧に生きてきた産業です。その不安定さがバブル期の損失補填や山一破綻を招き、手数料無料化という荒療治を経て、いまは相場に左右されにくい<Term>預り資産ビジネス</Term>へと軸を移しつつあります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>相場に激しく連動する市況産業</h4><p>株価・売買代金で手数料もトレーディング損益も上下。四半期ごとの振れが大きい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>収益源はフローからストックへ</h4><p>手数料無料化で、売買手数料から預り資産ベースのフィービジネスへ転換した。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>好況期の利益は割り引いて見る</h4><p>実力はストック収益比率で。健全性は自己資本規制比率で確認する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>大手・銀行系・ネットの三層＋JPX</h4><p>手数料無料のSBI・楽天が台頭。取引所を握るJPXは独占的な高収益。</p></Card>
      </CardGrid>
      <p>証券の会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>で、投資手法としての資本市場の見方は<Link href="/finance/valuation">企業価値と株価（PBR）</Link>や<Link href="/finance/thinking">会計 vs ファイナンス</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/bank" tag="業界">銀行</RelatedLink>
                    <RelatedLink href="/industry/insurance" tag="業界">生命保険・損害保険</RelatedLink>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値と株価（PBR）</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
