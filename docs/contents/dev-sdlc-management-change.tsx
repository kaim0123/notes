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
  title: "変更管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>変更管理 ― 変更を勝手に入れさせない</h1>
        <Lead>
          稼働中のシステムや進行中の開発に変更を加えるとき、思いつきで手を入れると、影響が読めないまま別の場所が壊れます。<Term>変更管理</Term>は、変更の要求を受け付け、影響を評価し、承認してから反映するという手順を定め、システムの一貫性を保つ仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">変更管理の目的と手順</Heading>
      <p>変更管理の狙いは、変更を止めることではなく、変更を「管理された形」で通すことです。典型的な手順は次の流れをたどります。</p>
      <table>
        <thead>
          <tr><th>手順</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">変更要求</td><td>変更の内容と理由を記録して申請する</td></tr>
          <tr><td className="hl">影響評価</td><td>コスト・工数・他機能への波及を分析する</td></tr>
          <tr><td className="hl">承認</td><td>評価をもとに実施可否を判断する</td></tr>
          <tr><td className="hl">実施・確認</td><td>変更を反映し、回帰テストで影響がないか確認する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        変更管理は「建物の改築申請」に似ています。壁を抜きたいと思っても、勝手に壊せば建物全体の強度に関わります。申請し、構造への影響を確認し、許可を得てから工事する ― この手続きが、システムの安全な変更を支えます。
      </Analogy>

      <Heading num="02">一貫性の維持と構成管理との関係</Heading>
      <p>変更管理が守ろうとするのは、システム全体の<Term>一貫性</Term>です。あるモジュールを変えたのに関連する設計書やテストが古いまま、という食い違いを防ぎます。実際の運用では、<Link href="/dev/sdlc/management/config">構成管理</Link>と表裏一体で働きます。構成管理が「何が今の正か」を記録する台帳だとすれば、変更管理は「その台帳をどう更新してよいか」を定めるルールです。両者がそろって初めて、成果物の整合が保たれます。</p>

      <Heading num="まとめ">変更管理で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>手順に乗せる</h4><p>要求 → 影響評価 → 承認 → 実施・確認の流れで、変更を管理された形で通します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>影響を先に読む</h4><p>反映の前に、他機能やコストへの波及を評価します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>構成管理と一対</h4><p>「今の正」を記録する構成管理と、「更新のルール」を定める変更管理で一貫性を保ちます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
                    <RelatedLink href="/dev/sdlc/maintenance" tag="開発工程">保守</RelatedLink>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
