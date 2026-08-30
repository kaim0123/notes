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
  title: "保守性の基本4原則",
};

const rows = [
  { era: "1990年代前半", name: "高凝集・低結合", author: "多数(体系化は後年)", why: "保守しやすいモジュール設計を実現するため" },
  { era: "1995", name: "KISS", author: "起源は軍事・工学", why: "複雑すぎる設計は保守できなくなるため" },
  { era: "1999", name: "DRY(Don't Repeat Yourself)", author: "Andy Hunt, Dave Thomas", why: "コード重複による保守コスト増加を防ぐため" },
  { era: "2001", name: "YAGNI", author: "Ron Jeffries(XP)", why: "将来使うか分からない機能を作る無駄を防ぐため" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計原則 1990s-2001</Eyebrow>
        <h1>保守性の基本4原則 ― 日々のコーディングの判断基準</h1>
        <Lead>
          <Term>高凝集・低結合</Term>・<Term>KISS</Term>・<Term>DRY</Term>・<Term>YAGNI</Term>は、特定のパラダイムやアーキテクチャを問わず、コードを書くほぼすべての場面で判断基準になる4原則です。前ページの<Link href="/design/principles/foundations">黎明期の原則</Link>をより具体的な行動指針に落とし込んだものと言えます。
        </Lead>
      </Hero>

      <Heading num="01">4つの原則</Heading>
      <table>
        <thead>
          <tr><th>年代</th><th>原則</th><th>提唱者</th><th>なぜ生まれたか</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.era}</td>
              <td>{row.name}</td>
              <td>{row.author}</td>
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">高凝集・低結合 ― 近いものは近くに、遠いものは疎に</Heading>
      <p><Term>高凝集</Term>は「1つのモジュールの中身が、互いに関連の強い要素だけで構成されている」状態を指し、<Term>低結合</Term>は「モジュール同士の依存が最小限に保たれている」状態を指します。前ページの関心の分離・情報隠蔽を、モジュール設計の「良し悪しを測る指標」として言い換えたものです。</p>

      <Heading num="03">KISS ― 必要以上に複雑にしない</Heading>
      <p><Term>KISS(Keep It Simple, Stupid)</Term>は、同じ問題を解決できるなら、より単純な設計・実装を選ぶという原則です。将来の拡張性を先回りして複雑な抽象化を作り込むと、かえって理解・保守のコストが上がることが多く、次に見る<Term>YAGNI</Term>とも密接に関係しています。</p>

      <Heading num="04">DRY ― 同じ知識を繰り返さない</Heading>
      <p><Term>DRY(Don&apos;t Repeat Yourself)</Term>は、「同じコード」ではなく「同じ知識・仕様」を複数箇所に重複させないという原則です。コードの見た目が似ているだけで背後の仕様が別物なら、無理に共通化するとかえって変更に弱くなるため、「何が重複しているか」を見極めることが重要です。</p>

      <Heading num="05">YAGNI ― 今使わない機能は作らない</Heading>
      <p><Term>YAGNI(You Aren&apos;t Gonna Need It)</Term>は、Extreme Programming(XP)から生まれた原則で、「将来使うかもしれない」という予測だけで機能や抽象化を先回りして作らないという考え方です。KISSが「今ある要件をシンプルに実装する」ことを説くのに対し、YAGNIは「まだない要件のために作り込まない」という、範囲(スコープ)の判断基準です。</p>

      <Analogy label="💡 たとえるなら">
        引っ越し作業に例えると、高凝集・低結合は「同じ部屋で使うものは同じ箱にまとめ、箱同士は独立して運べるようにする」こと、KISSは「必要以上に凝った梱包をしない」こと、DRYは「同じラベルを何枚も手書きせず、1枚のテンプレートを使い回す」こと、YAGNIは「『いつか使うかも』で不要な家具まで運ばない」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>高凝集・低結合</h4><p>関連の強い要素は同じモジュールに、モジュール間の依存は最小限に。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>KISS</h4><p>同じ問題を解決できるなら、より単純な設計を選ぶ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DRY</h4><p>同じコードではなく、同じ「知識」を複数箇所に重複させない。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>YAGNI</h4><p>将来使うか分からない機能を先回りして作らない。</p></Card>
      </CardGrid>

      <p>次のページでは、この4原則をオブジェクト指向設計に特化する形で体系化した<Link href="/design/principles/solid">SOLID</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/principles/foundations" tag="設計">黎明期の原則</RelatedLink>
                    <RelatedLink href="/design/principles/solid" tag="設計">SOLID</RelatedLink>
                    <RelatedLink href="/design/paradigm" tag="設計">パラダイム</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
