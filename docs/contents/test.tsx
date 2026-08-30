import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テスト",
};

const topics = [
  { href: "/test/quality-plan", title: "品質計画", desc: "型チェックからE2E、パフォーマンスまで、壊れうる観点ごとの自動チェックの全体像" },
  { href: "/test/strategy", title: "品質戦略とテストピラミッド", desc: "どのレイヤーに、どれだけテストを積むかという配分の考え方" },
  { href: "/test/design-techniques", title: "テスト設計技法", desc: "正常系・準正常系・異常系の分類から、同値分割・境界値分析・デシジョンテーブル・ペアワイズ・状態遷移まで" },
  { href: "/test/tdd", title: "テスト駆動開発(TDD)", desc: "Red→Green→Refactor。テストを設計のフィードバック装置として使う" },
  { href: "/test/unit", title: "Unitテスト", desc: "FIRST原則・純粋関数・依存注入で、ピラミッドの土台を書きやすく壊れにくくする" },
  { href: "/test/integration", title: "Integrationテスト", desc: "DB・外部API・モジュール結合という、つなぎ目の不具合を捕まえる" },
  { href: "/test/e2e", title: "E2Eテスト", desc: "ページオブジェクトパターンとテストデータ戦略で、ユーザー動線を丸ごと確認する" },
  { href: "/test/tools", title: "Vitest・Playwright", desc: "テストピラミッドを実際に動かす、JS/TSの2大テストツール" },
  { href: "/test/doubles", title: "テストダブル", desc: "スタブ・モック・フェイクの使い分けと、置き換えすぎが招く「嘘の緑」" },
  { href: "/test/data", title: "テストデータ管理", desc: "DBの隔離・ファクトリ・時刻の固定・本番データを持ち込まない理由" },
  { href: "/test/patterns", title: "テストパターン", desc: "Test Data Builder・Object Mother・Golden Master・Contract Testingなど、テストコードを書く・保つための定石" },
  { href: "/test/flaky", title: "フレーキーテスト", desc: "「再実行したら通った」を放置しない ― 原因の分類と、見つける仕組み" },
  { href: "/test/performance", title: "性能テストと負荷テスト", desc: "限界と壊れ方を事前に知る。負荷・ストレス・耐久・スパイクの使い分け" },
  { href: "/test/security", title: "セキュリティテスト", desc: "SAST・SCA・DAST・ペネトレの補完関係と、自分で書ける認可テスト" },
  { href: "/dev/sdlc/review", title: "レビューと品質確認", desc: "動かして確認できない成果物を人の目で確認する品質保証（開発技術セクションへ移動）" },
  { href: "/test/code-review", title: "コードレビュー", desc: "コードに詳しくなくても確認できる観点と、分からない部分の扱い方" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テスト</h1>
        <Lead>
          「コードが壊れていないこと」をどうやって仕組みで言い切るか。<Term>品質戦略</Term>で全体の方針を定め、<Term>テスト設計技法</Term>でケースの作り方を機械的に決め、Unit・Integration・E2Eの3層でピラミッドを組み立て、最後に人の目による<Term>レビュー</Term>で自動チェックの手が届かない領域を補う ― この一連の流れを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">自動チェックと人によるレビュー、2つの品質保証</Heading>
      <p>品質を保証する手段は大きく2つに分かれます。1つはコードを実際に動かして検証する自動テスト、もう1つは要件定義書や設計書のように動かせない成果物を人が読んで確認するレビューです。本セクションでは、まず<Term>品質戦略</Term>で全体の方針を固め、次に<Term>テスト設計技法</Term>で「何をテストケースにすべきか」を決め、続けてUnit・Integration・E2Eそれぞれの層の書き方を掘り下げ、実行環境としてのVitest・Playwrightを見たあと、最後にレビューという別角度の品質保証で締めくくります。</p>

      <Analogy label="💡 たとえるなら">
        テストとレビューの関係は「機械検査」と「人による最終確認」に似ています。工場のラインで自動検査機がひたすら不良品を弾く一方、設計図そのものが間違っていないかは、機械ではなく人が読んで判断します。どちらか一方だけでは品質は保証できません。
      </Analogy>

      <IndexGrid>
        {topics.map((topic, i) => (
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

      <DocsFooter />
    </DocsPage>
  );
}
