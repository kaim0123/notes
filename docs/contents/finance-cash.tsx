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
  title: "現金がすべて ― 黒字倒産と負債",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>現金がすべて ― 黒字倒産と負債という武器</h1>
        <Lead>
          第2章までは、投資家が会社を評価する物差し（<Term>ROA</Term>・<Term>PBR</Term>・利益率）を学びました。ここからは視点を切り替え、会社を現場で回す<Term>経営者の視点</Term>に立ちます。経営者にとって最重要の指標はただ一つ、<Term>現金</Term>です。倒産は赤字ではなく資金ショートで起きる ― この実感を、これまでの財務の常識と正面から突き合わせていきます。
        </Lead>
      </Hero>

      <Heading num="01">見るべきは「現金預金」だけ</Heading>
      <p>
        <Link href="/finance/bs">貸借対照表（BS）は右から読む</Link>― どこから調達し（右）、何に使っているか（左）― と学びました。経営者はこの左側（資産）を、財務とは違う目で読みます。総資産1億円の会社の資産内訳を、経営者はこう見ます。
      </p>
      <table>
        <thead>
          <tr><th>資産</th><th>金額</th><th>経営者の見方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">現金預金</td><td>1,000万</td><td><strong>これだけを最大化する</strong></td></tr>
          <tr><td className="hl">売掛金</td><td>2,500万</td><td>客への一時的な貸付。回収を早める</td></tr>
          <tr><td className="hl">貸付金</td><td>500万</td><td>関係者への貸付。減らす</td></tr>
          <tr><td className="hl">在庫</td><td>2,000万</td><td>売れるまで経費にならない。圧縮する</td></tr>
          <tr><td className="hl">建物・車両</td><td>1,800万</td><td>減価償却で徐々に経費化</td></tr>
          <tr><td className="hl">土地</td><td>2,000万</td><td>1円も経費にならない</td></tr>
          <tr><td className="hl">敷金</td><td>200万</td><td>交渉で減らせる（家賃1ヶ月→0.7ヶ月の実例）</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 発想の転換 ― 現金以外は「負の資産」">
        個人は資産を持つほど豊かです。しかし<Term>事業では、現金以外の資産は資金繰りを悪化させる「負の資産」</Term>と経営者は見ます。この例で現金以外の約7,300万がすべて現金だったなら、手元は1,000万→8,300万になっていたはず。純資産が3,000万あっても、実際の現金はたった1,000万 ― <Term>純資産と現金はイコールではない</Term>のです。
      </Analogy>

      <Heading num="02">黒字倒産の正体</Heading>
      <p>
        「利益が出ているのに倒産する」黒字倒産は、この構造から生まれます。黒字でも、売掛金・在庫・固定資産に資金が縛られると手元現金は増えません。利益の黒字／赤字だけでなく、<Term>資産・負債のバランス（＝現金がいくら残るか）</Term>を見る必要があります。
      </p>
      <p>
        これは<Link href="/finance/cost">風船会計</Link>で見た伏線の回収でもあります。利益（ヘリウム）で借金返済を賄えないと、また借りて負債が雪だるま式に膨らむ。<Term>利益が出ていても現金が尽きれば倒産する</Term> ― これが経営者が現金に執着する理由です。
      </p>
      <Diagram caption="純資産3,000万でも、実際の現金は1,000万しかない ― このギャップが黒字倒産の温床">
        <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={30} width={150} height={120} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={105} y={22} fill="#9a9a9a" fontSize="10" textAnchor="middle">帳簿上の純資産</text>
          <rect x={40} y={40} width={130} height={100} rx="4" fill="#5f5f5f" opacity="0.25" />
          <text x={105} y={95} fill="#f2f2f2" fontSize="14" textAnchor="middle">3,000万</text>
          <text x={105} y={112} fill="#9a9a9a" fontSize="9" textAnchor="middle">過去利益の累計（簿価）</text>

          <text x={300} y={95} fill="#9a9a9a" fontSize="16" textAnchor="middle">≠</text>

          <rect x={420} y={30} width={150} height={120} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={495} y={22} fill="#39ff6a" fontSize="10" textAnchor="middle">実際の現金</text>
          <rect x={430} y={110} width={130} height={30} rx="4" fill="#39ff6a" opacity="0.3" />
          <text x={495} y={100} fill="#f2f2f2" fontSize="14" textAnchor="middle">1,000万</text>
          <text x={495} y={155} fill="#9a9a9a" fontSize="9" textAnchor="middle">残りは売掛・在庫・固定資産に拘束</text>
        </svg>
      </Diagram>

      <Heading num="03">負債は武器 ― 「減らすと現金も減る」逆説</Heading>
      <p>
        <Link href="/finance/bs">BSの右側（負債）は、名前が違えど実質すべて借入金</Link>でした。長期借入金＝銀行、買掛金＝仕入先、未払金＝カード・社員、役員借入金＝役員。<Term>どれも「誰かがお金を待ってくれている」＝調達手段</Term>です。だから負債は減らせばよいものではなく、うまく使う「武器」だと経営者は考えます。
      </p>
      <p>BSは左右が必ず一致する（バランスする）ので、次の逆説が生まれます。</p>
      <Diagram caption="借入を返すと資産も減らさざるを得ず、真っ先に減るのは現金 ― だから借入は「回転」させる">
        <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={40} width={150} height={100} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={105} y={30} fill="#9a9a9a" fontSize="10" textAnchor="middle">借入3,000万</text>
          <text x={105} y={80} fill="#f2f2f2" fontSize="11" textAnchor="middle">現金 1,000万</text>
          <text x={105} y={110} fill="#9a9a9a" fontSize="10" textAnchor="middle">健全</text>

          <line x1={195} y1={90} x2={245} y2={90} stroke="#ffb43c" strokeWidth="1.5" markerEnd="url(#arrowC)" />
          <text x={220} y={80} fill="#ffb43c" fontSize="9" textAnchor="middle">1,000万返済</text>

          <rect x={260} y={40} width={150} height={100} rx="8" fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={335} y={30} fill="#9a9a9a" fontSize="10" textAnchor="middle">借入2,000万</text>
          <text x={335} y={80} fill="#f2f2f2" fontSize="11" textAnchor="middle">現金 0</text>
          <text x={335} y={110} fill="#ffb43c" fontSize="10" textAnchor="middle">資金ショート</text>

          <line x1={425} y1={90} x2={475} y2={90} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrowD)" />
          <text x={500} y={80} fill="#39ff6a" fontSize="9" textAnchor="middle">逆に</text>
          <text x={500} y={95} fill="#39ff6a" fontSize="9" textAnchor="middle">1,000万借入</text>

          <text x={500} y={125} fill="#f2f2f2" fontSize="11" textAnchor="middle">現金 2,000万</text>
          <defs>
            <marker id="arrowC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ffb43c" /></marker>
            <marker id="arrowD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#39ff6a" /></marker>
          </defs>
        </svg>
      </Diagram>
      <ul>
        <li>現金1,000万・借入3,000万の会社が借入を2,000万に減らすと、BSがバランスするので資産も減らすしかなく、<Term>現金1,000万→0＝倒産</Term>。</li>
        <li>逆に借入を4,000万に増やせば、<Term>現金は2,000万に増える</Term>。</li>
        <li>だから借入金は<Term>回転させる</Term>もの（回転借入）。返済しても借り替え・増額で回し続ける。ゼロにしようとすると経営を圧迫します。</li>
      </ul>
      <Aside label="📎">
        買掛金も仕入先からの借入ですが、誰も「買掛金をゼロにしろ」とは言いません。なのに銀行借入だけ「早く返せ」と考えるのは矛盾しています。事業成長に伴い負債はむしろ増やしていくのが自然です。
      </Aside>
      <Analogy label="💡 トヨタの例">
        トヨタは借金が35〜40兆円ありますが、現金を約7兆円持ち、誰も潰れるとは言いません。<Term>倒産は借金の多さでなく、手元資金の枯渇で起きる</Term> ― 負債の絶対額ではなく、現金とのバランスで会社の生死は決まります。
      </Analogy>

      <Heading num="04">手元現金の目安 ― 固定費6ヶ月分</Heading>
      <p>
        現金は多いほど安心ですが、目安がないと不安から余計な借金をしがちです。経営者はこう基準を持ちます。
      </p>
      <Diagram caption="毎月の固定費（原価以外）の6ヶ月分を手元に置くのが一つの目安">
        <svg viewBox="0 0 560 90" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={25} width={200} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={120} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">月の固定費 × 6ヶ月</text>
          <text x={270} y={50} fill="#39ff6a" fontSize="14" textAnchor="middle">＝</text>
          <rect x={320} y={25} width={220} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={430} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">目標の手元現金</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>月の固定費</th><th>目標の手元現金（×6ヶ月）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">500万円</td><td>3,000万円</td></tr>
          <tr><td className="hl">1,000万円</td><td>6,000万円</td></tr>
        </tbody>
      </table>
      <ul>
        <li>不足していれば、<Term>借入で資金調達して現金を増やす</Term>のが資金繰り安定の王道。「現金があるうちに借りておく」のが定石です。</li>
        <li><Link href="/finance/bs">風船会計の別角度の目安</Link>（運転資金＝売掛＋在庫−買掛、の1.5倍）とあわせて持っておくと、状況に応じて使い分けられます。</li>
      </ul>

      <Heading num="まとめ">現金で経営を見る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>現金だけを最大化</h4><p>現金以外の資産は資金繰りを悪化させる「負の資産」。純資産と現金はイコールではありません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>倒産＝資金ショート</h4><p>黒字でも売掛・在庫・固定資産に資金が縛られれば現金は尽き、倒産します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>負債は武器</h4><p>借入を減らすと現金も減る。負債はゼロにせず「回転」させて使うものです。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>手元は固定費6ヶ月分</h4><p>目安を持ち、不足なら現金があるうちに借りておくのが資金繰りの王道です。</p></Card>
      </CardGrid>
      <p>
        ここまでの経営者の視点は、投資家が重視する各種の比率指標とときに真っ向から対立します。次は<Link href="/finance/ratios">指標に惑わされない</Link>で、自己資本比率・流動比率・ROEがなぜ「実態を映さない」と言われるのかを、投資家の物差しと対比しながら見ていきます。
      </p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/ratios" tag="会計・財務">指標に惑わされない</RelatedLink>
                    <RelatedLink href="/finance/bs" tag="会計・財務">貸借対照表（BS）の読み方</RelatedLink>
                    <RelatedLink href="/finance/cost" tag="会計・財務">固定費・変動費・限界利益</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標</RelatedLink>
                    <RelatedLink href="/finance/payroll" tag="会計・財務">粗利益で人件費・給与を設計する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
