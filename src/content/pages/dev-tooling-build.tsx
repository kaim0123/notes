import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ビルドの中身" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>ビルドの中身 ― トランスパイル・バンドル・最適化</h1>
        <Lead>
          ビルドコマンド1行の裏では、変換・結合・削減・分割という複数の工程が走っています。それぞれが何のために存在するのかを知らないと、「配布物が3MBある」「本番だけ動かない」「エラーが読めない」といった問題に対処できません。工程を1つずつ分解します。
        </Lead>
      </Hero>

      <p>
        道具の役割分担は<Link href="/dev/tooling">開発環境とツール</Link>で扱いました。ここではビルドが内部で何をしているかに集中します。
      </p>

      <Heading num="01">トランスパイル ― 新しい文法を古い環境で動かす</Heading>
      <p>
        <Term>トランスパイル</Term>は、ある言語から<Term>同じ抽象度の別の言語へ</Term>変換することです(機械語まで落とす<Link href="/language/compile">コンパイル</Link>とは区別されます)。
      </p>

      <table>
        <thead>
          <tr><th>変換</th><th>目的</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">TypeScript → JavaScript</td>
            <td>型注釈を取り除く。型検査とは別の作業</td>
          </tr>
          <tr>
            <td className="hl">JSX → 関数呼び出し</td>
            <td>ブラウザが解釈できる形にする</td>
          </tr>
          <tr>
            <td className="hl">新しい構文 → 古い構文</td>
            <td>対象ブラウザで動くようにする</td>
          </tr>
        </tbody>
      </table>

      <Aside label="型検査とトランスパイルは別物">
        高速なツールの多くは、型注釈を<Term>読み飛ばして削除するだけ</Term>で、型の正しさは検査しません。だから速いのです。型検査は別のコマンドとして、<Link href="/dev/git-ci">CIの独立したステップ</Link>に置くのが標準的な構成です。<Term>「ビルドが通った = 型が正しい」ではありません</Term>。
      </Aside>

      <p>
        どこまで古い構文に落とすかは<Term>対象ブラウザの指定</Term>で決まります。対象を広げるほど変換が増え、コードは大きく遅くなります。古い環境の対応を外すだけで、配布物が数割小さくなることも珍しくありません。
      </p>

      <Heading num="02">モジュール形式 ― 静的か、動的か</Heading>
      <p>
        JavaScriptには互換性のない2つのモジュール形式が併存しており、ビルドのトラブルの多くはここから来ます。
      </p>

      <table>
        <thead>
          <tr><th></th><th>ESM(標準)</th><th>CommonJS(伝統的)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">構文</td>
            <td><code>import</code> / <code>export</code></td>
            <td><code>require</code> / <code>module.exports</code></td>
          </tr>
          <tr>
            <td className="hl">解決タイミング</td>
            <td>静的(実行前に依存が確定)</td>
            <td>動的(実行時に読み込む)</td>
          </tr>
          <tr>
            <td className="hl">最適化</td>
            <td>未使用の削除が効く</td>
            <td>効きにくい</td>
          </tr>
          <tr>
            <td className="hl">相互運用</td>
            <td>制約付きで読み込める</td>
            <td>ESMを同期で読み込めない</td>
          </tr>
        </tbody>
      </table>

      <p>
        「requireできない」「defaultがundefined」といったエラーは、たいていこの境界で起きています。<code>package.json</code>の設定が、どちらの形式として読ませるかを決めています。
      </p>

      <Heading num="03">バンドル ― なぜ1つにまとめるのか</Heading>
      <p>
        <Term>バンドル</Term>は、多数のモジュールを依存関係をたどって結合する工程です。目的は、リクエスト数を減らすこと、ブラウザには無い解決規則を事前に済ませること、そして全体を見渡して最適化の材料にすることの3つです。
      </p>
      <p>
        ただし通信の多重化が進んだ現在、「リクエストが多いこと」の不利は小さくなり、開発時はバンドルせず素のまま配信する方式が主流になりました。<Term>開発時は速度優先で無バンドル、本番はバンドルして最適化</Term>という二段構えです。
      </p>

      <Heading num="04">削る ― 未使用の削除とコード分割</Heading>

      <DiagramFrame
        slug="dev-tooling-treeshaking"
        aspect="640 / 290"
        caption="未使用コードの削除がモジュール形式に依存することを示した図。上段の静的に解決される形式では、importとexportの関係が実行前に確定するため、ライブラリが3つ公開していてアプリが1つしか使っていなければ、残りは配布物から削除される。下段の動的に解決される形式では、実行時に何を読むか分からないため、バンドラは安全側に倒して全部を残す。副作用の宣言が無い場合にも同じことが起きる。"
      />

      <table>
        <thead>
          <tr><th>手法</th><th>内容</th><th>効かない条件</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">未使用の削除</td>
            <td>どこからも参照されないエクスポートを消す</td>
            <td>動的な形式、副作用のあるモジュール</td>
          </tr>
          <tr>
            <td className="hl">コード分割</td>
            <td>画面や動的読み込みごとにファイルを分ける</td>
            <td>すべてを最初に読み込む構成</td>
          </tr>
          <tr>
            <td className="hl">最小化</td>
            <td>変数名短縮・空白削除・不要コード除去</td>
            <td>―</td>
          </tr>
          <tr>
            <td className="hl">転送時の圧縮</td>
            <td>配信時に圧縮する。効果が最も大きい</td>
            <td>サーバー設定漏れ</td>
          </tr>
        </tbody>
      </table>

      <p>
        削除が効かない典型が<Term>副作用の宣言漏れ</Term>です。「このパッケージは読み込むだけでは何もしない」という宣言が無いと、バンドラは安全側に倒して削除を諦めます。
      </p>

      <Heading num="05">ソースマップ ― 本番のエラーを読めるようにする</Heading>
      <p>
        最小化後のコードは短い記号の羅列になり、エラーの<Link href="/dev/debug">スタックトレース</Link>から元の場所が分かりません。<Term>ソースマップ</Term>は、変換後の位置と元のソースの位置を対応付けるファイルです。
      </p>

      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">生成する</td>
            <td>本番でも生成し、エラー監視の仕組みへ渡す</td>
          </tr>
          <tr>
            <td className="hl">公開はしない</td>
            <td>一般には配信しない。監視ツールにだけ渡す</td>
          </tr>
          <tr>
            <td className="hl">版を対応させる</td>
            <td>リリースIDと紐づけないと、古いマップで誤った行が表示される</td>
          </tr>
        </tbody>
      </table>

      <Heading num="06">環境変数と「本番だけ動かない」</Heading>
      <p>
        フロントエンドのビルドでは、環境変数は<Term>ビルド時に値として埋め込まれます</Term>。実行時に読むサーバーとは挙動が根本的に違います。
      </p>

      <table>
        <thead>
          <tr><th>症状</th><th>原因</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">本番で環境変数が空になる</td>
            <td>ビルド時に値が渡っていない。CI側の設定漏れ</td>
          </tr>
          <tr>
            <td className="hl">秘密がブラウザから見える</td>
            <td>埋め込まれた値は誰でも読める。公開してよい値だけを入れる</td>
          </tr>
          <tr>
            <td className="hl">環境ごとに再ビルドが必要</td>
            <td>設計上そうなる。実行時設定にしたいなら別の方式が要る</td>
          </tr>
          <tr>
            <td className="hl">開発では動くが本番で落ちる</td>
            <td>開発サーバーだけが持つ機能に依存している</td>
          </tr>
        </tbody>
      </table>

      <p>
        <Term>クライアントに渡る値に秘密は置けない</Term>は原則です(<Link href="/dev/dotenv">.envと.gitignore</Link>)。
      </p>

      <Heading num="07">遅い・大きいときの調べ方</Heading>
      <p>推測で削らず、まず可視化します。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>内訳を見る</h4>
          <p>可視化ツールで、どのパッケージが容量を占めているかを確認します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>重い依存を置き換える</h4>
          <p>
            日時・国際化・アイコン系は肥大化しやすい領域です。軽い代替を検討します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>遅延読み込みにする</h4>
          <p>初回表示に不要なものは、動的な読み込みへ回します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>キャッシュを効かせる</h4>
          <p>CIでビルドキャッシュを保存し、差分だけを作り直します。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">工程を分ければ原因も分かる</Heading>
      <p>
        ビルドは「変換 → 結合 → 削減」という独立した工程の積み重ねです。型検査は変換とは別、未使用の削除はモジュール形式に依存し、環境変数は埋め込みで、ソースマップは監視のために要る ―
        この対応関係を持っておくと、ビルド周りの問題を切り分けられるようになります。
      </p>

      <DocsFooter href="/dev/tooling-build" />
    </DocsPage>
  );
}
