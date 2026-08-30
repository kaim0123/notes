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
  title: "コンサルティング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>業界 · 教育・人材</Eyebrow>
        <h1>コンサルティング ―「人月」を売る労働集約・軽資産の頭脳産業</h1>
        <Lead>
          コンサルティングは、工場も在庫も持たず、<Term>コンサルタントという「人」の稼働時間</Term>を売って稼ぐ産業です。売上はおおむね「人員数 × 単価 × 稼働率」で決まり、最大の資産である人材はどこにも計上されません ― <Term>簿外の資産</Term>で戦う商売です。戦後の経営近代化支援に始まり、マッキンゼーやBCGなど外資系戦略ファームの上陸、バブル崩壊後のリストラ・BPR支援、Y2K・ERPのIT化支援を経て、いまはDX（デジタル変革）需要で市場が急拡大しています。戦略・総合・IT・人事と多彩なファームが企業の経営課題を解く、その約70年の歩みと、他業界とはまるで違う会計の姿を追います。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1955">日本生産性本部<br />米国式経営の導入</TimelineItem>
        <TimelineItem era="1965">野村総合研究所<br />シンクタンクの原型</TimelineItem>
        <TimelineItem era="1966">BCG日本進出<br />PPMという武器</TimelineItem>
        <TimelineItem era="1971">マッキンゼー東京<br />戦略コンサル上陸</TimelineItem>
        <TimelineItem era="1990s">BPR・リストラ支援<br />バブル崩壊後</TimelineItem>
        <TimelineItem era="2000s">Big4の確立<br />監査＋コンサル</TimelineItem>
        <TimelineItem era="2001">アクセンチュア上場<br />アンダーセン消滅</TimelineItem>
        <TimelineItem era="2018-">DX需要急増<br />総合系が大量採用</TimelineItem>
        <TimelineItem era="2020s">脱炭素・生成AI<br />価値提供の再定義</TimelineItem>
      </Timeline>

      <Heading num="01">経営近代化から戦略コンサル上陸へ（1950〜1970年代）</Heading>
      <p>日本のコンサルティングは、戦後の<Term>経営近代化</Term>とともに芽生えました。占領下で米国式の経営手法が持ち込まれ、デミング博士の来日を機に<Term>品質管理（QC）</Term>が、テイラー主義に連なる<Term>科学的管理</Term>が広まります。1955年に設立された<Term>日本生産性本部</Term>は、生産性向上運動・経営者教育・海外視察団の派遣を通じて、経営を「合理的に改善できる対象」として捉える土壌を耕しました。ここに、外部の専門家が経営課題を診断し助言するというニーズが生まれます。</p>
      <p>転機は外資系ファームの上陸でした。1966年に<Term>ボストン コンサルティング グループ（BCG）</Term>が日本に進出し、事業ポートフォリオを分析する<Term>PPM（プロダクト・ポートフォリオ・マネジメント）</Term>という「経営を考えるための道具」を持ち込みます。1971年には<Term>マッキンゼー</Term>が東京オフィスを開設し、経営戦略そのものを商品として売る<Term>戦略コンサルティング</Term>を本格的に根づかせました。</p>
      <Analogy label="💡 たとえるなら">
        戦略コンサルの上陸は「経営に、専門の家庭教師とセカンドオピニオンの医者を招く」ことに似ています。社内の常識では解けない問いに、外部の視点とフレームワーク（PPMのような分析の型）を持ち込んで答えを出す ― 設備でも製品でもなく、<strong>「考える力」そのものを売る</strong>商売がここに立ち上がりました。
      </Analogy>
      <p>同じ時期、国内では調査・分析を担う<Term>シンクタンク</Term>が育ちます。1965年に野村證券の調査部から独立した<Term>野村総合研究所（NRI）</Term>は経済・産業調査を出発点に、1980年代以降はITコンサル・システム構築（SI）と金融システムに強みを広げました。1970年に三菱グループの頭脳として発足した<Term>三菱総合研究所（MRI）</Term>は官公庁向けの政策提言を、1969年設立で三井住友FG系の<Term>日本総合研究所</Term>もシンクタンク機能を担い、外資系とは異なる「調査・政策・IT」の系譜を形づくっていきます。</p>

      <Heading num="02">市場の拡大 ― リストラ支援とIT化の波（1980〜1990年代）</Heading>
      <p>1985〜1991年のバブル期、好況に沸く企業では経営戦略やM&Aの需要が増し、コンサル市場は膨らみます。<Term>アンダーセン・コンサルティング</Term>（後のアクセンチュア）や、プライスウォーターハウス、クーパース&ライブランドといった<Term>会計事務所系のコンサル部門</Term>が存在感を強めたのもこの時期です。</p>
      <p>だがコンサルの真価が問われたのは、むしろ崩壊後でした。1990年代、経営危機に陥った企業の<Term>リストラ（人員削減）</Term>や<Term>事業ポートフォリオの見直し</Term>を、業務プロセスを抜本的に組み替える<Term>BPR（ビジネスプロセス・リエンジニアリング）</Term>として支援する仕事が急増します。好況期の「攻めの戦略」から、不況期の「守りの再建」へ ― コンサルは景気の局面ごとに需要の中身を変える、プロジェクト型産業の性格をはっきり見せ始めました。</p>
      <Aside label="なぜIT化がコンサルの主戦場になったか">
        1990年代後半、西暦2000年に日付処理が誤作動する<strong>Y2K（2000年問題）</strong>への対応でシステム改修需要が爆発し、ITコンサルが活況を呈します。続いて<strong>SAP・Oracle</strong>などの<strong>ERP（統合基幹業務システム）</strong>導入が広がると、「システムを入れる」ことは「業務のやり方を変える」ことと不可分になりました。ここで戦略を語るだけのコンサルと、システム実装まで担うコンサルが分岐し、後者が量的な主役へと育っていきます。
      </Aside>

      <Heading num="03">Big4とMBB、そしてDXへ（2000年代〜現在）</Heading>
      <p>2000年代、会計事務所の世界的な再編を経て<Term>Big4</Term>（デロイト トーマツ・PwC・EY・KPMG）が確立し、監査法人にコンサルを併せ持つ<Term>総合サービス</Term>体制が固まります。2001年のエンロン事件では大手会計事務所アーサー・アンダーセンが消滅する一方、そのコンサル部門は<Term>アクセンチュア</Term>として独立・上場し、IT・業務コンサルの最大手へと駆け上がりました。監査人としての独立性と、同じ顧客へのコンサル提供という利益相反が問われた事件でもありました。</p>
      <p>戦略の頂点には、マッキンゼー・BCG・<Term>ベイン・アンド・カンパニー</Term>の<Term>戦略ファーム御三家（MBB）</Term>が並びます。超高給・激務・エリート集団というイメージ ― 昇進できなければ去る<Term>up or out</Term>の文化、東大・京大・海外MBA出身者が集い、コンサル出身者が転職市場で人気を博す構図は、この頃に定着しました。国内でも、純国産のIT・業務コンサルである<Term>ベイカレント・コンサルティング</Term>（2001年設立）、日本企業に特化した戦略ファームのコーポレイト ディレクション、戦略に投資を組み合わせるドリームインキュベータなどが育ちます。</p>
      <p>そして2018年頃から、産業を一変させたのが<Term>DX（デジタルトランスフォーメーション）</Term>需要です。レガシーシステムの刷新、デジタル戦略の策定、AI・IoTを使ったデータ活用の支援が急増し、各社はデジタル部門を強化、UX重視でデザイン会社を買収し、エンジニアを大量採用しました。近年はこれに<Term>脱炭素・ESG</Term>のサステナビリティ支援、M&A後の統合を担う<Term>PMI（Post Merger Integration）</Term>、スタートアップへのハンズオン支援が加わり、市場は拡大を続けています。一方で、定型的な分析業務は<Term>生成AI・自動化</Term>に代替されうるため、より付加価値の高い領域へ軸足を移せるかが問われる新局面に入っています。</p>

      <Heading num="04">会計・財務の特徴 ―「人が商品」で在庫がない</Heading>
      <p>ここからは、<Link href="/finance/statements">財務三表</Link>を業界の現実に当てはめます。コンサルの会計が製造業と根本的に違うのは、<Term>コンサルタントという「人」が商品</Term>で、在庫を持たないからです。一般的なメーカーと並べると、その軽さがよく分かります。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>一般的なメーカー</th><th>コンサルティング</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">売るもの</td><td>製品（モノ）</td><td><strong>コンサルタントの稼働時間</strong>（人月）</td></tr>
          <tr><td className="hl">在庫</td><td>棚卸資産あり</td><td><strong>在庫なし</strong>（売れ残った時間は消える）</td></tr>
          <tr><td className="hl">主な資産</td><td>工場・設備</td><td><strong>売上債権・現金</strong>（固定資産は薄い）</td></tr>
          <tr><td className="hl">最大のコスト</td><td>材料費・製造原価</td><td><strong>人件費</strong>（コンサルタント報酬）</td></tr>
          <tr><td className="hl">最大の資産</td><td>BSに載る</td><td><strong>「人」＝簿外</strong>（BSに載らない）</td></tr>
        </tbody>
      </table>
      <p>この構造は<Link href="/finance/pl">損益計算書（PL）</Link>にそのまま表れます。売上高はプロジェクトフィー、すなわち<strong>人員数 × 単価 × 稼働率</strong>で決まり、原価の中心は<Term>コンサルタントの人件費</Term>です。設備投資や材料費が薄いため、単価と稼働率さえ保てれば営業利益率は高く出やすく、独立系のベイカレント等では20〜30%級に達します。</p>
      <table>
        <thead>
          <tr><th>PL項目</th><th>中身</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">売上高</td><td>プロジェクトフィー（人員×単価×稼働率）</td><td>案件次第で変動するプロジェクト型</td></tr>
          <tr><td className="hl">原価（人件費）</td><td>コンサルタントの報酬</td><td>最大のコスト。優秀人材ほど高い</td></tr>
          <tr><td className="hl">販管費</td><td>採用費・教育費・オフィス</td><td>拡大期は採用・育成が先行してかさむ</td></tr>
          <tr><td className="hl">営業利益率</td><td>売上に対する営業利益</td><td>高単価ゆえ高い（軽資産のため）</td></tr>
        </tbody>
      </table>
      <p>一方の<Link href="/finance/bs">貸借対照表（BS）</Link>は驚くほど軽く、資産は売上債権と現金が中心です。進行中のプロジェクトで発生した原価や未請求分は<Term>仕掛品・契約資産</Term>として計上され、ファーム買収を行えば<Term>のれん</Term>が乗ります。高収益ファームは<Term>キャッシュリッチ</Term>になりやすい反面、最大の資産である人材はどこにも現れません。</p>
      <Aside label="なぜ「人」がBSに載らないのか">
        会計では、支配し測定できる資源を資産に計上します。ところが人材への<strong>採用費・教育費は投資であっても費用として処理</strong>され、資産化されません（拡大期はコストが先行します）。雇用しているだけの人を「支配下の資産」とは扱えないためです。結果として、コンサルの本質的価値である<strong>人的資本は簿外</strong>となり、財務諸表は実像の一部しか映しません。そのぶん、優秀人材を引き留めるために<Link href="/finance/cash">株式報酬（SO・RSU）</Link>が使われます。
      </Aside>

      <Heading num="05">コンサルを診る指標 ― 稼働率・単価・人員数</Heading>
      <p>コンサルの実力は、製造業とは違う専用の物差しで測ります。<Link href="/finance/metrics">収益性と効率の指標</Link>のコンサル版と考えてください。売上を分解する<strong>人員数 × 単価 × 稼働率</strong>の三要素が、すべての中心にあります。</p>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>なぜ効くか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">稼働率（Utilization）</td><td>コンサルタントのアサイン率</td><td>採算の生命線。待機（ベンチ）は即損失</td></tr>
          <tr><td className="hl">単価（人月単価）</td><td>提供価値の価格</td><td>戦略系ほど高単価。値付け力そのもの</td></tr>
          <tr><td className="hl">コンサルタント数</td><td>供給能力＝人員</td><td>採用力が成長の源泉。増員が売上上限を規定</td></tr>
          <tr><td className="hl">1人当たり売上・利益</td><td>生産性</td><td>質の高い稼働ができているかの物差し</td></tr>
          <tr><td className="hl">受注残・パイプライン</td><td>将来の売上見込み</td><td>プロジェクト型ゆえ先行きの安定度を示す</td></tr>
          <tr><td className="hl">離職率・採用数</td><td>人材の維持・拡大力</td><td>流出は競争力低下。定着が本質的価値を守る</td></tr>
        </tbody>
      </table>
      <p>会計上の論点も他業界とは異なります。<Term>収益認識</Term>は契約形態で変わり、工数を提供する<Term>準委任契約</Term>は期間・進捗に応じて計上、成果物の完成に対価を払う<Term>成果報酬型</Term>は成果物の完成時に計上します。進行中案件の原価や未請求売上は<Term>仕掛品・契約資産</Term>として、ファーム買収による<Term>のれん</Term>は減損リスクとともに、それぞれBSに現れます。</p>
      <Analogy label="⚠️ 財務分析でだまされないために">
        コンサルは「人員数の伸び＝成長」ですが、<strong>急拡大は稼働率低下の罠</strong>を抱えます。採用を急いでも案件が伴わなければ待機（ベンチ）が増え、稼働率が下がって<strong>即減益</strong>になりかねません。だから見るべきは、人員数だけでなく<strong>稼働率×単価</strong>を維持できているか、そして<strong>離職率</strong>が低く人材が定着しているか。DX需要の追い風で高利益率が続いても、景気後退でコンサル需要が細れば単価も稼働率も揺れる ― 高収益の「持続性」を疑ってかかるのが要点です。
      </Analogy>

      <Heading num="06">企業規模・主要プレイヤー ― 戦略・総合・IT・人事の重層</Heading>
      <p>日本のコンサル市場は1兆円を超える規模とされ、DX・IT系を含めると急拡大しています。プレイヤーは、少数精鋭で超高単価の<Term>戦略系</Term>と、システム実装まで担い大規模に人を抱える<Term>総合・DX系</Term>とに大きく分かれ、量的な拡大を牽引しているのは後者です。まず外資系を見ます。</p>
      <table>
        <thead>
          <tr><th>区分</th><th>主なファーム</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">戦略系（MBB）</td><td>マッキンゼー・BCG・ベイン</td><td>戦略ファーム御三家（非上場）。少数精鋭・超高単価・超高給</td></tr>
          <tr><td className="hl">総合・DX系</td><td>アクセンチュア</td><td>総合・DX最大手。日本で大量採用し、IT実装まで担う</td></tr>
          <tr><td className="hl">Big4系</td><td>デロイト トーマツ・PwC・EY・KPMG</td><td>監査＋コンサル。財務・IT・M&Aを幅広く提供</td></tr>
          <tr><td className="hl">IT・業務系</td><td>IBM・アビームコンサルティング（NEC系）</td><td>ITと業務改革を軸にしたコンサル</td></tr>
        </tbody>
      </table>
      <p>国内の上場コンサルにも、性格の異なる有力企業が並びます。</p>
      <table>
        <thead>
          <tr><th>企業</th><th>売上高の目安</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">野村総合研究所（NRI）</td><td>約7,000億円</td><td>コンサル＋ITの高収益企業。金融システムに強み</td></tr>
          <tr><td className="hl">ベイカレント・コンサルティング</td><td>約1,000億円</td><td>独立系DXコンサル。急成長・高収益の純国産</td></tr>
          <tr><td className="hl">船井総研HD・山田コンサル等</td><td>各数百億円規模</td><td>中小企業向けの経営コンサル</td></tr>
          <tr><td className="hl">経営共創基盤（IGPI）等</td><td>―</td><td>戦略にハンズオン支援・投資を組み合わせる</td></tr>
        </tbody>
      </table>
      <Aside label="数値の扱いについて">
        上の売上高は各社決算をもとにした概算の目安で、年度や集計範囲で変わります。正確な最新値は各社の有価証券報告書・決算短信でご確認ください。なお三菱総合研究所は官公庁・政策提言、リンクアンドモチベーションやマーサー・タワーズワトソンは人事・組織など、専門特化型のファームも層をなしています。
      </Aside>
      <p>規模構造の要点は、<strong>人材（コンサルタント数）が資産</strong>だという一点に集約されます。稼働可能な人員 × 単価 × 稼働率が売上を決めるため、採用力がそのまま成長力になり、DXの追い風のもとでアクセンチュア・Big4・ベイカレントらが大量採用で量的に急拡大してきました。とはいえ、案件頼みのプロジェクト型ゆえ景気変動に弱く、優秀人材の争奪戦と激務・働き方改革という課題も抱えます。<strong>DX需要と生成AIの進展を、コスト削減の脅威ではなく高付加価値化の追い風に変えられるか</strong>が、各ファームの分岐点です。</p>

      <Heading num="まとめ">コンサルティングという産業をどう捉えるか</Heading>
      <p>コンサルティングは、戦後の経営近代化支援から約70年をかけて、シンクタンク・戦略ファーム上陸 → リストラ・IT化支援 → 総合系のDX拡大へと姿を変えてきました。その歴史は「企業がその時々に解けない問いを、外部の頭脳で解く」需要の変遷そのものであり、景気の局面ごとに仕事の中身が入れ替わるプロジェクト型の宿命を映しています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>「人月」を売る労働集約・軽資産産業</h4><p>在庫も工場も持たず、コンサルタントの稼働時間を売る。売上は人員数×単価×稼働率で決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>稼働率・単価・人員数で見る</h4><p>稼働率の低下は即減益。急拡大は待機（ベンチ）増のリスクを抱える。離職率と定着が競争力。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>戦略・総合・IT・人事の重層</h4><p>少数精鋭・超高単価のMBBと、実装まで担う総合・DX系（アクセンチュア・Big4）で規模が分かれる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>「人」が最大の資産（簿外）</h4><p>採用・教育は費用処理で人材はBSに載らない。人的資本こそ本質的価値で、株式報酬で引き留める。</p></Card>
      </CardGrid>
      <p>コンサルの会計を支える基礎は<Link href="/finance/statements">財務三表の全体像</Link>と<Link href="/finance/analysis">三表から会社を診断する</Link>で、高利益率や効率を測る物差しは<Link href="/finance/metrics">収益性と効率の指標</Link>で、それぞれ詳しく扱っています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/industry" tag="業界">業界の全体像</RelatedLink>
                    <RelatedLink href="/industry/it-services" tag="業界">ITサービス</RelatedLink>
                    <RelatedLink href="/industry/staffing" tag="業界">人材サービス</RelatedLink>
                    <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
