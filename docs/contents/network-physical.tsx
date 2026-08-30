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
  title: "物理層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>物理層 ― ビットを電気・光・電波で運ぶ</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」でいうOSI参照モデルの第1層、TCP/IPモデルのネットワークインターフェース層の一番下にあたるのが物理層です。<Link href="/network/link">データリンク層</Link>が組み立てた「フレーム(0と1の並び)」を、実際にケーブルの中を流れる電気信号や、光ファイバーを走る光、空間を飛ぶ電波といった<strong>物理的な現象</strong>に変換して隣の機器へ届けるのがこの層の仕事です。ここでは信号・伝送媒体・コネクタ・通信方向・物理層の機器を順に見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">物理層の役割 ― 0と1を信号にする</Heading>
      <p>コンピュータが扱うデータは、突き詰めれば<Term>ビット</Term>(0か1)の並びです。しかしケーブルの中を「0」や「1」という数字が流れるわけではありません。物理層は、この0と1を<strong>電圧の高低・光のON/OFF・電波の変化</strong>といった、媒体の上で表現できる信号へ変換します。この「ビット ⇄ 信号」の対応ルールを<Term>符号化(エンコード)</Term>と呼びます。</p>
      <p>信号の送り方には、0と1をそのまま電圧のパターンとして流す<Term>ベースバンド方式</Term>(LANで一般的)と、電波などの搬送波に情報を乗せて送る<Term>ブロードバンド方式</Term>があります。いずれも「送信側が信号に変換し、受信側が元のビットへ戻す」という約束を、送受信で共有していることが前提です。</p>

      <Analogy label="💡 たとえるなら">
        物理層はモールス信号のようなものです。「トン・ツー」という音の長短そのものには意味がありませんが、「トンは0、ツーは1」という取り決め(符号化)を送り手と受け手が共有していれば、音の並びから文字を復元できます。物理層は、この「どんな信号でビットを表すか」という最下層の約束事を担います。
      </Analogy>

      <Heading num="02">伝送媒体 ― 何の中を信号が通るか</Heading>
      <p>信号を運ぶ物理的な通り道を<Term>伝送媒体</Term>といいます。大きく、金属の線に電気を流す<strong>銅線</strong>、光を通す<strong>光ファイバー</strong>、媒体を使わず空間を飛ばす<strong>電波(無線)</strong>の3種類に分かれます。それぞれ速度・距離・ノイズへの強さが異なります。</p>
      <table>
        <tbody>
          <tr><th>媒体</th><th>代表例</th><th>特徴</th></tr>
          <tr><td className="hl">ツイストペアケーブル</td><td>UTP / STP(LANケーブル)</td><td>2本1組をより合わせた銅線。安価で扱いやすく、有線LANの主流。ノイズにやや弱い</td></tr>
          <tr><td className="hl">同軸ケーブル</td><td>かつてのイーサネット・CATV</td><td>芯線を網状の導体で覆った銅線。ノイズに強いが取り回しが硬く、LANでは使われなくなった</td></tr>
          <tr><td className="hl">光ファイバー</td><td>シングルモード / マルチモード</td><td>ガラスや樹脂の芯に光を通す。超高速・長距離・ノイズに極めて強い。基幹回線や長距離に使う</td></tr>
          <tr><td className="hl">電波(無線)</td><td>Wi-Fi・携帯電話</td><td>ケーブル不要で自由度が高い反面、距離・障害物・干渉・盗聴の影響を受けやすい</td></tr>
        </tbody>
      </table>
      <p>ツイストペアケーブルで2本の線を「より合わせている」のは、意図せず飛び込んでくる電気的ノイズを打ち消し合うためです。より合わせの品質や対応周波数によって<Term>カテゴリ(Cat5e・Cat6・Cat6Aなど)</Term>が分かれ、数字が大きいほど高速・高周波に対応します。</p>

      <Aside label="くわしくは">
        「10BASE-T」「1000BASE-T」のような、速度と媒体を組み合わせたイーサネットの規格名は「<Link href="/network/link">データリンク層</Link>」のイーサネットの節で、電波を使う無線の実務は「<Link href="/network/link/wireless">無線LAN(Wi-Fi)</Link>」で扱います。
      </Aside>

      <Heading num="03">光ファイバー ― 光でビットを飛ばす</Heading>
      <p>光ファイバーは、中心の<Term>コア</Term>と、その周りを覆う屈折率の異なる<Term>クラッド</Term>でできています。光がコアとクラッドの境界で全反射を繰り返しながら進むため、遠くまで減衰せずに届きます。電気ではなく光を使うので、電磁ノイズの影響をまったく受けないのが最大の強みです。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>コア径</th><th>用途</th></tr>
          <tr><td className="hl">シングルモード(SMF)</td><td>細い(約9μm)</td><td>光がまっすぐ1本の経路で進む。長距離・高速に向く。事業者の基幹回線など</td></tr>
          <tr><td className="hl">マルチモード(MMF)</td><td>太い(約50μm)</td><td>複数の経路で光が進む。短距離向きで安価。データセンター内など</td></tr>
        </tbody>
      </table>

      <Heading num="04">通信の方向 ― 単方向・半二重・全二重</Heading>
      <p>信号が流れる「向き」にも種類があります。データが一方向にしか流れない<Term>単方向(シンプレックス)</Term>、双方向だが同時には送受信できず交互になる<Term>半二重(ハーフデュプレックス)</Term>、送信と受信を同時に行える<Term>全二重(フルデュプレックス)</Term>の3つです。</p>
      <Diagram caption="半二重は片側ずつ交互に、全二重は送受信を同時に行える。現在の有線LANはほぼ全二重">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#f2f2f2" textAnchor="middle">
            <text x={160} y={22} fill="#9a9a9a">半二重(交互)</text>
            <rect x={40} y={70} width={100} height={40} fill="none" stroke="#5f5f5f" /><text x={90} y={94}>機器A</text>
            <rect x={180} y={70} width={100} height={40} fill="none" stroke="#5f5f5f" /><text x={230} y={94}>機器B</text>
            <line x1={140} y1={82} x2={180} y2={82} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#p-r)" />
            <text x={160} y={140} fill="#9a9a9a" fontSize="10">送信中は逆向きは待つ</text>
          </g>
          <g fontSize="12" fill="#f2f2f2" textAnchor="middle">
            <text x={480} y={22} fill="#9a9a9a">全二重(同時)</text>
            <rect x={360} y={70} width={100} height={40} fill="none" stroke="#5f5f5f" /><text x={410} y={94}>機器A</text>
            <rect x={500} y={70} width={100} height={40} fill="none" stroke="#5f5f5f" /><text x={550} y={94}>機器B</text>
            <line x1={460} y1={78} x2={500} y2={78} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#p-r)" />
            <line x1={500} y1={102} x2={460} y2={102} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#p-l)" />
            <text x={480} y={140} fill="#9a9a9a" fontSize="10">送信と受信が同時に流れる</text>
          </g>
          <defs>
            <marker id="p-r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,1 L8,4.5 L0,8" fill="none" stroke="#39ff6a" /></marker>
            <marker id="p-l" markerWidth="9" markerHeight="9" refX="2" refY="4.5" orient="auto"><path d="M8,1 L0,4.5 L8,8" fill="none" stroke="#39ff6a" /></marker>
          </defs>
        </svg>
      </Diagram>
      <p>かつて1本のケーブルを共有していた時代のイーサネットは半二重で、送信の衝突を避ける<Link href="/network/link">CSMA/CD</Link>が必要でした。現在はスイッチが送信用と受信用の線を分けて使うため全二重が基本となり、衝突そのものが起きなくなっています。</p>

      <Heading num="05">物理層の機器 ― リピータとハブ</Heading>
      <p>物理層だけで動作する機器は、信号の「中身(宛先)」を一切見ません。届いた信号をそのまま扱うだけです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>リピータ</h4>
          <p>減衰した信号を増幅・整形して先へ中継し、ケーブルで届く距離を延ばす機器。宛先は見ず、信号をそのまま押し出す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ハブ(リピータハブ)</h4>
          <p>複数のポートを持つリピータ。あるポートに届いた信号を、宛先を判断せず残り全ポートへそのまま流す。現在はL2スイッチに置き換わった。</p>
        </Card>
      </CardGrid>

      <Aside label="くわしくは">
        ハブと、宛先(MACアドレス)を見て振り分けるL2スイッチ・L3スイッチ・ルーターとの違いは「<Link href="/network/topology">トポロジと接続装置</Link>」で、機器ごとに並べて比較しています。
      </Aside>

      <Heading num="まとめ">物理層の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ビットを信号に変える</h4><p>0と1を、電気・光・電波といった物理的な信号へ符号化して運ぶ、OSIの最下層です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>媒体で速度・距離が決まる</h4><p>ツイストペア・同軸・光ファイバー・電波。ノイズ耐性や距離が異なり、光ファイバーが最も高速・長距離です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>宛先を見ない機器</h4><p>リピータ・ハブは信号を中身を見ずに中継するだけ。宛先で振り分けるのは上位層の機器です。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
            <RelatedLink href="/network/link" tag="ネットワーク">データリンク層 ― MACとイーサネット</RelatedLink>
            <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
