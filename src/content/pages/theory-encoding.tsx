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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "文字コード",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>文字コード ― 文字がバイト列になる仕組み</h1>
        <Lead>
          コンピュータは数しか扱えません。では「あ」や「A」という文字を、どうやって0と1で表しているのでしょうか。ここでは文字を数値に対応づける文字コードの仕組みと、初学者が最初につまずく「文字化け」の原因を、ASCII
          から Unicode・UTF-8 の流れで整理します。
        </Lead>
      </Hero>

      <Heading num="01">文字コードとは ― 2つの層に分けて考える</Heading>
      <p>文字コードの話は、次の2つの層を分けて捉えると一気に整理できます。</p>
      <table>
        <tbody>
          <tr>
            <th>層</th>
            <th>役割</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">符号化文字集合</td>
            <td>どの文字に、どの番号(符号位置)を割り当てるか</td>
            <td>ASCII、Unicode</td>
          </tr>
          <tr>
            <td className="hl">符号化方式(エンコーディング)</td>
            <td>その番号を、実際に何バイトのビット列で表すか</td>
            <td>UTF-8、UTF-16、Shift_JIS</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-encoding-layers"
        aspect="820 / 300"
        caption="文字「A」と「あ」が、文字集合による番号付け(コードポイント U+0041 / U+3042)を経て、符号化方式によってバイト列(0x41 / 0xE3 0x81 0x82)になるまでの2段階。番号を振る層とバイト化する層が分かれていることを示している。"
      />

      <p>
        「文字に背番号を振る仕事」と「背番号をバイト列に変換する仕事」は別物です。Unicode
        は前者(番号表)、UTF-8
        は後者(バイト化のルール)にあたります。ここを混同すると、文字化けの理解が難しくなります。
      </p>

      <Heading num="02">ASCII ― すべての出発点</Heading>
      <p>
        <Term>ASCII</Term>は、アルファベット・数字・記号・制御文字を{" "}
        <Term>7ビット(0〜127)</Term>で表す、最も基本的な文字コードです。例えば{" "}
        <code>A</code> は 65、<code>a</code> は 97、<code>0</code>(文字のゼロ)は 48
        に対応します。
      </p>
      <p>
        7ビットしかないため、扱えるのは英語圏の文字だけ。日本語のように文字数の多い言語は表せません。そこで各国が独自に拡張(日本では
        Shift_JIS や EUC-JP
        など)した結果、「同じバイト列でも、どの文字コードで読むかによって別の文字に見える」状況が生まれました。これが文字化けの温床になります。
      </p>

      <Heading num="03">Unicode と UTF-8</Heading>
      <p>
        言語ごとにバラバラだった文字コードを、世界中の文字を1つの番号体系にまとめて解決しようとするのが{" "}
        <Term>Unicode</Term>{" "}
        です。「あ」も「A」も「絵文字」も、すべてに世界共通の番号(
        <Term>コードポイント</Term>、U+3042 のように書く)が振られています。
      </p>
      <p>
        この番号を実際のバイト列にする方式が複数あり、Web で圧倒的に主流なのが{" "}
        <Term>UTF-8</Term> です。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>1文字のバイト数</th>
            <th>特徴</th>
          </tr>
          <tr>
            <td className="hl">UTF-8</td>
            <td>1〜4バイト(可変長)</td>
            <td>ASCII と互換。英字は1バイトのまま。Web標準</td>
          </tr>
          <tr>
            <td className="hl">UTF-16</td>
            <td>2または4バイト</td>
            <td>一部OS・言語の内部表現で使われる</td>
          </tr>
        </tbody>
      </table>
      <p>
        UTF-8 の巧妙な点は、<Term>ASCII の範囲(英数字)はそのまま1バイト</Term>
        で表され、ASCIIと完全に互換なことです。日本語などは2〜3バイトを使います。これにより、英語中心のデータは無駄なく、多言語も1つの方式で扱えます。
      </p>

      <Analogy label="💡 たとえるなら">
        Unicode は「世界中の人に振られたマイナンバー(番号表)」、UTF-8
        は「その番号を封筒に書くときの記法」です。番号そのものと、封筒への書き方は別の取り決め ―
        だから「Unicodeで保存」ではなく「UTF-8で保存」という言い方になります。
      </Analogy>

      <Heading num="04">文字化けはなぜ起きるのか</Heading>
      <p>
        <Term>文字化け</Term>
        の正体は単純で、「書いたときの文字コードと、読むときの文字コードが食い違っている」ことです。同じバイト列でも、解釈するコードが違えば別の文字に化けます。
      </p>
      <ul>
        <li>
          Shift_JIS で保存したファイルを、UTF-8 として開く →
          日本語が「�」や意味不明な記号になる
        </li>
        <li>
          UTF-8 のテキストを Latin-1 で読む →
          「文字化け」が「æ–‡å­—åŒ–ã&quot;」のように見える
        </li>
      </ul>
      <p>
        対策の基本は<Term>エンコーディングを統一し、明示すること</Term>です。ファイルは UTF-8
        で保存し、HTML なら <code>&lt;meta charset=&quot;utf-8&quot;&gt;</code>、HTTP
        レスポンスなら <code>Content-Type</code>{" "}
        ヘッダで文字コードを宣言します。「読む側に正しいコードを伝える」ことで、化けを防げます。
      </p>

      <Aside label="つながり">
        「なぜ英字1バイト・日本語3バイトで済むのか」という発想は、頻度に応じてビット長を変える符号化の考え方(「
        <Link href="/theory/probability">確率・統計と情報理論</Link>
        」のハフマン符号)とも通じます。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>番号表とバイト化は別の層</h4>
          <p>
            Unicode は文字に番号を振る表、UTF-8 はその番号をバイト列にする方式です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>UTF-8 は ASCII 互換</h4>
          <p>
            英数字は1バイトのまま、多言語も同じ方式で表せる。だから Web の標準になりました。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>化けは食い違いが原因</h4>
          <p>
            書いたコードと読むコードのズレが文字化け。UTF-8 に統一し、明示するのが対策です。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/encoding" />
    </DocsPage>
  );
}
