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
  Timeline,
  TimelineItem,
  TimelineLabel,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "認証プロトコルの変遷",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>認証プロトコルの変遷 ― 「あなたは誰か」を確かめる方法の移り変わり</h1>
        <Lead>
          「<Link href="/security/auth">認証</Link>」「<Link href="/security/authz">認可</Link>」では1つのアプリの中での実装を、「<Link href="/security/token">トークンの全体像</Link>」では証明書としてのトークンの意味を見てきました。このページではさらに視点を引いて、「複数のアプリ・複数の会社をまたいで、あなたが誰かをどう確かめるか」という仕組みが、どんな順番で生まれてきたかを見ていきます。歴史を追うと、どれが「もう使うべきではない古い方式」で、どれが「今も現役、あるいはこれからの標準」なのかが整理しやすくなります。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="〜1990s">アプリ個別認証<br />IDとPWをアプリごとに管理</TimelineItem>
        <TimelineItem era="1980s〜">Kerberos<br />社内向けチケット式SSO</TimelineItem>
        <TimelineItem era="1993〜">LDAP<br />ディレクトリへの問い合わせ</TimelineItem>
        <TimelineItem era="2005〜">SAML 2.0<br />企業間の認証連携</TimelineItem>
        <TimelineItem era="2012〜">OAuth 2.0<br />第三者への権限委譲</TimelineItem>
        <TimelineItem era="2014〜">OpenID Connect<br />OAuthの上に認証を統一</TimelineItem>
        <TimelineItem era="2015〜">JWT<br />状態を持たない証明書</TimelineItem>
        <TimelineItem era="2019〜">WebAuthn / Passkey<br />パスワードを廃止</TimelineItem>
        <TimelineItem era="現在">Identity Platform<br />ここまでを丸ごと肩代わり</TimelineItem>
      </Timeline>
      <TimelineLabel>いずれも「前の方式の弱点を埋める」形で登場しており、後発ほど新しいとは限らず、目的が異なるものも並んでいます。</TimelineLabel>

      <Heading num="01">出発点 ― アプリごとの認証は「同じ穴」を量産する</Heading>
      <p>最も古い形は、アプリが自前でユーザー名とパスワードのテーブルを持つ方式です。「<Link href="/security/auth">認証</Link>」で見たハッシュ化などの対策は、これを前提にした話でした。ただし、アプリが増えるたびにID・パスワードの組がバラバラに増え、ユーザーはアプリの数だけパスワードを使い回すことになり、実装の品質もアプリごとにばらつきます。「1つのIDで複数のアプリにまたがって使えるようにしたい」という要求から、以降の仕組みが生まれていきます。</p>

      <Heading num="02">社内を束ねる ― LDAPとKerberos</Heading>
      <p><Term>LDAP</Term>は「社員情報や部署構成をどこか1か所にまとめて、各システムがそこに問い合わせる」ための<Term>ディレクトリサービス</Term>の通信プロトコルです。一方<Term>Kerberos</Term>は「一度ログインすれば、社内の複数システムを&ldquo;チケット&rdquo;の提示だけで使い回せる」ためのSSOの仕組みで、今のWindowsのActive Directory環境の内部でも実際に使われています。どちらも社内ネットワークという閉じた範囲を前提にした技術です。</p>

      <table>
        <thead>
          <tr><th></th><th>LDAP</th><th>Kerberos</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">役割</td><td>ユーザー・組織情報を保管する「台帳」への問い合わせ</td><td>ログイン済みを示す「チケット」の発行と検証</td></tr>
          <tr><td className="hl">例えると</td><td>社員名簿</td><td>一度見せれば何度も使える通行証</td></tr>
          <tr><td className="hl">今の扱い</td><td>平文通信(LDAP)は非推奨。<Term>LDAPS</Term>/StartTLSでの暗号化が前提</td><td>v4は廃止済み。v5のみが現役(AD内部など)</td></tr>
        </tbody>
      </table>

      <Heading num="03">会社の壁を越える ― SAML</Heading>
      <p>LDAPやKerberosは自社ネットワークの中で完結する仕組みでした。しかし取引先のシステムや外部のSaaSにログインする場合、相手の会社が自社のディレクトリに直接問い合わせるわけにはいきません。<Term>SAML</Term>は、XML形式の「保証書(アサーション)」をやり取りすることで、会社の壁を越えて「この人はログイン済みです」と伝える仕組みです。企業向けSaaSのSSO(Okta・Azure ADなど)では今も広く現役ですが、XMLの署名検証まわりの実装ミスに起因する脆弱性が過去に繰り返し報告されており、新規に何かを設計する場面では次に見るOpenID Connectが選ばれる傾向にあります。</p>

      <Heading num="04">「認証」と「認可」を分けて考える ― OAuthの登場</Heading>
      <p><Term>OAuth</Term>が解決するのは、SAMLとは少し違う問題です。「あるアプリに、自分の代わりに別サービスのデータへ限定的にアクセスする権限を与えたい」―例えば「この写真加工アプリに、自分のGoogleフォトへのアクセスだけを許可したい」というケースです。これは「あなたは誰か」の<Term>認証</Term>ではなく、「何をしてよいか」の<Term>認可</Term>の問題で、「<Link href="/security/authz">認可</Link>」で見た考え方がサービスをまたいで拡張されたものだと捉えられます。</p>
      <p>初期のOAuth 1.0は署名の生成方法が複雑で実装ミスを誘発しやすく、現在ではOAuth 2.0に完全に置き換わっています。ただしOAuth 2.0はあくまで「認可」の規格であり、「ログインできた=本人確認できた」を意味しません。この性質を無視して認証の代わりに使ってしまう誤用が広がったため、次のOpenID Connectが必要とされました。</p>

      <Aside label="豆知識">
        「OAuthでログイン機能を作る」という表現は、正確にはほとんどの場合「OpenID ConnectでOAuth 2.0の仕組みを使ってログイン機能を作る」を指しています。OAuthそのものは本人確認の手段を規定していません。
      </Aside>

      <Heading num="05">OAuthの上に認証を正しく載せる ― OpenID Connect</Heading>
      <p><Term>OpenID Connect(OIDC)</Term>は、OAuth 2.0の「権限委譲の仕組み」の上に、「この人が誰であるかを保証するトークン」を追加した規格です。「Googleでログイン」「Microsoftアカウントでログイン」といった、今日一般的な外部ログインの多くはこの仕組みで動いています。SAMLと役割は近いものの、JSONベースで軽量、モバイルアプリとの相性も良いことから、現在新しく認証連携を設計するなら基本的な第一候補になります。</p>

      <Heading num="06">ステートレスなAPI時代の証明書 ― JWT</Heading>
      <p><Term>JWT</Term>は「<Link href="/security/token">トークンの全体像</Link>」で触れた<Term>トークンベース認証</Term>を実現する具体的なフォーマットで、OAuth・OIDCのアクセストークンやIDトークンとしてよく使われます。サーバー側にログイン状態を保存しない<Term>ステートレス</Term>な設計と相性が良く、APIやSPAで広く使われる現行の方式です。ただし規格自体が安全でも、署名アルゴリズムを検証しない実装や、<code>alg: none</code>を許容してしまう実装ミスが定番の攻撃対象になっている点には注意が必要です。</p>

      <Heading num="07">パスワードそのものをなくす ― WebAuthn・Passkey</Heading>
      <p>ここまでの方式は、いずれも「パスワードをどう安全に扱うか」を前提にしていました。<Term>WebAuthn</Term>とその上に成り立つ<Term>Passkey</Term>は発想が異なり、公開鍵暗号を使って端末の生体認証などとひも付け、そもそもパスワードを持たせないことでフィッシング詐欺を成立させない、というアプローチです。まだ全ての場面を置き換えるには至っていませんが、主要なOS・ブラウザベンダーが揃って推進しており、現時点での最新かつ推奨の方向性です。</p>

      <Heading num="08">すべてを1つにまとめる ― Identity Platform</Heading>
      <p>ここまでの規格(LDAP・SAML・OAuth・OIDC・JWT・WebAuthnなど)を、すべて自前で正しく実装するのは現実的ではありません。<Term>Identity Platform(IDaaS)</Term>は、これらをまとめて提供するマネージドサービスで、Auth0・Okta・Firebase Auth・Amazon Cognitoなどが代表例です。実務でログイン機能を作る場合、まずこうしたサービスの利用を検討し、自前実装は最後の選択肢と考えるのが現在の一般的な判断です。</p>

      <Analogy label="💡 たとえるなら">
        この変遷は「街の鍵の仕組み」の広がり方に似ています。最初は家ごとに違う鍵(アプリ個別認証)。次に社宅の管理人が全戸の鍵を管理(LDAP・Kerberos)。やがて提携先のビルにも入館証が使えるようになり(SAML)、友人に自分の部屋の合鍵を限定的に貸せるようになり(OAuth)、その合鍵に「本人確認済み」の印まで付くようになり(OIDC)、鍵自体が偽造されにくい生体認証キーに置き換わり(WebAuthn)、最後は管理全体を専門の警備会社に委託する(Identity Platform)、という広がり方です。
      </Analogy>

      <Heading num="まとめ">古いもの・現役のもの・これからのもの</Heading>
      <table>
        <thead>
          <tr><th>区分</th><th>該当する技術</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">廃止・非推奨</td><td>OAuth 1.0、Kerberos v4、SAML 1.x、平文LDAP、アプリごとの独自実装</td></tr>
          <tr><td className="hl">条件付きで現役</td><td>LDAP(LDAPS/StartTLS必須)、Kerberos v5(社内限定)、SAML 2.0(既存の企業間SSOでは今も標準)</td></tr>
          <tr><td className="hl">現行の標準</td><td>OAuth 2.0 + PKCE、OpenID Connect、JWT(正しい実装のもとで)</td></tr>
          <tr><td className="hl">これからの主流</td><td>WebAuthn / Passkey、それらをまとめるIdentity Platform</td></tr>
        </tbody>
      </table>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>後発が常に上位互換とは限らない</h4><p>SAMLとOIDCのように、目的が近くても置き換えではなく共存している組み合わせもあります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>「認証」と「認可」は規格上も別物</h4><p>OAuthは認可、OIDCはその上の認証。この境界を意識すると各規格の役割が読み解きやすくなります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>自前実装よりまず標準・IDaaSの検討を</h4><p>暗号化・署名検証などの細部を安全に実装し続けるコストは高く、既存の規格・サービスに乗る方が現実的です。</p></Card>
      </CardGrid>
      <p>これで「セキュリティ」カテゴリは一通り完結です。入力を汚染する攻撃(インジェクション・XSS・SQLインジェクション)から、ログイン状態を乗っ取る攻撃(CSRF・セッション)、誰が・何をしてよいかの判定(認証・認可)、周辺の運用観点(キャッシュ・ログ)、混乱しやすい「セッション・Cookie」「トークン」という言葉の整理、そして最後にそれらを支えるプロトコルの歴史までを一通り見てきました。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
                    <RelatedLink href="/security/token" tag="セキュリティ">トークンの全体像</RelatedLink>
                    <RelatedLink href="/dev/backend/auth/oauth" tag="バックエンド">外部IdP連携（OAuth 2.0 / OIDC）</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
