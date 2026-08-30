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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "通信制御コンポーネント",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>通信制御コンポーネント ― 南北・東西と同期・非同期</h1>
        <Lead>
          「<Link href="/network/topology">トポロジと接続装置</Link>」では、ロードバランサが境界で通信を振り分ける機器として登場しました。ここでは、その先に現れる<Term>リバースプロキシ</Term>・<Term>ロードバランサ</Term>・<Term>API Gateway</Term>・<Term>サービスメッシュ</Term>・<Term>メッセージング</Term>を、<strong>どの通信経路に立ち、何を制御するか</strong>という軸で整理します。個別の製品名より、役割の重なりと使い分けを押さえることが目的です。
        </Lead>
      </Hero>

      <Heading num="01">通信制御コンポーネントとは</Heading>
      <p>通信制御コンポーネントは、クライアントとサーバー、またはサービス同士の<Term>通信経路上</Term>に立ち、データをただ転送するだけでなく、<strong>通す・通さない・どこへ渡す・どう変換する・いつ届けるか</strong>を判断する中間層です。ルーターがIPアドレスで経路を選ぶのに対し、ここで扱う部品は<Term>アプリケーション層(L7)</Term>の内容(URL・HTTPヘッダ・APIの意味)まで見て制御することが多く、Webサービスや分散システムの入口・内部連携を担います。</p>
      <p>5つの名前はよく混同されますが、整理の鍵は2つの軸です。</p>
      <ul>
        <li><strong>南北(North-South)</strong> ― 外部(クライアント)とシステムの間を流れる通信</li>
        <li><strong>東西(East-West)</strong> ― システム内部のサービス同士を流れる通信</li>
      </ul>
      <ul>
        <li><strong>同期</strong> ― リクエストを送り、応答を待つ(HTTP/gRPCなど)</li>
        <li><strong>非同期</strong> ― メッセージやイベントを介し、送信者は応答を待たない(キュー・Pub/Sub)</li>
      </ul>

      <Heading num="02">同期パス ― リバースプロキシ・ロードバランサ・API Gateway</Heading>
      <p>外部からのHTTP/HTTPSアクセスを受ける<Term>南北の入口</Term>では、3つのコンポーネントが重なり合って登場します。包含関係で言えば、<strong>ロードバランサはリバースプロキシの役割を兼ねることが多く、API Gatewayはさらにアプリ向けの制御を足したもの</strong>、と捉えると整理しやすいです。</p>

      <h3>リバースプロキシ ― サーバー側の窓口</h3>
      <p><Term>リバースプロキシ</Term>は、クライアントから見ると1つのサーバーに見える代理人です。実際には裏の複数サーバーへ処理を渡したり、SSL/TLSの<Term>終端</Term>(暗号化の解読を入口で行い、裏は平文HTTPにする)やキャッシュ、バックエンド構成の秘匿を行います。「<Link href="/network/internet/isp">ISP接続とCDN</Link>」で触れたCDNのエッジサーバーも、広い意味ではリバースプロキシの一種です。</p>

      <h3>ロードバランサ ― 負荷を複数台へ分散</h3>
      <p><Term>ロードバランサ</Term>は、1つのサービスへ集中するアクセスを複数のサーバーへ<Term>振り分ける</Term>機器です。「<Link href="/network/topology">トポロジと接続装置</Link>」ではネットワーク境界の機器として、<Link href="/network/applications/web">Webの仕組み</Link>ではHTTPアクセスの流れの中で登場しました。L4(トランスポート層)でIPアドレスとポートだけを見るタイプと、L7(アプリケーション層)でURLやCookieまで見るタイプがあり、L7型はリバースプロキシの機能と大きく重なります。</p>

      <h3>API Gateway ― 外部APIの統合入口</h3>
      <p><Term>API Gateway</Term>は、外部(モバイルアプリ・パートナー・フロントエンド)からのAPI呼び出しを1箇所に集約する入口です。ルーティング(どのバックエンドサービスへ渡すか)に加え、<Term>認証</Term>・<Term>レート制限</Term>・リクエスト/レスポンスの変換・APIのバージョン管理・複数サービスへの呼び出しを1本にまとめる<Term>API合成</Term>など、アプリケーション向けのポリシーを担います。リバースプロキシ + LB + 「APIに特化した制御」と考えると位置づけが分かりやすいです。</p>

      <table>
        <thead>
          <tr><th>コンポーネント</th><th>主な仕事</th><th>見る層</th><th>典型配置</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リバースプロキシ</td><td>SSL終端・キャッシュ・バックエンド秘匿</td><td>L7</td><td>Webサーバー群の手前</td></tr>
          <tr><td className="hl">ロードバランサ</td><td>負荷分散・死活監視・フェイルオーバー</td><td>L4 / L7</td><td>入口、Web/AP/DBの段間</td></tr>
          <tr><td className="hl">API Gateway</td><td>認証・レート制限・ルーティング・API合成</td><td>L7</td><td>外部APIの統合入口</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ビルの入り口を想像してください。リバースプロキシは「受付で一度案内してから裏のフロアへ送る係」、ロードバランサは「混雑時に複数の窓口へ客を振り分ける係」、API Gatewayは「入館証の確認・1日の入館回数制限・どの部署へ繋ぐかを決める総合受付」です。1人の係が複数の役割を兼ねることも多いです。
      </Analogy>

      <Aside label="くわしくは">
        フォワードプロキシとリバースプロキシの対比、CDNとの関係は「<Link href="/network/internet/isp">ISP接続とCDN</Link>」、KubernetesのIngress(リバースプロキシ相当)は「<Link href="/infra/container/kubernetes">Kubernetes</Link>」、AWSのALB・API Gatewayは「<Link href="/cloud/aws/network">AWSネットワーク</Link>」で扱います。
      </Aside>

      <Heading num="03">サービスメッシュ ― 東西通信の制御層</Heading>
      <p><Term>サービスメッシュ</Term>は、<strong>サービス同士の東西通信</strong>に立つ制御層です。マイクロサービスが増えると、各サービスが直接HTTPで呼び合うだけでは、mTLS(相互TLS)・リトライ・サーキットブレーカ・トレーシング・認可といった横断的な処理をすべてのアプリコードにコピーする必要が出てきます。</p>
      <p>サービスメッシュでは、各サービスのそばに<Term>サイドカー</Term>プロキシ(Envoyなど)を並走させ、実際の通信をそのプロキシ経由にします。アプリは「隣のサービスへ呼ぶ」だけでよく、暗号化・再試行・メトリクス収集はメッシュが透過的に担います。Istio・Linkerdなどが代表例です。</p>
      <p>API Gateway が<strong>外部からの南北の入口</strong>を整えるのに対し、サービスメッシュは<strong>内部の東西</strong>を整えます。両方を入れる構成もありますが、小規模ならIngress(リバースプロキシ) + 直接呼び出しで足り、規模とチーム数が増えてから検討する、という段階的な導入が多いです。</p>

      <Aside label="補足">
        ゼロトラスト(「内部ネットワークは安全」という前提を捨てる)の文脈でもサービスメッシュが語られます。詳しくは「<Link href="/infra/container/security">コンテナセキュリティ</Link>」、マイクロサービス全体の位置づけは「<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>」を参照してください。
      </Aside>

      <Heading num="04">メッセージング ― 非同期の通信制御</Heading>
      <p>ここまでの4つは、基本的に<Term>同期</Term>のリクエスト/レスポンス経路に立つコンポーネントでした。<Term>メッセージング</Term>は、サービス同士を<Term>非同期</Term>につなぐ別系統の制御層です。送信者はメッセージを<Term>ブローカー</Term>(Kafka・RabbitMQ・Amazon SQSなど)に渡した時点で処理を終え、受信者は後から取り出して処理します。</p>
      <p>メッセージには大きく2つの考え方があります。</p>
      <ul>
        <li><strong>キュー</strong> ― 「在庫を減らして」のように、特定の処理を依頼する<Term>命令</Term>。1メッセージを1消費者が処理するイメージ</li>
        <li><strong>Pub/Sub(トピック)</strong> ― 「注文が作成された」のように、起きた<Term>事実</Term>を複数の購読者へ配信するイメージ</li>
      </ul>
      <p>同期通信は呼び出し先が遅い・落ちていると呼び出し元も待たされますが、メッセージングは<Term>時間差</Term>と<Term>バッファ</Term>を挟めるため、負荷の平準化やサービス間の<Term>疎結合</Term>に向いています。一方で、応答をその場で返せない・全体の流れが追いにくいといったトレードオフもあります。</p>

      <Aside label="くわしくは">
        イベント駆動アーキテクチャとしての設計思想・イベントとメッセージの違い・ブローカーの構成は「<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>」、API Gateway パターンは「<Link href="/design/patterns">設計パターン</Link>」で扱います。
      </Aside>

      <Heading num="05">よくある混同</Heading>
      <table>
        <thead>
          <tr><th>混同しやすい組</th><th>見分け方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ロードバランサ vs リバースプロキシ</td><td>L7 LB(NGINX・ALBなど)は両方の役割を兼ねる。LBは「振り分け」、RPは「代理として見せる」が焦点</td></tr>
          <tr><td className="hl">API Gateway vs BFF</td><td>Gatewayは組織横断のAPI入口。BFF(Backend for Frontend)は特定フロント向けにAPIを組み立てるアプリ層</td></tr>
          <tr><td className="hl">API Gateway vs サービスメッシュ</td><td>南北(外部入口) vs 東西(内部通信)。担当する通信の向きが違う</td></tr>
          <tr><td className="hl">同期HTTP vs メッセージング</td><td>その場で結果が要るか、時間差・疎結合を取るか。排他ではなく併用が普通</td></tr>
          <tr><td className="hl">ESB vs API Gateway</td><td>SOA時代のESBは中央で変換・編成する「太いハブ」。Gatewayは入口の制御が中心(「<Link href="/design/architecture/sys/soa">SOA</Link>」参照)</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>南北と東西で役割が分かれる</h4>
          <p>RP・LB・API Gatewayは主に外部入口(南北)。サービスメッシュは内部(東西)。メッセージングは同期の対になる非同期経路。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>同期3つは重なり合う</h4>
          <p>RP ⊂ LB(L7) ⊂ API Gateway(アプリ向け制御) という包含のイメージで整理すると試験・実務両方で迷いにくい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>詳細は既存ページへ委譲</h4>
          <p>機器としてのLBは topology、プロキシ/CDNは isp、イベント設計は event-driven、実装は infra へ。</p>
        </Card>
      </CardGrid>

      <p>ここまでが通信経路上の制御層の整理です。次は、その通信がインターネット上をどう広がっていくか、「<Link href="/network/internet">インターネット</Link>」の章で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
            <RelatedLink href="/network/internet/isp" tag="ネットワーク">ISP接続とCDN</RelatedLink>
            <RelatedLink href="/network/applications/web" tag="ネットワーク">Webの仕組み</RelatedLink>
            <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
            <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
