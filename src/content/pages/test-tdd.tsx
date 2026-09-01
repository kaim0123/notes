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
  Steps,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "テスト駆動開発(TDD)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テスト駆動開発(TDD) ― テストを先に書く</h1>
        <Lead>
          <Link href="/test/levels">テストの段階</Link>までは、書いたコードをあとから確かめる話でした。TDDはその順序を入れ替えます。ただし<strong>テストをたくさん書く手法ではありません</strong> ― 動くコードを書く前に、動いたと判定する基準を先に決める手法です。テストが揃うのは副産物で、本来の効用は設計が引き締まることにあります。テストしにくいコードは、たいてい依存の多すぎる設計だと、書いた瞬間に分かるからです。
        </Lead>
      </Hero>

      <Heading num="01">3つのステップ</Heading>
      <p>TDDは短いサイクルを回します。1周は数分です。</p>

      <Steps>
        <li><strong>Red</strong> ― これから作る振る舞いのテストを書く。実装がないので<strong>必ず失敗する</strong></li>
        <li><strong>Green</strong> ― テストを通す最小限の実装を書く。汚くてよい</li>
        <li><strong>Refactor</strong> ― テストが通る状態を保ったまま、設計を整える</li>
      </Steps>

      <DiagramFrame
        slug="test-tdd-cycle"
        aspect="640 / 300"
        caption="Red・Green・Refactorの循環。Redで先にテストを書き、実装がないので落ちる姿を必ず見る。Greenでは通す最小限の実装を書き、ベタ書きで構わない。Refactorではテストが緑のまま設計を整え、そこから次の振る舞いのRedへ戻る。1周は数分。Refactorは実務で最も省略される工程で、ここを飛ばすとTDDは「動くが汚いコードを高速に量産する手法」になる。"
      />

      <Aside label="Redを飛ばさない">
        「失敗することを確認する」工程には意味があります ― <Term>テストが本当に動いているか</Term>の検証です。実装後に書いたテストは、条件を書き間違えていて常に成功していても気付けません。何もテストしていないテストが緑のまま何年も残っている例は、珍しくありません。
      </Aside>

      <Heading num="02">なぜ先に書くと設計が良くなるのか</Heading>
      <p>
        テストを先に書くと、自分が<strong>そのコードの最初の利用者</strong>になります。使いにくいAPIは、テストを書く時点で苦痛として現れます。
      </p>

      <DiagramFrame
        slug="test-tdd-feedback"
        aspect="640 / 320"
        caption="テストを書くときの苦痛と、それが指している設計上の問題の対応。準備に10行必要なら依存が多すぎる。DBを立ち上げないと試せないならロジックがインフラと結合している。privateな処理をテストしたくなったら、そこは独立した責務で切り出す合図。モックが5個必要なら他のオブジェクトに指示を出しすぎている。結果を確認する手段がないなら、戻り値がなく副作用だけになっている。TDDの実利は、この設計のフィードバックを数分単位で受け取れることにある。"
      />

      <p>
        表の右側は、いずれも<Link href="/design/principles-cohesion">凝集度と結合度</Link>の問題として説明できるものです。TDDが特別なのは、それを<strong>抽象的な原則ではなく、いま感じている面倒くささとして</strong>突きつけてくる点にあります。テストが書きにくいという感覚を、設計を見直す合図として使います。
      </p>

      <Heading num="03">最小限の実装から始める</Heading>
      <p>
        Greenの段階では「正しく美しい実装」を目指しません。<Term>テストを通す最短の実装</Term>を書き、次のテストを追加して一般化していきます。
      </p>

      <pre>
        <code>{`// 1周目 ― まずこれで通す(ベタ書きでよい)
function calculateShipping(order) {
  return 500;
}

// 2周目 ―「5000円以上は送料無料」のテストを足して一般化する
function calculateShipping(order) {
  return order.total >= 5000 ? 0 : 500;
}`}</code>
      </pre>

      <p>
        1周目は不自然に見えますが、これには理由があります ― <strong>いま書いたコードのすべてが、いずれかのテストによって要求されている</strong>という状態を保てるからです。「たぶん後で要る」と推測して書いた汎用性が入り込む余地がなくなります。
      </p>

      <Heading num="04">テストの粒度をどこに置くか</Heading>
      <p>
        「1つの関数に1つのテスト」と考えると、内部実装に強く結合したテストになり、リファクタリングのたびに壊れます。粒度は<Term>振る舞いの単位</Term>で取ります。
      </p>

      <table>
        <thead>
          <tr><th></th><th>実装に結合したテスト</th><th>振る舞いのテスト</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">確かめる対象</td><td>内部メソッドの呼び出し順序</td><td>入力に対する出力・状態の変化</td></tr>
          <tr><td className="hl">リファクタリング時</td><td><strong>壊れる</strong>(仕様は変わっていないのに)</td><td>壊れない</td></tr>
          <tr><td className="hl">読んだとき</td><td>何を保証しているか分からない</td><td>仕様書として読める</td></tr>
        </tbody>
      </table>

      <p>
        目安は「<strong>実装を丸ごと書き直しても、テストは変えずに済むか</strong>」です。これが成り立つテストだけが、リファクタリングの安全網として機能します。成り立たないテストは、安全網ではなく錘です。
      </p>

      <Heading num="05">リファクタリングの工程を飛ばさない</Heading>
      <p>
        実務で最も省略されるのがRefactorです。緑になった時点で次の機能に移りたくなるからですが、ここを飛ばすと、TDDは「動くが汚いコードを高速に量産する手法」になってしまいます。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>重複を消す</h4>
          <p>3回目に現れた重複を共通化する。1回目・2回目では急がない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>名前を直す</h4>
          <p>実装しながら理解が深まる。理解が変わったら名前も変える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>責務を分ける</h4>
          <p>1つの関数が複数のことをしていたら切り出す。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>テストも整える</h4>
          <p>テストコードも保守対象。読みにくいテストは負債になる。</p>
        </Card>
      </CardGrid>

      <p>
        テストが緑であることが、リファクタリングの許可証になります ― <Term>安心して壊せる状態</Term>を作るのがTDDの実利です。命名や関数の切り出しの基準そのものは<Link href="/design/conventions-functions">関数の書き方</Link>に譲ります。
      </p>

      <Heading num="06">向く場面・向かない場面</Heading>
      <table>
        <thead>
          <tr><th>向く</th><th>向かない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">仕様が明確なロジック(料金計算・状態遷移・検証)</td><td>作りながら仕様を探る探索的な作業</td></tr>
          <tr><td className="hl">バグ修正(<strong>再現テストを先に書く</strong>)</td><td>画面の見た目・レイアウトの調整</td></tr>
          <tr><td className="hl">境界値が多い処理</td><td>使い捨てのスクリプト、検証用の試作</td></tr>
          <tr><td className="hl">長く保守する中核部分</td><td>外部APIとの繋ぎ込みの初期調査</td></tr>
        </tbody>
      </table>

      <p>
        探索が必要な場面では、まず動くものを作って理解し、<strong>理解できた時点で捨てて書き直す(その際はテストから)</strong>という進め方が現実的です。全部をTDDでやる必要はありません。
      </p>

      <Aside label="バグ修正では常にテストが先">
        不具合の再現テストを先に書くと、3つの効果が同時に得られます ― 再現手順が確定し、修正が効いたことが機械的に分かり、将来の再発を防げる。<Link href="/dev/debug">デバッグの技法</Link>と組み合わせたとき、最も費用対効果の高いTDDの使い方です。
      </Aside>

      <Heading num="07">よくある誤解</Heading>
      <table>
        <thead>
          <tr><th>誤解</th><th>実際</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">TDDをすれば他のテストは不要になる</td><td>TDDで書かれるのは主に内側の段階。外側は別途必要</td></tr>
          <tr><td className="hl">カバレッジ100%が目標</td><td>カバレッジは「テストしていない箇所」を見つける道具。目標にすると無意味なテストが増える</td></tr>
          <tr><td className="hl">開発が遅くなる</td><td>初期は遅くなる。手戻りとデバッグ時間が減り、変更容易性が上がる</td></tr>
          <tr><td className="hl">全部を代役に置き換える</td><td>置き換えすぎは実装への結合を生む(<Link href="/test/stability">テストを安定させる</Link>)</td></tr>
          <tr><td className="hl">テストを書けばバグがなくなる</td><td>想定した範囲の回帰は防げる。想定外は防げない</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">テストは設計の道具</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Red→Green→Refactor</h4>
          <p>数分のサイクル。落ちる姿を見る工程も、整える工程も飛ばさない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>書きにくさは設計の合図</h4>
          <p>準備が長い・代役が多いのは、責務と依存の問題が表に出たもの。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>振る舞いをテストする</h4>
          <p>実装を書き直してもテストが変わらないなら、それは良いテスト。</p>
        </Card>
      </CardGrid>

      <p>
        書く順序の話はここまでです。次は、書いたテストを信用できる状態に保つ方法を見ます。<Link href="/test/stability">テストを安定させる</Link>へ進みます。
      </p>

      <DocsFooter href="/test/tdd" />
    </DocsPage>
  );
}
