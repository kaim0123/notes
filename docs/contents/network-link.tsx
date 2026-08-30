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
  title: "データリンク層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>データリンク層 ― 同じネットワークの中で隣へ届ける</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」でいうTCP/IPモデルのネットワークインターフェース層、OSI参照モデルの第2層(データリンク層)にあたるのがこの層です。IPアドレスが「ネットワーク全体での住所」を扱うのに対し、データリンク層は「同じネットワークの中で、すぐ隣の機器へフレームを1つ確実に手渡す」ことに専念します。MACアドレス・イーサネット・スイッチ・無線・PPP・公衆アクセス網まで、隣へ届ける仕組みをまとめて見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">MACアドレス ― 機器に刻まれた固有番号</Heading>
      <p>データリンク層で「同じネットワーク内のどの機器か」を直接特定するのに使うのが<Term>MACアドレス</Term>です。ネットワーク機器(正確にはNIC=ネットワークインターフェースカード)の製造時に割り当てられる<strong>48ビット</strong>の番号で、<code>00-1B-44-11-3A-B7</code>のように8ビットずつ16進数で表します。IPアドレスが「引っ越すと変わる住所」なら、MACアドレスは工場出荷時に刻み込まれた「変わらない製造番号」にあたります。</p>
      <p>48ビットは前半24ビットと後半24ビットに分かれます。前半は<Term>OUI(Organizationally Unique Identifier)</Term>と呼ばれ、IEEEが機器メーカーごとに割り当てる「ベンダー識別番号」です。後半はそのメーカーが機器ごとに重複しないよう振る一連番号で、前半と後半を合わせることで世界中で一意になるよう設計されています。</p>

      <Diagram caption="48ビットのMACアドレスの構造。前半がメーカー、後半が機器の通し番号">
        <svg viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={50} width={260} height={54} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={340} y={50} width={260} height={54} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={170} y={40} fill="#9a9a9a" fontSize="12" textAnchor="middle">前半24ビット</text>
          <text x={470} y={40} fill="#9a9a9a" fontSize="12" textAnchor="middle">後半24ビット</text>
          <text x={170} y={78} fill="#f2f2f2" fontSize="14" textAnchor="middle">00-1B-44</text>
          <text x={470} y={78} fill="#f2f2f2" fontSize="14" textAnchor="middle">11-3A-B7</text>
          <text x={170} y={96} fill="#9a9a9a" fontSize="11" textAnchor="middle">OUI(メーカー識別)</text>
          <text x={470} y={96} fill="#9a9a9a" fontSize="11" textAnchor="middle">機器ごとの通し番号</text>
          <text x={320} y={140} fill="#9a9a9a" fontSize="12" textAnchor="middle">前半+後半で世界中に1つだけの番号になる</text>
        </svg>
      </Diagram>

      <p>MACアドレスは宛先の指定の仕方によって3種類に分けられます。1台の特定機器を宛先にする<Term>ユニキャスト</Term>、同じネットワーク上のすべての機器へ一斉に送る<Term>ブロードキャスト</Term>(宛先を<code>FF-FF-FF-FF-FF-FF</code>にする)、そして特定のグループに属する機器だけに送る<Term>マルチキャスト</Term>です。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>届く相手</th><th>身近な例</th></tr>
          <tr><td className="hl">ユニキャスト</td><td>指定した1台だけ</td><td>普段の1対1の通信</td></tr>
          <tr><td className="hl">ブロードキャスト</td><td>同じネットワーク上の全機器</td><td>ARPによる相手探し</td></tr>
          <tr><td className="hl">マルチキャスト</td><td>特定グループの機器だけ</td><td>動画のライブ配信など</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ユニキャストは「特定の人への手紙」、ブロードキャストは「教室で全員に向けた呼びかけ」、マルチキャストは「部活のメンバーだけに回す連絡網」です。OUIは、いわば製造メーカーごとに割り振られた「郵便番号の上ケタ」のようなもので、番号を見ればどこの会社が作った機器かが分かります。
      </Analogy>

      <Heading num="02">アクセス制御方式 ― 誰がいつ送るかを決める</Heading>
      <p>1本のケーブルや1つの電波空間を複数の機器で共有していると、みんなが好き勝手に送信して信号がぶつかってしまいます。そこで「誰がいつ送ってよいか」を取り決める仕組みが<Term>アクセス制御方式</Term>です。代表的なものにコンテンション方式とトークンパッシング方式があります。</p>

      <h3>コンテンション方式(CSMA/CD)</h3>
      <p><Term>コンテンション方式</Term>は「早い者勝ち」の考え方で、送りたい機器がそれぞれ回線の空きを見て送信します。かつてのイーサネットで使われた<Term>CSMA/CD</Term>がその代表です。送信前に回線が空いているか耳を澄まし(Carrier Sense)、複数機器が同時に送れるようにしつつ(Multiple Access)、それでも信号が衝突(<Term>コリジョン</Term>)したら検知して(Collision Detection)、ランダムな時間だけ待ってから送り直します。</p>

      <Diagram caption="CSMA/CDの流れ。空きを確認して送り、ぶつかったら待って再送する">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#f2f2f2" textAnchor="middle">
            <rect x={30} y={80} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={85} y={100}>回線を</text><text x={85} y={116}>確認</text>
            <rect x={190} y={80} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={245} y={100}>空いていれば</text><text x={245} y={116}>送信</text>
            <rect x={350} y={80} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={405} y={100}>衝突を</text><text x={405} y={116}>検知?</text>
            <rect x={510} y={30} width={110} height={44} fill="none" stroke="#5f5f5f" />
            <text x={565} y={50}>ランダム時間</text><text x={565} y={66}>待って再送</text>
            <rect x={510} y={135} width={110} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={565} y={155}>送信</text><text x={565} y={171}>成功</text>
          </g>
          <g stroke="#39ff6a" strokeWidth="1">
            <line x1={140} y1={102} x2={190} y2={102} />
            <line x1={300} y1={102} x2={350} y2={102} />
          </g>
          <g stroke="#5f5f5f" strokeWidth="1">
            <line x1={460} y1={90} x2={510} y2={58} />
            <line x1={460} y1={112} x2={510} y2={155} />
            <line x1={565} y1={30} x2={565} y2={20} />
            <line x1={565} y1={20} x2={85} y2={20} />
            <line x1={85} y1={20} x2={85} y2={80} />
          </g>
          <text x={485} y={82} fill="#9a9a9a" fontSize="11">あり</text>
          <text x={470} y={132} fill="#9a9a9a" fontSize="11">なし</text>
        </svg>
      </Diagram>

      <Aside label="豆知識">
        無線LANでは、電波は送信中に自分の信号で相手の信号がかき消され「ぶつかったこと自体」を検知しにくいため、衝突を検知するCSMA/CDではなく、あらかじめ衝突を避ける<Term>CSMA/CA</Term>(Collision Avoidance)が使われます。CDが「ぶつかったら対処」、CAが「ぶつからないよう予防」という違いです。
      </Aside>

      <h3>トークンパッシング方式</h3>
      <p><Term>トークンパッシング方式</Term>は「送信権(トークン)」というバトンをネットワーク上で順番に回し、トークンを持っている機器だけが送信できる仕組みです。順番待ちなので原理的に衝突が起きず、混雑時でも性能が安定するのが長所です。かつてのトークンリングやFDDIで採用されました。</p>

      <h3>媒体共有型と媒体非共有型</h3>
      <p>これらの譲り合いが必要なのは、1つの伝送路をみんなで分け合う<Term>媒体共有型ネットワーク</Term>だからです。これに対し、スイッチが機器ごとに専用の伝送路を用意する<Term>媒体非共有型ネットワーク</Term>では、そもそも他機器と回線を共有しないため衝突が起こりません。現在の有線LANはほぼこの媒体非共有型で、CSMA/CDの出番は実質なくなりましたが、考え方は試験で頻出です。</p>

      <Analogy label="💡 たとえるなら">
        コンテンション方式は「一本道で車がすれ違い、ぶつかりそうになったら片方が下がる」やり方、トークンパッシング方式は「発言権のマイクを順番に回し、持っている人だけが話す会議」のやり方です。媒体非共有型は「各自に専用レーンを引いてしまう」ので、そもそも譲り合いが要りません。
      </Analogy>

      <Heading num="03">スイッチ ― MACアドレスでフレームを振り分ける</Heading>
      <p>現在のLANの中心にいるのが<Term>スイッチ(スイッチングハブ)</Term>です。スイッチは受け取ったフレームの宛先MACアドレスを見て、「そのMACアドレスの機器がつながっているポート」だけにフレームを送り出します。関係ないポートには流さないため、無駄な通信が減り、機器ごとに回線が分かれる(媒体非共有型)ので衝突も起きません。</p>

      <h3>MACアドレステーブル ― どのポートに誰がいるか</h3>
      <p>スイッチは「どのポートの先に、どのMACアドレスの機器がいるか」を記録した<Term>MACアドレステーブル</Term>を内部に持ちます。フレームを受け取るたびに送信元MACアドレスと受信ポートの対応を学習して表に書き込み、宛先の場所を表から引いて転送します。表にない宛先はとりあえず全ポートに流し(フラッディング)、返事から場所を学習します。</p>
      <table>
        <tbody>
          <tr><th>ポート番号</th><th>学習したMACアドレス</th></tr>
          <tr><td className="hl">ポート1</td><td>00-1B-44-11-3A-B7</td></tr>
          <tr><td className="hl">ポート3</td><td>00-1B-44-22-9C-01</td></tr>
          <tr><td className="hl">ポート5</td><td>00-25-96-FF-A2-40</td></tr>
        </tbody>
      </table>

      <h3>ループの問題とスパニングツリー(STP)</h3>
      <p>スイッチを複数台つないで冗長化すると、配線が輪(ループ)になることがあります。ループがあると、宛先不明のフレームが延々とスイッチ間を回り続け、ネットワーク全体が麻痺する<Term>ブロードキャストストーム</Term>が起きてしまいます。これを防ぐのが<Term>スパニングツリー(STP)</Term>です。STPはループになっている経路の一部を論理的に「使わない状態(ブロッキング)」にして輪を断ち切り、木(ツリー)状の1本道だけを通信に使います。もし使っている経路が故障すると、待機させていた経路を自動で有効化して通信を復旧させます。</p>

      <Diagram caption="STPはループの一部を遮断して輪を断ち、障害時に切り替える">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#f2f2f2" textAnchor="middle">
            <rect x={270} y={20} width={100} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={320} y={44}>スイッチA</text>
            <rect x={90} y={140} width={100} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={140} y={164}>スイッチB</text>
            <rect x={450} y={140} width={100} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={500} y={164}>スイッチC</text>
          </g>
          <g stroke="#39ff6a" strokeWidth="1.5">
            <line x1={280} y1={60} x2={160} y2={140} />
            <line x1={360} y1={60} x2={480} y2={140} />
          </g>
          <line x1={190} y1={160} x2={450} y2={160} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={320} y={150} fill="#9a9a9a" fontSize="11" textAnchor="middle">この経路をブロッキング(遮断)して</text>
          <text x={320} y={196} fill="#9a9a9a" fontSize="11" textAnchor="middle">輪を断つ。障害時はここを有効化して迂回する</text>
        </svg>
      </Diagram>

      <h3>リンクアグリゲーション・LLDP・VLAN</h3>
      <p>スイッチまわりには、運用を助ける関連技術がいくつもあります。</p>
      <p><Term>リンクアグリゲーション</Term>は、複数のケーブル(リンク)を束ねて論理的に1本の太い回線として扱う技術です。帯域を合算して高速化できるうえ、1本が切れても残りで通信を続けられるので冗長性も高まります。</p>
      <p><Term>LLDP(Link Layer Discovery Protocol)</Term>は、隣接する機器同士が「自分は何者で、どのポートにつながっているか」をお互いに知らせ合うプロトコルです。これにより、どの機器がどこにつながっているかという物理的な接続関係を自動で把握でき、配線図の作成やトラブル調査が楽になります。</p>
      <p><Term>VLAN(Virtual LAN)</Term>は、物理的には1台のスイッチにつながっていても、設定によって複数の独立したネットワークに分ける技術です。配線を変えずに部署ごとにネットワークを分離でき、通信範囲やセキュリティを柔軟に管理できます。</p>

      <Analogy label="💡 たとえるなら">
        MACアドレステーブルは、受付が持つ「内線番号と座席の対応表」です。リンクアグリゲーションは「片側2車線を束ねて広い1本の道にする」こと、LLDPは「隣の席の人と名刺交換して座席表を作る」こと、VLANは「1つの大部屋にパーティションを立てて別々の会議室として使い分ける」ことに例えられます。
      </Analogy>

      <Heading num="04">イーサネット ― 有線LANの標準規格</Heading>
      <p>有線LANでこれらのやり取りを担う標準規格が<Term>イーサネット(Ethernet)</Term>です。1970年代に登場し、当初は1本の同軸ケーブルを全員で共有する媒体共有型でしたが、より対線ケーブルとスイッチを使う形へと進化し、速度も年々向上しながら、有線LANの事実上の標準として使われ続けています。</p>

      <h3>イーサネットの種類</h3>
      <p>イーサネットの規格名は「速度BASE-媒体」という形で表されます。先頭の数字が速度、末尾がケーブルの種類を示します(例: <code>10BASE-T</code>のTはより対線=Twisted pair)。</p>
      <table>
        <tbody>
          <tr><th>規格</th><th>速度</th><th>主な媒体</th></tr>
          <tr><td className="hl">10BASE-T</td><td>10 Mbps</td><td>より対線</td></tr>
          <tr><td className="hl">100BASE-TX</td><td>100 Mbps</td><td>より対線</td></tr>
          <tr><td className="hl">1000BASE-T</td><td>1 Gbps</td><td>より対線</td></tr>
          <tr><td className="hl">10GBASE-T</td><td>10 Gbps</td><td>より対線</td></tr>
          <tr><td className="hl">10GBASE-SR</td><td>10 Gbps</td><td>光ファイバー(短距離)</td></tr>
        </tbody>
      </table>

      <h3>イーサネットのフレームフォーマット</h3>
      <p>イーサネットが送るデータの単位が<Term>フレーム</Term>です。フレームは決まった順序の項目で構成されます。先頭に信号の始まりを知らせる<Term>プリアンブル</Term>、次に宛先MACアドレスと送信元MACアドレス、続いて中身の種類を示す<Term>タイプ</Term>(上位がIPv4かIPv6かなど)、実際に運ぶ<strong>データ</strong>、最後にデータが壊れていないか検査するための<Term>FCS(Frame Check Sequence)</Term>が付きます。</p>

      <Diagram caption="イーサネットフレームの構造。前後を管理情報で挟んでデータを運ぶ">
        <svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="11" fill="#f2f2f2" textAnchor="middle">
            <rect x={20} y={50} width={90} height={44} fill="none" stroke="#5f5f5f" />
            <text x={65} y={70}>プリアンブル</text><text x={65} y={86} fill="#9a9a9a">8</text>
            <rect x={110} y={50} width={90} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={155} y={70}>宛先MAC</text><text x={155} y={86} fill="#9a9a9a">6</text>
            <rect x={200} y={50} width={90} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={245} y={70}>送信元MAC</text><text x={245} y={86} fill="#9a9a9a">6</text>
            <rect x={290} y={50} width={70} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={325} y={70}>タイプ</text><text x={325} y={86} fill="#9a9a9a">2</text>
            <rect x={360} y={50} width={180} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={450} y={70}>データ</text><text x={450} y={86} fill="#9a9a9a">46〜1500</text>
            <rect x={540} y={50} width={80} height={44} fill="none" stroke="#5f5f5f" />
            <text x={580} y={70}>FCS</text><text x={580} y={86} fill="#9a9a9a">4</text>
          </g>
          <text x={320} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">← 先頭から順に送られる(数字は各項目のバイト数)→</text>
          <text x={320} y={124} fill="#9a9a9a" fontSize="11" textAnchor="middle">前のプリアンブルで同期をとり、末尾のFCSでデータ化けを検査する</text>
        </svg>
      </Diagram>

      <Aside label="豆知識">
        FCSは受信側で「送られてきたデータから同じ計算をやり直し、付いてきた検査値と一致するか」を照合します。一致しなければ途中で壊れたと判断してそのフレームを捨てます。正しく届け直す責任はデータリンク層自身ではなく、上位のトランスポート層(TCP)などが担います。
      </Aside>

      <Heading num="05">無線通信 ― ケーブルなしで隣へ届ける</Heading>
      <p>ケーブルの代わりに電波でフレームをやり取りするのが<Term>無線通信</Term>です。配線が不要で機器を自由に置ける反面、電波は共有の空間を飛び交うため、前述のCSMA/CA(衝突を避ける方式)による譲り合いや、盗聴を防ぐ暗号化が重要になります。</p>
      <p>ひとくちに無線といっても、届く距離や用途によっていくつもの種類があります。数十メートル程度をカバーしオフィスや家庭のLANを構成する<Term>無線LAN(Wi-Fi)</Term>、数メートルの近距離で機器同士をつなぐ<Term>Bluetooth</Term>、かざすだけで通信する数センチの<Term>NFC</Term>、そして広域をカバーする携帯電話網(モバイル通信)などです。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>おおよその距離</th><th>主な用途</th></tr>
          <tr><td className="hl">NFC</td><td>数cm</td><td>ICカード、スマホ決済</td></tr>
          <tr><td className="hl">Bluetooth</td><td>数m</td><td>イヤホン、マウスなど機器間接続</td></tr>
          <tr><td className="hl">無線LAN(Wi-Fi)</td><td>数十m</td><td>家庭・オフィスのLAN</td></tr>
          <tr><td className="hl">モバイル通信</td><td>数百m〜数km</td><td>スマホの携帯電話網</td></tr>
        </tbody>
      </table>
      <p>このうち、私たちが最もよく使う無線LAN(Wi-Fi)の規格・周波数帯・暗号化やアクセスポイントの仕組みは、専用のページで詳しく扱います。くわしくは「<Link href="/network/link/wireless">無線LAN(Wi-Fi)</Link>」を参照してください。</p>

      <Heading num="06">PPP ― 1対1でつなぐためのプロトコル</Heading>
      <p><Term>PPP(Point-to-Point Protocol)</Term>は、2つの地点を1対1で直結して通信するためのデータリンク層プロトコルです。もともと電話回線を使ったダイヤルアップ接続などで使われ、相手を認証してから接続を確立する仕組みを備えています。PPPは役割の異なる2つの部品から成ります。</p>
      <table>
        <tbody>
          <tr><th>部品</th><th>正式名</th><th>役割</th></tr>
          <tr><td className="hl">LCP</td><td>Link Control Protocol</td><td>接続の確立・維持・切断や、認証など回線そのものの制御を行う</td></tr>
          <tr><td className="hl">NCP</td><td>Network Control Protocol</td><td>上位で使うIPなどのネットワーク層プロトコルを設定・調整する</td></tr>
        </tbody>
      </table>
      <p>現在よく使われるのは、このPPPをイーサネット上で運ぶ<Term>PPPoE(PPP over Ethernet)</Term>です。光回線やADSLでインターネットに接続する際、プロバイダから配られたIDとパスワードで認証してから接続する方式で、PPPの「相手を認証してつなぐ」仕組みを、家庭のLANでも使えるようにしたものです。</p>

      <Analogy label="💡 たとえるなら">
        PPPは「2者だけで結ぶ専用の直通電話」です。LCPは「もしもし、本人確認をして通話を始めましょう」という通話そのものの段取り、NCPは「では日本語で(=IPで)話しましょう」という中身の言語の取り決めにあたります。PPPoEは、その直通電話をLANケーブルの上に載せて使う工夫です。
      </Analogy>

      <Heading num="07">公衆アクセス網 ― 家や会社から外の世界へ</Heading>
      <p>ここまでは主に構内(LAN)の話でしたが、家庭や企業をインターネットや遠隔地とつなぐには、通信事業者が提供する<Term>公衆アクセス網</Term>(WAN側の回線)を使います。時代とともに主役が入れ替わってきました。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>特徴</th></tr>
          <tr><td className="hl">アナログ電話回線</td><td>従来の電話網。モデムで音声信号に変換して通信する古い方式で、低速</td></tr>
          <tr><td className="hl">ADSL</td><td>電話回線の空き周波数を使い高速化した方式。局からの距離で速度が落ちる</td></tr>
          <tr><td className="hl">FTTH</td><td>光ファイバーを家庭まで直接引き込む方式。高速・安定で現在の主流</td></tr>
          <tr><td className="hl">ケーブルテレビ(CATV)</td><td>テレビ用の同軸ケーブル網を使ってインターネット接続も提供する</td></tr>
          <tr><td className="hl">モバイル通信サービス</td><td>携帯電話網(4G/5Gなど)を使う。配線不要で移動しながら使える</td></tr>
          <tr><td className="hl">専用回線</td><td>拠点間を専有する回線。高価だが帯域と品質が保証される</td></tr>
        </tbody>
      </table>
      <p>物理的な専用回線の代わりに、インターネット上に暗号化した仮想的な専用トンネルを作る技術が<Term>VPN(Virtual Private Network)</Term>です。安価なインターネット回線を使いながら、あたかも専用回線でつながっているかのように、拠点間や在宅勤務者と社内を安全に接続できます。</p>

      <Analogy label="💡 たとえるなら">
        専用回線は「自社だけが通れる専用の私道」、VPNは「公道(インターネット)を通るけれど、中身を誰にも見られない装甲車で運ぶ」ようなものです。私道は安全で快適ですが高価、装甲車は既存の公道を使うので安く済みます。
      </Analogy>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>MACアドレスで「隣」を特定する</h4>
          <p>48ビットの固有番号で同じネットワーク内の機器を指し、スイッチがMACアドレステーブルを使ってフレームを振り分けます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>共有か非共有かで譲り合いが変わる</h4>
          <p>共有型ではCSMA/CDやトークンパッシングで衝突を避け、スイッチによる非共有型では衝突自体が起きません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>有線・無線・WANまで届け方はさまざま</h4>
          <p>イーサネットのフレーム、無線通信、PPP/PPPoE、公衆アクセス網まで、どれも「隣へ確実に手渡す」ための仕組みです。</p>
        </Card>
      </CardGrid>
      <p>フレームを隣へ届けたら、次はその中身であるパケットを、ネットワークをまたいで宛先まで運ぶ番です。1つ上のネットワーク層(IP)へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/link/wireless" tag="ネットワーク">無線LAN(Wi-Fi)</RelatedLink>
            <RelatedLink href="/network/ip" tag="ネットワーク">ネットワーク層 ― IPアドレスと経路</RelatedLink>
            <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
