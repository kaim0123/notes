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
  title: "ユースケース中心設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計思想 1992</Eyebrow>
        <h1>ユースケース中心設計 ― 「利用者とシステムのやり取り」から設計する</h1>
        <Lead>
          Ivar Jacobsonが1992年の著書『Object-Oriented Software Engineering』で提唱した<Term>ユースケース駆動設計</Term>は、データでも責務でもなく、<Term>アクター(利用者)がシステムとどうやり取りするか</Term>というシナリオを設計の出発点にする方法論です。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p>ユースケース中心設計では、まず「利用者は何をしたいか」を<Term>ユースケース</Term>(例: 「顧客が商品を注文する」)として書き出します。オブジェクトやクラスは、このユースケースを実現するために後から見つけ出される存在であり、要求分析と設計をユースケースという1つの成果物でつなぐのが狙いです。</p>

      <Heading num="02">ロバストネス図 ― 3種類のオブジェクト</Heading>
      <p>Jacobsonは、ユースケースをオブジェクト設計へ落とし込む中間ステップとして<Term>ロバストネス図(Robustness Diagram)</Term>を提案し、オブジェクトを3種類のステレオタイプに分類しました。</p>

      <table>
        <thead>
          <tr><th>種類</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">境界オブジェクト(Boundary)</td><td>アクターとシステムの接点(画面・API)を表す</td></tr>
          <tr><td className="hl">制御オブジェクト(Control)</td><td>ユースケース1つ分の処理の流れを取りまとめる</td></tr>
          <tr><td className="hl">実体オブジェクト(Entity)</td><td>永続化されるドメインのデータを表す</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        映画の脚本づくりに似ています。まず「主人公が何を達成する話か」というシーン(ユースケース)を書き、そこから初めて「どんな登場人物(オブジェクト)が必要か」を割り出します。登場人物のプロフィール(データ)を先に決めてから物語を組み立てるデータ中心設計とは、出発点が逆です。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>要求と設計をユースケースという1つの言葉でつなげるため、「なぜこのクラスが必要なのか」を利用者視点で説明しやすくなります。1990年代にはRational Unified Process(RUP)の中核として広まりましたが、プロセス全体としては下火になりました。一方で考え方そのものは今も生きており、<Link href="/design/architecture/app/domain-centric">Clean Architecture</Link>が「Use Case(インタラクタ)」という層を明示的に置いているのは、まさにこの発想の直接の子孫です。ユーザーストーリー駆動の要求定義にも、同じ「利用者のシナリオを起点にする」思想が受け継がれています。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ユースケースが起点</h4><p>「利用者は何をしたいか」というシナリオから設計を始める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>境界・制御・実体の3分類</h4><p>ロバストネス図でユースケースをオブジェクトへ橋渡しする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Clean ArchitectureのUse Case層へ</h4><p>プロセスとしては下火だが、考え方は現代のアーキテクチャに生きている。</p></Card>
      </CardGrid>

      <p>次のページでは、ここまでの方法論の到達点として、業務知識とコードを同じ言葉でつなぐ<Link href="/design/methodology/ddd">ドメイン駆動設計(DDD)</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology/responsibility-driven" tag="設計">責務駆動設計</RelatedLink>
                    <RelatedLink href="/design/methodology/ddd" tag="設計">ドメイン駆動設計</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ系</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
