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
  title: "IPサービスと運用",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>IPサービスと運用 ― 止めない・詰まらせない・見張るための機能</h1>
        <Lead>
          ネットワークは「つながる」だけでなく「止まらない」「遅くならない」「異常に気づける」ことも重要です。デフォルトゲートウェイを冗長化する<Term>HSRP</Term>、混雑時の優先順位を決める<Term>QoS</Term>、機器の状態を監視する<Term>SNMP</Term>という3つの運用機能を見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">HSRP ― デフォルトゲートウェイを冗長化する</Heading>
      <p>
        「ルータの機能とルーティング」で見た通り、ホストは基本的に1つの<Term>デフォルトゲートウェイ</Term>しか設定できません。そのルーターが故障すると、ホストは外部と通信できなくなってしまいます。<Term>HSRP(Hot Standby Router Protocol)</Term>は、複数のルーターで1つの<Term>仮想IPアドレス・仮想MACアドレス</Term>を共有し、ホストからは常に1台の頑丈なルーターがいるかのように見せる仕組みです。
      </p>

      <DiagramFrame
        slug="network-hsrp-failover"
        aspect="700 / 400"
        caption="HSRP。通常時はPCが仮想IP宛に送ったパケットを実際にはActiveのR1が転送し、StandbyのR2は待機している。R1が障害で止まると、R2が同じ仮想IP・仮想MACを引き継いでActiveに昇格し、PC側は設定を変えないまま通信を継続できる。"
      />

      <p>
        普段は優先度の高い1台が<Term>Active</Term>として実際の転送を担当し、もう1台は<Term>Standby</Term>として待機します。ActiveはHelloパケットを定期的に送り続け、これが一定時間途絶えるとStandbyがActiveに昇格して仮想IP/仮想MACを引き継ぎます。ホスト側の設定(デフォルトゲートウェイのアドレス)は変わらないため、切り替わりを意識する必要がありません。
      </p>

      <Heading num="01">QoS ― 混雑時に何を優先するか</Heading>
      <p>
        回線の帯域には限りがあり、全員が同時に大量のデータを送れば混雑(輻輳)します。<Term>QoS(Quality of Service)</Term>は、トラフィックの種類ごとに優先順位を付け、混雑時にも重要な通信を優先して送り届ける仕組みです。
      </p>

      <DiagramFrame
        slug="network-qos-queuing"
        aspect="700 / 440"
        caption="QoSのキューイング。音声・動画・データのトラフィックが分類・マーキングされ、優先度の異なる3つのキューに振り分けられる。スケジューラは帯域が足りないとき、優先度の高いキューから先に送出することで、音声や動画の遅延を避ける。"
      />

      <p>
        音声通話や映像会議は、少しの遅延やゆらぎ(ジッター)がそのまま聞き取りにくさ・見づらさにつながるため、優先度を高く設定するのが一般的です。一方、ファイルのバックアップのような通信は、多少遅れても実害が少ないため優先度を低くします。QoSは通信を速くする技術ではなく、<Term>限られた帯域を何に優先して使うかを決める</Term>技術である点がポイントです。
      </p>

      <Analogy label="💡 たとえるなら">
        QoSは救急車を優先して通す交通整理に似ています。道路(回線)の広さ自体は変わりませんが、緊急性の高い車(音声・映像)を先に通し、急がなくてよい車(バックアップ通信)には少し待ってもらいます。
      </Analogy>

      <Heading num="02">SNMP ― 機器の状態を監視する</Heading>
      <p>
        <Term>SNMP(Simple Network Management Protocol)</Term>は、監視する側の<Term>マネージャ</Term>と、監視される機器側で動く<Term>エージェント</Term>のやり取りで、ネットワーク機器のCPU使用率やインタフェースの状態といった情報を収集する仕組みです。
      </p>

      <DiagramFrame
        slug="network-snmp-poll-trap"
        aspect="620 / 400"
        caption="SNMPのポーリングとトラップ。ポーリングはマネージャが定期的にGETで値を尋ね、エージェントが応答する仕組み。トラップはエージェント側で異常が起きたときに、尋ねられなくても即座にマネージャへ通知する仕組み。"
      />

      <p>
        マネージャが定期的に値を尋ねる<Term>ポーリング(GET)</Term>と、エージェント側の判断で異常を即座に知らせる<Term>トラップ</Term>は、それぞれ得意分野が違います。ポーリングだけでは異常発生から検知までに間隔分の遅れが生じ、トラップだけでは「正常に動いているか」の定期確認ができません。実際の監視ではこの2つを組み合わせて使います。
      </p>

      <Aside label="つながり">
        機器から出力されるログをどう集約・分析するかは「デバイスの管理」のシステムログの節で扱います。SNMPが「数値で状態を尋ねる」のに対し、システムログは「機器自身が出来事を記録する」という違いがあります。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>HSRPは仮想IPで冗長化</h4>
          <p>複数のルーターが仮想IP/仮想MACを共有し、故障時もホスト側の設定は変わりません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>QoSは優先順位付け</h4>
          <p>帯域そのものを増やすのではなく、混雑時に何を優先するかを決める技術です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>SNMPはポーリングとトラップの併用</h4>
          <p>定期確認のポーリングと、即時通知のトラップを組み合わせて監視します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/ip-services" />
    </DocsPage>
  );
}
