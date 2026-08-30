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
  title: "企業価値と株価（PBR）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>企業価値と株価 ― PBRを完全理解する</h1>
        <Lead>
          株価は「会社の今」ではなく「会社の未来」を映します。その未来への評価が凝縮された指標が<Term>PBR（株価純資産倍率）</Term>です。純資産を超えて市場が付けた値段の正体、日本企業の半数以上が抱える「PBR1倍割れ」問題、そして就活・キャリアへの示唆までを扱います。
        </Lead>
      </Hero>

      <Heading num="01">PBRの定義</Heading>
      <p style={{ fontFamily: "monospace" }}>PBR ＝ 時価総額 ÷ 純資産（自己資本）</p>
      <p><Term>純資産＝資産−負債</Term>＝会社を清算し、資産を売って負債を返した後に残るもの。ここから読み取れることは次の通りです。</p>
      <table>
        <thead>
          <tr><th>PBR</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PBR＝1</td><td>時価総額と純資産が一致</td></tr>
          <tr><td className="hl">PBR＞1</td><td>上場企業として普通の状態</td></tr>
          <tr><td className="hl">PBR＜1</td><td>時価総額が純資産を下回る＝将来性に市場が疑問符</td></tr>
        </tbody>
      </table>
      <p>ただし<Term>高ければ良い、ではありません</Term>。少ない資産で多く稼ぐ（<Link href="/finance/metrics">ROA</Link>が高い＝ハサミが鋭い）方が理想であり、PBRはあくまで「市場が未来をどう見ているか」の温度計です。</p>

      <Heading num="02">PBR＞1の「差額」＝未来への評価（柳モデル）</Heading>
      <p>時価総額が純資産を超える部分は、<Term>今はBSに現れないが将来価値を決める資本（非財務資本）</Term>への市場評価です。元エーザイCFO柳瀬博明氏の<Term>柳モデル</Term>は、企業価値を6つの資本で整理します。</p>
      <Diagram caption="時価総額のうち純資産を超える部分＝非財務資本への評価（＝未来の値段）">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={70} y={40} width={120} height={140} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={70} y={120} width={120} height={60} fill="#5f5f5f" fillOpacity="0.3" />
          <text x={130} y={155} fill="#9a9a9a" fontSize="10" textAnchor="middle">純資産</text>
          <text x={130} y={200} fill="#9a9a9a" fontSize="9" textAnchor="middle">財務資本</text>

          <rect x={230} y={20} width={120} height={160} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={230} y={100} width={120} height={80} fill="#5f5f5f" fillOpacity="0.3" />
          <rect x={230} y={20} width={120} height={80} fill="#39ff6a" fillOpacity="0.12" />
          <text x={290} y={145} fill="#9a9a9a" fontSize="10" textAnchor="middle">純資産</text>
          <text x={290} y={56} fill="#f2f2f2" fontSize="10" textAnchor="middle">未来の価値</text>
          <text x={290} y={72} fill="#9a9a9a" fontSize="9" textAnchor="middle">＝差額</text>
          <text x={290} y={196} fill="#39ff6a" fontSize="9" textAnchor="middle">時価総額（PBR＞1）</text>

          <text x={470} y={40} fill="#f2f2f2" fontSize="11" textAnchor="start" fontWeight="bold">6つの資本</text>
          <text x={470} y={62} fill="#9a9a9a" fontSize="9">・財務資本</text>
          <text x={470} y={80} fill="#9a9a9a" fontSize="9">・製造資本</text>
          <text x={470} y={98} fill="#9a9a9a" fontSize="9">・知的資本</text>
          <text x={470} y={116} fill="#9a9a9a" fontSize="9">・人的資本</text>
          <text x={470} y={134} fill="#9a9a9a" fontSize="9">・社会関係資本</text>
          <text x={470} y={152} fill="#9a9a9a" fontSize="9">・自然資本</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>資本</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">財務資本</td><td>BSの純資産（会計上の資本）</td></tr>
          <tr><td className="hl">製造資本</td><td>工場・設備・生産プロセス</td></tr>
          <tr><td className="hl">知的資本</td><td>特許・ノウハウ・R&D</td></tr>
          <tr><td className="hl">人的資本</td><td>従業員のスキル・組織力</td></tr>
          <tr><td className="hl">社会関係資本</td><td>地域・ステークホルダーとの関係</td></tr>
          <tr><td className="hl">自然資本</td><td>水・生物多様性・CO2 など</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 投資家は未来を買っている">
        PBRが1を超える部分は、市場が感じている「この会社のワクワク感・未来の価値」そのものです。逆にPBRが低いということは、将来性への疑問が市場に反映されている、と読めます。株価は驚くほど素直に未来を値付けしています。
      </Analogy>

      <Heading num="03">ESGとCSRは根本的に違う</Heading>
      <p>非財務資本のうち、近年PBRに直結するのが環境・社会への向き合い方です。ここで<Term>ESG／サステナビリティ</Term>と、従来型の<Term>CSR</Term>は根本的に違うことを押さえます。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>CSR（従来型）</th><th>ESG／サステナビリティ（現代型）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">位置づけ</td><td>本業で環境破壊しつつ利益の一部を寄付・清掃に回す</td><td>環境・社会課題の解決そのものがビジネス</td></tr>
          <tr><td className="hl">株主との関係</td><td>「利益を削っている」とコンフリクト</td><td>課題解決＝利益（矛盾を止揚）</td></tr>
          <tr><td className="hl">株価</td><td>直結しにくい</td><td>直接反映される</td></tr>
        </tbody>
      </table>
      <p><Term>サステナブル・ネイティブ世代</Term>（Z・ミレニアル）はサステナビリティを当たり前に求め、世界では消費のマジョリティです。環境破壊で作った商品は「売れない・不買」のリスクを負う。もはや抽象論ではなく、PBRと企業の存続に直結する経営課題になっています。</p>

      <Heading num="04">日本のPBR1倍割れ問題</Heading>
      <table>
        <thead>
          <tr><th>地域</th><th>平均PBR（目安）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">日本</td><td>約1.2〜2.3倍</td></tr>
          <tr><td className="hl">アメリカ</td><td>約4倍（GAFA＋テスラが牽引）</td></tr>
          <tr><td className="hl">ヨーロッパ</td><td>日本に近い</td></tr>
        </tbody>
      </table>
      <p>問題は、日本の上場企業の<Term>半数以上がPBR1倍割れ</Term>だということ。時価総額が純資産を下回る ＝ 市場からの「会社を畳んだ方がマシ」というメッセージと同義であり、上場企業として1倍割れは「失格・問題児」レベルの評価です。</p>
      <p>低PBRが目立つ業種とその理由:</p>
      <ul>
        <li><Term>地銀・金融</Term>：預金に利息を払うのに預貸率が5割を切る例もあり、稼ぎが半分。純資産≒企業価値と伝統的に評価される業種で、もともと低め（JPモルガンでも1.56倍程度）。</li>
        <li><Term>自動車（トヨタ・日産等）</Term>：EV等への投資・転換が遅いと評価される。CO2大量排出企業を監視する投資家イニシアチブ<Term>Climate Action 100+</Term>に名を連ね、日本製鉄は営業利益率10%超でもCO2イメージで低PBR。</li>
      </ul>
      <Aside label="📎 就活・キャリアへの示唆">
        株式市場の評価は素直で、低PBR＝将来性に「?」がついているサインです。機関投資家は100年単位で運用し、10〜50年後からバックキャストして会社を選びます。就職先選びに<Term>PBRランキング</Term>を参考にする価値は十分あります（スタートアップなら「良いVCが投資しているか」を見るのと同じ視点）。
      </Aside>

      <Heading num="まとめ">この節の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>PBRは未来の温度計</h4><p>時価総額÷純資産。1を超える差額は、非財務資本（未来の価値）への市場評価。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>6つの資本で捉える</h4><p>財務資本だけでなく、知的・人的・社会関係・自然資本が企業価値を決める（柳モデル）。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>1倍割れは失格サイン</h4><p>日本は半数以上が1倍割れ。ESGは今やPBRと存続に直結する経営課題。</p></Card>
      </CardGrid>
      <p>ここまでは<Term>投資家が会社を選ぶ物差し</Term>（ROA・PBR）を見てきました。次章<Link href="/finance/cash">現金がすべて</Link>では視点を反転させ、その物差しでは測れない「現金」で会社を見る経営者の目を扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                    <RelatedLink href="/finance/ratios" tag="会計・財務">指標に惑わされない</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標</RelatedLink>
                    <RelatedLink href="/finance" tag="会計・財務">会計・財務の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
