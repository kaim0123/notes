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
  title: "APIのバージョニングと廃止",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; API</Eyebrow>
        <h1>バージョニングと廃止 ― 変えられないものを変える</h1>
        <Lead>
          <Link href="/dev/backend/api/openapi">OpenAPIと契約</Link>で、APIは利用者との<Term>契約</Term>だと見ました。契約である以上、<strong>勝手に変えれば相手が壊れます</strong>。しかし変えないわけにもいきません。ここでは、何が破壊的変更なのかを定義し、バージョンを分ける方法と、<strong>それ以上に重要な「古いものを終わらせる手順」</strong>を扱います。バージョンを増やすのは簡単で、消すのが難しいのです。
        </Lead>
      </Hero>

      <Heading num="01">クライアントは同時に更新できない</Heading>
      <p>Webのフロントエンドだけが相手なら、APIとフロントを同時にデプロイすれば済むように思えます。しかし現実は違います。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ローリングデプロイの最中</td><td>数分間、旧フロントと新APIが共存する</td></tr>
          <tr><td className="hl">利用者がタブを開いたまま</td><td><strong>数時間前のJavaScriptが動き続ける</strong></td></tr>
          <tr><td className="hl">モバイルアプリ</td><td>審査と自動更新の都合で、<strong>数週間〜数年前のバージョンが残る</strong></td></tr>
          <tr><td className="hl">外部の利用者</td><td>いつ直してくれるか分からない。連絡が付かないこともある</td></tr>
        </tbody>
      </table>
      <p>つまり<strong>「新旧のクライアントが同時に存在する時間」は必ずあります</strong>。<Link href="/dev/backend/data/migration">スキーマ変更</Link>とまったく同じ構図で、対処法も同じ ― <strong>どの瞬間も両方が動く形に分解する</strong>ことです。</p>

      <Heading num="02">何が破壊的変更か</Heading>
      <p>境界を明確にしておきます。<strong>追加は安全、削除と意味の変更は破壊的</strong>が基本則です。</p>
      <table>
        <thead>
          <tr><th>安全な変更</th><th>破壊的変更</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レスポンスに<strong>フィールドを追加</strong>する</td><td>フィールドを削除・改名する</td></tr>
          <tr><td className="hl"><strong>任意の</strong>リクエストパラメータを追加する</td><td>必須パラメータを追加する</td></tr>
          <tr><td className="hl">新しいエンドポイントを追加する</td><td>型を変える(<code>number</code>→<code>string</code>)</td></tr>
          <tr><td className="hl">列挙値を<strong>受け付ける</strong>側で増やす</td><td>列挙値を<strong>返す</strong>側で増やす(※)</td></tr>
          <tr><td className="hl">エラーメッセージの文言を直す</td><td>エラーコードやステータスコードを変える</td></tr>
          <tr><td className="hl">性能を改善する</td><td>既定の並び順・件数を変える</td></tr>
          <tr><td className="hl">―</td><td><strong>同じ入力に対する意味を変える</strong>(最も危険で、最も気付かれにくい)</td></tr>
        </tbody>
      </table>
      <p>※印は判断が分かれます。厳密に検証するクライアントは、知らない列挙値で例外を出します。<strong>「知らない値が来たら無視する」ようクライアントに求める</strong>方針を、契約として最初に宣言しておくと後が楽になります(<Term>トレラントリーダー</Term>の原則)。</p>
      <Aside label="意味の変更が最も危険">
        <code>status</code>フィールドの<code>&quot;pending&quot;</code>が指す状態を変えた ― 型もフィールド名も変わっていないので、テストも型検査も通ります。しかしクライアント側の分岐は静かに誤動作します。<strong>形式ではなく意味を変えるときこそ、新しいフィールドを足す</strong>べきです。
      </Aside>

      <Heading num="03">バージョンの表し方</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>例</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URLパス</td><td><code>/v1/orders</code></td><td><strong>最も一般的</strong>。見て分かる、ブラウザで試せる、キャッシュしやすい</td></tr>
          <tr><td className="hl">カスタムヘッダー</td><td><code>X-API-Version: 2</code></td><td>URLが安定する。試しにくく、忘れられやすい</td></tr>
          <tr><td className="hl">メディアタイプ</td><td><code>Accept: application/vnd.api.v2+json</code></td><td>RESTの理念には忠実。実務では扱いが煩雑</td></tr>
          <tr><td className="hl">日付指定</td><td><code>API-Version: 2026-08-08</code></td><td>決済サービスなどで採用。<strong>利用者ごとに固定できる</strong></td></tr>
        </tbody>
      </table>
      <p>迷うならURLパスで<strong>メジャーバージョンのみ</strong>を表します。<code>/v1.2</code>のような細かい刻みは管理不能になります ― バージョンが変わるのは<strong>破壊的変更のときだけ</strong>です。</p>
      <p>実装では、バージョンをルーティングの層で吸収し、<strong>業務ロジックは1つに保ちます</strong>。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// v1 と v2 で異なるのは「表現」だけ。ユースケースは共有する
app.use("/v1/orders", v1OrderRouter);
app.use("/v2/orders", v2OrderRouter);

// v1 用の変換 ― 旧形式に整えて返す
function toOrderResponseV1(order: Order) {
  return { id: order.id, user_id: order.userId, total: order.total };
}
// v2 ― 命名規則を変え、金額を通貨付きにした
function toOrderResponseV2(order: Order) {
  return { id: order.id, userId: order.userId,
           amount: { value: order.total, currency: "JPY" } };
}`}</code>
      </pre>
      <p><Link href="/dev/backend/layers">層に分けて組み立てる</Link>の構成が、ここで効いてきます。バージョンの違いを<strong>最外層の変換だけに閉じ込められる</strong>なら、v1とv2を並行して維持するコストは小さく済みます。逆に業務ロジックまで分岐し始めたら、その時点で保守が破綻します。</p>

      <Heading num="04">そもそもバージョンを増やさない</Heading>
      <p>最も安いバージョニングは、<strong>バージョンを上げないこと</strong>です。設計の工夫でかなりの範囲を吸収できます。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">削除ではなく追加</td><td>改名したいなら、新しい名前を<strong>足して両方返す</strong>。古い方は後で消す</td></tr>
          <tr><td className="hl">拡張可能な型で返す</td><td>金額を<code>number</code>ではなく<code>{"{ value, currency }"}</code>で返しておけば、後から項目を足せる</td></tr>
          <tr><td className="hl">既定値を変えない</td><td>新しい挙動はオプトイン(クエリパラメータで明示的に有効化)にする</td></tr>
          <tr><td className="hl">寛容に読む</td><td>知らないフィールドは無視する。クライアントにもそう求める</td></tr>
          <tr><td className="hl">エラーコードを増やす</td><td>既存コードの意味は変えず、新しいコードを追加する</td></tr>
        </tbody>
      </table>

      <Heading num="05">廃止の手順 ― ここが本題</Heading>
      <p>v2を出すのは1日でできます。<strong>v1を消すのに1年かかります。</strong>そして消せなければ、維持コストは永久に積み上がります。廃止は<strong>計画された工程</strong>として進めます。</p>
      <table>
        <thead>
          <tr><th>段階</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">① 計測する</td><td><strong>誰がいつ使っているか</strong>を記録する。これが無ければ何も判断できない</td></tr>
          <tr><td className="hl">② 予告する</td><td>廃止日を明示して通知する。公開APIなら数か月〜1年前</td></tr>
          <tr><td className="hl">③ 機械可読に示す</td><td><code>Deprecation</code>ヘッダーと<code>Sunset</code>ヘッダーを応答に付ける。ドキュメントにも明記</td></tr>
          <tr><td className="hl">④ 移行を支援する</td><td>差分表と移行ガイドを出す。利用の多い相手には個別に連絡する</td></tr>
          <tr><td className="hl">⑤ 部分停止で試す</td><td>短時間だけ停止して影響を確認する(<Term>ブラウンアウト</Term>)</td></tr>
          <tr><td className="hl">⑥ 停止する</td><td><code>410 Gone</code>で、移行先を案内する応答を返す</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 廃止予定であることを機械可読に伝える
res.setHeader("Deprecation", "true");
res.setHeader("Sunset", "Wed, 31 Dec 2026 23:59:59 GMT");
res.setHeader("Link", '</docs/migration/v2>; rel="deprecation"');`}</code>
      </pre>
      <p><strong>①の計測が決定的に重要です。</strong>「まだ使われているかもしれない」という不安だけで、何年も古いAPIを維持しているシステムは非常に多くあります。<Link href="/dev/backend/ops/tracing">アクセスの記録</Link>があれば、「先月の利用は3件、すべて社内のバッチ」といった事実に基づいて判断できます。</p>
      <Aside label="⑤ ブラウンアウト">
        廃止日の前に、<strong>1時間だけAPIを停止してみる</strong>手法です。これで気付いていなかった利用者が問い合わせてくるため、本番の停止前に発見できます。予告なしにやると信用を失うので、事前にスケジュールを公表して行います。
      </Aside>

      <Heading num="06">内部APIと公開APIは別の話</Heading>
      <p>ここまでの厳格な手順は、<strong>外部に公開しているAPI</strong>を前提としています。相手が社内だけなら、大幅に簡略化できます。</p>
      <table>
        <thead>
          <tr><th></th><th>公開API(LSUD)</th><th>内部API(SSKD)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者</td><td>不特定多数。連絡が取れないこともある</td><td>特定少数。全員を把握できる</td></tr>
          <tr><td className="hl">バージョニング</td><td>必須。厳格に</td><td><strong>多くの場合不要</strong>。呼び出し元を直せばよい</td></tr>
          <tr><td className="hl">廃止までの期間</td><td>数か月〜数年</td><td>数日〜数週間</td></tr>
          <tr><td className="hl">方針</td><td>後方互換を最優先</td><td><strong>両方まとめて直す</strong></td></tr>
        </tbody>
      </table>
      <p>この区別は<Link href="/dev/backend/api/design">API設計（LSUD / SSKD）</Link>で見たとおりです。<strong>内部APIに公開API並みのバージョニングを課すのは、明確な過剰設計です。</strong>自社のフロントエンドしか使わないAPIなら、両方を同じPull Requestで直す方が遥かに健全です。</p>

      <Heading num="07">契約が守られていることを検証する</Heading>
      <p>「破壊的変更をしていないつもり」を、仕組みで確認します。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">OpenAPI定義の差分検査</td><td>CIでスキーマを比較し、<strong>破壊的変更を検出したらビルドを落とす</strong></td></tr>
          <tr><td className="hl">コンシューマ駆動契約テスト</td><td>利用者側が「自分が必要とする形」を宣言し、提供側のCIで検証する</td></tr>
          <tr><td className="hl">スキーマからの型生成</td><td>クライアントの型をOpenAPIから生成し、<strong>コンパイル時に不整合を検出</strong>する</td></tr>
          <tr><td className="hl">古いバージョンの<Link href="/dev/backend/test">テスト</Link>を残す</td><td>v1のテストを消さずに維持する。壊れたら即座に分かる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        APIのバージョニングは、鉄道のダイヤ改正に似ています。時刻表(契約)を頼りに動いている人が大勢いる以上、黙って変えれば混乱します。だから改正日を数か月前に告知し、駅に掲示し(<code>Sunset</code>ヘッダー)、旧ダイヤの利用者数を調べてから列車を減らします。そして<strong>廃止する路線ほど、慎重な調査が要ります</strong> ― 1日3人しか乗らないと分かれば止められますが、調べていなければ「誰かが困るかもしれない」という不安だけで、永久に走らせ続けることになります。
      </Analogy>

      <Heading num="まとめ">増やすより、消す方を設計する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>追加は安全、削除と意味の変更は破壊的</h4><p>改名したいなら足して両方返す。意味だけの変更が最も気付かれにくい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>差異は最外層に閉じる</h4><p>URLパスでメジャーのみ。変換層だけを分け、業務ロジックは1つに保つ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>廃止は計測から始まる</h4><p>誰が使っているかのデータが無ければ、永久に消せない。内部APIに厳格さは不要。</p></Card>
      </CardGrid>
      <p>ここまででAPIの設計は一通りです。次章からは<Link href="/dev/backend/express">Express</Link>で実際に組み立て、その内部構造を<Link href="/dev/backend/layers">層に分けて組み立てる</Link>で整理していきます。契約が守られていることの検証は<Link href="/dev/backend/test">APIのテスト</Link>で扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/openapi" tag="バックエンド">OpenAPIと契約</RelatedLink>
            <RelatedLink href="/dev/backend/api/design" tag="バックエンド">API設計（LSUD / SSKD）</RelatedLink>
            <RelatedLink href="/dev/backend/data/migration" tag="バックエンド">マイグレーション</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
