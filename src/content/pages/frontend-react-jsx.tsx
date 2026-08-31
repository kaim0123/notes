import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "JSXとレンダリング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>JSXとレンダリング ― 見た目をJavaScriptの式で書く</h1>
        <Lead>
          JSXはHTMLに似た構文ですが、その正体は<Term>JavaScriptの式</Term>です。だから条件分岐もリストも、テンプレート専用の文法ではなく、いつものJavaScriptでそのまま書けます。ここではJSXがどう解釈されるか、そして繰り返し描画の要となる<Term>key</Term>を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">JSXの正体</Heading>
      <p>
        JSXはブラウザがそのまま理解できるものではありません。ビルド時に関数呼び出しへ変換され、最終的にはただのJavaScriptオブジェクトになります。つまりJSXは<Term>値</Term>であり、変数に入れたり関数から返したりできます。
      </p>

      <pre>
        <code>{`// 書いたJSX
const el = <h1 className="title">Hello</h1>;

// 変換後(概念)― ただのオブジェクトを作る式
const el = jsx("h1", { className: "title", children: "Hello" });`}</code>
      </pre>

      <p>
        属性が<code>class</code>ではなく<code>className</code>なのも、JSXがJavaScriptだからです。中括弧の中には任意の式を埋め込めますが、<Term>式であって文ではない</Term>という制約はここから来ています。
      </p>

      <Heading num="02">条件分岐 ― 文ではなく式で書く</Heading>
      <table>
        <thead>
          <tr><th>手法</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">三項演算子</td><td>2択で、どちらかを必ず描画する</td></tr>
          <tr><td className="hl"><code>&amp;&amp;</code></td><td>条件を満たすときだけ描画する</td></tr>
          <tr><td className="hl">早期return</td><td>読み込み中・エラーなど、以降の描画を丸ごと差し替える</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`function UserPanel({ user, loading }: { user?: User; loading: boolean }) {
  if (loading) return <Spinner />;                    // 早期return
  return (
    <div>
      {user ? <p>{user.name}</p> : <p>未ログイン</p>}   {/* 三項 */}
      {user?.isAdmin && <AdminBadge />}                {/* && */}
    </div>
  );
}`}</code>
      </pre>

      <Aside label="⚠️ && の落とし穴">
        左辺が<code>0</code>のような「偽と判定されるが描画される値」だと、その値がそのまま画面に出ます。<code>{`{items.length && <List />}`}</code>と書くと、空のとき画面に<code>0</code>が現れる ― よくあるバグです。数値を条件にするときは<code>{`items.length > 0 &&`}</code>のように<Term>真偽値へ変換</Term>します。
      </Aside>

      <Heading num="03">リスト描画とkey</Heading>
      <p>
        配列を変換すれば、そのままリストとして描画されます。整形や絞り込みは先に済ませ、JSXは並べるだけにします。このとき各要素には<Term>key</Term>が必要です。
      </p>

      <pre>
        <code>{`<ul>
  {todos
    .filter((t) => !t.archived)
    .map((t) => <li key={t.id}>{t.title}</li>)}
</ul>`}</code>
      </pre>

      <Heading num="04">なぜindexをkeyにしないのか</Heading>
      <p>
        keyは、再描画のときにReactが<Term>どの要素が前回のどれと同じか</Term>を対応づけるための目印です。配列の添字をkeyにすると、並び替え・挿入・削除で「同じ添字が別のデータを指す」ようになり、Reactが取り違えます。
      </p>

      <DiagramFrame
        slug="frontend-react-jsx-key"
        aspect="640 / 310"
        caption="keyに添字を使った場合とIDを使った場合の違いを示した図。上段は添字をkeyにした場合で、リストの先頭に新しい項目を挿入すると、それまで0番だった項目が1番へずれる。Reactは同じ添字を同じ要素とみなすため、0番の中身だけが書き換わったと判断し、その要素が保持していた入力中の値やフォーカスは新しい項目の側に残ってしまう。下段はデータ固有のIDをkeyにした場合で、挿入されても各項目のkeyは変わらないため、Reactは新しい要素が1つ増えただけだと正しく判断し、既存の要素とその状態はそのまま保たれる。" />

      <table>
        <thead>
          <tr><th>keyの選び方</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データのID</td><td>並び替え・挿入・削除でも同一性が保たれる ― 推奨</td></tr>
          <tr><td className="hl">配列の添字</td><td>並びが変わると対応がずれ、状態やDOMが取り違えられる</td></tr>
          <tr><td className="hl">ランダムな値</td><td>毎回別物とみなされ、全要素が作り直される ― 最悪</td></tr>
        </tbody>
      </table>

      <p>
        並び替えも増減も起きない静的なリストなら添字でも実害はありません。ただし<Term>いまは静的でも将来動くかもしれない</Term>ので、IDが取れるなら常にIDを使うのが安全です。3行目のランダム値は「keyの警告を消したい」という理由で書かれることがありますが、警告が指している問題を悪化させるだけです。
      </p>

      <Heading num="05">描画されない値</Heading>
      <p>
        JSXに埋め込んだ<code>null</code>・<code>undefined</code>・真偽値は<Term>何も描画されません</Term>。これを利用して<code>&amp;&amp;</code>による出し分けが成立します。一方、<code>0</code>や空文字は描画されます ― 02節の落とし穴はここから来ています。
      </p>

      <Heading num="06">Strict Modeの二重実行</Heading>
      <p>
        開発時、コンポーネントは意図的に<Term>2回</Term>実行されます。これは嫌がらせではなく、「描画は純粋であるべき」という前提を破っていないか炙り出す仕組みです。描画中にカウントを増やすような副作用を紛れ込ませていると、値が倍になって混入に気付けます。
      </p>
      <p>
        逆に言えば、<Term>2回実行で壊れるコードは本番でも壊れうる</Term>ということです。Reactは将来の最適化のために描画を中断・再開する可能性があり、そのとき純粋でない描画は予測できない結果になります。二重実行は、その予行演習にあたります。
      </p>

      <Analogy label="💡 たとえるなら">
        keyは出席番号ではなく学生証番号です。出席番号は席替えのたびに別人を指しますが、学生証番号は誰がどこに座ろうと同じ人を指し続けます。Reactは名簿を更新するとき、この番号を頼りに前回と今回を同一人物だと判断します。番号を席順にしてしまうと、席替えの瞬間に人物を取り違えるのです。
      </Analogy>

      <Heading num="まとめ">JSXは式、keyは同一性の目印</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>JSXは式に変換される</h4>
          <p>だから三項演算子も配列変換も、普通のJavaScriptでそのまま書ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>keyはデータ固有のID</h4>
          <p>添字は並び替え・増減で取り違えの原因になる。ランダム値は論外。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>二重実行は予行演習</h4>
          <p>それで壊れるコードは、本番でも壊れうる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、コンポーネントの入力である<Link href="/frontend/react-props">Propsと一方向データフロー</Link>を掘り下げます。
      </p>

      <DocsFooter href="/frontend/react-jsx" />
    </DocsPage>
  );
}
