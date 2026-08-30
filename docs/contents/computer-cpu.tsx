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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CPUと命令実行",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>CPUと命令実行 ― 命令はどう1つずつ処理されるか</h1>
        <Lead>
          CPUは「計算する部品」ですが、実際には<strong>命令を1つずつ取り出して解読し、実行する</strong>という同じ動作をひたすら繰り返しているだけの装置です。ここでは、その繰り返しの正体である<Term>命令サイクル</Term>と、それを支えるレジスタ・割込みの仕組みを見ていきます。性能指標(クロック・CPI・MIPS)は次の「<Link href="/computer/cpu/performance">性能と高速化</Link>」で扱います。
        </Lead>
      </Hero>

      <p>「<Link href="/computer/basics">PCハードウェアの基礎</Link>」で見たとおり、CPUは演算装置と制御装置をまとめた、コンピュータの頭脳です。ではその頭脳は、内部で具体的に何をしているのでしょうか。答えは意外なほど単調で、下の4段階の繰り返しに尽きます。</p>

      <Heading num="01">命令サイクル ― フェッチ・デコード・実行・書き戻し</Heading>
      <p>CPUは主記憶に置かれたプログラムの命令を、先頭から順に取り出して処理します。この1命令ぶんの流れを<Term>命令サイクル</Term>と呼び、クロック(拍)に合わせて進みます。</p>

      <Diagram caption="命令サイクル:1つの命令が処理され、次の命令へ進む">
        <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={40} width={130} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" rx="6" />
          <text x={85} y={70} fill="#f2f2f2" fontSize="13" textAnchor="middle">フェッチ</text>
          <rect x={180} y={40} width={130} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" rx="6" />
          <text x={245} y={70} fill="#f2f2f2" fontSize="13" textAnchor="middle">デコード</text>
          <rect x={340} y={40} width={130} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" rx="6" />
          <text x={405} y={70} fill="#f2f2f2" fontSize="13" textAnchor="middle">実行</text>
          <rect x={500} y={40} width={130} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" rx="6" />
          <text x={565} y={70} fill="#f2f2f2" fontSize="13" textAnchor="middle">書き戻し</text>
          <line x1={150} y1={65} x2={180} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <polygon points="180,65 172,60 172,70" fill="#5f5f5f" />
          <line x1={310} y1={65} x2={340} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <polygon points="340,65 332,60 332,70" fill="#5f5f5f" />
          <line x1={470} y1={65} x2={500} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <polygon points="500,65 492,60 492,70" fill="#5f5f5f" />
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>段階</th><th>やること</th></tr>
          <tr><td className="hl">フェッチ(取り出し)</td><td>主記憶から次の命令を取り出す</td></tr>
          <tr><td className="hl">デコード(解読)</td><td>命令が何をするものかを解読する</td></tr>
          <tr><td className="hl">実行</td><td>演算装置で処理する</td></tr>
          <tr><td className="hl">書き戻し</td><td>結果をレジスタや主記憶に格納する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        レシピ本を見ながら料理する人に似ています。<strong>フェッチ</strong>は次の手順を目で追うこと、<strong>デコード</strong>はその手順の意味を理解すること、<strong>実行</strong>は実際に手を動かすこと、<strong>書き戻し</strong>は出来上がりを皿に置くこと。これを1行ずつ、最後まで淡々と繰り返します。
      </Analogy>

      <Heading num="02">レジスタ ― CPUの手元にある小さな置き場</Heading>
      <p>命令サイクルの各段階では、CPU内部の高速な記憶である<Term>レジスタ</Term>が使われます。数は少ないものの、あらゆる記憶の中で最速で、いま処理中の値や次の命令の位置を保持します。</p>

      <table>
        <tbody>
          <tr><th>レジスタ</th><th>役割</th></tr>
          <tr><td className="hl">命令アドレスレジスタ<br />(プログラムカウンタ)</td><td>次に実行する命令のアドレスを保持する</td></tr>
          <tr><td className="hl">命令レジスタ</td><td>取り出し中の命令そのものを保持する</td></tr>
          <tr><td className="hl">汎用レジスタ</td><td>演算の対象や結果を一時的に保持する</td></tr>
        </tbody>
      </table>

      <Heading num="03">割込み ― 進行中の処理に割って入る</Heading>
      <p>命令サイクルをただ繰り返すだけでは、「入力が来た」「エラーが起きた」といった突発的な出来事に対応できません。そこでCPUは、実行中の処理を一時中断して別の処理に切り替える<Term>割込み</Term>という仕組みを持っています。割込みが入ると、CPUは現在の状態を退避してから割込み処理へ移り、終わると元の続きへ戻ります。</p>
      <ul>
        <li><Term>内部割込み</Term> ― 命令の実行そのものが原因。0除算、あってはならないメモリアクセス(ページフォールト)など。</li>
        <li><Term>外部割込み</Term> ― CPUの外が原因。入出力の完了、タイマー、電源異常など。</li>
      </ul>
      <Aside label="OSへの入口">
        割込みは、OSがハードウェアの出来事を受け取る主要な窓口です。「どの割込みにどう応じるか」を決めているのがOSであり、その先はプロセスの切り替え(スケジューリング)へつながります。ここでは「そういう仕組みがある」ところまでで十分です。
      </Aside>

      <Heading num="04">CPUの設計いろいろ ― RISC・CISC・GPU</Heading>
      <p>同じ命令サイクルでも、命令の作り方や用途によって呼び名が変わります(概要のみ)。</p>
      <table>
        <tbody>
          <tr><th>用語</th><th>位置づけ</th></tr>
          <tr><td className="hl">RISC</td><td>命令を単純・少数に絞り、1つ1つを高速に実行しやすくした設計</td></tr>
          <tr><td className="hl">CISC</td><td>複雑で多機能な命令を持つ設計</td></tr>
          <tr><td className="hl">GPU</td><td>単純な計算を大量に同時実行することに特化したプロセッサ</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>CPUは同じ4段階の繰り返し</h4>
          <p>フェッチ→デコード→実行→書き戻し。この命令サイクルをクロックに合わせてひたすら回しています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>レジスタが手元を支える</h4>
          <p>次の命令の位置(命令アドレスレジスタ)や処理中の値(汎用レジスタ)を、CPU内部の最速の置き場に保持します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>割込みで外の出来事に応じる</h4>
          <p>内部・外部の割込みで進行中の処理に割り込み、OSがハードウェアの出来事を受け取ります。</p>
        </Card>
      </CardGrid>

      <p>命令が「どう処理されるか」がわかったら、次は「どれだけ速く処理できるか」です。クロック周波数・CPI・MIPSといった、試験で計算・比較が問われる性能指標へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/cpu/performance" tag="コンピュータ">CPUの性能と高速化 ― クロック・CPI・MIPS</RelatedLink>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/adder" tag="コンピュータ">足し算をつくる ― 半加算器と全加算器</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
