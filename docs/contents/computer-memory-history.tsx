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
  title: "記憶装置の歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>記憶装置の歴史 ― 「足りない」という永遠の感覚</h1>
        <Lead>
          メモリを増やしてもすぐ足りなくなる。スマホはアプリを容赦なく落とす。AIは毎秒テラバイト級の帯域を欲しがる ―
          これらはすべて「足りない」という同じ感覚の現れです。記憶装置の歴史は、実は<strong>「もっと多く、もっと速く覚えたい」という人間の欲望の歴史</strong>でもあります。この章では、紙に穴を開けていた時代から始まる60年の物語をたどります。
        </Lead>
      </Hero>

      <p>「メモリの仕組み」では、レジスタからストレージまでの記憶階層と、プログラムのメモリ4領域を見ました。ここからは視点を時間軸に移し、<strong>その「メモリ」がどうやって今の形にたどり着いたのか</strong>を追いかけます。結論を先に言えば ― メモリ不足はバグではなく、進歩を生み続ける燃料でした。</p>

      <Timeline>
        <TimelineItem era="1940s">水銀遅延線<br />ウィリアムズ管</TimelineItem>
        <TimelineItem era="1953">磁気コアメモリ<br />ランダムアクセス</TimelineItem>
        <TimelineItem era="1969">アポロ誘導計算機<br />手編みのメモリ</TimelineItem>
        <TimelineItem era="1970">Intel 1103<br />世界初の商用DRAM</TimelineItem>
        <TimelineItem era="1981">IBM PC<br />640KBの壁</TimelineItem>
        <TimelineItem era="1980s">NEC・東芝・日立<br />DRAM市場8割</TimelineItem>
      </Timeline>
      <TimelineLabel>紙 → 水銀 → ブラウン管 → 磁気の輪 → シリコン。媒体は変われど「1ビットでも多く、安く記憶したい」という欲求は一貫していました。</TimelineLabel>

      <Heading num="01">物理現象で記憶する ― 黎明期の記憶装置</Heading>
      <p>コンピュータ黎明期には、<strong>プログラムの保存</strong>と<strong>作業用メモリ(RAM)</strong>はまったく別の装置でした。そして当時の「メモリ」は、電気ではなく<strong>身の回りの物理現象</strong>を無理やり記憶に使っていました。</p>

      <table>
        <tbody>
          <tr><th>技術</th><th>仕組み</th><th>特徴・つらさ</th></tr>
          <tr><td className="hl">パンチカード</td><td>紙の決まった位置に穴を開けて1/0を表現</td><td>プログラム読み込み用。修正は「紙を切り直す」物理作業で、デバッグが文字どおり格闘だった</td></tr>
          <tr><td className="hl">水銀遅延線</td><td>缶の中の水銀に音波を流し、伝播の遅れで信号を一時保存</td><td>信号をループさせて維持。<strong>温度で音速が変わり</strong>、冬と夏で挙動が変わる。しかも有毒</td></tr>
          <tr><td className="hl">ウィリアムズ管</td><td>ブラウン管の画面に電子ビームで点を描き、電荷で1/0を記録</td><td>電源が入っている間じゅう描き直し続ける必要あり(<Term>揮発性</Term>)</td></tr>
          <tr><td className="hl">磁気ドラム</td><td>回転する金属ドラムの表面に磁気を記録</td><td>読みたいデータがヘッドの前に来るまで待つ(1周およそ16ミリ秒)。プログラマは回転タイミングを計算して命令を配置した</td></tr>
        </tbody>
      </table>

      <p>当時の容量は<strong>KB以下</strong>。今のスマホ写真1枚の、数万〜数十万倍もの情報量の差があります。用途は弾道計算・統計処理・暗号解読などで、コンピュータの黎明は<strong>軍の要求</strong>と切り離せませんでした。</p>

      <Aside label="消去法で選ばれた水銀">
        水銀遅延線が採用されたのは、優れていたからではなく、他がもっとダメだったからでした。真空管メモリは繊細すぎて実用に耐えず、磁気テープは順次アクセスしかできず遅すぎる。有毒で温度に左右されても「大量生産できる現実解」だったのが水銀だったのです。
      </Aside>

      <Analogy label="💡 たとえるなら">
        磁気ドラム時代のプログラマが「命令をドラムのどの位置に置けば、回転してちょうどヘッドの前に来るか」を計算していたのは、現代のプログラマが<strong>キャッシュヒット率を意識して最適化する</strong>のと本質的に同じ営みです。舞台が物理ドラムからシリコンのキャッシュに変わっただけで、「データが届くのを待つ時間をどう削るか」という泥臭い格闘はずっと続いています。
      </Analogy>

      <Heading num="02">磁気コアメモリ ― 手編みの革命</Heading>
      <p><strong>1950年代〜1970年代</strong>の主役が<Term>磁気コアメモリ</Term>です。フェライト(酸化鉄)でできた直径1〜2mmの小さなリングに、磁化の向きで0/1を記録しました。これが記憶の考え方を大きく変えます。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ランダムアクセスの実現</h4>
          <p>磁気テープの「順番に読む」制約から解放され、どこでも直接読み書きできるように。サブルーチンやデータ構造という、プログラム設計の根本がここで生まれました。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>電源が切れても消えない</h4>
          <p>磁化の向きは電源を切っても残る<Term>不揮発性</Term>。信頼性が命のアポロ計画の誘導計算機にも、この「手編みのメモリ」が搭載されました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>1ビットも無駄にしない文化</h4>
          <p>製造は職人が針金を1ビットずつ手で通す作業で、1ビットあたり数百円相当。この高コストが「メモリを徹底的に節約する」プログラミング文化を育てました。</p>
        </Card>
      </CardGrid>

      <p>ただし手作業では量産にも小型化にも限界がありました。次の主役 ― <strong>シリコン半導体</strong>への移行は必然だったのです。</p>

      <Heading num="03">640KBの壁とDRAM革命</Heading>

      <h3>640KBの壁 ― 予約されすぎたアドレス空間</h3>
      <p>IBM PCの設計時、1MBのアドレス空間のうち<strong>上位384KBがBIOSやビデオカードなどに予約</strong>されました(メモリマップドI/O)。結果、プログラムが実際に使えるのは<strong>640KBだけ</strong>。これが有名な<Term>640KBの壁</Term>です。</p>
      <p>「640KBあれば誰にでも十分だ」という言葉はビル・ゲイツの発言として語り継がれていますが、<strong>本人が言った確かな記録はありません</strong>。ただし壁そのものは実在し、対策として<strong>UMB・EMS・XMS</strong>など、予約領域を無理やり使うための技が次々と生まれ、乱立しました。</p>

      <Analogy label="💡 たとえるなら">
        640KBの壁への対処は、押入れの手前(640KB)が物でいっぱいなのに、奥のスペース(予約領域)には「システム専用」の札が貼られていて自由に使えない状態です。プログラマたちは、その札の隙間になんとか荷物を押し込む裏技(EMS/XMS)を編み出しました。窮屈さが、こうした工夫を生んだのです。
      </Analogy>

      <h3>DRAM ― シリコンが磁気コアを駆逐する</h3>
      <p>1970年、Intelが世界初の商用<Term>DRAM</Term>「Intel 1103」(1チップ1024ビット)を発売します。仕組みは驚くほどシンプルで、これが現在まで生き続けます。</p>

      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">1ビットの構造</td><td>トランジスタ1個 + コンデンサ1個。コンデンサに電荷があるかないかで0/1を表す</td></tr>
          <tr><td className="hl">リフレッシュ</td><td>電荷は自然に抜けていくため、定期的に読み直して書き戻す必要がある(穴の開いたバケツに水を足し続けるイメージ)</td></tr>
          <tr><td className="hl">製造革命</td><td>フォトリソグラフィでウェハから一括量産。磁気コアの手編みを10年足らずで駆逐した</td></tr>
          <tr><td className="hl">2025年でも同じ</td><td>材料やプロセスは進化したが、「電荷を貯めてリフレッシュする」根本原理は1970年から変わっていない</td></tr>
        </tbody>
      </table>

      <Aside label="バケツと水">
        DRAMを「穴の開いたバケツ」に例えると分かりやすいです。バケツ(コンデンサ)に水(電荷)が入っていれば1、空なら0。でも穴からじわじわ漏れるので、水位が下がる前に何度も水を足し直します。この「足し直し」がリフレッシュで、DRAMが常に少しずつ電力を食い続ける理由でもあります。
      </Aside>

      <Heading num="04">シリコンサイクルと日本のDRAM覇権</Heading>
      <p>DRAMの普及とともに、容量は爆発的に増えました。1980年代には512KB → 1MB → 4MBと数年単位で倍増し、「4MBあれば何でもできる」と本気で信じられた時代もありました。</p>

      <p>一方で、DRAM産業は独特の景気循環に振り回されます。これが<Term>シリコンサイクル</Term>です。</p>
      <Analogy label="💡 たとえるなら">
        工場の建設費は数千億〜数兆円規模。一度建てたら、赤字でも止められません(止めるほうが損)。だから<strong>赤字でも作り続ける → 供給過剰 → 価格暴落 → 耐えきれず工場閉鎖 → 供給不足 → 価格急騰</strong>、というループがぐるぐる回り続けます。このジェットコースターは、今もなお続いています。
      </Analogy>

      <p>そして1980年代、この巨大産業を制したのが日本でした。<strong>NEC・東芝・日立</strong>が世界のDRAM市場の<strong>8割近く</strong>を掌握します。強さの源泉は、徹底したクリーンルーム管理と、不良品を減らす<strong>歩留まりの高さ</strong>でした。「1ビットも無駄にしない」という磁気コア時代の精神が、製造の現場でも力を発揮したと言えるかもしれません。</p>

      <Heading num="まとめ">この章のポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>記憶は物理現象の借用から始まった</h4>
          <p>水銀の音、ブラウン管の電荷、ドラムの磁気 ― 身近な物理現象を無理やり記憶に使った時代を経て、シリコンにたどり着きました。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>制約が文化と工夫を生んだ</h4>
          <p>高価な磁気コアは「1ビットも無駄にしない」節約文化を、640KBの壁は数々の裏技を生みました。足りなさこそが知恵の母でした。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DRAMの原理は50年変わらない</h4>
          <p>電荷を貯めてリフレッシュするという1970年の発明が、今もあなたのPCとスマホの中で動き続けています。</p>
        </Card>
      </CardGrid>
      <p>容量は増え続けました。ところが人類は、増えた分をあっという間に使い切ってしまいます。次のページ「仮想メモリとソフトウェアの肥大化」では、OSがついた「やさしい嘘」と、その代償を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory/virtual" tag="コンピュータ">仮想メモリとソフトウェアの肥大化</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― 記憶階層と4領域</RelatedLink>
                    <RelatedLink href="/computer/history" tag="コンピュータ">コンピュータの歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
