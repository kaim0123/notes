import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Tailwind CSS" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Tailwind CSS ― クラス名という間接層をなくす</h1>
        <Lead>
          <Link href="/frontend/styling">スタイリング</Link>で見た3つの問題は、どれも<Term>クラス名という名前付け</Term>から生まれていました。Tailwindの発想は単純で、その名前を作るのをやめます。役割1つのクラスを大量に用意し、マークアップ側で組み合わせる ― この一手で衝突も、上書き合戦も、消せないCSSも消えます。
        </Lead>
      </Hero>

      <Heading num="01">ユーティリティファーストという発想</Heading>
      <p>
        通常のCSSは<code>.card</code>のような意味のあるクラスを作り、そこに見た目をまとめます。プロジェクトが育つと「似ているが微妙に違うクラス」が増え、どこで使われているか追えなくなります。
      </p>
      <p>
        Tailwindは逆から入ります。<code>p-4</code>(内側余白)、<code>text-white</code>(文字色)のように<Term>1つの役割しか持たない小さなクラス</Term>を用意しておき、マークアップ側で組み合わせます。
      </p>

      <pre>
        <code>{`<!-- 従来: クラス名を考え、別ファイルにスタイルを書く -->
<div class="notification-card">...</div>

<!-- Tailwind: 名前を作らず、そのまま組み合わせる -->
<div class="rounded-lg border border-border bg-card p-4">...</div>`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>観点</th><th>従来のCSS</th><th>Tailwind</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命名</td><td>毎回考える必要がある</td><td>そもそも名前を作らない</td></tr>
          <tr><td className="hl">影響範囲</td><td>グローバル。どこに当たるか分からない</td><td>書いた要素だけ</td></tr>
          <tr><td className="hl">削除</td><td>使われているか確認できない</td><td>マークアップを消せば一緒に消える</td></tr>
          <tr><td className="hl">読みやすさ</td><td>マークアップは短いが、CSSを見に行く必要がある</td><td>その場で分かるが、行は長くなる</td></tr>
        </tbody>
      </table>

      <Heading num="02">なぜCSSが肥大化しないのか</Heading>
      <p>
        「クラスを大量に用意する」と聞くと巨大なCSSを想像しますが、実際に配信されるCSSは小さくなります。Tailwindは<Term>ビルド時にソースを走査し、実際に登場したクラスだけを生成する</Term>からです。
      </p>

      <DiagramFrame
        slug="frontend-tailwind-build"
        aspect="640 / 270"
        caption="Tailwindのビルド時の流れを示した図。左のソースファイル群をビルド時に走査し、文字列として登場したユーティリティクラスを集める。中央でその集合だけからCSSを生成するため、使っていないクラスの定義は出力に含まれない。右の配信されるCSSは、画面数が増えても使う語彙が同じであれば大きくならない。下部に、クラス名を動的に組み立てると走査で見つからず生成されないという注意が添えられている。"
      />

      <p>
        結果として、ページ数が増えてもCSSはほとんど増えません。使う語彙(余白の刻み・色の段階)が有限だからです。<Term>CSSの量がページ数ではなく語彙の数で決まる</Term>のがこの方式の効きどころです。
      </p>

      <Aside label="⚠️ クラス名を文字列で組み立てない">
        走査は<Term>ソース中に文字列として現れるか</Term>だけを見ます。<code>{`\`text-\${color}-500\``}</code>のように組み立てたクラスは見つからず、CSSが生成されません。条件で切り替えるときは、分岐の各枝に<strong>完全なクラス名を書く</strong>のが鉄則です。
      </Aside>

      <Heading num="03">状態と画面幅 ― 修飾子</Heading>
      <p>
        素のCSSなら擬似クラスやメディアクエリで書く部分は、<Term>修飾子</Term>としてクラスの前に付けます。
      </p>

      <table>
        <thead>
          <tr><th>修飾子</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>hover:</code> <code>focus:</code></td><td>その状態のときだけ適用する</td></tr>
          <tr><td className="hl"><code>md:</code> <code>lg:</code></td><td>その画面幅以上で適用する(小さい方が既定)</td></tr>
          <tr><td className="hl"><code>dark:</code></td><td>ダークテーマのときだけ適用する</td></tr>
          <tr><td className="hl"><code>group-hover:</code></td><td>親にホバーしたとき子に適用する</td></tr>
          <tr><td className="hl"><code>data-[state=open]:</code></td><td>その属性値のときだけ適用する</td></tr>
        </tbody>
      </table>

      <p>
        画面幅の修飾子が<Term>その幅以上</Term>を意味するのは、小さい画面を既定として書き、大きい画面で上書きしていくという順序を前提にしているからです。この順序を逆にすると、指定が噛み合わなくなります。
      </p>

      <Heading num="04">クラスの組み立てと衝突</Heading>
      <p>
        Reactでコンポーネントを作ると、<Term>外から渡されたクラスと内部のクラスがぶつかる</Term>問題が出ます。単純に連結すると、後勝ちではなくCSS上の記述順で決まるため、意図した上書きになりません。
      </p>

      <pre>
        <code>{`// 単純な連結だと、外から渡した p-2 が内部の p-4 に勝てないことがある
<button className={\`p-4 rounded \${className}\`} />

// 同じ役割のクラスを後勝ちで解決するユーティリティを挟む
import { twMerge } from "tailwind-merge";
<button className={twMerge("p-4 rounded", className)} />`}</code>
      </pre>

      <p>
        バリエーション(サイズ・種類)を持つ部品では、条件とクラスの対応を1か所の表にまとめる方式(<code>class-variance-authority</code>など)が定石です。分岐が本文に散らないので、<Link href="/frontend/components">コンポーネント設計</Link>の側からも読みやすくなります。
      </p>

      <Heading num="05">トークンをどこに置くか</Heading>
      <p>
        Tailwindの余白や色の刻みは、それ自体が<Term>デザイントークン</Term>です。プロジェクト固有の色を足すときは、CSSのカスタムプロパティとして宣言し、それをユーティリティとして使えるようにします。
      </p>
      <p>
        ここで大事なのは、<Term>コンポーネント側に生の色を書かない</Term>ことです。<code>bg-[#1a1a1a]</code>のような直書きが1つ入ると、テーマ切替のときにそこだけ取り残されます。意味を持った名前(<code>bg-card</code>・<code>text-muted-foreground</code>)を経由させておけば、値の差し替えだけでテーマが切り替わります。
      </p>

      <Heading num="06">向かないところ</Heading>
      <p>
        万能ではありません。次のような場面では、素のCSSを書いたほうが素直です。
      </p>

      <table>
        <thead>
          <tr><th>場面</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">複雑なキーフレームアニメーション</td><td>クラスの列では表現しきれない</td></tr>
          <tr><td className="hl">外部から流し込むHTML(記事本文など)</td><td>クラスを付けられないので、要素セレクタで当てるしかない</td></tr>
          <tr><td className="hl">印刷用スタイルなど、まとまった別体系</td><td>ユーティリティに分解すると意図が読めなくなる</td></tr>
        </tbody>
      </table>

      <p>
        このサイトの本文スタイルも、記事側にクラスを書かずに済むよう<code>.docs-content</code>配下の要素セレクタで当てています。<Term>使い分けが前提</Term>で、全部をユーティリティにする必要はありません。
      </p>

      <Heading num="07">shadcn/ui ― コピーして自分のコードにする</Heading>
      <p>
        <Term>shadcn/ui</Term>はボタンやダイアログを用意した部品集ですが、配布の仕方が普通のライブラリと根本的に違います。パッケージとして依存に加えるのではなく、<Term>ソースコードそのものを自分のリポジトリにコピーする</Term>のです。
      </p>
      <p>
        中身は、見た目を持たず挙動とアクセシビリティだけを提供する土台コンポーネントに、Tailwindのクラスを当てたものです。コピーされた時点で自分のコードなので、角丸も余白も直接書き換えられますし、バージョンアップを待つ必要もありません。代わりに<Term>保守も自分の責任になる</Term>のがこの方式の取引です。
      </p>

      <Analogy label="💡 たとえるなら">
        従来のCSSがオーダーメイドで服を仕立てることなら、Tailwindは規格化されたパーツを組み合わせて作ることです。そしてshadcn/uiは、既製品を買うのではなく<strong>型紙を譲り受けて自分の裁縫箱に加える</strong>ようなもの。手元に来たあとは好きに仕立て直せますが、ほつれたときに直すのも自分です。
      </Analogy>

      <Heading num="まとめ">名前を作らない代わりに、語彙を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>間接層をなくす</h4>
          <p>クラス名を作らないので、衝突も上書き合戦も消せないCSSも起きない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ビルド時に使った分だけ生成</h4>
          <p>CSSの量はページ数ではなく語彙の数で決まる。動的なクラス名は見つからない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>色は必ず名前を経由させる</h4>
          <p>生の値を直書きすると、テーマ切替でそこだけ取り残される。</p>
        </Card>
      </CardGrid>

      <p>
        スタイリングの配下はここまでです。次の見出し ―
        <Link href="/frontend/data">通信とデータ保存</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/tailwind" />
    </DocsPage>
  );
}
