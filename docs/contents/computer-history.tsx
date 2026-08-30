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
  Timeline,
  TimelineItem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンピュータの歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>コンピュータの歴史 ― 歯車の夢から、指先の中の宇宙へ</h1>
        <Lead>
          今あなたが触っているスマホやパソコンの中身は、200年かけて「計算を人間の手から機械の手に渡す」ことに挑み続けてきた人たちの積み重ねです。歴史の流れを追うと、CPU・メモリ・OSといった今後の解説がぐっと理解しやすくなります。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1822">バベッジ<br />差分機関を構想</TimelineItem>
        <TimelineItem era="1936">チューリング<br />「計算」を定義</TimelineItem>
        <TimelineItem era="1945">ノイマン型<br />アーキテクチャ</TimelineItem>
        <TimelineItem era="1946">ENIAC<br />世界初の電子計算機</TimelineItem>
        <TimelineItem era="1965">PDP-8<br />机に乗るサイズへ</TimelineItem>
        <TimelineItem era="1971">Intel 4004<br />世界初のCPU</TimelineItem>
        <TimelineItem era="1975">Altair 8800<br />個人が買える</TimelineItem>
        <TimelineItem era="1977">Apple II<br />家庭用革命</TimelineItem>
        <TimelineItem era="1981">IBM PC<br />x86普及の起点</TimelineItem>
        <TimelineItem era="1984">Macintosh<br />GUI革命</TimelineItem>
        <TimelineItem era="1995">Windows 95</TimelineItem>
        <TimelineItem era="2005">マルチコア化<br />GHz戦争の終着点</TimelineItem>
        <TimelineItem era="2007">iPhone<br />ARMがポケットへ</TimelineItem>
      </Timeline>

      <Heading num="01">「計算を機械にまかせたい」という夢</Heading>
      <p>コンピュータの歴史は、実は電気とは無関係なところから始まります。17世紀、数学者の<strong>ブレーズ・パスカル</strong>や<strong>ゴットフリート・ライプニッツ</strong>は、歯車を組み合わせて足し算・掛け算を自動で行う機械を作りました。人間が計算を間違えないようにするための、最初の一歩です。</p>

      <h3>バベッジの「差分機関」と「解析機関」</h3>
      <p>19世紀、イギリスの数学者<strong>チャールズ・バベッジ</strong>はさらに野心的な機械を構想します。当時、船が安全に航海するためには「航海暦」と呼ばれる天体の位置を記した数表が必須でした。ところがこの表は人間が手計算で作っており、計算ミスによって船が座礁し、人が命を落とす事故が起きていました。</p>
      <p>バベッジは「そもそも人間が計算に関わるからミスが起きる。人の介入そのものをなくせばいい」と考え、電気を一切使わず、<strong>歯車の組み合わせだけで動く計算機</strong>を設計しました。これが「差分機関」、そして後により汎用的に発展させた「解析機関」です。解析機関には現代のコンピュータに通じる、演算装置・記憶装置・入出力といった発想がすでに含まれていました。</p>

      <Analogy label="💡 たとえるなら">
        バベッジの解析機関は、電気仕掛けを一切使わない「歯車だけでできた電卓つきオルゴール」のようなものです。ハンドルを回すと、歯車が噛み合って複雑な計算をこなしていく ― プログラム可能な機械の設計図が、コンピュータが生まれる100年以上前にすでに存在していました。
      </Analogy>

      <Aside label="豆知識">
        解析機関のために「計算の手順(プログラム)」を書いたのは数学者の<strong>エイダ・ラブレス</strong>で、彼女は世界初のプログラマとされています。実機は当時の工作精度では完成しませんでしたが、設計思想は後世に大きな影響を与えました。
      </Aside>

      <Heading num="02">「計算とは何か」を数学で定義した男</Heading>
      <p>1936年、イギリスの数学者<strong>アラン・チューリング</strong>は「そもそも計算するとはどういうことか」を、機械を使わずに数学だけで厳密に定義しました。これが「チューリングマシン」という思考実験です。</p>

      <Diagram caption="チューリングマシンの4つの部品:テープ・読み書きヘッド・内部状態・状態表">
        <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={24} fill="#9a9a9a" fontSize="13">① 無限に長いテープ(マス目に0/1などの記号)</text>
          <g>
            <rect x={20} y={40} width={600} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <line x1={60} y1={40} x2={60} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <line x1={100} y1={40} x2={100} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <line x1={140} y1={40} x2={140} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <line x1={180} y1={40} x2={180} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <line x1={220} y1={40} x2={220} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <line x1={260} y1={40} x2={260} y2={80} stroke="#39ff6a" strokeWidth="1" />
            <text x={35} y={65} fill="#f2f2f2" fontSize="14">0</text>
            <text x={75} y={65} fill="#f2f2f2" fontSize="14">1</text>
            <text x={115} y={65} fill="#f2f2f2" fontSize="14">1</text>
            <text x={155} y={65} fill="#f2f2f2" fontSize="14">0</text>
            <text x={195} y={65} fill="#f2f2f2" fontSize="14">…</text>
          </g>
          <polygon points="130,90 150,90 140,105" fill="#39ff6a" />
          <text x={90} y={122} fill="#f2f2f2" fontSize="13">② 読み書きヘッド(今この位置の記号を読む/書く)</text>

          <rect x={330} y={40} width={290} height={80} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={345} y={58} fill="#9a9a9a" fontSize="13">③ 内部状態:「今どのモードか」</text>
          <text x={345} y={78} fill="#9a9a9a" fontSize="13">④ 状態表:「この状態でこの記号を</text>
          <text x={345} y={94} fill="#9a9a9a" fontSize="13">　読んだら、何を書いて左右どちらに</text>
          <text x={345} y={110} fill="#9a9a9a" fontSize="13">　動くか」の命令一覧</text>
        </svg>
      </Diagram>

      <p>この単純な仕組みだけで、原理上あらゆる計算が表現できることをチューリングは証明しました。「計算機とは何か」という問いに数学的な答えを与えたことで、後の実際のコンピュータ開発の理論的な土台が完成したのです。</p>

      <Heading num="03">世界初の電子計算機 ENIAC</Heading>
      <p>1946年、アメリカで<strong>ENIAC(エニアック)</strong>が誕生します。歯車ではなく<strong>真空管</strong>という電子部品を使い、0と1を電気信号のON/OFFで表現して計算する、世界初の全電子式計算機でした。</p>
      <p>ENIACは部屋一つ分の大きさで、約18,000本もの真空管を使っていました。しかし大きな弱点がありました。<strong>プログラムが配線そのものに組み込まれていた</strong>のです。計算内容を変えるには、大量のケーブルを何日もかけて差し替える必要があり、「何でも計算できる」はずの汎用機なのに、実際にはほぼ専用機として使われていたのです。</p>

      <Analogy label="💡 たとえるなら">
        ENIACは「配線という名の紙に、消しゴムなしで計算手順を書いた」ようなものです。手順(プログラム)を変えたいなら、配線盤をまるごと配線し直すしかありません。これは、レシピを変えるたびにキッチンの水道管を配管し直すようなもので、とても実用的とは言えませんでした。
      </Analogy>

      <Heading num="04">フォン・ノイマンの発明 ― 「プログラム内蔵方式」</Heading>
      <p>ENIACの弱点を見た数学者<strong>ジョン・フォン・ノイマン</strong>は、1945年に画期的なアイデアを論文にまとめます。「プログラムも、計算するデータと同じように<strong>メモリの中に置いてしまえばいい</strong>」という発想です。これを<Term>stored-program方式</Term>(プログラム内蔵方式)と呼びます。</p>
      <p>配線を変えなくても、メモリの中身(プログラム)を書き換えるだけで、同じ機械が全く違う仕事をこなせるようになりました。これは「ハードウェア」と「ソフトウェア」が初めてはっきり分離した瞬間であり、現代のあらゆるパソコン・スマートフォンの設計の骨格になっています。</p>

      <Diagram caption="ノイマン型アーキテクチャの5要素:メモリ・演算装置・制御装置・入出力装置・バス">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={250} y={10} width={140} height={46} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={38} fill="#f2f2f2" fontSize="14" textAnchor="middle">制御装置</text>

          <rect x={250} y={90} width={140} height={46} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={118} fill="#f2f2f2" fontSize="14" textAnchor="middle">演算装置(ALU)</text>

          <rect x={470} y={50} width={140} height={46} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={540} y={78} fill="#f2f2f2" fontSize="14" textAnchor="middle">メモリ</text>
          <text x={540} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">プログラムもデータもここに</text>

          <rect x={30} y={50} width={140} height={46} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={100} y={78} fill="#f2f2f2" fontSize="14" textAnchor="middle">入出力装置</text>

          <line x1={170} y1={73} x2={250} y2={73} stroke="#9a9a9a" strokeWidth="1.5" />
          <line x1={390} y1={73} x2={470} y2={73} stroke="#9a9a9a" strokeWidth="1.5" />
          <line x1={320} y1={56} x2={320} y2={90} stroke="#9a9a9a" strokeWidth="1.5" />
          <text x={320} y={200} fill="#9a9a9a" fontSize="12" textAnchor="middle">全ての装置は「バス」という共通の通り道でつながっている</text>

          <text x={320} y={230} fill="#39ff6a" fontSize="13" textAnchor="middle">サイクル: フェッチ(命令を取り出す) → デコード(解読する) → 実行する → 次の命令へ</text>
        </svg>
      </Diagram>

      <Heading num="05">小さく、速く ― トランジスタと集積回路</Heading>
      <p>真空管には弱点がありました。電球のように熱くなり、寿命が短く、場所も取ります。1947年に発明された<strong>トランジスタ</strong>は、<Term>半導体</Term>(電気を通す「導体」と通さない「絶縁体」の中間の性質を持つ材料)を使った部品で、真空管よりずっと小さく、安く、壊れにくいものでした。</p>
      <p>さらに技術が進むと、複数のトランジスタを1枚の小さなチップに焼き込む<strong>集積回路(IC)</strong>が生まれます。「部屋いっぱいの計算機」が「机の上に乗る計算機」になっていく、小型化の物語がここから加速します。1965年に登場した<strong>PDP-8</strong>はその象徴で、大学や中小企業にもコンピュータが普及するきっかけになりました。</p>

      <Analogy label="💡 たとえるなら">
        真空管が「白熱電球」だとすれば、トランジスタは「豆電球」、集積回路は「一枚の基盤に焼き付けた無数の豆電球の回路」です。同じ明かり(電気信号のON/OFF)を、どんどん小さく・省エネに実現していくイメージです。
      </Analogy>

      <Heading num="06">頭脳が指先サイズに ― マイクロプロセッサの誕生</Heading>
      <p>1971年、<strong>Intel 4004</strong>が登場します。それまで複数の部品に分かれていた「プロセッサ・メモリ・入出力」の機能を1つのチップにまとめた、世界初の<Term>マイクロプロセッサ</Term>でした。もともとは電卓用に開発されたものでしたが、この「1チップに計算機の頭脳を詰め込む」という発想が、その後のパソコン普及の土台になります。</p>

      <Heading num="07">8ビットCPU戦争と、家庭に届いたコンピュータ</Heading>
      <p>1970年代半ば、複数の企業がこぞって8ビットCPUを開発し競い合いました。</p>
      <table>
        <tbody>
          <tr><th>年</th><th>CPU / 製品</th><th>ポイント</th></tr>
          <tr><td>1974</td><td className="hl">Intel 8080</td><td>本格的な8ビットCPU</td></tr>
          <tr><td>1975</td><td className="hl">Altair 8800</td><td>Intel 8080搭載。個人が買える初めてのコンピュータ</td></tr>
          <tr><td>1975</td><td className="hl">Motorola 6502</td><td>低価格で普及。Apple IIなどに採用</td></tr>
          <tr><td>1976</td><td className="hl">Zilog Z80</td><td>8080互換で高機能化した対抗馬</td></tr>
          <tr><td>1977</td><td className="hl">Apple II(6502搭載)</td><td>家庭用コンピュータ普及の革命児</td></tr>
        </tbody>
      </table>
      <p>この競争のおかげで価格が下がり、それまで研究機関や企業だけのものだったコンピュータが、初めて一般家庭に届くようになりました。</p>

      <Heading num="08">x86の誕生と16ビット時代、そしてGUI革命</Heading>
      <p>1978年の<strong>Intel 8086</strong>(16ビット、いわゆる<Term>x86</Term>系列の元祖)、その廉価版である1979年の<strong>Intel 8088</strong>を経て、1981年に<strong>IBM PC</strong>がIntel 8088を採用したことで、x86系のCPUが業界標準として一気に普及しました。</p>
      <p>ハードウェアの進化と並行して、コンピュータの「使い方」も大きく変わります。1984年の<strong>Macintosh</strong>は、それまでキーボードで文字のコマンドを打ち込んでいた操作方法を、マウスでアイコンをクリックする<Term>GUI(グラフィカルユーザーインターフェース)</Term>へと転換しました。1995年の<strong>Windows 95</strong>はこのGUIを一般家庭に決定的に広めた製品です。</p>

      <Heading num="09">GHz戦争と「発熱の壁」</Heading>
      <p>1990年代から2000年代にかけて、IntelとAMDは「クロック周波数(GHz)をどれだけ高くできるか」を競い合いました。しかし2000年代前半、Intelの<strong>Pentium 4</strong>は周波数を上げるほど発熱と消費電力が跳ね上がる問題に直面します。次世代を狙った<strong>Itanium(IA-64)</strong>という新設計も普及せず、代わって既存のx86を64ビットに拡張したAMDの<strong>AMD64</strong>(2003年)が業界標準になりました。</p>
      <p>2004年頃、Intelは方針を転換し、1つのCPUの中に複数の処理コアを積む<strong>マルチコア戦略</strong>を発表します。「1人の天才を高速に働かせる」よりも「複数人で分担する」方向へ ― これが今日のパソコンやスマートフォンのCPUが軒並みマルチコアである理由です。</p>

      <Analogy label="💡 たとえるなら">
        1人の職人がどんどん作業スピードを上げていくと、そのうち息切れして熱を出してしまいます(発熱の壁)。それなら「職人を何人か雇って同時に作業を分担してもらおう」というのがマルチコアの発想です。
      </Analogy>

      <Heading num="10">2つの設計哲学 ― CISC(x86)とRISC(ARM)</Heading>
      <p>CPUの「命令セット(命令の種類・作り方)」には大きく2つの設計思想があります。</p>
      <table>
        <tbody>
          <tr><th></th><th>CISC(x86に代表される)</th><th>RISC(ARMに代表される)</th></tr>
          <tr><td className="hl">考え方</td><td>複雑な命令セット。1つの命令で多くの処理をこなす</td><td>縮小命令セット。単純な命令を高速に大量にこなす</td></tr>
          <tr><td className="hl">たとえ</td><td>多機能な万能ナイフ。何でもできるが重い</td><td>用途別のシンプルな工具セット。身軽で扱いやすい</td></tr>
          <tr><td className="hl">得意分野</td><td>処理性能重視のPC・サーバー</td><td>電力効率重視のスマホ・組み込み機器</td></tr>
        </tbody>
      </table>
      <p>2007年に登場した<strong>iPhone</strong>はARM系CPUを搭載しており、「小型・省電力」を武器にしたRISC系の設計思想が、今やほとんどの人のポケットの中で動いています。</p>

      <Heading num="まとめ">歴史から見える3つの流れ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>小型化</h4>
          <p>部屋いっぱいのENIACから、指先サイズのマイクロプロセッサへ。真空管→トランジスタ→集積回路という部品の進化が支えています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ソフトウェアの独立</h4>
          <p>配線でプログラムしていたENIACから、ノイマン型の「プログラム内蔵方式」によって、ハードウェアを変えずにソフトウェアだけを入れ替えられるようになりました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>速さから効率へ</h4>
          <p>「とにかく周波数を上げて速く」という競争は発熱の壁にぶつかり、「複数コアで分担する」「電力効率を重視する」という考え方へシフトしました。</p>
        </Card>
      </CardGrid>
      <p>次は、同じ頃に育っていったもう一つの物語 ―「インターネットの歴史」を見ていきましょう。コンピュータ同士がどうやってつながり合うようになったのかを追いかけます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み ― プロセス・スレッド・カーネル</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― レジスタからストレージまで</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
