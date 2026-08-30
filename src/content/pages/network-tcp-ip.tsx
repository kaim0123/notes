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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "TCP/IPの概要",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>TCP/IPの概要 ― プロトコルを積み木のように重ねる考え方</h1>
        <Lead>
          「通信する」という1つの仕事を、1枚岩のプログラムではなく、役割ごとに積み重なった層(プロトコルスタック)として設計する ― これがTCP/IPの土台になる考え方です。ここではOSI参照モデルとの対応、そして各層がデータに荷札を付け足していく「カプセル化」の仕組みを押さえ、以降のネットワークの話全体で使う地図を作ります。
        </Lead>
      </Hero>

      <Heading num="00">なぜ「階層」で考えるのか</Heading>
      <p>
        もし通信の仕組みが1つの巨大なプログラムだったらどうなるでしょうか。Wi-Fiを有線LANに変えるだけでも、暗号化方式を追加するだけでも、プログラム全体を書き直す必要が出てきます。そこでTCP/IPは、通信を役割ごとの<Term>層(レイヤー)</Term>に分け、各層は「すぐ上の層」「すぐ下の層」とだけ決まった約束(インタフェース)でやり取りする、という設計を取ります。これを<Term>階層化</Term>と呼びます。
      </p>
      <p>
        層を分けておけば、ある層の中身(例: 物理層をWi-Fiから有線に変える)を差し替えても、他の層は何も変更せずに済みます。これが<Term>プロトコルスタック</Term>という考え方の狙いです。
      </p>

      <Analogy label="💡 たとえるなら">
        手紙を送るとき、あなたは「便箋に手紙を書く」ことだけを考えればよく、「その手紙を封筒に入れる」「切手を貼ってポストに入れる」「郵便局が仕分けてトラックで運ぶ」といった作業は、それぞれ別の担当者・別の仕組みが引き受けます。あなたは配送ルートを気にしなくていいし、郵便局は手紙の中身を気にしなくていい ― 階層化はこの「役割分担」をプロトコルの世界に持ち込んだものです。
      </Analogy>

      <Heading num="01">OSI参照モデルとTCP/IPモデル</Heading>
      <p>
        通信を層に分ける考え方には、2つの有名なモデルがあります。<Term>OSI参照モデル</Term>は、通信の役割を7つに細かく分類した、ISOが定めた教科書的な参照モデルです。一方、実際にインターネットで使われているのは、もともとアメリカ国防総省の研究(ARPANET)から生まれた<Term>TCP/IPモデル</Term>で、こちらは4つの層にまとめられています。
      </p>

      <DiagramFrame
        slug="network-tcpip-osi-mapping"
        aspect="620 / 440"
        caption="OSI参照モデル7層とTCP/IPモデル4層の対応。OSIのアプリケーション層・プレゼンテーション層・セッション層はTCP/IPのアプリケーション層1つにまとまり、データリンク層と物理層はネットワークインターフェース層1つにまとまる。トランスポート層とネットワーク層(インターネット層)はほぼ1対1で対応する。"
      />

      <p>実務やこのサイトでは、以降もこのTCP/IPの4層を基準に話を進めます。各層の役割は次の通りです。</p>

      <table>
        <tbody>
          <tr>
            <th>層</th>
            <th>役割</th>
          </tr>
          <tr>
            <td className="hl">アプリケーション層</td>
            <td>アプリ同士がどんなメッセージをやり取りするかの約束(Webページの取得方法、メールの形式など)</td>
          </tr>
          <tr>
            <td className="hl">トランスポート層</td>
            <td>どのアプリ(プロセス)宛かの振り分けと、データを確実に届けるかどうかの制御</td>
          </tr>
          <tr>
            <td className="hl">インターネット層</td>
            <td>異なるネットワークをまたいで、宛先まで経路を選んで届ける(ルーティング)</td>
          </tr>
          <tr>
            <td className="hl">ネットワークインターフェース層</td>
            <td>同じLANの中で、実際に信号として電気・電波・光にのせて伝える</td>
          </tr>
        </tbody>
      </table>

      <Aside label="つながり">
        「インターネット層」の中身(IPアドレスの割り当てと経路選択)は「IPv4アドレッシングの基礎」、「トランスポート層」の中身(TCPとUDPの違い)は「TCPとUDP」、「ネットワークインターフェース層」の中身(LANの中の伝送)は「イーサネットLANの基礎」で、それぞれこのあと専用ページとして掘り下げます。
      </Aside>

      <Heading num="02">カプセル化 ― ヘッダを重ねて運ぶ</Heading>
      <p>
        層を降りるたびに、データには「その層を担当する荷札」が1枚ずつ追加されていきます。この仕組みを<Term>カプセル化</Term>と呼び、追加される荷札を<Term>ヘッダ</Term>(まれに末尾に付くものは<Term>トレーラ</Term>)と呼びます。層ごとに、この「データ+荷札」のかたまりには決まった呼び名(<Term>PDU</Term>、Protocol Data Unit)が付きます。
      </p>

      <DiagramFrame
        slug="network-tcpip-encapsulation"
        aspect="980 / 260"
        caption="カプセル化の流れ。アプリケーション層のデータに、トランスポート層でTCPヘッダが付いてセグメントになり、インターネット層でIPヘッダが付いてパケットになり、ネットワークインターフェース層でイーサネットヘッダとトレーラが付いてフレームになる。下の層に渡るたびにヘッダ(まれにトレーラ)が1つずつ外側に追加されていく。"
      />

      <p>
        受信側では、この逆再生が行われます。フレームを受け取ったら一番外側のイーサネットヘッダ/トレーラを外してパケットを取り出し、IPヘッダを外してセグメントを取り出し、TCPヘッダを外して元のデータを取り出す ― この「荷札を1枚ずつ剥がして上の層へ渡す」処理を<Term>非カプセル化</Term>と呼びます。
      </p>

      <Heading num="03">各層の代表的なプロトコル</Heading>
      <p>層ごとに、実際にどんな名前のプロトコルが動いているかを一覧にしておきます。名前だけでも見覚えがあると、以降の各層のページが読みやすくなります。</p>

      <table>
        <tbody>
          <tr>
            <th>層</th>
            <th>代表的なプロトコル</th>
          </tr>
          <tr>
            <td className="hl">アプリケーション層</td>
            <td>HTTP/HTTPS、DNS、SMTP・POP3・IMAP、SSH</td>
          </tr>
          <tr>
            <td className="hl">トランスポート層</td>
            <td>TCP、UDP</td>
          </tr>
          <tr>
            <td className="hl">インターネット層</td>
            <td>IP、ICMP、ARP</td>
          </tr>
          <tr>
            <td className="hl">ネットワークインターフェース層</td>
            <td>イーサネット、Wi-Fi(IEEE 802.11)</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>階層化は差し替えのため</h4>
          <p>役割ごとに層を分けることで、ある層の中身だけを他に影響させずに差し替えられます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>OSIは教科書、TCP/IPは実務</h4>
          <p>OSIの7層は教育用の参照モデル、実際にインターネットが使うのはTCP/IPの4層です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>カプセル化と非カプセル化は対</h4>
          <p>送信側は層を降りるたびにヘッダを重ね、受信側は層を上るたびにヘッダを剥がします。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/tcp-ip" />
    </DocsPage>
  );
}
