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
  title: "画像フォーマット",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>画像フォーマット ― 点で描くか、式で描くか</h1>
        <Lead>
          デジタル画像には、色のついた点を敷き詰めて表す方式と、線や図形を数式で表す方式の2系統があります。この違いを押さえたうえで、代表的なファイル形式と、画像の細かさを表す解像度の読み方を整理します。
        </Lead>
      </Hero>

      <Heading num="01">ラスタとベクター ― 2つの表し方</Heading>
      <table>
        <thead>
          <tr><th></th><th>ラスタデータ(ビットマップ)</th><th>ベクターデータ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">表し方</td><td>色のついた点(画素)を敷き詰める</td><td>点・線・図形を数式で表す</td></tr>
          <tr><td className="hl">拡大すると</td><td>点が粗くなり、ギザギザ(ジャギー)が出る</td><td>数式を計算し直すため、劣化しない</td></tr>
          <tr><td className="hl">得意なもの</td><td>写真など複雑で微妙な階調</td><td>ロゴ・図形・文字など</td></tr>
          <tr><td className="hl">代表形式</td><td>JPEG・PNG・GIF・BMP</td><td>SVG・AI(イラスト系)</td></tr>
        </tbody>
      </table>
      <p>写真のように色が細かく変化するものは<Term>ラスタデータ</Term>、ロゴや図面のように拡大縮小しても鮮明さを保ちたいものは<Term>ベクターデータ</Term>が向きます。ラスタ画像を編集するのが<Term>ペイントソフト</Term>、ベクター画像を編集するのが<Term>ドローソフト</Term>です。</p>

      <Analogy label="💡 たとえるなら">
        ラスタは「モザイクタイルで描いた絵」、ベクターは「定規とコンパスで描いた設計図」です。モザイクは近づくとタイルの粒が見えますが、設計図は何倍に引き伸ばしても線は鋭いままです。
      </Analogy>

      <Heading num="02">代表的な画像フォーマット</Heading>
      <table>
        <thead>
          <tr><th>形式</th><th>圧縮</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">JPEG</td><td>非可逆</td><td>写真向き。高い圧縮率だが、保存を繰り返すと劣化する。透過は不可</td></tr>
          <tr><td className="hl">PNG</td><td>可逆</td><td>劣化しない。透過(背景の透明化)に対応。イラスト・図に向く</td></tr>
          <tr><td className="hl">GIF</td><td>可逆</td><td>256色まで。簡単なアニメーションと透過に対応</td></tr>
          <tr><td className="hl">BMP</td><td>無圧縮</td><td>Windows標準。劣化しないがファイルが大きい</td></tr>
          <tr><td className="hl">TIFF</td><td>可逆/無圧縮</td><td>印刷・保存向けの高品質形式</td></tr>
        </tbody>
      </table>
      <p>写真をたくさん扱うならJPEG、透過や図の鮮明さが要るならPNG、と用途で選びます。画像には撮影日時やカメラ設定などの付帯情報を埋め込む<Term>Exif</Term>という仕組みもあります。可逆・非可逆の意味は「<Link href="/theory/media/compression">圧縮の考え方</Link>」で扱います。</p>

      <Heading num="03">画素と解像度 ― 画像の細かさ</Heading>
      <p>ラスタ画像を構成する1つ1つの点が<Term>画素(ピクセル)</Term>です。画像の細かさを表すのが<Term>解像度</Term>で、単位面積あたりの画素の多さで表します。<Term>dpi</Term>(1インチあたりのドット数、主に印刷)や<Term>ppi</Term>(1インチあたりの画素数、主に画面)といった単位が使われ、数値が大きいほどきめ細かく表現できます。1画素で表せる色の段階数(<Term>階調</Term>)については「<Link href="/theory/media/graphics">色・解像度・グラフィックス応用</Link>」で扱います。</p>

      <Heading num="まとめ">点か式か、用途で選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ラスタは点、ベクターは式</h4><p>写真はラスタ、ロゴ・図面はベクターが向きます。拡大時の劣化が異なります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>JPEGは写真、PNGは透過・図</h4><p>非可逆のJPEGと可逆・透過対応のPNGを、用途で使い分けます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>解像度は画素の密度</h4><p>dpi・ppiで表し、数値が大きいほどきめ細かくなります。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/media/video" tag="情報メディア">動画フォーマット</RelatedLink>
                    <RelatedLink href="/theory/media/graphics" tag="情報メディア">色・解像度・グラフィックス応用</RelatedLink>
                    <RelatedLink href="/theory/media/compression" tag="情報メディア">圧縮の考え方</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
