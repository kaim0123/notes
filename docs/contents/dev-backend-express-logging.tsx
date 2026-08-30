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
  title: "ログ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Express</Eyebrow>
        <h1>ログ ― 何が起きたかを記録する</h1>
        <Lead>
          サーバーは目の前で動くわけではありません。障害が起きたとき「いつ・どのリクエストで・何が失敗したか」を後から追えるかどうかは、<Term>ログ</Term>をどう残したかで決まります。開発中に使う<code>console.log</code>のままでは本番で通用しない理由と、<Term>morgan</Term>・<Term>pino</Term>といった専用の仕組みへ移る流れを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">console.log の限界</Heading>
      <p>手元でデバッグするだけなら<code>console.log</code>で十分です。しかし本番サーバーでこれを頼りにすると、いくつもの壁にぶつかります。出力に<Term>時刻</Term>がなく「いつ起きたか」が分からない、<Term>レベル</Term>(情報なのか警告なのかエラーなのか)の区別がない、そして何より出力が<Term>ただの文字列</Term>なので、後から機械的に検索・集計しにくいのです。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>console.log</th><th>ログ専用ライブラリ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">時刻</td><td>付かない(自分で書き足す)</td><td>自動で付与</td></tr>
          <tr><td className="hl">レベル</td><td>区別なし</td><td>info / warn / error を使い分け</td></tr>
          <tr><td className="hl">形式</td><td>人が読む文字列</td><td>機械が読めるJSONなど構造化</td></tr>
          <tr><td className="hl">出力先</td><td>標準出力のみ</td><td>ファイル・収集基盤へ振り分け</td></tr>
        </tbody>
      </table>
      <p>ログには大きく2種類あります。<strong>リクエストログ</strong>(どのリクエストがいつ来て何を返したか)と、<strong>アプリケーションログ</strong>(処理の途中で何が起きたか、特にエラー)です。順に見ていきます。</p>

      <Heading num="02">リクエストログ ― morgan</Heading>
      <p>アクセスのたびに「メソッド・パス・ステータス・応答時間」を1行残したい。これは全リクエストに共通する処理なので、<Link href="/dev/backend/express/middleware">ミドルウェア</Link>として差し込むのが自然です。定番が<Term>morgan</Term>で、<code>app.use()</code>に一度登録するだけで、以降すべてのリクエストが記録されます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import express from "express";
import morgan from "morgan";

const app = express();

// 全リクエストを記録するミドルウェア。登録はこの1行だけ
app.use(morgan("tiny"));
// => GET /users 200 42 - 5.123 ms のような行が自動で出る

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});`}</code>
      </pre>
      <p>ログが<code>app.use()</code>一行で全体に効くのは、ミドルウェアが「リクエストが順に通るパイプラインの一段」だからです。ログ・認証・ボディ解釈といった横断的な処理をまとめて足せる、という前章の考え方がそのまま活きています。</p>

      <Heading num="03">構造化ログ ― pino / Winston</Heading>
      <p>リクエストログの先にあるのが、アプリケーションの処理内容を残す<Term>構造化ログ</Term>です。人が読む文章ではなく、<Term>JSON</Term>など決まった形で出力します。こうすると「レベルが<code>error</code>のものだけ」「特定ユーザーに関するものだけ」といった<strong>機械的な検索・集計</strong>ができ、大量のログの中から必要な1件を絞り込めます。代表的なライブラリが高速な<Term>pino</Term>と、歴史のある<Term>Winston</Term>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import pino from "pino";

const logger = pino();

// 第1引数に付帯情報(オブジェクト)、第2引数にメッセージ
logger.info({ userId: 42, path: "/users" }, "user fetched");
// => {"level":30,"time":...,"userId":42,"path":"/users","msg":"user fetched"}

logger.warn({ retry: 2 }, "slow response");
logger.error({ err }, "failed to load user"); // レベルで重大度を表す`}</code>
      </pre>
      <p>ポイントは<Term>ログレベル</Term>です。<code>info</code>(通常の記録)・<code>warn</code>(異常ではないが注意)・<code>error</code>(失敗)を意識して使い分けると、平常時は<code>warn</code>以上だけを見る、障害時は<code>info</code>まで遡る、といった運用ができます。付帯情報をオブジェクトで渡すことで、文字列に埋め込むより後の検索がずっと楽になります。</p>
      <Aside label="出力先は分離する">
        アプリのコードは「何を記録するか」だけを決め、「どこへ出すか(ファイル・標準出力・収集基盤)」は環境ごとの設定に任せるのが定石です。pinoは既定で標準出力に出し、収集は外側の仕組みに委ねます。
      </Aside>

      <Heading num="04">エラーログ ― 一箇所に集約する</Heading>
      <p>最も残したいのは<strong>エラー</strong>です。各ハンドラで個別に記録すると書き漏れが出るので、<Link href="/dev/backend/express/error">エラーハンドリング</Link>で見た<Term>エラーハンドリングミドルウェア</Term>(引数4つの<code>err, req, res, next</code>)で一元的に記録します。例外は最終的にここへ集まるため、「記録する場所」と「エラー応答を返す場所」を1箇所にまとめられます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// すべてのルートの後ろに置く、引数4つのエラーミドルウェア
app.use((err, req, res, next) => {
  // ここでエラーを構造化ログとして記録する
  logger.error({ err, method: req.method, url: req.url }, "request failed");
  res.status(500).json({ error: "internal error" });
});`}</code>
      </pre>
      <p>こうしておけば、ハンドラ側は<code>next(err)</code>でエラーを渡すだけでよく、記録の責任はミドルウェアに集約されます。エラー処理とログが自然につながる構造です。</p>

      <Analogy label="💡 たとえるなら">
        <code>console.log</code>は、その場のメモ書きです。走り書きは自分がその場にいる間は役立ちますが、後から「先週の火曜、何時に何が起きたか」を探すには向きません。構造化ログは、日時・種別・担当を欄で分けた<Term>業務日誌</Term>のようなもの。フォーマットが揃っているからこそ、後から「エラーの行だけ」「この案件だけ」と絞り込んで読み返せます。
      </Analogy>

      <Heading num="まとめ">記録は後から追える形で残す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>console.logは開発まで</h4><p>時刻・レベル・構造がなく、本番では検索も集計もしにくい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>morganでリクエストを記録</h4><p>ミドルウェアとして一度登録すれば全アクセスが1行ずつ残る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>pino/Winstonで構造化</h4><p>JSONとレベルで出し、エラーはエラーミドルウェアに集約する。</p></Card>
      </CardGrid>
      <p>ログで運用の土台が整いました。次は、エンドポイントの数が増えても破綻しないよう、URLやレスポンスの形を揃える<Link href="/dev/backend/express/design">API設計</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/middleware" tag="開発">ミドルウェア</RelatedLink>
            <RelatedLink href="/dev/backend/express/error" tag="開発">エラーハンドリング</RelatedLink>
            <RelatedLink href="/dev/backend/express/design" tag="開発">API設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
