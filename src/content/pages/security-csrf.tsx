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

export const metadata: Metadata = { title: "CSRF対策" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>CSRF対策 ― 本人確認と、意思の確認は別</h1>
        <Lead>
          <Link href="/security/xss">XSS</Link>は、狙ったサイトに悪意あるスクリプトを送り込む攻撃でした。<Term>CSRF(クロスサイトリクエストフォージェリ)</Term>はまったく違うやり方を取ります。攻撃者は標的のサイトに一切手を触れず、<strong>自分のサイトを1枚用意するだけ</strong>で、ログイン中の利用者に意図しない操作をさせます。使うのは脆弱性ではなく、Cookieが自動で送られるというブラウザのごく普通の仕様です。
        </Lead>
      </Hero>

      <Heading num="01">「本人のふり」ではなく「本人のブラウザ」を使う</Heading>
      <p>
        ブラウザには「あるサイト宛のリクエストには、そのサイトのCookieを自動で付ける」という決まりがあります。ログイン状態が保たれるのはこの仕組みのおかげですが、<Term>誰がそのリクエストを発生させたか</Term>は問われません。
      </p>

      <DiagramFrame
        slug="security-csrf-flow"
        aspect="760 / 300"
        caption="CSRFが成立する流れ。銀行サイトにログイン中のブラウザで攻撃者のサイトを開くと、そこに置かれた隠しフォームが自動送信され、銀行サイトへPOSTが飛ぶ。宛先が銀行なのでブラウザはCookieを自動で添付し、サーバーから見れば正しいセッションIDが付いた正しい形の依頼になる。攻撃者は銀行サイトに侵入しておらず、用意したのは自分のサイト1枚だけ。"
      />

      <p>
        ここが要点です。<strong>Cookieが証明しているのは「本人であること」だけで、「本人がいま、それを望んでいること」までは証明していません</strong>。CSRF対策とは、この足りない半分 ― 意思の確認 ― を足す作業です。
      </p>

      <Analogy label="💡 たとえるなら">
        本人のサイン入り依頼書さえ出せば、誰が持ってきても処理する窓口のようなものです。必要なのは、本人確認証(Cookie)に加えて「その場で発行された、一度きりの整理券」を確かめること。整理券は窓口の前に立った人にしか渡されないので、外から送りつけた依頼は弾けます。
      </Analogy>

      <Heading num="02">前提 ― 変える操作をGETに置かない</Heading>
      <p>
        対策の話に入る前に、土台がひとつあります。データを変える処理(送金・削除・設定変更)を<code>GET</code>で行わないことです。<code>GET</code>は「取得するだけ」という前提で扱われるため、画像タグの読み込み、リンクの先読み、ブラウザ拡張の巡回など、<Term>利用者がクリックしなくても発生する経路</Term>がいくつもあります。
      </p>
      <p>
        変更操作を<code>POST</code>に寄せておくと、攻撃に必要な仕掛けがフォームの自動送信に限られ、次の対策が効く形になります。「見るだけ」と「変える」を分けることは、それ自体が対策の前提条件です。
      </p>

      <Heading num="03">2つの防御は、止める段階が違う</Heading>
      <p>
        本命の対策は2つあります。片方はブラウザの段階で、もう片方はサーバーの段階で効きます。
      </p>

      <DiagramFrame
        slug="security-csrf-defenses"
        aspect="760 / 300"
        caption="CSRFの2つの防御がそれぞれどこで効くか。正規のフォームからの送信は、同一サイト起点なのでSameSiteの条件を満たしてCookieが付き、ページに埋め込まれたCSRFトークンもサーバー側の値と一致して実行される。攻撃者のサイトを起点とする送信は、まずブラウザの段階でCookieが添付されず、仮に添付されてもサーバーの段階でトークンの値を知り得ないため拒否される。"
      />

      <table>
        <thead>
          <tr><th></th><th>CSRFトークン</th><th>SameSite属性</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">効く場所</td><td>サーバー(値を照合する)</td><td>ブラウザ(Cookieを付けない)</td></tr>
          <tr><td className="hl">仕組み</td><td>フォーム表示のたびに推測不能な値を発行し、送信時に照合する</td><td>他サイトを起点とするリクエストにCookieを添付しない</td></tr>
          <tr><td className="hl">効かなくなる条件</td><td>XSSでページ内の値を読まれたとき</td><td>ブラウザの実装・設定に依存する部分が残る</td></tr>
        </tbody>
      </table>

      <p>
        攻撃者のサイトは、<Term>標的サイトの正規ページを読めません</Term>(同一オリジンポリシー)。だからトークンの値を知る術がなく、Cookieが自動で付いても照合で落ちます。SameSiteは、そもそもCookieを付けさせないという一段手前の防御で、<code>Lax</code>ならリンクからの遷移では送られフォームの自動送信では送られない、<code>Strict</code>なら他サイト起点では一切送られない、という強さの違いがあります。
      </p>

      <Aside label="2つはどちらも「片方だけ」にしない">
        SameSiteはブラウザ任せの防御なので、古い環境や例外的な遷移が残ります。逆にトークンも、<Link href="/security/xss">XSS</Link>でページ内の値を読まれれば無効になります。CSRF対策とXSS対策は独立ではなく、互いを支え合う関係です ― 片方に穴があれば、もう片方も抜かれます。
      </Aside>

      <Heading num="04">それでも通ったときのために</Heading>
      <ul>
        <li><strong>重要操作の再認証</strong> ― 送金・退会・メールアドレス変更のような取り返しのつかない操作は、実行の直前にパスワードや多要素認証をもう一度求める。仮にCSRFが成立しても、ここで止まる。</li>
        <li><strong>クライアントから来た値を信用しない</strong> ― 金額・権限・所有者といった値を<code>hidden</code>で往復させない。サーバー側が保持しているデータから引き直す。</li>
        <li><strong>Refererチェックは補助として</strong> ― リクエスト元を示すヘッダは参考になるが、送られない構成もあるため、これ単体を主たる防御にはしない。</li>
      </ul>

      <p>
        なお、Cookieを使わずに<Link href="/security/token">トークン</Link>を<code>Authorization</code>ヘッダで送る設計では、ブラウザが自動で付けるものがないためCSRFは原理的に成立しません。その代わり、トークンの置き場所という別の問題が出てきます ― どちらを選んでも、消えるのではなく形が変わります。
      </p>

      <Heading num="まとめ">Cookieは本人確認、トークンは意思確認</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>脆弱性を使わない攻撃</h4>
          <p>攻撃者は標的に触れない。Cookieが自動で付くという正常な仕様だけで成立する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>変える操作はPOSTへ</h4>
          <p>GETは利用者がクリックしなくても発生する。分けておくことが、他の対策の前提になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>2段で止める</h4>
          <p>SameSiteはブラウザ、トークンはサーバー。段階が違うので、両方を入れて意味がある。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/csrf" />
    </DocsPage>
  );
}
