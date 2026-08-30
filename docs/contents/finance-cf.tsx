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
  title: "キャッシュフローと三表のつながり",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>キャッシュフローと三表のつながり</h1>
        <Lead>
          <Term>キャッシュフロー計算書（CF）</Term>は「期首残高 → 1年間の現金の増減 → 期末残高」を、<Term>営業・投資・財務の3つの活動</Term>に分けて示す家計簿です。3つの符号（プラス／マイナス）の組み合わせを見るだけで、その会社がいまどんな経営フェーズにいるかが読めます。最後に、財務三表が1本の線でつながる仕組みを押さえます。
        </Lead>
      </Hero>

      <Heading num="01">CFは3つの活動に分かれる</Heading>
      <p>現金の動きを「何によるものか」で3つに分類します。この分類のおかげで、同じ「現金が増えた」でも、本業で稼いだのか借金で増やしたのかを区別できます。</p>
      <table>
        <thead>
          <tr><th>区分</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">営業CF</td><td>本業で稼いだ／使ったお金</td><td>客からの入金</td></tr>
          <tr><td className="hl">投資CF</td><td>投資に使った／売却で得たお金</td><td>設備・子会社の購入・売却（※人件費はここに入らない）</td></tr>
          <tr><td className="hl">財務CF</td><td>資金調達・返済</td><td>借入・返済・配当</td></tr>
        </tbody>
      </table>
      <Aside label="📎">
        投資CFに入るのは、原則<strong>BSの資産に計上されるもの</strong>（固定資産など）です。人件費は投資ではなく営業CF側に入ります。「設備＝投資、人＝営業」と覚えておくと迷いません。
      </Aside>

      <Heading num="02">符号の組み合わせで経営パターンが読める</Heading>
      <p>営業・投資・財務それぞれのプラス／マイナスの組み合わせが、会社の経営スタイルを物語ります。代表的な4パターンです。</p>
      <table>
        <thead>
          <tr><th>パターン</th><th>営業</th><th>投資</th><th>財務</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">①優良企業型</td><td>＋</td><td>−</td><td>−</td><td>本業で稼ぎ、将来投資し、借金返済・株主還元。<strong>最も望ましい</strong></td></tr>
          <tr><td className="hl">②積極投資型</td><td>＋</td><td>−（大）</td><td>＋</td><td>本業で稼ぐが、さらに借入して投資。やりすぎると安全性に不安</td></tr>
          <tr><td className="hl">③資産売却・返済型</td><td>＋</td><td>＋</td><td>−</td><td>設備・子会社を売って返済。危機か、選択と集中の前向きな整理か</td></tr>
          <tr><td className="hl">④ベンチャー型</td><td>−</td><td>−</td><td>＋</td><td>本業は未黒字だが、投資家から資金調達し投資継続。ITベンチャーに典型</td></tr>
        </tbody>
      </table>
      <Diagram caption="3つの符号の組み合わせで、会社の経営フェーズが読める">
        <svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={40} width={120} height={70} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={80} y={32} fill="#f2f2f2" fontSize="11" textAnchor="middle">①優良企業型</text>
          <text x={80} y={72} fill="#9a9a9a" fontSize="13" textAnchor="middle">＋ − −</text>
          <text x={80} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">稼ぎ・投資・還元</text>

          <rect x={160} y={40} width={120} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={220} y={32} fill="#f2f2f2" fontSize="11" textAnchor="middle">②積極投資型</text>
          <text x={220} y={72} fill="#9a9a9a" fontSize="13" textAnchor="middle">＋ −大 ＋</text>
          <text x={220} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">借りて攻める</text>

          <rect x={300} y={40} width={120} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={360} y={32} fill="#f2f2f2" fontSize="11" textAnchor="middle">③売却・返済型</text>
          <text x={360} y={72} fill="#9a9a9a" fontSize="13" textAnchor="middle">＋ ＋ −</text>
          <text x={360} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">売って返す</text>

          <rect x={440} y={40} width={120} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={500} y={32} fill="#f2f2f2" fontSize="11" textAnchor="middle">④ベンチャー型</text>
          <text x={500} y={72} fill="#9a9a9a" fontSize="13" textAnchor="middle">− − ＋</text>
          <text x={500} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">集めて投資</text>
        </svg>
      </Diagram>
      <p>本業で生んだ現金から投資分を差し引いた<Term>フリーキャッシュフロー（FCF）＝営業CF − 投資CF</Term>は、企業価値の根幹です。営業が投資を上回る（FCFがプラス）のが望ましい状態です。</p>

      <Heading num="03">数字を鵜呑みにしない ― 会計区分と実態を照合する</Heading>
      <p>CFの符号は事業のライフサイクル（導入→成長→成熟→衰退）にほぼ対応しますが、会計上の区分が実態をミスリードすることもあります。たとえば、投資CFが大きくマイナスに見えても、その正体が<Term>3ヶ月超の定期預金</Term>の預け入れ（会計上は投資CFに計上）だった、というケースがあります。<Term>会計上の区分と事業実態を照合する</Term>癖をつけましょう。</p>

      <Heading num="04">三表は1本の線でつながる</Heading>
      <p>ここまでの<Link href="/finance/pl">PL</Link>・<Link href="/finance/bs">BS</Link>・CFは、バラバラではなく1本の線でつながっています。</p>
      <Diagram caption="稼ぐ力（PL）→ 安全性（BS）→ 潤沢な現金（CF）。原点はいつも「稼ぐ力」">
        <svg viewBox="0 0 600 110" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={35} width={150} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={55} fill="#f2f2f2" fontSize="12" textAnchor="middle">稼ぐ力（PL）</text>
          <text x={95} y={71} fill="#9a9a9a" fontSize="10" textAnchor="middle">緩やかな階段</text>

          <rect x={225} y={35} width={150} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={55} fill="#f2f2f2" fontSize="12" textAnchor="middle">安全性（BS）</text>
          <text x={300} y={71} fill="#9a9a9a" fontSize="10" textAnchor="middle">厚い純資産</text>

          <rect x={430} y={35} width={150} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={505} y={55} fill="#f2f2f2" fontSize="12" textAnchor="middle">潤沢な現金（CF）</text>
          <text x={505} y={71} fill="#9a9a9a" fontSize="10" textAnchor="middle">優良企業型</text>

          <line x1={170} y1={57} x2={223} y2={57} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCf)" />
          <line x1={375} y1={57} x2={428} y2={57} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCf)" />
          <defs>
            <marker id="arrowCf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <Analogy label="💡 たとえるなら">
        PLが緩やかな階段（＝しっかり稼ぐ）だからこそ、BSに厚い純資産が積み上がり、CFが優良企業型（＋−−）になる。3表は原因と結果の連鎖です。だから会社分析とは、この線を上流から下流へ辿り、どこで詰まっているかを見つける作業になります。
      </Analogy>

      <p>三表を読めるようになったら、次はこの線を使って第三者の会社を「診断」します。<Link href="/finance/analysis">三表から会社を診断する</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
                    <RelatedLink href="/finance/thinking" tag="会計・財務">会計 vs ファイナンス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
