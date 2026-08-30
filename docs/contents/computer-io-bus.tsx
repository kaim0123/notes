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
  title: "バス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>バス ― 部品どうしをつなぐ共通の通り道</h1>
        <Lead>
          CPU・メモリ・入出力装置は、それぞれ単独では何もできません。データや信号をやり取りする<strong>共通の通り道</strong>があってはじめて1台のコンピュータになります。この通り道が<Term>バス</Term>です。ここでは、バスが運ぶ3種類の情報と、内部/外部の区別、PCI・バス幅といった試験用語を整理します。
        </Lead>
      </Hero>

      <p>「<Link href="/computer/basics">PCハードウェアの基礎</Link>」の図で、CPUやメモリがマザーボードを介してつながっているのを見ました。あの配線の集まりがバスです。まずは「何を運んでいるのか」から見ていきます。</p>

      <Heading num="01">バスが運ぶ3種類の情報</Heading>
      <p>バスは役割で3つに分けられます。「どこに」「何を」「どうする」を別々の線で送るイメージです。</p>
      <table>
        <tbody>
          <tr><th>バス</th><th>運ぶもの</th></tr>
          <tr><td className="hl">アドレスバス</td><td>アクセス先の場所(アドレス)。「どこに」を指定する。</td></tr>
          <tr><td className="hl">データバス</td><td>実際に読み書きするデータ本体。「何を」にあたる。</td></tr>
          <tr><td className="hl">コントロールバス</td><td>読み込み/書き込みの区別やタイミングなどの制御信号。「どうする」を伝える。</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        宅配便に似ています。<strong>アドレスバス</strong>は宛先の住所、<strong>データバス</strong>は荷物の中身、<strong>コントロールバス</strong>は「配達」か「集荷」かの指示書。3つがそろって初めて、正しい相手に正しい荷物が届きます。
      </Analogy>

      <Heading num="02">内部バスと外部バス</Heading>
      <p>バスは、どこをつなぐかで呼び分けられます。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>つなぐ範囲</th></tr>
          <tr><td className="hl">内部バス</td><td>CPU内部。演算装置・レジスタ・制御装置の間をつなぐ。</td></tr>
          <tr><td className="hl">外部バス</td><td>CPUの外。CPUとメモリ、CPUと入出力装置などをつなぐ。</td></tr>
          <tr><td className="hl">システムバス</td><td>CPU・メモリ・入出力を束ねる、コンピュータの背骨にあたる主要な外部バス。</td></tr>
        </tbody>
      </table>

      <Heading num="03">バスの速さを決めるもの ― バス幅とクロック</Heading>
      <p>バスがどれだけデータを運べるかは、主に2つで決まります。</p>
      <ul>
        <li><Term>バス幅</Term> ― 一度に運べるビット数。道路の車線数のようなもので、幅が広いほど1回で多く運べます。</li>
        <li>バスクロック ― 1秒あたり何回やり取りするか。速いほど回数を稼げます。</li>
      </ul>
      <Aside label="シリアルとパラレル">
        かつては複数の線で同時に送る<Term>パラレルバス</Term>が高速でしたが、線ごとの到達タイミングのズレが高速化の壁になりました。現在は1本の線に高速で流す<Term>シリアルバス</Term>が主流です(USB・SATA・PCI Expressなど)。「線を増やすより、1本を速くする」へと発想が変わったわけです。
      </Aside>

      <Heading num="04">代表的な規格 ― PCIとPCI Express</Heading>
      <p><Term>PCI</Term>は、拡張カード(グラフィックカードやネットワークカードなど)をマザーボードに接続するための、長く使われてきたバス規格です。後継の<Term>PCI Express(PCIe)</Term>はシリアル方式を採り、「レーン」を束ねることで高速化しており、現在のGPUやSSDの接続で主役になっています。</p>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>バスは3種類の情報を運ぶ</h4>
          <p>アドレス(どこに)・データ(何を)・コントロール(どうする)。3つがそろって1回のやり取りが成立します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>内部・外部・システムバス</h4>
          <p>CPU内をつなぐ内部バス、外の装置とつなぐ外部バス、その背骨がシステムバスです。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>速さはバス幅×クロック、今はシリアル</h4>
          <p>一度に運ぶビット数と回数で速さが決まり、現在はパラレルよりシリアルが主流です(PCIe・USB・SATA)。</p>
        </Card>
      </CardGrid>

      <p>バスという通り道の先で、実際に外部機器とつなぐ「規格と制御のしくみ」が入出力インタフェースです。次はそちらを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/io/interface" tag="コンピュータ">入出力インタフェース ― USB・SATA・DMA</RelatedLink>
                    <RelatedLink href="/computer/io/devices" tag="コンピュータ">入出力装置 ― 入力機器と出力機器</RelatedLink>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
