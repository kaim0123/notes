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

export const metadata: Metadata = { title: "XSSと出力エスケープ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>XSSと出力エスケープ ― 他人のブラウザで、他人として動く</h1>
        <Lead>
          <Link href="/security/injection">インジェクション攻撃</Link>の型が、HTMLの世界で起きたものが<Term>XSS(クロスサイトスクリプティング)</Term>です。攻撃者が仕込んだJavaScriptが、<strong>被害者のブラウザの中で、そのサイト自身のコードとして動く</strong>。同一オリジンの中で動く以上、そのページでできることはすべてできてしまいます。
        </Lead>
      </Hero>

      <Heading num="01">2つの経路 ― 反射型と持続型</Heading>
      <p>
        利用者の入力をそのまま画面に出す機能があると、攻撃者は文章の代わりにスクリプトを含む文字列を送り込めます。それがどこを経由して被害者に届くかで、大きく2種類に分かれます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>経路</th><th>成立に必要なこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">反射型</td><td>URLの検索クエリなど、リクエストの中身がそのまま応答に現れる</td><td>攻撃者が仕込んだリンクを踏ませる必要がある</td></tr>
          <tr><td className="hl">持続型</td><td>コメント欄やプロフィールなど、いったん保存されてから表示される</td><td>何も要らない。そのページを開いた全員が対象になる</td></tr>
          <tr><td className="hl">DOM型</td><td>サーバーを経由せず、ページ内のJavaScriptがURLなどを読んで書き出す</td><td>サーバー側のログには痕跡が残らない</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="security-xss-stored"
        aspect="760 / 300"
        caption="持続型XSSの流れ。攻撃者がスクリプト入りのコメントを投稿すると、そのままデータベースに保存され、以降そのページを開いた閲覧者のブラウザでサイト自身のコードとして実行される。実行されたスクリプトはCookieを読み取って攻撃者のサーバーへ送る。1回の投稿がそのページを開いた全員に効き続けるため、反射型より優先度が高い。"
      />

      <p>
        持続型がさらに悪化すると、<Term>XSSワーム</Term>になります。感染したページを見た人が、自分の投稿にも同じスクリプトを埋め込まされ、それを見た次の人へ広がる ― かつてSNSで実際に起きた形です。
      </p>

      <Heading num="02">狙われるのはCookie、そして操作そのもの</Heading>
      <p>
        注入されたスクリプトが最初にやるのは、多くの場合<code>document.cookie</code>の読み取りです。ログイン状態を示すセッションIDがそこにあり、JavaScriptから読める設定になっていれば、攻撃者のサーバーへ送るだけで<strong>パスワードを知らずに本人になりすませます</strong>。
      </p>
      <p>
        ただし被害はCookieの窃取だけではありません。スクリプトはそのページでできることを何でもできるので、<Term>盗まずに、その場で操作する</Term>ほうがむしろ簡単です ― 画面に偽のログインフォームを描く、利用者に代わって設定変更のリクエストを送る、表示内容を差し替える。Cookieに<code>HttpOnly</code>を付けても、これらは止まりません。
      </p>

      <Analogy label="💡 たとえるなら">
        掲示板の張り紙に、スパイの指令書を紛れ込ませるようなものです。読んだ人(ブラウザ)は、それが掲示板の一部だと信じて書かれたとおりに動きます。身分証を届けさせる(Cookieを送らせる)こともできますし、その場で本人に手続きをさせる(操作を実行させる)こともできます。
      </Analogy>

      <Heading num="03">本丸は出力エスケープ ― 行き先ごとに変わる</Heading>
      <p>
        対策の中心は<Term>出力エスケープ</Term>です。表示する直前に、その出力先で特別な意味を持つ文字を、意味を持たない表現へ置き換えます。ここで大事なのは、<strong>何を置き換えるべきかは出力先によって変わる</strong>ことです。
      </p>

      <DiagramFrame
        slug="security-xss-contexts"
        aspect="760 / 320"
        caption="同じ1つの値でも、出力先によって必要なエスケープが変わる。HTML本文なら山括弧やアンパサンド、HTML属性の値ならクォート文字も、JavaScriptの文字列リテラルならバックスラッシュや改行、URLのクエリならパーセントエンコードが対象になる。危険な記号は行き先ごとに違うため、保存時に一律で変換しておく方式では、どこかで必ず合わなくなる。"
      />

      <Heading num="04">なぜ入力時ではなく、出力時なのか</Heading>
      <p>
        「受け取った時点で変換しておけば安全では」と考えたくなりますが、これは早い段階で行き詰まります。
      </p>

      <DiagramFrame
        slug="security-xss-escape-timing"
        aspect="760 / 300"
        caption="入力時にエスケープする方式と、出力時にエスケープする方式の比較。入力時に変換すると、データベースにはHTML向けに加工された値が入り、メールやCSV、APIの応答など別の行き先では二重変換や文字化けを起こす。出力時に変換する方式は、保存するのは受け取ったままの値で、画面へ出す直前に行き先へ合わせて変換するため、表示先が増えても対応できる。"
      />

      <p>
        原則はひとことで言えます ― <strong>保存するのは事実、変換するのは表示</strong>。入力時に変換すると、行き先が1つのうちは動きますが、CSVの書き出しやメール通知が増えた日にまとめて壊れます。しかも元の値が加工済みなので、後から正しい形に戻すこともできません。
      </p>

      <Aside label="フレームワークの既定に乗る">
        ReactやVueは、通常のテンプレート構文で値を埋め込むと既定でHTMLエスケープします。つまり<strong>危ないのは、それを迂回する書き方を意図的に使ったとき</strong>だけです。生のHTMLを挿入するAPIを使う箇所は数えられるほどしかないはずなので、そこだけを重点的に見る ― という形にできると、レビューの負担がはっきり下がります。
      </Aside>

      <Heading num="05">重ねる ― CSP・Cookie属性・文字コード</Heading>
      <p>
        エスケープを土台にしたうえで、漏れたときのための層を重ねます。
      </p>

      <table>
        <thead>
          <tr><th>手立て</th><th>何を減らすか</th><th>限界</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CSP</td><td>許可していない出所のスクリプト実行を、ブラウザが拒否する</td><td>設定が厳しすぎると自分のサイトが壊れる</td></tr>
          <tr><td className="hl">HttpOnly</td><td>CookieをJavaScriptから読めなくする</td><td><code>localStorage</code>の値は守れない。操作の実行も止まらない</td></tr>
          <tr><td className="hl">文字コードの統一</td><td>エンコーディングの推測につけ込む回避手法を封じる</td><td>入力・保存・出力をすべてUTF-8で揃える必要がある</td></tr>
        </tbody>
      </table>

      <p>
        <Term>CSP</Term>の設定は<Link href="/security/headers">セキュリティヘッダ</Link>で扱います。<code>HttpOnly</code>を含むCookieの属性は<Link href="/security/session">セッションとCookie</Link>が担当です。なお、かつて使われた<code>X-XSS-Protection</code>ヘッダは主要ブラウザで廃止済みで、実質的な後継はCSPになります。
      </p>

      <Heading num="まとめ">出力の直前に、行き先に合わせて</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>持続型が優先</h4>
          <p>リンクを踏ませる必要がなく、そのページを開いた全員に効き続ける。反射型より先に潰す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>変換は出力時に</h4>
          <p>保存するのは事実、変換するのは表示。入力時に変換すると、行き先が増えた日にまとめて壊れる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>HttpOnlyは保険</h4>
          <p>Cookieの窃取は止まるが、その場で操作する攻撃は止まらない。根本対策の代わりにはならない。</p>
        </Card>
      </CardGrid>

      <p>
        XSSが「ページの中で動かす」攻撃なら、次に見る<Link href="/security/csrf">CSRF対策</Link>は、まったく別のサイトから、ブラウザの仕様だけを使って操作させる攻撃です。
      </p>

      <DocsFooter href="/security/xss" />
    </DocsPage>
  );
}
