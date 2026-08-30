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
  title: "インターネット・通信",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 情報通信</Eyebrow>
        <h1>インターネット・通信 ― 「設備」と「スケール」が同居する二重構造の産業</h1>
        <Lead>
          インターネット・通信は、性格が正反対な二つの産業が同居しています。基地局や光ファイバーに巨額を投じ、その上で月額料金という安定収益を得る<Term>設備産業（通信）</Term>と、ユーザーが増えるほど利益率が上がる<Term>軽資産のスケール産業（ネット）</Term>です。明治の電信・電話から始まり、電電公社の独占、1985年の民営化によるNTT誕生、携帯電話の爆発的普及、iモード、スマートフォン革命を経て、いまや通信各社は決済・金融・ポイントを束ねる<Term>経済圏</Term>を競っています。その約150年の歩みと、二重構造ゆえの独特な会計の姿を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1890">電話開始<br />逓信省の国営独占</TimelineItem>
        <TimelineItem era="1952">電電公社<br />三公社の一つ</TimelineItem>
        <TimelineItem era="1985">NTT民営化<br />通信自由化・新電電</TimelineItem>
        <TimelineItem era="1992">NTTドコモ<br />移動体が分離独立</TimelineItem>
        <TimelineItem era="1999">iモード<br />携帯ネット世界初</TimelineItem>
        <TimelineItem era="2001">ブロードバンド<br />Yahoo! BB・光の普及</TimelineItem>
        <TimelineItem era="2008">iPhone<br />スマートフォン革命</TimelineItem>
        <TimelineItem era="2020">楽天参入・5G<br />第4のキャリア</TimelineItem>
        <TimelineItem era="2023">LINEヤフー<br />ネット再編</TimelineItem>
      </Timeline>

      <Heading num="01">国営独占の時代 ― 電信・電話から電電公社へ（明治〜1985）</Heading>
      <p>日本の通信は、明治の<Term>電信</Term>から始まりました。1869年に東京〜横浜間で電信が開通し、1871年には工部省の電信寮（後の逓信省）が全国ネットワークを整備していきます。1890年には東京〜横浜間で電話サービスが始まりますが、加入者は富裕層に限られ、市外通話は高額。手動交換で交換手が回線をつなぐ時代でした。郵便・電信・電話を管轄する<Term>逓信省</Term>が事業を握り、民間参入のない<Term>国営独占</Term>が長く続きます。</p>
      <p>戦後の1952年、国鉄・専売公社と並ぶ三公社の一つとして<Term>日本電信電話公社（電電公社）</Term>が発足し、全国の電話事業を一元管理しました。ところが需要に供給が追いつかず、申し込んでから開通まで数年待たされる<Term>積滞</Term>が深刻化。<Term>加入権</Term>は数十万円と高額で、投資対象にすらなりました。1969年のプッシュホン導入、市外通話のダイヤル直通化で利便性は上がり、NEC・富士通・日立・沖電気といった<Term>電電ファミリー</Term>が交換機を納入する体制も固まっていきます。</p>
      <Analogy label="💡 たとえるなら">
        この時代の通信は「一本しかない水道管を、国が独占して全国に引く」事業でした。管（回線）を敷くには莫大な費用と時間がかかり、誰でも敷けるものではありません。だからこそ国が独占し、皆で少しずつ順番待ちをした ― これが積滞や高額な加入権の正体です。「巨額投資を要する設備産業」という通信の本質は、じつは電話の時代から一貫しています。
      </Analogy>

      <Heading num="02">自由化とネット革命 ― NTT誕生・携帯電話・インターネット（1985〜2000年代）</Heading>
      <p>転機は1985年4月1日、電電公社が民営化されて<Term>日本電信電話株式会社（NTT）</Term>が誕生したことです。同時に通信市場が開放され、京セラ稲盛和夫の<Term>第二電電（DDI）</Term>、JR系の日本テレコム、トヨタ・道路公団系の日本高速通信といった<Term>新電電（NCC）</Term>3社が長距離電話に参入。NTTより安い料金で<Term>価格競争</Term>が始まりました。</p>
      <p>そして携帯電話が産業の主役に躍り出ます。1985年の重さ約3kgの<Term>ショルダーホン</Term>、1987年の約900gの携帯電話を経て、契約者数は1990年の約100万から1999年には約5,600万へと爆発的に増加。NTTの移動体部門は1992年に分離独立し、翌年<Term>NTTドコモ</Term>となってシェア50%超を握ります。決定打が1999年の<Term>iモード</Term>でした。メール・Web閲覧・着メロを携帯で楽しめる世界初の携帯インターネットは大成功を収めますが、国内独自仕様ゆえの<Term>ガラパゴス化</Term>という後の弱点も抱えました。一方、DDI・KDD・IDOは2000年に合併して<Term>KDDI</Term>（auブランド）となり、J-PHONEはボーダフォンを経て2006年に孫正義が1.75兆円で買収し<Term>ソフトバンクモバイル</Term>となります。2006年の<Term>番号ポータビリティ（MNP）</Term>導入で、顧客獲得競争はいっそう激化しました。</p>
      <p>同じ頃、もう一つの革命が進みます。1995年のWindows 95を契機に<Term>インターネットの商用化</Term>が加速し、@nifty・BIGLOBE・OCN・So-netといった<Term>ISP</Term>が普及。1996年には孫正義が出資する<Term>Yahoo! JAPAN</Term>が日本最大のポータルとなり、1997年には三木谷浩史の<Term>楽天市場</Term>が出店型モールで<Term>eコマース</Term>を切り拓きました。2001年にはソフトバンクの<Term>Yahoo! BB</Term>がモデム無料配布という価格破壊でADSLを一気に広げ、NTT東西の<Term>フレッツ光</Term>によるFTTHも普及。日本のブロードバンドは定額・高速で世界トップクラスに躍り出ます。</p>
      <Aside label="経済圏の芽生え">
        楽天が創業初期から掲げたのが、EC・トラベル・証券・銀行・カード・通信を<strong>ポイントで束ねる</strong>という発想でした。一つのサービスで集めた顧客を、他のサービスに横展開して囲い込む ― この<strong>経済圏</strong>の考え方が、後にキャリア各社（PayPay・au PAY・dポイント）へと広がり、いまの業界競争の主戦場になっています。
      </Aside>

      <Heading num="03">スマホと経済圏 ― プラットフォーム競争の時代（2007〜現在）</Heading>
      <p>2008年、ソフトバンクが独占販売した<Term>iPhone 3G</Term>が日本に上陸し、タッチパネルとApp Storeが常識を塗り替えます。同年Googleが発表した<Term>Android</Term>もドコモ・auが採用し、2010年代前半にガラケーからスマホへの移行が急速に進みました。この転換でNEC・富士通・シャープら国産端末メーカーは相次いで撤退し、世界市場はApple・Samsungが寡占。iモードで世界に先駆けた日本が、iPhoneで逆転された象徴的な出来事でした。</p>
      <p>アプリの世界では、2011年の東日本大震災を機に無料通話・メッセージアプリの<Term>LINE</Term>が生活インフラとなり、国内利用者は8,600万人規模に達します。EC・フリマではAmazon・ZOZO・メルカリが台頭し、決済では2018年開始の<Term>PayPay</Term>が「100億円キャンペーン」でQRコード決済を一気に普及させました。ネット広告費は2019年にテレビ広告費を超え、2021年には約2.7兆円へ拡大します。</p>
      <p>通信では2020年4月、楽天が自社回線を持つ<Term>第4のキャリア</Term>として本格参入。1年無料キャンペーンで契約者を集めるも、基地局整備の遅れと巨額投資で赤字が続きました。同2020年には菅政権の<Term>値下げ要請</Term>を受け、ドコモの<Term>ahamo</Term>（20GB・2,980円）、au の povo、ソフトバンクの LINEMO が登場し料金が大きく下がります。同年3月に始まった<Term>5G</Term>（高速大容量・低遅延・多数同時接続）はエリア拡大が進行中です。ネット側でも再編が続き、Yahoo! JAPANとLINEは2023年に<Term>LINEヤフー</Term>へ統合されました。いまや各キャリアは、通信を軸に決済・金融・ポイントを束ねる<Term>経済圏</Term>で顧客を囲い込む段階に入っています。</p>

      <Heading num="04">会計・財務の特徴 ― 正反対の二つの構造が同居する</Heading>
      <p>ここからは、<Link href="/finance/statements">財務三表</Link>を業界の現実に当てはめます。この産業の会計が難しいのは、性格が正反対な<Term>設備産業（通信）</Term>と<Term>スケール産業（ネット）</Term>が同じ業界に、しばしば同じ会社の中に同居しているからです。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>通信（インフラ）</th><th>ネット（プラットフォーム）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">主な資産</td><td><strong>通信設備</strong>（基地局・光ファイバー・DC）</td><td>軽資産（サーバー・ソフト・のれん）</td></tr>
          <tr><td className="hl">費用構造</td><td>減価償却・ネットワーク維持費が重い</td><td><strong>限界費用が低い</strong>（増えるほど高利益率）</td></tr>
          <tr><td className="hl">収益の性格</td><td><strong>月額料金</strong>（ストック・安定）</td><td>広告・EC手数料・課金（変動・トレンド連動）</td></tr>
          <tr><td className="hl">参入障壁</td><td>高い（巨額投資が必要）→寡占</td><td>低い（ただし勝者総取り）</td></tr>
          <tr><td className="hl">利益の見方</td><td>減価償却が重く<strong>EBITDA</strong>で見る</td><td>会計利益・利益率で見やすい</td></tr>
        </tbody>
      </table>
      <p>通信事業の<Link href="/finance/bs">貸借対照表（BS）</Link>は、資産側を基地局・光ファイバー・データセンターといった<Term>有形固定資産</Term>が大きく占めます。これを設備投資し、耐用年数にわたって<Term>減価償却</Term>していくため、<Link href="/finance/pl">損益計算書（PL）</Link>では償却費が重くのしかかり、会計上の利益は小さく見えがちです。加えて周波数免許や買収で生じる<Term>のれん・無形資産</Term>もBSに積み上がります。</p>
      <Aside label="なぜEBITDAで通信を見るのか">
        通信は毎年巨額の設備投資を続けるため、<Link href="/finance/cf">キャッシュフロー</Link>上は本業でしっかり現金を稼いでいても、重い<strong>減価償却</strong>が差し引かれた会計利益は小さく映ります。そこで、利払い・税金・償却前の利益である<strong>EBITDA</strong>で「設備を除いた本業の稼ぐ力」を測るのが定石です。安定した月額料金というストック収益は、この稼ぐ力を下支えします。
      </Aside>
      <p>さらに厄介なのが<Term>金融事業の連結</Term>です。キャリア各社は決済・銀行・証券・カードを経済圏に取り込んでいるため、PayPay・auの金融・楽天銀行といった<strong>金融資産（債権・預金）がBSに巨額計上</strong>されます。通信・ネット・金融が一枚のBSに混在するため、実態はセグメントに分けて読む必要があります。端末代金と通信料を別々に処理する<Term>分離プラン</Term>の収益認識も、この業界特有の論点です。</p>

      <Heading num="05">この産業を診る指標 ― ARPU・解約率・GMV・設備投資</Heading>
      <p>通信とネットでは、そもそも見るべき物差しが違います。<Link href="/finance/metrics">収益性と効率の指標</Link>に加えて、業界固有のKPIを使い分けます。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>どこを見るか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ARPU</td><td>1契約当たりの月間収入</td><td>通信の単価。値下げ・大容量プランで変動</td></tr>
          <tr><td className="hl">契約数</td><td>回線・会員の規模</td><td>通信の土台。シェア争いの基礎</td></tr>
          <tr><td className="hl">解約率（チャーン）</td><td>離脱する顧客の割合</td><td>MNP競争での顧客維持力</td></tr>
          <tr><td className="hl">GMV・テイクレート</td><td>ECの流通総額と手数料率</td><td>ネット（EC）の規模と収益率</td></tr>
          <tr><td className="hl">設備投資／減価償却</td><td>ネットワーク投資の重さ</td><td>通信の負担と5G投資の局面</td></tr>
          <tr><td className="hl">経済圏の会員・クロスユース</td><td>囲い込みの進捗</td><td>金融・ECへ横展開できているか</td></tr>
        </tbody>
      </table>
      <p>ARPU（1契約当たり収入）×契約数が通信の売上の骨格で、そこに解約率が効いてきます。ECなら<Term>GMV（流通総額）</Term>にテイクレート（手数料率）を掛けたものが収益。会計論点としては、5G基地局への投資の資本化と償却、金融事業の連結とセグメント分離、そして買収のれん・周波数免許の無形資産評価が挙げられます。</p>
      <Analogy label="⚠️ 財務分析でだまされないために">
        この業界を一つの物差しで比べてはいけません。まず<strong>通信・ネット・金融・投資をセグメントで分ける</strong> ― 安定ストックの通信と、トレンドに揺れる広告・投資はまるで別物です。通信は減価償却が重いので<strong>EBITDA</strong>で、経済圏は会員数だけでなく<strong>金融・ECへのクロスユース</strong>が利益に結びついているかで見る。とりわけ<strong>ソフトバンクグループ（SBG）は実質「投資会社」</strong>で、Vision Fund等の投資先を公正価値評価するため<strong>投資損益で純利益が乱高下</strong>します。通信子会社のソフトバンクとは切り分けて読むことが不可欠です。
      </Analogy>

      <Heading num="06">企業規模・主要プレイヤー ― 通信3強＋楽天と、ネット勢</Heading>
      <p>インターネット・通信は上場企業集計で約30兆円規模の巨大産業です（うち携帯電話が約12.5兆円、インターネットが約5.5兆円の目安）。頂点に立つのは、通信を軸に金融・経済圏を束ねる巨大複合体群です。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">NTT（日本電信電話）</td><td>約13兆円</td><td>通信最大。ドコモ（通信）・NTTデータ（IT）・NTT東西（固定）を傘下に持つ巨大複合体で、時価総額トップ級。2020年にドコモを完全子会社化</td></tr>
          <tr><td className="hl">KDDI（au）</td><td>約5.8兆円</td><td>通信＋金融（auじぶん銀行・au PAY）＋ローソン。CATV統合で固定通信も強化</td></tr>
          <tr><td className="hl">ソフトバンク</td><td>約6兆円</td><td>通信＋LINEヤフー＋PayPay。投資会社のソフトバンクグループとは別会社</td></tr>
          <tr><td className="hl">楽天モバイル（楽天G）</td><td>―</td><td>第4のキャリア。基地局投資で赤字が先行し楽天グループ全体の財務を圧迫</td></tr>
        </tbody>
      </table>
      <p>通信3強（NTT・KDDI・ソフトバンク）に楽天モバイルが挑む構図で、各社が決済・金融・ポイントの<Term>経済圏</Term>で顧客を囲い込みます。もう一方の柱がネット・プラットフォーム勢です。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">楽天グループ</td><td>約2兆円</td><td>EC（楽天市場）＋金融＋モバイルの経済圏。モバイルの先行投資が重荷</td></tr>
          <tr><td className="hl">LINEヤフー</td><td>約1.8兆円</td><td>検索・広告・EC・メッセージ。ソフトバンク傘下で2023年にYahoo!とLINEが統合</td></tr>
          <tr><td className="hl">サイバーエージェント</td><td>約7,000億円</td><td>ネット広告＋ABEMA＋ゲーム</td></tr>
          <tr><td className="hl">メルカリ</td><td>約1,900億円</td><td>フリマアプリ。米国展開も進める</td></tr>
        </tbody>
      </table>
      <p>このほかGMO・DeNA・グリー・ミクシィなどが各数千億円規模でネットサービス・ゲームを展開します。日本の強みはLINE（国内SNS）・楽天（EC・経済圏）・メルカリ（フリマ）など国内特化のサービスにありますが、検索・OS・クラウド・SNSといったプラットフォームの土台はGAFAMに握られ、グローバル競争では劣勢が続いています。</p>

      <Heading num="まとめ">インターネット・通信という産業をどう捉えるか</Heading>
      <p>この産業は、明治の電信から約150年をかけて、国営独占 → NTT民営化と自由化 → 携帯・ネット革命 → 経済圏競争へと姿を変えてきました。一貫しているのは「巨額投資を要する設備産業」という通信の本質と、その上に「限界費用が低くスケールするネット」が乗る二重構造です。歴史と会計は地続きで、積滞や加入権を生んだ設備の重さは、いまも減価償却とEBITDAという形で財務に刻まれています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>設備産業とスケール産業の二重構造</h4><p>基地局に巨額投資し月額料金で回収する通信と、限界費用が低くスケールするネット。性格は正反対。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ARPU×契約数と解約率が通信の骨格</h4><p>減価償却が重いのでEBITDAで実力を測る。ECはGMV×テイクレートで規模と収益率を見る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>巨額設備投資と金融連結でBSが複雑</h4><p>通信設備・のれん・金融資産・投資有価証券が一枚のBSに混在。セグメントで分けて読む。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>3強＋楽天、そして経済圏の競争</h4><p>NTT・KDDI・ソフトバンクに楽天が挑む。決済・金融・ポイントのクロスユースが勝敗を分ける。</p></Card>
      </CardGrid>
      <p>この産業の会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、設備投資と現金の関係は<Link href="/finance/cash">黒字倒産と負債</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/software" tag="業界">ソフトウェア</RelatedLink>
                    <RelatedLink href="/industry/it-services" tag="業界">ITサービス</RelatedLink>
                    <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
