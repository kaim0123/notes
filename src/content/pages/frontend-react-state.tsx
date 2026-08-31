import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Stateと更新" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Stateと更新 ― 前の状態から次を作る</h1>
        <Lead>
          <Term>state</Term>は、コンポーネントが内部に持つ「時間とともに変わる値」です。<Link href="/frontend/react-props">props</Link>が外から渡される読み取り専用の入力なのに対し、stateは自分で持ち、自分で更新します。<Link href="/frontend/react-functional">UI = f(state)</Link>のstateがまさにこれで、更新するとReactが画面を計算し直します。
        </Lead>
      </Hero>

      <Heading num="01">基本形</Heading>
      <p>
        <code>useState</code>は「現在の値」と「更新用の関数」のペアを返します。ローカル変数と違い、<Term>再描画をまたいで値が保たれる</Term>のがstateです。
      </p>

      <pre>
        <code>{`function Counter() {
  const [count, setCount] = useState(0); // [現在値, 更新関数]
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</code>
      </pre>

      <Heading num="02">更新は即座には反映されない</Heading>
      <p>
        更新関数を呼んでも、その行の直後に値が変わるわけではありません。更新は<Term>予約され</Term>、1つのイベント内の複数の更新はまとめられ、そのあとに一度だけ再描画されます。だから同じ処理の中の値は古いままです。
      </p>

      <pre>
        <code>{`// ✗ どれも同じ古い count を +1 しているだけ → 結果は +1
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`}</code>
      </pre>

      <DiagramFrame
        slug="frontend-react-state-update"
        aspect="640 / 300"
        caption="値を渡す更新と関数を渡す更新の違いを示した図。上段では現在の値に1を足した結果を3回渡している。3回とも同じ古い値をもとに計算しているため、予約される値はすべて同じになり、最終的に1しか増えない。下段では前の値を受け取って1を足す関数を3回渡している。Reactは予約された関数を順に適用するため、それぞれが直前の結果を受け取り、3つ分が正しく積み上がる。前の状態に依存する更新では、必ず関数を渡す。"
      />

      <p>
        この挙動が理解しづらいのは、<Term>変数のように見えて変数ではない</Term>からです。<code>count</code>はその回の描画に固定された値で、更新関数はそれを書き換えるのではなく「次はこの値で描き直してほしい」と予約しているだけです。
      </p>

      <Heading num="03">前の状態から次を作る</Heading>
      <p>
        前の状態に依存する更新では、値ではなく<Term>関数</Term>を渡します。Reactが「その時点の最新の状態」を引数に渡してくれるので、まとめられても正しく積み上がります。
      </p>

      <pre>
        <code>{`// ○ 最新値を受け取って +1 → 3回積み上がる
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);`}</code>
      </pre>

      <p>
        判断は単純です。<Term>次の値の計算に現在の値が要るなら、関数を渡す</Term>。要らないなら値でよい ― 迷ったら関数にしておけば間違いません。
      </p>

      <Heading num="04">オブジェクトと配列</Heading>
      <p>
        stateがオブジェクトや配列でも、直接書き換えず<Term>新しい値を作って置き換えます</Term>。参照が変わったかで判断しているため、中身だけ書き換えても検知されません。
      </p>

      <pre>
        <code>{`setUser((prev) => ({ ...prev, name: "新しい名前" }));   // 更新
setItems((prev) => [...prev, newItem]);                 // 追加
setItems((prev) => prev.filter((i) => i.id !== id));    // 削除`}</code>
      </pre>

      <Aside label="深い入れ子は設計を疑う">
        3階層も4階層も入れ子になったオブジェクトをイミュータブルに更新するのは、書くのも読むのも苦痛です。そうなったときは書き方を工夫する前に、<Term>その形が本当に必要か</Term>を疑うほうが効きます。IDをキーにした平坦な形に持ち替えるだけで、更新が1階層で済むようになることがよくあります。
      </Aside>

      <Heading num="05">計算できる値を状態にしない</Heading>
      <p>
        他のstateから計算できる値は、別のstateにしてはいけません。stateにすると<Term>2つの値を同期させ続ける責任</Term>が生まれ、片方だけ更新し忘れて食い違います。
      </p>

      <pre>
        <code>{`// ✗ fullName を別の state にすると、同期の責任が増える
const [fullName, setFullName] = useState("");

// ○ first / last から毎回計算する ― 同期は不要
const fullName = \`\${first} \${last}\`;`}</code>
      </pre>

      <p>
        「計算が重いのでは」という心配は、たいてい杞憂です。本当に重いと<Term>測って</Term>分かってから<Link href="/frontend/react-performance">メモ化</Link>すればよく、それでも状態を増やすより安全です。
      </p>

      <Heading num="06">置き場所 ― 上げるか、下げるか</Heading>
      <p>
        複数の子で同じ状態を共有したいときは、共通の親まで引き上げます。逆に1つのコンポーネントでしか使わない状態を上位に置くと、無関係な部分まで再描画が広がります。<Term>共有するなら上げる、使わないなら下げる</Term>が原則です。
      </p>
      <p>
        判断に迷ったら、<Term>下げてから困ったときに上げる</Term>順序が安全です。最初から上に置くと、それが必要な範囲がどこまでなのか分からなくなります。
      </p>

      <Heading num="07">遷移が増えたらreducerへ</Heading>
      <p>
        状態遷移のパターンが増えてきたら、「どんな操作が来たら、どう変わるか」を1か所に集約します。集約先は<Term>純粋関数</Term>として書きます ― 現在の状態と操作から新しい状態を返すだけで、副作用は含めません。
      </p>

      <pre>
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
dispatch({ type: "inc" });   // 使う側は「何をしたいか」だけを伝える`}</code>
      </pre>

      <p>
        効果は3つあります。状態遷移が<Term>1か所を読むだけで分かる</Term>こと、純粋関数なのでUIなしでテストできること、そして呼ぶ側が更新の詳細を知らなくてよくなることです。深い階層へ配るときも、更新関数を何本も渡さずに済みます。
      </p>

      <Heading num="08">更新のきっかけ ― イベント</Heading>
      <p>
        更新のきっかけの多くはユーザー操作です。Reactはブラウザ差を吸収したイベントオブジェクトを渡すので、どの環境でも同じ書き方で扱えます。
      </p>

      <pre>
        <code>{`function SearchForm() {
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();          // 既定のページ再読み込みを止める
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

      <p>
        ハンドラの中で状態を更新するのは問題ありません。一方、サーバー送信・購読・タイマーのような外との同期をどこに置くかは次ページの話です。判断の軸は<Term>ユーザー操作に反応するのか、描画結果として必要なのか</Term>です。
      </p>

      <Analogy label="💡 たとえるなら">
        値を渡す更新は「いま分かっている残高をもとに振込額を書く」ようなものです。同時に複数出すと、どれも同じ古い残高を見て計算し、食い違います。関数を渡す更新は「窓口に着いた時点の最新残高から計算してください」と依頼する方式 ― 順に反映されるので、積み上げても正しくなります。
      </Analogy>

      <Heading num="まとめ">状態は最小限に、更新は前の状態から</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>更新は予約、値は古いまま</h4>
          <p>現在の値が計算に要るなら、値ではなく関数を渡す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>計算できる値は状態にしない</h4>
          <p>同期の責任が増え、必ずどこかで食い違う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>遷移が増えたら1か所に集約</h4>
          <p>純粋関数にまとめると、読めるようになりテストもできる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、stateの外側 ― サーバーやタイマーといった<Link href="/frontend/react-effects">副作用</Link>との付き合い方を見ます。
      </p>

      <DocsFooter href="/frontend/react-state" />
    </DocsPage>
  );
}
