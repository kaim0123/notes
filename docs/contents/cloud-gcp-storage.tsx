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
  Mark,
  MarkNote,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ストレージ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>ストレージ ― データをどの形で置くか</h1>
        <Lead>
          <Term>ストレージ</Term>は「データをどういう単位で・どう扱えるものとして保存するか」を決めるサービス群です。ファイルそのものとして扱う<Term>オブジェクトストレージ</Term>、OSから見た「ディスク」として扱う<Term>ブロックストレージ</Term>、複数サーバーから同時にアクセスできる<Term>ファイルストレージ</Term>の3つの形があり、用途によって選ぶものが変わります。
        </Lead>
      </Hero>

      <Heading num="01">Cloud Storage ― オブジェクトストレージ</Heading>
      <p><Term>Cloud Storage</Term>は、ファイルを「オブジェクト」という単位のまま、事実上無制限の容量で保存できるサービスで、AWSの<Term>S3</Term>に相当します。<Term>バケット</Term>という入れ物にHTTP経由でオブジェクトを出し入れします。ストレージクラスやライフサイクルの詳細は<Link href="/cloud/gcp/storage/cloud-storage">Cloud Storageのページ</Link>で扱います。</p>

      <table>
        <thead>
          <tr><th>ストレージクラス</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Standard</td><td>即座に取り出せる、最も高頻度アクセス向け</td><td>Webサイトの画像・日常的にアクセスするデータ</td></tr>
          <tr><td className="hl">Nearline</td><td>月に1回程度のアクセス向け、保存料金が安い</td><td>バックアップ・月次レポート</td></tr>
          <tr><td className="hl">Coldline / Archive</td><td>年に数回以下のアクセス向け、さらに安価</td><td>長期アーカイブ・法令保管</td></tr>
        </tbody>
      </table>

      <Heading num="02">Persistent Disk ― ブロックストレージ</Heading>
      <p><Term>Persistent Disk</Term>は、<Link href="/cloud/gcp/compute">Compute Engine</Link>のVMに取り付ける「仮想ハードディスク」で、AWSの<Term>EBS</Term>に相当します。OSからは通常のディスクとして認識され、ファイルシステムを作ってフォルダ階層で自由に読み書きできます。VM本体を削除してもディスクだけを残すこともでき、スナップショットから別ゾーンへ復元することも可能です。</p>

      <Heading num="03">Filestore ― ファイルストレージ</Heading>
      <p><Term>Filestore</Term>は、複数のCompute Engine VMから同時にマウントして共有できるマネージドなNFSファイルサーバーで、AWSの<Term>EFS</Term>に相当します。Persistent Diskが「1台のVM専用のディスク」であるのに対し、Filestoreは「複数サーバーで共有するファイルサーバー」に近い役割を持ちます。</p>

      <Analogy label="💡 たとえるなら">
        Cloud Storageは「倉庫の宅配ロッカー」、Persistent Diskは「自分専用の物置」、Filestoreは「マンションの共用倉庫」です。この3層の比喩は<Link href="/cloud/aws/storage">AWSのストレージ</Link>ページと同じ考え方です。
      </Analogy>

      <Heading num="04">その他のストレージサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Storage Transfer Service</h4>
          <p>オンプレミスや他クラウドからCloud Storageへ大量データを移行するための転送サービス。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Local SSD</h4>
          <p>VMに直接接続する一時的な高速SSD。Persistent Diskより速いが、VM停止時にデータは消える。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Cloud Storageのライフサイクルルールで、「作成から30日後にNearlineへ」といった移行を自動化できる。</MarkNote>

      <Heading num="まとめ">「アクセスの単位」で選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Cloud Storageはオブジェクト単位</h4><p>HTTP経由でファイルそのものを出し入れする、事実上無制限のストレージ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Persistent Diskはブロック単位</h4><p>1台のVM専用の仮想ディスクとして、OSから直接読み書きする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Filestoreは複数サーバーでの共有向け</h4><p>NFSとして、複数のVMから同時にマウントできる。</p></Card>
      </CardGrid>
      <p>保存したデータをどう検索・集計するかは「<Link href="/cloud/gcp/database">データベース</Link>」の役割です。ストレージやサーバーを外部からどう到達可能にするかは「<Link href="/cloud/gcp/network">ネットワーキング</Link>」が扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/compute" tag="Google Cloud">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/gcp/database" tag="Google Cloud">データベース</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
