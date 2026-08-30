import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "マイクロサービスアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>マイクロサービスアーキテクチャ ― チームごとに独立してデプロイする</h1>
        <Lead>
          モノリシックなアプリケーションや<Link href="/design/architecture-soa">SOA</Link>では、複数のチームが1つの大きなコードベースと共有データベースを触るため、独立した開発・デプロイが難しく、開発速度が上がりませんでした。2011年頃に広まった<Term>マイクロサービスアーキテクチャ</Term>は、サービスを徹底的に独立させることでこれを解決しようとします。
        </Lead>
      </Hero>

      <Heading num="01">境界づけられたコンテキストと粒度</Heading>
      <p>
        分割は、行数などの機械的な基準ではなく、<Link href="/design/methodology-ddd">ドメイン駆動設計</Link>の<Term>境界づけられたコンテキスト</Term>を単位にします。これは「1つの業務概念が、1つの一貫したモデル・言葉で完結する範囲」のことです。マイクロという名前ですが、粒度はコード量ではなくこの業務上の境界で決めるのが原則です。
      </p>

      <Heading num="02">データ分離 ― ここが本質</Heading>
      <p>
        SOAが抱えた「共有サービス・共有データへの依存が変更を波及させる」という問題への回答として、各サービスが<Term>自分専用のデータベース</Term>を持ち、他のサービスのデータへ直接アクセスしません。
      </p>

      <DiagramFrame
        slug="design-architecture-microservices-data"
        aspect="680 / 300"
        caption="共有データベースとサービスごとの専用データベースの比較。左は注文・在庫・配送が1つのDBを参照する形で、テーブル定義を1つ変えると全サービスに影響が及ぶ。右は各サービスが専用DBを持ち、他サービスのDBは直接触らずAPIやイベント経由でやり取りする形。独立してデプロイできる代わりに、またがる整合性はSagaやTCCで取ることになる。"
      />

      <Heading num="03">通信 ― 賢いエンドポイント、単純なパイプ</Heading>
      <p>
        サービス間の通信は、同期のREST/gRPCで直接呼び合う方法と、<Link href="/design/architecture-event-driven">イベント駆動</Link>の非同期メッセージングで疎結合につなぐ方法があります。マイクロサービスの世界では「賢いのはエンドポイント(サービス自身)で、パイプ(通信経路)は単純であるべき」という考え方が好まれ、ESBのような中央の賢い基盤には頼らない傾向があります。
      </p>

      <Heading num="04">コレオグラフィとオーケストレーション</Heading>
      <p>
        複数サービスにまたがる業務フローの調整にも2つの流儀があります。中央の司令塔が各サービスを呼び出して手順を管理する<Term>オーケストレーション</Term>と、各サービスがイベントを見て自律的に次の一手を判断する<Term>コレオグラフィ</Term>です。後者はより疎結合ですが、全体の流れを1箇所で把握しにくくなります。
      </p>

      <Heading num="05">トランザクションとAPIレイヤー</Heading>
      <p>
        データベースが分かれているため、複数サービスにまたがる処理を1つのACIDトランザクションでまとめることはできません。代わりに、各サービスでの処理を段階的に実行し失敗したら補償処理で取り消す<Term>Saga</Term>や、Try-Confirm-Cancelで予約から確定する<Term>TCC</Term>のような、結果整合性を前提にした設計が必要になります。詳しくは<Link href="/database/distributed-transactions">分散トランザクション</Link>で扱います。また外部からの入口として<Term>APIゲートウェイ</Term>を置き、認証やルーティングをまとめて担わせることも一般的です。
      </p>

      <Heading num="06">運用面での重複への対処</Heading>
      <p>
        ロギングや認証といった横断的な処理を全サービスにコピーすると保守が大変になります。そこで各サービスに小さな補助プロセス(<Term>サイドカー</Term>)を並走させて共通処理を肩代わりさせる工夫が使われます。フロントエンド側でも、画面を機能単位のチームごとに分割する<Term>マイクロフロントエンド</Term>という発展形があります。
      </p>

      <Analogy label="💡 たとえるなら">
        1つの大きな会社を、それぞれ独自の在庫・独自の会計を持つ小さな専門店の集まりに分割するようなものです。1つの店が改装しても他の店は営業を続けられますが、店同士の取引や、複数店にまたがる注文の管理には、1つの会社だった頃にはなかった調整の手間が生まれます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>境界づけられたコンテキストで分ける</h4><p>行数ではなく、業務上の一貫した境界を単位にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データも分離する</h4><p>専用DBを持たせることで、本当の意味での独立デプロイが成立する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分散の複雑さと引き換え</h4><p>結果整合性・分散トランザクション・運用の重複という新しい課題を負う。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-microservices" />
    </DocsPage>
  );
}
