import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GUI系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>GUI系 ― 画面とロジックをどう切り離すか</h1>
        <Lead>
          <Term>GUI系</Term>は、1979年のMVCから1990年代のDocument-Viewまで、「画面の表示」と「業務ロジック」をどう分離するかを追求してきた系統です。今のWebフロントエンドの多くのフレームワークも、この系統の考え方を土台にしています。
        </Lead>
      </Hero>

      <Heading num="01">共通する発想</Heading>
      <p>
        GUIプログラムでは、画面の見た目とその裏で動く業務ロジックを同じコードに書いてしまいがちです。すると、デザインを1つ変えただけのつもりが業務ロジックまで壊れる、あるいはロジックのテストのために画面を毎回操作しなければならない、といった問題が起きます。GUI系の各スタイルは、この境界線をどこに引くかについて少しずつ異なる答えを出してきました。
      </p>

      <Heading num="02">MVC ― Model・View・Controllerの3分割</Heading>
      <p>
        Smalltalk環境で生まれた<Term>MVC</Term>は、データと業務ロジックを持つModel、画面表示を担うView、利用者の入力を受けてModelを更新するControllerの3役に分ける、最も基本的なスタイルです。表示と業務ロジックの分離という発想の原点であり、後続のPAC・MVPも、名前の異なる同種の3分割のバリエーションと言えます。
      </p>

      <Heading num="03">MVP ― テストしやすさを優先する</Heading>
      <p>
        <Term>MVP(Model-View-Presenter)</Term>は、MVCのControllerが持っていたロジックをより厳密にPresenterへ移し、Viewは「Presenterから指示されたとおりに表示するだけ」の薄い層にします。
      </p>

      <DiagramFrame
        slug="design-architecture-app-gui-mvc-mvp"
        aspect="680 / 290"
        caption="MVCとMVPの違い。左のMVCでは、Controllerが入力を受けてModelを更新し、ModelがViewへ変更を通知する三角形の関係になるため、Viewを描かないとテストしにくい。右のMVPでは、Viewは入力をPresenterへ渡すだけの薄い層になり、ViewとPresenterの間をインターフェースで区切るので、画面を描画せずにPresenterの単体テストが書ける。"
      />

      <Heading num="04">PACとDocument-View</Heading>
      <table>
        <thead>
          <tr><th>スタイル</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">PAC</td>
            <td>MVCの3要素を1つのエージェントにまとめ、複雑なGUIを階層構造として組み立てる。採用は限定的で、考え方はMVC・MVPに引き継がれた</td>
          </tr>
          <tr>
            <td className="hl">Document-View</td>
            <td>編集対象のデータ(Document)と表示(View)を分離し、1つのDocumentに複数のViewを持たせやすくする。今日のコンポーネント指向UIでは別の形に置き換わっている</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        MVCは「厨房(Model)・ホール(View)・注文を受けて厨房に伝える店員(Controller)」という役割分担です。MVPはこの店員(Presenter)の権限をさらに強め、ホールは「言われた料理を運ぶだけ」の存在にします。PACは、この3人組を店舗ごとのユニットとして何店舗も入れ子に組み合わせるイメージです。
      </Analogy>

      <Heading num="05">今のコンポーネント指向UIとの関係</Heading>
      <p>
        Reactのようなコンポーネント指向のUIでは、MVCの3分割がそのまま現れることは少なくなりました。ただし「表示だけを担う部品」と「状態とロジックを担う部品」を分けるという発想自体は健在で、状態ロジックを別の関数へ切り出す手法は、MVPがViewを薄くしたのと同じ動機に立っています。名前が変わっても、境界線の引き方の問いは残り続けています。リクエスト処理の側から同じ問いを扱ったのが、次の<Link href="/design/architecture-app-web">Web系</Link>です。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>MVC</h4><p>Model・View・Controllerの3役に分ける、表示とロジック分離の原点。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>MVP</h4><p>ロジックをPresenterに寄せ、Viewを薄くしてテストしやすくする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>問いは今も同じ</h4><p>フレームワークが変わっても「境界線をどこに引くか」は残る。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-gui" />
    </DocsPage>
  );
}
