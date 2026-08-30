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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "廃棄管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>廃棄管理 ― 安全に手放し、証跡を残す</h1>
        <Lead>
          役目を終えた端末は、ただ捨てればよいわけではありません。ディスクには業務データが残っており、消さずに手放せば重大な情報漏えいになります。ライフサイクルの最後を締めるのが、<Term>データ消去</Term>・<Term>物理破壊</Term>・<Term>廃棄証明</Term>という3つの手当てです。
        </Lead>
      </Hero>

      <Heading num="01">なぜ「捨てる」だけでは危ないのか</Heading>
      <p>ファイルを「ゴミ箱から削除」しても、ディスク上の実データはすぐには消えず、<Term>管理情報が消えて見えなくなるだけ</Term>です。専用ツールを使えば復元できてしまうため、そのまま中古売却や廃棄に回すと、顧客情報や機密情報が第三者の手に渡るおそれがあります。実際、廃棄したはずのディスクからデータが復元され漏えいした事故は繰り返し起きています。だからこそ廃棄は、確実にデータを読めなくする<Term>統制された工程</Term>として扱います。</p>

      <Heading num="02">データ消去の方法</Heading>
      <p>データを復元不可能にする方法は、大きく<Term>論理消去</Term>と<Term>物理破壊</Term>に分かれます。端末を再利用・売却するなら論理消去、確実性を最優先するなら物理破壊、と目的で使い分けます。</p>
      <table>
        <thead>
          <tr><th>方法</th><th>やり方</th><th>再利用</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データ抹消(上書き)</td><td>ディスク全体を無意味なデータで複数回上書きし復元不能にする</td><td>可(端末は残る)</td></tr>
          <tr><td className="hl">暗号化消去</td><td>暗号化済みディスクの鍵を破棄し、中身を復号不能にする</td><td>可(高速)</td></tr>
          <tr><td className="hl">物理破壊</td><td>ディスクを破砕・穿孔して物理的に読めなくする</td><td>不可</td></tr>
          <tr><td className="hl">磁気消去(消磁)</td><td>強力な磁界で磁気記録を破壊する(HDD 向け)</td><td>不可</td></tr>
        </tbody>
      </table>
      <p>消去は国際的なガイドライン(<Term>NIST SP 800-88</Term> など)に沿った方式で行うのが望ましく、SSD と HDD では有効な方法が異なる点にも注意が必要です。上書きが効きにくい SSD では、暗号化消去や物理破壊が確実とされます。</p>

      <Heading num="03">廃棄証明と法令 ― 「消した」を証明する</Heading>
      <p>データを消したこと自体を<Term>証明</Term>できなければ、監査や取引先への説明で「本当に消したのか」を示せません。そこで、消去作業を行った日時・対象・方式を記した<Term>データ消去証明書</Term>や、破壊した機器を撮影した<Term>廃棄証明書</Term>を取得し、台帳と紐づけて保管します。廃棄をもって、その端末を資産台帳から正式に除却します。</p>
      <p>また、PC は法律上の<Term>産業廃棄物</Term>にあたり、処理を業者に委託する際は<Term>マニフェスト(産業廃棄物管理票)</Term>で最終処分までの流れを追跡する義務があります。リース機器の場合は「廃棄」ではなく<Term>返却</Term>になりますが、返却前にデータを消す責任は借り手側に残るため、扱いを混同しないことが大切です。</p>

      <Analogy label="💡 たとえるなら">
        端末の廃棄は<strong>重要書類の処分</strong>と同じです。ただゴミ箱に捨てる(単純削除)のではなく、シュレッダーにかけて読めなくし(データ消去・物理破壊)、「いつ・何を・どう処分したか」の記録を残す(廃棄証明)。書類を裏紙にして再利用するなら細断はできませんから、そのときは中身を塗りつぶす(論理消去)ことになります。「消したつもり」で終わらせないのが肝心です。
      </Analogy>

      <Aside label="豆知識">
        情報漏えいの多くは高度なサイバー攻撃ではなく、<strong>廃棄・返却時の消し忘れ</strong>のような足元の不備から起きます。廃棄はライフサイクルの最後にあたるため後回しにされがちですが、ここを統制できているかどうかが、組織全体のセキュリティ成熟度を映す鏡になります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>削除では消えていない</h4>
          <p>ゴミ箱からの削除では復元できてしまうため、上書き・暗号化消去・物理破壊で確実に読めなくします。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>目的で方法を選ぶ</h4>
          <p>再利用するなら論理消去、確実性を最優先するなら物理破壊。SSD と HDD で有効な方法も異なります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>証跡を残して除却する</h4>
          <p>消去・廃棄の証明書を取得し、マニフェストで追跡し、台帳から正式に除却して初めて完了です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/client/kitting" tag="コンピュータ">キッティングと配布・回収</RelatedLink>
                    <RelatedLink href="/computer/client/security" tag="コンピュータ">端末セキュリティ管理</RelatedLink>
                    <RelatedLink href="/ops/compliance" tag="サービス運営">法令・コンプライアンス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
