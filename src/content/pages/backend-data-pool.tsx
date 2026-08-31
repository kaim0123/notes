import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "コネクションプールとN+1" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>コネクションプールとN+1 ― 接続の本数と、往復の回数</h1>
        <Lead>
          <Link href="/database/performance">パフォーマンスチューニング</Link>ではデータベース側の視点を扱いました。ここではアプリ側の視点で、実運用の障害原因として群を抜いて多い2つを見ます ― <Term>接続が足りなくなる</Term>と<Term>クエリを投げすぎる</Term>。どちらも1件のテストでは絶対に気づけず、本番の負荷で初めて牙を剥きます。
        </Lead>
      </Hero>

      <Heading num="01">接続は開くたびに作るものではない</Heading>
      <p>
        データベースへの接続は、通信の確立・認証・サーバー側での資源確保を伴う<Term>高価な操作</Term>です。1リクエストごとに開いて閉じていたら、クエリの実行時間より準備時間のほうが長くなります。
      </p>
      <p>
        そこであらかじめ数本張っておき、使い終わったら閉じずに<Term>返却して再利用する</Term>のがコネクションプールです。
      </p>

      <pre>
        <code>{`import { Pool } from "pg";

// アプリ全体で1つだけ作る
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                         // 保持する接続の最大本数
  idleTimeoutMillis: 30_000,       // 使われない接続を閉じるまで
  connectionTimeoutMillis: 5_000,  // 空き待ちで諦めるまで
});`}</code>
      </pre>

      <p>
        <Term>プールはアプリで1つ</Term>です。リクエストごとに作れば、プールという概念自体が無意味になります。
      </p>

      <Heading num="02">大きくしても速くならない</Heading>
      <p>
        直感に反しますが、プールを大きくしても速くなりません。データベースが同時に処理できる量はCPUとディスクで決まっており、<Term>接続を増やしても待ち行列がデータベースの内部に移るだけ</Term>です。むしろ切り替えの負荷とロック競合で遅くなります。決めるべきは、上限を超えないことです。
      </p>

      <table>
        <thead>
          <tr><th>確認すること</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データベース側の上限</td><td>同時接続数の設定値。これを全アプリで分け合う</td></tr>
          <tr><td className="hl">アプリの台数</td><td><strong>台数 × プールサイズ ≦ 上限</strong>。自動で増える分も見込む</td></tr>
          <tr><td className="hl">他の利用者</td><td>バッチ、管理ツール、監視、スキーマ変更の実行分を残す</td></tr>
        </tbody>
      </table>

      <p>
        目安として1台あたり10前後から始めて実測で調整します。<Term>待ち時間が発生していないなら、増やす理由はありません</Term>。
      </p>

      <Aside label="サーバーレスとの相性">
        インスタンスが数百個まで自動で増える実行モデルでは、各インスタンスがプールを持った瞬間に上限を超え、<Term>データベース全体が接続を受け付けなくなります</Term>。対策は、間に接続を集約する層を挟むか、HTTPベースのアクセス方式を使うことです。これはサーバーレスを採用する時点で、必ず設計に織り込む必要があります。
      </Aside>

      <Heading num="03">枯渇の症状は独特</Heading>
      <p>
        プールが枯渇すると、アプリは<Term>クエリを投げる前の段階で待たされます</Term>。だから「データベースの負荷は低いのに、APIだけが軒並みタイムアウトする」という形で現れます。
      </p>

      <table>
        <thead>
          <tr><th>原因</th><th>詳細</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続の返し忘れ</td><td>取ったのに返していない。<strong>例外経路での漏れが最も多い</strong></td></tr>
          <tr><td className="hl">長いトランザクション</td><td><Link href="/backend/data-transaction">前ページ</Link>のとおり、中で外部を呼ぶと握り続ける</td></tr>
          <tr><td className="hl">遅いクエリ</td><td>1本が5秒かかれば、その間その接続は使えない</td></tr>
          <tr><td className="hl">N+1</td><td>1リクエストで100本投げれば、占有時間が100倍になる</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`// ✗ 例外が出ると返されず、1本ずつ静かに漏れていく
const client = await pool.connect();
const result = await client.query(sql);
client.release();

// ○ finally で必ず返す
async function withClient<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}`}</code>
      </pre>

      <p>
        返し忘れを防ぐ最も確実な方法は、<Term>接続を直接触らせないこと</Term>です。取得と返却を必ず対にするヘルパーを1つ作り、アプリのコードからはそれしか呼ばせません。あわせて、プールの<Term>統計値を監視</Term>します ― 保持本数・空き本数・待ち件数を記録しておけば、枯渇は事故になる前に「待ち件数の増加」として見えます。
      </p>

      <Heading num="04">1回のつもりが101回</Heading>
      <p>
        <Term>N+1問題</Term>は、一覧を取る1本のクエリのあとに、各行の関連データを取るクエリが行数だけ発行される現象です。
      </p>

      <pre>
        <code>{`const posts = await postRepo.findRecent(100);   // クエリ 1回

for (const post of posts) {
  // ループの中でクエリ → 100回
  post.author = await userRepo.findById(post.authorId);
}
// 合計 101 回。開発中は10件なので誰も気づかない`}</code>
      </pre>

      <DiagramFrame
        slug="backend-data-n-plus-1"
        aspect="640 / 340"
        caption="N+1問題とその解消を、時間軸に沿ったクエリの並びで比べた図。上段では一覧を取る1本のあとに、関連データを取るクエリが階段状に件数分だけ続き、その間ずっと1本の接続を握り続ける。下段はまとめて取った場合で、一覧を取る1本とIDを集めて一度に取る2本目だけになり、占有もごく短くなる。右側には、開発中は件数が少ないので誰も気づかず、本番の件数と同時アクセスではじめて表面化する、という注意が添えられている。"
      />

      <p>
        厄介なのは<Term>コードの見た目が自然なこと</Term>です。ORMの遅延読み込みでは、関連を参照しただけで裏でクエリが飛びます ― ソースからは1本も見えません。フィールドごとに解決する構造のAPIも、同じ理由で陥りやすい典型です。
      </p>
      <p>
        そして影響は掛け算で効きます。1本1ミリ秒でも100本なら100ミリ秒、しかもその間<Term>接続を占有し続ける</Term>ため、前節の枯渇と直結します。
      </p>

      <Heading num="05">まとめて取る</Heading>
      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">結合</td><td>1本のクエリで結合して取る</td><td>1対1、または関連が少ないとき</td></tr>
          <tr><td className="hl">まとめて問い合わせる</td><td>IDを集めて<code>WHERE id IN (...)</code>で2本目を投げる</td><td>1対多。<strong>最も汎用的</strong></td></tr>
          <tr><td className="hl">ORMの一括読み込み</td><td>取得時に関連を明示する</td><td>ORMを使っている場合の第一選択</td></tr>
          <tr><td className="hl">問い合わせの束ね役</td><td>同一リクエスト内の問い合わせを集約して1回にする</td><td>呼び出し箇所を集約できない構造</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`// まとめて問い合わせる ― 101回 → 2回
const posts = await postRepo.findRecent(100);

const authorIds = [...new Set(posts.map((p) => p.authorId))];
const authors = await userRepo.findByIds(authorIds);   // 2本目
const byId = new Map(authors.map((a) => [a.id, a]));

const result = posts.map((p) => ({ ...p, author: byId.get(p.authorId) }));`}</code>
      </pre>

      <Aside label="結合が常に正解ではない">
        1対多を結合すると、親の情報が子の件数だけ<Term>重複して転送されます</Term>。投稿100件それぞれにコメント50件なら5000行が返り、投稿の本文が50回ずつ繰り返されます。この場合は2本に分けたほうが速いことがよくあります。<Term>N+1を潰そうとして巨大な結合を組み、かえって遅くなる</Term>のは非常によくある失敗です。
      </Aside>

      <Heading num="06">見えるようにする</Heading>
      <p>
        N+1は「気をつける」では防げません。見えるようにするのが唯一の対策です。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">リクエスト単位のクエリ数をログに出す</td><td>「1リクエストで83本」が即座に分かる。<strong>最も費用対効果が高い</strong></td></tr>
          <tr><td className="hl">開発環境でクエリログを有効にする</td><td>ループの中でSQLが並ぶのが目で見える</td></tr>
          <tr><td className="hl">遅いクエリのログ</td><td>1本が遅い問題を見つける(N+1は1本ずつ速いので映らない)</td></tr>
          <tr><td className="hl">実行計画の確認</td><td><Link href="/database/index">索引</Link>が使われているかを見る</td></tr>
          <tr><td className="hl"><Link href="/backend/ops-tracing">分散トレーシング</Link></td><td>1リクエスト内の呼び出しが時系列で並び、N+1が階段状に見える</td></tr>
        </tbody>
      </table>

      <p>
        閾値を決めて<Term>1リクエストのクエリ数が一定を超えたら警告を出す</Term>仕組みを入れておくと、N+1は書いた本人がその日のうちに気づけます。
      </p>

      <Heading num="07">その他の頻出パターン</Heading>
      <table>
        <thead>
          <tr><th>問題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">全列を取る</td><td>使わない列(とくに長いテキスト)まで転送される。必要な列だけ挙げる</td></tr>
          <tr><td className="hl">全件取ってアプリで絞る</td><td>絞り込みと件数制限をデータベースに任せる。<strong>件数はいずれ必ず増える</strong></td></tr>
          <tr><td className="hl">位置指定によるページング</td><td>深いページほど遅くなる。<Term>前回の最後の値を条件にする方式</Term>へ</td></tr>
          <tr><td className="hl">1件ずつの挿入</td><td>まとめて挿入する</td></tr>
          <tr><td className="hl">毎回同じ固定データを引く</td><td><Link href="/backend/cache">キャッシュ</Link>する。ただし無効化の設計とセットで</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        プールは店の窓口の数です。増やすほど客を捌けるように思えますが、奥の厨房の能力が同じなら、行列が店の外から店内に移るだけです。そしてN+1は、100人分の買い物を<Term>1品ずつ100往復して</Term>買いに行くようなもの。1往復は短くても、往復の回数そのものが問題で、その間ずっと窓口を1つ塞いでいます。買い物リストをまとめて1回で行けば、窓口も空き、行列も消えます。
      </Analogy>

      <Heading num="まとめ">本数は控えめに、往復は少なく</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>プールは1つ、大きくしない</h4>
          <p>台数×サイズが上限を超えないこと。増やしても速くならない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>接続は必ず返す</h4>
          <p>例外経路の漏れが枯渇の最多原因。直接触らせないヘルパーで封じる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>N+1は可視化で潰す</h4>
          <p>リクエストごとのクエリ数をログに出す。結合よりまとめが正解なことも多い。</p>
        </Card>
      </CardGrid>

      <p>
        次は、そのテーブル定義そのものを安全に変えていく方法です。<Link href="/backend/data-migration">マイグレーション</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/data-pool" />
    </DocsPage>
  );
}
