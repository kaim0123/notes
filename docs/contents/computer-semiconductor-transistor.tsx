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
  title: "トランジスタの正体",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>トランジスタの正体 ― n型・p型と巨大プリン</h1>
        <Lead>
          前のページで、トランジスタは「背中に電気が来ている間だけ通す門番」だと紹介しました。ではその門番は、半導体からどうやって作られるのか。ここでは<Term>n型</Term>と<Term>p型</Term>という2種類の半導体と、「巨大プリン」のたとえで、その中身を一度だけ覗きます。
        </Lead>
      </Hero>

      <p>この回で中身に納得したら、以降は<strong>もう振り返りません</strong>。トランジスタを「条件が整ったときだけ電気を通す部品」というひとまとまりとして扱えるようになれば十分だからです。</p>

      <Heading num="01">半導体には2種類ある ― n型とp型</Heading>
      <p>半導体は「導体と絶縁体の中間」でした。金属には<strong>動ける電子がたくさん</strong>いて電気をよく通し、絶縁体には動ける電子が<strong>ほとんどいない</strong>。半導体はその中間の「量」しか持っていません。そのうえで、半導体には性質の違う2種類があります。</p>

      <table>
        <tbody>
          <tr><th></th><th>n型半導体</th><th>p型半導体</th></tr>
          <tr><td className="hl">帯びている電気</td><td>マイナス(negative)寄り</td><td>プラス(positive)寄り</td></tr>
          <tr><td className="hl">ざっくりした中身</td><td>動けるマイナスの電子が「ちょっといる」</td><td>動けるプラスのものが「ちょっといる」</td></tr>
        </tbody>
      </table>

      <p>金属ほど電子だらけではなく、絶縁体ほど空っぽでもない。<strong>中間の量</strong>で、しかも<strong>n型はマイナス寄り、p型はプラス寄り</strong>に少しだけ偏っている ― そう理解しておきます。そして、この<strong>n型とp型を組み合わせるとトランジスタになります</strong>。</p>

      <Aside label="厳密には少し違うが">
        p型で「プラスが動く」というのは、正確には電子の抜けた穴(正孔)が動く現象です。ただしイメージとしては「プラスが動く」で問題なく先へ進めます。厳密さより、原理の流れを追うことを優先します。
      </Aside>

      <Heading num="02">巨大プリンとカラメルのたとえ</Heading>
      <p>ここで<strong>でっかいプリン</strong>を想像してください(まだカラメルはかかっていません)。そのプリンの上に、<strong>離れた2箇所だけ</strong>ちょっとカラメルをかけます。</p>

      <table>
        <tbody>
          <tr><th>たとえ</th><th>正体</th></tr>
          <tr><td className="hl">プリン本体(黄色い部分)</td><td>p型半導体(プラスがたくさん)</td></tr>
          <tr><td className="hl">2箇所のカラメル</td><td>n型半導体(マイナス＝電子がたくさん)</td></tr>
        </tbody>
      </table>

      <Diagram caption="巨大プリン(p型)の上に、離れた2箇所のカラメル(n型)。てっぺんに + を近づけると、間に電子の「道」ができる">
        <svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
          {/* pudding body (p型) */}
          <path d="M120,120 Q120,90 160,90 L400,90 Q440,90 440,120 L430,210 Q430,225 400,225 L160,225 Q130,225 130,210 Z" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={185} fill="#f2f2f2" fontSize="14" textAnchor="middle">プリン本体 = p型(プラス)</text>

          {/* caramel left (n型) */}
          <rect x={150} y={90} width={70} height={16} fill="#ffb43c" fillOpacity="0.25" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={185} y={80} fill="#ffb43c" fontSize="12" textAnchor="middle">カラメル(n型)</text>
          {/* caramel right (n型) */}
          <rect x={340} y={90} width={70} height={16} fill="#ffb43c" fillOpacity="0.25" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={375} y={80} fill="#ffb43c" fontSize="12" textAnchor="middle">カラメル(n型)</text>

          {/* gate electrode */}
          <rect x={255} y={92} width={50} height={12} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <line x1={280} y1={92} x2={280} y2={55} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={45} fill="#39ff6a" fontSize="13" textAnchor="middle">＋ を近づける(ゲート)</text>

          {/* channel dots */}
          <g fill="#39ff6a">
            <circle cx={228} cy={112} r={2.5} /><circle cx={248} cy={112} r={2.5} /><circle cx={268} cy={112} r={2.5} />
            <circle cx={288} cy={112} r={2.5} /><circle cx={308} cy={112} r={2.5} /><circle cx={328} cy={112} r={2.5} />
          </g>
          <text x={280} y={135} fill="#9a9a9a" fontSize="11" textAnchor="middle">マイナスの電子が表面に並んで「道」になる</text>

          {/* current arrow */}
          <line x1={150} y1={98} x2={110} y2={98} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={450} y1={98} x2={410} y2={98} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={90} y={102} fill="#9a9a9a" fontSize="11" textAnchor="middle">左</text>
          <text x={470} y={102} fill="#9a9a9a" fontSize="11" textAnchor="middle">右</text>
        </svg>
      </Diagram>

      <p>普通の状態では、電気を流そうとしても電子はカラメル(n型)まで来たところで、プリン(p型)側のプラスに引き寄せられて先へ進めません ― <strong>流れない</strong>のです。門番が仕事をしている状態です。</p>
      <p>そこで一計を案じます。プリンの<strong>てっぺん</strong>に「電気のプラス」を近づける(電圧を与える、とイメージしてください)。すると、プリン全体にほんの少しだけあるマイナスが、上のプラスに引き寄せられて<strong>表面に集まってきます</strong>。その結果、カラメルとカラメルの<strong>間</strong>に、マイナスの電子が並んだ<strong>道</strong>ができ、そこを電気が通れるようになります ― <strong>条件付きで電気が流れる</strong>瞬間です。</p>
      <p>これがまさに、前ページの「背中に電気が流れている間だけ、右から左へ通す」門番の正体です。実際にはプリンの上を指でなぞるのではなく、<strong>てっぺんの電極(ゲート)に電気が来ているかどうか</strong>で、カラメル間の道ができるか決まります。</p>

      <Analogy label="💡 対応関係">
        「プラスの棒を持った人がプリンの表面をなぞる」＝<strong>背中(ゲート)に電気が流れている</strong>状態。このときだけ、右から左(カラメルからカラメル)へ電流が流れます。ゲートを離せば道は消え、また門番が通せんぼに戻ります。
      </Analogy>

      <Heading num="03">モジュール化 ― 中身は忘れて「1個の部品」に</Heading>
      <p>ここまでで、半導体2つ(n型・p型)を組み合わせてトランジスタができる仕組みを見ました。大事なのはここからです。トランジスタの中身(n型・p型・プリン)は、<strong>この回で納得したらもう振り返りません</strong>。以降は「条件が整ったときだけ電気を通す部品」という<strong>ひとまとまり</strong>として扱います。</p>
      <p>これを<Term>モジュール化</Term>と呼びます。料理で「人参を切る」「タマネギを切る」をまとめて「野菜を切る」と呼ぶように、<strong>ひとまとまりの機能として切り出す</strong>ことです。半導体2つを組み合わせてトランジスタにした時点で、トランジスタはもう立派なモジュールです。</p>

      <Aside label="このあと">
        プリン(中身)は忘れてよいですが、<strong>トランジスタというモジュール</strong>は忘れないでください。次のページからは、この門番を<strong>組み合わせて</strong>どう計算するか ― という話に進みます。
      </Aside>

      <Heading num="まとめ">この回の要点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>半導体はn型とp型の2種類</h4>
          <p>n型はマイナス(電子)寄り、p型はプラス寄り。組み合わせるとトランジスタになります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ゲートで「道」ができる</h4>
          <p>てっぺんの電極にプラスを近づけると、電子が表面に集まって通り道ができ、条件付きで電気が流れます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>あとはモジュールとして扱う</h4>
          <p>中身のプリンは忘れてよい。「条件付きで通す部品」というひとまとまりで先へ進みます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/semiconductor" tag="コンピュータ">半導体の全体像</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/logic" tag="コンピュータ">直列と並列で論理をつくる ― AND・ORゲート</RelatedLink>
                    <RelatedLink href="/computer/semiconductor/adder" tag="コンピュータ">足し算をつくる ― 半加算器と全加算器</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
