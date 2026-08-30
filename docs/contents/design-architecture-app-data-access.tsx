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
  title: "データアクセス系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ データアクセス系</Eyebrow>
        <h1>データアクセス系 ― オブジェクトとDBをどう対応させるか</h1>
        <Lead>
          <Term>データアクセス系</Term>は、前のページの<Term>ドメインモデル系</Term>で表現したオブジェクトを、実際にどうデータベースへ読み書きするかという問いへの答えです。2002年のFowlerの整理では、密結合な方法から疎結合な方法まで3つの選択肢が並びます。
        </Lead>
      </Hero>

      <Heading num="01">結合度のグラデーション</Heading>
      <p>オブジェクトとDBを対応させる方法は、「オブジェクト自身にDB操作をどこまで持たせるか」という結合度の違いで整理できます。Active Recordは最も密結合(オブジェクト自身がDB操作を持つ)、Data MapperとRepositoryはより疎結合(DB操作を別の層に切り出す)という位置づけです。</p>

      <Heading num="02">Active Record(2002) ― 1レコード=1オブジェクト</Heading>
      <p><Term>Active Record</Term>は、DBの1レコードを1オブジェクトに対応させ、そのオブジェクト自身に保存・更新・削除といったDB操作のメソッドも持たせる方法です。<code>user.save()</code>のように直感的に書けるため学習コストが低く、Ruby on RailsのActive RecordやDjangoのORMなど、多くのフレームワークの標準的なORMとして採用されています。一方でテーブル構造とオブジェクトの構造が密結合になりやすく、業務ロジックが複雑な場合は次のData Mapperの方が向きます。</p>

      <Heading num="03">Data Mapper(2002) ― マッピング専任の層を置く</Heading>
      <p><Term>Data Mapper</Term>は、ドメインオブジェクトとDBの間のマッピングだけを専任で担う層(マッパー)を別に用意する方法です。ドメインオブジェクト自身はDBの存在を一切知らずに済むため、ドメインをDBから独立させたいときに向いています。Active Recordより設計・実装の手間は増えますが、業務ロジックが複雑になるほどこの独立性が効いてきます。</p>

      <Heading num="04">Repository(2002) ― コレクションのように振る舞う窓口</Heading>
      <p><Term>Repository</Term>は、まるでメモリ上のコレクション(配列やリスト)であるかのように振る舞う窓口を用意し、その裏側でDBへのクエリを実行する方法です。呼び出し側は「SQLをどう書くか」を意識せず、<code>orders.findById(1)</code>のようにデータを取得できます。データ取得方法(DB、外部API、キャッシュなど)を隠蔽できるため、Data Mapperと組み合わせて使われることも多いパターンです。</p>

      <Analogy label="💡 たとえるなら">
        Active Recordは「自分で会計処理までできる社員」です。話は早いですが、業務(ドメイン)と経理処理(DB操作)が同じ人に混ざっています。Data Mapperは「専任の経理担当」を別に置くやり方、Repositoryは「棚から欲しいものを取ってきてくれる倉庫係」で、どこに何が保管されているかを意識せずに済みます。
      </Analogy>

      <p>Active Record・Data Mapper・Repositoryをより実践的なコード例とあわせて、Unit of Work・Lazy Loadも含めた5つの定石として深掘りしたものが<Link href="/design/architecture/app/data-access/patterns">永続化層の定石</Link>です。次のページでは、依存の向きをドメインの内側へ徹底することで技術からの独立を目指した<Term>ドメイン中心アーキテクチャ系</Term>(Hexagonal・DCI・Onion・Clean Architecture)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Active Record</h4><p>1レコード=1オブジェクトに、DB操作そのものも持たせる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Data Mapper</h4><p>マッピング専任の層を置き、ドメインをDBから独立させる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Repository</h4><p>コレクションのように振る舞う窓口でデータ取得方法を隠す。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/data-access/patterns" tag="設計">永続化層の定石</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-model" tag="設計">ドメインモデル系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ系</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
