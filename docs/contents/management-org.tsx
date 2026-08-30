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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "組織のマネジメント（マクロ）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>組織のマネジメント（マクロ） ― 仕組みで動かす</h1>
        <Lead>
          チームを超えて組織全体を対象にするのが<Term>マクロマネジメント</Term>です。ここでは個別の関わりではなく、多くの人を同じ方向に動かす<Term>仕組み</Term> ― 組織構造・人事制度・人材戦略・文化・組織開発 ― を設計します。日々のマネジメントが「運転」なら、こちらは「道路と信号を敷く」仕事です。
        </Lead>
      </Hero>

      <Heading num="01">組織設計 ― 構造が行動を決める</Heading>
      <p><Term>組織設計</Term>は、誰が何に責任を持ち、どこで意思決定するかを定める骨格づくりです。構造が変われば、そこで働く人の行動も変わります。中心的な論点は次の通りです。</p>
      <table>
        <thead>
          <tr><th>論点</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">組織構造</td><td>機能別・事業部制・マトリクスなど、部門をどう括るか</td></tr>
          <tr><td className="hl">権限委譲</td><td>意思決定の権限をどこまで現場に渡すか</td></tr>
          <tr><td className="hl">職務設計</td><td>一つひとつの仕事の範囲と責任をどう区切るか</td></tr>
        </tbody>
      </table>
      <p>人材の捉え方には2つの型があります。<Term>ジョブ型</Term>は「職務（ジョブ）に人を割り当てる」考え方で、仕事の内容と要件が先に定義されます。対する<Term>メンバーシップ型</Term>は「人を採用してから仕事を割り当てる」日本的な考え方で、異動やローテーションを前提とします。近年はジョブ型への移行が進みますが、どちらが優れているかではなく、事業と組織のフェーズに合うかが問われます。実際のチーム構造の選び方は<Link href="/management/org/structure">実践編：組織構造とアサイン</Link>で具体的に扱います。</p>

      <Heading num="02">人事制度 ― 等級・評価・報酬の三点セット</Heading>
      <p><Term>人事制度</Term>の中核は、<Term>等級・評価・報酬</Term>の3つが噛み合った設計です。この3つは独立に決めるものではなく、一貫した論理でつながっている必要があります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>等級制度</h4><p>職務・役割・能力などの基準で社員を格付けし、期待水準を定める。制度全体の背骨になります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>評価制度</h4><p>各等級に期待される成果・行動を、どう測り処遇に反映するかを定めます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>報酬制度</h4><p>等級と評価の結果を、給与・賞与としてどう配分するかを定めます。</p></Card>
      </CardGrid>
      <p>この土台の上に<Term>昇進・昇格</Term>のルールが乗ります。「どうすれば上の等級に上がれるか」が明確であることは、メンバーの納得感と成長意欲を大きく左右します。等級の定義は、現場の目標設定で「この等級ならここまでが妥当な難易度」という合意の基準としても機能します。等級・評価・報酬の3つがどう噛み合うか、その設計の中身は<Link href="/management/org/system">人事制度</Link>で詳しく扱います。</p>

      <Heading num="03">人材戦略 ― 必要な人を、必要なときに</Heading>
      <p><Term>人材戦略</Term>は、事業計画の実現に必要な人材を、質・量・タイミングの面から確保・配置する計画です。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">要員計画</td><td>いつ・どの職種が・何人必要かを事業計画から逆算する</td></tr>
          <tr><td className="hl">タレントマネジメント</td><td>社員のスキル・志向を可視化し、適所に配置・育成する</td></tr>
          <tr><td className="hl">後継者育成</td><td>重要ポジションの後継者を計画的に育てる（サクセッションプラン）</td></tr>
          <tr><td className="hl">ハイポテンシャル人材</td><td>将来の幹部候補を早期に見極め、重点的に育成する</td></tr>
        </tbody>
      </table>
      <p>とりわけ重要ポジションの<Term>後継者育成</Term>は、放置すると「その人がいなくなったら回らない」という組織の脆さに直結します。誰を、いつまでに、どのポジションへ育てるか ― この視点は現場の<Link href="/management/individual/onboarding">育成計画</Link>とも地続きです。</p>

      <Heading num="04">組織文化 ― 見えない行動規範</Heading>
      <p><Term>組織文化</Term>は、「この組織では何が当たり前とされるか」という、明文化されない共有された前提です。制度が「ルール」なら、文化は「空気」です。両者が食い違うと、制度は形骸化します。</p>
      <p>文化の言語化された拠り所が<Term>MVV（ミッション・ビジョン・バリュー）</Term>です。ミッションは存在意義、ビジョンは目指す姿、バリューは大切にする価値観を表します。加えて、日々の空気としての<Term>組織風土</Term>、多様な人材が力を発揮できる状態を目指す<Term>DE&amp;I（多様性・公平性・包摂）</Term>も、現代の組織文化の重要テーマです。<Link href="/management/individual">エンゲージメント</Link>は、この文化の健全さを映す指標でもあります。</p>

      <Heading num="05">組織開発（OD） ― 組織そのものを変える</Heading>
      <p><Term>組織開発（OD：Organization Development）</Term>は、個人ではなく「組織そのもの」を対象に、その健全性と機能を高める働きかけです。個人の能力向上（人材開発）と対をなす概念です。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">組織診断</td><td>サーベイや対話で組織の現状・課題を可視化する</td></tr>
          <tr><td className="hl">サーベイ</td><td>エンゲージメント調査などで定点観測し、変化を追う</td></tr>
          <tr><td className="hl">組織変革</td><td>診断結果をもとに、構造・制度・関係性に手を入れる</td></tr>
          <tr><td className="hl">チェンジマネジメント</td><td>変革に伴う抵抗を和らげ、定着まで導く進め方</td></tr>
        </tbody>
      </table>
      <p>変革は「正しい打ち手を決める」だけでは進みません。人は変化に抵抗するものだからです。<Term>チェンジマネジメント</Term>は、なぜ変えるのかを共有し、小さな成功を積み、抵抗と向き合いながら新しいやり方を根づかせる ― という地道な過程を扱います。この「勢いをつくる」視点は<Link href="/management/team/momentum">実践編：モメンタム</Link>とも響き合います。レヴィンの変革3段階やコッターの8段階といった理論的な背景は<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        組織のマネジメントは<Term>都市計画</Term>に似ています。一軒一軒の家（個人）やご近所づきあい（チーム）とは別に、道路・上下水道・区画といったインフラを設計する仕事です。よくできた都市計画は、住民が意識しなくても暮らしを支えます。逆に設計が悪ければ、どんなに良い住民が集まっても渋滞と不便が生まれます。
      </Analogy>

      <Heading num="まとめ">組織マネジメントの5要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>組織設計</h4><p>構造が行動を決める。ジョブ型／メンバーシップ型を使い分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>人事制度</h4><p>等級・評価・報酬が一貫した論理でつながる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>人材戦略</h4><p>必要な人を、必要なときに。後継者育成が組織の強さを支える。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>組織文化</h4><p>制度は空気とセット。MVVとDE&amp;Iが拠り所になる。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>組織開発</h4><p>組織そのものを診断し、抵抗と向き合いながら変える。</p></Card>
      </CardGrid>
      <p>組織の内部設計を押さえたら、最後は視野を組織の外へ広げます。<Link href="/management/context">経営・社会とのつながり</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/context" tag="マネジメント">経営・社会とのつながり</RelatedLink>
                    <RelatedLink href="/management/org/structure" tag="マネジメント">実践編 ― 組織構造とアサイン</RelatedLink>
                    <RelatedLink href="/management/org/delegation" tag="マネジメント">実践編 ― 権限委譲</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
