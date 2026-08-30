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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コーディング規約・スタイル",
};

const namingPages = [
  { href: "/design/conventions/functions", title: "関数・イベントハンドラの命名", desc: "動詞+名詞の基本形、is/has/can、on/handleの使い分け" },
  { href: "/design/conventions/variables", title: "変数・略語の命名", desc: "camelCaseの基本ルールと、慣習的に許容される略語" },
  { href: "/design/conventions/classes", title: "クラス・接尾辞の命名", desc: "Service・Repository・Controllerなど役割を示す接尾辞" },
  { href: "/design/conventions/files", title: "ファイル・ディレクトリの命名", desc: "種類別のファイル名ルールと、exportとの対応" },
];

const rows = [
  { type: "命名規則", desc: "変数・関数・クラスなどの名前の付け方を統一するルール", examples: "camelCase(JSの変数・関数)、PascalCase(クラス・型)、snake_case(Pythonの変数)、kebab-case(ファイル名・URL)、UPPER_SNAKE_CASE(定数)" },
  { type: "フォーマッタ", desc: "インデント・改行・スペースなど、コードの見た目を自動的に統一するツール", examples: "Prettier、gofmt、Black" },
  { type: "リンター", desc: "潜在的なバグ・規約違反を、実行せずに静的解析で検出するツール", examples: "ESLint、RuboCop、Pylint" },
  { type: "スタイルガイド", desc: "命名・構造・コメントなどの規約をまとめたドキュメント", examples: "Airbnb JavaScript Style Guide、Google Style Guides" },
  { type: "コミットメッセージ規約", desc: "変更内容を一定の形式で記述するルール", examples: "Conventional Commits" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>コーディング規約・スタイル ― 読み書きのコストを下げる取り決め</h1>
        <Lead>
          個人の好みでコードの見た目がバラバラだと、レビューのコストが上がり、本質と関係ない差分(diff)が混ざります。<Term>コーディング規約・スタイル</Term>は、これを機械的に統一し、人間はロジックのレビューに集中できるようにするための取り決め・ツール群です。
        </Lead>
      </Hero>

      <Heading num="01">代表的な規約・ツール</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>内容</th><th>代表例</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.type}>
              <td className="hl">{row.type}</td>
              <td>{row.desc}</td>
              <td>{row.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">なぜ「設計」の一部として扱うか</Heading>
      <p>命名規則やフォーマッタは、個々のコードの正しさそのものには関わらず、どちらかと言えば「チームでの読み書きコストをどう下げるか」という開発体制寄りの話題です。それでも、変数名1つ・関数の切り方1つが「その設計意図をどれだけ正確に伝えられるか」を左右するという意味で、ここまで見てきた<Link href="/design/principles">設計原則</Link>(特に<Term>単一責任の原則</Term>や<Term>明示は暗黙に勝る</Term>)の延長線上にあります。</p>

      <Analogy label="💡 たとえるなら">
        設計原則が「何を1つの単位にまとめるか」という文章の構成方針だとすれば、コーディング規約は「句読点の打ち方・字下げ」といった表記のルールです。構成がどれだけ良くても、表記がバラバラだと読みにくくなり、逆に表記さえ揃っていれば、複数人で書いた文章でも1つの文書として読めるようになります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>命名規則</h4><p>名前の付け方を揃え、読み手の推測コストを下げる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>フォーマッタ・リンター</h4><p>見た目の統一とバグの検出を自動化し、人はロジックに集中する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>スタイルガイド</h4><p>チーム・組織単位で規約をドキュメント化し、判断のブレをなくす。</p></Card>
      </CardGrid>

      <Heading num="03">命名規則を実例で見る</Heading>
      <p>代表例である<Term>命名規則</Term>を、関数・変数・クラス・ファイルという4つの粒度に分けて、具体的な単語の選び方まで掘り下げる。</p>
      <IndexGrid>
        {namingPages.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <p>これで<Term>設計</Term>の各テーマを一通り見終えました。パラダイムから設計思想・方法論、設計原則、アーキテクチャ、設計パターン、実装パターン・イディオム、そして規約・スタイルまで、粒度の異なる7つのレベルを通して「どう組み立てるか」を見てきたことになります。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/conventions/functions" tag="設計">関数・イベントハンドラの命名</RelatedLink>
                    <RelatedLink href="/design/idioms" tag="設計">実装パターン・イディオム</RelatedLink>
                    <RelatedLink href="/design/docs" tag="設計">ドキュメンテーション</RelatedLink>
                    <RelatedLink href="/design" tag="設計">設計一覧に戻る</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
