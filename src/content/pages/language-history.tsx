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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "プログラミング言語の歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>プログラミング言語の歴史 ― なぜ、その時代にその言語が生まれたのか</h1>
        <Lead>
          <Link href="/language/basics">言語の仕組み</Link>ではパラダイム・実行方式・型システムという静的な分類軸を見ました。ここでは時間軸を通します。それぞれの言語は思いつきで生まれたのではなく、当時の戦争・企業競争・ハードウェアの制約・インターネットの普及といった具体的な必要から生まれています。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1837">バベッジが解析機関を構想</TimelineItem>
        <TimelineItem era="1954">FORTRAN ― 科学技術計算向け</TimelineItem>
        <TimelineItem era="1958">LISP ― 記号処理の元祖</TimelineItem>
        <TimelineItem era="1959">COBOL ― ビジネス処理向け</TimelineItem>
        <TimelineItem era="1960">ALGOL 60 ― 構造化の源流</TimelineItem>
        <TimelineItem era="1964">BASIC ― 教育向け言語</TimelineItem>
        <TimelineItem era="1972">C言語 ― UNIXと共に普及</TimelineItem>
        <TimelineItem era="1980">Smalltalk-80 ― オブジェクト指向を体系化</TimelineItem>
        <TimelineItem era="1983">C++ / Objective-C ― CにOOPを足す2つの道</TimelineItem>
        <TimelineItem era="1991">Python ― 読みやすさ重視</TimelineItem>
        <TimelineItem era="1995">Java / JavaScript / PHP / Ruby ― Web時代の当たり年</TimelineItem>
        <TimelineItem era="2009">Go ― クラウド時代のC後継</TimelineItem>
        <TimelineItem era="2012">TypeScript ― 動的型付けへの型の追加</TimelineItem>
        <TimelineItem era="2015">Rust 1.0 ― 安全性と速度の両立</TimelineItem>
      </Timeline>
      <TimelineLabel>
        主要言語が登場した年の目安。置き換えられたのではなく積み重なっている点は、パラダイムの歴史と同じ。
      </TimelineLabel>

      <Heading num="01">言語より先に「プログラマ」が生まれた</Heading>
      <p>
        プログラミング言語の歴史は、皮肉なことに<Term>言語が存在しない時代</Term>から始まります。1837年、チャールズ・バベッジは穿孔カードで演算手順を制御する解析機関を構想しました。数学者エイダ・ラブレスは1840年代、この解析機関のために演算手順を記述し、<Term>世界初のプログラマ</Term>と呼ばれています。
      </p>
      <p>
        しかし当時、解析機関は工作精度の限界で実機が完成せず、「プログラミング言語」という概念自体もまだありませんでした。機械も言語もない場所に、手順を書く人間だけが先に生まれた ―
        出発点はそんなねじれた状況でした(<Link href="/computer/history">コンピュータの歴史</Link>)。
      </p>

      <Heading num="02">「書き換えられる」ことが言語を要請した</Heading>
      <p>
        1946年に登場した世界初の電子計算機ENIACは、プログラムを配線に組み込んでいたため、計算内容を変えるには配線を差し替える必要がありました。1945年にフォン・ノイマンが提唱した<Term>プログラム内蔵方式</Term>によって、プログラムはメモリの中に置かれる「書き換え可能なデータ」になります。
      </p>
      <p>
        この分離が決定的でした。配線をいじらずにメモリの中身だけを差し替えられるなら、その中身を人間にとって書きやすい記法で表現し、機械語に変換する仕組みを作ればいい ―
        これが「プログラミング言語」という発想の前提条件になりました。
      </p>

      <Analogy label="💡 たとえるなら">
        配線でプログラムするENIACは「配管を組み替えないと違う料理が作れないキッチン」でした。プログラム内蔵方式は、配管はそのままにレシピ(メモリの中身)だけ差し替えれば違う料理ができるキッチンへの転換です。レシピを書くための共通の書き方 ―
        それが言語です。
      </Analogy>

      <Heading num="03">高水準言語の夜明け ― 第1〜3世代</Heading>
      <p>
        <Term>第1世代</Term>は0と1を直接並べる機械語、<Term>第2世代</Term>は命令の短縮名を使うアセンブリ言語で、どちらもCPUの種類ごとに書き方が変わります。1950年代の<Term>第3世代言語</Term>は、CPUの違いをコンパイラが吸収し、人間が読み書きしやすい構文でロジックを書けるようにしました。
      </p>

      <table>
        <thead>
          <tr>
            <th>言語</th>
            <th>年代</th>
            <th>開発背景</th>
            <th>特徴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Plankalkül</td>
            <td>1940年代</td>
            <td>ドイツ・コンラート・ツーゼが単独で設計</td>
            <td>最初期の高水準言語設計。戦時の情報統制で1972年まで公表されず普及しなかった</td>
          </tr>
          <tr>
            <td className="hl">FORTRAN</td>
            <td>1954〜57年</td>
            <td>IBM・ジョン・バッカスのチーム</td>
            <td>科学技術計算向け。商業的に成功した最初の高水準言語で、現在も現役</td>
          </tr>
          <tr>
            <td className="hl">LISP</td>
            <td>1958年</td>
            <td>MIT・ジョン・マッカーシー</td>
            <td>S式による記号処理。関数型言語の源流として今も影響を残す</td>
          </tr>
          <tr>
            <td className="hl">COBOL</td>
            <td>1959年</td>
            <td>CODASYL委員会(グレース・ホッパーの設計を土台に)</td>
            <td>英語に近い構文。経営層にも読めるビジネス処理向け言語として設計</td>
          </tr>
          <tr>
            <td className="hl">ALGOL 60</td>
            <td>1960年</td>
            <td>欧州・米国の研究者による国際委員会</td>
            <td>
              <code>begin</code>〜<code>end</code>のブロック構造を確立。以後ほぼ全ての言語の構文に影響
            </td>
          </tr>
        </tbody>
      </table>

      <Aside label="高水準言語への懐疑">
        FORTRANは当時「機械語より遅い」と懐疑的に見られていました。バッカスのチームが作った最適化コンパイラが手書きのアセンブリに匹敵する速度を出し、高水準言語でも実用速度が出せることを証明したのが普及の決め手です。<Link href="/language/compile">コンパイラの最適化</Link>が言語の歴史を動かした最初の場面でした。
      </Aside>

      <Heading num="04">教育・統合・シミュレーション ― 1960年代</Heading>
      <p>
        1960年代に入ると、言語は目的に合わせて枝分かれします。ダートマス大学のケメニーとカーツは、専門家でない学生でも扱える教育用言語として1964年にBASICを開発しました。IBMはFORTRANとCOBOLの役割を1つで担わせようとPL/Iを設計しますが、機能を詰め込みすぎて習得が難しく、両者を置き換えるには至りませんでした。
      </p>
      <p>
        一方ノルウェーでは、ALGOLを土台にシミュレーション専用言語Simulaが開発され、「データと手続きをひとまとめにする」という<Term>クラス</Term>の概念を初めて導入します。これが後の<Link href="/design/paradigm-oop">オブジェクト指向</Link>の直接の起点になりました。
      </p>

      <Heading num="05">UNIXとC言語 ― OSと言語が結びついて広がった</Heading>
      <p>
        1969年、ベル研究所のケン・トンプソンはBCPLを参考に簡易言語B言語を作り、初期のUNIXの開発に使いました。同僚のデニス・リッチーがこれに型やデータ構造を加えて改良したものが、1972年頃に完成した<Term>C言語</Term>です。
      </p>
      <p>
        Cが広まった最大の理由は、言語の設計だけではありません。1973年にUNIX自体がCで書き直され、<Link href="/computer/os-unix">UNIXが大学・研究機関・企業に広がる</Link>のと歩調を合わせてCも広がったのです。
      </p>

      <DiagramFrame
        slug="language-history-vehicles"
        aspect="640 / 300"
        caption="言語が普及するときには、必ず一緒に運んでくれた「乗り物」があった。CはUNIXに乗って大学・研究機関・企業へ、JavaScriptはWebブラウザに乗って世界中の端末へ、JavaはJVMと企業システムに乗って基幹システムとAndroidへ、Objective-C/SwiftはiPhoneに乗ってモバイル開発の標準へ、PythonはNumPyやPyTorchの蓄積に乗ってAI開発の標準へ届いた。言語そのものの設計だけで普及が決まったわけではない。"
      />

      <p>
        OSと言語がセットで普及するという構図は、後のJavaとAndroid、Objective-CとiOSにも繰り返し現れます。どんなに優れた言語でも、運んでくれるOS・企業・コミュニティがなければ一部の研究室の中で終わってしまいます。
      </p>

      <Heading num="06">オブジェクト指向の実用化 ― 1970〜80年代</Heading>
      <p>
        ゼロックスのパロアルト研究所でアラン・ケイらが開発したSmalltalk-80は、Simulaのクラスの概念を純化し、「あらゆるものがオブジェクトであり、メッセージを送り合う」というオブジェクト指向を初めて体系化しました。GUIとマウス操作もこの研究所発です。
      </p>
      <p>
        ただしSmalltalkは既存資産との互換性がなく、普及は限定的でした。実用面で広がったのは、Cとの互換性を保ちながらクラスを追加した2つのアプローチです。
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>C++(1983年〜)</th>
            <th>Objective-C(1983年〜)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">開発者</td>
            <td>ビャーネ・ストロヴストルップ(ベル研究所)</td>
            <td>ブラッド・コックス</td>
          </tr>
          <tr>
            <td className="hl">アプローチ</td>
            <td>C言語自体を拡張してクラス構文を追加</td>
            <td>Cを変更せず、Smalltalk流のメッセージ送信を統合</td>
          </tr>
          <tr>
            <td className="hl">後の採用先</td>
            <td>ゲーム・組み込み・高性能サーバー</td>
            <td>NeXT、後のApple(macOS・iOS)</td>
          </tr>
        </tbody>
      </table>

      <p>
        同じ頃、米国防総省が信頼性重視の統一言語として標準化を進めたのがAdaです。世界初のプログラマ、エイダ・ラブレスにちなんで命名されました。
      </p>

      <Heading num="07">Webが生んだスクリプト言語ラッシュ ― 1990年代</Heading>
      <p>
        Webの商用利用が始まると、コンパイルの手間なく「書いてすぐ動かす」スクリプト言語が一気に求められます。1995年前後は特に多くの言語が生まれ、後世まで残る当たり年になりました。
      </p>

      <table>
        <thead>
          <tr>
            <th>言語</th>
            <th>開発者</th>
            <th>生まれた文脈</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Python(1991年)</td>
            <td>グイド・ヴァンロッサム</td>
            <td>読みやすさを最優先に設計。教育・スクリプト用途から後にAI開発の標準へ</td>
          </tr>
          <tr>
            <td className="hl">Java(1995年)</td>
            <td>サン・マイクロシステムズ</td>
            <td>JVM上でバイトコードを実行し「一度書けばどこでも動く」を実現</td>
          </tr>
          <tr>
            <td className="hl">JavaScript(1995年)</td>
            <td>ブレンダン・アイク(Netscape)</td>
            <td>10日で設計されたブラウザ用スクリプト言語。後にECMAScriptとして標準化</td>
          </tr>
          <tr>
            <td className="hl">PHP(1995年)</td>
            <td>ラスマス・ラードフ</td>
            <td>個人サイト構築用ツールから出発し、Webサーバサイドの主流に</td>
          </tr>
          <tr>
            <td className="hl">Ruby(1995年)</td>
            <td>まつもとゆきひろ</td>
            <td>「プログラマの幸福」を重視。2004年のRuby on Railsで世界的に広まる</td>
          </tr>
        </tbody>
      </table>

      <Aside label="ブラウザ戦争とECMAScript">
        JavaScriptの普及の裏には第1次ブラウザ戦争がありました。Netscape Navigatorに対しMicrosoftはInternet Explorerを同梱して対抗し、独自のJScriptを展開します。標準化団体ECMAによる<Term>ECMAScript</Term>策定は、この分裂を収拾するための取り組みでした。
      </Aside>

      <Heading num="08">フレームワークとサーバーサイドの拡大 ― 2000年代</Heading>
      <p>
        2000年、MicrosoftはJavaに対抗する.NET基盤の主力言語としてC#を発表します(開発者はTypeScriptと同じくアンダース・ヘルスバーグ)。2004年のRuby on Railsは「設定より規約」を掲げてWebアプリ開発を高速化し、PythonのDjangoもこれに続きました。
      </p>
      <p>
        2009年には<Link href="/language/runtime">Node.js</Link>がV8をブラウザの外で動かし、フロントエンドとサーバーサイドを同じ言語で書ける道を開きます。同じ2009年、GoogleはC++の複雑さへの反省からGoを設計し、<Link href="/language/concurrency">並行処理</Link>を言語レベルで扱いやすくしました。
      </p>

      <Heading num="09">型安全への回帰 ― 2010年代</Heading>
      <p>
        2010年代は、動的型付けで広まった言語に後から型を足す流れが目立ちます。JavaScriptに静的型を追加したTypeScript(2012年)はその代表です。
      </p>

      <table>
        <thead>
          <tr>
            <th>言語</th>
            <th>登場</th>
            <th>置き換えた・補った対象</th>
            <th>狙い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">TypeScript</td>
            <td>2012年</td>
            <td>大規模化するJavaScript</td>
            <td>開発時の型チェックでバグを早期発見</td>
          </tr>
          <tr>
            <td className="hl">Kotlin</td>
            <td>2011年(2017年にAndroid公式)</td>
            <td>Javaの後継候補</td>
            <td>Java資産と互換を保ちつつ簡潔に</td>
          </tr>
          <tr>
            <td className="hl">Swift</td>
            <td>2014年</td>
            <td>Objective-C</td>
            <td>Apple製、モダンで安全な構文</td>
          </tr>
          <tr>
            <td className="hl">Rust</td>
            <td>2015年(1.0)</td>
            <td>C / C++</td>
            <td>
              <Link href="/language/memory">GCなしでメモリ安全性を保証</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="10">AI時代の言語選択 ― 2020年代</Heading>
      <p>
        機械学習・深層学習ライブラリの蓄積によって、Pythonは実行速度の遅さという弱点を抱えながらAI開発の事実上の標準になりました。ここで効いているのは言語仕様の優劣より、周辺の<Term>エコシステム</Term>の厚みです。Swiftの設計者でもあるクリス・ラトナーは2023年、高速な実行性能とPython互換の書き味の両立を狙う新言語Mojoを発表しています。
      </p>

      <Heading num="まとめ">歴史から見える3つの流れ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>言語は時代の必要から生まれる</h4>
          <p>
            教育向けの読みやすさ、軍事の信頼性、Webの手軽さ ―
            それぞれが具体的な課題への回答です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>生き残るのは技術力だけではない</h4>
          <p>
            OS・ブラウザ・ライブラリ群という乗り物に乗れた言語が、広く長く使われます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>抽象化の先で、型へ回帰した</h4>
          <p>
            機械語から高水準へ進んだ先で、TypeScript・Rustのように再び型の厳密さへ戻る動きが起きています。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/history" />
    </DocsPage>
  );
}
