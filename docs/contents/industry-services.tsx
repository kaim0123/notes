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
  title: "その他サービス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 生活・公共サービス</Eyebrow>
        <h1>その他サービス ―「人が商品」の労働集約サービス</h1>
        <Lead>
          冠婚葬祭・美容理容・フィットネス・警備・ビルメンテナンス・クリーニング ― 生活に密着した対人サービスの総称が<Term>その他生活サービス</Term>です。共通するのは、<Term>人件費が費用の中心</Term>になる労働集約型で、店舗や営業所を各地に構える多店舗・地域分散型であること。戦後の家業・個人事業から始まり、警備やフィットネスなど一部でチェーン化・大手化が進む一方、いまも多くは中小事業者が担います。同じ「サービス」でも、月額課金の<Term>ストック</Term>（機械警備・会員）と、都度利用の<Term>フロー</Term>（葬儀・美容）とでは財務の性格がまるで違う ― その多層的な産業の歴史と会計を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="戦後">生活の近代化<br />理美容・銭湯・クリーニング</TimelineItem>
        <TimelineItem era="1962">セコム創業<br />日本初の警備会社</TimelineItem>
        <TimelineItem era="1960s">冠婚葬祭の商業化<br />互助会・結婚式場</TimelineItem>
        <TimelineItem era="1980s">チェーン化<br />フィットネス・ビルメン</TimelineItem>
        <TimelineItem era="1996">QBハウス<br />10分カットの効率化</TimelineItem>
        <TimelineItem era="2000s">警備2強・葬儀簡素化<br />家族葬・直葬へ</TimelineItem>
        <TimelineItem era="2010s">セルフ・低価格<br />24時間ジム・パーソナル</TimelineItem>
        <TimelineItem era="2020s">DX・省人化<br />chocoZAP・無人化</TimelineItem>
      </Timeline>

      <Heading num="01">家業から企業へ ― 生活サービスの近代化（戦後〜1980年代）</Heading>
      <p>その他生活サービスの原型は、戦後復興のなかで生活水準が上がるにつれ普及した、理美容・クリーニング・銭湯といった生活密着サービスにあります。担い手は地域の<Term>家業・個人事業</Term>が中心で、理美容・クリーニング・公衆浴場などは業法と<Term>生活衛生同業組合</Term>の下に置かれる、小規模分散の世界でした。</p>
      <p>高度成長期に入ると、生活水準の向上とともにサービスは多様化・商業化していきます。冠婚葬祭では<Term>冠婚葬祭互助会</Term>が普及し、結婚式場や葬儀が専門事業として立ち上がりました。1962年には日本初の警備会社<Term>セコム</Term>が創業し、やがて機械警備という新しい業態を切り開きます。オフィスビルの増加はビルメンテナンス（清掃・設備管理）の需要を生み、スポーツクラブという形でフィットネスも登場しました。生活の近代化が、次々と新しい対人サービスの市場を生んだ時代です。</p>
      <Analogy label="💡 たとえるなら">
        この時代は、これまで家庭や地域が自前でこなしていた「暮らしの手間」が、次々と<strong>買えるサービスに切り出されていった</strong>過程でした。髪を切る・服を洗う・式を挙げる・建物を守る ― どれも生活のなかにあった営みが、専門の事業者に外注される。生活の近代化とは、家事や地域の互助が「産業」に置き換わっていくことでもありました。
      </Analogy>

      <Heading num="02">チェーン化とライフスタイルの変化 ― 大手化・低価格・省人化（1980年代〜現在）</Heading>
      <p>1980年代以降、生活サービスは「企業化」の局面に入ります。葬儀・冠婚葬祭では家族葬向けの<Term>セレモニーホール</Term>が普及し、美容室チェーンや、1996年の<Term>QBハウス</Term>（10分カット）に代表される低価格・効率化モデルが広がりました。フィットネスではコナミ・セントラル・ルネサンスといった総合クラブが台頭します。とりわけ警備は、セコムと<Term>綜合警備保障（ALSOK）</Term>の2強による寡占が固まり、ビルメンテナンスでもイオンディライトや日本管財といった大手が姿を現しました。</p>
      <p>2000年代からは、少子高齢化と<Term>単身化</Term>という人口動態が、この産業を大きく揺さぶります。葬儀は家族葬・直葬の増加で<Term>簡素化</Term>し、施行単価が下落。掛金を長く預かる互助会モデルも転換を迫られました。高齢者向けの見守りや家事代行の需要が生まれ、フィットネスは総合クラブから、24時間ジム（エニタイム等）、パーソナルジム（RIZAP）、そして低価格セルフ型の<Term>chocoZAP</Term>へと多様化していきます。</p>
      <p>そして現在の潮流は<Term>DX・省人化・サブスク化</Term>です。24時間ジムやセルフクリーニング、無人店舗といったセルフ・無人化が進み、家事代行や美容予約（ホットペッパービューティー等）はマッチングの<Term>プラットフォーム</Term>へ。深刻な人手不足を背景に、警備・清掃ではロボットやIoTの活用が広がり、月額課金の会員モデルが定着しました。一方で、対人サービスゆえの<Term>労働集約・低賃金</Term>、人口減少と地域分散のなかでの小規模事業者の<Term>後継者難</Term>が、産業共通の構造課題として残っています。</p>
      <Aside label="ストックとフロー ― 同じ「サービス」でも別物">
        機械警備の月額警備料やフィットネスの会費は、契約が続くかぎり毎月入る<strong>ストック収益</strong>で、安定・高採算です。対して葬儀の施行や美容の施術は、その都度きりの<strong>フロー収益</strong>。同じ「生活サービス」と括られても、収益の質はまるで違います。この産業を読み解く最初の鍵が、この<strong>ストックとフローの別</strong>です。
      </Aside>

      <Heading num="03">会計・財務の特徴 ― 労働集約・多店舗・前受の三重奏</Heading>
      <p>ここからは、<Link href="/finance/statements">財務三表</Link>を業界の現実に当てはめます。その他生活サービスの会計を貫く共通項は、<Term>労働集約・多店舗・前受</Term>の3つです。人件費が費用の中心を占め、店舗・営業所という拠点を各地に構え、会員や互助会から料金を先に預かる ― この3点が、他業界とは違う財務の姿を作ります。</p>
      <p>まず<Link href="/finance/pl">損益計算書（PL）</Link>は、業態によって性格が分かれます。同じ産業でも、稼ぎ方はこれほど違います。</p>
      <table>
        <thead>
          <tr><th>業態</th><th>収益の中身</th><th>収益の性格</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">機械警備（セコム等）</td><td>月額警備料 ＋ 機器。センサー等の減価償却</td><td><strong>ストック・高採算</strong></td></tr>
          <tr><td className="hl">フィットネス</td><td>会費（会員数×単価×継続）。人件費・施設賃料・設備</td><td><strong>ストック</strong></td></tr>
          <tr><td className="hl">葬儀・冠婚葬祭</td><td>施行1件当たり売上。互助会前受の取崩し</td><td><strong>フロー</strong>（単価下落）</td></tr>
          <tr><td className="hl">ビルメン・清掃</td><td>委託料。労働集約</td><td>フロー・薄利</td></tr>
          <tr><td className="hl">美容・理容</td><td>施術売上。スタイリスト（人）依存</td><td>フロー</td></tr>
        </tbody>
      </table>
      <p><Link href="/finance/bs">貸借対照表（BS）</Link>で最も特徴的なのが、負債側の<Term>前受金</Term>です。とりわけ冠婚葬祭互助会は、将来の役務（結婚式・葬儀）に備えて顧客から掛金を長期にわたって預かるため、大きな<Term>前受性の負債</Term>を抱えます。フィットネスの前受会費も同じ性格です。資産側には、フィットネス施設・警備センサー・セレモニーホールといった店舗・拠点・機器が<Term>固定資産やリース</Term>として並び、積極M&A企業（RIZAP等）では買収に伴う<Term>のれん</Term>が積み上がります。</p>
      <Aside label="前受金は「先にもらえるお金」">
        互助会の掛金や会員の前受会費は、<strong>サービスを提供する前に現金が入ってくる</strong>仕組みです。将来役務を提供する義務（負債）である一方、キャッシュが先に手元に入るため、うまく回れば運転資金の心配が小さい。反面、掛金を長く預かる互助会では、預かった前受と手元資産のバランスが財務の健全性を左右します。この「先にもらう」構造が資金繰りをどう左右するかは<Link href="/finance/cash">黒字倒産と負債の話</Link>と合わせて読むと理解が深まります。
      </Aside>
      <p>会計上の論点も、この産業ならではです。互助会の掛金は<Term>前受金（負債）</Term>に計上し、施行時に収益化します（長期の前受性負債と解約返戻が論点）。会費は期間按分で、都度サービスは完了時に計上する<Term>収益認識</Term>。機械警備の設置機器は資産計上して償却し、多店舗・拠点の賃借は<Term>リース会計</Term>の対象。そして積極M&Aを進めた企業では、業績悪化時の<Term>のれん減損</Term>が大きな論点になります。</p>

      <Heading num="04">その他サービスを診る指標 ― 継続率・人件費率・前受金</Heading>
      <p>労働集約でストックとフローが混在するこの産業は、製造業とは違う専用の物差しで測ります。<Link href="/finance/metrics">収益性と効率の指標</Link>のサービス業版と考えてください。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>着眼点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">契約件数・会員数</td><td>ストックビジネスの基盤</td><td>警備契約・ジム会員の母数</td></tr>
          <tr><td className="hl">継続率・解約率</td><td>会費・警備契約の持続性</td><td><strong>ストック型の生命線</strong>。母数だけでなく定着を見る</td></tr>
          <tr><td className="hl">月額単価（ARPU）</td><td>ストック収益の単価</td><td>低価格セルフ化で低下しやすい</td></tr>
          <tr><td className="hl">施行件数・施行単価（葬儀）</td><td>フロー事業の規模と単価</td><td>家族葬・直葬で単価が下落</td></tr>
          <tr><td className="hl">人件費率</td><td>労働集約度・採算</td><td>省人化の巧拙が採算を分ける</td></tr>
          <tr><td className="hl">前受金残高（互助会）</td><td>将来役務の負債</td><td>前受と資産のバランス（健全性）</td></tr>
        </tbody>
      </table>
      <Analogy label="⚠️ 財務分析でだまされないために">
        この産業を1つの物差しで測ってはいけません。まず<strong>ストックとフローを分ける</strong> ― 機械警備・会員（安定）と葬儀・美容（都度）では収益の質が違います。ストック型なら会員数の増加に安心せず<strong>継続率・解約率</strong>で定着を確かめる。労働集約ゆえ<strong>人件費率と省人化</strong>が採算を左右し、互助会なら<strong>前受金</strong>という将来役務の負債を見る。そして積極M&A企業（RIZAP等）は、のれんを差し引く前の<strong>EBITDA</strong>で実力を見つつ、<strong>のれん減損リスク</strong>に注意 ― 過去には業績悪化で減損が生じました。
      </Analogy>

      <Heading num="05">企業規模・主要プレイヤー ― 警備2強と小規模分散</Heading>
      <p>その他生活サービスは、大手が寡占する分野と、中小事業者が担う分野とが同居する、規模構造の二層性が特徴です。市場規模の目安は、警備が数兆円規模、フィットネスが約5,000億円規模、葬儀サービスが約1.8兆円規模。全体として労働集約・地域分散で小規模が多いなか、一部でチェーン・大手化が進んでいます。</p>
      <p>最も寡占が進むのが<Term>警備</Term>です。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">セコム</td><td>約1.1兆円</td><td>警備最大手。機械警備を軸に防災・医療・保険まで多角化した高収益企業</td></tr>
          <tr><td className="hl">綜合警備保障（ALSOK）</td><td>約5,000億円</td><td>警備2位。常駐警備・機械警備</td></tr>
        </tbody>
      </table>
      <p>その他の分野には、性格の異なるプレイヤーが並びます。<Term>ビルメンテナンス・施設管理</Term>では、商業施設を担うイオンディライト、清掃・設備管理の日本管財や大成、総合ファシリティマネジメントのオリックス・ファシリティーズなど。<Term>フィットネス</Term>は総合クラブ（コナミスポーツ・セントラルスポーツ・ルネサンス）と、24時間ジムFCのエニタイムフィットネス（Fast Fitness Japan）、低価格コンビニジムで会員を急拡大した<Term>RIZAPグループ（chocoZAP）</Term>に二極化。<Term>冠婚葬祭・葬儀</Term>はベルコ・平安レイサービス・燦HD・ティア、<Term>美容・理容</Term>は田谷・アルテサロン、そしてQBハウス（キュービーネット）といったチェーンが代表格です。</p>
      <table>
        <thead>
          <tr><th>分野</th><th>規模構造</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">警備</td><td><strong>大手2強の寡占</strong>。セコムは多角化した高収益企業</td></tr>
          <tr><td className="hl">フィットネス</td><td><strong>二極化</strong>。総合クラブ（高価格・設備）と低価格セルフ（chocoZAP・24時間ジム）</td></tr>
          <tr><td className="hl">葬儀</td><td>家族葬・直葬の普及で<strong>単価下落・市場成熟</strong></td></tr>
          <tr><td className="hl">美容・清掃</td><td>地域の中小が中心で<strong>圧倒的最大手が生まれにくい</strong></td></tr>
        </tbody>
      </table>
      <p>労働集約・対人サービスという性格ゆえ、美容・葬儀・清掃のような分野では圧倒的な最大手が生まれにくく、多くを中小の地域事業者が担い続けています。そのなかで、機械警備というストック型でスケールできた警備、そして低価格セルフとサブスクで会員を束ねたフィットネスが、大手化の突破口になりました。<strong>省人化とサブスク化で労働集約の壁をどう越えるか</strong>が、この産業を「稼ぐ力」に変えられるかの分岐点です。</p>

      <Heading num="まとめ">その他サービスという産業をどう捉えるか</Heading>
      <p>その他生活サービスは、戦後の家業から、警備やフィットネスなど一部の大手化・チェーン化を経て、労働集約・地域分散のまま今日に至りました。少子高齢化・単身化が葬儀の簡素化やフィットネスの低価格セルフ化を促し、DX・省人化・サブスク化が新たな潮流に。その歴史は、暮らしの手間がどう「産業」に切り出され、労働集約の壁とどう向き合ってきたかの記録です ― 歴史と会計は地続きです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>労働集約の対人サービス</h4><p>人件費が費用の中心。省人化（無人ジム・警備IoT）の巧拙が採算を左右する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ストックとフローを分ける</h4><p>機械警備・会員（安定・高採算）と葬儀・美容（都度）は収益の質が別物。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>前受金という長期負債</h4><p>互助会の掛金・会員の前受会費は、将来役務の負債。先にもらう構造が資金繰りを決める。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>警備2強と小規模分散</h4><p>セコム・ALSOKが寡占する一方、美容・葬儀・清掃は中小が担う二層構造。</p></Card>
      </CardGrid>
      <p>この産業の会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、前受金がもたらす資金繰りの妙は<Link href="/finance/cash">黒字倒産と負債</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/staffing" tag="業界">人材サービス</RelatedLink>
                    <RelatedLink href="/industry/healthcare" tag="業界">医療・福祉</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">黒字倒産と負債</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
