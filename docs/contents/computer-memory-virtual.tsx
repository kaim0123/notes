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
  title: "仮想メモリとソフトウェアの肥大化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>仮想メモリとソフトウェアの肥大化 ― やさしい嘘とその代償</h1>
        <Lead>
          Photoshopで巨大な画像を開いても、ブラウザで何十枚もタブを開いても、コンピュータが動き続けられるのはなぜでしょう。答えは、OSがプログラムに対して<strong>「実際にはないメモリを、あるように見せている」</strong>から。この“やさしい嘘”が現代のOSを成り立たせ、同時にソフトウェアを際限なく太らせてもきました。
        </Lead>
      </Hero>

      <p>前のページでは、DRAMの登場でメモリ容量が数年ごとに倍増していく様子を見ました。しかし物理メモリには必ず限界があります。その限界を「なかったこと」にしてしまう仕組みが<Term>仮想メモリ</Term>です。発想の源流は<strong>1960年代のアトラスコンピュータ</strong>にまで遡ります。</p>

      <Heading num="01">仮想メモリ ― OSがつく便利な嘘</Heading>
      <p>各プログラムには、あたかも広大なメモリが自分専用にあるかのように見せます。実際の物理メモリ(RAM)が足りなくなったら、今使っていないデータをこっそりストレージに逃がし、必要になったら戻す。プログラムはその裏側をまったく知りません。</p>

      <Diagram caption="仮想アドレス空間を、物理メモリとストレージ(スワップ)に振り分ける">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <text x={110} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">プログラムから見た</text>
          <text x={110} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">仮想アドレス空間</text>
          <rect x={40} y={54} width={140} height={180} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={40} y={54} width={140} height={36} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={110} y={77} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ A</text>
          <rect x={40} y={90} width={140} height={36} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={110} y={113} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ B</text>
          <rect x={40} y={126} width={140} height={36} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={110} y={149} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ C</text>
          <rect x={40} y={162} width={140} height={36} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={110} y={185} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ D</text>

          <text x={400} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">実際の置き場所</text>

          <rect x={330} y={40} width={150} height={96} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={405} y={58} fill="#9a9a9a" fontSize="11" textAnchor="middle">物理メモリ(RAM)</text>
          <rect x={345} y={68} width={120} height={26} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={405} y={85} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ A</text>
          <rect x={345} y={100} width={120} height={26} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={405} y={117} fill="#f2f2f2" fontSize="12" textAnchor="middle">ページ C</text>

          <rect x={330} y={150} width={150} height={84} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={405} y={168} fill="#9a9a9a" fontSize="11" textAnchor="middle">ストレージ(スワップ)</text>
          <rect x={345} y={178} width={120} height={26} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={405} y={195} fill="#9a9a9a" fontSize="12" textAnchor="middle">ページ B</text>
          <rect x={345} y={206} width={120} height={22} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={405} y={222} fill="#9a9a9a" fontSize="12" textAnchor="middle">ページ D</text>

          <line x1={180} y1={72} x2={345} y2={81} stroke="#39ff6a" strokeWidth="1" />
          <line x1={180} y1={108} x2={345} y2={191} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={180} y1={144} x2={345} y2={113} stroke="#39ff6a" strokeWidth="1" />
          <line x1={180} y1={180} x2={345} y2={217} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>概念</th><th>説明</th></tr>
          <tr><td className="hl">ページ</td><td>メモリを固定サイズ(現代では約4KB)の単位に区切ったもの。管理と入れ替えの最小単位</td></tr>
          <tr><td className="hl">スワップ</td><td>使っていないページをストレージのスワップ領域に追い出し、必要になったら取り出す(机の引き出しに書類をしまうイメージ)</td></tr>
          <tr><td className="hl">プロセス分離</td><td>各プログラムが独立した仮想アドレス空間を持つ。マルチタスクとセキュリティの土台になる</td></tr>
          <tr><td className="hl">ページフォルト</td><td>必要なページがストレージに追い出されていたときに発生。OSが慌てて取り戻す割り込み処理</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        仮想メモリは、狭い机(RAM)で作業しながら、今使わない書類を引き出し(ストレージ)に一時的にしまう働き方です。机の上には常に「今必要な書類」だけを置き、必要になったら引き出しから出す。おかげで机が小さくても、膨大な量の書類を扱う仕事ができます。ただし引き出しの開け閉め(スワップ)は、机の上で手を伸ばすより<strong>ずっと遅い</strong>のが弱点です。
      </Analogy>

      <h3>スラッシング ― 引き出しの開け閉めで一日が終わる</h3>
      <p>物理メモリが足りなさすぎると、OSは「ページを追い出しては戻す」を延々と繰り返すようになります。この状態が<Term>スラッシング</Term>です。ストレージへのアクセスばかりで実際の処理がほとんど進まず、昔のPCなら<strong>HDDのランプが点滅しっぱなしでフリーズしたような状態</strong>になりました。仮想メモリの便利さは、物理メモリが極端に不足すると一気に牙をむきます。</p>

      <Aside label="プロセス分離のもう一つの意味">
        仮想メモリは「容量を増やす嘘」であると同時に、「各プログラムを隔離する壁」でもあります。プロセスAはプロセスBのメモリを直接覗けません。これがマルチタスクの安定性と、セキュリティ(あるアプリの暴走が他に波及しない)の基盤になっています。WindowsやLinuxが成立している前提そのものです。
      </Aside>

      <Heading num="02">メモリが安くなった途端、ソフトが太り出した</Heading>
      <p>仮想メモリには、思わぬ副作用がありました。「メモリが足りない恐怖」が薄れた途端、<strong>ソフトウェアがどんどん肥大化し始めた</strong>のです。安く潤沢なメモリは、開発者にとって<strong>最適化を後回しにする言い訳</strong>にもなりました。</p>

      <table>
        <tbody>
          <tr><th>時期</th><th>メモリの状況</th><th>ソフトウェアの変化</th></tr>
          <tr><td className="hl">1990年代前半</td><td>1MBあたり数万円。16MBのPCはメモリだけで数十万円</td><td>厳しい制約の中で切り詰めて作られた</td></tr>
          <tr><td className="hl">1990年代後半</td><td>1MBが数十円まで暴落。256MB → 512MB → 1GBへ</td><td>Windows 95/98/XPの普及で、初めて「メモリを使い切らない」体験が生まれた</td></tr>
          <tr><td className="hl">Windows本体</td><td>95は最低4MB → XPは128MB(30倍以上)</td><td>機能追加以上に「どうせメモリはある」前提への設計変更が進んだ</td></tr>
          <tr><td className="hl">Officeなど</td><td>95版は数十MB → 2003版は200〜400MB</td><td>同上。潤沢さが前提になった</td></tr>
        </tbody>
      </table>

      <Heading num="03">ヴィルトの法則 ― ハードが速くなるより速くソフトは重くなる</Heading>
      <p>この現象を鋭く言い当てたのが<Term>ヴィルトの法則(Wirth&apos;s Law)</Term>です。提唱者はプログラミング言語Pascalの設計で知られるニクラウス・ヴィルト。その主張はこうです。</p>
      <Analogy label="💡 ヴィルトの法則">
        <strong>ハードウェアが速くなるより速く、ソフトウェアは重くなる。</strong>
        <br />CPUが18ヶ月で2倍速くなる(ムーアの法則)としても、ソフトはそれ以上のペースで重くなる ― つまり、体感速度は一向に良くならない、という皮肉です。
      </Analogy>

      <p>なぜこうなるのか。構造的な原因があります。締め切り・競争・予算という制約の下では、<strong>最適化はいつも最後の優先順位</strong>に回されます。「後で最適化しよう」はやがて「今のハードで動くからいいや」に変わり、そのまま出荷されるのです。</p>

      <h3>ブラウザとタブ ― 2000年代前半からの古い悩み</h3>
      <p>肥大化のいちばん身近な例がブラウザです。Internet Explorer・Netscape・Firefoxがシェアを争っていた<strong>2001年前後にタブブラウジングが登場</strong>しました。それまで新しいページを開くたびに別ウィンドウが増えていた問題を、一気に解決した革命的な機能です。</p>
      <p>ところが便利すぎたために、みんなが<strong>何十枚もタブを開きっぱなしにする習慣</strong>を身につけました。タブ1枚ごとにページ分のメモリを消費するため、Chromeなどはタブを開いていなくても数百MBを消費します。「タブを開きすぎてPCが重い」は最近の悩みではなく、<strong>20年以上前からの古い悩み</strong>なのです。</p>

      <Aside label="いたちごっこの本質">
        メモリを2倍にすると、ソフトも2倍の容量を使い切ります。増やしても増やしても「ちょうど足りない」ところに落ち着く ― これは前のページで見た「足りないという感覚」が、物理媒体の時代から形を変えて続いていることの現れです。
      </Aside>

      <Heading num="まとめ">この章のポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>仮想メモリは容量の嘘であり、隔離の壁</h4>
          <p>ページとスワップで「無限のメモリ」を演出しつつ、プロセスを分離して安定性とセキュリティも支えています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>安いメモリは最適化の言い訳になる</h4>
          <p>足りない恐怖が消えた途端、ソフトは肥大化を始めました。ヴィルトの法則は今も生きています。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>増やしても足りなさは消えない</h4>
          <p>メモリを2倍にすればソフトも2倍使う。いたちごっこは構造的なもので、簡単には終わりません。</p>
        </Card>
      </CardGrid>
      <p>ここまでは「量(どれだけ覚えられるか)」の物語でした。しかし2000年代、問題の軸は静かに移り始めます。次のページ「速さの壁」では、<strong>量ではなく速度と帯域</strong>が主役になる時代を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/memory" tag="OS">記憶管理と仮想記憶 ― ページング・LRU・スラッシング</RelatedLink>
                    <RelatedLink href="/computer/memory/speed" tag="コンピュータ">速さの壁 ― キャッシュ・帯域・HBM</RelatedLink>
                    <RelatedLink href="/computer/memory/history" tag="コンピュータ">記憶装置の歴史</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み ― プロセス・スレッド・カーネル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
