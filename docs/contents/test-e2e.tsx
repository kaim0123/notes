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
  title: "E2Eテストの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>E2Eテストの全体像 ― ユーザーの動線を、ユーザーと同じ経路で確認する</h1>
        <Lead>
          <Link href="/test/unit">Unitテスト</Link>や<Link href="/test/integration">Integrationテスト</Link>がどれだけ充実していても、「ログインボタンの位置がずれてクリックできない」「画面遷移の途中で読み込みが終わらない」といった不具合は、実際にブラウザを操作しない限り見つかりません。<Term>E2E(End to End)テスト</Term>は、ユーザーが実際にたどる操作を、実際のブラウザ上で再現する層です。この章では、E2Eテストを実際のプロジェクトでどう組み立てるか ― ディレクトリ構成・設計パターン・実行の速さと安定性 ― という実務側を扱います。「何をテストすべきか(観点)」は次の<Link href="/test/e2e/viewpoints">テスト観点の洗い出し</Link>で扱います。
        </Lead>
      </Hero>

      <Heading num="01">なぜテストピラミッドの頂点は薄くするのか</Heading>
      <p>E2Eテストは最も「本物」に近く信頼性の高いテストですが、その分コストも高くつきます。ブラウザの起動や画面遷移が挟まるため実行が遅く、ネットワークの遅延やアニメーションのタイミングに左右されて<Term>フレーキー(不安定)</Term>になりやすく、失敗したときの原因調査も「どこで止まったか」から追う必要があり時間がかかります。だからこそ、業務上重要な代表的な動線(会員登録からログイン、購入完了まで、など)に絞り込み、細かい分岐やエッジケースは<Link href="/test/unit">Unit</Link>・<Link href="/test/integration">Integration</Link>に任せるのがテストピラミッドの考え方です。</p>

      <Heading num="02">一般的なディレクトリ構成 ― どこに何を置くか</Heading>
      <p>E2Eテストのコードは「テスト本体」「画面の知識」「実行前の下準備」「実行環境の設定」という役割が混ざりやすく、1つのファイルに詰め込むとすぐに肥大化します。Playwrightプロジェクトで広く採用される構成は、この役割ごとにディレクトリを分けるものです。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`e2e/
├── playwright.config.ts       # ブラウザ・並列数・リトライ等の実行設定
├── global-setup.ts            # 全テスト開始前に1回だけ動く準備(認証状態の作成など)
├── fixtures/                  # test.extend で組み立てる独自のテスト関数
│   ├── auth.fixture.ts        #   例: ログイン済みのpageを渡すfixture
│   └── seeded-order.fixture.ts#   例: 注文データを用意済みのpageを渡すfixture
├── pages/                     # ページオブジェクト(画面の構造の知識)
│   ├── login-page.ts
│   └── checkout-page.ts
├── support/                   # APIでの状態設定やデータ生成など、UI操作を介さないヘルパー
│   ├── api-client.ts
│   └── build-order.ts
└── tests/                     # テスト本体。機能単位のディレクトリに分割
    ├── auth/
    │   ├── login.spec.ts
    │   └── logout.spec.ts
    └── checkout/
        ├── happy-path.spec.ts      # 観点: ハッピーパス
        ├── validation.spec.ts      # 観点: バリデーション
        └── cancel-concurrency.spec.ts # 観点: 排他制御`}</code>
      </pre>

      <p>ポイントは、<code>tests/</code>配下は「何を確認するテストか」だけに専念させ、「どうやって画面を操作するか」は<code>pages/</code>のページオブジェクトへ、「どうやって初期データを作るか」は<code>support/</code>のAPIヘルパーへ追い出すことです。<code>tests/</code>のファイル名を観点(ハッピーパス・バリデーション・排他制御など)に対応させておくと、<Link href="/test/e2e/viewpoints">観点表・項目表</Link>とテストコードの対応が一目で分かるようになります。</p>

      <Heading num="03">ページオブジェクトパターン ― 画面の構造をテストコードから切り離す</Heading>
      <p>E2Eテストのコードに、CSSセレクタやボタンの文言を直接書き並べていくと、画面のちょっとしたリニューアルのたびに大量のテストが壊れてしまいます。<Term>ページオブジェクトパターン</Term>は、「この画面にはこういう要素があり、こう操作できる」という画面の構造を専用のクラス(ページオブジェクト)にまとめ、テストコード自体はそのページオブジェクトのメソッドを呼ぶだけにする設計です。</p>

      <Analogy label="💡 たとえるなら">
        ページオブジェクトパターンは「案内係」を挟むようなものです。お客(テストコード)は「ログインボタンを押して」と案内係(ページオブジェクト)に頼むだけで、実際にどのセレクタのどのボタンを押すかは案内係が知っています。ボタンの見た目や場所が変わっても、案内係の中身を直すだけで、お客側の指示の仕方は変わりません。
      </Analogy>

      <p>この構造にしておくと、画面のマークアップが変わった際の修正箇所がページオブジェクト1箇所に閉じ込められ、同じ画面を使う複数のテストコードを直さずに済みます。ページオブジェクトを素直に積み上げるだけでなく、「ログイン済みの<code>page</code>を渡す」「注文データが1件ある状態の<code>page</code>を渡す」といった<strong>前提条件そのもの</strong>をPlaywrightの<code>test.extend</code>による<Term>fixture</Term>として用意しておくと、個々のテストの冒頭が「ログインして、商品をカートに入れて…」という手順の羅列にならず、確認したいことだけが残ります。</p>

      <Heading num="04">テストの分割と並列実行 ― 速く、CIを詰まらせずに</Heading>
      <p>E2Eテストは1件あたりの実行が重いため、件数が増えるとCIの実行時間がそのまま伸びます。Playwrightは複数の粒度で並列化の仕組みを持っており、これらを組み合わせて実行時間を抑えます。</p>

      <table>
        <thead>
          <tr><th>粒度</th><th>仕組み</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ワーカー並列</td><td><code>workers</code>設定でテストファイルを複数プロセスに分散</td><td>1台のマシン上でファイル単位を並列に走らせる基本形</td></tr>
          <tr><td className="hl"><code>fullyParallel</code></td><td>同一ファイル内の<code>test</code>もワーカー間に分散</td><td>ファイルが少なくテスト件数が多い場合に有効</td></tr>
          <tr><td className="hl">projects</td><td>Chromium/Firefox/WebKitなど実行対象の掛け合わせを定義</td><td>「主要フローだけ3ブラウザ」「残りはChromiumのみ」の絞り込み</td></tr>
          <tr><td className="hl">シャーディング</td><td><code>--shard=2/4</code>のようにCI側で複数マシンに分割</td><td>ワーカー並列だけでは追いつかない件数を、マシンをまたいで分散</td></tr>
        </tbody>
      </table>

      <p>並列化の効果を引き出すには、テストファイルの分け方そのものも重要です。1つの巨大な<code>spec.ts</code>にすべての観点を詰め込むと、そのファイルが1ワーカーに固定され並列化の恩恵を受けられません。機能単位・観点単位(ハッピーパス/バリデーション/排他制御)でファイルを分けておくことが、そのままワーカーへの分散単位になります。</p>

      <Aside label="分割の判断基準">
        「実行時間を減らすための分割」と「読みやすさのための分割」は同じ基準になることが多いです。1ファイル1機能、1ファイル内は同じ観点に絞るという分け方をしておけば、並列実行にも人間のレビューにも都合が良くなります。
      </Aside>

      <Heading num="05">テストの独立性確保 ― 並列実行しても壊れない設計</Heading>
      <p>並列実行や実行順序のランダム化をした瞬間に壊れるテストは、たいてい「他のテストと何かを共有している」ことが原因です。E2Eで独立性を保つために押さえておきたい設計は次の3点です。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ブラウザコンテキストを共有しない</h4><p>Playwrightはテストごとに新しいブラウザコンテキスト(独立したCookie・LocalStorage)を割り当てるのが既定です。<code>test.describe.serial</code>で前のテストの状態に依存する書き方は、この独立性を自ら手放す行為だと理解しておきます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>固定の識別子を使わない</h4><p>「test@example.com」のような固定メールアドレスを複数のテストで使うと、並列実行時に「すでに登録済みです」のようなエラーで衝突します。UUIDやワーカーIDを混ぜた識別子をテストごとに生成します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>共有の管理者アカウントを操作しない</h4><p>唯一の管理者アカウントの設定値を複数のテストが書き換えると、実行順序によって結果が変わります。操作対象が「唯一」であることが分かっている資源は、テストごとに専用のものを用意します。</p></Card>
      </CardGrid>

      <p>裏を返すと、「このテストは他のどのテストが先に(あるいは後に)実行されても結果が変わらないか」を自問することが、独立性のチェック方法そのものになります。</p>

      <Heading num="06">APIによる状態設定と外部依存の割り切り</Heading>
      <p>E2Eテストは実際のシステム全体(場合によってはDBや外部連携も含む)を通して動くため、どんなデータを・どうやって用意するかが結果を大きく左右します。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>実行前にAPIでデータを作る</h4><p>画面操作でデータを用意すると時間がかかり、途中の画面の不具合にテストが引きずられます。テスト対象の画面操作より前の段階(ログイン後の初期データなど)はAPIを直接叩いて素早く準備します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>テストごとに専用のアカウント・データを使う</h4><p>複数のテストが同じデータを共有すると、並列実行時にデータの奪い合いが起きます。テストごとに固有のユーザーやレコードを用意し、独立性を保ちます。</p></Card>
      </CardGrid>

      <p>Playwrightでは、<code>request</code>フィクスチャ(<code>APIRequestContext</code>)を使うとブラウザを起動せずにHTTPリクエストだけを送れます。「注文を1件作った状態から始めたい」テストであれば、UIで商品を選んでカートに入れて…と再現するのではなく、<code>{`request.post("/api/orders", { data: { ... } })`}</code>で直接データを作り、テスト本体は確認したい操作だけに集中させます。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`test("発送前の注文はキャンセルできる", async ({ page, request }) => {
  // Arrange: UIを介さずAPIで前提状態を作る
  const order = await request
    .post("/api/orders", { data: { items: [{ sku: "A-1", qty: 1 }] } })
    .then((res) => res.json());

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.gotoOrder(order.id);

  // Act & Assert: 確認したい操作だけをUIで行う
  await checkoutPage.cancel();
  await expect(checkoutPage.status).toHaveText("キャンセル済み");
});`}</code>
      </pre>

      <p>一方で、境界の外側にある依存はすべて本物を使うわけにはいきません。<Link href="/test/unit">Unitテスト</Link>の章で扱った<Term>テストダブル</Term>(スタブ・モック)は、E2Eでも境界を見極めるために使います。</p>

      <table>
        <thead>
          <tr><th>対象</th><th>本物を使うか</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自社のフロントエンド・API・DB</td><td>本物(テスト用)</td><td>これ自体がテスト対象、または実際の保存・取得の挙動を確認するため</td></tr>
          <tr><td className="hl">外部の決済・課金API</td><td>モック</td><td>実際に課金・請求が発生してしまうため</td></tr>
          <tr><td className="hl">メール送信</td><td>モックまたはテスト用受信箱</td><td>実際のメール配信基盤を消費しないため</td></tr>
        </tbody>
      </table>

      <Aside label="判断の合言葉">
        「本物を使うことで初めて意味のある確認ができるか」「本物を使うと副作用(課金・外部送信・不可逆な変更)が発生するか」の2点で判断します。前者ならなるべく本物、後者ならモックに倒すのが基本方針です。
      </Aside>

      <Heading num="07">テストコンテナモデルとは ― 実行環境そのものを使い捨てにする</Heading>
      <p>「テスト用DB」を1つだけ用意して全テストで共有すると、結局05で見た独立性の問題に戻ってきます。<Term>テストコンテナモデル(Testcontainers)</Term>は、DBやメッセージキューのような依存先を、テスト実行のたびにDockerコンテナとして立ち上げて使い、終わったら破棄するという考え方です。</p>

      <Analogy label="💡 たとえるなら">
        共有のテスト用DBは「みんなで使う会議室のホワイトボード」に似ています。誰かが書いた内容を消し忘れると次に使う人が困ります。テストコンテナモデルは、使うたびに新しい使い捨てのホワイトボードを配って、終わったら丸ごと処分するようなものです。前の利用者の書き込みを気にする必要が最初からありません。
      </Analogy>

      <p>Playwright自体はブラウザの自動操作を担うツールであり、DBコンテナの起動は<code>testcontainers</code>のようなライブラリと<code>global-setup.ts</code>を組み合わせて行います。CI環境と開発者のローカル環境で「同じバージョンの同じDBが、同じ初期状態で立ち上がる」ことが保証されるため、「自分の環境では通るのにCIでは失敗する」という食い違いが減ります。並列実行・独立性・状態設定という04〜06の課題を、実行環境のレベルでまとめて解決する手段だと捉えると位置づけが分かりやすくなります。</p>

      <Steps>
        <li><strong>ワーカーごとにコンテナを分ける</strong>ワーカー並列実行と組み合わせるときは、DBコンテナ自体もワーカーごとに1つ立ち上げるか、ワーカーごとにスキーマを分けます。1つのコンテナを全ワーカーで共有すると、結局データの奪い合いに戻ります。</li>
        <li><strong>起動コストを許容できる範囲に抑える</strong>コンテナの起動には数秒かかります。テストファイル単位ではなく<code>global-setup.ts</code>やワーカー単位でまとめて起動し、頻度を抑えます。</li>
      </Steps>

      <Heading num="まとめ">E2Eテストの実行基盤で押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割ごとにディレクトリを分ける</h4><p>テスト本体・画面の知識・データ準備・実行設定を混在させず、観点表との対応が見える構成にします。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>画面構造をページオブジェクトに閉じ込める</h4><p>リニューアルのたびにテストコード全体が壊れる事態を防ぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分割の単位が並列実行の単位になる</h4><p>機能・観点でファイルを分けることが、そのままワーカー分散の粒度になります。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>他のテストと何も共有しない</h4><p>識別子・アカウント・実行順序への依存をなくし、並列実行でも結果が変わらないようにします。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>境界の外側は割り切ってモックする</h4><p>課金や外部送信が絡む境界だけ、意図的に本物を避けます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/e2e/viewpoints" tag="テスト">テスト観点の洗い出し</RelatedLink>
            <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
            <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
            <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
            <RelatedLink href="/dev/backend/test" tag="開発">APIのテスト</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
