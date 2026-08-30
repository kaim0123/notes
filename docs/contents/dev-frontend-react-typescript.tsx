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
  title: "TypeScriptでコンポーネントを書く",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; 基礎</Eyebrow>
        <h1>TypeScriptでコンポーネントを書く ― propsとイベントに型を付ける</h1>
        <Lead>
          <Link href="/dev/frontend/react/functional">前ページ</Link>で見た「propsを受け取りJSXを返す関数」に、<Link href="/dev/language">TypeScript</Link>で型を与えます。propsの型はそのコンポーネントの取扱説明書になり、渡し間違いをコンパイル時に弾いてくれます。ここではprops・children・イベント・refという、実務でほぼ必ず使う型付けを順に押さえます。
        </Lead>
      </Hero>

      <Heading num="01">propsの型定義 ― まずはこの形</Heading>
      <p>関数コンポーネントは「propsオブジェクトを1つ受け取る関数」です。その引数に<code>type</code>か<code>interface</code>で型を付け、分割代入で受け取るのが基本形です。オプショナルは<code>?</code>、デフォルト値は分割代入時に指定します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;      // オプショナル
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}`}</code>
      </pre>
      <p><code>type</code>と<code>interface</code>はどちらでも書けます。ユニオンや交差など柔軟な合成が要るなら<code>type</code>、宣言のマージや素直な拡張を重視するなら<code>interface</code>、と使い分ければ十分です。</p>

      <Heading num="02">childrenの型</Heading>
      <p>コンポーネントで別の要素を包むときは、<code>children</code>を受け取ります。「JSXとして描画できるものすべて」を表す<code>React.ReactNode</code>を使うのが基本です。単一のReact要素に限定したいときだけ<code>ReactElement</code>を使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import type { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
// ReactNode は文字列・数値・要素・配列・null など描画可能な値をすべて許容する`}</code>
      </pre>

      <Heading num="03">discriminated union ― variantを型で縛る</Heading>
      <p>「種類によって必要なpropsが変わる」コンポーネントは、共通の<Term>判別用フィールド</Term>を持つユニオン(<Term>discriminated union</Term>)で表現します。ありえない組み合わせを型レベルで禁止でき、boolean propsの乱立も防げます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Alert =
  | { variant: "info"; message: string }
  | { variant: "error"; message: string; retry: () => void };

function Alert(props: Alert) {
  // variant で分岐すると、その分岐内でだけ retry が型に現れる
  if (props.variant === "error") {
    return <button onClick={props.retry}>{props.message}</button>;
  }
  return <p>{props.message}</p>;
}`}</code>
      </pre>

      <Heading num="04">ジェネリックコンポーネント</Heading>
      <p>リストのように「中身の型が使う側で決まる」コンポーネントは<Term>ジェネリック</Term>にします。型引数<code>T</code>を受け取り、要素の型と描画関数の型を連動させることで、使う側は型注釈なしで正しい推論を得られます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function List<T>({ items, render }: { items: T[]; render: (item: T) => React.ReactNode }) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}

// 使う側: user は User 型だと推論される
<List items={users} render={(user) => user.name} />;`}</code>
      </pre>

      <Heading num="05">イベントとrefの型</Heading>
      <p>イベントハンドラの引数は、要素とイベントの種類に応じた型を使います。<code>ChangeEvent&lt;HTMLInputElement&gt;</code>のように「どの要素の・どのイベントか」を指定すると、<code>e.target.value</code>などが正しく型付けされます。refは対象のDOM要素型を渡します。</p>
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
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value); // string と分かる
}

const inputRef = useRef<HTMLInputElement>(null);`}</code>
      </pre>

      <Heading num="06">既存要素の型を借りる ― ComponentProps</Heading>
      <p>「標準の<code>&lt;button&gt;</code>と同じpropsを全部受け取りつつ、少し足したい」ときは、型を手書きせず<code>ComponentProps</code>で借りてきます。HTML要素の膨大な属性を漏れなく引き継げます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import type { ComponentProps } from "react";

// button の全プロパティ + 独自の variant
type Props = ComponentProps<"button"> & { variant: "primary" | "ghost" };

function Button({ variant, ...rest }: Props) {
  return <button className={variant} {...rest} />;
}`}</code>
      </pre>
      <p>型が合わないときに<code>as</code>で押し通すのは最後の手段です。<code>as</code>は「型チェックを黙らせる」だけで実行時の安全は保証しないため、多用すると型と実際の値がずれ、TypeScriptの利点を自ら手放すことになります。</p>

      <Analogy label="💡 たとえるなら">
        propsの型は、部品に付いた「差込口の形状規格」です。USB-Cの口にUSB-Aは挿さらない ― 同じように、型の合わないpropsはコンパイル時に弾かれます。<code>as</code>で型を上書きするのは、規格の合わないプラグを無理やり差し込むために変換アダプタを噛ませるようなもの。動くこともありますが、本当に電圧が合っているかは誰も保証してくれません。
      </Analogy>

      <Heading num="まとめ">型はコンポーネントの取扱説明書</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>propsに型を、childrenはReactNode</h4><p>渡し間違いをコンパイル時に弾く。包む系はReactNode。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>variantはdiscriminated union</h4><p>ありえない組み合わせを型で禁止し、boolean乱立を防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ComponentPropsで借り、asは避ける</h4><p>既存要素の型を再利用し、型の握りつぶしに頼らない。</p></Card>
      </CardGrid>
      <p>型が付いたコンポーネントが、実際にどう<Link href="/dev/frontend/react/jsx">JSXとして描画される</Link>のかを次に見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/language" tag="開発">JavaScript・TypeScript</RelatedLink>
            <RelatedLink href="/dev/frontend/react/props" tag="開発">Propsと一方向データフロー</RelatedLink>
            <RelatedLink href="/dev/frontend/react/jsx" tag="開発">JSXとレンダリング</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
