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
  Diagram,
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "プログラミング言語の仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>プログラミング言語の仕組み ― パラダイム・実行方式・型システム</h1>
        <Lead>
          「OSの仕組み」ではプロセスが、「メモリの仕組み」ではそのプロセスがデータをどこに置くかを見てきました。ここでは視点をもう一段掘り下げ、そもそも私たちが書いたソースコードが、どんな考え方で設計され、どうやって実際に動く命令になるのかを、パラダイム・実行方式・型システムという3つの軸で整理します。
        </Lead>
      </Hero>

      <Heading num="01">プログラミングパラダイムの分類 ― 命令型と宣言型</Heading>
      <p>プログラミング言語には、それぞれ「どう考えてコードを書くか」という設計思想があります。これを<Term>プログラミングパラダイム</Term>と呼びます。パラダイムは大きく<Term>命令型(imperative)</Term>と<Term>宣言型(declarative)</Term>の2つに分かれます。</p>
      <p><strong>命令型</strong>は「どうやって(How)」を1手順ずつ書く考え方です。変数の値を更新しながら、目的の結果まで手順を積み上げていきます。<strong>宣言型</strong>は「何を(What)」欲しいかだけを書き、途中の手順は言語処理系に任せる考え方です。</p>

      <table>
        <tbody>
          <tr><th>分類</th><th>パラダイム</th><th>考え方</th><th>代表言語</th></tr>
          <tr><td className="hl" rowSpan={2}>命令型</td><td>手続き型</td><td>処理を関数(手続き)の呼び出し列として書く</td><td>C、Pascal</td></tr>
          <tr><td>オブジェクト指向</td><td>データと処理を「オブジェクト」にまとめて書く</td><td>Java、C++、Python</td></tr>
          <tr><td className="hl" rowSpan={2}>宣言型</td><td>関数型</td><td>状態を変更せず、関数の組み合わせで結果を導く</td><td>Haskell、Elixir</td></tr>
          <tr><td>論理型</td><td>「事実」と「規則」を宣言し、処理系に解を探させる</td><td>Prolog</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        タクシーに乗ったときの2通りの頼み方です。<strong>命令型</strong>は「そこの信号を右、次の交差点を左、200m先で停めて」と道順を1つずつ指示すること。<strong>宣言型</strong>は「駅まで」とだけ伝え、どの道順を通るかは運転手(言語処理系)に任せることです。
      </Analogy>

      <Aside label="豆知識">
        多くの言語は1つのパラダイムだけに属しません。例えばPythonはオブジェクト指向をベースにしつつ関数型の要素(<code>map</code>・<code>filter</code>)も取り入れた<Term>マルチパラダイム言語</Term>です。パラダイムがどんな歴史的経緯で登場してきたかは、後の「設計」カテゴリのパラダイムページで詳しく扱います。
      </Aside>

      <Heading num="02">実行方式 ― ソースコードは、どうやって動く命令になるのか</Heading>
      <p>人間が読めるソースコードは、そのままではCPUは実行できません。最終的にCPUが理解できる<Term>機械語</Term>に変換する必要があり、その変換のタイミングと方法によって、言語処理系は大きく4つの方式に分かれます。</p>

      <Diagram caption="ソースコードから実行までの4つの経路">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={15} width={140} height={36} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={38} fill="#f2f2f2" fontSize="13" textAnchor="middle">ソースコード</text>

          <line x1={160} y1={33} x2={220} y2={33} stroke="#5f5f5f" strokeWidth="1.5" />
          <polygon points="220,33 210,28 210,38" fill="#5f5f5f" />

          <rect x={230} y={0} width={160} height={34} fill="none" stroke="#5f5f5f" />
          <text x={310} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">① コンパイラ → 機械語</text>

          <rect x={230} y={40} width={160} height={34} fill="none" stroke="#5f5f5f" />
          <text x={310} y={62} fill="#9a9a9a" fontSize="12" textAnchor="middle">② インタプリタが1行ずつ解釈</text>

          <rect x={230} y={80} width={160} height={34} fill="none" stroke="#5f5f5f" />
          <text x={310} y={102} fill="#9a9a9a" fontSize="12" textAnchor="middle">③ コンパイラ → バイトコード</text>

          <rect x={230} y={120} width={160} height={34} fill="none" stroke="#5f5f5f" />
          <text x={310} y={142} fill="#9a9a9a" fontSize="12" textAnchor="middle">④ JITが実行しながら機械語化</text>

          <line x1={390} y1={17} x2={440} y2={17} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={390} y1={57} x2={440} y2={57} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={390} y1={97} x2={440} y2={130} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={390} y1={137} x2={440} y2={137} stroke="#5f5f5f" strokeWidth="1.5" />

          <rect x={450} y={0} width={170} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={535} y={22} fill="#f2f2f2" fontSize="12" textAnchor="middle">機械語として直接実行</text>

          <rect x={450} y={40} width={170} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={535} y={62} fill="#f2f2f2" fontSize="12" textAnchor="middle">その場で解釈しながら実行</text>

          <rect x={450} y={110} width={170} height={54} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={535} y={132} fill="#f2f2f2" fontSize="12" textAnchor="middle">仮想マシン(VM)が</text>
          <text x={535} y={150} fill="#f2f2f2" fontSize="12" textAnchor="middle">バイトコードを実行</text>

          <text x={90} y={220} fill="#9a9a9a" fontSize="11" textAnchor="middle">例: C / C++ / Go / Rust</text>
          <text x={535} y={230} fill="#9a9a9a" fontSize="11" textAnchor="middle">③④の例: Java(JVM)・.NET・Python・JavaScript(V8)</text>
        </svg>
      </Diagram>

      <h3>コンパイル方式 ― 実行前に丸ごと機械語へ翻訳</h3>
      <p><Term>コンパイラ</Term>がソースコード全体を事前に読み込み、実行ファイル(機械語)を生成します。一度変換してしまえば、実行時の変換コストがないため高速に動作します。反面、少しコードを直すたびに再度コンパイルし直す手間がかかります。C、C++、Go、Rustなどが代表例です。</p>

      <h3>インタプリタ方式 ― その場で1行ずつ解釈しながら実行</h3>
      <p><Term>インタプリタ</Term>は、ソースコードを事前に丸ごと変換せず、実行しながら1行ずつ読んで解釈します。コードを直してすぐ試せる手軽さがある反面、実行のたびに解釈のコストがかかり、コンパイル方式より低速になりがちです。</p>

      <h3>バイトコード方式 ― 中間形式にしてから仮想マシンで実行</h3>
      <p>コンパイルとインタプリタの中間にあたるのが<Term>バイトコード</Term>方式です。ソースコードは特定のCPUの機械語ではなく、<Term>仮想マシン(VM)</Term>が実行する中間形式の命令(バイトコード)に変換されます。VMさえ用意すればどのOS・CPUでも同じバイトコードが動くため、可搬性(ポータビリティ)が高いのが特徴です。Javaの<code>.class</code>ファイル(JVMが実行)や、Pythonの<code>.pyc</code>ファイルがこれにあたります。</p>

      <h3>JIT(Just-In-Time)コンパイル ― 動かしながら最適化する</h3>
      <p><Term>JITコンパイル</Term>は、インタプリタとして実行を始めつつ、頻繁に実行される箇所を実行中に機械語へコンパイルして差し替える方式です。起動はインタプリタ並みに早く、繰り返し実行される部分はコンパイル方式に近い速度が出せます。ブラウザのJavaScriptエンジン(V8など)や、JavaのJVM(HotSpot)が採用しています。</p>

      <Analogy label="💡 たとえるなら">
        海外文学を読む3通りの方法です。<strong>コンパイル</strong>は本を丸ごと日本語に翻訳してから読む(準備は大変だが読むのは速い)。<strong>インタプリタ</strong>は通訳者が1文ずつその場で訳してくれるのを聞く(すぐ始められるが都度時間がかかる)。<strong>JIT</strong>は最初は通訳で聞きながら、何度も出てくる決まり文句だけを暗記カードにして次からは即座に読み上げる、良いとこ取りの方法です。
      </Analogy>

      <Heading num="03">型システム ― 値の「型」をいつ確定させるか</Heading>
      <p>変数や値がどんな種類のデータ(数値・文字列・オブジェクトなど)かを表すのが<Term>型</Term>です。型をいつ・どれだけ厳密にチェックするかという方針を<Term>型システム</Term>と呼び、大きく<Term>静的型付け</Term>と<Term>動的型付け</Term>に分かれます。</p>

      <table>
        <tbody>
          <tr><th></th><th>静的型付け</th><th>動的型付け</th></tr>
          <tr><td className="hl">型が決まるタイミング</td><td>コンパイル時(実行前)</td><td>実行時</td></tr>
          <tr><td className="hl">型の間違いに気づくタイミング</td><td>コードを書いている・ビルドする段階</td><td>実際にそのコードが実行された瞬間</td></tr>
          <tr><td className="hl">代表言語</td><td>Java、C、Go、Rust、TypeScript</td><td>Python、JavaScript、Ruby、PHP</td></tr>
        </tbody>
      </table>

      <p>静的型付けは、変数を宣言する時点で型を明示(または推論)し、コンパイラが「文字列に数値を足そうとしていないか」などを実行前にチェックしてくれます。大規模なコードでもバグを早期に発見しやすい一方、型を書く手間が増えます。動的型付けは型の宣言が不要で書き始めるまでが速い反面、型の不一致による間違いは実際にそのコードが実行されるまで表面化しません。</p>

      <Aside label="豆知識">
        JavaScriptは動的型付け言語ですが、そこに開発時だけ型注釈と型チェックを追加したのが<Term>TypeScript</Term>です。TypeScriptのコードは最終的にJavaScriptに変換されて実行されるため、実行時の型システム自体はJavaScriptと同じ動的型付けのままです。
      </Aside>

      <Heading num="まとめ">3つの軸は独立している</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>パラダイムは「考え方」の軸</h4>
          <p>命令型(手続き型・オブジェクト指向)か、宣言型(関数型・論理型)か ― コードをどう組み立てるかという設計思想です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>実行方式は「誰が・いつ機械語にするか」の軸</h4>
          <p>事前に一括変換(コンパイル)か、その場で解釈(インタプリタ)か、中間形式を経由するか(バイトコード・JIT)かの違いです。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型システムは「いつ型が決まるか」の軸</h4>
          <p>コンパイル時に決まる(静的型付け)か、実行時に決まる(動的型付け)かで、間違いに気づけるタイミングが変わります。</p>
        </Card>
      </CardGrid>
      <p>これら3つの軸は互いに独立しており、1つの言語がどの組み合わせを選んでいるかで特徴が決まります。次は再び視点を広げ、コンピュータ同士がどんな共通ルールでやり取りしているのか、「通信プロトコル」を見ていきましょう。</p>

      <Heading num="発展">3つの軸をそれぞれ深く見る</Heading>
      <IndexGrid>
        <IndexCard href="/dev/language-basics/compile" num="01" title="コンパイルとリンク">
          字句解析から最適化、そしてリンカ・ローダまで ― 実行ファイルになるまでの工程
        </IndexCard>
        <IndexCard href="/dev/language-basics/types" num="02" title="型システム">
          静的/動的だけではない4つの軸、推論・多相・健全性・Null安全
        </IndexCard>
        <IndexCard href="/dev/language-basics/memory" num="03" title="メモリ管理とGC">
          手動・参照カウント・トレーシングGC・所有権 ― 誰がいつ片付けるのか
        </IndexCard>
        <IndexCard href="/dev/language-basics/compare" num="04" title="主要言語の比較">
          C・Rust・Go・Java・Python・JSを4軸で並べ、何を優先した設計かを読む
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル ― OSI参照モデルとTCP/IP</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― レジスタからストレージまで</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み ― プロセス・スレッド・カーネル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
