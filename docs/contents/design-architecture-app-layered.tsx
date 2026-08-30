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
  title: "レイヤー系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ レイヤー系</Eyebrow>
        <h1>レイヤー系 ― アプリ内部を階層・機能で区切る</h1>
        <Lead>
          ここからは、<Link href="/design/architecture">アーキテクチャ一覧</Link>で見た<Term>アプリケーションアーキテクチャ</Term>(1つのアプリの内部をどう構造化するか)を、系統ごとに見ていきます。最初の<Term>レイヤー系</Term>は、1970年代のレイヤードアーキテクチャから2015年頃のFeature Folder Architectureまで、「何を軸にコードを区切るか」を巡って考え方が変化してきた系統です。
        </Lead>
      </Hero>

      <Heading num="01">レイヤー系に共通する発想</Heading>
      <p>レイヤー系の4つのスタイルは、いずれも「1つのアプリのコードをどう分割すれば変更に強くなるか」という同じ問いへの回答です。前半2つ(レイヤードアーキテクチャ、Three-Tier Architecture)は<Term>技術的な役割</Term>(画面・業務・データ)を軸に水平に分割し、後半2つ(Vertical Slice、Feature Folder)は<Term>機能</Term>を軸に垂直に分割します。同じ「分割」でも、切り口が90度違うのがこの系統を通した見どころです。</p>

      <Heading num="02">レイヤードアーキテクチャ(1970年代) ― アプリ内部への適用</Heading>
      <p><Link href="/design/architecture/sys/layered">システムアーキテクチャとしてのレイヤードアーキテクチャ</Link>は複数サービス間の階層分けでしたが、同じ発想は1つのアプリケーションの内部にもそのまま適用できます。1つのコードベースの中で、プレゼンテーション層・ビジネス層・永続化層のようにフォルダやパッケージを分け、責務を分離して保守性を高めるのがアプリケーション版の狙いです。粒度は違えど「隣接する層としか話さない」という制約は共通しています。</p>

      <Heading num="03">Three-Tier Architecture(1996) ― Webアプリ向けの3層</Heading>
      <p>1996年頃、Webアプリケーションの普及とともに、レイヤードの考え方を<Term>プレゼンテーション層・ビジネス層・データ層</Term>の3層に明確化したのがThree-Tier Architectureです。ブラウザ(クライアント)・アプリケーションサーバー・データベースサーバーという物理的な3層構成とも対応しやすく、Webアプリの標準的な骨格として長く使われてきました。</p>

      <Heading num="04">Vertical Slice Architecture(2014頃) ― 機能単位の縦切り</Heading>
      <p>レイヤーで分割すると、1つの機能(例: 「注文を作成する」)を実装するために、コントローラ層・サービス層・リポジトリ層と複数の層を横断してファイルを行き来する必要があります。<Term>Vertical Slice Architecture</Term>は逆に、1つの機能をリクエストからDBアクセスまで丸ごと1つの「スライス」としてまとめ、レイヤーより機能単位でコードを管理する考え方です。機能追加が既存のスライスに影響しにくく、機能ごとの独立性が高まります。</p>

      <Heading num="05">Feature Folder Architecture(2015頃) ― フォルダ構成を機能単位に</Heading>
      <p><Term>Feature Folder Architecture</Term>は、Vertical Sliceの考え方をフォルダ構成そのものに徹底したものです。「controllers/」「services/」「models/」のように技術的役割でトップレベルのフォルダを分けるのではなく、「orders/」「users/」のように機能・ドメインでトップレベルのフォルダを分け、その中に必要なコードをまとめて置きます。</p>

      <Analogy label="💡 たとえるなら">
        レイヤードアーキテクチャが「部署ごとにフロアを分けたオフィスビル」だとすると、Vertical Slice / Feature Folderは「1つのプロジェクトチームが1つの島(フロア横断のチーム部屋)に全員集まっている」ような配置です。前者は同じ仕事(例: 経理処理)を1箇所にまとめられますが、1つの案件を進めるには複数フロアを行き来する必要があります。後者は案件ごとの動きは速い一方、同じような処理が島ごとに重複しやすいという弱点もあります。
      </Analogy>

      <p>次のページでは、画面表示とロジックの分離という、より具体的な問題に取り組んだ<Term>GUI系</Term>(MVC・PAC・MVP・Document-View)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>レイヤードアーキテクチャ</h4><p>技術的役割(画面・業務・永続化)で水平に分割する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Three-Tier Architecture</h4><p>Webアプリ向けにプレゼンテーション・ビジネス・データの3層を明確化。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Vertical Slice Architecture</h4><p>機能単位でリクエストからDBまでを1つのスライスにまとめる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Feature Folder Architecture</h4><p>フォルダ構成自体を技術的役割ではなく機能単位にする。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/layered" tag="設計">レイヤードアーキテクチャ(システム版)</RelatedLink>
                    <RelatedLink href="/design/architecture/app/gui" tag="設計">GUI系</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
