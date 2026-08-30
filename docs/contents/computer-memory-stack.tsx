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
  title: "スタックと関数呼び出しの舞台裏",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>スタックと関数呼び出しの舞台裏</h1>
        <Lead>
          プログラムは上から順に実行されるだけ ― と思いがちですが、関数を呼び出した瞬間、実行は<strong>まったく別のアドレスへジャンプ</strong>します。それでも処理が終わればちゃんと呼び出し元の続きに戻ってこられる。この「戻ってこられる」を陰で支えているのが<Term>スタック</Term>です。ここでは関数呼び出しの舞台裏を、レジスタやCPU命令のレベルまで覗いてみます。
        </Lead>
      </Hero>

      <p>「メモリの仕組み」で見たとおり、プログラムのメモリはコード・データ・ヒープ・スタックの4領域に分かれます。このページはそのうち<strong>スタック</strong>を深掘りする回です。スタックオーバーフローや再帰の落とし穴、末尾再帰、インライン展開といった話も、仕組みが分かれば一本の線でつながります。</p>

      <Heading num="01">CPUは戻り先を「覚えていない」</Heading>
      <p>意外に思えますが、CPU自身は「関数が終わったらどこに戻るか」を記憶していません。関数呼び出しのたびに別のアドレスへ飛ぶのに、なぜ元の場所に戻れるのか。その答えが<strong>スタックに戻り先を積んでおく</strong>という仕組みです。</p>
      <p>スタックはパンケーキを積み上げるイメージ、いわゆる<Term>LIFO(Last In, First Out)</Term> ― 最後に積んだものを最初に取り出す構造です。そしてこれは、あらゆるプログラマが一度は見る<strong>スタックオーバーフロー</strong>の舞台でもあります。</p>

      <Aside label="ヒープとの役割分担">
        同じ「自由に使えるメモリ」でも、ヒープは倉庫のように好きなタイミングで確保・解放できる代わりに管理が面倒で、ガベージコレクションが必要になるのもここです。一方スタックは、決まった順序で積んで<strong>逆順で取り出す</strong>専用メモリ。関数の入れ子(A→B→C なら戻りは C→B→A)にぴったりはまります。
      </Aside>

      <table>
        <tbody>
          <tr><th></th><th>スタック</th><th>ヒープ</th></tr>
          <tr><td className="hl">確保・解放</td><td>自動(関数の出入りに連動)。ポインタをずらすだけ</td><td>手動またはGC。空き領域を探す必要がある</td></tr>
          <tr><td className="hl">速度</td><td>非常に高速</td><td>スタックより低速</td></tr>
          <tr><td className="hl">サイズ</td><td>固定で小さい(Linuxで概ね8MB)</td><td>比較的大きく確保できる</td></tr>
          <tr><td className="hl">向いているもの</td><td>関数内だけの小さく一時的なデータ</td><td>大きなデータ・関数を抜けても残したいデータ</td></tr>
        </tbody>
      </table>
      <p>スタックが速いのは、確保も解放も<strong>ポインタを少しずらすだけ</strong>だからです。ただしサイズが固定で小さいのが致命的な弱点。大きな配列や、関数を抜けた後も残したいデータは、ヒープに置くしかありません。</p>

      <Heading num="02">スタックフレーム ― 戻り先を入れた弁当箱</Heading>
      <p>関数が呼ばれるたびに、スタックには<Term>スタックフレーム</Term>と呼ばれる「お弁当箱」のようなセットが積まれます。主な中身は次の4つです。</p>

      <Steps>
        <li><strong>リターンアドレス</strong> ― 処理が終わったらどこに戻るかのアドレス。CPUの<strong>プログラムカウンタ(PC)／インストラクションポインタ(IP)</strong>が「今どの命令を実行中か」を指しており、関数を呼ぶ瞬間にその値をスタックへ保存してから新しい場所へジャンプする。終わったら取り出して戻る。</li>
        <li><strong>引数</strong> ― 関数に渡す値。ただし後述のとおり、すべてがスタックに載るわけではない。</li>
        <li><strong>ローカル変数</strong> ― その関数の中だけで使う変数。関数を抜けるとフレームごと消えるので、ローカル変数も自動で消える(わざわざ解放しなくてよい理由)。</li>
        <li><strong>保存されたレジスタ</strong> ― 呼び出し前に使っていたレジスタの値を退避する。特に<strong>RBP(ベースポインタ)</strong>などの callee-saved レジスタは、関数の終了時に復元して呼び出し元の状態に戻す。これがないとレジスタが勝手に書き換わり、呼び出し元でバグになる。</li>
      </Steps>

      <p>x86-64では、この往復がCPU命令レベルで支援されています。<code>CALL</code>命令が自動でリターンアドレスをプッシュし、<code>RET</code>命令がそれをポップしてジャンプする ― この2命令で行きと帰りが完結します。スタックは関数の出入りに合わせて自動管理されるため、<strong>メモリリークの心配がない</strong>のが最大の利点です。</p>

      <Heading num="03">呼び出し規約 ― 引数はまずレジスタで渡す</Heading>
      <p>引数の渡し方には<Term>呼び出し規約(ABI / Calling Convention)</Term>という取り決めがあります。少ない引数は、遅いメモリ(スタック)より速い<strong>レジスタ</strong>経由で渡すのが最適化の基本。ただしこの規約はOSやアーキテクチャによって異なります。</p>

      <table>
        <tbody>
          <tr><th></th><th>Linux等(System V ABI / x86-64)</th><th>Windows x64</th></tr>
          <tr><td className="hl">整数引数(先頭)</td><td>最初の6つ:RDI, RSI, RDX, RCX, R8, R9</td><td>最初の4つ:RCX, RDX, R8, R9(順番も違う)</td></tr>
          <tr><td className="hl">それ以降</td><td>スタックに積む</td><td>スタックに積む</td></tr>
          <tr><td className="hl">浮動小数点</td><td>XMM0〜XMM7(別のレジスタ群)</td><td>同様にXMM系</td></tr>
        </tbody>
      </table>
      <p>整数と浮動小数点で使うレジスタが違うのもポイントです。同じOSでも規約を間違えると、引数がぐちゃぐちゃになって正しく動きません。</p>

      <Heading num="04">入れ子の呼び出しを追う(main → funcA → funcB)</Heading>
      <p>実際にスタックがどう伸び縮みするか、3段の呼び出しで追ってみましょう。スタックポインタ(<strong>RSP</strong>)が「今スタックのどこまで積んだか」を指しています。</p>

      <Diagram caption="呼び出しでフレームが積まれ、終了で逆順に片付く">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <text x={90} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">① mainだけ</text>
          <rect x={30} y={150} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={175} fill="#f2f2f2" fontSize="12" textAnchor="middle">main</text>

          <text x={250} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">② funcA呼び出し</text>
          <rect x={190} y={150} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={250} y={175} fill="#f2f2f2" fontSize="12" textAnchor="middle">main</text>
          <rect x={190} y={106} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={250} y={131} fill="#f2f2f2" fontSize="12" textAnchor="middle">funcA</text>

          <text x={410} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">③ funcB呼び出し</text>
          <rect x={350} y={150} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={410} y={175} fill="#f2f2f2" fontSize="12" textAnchor="middle">main</text>
          <rect x={350} y={106} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={410} y={131} fill="#f2f2f2" fontSize="12" textAnchor="middle">funcA</text>
          <rect x={350} y={62} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={410} y={87} fill="#f2f2f2" fontSize="12" textAnchor="middle">funcB</text>

          <text x={570} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">④ 逆順に片付く</text>
          <rect x={510} y={150} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={570} y={175} fill="#f2f2f2" fontSize="12" textAnchor="middle">main</text>
          <rect x={510} y={106} width={120} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={570} y={131} fill="#9a9a9a" fontSize="11" textAnchor="middle">(解放)</text>

          <text x={20} y={210} fill="#9a9a9a" fontSize="11">RSPは上へ(高い方へ)伸び、フレーム先頭を指す</text>
        </svg>
      </Diagram>

      <Steps>
        <li>最初は<strong>main</strong>のフレームだけ。mainのローカル変数がそこにある。</li>
        <li><strong>funcA</strong>を呼ぶと、mainの次命令アドレスがプッシュされ、引数とローカル変数用の空間が確保される。RSPは新フレームの先頭へ。</li>
        <li><strong>funcB</strong>を呼ぶと、同様にfuncAの戻り先がプッシュされ、funcBのフレームが積まれる。スタックはどんどん上へ。</li>
        <li><strong>funcBが終了</strong>すると、フレームがポップされてRSPが下がり、保存していたリターンアドレスをPCに戻してfuncAへ復帰する。</li>
        <li><strong>funcAも終了</strong>すると同様にmainへ。スタックは元の高さに戻る。</li>
      </Steps>
      <p>パンケーキを上から順に食べていくイメージそのものです。</p>

      <Heading num="05">スタックオーバーフロー ― 積みすぎたとき</Heading>
      <p>スタックには上限があります。典型的な落とし穴が<strong>再帰関数</strong>(自分自身を呼び出す関数。階乗やフィボナッチなど)です。<strong>終了条件を間違える</strong>と永遠に自分を呼び続け、呼ぶたびにフレームが積まれ、ついに上限を超えてしまいます。</p>
      <p>スタック領域の外(別用途のメモリ)に踏み込むと<Term>スタックオーバーフロー</Term>が起き、OSがそれを検知してプログラムを強制終了します(<strong>セグメンテーションフォルト</strong>)。有名なQ&Aサイト「Stack Overflow」の名前も、このエラーに由来しています。</p>
      <Aside label="どれくらいで溢れる?">
        Linuxでスタック8MB、1フレーム100バイトなら、単純計算で約8万回まで呼べます(OSやスレッド設定で変わります)。ただし関数の中で大きな配列(例:<code>char buf[1000000]</code>)を宣言すると、1回の呼び出しで一気に埋まってしまいます。<strong>大きなデータはヒープへ</strong>が鉄則です。再帰でなくても、A→B→C→D…と呼び出しが深すぎれば同じように溢れます。
      </Aside>

      <Heading num="06">末尾再帰最適化 ― フレームを積まない再帰</Heading>
      <p><Term>末尾再帰</Term>とは、関数の最後の処理が「自分自身を呼ぶだけ」になっているパターンです。この形なら、新しいフレームを積まずに<strong>今のフレームを再利用</strong>でき、実質的にループへ変換されます。スタックを消費しないので、深い再帰でも溢れません。これが<Term>末尾再帰最適化(TCO)</Term>です。</p>
      <p>ただし、これは言語とコンパイラに強く依存します。</p>
      <table>
        <tbody>
          <tr><th>言語</th><th>末尾再帰最適化の扱い</th></tr>
          <tr><td className="hl">C / C++</td><td>標準では保証されない。GCC/Clangは最適化レベルを上げれば行うことが多いが、絶対ではない</td></tr>
          <tr><td className="hl">Scheme / Kotlin</td><td>言語仕様として保証される(Kotlinは <code>tailrec</code> 修飾子)</td></tr>
          <tr><td className="hl">Java / Rust</td><td>保証しない</td></tr>
        </tbody>
      </table>
      <p>つまり「末尾再帰だから大丈夫」と安心するのは危険で、使う言語とコンパイラの挙動を確認する必要があります。</p>

      <Heading num="07">呼び出しのオーバーヘッドとインライン展開</Heading>
      <p>ここまで見てきたとおり、関数呼び出しは単なるジャンプではありません。それ自体に<Term>オーバーヘッド</Term>(コスト)があります。</p>
      <Steps>
        <li>リターンアドレスをスタックにプッシュする。</li>
        <li>引数をレジスタやスタックにセットする。</li>
        <li>ベースポインタ(RBP)などを保存し、新しいスタックフレームを作る。</li>
        <li>終了時は逆順に、巻き戻し・レジスタ復元・リターンアドレスへのジャンプを行う。</li>
      </Steps>
      <p>特に<code>a + b</code>を返すだけの小さな関数では、<strong>実処理より呼び出し手続きのほうが重い</strong>ことすらあります。そこで使われるのが<Term>インライン展開</Term>。呼び出し元に関数のコードを直接コピーして、呼び出しそのものを消してしまいます。</p>
      <Analogy label="💡 たとえるなら">
        インライン展開は、<code>result = add(3, 5)</code> を <code>result = 3 + 5</code> に直接書き換えるようなものです。スタック操作もジャンプもなくなり、ループの中で何度も呼ばれる小さな関数では効果が絶大。レシピの中で「別ページのソースの作り方を見よ」と参照させる代わりに、その手順を本文にそのまま書き写しておくイメージです。
      </Analogy>
      <p>ただしデメリットもあります。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コードサイズが増える</h4>
          <p>10箇所で呼んでいれば、10箇所すべてに関数の中身がコピーされます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>命令キャッシュ効率が落ちる</h4>
          <p>コードが大きくなるとキャッシュミスが増え、かえって遅くなることもあります。</p>
        </Card>
      </CardGrid>
      <p>そのためコンパイラは、関数のサイズ・呼び出し回数・ループ内かどうかなどを見て慎重に判断します。C++の<code>inline</code>キーワードは「展開してほしい」という<strong>ヒント</strong>にすぎず、強制ではありません。最近のコンパイラはキーワードがなくても勝手に最適化することが多くなっています。関連する最適化として、よく使うローカル変数をレジスタに載せっぱなしにする<strong>レジスタ割り当て</strong>や、ループのジャンプ回数を減らす<strong>ループアンローリング</strong>もあります。スタックの仕組みを理解していれば、これらの理屈も追いやすくなります。</p>

      <Heading num="まとめ">この章のポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>戻り先はスタックが覚えている</h4>
          <p>CPUは戻り先を記憶しません。<code>CALL</code>/<code>RET</code>がスタックにリターンアドレスを積み下ろしすることで、関数の往復が成立します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>フレームは自動で積んで片付く</h4>
          <p>引数・ローカル変数・退避レジスタが1つの弁当箱に入り、関数を抜けると丸ごと消える。だから後片付けもリークもありません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>有限だからこそ最適化が要る</h4>
          <p>スタックは小さく上限がある。だから深すぎる再帰は溢れ、末尾再帰やインライン展開といった工夫が生まれました。</p>
        </Card>
      </CardGrid>
      <p>これでメモリの物語は「歴史」「量」「速さ」「関数呼び出しの舞台裏」まで一周しました。次はこのメモリの上でプログラムがどんな考え方で書かれ、どうやって実際に動く命令になるのか ―「プログラミング言語の仕組み」へ進んでみてください。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― 記憶階層と4領域</RelatedLink>
                    <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み</RelatedLink>
                    <RelatedLink href="/computer/memory/speed" tag="コンピュータ">速さの壁 ― キャッシュ・帯域・HBM</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
