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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テスト駆動開発(TDD)",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テスト駆動開発(TDD) ― テストを先に書く</h1>
        <Lead>
          TDDは「テストをたくさん書く手法」ではありません。<strong>動くコードを書く前に、動いたと判定する基準を決める</strong>手法です。結果としてテストが揃うのは副産物で、本来の効用は設計が引き締まること ―
          テストしにくいコードは、たいてい依存の多すぎる設計だと即座に分かります。
        </Lead>
      </Hero>

      <Heading num="01">3つのステップ</Heading>
      <p>TDDは短いサイクルを回します。1周は数分です。</p>
      <Steps>
        <li><strong>Red</strong> ― これから作る振る舞いのテストを書く。<strong>まだ実装がないので失敗する</strong></li>
        <li><strong>Green</strong> ― テストを通す最小限の実装を書く。汚くてよい</li>
        <li><strong>Refactor</strong> ― テストが通る状態を保ったまま、設計を整える</li>
      </Steps>
      <Aside label="Redを飛ばさない">
        「失敗することを確認する」工程には意味があります ― <strong>テストが本当に動いているか</strong>の検証です。実装後に書いたテストは、書き間違えていて常に成功していても気付けません。実際、条件を間違えて「何もテストしていないテスト」になっている例は珍しくありません。
      </Aside>

      <Heading num="02">なぜ先に書くと設計が良くなるのか</Heading>
      <p>テストを先に書くと、自分が<strong>そのコードの最初の利用者</strong>になります。使いにくいAPIは、テストを書く時点で苦痛として現れます。</p>
      <table>
        <tbody>
          <tr><th>テストで感じる苦痛</th><th>設計上の問題</th></tr>
          <tr><td className="hl">準備が10行必要</td><td>依存が多すぎる。責務が集まりすぎている</td></tr>
          <tr><td className="hl">DBを立ち上げないと試せない</td><td>ロジックがインフラと結合している</td></tr>
          <tr><td className="hl">private な処理をテストしたい</td><td>そこが独立した責務。<strong>切り出す合図</strong></td></tr>
          <tr><td className="hl">モックが5個必要</td><td>他のオブジェクトに指示を出しすぎている</td></tr>
          <tr><td className="hl">結果を確認する手段がない</td><td>戻り値がなく副作用だけ。<Link href="/design/paradigm/functional/foundations">純粋な関数</Link>に分離できないか</td></tr>
        </tbody>
      </table>
      <p>つまりTDDは<strong>設計のフィードバックを数分単位で得る仕組み</strong>です。テストが書きにくいという感覚を、設計を見直す合図として使います。</p>

      <Heading num="03">最小限の実装から始める</Heading>
      <p>Greenの段階では「正しく美しい実装」を目指しません。<strong>テストを通す最短の実装</strong>を書き、次のテストを追加して一般化していきます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 1周目 ― まずこれで通す(ベタ書きでよい)
function calculateShipping(order) {
  return 500;
}

// 2周目 ― 「5000円以上は送料無料」のテストを足して一般化する
function calculateShipping(order) {
  return order.total >= 5000 ? 0 : 500;
}`}</code>
      </pre>
      <p>不自然に見えますが、これには理由があります ― <strong>いま書いたコードのすべてが、いずれかのテストによって要求されている</strong>状態を保てるからです。使われない汎用性(推測による作り込み)が入り込みません。</p>

      <Heading num="04">テストの粒度をどこに置くか</Heading>
      <p>「1つの関数に1つのテスト」と考えると、内部実装に強く結合したテストになり、リファクタリングのたびに壊れます。粒度は<strong>振る舞いの単位</strong>で取ります。</p>
      <table>
        <tbody>
          <tr><th></th><th>実装に結合したテスト</th><th>振る舞いのテスト</th></tr>
          <tr><td className="hl">対象</td><td>内部メソッドの呼び出し順序</td><td>入力に対する出力・状態変化</td></tr>
          <tr><td className="hl">リファクタリング時</td><td><strong>壊れる</strong>(仕様は変わっていないのに)</td><td>壊れない</td></tr>
          <tr><td className="hl">読んだとき</td><td>何を保証しているか分からない</td><td>仕様書として読める</td></tr>
        </tbody>
      </table>
      <p>目安は「<strong>実装を丸ごと書き直しても、テストは変えずに済むか</strong>」です。これが成り立つテストだけが、リファクタリングの安全網として機能します。</p>

      <Heading num="05">リファクタリングの工程を飛ばさない</Heading>
      <p>実務で最も省略されるのがRefactorです。ここを飛ばすと、TDDは「動くが汚いコードを高速に量産する手法」になってしまいます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>重複を消す</h4><p>3回目に現れた重複を共通化する。1回目・2回目では急がない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>名前を直す</h4><p>実装しながら理解が深まる。理解が変わったら名前も変える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>責務を分ける</h4><p>1つの関数が複数のことをしていたら切り出す。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>テストも整える</h4><p>テストコードも保守対象。読みにくいテストは負債になる。</p></Card>
      </CardGrid>
      <p>テストが緑であることが、リファクタリングの許可証になります ― <strong>安心して壊せる状態</strong>を作るのがTDDの実利です(「<Link href="/dev/sdlc/maintenance">保守</Link>」)。</p>

      <Heading num="06">TDDが向く場面・向かない場面</Heading>
      <table>
        <tbody>
          <tr><th>向く</th><th>向かない</th></tr>
          <tr><td className="hl">仕様が明確なロジック(料金計算・状態遷移・バリデーション)</td><td>作りながら仕様を探る探索的な作業</td></tr>
          <tr><td className="hl">バグ修正(<strong>再現テストを先に書く</strong>)</td><td>UIの見た目・レイアウトの調整</td></tr>
          <tr><td className="hl">境界値が多い処理</td><td>使い捨てのスクリプト、検証用の試作</td></tr>
          <tr><td className="hl">長く保守する中核部分</td><td>外部APIとの繋ぎ込みの初期調査</td></tr>
        </tbody>
      </table>
      <p>探索が必要な場面では、まず動くものを作って理解し、<strong>理解できた時点で捨てて書き直す(その際はテストから)</strong>という進め方が現実的です。全部をTDDでやる必要はありません。</p>
      <Aside label="バグ修正では常にテストが先">
        不具合の再現テストを先に書くと、(1)再現手順が確定し、(2)修正が効いたことが機械的に分かり、(3)将来の再発を防げます ― 3つの効果が同時に得られる、最も費用対効果の高いTDDの使い方です(「<Link href="/dev/debug">デバッグの技法</Link>」)。
      </Aside>

      <Heading num="07">よくある誤解</Heading>
      <table>
        <tbody>
          <tr><th>誤解</th><th>実際</th></tr>
          <tr><td className="hl">TDDをすればテストは不要になる</td><td>TDDで書かれるのは主にUnitテスト。結合・E2Eは別途必要</td></tr>
          <tr><td className="hl">カバレッジ100%が目標</td><td>カバレッジは「テストしていない箇所」を見つける道具。目標にすると無意味なテストが増える</td></tr>
          <tr><td className="hl">開発が遅くなる</td><td>初期は遅くなる。ただし手戻りとデバッグ時間が減り、変更容易性が上がる</td></tr>
          <tr><td className="hl">全部モックにする</td><td>モックの多用は実装への結合を生む(「<Link href="/test/doubles">テストダブル</Link>」)</td></tr>
          <tr><td className="hl">テストを書けばバグがなくなる</td><td>想定した範囲の回帰は防げる。想定外は防げない</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">テストは設計の道具</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Red→Green→Refactor</h4><p>数分のサイクル。失敗を確認する工程を飛ばさない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>書きにくさは設計の合図</h4><p>準備が長い・モックが多いのは、責務と依存の問題。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>振る舞いをテストする</h4><p>実装を書き直してもテストが変わらないなら、それは良いテスト。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
            <RelatedLink href="/test/doubles" tag="テスト">テストダブル</RelatedLink>
            <RelatedLink href="/dev/sdlc/process/agile" tag="開発工程">スクラムとアジャイル実践</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
