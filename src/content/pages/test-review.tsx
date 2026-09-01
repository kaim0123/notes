import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "レビューと品質確認" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>レビューと品質確認 ― 動かせないものを確かめる</h1>
        <Lead>
          <Link href="/test/non-functional">機能以外のテスト</Link>までで、機械に確かめさせられるものは出揃いました。ただし自動テストが対象にできるのは、<strong>動かせる成果物だけ</strong>です。要件定義書も設計書も、動かして正しさを判定することはできません。<Term>レビュー</Term>は、その範囲を人が読むことで埋める品質保証であり、自動テストの代わりではなく、届かない場所を担当する別の手段です。
        </Lead>
      </Hero>

      <Heading num="01">自動チェックが届かない範囲</Heading>
      <p>
        開発が生む成果物を並べてみると、動かして確かめられるものがいかに少ないかが分かります。
      </p>

      <DiagramFrame
        slug="test-review-coverage"
        aspect="640 / 320"
        caption="レビューと自動テストが届く範囲の違いを、成果物の並びに重ねたもの。要件定義書、設計書、ソースコード、テストケース、手順書のうち、自動テストが届くのはソースコードだけ。レビューは人が読む手段なので5つすべてに届く。テストケースは動かすことはできるが、それは書いたとおりに走るかまでで、観点が正しいかどうかは動かしても分からない。自動チェックが1つも届かない4つは、レビューでしか品質を担保できない。"
      />

      <p>
        4番目のテストケースが微妙な位置にあります。実行はできるので緑にも赤にもなりますが、<strong>そこで分かるのは「書いたとおりに走るか」まで</strong>です。境界値の選び方を間違えていても、仕様の解釈を取り違えていても、テストは元気に通ります。だからテストケース自体もレビューの対象になります。
      </p>

      <Analogy label="💡 たとえるなら">
        工場の自動検査機と、設計図を読む人の関係です。ラインの検査機は規格外の製品を確実に弾きますが、<strong>設計図そのものが間違っていないかは判定できません</strong>。図面どおりに正しく作られた不良品を、機械は不良と呼びません。
      </Analogy>

      <Heading num="02">レビューの種類 ― どれだけ厳格に進めるか</Heading>
      <p>
        レビューには進め方の段階があります。形式と厳格さの度合いで並べると、次の4つに整理できます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>進め方</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">インスペクション</td><td>最も形式的</td><td>モデレーター・作成者・レビューア・記録係と役割を定め、チェックリストを用いて欠陥を検出する</td></tr>
          <tr><td className="hl">ウォークスルー</td><td>作成者が主導</td><td>作成者が説明し、参加者が質問と改善案を出す。教育や知識共有にも向く</td></tr>
          <tr><td className="hl">技術レビュー</td><td>専門家が評価</td><td>設計や実装の技術的な妥当性、問題点と代替案を検討する</td></tr>
          <tr><td className="hl">マネジメントレビュー</td><td>管理者が判断</td><td>進捗・コスト・スケジュール・リスクを確認し、継続可否などを決める</td></tr>
        </tbody>
      </table>

      <p>
        すべての成果物にインスペクションほど重い進め方は要りません。<Link href="/test/strategy">品質計画と戦略</Link>で見たリスクベースドテストと同じ考え方で、<strong>重要な設計判断ほど厳格に、日常的な実装は軽く</strong>使い分けます。
      </p>

      <Heading num="03">レビュー対象 ― 工程ごとに観点が変わる</Heading>
      <p>
        種類が「どう進めるか」の軸だとすれば、対象は「いつ、何を見るか」の軸です。この2つは独立していて、たとえば設計書をウォークスルーで見ることも、インスペクションで見ることもできます。
      </p>

      <DiagramFrame
        slug="test-review-timeline"
        aspect="760 / 320"
        caption="開発の工程に沿った6種類のレビューと、欠陥を見つけたときの修正コストの関係。要件レビュー、設計レビュー、コードレビュー、テストケースレビュー、ドキュメントレビュー、リリースレビューが工程順に並び、その下の棒グラフは左から右へ一貫して高くなる。同じ欠陥でも、見つかる工程が遅いほど修正は高くつく。左端の要件レビューと設計レビューを厚くするほど右側の棒が低くなる、というのがシフトレフトの実体にあたる。"
      />

      <table>
        <thead>
          <tr><th>レビュー</th><th>対象</th><th>主に確かめること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">要件レビュー</td><td><Link href="/dev/requirements">要件定義書</Link></td><td>漏れ、矛盾、実現可能性</td></tr>
          <tr><td className="hl">設計レビュー</td><td>基本設計書・詳細設計書</td><td>妥当性、保守性、拡張性</td></tr>
          <tr><td className="hl">コードレビュー</td><td>ソースコード</td><td>不具合、可読性、保守性、性能、安全性</td></tr>
          <tr><td className="hl">テストケースレビュー</td><td>テスト仕様書・テストケース</td><td>観点の網羅性、期待結果の妥当性</td></tr>
          <tr><td className="hl">ドキュメントレビュー</td><td>マニュアル・運用手順書</td><td>正確性、一貫性、分かりやすさ</td></tr>
          <tr><td className="hl">リリースレビュー</td><td>リリース計画・手順</td><td>手順、影響範囲、切り戻しの用意</td></tr>
        </tbody>
      </table>

      <p>
        図の棒グラフが示すとおり、<strong>同じ欠陥でも見つかる工程が遅いほど修正の総額は跳ね上がります</strong>。要件の読み違いを要件レビューで直せば文書の修正で済み、リリース後に見つかれば設計・実装・テスト・告知をやり直すことになります。左の2つを厚くするほど右が軽くなる、というのがシフトレフトの中身です。
      </p>

      <Aside label="設計の判断は、記録に残してレビューする">
        設計レビューでよく起きるのは、決定そのものではなく<Term>なぜそう決めたかが残っていないこと</Term>への指摘です。選択肢と却下した理由まで書いてあれば、レビューは「その前提はまだ成り立つか」という生産的な問いに変わります。記録の形式は<Link href="/design/docs-adr">アーキテクチャ決定記録</Link>が扱います。
      </Aside>

      <Heading num="04">自動チェックと人の目を、争わせない</Heading>
      <p>
        コードレビューだけは、自動テストと対象が重なります。ここで起きがちなのが、<strong>機械が判定できることを人が指摘する</strong>という消耗です。書式、命名規則の違反、未使用の変数 ― これらは静的解析に任せれば、レビューアの注意力を本来の対象に振り向けられます。
      </p>

      <table>
        <thead>
          <tr><th>機械に任せる</th><th>人が見る</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">書式、命名規則、未使用の変数</td><td>この設計は要件を満たしているか</td></tr>
          <tr><td className="hl">型の不整合、明らかな誤り</td><td>この抽象は将来の変更に耐えるか</td></tr>
          <tr><td className="hl">依存ライブラリの脆弱性</td><td>この境界の引き方は妥当か</td></tr>
          <tr><td className="hl">テストが通っているか</td><td>テストの観点は正しいか</td></tr>
        </tbody>
      </table>

      <p>
        右の列はいずれも、<strong>仕様と意図を知っている人にしか判定できないもの</strong>です。レビューの具体的な観点と伝え方、そしてリリース前に何をもって受け入れとするかの基準は、この見出しの配下で扱います。
      </p>

      <Heading num="まとめ">代わりではなく、届かない場所を担当する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>動かせない成果物のほうが多い</h4>
          <p>要件・設計・手順書には、自動チェックが1つも届かない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>種類と対象は別の軸</h4>
          <p>どれだけ厳格に進めるかと、いつ何を見るかは独立して選べる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>早い工程ほど安い</h4>
          <p>左の2つを厚くするほど、右側の修正コストは下がる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>機械の仕事を人にさせない</h4>
          <p>書式や命名は静的解析へ。人は意図と設計に注意を割く。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/test/review" />
    </DocsPage>
  );
}
