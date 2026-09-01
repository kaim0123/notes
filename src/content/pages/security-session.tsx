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
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "セッションとCookie" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セッションとCookie ― 引換券をどう守るか</h1>
        <Lead>
          <Link href="/security/auth">認証・認可</Link>の最後で、確かめた結果を持ち回る方法は2つあると書きました。ここではその片方、<Term>セッション</Term>方式を扱います。HTTPは前回のことを覚えていないので、ログイン状態は「番号を持ち歩く」ことで作られています。<strong>その番号を握った人は誰でも本人として通る</strong> ― この一点から、必要な対策のほぼすべてが導けます。
        </Lead>
      </Hero>

      <Heading num="01">覚えていない通信に、記憶を持たせる</Heading>
      <p>
        HTTPは<Term>ステートレス</Term>な通信で、1つ前のリクエストで何が起きたかをサーバーは覚えていません。そこで、ログイン成功時にサーバーがランダムな識別子(<Term>セッションID</Term>)を発行し、以降のリクエストにそれを添えてもらうことで「同じ人からの続き」だと判定します。この識別子を運ぶ入れ物が<Term>Cookie</Term>です。
      </p>

      <DiagramFrame
        slug="security-session-flow"
        aspect="700 / 340"
        caption="セッションの仕組み。ログインに成功するとサーバーは推測できない乱数をセッションIDとして発行し、その利用者が誰であるかという中身は自分の側に保存する。ブラウザへ渡すのはIDだけで、以降は同じサイト宛の通信にブラウザが自動でCookieを付け、サーバーは受け取ったIDから中身を引いて誰かを思い出す。ブラウザが持ち歩くのは引換券の番号にすぎない。"
      />

      <Analogy label="💡 たとえるなら">
        クロークの引換券です。係員はあなたの顔を覚えていなくても、番号が一致すれば荷物を渡します。裏を返せば、券を拾った人にも渡してしまうということです。だから守るべきは「顔」ではなく「券そのもの」になります。
      </Analogy>

      <Heading num="02">番号そのものを強くする</Heading>
      <p>
        まず、推測されない値であること。連番や時刻由来の値では、他人のIDを言い当てられます。<Term>暗号論的に安全な乱数</Term>で、128ビット以上の長さを取るのが基本です。フレームワークが用意しているセッション機構を使うなら、たいていここは満たされています ― 自前で作るときだけ注意が要ります。
      </p>
      <p>
        次に、<strong>URLに載せないこと</strong>。パスやクエリにセッションIDを入れると、ブラウザの履歴、サーバーのアクセスログ、外部サイトへ遷移するときの参照元ヘッダ、共有されたURL ― と、意図しない場所に次々と残ります。運ぶ経路はCookie(または<code>Authorization</code>ヘッダ)だけに絞ります。
      </p>

      <Heading num="03">3つの属性が、3つの別々の攻撃に効く</Heading>
      <p>
        セッションCookieには必ず3つの属性を付けます。設定は1行ずつですが、それぞれ違う脅威に対応しています。
      </p>

      <DiagramFrame
        slug="security-session-attrs"
        aspect="760 / 300"
        caption="セッションCookieの3属性と、対応する脅威。HttpOnlyはXSSで注入されたスクリプトからの読み取りを、SecureはHTTPS以外での送信を止めることで経路上の盗み見を、SameSiteは他サイト起点の自動送信、つまりCSRFをそれぞれ防ぐ。同じ1枚のCookieに対する3つの指定が、性質のまったく違う3つの攻撃に効く。"
      />

      <table>
        <thead>
          <tr><th>属性</th><th>指定の意味</th><th>効く相手</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HttpOnly</td><td>JavaScriptから読み取れなくする</td><td><Link href="/security/xss">XSS</Link>によるセッションIDの窃取</td></tr>
          <tr><td className="hl">Secure</td><td>HTTPSのときだけ送信する</td><td>経路上での盗み見</td></tr>
          <tr><td className="hl">SameSite</td><td>他サイト起点のリクエストには付けない</td><td><Link href="/security/csrf">CSRF</Link></td></tr>
        </tbody>
      </table>

      <p>
        コードを1行も直さずに3層ぶん積めるので、費用対効果ではかなり上位の対策です。<code>Secure</code>を機能させる前提として、サイト全体を常時HTTPSにしておくこともここに含まれます。
      </p>

      <Heading num="04">ログイン時に、番号を作り直す</Heading>
      <p>
        見落とされやすいのが<Term>セッション固定化攻撃</Term>です。攻撃者はIDを盗むのではなく、<strong>自分が知っているIDを先に被害者へ持たせておきます</strong>。被害者がそのままログインすると、攻撃者が握っている番号がログイン済みの状態を指すことになります。
      </p>

      <DiagramFrame
        slug="security-session-fixation"
        aspect="760 / 326"
        caption="セッション固定化と、その対策。ログイン成功時にIDを作り直さない実装では、攻撃者が事前に配っておいた番号がそのままログイン済みの状態を指し、攻撃者も本人として入れてしまう。ログイン成功の瞬間に新しいIDを発行する実装では、古いIDは無効になり、事前に握られていた番号はどこも指さない紙切れに変わる。"
      />

      <p>
        対策は1行です ― <strong>権限が変わる瞬間に番号を作り直す</strong>。ログイン時はもちろん、一般利用者から管理者へ昇格するような場面でも同じことをします。盗む必要がない攻撃なので、盗聴対策では防げません。
      </p>

      <Heading num="05">終わらせ方を決める</Heading>
      <ul>
        <li><strong>有効期限を持たせる</strong> ― 無期限に生きるセッションを作らない。最終操作からの時間と、発行からの絶対的な上限の両方を決めておくと扱いやすい。</li>
        <li><strong>ログアウトでサーバー側も消す</strong> ― ブラウザのCookieを削除するだけでは、サーバー側に実体が残る。番号を拾われれば、まだ通ってしまう。</li>
        <li><strong>まとめて無効にできるようにする</strong> ― パスワード変更や不審な操作の検知で、その利用者のセッションを一括で破棄できる作りにしておく。事故が起きた日に効いてくる。</li>
      </ul>

      <Heading num="06">言葉の整理 ― 「セッション」は3つある</Heading>
      <p>
        最後に、この語の紛らわしさを片づけておきます。同じ「セッション」が、まったく別のものを指して使われます。
      </p>

      <table>
        <thead>
          <tr><th>意味</th><th>何を指すか</th><th>終わるとき</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログインセッション</td><td>サーバーが「あなたが誰か」を覚えている状態</td><td>期限切れ・ログアウト・破棄</td></tr>
          <tr><td className="hl">ブラウザセッション</td><td>タブやウィンドウが開いている期間</td><td>ブラウザを閉じたとき</td></tr>
          <tr><td className="hl">通信のセッション</td><td>接続の確立から終了までの一続き</td><td>接続が切れたとき</td></tr>
        </tbody>
      </table>

      <Aside label="いちばんの罠 ― 「セッションCookie」">
        Cookieには、属性の3つとは別の軸として<strong>有効期限を指定したかどうか</strong>による分類があります。期限を指定しないものを<Term>セッションCookie</Term>、指定したものを<Term>永続Cookie</Term>と呼びます。ここでの「セッション」は上の表の2番目 ― <strong>ブラウザを閉じるまで</strong>という意味であって、ログイン状態のことではありません。「セッションCookieだからブラウザを閉じれば消える」と「セッションが切れた」は、別の話をしています。
      </Aside>

      <Heading num="まとめ">番号は「あなたの代わり」そのもの</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>強い乱数を、Cookieだけで運ぶ</h4>
          <p>推測されない長さを取り、URLには絶対に載せない。載せた瞬間に残る場所が一気に増える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3属性を必ず付ける</h4>
          <p>HttpOnly・Secure・SameSiteが、XSS・盗み見・CSRFにそれぞれ1段ずつ効く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>権限が変わる瞬間に作り直す</h4>
          <p>固定化攻撃は盗まずに配る。ログイン時の再発行だけが対策になる。</p>
        </Card>
      </CardGrid>

      <p>
        セッションが「サーバー側に中身を置く」方式なら、もう一方は証明書のような紙をクライアントに持たせる方式です。次の<Link href="/security/token">トークンの全体像</Link>で、その違いと、同じ言葉が指す複数のものを整理します。
      </p>

      <DocsFooter href="/security/session" />
    </DocsPage>
  );
}
