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

export const metadata: Metadata = { title: "セキュリティヘッダ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティヘッダ ― 配信の入口で守る</h1>
        <Lead>
          アプリのコードを1行も変えずに、レスポンスへ数行の<Term>ヘッダ</Term>を足すだけで、<Link href="/security/xss">XSS</Link>やクリックジャッキングの被害を大きく減らせます。ここまでの対策が「アプリの中で正しく処理する」ものだったのに対し、セキュリティヘッダは<strong>ブラウザに「このページはこう扱ってほしい」と指示する</strong>防御です。効かせる相手が違うので、重ねる意味があります。
        </Lead>
      </Hero>

      <Heading num="01">なぜ配信レイヤーに書くのか</Heading>
      <p>
        ヘッダはリクエストごとにレスポンスへ差し込む必要があります。動作するサーバーがあればアプリのコードで付けられますが、<Term>静的サイト</Term> ― あらかじめHTMLやJSに書き出してファイルを配るだけの構成 ― には、リクエストを処理する自前のコードがありません。差し込めるのは、そのファイルを配っている層です。
      </p>

      <DiagramFrame
        slug="security-headers-where"
        aspect="760 / 280"
        caption="静的サイトでセキュリティヘッダを付ける場所。ビルドで書き出されたファイルにはリクエストを処理するコードが無いため、ヘッダを差し込めるのは配信しているホスティングやCDNの層になる。ブラウザは受け取ったヘッダに従って振る舞う。静的エクスポートの構成では、フレームワーク側の設定ファイルに書いたヘッダ定義は動作するサーバーが無いため無視される。"
      />

      <Analogy label="💡 たとえるなら">
        静的サイトは、印刷済みのチラシを封筒に入れて配るようなものです。チラシ(HTML)の中身はもう変えられませんが、封筒の表面(HTTPヘッダ)に「取扱注意」のスタンプを押すことはできます。押すのはチラシを書いた人ではなく、封筒を配る側の仕事です。
      </Analogy>

      <Aside label="このサイトの構成での注意">
        Next.jsには設定ファイルで<code>headers()</code>を定義する仕組みがありますが、これは動作するサーバーがある構成で効くものです。静的HTMLに書き出す構成ではその定義は無視されるため、<strong>ヘッダは必ず配信先(Vercel・Netlify・CloudFrontなど)側に書きます</strong>。書いたのに効いていない、という失敗がいちばん多い場所です。
      </Aside>

      <Heading num="02">まず入れておきたい5つ</Heading>
      <table>
        <thead>
          <tr><th>ヘッダ</th><th>防ぐもの</th><th>ブラウザへの指示</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Content-Security-Policy</td><td>XSS・不正なスクリプト読み込み</td><td>読み込んで実行してよい出所を制限する</td></tr>
          <tr><td className="hl">Strict-Transport-Security</td><td>平文通信での盗み見・改ざん</td><td>今後このサイトへは必ずHTTPSで来る</td></tr>
          <tr><td className="hl">X-Frame-Options</td><td>クリックジャッキング</td><td>このページを他サイトの枠内に埋め込ませない</td></tr>
          <tr><td className="hl">X-Content-Type-Options</td><td>MIMEタイプの推測誤り</td><td>種類を推測せず、宣言どおりに扱う</td></tr>
          <tr><td className="hl">Referrer-Policy</td><td>URL経由の情報漏れ</td><td>他サイトへ遷移するとき、参照元をどこまで送るか</td></tr>
        </tbody>
      </table>

      <p>
        3番目の<Term>クリックジャッキング</Term>だけ補足します。攻撃者が自分のページに標的サイトを透明な枠で重ね、見えているボタンを押させることで、実際には裏の標的サイトのボタンを押させる手口です。埋め込みを拒否すれば成立しません。<code>X-Frame-Options</code>とCSPの<code>frame-ancestors</code>のどちらでも指定でき、新しいブラウザでは後者が優先されますが、<strong>両方書いておくと広くカバーできます</strong>。
      </p>

      <p>
        <Term>HSTS</Term>は、一度アクセスしたブラウザに「以後このサイトはHTTPSでしか繋がない」と覚えさせるヘッダです。最初のうっかりHTTP接続で<Link href="/security/attacks">中間者攻撃</Link>を受ける隙を塞ぎます。ただし<strong>HTTPSで配信できている場合にだけ</strong>付けてください ― HTTPしか用意していないサイトに付けると、ブラウザが繋げなくなります。
      </p>

      <Heading num="03">CSP ― いちばん強く、いちばん難しい</Heading>
      <p>
        <Term>Content-Security-Policy(CSP)</Term>は、スクリプトや画像、通信先の<strong>出所</strong>をブラウザに宣言しておく仕組みです。XSSでスクリプトが注入されても、許可していない出所のものは実行されません。
      </p>

      <DiagramFrame
        slug="security-headers-csp"
        aspect="760 / 300"
        caption="CSPがどこで効くか。ブラウザは実行の直前に、宣言された許可リストとスクリプトの出所を突き合わせる。自サイトの出所は許可されているので実行され、注入された外部の出所は拒否される。同じ理由で、許可リストに書き忘れた自分のスクリプトも止まるため、まず報告だけの設定で慣らしてから段階的に締めるのが現実的な進め方になる。"
      />

      <p>
        効きどころと難しさは同じ性質から来ています ― <Term>出所で判断する</Term>ので、エスケープ漏れがあっても外部から読ませる形の攻撃は止まる一方、自分のサイトが使っている外部フォントや解析スクリプトも、書き忘れれば同じように止まります。だから<code>Content-Security-Policy-Report-Only</code>から始めます。これは実際にはブロックせず「もし適用したら何が止まるか」だけを報告するモードで、違反を潰してから本番の指定に切り替えます。
      </p>

      <Heading num="04">どこに書くか</Heading>
      <table>
        <thead>
          <tr><th>配信先</th><th>書く場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Vercel</td><td>プロジェクト直下の<code>vercel.json</code>の<code>headers</code></td></tr>
          <tr><td className="hl">Netlify / Cloudflare Pages</td><td>公開ディレクトリに置く<code>_headers</code>ファイル</td></tr>
          <tr><td className="hl">AWS CloudFront</td><td>レスポンスヘッダポリシーをディストリビューションに割り当てる</td></tr>
          <tr><td className="hl">Nginx / Apache</td><td>設定ファイルの<code>add_header</code> / <code>Header set</code></td></tr>
        </tbody>
      </table>

      <p>
        書き方は違っても、考え方はどれも同じです ― <strong>パスにマッチさせ、キーと値を列挙する</strong>。Vercelでの最小構成は次のようになります。
      </p>

      <pre>
        <code>{`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; frame-ancestors 'none'"
        }
      ]
    }
  ]
}`}</code>
      </pre>

      <p>
        このCSPは最小例です。外部フォントや解析スクリプトを読み込んでいるサイトでは、そのままだと止まります。前節のとおり、報告だけのモードで慣らしてから締めてください。
      </p>

      <Heading num="05">効いているかを確かめる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>開発者ツールで見る</h4>
          <p>Networkタブでトップページの応答を選び、設定した値が並んでいるかを確認する。CSP違反はConsoleに出る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コマンドで確かめる</h4>
          <p><code>curl -I</code>でレスポンスヘッダだけを表示する。CDNのキャッシュ更新に時間がかかることがある。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>診断サービスに通す</h4>
          <p>公開後、ヘッダ構成を採点する外部サービスに通すと、抜けや弱い設定に気づきやすい。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">封筒にスタンプを押す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>書く場所は配信の層</h4>
          <p>静的サイトにはリクエストを処理するコードが無い。ヘッダはホスティング側にしか書けない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>5つで代表的な面を塞ぐ</h4>
          <p>CSP・HSTS・埋め込み拒否・MIME推測禁止・参照元の制限。どれも数行で入る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>もう一枚の壁であって、土台ではない</h4>
          <p>出力エスケープのような根本対策の上に重ねてこそ多層防御になる。設定後は必ず効いているか確認する。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/headers" />
    </DocsPage>
  );
}
