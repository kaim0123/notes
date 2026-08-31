import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "エラーハンドリング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>エラーハンドリング ― 投げて、出口で受ける</h1>
        <Lead>
          APIは必ず失敗します。データベースが落ちる、外部がタイムアウトする、想定外の入力が来る。これらを各ハンドラにバラバラに書くと、<Term>応答の形が揃わず保守もできません</Term>。Expressは、アプリ全体のエラーを<Term>1箇所に集約</Term>する仕組みを持っています。
        </Lead>
      </Hero>

      <Heading num="01">捕まえたら、自分で応答しない</Heading>
      <p>
        例外が投げられる可能性がある処理は囲みます。<Link href="/backend/express-async">非同期処理</Link>では、待っていたものが失敗すると例外になるため、これを捕まえないと最悪プロセスごと落ちます。
      </p>

      <pre>
        <code>{`app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);   // ← 自分で応答せず、専用の出口へ委ねる
  }
});`}</code>
      </pre>

      <p>
        要点は、捕まえた場所で応答を組み立てないことです。そうすると<Term>各ハンドラにエラー応答のコードが散らばります</Term>。代わりに渡して、後始末を専用の場所に委ねます。
      </p>

      <Heading num="02">エラーを1つの出口へ集める</Heading>
      <p>
        <Link href="/backend/express-middleware">ミドルウェア</Link>で見た「次へ進む」合図に<Term>引数を1つ渡す</Term>と、Expressは通常の段をすべて飛ばし、エラー用の段だけを探して直行します。
      </p>

      <DiagramFrame
        slug="backend-express-error-funnel"
        aspect="640 / 330"
        caption="各ハンドラが自分で応答を組み立てるのではなく、エラーを1つの出口へ集める形を示した図。見つからない場合・権限が足りない場合・想定外の例外という3種類の失敗が、いずれも引数を4つ取る受け止め役へ収束する。受け止め役は種類を見てステータスコードと応答の形を決め、ログには詳細を残し、統一された形の応答を返す。下部には、この形にしないと応答の形が揃わず、記録の粒度もばらばらになり、形式を変えたいときに全ハンドラを直すことになる、と示されている。"
      />

      <pre>
        <code>{`// ルート登録より「あと」に置く
app.use((err, req, res, next) => {
  const status = err.statusCode ?? 500;
  logger.error({ err });                    // ログには詳細を残す
  res.status(status).json({
    code: err.code ?? "internal_error",
    message: status === 500 ? "Internal Server Error" : err.message,
  });
});`}</code>
      </pre>

      <Aside label="500のときは、詳細を返さない">
        上のコードでよく見ると、500のときだけメッセージを固定しています。<Term>想定外の例外のメッセージには、内部の情報が混ざり得る</Term>からです ― テーブル名、ファイルパス、接続文字列。<Term>ログには全部、応答には最小限</Term>が原則です。
      </Aside>

      <Heading num="03">種類ごとに出し分ける</Heading>
      <p>
        出口で出し分けるには、エラー側にその情報を持たせておく必要があります。
      </p>

      <pre>
        <code>{`class AppError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
  }
}

app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    if (!user) throw new AppError(404, "not_found", "User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
});`}</code>
      </pre>

      <p>
        こうしておけば「見つからない＝404」「権限がない＝403」「入力が不正＝400」が一対一で対応します。呼ぶ側は投げるだけで、応答の組み立ては出口に任せられます。<Link href="/backend/layers">層に分けた構成</Link>では、この変換こそが<Term>層の境界の仕事</Term>になります。
      </p>

      <Heading num="04">2種類の404を区別する</Heading>
      <table>
        <thead>
          <tr><th>状況</th><th>コード</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続失敗・想定外の例外</td><td>500</td><td>サーバー側の異常。<strong>ログを厚く</strong></td></tr>
          <tr><td className="hl">未定義のURL</td><td>404</td><td>照合の段階で一致するルートがない</td></tr>
          <tr><td className="hl">存在しないリソース</td><td>404</td><td>ルートは合っているがデータが無い。<strong>正常な応答</strong></td></tr>
        </tbody>
      </table>

      <p>
        照合段階の404は、<Link href="/backend/express-routing">全ルートの後ろ・エラー用の段の前</Link>に受け皿を置いて返します。一方リソース不在の404は<Term>意図的に返すもの</Term>で、バグではありません。この区別は監視にも効きます ― 前者が急増したら誰かが古いURLを叩いており、後者が急増したらデータが消えている可能性がある、と読み分けられます。
      </p>

      <Analogy label="💡 たとえるなら">
        工場の不良品ラインです。各工程は問題を見つけたら自分で処分せず、札を付けて終端へ流します。終端には検査係が一人だけ立っていて、札の種類を見て「返品」「廃棄」「再検査」と対応を振り分けます。<Term>各工程がめいめいに処分方法を判断していたら、対応はバラバラになり、記録も残りません</Term>。出口を1つにするからこそ、扱いが揃います。
      </Analogy>

      <Heading num="まとめ">散らばらせず、集める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>捕まえたら渡す</h4>
          <p>その場で応答を組み立てず、専用の出口へ委ねる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>出口は1つ、末尾に</h4>
          <p>種類を見てコードを決める。ログには全部、応答には最小限。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>500と404を区別する</h4>
          <p>サーバーの異常か、意図した応答か。監視の読み方が変わる。</p>
        </Card>
      </CardGrid>

      <p>
        器ができたら、そもそも異常なデータを内側に入れないことが次の課題です。<Link href="/backend/express-validation">バリデーション</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-error" />
    </DocsPage>
  );
}
