import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ログ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ログ ― あとから追える形で残す</h1>
        <Lead>
          サーバーは目の前で動くわけではありません。障害が起きたとき「いつ・どのリクエストで・何が失敗したか」を後から追えるかどうかは、<Term>ログをどう残したか</Term>で決まります。手元で使う出力のままでは本番で通用しない理由から見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">その場のメモでは足りない</Heading>
      <p>
        手元でのデバッグなら素朴な出力で十分です。しかし本番でこれを頼りにすると、いくつもの壁にぶつかります。
      </p>

      <table>
        <thead>
          <tr><th>観点</th><th>素朴な出力</th><th>ログ専用の仕組み</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">時刻</td><td>付かない</td><td>自動で付与</td></tr>
          <tr><td className="hl">レベル</td><td>区別なし</td><td>情報・注意・失敗を使い分け</td></tr>
          <tr><td className="hl">形式</td><td>人が読む文字列</td><td><strong>機械が読める構造</strong></td></tr>
          <tr><td className="hl">出力先</td><td>標準出力のみ</td><td>収集基盤へ振り分けられる</td></tr>
        </tbody>
      </table>

      <Heading num="02">構造にすると、読めることが変わる</Heading>
      <DiagramFrame
        slug="backend-express-log-structured"
        aspect="640 / 320"
        caption="同じ出来事を文字列として残した場合と、構造として残した場合を比べた図。上段の文字列は人間には読めるが、あとから絞り込むには本文を文字列で検索するしかなく、表記が少しでも揺れれば漏れる。下段の構造では、レベル・時刻・利用者・経路・所要時間・メッセージが名前付きの欄に分かれるため、レベルが誤りのものだけ、ある利用者に関するものだけ、所要時間が1秒を超えたものだけ、といった条件で機械的に絞り込める。下部には、書くときの手間はほとんど変わらないが読むときにできることが決定的に違うこと、そしてログを読むのは何かが壊れたときであり、そこで絞り込めるかどうかが復旧までの時間を決めることが記されている。"
      />

      <pre>
        <code>{`import pino from "pino";

const logger = pino();

// 第1引数に付帯情報、第2引数にメッセージ
logger.info({ userId: 42, path: "/users" }, "user fetched");
logger.warn({ retryCount: 2 }, "slow response");
logger.error({ err }, "failed to load user");`}</code>
      </pre>

      <p>
        付帯情報を<Term>オブジェクトで渡す</Term>のが要点です。文字列に埋め込むと、あとから条件で絞れなくなります。
      </p>

      <Heading num="03">レベルは運用の切り替えスイッチ</Heading>
      <table>
        <thead>
          <tr><th>レベル</th><th>意味</th><th>平常時</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">debug</td><td>開発時の詳細</td><td>出さない</td></tr>
          <tr><td className="hl">info</td><td>通常の記録</td><td>出す(量に注意)</td></tr>
          <tr><td className="hl">warn</td><td>異常ではないが注意</td><td>出す</td></tr>
          <tr><td className="hl">error</td><td>失敗</td><td>出す。<strong>警報の対象</strong></td></tr>
        </tbody>
      </table>

      <p>
        レベルを付ける実利は、<Term>あとから出す量を変えられる</Term>ことです。平常時は注意以上だけを見て、障害時だけ詳細まで遡る。<Term>コードを直さずに、設定だけで切り替えられる</Term>のが利点です。
      </p>

      <Heading num="04">2種類のログを揃える</Heading>
      <p>
        ログには大きく2種類あります。<Term>リクエストログ</Term>(どのリクエストがいつ来て何を返したか)と、<Term>アプリケーションログ</Term>(処理の途中で何が起きたか)です。
      </p>
      <p>
        前者は全リクエストに共通する処理なので、<Link href="/backend/express-middleware">ミドルウェア</Link>として一度差し込めば足ります。そして後者で最も重要なのがエラーで、これは<Link href="/backend/express-error">エラー用の段</Link>に集約します。
      </p>

      <pre>
        <code>{`// すべてのルートの後ろに置く
app.use((err, req, res, next) => {
  logger.error({ err, method: req.method, url: req.url }, "request failed");
  res.status(err.statusCode ?? 500).json({ code: err.code ?? "internal_error" });
});`}</code>
      </pre>

      <p>
        ハンドラ側は渡すだけでよく、<Term>記録の責任は1箇所に集まります</Term>。エラー処理とログが自然につながる構造です。
      </p>

      <Heading num="05">1本の線として追えるようにする</Heading>
      <p>
        ここまでで各行は構造化されましたが、本番のログには<Term>数百人分の行が入り混じって流れます</Term>。「この利用者のこのエラー」に関係する行だけを取り出すには、もう一段の工夫が要ります ― <Link href="/backend/ops-tracing">リクエストIDと分散トレーシング</Link>で扱う、1リクエストを串刺しにする識別子です。
      </p>

      <Aside label="出してはいけないもの">
        ログは収集基盤に送られ、多くの人が閲覧できます。<Term>認証トークン、パスワード、決済情報、そして個人情報は出さない</Term>のが原則です。とくに「デバッグのためにリクエスト本文を丸ごと出す」書き方は、機微な値をまとめて記録することになります。出力先は環境ごとの設定に任せ、<Term>アプリのコードは何を記録するかだけを決める</Term>のが定石です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        素朴な出力は、その場のメモ書きです。走り書きは自分がその場にいる間は役立ちますが、後から「先週の火曜、何時に何が起きたか」を探すには向きません。構造化したログは、日時・種別・担当を欄で分けた<Term>業務日誌</Term>のようなもの。フォーマットが揃っているからこそ、後から絞り込んで読み返せます。
      </Analogy>

      <Heading num="まとめ">読むときのために書く</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>構造で残す</h4>
          <p>書く手間は変わらない。変わるのは、あとから絞り込めるかどうか。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>レベルで量を切り替える</h4>
          <p>平常時と障害時で、コードを直さずに詳細度を変えられる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>エラーは1箇所に集める</h4>
          <p>記録と応答を同じ場所で。そして機微な値は出さない。</p>
        </Card>
      </CardGrid>

      <p>
        運用の土台が整いました。次は、エンドポイントが増えても破綻しないよう形を揃えます。<Link href="/backend/express-design">Expressでの API設計</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-logging" />
    </DocsPage>
  );
}
