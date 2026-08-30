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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "関数型",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>関数型 ― 副作用を持たない関数の組み合わせ</h1>
        <Lead>
          理論自体は1930年代、Alonzo Churchが提唱した<Term>ラムダ計算</Term>までさかのぼりますが、実用言語として広まったのは1980年代以降です。入力が同じなら常に同じ結果を返し、外部の状態を書き換えない<Term>純粋関数</Term>を基本単位とすることで、<Link href="/design/paradigm-oop">オブジェクト指向</Link>が抱えていた「状態がいつの間にか書き換わる」問題を避けようとする考え方です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        オブジェクト指向はデータと処理をまとめることでコードの整理に成功しましたが、複数のオブジェクトが互いの内部状態を書き換え合うようになると、「今この値は誰が変えたのか」を追うのが再び難しくなります。とくに並行処理では、複数のスレッドが同じ可変な状態を同時に書き換えることで<Term>競合状態(レースコンディション)</Term>が起きやすくなります。関数型プログラミングは、そもそも状態を変更しない(<Term>イミュータブル</Term>)ことで、この問題自体を起きなくします。代表例はHaskell・Lisp・Erlangです。
      </p>

      <DiagramFrame
        slug="design-paradigm-functional-purity"
        aspect="680 / 300"
        caption="純粋関数と副作用のある関数の対比。左の不純な関数は、入力のほかにグローバル変数やDB・時刻といった外部の状態を読み書きするため、呼ぶ時刻や回数で結果が変わる。右の純粋関数は外部とつながる線が1本もなく、同じ入力なら常に同じ出力になるため、入力と出力だけを確かめればテストできる。"
      />

      <Heading num="02">基本単位は「純粋関数」</Heading>
      <table>
        <thead>
          <tr>
            <th>概念</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">純粋関数</td>
            <td>同じ入力に対して常に同じ出力を返し、外部に副作用を及ぼさない</td>
          </tr>
          <tr>
            <td className="hl">参照透過性</td>
            <td>式をその評価結果に置き換えても、プログラムの意味が変わらない性質</td>
          </tr>
          <tr>
            <td className="hl">イミュータブル</td>
            <td>一度作ったデータは変更せず、変更が必要なら新しいデータを作る</td>
          </tr>
          <tr>
            <td className="hl">高階関数</td>
            <td>関数を引数として受け取ったり、関数を戻り値として返したりする関数</td>
          </tr>
        </tbody>
      </table>
      <p>
        この基本単位を使い、<code>map</code>・<code>filter</code>・<code>reduce</code>のような小さな純粋関数を組み合わせて(<Term>関数合成</Term>)、大きな処理を組み立てます。具体的な性質は<Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>で、組み合わせ方は<Link href="/design/paradigm-functional-composition">関数を組み合わせる</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        数学の関数 f(x) = x + 1 は、何度呼んでも同じ入力なら同じ答えを返し、呼んだこと自体が世界の何かを変えることもありません。純粋関数はこれと同じ性質をプログラムに持ち込みます。オブジェクト指向の「にんじんが自分で自分を刻む」状態とは対照的に、関数型は「刻む前のにんじん」と「刻んだ後のにんじん」を別々の不変な値として扱い、元のにんじんは決して変化しません。
      </Analogy>

      <Heading num="03">手続きを使わない書き方 ― 再帰とパターンマッチ</Heading>
      <p>
        可変な変数を避けるということは、<code>for</code>・<code>while</code>のようにカウンタ変数を書き換えながら回すループも使わないということです。代わりに関数型では、自分自身をより小さな入力で呼び直す<Term>再帰</Term>で繰り返しを表現します。同様に、値の中身を見てから<code>if</code>で分岐するのではなく、値の「形」そのもので分岐先を決める<Term>パターンマッチ</Term>と、その分岐に条件を添える<Term>ガード</Term>を使います。
      </p>
      <table>
        <thead>
          <tr>
            <th>手続き型の書き方</th>
            <th>関数型の書き方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ループ</td>
            <td>再帰 ― 空リストなど「これ以上分解できない形」を基底ケースとし、そこに至るまで自分自身を呼ぶ</td>
          </tr>
          <tr>
            <td className="hl">if・switchによる分岐</td>
            <td>パターンマッチ ― 値の形(空リストか、先頭と残りに分けられるか)ごとに処理を書き分ける</td>
          </tr>
          <tr>
            <td className="hl">条件式の入れ子</td>
            <td>ガード ― パターンに続けて「かつ〜のとき」という条件を添える</td>
          </tr>
        </tbody>
      </table>
      <p>
        例えばリストの長さを求める関数は、「空リストの長さは0」「先頭+残りのリストなら、残りの長さ+1」という2つのパターンだけで定義できます。<code>if</code>の入れ子で読みにくくなる問題を、パターンマッチは「あり得る形を列挙する」書き方に置き換えることで解消します。値の有無や成否を安全に取り出す実践的な形は<Link href="/design/paradigm-functional-safety">安全に分岐する</Link>で扱います。
      </p>

      <Heading num="04">型がプログラムを守る ― カリー化と型クラス</Heading>
      <p>
        関数型言語では、複数の引数を取る関数も「1引数を受け取り、残りの引数を待つ関数を返す」という連鎖として型付けされるのが基本です(<Term>カリー化</Term>)。これにより、引数の一部だけを先に固定した新しい関数を作りやすくなります。具体的な書き方は<Link href="/design/paradigm-functional-currying">引数を固定する</Link>で扱います。
      </p>
      <p>
        もう1つの柱が<Term>型クラス</Term>です。「等しいか比較できる」「順序付けできる」といった共通の振る舞いを、継承のような親子関係を作らずに、既存の型にも後から対応させられる形で定義します(<Term>アドホック多相</Term>)。オブジェクト指向の<Term>インターフェース</Term>が「このクラスは最初からこの振る舞いを持つ」と宣言するのに対し、型クラスは「この型はこの振る舞いに後付けで対応させられる」という向きの柔軟さを持ちます。
      </p>

      <Heading num="05">副作用を型に閉じ込める ― モナドという考え方</Heading>
      <p>
        純粋関数だけでは、画面への表示・ファイルの読み書き・失敗するかもしれない計算といった「現実世界とのやり取り」を表現できません。関数型言語はこれらを、戻り値の型に「値が無いかもしれない」「これは副作用を伴う処理である」という情報を含めることで扱います。こうした<Term>型に包まれた値</Term>を、包みを開けずに次々と処理へつなげるための共通の構造が<Term>モナド</Term>です。最も身近な例は値の有無を表す<Term>Maybe</Term>で、Haskellのような純粋関数型言語では、画面出力などの副作用そのものを表す<Term>IO</Term>や、状態の受け渡しを表す<Term>State</Term>もモナドとして扱われます。
      </p>

      <Heading num="06">特徴と向き不向き</Heading>
      <p>
        副作用がないためテストが書きやすく(入力と出力だけを確認すればよい)、複数のスレッドが同じデータを同時に読んでも安全なため並行処理と相性が良いのが利点です。一方で、すべてをイミュータブルに保とうとすると大きなデータ構造のコピーで性能面の工夫が必要になり、手続き型やオブジェクト指向に慣れた開発者には発想の転換も要ります。実務では、副作用を境界に押し出し、内部のロジックだけを純粋関数で書くという部分的な採用が一般的です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>純粋関数が基本単位</h4>
          <p>同じ入力には同じ出力。副作用を持たないため、追跡と検証がしやすい。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再帰とパターンマッチ</h4>
          <p>ループの代わりに再帰、if分岐の代わりに値の形による分岐で組み立てる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>モナドで副作用を表現する</h4>
          <p>値の有無・失敗・副作用を型に包み、包んだまま安全に処理をつなげる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-functional" />
    </DocsPage>
  );
}
