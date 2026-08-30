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
  title: "Cloud Storage",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; ストレージ</Eyebrow>
        <h1>Cloud Storage ― バケットとオブジェクトで管理するオブジェクトストレージ</h1>
        <Lead>
          <Term>Cloud Storage</Term>は、ファイルを「オブジェクト」という単位のまま、事実上無制限の容量で保存できるサービスで、AWSの<Term>S3</Term>に相当します。<Term>バケット</Term>という入れ物の中に、<Term>オブジェクト名</Term>という文字列を使ってオブジェクトを出し入れします。
        </Lead>
      </Hero>

      <Heading num="01">フラットな名前空間 ― 「フォルダ」は見た目だけ</Heading>
      <p>Cloud StorageにはOSのようなディレクトリ階層は実在せず、すべてのオブジェクトはバケット直下にフラットに保存されます。管理コンソールで見える「フォルダ」は、オブジェクト名に含まれる<Term>/</Term>を区切り文字として見た目上表示しているだけで、実体は<code>images/2024/photo.jpg</code>のような1本の長い文字列です。</p>

      <Heading num="02">ストレージクラス ― アクセス頻度で保存料金を変える</Heading>
      <table>
        <thead>
          <tr><th>ストレージクラス</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Standard</td><td>即座に取り出せる、最も高頻度アクセス向け</td><td>Webサイトの画像・日常的にアクセスするデータ</td></tr>
          <tr><td className="hl">Nearline</td><td>月に1回程度のアクセス、保存料金が安い</td><td>バックアップ・月次レポート</td></tr>
          <tr><td className="hl">Coldline</td><td>年に1回程度のアクセス</td><td>災害復旧用バックアップ</td></tr>
          <tr><td className="hl">Archive</td><td>年に1回未満のアクセス、最も安価</td><td>法令で保管が必要なだけの長期アーカイブ</td></tr>
        </tbody>
      </table>
      <p><Term>ライフサイクルルール</Term>を設定すると、「作成から30日後にNearlineへ、365日後にArchiveへ」といった移行を人手を介さず自動化できます。</p>

      <Heading num="03">ロケーションタイプ ― どこに物理的に置くか</Heading>
      <p>バケット作成時に<Term>ロケーションタイプ</Term>を選びます。<Term>Region</Term>(単一リージョン)・<Term>Dual-Region</Term>(2リージョン)・<Term>Multi-Region</Term>(複数リージョン)があり、可用性と料金のトレードオフが変わります。データ所在地の要件が厳しい場合はRegion、高可用性が必要な静的コンテンツにはMulti-Region(<code>ASIA</code>・<code>US</code>・<code>EU</code>)が選ばれることが多いです。</p>

      <Heading num="04">アクセス制御</Heading>
      <p>オブジェクトへのアクセスは<Term>IAM</Term>と<Term>バケット/オブジェクトACL</Term>、<Term>署名付きURL</Term>で制御します。原則として<Term>Uniform bucket-level access</Term>を有効にし、IAMで一元管理するのが推奨されています。公開Webサイト用の静的ファイルは、必要最小限のバケットだけを公開し、<Link href="/cloud/gcp/network/cloud-cdn">Cloud CDN</Link>経由で配信する構成が一般的です。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Storageは「巨大な倉庫のロッカー室」です。ロッカー(バケット)ごとに荷物(オブジェクト)を預け、ラベル(オブジェクト名)1本で取り出します。StandardからArchiveへ移すライフサイクルは、「よく使う荷物は手の届く棚へ、滅多に触らない荷物は奥の長期保管庫へ自動で移す」仕組みに似ています。
      </Analogy>

      <Heading num="まとめ">Cloud Storageを構成する要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>バケットとオブジェクト名</h4><p>フラットな名前空間で、キー1本で直接オブジェクトを取得できる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ストレージクラスとライフサイクル</h4><p>アクセス頻度に応じて保存料金を最適化し、移行を自動化できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ロケーションタイプ</h4><p>Region・Dual-Region・Multi-Regionで、可用性とデータ所在地を設計する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/storage" tag="Google Cloud">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/gcp/network/cloud-cdn" tag="Google Cloud">Cloud CDN</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage/s3" tag="AWS">S3</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
