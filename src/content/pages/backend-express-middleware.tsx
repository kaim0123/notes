import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ミドルウェア" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ミドルウェア ― 進めるか、止めるか</h1>
        <Lead>
          <Link href="/backend/express">Expressの心臓部</Link>です。ログ・認証・本文の解釈といった<Term>横断的な関心事</Term>を、各ハンドラにコピーするのではなく、一度書けば全体に効く形にできます。制御はすべて、<Term>次へ進むかどうか</Term>という1つの選択に集約されています。
        </Lead>
      </Hero>

      <Heading num="01">ハンドラとの違いは引数1つ</Heading>
      <p>
        ハンドラが2つの引数を受け取るのに対し、ミドルウェアは<code>next</code>という第3引数が加わった形の関数です。リクエストがハンドラへ届く前に呼ばれ、下ごしらえを済ませてから次へバトンを渡します。
      </p>
      <p>
        実のところ、Expressにおける処理の流れは<Term>ほとんどがミドルウェアの連なり</Term>です。ルートハンドラ自身も、その最後の一段と見なせます。Expressは「登録されたものを順に呼んでいくだけ」の薄い仕組みだと言えます。
      </p>

      <Heading num="02">結末は4つしかない</Heading>
      <DiagramFrame
        slug="backend-express-mw-outcomes"
        aspect="640 / 320"
        caption="1つのミドルウェアが取りうる4つの結末を示した図。次を呼べばパイプラインの次の段へ進む。応答を返して次を呼ばなければ、そこで処理が正しく打ち切られる(認証で弾く場合がこれ)。エラーを渡せば、通常の段をすべて飛ばしてまとめて受け止める段へ一気に移る。そしてそのどれもしなかった場合は、次へ進まず応答も返らないまま、ただ止まる。この4本目だけが警告色で示され、呼び出した側から見るとエラーですらなく、ただ返事が来ない状態になることが下部に注記されている。"
      />

      <pre>
        <code>{`// すべてのリクエストが通る
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();                                    // ① 次へ進む
});

// 条件を満たさなければ、次を呼ばず応答して打ち切る
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "unauthorized" });   // ② ここで終了
  }
  next();
}`}</code>
      </pre>

      <p>
        書くときの確認事項はこれだけです ― <Term>必ず3つのうちどれか1つを通る</Term>。どれも通らない経路があると、そのリクエストは応答が返らないまま止まります。
      </p>

      <Heading num="03">登録した順に通る</Heading>
      <p>
        最も重要な原則です。書いた<Term>順番がそのまま実行順</Term>になります。だから「本文を解釈してから認証する」といった順序関係は、コードの並び順で表現します。
      </p>

      <table>
        <thead>
          <tr><th>登録順</th><th>役割</th><th>この順である理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1. ログ出力</td><td>すべてのアクセスを記録</td><td>最初に通せば漏れなく記録できる</td></tr>
          <tr><td className="hl">2. 本文の解釈</td><td>リクエスト本文を読める形にする</td><td>後段が本文を使う前に必要</td></tr>
          <tr><td className="hl">3. 認証の確認</td><td>正当なリクエストか判定</td><td>ハンドラに入る前に弾く</td></tr>
          <tr><td className="hl">4. ルートハンドラ</td><td>本来の処理</td><td>下ごしらえが済んだ最後</td></tr>
        </tbody>
      </table>

      <p>
        認証がハンドラより<Term>後ろ</Term>にあれば、認証前にハンドラが動いてしまいます。<Link href="/backend/express-routing">ルートの照合順序</Link>と同じで、<Term>上から下へ流れる</Term>ことを常に頭に置くのが、Expressを読み書きするコツです。
      </p>

      <Heading num="04">効かせる範囲を選ぶ</Heading>
      <pre>
        <code>{`// (1) アプリ全体 ― すべてのリクエストが通る
app.use(express.json());

// (2) ルート単位 ― この1本だけを通す
app.get("/private", requireAuth, (req, res) => {
  res.json({ secret: true });
});

// (3) 連鎖 ― 左から順に実行される
app.post("/posts", requireAuth, validateBody, (req, res) => {
  res.status(201).json({ created: true });
});`}</code>
      </pre>

      <p>
        ハンドラの前に<Term>いくつでも並べられる</Term>のが要点です。共通処理を細かい関数に分け、ルートごとに必要なものだけを組み合わせる ― これがExpressの構成の基本になります。<Link href="/backend/express-router">ルーター単位</Link>で効かせる形も、この延長にあります。
      </p>

      <Heading num="05">エラー用は引数4つ</Heading>
      <p>
        Expressは、引数を<Term>4つ</Term>取る関数を特別に扱います。どこかで<code>next(err)</code>のようにエラーを渡すと、通常の段を飛ばしてここまで一気に移ります。
      </p>

      <pre>
        <code>{`// 引数が4つ → Express はこれをエラー用と認識する
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});`}</code>
      </pre>

      <p>
        これにより、各ハンドラにエラー応答をばらまくのではなく<Term>1箇所にまとめられます</Term>。登録位置は他より後ろ ― 通常はいちばん最後です。
      </p>

      <Aside label="ここでは形だけ">
        エラーの渡し方、独自のエラー型、見つからない場合との切り分けは<Link href="/backend/express-error">エラーハンドリング</Link>で扱います。ここでは「引数4つの関数がエラー専用になる」という約束だけ押さえれば十分です。
      </Aside>

      <Heading num="06">合成の骨格と、命令的な中身</Heading>
      <p>
        この連なりは、本質的には「小さな関数を順につないで大きな処理を作る」構造です。<Link href="/design/paradigm-functional-composition">関数の合成</Link>や、責任を次へ委ねる設計パターンと同じ発想で、設計の視点では<Link href="/design/architecture-pipeline">パイプラインアーキテクチャ</Link>の一例と見ることもできます。
      </p>
      <p>
        ただしExpress自体は関数型ではありません。各段は<Term>同じオブジェクトを書き換えながら受け渡します</Term> ― 認証の段が利用者情報を生やし、後段がそれを読む、という具合です。<Term>合成の骨格を持ちつつ、中身は命令的</Term>という混ざり方を理解しておくと、実際のコードが読みやすくなります。
      </p>

      <Analogy label="💡 たとえるなら">
        目的の部署にたどり着く前に全員が通るチェックポイントの列です。順番に並んでいて、各ポイントは自分の確認を済ませたら「どうぞ次へ」と通します。条件を満たさない人はそこで引き返してもらう。そして<Term>通しも止めもしない係員がいると、その人は廊下で待ち続けることになります</Term>。
      </Analogy>

      <Heading num="まとめ">1つの選択で流れが決まる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>進めるか、止めるか</h4>
          <p>次を呼ぶ・応答する・エラーを渡す。どれも通らない経路を作らない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>登録順が実行順</h4>
          <p>順序関係は、コードの並び順で表現する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>範囲を選べる</h4>
          <p>全体・ルーター単位・ルート単位。エラー用だけは引数4つ。</p>
        </Card>
      </CardGrid>

      <p>
        次は、このパイプラインを使ってデータをやり取りします。<Link href="/backend/express-json">JSON API</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-middleware" />
    </DocsPage>
  );
}
