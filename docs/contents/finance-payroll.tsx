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
  title: "粗利益で人件費・給与を設計する",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>粗利益で人件費・給与を設計する ― 給料を数字で決める</h1>
        <Lead>
          給料は「なんとなく」でなく、<Term>数字の根拠</Term>で決められます。カギになるのは売上ではなく<Term>粗利益（売上総利益）</Term>。1人当たりの粗利益から、目標売上・適正な人件費・給与・賞与まですべて逆算できます。この章は経営者の視点で書いていますが、「自分は今の給料に見合う粗利益を稼げているか」を測る物差しは、働く側にとっても強力な自己分析ツールになります。
        </Lead>
      </Hero>

      <Heading num="01">損益分岐点と「従業員数 × 1,000万円」</Heading>
      <p><Term>損益分岐点売上高</Term>とは、利益がちょうど0円になる売上高 ― つまり<Term>粗利益が固定費と等しくなる売上</Term>のことです。式はシンプルで、固定費を粗利益率で割り戻します。</p>
      <Aside label="📎 損益分岐点売上高 ＝">
        固定費 ÷ 粗利益率。粗利益率が低い業種ほど、同じ固定費でも必要な売上が跳ね上がる。
      </Aside>
      <p>同じ固定費・同じ人数でも、業種（粗利益率）によって必要な売上はまるで変わります。固定費1億円・10人の会社で比べてみます。業種別の目安は<Link href="/finance/industry-cost">業界別の原価率・キャッシュ・支払い</Link>も参照してください。</p>
      <table>
        <thead>
          <tr><th>業種</th><th>原価率</th><th>粗利益率</th><th>損益分岐点売上（全体）</th><th>1人当たり</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">動画制作・コンサル</td><td>0%</td><td>100%</td><td>1億円</td><td>1,000万円</td></tr>
          <tr><td className="hl">飲食店</td><td>30%</td><td>70%</td><td>約1億4,286万円</td><td>約1,428万円</td></tr>
          <tr><td className="hl">卸売業</td><td>90%</td><td>10%</td><td>10億円</td><td>1億円</td></tr>
        </tbody>
      </table>
      <p>人数が絡むと、さらに逆説的なことが起きます。卸売業で人件費5,000万→4,000万・10人→8人にすると、全体の損益分岐点は10億→9億に下がりますが、<Term>1人当たりは1億→1億1,250万に上がる</Term>（人数が減ると1人当たりは上がる）。業種別の原価率・外注・固定費・人数が絡んで実務では扱いにくいので、まずは覚えやすい目安を持ちます。</p>
      <Analogy label="💡 覚えるべき目安">
        年間売上 ＝ <Term>従業員数 × 1,000万円</Term>を目指す。8人なら8,000万、10人なら1億。より精緻には自社の粗利益率で割り戻して目標売上を出しますが、まずはこのシンプルな基準で十分。損益分岐点（粗利益で固定費を割り戻す）という概念だけは理解しておきましょう。
      </Analogy>

      <Heading num="02">1人当たり粗利益 ― 月80万＝年1,000万の根拠</Heading>
      <p>「1人当たり年間粗利益1,000万円（＝月80万円）」は、経営の現場で長く使われてきた<Term>魔法の数字</Term>です。これを稼げて初めて経営者、ここから社員を幸せにする経営が始まる、と言われます。なぜこれが「最低ライン」なのか、売上1億円・粗利益率60%の店の例で見ます。</p>
      <ul>
        <li>粗利益6,000万 ÷ 1,000万＝<Term>最大6人</Term>で経営すべき（5人なら余裕、7人だと基準割れ）。</li>
        <li>6人・粗利益6,000万でも、労働分配率45%だと1人当たり給与は<Term>333万円</Term>しか出ない。</li>
        <li>2025年の日本人平均年収は<Term>478万円</Term> → 333万では世間相場に届かない。</li>
        <li>平均年収478万円を払うには、1人当たり粗利益<Term>1,434万円</Term>（6人なら約8,600万円）が必要。</li>
      </ul>
      <p>だから1,000万円は「最低」ライン。90万・100万・150万と月次の1人当たり粗利益を上げれば、給料も比例して増え、社員も幸せになります。</p>
      <Aside label="📎 なぜ売上でなく粗利益ベースか">
        売上1億でも原価率が高ければ粗利益は少なく、売上だけでは給与の適正を判断できない。粗利益ベースなら業種に関係なく同じ基準が使える。
      </Aside>
      <Analogy label="⚠️ 採用の鉄則">
        1人当たり粗利益が80万円を切っているのに「現場が忙しい」と人を増やしてはいけない。人数だけ増えて1人当たり給料が下がり、誰も幸せになりません。まず生産性（1人当たり粗利益）を上げるのが先決。なお人数の数え方は、役員も含め、パート・アルバイトは勤務時間で按分します（例：パート3人＝正社員1人）。
      </Analogy>

      <Heading num="03">労働分配率と経常利益の適正ライン</Heading>
      <p>人件費は「給与」だけではありません。適正を測る指標が<Term>労働分配率</Term>です。</p>
      <table>
        <thead>
          <tr><th>人件費に含める</th><th>含めない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">給与</td><td rowSpan={3}>地代家賃・広告費・水道光熱費など、その他の固定費</td></tr>
          <tr><td className="hl">法定福利費（社会保険の会社負担分。給与の約15%）</td></tr>
          <tr><td className="hl">福利厚生費（通勤手当・賄い・制服・健康診断など）</td></tr>
        </tbody>
      </table>
      <Aside label="📎 労働分配率 ＝">
        人件費 ÷ 粗利益。例：給与2,000万＋法定福利費300万＋福利厚生費400万＝人件費2,700万 ÷ 粗利益6,000万＝45%。
      </Aside>
      <table>
        <thead>
          <tr><th>労働分配率</th><th>意味</th><th>対応</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">40%以下</td><td>人件費比率が低い</td><td>給料を上げてもよい</td></tr>
          <tr><td className="hl">45%前後</td><td>適正</td><td>この範囲を目指す</td></tr>
          <tr><td className="hl">50%超</td><td>人件費比率が高い</td><td>会社が苦しくなる。見直し</td></tr>
        </tbody>
      </table>
      <p>給与単体は粗利益の<Term>約1/3（33%）</Term>が目安。そこに法定福利費・福利厚生費を足すと45%前後になります。別の言い方をすれば「<Term>自分の給料の3倍の粗利益を稼げ</Term>」。中小企業は50%超が多く、60%以上も珍しくありません。もっと給料を上げたいなら、人件費以外の固定費（地代・広告費）を徹底削減するしかありません。</p>
      <p>利益の側にも目安があります。<Term>経常利益（目標）＝粗利益の10〜20%</Term>。固定費 ＝ 粗利益 − 経常利益なので、固定費は粗利益の80〜90%以内に抑えます。20%超と出すぎたら、決算賞与で社員に還元することを検討します（例：6人で600万還元＝1人約100万上乗せ）。</p>

      <Heading num="04">赤字社員・黒字社員の判定 ― 給料の3倍ルール</Heading>
      <p>基本ルールは明快です。<Term>その人の年間給料の3倍以上の粗利益を生み出せなければ「赤字社員」</Term>。3倍はあくまで最低ラインで、本来は4〜5倍の生産性が望ましい水準です。</p>
      <table>
        <thead>
          <tr><th>希望年収</th><th>必要な年間粗利益（3倍）</th><th>備考</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">300万円</td><td>900万円</td><td>3倍は最低ライン</td></tr>
          <tr><td className="hl">500万円</td><td>1,500万円</td><td>望ましくは4〜5倍</td></tr>
          <tr><td className="hl">1,000万円</td><td>3,000万円</td><td></td></tr>
          <tr><td className="hl">1,500万円</td><td>4,500万円</td><td></td></tr>
        </tbody>
      </table>
      <p>逆算すれば、年間粗利益900万しか出せないなら給料の上限は300万。ここで粗利益とは売上−原価で、人件費はまだ引きません。ではなぜ「3倍」なのか。粗利益1,000万の配分イメージを見ると腑に落ちます。</p>
      <Diagram caption="給与で粗利益の1/3を取ると、社会保険等を足した時点で人件費が粗利益の約半分を占める">
        <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
          <text x={300} y={20} fill="#9a9a9a" fontSize="11" textAnchor="middle">粗利益 1,000万円 の配分</text>
          <rect x={30} y={40} width={180} height={44} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={120} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">給与 300万</text>
          <text x={120} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">30%</text>
          <rect x={220} y={40} width={110} height={44} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={275} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">社保等 150万</text>
          <text x={275} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">約15%</text>
          <rect x={340} y={40} width={150} height={44} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={415} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">その他固定費 450万</text>
          <text x={415} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">約45%</text>
          <rect x={500} y={40} width={70} height={44} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={535} y={60} fill="#f2f2f2" fontSize="11" textAnchor="middle">利益 100万</text>
          <text x={535} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">約10%</text>
          <line x1={30} y1={98} x2={330} y2={98} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={180} y={116} fill="#39ff6a" fontSize="11" textAnchor="middle">人件費合計 約450万＝労働分配率 約45%</text>
        </svg>
      </Diagram>
      <p>給与だけで粗利益の1/3を取ると、社会保険等を足した時点で粗利益の半分近くを人件費が占めます。だから「給料の3倍」が、赤字社員を避ける最低基準になるのです。</p>
      <Aside label="📎 チームで粗利益を分配する">
        1人で完結しない仕事では、関与者全員で粗利益を分ける。例：取引先から年間報酬300万（原価ほぼ0）を、担当チーム3〜4人で1/3（100万）を給与プールとして貢献度に応じ配分する。
      </Aside>

      <Heading num="05">給与決定の実務 ― 決算賞与と役員会議（経営者の視点）</Heading>
      <p>ここからは経営者が実際にどう給与を運用するかの実務です。時代は年功序列・学歴重視から成果主義へ移り、採用競争上、前職給与の保証やアップが一般的になりました。そのうえで、次のようなプロセスで運用する経営者がいます。</p>
      <table>
        <thead>
          <tr><th>ステップ</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 月次の基本給</td><td>前年の生産性・仕事内容で設定。労働分配率を40〜45%以内に抑え、基本給は低めにする</td></tr>
          <tr><td className="hl">② 決算賞与で還元</td><td>出すぎた利益を決算賞与で社員に還元し、最終の経常利益を目標額に落とす。余れば繰り延べ</td></tr>
          <tr><td className="hl">③ 賞与額は役員会議で決定</td><td>固定の人事評価制度は使わず、役員が各自「妥当額」を理由付きでプレゼン、最終決定は社長</td></tr>
          <tr><td className="hl">④ 月次1on1</td><td>面接時の目標と会社のプランを毎月確認し、認識のズレを早期修正</td></tr>
          <tr><td className="hl">⑤ 試用期間6ヶ月</td><td>半年見れば実力がわかる</td></tr>
        </tbody>
      </table>
      <p>具体例では、月給55万×12＝660万の社員について、役員会で年収900万と決めたら差額<Term>240万を決算賞与</Term>で支給します。基本給を据え置き決算賞与で年収を合わせるので、残業で膨らんでも最終年収は事前に決まっている ―「残業で得しない」仕組みになります。</p>
      <p>なぜ固定の評価制度を使わないのか。中小企業は社内の仕組みが年々変わり、作った評価制度もすぐ陳腐化してうまくいく事例が少ないから、という理由です。決算賞与には実務上のうまみもあります。</p>
      <table>
        <thead>
          <tr><th>ポイント</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">財源</td><td>事業計画の最終利益を超えた「出すぎた利益」</td></tr>
          <tr><td className="hl">決算書表示</td><td>特別損失「決算賞与」として経常利益の下に計上 → 銀行は経常利益で評価</td></tr>
          <tr><td className="hl">通常賞与との違い</td><td>夏冬賞与は販管費で経常利益を下げるが、決算賞与なら経常利益を維持したまま還元できる</td></tr>
        </tbody>
      </table>
      <p>決算賞与が<Link href="/finance/pl">損益計算書（PL）</Link>の特別損失に載り、銀行が重視する経常利益を維持できる ― という点は、PLの5つの利益を理解しているとスッと繋がります。働く側は、面接で希望年収を明確に伝えることが大切です（言わないと低めに設計される）。</p>

      <Heading num="06">給与 vs 賞与と社会保険の最適化（発展）</Heading>
      <p>同じ年収でも、月給で多くもらうか、月給を抑えて賞与で還元するかで、手取り・将来年金が変わります。本質は「<Term>手取りを増やす＝社会保険料を減らす</Term>」こと。ポイントは、月給側も賞与側も社会保険料に<Term>上限（頭打ち）</Term>がある点です。</p>
      <table>
        <thead>
          <tr><th>区分</th><th>社会保険料の上限</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">月給側</td><td>等級表で決まり上限あり（健保：月給135.5万以上／厚年：月給63.5万以上で最高等級）</td></tr>
          <tr><td className="hl">賞与側</td><td>額に料率を直接かけるが上限あり（健保：年573万まで／厚年：1回150万まで）</td></tr>
        </tbody>
      </table>
      <p>賞与に上限があるため、月給を下げて賞与に振り替えると、上限を超えた分には保険料がかからず<Term>手取りが増える</Term>傾向があります。極端な例（月給20万＋賞与1,600万）では、月給153万ケースより手取りが年約85万円多くなる一方、拠出が減るぶん<Term>将来の厚生年金は減ります</Term>。</p>
      <Aside label="📎 判断の前提">
        健康保険は将来の年金に一切関係しない（年金に反映されるのは厚生年金の拠出額のみ）。公的年金の縮小・受給開始年齢引き上げを見込むなら、手取りで増えた分を自分で運用する方が老後資金は増える、という考え方もある。ただし賞与は上限に達すると追加メリットが薄く、年金とのトレードオフになる点に注意。
      </Aside>

      <Heading num="まとめ">数値クイックリファレンス</Heading>
      <table>
        <thead>
          <tr><th>指標</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">目標売上</td><td>従業員数 × 1,000万円</td></tr>
          <tr><td className="hl">1人当たり年間粗利益</td><td>最低1,000万円（＝月80万）。世間相場給与には1,434万円必要</td></tr>
          <tr><td className="hl">労働分配率（人件費÷粗利益）</td><td>40〜50%、目安45%前後</td></tr>
          <tr><td className="hl">給与単体</td><td>粗利益の約1/3（＝給料の3倍の粗利益）</td></tr>
          <tr><td className="hl">法定福利費</td><td>給与の約15%（会社負担分）</td></tr>
          <tr><td className="hl">経常利益</td><td>粗利益の10〜20%</td></tr>
          <tr><td className="hl">赤字社員の判定</td><td>年間給料の3倍の粗利益を出せなければ赤字</td></tr>
          <tr><td className="hl">賞与の社会保険上限</td><td>健保：年573万まで／厚年：1回150万まで</td></tr>
        </tbody>
      </table>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>粗利益で考える</h4><p>売上でなく粗利益を起点にすれば、業種に関係なく給与の適正を判断できます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>1人1,000万が最低ライン</h4><p>1人当たり粗利益1,000万円が経営の最低ライン。世間相場を払うには1,434万円必要です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>給料の3倍ルール</h4><p>年間給料の3倍の粗利益を出せなければ赤字社員。労働分配率45%前後を狙います。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>利益は還元する</h4><p>経常利益は粗利益の10〜20%。出すぎたら決算賞与で社員に還元する選択肢があります。</p></Card>
      </CardGrid>
      <p>ここで扱った「粗利益・労働分配率・現金で会社を回す」感覚は、次の<Link href="/finance/cash">現金がすべて</Link>や<Link href="/finance/ratios">指標に惑わされない</Link>と地続きです。人の評価・育成の側面は<Link href="/management/individual/evaluation">マネジメントの人事評価</Link>とあわせて読むと立体的になります。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/industry-cost" tag="会計・財務">業界別の原価率・キャッシュ・支払い</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                    <RelatedLink href="/finance/ratios" tag="会計・財務">指標に惑わされない</RelatedLink>
                    <RelatedLink href="/finance/pl" tag="会計・財務">損益計算書（PL）― 5つの利益</RelatedLink>
                    <RelatedLink href="/finance/cost" tag="会計・財務">固定費・変動費・限界利益</RelatedLink>
                    <RelatedLink href="/management/individual/evaluation" tag="マネジメント">人事評価</RelatedLink>
                    <RelatedLink href="/finance" tag="会計・財務">会計・財務の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
