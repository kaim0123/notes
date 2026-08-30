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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "プログラミング言語の歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>プログラミング言語の歴史 ― なぜ、その時代にその言語が生まれたのか</h1>
        <Lead>
          「プログラミング言語の仕組み」ではパラダイム・実行方式・型システムという静的な分類軸を見ました。ここでは時間軸を通します。それぞれの言語は思いつきで生まれたのではなく、当時の戦争・企業競争・ハードウェアの制約・インターネットの普及といった具体的な必要から生まれています。「なぜこの時代にこの言語が必要とされたか」を追うと、今使っている言語の設計判断もぐっと理解しやすくなります。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1837">バベッジ<br />解析機関を構想</TimelineItem>
        <TimelineItem era="1954">FORTRAN<br />科学技術計算向け</TimelineItem>
        <TimelineItem era="1958">LISP<br />記号処理の元祖</TimelineItem>
        <TimelineItem era="1959">COBOL<br />ビジネス処理向け</TimelineItem>
        <TimelineItem era="1960">ALGOL 60<br />構造化の源流</TimelineItem>
        <TimelineItem era="1964">BASIC<br />教育向け言語</TimelineItem>
        <TimelineItem era="1972">C言語<br />UNIXと共に普及</TimelineItem>
        <TimelineItem era="1980">Smalltalk-80<br />OOPを体系化</TimelineItem>
        <TimelineItem era="1983">C++<br />CにOOPを追加</TimelineItem>
        <TimelineItem era="1991">Python<br />読みやすさ重視</TimelineItem>
        <TimelineItem era="1995">Java/JS/PHP<br />Web時代の当たり年</TimelineItem>
        <TimelineItem era="2009">Go<br />クラウド時代のC後継</TimelineItem>
        <TimelineItem era="2015">Rust 1.0<br />安全性と速度の両立</TimelineItem>
        <TimelineItem era="2023">Mojo<br />AI開発向け新言語</TimelineItem>
      </Timeline>

      <Heading num="01">言語より先に「プログラマ」が生まれた</Heading>
      <p>プログラミング言語の歴史は、皮肉なことに<strong>プログラミング言語が存在しない時代</strong>から始まります。1642年、フランスの<strong>ブレーズ・パスカル</strong>は歯車式の計算機「パスカリーヌ」を発明しました。1837年にはイギリスの<strong>チャールズ・バベッジ</strong>が、穿孔カードで演算手順を制御する「解析機関」を構想します。</p>
      <p>数学者<strong>エイダ・ラブレス</strong>は1840年代、この解析機関のために穿孔カードで演算手順を記述し、<Term>世界初のプログラマ</Term>と呼ばれています。しかし当時、解析機関は工作精度の限界で実機が完成せず、そもそも「プログラミング言語」という概念自体もまだ存在していませんでした。機械も言語もない場所に、手順を書く人間だけが先に生まれた ― コンピュータの歴史の出発点は、そんなねじれた状況でした(詳しくは「<Term>コンピュータの歴史</Term>」を参照)。</p>

      <Heading num="02">「プログラムを書き換えられる」ことが言語を要請した</Heading>
      <p>1946年に登場した世界初の電子計算機ENIACは、プログラムを配線そのものに組み込んでいたため、計算内容を変えるには配線を丸ごと差し替える必要がありました。1945年、<strong>ジョン・フォン・ノイマン</strong>が提唱した<Term>プログラム内蔵方式</Term>によって、プログラムはメモリの中に置かれる「書き換え可能なデータ」になります。</p>
      <p>この分離こそが決定的でした。配線をいじらずにメモリの中身だけを差し替えられるなら、その中身を人間にとって書きやすい記法で表現し、機械語に変換する仕組みを作ればいい ― これが「プログラミング言語」という発想そのものの前提条件になったのです。</p>

      <Analogy label="💡 たとえるなら">
        配線でプログラムするENIACは「配管を組み替えないと違う料理が作れないキッチン」でした。プログラム内蔵方式は、配管はそのままに「レシピ(メモリの中身)だけ差し替えれば違う料理ができる」キッチンへの転換です。レシピを書くための共通の書き方 ― それが言語です。
      </Analogy>

      <Heading num="03">高水準言語の夜明け ― 第1〜3世代という区分</Heading>
      <p>言語の進化はよく「世代」で語られます。<Term>第1世代</Term>は0と1を直接並べる機械語、<Term>第2世代</Term>はニーモニック(命令の短縮名)を使うアセンブリ言語で、どちらもCPUの種類ごとに書き方が変わります。1950年代に登場した<Term>第3世代言語</Term>は、CPUの違いをコンパイラが吸収し、人間が読み書きしやすい構文でロジックを書けるようにしました。</p>

      <table>
        <tbody>
          <tr><th>言語</th><th>年代</th><th>開発背景</th><th>特徴</th></tr>
          <tr><td className="hl">Plankalkül</td><td>1940年代</td><td>ドイツ・コンラート・ツーゼが単独で設計</td><td>最初期の高水準言語設計とされるが、戦時の情報統制で1972年まで公表されず普及しなかった</td></tr>
          <tr><td className="hl">FORTRAN</td><td>1954〜57年</td><td>IBM・ジョン・バッカスのチーム</td><td>科学技術計算向け。商業的に成功した最初の高水準言語で、現在も現役</td></tr>
          <tr><td className="hl">LISP</td><td>1958年</td><td>MIT・ジョン・マッカーシー</td><td>数式(S式)による記号処理。流行に左右されず、関数型言語の源流として今も影響を残す</td></tr>
          <tr><td className="hl">COBOL</td><td>1959年</td><td>CODASYL委員会(グレース・ホッパーの設計を土台に策定)</td><td>英語に近い自然な構文。経営層にも読めるビジネス処理向け言語として設計</td></tr>
          <tr><td className="hl">ALGOL 60</td><td>1960年</td><td>欧州・米国の研究者による国際委員会</td><td><code>begin</code>〜<code>end</code>、<code>if</code>・<code>for</code>によるブロック構造を確立。以後ほぼ全ての言語の構文に影響</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        FORTRANは当時「機械語より遅い」と懐疑的に見られていましたが、バッカスのチームが作った最適化コンパイラが手書きのアセンブリに匹敵する速度を出し、「高水準言語でも実用速度が出せる」ことを証明したことが普及の決め手になりました。
      </Aside>

      <Heading num="04">教育・統合・シミュレーション ― 1960年代の三者三様</Heading>
      <p>1960年代に入ると、言語は特定の目的に合わせてさらに枝分かれします。ダートマス大学の<strong>ケメニー</strong>と<strong>カーツ</strong>は、専門家でない学生でも扱える教育用言語として1964年に<strong>BASIC</strong>を開発しました。タイムシェアリングシステム上で対話的に動かせる手軽さが特徴です。</p>
      <p>IBMはFORTRANとCOBOLの役割を1つの言語で担わせようと<strong>PL/I</strong>を設計しますが、機能を詰め込みすぎて習得が難しく、両者を置き換えるには至りませんでした。一方ノルウェーでは、ALGOLを土台にシミュレーション専用言語<strong>Simula</strong>が開発され、「データと手続きをひとまとめにする」という<Term>クラス</Term>の概念を初めて導入します。これが後のオブジェクト指向の直接の起点になりました。</p>

      <Heading num="05">UNIXとC言語 ― OSと言語が結びついて広がった</Heading>
      <p>1969年、ベル研究所の<strong>ケン・トンプソン</strong>は、英国生まれの言語BCPLを参考に簡易言語<Term>B言語</Term>を作り、初期のUNIXの開発に使いました。同僚の<strong>デニス・リッチー</strong>がこれに型やデータ構造を加えて改良したものが、1972年頃に完成した<Term>C言語</Term>です。</p>
      <p>C言語が広まった最大の理由は、言語そのものの設計だけではありません。1973年、UNIX自体がCで書き直され、UNIXが大学・研究機関・企業に広がるのと歩調を合わせてCも一緒に広がったのです。<strong>OSと言語がセットで普及する</strong>という構図は、後のJava・Android・Objective-C・iOSにも繰り返し現れます。</p>

      <Analogy label="💡 たとえるなら">
        言語の普及は単体の人気投票では決まりません。C言語は「UNIXという人気の乗り物」に乗って世界中に運ばれました。どんなに優れた言語でも、運んでくれるOS・企業・コミュニティがなければ、一部の研究室の中だけで終わってしまうこともあります。
      </Analogy>

      <Heading num="06">パーソナルコンピュータ時代とオブジェクト指向の実用化(1970〜80年代)</Heading>
      <p>ゼロックスのパロアルト研究所(PARC)で<strong>アラン・ケイ</strong>らが開発した<strong>Smalltalk-80</strong>は、Simulaのクラスの概念を極限まで純化し、「あらゆるものがオブジェクトであり、メッセージを送り合う」というオブジェクト指向を初めて体系化しました。GUIとマウス操作もこの研究所発です。</p>
      <p>ただしSmalltalkは既存資産との互換性がなく普及は限定的でした。実用面で広がったのは、Cとの互換性を保ちながらクラスを追加した2つのアプローチです。</p>

      <table>
        <tbody>
          <tr><th></th><th>C++(1983年〜)</th><th>Objective-C(1983年〜)</th></tr>
          <tr><td className="hl">開発者</td><td>ビャーネ・ストロヴストルップ(ベル研究所)</td><td>ブラッド・コックス</td></tr>
          <tr><td className="hl">アプローチ</td><td>C言語自体を拡張してクラス構文を追加</td><td>Cを変更せず、Smalltalk流のメッセージ送信をライブラリとして統合</td></tr>
          <tr><td className="hl">後の採用先</td><td>ゲーム・組み込み・高性能サーバー</td><td>NeXT、後のApple(macOS・iOS)</td></tr>
        </tbody>
      </table>

      <p>同じ頃、米国防総省が信頼性重視の統一言語として標準化を進めたのが<strong>Ada</strong>です。世界初のプログラマ、エイダ・ラブレスにちなんで命名されました。</p>

      <Heading num="07">インターネットとWebが生んだスクリプト言語ラッシュ(1990年代)</Heading>
      <p>Webの商用利用が始まると、コンパイルの手間なく「書いてすぐ動かす」スクリプト言語が一気に求められるようになります。1995年前後は特に多くの言語が生まれ、後世まで残る「当たり年」になりました。</p>

      <table>
        <tbody>
          <tr><th>言語</th><th>開発者</th><th>生まれた文脈</th></tr>
          <tr><td className="hl">Python(1991年)</td><td>グイド・ヴァンロッサム</td><td>「読みやすさ」を最優先に設計。教育・スクリプト用途から後にAI開発の標準へ</td></tr>
          <tr><td className="hl">Java(1995年)</td><td>サン・マイクロシステムズ、ジェームズ・ゴスリン</td><td>JVM上でバイトコードを実行し「Write Once, Run Anywhere」を実現。企業システム・ブラウザアプレット向け</td></tr>
          <tr><td className="hl">JavaScript(1995年)</td><td>ブレンダン・アイク(Netscape)</td><td>わずか10日で設計されたブラウザ用スクリプト言語。後にECMAScriptとして標準化</td></tr>
          <tr><td className="hl">PHP(1995年)</td><td>ラスマス・ラードフ</td><td>個人サイト構築用ツールから出発し、LAMP環境の普及とともにWebサーバサイドの主流に</td></tr>
          <tr><td className="hl">Ruby(1995年)</td><td>まつもとゆきひろ(日本)</td><td>「プログラマの幸福」を重視した設計思想。2004年のRuby on Railsで世界的に広まる</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        JavaScriptの普及の裏には<Term>第1次ブラウザ戦争</Term>がありました。Netscape Navigatorに対し、MicrosoftはWindows 95にInternet Explorerを同梱して対抗し、独自のJScriptを展開します。標準化団体ECMAによる<Term>ECMAScript</Term>策定はこの分裂を収拾するための取り組みでした。
      </Aside>

      <Heading num="08">Y2K後のフレームワーク戦国時代(2000年代)</Heading>
      <p>2000年、西暦の下2桁だけを扱うシステムが誤動作するのではと懸念された<Term>Y2K問題</Term>は、事前の大規模な修正作業によって深刻な被害を回避しました。同じ2000年、MicrosoftはJavaに対抗する.NET基盤の主力言語として<strong>C#</strong>(開発者はTypeScriptと同じくアンダース・ヘルスバーグ)を発表します。</p>
      <p>2004年の<strong>Ruby on Rails</strong>は「設定より規約」を掲げてWebアプリ開発を劇的に高速化し、スタートアップに広く採用されました。同様のアプローチを取るPythonの<strong>Django</strong>もこれに続きます。2009年には<strong>Node.js</strong>がJavaScriptエンジンV8をブラウザの外で動かし、フロントエンドとサーバーサイドを同じ言語で書ける道を開きました。</p>
      <p>同じ2009年、GoogleのロブパイクらはC++の複雑さへの反省から<strong>Go</strong>を設計します。並行処理を言語レベルで扱いやすくし、大規模なサーバーソフトウェアをシンプルに書けることを目指しました。並行して2007年の<strong>iPhone</strong>(Objective-C)、2008年の<strong>Android</strong>(Java)が登場し、モバイル向けの言語需要が新たに生まれます。</p>

      <Heading num="09">型安全への回帰 ― クラウド・モバイル時代(2010年代)</Heading>
      <p>2010年代は、動的型付けで広まった言語に後から型を足す「段階的型付け」の流れが目立ちます。JavaScriptに静的型を追加した<strong>TypeScript</strong>(2012年、ヘルスバーグ)はその代表で、大規模なフロントエンド開発の保守性を高めました。</p>

      <table>
        <tbody>
          <tr><th>言語</th><th>登場</th><th>置き換えた/補った対象</th><th>狙い</th></tr>
          <tr><td className="hl">TypeScript</td><td>2012年</td><td>大規模化するJavaScript</td><td>開発時の型チェックでバグを早期発見</td></tr>
          <tr><td className="hl">Swift</td><td>2014年</td><td>Objective-C</td><td>Apple製、モダンで安全な構文</td></tr>
          <tr><td className="hl">Kotlin</td><td>2011年(2017年Android公式に)</td><td>Javaの後継候補</td><td>JVM・Java資産と完全互換を保ちつつ簡潔に</td></tr>
          <tr><td className="hl">Rust</td><td>2015年(1.0)</td><td>C/C++</td><td>ガベージコレクションなしでメモリ安全性を保証</td></tr>
        </tbody>
      </table>

      <p>AWS・Azure・Google Cloudによる<Term>クラウドコンピューティング</Term>とDockerの普及で、個人が物理サーバーを用意する必要は減り、マイクロサービス化の潮流の中でGoやSpring Boot(Java)が好まれるようになります。</p>

      <Heading num="10">AI時代の言語選択(2020年代)</Heading>
      <p>機械学習・深層学習ライブラリ(NumPy、PyTorchなど)の蓄積によって、<strong>Python</strong>は実行速度の遅さという弱点を抱えながらも、AI開発における事実上の標準言語になりました。ここで効いているのは言語仕様そのものの優劣より、周辺の<Term>エコシステム</Term>の厚みです。</p>
      <p>Swiftの設計者でもある<strong>クリス・ラトナー</strong>は2023年、AI開発向けに高速な実行性能とPython互換の書き味を両立させる新言語<strong>Mojo</strong>を発表しました。加えて2022年以降のChatGPTをはじめとする生成AIの実用化は、コードを書く行為そのものにも影響を与えつつありますが、2026年現在、それに合わせた「AIネイティブな言語」が業界標準になったとまでは言えません。</p>

      <Heading num="まとめ">歴史から見える3つの流れ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>言語は「時代の必要」から生まれる</h4>
          <p>教育向けの読みやすさ(BASIC・Python)、軍事の信頼性(Ada)、Webの手軽さ(Perl・PHP)など、それぞれの言語は具体的な課題への回答として設計されています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>生き残るのは技術力だけではない</h4>
          <p>C言語とUNIX、JavaScriptとブラウザ、PythonとAIライブラリのように、OSやエコシステムという「乗り物」に乗れた言語が広く長く使われる傾向があります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>低水準から高水準へ、そしてまた型安全へ</h4>
          <p>機械語→アセンブリ→高水準言語という抽象化の流れの先で、動的型付けの手軽さが広まった後、TypeScript・Rustのように再び型の厳密さへ回帰する動きも起きています。</p>
        </Card>
      </CardGrid>
      <p>言語そのものは、目的を達成するための道具にすぎません。ここで見てきた「なぜ生まれたか」という背景を踏まえたうえで、次は静的な分類軸である「<Term>プログラミング言語の仕組み</Term>」と合わせて読むと、今使っている言語の設計判断がより立体的に見えてくるはずです。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み ― パラダイム・実行方式・型システム</RelatedLink>
                    <RelatedLink href="/computer/history" tag="コンピュータ">コンピュータの歴史 ― 歯車の夢から、指先の中の宇宙へ</RelatedLink>
                    <RelatedLink href="/network/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
