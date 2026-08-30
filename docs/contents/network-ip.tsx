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
  title: "ネットワーク層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ネットワーク層 ― 別のネットワークへパケットを届ける</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」で見たネットワーク層(TCP/IPモデルではインターネット層)は、離れたネットワークにいる相手へパケットを届け、その道すじ(経路)を選ぶ層です。主役はIPアドレスという「住所」と、次にどこへ渡すかを判断するルーティング。ここではIPアドレスの構造からIPv6、ヘッダの中身、IPを支える補助プロトコルまでを一気に整理します。
        </Lead>
      </Hero>

      <Heading num="01">経路制御(ルーティング) ― 次にどこへ渡すか</Heading>
      <p><Term>データリンク層</Term>が「同じネットワーク内の隣の機器へ確実に届ける」役割だったのに対し、ネットワーク層は「別のネットワークにいる相手まで、いくつものルーターをバケツリレーで越えて届ける」役割を担います。この「宛先までの道すじを選ぶ」仕事を<Term>経路制御(ルーティング)</Term>と呼びます。</p>
      <p>ルーターは、パケットを1つ受け取るたびに宛先IPアドレスを見て「次にどのルーターへ渡すか(ネクストホップ)」だけを判断します。ゴールまでの全経路を1台が把握しているわけではなく、各ルーターが自分の担当区間だけを判断し、それが連なって最終的に相手へ届く仕組みです。</p>

      <h3>経路制御表(ルーティングテーブル)</h3>
      <p>その判断のよりどころが<Term>経路制御表(ルーティングテーブル)</Term>です。「宛先ネットワークがどこなら、次にどこへ渡すか」を並べた一覧表で、ルーターは宛先IPアドレスと最も長く一致する行(ロンゲストマッチ)を選びます。どの行にも一致しない宛先は、最後の受け皿である<Term>デフォルトルート</Term>へ送られます。</p>

      <table>
        <tbody>
          <tr><th>宛先ネットワーク</th><th>ネクストホップ</th><th>意味</th></tr>
          <tr><td className="hl">192.168.1.0/24</td><td>(直接接続)</td><td>同じネットワーク内は経由なしで直接届く</td></tr>
          <tr><td className="hl">10.0.0.0/8</td><td>192.168.1.254</td><td>この宛先はこのルーターへ渡す</td></tr>
          <tr><td className="hl">0.0.0.0/0</td><td>192.168.1.1</td><td>どの行にも一致しない宛先はすべてここ(デフォルトルート)へ</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ルーティングは、行き先を知らない配達員のリレーに似ています。それぞれの交差点に立つ標識(ルーティングテーブル)は「この方面ならこちらの道」としか教えてくれませんが、標識をたどるうちに荷物は目的地へ着きます。該当する案内がなければ「とりあえず幹線道路(デフォルトルート)へ」と示されます。
      </Analogy>

      <Heading num="02">IPアドレスの構造 ― ネットワーク部とホスト部</Heading>
      <p><Term>IPアドレス</Term>は、通信相手を特定するためのネットワーク上の「住所」です。従来の<Term>IPv4</Term>は32ビットで、<code>192.168.1.10</code>のように8ビットずつ4つに区切って10進数で表記します。組み合わせは約43億通りです。</p>
      <p>IPアドレスは2つの部分に分かれます。前半の<Term>ネットワーク部</Term>は「どのネットワークに属するか(町名にあたる)」を、後半の<Term>ホスト部</Term>は「そのネットワーク内のどの機器か(番地にあたる)」を表します。ルーターがまず見るのはネットワーク部で、ホスト部は最終的な配達先の識別に使われます。</p>

      <h3>IPアドレスのクラス(A / B / C / D / E)</h3>
      <p>かつては、ネットワーク部とホスト部の境目をアドレスの先頭ビットで固定的に決める<Term>クラス</Term>という方式が使われていました。現在は後述のCIDRが主流ですが、アドレスの分類は今も基礎知識として問われます。</p>

      <table>
        <tbody>
          <tr><th>クラス</th><th>先頭ビット</th><th>範囲(先頭オクテット)</th><th>用途</th></tr>
          <tr><td className="hl">A</td><td>0</td><td>0〜127</td><td>ホスト数が非常に多い大規模ネットワーク</td></tr>
          <tr><td className="hl">B</td><td>10</td><td>128〜191</td><td>中規模ネットワーク</td></tr>
          <tr><td className="hl">C</td><td>110</td><td>192〜223</td><td>小規模ネットワーク(ホスト254台)</td></tr>
          <tr><td className="hl">D</td><td>1110</td><td>224〜239</td><td>マルチキャスト用(個々の機器には割り当てない)</td></tr>
          <tr><td className="hl">E</td><td>1111</td><td>240〜255</td><td>実験・研究用の予約</td></tr>
        </tbody>
      </table>

      <h3>ブロードキャストアドレスとマルチキャスト</h3>
      <p>ホスト部のビットがすべて0のアドレスはネットワーク自体を指す<Term>ネットワークアドレス</Term>、すべて1のアドレスは<Term>ブロードキャストアドレス</Term>です。ブロードキャスト宛のパケットは、同じネットワーク内のすべての機器に一斉に届きます(例: <code>192.168.1.0/24</code>なら<code>192.168.1.255</code>)。この2つは機器に割り当てられないため、割当可能なホストはその分減ります。</p>
      <p>特定の相手にだけまとめて配りたい場合は<Term>IPマルチキャスト</Term>を使います。クラスDのアドレス(<code>224.0.0.0</code>〜<code>239.255.255.255</code>)を「グループの宛先」として使い、そのグループに参加している機器だけがパケットを受け取ります。動画配信やルーティングプロトコルの通知などに利用されます。</p>

      <table>
        <tbody>
          <tr><th>配り方</th><th>届く相手</th><th>たとえ</th></tr>
          <tr><td className="hl">ユニキャスト</td><td>1対1(特定の1台)</td><td>名指しの手紙</td></tr>
          <tr><td className="hl">ブロードキャスト</td><td>同一ネットワークの全機器</td><td>町内一斉放送</td></tr>
          <tr><td className="hl">マルチキャスト</td><td>参加登録した機器グループ</td><td>会員向け一斉メール</td></tr>
        </tbody>
      </table>

      <Heading num="03">サブネットマスク・CIDR・VLSM</Heading>
      <p>ネットワーク部とホスト部の境目を、クラスに縛られず自由に決める仕組みが<Term>サブネットマスク</Term>です。IPアドレスと同じ32ビットで表され、ネットワーク部にあたるビットを1、ホスト部にあたるビットを0で埋めます。<code>255.255.255.0</code>なら「先頭24ビットがネットワーク部」という意味です。</p>
      <p>これを短く書いたのが<Term>CIDR(サイダー)表記</Term>で、<code>192.168.1.0/24</code>のようにスラッシュのあとに「先頭から何ビットがネットワーク部か」を書きます。クラスの枠を外して境目を自由に置けるため、アドレスを無駄なく配れます。</p>

      <table>
        <tbody>
          <tr><th>CIDR</th><th>サブネットマスク</th><th>ホスト部ビット</th><th>割当可能なホスト数</th></tr>
          <tr><td className="hl">/30</td><td>255.255.255.252</td><td>2</td><td>2(拠点間リンクなどに)</td></tr>
          <tr><td className="hl">/24</td><td>255.255.255.0</td><td>8</td><td>254</td></tr>
          <tr><td className="hl">/16</td><td>255.255.0.0</td><td>16</td><td>65,534</td></tr>
        </tbody>
      </table>
      <p>1つのネットワークに、部署の規模に応じて異なる大きさのサブネットを混在させることを<Term>VLSM(可変長サブネットマスク)</Term>と呼びます。例えば200台の部署には<code>/24</code>、拠点間の2台だけのリンクには<code>/30</code>と、必要な数ぴったりに区切ることでアドレスの無駄を減らせます。</p>

      <h3>グローバルアドレスとプライベートアドレス</h3>
      <p>インターネット全体で一意に通用するのが<Term>グローバルアドレス</Term>、家庭や社内など閉じたネットワークの中だけで通用するのが<Term>プライベートアドレス</Term>です。プライベートアドレスには使ってよい範囲が決められており、そのままではインターネットに出られず、後述のNATでグローバルアドレスに変換されます。</p>

      <table>
        <tbody>
          <tr><th>クラス</th><th>プライベートアドレスの範囲</th></tr>
          <tr><td className="hl">A</td><td>10.0.0.0 〜 10.255.255.255</td></tr>
          <tr><td className="hl">B</td><td>172.16.0.0 〜 172.31.255.255</td></tr>
          <tr><td className="hl">C</td><td>192.168.0.0 〜 192.168.255.255</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        CIDRの数字は「郵便番号の桁数」に似ています。桁が多いほど狭い地域に絞られ(<code>/24</code>は町名まで)、桁が少ないほど広い地域をまとめて指します(<code>/16</code>は市区まで)。VLSMは、人口の多い地域には細かい番号を、少ない地域にはざっくりした番号を割り当てるようなものです。
      </Analogy>

      <Heading num="04">特別なアドレスと経路制御</Heading>
      <p>IPアドレスの中には、特定の意味を持つよう予約された「特別なアドレス」があり、それぞれがルーティングと深く関わります。</p>

      <table>
        <tbody>
          <tr><th>種類</th><th>代表例</th><th>意味・役割</th></tr>
          <tr><td className="hl">デフォルトルート</td><td>0.0.0.0/0</td><td>ルーティングテーブルのどの行にも一致しない宛先の受け皿</td></tr>
          <tr><td className="hl">ホストルート</td><td>192.0.2.5/32</td><td>特定の1台のホストだけを名指しで指定する経路(<code>/32</code>)</td></tr>
          <tr><td className="hl">ループバックアドレス</td><td>127.0.0.1</td><td>自分自身を指す。外へ出ず、自機内の通信に使う</td></tr>
          <tr><td className="hl">リンクローカルアドレス</td><td>169.254.0.0/16</td><td>DHCPが使えないとき自動設定される、同一リンク内限定のアドレス</td></tr>
        </tbody>
      </table>
      <p><strong>デフォルトルート</strong>は前述のとおり最後の受け皿です。<strong>ホストルート</strong>は<code>/32</code>でネットワーク全体ではなく1台だけを指す最も細かい経路で、ロンゲストマッチにより他のどの経路よりも優先されます。<strong>ループバックアドレス</strong>(<code>127.0.0.1</code>)はパケットが外部に出ず、自分自身へ折り返す特別なアドレスで、サーバの動作確認などに使われます。<strong>リンクローカルアドレス</strong>は、DHCPサーバが見つからないときに機器が自動で付ける仮のアドレスで、同じネットワーク内でしか通用しません。</p>

      <Analogy label="💡 たとえるなら">
        ループバックアドレスは「自分宛に書いたメモ」です。ポストに出さず、自分の机の上だけで完結します。リンクローカルアドレスは「受付でもらう仮の入館バッジ」のようなもので、その建物の中でしか通用しません。
      </Analogy>

      <Heading num="05">MTUとフラグメンテーション</Heading>
      <p>データリンクには、1回で運べるデータの最大サイズ<Term>MTU(Maximum Transmission Unit)</Term>が決まっています。そしてこの値は、データリンクの種類によって異なります。イーサネットは1500バイトが一般的ですが、その他の方式ではもっと小さいこともあります。</p>

      <table>
        <tbody>
          <tr><th>データリンク</th><th>MTU(バイト)</th></tr>
          <tr><td className="hl">イーサネット</td><td>1500</td></tr>
          <tr><td className="hl">PPPoE</td><td>1492</td></tr>
          <tr><td className="hl">FDDI</td><td>4352</td></tr>
        </tbody>
      </table>

      <h3>IPデータグラムの分割処理と再構築処理</h3>
      <p>送りたいIPデータグラムが、途中の経路のMTUより大きい場合、そのままでは通れません。そこでルーターはパケットをMTU以下の複数の断片に分割して送ります。これを<Term>フラグメンテーション(分割処理)</Term>と呼びます。各断片には元のパケットのどの位置にあたるかを示す情報(識別子・フラグ・フラグメントオフセット)が付き、最終的な宛先ホストがそれらを並べ直して元のパケットに戻します。これを<Term>再構築処理</Term>と呼びます。再構築は途中のルーターではなく、必ず最終宛先で行われるのがポイントです。</p>

      <h3>経路MTU探索(Path MTU Discovery)</h3>
      <p>分割処理はルーターに負荷をかけ、断片が1つでも失われると全体が届かなくなります。そこで、送信前に「経路全体で通れる最小のMTU(経路MTU)」をあらかじめ調べ、最初からその大きさに収めて送る仕組みが<Term>経路MTU探索(Path MTU Discovery)</Term>です。分割禁止フラグを立てたパケットを送り、大きすぎて通れない箇所から返る<Term>ICMP</Term>の通知(通れるサイズ付き)を受け取って、送信サイズを段階的に下げていきます。</p>

      <Diagram caption="大きなパケットは途中のMTUに合わせて分割され、宛先で再構築される">
        <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
          <text x={70} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">送信元</text>
          <rect x={30} y={45} width={90} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={75} y={70} fill="#f2f2f2" fontSize="12" textAnchor="middle">4000B</text>

          <text x={320} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">ルーター(MTU 1500)</text>
          <rect x={270} y={40} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={305} y={56} fill="#f2f2f2" fontSize="11" textAnchor="middle">1500B</text>
          <rect x={270} y={70} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={305} y={86} fill="#f2f2f2" fontSize="11" textAnchor="middle">1500B</text>
          <rect x={270} y={100} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={305} y={116} fill="#f2f2f2" fontSize="11" textAnchor="middle">1000B</text>

          <text x={575} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">宛先(再構築)</text>
          <rect x={530} y={45} width={90} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={575} y={70} fill="#f2f2f2" fontSize="12" textAnchor="middle">4000B</text>

          <line x1={120} y1={65} x2={270} y2={80} stroke="#5f5f5f" />
          <line x1={340} y1={80} x2={530} y2={65} stroke="#5f5f5f" />
          <text x={320} y={165} fill="#9a9a9a" fontSize="11" textAnchor="middle">分割は途中のルーターで、再構築は最終宛先でのみ行われる</text>
        </svg>
      </Diagram>

      <Heading num="06">IPv6 ― アドレスアーキテクチャ</Heading>
      <p>IPv4の約43億という空間はすでに枯渇しました。これを根本から解決するのが128ビットの<Term>IPv6</Term>で、アドレス空間はけた違いに広大です。表記は<code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>のように16ビットずつ8つのブロックを<code>:</code>で区切り、各ブロックの先頭の0や連続する0のブロックを省略して短く書けます(<code>2001:db8:85a3::8a2e:370:7334</code>)。</p>
      <p>IPv6では、1つのインターフェースが用途の異なる複数のアドレスを同時に持つのが普通です。主なユニキャストアドレスは次の3種類です。</p>

      <table>
        <tbody>
          <tr><th>種類</th><th>先頭(プレフィックス)</th><th>通用する範囲・役割</th></tr>
          <tr><td className="hl">グローバルユニキャスト</td><td>2000::/3</td><td>インターネット全体で一意。IPv4のグローバルアドレスに相当</td></tr>
          <tr><td className="hl">リンクローカルユニキャスト</td><td>fe80::/10</td><td>同一リンク内でのみ通用。自動生成され近隣探索などに使う</td></tr>
          <tr><td className="hl">ユニークローカル</td><td>fc00::/7</td><td>組織内で閉じて使う。IPv4のプライベートアドレスに相当</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        IPv6には、IPv4のARPやブロードキャストに相当する仕組みがマルチキャストと<Term>近隣探索(NDP)</Term>として統合されています。また、ルーターからの情報をもとにアドレスを自分で組み立てる<Term>ステートレスアドレス自動設定(SLAAC)</Term>により、DHCPなしでもグローバルアドレスを持てます。
      </Aside>

      <Heading num="07">IPv4ヘッダフォーマット</Heading>
      <p>IPパケットの先頭には、配送に必要な管理情報を詰めた<Term>IPヘッダ</Term>が付きます。IPv4ヘッダは基本20バイト(オプションがあればそれ以上)で、32ビット(4バイト)ずつの行で図示するのが定番です。</p>

      <Diagram caption="IPv4ヘッダの構造(1行 = 32ビット)">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="11" fill="#f2f2f2" textAnchor="middle">
            <rect x={20} y={20} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={55} y={41}>バージョン</text>
            <rect x={90} y={20} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={125} y={41}>ヘッダ長</text>
            <rect x={160} y={20} width={140} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={230} y={37}>サービスタイプ</text><text x={230} y={50} fill="#9a9a9a" fontSize="9">(DSCP+ECN)</text>
            <rect x={300} y={20} width={320} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={460} y={41}>パケット長</text>

            <rect x={20} y={54} width={300} height={34} fill="none" stroke="#5f5f5f" /><text x={170} y={75}>識別子</text>
            <rect x={320} y={54} width={80} height={34} fill="none" stroke="#5f5f5f" /><text x={360} y={75}>フラグ</text>
            <rect x={400} y={54} width={220} height={34} fill="none" stroke="#5f5f5f" /><text x={510} y={75}>フラグメントオフセット</text>

            <rect x={20} y={88} width={90} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={65} y={109}>TTL</text>
            <rect x={110} y={88} width={110} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={165} y={109}>プロトコル</text>
            <rect x={220} y={88} width={400} height={34} fill="none" stroke="#5f5f5f" /><text x={420} y={109}>ヘッダチェックサム</text>

            <rect x={20} y={122} width={600} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={320} y={143}>送信元IPアドレス(32ビット)</text>
            <rect x={20} y={156} width={600} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={320} y={177}>宛先IPアドレス(32ビット)</text>
            <rect x={20} y={190} width={600} height={34} fill="none" stroke="#5f5f5f" strokeDasharray="4 3" /><text x={320} y={211}>オプション + パディング(可変・省略可)</text>
          </g>
          <text x={320} y={244} fill="#9a9a9a" fontSize="11" textAnchor="middle">この下にトランスポート層以降のデータ(ペイロード)が続く</text>
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>フィールド</th><th>役割</th></tr>
          <tr><td className="hl">バージョン</td><td>IPのバージョン。IPv4なら4</td></tr>
          <tr><td className="hl">サービスタイプ</td><td>優先度・品質の指定。上位6ビットが<Term>DSCP</Term>(優先制御の分類)、下位2ビットが<Term>ECN</Term>(輻輳の通知)</td></tr>
          <tr><td className="hl">パケット長</td><td>ヘッダとデータを合わせた全体の長さ(バイト)</td></tr>
          <tr><td className="hl">識別子</td><td>分割された断片が元は同じパケットだと識別するための番号</td></tr>
          <tr><td className="hl">フラグ / フラグメントオフセット</td><td>分割の可否・後続の有無、および断片が元パケットのどの位置かを示す</td></tr>
          <tr><td className="hl">生存時間(TTL)</td><td>ルーターを1つ越えるごとに1減り、0で破棄。ループによる無限転送を防ぐ</td></tr>
          <tr><td className="hl">プロトコル</td><td>上位層の種別。TCPは6、UDPは17、ICMPは1</td></tr>
          <tr><td className="hl">ヘッダチェックサム</td><td>ヘッダの誤り検出。TTLが変わるためルーターごとに再計算される</td></tr>
          <tr><td className="hl">送信元 / 宛先IPアドレス</td><td>差出人と宛先のアドレス(各32ビット)</td></tr>
          <tr><td className="hl">オプション / パディング</td><td>任意の拡張情報と、長さを32ビット単位に整えるための詰め物</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        TTLは「宅配便の再配達回数の上限」のようなものです。中継地を通るたびにカウントが減り、0になると「宛先不明」として破棄されます。これがないと、経路がループしたパケットが延々とネットワーク内をさまよい続けてしまいます。
      </Analogy>

      <Heading num="08">IPv6ヘッダフォーマット</Heading>
      <p>IPv6ヘッダは、IPv4で複雑だった部分を思い切って整理し、長さを40バイト固定にしました。フィールド数を減らしてルーターの処理を軽くし、可変な情報は必要なときだけ後ろに連結する<Term>拡張ヘッダ</Term>へ追い出したのが特徴です。ルーターでの分割はIPv6では行われず、チェックサムも省かれました。</p>

      <Diagram caption="IPv6ヘッダの構造(40バイト固定)。可変情報は拡張ヘッダへ分離">
        <svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="11" fill="#f2f2f2" textAnchor="middle">
            <rect x={20} y={20} width={80} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={60} y={41}>バージョン</text>
            <rect x={100} y={20} width={150} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={175} y={41}>トラフィッククラス</text>
            <rect x={250} y={20} width={370} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={435} y={41}>フローラベル</text>

            <rect x={20} y={54} width={260} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={150} y={75}>ペイロード長</text>
            <rect x={280} y={54} width={200} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={380} y={75}>次のヘッダ</text>
            <rect x={480} y={54} width={140} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" /><text x={550} y={75}>ホップリミット</text>

            <rect x={20} y={88} width={600} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={320} y={112}>送信元IPアドレス(128ビット)</text>
            <rect x={20} y={128} width={600} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={320} y={152}>宛先IPアドレス(128ビット)</text>
            <rect x={20} y={172} width={600} height={34} fill="none" stroke="#5f5f5f" strokeDasharray="4 3" /><text x={320} y={193}>拡張ヘッダ(必要なときだけ連結・省略可)</text>
          </g>
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>フィールド</th><th>役割</th><th>IPv4での対応</th></tr>
          <tr><td className="hl">バージョン</td><td>IPのバージョン(IPv6なら6)</td><td>バージョン</td></tr>
          <tr><td className="hl">トラフィッククラス</td><td>優先度・品質(DSCP/ECN相当)</td><td>サービスタイプ</td></tr>
          <tr><td className="hl">フローラベル</td><td>一連の通信(フロー)に同じ番号を付け、まとめて扱えるようにする</td><td>(新設)</td></tr>
          <tr><td className="hl">ペイロード長</td><td>基本ヘッダを除いた後続データの長さ</td><td>パケット長(意味が異なる)</td></tr>
          <tr><td className="hl">次のヘッダ</td><td>直後に続く拡張ヘッダまたは上位層プロトコルの種別</td><td>プロトコル</td></tr>
          <tr><td className="hl">ホップリミット</td><td>ルーターを越えるたびに1減り0で破棄</td><td>生存時間(TTL)</td></tr>
          <tr><td className="hl">送信元 / 宛先IP</td><td>差出人と宛先のアドレス(各128ビット)</td><td>送信元 / 宛先IP</td></tr>
        </tbody>
      </table>

      <Heading num="09">IPを補助するプロトコル</Heading>
      <p>IP単体では「宛先へパケットを届ける」ことしかできません。名前を引く、物理アドレスを調べる、エラーを知らせる、設定を配る、アドレスを変換する ― こうした周辺の仕事を、次のプロトコル群が分担しています。</p>

      <h3>DNS ― 名前をIPアドレスに変換する</h3>
      <p><Term>DNS(Domain Name System)</Term>は、<code>example.com</code>のような人間向けのドメイン名を、機械が使うIPアドレスへ変換する仕組みです。ドメイン名の階層構造、ネームサーバ、リゾルバといった詳しい仕組みは「<Link href="/network/applications/dns">DNS</Link>」で扱います。ここでは「IPの前段で住所を教えてくれる電話帳」と押さえておけば十分です。</p>

      <h3>ARP ― IPアドレスからMACアドレスを求める</h3>
      <p>同じネットワーク内で実際にフレームを届けるには、IPアドレスに対応する<Term>MACアドレス</Term>(データリンク層の物理アドレス)が必要です。IPアドレスからMACアドレスを問い合わせるのが<Term>ARP(Address Resolution Protocol)</Term>で、「このIPの人はどのMACですか」とネットワーク全体に呼びかけ、本人が自分のMACを返します。</p>

      <table>
        <tbody>
          <tr><th>関連プロトコル</th><th>役割</th></tr>
          <tr><td className="hl">RARP</td><td>ARPの逆。MACアドレスからIPアドレスを求める(ディスクレス機器の起動などで使われた)</td></tr>
          <tr><td className="hl">GARP(Gratuitous ARP)</td><td>自分のIPを自ら通知するARP。IPアドレスの重複検出やアドレス変更の周知に使う</td></tr>
          <tr><td className="hl">代理ARP(Proxy ARP)</td><td>別ネットワークの機器に代わってルーターがARP応答を返し、橋渡しする</td></tr>
        </tbody>
      </table>

      <h3>ICMP ― IPを補助し、エラーを知らせる</h3>
      <p><Term>ICMP(Internet Control Message Protocol)</Term>は、IPの配送でトラブルが起きたことを送信元へ知らせる「連絡係」です。宛先に届かない、TTLが尽きた、分割が必要なのに禁止されている ― こうした状況を<Term>ICMPメッセージ</Term>として返します。<code>ping</code>(到達確認)や<code>traceroute</code>(経路確認)、経路MTU探索もICMPを利用しています。</p>

      <table>
        <tbody>
          <tr><th>代表的なICMPメッセージ</th><th>意味</th></tr>
          <tr><td className="hl">エコー要求 / 応答</td><td>pingが使う。相手が生きているか確認する</td></tr>
          <tr><td className="hl">到達不能(Destination Unreachable)</td><td>宛先ネットワーク・ホスト・ポートに届けられない</td></tr>
          <tr><td className="hl">時間超過(Time Exceeded)</td><td>TTLが0になり破棄した。tracerouteが利用する</td></tr>
        </tbody>
      </table>

      <h3>DHCP ― 設定を自動で配る</h3>
      <p><Term>DHCP(Dynamic Host Configuration Protocol)</Term>は、ネットワークに接続した機器へ、IPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバなどをまとめて自動で割り当てる仕組みです。手動設定なしで機器をつなぐだけで使える<Term>プラグ&プレイ</Term>を実現します。DHCPの要求はブロードキャストで飛ぶためそのままではルーターを越えられませんが、これを別ネットワークのDHCPサーバへ中継するのが<Term>DHCPリレーエージェント</Term>です。</p>

      <h3>NAT ― プライベートIPをグローバルIPに変換する</h3>
      <p><Term>NAT(Network Address Translation)</Term>は、プライベートアドレスとグローバルアドレスを相互に変換する仕組みです。社内の機器がインターネットへアクセスするとき、ルーターが送信元アドレスを自分のグローバルアドレスに書き換えて送り、応答を対応表に従って正しい内部機器へ戻します。ポート番号まで併用して複数機器で1つのグローバルIPを共有する方式は<Term>NAPT(IPマスカレード)</Term>と呼ばれます。</p>

      <Diagram caption="送信元IPを書き換えて外部と通信するNAT/NAPTの仕組み">
        <svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={210} height={200} fill="none" stroke="#5f5f5f" strokeDasharray="4 3" />
          <text x={125} y={40} fill="#9a9a9a" fontSize="12" textAnchor="middle">社内LAN</text>
          <rect x={45} y={55} width={160} height={45} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={125} y={75} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC A</text><text x={125} y={92} fill="#9a9a9a" fontSize="11" textAnchor="middle">192.168.1.10</text>
          <rect x={45} y={140} width={160} height={45} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={125} y={160} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC B</text><text x={125} y={177} fill="#9a9a9a" fontSize="11" textAnchor="middle">192.168.1.11</text>

          <rect x={285} y={95} width={150} height={55} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={360} y={118} fill="#f2f2f2" fontSize="12" textAnchor="middle">ルーター(NAT)</text><text x={360} y={135} fill="#9a9a9a" fontSize="11" textAnchor="middle">203.0.113.5</text>

          <rect x={490} y={95} width={130} height={55} fill="none" stroke="#5f5f5f" /><text x={555} y={127} fill="#f2f2f2" fontSize="12" textAnchor="middle">インターネット</text>

          <line x1={205} y1={77} x2={285} y2={115} stroke="#39ff6a" />
          <line x1={205} y1={162} x2={285} y2={135} stroke="#39ff6a" />
          <line x1={435} y1={122} x2={490} y2={122} stroke="#39ff6a" />
          <text x={330} y={220} fill="#9a9a9a" fontSize="11" textAnchor="middle">送信元IPを 192.168.1.x → 203.0.113.5 に書き換え、ポート番号で機器を区別</text>
        </svg>
      </Diagram>

      <Aside label="豆知識">
        近年はプロバイダ側でも大規模にNATを行う<Term>CGN(Carrier-Grade NAT / LSN)</Term>が広がっています。IPv4アドレスの枯渇に対応するため、多数の加入者で少数のグローバルアドレスを共有する仕組みですが、アドレスが二重に変換されるため一部の通信で不都合が出ることもあり、根本的な解決策としてはIPv6への移行が進められています。
      </Aside>

      <Heading num="10">ルーティングプロトコル ― 経路表を育てる</Heading>
      <p>ルーティングテーブルの中身は、どう用意するのでしょうか。方法は大きく2つあります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>作り方</th><th>特徴</th></tr>
          <tr><td className="hl">スタティックルーティング</td><td>管理者が経路を手動で登録</td><td>小規模向け。確実だが、障害時に自動で迂回できない</td></tr>
          <tr><td className="hl">ダイナミックルーティング</td><td>ルーター同士が情報交換し自動生成</td><td>大規模向け。障害時に自動で経路を組み替えられる</td></tr>
        </tbody>
      </table>
      <p>ダイナミックルーティングで使われる<Term>ルーティングプロトコル</Term>には、経路の選び方の考え方によって2つの型があります。</p>
      <table>
        <tbody>
          <tr><th>型</th><th>考え方</th><th>代表プロトコル</th></tr>
          <tr><td className="hl">距離ベクトル型</td><td>「宛先まで何ホップか」という距離と方向だけを隣のルーターと交換する。単純だが大規模には不向き</td><td>RIP</td></tr>
          <tr><td className="hl">リンク状態型</td><td>ネットワーク全体の地図を各ルーターが共有し、最短経路を自分で計算する。収束が速く大規模向き</td><td>OSPF</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        距離ベクトル型は「近所の人に『駅までいくつ角を曲がる?』と聞いて回る」やり方。リンク状態型は「街全体の地図を全員が持ち、自分で最短ルートを引く」やり方です。前者は手軽ですが街が広がると噂が伝わるのに時間がかかり、後者は地図の共有に手間はかかるものの、素早く正確に道を選べます。
      </Analogy>

      <Heading num="まとめ">ネットワーク層の要点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>IPアドレスが宛先を決める</h4>
          <p>ネットワーク部とホスト部に分かれ、サブネットマスク/CIDRで境目を自由に区切ります。枯渇に備えIPv6への移行が進みます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ルーティングが道すじを選ぶ</h4>
          <p>各ルーターがルーティングテーブルを見てネクストホップだけを判断し、そのリレーで別ネットワークまで届けます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>補助プロトコルがIPを支える</h4>
          <p>DNS・ARP・ICMP・DHCP・NATが、名前解決・アドレス解決・エラー通知・自動設定・変換を分担します。</p>
        </Card>
      </CardGrid>
      <p>住所づけ(IP)と道すじ(ルーティング)が決まったら、次はその上でデータを「どのアプリへ届けるか」を担うトランスポート層へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/link" tag="ネットワーク">データリンク層</RelatedLink>
            <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層 ― TCPとUDP</RelatedLink>
            <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
