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
  Diagram,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "会計・財務",
};

const chapters = [
  {
    href: "/finance/statements",
    parent: "第1章",
    title: "財務三表の全体像",
    desc: "PL・BS・CFが何を表すか。まず図で全体像をつかむ",
  },
  {
    href: "/finance/analysis",
    parent: "第2章",
    title: "三表から会社を診断する",
    desc: "業種の癖・ROA・CCC・PBRで良い会社／危ない会社を見分ける",
  },
  {
    href: "/finance/cash",
    parent: "第3章",
    title: "現金がすべて ― 黒字倒産と負債",
    desc: "利益でなく現金で会社を見る、経営者の視点",
  },
  {
    href: "/finance/payroll",
    parent: "第4章",
    title: "粗利益で人件費・給与を設計する",
    desc: "給料を「なんとなく」でなく数字の根拠で決める",
  },
  {
    href: "/finance/thinking",
    parent: "第5章",
    title: "会計 vs ファイナンス",
    desc: "過去と利益の会計、未来とキャッシュのファイナンス",
  },
];

const pages = [
  { href: "/finance/statements", parent: "第1章", title: "財務三表の全体像", desc: "PL・BS・CFの役割と、3つが1本の線でつながる仕組み" },
  { href: "/finance/pl", parent: "第1章", title: "損益計算書（PL）― 5つの利益", desc: "売上から費用を順に引く階段。5つの利益と立場ごとの注目点" },
  { href: "/finance/bs", parent: "第1章", title: "貸借対照表（BS）の読み方", desc: "右から読む。縦縦横横で健全性を4ステップ判定" },
  { href: "/finance/cf", parent: "第1章", title: "キャッシュフローと三表のつながり", desc: "営業・投資・財務の符号で経営パターンを読む" },
  { href: "/finance/cost", parent: "第1章", title: "固定費・変動費・限界利益", desc: "風船会計で費用構造を切り分け、利益の伸ばし方を知る" },
  { href: "/finance/industry-cost", parent: "第2章", title: "業界別の原価率・キャッシュ・支払い", desc: "業界タイプ別の目安表。原価率・資金繰り・支払条件の地図" },
  { href: "/finance/analysis", parent: "第2章", title: "三表から会社を診断する", desc: "BSはビジネスモデルの鏡。業種ごとに必ず癖が出る" },
  { href: "/finance/metrics", parent: "第2章", title: "収益性と効率の指標", desc: "利益率だけ見ると騙される。ROAとCCCで資本効率を診る" },
  { href: "/finance/valuation", parent: "第2章", title: "企業価値と株価（PBR）", desc: "市場は未来を買う。非財務資本・ESG・日本のPBR1倍割れ" },
  { href: "/finance/cash", parent: "第3章", title: "現金がすべて ― 黒字倒産と負債", desc: "倒産は赤字でなく資金ショート。負債は武器という逆説" },
  { href: "/finance/ratios", parent: "第3章", title: "指標に惑わされない", desc: "自己資本比率・流動比率・ROEが実態を映さない理由" },
  { href: "/finance/payroll", parent: "第4章", title: "粗利益で人件費・給与を設計する", desc: "1人当たり粗利益から目標売上・給与・賞与を逆算する" },
  { href: "/finance/thinking", parent: "第5章", title: "会計 vs ファイナンス", desc: "ファイナンスの3機能と、キャッシュで意思決定する思考法" },
  { href: "/finance/pe", parent: "第5章", title: "PE・LBO・MBOの仕組み", desc: "レバレッジで安く買って高く売る、投資手法の本質" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>会計・財務 ― 数字で会社を読み、動かす</h1>
        <Lead>
          会計・財務は「経理の人の仕事」ではありません。<Term>決算書を読めれば、取引先の危うさ・自社の体力・投資先の実力が見えます</Term>。出世して経営層に近づくほど、そして自分のお金を投資に回すほど、数字で会社を語る力がものを言います。この章では、決算書ゼロ知識から始めて、会社を<Term>読む → 診断する → 現金で捉える → ファイナンス思考で決める</Term>までを一気通貫で扱います。
        </Lead>
      </Hero>

      <Heading num="01">この章の主役 ― 財務と経営、2つの視点</Heading>
      <p>同じ決算書でも、<Term>投資家（財務の視点）</Term>と<Term>経営者（経営の視点）</Term>ではまるで違う結論が出ます。投資家は「純資産が厚い＝安全」「資本効率が高い＝良い会社」と見る。一方、現場で会社を回す経営者は「利益より現金」「純資産があっても現金がなければ倒産する」と見る。この<Term>2つの物差しの衝突</Term>こそ、会計・財務を面白くし、そして実務で効く核心です。どちらも正しく、測っている対象が違うだけ ― これを理解すると数字の羅列が「会社の性格・ストーリー」に変わります。</p>
      <Diagram caption="同じBSを、投資家は「安全性・効率」で、経営者は「現金がいくら残るか」で読む">
        <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={230} y={64} width={140} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={300} y={84} fill="#f2f2f2" fontSize="12" textAnchor="middle">同じ決算書</text>
          <text x={300} y={100} fill="#9a9a9a" fontSize="10" textAnchor="middle">PL・BS・CF</text>

          <rect x={20} y={20} width={170} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={105} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">投資家（財務）</text>
          <text x={105} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">安全性・資本効率で診る</text>

          <rect x={410} y={20} width={170} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={495} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">経営者（経営）</text>
          <text x={495} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">現金・資金繰りで診る</text>

          <line x1={190} y1={52} x2={245} y2={70} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={410} y1={52} x2={355} y2={70} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={150} fill="#9a9a9a" fontSize="10" textAnchor="middle">→ 逆の結論が出る。どちらも正しい（測る対象が違う）</text>
        </svg>
      </Diagram>

      <Heading num="02">5つの章で学ぶ</Heading>
      <p>抽象（決算書の読み方）から、自社・投資先の意思決定へと降りていく順に並んでいます。第1章で「読む」力を、第2章で第三者を「診る」力を、第3章で経営者の「現金」の目を、第4章で給与設計という具体、第5章でファイナンス思考の「決める」力をつけます。</p>
      <IndexGrid>
        {chapters.map((c) => (
          <IndexCard key={c.href} href={c.href} num={c.parent} title={c.title}>
            {c.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="03">全ページ一覧</Heading>
      <p>各章はさらに個別トピックに分かれています。関心のあるところから読み始めても構いません。</p>
      <IndexGrid>
        {pages.map((p) => (
          <IndexCard key={p.href} href={p.href} num={p.parent} title={p.title}>
            {p.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Analogy label="💡 なぜ読めると差がつくか">
        「日本の経営者の8割はBS（貸借対照表）まで読めない」とも言われ、上場企業でBSまでちゃんと分析できる人は5〜10%程度とされます。裏を返せば、決算書を読めるだけで少数派に入れるということ。最初のコツはただ一つ ―<Term> 数字をいきなり読まず、まず図に置き換えて全体像を掴み、必要なら数字に降りる</Term>。この2ステップが、決算書で挫折しない秘訣です。
      </Analogy>

      <p>会計・財務は<Link href="/management">マネジメント</Link>（人と組織で成果を出す）や<Link href="/ops/compliance">運用の法令・コンプライアンス</Link>とも地続きです。経営を数字とヒトの両面から捉えるために、あわせて読むと理解が深まります。</p>

      <DocsFooter />
    </DocsPage>
  );
}
