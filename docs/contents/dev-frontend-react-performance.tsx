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
  title: "メモ化とパフォーマンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; Hooks</Eyebrow>
        <h1>メモ化とパフォーマンス ― 再描画を減らす3つの道具</h1>
        <Lead>
          Reactは<Link href="/dev/frontend/react/state">state</Link>が変わると、そのコンポーネントと子孫を再実行します。ほとんどの場合これで十分速いのですが、重い計算や巨大なリストでは無駄な再描画が体感速度に響きます。<code>React.memo</code>・<code>useMemo</code>・<code>useCallback</code>は、この無駄を<Term>メモ化(前回の結果を覚えて使い回す)</Term>で減らす道具です。ただし乱用は逆効果 ― まず「本当に必要か」から考えます。
        </Lead>
      </Hero>

      <Heading num="01">再描画はいつ起きるか</Heading>
      <p>コンポーネントが再実行されるのは主に、①自身のstateが変わったとき、②親が再描画され自分も巻き込まれたとき、③受け取るContextの値が変わったとき、です。ここで重要なのは②で、「propsが何も変わっていない子」でも、親が再描画されれば既定では一緒に再実行される点です。多くの無駄はここから生まれます。</p>

      <Heading num="02">React.memo ― propsが同じなら再描画をスキップ</Heading>
      <p><code>React.memo</code>でコンポーネントを包むと、<Term>propsが前回と同じ</Term>なら再描画をスキップします。親が再描画されても、自分のpropsが変わっていなければ再実行されません。比較は参照の同一性(<code>===</code>)で行われるため、後述のuseMemo/useCallbackと組み合わせて初めて効きます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// props が変わらなければ、親が再描画されてもスキップされる
const UserRow = React.memo(function UserRow({ user }: { user: User }) {
  return <li>{user.name}</li>;
});`}</code>
      </pre>

      <Heading num="03">useMemo ― 計算結果を覚えておく</Heading>
      <p><code>useMemo</code>は、依存配列が変わらない限り<Term>計算結果を使い回します</Term>。毎回の描画でやり直すと重い処理(大きな配列のソートや集計など)に使います。逆に、軽い計算にuseMemoを付けると、メモ化自体のコストの方が高くつきます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// items か query が変わったときだけ、重いフィルタを再計算する
const filtered = useMemo(
  () => items.filter((i) => i.name.includes(query)),
  [items, query],
);`}</code>
      </pre>

      <Heading num="04">useCallback ― 関数の参照を安定させる</Heading>
      <p>コンポーネント内で定義した関数は、描画のたびに<Term>新しい関数</Term>として作り直されます。これを<code>React.memo</code>した子にpropsで渡すと、「毎回別物」と判定されメモ化が無効になります。<code>useCallback</code>は依存が変わらない限り<Term>同じ関数の参照</Term>を保ち、子のメモ化を機能させます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// この参照は再描画をまたいで安定する → memo した子が正しくスキップできる
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);

<UserRow user={user} onSelect={handleSelect} />;`}</code>
      </pre>
      <p><code>useMemo</code>が「値」を、<code>useCallback</code>が「関数」を覚える、という違いです(<code>useCallback(fn, deps)</code>は<code>useMemo(() =&gt; fn, deps)</code>と同義)。</p>

      <Heading num="05">メモ化の乱用を避ける</Heading>
      <p>メモ化はタダではありません。前回の値を保持するメモリと、依存配列を比較するコストがかかります。<Term>ほとんどの再描画は十分速く、メモ化不要</Term>です。付けるのは「実測で重い」と分かった箇所に絞ります。手当たり次第に<code>useMemo</code>/<code>useCallback</code>を付けると、コードが読みにくくなるうえ、正味では遅くなることすらあります。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>判断</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">計測して重い・巨大リスト</td><td>メモ化を検討する価値がある</td></tr>
          <tr><td className="hl">なんとなく速くしたい</td><td>付けない。まず計測する</td></tr>
          <tr><td className="hl">小さな計算・少数の要素</td><td>そのままで十分速い</td></tr>
        </tbody>
      </table>
      <p>なお、React Compiler(自動メモ化)が広まると、これらを手で書く場面は減っていきます。仕組みを理解しておけば、自動化されても「何が起きているか」を読めます。</p>

      <Heading num="06">key変更による強制リマウント</Heading>
      <p>逆に「あえて作り直したい」こともあります。コンポーネントの<code>key</code>を変えると、Reactはそれを<Term>別物</Term>とみなし、内部のstateを捨てて新品として作り直します(<Term>リマウント</Term>)。「編集対象が切り替わったらフォームを初期化したい」といった場面で、<code>key={`{editingId}`}</code>とするだけでstateのリセットを宣言的に表現できます。</p>

      <Heading num="07">useTransition・useDeferredValue ― 優先度を下げる</Heading>
      <p>メモ化が「計算を減らす」なら、これらは「重い更新を<Term>後回し</Term>にする」道具です(Concurrent機能)。入力への即時反応を優先し、それに伴う重いリスト再描画を低優先度として遅らせることで、入力のカクつきを防ぎます。<code>useTransition</code>は更新をトランジションとして開始し、<code>useDeferredValue</code>は値の反映を遅延させます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const [isPending, startTransition] = useTransition();

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setQuery(e.target.value);                 // 入力は即時に反映(高優先度)
  startTransition(() => setResults(search(e.target.value))); // 重い更新は後回し
}`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        メモ化は「一度作った書類のコピーを取っておき、内容が変わらなければ作り直さず使い回す」こと。ただしコピーを取る手間と保管場所も要るので、頻繁に更新される軽い書類にまで適用すると、かえって非効率です。useTransitionは「急ぎの用件を先に片づけ、時間のかかる集計は後回しにする」窓口の優先順位付け ― 客(入力)を待たせないための工夫です。
      </Analogy>

      <Heading num="まとめ">まず計測、それから絞って使う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>memo/useMemo/useCallback</h4><p>propsが同じ子・重い計算・関数参照の安定化に使う。3つは連携する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>乱用しない</h4><p>メモ化にもコストがある。実測で重い箇所に絞る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>key変更とトランジション</h4><p>keyで強制リマウント、useTransitionで重い更新を後回しにする。</p></Card>
      </CardGrid>
      <p>次は、props drillingを解消し、階層をまたいで値を配る<Link href="/dev/frontend/react/context">Context</Link>を見ます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/context" tag="開発">Context</RelatedLink>
            <RelatedLink href="/dev/frontend/react/state" tag="開発">Stateと更新</RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs/rendering" tag="開発">配信を最適化する</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
