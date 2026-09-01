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

export const metadata: Metadata = { title: "トークンの全体像" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>トークンの全体像 ― 何を証明する紙切れか</h1>
        <Lead>
          <Link href="/security/csrf">CSRF対策</Link>ではCSRFトークンを、<Link href="/security/session">セッションとCookie</Link>ではセッションIDを見てきました。どれも実体は「推測できないランダム文字列」で共通しているのに、役割はまったく違います。<strong>トークンという言葉は、値の種類ではなく約束事の名前</strong>です。だから「トークンが漏れた」だけでは、被害の範囲も、やるべき対応も決まりません。
        </Lead>
      </Hero>

      <Heading num="01">実体は同じ、証明する対象が違う</Heading>
      <p>
        トークンの値そのものに意味はありません。「これを持っていれば、ある権利や状態を証明したことにする」という<Term>約束</Term>だけが、値に意味を与えています。何を証明する約束かによって、別の役割になります。
      </p>

      <DiagramFrame
        slug="security-token-kinds"
        aspect="760 / 320"
        caption="トークンと呼ばれる4種類の値が、それぞれ何を証明しているか。セッションIDはログイン状態そのもの、CSRFトークンはいま本人が送ったという意思、アクセストークンは資源へのアクセス権、リフレッシュトークンはアクセストークンを作り直す権利を証明する。漏れたときに起きることも、無効化すべき対象も、それぞれ違う。"
      />

      <Analogy label="💡 たとえるなら">
        遊園地で言えば、セッションIDは入場したことを示す腕輪、CSRFトークンはアトラクションごとに配られるその場限りの整理券、アクセストークンは園内で使う支払い用のコイン、リフレッシュトークンはコインが尽きたときに窓口へ持っていく両替券です。どれも紙切れですが、拾った人にできることが違います。
      </Analogy>

      <Heading num="02">セッション方式とトークン方式 ― 状態をどこに置くか</Heading>
      <p>
        混乱しやすいのが、3番目と4番目にあたる<Term>トークンベース認証</Term>です。セッション方式が「サーバーに中身を置き、それを指す番号を渡す」のに対し、こちらは<strong>必要な情報をトークン自身に書き込み、署名を付けて渡します</strong>。
      </p>

      <DiagramFrame
        slug="security-token-vs-session"
        aspect="760 / 320"
        caption="セッション方式とトークン方式を、状態をどこに置くかで比べたもの。セッション方式は中身をサーバーの記録に置き、検証のたびに記録を引く代わりに、消せばその瞬間から無効にできる。トークン方式は中身をトークンに書き込んで署名するため、記録を引かずに検証でき速いが、消すべき記録がないので有効期限が切れるまで取り消せない。速さと取り消しやすさが表裏になっている。"
      />

      <p>
        表裏の関係になっているのが要点です。<Term>トークンが速いのは、記録を引かないから</Term>。そして引かない仕組みは、消すこともできません。だから実務では、アクセストークンの期限を数分〜数十分と短くし、失効させたいものを別に管理する(失効リスト)といった形で埋め合わせます。運用面の具体的な組み立ては<Link href="/backend/auth-token">トークンの運用</Link>で扱っています。
      </p>

      <Heading num="03">JWTで落ちるのは、たいてい検証の側</Heading>
      <p>
        トークン方式の実装によく使われるのが<Term>JWT</Term>です。ヘッダ・ペイロード・署名の3つをドットでつないだ形式で、規格そのものは十分に検討されています。<strong>問題が起きるのは決まって検証する側</strong>で、定番の落とし穴がいくつかあります。
      </p>

      <table>
        <thead>
          <tr><th>落とし穴</th><th>何が起きるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">署名を検証せずに中身だけ読む</td><td>誰でも中身を書き換えたトークンを作れる</td></tr>
          <tr><td className="hl">アルゴリズムをトークン任せにする</td><td>署名なしを指定したトークンが通ってしまう</td></tr>
          <tr><td className="hl">有効期限を確認しない</td><td>期限が切れたトークンが使い続けられる</td></tr>
          <tr><td className="hl">発行者や宛先を確認しない</td><td>別サービス向けに発行されたトークンが通る</td></tr>
          <tr><td className="hl">秘密情報をペイロードに入れる</td><td>署名は改ざんを防ぐだけで、中身は誰でも読める</td></tr>
        </tbody>
      </table>

      <p>
        最後の行だけ性質が違うので補足します。JWTのペイロードは<strong>暗号化されていません</strong>。単に符号化されているだけなので、受け取った人は誰でも中身を読めます。署名が保証するのは「改ざんされていないこと」であって、「読まれないこと」ではありません。
      </p>

      <Heading num="04">どこに置くか ― 置き場所で脅威が変わる</Heading>
      <p>
        トークンをクライアントのどこに保存するかは、それ自体が設計の判断になります。<strong>どこに置いても安全な場所はなく、どの攻撃を引き受けるかが変わるだけ</strong>です。
      </p>

      <table>
        <thead>
          <tr><th>置き場所</th><th>弱いところ</th><th>効く対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Cookie(HttpOnly付き)</td><td>ブラウザが自動送信するのでCSRFの対象になる</td><td>SameSite属性とCSRFトークン</td></tr>
          <tr><td className="hl">localStorage</td><td>JavaScriptから読めるのでXSSで抜かれる</td><td>XSSを起こさないこと(それ以外に手がない)</td></tr>
          <tr><td className="hl">メモリ(変数)</td><td>再読み込みで消える</td><td>短命なアクセストークンだけを置く</td></tr>
        </tbody>
      </table>

      <p>
        <code>localStorage</code>は<code>HttpOnly</code>の保護を受けられないため、<Link href="/security/xss">XSS</Link>が1つあれば読み出されます。Cookieに置いてCSRF対策を足すほうが、守り方が確立しているぶん扱いやすい ― というのが現在の一般的な判断です。ブラウザ側の保存領域そのものの違いは<Link href="/frontend/storage">ブラウザストレージ</Link>を参照してください。
      </p>

      <Aside label="「トークンが漏れた」と言われたら">
        まず<strong>どの意味のトークンか</strong>を確かめます。CSRFトークンなら影響はそのフォーム1回分で、無効化すべきものもほぼありません。アクセストークンなら期限切れまでの悪用を想定し、リフレッシュトークンなら<strong>新しいアクセストークンを作られ続ける</strong>ため、その利用者の資格情報ごと失効させる判断になります。同じ言葉でも、対応の重さが桁違いに変わります。
      </Aside>

      <Heading num="まとめ">値ではなく、約束を見る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>実体は同じ、約束が違う</h4>
          <p>ランダム文字列そのものに意味はない。何を証明する約束かで、まったく別のものになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>速さと取り消しやすさは表裏</h4>
          <p>記録を引かないから速く、記録がないから消せない。短い期限と失効リストで埋め合わせる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>置き場所で脅威が入れ替わる</h4>
          <p>CookieならCSRF、localStorageならXSS。安全な置き場所ではなく、引き受ける攻撃を選んでいる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/token" />
    </DocsPage>
  );
}
