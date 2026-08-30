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
  title: "TCPとUDP",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>TCPとUDP ― 信頼性を取るか、速さを取るか</h1>
        <Lead>
          「TCP/IPの概要」で見たトランスポート層には、性格の異なる2つの代表的なプロトコルがあります。到着を保証する<Term>TCP</Term>と、確認応答を持たない<Term>UDP</Term>です。どちらもポート番号でアプリを振り分ける点は同じですが、その先の設計思想がまったく違います。
        </Lead>
      </Hero>

      <Heading num="00">ポート番号 ― どのアプリ宛かを振り分ける</Heading>
      <p>
        IPアドレスが「どの機器宛か」を表すのに対し、<Term>ポート番号</Term>は「その機器の中のどのアプリ(プロセス)宛か」を表します。TCP・UDPどちらのヘッダにも<Term>送信元ポート番号</Term>と<Term>宛先ポート番号</Term>が入っており、この組み合わせで通信を区別します。
      </p>
      <table>
        <tbody>
          <tr>
            <th>範囲</th>
            <th>分類</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">0〜1023</td>
            <td>ウェルノウンポート</td>
            <td>HTTP=80、HTTPS=443、DNS=53</td>
          </tr>
          <tr>
            <td className="hl">1024〜49151</td>
            <td>登録済みポート</td>
            <td>アプリごとに登録された番号</td>
          </tr>
          <tr>
            <td className="hl">49152〜65535</td>
            <td>動的・プライベートポート</td>
            <td>クライアント側が一時的に使う番号</td>
          </tr>
        </tbody>
      </table>

      <Heading num="01">TCP ― 確認応答と再送で信頼性を確保する</Heading>
      <p>
        <Term>TCP(Transmission Control Protocol)</Term>は、通信を始める前に相手と<Term>コネクション</Term>を確立する<Term>コネクション型</Term>のプロトコルです。接続の確立には<Term>3ウェイハンドシェイク</Term>という3回のやり取りを使います。
      </p>

      <DiagramFrame
        slug="network-tcp-handshake"
        aspect="620 / 340"
        caption="TCPの3ウェイハンドシェイク。クライアントがSYNを送り、サーバーがSYN+ACKで応答し、クライアントがACKを返すことで接続が確立し、その後データ転送が始まる。"
      />

      <p>
        接続後は、送ったデータに<Term>シーケンス番号</Term>を付けて順序を管理し、受信側は受け取るたびに<Term>ACK(確認応答)</Term>を返します。一定時間内にACKが返ってこなければ、データが失われたとみなして<Term>再送</Term>します。受信側では、届いたデータをシーケンス番号順に並べ替えてから上位層に渡すため、送った順序どおりに届くことも保証されます。
      </p>

      <Aside label="つながり">
        接続を終える処理(FINを使った切断)や、送りすぎを防ぐ<Term>ウィンドウ制御(フロー制御)</Term>の詳細は、TCPの仕組みをさらに掘り下げる回で扱います。
      </Aside>

      <Heading num="02">UDP ― 送りっぱなしで速さを優先する</Heading>
      <p>
        <Term>UDP(User Datagram Protocol)</Term>は、接続の確立もACKによる確認も行わない<Term>コネクションレス型</Term>のプロトコルです。送信側はデータ(<Term>データグラム</Term>と呼びます)を送るだけで、届いたかどうかを気にしません。
      </p>

      <DiagramFrame
        slug="network-tcp-udp-compare"
        aspect="720 / 360"
        caption="TCPとUDPの違い。TCPはデータが途中で消失するとタイムアウト後に再送し、確認応答で到着を保証する。UDPはデータグラムを送りっぱなしにし、途中で消失しても検知や再送はされず、到着順の保証もない。"
      />

      <p>
        一見デメリットだらけに見えますが、確認応答の往復が無い分オーバーヘッドが小さく、少しくらいデータが欠けても支障が出にくい用途(音声・映像のストリーミング、リアルタイム性が優先されるゲームなど)や、そもそもやり取りが1往復で済む軽い問い合わせ(DNSの名前解決など)に向いています。
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>TCP</th>
            <th>UDP</th>
          </tr>
          <tr>
            <td className="hl">接続</td>
            <td>コネクション型(3ウェイハンドシェイク)</td>
            <td>コネクションレス型</td>
          </tr>
          <tr>
            <td className="hl">信頼性</td>
            <td>確認応答・再送あり</td>
            <td>確認応答・再送なし</td>
          </tr>
          <tr>
            <td className="hl">順序保証</td>
            <td>あり(シーケンス番号で並べ替え)</td>
            <td>なし</td>
          </tr>
          <tr>
            <td className="hl">速度・オーバーヘッド</td>
            <td>やや遅い・大きい</td>
            <td>速い・小さい</td>
          </tr>
          <tr>
            <td className="hl">代表的な用途</td>
            <td>Web、メール、ファイル転送</td>
            <td>動画・音声配信、DNS、オンラインゲーム</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        TCPは「配達記録付きの書留郵便」です。相手に届いたかどうかを確認し、届いていなければもう一度送ります。UDPは「はがき」です。出したら出しっぱなしで、届いたかどうかは送った側には分かりませんが、その分手軽で速く出せます。
      </Analogy>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ポート番号でアプリを区別</h4>
          <p>IPアドレスが機器を、ポート番号がその機器内のアプリを指定します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>TCPは信頼性、UDPは速さ</h4>
          <p>確認応答・再送・順序保証を持つTCPと、持たない代わりに軽いUDP、という真逆の設計です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>用途で使い分ける</h4>
          <p>正確さが要るWebやメールはTCP、速さやリアルタイム性が要る配信やDNSはUDPを使います。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/tcp-udp" />
    </DocsPage>
  );
}
