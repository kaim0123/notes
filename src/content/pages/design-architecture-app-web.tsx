import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Web系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>Web系 ― リクエストの受け方とHTMLの組み立て方</h1>
        <Lead>
          <Term>Web系</Term>は、Martin Fowlerが2002年の著書『Patterns of Enterprise Application Architecture』で整理した、Webアプリケーション特有の課題への回答です。「どこでリクエストを受け止めるか」と「どうHTMLを組み立てるか」という、Webならではの2つの問いを扱います。
        </Lead>
      </Hero>

      <Heading num="01">Front Controller ― 1つの窓口で受け止める</Heading>
      <p>
        <Term>Front Controller</Term>は、アプリケーションへの全リクエストを1つの窓口で受け止め、そこで認証・ログ出力・ルーティングといった共通処理を行ったうえで、個別の処理へ振り分ける考え方です。今日のほとんどのWebフレームワークは、内部的にこの仕組みでルーティングを行っています。
      </p>

      <DiagramFrame
        slug="design-architecture-app-web-controllers"
        aspect="680 / 280"
        caption="Front ControllerとPage Controllerの対比。左のFront Controllerでは、すべてのリクエストが1つの窓口を通り、認証・ログ・ルーティングを済ませてから注文・商品・会員へ振り分けられるため、共通処理は1箇所だけで済む。右のPage Controllerでは、ページごとに専用の入口があり、認証やログを各入口で重複して書くことになる。"
      />

      <Heading num="02">Page Controller ― ページごとに専用のコントローラ</Heading>
      <p>
        対照的に<Term>Page Controller</Term>は、画面ごとに専用のコントローラを用意し、そのページに関する処理をそこに集約します。ページ単位で処理がまとまっているため理解しやすい一方、認証チェックなどの共通処理をページごとに重複して書きがちという弱点があります。多くの現代フレームワークはFront Controllerを採用しているため、単独で採用される機会は少なくなりました。
      </p>

      <Heading num="03">Template View ― テンプレートにデータを差し込む</Heading>
      <p>
        <Term>Template View</Term>は、HTMLの雛形にマーカーを埋め込んでおき、そこにサーバー側で取得したデータを差し込んでHTMLを生成する考え方です。テンプレートエンジン全般はもちろん、ReactのJSXも広い意味ではこの発想を受け継いでいます。HTMLの構造とデータ取得のロジックを分離できる点が主な利点です。
      </p>

      <Analogy label="💡 たとえるなら">
        Front Controllerは「ビルの正面玄関に立つ受付」です。誰が来ても必ずここを通り、身分証チェックを済ませてから該当のフロアへ案内されます。Page Controllerは逆に「フロアごとに別々の入口と受付がある」状態で、フロアごとの案内はしやすい一方、身分証チェックを毎回用意する手間があります。
      </Analogy>

      <p>
        なお、共通処理を1箇所に集めるという発想は、リクエストが本処理へ届く前に通る層(ミドルウェアやプロキシ)としても現れます。どこで受け止めるかという問いは、<Link href="/design/architecture-app-layered">レイヤー系</Link>の「どの層に責務を置くか」と地続きです。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Front Controller</h4><p>全リクエストを1つの窓口で受け、共通処理を一元管理する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Page Controller</h4><p>ページごとに処理を集約する。分かりやすいが共通処理が重複する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Template View</h4><p>テンプレートにデータを差し込み、構造とロジックを分離する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-web" />
    </DocsPage>
  );
}
