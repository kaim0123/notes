import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "起動と停止" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>起動と停止 ― プロセスは常に入れ替わっている</h1>
        <Lead>
          手元では起動して、Ctrl+Cで終わります。しかし本番では、プロセスは<Term>1日に何度も、予告なく入れ替わります</Term> ― デプロイ、台数の増減、配置の変更、死活確認の失敗。そのたびに処理中のリクエストが切れるなら、<Term>デプロイのたびに障害を出している</Term>ことになります。
        </Lead>
      </Hero>

      <Heading num="01">起動時 ― 壊れているなら早く落ちる</Heading>
      <p>
        起動処理の原則は<Term>早く失敗する</Term>ことです。設定が足りない状態で起動してしまうと、<Term>数時間後に特定の機能を使ったときに初めて落ちます</Term>。原因の特定は格段に難しくなります。
      </p>

      <pre>
        <code>{`// config/env.ts ― 起動時にすべて検証する
const EnvSchema = z.object({
  NODE_ENV:       z.enum(["development", "test", "production"]),
  DATABASE_URL:   z.string().url(),
  REDIS_URL:      z.string().url(),
  JWT_PUBLIC_KEY: z.string().min(1),
  PORT:           z.coerce.number().default(3000),
});

// 不足していればここで即座に落ちる(起動すらしない)
export const env = EnvSchema.parse(process.env);`}</code>
      </pre>

      <p>
        これを<Link href="/dev/dotenv">環境変数の読み込み</Link>直後に置き、アプリのどこからも生の環境変数を直接触らないようにします。型が付き、値の存在も保証されたものだけを使う形です。
      </p>

      <table>
        <thead>
          <tr><th>起動時にやること</th><th>やらないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">設定値の検証</td><td><strong>スキーマ変更の実行</strong>(複数台が同時に走る)</td></tr>
          <tr><td className="hl">依存先への接続確立</td><td>時間のかかる初期処理(起動が遅れ、増やすのが鈍る)</td></tr>
          <tr><td className="hl">鍵などの読み込み</td><td>失敗を握りつぶして起動を続けること</td></tr>
        </tbody>
      </table>

      <p>
        <Link href="/backend/data-migration">マイグレーション</Link>をアプリの起動処理に含めるのは避けます。3台同時に起動すれば3回実行され、競合します。<Term>デプロイの独立した工程として、1回だけ実行する</Term>のが正解です。
      </p>

      <Heading num="02">生存確認と準備確認は別物</Heading>
      <p>
        確認用のURLを1つ作って終わり、では不十分です。基盤が知りたいことは3つあり、それぞれ<Term>対応する処置が違います</Term>。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>問い</th><th>失敗したときの処置</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">生存</td><td>プロセスは生きているか</td><td><strong>再起動する</strong></td></tr>
          <tr><td className="hl">準備</td><td>いまリクエストを受けられるか</td><td><strong>振り分け対象から外す</strong>(再起動はしない)</td></tr>
          <tr><td className="hl">起動</td><td>起動処理は完了したか</td><td>完了するまで他の判定を待つ</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`let shuttingDown = false;

// 生存 ― 何も確認しない。処理が回っていれば200
app.get("/healthz", (req, res) => res.status(200).send("ok"));

// 準備 ― 依存の状態と、停止中かどうかを見る
app.get("/readyz", async (req, res) => {
  if (shuttingDown) return res.status(503).send("shutting down");
  try {
    await pool.query("SELECT 1");
    res.status(200).send("ready");
  } catch {
    res.status(503).send("db unavailable");
  }
});`}</code>
      </pre>

      <Aside label="生存確認でデータベースを見ない">
        よくある誤りです。データベースが一時的に不調になると<Term>全サーバーが一斉に再起動され</Term>、復旧後の接続殺到でさらに悪化します。生存確認は「プロセスが応答できるか」だけを見る ― <Term>再起動で直る問題だけを検出する</Term>のが原則です。
      </Aside>

      <p>
        準備確認に依存先を含めるかも判断が要ります。<Term>それが無いと何もできない依存先だけ</Term>に留め、あれば嬉しい程度のものは含めません。<Link href="/backend/ops-resilience">代替で対応できるもの</Link>を条件にすると、無駄にサーバーが切り離されます。
      </p>

      <Heading num="03">停止は、順序がすべて</Heading>
      <p>
        コンテナを止めるとき、基盤はまず<Term>終了してほしいという合図</Term>を送り、猶予時間を待ってから強制終了します。この猶予の間に処理中の仕事を終わらせるわけですが、順序を間違えると効果がありません。
      </p>

      <DiagramFrame
        slug="backend-ops-shutdown"
        aspect="640 / 340"
        caption="停止の合図を受けてからサーバーを閉じるまでに待ち時間が要る理由を示した図。上段は待たずにすぐ閉じた場合で、振り分け装置はまだこのサーバーが生きていると思って数秒のあいだ送り続けるため、その分が接続を拒否されて失敗する。この隙間が、デプロイのたびに少しだけエラーが出る現象の正体である。下段は正しい順序で、まず準備できていないと宣言し、振り分けが止まるまで待ってから閉じ、処理中のものを最後まで終えて、それから依存先を閉じる。下部には、先に依存先を閉じると処理中のリクエストが全部失敗する、という逆順の失敗も注記されている。"
      />

      <pre>
        <code>{`process.on("SIGTERM", async () => {
  // ① まず「準備できていない」と宣言する
  shuttingDown = true;

  // ② 振り分けが止まるまで待つ(これが最も忘れられる)
  await sleep(10_000);

  // ③ 新規接続を止める。処理中のリクエストは完了させる
  server.close(async () => {
    // ④ 完了後に依存先を閉じる(順序が逆だと処理中の分が失敗する)
    await queue.close();
    await pool.end();
    await redis.quit();
    process.exit(0);
  });

  // ⑤ 保険 ― 終わらない場合は自分で終了する
  setTimeout(() => process.exit(1), 25_000).unref();
});`}</code>
      </pre>

      <p>
        <Term>②が最も見落とされます</Term>。合図を受けた瞬間にサーバーを閉じても、振り分け装置はまだこのサーバーへ送っています ― その数秒間のリクエストが失敗します。⑤の保険は、猶予時間より短く設定します。<Term>強制終了を待つより、自分で終わるほうが後始末ができる</Term>からです。
      </p>

      <Heading num="04">接続の再利用も止める</Heading>
      <p>
        接続を使い回す仕組みがあるため、停止しようとしている間に、既存の接続で新しいリクエストが来ることがあります。
      </p>

      <table>
        <thead>
          <tr><th>対処</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再利用をやめさせる</td><td>停止中は、接続を閉じるよう伝えるヘッダーを応答に付ける</td></tr>
          <tr><td className="hl">空いている接続を先に閉じる</td><td>使われていない接続だけを切る</td></tr>
          <tr><td className="hl">タイムアウトの整合</td><td>手前の装置の待ち時間より、<strong>アプリ側を長く</strong>設定する</td></tr>
        </tbody>
      </table>

      <Heading num="05">ワーカーの停止は順序が違う</Heading>
      <table>
        <thead>
          <tr><th>手順</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 新しいジョブの取得をやめる</td><td>キューを見に行くのを止める</td></tr>
          <tr><td className="hl">② 実行中の完了を待つ</td><td>猶予時間内に終わる粒度に、ジョブを設計しておく</td></tr>
          <tr><td className="hl">③ 終わらなければ諦める</td><td><strong>完了を報告せずに終了する</strong>。キューが別のワーカーへ渡し直す</td></tr>
        </tbody>
      </table>

      <p>
        ③が成立するのは、ジョブが<Term>冪等</Term>に書かれている場合だけです。ここでも<Link href="/backend/jobs">最低1回配信</Link>の前提が効いてきます。あわせて<Term>1つのジョブは猶予時間内に終わる大きさにする</Term> ― 30分かかるジョブは、そもそも停止に耐えられません。
      </p>

      <Heading num="06">無停止デプロイの前提</Heading>
      <p>
        停止処理を正しく書いても、それだけでは無停止になりません。<Term>新旧のバージョンが同時に動く時間がある</Term>ことが、あらゆる前提になります。
      </p>

      <table>
        <thead>
          <tr><th>前提条件</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スキーマの後方互換</td><td>旧コードが新スキーマで動く(<Link href="/backend/data-migration">拡張と縮小</Link>)</td></tr>
          <tr><td className="hl">APIの後方互換</td><td>古い画面が新APIで動く(<Link href="/backend/api-versioning">バージョニング</Link>)</td></tr>
          <tr><td className="hl">状態を持たない</td><td>メモリ上のセッションや処理途中のファイルを保持しない</td></tr>
          <tr><td className="hl">ジョブの互換</td><td>旧バージョンが投入したジョブを、新バージョンが処理できる</td></tr>
          <tr><td className="hl">静的ファイル</td><td>旧バージョンの画面が参照するファイルが、まだ配信されている</td></tr>
        </tbody>
      </table>

      <p>
        最後は見落とされがちです。デプロイ直後に古いページを開いたままの利用者が操作すると、消えたファイルを取りに行って画面が壊れます。<Term>古い成果物をしばらく残す</Term>のが対策です。
      </p>

      <Analogy label="💡 たとえるなら">
        店を閉めるときの手順です。まず<Term>入口に「本日終了」の札を出し</Term>、通りを歩く人がそれを見て入ってこなくなるまで少し待ちます。それからドアを閉め、店内にいる客の会計を最後まで済ませてから、レジを締め、電気を消す。<Term>札を出した瞬間にシャッターを下ろせば、ドアに手をかけていた客は締め出されます</Term> ― これが「デプロイのたびに少しだけエラーが出る」現象の正体です。
      </Analogy>

      <Heading num="まとめ">早く落ち、静かに去る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>設定は起動時に検証</h4>
          <p>不足していれば起動しない。数時間後に特定機能で落ちるより遥かに良い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>生存と準備を分ける</h4>
          <p>片方は再起動、もう片方は切り離し。生存確認で依存先を見ると全台が再起動する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>待ってから閉じる</h4>
          <p>宣言し、振り分けが止まるのを待ち、処理中を終えてから依存先を閉じる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、こうして入れ替わり続けるプロセス群を横断して、1本のリクエストを追う方法です。<Link href="/backend/ops-tracing">リクエストIDと分散トレーシング</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/ops-lifecycle" />
    </DocsPage>
  );
}
