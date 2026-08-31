import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "メモ化とパフォーマンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>メモ化とパフォーマンス ― 測ってから、絞って使う</h1>
        <Lead>
          Reactは状態が変わると、そのコンポーネントと子孫を再実行します。ほとんどの場合これで十分速いのですが、重い計算や巨大なリストでは無駄が体感に響きます。メモ化はその無駄を減らす道具です。ただし<Term>タダではない</Term>ので、まず「本当に必要か」から考えます。
        </Lead>
      </Hero>

      <Heading num="01">再描画はいつ起きるか</Heading>
      <p>
        コンポーネントが再実行されるのは主に3つの場合です。
      </p>

      <table>
        <thead>
          <tr><th>きっかけ</th><th>補足</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自身のstateが変わった</td><td>当然、描き直しが要る</td></tr>
          <tr><td className="hl">親が再描画された</td><td><strong>propsが変わっていなくても</strong>巻き込まれる</td></tr>
          <tr><td className="hl">読んでいるContextの値が変わった</td><td>中間層を飛ばして波及する</td></tr>
        </tbody>
      </table>

      <p>
        無駄の多くは2番目から生まれます。ただし<Term>再描画されること自体は問題ではありません</Term>。関数がもう一度呼ばれて、結果が前回と同じなら、DOMには何も反映されません。問題になるのは、その関数の中身が重いときだけです。
      </p>

      <Heading num="02">3つの道具</Heading>
      <table>
        <thead>
          <tr><th>道具</th><th>覚えるもの</th><th>効く場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>React.memo</code></td><td>コンポーネントの結果</td><td>propsが変わらないのに親と一緒に再実行される子</td></tr>
          <tr><td className="hl"><code>useMemo</code></td><td>計算結果の値</td><td>毎回やり直すと重い計算</td></tr>
          <tr><td className="hl"><code>useCallback</code></td><td>関数の参照</td><td>メモ化した子に関数を渡すとき</td></tr>
        </tbody>
      </table>

      <p>
        3つは<Term>連携して初めて効きます</Term>。比較はすべて参照の同一性で行われるため、<code>React.memo</code>した子にインラインで作った関数やオブジェクトを渡すと、毎回「別物」と判定されてメモ化が無効になります。
      </p>

      <DiagramFrame
        slug="frontend-react-memo"
        aspect="640 / 310"
        caption="メモ化が効く場合と効かない場合を比べた図。上段では親が再描画されるたびに、その場で新しく作られた関数が子へ渡される。子はReact.memoで包まれているが、渡された関数の参照が毎回異なるため前回と同じpropsとは判定されず、結局毎回再描画される。下段では関数の参照をuseCallbackで安定させているため、親が再描画されても子に渡る参照は同じままとなり、子の再描画がスキップされる。React.memoとuseCallbackは片方だけでは効かず、組み合わせて初めて意味を持つ。"
      />

      <pre>
        <code>{`// props が変わらなければ、親が再描画されてもスキップされる
const UserRow = React.memo(function UserRow({ user, onSelect }: Props) {
  return <li onClick={() => onSelect(user.id)}>{user.name}</li>;
});

// ただし親側で参照を安定させないと、上のメモ化は効かない
const handleSelect = useCallback((id: string) => setSelected(id), []);`}</code>
      </pre>

      <p>
        <code>useMemo</code>が値を、<code>useCallback</code>が関数を覚える、という違いだけです。実体としては同じ仕組みで、後者は前者の書きやすい形にすぎません。
      </p>

      <Heading num="03">乱用しない</Heading>
      <p>
        メモ化には、前回の値を保持するメモリと、依存を比較するコストがかかります。<Term>ほとんどの再描画は十分速く、メモ化は不要</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>状況</th><th>判断</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">計測して重いと分かった・巨大なリスト</td><td>検討する価値がある</td></tr>
          <tr><td className="hl">なんとなく速くしたい</td><td>付けない。まず測る</td></tr>
          <tr><td className="hl">小さな計算・少数の要素</td><td>そのままで十分速い</td></tr>
        </tbody>
      </table>

      <Aside label="順序を間違えない">
        メモ化は<Term>最後の手段</Term>です。<Link href="/frontend/perf">表示速度</Link>で見たとおり、効く順序は「送る量を減らす → 描画する量を減らす → メモ化」。1000件を全部描いているなら、メモ化より<Term>描く件数を減らす</Term>ほうが桁違いに効きます。
      </Aside>

      <p>
        なお、自動メモ化を行うコンパイラが広まれば、これらを手で書く場面は減っていきます。それでも仕組みを理解しておけば、自動化されたときに<Term>何が起きているか</Term>を読めます。
      </p>

      <Heading num="04">逆に、あえて作り直す</Heading>
      <p>
        「作り直したい」場面もあります。コンポーネントの<code>key</code>を変えると、Reactはそれを<Term>別物</Term>とみなし、内部の状態を捨てて新品として作り直します。
      </p>
      <p>
        「編集対象が切り替わったらフォームを初期化したい」といった場面で、<code>key</code>に対象のIDを渡すだけで済みます。Effectで各項目をリセットして回るより、はるかに単純で漏れがありません。<Term>リセットは宣言的に書ける</Term>ということです。
      </p>

      <Heading num="05">優先度を下げる</Heading>
      <p>
        メモ化が「計算を減らす」なら、こちらは<Term>重い更新を後回しにする</Term>道具です。入力への即時反応を優先し、それに伴う重い再描画を低い優先度で行うことで、入力のカクつきを防ぎます。
      </p>

      <pre>
        <code>{`const [isPending, startTransition] = useTransition();

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setQuery(e.target.value);                          // 入力は即時に反映
  startTransition(() => setResults(search(e.target.value)));  // 重い更新は後回し
}`}</code>
      </pre>

      <p>
        メモ化との違いは、<Term>総量は減らない</Term>ことです。減らせない計算を、体感に響かない順序で行う ― 目的が違うので、両方を使うこともあります。
      </p>

      <Analogy label="💡 たとえるなら">
        メモ化は、一度作った書類のコピーを取っておき、内容が変わらなければ作り直さず使い回すことです。ただしコピーを取る手間と保管場所も要るので、頻繁に変わる軽い書類にまで適用すると、かえって非効率になります。優先度を下げるほうは、急ぎの用件を先に片づけて時間のかかる集計を後回しにする窓口の工夫 ― 仕事量そのものは変わりません。
      </Analogy>

      <Heading num="まとめ">まず測る、それから絞る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>再描画そのものは問題ではない</h4>
          <p>結果が同じならDOMには反映されない。問題は中身が重いときだけ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3つは連携して効く</h4>
          <p>参照が安定していなければ、メモ化は無効になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>メモ化は最後の手段</h4>
          <p>送る量、描く量を先に減らす。順序を逆にすると効かない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、バケツリレーを解消し、階層をまたいで値を配る<Link href="/frontend/react-context">Context</Link>を見ます。
      </p>

      <DocsFooter href="/frontend/react-performance" />
    </DocsPage>
  );
}
