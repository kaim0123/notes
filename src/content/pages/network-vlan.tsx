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
  title: "Catalystスイッチの基本設定とVLAN",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>Catalystスイッチの基本設定とVLAN ― 1台のスイッチを論理的に分ける</h1>
        <Lead>
          「イーサネットLANの基礎」で見たスイッチは、そのままでは全ポートが1つの<Term>ブロードキャストドメイン</Term>です。<Term>VLAN(Virtual LAN)</Term>は、1台の物理スイッチを、まるで複数台の独立したスイッチであるかのように論理的に分割する仕組みです。
      </Lead>
      </Hero>

      <Heading num="00">VLAN ― ブロードキャストドメインを論理的に分ける</Heading>
      <p>
        VLANを設定していないスイッチでは、ある1台が送ったブロードキャストフレームが、同じスイッチにつながる全ポートに届きます。ポートの数が増えるほど、無駄なブロードキャストトラフィックや、1台の異常が全体に波及するリスクも大きくなります。VLANは、ポートをグループ分けし、<Term>同じVLAN内だけ</Term>でブロードキャストが届くようにすることで、この範囲を制限します。
      </p>

      <DiagramFrame
        slug="network-vlan-broadcast-domain"
        aspect="720 / 600"
        caption="VLANによるブロードキャストドメイン分割。VLANが無い場合はスイッチ全体が1つのブロードキャストドメインで、1台からのブロードキャストが全ポートに届く。VLANを設定すると同じ物理スイッチがVLAN10とVLAN20という2つの論理的なブロードキャストドメインに分かれ、片方のブロードキャストはもう片方には届かなくなる。"
      />

      <p>
        VLANはIPアドレスのネットワーク部と同じように「同じセグメントかどうか」を分ける役割を持つため、通常<Term>1つのVLАN=1つのIPサブネット</Term>として設計します。異なるVLAN同士が通信するには、「ルータの機能とルーティング」で見たルーターの働き(VLAN間ルーティング)が必要です。
      </p>

      <Heading num="01">アクセスポートとトランクポート</Heading>
      <p>
        スイッチのポートには2種類の役割があります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>種類</th>
            <th>役割</th>
          </tr>
          <tr>
            <td className="hl">アクセスポート</td>
            <td>1つのVLANにだけ所属する。PCなど末端の機器につなぐ。フレームにタグは付かない</td>
          </tr>
          <tr>
            <td className="hl">トランクポート</td>
            <td>複数のVLANのフレームを1本の物理リンクでまとめて運ぶ。スイッチ間の接続に使う</td>
          </tr>
        </tbody>
      </table>
      <p>
        トランクリンクでは、同じ1本のケーブルに複数のVLANのフレームが混在するため、「このフレームはどのVLANのものか」を見分ける目印が必要です。これが<Term>802.1Qタグ</Term>です。
      </p>

      <DiagramFrame
        slug="network-vlan-8021q"
        aspect="800 / 340"
        caption="802.1Qタグの仕組み。アクセスリンクではタグの無い通常のフレームが流れ、トランクリンクを通るときだけSW1が送信元MACとタイプの間に802.1Qタグを挿入し、SW2側でタグを外してから元のアクセスポートへ送り出す。"
      />

      <p>
        802.1Qタグは、イーサネットフレームの<Term>送信元MACアドレスとタイプの間</Term>に挿入され、そのフレームがどのVLANに属するかを表すVLAN IDを運びます。アクセスポートから来たタグなしのフレームは、トランクを渡る間だけタグを付けられ、反対側のアクセスポートへ出るときにタグが外されます。つまりタグは<Term>トランクリンクの上だけ</Term>に存在し、末端の機器がタグ付きフレームを意識することはありません。
      </p>

      <Analogy label="💡 たとえるなら">
        802.1Qタグは、複数の部署の荷物を1台のトラック(トランクリンク)にまとめて運ぶときに貼る「部署名の付箋」です。積み込むとき(アクセス→トランク)に付箋を貼り、届け先の窓口(トランク→アクセス)で付箋を剥がして本来の部署に渡します。荷物自体(フレームの中身)にはずっと触れません。
      </Analogy>

      <p>
        トランク上でタグが省略される特別なVLANを<Term>ネイティブVLAN</Term>と呼びます。トランクの両端でネイティブVLANの設定が食い違っていると、タグの解釈がずれてVLAN間で意図せず通信できてしまう(VLANホッピング)などの問題につながるため、両端で一致させておく必要があります。
      </p>

      <Aside label="つながり">
        VLANという論理的な区切りをまたいでループが起きないようにする仕組みは「STP」、複数の物理リンクを束ねてトランクの帯域を増やす仕組みは「EtherChannel」で扱います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>VLANはブロードキャストドメインの分割</h4>
          <p>1台の物理スイッチを、複数の独立したブロードキャストドメインとして扱えます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>アクセスは1つ、トランクは複数</h4>
          <p>末端機器にはアクセスポート、スイッチ間にはトランクポートを使い分けます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>タグはトランク上だけの目印</h4>
          <p>802.1Qタグはトランクリンクの上だけに存在し、末端の機器は意識しません。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/vlan" />
    </DocsPage>
  );
}
