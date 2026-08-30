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
  title: "IPv4アドレッシングの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>IPv4アドレッシングの基礎 ― 住所をどう割り振るか</h1>
        <Lead>
          「TCP/IPの概要」で見たインターネット層の中心的な仕事が、IPアドレスによる住所付けと経路選択です。ここではIPv4アドレスの構造、ネットワーク部とホスト部を分けるサブネットマスク、そして1つのネットワークを複数に分割する<Term>サブネッティング</Term>の考え方を押さえます。
        </Lead>
      </Hero>

      <Heading num="00">IPv4アドレスの構造</Heading>
      <p>
        <Term>IPv4アドレス</Term>は32ビットの数値で、8ビットずつ4つの<Term>オクテット</Term>に区切り、それぞれを10進数にして<code>192.168.1.10</code>のようにピリオドで区切って表記します(<Term>ドット区切り10進表記</Term>)。1つのオクテットは8ビットなので、0〜255の範囲になります。
      </p>
      <p>
        このアドレスは、そのまま32ビット全部を機器の識別に使うわけではありません。前半を「どのネットワークか」を表す<Term>ネットワーク部</Term>、後半を「そのネットワーク内のどの機器か」を表す<Term>ホスト部</Term>として、2つの意味に分けて使います。
      </p>

      <Heading num="01">サブネットマスク ― どこまでがネットワーク部か</Heading>
      <p>
        ネットワーク部とホスト部の境界がどこにあるかを示すのが<Term>サブネットマスク</Term>です。マスクのビットが1の部分がネットワーク部、0の部分がホスト部を意味します。マスクは32ビットの1と0の並びですが、実際にはネットワーク部のビット数(先頭から連続する1の数)だけを使って、<Term>CIDR記法</Term>(<code>/24</code>のような表記)で書くのが一般的です。
      </p>

      <DiagramFrame
        slug="network-ipv4-mask"
        aspect="760 / 260"
        caption="IPアドレスとサブネットマスクの関係。例として192.168.1.10/24を4つのオクテットに分解し、マスク255.255.255.0の1が並ぶ最初の3オクテットがネットワーク部、0が並ぶ最後の1オクテットがホスト部であることを示す。"
      />

      <Analogy label="💡 たとえるなら">
        IPアドレスを住所に例えると、ネットワーク部は「◯◯市◯◯町」、ホスト部は「◯番地」にあたります。同じ町名(ネットワーク部)の中でだけ番地(ホスト部)で個々の家を区別できればよく、別の町にある同じ番地とは区別する必要がありません。
      </Analogy>

      <h3>クラスフルアドレッシングとCIDR</h3>
      <p>
        インターネットの初期には、アドレスをA・B・Cの3クラスに固定長で分ける<Term>クラスフルアドレッシング</Term>が使われていました。
      </p>
      <table>
        <tbody>
          <tr>
            <th>クラス</th>
            <th>先頭オクテット</th>
            <th>デフォルトマスク</th>
          </tr>
          <tr>
            <td className="hl">クラスA</td>
            <td>1〜126</td>
            <td>/8(255.0.0.0)</td>
          </tr>
          <tr>
            <td className="hl">クラスB</td>
            <td>128〜191</td>
            <td>/16(255.255.0.0)</td>
          </tr>
          <tr>
            <td className="hl">クラスC</td>
            <td>192〜223</td>
            <td>/24(255.255.255.0)</td>
          </tr>
        </tbody>
      </table>
      <p>
        しかしクラス単位では割り当てが荒すぎて(クラスCの254台では足りないがクラスBの65,534台は無駄が多い、など)アドレスの無駄遣いが問題になり、任意のビット数で区切れる<Term>CIDR(Classless Inter-Domain Routing)</Term>に置き換えられました。現在の<code>/24</code>のような表記はCIDRによるものです。
      </p>

      <Heading num="02">サブネッティング ― 1つのネットワークを分割する</Heading>
      <p>
        1つのネットワークを、部署やフロアごとなど複数の小さなネットワークに分けたいことがあります。これには、ホスト部の先頭ビットを何ビースかネットワーク部に「借りる」ことで実現します。借りたビット数をnとすると、ネットワークは<Term>2ⁿ個</Term>のサブネットに分割されます。
      </p>

      <DiagramFrame
        slug="network-ipv4-subnetting"
        aspect="760 / 270"
        caption="サブネッティングの例。192.168.1.0/24というホスト部8ビット・256個のアドレスを持つネットワークから、ホスト部の先頭2ビットを借りて/26にすると、64個ずつ4つのサブネットに分割できる。"
      />

      <p>
        どのサブネットでも、範囲の先頭は<Term>ネットワークアドレス</Term>(そのネットワーク自体を指し、機器には割り当てられない)、末尾は<Term>ブロードキャストアドレス</Term>(そのネットワーク内の全員を指し、これも機器には割り当てられない)になります。実際に機器へ割り当てられる<Term>ホストアドレス</Term>は、その間の分だけです。
      </p>

      <Heading num="03">プライベートIPアドレスとグローバルIPアドレス</Heading>
      <p>
        IPv4アドレスには、インターネット上で直接使ってよい<Term>グローバルIPアドレス</Term>と、組織内のLANなど閉じた範囲でだけ自由に使ってよい<Term>プライベートIPアドレス</Term>があります。プライベートIPアドレスは重複が許されるため、世界中の家庭やオフィスで同じ<code>192.168.1.1</code>が使われていても問題になりません。
      </p>
      <table>
        <tbody>
          <tr>
            <th>範囲</th>
            <th>クラス</th>
          </tr>
          <tr>
            <td className="hl">10.0.0.0/8</td>
            <td>クラスA</td>
          </tr>
          <tr>
            <td className="hl">172.16.0.0/12</td>
            <td>クラスB</td>
          </tr>
          <tr>
            <td className="hl">192.168.0.0/16</td>
            <td>クラスC</td>
          </tr>
        </tbody>
      </table>

      <Aside label="つながり">
        プライベートIPアドレスを使う機器がインターネット(グローバルIPアドレスの世界)と通信するための変換は「NAT・DHCP・DNS」のページで、IPアドレスを自動配布する仕組みは同じページの「DHCP」で扱います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>マスクが境界を決める</h4>
          <p>マスクの1がネットワーク部、0がホスト部。/24のようなCIDR表記が実務の標準です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>借りたビット数だけ2ⁿ分割</h4>
          <p>ホスト部からビットを借りると、そのビット数の2乗の数だけサブネットに分割できます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>先頭と末尾は使えない</h4>
          <p>各サブネットの先頭(ネットワークアドレス)と末尾(ブロードキャストアドレス)は機器に割り当てられません。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/ipv4-addressing" />
    </DocsPage>
  );
}
