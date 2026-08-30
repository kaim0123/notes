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
  title: "Propsと一方向データフロー",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; 基礎</Eyebrow>
        <h1>Propsと一方向データフロー ― 親から子へ、読み取り専用で渡す</h1>
        <Lead>
          <Term>props</Term>は、親コンポーネントから子コンポーネントへ渡す入力値です。関数の引数と同じで、子はそれを<Term>読み取る</Term>だけで書き換えません。この「上から下へ、一方向に流れる」性質が、Reactでデータの動きを追いやすくしている土台です。ここではpropsの受け渡し、その限界(props drilling)、そしてchildrenによる合成を見ます。
        </Lead>
      </Hero>

      <Heading num="01">propsは読み取り専用</Heading>
      <p>子コンポーネントは受け取ったpropsを<Term>変更してはいけません</Term>。propsは親が所有するデータであり、子はその写しを表示するだけです。値を変えたいときは、変更する手段(コールバック関数)もpropsとして親から受け取り、更新は親に依頼します。これは<Link href="/dev/frontend/react/functional">関数型</Link>の「引数を破壊しない純粋関数」と同じ規律です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: propsを書き換える
function Item({ todo }: { todo: Todo }) {
  todo.done = true;   // 親のデータを勝手に壊している
  return <li>{todo.title}</li>;
}

// OK: 変更は親から渡された関数に依頼する
function Item({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  return <li onClick={() => onToggle(todo.id)}>{todo.title}</li>;
}`}</code>
      </pre>

      <Heading num="02">一方向データフロー</Heading>
      <p>データは常に<Term>親 → 子</Term>の一方向に流れます。子が親の状態を変えたいときは、直接触るのではなく、親が渡したコールバックを呼び出して「変更を依頼」します。データは下りていき、変更の合図は関数呼び出しとして上っていく ― この一定の流れがあるおかげで、「今の画面がなぜこうなっているか」を親の状態からたどって説明できます。</p>
      <table>
        <thead>
          <tr><th>方向</th><th>手段</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">親 → 子（データ）</td><td>props</td><td><code>{`<Item todo={todo} />`}</code></td></tr>
          <tr><td className="hl">子 → 親（変更依頼）</td><td>コールバックprops</td><td><code>{`onToggle={handleToggle}`}</code></td></tr>
        </tbody>
      </table>

      <Heading num="03">props drillingとその限界</Heading>
      <p>propsは隣接する親子でしか受け渡せません。深い階層の子に値を届けるには、<Term>途中のコンポーネント全部</Term>を経由してバケツリレーする必要があります。これを<Term>props drilling(prop の掘り下げ)</Term>と呼びます。中間のコンポーネントは、自分では使わないpropsをただ下へ流すためだけに受け取ることになり、見通しが悪くなります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// user を深い Avatar まで届けるため、Layout も Header も
// 自分では使わない user を素通しさせられている
<Page user={user}>
  <Layout user={user}>
    <Header user={user}>
      <Avatar user={user} />   {/* ようやくここで使う */}
    </Header>
  </Layout>
</Page>`}</code>
      </pre>
      <p>2〜3階層なら素直で問題ありません。しかし多くの中間層を貫くようになったら、階層をまたいで値を配れる<Link href="/dev/frontend/react/context">Context</Link>や、それを土台にした<Link href="/dev/frontend/react/composition">composition</Link>の出番です。</p>

      <Heading num="04">childrenで「中身」を受け取る</Heading>
      <p>特別なprops<Term>children</Term>を使うと、コンポーネントの開始タグと終了タグの間に書いた要素を受け取れます。これにより「枠だけを提供し、中身は使う側が差し込む」という合成が可能になります。中身を知らないまま包めるので、汎用的なレイアウト部品を作れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-4">{children}</div>;
}

// 使う側が中身を自由に差し込む
<Card>
  <h3>タイトル</h3>
  <p>本文</p>
</Card>`}</code>
      </pre>

      <Heading num="05">スロット的なprops</Heading>
      <p>差し込みたい場所が複数あるなら、<code>children</code>1つでは足りません。<code>header</code>・<code>footer</code>のように<Term>JSXを受け取るprops</Term>を用意すれば、「名前付きの差し込み口(スロット)」として複数箇所を外から埋められます。1つの中身なら<code>children</code>、複数箇所ならスロットprops、と使い分けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function Dialog({ header, children, footer }: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
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

      <Analogy label="💡 たとえるなら">
        一方向データフローは「会社の指揮系統」に似ています。指示(データ)は上司から部下へ下りていき、部下が方針を変えたいときは勝手に書き換えず「稟議(コールバック)」を上げて上司に決めてもらう。props drillingは、宛先の部署へ書類を届けるのに、間の全部署のデスクを経由させられる状態です。childrenは「中身は差出人が自由に入れてください」と渡す封筒 ― 封筒(枠)側は中身を知らなくても運べます。
      </Analogy>

      <Heading num="まとめ">下へ流し、変更は上へ依頼する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>propsは読み取り専用</h4><p>子は変更しない。更新はコールバックで親に依頼する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>深いバケツリレーはdrilling</h4><p>多層を貫くならContextやcompositionに切り替える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>childrenとスロットで合成</h4><p>単一の中身はchildren、複数箇所は名前付きスロットprops。</p></Card>
      </CardGrid>
      <p>propsが「外から渡される入力」なのに対し、コンポーネントが内部で持つ変化する値が<Link href="/dev/frontend/react/state">State</Link>です。次に見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/state" tag="開発">Stateと更新</RelatedLink>
            <RelatedLink href="/dev/frontend/react/context" tag="開発">Context</RelatedLink>
            <RelatedLink href="/dev/frontend/react/composition" tag="開発">コンポーネントを組み合わせる</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
