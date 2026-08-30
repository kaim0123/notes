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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "JSXとレンダリング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; 基礎</Eyebrow>
        <h1>JSXとレンダリング ― 見た目をJavaScriptの式で書く</h1>
        <Lead>
          <Term>JSX</Term>はHTMLに似た構文でUIを書く記法ですが、その正体はJavaScriptの<Term>式</Term>です。だから条件分岐もリストも、テンプレート専用の文法ではなく、いつものJavaScript(三項演算子・<code>map</code>)でそのまま書けます。ここではJSXがどう解釈されるか、そして繰り返し描画の要となる<Term>key</Term>を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">JSXの正体 ― トランスパイルされる式</Heading>
      <p>JSXはブラウザがそのまま理解できるものではありません。ビルド時に<code>React.createElement</code>(実際にはjsxランタイム)の呼び出しへ<Term>トランスパイル</Term>され、最終的には普通のJavaScriptのオブジェクトになります。つまりJSXは「関数呼び出しの糖衣構文」であり、変数に入れたり関数から返したりできる<Term>値</Term>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 書いたJSX
const el = <h1 className="title">Hello</h1>;

// トランスパイル後(概念)― ただのオブジェクトを作る式
const el = jsx("h1", { className: "title", children: "Hello" });`}</code>
      </pre>
      <p>属性が<code>class</code>ではなく<code>className</code>なのも、JSXがJavaScriptだからです(<code>class</code>は予約語)。中括弧<code>{`{ }`}</code>の中には任意のJavaScript式を埋め込めます。</p>

      <Heading num="02">条件分岐 ― 文ではなく式で書く</Heading>
      <p>JSXの中に書けるのは<Term>式</Term>だけで、<code>if</code>文は直接書けません。条件による出し分けは、三項演算子・<code>&amp;&amp;</code>・早期returnを使い分けます。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">三項 <code>{`cond ? A : B`}</code></td><td>2択で、どちらかを必ず描画する</td></tr>
          <tr><td className="hl"><code>{`cond && A`}</code></td><td>条件を満たすときだけ描画する(falseなら何も出ない)</td></tr>
          <tr><td className="hl">早期 return</td><td>ローディング・エラーなど、以降の描画を丸ごと差し替える</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function UserPanel({ user, loading }: { user?: User; loading: boolean }) {
  if (loading) return <Spinner />;             // 早期return
  return (
    <div>
      {user ? <p>{user.name}</p> : <p>未ログイン</p>}   {/* 三項 */}
      {user?.isAdmin && <AdminBadge />}                {/* && */}
    </div>
  );
}`}</code>
      </pre>
      <p><code>&amp;&amp;</code>には落とし穴があります。左辺が<code>0</code>など「falsyだが描画される値」だと、その値がそのまま画面に出てしまいます。数値を条件にするときは<code>count &gt; 0 &amp;&amp; ...</code>のように真偽値へ変換します。</p>

      <Heading num="03">リスト描画とkey</Heading>
      <p>配列を<code>map</code>で要素の配列に変換すれば、そのままリストとして描画されます。整形や絞り込みは<code>filter</code>/<code>map</code>で先に済ませ、JSXは変換後の配列を並べるだけにします。このとき各要素には<Term>key</Term>が必要です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`<ul>
  {todos
    .filter((t) => !t.archived)
    .map((t) => <li key={t.id}>{t.title}</li>)}
</ul>`}</code>
      </pre>

      <Heading num="04">なぜindexをkeyにしないのか</Heading>
      <p>keyは、再描画のときにReactが「どの要素が前回のどれと同じか」を対応づけるための<Term>同一性の目印</Term>です。配列のindexをkeyにすると、要素の並び替え・挿入・削除で「同じindex＝別のデータ」になり、Reactが取り違えます。結果、入力中の値が別の行に移る、といったバグが起きます。keyには並び順に依存しない<Term>データ固有のID</Term>を使います。</p>
      <table>
        <thead>
          <tr><th>keyの選び方</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データのID(<code>t.id</code>)</td><td>並び替え・挿入・削除でも同一性が保たれる ― 推奨</td></tr>
          <tr><td className="hl">配列index</td><td>並びが変わると対応がずれ、状態やDOMが取り違えられる</td></tr>
        </tbody>
      </table>
      <p>並び替えも増減も起きない静的なリストに限れば、indexでも実害はありません。しかし「今は静的でも将来動くかもしれない」ため、IDが取れるなら常にIDを使うのが安全です。</p>

      <Heading num="05">描画されない値とStrict Mode</Heading>
      <p>JSXに埋め込んだ<code>null</code>・<code>undefined</code>・<code>false</code>・<code>true</code>は<Term>何も描画されません</Term>。これを利用して<code>{`cond && <X />`}</code>が成立します。一方、<code>0</code>や<code>{`""`}</code>は描画される点に注意します。</p>
      <p>開発時の<Term>Strict Mode</Term>では、コンポーネントが意図的に<Term>2回</Term>実行されます。これは「描画は純粋であるべき(何度呼んでも同じ結果になるべき)」という前提を破っていないか炙り出すための仕組みです。描画中にカウントを増やすような副作用を紛れ込ませていると、2回実行で値が倍になり、その混入に気づけます。</p>

      <Analogy label="💡 たとえるなら">
        keyは、クラスの出席番号ではなく「学生証番号」です。出席番号(index)は席替えのたびに別人を指しますが、学生証番号(ID)は誰がどこに座ろうと同じ人を指し続けます。Reactは名簿を更新するとき、この番号を頼りに「前回の田中さん」と「今回の田中さん」を同一人物だと判断します。番号を席順にしてしまうと、席替えの瞬間に人物を取り違えてしまうのです。
      </Analogy>

      <Heading num="まとめ">JSXはJavaScriptの式、keyは同一性の目印</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>JSXは式にトランスパイルされる</h4><p>だから三項・mapなど普通のJavaScriptでそのまま書ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>keyはデータ固有のID</h4><p>indexは並び替え・増減で取り違えの原因になる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Strict Modeの二重実行</h4><p>描画が純粋か(副作用が混ざっていないか)を炙り出す。</p></Card>
      </CardGrid>
      <p>次は、コンポーネントの入力である<Link href="/dev/frontend/react/props">Propsと一方向データフロー</Link>を掘り下げます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/props" tag="開発">Propsと一方向データフロー</RelatedLink>
            <RelatedLink href="/dev/frontend/react/state" tag="開発">Stateと更新</RelatedLink>
            <RelatedLink href="/dev/frontend/react" tag="開発">React概要</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
