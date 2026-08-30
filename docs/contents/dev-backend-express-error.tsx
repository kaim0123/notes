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
  title: "エラーハンドリング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>エラーハンドリング ― 失敗を一箇所に集約する</h1>
        <Lead>
          APIは必ず失敗します。DBが落ちる、外部APIがタイムアウトする、想定外の入力が来る。これらのエラー処理を各ハンドラにバラバラに書くと、応答の形が揃わず保守もできません。Expressは、引数を4つ取る特別な<Term>エラーミドルウェア</Term>を用意し、アプリ全体のエラーを<Term>一箇所に集約</Term>する仕組みを持っています。
        </Lead>
      </Hero>

      <Heading num="01">まずは try-catch で捕まえる</Heading>
      <p>ハンドラの中で例外が投げられる可能性がある処理は、<code>try-catch</code>で囲みます。とくに<Link href="/dev/backend/express/async">非同期処理</Link>では、<code>await</code>した処理が失敗すると例外が投げられるため、これを捕まえないとプロセスごとクラッシュしかねません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err); // ← 自分で応答せず、エラーミドルウェアへ委ねる
  }
});`}</code>
      </pre>
      <p>ここでのポイントは、<code>catch</code>の中で<code>res.status(500).json(...)</code>と直接応答を書かないことです。そうすると各ハンドラにエラー応答のコードが散らばってしまいます。代わりに<code>next(err)</code>を呼び、エラーの後始末を専用の場所に<Term>委ねます</Term>。</p>

      <Heading num="02">next(error) ― エラー専用の出口へ渡す</Heading>
      <p>ミドルウェアで学んだ<code>next()</code>は「次の処理へ進む」合図でした。ここに<strong>引数を1つ渡して</strong><code>next(err)</code>と呼ぶと、Expressは通常のミドルウェアやハンドラをすべて飛ばし、<Term>エラーミドルウェア</Term>だけを探して直行します。つまり<code>next(err)</code>は「正常系の流れから抜けて、エラー処理の出口へ向かう」という特別な意味を持ちます。</p>
      <Aside label="投げれば十分な場合も">
        Express 5 以降では、<code>async</code>ハンドラ内で投げられた例外は自動的に<code>next(err)</code>へ回されます。ただし挙動を明示し、バージョン差を意識しないで済むよう、当面は<code>try-catch</code>＋<code>next(err)</code>を明示的に書くのが安全です。
      </Aside>

      <Heading num="03">エラーミドルウェア ― 引数4つの特別な関数</Heading>
      <p>引数を<strong>4つ</strong>（<code>err, req, res, next</code>）取る関数を、Expressは特別に<Term>エラーミドルウェア</Term>として扱います。通常のミドルウェアが3引数だったのに対し、先頭に<code>err</code>が付くのが目印です。これを<strong>すべてのルートを登録したあと、末尾に</strong><code>app.use()</code>で登録します。<code>next(err)</code>で渡ってきたエラーは、ここに集まります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ルート登録より「あと」に置く
app.use((err, req, res, next) => {
  const status = err.statusCode ?? 500;      // カスタムエラーなら固有の番号
  console.error(err);                        // ログには詳細を残す
  res.status(status).json({
    error: err.message ?? "Internal Server Error",
  });
});`}</code>
      </pre>
      <p>これで、どのハンドラで起きたエラーも同じ形式のJSONで返せます。応答の<Term>ステータスコード</Term>や本文の組み立ては<Link href="/dev/backend/express/response">Responseオブジェクト</Link>のとおりで、エラー時もここに一本化されます。登録位置が末尾でなければならないのは、<Link href="/dev/backend/express/middleware">ミドルウェア</Link>が<strong>登録順に評価される</strong>ためです。</p>

      <Heading num="04">カスタムエラー ― 種類ごとに応答を出し分ける</Heading>
      <p>エラーミドルウェアで<code>err.statusCode</code>を見て出し分けるには、エラー側にその情報を持たせておく必要があります。<code>Error</code>を継承した<Term>カスタムエラークラス</Term>を作り、<code>statusCode</code>を持たせるのが定石です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

// 使う側 ― 意味のあるエラーを投げる
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    if (!user) throw new AppError(404, "User not found"); // 存在しないリソース
    res.json(user);
  } catch (err) {
    next(err);
  }
});`}</code>
      </pre>
      <p>こうしておけば、「見つからない＝404」「権限がない＝403」「入力が不正＝400」のように、エラーの<Term>種類</Term>とステータスコードが一対一で対応します。呼び出し側は<code>throw new AppError(...)</code>するだけで、応答の組み立ては集約されたミドルウェアに任せられます。</p>

      <Heading num="05">500 と 404 ― 失敗の性質を区別する</Heading>
      <p>実務でよく混同されるのが、<Term>500</Term>と<Term>404</Term>の違いです。とくに404は「2つの意味」があり、区別が大切です。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>コード</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DB接続失敗・想定外の例外</td><td>500</td><td>サーバー側の異常。異常系。ログに詳細を残す</td></tr>
          <tr><td className="hl">未定義のURL（<code>/foo</code>）</td><td>404</td><td>ルーティング段階で一致するルートがない</td></tr>
          <tr><td className="hl">存在しないリソース（<code>/users/999</code>）</td><td>404</td><td>ルートは合っているがデータが無い。正常系として意図的に返す</td></tr>
        </tbody>
      </table>
      <p>ルーティング段階の404は、すべてのルート定義の<strong>あと・エラーミドルウェアの前</strong>に「どのルートにも一致しなかった」ためのハンドラを置いて返します。一方リソース不在の404は、上のカスタムエラーのように<code>throw new AppError(404, ...)</code>で<Term>意図的に</Term>返すもので、これはバグではなく正常な応答です。500だけはサーバー側の異常なので、ログを厚くして原因を追える状態にしておきます。</p>

      <Analogy label="💡 たとえるなら">
        エラーミドルウェアは、工場の<Term>不良品ライン</Term>です。各工程（ハンドラ）は問題を見つけたら、自分で処分せず「不良」の札を付けて（<code>next(err)</code>）ラインの終端へ流します。終端には検査係が一人だけ立っていて、札の種類（<code>statusCode</code>）を見て「返品」「廃棄」「再検査」と対応を振り分けます。各工程がめいめいに処分方法を判断していたら、対応はバラバラになり、記録も残りません。出口を一つにするからこそ、扱いが揃うのです。
      </Analogy>

      <Heading num="まとめ">エラーは投げて、出口で受ける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>catch したら next(err)</h4><p>ハンドラ内で応答を組み立てず、エラー専用の出口へ委ねる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>4引数のミドルウェアで一元処理</h4><p>末尾に登録し、statusCode を見て応答を組み立てる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>500 と 404 を区別する</h4><p>サーバーの異常か、リソース不在の正常応答かを見分ける。</p></Card>
      </CardGrid>
      <p>エラー処理の器ができたら、そもそも異常なデータを内側に入れないことが次の課題です。次は不正な入力を早い段階で弾く<Link href="/dev/backend/express/validation">バリデーション</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/middleware" tag="開発">ミドルウェア</RelatedLink>
            <RelatedLink href="/dev/backend/express/async" tag="開発">非同期処理</RelatedLink>
            <RelatedLink href="/dev/backend/express/validation" tag="開発">バリデーション</RelatedLink>
            <RelatedLink href="/design/errors" tag="設計">エラー設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
