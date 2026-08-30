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
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SOLID",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>SOLID ― オブジェクト指向設計の基本5原則</h1>
        <Lead>
          <Term>SOLID</Term>は、1990年代にBertrand Meyer・Barbara Liskov・Robert C. Martinらが個別に提唱した5つの原則の頭文字を、1999年にMichael Feathersがまとめて名付けた総称です。<Link href="/design/paradigm-oop">オブジェクト指向</Link>でクラス設計をするときの、今も最も広く参照される判断基準です。
        </Lead>
      </Hero>

      <Heading num="01">5つの原則</Heading>
      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>原則</th>
            <th>提唱者</th>
            <th>なぜ生まれたか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1998</td>
            <td>単一責任の原則(SRP)</td>
            <td>Robert C. Martin</td>
            <td>1つのクラスが複数の理由で変更される問題を防ぐため</td>
          </tr>
          <tr>
            <td className="hl">1994</td>
            <td>開放閉鎖の原則(OCP)</td>
            <td>Bertrand Meyer</td>
            <td>機能追加のたびに既存コードを書き換える問題を減らすため</td>
          </tr>
          <tr>
            <td className="hl">1996</td>
            <td>リスコフの置換原則(LSP)</td>
            <td>Barbara Liskov</td>
            <td>継承による不正な置き換えを防ぐため</td>
          </tr>
          <tr>
            <td className="hl">1998</td>
            <td>インターフェース分離の原則(ISP)</td>
            <td>Robert C. Martin</td>
            <td>巨大なインターフェースへの依存を避けるため</td>
          </tr>
          <tr>
            <td className="hl">1996</td>
            <td>依存性逆転の原則(DIP)</td>
            <td>Robert C. Martin</td>
            <td>具体実装への依存をなくし、変更しやすくするため</td>
          </tr>
        </tbody>
      </table>
      <p>
        「SOLID」という名前自体は5つを覚えやすくまとめた総称にすぎません。名前を覚えることに意味はなく、5つの内容を個別に理解すれば十分です。
      </p>

      <Heading num="02">S ― 単一責任の原則(SRP)</Heading>
      <p>
        1つのクラスが変更される理由は1つだけであるべき、という原則です。「注文を計算する」機能と「注文を画面に表示する」機能を同じクラスに詰め込むと、画面のデザイン変更が計算ロジックのバグを生む、といった無関係な変更同士の衝突が起きやすくなります。
      </p>
      <Aside label="「責任」は誰から見た責任か">
        ここでいう責任は「機能が1つ」ではなく「<Term>変更を要求してくる人が1人</Term>」という意味です。同じ請求書クラスでも、金額の計算ルールは経理部門、帳票のレイアウトは営業部門から変更を頼まれるなら、それは2つの責任であり分けるべきだと判断します。
      </Aside>

      <Heading num="03">O ― 開放閉鎖の原則(OCP)</Heading>
      <p>
        拡張に対して開いていて、修正に対して閉じているべき、という原則です。新しい種類の処理を追加するとき、既存のクラスを書き換えるのではなく、新しいクラスを追加するだけで対応できるように設計します。
      </p>

      <DiagramFrame
        slug="design-principles-solid-ocp"
        aspect="680 / 300"
        caption="開放閉鎖の原則の前後を比べた図。左は支払い方法を分岐で書き分ける形で、方法を1つ増やすたびに既存クラスのif文に手が入り、動いていた処理まで壊しうる。右は支払い方法というインターフェースの下にカード・コンビニ・電子マネーの実装が並ぶ形で、新しい方式を足すときはクラスを1つ追加するだけで既存コードは1行も変わらない。"
      />

      <p>
        <Link href="/design/patterns-gof-algorithms">Strategy</Link>や<Link href="/design/patterns-gof-creation">Factory Method</Link>といったパターンは、この原則を具体化したものです。
      </p>

      <Heading num="04">L ― リスコフの置換原則(LSP)</Heading>
      <p>
        サブクラスはスーパークラスと置き換えても、プログラムの正しさが壊れてはいけないという原則です。「正方形は長方形の一種だから継承する」といった一見自然に見える継承関係が、実際には利用側の期待(幅と高さを独立に変えられる)を壊すことがある ―
        という点への警鐘として提唱されました。型が合うことと、振る舞いが期待どおりであることは別問題です。
      </p>

      <Heading num="05">I ― インターフェース分離の原則(ISP)</Heading>
      <p>
        クライアントに、使わないメソッドへの依存を強制してはいけないという原則です。1つの巨大なインターフェースに多くのメソッドを詰め込むと、一部しか使わないクライアントまでその全体に依存させられます。役割ごとに小さなインターフェースへ分割します。
      </p>

      <Heading num="06">D ― 依存性逆転の原則(DIP)</Heading>
      <p>
        上位のモジュールは下位のモジュールの具体実装に直接依存せず、両者とも抽象に依存すべきという原則です。これにより、DBの種類や外部APIといった具体的な実装を後から差し替えても、上位の業務ロジックへの影響を防げます。<Term>依存性注入(DI)</Term>は、この原則を実現する代表的な手法です。図解と詳しい説明は<Link href="/design/principles">設計原則</Link>の05節にあります。
      </p>

      <Analogy label="💡 たとえるなら">
        SOLIDは「1人1役」を徹底する原則群です。SRPは1人に仕事を1つだけ持たせること、OCPはその人のやり方を変えずに仕事を追加できるようにすること、LSPは代役を立てても元の役割をきちんと果たせるようにすること、ISPは係ごとに必要なマニュアルだけを渡すこと、DIPは上司が特定の部下ではなく役職に指示を出すことです。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>SRP</h4>
          <p>変更を要求してくる相手が違うなら、別の責任として分ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>OCP</h4>
          <p>既存コードを書き換えず、追加だけで機能拡張できるようにする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>LSP</h4>
          <p>サブクラスに置き換えても、利用側の期待を壊さない。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>ISP</h4>
          <p>使わないメソッドへの依存を強制する巨大インターフェースを避ける。</p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>DIP</h4>
          <p>具体的な実装ではなく、抽象に依存する。</p>
        </Card>
      </CardGrid>

      <p>
        次は、SOLID以降 ―
        2000年代に定着した<Link href="/design/principles-modern">現代の原則</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/principles-solid" />
    </DocsPage>
  );
}
