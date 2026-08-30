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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CPUの性能と高速化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>CPUの性能と高速化 ― クロック・CPI・MIPS</h1>
        <Lead>
          「<Link href="/computer/cpu">CPUと命令実行</Link>」で、CPUが命令サイクルを繰り返すことを見ました。ここでは、その繰り返しが<strong>どれだけ速いか</strong>を測る指標――クロック周波数・CPI・MIPS――と、速度を稼ぐためのパイプライン・マルチコアを整理します。試験では計算や比較がそのまま問われる領域です。
        </Lead>
      </Hero>

      <p>CPUの速さは1つの数字では決まりません。「1拍がどれだけ速いか」「1命令に何拍かかるか」「結局1秒に何命令こなせるか」という、角度の違う指標を組み合わせて捉えます。</p>

      <Heading num="01">速さを測る3つの指標</Heading>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th></tr>
          <tr><td className="hl">クロック周波数</td><td>1秒あたりのクロック(拍)の数。単位はHz。大きいほど1拍が速い。</td></tr>
          <tr><td className="hl">CPI</td><td>1命令の実行に平均何クロックかかるか(Clocks Per Instruction)。小さいほど効率的。</td></tr>
          <tr><td className="hl">MIPS</td><td>1秒あたり何百万命令を実行できるか。大きいほど速い。</td></tr>
        </tbody>
      </table>

      <p>3つは独立ではなく、次のように結びついています。</p>
      <Aside label="試験メモ ― 計算式">
        <strong>1命令あたりの時間 ＝ CPI ÷ クロック周波数</strong><br />
        <strong>MIPS ＝ クロック周波数(MHz) ÷ CPI</strong><br />
        例: クロック2GHz(＝2000MHz)、CPIが2のCPUなら――<br />
        1命令あたりの時間 ＝ 2 ÷ (2×10⁹) ＝ 1ナノ秒、MIPS ＝ 2000 ÷ 2 ＝ <strong>1000 MIPS</strong>。
      </Aside>

      <Analogy label="💡 たとえるなら">
        工場のベルトコンベアを思い浮かべてください。<strong>クロック周波数</strong>はベルトが動く速さ、<strong>CPI</strong>は製品1個を仕上げるのに必要なベルトの拍数、<strong>MIPS</strong>は結局1秒で何個出荷できたかです。ベルトを速くしても(高クロック)、1個に手間がかかれば(高CPI)出荷数は伸びません。
      </Analogy>

      <Heading num="02">高速化のしくみ ― パイプラインとマルチコア</Heading>
      <p>クロックを上げ続けるのには発熱などの限界があります。そこで、同じクロックでもより多くの命令をこなす工夫が使われます。</p>

      <h3>パイプライン ― 作業を重ねてスループットを上げる</h3>
      <p><Term>パイプライン</Term>は、命令サイクルのフェッチ・デコード・実行…を少しずつずらして<strong>複数の命令を重ねて処理</strong>する方式です。1命令の所要時間そのものは縮まりませんが、単位時間に流れる命令数(スループット)が上がります。ただし分岐(条件によって次の命令が変わる)が起きると流れが乱れ、効果が下がります。</p>

      <h3>マルチコア ― 処理する頭を増やす</h3>
      <p><Term>マルチコア</Term>は、1つのチップに複数のコア(CPUの中核)を載せ、<strong>複数の処理を同時に走らせる</strong>方式です。うまく並列化できる処理ほど効果が大きくなります。</p>

      <Aside label="次への布石">
        「複数のコアで同時に処理する」という話をもっと一般化すると、SISD・SIMD・MIMDといった並列処理の分類や、並列化で得られる速度向上の限界を示すアムダールの法則へ広がります。これらは発展トピックとして別ページで扱う予定です。
      </Aside>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>速さは3指標で捉える</h4>
          <p>クロック周波数(1拍の速さ)・CPI(1命令の拍数)・MIPS(1秒の命令数)。高クロックでも高CPIなら伸びません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>式で結びつく</h4>
          <p>MIPS ＝ クロック(MHz) ÷ CPI。試験ではこの関係を使った計算がそのまま問われます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>高速化はパイプラインとマルチコア</h4>
          <p>命令を重ねて流す(パイプライン)、頭を増やす(マルチコア)。クロックだけに頼らず速度を稼ぎます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/cpu" tag="コンピュータ">CPUと命令実行 ― 命令サイクル・レジスタ・割込み</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― キャッシュと実効アクセス時間</RelatedLink>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
