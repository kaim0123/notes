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
  title: "Cloud CDN",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>Cloud CDN ― Googleのエッジネットワークで配信を高速化する</h1>
        <Lead>
          <Term>Cloud CDN</Term>は、Googleのグローバル<Term>CDN(Content Delivery Network)</Term>で、AWSの<Term>CloudFront</Term>に相当します。オリジン(<Link href="/cloud/gcp/storage/cloud-storage">Cloud Storage</Link>・<Term>Cloud Run</Term>・<Term>Compute Engine</Term>など)の内容を世界中のエッジ拠点にキャッシュし、利用者から地理的に近い拠点から配信します。
        </Lead>
      </Hero>

      <Heading num="01">Cloud Load Balancingとの組み合わせ</Heading>
      <p>Cloud CDNは単体では動かず、<Term>Cloud Load Balancing</Term>のバックエンドサービスに<Term>CDNを有効化</Term>する形で使います。HTTP(S)ロードバランサの前面にCDNを置くことで、静的ファイルやキャッシュ可能なAPIレスポンスをエッジで返し、オリジンへのリクエスト数を減らします。</p>

      <Heading num="02">キャッシュの考え方</Heading>
      <p>CDNは<Link href="/dev/cache">キャッシュの全体像</Link>ページで見た「近くに複製を置く」戦略のネットワーク版です。<Term>Cache-Control</Term>ヘッダーや<Term>カスタムキャッシュキー</Term>で、どのレスポンスをどれだけ長くエッジに置くかを制御します。キャッシュできない動的コンテンツ(APIの個別レスポンスなど)は、そのままオリジンへ転送されます。</p>

      <Heading num="03">Cloud Storageをオリジンにする</Heading>
      <p>静的Webサイト(HTML・CSS・JS・画像)を<Link href="/cloud/gcp/storage/cloud-storage">Cloud Storage</Link>バケットに置き、Cloud CDN経由で配信する構成は、GCPで最もシンプルなホスティングパターンの1つです。バケットを直接公開するより、CDNを挟むことで転送量の削減とDDoS耐性の向上が期待できます。</p>

      <Analogy label="💡 たとえるなら">
        Cloud CDNは「全国チェーンのコンビニ受け取りロッカー」です。本店(オリジン)まで行かなくても、近所のロッカー(エッジ)で荷物(コンテンツ)を受け取れます。人気商品(よくアクセスされるファイル)ほど、ロッカーに常に補充(キャッシュ)されます。
      </Analogy>

      <Heading num="まとめ">Cloud CDNの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Load Balancingとセットで使う</h4><p>CDN単体ではなく、LBのバックエンドにCDNを有効化する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cache-Controlでキャッシュ方針を決める</h4><p>静的コンテンツは長く、動的APIは短く(またはキャッシュしない)と設計する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud Storage + CDNが定番</h4><p>静的サイトやSPAの配信に、シンプルでコスト効率のよい構成になる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/network" tag="Google Cloud">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/gcp/storage/cloud-storage" tag="Google Cloud">Cloud Storage</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/cloudfront" tag="AWS">CloudFront</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
