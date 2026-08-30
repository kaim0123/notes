import Link from "next/link";
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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ISP接続とCDN",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>ISP接続とCDN ― インターネットへの入り口</h1>
        <Lead>
          「<Link href="/network/topology">トポロジと接続装置</Link>」ではルーターがインターネットへの出口だと説明しましたが、そのルーターの先に広がる「インターネットそのもの」を実際に提供しているのは誰なのでしょうか。ここではISP(プロバイダ)という会社の役割と、Webサイトを速く届けるCDNの仕組みを見ていきます。
        </Lead>
      </Hero>

      <p>なお、名前をIPアドレスに変換する<Term>DNS</Term>の仕組みそのものや、通信を暗号化する<Term>HTTPS/TLS</Term>の仕組みそのものは、それぞれ「<Link href="/network/applications/dns">DNS</Link>」「<Link href="/network/applications/web">Webの仕組み</Link>」で詳しく扱っています。ここでは重複を避け、ISPやCDNが「何のために」それらの技術を使っているかに絞って説明します。</p>

      <Heading num="01">ISP(プロバイダ)とは何をしている会社か</Heading>
      <p><Term>ISP(Internet Service Provider)</Term>は、家庭やオフィスを世界中のネットワークがつながる「インターネット」本体に接続する会社です。「<Link href="/network/topology">トポロジと接続装置</Link>」で見たルーターは、あくまで自宅・社内のネットワークとインターネットの境目に立つ機器にすぎません。その先、実際にネットワークとネットワークをつなぎ合わせている回線・設備・契約を提供しているのがISPです。</p>
      <p>日本では、光ファイバーなどの物理的な回線を敷設・保守する<Term>回線事業者</Term>(例: NTT東西のフレッツ光)と、その回線を借りてインターネットへの接続サービスを提供する<Term>ISP</Term>(例: 「〇〇プロバイダ」を名乗る各社)が分かれていることが多く、これが「回線契約」と「プロバイダ契約」が別々に必要になる理由です。</p>

      <Heading num="02">PPPoEとIPoE ― 接続方式の違い</Heading>
      <p>ISPに接続する方式には、古くからの<Term>PPPoE(PPP over Ethernet)</Term>と、近年主流になりつつある<Term>IPoE(IP over Ethernet)</Term>の2種類があります。</p>
      <p>PPPoEは、利用者ごとにID・パスワードで認証を行い、通信の間ずっと専用の仮想的なトンネルを維持する方式です。この認証・トンネル処理は<Term>網終端装置</Term>と呼ばれる回線事業者側の設備に集中して行われるため、利用者が増えて混み合う時間帯には、この設備がボトルネックとなって速度が落ちやすいという弱点があります。</p>
      <p>IPoEは、この認証・トンネルの仕組みを介さず、直接IPで接続する方式です。事業者間の接続点(相互接続点)を複数用意して負荷を分散できるため、PPPoEで起きていた混雑を避けやすくなります。加えてIPoEはもともとIPv6接続を前提とした方式で、後述するIPv4アドレス枯渇への対応とも相性がよく、これらの理由から近年はIPoEへの移行が進んでいます。</p>

      <table>
        <tbody>
          <tr><th></th><th>PPPoE</th><th>IPoE</th></tr>
          <tr><td className="hl">接続の仕組み</td><td>ID・パスワードで認証し、専用トンネルを維持</td><td>認証・トンネルなしで直接IP接続</td></tr>
          <tr><td className="hl">混雑への強さ</td><td>網終端装置に処理が集中し、混雑時に速度低下が起きやすい</td><td>接続点が分散しており、混雑の影響を受けにくい</td></tr>
          <tr><td className="hl">対応するIP</td><td>主にIPv4</td><td>IPv6が基本(IPv4も変換技術で利用可能)</td></tr>
          <tr><td className="hl">近年の位置づけ</td><td>従来からの標準方式</td><td>速度改善のため主流になりつつある方式</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        PPPoEは「毎回受付で本人確認をしてから、決まった1本の専用通路を通ってもらう」方式です。通路の数には限りがあるため、混雑時間帯は行列ができます。IPoEは「本人確認の受付を通らず、広い道路網に直接出られる」方式で、通り道がたくさんあるぶん混雑しにくいイメージです。
      </Analogy>

      <Heading num="03">IPv4アドレス枯渇とIPv6</Heading>
      <p>「<Link href="/network/ip">IPアドレスと経路</Link>」で見た通り、従来の<Term>IPv4</Term>は32ビットで表現されるアドレスで、割り当てられる組み合わせは約43億個しかありません。インターネットに接続する機器が爆発的に増えた結果、新規に配布できるIPv4アドレスは各地域の管理団体ですでに払底しています。</p>
      <p>この不足を補うため、ISPは複数の利用者で少数のグローバルIPv4アドレスを共有する<Term>CGNAT(キャリアグレードNAT)</Term>のような技術で当座をしのぎつつ、128ビットで事実上無尽蔵のアドレス空間を持つ<Term>IPv6</Term>への移行を進めています。IPoEが近年広まっている背景にも、このIPv6への移行という文脈があります。</p>

      <Heading num="04">CDN ― なぜ物理的に近いサーバーから配信すると速いのか</Heading>
      <p>Webサイトのデータは、光ファイバーの中を光の速さで進むとはいえ、地球の裏側のサーバーまで往復するには物理的な時間がかかります。距離が長いほど、また経由する中継機器(ルーターなど)の数が多いほど、応答までの遅延(レイテンシ)は積み重なっていきます。</p>
      <p><Term>CDN(Content Delivery Network)</Term>は、オリジナルのサーバー(オリジンサーバー)が持つコンテンツのコピーを、世界中に分散させた<Term>エッジサーバー</Term>にあらかじめキャッシュしておく仕組みです。利用者は毎回遠くのオリジンサーバーまで問い合わせるのではなく、ネットワーク的・物理的に最も近いエッジサーバーから配信を受けられるため、距離による遅延が大幅に短縮されます。</p>

      <Diagram caption="CDNなし:毎回遠くのオリジンサーバーへ / CDNあり:近くのエッジサーバーがコピーを配信">
        <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={24} fill="#9a9a9a" fontSize="12">CDNなし</text>
          <rect x={20} y={40} width={90} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={65} y={65} fill="#f2f2f2" fontSize="12" textAnchor="middle">利用者</text>
          <rect x={540} y={40} width={110} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={595} y={65} fill="#f2f2f2" fontSize="12" textAnchor="middle">オリジンサーバー</text>
          <line x1={110} y1={60} x2={538} y2={60} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowIsp1)" />
          <text x={324} y={48} fill="#9a9a9a" fontSize="11" textAnchor="middle">長い距離・大きな遅延</text>

          <text x={20} y={124} fill="#9a9a9a" fontSize="12">CDNあり</text>
          <rect x={20} y={140} width={90} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={65} y={165} fill="#f2f2f2" fontSize="12" textAnchor="middle">利用者</text>
          <rect x={210} y={140} width={120} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={270} y={165} fill="#f2f2f2" fontSize="12" textAnchor="middle">エッジサーバー</text>
          <rect x={540} y={140} width={110} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={595} y={165} fill="#f2f2f2" fontSize="12" textAnchor="middle">オリジンサーバー</text>

          <line x1={110} y1={160} x2={208} y2={160} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrowIsp2)" />
          <text x={160} y={148} fill="#39ff6a" fontSize="11" textAnchor="middle">近い・速い</text>
          <line x1={330} y1={160} x2={538} y2={160} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrowIsp1)" />
          <text x={434} y={148} fill="#9a9a9a" fontSize="10" textAnchor="middle">未キャッシュ時のみ問い合わせ</text>

          <defs>
            <marker id="arrowIsp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
            <marker id="arrowIsp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#39ff6a" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <p>CDNは配信を速くするだけでなく、大量のアクセスをエッジサーバー側で吸収することで、オリジンサーバー本体への負荷を減らす役割も果たします。動画配信や大規模なニュースサイトなど、世界中から一斉にアクセスされるサービスほど、CDNの恩恵は大きくなります。</p>

      <Analogy label="💡 たとえるなら">
        CDNは「全国チェーンのコンビニ」のようなものです。本社の倉庫(オリジンサーバー)まで毎回買い出しに行くのではなく、近所の店舗(エッジサーバー)に商品のコピーを置いておくことで、誰もが最寄りの店で素早く買い物できるようにしています。
      </Analogy>

      <Heading num="05">プロキシ ― フォワード型とリバース型</Heading>
      <p><Term>プロキシ</Term>は、クライアントとサーバーの間に立ち、通信を代理で仲介する仕組みです。どちら側の代理人として立つかによって、大きく2種類に分かれます。</p>
      <p><Term>フォワードプロキシ</Term>は、クライアント側の代理人です。社内ネットワークの端末がインターネットへ出ていく手前に置かれ、「どのサイトへのアクセスを許可するか」というフィルタリングや、よくアクセスされるコンテンツのキャッシュなどを行います。サーバー側からは、実際の利用者ではなくフォワードプロキシが通信してきたように見えます。</p>
      <p><Term>リバースプロキシ</Term>は、逆にサーバー側の代理人です。クライアントからは1つの窓口に見えますが、実際にはその裏で複数のサーバーへ処理を振り分けています。「<Link href="/network/topology">トポロジと接続装置</Link>」で見たロードバランサや、この記事で見たCDNのエッジサーバーも、広い意味ではリバースプロキシの一種です。</p>

      <table>
        <tbody>
          <tr><th></th><th>フォワードプロキシ</th><th>リバースプロキシ</th></tr>
          <tr><td className="hl">誰の代理か</td><td>クライアント側の代理</td><td>サーバー側の代理</td></tr>
          <tr><td className="hl">主な設置場所</td><td>社内ネットワークの出口</td><td>サーバー群の手前</td></tr>
          <tr><td className="hl">主な目的</td><td>アクセス制限・利用状況の把握・キャッシュ</td><td>負荷分散・キャッシュ配信・サーバー構成の隠蔽</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        「プロキシを使う」という場合、日常会話では主にフォワードプロキシ(社内の閲覧制限や、特定の国からのアクセスを装う用途など)を指すことが多い一方、CDNやロードバランサはリバースプロキシとして意識されずに使われていることがほとんどです。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ISPが「外の世界」への回線を提供する</h4>
          <p>自宅・社内のルーターの先で、実際にインターネット本体へつないでいるのがISPです。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>IPoEは混雑を避けるための進化</h4>
          <p>認証・トンネルを介さないIPoEは、PPPoEが抱えていた設備集中による速度低下を避けやすく、IPv6移行とも噛み合っています。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>CDNとプロキシは「間に立つ」仕組み</h4>
          <p>CDNは物理的な距離を縮めて配信を速くし、プロキシはクライアント側・サーバー側それぞれの代理人として通信を仲介します。</p>
        </Card>
      </CardGrid>
      <p>ここまででネットワークの入り口から出口までを見てきました。次は、実際にサーバーを構築・運用する現場の実務を「<Link href="/network/internet/server/build">サーバー構築の実務</Link>」で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
                    <RelatedLink href="/network/applications/dns" tag="インターネット">DNS ― 名前をIPアドレスに変える電話帳</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み ― URLからレンダリングまで</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
