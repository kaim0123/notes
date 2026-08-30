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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "人事評価",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>人事評価 ― 公正（Justice）をどう実装するか</h1>
        <Lead>
          人事評価の理論的な答えは、実はシンプルです。<Term>すべての人を、その働きぶりに応じて公正に評価する</Term> ― これに尽きます。半世紀以上前に結論は出ています。難しいのは、その<Term>公正（Justice）</Term>をどう現実の制度に落とし込むか。ここは<Link href="/management/individual">個人のマネジメント（ミクロ）</Link>の「評価」を、公正理論の系譜として深掘りするページです。
        </Lead>
      </Hero>

      <Heading num="01">Justice ― 評価の基本原則</Heading>
      <p>人事評価の土台にあるのは<Term>Justice（公正・公平・フェアネス）</Term>です。結論は明快で、全員をその働きぶりに応じて公正に評価する ― それ以外に道はありません。特定の人に色をつけたり下駄を履かせたりすれば、もらえなかった人に不満が残るだけで何の益もなく、不当に低く評価するのは論外です。</p>
      <p>ところが、この当たり前の原則がいまだに実現できていません。理由は、<Term>実装が激烈に難しい</Term>からです。組織での働きぶりは<Term>数値にならない部分</Term>が多い。野球選手のように成績がすべて数字になる職種でさえ、数値に表れない貢献は無数にあります。営業のKPIは測れても、KPIに現れない貢献は山ほどある。さらに、新規事業のように<Term>結果が外部環境に左右される</Term>仕事を、結果だけで評価してよいのかという根本問題もあります。理論はJusticeで決着していても、それを<Term>どう実装するか</Term>こそが勝負どころなのです。この公正は2つの層から成ります。</p>

      <Heading num="02">分配的公正 ― 働きに応じた配分</Heading>
      <p>1950〜60年代に重視されたのが<Term>分配的公正（Distributive Justice）</Term>です。働きに応じて、その人の貢献に見合った評価を配分するという原則で、小学校の通信簿や人事評価シートに息づいています。これを実現するポイントは3つです。</p>
      <table>
        <thead>
          <tr><th>ポイント</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">評価事項の設定</td><td>会社の理念に照らして、正しい評価軸を定める</td></tr>
          <tr><td className="hl">曖昧なつけ方をしない</td><td>上司の気分ではなく、誰がやっても同じになる客観基準をつくる</td></tr>
          <tr><td className="hl">評価者を正しく設定</td><td>直属の上司だけでなく、複数人の目線で評価し偏りを防ぐ</td></tr>
        </tbody>
      </table>
      <p>とりわけ第一の<Term>評価事項の設定</Term>は決定的です。<Term>売上で評価するか、利益で評価するか</Term>で、評価される側の行動はまったく変わります。売上重視なら高単価品を売る方向へ、利益重視なら原価の低いものを売る方向へと人は動く。だからこそ、何を測るかを理念から逆算して定めることが出発点になります。何を目標として置くかという観点は、<Link href="/management/team/goals">実践編：目標設定</Link>とも地続きです。</p>

      <Heading num="03">手続き的公正 ― プロセスの公正さ</Heading>
      <p>しかし、分配的公正だけでは不満は消えませんでした。<Term>ルールが上から降ってきて、なぜこの基準なのかが分からない</Term>と、人は納得できないからです。そこで1970年代に登場したのが<Term>手続き的公正（Procedural Justice）</Term>です。評価の<Term>結果</Term>だけでなく、評価の<Term>手続き・プロセスそのもの</Term>が公正であることを求めます。これを実現するポイントは6つあります。</p>
      <table>
        <thead>
          <tr><th>ポイント</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一貫性</td><td>理念・ビジョンに照らして一貫した制度にする。妙な例外を入れない</td></tr>
          <tr><td className="hl">偏見の排除</td><td>いろいろな部門・立場の人が制度づくりと監査に参加する</td></tr>
          <tr><td className="hl">正確な情報</td><td>データをしっかり収集・活用する仕組みを整える</td></tr>
          <tr><td className="hl">修正可能性</td><td>制度も個別の評価結果も、改善・是正の余地を残す</td></tr>
          <tr><td className="hl">代表制</td><td>評価される側の代表者が制度設計に参加する</td></tr>
          <tr><td className="hl">倫理性</td><td>一般的な社会通念・道徳に照らして正しい仕組みである</td></tr>
        </tbody>
      </table>
      <p><Term>分配的公正と手続き的公正の二層</Term>が組み合わさって、はじめて人事評価は健全に機能します。この「配分の公正さ」と「手続きの公正さ」への感度は、人が自分の貢献と報酬を他者と比べて納得を測る<Link href="/management/individual/motivation">アダムスの公平理論</Link>とまっすぐつながっています。評価が納得感を欠けば、意欲そのものが下がるのです。</p>

      <Heading num="04">Exit &amp; Voice ― 評価される側の姿勢</Heading>
      <p>制度をどれだけ精緻に設計しても、「なぜ自分がこの評価なのか」と納得できない場面は必ず生じます。<Term>仕組みは完璧にはなりえない</Term>からです。そのとき、評価される側はどうすべきか。ここで手がかりになるのが<Term>Exit &amp; Voice</Term>という概念です。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Exit（退出）</td><td>不満があればその場を去る。多くの人が抜ければ組織は持たない ― 組織への牽制力として働く</td></tr>
          <tr><td className="hl">Voice（発言）</td><td>「これはおかしい」「こう変えるべきだ」と発言し行動する。組織を内側から改善する</td></tr>
        </tbody>
      </table>
      <p>仕組みに一方的に従属するのではなく、<Term>ExitかVoiceか</Term>という能動的な意思表示を持つことで、個人は組織と対等な関係を築けます。大切なのは、<Term>仕組みに潰される弱い個人</Term>にならないこと。評価する側は分配的・手続き的公正を最大限に追求して制度を整え、評価される側はExitとVoiceを駆使して制度に能動的に関わる。</p>
      <Aside label="評価の本質">人事評価とは、組織が個人を一方的に格付けする儀式ではありません。<Term>組織と個人が対等な対話を通じて、互いの貢献と期待を確認するプロセス</Term>です。強い個人と強い組織が手を取り合うとき、組織は健全に発展します。</Aside>

      <Analogy label="💡 たとえるなら">
        人事評価は<Term>スポーツの審判</Term>に似ています。良い審判とは、勝敗そのものを操る人ではなく、<Term>誰が見ても同じ判定になるルール</Term>（分配的公正）を、<Term>透明で一貫した手順</Term>（手続き的公正）で適用する人です。そして選手の側も、判定に異議があればアピールし（Voice）、どうしても不公正なリーグなら移籍する（Exit）権利を持つ。審判と選手が互いに緊張感を持つからこそ、試合はフェアに保たれます。
      </Analogy>

      <Heading num="まとめ">公正を実装する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Justice が原則</h4><p>働きに応じ公正に。結論は半世紀前に出ている。難しいのは実装。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>2層の公正</h4><p>分配的公正（配分の妥当さ）と手続き的公正（プロセスの透明さ）を組み合わせる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Exit &amp; Voice</h4><p>評価される側も能動的に。強い個人と強い組織が手を取り合う。</p></Card>
      </CardGrid>
      <p>評価の「公正」を押さえたら、そもそも何を目標として置くか ― <Link href="/management/team/goals">実践編：目標設定</Link>や、評価の材料となる能力の内訳<Link href="/management/individual/capital">個人の力の3つの源泉</Link>もあわせてどうぞ。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/individual" tag="マネジメント">個人のマネジメント（ミクロ）</RelatedLink>
                    <RelatedLink href="/management/individual/capital" tag="マネジメント">個人の力の3つの源泉</RelatedLink>
                    <RelatedLink href="/management/team/goals" tag="マネジメント">実践編 ― 目標設定</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
