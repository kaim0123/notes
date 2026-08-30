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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "階層モデル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>階層モデル ― 通信を役割ごとの層に分ける</h1>
        <Lead>
          コンピュータ同士は、どんな共通言語(プロトコル)でやり取りしているのでしょうか。ネットワークは役割ごとにいくつもの層に分けて設計されています。ここではその考え方を、OSI参照モデル(7層)とTCP/IPモデル(4層)を軸に整理します。各層で使う個別のプロトコルは、この先の「IP」「トランスポート層」「アプリケーション層」「データリンク層」で順に見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">プロトコルとは ― 送受信のルール</Heading>
      <p><Term>プロトコル</Term>とは、コンピュータ同士が通信するときに従う「約束事」です。人間同士の会話でも、片方が日本語、もう片方が全く知らない言語で話しかけたら会話は成立しません。コンピュータの通信も同じで、「どんな形式でデータを送るか」「相手にどう返事をするか」を事前に決めておかないと、正しくやり取りできません。</p>
      <p>この約束事は1つではなく、役割ごとにいくつもの層に積み重なっています。代表的な整理の仕方が<Term>OSI参照モデル</Term>(7層)と、実際のインターネットで使われている<Term>TCP/IPモデル</Term>(4層)です。</p>

      <Heading num="02">OSI参照モデル ― 7層の教科書的モデル</Heading>
      <Diagram caption="OSI参照モデル(7層)。データは送信時に上から下へ、受信時に下から上へ流れる">
        <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="13" fill="#f2f2f2">
            <rect x={60} y={10} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={34}>7 アプリケーション層</text><text x={420} y={34} fill="#9a9a9a" fontSize="12">HTTP・SMTP・FTP・DNS</text>

            <rect x={60} y={48} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={72}>6 プレゼンテーション層</text><text x={420} y={72} fill="#9a9a9a" fontSize="12">文字コード・暗号化・圧縮</text>

            <rect x={60} y={86} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={110}>5 セッション層</text><text x={420} y={110} fill="#9a9a9a" fontSize="12">接続の開始・維持・終了</text>

            <rect x={60} y={124} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={148}>4 トランスポート層</text><text x={420} y={148} fill="#9a9a9a" fontSize="12">TCP・UDP(ポート番号)</text>

            <rect x={60} y={162} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={186}>3 ネットワーク層</text><text x={420} y={186} fill="#9a9a9a" fontSize="12">IP・ICMP・ARP(パケット)</text>

            <rect x={60} y={200} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={224}>2 データリンク層</text><text x={420} y={224} fill="#9a9a9a" fontSize="12">イーサネット・MACアドレス(フレーム)</text>

            <rect x={60} y={238} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={262}>1 物理層</text><text x={420} y={262} fill="#9a9a9a" fontSize="12">ケーブル・電気信号・電波(ビット)</text>
          </g>
          <text x={320} y={292} fill="#9a9a9a" fontSize="12" textAnchor="middle">上に行くほど人間に近い意味のある情報、下に行くほど電気信号そのものに近い</text>
        </svg>
      </Diagram>

      <p>各層は「自分より下の層がどう動いているか気にせず、自分の役割だけに専念する」ように設計されています。これにより、例えば物理層がケーブルからWi-Fiに変わっても、その上のアプリケーション層(ブラウザなど)は何も変更する必要がありません。</p>

      <Analogy label="💡 たとえるなら">
        手紙を送る手順に例えられます。<strong>アプリケーション層</strong>は「手紙の内容を書く」こと。<strong>プレゼンテーション層</strong>は「読める言語・文字で書く」こと。<strong>セッション層</strong>は「電話で相手の在宅を確認してから郵便を出す」ようなやり取り。<strong>トランスポート層</strong>は「書留にするか普通郵便にするか選ぶ」こと。<strong>ネットワーク層</strong>は「封筒に住所を書く」こと。<strong>データリンク層</strong>は「近所の郵便局までバイク便で運ぶ」こと。<strong>物理層</strong>はその道路や配達員そのものです。
      </Analogy>

      <Heading num="03">TCP/IPモデル ― 実際に使われている4層</Heading>
      <p>OSI参照モデルは体系立った「教科書的なモデル」であるのに対し、実際のインターネットで使われているのはよりシンプルな<Term>TCP/IPモデル</Term>(4層)です。</p>

      <Diagram caption="OSI参照モデルとTCP/IPモデルの対応関係">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#9a9a9a" textAnchor="middle">
            <text x={140} y={20}>OSI参照モデル(7層)</text>
            <text x={480} y={20}>TCP/IPモデル(4層)</text>
          </g>
          <g fontSize="11" fill="#f2f2f2">
            <rect x={40} y={30} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={47} textAnchor="middle">7 アプリケーション</text>
            <rect x={40} y={56} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={73} textAnchor="middle">6 プレゼンテーション</text>
            <rect x={40} y={82} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={99} textAnchor="middle">5 セッション</text>
            <rect x={40} y={112} width={200} height={30} fill="none" stroke="#5f5f5f" /><text x={140} y={131} textAnchor="middle">4 トランスポート</text>
            <rect x={40} y={146} width={200} height={30} fill="none" stroke="#5f5f5f" /><text x={140} y={165} textAnchor="middle">3 ネットワーク</text>
            <rect x={40} y={180} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={197} textAnchor="middle">2 データリンク</text>
            <rect x={40} y={206} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={223} textAnchor="middle">1 物理層</text>
          </g>
          <g fontSize="12" fill="#f2f2f2">
            <rect x={400} y={30} width={200} height={78} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={73} textAnchor="middle">アプリケーション層</text>
            <rect x={400} y={112} width={200} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={131} textAnchor="middle">トランスポート層</text>
            <rect x={400} y={146} width={200} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={165} textAnchor="middle">インターネット層</text>
            <rect x={400} y={180} width={200} height={52} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={209} textAnchor="middle">ネットワーク</text><text x={500} y={223} textAnchor="middle" fontSize="11" fill="#9a9a9a">インターフェース層</text>
          </g>
          <g stroke="#5f5f5f" strokeDasharray="3 3">
            <line x1={240} y1={43} x2={400} y2={69} />
            <line x1={240} y1={69} x2={400} y2={69} />
            <line x1={240} y1={95} x2={400} y2={69} />
            <line x1={240} y1={127} x2={400} y2={127} />
            <line x1={240} y1={161} x2={400} y2={161} />
            <line x1={240} y1={193} x2={400} y2={206} />
            <line x1={240} y1={219} x2={400} y2={206} />
          </g>
          <text x={320} y={270} fill="#9a9a9a" fontSize="11" textAnchor="middle">アプリ〜セッション層をまとめて「アプリケーション層」、データリンク〜物理層をまとめて「ネットワークインターフェース層」として扱う</text>
        </svg>
      </Diagram>

      <p>TCP/IPモデルは、OSIの7層のうちアプリケーション・プレゼンテーション・セッションの3層を「アプリケーション層」としてまとめ、データリンク・物理層を「ネットワークインターフェース層」としてまとめた、より実践的な4層構成です。</p>
      <table>
        <tbody>
          <tr><th>層</th><th>代表的な要素</th><th>くわしくは</th></tr>
          <tr><td className="hl">アプリケーション層</td><td>HTTP、DNS、SMTP、FTP</td><td><code>network/applications</code></td></tr>
          <tr><td className="hl">トランスポート層</td><td>TCP、UDP、ポート番号</td><td><code>network/transport</code></td></tr>
          <tr><td className="hl">インターネット層</td><td>IP、ICMP、ARP</td><td><code>network/ip</code></td></tr>
          <tr><td className="hl">ネットワークインターフェース層</td><td>イーサネット、Wi-Fi</td><td><code>network/link</code></td></tr>
        </tbody>
      </table>

      <h3>データは層を通るたびに「封筒」に包まれていく</h3>
      <p>送信するデータは、上の層から下の層へ渡るたびに、その層独自の管理情報(ヘッダ)で包まれていきます。これを<Term>カプセル化</Term>と呼びます。受信側ではこの逆に、下から上へ1枚ずつ封筒を開けながらデータを取り出していきます。</p>

      <Analogy label="💡 たとえるなら">
        カプセル化は「ロシアの入れ子人形(マトリョーシカ)」のようなものです。一番小さい人形(本文データ)を、トランスポート層という人形で包み、その上からインターネット層という人形でさらに包み…と、送るたびに包みが増えていきます。受け取った側は、外側から順番に人形を開けていき、最後に本文だけが残ります。
      </Analogy>

      <Heading num="まとめ">層で分けるからこそ、進化できる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割ごとに層が分かれている</h4><p>OSI参照モデル(7層)・TCP/IPモデル(4層)はどちらも「自分の層の仕事だけに専念する」設計です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データは包まれ、開かれる</h4><p>送信時は層を降りるごとにヘッダで包まれ(カプセル化)、受信時は層を上がるごとに開かれます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>各層に代表プロトコルがある</h4><p>IPはインターネット層、TCP/UDPはトランスポート層、HTTPはアプリケーション層。次からは層ごとに中身を見ていきます。</p></Card>
      </CardGrid>
      <p>まずはネットワーク層で「宛先」を決めるIPアドレスから見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/ip" tag="ネットワーク">IPアドレスと経路</RelatedLink>
                    <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層 ― TCPとUDP</RelatedLink>
                    <RelatedLink href="/network/applications" tag="ネットワーク">アプリケーション層のプロトコル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
