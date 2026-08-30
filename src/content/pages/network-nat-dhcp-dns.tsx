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
  title: "NAT・DHCP・DNS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>NAT・DHCP・DNS ― 実務で毎日働く3つの縁の下の力持ち</h1>
        <Lead>
          プライベートIPアドレスのままインターネットに出ていく<Term>NAT</Term>、IPアドレスを自動で配る<Term>DHCP</Term>、覚えやすい名前をIPアドレスに変換する<Term>DNS</Term>。3つとも普段は意識しませんが、止まった瞬間に「ネットにつながらない」原因の大半を占める重要な機能です。
        </Lead>
      </Hero>

      <Heading num="00">NAT ― プライベートIPとグローバルIPを変換する</Heading>
      <p>
        「IPv4アドレッシングの基礎」で見たプライベートIPアドレスは、インターネット上ではそのまま使えません。<Term>NAT(Network Address Translation)</Term>は、プライベートIPアドレスをグローバルIPアドレスに変換して、内部のホストがインターネットと通信できるようにする仕組みです。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">スタティックNAT</td>
            <td>1つの内部IPを1つの外部IPに固定で対応させる(公開サーバー向け)</td>
          </tr>
          <tr>
            <td className="hl">ダイナミックNAT</td>
            <td>外部IPのプールから空いているものをその都度割り当てる</td>
          </tr>
          <tr>
            <td className="hl">PAT(NAPT)</td>
            <td>ポート番号も使って、1つの外部IPを複数の内部ホストで共有する</td>
          </tr>
        </tbody>
      </table>
      <p>
        家庭やオフィスで最もよく使われるのは<Term>PAT</Term>です。内部の複数ホストが同時にインターネットへ出ても、外から見えるIPアドレスは1つだけで、代わりに<Term>ポート番号</Term>を1台ごとに変えることで、戻ってきた通信をどのホスト宛か区別します。
      </p>

      <DiagramFrame
        slug="network-nat-pat"
        aspect="760 / 400"
        caption="PAT(NAPT)。3台のPCがそれぞれ違うプライベートIPとポートで通信するが、ルーターは全員を同じグローバルIP(203.0.113.1)に変換し、ポート番号だけを変えて区別する。変換対応表(NATテーブル)に各PCの内部アドレスと変換後のグローバルポートが記録される。"
      />

      <Analogy label="💡 たとえるなら">
        PATは「代表電話番号+内線番号」の仕組みに似ています。会社の外から見える電話番号は1つ(グローバルIP)だけですが、内線番号(ポート番号)を使い分けることで、代表電話を通した後も、どの社員(内部ホスト)宛の電話かを正しく取り次げます。
      </Analogy>

      <Heading num="01">DHCP ― IPアドレスを自動で配る</Heading>
      <p>
        <Term>DHCP(Dynamic Host Configuration Protocol)</Term>は、ネットワークに接続した機器に、IPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバーのアドレスなどを自動で配布する仕組みです。手動でIPアドレスを設定する手間と設定ミスを減らせます。
      </p>
      <p>
        IPアドレスがまだ無いクライアントとサーバーが、4段階のやり取りでアドレスを確定させる流れを<Term>DORA</Term>(各段階の頭文字)と呼びます。
      </p>

      <DiagramFrame
        slug="network-dhcp-dora"
        aspect="620 / 400"
        caption="DHCPのDORAプロセス。クライアントがDiscoverをブロードキャストし、サーバーがOfferで候補のIPアドレスを提示し、クライアントがRequestでそのアドレスを要求し、サーバーがAckで確定する、という4段階のやり取りでIPアドレスが割り当てられる。"
      />

      <p>
        最初の<Term>Discover</Term>と3番目の<Term>Request</Term>がブロードキャストになっているのは、クライアントがこの時点でまだ自分のIPアドレスを持っていないためです。宛先を指定した通信ができないので、同じセグメントの全員に呼びかける形を取ります。
      </p>

      <Heading num="02">DNS ― 名前とIPアドレスを変換する</Heading>
      <p>
        <Term>DNS(Domain Name System)</Term>は、<code>www.example.com</code>のような人間に覚えやすい名前を、通信に必要なIPアドレスに変換する仕組みです。DNSの情報は世界中のサーバーに階層的に分散して管理されており、末端のサーバーが答えを持つまで、階層をたどりながら問い合わせていきます。
      </p>

      <DiagramFrame
        slug="network-dns-resolution"
        aspect="720 / 460"
        caption="DNS名前解決。クライアントはDNSリゾルバに再帰的に問い合わせるだけで済み、リゾルバがルートサーバー、TLDサーバー、権威DNSサーバーへ順番に反復的に問い合わせて最終的なIPアドレスを見つけ、クライアントに返す。"
      />

      <p>
        クライアントから見た問い合わせを<Term>再帰的問い合わせ</Term>と呼び、「答えが分かるまで代わりに調べてきてほしい」という依頼になります。一方、リゾルバから各階層のサーバーへの問い合わせは<Term>反復問い合わせ</Term>で、「知らなければ、次に聞くべき相手だけ教えて」というやり取りです。一度調べた結果はリゾルバに<Term>キャッシュ</Term>されるため、同じ名前への2回目以降の問い合わせは階層をたどらずに即座に返せます。
      </p>

      <Aside label="つながり">
        Webサーバーへのアクセスなど、DNSの後に実際にHTTP/HTTPSでどうやってページを取得するかは別の章で扱います。ここではDNSが「通信の入り口で名前をIPアドレスに変える係」であることを押さえておけば十分です。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>PATはポート番号で1つのIPを共有</h4>
          <p>複数の内部ホストが同じグローバルIPを、ポート番号違いで同時に使えます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DORAはブロードキャストから始まる</h4>
          <p>IPアドレスを持たないクライアントは、まずブロードキャストで呼びかけるしかありません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DNSは再帰と反復の役割分担</h4>
          <p>クライアントは1回尋ねるだけ、階層をたどる反復問い合わせはリゾルバが代行します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/nat-dhcp-dns" />
    </DocsPage>
  );
}
