import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Ref" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Ref ― 再描画を起こさない箱と、DOMへの窓口</h1>
        <Lead>
          <code>useRef</code>は<Link href="/frontend/react-state">state</Link>と対になるフックです。stateが「変わったら再描画したい値」なのに対し、refは<Term>変えても再描画したくない値</Term>や<Term>DOM要素そのもの</Term>を保持します。宣言的モデルの外に出て命令的に何かへ触れるための脱出口であり、だからこそ使う場面を絞ります。
        </Lead>
      </Hero>

      <Heading num="01">再描画をまたぐ、通知しない箱</Heading>
      <p>
        <code>useRef</code>が返すのは<code>.current</code>を持つオブジェクトです。書き換えても<Term>再描画は起きず</Term>、しかし再描画をまたいで値は保たれます。
      </p>

      <DiagramFrame
        slug="frontend-react-ref-vs-state"
        aspect="640 / 280"
        caption="stateとrefの違いを2つの軸で比べた図。縦軸は再描画をまたいで値が保たれるかどうか、横軸は書き換えたときに再描画が起きるかどうか。stateは保たれて再描画も起きる位置にある。refは保たれるが再描画は起きない位置にある。関数の中のローカル変数は保たれず再描画も起きない位置にあり、毎回作り直される。左上の再描画は起きるが保たれない、という組み合わせは存在しない。この表から、画面に映したい値はstate、覚えておきたいが映さない値はrefという使い分けが導かれる。"
      />

      <table>
        <thead>
          <tr><th></th><th>useState</th><th>useRef</th><th>ローカル変数</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">変更すると</td><td>再描画が起きる</td><td>起きない</td><td>起きない</td></tr>
          <tr><td className="hl">再描画をまたいで</td><td>保たれる</td><td>保たれる</td><td>消える</td></tr>
          <tr><td className="hl">用途</td><td>画面に映る値</td><td>映さない値・DOM参照</td><td>その回だけの計算</td></tr>
        </tbody>
      </table>

      <p>
        置き場所になるのは、タイマーの識別子、直前の値、外部ライブラリの実体 ― <Term>覚えておきたいが、変わっても画面は変わらないもの</Term>です。
      </p>

      <Heading num="02">DOM要素への参照</Heading>
      <p>
        最も一般的な用途は、実際のDOM要素に直接触ることです。要素の<code>ref</code>属性に渡すと、画面に出たあと<code>.current</code>にその要素が入ります。
      </p>

      <pre>
        <code>{`function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();   // 表示後に自動フォーカス
  }, []);

  return <input ref={inputRef} />;
}`}</code>
      </pre>

      <p>
        フォーカスの移動、スクロール位置の操作、要素サイズの計測、動画の再生 ― どれも<Term>「こうあってほしい」ではなく「いま実行してほしい」</Term>種類の操作で、宣言的には表現できません。だから脱出口が要ります。
      </p>

      <Heading num="03">子コンポーネントへ渡す</Heading>
      <p>
        自作コンポーネントに<code>ref</code>を渡しても、そのままでは内部のDOMには届きません。React 19以降は、関数コンポーネントが<code>ref</code>を<Term>通常のpropsとして</Term>受け取れるようになり、専用のラップは不要になりました。
      </p>

      <pre>
        <code>{`// React 19 以降: ref を普通の props として受け取れる
function TextInput({ ref, ...props }: React.ComponentProps<"input">) {
  return <input ref={ref} {...props} />;
}`}</code>
      </pre>

      <p>
        古いコードでは<code>forwardRef</code>でラップした形を見かけますが、やっていることは同じ ― <Term>refを内部の要素へ転送する</Term>ことです。
      </p>

      <Heading num="04">公開する操作を絞る</Heading>
      <p>
        親に「DOMそのもの」ではなく<Term>特定の操作だけ</Term>を公開したいときは、refを通じて呼べるものを自分で定義します。内部実装を隠しつつ、必要な操作口だけを外に出せます。
      </p>

      <pre>
        <code>{`function Modal({ ref }: { ref: React.Ref<{ open: () => void }> }) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),   // open だけを公開し、内部stateは隠す
  }));

  return visible ? <div className="modal">...</div> : null;
}`}</code>
      </pre>

      <Aside label="⚠️ 命令的APIは増やさない">
        <code>open</code>・<code>close</code>・<code>reset</code>…と操作口が増えていくのは、<Term>状態を親が持つべきだという合図</Term>です。命令的APIは呼ぶ順序に依存し、いまどの状態にあるかが外から見えません。「開いているか」を親のstateにして渡すだけで済むなら、そのほうが常に単純です。
      </Aside>

      <Heading num="05">脱出口としての作法</Heading>
      <p>
        refを使いすぎると、「いまの状態から画面が決まる」という追いやすさが失われます。線引きは単純で、<Term>画面に反映したい値はstate、命令的に触るときだけref</Term>です。
      </p>
      <p>
        もう1つの作法として、<Term>描画中にrefを読み書きしない</Term>ことがあります。描画は純粋であるべきで、refの読み書きはその純粋さを壊します。触るのはイベントハンドラかEffectの中 ― つまり<Term>描画が終わったあと</Term>です。
      </p>

      <Analogy label="💡 たとえるなら">
        stateが掲示板なら ― 書き換えると全員に見える ― refは手帳のメモです。自分だけが持ち、書き換えても誰にも通知しません。そしてDOMへのrefは、設計図の世界から一歩出て現場の建材に直接触れる作業口。便利ですが、現場を直接いじりすぎると設計図と実物がずれていきます。
      </Analogy>

      <Heading num="まとめ">映さない値と、命令的な操作のために</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>保たれるが、通知しない</h4>
          <p>再描画をまたいで残るが、変えても画面は動かない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>「いま実行してほしい」操作に使う</h4>
          <p>フォーカス・計測・再生。宣言的に書けないものが対象。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>命令的APIが増えたら設計を疑う</h4>
          <p>操作口が並び始めたら、状態を親に持たせたほうが単純になる。</p>
        </Card>
      </CardGrid>

      <p>
        基本のフックが揃いました。次は、再描画のコストを抑える<Link href="/frontend/react-performance">メモ化とパフォーマンス</Link>を見ます。
      </p>

      <DocsFooter href="/frontend/react-ref" />
    </DocsPage>
  );
}
