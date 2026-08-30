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
  title: "システムコール",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>システムコール ― アプリとカーネルをつなぐ唯一の窓口</h1>
        <Lead>
          スマホで動画を見る、ゲームでガチャを引く、ブラウザでネットサーフィンする ―
          これら日常の操作はすべて、裏側で<strong>システムコール経由でカーネルに依頼</strong>して実現しています。システムコールがなければ、アプリはファイルひとつ開けず、画面にも何も表示できません。
        </Lead>
      </Hero>

      <p>前のページ「<a href="/os/kernel">カーネルの役割と設計</a>」で見たとおり、ハードウェアを直接触れるのはカーネルだけです。では、ユーザーモードで動く普通のアプリは、どうやってその力を借りるのでしょうか。その正式な手段が<Term>システムコール</Term>です。</p>

      <Heading num="01">システムコールとは ― アプリとカーネルの架け橋</Heading>
      <p><Term>OS</Term>はコンピュータ全体を管理する巨大なソフトウェアで、その中核である<Term>カーネル</Term>だけがCPU・メモリ・ディスクといったハードウェアを直接制御できます。普通のアプリケーションはカーネルに直接アクセスできません。もし全アプリが勝手にハードウェアを触れば、複数アプリが同時にディスクへ書き込んでデータが壊れるなど、たちまちカオスになります。</p>
      <p>そこで<strong>システムコール</strong>が、アプリがカーネルに「これをやって」と正式にお願いするための窓口として用意されています。</p>

      <Analogy label="💡 たとえるなら">
        ホテルに泊まる宿泊客(アプリ)は、厨房や倉庫に勝手には入れません。でも<strong>ルームサービスやフロントへの依頼</strong>(システムコール)なら、スタッフ(カーネル)がきちんと対応してくれます。危険な場所には立ち入らせず、窓口を通してだけ要望を叶える ― これがシステムコールの発想です。
      </Analogy>

      <Heading num="02">ユーザーモードとカーネルモード</Heading>
      <p>システムコールの核心は、CPUが持つ<strong>2つの実行モードの切り替え</strong>にあります。</p>

      <table>
        <tbody>
          <tr><th>モード</th><th>権限</th><th>動作する主体</th></tr>
          <tr><td className="hl">ユーザーモード</td><td>制限あり。ハードウェア直接操作は不可、メモリも自由にはアクセスできない</td><td>一般アプリケーション</td></tr>
          <tr><td className="hl">カーネルモード</td><td>特権モード。ハードウェア直接操作・全メモリアクセスが可能</td><td>カーネルのみ</td></tr>
        </tbody>
      </table>

      <p>システムコールが呼ばれると、CPUは<strong>ユーザーモード → カーネルモード</strong>へ切り替わり、カーネルが処理を実行したあと<strong>ユーザーモードへ戻ります</strong>。この切り替えはハードウェアレベルで行われるため安全です。カーネルモードのまま常駐させるのは危険なので、<strong>一時的に入ってすぐ戻る</strong>設計になっています。</p>

      <Diagram caption="システムコールは、モードを一瞬だけ切り替えてカーネルの処理を借り、すぐ戻る">
        <svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={30} width={250} height={140} rx="10" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={155} y={54} fill="#9a9a9a" fontSize="13" textAnchor="middle">ユーザーモード(一般客エリア)</text>
          <rect x={55} y={75} width={200} height={40} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={155} y={99} fill="#f2f2f2" fontSize="12" textAnchor="middle">アプリケーション</text>

          <rect x={340} y={30} width={250} height={140} rx="10" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={465} y={54} fill="#9a9a9a" fontSize="13" textAnchor="middle">カーネルモード(スタッフ専用)</text>
          <rect x={365} y={75} width={200} height={40} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={465} y={99} fill="#f2f2f2" fontSize="12" textAnchor="middle">カーネル</text>

          <line x1={255} y1={90} x2={365} y2={90} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={310} y={82} fill="#9a9a9a" fontSize="11" textAnchor="middle">① 依頼</text>
          <line x1={365} y1={120} x2={255} y2={120} stroke="#39ff6a" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={310} y={138} fill="#9a9a9a" fontSize="11" textAnchor="middle">② 結果を返して復帰</text>
        </svg>
      </Diagram>

      <Heading num="03">システムコールの5大カテゴリー</Heading>
      <p>Linuxだけでも<strong>300個以上</strong>のシステムコールが存在しますが、全部を覚える必要はありません。役割で大きく<strong>5つのカテゴリー</strong>に分類できます。</p>

      <table>
        <tbody>
          <tr><th>カテゴリー</th><th>代表的なシステムコール</th><th>役割</th></tr>
          <tr><td className="hl">1. プロセス制御</td><td><code>fork</code>, <code>exec</code>, <code>exit</code>, <code>wait</code></td><td>プログラムの実行・終了・複製を管理</td></tr>
          <tr><td className="hl">2. ファイル操作</td><td><code>open</code>, <code>read</code>, <code>write</code>, <code>close</code></td><td>ファイルの開閉・読み書き(ディスクはハードウェアなのでカーネル経由が必須)</td></tr>
          <tr><td className="hl">3. デバイス管理</td><td><code>ioctl</code>, <code>mmap</code></td><td>キーボード・マウス・プリンター・NICなどのデバイス制御</td></tr>
          <tr><td className="hl">4. 情報管理</td><td><code>getpid</code>, <code>time</code>, <code>sysinfo</code></td><td>プロセスID・現在時刻・メモリ使用状況などシステム状態の取得</td></tr>
          <tr><td className="hl">5. 通信</td><td><code>socket</code>, <code>send</code>, <code>recv</code>, <code>pipe</code></td><td>プロセス間通信・ネットワーク通信(ブラウザの通信もここ)</td></tr>
        </tbody>
      </table>

      <h3>プロセス制御の要点</h3>
      <p><code>fork</code>は親プロセスから子プロセスを複製する「分身の術」で、戻り値で親子を区別します ― 親には子のPID、子には<code>0</code>が返ります。<code>exec</code>は別のプログラムに変身し、<code>exit</code>で終了、<code>wait</code>で子の終了を待ちます。詳しくは「<a href="/os/process">プロセスとスレッド</a>」で扱います。</p>

      <h3>ファイル操作の流れ ― ファイルディスクリプタ</h3>
      <Steps>
        <li><strong><code>open</code></strong> ― カーネルにファイルを開いてもらう。成功すると<Term>ファイルディスクリプタ</Term>(識別用の番号。図書館の受付番号に相当)が返る</li>
        <li><strong><code>read</code></strong> ― ファイルディスクリプタを使って内容を読み込む</li>
        <li><strong><code>close</code></strong> ― 使い終わったことをカーネルに伝える</li>
      </Steps>
      <p>アプリは<strong>一度もハードウェアに直接触れず</strong>、すべてカーネルへの依頼だけで処理が完結します。</p>

      <Heading num="04">システムコールの内部動作 ― 6ステップ</Heading>
      <p>ひとつのシステムコールが実行されるまでの流れは、大きく<strong>6つのステップ</strong>に分かれます。</p>
      <Steps>
        <li><strong>ラッパー関数の呼び出し</strong> ― アプリが<code>read()</code>などの関数を呼ぶ。これは本物のシステムコールそのものではなく、本物を呼び出すための<Term>ラッパー関数</Term>(使いやすく包んだ便利関数)</li>
        <li><strong>システムコール番号の設定</strong> ― ラッパーが番号を設定する(Linux 64bitでは<code>read</code>=0、<code>write</code>=1 など)。カーネルは番号で処理を判断する</li>
        <li><strong>ソフトウェア割り込み</strong> ― <code>syscall</code>命令(x86-64)や<code>int 0x80</code>(旧x86)でCPUに「今の処理を中断してカーネルへ」と割り込む</li>
        <li><strong>モード切り替え</strong> ― ユーザーモード → カーネルモード。特権レベルが変わりハードウェア操作権限を得る</li>
        <li><strong>カーネルによる処理</strong> ― <Term>システムコールテーブル</Term>(メニュー表)を参照し、番号に対応する処理を実行する</li>
        <li><strong>結果の返却と復帰</strong> ― 処理結果を返し、カーネルモード → ユーザーモードへ戻る。アプリは何事もなかったかのように続行する</li>
      </Steps>

      <Heading num="05">オーバーヘッドと効率化</Heading>
      <p>システムコールには<Term>オーバーヘッド</Term>(余計にかかる時間)があります。モード切り替えやカーネルへのジャンプといった手間が毎回発生するため、頻繁にシステムコールを呼ぶプログラムは遅くなることがあります。</p>
      <Aside label="対策の例">ファイルを1バイトずつ読むのではなく、<strong>まとめて読み込む</strong>など、呼び出し回数そのものを減らす工夫が効きます。</Aside>

      <Heading num="06">エラーハンドリング</Heading>
      <p>システムコールは失敗することがあります。失敗時は多くの場合<strong>−1</strong>が返り、<code>errno</code>変数にエラーコードが設定されます ― カーネルが「なぜ失敗したか」を教えてくれる仕組みです。</p>
      <table>
        <tbody>
          <tr><th>状況</th><th>例</th></tr>
          <tr><td className="hl">ファイルが存在しない</td><td><code>ENOENT</code>(No such file or directory)</td></tr>
          <tr><td className="hl">権限が足りない</td><td><code>EACCES</code>(Permission denied)</td></tr>
          <tr><td className="hl">ディスク満杯</td><td>書き込みに失敗する</td></tr>
        </tbody>
      </table>

      <Heading num="07">プロセス間通信 ― パイプ</Heading>
      <p><code>pipe</code>は、2つのプロセス間でデータをやり取りできる「パイプ」をカーネルに作ってもらうシステムコールです。一方のプロセスが書き込んだデータを、もう一方が読み取れます ― <code>ls | grep text</code> のようなパイプラインの基盤です。データのやり取りをカーネルが仲介するため、複数プログラムを<strong>安全に協調動作</strong>させられます。</p>

      <Heading num="08">よくあるミス</Heading>
      <table>
        <tbody>
          <tr><th>ミス</th><th>内容</th><th>対策</th></tr>
          <tr><td className="hl">ファイルディスクリプタのリーク</td><td><code>open</code>したのに<code>close</code>を忘れる → ディスクリプタが枯渇し「これ以上ファイルを開けません」</td><td>必ず<code>close</code>する。借りた本を返さないと新しく借りられない</td></tr>
          <tr><td className="hl">バッファオーバーフロー</td><td><code>read</code>でバッファサイズを超えて読み込む → メモリ破壊・セキュリティホール</td><td>読み込みサイズを厳密に制限する</td></tr>
          <tr><td className="hl">競合状態</td><td>複数プロセスが同じファイルに同時アクセス → データ破壊</td><td><code>fcntl</code>・<code>flock</code>などのロック機構でカーネルに排他制御を依頼</td></tr>
        </tbody>
      </table>

      <Heading num="09">進化と最新技術</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>システムコールの多様化</h4><p>昔は<code>read</code>/<code>write</code>だけだったが、用途別に増えた。<code>pread</code>は特定位置から読み込み、<code>readv</code>は複数バッファに分散して読み込む。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>非同期I/O ― io_uring</h4><p>通常のシステムコールは同期(処理が終わるまで待つ)。Linuxの<Term>io_uring</Term>は超高速な非同期I/Oで、従来比 数倍〜数十倍 速いことも。ネットワーク処理で特に効く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>仮想化</h4><p>仮想マシン内のシステムコールは2段階(ゲストOSのカーネル → ホストOSのカーネル)。<Term>パラバーチャライゼーション</Term>でこの2段階を効率化する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>セキュリティ ― eBPF / seccomp</h4><p><Term>eBPF</Term>はカーネル内で安全にプログラムを実行し、システムコールの監視・フィルタに使う。<Term>seccomp</Term>は使えるシステムコールを制限してアプリをサンドボックス化する。</p></Card>
      </CardGrid>
      <p>なお<strong>マイクロカーネル</strong>アーキテクチャでは、カーネルを極小化し、システムコールの代わりに<Term>メッセージパッシング</Term>でプロセス間協調する設計もあります。カーネルの設計思想(モノリシック vs マイクロ)は、システムコールの姿にも影響しているのです。</p>

      <Heading num="まとめ">システムコールは「礼儀正しい依頼」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>唯一の正式な窓口</h4><p>ハードウェアを触れないアプリが、カーネルの力を借りる唯一の手段がシステムコールです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>一瞬だけ特権に入る</h4><p>呼び出しのたびにユーザーモード↔カーネルモードを切り替え、処理を終えたらすぐ戻ります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>タダではない</h4><p>切り替えにはオーバーヘッドがあるため、呼び出し回数を減らす工夫が性能を左右します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/kernel" tag="OS">カーネルの役割と設計</RelatedLink>
                    <RelatedLink href="/os/process" tag="OS">プロセスとスレッド</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
