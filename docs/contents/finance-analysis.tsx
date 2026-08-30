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
  CardGrid,
  Card,
  CardNumber,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "三表から会社を診断する",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>三表から会社を診断する ― BSはビジネスモデルの鏡</h1>
        <Lead>
          <Link href="/finance/statements">財務三表</Link>を読めるようになったら、次は第三者の会社を<Term>診る</Term>力に引き上げます。ポイントは、財務三表が<Term>ビジネスモデルの鏡</Term>だということ。モノの流れと入金タイミングが決まれば「あるべき決算書の形」も決まるので、数字を見れば業種や商売の性格が透けて見えます。ここでは実在企業のクイズを通じて、その感覚を体感します。
        </Lead>
      </Hero>

      <Heading num="01">財務三表はビジネスモデルの鏡</Heading>
      <p>財務戦略アドバイザー田中慎一氏の<Term>6社クイズ</Term>で、三表が商売の姿を映すことを体感してみましょう。対象は <Term>NTTドコモ・日立・JR東日本・伊藤忠・JT・山田電機</Term> の6社。決算書だけを見て「どれがどの会社か」を当てるゲームです。</p>
      <p>ヒントは一つ。<Term>PL（損益計算書）でおおまかな業種を推測し、BS（貸借対照表）で会社を特定する</Term>。この順で見ると、数字の羅列がビジネスモデルに変わります。</p>

      <Heading num="02">PLクイズ ― 営業利益率で「どんな会社か」を推測する</Heading>
      <p>各社のPLを<Term>売上高＝100</Term>に正規化して並べ、利益率を比べます。営業利益率にはおおまかな水準感があります。</p>
      <table>
        <thead>
          <tr><th>営業利益率</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">約6%</td><td>上場企業の平均的水準（2017〜19年はおおむね6%で推移。コロナ期は異常値）</td></tr>
          <tr><td className="hl">10%</td><td>グッドカンパニー</td></tr>
          <tr><td className="hl">15%</td><td>スーパーエクセレントカンパニー</td></tr>
          <tr><td className="hl">20%超</td><td>「気分が悪くなるほど儲かっている」水準</td></tr>
        </tbody>
      </table>
      <p>6社のうち利益率が突出して高い3社（20%・16%・26%）は、いずれも <Term>NTTドコモ・JT・JR東日本</Term>でした。なぜ高いのか ―<Term> 独占企業・インフラ系は構造的に高収益</Term>だからです。JTはタバコ独占、JR東日本は鉄道インフラ、ドコモはKDDI・ソフトバンクと競争しているように見えて実態は高収益。</p>
      <Aside label="📎">
        ただし<Term>PLだけでは限界があります</Term>。利益率から大まかな業種は推測できても、そこまで。会社を特定するには<Link href="/finance/bs">BS（貸借対照表）</Link>が要ります。
      </Aside>

      <Heading num="03">BSクイズ ― 規模と構成で業種が見える</Heading>
      <p>まず<Term>総資産の規模</Term>に注目します。</p>
      <ul>
        <li>突出して大きいのは<Term>日立</Term>。製造業は工場・設備という資産を大きく抱えます。</li>
        <li>最も小さいのは<Term>山田電機</Term>。小売業は在庫・店舗を高速で回転させる必要があり、資産を大きく抱えられません（<Link href="/finance/metrics">資産回転率</Link>が高い業態）。</li>
      </ul>
      <p>次に、<Term>総資産＝100</Term>に正規化した構成比を見ると、業種の癖がはっきり出ます。</p>
      <table>
        <thead>
          <tr><th>BSの特徴</th><th>該当企業</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">有形固定資産の塊（駅・線路）</td><td>JR東日本</td></tr>
          <tr><td className="hl">投資その他の資産（多様な事業への出資）</td><td>伊藤忠</td></tr>
          <tr><td className="hl">無形固定資産（のれん＝海外M&Aの残り）</td><td>JT</td></tr>
          <tr><td className="hl">流動資産が約半分＋設備・知財など「特徴がないのが特徴」</td><td>日立（製造業の典型）</td></tr>
          <tr><td className="hl">PLの高利益率から</td><td>NTTドコモ</td></tr>
        </tbody>
      </table>

      <Diagram caption="モノの流れと入金タイミングが決まれば、あるべきBSの形も決まる">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
          <text x={80} y={24} fill="#39ff6a" fontSize="12" textAnchor="middle" fontWeight="bold">鉄道（JR東日本）</text>
          <rect x={30} y={36} width={100} height={130} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={30} y={36} width={100} height={104} fill="#39ff6a" fillOpacity="0.12" />
          <text x={80} y={92} fill="#f2f2f2" fontSize="10" textAnchor="middle">有形固定資産</text>
          <text x={80} y={106} fill="#9a9a9a" fontSize="9" textAnchor="middle">駅・線路</text>
          <text x={80} y={156} fill="#9a9a9a" fontSize="9" textAnchor="middle">流動資産</text>

          <text x={230} y={24} fill="#f2f2f2" fontSize="12" textAnchor="middle" fontWeight="bold">小売（山田電機）</text>
          <rect x={180} y={90} width={100} height={76} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={180} y={90} width={100} height={50} fill="#39ff6a" fillOpacity="0.12" />
          <text x={230} y={116} fill="#f2f2f2" fontSize="10" textAnchor="middle">在庫・店舗</text>
          <text x={230} y={156} fill="#9a9a9a" fontSize="9" textAnchor="middle">小さく高速回転</text>

          <text x={400} y={24} fill="#f2f2f2" fontSize="12" textAnchor="middle" fontWeight="bold">商社（伊藤忠）</text>
          <rect x={350} y={36} width={100} height={130} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={350} y={36} width={100} height={70} fill="#39ff6a" fillOpacity="0.12" />
          <text x={400} y={68} fill="#f2f2f2" fontSize="10" textAnchor="middle">投資その他</text>
          <text x={400} y={82} fill="#9a9a9a" fontSize="9" textAnchor="middle">多様な出資</text>

          <text x={540} y={24} fill="#f2f2f2" fontSize="12" textAnchor="middle" fontWeight="bold">製造（日立）</text>
          <rect x={490} y={36} width={100} height={130} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={490} y1={101} x2={590} y2={101} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <text x={540} y={72} fill="#9a9a9a" fontSize="9" textAnchor="middle">流動 約半分</text>
          <text x={540} y={134} fill="#9a9a9a" fontSize="9" textAnchor="middle">設備・知財</text>
        </svg>
      </Diagram>

      <Analogy label="💡 BSは会社の履歴書">
        BSはその会社が「これまで何にお金をかけ、どう商売してきたか」の履歴書です。鉄道会社なら駅と線路、小売なら在庫と店舗、商社なら出資 ― 業種ごとに必ず癖が出ます。だからこそ、M&Aや競合分析の出発点として、まず相手のBSを眺めることに意味があります。
      </Analogy>

      <Heading num="まとめ">この節の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>PLで業種を推測</h4><p>売上=100に正規化し、営業利益率で「どんな商売か」を大まかに掴む。20%超は独占・インフラ系。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>BSで会社を特定</h4><p>総資産の規模と構成比に業種の癖が出る。製造は資産大、小売は資産小で高速回転。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>三表は鏡</h4><p>モノの流れと入金タイミングが決まれば、あるべき決算書の形も決まる。</p></Card>
      </CardGrid>
      <p>業種の癖が読めたら、次は<Link href="/finance/metrics">収益性と効率の指標</Link>へ。利益率だけでは見えない「資産をどれだけ効率よく使っているか」を診ます。業種ごとの目安表は<Link href="/finance/industry-cost">業界別の原価率・キャッシュ・支払い</Link>も参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/industry-cost" tag="会計・財務">業界別の原価率・キャッシュ・支払い</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標</RelatedLink>
                    <RelatedLink href="/finance/bs" tag="会計・財務">貸借対照表（BS）の読み方</RelatedLink>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値と株価（PBR）</RelatedLink>
                    <RelatedLink href="/finance" tag="会計・財務">会計・財務の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
