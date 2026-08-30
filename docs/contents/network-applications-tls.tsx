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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SSL/TLSとTLSハンドシェイク",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>SSL/TLSとTLSハンドシェイク ― HTTPSを支える暗号化の握手</h1>
        <Lead>
          「<Link href="/network/applications/web">Webの仕組み</Link>」で触れた<Term>HTTPS</Term>の裏側にある<Term>TLS(旧称SSL)</Term>は、通信内容の暗号化だけでなく、相手の身元確認と改ざん検知までを一度に担うプロトコルです。このページでは、SSLとTLSの関係、証明書の役割、そして接続開始時の<Term>TLSハンドシェイク</Term>の流れを順に見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">SSLとTLS ― 名前の変遷</Heading>
      <p><Term>SSL(Secure Sockets Layer)</Term>は、1990年代にNetscapeが開発した、TCPの上で通信を暗号化するプロトコルです。Webの普及とともに「SSLで守る」という言い方が定着しましたが、現在使われているのは後継の<Term>TLS(Transport Layer Security)</Term>です。SSL 3.0はすでに非推奨・廃止され、TLS 1.2・1.3が現行の標準です。</p>
      <p>日常会話やドキュメントでは「SSL/TLS証明書」「SSL終端」のようにSSLという語が残っていますが、<strong>技術的な中身はTLS</strong>と考えて問題ありません。本ページ以降も、実体はTLSとして説明します。</p>

      <table>
        <tbody>
          <tr><th>名称</th><th>状態</th><th>補足</th></tr>
          <tr><td className="hl">SSL 2.0 / 3.0</td><td>廃止</td><td>既知の弱点があり、現在は使わない</td></tr>
          <tr><td className="hl">TLS 1.0 / 1.1</td><td>非推奨</td><td>主要ブラウザ・サーバーでは無効化が進んでいる</td></tr>
          <tr><td className="hl">TLS 1.2</td><td>広く利用中</td><td>長年の実績。互換性重視の環境でまだ見られる</td></tr>
          <tr><td className="hl">TLS 1.3</td><td>現行の推奨</td><td>ハンドシェイクが短く、安全な暗号方式が標準</td></tr>
        </tbody>
      </table>

      <Heading num="02">TLSが守る3つのこと</Heading>
      <p>TLSは「鍵付き封筒」以上の仕事をします。大きく3つの目的を同時に達成します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>機密性(暗号化)</h4><p>HTTPリクエストやレスポンスの中身を、途中の経路から読まれないようにする</p></Card>
        <Card><CardNumber>2</CardNumber><h4>完全性(改ざん検知)</h4><p>届いたデータが途中で書き換えられていないことを検証する</p></Card>
        <Card><CardNumber>3</CardNumber><h4>認証(身元確認)</h4><p>接続先が本当に<code>example.com</code>のサーバーかを、証明書で確認する</p></Card>
      </CardGrid>
      <p>3つ目の認証は、公開鍵暗号と<Term>証明書</Term>の組み合わせで実現します。RSAや楕円曲線暗号の数学的な仕組みは「<Link href="/security/crypto">暗号の歴史と公開鍵暗号</Link>」、ハッシュを使った改ざん検知は「<Link href="/security/hash">ハッシュ関数と衝突攻撃</Link>」で扱います。</p>

      <Analogy label="💡 たとえるなら">
        TLSは「封筒に入れた手紙(暗号化)」に加え、「封筒の封印が破れていないか(完全性)」「差出人の身分証明書(証明書)」までセットで確認してから中身を読む仕組みです。HTTPだけでは、はがきを誰でも読める状態で配達しているのに相当します。
      </Analogy>

      <Heading num="03">HTTPS ― TLSを載せたHTTP</Heading>
      <p><Term>HTTPS</Term>は、HTTPの通信内容をTLSで包んだものです。URLのスキームが<code>https://</code>、<Link href="/network/transport">トランスポート層</Link>のポート番号が<strong>443</strong>になるのが目印です(平文のHTTPは80番)。</p>
      <p>ブラウザが<code>https://example.com</code>を開くとき、裏では次の層が重なります。</p>
      <Steps>
        <li><strong>DNS</strong>ホスト名をIPアドレスに変換する(「<Link href="/network/applications/dns">DNS</Link>」)</li>
        <li><strong>TCP</strong>3ウェイハンドシェイクで接続を確立する(「<Link href="/network/transport">トランスポート層</Link>」)</li>
        <li><strong>TLS</strong>TLSハンドシェイクで暗号化と身元確認を行う(本ページ)</li>
        <li><strong>HTTP</strong>暗号化されたトンネルの中でリクエスト/レスポンスをやり取りする</li>
      </Steps>
      <p>TLSはHTTP専用ではありません。<Term>SSH</Term>・メール(SMTPS/IMAPS)・API通信など、TCP上で機密性が必要なプロトコルはTLS(またはそれに相当する暗号化)を使います。</p>

      <Heading num="04">証明書 ― 「このサーバーは本物」と証明する書類</Heading>
      <p>TLSハンドシェイクの途中、サーバーは<Term>証明書(certificate)</Term>をクライアント(多くはブラウザ)に提示します。証明書には、少なくとも次の情報が含まれます。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">主体名</td><td><code>example.com</code>など、この証明書が有効なドメイン</td></tr>
          <tr><td className="hl">公開鍵</td><td>サーバーがハンドシェイクで使う公開鍵</td></tr>
          <tr><td className="hl">有効期限</td><td>いつからいつまで信頼してよいか</td></tr>
          <tr><td className="hl">発行者</td><td>証明書に署名した<Term>認証局(CA)</Term>の名前</td></tr>
        </tbody>
      </table>
      <p>ブラウザは、あらかじめ内蔵している<Term>信頼されたCA</Term>のリストを使い、「この証明書は信頼できる機関が署名しているか」「ドメイン名が一致するか」「期限切れでないか」を検証します。問題なければアドレスバーに鍵マークが表示されます。</p>
      <p>証明書の取得・更新の実務(ACMやLet&apos;s Encryptなど)は「<Link href="/cloud/aws/network/acm">ACM</Link>」「<Link href="/ops/deploy">公開先とデプロイ経路</Link>」で扱います。ここでは、<strong>ハンドシェイクの中で「サーバーの身元を示す道具」として証明書が渡される</strong>点だけ押さえておけば十分です。</p>

      <Aside label="豆知識">
        <Term>自己署名証明書</Term>は、CAを介さず自分で署名した証明書です。開発環境や社内限定では使われますが、ブラウザは「信頼できない発行者」と警告します。公開Webサイトでは、Let&apos;s Encryptなどの公的CAから取得した証明書を使うのが基本です。
      </Aside>

      <Heading num="05">TLSハンドシェイク ― 暗号化を始める前の握手</Heading>
      <p><Link href="/network/transport">TCPの3ウェイハンドシェイク</Link>が「通信してよいか」を確認するのに対し、<Term>TLSハンドシェイク</Term>は「どの暗号方式を使うか」「共通の鍵をどう作るか」「相手は本物か」を決める段階です。TCP接続が確立した<strong>直後</strong>、HTTPリクエストを送る<strong>前</strong>に行われます。</p>
      <p>TLS 1.2を例に、典型的な流れを簡略化すると次のとおりです。</p>

      <Steps>
        <li><strong>ClientHello</strong>クライアント(ブラウザ)が「対応しているTLSバージョン・暗号方式・乱数」をサーバーへ送る</li>
        <li><strong>ServerHello</strong>サーバーが使う方式を1つ選び、自分の乱数を返す</li>
        <li><strong>Certificate</strong>サーバーが証明書(必要なら中間証明書チェーン)を送る</li>
        <li><strong>鍵交換</strong>双方が共有秘密(セッション鍵の元になる値)を安全に決める</li>
        <li><strong>Finished</strong>双方が「ここまでの交渉内容に問題ない」と署名付きで確認する</li>
      </Steps>

      <Diagram caption="TLS 1.2ハンドシェイク(簡略)。TCP接続のあと、HTTPの前に暗号方式と鍵を決める">
        <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="13" fill="#f2f2f2" textAnchor="middle">
            <text x={110} y={28}>クライアント</text>
            <text x={530} y={28}>サーバー</text>
          </g>
          <line x1={110} y1={40} x2={110} y2={290} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={530} y1={40} x2={530} y2={290} stroke="#5f5f5f" strokeWidth="1" />

          <line x1={110} y1={60} x2={530} y2={80} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={68} fill="#39ff6a" fontSize="12" textAnchor="middle">① ClientHello(対応方式・乱数)</text>

          <line x1={530} y1={100} x2={110} y2={120} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={108} fill="#39ff6a" fontSize="12" textAnchor="middle">② ServerHello(選んだ方式・乱数)</text>

          <line x1={530} y1={140} x2={110} y2={160} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={148} fill="#39ff6a" fontSize="12" textAnchor="middle">③ Certificate(証明書)</text>

          <line x1={530} y1={180} x2={110} y2={200} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={188} fill="#39ff6a" fontSize="12" textAnchor="middle">④ 鍵交換(ServerKeyExchange 等)</text>

          <line x1={110} y1={220} x2={530} y2={240} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={228} fill="#39ff6a" fontSize="12" textAnchor="middle">⑤ 鍵交換(クライアント側)</text>

          <line x1={110} y1={260} x2={530} y2={260} stroke="#9a9a9a" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={320} y={252} fill="#9a9a9a" fontSize="12" textAnchor="middle">⑥ Finished(双方)</text>

          <text x={320} y={305} fill="#9a9a9a" fontSize="11" textAnchor="middle">以降、同じセッション鍵でHTTPなどのアプリデータを暗号化して送受信</text>
        </svg>
      </Diagram>

      <p>ハンドシェイクが終わると、双方は同じ<Term>セッション鍵</Term>を持ちます。この鍵で以降のHTTPメッセージを暗号化・復号します。セッション鍵は接続ごとに新しく作られるため、たとえ1回の通信が解読されても、別の接続の内容までは守られます。</p>

      <Analogy label="💡 たとえるなら">
        TLSハンドシェイクは、電話越しに「これから話す内容を、二人だけが解ける暗号で話そう」と約束し合う段階です。まず互いに使える暗号の種類を確認し(Hello)、相手の身分証(証明書)を見て、共通の合言葉(セッション鍵)を決めてから本題(HTTP)に入ります。
      </Analogy>

      <Heading num="06">TCPの握手とTLSの握手 ― 2段階ある理由</Heading>
      <p>HTTPSを開くとき、握手は2回起きます。混同しやすいので整理しておきましょう。</p>
      <table>
        <tbody>
          <tr><th></th><th>TCP 3ウェイハンドシェイク</th><th>TLSハンドシェイク</th></tr>
          <tr><td className="hl">層</td><td>トランスポート層</td><td>TLS(アプリケーション層の手前)</td></tr>
          <tr><td className="hl">目的</td><td>「このIP・ポートへ届けてよいか」</td><td>「暗号方式と鍵・相手の身元」</td></tr>
          <tr><td className="hl">主なメッセージ</td><td>SYN / SYN+ACK / ACK</td><td>ClientHello / ServerHello / Certificate / Finished</td></tr>
          <tr><td className="hl">HTTPとの関係</td><td>HTTPより先</td><td>TCPのあと、HTTPより先</td></tr>
        </tbody>
      </table>
      <p>TCPだけでは「届いたデータが正しい相手のものか」「盗聴されていないか」は保証されません。TLSは、その上でアプリケーションが安心してデータを流せる「暗号化された通路」を作ります。</p>

      <Heading num="07">TLS 1.3 ― より短く、より安全に</Heading>
      <p><Term>TLS 1.3</Term>では、ハンドシェイクの往復が減り、安全でない古い暗号方式が仕様から外されました。1.2では2往復(RTT)以上かかることが多かったハンドシェイクが、条件が揃えば<strong>1往復</strong>で完了できます。再訪問時は<Term>0-RTT</Term>(事前に共有した情報で即座に暗号化開始)も可能ですが、設計・運用上の注意が必要な機能です。</p>
      <p>HTTP/3で使われる<Term>QUIC</Term>は、TCPとTLSの役割をUDPの上に統合し、接続確立と暗号化をさらに短くする方向の進化です(「<Link href="/network/transport">トランスポート層</Link>」参照)。</p>

      <Aside label="くわしくは">
        ロードバランサやCDNの入口でTLSを解読し、裏側は平文HTTPにする<Term>TLS終端</Term>は「<Link href="/network/control">通信制御コンポーネント</Link>」で扱います。証明書の自動発行・更新は「<Link href="/cloud/aws/network/acm">ACM</Link>」、HTTPS全体の運用像は「<Link href="/security/countermeasures">セキュリティ対策の概観</Link>」を参照してください。
      </Aside>

      <Heading num="まとめ">TLSハンドシェイクの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>SSLは旧称、実体はTLS</h4><p>現行はTLS 1.2/1.3。SSL 3.0以前は使わない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>暗号化・完全性・認証</h4><p>HTTPSの鍵マークは、証明書検証が通った結果。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>TCPのあと、HTTPの前</h4><p>ClientHelloから始まる握手でセッション鍵を決める。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>証明書で身元確認</h4><p>CA署名とドメイン名の一致をブラウザが検証する。</p></Card>
      </CardGrid>
      <p>TLSの仕組みがわかると、「なぜHTTPSが必須なのか」「証明書更新を怠ると何が起きるか」「<Link href="/network/applications/ssh">SSH</Link>やAPI通信でも同じ暗号の考え方が使われる理由」が一本の線でつながります。次は、TLSの上を流れるHTTPのリクエスト/レスポンスやCookieの話を「<Link href="/network/applications/web">Webの仕組み</Link>」で深掘りしていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/applications/web" tag="ネットワーク">Webの仕組み</RelatedLink>
            <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層</RelatedLink>
            <RelatedLink href="/security/crypto" tag="セキュリティ">暗号の歴史と公開鍵暗号</RelatedLink>
            <RelatedLink href="/cloud/aws/network/acm" tag="AWS">ACM</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
