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
  title: "高度な設計系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ 高度な設計系</Eyebrow>
        <h1>高度な設計系 ― 読み取りと書き込みを分けて考える</h1>
        <Lead>
          アプリケーションアーキテクチャの最後の系統<Term>高度な設計系</Term>は、これまでの「レイヤーをどう分けるか」「オブジェクトをどう設計するか」とは異なる切り口の考え方です。現時点では2009年に登場した<Term>CQRS</Term>のみを扱いますが、他のスタイルより一段抽象度の高い、複数のパターンを組み合わせた設計手法という位置づけです。
        </Lead>
      </Hero>

      <Heading num="01">CQRS(2009) ― Command と Query のモデルを分ける</Heading>
      <p><Term>CQRS(Command Query Responsibility Segregation)</Term>は、Greg Youngが提唱しました。名前が示す通り、状態を変更する処理(<Term>Command</Term>)と、状態を読み取るだけの処理(<Term>Query</Term>)で、扱うモデルそのものを分離します。多くのアプリケーションでは同じモデルで読み書き両方を扱いますが、CQRSでは書き込み用のモデルと読み取り用のモデルを別々に用意し、それぞれを独立に最適化できるようにします。</p>

      <Heading num="02">なぜ分けたいのか</Heading>
      <p>読み取りと書き込みは、求められる性質が異なります。書き込みは業務ルールの整合性(不正な注文を作らない、など)が重要で、読み取りは表示に必要な形へどれだけ速く整形できるかが重要です。1つのモデルで両方を満たそうとすると、業務ルールを守るための複雑な制約と、画面表示のための都合の良い形が同じクラスに同居し、互いの都合で歪められてしまいます。CQRSはこの2つの関心事を最初から分けることで、それぞれを単純に保ちます。</p>

      <Heading num="03">CQSとの違い</Heading>
      <p>CQRSは、1989年にBertrand Meyerが提唱した<Term>CQS(コマンド・クエリ分離)</Term>の考え方(1つのメソッドは「値を返す」か「状態を変更する」かのどちらか一方にする)を、メソッドレベルからアーキテクチャ全体のレベルへ拡張したものです。CQSが「1つの関数の中の分離」だとすると、CQRSは「アプリケーション全体でモデルそのものを分離」する、より大きな粒度の適用と言えます。</p>

      <Analogy label="💡 たとえるなら">
        レストランで例えると、CQSは「1人の店員が『注文を取る』と『会計をする』を同時に喋りながらやらない」というレベルの気配りです。CQRSはさらに大きく、「注文を受けるキッチン側の伝票フォーマット」と「お客様に見せる会計用の明細フォーマット」をそもそも別の書式にしてしまうようなものです。
      </Analogy>

      <p>ここまで、レイヤー系・GUI系・Web系・ドメインモデル系・データアクセス系・ドメイン中心アーキテクチャ系・高度な設計系という7つの系統で、アプリケーションアーキテクチャの主なスタイルを見てきました。振り返ると、ここまでのアーキテクチャの選択肢はどれも、最初に<Link href="/design/paradigm">パラダイム</Link>と<Link href="/design/principles">設計原則</Link>で見た発想を、粒度の異なる形で反映したものでした。次のページからは、さらに小さいクラス・オブジェクト数個の粒度で繰り返し現れる定石である<Link href="/design/patterns">設計パターン</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>CommandとQueryを分離</h4><p>状態を変更する処理と読み取るだけの処理でモデルを分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>それぞれを独立に最適化</h4><p>書き込みは整合性、読み取りは表示のしやすさをそれぞれ追求できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CQSのアーキテクチャ版</h4><p>メソッドレベルの分離原則を、アプリ全体の粒度に拡張したもの。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ系</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
