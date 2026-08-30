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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ミドルウェア",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>ミドルウェア ― リクエストを順に通すパイプライン</h1>
        <Lead>
          <Term>ミドルウェア</Term>はExpressの心臓部です。リクエストがルートハンドラに届くまでの間に、複数の関数を順番に通していく「パイプライン」を作れます。ログ・認証・ボディ解釈といった<Term>横断的関心事</Term>を、各ハンドラにコピーするのではなく、一度書けば全体に効く仕組み ― それがミドルウェアです。
        </Lead>
      </Hero>

      <Heading num="01">ミドルウェアとは ― ハンドラの前後に挟む共通処理</Heading>
      <p>「<Link href="/dev/backend/express/routing">ルーティング</Link>」で見たハンドラは<code>(req, res)</code>を受け取る関数でした。ミドルウェアはこれに<code>next</code>という第3引数が加わった<code>(req, res, next)</code>という形の関数です。リクエストがハンドラへ届く前に呼ばれ、必要な下ごしらえ(ログ出力・ボディの解釈・認証チェックなど)を済ませてから、<code>next()</code>で次へバトンを渡します。</p>
      <p>Expressにおける「処理の流れ」は、実はほとんどがミドルウェアの連なりです。ルートハンドラ自身も、パイプラインの<Term>最後の一段</Term>と見なせます。つまりExpressは「登録されたミドルウェアを順に呼んでいくだけ」の薄い仕組みだと言えます。</p>
      <Diagram caption="リクエストはミドルウェアを順に通り、最後にルートハンドラへ届く。next()を呼ばなければそこで処理は止まる">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <text x={40} y={55} fill="#9a9a9a" fontSize="11" textAnchor="middle">Request</text>
          <line x1={70} y1={50} x2={110} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowMw)" />
          <rect x={112} y={32} width={110} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={167} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">ログ出力</text>
          <line x1={224} y1={50} x2={258} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowMw)" />
          <rect x={260} y={32} width={110} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={315} y={54} fill="#f2f2f2" fontSize="10" textAnchor="middle">認証チェック</text>
          <line x1={372} y1={50} x2={406} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowMw)" />
          <rect x={408} y={32} width={120} height={36} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={468} y={54} fill="#c9ffd8" fontSize="10" textAnchor="middle">ルートハンドラ</text>
          <line x1={530} y1={50} x2={570} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowMw)" />
          <text x={600} y={55} fill="#9a9a9a" fontSize="11" textAnchor="middle">Response</text>
          <text x={315} y={92} fill="#9a9a9a" fontSize="9" textAnchor="middle">各段で next() を呼ぶと次へ、呼ばなければここで応答を返して終了</text>
          <defs>
            <marker id="arrowMw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Heading num="02">next() ― 次へ進むか、ここで止めるか</Heading>
      <p>ミドルウェアの動きは<code>next()</code>を軸に決まります。<code>next()</code>を呼べば<Term>次のミドルウェア</Term>へ進み、呼ばずに<code>res</code>で応答を返せば、そこでパイプラインは<Term>打ち切られます</Term>。この「進める/止める」の選択が、認証チェックのようなゲート処理を可能にします。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();

// すべてのリクエストが通るミドルウェア
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url); // 共通のログ出力
  next();                           // 次へ進む
});

// 認証チェック。条件を満たさなければ next() を呼ばず応答して打ち切る
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "unauthorized" }); // ここで終了
  }
  next(); // 通過 → 次へ
}`}</code>
      </pre>
      <p><code>next()</code>を呼び忘れると、リクエストは次へ進めず<Term>応答が永遠に返らない</Term>(タイムアウトする)状態になります。ミドルウェアを書くときは「必ず<code>next()</code>を呼ぶか、<code>res</code>で応答を返すか、そのどちらか一方を通る」ことを意識します。</p>

      <Heading num="03">実行順序 ― 登録した順に通る</Heading>
      <p>ミドルウェアの動きで最も重要なのが<strong>登録した順に実行される</strong>という原則です。<code>app.use()</code>や各ルートを書いた<Term>順番</Term>が、そのまま実行順になります。だから「ボディを解釈してから認証する」「認証してからハンドラに入る」といった順序関係は、コードの並び順で表現します。</p>
      <table>
        <thead>
          <tr><th>登録順</th><th>役割</th><th>この順である理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1. ログ出力</td><td>すべてのアクセスを記録</td><td>最初に通せば漏れなく記録できる</td></tr>
          <tr><td className="hl">2. <code>express.json()</code></td><td>リクエストボディを解釈</td><td>後段が<code>req.body</code>を使う前に必要</td></tr>
          <tr><td className="hl">3. 認証チェック</td><td>正当なリクエストか判定</td><td>ハンドラに入る前に弾く</td></tr>
          <tr><td className="hl">4. ルートハンドラ</td><td>本来の処理</td><td>下ごしらえが済んだ最後に実行</td></tr>
        </tbody>
      </table>
      <p>順序を間違えると、たとえば認証チェックがハンドラより<Term>後ろ</Term>にあると、認証前にハンドラが実行されてしまいます。「上から下へ、登録順に流れる」ことを常に頭に置くのが、Expressを読み書きするコツです。</p>

      <Heading num="04">適用範囲 ― 全体・ルート単位・連鎖</Heading>
      <p>ミドルウェアは、どこに差し込むかで適用範囲が変わります。全リクエストに効かせたいものは<code>app.use()</code>で、特定のルートにだけ効かせたいものはそのルートの引数として渡します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// (1) アプリ全体 ― すべてのリクエストが通る
app.use(express.json());

// (2) ルート単位 ― この /private だけ requireAuth を通す
app.get("/private", requireAuth, (req, res) => {
  res.json({ secret: true });
});

// (3) 複数ミドルウェアの連鎖 ― 左から順に実行される
app.post("/posts", requireAuth, validateBody, (req, res) => {
  res.status(201).json({ created: true });
});`}</code>
      </pre>
      <p>ハンドラの前にミドルウェアを<Term>いくつでも並べられる</Term>のがポイントです。<code>requireAuth</code>→<code>validateBody</code>→ハンドラ、のように左から順に通り、途中のどこかで<code>next()</code>が呼ばれなければそこで止まります。共通処理を細かい関数に分け、ルートごとに必要なものだけを組み合わせる ― これがExpressの構成の基本です。</p>

      <Heading num="05">エラーミドルウェア ― 引数4つの特別な形</Heading>
      <p>Expressは、引数を<Term>4つ</Term>(<code>err, req, res, next</code>)取る関数を、通常のミドルウェアではなく<Term>エラーハンドリングミドルウェア</Term>として特別に扱います。ハンドラや前段のミドルウェアで<code>next(err)</code>のようにエラーを渡すと、Expressは通常のパイプラインを飛ばして、このエラー用ミドルウェアまで一気に処理を移します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 引数が4つ → Express はこれをエラーミドルウェアと認識する
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});`}</code>
      </pre>
      <p>これにより、各ハンドラにエラー応答をばらまくのではなく、<Term>一箇所</Term>にまとめられます。エラーミドルウェアは他のミドルウェアより<strong>後ろ</strong>(通常は一番最後)に登録するのが定石です ― 前段のどこで起きたエラーも、最後の受け皿で受け止める形になります。</p>
      <Aside label="ここでは形だけ">
        エラーの渡し方(<code>next(error)</code>や<code>try-catch</code>)・カスタムエラークラス・404との切り分けは、<Link href="/dev/backend/express/error">エラーハンドリング</Link>で詳しく扱います。ここでは「引数4つの関数がエラー専用になる」という約束だけ押さえれば十分です。
      </Aside>

      <Heading num="06">関数型との接点 ― 小さな関数を数珠つなぎにする</Heading>
      <p>ミドルウェアの連鎖は、本質的には「小さな関数を順につないで大きな処理を作る」構造です。これは<Link href="/design/paradigm/functional/composition">関数を組み合わせる(合成)</Link>の発想や、設計パターンの<Term>Chain of Responsibility</Term>(責任の連鎖)とまさに同じ考え方です。各段は自分の仕事だけをして、続きを次へ委ねます。設計の視点では、この「小さな処理を数珠つなぎにする」形は<Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link>の一例と見ることもできます。</p>
      <p>ただしExpress自体は関数型フレームワークではありません。ミドルウェアは<code>req</code>・<code>res</code>という同じオブジェクトを<Term>書き換えながら</Term>受け渡す命令的な面も強く持ちます(<code>req.user</code>を生やす、など)。「合成の骨格を持ちつつ、中身は命令的」という混ざり方を理解しておくと、実際のコードが読みやすくなります。</p>

      <Analogy label="💡 たとえるなら">
        ミドルウェアは、目的の部署にたどり着く前に全員が通る「検温・受付記帳・入館証の確認」のようなチェックポイントの列です。順番に並んでいて(登録順)、各ポイントは自分のチェックを済ませたら「どうぞ次へ」(next())と通します。条件を満たさない人は、そのポイントで引き返してもらう(応答を返して打ち切る)。すべて通過した人だけが、目的の部署(ルートハンドラ)に案内されます。
      </Analogy>

      <Heading num="まとめ">next() で流れを制御するパイプライン</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>next() が流れを決める</h4><p>呼べば次へ、呼ばず応答すればそこで打ち切り。認証などのゲートはこれで作る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>登録した順に実行される</h4><p>ボディ解釈→認証→ハンドラの順序は、コードの並び順で表現する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>適用範囲を選べる</h4><p>全体は app.use()、ルート単位はハンドラの前に並べる。エラー用は引数4つ。</p></Card>
      </CardGrid>
      <p>次は、このパイプラインを使ってデータをやり取りする<Link href="/dev/backend/express/json">JSON API</Link>を見ていきます。リクエストボディの解釈も、<code>express.json()</code>というミドルウェアが担っています。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/json" tag="開発">JSON API</RelatedLink>
            <RelatedLink href="/dev/backend/express/error" tag="開発">エラーハンドリング</RelatedLink>
            <RelatedLink href="/design/paradigm/functional/composition" tag="設計">関数を組み合わせる</RelatedLink>
            <RelatedLink href="/design/architecture/sys/pipeline" tag="設計">パイプラインアーキテクチャ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
