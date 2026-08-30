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
  title: "イーサネットLANの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>イーサネットLANの基礎 ― 同じ拠点内でどう届けるか</h1>
        <Lead>
          「TCP/IPの概要」で見たネットワークインターフェース層の中身が<Term>イーサネット</Term>です。同じLANの中で、スイッチがどうやって宛先を見分け、余計な相手にフレームを送らずに届けているのか ― MACアドレス・フレーム構造・スイッチの学習の仕組みを順番に見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">ハブからスイッチへ ― 衝突ドメインという問題</Heading>
      <p>
        古いLANでは<Term>ハブ</Term>という装置が使われていました。ハブは受け取った信号を、送られてきたポート以外の全ポートにそのまま流す、電気的な中継器です。この方式には弱点があり、複数の機器が同時に送信すると信号が衝突(コリジョン)してしまいます。信号が衝突しうる範囲を<Term>衝突ドメイン</Term>と呼び、ハブではポート全体が1つの衝突ドメインを共有します。
      </p>
      <p>
        現在主流の<Term>スイッチ</Term>は、宛先を見て必要なポートだけにフレームを転送する装置です。ポートごとに衝突ドメインが独立しているため、同時に複数の通信が行われても衝突しません。
      </p>

      <DiagramFrame
        slug="network-ethernet-collision-domain"
        aspect="720 / 585"
        caption="ハブとスイッチの衝突ドメインの違い。ハブは全ポートが1つの衝突ドメインを共有するため、2台が同時に送信すると衝突が起きる。スイッチはポートごとに独立した衝突ドメインを持つため、同時に送受信しても衝突しない。"
      />

      <Aside label="豆知識">
        現在のスイッチの多くは送信と受信を同時に行える<Term>全二重(Full Duplex)</Term>通信で動作しており、そもそも衝突が起こりません。衝突を検知して再送する<Term>CSMA/CD</Term>という制御方式は、ハブを使う半二重通信の時代の名残です。
      </Aside>

      <Heading num="01">イーサネットフレームの構造</Heading>
      <p>
        LANの中を流れるデータのかたまりを<Term>フレーム</Term>と呼びます(「TCP/IPの概要」のカプセル化で見たPDUの1つです)。フレームには次の情報が順番に並んでいます。
      </p>

      <DiagramFrame
        slug="network-ethernet-frame"
        aspect="860 / 220"
        caption="イーサネットフレームの構造。宛先MACアドレス6バイト、送信元MACアドレス6バイト、タイプ2バイトに続けてデータが46〜1500バイト入り、末尾に誤り検出用のFCSが4バイト付く。"
      />

      <p>
        スイッチが転送先を決めるときに見ているのは、この中の<Term>宛先MACアドレス</Term>と<Term>送信元MACアドレス</Term>だけです。データの中身(その上のIPパケットなど)は一切見ません。
      </p>

      <Heading num="02">MACアドレス ― 世界に1つの機器の名札</Heading>
      <p>
        <Term>MACアドレス</Term>は、ネットワーク機器の通信インタフェース(NIC)に製造時点で焼き込まれる48ビットの識別子で、<code>00-1A-2B-3C-4D-5E</code>のように16進数6組で表記します。前半24ビットはメーカーを表す<Term>OUI(ベンダーコード)</Term>、後半24ビットはそのメーカー内での通し番号で、これにより世界中の機器と重複しない値になっています。
      </p>
      <table>
        <tbody>
          <tr>
            <th>種類</th>
            <th>宛先</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">ユニキャスト</td>
            <td>特定の1台だけ</td>
            <td>通常の通信</td>
          </tr>
          <tr>
            <td className="hl">ブロードキャスト</td>
            <td>同じLANの全員</td>
            <td>FF-FF-FF-FF-FF-FF</td>
          </tr>
          <tr>
            <td className="hl">マルチキャスト</td>
            <td>特定のグループ</td>
            <td>特定範囲のアドレス帯</td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">スイッチのMACアドレス学習</Heading>
      <p>
        スイッチは、どのMACアドレスがどのポートの先にいるかを<Term>MACアドレステーブル</Term>という表に自動で記録していきます。仕組みはとてもシンプルです。
      </p>
      <ol>
        <li>フレームを受け取ったら、<Term>送信元MACアドレス</Term>と「入ってきたポート番号」をペアにして表に記録する</li>
        <li>フレームの<Term>宛先MACアドレス</Term>が表にあれば、そのポートだけに転送する</li>
        <li>表にまだ無ければ、宛先が分からないので受信ポート以外の全ポートに<Term>フラッディング</Term>(あふれさせて送る)する</li>
      </ol>

      <DiagramFrame
        slug="network-ethernet-mac-learning"
        aspect="780 / 500"
        caption="スイッチのMACアドレス学習。1回目はPC-AからPC-Cへのフレームの送信元MACアドレスをポート1に記録し、宛先PC-Cはまだ表に無いため全ポートへフラッディングする。PC-Cが応答すると送信元MACアドレスをポート3に記録し、以降はPC-AとPC-Cの間のフレームを表を見て該当ポートだけに転送する。"
      />

      <Analogy label="💡 たとえるなら">
        スイッチは「新人の受付係」のようなものです。最初は誰がどの部屋にいるか知らないので、来客(フレーム)が届くたびに「この人はこの部屋から来た」とメモ(MACアドレステーブル)を取っていきます。宛先の部屋がまだメモに無ければ、念のため全部屋に声をかけて(フラッディング)確認しますが、一度メモが揃えば、次からは目的の部屋だけに直接案内できます。
      </Analogy>

      <Aside label="つながり">
        MACアドレステーブルに記録された内容が古くなったり(端末の入れ替え等)、意図的に溢れさせられたりする問題への対処は、「Catalystスイッチの基本設定とVLAN」「セキュリティ」のページで扱います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>衝突ドメインはポート単位</h4>
          <p>ハブは全ポート共有、スイッチはポートごとに独立していて衝突が起きません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スイッチが見るのはMACアドレスだけ</h4>
          <p>フレームの宛先・送信元MACアドレスだけを見て転送先を決めます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>学習は送信元、転送は宛先</h4>
          <p>送信元MACアドレスで表を作り、宛先MACアドレスで表を引いて転送します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/ethernet" />
    </DocsPage>
  );
}
