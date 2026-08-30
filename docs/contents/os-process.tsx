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
  title: "プロセスとスレッド",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>プロセスとスレッド ― CPUを分け合う仕組み</h1>
        <Lead>
          Chromeがタブや拡張機能ごとに何十個ものプロセスを立ち上げるのは、バグではなく意図的な設計です。1つがクラッシュしても他は無事 ―
          その安定性と安全性は、OSがプログラムを「プロセス」という独立した単位で隔離し、限られたCPUを高速に切り替えながら配分しているからこそ実現します。ここではその内部構造を、メモリの区画からスケジューリング、プロセス間通信まで掘り下げます。
        </Lead>
      </Hero>

      <p>「<Link href="/os">OSの仕組み</Link>」では、プロセスとスレッドを「実行中のプログラム」と「その中の作業員」として大まかに紹介しました。このページはその深掘りです。プロセスがどんなメモリ構造を持ち、OSがどう管理し、どう切り替え、どう協調させるのか ― 一段ずつ解剖していきます。</p>

      <Heading num="01">プロセスとは ― プログラムとの違い</Heading>
      <p><Term>プログラム</Term>は設計図、<Term>プロセス</Term>はその設計図を使って実際に動いている状態です。同じExcelのプログラムファイルが1つでも、3つ開けば3つのプロセスが生まれます ― 同じ設計図から3棟の建物を建てるようなものです。</p>
      <p>各プロセスには<Term>PID(Process ID)</Term>という固有の番号が振られ、OSはこれを「背番号」としてプロセスを特定します。そして各プロセスは<strong>自分専用のメモリ空間</strong>を持ち、他のプロセスとは完全に隔離されています。だからこそ、1つが暴走しても他に被害が及びません。</p>

      <Heading num="02">仮想アドレス空間とMMU</Heading>
      <p>プロセスが持つ専用メモリ空間を<Term>仮想アドレス空間</Term>と呼びます。「仮想」は偽物という意味ではなく、<strong>自分専用に見える</strong>という意味です。各プロセスは「メモリを丸ごと独り占めしている」かのような幻想の中で動きます。</p>
      <p>仮想アドレスから実際の物理アドレスへの変換は、<Term>MMU(Memory Management Unit)</Term>というハードウェアが担当します。この仕組み全体を<Term>仮想メモリシステム</Term>と呼びます。</p>
      <Analogy label="💡 たとえるなら">
        仮想アドレス空間はホテルの部屋です。宿泊客(プロセス)から見れば各部屋は独立していますが、実際の建物(物理メモリ)は全員で共有しています。MMUはフロント係で、「302号室」という部屋番号(仮想アドレス)を「3階右端の部屋」という実際の場所(物理アドレス)に変換してくれます。
      </Analogy>

      <Heading num="03">プロセスのメモリ構造 ― 5つのセグメント</Heading>
      <p>プロセスのメモリ空間は、大きく<strong>5つの部屋</strong>に分かれています。この区画分けは「<Link href="/computer/memory">メモリの仕組み</Link>」で扱ったコード領域・データ領域・ヒープ・スタックと同じものを、より細かく見たものです。</p>
      <table>
        <tbody>
          <tr><th>セグメント</th><th>内容</th><th>特徴</th></tr>
          <tr><td className="hl">テキストセグメント</td><td>プログラムの命令(機械語)</td><td>読み取り専用。実行中に変更されない</td></tr>
          <tr><td className="hl">データセグメント</td><td>初期値が決まっている固定データ(グローバル変数など)</td><td>プログラムファイルに含まれる</td></tr>
          <tr><td className="hl">BSSセグメント</td><td>まだ中身が空の変数用領域(Block Started by Symbol)</td><td>ファイルに保存不要 ― その分ファイルサイズを小さくできる</td></tr>
          <tr><td className="hl">ヒープ</td><td>実行中に動的に確保するメモリ(<code>malloc</code> / <code>new</code> 等)</td><td>下から上へ成長。解放し忘れると<Term>メモリリーク</Term></td></tr>
          <tr><td className="hl">スタック</td><td>関数呼び出しの情報(リターンアドレス・ローカル変数)</td><td>上から下へ成長。LIFO。通常8MB程度の制限あり</td></tr>
        </tbody>
      </table>
      <Diagram caption="ヒープは下から上へ、スタックは上から下へ ― 互いに向かって伸びていく">
        <svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg">
          <rect x={90} y={20} width={200} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={190} y={44} fill="#f2f2f2" fontSize="13" textAnchor="middle">テキスト(命令・読み取り専用)</text>
          <rect x={90} y={62} width={200} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={190} y={86} fill="#f2f2f2" fontSize="13" textAnchor="middle">データ(初期値ありの変数)</text>
          <rect x={90} y={104} width={200} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={190} y={128} fill="#f2f2f2" fontSize="13" textAnchor="middle">BSS(初期値なしの変数)</text>
          <rect x={90} y={146} width={200} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={190} y={168} fill="#f2f2f2" fontSize="13" textAnchor="middle">ヒープ</text>
          <text x={190} y={186} fill="#9a9a9a" fontSize="11" textAnchor="middle">↑ 上へ成長</text>
          <rect x={90} y={230} width={200} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={190} y={252} fill="#f2f2f2" fontSize="13" textAnchor="middle">スタック</text>
          <text x={190} y={270} fill="#9a9a9a" fontSize="11" textAnchor="middle">↓ 下へ成長</text>
        </svg>
      </Diagram>
      <p>ヒープとスタックは反対方向に成長するため、両者が衝突したりOSの制限に達すると<Term>スタックオーバーフロー</Term>が発生し、プログラムがクラッシュします。スタックがなぜLIFOで、関数呼び出しでどう積み上がるかは「<Link href="/computer/memory/stack">スタックと関数呼び出しの舞台裏</Link>」で詳しく扱います。</p>

      <Heading num="04">PCB ― OSの管理台帳</Heading>
      <p>OSがプロセスを管理するための<strong>超詳しい履歴書</strong>が<Term>PCB(Process Control Block)</Term>です。Linuxでは <code>task_struct</code> として実装され、100項目以上の巨大なデータ構造になっています。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">プロセスの状態</td><td>実行中・待機中・準備OKなど(人間で言えば働いている・休憩中・待機中)</td></tr>
          <tr><td className="hl">プログラムカウンター</td><td>今どこまで処理が進んだか。本のしおりのようなもので、一時停止しても続きから再開できる</td></tr>
          <tr><td className="hl">CPUレジスタの内容</td><td>切り替え時に保存・復元する。これをまとめて<Term>コンテキスト</Term>と呼ぶ</td></tr>
          <tr><td className="hl">スケジューリング情報</td><td>優先度、<Term>nice値</Term>(−20〜19。小さいほど「俺が優先」)</td></tr>
          <tr><td className="hl">メモリ管理情報</td><td>5セグメントの位置と<Term>ページテーブル</Term>(仮想→物理の変換辞書)</td></tr>
          <tr><td className="hl">ファイルディスクリプタ表</td><td>開いているファイル一覧。標準入力=0、標準出力=1、標準エラー=2</td></tr>
          <tr><td className="hl">親子関係</td><td>親プロセスID・子プロセスのリスト ― プロセスの家系図</td></tr>
        </tbody>
      </table>

      <Heading num="05">プロセスのライフサイクル ― 5つの状態</Heading>
      <p>プロセスは生まれてから死ぬまで、主に5つの状態を経験します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>新規(New)</h4><p>生まれたばかりの赤ちゃん状態</p></Card>
        <Card><CardNumber>2</CardNumber><h4>実行可能(Ready)</h4><p>準備はできているが順番待ち(スタートライン)</p></Card>
        <Card><CardNumber>3</CardNumber><h4>実行中(Running)</h4><p>実際にCPUを使って処理中</p></Card>
        <Card><CardNumber>4</CardNumber><h4>待機(Waiting)</h4><p>ファイル読み込みやデータ到着を待っている</p></Card>
        <Card><CardNumber>5</CardNumber><h4>終了(Terminated)</h4><p>仕事を終えてゴール</p></Card>
      </CardGrid>
      <Aside label="待機には2種類ある">
        <strong>割り込み可能待機</strong>は「起こしてもよい」状態(昼寝中)、<strong>割り込み不可能待機</strong>は「絶対起こすな」状態(手術中)。ディスク書き込みなど中断すると危険な作業中は後者になります。
      </Aside>

      <Heading num="06">プロセスの生成 ― forkとcopy-on-write</Heading>
      <p>Linuxでは<Term>fork</Term>システムコールでプロセスを生成します。親プロセスが自分のコピー(子プロセス)を作るのです。ただし完全コピーは無駄が多いため、<Term>copy-on-write(COW)</Term>という工夫を使います ― 最初は同じメモリを共有し、<strong>どちらかが書き換えようとした瞬間だけ</strong>コピーを作ります。</p>
      <Analogy label="💡 たとえるなら">
        教科書を読むだけなら1冊をみんなで共有すれば十分です。書き込みたい人が現れたときだけ、その人のためにコピーを1冊作る ― これがcopy-on-writeの発想です。
      </Analogy>
      <p>fork後、子プロセスは<Term>exec</Term>で別のプログラムに「変身」することがよくあります。この<strong>fork + exec</strong>の組み合わせが、Unix/Linuxにおけるプログラム実行の標準パターンです(詳しくは最後の節)。</p>

      <Heading num="07">スケジューラ ― CPUを誰に使わせるか</Heading>
      <p><Term>スケジューラ</Term>は、どのプロセスにCPUを使わせるかを決める管理者です(先生が生徒を指名するイメージ)。代表的な方式を比べてみましょう。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>内容</th><th>問題点</th></tr>
          <tr><td className="hl">先着順(FCFS)</td><td>早く来た人から順番</td><td>長いジョブが先だと後ろが<Term>飢餓(starvation)</Term></td></tr>
          <tr><td className="hl">最短ジョブ優先(SJF)</td><td>早く終わる仕事を優先</td><td>長いジョブが永遠に実行されないことがある</td></tr>
          <tr><td className="hl">ラウンドロビン(RR)</td><td>全員に少しずつ時間を割り当て(例:各10ms)</td><td>公平で実用的。人気の方式</td></tr>
          <tr><td className="hl">優先度ベース</td><td>重要な仕事を優先(VIP待遇)</td><td>VIPばかりだと一般が飢餓 ― <Term>エージング</Term>で待ち時間の長いプロセスの優先度を上げる</td></tr>
        </tbody>
      </table>
      <p>各プロセスに割り当てる時間を<Term>タイムクオンタム(タイムスライス)</Term>と呼び、時間切れで強制的に次へ切り替えることを<Term>プリエンプション(先取り)</Term>と呼びます。OSが実行中のプロセスを強制的に中断できる方式を<Term>プリエンプティブ</Term>、プロセスが自ら明け渡すまで切り替えない方式を<Term>ノンプリエンプティブ</Term>といい、ラウンドロビンは前者、先着順(FCFS)は後者です。そして、選ばれたプロセスに実際にCPUを渡す(実行状態に移す)操作を<Term>ディスパッチ</Term>と呼びます。Linuxの<Term>CFS(Completely Fair Scheduler)</Term>は、<strong>仮想実行時間</strong>が最も少ないプロセスを次に実行し、全プロセスの実行時間を均等に保ちます。</p>

      <Heading num="08">コンテキストスイッチ ― 切り替えの手順とコスト</Heading>
      <p>プロセスを切り替える作業が<Term>コンテキストスイッチ</Term>です。料理の途中で電話に出て、また料理に戻るようなものです。</p>
      <Steps>
        <li>現在のプロセスの状態をPCBに保存(CPUレジスタ・プログラムカウンターなど)</li>
        <li>次に実行するプロセスをスケジューラが選択</li>
        <li>次のプロセスの状態をCPUに復元</li>
        <li>メモリマップの切り替え(ページテーブルの変更)</li>
      </Steps>
      <p>所要時間はおおよそ数μs〜数十μs。短いですが、CPUから見れば「何も生産しない無駄な時間」であり、頻繁に切り替えると性能が落ちます(<Term>オーバーヘッド</Term>)。さらにプロセスが変わると、よく使うアドレス変換のキャッシュである<Term>TLB(Translation Lookaside Buffer)</Term>がクリアされ、再構築のコストもかかります。</p>
      <p>それでもこの仕組みがなければ<Term>マルチタスク</Term>は実現できません。複数のことを同時にやっているように見えるのは、実際には超高速で切り替えているだけなのです。</p>

      <Heading num="09">IPC ― 独立したプロセスの協力</Heading>
      <p>プロセスは互いに隔離されていますが、協力したい場面もあります(動画編集ソフトがプレイヤーにデータを渡すなど)。そのための仕組みが<Term>IPC(Inter-Process Communication)</Term>で、複数の方式があります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>イメージ</th><th>特徴</th></tr>
          <tr><td className="hl">パイプ</td><td>水道管</td><td>一方通行。<code>ls | grep text</code> のようにコマンド出力を次へ渡す</td></tr>
          <tr><td className="hl">メッセージキュー</td><td>郵便ポスト</td><td>Aがメッセージを投函し、Bが順番に取り出す</td></tr>
          <tr><td className="hl">共有メモリ</td><td>共同作業スペース</td><td>最速。同じメモリ領域を共有できるが、同時書き込みで<Term>競合状態</Term>が起きうる</td></tr>
          <tr><td className="hl">ソケット</td><td>電話</td><td>ネットワーク通信の基本。同じマシン内でも使える</td></tr>
          <tr><td className="hl">シグナル</td><td>合図</td><td>Ctrl+C→SIGINT、終了依頼→SIGTERM、強制終了→SIGKILL</td></tr>
        </tbody>
      </table>
      <p>共有メモリでは<Term>ミューテックス(mutex)</Term>や<Term>セマフォ</Term>で交通整理します。ミューテックスは「1人ずつ入ってね」の札(トイレの使用中サイン)にあたり、<Term>相互排他(mutual exclusion)</Term>を実現します。</p>

      <Heading num="10">スレッド ― プロセス内の作業員</Heading>
      <p><Term>スレッド</Term>はプロセスの中で動く小さな作業員です(プロセス=会社、スレッド=社員)。1つのプロセスは複数のスレッドを持て、同じプロセス内のスレッドは<strong>メモリを共有</strong>できます(同じオフィス・同じ資料)。ただし<strong>スタックだけは各スレッドが独自に持ちます</strong>(個人のメモ帳)。</p>
      <table>
        <tbody>
          <tr><th></th><th>プロセス</th><th>スレッド</th></tr>
          <tr><td className="hl">メモリ空間</td><td>完全に独立(別会社)</td><td>共有(同じ会社)</td></tr>
          <tr><td className="hl">コンテキストスイッチ</td><td>遅い(メモリマップ切り替えが必要)</td><td>速い(担当者が変わるだけ)</td></tr>
          <tr><td className="hl">データ共有</td><td>IPCが必要</td><td>グローバル変数に直接アクセス可能</td></tr>
          <tr><td className="hl">生成コスト</td><td>高い</td><td>低い</td></tr>
          <tr><td className="hl">クラッシュの影響</td><td>1つが落ちても他は無事</td><td>1つが落ちるとプロセス全体が道連れ</td></tr>
          <tr><td className="hl">競合状態</td><td>起きにくい(隔離されている)</td><td>起きやすい(ミューテックスが必要)</td></tr>
        </tbody>
      </table>
      <p>Chromeがスレッドではなく<strong>プロセス分離</strong>を採用するのは、速さより安全性を優先しているからです。</p>

      <Heading num="11">親子関係とゾンビ・孤児</Heading>
      <p>プロセスはforkで他のプロセスを作れます。作った方が<strong>親</strong>、作られた方が<strong>子</strong>です。forkの戻り値で親子を判別でき、親には子のPIDが、子には <code>0</code> が返ります。子は<Term>PPID(親プロセスID)</Term>を知っていて、全プロセスは<Term>initプロセス(PID 1)</Term>から派生する木構造をなします。</p>
      <CardGrid>
        <Card><CardNumber>Z</CardNumber><h4>ゾンビプロセス</h4><p>子が終了しても、親が<code>wait</code>で終了報告を受け取るまでPCBの一部が残る状態。「成仏していない」プロセス。</p></Card>
        <Card><CardNumber>O</CardNumber><h4>孤児プロセス</h4><p>親が先に死んだ子。initプロセスが養子として引き取り、面倒を見る。</p></Card>
      </CardGrid>

      <Heading num="まとめ">プログラム実行の基本 ― fork + exec</Heading>
      <p>ここまで見てきた仕組みは、最終的に<strong>「シェルがプログラムを実行する」</strong>という日常の一場面に集約されます。</p>
      <Steps>
        <li>シェルが<Term>fork</Term>で子プロセスを作る</li>
        <li>子プロセスが<Term>exec</Term>で目的のプログラム(例:<code>ls</code>)に変身する</li>
        <li>子が終了したら、親が<Term>wait</Term>で待機・回収する</li>
      </Steps>
      <p>これがUnix/Linuxにおけるプログラム実行の標準的な流れです。プロセスの生成・メモリ・スケジューリング・通信 ― すべてはこの単純な流れを安全に支えるための仕組みでした。次は、そのforkやexecを含む「アプリからカーネルへの正式な依頼窓口」であるシステムコールを見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/syscall" tag="OS">システムコール</RelatedLink>
                    <RelatedLink href="/os/kernel" tag="OS">カーネルの役割と設計</RelatedLink>
                    <RelatedLink href="/computer/memory/stack" tag="コンピュータ">スタックと関数呼び出し</RelatedLink>
                    <RelatedLink href="/dev/concurrency" tag="実装">並行処理の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
