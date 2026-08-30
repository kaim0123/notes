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
  title: "ドメインモデル系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ ドメインモデル系</Eyebrow>
        <h1>ドメインモデル系 ― 業務ロジックをどう表現するか</h1>
        <Lead>
          <Term>ドメインモデル系</Term>は、これも2002年のFowler『Patterns of Enterprise Application Architecture』が整理した系統で、「業務ルールをコードとしてどう表現するか」という問いに、業務の複雑さに応じて異なる3つの答えを出しています。
        </Lead>
      </Hero>

      <Heading num="01">複雑さに応じた3つの選択肢</Heading>
      <p>業務ロジックの実装方法は、業務がどれだけ複雑かによって最適解が変わります。ドメインモデル系の3スタイルは、単純な業務向け(Transaction Script)、複雑な業務向け(Domain Model)、その中間でテーブル単位にまとめる方法(Table Module)という、複雑さの軸に沿ったグラデーションを成しています。</p>

      <Heading num="02">Transaction Script(2002) ― 手続き的にシンプルに書く</Heading>
      <p><Term>Transaction Script</Term>は、1つの業務処理(例: 「注文を確定する」)を、上から下へ読める手続き的な1本のスクリプトとして書く方法です。オブジェクト指向的な設計をあまり必要とせず、単純な業務処理をシンプルに実装できます。業務ルールが少ないうちは最も書きやすい選択肢ですが、ルールが増えるとスクリプト同士でロジックが重複しやすくなります。</p>

      <Heading num="03">Table Module(2002) ― テーブル単位でロジックを持つ</Heading>
      <p><Term>Table Module</Term>は、DBのテーブル1つに対して1つのロジッククラスを対応させ、そのテーブルに関する業務ロジックをまとめて持たせる方法です。1レコードごとにオブジェクトを作らず、テーブル全体を1つのクラスで扱うためデータセットとの相性がよい一方、現代では後述のActive RecordやORMを使ったDomain Modelが主流になっています。</p>
      <p><Mark tier="legacy">史</Mark><MarkNote>→ 現代はORMを介したDomain Model、またはActive Recordが主流</MarkNote></p>

      <Heading num="04">Domain Model(2002) ― ビジネスルールをオブジェクトで表現する</Heading>
      <p><Term>Domain Model</Term>は、業務ルールをオブジェクトのメソッドとして表現する方法です。「注文」オブジェクトが自分自身の合計金額を計算するメソッドを持つ、というように、データとそれに対する振る舞いを1つのオブジェクトにまとめます(オブジェクト指向の本来の考え方に近い形)。業務ルールが複雑になるほど、Transaction Scriptより保守しやすくなります。</p>

      <Analogy label="💡 たとえるなら">
        Transaction Scriptは「レシピを上から順にこなす料理人」です。手順が少なければ速くて分かりやすいですが、似たようなレシピが増えると同じ下ごしらえを何度も書くことになります。Domain Modelは「食材(オブジェクト)自身に『どう調理されるべきか』を知らせておく」やり方で、レシピが複雑になるほど整理しやすくなります。
      </Analogy>

      <p>Transaction ScriptとDomain Modelの違いをより実践的なコード例とあわせて、業務ロジックの窓口となるService Layerも含めて深掘りしたものが<Link href="/design/architecture/app/domain-model/patterns">業務ロジックの置き場所</Link>です。次のページでは、そのオブジェクトをどうデータベースへ保存するかという<Term>データアクセス系</Term>(Active Record・Data Mapper・Repository)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Transaction Script</h4><p>1つの業務処理を手続き的なスクリプトとしてシンプルに書く。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Table Module</h4><p>テーブル単位でロジッククラスを対応させる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Domain Model</h4><p>業務ルールをオブジェクトのメソッドとして表現する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/domain-model/patterns" tag="設計">業務ロジックの置き場所</RelatedLink>
                    <RelatedLink href="/design/architecture/app/web" tag="設計">Web系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/data-access" tag="設計">データアクセス系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ系</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
