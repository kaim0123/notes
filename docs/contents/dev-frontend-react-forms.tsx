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
  Mark,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "フォームの値を管理する",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Controlled Component", desc: "フォーム要素の値をReactのstateで管理し、常に単一の情報源(source of truth)を保つ" },
  { name: "Uncontrolled Component", desc: "DOM自身に値を持たせ、refを通じて必要なときだけ読み取る" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; パターン</Eyebrow>
        <h1>フォームの値を管理する ― ControlledとUncontrolled</h1>
        <Lead>
          フォームの入力値を「誰が本当の値を持つか」で分ける2つの技法です。<Link href="/dev/frontend/react/composition">前ページ</Link>のCompound Components・Provider PatternはコンポーネントをどうやってUI用途に組み合わせるかの話でしたが、この2つはさらに一段下のレベル、input1つの値をどう管理するかという話です。
        </Lead>
      </Hero>

      <Heading num="01">2つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Controlled Component ― Reactのstateを唯一の情報源にする</Heading>
      <p><Term>Controlled Component</Term>は、input要素の<code>value</code>をReactのstateに束縛し、<code>onChange</code>で更新する形です。DOMのinputはあくまで「stateを映す鏡」でしかなく、値は常にReact側にあります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function EmailField() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValid && <p>正しいメールアドレスを入力してください</p>}
    </div>
  );
}`}</code>
      </pre>
      <p>値がstateとして常に手元にあるため、入力の都度バリデーションを表示したり、他の入力(確認用フィールドなど)と同期させたりする処理が書きやすくなります。反面、1文字入力するたびにコンポーネントが再レンダリングされます。</p>

      <Heading num="03">Uncontrolled Component ― DOMに値を持たせ、refで必要な時だけ読む</Heading>
      <p><Term>Uncontrolled Component</Term>は、値の管理をDOM自身に任せ、Reactのstateを更新しません。<code>ref</code>を通じて、送信などの必要なタイミングだけ値を読み取ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function EmailField() {
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const email = emailRef.current?.value ?? "";
    console.log(email);
  }

  return (
    <div>
      <input ref={emailRef} defaultValue="" />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}`}</code>
      </pre>
      <p>入力のたびに再レンダリングが起きないため、大量のフィールドを持つフォームでも軽快に動きます。<code>react-hook-form</code>のような外部フォームライブラリも、内部的にはこの考え方でパフォーマンスを確保しています。</p>

      <Heading num="04">どちらを選ぶか</Heading>
      <p>入力中にリアルタイムでバリデーションを表示したい、他の入力と値を同期させたい、入力値を使ってUIの見た目を即座に変えたい ― こうした要件があるならControlledが素直です。一方、フィールド数が多い・パフォーマンスが気になる・送信時にまとめて検証すれば十分、という場合はUncontrolled(またはそれを内包するフォームライブラリ)が向いています。1つのフォームの中で、フィールドごとに両者を混在させても問題ありません。</p>

      <Analogy label="💡 たとえるなら">
        Controlled Componentは「記入者が書いた文字を、その都度秘書がノートに書き写して管理する」方式です。1文字ごとに秘書がチェックできる反面、書くたびに手間がかかります。Uncontrolled Componentは「記入者が自分の手元の紙に自由に書き込み、提出されたときだけ内容を確認する」方式です。途中経過には関与しない分、記入者は自由に書き進められます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Controlled Component</h4><p>Reactのstateが値の本体。リアルタイムな検証・同期がしやすい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Uncontrolled Component</h4><p>DOMが値の本体。refで必要な時だけ読み取り、再レンダリングを避ける。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/react/composition" tag="開発">コンポーネントを組み合わせる</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">ロジックを再利用する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
