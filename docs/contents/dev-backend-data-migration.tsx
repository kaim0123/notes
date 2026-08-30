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
  title: "マイグレーション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; データ層</Eyebrow>
        <h1>マイグレーション ― 動いているDBのスキーマを変える</h1>
        <Lead>
          <Link href="/database/design">ER図と正規化</Link>で設計したスキーマは、一度作って終わりではありません。機能追加のたびに列が増え、要件の変化で型が変わります。問題は、<strong>その時点でDBには本番のデータが入っており、旧バージョンのアプリが動いている</strong>ことです。ここでは、稼働中のシステムのスキーマを止めずに変えていく手順を扱います。<Link href="/dev/sdlc/management/config">構成管理</Link>の考え方を、コードではなくデータ構造に適用する回です。
        </Lead>
      </Hero>

      <Heading num="01">スキーマもバージョン管理する</Heading>
      <p>まず前提として、<strong>手作業でALTER TABLEを打つ運用を捨てます</strong>。管理ツールから直接スキーマを変えると、次の問題がすべて発生します。</p>
      <table>
        <thead>
          <tr><th>手作業の問題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開発・ステージング・本番でスキーマがずれる(そして誰も気付かない)</td></tr>
          <tr><td className="hl">「いつ、誰が、なぜ」変えたかの記録が残らない</td></tr>
          <tr><td className="hl">新しく参加した人が、手元の環境を再現できない</td></tr>
          <tr><td className="hl">コードの変更とスキーマの変更が別々にリリースされ、順序を間違える</td></tr>
        </tbody>
      </table>
      <p><Term>マイグレーション</Term>とは、スキーマの変更を<strong>順序付きのファイル</strong>としてリポジトリに置き、コードと同じPull Requestでレビューし、同じデプロイで適用する仕組みです。これにより「このコミット時点のスキーマ」が一意に定まります。</p>

      <Heading num="02">仕組み ― 適用済みを記録して差分だけ実行する</Heading>
      <p>どのツールも、原理は同じです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`migrations/
├─ 20260701093000_create_users.sql
├─ 20260715142200_add_orders.sql
└─ 20260808110500_add_status_to_orders.sql`}</code>
      </pre>
      <p>DBの中に<code>schema_migrations</code>のような管理テーブルがあり、適用済みファイルの名前が記録されています。実行すると、<strong>まだ記録に無いものだけを、ファイル名順に</strong>適用します。冪等なので、何度実行しても結果は同じです。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">連番/タイムスタンプ</td><td>適用順序を決める。<strong>作成日時を使うと、並行開発でも衝突しにくい</strong></td></tr>
          <tr><td className="hl">up(前進)</td><td>適用する変更</td></tr>
          <tr><td className="hl">down(後退)</td><td>取り消す変更。書いておくが、本番で使えることは稀(08節)</td></tr>
          <tr><td className="hl">管理テーブル</td><td>どこまで適用したかの記録</td></tr>
        </tbody>
      </table>
      <Aside label="ORMの自動生成に任せきりにしない">
        Prisma・Drizzle・TypeORMなどは、スキーマ定義の差分からマイグレーションを<strong>自動生成</strong>できます。便利ですが、生成されたSQLは必ず読んでください。「列の型を変える」つもりが<strong>DROP COLUMN + ADD COLUMN</strong>になっていた ― つまりデータが消える ― という生成結果は珍しくありません。自動生成は下書きであって、レビュー対象のコードです。
      </Aside>

      <Heading num="03">壊さない変更と、壊す変更</Heading>
      <p>変更には2種類あり、扱いがまったく違います。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">後方互換のある変更</td><td>NULL許容の列を追加、新しいテーブル、索引の追加</td><td>そのまま適用してよい。旧コードは無視するだけ</td></tr>
          <tr><td className="hl">破壊的変更</td><td>列の削除・リネーム、型変更、NOT NULL化</td><td><strong>1回のリリースでやってはいけない</strong></td></tr>
        </tbody>
      </table>
      <p>破壊的変更が危険なのは、<strong>デプロイには必ず「旧コードと新スキーマが同時に存在する時間」がある</strong>からです。ローリングデプロイなら数分間、旧バージョンのプロセスが残ります。ロールバックすればもっと長くなります。列をリネームした瞬間、まだ生きている旧コードは存在しない列を参照して全リクエストが失敗します。</p>

      <Heading num="04">拡張と縮小 ― 破壊的変更を3段階に分ける</Heading>
      <p>これを解く定石が<Term>Expand and Contract(拡張と縮小)</Term>です。破壊的変更を、<strong>それぞれ単独では後方互換な3つのリリース</strong>に分解します。<code>name</code>列を<code>full_name</code>にリネームする例で見ます。</p>
      <Diagram caption="旧コードと新コードが常に共存できる状態を保ちながら移行する">
        <svg viewBox="0 0 540 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={15} y={30} width={160} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={30} y={52} fill="#39ff6a" fontSize="12">① 拡張</text>
          <text x={30} y={72} fill="#9a9a9a" fontSize="10">full_name を追加(NULL可)</text>

          <rect x={190} y={30} width={160} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={205} y={52} fill="#39ff6a" fontSize="12">② 移行</text>
          <text x={205} y={72} fill="#9a9a9a" fontSize="10">両方に書き、読みを切替</text>

          <rect x={365} y={30} width={160} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={380} y={52} fill="#39ff6a" fontSize="12">③ 縮小</text>
          <text x={380} y={72} fill="#9a9a9a" fontSize="10">name を削除</text>

          <path d="M175 60 l12 0" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M187 60 l-8 -4 v8 z" fill="#5f5f5f" />
          <path d="M350 60 l12 0" stroke="#5f5f5f" strokeWidth="1.5" />
          <path d="M362 60 l-8 -4 v8 z" fill="#5f5f5f" />

          <line x1={15} y1={120} x2={525} y2={120} stroke="#5f5f5f" strokeDasharray="4 4" />
          <text x={15} y={140} fill="#6a6a6a" fontSize="10">この区間はどの時点でも、旧コード・新コードのどちらが動いていても壊れない</text>
          <text x={15} y={162} fill="#6a6a6a" fontSize="10">③は「旧コードがもう存在しない」ことを確認してから実施する</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>段階</th><th>スキーマ</th><th>アプリ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 拡張</td><td><code>full_name</code>を追加(NULL許容)</td><td>変更なし</td></tr>
          <tr><td className="hl">② 移行</td><td>既存データを<code>full_name</code>へコピー</td><td><strong>両方の列に書き</strong>、読み取りは<code>full_name</code>から</td></tr>
          <tr><td className="hl">③ 縮小</td><td><code>name</code>を削除</td><td><code>name</code>への書き込みをやめる</td></tr>
        </tbody>
      </table>
      <p>手間は増えますが、<strong>どの瞬間にロールバックしても壊れません</strong>。同じ手順は、型変更(新しい型の列を足して移行)、NOT NULL化(埋めてから制約を付ける)、テーブル分割にも使えます。</p>
      <Aside label="③を忘れる問題">
        現実には、①②まで実施して③が永遠に実施されず、使われない列が残り続けます。忘れないよう、<strong>③のチケットを②の時点で作っておく</strong>のが実務的な対策です。
      </Aside>

      <Heading num="05">大きなテーブルへのDDLはロックを伴う</Heading>
      <p>もう1つの落とし穴が、<strong>DDLがテーブルをロックする</strong>ことです。開発環境の100行では一瞬で終わる操作が、本番の1000万行では数分間テーブル全体を止めます。その間、そのテーブルへの読み書きはすべて待たされ、事実上の障害になります。</p>
      <table>
        <thead>
          <tr><th>操作</th><th>注意点(PostgreSQLの例)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">索引の追加</td><td>通常の<code>CREATE INDEX</code>は書き込みをブロックする。<code>CONCURRENTLY</code>を使う</td></tr>
          <tr><td className="hl">NOT NULL制約の追加</td><td>全行スキャンが走る。<code>NOT VALID</code>で追加してから<code>VALIDATE</code>する</td></tr>
          <tr><td className="hl">既定値付きの列追加</td><td>新しいバージョンでは高速だが、古いバージョンでは全行書き換えになる</td></tr>
          <tr><td className="hl">型変更</td><td>ほぼ確実にテーブル全体の書き換え。新列を足す方式に置き換える</td></tr>
          <tr><td className="hl">ロック待ち</td><td>長いクエリが走っていると、DDLはその後ろで待ち、<strong>さらに後続の全クエリを塞ぐ</strong></td></tr>
        </tbody>
      </table>
      <p>対策として、マイグレーション実行時には<code>lock_timeout</code>を短く設定しておきます。ロックが取れなければ失敗して終わる方が、全アクセスを巻き込んで待たせるより遥かに安全です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`-- ロックが3秒で取れなければ諦める(全体を巻き込まない)
SET lock_timeout = '3s';

-- 索引はテーブルを止めずに作る(トランザクション外で実行する必要がある)
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);`}</code>
      </pre>

      <Heading num="06">データの移行はスキーマ変更と分ける</Heading>
      <p>「1000万行を新しい列にコピーする」ような処理を、マイグレーションファイルの中に書いてはいけません。デプロイが数十分止まり、失敗すれば中途半端な状態でロールバックもできません。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スキーマ変更(DDL)</td><td>マイグレーション。速く終わることが前提</td></tr>
          <tr><td className="hl">データ移行(バックフィル)</td><td><strong>独立したスクリプトや<Link href="/dev/backend/jobs">ジョブ</Link></strong>。少しずつ、再実行可能に</td></tr>
        </tbody>
      </table>
      <p>バックフィルは<strong>バッチに分けて</strong>実行します。1000件ずつ処理して少し待つ、を繰り返せば、本番の負荷を跳ね上げずに済みます。そして必ず<strong>途中から再開できる</strong>ように書きます ― 「まだ移行されていない行」を条件にすれば、何度実行しても正しく完了します。</p>

      <Heading num="07">ロールバックは「戻れる」とは限らない</Heading>
      <p><code>down</code>を書いておくのは良い習慣ですが、<strong>本番での巻き戻しに使えると期待してはいけません</strong>。列を削除するマイグレーションの<code>down</code>は列を作り直せますが、<strong>中に入っていたデータは戻りません</strong>。</p>
      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">前進で直す</td><td>問題があれば、巻き戻すのではなく<strong>修正するマイグレーションを新たに適用する</strong></td></tr>
          <tr><td className="hl">破壊的操作を遅らせる</td><td>Expand and Contractの③を数日置く。それまでは巻き戻せる</td></tr>
          <tr><td className="hl">事前にバックアップ</td><td>適用前のスナップショットを取る(<Link href="/infra/storage/backup">バックアップと復旧</Link>)</td></tr>
          <tr><td className="hl">本番相当で予行演習</td><td>本番と同規模のデータで実行時間とロック時間を測ってから流す</td></tr>
        </tbody>
      </table>

      <Heading num="08">環境ごとの運用</Heading>
      <p>最後に、日々の開発での回し方です。</p>
      <table>
        <thead>
          <tr><th>場面</th><th>やり方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ローカル開発</td><td>Dockerで起動したDBに全マイグレーションを適用し、<Term>シード</Term>で開発用データを投入する</td></tr>
          <tr><td className="hl"><Link href="/dev/backend/test">テスト</Link></td><td>テスト用DBに同じマイグレーションを適用する。<strong>本番と同じ経路で作る</strong>ことが重要</td></tr>
          <tr><td className="hl">CI</td><td>マイグレーションが最後まで通ること、および生成物とスキーマ定義に差分が無いことを検証する</td></tr>
          <tr><td className="hl">デプロイ</td><td>アプリの起動前に、独立した工程として実行する。<strong>複数台が同時に実行しないよう排他する</strong></td></tr>
        </tbody>
      </table>
      <p>テストDBを「手で作ったスキーマ」で用意すると、本番との差異に気付けません。<strong>テスト環境こそマイグレーションで作る</strong> ― これがマイグレーション自体の継続的な検証になります。</p>

      <Analogy label="💡 たとえるなら">
        営業しながらの店舗改装です。閉店して一気に作り替えられるなら簡単ですが、客が入っている以上そうはいきません。だから新しいレジを<strong>まず横に増やし</strong>(拡張)、しばらく両方を稼働させて誰も困らないことを確かめ(移行)、それから古いレジを撤去します(縮小)。工事中に通路を塞げば店全体が止まるので、大がかりな作業は時間を区切り、駄目なら中止する(<code>lock_timeout</code>)。そして撤去した什器は戻ってきません ― だからこそ、撤去は最後まで先送りするのです。
      </Analogy>

      <Heading num="まとめ">3段階に分け、ロックを恐れる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>スキーマもコードと一緒に</h4><p>順序付きファイルでリポジトリ管理し、同じPRでレビューし同じデプロイで適用する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>破壊的変更は拡張・移行・縮小</h4><p>旧コードと新スキーマが共存する時間が必ずある。どの瞬間も壊れない形に分解する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DDLはロックする</h4><p>本番の行数で考える。lock_timeoutを設定し、大量データの移行は別ジョブに分ける。</p></Card>
      </CardGrid>
      <p>データ層はここまでです。次は、リクエストの中で完結させない処理 ― <Link href="/dev/backend/jobs">ジョブキューとワーカー</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
            <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
            <RelatedLink href="/dev/ci" tag="実装">CI/CDパイプライン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
