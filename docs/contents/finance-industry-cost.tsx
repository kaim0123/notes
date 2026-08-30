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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "業界別の原価率・キャッシュ・支払い",
};

const industryTypes = [
  {
    type: "飲食・外食",
    costRate: "30〜40%（F＝食材）",
    grossMargin: "60〜70%",
    cash: "毎日仕入れが必要。客からは即日現金",
    payment: "仕入は月次・リース（店舗）を好む",
    ccc: "短い（現金商売）。FL比率60%前後が生命線",
    href: "/industry/restaurant",
  },
  {
    type: "小売（実店舗）",
    costRate: "60〜80%",
    grossMargin: "20〜40%",
    cash: "在庫を抱える。売上は速いが薄利",
    payment: "買掛を遅らせ、在庫回転で稼ぐ",
    ccc: "在庫日数が鍵。優秀店舗はCCC圧縮",
    href: "/industry/retail",
  },
  {
    type: "卸売・商社",
    costRate: "85〜95%",
    grossMargin: "5〜15%",
    cash: "売上は巨大だが1%の利益。回転がすべて",
    payment: "売掛・買掛が大きく長い。資金調達力が生命線",
    ccc: "CCCが長くなりがち。回転率で勝負",
    href: "/industry/trading",
  },
  {
    type: "建設・設備",
    costRate: "70〜90%（材料・外注）",
    grossMargin: "10〜30%",
    cash: "工事代金回収まで時間（完成払・進行基準）",
    payment: "前払い・現金購入が多い。下請け支払遅延が社会問題",
    ccc: "売掛・未成工事が膨らむ。受注残が先行指標",
    href: "/industry/construction",
  },
  {
    type: "製造（一般）",
    costRate: "50〜80%",
    grossMargin: "20〜50%",
    cash: "設備投資が大きい。在庫・仕掛品を抱える",
    payment: "原材料はケースバイケース（長期契約・市況連動）",
    ccc: "在庫＋売掛。景気・市況に連動",
    href: "/industry/machinery",
  },
  {
    type: "自動車・部品",
    costRate: "70〜85%",
    grossMargin: "15〜30%",
    cash: "巨額の設備・サプライチェーン。在庫リスク",
    payment: "系列・すり合わせ。下請けへの支払条件が論点",
    ccc: "長いCCC。EV転換で設備更新圧力",
    href: "/industry/auto",
  },
  {
    type: "IT・ソフトウェア",
    costRate: "10〜30%（サーバー等）",
    grossMargin: "70〜90%",
    cash: "人件費中心。SaaSは前受でCFが先行",
    payment: "リース・クラウドを活用しやすい",
    ccc: "SaaSは売掛より前受（CCCマイナス方向）",
    href: "/industry/software",
  },
  {
    type: "ITサービス・SI",
    costRate: "外注60〜80%含む",
    grossMargin: "20〜40%",
    cash: "人月商売。売掛回収が遅れがち",
    payment: "外注費・人件費のタイムラグが資金繰りの穴",
    ccc: "売掛日数が長い。多重下請け構造",
    href: "/industry/it-services",
  },
  {
    type: "コンサル・士業",
    costRate: "5〜20%（外注除く）",
    grossMargin: "80〜95%",
    cash: "ほぼ人件費のみ。高粗利だが稼働率依存",
    payment: "請求は月末締・翌月払いが多い",
    ccc: "売掛中心。稼働率×単価がKPI",
    href: "/industry/consulting",
  },
  {
    type: "不動産（開発）",
    costRate: "—",
    grossMargin: "—",
    cash: "土地・建物に巨額投下。分譲までCFマイナス",
    payment: "金融機関借入・前受金（分譲契約）",
    ccc: "プロジェクト型。含み益がBSに表れる",
    href: "/industry/realestate",
  },
  {
    type: "金融・保険",
    costRate: "概念が異なる",
    grossMargin: "—",
    cash: "お金自体が商品。レバレッジが極大",
    payment: "金利・手数料・準備金の世界",
    ccc: "一般製造業とは比較不可",
    href: "/industry/bank",
  },
  {
    type: "医療・福祉",
    costRate: "公定価格",
    grossMargin: "—",
    cash: "公定価格で収益上限。人件費率70%超も",
    payment: "保険請求サイクル。国の制度に依存",
    ccc: "非営利に近いPL構造",
    href: "/industry/healthcare",
  },
];

const industryIndex = [
  { href: "/industry/restaurant", tag: "生活・サービス", title: "フードサービス", desc: "FL比率・現金商売" },
  { href: "/industry/retail", tag: "流通・小売", title: "百貨店・スーパー・コンビニ", desc: "薄利・在庫回転" },
  { href: "/industry/trading", tag: "流通・小売", title: "商社", desc: "超高回転・薄利" },
  { href: "/industry/construction", tag: "建設・不動産", title: "建設・設備", desc: "工事進行基準・売掛" },
  { href: "/industry/machinery", tag: "製造業", title: "機械・産業機械", desc: "設備・在庫・受注" },
  { href: "/industry/auto", tag: "製造業", title: "自動車・自動車部品", desc: "サプライチェーン・長いCCC" },
  { href: "/industry/software", tag: "IT・通信", title: "ソフトウェア", desc: "高粗利・SaaS前受" },
  { href: "/industry/it-services", tag: "IT・通信", title: "ITサービス", desc: "人月商売・売掛" },
  { href: "/industry/consulting", tag: "教育・人材", title: "コンサルティング", desc: "稼働率×単価" },
  { href: "/industry/realestate", tag: "建設・不動産", title: "不動産", desc: "前受・含み益" },
  { href: "/industry/bank", tag: "金融・保険", title: "銀行", desc: "原価率比較対象外" },
  { href: "/industry/healthcare", tag: "公共・医療", title: "医療・福祉", desc: "公定価格・人件費率" },
  { href: "/industry/food", tag: "製造業", title: "食品・飲料", desc: "ブランド・原価率" },
  { href: "/industry/apparel", tag: "製造業", title: "繊維・アパレル", desc: "在庫リスク・CCC" },
  { href: "/industry/education", tag: "教育・人材", title: "教育", desc: "前受金・少子化" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>業界別の原価率・キャッシュ・支払い ― 数字のクセは商売の形から決まる</h1>
        <Lead>
          PLの原価率、BSの在庫と売掛、CFの入出金タイミング ― これらは業界をまたいでランダムではありません。<Term>何を売り、いつ代金をもらい、何に先に払うか</Term>が決まれば、ある程度の「形」が予測できます。ここでは業界タイプ別の目安表と、手元資金（資金繰り）が苦しく／楽になる理由をセットで押さえます。
        </Lead>
      </Hero>

      <Heading num="01">原価率だけ見ても足りない</Heading>
      <p>決算書を読むとき、まず押さえるべき指標は業界によって違います。製造・小売は<Term>原価率</Term>、外食は<Term>FL比率</Term>、IT・コンサルは<Term>人件費率と粗利益率</Term>が主役です。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">原価率</td><td>売上原価 ÷ 売上</td><td>現場でよく使う。<strong>高い＝粗利が薄い</strong></td></tr>
          <tr><td className="hl">粗利益率</td><td>1 − 原価率（限界利益率に近い）</td><td><Link href="/finance/payroll">損益分岐点</Link>の計算に直結</td></tr>
          <tr><td className="hl">FL比率（外食）</td><td>（食材原価＋人件費）÷ 売上</td><td>原価率だけでは足りない。<strong>L（人件費）</strong>が別軸</td></tr>
          <tr><td className="hl">人件費率</td><td>人件費 ÷ 売上</td><td>サービス・医療・SIなど労働集約型の生命線</td></tr>
        </tbody>
      </table>
      <p><Link href="/finance/pl">損益計算書（PL）</Link>の<Term>どの段で急落するか</Term>も業種のサインです。売上総利益で落ちるなら原価・仕入が重い（小売・卸・建設）。営業利益で落ちるなら固定費・人件費が重い（外食・SI・医療）と読めます。</p>
      <Analogy label="💡 たとえるなら">
        原価率は「材料の重さ」、キャッシュ事情は「財布の中身の動き」、支払条件は「取引先との約束事」です。体重（売上）が同じでも、背中に何を背負い、給料日と請求日がズレているかで、実際の生活（資金繰り）はまるで違います。
      </Analogy>

      <Heading num="02">業界タイプ別一覧表</Heading>
      <p>40業界すべてを1表に載せると読めないので、<Term>ビジネスモデルの型</Term>で束ねました。数値は目安です。詳細は各<Link href="/industry">業界ページ</Link>で確認してください。</p>
      <table>
        <thead>
          <tr>
            <th>業界タイプ</th>
            <th>原価率</th>
            <th>粗利益率</th>
            <th>キャッシュ事情</th>
            <th>支払い</th>
            <th>CCC・回転</th>
          </tr>
        </thead>
        <tbody>
          {industryTypes.map((row) => (
            <tr key={row.href}>
              <td className="hl"><Link href={row.href}>{row.type}</Link></td>
              <td>{row.costRate}</td>
              <td>{row.grossMargin}</td>
              <td>{row.cash}</td>
              <td>{row.payment}</td>
              <td>{row.ccc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Aside label="📎">
        数値は<strong>目安・典型パターン</strong>です。同一業界内でもビジネスモデル（FC vs 直営、SaaS vs 受託、総合商社 vs 専門商社）で大きく異なります。個別企業の分析は必ず決算書で確認してください。金融・医療は原価率フレームが効かない業界として、表内で別枠にしています。
      </Aside>

      <Heading num="03">キャッシュの回り方 ― 3つの軸</Heading>
      <p>本文の「キャッシュ」は、口語の<Term>手元資金・資金繰り</Term>と、会計の<Term>キャッシュフロー（CF）</Term>の両方を指します。PLの利益と手元の現金は一致しない ― その差が業界構造から生まれます。</p>

      <p><strong>軸1: 入金の速さ</strong></p>
      <table>
        <thead>
          <tr><th>パターン</th><th>典型業界</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">即日現金</td><td>外食・コンビニ</td><td>売掛ほぼゼロ。日銭で仕入れを回せる</td></tr>
          <tr><td className="hl">月次売掛</td><td>製造・SI・卸</td><td>納品から入金まで30〜90日。資金が「宙に浮く」</td></tr>
          <tr><td className="hl">前受金</td><td>SaaS・不動分譲・学習塾</td><td>先にお金 → CFはPLより先行。契約負債（繰延収益）</td></tr>
        </tbody>
      </table>

      <p><strong>軸2: 在庫・設備（お金が「形」になる）</strong></p>
      <table>
        <thead>
          <tr><th>パターン</th><th>典型業界</th><th>BSへの表れ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">在庫</td><td>小売・製造・アパレル</td><td>棚卸資産。死蔵在庫＝キャッシュの死</td></tr>
          <tr><td className="hl">仕掛品・未成工事</td><td>建設・受託製造</td><td>進行基準。完成までCFが出ていく</td></tr>
          <tr><td className="hl">設備</td><td>製造・鉄道・通信</td><td>有形固定資産。減価償却はCFに非キャッシュ</td></tr>
        </tbody>
      </table>

      <p><strong>軸3: CCC（キャッシュコンバージョンサイクル）</strong></p>
      <p style={{ fontFamily: "monospace" }}>CCC ＝ 在庫回転日数 ＋ 売掛金回転日数 − 買掛金回転日数</p>
      <table>
        <thead>
          <tr><th>CCCの長さ</th><th>典型</th><th>経営の意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">短い／マイナス</td><td>外食・コンビニ・Apple・Amazon・SaaS</td><td>事業を回すほど手元資金が増えやすい</td></tr>
          <tr><td className="hl">長い</td><td>建設・受託SI・在庫過多の小売</td><td>同じ利益でも運転資金が必要。成長＝資金不足リスク</td></tr>
        </tbody>
      </table>

      <Diagram caption="業界タイプごとの手元資金の動き方（模式図）">
        <svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
          <text x={95} y={18} fill="#f2f2f2" fontSize="11" textAnchor="middle">外食型</text>
          <polyline points="20,120 40,100 60,115 80,95 100,110 120,90 140,105 160,100 170,100" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={145} fill="#9a9a9a" fontSize="9" textAnchor="middle">毎日小さく入出金</text>

          <text x={280} y={18} fill="#f2f2f2" fontSize="11" textAnchor="middle">建設型</text>
          <polyline points="190,130 220,125 250,120 280,115 310,100 340,85 370,60 400,35 430,25 460,20" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={145} fill="#9a9a9a" fontSize="9" textAnchor="middle">長期マイナス→完成で回収</text>

          <text x={465} y={18} fill="#f2f2f2" fontSize="11" textAnchor="middle">SaaS型</text>
          <polyline points="490,140 510,80 530,75 550,70 560,68" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={465} y={145} fill="#9a9a9a" fontSize="9" textAnchor="middle">前受で先にプラス</text>

          <line x1={10} y1={160} x2={550} y2={160} stroke="#5f5f5f" strokeWidth="1" />
          <text x={280} y={185} fill="#9a9a9a" fontSize="10" textAnchor="middle">時間 →</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        CCCは「お金の旅行日数」です。出発（仕入・人件費の支払）から帰宅（売上の入金）まで何日かかるか。旅行が長い業界ほど、道中の宿泊費（運転資金）を用意しないと破綻します。<Link href="/finance/cash">黒字倒産</Link>は、この旅行日数と返済のタイミングがズレたときに起きます。
      </Analogy>

      <Heading num="04">支払いの考え方 ― 早く払う vs 遅らせる</Heading>
      <p>支払条件は「礼儀」ではなく、<Term>交渉力とリスク分担</Term>の結果です。</p>
      <table>
        <thead>
          <tr><th>戦略</th><th>誰がやるか</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">買掛を遅らせる</td><td>小売・大手メーカー</td><td>在庫を売る前に代金を払わない。仕入先の運転資金を借りている</td></tr>
          <tr><td className="hl">前払い・現金</td><td>建設の下請・個人職人</td><td>取引先の倒産リスク。信用が薄いと現金要求</td></tr>
          <tr><td className="hl">リース・割賦</td><td>外食・IT・航空</td><td>設備を固定費化。BS上は使用権資産＋リース負債</td></tr>
          <tr><td className="hl">前受・サブスク</td><td>SaaS・塾・不動分譲</td><td>顧客の運転資金を借りる。CCC改善</td></tr>
        </tbody>
      </table>
      <p>条件が決算書にどう映るかもセットで覚えます。</p>
      <table>
        <thead>
          <tr><th>条件</th><th>BS</th><th>CF</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">買掛60日</td><td>買掛金（負債）増</td><td>支払い前にCFプラス</td></tr>
          <tr><td className="hl">売掛90日</td><td>売掛金（資産）増</td><td>入金前にCFマイナス</td></tr>
          <tr><td className="hl">前受（SaaS年契約）</td><td>契約負債（繰延収益）</td><td>先にCFプラス</td></tr>
          <tr><td className="hl">リース</td><td>使用権資産＋リース負債</td><td>毎月のリース料</td></tr>
        </tbody>
      </table>
      <Aside label="📎">
        建設業の「下請けへの支払遅延」は、元請のCCCを短く見せますが、サプライチェーン全体の資金繰りを悪化させます。支払条件は<strong>自分だけの問題ではない</strong>のです。
      </Aside>

      <Heading num="05">診断に使う ― 表から決算書を読む</Heading>
      <p>この表を地図に、第三者の決算書を読む手順は次のとおりです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>PLで業種を推測</h4>
          <p>原価率・営業利益率の水準感で業界タイプを当てる（<Link href="/finance/analysis">三表から会社を診断する</Link> §02）。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>BSでモデルを特定</h4>
          <p>在庫・売掛・固定資産・前受の比率で、商売の形を特定する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>CFで本当の体力</h4>
          <p>営業CFがPLと乖離していないか。黒字CF赤字・成長赤字の見分け。</p>
        </Card>
      </CardGrid>
      <p>軽いクイズで確認してみましょう。</p>
      <ul>
        <li><strong>Q1</strong>: 原価率75%・営業利益率3%・棚卸資産が大きい → 小売または卸売。次に<Link href="/finance/metrics">CCC</Link>と売上総資産回転率を見る。</li>
        <li><strong>Q2</strong>: 原価率15%・契約負債が増加・営業CFプラスだが営業利益マイナス → SaaS成長期。<Link href="/industry/software">ソフトウェア</Link>の繰延収益パターン。</li>
      </ul>
      <p>業種の癖が読めたら、実践の<Link href="/finance/analysis">三表から会社を診断する</Link>へ進みましょう。</p>

      <Heading num="06">業界詳細への索引</Heading>
      <p>§02のタイプに対応する主要業界ページです。歴史・プレイヤー・決算書の詳細は各ページで読めます。</p>
      <RelatedList>
        {industryIndex.map((item) => (
          <RelatedLink key={item.href} href={item.href} tag={item.tag}>
            {item.title} ― {item.desc}
          </RelatedLink>
        ))}
        <RelatedLink href="/industry" tag="業界">業界の全体像（全40業界）</RelatedLink>
      </RelatedList>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/finance/cost" tag="会計・財務">固定費・変動費・限界利益</RelatedLink>
            <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
            <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
            <RelatedLink href="/finance/payroll" tag="会計・財務">粗利益で人件費・給与を設計する</RelatedLink>
            <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
