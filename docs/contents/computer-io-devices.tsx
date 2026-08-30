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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "入出力装置",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>入出力装置 ― 人と外界とのやりとりの末端</h1>
        <Lead>
          「<Link href="/computer/io/interface">入出力インタフェース</Link>」でつなぎ方の約束を見ました。その先につながる末端の機器が<Term>入出力装置</Term>です。人からの指示を取り込む<strong>入力装置</strong>と、処理結果を人や外界へ返す<strong>出力装置</strong>に大きく分かれます。試験では両者が別々に問われるため、分けて押さえます。
        </Lead>
      </Hero>

      <p>五大装置でいう「入力装置」「出力装置」の具体例にあたります。種類は多いですが、「情報を<strong>取り込む</strong>側か、<strong>出す</strong>側か」で整理すれば迷いません。</p>

      <Heading num="01">入力装置 ― 情報を取り込む</Heading>
      <table>
        <tbody>
          <tr><th>装置</th><th>役割</th></tr>
          <tr><td className="hl">キーボード</td><td>文字・記号を打ち込む基本の入力機器。</td></tr>
          <tr><td className="hl">マウス／タッチパネル</td><td>画面上の位置を指し示す。タッチパネルは入力と表示を兼ねる。</td></tr>
          <tr><td className="hl">スキャナー</td><td>紙などの画像を読み取ってデジタル化する。</td></tr>
          <tr><td className="hl">OCR</td><td>読み取った画像の中の文字を認識し、文字データに変換する。</td></tr>
          <tr><td className="hl">バーコード読取装置</td><td>バーコードを光学的に読み取る。レジや在庫管理で活躍。</td></tr>
          <tr><td className="hl">ICカード読取装置</td><td>ICカードの情報を読み取る。交通系カードや社員証など。</td></tr>
        </tbody>
      </table>
      <Aside label="OCRとバーコードの違い">
        バーコード読取装置が「あらかじめ決めた符号」を読むのに対し、<Term>OCR</Term>は「人が書いた/印刷した文字そのもの」を認識する点が異なります。OCRのほうが柔軟ですが、読み取り精度の難しさもあります。
      </Aside>

      <Heading num="02">出力装置 ― 結果を外に出す</Heading>
      <table>
        <tbody>
          <tr><th>装置</th><th>役割</th></tr>
          <tr><td className="hl">液晶ディスプレイ</td><td>バックライトと液晶で表示する、最も一般的な画面。</td></tr>
          <tr><td className="hl">有機ELディスプレイ</td><td>素子自体が発光。高コントラストで薄型化しやすい。</td></tr>
          <tr><td className="hl">レーザープリンター</td><td>トナーを熱で定着。高速・大量印刷向き。</td></tr>
          <tr><td className="hl">インクジェットプリンター</td><td>インクを噴射。写真印刷や小規模用途に向く。</td></tr>
          <tr><td className="hl">3Dプリンター</td><td>樹脂などを積層して立体物を造形する。</td></tr>
          <tr><td className="hl">D/Aコンバータ</td><td>デジタル信号をアナログ信号(音・電圧)に変換して出力する。</td></tr>
        </tbody>
      </table>
      <p>プリンターの共有・ドライバー・スキャンといった実務面は「<Link href="/computer/printer">プリンターの仕組み</Link>」で扱っています。</p>

      <Heading num="まとめ">この章の2点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>入力は「取り込む」側</h4>
          <p>キーボード・マウスから、スキャナー・OCR・バーコード・ICカードまで。情報をデジタルにして取り込みます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>出力は「出す」側</h4>
          <p>ディスプレイ・各種プリンター・D/Aコンバータ。処理結果を人や外界が受け取れる形に変えて返します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/io/interface" tag="コンピュータ">入出力インタフェース ― つなぐ約束ごと</RelatedLink>
                    <RelatedLink href="/computer/printer" tag="コンピュータ">プリンターの仕組み ― 共有・ドライバー・スキャン</RelatedLink>
                    <RelatedLink href="/computer/io/bus" tag="コンピュータ">バス ― 部品どうしをつなぐ通り道</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
