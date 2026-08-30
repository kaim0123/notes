import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "サービスベースアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>サービスベースアーキテクチャ ― SOAとマイクロサービスの中間</h1>
        <Lead>
          <Link href="/design/architecture-soa">SOA</Link>は社内の機能を再利用可能なサービスへ分けましたが、サービスの粒度が細かくなりすぎて全体の構成や連携が複雑になりがちでした。2000年代後半に登場した<Term>サービスベースアーキテクチャ</Term>は、もっと粗い粒度でシンプルにサービスを分割する、Webアプリケーション向けの現実的な選択肢です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        SOAのようにサービスを何十個にも分けると、サービス間の連携や運用そのものが重くなります。かといって1つの巨大なモノリスに戻すのも避けたい。「1つのアプリケーションを、少数の粗い粒度のサービスに分ける」というシンプルな折衷案が求められました。
      </p>

      <DiagramFrame
        slug="design-architecture-granularity-spectrum"
        aspect="700 / 280"
        caption="分割の粒度を並べたスペクトル。左から、モノリス(1アプリ・1DB、境界は曖昧)、モジュラーモノリス(1プロセス・1DBだが内部にモジュール境界がある)、サービスベース(4から12個のサービス、DBは共有することもある)、マイクロサービス(境界ごとに独立し、サービスごとに専用DBを持つ)の順に並び、右へ行くほど独立性が上がり運用コストも上がる。"
      />

      <Heading num="02">サービスの設計と粒度</Heading>
      <p>
        1つのアプリケーションを、一般に4〜12個程度の<Term>ドメインサービス</Term>に分割します。これはSOAのサービスよりずっと粗く、マイクロサービスよりも大きな単位です。各サービスは業務上のまとまった領域(注文管理、顧客管理など)を1つ丸ごと担当し、独立してデプロイできます。データベースは共有したままでも構わない点が、マイクロサービスとの大きな違いです。
      </p>

      <Heading num="03">UIとAPIゲートウェイの選択肢</Heading>
      <table>
        <thead>
          <tr><th>選択肢</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">単一のUI</td><td>1つの画面から複数のサービスを呼び出す。最も単純</td></tr>
          <tr><td className="hl">サービスごとのUI</td><td>サービスごとに別々のUIを持たせる。リリースの独立性が高い</td></tr>
          <tr><td className="hl">ゲートウェイなし</td><td>外部から各サービスへ直接つなぐ。構成は単純だが横断処理が重複する</td></tr>
          <tr><td className="hl">APIゲートウェイあり</td><td>認証やレート制限を1箇所にまとめられるが、単一障害点になりうる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        1つの大きなレストランの厨房を、前菜・メイン・デザートという3〜4部門くらいに分けるイメージです。SOAのように野菜切り係・火入れ係・盛り付け係まで細かく分けるのではなく、大きすぎず小さすぎない、現場が回しやすい粒度で担当を分けます。
      </Analogy>

      <Heading num="04">向き不向き</Heading>
      <p>
        「マイクロサービスほどの運用コストは負えないが、モノリスの複雑さも避けたい」という多くのWebアプリにとって現実的な落とし所です。データベースを共有できるぶん、<Link href="/database/distributed-transactions">分散トランザクション</Link>の複雑さを負わずに済むのが最大の利点と言えます。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>粗い粒度で分ける</h4><p>SOAより少ない、4〜12個程度のドメインサービスに分割する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DBは共有してよい</h4><p>分散トランザクションの複雑さを負わずに、独立デプロイの利点だけ取る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>UIとゲートウェイは選択</h4><p>チーム編成やリリース事情に応じて構成を選べる。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-service-based" />
    </DocsPage>
  );
}
