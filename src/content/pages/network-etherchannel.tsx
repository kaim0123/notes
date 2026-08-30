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
  title: "EtherChannel",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>EtherChannel ― 複数のリンクを1本として束ねる</h1>
        <Lead>
          「STP」で見た通り、スイッチ間に冗長リンクを用意すると、ループを防ぐためにどれか1本以外はブロッキングされてしまいます。<Term>EtherChannel</Term>は、複数の物理リンクを論理的に1本のリンクとして束ね、STPからループに見えないようにしたうえで、帯域を合算して使う技術です。
        </Lead>
      </Hero>

      <Heading num="00">なぜ束ねるのか ― STPからは1本に見せる</Heading>
      <p>
        同じ2台のスイッチ間に物理リンクを2本用意しただけでは、STPはこれを2つの独立した経路とみなし、ループを防ぐために片方を<Term>ブロッキング</Term>にしてしまいます。これでは、せっかく増設した帯域を活かせません。
      </p>

      <DiagramFrame
        slug="network-etherchannel-bundle"
        aspect="640 / 420"
        caption="EtherChannel。束ねていない場合、STPは2本の物理リンクを別々のループとみなし片方をブロッキングにするため帯域を活かせない。EtherChannelで束ねると論理的には1本のリンクに見えるためSTPはループとみなさず、両方の物理リンクを同時に使って帯域を合算できる。"
      />

      <p>
        EtherChannelで複数のポートを<Term>Port-channel</Term>としてグループ化すると、STPを含む上位のプロトコルからは<Term>1本の論理リンク</Term>としてしか見えなくなります。ループとみなされないため、ブロッキングされることなく、束ねた全ポートを同時に使って帯域を合算できます。
      </p>

      <Heading num="01">ネゴシエーションプロトコル</Heading>
      <p>
        複数のポートを正しく1つの論理リンクとして束ねるには、両端のスイッチが「どのポートを束ねるか」で合意する必要があります。この合意にはネゴシエーションプロトコルを使う方法と、使わずに固定で設定する方法があります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">LACP(標準)</td>
            <td>IEEE標準のネゴシエーションプロトコル。異なるメーカー同士でも使える</td>
          </tr>
          <tr>
            <td className="hl">PAgP(Cisco独自)</td>
            <td>Cisco製スイッチ同士でのみ使えるネゴシエーションプロトコル</td>
          </tr>
          <tr>
            <td className="hl">on(固定)</td>
            <td>ネゴシエーションを行わず、無条件に束ねる。両端の設定ミスに気づきにくい</td>
          </tr>
        </tbody>
      </table>
      <p>
        LACP・PAgPには、自分から積極的に交渉を始める<Term>active</Term>モードと、相手から交渉が来たら応じる<Term>passive</Term>モードがあります。両端が<Term>passive</Term>同士だと、どちらも交渉を始めないためEtherChannelが確立しない点に注意します。
      </p>

      <Heading num="02">ロードバランシング ― どの通信をどのリンクに振り分けるか</Heading>
      <p>
        複数の物理リンクを束ねても、1つの通信(フロー)を細切れにして複数のリンクにばらまくと、パケットの到着順序が入れ替わってしまう恐れがあります。そこでEtherChannelは、送信元/宛先のMACアドレスやIPアドレスなどから計算した<Term>ハッシュ値</Term>をもとに、フロー単位でどの物理リンクを使うかを決めます。
      </p>

      <DiagramFrame
        slug="network-etherchannel-loadbalance"
        aspect="640 / 360"
        caption="EtherChannelのロードバランシング。複数の通信(フロー)がハッシュ関数に渡され、送信元/宛先のMACやIPなどから計算した結果によって、どちらの物理リンクを使うかが決まる。同じフローは常に同じリンクに固定されるため、パケットの順序が入れ替わらない。"
      />

      <p>
        同じフローは常に同じハッシュ値になるため、常に同じ物理リンクを通ります。これにより、束ねた複数のリンク全体では負荷が分散されつつ、1つの通信の中では順序が保たれます。
      </p>

      <Analogy label="💡 たとえるなら">
        EtherChannelのロードバランシングは、スーパーのレジで「同じ客の荷物は同じレジ袋にまとめる」ルールに似ています。客ごと(フロー単位)にどのレジ袋(物理リンク)を使うかは決まっていて、1人の客の荷物が複数の袋にバラバラに分かれることはありません。
      </Analogy>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>STPからは1本の論理リンク</h4>
          <p>束ねることでループとみなされなくなり、ブロッキングされずに帯域を合算できます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>LACPは標準、PAgPはCisco独自</h4>
          <p>ネゴシエーションのactive/passiveの組み合わせによっては確立しない点に注意します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>振り分けはフロー単位</h4>
          <p>ハッシュ値で振り分けることで、負荷分散と1フロー内の順序保証を両立します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/etherchannel" />
    </DocsPage>
  );
}
