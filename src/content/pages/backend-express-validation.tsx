import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "バリデーション" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>バリデーション ― 境界で検証し、中を単純に保つ</h1>
        <Lead>
          <Link href="/backend/express-request">届いた値</Link>は、<Term>信頼できない入力</Term>です。必須項目が空だったり、数値のはずが文字列だったり、悪意ある値が混ざっていたりします。これを本体やデータベースへ流し込む前に検証し、条件を満たさないものは早い段階で返す ― それがバリデーションです。
        </Lead>
      </Hero>

      <Heading num="01">入口で止めるほど、傷が浅い</Heading>
      <p>
        不正な入力を素通しすると、被害は下流ほど深くなります。
      </p>

      <table>
        <thead>
          <tr><th>検証しないと</th><th>検証すると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">空の必須項目が保存され、壊れたデータが残る</td><td>入口で弾き、保存されるものは常に整合する</td></tr>
          <tr><td className="hl">数値でない値が計算に混ざり、静かに伝播する</td><td>型が合わない時点で拒否する</td></tr>
          <tr><td className="hl">本体が防御的な条件分岐だらけになる</td><td>本体は「正しい入力」だけを前提に書ける</td></tr>
        </tbody>
      </table>

      <p>
        3行目が本質です。<Term>検証は、その先のコードを単純にするために行います</Term>。壊れたデータが保存されるのを防ぐだけなら、データベースの制約でも足ります。しかし本体を単純に保てるのは、境界で形を保証したときだけです。
      </p>

      <DiagramFrame
        slug="backend-express-validation-boundary"
        aspect="640 / 320"
        caption="検証が境界の内と外を分ける線であることを示した図。左の外側では、届いた値は型も範囲も保証されておらず、文字列かもしれず配列かもしれず欠けているかもしれない。中央の検証を通らなかったものはその場で400として返される。右の内側には形が保証された値だけが流れるので、中の処理は防御的な条件分岐を書かずに済む。下部には、スキーマを1つ書くと実行時の検証とコンパイル時の型が同時に手に入り、同じ定義から導かれるので食い違いが起きないことが示されている。"
      />

      <Heading num="02">まず手書きで理解する</Heading>
      <pre>
        <code>{`app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name は必須です" });
  }
  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ error: "age は0以上の数値です" });
  }

  // ここから先は「検証済みの正しい入力」だけが流れてくる
  res.status(201).json({ name, age });
});`}</code>
      </pre>

      <p>
        考え方は明快ですが、項目が増えるほど条件分岐が積み重なり、同じような検証があちこちに散らばります。これを宣言的にまとめるのが専用のライブラリです。
      </p>

      <Heading num="03">スキーマから、検証と型の両方を導く</Heading>
      <p>
        TypeScriptで書くなら、いま最も相性が良いのが<Term>スキーマを1つ定義して、そこから両方を導く</Term>やり方です。
      </p>

      <pre>
        <code>{`import { z } from "zod";

const CreateUser = z.object({
  name: z.string().min(1),
  age:  z.number().int().nonnegative(),
});

// スキーマから型を導ける ― 定義は1つだけ
type CreateUser = z.infer<typeof CreateUser>;

app.post("/users", (req, res) => {
  const result = CreateUser.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  // result.data は CreateUser 型として扱える
  res.status(201).json(result.data);
});`}</code>
      </pre>

      <p>
        導いた型は、スキーマと<Term>常に一致します</Term>。検証ルールを直せば型も自動で追従するので、「検証はしたが型がずれている」という食い違いが起きません。これは<Link href="/language/js-types">型を使いこなす</Link>で見た「型は満たすべき契約」という考え方を、<Term>実行時の境界にまで広げたもの</Term>と言えます。
      </p>

      <Aside label="例外を投げる形と、結果を返す形">
        多くのライブラリは2つの呼び方を持ちます。失敗時に例外を投げる形と、成否を含む結果を返す形です。前者を使うなら、投げた例外を<Link href="/backend/express-error">エラー用の段</Link>で受けて400に変換しておくと、<Term>検証エラーの応答も1箇所に集約できます</Term>。エラーの集約とバリデーションは、こうしてつながります。
      </Aside>

      <Heading num="04">返す形を揃える</Heading>
      <p>
        どのライブラリを使っても、失敗の応答は<Term>400</Term>に統一します。コードで「呼ぶ側の入力が悪い」ことを示し、本文で<Term>どの項目がなぜ弾かれたか</Term>を伝えます。
      </p>

      <table>
        <thead>
          <tr><th>状況</th><th>ステータス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力の形式・型が不正</td><td>400</td></tr>
          <tr><td className="hl">認証が無い・切れている</td><td>401</td></tr>
          <tr><td className="hl">権限が足りない</td><td>403</td></tr>
          <tr><td className="hl">サーバー側の想定外の失敗</td><td>500</td></tr>
        </tbody>
      </table>

      <p>
        項目ごとのエラーを返す形は、画面側の実装を大きく左右します。<Term>どの入力欄が悪いのかが分かる形</Term>で返せば、画面はその欄の下にメッセージを出せます。まとめて1文で返すと、それができません ― <Link href="/backend/express-design">API設計</Link>で扱うエラー形式の統一は、ここから始まります。
      </p>

      <Analogy label="💡 たとえるなら">
        建物の入口に立つ受付です。書類に不備があれば「ここが空欄です」とその場で指摘し、中には通しません。もし素通りさせて、不備を各部署が個別に発見していたら、対応はバラバラになり、不備のある書類が奥まで届いてしまいます。<Term>入口で一度きちんと確かめるからこそ、中の人たちは正しい書類しか来ない前提で仕事に集中できます</Term>。
      </Analogy>

      <Heading num="まとめ">境界で保証し、中を単純に</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>入口で弾く</h4>
          <p>信頼できない入力は、本体に届く前に検証して早く返す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>定義は1つにする</h4>
          <p>スキーマから検証と型の両方を導き、食い違いを無くす。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>どの項目が悪いかを返す</h4>
          <p>まとめて1文にすると、画面側が欄ごとに示せなくなる。</p>
        </Card>
      </CardGrid>

      <p>
        入力を守れたら、次はサーバーが「いま何をしているか」を記録する番です。<Link href="/backend/express-logging">ログ</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-validation" />
    </DocsPage>
  );
}
