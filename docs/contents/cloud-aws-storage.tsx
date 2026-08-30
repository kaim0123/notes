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
        <Eyebrow>AWS</Eyebrow>
        <h1>ストレージ ― データをどの形で置くか</h1>
        <Lead>
          <Term>ストレージ</Term>は「データをどういう単位で・どう扱えるものとして保存するか」を決めるサービス群です。ファイルそのものとして扱う<Term>オブジェクトストレージ</Term>、OSから見た「ディスク」として扱う<Term>ブロックストレージ</Term>、複数サーバーから同時にアクセスできる<Term>ファイルストレージ</Term>の3つの形があり、用途によって選ぶものが変わります。
        </Lead>
      </Hero>

      <Heading num="01">S3 ― オブジェクトストレージ</Heading>
      <p><Term>S3(Simple Storage Service)</Term>は、ファイルを「オブジェクト」という単位のまま、事実上無制限の容量で保存できるサービスです。OSのファイルシステムのようにディレクトリ階層でマウントするのではなく、<Term>バケット</Term>という入れ物にHTTP経由でオブジェクトを出し入れします。画像・動画・ログ・バックアップなど、「そのまま保存して、そのまま取り出す」用途に向いています。ストレージクラスやアクセス制御の詳細は<Link href="/cloud/aws/storage/s3">S3のページ</Link>で扱います。</p>

      <table>
        <thead>
          <tr><th>ストレージクラス</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Standard</td><td>即座に取り出せる、最も高頻度アクセス向け</td><td>Webサイトの画像・日常的にアクセスするデータ</td></tr>
          <tr><td className="hl">Infrequent Access(IA)</td><td>保存料金は安いが取り出し時に追加料金</td><td>月に数回程度しか見ないバックアップ</td></tr>
          <tr><td className="hl">Glacier</td><td>非常に安価だが、取り出しに数分〜数時間かかる</td><td>法令で保管が必要なだけの長期アーカイブ</td></tr>
        </tbody>
      </table>

      <Heading num="02">EBS ― ブロックストレージ</Heading>
      <p><Term>EBS(Elastic Block Store)</Term>は、<Link href="/cloud/aws/compute">EC2</Link>インスタンスに取り付ける「仮想ハードディスク」です。OSからは通常のディスクとして認識され、ファイルシステムを作ってフォルダ階層で自由に読み書きできます。EC2インスタンス本体を削除してもEBSボリュームだけを残すこともでき、インスタンスの入れ替えとデータの寿命を切り離せます。</p>

      <Heading num="03">EFS ― ファイルストレージ</Heading>
      <p><Term>EFS(Elastic File System)</Term>は、複数のEC2インスタンスから同時にマウントして共有できるファイルストレージです。EBSが「1台のサーバー専用のディスク」であるのに対し、EFSは「複数サーバーで共有するファイルサーバー」に近い役割を持ちます。</p>

      <Analogy label="💡 たとえるなら">
        S3は「倉庫の宅配ロッカー」に似ています。荷物(オブジェクト)ごとに伝票を貼って預け、必要なときに伝票番号(キー)で取り出しますが、ロッカーの中身を並べ替えたり直接歩き回ったりはできません。EBSは「自分専用の物置」で、棚を自由に組み替えて整理できますが、それは自分の部屋(1台のサーバー)にしか置けません。EFSは「マンションの共用倉庫」で、複数の部屋(複数のサーバー)から同時に出し入れできます。
      </Analogy>

      <Heading num="04">その他のストレージサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Storage Gateway</h4>
          <p>社内のオンプレミス機器から、S3などのクラウドストレージを「ローカルのディスク」のように見せる橋渡しサービス。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>S3 Glacier Deep Archive</h4>
          <p>Glacierよりもさらに安価で、取り出しに半日程度かかる最下層の保存先。法定保存年数が長いデータ向け。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ S3のライフサイクルルールを使うと、「作成から30日後にIAへ、90日後にGlacierへ」といった移行を自動化できる。</MarkNote>

      <Heading num="まとめ">「アクセスの単位」で選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>S3はオブジェクト単位</h4><p>HTTP経由でファイルそのものを出し入れする、事実上無制限のストレージ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>EBSはブロック単位</h4><p>1台のEC2インスタンス専用の仮想ディスクとして、OSから直接読み書きする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>EFSは複数サーバーでの共有向け</h4><p>ファイルシステムとして、複数のインスタンスから同時にマウントできる。</p></Card>
      </CardGrid>
      <p>保存したデータをどう検索・集計するかは、次のページで見る「<Link href="/cloud/aws/database">データベース</Link>」の役割です。一方、これらのストレージやサーバーを外部からどう到達可能にするかは「<Link href="/cloud/aws/network">ネットワーキング</Link>」が扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング</RelatedLink>
                    <RelatedLink href="/cloud/aws/database" tag="AWS">データベース</RelatedLink>
                    <RelatedLink href="/dev/cache" tag="開発">キャッシュの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
