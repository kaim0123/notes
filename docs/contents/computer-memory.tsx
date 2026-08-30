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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "メモリの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>メモリの仕組み ― データはどこに、どう置かれているのか</h1>
        <Lead>
          「メモリが足りない」「メモリリーク」「スタックオーバーフロー」―
          プログラミングをしていると必ず出会う言葉です。これらはすべて、コンピュータの中にある何段階もの「置き場所」の性質を知ると、驚くほどすっと理解できます。
        </Lead>
      </Hero>

      <p>前のページ「OSの仕組み」では、OSがプロセスごとにメモリ空間を割り当てて管理していることを見ました。ここでは、そのメモリ自体がどのような階層・構造になっているのかを詳しく見ていきます。</p>

      <Heading num="01">記憶階層 ― 速さと広さはトレードオフ</Heading>
      <p>コンピュータの「記憶」は1種類ではありません。CPUに近いほど<strong>速いが容量が小さく高価</strong>、遠いほど<strong>遅いが容量が大きく安価</strong>という階層構造になっています。これを<Term>記憶階層(メモリヒエラルキー)</Term>と呼びます。</p>

      <Diagram caption="上に行くほど「速いが小さい」、下に行くほど「遅いが大きい」">
        <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
          <polygon points="270,10 370,10 420,80 220,80" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={50} fill="#f2f2f2" fontSize="14" textAnchor="middle">レジスタ</text>

          <polygon points="220,90 420,90 460,160 180,160" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={130} fill="#f2f2f2" fontSize="14" textAnchor="middle">キャッシュメモリ(L1/L2/L3)</text>

          <polygon points="180,170 460,170 500,240 140,240" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={210} fill="#f2f2f2" fontSize="14" textAnchor="middle">メモリ(RAM)</text>

          <polygon points="140,250 500,250 540,310 100,310" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={285} fill="#f2f2f2" fontSize="14" textAnchor="middle">ストレージ(SSD / HDD)</text>

          <text x={560} y={45} fill="#9a9a9a" fontSize="12">速い</text>
          <text x={560} y={60} fill="#9a9a9a" fontSize="12">高価</text>
          <text x={560} y={75} fill="#9a9a9a" fontSize="12">小容量</text>
          <line x1={545} y1={20} x2={545} y2={300} stroke="#5f5f5f" strokeWidth="1" />
          <polygon points="545,15 540,25 550,25" fill="#5f5f5f" />
          <text x={560} y={270} fill="#9a9a9a" fontSize="12">遅い</text>
          <text x={560} y={285} fill="#9a9a9a" fontSize="12">安価</text>
          <text x={560} y={300} fill="#9a9a9a" fontSize="12">大容量</text>
          <polygon points="545,305 540,295 550,295" fill="#5f5f5f" />
        </svg>
      </Diagram>

      <h3>レジスタ ― 今まさに手に持っている道具</h3>
      <p>CPUの内部に直接あり、あらゆる記憶装置の中で最速です。ただし数はごくわずか(数十個程度)で、CPUが今この瞬間に計算している値だけを置いておく場所です。</p>

      <h3>キャッシュメモリ ― よく使うものを手元の作業机に</h3>
      <p>CPUとメモリ(RAM)の速度差は非常に大きく、CPUがメモリに毎回アクセスしていると待ち時間ばかりになってしまいます。そこで「最近使ったデータ」「これから使いそうなデータ」をCPUのすぐ近くに一時保存しておくのが<strong>キャッシュメモリ</strong>です。CPUに近い順にL1・L2・L3と段階があり、L1が最も速く最も小さい容量になっています。</p>

      <h3>メモリ(RAM) ― 今使っている作業スペース</h3>
      <p>いわゆる「メモリ」です。実行中のプログラムとそのデータを一時的に置いておく場所で、キャッシュより容量は大きいですが速度は劣ります。電源を切るとデータは消えてしまう<Term>揮発性</Term>のメモリです。</p>

      <h3>ストレージ(SSD / HDD) ― 電源を切っても消えない倉庫</h3>
      <p>ファイルやアプリを長期間保存しておく場所です。記憶階層の中では最も速度が遅く容量が大きい代わりに、電源を切ってもデータが消えない<Term>不揮発性</Term>という特徴があります。</p>

      <Analogy label="💡 たとえるなら">
        料理をしているところを想像してください。<strong>レジスタ</strong>は今まさに手に持っている包丁やフライパン。<strong>キャッシュ</strong>はすぐ手が届く作業台の上の食材。<strong>メモリ</strong>は台所の冷蔵庫。<strong>ストレージ</strong>は少し離れた倉庫や物置です。手に近いほど取り出しは速いけれど置ける量は少なく、倉庫は取りに行くのに時間がかかるけれど大量にしまっておけますよね。
      </Analogy>

      <Aside label="試験メモ ― DRAMとSRAM、実効アクセス時間">
        主記憶に使う<Term>DRAM</Term>は集積度が高く大容量化しやすい反面、記憶を保つために定期的な<strong>リフレッシュ</strong>が必要です。キャッシュに使う<Term>SRAM</Term>はDRAMより高速ですが、容量あたりのコストが高く小容量にとどまります。<br />
        キャッシュの効果は<Term>ヒット率</Term>で測り、平均的なアクセス時間＝<strong>実効アクセス時間</strong>は次式で求めます。<br />
        <strong>実効アクセス時間 ＝ ヒット率 × キャッシュのアクセス時間 ＋ (1 − ヒット率) × 主記憶のアクセス時間</strong><br />
        例: ヒット率0.9、キャッシュ10ns、主記憶100nsなら 0.9×10 ＋ 0.1×100 ＝ <strong>19ns</strong>。
      </Aside>

      <Heading num="02">プログラムのメモリ4領域</Heading>
      <p>アプリを1つ起動すると、OSはそのプログラム専用のメモリ空間を用意します。この空間は用途ごとに大きく4つの領域に分かれています。</p>

      <Diagram caption="プログラムのメモリ空間(模式図):コード領域・データ領域・ヒープ領域・スタック領域">
        <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg">
          <text x={280} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">高いアドレス</text>

          <rect x={140} y={30} width={280} height={70} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={60} fill="#f2f2f2" fontSize="14" textAnchor="middle">スタック領域</text>
          <text x={280} y={80} fill="#9a9a9a" fontSize="12" textAnchor="middle">関数呼び出し情報・ローカル変数</text>
          <polygon points="280,100 272,115 288,115" fill="#39ff6a" />
          <text x={330} y={112} fill="#39ff6a" fontSize="12">↓ 下に伸びる</text>

          <rect x={140} y={125} width={280} height={90} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={280} y={170} fill="#9a9a9a" fontSize="13" textAnchor="middle">(空き領域)</text>

          <polygon points="280,205 272,190 288,190" fill="#39ff6a" />
          <text x={330} y={200} fill="#39ff6a" fontSize="12">↑ 上に伸びる</text>
          <rect x={140} y={215} width={280} height={70} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={245} fill="#f2f2f2" fontSize="14" textAnchor="middle">ヒープ領域</text>
          <text x={280} y={265} fill="#9a9a9a" fontSize="12" textAnchor="middle">自分で確保・解放するデータ</text>

          <rect x={140} y={290} width={280} height={20} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={305} fill="#f2f2f2" fontSize="12" textAnchor="middle">データ領域(グローバル変数など)</text>

          <rect x={140} y={315} width={280} height={20} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={330} fill="#f2f2f2" fontSize="12" textAnchor="middle">コード領域(プログラム本体の命令)</text>
        </svg>
      </Diagram>

      <h3>コード領域(テキストセグメント)</h3>
      <p>プログラムそのもの、つまりCPUが実行する命令が置かれる領域です。実行中に書き換わることはなく、読み取り専用として扱われます。</p>

      <h3>データ領域</h3>
      <p>プログラム全体で共有される<Term>グローバル変数</Term>や<Term>static変数</Term>が置かれます。プログラムが起動した時点で確保され、終了するまで存在し続けます。</p>

      <h3>ヒープ領域 ― 自由だが、後片付けは自分の責任</h3>
      <p>実行中に「必要な分だけ」自分で確保する領域です。あらかじめ大きさが決まっていない・関数を抜けても残しておきたいデータ(例: 大きな配列、あとで参照するオブジェクト)はここに置きます。自由度が高い分、確保したら不要になったタイミングで解放しないと、使われないメモリがずっと残り続ける<Term>メモリリーク</Term>という問題が起きます。JavaScriptなどの言語では、この解放作業を<Term>ガベージコレクション(GC)</Term>が自動で行ってくれます。</p>

      <h3>スタック領域 ― 積み重ねて、自動で片付く</h3>
      <p>関数を呼び出すたびに、その関数のローカル変数や「呼び出し元にどう戻るか」の情報が、お盆を積み重ねるように<Term>積み上げ</Term>られます。関数の処理が終わると、そのお盆を上から順に取り除くように自動的に片付けられます(後片付け不要)。ただし、関数呼び出しを深くしすぎる(典型的には無限に自分自身を呼び出す再帰など)と積み重ねの上限を超えてしまい、<Term>スタックオーバーフロー</Term>というエラーになります。</p>

      <Analogy label="💡 たとえるなら">
        <strong>スタック</strong>はカフェの「お盆置き場」です。お盆(関数の作業スペース)を積み重ね、使い終わったら上から順に片付けます。手順が決まっているので勝手に散らかりません。一方<strong>ヒープ</strong>は「自由に物を置ける倉庫の共用スペース」。好きな場所に好きなだけ物を置けますが、使い終わった物を誰かが片付けないと、倉庫はどんどん物で埋まっていってしまいます。
      </Analogy>

      <table>
        <tbody>
          <tr><th></th><th>スタック</th><th>ヒープ</th></tr>
          <tr><td className="hl">確保・解放</td><td>自動(関数の開始・終了に連動)</td><td>手動、または言語のGCによる自動管理</td></tr>
          <tr><td className="hl">速度</td><td>非常に高速</td><td>スタックより低速</td></tr>
          <tr><td className="hl">サイズ</td><td>小さく上限がある</td><td>比較的大きく確保できる</td></tr>
          <tr><td className="hl">主な失敗例</td><td>スタックオーバーフロー(積みすぎ)</td><td>メモリリーク(片付け忘れ)</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        「関数の中で作った変数が、関数を抜けたら消えてなくなる」のはスタックの仕組みそのものです。逆に「関数を抜けても値を保持し続けたいオブジェクト」は、多くの言語処理系の内部でヒープに置かれます。
      </Aside>

      <Heading num="まとめ">覚えておきたい2つの軸</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>記憶階層は「速さ」と「広さ」のトレードオフ</h4>
          <p>レジスタ→キャッシュ→メモリ→ストレージの順に、速いが小さい記憶から、遅いが大きい記憶へと変わっていきます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プログラム内部も役割ごとに区画がある</h4>
          <p>命令(コード)、共有データ(データ領域)、自由に確保するデータ(ヒープ)、一時的な作業(スタック)は、それぞれ性質もライフサイクルも異なります。</p>
        </Card>
      </CardGrid>
      <Heading num="次へ">メモリをもっと深く知る4つの寄り道</Heading>
      <p>ここまでは「メモリとは何か」の全体像でした。ここから先は、同じメモリを別々の角度から掘り下げる4つのページに分かれています。歴史から入っても、スタックの深掘りから入っても構いません。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>記憶装置の歴史</h4>
          <p>紙に穴を開けた時代からDRAM・640KBの壁まで。「足りない」という感覚が技術を進めてきた60年の物語。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>仮想メモリとソフトウェアの肥大化</h4>
          <p>OSがつく「やさしい嘘」と、その副作用としてソフトが際限なく太っていくヴィルトの法則。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>速さの壁</h4>
          <p>主役が量から速度へ。キャッシュ階層・HBM、そしてAI推論の帯域ボトルネックまで。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>スタックと関数呼び出しの舞台裏</h4>
          <p>関数を呼ぶたびメモリで何が起きるか。フレーム・呼び出し規約・スタックオーバーフローを覗く。</p>
        </Card>
      </CardGrid>
      <p>一周した後は、そのメモリの上でプログラムがどんな考え方で書かれ、どうやって実際に動く命令になるのか ―「プログラミング言語の仕組み」へ進むのがおすすめです。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory/history" tag="コンピュータ">記憶装置の歴史 ― 「足りない」の系譜</RelatedLink>
                    <RelatedLink href="/computer/memory/virtual" tag="コンピュータ">仮想メモリとソフトウェアの肥大化</RelatedLink>
                    <RelatedLink href="/computer/memory/speed" tag="コンピュータ">速さの壁 ― キャッシュ・帯域・HBM</RelatedLink>
                    <RelatedLink href="/computer/memory/stack" tag="コンピュータ">スタックと関数呼び出しの舞台裏</RelatedLink>
                    <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み ― プロセス・スレッド・カーネル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
