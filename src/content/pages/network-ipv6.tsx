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
  title: "IPv6",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>IPv6 ― 枯渇したアドレス空間の後継</h1>
        <Lead>
          「IPv4アドレッシングの基礎」で見た32ビットのアドレス空間は、インターネットに接続する機器の数に対してすでに不足しています。<Term>IPv6</Term>は、アドレス長を大幅に拡張し、あわせて表記や仕組みも整理し直した後継のプロトコルです。
        </Lead>
      </Hero>

      <Heading num="00">IPv6アドレスの表記</Heading>
      <p>
        IPv6アドレスは<Term>128ビット</Term>で、16ビットずつ8つのグループに区切り、それぞれを16進数にして<Term>コロン(:)</Term>で区切って表記します。桁数が多く冗長になりがちなため、2つの省略ルールが用意されています。
      </p>

      <DiagramFrame
        slug="network-ipv6-notation"
        aspect="700 / 320"
        caption="IPv6アドレスの省略表記。元のアドレス2001:0db8:0000:0000:0000:ff00:0042:8329は、まず各グループの先頭の0を省略して2001:db8:0:0:0:ff00:42:8329になり、次に連続する0のグループを1箇所だけ::に置き換えて2001:db8::ff00:42:8329という最終形になる。"
      />

      <p>
        <Term>::</Term>による省略は、1つのアドレスにつき<Term>1回だけ</Term>しか使えません。2箇所以上で使ってしまうと、それぞれの<code>::</code>が0をいくつ表しているのかが一意に決まらなくなるためです。
      </p>

      <Heading num="01">IPv4との違い</Heading>
      <p>
        IPv6は単にアドレスを長くしただけでなく、いくつかの点でIPv4から仕組みを整理しています。
      </p>

      <DiagramFrame
        slug="network-ipv4-vs-ipv6"
        aspect="700 / 340"
        caption="IPv4とIPv6の違い。アドレス長は32ビットと128ビット、表記は10進数4組のドット区切りと16進数8組のコロン区切り、ブロードキャストはIPv4にはあるがIPv6では廃止されマルチキャストに置き換えられ、アドレス自動設定はIPv4がDHCP頼みなのに対しIPv6はSLAACを標準装備する。"
      />

      <p>
        IPv6では<Term>ブロードキャスト</Term>が廃止されました。同一セグメントの全員に届ける必要がある場面では、代わりに特定のグループだけに届く<Term>マルチキャスト</Term>を使います。全員に無差別に届けるのではなく、必要な相手だけに絞り込む設計に寄せています。
      </p>

      <Heading num="02">アドレスの種類</Heading>
      <table>
        <tbody>
          <tr>
            <th>種類</th>
            <th>役割</th>
          </tr>
          <tr>
            <td className="hl">グローバルユニキャスト</td>
            <td>インターネット上で一意な、IPv4のグローバルIPアドレスに相当するアドレス</td>
          </tr>
          <tr>
            <td className="hl">リンクローカル</td>
            <td>同一リンク内だけで有効なアドレス。IPv6を使う各インタフェースに自動で割り当てられる</td>
          </tr>
          <tr>
            <td className="hl">マルチキャスト</td>
            <td>特定のグループに属する複数の機器へまとめて届ける(ブロードキャストの代替)</td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">SLAAC ― DHCPに頼らないアドレス自動設定</Heading>
      <p>
        IPv4では、IPアドレスの自動設定は基本的にDHCPサーバーに頼っていました。IPv6では、<Term>SLAAC(Stateless Address Autoconfiguration)</Term>という仕組みが標準で備わっており、ルーターが定期的に送る<Term>RA(Router Advertisement)</Term>というメッセージからネットワーク部の情報を受け取り、ホスト側が自分のMACアドレスなどを組み合わせてホスト部を生成することで、DHCPサーバーが無くても自分でアドレスを組み立てられます。
      </p>

      <Analogy label="💡 たとえるなら">
        SLAACは「町名(ネットワーク部)だけ回覧板で知らされ、番地(ホスト部)は自分の名前をもとに自分で決める」引っ越しのようなものです。DHCPのように役所(DHCPサーバー)が1件ずつ番地を割り当てなくても、各自が矛盾なく自分の住所を決められます。
      </Analogy>

      <Aside label="つながり">
        IPv6でもDHCPを使ってさらに細かい情報(DNSサーバーのアドレスなど)まで配布したい場合はDHCPv6を使いますが、アドレスそのものの割り当てはSLAACだけで完結できる点がIPv4と大きく違います。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>::の省略は1回だけ</h4>
          <p>連続する0のグループを::に置き換えられますが、1つのアドレスにつき1回までです。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ブロードキャストは廃止</h4>
          <p>全員に届けたい場面ではマルチキャストを使う設計に整理されています。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>SLAACで自分でアドレスを組み立てる</h4>
          <p>ルーターからのRAを手がかりに、DHCPサーバーが無くてもアドレスを自動設定できます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/ipv6" />
    </DocsPage>
  );
}
