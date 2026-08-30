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
  title: "マルチメディアの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>マルチメディアの全体像 ― コンテンツの種類と届け方</h1>
        <Lead>
          文字・音声・画像・動画といった複数の種類の情報を組み合わせて扱うのが<Term>マルチメディア</Term>です。ここでは、各フォーマットの詳細に入る前に、コンテンツの種類、複数のデータをまとめる入れ物、そして少しずつ再生する配信方式という3つの全体像を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">マルチメディアとWebコンテンツ</Heading>
      <p><Term>マルチメディア</Term>は、文字・音声・静止画・動画など、性質の異なる複数のメディアを組み合わせて表現する技術です。Web上で提供されるこうしたコンテンツを<Term>Webコンテンツ</Term>と呼びます。</p>
      <p>関連情報どうしをリンクでたどれるようにした仕組みが<Term>ハイパーメディア</Term>です。文字だけをリンクでつないだハイパーテキストを、画像や音声・動画にまで広げた概念で、Webページはその代表例です。文書の見た目とレイアウトを保ったまま配布できる形式として<Term>PDF</Term>もよく使われます。</p>

      <Heading num="02">コンテナフォーマット ― 中身をまとめる入れ物</Heading>
      <p>動画ファイルは、映像だけでなく音声や字幕など複数のデータで成り立っています。これらを1つのファイルにまとめる「入れ物」が<Term>コンテナフォーマット</Term>です。MP4・MOV・AVIといった拡張子は、多くの場合この入れ物の種類を表しています。</p>
      <p>ここで区別したいのが、「入れ物(コンテナ)」と「中身の符号化方式(コーデック)」は別だということです。同じMP4でも、中の映像がH.264かHEVCかで異なります。コーデックの詳細は「<Link href="/theory/media/video">動画フォーマット</Link>」で扱います。</p>

      <Analogy label="💡 たとえるなら">
        コンテナは「弁当箱」、コーデックは「中のおかずの調理法」です。同じ弁当箱(MP4)でも、中身の作り方(H.264・HEVC)は違います。箱の形だけでは、中身がどう作られているかまでは分かりません。
      </Analogy>

      <Heading num="03">ストリーミング ― 少しずつ受け取りながら再生</Heading>
      <p>大きな動画・音声ファイルを、すべてダウンロードし終えてから再生するのではなく、<strong>受信しながら並行して再生</strong>する方式が<Term>ストリーミング</Term>です。データを少しずつ受け取り、手元に一時的にためながら(バッファリング)再生するため、待ち時間が短くて済みます。</p>
      <p>視聴者が好きなタイミングで再生できる<Term>ビデオオンデマンド(VOD)</Term>や、リアルタイムに配信するライブ配信も、この仕組みの上に成り立っています。</p>

      <Heading num="まとめ">種類・入れ物・届け方</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>マルチメディアは複数メディアの組み合わせ</h4><p>文字・音声・画像・動画を組み合わせ、リンクでたどれるのがハイパーメディアです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>コンテナとコーデックは別</h4><p>入れ物(MP4など)と中身の符号化方式(H.264など)を区別します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ストリーミングは受信しながら再生</h4><p>全体を待たずに、少しずつ受け取って再生します。</p></Card>
      </CardGrid>
      <p>次からは、音声・画像・動画それぞれのフォーマットを具体的に見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/media/image" tag="情報メディア">画像フォーマット</RelatedLink>
                    <RelatedLink href="/theory/media/compression" tag="情報メディア">圧縮の考え方</RelatedLink>
                    <RelatedLink href="/theory/encoding" tag="情報科学">文字コード</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
