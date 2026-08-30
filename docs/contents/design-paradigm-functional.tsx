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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "関数型",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム 1980s〜</Eyebrow>
        <h1>関数型 ― 副作用を持たない関数の組み合わせ</h1>
        <Lead>
          理論自体は1930年代、Alonzo Churchが提唱した<Term>ラムダ計算</Term>にまでさかのぼりますが、実用言語として広まったのは1980年代以降です。入力が同じなら常に同じ結果を返し、外部の状態を書き換えない<Term>純粋関数</Term>を基本単位とすることで、<Term>オブジェクト指向</Term>が抱えていた「状態がいつの間にか書き換わる」問題を避けようとする考え方です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>オブジェクト指向は「データと処理をまとめる」ことでコードの整理に成功しましたが、複数のオブジェクトが互いの内部状態を書き換え合うようになると、「今この値は誰が変えたのか」を追うのが再び難しくなります。特に並行処理では、複数のスレッドが同じ可変な状態を同時に書き換えることで競合状態(レースコンディション)が発生しやすくなります。関数型プログラミングは、そもそも状態を変更しない(<Term>イミュータブル</Term>)ことで、この問題自体を起きなくします。代表例はHaskell・Lisp・Erlangです。</p>

      <Heading num="02">基本単位は「純粋関数」</Heading>
      <table>
        <thead>
          <tr><th>概念</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">純粋関数</td><td>同じ入力に対して常に同じ出力を返し、外部に副作用を及ぼさない</td></tr>
          <tr><td className="hl">参照透過性</td><td>式をその評価結果に置き換えても、プログラムの意味が変わらない性質</td></tr>
          <tr><td className="hl">イミュータブル</td><td>一度作ったデータは変更せず、変更が必要なら新しいデータを作る</td></tr>
          <tr><td className="hl">高階関数</td><td>関数を引数として受け取ったり、関数を戻り値として返したりする関数</td></tr>
        </tbody>
      </table>
      <p>この基本単位を使い、<code>map</code>/<code>filter</code>/<code>reduce</code>のような小さな純粋関数を組み合わせて(<Term>関数合成</Term>)、大きな処理を組み立てます。組み合わせ方の具体例は<Link href="/design/paradigm/functional/composition">関数を組み合わせる</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        数学の関数<code>f(x) = x + 1</code>は、何度呼んでも同じ入力なら同じ答えを返し、呼んだこと自体が世界の何かを変えることもありません。純粋関数はこれと同じ性質をプログラムに持ち込みます。オブジェクト指向の「にんじんが自分で自分を刻む」状態とは対照的に、関数型は「刻む前のにんじん」と「刻んだ後のにんじん」を別々の不変な値として扱い、元のにんじんは決して変化しません。
      </Analogy>

      <Heading num="03">手続きを使わない書き方 ― 再帰とパターンマッチ</Heading>
      <p>可変な変数を避けるということは、<code>for</code>/<code>while</code>のようにカウンタ変数を書き換えながら回すループも使わないということです。代わりに関数型では、自分自身をより小さな入力で呼び直す<Term>再帰</Term>で繰り返しを表現します。同様に、値の中身を見てから<code>if</code>で分岐するのではなく、値の「形」そのもので分岐先を決める<Term>パターンマッチ</Term>と、その分岐に条件を添える<Term>ガード</Term>を使います。</p>
      <table>
        <thead>
          <tr><th>手続き型の書き方</th><th>関数型の書き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ループ(<code>for</code>/<code>while</code>)</td><td>再帰 ― 空リストなど「これ以上分解できない形」を基底ケースとし、そこに至るまで自分自身を呼ぶ</td></tr>
          <tr><td className="hl"><code>if</code>/<code>switch</code>による分岐</td><td>パターンマッチ ― 値の形(空リストか・先頭と残りに分けられるか等)ごとに処理を書き分ける</td></tr>
          <tr><td className="hl">条件式の入れ子</td><td>ガード ― パターンに続けて「かつ〜のとき」という条件を添える</td></tr>
        </tbody>
      </table>
      <p>例えばリストの長さを求める関数は、「空リストの長さは0」「先頭+残りのリストなら、残りの長さ+1」という2つのパターンだけで定義できます。挿入ソートも同様に、「空リストに挿入したらそれ自身」「先頭要素と比較して挿入位置を再帰的に探す」という形で書けます。<code>if</code>による条件分岐が入れ子になって読みにくくなる問題を、パターンマッチは「あり得る形を列挙する」という書き方に置き換えることで解消します。値の有無や成否をパターンマッチで安全に取り出す実践的な形は<Link href="/design/paradigm/functional/safety">安全に分岐する</Link>で扱います。</p>

      <Heading num="04">型がプログラムを守る ― 関数の型と型クラス</Heading>
      <p>関数型言語では、複数の引数を取る関数も「1引数を受け取り、残りの引数を待つ関数を返す」という形の連鎖として型付けされるのが基本です(<Term>カリー化</Term>)。これにより、引数の一部だけを先に固定した新しい関数を作りやすくなります。具体的な書き方は<Link href="/design/paradigm/functional/currying">引数を固定する</Link>で扱います。</p>
      <p>もう1つの柱が<Term>型クラス</Term>です。「等しいか比較できる」「順序付けできる」「文字列として表示できる」といった共通の振る舞いを、継承のような親子関係を作らずに、既存の型もあとから追加で対応させられる形で定義します(<Term>アドホック多相</Term>)。オブジェクト指向の<Term>インターフェース</Term>が「このクラスは最初からこの振る舞いを持つ」と宣言するのに対し、型クラスは「この型はこの振る舞いに後付けで対応させられる」という向きの柔軟さを持ちます。</p>

      <Heading num="05">特徴と向き不向き</Heading>
      <p>副作用がないため、テストが書きやすく(入力と出力だけを確認すればよい)、複数のスレッドが同じデータを同時に読んでも安全なため並行処理と相性が良いのが利点です。一方で、全てをイミュータブルに保とうとすると、大きなデータ構造のコピーによる性能面の工夫が必要になったり、手続き型やオブジェクト指向に慣れた開発者には考え方の転換(発想の再学習)が必要だったりします。実務では、副作用(DB書き込み・画面表示など)を境界に押し出し、内部のロジックだけを純粋関数で書く、という部分的な採用が一般的です。</p>

      <Heading num="06">副作用を型に閉じ込める ― モナドという考え方</Heading>
      <p>そもそも純粋関数だけでは、画面への表示・ファイルの読み書き・失敗するかもしれない計算といった「現実世界とのやり取り」を表現できません。関数型言語はこれらを、戻り値の型に「値が無いかもしれない」「これは副作用を伴う処理である」という情報を含めることで扱います。こうした「型に包まれた値」を、包みを開けずに次々と処理へつなげていくための共通の構造が<Term>モナド</Term>です。最も身近な例は、値の有無を表す<Term>Maybe</Term>(TypeScriptでの実践形は<Link href="/design/paradigm/functional/safety">Option/Maybe</Link>)で、Haskellのような純粋関数型言語ではさらに、画面出力などの副作用そのものを表す<Term>IO</Term>や、状態の受け渡しを表す<Term>State</Term>もモナドとして扱われます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>純粋関数が基本単位</h4><p>同じ入力には同じ出力。副作用を持たないため、追跡と検証がしやすい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>再帰とパターンマッチ</h4><p>ループの代わりに再帰、if分岐の代わりに値の形による分岐で処理を組み立てる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>型クラスで振る舞いを後付けする</h4><p>継承ではなく、既存の型に共通の振る舞いをあとから対応させる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>モナドで副作用を表現する</h4><p>値の有無・失敗・副作用を型に包み、包んだまま安全に処理をつなげる。</p></Card>
      </CardGrid>

      <p>実務では1つのパラダイムだけを使うことは少なく、JavaScript/TypeScriptのように<Term>マルチパラダイム</Term>の言語で、オブジェクト指向的な設計と関数型的な書き方を併用するのが一般的です。次のページからは、より大きな粒度で「何を軸に設計するか」を決める<Link href="/design/methodology">設計思想・方法論</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional/foundations" tag="設計">関数型パターン</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/composition" tag="設計">関数を組み合わせる</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/safety" tag="設計">安全に分岐する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/methodology" tag="設計">設計思想・方法論</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
