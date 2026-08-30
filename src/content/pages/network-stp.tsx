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
  title: "STP",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>STP ― 冗長リンクのループを安全に断ち切る</h1>
        <Lead>
          スイッチ同士を冗長化のために複数本のリンクでつなぐと、リンクの障害には強くなりますが、代わりに<Term>ループ</Term>という別の問題を抱え込みます。<Term>STP(Spanning Tree Protocol)</Term>は、このループを検出し、余分な経路を論理的に閉じることで両立させる仕組みです。
        </Lead>
      </Hero>

      <Heading num="00">なぜSTPが必要か ― ブロードキャストストーム</Heading>
      <p>
        「イーサネットLANの基礎」で見た通り、スイッチは宛先が分からないフレームを受信ポート以外の全ポートに<Term>フラッディング</Term>します。ここでスイッチ同士がループ状につながっていると、フラッディングされたフレームが行き場を失わず、ぐるぐると回り続けてしまいます。
      </p>

      <DiagramFrame
        slug="network-stp-broadcast-storm"
        aspect="620 / 460"
        caption="ブロードキャストストーム。3台のスイッチが三角形にループ接続されていると、1台が発したブロードキャストフレームがSW1からSW2、SW2からSW3、SW3からSW1へと永遠に回り続け、増殖しながら帯域を食いつぶす。"
      />

      <p>
        IPパケットにはTTL(生存時間)があり、一定回数中継されると破棄されますが、イーサネットフレームにはこの仕組みがありません。そのため、ループが存在すると<Term>ブロードキャストストーム</Term>と呼ばれる状態になり、フレームが無限に増殖してネットワーク全体の帯域を食いつぶし、他の通信ができなくなります。
      </p>

      <Heading num="01">STPの仕組み ― 1本の経路だけを残す</Heading>
      <p>
        STPは、冗長なリンクを物理的に切断するのではなく、<Term>論理的に一部のポートを転送禁止(ブロッキング)</Term>にすることでループを断ち切ります。手順は次の通りです。
      </p>
      <ol>
        <li>
          スイッチ同士が<Term>BPDU(Bridge Protocol Data Unit)</Term>という制御フレームを交換し、最もふさわしい1台を<Term>ルートブリッジ</Term>として選出する(最小のBridge IDを持つスイッチが選ばれる)
        </li>
        <li>
          ルートブリッジ以外の各スイッチは、自分からルートブリッジまでの<Term>最短経路となるポート</Term>を1つ選び、<Term>ルートポート</Term>とする
        </li>
        <li>
          各セグメント(リンク)ごとに、そのセグメントの代表として転送を担う<Term>指定ポート</Term>を1つ選ぶ
        </li>
        <li>
          ルートポートにも指定ポートにも選ばれなかったポートは<Term>ブロッキングポート</Term>となり、データフレームを転送しない
        </li>
      </ol>

      <DiagramFrame
        slug="network-stp-port-roles"
        aspect="640 / 480"
        caption="STPのポート役割。SW1がルートブリッジに選ばれ、両ポートとも指定ポート(DP)になる。SW2とSW3はそれぞれSW1へ直結するポートがルートポート(RP)になる。SW2とSW3を直結する冗長リンクでは、片方が指定ポート(DP)、もう片方がブロッキングポート(BLK)になりループを断ち切る。"
      />

      <p>
        こうして、ネットワーク全体としては物理的に複数のリンクが存在していても、論理的には<Term>木構造(ツリー)</Term>としてループの無い1本道だけが使われる状態になります。ブロッキングポートになったリンクも、BPDUの送受信自体は続けており、他のリンクが故障すればすぐにブロッキングを解除して転送を再開します。
      </p>

      <Analogy label="💡 たとえるなら">
        STPは、道路が環状につながった街で「この区間は普段は通行止めにしておく」という交通整理に似ています。道路そのものはつながったままなので、別の道が事故で塞がれれば、通行止めを解除してすぐに迂回路として使えます。
      </Analogy>

      <Heading num="02">ポートの状態遷移と関連機能</Heading>
      <p>
        STPが有効なポートは、いきなりデータを転送し始めるのではなく、いくつかの状態を順番にたどります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>状態</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">Blocking</td>
            <td>BPDUの受信のみ。データは転送しない</td>
          </tr>
          <tr>
            <td className="hl">Listening</td>
            <td>ポートの役割(RP/DP/ブロッキング)を決定中。まだ転送しない</td>
          </tr>
          <tr>
            <td className="hl">Learning</td>
            <td>MACアドレステーブルの学習を開始。まだ転送しない</td>
          </tr>
          <tr>
            <td className="hl">Forwarding</td>
            <td>通常のデータ転送を行う</td>
          </tr>
        </tbody>
      </table>
      <p>
        安全のために状態を1段階ずつ確認しながら進むため、リンクがつながってから実際にデータを流せるようになるまで、標準では30秒ほどかかります。PCを直結するようなポートでは、このループのリスクがそもそも無いため、<Term>PortFast</Term>という機能でこの待ち時間を省略し、即座にForwarding状態にすることがよくあります。
      </p>

      <Aside label="つながり">
        VLANという論理的な区切りをまたぐループも同様にSTPで防がれます。複数の物理リンクを1本の論理リンクとして扱うことでSTPからは単一のリンクに見せる仕組みは、「EtherChannel」で扱います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>フレームにTTLが無いのが根本原因</h4>
          <p>ループがあるとブロードキャストフレームが増殖しながら永遠に回り続けます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>物理的につないだまま論理的に切る</h4>
          <p>ルートブリッジを起点に、ルートポート・指定ポート以外をブロッキングにします。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>状態遷移は安全のための段階</h4>
          <p>Blocking→Listening→Learning→Forwardingと段階を踏むため収束に時間がかかります。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/stp" />
    </DocsPage>
  );
}
