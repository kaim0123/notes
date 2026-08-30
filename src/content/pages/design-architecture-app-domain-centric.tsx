import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ドメイン中心系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ドメイン中心系 ― 依存の矢印をドメインへ向ける</h1>
        <Lead>
          <Term>ドメイン中心アーキテクチャ系</Term>は、2003年のHexagonal Architectureから2012年のClean Architectureまで、「業務ロジックを、DBやUIといった技術的な詳細への依存から完全に独立させたい」という一貫した動機を持つ系統です。
        </Lead>
      </Hero>

      <Heading num="01">なぜ依存の向きにこだわるのか</Heading>
      <p>
        <Link href="/design/architecture-app-layered">レイヤードアーキテクチャ</Link>では、ビジネス層がDB層に依存する(ビジネス層のコードの中にDB特有の型が登場する)ことがよくあります。すると、DBを変更するだけで業務ロジックまで書き換える羽目になります。この系統の各スタイルは、「依存の矢印を常にドメインへ向ける」という同じ原則を、少しずつ異なる形で具体化してきました。
      </p>

      <Heading num="02">Hexagonal Architecture ― ポートとアダプタ</Heading>
      <p>
        <Term>Hexagonal Architecture</Term>(ポート&アダプタとも呼ばれます)は、Alistair Cockburnが提唱しました。ドメインを中心に置き、DB・UI・外部APIとのやり取りは、ドメインが定義する<Term>ポート</Term>(インターフェース)と、それを実装する<Term>アダプタ</Term>を介して行います。
      </p>

      <DiagramFrame
        slug="design-architecture-app-hexagonal-ports"
        aspect="660 / 300"
        caption="Hexagonal Architectureのポートとアダプタ。中央の六角形がドメインで、その辺に入力ポート・保存ポート・通知ポートといったインターフェースが刻まれている。左側には画面やAPIのアダプタが、右側にはPostgreSQL用アダプタ・テスト用のインメモリ実装・メール送信アダプタが並び、いずれもポートに差し込まれる形でつながる。DBを差し替えてもアダプタを1つ書くだけで、ドメインのコードには手を入れない。"
      />

      <p>
        <Link href="/design/architecture-app-data-access">Repository</Link>も、このポートの一種と考えられます。ポートを定義するのはドメイン側だという点が重要で、これが<Link href="/design/principles-solid">依存性逆転の原則</Link>そのものです。
      </p>

      <Heading num="03">Onion ArchitectureとClean Architecture</Heading>
      <table>
        <thead>
          <tr><th>スタイル</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Onion(2007)</td>
            <td>ドメインを中心とした同心円状の層で表現し、依存は常に外側から内側へだけ向かうようにする。この表現がClean Architectureに整理・統合された</td>
          </tr>
          <tr>
            <td className="hl">Clean(2012)</td>
            <td>Hexagonal・Onionを整理し、Entities → Use Cases → Interface Adapters → Frameworks の同心円と「内側の円は外側について何も知らない」という依存性のルールにまとめた</td>
          </tr>
          <tr>
            <td className="hl">DCI(2006)</td>
            <td>オブジェクトの本質的なデータと、特定の状況で担う役割を分離し、同じオブジェクトが場面ごとに異なる役割を演じられるようにする。普及は限定的</td>
          </tr>
        </tbody>
      </table>
      <p>
        Clean ArchitectureのUse Case層は、<Link href="/design/methodology-use-case-driven">ユースケース中心設計</Link>の制御オブジェクトの直接の子孫です。同心円の図で示される「依存は内向き」という規則は、<Link href="/design/architecture">アーキテクチャ</Link>の04節の図と同じことを言っています。
      </p>

      <Analogy label="💡 たとえるなら">
        ドメインを城の本丸に例えると、Hexagonalは「城門(ポート)を決めておき、そこを通る使者(アダプタ)なら誰でも中に入れる」仕組みです。Onion・Cleanは、その城を本丸・二の丸・三の丸と同心円状の堀で囲み、「外側から本丸への一方通行」というルールを明文化したものと言えます。
      </Analogy>

      <Heading num="04">コストも正直に見る</Heading>
      <p>
        差し替えやすさと引き換えに、インターフェースと実装の往復、ドメインオブジェクトとDBの行の相互変換といった記述が増えます。業務ルールが薄いCRUD中心のアプリでは、この手間が見合わないことのほうが多くなります。「DBを本当に差し替えるのか」ではなく「業務ルールを技術の都合から守る価値があるほど、そのルールが厚いか」で判断するのが実務的です。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Hexagonal</h4><p>ポート&アダプタで、外部技術への依存をドメインの外へ追い出す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Onion / Clean</h4><p>同心円と依存性のルールで、内向きの依存を規則として明文化する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>厚い業務ルールにこそ効く</h4><p>薄いCRUDでは、往復と変換の手間だけが残る。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-domain-centric" />
    </DocsPage>
  );
}
