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
  title: "論理と真理値表",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>論理と真理値表 ― if文とデジタル回路の共通言語</h1>
        <Lead>
          「AかつB」「AまたはB」といった条件の組み立ては、プログラムのif文でも、半導体の論理回路でも、まったく同じ論理演算で表せます。ここでは命題・基本演算・真理値表・ド・モルガンの法則を整理し、それが論理回路とどう対応するかまで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">命題と論理式</Heading>

      <h3>命題とは</h3>
      <p><Term>命題</Term>とは、「真か偽か」がはっきり決まる文のことです。例えば「3は偶数である」は偽、「3は奇数である」は真です。命題を記号で表すときは、P, Q, R などの大文字を使います。</p>

      <h3>複合命題</h3>
      <p>命題どうしを<Term>論理演算</Term>で組み合わせると、より複雑な命題(論理式)になります。</p>
      <table>
        <tbody>
          <tr><th>演算</th><th>記号</th><th>読み方</th></tr>
          <tr><td className="hl">否定</td><td>¬P</td><td>P ではない</td></tr>
          <tr><td className="hl">論理和(OR)</td><td>P ∨ Q</td><td>P または Q</td></tr>
          <tr><td className="hl">論理積(AND)</td><td>P ∧ Q</td><td>P かつ Q</td></tr>
          <tr><td className="hl">含意</td><td>P ⇒ Q</td><td>P ならば Q</td></tr>
          <tr><td className="hl">同値</td><td>P ⇔ Q</td><td>P と Q は同値</td></tr>
        </tbody>
      </table>
      <p>実務やテストでよく登場するのは、主に <Term>AND / OR / NOT / XOR</Term> と、後述する<Term>ド・モルガンの法則</Term>です。</p>

      <Heading num="02">基本論理演算と真理値表</Heading>

      <h3>真理値表の作り方</h3>
      <p><Term>真理値表</Term>は、「すべての入力の組み合わせに対して、出力が真(1)か偽(0)か」を表にしたものです。命題が2つなら行数は 4行(2²)、3つなら 8行(2³) と、命題の数だけ行が倍々に増えていきます。</p>

      <h3>各演算の真理値表</h3>
      <table>
        <tbody>
          <tr><th>P</th><th>Q</th><th>¬P</th><th>P ∨ Q</th><th>P ∧ Q</th><th>XOR</th></tr>
          <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
          <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
          <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        </tbody>
      </table>
      <ul>
        <li><Term>OR</Term>: 入力のどちらか一方でも1なら1</li>
        <li><Term>AND</Term>: 両方1のときだけ1</li>
        <li><Term>XOR(排他的論理和)</Term>: 「どちらか一方だけ1」のとき1</li>
      </ul>

      <Heading num="03">ド・モルガンの法則と式の簡約</Heading>
      <p><Term>ド・モルガンの法則</Term>は、否定がかかった論理式を変形するときの重要なルールです。</p>
      <table>
        <tbody>
          <tr><th>元の式</th><th>変形後</th></tr>
          <tr><td>¬(P ∧ Q)</td><td>(¬P) ∨ (¬Q)</td></tr>
          <tr><td>¬(P ∨ Q)</td><td>(¬P) ∧ (¬Q)</td></tr>
        </tbody>
      </table>
      <p>言葉にすると、「P かつ Q ではない」は「P ではない、または Q ではない」と言い換えられる、ということです。否定を各項に配りながら、∧ と ∨ が入れ替わる点がポイントです。</p>
      <p>この法則は、<Link href="/dev/language-basics">if文の条件</Link>を読みやすく書き換えたり、論理回路を等価なまま別の形へ変形したりするときに使われます。</p>

      <Analogy label="💡 たとえるなら">
        「コーヒーも紅茶も飲まない」という状態は、「コーヒーを飲まない、かつ、紅茶を飲まない」と同じです。否定を全体にかけた言い方(¬(P ∨ Q))と、一つずつ否定した言い方((¬P) ∧ (¬Q))は、指しているものが同じ ― これがド・モルガンの直感です。
      </Analogy>

      <Heading num="04">論理回路との対応</Heading>

      <h3>基本ゲート</h3>
      <p>論理演算は、そのまま<Term>論理ゲート回路</Term>として実装されます。ソフトウェアの条件式とハードウェアの回路が、同じ論理でつながっているわけです。</p>
      <table>
        <tbody>
          <tr><th>ゲート</th><th>動作</th></tr>
          <tr><td className="hl">AND</td><td>両方1のとき1を出力</td></tr>
          <tr><td className="hl">OR</td><td>どちらか1のとき1を出力</td></tr>
          <tr><td className="hl">NOT</td><td>入力を反転する</td></tr>
          <tr><td className="hl">NAND</td><td>ANDの出力をNOTしたもの</td></tr>
          <tr><td className="hl">NOR</td><td>ORの出力をNOTしたもの</td></tr>
        </tbody>
      </table>

      <h3>NANDの万能性</h3>
      <p><Term>NANDゲート</Term>だけを組み合わせると、AND・OR・NOT のすべてを作れます。このため NAND は<Term>万能ゲート</Term>と呼ばれます。回路設計では、1種類のゲートにそろえた方が製造が簡単になることがあり、この性質が活きてきます。</p>

      <Aside label="つながり">
        トランジスタからこうしたゲート、そして足し算の回路をどう組み上げるかは、「<Link href="/computer/semiconductor">半導体</Link>」で物理側から扱っています。論理の側とハードウェアの側、両方から見ると理解が立体的になります。
      </Aside>

      <Heading num="05">集合と論理の関係</Heading>
      <p>集合演算(和集合・積集合・補集合)は、論理演算ときれいに対応しています。ベン図を描いて考えると、論理式の意味を直感的につかみやすくなります。</p>
      <table>
        <tbody>
          <tr><th>集合</th><th>論理</th></tr>
          <tr><td className="hl">積集合(A ∩ B)</td><td>論理積(A AND B)</td></tr>
          <tr><td className="hl">和集合(A ∪ B)</td><td>論理和(A OR B)</td></tr>
          <tr><td className="hl">補集合(Ā)</td><td>否定(NOT A)</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>真理値表は総当たり</h4>
          <p>入力の組み合わせを漏れなく書き出すのが出発点。命題の数だけ行が倍々に増えます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ド・モルガンで簡約</h4>
          <p>否定を配ると ∧ と ∨ が入れ替わる。条件式も回路も、この法則で等価に変形できます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>論理＝回路</h4>
          <p>AND/OR/NOT はそのままゲートに対応。NANDだけですべてを作れる万能性を持ちます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/numbers" tag="情報科学">数と基数変換</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/logic" tag="コンピュータ">半導体 ― 直列と並列で論理をつくる</RelatedLink>
                    <RelatedLink href="/theory/probability" tag="情報科学">確率・統計と情報理論</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
