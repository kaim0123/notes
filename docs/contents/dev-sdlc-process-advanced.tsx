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
  title: "プロセス成熟度（発展）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>プロセス成熟度 ― 開発の質を組織で高める（発展）</h1>
        <Lead>
          このページは<Term>発展トピック</Term>です。初学者はまず<Link href="/dev/sdlc/process">開発プロセスと手法</Link>までを固め、後回しにして構いません。ここでは、個々のプロジェクトを超えて「開発のやり方そのものを標準化し、質を測って改善する」ための枠組みを概観します。厳密さを追う<Term>形式手法</Term>、工程を共通言語化する<Term>SLCP</Term>、組織の成熟度を測る<Term>CMMI</Term>が主役です。
        </Lead>
      </Hero>

      <Heading num="01">形式手法 ― 数学で仕様の正しさを保証する</Heading>
      <p><Term>形式手法</Term>は、仕様や設計を数学的な記法で厳密に記述し、その正しさを論理的に検証しようとするアプローチです。テストが「いくつかの入力で確かめる」のに対し、形式手法は「仕様が満たすべき性質を証明する」ことを目指します。高い信頼性が要求される領域（航空・鉄道・医療など）で使われますが、コストが大きく適用範囲は限られます。</p>

      <Heading num="02">SLCP ― 開発の工程を共通言語にする</Heading>
      <p><Term>SLCP</Term>（ソフトウェアライフサイクルプロセス）は、企画から要件定義・開発・運用・保守・廃棄までの工程と作業内容を、発注側と受注側が同じ言葉で語れるように標準化した枠組みです。国際規格 <Term>JIS X 0160</Term> として定められ、取引の範囲や責任の所在を明確にする「共通の物差し」として使われます。</p>

      <Analogy label="💡 たとえるなら">
        SLCPは「工事の標準工程表」に似ています。施主と工務店が「基礎工事はどこまで、内装はどこから」を同じ用語で確認できれば、見積りも責任分界もぶれません。開発でも、工程の呼び名と範囲を共通化しておくことで、発注・受注のすれ違いを防げます。
      </Analogy>

      <Heading num="03">プロセス成熟度とCMMI ― 開発の実力を段階で測る</Heading>
      <p><Term>プロセス成熟度</Term>とは、組織の開発プロセスがどれだけ確立され、管理・改善されているかの度合いです。これを段階で評価するモデルが<Term>CMMI</Term>で、場当たり的な段階から、定義・管理され、定量的に制御され、継続的に最適化される段階まで、成熟度をレベルで表します。自組織の現在地を知り、次に何を改善すべきかの指針にします。</p>

      <Heading num="04">ソフトウェアプロダクトライン ― 再利用で製品群を効率化する</Heading>
      <p><Term>ソフトウェアプロダクトライン</Term>は、共通部分（コア資産）を作り込んで再利用し、差分だけを作り分けることで、似た製品群を効率よく開発する考え方です。1つずつ作るのではなく「製品の一族」をまとめて設計する発想で、派生製品の多い分野で効果を発揮します。</p>

      <Heading num="まとめ">プロセス成熟度で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>厳密さを追う形式手法</h4><p>仕様を数学的に検証する。信頼性が最優先の領域で使われる発展手法です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>工程を共通言語化するSLCP</h4><p>JIS X 0160として、取引の範囲と責任を明確にする物差しです。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>実力を測るCMMI</h4><p>プロセス成熟度を段階で評価し、改善の指針にします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/process" tag="開発工程">開発プロセスと手法</RelatedLink>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                    <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
