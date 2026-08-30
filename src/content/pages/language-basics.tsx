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
  title: "言語の仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>言語の仕組み ― 書いた文字が、動く命令になるまで</h1>
        <Lead>
          プログラミング言語は数百種類ありますが、覚えるべきは個々の言語ではなく、言語同士を見分けるための<Term>軸</Term>です。どういう考え方でコードを組み立てるのか(パラダイム)、書いた文字をいつ誰が機械語に変えるのか(実行方式)、値の種類をいつ確定させるのか(型システム)
          ― この3つが分かると、初めて触る言語でも「どういう性格の言語か」を最初の1時間で見当づけられるようになります。
        </Lead>
      </Hero>

      <Heading num="01">言語を見る3つの軸</Heading>
      <p>
        言語の特徴は、次の3つの軸のどこに位置するかでほぼ説明できます。重要なのは、この3つが<Term>互いに独立している</Term>ことです。「静的型付けだからコンパイル方式」といった思い込みは成り立たず、TypeScriptのように静的型付けでありながら最終的にJITで動く組み合わせも普通にあります。
      </p>

      <DiagramFrame
        slug="language-basics-axes"
        aspect="640 / 300"
        caption="プログラミング言語を見る3つの軸。1段目のパラダイムは、命令型(手続き型・オブジェクト指向)と宣言型(関数型・論理型)。2段目の実行方式は、コンパイル・インタプリタ・バイトコードと仮想マシン・JIT。3段目の型システムは、静的型付けと動的型付け。3つの軸は互いに独立しており、Goは命令型・コンパイル・静的型付け、JavaScriptはマルチパラダイム・JIT・動的型付けというように、言語ごとに組み合わせが異なる。"
      />

      <Heading num="02">パラダイム ― 「どうやって」を書くか、「何を」書くか</Heading>
      <p>
        <Term>プログラミングパラダイム</Term>は、コードをどういう考え方で組み立てるかという設計思想です。大きくは<Term>命令型</Term>と<Term>宣言型</Term>に分かれます。命令型は「どうやって(How)」を1手順ずつ書き、変数の値を更新しながら目的の結果まで積み上げます。宣言型は「何を(What)」欲しいかだけを書き、途中の手順は言語処理系に任せます。
      </p>

      <table>
        <thead>
          <tr>
            <th>分類</th>
            <th>パラダイム</th>
            <th>考え方</th>
            <th>代表言語</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">命令型</td>
            <td>手続き型</td>
            <td>処理を関数(手続き)の呼び出し列として書く</td>
            <td>C、Pascal</td>
          </tr>
          <tr>
            <td className="hl">命令型</td>
            <td>オブジェクト指向</td>
            <td>データと処理をオブジェクトにまとめて書く</td>
            <td>Java、C++、Python</td>
          </tr>
          <tr>
            <td className="hl">宣言型</td>
            <td>関数型</td>
            <td>状態を変更せず、関数の組み合わせで結果を導く</td>
            <td>Haskell、Elixir</td>
          </tr>
          <tr>
            <td className="hl">宣言型</td>
            <td>論理型</td>
            <td>事実と規則を宣言し、処理系に解を探させる</td>
            <td>Prolog</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        タクシーでの2通りの頼み方です。<strong>命令型</strong>は「そこの信号を右、次の交差点を左、200m先で停めて」と道順を1つずつ指示すること。<strong>宣言型</strong>は「駅まで」とだけ伝え、どの道を通るかは運転手(言語処理系)に任せることです。
      </Analogy>

      <Aside label="設計セクションとの棲み分け">
        ここでは「言語を分類する軸」としてパラダイムを扱っています。それぞれのパラダイムがどんな困りごとへの回答として生まれ、実際のコードをどう書き分けるのかは、設計セクションの<Link href="/design/paradigm">パラダイム</Link>で扱います。
      </Aside>

      <Heading num="03">実行方式 ― 誰が、いつ機械語にするのか</Heading>
      <p>
        人間が読めるソースコードを、CPUはそのままでは実行できません。最終的には<Term>機械語</Term>に変換する必要があり、その<Term>変換のタイミング</Term>によって処理系は4つの方式に分かれます。
      </p>

      <DiagramFrame
        slug="language-basics-execution"
        aspect="660 / 290"
        caption="ソースコードが実行されるまでの4つの経路。①コンパイラが事前に全体を翻訳し、生成された機械語をCPUが直接実行する(C・Go・Rust)。②インタプリタが1行ずつ読んで解釈しながら実行する(シェルスクリプト・初期のRuby)。③コンパイラがバイトコードという中間形式に変換し、仮想マシンがそれを実行する(Java・Python)。④JITはインタプリタとして動かしながら、繰り返し実行される部分だけを機械語に置き換えていく(JavaScriptのV8・JavaのHotSpot)。下へ行くほど翻訳のタイミングが実行時に近づく。"
      />

      <h3>コンパイル方式 ― 実行前に丸ごと翻訳する</h3>
      <p>
        <Term>コンパイラ</Term>がソースコード全体を事前に読み、実行ファイル(機械語)を生成します。一度変換してしまえば実行時に変換コストがかからないため高速で、型の間違いや未定義の関数もこの段階で洗い出せます。反面、少し直すたびにビルドし直す時間がかかり、生成物はCPUとOSに固有になります。
      </p>

      <h3>インタプリタ方式 ― その場で1行ずつ解釈する</h3>
      <p>
        <Term>インタプリタ</Term>は事前に変換せず、実行しながら1行ずつ読んで解釈します。書いてすぐ試せる手軽さがある一方、実行のたびに解釈のコストがかかります。エラーも、その行に到達して初めて表面化します。
      </p>

      <h3>バイトコード方式 ― 中間形式にして仮想マシンで動かす</h3>
      <p>
        両者の中間が<Term>バイトコード</Term>方式です。ソースコードを特定のCPUの機械語ではなく、<Term>仮想マシン(VM)</Term>が実行する中間形式に変換します。VMさえあればどのOS・CPUでも同じバイトコードが動くため、可搬性が高くなります。Javaの<code>.class</code>、Pythonの<code>.pyc</code>がこれにあたります。
      </p>

      <h3>JITコンパイル ― 動かしながら、熱い場所だけ翻訳する</h3>
      <p>
        <Term>JIT(Just-In-Time)コンパイル</Term>は、インタプリタとして実行を始めつつ、繰り返し実行される箇所を実行中に機械語へコンパイルして差し替える方式です。起動はインタプリタ並みに速く、ホットな部分はコンパイル方式に近い速度が出ます。ブラウザのJavaScriptエンジン(V8)やJVM(HotSpot)が採用しています。
      </p>

      <Analogy label="💡 たとえるなら">
        海外文学を読む3通りの方法です。<strong>コンパイル</strong>は本を丸ごと翻訳してから読む(準備は大変だが読むのは速い)。<strong>インタプリタ</strong>は通訳者に1文ずつ訳してもらう(すぐ始められるが毎回時間がかかる)。<strong>JIT</strong>は通訳で聞き進めつつ、何度も出てくる決まり文句だけ暗記して次からは即座に読む、良いとこ取りの方法です。
      </Analogy>

      <Aside label="どの方式でも通る道">
        方式が違っても、字句解析(文字を単語に切る)→ 構文解析(文法に沿った木にする)→ 意味解析 → 最適化、という前半の工程はほぼ共通です。この工程は<Link href="/theory/formal">形式言語</Link>で扱う文法の話そのもので、言語処理系は形式文法の最も身近な実装例と言えます。
      </Aside>

      <Heading num="04">型システム ― 値の種類を、いつ確定させるか</Heading>
      <p>
        値がどんな種類のデータかを表すのが<Term>型</Term>です。型をいつ・どれだけ厳密に検査するかという方針を<Term>型システム</Term>と呼び、検査のタイミングで<Term>静的型付け</Term>と<Term>動的型付け</Term>に分かれます。
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>静的型付け</th>
            <th>動的型付け</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">型が決まるタイミング</td>
            <td>実行前(コンパイル時)</td>
            <td>実行時</td>
          </tr>
          <tr>
            <td className="hl">間違いに気づくタイミング</td>
            <td>書いている最中・ビルドの段階</td>
            <td>その行が実際に実行された瞬間</td>
          </tr>
          <tr>
            <td className="hl">引き換えに払うもの</td>
            <td>型を書く手間、ビルド時間</td>
            <td>実行するまで分からない不安</td>
          </tr>
          <tr>
            <td className="hl">代表言語</td>
            <td>Java、C、Go、Rust、TypeScript</td>
            <td>Python、JavaScript、Ruby、PHP</td>
          </tr>
        </tbody>
      </table>

      <p>
        静的型付けでは、コンパイラが「文字列に数値を足していないか」「存在しないプロパティを読んでいないか」を実行前に検査します。人手のレビューやテストを待たずに一定の間違いが機械的に潰れるため、規模が大きいほど効きます。動的型付けは宣言が要らないぶん書き始めが速く、小さなスクリプトでは手数の少なさがそのまま利点になります。
      </p>

      <Aside label="TypeScriptの立ち位置">
        JavaScriptは動的型付けの言語で、そこに<Term>開発時だけ</Term>型注釈と型検査を足したのがTypeScriptです。型は変換時に消えるため、実行時の型の扱いはJavaScriptのままです。この関係は次の<Link href="/language/js">JavaScript・TypeScript</Link>で詳しく見ます。
      </Aside>

      <Heading num="05">もう1つの分かれ道 ― 使い終えたメモリを誰が片付けるか</Heading>
      <p>
        3つの軸に加えて、実際の使い勝手を大きく左右するのが<Term>メモリ管理</Term>の方針です。プログラムが確保したメモリを、いつ・誰が解放するのかで、言語の性格はかなり変わります。
      </p>

      <table>
        <thead>
          <tr>
            <th>方式</th>
            <th>誰が片付けるか</th>
            <th>代表言語</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">手動管理</td>
            <td>書く人。速いが、解放し忘れ(リーク)と二重解放の危険がある</td>
            <td>C、C++</td>
          </tr>
          <tr>
            <td className="hl">ガベージコレクション</td>
            <td>実行環境。到達できなくなった領域を自動で回収する。停止時間が読みにくい</td>
            <td>Java、Go、JavaScript、Python</td>
          </tr>
          <tr>
            <td className="hl">所有権</td>
            <td>コンパイラ。値の持ち主を1つに定め、範囲を抜けたら自動で解放する</td>
            <td>Rust</td>
          </tr>
        </tbody>
      </table>

      <p>
        どこにメモリを置くのか(スタックとヒープ)、なぜ関数を抜けると自動で消える領域があるのかは、<Link href="/computer/memory-stack">スタックと関数呼び出しの舞台裏</Link>で扱っています。言語側の「誰が片付けるか」と、ハードウェア側の「どこに置くか」は表裏の関係です。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>軸は独立している</h4>
          <p>
            パラダイム・実行方式・型システムは別々の軸。組み合わせが言語の性格を決めます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>違いは「いつやるか」</h4>
          <p>
            翻訳も型検査も、実行前に寄せるほど速く安全になり、実行時に寄せるほど手軽になります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>どちらが上でもない</h4>
          <p>
            各方式は得失の取り方が違うだけ。何を優先した設計かを読むのが、言語を理解する近道です。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、この3つの軸の上で実際にどこに位置するのかを、手を動かす言語 ―
        <Link href="/language/js">JavaScript・TypeScript</Link>で確かめます。
      </p>

      <DocsFooter href="/language/basics" />
    </DocsPage>
  );
}
