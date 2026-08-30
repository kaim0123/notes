import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "エラー設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>エラー設計 ― 失敗をどう表し、どこで受け止めるか</h1>
        <Lead>
          正常系の設計には時間をかけるのに、失敗の扱いは「とりあえず <code>try/catch</code>」で済ませてしまう ―
          これが、原因の分からない障害と、利用者に意味の通じないエラー画面を生みます。エラー設計とは、<strong>どんな失敗がありうるかを型と構造で表し、責任を持つ場所で1度だけ処理する</strong>ことです。
        </Lead>
      </Hero>

      <p>フレームワーク上の実装は「<Link href="/dev/backend/express/error">エラーハンドリング</Link>」、外部呼び出しの失敗対策は「<Link href="/dev/backend/ops/resilience">タイムアウト・リトライ・遮断</Link>」で扱っています。ここでは<strong>言語や層をまたぐ設計判断</strong>を整理します。</p>

      <Heading num="01">まず2種類に分ける</Heading>
      <p>エラー設計の出発点は、失敗を性質で分けることです。この区別ができていないコードは、必ずどこかで破綻します。</p>
      <table>
        <tbody>
          <tr><th></th><th>想定内の失敗(期待される失敗)</th><th>バグ(想定外)</th></tr>
          <tr><td className="hl">例</td><td>入力が不正、残高不足、認証切れ、外部APIのタイムアウト</td><td>nullアクセス、型の不整合、あり得ない分岐</td></tr>
          <tr><td className="hl">頻度</td><td>日常的に起きる。仕様の一部</td><td>起きてはいけない</td></tr>
          <tr><td className="hl">扱い</td><td><strong>戻り値や専用の型で表す</strong>。呼び出し側が処理する</td><td>捕まえず落とす。上位で記録し、500として扱う</td></tr>
          <tr><td className="hl">利用者への表示</td><td>何が起きて、次に何をすればよいかを伝える</td><td>「問題が発生しました」+ 追跡ID</td></tr>
          <tr><td className="hl">監視</td><td>件数の傾向を見る(急増したら異常)</td><td><strong>1件でもアラート対象</strong></td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        レストランで「本日は品切れです」と言われるのが想定内の失敗、<strong>厨房が火事になる</strong>のがバグです。前者は接客の一部として応対手順がありますが、後者に応対手順を用意するのではなく、起きないようにする・起きたら営業を止めるのが正しい対応です。
      </Analogy>

      <Heading num="02">失敗を型で表す</Heading>
      <p>想定内の失敗は、<strong>関数の戻り値の型に現れているべき</strong>です。型に出ていない失敗は、呼び出し側が対処し忘れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 型に失敗が出ていない ― 呼び出し側は例外の存在に気付けない
function transfer(from: Account, to: Account, amount: number): void;

// 失敗が型に出ている ― 分岐しないとコンパイルが通らない
type TransferResult =
  | { ok: true; transactionId: string }
  | { ok: false; reason: "insufficient_funds" | "account_frozen" };

function transfer(from: Account, to: Account, amount: number): TransferResult;`}</code>
      </pre>
      <p>失敗の理由を<strong>文字列リテラルの合併型</strong>にしておくと、呼び出し側で網羅チェックが効き、新しい失敗理由を追加したときに対応漏れがエラーとして現れます。Rustの <code>Result</code> 型、関数型言語の <code>Either</code> も同じ発想です(「<Link href="/design/paradigm/functional/safety">安全に分岐する</Link>」)。</p>
      <Aside label="例外か戻り値か">
        どちらでも設計は成立します。重要なのは<strong>一貫していること</strong>と、<strong>想定内の失敗を例外で表す場合は型・ドキュメントで明示すること</strong>です。実務では「想定内の失敗は戻り値、バグと回復不能な事態は例外」という使い分けが扱いやすく、フレームワークの流儀とも衝突しにくくなります。
      </Aside>

      <Heading num="03">エラーに情報を持たせる</Heading>
      <p>文字列だけのエラーは、後から機械的に扱えません。最低限、次の情報を構造化して持たせます。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>用途</th></tr>
          <tr><td className="hl">種別コード</td><td>プログラムが分岐に使う(<code>INSUFFICIENT_FUNDS</code>)。文字列比較しなくて済む</td></tr>
          <tr><td className="hl">利用者向けメッセージ</td><td>そのまま画面に出せる文。技術用語を含めない</td></tr>
          <tr><td className="hl">開発者向け詳細</td><td>ログにのみ出す。値・状態・原因</td></tr>
          <tr><td className="hl">原因(cause)</td><td>元の例外。<strong>捨てるとスタックトレースが失われる</strong></td></tr>
          <tr><td className="hl">再試行可能か</td><td>呼び出し側とジョブ基盤の判断材料</td></tr>
          <tr><td className="hl">追跡ID</td><td>利用者の報告とログを結び付ける(「<Link href="/dev/backend/ops/tracing">リクエストID</Link>」)</td></tr>
        </tbody>
      </table>

      <Heading num="04">どこで捕まえるか ― 境界で扱う</Heading>
      <p>最も多い設計ミスは、<strong>あらゆる場所で <code>try/catch</code> する</strong>ことです。捕まえた結果として何もできないなら、捕まえるべきではありません。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>捕まえてよいのは</h4>
          <p>その場で<strong>回復できる</strong>とき(代替値・リトライ・フォールバック)。または情報を足して投げ直すとき。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>通すべきなのは</h4>
          <p>自分では判断できない失敗。上位のほうが文脈を持っている。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最終的に受け止める場所</h4>
          <p>HTTPのハンドラ、ジョブのワーカー、UIのエラー境界 ― <strong>外界との境界1か所</strong>。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>絶対にやらないこと</h4>
          <p>捕まえて握りつぶす(<code>catch &#123;&#125;</code>)。原因が永久に分からなくなる。</p>
        </Card>
      </CardGrid>
      <p>境界で1度だけ処理する構造にすると、ログの重複も防げます。途中の層でログを出して再送出すると、<strong>同じエラーが5回記録される</strong>ことになり、調査時にかえって混乱します ― <strong>記録するのは処理する場所だけ</strong>です。</p>

      <Heading num="05">層をまたぐときは翻訳する</Heading>
      <p>下位層の失敗をそのまま上位へ漏らすと、層の分離が崩れます。</p>
      <Steps>
        <li>データアクセス層 ― DBの一意制約違反(エラーコード 23505)を捕まえる</li>
        <li>ドメイン層へは <code>EmailAlreadyRegistered</code> という業務的な失敗として渡す(原因は <code>cause</code> に保持)</li>
        <li>HTTP層でそれを 409 Conflict と利用者向けメッセージに変換する</li>
      </Steps>
      <p>こうしておけば、DBをPostgreSQLから別製品へ替えても、ドメイン層とHTTP層は影響を受けません(「<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ</Link>」)。逆に、SQLのエラーコードがそのままAPIレスポンスに出るような設計は、内部構造の漏洩でもあります。</p>

      <Heading num="06">HTTPでの表し方</Heading>
      <table>
        <tbody>
          <tr><th>状況</th><th>ステータス</th><th>ポイント</th></tr>
          <tr><td className="hl">入力が不正</td><td>400 / 422</td><td>どの項目がなぜ不正かを構造化して返す</td></tr>
          <tr><td className="hl">未認証 / 権限なし</td><td>401 / 403</td><td>401は「誰か分からない」、403は「誰か分かるが不許可」</td></tr>
          <tr><td className="hl">対象がない</td><td>404</td><td>権限がない資源の存在を隠す目的で使うこともある</td></tr>
          <tr><td className="hl">状態の競合</td><td>409</td><td>重複登録、<Link href="/dev/concurrency/lock">楽観ロック</Link>の衝突</td></tr>
          <tr><td className="hl">レート制限</td><td>429</td><td><code>Retry-After</code> を付ける</td></tr>
          <tr><td className="hl">サーバー側の失敗</td><td>500 / 503</td><td><strong>内部情報を返さない</strong>。追跡IDだけを返す</td></tr>
        </tbody>
      </table>
      <p>本文の形式はAPI全体で統一します(<code>type</code> / <code>title</code> / <code>detail</code> / <code>instance</code> を使うRFC 9457 のような標準形が便利です)。クライアントが分岐に使うのは<strong>ステータスと機械可読なコード</strong>で、メッセージ文字列で分岐させてはいけません(「<Link href="/dev/backend/api/rest">REST API</Link>」)。</p>

      <Heading num="07">再試行可能かを設計に含める</Heading>
      <p>呼び出し側が「もう一度試すべきか」を判断できないと、無駄な再試行や、逆に取りこぼしが起きます。</p>
      <table>
        <tbody>
          <tr><th>分類</th><th>例</th><th>再試行</th></tr>
          <tr><td className="hl">一時的</td><td>タイムアウト、503、接続断、デッドロック</td><td><strong>する</strong>(指数バックオフ + ジッター)</td></tr>
          <tr><td className="hl">恒久的</td><td>400、422、権限なし</td><td>しない。何度やっても同じ</td></tr>
          <tr><td className="hl">不明</td><td>応答が返る前に切断</td><td><strong>冪等なら</strong>する。そうでなければ確認してから</td></tr>
        </tbody>
      </table>
      <p>最後の行が最も難しく、そして最も重要です。「送信したかどうか分からない」状況は必ず起きるため、<strong>再試行しても安全になるよう冪等に設計する</strong>のが根本的な解決になります(「<Link href="/dev/concurrency/patterns">実装パターン</Link>」)。</p>

      <Heading num="08">利用者に見せるメッセージ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>何が起きたか</h4><p>「保存できませんでした」。専門用語や内部名を出さない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>なぜか</h4><p>分かる範囲で理由を示す。「他の人が先に更新しました」。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>次に何をすればよいか</h4><p>「最新の内容を読み込んでから、もう一度お試しください」。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>問い合わせの手がかり</h4><p>追跡IDを表示する。サポートとログを結び付けられる。</p></Card>
      </CardGrid>
      <Aside label="エラーメッセージから情報を漏らさない">
        「そのメールアドレスは登録されていません」は親切に見えますが、<strong>アカウントの存在を外部に教えています</strong>。認証まわりでは、成功/失敗の応答内容と時間を揃えるのが原則です(「<Link href="/security/auth">認証</Link>」)。スタックトレースや内部パスを画面に出すのも同様に避けます。
      </Aside>

      <Heading num="まとめ">失敗も仕様のうち</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>想定内とバグを分ける</h4><p>前者は型で表して処理する。後者は捕まえずに落とし、記録する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>境界で1度だけ処理する</h4><p>回復できないなら捕まえない。ログも処理する場所だけで出す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>原因を捨てない</h4><p><code>cause</code> を保持し、層をまたぐときは翻訳する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/express/error" tag="バックエンド">エラーハンドリング</RelatedLink>
            <RelatedLink href="/dev/backend/ops/resilience" tag="バックエンド">タイムアウト・リトライ・遮断</RelatedLink>
            <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
