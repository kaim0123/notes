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
  title: "形式言語",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>形式言語 ― 言語を厳密に記述する</h1>
        <Lead>
          プログラミング言語の文法、正規表現による検索、コンパイラの構文解析 ― これらの土台にあるのが<Term>形式言語</Term>の理論です。「どんな文字列が正しいか」を曖昧さなくルールで定める考え方を、文法・BNF・正規表現・オートマトン・逆ポーランド記法の順に見ていきます。発展的な話題ですが、言語処理を深く理解する足がかりになります。
        </Lead>
      </Hero>

      <Heading num="01">形式言語と文法</Heading>
      <p>私たちが話す自然言語は、曖昧さや例外にあふれています。対して<Term>形式言語</Term>は、「どの文字列がその言語に属するか」を、機械が判定できるほど厳密なルール(<Term>文法</Term>)で定めた言語です。プログラミング言語のソースコードは、まさにこの形式言語で書かれています。</p>
      <p>文法は、次のような要素で構成されます。</p>
      <ul>
        <li><Term>終端記号</Term>: それ以上分解しない、実際に現れる記号(<code>a</code>、<code>+</code>、数字など)</li>
        <li><Term>非終端記号</Term>: 「式」「文」のような、さらに展開されるカテゴリ</li>
        <li><Term>生成規則</Term>: 非終端記号を、どう別の記号列に置き換えてよいかのルール</li>
      </ul>

      <Heading num="02">BNF ― 文法を書き表す記法</Heading>
      <p><Term>BNF(バッカス・ナウア記法)</Term>は、プログラミング言語の文法を記述するために広く使われる記法です。「::=」の左に定義する対象、右にその中身を書きます。縦棒 <code>|</code> は「または」を表します。</p>
      <p>例) 符号なし整数を定義する:</p>
      <table>
        <tbody>
          <tr><th>規則</th><th>意味</th></tr>
          <tr><td>&lt;数字&gt; ::= 0 | 1 | 2 | … | 9</td><td>数字は 0〜9 のいずれか</td></tr>
          <tr><td>&lt;整数&gt; ::= &lt;数字&gt; | &lt;整数&gt;&lt;数字&gt;</td><td>整数は、数字1つ、または「整数の後ろに数字」</td></tr>
        </tbody>
      </table>
      <p>2番目の規則は、自分自身(&lt;整数&gt;)を定義の中に含む<Term>再帰</Term>になっています。これにより「1桁でも100桁でも、任意の長さの整数」を、たった1行で表現できます。BNFを拡張して繰り返しや省略を書きやすくした <Term>EBNF</Term> や、視覚的に表す<Term>構文図式(鉄道図)</Term>もよく使われます。</p>

      <Aside label="つながり">
        言語処理系が、この文法に沿ってソースコードを解析し、実行可能な形へ変換していく流れは「<Link href="/dev/language-basics">プログラミング言語の仕組み</Link>」で扱っています。BNFは、その字句解析・構文解析の「設計図」にあたります。
      </Aside>

      <Heading num="03">正規表現と有限オートマトン</Heading>
      <p><Term>正規表現</Term>は、文字列のパターンを記述する記法で、検索・置換・入力チェックに日常的に使われます。「数字の並び」「メールアドレスらしき形」といったパターンを、短い式で表せます。</p>
      <p>正規表現で表せるパターンの背後には、<Term>有限オートマトン</Term>という数学的なモデルがあります。これは「状態」と「入力による状態の遷移」だけを持つ、最も単純な計算機です。</p>
      <table>
        <tbody>
          <tr><th>要素</th><th>意味</th></tr>
          <tr><td className="hl">状態</td><td>今どこまで読み進めたかを表す(初期状態・受理状態などがある)</td></tr>
          <tr><td className="hl">遷移</td><td>1文字読むごとに、次の状態へ移るルール</td></tr>
          <tr><td className="hl">受理</td><td>文字列を読み終えたとき、受理状態にいればパターンに一致</td></tr>
        </tbody>
      </table>
      <p>「正規表現で書けるパターン ＝ 有限オートマトンで判定できるパターン」という対応があり、これが正規表現エンジンの理論的な土台になっています。</p>

      <Analogy label="💡 たとえるなら">
        有限オートマトンは「自動改札機」のようなものです。切符を入れる・タッチする、といった入力のたびに内部の状態が変わり、最後に「通ってよい状態」なら扉が開きます。文字列を1文字ずつ読んで状態を変え、最後が受理状態なら「一致」と判定するのと同じ仕組みです。
      </Analogy>

      <Heading num="04">逆ポーランド記法</Heading>
      <p><Term>逆ポーランド記法(後置記法)</Term>は、演算子を項の<Term>後ろ</Term>に置く書き方です。私たちが普段使う「3 + 4」(中置記法)を、「3 4 +」と書きます。</p>
      <table>
        <tbody>
          <tr><th>中置記法(普通の書き方)</th><th>逆ポーランド記法</th></tr>
          <tr><td>3 + 4</td><td>3 4 +</td></tr>
          <tr><td>(3 + 4) × 5</td><td>3 4 + 5 ×</td></tr>
          <tr><td>3 + 4 × 5</td><td>3 4 5 × +</td></tr>
        </tbody>
      </table>
      <p>一見わかりにくいですが、逆ポーランド記法には<Term>括弧も演算子の優先順位も要らない</Term>という大きな利点があります。左から順に読み、数はスタックに積み、演算子が来たらスタックから2つ取り出して計算し、結果を積み戻す ― これだけで正しく計算できます。ここでも「<Link href="/theory/algorithms">スタック</Link>」が主役です。多くの言語処理系や電卓が、式の評価に内部でこの方式を使っています。</p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>文法で「正しさ」を定める</h4>
          <p>形式言語は、どの文字列が正しいかをルールで厳密に規定。BNFがその記述に使われます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>正規表現＝有限オートマトン</h4>
          <p>パターンの背後には、状態と遷移だけの単純な計算モデルがあります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>逆ポーランドはスタックで評価</h4>
          <p>括弧も優先順位も不要。数を積み、演算子で取り出して計算するだけです。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み</RelatedLink>
                    <RelatedLink href="/theory/algorithms" tag="情報科学">アルゴリズムとデータ構造</RelatedLink>
                    <RelatedLink href="/theory/logic" tag="情報科学">論理と真理値表</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
