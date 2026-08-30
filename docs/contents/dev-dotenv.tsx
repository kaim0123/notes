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
  title: ".envと.gitignore",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>.envと.gitignore ― 秘密情報を守る</h1>
        <Lead>
          APIキーやデータベースの接続先は、ソースコードに直接書いてはいけません。代わりに<Term>環境変数</Term>として<code>.env</code>ファイルに置き、Gitには載せない ― その仕組みと、<Term>.gitignore</Term>で何を除外すべきかを押さえます。
        </Lead>
      </Hero>

      <p>
        前のページ「<Link href="/dev/environments">環境の全体像</Link>」では、<Term>環境変数</Term>が「プログラムの外から渡す設定値」であることを紹介しました。ここでは、実際にプロジェクトでどう管理するか ― <code>.env</code>ファイルの書き方、<code>.gitignore</code>への登録、Gitにコミットしていいもの・ダメなもの ― を具体的に見ていきます。
      </p>

      <Heading num="01">なぜコードに秘密情報を書いてはいけないか</Heading>
      <p>
        ソースコードは<Term>Git</Term>で履歴付きで共有されます。一度コミットしてGitHubなどに公開(または誤って公開)すると、APIキーやパスワードは<strong>取り消しが非常に困難</strong>になります。履歴から完全に消すには専用の作業が必要で、それでも既にクローンされたリポジトリには残り続けます。
      </p>
      <Analogy label="💡 たとえるなら">
        秘密情報をコードに書くのは、家の鍵を玄関ドアに貼り付けた状態で家の設計図をネット公開するようなものです。設計図(コード)は共有したいが、鍵(秘密情報)だけは別の場所で管理する ― それが環境変数の役割です。
      </Analogy>

      <Heading num="02">.envファイルとは</Heading>
      <p>
        <code>.env</code>は、プロジェクトのルート(最上位フォルダ)に置くテキストファイルで、<strong>名前=値</strong>の形式で環境変数を1行ずつ書きます。Node.jsやNext.jsは起動時にこのファイルを読み込み、プログラムから<code>process.env.変数名</code>で参照できます。
      </p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# .env の例(このファイル自体はGitに載せない)
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
JWT_SECRET=ランダムな長い文字列
OPENAI_API_KEY=sk-xxxxxxxx

# 開発と本番で変わる公開URL
API_BASE_URL=http://localhost:3000`}</code>
      </pre>
      <Aside label="Next.jsのファイル名">
        Next.jsでは用途に応じて複数の<code>.env</code>ファイルを使い分けられます。<code>.env.local</code>はローカル専用(全環境で読み込まれる)、<code>.env.development</code>は開発時のみ、<code>.env.production</code>は本番ビルド時のみ、という具合です。いずれも<strong>秘密情報を含むものはGitに載せません</strong>。
      </Aside>

      <Heading num="03">.envに登録すべき内容</Heading>
      <p>次のような「外に漏れたら困る値」や「環境ごとに変わる設定」は、<code>.env</code>に置きます。</p>
      <table>
        <thead>
          <tr>
            <th>内容</th>
            <th>例</th>
            <th>理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">APIキー</td>
            <td><code>OPENAI_API_KEY</code>、<code>STRIPE_SECRET_KEY</code></td>
            <td>外部サービスへアクセスする秘密情報</td>
          </tr>
          <tr>
            <td className="hl">データベース接続情報</td>
            <td><code>DATABASE_URL</code></td>
            <td>DBの接続先が環境ごとに異なる</td>
          </tr>
          <tr>
            <td className="hl">JWTシークレット</td>
            <td><code>JWT_SECRET</code></td>
            <td>認証に使う秘密鍵</td>
          </tr>
          <tr>
            <td className="hl">セッションキー</td>
            <td><code>SESSION_SECRET</code></td>
            <td>セッション改ざん防止</td>
          </tr>
          <tr>
            <td className="hl">OAuth情報</td>
            <td><code>GOOGLE_CLIENT_SECRET</code></td>
            <td>ログイン認証用</td>
          </tr>
          <tr>
            <td className="hl">SMTP情報</td>
            <td><code>SMTP_USER</code>、<code>SMTP_PASSWORD</code></td>
            <td>メール送信用</td>
          </tr>
          <tr>
            <td className="hl">クラウドアクセスキー</td>
            <td><code>AWS_ACCESS_KEY_ID</code></td>
            <td>AWS等へのアクセス権</td>
          </tr>
          <tr>
            <td className="hl">Supabase Secret Key</td>
            <td><code>SUPABASE_SERVICE_ROLE_KEY</code></td>
            <td>Service Role Keyは絶対非公開</td>
          </tr>
          <tr>
            <td className="hl">LINEチャネルシークレット</td>
            <td><code>LINE_CHANNEL_SECRET</code></td>
            <td>LINE API用</td>
          </tr>
          <tr>
            <td className="hl">本番URL(環境差分)</td>
            <td><code>API_BASE_URL</code></td>
            <td>開発・本番で変わる</td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">コードから環境変数を読む</Heading>
      <p>Node.jsやExpressでは、<code>process.env</code>オブジェクトから値を取り出します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サーバー側のコードでの参照例
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET が設定されていません");
}`}</code>
      </pre>
      <Aside label="Next.jsの NEXT_PUBLIC_">
        Next.jsでは、ブラウザ(クライアント)側のJavaScriptから参照する環境変数には<code>NEXT_PUBLIC_</code>という接頭辞が必要です。例: <code>NEXT_PUBLIC_API_URL</code>。接頭辞のない変数はサーバー側だけで使えます。<strong>接頭辞付きの変数はビルド成果物に埋め込まれる</strong>ため、秘密情報には使えません。
      </Aside>

      <Heading num="05">.env.example ― 中身の雛形だけ共有する</Heading>
      <p>
        チーム開発では「どの環境変数が必要か」を全員が知る必要があります。しかし実際の値(APIキーなど)は共有できません。そこで<strong>値を空欄やダミーにした<code>.env.example</code>だけをGitにコミット</strong>し、新メンバーはそれをコピーして<code>.env</code>や<code>.env.local</code>を自分で作る、というやり方が一般的です。
      </p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# .env.example(これはGitにコミットしてよい)
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=`}</code>
      </pre>
      <Steps>
        <li>リポジトリをクローンする</li>
        <li><code>.env.example</code>を<code>.env.local</code>にコピーする</li>
        <li>各自のAPIキーや接続先を<code>.env.local</code>に記入する</li>
        <li><code>.env.local</code>はGitに載せない(次の節の<code>.gitignore</code>で除外)</li>
      </Steps>

      <Heading num="06">.gitignoreとは</Heading>
      <p>
        <code>.gitignore</code>は、Gitの管理対象から<strong>意図的に除外するファイル・フォルダの一覧</strong>を書くファイルです。ここに書いたパスは<code>git add</code>しても無視され、誤って秘密情報や巨大な生成物をコミットする事故を防げます。
      </p>
      <Analogy label="💡 たとえるなら">
        <code>.gitignore</code>は「この箱の中身は荷物リストに載せないで」という除外リストです。秘密の手紙(<code>.env</code>)や、いつでも買い直せる消耗品(<code>node_modules</code>)をリストに書いておき、共有するのは設計図(ソースコード)だけにします。
      </Analogy>

      <Heading num="07">.gitignoreに登録すべきもの</Heading>
      <table>
        <thead>
          <tr>
            <th>内容</th>
            <th>例</th>
            <th>理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">環境変数ファイル</td>
            <td><code>.env</code> <code>.env.local</code></td>
            <td>秘密情報</td>
          </tr>
          <tr>
            <td className="hl">node_modules</td>
            <td><code>node_modules/</code></td>
            <td><code>npm install</code>で再生成可能</td>
          </tr>
          <tr>
            <td className="hl">ビルド成果物</td>
            <td><code>dist/</code> <code>build/</code></td>
            <td>自動生成される</td>
          </tr>
          <tr>
            <td className="hl">Next.jsビルド</td>
            <td><code>.next/</code></td>
            <td>自動生成</td>
          </tr>
          <tr>
            <td className="hl">キャッシュ</td>
            <td><code>.cache/</code> <code>.turbo/</code></td>
            <td>自動生成</td>
          </tr>
          <tr>
            <td className="hl">ログ</td>
            <td><code>*.log</code></td>
            <td>不要</td>
          </tr>
          <tr>
            <td className="hl">一時ファイル</td>
            <td><code>tmp/</code> <code>temp/</code></td>
            <td>不要</td>
          </tr>
          <tr>
            <td className="hl">IDE設定(個人)</td>
            <td><code>.vscode/</code> ※一部除く</td>
            <td>個人設定</td>
          </tr>
          <tr>
            <td className="hl">JetBrains設定</td>
            <td><code>.idea/</code></td>
            <td>個人設定</td>
          </tr>
          <tr>
            <td className="hl">macOS</td>
            <td><code>.DS_Store</code></td>
            <td>OS生成</td>
          </tr>
          <tr>
            <td className="hl">Windows</td>
            <td><code>Thumbs.db</code></td>
            <td>OS生成</td>
          </tr>
          <tr>
            <td className="hl">テストカバレッジ</td>
            <td><code>coverage/</code></td>
            <td>自動生成</td>
          </tr>
          <tr>
            <td className="hl">SQLite</td>
            <td><code>*.sqlite</code></td>
            <td>開発用DB</td>
          </tr>
          <tr>
            <td className="hl">アップロードファイル</td>
            <td><code>uploads/</code></td>
            <td>容量増加防止</td>
          </tr>
        </tbody>
      </table>
      <Aside label="注意">
        すでにGitで追跡されているファイルに<code>.gitignore</code>を追加しても、<strong>追跡は止まりません</strong>。一度コミットしてしまった秘密情報は、<code>.gitignore</code>に書くだけでは消えません。履歴からの削除と、漏洩したキーの<strong>再発行(ローテーション)</strong>が必要です。
      </Aside>

      <Heading num="08">Gitにコミットしていいもの</Heading>
      <p>逆に、次のようなファイルはチームで共有する前提のものなので、Gitに載せます。</p>
      <table>
        <thead>
          <tr>
            <th>内容</th>
            <th>例</th>
            <th>理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ソースコード</td>
            <td><code>src/</code></td>
            <td>開発対象</td>
          </tr>
          <tr>
            <td className="hl">package.json</td>
            <td><code>package.json</code></td>
            <td>依存関係</td>
          </tr>
          <tr>
            <td className="hl">package-lock.json</td>
            <td><code>package-lock.json</code></td>
            <td>バージョン固定</td>
          </tr>
          <tr>
            <td className="hl">tsconfig</td>
            <td><code>tsconfig.json</code></td>
            <td>TypeScript設定</td>
          </tr>
          <tr>
            <td className="hl">ESLint設定</td>
            <td><code>eslint.config.js</code></td>
            <td>チーム共通</td>
          </tr>
          <tr>
            <td className="hl">Prettier設定</td>
            <td><code>.prettierrc</code></td>
            <td>チーム共通</td>
          </tr>
          <tr>
            <td className="hl">Next.js設定</td>
            <td><code>next.config.ts</code></td>
            <td>プロジェクト設定</td>
          </tr>
          <tr>
            <td className="hl">環境変数の雛形</td>
            <td><code>.env.example</code></td>
            <td>必要な変数名だけ共有(値は空)</td>
          </tr>
          <tr>
            <td className="hl">README</td>
            <td><code>README.md</code></td>
            <td>ドキュメント</td>
          </tr>
          <tr>
            <td className="hl">Dockerfile</td>
            <td><code>Dockerfile</code></td>
            <td>環境構築</td>
          </tr>
          <tr>
            <td className="hl">GitHub Actions</td>
            <td><code>.github/workflows/</code></td>
            <td>CI/CD</td>
          </tr>
          <tr>
            <td className="hl">.gitignore</td>
            <td><code>.gitignore</code></td>
            <td>除外ルール自体は共有する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="09">本番環境ではどう渡すか</Heading>
      <p>
        ローカルでは<code>.env</code>ファイルで十分ですが、本番サーバーやVercel・AWSなどのホスティングでは、<strong>管理画面やCLIから環境変数を設定</strong>します。ファイルをサーバーに置くのではなく、プラットフォームの「Environment Variables」設定に同じ名前・値を登録するイメージです。詳細は各クラウドの章で扱います。
      </p>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>秘密は .env に</h4>
          <p>APIキー・DB接続・JWTシークレットなどはコードではなく環境変数で管理します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>.env は Git に載せない</h4>
          <p><code>.gitignore</code>で除外し、必要な変数名だけ<code>.env.example</code>で共有します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>生成物も除外する</h4>
          <p><code>node_modules</code>や<code>.next/</code>は再生成できるので、リポジトリには含めません。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/environments" tag="開発">
              環境の全体像
            </RelatedLink>
            <RelatedLink href="/dev/tooling" tag="開発">
              パッケージ管理とビルド
            </RelatedLink>
            <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">
              構成管理
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
