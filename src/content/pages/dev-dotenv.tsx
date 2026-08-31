import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: ".envと.gitignore" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>.envと.gitignore ― 秘密情報を守る</h1>
        <Lead>
          APIキーやデータベースの接続先は、ソースコードに直接書いてはいけません。代わりに<Term>環境変数</Term>として外から渡し、リポジトリには載せない ―
          その仕組みと、何を除外すべきか、そして誤って載せてしまったときの対処を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">なぜコードに秘密情報を書いてはいけないか</Heading>
      <p>
        ソースコードは<Link href="/dev/git-ci">Git</Link>で履歴付きで共有されます。一度コミットして公開(または誤って公開)すると、鍵やパスワードは<Term>取り消しが非常に困難</Term>になります。履歴から完全に消すには専用の作業が必要で、それでも既に取得された手元には残り続けます。
      </p>

      <Analogy label="💡 たとえるなら">
        秘密情報をコードに書くのは、家の鍵を玄関ドアに貼り付けた状態で家の設計図をネットに公開するようなものです。設計図(コード)は共有したいが、鍵(秘密情報)だけは別の場所で管理する ―
        それが環境変数の役割です。
      </Analogy>

      <Heading num="02">値がどこを通るか</Heading>

      <DiagramFrame
        slug="dev-dotenv-flow"
        aspect="640 / 300"
        caption="設定値と秘密がどこを通るか。左のリポジトリに載せる側には、必要な変数名だけを並べた雛形と、除外設定を書いたファイルが置かれる。右の載せない側には、手元の実際の値、CIの秘密管理、本番の秘密管理が並ぶ。新しく参加した人は雛形をコピーして自分の値を埋め、CIと本番はそれぞれの秘密管理から値を受け取る。一度コミットした秘密は履歴に残るため、対処は削除ではなく鍵の再発行になる。"
      />

      <pre>
        <code>{`# .env の例(このファイル自体はリポジトリに載せない)
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
JWT_SECRET=ランダムな長い文字列
API_KEY=xxxxxxxx

# 開発と本番で変わる公開してよい値
API_BASE_URL=http://localhost:3000`}</code>
      </pre>

      <p>
        値はプログラムから環境変数として読み出します。ここで重要なのは、<Term>読み出す場所がサーバーかブラウザか</Term>です。ブラウザに渡る値は<Link href="/dev/tooling-build">ビルド時に埋め込まれ</Link>、誰でも読めます。フレームワークによっては接頭辞の有無でこれを区別しており、接頭辞付きの変数には秘密を入れられません。
      </p>

      <Heading num="03">.env.example ― 雛形だけ共有する</Heading>
      <p>
        チームでは「どの環境変数が必要か」を全員が知る必要がありますが、実際の値は共有できません。そこで<Term>値を空欄やダミーにした雛形だけをコミット</Term>し、参加した人はそれをコピーして自分の値を埋める、というやり方をとります。
      </p>
      <p>
        雛形があると、変数が増えたときの追随漏れも防げます。新しい変数を足したら雛形も更新する ―
        これを<Link href="/dev/git-ci">レビューの確認項目</Link>にしておくと形骸化しません。
      </p>

      <Heading num="04">.gitignoreに何を書くか</Heading>
      <p>
        <code>.gitignore</code>は、Gitの管理対象から<Term>意図的に除外するファイルの一覧</Term>です。ここに書いたパスは追加しても無視され、誤って秘密情報や巨大な生成物をコミットする事故を防げます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">環境変数ファイル</td>
            <td>
              <code>.env</code>系(雛形は除く)
            </td>
            <td>秘密情報そのもの</td>
          </tr>
          <tr>
            <td className="hl">依存の実体</td>
            <td>
              <code>node_modules</code>
            </td>
            <td>
              ロックファイルから再現できる(<Link href="/dev/tooling-deps">依存とバージョン</Link>)
            </td>
          </tr>
          <tr>
            <td className="hl">ビルド成果物</td>
            <td>出力ディレクトリ</td>
            <td>ソースから生成できる。差分が読めず衝突も起きる</td>
          </tr>
          <tr>
            <td className="hl">キャッシュ・ログ</td>
            <td>ツールの作業ファイル</td>
            <td>共有する意味がなく、肥大化の原因になる</td>
          </tr>
          <tr>
            <td className="hl">個人設定・OS生成物</td>
            <td>エディタ設定、サムネイル情報</td>
            <td>人によって違う。共有すると衝突する</td>
          </tr>
        </tbody>
      </table>

      <Aside label="すでに追跡されているファイルは無視されない">
        <code>.gitignore</code>が効くのは<Term>まだ追跡されていないファイル</Term>だけです。誤ってコミットしてしまった後に除外設定を足しても、そのファイルは追跡され続けます。追跡から外す操作を別途行う必要があり、しかも<Term>過去の履歴からは消えません</Term>。
      </Aside>

      <Heading num="05">漏れたときにやること</Heading>
      <p>
        秘密をコミットしてしまった場合、優先順位は明確です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず鍵を無効化する</h4>
          <p>
            発行元で失効させ、新しい鍵に差し替えます。これが最優先で、履歴の掃除より先です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>影響範囲を確認する</h4>
          <p>
            その鍵で何ができたか、不正な利用の形跡がないかを確認します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>履歴の扱いを決める</h4>
          <p>
            公開範囲によっては履歴の書き換えも検討しますが、取得済みの手元からは消せません。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>再発を防ぐ</h4>
          <p>
            秘密情報の混入を検出する仕組みをコミット時とCIに入れます。
          </p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>値は外から渡す</h4>
          <p>
            コードには書かず、環境変数として渡します。ブラウザに渡る値は秘密にできません。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>雛形だけ共有する</h4>
          <p>
            必要な変数名を雛形で共有し、実際の値は各自・各環境で持ちます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>漏れたら消すより作り直す</h4>
          <p>
            履歴からは消えません。鍵そのものを無効化して発行し直します。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/dotenv" />
    </DocsPage>
  );
}
