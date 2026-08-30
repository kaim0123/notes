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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "UNIXの歴史と哲学",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>UNIXの歴史と哲学 ― すべての源流</h1>
        <Lead>
          あなたが今日触れたスマートフォン、開いたWebサイト、使ったクラウドサービス ―
          その裏側では、ほぼ確実に<strong>UNIXの子孫</strong>が動いています。Linux・macOS・Android・iOSはすべて、1969年にベル研究所の片隅で始まった小さなプロジェクトの系譜に連なります。ここでは、50年以上にわたって現代コンピュータ社会の土台であり続ける<Term>UNIX</Term>の物語をたどります。
        </Lead>
      </Hero>

      <p>「OSの仕組み」では、OSが1台のコンピュータの中でハードウェアを束ねる調整役であることを見ました。ここからは視点を歴史に移し、その現代OSたちが<strong>どこから来たのか</strong>をたどります。結論を先に言えば ― ゲームを動かしたいという個人的な動機から生まれたUNIXが、あらゆるOSの共通祖先になりました。</p>

      <Heading num="01">OSが生まれるまで ― UNIX前夜</Heading>
      <p>UNIXの前に、そもそもOSという概念がどう育ったかを押さえておきます。最初期のコンピュータには<Term>OS</Term>という概念自体がなく、利用者がハードウェアを直接操作するルーチンを書いていました。</p>
      <table>
        <tbody>
          <tr><th>時代</th><th>出来事</th><th>意義</th></tr>
          <tr><td className="hl">1940〜50年代</td><td>巨大な専用マシン。ハードウェアを直接操作するルーチンを使う</td><td>1台1用途。OSはまだ存在しない</td></tr>
          <tr><td className="hl">1950年代後半〜</td><td><Term>バッチ処理</Term> ― ジョブカードに指示を書き、まとめて順番に処理</td><td>OSの前身。効率化の第一歩</td></tr>
          <tr><td className="hl">1960年代</td><td><Term>タイムシェアリング</Term> ― リソースを短い時間で切り替え、複数ユーザーが同時利用</td><td>OS進化の一大革命。待ち時間の大幅削減</td></tr>
          <tr><td className="hl">1969年〜</td><td><strong>UNIX</strong>誕生。シンプル・モジュラーな設計</td><td>後のLinux・BSD・macOSなど現代OSの基盤</td></tr>
        </tbody>
      </table>

      <Heading num="02">なぜ「知らないうちに使っている」のか</Heading>
      <p>UNIXは、ハードウェアとアプリケーションの間を橋渡しする<strong>最も基本的なソフトウェア層</strong>の設計思想を確立したOSです。私たちが日常的に使う技術の多くが、間接的にUNIXの技術と思想の恩恵を受けています。</p>
      <CardGrid>
        <Card><CardNumber>Android</CardNumber><h4>Linux(UNIX系)がベース</h4><p>世界中のスマホの多くがLinuxカーネルの上で動いている</p></Card>
        <Card><CardNumber>iOS</CardNumber><h4>macOSの技術を継承</h4><p>モバイル向けに最適化されたUNIX系OS</p></Card>
        <Card><CardNumber>Cloud</CardNumber><h4>サーバーの中心はLinux</h4><p>Web・メール・クラウド基盤の多くがUNIX系OS上で稼働</p></Card>
      </CardGrid>
      <p>つまり、現代の主要OS ― <strong>Linux・macOS・Android・iOS</strong> ― は、いずれもUNIX系の系譜に属しているのです。</p>

      <Heading num="03">誕生 ― ゲームから始まった革命(1969〜1974)</Heading>
      <p>物語の舞台は、AT&amp;Tの研究部門である<Term>ベル研究所</Term>。当時は標準的なOSが存在せず、マシンごとにバラバラのソフトウェアが動く世界でした。</p>
      <table>
        <tbody>
          <tr><th>出来事</th><th>内容</th></tr>
          <tr><td className="hl">Multics</td><td>複数ユーザーの同時利用を目指した大型OS。しかし複雑すぎて開発が難航し、ベル研究所は撤退した</td></tr>
          <tr><td className="hl">きっかけ</td><td>ケン・トンプソンが暇つぶしで <strong>Space Travel(宇宙戦)</strong> というゲームを作ろうとするが、動かすOSがなかった</td></tr>
          <tr><td className="hl">PDP-7</td><td>DEC社のミニコンピュータ。当時としては小型・安価で、個人でも使えた</td></tr>
          <tr><td className="hl">1969年8月</td><td>PDP-7上で最初のUNIXが動作 ― 歴史的瞬間</td></tr>
          <tr><td className="hl">名前の由来</td><td>Multicsの「マルチ(複数)」に対し「ユニ(単一)」をもじったダジャレ。<strong>UNICS</strong> → 発音しやすく <strong>UNIX</strong> に改名</td></tr>
          <tr><td className="hl">1970年</td><td>デニス・リッチーが参加。のちにC言語を開発しUNIX開発を加速</td></tr>
          <tr><td className="hl">1974年</td><td>論文 <em>The UNIX Time-Sharing System</em> を Communications of the ACM に掲載。学術界で大きな反響</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        巨大で豪華すぎて誰も住みこなせなかった宮殿(Multics)を横目に、トンプソンは「自分のゲームが動けばいい」という動機で、小さくて住みやすい小屋(UNIX)を建てました。皮肉なことに、その小屋こそが後に世界中に増築され、現代コンピュータ社会の土台になっていきます。
      </Analogy>

      <Heading num="04">初期UNIXの革新的な特徴</Heading>
      <p>初期のUNIXには、現在のシステムにも受け継がれる3つの画期的なアイデアが盛り込まれていました。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>階層ファイルシステム</h4><p>ファイルを<Term>ディレクトリ</Term>(フォルダ)で整理。それまではファイルが平らに並ぶだけで整理が困難だった</p></Card>
        <Card><CardNumber>2</CardNumber><h4>パイプ(<code>|</code>)</h4><p>あるプログラムの出力を別プログラムの入力へ渡す。<code>grep</code>で検索→<code>sort</code>で並べ替えを1発で連携できる</p></Card>
        <Card><CardNumber>3</CardNumber><h4>すべてはテキスト</h4><p>設定ファイルもログもテキスト。人間が読め、編集しやすく、プログラムでも処理しやすい</p></Card>
      </CardGrid>
      <p>とくに<Term>パイプ</Term>は「小さなプログラムを組み合わせて大きな仕事をする」というUNIX哲学の核心であり、シェルの発展とも深く結びついています。</p>

      <Heading num="05">C言語と移植性 ― 大成功の土台(1971〜1975)</Heading>
      <p>UNIXが単なる社内ツールから世界を変える技術へと飛躍したのは、<Term>移植性(ポータビリティ)</Term>を手に入れたからでした。</p>
      <Timeline>
        <TimelineItem era="1971">PDP-11へ移植<br />本格普及の始まり</TimelineItem>
        <TimelineItem era="1972">リッチーがC言語を開発</TimelineItem>
        <TimelineItem era="1973">UNIXをCで書き直す<br />移植性の獲得</TimelineItem>
        <TimelineItem era="1975">大学への普及<br />ソース付き格安提供</TimelineItem>
      </Timeline>
      <TimelineLabel>特定CPU専用のアセンブリから、コンパイラさえあればどこでも動くC言語へ ― この書き換えがUNIXの運命を決めました。</TimelineLabel>
      <p>それまでUNIXは<Term>アセンブリ言語</Term>で書かれ、PDP-11でしか動きませんでした。1973年、動いているUNIXを<strong>C言語で書き直す</strong>という大胆な決断により、コンパイラがあればどのコンピュータでも動くようになります。さらにAT&amp;Tは独占禁止法によりコンピュータ事業が制限されていたため、大学に<strong>ソースコード付きで格安提供</strong>。学生や研究者が自由に改変でき、技術革新が加速しました。</p>

      <Heading num="06">BSDとインターネット時代の幕開け</Heading>
      <p>カリフォルニア大学バークレー校で生まれたUNIXの改良版が<Term>BSD</Term>(Berkeley Software Distribution)です。BSDは現代のあらゆるOSに残る重要機能を追加しました。</p>
      <table>
        <tbody>
          <tr><th>追加された機能</th><th>意義</th></tr>
          <tr><td className="hl">仮想メモリ</td><td>実メモリより多くあるかのように見せ、大きなプログラムも実行可能に。現代の全OSで使われる</td></tr>
          <tr><td className="hl">TCP/IP(1980年代初期)</td><td>BSDに実装され、<strong>インターネット時代の始まり</strong>に。多くのネット基盤がUNIX系OS上で動くように</td></tr>
          <tr><td className="hl">viエディター等</td><td>ネットワーク機能とあわせ、開発者の道具が充実</td></tr>
        </tbody>
      </table>
      <p>一方、1983年にはAT&amp;Tが<Term>System V</Term>をリリースし、<strong>商用版UNIX</strong>が始まります。独占禁止法の緩和により、AT&amp;Tが本格参入したのです。</p>

      <Heading num="07">UNIX戦争とPOSIX ― 標準化への道</Heading>
      <p>System VとBSDを軸に、SunOS・AIX(IBM)・HP-UX(HP)など各社が独自拡張を加えた結果、<strong>同じUNIXなのに互換性がない</strong>という混乱が生まれました。これが<Term>UNIX戦争</Term>です。プログラムの移植が困難になり、標準化が急務となります。</p>
      <p>1980年代後半、IEEE(電気電子技術協会)が<Term>POSIX</Term>(Portable Operating System Interface)標準を制定。完全統一ではないものの、基本的な互換性を確保し、移植を容易にしました。UNIX・BSD・Linuxがどう枝分かれし、POSIXがどう橋渡しするかは、次ページ「UNIX・BSD・Linuxの違い」で詳しく見ていきます。</p>

      <Heading num="08">Linuxとオープンソース、そして21世紀</Heading>
      <p>PCの高性能化により、高価なワークステーション向けだったUNIXを一般PCでも動かしたいという需要が生まれます。1991年、フィンランドの学生リーナス・トーバルズが<Term>Linux</Term>を開発。世界中の開発者がインターネット経由で参加する革命的な開発モデルが生まれました。この流れはGNUプロジェクトの理念と結びついて花開きます(詳細は関連ページへ)。</p>
      <table>
        <tbody>
          <tr><th>時期</th><th>出来事</th></tr>
          <tr><td className="hl">2001年</td><td>Appleが <strong>Mac OS X</strong> を発表。NeXTSTEP(UNIX系)がベースで、GUIの下は<strong>POSIX認証を取得した正式なUNIX</strong></td></tr>
          <tr><td className="hl">クラウド時代</td><td>Amazon・Google・Facebookなど大手のサーバーはLinuxが中心。安定性と拡張性が大量サーバー管理に最適</td></tr>
          <tr><td className="hl">スマートフォン</td><td>Android(Linuxベース)、iOS(macOS技術ベース) ― 世界中の人が毎日UNIXに触れている</td></tr>
          <tr><td className="hl">コンテナ</td><td>Docker・Kubernetesは、UNIXの<strong>プロセス管理</strong>を巧妙に活用した隔離技術</td></tr>
        </tbody>
      </table>

      <Heading num="09">UNIXの基本哲学</Heading>
      <p>UNIXが50年以上も生き続ける理由は、機能そのものより<strong>設計思想</strong>にあります。</p>
      <table>
        <tbody>
          <tr><th>原則</th><th>意味</th></tr>
          <tr><td className="hl">1つのことをうまくやる</td><td>小さな専門プログラムを組み合わせる。万能ツールより専門ツール</td></tr>
          <tr><td className="hl">すべてはファイル</td><td>キーボード・マウス・ネットワークもファイルとして扱う統一的インターフェイス</td></tr>
          <tr><td className="hl">沈黙は金</td><td>正常時は余計な出力を出さない。問題があるときだけ報告する</td></tr>
        </tbody>
      </table>
      <Aside label="現代への継承">
        「大きな仕事を小さな独立した部品に分ける」というこの思想は、大きなアプリを小さな独立サービスに分割する<Term>マイクロサービス</Term>の考え方にも通じています。60年近く前の哲学が、いまなお設計の基本として生きています。
      </Aside>

      <Heading num="10">UNIXの多面的な影響</Heading>
      <p>UNIXの遺産は、OSの枠を超えて広がっています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>セキュリティ</h4><p>root(管理者)・一般ユーザー・ゲストという<strong>権限管理</strong>が、現代セキュリティの基礎に</p></Card>
        <Card><CardNumber>2</CardNumber><h4>インターネット</h4><p>TCP/IP実装やDNSなど、基盤技術の多くがUNIX上で開発・テストされた</p></Card>
        <Card><CardNumber>3</CardNumber><h4>プログラミング言語</h4><p>C言語はもちろん、Perl・Python・RubyもUNIX環境で育ち、その思想を反映</p></Card>
        <Card><CardNumber>4</CardNumber><h4>教育</h4><p>ソース公開により、学生がOSの中身を見て学べる。システム教育の定番に</p></Card>
        <Card><CardNumber>5</CardNumber><h4>組み込み・AI</h4><p>ルーター・IoT・車載から、TensorFlow・PyTorchによる機械学習まで多くがLinuxベース</p></Card>
        <Card><CardNumber>6</CardNumber><h4>文化</h4><p><strong>ハッカー文化</strong>・オープンソース精神・「車輪の再発明をするな」という価値観</p></Card>
      </CardGrid>

      <Heading num="11">現代の主要なUNIX系OS</Heading>
      <table>
        <tbody>
          <tr><th>系統</th><th>代表例</th><th>特徴</th></tr>
          <tr><td className="hl">Linux系</td><td>Ubuntu・CentOS・Debian・Red Hat・SUSE</td><td>Linuxカーネルに各種ソフトを組み合わせたパッケージ(ディストリビューション)</td></tr>
          <tr><td className="hl">BSD系</td><td>FreeBSD・OpenBSD・NetBSD</td><td>高性能・セキュリティ・移植性など、それぞれ得意分野を持つ</td></tr>
          <tr><td className="hl">商用UNIX</td><td>IBM AIX・Oracle Solaris・HP-UX</td><td>金融・通信など、絶対に止まってはいけないミッションクリティカル用途で現役</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">1匹のペンギンより前の物語</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>個人の動機から世界の基盤へ</h4><p>ゲームを動かしたいという動機で生まれたUNIXが、あらゆる現代OSの共通祖先になりました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>移植性が飛躍を生んだ</h4><p>C言語で書き直したことで「どこでも動く」を実現し、大学・企業へと一気に広がりました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>思想こそが遺産</h4><p>「1つのことをうまくやる」「すべてはファイル」という哲学が、いまも設計の指針であり続けています。</p></Card>
      </CardGrid>
      <p>ここではUNIXという幹をたどりました。次はそこから枝分かれしたUNIX・BSD・Linuxの違いと、それらを橋渡しするPOSIX、そして「自由」を掲げたGNU、趣味から始まったLinuxの物語へと進んでいきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/posix" tag="OS">UNIX・BSD・Linuxの違い</RelatedLink>
                    <RelatedLink href="/os/gnu" tag="OS">GNUとフリーソフトウェア</RelatedLink>
                    <RelatedLink href="/os/linux" tag="OS">Linuxの歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
