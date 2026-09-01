import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "APIのテスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>APIのテスト ― 外に向けた約束を確かめる</h1>
        <Lead>
          <Link href="/test/integration">Integrationテスト</Link>では、DBや外部サービスとの噛み合いを見ました。APIにはもう1つ、そこに含まれない対象があります ― <Term>外に向けて公開した契約</Term>です。ステータスコード、エラー本文の形、認証の要否。これらは関数を直接呼ぶテストでは検証できず、かといってブラウザを立ち上げる必要もありません。<strong>この中間に、独立した居場所があります</strong>。
        </Lead>
      </Hero>

      <Heading num="01">層ごとに、テストの形が変わる</Heading>
      <p>
        <Link href="/backend/layers">層に分けて組み立てた</Link>構成では、層ごとに確かめるものが違い、したがって適したテストの形も違います。
      </p>

      <DiagramFrame
        slug="test-api-layers"
        aspect="700 / 320"
        caption="層ごとにテストの形が変わることを示したもの。ドメインとユースケースの層は業務ルールを持ち、依存をすべて代役にしたUnitテストで確かめる。リポジトリの層はSQLとマッピングを持ち、本物のDBでしか確かめられない。ルーターとミドルウェアの層はステータスコード・入力検証・認証・エラー本文の形を持ち、サーバーを起動せずHTTPを流し込むテストで確かめる。API全体は層がつながって動くことを本物のHTTPと本物のDBの両方を通して確かめるが、遅いので代表経路だけに絞る。"
      />

      <p>
        層を分けた最大の見返りが1行目です ― <strong>「ゴールド会員は1割引」を確かめるのに、DBもサーバーも要りません</strong>。数ミリ秒で終わるので、何百件書いても苦になりません。逆に言えば、業務ルールのテストにDBが必要な構成なら、それは層の分け方の問題です。
      </p>

      <Heading num="02">サーバーを起動せずにHTTPを叩く</Heading>
      <p>
        ルーターやミドルウェアの検証には、<strong>ポートを開かずにアプリケーションへ直接リクエストを流し込む</strong>方式を使います。ポートの衝突が起きず、並列実行がそのまま可能になります。
      </p>

      <pre>
        <code>{`import request from "supertest";
import { createApp } from "../src/app";

const app = createApp({ /* 依存を注入する */ });

test("認証なしでは 401 を返す", async () => {
  await request(app).post("/orders").send({ items: [] }).expect(401);
});

test("不正な入力は 400 とエラーコードを返す", async () => {
  const res = await request(app)
    .post("/orders")
    .set("Authorization", "Bearer " + token)
    .send({ items: "not-an-array" })
    .expect(400);

  expect(res.body.code).toBe("validation_error");
});`}</code>
      </pre>

      <Aside label="app と server を分ける">
        これを可能にするには、<strong>アプリの組み立てと待ち受けの開始を別ファイルに分けます</strong>。片方がアプリのインスタンスを返し、もう片方がそれを待ち受け状態にする ― この分離が無いと、テストのたびにポートを掴んで衝突します。<Link href="/backend/express-hello">最初のサーバー</Link>の構成がそのまま効いてきます。
      </Aside>

      <Heading num="03">APIで確かめるべきこと</Heading>
      <p>
        この段階の対象は<Term>外から見える振る舞い</Term>に限られます。内部でどう計算したかではなく、<strong>何を返したか</strong>です。
      </p>

      <table>
        <thead>
          <tr><th>確かめる対象</th><th>典型的なケース</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ステータスコード</td><td>作成は201、見つからないは404、権限不足は403(401ではない)</td></tr>
          <tr><td className="hl">入力検証</td><td>型違い、必須項目の欠落、範囲外の値が400になるか</td></tr>
          <tr><td className="hl">認証・認可</td><td>未認証で401、他人の資源へのアクセスで403</td></tr>
          <tr><td className="hl">エラー本文の形</td><td>コードとメッセージの構造が、正常系と同じ約束に従っているか</td></tr>
          <tr><td className="hl">冪等性</td><td>同じリクエストを2回送っても、結果が二重にならないか</td></tr>
        </tbody>
      </table>

      <p>
        4行目は特に見落とされます。正常系のレスポンス形式は<Link href="/backend/api-design">API設計</Link>で丁寧に決めるのに、エラー時の形は実装ごとにばらばら、という状態は珍しくありません。<strong>利用側がもっとも困るのはそこです</strong>。
      </p>

      <Heading num="04">契約テスト ― 双方が緑のまま壊れるのを防ぐ</Heading>
      <p>
        APIには必ず提供側と利用側があります。提供側は自分の実装をテストし、利用側は模倣した応答を相手だと思ってテストする ― この構図には、<strong>誰も気づけない穴</strong>があります。
      </p>

      <DiagramFrame
        slug="test-api-contract"
        aspect="640 / 320"
        caption="提供側と利用側の期待がずれる仕組みと、契約テストがそれを捕まえる位置。契約テストが無い場合、提供側が応答の項目名を変えてテストも直す一方、利用側の模倣は古い項目名のまま。両者のテストは一度も突き合わされていないため、双方緑のまま本番で壊れる。契約テストがある場合は、応答の形を契約として1か所に置き、提供側は実装がそれを満たすか、利用側は模倣がそれに沿っているかを、同じ契約に対して検証する。契約が変われば、どちらかのテストが落ちる。"
      />

      <p>
        相手が外部サービスで契約を共有できない場合は、<strong>スキーマを定期的に取得して突き合わせる</strong>テストを別立てで持ちます。あるいは、本物を叩く疎通テストを1本だけ定期実行の枠に残します ― <Link href="/test/integration">Integrationテスト</Link>で見た配分と同じ考え方です。
      </p>

      <Aside label="模倣は「相手が変わったこと」を教えてくれない">
        模倣は<strong>自分が想定した相手</strong>との会話を再現しているだけです。相手のAPI仕様が変わっても、テストは通り続けます。この性質は模倣の欠陥ではなく定義そのものなので、<Term>別の手段で補うしかありません</Term>。
      </Aside>

      <Heading num="05">何をテストしないか</Heading>
      <p>
        APIのテストは書きやすいので、放っておくと際限なく増えます。<strong>増えた分だけ遅くなり、リファクタリングの妨げになります</strong>。
      </p>

      <table>
        <thead>
          <tr><th>書かない対象</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フレームワークの機能そのもの</td><td>ルーティングが動くことは、自分のテストで確かめる対象ではない</td></tr>
          <tr><td className="hl">ORMが生成するSQL</td><td>実装の詳細。確かめるのは結果のほう</td></tr>
          <tr><td className="hl">内部関数の呼び出し順序</td><td>公開された振る舞い経由で検証する</td></tr>
          <tr><td className="hl">単純な変換・getter</td><td>費用対効果が低い</td></tr>
          <tr><td className="hl">分岐の全網羅</td><td>Unitの仕事。ここに持ち込むと実行時間だけが伸びる</td></tr>
        </tbody>
      </table>

      <p>
        判断の基準は<Link href="/test/tdd">TDD</Link>と同じです ― <strong>実装を書き直しても、このテストは変えずに済むか</strong>。済まないなら、それは振る舞いではなく実装をテストしています。
      </p>

      <Analogy label="💡 たとえるなら">
        レストランの検査です。厨房の中でどう調理したか(内部実装)は検査官の関心事ではありません。<strong>注文どおりの料理が、決められた時間内に、決められた形で出てくるか</strong>だけを見ます。API のテストが見るのも、窓口から出てきたものだけです。
      </Analogy>

      <Heading num="まとめ">窓口から出てきたものだけを見る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>層ごとに形が変わる</h4>
          <p>業務ルールはUnit、SQLは本物のDB、契約はHTTP。内側ほど多く書く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ポートを開かずに叩く</h4>
          <p>アプリの組み立てと待ち受けを分ける。並列実行がそのまま可能になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>エラー時の形も契約のうち</h4>
          <p>正常系だけ整えて、異常系がばらばらという状態が最も困る。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>模倣は相手の変化を教えない</h4>
          <p>契約テストか、スキーマの定期照合か、本物への疎通を1本残す。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでがプロセスの中で完結する段階です。次はブラウザを本当に起動する、最も外側の段階へ進みます。<Link href="/test/e2e">E2Eテストの全体像</Link>へ。
      </p>

      <DocsFooter href="/test/api" />
    </DocsPage>
  );
}
