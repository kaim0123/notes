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
  title: "入出力インタフェース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>入出力インタフェース ― 外の機器とつなぐ約束ごと</h1>
        <Lead>
          キーボード・外付けSSD・ディスプレイ ― 外部の機器をコンピュータにつなぐには、コネクタの形・電気信号・通信手順をそろえた<strong>共通の約束ごと</strong>が要ります。これが<Term>入出力インタフェース</Term>です。ここでは代表的な規格と、CPUの負担を減らすDMA、機器を自動認識するプラグアンドプレイなどの仕組みを整理します。
        </Lead>
      </Hero>

      <p>「<Link href="/computer/io/bus">バス</Link>」が機内の共通の通り道なら、インタフェースは<strong>外の機器との接点</strong>です。同じ約束を両側が守るからこそ、別メーカーの機器でもつながります。</p>

      <Heading num="01">代表的なインタフェース規格</Heading>
      <table>
        <tbody>
          <tr><th>規格</th><th>主な用途</th></tr>
          <tr><td className="hl">USB</td><td>キーボード・マウス・外付けストレージなど汎用。世代ごとに高速化。</td></tr>
          <tr><td className="hl">Thunderbolt</td><td>データ・映像・給電を1本で。USB-Cと同じ形状のコネクタ。</td></tr>
          <tr><td className="hl">シリアルATA(SATA)</td><td>内蔵のHDD/SSDを接続する。</td></tr>
          <tr><td className="hl">HDMI</td><td>映像と音声をまとめてディスプレイへ出力する。</td></tr>
          <tr><td className="hl">Bluetooth / BLE</td><td>近距離の無線接続。BLEは省電力版でウェアラブル等に。</td></tr>
          <tr><td className="hl">NFC</td><td>数cmの至近距離の無線。ICカードやスマホの決済など。</td></tr>
        </tbody>
      </table>
      <h3>USBの世代 ― 同じ名前でも速度が違う</h3>
      <p><Term>USB(Universal Serial Bus)</Term>は世代を重ねるごとに高速化しており、同じ「USB」でも世代によって最大速度が大きく異なります。</p>
      <table>
        <tbody>
          <tr><th>規格</th><th>最大転送速度</th></tr>
          <tr><td className="hl">USB 2.0</td><td>480Mbps</td></tr>
          <tr><td className="hl">USB 3.0 / 3.1 Gen1</td><td>5Gbps</td></tr>
          <tr><td className="hl">USB 3.1 Gen2 / 3.2</td><td>10〜20Gbps</td></tr>
          <tr><td className="hl">USB4</td><td>40Gbps</td></tr>
        </tbody>
      </table>
      <p><Term>Thunderbolt</Term>はIntelが中心となって開発した高速インタフェースで、Thunderbolt 3以降はUSB-C(Type-C)と同じ形状のコネクタを採用し、データ・映像・給電を1本のケーブルでまかなえます。</p>
      <Aside label="USB-Cは「形」の名前">
        USB-C(Type-C)はコネクタの<strong>形状</strong>の規格にすぎず、転送速度やThunderbolt対応を保証しません。同じ形でも、実際に使える速度や機能はケーブル・ポート双方の対応しだいです。
      </Aside>

      <Heading num="02">シリアルとパラレル、そして接続を広げるハブ</Heading>
      <p>かつては複数線で同時送信する<Term>パラレル</Term>方式(古くはRS-232Cに対するパラレルポート等)もありましたが、高速化のしやすさから今は1本で高速に送る<Term>シリアル</Term>方式が主流です。USB・SATAもシリアルです。</p>
      <p>ポートの数が足りないときは<Term>ハブ</Term>で分岐して複数機器をつなげます(USBハブなど)。</p>

      <Heading num="03">CPUの負担を減らす ― DMA</Heading>
      <p>外部機器と主記憶の間で大量のデータをやり取りするとき、いちいちCPUが仲介していては本来の計算が止まってしまいます。そこで、CPUを介さずに<strong>機器と主記憶が直接データを転送する</strong>仕組みが<Term>DMA(Direct Memory Access)</Term>です。転送中CPUは別の仕事を進められ、全体の効率が上がります。</p>
      <Analogy label="💡 たとえるなら">
        店長(CPU)が商品(データ)を一つひとつ自分で棚から倉庫へ運んでいたら、接客ができません。DMAは「運搬専門スタッフ」を雇うようなもので、店長は運搬を任せて接客(計算)に集中できます。
      </Analogy>

      <Heading num="04">つなぐだけで使える仕組み ― ドライバとプラグアンドプレイ</Heading>
      <p>OSが個々の機器を扱えるのは、その機器用の<Term>デバイスドライバ</Term>という橋渡しソフトがあるからです。そして機器を接続すると自動で認識・設定される仕組みが<Term>プラグアンドプレイ</Term>です。かつては手動でドライバや設定を入れていた作業を、OSが肩代わりしてくれます。</p>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>インタフェースは外との約束ごと</h4>
          <p>USB・Thunderbolt・SATA・HDMI・Bluetooth・NFC。両側が同じ規格を守るからつながります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DMAがCPUを解放する</h4>
          <p>機器と主記憶が直接転送することで、CPUは転送中も別の仕事を進められます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ドライバ＋プラグアンドプレイで自動化</h4>
          <p>機器ごとのドライバが橋渡しし、接続するだけで認識・設定される仕組みが整っています。</p>
        </Card>
      </CardGrid>

      <p>規格と制御のしくみがわかったら、次はその先につながる実際の機器 ― 入力装置と出力装置を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/io/devices" tag="コンピュータ">入出力装置 ― 入力機器と出力機器</RelatedLink>
                    <RelatedLink href="/computer/io/bus" tag="コンピュータ">バス ― 部品どうしをつなぐ通り道</RelatedLink>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
