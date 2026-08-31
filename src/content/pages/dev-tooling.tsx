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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "開発環境とツール",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>開発環境とツール ― コードを書き始めるまでの土台</h1>
        <Lead>
          コードを1行書く前に、手元にはいくつもの道具が必要です。命令を打ち込む場所、他人が作った部品を取り寄せる仕組み、書いたコードを動く形に変換する仕組み、そして環境ごとに変わる設定の受け渡し ―
          ここでは、この「開発中に自分が使うもの」をまとめて扱います。
        </Lead>
      </Hero>

      <Aside label="このページの守備範囲">
        シェルの系譜や、シェルがカーネルに命令を伝える仕組みそのものは<Link href="/computer/os-shell">シェルの系譜</Link>で扱っています。ここで見るのは、そのシェルを<Term>開発の道具として何に使うか</Term>のほうです。本番で動かすための環境(サーバー・コンテナ・デプロイ先)はインフラセクションの担当で、この境目は<Term>開発中に自分が使うもの / 本番で動かすもの</Term>で分けています。
      </Aside>

      <Heading num="01">「環境」という言葉の4つの意味</Heading>
      <p>
        最初につまずきやすいのが、<Term>環境</Term>という言葉が場面ごとに違うものを指すことです。共通しているのは<Term>コードそのものは変えず、それを取り巻く条件だけが変わる</Term>という発想で、何が「取り巻く条件」なのかが4通りあります。
      </p>

      <table>
        <thead>
          <tr>
            <th>意味</th>
            <th>指すもの</th>
            <th>よく使う言い回し</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">開発環境</td>
            <td>自分のPC上で作業するための道具一式(エディタ・シェル・ツール)</td>
            <td>「環境構築に半日かかった」</td>
          </tr>
          <tr>
            <td className="hl">実行環境</td>
            <td>
              プログラムが実際に動く土台。<Link href="/language/runtime">ブラウザ・Node.js</Link>やOS
            </td>
            <td>「実行環境によって挙動が違う」</td>
          </tr>
          <tr>
            <td className="hl">ステージ</td>
            <td>開発(dev)・検証(staging)・本番(production)という公開の段階</td>
            <td>「本番環境で障害が起きた」</td>
          </tr>
          <tr>
            <td className="hl">環境変数</td>
            <td>プログラムの外から渡す、名前と値の組の設定値</td>
            <td>「環境変数が設定されていない」</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        舞台に例えると、開発環境は「リハーサル室」、実行環境は「劇場の照明や音響の設備」、ステージは「リハーサル → 通し稽古 → 本番」という進行の段階、環境変数は「公演ごとに貼り替える小道具の配置メモ」にあたります。同じ台本(コード)でも、どの場所・どの段階・どの設定で演じるかで見え方が変わります。
      </Analogy>

      <Heading num="02">ターミナルとシェル ― 開発の入口</Heading>
      <p>
        <Term>ターミナル</Term>は文字を入力し結果を表示するだけの窓口で、入力された命令を解釈するのが<Term>シェル</Term>です。ターミナル自身は命令の意味を理解しません。この2つを区別できるようになると、「エラーが出た画面」の正体が急に分かりやすくなります。
      </p>
      <p>
        開発でCLIが使われるのは、<Term>正確さ</Term>と<Term>繰り返しやすさ</Term>のためです。GUIの操作は手順を人に伝えるのが難しく、自動化もできません。コマンドなら、そのまま手順書にもスクリプトにもなり、CIでも同じものを実行できます。
      </p>

      <Aside label="最低限これだけ">
        <code>pwd</code>(今いる場所)・<code>ls</code>(中身の一覧)・<code>cd</code>(移動)・<code>cat</code>(中身の表示)の4つで、たいていの調査は始められます。加えて、直前のコマンドを呼び出す上キーと、途中で止める<code>Ctrl+C</code>を覚えておけば十分です。
      </Aside>

      <Heading num="03">パッケージ管理 ― 部品を取り寄せる</Heading>
      <p>
        日付を扱う処理も、通信の処理も、毎回ゼロから書いていては時間が足りません。他の開発者が公開している再利用可能な部品を<Term>パッケージ</Term>として取り込みます。ただし1つのパッケージが別の何十個ものパッケージに依存していることも多く、バージョンの組み合わせを手作業で管理するのは非現実的です。この依存関係を自動で解決するのが<Term>パッケージ管理ツール</Term>です。
      </p>

      <Analogy label="💡 たとえるなら">
        家電を作るとき、ネジや半導体まで自社で作る会社はありません。専門メーカーの既製品を仕入れて組み立てます。パッケージ管理ツールは、この「必要な部品を、必要なバージョンで、正しい組み合わせで仕入れてくる」調達係です。
      </Analogy>

      <p>
        JavaScriptのプロジェクトでは、使っているパッケージの一覧や実行コマンドを<code>package.json</code>に記録します。
      </p>

      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>役割</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>dependencies</code>
            </td>
            <td>アプリの実行に必要なパッケージ</td>
          </tr>
          <tr>
            <td className="hl">
              <code>devDependencies</code>
            </td>
            <td>開発時にだけ必要なパッケージ(ビルドツール・テスト・Lint)</td>
          </tr>
          <tr>
            <td className="hl">
              <code>scripts</code>
            </td>
            <td>
              <code>npm run dev</code>のように名前で呼び出せるコマンド集
            </td>
          </tr>
          <tr>
            <td className="hl">ロックファイル</td>
            <td>
              実際に入った正確なバージョンの記録。<Term>これがあるから他人の手元でも同じものが入る</Term>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        ツールの選択肢はいくつかありますが、大きな違いは<Term>ディスク上に実体をいくつ置くか</Term>です。npmはプロジェクトごとに実体を複製し、pnpmはPC内に共有ストアを1つ持ってリンクで参照します。同じバージョンなら10プロジェクトあっても実体は1つで済むため、容量とインストール時間が節約できます。
      </p>

      <Aside label="ロックファイルはコミットする">
        ロックファイルを共有しないと、人によって入るバージョンが変わり「自分の環境では動く」が生まれます。逆にロックファイルさえあれば、CIでも本番ビルドでも同じ依存が再現できます。<Link href="/dev/git-ci">Git・CI/CD</Link>で扱う「同じものが同じように動く」の土台です。
      </Aside>

      <Heading num="04">ビルド ― 書きやすい形から、動かしやすい形へ</Heading>
      <p>
        私たちが書くコードは、そのままではブラウザが効率よく実行できる形になっていません。<Term>ビルド</Term>とは、開発者にとって書きやすい形のコードを、実行しやすく軽い形に変換する工程全体を指します。
      </p>

      <DiagramFrame
        slug="dev-tooling-build"
        aspect="640 / 300"
        caption="ビルドが何をしているか。左の多数のソースファイルに対し、①トランスパイルがブラウザの理解できない構文を通常のJavaScriptに変換して型注釈を取り除き、②バンドルがimportをたどって少数のファイルにまとめ、③最小化が名前を短くし空白を削る。結果として、人間には読めないが軽い配布物が残る。開発サーバーはこの全体を毎回やり直さず、ブラウザが要求したファイルだけをその場で変換するため、規模が増えても起動が速い。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>トランスパイル</h4>
          <p>
            TypeScriptやJSXなど、そのままでは実行できない構文を通常のJavaScriptに変換します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>バンドル</h4>
          <p>
            <code>import</code>の関係をたどり、分割された多数のファイルを少数にまとめます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最小化</h4>
          <p>
            変数名を短くし、空白や改行を削って、配布するファイルサイズを小さくします。
          </p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        ビルドは料理の仕込みです。冷蔵庫にバラバラに入っている食材(ソースファイル)を、切って(トランスパイル)、まとめて盛り付けて(バンドル)、余分な部分を落として(最小化)、すぐ出せる1皿に仕上げる工程です。
      </Analogy>

      <p>
        開発中のビルドは<Term>速さ</Term>が、本番向けのビルドは<Term>軽さ</Term>が優先されます。現代のツールが開発サーバーで全体をバンドルしないのはそのためで、ブラウザが要求したファイルだけをその場で変換して返します。一方、本番向けにはファイル数が多いままだと読み込みが非効率なので、きちんとバンドルと最小化を行います。
      </p>

      <Heading num="05">設定と秘密の受け渡し</Heading>
      <p>
        接続先のURLやAPIキーのように、<Term>環境ごとに変わる値</Term>はコードに直接書かず、環境変数として外から渡します。手元では<code>.env</code>ファイルに書くのが一般的ですが、このファイルは<Term>絶対にリポジトリへ入れない</Term>ことが原則です。
      </p>

      <table>
        <thead>
          <tr>
            <th>置き場所</th>
            <th>入れてよいもの</th>
            <th>注意</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">コード内の定数</td>
            <td>どの環境でも変わらない値</td>
            <td>秘密は置かない</td>
          </tr>
          <tr>
            <td className="hl">
              <code>.env</code>(手元)
            </td>
            <td>手元での接続先・キー</td>
            <td>
              <code>.gitignore</code>で除外する。代わりに<code>.env.example</code>を共有する
            </td>
          </tr>
          <tr>
            <td className="hl">CI・本番の秘密管理</td>
            <td>本番のキー・トークン</td>
            <td>値はログに出さない。権限は必要最小限に</td>
          </tr>
          <tr>
            <td className="hl">フロントエンドに渡す値</td>
            <td>公開してよい値だけ</td>
            <td>ビルド時に埋め込まれるため、秘密は必ず漏れる</td>
          </tr>
        </tbody>
      </table>

      <Aside label="一度コミットした秘密は消えない">
        <Link href="/dev/git-ci">Git</Link>は履歴を残す仕組みなので、あとから削除してもコミットの中に残り続けます。誤ってキーを入れてしまったら、ファイルを消すのではなく<Term>そのキー自体を無効化して発行し直す</Term>のが唯一の正しい対処です。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>「環境」は4つの意味を持つ</h4>
          <p>
            道具一式・実行の土台・公開の段階・設定値。文脈でどれかを見分けます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再現できることが価値</h4>
          <p>
            ロックファイルとコマンド化された手順が、「自分の環境では動く」を防ぎます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>秘密はコードに置かない</h4>
          <p>
            外から渡し、リポジトリに入れない。漏れたら消すのではなく作り直します。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/tooling" />
    </DocsPage>
  );
}
