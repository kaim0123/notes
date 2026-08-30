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
  title: "責務駆動設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計思想 1990年代前半</Eyebrow>
        <h1>責務駆動設計(RDD) ― データではなく役割から設計する</h1>
        <Lead>
          Rebecca Wirfs-Brockが提唱した<Term>責務駆動設計(Responsibility-Driven Design, RDD)</Term>は、「このクラスはどんなデータを持つか」ではなく、「このオブジェクトは何をする<Term>責務</Term>を負い、誰と<Term>協力</Term>するか」から設計を始める方法論です。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p><Link href="/design/methodology/object-centric">オブジェクト中心設計</Link>の「名詞からクラスを見つける」やり方は、属性ばかりが並ぶ、ふるまいの弱いクラスを生みがちでした。RDDはこの反省から、まず「誰が・何を・誰と一緒にやるか」という<Term>責務と協力関係</Term>を先に決め、データはその責務を果たすために後から必要な分だけ持たせます。</p>

      <Heading num="02">CRCカード</Heading>
      <p>RDDを実践する代表的な手法が<Term>CRCカード</Term>です。1枚のカードに、Class(クラス名)・Responsibility(そのクラスの責務)・Collaborator(協力する相手のクラス)を書き出し、チームでカードを動かしながら「この責務は本当にこのクラスが持つべきか」を議論するワークショップ手法として広まりました。</p>

      <table>
        <thead>
          <tr><th>要素</th><th>問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Class</td><td>このクラスは何という役割か</td></tr>
          <tr><td className="hl">Responsibility</td><td>このクラスは何を知っていて、何をする責任があるか</td></tr>
          <tr><td className="hl">Collaborator</td><td>この責務を果たすために、誰と協力する必要があるか</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        会社の組織図を「誰がどんな情報を持っているか」ではなく「誰が何の仕事を担当し、誰と連携するか」で描くようなものです。データ中心設計が社員名簿(属性一覧)から始まるのに対し、RDDは職務記述書(責務一覧)から始まります。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>責務を先に決めるため、クラスがふるまいを持ち、凝集度の高い設計になりやすいという利点があります。CRCカードを使ったワークショップという実践形式そのものは、今日の開発現場で明示的に行われることは少なくなりましたが、その考え方は<Link href="/design/principles/solid">単一責任の原則(SRP)</Link>や、Craig Larmanが体系化した<Term>GRASP(General Responsibility Assignment Software Patterns)</Term>、そして<Link href="/design/methodology/ddd">ドメイン駆動設計</Link>のドメインサービスに、発展的に引き継がれています。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>責務と協力関係が起点</h4><p>データではなく「何をする役割か」からクラスを設計する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CRCカードで対話しながら設計</h4><p>チームで責務の妥当性を議論する軽量なワークショップ手法。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>SRP・GRASP・DDDへ継承</h4><p>手法自体は下火でも、考え方は現代の設計原則・方法論の随所に息づく。</p></Card>
      </CardGrid>

      <p>次のページでは、データや責務ではなく、ユーザーとシステムのやり取りの「シナリオ」から設計する<Link href="/design/methodology/use-case-driven">ユースケース中心設計</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology/contract" tag="設計">契約による設計</RelatedLink>
                    <RelatedLink href="/design/methodology/use-case-driven" tag="設計">ユースケース中心設計</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則(SRP)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
