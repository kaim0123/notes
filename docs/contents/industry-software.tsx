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
  title: "ソフトウェア",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 情報通信</Eyebrow>
        <h1>ソフトウェア ― 「作れば増やせる」限界費用ほぼゼロの高収益産業</h1>
        <Lead>
          ソフトウェアは、一度作ってしまえば複製・追加販売にコストがほとんどかからない<Term>限界費用が極めて低い</Term>産業です。だからスケールすれば利益率が跳ね上がり、オービックのように営業利益率60%級という製造業ではありえない収益体質が生まれます。ハードの付属品として無償で配られていた時代から、業務パッケージ、ゲーム、スマホアプリ、そして月額課金で収益を積み上げる<Term>SaaS</Term>へ ― 姿を変え続けてきたその歴史と、成長期には「会計上は赤字でも高く評価される」という独特の会計・財務の姿を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1969">IBMがソフト分離<br />ソフトが商品に</TimelineItem>
        <TimelineItem era="1983">ファミコン・一太郎<br />PC・ゲームの黎明</TimelineItem>
        <TimelineItem era="1985">スーパーマリオ<br />世界的大ヒット</TimelineItem>
        <TimelineItem era="1994">プレイステーション<br />3Dゲームの大衆化</TimelineItem>
        <TimelineItem era="1995">Windows 95<br />マイクロソフトの支配</TimelineItem>
        <TimelineItem era="2008">App Store開始<br />アプリ経済の誕生</TimelineItem>
        <TimelineItem era="2012">freee・マネフォ<br />クラウド会計SaaS</TimelineItem>
        <TimelineItem era="2017">Switch・クラウド<br />家庭用復権とSaaS化</TimelineItem>
      </Timeline>

      <Heading num="01">付属品からの独立 ― 受託開発、パッケージ、そしてゲーム（1960〜80年代）</Heading>
      <p>いまでこそ「商品」であるソフトウェアも、1960年代にはコンピュータに付属する<Term>無償の添え物</Term>でした。ハードを売るための一部であり、個別の要望にはその都度<Term>受託開発</Term>で応えていました。転機は1969年、<Term>IBM</Term>がハードとソフトを分離（アンバンドリング）し、ソフトウェアを有償化したことです。ここでソフトが独立した産業として立ち上がります。</p>
      <p>日本でも1970年代にシステム開発会社が急増しました。ただし主流はあくまで<Term>COBOL</Term>による業務システムの受託開発です。会計ソフトなどを汎用化して売る<Term>パッケージソフト</Term>の試みもありましたが、企業ごとに業務を作り込む<Term>カスタマイズ文化</Term>が強く、なかなか普及しませんでした。「一社ごとに作る」受託と、「一度作って多数に売る」パッケージ ― この二つの発想の違いは、いまのITサービス業とソフトウェア業の分かれ目にもつながっています。</p>
      <Analogy label="💡 たとえるなら">
        受託開発は<strong>オーダーメイドの注文服</strong>、パッケージソフトは<strong>既製服（プレタポルテ）</strong>です。注文服は一着ごとに手間もお金もかかりますが、既製服は型さえ作れば同じものを大量に、しかも一着あたりほぼタダで複製できます。ソフトウェアの高収益の源泉は、この「既製服を無限に複製できる」性質 ― つまり限界費用の低さにあります。
      </Analogy>
      <p>1980年代、パソコンの普及がソフトの舞台を広げます。1982年発売のNEC<Term>PC-9801</Term>は「国民機」と呼ばれ日本市場を席巻し、その上でジャストシステムの<Term>一太郎</Term>（1983年）がワープロソフトとして圧倒的シェアを握りました。もう一つの主役が<Term>ゲームソフト</Term>です。1983年の任天堂ファミリーコンピュータ、そして1985年の<Term>スーパーマリオブラザーズ</Term>（宮本茂）が世界的大ヒットとなり、コナミ・カプコン・ナムコ・スクウェアといった<Term>サードパーティ</Term>が育ちました。スクウェアの『ファイナルファンタジー』（1987年）、エニックスの『ドラゴンクエスト』（1986年）は、日本のゲームが世界に誇るコンテンツの原点です。</p>

      <Heading num="02">Windows支配とゲームの世界進出 ― そしてスマホへ（1990〜2000年代）</Heading>
      <p>1995年の<Term>Windows 95</Term>は、パソコン市場を一変させました。GUIとインターネットを備えた世界標準OSの登場で、DOS/V機（IBM PC互換機）が主流となり、PC-9801は終焉を迎えます。そしてマイクロソフトが<Term>Office</Term>（Word・Excel・PowerPoint）をデファクトスタンダードにすると、一太郎はWordに、Lotus 1-2-3はExcelに敗れていきました。<strong>OSを握った者がその上のアプリまで制する</strong> ― プラットフォームの強さを示した時代です。基幹の<Term>エンタープライズソフト</Term>でもOracle Database（RDBMS）やSAPのERPが台頭し、日本市場は外資優勢の構図が固まります。</p>
      <p>一方、日本が世界で勝ち続けたのが<Term>ゲーム</Term>です。1994年のソニー<Term>プレイステーション</Term>はCD-ROMの大容量と3Dグラフィックスで世界累計1億台を達成。1997年の『ファイナルファンタジーVII』に象徴されるように表現は高度化し、開発費は数億〜数十億円へと高騰しました。セキュリティ分野でも1988年創業の<Term>トレンドマイクロ</Term>が「ウイルスバスター」で世界的企業に成長します。さらにLinux・Apache・MySQLといった<Term>オープンソース</Term>が普及し、無償ソフトを土台にサポートやサービスで稼ぐ新しいビジネスモデルも広がりました。</p>
      <p>2000年代後半には舞台がスマートフォンへ移ります。2008年のiPhone向け<Term>App Store</Term>開始で<Term>アプリ経済</Term>という新市場が生まれ、課金モデルのゲームアプリが花開きました。日本でも<Term>LINE</Term>（2011年、後にヤフーと統合しLINEヤフー）、ガンホーの『パズドラ』（2012年）、ミクシィの『モンスターストライク』（2013年）が大ヒット。GREEやDeNAが牽引した<Term>ソーシャルゲーム</Term>は、2012年の<Term>コンプガチャ問題</Term>で射幸性が問われ規制が強化されました。家庭用でも任天堂のWii・Nintendo Switch（2017年、世界累計1.3億台超）、ソニーのPS4・PS5が世界で存在感を保ち続けています。</p>

      <Heading num="03">クラウド・SaaSの時代 ― 「売り切り」から「積み上げ」へ（2010年代後半〜現在）</Heading>
      <p>いま産業の主役になりつつあるのが<Term>SaaS（Software as a Service）</Term>です。ソフトを買い切るのではなく、クラウド上のサービスを<Term>サブスクリプション（月額課金）</Term>で使う形。インストール不要でアップデートも自動、中小企業でも導入しやすいのが特徴です。日本ではクラウド会計の<Term>freee</Term>・<Term>マネーフォワード</Term>（ともに2012年創業）、名刺管理の<Term>Sansan</Term>、人事労務の<Term>SmartHR</Term>、グループウェアとkintoneを展開する<Term>サイボウズ</Term>などが台頭しました。</p>
      <Aside label="なぜ「売り切り」から「積み上げ」なのか">
        パッケージの買い切り（<strong>フロー型</strong>）は、売れた瞬間に一度きりの売上が立ちます。対してSaaSの月額課金（<strong>ストック型</strong>）は、毎月・毎年くり返し収益が入り、契約が続くかぎり積み上がっていきます。新規契約が既存契約に上乗せされていくため、解約さえ抑えれば収益は雪だるま式に成長する ― この収益の質の違いが、SaaSが高く評価される理由です。
      </Aside>
      <p>海外でもSalesforce（CRM）、Slack（チャット）、Zoom（Web会議）、Microsoft 365、Google WorkspaceといったSaaSが日本市場を席巻しました。2020年代にはプログラミング不要で業務アプリを作る<Term>ローコード・ノーコード</Term>（kintone、PowerApps）による「市民開発」も広がっています。ソースコード共有プラットフォームの<Term>GitHub</Term>は2018年にマイクロソフトが買収し、オープンソース開発をさらに加速させました。日本は業務基盤ソフト（OS・DB・ERP）では海外依存が高いものの、ゲーム・SaaS・セキュリティには確かな強みを持っています。</p>

      <Heading num="04">会計・財務の特徴 ― 限界費用ゼロがすべてを変える</Heading>
      <p>ここからは、<Link href="/finance/statements">財務三表</Link>をこの業界の現実に当てはめます。ソフトウェア会計を他業界と分けるのは、なんといっても<Term>限界費用が低い</Term>ことです。一度開発したソフトを追加販売してもコストがほぼ増えず、スケールするほど利益率が急上昇します。製造業と並べると、その体質の違いがはっきりします。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>一般的な製造業</th><th>ソフトウェア</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">追加生産のコスト</td><td>材料費・人件費がかかる</td><td><strong>ほぼゼロ（限界費用が低い）</strong></td></tr>
          <tr><td className="hl">売上原価</td><td>原材料・製造費で高め</td><td><strong>サーバー・サポート中心で低め（高粗利）</strong></td></tr>
          <tr><td className="hl">主な費用</td><td>製造原価</td><td><strong>研究開発費・顧客獲得コスト（CAC）</strong></td></tr>
          <tr><td className="hl">資産</td><td>工場・設備が重い</td><td><strong>軽い（クラウド利用なら設備小）</strong></td></tr>
          <tr><td className="hl">収益の形</td><td>売り切り（フロー）</td><td><strong>フロー（パッケージ）＋ストック（SaaS）</strong></td></tr>
        </tbody>
      </table>
      <p>収益構造は、大きく二つのモデルに分かれます。同じソフトでも、この違いが<Link href="/finance/pl">損益計算書（PL）</Link>の見え方を大きく変えます。</p>
      <table>
        <thead>
          <tr><th>モデル</th><th>収益の立ち方</th><th>会計・評価のポイント</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パッケージ（フロー型）</td><td>売り切り。売れた期に一括計上</td><td>成熟企業は高利益率・潤沢キャッシュ。利益・ROEで見る</td></tr>
          <tr><td className="hl">SaaS（ストック型）</td><td>年間契約を前受し、期間按分で計上</td><td>前受分は<strong>繰延収益（契約負債）</strong>としてB/Sに積み上がる</td></tr>
        </tbody>
      </table>
      <p>SaaSのPLでとくに大きいのが、広告・営業といった<Term>顧客獲得コスト（CAC）</Term>です。CACは通常その期の費用として処理され、資産にはなりません。そのため成長期のSaaSは、将来の継続収益（<Term>LTV</Term>）を積み上げている最中でも、会計上は<strong>営業赤字</strong>に見えます。しかしこれは投資による赤字であって、事業が傷んでいるわけではありません。<Link href="/finance/bs">貸借対照表（BS）</Link>側では、前受したサブスク料が<Term>繰延収益（契約負債）</Term>として積み上がり、これがむしろ成長の証になります。</p>
      <Aside label="繰延収益は「うれしい負債」">
        年間契約を前受すると、まだ提供していないサービスの分は<strong>契約負債（繰延収益）</strong>という負債になります。負債と聞くと悪そうですが、これは「これから提供して収益になる予約済みの売上」。<Link href="/finance/cf">キャッシュフロー</Link>では先にお金が入るため、赤字でも営業キャッシュフローが回りやすい。繰延収益が増えているSaaSは、将来収益を先取りしている健全な成長企業のサインです。
      </Aside>

      <Heading num="05">ソフトウェアを診る指標 ― ARR・解約率・Rule of 40</Heading>
      <p>成長期のSaaSは、利益では実力を測れません。<Link href="/finance/metrics">収益性と効率の指標</Link>に加えて、SaaS固有の物差しを使います。会計赤字＝先行投資と読み替え、次のKPIで将来価値を評価します。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>見方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MRR / ARR</td><td>月次・年次の経常収益（ストック収益の規模）</td><td>SaaSの最重要指標。成長率が命</td></tr>
          <tr><td className="hl">解約率（チャーン）</td><td>顧客・収益がどれだけ失われるか</td><td>低いほど良い。収益の持続性を示す</td></tr>
          <tr><td className="hl">NRR（売上継続率）</td><td>既存顧客からの売上の拡大度</td><td>100%超が理想（解約を上回る増額）</td></tr>
          <tr><td className="hl">CAC / LTV</td><td>顧客獲得コストと生涯価値</td><td>LTV ÷ CACで採算を判断</td></tr>
          <tr><td className="hl">Rule of 40</td><td>売上成長率＋利益率</td><td>合計40%超なら健全とされる</td></tr>
          <tr><td className="hl">PSR</td><td>株価売上高倍率</td><td>赤字SaaSの<Link href="/finance/valuation">企業価値評価</Link>に使う</td></tr>
        </tbody>
      </table>
      <p>会計上の論点も独特です。サブスクの<Term>収益認識</Term>は期間按分が基本で、繰延収益（契約負債）が発生します。自社開発ソフトは要件を満たす部分を<Term>ソフトウェア資産</Term>として計上・償却し、研究開発費と区分します。M&Aで生じる<Term>のれん</Term>、スタートアップに多い<Term>ストックオプション（株式報酬）</Term>費用も見どころです。</p>
      <Analogy label="⚠️ 財務分析でだまされないために">
        成長SaaSを<strong>「赤字だから危ない」と切り捨ててはいけません</strong>。赤字の中身が顧客獲得への先行投資なら、実力は<strong>ARR成長率・低い解約率・高いNRR・LTV/CAC</strong>に表れます。逆に、オービックのような<strong>成熟パッケージは利益・ROE・キャッシュ</strong>で見るべきで、同じ「ソフトウェア」でもステージが違えば物差しがまるで変わります。繰延収益（契約負債）の増加は、将来収益の先取りを示す先行指標として必ずチェックします。
      </Analogy>

      <Heading num="06">企業規模・主要プレイヤー ― 高収益パッケージ、急成長SaaS、世界のゲーム</Heading>
      <p>ソフトウェアはIT市場（約16.5兆円）の中核で、SaaS市場が急成長しています。プレイヤーは大きく三つの顔を持ちます。まず、限界費用の低さを利益に変える<Term>高収益パッケージ</Term>群です。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>規模の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オービック</td><td>売上高 約1,000億円</td><td>統合業務ソフト。営業利益率60%級の超高収益</td></tr>
          <tr><td className="hl">トレンドマイクロ</td><td>セキュリティ世界大手</td><td>ウイルスバスターなど。高収益</td></tr>
          <tr><td className="hl">ラクス（楽楽精算）</td><td>経費精算SaaS</td><td>高収益。SaaSながら黒字成長</td></tr>
        </tbody>
      </table>
      <p>次に、ストック収益を積み上げる<Term>SaaS・クラウド</Term>勢です。<Term>freee</Term>・<Term>マネーフォワード</Term>（クラウド会計）、<Term>Sansan</Term>（名刺・営業DX）、<Term>SmartHR</Term>（人事労務）、<Term>サイボウズ</Term>（グループウェア・kintone）などが並びます。売上規模はまだ小さくても、高成長と高PSRで評価されるのが特徴です。そして日本が世界で勝ち続ける<Term>ゲーム・エンタメ</Term>群があります。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>代表タイトル・特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">任天堂</td><td>約1.7兆円</td><td>自社ハード＋ソフトの統合モデル。マリオ・ゼルダ・ポケモン</td></tr>
          <tr><td className="hl">スクウェア・エニックス</td><td>約3,500億円</td><td>FF・ドラクエの2大RPG（2003年に両社合併）</td></tr>
          <tr><td className="hl">コナミ</td><td>約3,000億円</td><td>パワプロ等。スポーツクラブ事業も</td></tr>
          <tr><td className="hl">バンダイナムコEnt.</td><td>約3,000億円</td><td>パックマン・鉄拳・ガンダムゲーム</td></tr>
          <tr><td className="hl">カプコン</td><td>約1,200億円</td><td>バイオ・モンハン・スト。海外売上8割超</td></tr>
        </tbody>
      </table>
      <p>加えてソニー・インタラクティブエンタテインメント（PS専用ソフト）やセガサミーHDも世界的な存在です。全体を貫く構造は明快で、<strong>限界費用が低くスケールすれば高利益率になる</strong>という共通の力学のもと、成熟パッケージは利益とキャッシュで、急成長SaaSは成長率とストック収益で評価される ― 同じ産業に「稼ぎ方」も「見られ方」も異なる企業が同居しています。</p>

      <Heading num="まとめ">ソフトウェアという産業をどう捉えるか</Heading>
      <p>ソフトウェアは、ハードの付属品から独立し、パッケージ・ゲーム・スマホアプリ・SaaSへと姿を変えながら、一貫して「作れば増やせる」限界費用の低さを武器にしてきました。買い切り型からクラウド・サブスクへの移行が業界全体の潮流であり、ストック収益化が高い企業価値につながっています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>限界費用ほぼゼロの高収益産業</h4><p>複製・追加販売にコストがかからず、スケールするほど利益率が上がる。オービックは営業利益率60%級。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>SaaSはストック収益とKPIで見る</h4><p>月額課金でARRを積み上げる。ARR成長率・解約率・NRR・LTV/CAC・Rule of 40で評価する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>成長SaaSの赤字は先行投資</h4><p>顧客獲得コストは当期費用。会計上は赤字でも繰延収益（契約負債）が積み上がり将来収益を先取り。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ゲーム・SaaSに強み、基盤は外資依存</h4><p>OS・DB・ERPは海外勢が優勢だが、ゲームとSaaS、セキュリティでは世界で競争力を持つ。</p></Card>
      </CardGrid>
      <p>ソフトウェアの会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、成長企業の赤字と黒字倒産の見分け方は<Link href="/finance/cash">黒字倒産と負債</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/it-services" tag="業界">ITサービス</RelatedLink>
                    <RelatedLink href="/industry/entertainment" tag="業界">エンターテインメント</RelatedLink>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値とPBR</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
