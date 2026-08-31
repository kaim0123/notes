import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "マイグレーション" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>マイグレーション ― 動いているデータベースの形を変える</h1>
        <Lead>
          <Link href="/database/design">ER図と正規化</Link>で設計したスキーマは、一度作って終わりではありません。問題は、変えたい時点で<Term>すでに本番のデータが入っており、旧バージョンのアプリが動いている</Term>ことです。ここでは、稼働中のシステムの形を止めずに変えていく手順を扱います。<Link href="/dev/git-config-change">構成管理</Link>の考え方を、コードではなくデータ構造に適用する回です。
        </Lead>
      </Hero>

      <Heading num="01">スキーマもバージョン管理する</Heading>
      <p>
        まず前提として、<Term>手作業でテーブル定義を変える運用を捨てます</Term>。管理ツールから直接触ると、次の問題がすべて発生します。
      </p>

      <table>
        <thead>
          <tr><th>手作業の問題</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">環境ごとにスキーマがずれる(そして誰も気づかない)</td></tr>
          <tr><td className="hl">「いつ、誰が、なぜ」変えたかの記録が残らない</td></tr>
          <tr><td className="hl">新しく参加した人が、手元の環境を再現できない</td></tr>
          <tr><td className="hl">コードの変更と形の変更が別々に出て、順序を間違える</td></tr>
        </tbody>
      </table>

      <p>
        <Term>マイグレーション</Term>とは、形の変更を<Term>順序付きのファイル</Term>としてリポジトリに置き、コードと同じ変更単位でレビューし、同じデプロイで適用する仕組みです。これにより「このコミット時点のスキーマ」が一意に定まります。
      </p>

      <Heading num="02">仕組み ― 適用済みを記録して差分だけ実行する</Heading>
      <pre>
        <code>{`migrations/
├─ 20260701093000_create_users.sql
├─ 20260715142200_add_orders.sql
└─ 20260808110500_add_status_to_orders.sql`}</code>
      </pre>

      <p>
        データベースの中に管理用のテーブルがあり、適用済みファイルの名前が記録されています。実行すると、<Term>まだ記録に無いものだけを、名前順に</Term>適用します。何度実行しても結果は同じです。ファイル名に作成日時を使うのは、<Term>並行して開発しても番号が衝突しにくい</Term>からです。
      </p>

      <Aside label="自動生成に任せきりにしない">
        多くのORMは、スキーマ定義の差分からマイグレーションを自動生成できます。便利ですが、生成されたSQLは必ず読んでください。「列の型を変える」つもりが<Term>列の削除と追加</Term>になっていた ― つまりデータが消える ― という生成結果は珍しくありません。<Term>自動生成は下書きであって、レビュー対象のコード</Term>です。
      </Aside>

      <Heading num="03">壊さない変更と、壊す変更</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">後方互換のある変更</td><td>NULLを許す列の追加、新しいテーブル、索引の追加</td><td>そのまま適用してよい。旧コードは無視するだけ</td></tr>
          <tr><td className="hl">壊す変更</td><td>列の削除・改名、型変更、NULL禁止化</td><td><strong>1回のリリースでやってはいけない</strong></td></tr>
        </tbody>
      </table>

      <p>
        壊す変更が危険なのは、<Term>デプロイには必ず「旧コードと新スキーマが同時に存在する時間」がある</Term>からです。入れ替えの最中は旧バージョンのプロセスが残りますし、切り戻せばもっと長くなります。列を改名した瞬間、まだ生きている旧コードは存在しない列を参照して全リクエストが失敗します。
      </p>
      <p>
        <Link href="/backend/api-versioning">APIのバージョニング</Link>とまったく同じ構図で、解き方も同じです。
      </p>

      <Heading num="04">壊す変更を3段階に分ける</Heading>
      <p>
        定石は<Term>拡張と縮小</Term>です。壊す変更を、<Term>それぞれ単独では後方互換な3つのリリース</Term>に分解します。列を改名する例で見ます。
      </p>

      <table>
        <thead>
          <tr><th>段階</th><th>スキーマ</th><th>アプリ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 拡張</td><td>新しい列を追加(NULLを許す)</td><td>変更なし</td></tr>
          <tr><td className="hl">② 移行</td><td>既存データを新しい列へ写す</td><td><strong>両方に書き</strong>、読み取りは新しい列から</td></tr>
          <tr><td className="hl">③ 縮小</td><td>古い列を削除</td><td>古い列への書き込みをやめる</td></tr>
        </tbody>
      </table>

      <p>
        手間は増えますが、<Term>どの瞬間に切り戻しても壊れません</Term>。同じ手順は、型変更(新しい型の列を足して移す)、NULL禁止化(埋めてから制約を付ける)、テーブル分割にも使えます。段階ごとの図解は<Link href="/dev/ci-deploy">デプロイ戦略とロールバック</Link>にあります。
      </p>

      <Aside label="③を忘れる問題">
        現実には①②まで実施して③が永遠に実施されず、使われない列が残り続けます。忘れないよう、<Term>③の作業チケットを②の時点で作っておく</Term>のが実務的な対策です。
      </Aside>

      <Heading num="05">大きなテーブルへの変更はロックを伴う</Heading>
      <p>
        もう1つの落とし穴です。開発環境の100行では一瞬で終わる操作が、本番の1000万行では数分間テーブル全体を止めます。そしてもっと厄介なのは、<Term>待たされるのが自分だけではない</Term>ことです。
      </p>

      <DiagramFrame
        slug="backend-data-migration-lock"
        aspect="640 / 330"
        caption="スキーマ変更が全体を巻き込んで止める仕組みを時間軸で示した図。先に走っていた長い集計クエリがロックを握ったまま続き、スキーマ変更はテーブル全体のロックを要求するためその終了を待つ。問題は、そのあとに来たごく普通の読み取りクエリが、待機中のスキーマ変更の後ろに並ばされることで、結果としてテーブルへのアクセスがすべて止まる。下部には対策として、ロックを待つ時間に上限を設けておけば、取れなかった時点でスキーマ変更だけが失敗して終わり、後続を巻き込まずに済むことが示されている。"
      />

      <table>
        <thead>
          <tr><th>操作</th><th>注意点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">索引の追加</td><td>通常の作り方は書き込みを止める。止めずに作る方式を選ぶ</td></tr>
          <tr><td className="hl">NULL禁止制約の追加</td><td>全行の走査が走る。検証を後回しにできる方式で分ける</td></tr>
          <tr><td className="hl">既定値付きの列追加</td><td>製品とバージョンによっては、全行の書き換えになる</td></tr>
          <tr><td className="hl">型変更</td><td>ほぼ確実にテーブル全体の書き換え。新しい列を足す方式へ置き換える</td></tr>
          <tr><td className="hl">ロック待ち</td><td>長いクエリの後ろで待ち、<strong>さらに後続の全クエリを塞ぐ</strong></td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`-- ロックが3秒で取れなければ諦める(全体を巻き込まない)
SET lock_timeout = '3s';

-- 索引はテーブルを止めずに作る(トランザクションの外で実行する)
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);`}</code>
      </pre>

      <Heading num="06">データの移行はスキーマ変更と分ける</Heading>
      <p>
        「1000万行を新しい列に写す」ような処理を、マイグレーションファイルの中に書いてはいけません。デプロイが数十分止まり、失敗すれば中途半端な状態で切り戻しもできません。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">形の変更</td><td>マイグレーション。<strong>速く終わることが前提</strong></td></tr>
          <tr><td className="hl">データの移し替え</td><td><strong>独立したスクリプトや<Link href="/backend/jobs">ジョブ</Link></strong>。少しずつ、再実行できる形で</td></tr>
        </tbody>
      </table>

      <p>
        移し替えは<Term>小分けにして</Term>実行します。1000件ずつ処理して少し待つ、を繰り返せば、本番の負荷を跳ね上げずに済みます。そして必ず<Term>途中から再開できる</Term>ように書きます ― 「まだ移っていない行」を条件にすれば、何度実行しても正しく完了します。
      </p>

      <Heading num="07">戻れるとは限らない</Heading>
      <p>
        取り消し用の手順を書いておくのは良い習慣ですが、<Term>本番での巻き戻しに使えると期待してはいけません</Term>。列を削除する変更の取り消しは列を作り直せますが、<Term>中に入っていたデータは戻りません</Term>。
      </p>

      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">前進で直す</td><td>問題があれば、巻き戻すのではなく<strong>直す変更を新たに適用する</strong></td></tr>
          <tr><td className="hl">壊す操作を遅らせる</td><td>3段階の③を数日置く。それまでは戻せる</td></tr>
          <tr><td className="hl">事前に控えを取る</td><td>適用前の複製を取っておく</td></tr>
          <tr><td className="hl">本番相当で予行演習</td><td>同規模のデータで、実行時間とロック時間を測ってから流す</td></tr>
        </tbody>
      </table>

      <Heading num="08">環境ごとの運用</Heading>
      <table>
        <thead>
          <tr><th>場面</th><th>やり方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ローカル開発</td><td>全マイグレーションを適用し、<Term>種データ</Term>で開発用の中身を入れる</td></tr>
          <tr><td className="hl">テスト</td><td>テスト用のデータベースにも同じ手順を適用する</td></tr>
          <tr><td className="hl">CI</td><td>最後まで通ること、生成物とスキーマ定義に差分が無いことを検証する</td></tr>
          <tr><td className="hl">デプロイ</td><td>アプリの起動前に、独立した工程として実行する。<strong>複数台が同時に実行しないよう排他する</strong></td></tr>
        </tbody>
      </table>

      <p>
        テスト用のスキーマを手で作ると、本番との差異に気づけません。<Term>テスト環境こそマイグレーションで作る</Term> ― これがマイグレーション自体の継続的な検証になります。
      </p>

      <Analogy label="💡 たとえるなら">
        営業しながらの店舗改装です。閉店して一気に作り替えられるなら簡単ですが、客が入っている以上そうはいきません。だから新しいレジを<Term>まず横に増やし</Term>、しばらく両方を動かして誰も困らないことを確かめ、それから古いレジを撤去します。工事中に通路を塞げば店全体が止まるので、大がかりな作業は時間を区切り、駄目なら中止する。そして<Term>撤去した什器は戻ってきません</Term> ― だからこそ、撤去は最後まで先送りします。
      </Analogy>

      <Heading num="まとめ">3段階に分け、ロックを恐れる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>スキーマもコードと一緒に</h4>
          <p>順序付きファイルで管理し、同じレビューと同じデプロイに乗せる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>壊す変更は3つに分ける</h4>
          <p>旧コードと新スキーマが共存する時間は必ずある。どの瞬間も壊れない形に。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>変更はロックする</h4>
          <p>本番の行数で考える。待ち時間に上限を設け、データの移し替えは別に分ける。</p>
        </Card>
      </CardGrid>

      <p>
        データ層の最後は、そもそも問い合わせを減らす手段です。<Link href="/backend/cache">サーバーサイドキャッシュ</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/data-migration" />
    </DocsPage>
  );
}
