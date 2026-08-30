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
  title: "セッション・Cookieの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セッション・Cookieの全体像 ― ログイン状態だけの言葉ではない</h1>
        <Lead>
          「<Link href="/security/session">セッションとCookie管理</Link>」では、ログイン状態を安全に維持するための「セッション」を詳しく見ました。しかし「セッション」という言葉は、ブラウザのタブが生きている間だけの状態や、通信そのものの単位を指すときにも使われます。さらにCookie自体にも「セッションCookie」という紛らわしい種類名があります。
        </Lead>
      </Hero>

      <Heading num="01">意味1: ログインセッション ― サーバーが「あなたが誰か」を覚えている状態</Heading>
      <p>「<Link href="/security/session">セッションとCookie管理</Link>」で詳しく扱った意味です。ステートレスなHTTP通信の上で、サーバーが発行した<Term>セッションID</Term>をCookieに乗せて運ぶことで、「ログインした状態」を継続させる仕組みでした。ここまでの意味が、日常で最もよく使われる「セッション」です。</p>

      <Heading num="02">意味2: ブラウザセッション ― タブ・ウィンドウが生きている間</Heading>
      <p>ブラウザを開いてから閉じるまでの一続きの期間そのものを「セッション」と呼ぶこともあります。JavaScriptの<code>sessionStorage</code>という保存領域の名前はここから来ていて、タブやウィンドウを閉じるとデータが消えます。これは意味1のようにサーバー側が管理する状態ではなく、あくまでブラウザという1つのソフトウェアの生存期間を指す、まったく別の話です。</p>

      <Heading num="03">意味3: TCPセッション ― 通信そのものの一続きの単位</Heading>
      <p>「<Link href="/network/layers">階層モデル</Link>」で見たOSI参照モデルには<Term>セッション層</Term>という層があり、接続の確立から維持・終了までの一連のやり取りそのものを「セッション」と呼びます。ログインしているかどうかとは無関係な、通信インフラの下位レイヤーの話です。実際のTCP/IPモデルでは他の層と統合されて扱われますが、「セッション」という名前は用語として残っています。</p>

      <Heading num="04">罠: Cookie自身にも「セッション」という種類名がある</Heading>
      <p>「<Link href="/security/session">セッションとCookie管理</Link>」でCookieの<Term>HttpOnly・Secure・SameSite</Term>という3属性を見ましたが、それとは別の軸として、Cookieには<Term>有効期限の設定有無</Term>による分類があります。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>何を指すか</th><th>消えるタイミング</th></tr>
          <tr><td className="hl">セッションCookie</td><td>有効期限(Expires/Max-Age)を設定しないCookie</td><td>ブラウザを閉じたとき</td></tr>
          <tr><td className="hl">永続Cookie</td><td>Expires/Max-Ageで有効期限を指定したCookie</td><td>指定した期限が来たとき</td></tr>
        </tbody>
      </table>
      <p>ここでの「セッションCookie」の「セッション」は、意味1(ログインセッション)ではなく意味2(ブラウザセッション、ブラウザを閉じるまでの期間)を指しています。同じCookieというしくみの中に、由来の異なる「セッション」が紛れ込んでいる点が、このテーマ最大の罠です。</p>

      <Analogy label="💡 たとえるなら">
        ログインセッションは「会員としてお店に滞在している状態」、ブラウザセッションは「お店(タブ)の営業時間そのもの」、TCPセッションは「配達員が荷物を届けてから受領印をもらうまでの1回のやり取り」に近いイメージです。それぞれ「一続きのまとまり」という発想は共通していますが、何がひとまとまりなのかはまったく別物です。
      </Analogy>

      <Aside label="豆知識">
        「セッションが切れた」と言われたら、多くの場合は意味1(サーバー側のログイン状態が有効期限切れ・破棄された)を指します。一方「セッションCookieだから、ブラウザを閉じたら消えます」という説明は、意味2由来の話をしています。同じ「セッション」という言葉でも、動詞・文脈が違えば指しているものも変わります。
      </Aside>

      <Heading num="まとめ">覚えておきたい4つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ログインセッション</h4><p>サーバーがログイン状態を覚えている、最もよく使われる意味。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ブラウザセッション</h4><p>タブ・ウィンドウを閉じるまでの期間。サーバー側の状態とは無関係。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>TCPセッション</h4><p>通信の確立から終了までの一続き。OSI参照モデルのセッション層に由来。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>セッションCookieは意味2由来</h4><p>有効期限を設定しないCookieを指す種類名で、ログインセッションとは別の話。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
                    <RelatedLink href="/security/token" tag="セキュリティ">トークンの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
