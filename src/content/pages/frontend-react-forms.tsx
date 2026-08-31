import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "フォームの値を管理する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>フォームの値を管理する ― 値の本体はどちらにあるか</h1>
        <Lead>
          フォームの設計は、突き詰めると1つの問いに帰着します ― <Term>入力された値の本体を、Reactが持つのかDOMが持つのか</Term>。この選択が、書き味も性能も検証のタイミングも決めます。ここではその2つの形と、実務での使い分けを見ます。
        </Lead>
      </Hero>

      <Heading num="01">2つの形</Heading>
      <table>
        <thead>
          <tr><th>形</th><th>値の本体</th><th>Reactから見ると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">制御された入力</td><td>Reactのstate</td><td>入力欄はstateを映す鏡にすぎない</td></tr>
          <tr><td className="hl">非制御の入力</td><td>DOM</td><td>必要になったときだけ読みに行く</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="frontend-react-forms-controlled"
        aspect="640 / 300"
        caption="制御された入力と非制御の入力を比べた図。上段の制御された入力では、利用者がキーを押すたびに変更イベントが発生し、Reactのstateが更新され、その値が入力欄へ戻される。1文字ごとに再描画が走るが、値は常にReact側にあるため、入力の途中でも他の表示と連動できる。下段の非制御の入力では、キー入力はDOMの中だけで完結し、Reactは何も知らない。送信のタイミングでrefを通じて値を読み出す。再描画は起きないが、入力の途中で値を使うことはできない。" />

      <Heading num="02">制御された入力</Heading>
      <p>
        入力欄の値をstateに束縛し、変更のたびに更新します。値が常に手元にあるので、<Term>入力の途中でも他の表示と連動できます</Term>。
      </p>

      <pre>
        <code>{`function EmailField() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {!isValid && <p>正しいメールアドレスを入力してください</p>}
    </div>
  );
}`}</code>
      </pre>

      <p>
        代償は、1文字入力するたびに再描画が走ることです。項目が数個なら気になりませんが、数十個のフォームで全体が再描画されると、<Term>入力が目に見えて遅れます</Term>。
      </p>

      <Heading num="03">非制御の入力</Heading>
      <p>
        値の管理をDOMに任せ、送信などの必要なタイミングだけ読み取ります。
      </p>

      <pre>
        <code>{`function EmailField() {
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const email = emailRef.current?.value ?? "";
    console.log(email);
  }

  return (
    <>
      <input ref={emailRef} defaultValue="" />
      <button onClick={handleSubmit}>送信</button>
    </>
  );
}`}</code>
      </pre>

      <p>
        入力のたびの再描画が起きないため、項目が多くても軽快に動きます。フォームライブラリが性能を確保しているのも、内部でこの考え方を採っているからです。
      </p>

      <Aside label="混ぜてよい">
        1つのフォームの中で両方を使って構いません。<Term>入力中に他と連動する必要がある項目だけ制御し、残りはDOMに任せる</Term> ― パスワードの一致確認や、文字数カウンタが付く項目だけを制御にする、という形が実務ではよくあります。「フォーム全体でどちらかに揃える」必要はありません。
      </Aside>

      <Heading num="04">検証をいつ行うか</Heading>
      <p>
        値の持ち方と並んで体験を左右するのが<Term>検証のタイミング</Term>です。早すぎると入力中ずっと赤く、遅すぎると送信して初めて分かります。
      </p>

      <table>
        <thead>
          <tr><th>タイミング</th><th>体験</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力のたび</td><td>打ち始めた瞬間から「不正」と出る。煩わしい</td></tr>
          <tr><td className="hl">欄を離れたとき</td><td>入力を終えてから指摘される。落としどころ</td></tr>
          <tr><td className="hl">送信時</td><td>まとめて分かるが、長いフォームでは戻る距離が遠い</td></tr>
          <tr><td className="hl">一度エラーになった後は入力のたび</td><td>直している最中に消えるので、直った手応えがある</td></tr>
        </tbody>
      </table>

      <p>
        実務での定番は、<Term>欄を離れたときに初めて検証し、以後はその欄だけ入力のたびに更新する</Term>組み合わせです。初回は邪魔をせず、修正中は即座に反応します。
      </p>

      <Heading num="05">検証の定義を1か所にまとめる</Heading>
      <p>
        検証ルールを入力欄ごとに書くと、同じ規則がフォームとサーバーに二重に書かれ、必ずずれます。<Term>スキーマとして1か所に定義し、そこから型も検証も導く</Term>のが現在の定石です。
      </p>
      <p>
        ただし<Link href="/frontend/ux-form">フォーム作成時の注意</Link>で見たとおり、<Term>フロント側の検証は体験のためであって防御ではありません</Term>。同じスキーマをサーバー側でも実行する、という形にして初めて意味を持ちます。
      </p>

      <Heading num="06">送信中の扱い</Heading>
      <p>
        値の管理より事故が多いのが送信まわりです。押した瞬間から結果が返るまでの間に、次の3つを揃えます。
      </p>

      <table>
        <thead>
          <tr><th>やること</th><th>省くとどうなるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">送信中はボタンを無効化する</td><td>連打で二重登録される</td></tr>
          <tr><td className="hl">処理中であることを表示する</td><td>効いたか分からず、利用者がもう一度押す</td></tr>
          <tr><td className="hl">失敗しても入力値を残す</td><td>空のフォームに戻され、離脱する</td></tr>
        </tbody>
      </table>

      <p>
        なお、サーバー側の処理と連携する仕組みを使う場合、送信中かどうかや検証結果を<Term>フレームワークが状態として返してくれます</Term>。自分で真偽値を持つ必要が減るので、使える環境なら任せるほうが漏れがありません。
      </p>

      <Analogy label="💡 たとえるなら">
        制御された入力は、記入者が書いた文字をその都度秘書がノートに書き写す方式です。1文字ごとに確認できる反面、書くたびに手間がかかります。非制御は、記入者が手元の紙に自由に書き込み、提出されたときだけ内容を確認する方式。途中に関与しないぶん、記入者は速く書き進められます。どちらが正しいかではなく、途中経過が要るかどうかで決まります。
      </Analogy>

      <Heading num="まとめ">途中経過が要るかで決まる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>値の本体はどちらか</h4>
          <p>Reactが持てば連動できるが再描画が走る。DOMに任せれば軽いが途中は使えない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>検証は欄を離れてから</h4>
          <p>初回は邪魔をせず、一度エラーになったら入力のたびに更新する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ルールは1か所に</h4>
          <p>スキーマから型も検証も導く。同じものをサーバーでも実行する。</p>
        </Card>
      </CardGrid>

      <p>
        Reactの最後は、送信や取得が<Term>失敗したとき・待っているとき</Term>の設計です。
        <Link href="/frontend/react-boundary">エラー境界とフォールバックUI</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/react-forms" />
    </DocsPage>
  );
}
