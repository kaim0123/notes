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
  title: "音声フォーマット",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>音声フォーマット ― 波を数字に変える</h1>
        <Lead>
          音はもともと連続的な空気の振動(アナログ)です。これをコンピュータで扱うには、数字の並び(デジタル)に変換する必要があります。ここでは、その基本となるPCMとサンプリングの考え方、そして代表的なファイル形式を整理します。
        </Lead>
      </Hero>

      <Heading num="01">PCMとサンプリング ― アナログをデジタルにする</Heading>
      <p>連続的な音の波を数字に変える基本方式が<Term>PCM(パルス符号変調)</Term>です。波を一定の時間間隔で区切って高さを測り(<Term>標本化 / サンプリング</Term>)、その高さを段階的な数値に置き換え(<Term>量子化</Term>)、2進数で表す(<Term>符号化</Term>)、という3ステップで行います。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>意味</th><th>高いと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">サンプリング周波数</td><td>1秒間に何回、波の高さを測るか(Hz)</td><td>より高い音まで再現できる(CDは44.1kHz)</td></tr>
          <tr><td className="hl">量子化ビット数</td><td>測った高さを何段階で表すか(bit)</td><td>音の強弱をきめ細かく表現できる(CDは16bit)</td></tr>
        </tbody>
      </table>
      <p>どちらも数字を大きくするほど原音に忠実になりますが、その分データ量も増えます。音質とファイルサイズはトレードオフの関係です。</p>

      <Analogy label="💡 たとえるなら">
        サンプリングは「なめらかな坂道を階段で表す」ようなものです。段の間隔を細かく(サンプリング周波数)、段の高さを細かく(量子化ビット数)するほど、元の坂道に近づきますが、記録する段の数は増えていきます。
      </Analogy>

      <Heading num="02">代表的な音声フォーマット</Heading>
      <table>
        <thead>
          <tr><th>形式</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">WAV</td><td>PCMをそのまま記録する無圧縮形式。高音質だがファイルは大きい</td></tr>
          <tr><td className="hl">MP3</td><td>人が聞き取りにくい音を削る非可逆圧縮。小さいサイズで広く普及</td></tr>
          <tr><td className="hl">MIDI</td><td>音そのものではなく「どの楽器で、どの音を、どう鳴らすか」という演奏情報を記録する</td></tr>
        </tbody>
      </table>
      <p>WAVが波形そのものを記録するのに対し、<Term>MIDI</Term>は演奏の指示だけを記録する点が根本的に異なります。MIDIは楽譜に近く、データが非常に小さい代わりに、再生する機器によって音色が変わります。可逆・非可逆といった圧縮の考え方は「<Link href="/theory/media/compression">圧縮の考え方</Link>」で扱います。</p>

      <Heading num="まとめ">測って、刻んで、記録する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>PCMは標本化・量子化・符号化</h4><p>波を一定間隔で測り、段階的な数値にして記録します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>細かくするほど高音質・大容量</h4><p>サンプリング周波数と量子化ビット数を上げると原音に近づきます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>MIDIは波形でなく演奏情報</h4><p>WAV・MP3が音そのもの、MIDIは「鳴らし方」を記録します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/media/image" tag="情報メディア">画像フォーマット</RelatedLink>
                    <RelatedLink href="/theory/media/compression" tag="情報メディア">圧縮の考え方</RelatedLink>
                    <RelatedLink href="/theory/media/basics" tag="情報メディア">マルチメディアの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
