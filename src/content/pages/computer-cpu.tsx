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
  title: "CPU",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>CPU ― 命令を1つずつ、ひたすら繰り返す装置</h1>
        <Lead>
          「<Link href="/computer/hardware">ハードウェアの基礎</Link>」では、演算装置と制御装置を合わせたものがCPUだと見ました。ではその中で何が起きているのか。答えは意外なほど単調で、<strong>命令を取り出し、解読し、実行し、書き戻す</strong>の繰り返しに尽きます。この繰り返しの中身と、それを支えるレジスタ・割込み、そして「どれだけ速いか」を測る指標までを一続きで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">命令サイクル ― CPUがやっている唯一のこと</Heading>
      <p>
        CPUは、主記憶に置かれたプログラムの命令を先頭から順に取り出して処理します。この1命令ぶんの流れを<Term>命令サイクル</Term>と呼び、<Term>クロック</Term>という一定間隔の拍に合わせて進みます。
      </p>

      <DiagramFrame
        slug="computer-cpu-instruction-cycle"
        aspect="760 / 340"
        caption="命令サイクルの流れ。主記憶から命令を取り出す「フェッチ」、命令の意味を解読する「デコード」、演算装置で処理する「実行」、結果を格納する「書き戻し」の4段階が順に進み、終わるとプログラムカウンタを次の命令へ進めて再びフェッチに戻る。フェッチは主記憶から命令を受け取り、書き戻しは結果を主記憶へ返す。"
      />

      <table>
        <tbody>
          <tr>
            <th>段階</th>
            <th>やること</th>
          </tr>
          <tr>
            <td className="hl">フェッチ(取り出し)</td>
            <td>プログラムカウンタが指すアドレスから、次の命令を主記憶に取りに行く</td>
          </tr>
          <tr>
            <td className="hl">デコード(解読)</td>
            <td>取り出した命令が何をするものかを制御装置が解読する</td>
          </tr>
          <tr>
            <td className="hl">実行</td>
            <td>演算装置(ALU)で計算する、あるいはメモリを読み書きする</td>
          </tr>
          <tr>
            <td className="hl">書き戻し</td>
            <td>結果をレジスタや主記憶に格納し、次の命令へ進む</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        レシピ本を見ながら料理する人に似ています。<strong>フェッチ</strong>は次の手順を目で追うこと、<strong>デコード</strong>はその手順の意味を理解すること、<strong>実行</strong>は実際に手を動かすこと、<strong>書き戻し</strong>は出来上がりを皿に置くこと。これを1行ずつ、最後まで淡々と繰り返します。
      </Analogy>

      <Heading num="02">レジスタ ― CPUの手元にある最速の置き場</Heading>
      <p>
        命令サイクルの各段階では、CPU内部にある<Term>レジスタ</Term>という記憶が使われます。数は数十個程度とごくわずかですが、あらゆる記憶装置の中で最速で、いま処理中の値や次の命令の位置を保持します。
      </p>

      <table>
        <tbody>
          <tr>
            <th>レジスタ</th>
            <th>役割</th>
          </tr>
          <tr>
            <td className="hl">
              プログラムカウンタ
              <br />
              (命令アドレスレジスタ)
            </td>
            <td>次に実行する命令のアドレスを保持する。1命令終わるごとに進む</td>
          </tr>
          <tr>
            <td className="hl">命令レジスタ</td>
            <td>いま取り出した命令そのものを保持する。デコードの対象になる</td>
          </tr>
          <tr>
            <td className="hl">汎用レジスタ</td>
            <td>演算の対象や結果を一時的に保持する</td>
          </tr>
          <tr>
            <td className="hl">フラグレジスタ</td>
            <td>演算の結果が0だった・桁あふれしたといった状態を保持し、条件分岐の判断に使う</td>
          </tr>
        </tbody>
      </table>

      <Aside label="つながり">
        レジスタは、このあと「<Link href="/computer/memory">メモリ</Link>」で扱う記憶階層のいちばん上にあたります。レジスタ→キャッシュ→主記憶→補助記憶と下るにつれて、遅くなる代わりに広くなっていきます。
      </Aside>

      <Heading num="03">割込み ― 進行中の処理に割って入る</Heading>
      <p>
        命令サイクルをただ繰り返すだけでは、「キーが押された」「ディスクの読み込みが終わった」といった突発的な出来事に対応できません。そこでCPUは、実行中の処理を一時中断して別の処理に切り替える<Term>割込み</Term>という仕組みを持っています。割込みが入ると、CPUはレジスタの内容を退避してから割込み処理へ移り、終わると退避した内容を戻して元の続きを再開します。
      </p>
      <ul>
        <li>
          <Term>内部割込み</Term> ― 命令の実行そのものが原因。0除算、あってはならないメモリアクセス(ページフォールト)など。
        </li>
        <li>
          <Term>外部割込み</Term> ― CPUの外が原因。入出力の完了、タイマー、電源異常など。
        </li>
      </ul>
      <Aside label="OSへの入口">
        割込みは、OSがハードウェアの出来事を受け取る主要な窓口です。どの割込みにどう応じるかを決めているのがOSであり、タイマー割込みはそのままプロセスの切り替え(スケジューリング)につながります。詳しくは「<Link href="/computer/os">OSの仕組み</Link>」で扱います。
      </Aside>

      <Heading num="04">速さを測る3つの指標</Heading>
      <p>
        CPUの速さは1つの数字では決まりません。「1拍がどれだけ速いか」「1命令に何拍かかるか」「結局1秒に何命令こなせるか」という、角度の違う指標を組み合わせて捉えます。
      </p>

      <table>
        <tbody>
          <tr>
            <th>指標</th>
            <th>意味</th>
          </tr>
          <tr>
            <td className="hl">クロック周波数</td>
            <td>1秒あたりのクロック(拍)の数。単位はHz。大きいほど1拍が速い</td>
          </tr>
          <tr>
            <td className="hl">CPI</td>
            <td>1命令の実行に平均何クロックかかるか(Clocks Per Instruction)。小さいほど効率的</td>
          </tr>
          <tr>
            <td className="hl">MIPS</td>
            <td>1秒あたり何百万命令を実行できるか。大きいほど速い</td>
          </tr>
        </tbody>
      </table>

      <Aside label="計算式">
        <strong>1命令あたりの時間 ＝ CPI ÷ クロック周波数</strong>
        <br />
        <strong>MIPS ＝ クロック周波数(MHz) ÷ CPI</strong>
        <br />
        例: クロック2GHz(＝2000MHz)、CPIが2のCPUなら ― 1命令あたりの時間は 2 ÷ (2×10⁹) ＝ 1ナノ秒、MIPSは 2000 ÷ 2 ＝ <strong>1000 MIPS</strong>。
      </Aside>

      <Analogy label="💡 たとえるなら">
        工場のベルトコンベアを思い浮かべてください。<strong>クロック周波数</strong>はベルトが動く速さ、<strong>CPI</strong>は製品1個を仕上げるのに必要なベルトの拍数、<strong>MIPS</strong>は結局1秒で何個出荷できたかです。ベルトを速くしても(高クロック)、1個に手間がかかれば(高CPI)出荷数は伸びません。
      </Analogy>

      <Heading num="05">高速化のしくみ ― パイプラインとマルチコア</Heading>
      <p>
        クロックを上げ続けるのには発熱という物理的な限界があります。そこで、同じクロックのままより多くの命令をこなす工夫が使われます。
      </p>

      <h3>パイプライン ― 段階をずらして重ねる</h3>
      <p>
        <Term>パイプライン</Term>は、命令サイクルのフェッチ・デコード・実行・書き戻しを少しずつずらして<strong>複数の命令を重ねて処理</strong>する方式です。1命令の所要時間そのものは縮まりませんが、単位時間に流れる命令数(<Term>スループット</Term>)が上がります。
      </p>

      <DiagramFrame
        slug="computer-cpu-pipeline"
        aspect="760 / 320"
        caption="パイプライン処理のタイムチャート。命令1がフェッチを終えてデコードへ進むと、空いたフェッチ段には命令2が入る。以降1クロックずつずらして4命令を重ねると、1命令ずつ順に流せば16クロックかかるところが7クロックで完了する。1命令あたりの所要時間は変わらず、単位時間に流れる命令数が増える。"
      />

      <p>
        ただし条件分岐があると、次にどの命令が来るか確定するまで流れが乱れます(<Term>分岐ハザード</Term>)。分岐先を予測して先に流し込んでおく<Term>分岐予測</Term>は、この乱れを減らすための工夫です。
      </p>

      <h3>マルチコア ― 処理する頭そのものを増やす</h3>
      <p>
        <Term>マルチコア</Term>は、1つのチップに複数のコア(CPUの中核)を載せ、<strong>複数の処理を同時に走らせる</strong>方式です。並列化しやすい処理ほど効果が大きく、逆に処理の中に順番を守らなければならない部分が残るほど、コアを増やしても速度向上は頭打ちになります。
      </p>

      <Heading num="06">命令セットの設計 ― RISCとCISC</Heading>
      <p>
        同じ命令サイクルを回すCPUでも、「どんな命令を用意するか」という設計思想には大きな分岐があります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>考え方</th>
            <th>相性</th>
          </tr>
          <tr>
            <td className="hl">RISC</td>
            <td>命令を単純・少数に絞り、1命令を短く均質にする</td>
            <td>パイプラインが乱れにくく、省電力にしやすい。ARM系が代表</td>
          </tr>
          <tr>
            <td className="hl">CISC</td>
            <td>複雑で多機能な命令を持ち、1命令で多くの仕事をさせる</td>
            <td>プログラムは短くなるが命令ごとの所要クロックがばらつく。x86系が代表</td>
          </tr>
        </tbody>
      </table>
      <p>
        なお<Term>GPU</Term>は、単純な計算を大量に同時実行することに特化した別種のプロセッサです。複雑な処理を順にこなすCPUとは得意分野が異なり、画像処理や機械学習の計算で使い分けられます。
      </p>

      <Heading num="まとめ">覚えておきたい3つの視点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>CPUは同じ4段階の繰り返し</h4>
          <p>フェッチ→デコード→実行→書き戻し。この命令サイクルをクロックに合わせてひたすら回しています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>速さは3つの指標で捉える</h4>
          <p>クロック周波数・CPI・MIPSは MIPS ＝ クロック(MHz) ÷ CPI で結びつきます。高クロックでも高CPIなら伸びません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>クロック以外で速度を稼ぐ</h4>
          <p>命令を重ねて流すパイプラインと、頭を増やすマルチコア。発熱の限界を迂回する2つの定石です。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/computer/cpu" />
    </DocsPage>
  );
}
