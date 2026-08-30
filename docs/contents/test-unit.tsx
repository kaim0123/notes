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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Unitテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Unitテスト ― テストピラミッドの土台を、書きやすく壊れにくくする</h1>
        <Lead>
          Unitテストは関数やクラス単位の入出力を検証する、テストピラミッドで最も数の多い層です。数が多いからこそ、1件ずつの書き方に一貫したルールがないと、すぐに「読めない・信用できない」テスト資産になってしまいます。この章では、Unitテストを書く上での型と、テストしやすいコードの設計判断を扱います。
        </Lead>
      </Hero>

      <Heading num="01">FIRST原則 ― 良いUnitテストの5条件</Heading>
      <p>良いUnitテストが満たすべき性質を頭文字で表したものが<Term>FIRST原則</Term>です。</p>
      <CardGrid>
        <Card><CardNumber>F</CardNumber><h4>Fast(速い)</h4><p>ミリ秒〜数十ミリ秒で終わること。遅いテストは実行されなくなります。</p></Card>
        <Card><CardNumber>I</CardNumber><h4>Independent(独立)</h4><p>他のテストの実行順序や結果に依存しないこと。</p></Card>
        <Card><CardNumber>R</CardNumber><h4>Repeatable(再現可能)</h4><p>環境やタイミングによらず、何度実行しても同じ結果になること。</p></Card>
        <Card><CardNumber>S</CardNumber><h4>Self-Validating(自己検証)</h4><p>合否をテスト自身が判定すること。ログを人が目で見て判断する形にしない。</p></Card>
        <Card><CardNumber>T</CardNumber><h4>Timely(タイムリー)</h4><p>実装と同時期、理想的にはその前後で書くこと。後回しにすると書かれなくなります。</p></Card>
      </CardGrid>

      <Heading num="02">Arrange-Act-Assert ― テストの中身を3段に分ける</Heading>
      <p>1件のテストコードは、準備(Arrange)・実行(Act)・検証(Assert)の3段構成で書くと見通しが良くなります。テストデータや依存を準備する段、テスト対象を実際に呼び出す段、結果を確認する段を空行やコメントで区切ると、テストが何を確認しているのか一目で分かるようになります。<Term>Given-When-Then</Term>(与えられた状況で・何かをしたら・こうなる)もほぼ同じ考え方で、こちらは仕様書寄りの言い回しとしてBDD(振る舞い駆動開発)の文脈でよく使われます。</p>

      <Heading num="03">テストの命名規則 ― 失敗したときにコードを読まずに分かる名前</Heading>
      <p>テストが失敗したとき、まず見るのはテスト名です。「test1」のような名前では何が壊れたのか分かりません。「対象の関数・条件・期待する結果」の3要素を名前に含めると、失敗ログだけで当たりがつけられます。</p>
      <Aside label="命名の型の例">
        <code>calculateTax_税込み価格が10%上乗せされること</code>のように「関数名_条件と期待結果」という形にする、あるいは<code>it(&quot;10%の消費税が加算される&quot;, ...)</code>のように自然文で書く、どちらでも構いません。重要なのはチーム内で型を統一することです。
      </Aside>

      <Heading num="04">1テスト1アサーションの是非</Heading>
      <p>「1つのテストケースにつき、検証(assert)は1つだけにすべきか」という論点があります。厳密に1つに絞ると失敗箇所の特定は容易になりますが、関連する複数の値(例えば税込み価格と内訳の両方)を一度に確認したい場面ではテスト数が増えすぎます。実務的な落とし所は「1つの<strong>関心事</strong>につき1テスト」で、関連する複数の値をまとめて検証すること自体は問題なく、無関係な検証を1つのテストに詰め込まないことが本質です。</p>

      <Heading num="05">テストの独立性 ― 実行順序に依存しない</Heading>
      <p>あるテストが別のテストで作られたデータや状態に依存していると、実行順序を変えただけでテストが失敗するようになります。各テストは実行の前に自分で必要な状態を準備し(Arrange)、終了後に後片付けをするのが原則です。グローバルな状態やテスト間で共有する変数は、独立性を壊す典型的な原因になります。</p>

      <Heading num="06">テストダブルの分類 ― 「本物の代わり」にも種類がある</Heading>
      <p>依存先を本物のまま使うとテストが遅く不安定になるため、代わりの偽物(<Term>テストダブル</Term>)に差し替えることがあります。ひとくちに「モック」と呼ばれがちですが、目的によって種類が分かれます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スタブ(Stub)</td><td>呼ばれたら決まった値を返すだけの単純な代役。「呼ばれたか」は確認しない。</td></tr>
          <tr><td className="hl">モック(Mock)</td><td>「正しい引数で、正しい回数呼ばれたか」まで検証する代役。</td></tr>
          <tr><td className="hl">スパイ(Spy)</td><td>本物を動かしつつ、呼び出し履歴だけ記録して後から確認できるようにしたもの。</td></tr>
          <tr><td className="hl">フェイク(Fake)</td><td>簡易実装で本物の代わりをするもの(インメモリDBなど)。動作はするが本番用ではない。</td></tr>
        </tbody>
      </table>
      <p>Unitテストでは主にスタブとモックを使い、本物に近い依存(DBや外部API)を扱う検証は<Link href="/test/integration">Integrationテスト</Link>の領域になります。</p>

      <Heading num="07">純粋関数として切り出す ― Unitテストを書きやすくする設計判断</Heading>
      <p>テストのしやすさは、書き方だけでなくコードの設計にも左右されます。鍵になるのが「<Term>純粋関数</Term>として切り出せる処理を、意識的にライブラリ層へ分離する」という判断です。純粋関数かどうかは次の2点で判断できます。</p>
      <Steps>
        <li><strong>同じ入力なら、常に同じ出力になるか</strong>引数だけで結果が決まり、実行するたびに答えが変わらないか(<code>Date.now()</code>や乱数、外部APIの応答に依存していないか)</li>
        <li><strong>関数の外の世界に触れていないか</strong>DOMの書き換え・DBへの書き込み・ファイル操作・グローバル変数の読み書きなど、呼び出した時点で何かを変化させていないか</li>
      </Steps>
      <p>税込み価格の計算、入力値のバリデーション、文字列のフォーマット、配列のソートやフィルタといった処理はこの2条件を満たしやすく、純粋関数として<code>lib/</code>のようなディレクトリに切り出す好例です。</p>

      <Analogy label="💡 たとえるなら">
        純粋関数は「電卓」に似ています。同じボタンを同じ順番で押せば、いつ・どこで押しても必ず同じ答えが出て、電卓自体の中身も変化しません。一方で「ボタンを押したらAPIを呼ぶ」ような副作用のある処理は、押すたびに外の世界(サーバーやDB)が変化するため電卓のようには扱えません。
      </Analogy>

      <Heading num="08">副作用を含む関数のテスト ― 依存注入で書きやすくする</Heading>
      <p>「ボタンを押したらAPIを呼ぶ」「フォーム送信でDBに書き込む」といった処理は、副作用を起こすこと自体が目的なので純粋関数にはできません。ここで有効なのが<Term>依存性注入(DI)</Term>です。API呼び出しやDBアクセスを直接関数の中に書き込むのではなく、外から「差し替え可能な形」で渡すようにすると、テスト時には本物の代わりにスタブを注入でき、副作用のある処理でもUnitテストの対象にできます。</p>

      <Heading num="09">境界値の網羅</Heading>
      <p><Link href="/test/design-techniques">テスト設計技法</Link>で扱う同値分割・境界値分析は、Unitテストのケース選びにそのまま使えます。純粋関数はまさに「同じ入力なら同じ出力」という性質を持つため、境界値分析と特に相性が良く、範囲の端の値を優先してテストケースを用意することで、少ない件数で高い発見力を得られます。</p>

      <Heading num="まとめ">Unitテストで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>FIRST原則を満たす</h4><p>速く・独立していて・再現可能・自己検証・タイムリーであることを意識します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3段構成と命名で読みやすくする</h4><p>Arrange-Act-Assertで構造化し、失敗時にログだけで分かる名前をつけます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テストダブルを使い分ける</h4><p>スタブ・モック・スパイ・フェイクを目的に応じて選びます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>純粋関数を切り出す</h4><p>「同じ入力→同じ出力」かつ「外の世界に触れない」処理をlibへ分離し、DIで副作用も扱いやすくします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
                    <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
                    <RelatedLink href="/test/doubles" tag="テスト">テストダブル</RelatedLink>
                    <RelatedLink href="/test/tdd" tag="テスト">テスト駆動開発(TDD)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
