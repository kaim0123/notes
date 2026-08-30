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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "XSSと出力エスケープ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>XSS(クロスサイトスクリプティング)と出力エスケープ</h1>
        <Lead>
          前のページ「<Link href="/security/injection">インジェクション攻撃の基本形</Link>」で見た「データが命令として実行される」問題を、HTMLの世界で起こすのが<Term>XSS(クロスサイトスクリプティング)</Term>です。攻撃者が仕込んだJavaScriptが、他の利用者のブラウザの中で、その利用者本人になりすまして動いてしまいます。
        </Lead>
      </Hero>

      <Heading num="01">XSSとは何が起きているのか</Heading>
      <p>掲示板のコメント欄やプロフィール欄のように、ユーザーが入力した文字列をそのままページに表示する機能があるとします。ここで入力チェックが甘いと、攻撃者は普通の文章の代わりに<code>&lt;script&gt;...&lt;/script&gt;</code>のようなJavaScriptを含む文字列を送り込めます。もしアプリがこれをそのままHTMLとして出力してしまうと、そのページを開いた人のブラウザ上で、攻撃者の書いたスクリプトがまるでサイト自身のコードであるかのように実行されてしまいます。</p>

      <Heading num="02">反射型XSSと持続型XSS</Heading>
      <p>XSSは、悪意あるスクリプトがどこを経由してくるかによって、大きく2種類に分けられます。</p>

      <table>
        <thead>
          <tr><th>種類</th><th>経路</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">反射型XSS</td><td>URLの検索クエリなど、リクエストの中身がそのままレスポンスに反映される</td><td>攻撃者が用意した「仕込み済みのリンク」を被害者にクリックさせる必要がある</td></tr>
          <tr><td className="hl">持続型XSS</td><td>コメント欄やプロフィール欄など、一度データベースに保存されてから表示される</td><td>特別なリンクを踏ませなくても、そのページを見た全員が被害を受ける。より危険度が高い</td></tr>
        </tbody>
      </table>

      <p>持続型XSSがさらに悪質化すると、「感染したページを見た人が、自分の投稿やプロフィールにも同じスクリプトを埋め込まされ、それを見た次の人にも感染が広がっていく」という自己増殖が起こることがあります。これを<Term>XSSワーム</Term>と呼びます。</p>

      <Diagram caption="持続型XSSの流れ:投稿 → 保存 → 表示のたびに実行 → Cookie窃取">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={20} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={80} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">攻撃者</text>
          <text x={80} y={58} fill="#9a9a9a" fontSize="11" textAnchor="middle">script入りコメント投稿</text>

          <rect x={250} y={20} width={140} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">データベース</text>
          <text x={320} y={58} fill="#9a9a9a" fontSize="11" textAnchor="middle">コメントとして保存</text>

          <rect x={490} y={20} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={560} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">被害者</text>
          <text x={560} y={58} fill="#9a9a9a" fontSize="11" textAnchor="middle">ページを開く</text>

          <line x1={150} y1={45} x2={248} y2={45} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <line x1={390} y1={45} x2={488} y2={45} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <rect x={250} y={130} width={140} height={50} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={320} y={150} fill="#f2f2f2" fontSize="13" textAnchor="middle">被害者のブラウザ</text>
          <text x={320} y={168} fill="#9a9a9a" fontSize="11" textAnchor="middle">scriptが実行される</text>

          <line x1={560} y1={70} x2={560} y2={110} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={560} y1={110} x2={392} y2={155} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <rect x={10} y={130} width={140} height={50} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={80} y={150} fill="#f2f2f2" fontSize="13" textAnchor="middle">攻撃者のサーバー</text>
          <text x={80} y={168} fill="#9a9a9a" fontSize="11" textAnchor="middle">盗んだCookieを受信</text>

          <line x1={250} y1={155} x2={152} y2={155} stroke="#ff4d4d" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <text x={200} y={200} fill="#ff8080" fontSize="11" textAnchor="middle">document.cookieを外部に送信</text>

          <defs>
            <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
          <text x={320} y={240} fill="#9a9a9a" fontSize="11" textAnchor="middle">持続型XSS: 1回の投稿が、その後訪れる全ての利用者に影響する</text>
        </svg>
      </Diagram>

      <Heading num="03">本当に狙われるもの ― Cookie(セッションID)の窃取</Heading>
      <p>ブラウザのJavaScriptは、そのページのCookieを<code>document.cookie</code>というコードで読み取ることができます。もしログイン状態を管理するセッションIDがCookieに入っていて、そこにJavaScriptからアクセスできてしまう設定になっていると、攻撃者は注入したスクリプトで<code>document.cookie</code>を読み取り、こっそり自分のサーバーへ送信できてしまいます。セッションIDを盗まれるということは、パスワードを知らなくても、そのユーザー本人になりすませてしまうということです。</p>

      <Analogy label="💡 たとえるなら">
        XSSは「掲示板の張り紙(コメント欄)に、こっそりスパイの指令書を紛れ込ませる」ようなものです。何も知らずにその張り紙を読んだ人(被害者のブラウザ)は、指令書に書かれた通りに動いてしまい、自分の身分証(Cookie・セッションID)をスパイの元締め(攻撃者のサーバー)にこっそり届けてしまいます。
      </Analogy>

      <Heading num="04">5つの層で防ぐ ― 出力エスケープを中心に</Heading>
      <p>XSS対策は、次の5つを組み合わせた多層防御で考えます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>出力時のHTMLエスケープ</h4><p>ユーザーが入力した文字列を画面に表示する直前に、HTMLとして特別な意味を持つ文字を無害化する</p></Card>
        <Card><CardNumber>2</CardNumber><h4>テンプレートエンジンの自動エスケープ</h4><p>React・Vueなどは変数の埋め込み時にデフォルトでエスケープしてくれるため、それを無効化する書き方を避ける</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Content-Security-Policy(CSP)</h4><p>「このページで実行してよいスクリプトの出所」をブラウザに指示し、想定外のスクリプト実行を抑え込む</p></Card>
        <Card><CardNumber>4</CardNumber><h4>入力値検証</h4><p>前ページで扱った入力段階の検証を、出力エスケープの手前でも重ねて行う</p></Card>
        <Card><CardNumber>5</CardNumber><h4>CookieにHttpOnly+Secure+SameSite</h4><p>万一スクリプトが実行されても、Cookie自体を読み取れないようにしておく</p></Card>
      </CardGrid>

      <p>ここで大原則になるのが、「<strong>エスケープは入力時ではなく出力時に行う</strong>」という考え方です。入力された時点でエスケープしてしまうと、そのデータをHTMLとして表示する場合・JavaScript変数として使う場合・URLの一部として使う場合など、用途ごとに必要な形が異なるため対応しきれません。データはそのまま保存しておき、実際に画面へ出力する直前に、その出力先に応じたエスケープをかけるのが安全です。</p>

      <h3>出力先によってエスケープ対象は変わる</h3>
      <table>
        <thead>
          <tr><th>出力先</th><th>エスケープの種類</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">HTML本文の中</td><td>HTMLエスケープ(<code>&lt;</code> <code>&gt;</code> <code>&amp;</code> などを置き換える)</td></tr>
          <tr><td className="hl">HTML属性の値の中</td><td>HTML属性エスケープ(クォート文字などを置き換える)</td></tr>
          <tr><td className="hl">JavaScriptの文字列リテラルの中</td><td>JavaScriptエスケープ</td></tr>
          <tr><td className="hl">URLのクエリ部分</td><td>URLエンコード</td></tr>
        </tbody>
      </table>

      <Aside label="補足">
        ReactやVueのようなモダンなフレームワークは、<code>{"{変数}"}</code>のような通常のテンプレート構文で値を埋め込むと、既定でHTMLエスケープを行ってくれます。危険なのは、それを迂回する特別な書き方(生のHTMLを挿入するAPIなど)を意図的に使う場合です。
      </Aside>

      <Heading num="05">HttpOnly属性 ― 最後の砦、ただし万能ではない</Heading>
      <p>CookieにJavaScriptからアクセスできないようにする設定が<Term>HttpOnly属性</Term>です。これを付けておけば、たとえXSSでスクリプトが実行されてしまっても、<code>document.cookie</code>でそのCookieを読み取ることはできなくなります。</p>
      <p>ただし、HttpOnlyには注意点があります。守れるのは<strong>Cookieに入れた情報だけ</strong>で、たとえば<code>localStorage</code>に保存した認証トークンはHttpOnlyの対象外なので、XSSが起きれば普通に読み取られてしまいます。また、HttpOnlyはあくまで「Cookieを盗まれても被害を限定する」ための保険であり、XSSの根本原因(悪意あるスクリプトが実行されてしまうこと自体)を解決するものではありません。そのため、必ずHTMLエスケープなどの根本対策と併用します。</p>

      <Heading num="06">エンコーディングを揃えることもXSS対策の一部</Heading>
      <p>意外と見落とされがちですが、文字エンコーディングの扱いもXSS対策と関係しています。HTTPレスポンスヘッダで<code>Content-Type: text/html; charset=UTF-8</code>のように文字エンコーディングを明示せず、ブラウザ側の推測に任せてしまうと、特殊なエンコーディングを利用したエスケープ回避のテクニックにつけ込まれる余地が生まれます。入力・データベース・出力まで、アプリ全体を<strong>UTF-8に統一</strong>し、レスポンスヘッダで<code>charset=UTF-8</code>を必ず指定しておくのが安全です。なお、かつて使われていた<code>X-XSS-Protection</code>ヘッダはブラウザ側の簡易フィルタを有効にするものでしたが、現在の主要ブラウザではすでに廃止されており、CSPが実質的な後継として使われています。</p>

      <Heading num="まとめ">「出力の直前に、出力先に応じてエスケープする」</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>反射型と持続型</h4><p>持続型はデータベース経由で全利用者に影響するため、より優先して対策すべき対象です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>本丸は出力エスケープ</h4><p>入力検証・CSP・Cookie属性は補助線であり、出力時のエスケープが最も直接的な対策です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>HttpOnlyは保険であって根本解決ではない</h4><p>Cookie以外の情報(localStorageなど)は守れないため、必ずエスケープと組み合わせます。</p></Card>
      </CardGrid>
      <p>XSSと同じ「インジェクションの型」を、今度はデータベースへの命令という形で悪用するのが「<Link href="/security/sqli">SQLインジェクション</Link>」です。次のページで見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/injection" tag="セキュリティ">インジェクション攻撃の基本形</RelatedLink>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
