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
  title: "ITサービス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 情報通信</Eyebrow>
        <h1>ITサービス ― 「人月」を売る労働集約の受託産業</h1>
        <Lead>
          ITサービス業（システムインテグレーション・運用保守・BPO）は、エンジニアの<Term>工数（人月）</Term>を企業に売る労働集約型の産業です。工場も在庫もほとんど持たず、原価の大半は人件費と外注費 ― だからこそ<Term>稼働率</Term>と<Term>人月単価</Term>が採算を決め、大型開発の見積り違いが一発で利益を吹き飛ばします。1960年代のメインフレーム導入から約60年。NTTデータ・富士通・NECの三強を頂点に<Term>多重下請け構造</Term>で連なるこの業界が、いま人月商売からクラウド・SaaS・DXへ転換を迫られています。その歴史と、他業界とは違う会計の姿を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1959">FACOM 128<br />国産コンピュータ黎明</TimelineItem>
        <TimelineItem era="1969">IBMアンバンドリング<br />ソフトの有償化</TimelineItem>
        <TimelineItem era="1971">野村コンピュータ<br />ユーザー系SIerの源流</TimelineItem>
        <TimelineItem era="1980s">SI概念の導入<br />SIerの確立</TimelineItem>
        <TimelineItem era="1988">NTTデータ設立<br />公共・金融に強み</TimelineItem>
        <TimelineItem era="1990s">ダウンサイジング<br />C/S・ERP導入</TimelineItem>
        <TimelineItem era="2000">2000年問題<br />Y2K特需</TimelineItem>
        <TimelineItem era="2010s">クラウド普及<br />オンプレからの移行</TimelineItem>
        <TimelineItem era="2020s">DX・2025年の崖<br />人月脱却へ</TimelineItem>
      </Timeline>

      <Heading num="01">メインフレームから受託開発へ ― SIビジネスの誕生（1960〜80年代）</Heading>
      <p>日本のITサービス業のルーツは、1960年前後のコンピュータ導入にあります。1958年に東京大学へIBM 650が設置され、翌1959年には富士通が国産機<Term>FACOM 128</Term>を完成。NEC・日立が続き、富士通・NEC・日立の<Term>御三家</Term>が国産コンピュータ開発を牽引しました。当時のコンピュータは高額で企業が買えず、<Term>計算センター</Term>が時間貸し（タイムシェアリング）やデータ処理を受託する ― これが「サービスとしてのIT」の始まりです。</p>
      <p>産業を独立させた転機が、1969年のIBMによる<Term>アンバンドリング</Term>（ソフトとハードの分離）でした。それまでハードのおまけだったソフトウェアが有償化され、ソフトウェアが独立した産業になります。1971年には野村コンピュータシステム（後の<Term>野村総合研究所</Term>）が設立。1973年には銀行間決済をオンライン化する<Term>全銀システム</Term>が稼働し、企業の基幹システムが次々とオンライン化していきました。事務処理は<Term>COBOL</Term>で書かれ、大量のプログラマーが受託開発に投入されます。</p>
      <p>1980年代、米国から<Term>システムインテグレーション（SI）</Term>の概念が入ってきます。要件定義から設計・開発・保守までを一貫して請け負う事業者を<Term>SIer（エスアイヤー）</Term>と呼び、数億〜数十億円規模の大型汎用機システムを手掛けました。1985年の電電公社民営化を経て、1988年にはNTTのデータ通信部門が独立して<Term>NTTデータ</Term>が誕生。公共・金融システムの雄となります。この時期にSIerの三類型が固まりました。</p>
      <table>
        <thead>
          <tr><th>類型</th><th>成り立ち</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メーカー系</td><td>ハードメーカーのシステム事業。自社ハード販売と一体</td><td>富士通・NEC・日立</td></tr>
          <tr><td className="hl">ユーザー系</td><td>銀行・商社・保険等のシステム部門が独立。親会社のノウハウが強み</td><td>NRI・CTC・SCSK・日鉄ソリューションズ</td></tr>
          <tr><td className="hl">独立系</td><td>特定ベンダーに依存しない中立性が持ち味</td><td>TIS・BIPROGY（旧日本ユニシス）</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        SIビジネスは「注文住宅の元請けゼネコン」に似ています。施主（顧客企業）の要望を聞いて設計図を引き、下請けの職人（エンジニア）を集めて建て、引き渡し後も保守する。ただし売るのは建物ではなく<strong>人の時間</strong>です。だから「何人を、何か月張り付かせるか」＝人月が、そのまま見積りと売上になります。この人月モデルが、後々まで業界の体質と会計を規定していきます。
      </Analogy>

      <Heading num="02">ダウンサイジングからクラウドへ ― 転換を迫られる人月モデル（1990年代〜現在）</Heading>
      <p>1990年代、コンピュータの主役がメインフレームから<Term>クライアントサーバー（C/S）</Term>へ移る<Term>ダウンサイジング</Term>が進みます。UNIXサーバーやWindowsサーバーが普及し、1990年代後半にはSAP・Oracleといった<Term>ERPパッケージ</Term>の導入ブームが到来。「業務を標準化してパッケージに合わせるか、カスタマイズするか」という論点が生まれました。1995年のWindows 95でインターネットが商用化し、Webシステムが登場します。</p>
      <p>そして世紀の変わり目、西暦を2桁で処理していたシステムが誤作動する<Term>2000年問題（Y2K）</Term>への大規模改修が<Term>特需</Term>となり、SI業界は潤いました。2000年前後の<Term>ITバブル</Term>、金融再編に伴う数百億円規模のシステム統合案件、人件費差を活かした中国・インドへの<Term>オフショア開発</Term>も広がります。一方でバブル崩壊後のIT投資抑制のなか、工数を積み上げるだけの<Term>人月商売</Term>への批判も強まりました。</p>
      <p>2006年のAWS登場に始まる<Term>クラウドコンピューティング</Term>は、SIの前提を揺るがしました。オンプレミス（自社保有）からクラウドへの移行が進むと、ハードウェア販売・システム構築・運用保守という従来の稼ぎどころが細っていきます。</p>
      <Aside label="クラウドはなぜSIerの逆風なのか">
        従来のSIは「顧客ごとに一からシステムを作り、ハードを納め、運用も請け負う」ことで稼いできました。ところがクラウドでは、<strong>ハード販売が消え、構築は最小化され、運用はクラウド事業者が担う</strong>。作り込む案件そのものが減るため、人月を積み上げるビジネスは構造的に縮みます。だからこそ各社は、受託から<strong>自社サービス・SaaS・DXコンサル</strong>という付加価値型への転換を迫られているのです。
      </Aside>
      <p>2020年代は<Term>DX（デジタルトランスフォーメーション）</Term>の時代です。経済産業省が2018年に警告した<Term>2025年の崖</Term>（レガシーシステムの老朽化・技術的負債）を背景に企業のDX投資が急増。コロナ禍のテレワーク需要、2021年のデジタル庁発足も追い風となりました。同時に、freee・マネーフォワード・SmartHRといった国内<Term>SaaS企業</Term>がサブスク型で台頭し、ITサービスの姿を「作って納める」から「使い続けてもらう」へと変えつつあります。</p>

      <Heading num="03">会計・財務の特徴 ―「人月」がすべてを決める</Heading>
      <p>ここからは、<Link href="/finance/statements">財務三表</Link>をこの業界の現実に当てはめます。ITサービスの会計が特殊なのは、<Term>労働集約・人月ビジネス</Term>だからです。工場を持つ製造業と並べると、その軽さがはっきりします。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>製造業</th><th>ITサービス業</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">主な資産</td><td>工場・設備・棚卸資産</td><td><strong>軽い</strong>（オフィス・PC程度）＋のれん</td></tr>
          <tr><td className="hl">売上原価の中心</td><td>材料費・製造設備の減価償却</td><td><strong>人件費・外注費（労務費）</strong></td></tr>
          <tr><td className="hl">売上の構成</td><td>製品の販売</td><td>受託開発（フロー）＋<strong>運用保守（ストック）</strong>＋クラウド/SaaS</td></tr>
          <tr><td className="hl">採算のカギ</td><td>歩留まり・稼働率</td><td><strong>稼働率・人月単価</strong>・プロジェクト採算</td></tr>
          <tr><td className="hl">最大のリスク</td><td>在庫の陳腐化</td><td><strong>不採算プロジェクトの損失</strong></td></tr>
        </tbody>
      </table>
      <p><Link href="/finance/pl">損益計算書（PL）</Link>で最も重いのが<Term>売上原価</Term>で、その中心はエンジニアの<Term>人件費と外注費</Term>です。エンジニアが案件に張り付いているか＝<Term>稼働率</Term>が採算を直接左右し、案件が途切れた待機時間はそのまま損失になります。そして長期のシステム開発は、完成時に一括計上するのではなく、進捗に応じて売上と費用を計上する<Term>工事進行基準（一定期間認識）</Term>で処理されます。ここに、この業界最大の落とし穴があります。</p>
      <Aside label="不採算プロジェクトという最大のリスク">
        工事進行基準では、<strong>完成までにかかる原価の総額を見積もって</strong>進捗を計算します。ところが大型開発では仕様変更や見積り違いで原価が膨らみ、赤字になることがある。赤字が見込まれた時点で、将来の損失をまとめて前倒し計上するのが<Term>プロジェクト損失引当金</Term>です。過去に各社で大型案件の不採算が決算を直撃してきました。売上が伸びていても、この引当一発で利益が吹き飛ぶ ― 製造業の在庫リスクに相当する、この業界固有の急所です。
      </Aside>
      <p><Link href="/finance/bs">貸借対照表（BS）</Link>は、労働集約ゆえに<Term>資産が軽い</Term>のが特徴です。進行中プロジェクトのコストは<Term>仕掛品・契約資産</Term>に、検収後の未回収分は<Term>売上債権</Term>に計上されます。固定資産は少なく、代わりにM&A（海外SI買収など）で積み上がる<Term>のれん</Term>と、その減損が論点。NRIやオービックのような高収益企業は現金が潤沢な<Term>キャッシュリッチ</Term>体質で、<Link href="/finance/cf">キャッシュフロー</Link>の厚みが投資余力と株主還元の源泉になります。会計上は自社利用・市場販売<Term>ソフトウェアの資産計上と償却</Term>も論点です。</p>

      <Heading num="04">ITサービスを診る指標 ― 稼働率・人月単価・ストック比率</Heading>
      <p>この業界の稼ぐ力は、製造業とは違う専用の物差しで測ります。<Link href="/finance/metrics">収益性と効率の指標</Link>のITサービス版と考えてください。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>なぜ効くか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">稼働率</td><td>エンジニアの案件充当率</td><td>労働集約の採算を直接決める。待機は損失</td></tr>
          <tr><td className="hl">人月単価</td><td>受託の販売価格（1人月あたり）</td><td>価格力。人手不足で上昇傾向</td></tr>
          <tr><td className="hl">ストック比率</td><td>売上に占める運用保守の割合</td><td>高いほど景気耐性が高い（安定収益）</td></tr>
          <tr><td className="hl">受注残高</td><td>未消化の受注（将来売上）</td><td>先行きの需要を映す</td></tr>
          <tr><td className="hl">1人当たり売上・利益</td><td>労働生産性</td><td>人月依存脱却の進み具合が出る</td></tr>
          <tr><td className="hl">不採算案件の有無</td><td>赤字プロジェクトの発生</td><td>プロジェクト管理力の実力値</td></tr>
        </tbody>
      </table>
      <p>収益構造は、性格の違う3つの収益が混在します。景気に左右される新規開発と、安定した保守運用、そして成長領域のクラウド/SaaS ― どの比率が高いかで、会社の稼ぎ方も財務の安定性もまるで変わります。</p>
      <table>
        <thead>
          <tr><th>収益区分</th><th>性格</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">受託開発（フロー）</td><td>プロジェクト型</td><td>景気変動を受けやすい。不採算リスクを抱える本業</td></tr>
          <tr><td className="hl">運用保守（ストック）</td><td>継続課金型</td><td>安定収益。景気耐性の源泉</td></tr>
          <tr><td className="hl">クラウド/SaaS</td><td>サブスク型</td><td>人月に縛られず高収益。成長領域だが先行投資が重い</td></tr>
        </tbody>
      </table>
      <Analogy label="⚠️ 財務分析でだまされないために">
        ITサービス会社を「売上高」の大きさだけで比べてはいけません。人月を積み上げて売上を膨らませても、稼働率が低ければ利益は残らない。実力は<strong>1人当たり利益</strong>と<strong>営業利益率</strong>で測ります。そして<strong>人月依存の受託中心か、自社サービス・パッケージ中心か</strong>で収益性は別物です。営業利益率が10%前後の受託型に対し、自社ERPのオービックは40〜60%級 ― 同じ「IT企業」でもビジネスモデルが違えば、比べる意味すら変わります。人月脱却の進捗こそが、収益性の差を生む本質です。
      </Analogy>
      <p>もう一つ忘れてはならないのが、<strong>最大の資産がBSに載らない</strong>点です。労働集約のこの業界では、エンジニアの数・採用力・離職率こそが競争力の源泉ですが、人材は貸借対照表に計上されません。財務諸表の数字の裏にある「人」を読むことが、ITサービスの分析では欠かせません。</p>

      <Heading num="05">企業規模・主要プレイヤー ― 三強と多重下請け構造</Heading>
      <p>ITサービス業（上場企業売上の集計）は約<Term>16.5兆円</Term>規模。頂点に立つのが、大型の公共・金融・社会インフラのシステムを担うNTTデータ・富士通・NECの<Term>三強</Term>です。数値はいずれも概算（2023〜2024年度決算ベースの目安）です。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">NTTデータグループ</td><td>約4.4兆円</td><td>国内最大。公共・金融に強く、M&Aで海外展開を積極化</td></tr>
          <tr><td className="hl">富士通</td><td>約3.7兆円</td><td>総合ITベンダー。ハード縮小し、UvanceでDX事業へ転換</td></tr>
          <tr><td className="hl">NEC</td><td>約3.3兆円</td><td>社会インフラ・公共・通信。5G・AI・顔認証に注力</td></tr>
          <tr><td className="hl">野村総合研究所（NRI）</td><td>約7,000億円</td><td>コンサル＋IT、金融システムに強い。業界屈指の高収益</td></tr>
        </tbody>
      </table>
      <p>三強の下には、多様なプレイヤーが広がります。商社系の<Term>伊藤忠テクノソリューションズ（CTC）</Term>や住友商事系の<Term>SCSK</Term>、独立系の<Term>TIS</Term>・<Term>BIPROGY（旧日本ユニシス）</Term>、中小企業向けの大塚商会。そして自社パッケージERPで営業利益率60%級という異例の高収益を誇る<Term>オービック</Term>。金融ではメガバンクの勘定系を支えるシステム子会社群も、この産業の一角です。</p>
      <p>この業界の規模構造を特徴づけるのが、元請け（大手SIer）→ 二次請け → 三次請け…と人月ビジネスが連なる<Term>多重下請け構造</Term>です。5次・6次請けも珍しくなく、中間搾取や末端技術者の処遇が長年の課題とされてきました。さらに構造的な<Term>ITエンジニア不足</Term>（経産省試算で2030年に最大79万人不足）が人月単価を押し上げる一方、供給制約が成長の壁にもなっています。</p>
      <p>売上規模は大きくとも、人月依存の受託が中心では収益性に限界があります。<strong>クラウド・SaaS・DXという付加価値型へどれだけ転換できるか</strong>が、この産業が「規模」を「稼ぐ力」に変えられるかの分岐点。NRIやオービックのように人月依存を脱して高収益を実現する道こそ、業界全体の目指す先です。</p>

      <Heading num="まとめ">ITサービスという産業をどう捉えるか</Heading>
      <p>ITサービス業は、1960年代のメインフレーム導入から約60年をかけて、計算センター → 受託開発 → SIer三類型 → 三強体制へと姿を変えてきました。その歴史は「人の工数をどう売るか」の連続であり、人月モデルが業界の体質と会計を規定し、いままたクラウド・SaaSがその前提を揺らしている ― 歴史と会計は地続きです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>人月を売る労働集約産業</h4><p>原価の中心は人件費・外注費。資産は軽く、稼働率と人月単価が採算を決める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>不採算プロジェクトが最大のリスク</h4><p>長期開発は工事進行基準で計上。見積り違いによる損失引当が一発で利益を吹き飛ばす。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>フロー・ストック・サブスクの混在</h4><p>受託・運用保守・SaaSで性格が別。ストック比率とビジネスモデルで収益性が変わる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>三強と多重下請け、人月脱却が課題</h4><p>NTTデータ・富士通・NECを核に下請けが連なる。クラウド・DXへの転換が分岐点。</p></Card>
      </CardGrid>
      <p>ITサービスの会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、高収益SaaS企業の株価評価の考え方は<Link href="/finance/valuation">企業価値とPBR</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/software" tag="業界">ソフトウェア</RelatedLink>
                    <RelatedLink href="/industry/consulting" tag="業界">コンサルティング</RelatedLink>
                    <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
