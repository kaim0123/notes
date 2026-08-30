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
  title: "トランスポート層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>トランスポート層 ― 届いたデータを正しいアプリへ</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」で見たトランスポート層は、ネットワーク層が運んできたデータを「どのアプリケーションに渡すか」を決め、通信の信頼性を担う層です。ここには「確実さ」を優先するTCPと「速さ」を優先するUDPという2つの選択肢があり、どちらを使うかはポート番号とセットで指定されます。ポート番号・TCP・UDPの中身から、実際のヘッダのビット配置まで順に見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">トランスポート層の役割とポート番号</Heading>
      <p>ネットワーク層(<Link href="/network/ip">IP</Link>)がやってくれるのは、データを「あの建物まで」運ぶことだけです。しかし1台のコンピュータでは、Webサーバーもメールサーバーも同時に動いています。「建物に届いた荷物を、どの部屋の誰に渡すか」を決めるのがトランスポート層の仕事です。この「部屋番号」にあたるのが<Term>ポート番号</Term>です。</p>
      <p>ポート番号は<Term>0〜65535</Term>の範囲を持つ16ビットの数値です。IPアドレスが「建物の住所」だとすれば、ポート番号は「部屋番号」にあたり、1つの住所(IP)の中にWebサーバー用の部屋(80番)、メールサーバー用の部屋(25番)が同時に存在できるイメージです。どのTCP/UDP通信も、宛先のIPアドレスに加えてこのポート番号を指定することで、正しいアプリケーションへ届きます。</p>

      <Analogy label="💡 たとえるなら">
        IPアドレスがマンションの「建物の住所」なら、ポート番号は「部屋番号」です。荷物(データ)はまず建物まで届き、そこから部屋番号を見て正しい住人(アプリ)に手渡されます。番号がなければ、届いた荷物を誰に渡せばよいのか分かりません。
      </Analogy>

      <p>よく使われるサービスには、あらかじめ決まった番号が割り当てられています。この0〜1023の予約済み番号を<Term>ウェルノウンポート</Term>と呼びます。代表的なものは丸暗記しておく価値があります。</p>
      <table>
        <tbody>
          <tr><th>ポート番号</th><th>プロトコル</th><th>役割</th></tr>
          <tr><td className="hl">21</td><td>FTP</td><td>ファイル転送</td></tr>
          <tr><td className="hl">22</td><td>SSH</td><td>暗号化されたリモート操作</td></tr>
          <tr><td className="hl">25</td><td>SMTP</td><td>メール送信</td></tr>
          <tr><td className="hl">53</td><td>DNS(domain)</td><td>ドメイン名とIPの変換</td></tr>
          <tr><td className="hl">80</td><td>HTTP</td><td>Web(平文)</td></tr>
          <tr><td className="hl">110</td><td>POP3</td><td>メール受信(端末にダウンロード)</td></tr>
          <tr><td className="hl">143</td><td>IMAP</td><td>メール受信(サーバー上で管理)</td></tr>
          <tr><td className="hl">443</td><td>HTTPS</td><td>Web(暗号化)</td></tr>
        </tbody>
      </table>
      <p>URLの<code>https://example.com:8080</code>のように、コロンに続けて書かれる数字も、この意味のポート番号です。省略時は<code>https</code>なら443、<code>http</code>なら80が自動的に使われます(「<Link href="/network/applications/web">Webの仕組み</Link>」参照)。</p>

      <Aside label="紛らわしい「ポート」">
        同じ「ポート」でも、USBポートのような<strong>物理的な差込口</strong>や、設計上の<strong>インターフェース</strong>(Hexagonal Architectureのポート)は、この通信のポート番号とは技術的に無関係です。言葉が同じでも実体は別物で、設計上のポートは「<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link>」で扱います。
      </Aside>

      <Heading num="02">TCP ― 信頼性のある通信</Heading>
      <p><Term>TCP(Transmission Control Protocol)</Term>は、届いたかどうかを確認し合いながら確実にデータを届ける方式です。相手と事前に接続を確立する<strong>コネクション型</strong>で、順序保証・再送によってデータの欠けや入れ替わりを防ぎます。Web(HTTP)やメール送信、ファイル転送など、1文字でも欠けたら困る通信に使われます。</p>

      <h3>3ウェイハンドシェイク ― 通信を始める前の握手</h3>
      <p>TCPはいきなりデータを送りません。まず「これから通信していいですか」「いいですよ」「では始めます」という3回のやり取りで接続を確立します。これを<Term>3ウェイハンドシェイク</Term>と呼びます。<code>SYN</code>(接続要求)、<code>SYN+ACK</code>(要求への応答と自分からの要求)、<code>ACK</code>(応答の確認)という3つのパケットが行き交います。</p>

      <Diagram caption="3ウェイハンドシェイク。SYN → SYN+ACK → ACK の3往復で接続が確立する">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="13" fill="#f2f2f2" textAnchor="middle">
            <text x={110} y={28}>クライアント</text>
            <text x={530} y={28}>サーバー</text>
          </g>
          <line x1={110} y1={40} x2={110} y2={230} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={530} y1={40} x2={530} y2={230} stroke="#5f5f5f" strokeWidth="1" />

          <line x1={110} y1={70} x2={530} y2={100} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={78} fill="#39ff6a" fontSize="12" textAnchor="middle">① SYN(接続したい)</text>

          <line x1={530} y1={130} x2={110} y2={160} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={138} fill="#39ff6a" fontSize="12" textAnchor="middle">② SYN+ACK(いいよ。そちらは?)</text>

          <line x1={110} y1={190} x2={530} y2={220} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={198} fill="#39ff6a" fontSize="12" textAnchor="middle">③ ACK(了解。始めます)</text>

          <text x={320} y={248} fill="#9a9a9a" fontSize="11" textAnchor="middle">3回のやり取りが終わってはじめて、実データの送受信が始まる</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        電話をかけるときの最初のやり取りに似ています。「もしもし(SYN)」「はい、もしもし。聞こえますか?(SYN+ACK)」「聞こえます、では本題を(ACK)」。この確認が済んでから本題に入るので、相手が不在のまま一方的に話し続ける事故を防げます。
      </Analogy>

      <h3>確認応答・シーケンス番号 ― 抜けや順序を管理する</h3>
      <p>TCPは送ったデータの1バイトずつに<Term>シーケンス番号</Term>という通し番号を振ります。受け取った側は「ここまで正しく受け取りました。次はこの番号から下さい」という<Term>確認応答(ACK)</Term>を返します。送信側は一定時間ACKが返ってこなければ、データが失われたとみなして同じデータを<strong>再送</strong>します。この仕組みにより、途中で欠けたり順番が入れ替わったりしても、受信側で元通りに組み立て直せます。</p>

      <h3>MSS・ウィンドウ制御・フロー制御 ― 効率よく大量に送る</h3>
      <p>1回のTCPセグメントに載せられるデータの最大サイズを<Term>MSS(最大セグメント長)</Term>と呼びます。大きなデータはこのサイズに分割して送られます。</p>
      <p>また、1つ送るたびにACKを待っていては効率が悪いため、TCPは<strong>ACKを待たずに複数のセグメントをまとめて送る</strong>ことができます。「ACKを待たずに送ってよい量」を<Term>ウィンドウ</Term>と呼び、ACKが返るたびにこの範囲をずらしながら連続送信する仕組みを<Term>スライディングウィンドウ</Term>といいます。さらに受信側は、自分の処理が追いつかないときに「今はこれ以上送らないで」と受信可能な残量(ウィンドウサイズ)を通知します。これを<Term>フロー制御</Term>と呼び、受信側があふれる(バッファオーバーフロー)のを防ぎます。</p>

      <Aside label="豆知識">
        フロー制御が「受信相手のペースに合わせる」仕組みなのに対し、<Term>輻輳(ふくそう)制御</Term>は「ネットワーク全体の混雑に合わせる」仕組みです。送り始めは少量から始め、うまく届くうちは送信量を増やし、パケット損失を検知すると一気に減らす、といった制御でネットワークの渋滞崩壊を防ぎます。
      </Aside>

      <table>
        <tbody>
          <tr><th>用語</th><th>役割</th></tr>
          <tr><td className="hl">シーケンス番号</td><td>データに通し番号を振り、順序と抜けを管理する</td></tr>
          <tr><td className="hl">確認応答(ACK)</td><td>「ここまで受け取った」を通知。返らなければ再送する</td></tr>
          <tr><td className="hl">MSS</td><td>1セグメントに載せられるデータの最大サイズ</td></tr>
          <tr><td className="hl">スライディングウィンドウ</td><td>ACKを待たず複数セグメントをまとめて送る効率化</td></tr>
          <tr><td className="hl">フロー制御</td><td>受信側の処理能力に合わせ送信量を調整する</td></tr>
        </tbody>
      </table>

      <Heading num="03">UDP ― 速さとリアルタイム性を重視する</Heading>
      <p>一方の<Term>UDP(User Datagram Protocol)</Term>は、確認を省いてとにかく速く送る方式です。3ウェイハンドシェイクのような接続の確立をせず(<strong>コネクションレス型</strong>)、順序保証も再送もありません。ヘッダも軽いため、遅延やオーバーヘッドを最小限に抑えられます。</p>
      <p>「送りっぱなし」というと頼りなく聞こえますが、これが有利になる場面があります。音声通話や動画のライブ配信では、数フレーム欠けたデータをわざわざ再送してもらうより、多少欠けても<strong>今この瞬間の映像・音声</strong>が届く方が重要です。またDNSの問い合わせのように「1往復で済む短い通信」では、わざわざ接続を確立するTCPの手続きが無駄になります。こうしたリアルタイム性・軽量性が求められる場面でUDPが選ばれます。</p>

      <table>
        <tbody>
          <tr><th></th><th>TCP</th><th>UDP</th></tr>
          <tr><td className="hl">接続</td><td>コネクション型(3ウェイハンドシェイクで確立)</td><td>コネクションレス型</td></tr>
          <tr><td className="hl">信頼性</td><td>順序保証・確認応答・再送あり</td><td>保証なし(送りっぱなし)</td></tr>
          <tr><td className="hl">速度・軽さ</td><td>確認や制御のぶん重い</td><td>ヘッダが軽く低遅延</td></tr>
          <tr><td className="hl">ヘッダ長</td><td>20バイト以上</td><td>8バイト固定</td></tr>
          <tr><td className="hl">向く用途</td><td>Web・メール・ファイル転送</td><td>DNS・VoIP(音声通話)・動画配信・ゲーム</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        TCPは「配達を確認する書留郵便」、UDPは「拡声器での実況アナウンス」です。書留は確実に届く代わりに手続きが増えます。実況は聞き逃した一言を言い直してはくれませんが、常に「今」の状況が途切れず流れ続けます。スポーツの生中継に向いているのは後者です。
      </Analogy>

      <Heading num="04">その他のトランスポートプロトコル</Heading>
      <p>実務ではTCPとUDPがほとんどですが、両者の「中間」を狙ったプロトコルもいくつか存在します。名前と特徴だけ押さえておきましょう。</p>
      <table>
        <tbody>
          <tr><th>プロトコル</th><th>特徴</th></tr>
          <tr><td className="hl">UDP-Lite</td><td>UDPの派生。チェックサムでデータ全体ではなく<strong>一部だけ</strong>を検査する。多少データが壊れても届けたい音声・動画向けで、壊れたら即破棄するUDPの弱点を補う</td></tr>
          <tr><td className="hl">SCTP</td><td>TCPのように信頼性・順序保証を持ちつつ、1つの接続で<strong>複数のストリームを並行</strong>して送れる(先頭のつまりが後続を止めない)。複数の経路を束ねる冗長性(マルチホーミング)も特徴</td></tr>
          <tr><td className="hl">DCCP</td><td>コネクションを確立し輻輳制御は行うが、<strong>再送はしない</strong>。信頼性より即時性を優先しつつ、UDPに欠けていた混雑対策だけは欲しい用途に向く</td></tr>
        </tbody>
      </table>
      <Aside label="豆知識">
        近年のWeb(HTTP/3)で使われる<code>QUIC</code>は、UDPの上に信頼性や暗号化を独自に載せて、TCP+TLSに近い機能を実現しています。「土台はUDP、その上で必要な信頼性を自前で用意する」という発想は、UDPの軽さを活かす現代的なアプローチです。
      </Aside>

      <Heading num="05">UDPヘッダフォーマット</Heading>
      <p>UDPのヘッダは非常にシンプルで、わずか<strong>8バイト(32ビット × 2行)</strong>だけです。この軽さがUDPの低遅延を支えています。含まれるのは次の4つのフィールドだけです。</p>

      <Diagram caption="UDPヘッダ(8バイト)。1行が32ビット、各フィールドは16ビットずつ">
        <svg viewBox="0 0 640 170" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="11" fill="#9a9a9a" textAnchor="middle">
            <text x={200} y={20}>0 〜 15 ビット</text>
            <text x={460} y={20}>16 〜 31 ビット</text>
          </g>
          <g fontSize="13" fill="#f2f2f2" textAnchor="middle">
            <rect x={40} y={30} width={280} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={180} y={57}>送信元ポート番号</text>
            <rect x={320} y={30} width={280} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={460} y={57}>宛先ポート番号</text>

            <rect x={40} y={74} width={280} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={180} y={101}>パケット長</text>
            <rect x={320} y={74} width={280} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={460} y={101}>チェックサム</text>
          </g>
          <text x={320} y={150} fill="#9a9a9a" fontSize="11" textAnchor="middle">この8バイトの下に、実際に送りたいデータ(ペイロード)が続く</text>
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>フィールド</th><th>意味</th></tr>
          <tr><td className="hl">送信元ポート番号</td><td>送り主のアプリを示すポート(16ビット)</td></tr>
          <tr><td className="hl">宛先ポート番号</td><td>届け先のアプリを示すポート(16ビット)</td></tr>
          <tr><td className="hl">パケット長</td><td>ヘッダ+データの合計バイト数</td></tr>
          <tr><td className="hl">チェックサム</td><td>データが壊れていないかの検査値</td></tr>
        </tbody>
      </table>

      <Heading num="06">TCPヘッダフォーマット</Heading>
      <p>信頼性を担う分、TCPのヘッダはUDPよりずっと複雑で、オプションを除いても<strong>20バイト(32ビット × 5行)</strong>あります。シーケンス番号や確認応答番号、コントロールフラグなど、これまで見てきた制御の仕組みがそのままフィールドとして現れます。</p>

      <Diagram caption="TCPヘッダ(オプションなしで20バイト)。1行が32ビット">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="13" fill="#f2f2f2" textAnchor="middle">
            <rect x={40} y={20} width={280} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={180} y={43}>送信元ポート番号</text>
            <rect x={320} y={20} width={280} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={460} y={43}>宛先ポート番号</text>

            <rect x={40} y={58} width={560} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={320} y={81}>シーケンス番号</text>

            <rect x={40} y={96} width={560} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={320} y={119}>確認応答番号(ACK番号)</text>

            <rect x={40} y={134} width={90} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={85} y={151} fontSize="11">データ</text><text x={85} y={165} fontSize="11">オフセット</text>
            <rect x={130} y={134} width={90} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={175} y={157} fontSize="11" fill="#9a9a9a">予約</text>
            <rect x={220} y={134} width={160} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={300} y={151} fontSize="11">コントロール</text><text x={300} y={165} fontSize="11">フラグ</text>
            <rect x={380} y={134} width={220} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={490} y={157}>ウィンドウサイズ</text>

            <rect x={40} y={172} width={280} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={180} y={195}>チェックサム</text>
            <rect x={320} y={172} width={280} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={460} y={195}>緊急ポインタ</text>

            <rect x={40} y={210} width={560} height={38} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
            <text x={320} y={233} fill="#9a9a9a">オプション(可変長・省略可)</text>
          </g>
          <text x={320} y={272} fill="#9a9a9a" fontSize="11" textAnchor="middle">緑枠=これまで登場した信頼性・効率化の仕組みに対応するフィールド</text>
        </svg>
      </Diagram>

      <p>コントロールフラグは、そのセグメントの役割を示す6つのビットです。3ウェイハンドシェイクや切断で使われる重要な部分です。</p>
      <table>
        <tbody>
          <tr><th>フラグ</th><th>意味</th></tr>
          <tr><td className="hl">URG</td><td>緊急に処理すべきデータがある(緊急ポインタが有効)</td></tr>
          <tr><td className="hl">ACK</td><td>確認応答番号が有効。「ここまで受け取った」を示す</td></tr>
          <tr><td className="hl">PSH</td><td>バッファにためず、すぐアプリへ渡すよう促す</td></tr>
          <tr><td className="hl">RST</td><td>接続を強制的にリセット(切断)する</td></tr>
          <tr><td className="hl">SYN</td><td>接続の確立を要求する(ハンドシェイクの開始)</td></tr>
          <tr><td className="hl">FIN</td><td>データ送信の終了を通知する(切断手続きの開始)</td></tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr><th>フィールド</th><th>意味</th></tr>
          <tr><td className="hl">送信元 / 宛先ポート番号</td><td>送り主と届け先のアプリを示すポート(各16ビット)</td></tr>
          <tr><td className="hl">シーケンス番号</td><td>送信データに振る通し番号。順序と抜けを管理する</td></tr>
          <tr><td className="hl">確認応答番号</td><td>「次はこの番号から下さい」を示すACKの値</td></tr>
          <tr><td className="hl">データオフセット</td><td>ヘッダの長さ(=データ本体がどこから始まるか)</td></tr>
          <tr><td className="hl">予約</td><td>将来の拡張用。通常は0</td></tr>
          <tr><td className="hl">コントロールフラグ</td><td>URG/ACK/PSH/RST/SYN/FINの6ビット</td></tr>
          <tr><td className="hl">ウィンドウサイズ</td><td>ACKを待たずに受け取れる残量。フロー制御に使う</td></tr>
          <tr><td className="hl">チェックサム</td><td>データが壊れていないかの検査値</td></tr>
          <tr><td className="hl">緊急ポインタ</td><td>URGが立っているとき、緊急データの位置を示す</td></tr>
          <tr><td className="hl">オプション</td><td>MSSの通知など拡張情報(可変長・省略可)</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ポート番号は部屋番号</h4><p>IPが建物なら、ポート番号(0〜65535)はどのアプリ宛てかを示す部屋番号。80=HTTP、443=HTTPSなどのウェルノウンポートがあります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>TCPは確実、UDPは高速</h4><p>TCPは3ウェイハンドシェイク・ACK・再送・ウィンドウ制御で信頼性を担保。UDPは軽く低遅延で、DNS・VoIP・動画配信に向きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ヘッダに仕組みが現れる</h4><p>UDPは8バイトで最小限。TCPは20バイトで、シーケンス番号やフラグ(SYN/ACK/FINなど)として制御の仕組みが刻まれています。</p></Card>
      </CardGrid>
      <p>次は、このポートの先で実際にやり取りされているHTTPなどのアプリケーション層プロトコルを見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/ip" tag="ネットワーク">ネットワーク層 ― IPアドレスと経路</RelatedLink>
            <RelatedLink href="/network/applications" tag="ネットワーク">アプリケーション層</RelatedLink>
            <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
