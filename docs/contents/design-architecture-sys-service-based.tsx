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
  title: "サービスベースアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 2000年代後半</Eyebrow>
        <h1>サービスベースアーキテクチャ ― SOAとマイクロサービスの中間</h1>
        <Lead>
          <Link href="/design/architecture/sys/soa">SOA</Link>は社内の機能を再利用可能なサービスへ分けましたが、サービスの粒度が細かくなりすぎて、全体の構成や連携が複雑になりがちでした。2000年代後半に登場した<Term>サービスベースアーキテクチャ</Term>は、もっと粗い粒度でシンプルにサービスを分割する、Webアプリケーション向けの現実的な選択肢です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>SOAのようにサービスを何十個・何百個にも分けると、サービス間の連携や運用そのものが重くなります。かといって1つの巨大なモノリスに戻すのも避けたい。「1つのアプリケーションを、少数の粗い粒度のサービスに分ける」というシンプルな折衷案が求められました。</p>

      <Heading num="02">サービスの設計と粒度</Heading>
      <p>サービスベースアーキテクチャでは、1つのアプリケーションを一般的に4〜12個程度の<Term>ドメインサービス</Term>に分割します。これはSOAのサービスよりずっと粗く、マイクロサービスよりも大きな単位です。各サービスは業務上のまとまった領域(例: 注文管理、顧客管理)を1つ丸ごと担当し、独立してデプロイできます。</p>

      <Heading num="03">ユーザーインターフェースのオプション</Heading>
      <p>フロントエンドの構成にはいくつかの選択肢があります。1つの画面(モノリシックなUI)から複数のサービスを呼び出す構成が最も単純ですが、サービスごとに別々のUIを持たせる構成にすることもできます。どちらを選ぶかは、チーム編成やリリースの独立性の要求次第です。</p>

      <Heading num="04">APIゲートウェイのオプション</Heading>
      <p>外部(ブラウザやモバイルアプリ)からのアクセスを、複数あるサービスに直接つなぐか、<Term>APIゲートウェイ</Term>を1枚挟んで一元的な窓口にするかも選択できます。ゲートウェイを置くと、認証やレート制限といった横断的な処理を1箇所にまとめられますが、単一障害点になりうる点には注意が必要です。</p>

      <Analogy label="💡 たとえるなら">
        1つの大きなレストランの厨房を、「前菜」「メイン」「デザート」という3〜4部門くらいに分けるイメージです。SOAのように「野菜切り係」「火入れ係」「盛り付け係」まで細かく分けるのではなく、大きすぎず小さすぎない、現場が回しやすい粒度で担当を分けます。
      </Analogy>

      <p>サービスベースアーキテクチャは「マイクロサービスほどの運用コストは負えないが、モノリスの複雑さも避けたい」という多くのWebアプリにとって現実的な落とし所です。次のページでは、さらにサービスを独立させ、データも含めて完全に分離する<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>粗い粒度のサービス分割</h4><p>SOAより少ない、4〜12個程度のドメインサービスに分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>UIは単一/複数を選べる</h4><p>チーム編成やリリース事情に応じてフロントエンドの構成を選択する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ゲートウェイは任意</h4><p>横断的な処理をまとめるか、サービスに直接繋ぐかを選べる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/sys/space-based" tag="設計">スペースベースアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/soa" tag="設計">オーケストレーション駆動SOA</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
