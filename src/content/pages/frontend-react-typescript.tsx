import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "TypeScriptでコンポーネントを書く" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>TypeScriptでコンポーネントを書く ― propsは取扱説明書</h1>
        <Lead>
          <Link href="/frontend/react-functional">前ページ</Link>で見た「propsを受け取りJSXを返す関数」に、型を与えます。propsの型は<Term>そのコンポーネントの取扱説明書</Term>であり、渡し間違いをコンパイル時に弾いてくれます。ここでは実務でほぼ必ず使う型付けを、順に押さえます。
        </Lead>
      </Hero>

      <Heading num="01">propsの型 ― まずはこの形</Heading>
      <p>
        関数コンポーネントは「propsオブジェクトを1つ受け取る関数」です。その引数に型を付け、分割代入で受け取るのが基本形になります。
      </p>

      <pre>
        <code>{`type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;      // オプショナル
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}`}</code>
      </pre>

      <p>
        <code>type</code>と<code>interface</code>はどちらでも書けます。合成が要るなら<code>type</code>、素直な拡張を重視するなら<code>interface</code> ― プロジェクトで揃っていれば十分です。
      </p>

      <Heading num="02">childrenの型</Heading>
      <p>
        別の要素を包むコンポーネントは<code>children</code>を受け取ります。「JSXとして描画できるものすべて」を表す<code>ReactNode</code>が基本です。単一の要素に限定したいときだけ、より狭い型を使います。
      </p>

      <pre>
        <code>{`import type { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
// ReactNode は文字列・数値・要素・配列・null など描画できる値をすべて許容する`}</code>
      </pre>

      <Heading num="03">取りうる状態だけを表現する</Heading>
      <p>
        「種類によって必要なpropsが変わる」コンポーネントは、共通の判別フィールドを持つ<Term>ユニオン</Term>で表現します。真偽値を並べる設計と比べたときの差は、ありえない組み合わせを<Term>そもそも書けなくする</Term>点にあります。
      </p>

      <DiagramFrame
        slug="frontend-react-ts-union"
        aspect="640 / 300"
        caption="真偽値を並べた型と判別可能なユニオンを比べた図。左側では3つの独立した真偽値でコンポーネントの状態を表しており、組み合わせは8通りある。そのうち意味があるのは3通りだけで、残りの5通りは表現できてしまうが定義されていない状態になる。右側では取りうる状態を1つの列挙で表しており、状態は3通りしかなく、それぞれに必要な値だけが型に現れる。読み込み中なら進捗、成功ならデータ、失敗ならエラーと再試行の関数、という具合に、状態と一緒に必要な値が結び付いている。ありえない組み合わせを型として書けなくすることが、この設計の効きどころ。"
      />

      <pre>
        <code>{`type AlertProps =
  | { variant: "info"; message: string }
  | { variant: "error"; message: string; retry: () => void };

function Alert(props: AlertProps) {
  // variant で分岐すると、その分岐の中でだけ retry が型に現れる
  if (props.variant === "error") {
    return <button onClick={props.retry}>{props.message}</button>;
  }
  return <p>{props.message}</p>;
}`}</code>
      </pre>

      <p>
        同じ考え方は非同期の状態にも効きます。<code>isLoading</code>・<code>data</code>・<code>error</code>を独立に持つと「読み込み中なのにデータもエラーもある」という状態が表現できてしまいます。1つの列挙にまとめれば、<Term>その状態のときに存在する値だけが型に現れます</Term>。
      </p>

      <Heading num="04">中身の型を使う側に決めさせる</Heading>
      <p>
        リストのように「中身の型が使う側で決まる」コンポーネントは<Term>ジェネリック</Term>にします。要素の型と描画関数の型が連動するので、使う側は型注釈なしで正しい推論を得られます。
      </p>

      <pre>
        <code>{`function List<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => ReactNode;
}) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}

// 使う側: user は User 型だと推論される
<List items={users} render={(user) => user.name} />;`}</code>
      </pre>

      <Heading num="05">イベントとrefの型</Heading>
      <p>
        イベントハンドラの引数は、<Term>どの要素の、どのイベントか</Term>を指定します。そうすると値の型が正しく付きます。
      </p>

      <table>
        <thead>
          <tr><th>用途</th><th>型</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力の変更</td><td><code>ChangeEvent&lt;HTMLInputElement&gt;</code></td></tr>
          <tr><td className="hl">クリック</td><td><code>MouseEvent&lt;HTMLButtonElement&gt;</code></td></tr>
          <tr><td className="hl">フォーム送信</td><td><code>FormEvent&lt;HTMLFormElement&gt;</code></td></tr>
          <tr><td className="hl">DOMへのref</td><td><code>useRef&lt;HTMLInputElement&gt;(null)</code></td></tr>
        </tbody>
      </table>

      <Heading num="06">既存要素の型を借りる</Heading>
      <p>
        「標準のボタンと同じpropsを全部受け取りつつ、少し足したい」ときは、型を手書きせず借りてきます。膨大な属性を漏れなく引き継げます。
      </p>

      <pre>
        <code>{`import type { ComponentProps } from "react";

// button の全プロパティ + 独自の variant
type Props = ComponentProps<"button"> & { variant: "primary" | "ghost" };

function Button({ variant, ...rest }: Props) {
  return <button className={variant} {...rest} />;
}`}</code>
      </pre>

      <Aside label="⚠️ asは最後の手段">
        型が合わないときに<code>as</code>で押し通すのは、<Term>型チェックを黙らせるだけ</Term>で実行時の安全は何も保証しません。多用すると型と実際の値がずれ、型を書いている意味そのものが失われます。合わないときは、まず<strong>型のほうが現実を正しく写しているか</strong>を疑うほうが早い場合が多くあります。
      </Aside>

      <Analogy label="💡 たとえるなら">
        propsの型は差込口の形状規格です。合わないプラグは挿さらない ― だから間違えようがありません。<code>as</code>で型を上書きするのは、規格の合わないプラグを変換アダプタで無理やり差し込むようなもの。挿さりはしますが、電圧が合っているかは誰も保証してくれません。
      </Analogy>

      <Heading num="まとめ">型で、間違いを書けなくする</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>propsに型、childrenはReactNode</h4>
          <p>渡し間違いをコンパイル時に弾く。包む系の型は迷わなくてよい。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ありえない状態を表現不能にする</h4>
          <p>真偽値を並べず、取りうる状態を1つの列挙にまとめる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>既存の型は借りる</h4>
          <p>手書きすると必ず漏れる。<code>as</code>は最後の手段。</p>
        </Card>
      </CardGrid>

      <p>
        型が付いたコンポーネントが、実際にどう<Link href="/frontend/react-jsx">JSXとして描画される</Link>のかを次に見ていきます。型の一般論は<Link href="/language/js-types">型を使いこなす</Link>にあります。
      </p>

      <DocsFooter href="/frontend/react-typescript" />
    </DocsPage>
  );
}
