import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "副作用(Effects)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>副作用(Effects) ― 外の世界と同期し続ける</h1>
        <Lead>
          描画は<Link href="/frontend/react-functional">純粋</Link>であるべきですが、実際のアプリはサーバー通信・購読・タイマーといった外の世界に触れないと動きません。この純粋でない処理を描画本体から切り離して置く場所が<code>useEffect</code>です。最初に押さえるべきは使い方ではなく、<Term>そもそもEffectが要るのか</Term>の見極めです。
        </Lead>
      </Hero>

      <Heading num="01">Effectは「同期」のための仕組み</Heading>
      <p>
        Effectを「描画のあとに走る処理」と覚えると、使いどころを誤ります。正しくは<Term>コンポーネントの状態と、外部システムの状態を一致させ続ける</Term>ための仕組みです。「この画面が表示されている間だけ、あるチャットルームに接続する」― これがEffectの典型です。
      </p>
      <p>
        この見方に立つと、後始末が必須である理由も自明になります。<Term>同期を始めたなら、終わらせるところまでが1組</Term>です。
      </p>

      <Heading num="02">依存配列</Heading>
      <p>
        <code>useEffect</code>は「実行したい処理」と<Term>依存配列</Term>を受け取ります。並べた値のどれかが前回と変わったときだけ、再実行されます。
      </p>

      <table>
        <thead>
          <tr><th>依存配列</th><th>実行タイミング</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>[]</code></td><td>初回のみ</td></tr>
          <tr><td className="hl"><code>[a, b]</code></td><td>aまたはbが変わったとき</td></tr>
          <tr><td className="hl">省略</td><td>毎回の描画後(多くの場合バグの元)</td></tr>
        </tbody>
      </table>

      <p>
        Effectの中で読んだpropsやstateは、<Term>すべて依存配列に入れる</Term>のが原則です。入れ忘れると、Effectが古い値を握ったまま更新されないバグになります。静的解析がこの入れ忘れを警告してくれますが、<Term>警告を消すために配列から削ってはいけません</Term>。「なぜその値が要らないと言えるのか」に答えられないなら、設計のほうを直します。
      </p>

      <Heading num="03">クリーンアップ ― 始めたら終わらせる</Heading>
      <p>
        購読・タイマー・接続のように「始めたら終わらせる」必要がある処理では、Effectから後始末の関数を返します。これは<Term>次に再実行される前</Term>と、<Term>コンポーネントが消えるとき</Term>に呼ばれます。
      </p>

      <DiagramFrame
        slug="frontend-react-effect-lifecycle"
        aspect="640 / 300"
        caption="Effectの実行と後始末の流れを時間軸で示した図。最初の描画のあとにEffectが実行され、外部との同期が始まる。依存配列の値が変わると、まず前回の同期を止める後始末が呼ばれ、そのあとで新しい値による同期が始まる。コンポーネントが画面から消えるときにも後始末が呼ばれ、同期が止まる。後始末を書き忘れると、依存が変わるたびに古い同期が残り続け、接続やタイマーが積み上がっていく。開発時の二重実行は、この書き忘れを早期に発見させるための仕組みである。"
      />

      <pre>
        <code>{`useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);   // 後始末
}, []);

// データ取得は中断可能にしておく
useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal }).then(/* ... */);
  return () => ctrl.abort();           // 途中で離れたら中断
}, [url]);`}</code>
      </pre>

      <p>
        2つ目の例は、後始末が<Term>正しさのために必要</Term>な場面です。<code>url</code>が短時間に2回変わると2つのリクエストが飛び、遅いほうが後に届けば<Term>古い結果が新しい結果を上書きします</Term>。中断はこの順序逆転を防ぎます。
      </p>

      <Heading num="04">Effectかイベントハンドラか</Heading>
      <p>
        最も多い誤りが「副作用は全部Effect」という思い込みです。判断の軸は<Term>きっかけ</Term>にあります。
      </p>

      <table>
        <thead>
          <tr><th>処理</th><th>置き場所</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">送信ボタンで登録する</td><td>イベントハンドラ</td><td>ユーザー操作が起点</td></tr>
          <tr><td className="hl">表示中だけ通知を購読する</td><td>Effect</td><td>表示という状態との同期</td></tr>
          <tr><td className="hl">選択中のタブに応じてデータを取る</td><td>Effect</td><td>状態と外部の同期</td></tr>
          <tr><td className="hl">クリックで解析イベントを送る</td><td>イベントハンドラ</td><td>操作そのものが記録対象</td></tr>
        </tbody>
      </table>

      <p>
        見分け方はもう1つあります。<Term>その処理は、同じ状態で再表示されたときにもう一度起きてほしいか</Term>。購読なら「はい」、購入の確定なら「いいえ」です。「いいえ」ならEffectに置いてはいけません。
      </p>

      <Heading num="05">要らないEffectを見分ける</Heading>
      <p>
        書かれているEffectの多くは、そもそも不要です。代表的な3つを潰すだけで、コードは大きく単純になります。
      </p>

      <table>
        <thead>
          <tr><th>よくあるEffect</th><th>本当は</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">他のstateから計算した値をstateに入れる</td><td>描画中に計算すればよい ― 状態を増やさない</td></tr>
          <tr><td className="hl">propsが変わったらstateをリセットする</td><td><code>key</code>を変えて作り直させる</td></tr>
          <tr><td className="hl">操作の結果を親に通知する</td><td>イベントハンドラの中で呼べばよい</td></tr>
        </tbody>
      </table>

      <p>
        1つ目は特に頻出です。Effect → 状態更新 → 再描画 → Effect…という無駄な往復が生まれ、しかも<Term>一瞬だけ古い値が表示されます</Term>。計算で導ける値は<Link href="/frontend/react-state">描画中に計算する</Link>のが正解です。
      </p>

      <Heading num="06">データ取得の難しさ</Heading>
      <p>
        Effectでのデータ取得は、素朴に書くと次の課題を全部抱え込みます。
      </p>

      <Steps>
        <li>同じデータを複数の場所が別々に取りに行く(重複)</li>
        <li>速い応答と遅い応答が入れ替わる(順序逆転)</li>
        <li>画面を離れて戻るたびに取り直す(キャッシュ不在)</li>
        <li>読み込み中とエラーの状態を各所で複製する</li>
      </Steps>

      <p>
        どれも自分で解けますが、<Term>毎回解くには重すぎる</Term>問題です。実務では<Link href="/frontend/state">サーバー状態</Link>を扱う専用の層に任せるか、サーバー側で取得してしまうのが定石になります。「Effectでfetch」は学習用の形と割り切るのが健全です。
      </p>

      <Heading num="07">描画前に行いたい処理と、二重実行</Heading>
      <p>
        ほとんどは<code>useEffect</code>で足ります。DOMのサイズを測ってから位置を微調整するなど、<Term>画面に見える前に</Term>同期的に行いたい処理だけ、描画をブロックする種類のものを使います。ちらつきは防げますが、その分だけ表示が遅れます。
      </p>
      <p>
        開発時、Effectは「実行 → 後始末 → 再実行」と<Term>二重に走ります</Term>。これは後始末の書き忘れを炙り出すためのテストです。正しく書いていれば、二重実行でも購読が重複したりしません。<Term>二重実行で壊れるなら、それは後始末が足りていない</Term>という診断そのものです。
      </p>

      <Analogy label="💡 たとえるなら">
        イベントハンドラは「客がボタンを押したから動く自動販売機」、Effectは「開店している間ずっと外気温に合わせて空調を保つ仕組み」です。前者には操作という明確なきっかけがあり、後者は開いている状態そのものと外界を同期し続けます。そして空調は閉店時に必ず切る ― これが後始末です。切り忘れれば、店を閉じても空調は回り続けます。
      </Analogy>

      <Heading num="まとめ">同期と後始末で1組</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Effectは同期の仕組み</h4>
          <p>「描画後に走る処理」ではない。状態と外部を一致させ続けるもの。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>始めたら終わらせる</h4>
          <p>後始末は行儀の問題ではなく、順序逆転や積み上がりを防ぐ正しさの問題。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>まず要るかを疑う</h4>
          <p>計算・リセット・通知 ― 書かれているEffectの多くは不要。</p>
        </Card>
      </CardGrid>

      <p>
        Effectと並ぶもう1つの脱出口 ― 再描画を起こさずに値やDOMへ触れる<Link href="/frontend/react-ref">Ref</Link>を次に見ます。
      </p>

      <DocsFooter href="/frontend/react-effects" />
    </DocsPage>
  );
}
