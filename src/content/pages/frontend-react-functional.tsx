import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "関数型として読むReact" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>関数型として読むReact ― UI = f(state)</h1>
        <Lead>
          Reactは<Link href="/design/paradigm-functional">関数型</Link>の発想をUIに持ち込んだ道具です。<Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>で見た「同じ入力なら同じ出力」「書き換えず新しい値を作る」がそのまま、コンポーネント・状態更新・副作用の分離に対応します。この視点を先に持つと、以降のフックの設計理由が<Term>すべて一本の筋で読めます</Term>。
        </Lead>
      </Hero>

      <Heading num="01">画面は状態の関数</Heading>
      <p>
        Reactの核心は<Term>UI = f(state)</Term>という等式です。いまの状態を入力すると、あるべき画面が出力される ― 画面を、状態を受け取って見た目を返す1つの関数とみなします。
      </p>

      <pre>
        <code>{`// 状態を入力すると、あるべき画面が返る写像
function Counter({ count }: { count: number }) {
  return <p>現在: {count}</p>;
}
// count が同じなら、返る画面も常に同じ`}</code>
      </pre>

      <p>
        この等式が成り立っている限り、<Term>画面のバグは状態のバグに還元されます</Term>。「なぜこの表示になっているのか」を追うとき、追うべきは状態だけ。DOMがどういう順序で書き換わったかを再現する必要がありません。
      </p>

      <Heading num="02">関数型の概念との対応</Heading>
      <table>
        <thead>
          <tr><th>関数型の概念</th><th>Reactでの対応</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">純粋関数</td><td>propsだけから見た目を決めるコンポーネント</td></tr>
          <tr><td className="hl">関数合成</td><td>小さなコンポーネントを入れ子にして画面を作る</td></tr>
          <tr><td className="hl">高階関数</td><td>ロジックを受け取り、返すカスタムフック</td></tr>
          <tr><td className="hl">イミュータビリティ</td><td>状態を書き換えず、新しい値に置き換える更新</td></tr>
        </tbody>
      </table>

      <p>
        コンポーネントの実体は<Term>propsを受け取ってJSXを返す関数</Term>です。同じpropsからは同じJSXが返る ― 参照透過性そのものです。だからテストしやすく、組み合わせで大きなUIを作れます。
      </p>

      <Heading num="03">イミュータブルに更新する</Heading>
      <p>
        状態は直接書き換えません。新しい値を作って置き換えます。これは思想の問題であると同時に、<Term>Reactが変化を検知するための実務上の要請</Term>でもあります ― 参照が変わったかどうかで判断しているため、中身だけ書き換えると気付いてもらえません。
      </p>

      <pre>
        <code>{`// ✗ 破壊的更新 ― 参照が変わらないので再描画されない
todos.push(newTodo);
setTodos(todos);

// ○ 新しい配列を作って置き換える
setTodos([...todos, newTodo]);
setTodos(todos.filter((t) => t.id !== id));
setTodos(todos.map((t) => (t.id === id ? { ...t, done: true } : t)));`}</code>
      </pre>

      <p>
        データの変換(整形・絞り込み・集計)も、JSXの中に書き散らさず<Term>JSXを組み立てる前に済ませます</Term>。変換と描画を分けることで、返すJSXは状態の素直な写像に保たれます。
      </p>

      <Heading num="04">純粋性が崩れる場所を意識する</Heading>
      <p>
        コンポーネントは純粋を目指しますが、現実には純粋性が崩れる<Term>脱出口</Term>がいくつかあります。これらは「純粋でない代わりに、現実の要求に応える」ための仕組みだと理解しておくと、乱用を避けられます。
      </p>

      <DiagramFrame
        slug="frontend-react-ui-f-state"
        aspect="640 / 310"
        caption="UI equals f of state という等式を中心に、純粋な部分と脱出口を並べた図。中央にコンポーネントの関数があり、左から状態とpropsが入力として入り、右へJSXが出力される。この経路が保たれている限り、画面は状態から一意に決まる。下側に4つの脱出口が並び、それぞれ純粋性を崩す代わりに現実の要求に応える。stateは同じpropsでも内部の値で結果が変わる。副作用は外の世界を読み書きする。refは再描画を経ずに直接触れる。Contextは引数を経ずに外側の値を読む。脱出口を使うほど、画面が状態から一意に決まるという保証が弱くなる。"
      />

      <table>
        <thead>
          <tr><th>脱出口</th><th>なぜ純粋でないか</th><th>代わりに得るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">state</td><td>同じpropsでも内部の値で結果が変わる</td><td>時間とともに変化する画面</td></tr>
          <tr><td className="hl">副作用</td><td>外部世界を読み書きする</td><td>サーバー・DOM・タイマーとの同期</td></tr>
          <tr><td className="hl">ref</td><td>再描画を経ずに値やDOMへ直接触れる</td><td>再描画したくない値の保持、DOM操作</td></tr>
          <tr><td className="hl">Context</td><td>引数を経ずに外側の値を暗黙に読む</td><td>深い階層への値の配送</td></tr>
        </tbody>
      </table>

      <Aside label="脱出口は減点ではない">
        純粋でないことが悪いのではありません。<Term>どこが純粋でないかを把握していないこと</Term>が問題になります。バグを追うときは、まず脱出口を疑えばよい ― この見取り図を持っているかどうかで、デバッグの手数が大きく変わります。
      </Aside>

      <Heading num="05">副作用をUI本体から分離する</Heading>
      <p>
        データ取得・購読・タイマーといった副作用は、同じ入力でも結果が変わり、外に影響を与えます。Reactは描画と副作用を混ぜず、<Term>境界に隔離します</Term>。純粋な計算と作用を分ける関数型の作法そのもので、コンポーネント本体の参照透過性を取り戻すための設計です。
      </p>
      <p>
        実務上の判断としても効きます。「これは描画中に書いてよいか」と迷ったら、<Term>2回実行されても同じ結果か</Term>を問えばよい。答えが「いいえ」なら、それは副作用であり、描画の外へ出すべきものです。
      </p>

      <Analogy label="💡 たとえるなら">
        コンポーネントは、材料を入れると完成写真を返すレシピです。実際に鍋を振る作業は厨房が引き受け、レシピ自体は「この材料ならこの写真」と純粋に保つ。買い出しや配膳といった外とのやり取りは、レシピ本文ではなく別の担当に切り出す ― 純粋な計算と作用を分ける、という一点に尽きます。
      </Analogy>

      <Heading num="まとめ">状態から画面への写像として読む</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>UI = f(state)</h4>
          <p>画面のバグは状態のバグに還元される。追うべきは状態だけ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>イミュータブルに更新する</h4>
          <p>参照の変化で検知しているので、中身だけ書き換えても気付かれない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>脱出口を把握しておく</h4>
          <p>state・副作用・ref・Context。バグはたいていここにいる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、この関数と入出力に<Link href="/frontend/react-typescript">TypeScriptで型を付ける</Link>方法を見ていきます。
      </p>

      <DocsFooter href="/frontend/react-functional" />
    </DocsPage>
  );
}
