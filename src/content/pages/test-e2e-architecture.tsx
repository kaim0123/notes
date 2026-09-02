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

export const metadata: Metadata = { title: "E2Eテストのレイヤー設計" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>E2Eテストのレイヤー設計 ― 増えても壊れない置き場所</h1>
        <Lead>
          <Link href="/test/e2e-waiting">描画待機</Link>まででテストは書けるようになりました。ここから先は<strong>本数が増えたときにだけ現れる問題</strong>です。最初の数本は1つのファイルに全部書いても何も困りません。壊れ始めるのは数十本を超えたあたりからで、しかも壊れ方が「1つの変更で大量のテストが同時に赤くなる」という形をとります。<Term>どこに何を書くか</Term>を先に決めておくと、この壊れ方が起きなくなります。
        </Lead>
      </Hero>

      <Heading num="01">1ファイルに全部書くと、何が起きるか</Heading>
      <p>
        <Link href="/test/e2e">E2Eテストの全体像</Link>で役割ごとに分ける話に触れましたが、なぜそこまでするのかは、分けなかった場合に起きることを具体的に見たほうが早く分かります。規模も技術スタックも異なる複数のプロダクトが、独立に同じ3つの事故を報告しています。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ロケーターの散乱</h4>
          <p>同じ要素を取得するコードが何十ファイルにも重複する。画面を1つ作り直しただけで、直す箇所が数十に膨れる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>手順のコピペ</h4>
          <p>「保存して、通知が出るまで待つ」のような複数手順が、テストごとに書き写される。片方だけ直されて挙動が食い違う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>セットアップ地獄</h4>
          <p>前提データを毎回UI操作で作るため、テストが遅く、しかも途中の画面の不具合に巻き込まれて落ちる。</p>
        </Card>
      </CardGrid>

      <p>
        重要なのは、<strong>これらが「設計が下手だから起きる」のではなく、本数が増えれば必ず起きる</strong>という点です。逆にいえば、10本しかないうちから4層に分けても得るものはほとんどありません。<Term>構造は、この3つが起き始めたときに入れるもの</Term>です。
      </p>

      <Heading num="02">4つの層と、どこに書くかを決める問い</Heading>
      <p>
        層の分け方そのものより、<strong>新しいコードを書こうとしたときに置き場所が一意に決まるか</strong>のほうが大事です。層に名前を付けただけでは、結局「どちらにも書ける」状態が残ります。
      </p>

      <DiagramFrame
        slug="test-e2e-architecture-layers"
        aspect="760 / 360"
        caption="E2Eテストのコードを層に分け、書こうとしているものの性質で置き場所が一意に決まるようにした構成。左のUIを操作するテストは4層で、テスト本体はアサーションだけを持ち、そこから複数ページにまたがる業務フローを持つComposableを呼ぶ。Composableは1画面の要素取得と単純操作だけを持つPage Objectを組み立て、Page Objectは全画面で共通の土台であるBasePageを継承する。右のUIを介さないテストは2層で足りる ― 画面の知識をまったく持たないため、テスト本体がAPI Servicesを呼び、そこから直接APIとDBへ向かう。最下部が最も破られやすい規律で、アサーションを下の層に埋め込むと、何を確かめているテストなのかがテスト本体から消える。"
      />

      <p>
        判断は次の4問を上から順に当てるだけで済みます。<strong>先に当たったところが置き場所</strong>です。
      </p>

      <Steps>
        <li><strong>アサーションそのものか</strong> ― テスト本体に書く。ほかのどの層にも置かない</li>
        <li><strong>UIを介さず完結する検証・準備か</strong> ― API Servicesを使う</li>
        <li><strong>複数ページ・複数手順にまたがる業務フローか</strong> ― Composableに書く</li>
        <li><strong>1画面の中の単純な操作か</strong> ― Page Objectのメソッドにする</li>
      </Steps>

      <Aside label="4層が正解なわけではない">
        1つのディレクトリに操作関数を並べただけの薄い構成で足りているプロダクトもあります。分かれ目は<strong>今の規模で、分離のコストに見合うか</strong>だけです。数十ドメインに広がったアプリでは業務フローと画面操作を分けないと保守できませんが、機能が数個のアプリで4層に分けると、層をまたぐだけのファイルが増えて読みにくくなります。
      </Aside>

      <Heading num="03">メソッドは3種類しか作らない</Heading>
      <p>
        Page Objectが肥大化するのは、そこに<strong>何を書いてよいかの上限が決まっていない</strong>からです。作ってよいメソッドを3種類に限定すると、上限が自然に決まります。
      </p>

      <DiagramFrame
        slug="test-e2e-architecture-pom-methods"
        aspect="640 / 300"
        caption="Page Objectに作ってよいメソッドの3種類と、そこに収まらないものの行き先。取得はasyncを付けずLocatorをそのまま返すだけで、待機も操作もしない。操作はasyncで動詞から始まり、戻り値を持たず1手順だけを実行する。問い合わせはasyncで画面から読み取った値を返すが、判定そのものはテスト本体に任せる。この3つはasyncの有無と戻り値の型だけで見分けられる。ダイアログの中身によって処理を分けるような分岐を含む手順は3種類のどれでもなく、行き先はPage Objectではなく業務フローを置くComposableになる。"
      />

      <pre>
        <code>{`class OrderPage extends BasePage {
  // 1. 取得 ― asyncを付けない。Locatorを返して終わり
  statusLabel(): Locator {
    return this.page.getByTestId("order-status");
  }

  // 2. 操作 ― asyncで動詞から始める。戻り値を持たない
  async clickCancel(): Promise<void> {
    await this.page.getByRole("button", { name: "キャンセル" }).click();
  }

  // 3. 問い合わせ ― asyncで値を返す。判定はしない
  async itemCount(): Promise<number> {
    return this.page.getByTestId("order-item").count();
  }
}`}</code>
      </pre>

      <p>
        この規律の効き目は、<strong>読む側が型シグネチャだけで種類を判別できる</strong>ことにあります。<code>async</code>が付いていなければ取得、戻り値がなければ操作、値が返るなら問い合わせ ― メソッド名を読む前に分かります。
      </p>

      <p>
        破られ方はほぼ1つで、<strong>分岐を含む手順をPage Objectに置いてしまう</strong>というものです。
      </p>

      <pre>
        <code>{`// ここに置くべきではない ― 業務ロジックを含んでいる
async handlePinnedConfirmation(action: "Unpin" | "Cancel"): Promise<void> {
  // ダイアログの内容によって処理が分岐する → Composableの仕事
}`}</code>
      </pre>

      <p>
        もう1つ避けたいのが、<strong>特化しすぎたメソッド</strong>です。<code>createAndSaveCredentialForNotionApi()</code>のような名前は、そのシナリオ以外では二度と呼ばれません。汎用の小さなメソッドに分解して、組み合わせはComposable側で行います。
      </p>

      <Heading num="04">ロケーターの選び方に優先順位を持つ</Heading>
      <p>
        画面のリニューアルで壊れる範囲は、Page Objectに閉じ込めた時点で1か所に減ります。それでも<strong>その1か所が毎回壊れる</strong>なら、選び方そのものに問題があります。壊れにくさには明確な順位があります。
      </p>

      <table>
        <thead>
          <tr><th>優先</th><th>取り方</th><th>なぜその順位か</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1</td><td>役割と名前で取る(ボタン・リンク・入力欄)</td><td>利用者や支援技術が見ているものと同じ。見た目の変更で壊れない</td></tr>
          <tr><td className="hl">2</td><td>テスト用の属性で取る</td><td>役割と文言で一意に絞れないとき。コンポーネント全体を掴みたいとき</td></tr>
          <tr><td className="hl">3</td><td>プレースホルダ・ラベルで取る</td><td>フォームの入力欄。ラベルは仕様として安定していることが多い</td></tr>
          <tr><td className="hl">4</td><td>表示文字列で取る</td><td>最終手段。完全一致や順序指定で曖昧さを潰す必要がある</td></tr>
          <tr><td className="hl">5</td><td>CSSクラスで取る</td><td>外部UIライブラリで他に手段がないときだけ。内部実装に依存する</td></tr>
        </tbody>
      </table>

      <p>
        5番目が本当に最終手段であることは、実在のコードの残り方によく表れます ― 自動生成されたクラス名を掴むコードには、たいてい<code>TODO</code>コメントが添えられています。<strong>本人も直すべきだと分かっている</strong>という記録が残るわけです。
      </p>

      <Aside label="ガイドラインにするか、機械的に禁止するか">
        優先順位を文書として共有する方法と、<strong>テスト本体やComposableに生のロケーターを書くこと自体を機械的に禁止する</strong>方法があります。後者は<Link href="/test/e2e-quality">テストコードの品質を保つ</Link>で扱いますが、狙いは同じ ― ロケーターがコード全体に散らばるのを防ぐことです。
      </Aside>

      <Heading num="05">フィクスチャの寿命を、資源の重さで決める</Heading>
      <p>
        <Term>フィクスチャ</Term>は前提条件を組み立ててテストに渡す仕組みですが、設計上の論点は「何を渡すか」より<strong>いつ作って、いつ捨てるか</strong>です。用意にかかる時間が、そのまま寿命を決めます。
      </p>

      <DiagramFrame
        slug="test-e2e-architecture-fixture-scope"
        aspect="700 / 320"
        caption="テストの前提を用意するフィクスチャを、寿命の長さで3段に分けたもの。ワーカー単位は並列実行の1プロセスにつき1回だけコンテナを起動し、そのワーカーが担当する全テストで使い回す ― 起動に約20秒かかるため、テストごとに立て直すとテスト時間の大半が起動待ちになる。テスト単位は各テストが自分のデータを作って終わったら破棄する。自動適用は、明示的に呼ばなくても全テストの前後に必ず挟まる処理の置き場所。寿命を伸ばして共有した分だけ、テスト同士が干渉できる余地も増えるため、ワーカー単位のコンテナの中身を書き換えるテストは同じワーカーの他のテストを壊す。"
      />

      <p>
        さらに、<strong>必要なテストだけがコストを払う</strong>形にできます。メール受信サーバーや認証プロバイダのような追加の依存は、全テストで起動するのではなく、それを使うテストだけが宣言して起動させます。この宣言の仕組みは<Link href="/test/e2e-quality">タグ</Link>と直結しています。
      </p>

      <Aside label="自動適用は、全テストへの変更">
        呼ばなくても走るフィクスチャは便利ですが、<strong>そこを1行変えると全テストの前後処理が同時に変わります</strong>。失敗時のスクリーンショット取得のような、確実に全テストで欲しいものだけに絞るのが安全です。
      </Aside>

      <Heading num="06">準備と後片付けを、UIの外に出しきる</Heading>
      <p>
        前提データをAPIで作る話は<Link href="/test/e2e">E2Eテストの全体像</Link>で扱いました。ここで足すのは<strong>後片付け側</strong>です。作ったデータを消す処理をテストの末尾に書くと、<Term>アサーションが失敗した時点で以降が実行されず、データが残り続けます</Term>。
      </p>

      <pre>
        <code>{`test("下書きの注文は削除できる", async ({ page, request }) => {
  const order = await apiCreateOrder(request);
  try {
    // ここでアサーションが落ちても
    await expect(page.getByText(order.id)).toBeVisible();
  } finally {
    // 後片付けは必ず走る
    await apiDeleteOrder(request, order.id);
  }
});`}</code>
      </pre>

      <p>
        残ったデータは次のテストを汚し、しかも<strong>最初に落ちたテストとは別のテストが赤くなる</strong>ため、原因が非常に追いにくくなります。フィクスチャの終了処理に寄せられるなら、そちらのほうが書き忘れがありません。
      </p>

      <p>
        もう一段進めた分離もあります ― <strong>ブラウザを起動しない実行プロジェクトを別に作る</strong>方法です。HTTPを直接叩くだけのテストを同じ設定の中に混ぜず、実行の単位から分けてしまうと、並列度もタイムアウトもそれぞれに合った値を設定できます。APIだけのテストは10並列、UIを伴うテストはCPU数に応じて、といった具合です。
      </p>

      <Heading num="07">ログインを毎回やらない ― 3つの手段</Heading>
      <p>
        ほぼすべてのテストがログイン済みを前提とするため、ここは実行時間に最も効く場所です。目的は共通ですが、手段は3つに分かれます。
      </p>

      <DiagramFrame
        slug="test-e2e-architecture-auth-reuse"
        aspect="760 / 320"
        caption="ログイン処理を毎回繰り返さないための3つの手段。Aは準備専用のテストが1回だけ実際のログイン画面を通り、Cookieなどのブラウザ状態をファイルへ保存して、以降のテストがそれを読み込んだ状態で起動する方式。Bは認証APIを直接叩き、返ってきたCookieをブラウザへ注入することで、画面を開いた時点で認証済みにする方式。Cはどのロールとして動くかをテストにタグで宣言し、フィクスチャがそれを解決して該当ロールで起動する方式。どれを選んでも、テスト本体に残るのは「ログイン済みで始まる」という結果だけで、手段の違いは外に出ない。"
      />

      <table>
        <thead>
          <tr><th>手段</th><th>ログイン画面を通るか</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">状態を保存して配る</td><td>準備時に1回だけ通る</td><td>ログイン画面自体もテスト対象に含めたい</td></tr>
          <tr><td className="hl">APIでセッションを作る</td><td>一度も通らない</td><td>最速。画面側は別のテストで担保できる</td></tr>
          <tr><td className="hl">タグで宣言する</td><td>実装しだい</td><td>ロールが多く、どの権限のテストか一目で分かることが重要</td></tr>
        </tbody>
      </table>

      <Aside label="分岐点は1つ">
        <strong>ログイン画面自体をテストしたいスイートがあるか</strong>です。あるなら、状態を保存する方式にしておき、ログインをテストしたいときだけ<Term>保存済みの状態を明示的に空にして始める</Term>のが素直です。「基本はログイン済み、例外だけ手動」という形にしておかないと、例外側が後から書きにくくなります。
      </Aside>

      <Heading num="08">並列度は「何を共有しているか」で決まる</Heading>
      <p>
        <Link href="/test/e2e">並列化の粒度</Link>は速度の話でしたが、<strong>どこまで並列にしてよいか</strong>は速度では決まりません。決めるのは共有資源だけです。
      </p>

      <table>
        <thead>
          <tr><th>共有しているもの</th><th>取れる設計</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">何も共有していない</td><td>ワーカー数いっぱいまで並列にする</td></tr>
          <tr><td className="hl">一部のテストだけがファイルや外部設定を共有する</td><td>そこだけ直列の実行プロジェクトへ切り出す</td></tr>
          <tr><td className="hl">アプリ全体が1つのワークスペースを前提にしている</td><td>最初から全体を直列にする</td></tr>
          <tr><td className="hl">起動の重いコンテナを共有できる</td><td>同じ資源を要するテストを同じワーカーへ寄せる</td></tr>
        </tbody>
      </table>

      <p>
        ここで意見が割れやすいのが、<strong>テストの実行順序を固定する指定(直列宣言)を使ってよいか</strong>です。「前のテストで作ったものを次のテストが使う」書き方は、片方のプロダクトでは普通に使われ、もう片方では明確なアンチパターンとして禁止されています。
      </p>

      <Analogy label="💡 なぜ両方が正しいのか">
        もともと全体が1列で走る前提のアプリなら、テスト間に依存があっても実行モデルと矛盾しません。一方、並列実行が前提のアプリで順序に依存させると、<strong>並列の利点を打ち消したうえに、1つの失敗が後続すべてを巻き込みます</strong>。同じ書き方が、置かれた実行モデルによって自然にも危険にもなります。
      </Analogy>

      <p>
        つまり「直列宣言は良いか悪いか」という問いには単独の答えがありません。<strong>そのプロジェクトの実行モデル全体と整合しているか</strong>だけが判断材料です。判断に迷ったら、<Link href="/test/stability">テストを安定させる</Link>と同じ問いに戻ります ― このテストは、他のどのテストと同時に走っても壊れないか。
      </p>

      <Heading num="まとめ">置き場所が決まっていれば、増えても壊れない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>層は、置き場所が一意に決まって初めて意味を持つ</h4>
          <p>名前を付けるだけでは足りない。4つの問いを上から当てて、先に当たった層に書く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Page Objectのメソッドは3種類まで</h4>
          <p>取得・操作・問い合わせ。収まらないものが出たら、それはComposableの仕事。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>寿命は、用意にかかる時間で決める</h4>
          <p>重い資源ほど長く共有する。共有した分だけ干渉できる余地が増えることも同時に引き受ける。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>並列度を決めるのは共有資源だけ</h4>
          <p>速度ではない。順序への依存が許されるかも、実行モデルとの整合で決まる。</p>
        </Card>
      </CardGrid>

      <p>
        置き場所が決まると、次に効いてくるのは<strong>そこに置かれたコード自体をどう保つか</strong>です。テストが数百本に育ったとき、テストコードそのものがリファクタ不能になる ― <Link href="/test/e2e-quality">テストコードの品質を保つ</Link>へ進みます。
      </p>

      <DocsFooter href="/test/e2e-architecture" />
    </DocsPage>
  );
}
