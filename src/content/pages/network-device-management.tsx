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
  title: "デバイスの管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>デバイスの管理 ― 機器の状態を記録し、時刻を揃え、構成を守る</h1>
        <Lead>
          ネットワーク機器を安定して運用するには、何が起きたかを記録する<Term>システムログ</Term>、複数の機器の時刻を揃える<Term>NTP</Term>、隣にどんな機器がつながっているかを知る<Term>CDP/LLDP</Term>、そして設定そのものを守る<Term>IOSの管理</Term>が欠かせません。
        </Lead>
      </Hero>

      <Heading num="00">システムログ ― 何が起きたかを記録する</Heading>
      <p>
        ネットワーク機器は、インタフェースの状態変化やエラーなどの出来事を<Term>Syslog</Term>という形式でログに記録します。ログにはそれぞれ<Term>重大度(Severity)</Term>が付いており、数字が小さいほど深刻です。
      </p>
      <table>
        <tbody>
          <tr>
            <th>重大度</th>
            <th>意味</th>
          </tr>
          <tr>
            <td className="hl">0 Emergency</td>
            <td>システムが使用不能</td>
          </tr>
          <tr>
            <td className="hl">1〜3</td>
            <td>Alert・Critical・Error(深刻な異常)</td>
          </tr>
          <tr>
            <td className="hl">4〜5</td>
            <td>Warning・Notice(注意が必要な状態)</td>
          </tr>
          <tr>
            <td className="hl">6〜7</td>
            <td>Informational・Debug(参考情報・詳細な動作記録)</td>
          </tr>
        </tbody>
      </table>
      <p>
        ログの保存先は、機器のメモリ上のバッファ、コンソール画面、そして複数の機器のログを一箇所に集める<Term>Syslogサーバー</Term>などから選べます。障害発生時に複数の機器のログを突き合わせて原因を追うには、機器ごとにログが散らばっているより、一箇所に集約されている方が調査しやすくなります。
      </p>

      <Heading num="01">NTP ― 複数の機器の時刻を揃える</Heading>
      <p>
        機器ごとに時刻がずれていると、複数のログを時系列で突き合わせて障害原因を追うことが極めて困難になります。<Term>NTP(Network Time Protocol)</Term>は、ネットワーク上のサーバーから正確な時刻を取得し、複数の機器の時刻を同期させる仕組みです。
      </p>

      <DiagramFrame
        slug="network-ntp-stratum"
        aspect="640 / 360"
        caption="NTPのStratum階層。原子時計やGPSを基準とするStratum0を頂点に、それに直結したNTPサーバーがStratum1、そこから時刻をもらうサーバーがStratum2、さらにその下がStratum3となる。階層が下がるほど基準時計からの経由数が増え、Stratum番号が大きくなる。"
      />

      <p>
        時刻の正確さの階層を<Term>Stratum(階層)</Term>と呼び、原子時計やGPSなど極めて正確な基準時計を<Term>Stratum 0</Term>とし、そこから時刻をもらうたびに番号が1つずつ増えていきます。社内のルーターは、多くの場合Stratum 2〜3あたりのNTPサーバーから時刻をもらう形になります。
      </p>

      <Heading num="02">CDP/LLDP ― 隣接機器を自動で発見する</Heading>
      <p>
        <Term>CDP(Cisco Discovery Protocol)</Term>と<Term>LLDP(Link Layer Discovery Protocol)</Term>は、直接つながった隣の機器と定期的に情報を交換し、相手の機種名やポート番号などを自動的に把握する仕組みです。CDPはCisco独自のプロトコル、LLDPはメーカーを問わない標準規格という違いがあります。
      </p>

      <DiagramFrame
        slug="network-cdp-lldp"
        aspect="640 / 320"
        caption="CDP/LLDP。SW1とSW2が定期的に自分の機器情報を広告フレームとして送り合い、それぞれが相手の機種やポート番号を近隣情報テーブルとして記録する。これにより手動でケーブル図を作らなくても物理トポロジを把握できる。"
      />

      <p>
        <code>show cdp neighbors</code>や<code>show lldp neighbors</code>を実行すれば、手元の機器が実際にどの機器のどのポートとつながっているかを、ケーブルをたどらずに確認できます。大規模なネットワークで物理構成を把握したり、配線ミスを見つけたりする際に役立ちます。
      </p>

      <Analogy label="💡 たとえるなら">
        CDP/LLDPは、名刺交換のようなものです。隣り合った機器同士が定期的に「私はこういう機器で、このポートでつながっています」という名刺を渡し合うことで、わざわざ配線図を作らなくても、お互いがお互いの素性を知っている状態を保てます。
      </Analogy>

      <Heading num="03">IOSの管理 ― 設定とソフトウェアを守る</Heading>
      <p>
        Cisco機器では、現在動作中の設定を<Term>running-config</Term>、電源を切っても残る保存済みの設定を<Term>startup-config</Term>として別々に管理します。設定変更はまずrunning-configにその場で反映されるため、意図した変更であることを確認してから<code>copy running-config startup-config</code>のようなコマンドで保存し、再起動しても設定が消えないようにします。
      </p>
      <p>
        機器を動かすソフトウェア本体である<Term>IOSイメージ</Term>も、バージョンアップの際は事前にバックアップを取り、新しいイメージを転送してから切り替える、という手順を踏みます。設定・ソフトウェアのどちらも「変更前の状態にすぐ戻せるようにしておく」ことが運用の基本です。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ログは重大度と集約先が重要</h4>
          <p>重大度の数字が小さいほど深刻。複数機器のログはSyslogサーバーに集約すると調査しやすくなります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>NTPで時刻を揃える</h4>
          <p>Stratumが小さいほど基準時計に近く、複数機器のログ突き合わせに時刻同期が欠かせません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>running/startupとIOSは戻せる状態を保つ</h4>
          <p>設定変更は保存を忘れず、ソフトウェア更新前はバックアップを取っておきます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/device-management" />
    </DocsPage>
  );
}
