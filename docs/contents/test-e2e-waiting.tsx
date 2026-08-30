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
  title: "描画待機とAI生成テストのレビュー",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>描画待機とAI生成テストのレビュー ― フレーキーテストの最大の原因に向き合う</h1>
        <Lead>
          <Link href="/test/flaky">フレーキーテスト</Link>の原因を1つに絞るなら、多くの現場で「画面の描画が終わる前にテストが操作・検証してしまうこと」が挙げられます。Playwrightは自動待機という仕組みでこの問題の大半を吸収しますが、その仕組みを理解していないまま書かれたテスト ― 特にAIに生成させたテスト ― は、かえって不安定さを持ち込みます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ画面描画の待機が問題になるのか</Heading>
      <p>ブラウザ上の画面は、テストコードが次の行を実行する速度とは無関係なタイミングで変化します。ボタンを押した瞬間、サーバーへのリクエストが飛び、レスポンスが返り、Reactなどのフレームワークが再レンダリングし、CSSのトランジションが走り終わって、はじめて「操作の結果」が画面に反映されます。この一連の非同期処理と、テストコードの実行速度がずれることで、次の2種類の問題が起こります。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>早すぎる失敗(偽陰性)</h4><p>描画が終わる前に要素を探しにいき、「見つからない」「クリックできない」としてテストが落ちる。機能自体は正しく動いている。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>早すぎる成功(偽陽性)</h4><p>画面遷移前の古いDOMに対して「エラーメッセージが表示されていないこと」を確認してしまい、実際には遷移後にエラーが出ていても検出できない。</p></Card>
      </CardGrid>

      <p>偽陰性はCIを詰まらせる分かりやすい迷惑ですが、より危険なのは偽陽性です。テストは緑のまま、実際の不具合を見逃します。描画待機の設計を軽視すると、テストの信頼性そのものが揺らぐのはこのためです。</p>

      <Heading num="02">見落としやすい「描画完了」のパターン</Heading>
      <p>「ローディングスピナーが消えたら描画完了」という単純なモデルで済む画面は、実務では少数派です。次のパターンは、一見待機できているつもりで抜けやすい典型例です。</p>

      <table>
        <thead>
          <tr><th>パターン</th><th>見落としの内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スケルトン→本体への差し替え</td><td>スピナーが消えた=本体表示、ではなくスケルトンUIに差し替わっただけで、実データはまだ来ていない場合がある</td></tr>
          <tr><td className="hl">トースト・スナックバー通知</td><td>数秒で自動的に消えるため、検証のタイミングがずれると「出たこと」自体を捉えられない</td></tr>
          <tr><td className="hl">アニメーション・トランジション中のクリック</td><td>要素はDOM上に存在し表示もされているが、移動アニメーションの最中でクリック座標がずれる</td></tr>
          <tr><td className="hl">多段の再レンダリング</td><td>非同期処理が複数回に分けて状態を更新し、1回目の再レンダリングで検証してしまい2回目以降の変化を見逃す</td></tr>
          <tr><td className="hl">遷移直後の古いDOM</td><td>ページ遷移のアニメーション中、前の画面の要素がまだ残っており、意図と違う要素にマッチしてしまう</td></tr>
          <tr><td className="hl">デバウンス・スロットルされた検索結果</td><td>入力から数百ミリ秒後に検索が走る設計では、入力直後に結果を検証すると前回の検索結果を見てしまう</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        「スピナーが消えた」だけで描画完了とみなすのは、「レジの行列が動き出した」のを見て「会計が終わった」と判断するようなものです。実際にはまだレジ袋に商品を詰めている途中かもしれません。何が起きたら本当に完了なのか、画面ごとに具体的な最終状態(表示されているテキスト・件数・URLなど)を基準に決める必要があります。
      </Analogy>

      <Heading num="03">Playwrightの自動待機を理解しているかが分岐点</Heading>
      <p>Playwrightは、他の多くのE2Eツールと違い、要素を操作・検証する前に一定の条件を満たすまで<strong>自動的にポーリングして待つ</strong>仕組みを標準で持っています。この仕組みを正しく理解しているかどうかが、フレーキーテストを量産するチームと、安定したテストを書けるチームの分岐点になります。</p>

      <table>
        <thead>
          <tr><th>チェック内容</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Attached</td><td>要素がDOMに存在する</td></tr>
          <tr><td className="hl">Visible</td><td>表示されている(display:none等でない)</td></tr>
          <tr><td className="hl">Stable</td><td>アニメーション中でなく、位置が安定している</td></tr>
          <tr><td className="hl">Enabled / Editable</td><td>disabledでなく、入力操作が可能</td></tr>
          <tr><td className="hl">Receives Events</td><td>他の要素に覆われておらず、実際にクリックを受け取れる</td></tr>
        </tbody>
      </table>

      <p>この<Term>アクショナビリティチェック</Term>は、<code>page.click()</code>や<code>page.fill()</code>といった操作系のメソッドに組み込まれています。さらに、<code>expect(locator).toHaveText()</code>のような<Term>Web-First Assertion</Term>は、条件が満たされるまで(既定で数秒間)繰り返し評価し続けます。02で挙げた「多段の再レンダリング」の多くは、実はこのWeb-First Assertionのポーリングだけで解決します。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 良い例: locatorを渡し、条件が満たされるまでPlaywrightが自動的に再試行する
await expect(page.getByRole("status")).toHaveText("キャンセル済み");

// 悪い例: その瞬間のテキストを1回だけ取得している。再レンダリング前の値を掴んで失敗する
const text = await page.getByRole("status").textContent();
expect(text).toBe("キャンセル済み");`}</code>
      </pre>

      <p>この2つの違いを理解していないと、「たまに失敗する」テストに遭遇したときの対処が「<code>waitForTimeout(3000)</code>を足す」という誤った方向に向かいます。固定時間のスリープは、遅い環境では足りず、速い環境では無駄に待つという、どちらの意味でも正しくない解決策です。</p>

      <Heading num="04">それでも待機を書きたくなる場面と、正しい書き方</Heading>
      <p>自動待機で足りない場面は確かにあります。そのときも、固定時間のスリープではなく「何が起きるまで待つか」を条件として明示する書き方を選びます。</p>

      <Steps>
        <li><strong>特定のネットワーク応答を待つ</strong><code>page.waitForResponse()</code>で、対象のAPIリクエストが完了したことそのものを待機条件にする。「3秒待てば終わっているはず」という推測をやめられる。</li>
        <li><strong>アプリ側の完了イベントを待つ</strong>「読み込み完了」を示すデータ属性(<code>{`data-loaded="true"`}</code>)をアプリ側に用意し、それが付くのを待つ。テスト側だけの工夫では解決できない画面には、テスト容易性のための小さな実装協力を検討する。</li>
        <li><strong><code>{`waitForLoadState("networkidle")`}</code>への過度な依存を避ける</strong>ポーリングや定期的な通信を行うSPAでは通信が途切れず、意図した意味で「アイドル」にならない。ページ全体の読み込みではなく、個別の要素・レスポンスを待機条件にする方が安定する。</li>
      </Steps>

      <Aside label="判断の合言葉">
        「何が起きたら次に進んでよいか」を先に言葉にできるかどうかを自問します。言葉にできれば、それに対応する<code>waitFor*</code>や<code>expect(locator)</code>が必ず存在します。言葉にできず「とりあえず数秒待てば」としか言えないときは、まだ完了条件の分析が終わっていないサインです。
      </Aside>

      <Heading num="05">AI生成テストのレビューチェックリスト</Heading>
      <p>AIにPlaywrightのテストコードを生成させると、自動待機の恩恵を活かさず、人間が書く古い癖(固定スリープ・脆いセレクタ)をそのまま再現してしまうことがあります。生成されたテストをそのままマージせず、次の観点でレビューします。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4><code>waitForTimeout</code>が入っていないか</h4><p>固定時間のスリープは、03で見た自動待機の代わりにならない。具体的な完了条件に置き換えられないか確認する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>セレクタが安定した属性を使っているか</h4><p>CSSクラス名やXPathの直書きではなく、<code>getByRole</code>・<code>getByLabel</code>など、画面のリニューアルに強い属性で要素を探しているか。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>一度だけ評価するassertになっていないか</h4><p><code>expect(await locator.textContent()).toBe(...)</code>のような、再試行しない書き方になっていないか。<code>expect(locator).toHaveText(...)</code>のWeb-First Assertionに直せないか。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>テスト同士の実行順序に依存していないか</h4><p><code>test.describe.serial</code>や、前のテストが作ったデータへの暗黙の依存がないか。<Link href="/test/e2e">独立性の原則</Link>に沿っているか。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>データがハードコードされ並列実行で衝突しないか</h4><p>固定のメールアドレスやIDを使っていないか。テストごとに一意なデータを生成しているか。</p></Card>
        <Card><CardNumber>6</CardNumber><h4>本当にE2Eで見るべき観点か</h4><p><Link href="/test/e2e/viewpoints">観点表</Link>のどの項目に対応するテストか説明できるか。Unit/Integrationで済む内容をE2Eで冗長に確認していないか。</p></Card>
      </CardGrid>

      <p>このチェックリストは、AIが生成したコードに限らず、人間が書いたテストのセルフレビューにもそのまま使えます。むしろAI生成という文脈で改めて言語化する意味は、「人間なら暗黙に避けていた癖を、AIは学習データにあった頻度でそのまま出力する」ということを踏まえ、レビューを省略しない習慣を保つことにあります。</p>

      <Heading num="まとめ">描画待機で押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>「描画完了」を画面ごとに具体的に定義する</h4><p>スピナーの消失だけでなく、最終的に表示されるべき文言・件数・URLを完了条件にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>locatorとWeb-First Assertionに乗る</h4><p>Playwrightの自動待機・自動再試行を活かし、固定スリープに頼らない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>待機したい条件を言葉にしてから書く</h4><p>「何が起きたら次に進むか」を先に言語化し、対応する<code>waitFor*</code>を選ぶ。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>AI生成テストは同じ基準でレビューする</h4><p>固定スリープ・脆いセレクタ・順序依存・データ衝突を、生成物だからと免除しない。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/e2e" tag="テスト">E2Eテストの全体像</RelatedLink>
            <RelatedLink href="/test/e2e/viewpoints" tag="テスト">テスト観点の洗い出し</RelatedLink>
            <RelatedLink href="/test/flaky" tag="テスト">フレーキーテスト</RelatedLink>
            <RelatedLink href="/test/code-review" tag="テスト">コードレビュー</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
