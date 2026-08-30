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
  IndexGrid,
  IndexCard,
  Analogy,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "業界",
};

const categories = [
  { num: "01", title: "製造業", desc: "素材・機械・自動車・電機・消費財。モノを作り、設備と在庫を抱える産業群" },
  { num: "02", title: "金融・保険", desc: "銀行・証券・保険・信販。お金そのものを扱い、利ざや・手数料・運用で稼ぐ" },
  { num: "03", title: "流通・小売・運輸", desc: "商社・小売・物流・運輸。モノと人を動かし、薄利多売と回転で稼ぐ" },
  { num: "04", title: "インフラ・エネルギー", desc: "電力・ガス・石油・建設・不動産。巨大な設備投資と長期の回収が特徴" },
  { num: "05", title: "情報通信", desc: "IT・通信・ソフトウェア・メディア・広告。低い変動費と高い成長性" },
  { num: "06", title: "生活・公共サービス", desc: "外食・旅行・教育・人材・医療・公共。人が価値を生む労働集約型" },
];

const pages = [
  // 製造業
  { href: "/industry/steel", parent: "製造業", title: "鉄鋼・非鉄金属", desc: "設備集約・市況連動の素材産業。高炉と電炉、鉄鋼一貫から脱炭素へ" },
  { href: "/industry/chemical", parent: "製造業", title: "化学・石油化学", desc: "コンビナートの装置産業。汎用品の市況とスペシャリティへの転換" },
  { href: "/industry/paper", parent: "製造業", title: "紙・パルプ・印刷", desc: "森林資源と巨大設備の装置産業。ペーパーレスと電子部材への多角化" },
  { href: "/industry/glass-cement", parent: "製造業", title: "ゴム・ガラス・セメント", desc: "素材の裏方。タイヤ・板ガラス・セメントと設備・市況" },
  { href: "/industry/machinery", parent: "製造業", title: "機械・産業機械", desc: "設備投資に連動するBtoB。受注産業と工作機械・建機" },
  { href: "/industry/auto", parent: "製造業", title: "自動車・自動車部品", desc: "日本の基幹産業。系列・すり合わせ、EV・CASEの地殻変動" },
  { href: "/industry/electronics", parent: "製造業", title: "電機・電子部品・半導体", desc: "総合電機の栄枯盛衰。部品・半導体の設備投資とシリコンサイクル" },
  { href: "/industry/cosmetics", parent: "製造業", title: "化粧品・生活用品", desc: "ブランドと高粗利。トイレタリーの日用品と広告宣伝費" },
  { href: "/industry/pharma", parent: "製造業", title: "医薬品", desc: "特許とパイプライン。巨額R&Dと特許切れ、高収益の構造" },
  { href: "/industry/apparel", parent: "製造業", title: "繊維・アパレル", desc: "川上素材と川下SPA。在庫リスクとサプライチェーン" },
  { href: "/industry/food", parent: "製造業", title: "食品・飲料", desc: "生活必需の安定需要。ブランド・原価率・薄利多売" },
  // 金融・保険
  { href: "/industry/bank", parent: "金融・保険", title: "銀行", desc: "「お金＝商品」の超高レバレッジ産業。業務粗利益と自己資本比率" },
  { href: "/industry/securities", parent: "金融・保険", title: "証券", desc: "売買仲介から資産運用・投資銀行へ。相場に左右される収益構造" },
  { href: "/industry/insurance", parent: "金融・保険", title: "生命保険・損害保険", desc: "先に集め後で払う「逆転した収支」。責任準備金と運用の産業" },
  { href: "/industry/credit", parent: "金融・保険", title: "信販・クレジット・リース", desc: "分割・立替・賃貸で信用を売るノンバンク。与信費用とリース会計" },
  // 流通・小売・運輸
  { href: "/industry/trading", parent: "流通・小売", title: "商社", desc: "ラーメンからロケットまで。トレードから事業投資へ、資源と持分法" },
  { href: "/industry/specialty", parent: "流通・小売", title: "専門店", desc: "カテゴリーキラーとSPA。専門特化で百貨店を侵食" },
  { href: "/industry/retail", parent: "流通・小売", title: "百貨店・スーパー・コンビニ", desc: "薄利多売の小売。CCC・PB・在庫回転とコンビニFC" },
  { href: "/industry/logistics", parent: "運輸・物流", title: "倉庫・物流", desc: "経済の血流。3PL・EC物流と2024年問題" },
  { href: "/industry/transport", parent: "運輸・物流", title: "航空・海運・鉄道・陸運", desc: "巨大装置産業。稼働率・市況・沿線開発" },
  // インフラ・エネルギー
  { href: "/industry/power", parent: "インフラ・エネルギー", title: "電力・ガス", desc: "地域独占から自由化へ。総括原価と巨大設備、福島後" },
  { href: "/industry/oil", parent: "インフラ・エネルギー", title: "石油・石炭", desc: "資源メジャーと元売り再編。市況と脱炭素の逆風" },
  { href: "/industry/renewables", parent: "インフラ・エネルギー", title: "再生可能エネルギー", desc: "前投資・後回収のプロジェクト型。FITとファイナンス" },
  { href: "/industry/construction", parent: "建設・不動産", title: "建設・設備", desc: "受注産業の会計。工事進行基準・受注残・談合の歴史" },
  { href: "/industry/realestate", parent: "建設・不動産", title: "不動産", desc: "土地神話とREIT。賃貸・分譲・仲介と含み益" },
  { href: "/industry/housing", parent: "建設・不動産", title: "住宅・住設機器", desc: "ハウスメーカーと住設。着工数連動と長期保証" },
  { href: "/industry/renovation", parent: "建設・不動産", title: "リフォーム・リノベーション", desc: "ストック型住宅市場。小口・労働集約と成長領域" },
  // 情報通信
  { href: "/industry/software", parent: "IT・通信", title: "ソフトウェア", desc: "在庫なき高粗利。パッケージからSaaS・ストック収益へ" },
  { href: "/industry/it-services", parent: "IT・通信", title: "ITサービス", desc: "SIerと受託開発。人月商売・多重下請けの構造" },
  { href: "/industry/telecom", parent: "IT・通信", title: "インターネット・通信", desc: "巨大設備とARPU。通信キャリアと経済圏競争" },
  { href: "/industry/entertainment", parent: "メディア・エンタメ", title: "エンターテインメント", desc: "当たり外れのIP産業。ゲーム・アニメと課金モデル" },
  { href: "/industry/mass-media", parent: "メディア・エンタメ", title: "マスコミ", desc: "テレビ・新聞の広告モデル。ネット逆転による凋落" },
  { href: "/industry/advertising", parent: "メディア・エンタメ", title: "広告・出版", desc: "グロス／ネットの代理店会計。電通・ネット広告・出版IP" },
  // 生活・公共サービス
  { href: "/industry/restaurant", parent: "生活・サービス", title: "フードサービス", desc: "FLコストと多店舗。デフレ競争とFC・現金商売" },
  { href: "/industry/travel", parent: "生活・サービス", title: "旅行・ホテル", desc: "装置産業のホテルと純額の旅行。RevPAR・稼働率・コロナ" },
  { href: "/industry/education", parent: "教育・人材", title: "教育", desc: "前受金と少子化。学習塾・予備校・EdTech" },
  { href: "/industry/staffing", parent: "教育・人材", title: "人材サービス", desc: "人が商品。派遣の粗利と紹介、リクルート" },
  { href: "/industry/consulting", parent: "教育・人材", title: "コンサルティング", desc: "人が資産。稼働率・単価と戦略／IT系ファーム" },
  { href: "/industry/healthcare", parent: "公共・医療", title: "医療・福祉", desc: "公定価格の非営利。診療・介護報酬と人件費率" },
  { href: "/industry/government", parent: "公共・医療", title: "政府・自治体", desc: "公会計の世界。税収と歳出、企業会計との違い" },
  { href: "/industry/services", parent: "公共・医療", title: "その他サービス", desc: "労働集約のサービス業。無形・人件費率・多店舗" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界</Eyebrow>
        <h1>業界 ― 歴史と会計から産業の「クセ」を読む</h1>
        <Lead>
          同じ「会社」でも、銀行と製造業とIT企業では<Term>儲け方も、決算書の形も、リスクの在りかもまるで違います</Term>。その違いは偶然ではなく、それぞれの業界が歩んできた<Term>歴史的経緯</Term>の産物です。この章では約40の業界を「<Term>産業史 → 会計・財務の特徴 → 企業規模・主要プレイヤー</Term>」の3つの視点で解剖し、<Link href="/finance">会計・財務</Link>で学んだ決算書の読み方を、業界ごとの現実に当てはめていきます。
        </Lead>
      </Hero>

      <Heading num="01">この章の見取り図 ― 6つの産業カテゴリ</Heading>
      <p>産業は大きく6つのカテゴリに分けられます。それぞれ「何で稼ぐか」「何を資産に持つか」が異なり、決算書の形にそのまま表れます。</p>
      <IndexGrid>
        {categories.map((c) => (
          <IndexCard key={c.num} href="/industry" num={c.num} title={c.title}>
            {c.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Analogy label="💡 なぜ業界ごとに決算書が違うのか">
        決算書は<Term>ビジネスモデルの鏡</Term>です。銀行は「預金という借金で集めた金を貸して利ざやを取る」から自己資本はわずか数%。製造業は工場と在庫を抱えるから固定資産が重い。IT企業は在庫も設備もほぼ無いから変動費が低い。<strong>数字の形を見れば、その業界がどう稼いでいるかが逆算できる</strong> ― これが業界を学ぶいちばんの効用です。
      </Analogy>

      <Heading num="02">全業界一覧</Heading>
      <p>各ページは1つの業界を「産業史・会計財務・企業規模」で通しで読めるようまとめています。関心のあるところから読み始めてください。</p>
      <IndexGrid>
        {pages.map((p) => (
          <IndexCard key={p.href} href={p.href} num={p.parent} title={p.title}>
            {p.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <p>業界の会計を深く読むには、まず<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/industry-cost">業界別の原価率・キャッシュ・支払い</Link>、<Link href="/finance/analysis">三表から会社を診断する</Link>を押さえておくと、各業界の「クセ」がくっきり見えてきます。</p>

      <DocsFooter />
    </DocsPage>
  );
}
