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
  title: "ACL",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ACL ― 通していい通信を明示的に選ぶ</h1>
        <Lead>
          <Term>ACL(Access Control List)</Term>は、ルーターやスイッチを通過するパケットを、条件に応じて通す(permit)か捨てる(deny)かを決めるルールリストです。「標準」と「拡張」で見られる範囲が違い、置き場所の考え方も変わってきます。
        </Lead>
      </Hero>

      <Heading num="00">ACLの評価順序 ― 上から順に、最初の一致で決まる</Heading>
      <p>
        ACLは、複数の条件(行)を並べたリストです。パケットが来るたびに、<Term>上から順番に</Term>条件と照合し、最初に一致した行のpermit/denyがそのまま適用されて、そこで評価は終わります。以降の行がどんなに「正しそうな」内容でも、一致した時点で評価は打ち切られる点が重要です。
      </p>

      <DiagramFrame
        slug="network-acl-flow"
        aspect="640 / 480"
        caption="ACLの評価順序。パケットが届くとACLの行を上から順に照合し、最初に一致した行のpermitまたはdenyがその場で適用されて評価は終わる。最後まで一致する行が無ければ、暗黙のdeny allによって破棄される。"
      />

      <p>
        すべての行に一致しなかった場合、ACLの末尾には目に見えない<Term>暗黙のdeny all</Term>があり、そこに一致して破棄されます。「許可したいものだけ明示的に書く」のがACLの基本姿勢で、何も書かなければ原則すべて拒否される、と覚えておきます。
      </p>

      <Heading num="01">標準ACLと拡張ACL</Heading>
      <p>
        ACLには大きく2種類があり、見られる情報の範囲が異なります。
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>標準ACL</th>
            <th>拡張ACL</th>
          </tr>
          <tr>
            <td className="hl">見られる情報</td>
            <td>送信元IPアドレスのみ</td>
            <td>送信元/宛先IP、プロトコル、ポート番号など</td>
          </tr>
          <tr>
            <td className="hl">番号範囲</td>
            <td>1〜99、1300〜1999</td>
            <td>100〜199、2000〜2699</td>
          </tr>
          <tr>
            <td className="hl">向いている配置</td>
            <td>宛先の近く</td>
            <td>送信元の近く</td>
          </tr>
        </tbody>
      </table>
      <p>
        条件を指定するときのマスクは、サブネットマスクではなく「OSPF」の章で見た<Term>ワイルドカードマスク</Term>を使います。0のビットが一致必須、1のビットが任意(don&apos;t care)という意味は、OSPFの<code>network</code>コマンドと同じです。
      </p>

      <Heading num="02">配置場所の考え方</Heading>
      <p>
        標準ACLは送信元IPアドレスしか見られないため、経路の途中(送信元に近い場所)に置くと、その送信元からの<Term>他の宛先への通信まで巻き添え</Term>にしてしまいます。そこで標準ACLは<Term>宛先に近いルーター</Term>に置くのが基本です。逆に拡張ACLは送信元・宛先・ポートまで細かく指定できるので、<Term>送信元に近いルーター</Term>に置いて、無駄なトラフィックがネットワークの奥まで流れ込む前に止めるのが基本です。
      </p>

      <DiagramFrame
        slug="network-acl-placement"
        aspect="720 / 380"
        caption="標準ACLと拡張ACLの配置場所の違い。標準ACLは送信元IPしか見られないため宛先の近く(R2)に置く必要があり、拡張ACLは送信元・宛先・ポートまで指定できるため送信元の近く(R1)に置いて早い段階で不要な通信を止められる。"
      />

      <Analogy label="💡 たとえるなら">
        標準ACLは「名前だけを見る門番」です。名前だけで判断するので、建物の入り口(宛先の近く)に立たせないと、まだ行き先の決まっていない人まで間違って追い返してしまいます。拡張ACLは「名前・行き先・用件まで確認できる門番」なので、街の入り口(送信元の近く)に立たせても、正確に必要な人だけを通せます。
      </Analogy>

      <Heading num="03">トラブルシューティングの勘所</Heading>
      <p>
        ACLがらみのトラブルは、次の3点を疑うとほとんど説明がつきます。
      </p>
      <ol>
        <li>
          <Term>暗黙のdeny all</Term>を忘れていないか ― 許可したいつもりの通信が、最後まで一致せず拒否されていないか
        </li>
        <li>
          <Term>行の順序</Term>が意図通りか ― 広い条件を先に書くと、後ろの細かい条件が評価されないまま終わってしまう
        </li>
        <li>
          <Term>適用する向き(in/out)とインタフェース</Term>が正しいか ― 意図した方向・場所にACLが適用されているか
        </li>
      </ol>
      <pre>
        <code>{`Router# show access-lists 101
Extended IP access list 101
    10 permit tcp 192.168.1.0 0.0.0.255 any eq 443 (32 matches)
    20 deny ip any any (128 matches)`}</code>
      </pre>
      <p>
        <code>show access-lists</code>の各行に表示される<Term>matches</Term>の数を見れば、どの行が実際にどれだけ使われているかが分かり、「意図した行に当たっているか」「末尾のdenyばかりに当たっていないか」を確認できます。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>上から順に先勝ち</h4>
          <p>最初に一致した行だけが適用され、以降の行は評価されません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>標準は宛先近く、拡張は送信元近く</h4>
          <p>見られる情報の範囲の違いが、そのまま向いている配置場所の違いになります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>暗黙のdenyを忘れない</h4>
          <p>明示的なpermit/denyが無ければ、最後は必ず暗黙のdeny allで拒否されます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/acl" />
    </DocsPage>
  );
}
