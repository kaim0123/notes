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
  title: "レビューと品質確認",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>レビューと品質確認 ― 人の目で確認する品質保証</h1>
        <Lead>
          <Link href="/test/strategy">テスト</Link>が「動くコード」に対する検証だとすれば、要件定義書や設計書のように、動かして確認できない成果物もあります。<Term>レビュー</Term>とは、人が成果物を読んで欠陥を見つける、テストとは異なる角度の品質保証です。開発の各工程で早めに欠陥を見つけるほど、手戻りは小さく済みます。
        </Lead>
      </Hero>

      <Heading num="01">レビューの種類 ― どれだけ厳格に進めるか</Heading>
      <p>レビューには、目的に応じていくつかの進め方があります。厳格さと形式の度合いで並べると、次の4つに整理できます。</p>

      <table>
        <thead>
          <tr><th>種類</th><th>概要</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">インスペクション</td><td>最も形式的なレビュー</td><td>モデレーター・作成者・レビューア・記録係など役割を定め、チェックリストを用いて欠陥を検出する</td></tr>
          <tr><td className="hl">ウォークスルー</td><td>作成者主導のレビュー</td><td>作成者が成果物を説明し、参加者が質問や改善点を議論する。教育や知識共有にも適している</td></tr>
          <tr><td className="hl">技術レビュー</td><td>技術的妥当性を評価</td><td>専門家が設計や実装、技術的な問題点や改善案を検討する</td></tr>
          <tr><td className="hl">マネジメントレビュー</td><td>プロジェクト管理の観点で評価</td><td>成果物や進捗、コスト、スケジュール、リスクなどを管理者が確認し、プロジェクトの継続可否などを判断する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        4種類のレビューは「原稿のチェック体制」に似ています。インスペクションは校閲者がチェックリスト片手に一字一句確認する校正作業、ウォークスルーは著者が編集者に読み聞かせながら意見をもらう打ち合わせ、技術レビューは専門家による事実確認、マネジメントレビューは「この本を予定通り出版できるか」を判断する編集会議です。同じ「読む」でも目的が違えば進め方も変わります。
      </Analogy>

      <p>すべての成果物にインスペクションほど重い進め方をする必要はありません。<Link href="/test/strategy">品質戦略</Link>で定めたリスクの大きさに応じて、重要な設計判断には厳格なインスペクションを、日常的な実装にはウォークスルーに近い軽量なレビューを、というように使い分けるのが現実的です。</p>

      <Heading num="02">レビュー対象 ― 開発の各工程で何をレビューするか</Heading>
      <p>レビューの「種類」が進め方の軸だとすれば、「対象」は開発工程のどこで行うかという軸です。工程ごとに確認すべき観点は異なります。</p>

      <table>
        <thead>
          <tr><th>レビュー</th><th>対象</th><th>主な確認内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">要件レビュー</td><td>要件定義書</td><td>要件の漏れ・矛盾・実現可能性</td></tr>
          <tr><td className="hl">設計レビュー</td><td>基本設計書・詳細設計書</td><td>設計の妥当性、保守性、拡張性</td></tr>
          <tr><td className="hl">コードレビュー</td><td>ソースコード</td><td>バグ、可読性、保守性、性能、セキュリティ</td></tr>
          <tr><td className="hl">テストケースレビュー</td><td>テスト仕様書・テストケース</td><td>テスト観点の網羅性、期待結果の妥当性</td></tr>
          <tr><td className="hl">ドキュメントレビュー</td><td>マニュアル・運用手順書など</td><td>正確性、一貫性、分かりやすさ</td></tr>
          <tr><td className="hl">リリースレビュー</td><td>リリース計画・手順</td><td>リリース手順、影響範囲、ロールバック計画</td></tr>
        </tbody>
      </table>

      <p>この並びは<Link href="/test/strategy">品質戦略</Link>のシフトレフトの考え方とも重なります。要件レビューや設計レビューを早い段階で厚くしておくほど、その後のコードレビューやテストケースレビューで見つかる欠陥の手戻りコストは小さく済みます。</p>

      <Heading num="03">テストケースレビューが独立した理由</Heading>
      <p>テストケース自体もレビュー対象になる、という点は見落とされがちです。<Link href="/test/design-techniques">テスト設計技法</Link>で網羅したつもりのケースにも、境界値の選び方に誤りがあったり、そもそも仕様の解釈を勘違いしていたりすることがあります。「テストが通ること」と「テストケースが正しい観点をカバーしていること」は別問題であり、テストケースレビューはこの後者を人の目で確認する工程です。</p>

      <Heading num="まとめ">レビューで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>厳格さは目的で選ぶ</h4><p>インスペクション・ウォークスルー・技術レビュー・マネジメントレビューを、リスクの大きさに応じて使い分けます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>工程ごとに観点が違う</h4><p>要件から実装、リリースまで、それぞれの工程で確認すべき内容は異なります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テストケース自体もレビュー対象</h4><p>テストが通ることと、テストの観点が正しいことは別問題です。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>自動チェックの手前にある品質保証</h4><p>動かして確認できない成果物は、人の目によるレビューでしか品質を担保できません。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/strategy" tag="テスト">テストの段階</RelatedLink>
                    <RelatedLink href="/test/code-review" tag="テスト">コードレビュー</RelatedLink>
                    <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
