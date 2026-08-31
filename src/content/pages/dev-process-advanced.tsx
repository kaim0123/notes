import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "プロセス成熟度" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>プロセス成熟度 ― 開発の質を組織で高める</h1>
        <Lead>
          ここは発展的な内容です。まず<Link href="/dev/process">開発プロセス</Link>を固めてから読んで構いません。個々のプロジェクトを超えて「開発のやり方そのものを標準化し、質を測って改善する」ための枠組みを概観します。厳密さを追う<Term>形式手法</Term>、工程を共通言語化する<Term>SLCP</Term>、組織の成熟度を測る<Term>CMMI</Term>が主役です。
        </Lead>
      </Hero>

      <Heading num="01">形式手法 ― 数学で仕様の正しさを保証する</Heading>
      <p>
        <Term>形式手法</Term>は、仕様や設計を数学的な記法で厳密に記述し、その正しさを論理的に検証しようとするアプローチです。テストが「いくつかの入力で確かめる」のに対し、形式手法は<Term>仕様が満たすべき性質を証明する</Term>ことを目指します。高い信頼性が要求される領域(航空・鉄道・医療など)で使われますが、コストが大きく適用範囲は限られます。
      </p>
      <p>
        考え方の土台は<Link href="/theory/formal">形式言語</Link>や<Link href="/theory/logic">論理</Link>にあり、<Link href="/design/methodology-contract">契約による設計</Link>は、その一部を日常の設計に持ち込んだものと見ることもできます。
      </p>

      <Heading num="02">SLCP ― 開発の工程を共通言語にする</Heading>
      <p>
        <Term>SLCP(ソフトウェアライフサイクルプロセス)</Term>は、企画から要件定義・開発・運用・保守・廃棄までの工程と作業内容を、発注側と受注側が同じ言葉で語れるように標準化した枠組みです。規格として定められ、取引の範囲や責任の所在を明確にする「共通の物差し」として使われます。
      </p>

      <Analogy label="💡 たとえるなら">
        SLCPは工事の標準工程表に似ています。施主と工務店が「基礎工事はどこまで、内装はどこから」を同じ用語で確認できれば、見積りも責任分界もぶれません。開発でも、工程の呼び名と範囲を共通化しておくことで、発注と受注のすれ違いを防げます。
      </Analogy>

      <Heading num="03">CMMI ― 開発の実力を段階で測る</Heading>
      <p>
        <Term>プロセス成熟度</Term>とは、組織の開発プロセスがどれだけ確立され、管理・改善されているかの度合いです。これを段階で評価するモデルが<Term>CMMI</Term>で、自組織の現在地を知り、次に何を改善すべきかの指針にします。
      </p>

      <DiagramFrame
        slug="dev-process-cmmi"
        aspect="640 / 280"
        caption="組織のプロセス成熟度の5段階。1の初期は進め方が個人任せで場当たり的、2の管理された段階はプロジェクト単位で計画と進捗を管理でき、3の定義された段階は組織として標準の進め方がある。4の定量的に管理された段階では工数や欠陥率を数値で把握してばらつきを制御し、5の最適化している段階ではデータをもとにプロセス自体を改善し続ける。下の段が固まっていないのに上の段だけ真似ても機能しない。"
      />

      <Aside label="レベルを目的にしない">
        成熟度は<Term>現在地を測る物差し</Term>であって、上げること自体が目的ではありません。レベルの取得だけを目標にすると、実態の伴わない文書が増え、かえって開発が遅くなります。「同じ成功を再現できるか」「数値で語れるか」という中身のほうを見ます。
      </Aside>

      <Heading num="04">ソフトウェアプロダクトライン ― 再利用で製品群を効率化する</Heading>
      <p>
        <Term>ソフトウェアプロダクトライン</Term>は、共通部分(コア資産)を作り込んで再利用し、差分だけを作り分けることで、似た製品群を効率よく開発する考え方です。1つずつ作るのではなく「製品の一族」をまとめて設計する発想で、派生製品の多い分野で効果を発揮します。共通部分と可変部分を見極める作業そのものは、<Link href="/design/principles-cohesion">凝集度と結合度</Link>の判断と同じものです。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>厳密さを追う形式手法</h4>
          <p>
            仕様を数学的に検証します。信頼性が最優先の領域で使われる発展手法です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>工程を共通言語化するSLCP</h4>
          <p>取引の範囲と責任を明確にするための、共通の物差しです。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>実力を測るCMMI</h4>
          <p>
            成熟度を段階で評価し、改善の指針にします。レベル自体を目的にしません。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/process-advanced" />
    </DocsPage>
  );
}
