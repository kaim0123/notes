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
  title: "記憶管理と仮想記憶",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>記憶管理と仮想記憶 ― OSがメモリをやりくりする仕組み</h1>
        <Lead>
          物理メモリ(RAM)は有限なのに、私たちは平気で何個ものアプリを同時に立ち上げます。これを成立させているのが、OSの<Term>記憶管理</Term>です。ここでは、実メモリの割り当てから、足りない分をディスクで補う<Term>仮想記憶</Term>・ページング・ページ置換えまでを、試験で問われる仕組みとして整理します。「<Link href="/computer/memory/virtual">なぜ仮想メモリが必要か</Link>」の物語版と対になる、仕組み版のページです。
        </Lead>
      </Hero>

      <p>「<Link href="/computer/memory">メモリの仕組み</Link>」ではハードとしての記憶階層を、「<Link href="/os/process">プロセスとスレッド</Link>」では各プロセスがメモリ空間を持つことを見ました。ここではOSの視点から、その限られたメモリを<strong>どう区切り、どう足りなさを埋めるか</strong>を見ていきます。</p>

      <Heading num="01">実記憶の割り当て ― 区画とフラグメンテーション</Heading>
      <p>OSはまず、物理メモリ(実記憶)を各プログラムに割り当てます。古典的な方式は「区画(パーティション)」に区切る考え方です。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>内容</th></tr>
          <tr><td className="hl">固定区画方式</td><td>あらかじめ決めた大きさの区画に区切る。単純だが、区画より小さいプログラムを入れると余りが無駄になる。</td></tr>
          <tr><td className="hl">可変区画方式</td><td>プログラムの大きさに合わせて必要なぶんだけ割り当てる。無駄は減るが、確保と解放を繰り返すうちに隙間が散らばる。</td></tr>
        </tbody>
      </table>
      <p>この「使える容量の合計は足りているのに、細切れの隙間ばかりで大きな連続領域が取れない」状態を<Term>フラグメンテーション(断片化)</Term>と呼びます。散らばった空きをまとめ直す操作を<Term>メモリコンパクション</Term>といいます。</p>

      <h3>スワッピング ― まるごと退避する</h3>
      <p>メモリが足りないとき、実行中でないプロセスのメモリ内容を<strong>まるごと補助記憶へ退避</strong>し、必要になったら戻す方式が<Term>スワッピング</Term>です。退避先の領域を<Term>スワップ領域</Term>と呼びます。単位が「プロセスまるごと」と大きいのが特徴で、次のページングと対比されます。</p>

      <Heading num="02">仮想記憶 ― 「実際より広いメモリ」という嘘</Heading>
      <p><Term>仮想記憶</Term>は、実メモリと補助記憶を組み合わせて、各プロセスに<strong>実際の物理メモリより広い連続したアドレス空間</strong>があるように見せる仕組みです。プロセスが使う<Term>仮想アドレス</Term>を、OSとハードウェア(MMU)が実際の<Term>物理アドレス</Term>へ変換します。</p>
      <Analogy label="💡 たとえるなら">
        机(実メモリ)が狭くても、隣に大きな棚(補助記憶)があれば、今使う書類だけ机に出し、残りは棚にしまっておけます。作業者からは「広い机で作業しているつもり」でいられる ― この“つもり”を作るのが仮想記憶です。
      </Analogy>

      <h3>ページング方式</h3>
      <p>仮想記憶の代表的な実現方式が<Term>ページング</Term>です。メモリを<strong>ページ</strong>という固定長の単位に区切り、仮想ページと物理ページ(ページフレーム)の対応を<Term>ページテーブル</Term>で管理します。必要なページだけを物理メモリに載せ、残りは補助記憶に置きます。</p>
      <Diagram caption="ページング:仮想ページは、必要なものだけ物理メモリのページフレームに載る">
        <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg">
          <text x={90} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">仮想アドレス空間</text>
          <rect x={40} y={35} width={100} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.3" />
          <text x={90} y={55} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ0</text>
          <rect x={40} y={70} width={100} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.3" />
          <text x={90} y={90} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ1</text>
          <rect x={40} y={105} width={100} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.3" strokeDasharray="4 3" />
          <text x={90} y={125} fill="#9a9a9a" fontSize="12" textAnchor="middle">ページ2</text>

          <text x={280} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">物理メモリ</text>
          <rect x={230} y={35} width={100} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.3" />
          <text x={280} y={55} fill="#f2f2f2" fontSize="12" textAnchor="middle">フレームA</text>
          <rect x={230} y={70} width={100} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.3" />
          <text x={280} y={90} fill="#f2f2f2" fontSize="12" textAnchor="middle">フレームB</text>

          <text x={470} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">補助記憶</text>
          <rect x={420} y={105} width={100} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.3" />
          <text x={470} y={125} fill="#9a9a9a" fontSize="12" textAnchor="middle">ページ2(退避)</text>

          <line x1={140} y1={50} x2={230} y2={50} stroke="#39ff6a" strokeWidth="1" />
          <polygon points="230,50 222,45 222,55" fill="#39ff6a" />
          <line x1={140} y1={85} x2={230} y2={85} stroke="#39ff6a" strokeWidth="1" />
          <polygon points="230,85 222,80 222,90" fill="#39ff6a" />
          <line x1={140} y1={120} x2={420} y2={120} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <polygon points="420,120 412,115 412,125" fill="#5f5f5f" />
        </svg>
      </Diagram>

      <Aside label="ページングとセグメント方式">
        ページングが「固定長のページ」で区切るのに対し、<Term>セグメント方式</Term>はプログラムの意味的なまとまり(コード・データ・スタックなど)ごとの<strong>可変長</strong>で区切ります。両者を組み合わせたセグメントページング方式もあります。
      </Aside>

      <Heading num="03">ページフォールトとページ置換え</Heading>
      <p>アクセスしたページが物理メモリに載っていないとき、<Term>ページフォールト</Term>が発生します(内部割込みの一種)。OSは補助記憶から目的のページを読み込みますが、物理メモリが満杯なら<strong>どれかを追い出して</strong>空きを作る必要があります。この追い出す相手を選ぶのが<Term>ページ置換えアルゴリズム</Term>です。</p>
      <table>
        <tbody>
          <tr><th>アルゴリズム</th><th>追い出す相手</th></tr>
          <tr><td className="hl">LRU<br />(Least Recently Used)</td><td>最も長く使われていないページ。「しばらく使っていない＝当分使わない」と見込む。</td></tr>
          <tr><td className="hl">FIFO<br />(First In First Out)</td><td>最初に読み込んだページ。単純だが、よく使うページも順番で追い出してしまうことがある。</td></tr>
        </tbody>
      </table>

      <h3>スラッシング ― 置換えばかりで仕事が進まない</h3>
      <p>物理メモリに対して要求が過大だと、ページを入れては追い出す<strong>ページの出入りだけでCPUが忙殺され</strong>、肝心の処理が進まなくなります。この状態が<Term>スラッシング</Term>です。メモリを増設するか、動かすプロセスを減らすことで解消します。</p>
      <Analogy label="💡 たとえるなら">
        狭い机で作業していて、書類を出すたびに別の書類を棚へ戻し、また取りに行く…を延々繰り返している状態です。棚と机の往復だけで一日が終わり、本来の仕事がまったく進みません。
      </Analogy>

      <Aside label="関連 ― ガーベジコレクション">
        使わなくなったメモリ領域を自動的に回収する仕組みが<Term>ガーベジコレクション(GC)</Term>です。これはOSの記憶管理そのものではなく、プログラミング言語のランタイムが行うヒープ管理ですが、「不要なメモリを見つけて解放する」という点で記憶管理と地続きの話題です。
      </Aside>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>実記憶は区画で配り、断片化する</h4>
          <p>固定/可変区画で割り当て、確保と解放の繰り返しでフラグメンテーションが起きます。まるごと退避がスワッピング。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>仮想記憶は広さの錯覚をつくる</h4>
          <p>ページングで必要なページだけ物理メモリに載せ、残りは補助記憶へ。仮想アドレスをMMUが物理アドレスへ変換します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>足りなくなると置換え、そしてスラッシング</h4>
          <p>ページフォールト時にLRU・FIFOで追い出す相手を選び、要求過大だと置換えばかりのスラッシングに陥ります。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory/virtual" tag="コンピュータ">仮想メモリとソフトウェアの肥大化 ― なぜ仮想化するのか</RelatedLink>
                    <RelatedLink href="/os/process" tag="OS">プロセスとスレッド ― 仮想アドレス空間とMMU</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― 記憶階層</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
