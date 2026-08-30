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
  title: "圧縮の考え方",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>圧縮の考え方 ― 元に戻せるか、戻せないか</h1>
        <Lead>
          画像・音声・動画の各フォーマットの裏側には、共通して「圧縮」という技術があります。ここでは、圧縮と伸張の関係、そして「完全に元へ戻せる可逆圧縮」と「戻せない代わりに小さくできる非可逆圧縮」という決定的な違いを整理します。
        </Lead>
      </Hero>

      <Heading num="01">圧縮と伸張 ― データを小さくして、戻す</Heading>
      <p><Term>圧縮</Term>は、データの規則性や無駄を利用して、情報の量を減らす処理です。圧縮したデータを元の使える形に戻す処理を<Term>伸張(解凍)</Term>と呼びます。どれだけ小さくできたかは<Term>圧縮率</Term>で表します。</p>
      <p>圧縮の基本的な発想は「繰り返しをまとめる」ことです。たとえば「AAAAA」を「A×5」と表せば短くなります。同じ記号が続く部分を回数で表すこうした手法が、圧縮の出発点です。より理論的な情報量・符号化の考え方は「<Link href="/theory/probability">確率・統計と情報理論</Link>」「<Link href="/theory/encoding">文字コード</Link>」と補い合います。</p>

      <Heading num="02">可逆圧縮と非可逆圧縮</Heading>
      <p>圧縮には、元へ完全に戻せるかどうかで2種類あります。</p>
      <table>
        <thead>
          <tr><th></th><th>可逆圧縮</th><th>非可逆圧縮</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">元に戻せるか</td><td>完全に戻せる(情報を失わない)</td><td>戻せない(一部の情報を捨てる)</td></tr>
          <tr><td className="hl">圧縮率</td><td>控えめ</td><td>高い(大きく小さくできる)</td></tr>
          <tr><td className="hl">向く用途</td><td>文書・プログラム・ZIPなど、1ビットも失えないもの</td><td>写真・音声・動画など、多少の劣化が許容できるもの</td></tr>
          <tr><td className="hl">代表例</td><td>ZIP・PNG・GIF</td><td>JPEG・MP3・MPEG</td></tr>
        </tbody>
      </table>
      <p>プログラムや文書は1ビットでも欠ければ壊れるため、<Term>可逆圧縮</Term>でなければなりません。一方、写真や音楽は、人が気づきにくい情報を捨てても実用上問題ないため、<Term>非可逆圧縮</Term>で大きくサイズを減らせます。非可逆で圧縮したファイルは、伸張しても元とは完全に同じにはならない点に注意します。</p>

      <Analogy label="💡 たとえるなら">
        可逆圧縮は「布団を圧縮袋にしまう」ようなもの ― 空気を抜いて小さくしても、開ければ元通りにふくらみます。非可逆圧縮は「要点だけメモして原稿を捨てる」ようなもの ― かさは大幅に減りますが、捨てた細部はもう戻りません。
      </Analogy>

      <Heading num="03">アーカイブ ― まとめて1つにする</Heading>
      <p>複数のファイルやフォルダを1つにまとめる操作を<Term>アーカイブ</Term>と呼びます。代表的な<Term>ZIP</Term>形式は、まとめる機能と可逆圧縮を兼ね備えており、複数ファイルを1つの小さなファイルにして配布・保存できます。圧縮とアーカイブは別の概念ですが、ZIPのように両方を同時に行う形式が広く使われています。</p>

      <Heading num="まとめ">失うか失わないかで選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>圧縮して伸張で戻す</h4><p>規則性を使って小さくし、使うときに元の形へ戻します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>可逆は完全復元、非可逆は高圧縮</h4><p>文書・プログラムは可逆、写真・音声・動画は非可逆が向きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ZIPはまとめて可逆圧縮</h4><p>アーカイブ(まとめる)と圧縮を兼ね、配布・保存に使われます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/probability" tag="情報科学">確率・統計と情報理論</RelatedLink>
                    <RelatedLink href="/theory/media/image" tag="情報メディア">画像フォーマット</RelatedLink>
                    <RelatedLink href="/theory/media/graphics" tag="情報メディア">色・解像度・グラフィックス応用</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
