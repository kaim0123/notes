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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "情報メディア",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>情報メディア ― 文字・画像・音声を扱う共通の発想</h1>
        <Lead>
          文字・音声・静止画・動画など、性質の異なる複数のメディアを組み合わせて扱う技術が<Term>マルチメディア</Term>です。ここでは、複数のデータをまとめる入れ物、画像の2つの表し方、そして圧縮の考え方という、フォーマットの違いを理解する土台を整理します。
        </Lead>
      </Hero>

      <Heading num="01">マルチメディアとコンテナ・コーデック</Heading>
      <p>
        Web上で提供される、文字・音声・画像・動画を組み合わせたコンテンツを<Term>Webコンテンツ</Term>と呼びます。関連情報どうしをリンクでたどれるようにした仕組みが<Term>ハイパーメディア</Term>で、文字だけをリンクでつないだハイパーテキストを画像や音声・動画にまで広げた概念です。Webページはその代表例です。
      </p>
      <p>
        動画ファイルは、映像だけでなく音声や字幕など複数のデータで成り立っています。これらを1つのファイルにまとめる「入れ物」が<Term>コンテナフォーマット</Term>です。MP4・MOV・AVIといった拡張子は、多くの場合この入れ物の種類を表しています。ここで区別したいのが、「入れ物(コンテナ)」と「中身の符号化方式(コーデック)」は別だということです。同じMP4でも、中の映像がH.264かHEVCかで異なります。
      </p>

      <Analogy label="💡 たとえるなら">
        コンテナは「弁当箱」、コーデックは「中のおかずの調理法」です。同じ弁当箱(MP4)でも、中身の作り方(H.264・HEVC)は違います。箱の形だけでは、中身がどう作られているかまでは分かりません。
      </Analogy>

      <Heading num="02">ストリーミング ― 少しずつ受け取りながら再生</Heading>
      <p>
        大きな動画・音声ファイルを、すべてダウンロードし終えてから再生するのではなく、<strong>受信しながら並行して再生</strong>する方式が<Term>ストリーミング</Term>です。データを少しずつ受け取り、手元に一時的にためながら(バッファリング)再生するため、待ち時間が短くて済みます。視聴者が好きなタイミングで再生できる<Term>ビデオオンデマンド(VOD)</Term>や、リアルタイムに配信するライブ配信も、この仕組みの上に成り立っています。
      </p>

      <Heading num="03">画像の2つの表し方</Heading>
      <p>デジタル画像には、色のついた点を敷き詰めて表す方式と、線や図形を数式で表す方式の2系統があります。</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ラスタデータ(ビットマップ)</th>
            <th>ベクターデータ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">表し方</td>
            <td>色のついた点(画素)を敷き詰める</td>
            <td>点・線・図形を数式で表す</td>
          </tr>
          <tr>
            <td className="hl">拡大すると</td>
            <td>点が粗くなり、ギザギザ(ジャギー)が出る</td>
            <td>数式を計算し直すため、劣化しない</td>
          </tr>
          <tr>
            <td className="hl">得意なもの</td>
            <td>写真など複雑で微妙な階調</td>
            <td>ロゴ・図形・文字など</td>
          </tr>
          <tr>
            <td className="hl">代表形式</td>
            <td>JPEG・PNG・GIF・BMP</td>
            <td>SVG・AI(イラスト系)</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-media-raster-vector"
        aspect="700 / 420"
        caption="ラスタ画像とベクター画像を4倍に拡大したときの違い。ラスタは点(画素)を敷き詰めているため拡大すると階段状のギザギザが見えるが、ベクターは数式を計算し直すため、拡大しても線は滑らかなままになる。"
      />

      <Analogy label="💡 たとえるなら">
        ラスタは「モザイクタイルで描いた絵」、ベクターは「定規とコンパスで描いた設計図」です。モザイクは近づくとタイルの粒が見えますが、設計図は何倍に引き伸ばしても線は鋭いままです。
      </Analogy>

      <p>
        写真のように色が細かく変化するものは<Term>ラスタデータ</Term>、ロゴや図面のように拡大縮小しても鮮明さを保ちたいものは<Term>ベクターデータ</Term>が向きます。代表的なラスタ形式の使い分けは、写真をたくさん扱うなら<Term>JPEG</Term>(非可逆・高圧縮)、透過や図の鮮明さが要るなら<Term>PNG</Term>(可逆・透過対応)です。
      </p>

      <Heading num="04">圧縮の考え方 ― 元に戻せるか、戻せないか</Heading>
      <p>
        画像・音声・動画の各フォーマットの裏側には、共通して「圧縮」という技術があります。<Term>圧縮</Term>は、データの規則性や無駄を利用して情報の量を減らす処理で、圧縮したデータを元の使える形に戻す処理を<Term>伸張(解凍)</Term>と呼びます。圧縮には、元へ完全に戻せるかどうかで2種類あります。
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>可逆圧縮</th>
            <th>非可逆圧縮</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">元に戻せるか</td>
            <td>完全に戻せる(情報を失わない)</td>
            <td>戻せない(一部の情報を捨てる)</td>
          </tr>
          <tr>
            <td className="hl">圧縮率</td>
            <td>控えめ</td>
            <td>高い(大きく小さくできる)</td>
          </tr>
          <tr>
            <td className="hl">向く用途</td>
            <td>文書・プログラム・ZIPなど、1ビットも失えないもの</td>
            <td>写真・音声・動画など、多少の劣化が許容できるもの</td>
          </tr>
          <tr>
            <td className="hl">代表例</td>
            <td>ZIP・PNG・GIF</td>
            <td>JPEG・MP3・MPEG</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-media-compression"
        aspect="720 / 300"
        caption="可逆圧縮と非可逆圧縮の比較。どちらも元データを圧縮して小さくし、伸張して復元するが、可逆圧縮は完全に同じデータに戻るのに対し、非可逆圧縮は一部の情報を失い、復元しても元とは完全には同じにならない。"
      />

      <p>
        プログラムや文書は1ビットでも欠ければ壊れるため、<Term>可逆圧縮</Term>でなければなりません。一方、写真や音楽は、人が気づきにくい情報を捨てても実用上問題ないため、<Term>非可逆圧縮</Term>で大きくサイズを減らせます。
      </p>
      <p>
        複数のファイルやフォルダを1つにまとめる操作を<Term>アーカイブ</Term>と呼びます。代表的な<Term>ZIP</Term>形式は、まとめる機能と可逆圧縮を兼ね備えており、複数ファイルを1つの小さなファイルにして配布・保存できます。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コンテナとコーデックは別</h4>
          <p>入れ物(MP4など)と中身の符号化方式(H.264など)を区別します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ラスタは点、ベクターは式</h4>
          <p>写真はラスタ、ロゴ・図面はベクターが向きます。拡大時の劣化のしかたが違います。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>可逆は完全復元、非可逆は高圧縮</h4>
          <p>文書・プログラムは可逆、写真・音声・動画は非可逆が向きます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/media" />
    </DocsPage>
  );
}
