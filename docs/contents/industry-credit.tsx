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
  RelatedList,
  RelatedLink,
  Timeline,
  TimelineItem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "信販・クレジット・リース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 金融・保険</Eyebrow>
        <h1>信販・クレジット・リース ― 預金を持たない金融、ノンバンク</h1>
        <Lead>
          このグループは、銀行のように<Term>預金を集められない金融業（ノンバンク）</Term>です。社債・借入で資金を調達し、それを<Term>分割払い（信販）・立替（カード）・賃貸（リース）・貸付（消費者金融）</Term>という形で運用して、利ざやと手数料を稼ぎます。戦後の月賦販売に始まり、クレジットカードの普及、総量規制と過払い金による激震、そしてキャッシュレス決済とリースの多角化へ。「信用を売る」産業の歴史と、与信費用（貸倒）とリース会計が要になる財務を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1951">日本信販<br />割賦販売の専業化</TimelineItem>
        <TimelineItem era="1961">JCB設立<br />日本初の国産カード</TimelineItem>
        <TimelineItem era="1963">日本リース<br />設備リースの導入</TimelineItem>
        <TimelineItem era="1993">むじんくん<br />無人契約機</TimelineItem>
        <TimelineItem era="2008">リース会計改正<br />オンバランス化</TimelineItem>
        <TimelineItem era="2010">総量規制・過払い金<br />業界の激震</TimelineItem>
        <TimelineItem era="2018">PayPay<br />QRコード決済</TimelineItem>
        <TimelineItem era="2020s">BNPL・経済圏<br />後払いとポイント</TimelineItem>
      </Timeline>

      <Heading num="01">月賦販売からクレジットカードへ（戦後〜バブル）</Heading>
      <p>信用販売のルーツは、大正期の百貨店の月賦販売にあります。戦後、家電（テレビ・冷蔵庫・洗濯機）の普及とともに月賦が庶民の購買力を支え、1951年に山田光成が<Term>日本信販</Term>（日本初の信販専業）を設立。小売店と提携して消費者に立替払いで信用を供与する<Term>ショッピングクレジット</Term>が主力事業になりました。</p>
      <p>クレジットカードは、1960年の日本ダイナースに続き、1961年に三和銀行・日本信販が出資した<Term>JCB</Term>（日本初の国産カード）が誕生します。当初は富裕層中心でしたが、VISA・Mastercardとの国際ブランド提携で使える場所が増え、1980年代には加盟店が急増。<Term>リボルビング払い</Term>や<Term>キャッシング</Term>（年利20%台の現金借入）という金利収入が、信販会社の重要な収益源になりました。バブル期には航空会社や流通業との<Term>提携カード</Term>が広がり、会員獲得競争が過熱します。</p>

      <Heading num="02">総量規制と過払い金 ― 業界を襲った激震（2000年代〜2010年）</Heading>
      <p>バブル崩壊後、返済不能者の増加で<Term>多重債務</Term>が深刻な社会問題となり、法規制が一気に強化されます。決定打が2010年完全施行の<Term>改正貸金業法</Term>でした。年収の3分の1を借入上限とする<Term>総量規制</Term>が導入され、上限金利が29.2%から20%へ引き下げられて<Term>グレーゾーン金利</Term>が廃止されます。</p>
      <p>さらに深刻だったのが<Term>過払い金返還請求</Term>です。かつてグレーゾーン金利で受け取っていた利息を返還する訴訟が大量に起こり、返還総額は数兆円規模に達しました。かつての消費者金融最大手<Term>武富士が2010年に破綻</Term>し、アコムは三菱UFJ、プロミスは三井住友（SMBCコンシューマーファイナンス）と、多くが銀行傘下に入って生き残りを図りました。信販会社も同様に、日本信販がDCカード等と統合して<Term>三菱UFJニコス</Term>へ、住友クレジットサービスが<Term>三井住友カード</Term>へと、メガバンクグループの一員に再編されていきます。</p>
      <Analogy label="💡 なぜ与信費用が生命線なのか">
        カードローンやショッピングクレジットは、貸したお金が返ってこない<Term>貸倒れ</Term>のリスクが高い商売です。景気が良ければ問題は表面化しませんが、不況になると返済不能が一気に増え、貸倒引当金が膨らんで利益を吹き飛ばします。総量規制や過払い金は「儲かるから貸しすぎた」ツケでもありました。ノンバンクの財務を読むいちばんのポイントは、この<strong>与信の質（貸倒率・延滞率）</strong>にあります。
      </Analogy>

      <Heading num="03">キャッシュレスとリース多角化 ― 新しい競争（2010年代〜現在）</Heading>
      <p>2010年代後半、決済の主役が交代します。2018年開始の<Term>PayPay</Term>が「100億円キャンペーン」で一気に普及し、楽天ペイ・d払い・au PAYといった<Term>QRコード決済</Term>が乱立。政府のキャッシュレス・ポイント還元事業も追い風となりました。カード会社は楽天・d・イオンなど<Term>ポイント経済圏</Term>で顧客を囲い込み、ナンバーレスカードやタッチ決済でセキュリティと利便性を高めています。クレジットカードを持たない若年層向けには、<Term>BNPL（後払い決済）</Term>のPaidyやメルペイも台頭しました。</p>
      <p>一方リースは、2008年の<Term>リース会計基準の変更</Term>が転機でした。従来オフバランス（資産に載せない）だったファイナンスリースが借り手側で資産計上を義務づけられ、節税メリットが薄れて市場は一時縮小します。生き残った大手は「単純な物件リース」を超えて多角化しました。<Term>オリックス</Term>は総合金融・事業投資会社（不動産・再エネ・保険）へ、<Term>三菱HCキャピタル</Term>は航空機リースなどグローバル展開へと、事業体そのものを進化させています。</p>

      <Heading num="04">会計・財務の特徴 ― 調達コスト・与信費用・リース会計</Heading>
      <p>ノンバンク金融の会計は、「<Term>調達したお金で債権を積む</Term>」構造を映します。銀行に似ていますが預金がないため、資金調達の巧拙が効いてきます。<Link href="/finance/pl">損益</Link>の勘所は次の通りです。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">営業収益</td><td>カード手数料（加盟店・リボ・分割・キャッシング利息）、リース料、割賦手数料</td></tr>
          <tr><td className="hl">資金調達コスト</td><td>社債・借入の利息。金利上昇で調達コストが増える</td></tr>
          <tr><td className="hl">与信関連費用</td><td><strong>貸倒引当金繰入・償却</strong>。景気・与信の質で変動する生命線</td></tr>
          <tr><td className="hl">リース原価</td><td>リース物件の減価償却（オペレーティングリース）</td></tr>
          <tr><td className="hl">事業投資損益</td><td>オリックス等は投資先の売却益・持分法</td></tr>
        </tbody>
      </table>
      <p><Link href="/finance/bs">貸借対照表（BS）</Link>の中心資産は、割賦売掛金・カード立替金・リース債権・貸付金といった<Term>営業債権</Term>です。金融業ゆえ社債・借入などの有利子負債が厚く、資産と負債の期間・金利を管理する<Term>ALM</Term>が重要になります。さらに、債権をオフバランス化して資金を得る<Term>債権流動化・証券化</Term>も特徴的な手法です。</p>
      <Aside label="リース会計 ― 貸し手として2つの型を使い分ける">
        リース会社は取引の<strong>貸し手（レッサー）</strong>として、契約の性格で会計処理を変えます。実質的に売買に近い<Term>ファイナンスリース</Term>はリース債権として計上し、賃貸に近い<Term>オペレーティングリース</Term>は物件を自社資産として計上し減価償却します。近年はオペレーティングリース（中途解約可・レンタル要素が強い）の比率が上がり、リース終了後の中古販売やサブスクリプションといった新しいモデルも広がっています。
      </Aside>

      <Heading num="05">診るときの勘所 ― 与信の質とセグメント</Heading>
      <p>この産業を<Link href="/finance/analysis">診断する</Link>ときは、規模（取扱高）よりも<Term>与信の質</Term>を最重視します。景気悪化局面で貸倒が膨らむと利益が消えるからです。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">取扱高（カードGMV）</td><td>決済ビジネスの規模</td></tr>
          <tr><td className="hl">営業資産残高</td><td>債権・リース資産の積み上がり</td></tr>
          <tr><td className="hl">貸倒率・延滞率</td><td>与信の質。収益の質を左右する</td></tr>
          <tr><td className="hl">利ざや（調達−運用）</td><td>金融収益の源泉。金利上昇に感応</td></tr>
          <tr><td className="hl">自己資本比率</td><td>高レバレッジ業ゆえの健全性</td></tr>
        </tbody>
      </table>
      <p>会計論点としては、貸倒引当金の見積り（IFRS9の予想信用損失）、リース会計の貸し手側の区分、割賦・リボの利息法による<Term>収益認識</Term>、証券化のオフバランス化とリスク保持、そしてオリックス型の<Term>事業投資</Term>の連結・持分法・売却益の計上があります。特に注意すべきは、<Term>オリックスや三菱HCキャピタルは「リース会社」ではなく総合金融・投資会社</Term>だという点で、単一の指標ではなく<Term>セグメント別</Term>に収益構造を見る必要があります。</p>

      <Heading num="06">企業規模・主要プレイヤー ― 経済圏競争と金融商社化</Heading>
      <p>規模感は、クレジットカードの取扱高が年間100兆円超、リースが約9.3兆円（上場企業集計）。決済のキャッシュレス化とリースの多角化が成長を牽引しています。</p>
      <table>
        <thead>
          <tr><th>分野</th><th>主なプレイヤー</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">カード・信販</td><td>三菱UFJニコス／JCB（国際ブランド）、三井住友カード、クレディセゾン（独立系）、イオンフィナンシャル、楽天カード（取扱高トップ級・会員2,700万超）、PayPay</td></tr>
          <tr><td className="hl">リース</td><td>オリックス（売上約2.8兆円）、三菱HCキャピタル（総資産約11兆円）、芙蓉総合リース・東京センチュリー・NTTファイナンス</td></tr>
          <tr><td className="hl">消費者金融</td><td>アコム（三菱UFJ系）、SMBCコンシューマーファイナンス＝プロミス（三井住友系）、アイフル（独立系）</td></tr>
        </tbody>
      </table>
      <p>カード業界は、楽天・PayPay・イオン・メガ系がポイントと決済を軸に囲い込む<Term>経済圏競争</Term>の様相です。規模指標は取扱高（GMV）で、政府のキャッシュレス目標も追い風。リースは、単純な設備リースから不動産・航空機・再エネ・事業投資・海外へと収益源を広げる<Term>金融商社化</Term>が進み、オリックスや三菱HCキャピタルは「リース」の枠を超えた事業体へ進化しています。消費者金融は、総量規制で市場が縮小し、多くが銀行傘下で銀行カードローンの<Term>保証業務</Term>へと軸を移しました。</p>

      <Heading num="まとめ">信販・クレジット・リースをどう捉えるか</Heading>
      <p>この産業は「信用を売る」ノンバンク金融です。預金を持たないぶん調達コストと与信の質が業績を決め、総量規制・過払い金という激震を経て、多くが銀行グループの一員となりました。いまはキャッシュレス決済の経済圏競争と、リースの金融商社化という2つの潮流の中にあります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>預金を持たないノンバンク金融</h4><p>社債・借入で調達し、分割・立替・賃貸・貸付で運用。利ざやと手数料が収益源。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>与信費用（貸倒）が生命線</h4><p>貸倒率・延滞率が収益の質を決める。景気悪化で利益が消えるリスクを持つ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>リースは貸し手の会計が論点</h4><p>ファイナンス／オペレーティングの区分と、債権の流動化・証券化がポイント。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>経済圏競争と金融商社化</h4><p>カードはポイント経済圏の囲い込み、リースは事業投資へ多角化。セグメントで見る。</p></Card>
      </CardGrid>
      <p>この産業の会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、預金を持つ<Link href="/industry/bank">銀行</Link>との違いを対比すると、金融各業種の資金構造がよりくっきり見えてきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/bank" tag="業界">銀行</RelatedLink>
                    <RelatedLink href="/industry/securities" tag="業界">証券</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
