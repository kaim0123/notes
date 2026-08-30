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
  Diagram,
  Timeline,
  TimelineItem,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "組織・リーダーシップ理論の歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>組織・リーダーシップ理論の歴史 ― 束ね方の進化</h1>
        <Lead>
          「組織をどう捉え、人をどう率いるか」という問いは、20世紀を通じて何度も塗り替えられてきました。組織を<Term>機械</Term>とみなす発想から始まり、人の集まりとしての組織、状況次第という発見、変革の力、そして<Term>奉仕と自律</Term>へ。組織観とリーダーシップ観は互いに影響し合いながら進化してきました。ここは<Link href="/management/org">組織のマネジメント（マクロ）</Link>と<Link href="/management/team">チームのマネジメント（メゾ）</Link>の<Term>リーダーシップ</Term>を、理論の系譜として深掘りするページです。
        </Lead>
      </Hero>

      <Heading num="01">見取り図 ― 二本の系譜が並走する</Heading>
      <p>この歴史は、<Term>組織観</Term>（組織をどういうものと見るか）と<Term>リーダーシップ観</Term>（何が良いリーダーかの理解）という2本の系譜が、時代ごとに響き合いながら進んできたものと捉えると見通しがよくなります。「機械 → 人間 → 状況 → 変革 → 自律」という同じ大きな流れを、両者はほぼ並んでたどっています。</p>
      <Timeline>
        <TimelineItem era="1910-30s">古典的管理論 ― 組織は機械</TimelineItem>
        <TimelineItem era="1930-50s">人間関係論・行動理論</TimelineItem>
        <TimelineItem era="1960-70s">コンティンジェンシー ― 状況次第</TimelineItem>
        <TimelineItem era="1980-90s">変革型・組織文化</TimelineItem>
        <TimelineItem era="2000s-">サーバント・学習・自律</TimelineItem>
      </Timeline>
      <p>リーダーシップ論だけを取り出すと、<Term>特性理論 → 行動理論 → 条件適合理論 → 変革型 → 奉仕・共有型</Term>という5つの段階に整理できます。以降はこの流れに沿って、組織理論と対応させながら見ていきます。</p>

      <Heading num="02">古典期 ― 組織を機械とみなす</Heading>
      <p>20世紀初頭、組織は<Term>効率的に動く機械</Term>として設計する対象でした。代表が3人です。<Term>テイラー</Term>の<Term>科学的管理法</Term>（1911年）は作業を分解し標準化して効率を最大化しました。<Term>ファヨール</Term>の<Term>管理過程論</Term>（1916年）は、管理を「計画・組織・命令・調整・統制」という機能の連なりとして定式化しました。<Term>ウェーバー</Term>の<Term>官僚制</Term>は、階層・規則・専門化・没人格性に基づく合理的な支配の仕組みを描きました。</p>
      <p>この時代のリーダーシップ観は<Term>特性理論</Term>（偉人説）です。優れたリーダーは生まれつきの資質（知性・決断力・体格など）を備えている、という発想でした。しかし「どんな資質が有効か」は状況で食い違い、共通の決定打は見つからず、やがて関心は「資質」から「行動」へと移っていきます。</p>
      <Aside label="官僚制の功罪">ウェーバーの官僚制は、恣意や縁故を排し公正・予測可能にする発明でした。今日「お役所的」と否定的に使われますが、規則と階層による統治は近代組織の土台であり続けています。</Aside>

      <Heading num="03">人間と行動 ― 組織は人の集まり</Heading>
      <p><Link href="/management/individual/motivation">ホーソン実験</Link>（メイヨーら、1924〜1932年）が示した<Term>人間関係論</Term>は、組織観を「機械」から「<Term>人の集まり</Term>」へと転換させました。<Term>バーナード</Term>は『経営者の役割』（1938年）で、組織を<Term>協働体系</Term>と定義し、成立には「共通目的・貢献意欲・コミュニケーション」の3要素が要ると論じました。</p>
      <p>リーダーシップ観も、資質ではなく<Term>行動</Term>に注目する<Term>行動理論</Term>へ移ります。研究者は「有効なリーダーは何をしているか」を観察し、リーダーの行動が2つの軸に整理できることを見出しました。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>提唱・年</th><th>2つの軸</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オハイオ研究</td><td>1950s</td><td>構造づくり（仕事の枠組み）と 配慮（人への気遣い）</td></tr>
          <tr><td className="hl">マネジリアル・グリッド</td><td>ブレーク &amp; ムートン / 1964</td><td>業績への関心 と 人への関心（9×9で類型化）</td></tr>
          <tr><td className="hl">PM理論</td><td>三隅二不二 / 1966</td><td>P機能（目標達成）と M機能（集団維持）。両方高いPM型が理想</td></tr>
        </tbody>
      </table>
      <p>いずれも「<Term>仕事</Term>」と「<Term>人</Term>」という2軸で、両方を高めるリーダーが望ましいと結論づけました。日本で広く知られる<Term>PM理論</Term>も、この行動理論の系譜に位置します。</p>

      <Heading num="04">「状況次第」の発見 ― コンティンジェンシー</Heading>
      <p>行動理論は「どんな状況でも通用する最善のスタイル」を探しましたが、現実にはうまくいきませんでした。そこで1960年代以降、「<Term>最善は状況によって変わる</Term>」という<Term>コンティンジェンシー理論（条件適合理論）</Term>が組織論・リーダーシップ論の双方で主流になります。</p>
      <p>組織の側では、<Term>バーンズ &amp; ストーカー</Term>が、安定した環境には規則重視の<Term>機械的組織</Term>が、変化の速い環境には柔軟な<Term>有機的組織</Term>が向くと示しました（1961年）。<Term>ローレンス &amp; ローシュ</Term>は、環境に応じて部門を<Term>分化</Term>させつつ全体を<Term>統合</Term>する必要を論じました（1967年）。<Link href="/management/org/structure">組織構造の型</Link>を「フェーズで選ぶ」という実務の発想は、この系譜の延長にあります。</p>
      <p>リーダーシップの側でも、状況適合型のモデルが並びます。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>提唱・年</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">条件適合理論</td><td>フィードラー / 1967</td><td>リーダーのスタイルは変えにくい。状況の「好意性」に応じて人を配置する</td></tr>
          <tr><td className="hl">パス・ゴール理論</td><td>ハウス / 1971</td><td>リーダーは、部下が目標へ至る道の障害を取り除き報酬を明確にする</td></tr>
          <tr><td className="hl">SL理論</td><td>ハーシー &amp; ブランチャード / 1977</td><td>部下の成熟度に応じ、指示型→説得型→参加型→委任型へ変える</td></tr>
        </tbody>
      </table>
      <p>とりわけ<Term>SL理論</Term>は、相手の成熟度で関わり方を変えるという実務的な指針として今も広く使われています。これは実践編の<Link href="/management/org/structure">アサイン（Will×Can）</Link>や<Link href="/management/org/delegation">権限委譲</Link>の考え方 ― 育ちきっていない相手には手厚く、育った相手には任せる ― と同じ発想です。</p>

      <Heading num="05">変革の時代 ― 変える力とビジョン</Heading>
      <p>1980年代、環境変化が激しくなると、既存の枠内で最適化する<Term>交換型（取引型）リーダーシップ</Term>だけでは足りず、枠そのものを変える力が求められました。<Term>バーンズ</Term>（1978年）と<Term>バス</Term>（1985年）が定式化した<Term>変革型リーダーシップ</Term>は、ビジョンを掲げ、メンバーの<Link href="/management/individual/motivation">内発的動機</Link>に火をつけて変化を起こすスタイルです。</p>
      <p>組織を「変える」方法論も整いました。<Term>レヴィン</Term>の<Term>変革3段階</Term>（解凍 → 変化 → 再凍結）は、まず現状を揺さぶり、動かし、定着させるという古典的な枠組みです。<Term>コッター</Term>の<Term>変革の8段階</Term>（危機感の醸成から成果の定着まで）は、その実践的な手順として<Link href="/management/org">組織開発（OD）</Link>やチェンジマネジメントの中心にあります。</p>
      <Diagram caption="レヴィンの変革3段階 ― 固まった現状を溶かし、動かし、また固める">
        <svg viewBox="0 0 560 96" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={30} width={140} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">解凍</text>
          <text x={90} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">危機感で現状を揺さぶる</text>
          <text x={178} y={57} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <rect x={200} y={30} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={270} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">変化</text>
          <text x={270} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">新しいやり方へ動かす</text>
          <text x={358} y={57} fill="#5f5f5f" fontSize="16" textAnchor="middle">→</text>
          <rect x={380} y={30} width={160} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={460} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">再凍結</text>
          <text x={460} y={66} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">新しい状態を定着させる</text>
        </svg>
      </Diagram>

      <Heading num="06">奉仕と自律 ― 現代のリーダーシップと組織</Heading>
      <p>21世紀の潮流は、リーダーが前に立って引っ張る像から、<Term>支え、任せ、共に担う</Term>像への移行です。源流は<Term>グリーンリーフ</Term>の<Term>サーバントリーダーシップ</Term>（1970年）で、まず奉仕し、メンバーの成長を通じて成果を導く発想です。さらに、自分らしさに根ざす<Term>オーセンティックリーダーシップ</Term>や、役割をチームで分担する<Term>シェアド（分散型）リーダーシップ</Term>へと広がっています。</p>
      <p>組織観も、静的な構造から<Term>文化</Term>と<Term>学習</Term>へと重心を移します。<Term>シャイン</Term>は<Term>組織文化</Term>を「人工物・標榜される価値観・<Term>基本的仮定</Term>」の3層で捉え、目に見える制度の下に無意識の前提があると示しました。<Term>センゲ</Term>の<Term>学習する組織</Term>（1990年）は、変化に自ら適応し続ける組織像を描き、<Term>ティール組織</Term>（ラルー、2014年）は階層に頼らない自律分散の可能性を提示しました。</p>
      <Aside label="収束点">サーバント・自律・学習という現代の答えは、<Link href="/management/individual/motivation">モチベーション理論</Link>が行き着いた「自律・熟達・目的」と同じ方向を指しています。組織論とリーダーシップ論と動機づけ論は、別々に始まって同じ結論へ近づいてきました。</Aside>

      <Heading num="07">実務への落とし込み</Heading>
      <p>歴史は、どのスタイルが「古くて劣る」という話ではありません。<Term>状況に応じて使い分ける引き出し</Term>として持つのが実務的です。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>効きやすいスタイル・考え方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">立ち上げ・危機</td><td>方向を明示する指示型・変革型。まず危機感と旗を掲げる（コッター）</td></tr>
          <tr><td className="hl">育成途上のメンバー</td><td>成熟度に合わせる（SL理論）。手厚く関わり、徐々に任せる</td></tr>
          <tr><td className="hl">熟達したメンバー</td><td>委任型・サーバント型。<Link href="/management/org/delegation">権限委譲</Link>し、支援に回る</td></tr>
          <tr><td className="hl">大きな変化を通す</td><td>解凍→変化→再凍結（レヴィン）。抵抗を織り込み、定着まで見る</td></tr>
          <tr><td className="hl">文化を変えたい</td><td>制度だけでなく「基本的仮定」に働きかける（シャイン）</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        組織とリーダーシップの理論史は、<Term>乗り物の進化</Term>に似ています。かつては決められたレールの上を正確に走る<Term>鉄道</Term>（機械的組織・指示型）が理想でした。やがて道と天候（状況）に応じてハンドルを切る<Term>自動車</Term>（コンティンジェンシー）へ、そして今は、目的地だけ共有すれば各自が自律走行する<Term>船団</Term>（サーバント・自律分散）へ。速く走らせる技術より、どんな地形でも進める柔軟さが問われるようになったのです。
      </Analogy>

      <Heading num="まとめ">機械から自律へ、五つの節目</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>組織観の変遷</h4><p>機械（テイラー・ウェーバー）→ 人間（メイヨー）→ 状況（コンティンジェンシー）→ 文化・学習（シャイン・センゲ）。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リーダーシップの5段階</h4><p>特性 → 行動（PM理論）→ 条件適合（SL理論）→ 変革型 → 奉仕・共有型へと深まってきました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>正解は状況次第</h4><p>新しい理論が古い理論を否定するのではなく、使い分ける引き出しとして重ねていきます。</p></Card>
      </CardGrid>
      <p>個々の理論家の位置づけは<Link href="/management/theory">マネジメント理論家</Link>で俯瞰できます。理論を踏まえたら、次は現場での器づくりと任せ方 ― <Link href="/management/org/structure">組織構造とアサイン</Link>や<Link href="/management/org/delegation">権限委譲</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/org" tag="マネジメント">組織のマネジメント（マクロ）</RelatedLink>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/theory" tag="マネジメント">マネジメント理論家</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
