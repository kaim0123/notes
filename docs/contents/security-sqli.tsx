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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SQLインジェクション対策",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>SQLインジェクション対策</h1>
        <Lead>
          <Link href="/security/injection">インジェクション攻撃の基本形</Link>で見た「データが命令として実行されてしまう」問題を、データベースへの命令(SQL)で起こすのが<Term>SQLインジェクション(SQLi)</Term>です。入力欄に仕込まれた文字列によって、想定していたSQL文の意味そのものが書き換えられてしまいます。テーブルや行・列といったDBの基本構造は「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で扱っています。
        </Lead>
      </Hero>

      <Heading num="01">なぜ文字列の組み立てが危険なのか</Heading>
      <p>ログインフォームで、入力されたユーザー名を使って次のようにSQL文を組み立てているとします。</p>

      <table>
        <thead>
          <tr><th></th><th>コード</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">危険な組み立て方</td><td><code>{'"SELECT * FROM users WHERE name = \'" + input + "\'"'}</code></td></tr>
          <tr><td className="hl">安全な組み立て方(プレースホルダ)</td><td><code>SELECT * FROM users WHERE name = ?</code>(<code>input</code>は値として別途バインド)</td></tr>
        </tbody>
      </table>

      <p>危険な組み立て方では、<code>input</code>が単なる文字列としてSQL文の中にそのまま埋め込まれます。もし<code>input</code>として<code>{"' OR '1'='1"}</code>のような文字列が送られると、組み立てられるSQL文は次のようになります。</p>

      <Diagram caption="1つのクォート文字が、SQL文の「条件」そのものを書き換えてしまう例">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={35} fill="#f2f2f2" fontSize="14" fontFamily="monospace">SELECT * FROM users WHERE name = &apos;&apos; OR &apos;1&apos;=&apos;1&apos;</text>
          <text x={20} y={65} fill="#9a9a9a" fontSize="12">↑ この時点で「name = 空文字」という条件に「1=1(常に真)」がORで追加されている</text>
          <text x={20} y={90} fill="#ff8080" fontSize="12">結果:全ユーザーの行がヒットしてしまい、名前を知らなくても認証をすり抜けられる</text>
        </svg>
      </Diagram>

      <p>本来ユーザーが入力できるのは「名前という<strong>値</strong>」だけのはずが、文字列をそのまま連結する組み立て方では、SQLにとって特別な意味を持つクォート(<code>&apos;</code>)や<code>OR</code>のようなキーワードまでもが「命令の一部」として解釈されてしまいます。これが、名前を知らなくてもログインをすり抜けられてしまう典型的なSQLインジェクションです。</p>

      <Analogy label="💡 たとえるなら">
        <Term>プレースホルダ(パラメータ化クエリ)</Term>は「あらかじめ決まった形の申込用紙に、名前欄には名前だけを書いてもらう」ようなものです。名前欄に何を書かれても、それは常に「名前という1つの値」としてしか扱われません。一方、文字列を連結する組み立て方は「白紙の便箋に、申込内容も含めて自由に書いてもらう」ようなもの。相手が便箋の途中に「以降は取り消し線として扱ってください」と書き加えれば、用紙のルールごと書き換えられてしまいます。
      </Analogy>

      <Heading num="02">対策の優先順位</Heading>
      <p>SQLインジェクション対策は、次の7つを優先度の高い順に積み重ねて考えます。</p>

      <Steps>
        <li><strong>① プレースホルダによるSQL文組み立て</strong>値をSQL文の外側で受け渡す仕組みを使い、そもそも値がSQL命令として解釈される余地をなくす。最優先の対策</li>
        <li><strong>② PDO利用時の設定</strong><code>EMULATE_PREPARES=false</code>にしてDB側の本物のプレースホルダ機能を使う。エラーは例外として扱い、1回の呼び出しで複数のSQL文をまとめて実行する「複文(スタック)実行」は禁止する</li>
        <li><strong>③ 動的な列名・ORDER BYはホワイトリスト</strong>列名や並び順はプレースホルダに値として渡せないため、あらかじめ許可した候補の中からだけ選ばせる</li>
        <li><strong>④ LIKE検索のワイルドカードエスケープ</strong><code>%</code>や<code>_</code>はLIKE検索で特別な意味を持つため、検索語自体にこれらの文字が含まれる場合はエスケープする</li>
        <li><strong>⑤ 詳細なエラーメッセージを画面に出さない</strong>SQL文やテーブル構造が漏れるようなエラー表示は、攻撃のヒントを与えてしまう</li>
        <li><strong>⑥ 入力値の妥当性検証</strong>前ページで扱った入力検証を、ここでも重ねて行う</li>
        <li><strong>⑦ DBユーザーの最小権限</strong>アプリが使うDBアカウントには、そのアプリに必要な操作(例: SELECTやINSERT)だけを許可し、テーブル削除など不要な強い権限は与えない</li>
      </Steps>

      <Aside label="補足">
        ③のように列名やORDER BYを動的に扱いたい場合、プレースホルダは「値」しか受け渡せないため使えません。この場合は、アプリのコード側で「許可された列名のリスト」を用意しておき、リストに含まれるものだけを組み立てに使う<strong>ホワイトリスト方式</strong>で対応します。
      </Aside>

      <Heading num="03">「最小権限」は最後の砦</Heading>
      <p>⑦のDBユーザーの最小権限は、他の対策がすべて突破された場合の<strong>最後の砦</strong>にあたります。万が一SQLインジェクションを許してしまっても、そのアプリが使うDBアカウントにテーブル削除やスキーマ変更の権限が無ければ、被害を「情報の閲覧」程度に抑えられる可能性があります。これも<Link href="/security">セキュリティ</Link>の最初のページで触れた多層防御の考え方そのものです。</p>

      <Heading num="まとめ">なぜプレースホルダが最優先なのか</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>入口を塞ぐ対策だから</h4><p>値を命令から完全に分離するため、エスケープ漏れのようなヒューマンエラーが起きる余地自体をなくせます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>他の対策は保険</h4><p>エラー非表示・入力検証・最小権限は、プレースホルダをすり抜けた場合の被害を抑える二の矢・三の矢です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>根っこはインジェクションと同じ</h4><p>「データのつもりが命令として実行される」という<Link href="/security/injection">共通の構造</Link>は、XSSと変わりません。</p></Card>
      </CardGrid>
      <p>ここまではブラウザとサーバーの間で完結する話でしたが、次のページ「<Link href="/security/csrf">CSRF対策</Link>」では、ログイン中の利用者に、本人が意図しない操作を第三者のサイト経由で実行させてしまう攻撃を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/injection" tag="セキュリティ">インジェクション攻撃の基本形</RelatedLink>
                    <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
                    <RelatedLink href="/database/sql" tag="データベース">SQLとデータ操作</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
