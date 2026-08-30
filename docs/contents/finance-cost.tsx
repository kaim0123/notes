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
  title: "固定費・変動費・限界利益",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>固定費・変動費・限界利益 ― 風船会計で理解する</h1>
        <Lead>
          決算書のPLは、費用を<Term>固定費と変動費に分けて表示してくれません</Term>。だから自分で切り分ける必要があります。ここで役立つのが<Term>風船会計メソッド</Term>。PLを風船に見立てると、変動費・限界利益・固定費・営業利益の関係が直感的に掴め、「どこに手を打てば利益が伸びるか」が現場レベルで見えてきます。
        </Lead>
      </Hero>

      <Heading num="01">PL＝風船 のたとえ</Heading>
      <p>PLを風船に見立てます。売上という風船を膨らませ、その中の重り（変動費）を引いた残り（限界利益）が浮力になり、気球側の重り（固定費）を引いて、最後に残ったのが営業利益 ― という構図です。</p>
      <table>
        <thead>
          <tr><th>比喩</th><th>会計用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">風船の大きさ</td><td>売上高</td><td>1年で膨らませた風船のサイズ</td></tr>
          <tr><td className="hl">風船の中の重り</td><td>変動費</td><td>売上に比例して増える費用（材料・外注費など）</td></tr>
          <tr><td className="hl">重りを引いた残り</td><td>限界利益</td><td>売上 − 変動費</td></tr>
          <tr><td className="hl">気球側の重り</td><td>固定費</td><td>売上増減に関わらずかかる費用（家賃・人件費など）</td></tr>
          <tr><td className="hl">気球に残ったヘリウム</td><td>営業利益</td><td>限界利益 − 固定費</td></tr>
        </tbody>
      </table>
      <Diagram caption="風船が軽い（限界利益が大きい）ほど上に浮く＝収益性が高い">
        <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx={160} cy={70} rx={70} ry={55} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={160} y={55} fill="#f2f2f2" fontSize="11" textAnchor="middle">売上（風船）</text>
          <text x={160} y={78} fill="#9a9a9a" fontSize="10" textAnchor="middle">− 変動費（中の重り）</text>
          <text x={160} y={94} fill="#9a9a9a" fontSize="10" textAnchor="middle">＝ 限界利益（浮力）</text>
          <line x1={160} y1={125} x2={160} y2={155} stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={120} y={155} width={80} height={26} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={172} fill="#9a9a9a" fontSize="10" textAnchor="middle">固定費（気球側）</text>

          <rect x={300} y={40} width={200} height={110} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={400} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">限界利益 − 固定費</text>
          <text x={400} y={95} fill="#39ff6a" fontSize="12" textAnchor="middle">＝ 営業利益</text>
          <text x={400} y={122} fill="#9a9a9a" fontSize="10" textAnchor="middle">残ったヘリウムで浮く</text>
        </svg>
      </Diagram>

      <Heading num="02">固定費 vs 変動費の切り分けルール</Heading>
      <p>切り分けの魔法の問いはこれ一つです ― <Term>「100個作るか101個作るかで、その費用は変わるか？」変わらなければ固定費</Term>。小さいポーション（1単位増）で考えるのがコツです。カフェで当てはめてみます。</p>
      <table>
        <thead>
          <tr><th>費用</th><th>区分</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コーヒー豆・原料</td><td>変動費</td><td>1杯増えれば増える</td></tr>
          <tr><td className="hl">カップ・ストロー・容器</td><td>変動費</td><td>提供数に比例する備品</td></tr>
          <tr><td className="hl">家賃</td><td>固定費</td><td>100杯でも101杯でも同じ</td></tr>
          <tr><td className="hl">コーヒーマシン（設備）</td><td>固定費</td><td>売上に関わらずかかる</td></tr>
          <tr><td className="hl">人件費</td><td>固定費</td><td>コーヒー100杯と101杯で人を1人雇うか？→雇わない</td></tr>
        </tbody>
      </table>
      <Aside label="📎">
        人件費は「売上で変わる」と思われがちですが、1杯増えたくらいで人を増やすわけではないので<strong>固定費</strong>です。PLの販管費のうち最大の項目が人件費であり、営業利益で階段がガクンと落ちる会社は、たいてい固定費（＝人件費）が重いのです（<Link href="/finance/pl">損益計算書の階段の傾斜</Link>を参照）。
      </Aside>

      <Heading num="03">なぜ分けるのか ― 現場のアクションが変わる</Heading>
      <p>固定費と変動費では、打ち手のスピードと入口がまるで違います。</p>
      <table>
        <thead>
          <tr><th></th><th>変動費（風船の中）</th><th>固定費（気球側）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">変更のしやすさ</td><td>明日から動ける</td><td>店舗移転・リストラ・設備償却など決断が重い</td></tr>
          <tr><td className="hl">改善の入口</td><td>仕入・単価・歩留まり</td><td>中長期の構造改革</td></tr>
        </tbody>
      </table>
      <p>たとえば仕入担当が「豆の割合が大きい」と気づき、<Term>より安くて美味しい豆</Term>を調達すれば、変動費の重りが軽くなって限界利益（浮力）が増え、<Term>固定費を変えずに利益が伸びます</Term>。経営者・経理・会計士だけが数字を見ていても、こうした現場のアイデアは生まれにくい。<Term>一般社員こそ</Term>、自分の仕事が「風船のどの重り」に効くかを知ると、具体的な改善提案ができるようになります。</p>

      <Analogy label="💡 損益だけ見てはいけない">
        PLだけ見ると「売上いくら・利益いくら」で話が終わります。しかし実際は、その利益（＝ヘリウム）で<Link href="/finance/bs">BS</Link>側の<strong>借金返済</strong>まで賄えるかをセットで見る必要があります。利益で返済分を賄えないと、また借りて負債が雪だるま式に膨らむ ― これが<Link href="/finance/cash">黒字なのに倒産する</Link>会社の正体につながる伏線です。
      </Analogy>

      <p>費用構造まで掴めたら、第1章「決算書を読む」は完了です。次は<Link href="/finance/industry-cost">業界別の原価率・キャッシュ・支払い</Link>で業種ごとの数字のクセを押さえてから、三表を使って第三者の会社を診断する<Link href="/finance/analysis">三表から会社を診断する</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/pl" tag="会計・財務">損益計算書（PL）― 5つの利益</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                    <RelatedLink href="/finance/industry-cost" tag="会計・財務">業界別の原価率・キャッシュ・支払い</RelatedLink>
                    <RelatedLink href="/finance/payroll" tag="会計・財務">粗利益で人件費・給与を設計する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
