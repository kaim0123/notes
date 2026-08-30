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
  title: "トポロジと接続装置",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>トポロジと接続装置 ― ネットワークの形と機器</h1>
        <Lead>
          ネットワークは、機器をどんな「形」でつなぐか(トポロジ)と、その結び目に置く「機器」の組み合わせでできています。まず試験で問われる基本的なトポロジの種類を押さえ、続いてONU・ルーター・スイッチなど、家庭やオフィスに並ぶ実機がそれぞれ何をしているのかを整理します。
        </Lead>
      </Hero>

      <Heading num="01">ネットワークトポロジ ― つなぎ方の「形」</Heading>
      <p><Term>トポロジ</Term>とは、機器同士をどんな形で接続するかという配置の型のことです。代表的な4つの形があり、それぞれ故障への強さや配線のしやすさが異なります。</p>
      <table>
        <tbody>
          <tr><th>形</th><th>つなぎ方</th><th>特徴</th></tr>
          <tr><td className="hl">バス型</td><td>1本の基幹ケーブルに全機器がぶら下がる</td><td>配線は単純だが、基幹が切れると全体が停止。信号衝突も起きやすい</td></tr>
          <tr><td className="hl">スター型</td><td>中央の機器(ハブ・スイッチ)に各機器が個別接続</td><td>1台の故障が他に波及しにくく管理しやすい。現在のLANの主流。中央が壊れると全滅</td></tr>
          <tr><td className="hl">リング型</td><td>機器を輪の形につなぐ</td><td>データが一方向に巡回。1箇所の断線に弱い</td></tr>
          <tr><td className="hl">ツリー型(階層型)</td><td>スター型を階層的に積み重ねる</td><td>大規模ネットワークの拡張に向く。多くの企業ネットワークの実態</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        バス型は「1本の廊下に全部屋のドアが並ぶ」形、スター型は「中央のロビーから各部屋へ放射状に廊下が伸びる」形です。ロビー型(スター)は1部屋の工事が他に響きにくく、今の建物の主流になっています。
      </Analogy>

      <p>これらの結び目に置かれるのが、この先で見ていく接続装置です。目の前にある機器たちも、「<Link href="/network/layers">階層モデル</Link>」のどの層を見て動いているかによって、はっきり役割が分かれています。</p>

      <Heading num="02">回線の入り口 ― ONUとモデム</Heading>
      <p>光回線を家庭やオフィスに引き込むと、まず出会うのが<Term>ONU(Optical Network Unit、光回線終端装置)</Term>です。光ファイバーの中を伝わってくる光の信号を、パソコンやルーターが扱える電気信号(デジタル信号)に変換する役割を持ちます。</p>
      <p>ADSLやケーブルテレビ回線など、光ファイバー以外の回線を使う場合は<Term>モデム</Term>が同じ位置に置かれます。呼び名も中の技術も異なりますが、「回線の信号 ⇔ LANの信号」を変換して、その先の機器につなげるという役割そのものはONUと同じです。</p>

      <Heading num="03">同じ箱に見えて中身が違う ― ハブ・L2スイッチ・L3スイッチ・ルーター</Heading>
      <p>この4つは特に混同されがちですが、通信プロトコルのどの層で「宛先」を判断して転送しているかが、そのまま役割の違いになっています。</p>

      <h3>ハブ ― 物理層、来た信号を全ポートへ垂れ流す</h3>
      <p>ハブは<Term>物理層</Term>(OSI第1層)で動作する、最も単純な中継機器です。あるポートに届いた電気信号の宛先を判断せず、接続されている全ポートにそのまま流します。今日ではほとんど使われなくなり、次に見るL2スイッチに置き換わっています。</p>

      <h3>L2スイッチ ― データリンク層、MACアドレスで届け先を選ぶ</h3>
      <p><Term>L2スイッチ</Term>は<Term>データリンク層</Term>(OSI第2層)で動作し、届いたデータ(フレーム)に書かれた宛先<Term>MACアドレス</Term>を見て、そのアドレスが接続されているポートだけに転送します。ハブと違って関係のないポートに無駄な信号を流さないため、通信効率も安全性も高まります。家庭用ルーターの背面に並ぶ複数のLANポートの多くも、内部的にはL2スイッチの機能です。</p>

      <h3>L3スイッチ ― ネットワーク層まで踏み込むスイッチ</h3>
      <p><Term>L3スイッチ</Term>はL2スイッチの機能に加え、<Term>ネットワーク層</Term>(OSI第3層)のIPアドレスを見て転送先を決める機能(ルーティング)を持ちます。オフィスなどで部署ごとにネットワークを分けつつ(VLAN)、それらの間の通信も高速に中継したい場合に使われる、いわば「速いルーター機能付きスイッチ」です。</p>

      <h3>ルーター ― 異なるネットワーク同士をつなぐ関所</h3>
      <p><Term>ルーター</Term>もネットワーク層で動作しますが、主な役割は「自宅・社内のネットワーク」と「インターネットという別のネットワーク」を橋渡しすることです。プライベートIPとグローバルIPを変換するNATや、機器へIPアドレスを自動で割り当てるDHCPも、多くの家庭用ルーターが標準で内蔵している機能です。</p>

      <table>
        <tbody>
          <tr><th>機器</th><th>主に扱う層</th><th>転送先の判断材料</th></tr>
          <tr><td className="hl">ハブ</td><td>物理層</td><td>なし(全ポートへ垂れ流す)</td></tr>
          <tr><td className="hl">L2スイッチ</td><td>データリンク層</td><td>宛先MACアドレス</td></tr>
          <tr><td className="hl">L3スイッチ</td><td>ネットワーク層(+データリンク層)</td><td>宛先MACアドレス・宛先IPアドレスの両方</td></tr>
          <tr><td className="hl">ルーター</td><td>ネットワーク層</td><td>宛先IPアドレス(異なるネットワーク間)</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ハブは「届いた回覧板を建物の全部屋のポストに投函してしまう掲示係」。L2スイッチは「部屋番号(MACアドレス)を確認して、その部屋のポストにだけ届ける配達員」。L3スイッチとルーターは、部屋番号だけでなく住所(IPアドレス)まで見て、<strong>建物(ネットワーク)をまたいで</strong>届け物を運びます。中でもルーターは、自分の建物と外の世界の玄関に立つ守衛のような存在です。
      </Analogy>

      <Heading num="04">無線とPoE ― アクセスポイントとPoEスイッチ</Heading>
      <h3>アクセスポイント(AP) ― 有線LANを無線(Wi-Fi)に変える</h3>
      <p><Term>アクセスポイント</Term>は、有線LANの信号を無線の電波に変換し、スマートフォンやノートPCなどをケーブルなしでネットワークに参加させる機器です。家庭用ルーターの多くはアクセスポイント機能を内蔵していますが、オフィスや広い建物では、天井などに複数のアクセスポイントを分散配置して電波の届く範囲を広げます。</p>

      <h3>PoEスイッチ ― LANケーブル1本で電力も送る</h3>
      <p><Term>PoE(Power over Ethernet)</Term>対応のスイッチは、データ通信に使うLANケーブルを通じて電力も一緒に供給できます。天井に設置するアクセスポイントや監視カメラなど、近くにコンセントを用意しにくい場所に機器を置くとき、電源工事をせずLANケーブル1本で済ませられるのが利点です。</p>

      <Diagram caption="家庭・オフィスの典型的なネットワーク構成:回線からの信号は機器をリレーしながら端末に届く">
        <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={113} width={100} height={48} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={60} y={141} fill="#9a9a9a" fontSize="12" textAnchor="middle">インターネット</text>

          <rect x={150} y={113} width={80} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={190} y={141} fill="#f2f2f2" fontSize="13" textAnchor="middle">ONU</text>

          <rect x={270} y={113} width={90} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={315} y={141} fill="#f2f2f2" fontSize="13" textAnchor="middle">ルーター</text>

          <rect x={400} y={113} width={110} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={455} y={141} fill="#f2f2f2" fontSize="13" textAnchor="middle">L2スイッチ</text>

          <rect x={570} y={30} width={110} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={625} y={58} fill="#f2f2f2" fontSize="13" textAnchor="middle">AP</text>

          <rect x={570} y={190} width={110} height={48} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={625} y={212} fill="#f2f2f2" fontSize="12" textAnchor="middle">スマホ</text>
          <text x={625} y={227} fill="#9a9a9a" fontSize="10" textAnchor="middle">(無線)</text>

          <rect x={400} y={190} width={110} height={48} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={455} y={212} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC</text>
          <text x={455} y={227} fill="#9a9a9a" fontSize="10" textAnchor="middle">(有線)</text>

          <line x1={110} y1={137} x2={148} y2={137} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowNd)" />
          <line x1={230} y1={137} x2={268} y2={137} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowNd)" />
          <line x1={360} y1={137} x2={398} y2={137} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowNd)" />
          <line x1={510} y1={125} x2={568} y2={62} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowNd)" />
          <line x1={455} y1={161} x2={455} y2={188} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowNd)" />
          <line x1={625} y1={78} x2={625} y2={188} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrowNd)" />

          <defs>
            <marker id="arrowNd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Aside label="豆知識">
        家庭用の「無線LANルーター」1台の中には、実はルーター・L2スイッチ・アクセスポイントの機能がまとめて詰め込まれています。1つの箱に見えても、内部では複数の役割が同居しているのです。
      </Aside>

      <Heading num="05">ネットワークの境界に立つ機器 ― ファイアウォール・ロードバランサ・VPN装置</Heading>
      <p>ここまでの機器がおもに「データをどこへ転送するか」を担当するのに対し、この節の機器は「通す・通さないを判断する」「複数の行き先に振り分ける」「経路そのものを暗号化する」という一段違う役割を持ちます。</p>

      <h3>ファイアウォール ― ネットワークの出入り口の門番</h3>
      <p><Term>ファイアウォール</Term>は、社内ネットワークとインターネットの境目など、ネットワークの出入り口に置かれ、通過してよい通信とそうでない通信を判断する機器です。ルーターに機能として内蔵されていることもあれば、専用の機器(アプライアンス)として別に設置されることもあります。検査の中身がどう違うか(パケットフィルタ型・ステートフルインスペクション型・WAFなど)はセキュリティの対策側で扱いますが、ここで大事なのは<strong>ネットワークの境界という「場所」に立つ機器だ</strong>という位置づけです。</p>

      <h3>ロードバランサ ― 複数サーバーへの入り口を1つに見せる</h3>
      <p><Term>ロードバランサ</Term>は、1つのサービスに集中するアクセスを複数のサーバーに振り分ける機器です。データセンターの、外部からの通信とサーバー群の間に配置され、外から見ると「1つの窓口」に見えるようにします。特定のサーバーだけに負荷が偏らないようにするのが主な役割です。</p>

      <h3>VPN装置 ― 離れた拠点・利用者を安全につなぐ</h3>
      <p><Term>VPN(Virtual Private Network)</Term>装置は、インターネットのような公共の回線の上に、暗号化された仮想的な専用回線を作る機器です。本社と支社のネットワークを常時つなぐ「拠点間VPN」や、外出先やリモートワークの利用者が社内ネットワークに安全に接続する「リモートアクセスVPN」といった形で使われます。ルーターにVPN機能が内蔵されている場合と、VPN専用のアプライアンスを別途設置する場合があります。</p>

      <Analogy label="💡 たとえるなら">
        ファイアウォールは建物の「受付の警備員」、ロードバランサは混雑する窓口を裏で捌く「案内係」、VPN装置は本社と支社を結ぶ「専用の秘密通路」です。どれも部屋そのもの(サーバーや端末)ではなく、出入り口や通路に立って全体の流れを整えています。
      </Analogy>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>層によって役割が違う</h4>
          <p>ハブ→L2スイッチ→L3スイッチ→ルーターの順に、転送の判断に使う情報の階層が上がっていきます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>家庭・オフィスは機器のリレーでできている</h4>
          <p>ONUが回線の信号を変換し、ルーター・スイッチ・APが順にバトンを渡して端末までデータを届けます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>境界に立つ機器は「転送」より「制御」が仕事</h4>
          <p>ファイアウォール・ロードバランサ・VPN装置は、通信をただ運ぶのではなく、通す・振り分ける・守るという判断を担います。</p>
        </Card>
      </CardGrid>
      <p>ここまでは自分の手元のネットワークの中の話でした。境界の制御をさらに整理したうえで、ネットワークがインターネットの外へつながる流れを「<Link href="/network/control">通信制御コンポーネント</Link>」→「<Link href="/network/internet/isp">ISP接続とCDN</Link>」の順で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/ip" tag="ネットワーク">IPアドレスと経路</RelatedLink>
                    <RelatedLink href="/network/control" tag="ネットワーク">通信制御コンポーネント</RelatedLink>
                    <RelatedLink href="/network/internet/isp" tag="インターネット">ISP接続とCDN ― インターネットへの入り口</RelatedLink>
                    <RelatedLink href="/network/internet/server/build" tag="インターネット">サーバー構築の実務</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
