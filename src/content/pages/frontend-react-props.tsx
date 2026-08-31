import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Propsと一方向データフロー" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Propsと一方向データフロー ― 下へ流し、変更は上へ依頼する</h1>
        <Lead>
          <Term>props</Term>は親から子へ渡す入力値です。関数の引数と同じで、子は<Term>読み取るだけ</Term>で書き換えません。この「上から下へ一方向に流れる」性質が、Reactでデータの動きを追える理由そのものです。ここでは受け渡しの規律、その限界、そしてchildrenによる合成を見ます。
        </Lead>
      </Hero>

      <Heading num="01">propsは読み取り専用</Heading>
      <p>
        子は受け取ったpropsを<Term>変更してはいけません</Term>。propsは親が所有するデータで、子はそれを表示するだけです。値を変えたいときは、変更する手段もpropsとして受け取り、<Term>更新は親に依頼します</Term>。
      </p>

      <pre>
        <code>{`// ✗ props を書き換える ― 親のデータを勝手に壊している
function Item({ todo }: { todo: Todo }) {
  todo.done = true;
  return <li>{todo.title}</li>;
}

// ○ 変更は親から渡された関数に依頼する
function Item({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  return <li onClick={() => onToggle(todo.id)}>{todo.title}</li>;
}`}</code>
      </pre>

      <p>
        <Link href="/frontend/react-functional">関数型として読むReact</Link>の「引数を破壊しない」がそのまま当てはまります。破壊した場合、親の状態は変わったのにReactは参照の変化を検知できず、<Term>画面だけが古いまま残る</Term>という追いにくいバグになります。
      </p>

      <Heading num="02">一方向データフロー</Heading>
      <p>
        データは常に親から子へ流れ、変更の合図は関数呼び出しとして上っていきます。この一定の向きがあるおかげで、「いまの画面がなぜこうなっているか」を親の状態から辿って説明できます。
      </p>

      <DiagramFrame
        slug="frontend-react-props-flow"
        aspect="640 / 300"
        caption="一方向データフローを示した図。上に親コンポーネントがあり、状態を持っている。そこから下の子コンポーネントへ向かって、実線の矢印でデータがpropsとして渡される。子から親へは、破線の矢印でコールバックの呼び出しが上っていくが、これはデータではなく変更の依頼にすぎない。実際に状態を書き換えるのは親だけで、書き換わった結果はまた上から下へ流れて画面に反映される。データの向きが常に一方向なので、いまの画面がなぜこうなっているかを親の状態から辿って説明できる。"
      />

      <table>
        <thead>
          <tr><th>向き</th><th>手段</th><th>運ぶもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">親 → 子</td><td>props</td><td>データそのもの</td></tr>
          <tr><td className="hl">子 → 親</td><td>コールバックprops</td><td>変更の依頼(データではない)</td></tr>
        </tbody>
      </table>

      <p>
        双方向にデータが流れる設計と比べたときの利点は、<Term>正しい値がどこにあるか常に1か所に決まる</Term>ことです。双方向なら、子が持つ値と親が持つ値のどちらが正なのかを、場面ごとに判断することになります。
      </p>

      <Heading num="03">深いバケツリレー</Heading>
      <p>
        propsは隣接する親子でしか渡せません。深い階層へ値を届けるには、途中の全員を経由させることになります ― これを<Term>props drilling</Term>と呼びます。中間のコンポーネントは、自分では使わない値をただ下へ流すために受け取ることになります。
      </p>

      <pre>
        <code>{`// user を Avatar まで届けるため、Layout も Header も
// 自分では使わない user を素通しさせられている
<Page user={user}>
  <Layout user={user}>
    <Header user={user}>
      <Avatar user={user} />   {/* ようやくここで使う */}
    </Header>
  </Layout>
</Page>`}</code>
      </pre>

      <p>
        2〜3階層なら素直で問題ありません。<Term>本当の問題は階層の深さではなく、中間層が知らなくてよいことを知ってしまう点</Term>です。<code>Layout</code>が<code>user</code>を受け取っている限り、<code>user</code>の型が変わればレイアウトも直すことになります。多くの層を貫くようになったら、<Link href="/frontend/react-context">Context</Link>か、次節の合成に切り替えます。
      </p>

      <Heading num="04">childrenで中身を受け取る</Heading>
      <p>
        <code>children</code>を使うと、開始タグと終了タグの間に書いた要素を受け取れます。<Term>枠だけを提供し、中身は使う側が差し込む</Term>という合成が可能になります。
      </p>

      <pre>
        <code>{`function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border p-4">{children}</div>;
}

// 使う側が中身を自由に差し込む
<Card>
  <h3>タイトル</h3>
  <p>本文</p>
</Card>`}</code>
      </pre>

      <Aside label="drillingを合成で消す">
        <code>children</code>には、前節の問題を解く力があります。<code>Layout</code>が<code>user</code>を受け取るのではなく、<Term>すでに<code>user</code>を埋め込んだ要素を<code>children</code>として受け取る</Term>形にすれば、中間層は<code>user</code>を一切知らずに済みます。Contextを持ち出す前に、この形で解けないかを疑う価値があります。
      </Aside>

      <Heading num="05">スロット ― 差し込み口が複数あるとき</Heading>
      <p>
        差し込みたい場所が複数あるなら、<code>children</code>1つでは足りません。JSXを受け取るpropsを名前付きで用意すれば、複数箇所を外から埋められます。
      </p>

      <pre>
        <code>{`function Dialog({ header, children, footer }: {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="dialog">
      <div className="dialog-head">{header}</div>
      <div className="dialog-body">{children}</div>
      <div className="dialog-foot">{footer}</div>
    </div>
  );
}`}</code>
      </pre>

      <p>
        判断は単純で、<Term>1つならchildren、複数なら名前付き</Term>です。「タイトル用の文字列」「アイコンの種類」といった値をpropsで受け取って内部で組み立てるより、要素そのものを受け取るほうが、分岐が増えません。
      </p>

      <Analogy label="💡 たとえるなら">
        一方向データフローは会社の指揮系統です。指示は上司から部下へ下り、部下が方針を変えたいときは勝手に書き換えず稟議を上げます。props drillingは、宛先の部署へ書類を届けるのに間の全部署のデスクを経由させられる状態。そしてchildrenは「中身は差出人が入れてください」と渡す封筒で、封筒側は中身を知らなくても運べます。
      </Analogy>

      <Heading num="まとめ">向きを1つに保つ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>propsは読み取り専用</h4>
          <p>書き換えると、参照が変わらず画面だけ古いまま残る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>drillingの問題は深さではない</h4>
          <p>中間層が知らなくてよいことを知ってしまうことが問題。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>まず合成で解けないか疑う</h4>
          <p>childrenで中身を渡せば、中間層は何も知らずに済む。</p>
        </Card>
      </CardGrid>

      <p>
        propsが外から渡される入力なのに対し、コンポーネントが内部で持つ変化する値が<Link href="/frontend/react-state">State</Link>です。次に見ていきます。
      </p>

      <DocsFooter href="/frontend/react-props" />
    </DocsPage>
  );
}
