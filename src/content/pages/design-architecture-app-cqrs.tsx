import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "高度な設計系(CQRS)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>高度な設計系 ― 読み取りと書き込みを分けて考える</h1>
        <Lead>
          アプリケーションアーキテクチャの最後の系統は、これまでの「レイヤーをどう分けるか」「オブジェクトをどう設計するか」とは異なる切り口です。中心にあるのは2009年にGreg Youngが提唱した<Term>CQRS</Term>で、他のスタイルより一段抽象度の高い、複数のパターンを組み合わせた設計手法という位置づけです。
        </Lead>
      </Hero>

      <Heading num="01">CQRS ― CommandとQueryのモデルを分ける</Heading>
      <p>
        <Term>CQRS(Command Query Responsibility Segregation)</Term>は、状態を変更する処理(<Term>Command</Term>)と、状態を読み取るだけの処理(<Term>Query</Term>)で、扱うモデルそのものを分離します。多くのアプリケーションでは同じモデルで読み書き両方を扱いますが、CQRSでは書き込み用と読み取り用のモデルを別々に用意し、それぞれを独立に最適化できるようにします。
      </p>

      <DiagramFrame
        slug="design-architecture-app-cqrs-split"
        aspect="680 / 300"
        caption="CQRSのモデル分離。書き込み(Command)は業務ルールの整合性を守るドメインモデルを通って書き込み用ストアへ向かう。読み取り(Query)はドメインモデルを通らず、画面表示に都合のよい形へ整形済みの読み取り用モデルから直接返す。2つのストアは結果整合性で同期される。1つのモデルで両方を満たそうとすると、互いの都合で歪む。"
      />

      <Heading num="02">なぜ分けたいのか</Heading>
      <p>
        読み取りと書き込みは、求められる性質が異なります。書き込みは業務ルールの整合性(不正な注文を作らない)が重要で、読み取りは表示に必要な形へどれだけ速く整形できるかが重要です。1つのモデルで両方を満たそうとすると、業務ルールを守るための複雑な制約と、画面表示のための都合のよい形が同じクラスに同居し、互いの都合で歪められます。CQRSはこの2つの関心事を最初から分けることで、それぞれを単純に保ちます。
      </p>

      <Heading num="03">CQSとの違い</Heading>
      <p>
        CQRSは、1989年にBertrand Meyerが提唱した<Term>CQS(コマンド・クエリ分離)</Term>の考え方 ―
        1つのメソッドは「値を返す」か「状態を変更する」かのどちらか一方にする ―
        を、メソッドレベルからアーキテクチャ全体のレベルへ拡張したものです。CQSが「1つの関数の中の分離」だとすると、CQRSは「アプリケーション全体でモデルそのものを分離」する、より大きな粒度の適用です。
      </p>

      <Analogy label="💡 たとえるなら">
        レストランで例えると、CQSは「1人の店員が注文を取ることと会計をすることを同時に喋りながらやらない」というレベルの気配りです。CQRSはさらに大きく、「注文を受けるキッチン側の伝票フォーマット」と「お客様に見せる会計用の明細フォーマット」を、そもそも別の書式にしてしまうようなものです。
      </Analogy>

      <Heading num="04">コストと、どこまで分けるか</Heading>
      <p>
        読み取り用のストアを物理的に分けると、書き込みが反映されるまでの時間差(結果整合性)を利用者に見せることになります。「保存したのに一覧に出てこない」という体験は、それだけで不具合として扱われます。多くの場合は、同じデータベースのまま読み取り専用のクエリと書き込み用のモデルを分けるだけでも十分な効果があります。物理的な分離は、読み取りの負荷が実際に問題になってから検討するのが現実的です。
      </p>
      <p>
        なお、状態そのものではなく状態を変えたイベントの列を記録する<Term>イベントソーシング</Term>と組み合わせて語られることも多いスタイルですが、両者は独立した選択です。CQRSだけを採ることも、その逆もできます。<Link href="/design/architecture-event-driven">イベント駆動アーキテクチャ</Link>と併せて考えると位置づけが掴みやすくなります。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>CommandとQueryを分離</h4><p>状態を変更する処理と読み取るだけの処理で、モデルを分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>それぞれを独立に最適化</h4><p>書き込みは整合性、読み取りは表示のしやすさをそれぞれ追求できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分けすぎない</h4><p>物理的な分離は結果整合性を招く。まずは同じDB内での分離から。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-cqrs" />
    </DocsPage>
  );
}
