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
  Steps,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "描画待機とAI生成テストのレビュー" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>描画待機とAI生成テストのレビュー ― 「いつ確かめるか」で結果が変わる</h1>
        <Lead>
          <Link href="/test/e2e-viewpoints">テスト観点の洗い出し</Link>で何を確かめるかは決まりました。E2Eにはもう1つ、内側の段階には存在しない論点があります ― <Term>いつ確かめるか</Term>です。画面はテストコードの実行速度と無関係なタイミングで変化するため、<strong>同じテストが、確かめる瞬間の違いだけで通ったり落ちたりします</strong>。E2Eで最も時間が溶ける論点であり、AIが生成したテストで最初に疑うべき箇所でもあります。
        </Lead>
      </Hero>

      <Heading num="01">早すぎる失敗と、早すぎる成功</Heading>
      <p>
        ボタンを押した瞬間、リクエストが飛び、応答が返り、画面が再描画され、演出が走り終わって、ようやく結果が画面に載ります。テストコードがこの途中に割り込むと、2種類の問題が起きます。
      </p>

      <DiagramFrame
        slug="test-e2e-waiting-timing"
        aspect="700 / 320"
        caption="クリックから結果が画面に載るまでの経過と、検証を置くタイミングによる違い。最も早い段階で確かめると要素がまだ無く、機能は正しいのにテストだけが落ちる(偽陰性)。1回目の再描画の直後に値を1度だけ取って確定させると、2回目の再描画で変わる内容を見逃す(偽陽性)。すべてが終わったあとに完了条件で待つのが正しい。偽陰性は落ちるので必ず誰かが気づくが、偽陽性は落ちてくれないぶん気づく機会がない。"
      />

      <p>
        <strong>厄介なのは偽陽性のほう</strong>です。偽陰性はCIを詰まらせる分かりやすい迷惑で、必ず誰かが直します。偽陽性は緑のまま実際の不具合を見逃し、しかも<Term>誰も困らないので放置されます</Term>。待機の設計を軽視するとテストの信頼性そのものが揺らぐのは、この非対称性のためです。
      </p>

      <Heading num="02">「描画完了」を単純に考えすぎない</Heading>
      <p>
        「ローディング表示が消えたら完了」で済む画面は、実務では少数派です。待機できているつもりで抜けやすい典型を挙げます。
      </p>

      <table>
        <thead>
          <tr><th>パターン</th><th>見落としの中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スケルトンへの差し替え</td><td>読み込み表示が消えた=本体表示、ではない。骨組みに差し替わっただけで実データはまだ来ていない</td></tr>
          <tr><td className="hl">数秒で消える通知</td><td>自動的に消えるため、確かめるタイミングがずれると「出たこと」自体を捉えられない</td></tr>
          <tr><td className="hl">移動アニメーション中のクリック</td><td>要素はDOMにあり表示もされているが、動いている最中なので座標がずれる</td></tr>
          <tr><td className="hl">多段の再描画</td><td>非同期処理が複数回に分けて状態を更新し、1回目で確かめて2回目以降を見逃す</td></tr>
          <tr><td className="hl">遷移直後の古いDOM</td><td>前の画面の要素がまだ残っており、意図と違う要素に一致してしまう</td></tr>
          <tr><td className="hl">入力から遅れて走る検索</td><td>数百ミリ秒後に検索が走る設計では、入力直後に確かめると前回の結果を見る</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        「読み込み表示が消えた」で完了とみなすのは、<strong>レジの行列が動き出したのを見て「会計が終わった」と判断する</strong>ようなものです。まだ袋詰めの途中かもしれません。何が起きたら本当に完了なのかを、画面ごとに具体的な最終状態(表示される文言・件数・URL)として決める必要があります。
      </Analogy>

      <Heading num="03">自動待機を理解しているかが分岐点</Heading>
      <p>
        近年のE2Eツールは、要素を操作・検証する前に条件を満たすまで<strong>自動的に繰り返し確認して待つ</strong>仕組みを標準で持っています。この仕組みを理解しているかどうかが、フレーキーテストを量産するチームとそうでないチームを分けます。
      </p>

      <table>
        <thead>
          <tr><th>自動で確認される条件</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DOMに存在する</td><td>要素そのものが現れている</td></tr>
          <tr><td className="hl">表示されている</td><td>非表示指定になっていない</td></tr>
          <tr><td className="hl">位置が安定している</td><td>アニメーション中でない</td></tr>
          <tr><td className="hl">操作を受け付ける</td><td>無効化されておらず、入力できる</td></tr>
          <tr><td className="hl">イベントが届く</td><td>他の要素に覆われていない</td></tr>
        </tbody>
      </table>

      <p>
        さらに、要素そのものを渡す形の検証は<strong>条件が満たされるまで繰り返し評価されます</strong>。前節で挙げた「多段の再描画」の多くは、実はこれだけで解決します。
      </p>

      <pre>
        <code>{`// 良い例 ― 要素を渡す。条件が満たされるまで自動的に再試行される
await expect(page.getByRole("status")).toHaveText("キャンセル済み");

// 悪い例 ― その瞬間の文字列を1回だけ取っている
// 再描画前の値を掴んで失敗する(あるいは、掴んだまま緑になる)
const text = await page.getByRole("status").textContent();
expect(text).toBe("キャンセル済み");`}</code>
      </pre>

      <p>
        この違いを知らないと、「たまに落ちる」に遭遇したときの対処が<strong>「固定時間のスリープを足す」という誤った方向</strong>に向かいます。
      </p>

      <Heading num="04">固定スリープが、どちらの意味でも間違っている理由</Heading>

      <DiagramFrame
        slug="test-e2e-waiting-sleep"
        aspect="640 / 310"
        caption="固定時間のスリープと条件待ちを、速い環境と遅い環境の両方で比べたもの。3秒の固定スリープは、速い環境では0.4秒で終わっているのに3秒まで待って2.6秒を無駄にし、遅い環境では処理に4.2秒かかるため待ち足りずに落ちる。条件待ちは、速い環境では0.4秒で先へ進み、遅い環境では4.2秒まで待つ。必要な分だけ待ち、環境の速さに左右されない。"
      />

      <p>
        自動待機で足りない場面は確かにあります。そのときも、<strong>固定時間ではなく「何が起きるまで待つか」を条件として書きます</strong>。
      </p>

      <Steps>
        <li><strong>特定の通信の完了を待つ</strong> ― 対象のリクエストが終わったことそのものを条件にする。「3秒待てば終わっているはず」という推測をやめられる</li>
        <li><strong>アプリ側の完了の印を待つ</strong> ― 読み込み完了を示すデータ属性をアプリ側に用意し、それが付くのを待つ。テスト容易性のための小さな実装協力を検討する</li>
        <li><strong>「通信が落ち着いたら」に頼らない</strong> ― 定期的な通信を行う画面では通信が途切れず、意図した意味で落ち着かない。ページ全体ではなく個別の要素・応答を条件にする</li>
      </Steps>

      <Aside label="判断の合言葉">
        <strong>「何が起きたら次に進んでよいか」を先に言葉にできるか</strong>を自問します。言葉にできれば、それに対応する待機の書き方が必ず存在します。「とりあえず数秒待てば」としか言えないときは、まだ完了条件の分析が終わっていないサインです。
      </Aside>

      <Heading num="05">AIが生成したテストのレビュー</Heading>
      <p>
        AIにE2Eのテストコードを生成させると、自動待機の恩恵を活かさず、<strong>人間が書いてきた古い癖 ― 固定スリープ、脆いセレクタ ― をそのまま再現する</strong>ことがあります。学習データにあった頻度で出力されるので、これは避けられません。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>固定スリープが入っていないか</h4>
          <p>具体的な完了条件に置き換えられないか確認する。ほとんどの場合、置き換えられる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>セレクタが安定した属性か</h4>
          <p>CSSクラス名やパスの直書きではなく、役割やラベルで要素を探しているか。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>一度だけ評価する検証でないか</h4>
          <p>値を取り出してから比べる書き方は再試行されない。要素を渡す形に直せないか。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>実行順序に依存していないか</h4>
          <p>直列実行の指定や、前のテストが作ったデータへの暗黙の依存がないか。</p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>データが固定値で衝突しないか</h4>
          <p>固定のメールアドレスやIDを使っていないか。並列実行で必ず衝突する。</p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>本当にE2Eで見る観点か</h4>
          <p><Link href="/test/e2e-viewpoints">観点表</Link>のどの項目に対応するか説明できるか。内側で済む内容を重ねていないか。</p>
        </Card>
      </CardGrid>

      <p>
        このチェックリストはAI生成に限らず、人間が書いたテストの自己点検にもそのまま使えます。<strong>AI生成という文脈で改めて言語化する意味は、レビューを省略しない習慣を保つこと</strong>にあります。生成が速いほど、通す前の目が要ります ― <Link href="/test/code-review">コードレビュー</Link>で扱う「自動チェックに任せる部分と人が見る部分」の切り分けが、ここでも効いてきます。
      </p>

      <Heading num="まとめ">完了条件を、言葉にできるか</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>危険なのは偽陽性</h4>
          <p>早すぎる失敗は誰かが直す。早すぎる成功は誰も困らないので残る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>完了を画面ごとに定義する</h4>
          <p>読み込み表示の消失ではなく、最終的に出るべき文言・件数・URLを条件にする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>固定スリープは両方向に間違い</h4>
          <p>速い環境では無駄、遅い環境では足りない。条件で待つ。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>生成が速いほど、通す前の目が要る</h4>
          <p>古い癖は学習データにあった頻度でそのまま出力される。</p>
        </Card>
      </CardGrid>

      <p>
        段階の話の締めくくりに、これらを実際に動かす道具を見ます。<Link href="/test/tools">Vitest・Playwright</Link>へ進みます。
      </p>

      <DocsFooter href="/test/e2e-waiting" />
    </DocsPage>
  );
}
