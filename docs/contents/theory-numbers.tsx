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
  title: "数と基数変換",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>数と基数変換 ― コンピュータは数をどう記録するか</h1>
        <Lead>
          コンピュータは、あらゆるデータを最終的に0と1の並びとして扱います。ここでは「2進数がなぜ読めると便利なのか」「負の数や小数をどう表すのか」を、位取り記数法・基数変換・2の補数・浮動小数点の順に見ていきます。メモリや論理回路、浮動小数点バグを理解する前提になる部分です。
        </Lead>
      </Hero>

      <Heading num="01">位取り記数法と基数</Heading>
      <p>私たちが普段使う10進数も、コンピュータ内部で使われる2進数も、同じ<Term>位取り記数法</Term>という仕組みで表されています。桁の位置ごとに「重み」が決まっていて、各桁の数字にその重みを掛けて足し合わせると、その数の値になります。</p>

      <ul>
        <li>10進数: 右から順に 10⁰, 10¹, 10², … の重みが付く。<br />例) 473 = 4×10² + 7×10¹ + 3×10⁰</li>
        <li>2進数: 右から順に 2⁰, 2¹, 2², … の重み。<br />例) 1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 11</li>
      </ul>

      <p>この「底」にあたる数を<Term>基数(radix)</Term>と呼びます。基数が2のとき2進数、10のとき10進数、8のとき8進数、16のとき16進数です。</p>

      <h3>8進数・16進数を使う理由</h3>
      <p>2進数はビット単位で扱いやすい反面、人間が読むには桁が長くなりがちです。そこで、<Term>3ビット＝8進1桁</Term>、<Term>4ビット＝16進1桁</Term>という対応を利用して、同じ値を短く書きます。</p>
      <ul>
        <li>2進 → 8進: 右から3ビットずつ区切って読み替える</li>
        <li>2進 → 16進: 右から4ビットずつ区切って読み替える</li>
      </ul>
      <p>例) 11010110₂ を区切ると、</p>
      <table>
        <tbody>
          <tr><th>表記</th><th>区切り方</th><th>結果</th></tr>
          <tr><td className="hl">8進</td><td>11 / 010 / 110 → 3 / 2 / 6</td><td>326₈</td></tr>
          <tr><td className="hl">16進</td><td>1101 / 0110 → D / 6</td><td>D6₁₆</td></tr>
        </tbody>
      </table>

      <Heading num="02">基数変換のやり方</Heading>

      <h3>10進数 → 2進数(除算方式)</h3>
      <p>10進数から2進数へ変換する代表的な方法は、<Term>2で割り続けて余りを並べる</Term>やり方です。</p>
      <ol>
        <li>変換したい10進数を2で割る</li>
        <li>商を次の割り算に使い、余りをメモする</li>
        <li>商が0になるまで繰り返す</li>
        <li>余りを<Term>下から上へ</Term>読んだものが2進表現</li>
      </ol>
      <p>例) 13を2進数にする:</p>
      <table>
        <tbody>
          <tr><th>割り算</th><th>商</th><th>余り</th></tr>
          <tr><td>13 ÷ 2</td><td>6</td><td className="hl">1</td></tr>
          <tr><td>6 ÷ 2</td><td>3</td><td className="hl">0</td></tr>
          <tr><td>3 ÷ 2</td><td>1</td><td className="hl">1</td></tr>
          <tr><td>1 ÷ 2</td><td>0</td><td className="hl">1</td></tr>
        </tbody>
      </table>
      <p>余りを下から読むと <Term>1101₂</Term> です。</p>

      <h3>2進数 → 10進数(重みの和)</h3>
      <p>2進数は各桁に2のべき乗の重みがついているので、それを掛けて足し合わせます。例) 1101₂ は、</p>
      <p>1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = <Term>13</Term></p>
      <p>8進・16進から10進への変換も同じで、重みが 8⁰, 8¹, 8² や 16⁰, 16¹, 16² に変わるだけです。</p>

      <Heading num="03">負の数の表現と補数</Heading>

      <h3>なぜ補数を使うのか</h3>
      <p>コンピュータは加算器をベースに作られているため、「引き算も<Term>足し算で表現</Term>できると都合がよい」という事情があります。<Term>2の補数</Term>表現を使うと、引き算を「負の数との足し算」として同じ回路で扱えるようになります。</p>

      <h3>2の補数の求め方</h3>
      <p>nビットで負の数 −x を表すには、次の手順で求めます。</p>
      <ol>
        <li>x を2進数にする</li>
        <li>ビットをすべて反転(0↔1)する</li>
        <li>1を足す</li>
      </ol>
      <p>例) 4ビットで −3 を表す:</p>
      <ul>
        <li>3 → 0011₂</li>
        <li>反転 → 1100₂</li>
        <li>1を足す → <Term>1101₂</Term> が −3</li>
      </ul>
      <p>チェックしてみると、1101₂ + 0011₂ = 10000₂ となり、下位4ビットは 0000(=0)。あふれた5桁目(桁上がり)は捨てるので、−3 と +3 の足し算がきちんと0になります。</p>

      <Analogy label="💡 たとえるなら">
        2の補数は、時計の針に似ています。時計で「3時間戻す」ことは「9時間進める」ことと同じ結果になります(12で一周するため)。コンピュータも決まったビット数で一周するので、「引く」代わりに「補数を足す」だけで同じ答えにたどり着けます。
      </Analogy>

      <h3>符号付き数の範囲</h3>
      <p>nビットの2の補数表現で表せる範囲は、−2ⁿ⁻¹ 以上 2ⁿ⁻¹−1 以下です。例えば8ビットなら <Term>−128〜+127</Term> になります。この範囲を超えると<Term>オーバーフロー</Term>が起き、計算結果が意図しない値に化けます。</p>

      <Heading num="04">小数の表現 ― 固定小数点と浮動小数点</Heading>

      <h3>固定小数点</h3>
      <p><Term>固定小数点</Term>は、小数点の位置をあらかじめ決めておく方式です。例えば「小数点以下2桁」と決めて、金額を100倍した整数として扱います。実装が単純で、桁落ちを嫌う金融計算などでよく使われます。</p>

      <h3>浮動小数点</h3>
      <p>非常に大きい数や小さい数を幅広く表したいときは、<Term>浮動小数点数</Term>を使います。±1.xxx × 2ᵉ のように「符号・仮数部・指数部」に分けて表すことで、限られたビット数で広い範囲をカバーします。</p>
      <p>ただし、有限のビットで実数を近似するため、次のような誤差が問題になります。</p>
      <table>
        <tbody>
          <tr><th>誤差</th><th>何が起きるか</th></tr>
          <tr><td className="hl">丸め誤差</td><td>表現できない値を近い値に丸めることで生じるずれ</td></tr>
          <tr><td className="hl">桁落ち</td><td>ほぼ同じ大きさの数を引き算したとき、有効桁が失われる</td></tr>
          <tr><td className="hl">情報落ち</td><td>非常に小さい値が、丸めによって0になってしまう</td></tr>
        </tbody>
      </table>

      <Aside label="もっと詳しく">
        「0.1 + 0.2 が 0.30000000000000004 になる」といった現象は、この丸め誤差が原因です。IEEE 754 の内部構造や、桁落ち・情報落ちへの実務的な対処は「<Link href="/theory/numbers/floating">浮動小数点と演算精度</Link>」で掘り下げています。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>すべては位取りと重み</h4>
          <p>2・8・16進も、桁ごとの重みを足すだけ。10進↔2進の変換は暗算できるレベルを目指します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>引き算は補数で足し算に</h4>
          <p>「反転して+1」で2の補数。桁数で表せる範囲(8ビットで−128〜+127)を覚えておきます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>小数には誤差が付き物</h4>
          <p>浮動小数点は範囲を広げる代わりに丸め誤差を生む。用途に応じて固定小数点と使い分けます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/numbers/floating" tag="情報科学">浮動小数点と演算精度</RelatedLink>
                    <RelatedLink href="/theory/logic" tag="情報科学">論理と真理値表</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/adder" tag="コンピュータ">半導体 ― 足し算をつくる</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
