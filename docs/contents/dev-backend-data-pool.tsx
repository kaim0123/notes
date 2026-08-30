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
  title: "コネクションプールとN+1",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; データ層</Eyebrow>
        <h1>コネクションプールとN+1 ― 接続の本数と、クエリの回数</h1>
        <Lead>
          <Link href="/database/performance">パフォーマンスチューニング</Link>ではDB側の視点を扱いました。ここではアプリ側の視点で、実運用の障害原因として群を抜いて多い2つを見ます。<strong>接続が足りなくなる</strong>(コネクションプールの枯渇)と、<strong>クエリを投げすぎる</strong>(N+1問題)です。どちらも、1件のテストでは絶対に気付けず、本番の負荷で初めて牙を剥きます。
        </Lead>
      </Hero>

      <Heading num="01">接続は「開くたびに作る」ものではない</Heading>
      <p>データベースへの接続は、TCPのハンドシェイク、認証、サーバー側でのプロセスやスレッドの確保を伴う<strong>高価な操作</strong>です。1リクエストごとに接続を開いて閉じていたら、クエリの実行時間より接続の準備時間の方が長くなります。</p>
      <p>そこで、あらかじめ数本の接続を張っておき、使い終わったら閉じずに<strong>返却して再利用する</strong>のが<Term>コネクションプール</Term>です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { Pool } from "pg";

// アプリ全体で1つだけ作る(モジュールのトップレベル)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                      // 保持する接続の最大本数
  idleTimeoutMillis: 30_000,    // 使われない接続を閉じるまで
  connectionTimeoutMillis: 5_000, // 空き待ちで諦めるまで
});`}</code>
      </pre>
      <p><strong>プールはアプリで1つ</strong>です。リクエストごとに<code>new Pool()</code>すると、プールという概念自体が無意味になります(そして本番で接続数が爆発します)。</p>

      <Heading num="02">本数をどう決めるか</Heading>
      <p>直感に反しますが、<strong>プールを大きくしても速くなりません</strong>。DBが同時に処理できる量はCPUとディスクで決まっており、接続を増やしても待ち行列がDBの内部に移るだけです。むしろコンテキストスイッチとロック競合で遅くなります。</p>
      <p>決めるべきは、上限を超えないことです。</p>
      <table>
        <thead>
          <tr><th>確認すること</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DB側の上限</td><td>PostgreSQLの<code>max_connections</code>(既定100前後)。これを全アプリで分け合う</td></tr>
          <tr><td className="hl">アプリの台数</td><td><strong>台数 × プールサイズ ≦ 上限</strong>。オートスケールで台数が増える分も見込む</td></tr>
          <tr><td className="hl">他の利用者</td><td>バッチ、管理ツール、監視、マイグレーション実行分を残しておく</td></tr>
        </tbody>
      </table>
      <p>目安として、1台あたり10前後から始めて<strong>実測で調整</strong>します。「待ち時間が発生しているか」を測り、発生していないなら増やす理由はありません。</p>
      <Aside label="⚠️ サーバーレスとの相性">
        <Link href="/cloud/aws/compute/lambda">Lambda</Link>のような実行モデルでは、インスタンスが数百個まで自動で増えます。各インスタンスがプールを持てば、あっという間に<code>max_connections</code>を超えて<strong>DB全体が接続を受け付けなくなります</strong>。対策は、間に接続を集約する層(PgBouncer、RDS Proxy、Cloud SQL Auth Proxy など)を挟むか、HTTPベースのDBアクセスを使うことです。これはサーバーレス採用時に必ず設計へ織り込む必要があります。
      </Aside>

      <Heading num="03">枯渇 ― 症状と原因</Heading>
      <p>プールが枯渇すると、アプリは<strong>クエリを投げる前の段階で待たされます</strong>。症状は独特で、「DBの負荷は低いのに、APIだけが軒並みタイムアウトする」という形で現れます。</p>
      <table>
        <thead>
          <tr><th>原因</th><th>詳細</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続の返し忘れ</td><td><code>connect()</code>したのに<code>release()</code>していない。<strong>例外経路での漏れが最も多い</strong></td></tr>
          <tr><td className="hl">長いトランザクション</td><td><Link href="/dev/backend/data/transaction">前章</Link>のとおり、中で外部APIを呼ぶと接続を握り続ける</td></tr>
          <tr><td className="hl">遅いクエリ</td><td>1本が5秒かかれば、その間その接続は使えない</td></tr>
          <tr><td className="hl">N+1</td><td>1リクエストで100本のクエリを投げれば、占有時間が100倍になる</td></tr>
        </tbody>
      </table>
      <p>返し忘れを防ぐ最も確実な方法は、<strong>接続を直接触らせないこと</strong>です。<code>connect()</code>と<code>release()</code>を必ずペアにするヘルパーを1つ作り、アプリのコードからは<code>pool.query()</code>かそのヘルパーしか呼ばせません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ✗ 例外が出ると release されず、1本ずつ静かに漏れていく
const client = await pool.connect();
const result = await client.query(sql);
client.release();

// ○ finally で必ず返す(トランザクションのヘルパーも同じ形)
async function withClient<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}`}</code>
      </pre>
      <p>あわせて、プールの<strong>統計値を監視</strong>します。<code>pool.totalCount</code> / <code>idleCount</code> / <code>waitingCount</code>を定期的に記録しておくと、枯渇は事故になる前に「待ち件数の増加」として見えます。</p>

      <Heading num="04">N+1問題 ― 1回のつもりが101回</Heading>
      <p><Term>N+1問題</Term>は、一覧を取得する1本のクエリ(1)のあとに、各行の関連データを取るクエリ(N)が発行されてしまう現象です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const posts = await postRepo.findRecent(100);   // クエリ 1回

for (const post of posts) {
  // ループの中でクエリ → 100回
  post.author = await userRepo.findById(post.authorId);
}
// 合計 101 回。開発中は10件なので誰も気付かない`}</code>
      </pre>
      <p>厄介なのは、<strong>コードの見た目が自然なこと</strong>です。特にORMの遅延読み込みでは、<code>post.author.name</code>と書いただけで裏でクエリが飛びます ― ソースからは1本も見えません。GraphQLのリゾルバも、フィールドごとに解決する構造上ここに陥りやすい典型例です。</p>
      <p>影響は掛け算で効きます。1本1ミリ秒のクエリでも、100本なら100ミリ秒。さらにその間<strong>接続を占有し続ける</strong>ため、前節の枯渇と直結します。</p>

      <Heading num="05">N+1を解く ― まとめて取る</Heading>
      <p>解法はどれも「N回に分けず、1回でまとめて取る」ことに帰着します。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">JOIN</td><td>1本のクエリで結合して取る</td><td>1対1、または関連が少ないとき</td></tr>
          <tr><td className="hl">IN句でまとめる</td><td>IDを集めて<code>WHERE id IN (...)</code>で2本目を投げる</td><td>1対多。<strong>最も汎用的</strong></td></tr>
          <tr><td className="hl">ORMのeager loading</td><td><code>include</code> / <code>relations</code>を明示する</td><td>ORMを使っている場合の第一選択</td></tr>
          <tr><td className="hl">DataLoader</td><td>同一リクエスト内の問い合わせをまとめて1回にする</td><td>GraphQLなど、呼び出し箇所を集約できない構造</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// IN句でまとめる ― 101回 → 2回
const posts = await postRepo.findRecent(100);

const authorIds = [...new Set(posts.map((p) => p.authorId))];
const authors = await userRepo.findByIds(authorIds);   // 2本目
const byId = new Map(authors.map((a) => [a.id, a]));

const result = posts.map((p) => ({ ...p, author: byId.get(p.authorId) }));`}</code>
      </pre>
      <Aside label="JOINが常に正解ではない">
        1対多をJOINすると、親の情報が子の件数だけ<strong>重複して転送されます</strong>。投稿100件それぞれにコメント50件なら5000行が返り、投稿の本文が50回ずつ繰り返されます。この場合は「投稿を取る1本」+「コメントをIN句でまとめて取る1本」の<strong>2本に分けた方が速い</strong>ことがよくあります。N+1を潰そうとして巨大なJOINを組み、かえって遅くなるのは非常によくある失敗です。
      </Aside>

      <Heading num="06">見つける ― 発行回数を可視化する</Heading>
      <p>N+1は「気を付ける」では防げません。<strong>見えるようにする</strong>のが唯一の対策です。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リクエスト単位のクエリ数をログに出す</td><td>「1リクエストで83クエリ」が即座に分かる。<strong>最も費用対効果が高い</strong></td></tr>
          <tr><td className="hl">ORMのクエリログを開発環境で有効化</td><td>ループの中でSQLが並ぶのが目で見える</td></tr>
          <tr><td className="hl">スロークエリログ</td><td>1本が遅い問題を見つける(N+1は1本ずつは速いので映らない)</td></tr>
          <tr><td className="hl"><code>EXPLAIN ANALYZE</code></td><td>索引が使われているかを確認する(<Link href="/database/index">索引</Link>)</td></tr>
          <tr><td className="hl"><Link href="/dev/backend/ops/tracing">分散トレーシング</Link></td><td>1リクエストの中のDB呼び出しが時系列で並ぶ。N+1が階段状に見える</td></tr>
        </tbody>
      </table>
      <p>閾値を決めて、<strong>1リクエストのクエリ数が一定を超えたら警告ログを出す</strong>仕組みを入れておくと、N+1は導入した本人がその日のうちに気付けます。</p>

      <Heading num="07">その他の頻出パターン</Heading>
      <table>
        <thead>
          <tr><th>問題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>SELECT *</code></td><td>使わない列(特にTEXTやJSON)まで転送される。必要な列だけ挙げる</td></tr>
          <tr><td className="hl">全件取得してアプリで絞り込み</td><td><code>WHERE</code>・<code>LIMIT</code>をDBに任せる。<strong>件数はいずれ必ず増える</strong></td></tr>
          <tr><td className="hl">OFFSETによるページング</td><td>深いページほど遅くなる。<Term>カーソルページネーション</Term>(前回の最終IDを条件にする)へ</td></tr>
          <tr><td className="hl">1件ずつのINSERT</td><td>バルクINSERT、または<code>COPY</code>でまとめる</td></tr>
          <tr><td className="hl">毎回同じマスタを引く</td><td><Link href="/dev/backend/cache">キャッシュ</Link>する。ただし無効化の設計とセットで</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        コネクションプールは、店の窓口の数です。増やせば増やすほど客をさばけるように思えますが、奥の厨房(DB)の処理能力が同じなら、行列が店の外から店内に移るだけです。そしてN+1は、100人分の買い物を<strong>1品ずつ100往復して</strong>買いに行くようなものです。1往復あたりは短くても、往復の回数そのものが問題で、その間ずっと窓口を1つ塞いでいます。買い物リストをまとめて1回で行けば、窓口も空き、行列も消えます。
      </Analogy>

      <Heading num="まとめ">本数は控えめに、往復は少なく</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>プールは1つ、大きくしない</h4><p>台数×サイズがDBの上限を超えないこと。増やしても速くならない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>接続は必ずfinallyで返す</h4><p>例外経路の漏れが枯渇の最多原因。直接触らせないヘルパーで封じる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>N+1は可視化で潰す</h4><p>リクエストごとのクエリ数をログに出す。JOINよりIN句が正解なことも多い。</p></Card>
      </CardGrid>
      <p>次は、そのテーブル定義そのものを安全に変えていく方法です。<Link href="/dev/backend/data/migration">マイグレーション</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/performance" tag="データベース">パフォーマンスチューニング</RelatedLink>
            <RelatedLink href="/database/index" tag="データベース">索引とアクセス制御</RelatedLink>
            <RelatedLink href="/dev/backend/data/transaction" tag="バックエンド">トランザクション境界</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
