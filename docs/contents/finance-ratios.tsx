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
  title: "指標に惑わされない",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>指標に惑わされない ― 比率が実態を映さないとき</h1>
        <Lead>
          第2章で学んだ<Term>ROA</Term>や<Term>PBR</Term>は、投資家が会社を選ぶための優れた物差しでした。一方で<Term>自己資本比率・流動比率・ROE</Term>といった比率は、銀行や投資家の評価基準ではあっても、<Term>会社の現金・実態を映さない</Term>ことがあります。経営者の視点からの「反論」を通じて、指標を鵜呑みにしない目を養います。ポイントは ―<Term> どの指標も何かを正しく測っており、測っている対象が違うだけ</Term>だということです。
        </Lead>
      </Hero>

      <Aside label="📎 この章の立ち位置">
        ここで紹介するのは、会社を現場で回す経営者からの「比率指標は資金繰りを測っていない」という反論です。投資家の物差しが間違っているという話ではありません。<Link href="/finance/cash">現金がすべて</Link>で見た「純資産3,000万でも現金は1,000万」というギャップを、4つの代表的な比率で具体化していきます。
      </Aside>

      <Heading num="01">前提 ― 同じ会社を2つの目で見る</Heading>
      <p>以下ではずっと、総資産1億円・純資産3,000万円・実際の現金1,000万円というモデル会社を使います。投資家はこの純資産の厚みや比率を見て安心し、経営者は手元の現金を見て危機感を持つ。<Term>同じ数字が、立場で正反対に読める</Term>のがこの章の主題です。</p>
      <Diagram caption="投資家は「比率」で安全と読み、経営者は「現金」で危険と読む ― どちらも正しい">
        <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={225} y={55} width={150} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={75} fill="#f2f2f2" fontSize="12" textAnchor="middle">同じ会社</text>
          <text x={300} y={91} fill="#9a9a9a" fontSize="9" textAnchor="middle">純資産3,000万／現金1,000万</text>

          <rect x={20} y={20} width={170} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={105} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">投資家：安全</text>
          <text x={105} y={56} fill="#9a9a9a" fontSize="9" textAnchor="middle">自己資本比率30%・流動比率200%</text>

          <rect x={410} y={20} width={170} height={44} rx="8" fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={495} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">経営者：危険</text>
          <text x={495} y={56} fill="#9a9a9a" fontSize="9" textAnchor="middle">来月の支払に現金が足りない</text>

          <line x1={225} y1={68} x2={190} y2={52} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={375} y1={68} x2={410} y2={52} stroke="#5f5f5f" strokeWidth="1.5" />
        </svg>
      </Diagram>

      <Heading num="02">① 自己資本比率 ― 「優良」でも資金ショート寸前</Heading>
      <p>
        <Term>自己資本比率＝純資産 ÷ 総資本</Term>。例では3,000万÷1億＝30%。銀行は20%以上で優良、40%以上で超優良と評価します（役員借入金を自己資本に算入して底上げする銀行もあります）。
      </p>
      <p>
        では、なぜ実態を映さないのか。純資産3,000万でも<Term>実際の現金は1,000万</Term>。純資産は過去利益の累計（簿価）で、現金とイコールではありません。来月払う買掛金2,000万・給与1,000万に対し手元は1,000万 ―<Term> 資金ショート寸前なのに、比率上は「まあまあ優良」</Term>と表示されてしまうのです。
      </p>

      <Heading num="03">② 内部留保 ― 「ため込み」神話への反論</Heading>
      <p>
        「日本企業は内部留保が多すぎて経済が回らない」という主張をよく聞きます。しかしこれは<Term>内部留保≠現金</Term>という誤解に基づきます。内部留保3,000万でも、現金は1,000万しかないことがある。
      </p>
      <Analogy label="💡 内部留保は「金庫の札束」ではない">
        内部留保は、過去の利益の累計が純資産に積み上がった<Term>帳簿上の数字</Term>です。その利益はとっくに設備・在庫・売掛金に姿を変えているかもしれません。日本企業はむしろ「内部留保は多いが現金は少ない」のが特徴で、「ため込んだ現金を吐き出せ」という議論は、しばしば的を外しています。
      </Analogy>

      <Heading num="04">③ 流動比率 ― 200%でも支払えないことがある</Heading>
      <p>
        <Term>流動比率＝流動資産 ÷ 流動負債</Term>。例では流動資産6,000万÷流動負債3,000万＝<Term>200%</Term>。銀行は200%以上で「短期支払能力あり」と評価します。
      </p>
      <p>
        しかし実際の現金は1,000万。流動資産6,000万の中身が売掛金・在庫に縛られていれば、比率が高くても足元の支払いはできません。<Term>現金を見ていない指標</Term>だからです。<Link href="/finance/bs">BSの読み方</Link>で見た「流動性は3段階（流動資産→当座資産→現金のみ）で厳しく見る」という発想は、まさにこの落とし穴を避けるためのものでした。
      </p>

      <Heading num="05">④ ROE ― 堅実な会社ほど低く出る逆転</Heading>
      <p>
        <Term>ROE（自己資本利益率）＝当期純利益 ÷ 自己資本</Term>。上場株投資では8〜10%以上が目安とされます。ところが、次の2社を比べると奇妙なことが起きます。
      </p>
      <table>
        <thead>
          <tr><th>会社</th><th>当期純利益</th><th>自己資本</th><th>ROE</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 長年利益を積み上げた会社</td><td>1,000万</td><td>9,500万</td><td>約10%</td></tr>
          <tr><td className="hl">② 前期までトントン、今期初黒字</td><td>1,000万</td><td>1,500万</td><td><strong>66.6%</strong></td></tr>
        </tbody>
      </table>
      <p>
        利益を8,500万も蓄積してきた堅実な①よりも、蓄積のない②のほうがROEは高く出る ―<Term> 逆転現象</Term>です。ROEを上げるには「利益を増やす」か「自己資本を減らす」しかなく、極端には<Term>利益を減らせばROEが上がる</Term>という本末転倒すら起こります。
      </p>
      <Diagram caption="同じ利益でも、自己資本が薄いほどROEは高く出る ― 蓄積の少ない会社が有利に見える">
        <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
          <text x={150} y={25} fill="#9a9a9a" fontSize="10" textAnchor="middle">① 堅実（自己資本 厚い）</text>
          <rect x={60} y={35} width={180} height={70} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={66} y={41} width={168} height={58} rx="3" fill="#5f5f5f" opacity="0.25" />
          <text x={150} y={75} fill="#f2f2f2" fontSize="11" textAnchor="middle">自己資本 9,500万</text>
          <text x={150} y={125} fill="#39ff6a" fontSize="13" textAnchor="middle">ROE 約10%</text>

          <text x={450} y={25} fill="#9a9a9a" fontSize="10" textAnchor="middle">② 蓄積なし（自己資本 薄い）</text>
          <rect x={390} y={80} width={180} height={25} rx="6" fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <rect x={396} y={85} width={168} height={15} rx="3" fill="#ffb43c" opacity="0.3" />
          <text x={480} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">自己資本 1,500万</text>
          <text x={480} y={125} fill="#ffb43c" fontSize="13" textAnchor="middle">ROE 66.6%</text>
        </svg>
      </Diagram>
      <Aside label="📎">
        ROEは分母（自己資本）を操作していくらでも動かせます。中小企業が自社のROEを気にする実益はほとんどなく、上場株投資で「参考の1つ」として知っておく程度で十分です。
      </Aside>

      <Heading num="06">結論 ― どちらも正しい。測る対象が違うだけ</Heading>
      <p>
        <Link href="/finance/metrics">第2章のROA・PBR</Link>は「投資家が会社を選ぶための物差し」でした。この章の反論は「その物差しは経営の実態（現金）を測っていない」というもの。<Term>両者は矛盾しません。どちらも正しく、測っている対象が違うだけ</Term>です。
      </p>
      <table>
        <thead>
          <tr><th></th><th>比率指標（自己資本比率・流動比率・ROE）</th><th>経営者が見る指標</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">誰の物差しか</td><td>銀行・投資家の評価基準</td><td>会社を回す当事者の基準</td></tr>
          <tr><td className="hl">測っているもの</td><td>安全性・資本効率（帳簿ベース）</td><td>現金が回るか（資金繰り）</td></tr>
          <tr><td className="hl">代わりに見るなら</td><td>―</td><td>現金預金・粗利益・労働分配率・CF</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">指標を鵜呑みにしない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>自己資本比率</h4><p>30%で「優良」でも、純資産は簿価。現金がなければ資金ショートし得ます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>内部留保≠現金</h4><p>ため込んだように見えても、利益は資産に姿を変えている場合があります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>流動比率</h4><p>200%でも中身が売掛・在庫なら支払えない。現金を見ていません。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ROEの逆転</h4><p>自己資本が薄いほど高く出る。操作可能で、堅実な会社ほど低く見えます。</p></Card>
      </CardGrid>
      <p>
        比率に惑わされないコツは、会社の力を見るときに<Term>現金預金・粗利益・労働分配率・キャッシュフロー</Term>を重視すること。この「粗利益で会社を設計する」発想を実務に落とし込むのが、次の<Link href="/finance/payroll">粗利益で人件費・給与を設計する</Link>です。
      </p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                    <RelatedLink href="/finance/payroll" tag="会計・財務">粗利益で人件費・給与を設計する</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値と株価（PBR）</RelatedLink>
                    <RelatedLink href="/finance/bs" tag="会計・財務">貸借対照表（BS）の読み方</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
