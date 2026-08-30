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
  title: "浮動小数点と演算精度",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>浮動小数点と演算精度 ― なぜ 0.1 + 0.2 は 0.3 にならないのか</h1>
        <Lead>
          「<Link href="/theory/numbers">数と基数変換</Link>」では小数の表し方として浮動小数点に触れました。ここではその中身にもう一歩踏み込み、IEEE 754 の構造、そして丸め誤差・桁落ち・オーバーフローといった演算精度の問題を、実務のバグと結びつけて見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ浮動小数点が必要か</Heading>
      <p>限られたビット数で、原子サイズの小ささから宇宙規模の大きさまで、幅広い数を1つの形式で扱いたい ― これが<Term>浮動小数点数</Term>の動機です。固定小数点が小数点の位置を固定するのに対し、浮動小数点は小数点を「動かせる」ようにして表現範囲を稼ぎます。</p>
      <p>科学表記の 6.02 × 10²³ を思い出してください。「有効数字(6.02)」と「桁の大きさ(10²³)」を分けることで、大きな数もコンパクトに書けます。浮動小数点は、これを2進数で行う仕組みです。</p>

      <Heading num="02">IEEE 754 の構造</Heading>
      <p>ほとんどの言語・CPUが採用する標準が <Term>IEEE 754</Term> です。1つの数を、符号・指数部・仮数部の3つのフィールドに分けて格納します。値は次の形で表されます。</p>
      <p>(−1)<sup>符号</sup> × 1.仮数 × 2<sup>指数</sup></p>
      <table>
        <tbody>
          <tr><th>フィールド</th><th>単精度(32bit)</th><th>倍精度(64bit)</th><th>役割</th></tr>
          <tr><td className="hl">符号(sign)</td><td>1 bit</td><td>1 bit</td><td>正(0)か負(1)か</td></tr>
          <tr><td className="hl">指数部(exponent)</td><td>8 bit</td><td>11 bit</td><td>小数点の位置(桁の大きさ)</td></tr>
          <tr><td className="hl">仮数部(mantissa)</td><td>23 bit</td><td>52 bit</td><td>有効数字にあたる部分</td></tr>
        </tbody>
      </table>
      <p>先頭を必ず「1.xxx」の形にそろえる<Term>正規化</Term>により、先頭の1は省略できます(その分、仮数の精度を1ビット稼げます)。倍精度の仮数52ビットは、10進で約15〜16桁の有効数字に相当します。</p>

      <Aside label="なぜ 0.1 が正確に表せないのか">
        10進の 0.1 は、2進では 0.0001100110011… と無限に循環します。10進で 1/3 = 0.333… が割り切れないのと同じ理屈です。有限ビットで打ち切るため、0.1 はごくわずかにずれた値として格納され、それが後述の丸め誤差の正体です。
      </Aside>

      <Heading num="03">演算で生じる誤差</Heading>
      <p>浮動小数点は「有限ビットで実数を近似する」以上、必ず誤差が伴います。試験でも実務でも、どの誤差が起きているかを見分けられることが大切です。</p>
      <table>
        <tbody>
          <tr><th>誤差</th><th>いつ起きるか</th><th>例</th></tr>
          <tr><td className="hl">丸め誤差</td><td>表現できない値を最も近い値に丸めるとき</td><td>0.1 + 0.2 = 0.30000000000000004</td></tr>
          <tr><td className="hl">桁落ち</td><td>ほぼ等しい2つの数を引き算し、有効桁が失われるとき</td><td>1.0000001 − 1.0000000</td></tr>
          <tr><td className="hl">情報落ち</td><td>大きな数に極端に小さな数を足し、小さい側が丸めで消えるとき</td><td>1.0e16 + 1.0 = 1.0e16</td></tr>
          <tr><td className="hl">オーバーフロー</td><td>指数部で表せる上限を超えたとき</td><td>結果が Infinity になる</td></tr>
          <tr><td className="hl">アンダーフロー</td><td>表せる下限より0に近づいたとき</td><td>結果が 0 に丸められる</td></tr>
        </tbody>
      </table>
      <p>特に注意したいのが<Term>桁落ち</Term>と<Term>情報落ち</Term>です。桁落ちは「近い値どうしの引き算」を避けるように式を変形すると軽減できます。情報落ちは、多数の値を合計するときに<Term>小さい値から順に足す</Term>と影響を小さくできます。</p>

      <Analogy label="💡 たとえるなら">
        情報落ちは、有効数字4桁の電卓に似ています。「10000 + 0.3」を打っても、電卓は 10000 としか表示できません。0.3 は桁からあふれて消えてしまうのです。浮動小数点も同じで、大きさの違いすぎる数を足すと、小さいほうが「なかったこと」にされます。
      </Analogy>

      <Heading num="04">実務での対処</Heading>
      <ul>
        <li><Term>等価比較を避ける</Term>: <code>a == b</code> ではなく「差の絶対値が十分小さいか(<code>|a − b| &lt; ε</code>)」で判定する。</li>
        <li><Term>金額は整数か10進型で</Term>: 誤差が許されない金額計算では、最小単位(円・セント)の整数で扱うか、言語の10進数型(decimal / BigDecimal)を使う。</li>
        <li><Term>合計は順序を意識</Term>: 大量の値を合計するときは、小さい値からまとめて足すと情報落ちを抑えられる。</li>
      </ul>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>符号・指数・仮数の3部構成</h4>
          <p>小数点を動かして広い範囲を表す。倍精度でも有効数字は約15〜16桁と有限です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>誤差の種類を見分ける</h4>
          <p>丸め・桁落ち・情報落ち・オーバー/アンダーフロー。原因ごとに対処が変わります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>金額に浮動小数点は使わない</h4>
          <p>等価比較は誤差込みで。金額は整数か10進型で扱うのが鉄則です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/numbers" tag="情報科学">数と基数変換</RelatedLink>
                    <RelatedLink href="/theory/encoding" tag="情報科学">文字コード</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
