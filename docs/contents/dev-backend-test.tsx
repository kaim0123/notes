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
  title: "APIのテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>APIのテスト ― どこまで本物を使うか</h1>
        <Lead>
          <Link href="/test/strategy">品質戦略とテストピラミッド</Link>で全体の方針を、<Link href="/test/unit">Unitテスト</Link>と<Link href="/test/integration">Integrationテスト</Link>で書き方を見ました。ここではバックエンド固有の論点に絞ります ― <strong>データベースを本物にするか、外部APIをどう扱うか、テスト間でデータをどう隔離するか</strong>。この3つの判断が、バックエンドのテストの速度と信頼性を決めます。
        </Lead>
      </Hero>

      <Heading num="01">層ごとに、テストの形が変わる</Heading>
      <p><Link href="/dev/backend/layers">層に分けて組み立てる</Link>で分割した各層には、それぞれ適したテストがあります。</p>
      <table>
        <thead>
          <tr><th>対象</th><th>テストの種類</th><th>何を確かめるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ドメイン・ユースケース</td><td>Unit(依存は偽物)</td><td><strong>業務ルール</strong>。DBもHTTPも起動しない。速い</td></tr>
          <tr><td className="hl">リポジトリ</td><td>Integration(<strong>本物のDB</strong>)</td><td>SQLが意図どおりか、マッピングが正しいか</td></tr>
          <tr><td className="hl">ルーター・ミドルウェア</td><td>Integration(supertest)</td><td>ステータス、検証、認証、エラー変換</td></tr>
          <tr><td className="hl">API全体</td><td>Integration(HTTP + 本物のDB)</td><td><strong>層が繋がって動くか</strong>。数を絞る</td></tr>
        </tbody>
      </table>
      <p>層を分けた最大の見返りが、1行目です。<strong>「ゴールド会員は1割引」を確かめるのに、DBもサーバーも要りません。</strong>数ミリ秒で終わるので、何百件書いても苦になりません。</p>

      <Heading num="02">supertest ― サーバーを起動せずにHTTPを叩く</Heading>
      <p>ルーターやミドルウェアの検証には<Term>supertest</Term>を使います。実際にポートを開かず、Expressのアプリケーションオブジェクトに直接リクエストを流し込めます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import request from "supertest";
import { createApp } from "../src/app";

const app = createApp({ /* 依存を注入する */ });

test("認証なしでは 401 を返す", async () => {
  await request(app).post("/orders").send({ items: [] }).expect(401);
});

test("不正な入力は 400 とエラーコードを返す", async () => {
  const res = await request(app)
    .post("/orders")
    .set("Authorization", \`Bearer \${token}\`)
    .send({ items: "not-an-array" })
    .expect(400);

  expect(res.body.code).toBe("validation_error");
});`}</code>
      </pre>
      <Aside label="app と server を分ける">
        これを可能にするには、<strong>アプリの組み立てと<code>listen()</code>を別ファイルに分けます</strong>。<code>app.ts</code>がExpressのインスタンスを返し、<code>server.ts</code>がそれを<code>listen</code>する ― この分離が無いと、テストのたびにポートを掴んで衝突します。<Link href="/dev/backend/layers">合成ルート</Link>を引数で差し替えられるようにしておくと、テスト用の依存も注入できます。
      </Aside>

      <Heading num="03">データベース ― モックせず、本物を使う</Heading>
      <p>リポジトリのテストでDBをモックすると、<strong>テストは通るのに本番で動かない</strong>という最悪の状態になります。SQLの構文誤り、型の不一致、制約違反、トランザクションの挙動 ― これらはすべて本物のDBでしか検出できません。</p>
      <table>
        <thead>
          <tr><th>方法</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Testcontainersなどでコンテナを起動</td><td><strong>推奨</strong>。本番と同じDBを、テスト実行時に自動で立ち上げる</td></tr>
          <tr><td className="hl">docker composeで常駐させる</td><td>手軽。CIでも同じ構成にできる</td></tr>
          <tr><td className="hl">SQLiteで代用する</td><td><strong>非推奨</strong>。方言も型も制約の挙動も違い、本番との差が事故になる</td></tr>
          <tr><td className="hl">モックする</td><td>リポジトリのテストとしては<strong>意味がない</strong></td></tr>
        </tbody>
      </table>
      <p>そして、テスト用DBのスキーマは<strong>必ず<Link href="/dev/backend/data/migration">マイグレーション</Link>で作ります</strong>。手書きのDDLで用意すると、本番との差異に気付けないうえ、マイグレーション自体が検証されません。</p>

      <Heading num="04">テスト間の独立性 ― 最も設計が要る部分</Heading>
      <p>本物のDBを使う以上、<strong>あるテストが書いたデータが次のテストに影響します</strong>。実行順序で結果が変わるテストは、CIで気まぐれに落ちる原因になります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トランザクションでロールバック</td><td>テスト開始時にBEGIN、終了時にROLLBACK</td><td><strong>最速</strong>。ただしテスト対象がトランザクションを張ると噛み合わない</td></tr>
          <tr><td className="hl">毎回TRUNCATE</td><td>各テストの前に全テーブルを空にする</td><td>確実。やや遅いが分かりやすい</td></tr>
          <tr><td className="hl">テストごとにスキーマを分ける</td><td>並列実行しやすい</td><td>準備のコストが高い</td></tr>
          <tr><td className="hl">一意な値を使う</td><td>テストごとに別のIDやメールを使う</td><td>簡単だが、集計系のテストでは破綻する</td></tr>
        </tbody>
      </table>
      <p>データの用意には<Term>ファクトリ</Term>を作ります。テストごとに20行のINSERTを書くのではなく、<strong>そのテストで意味のある値だけを指定し、残りは既定値で埋める</strong>関数を用意します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 「ゴールド会員である」ことだけがこのテストの関心事
const user = await createUser({ rank: "gold" });
const product = await createProduct({ price: 1000, stock: 5 });

// 何が重要な条件なのかが、テストを読むだけで分かる`}</code>
      </pre>

      <Heading num="05">外部APIをどう扱うか</Heading>
      <p>決済、メール、地図、AI ― 外部サービスは、テストで本物を呼べません(遅い、課金される、相手に迷惑がかかる、CIから繋がらない)。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">インターフェースで差し替える</td><td><strong>基本</strong>。<Link href="/dev/backend/layers">Notifier</Link>のように抽象化し、テストでは記録するだけの実装を渡す</td></tr>
          <tr><td className="hl">HTTPレベルでモックする</td><td><code>nock</code>や<code>msw</code>で応答を差し替える。<strong>リクエストの形も検証できる</strong></td></tr>
          <tr><td className="hl">サンドボックス環境</td><td>相手が提供している場合。少数の重要な経路だけ通す</td></tr>
          <tr><td className="hl">契約テスト</td><td>相手のスキーマとの整合を、別立てで定期的に検証する</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ モックは「相手が変わったこと」を教えてくれない">
        モックは<strong>自分が想定した相手</strong>との会話を再現するだけです。相手のAPI仕様が変わっても、テストは通り続けます。だからこそ、モックによるテストとは別に、<strong>実際の相手と通信する少数のテスト</strong>(あるいはスキーマの定期検証)を持っておく価値があります。
      </Aside>
      <p>あわせて、<Link href="/dev/backend/ops/resilience">タイムアウトやリトライ</Link>の検証も忘れないでください。<strong>「相手が5秒応答しない」ケース</strong>のテストは、モックで遅延を注入すれば書けます。本番で初めて発動する仕組みほど、テストの価値が高くなります。</p>

      <Heading num="06">再現性 ― 時刻・乱数・IDを固定する</Heading>
      <p>テストが不安定になる典型的な原因は、実行のたびに変わる値です。</p>
      <table>
        <thead>
          <tr><th>変動要因</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">現在時刻</td><td><strong>直接<code>new Date()</code>を呼ばない</strong>。時計を注入するか、フェイクタイマーで固定する</td></tr>
          <tr><td className="hl">乱数・UUID</td><td>生成器を注入して差し替える</td></tr>
          <tr><td className="hl">タイムゾーン</td><td>テスト実行時のTZを固定する(<code>TZ=UTC</code>)</td></tr>
          <tr><td className="hl">実行順序</td><td>テスト間で状態を共有しない</td></tr>
          <tr><td className="hl">並行処理の待ち</td><td><code>sleep</code>で待たない。完了を待つ仕組みを用意する</td></tr>
        </tbody>
      </table>
      <p>「時刻を引数で受け取る」設計は、それ自体が<strong>良い設計の副産物</strong>です。「月末に落ちるテスト」「日本時間の朝9時前だけ失敗するテスト」は、テストの問題ではなく<strong>実装が環境に依存しすぎている兆候</strong>です。</p>

      <Heading num="07">速度と配分</Heading>
      <p>テストは<strong>速くなければ実行されなくなります</strong>。数分かかるスイートは、いずれ誰も手元で走らせなくなります。</p>
      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">数はUnitに寄せる</td><td>業務ルールの網羅はUnitで。DBを使うテストは<strong>代表的な経路だけ</strong></td></tr>
          <tr><td className="hl">並列実行する</td><td>テストごとにDBのスキーマかコンテナを分ければ並列化できる</td></tr>
          <tr><td className="hl">分けて走らせる</td><td>手元では速いものだけ、CIでは全部</td></tr>
          <tr><td className="hl">失敗の原因を出す</td><td>アサートのメッセージに、実際の応答本文を含める</td></tr>
        </tbody>
      </table>
      <p>そして<strong>不安定なテストは即座に直すか消します</strong>。「たまに落ちるが再実行すれば通る」を許容すると、本物の失敗まで再実行で流されるようになり、テストスイート全体が信用を失います。</p>

      <Heading num="08">何をテストしないか</Heading>
      <table>
        <thead>
          <tr><th>対象</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フレームワークの機能</td><td>Expressのルーティングが動くことは、自分のテストで確かめる必要がない</td></tr>
          <tr><td className="hl">ORMが生成するSQL</td><td>実装の詳細。<strong>結果</strong>を検証する</td></tr>
          <tr><td className="hl">private相当の内部関数</td><td>公開された振る舞い経由で検証する。<strong>実装を変えるたびに壊れるテストは負債</strong></td></tr>
          <tr><td className="hl">単純なgetter・DTO変換</td><td>費用対効果が低い</td></tr>
        </tbody>
      </table>
      <p>テストの目的は<strong>「安心して変更できること」</strong>です。実装の詳細に密着したテストは、リファクタリングのたびに書き直しを強い、かえって変更を妨げます。<Link href="/test/patterns">テストパターン</Link>で扱う「振る舞いをテストする」という原則が、ここでも効いてきます。</p>

      <Analogy label="💡 たとえるなら">
        バックエンドのテストは、飲食店の試作と衛生検査に似ています。レシピの味見(Unit)は厨房で何度でもでき、材料さえあれば数秒で終わります。しかし「実際にオーブンで焼けるか」は、<strong>本物のオーブンでしか確かめられません</strong>(本物のDB)。似ているからと家庭用トースターで代用すると(SQLiteでの代用)、本番の業務用オーブンで焦げます。一方、仕入れ先への発注(外部API)を毎回の試作で本当に行う必要はなく、伝票の書き方だけ確認すれば十分です。
      </Analogy>

      <Heading num="まとめ">DBは本物、外部は差し替え</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>層ごとに手段を変える</h4><p>業務ルールはUnitで大量に、DBを使うテストは代表経路だけ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DBはモックしない</h4><p>SQLと制約は本物でしか検証できない。スキーマはマイグレーションで作る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>再現性を仕組みで担保</h4><p>時刻・乱数・順序を固定する。不安定なテストは即座に直すか消す。</p></Card>
      </CardGrid>
      <p>バックエンドはここまでです。次は、これらを日々回していくための土台 ― <Link href="/dev/git">Gitとブランチ戦略</Link>と<Link href="/dev/ci">CI/CDパイプライン</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
            <RelatedLink href="/test/tools" tag="テスト">Vitest・Playwright</RelatedLink>
            <RelatedLink href="/dev/backend/layers" tag="バックエンド">層に分けて組み立てる</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
