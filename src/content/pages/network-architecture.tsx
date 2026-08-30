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
  title: "ネットワークアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ネットワークアーキテクチャ ― 1拠点を超えた設計</h1>
        <Lead>
          ここまでは主に1つのLANの中の話でした。ここでは視点を広げ、1つの拠点のLANをどう階層的に設計するか、複数の拠点をどうつなぐか、そしてサーバーそのものをどう仮想化・クラウド化するかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">LANの設計モデル ― 3層アーキテクチャ</Heading>
      <p>
        オフィスや拠点のLANは、規模が大きくなるほど「どのスイッチがどの役割を担うか」を整理しないと管理が難しくなります。よく使われるのが、役割ごとに3つの層に分ける<Term>3層アーキテクチャ</Term>です。
      </p>

      <DiagramFrame
        slug="network-arch-three-tier"
        aspect="700 / 440"
        caption="3層LAN設計モデル。最上位のコア層は2台の高速スイッチが冗長にバックボーンを構成し、中間のディストリビューション層は各コアスイッチへ二重に接続してポリシーを適用し、最下位のアクセス層は各スイッチが両方のディストリビューションスイッチへ二重に接続して端末を収容する。"
      />

      <table>
        <tbody>
          <tr>
            <th>層</th>
            <th>役割</th>
          </tr>
          <tr>
            <td className="hl">コア層</td>
            <td>拠点全体のバックボーン。とにかく高速に中継することに専念する</td>
          </tr>
          <tr>
            <td className="hl">ディストリビューション層</td>
            <td>複数のアクセス層を集約し、VLAN間ルーティングやACLなどのポリシーを適用する</td>
          </tr>
          <tr>
            <td className="hl">アクセス層</td>
            <td>PCやAPなど末端の機器を実際に収容する窓口</td>
          </tr>
        </tbody>
      </table>
      <p>
        各層とも上位層の2台に二重に接続することで、どちらか1台が故障してももう1台に迂回できます。役割ごとに層を分けておくことで、「ポリシーを変えたいときはディストリビューション層だけ触ればよい」というように、変更の影響範囲も見積もりやすくなります。
      </p>

      <Heading num="01">WANとVPN ― 拠点同士をつなぐ</Heading>
      <p>
        本社と支社のように、地理的に離れた拠点のLAN同士をつなぐ広域のネットワークを<Term>WAN(Wide Area Network)</Term>と呼びます。専用線を敷く方法は安全ですが高価なため、多くの場合は安価なインターネット回線を使いつつ、<Term>VPN(Virtual Private Network)</Term>で安全性を確保します。
      </p>

      <DiagramFrame
        slug="network-vpn-tunnel"
        aspect="800 / 260"
        caption="VPNトンネル。拠点AのLANから拠点BのLANへの通信は、両端のVPNゲートウェイの間だけ暗号化トンネルとして信頼できないインターネットを通過し、拠点内のホストは平文のまま通信している意識で済む。"
      />

      <p>
        VPNは、信頼できないインターネットの区間だけを<Term>暗号化トンネル</Term>で覆い、両端のVPNゲートウェイだけが暗号化・復号を担当します。拠点内のホストからは、あたかも同じ社内LANの中にいるかのように、相手拠点と通信できます。
      </p>

      <Analogy label="💡 たとえるなら">
        VPNは「一般道を通る現金輸送車」に似ています。道路(インターネット)そのものは誰でも使える公共のものですが、輸送車(トンネル)が頑丈な装甲(暗号化)で覆われているため、中身を安全に運べます。積み荷を送り出す側と受け取る側の窓口(VPNゲートウェイ)だけが、装甲車への積み下ろし作業を担当します。
      </Analogy>

      <Heading num="02">サーバーの仮想化とクラウド</Heading>
      <p>
        1台の物理サーバーの上で、複数の独立した仮想的なサーバー(<Term>仮想マシン</Term>)を同時に動かす技術を<Term>サーバー仮想化</Term>と呼びます。1台のハードウェアを効率よく使い回せるほか、仮想マシン単位で複製・移動ができるため、障害対応や拡張が容易になります。
      </p>
      <p>
        <Term>クラウド</Term>は、この仮想化の仕組みを、自社で物理サーバーを持たずに外部の事業者から必要な分だけ借りて使う形態です。自社でサーバー機器を購入・保守する代わりに、使った分だけ料金を払い、必要に応じて即座に台数を増減できます。
      </p>

      <Aside label="つながり">
        クラウド事業者のネットワークをどう設計するか、仮想化基盤の具体的な技術(ハイパーバイザーなど)の詳細は「インフラ・クラウド・運用」のセクションでさらに掘り下げます。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>3層は役割分担と二重化</h4>
          <p>コア・ディストリビューション・アクセスに役割を分け、各層を二重に接続します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>VPNは区間だけを暗号化</h4>
          <p>信頼できないインターネット区間だけをトンネルで覆い、拠点内は意識せずに済みます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>クラウドは仮想化の外部化</h4>
          <p>サーバー仮想化を自社で持たず、外部から必要な分だけ借りる形態がクラウドです。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/architecture" />
    </DocsPage>
  );
}
