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
  title: "オブジェクト中心設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計思想 1980年代後半</Eyebrow>
        <h1>オブジェクト中心設計 ― 名詞からオブジェクトを見つける</h1>
        <Lead>
          <Term>オブジェクト指向</Term>が実用言語として広まった1980年代後半、Grady BoochのBooch法や、Peter Coad・Edward YourdonのOOA/OOD、James RumbaughのOMTといった初期の分析・設計手法が登場します。共通するのは、要求仕様の文章から<Term>名詞</Term>を拾い上げ、それをそのままクラス・属性・関連としてモデル化するというアプローチです。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p>「要求仕様書に出てくる名詞(顧客・注文・商品など)をクラス候補、動詞をメソッド候補とみなす」というのが、オブジェクト中心設計の基本手順です。データ中心設計が「テーブル」を起点にするのに対し、オブジェクト中心設計は「ドメインに登場する物・概念」を起点にクラスを見出します。この違いは些細に見えて、コードの切り分け方を大きく左右します。</p>

      <table>
        <thead>
          <tr><th>手法</th><th>提唱者</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Booch法</td><td>Grady Booch</td><td>クラス図・オブジェクト図による静的/動的モデリングを体系化</td></tr>
          <tr><td className="hl">OOA/OOD</td><td>Peter Coad, Edward Yourdon</td><td>「名詞→クラス、動詞→メソッド」という抽出手順を明文化</td></tr>
          <tr><td className="hl">OMT</td><td>James Rumbaugh</td><td>オブジェクトモデル・動的モデル・機能モデルの3視点で分析</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        要求仕様書を「顧客が商品を注文する」という一文だとすると、オブジェクト中心設計は、この文から<Term>顧客</Term>クラスと<Term>商品</Term>クラス、<Term>注文</Term>クラスを機械的に取り出します。名詞という「表面上の言葉」を手がかりにする分、素早くモデルの骨格を作れる一方、「注文の何が難しい業務ルールなのか」という肝心の中身までは、名詞を拾うだけでは見えてきません。
      </Analogy>

      <Heading num="02">特徴と向き不向き</Heading>
      <p>要求仕様からすばやくクラス候補を洗い出せるため、モデリングの取っ掛かりとしては今も有効です。しかし名詞抽出だけに頼ると、クラスは属性(データ)ばかりが並び、業務ロジックは別のクラスに切り出されてしまう<Term>貧血ドメインモデル</Term>に陥りがちだと、後年多くの実践者から指摘されました。この反省から、「クラスが何をする責務を持つか」を先に考える<Link href="/design/methodology/responsibility-driven">責務駆動設計</Link>や、業務知識をチームの会話と同じ言葉でモデル化する<Link href="/design/methodology/ddd">ドメイン駆動設計</Link>が生まれていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>名詞からクラスを見つける</h4><p>要求仕様の名詞・動詞をクラス・メソッド候補として機械的に抽出する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>モデリングの初速は速い</h4><p>取っ掛かりとしては有効だが、業務ルールの深さまでは拾いきれない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>貧血ドメインモデルの反省</h4><p>データばかりのクラスに陥りやすく、責務駆動設計・DDDへと発展する。</p></Card>
      </CardGrid>

      <p>次のページでは、Bertrand Meyerが提唱した、モジュール間の責任範囲を明文化する<Link href="/design/methodology/contract">契約による設計</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology/data-centric" tag="設計">データ中心設計</RelatedLink>
                    <RelatedLink href="/design/methodology/contract" tag="設計">契約による設計</RelatedLink>
                    <RelatedLink href="/design/methodology/responsibility-driven" tag="設計">責務駆動設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
