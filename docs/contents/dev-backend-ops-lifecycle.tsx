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
  title: "起動と停止",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>起動と停止 ― プロセスは常に入れ替わっている</h1>
        <Lead>
          手元では<code>npm run dev</code>で起動し、Ctrl+Cで終わります。しかし本番では、プロセスは<strong>1日に何度も、予告なく入れ替わります</strong> ― デプロイ、オートスケール、ノードの再配置、ヘルスチェックの失敗。そのたびに処理中のリクエストが切れてエラーになるなら、デプロイのたびに障害を出していることになります。ここでは<Term>ヘルスチェック</Term>と<Term>グレースフルシャットダウン</Term>を扱います。
        </Lead>
      </Hero>

      <Heading num="01">起動時 ― 壊れているなら早く落ちる</Heading>
      <p>起動処理の原則は<Term>Fail Fast</Term>です。設定が足りない状態で起動してしまうと、<strong>数時間後に特定の機能を使ったときに初めて落ちます</strong>。原因の特定は格段に難しくなります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// config/env.ts ― 起動時にすべて検証する
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_PUBLIC_KEY: z.string().min(1),
  PORT: z.coerce.number().default(3000),
});

// 不足していればここで即座に落ちる(起動すらしない)
export const env = EnvSchema.parse(process.env);`}</code>
      </pre>
      <p>これを<Link href="/dev/dotenv">.envの読み込み</Link>直後に置き、アプリのどこからも<code>process.env</code>を直接触らないようにします。型が付き、値の存在も保証された<code>env</code>だけを使う形です。</p>
      <table>
        <thead>
          <tr><th>起動時にやること</th><th>やらないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">環境変数の検証</td><td><strong>マイグレーションの実行</strong>(複数台が同時に走る)</td></tr>
          <tr><td className="hl">DB・Redisへの接続確立</td><td>時間のかかる初期処理(起動が遅れ、スケールが鈍る)</td></tr>
          <tr><td className="hl">署名鍵などの読み込み</td><td>失敗を握りつぶして起動を続けること</td></tr>
        </tbody>
      </table>
      <p><Link href="/dev/backend/data/migration">マイグレーション</Link>をアプリの起動処理に含めるのは避けます。3台同時に起動すれば3回実行され、競合します。デプロイの独立した工程として、1回だけ実行するのが正解です。</p>

      <Heading num="02">ヘルスチェック ― 3つの問いは別物</Heading>
      <p><code>/health</code>を1つ作って終わり、では不十分です。オーケストレータが知りたいことは3つあり、それぞれ<strong>対応する処置が違います</strong>。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>問い</th><th>失敗したときの処置</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>Liveness</Term>(生存)</td><td>プロセスは生きているか</td><td><strong>再起動する</strong></td></tr>
          <tr><td className="hl"><Term>Readiness</Term>(準備)</td><td>いまリクエストを受けられるか</td><td><strong>振り分け対象から外す</strong>(再起動はしない)</td></tr>
          <tr><td className="hl"><Term>Startup</Term>(起動)</td><td>起動処理は完了したか</td><td>完了するまで他の判定を待つ</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`let shuttingDown = false;

// Liveness ― 何も確認しない。イベントループが回っていれば200
app.get("/healthz", (req, res) => res.status(200).send("ok"));

// Readiness ― 依存の状態と停止フラグを見る
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
      <Aside label="⚠️ LivenessでDBを見ない">
        よくある誤りが、生存確認でDBの疎通を確認することです。DBが一時的に不調になると<strong>全サーバーが一斉に再起動され</strong>、復旧後の接続殺到でさらに悪化します。生存確認は「プロセスが応答できるか」だけを見る ― <strong>再起動で直る問題だけを検出する</strong>のが原則です。
      </Aside>
      <p>Readinessに依存先を含めるかも判断が要ります。<strong>それが無いと何もできない依存先(主DB)だけ</strong>に留め、あれば嬉しい程度のもの(キャッシュ、おすすめAPI)は含めません。<Link href="/dev/backend/ops/resilience">前章のdegrade</Link>で対応できるものを準備完了の条件にすると、無駄にサーバーが切り離されます。</p>

      <Heading num="03">グレースフルシャットダウン ― 順序がすべて</Heading>
      <p>コンテナを停止するとき、オーケストレータはまず<code>SIGTERM</code>を送り、猶予時間(既定30秒など)を待ってから<code>SIGKILL</code>で強制終了します。<strong>この猶予の間に、処理中の仕事を終わらせる</strong>のがグレースフルシャットダウンです。</p>
      <p>順序を間違えると効果がありません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`process.on("SIGTERM", async () => {
  // ① まず「準備できていない」と宣言する
  shuttingDown = true;

  // ② ロードバランサが気付くまで待つ(これが最も忘れられる)
  await sleep(10_000);

  // ③ 新規接続を止める。処理中のリクエストは完了させる
  server.close(async () => {
    // ④ 完了後に依存先を閉じる(順序が逆だと処理中の分が失敗する)
    await queue.close();
    await pool.end();
    await redis.quit();
    process.exit(0);
  });

  // ⑤ 保険 ― 終わらない場合は強制終了
  setTimeout(() => process.exit(1), 25_000).unref();
});`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>手順</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① Readinessを503にする</td><td>これから止まることを外部に知らせる</td></tr>
          <tr><td className="hl">② 数秒〜十数秒待つ</td><td><strong>ロードバランサの反映には遅延がある</strong>。すぐ閉じると、その間に届いたリクエストが失敗する</td></tr>
          <tr><td className="hl">③ 新規受付を停止</td><td>処理中のものは完了させる</td></tr>
          <tr><td className="hl">④ 依存先を閉じる</td><td><strong>リクエスト完了後</strong>。先にDBを閉じると処理中の分が全部失敗する</td></tr>
          <tr><td className="hl">⑤ 強制終了の保険</td><td>猶予時間より短く設定する。SIGKILLを待つより自分で終わる</td></tr>
        </tbody>
      </table>
      <p><strong>②が最も見落とされます。</strong>SIGTERMを受けた瞬間にサーバーを閉じても、ロードバランサはまだこのサーバーへ振り分けています ― その数秒間のリクエストが、接続拒否として失敗します。「デプロイのたびに少しだけ5xxが出る」現象の典型的な原因です。</p>

      <Heading num="04">Keep-Aliveと接続のドレイン</Heading>
      <p>HTTPのKeep-Aliveにより、クライアントは接続を再利用しています。サーバーが停止しようとしている間に、その接続で新しいリクエストが来ることがあります。</p>
      <table>
        <thead>
          <tr><th>対処</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>Connection: close</code>を返す</td><td>停止中は応答ヘッダーに付け、接続の再利用をやめさせる</td></tr>
          <tr><td className="hl">アイドル接続を閉じる</td><td>Node.jsの<code>server.closeIdleConnections()</code>で、使われていない接続を先に切る</td></tr>
          <tr><td className="hl">タイムアウトの整合</td><td>ロードバランサのidleタイムアウトより、<strong>アプリ側を長く</strong>設定する(逆だと稀に502が出る)</td></tr>
        </tbody>
      </table>

      <Heading num="05">ワーカーの停止</Heading>
      <p><Link href="/dev/backend/jobs">ジョブワーカー</Link>にも同じ配慮が要りますが、順序が少し違います。</p>
      <table>
        <thead>
          <tr><th>手順</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 新しいジョブの取得をやめる</td><td>キューからのポーリングを停止する</td></tr>
          <tr><td className="hl">② 実行中のジョブの完了を待つ</td><td>猶予時間内に終わる粒度にジョブを設計しておく</td></tr>
          <tr><td className="hl">③ 終わらなければ諦める</td><td><strong>completeせずに終了する</strong>。キューが別のワーカーへ再配信する</td></tr>
        </tbody>
      </table>
      <p>③が成立するのは、ジョブが<strong>冪等</strong>に書かれている場合だけです。ここでも「最低1回配信」の前提が効いてきます。あわせて、<strong>1つのジョブは猶予時間内に終わる大きさにする</strong> ― 30分かかるジョブは、そもそも停止に耐えられません。</p>

      <Heading num="06">ゼロダウンタイムデプロイの前提</Heading>
      <p>停止処理を正しく書いても、それだけでは無停止デプロイになりません。新旧のバージョンが<strong>同時に動く時間がある</strong>ことが、あらゆる前提になります。</p>
      <table>
        <thead>
          <tr><th>前提条件</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スキーマの後方互換</td><td>旧コードが新スキーマで動く(<Link href="/dev/backend/data/migration">拡張と縮小</Link>)</td></tr>
          <tr><td className="hl">APIの後方互換</td><td>古いフロントエンドが新APIで動く(<Link href="/dev/backend/api/versioning">バージョニング</Link>)</td></tr>
          <tr><td className="hl">状態を持たない</td><td>メモリ上のセッションやアップロード中のファイルを保持しない</td></tr>
          <tr><td className="hl">ジョブの互換</td><td>旧バージョンが投入したジョブを、新バージョンが処理できる</td></tr>
          <tr><td className="hl">静的ファイル</td><td>旧バージョンのHTMLが参照するJSが、まだ配信されている</td></tr>
        </tbody>
      </table>
      <p>最後の項目は見落とされがちです。デプロイ直後に古いページを開いたままの利用者が操作すると、消えたJSファイルを取りに行って画面が壊れます。<strong>古いビルド成果物をしばらく残す</strong>のが対策です。</p>

      <Analogy label="💡 たとえるなら">
        グレースフルシャットダウンは、店を閉めるときの手順です。まず<strong>入口に「本日終了」の札を出し</strong>(Readinessを落とす)、通りを歩く人がそれを見て入ってこなくなるまで少し待ちます(②の待機)。それからドアを閉め、店内にいる客の会計を最後まで済ませてから(処理中の完了)、レジを締め、電気を消す(依存先を閉じる)。札を出した瞬間にシャッターを下ろせば、ドアに手をかけていた客は締め出されます ― これが「デプロイのたびに少しだけエラーが出る」現象の正体です。
      </Analogy>

      <Heading num="まとめ">早く落ち、静かに去る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>設定は起動時に検証</h4><p>不足していれば起動しない。数時間後に特定機能で落ちるより遥かに良い。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>生存と準備を分ける</h4><p>Livenessは再起動、Readinessは切り離し。生存確認でDBを見ると全台が再起動する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>停止は待ってから閉じる</h4><p>Readinessを落とし、LBの反映を待ち、処理中を終えてから依存先を閉じる。</p></Card>
      </CardGrid>
      <p>次は、こうして入れ替わり続けるプロセス群を横断して1つのリクエストを追う方法です。<Link href="/dev/backend/ops/tracing">リクエストIDと分散トレーシング</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/container/kubernetes" tag="インフラ">Kubernetes</RelatedLink>
            <RelatedLink href="/ops/deploy" tag="サービス運営">デプロイ戦略</RelatedLink>
            <RelatedLink href="/dev/backend/ops/resilience" tag="バックエンド">タイムアウト・リトライ・遮断</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
