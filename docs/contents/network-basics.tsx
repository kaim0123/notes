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
  title: "ネットワークの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ネットワークの全体像 ― つながる仕組みの地図</h1>
        <Lead>
          コンピュータ同士をつなぐ仕組みを、細かい階層に入る前にまず俯瞰します。ネットワークの大きさを表すLANとWAN、データを運ぶパケット交換の考え方、そして「速さ」を表す転送速度の読み方。この3つを押さえると、この先の階層モデルやIPの話が地図の上に載っていきます。
        </Lead>
      </Hero>

      <Heading num="01">LANとWAN ― ネットワークの「広さ」</Heading>
      <p>ネットワークは、カバーする範囲の広さで大きく2つに分けられます。<Term>LAN(Local Area Network)</Term>は、家庭やオフィス、学校の一室といった<strong>限られた範囲</strong>の中で機器をつなぐネットワークです。自分たちで自由に構築・管理できるのが特徴です。</p>
      <p>これに対し<Term>WAN(Wide Area Network)</Term>は、離れた拠点同士を結ぶ<strong>広い範囲</strong>のネットワークで、通信事業者(キャリア)の回線を借りて構築します。世界中のネットワークがつながり合った巨大なネットワークが<Term>インターネット</Term>です。家庭のLANは、ルーターを通じてこのインターネット(WANの世界)へとつながっています。</p>

      <table>
        <tbody>
          <tr><th></th><th>LAN</th><th>WAN</th></tr>
          <tr><td className="hl">範囲</td><td>建物・フロアなど狭い範囲</td><td>拠点間・都市間など広い範囲</td></tr>
          <tr><td className="hl">管理</td><td>自分たちで構築・管理</td><td>通信事業者の回線を利用</td></tr>
          <tr><td className="hl">例</td><td>家庭内Wi-Fi、社内ネットワーク</td><td>インターネット、拠点間接続</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        LANは「敷地内の私道」、WANは「街と街を結ぶ公道・高速道路」です。私道は自分で自由に整備できますが、遠くへ行くには公道(通信事業者の回線)に出る必要があります。
      </Analogy>

      <Heading num="02">パケット交換 ― データを小包に分けて送る</Heading>
      <p>ネットワークでデータを送るとき、大きなデータをそのまま1本の線で送りきるのではなく、<Term>パケット</Term>と呼ばれる小さな単位に分割して送ります。この方式を<Term>パケット交換</Term>と呼びます。各パケットには宛先の情報が付いており、途中の機器がそれを見てバケツリレーのように運びます。回線を占有しないため、1本の回線を多数の通信で効率よく共有できます。</p>
      <p>これと対照的なのが、通信中ずっと相手との回線を独占し続ける<Term>回線交換</Term>です。昔の固定電話がこの方式で、通話の間は1本の回線を2人だけで専有していました。確実に帯域を確保できる反面、使っていない時間も回線を無駄に押さえてしまいます。今日のインターネットは、効率のよいパケット交換が主流です。</p>

      <Analogy label="💡 たとえるなら">
        回線交換は「1本の電話線を通話中ずっと二人で貸し切る」方式。パケット交換は「荷物を小分けにして宛名を書き、みんなで共用する宅配便に載せる」方式です。共用でも宛名があるから、それぞれ正しい相手に届きます。
      </Analogy>

      <Heading num="03">有線と無線 ― つなぎ方の2系統</Heading>
      <p>機器をネットワークにつなぐ方法は、大きく<strong>有線</strong>と<strong>無線</strong>に分かれます。有線はLANケーブルや光ファイバーで物理的につなぐ方式で、安定して高速なのが利点です。無線はWi-Fiに代表される電波を使う方式で、配線が不要で機器を自由に動かせる反面、電波の干渉や距離の影響を受けます。それぞれの詳しい規格は「<Link href="/network/link">データリンク層と物理層</Link>」「<Link href="/network/link/wireless">無線LAN</Link>」で扱います。</p>

      <Heading num="04">転送速度 ― bpsの読み方</Heading>
      <p>ネットワークの「速さ」は<Term>bps(bits per second、ビット毎秒)</Term>で表します。1秒間に何ビットのデータを送れるかを示す単位で、数字が大きいほど高速です。<code>k(キロ)</code>・<code>M(メガ)</code>・<code>G(ギガ)</code>と桁が上がり、「1Gbps」なら1秒間に約10億ビットを送れる回線を意味します。</p>
      <p>注意したいのは、bpsは<strong>ビット</strong>単位で、ファイルサイズでよく使う<strong>バイト</strong>(1バイト=8ビット)とは8倍違うことです。「100Mbpsの回線」で送れるのは1秒あたり約12.5MB(メガバイト)で、単純に100MBではありません。また、実際の速度は機器や混雑・距離の影響で、理論上の最大値(回線容量)より低くなるのが普通です。</p>

      <Aside label="豆知識">
        カタログの「最大1Gbps」は理論値(ベストエフォート)で、常にその速度が出るわけではありません。実効速度は、経路上でいちばん遅い区間(ボトルネック)に引きずられます。古いLANケーブル1本が全体の速度を決めてしまうこともあります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>LANは狭く、WANは広い</h4><p>自分で管理する狭い範囲がLAN、事業者の回線で結ぶ広い範囲がWAN。その集合体がインターネットです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データは小包で運ぶ</h4><p>パケットに分割し、宛先を頼りに回線を共用しながら運ぶのがパケット交換です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>速さはbpsで、ビット単位</h4><p>bpsは1秒あたりのビット数。バイトとの8倍差と、理論値と実効速度の違いに注意します。</p></Card>
      </CardGrid>
      <p>全体像がつかめたら、次は通信がどう役割分担されているのか、「階層モデル」を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル ― OSI参照モデルとTCP/IP</RelatedLink>
                    <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
                    <RelatedLink href="/network/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
