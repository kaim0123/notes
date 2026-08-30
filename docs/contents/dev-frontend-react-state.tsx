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
  title: "Stateと更新",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; Hooks</Eyebrow>
        <h1>Stateと更新 ― 変化する値と、それを動かすイベント</h1>
        <Lead>
          <Term>state</Term>は、コンポーネントが内部に持つ「時間とともに変わる値」です。<Link href="/dev/frontend/react/props">props</Link>が外から渡される読み取り専用の入力だったのに対し、stateは自分で持ち、自分で更新します。<Link href="/dev/frontend/react/functional">UI = f(state)</Link>のstateがまさにこれで、stateを更新するとReactが画面を再計算します。ここでは更新の正しい書き方と、更新のきっかけになるイベントを扱います。
        </Lead>
      </Hero>

      <Heading num="01">useStateの基本</Heading>
      <p><code>useState</code>は「現在の値」と「更新用の関数」のペアを返します。更新関数を呼ぶと、Reactはその値を覚えたうえでコンポーネントを再実行し、新しい画面を作ります。ローカル変数と違い、再描画をまたいで値が保持されるのがstateです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function Counter() {
  const [count, setCount] = useState(0); // [現在値, 更新関数]
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</code>
      </pre>

      <Heading num="02">更新は非同期・まとめて反映される</Heading>
      <p><code>setCount</code>を呼んでも、その行の直後に<code>count</code>が変わるわけではありません。更新は予約され、1つのイベント内の複数の更新は<Term>バッチ処理</Term>としてまとめられ、その後に一度だけ再描画されます。だから同じ処理内の<code>count</code>は古いままです。この性質を踏まえないと、下のような「1しか増えない」バグを踏みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: どれも同じ古い count を +1 しているだけ → 結果は +1
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`}</code>
      </pre>

      <Heading num="03">関数型更新 ― 前の状態から次を作る</Heading>
      <p>前の状態に依存して更新するときは、値ではなく<Term>関数</Term>を渡します。Reactが「その時点の最新の状態」を引数として渡してくれるため、バッチの中でも正しく積み上がります。前状態<code>prev</code>から次状態を計算する ― これは<Link href="/dev/frontend/react/functional">イミュータブル</Link>な状態遷移そのものです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// OK: 最新値を受け取って+1 → 3回積み上がる
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);`}</code>
      </pre>

      <Heading num="04">オブジェクト・配列はイミュータブルに更新</Heading>
      <p>stateがオブジェクトや配列のときも、直接書き換えず<Term>新しい値を作って置き換え</Term>ます。Reactは参照が変わったかで再描画を判断するため、破壊的変更(<code>push</code>や代入)では変化を検知できません。スプレッド・<code>map</code>・<code>filter</code>で新しいコピーを作ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`setUser((prev) => ({ ...prev, name: "新しい名前" }));   // オブジェクト
setItems((prev) => [...prev, newItem]);                 // 追加
setItems((prev) => prev.filter((i) => i.id !== id));    // 削除`}</code>
      </pre>

      <Heading num="05">派生stateを持たない ― 計算で導く</Heading>
      <p>「他のstateから計算できる値」は、別のstateにしてはいけません。stateにすると2つの値を同期させ続ける責任が生まれ、片方だけ更新し忘れて食い違います。計算で導ける値は、描画のたびに<Term>その場で計算</Term>します。これも「同じ状態からは同じ結果」という純粋さを保つ姿勢です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: fullName を別 state にすると同期の責任が増える
const [fullName, setFullName] = useState("");

// OK: first / last から毎回計算する ― 同期不要
const fullName = \`\${first} \${last}\`;`}</code>
      </pre>

      <Heading num="06">stateの置き場所 ― リフトアップとcolocation</Heading>
      <p>stateは「必要な場所」に置きます。複数の子で同じ状態を共有したいときは、共通の親までstateを引き上げます(<Term>リフトアップ</Term>)。逆に、1つのコンポーネントでしか使わない状態を上位に置くと不要な再描画を広げるので、使う場所の近くに置きます(<Term>colocation</Term>)。「共有するなら上げる、使わないなら下げる」が原則です。</p>

      <Heading num="07">複雑な状態はuseReducer</Heading>
      <p>状態遷移のパターンが増えてきたら、<code>useReducer</code>で「どんな操作(action)が来たら、どう状態を変えるか」を1か所の<Term>reducer</Term>に集約します。reducerは<Term>純粋関数</Term>として書く ― <code>(現在の状態, action) → 新しい状態</code>という写像で、副作用を含めません。これにより状態遷移がテスト可能になり、<Link href="/dev/frontend/react/context">Context</Link>と組み合わせれば<code>dispatch</code>を深い子まで配れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type State = { count: number };
type Action = { type: "inc" } | { type: "reset" };

// 純粋関数: 副作用なし、同じ入力なら同じ出力
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "reset": return { count: 0 };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
// 使う側は「何をしたいか」だけを伝える
dispatch({ type: "inc" });`}</code>
      </pre>

      <Heading num="08">イベント ― 更新のきっかけ</Heading>
      <p>stateを更新するきっかけの多くは、ユーザー操作=<Term>イベント</Term>です。<code>onClick</code>・<code>onChange</code>・<code>onSubmit</code>などにハンドラを渡します。Reactはブラウザ差を吸収した<Term>合成イベント(SyntheticEvent)</Term>を渡すため、どのブラウザでも同じAPIで扱えます。フォーム送信では<code>preventDefault()</code>でページ遷移を止め、イベントの伝播を止めたいときは<code>stopPropagation()</code>を使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function SearchForm() {
  const [q, setQ] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();          // デフォルトのページ再読み込みを止める
    console.log("検索:", q);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <button>検索</button>
    </form>
  );
}`}</code>
      </pre>
      <p>ハンドラの中で「状態を更新するのはOK」ですが、「サーバー送信・購読・タイマー設定」のような<Link href="/dev/frontend/react/effects">副作用</Link>をどこに置くかは次ページで整理します。ユーザー操作に反応する副作用はイベントハンドラ、描画結果として必要な副作用はEffect、という切り分けが鍵になります。たとえばタブ付き詳細ページでは、<code>setTab</code>で<Term>どのタブを見せるか</Term>という state を更新し、その変化に<code>useEffect</code>が反応して<Term>そのタブに必要なデータだけ</Term>APIから取りに行く、という組み合わせが実務でよく使われます(詳細は<Link href="/dev/frontend/react/effects">副作用（Effects）</Link>の実務例)。</p>

      <Analogy label="💡 たとえるなら">
        値を直接渡す更新(<code>count + 1</code>)は「今わかっている残高をもとに振込額を書く」ようなもの。同時に複数の振込を出すと、どれも同じ古い残高を見て計算し、食い違います。関数型更新(<code>prev =&gt; prev + 1</code>)は「窓口に着いた時点の最新残高から計算してください」と依頼する方式 ― 順番に最新残高が反映されるので、積み上げても正しくなります。
      </Analogy>

      <Heading num="まとめ">前状態から新しい値を作り、置き換える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>更新は非同期・バッチ</h4><p>前状態に依存するなら関数型更新 prev =&gt; ... を使う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>イミュータブルに・派生は計算</h4><p>新しい値を作って置換。計算で導ける値はstateにしない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>共有は上げ、複雑はreducerへ</h4><p>リフトアップとcolocation、遷移が増えたら純粋なreducerに集約。</p></Card>
      </CardGrid>
      <p>次は、stateの外側 ― サーバーやタイマーといった<Link href="/dev/frontend/react/effects">副作用（Effects）</Link>との付き合い方を見ます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/effects" tag="開発">副作用（Effects）</RelatedLink>
            <RelatedLink href="/dev/frontend/react/performance" tag="開発">メモ化とパフォーマンス</RelatedLink>
            <RelatedLink href="/dev/frontend/react/forms" tag="開発">フォームの値を管理する</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
