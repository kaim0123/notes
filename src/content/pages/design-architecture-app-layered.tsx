import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "レイヤー系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>レイヤー系 ― アプリ内部を階層・機能で区切る</h1>
        <Lead>
          ここからは<Link href="/design/architecture">アーキテクチャ</Link>で見た<Term>アプリケーションアーキテクチャ</Term>を系統ごとに見ていきます。最初の<Term>レイヤー系</Term>は、1970年代のレイヤードから2015年頃のFeature Folderまで、「何を軸にコードを区切るか」を巡って考え方が変化してきた系統です。
        </Lead>
      </Hero>

      <Heading num="01">共通する発想と、切り口の90度の違い</Heading>
      <p>
        レイヤー系の4つのスタイルは、いずれも「1つのアプリのコードをどう分割すれば変更に強くなるか」という同じ問いへの回答です。前半2つは<Term>技術的な役割</Term>(画面・業務・データ)を軸に水平に分割し、後半2つは<Term>機能</Term>を軸に垂直に分割します。同じ分割でも、切り口が90度違うのがこの系統の見どころです。
      </p>

      <DiagramFrame
        slug="design-architecture-app-layered-axes"
        aspect="660 / 300"
        caption="水平分割と垂直分割の対比。左は controllers・services・repositories という技術的役割ごとにフォルダを積む形で、1機能を作るには3つの層を縦断する。右は orders・users・billing という機能ごとにフォルダを並べる形で、1機能に必要なものが1箇所にまとまる。前者は同種の処理が集まり、後者は案件ごとの動きが速い代わりに似た処理が重複しやすい。"
      />

      <Heading num="02">レイヤードアーキテクチャ ― アプリ内部への適用</Heading>
      <p>
        <Link href="/design/architecture-layered">システムアーキテクチャとしてのレイヤード</Link>は複数サービス間の階層分けでしたが、同じ発想は1つのアプリケーションの内部にもそのまま適用できます。1つのコードベースの中でプレゼンテーション層・ビジネス層・永続化層のようにフォルダを分け、責務を分離して保守性を高めるのがアプリ版の狙いです。粒度は違えど「隣接する層としか話さない」という制約は共通しています。
      </p>

      <Heading num="03">Three-Tier Architecture ― Webアプリ向けの3層</Heading>
      <p>
        1996年頃、Webアプリケーションの普及とともに、レイヤードの考え方を<Term>プレゼンテーション層・ビジネス層・データ層</Term>の3層に明確化したのがThree-Tier Architectureです。ブラウザ・アプリケーションサーバー・データベースサーバーという物理的な3層構成とも対応しやすく、Webアプリの標準的な骨格として長く使われてきました。
      </p>

      <Heading num="04">Vertical Slice Architecture ― 機能単位の縦切り</Heading>
      <p>
        レイヤーで分割すると、1つの機能(「注文を作成する」など)を実装するために、コントローラ層・サービス層・リポジトリ層と複数の層を横断してファイルを行き来する必要があります。<Term>Vertical Slice Architecture</Term>は逆に、1つの機能をリクエストからDBアクセスまで丸ごと1つのスライスとしてまとめます。機能追加が既存のスライスに影響しにくく、機能ごとの独立性が高まります。
      </p>

      <Heading num="05">Feature Folder Architecture ― フォルダ構成を機能単位に</Heading>
      <p>
        <Term>Feature Folder Architecture</Term>は、Vertical Sliceの考え方をフォルダ構成そのものに徹底したものです。<code>controllers/</code>・<code>services/</code>のように技術的役割でトップレベルを分けるのではなく、<code>orders/</code>・<code>users/</code>のように機能・ドメインでトップレベルを分け、その中に必要なコードをまとめて置きます。<Link href="/design/architecture-modular-monolith">モジュラーモノリス</Link>のモジュール分割も、粒度は違いますが同じ発想です。
      </p>

      <Analogy label="💡 たとえるなら">
        レイヤードが「部署ごとにフロアを分けたオフィスビル」だとすると、Vertical Slice / Feature Folderは「1つのプロジェクトチームが1つの島に全員集まっている」配置です。前者は同じ仕事を1箇所にまとめられますが、1つの案件を進めるには複数フロアを行き来します。後者は案件ごとの動きは速い一方、似た処理が島ごとに重複しやすいという弱点があります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>水平分割(レイヤード・3層)</h4><p>技術的役割で分ける。同種の処理が1箇所に集まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>垂直分割(スライス・機能フォルダ)</h4><p>機能で分ける。1つの案件に必要なものが1箇所にまとまる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>どちらを主軸にするか</h4><p>変更が「役割ごと」に来るか「機能ごと」に来るかで選ぶ。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-layered" />
    </DocsPage>
  );
}
