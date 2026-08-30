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
  title: "無線LAN(Wi-Fi)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>Wi-Fiの仕組み ― 電波でつながるということ</h1>
        <Lead>
          「<Link href="/network/link">データリンク層と物理層</Link>」ではケーブルで隣の機器へ届ける仕組みを見ました。ここでは、そのケーブルの代わりに電波を使う<Term>Wi-Fi</Term>が、どうやって機器をネットワークに参加させているのかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">電波でつながる ― アクセスポイントとSSID</Heading>
      <p>Wi-Fiは、ケーブルの代わりに電波を使って機器をネットワークに参加させる仕組みです。まずは一番シンプルな関係、「電波を発信する側」と「電波を受け取る側」を見ていきます。</p>

      <h3>アクセスポイント ― 電波の中継地点</h3>
      <p><Term>アクセスポイント(AP)</Term>は、有線のネットワークと無線の電波との間を橋渡しする機器です。家庭用のWi-Fiルーターは、ルーター機能とアクセスポイント機能を1台にまとめたものだと考えると理解しやすくなります。</p>

      <h3>SSID ― 電波に付けられた「名前」</h3>
      <p>スマートフォンでWi-Fiの一覧を開くと表示される、あの名前が<Term>SSID(Service Set Identifier)</Term>です。1台のアクセスポイントが複数のSSIDを同時に発信することもあり、例えば「ゲスト用」と「社内用」でSSIDを分け、アクセスできる範囲を分離するといった使い方がされます。</p>

      <Diagram caption="アクセスポイントと複数のクライアント機器の関係(破線は電波によるワイヤレス接続)">
        <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
          <circle cx={320} cy={140} r={110} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <rect x={270} y={110} width={100} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={135} fill="#f2f2f2" fontSize="13" textAnchor="middle">アクセス</text>
          <text x={320} y={152} fill="#f2f2f2" fontSize="13" textAnchor="middle">ポイント</text>
          <text x={320} y={40} fill="#9a9a9a" fontSize="11" textAnchor="middle">SSID: Atlas-Wifi</text>

          <rect x={60} y={20} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={115} y={46} fill="#f2f2f2" fontSize="12" textAnchor="middle">ノートPC</text>

          <rect x={470} y={20} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={525} y={46} fill="#f2f2f2" fontSize="12" textAnchor="middle">スマホ</text>

          <rect x={60} y={215} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={115} y={241} fill="#f2f2f2" fontSize="12" textAnchor="middle">タブレット</text>

          <rect x={470} y={215} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={525} y={241} fill="#f2f2f2" fontSize="12" textAnchor="middle">スマート家電</text>

          <line x1={270} y1={125} x2={170} y2={55} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={370} y1={125} x2={470} y2={55} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={270} y1={155} x2={170} y2={225} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={370} y1={155} x2={470} y2={225} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </Diagram>

      <h3>暗号化と認証 ― 誰でも中身を覗けないようにする</h3>
      <p>電波は空間に広がるため、有線LANと違って近くにいれば誰でも「傍受」できてしまいます。そこで通信内容を暗号化し、正しいパスワードを持つ機器だけが接続・復号できるようにする仕組みが必要です。長らく使われてきた<Term>WPA2</Term>に対し、現在推奨されているのがより強固な暗号方式を採用した<Term>WPA3</Term>です。WPA3では、たとえパスワードが漏れても、過去に傍受した通信を後から解読されにくくする仕組みなどが強化されています。</p>

      <Heading num="02">周波数帯とチャネル ― 電波の「道路」選び</Heading>
      <p>Wi-Fiの電波は、決まった周波数の範囲(帯域)の中を飛んでいます。主に使われるのは<Term>2.4GHz帯</Term>・<Term>5GHz帯</Term>・比較的新しい<Term>6GHz帯</Term>の3つで、それぞれ得意・不得意がまったく違います。</p>

      <table>
        <tbody>
          <tr><th>周波数帯</th><th>到達距離・障害物への強さ</th><th>速度・混雑</th></tr>
          <tr><td className="hl">2.4GHz</td><td>遠くまで届き、壁も通り抜けやすい</td><td>速度は控えめ。電子レンジ等と干渉しやすく混雑しがち</td></tr>
          <tr><td className="hl">5GHz</td><td>2.4GHzより届きにくく、壁に弱い</td><td>高速。チャネル数が多く空いていることが多い</td></tr>
          <tr><td className="hl">6GHz</td><td>5GHzよりさらに届きにくい</td><td>非常に高速。開放されたばかりで空いている</td></tr>
        </tbody>
      </table>

      <h3>チャネル ― 同じ帯域内の「車線」</h3>
      <p>同じ周波数帯の中でも、さらに細かく区切られた「チャネル」という単位で通信します。近くに同じチャネルを使うアクセスポイントが多いと、車線が渋滞するように電波同士がぶつかり合い、速度が落ちます。これを<Term>電波干渉</Term>と呼びます。</p>

      <h3>バンドステアリング ― 空いている車線へ自動で誘導</h3>
      <p>1つのSSIDで2.4GHz・5GHzの両方を発信しているアクセスポイントの多くは、<Term>バンドステアリング</Term>という機能で、接続してきた機器の状況に応じて自動的に空いている・適切な帯域へ誘導しています。</p>

      <Analogy label="💡 たとえるなら">
        2.4GHz・5GHz・6GHzの関係は、遠くまで見晴らしのよい旧道(2.4GHz)と、混雑が少ない代わりに近距離しか通れない新しいバイパス(5GHz・6GHz)の関係に似ています。目的地(通信の距離)によって、どちらの道が向いているかが変わります。
      </Analogy>

      <Heading num="03">規格の進化 ― Wi-Fi 4から7へ</Heading>
      <p>Wi-Fiにも、USBと同じように世代があります。正式な規格名(IEEE 802.11の後ろに付くアルファベット)はわかりにくいため、近年は「Wi-Fi 世代番号」というわかりやすい呼び方が使われています。</p>

      <table>
        <tbody>
          <tr><th>世代名</th><th>正式規格</th><th>主な特徴</th></tr>
          <tr><td className="hl">Wi-Fi 4</td><td>802.11n</td><td>2.4GHz/5GHz両対応が一般化</td></tr>
          <tr><td className="hl">Wi-Fi 5</td><td>802.11ac</td><td>5GHz帯中心、さらに高速化</td></tr>
          <tr><td className="hl">Wi-Fi 6</td><td>802.11ax</td><td>混雑した環境での効率が改善(多数同時接続に強い)</td></tr>
          <tr><td className="hl">Wi-Fi 6E</td><td>802.11ax(6GHz拡張)</td><td>Wi-Fi 6の技術を6GHz帯へ拡張</td></tr>
          <tr><td className="hl">Wi-Fi 7</td><td>802.11be</td><td>複数帯域を同時に束ねるなど、さらなる高速化・低遅延</td></tr>
        </tbody>
      </table>

      <Heading num="04">実運用を支える要素</Heading>

      <h3>ローミング ― 移動しても切れない接続</h3>
      <p>同じSSIDのアクセスポイントを複数台設置しているとき、利用者が移動するにつれて、より電波の強いアクセスポイントへ自動的に接続を切り替える仕組みを<Term>ローミング</Term>と呼びます。オフィスや広い家の中を移動しながらでも、通話や通信が途切れにくくなります。</p>

      <h3>メッシュWi-Fi ― 複数のアクセスポイントが網の目状に協調する</h3>
      <p>1台の強力なアクセスポイントで家全体をカバーしようとすると、電波の弱い場所(デッドスポット)がどうしても生まれます。<Term>メッシュWi-Fi</Term>は、複数の小さなアクセスポイント(ノード)を家中に配置し、ノード同士が無線または有線で連携しながら、利用者から見ると1つの大きなネットワークであるかのように振る舞う仕組みです。</p>

      <h3>PoE ― 電源ケーブルなしで動かす</h3>
      <p>天井や壁の高い位置にアクセスポイントを設置する場合、その場所にコンセントがあるとは限りません。<Term>PoE(Power over Ethernet)</Term>は、LANケーブル1本でデータ通信と電力供給を同時に行う技術で、電源工事なしにアクセスポイントを設置できるようにします。</p>

      <h3>電波強度を数値で見る ― RSSIとSNR</h3>
      <p>Wi-Fiの「電波の強さ」は感覚だけでなく数値でも表されます。<Term>RSSI(Received Signal Strength Indicator)</Term>は受信した電波そのものの強さを表す値で、0に近いほど強く、マイナスが大きいほど弱くなります(例: −50は良好、−80は弱い)。ただし電波が強くても周囲にノイズが多ければ通信品質は下がるため、信号とノイズの比率を表す<Term>SNR(Signal-to-Noise Ratio)</Term>も合わせて見る必要があります。</p>

      <Aside label="豆知識">
        「電波は強いはずなのに遅い」と感じたときは、RSSIだけでなくSNR(周囲の雑音との比率)も疑ってみましょう。強い電波の近くに強いノイズ源があると、数値上は電波が強くても実際の通信品質は下がります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つの視点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>AP・SSID・暗号化が接続の土台</h4>
          <p>誰と、どの名前で、どう安全につながるかを決めます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>周波数帯はトレードオフ</h4>
          <p>2.4/5/6GHzは距離と速度の綱引きで、チャネルとバンドステアリングで最適化します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>規格と運用でカバー範囲・安定性が変わる</h4>
          <p>Wi-Fiの世代、ローミング、メッシュ、PoEが実際の使い心地を左右します。</p>
        </Card>
      </CardGrid>
      <p>有線・無線を含め、隣の機器へどう届けるかを見てきました。それぞれの層の全体像は「階層モデル」で振り返ることができます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/link" tag="ネットワーク">データリンク層と物理層</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
                    <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
