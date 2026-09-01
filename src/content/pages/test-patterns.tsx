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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "テストパターン" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストパターン ― 苦しい箇所に、名前を付ける</h1>
        <Lead>
          <Link href="/test/data">テストデータ管理</Link>までで、テストが依存する外側は制御下に入りました。残るのは<strong>テストコードそのものの書き方</strong>です。定石を覚えること自体に価値はありません。価値があるのは、<Term>テストのどこが苦しいかに応じて、対処を選べるようになること</Term>です。ここでは、その対応表を作ります。
        </Lead>
      </Hero>

      <Heading num="01">定石は、テストのどこに効くのか</Heading>

      <DiagramFrame
        slug="test-patterns-map"
        aspect="700 / 340"
        caption="テストコードの定石が、テストのどの部分に効くのかの対応。入力データを用意する部分にはTest Data BuilderとObject Mother、前準備と後始末にはFixtureとTeardown、期待値を作る部分にはGolden Master(スナップショット)、外部との境界にはContract Testing、件数と多様性を増やす部分にはParameterized TestとProperty-based Testingが対応する。定石を覚えること自体に価値はなく、苦しい箇所に名前が付いていると対処を選べるようになる。"
      />

      <Heading num="02">入力データを用意する ― BuilderとObject Mother</Heading>
      <p>
        テスト対象に渡す入力を毎回オブジェクトリテラルで書き下ろすと、必須項目が1つ増えるたびに全テストを書き直す羽目になります。「既定値を持ち、必要な項目だけ上書きできる」仕組みを用意しておく定石が2つあります。
      </p>

      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Test Data Builder</td><td>一部の値だけを上書きしながら、テストデータを段階的に組み立てる生成器</td></tr>
          <tr><td className="hl">Object Mother</td><td>よく使う典型(「管理者」「未払いの注文」)に名前を付けて用意しておく工場</td></tr>
        </tbody>
      </table>

      <pre>
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

      <p>
        両者は排他ではありません。<strong>よく使う典型はObject Motherで名前を付け、テストごとの微調整だけBuilderで上書きする</strong>という組み合わせが実務では扱いやすくなります。どちらを使っても得られるものは同じ ― <Link href="/test/data">テストデータ管理</Link>で見た「書いてある項目がそのまま前提になる」状態です。
      </p>

      <Heading num="03">前準備と後始末 ― Fixtureへの依存度を測る</Heading>
      <p>
        テストが依存する既知の状態を<Term>Fixture</Term>として用意し、実行後には必ず後始末をする ― これ自体は<Link href="/test/integration">Integrationテスト</Link>で見たとおりです。パターンとして扱うときの論点は、<strong>どこまで共有するか</strong>にあります。
      </p>

      <pre>
        <code>{`beforeEach(async () => {
  await db.seed(createAdminUser()); // Fixture を準備
});

afterEach(async () => {
  await db.truncate(); // 後始末で状態を戻す
});`}</code>
      </pre>

      <p>
        Fixtureを使い回すほどテストは書きやすくなりますが、共有しすぎると<Term>「このテストが通るのは、あのFixtureのあの値のおかげ」</Term>という暗黙の結合が生まれます。判断の基準は1つです ― <strong>そのテストの本質的な前提は、テストの中に書く</strong>。全テストに共通する土台だけをFixtureに残します。
      </p>

      <Heading num="04">期待値を作る ― Golden Master</Heading>
      <p>
        出力が複雑な構造(大きなJSON、生成されたHTML)になると、期待値を1つずつ手で書くのが現実的でなくなります。<Term>Golden Master</Term>(スナップショットテスト)は、最初の実行結果を「正解」として保存し、以降は差分だけを見る手法です。
      </p>

      <pre>
        <code>{`test("注文の請求書を生成する", () => {
  const invoice = buildInvoice(order);
  expect(invoice).toMatchSnapshot(); // 保存済みの結果と比較する
});`}</code>
      </pre>

      <Aside label="安さと引き換えに、何を手放すか">
        手軽に導入できる一方、出力が変わるたびに<strong>「意図した変更か、意図しない壊れ方か」を人間が判断する</strong>必要があります。確認を怠って更新を通すと、壊れた出力がそのまま「正解」として承認されます ― <Link href="/test/review">レビュー</Link>で最も見落とされる差分の1つです。
      </Aside>

      <p>
        <Link href="/test/non-functional">ビジュアル回帰テスト</Link>は、この考え方を画像に適用したものです。抱える性質もまったく同じで、更新の承認をどう扱うかが運用の要になります。
      </p>

      <Heading num="05">外部境界の変化を知る ― Contract Testing</Heading>
      <p>
        代役を使う限り「想像した仕様」と「実際の仕様」のずれは残ります。<Term>Contract Testing</Term>は、利用側が期待する形を契約としてコードに明文化し、<strong>提供側のCIでその契約に対するテストを実行する</strong>ことで、双方が変更に気づけるようにする手法です。
      </p>
      <p>
        <Link href="/test/api">APIのテスト</Link>で見た構図の裏返しにあたります ― あちらが「自分のコードが相手の仕様どおり動けるか」を見るのに対し、こちらは「相手が、こちらの期待する契約を破っていないか」を見ます。提供側と利用側が別のチームになる構成で特に効きます。
      </p>

      <Heading num="06">件数と多様性を増やす</Heading>
      <p>
        同じロジックに対してケースの数と幅を増やす定石が2つあります。目的が違うので、置き換え関係ではありません。
      </p>

      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th><th>見つかるもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Parameterized Test</td><td>入力と期待値の組だけを差し替えて、同じ検証を繰り返す</td><td>自分が想定した範囲の抜け</td></tr>
          <tr><td className="hl">Property-based Testing</td><td>成り立つはずの性質を定義し、ランダムな入力で反証を試みる</td><td><strong>自分が想定していなかった入力</strong></td></tr>
        </tbody>
      </table>

      <p>
        前者は<Link href="/test/design-techniques">同値分割・境界値分析</Link>で選んだ値を並べる器として自然に使えます。後者はもっと踏み込んで、「並べ替えた結果は、元と同じ要素数になる」「二度符号化して復号すれば元に戻る」といった<Term>不変条件</Term>を書きます。<strong>思いつかなかった入力を機械に探させる</strong>のが後者の値打ちで、境界値分析が原理的に届かない領域を補います。
      </p>

      <Heading num="まとめ">名前があると、選べる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>データは既定値＋上書きで</h4>
          <p>典型に名前を付け、差分だけを書く。書いた項目が前提になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>共有Fixtureは暗黙の結合を生む</h4>
          <p>本質的な前提はテストの中に書き、共通の土台だけを外に出す。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スナップショットは承認の運用込み</h4>
          <p>確認せず更新を通せば、壊れた出力が正解になる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>想定外は機械に探させる</h4>
          <p>性質を書いて反証を試みる。境界値分析が届かない領域を補う。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでの手立てをすべて打っても、不安定さはゼロにはなりません。最後に、取りこぼしを拾う仕組みへ。<Link href="/test/flaky">フレーキーテスト</Link>へ進みます。
      </p>

      <DocsFooter href="/test/patterns" />
    </DocsPage>
  );
}
