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
  Aside,
  Diagram,
  CardGrid,
  Card,
  CardNumber,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "収益性と効率の指標",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>収益性と効率の指標 ― 利益率だけ見ると騙される</h1>
        <Lead>
          営業利益率が高い会社＝良い会社、とは限りません。投資家が本当に見るのは<Term>使った資産に対してどれだけ稼いだか（ROA）</Term>と、<Term>投じた資金が何日で戻ってくるか（CCC）</Term>です。利益率という一枚の物差しに、資本効率と資金の回転という2枚を足して、はじめて「診断」になります。
        </Lead>
      </Hero>

      <Heading num="01">ROA ― 利益率だけ見ると騙される</Heading>
      <p>「リターンを上げるために、いくらの資産を使っているか」に答えられない経営者は多い。これが日本の失われた30年に残る課題とも言われます。数値例で見てみましょう。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>A社</th><th>B社</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">売上</td><td>100</td><td>1,200</td></tr>
          <tr><td className="hl">利益</td><td>15</td><td>120</td></tr>
          <tr><td className="hl">使用資産</td><td>3,000</td><td>1,000</td></tr>
          <tr><td className="hl">営業利益率</td><td>15%（立派に見える）</td><td>10%</td></tr>
          <tr><td className="hl">ROA（資産利益率）</td><td>5%</td><td>12%</td></tr>
        </tbody>
      </table>
      <p>A社は利益率15%で「エクセレントカンパニー」に見えますが、3,000もの資産を使って5%しか回せていない。投資家が期待するリターンはおおむね<Term>8〜10%</Term>なので、ROA 5%では応えられません。<Term>投資家が選ぶのはB社</Term>です。これが<Term>ファイナンス思考</Term>の入口。よくある罠は、利益率30〜40%の花形事業の裏で別事業が大赤字 → トータルでは資産を活かせていない、というパターンです。</p>
      <Diagram caption="ROA＝利益÷資産。『薄い資産で厚く稼ぐ』B社が投資家に選ばれる">
        <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
          <text x={150} y={22} fill="#f2f2f2" fontSize="12" textAnchor="middle" fontWeight="bold">A社 ― ROA 5%</text>
          <rect x={60} y={36} width={180} height={90} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={86} fill="#9a9a9a" fontSize="10" textAnchor="middle">使用資産 3,000</text>
          <rect x={60} y={132} width={180} height={22} rx="4" fill="#5f5f5f" fillOpacity="0.3" stroke="#5f5f5f" strokeWidth="1" />
          <text x={150} y={147} fill="#9a9a9a" fontSize="9" textAnchor="middle">利益 15（=資産の5%）</text>

          <text x={450} y={22} fill="#39ff6a" fontSize="12" textAnchor="middle" fontWeight="bold">B社 ― ROA 12%</text>
          <rect x={390} y={72} width={120} height={54} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={450} y={102} fill="#9a9a9a" fontSize="10" textAnchor="middle">使用資産 1,000</text>
          <rect x={390} y={132} width={120} height={22} rx="4" fill="#39ff6a" fillOpacity="0.15" stroke="#39ff6a" strokeWidth="1" />
          <text x={450} y={147} fill="#f2f2f2" fontSize="9" textAnchor="middle">利益 120（=資産の12%）</text>
        </svg>
      </Diagram>
      <Aside label="📎">
        <Term>日本企業と海外投資家の認識のズレ</Term>：日本の経営者はキャッシュを「うちのお金」と捉えがちですが、上場企業の資本は「資本市場から預かったお金」。リターンが十分なら再投資してよい（かつてのGAFA）が、ROAが低いなら「返せ（自社株買い・還元）」となる。「借りたわけじゃないのになぜ返す」という感覚のズレが、IRで話がかみ合わない典型原因です。
      </Aside>
      <p>ただし注意 ― ROAは<Term>投資家が会社を選ぶための物差し</Term>です。「では手元にいくら現金があるか」までは測っていません。この限界については<Link href="/finance/ratios">指標に惑わされない</Link>で経営者側から反論を扱います。</p>

      <Heading num="02">CCC ― BSとCFをつなぐ「資金の回転」</Heading>
      <p><Term>CCC（キャッシュコンバージョンサイクル）</Term>は、資金を投下してから回収するまで何日かを表します。短いほど資金繰りが楽。<Link href="/finance/bs">BS</Link>の残高から計算でき、<Link href="/finance/cf">CF</Link>の実態が読めるのが強みです。</p>
      <p style={{ fontFamily: "monospace" }}>CCC ＝ 在庫回転日数 ＋ 売掛金回転日数 − 買掛金回転日数（日）</p>
      <Diagram caption="仕入れ→在庫→販売→入金までの日数。買掛の支払を後ろにずらすほど短くなる">
        <svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg">
          <line x1={40} y1={70} x2={560} y2={70} stroke="#5f5f5f" strokeWidth="1.5" />
          <circle cx={120} cy={70} r={5} fill="#39ff6a" />
          <text x={120} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">仕入れ</text>
          <circle cx={320} cy={70} r={5} fill="#5f5f5f" />
          <text x={320} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">販売</text>
          <circle cx={500} cy={70} r={5} fill="#39ff6a" />
          <text x={500} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">入金</text>
          <text x={220} y={92} fill="#9a9a9a" fontSize="9" textAnchor="middle">在庫回転日数</text>
          <text x={410} y={92} fill="#9a9a9a" fontSize="9" textAnchor="middle">売掛金回転日数</text>
          <line x1={120} y1={110} x2={240} y2={110} stroke="#ffb43c" strokeWidth="1.5" />
          <text x={180} y={126} fill="#ffb43c" fontSize="9" textAnchor="middle">買掛の支払を遅らせる分だけ短縮</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>企業</th><th>CCC</th><th>ポイント</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ユニクロ</td><td>約48日</td><td>通常アパレルは約4ヶ月。在庫回転74日も速い</td></tr>
          <tr><td className="hl">ZARA（インディテックス）</td><td>マイナス</td><td>先に代金が入り後から仕入れを払う → やるほど現金が増える</td></tr>
          <tr><td className="hl">Boohoo（英）</td><td>マイナスに近い</td><td>在庫回転20日。オンライン中心・近郊サプライチェーン</td></tr>
        </tbody>
      </table>
      <p>ZARA／Boohooの革新は、SNS・データ分析で「売れるもの」を小ロット試作し、売れれば大量生産する<Term>売れ残りゼロに近い究極のマーケットイン</Term>。DXとサプライチェーン設計で、在庫回転そのものを圧縮しています。Apple・AmazonもCCCマイナス（先払いモデル）です。</p>

      <Heading num="03">CFはライフサイクルで読む</Heading>
      <p><Link href="/finance/cf">キャッシュフロー</Link>の符号は、事業のライフサイクル（導入→成長→成熟→衰退）にほぼ対応します。メガネ業界を例に見てみましょう。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>営業／投資／財務</th><th>フェーズ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メガネトップ（眼鏡市場）</td><td>＋ / ▲ / ▲</td><td>成熟の理想形（金のなる木）</td></tr>
          <tr><td className="hl">ジンズ</td><td>＋(薄) / ▲ / ＋（増資）</td><td>成長期ベンチャー</td></tr>
          <tr><td className="hl">パリミキ</td><td>投資が大きく▲に見える</td><td>実は3ヶ月超の定期預金が投資CFに計上されるだけ（ミスリード）</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️">
        数字を鵜呑みにしないこと。会計上の区分（定期預金が投資CFに入る等）と事業の実態を必ず照合します。パリミキのように「投資が大きい＝積極投資」と早合点すると読み違えます。
      </Aside>

      <Heading num="まとめ">この節の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ROAで資本効率を診る</h4><p>利益率が高くても、大きな資産で薄くしか回せていなければ投資家は選ばない。目安は8〜10%。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CCCで資金の回転を診る</h4><p>投下から回収まで何日か。マイナスにできれば、事業をやるほど現金が増える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CFはライフサイクル</h4><p>符号の組み合わせで成長〜成熟を読む。ただし会計区分と実態の照合を忘れない。</p></Card>
      </CardGrid>
      <p>資本効率まで診られたら、次は<Link href="/finance/valuation">企業価値と株価（PBR）</Link>へ。市場が会社の「未来」をどう値付けしているかを読みます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値と株価（PBR）</RelatedLink>
                    <RelatedLink href="/finance/ratios" tag="会計・財務">指標に惑わされない</RelatedLink>
                    <RelatedLink href="/finance/cf" tag="会計・財務">キャッシュフローと三表のつながり</RelatedLink>
                    <RelatedLink href="/finance" tag="会計・財務">会計・財務の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
