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
  title: "関数型として読むReact",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; 基礎</Eyebrow>
        <h1>関数型として読むReact ― UI = f(state)</h1>
        <Lead>
          Reactは「<Link href="/design/paradigm/functional">関数型</Link>」の発想をUIに持ち込んだフレームワークです。<Link href="/design/paradigm/functional/foundations">純粋関数とイミュータビリティ</Link>で見た「同じ入力なら同じ出力」「状態を書き換えず新しい値を作る」という原則が、そのままReactのコンポーネント・state更新・副作用の分離に対応します。この視点を先に持っておくと、以降のHooksの設計理由がすべて一本の筋で読めるようになります。
        </Lead>
      </Hero>

      <Heading num="01">UI = f(state) ― 画面は状態の関数</Heading>
      <p>Reactの核心は<Term>UI = f(state)</Term>という等式です。「今の状態(state)を入力すると、あるべき画面(UI)が出力される」― 画面を、状態を受け取って見た目を返す1つの関数とみなします。開発者は状態を更新するだけでよく、その状態から画面を再計算する仕事はReactが引き受けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 状態(count)を入力すると、あるべき画面(JSX)が返る純粋な写像
function Counter({ count }: { count: number }) {
  return <p>現在: {count}</p>;
}
// count が同じなら、返る画面も常に同じ`}</code>
      </pre>

      <Heading num="02">コンポーネントは「propsを受け取りJSXを返す関数」</Heading>
      <p>コンポーネントの実体は、<Term>props</Term>という引数を受け取って<Term>JSX</Term>を返す関数です。同じpropsからは同じJSXが返る ― これは純粋関数の<Term>参照透過性</Term>そのものです。だからこそテストしやすく、組み合わせ(composition)で大きなUIを構築できます。</p>
      <table>
        <thead>
          <tr><th>関数型の概念</th><th>Reactでの対応</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">純粋関数</td><td>propsだけから見た目を決めるコンポーネント</td></tr>
          <tr><td className="hl">関数合成</td><td>小さなコンポーネントを入れ子にして画面を作るcomposition</td></tr>
          <tr><td className="hl">高階関数</td><td>コンポーネントやロジックを受け取り/返すHOC・Custom Hooks</td></tr>
          <tr><td className="hl">イミュータビリティ</td><td>stateを書き換えず、新しい値に置き換える更新</td></tr>
        </tbody>
      </table>

      <Heading num="03">副作用をUI本体から分離する</Heading>
      <p>データ取得・購読・タイマーといった<Term>副作用</Term>は、同じ入力でも結果が変わり、外部世界に影響を与えるため純粋ではありません。Reactは描画(純粋な部分)と副作用を混ぜず、副作用を<code>useEffect</code>やイベントハンドラという<Term>境界</Term>に隔離します。これは関数型で「純粋な計算」と「作用」を分けるのと同じ発想で、コンポーネント本体の参照透過性を回復させるための設計です。</p>

      <Heading num="04">イミュータブルにstateを更新する</Heading>
      <p>stateは直接書き換えません。<code>map</code>・<code>filter</code>・スプレッド構文で<Term>新しい値</Term>を作り、それで置き換えます。Reactは「参照が変わったか」で再描画の要否を判断するため、元のオブジェクトを破壊的に変更すると変化を検知できません。イミュータビリティは思想であると同時に、Reactが変更を検知するための実務上の要請でもあります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: 破壊的更新 ― 参照が変わらず再描画されない
todos.push(newTodo);
setTodos(todos);

// OK: 新しい配列を作って置き換える
setTodos([...todos, newTodo]);
setTodos(todos.filter((t) => t.id !== id));
setTodos(todos.map((t) => (t.id === id ? { ...t, done: true } : t)));`}</code>
      </pre>
      <p>データの変換(整形・絞り込み・集計)も、JSXの中に書き散らすのではなく、JSXを組み立てる前に<code>map</code>/<code>filter</code>/<code>reduce</code>で済ませておきます。「変換」と「描画」を分けることで、返すJSXは状態の素直な写像に保たれます。</p>

      <Heading num="05">参照透過性が崩れる箇所を意識する</Heading>
      <p>コンポーネントは純粋を目指しますが、実際には純粋性が崩れる<Term>脱出口(escape hatch)</Term>がいくつかあります。これらは「純粋でない代わりに、現実の要求に応える」ための仕組みだと理解しておくと、乱用を避けられます。</p>
      <table>
        <thead>
          <tr><th>崩れる箇所</th><th>なぜ純粋でないか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">state</td><td>同じpropsでも、内部状態によって描画結果が変わる</td></tr>
          <tr><td className="hl">副作用(Effect)</td><td>外部世界(サーバー・DOM)を読み書きする</td></tr>
          <tr><td className="hl">ref</td><td>再描画を経ずにDOMや可変値へ直接触れる</td></tr>
          <tr><td className="hl">Context</td><td>引数(props)を経ずに外側の値を暗黙に読み込む</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Reactのコンポーネントは「材料(props/state)を入れると、あるべき料理の完成写真(JSX)を返すレシピ関数」です。実際に鍋を振る作業(DOM更新)は厨房(React)に任せ、レシピ自体は「この材料ならこの写真」と純粋に保つ。買い出しや配膳といった外の世界とのやり取り(副作用)は、レシピ本体ではなく別の担当(useEffect)に切り出す ― これが「純粋な計算」と「作用」を分ける関数型の作法そのものです。
      </Analogy>

      <Heading num="まとめ">状態から画面への純粋な写像として読む</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>UI = f(state)</h4><p>状態を更新するだけ。画面の再計算はReactの仕事。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>純粋を保ち、作用は隔離</h4><p>描画は純粋関数、副作用はuseEffectという境界に分離する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>イミュータブルに更新</h4><p>新しい値を作って置き換える。Reactは参照の変化で再描画を判断する。</p></Card>
      </CardGrid>
      <p>次は、この関数(コンポーネント)と入出力(props)に<Link href="/dev/frontend/react/typescript">TypeScriptで型を付ける</Link>方法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/design/paradigm/functional/foundations" tag="設計">純粋関数とイミュータビリティ</RelatedLink>
            <RelatedLink href="/dev/frontend/react/state" tag="開発">Stateと更新</RelatedLink>
            <RelatedLink href="/dev/frontend/react/effects" tag="開発">副作用（Effects）</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
