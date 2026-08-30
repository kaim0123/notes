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
  title: "セッションとCookie管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セッションとCookie管理 ― 「ログイン状態」を安全に維持する</h1>
        <Lead>
          HTTPは本来、1回ごとのリクエストが独立していて「前回のことを覚えていない」通信です。それでもログインした状態が保たれて見えるのは、裏側で<Term>セッション</Term>という仕組みが「あなたが誰か」を覚えているからです。ここまでのXSS・CSRF対策の多くは、実はこのセッションの守り方に集約されます。
        </Lead>
      </Hero>

      <Heading num="01">セッションとは ― 「覚えていない」通信に記憶を持たせる工夫</Heading>
      <p>HTTPは<Term>ステートレス</Term>な通信です。1つ前のリクエストで何が起きたかを、サーバーは基本的に覚えていません。しかしログインが必要なサービスでは「このリクエストはさっきログインしたあの人からのものだ」と識別できなければ話になりません。</p>
      <p>そこで、ログイン成功時にサーバーがランダムな識別子(<Term>セッションID</Term>)を発行し、以降のリクエストにはその識別子を添えてもらうことで、「同じ人からの続きのやり取りだ」と判定します。この識別子を運ぶための入れ物が<Term>Cookie</Term>です。ブラウザは一度受け取ったCookieを、以降そのサイト宛てのリクエストに自動で添付し続けます。</p>

      <Analogy label="💡 たとえるなら">
        セッションIDは、コインロッカーやクロークで受け取る「引換券」に似ています。あなた自身の顔をいちいち覚えていなくても、引換券の番号さえ一致すれば「さっき荷物を預けたのと同じ人」として扱ってもらえます。裏を返せば、この引換券を他人に見られたり盗まれたりすれば、誰でもあなたのふりができてしまうということです。だからこそ、この引換券(セッションID)自体の扱いが極めて重要になります。
      </Analogy>

      <Heading num="02">セッションIDそのものを強くする</Heading>
      <p>セッションIDは、他人に推測されない強度が必須です。連番や単純な文字列では、攻撃者が総当たりで別人のIDを言い当てられてしまいます。<code>random_bytes</code>のような暗号論的に安全な乱数生成器を使い、<strong>128bit以上</strong>のランダム値にするのが基本です。</p>
      <p>また、セッションIDは<strong>URLに含めず、Cookieだけで運搬</strong>します。URLに含めてしまうと、ブラウザの閲覧履歴・サーバーのアクセスログ・他サイトへ遷移する際の<code>Referer</code>ヘッダなど、思わぬ場所に記録が残って漏れるリスクが跳ね上がります。</p>

      <Heading num="03">Cookieの3つの属性 ― 1つの設定が複数の脅威に効く</Heading>
      <p>セッションCookieには3つの属性を必ず設定します。それぞれが、これまで見てきた別々の脅威に対応しています。</p>

      <table>
        <thead>
          <tr><th>属性</th><th>意味</th><th>防ぐ脅威</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HttpOnly</td><td>JavaScriptからCookieを読み取れなくする</td><td><Link href="/security/xss">XSS</Link>によるセッションID盗聴</td></tr>
          <tr><td className="hl">Secure</td><td>HTTPS通信のときだけCookieを送信する</td><td>通信経路上での盗聴</td></tr>
          <tr><td className="hl">SameSite</td><td>他サイトを起点とするリクエストにはCookieを送らない</td><td><Link href="/security/csrf">CSRF</Link></td></tr>
        </tbody>
      </table>

      <p>1枚のCookieに3つの属性を付けるだけで、盗聴・XSS・CSRFという3種類の異なる攻撃それぞれに1段ずつ防御を積み増せる、非常にコストパフォーマンスの良い対策です。</p>

      <Heading num="04">ログイン時にIDを再発行する ― セッション固定化対策</Heading>
      <p>意外と見落とされがちなのが<Term>セッション固定化攻撃</Term>です。攻撃者が事前に何らかの方法で「未ログイン状態のセッションID」を被害者に踏ませておき、被害者がそのIDのままログインしてしまうと、攻撃者は自分が握っている(ログイン前の)同じIDを使って、ログイン後のセッションに成りすませてしまいます。</p>
      <p>対策はシンプルで、<strong>ログイン成功のタイミングでセッションIDを新しく発行し直す</strong>ことです(<code>session_regenerate_id()</code>など)。ログイン前にどんなIDが割り当てられていたとしても、ログインした瞬間に無効化されるため、事前に握られていたIDは意味を失います。</p>

      <Aside label="豆知識">
        クロークの例えで言えば、これは「入店時に渡された仮の引換券を、あなたが会員証を提示した瞬間に、新しい番号の引換券に交換する」ようなものです。仮の番号を誰かに覚えられていても、交換後の番号までは分かりません。
      </Aside>

      <Heading num="05">ログアウトと有効期限の管理</Heading>
      <ul>
        <li><strong>有効期限を設定する</strong> ― セッションを無期限に有効なままにせず、一定時間・一定期間で失効させる。</li>
        <li><strong>ログアウト時にサーバー側のデータも削除する</strong> ― ブラウザ側のCookieを消すだけでは、サーバー側にセッションの実体が残っていれば意味がない。両方を確実に破棄する。</li>
        <li><strong>HTTPSを必須にする</strong> ― Secure属性を機能させる大前提として、サイト全体を常時HTTPS化しておく。</li>
      </ul>
      <p>サービスによっては、Secure属性付きの別トークンをもう1枚のCookieとして併用し、セッションIDと2重に検証する構成を取ることもあります。1つのCookieが漏れても即座に完全ななりすましには至らないようにする、多層防御の考え方の応用です。</p>

      <Heading num="まとめ">セッションIDは「あなたの代わり」そのもの</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>強いランダム性</h4><p>推測されない128bit以上のIDを、URLではなくCookieだけで運ぶ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3属性で多重に守る</h4><p>HttpOnly・Secure・SameSiteがそれぞれ別の脅威(XSS・盗聴・CSRF)に対応する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ログイン時に作り直す</h4><p>セッション固定化を防ぐため、ログイン成功時にIDを再発行し、ログアウト時は確実に破棄する。</p></Card>
      </CardGrid>
      <p>ここまでは「セッションを乗っ取られない・偽装されない」ための守り方でした。ここからは一歩視点を変えて、次のページ「<Link href="/security/auth">認証</Link>」で、そもそも「あなたが誰であるか」をどうやって確認するのか ― ログインの仕組みそのものを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/csrf" tag="セキュリティ">CSRF対策</RelatedLink>
                    <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
