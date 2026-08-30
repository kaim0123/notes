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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ドメイン中心アーキテクチャ系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ ドメイン中心アーキテクチャ系</Eyebrow>
        <h1>ドメイン中心アーキテクチャ系 ― 依存の矢印をドメインへ向ける</h1>
        <Lead>
          <Term>ドメイン中心アーキテクチャ系</Term>は、2003年のHexagonal Architectureから2012年のClean Architectureまで、「業務ロジック(ドメイン)を、DBやUIといった技術的な詳細への依存から完全に独立させたい」という一貫した動機を持つ系統です。
        </Lead>
      </Hero>

      <Heading num="01">なぜ依存の向きにこだわるのか</Heading>
      <p>レイヤードアーキテクチャでは、ビジネス層がDB層に依存する(ビジネス層のコードの中にDB特有の型が登場する)ことがよくあります。すると、DBを変更するだけで業務ロジックまで書き換える羽目になります。ドメイン中心アーキテクチャ系の4スタイルは、「依存の矢印を常にドメインへ向ける」という同じ原則を、少しずつ異なる形で具体化してきました。</p>

      <Heading num="02">Hexagonal Architecture(2003) ― ポート&アダプタ</Heading>
      <p><Term>Hexagonal Architecture</Term>(ポート&アダプタアーキテクチャとも呼ばれます)は、Alistair Cockburnが提唱しました。ドメインを中心に置き、DB・UI・外部APIといった外部技術とのやり取りは、ドメインが定義する<Term>ポート</Term>(インターフェース)と、それを実装する<Term>アダプタ</Term>を介して行います。DBをPostgreSQLからMongoDBに変えても、アダプタを差し替えるだけでドメインのコードには手を入れずに済みます(<Link href="/design/architecture/app/data-access">Repositoryパターン</Link>もこのポートの一種と考えられます)。</p>

      <Heading num="03">DCI(2006) ― 状況に応じた役割を演じる</Heading>
      <p><Term>DCI(Data, Context, Interaction)</Term>は、James Coplien と Trygve Reenskaug が提唱しました。オブジェクトが持つ本質的なデータ(Data)と、特定の状況(Context)でそのオブジェクトが担う役割(Interaction上のRole)を分離し、同じオブジェクトが場面ごとに異なる役割を柔軟に演じられるようにする考え方です。他の3スタイルほど普及はしませんでしたが、「振る舞いをどこに持たせるか」という問いに独自の答えを出しています。</p>

      <Heading num="04">Onion Architecture(2007) ― 同心円状の層</Heading>
      <p><Term>Onion Architecture</Term>は、Jeffrey Palermoが提唱した、ドメインを中心とした同心円状のレイヤーで表現するアーキテクチャです。円の中心にドメインモデル、その外側にドメインサービス、さらに外側にアプリケーションサービス、一番外側にUIやDB・外部サービスを配置し、依存は常に外側から内側へだけ向かうようにします。この「同心円 + 依存は内側へ」という表現は、次のClean Architectureに整理・統合されていきます。</p>
      <p><Mark tier="legacy">史</Mark><MarkNote>→ Clean Architectureに整理・統合された</MarkNote></p>

      <Heading num="05">Clean Architecture(2012) ― 技術からの完全な独立</Heading>
      <p><Term>Clean Architecture</Term>は、Robert C. Martin(Uncle Bob)が、Hexagonal・Onionなど既存のドメイン中心の考え方を整理・統合して提唱したものです。同心円の層構造(Entities → Use Cases → Interface Adapters → Frameworks & Drivers)と<Term>依存性のルール</Term>(内側の円は外側の円について何も知らない)によって、ビジネスロジックをフレームワーク・DB・UIといった技術的な詳細から完全に独立させることを目指します。今日、この系統の中で最も広く参照されるスタイルです。</p>

      <Analogy label="💡 たとえるなら">
        ドメインを「城の本丸」に例えると、Hexagonalは「城門(ポート)を決めておき、そこを通る使者(アダプタ)なら誰でも中に入れる」仕組みです。Onion・Clean Architectureは、その城を「本丸・二の丸・三の丸」と同心円状の堀で囲み、「外側の堀から本丸への一方通行」というルールを明文化したものと言えます。DCIは少し毛色が違い、「城内の人物が場面によって異なる役職(役割)を兼務する」ことに注目します。
      </Analogy>

      <p>次のページでは、読み取りと書き込みのモデルを分離するという、また別の切り口を持つ<Term>高度な設計系</Term>(CQRS)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Hexagonal Architecture</h4><p>ポート&アダプタで外部技術への依存をなくす。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DCI</h4><p>オブジェクトが状況に応じて異なる役割を演じられるようにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Onion Architecture</h4><p>同心円状の層にし、依存を常に内側(ドメイン)へ向ける。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Clean Architecture</h4><p>Onion/Hexagonalを整理し、技術からの独立を徹底する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/data-access" tag="設計">データアクセス系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/cqrs" tag="設計">高度な設計系(CQRS)</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
