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
  title: "コスト管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>コスト管理 ― 無駄な費用を防ぐ</h1>
        <Lead>
          クラウドは「使った分だけ払う」従量課金が基本のため、機能追加を重ねるうちに気づかぬコストが積み上がりがちです。<Term>何にいくらかかっているか</Term>を可視化し、典型的な無駄を潰す視点を持ちます。
        </Lead>
      </Hero>

      <Heading num="01">クラウド費用の内訳</Heading>
      <p>クラウドの請求は、性質の異なる複数の要素の合計です。<Link href="/cloud/aws/compute">コンピューティング</Link>・<Link href="/cloud/aws/storage">ストレージ</Link>ページで扱った各サービスは、この4つのどれか(または複数)で課金されています。</p>

      <table>
        <thead>
          <tr><th>要素</th><th>課金の考え方</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コンピューティング</td><td>稼働時間・実行時間に応じて課金</td><td>EC2の起動時間、Lambdaの実行回数・時間</td></tr>
          <tr><td className="hl">ストレージ</td><td>保存しているデータ量に応じて課金</td><td>S3・EBSの保存GB数</td></tr>
          <tr><td className="hl">データ転送(egress)</td><td>クラウドの外に出ていく通信量に応じて課金</td><td>CDN・APIレスポンスの転送量</td></tr>
          <tr><td className="hl">リクエスト数</td><td>API呼び出しの回数に応じて課金</td><td>マネージドDB・サーバーレス関数の呼び出し回数</td></tr>
        </tbody>
      </table>

      <p>特に見落とされがちなのが<Term>データ転送量(egress)</Term>です。クラウド事業者間・クラウドからインターネットへの転送には課金される一方、同一クラウド内の入り(ingress)は多くの場合無料のため、「入るのはタダ、出るのは有料」という非対称な構造になっています。</p>

      <Heading num="02">無駄なコストが生まれる典型パターン</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>過剰なプロビジョニング</h4>
          <p>ピーク時に合わせてサーバーサイズを固定してしまい、閑散期にも同じ料金を払い続ける。オートスケーリングや従量課金のサーバーレスに置き換えることで解消できる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>使われていないリソースの放置</h4>
          <p>削除し忘れた検証環境、アタッチされていないディスク、停止しただけで削除していないインスタンスなど、「動いていないのに課金され続ける」リソース。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ストレージ階層の未活用</h4>
          <p>アクセス頻度の低い古いデータを、高頻度アクセス向けの高価な階層に置いたままにする。低頻度アクセス向けの安価な階層への自動移行(ライフサイクルルール)で削減できる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>ログ・バックアップの無制限保持</h4>
          <p>保持期間を設定せずログやバックアップを蓄積し続け、ストレージコストが際限なく増加する。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        クラウドコストの管理は「電気代の管理」に似ています。契約アンペア(過剰なプロビジョニング)を実使用量より大きく取りすぎていないか、使っていない部屋の電気(放置リソース)がつけっぱなしになっていないか ― 個々の家電の消費電力(サービス単価)以上に、「無駄に動いているもの」に気づくことがコスト削減の近道です。
      </Analogy>

      <Heading num="03">見える化と予算アラート</Heading>
      <p>コストは事後に請求書で驚くのではなく、事前に見える化しておきます。AWSであれば<Term>Cost Explorer</Term>でサービス別・期間別の費用推移を可視化し、<Term>Budgets</Term>で「今月の想定予算を超えそうになったら通知する」アラートを設定できます。個人開発では、月ごとの上限額を決めてアラートを仕込んでおくだけでも、想定外の高額請求を早期に察知できます。</p>

      <Heading num="まとめ">内訳を知り、無駄を仕組みで防ぐ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>課金の内訳を理解する</h4><p>コンピューティング・ストレージ・転送量・リクエスト数のどれで課金されているかを把握する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>典型的な無駄を疑う</h4><p>過剰プロビジョニング・放置リソース・無期限保持が主な原因になりやすい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>予算アラートで先に気づく</h4><p>請求書で驚く前に、しきい値超過を通知する仕組みを入れておく。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                    <RelatedLink href="/ops/data" tag="サービス運営">データ管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
