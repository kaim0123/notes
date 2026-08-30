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
  Aside,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ビルドの中身",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>ビルドの中身 ― トランスパイル・バンドル・最適化</h1>
        <Lead>
          <code>npm run build</code> の一行の裏では、変換・結合・削減・分割という複数の工程が走っています。それぞれが何のために存在するのかを知らないと、「バンドルが3MBある」「本番だけ動かない」「ソースマップが無くてエラーが読めない」といった問題に対処できません。工程を1つずつ分解します。
        </Lead>
      </Hero>

      <p>npm・pnpm・Viteという道具の役割分担は「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」で扱いました。ここではビルドが内部で何をしているかに集中します。</p>

      <Heading num="01">ビルドの4工程</Heading>
      <Diagram caption="書いたコードが配信可能な形になるまで">
        <svg viewBox="0 0 430 130" xmlns="http://www.w3.org/2000/svg">
          <rect x={8} y={45} width={86} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={51} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">TS / JSX</text>
          <text x={51} y={77} fill="#9a9a9a" fontSize="10" textAnchor="middle">ソース</text>
          <rect x={116} y={45} width={86} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={159} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">変換</text>
          <text x={159} y={77} fill="#9a9a9a" fontSize="10" textAnchor="middle">トランスパイル</text>
          <rect x={224} y={45} width={86} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={267} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">結合</text>
          <text x={267} y={77} fill="#9a9a9a" fontSize="10" textAnchor="middle">バンドル・分割</text>
          <rect x={332} y={45} width={90} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={377} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">削減</text>
          <text x={377} y={77} fill="#9a9a9a" fontSize="10" textAnchor="middle">最適化・圧縮</text>
          <line x1={94} y1={65} x2={116} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={202} y1={65} x2={224} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={310} y1={65} x2={332} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
        </svg>
      </Diagram>
      <p>サーバー側(Node.js)では結合や圧縮を省くことも多く、フロントエンドでは全工程が必要になります ― <strong>配信量がそのまま表示速度になる</strong>からです。</p>

      <Heading num="02">トランスパイル ― 新しい文法を古い環境で動かす</Heading>
      <p><Term>トランスパイル</Term>は、ある言語から<strong>同じ抽象度の別の言語へ</strong>変換することです(機械語まで落とす<Link href="/dev/language-basics/compile">コンパイル</Link>とは区別されます)。</p>
      <table>
        <tbody>
          <tr><th>変換</th><th>目的</th></tr>
          <tr><td className="hl">TypeScript → JavaScript</td><td>型注釈を取り除く。<strong>型検査とは別の作業</strong></td></tr>
          <tr><td className="hl">JSX → 関数呼び出し</td><td>ブラウザが解釈できる形にする</td></tr>
          <tr><td className="hl">新しい構文 → 古い構文</td><td>対象ブラウザで動くようにする(ダウンレベル)</td></tr>
          <tr><td className="hl">CSSのネスト・変数 → 標準CSS</td><td>同上</td></tr>
        </tbody>
      </table>
      <Aside label="型検査とトランスパイルは別物">
        esbuild や SWC などの高速なツールは、TypeScriptの型注釈を<strong>読み飛ばして削除するだけ</strong>で、型の正しさは検査しません。だから速いのです。型検査は <code>tsc --noEmit</code> として別に実行し、CIの独立したステップに置くのが標準的な構成です。「ビルドが通った=型が正しい」ではありません。
      </Aside>
      <p>どこまで古い構文に落とすかは<strong>対象ブラウザ(browserslist)</strong>で決まります。対象を広げるほど変換が増え、コードは大きく遅くなります。「IE対応」を外すだけでバンドルが数割小さくなることも珍しくありません。</p>

      <Heading num="03">モジュール形式 ― ESMとCommonJS</Heading>
      <p>JavaScriptには互換性のない2つのモジュール形式が併存しており、ビルドのトラブルの多くはここから来ます。</p>
      <table>
        <tbody>
          <tr><th></th><th>ESM(標準)</th><th>CommonJS(Node.js伝統)</th></tr>
          <tr><td className="hl">構文</td><td><code>import</code> / <code>export</code></td><td><code>require</code> / <code>module.exports</code></td></tr>
          <tr><td className="hl">解決タイミング</td><td>静的(実行前に依存が確定)</td><td>動的(実行時に読み込む)</td></tr>
          <tr><td className="hl">最適化</td><td><strong>ツリーシェイキングが効く</strong></td><td>効きにくい</td></tr>
          <tr><td className="hl">相互運用</td><td>CJSを読み込める(制約あり)</td><td>ESMを同期requireできない</td></tr>
        </tbody>
      </table>
      <p>「ERR_REQUIRE_ESM」「default が undefined」といったエラーは、たいていこの境界で起きています。<code>package.json</code> の <code>&quot;type&quot;</code> と <code>exports</code> フィールドが、どちらの形式として読ませるかを決めています。</p>

      <Heading num="04">バンドル ― なぜ1つにまとめるのか</Heading>
      <p><Term>バンドル</Term>は、多数のモジュールを依存関係をたどって結合する工程です。目的は主に3つあります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>リクエスト数を減らす</h4><p>数千のファイルを個別に取得すると、往復のたびに待ちが発生する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>解決を済ませる</h4><p><code>node_modules</code> の解決規則はブラウザにはない。事前に埋め込む。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>最適化の材料にする</h4><p>全体を見渡せると、未使用コードの削除や定数畳み込みができる。</p></Card>
      </CardGrid>
      <p>ただしHTTP/2以降は多重化により「リクエストが多いこと」の不利が小さくなり、開発時はバンドルせず素のESMを配信する方式(Viteの開発サーバー)が主流になりました。<strong>開発時は速度優先で無バンドル、本番はバンドルして最適化</strong>という二段構えです。</p>

      <Heading num="05">削る ― ツリーシェイキングとコード分割</Heading>
      <table>
        <tbody>
          <tr><th>手法</th><th>内容</th><th>効かない条件</th></tr>
          <tr><td className="hl">ツリーシェイキング</td><td>どこからも参照されないエクスポートを削除する</td><td>CommonJS、副作用のあるモジュール</td></tr>
          <tr><td className="hl">コード分割</td><td>ルートや動的 <code>import()</code> ごとにファイルを分ける</td><td>すべてを最初に読み込む構成</td></tr>
          <tr><td className="hl">ミニファイ</td><td>変数名短縮・空白削除・不要コード除去</td><td>―</td></tr>
          <tr><td className="hl">圧縮(gzip / brotli)</td><td>配信時に圧縮する。効果が最も大きい</td><td>サーバー設定漏れ</td></tr>
        </tbody>
      </table>
      <p>ツリーシェイキングが効かない典型が<strong>副作用の宣言漏れ</strong>です。<code>package.json</code> の <code>sideEffects: false</code> は「このパッケージは読み込むだけでは何もしない」という宣言で、これが無いとバンドラは安全側に倒して削除を諦めます。</p>

      <Heading num="06">ソースマップ ― 本番のエラーを読めるようにする</Heading>
      <p>ミニファイ後のコードは <code>a(b,c)</code> のような形になり、エラーのスタックトレースから元の場所が分かりません。<Term>ソースマップ</Term>は、変換後の位置と元のソースの位置を対応付けるファイルです。</p>
      <table>
        <tbody>
          <tr><th>方針</th><th>内容</th></tr>
          <tr><td className="hl">生成する</td><td>本番でも生成し、<Link href="/infra/monitoring/frontend">エラー監視サービス</Link>へアップロードする</td></tr>
          <tr><td className="hl">公開しない</td><td>一般には配信しない(元コードが読まれる)。監視ツールにだけ渡す</td></tr>
          <tr><td className="hl">バージョンを対応させる</td><td>リリースIDと紐づけないと、古いマップで誤った行が表示される</td></tr>
        </tbody>
      </table>

      <Heading num="07">環境変数と「本番だけ動かない」</Heading>
      <p>フロントエンドのビルドでは、環境変数は<strong>ビルド時に値として埋め込まれます</strong>。実行時に読むサーバーとは挙動が根本的に違います。</p>
      <table>
        <tbody>
          <tr><th>症状</th><th>原因</th></tr>
          <tr><td className="hl">本番で環境変数が空になる</td><td>ビルド時に値が渡っていない。CI側の設定漏れ</td></tr>
          <tr><td className="hl">秘密情報がブラウザから見える</td><td><strong>埋め込まれた値は誰でも読める</strong>。公開してよい値だけを入れる</td></tr>
          <tr><td className="hl">環境ごとに再ビルドが必要</td><td>設計上そうなる。実行時設定にしたいなら別の方式が要る</td></tr>
          <tr><td className="hl">開発では動くが本番で落ちる</td><td>開発サーバーだけが持つ機能に依存している(プロキシ設定など)</td></tr>
        </tbody>
      </table>
      <p>「クライアントに渡る値に秘密は置けない」は原則です(「<Link href="/dev/dotenv">.envと.gitignore</Link>」)。</p>

      <Heading num="08">ビルドが遅い・大きいときの調べ方</Heading>
      <p>推測で削らず、まず可視化します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>バンドル内訳を見る</h4><p>可視化ツールで、どのパッケージが容量を占めているかを確認する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>重い依存を置き換える</h4><p>日時・国際化・アイコン系は肥大化しやすい。軽い代替や必要部分の個別取り込みを検討する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>遅延読み込みにする</h4><p>初回表示に不要なものは動的 <code>import()</code> へ。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>キャッシュを効かせる</h4><p>CIでビルドキャッシュを保存する。差分ビルドできるツールを使う。</p></Card>
      </CardGrid>
      <p>表示速度としての測り方は「<Link href="/dev/frontend/perf">表示速度を測って直す</Link>」を参照してください。</p>

      <Heading num="まとめ">工程を分ければ原因も分かる</Heading>
      <p>ビルドは「変換 → 結合 → 削減」という独立した工程の積み重ねです。型検査は変換とは別、ツリーシェイキングはモジュール形式に依存し、環境変数は埋め込みで、ソースマップは監視のために要る ― この対応関係を持っておくと、ビルド周りの問題を切り分けられるようになります。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/tooling/deps" tag="実装">依存とバージョン</RelatedLink>
            <RelatedLink href="/dev/language-basics/compile" tag="実装">コンパイルとリンク</RelatedLink>
            <RelatedLink href="/dev/frontend/perf" tag="フロントエンド">表示速度を測って直す</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
