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
  title: "Web系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ Web系</Eyebrow>
        <h1>Web系 ― リクエストの受け方とHTMLの組み立て方</h1>
        <Lead>
          <Term>Web系</Term>は、Martin Fowlerが2002年の著書『Patterns of Enterprise Application Architecture』で整理した、Webアプリケーション特有の課題への回答です。「どこでリクエストを受け止めるか」(Front Controller / Page Controller)と「どうHTMLを組み立てるか」(Template View)という、Webならではの2つの問いを扱います。
        </Lead>
      </Hero>

      <Heading num="01">Front Controller(2002) ― 1つの窓口でリクエストを受け止める</Heading>
      <p><Term>Front Controller</Term>は、アプリケーションへの全リクエストを1つの窓口(コントローラ)で受け止め、そこから認証・ログ出力・ルーティングなど共通処理を行った上で、個別の処理へ振り分ける考え方です。共通処理を1箇所にまとめられるため、リクエスト処理を一元管理したいという課題に応えます。今日のほとんどのWebフレームワーク(Express、Next.js など)は、内部的にこのFront Controllerの仕組みでルーティングを行っています。</p>

      <Heading num="02">Page Controller(2002) ― ページごとに専用のコントローラ</Heading>
      <p>Front Controllerとは対照的に、<Term>Page Controller</Term>は画面(ページ)ごとに専用のコントローラを用意し、そのページに関する処理をそこに集約します。ページ単位で処理がまとまっているため理解しやすい一方、共通処理(認証チェックなど)をページごとに重複して書きがちという弱点があります。</p>
      <p><Mark tier="legacy">史</Mark><MarkNote>→ 多くの現代フレームワークはFront Controllerを採用しており、単独のPage Controllerとして採用されることは少なくなっている</MarkNote></p>

      <Heading num="03">Template View(2002) ― テンプレートにデータを差し込む</Heading>
      <p><Term>Template View</Term>は、HTMLの雛形(テンプレート)の中にマーカーを埋め込んでおき、そこにサーバー側で取得したデータを差し込んでHTMLを生成する考え方です。EJS、Jinja2、あるいはReactのJSXも、広い意味ではこのTemplate Viewの発想を受け継いでいます。HTMLの構造(テンプレート)とデータ取得のロジックを分離できる点が主な利点です。</p>

      <Analogy label="💡 たとえるなら">
        Front Controllerは「ビルの正面玄関に立つ受付」です。誰が来ても必ずここを通り、身分証チェック(認証)を済ませてから該当のフロアへ案内されます。Page Controllerは逆に「フロアごとに別々の入口と受付がある」状態で、フロアごとの案内はしやすい一方、身分証チェックを毎回ロビーごとに用意する手間があります。
      </Analogy>

      <p>次のページでは、業務ロジックをどうオブジェクトとして表現するかという<Term>ドメインモデル系</Term>(Domain Model・Transaction Script・Table Module)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Front Controller</h4><p>全リクエストを1つの窓口で受け止め、共通処理を一元管理する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Page Controller</h4><p>ページごとに専用のコントローラを用意し、処理を集約する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Template View</h4><p>HTMLテンプレートにデータを差し込み、構造とロジックを分離する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/gui" tag="設計">GUI系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-model" tag="設計">ドメインモデル系</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
