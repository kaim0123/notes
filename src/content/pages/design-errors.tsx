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
  Steps,
  DiagramFrame,
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
          正常系の設計には時間をかけるのに、失敗の扱いは「とりあえず<code>try/catch</code>」で済ませてしまう ―
          これが、原因の分からない障害と、利用者に意味の通じないエラー画面を生みます。エラー設計とは、<Term>どんな失敗がありうるかを型と構造で表し、責任を持つ場所で1度だけ処理する</Term>ことです。
        </Lead>
      </Hero>

      <Heading num="01">まず2種類に分ける</Heading>
      <p>
        エラー設計の出発点は、失敗を性質で分けることです。この区別ができていないコードは、必ずどこかで破綻します。
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>想定内の失敗</th>
            <th>バグ(想定外)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">例</td>
            <td>入力が不正、残高不足、認証切れ、外部APIのタイムアウト</td>
            <td>nullアクセス、型の不整合、あり得ない分岐</td>
          </tr>
          <tr>
            <td className="hl">頻度</td>
            <td>日常的に起きる。仕様の一部</td>
            <td>起きてはいけない</td>
          </tr>
          <tr>
            <td className="hl">扱い</td>
            <td>戻り値や専用の型で表す。呼び出し側が処理する</td>
            <td>捕まえずに落とす。上位で記録し、500として扱う</td>
          </tr>
          <tr>
            <td className="hl">利用者への表示</td>
            <td>何が起きて、次に何をすればよいかを伝える</td>
            <td>「問題が発生しました」と追跡ID</td>
          </tr>
          <tr>
            <td className="hl">監視</td>
            <td>件数の傾向を見る(急増したら異常)</td>
            <td>1件でもアラート対象</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        レストランで「本日は品切れです」と言われるのが想定内の失敗、厨房が火事になるのがバグです。前者は接客の一部として応対手順がありますが、後者に応対手順を用意するのではなく、起きないようにする・起きたら営業を止めるのが正しい対応です。
      </Analogy>

      <Heading num="02">失敗を型で表す</Heading>
      <p>
        想定内の失敗は、<Term>関数の戻り値の型に現れているべき</Term>です。型に出ていない失敗は、呼び出し側が対処し忘れます。
      </p>
      <pre>
        <code>{`// 型に失敗が出ていない ― 呼び出し側は例外の存在に気付けない
function transfer(from: Account, to: Account, amount: number): void;

// 失敗が型に出ている ― 分岐しないとコンパイルが通らない
type TransferResult =
  | { ok: true; transactionId: string }
  | { ok: false; reason: "insufficient_funds" | "account_frozen" };

function transfer(from: Account, to: Account, amount: number): TransferResult;`}</code>
      </pre>
      <p>
        失敗の理由を文字列リテラルの合併型にしておくと、呼び出し側で網羅チェックが効き、新しい失敗理由を追加したときに対応漏れがエラーとして現れます。Rustの<code>Result</code>型や関数型言語の<code>Either</code>も同じ発想です(<Link href="/design/paradigm-functional-safety">安全に分岐する</Link>)。
      </p>

      <Aside label="例外か戻り値か">
        どちらでも設計は成立します。重要なのは<Term>一貫していること</Term>と、想定内の失敗を例外で表す場合は型やドキュメントで明示することです。実務では「想定内の失敗は戻り値、バグと回復不能な事態は例外」という使い分けが扱いやすく、フレームワークの流儀とも衝突しにくくなります。
      </Aside>

      <Heading num="03">エラーに情報を持たせる</Heading>
      <p>
        文字列だけのエラーは、後から機械的に扱えません。最低限、次の情報を構造化して持たせます。
      </p>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">種別コード</td>
            <td>プログラムが分岐に使う。メッセージ文字列で比較しなくて済む</td>
          </tr>
          <tr>
            <td className="hl">利用者向けメッセージ</td>
            <td>そのまま画面に出せる文。技術用語を含めない</td>
          </tr>
          <tr>
            <td className="hl">開発者向け詳細</td>
            <td>ログにのみ出す。値・状態・原因</td>
          </tr>
          <tr>
            <td className="hl">原因(cause)</td>
            <td>元の例外。捨てるとスタックトレースが失われる</td>
          </tr>
          <tr>
            <td className="hl">再試行可能か</td>
            <td>呼び出し側とジョブ基盤の判断材料</td>
          </tr>
          <tr>
            <td className="hl">追跡ID</td>
            <td>利用者の報告とログを結び付ける</td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">どこで捕まえるか ― 境界で扱う</Heading>
      <p>
        最も多い設計ミスは、あらゆる場所で<code>try/catch</code>することです。捕まえた結果として何もできないなら、捕まえるべきではありません。
      </p>

      <DiagramFrame
        slug="design-errors-boundary"
        aspect="700 / 320"
        caption="エラーを境界で1度だけ処理する構造。左は各層でtry/catchする形で、同じエラーが3回記録され、握りつぶした箇所では原因が失われる。右は境界で1度だけ処理する形で、データアクセス層はDBのエラーコードを業務的な失敗へ翻訳して上へ渡し、ドメイン層は回復できないのでそのまま通し、外界との境界であるHTTP層だけが記録して応答へ変換する。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>捕まえてよいのは</h4>
          <p>その場で回復できるとき(代替値・リトライ・フォールバック)。または情報を足して投げ直すとき。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>通すべきなのは</h4>
          <p>自分では判断できない失敗。上位のほうが文脈を持っている。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最終的に受け止める場所</h4>
          <p>HTTPのハンドラ、ジョブのワーカー、UIのエラー境界。外界との境界1か所。</p>
        </Card>
      </CardGrid>

      <p>
        境界で1度だけ処理する構造にすると、ログの重複も防げます。途中の層でログを出して再送出すると、同じエラーが何度も記録され、調査時にかえって混乱します。<Term>記録するのは処理する場所だけ</Term>です。そして捕まえて握りつぶすことだけは絶対に避けます ―
        原因が永久に分からなくなります。
      </p>

      <Heading num="05">層をまたぐときは翻訳する</Heading>
      <p>下位層の失敗をそのまま上位へ漏らすと、層の分離が崩れます。</p>
      <Steps>
        <li>データアクセス層で、DBの一意制約違反を捕まえる</li>
        <li>ドメイン層へは「メールアドレスが登録済み」という業務的な失敗として渡す(元の例外はcauseに保持)</li>
        <li>HTTP層でそれを409 Conflictと利用者向けメッセージに変換する</li>
      </Steps>
      <p>
        こうしておけば、DBを別製品へ替えてもドメイン層とHTTP層は影響を受けません(<Link href="/design/architecture-app-domain-centric">ドメイン中心アーキテクチャ</Link>)。逆に、SQLのエラーコードがそのままAPIレスポンスに出るような設計は、内部構造の漏洩でもあります。
      </p>

      <Heading num="06">HTTPでの表し方</Heading>
      <table>
        <thead>
          <tr>
            <th>状況</th>
            <th>ステータス</th>
            <th>ポイント</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">入力が不正</td>
            <td>400 / 422</td>
            <td>どの項目がなぜ不正かを構造化して返す</td>
          </tr>
          <tr>
            <td className="hl">未認証・権限なし</td>
            <td>401 / 403</td>
            <td>401は「誰か分からない」、403は「誰か分かるが不許可」</td>
          </tr>
          <tr>
            <td className="hl">対象がない</td>
            <td>404</td>
            <td>権限のない資源の存在を隠す目的で使うこともある</td>
          </tr>
          <tr>
            <td className="hl">状態の競合</td>
            <td>409</td>
            <td>重複登録、楽観ロックの衝突</td>
          </tr>
          <tr>
            <td className="hl">レート制限</td>
            <td>429</td>
            <td>
              <code>Retry-After</code>を付ける
            </td>
          </tr>
          <tr>
            <td className="hl">サーバー側の失敗</td>
            <td>500 / 503</td>
            <td>内部情報を返さない。追跡IDだけを返す</td>
          </tr>
        </tbody>
      </table>
      <p>
        本文の形式はAPI全体で統一します。クライアントが分岐に使うのはステータスと機械可読なコードで、メッセージ文字列で分岐させてはいけません。文言を変えただけでクライアントが壊れます。
      </p>

      <Heading num="07">再試行可能かを設計に含める</Heading>
      <table>
        <thead>
          <tr>
            <th>分類</th>
            <th>例</th>
            <th>再試行</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">一時的</td>
            <td>タイムアウト、503、接続断、デッドロック</td>
            <td>する(指数バックオフとジッターを添えて)</td>
          </tr>
          <tr>
            <td className="hl">恒久的</td>
            <td>400、422、権限なし</td>
            <td>しない。何度やっても同じ</td>
          </tr>
          <tr>
            <td className="hl">不明</td>
            <td>応答が返る前に切断</td>
            <td>冪等ならする。そうでなければ状態を確認してから</td>
          </tr>
        </tbody>
      </table>
      <p>
        最後の行が最も難しく、そして最も重要です。「送信したかどうか分からない」状況は必ず起きるため、<Term>再試行しても安全になるよう冪等に設計する</Term>のが根本的な解決になります。
      </p>

      <Heading num="08">利用者に見せるメッセージ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>何が起きたか</h4>
          <p>「保存できませんでした」。専門用語や内部名を出さない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>なぜか</h4>
          <p>分かる範囲で理由を示す。「他の人が先に更新しました」。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>次に何をすればよいか</h4>
          <p>「最新の内容を読み込んでから、もう一度お試しください」。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>問い合わせの手がかり</h4>
          <p>追跡IDを表示する。サポートとログを結び付けられる。</p>
        </Card>
      </CardGrid>

      <Aside label="エラーメッセージから情報を漏らさない">
        「そのメールアドレスは登録されていません」は親切に見えますが、アカウントの存在を外部に教えています。認証まわりでは、成功と失敗の応答内容と応答時間を揃えるのが原則です。スタックトレースや内部パスを画面に出すのも同様に避けます。
      </Aside>

      <Heading num="まとめ">失敗も仕様のうち</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>想定内とバグを分ける</h4>
          <p>前者は型で表して処理する。後者は捕まえずに落とし、記録する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>境界で1度だけ処理する</h4>
          <p>回復できないなら捕まえない。ログも処理する場所だけで出す。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>原因を捨てない</h4>
          <p>causeを保持し、層をまたぐときは業務的な意味へ翻訳する。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/errors" />
    </DocsPage>
  );
}
