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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "損益計算書（PL）― 5つの利益",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>損益計算書（PL）― 5つの利益</h1>
        <Lead>
          <Term>損益計算書（PL）</Term>は「売上高から、いろいろな費用を順番に引いていく階段」です。ポイントは、<Term>利益は1種類ではなく5種類あり</Term>、それぞれの間に「引くもの・足すもの」が挟まること。5つの利益の意味と、どの利益を誰が重視するかを押さえれば、会社の稼ぐ力が立体的に見えてきます。
        </Lead>
      </Hero>

      <Heading num="01">売上1億円のラーメン店で見る5つの利益</Heading>
      <p>売上高を出発点に、費用を段階的に引いていきます。各段で「①売上総利益 → ②営業利益 → ③経常利益 → ④税引前当期純利益 → ⑤当期純利益」という5つの利益が現れます。</p>
      <table>
        <thead>
          <tr><th>段階</th><th>計算</th><th>金額</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">売上高</td><td>―</td><td>1億円</td><td></td></tr>
          <tr><td>（−）原価（変動費・仕入）</td><td>原価率30%</td><td>−3,000万</td><td>売上に連動する費用</td></tr>
          <tr><td className="hl">① 売上総利益（粗利益＝アラリ）</td><td>売上−原価</td><td><strong>7,000万</strong></td><td>商売の弾き出し力</td></tr>
          <tr><td>（−）固定費（販管費：人件費・家賃など）</td><td></td><td>−5,000万</td><td>※最大は人件費</td></tr>
          <tr><td className="hl">② 営業利益</td><td>粗利益−固定費</td><td><strong>2,000万</strong></td><td><strong>本業</strong>の利益。銀行が最重視</td></tr>
          <tr><td>（＋）営業外収益（受取利息・雑収入など）</td><td>＋200万</td><td></td><td>本業外で増える</td></tr>
          <tr><td>（−）営業外費用（支払利息など）</td><td>−100万</td><td></td><td>借入利息など</td></tr>
          <tr><td className="hl">③ 経常利益（ケイツネ）</td><td>②＋営業外収益−営業外費用</td><td><strong>2,100万</strong></td><td>会社の総合実力。経営者が最重視</td></tr>
          <tr><td>（＋）特別利益（固定資産売却益など）</td><td>＋100万</td><td></td><td>臨時。車を簿価より高く売った等</td></tr>
          <tr><td>（−）特別損失（退職金・売却損など）</td><td>−300万</td><td></td><td>臨時の出費</td></tr>
          <tr><td className="hl">④ 税引前当期純利益</td><td>③＋特別利益−特別損失</td><td><strong>1,900万</strong></td><td></td></tr>
          <tr><td>（−）法人税（約33％＝1/3）</td><td>−627万</td><td></td><td></td></tr>
          <tr><td className="hl">⑤ 当期純利益</td><td>税引前−法人税</td><td><strong>1,273万</strong></td><td>最終利益。BSの利益剰余金へ</td></tr>
        </tbody>
      </table>
      <Diagram caption="PLは、売上から費用を順に引いて5つの利益が現れる「階段」">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={30} width={110} height={150} rx="4" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={85} y={22} fill="#f2f2f2" fontSize="11" textAnchor="middle">売上高</text>
          <text x={85} y={110} fill="#9a9a9a" fontSize="11" textAnchor="middle">1億円</text>

          <rect x={160} y={60} width={90} height={120} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={205} y={52} fill="#f2f2f2" fontSize="10" textAnchor="middle">①粗利益</text>
          <text x={205} y={125} fill="#9a9a9a" fontSize="10" textAnchor="middle">7,000万</text>

          <rect x={270} y={110} width={90} height={70} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={102} fill="#f2f2f2" fontSize="10" textAnchor="middle">②営業利益</text>
          <text x={315} y={150} fill="#9a9a9a" fontSize="10" textAnchor="middle">2,000万</text>

          <rect x={380} y={105} width={90} height={75} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={425} y={97} fill="#f2f2f2" fontSize="10" textAnchor="middle">③経常利益</text>
          <text x={425} y={148} fill="#9a9a9a" fontSize="10" textAnchor="middle">2,100万</text>

          <rect x={490} y={140} width={90} height={40} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={535} y={132} fill="#f2f2f2" fontSize="10" textAnchor="middle">⑤純利益</text>
          <text x={535} y={165} fill="#9a9a9a" fontSize="10" textAnchor="middle">1,273万</text>
        </svg>
      </Diagram>

      <Heading num="02">押さえる要点 ― どの利益を誰が重視するか</Heading>
      <p>5つ全部を暗記する必要はありません。<Term>日常管理は「粗利益・営業利益・経常利益」の3つ</Term>で十分です。重要なのは、<Term>どの利益を重視するかは立場で違う</Term>という点です。</p>
      <table>
        <thead>
          <tr><th>立場</th><th>重視する利益</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">銀行</td><td>営業利益</td><td>本業で稼げているか（融資の返済原資）</td></tr>
          <tr><td className="hl">経営者</td><td>経常利益</td><td>節税で特別損失を大きく動かすため、その上の経常利益で会社の姿を見る</td></tr>
          <tr><td className="hl">投資家</td><td>当期純利益・営業利益</td><td>最終的な株主の取り分と、本業の実力の両方を見る</td></tr>
        </tbody>
      </table>
      <p>特別利益・特別損失は突発的で、実力を反映しない「おまけの利益」です。たとえばコロナ時のように「営業利益はマイナスだが、補助金（雑収入）で経常利益はプラス」という会社もありますが、<Term>銀行は営業利益で見ます</Term>。なお経常利益の目標は<Term>粗利益の10〜20%</Term>が目安。この例なら約700万で、この考え方は<Link href="/finance/payroll">人件費・給与の設計</Link>へ直結します。</p>

      <Heading num="03">階段の「傾斜」で収益力が見える</Heading>
      <p>PLを階段の図にすると、<Term>傾斜が緩やかなほど収益力が高い</Term>（利益率が高い）と読めます。段差がガクンと落ちる箇所があれば、そこにコストの重さが出ています。売上総利益で急落するなら原価率が重く、営業利益で急落するなら人件費など固定費が重い、という具合です。</p>
      <table>
        <thead>
          <tr><th>営業利益率</th><th>評価の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">5%前後</td><td>上場企業の平均的水準（業種で異なる）</td></tr>
          <tr><td className="hl">1%台</td><td>上場企業の中でも稼ぐ力は劣る</td></tr>
          <tr><td className="hl">20%超</td><td>日本企業では非常に稀な高収益</td></tr>
        </tbody>
      </table>

      <Heading num="04">企業事例 ― 売上規模で判断してはいけない</Heading>
      <p>売上の大きさと稼ぐ力は別物です。利益率と、どの段階で利益が出ているかを見ないと、会社の実力を見誤ります。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>数字</th><th>読み方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">A社</td><td>売上6,720億／営業利益率1.1%・純利益率1%</td><td>規模は大きいがギリギリ黒字</td></tr>
          <tr><td className="hl">G社</td><td>売上はA社より少ない／営業利益率22.2%・純利益率13%超</td><td><strong>小さくても圧倒的に「うまい商売」</strong></td></tr>
          <tr><td className="hl">F社</td><td>純利益率16%と高いが、営業利益はマイナス</td><td>固定資産売却の特別利益で一時的に黒字。翌年の再現性に疑問</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️">
        企業がIR（投資家向け広報）で強調する利益（営業利益か当期純利益か）は「アピールしたい方」です。F社のように、強調していない方 ― 本業の営業利益 ― を見ると実態が違うことがあります。<strong>強調していない利益も必ず確認する</strong>のが鉄則です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        PLの階段は「なだらかな下り坂ほど良い」スロープです。売上という頂上から、費用というステップを下りながら手元に残る利益を見ていく。急な段差があれば、そこで大きくお金が消えている ― どこが急かを見るだけで、原価が重いのか固定費が重いのか、会社のクセが一目でわかります。
      </Analogy>

      <p>PLで「稼ぐ力」を読んだら、次は<Link href="/finance/bs">貸借対照表（BS）</Link>で「その利益をどう蓄え、何に使っているか」を見ます。費用を固定費と変動費に分ける方法は<Link href="/finance/cost">固定費・変動費・限界利益</Link>で扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/bs" tag="会計・財務">貸借対照表（BS）の読み方</RelatedLink>
                    <RelatedLink href="/finance/cost" tag="会計・財務">固定費・変動費・限界利益</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
