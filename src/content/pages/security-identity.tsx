import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Timeline,
  TimelineItem,
  TimelineLabel,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "認証プロトコルの変遷" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>認証プロトコルの変遷 ― 「誰か」を確かめる仕組みの移り変わり</h1>
        <Lead>
          ここまでは1つのアプリの中の話でした。<Link href="/security/session">セッション</Link>も<Link href="/security/token">トークン</Link>も、自分のサービスが自分で発行し、自分で検証する前提です。このページでは視点を引いて、<strong>複数のアプリ・複数の会社をまたいで「あなたが誰か」をどう伝えるか</strong>を見ます。歴史の順に並べると、どれが役目を終えた方式で、どれが今も現役で、どれがこれからなのかが整理できます。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="〜1990s">アプリ個別認証<br />IDとパスワードをアプリごとに持つ</TimelineItem>
        <TimelineItem era="1980s〜">Kerberos<br />社内向けチケット式のSSO</TimelineItem>
        <TimelineItem era="1993〜">LDAP<br />ディレクトリへの問い合わせ</TimelineItem>
        <TimelineItem era="2005〜">SAML 2.0<br />会社をまたぐ認証連携</TimelineItem>
        <TimelineItem era="2012〜">OAuth 2.0<br />第三者への権限委譲</TimelineItem>
        <TimelineItem era="2014〜">OpenID Connect<br />OAuthの上に認証を載せる</TimelineItem>
        <TimelineItem era="2015〜">JWT<br />状態を持たない証明書</TimelineItem>
        <TimelineItem era="2019〜">WebAuthn / パスキー<br />パスワードそのものをなくす</TimelineItem>
        <TimelineItem era="現在">Identity Platform<br />ここまでを丸ごと肩代わり</TimelineItem>
      </Timeline>
      <TimelineLabel>
        どれも「前の方式の弱点を埋める」形で登場していますが、後発が常に上位互換とは限りません。目的が違うまま並んでいるもの(SAMLとOAuthなど)もあります。
      </TimelineLabel>

      <Heading num="01">出発点 ― アプリごとの認証は、同じ穴を量産する</Heading>
      <p>
        最も古い形は、アプリが自前でユーザー名とパスワードの表を持つ方式です。<Link href="/security/auth">認証・認可</Link>で見た保存方法の話は、これを前提にしていました。問題は数が増えたときに起こります ― アプリの数だけパスワードが増え、利用者は使い回し、実装の品質はアプリごとにばらつき、<strong>1つのアプリの実装ミスが、他のサービスの被害に直結します</strong>。以降の仕組みは、この一点を解こうとした試みだと見ると流れが読めます。
      </p>

      <Heading num="02">社内を束ねる ― LDAPとKerberos</Heading>
      <p>
        まず「社内」という閉じた範囲でまとめる仕組みが生まれました。役割が違うので、よく混同されますが別物です。
      </p>

      <table>
        <thead>
          <tr><th></th><th>LDAP</th><th>Kerberos</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">役割</td><td>利用者・組織情報を保管する台帳への問い合わせ</td><td>ログイン済みを示すチケットの発行と検証</td></tr>
          <tr><td className="hl">たとえると</td><td>社員名簿</td><td>一度見せれば使い回せる通行証</td></tr>
          <tr><td className="hl">いまの扱い</td><td>平文のままは非推奨。暗号化した接続が前提</td><td>v5のみ現役。Active Directoryの内部で動いている</td></tr>
        </tbody>
      </table>

      <p>
        どちらも<Term>社内ネットワークという境界</Term>を前提にしています。境界の内側で名簿を引き、内側で通行証を配る。この前提が崩れた先に何が起きたかは、<Link href="/security/countermeasures">セキュリティ対策・実装</Link>のゼロトラストの節で扱ったとおりです。
      </p>

      <Heading num="03">会社の壁を越える ― SAML</Heading>
      <p>
        外部のSaaSにログインする場合、相手の会社が自社の名簿を直接引くわけにはいきません。<Term>SAML</Term>は、XML形式の「保証書」をやり取りして「この人はうちで認証済みです」と伝える仕組みです。企業向けSaaSのシングルサインオンでは今も広く現役ですが、<strong>XMLの署名検証まわりの実装ミスに起因する脆弱性が繰り返し報告されており</strong>、新規に設計するなら次のOpenID Connectが選ばれる傾向にあります。
      </p>

      <Heading num="04">OAuthが解いたのは、認可のほう</Heading>
      <p>
        <Term>OAuth</Term>が扱う問題は、SAMLとは違います。「このアプリに、自分のGoogleフォトへのアクセスだけを許したい」 ― <strong>自分の代わりに、限定された範囲で動く権限を第三者に渡す</strong>という問題です。これは「あなたは誰か」ではなく「何をしてよいか」の話で、<Link href="/security/authz">認可</Link>がサービスをまたいで拡張されたものにあたります。
      </p>

      <DiagramFrame
        slug="security-identity-oauth-oidc"
        aspect="760 / 320"
        caption="OAuth 2.0とOpenID Connectの役割の違い。OAuthでアプリが受け取るアクセストークンは、特定の資源にアクセスしてよいという権限の証明にすぎず、利用者が誰であるかは保証していない。OpenID Connectはその上にIDトークンを追加し、利用者の識別子と発行元の署名によって、誰がログインしたのかを確かめられるようにする。"
      />

      <p>
        だからここに落とし穴があります。<Term>OAuth 2.0は認可の規格であり、「ログインできた」は「本人確認できた」を意味しません</Term>。アクセストークンが手に入ったことを本人確認の代わりに使う誤用が広まったことが、次のOpenID Connectが必要になった理由そのものです。
      </p>

      <Aside label="「OAuthでログイン」という言い方">
        ほとんどの場合、正確には「OAuth 2.0の仕組みの上で、OpenID Connectを使ってログインする」を指しています。OAuth自体は本人確認の手段を定めていません。なお、公開クライアント(SPAやモバイルアプリ)では、認可コードの横取りを防ぐ<Term>PKCE</Term>の併用が現在の標準的な構成になります。
      </Aside>

      <Heading num="05">OpenID ConnectとJWT</Heading>
      <p>
        <Term>OpenID Connect(OIDC)</Term>は、OAuth 2.0の上に「この人が誰かを保証するトークン」(IDトークン)を足した規格です。「Googleでログイン」「Microsoftアカウントでログイン」の多くはこれで動いています。SAMLと役割は近いものの、JSONベースで軽く、モバイルとの相性も良いことから、新しく認証連携を設計するなら第一候補になります。
      </p>
      <p>
        そのIDトークンの形式としてよく使われるのが<Term>JWT</Term>です。<Link href="/security/token">トークンの全体像</Link>で見たとおり、規格が安全でも検証する側の実装で落ちるのが定番なので、<strong>署名アルゴリズムを固定する・発行者と宛先を確かめる・有効期限を見る</strong>の3つは必ず押さえます。
      </p>

      <Heading num="06">パスワードそのものをなくす ― WebAuthnとパスキー</Heading>
      <p>
        ここまでの方式は、いずれも「パスワードをどう安全に扱うか」を前提にしていました。<Term>WebAuthn</Term>とその上に成り立つ<Term>パスキー</Term>は、前提のほうを外します。
      </p>

      <DiagramFrame
        slug="security-identity-passkey"
        aspect="760 / 320"
        caption="パスワード方式とパスキー方式で、秘密がどこに存在するかの比較。パスワードでは利用者の記憶とサーバーの保管の2箇所に秘密があり、毎回それが通信路を流れるため、偽サイトに入力すれば渡ってしまう。パスキーでは秘密鍵が端末から出ず、サーバーは公開鍵だけを持つ。認証のたびに端末が署名を作って送り、その署名は接続先のドメインに結びついているため、偽サイト向けの署名は作られない。"
      />

      <p>
        効きどころは<strong>フィッシングが構造として成立しなくなる</strong>ことです。利用者がどれだけ巧妙な偽サイトに騙されても、端末は「そのドメイン向けの署名」を作りません。人の注意力に依存しない対策は珍しく、主要なOS・ブラウザが揃って推進しているのもこのためです。
      </p>

      <Analogy label="💡 たとえるなら">
        この変遷は鍵の仕組みの広がり方に似ています。最初は家ごとに違う鍵(アプリ個別認証)。次に管理人が全戸の鍵を預かり(LDAP・Kerberos)、提携先のビルにも入館証が使えるようになり(SAML)、友人に部屋の合鍵を限定的に貸せるようになり(OAuth)、その合鍵に本人確認済みの印が付き(OIDC)、最後に鍵そのものが偽造できない生体キーへ置き換わります(パスキー)。
      </Analogy>

      <Heading num="07">全部を自前で実装しない</Heading>
      <p>
        ここまでの規格を正しく実装し、<strong>正しいまま保ち続ける</strong>のは現実的ではありません。署名検証の細部、鍵のローテーション、規格の更新への追随 ― どれも継続的な負担になります。これらをまとめて提供するのが<Term>Identity Platform(IDaaS)</Term>で、実務では<Term>まずこれを検討し、自前実装は最後の選択肢とする</Term>のが現在の一般的な判断です。外部IdPに繋ぐ側の実装は<Link href="/backend/auth-oauth">外部IdP連携(OAuth 2.0 / OIDC)</Link>で扱っています。
      </p>

      <Heading num="まとめ">古いもの・現役のもの・これからのもの</Heading>
      <table>
        <thead>
          <tr><th>区分</th><th>該当する技術</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">役目を終えた</td><td>OAuth 1.0、Kerberos v4、SAML 1.x、暗号化しないLDAP、アプリごとの独自実装</td></tr>
          <tr><td className="hl">条件付きで現役</td><td>LDAP(暗号化必須)、Kerberos v5(社内限定)、SAML 2.0(既存の企業間SSO)</td></tr>
          <tr><td className="hl">現行の標準</td><td>OAuth 2.0 + PKCE、OpenID Connect、JWT(検証を正しく実装したもの)</td></tr>
          <tr><td className="hl">これからの主流</td><td>WebAuthn / パスキー、それらをまとめるIdentity Platform</td></tr>
        </tbody>
      </table>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>後発が上位互換とは限らない</h4>
          <p>SAMLとOIDCのように、役割が近くても置き換えではなく共存しているものがある。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>認可と認証は規格の上でも別</h4>
          <p>OAuthは認可、OIDCはその上の認証。この境界を意識すると各規格の役割が読み解ける。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>正しく保ち続けるコストで選ぶ</h4>
          <p>実装できるかではなく、更新に追随し続けられるか。だから標準とIDaaSが第一候補になる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/identity" />
    </DocsPage>
  );
}
