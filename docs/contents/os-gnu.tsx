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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "GNUとフリーソフトウェア",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>GNUとフリーソフトウェア ― 「自由」を守る仕組み</h1>
        <Lead>
          私たちが「Linux」と呼んでいるシステムは、実はその大部分が<strong>GNU</strong>というプロジェクトのソフトウェアでできています。カーネルだけがLinuxで、コンパイラもシェルもユーティリティもGNU製 ―
          この不思議な関係の裏には、「フリー＝無料」ではなく「フリー＝自由」という、たった一つの理念をめぐる40年の物語がありました。
        </Lead>
      </Hero>

      <p><Link href="/os/linux">Linuxの歴史</Link>や<Link href="/os/unix">UNIXの歴史と哲学</Link>を追うと、必ず「GNU」という名前が顔を出します。このページでは、リチャード・ストールマン(RMS)が始めた<Term>GNUプロジェクト</Term>と、その自由を永続的に守ってきた<Term>コピーレフト(GPL)</Term>という発明を見ていきます。核心は一貫してこうです ― <strong>フリーとは、無料のことではなく、自由のことである</strong>。</p>

      <Heading num="01">GNUとは何か</Heading>
      <p>日常でよく目にする「GNU」という文字。読み方は<strong>グニュー</strong>(<code>G</code> + <code>new</code>)で、「ぐぬ」ではありません。正式名称は <strong>GNU&apos;s Not Unix</strong> ― 「GNUはUnixではない」という意味です。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">読み方</td><td>グニュー(<code>G</code> + <code>new</code>)。「ぐぬ」ではない</td></tr>
          <tr><td className="hl">正式名称</td><td>GNU&apos;s Not Unix ― 「GNUはUnixではない」</td></tr>
          <tr><td className="hl">再帰的頭字語</td><td>GNUの中にGNU&apos;s Not Unixが入り、さらにその中にGNUが……と無限に展開できるプログラマーのジョーク</td></tr>
          <tr><td className="hl">目的</td><td>Unixと互換性のある、完全にフリーなオペレーティングシステムを一から作る</td></tr>
        </tbody>
      </table>
      <p>名前そのものが「Unixと互換だが、Unixのコードは使わない独立した存在」という宣言になっています。この<Term>再帰的頭字語</Term>(自分自身を定義に含む頭字語)というジョークセンスも、GNUを取り巻くハッカー文化を象徴しています。</p>

      <Heading num="02">背景 ― ハッカー文化からプロプライエタリの時代へ</Heading>
      <p>GNUが生まれた理由を理解するには、それ以前の世界を知る必要があります。</p>
      <table>
        <tbody>
          <tr><th>時代</th><th>状況</th></tr>
          <tr><td className="hl">1970〜80年代前半</td><td>ソフトウェアは研究者同士で<strong>ソースコードを自由に共有・改良</strong>する文化が主流。MIT人工知能研究所のリチャード・ストールマンがその中心にいた</td></tr>
          <tr><td className="hl">ハッカー</td><td>本来は<strong>技術を探求する優秀なプログラマー</strong>のこと(悪意ある侵入者とは別物)</td></tr>
          <tr><td className="hl">1980年代</td><td>企業がソフトウェアを<strong>商品化</strong>。ソースコード非公開・改造禁止の<strong>プロプライエタリ(所有権)ソフトウェア</strong>の時代が到来</td></tr>
        </tbody>
      </table>
      <p>転機は身近な出来事でした。MITのプリンターが故障したとき、以前ならストールマンは自分でソフトを修正できました。しかしプロプライエタリ化によってソースコードが見えなくなり、直せなくなってしまったのです。<strong>「ユーザーがソフトを制御できなくなる」</strong> ― この危機感が、GNUプロジェクトの出発点になりました。</p>

      <Analogy label="💡 たとえるなら">
        自分の家の鍵が壊れても、設計図(ソースコード)が非公開なので自分では直せず、メーカーの許可がないと修理すらできない ― そんな状態が当たり前になろうとしていました。ストールマンは「使う人が中身を見て直せる自由」を取り戻そうとしたのです。
      </Analogy>

      <Heading num="03">GNUプロジェクトの始まりと「4つの自由」</Heading>
      <p><strong>1983年9月27日</strong>、ストールマンが歴史的な宣言を行い、GNUプロジェクトが始動しました。彼が定義した<Term>フリーソフトウェア</Term>とは、価格の話ではなく、ユーザーに与えられる4つの自由のことです。</p>

      <Aside label="Free as in freedom, not as in free beer.">
        「無料ビールのフリー」ではなく「自由のフリー」。英語の <em>free</em> が「無料」と「自由」の両方を意味することからくる、GNUの理念を一言で表したスローガンです。
      </Aside>

      <table>
        <tbody>
          <tr><th>番号</th><th>自由</th><th>内容</th></tr>
          <tr><td className="hl">第0</td><td>実行の自由</td><td>どんな目的でもプログラムを<strong>実行</strong>できる</td></tr>
          <tr><td className="hl">第1</td><td>研究・改造の自由</td><td>動作を<strong>研究・改造</strong>できる(ソースコードへのアクセスが前提)</td></tr>
          <tr><td className="hl">第2</td><td>再配布の自由</td><td><strong>コピーを再配布</strong>できる</td></tr>
          <tr><td className="hl">第3</td><td>改良版配布の自由</td><td><strong>改良版を配布</strong>できる</td></tr>
        </tbody>
      </table>
      <p>プログラマーが番号を0から数え始めるのは有名なジョークですが、ここでも自由は「第0」から始まります。そして<strong>1985年</strong>、これら4つの自由を制度として守るために <Term>FSF(Free Software Foundation / フリーソフトウェア財団)</Term> が設立されました。</p>

      <Heading num="04">GPL ― コピーレフトという発明</Heading>
      <p>理念を掲げるだけでは、フリーなソフトウェアは簡単に企業に取り込まれ、非公開の製品に化けてしまいます。それを防ぐために<strong>1989年</strong>に生まれたのが <Term>GNU GPL(General Public License)</Term> ― <strong>著作権法を逆手に取った</strong>ライセンスです。</p>
      <table>
        <tbody>
          <tr><th>概念</th><th>内容</th></tr>
          <tr><td className="hl">通常の著作権</td><td>自由を<strong>制限</strong>するために使われる</td></tr>
          <tr><td className="hl">GPL</td><td>著作権を使って、逆に自由を<strong>保護</strong>する</td></tr>
          <tr><td className="hl">コピーレフト</td><td>GPLソフトを改造・配布する場合、<strong>改造版も同じGPLで公開</strong>しなければならない。自由が<strong>感染(伝播)</strong>していく仕組み</td></tr>
          <tr><td className="hl">効果</td><td>フリーソフトウェアが<strong>プロプライエタリに取り込まれる</strong>のを防ぐ</td></tr>
        </tbody>
      </table>
      <p>著作権(コピーライト)をもじった<Term>コピーレフト</Term>という言葉が示すとおり、GPLは「権利で縛る」道具を「自由を広げる」道具へと反転させました。一度GPLで公開された自由は、改変を重ねても失われず、次の世代へと受け継がれていきます。</p>

      <Analogy label="💡 たとえるなら">
        「この料理のレシピは自由に使ってよいが、アレンジしたレシピも必ず同じように公開すること」という条件付きの公開です。誰かがこっそり秘伝化することを、ルールそのものが防いでいます。
      </Analogy>

      <Heading num="05">カーネル問題とGNU/Linuxの誕生</Heading>
      <p>ストールマンは<strong>1984年にMITを辞め</strong>、GNUの開発に専念します。OSを構成するツール群を、10年近くかけて一つずつ作り上げていきました。</p>
      <table>
        <tbody>
          <tr><th>ソフトウェア</th><th>内容</th></tr>
          <tr><td className="hl">Emacs(1984年頃)</td><td>テキストエディタ。大ヒットし<strong>40年以上現役</strong>。みんなで改良し続けられるフリーソフトの強みを体現</td></tr>
          <tr><td className="hl">GCC</td><td><strong>GNU Compiler Collection</strong>。プログラムを機械語に翻訳するコンパイラ。今も世界中で使用</td></tr>
          <tr><td className="hl">その他</td><td>シェル、各種ユーティリティなど、OSを構成するツール群</td></tr>
        </tbody>
      </table>
      <p>ところが最大の難関が残っていました ― OSの心臓部である<strong>カーネル</strong>です。GNUは <Term>Hurd</Term> という<strong>マイクロカーネル</strong>を採用しましたが、設計が野心的すぎて開発は停滞。<strong>1990年代</strong>に入ってもカーネルは完成せず、GNUプロジェクトは「失敗したのでは」とすら思われました。</p>
      <p>そこへ現れたのが、まったく別の場所で作られていたカーネルでした。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">1991年8月25日</td><td>フィンランドの大学生<strong>リーナス・トーバルズ</strong>(21歳)が「趣味でOSを作っている。興味ある人は?」とネットに投稿</td></tr>
          <tr><td className="hl">Linuxカーネル</td><td>最初から<strong>GPLライセンス</strong>を採用。ただしカーネル単体では何もできない</td></tr>
          <tr><td className="hl">組み合わせ</td><td>GNUが10年かけて作った<strong>コンパイラ・エディタ・シェル・ユーティリティ</strong>とLinuxカーネルを合体</td></tr>
          <tr><td className="hl">誕生</td><td><strong>1992年頃</strong>、<Term>GNU/Linuxシステム</Term>が完成</td></tr>
        </tbody>
      </table>
      <p>足りなかったカーネルをLinuxが埋め、揃っていたツール群をGNUが提供する ― 両者が噛み合って、初めて動くOSが完成したのです。正確には <strong>GNU/Linux</strong> と呼ぶべきですが、短く覚えやすい「Linux」の方が普及しました。実際のシステムの大部分はGNUのソフトウェアで構成され、カーネルだけがLinuxです。ストールマンは今も「GNU/Linux」と呼ぶよう訴え続けています。</p>

      <Heading num="06">広がる影響 ― フリーソフトウェア vs オープンソース</Heading>
      <p>GNU/Linuxはサーバー・ワークステーション・スーパーコンピューターへと急速に広がり、スマートフォンの<strong>Android</strong>にもLinuxカーネルとGNUツールの一部が使われています。Webサーバーの大半、ルーター、家電製品まで ― 気づかないだけで、GNUのソフトウェアは<strong>あらゆる場所</strong>で動いています。</p>
      <p>一方で、この運動には思想上の分岐が生まれました。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>フリーソフトウェア</th><th>オープンソース</th></tr>
          <tr><td className="hl">提唱</td><td>ストールマン、FSF</td><td><strong>1998年</strong>、エリック・レイモンドらが「オープンソース」という言葉を提唱</td></tr>
          <tr><td className="hl">重視点</td><td><strong>自由という理念</strong></td><td><strong>実用性・開発手法の優位性</strong></td></tr>
          <tr><td className="hl">姿勢</td><td>ストールマンは「フリーソフトウェア」という言葉にこだわり、理念を忘れないよう訴え続ける</td><td>ビジネスにも受け入れられやすい表現として普及</td></tr>
        </tbody>
      </table>
      <p>同じソフトウェアを指しても、「自由という価値」を語るのか「優れた開発手法」を語るのかで立場が分かれます。そしてこの<strong>「みんなで共有する資産(コモンズ)」</strong>という発想は、ソフトウェアの外へも広がりました ― みんなで知識を育てる<strong>Wikipedia</strong>や、GPLの影響を受けた<strong>Creative Commonsライセンス</strong>は、いずれもGNU的な思想の子孫です。</p>

      <Heading num="07">現代の課題と評価</Heading>
      <p>時代が変わると、守るべき「自由」の形も変わります。GNUの理念は、新しい脅威に合わせて更新され続けてきました。</p>
      <table>
        <tbody>
          <tr><th>課題</th><th>対応</th></tr>
          <tr><td className="hl">クラウドコンピューティング</td><td>サーバー側のソフトは配布されないためGPLの自由が適用されにくい → <strong>AGPL</strong>(ネットワーク経由のサービス提供時もソース公開を義務化)</td></tr>
          <tr><td className="hl">ティボ化(Tivoization)</td><td>ハードウェアで自由を制限する問題 → <strong>GPLv3</strong>(2007年)で対応</td></tr>
          <tr><td className="hl">Hurdカーネル</td><td>今も開発継続中。<strong>完全なGNU/Hurdシステム</strong>という夢は諦められていない</td></tr>
        </tbody>
      </table>
      <p>GNU Coreutils、GNU Bash、GCC、Emacs、GNOME、GNU Octave ― 数えきれないほどのGNUソフトウェアが、今も世界中で稼働しています。GNUには「理想主義すぎる」「実用性を無視している」といった批判もありますが、<strong>GNUプロジェクトがなければ、今のインターネットもスマホもまったく違う形になっていた</strong>可能性が高い ― それは多くの人が認めるところです。GNUは、デジタル時代における「自由」の定義そのものを変えました。</p>

      <Heading num="まとめ">「無料」ではなく「自由」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>フリー＝自由</h4><p>実行・研究改造・再配布・改良版配布という4つの自由がフリーソフトウェアの核心で、価格の話ではありません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>GPLが自由を永続化</h4><p>コピーレフトにより、改造版も同じ自由を受け継ぐことが義務づけられ、自由がプロプライエタリに飲み込まれるのを防ぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Linuxの正体はGNU/Linux</h4><p>10年分のGNUツールと、埋まらなかったカーネル穴を埋めたLinuxが合体して、初めて動くOSになりました。</p></Card>
      </CardGrid>
      <p>GNUの物語は、実は「カーネルが完成しなかった」ところで別のカーネル(Linux)と出会います。次は、その趣味のプロジェクトがどうやって世界を動かすまでになったのかを見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/linux" tag="OS">Linuxの歴史</RelatedLink>
                    <RelatedLink href="/os/unix" tag="OS">UNIXの歴史と哲学</RelatedLink>
                    <RelatedLink href="/os/posix" tag="OS">UNIX・BSD・Linuxの違い</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
