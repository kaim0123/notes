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
  title: "カーネルの役割と設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>カーネルの役割と設計 ― OSの中核で何が起きているか</h1>
        <Lead>
          「OS」と一口に言っても、その正体は無数のプログラムの集合体です。その中でただ一つ、電源投入からシャットダウンまで動き続け、ハードウェアを直接触れる特権を持つ中核が<strong>カーネル</strong>です。カーネルが止まればコンピュータ全体が止まる ― この一点に、OSの安定性とセキュリティの根っこが詰まっています。
        </Lead>
      </Hero>

      <p><Link href="/os">OSの仕組み</Link>のページでは、OSがハードウェアとアプリの間で「調整役」を務めること、そしてその中核にカーネルがあり、コンピュータが4層構造で積み上がっていることを俯瞰しました。このページでは、その<strong>カーネルそのもの</strong>にズームインします ― どんな役割を担い、どんな設計思想があり、なぜ「特権」という概念が必要なのかを見ていきます。</p>

      <Heading num="01">OSはひとつのプログラムではない</Heading>
      <p><Term>OS(Operating System)</Term>は日本語で<strong>基本ソフトウェア</strong>と呼ばれ、コンピュータを動かすための土台となるソフトウェアです。Windows・macOS・iOS・Android・Linuxなどが代表例で、その役割は大きく4つに整理できます。</p>
      <table>
        <tbody>
          <tr><th>役割</th><th>内容</th><th>具体例</th></tr>
          <tr><td className="hl">ハードウェアの管理</td><td>CPU・メモリ・HDD/SSD・キーボード・マウス・ディスプレイなどを統括する</td><td>キー入力の検知(Aキーが押された、など)</td></tr>
          <tr><td className="hl">アプリの実行管理</td><td>ブラウザ・ゲーム・動画プレイヤーなどのプログラムを起動・管理する</td><td>複数アプリの同時実行</td></tr>
          <tr><td className="hl">ファイルシステム管理</td><td>写真・動画・文書などのデータの保存・読み込みを担う</td><td>フォルダ構成、ファイルの読み書き</td></tr>
          <tr><td className="hl">UIの提供</td><td>デスクトップ・ウィンドウ・アイコンなどの見た目を提供する</td><td>WindowsとmacOSでUIが違うのはOSが違うため</td></tr>
        </tbody>
      </table>
      <p>ここで大切なのは、OSは<strong>1つのプログラムではなく、多数のプログラムの集合体</strong>だということです。Windowsならエクスプローラー・タスクマネージャー・設定・電卓・メモ帳などが含まれ、これら全部をまとめて「OS」と呼びます ― いわば超巨大なソフトウェアパッケージです。</p>
      <Analogy label="💡 たとえるなら">
        OSは「福袋」のようなものです。中には大小さまざまなプログラムが詰め合わされていて、その全体を一つの名前で呼んでいるだけ。袋の中身のうち、絶対に欠かせない一番大事な中身がカーネルにあたります。
      </Analogy>

      <Heading num="02">カーネル ― OSの中核(core)</Heading>
      <p><Term>カーネル(kernel)</Term>は英語で「核・中心」を意味し、OSという集合体の中で<strong>最も重要なコア部分</strong>を指します。OSが会社全体なら、カーネルは社長室に相当します。電源投入からシャットダウンまで<strong>常に動き続け</strong>、カーネルが停止すればコンピュータ全体が停止します。</p>
      <p>カーネルが担う役割は、次の5つに整理できます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>プロセス管理</h4><p>どのプログラムをいつ実行するかを決める。ゲームしながら音楽を聞けるのは、カーネルが交互に実行しているため</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メモリ管理</h4><p>限られたRAM(8GB・16GB等)を各プログラムに公平に割り当てる</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ファイルシステム管理</h4><p>HDD/SSD上のファイルの読み書きを低レベルで処理する</p></Card>
        <Card><CardNumber>4</CardNumber><h4>デバイス管理</h4><p>キーボード・マウス・プリンター・NICなどを直接コントロールする。ハードウェアへの直接アクセス権を持つのはカーネルだけ</p></Card>
        <Card><CardNumber>5</CardNumber><h4>システムコールの提供</h4><p>アプリがカーネルの機能を使うための公式窓口を用意する</p></Card>
      </CardGrid>
      <p>5番目の<Term>システムコール</Term>は、アプリが直接ハードウェアを触れない代わりに「カーネルさん、これをやってください」と依頼するための仕組みです。これ自体が大きなテーマなので、詳しくは<Link href="/os/syscall">システムコール</Link>のページで扱います。</p>

      <Heading num="03">コンピュータシステムの4層構造</Heading>
      <p>カーネルの位置づけを理解するには、コンピュータシステムを<strong>ミルフィーユ(層状)</strong>のように4層に分けて考えると見通しがよくなります。ハードウェアに近いほど下、人間の操作に近いほど上です。</p>
      <Diagram caption="上の層は、下の層の機能を使って動く。ハードウェアに直接触れるのはカーネルだけ">
        <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg">
          <rect x={80} y={10} width={400} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={32} fill="#f2f2f2" fontSize="14" textAnchor="middle">第4層: アプリケーション</text>
          <text x={280} y={50} fill="#9a9a9a" fontSize="11" textAnchor="middle">ブラウザ・ゲーム・オフィスソフト</text>

          <rect x={80} y={70} width={400} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={92} fill="#f2f2f2" fontSize="14" textAnchor="middle">第3層: システムプログラム</text>
          <text x={280} y={110} fill="#9a9a9a" fontSize="11" textAnchor="middle">シェル・エクスプローラー・設定など カーネル以外のOS</text>

          <rect x={80} y={130} width={400} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={152} fill="#f2f2f2" fontSize="14" textAnchor="middle">第2層: カーネル</text>
          <text x={280} y={170} fill="#9a9a9a" fontSize="11" textAnchor="middle">ハードウェアを直接触れる唯一の存在(ハードウェア抽象化層)</text>

          <rect x={80} y={190} width={400} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={212} fill="#f2f2f2" fontSize="14" textAnchor="middle">第1層: ハードウェア</text>
          <text x={280} y={230} fill="#9a9a9a" fontSize="11" textAnchor="middle">CPU・メモリ・HDD/SSD・GPU など物理部品</text>

          <text x={280} y={266} fill="#9a9a9a" fontSize="11" textAnchor="middle">複雑なハードウェアをカーネルが整理し、上の層に使いやすく見せている</text>
        </svg>
      </Diagram>
      <p>カーネルは<Term>ハードウェア抽象化層</Term>として、複雑なハードウェアを整理し、上の層が扱いやすい形に変換しています。第3層のシステムプログラムは、カーネル以外のOS構成要素 ― シェルやファイルマネージャー、設定プログラムなど ― のことです。</p>

      <h3>「OS」という言葉の2つの意味</h3>
      <p>実は「OS」という言葉には広狭2つの意味があり、文脈で使い分けられています。</p>
      <table>
        <tbody>
          <tr><th>意味</th><th>範囲</th><th>使われ方</th></tr>
          <tr><td className="hl">広い意味(一般的)</td><td>カーネル + システムプログラム全体</td><td>日常会話での「WindowsはOSだ」</td></tr>
          <tr><td className="hl">狭い意味(技術者向け)</td><td>カーネルのみを指すこともある</td><td>文脈で判断が必要</td></tr>
        </tbody>
      </table>
      <p>基本は「<strong>OS全体の中にカーネルが含まれる</strong>」と覚えておけば十分です。</p>

      <Aside label="Linuxという名前の正体">
        厳密には「Linux」＝<strong>Linuxカーネル</strong>の名前であり、OSそのものではありません。一般的にはLinuxカーネルを使ったOS全体を「Linux」と呼びます。Ubuntu・Fedora・Debianなどは<Term>Linuxディストリビューション</Term>と呼ばれ、同じLinuxカーネルを土台に、上に載せるソフトが異なるものです。カーネルは土台で、その上にいろいろ載せられるイメージです。
      </Aside>

      <Heading num="04">カーネルの設計思想 ― 3種類 + 新興アーキテクチャ</Heading>
      <p>カーネルには「どこまでをカーネル内部に詰め込むか」という設計上の大きな分岐があります。代表的な2つの思想と、その中間、そして研究段階のものを見ていきましょう。</p>

      <h3>モノリシックカーネル</h3>
      <p><Term>モノリシックカーネル(Monolithic Kernel)</Term>は、ファイルシステム・デバイスドライバ・ネットワークなどOSの主要機能を<strong>すべてカーネル内に詰め込む</strong>方式です。一体化しているため機能間の通信が高速な一方、カーネルが巨大・複雑になり、バグが全体に波及しやすいという弱点があります。代表例は<strong>Linux</strong>やUNIXで、部品間通信が少ないぶんパフォーマンスが高いのが強みです。</p>

      <h3>マイクロカーネル</h3>
      <p><Term>マイクロカーネル(Microkernel)</Term>は逆に、カーネルを<strong>最小限</strong>に留め、ファイルシステムやデバイスドライバをカーネル外の通常プログラムとして動かす方式です。部品が分離されているため安定性・セキュリティが高く、ドライバのバグがカーネル本体を壊しにくいのが利点。代わりに機能間通信にオーバーヘッドがかかり、モノリシックより遅くなりがちです。代表例はMinix・QNX・L4です。</p>

      <h3>ハイブリッド/新興アーキテクチャ</h3>
      <p><Term>ハイブリッドカーネル(Hybrid Kernel)</Term>は、基本はモノリシックながら一部機能をモジュール化して柔軟性を持たせる中間アプローチで、Windows NTカーネルが代表例です。さらに研究段階として<strong>エクソカーネル(Exokernel)</strong>や<strong>ユニカーネル(Unikernel)</strong>といった新しいアーキテクチャも登場しています。</p>

      <table>
        <tbody>
          <tr><th>方式</th><th>概要</th><th>代表例</th><th>トレードオフ</th></tr>
          <tr><td className="hl">モノリシック</td><td>全機能を1つの大きなカーネルにまとめる</td><td>Linux・UNIX</td><td>高速だが障害が全体に波及しやすい</td></tr>
          <tr><td className="hl">マイクロ</td><td>最低限だけをカーネルに残し、他はカーネル外で動かす</td><td>Minix・QNX・L4</td><td>安定・安全だが通信オーバーヘッドで遅くなりがち</td></tr>
          <tr><td className="hl">ハイブリッド</td><td>モノリシック＋一部モジュール化の中間</td><td>Windows NT</td><td>柔軟性と性能のバランス型</td></tr>
        </tbody>
      </table>
      <p>この「モノリシック vs マイクロ」という対立軸は、後のUNIX・Linuxの歴史でも繰り返し登場する重要なテーマです。</p>

      <Heading num="05">カーネルの特権 ― ユーザーモードとカーネルモード</Heading>
      <p>カーネルだけがハードウェアを直接触れる、と述べてきました。これを実際に保証しているのが、CPUに備わった<strong>2つの実行モード</strong>です。この仕組みこそ、セキュリティと安定性の根幹です。</p>
      <table>
        <tbody>
          <tr><th>モード</th><th>別名</th><th>権限</th><th>動作する主体</th></tr>
          <tr><td className="hl">ユーザーモード</td><td>制限付きモード</td><td>ハードウェア直接アクセス不可、他プロセスのメモリ閲覧不可、CPU特殊命令使用不可</td><td>一般アプリケーション</td></tr>
          <tr><td className="hl">カーネルモード</td><td>特権モード</td><td>ハードウェア直接操作、全メモリアクセス、CPU全命令使用可能</td><td>カーネルのみ</td></tr>
        </tbody>
      </table>

      <h3>Intel CPUのリングレベル</h3>
      <p>この特権の高さを、Intel CPUでは<Term>リング</Term>という同心円で表現します。番号が小さいほど特権が高く、海の深さのようなイメージです。</p>
      <Diagram caption="番号が小さいほど内側=高特権。カーネルはRing 0、アプリはRing 3で動く">
        <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx={180} cy={150} r={140} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <circle cx={180} cy={150} r={100} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <circle cx={180} cy={150} r={60} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <circle cx={180} cy={150} r={26} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={180} y={154} fill="#f2f2f2" fontSize="12" textAnchor="middle">Ring 0</text>
          <text x={180} y={100} fill="#9a9a9a" fontSize="11" textAnchor="middle">Ring 1</text>
          <text x={180} y={60} fill="#9a9a9a" fontSize="11" textAnchor="middle">Ring 2</text>
          <text x={180} y={22} fill="#9a9a9a" fontSize="11" textAnchor="middle">Ring 3</text>
          <text x={180} y={175} fill="#39ff6a" fontSize="10" textAnchor="middle">カーネル</text>
          <text x={180} y={285} fill="#9a9a9a" fontSize="11" textAnchor="middle">最外周のRing 3で一般アプリが動作する</text>
        </svg>
      </Diagram>

      <h3>モード切り替えとカーネルモードの追加特権</h3>
      <p>ユーザーモードからカーネルモードへは<strong>勝手には入れません</strong>。特別な手続き ― その正式な窓口が<Link href="/os/syscall">システムコール</Link>です。アプリが「これやってください」と礼儀正しく依頼する仕組みになっています。カーネルモードでは、次のような追加の特権が使えます。</p>
      <ul>
        <li><strong>メモリ保護</strong> ― ユーザープログラムは自分のメモリ領域のみアクセス可能。カーネルは全メモリにアクセスでき、他プロセスを管理できる</li>
        <li><strong>I/Oポートアクセス</strong> ― キーボード入力の読み取りや画面表示はすべてI/Oポート経由で、カーネルモードのみが利用可能。アプリが画面に何か表示したい場合も、カーネル経由で依頼する必要がある</li>
      </ul>
      <Analogy label="💡 たとえるなら">
        ユーザーモードとカーネルモードの関係は、ホテルの「一般客エリア」と「スタッフ専用エリア」の関係です。宿泊客(アプリ)は厨房や倉庫に勝手に入れませんが、フロントに依頼(システムコール)すれば、スタッフ(カーネル)が代わりに対応してくれます。
      </Analogy>

      <Aside label="偉大な力には偉大な責任が伴う">
        カーネルにバグやセキュリティホールがあると、システム全体が危険にさらされます。カーネルが乗っ取られれば、すべてが乗っ取られる ― だからこそカーネル開発者は極めて慎重にプログラムを書く必要があります。
      </Aside>

      <Heading num="まとめ">カーネルは「特権を持つ中核」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>OSの集合体の中核</h4><p>OSは多数のプログラムの集合体で、その中で常時動き続ける最重要のコアがカーネルです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>設計思想でトレードオフが変わる</h4><p>全機能を詰め込むモノリシックは高速、分離するマイクロは安全 ― どちらを重視するかで設計が分かれます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>特権はモードで守られる</h4><p>ハードウェアを直接触れるカーネルモードには、システムコールという正式な窓口からしか入れません。</p></Card>
      </CardGrid>
      <p>ここではカーネルが「何を管理し、どう設計され、どんな特権を持つか」という骨格を見ました。次は、その管理対象の筆頭である<Link href="/os/process">プロセスとスレッド</Link>を掘り下げ、その後アプリとカーネルの架け橋である<Link href="/os/syscall">システムコール</Link>の内部動作へと進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/process" tag="OS">プロセスとスレッド</RelatedLink>
                    <RelatedLink href="/os/syscall" tag="OS">システムコール</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
