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
  title: "マイクロサービスアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 2011年頃</Eyebrow>
        <h1>マイクロサービスアーキテクチャ ― チームごとに独立してデプロイする</h1>
        <Lead>
          モノリシックなアプリケーションや<Link href="/design/architecture/sys/soa">SOA</Link>では、複数のチームが1つの大きなコードベース・共有データベースを触るため、独立した開発・独立したデプロイが難しく、開発速度が上がりませんでした。2011年頃に広まった<Term>マイクロサービスアーキテクチャ</Term>は、サービスを徹底的に小さく・独立させることでこれを解決しようとします。
        </Lead>
      </Hero>

      <Heading num="01">境界づけられたコンテキストと粒度</Heading>
      <p>マイクロサービスの分割は、行数などの機械的な基準ではなく、<Term>境界づけられたコンテキスト(Bounded Context)</Term>というDDD(ドメイン駆動設計)の概念を単位にします。これは「1つの業務概念が、1つの一貫したモデル・言葉で完結する範囲」のことで、1つのサービスは1つの境界づけられたコンテキストに対応させます。「マイクロ」という名前ですが、<Term>粒度</Term>はコード量ではなく、この業務上の境界で決めるのが原則です。</p>

      <Heading num="02">データ分離</Heading>
      <p>SOAが抱えた「共有サービス・共有データへの依存が変更を波及させる」という問題への回答として、マイクロサービスでは各サービスが<Term>自分専用のデータベース</Term>を持ち、他のサービスのデータへ直接アクセスしません。データを含めて完全に分離することで、あるサービスの内部変更が他のサービスに影響しなくなり、本当の意味で独立したデプロイが可能になります。</p>

      <Heading num="03">通信 ― 賢いエンドポイント、単純なパイプ</Heading>
      <p>サービス間の通信は、同期のREST/gRPCで直接呼び合う方法と、<Link href="/design/architecture/sys/event-driven">イベント駆動</Link>の非同期メッセージングで疎結合につなぐ方法があります。マイクロサービスの世界では「賢いのはエンドポイント(サービス自身)で、パイプ(通信経路)は単純であるべき」という考え方が好まれ、ESBのような中央の賢い基盤には頼らない傾向があります。</p>

      <Heading num="04">コレオグラフィとオーケストレーション</Heading>
      <p>複数のサービスにまたがる業務フローをどう調整するかにも2つの流儀があります。中央の司令塔となるサービスが各サービスを呼び出して手順を管理する<Term>オーケストレーション</Term>と、各サービスがイベントを見て自律的に次の一手を判断する<Term>コレオグラフィ</Term>です。後者はより疎結合ですが、全体の流れを1箇所で把握しにくくなります。</p>

      <Heading num="05">トランザクションとAPIレイヤー</Heading>
      <p>データベースが分かれているため、複数サービスにまたがる処理を1つのACIDトランザクションでまとめることはできません。代わりに、各サービスでの処理を段階的に実行し、途中で失敗したら補償処理で取り消す<Link href="/database/distributed-transactions/saga">Saga</Link>や、Try-Confirm-Cancelで予約から確定する<Link href="/database/distributed-transactions/tcc">TCC</Link>のような、結果整合性を前提にした設計が必要になります。2PCとの違いや使い分けは「<Link href="/database/distributed-transactions">分散トランザクション</Link>」で詳しく扱います。また外部からの入り口として<Term>APIレイヤー</Term>(ゲートウェイ)を置き、サービスの発見・認証などをまとめて担わせることも一般的です。</p>

      <Heading num="06">運用面での再利用とフロントエンド</Heading>
      <p>ロギングや認証といった横断的な処理を、全サービスにコピーして持たせると保守が大変になります。そこで各サービスに小さな補助プロセス(サイドカー)を並走させて共通処理を肩代わりさせる<Term>運用面での再利用</Term>の工夫が使われます。フロントエンド側でも、画面を機能単位のチームごとに分割する<Term>マイクロフロントエンド</Term>という発展形があります。</p>

      <Analogy label="💡 たとえるなら">
        マイクロサービスは、1つの大きな会社を、それぞれ独自の在庫・独自の会計を持つ小さな専門店の集まりに分割するようなものです。1つの店が改装(デプロイ)しても他の店は営業を続けられますが、店同士の取引(通信)や、複数店にまたがる注文の管理(分散トランザクション)には、1つの会社だった頃にはなかった調整の手間が生まれます。
      </Analogy>

      <p>DBが分かれたときに必要になる<Link href="/database/distributed-transactions">分散トランザクション(Saga / TCC / 2PC)</Link>についてはデータベースセクションで詳しく扱います。次のページでは、分散の運用コストを避けつつ、マイクロサービスの良さを内部設計で取り込もうとする<Link href="/design/architecture/sys/modular-monolith">モジュラーモノリス</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>境界づけられたコンテキストで分割</h4><p>行数ではなく、業務上の一貫した境界を単位にサービスを分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データもサービスごとに分離</h4><p>専用データベースを持たせ、本当の意味での独立デプロイを実現する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分散が生む複雑さと引き換え</h4><p>結果整合性・分散トランザクション・運用面の重複という新しい課題を負う。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/distributed-transactions" tag="データベース">分散トランザクション</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/service-based" tag="設計">サービスベースアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/modular-monolith" tag="設計">モジュラーモノリス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
