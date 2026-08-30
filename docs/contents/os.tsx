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
  Diagram,
  RelatedList,
  RelatedLink,
  Timeline,
  TimelineItem,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

const subTopics = [
  { href: "/os/kernel", title: "カーネルの役割と設計", desc: "OSの中核・4層構造・モノリシック/マイクロ・特権モード" },
  { href: "/os/process", title: "プロセスとスレッド", desc: "メモリ空間・PCB・スケジューリング・IPC・fork/exec" },
  { href: "/os/memory", title: "記憶管理と仮想記憶", desc: "区画・スワッピング・ページング・LRU/FIFO・スラッシング" },
  { href: "/os/syscall", title: "システムコール", desc: "アプリとカーネルをつなぐ唯一の窓口とその内部動作" },
  { href: "/os/shell", title: "シェル", desc: "コマンドを解釈する殻 ― sh・Bash・zshの系譜" },
  { href: "/os/filesystem", title: "ファイルシステム", desc: "FAT・NTFS・ext・APFS ― データを配置し守る仕組み" },
  { href: "/os/unix", title: "UNIXの歴史と哲学", desc: "1969年ベル研から始まった現代OSの源流" },
  { href: "/os/posix", title: "UNIX・BSD・Linuxの違い", desc: "似て非なる3ファミリーとPOSIXという共通基盤" },
  { href: "/os/gnu", title: "GNUとフリーソフトウェア", desc: "「自由」の理念とコピーレフト(GPL)" },
  { href: "/os/linux", title: "Linuxの歴史", desc: "趣味のプロジェクトが世界を動かすまで" },
];

export const metadata: Metadata = {
  title: "OSの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>OSの仕組み ― ハードウェアとアプリの間に立つ調整役</h1>
        <Lead>
          ブラウザを開きながら音楽を聴き、裏でファイルもダウンロードできる ―
          これは全部、OS(オペレーティングシステム)が「限られたハードウェアを、複数のプログラムに公平に配り続けている」おかげです。OSがいなければ、アプリはハードウェアを直接奪い合って動けなくなってしまいます。
        </Lead>
      </Hero>

      <p>前のページまでで「複数のコンピュータ同士がどうつながるか」というインターネットの歴史を見てきました。ここからは視点を1台のコンピュータの中に戻し、その内部でOSが何をしているのかを見ていきます。</p>

      <Heading num="01">OSが生まれるまでの歴史</Heading>
      <Timeline>
        <TimelineItem era="1940年代">OSなし<br />ハードウェアを直接操作</TimelineItem>
        <TimelineItem era="1950年代">バッチ処理<br />ジョブカードで一括処理</TimelineItem>
        <TimelineItem era="1960年代">タイムシェアリング<br />複数ユーザーが同時利用</TimelineItem>
        <TimelineItem era="1970年代">UNIX誕生<br />マルチタスク/マルチユーザー</TimelineItem>
        <TimelineItem era="1980年代">パソコン普及<br />GUIが主流に</TimelineItem>
        <TimelineItem era="2000年代">モバイルOS<br />省電力・タッチ操作最適化</TimelineItem>
      </Timeline>
      <p>最初期のコンピュータにはOSという概念自体がなく、利用者がハードウェアを直接操作していました。1950年代には、処理内容を書いた「ジョブカード」をまとめて機械に読み込ませ、順番に一括処理する<Term>バッチ処理システム</Term>が登場します。</p>
      <p>1960年代には大きな転機が訪れます。<Term>タイムシェアリング(時分割)</Term>という技術により、1台のコンピュータのCPUを非常に短い時間単位で複数のユーザーに切り替えながら割り当てることで、「同時に使えているように見える」状態を作れるようになりました。1970年代には、この考え方を土台に<strong>UNIX</strong>が誕生し、マルチタスク・マルチユーザー・階層的なファイルシステムといった、現代のOSの基本概念が確立します。</p>

      <Analogy label="💡 たとえるなら">
        タイムシェアリングは「1人の店員が、複数のお客さんのオーダーを超高速に順番でさばいている」状態です。実際には1人ずつ順番に対応しているのに、あまりに速いので、お客さん全員が「自分だけが専属で接客されている」ように感じる ― これがCPUを複数のプログラムで共有する基本原理です。
      </Analogy>

      <Heading num="02">OSが担う5つの役割</Heading>
      <p>OSの仕事を一言でいえば「限りあるハードウェアの資源を、複数のプログラムに安全・公平に配分すること」です。具体的には次の5つに整理できます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ハードウェアのリソース管理</h4><p>CPU、メモリ、ディスク、キーボード、マウスなど、あらゆるハードウェアを管理する</p></Card>
        <Card><CardNumber>2</CardNumber><h4>プロセス管理</h4><p>実行中の複数のプログラム(プロセス)を制御し、CPU時間を配分する</p></Card>
        <Card><CardNumber>3</CardNumber><h4>メモリ管理</h4><p>各プロセスに安全にメモリ領域を割り当て、他のプロセスと混ざらないようにする</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ファイルシステム管理</h4><p>データをファイル・フォルダという単位で整理し、読み書きを提供する</p></Card>
        <Card><CardNumber>5</CardNumber><h4>ユーザーインターフェース</h4><p>デスクトップやウィンドウなど、人間がコンピュータを操作するための窓口を提供する</p></Card>
      </CardGrid>

      <Heading num="03">プロセスとスレッド</Heading>
      <h3>プロセスとは ― 実行中のプログラム1つ分</h3>
      <p>アプリを起動すると、OSはそのプログラム専用の独立したメモリ空間を割り当てます。この「実行中のプログラムの実体」を<Term>プロセス</Term>と呼びます。プロセスごとのメモリ空間が具体的にどう区画されているか(コード領域・データ領域・ヒープ・スタック)は、次のページ「<Link href="/computer/memory">メモリの仕組み</Link>」で詳しく見ていきます。</p>
      <p>ブラウザを2つ起動すれば2つの独立したプロセスになり、それぞれが自分専用のメモリ空間を持ちます。一方のプロセスが暴走してクラッシュしても、原則としてもう一方には影響しません。これはOSがプロセスごとにメモリを隔離して守っているためです。</p>

      <h3>スレッドとは ― プロセスの中の作業員</h3>
      <p>1つのプロセスの中でも、複数の処理を並行して進めたいことがあります(例: 画面を描画しながら、裏でファイルを読み込む)。この「プロセス内で並行して動く実行単位」を<Term>スレッド</Term>と呼びます。同じプロセス内のスレッドは、そのプロセスのメモリ(データ領域やヒープ)を共有しつつ、スタックだけは各スレッドが自分専用に持ちます。</p>

      <Diagram caption="同じプロセス内のスレッドはメモリを共有、別プロセスとは隔離される">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={20} width={270} height={180} rx="10" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={165} y={42} fill="#9a9a9a" fontSize="13" textAnchor="middle">プロセスA</text>
          <rect x={50} y={55} width={230} height={40} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={165} y={79} fill="#f2f2f2" fontSize="12" textAnchor="middle">共有メモリ(コード・データ・ヒープ)</text>
          <rect x={50} y={105} width={105} height={40} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={102} y={129} fill="#f2f2f2" fontSize="12" textAnchor="middle">スレッド1のスタック</text>
          <rect x={165} y={105} width={115} height={40} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={222} y={129} fill="#f2f2f2" fontSize="12" textAnchor="middle">スレッド2のスタック</text>
          <text x={165} y={175} fill="#9a9a9a" fontSize="11" textAnchor="middle">メモリは共有、スタックだけ別々</text>

          <rect x={340} y={20} width={270} height={180} rx="10" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={475} y={42} fill="#9a9a9a" fontSize="13" textAnchor="middle">プロセスB(別アプリ)</text>
          <rect x={360} y={70} width={230} height={100} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={475} y={125} fill="#f2f2f2" fontSize="12" textAnchor="middle">独立したメモリ空間</text>
          <text x={475} y={175} fill="#9a9a9a" fontSize="11" textAnchor="middle">プロセスAとは完全に隔離されている</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        <strong>プロセス</strong>は「独立したそれぞれの店舗」です。店舗Aの在庫が店舗Bに勝手に混ざることはありません。<strong>スレッド</strong>は「同じ店舗内で働く複数のレジ係」。レジ係たちは同じ店の在庫(メモリ)を共有しながら、それぞれ自分の作業スペース(スタック)で並行して接客しています。
      </Analogy>

      <Heading num="04">カーネル ― OSの中核</Heading>
      <p>OSの中でも、ハードウェアに最も近い場所で動く中核部分を<Term>カーネル</Term>と呼びます。カーネルは次の5つの役割を担います。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>プロセス管理</h4><p>CPU時間をどのプロセスにどれだけ割り当てるか決める</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メモリ管理</h4><p>各プロセスに割り当てるメモリ領域を決め、保護する</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ファイルシステム管理</h4><p>ディスク上のデータをファイルという単位で扱えるようにする</p></Card>
        <Card><CardNumber>4</CardNumber><h4>デバイス管理</h4><p>キーボードやディスクなど周辺機器とのやり取りを仲介する</p></Card>
        <Card><CardNumber>5</CardNumber><h4>システムコールの提供</h4><p>アプリがハードウェアの機能を安全に呼び出せる窓口を用意する</p></Card>
      </CardGrid>

      <h3>コンピュータの4層構造</h3>
      <p>コンピュータの中身は、下から上へ役割ごとの層に分けて考えると理解しやすくなります。</p>
      <Diagram caption="ハードウェアに近いほど下、人間の操作に近いほど上">
        <svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={80} y={10} width={400} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={40} fill="#f2f2f2" fontSize="14" textAnchor="middle">4層: アプリケーション(ブラウザなど)</text>

          <rect x={80} y={70} width={400} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={100} fill="#f2f2f2" fontSize="14" textAnchor="middle">3層: システムプログラム(シェル、エクスプローラー)</text>

          <rect x={80} y={130} width={400} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={160} fill="#f2f2f2" fontSize="14" textAnchor="middle">2層: カーネル(OSの中核)</text>

          <rect x={80} y={190} width={400} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={220} fill="#f2f2f2" fontSize="14" textAnchor="middle">1層: ハードウェア(CPU・メモリ・ディスク)</text>

          <text x={280} y={248} fill="#9a9a9a" fontSize="11" textAnchor="middle">上の層は、下の層の機能を使って動いている</text>
        </svg>
      </Diagram>

      <Heading num="05">OSとどう対話するか ― GUIとCLI</Heading>
      <p>私たちが普段アイコンをクリックして操作している画面は「システムプログラム」の層にあたる<Term>GUI(グラフィカルユーザーインターフェース)</Term>です。一方、文字でコマンドを打ち込んでOSに直接指示を出す方法を<Term>CLI(コマンドラインインターフェース)</Term>と呼び、その入力窓口が<Term>ターミナル</Term>、命令を解釈してカーネルに伝える係が<Term>シェル</Term>です。ターミナル・シェルの具体的な使い方は、次のカテゴリ「開発基盤」の「<Link href="/dev/workspace">開発環境</Link>」ページで扱います。</p>

      <Heading num="06">さらに深く ― 個別テーマへ</Heading>
      <p>このページはOSの骨組みを俯瞰したものです。ここから先は、それぞれの仕組みと歴史を個別のページで掘り下げていきます。</p>
      <IndexGrid>
        {subTopics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="まとめ">OSは「調整役」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>資源の公平な配分</h4><p>タイムシェアリングにより、限られたCPUを複数のプログラムに切り替えながら配分しています。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>プロセスは隔離、スレッドは共有</h4><p>プロセス同士は互いのメモリに干渉できませんが、同じプロセス内のスレッドはメモリを共有して協調して動きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>カーネルが中核、上の層は経由して動く</h4><p>ハードウェア→カーネル→システムプログラム→アプリケーションの順に積み上がった層構造で、上の層は必ず下の層の機能を経由します。</p></Card>
      </CardGrid>
      <p>ここではOSがプロセスやメモリをどう管理するかという骨組みを見てきました。次は、その中でも触れた「メモリ」そのものが、レジスタからストレージまでどんな階層になっているのかを詳しく見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                    <RelatedLink href="/computer/history" tag="コンピュータ">コンピュータの歴史</RelatedLink>
                    <RelatedLink href="/network/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
