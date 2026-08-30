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
  title: "動画フォーマット",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>動画フォーマット ― パラパラ漫画を効率よく</h1>
        <Lead>
          動画は、少しずつ違う静止画を高速で切り替えて動いて見せる仕組みです。しかしその画像をすべてそのまま保存すると膨大になるため、コーデックによる圧縮が欠かせません。ここではフレームの考え方と、代表的な圧縮方式を整理します。
        </Lead>
      </Hero>

      <Heading num="01">フレームとフレームレート</Heading>
      <p>動画を構成する1枚1枚の静止画を<Term>フレーム</Term>と呼びます。1秒間に何枚のフレームを表示するかが<Term>フレームレート(fps)</Term>で、数値が大きいほど動きがなめらかになります。テレビや動画配信では30fpsや60fpsがよく使われます。</p>

      <Analogy label="💡 たとえるなら">
        動画は「パラパラ漫画」です。1ページ1ページ(フレーム)は静止画ですが、速くめくる(高いフレームレート)ほどなめらかに動いて見えます。ただしページ数が増えるほど、本(ファイル)は分厚くなります。
      </Analogy>

      <Heading num="02">コーデックによる圧縮 ― 変化した部分だけ送る</Heading>
      <p>動画は静止画の連続なので、そのままではデータ量が膨大です。そこで<Term>コーデック</Term>で圧縮します。動画圧縮の鍵は、隣り合うフレームは<strong>ほとんど同じ</strong>だという点です。背景が動かないなら、変化した部分だけを記録すれば、全フレームを丸ごと保存せずに済みます(フレーム間圧縮)。</p>
      <table>
        <thead>
          <tr><th>コーデック / 規格</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MPEG</td><td>動画圧縮の代表的な規格群。MPEG-2はDVD・地デジなどで普及</td></tr>
          <tr><td className="hl">H.264(MPEG-4 AVC)</td><td>高い圧縮率で広く普及。Web動画・スマホの定番</td></tr>
          <tr><td className="hl">HEVC(H.265)</td><td>H.264よりさらに高効率。4K/8Kなど高解像度向け</td></tr>
        </tbody>
      </table>
      <p>これらの符号化された映像は、音声などとともに<Term>コンテナ</Term>(MP4・QuickTime(MOV)・AVIなど)にまとめられます。入れ物(コンテナ)と中身(コーデック)が別であることは「<Link href="/theory/media/basics">マルチメディアの全体像</Link>」で見た通りです。</p>

      <Heading num="03">高解像度の動画 ― 4K・8K</Heading>
      <p>画面の画素数が多いほど精細な映像になります。フルHD(約207万画素)に対し、<Term>4K</Term>はその約4倍、<Term>8K</Term>はさらにその約4倍の画素数を持ちます。精細さが増すぶんデータ量も跳ね上がるため、HEVCのような高効率コーデックとセットで使われます。</p>

      <Heading num="まとめ">枚数と差分で効率化する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>動画はフレームの連続</h4><p>フレームレートが高いほどなめらかで、データ量も増えます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>コーデックは差分で圧縮</h4><p>隣接フレームの変化した部分だけを記録し、H.264・HEVCなどが使われます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>高解像度ほど高効率圧縮が必要</h4><p>4K/8Kのデータ量には、HEVCのような効率のよいコーデックが欠かせません。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/media/compression" tag="情報メディア">圧縮の考え方</RelatedLink>
                    <RelatedLink href="/theory/media/graphics" tag="情報メディア">色・解像度・グラフィックス応用</RelatedLink>
                    <RelatedLink href="/theory/media/basics" tag="情報メディア">マルチメディアの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
