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
  title: "アプリ機能とDB設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 発展</Eyebrow>
        <h1>アプリ機能とDB設計 ― 機能ごとに押さえるDBの検討事項</h1>
        <Lead>
          テーブル設計やSQLの基礎を学んだあと、実際のアプリ機能を実装するときに「DB側で何を決めておくべきか」が問われます。検索・タイムライン・通知・いいねなど、画面に見える機能ひとつひとつには、インデックス・集計・制約といったDBの選択が直結します。ここでは機能別の主な検討事項を一覧し、設計レビューのチェックリストとして使えるように整理します。
        </Lead>
      </Hero>

      <Heading num="01">機能とDBの対応 ― 一覧表</Heading>
      <p>次の表は、アプリの代表的な機能を実装するときにDB設計で最初に確認すべき論点です。詳細は以降の節で補足します。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>主な検討事項</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">検索</td><td>インデックス、全文検索</td></tr>
          <tr><td className="hl">フィルタ</td><td>複合インデックス</td></tr>
          <tr><td className="hl">並び替え</td><td><code>ORDER BY</code>対応インデックス</td></tr>
          <tr><td className="hl">ページネーション</td><td>カーソル方式、<code>OFFSET</code>の回避</td></tr>
          <tr><td className="hl">ランキング</td><td>集計・カウンタの保持</td></tr>
          <tr><td className="hl">集計</td><td>集計テーブル、キャッシュ</td></tr>
          <tr><td className="hl">タイムライン</td><td>JOIN戦略、非正規化</td></tr>
          <tr><td className="hl">チャット</td><td>時系列インデックス</td></tr>
          <tr><td className="hl">通知</td><td>未読フラグ、複合インデックス</td></tr>
          <tr><td className="hl">いいね・フォロー</td><td>中間テーブル、ユニーク制約</td></tr>
          <tr><td className="hl">権限管理</td><td>テナント・ユーザー単位のインデックス</td></tr>
          <tr><td className="hl">履歴・ログ</td><td>パーティショニング、アーカイブ</td></tr>
          <tr><td className="hl">排他制御</td><td>トランザクション、ロック</td></tr>
          <tr><td className="hl">削除</td><td>論理削除、外部キー制約</td></tr>
        </tbody>
      </table>

      <Heading num="02">一覧・検索系 ― 検索、フィルタ、並び替え、ページネーション</Heading>
      <p>一覧画面は「条件で絞る → 順序を決める → 必要な分だけ取る」の3段階です。どの段階でDBがボトルネックになるかを意識して設計します。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>DBで決めること</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">検索</td>
            <td>
              キーワード一致には<Link href="/database/index">インデックス</Link>が基本です。部分一致(<code>LIKE &apos;%...%&apos;</code>)だけではB-treeが効きにくいため、件数が増えたら<Term>全文検索</Term>(PostgreSQLの<code>tsvector</code>、Elasticsearchなど)を検討します。検索対象の列と、更新頻度のバランスを見ます。
            </td>
          </tr>
          <tr>
            <td className="hl">フィルタ</td>
            <td>
              複数条件を同時に使う画面では、<Term>複合インデックス</Term>の列順が効きます。たとえば「テナントID + ステータス + 更新日時」のように、等値で絞る列を先に、範囲・並び替えに使う列を後に置くのが定石です。使われない組み合わせ用のインデックスを増やしすぎないことも重要です。
            </td>
          </tr>
          <tr>
            <td className="hl">並び替え</td>
            <td>
              <code>ORDER BY</code>の列がインデックスの並びと一致していれば、ソート処理を省略できます。フィルタ条件と並び替え列を1本の複合インデックスにまとめられるかが、一覧の体感速度を左右します。
            </td>
          </tr>
          <tr>
            <td className="hl">ページネーション</td>
            <td>
              <code>LIMIT ... OFFSET ...</code>は深いページほど「それまでの行を読み飛ばす」コストが増えます。件数が増えるサービスでは、前ページの末尾値(たとえば<code>created_at</code>とID)を<Term>カーソル</Term>として渡す方式が一般的です。カーソル列にもインデックスが必要です。
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">集計・ランキング ― その場計算か、先に数えるか</Heading>
      <p>「人気順」「売上合計」「今月の件数」は、毎回全行を数え直すと重くなります。リアルタイム性と更新コストのトレードオフで、保持方法を選びます。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>DBで決めること</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ランキング</td>
            <td>
              いいね数・閲覧数などを都度<code>COUNT</code>するより、行に<Term>カウンタ列</Term>を持たせて増減させる方が読み取りは速いです。更新のたびに整合性を保つ必要があり、<Link href="/database/transaction">トランザクション</Link>や排他制御とセットで設計します。
            </td>
          </tr>
          <tr>
            <td className="hl">集計</td>
            <td>
              レポートやダッシュボード向けには<Term>集計テーブル</Term>(日次サマリなど)を別途持ち、バッチやトリガーで更新する方法が多いです。許容できる遅延があるなら、Redisなどの<Term>キャッシュ</Term>に結果を載せる選択もあります。「<Link href="/database/performance">パフォーマンスチューニング</Link>」で触れた非正規化と同じ発想です。
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">フィード・コミュニケーション系 ― タイムライン、チャット、通知、いいね</Heading>
      <p>時系列で並ぶデータは「新しいものからN件」というアクセスパターンが支配的です。JOINの回数と、インデックスの向きを機能に合わせて決めます。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>DBで決めること</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">タイムライン</td>
            <td>
              投稿・フォロー・メタ情報を毎回JOINすると重くなります。表示に必要な作者名やアイコンURLを投稿行に<Term>非正規化</Term>して持つ、あるいは「ユーザーごとのタイムライン用中間テーブル」を別途持つなど、読み取りパターンに合わせたJOIN戦略を選びます。
            </td>
          </tr>
          <tr>
            <td className="hl">チャット</td>
            <td>
              ルームIDと送信日時(または連番)の<Term>時系列インデックス</Term>が中心です。「このルームの最新100件」を速く取る列順を意識し、古いメッセージは<Term>パーティション</Term>やアーカイブテーブルへ移す運用も検討します。
            </td>
          </tr>
          <tr>
            <td className="hl">通知</td>
            <td>
              「未読だけ」「種類別に」といった絞り込みが多いため、<Term>未読フラグ</Term>列と、ユーザーID・既読状態・作成日時を組み合わせた<Term>複合インデックス</Term>が効きます。通知件数が膨大なら、古い既読通知の削除やアーカイブも設計に含めます。
            </td>
          </tr>
          <tr>
            <td className="hl">いいね・フォロー</td>
            <td>
              多対多の関係は<Term>中間テーブル</Term>で表します。(ユーザーID, 投稿ID)のような<Term>ユニーク制約</Term>を張っておけば、二重いいねや二重フォローをDB側で防げます。逆方向の一覧(「この投稿にいいねした人」)用に、列順を変えたインデックスを追加するケースもあります。
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="05">運用・整合性 ― 権限、履歴、排他、削除</Heading>
      <p>画面に直接現れにくい機能ほど、後から手を入れるコストが大きいです。マルチテナントや監査要件があるサービスでは、最初からDBの枠組みに組み込んでおきます。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>DBで決めること</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">権限管理</td>
            <td>
              テナントIDやユーザーIDをほぼすべてのクエリの条件に含める設計では、それらを先頭に置いた<Term>インデックス</Term>が必須です。行レベルセキュリティ(RLS)や、DBユーザーを用途別に分ける<Term>アクセス制御</Term>も、<Link href="/database/index">索引とアクセス制御</Link>の延長として検討します。
            </td>
          </tr>
          <tr>
            <td className="hl">履歴・ログ</td>
            <td>
              追記だけが続くテーブルは行数が際限なく増えます。日付やテナントで<Term>パーティショニング</Term>し、古い区画を<Term>アーカイブ</Term>ストレージへ退避する運用を想定しておきます。監査ログは改ざんされにくいよう、更新・削除をアプリから禁止する設計も多いです。
            </td>
          </tr>
          <tr>
            <td className="hl">排他制御</td>
            <td>
              在庫引当・座席予約・カウンタ更新など、同時更新で不整合が起きる処理は<Link href="/database/transaction">トランザクション</Link>でまとめ、必要に応じて行ロック(<code>SELECT ... FOR UPDATE</code>)や楽観的ロック(バージョン列)を使います。ロック範囲が広いほど待ちが増えるため、競合の起き方に合わせて方式を選びます。
            </td>
          </tr>
          <tr>
            <td className="hl">削除</td>
            <td>
              物理削除だけに頼ると、関連データの整合や復元要件に応じられません。<Term>論理削除</Term>(<code>deleted_at</code>列など)を採用する場合、一覧クエリの条件とインデックス設計に「未削除だけ」を常に含める必要があります。<Term>外部キー制約</Term>で参照整合性を保ちつつ、カスケード削除か論理削除かを機能ごとに決めます。
            </td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        機能ごとのDB設計は、料理の注文に合わせて厨房の動線を決めるようなものです。検索・フィルタは「よく使う材料の棚」を近くに置く(インデックス)、ランキングは「人気メニューの残数ボード」を先に用意する(カウンタ)、タイムラインは「盛り付け用トレイを最初から並べておく」(非正規化)といった具合に、よく出る注文(アクセスパターン)から逆算して設備(DB)を整えます。
      </Analogy>

      <Aside label="補足">
        ここで挙げた論点は、機能を追加するたびに設計レビューで当てはめるチェックリストとして使えます。まず「この画面のクエリは何を条件に、何順で、何件取るか」を書き出し、表の該当行と照らし合わせると、インデックス不足や非正規化の要否が見えやすくなります。
      </Aside>

      <Heading num="まとめ">機能から逆算してDBを決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>一覧系はインデックスの列順</h4><p>フィルタ・並び替え・ページネーションは、複合インデックスとカーソル方式でまとめて設計します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>集計系は先に数える</h4><p>ランキングやダッシュボードは、カウンタ列・集計テーブル・キャッシュで読み取りを速くします。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>時系列は読み取りパターン優先</h4><p>タイムライン・チャット・通知は、JOINを減らし、時系列インデックスとアーカイブを用意します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>整合性は制約とトランザクション</h4><p>いいね・フォローはユニーク制約、削除は論理削除と外部キー、更新競合はトランザクションとロックで守ります。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
            <RelatedLink href="/database/index" tag="データベース">索引とアクセス制御</RelatedLink>
            <RelatedLink href="/database/performance" tag="データベース">パフォーマンスチューニング</RelatedLink>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
