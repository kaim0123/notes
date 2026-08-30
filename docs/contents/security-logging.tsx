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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ログ出力設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>ログ出力設計 ― 後から気づき、後から調べるための記録</h1>
        <Lead>
          ここまで見てきた入力検証・XSS対策・SQLインジェクション対策・CSRF対策・セッション管理・認証・認可・キャッシュ制御は、すべて「攻撃を未然に防ぐ」ための対策でした。しかし、どれだけ対策を積み重ねても、攻撃の試みそのものや、想定外の事故をゼロにすることはできません。<Term>ログ</Term>は、その「防ぎきれなかったとき」に気づき、後から調べるための最後の砦です。
        </Lead>
      </Hero>

      <Heading num="01">ログには3つの目的がある</Heading>
      <p>ログを設計するときは、次の3つの目的を意識します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>予兆検知</h4><p>不審なログイン試行やアクセスの急増など、攻撃の兆候にいち早く気づく</p></Card>
        <Card><CardNumber>2</CardNumber><h4>事後調査</h4><p>実際に事故が起きたとき、「いつ・誰が・何をしたか」を後から追跡する</p></Card>
        <Card><CardNumber>3</CardNumber><h4>運用監査</h4><p>規定どおりに運用されているかを、後から第三者が確認できるようにする</p></Card>
      </CardGrid>
      <p>この3つの目的を意識せずに「とりあえず全部出しておく」ログを書いてしまうと、いざというときに肝心な情報が抜けていたり、逆にノイズが多すぎて必要な情報を見つけられなかったりします。</p>

      <Analogy label="💡 たとえるなら">
        ログは「防犯カメラの録画」のようなものです。普段は誰も見ていなくても、不審な人物がうろついていれば警備員が気づくきっかけになり(予兆検知)、実際に何か起きた後には録画を巻き戻して犯人や経緯を特定でき(事後調査)、定期的に「ちゃんと運用されているか」の確認にも使えます(運用監査)。
      </Analogy>

      <Heading num="02">何を記録するか</Heading>
      <p>ログインやログアウト、パスワード変更などのアカウント関連操作、重要な個人情報の参照、データの変更・削除といった重要な操作は、必ずログに残します。「見られただけで実害がなさそうだから」という理由で参照ログを省略してしまうと、情報漏洩が起きたときに「いつ・誰が見たか」を後から特定できなくなってしまいます。</p>

      <Heading num="03">項目を揃える ― 「いつ・どこから・誰が・何に・何をして・どうなったか」</Heading>
      <p>ログの記録項目は、毎回バラバラにするのではなく<strong>日時・IP・ユーザー・対象・操作・結果</strong>という項目を一貫して揃えます。この6つが揃っていれば「いつ・どこから・誰が・何に対して・何をして・どうなったか」という6何原則的な問いに、後からすぐ答えられます。</p>

      <table>
        <thead>
          <tr><th>日時</th><th>IP</th><th>ユーザー</th><th>対象</th><th>操作</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">2026-07-05 21:14:03</td>
            <td>203.0.113.10</td>
            <td>user_1029</td>
            <td>/login</td>
            <td>ログイン試行</td>
            <td>失敗(パスワード不一致)</td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">秘密情報はログに書かない</Heading>
      <p>パスワードやセッショントークン、クレジットカード番号のような秘密情報は、絶対にログへ書き出してはいけません。これまでのページで、パスワードは専用のハッシュ関数で保存する、セッションIDはCookieだけに載せてHttpOnlyで保護する、といった対策を積み重ねてきましたが、もしその同じ値をログに平文で書き出してしまえば、ログ自体が漏洩したときに、それまでの対策が一気に無意味になってしまいます。「守ってきたものを、ログで台無しにしない」という意識が大切です。</p>

      <Aside label="注意">
        デバッグ目的で一時的にリクエストの中身を丸ごとログへ出力する実装は、本番環境に残したままにしないよう特に注意が必要です。フォームの入力値をそのままログに出す設定になっていると、意図せずパスワード欄の値まで記録してしまうことがあります。
      </Aside>

      <Heading num="05">ログ自体も保護する</Heading>
      <p>ログは「攻撃者にとって都合の悪い記録」でもあるため、改ざん・削除・漏洩から保護する必要があります。ログファイルへの書き込み・閲覧・削除の権限を必要最小限の担当者だけに絞り、可能であればログの転送先(保管場所)をアプリケーションサーバー本体とは分離しておくと、仮にサーバーが乗っ取られてもログまでは消されにくくなります。</p>

      <Heading num="06">保管期間・時刻同期・ログレベル</Heading>
      <p>ログはただ残せばよいわけではなく、運用面でも整えるべき点があります。</p>
      <Steps>
        <li><strong>保管期間</strong>社内規定や、想定される調査に耐えられるだけの十分な期間を決めて保管する</li>
        <li><strong>時刻同期</strong>複数のサーバーが動いている場合、サーバー間で時刻がずれているとログを突き合わせて事後調査するときに順序が混乱するため、時刻をきちんと同期し、タイムゾーンも明確にしておく</li>
        <li><strong>ログレベルの使い分け</strong>開発中に便利なdebug/traceレベルの詳細なログは、本番環境ではノイズになり性能にも影響するため出力しないよう切り替える</li>
      </Steps>

      <Heading num="まとめ">ログ設計の8つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3つの目的を意識する</h4><p>予兆検知・事後調査・運用監査、それぞれのためにログを設計します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>重要操作は必ず記録</h4><p>ログイン・アカウント変更・重要情報の参照や操作は漏らさず残します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>項目を揃える</h4><p>日時・IP・ユーザー・対象・操作・結果を一貫したフォーマットで記録します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>秘密情報は書かない</h4><p>パスワードやトークンをログに残すと、それまでの対策が無意味になります。</p></Card>
      </CardGrid>
      <p>ここまでで、入力を汚染する攻撃(インジェクション・XSS・SQLインジェクション)から、ログイン状態を乗っ取る攻撃(CSRF・セッション)、誰が・何をしてよいかの判定(認証・認可)、周辺の運用観点(キャッシュ・ログ)までを一通り見てきました。これは<Link href="/security">セキュリティの一覧ページ</Link>で紹介した多層防御の図のうち、主に開発者がコードで直接手を動かせる「アプリケーション層」と「セッション層」を掘り下げたものです。残るページでは、ここまで繰り返し登場した「<Link href="/security/session-cookie">セッション・Cookie</Link>」「<Link href="/security/token">トークン</Link>」という言葉自体を、文脈ごとの意味の違いという観点から整理します。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御</RelatedLink>
                    <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
                    <RelatedLink href="/security/session-cookie" tag="セキュリティ">セッション・Cookieの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
