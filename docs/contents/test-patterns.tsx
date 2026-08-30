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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テストパターン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストパターン ― テストコードを書く・保つための定石</h1>
        <Lead>
          <Link href="/test/unit">Unitテスト</Link>で扱ったテストダブルやAAA、<Link href="/test/e2e">E2Eテスト</Link>で扱ったページオブジェクトパターンのほかにも、テストコードには繰り返し現れる定石があります。テストデータをどう用意するか、前準備・後始末をどう整理するか、期待値をどう作るか、外部との境界をどう検証するか、網羅性をどう上げるか ― この5つの観点で、まだ扱っていない主要なパターンを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">テストデータを用意する定石</Heading>
      <p>テスト対象に渡す入力データを、テストごとにオブジェクトリテラルで毎回書き下ろすと、必須項目が増えるたびに全テストを書き直す羽目になります。そこで「デフォルト値を持ち、必要な項目だけ上書きできる」仕組みを用意しておく2つの定石があります。</p>
      <table>
        <thead><tr><th>パターン</th><th>内容</th></tr></thead>
        <tbody>
          <tr><td className="hl">Test Data Builder</td><td>メソッドチェーンで一部の値だけ上書きしながら、テストデータを段階的に組み立てる生成器</td></tr>
          <tr><td className="hl">Object Mother</td><td>よく使う典型的なテストデータ(「管理者ユーザー」「未払いの注文」など)を、名前付きの関数としてあらかじめ用意しておく工場</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Test Data Builder ― 必要な項目だけ上書きする
class UserBuilder {
  private user = { name: "デフォルト太郎", email: "default@example.com", role: "member" };
  withName(name: string) { this.user.name = name; return this; }
  withRole(role: string) { this.user.role = role; return this; }
  build() { return { ...this.user }; }
}
const admin = new UserBuilder().withRole("admin").build();

// Object Mother ― 典型的なパターンに名前を付けて再利用する
function createAdminUser() {
  return { name: "管理者太郎", email: "admin@example.com", role: "admin" };
}`}</code>
      </pre>
      <p>両者は排他ではなく、よく使う典型パターンはObject Motherの関数として名前を付け、テストごとに微調整が必要な部分だけBuilderで上書きする、という組み合わせ方もよく使われます。</p>

      <Heading num="02">前準備・後始末を整理する定石</Heading>
      <p><Link href="/test/integration">Integrationテスト</Link>で触れた「テストの前後でデータを初期化・削除する」ことを、明確なパターンとして呼ぶ名前が<Term>Fixture(フィクスチャ)</Term>です。テストが依存する既知の状態(DBのシードデータ、ログイン済みのセッションなど)をFixtureとして用意し、テスト実行後には必ず後始末(Teardown)することで、あるテストの残骸が別のテストに影響しないようにします。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`beforeEach(async () => {
  await db.seed(createAdminUser()); // Fixtureを準備
});

afterEach(async () => {
  await db.truncate(); // 後始末(Teardown)で状態をリセット
});`}</code>
      </pre>
      <p>Fixtureを使い回すほどテストは書きやすくなりますが、共有Fixtureに依存しすぎると「このテストが通るのは、あのFixtureのこの値のおかげ」という暗黙の結合が生まれます。Builder/Object Motherで必要なデータをテストごとに明示的に作る方針と、Fixtureで共通の初期状態を用意する方針は、テストの独立性とのバランスで使い分けます。</p>

      <Heading num="03">期待値の作り方を変える定石</Heading>
      <p>出力が複雑な構造(大きなJSON、生成されたHTML、レンダリング結果)になると、期待値を1つずつ手で書くのが現実的でなくなります。<Term>Golden Master(Snapshotテスト)</Term>は、最初の実行結果を「正解」としてファイルに保存し、以降の実行では保存済みの結果と比較して差分だけを検知する手法です。<Link href="/test/quality-plan">品質計画</Link>で触れたビジュアル回帰テスト(画面のスクリーンショット差分)は、この考え方を画像に適用したものですが、Snapshotテストはロジックの出力(関数の戻り値、APIレスポンスの形)に対しても同じ発想で使えます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`test("注文の請求書を生成する", () => {
  const invoice = buildInvoice(order);
  expect(invoice).toMatchSnapshot(); // 差分をSnapshotファイルと比較
});`}</code>
      </pre>
      <p>手軽に導入できる一方、出力が変わるたびに「意図した変更か、意図しない壊れ方か」を人間が判断してSnapshotを更新する必要があり、確認を怠ると壊れた出力をそのまま「正解」として承認してしまう危険があります。</p>

      <Heading num="04">外部境界の変化を検知する定石</Heading>
      <p><Link href="/test/integration">Integrationテスト</Link>のVCR・モックサーバーは「自分のコードが、相手のAPIの仕様通りに動けているか」を検証するものでした。<Term>Contract Testing(Consumer-Driven Contracts)</Term>はこれと視点が逆で、「相手(Provider)が、自分たち(Consumer)が期待する契約を破っていないか」を検知するための手法です。利用側が「このエンドポイントにはこの形のリクエストを送り、この形のレスポンスを期待する」という契約をコードとして明文化し、提供側のCIでその契約に対するテストを実行することで、サービス間の変更に双方が気づけるようにします。マイクロサービスのように提供側と利用側が別チームになる構成で特に有効です。</p>

      <Heading num="05">網羅性を上げる定石</Heading>
      <p>最後に、同じロジックに対してテストケースの件数・多様性を増やす2つの定石です。</p>
      <table>
        <thead><tr><th>パターン</th><th>内容</th></tr></thead>
        <tbody>
          <tr><td className="hl">Parameterized(Table-driven)Test</td><td>同じ検証ロジックを、入力と期待値の組だけを差し替えて何パターンも実行する</td></tr>
          <tr><td className="hl">Property-based Testing</td><td>具体的な入力例ではなく「どんな入力でも成り立つはずの性質(不変条件)」を定義し、ランダムな入力で反証を試みる</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Parameterized Test ― 入力と期待値の組だけを並べる
it.each([
  [0, "無料"],
  [999, "無料"],
  [1000, "送料あり"],
])("金額%iのとき%sと表示する", (amount, expected) => {
  expect(getShippingLabel(amount)).toBe(expected);
});`}</code>
      </pre>
      <p>Parameterized Testは<Link href="/test/design-techniques">テスト設計技法</Link>のデシジョンテーブル・ペアワイズ法で選び出した入力パターンを、実際のテストコードに落とし込む際の書き方だと捉えると位置づけが分かりやすくなります。一方Property-based Testing(fast-checkなどのライブラリが有名)は「入力例を人間が列挙する」代わりに「性質を人間が定義し、反例をツールに探させる」発想で、境界値分析で見落としていた入力を機械的に発見できることがあります。</p>

      <Analogy label="💡 たとえるなら">
        テストデータの用意(Builder/Object Mother)は「実験材料の調達」、Fixtureは「実験室を毎回同じ状態にリセットする手順」、Golden Master/Snapshotは「過去の実験結果を基準に、今回の結果がズレていないか比べる」こと、Contract Testingは「取引先が約束を守っているかの定期確認」、Parameterized/Property-basedは「同じ実験を条件を変えて何度も繰り返す」ことに相当します。どれも個別のテストケースそのものではなく、テストケースを「書きやすく・保ちやすく・見落としにくく」するための土台です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>データを用意する</h4><p>Test Data Builder・Object Motherで、テストデータの重複と書き直しを減らす。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>前後を整理する</h4><p>Fixtureで既知の状態を作り、Teardownで確実にリセットする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>期待値を変える</h4><p>Golden Master/Snapshotで、複雑な出力を丸ごと比較対象にする。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>境界を検証する</h4><p>Contract Testingで、相手側の変更による契約違反を検知する。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>網羅性を上げる</h4><p>Parameterized/Property-based Testingで、入力パターンを機械的に増やす。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
                    <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
                    <RelatedLink href="/test" tag="テスト">テスト一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
