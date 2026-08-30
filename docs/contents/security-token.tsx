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
  title: "トークンの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>トークンの全体像 ― 「何を証明するための紙切れか」で意味が変わる</h1>
        <Lead>
          「<Link href="/security/csrf">CSRF対策</Link>」ではCSRFトークンを、「<Link href="/security/auth">認証</Link>」では自動ログイン用のトークンを、それぞれ見てきました。「トークン」はランダムな文字列という実体はほぼ共通なのに、何を証明するために使われるかで役割がまったく変わります。
        </Lead>
      </Hero>

      <Heading num="01">共通点 ― 「使い捨て・期限付きの、証明書」という発想</Heading>
      <p>トークンの実体は、ほとんどの場合ただの推測不能なランダム文字列です。それ自体に意味はなく、<strong>「これを持っていれば、ある権利や状態を証明したことにする」</strong>という約束事だけが、トークンに意味を与えています。何を証明するかによって、まったく別の役割のトークンになります。</p>

      <Heading num="02">意味1: CSRFトークン ― 「その場限りの整理券」</Heading>
      <p>「<Link href="/security/csrf">CSRF対策</Link>」で詳しく扱った意味です。サーバーがフォーム表示のたびに発行し、そのフォームからの送信が正規のページ経由であることを証明します。証明しているのは「本人かどうか」ではなく、「今まさにこのページを見て送信した、という意思」です。</p>

      <Heading num="03">意味2: セッションIDと同じ意味で使われる「トークン」</Heading>
      <p>「<Link href="/security/session">セッションとCookie管理</Link>」で見た<Term>セッションID</Term>や、「<Link href="/security/auth">認証</Link>」で触れた自動ログイン用の値も、実装によっては「トークン」と呼ばれます。この場合のトークンは、ログイン状態そのものを証明する値であり、CSRFトークンとは証明する対象がまったく異なります。</p>

      <Heading num="04">意味3: アクセストークン・リフレッシュトークン ― もう1つの認証方式</Heading>
      <p>ここまでの「セッションID」は、サーバー側が「誰がログイン中か」という状態を保存しておく方式でした。これとは別に、サーバーが状態を保存せず、トークン自体に必要な情報を埋め込んで検証する<Term>トークンベース認証</Term>という考え方があります(実装にはJWTなどが使われます)。この方式では、有効期限の短い<Term>アクセストークン</Term>でAPIへのアクセス権を証明し、期限切れになったら<Term>リフレッシュトークン</Term>(有効期限が長い)を使ってアクセストークンを再発行します。このアクセストークン・リフレッシュトークンという仕組みがOAuth・OpenID Connectという規格の中でどう位置づけられているかは、次のページ「<Link href="/security/identity">認証プロトコルの変遷</Link>」で扱うので、ここでは「セッション方式とは別に、トークン方式という考え方がある」という位置づけだけ押さえておいてください。</p>

      <table>
        <tbody>
          <tr><th>種類</th><th>何を証明するか</th><th>登場する場面</th></tr>
          <tr><td className="hl">CSRFトークン</td><td>リクエストが正規ページ経由であること(意思の証明)</td><td>フォーム送信</td></tr>
          <tr><td className="hl">セッションID(トークンと呼ばれることも)</td><td>ログイン状態そのもの</td><td>Cookie経由の毎リクエスト</td></tr>
          <tr><td className="hl">アクセストークン</td><td>APIなどへのアクセス権</td><td>API呼び出し</td></tr>
          <tr><td className="hl">リフレッシュトークン</td><td>アクセストークンを再発行する権利</td><td>アクセストークンの期限切れ時</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        遊園地に例えると、セッションIDは「入場した証の腕輪」、CSRFトークンは「絶叫マシンに乗るたびに配られる、その場限りの整理券」、アクセストークンは「使うたびに減っていく園内通貨コイン」、リフレッシュトークンは「コインが尽きたときに窓口へ持っていく両替券」にあたります。証明している対象が違うからこそ、それぞれ別の紙切れとして存在しています。
      </Analogy>

      <Aside label="豆知識">
        「トークンが漏れた」という報告を受けたときは、まずどの意味のトークンかを確認する必要があります。CSRFトークンの漏洩と、アクセストークンの漏洩とでは、想定される被害も取るべき対応(無効化すべき範囲)もまったく異なります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>トークン=使い捨ての証明書</h4><p>ランダムな値そのものに意味はなく、「何を証明するか」という約束事が本体です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CSRFトークンは「意思」の証明</h4><p>本人確認(Cookie)とは別に、その場での送信意図を確認します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>アクセストークンは別の認証方式</h4><p>サーバーに状態を持たせないトークンベース認証という、セッションIDとは別の考え方です。</p></Card>
      </CardGrid>
      <p>ここまでで、アプリ単体の中の話は一通り整理できました。最後の「<Link href="/security/identity">認証プロトコルの変遷</Link>」では、この視点をさらに引いて、LDAPやOAuthといった仕組みが複数のアプリ・複数の会社をまたいで「あなたは誰か」を確かめるためにどう生まれてきたかを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/csrf" tag="セキュリティ">CSRF対策</RelatedLink>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/security/identity" tag="セキュリティ">認証プロトコルの変遷</RelatedLink>
                    <RelatedLink href="/dev/backend/auth/token" tag="バックエンド">トークンの運用</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
