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
  title: "GUI系(アプリケーションアーキテクチャ)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アプリケーションアーキテクチャ GUI系</Eyebrow>
        <h1>GUI系 ― 画面とロジックをどう切り離すか</h1>
        <Lead>
          <Term>GUI系</Term>は、1979年のMVCから1990年代のDocument-Viewまで、「画面(GUI)の表示」と「業務ロジック」をどう分離するかを追求してきた系統です。今のWebフロントエンドの多くのフレームワークも、この系統の考え方を土台にしています。
        </Lead>
      </Hero>

      <Heading num="01">GUI系に共通する発想</Heading>
      <p>GUIプログラムでは、画面の見た目(ボタンの配置、色)と、その裏で動く業務ロジック(注文を確定する、など)を同じコードに書いてしまいがちです。すると、デザインを1つ変えただけのつもりが業務ロジックまで壊れる、あるいはロジックのテストのために画面を毎回操作しなければならない、といった問題が起きます。GUI系の4スタイルは、この「表示」と「ロジック」の境界線をどこに引くかについて、少しずつ異なる答えを出してきました。</p>

      <Heading num="02">MVC(1979) ― Model・View・Controllerの3分割</Heading>
      <p>Smalltalk環境で生まれた<Term>MVC(Model-View-Controller)</Term>は、データと業務ロジックを持つ<Term>Model</Term>、画面表示を担う<Term>View</Term>、ユーザー入力を受けてModelを更新する<Term>Controller</Term>の3役に分ける、最も基本的なGUI系のスタイルです。表示と業務ロジックの分離という発想の原点であり、後続のPAC・MVPも、名前の異なる同種の3分割のバリエーションと言えます。</p>

      <Heading num="03">PAC(1980年代) ― 階層的に組み合わせる</Heading>
      <p><Term>PAC(Presentation-Abstraction-Control)</Term>は、MVCの3要素を「PACエージェント」という単位にまとめ、複雑なGUIを複数のPACエージェントの階層構造として組み立てる考え方です。1つの巨大な画面を、入れ子になった小さなPACエージェントの集まりとして構築できるため、複雑なGUIの階層的な構築に向いていました。ただし実務での採用は限定的で、考え方はMVCやMVPに引き継がれています。</p>

      <Heading num="04">MVP(1980年代後半) ― テストしやすさを優先</Heading>
      <p><Term>MVP(Model-View-Presenter)</Term>は、MVCのControllerが持っていたロジックをより厳密に<Term>Presenter</Term>へ移し、Viewは「Presenterから指示された通りに表示するだけ」の薄い層にします。ViewとPresenterの間をインターフェースで区切ることで、実際の画面を描画せずにPresenterの単体テストが書きやすくなる点がMVCとの大きな違いです。</p>

      <Heading num="05">Document-View(1990年代) ― 編集対象と表示の分離</Heading>
      <p><Term>Document-View</Term>は、Microsoft の MFC などデスクトップアプリで採用されたパターンで、編集対象のデータそのものを表す<Term>Document</Term>と、それを画面に映す<Term>View</Term>を分離します。1つのDocumentに対して複数のView(例: 同じデータを表とグラフで同時に表示)を持たせやすいのが特徴でした。今日のコンポーネント指向UI(React など)ではこの発想自体が別の形に置き換えられています。</p>

      <Analogy label="💡 たとえるなら">
        MVCは「厨房(Model)・ホール(View)・注文を受けて厨房に伝える店員(Controller)」という役割分担です。MVPはこの店員(Presenter)の権限をさらに強め、ホール(View)は「言われた料理を運ぶだけ」の存在にします。PACは、この3人組を「店舗ごとのユニット」として何店舗も入れ子に組み合わせるイメージです。
      </Analogy>

      <p>次のページでは、GUIではなくWebアプリのリクエスト処理に特化した<Term>Web系</Term>(Front Controller・Page Controller・Template View)を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>MVC</h4><p>Model・View・Controllerの3役に分けて表示とロジックを分離する原点。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>PAC</h4><p>3要素を1単位にし、複雑なGUIを階層的に組み合わせる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>MVP</h4><p>ロジックをPresenterに寄せ、Viewを薄くしてテストしやすくする。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Document-View</h4><p>編集対象のデータと表示を分離し、複数Viewを持たせやすくする。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/layered" tag="設計">レイヤー系</RelatedLink>
                    <RelatedLink href="/design/architecture/app/web" tag="設計">Web系</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
