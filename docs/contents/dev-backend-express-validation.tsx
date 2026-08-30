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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "バリデーション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>バリデーション ― 不正な入力を早い段階で弾く</h1>
        <Lead>
          クライアントから届く<code>req.body</code>や<code>req.query</code>は、<Term>信頼できない入力</Term>です。フォームの必須項目が空だったり、数値のはずが文字列だったり、悪意ある値が混ざっていたりします。これをハンドラの本体やデータベースへ流し込む前に検証し、条件を満たさないリクエストは早い段階で<Term>400 Bad Request</Term>として返す ― それが<Term>バリデーション</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">なぜ必要か ― 入口で止めるほど傷が浅い</Heading>
      <p>不正な入力を素通しすると、被害は下流ほど深くなります。型の合わないデータが<Link href="/dev/backend/express/database">データベース</Link>に保存されれば破損データが残り、想定外の値が計算に混ざればバグやクラッシュを招き、検証しない値をそのままクエリに埋め込めば<Term>インジェクション</Term>のような脆弱性にもつながります。だからこそ、リクエストが処理の本体に入る<strong>前</strong>に弾くのが鉄則です。</p>
      <table>
        <thead>
          <tr><th>検証しないと</th><th>検証すると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">空の必須項目がDBに保存される</td><td>入口で400を返し、DBは常に整合が保たれる</td></tr>
          <tr><td className="hl">文字列の<code>&quot;abc&quot;</code>を数値として計算しNaNが伝播</td><td>型が合わない時点で拒否する</td></tr>
          <tr><td className="hl">ハンドラ本体が防御的な<code>if</code>だらけになる</td><td>本体は「正しい入力」だけを前提に書ける</td></tr>
        </tbody>
      </table>

      <Heading num="02">素朴な検証 ― まずは手書きで理解する</Heading>
      <p>ライブラリを使う前に、何をしているのかを手書きで押さえます。必須チェック(値があるか)と型チェック(期待する型か)を<code>if</code>で確かめ、満たさなければ<code>res.status(400)</code>で返すだけです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app.post("/users", (req, res) => {
  const { name, age } = req.body;

  // 必須チェック
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name は必須です" });
  }
  // 型・範囲チェック
  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ error: "age は0以上の数値です" });
  }

  // ここから先は「検証済みの正しい入力」だけが流れてくる
  res.status(201).json({ name, age });
});`}</code>
      </pre>
      <p>考え方は明快ですが、項目が増えるほど<code>if</code>が積み重なり、同じような検証があちこちのハンドラに散らばります。これを宣言的にまとめるのがバリデーションライブラリです。</p>

      <Heading num="03">express-validator ― ミドルウェアとして差し込む</Heading>
      <p><Term>express-validator</Term>は、検証ルールを<Link href="/dev/backend/express/middleware">ミドルウェア</Link>としてルートに差し込む定番ライブラリです。ルールの配列をハンドラの手前に並べ、最後に検証結果をまとめて確認します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { body, validationResult } from "express-validator";

app.post(
  "/users",
  body("name").isString().notEmpty(),
  body("age").isInt({ min: 0 }),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    res.status(201).json(req.body);
  },
);`}</code>
      </pre>
      <p>検証ルールがルート定義の一部として宣言的に読める点が利点です。一方、値の<Term>型</Term>そのものはTypeScriptに伝わらないため、<code>req.body</code>は依然として<code>any</code>寄りのまま扱うことになります。</p>

      <Heading num="04">Zod ― 検証と型を一度に手に入れる</Heading>
      <p>TypeScriptで書くなら、いま最も相性が良いのが<Term>Zod</Term>です。スキーマ(値の形)を一度定義すれば、そこから<strong>実行時の検証</strong>と<strong>コンパイル時の型</strong>の両方が導けます。<code>schema.parse(req.body)</code>は、通れば型のついた値を返し、通らなければ例外を投げます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { z } from "zod";

const CreateUser = z.object({
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
});

// スキーマから TypeScript の型を導出できる
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
      <p><code>z.infer</code>で得た型は、スキーマと<strong>常に一致</strong>します。検証ルールを直せば型も自動で追従するので、「検証はしたが型がずれている」という食い違いが起きません。これは<Link href="/dev/language/types">型を使いこなす</Link>で見た「型は満たすべき契約」という考え方を、実行時の境界にまで広げたものと言えます。</p>
      <Aside label="safeParse と parse">
        <code>parse</code>は失敗時に例外を投げ、<code>safeParse</code>は<code>success</code>付きの結果を返します。<code>parse</code>を使うなら、投げた例外を<Link href="/dev/backend/express/error">エラーハンドリング</Link>のミドルウェアで受けて400に変換すると、検証エラーの応答を一箇所に集約できます。
      </Aside>

      <Heading num="05">エラー返却の形を揃える</Heading>
      <p>どのライブラリを使っても、バリデーション失敗の応答は<Term>400 Bad Request</Term>に統一します。ステータスコードで「クライアント側の入力が悪い」ことを示し、本文でどの項目がなぜ弾かれたかを伝えます。この「エラーの形を揃える」という発想は、次章以降の<Link href="/dev/backend/express/error">エラーハンドリング</Link>や<Link href="/dev/backend/express/design">API設計</Link>と地続きです。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>ステータス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力の形式・型が不正</td><td>400 Bad Request</td></tr>
          <tr><td className="hl">認証が無い・切れている</td><td>401 Unauthorized</td></tr>
          <tr><td className="hl">サーバー側の想定外の失敗</td><td>500 Internal Server Error</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        バリデーションは、建物の入口に立つ受付です。書類に不備があれば「ここが空欄です」とその場で指摘し、中には通しません。もし受付を素通りさせて、書類の不備を各部署が個別に発見していたら、対応はバラバラになり、不備のある書類が奥まで届いてしまいます。入口で一度きちんと確かめるからこそ、中の人たちは「正しい書類しか来ない」前提で仕事に集中できるのです。
      </Analogy>

      <Heading num="まとめ">境界で検証し、中を単純に保つ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>入口で弾く</h4><p>信頼できない入力は、本体やDBに届く前に検証して早期に400で返す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Zodで検証と型を統一</h4><p>スキーマから実行時検証とTypeScriptの型を同時に導き、食い違いを無くす。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>エラーの形を揃える</h4><p>失敗は400に統一し、どの項目がなぜ弾かれたかを一貫した形で返す。</p></Card>
      </CardGrid>
      <p>入力を守れたら、次はサーバーが「いま何をしているか」を記録する番です。次は運用に欠かせない<Link href="/dev/backend/express/logging">ログ</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/error" tag="開発">エラーハンドリング</RelatedLink>
            <RelatedLink href="/dev/backend/express/request" tag="開発">Requestオブジェクト</RelatedLink>
            <RelatedLink href="/dev/backend/express/logging" tag="開発">ログ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
