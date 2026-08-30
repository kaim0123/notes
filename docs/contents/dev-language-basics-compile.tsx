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
  Diagram,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンパイルとリンク",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 言語</Eyebrow>
        <h1>コンパイルとリンク ― ソースコードが実行ファイルになるまで</h1>
        <Lead>
          「コンパイルする」の一語の中には、字句解析から最適化、そして<strong>複数の部品を1つに繋ぐリンク</strong>まで、性格の異なる工程が並んでいます。エラーメッセージが「コンパイルエラー」なのか「リンクエラー」なのかで原因はまったく違いますし、実行時に「ライブラリが見つからない」と言われる理由も、この工程を知らないと分かりません。
        </Lead>
      </Hero>

      <p>コンパイル方式・インタプリタ方式・JITといった<strong>実行方式の分類</strong>は「<Link href="/dev/language-basics">プログラミング言語の仕組み</Link>」で扱いました。ここでは、その内部で何が行われているかを追います。</p>

      <Heading num="01">全体の流れ</Heading>
      <Diagram caption="ソースコードから実行ファイルまでの5工程">
        <svg viewBox="0 0 430 180" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={20} width={110} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={65} y={40} fill="#f2f2f2" fontSize="11" textAnchor="middle">ソースコード</text>
          <rect x={10} y={65} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={65} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">字句・構文解析</text>
          <rect x={10} y={110} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={65} y={130} fill="#f2f2f2" fontSize="11" textAnchor="middle">意味解析(型検査)</text>
          <rect x={165} y={20} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={220} y={40} fill="#f2f2f2" fontSize="11" textAnchor="middle">中間表現・最適化</text>
          <rect x={165} y={65} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={220} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">コード生成</text>
          <rect x={165} y={110} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={220} y={130} fill="#f2f2f2" fontSize="11" textAnchor="middle">オブジェクトファイル</text>
          <rect x={310} y={65} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={365} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">リンク</text>
          <rect x={310} y={110} width={110} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={365} y={130} fill="#f2f2f2" fontSize="11" textAnchor="middle">実行ファイル</text>
          <line x1={65} y1={50} x2={65} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={65} y1={95} x2={65} y2={110} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={120} y1={125} x2={165} y2={40} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={220} y1={50} x2={220} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={220} y1={95} x2={220} y2={110} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={275} y1={125} x2={310} y2={85} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={365} y1={95} x2={365} y2={110} stroke="#5f5f5f" strokeWidth="1.5" />
        </svg>
      </Diagram>
      <p>前半(解析)を<Term>フロントエンド</Term>、後半(最適化・生成)を<Term>バックエンド</Term>と呼びます。この分離のおかげで、「複数の言語 × 複数のCPU」の組み合わせを掛け算ではなく足し算で扱えます ― LLVMのような共通基盤が成立する理由です。</p>

      <Heading num="02">字句解析と構文解析 ― 文字列を構造にする</Heading>
      <table>
        <tbody>
          <tr><th>工程</th><th>入力 → 出力</th><th>検出できる誤り</th></tr>
          <tr><td className="hl">字句解析(スキャナ)</td><td>文字の並び → 単語(トークン)の列</td><td>使えない文字、閉じていない文字列リテラル</td></tr>
          <tr><td className="hl">構文解析(パーサ)</td><td>トークン列 → <Term>抽象構文木(AST)</Term></td><td>括弧の不一致、文法違反</td></tr>
        </tbody>
      </table>
      <p>この2工程は「<Link href="/theory/formal">形式言語</Link>」で扱う正規表現と文脈自由文法にそのまま対応します。字句は正規表現で、構文はBNFで書ける ― 理論がそのまま実装の骨格になっている珍しい領域です。</p>
      <p>ASTはコンパイラ専用のものではありません。<strong>Lint・整形ツール・トランスパイラ・IDEの補完</strong>はいずれもASTを作って操作しています(「<Link href="/dev/tooling/build">ビルドの中身</Link>」)。</p>

      <Heading num="03">意味解析 ― 文法は合っているが意味が通らない</Heading>
      <p>構文的に正しくても、意味的に誤っているコードがあります。<code>const x: number = &quot;hello&quot;</code> は文法上は完全に正しい文です。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>名前解決</h4><p>その変数はどこで宣言されたか。スコープの規則に従って結び付ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>型検査</h4><p>演算や代入が型として妥当か。<Link href="/dev/language-basics/types">型システム</Link>の仕事。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>到達可能性</h4><p>return後のコード、初期化前の変数の使用などを検出する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>シンボル表</h4><p>名前・型・格納場所の対応表を作り、以降の工程で使う。</p></Card>
      </CardGrid>
      <p>ここまでが「<strong>コンパイルエラー</strong>」の出る範囲です。原因は必ず自分のソースコードの中にあります。</p>

      <Heading num="04">最適化 ― 意味を変えずに速くする</Heading>
      <p>中間表現に変換したうえで、意味を保ったまま効率の良い形に書き換えます。</p>
      <table>
        <tbody>
          <tr><th>最適化</th><th>内容</th></tr>
          <tr><td className="hl">定数畳み込み</td><td><code>60 * 60</code> をコンパイル時に <code>3600</code> にする</td></tr>
          <tr><td className="hl">デッドコード除去</td><td>到達しないコードや、結果が使われない計算を削除する</td></tr>
          <tr><td className="hl">インライン展開</td><td>小さな関数の呼び出しを本体で置き換え、呼び出しコストを消す</td></tr>
          <tr><td className="hl">ループ最適化</td><td>ループ内の不変な計算を外に出す、展開する</td></tr>
          <tr><td className="hl">レジスタ割り当て</td><td>よく使う値をメモリではなく<Link href="/computer/cpu">CPUのレジスタ</Link>に置く</td></tr>
        </tbody>
      </table>
      <Aside label="最適化で「消える」コード">
        「意味を変えない」の前提は言語仕様に基づきます。C/C++では未定義動作を含むコードが最適化で丸ごと消えることがあり、デバッグを難しくします。逆にJavaScriptのJITは、実行時の型の傾向を見て投機的に最適化し、前提が崩れたら<strong>元に戻す(脱最適化)</strong>という動的な仕組みを持ちます(「<Link href="/dev/language/engine">第6章 実行の仕組み</Link>」)。
      </Aside>

      <Heading num="05">リンク ― 部品を1つに繋ぐ</Heading>
      <p>コンパイルはファイル単位で行われ、結果は<Term>オブジェクトファイル</Term>になります。この時点では、他のファイルにある関数の呼び出しは「<strong>宛先未定の呼び出し</strong>」として穴が空いたままです。この穴を埋めるのが<Term>リンカ</Term>です。</p>
      <Steps>
        <li>各オブジェクトファイルが「提供する名前」と「必要とする名前」を集める</li>
        <li>名前を突き合わせ、参照を実際のアドレスへ解決する(シンボル解決)</li>
        <li>コード・データの配置を決めて1つにまとめる(再配置)</li>
        <li>足りない名前があれば<strong>未定義参照エラー</strong>、同じ名前が2つあれば<strong>重複定義エラー</strong></li>
      </Steps>
      <Analogy label="💡 たとえるなら">
        コンパイルは各章を個別に執筆する作業、リンクは<strong>製本して相互参照のページ番号を埋める</strong>作業です。「第3章参照」と書いてあるのに第3章が存在しなければ、製本の段階で初めて発覚します。
      </Analogy>
      <p>「コンパイルは通るのにビルドが失敗する」という状況の多くはこれです。宣言(ヘッダ)はあるが実装が無い、ライブラリを指定し忘れている、といった<strong>ファイルをまたぐ問題</strong>はリンク時にしか分かりません。</p>

      <Heading num="06">静的リンクと動的リンク</Heading>
      <table>
        <tbody>
          <tr><th></th><th>静的リンク</th><th>動的リンク</th></tr>
          <tr><td className="hl">タイミング</td><td>ビルド時にライブラリを実行ファイルへ埋め込む</td><td>実行時にライブラリを読み込む</td></tr>
          <tr><td className="hl">ファイルサイズ</td><td>大きい</td><td>小さい</td></tr>
          <tr><td className="hl">配布</td><td><strong>1ファイルで動く</strong></td><td>依存ライブラリも必要</td></tr>
          <tr><td className="hl">更新</td><td>再ビルドが必要</td><td><strong>ライブラリだけ差し替えられる</strong>(脆弱性修正に強い)</td></tr>
          <tr><td className="hl">代表</td><td>Goの既定、Rustの一部</td><td>C/C++の一般的な構成(.so / .dll)</td></tr>
        </tbody>
      </table>
      <p>「実行しようとしたら <code>.so</code> が見つからない」という実行時エラーは動的リンク特有のものです。Goがコンテナで扱いやすいと言われるのは、静的リンクで<strong>依存のない1バイナリ</strong>になり、最小のイメージにそのまま置けるからです(「<Link href="/infra/container/docker">Docker</Link>」)。</p>

      <Heading num="07">ローダとプロセスの起動</Heading>
      <p>実行ファイルを起動すると、OSの<Term>ローダ</Term>がメモリへ配置します。</p>
      <Steps>
        <li>実行ファイルを読み、コード領域・データ領域を<Link href="/os/process">プロセスのメモリ空間</Link>に配置する</li>
        <li>必要な共有ライブラリを探して読み込み、アドレスを解決する(動的リンク)</li>
        <li>スタックを用意し、引数と環境変数を積む</li>
        <li>エントリポイント(<code>main</code>)へ制御を移す</li>
      </Steps>
      <p>セキュリティ機構の<Term>ASLR</Term>(アドレス空間配置のランダム化)はこの段階で働き、毎回配置を変えることで攻撃を難しくしています。</p>

      <Heading num="08">JavaScript/TypeScriptではどう対応するか</Heading>
      <p>この一連の工程は、Webの世界にも形を変えて存在します。</p>
      <table>
        <tbody>
          <tr><th>古典的な工程</th><th>Web/Node.jsでの対応物</th></tr>
          <tr><td className="hl">構文解析</td><td>JSエンジンのパーサ、Babel/SWCのAST生成</td></tr>
          <tr><td className="hl">型検査</td><td><code>tsc</code>(実行時には型は消える)</td></tr>
          <tr><td className="hl">最適化・コード生成</td><td>V8のJITコンパイル(実行時に機械語を生成)</td></tr>
          <tr><td className="hl">リンク</td><td><strong>バンドラ</strong>によるモジュールの解決と結合</td></tr>
          <tr><td className="hl">動的リンク</td><td>動的 <code>import()</code>、<code>node_modules</code> の実行時解決</td></tr>
        </tbody>
      </table>
      <p>「未定義参照エラー」に相当するのが、実行時に出る <code>Cannot find module</code> です。<strong>静的に解決するか、実行時に解決するか</strong>という選択が、そのままエラーの現れる時点を決めています ― この対応関係が見えると、ビルド周りのエラーの読み方が変わります。</p>

      <Heading num="まとめ">どの工程で落ちたかを読む</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>解析エラー</h4><p>文法・型の問題。原因は自分のファイルの中にある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リンクエラー</h4><p>実装が無い・ライブラリの指定漏れ。ファイルをまたぐ問題。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>実行時エラー</h4><p>共有ライブラリやモジュールが見つからない。環境と配布の問題。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/language-basics/types" tag="実装">型システム</RelatedLink>
            <RelatedLink href="/dev/language-basics/memory" tag="実装">メモリ管理とGC</RelatedLink>
            <RelatedLink href="/theory/formal" tag="情報科学">形式言語</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
