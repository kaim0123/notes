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
  Mark,
  CodeCompare,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "純粋関数とイミュータビリティ",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Pure Function(純粋関数)", desc: "副作用がない関数" },
  { name: "Immutability(不変性)", desc: "データを変更しない" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; 関数型 &middot; パターン</Eyebrow>
        <h1>純粋関数とイミュータビリティ ― 関数型の2つの基本性質</h1>
        <Lead>
          <Link href="/design/paradigm/functional">関数型パラダイム</Link>の考え方は、実際のコードでは<Term>純粋関数</Term>と<Term>イミュータビリティ(不変性)</Term>という2つの性質として現れます。この後の<Link href="/design/paradigm/functional/composition">関数を組み合わせる</Link>以降の技法は、すべてこの2つを土台にしています。
        </Lead>
      </Hero>

      <Heading num="01">2つの基本性質</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Pure Function(純粋関数) ― 同じ入力には同じ出力</Heading>
      <p><Term>純粋関数</Term>は、①同じ引数を渡せば必ず同じ値を返し、②引数以外の外部状態を読み書きしない関数です。外部の変数を書き換えたり、DBやAPIを呼んだりする関数は、呼ぶタイミングや回数によって結果が変わりうるため純粋ではありません。</p>
      <CodeCompare
        js={`// 不純: 外部の変数を書き換えている(副作用)
let total = 0;
function addToTotal(price) {
  total += price; // 呼ぶたびにtotalの値が変わる
  return total;
}`}
        ts={`// 純粋: 引数だけから結果が決まり、外部に何も影響しない
function add(total: number, price: number): number {
  return total + price;
}`}
      />
      <p>純粋関数は入力と出力だけを確認すればテストでき、呼び出す順序や回数を気にする必要がありません。この性質を<Term>参照透過性</Term>と呼びます。</p>

      <Heading num="03">Immutability(不変性) ― 変更せず、新しい値を作る</Heading>
      <p>データを直接書き換える(<Term>ミューテーション</Term>)代わりに、変更が必要な箇所だけ新しい値を作って差し替えます。配列やオブジェクトを直接変更するメソッドを避け、新しいコピーを返す操作に置き換えるのが基本です。</p>
      <CodeCompare
        js={`// 可変: 元の配列自体を書き換えてしまう
function addItem(cart, item) {
  cart.push(item); // 呼び出し元のcartも変わってしまう
  return cart;
}`}
        ts={`// 不変: 新しい配列を作って返し、元のcartには触れない
function addItem(cart: Item[], item: Item): Item[] {
  return [...cart, item];
}`}
      />
      <p>オブジェクトの場合も同様に、スプレッド構文で新しいオブジェクトを作ります。変更が必要なプロパティだけ上書きすれば、元のオブジェクトはそのまま残ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const updated = { ...user, name: "新しい名前" }; // userは変更されない`}</code>
      </pre>

      <Heading num="04">なぜこの2つはセットで語られるか</Heading>
      <p>純粋関数は「外部状態を書き換えない」ことが条件ですが、引数として渡したオブジェクトの中身を関数内で書き換えてしまえば、呼び出し元から見て予期しない変化が起きてしまい、実質的に副作用と同じ問題を引き起こします。イミュータビリティを徹底することで、関数に渡したデータが関数の中で勝手に書き換えられる心配がなくなり、純粋関数であることが保証しやすくなります。この2つは片方だけでは効果が薄く、セットで初めて「状態がいつの間にか変わる」問題を防げます。</p>

      <Analogy label="💡 たとえるなら">
        純粋関数は「同じ材料を渡せば必ず同じ料理ができる、外の調味料に手を加えないレシピ」です。イミュータビリティは「切った野菜と切る前の野菜を別々の皿に置き、元の野菜には二度と包丁を入れない」ことに相当します。レシピ(関数)が材料(引数)そのものを変えてしまわない限り、誰が何度作っても結果は同じになります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Pure Function</h4><p>同じ入力には同じ出力。外部の状態を読み書きしない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Immutability</h4><p>データを直接変更せず、変更のたびに新しい値を作る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>2つはセット</h4><p>イミュータブルなデータを渡すことで、純粋関数であることが保証しやすくなる。</p></Card>
      </CardGrid>

      <Heading num="05">共通化の判断基準 ― 先に純粋関数か副作用かを見極める</Heading>
      <p>実務で「共通化すべきもの」を洗い出すと、認証・認可、API層、UIコンポーネント、フォーム処理、ユーティリティ、通知、ファイル処理、監査ログ、マスタデータ取得、型定義・定数など多くのカテゴリが挙がります。これらを共通化する際は、まず<Term>そのカテゴリの処理が純粋関数か副作用か</Term>を見極めることが重要です。純粋関数であれば入力と出力の確認だけでテストでき、呼び出す場所・回数・順序を気にせず自由に使い回せます。一方、副作用を持つ処理は呼び出すたびにDB・API・ファイルなど外部の状態に依存するため、テストにはモック(代役)が必要になり、業務ロジックのあちこちに直接書くと何が起きているかを追いにくくなります。</p>
      <table>
        <thead>
          <tr><th>共通化カテゴリ</th><th>性質</th><th>補足</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">認証・認可</td><td>副作用中心</td><td>ログイン・トークン検証は外部とのやり取り。ただし「この権限で操作可能か」を引数だけで判定するロジックは純粋関数に切り出せる</td></tr>
          <tr><td className="hl">API層</td><td>副作用</td><td>通信そのものが外部とのやり取り</td></tr>
          <tr><td className="hl">UIコンポーネント</td><td>混在</td><td>描画自体はDOMという外部への出力(副作用)だが、propsから見た目・並び順を決める計算ロジックは純粋関数に分離できる</td></tr>
          <tr><td className="hl">フォーム処理</td><td>混在</td><td>入力チェック(バリデーション)は純粋、送信・エラー表示は副作用</td></tr>
          <tr><td className="hl">ユーティリティ</td><td>純粋中心</td><td>日付・金額・文字列などの変換・整形はほぼ純粋関数</td></tr>
          <tr><td className="hl">通知</td><td>副作用</td><td>メール送信・Toast表示・外部サービスへの通知はすべて副作用</td></tr>
          <tr><td className="hl">ファイル処理</td><td>副作用</td><td>アップロード・ダウンロード・保存・削除は外部ストレージとのやり取り</td></tr>
          <tr><td className="hl">監査ログ</td><td>副作用</td><td>記録そのものが外部(DB・ログ基盤)への書き込み</td></tr>
          <tr><td className="hl">マスタデータ取得</td><td>混在</td><td>取得部分は副作用、取得結果を整形・変換する部分は純粋関数</td></tr>
          <tr><td className="hl">型定義・定数</td><td>対象外</td><td>実行時の処理を持たないため、純粋/副作用という軸自体が当てはまらない</td></tr>
        </tbody>
      </table>
      <p>副作用を持つ処理を共通化する場合は、関数を1つ増やすだけでなく、呼び出し側から実装を差し替えられる境界(インターフェース)を用意しておくと、テスト時にダミー実装へ差し替えやすくなります。この境界の作り方は<Link href="/design/architecture/app/data-access/patterns">Repositoryパターン</Link>ですでに扱った考え方です。</p>
      <p>これを実際のNext.jsのディレクトリ構成に落とすと、次のようになります。純粋関数はどこから呼んでも安全なので<code>lib/utils/</code>にフラットに置き、副作用を持つ処理は種類ごとにディレクトリを分けて閉じ込め、<code>app/</code>配下のServer Actionsや<code>hooks/</code>のCustom Hooksといった「入口」だけがそれらを呼び出す形にします。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`src/
├─ lib/
│  ├─ utils/           純粋関数 ― 日付・金額フォーマット、バリデーション、ソート/フィルタ
│  │  ├─ date.ts
│  │  ├─ currency.ts
│  │  └─ validation.ts
│  ├─ repositories/    副作用 ― DBアクセスを境界の内側に閉じ込める(Repositoryパターン)
│  │  └─ user-repository.ts
│  ├─ api/             副作用 ― 外部API・通知の呼び出し
│  │  └─ notify.ts
│  └─ auth/            副作用 ― ログイン・トークン検証(判定ロジック自体はutilsへ)
│     └─ session.ts
├─ hooks/              副作用 ― useEffect・DOM操作をuseから始まる関数にカプセル化
│  └─ use-users.ts
└─ app/
   └─ actions/         副作用の入口 ― Server Actionsからrepositories/apiを呼ぶ
      └─ create-user.ts`}</code>
      </pre>
      <p><code>lib/utils/</code>の中身はテストでモックが一切不要ですが、<code>lib/repositories/</code>・<code>lib/api/</code>・<code>lib/auth/</code>はテスト時にダミー実装へ差し替える対象になる、という違いがディレクトリ単位で一目で分かるようになります。</p>

      <Heading num="06">純粋関数になりやすい共通処理 ― 例外はランダム性を含むもの</Heading>
      <p>日付・金額・電話番号・郵便番号のフォーマット、ファイルサイズの表示、Base64・JSON・CSV⇔JSON・XML⇔JSON相互変換、ハッシュ化、暗号化・復号、バリデーション、引数だけで完結する権限判定、ページネーション計算、ソート・フィルタ・検索条件生成、定数取得、Enum変換、エラーメッセージ生成、URL生成 ― これらは共通処理としてよく登場しますが、いずれも「渡された引数だけから結果を計算し、外部の状態を読み書きしない」という条件を満たすため、純粋関数として実装できます。</p>
      <p>ただし同じ「ユーティリティ」に見える処理でも、<Term>UUID生成</Term>や<Term>ランダム文字列生成</Term>は純粋関数になりません。<code>crypto.randomUUID()</code>や<code>Math.random()</code>は、同じ(引数なしの)呼び出しでも呼ぶたびに異なる値を返すため、「同じ入力には同じ出力」という条件そのものを満たさないからです。これらは実行環境が持つ乱数源という外部状態を読んでいる、という意味で副作用の一種として扱います。</p>

      <Heading num="07">副作用になるもの ― 外部世界とのやり取り</Heading>
      <p>純粋関数の対義語である<Term>副作用</Term>は、関数の外にある「外部世界」とやり取りするすべての処理を指します。実務でよく登場する副作用は、次の10カテゴリに整理できます。</p>
      <table>
        <thead>
          <tr><th>カテゴリ</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データベース</td><td>CRUD・SELECT/INSERT/UPDATE/DELETE・トランザクション</td></tr>
          <tr><td className="hl">API</td><td>fetch・axios・GraphQL・RPC</td></tr>
          <tr><td className="hl">ファイル</td><td>アップロード・ダウンロード・オブジェクトストレージへの保存/削除・PDF/Excel出力</td></tr>
          <tr><td className="hl">メール</td><td>メール送信・添付ファイル送信</td></tr>
          <tr><td className="hl">通知</td><td>Push通知・Toast表示・チャットツールへの通知</td></tr>
          <tr><td className="hl">認証</td><td>ログイン・ログアウト・JWT発行・Cookie/セッション保存</td></tr>
          <tr><td className="hl">ログ</td><td>console.log・ファイルログ・DBへのログ記録</td></tr>
          <tr><td className="hl">キャッシュ</td><td>Redis・LocalStorage・SessionStorage・Cookie</td></tr>
          <tr><td className="hl">React</td><td>useEffect・DOM操作・state更新・ルーター遷移</td></tr>
          <tr><td className="hl">環境</td><td>環境変数取得・現在時刻取得・Math.random()</td></tr>
        </tbody>
      </table>
      <p>これらは呼び出すたびに結果が変わりうる、あるいは呼び出すこと自体が外部の何かを変える処理です。純粋関数のように入力と出力だけでテストすることはできず、テスト時には呼び出し先を偽物(モック・スタブ)に差し替える必要があります。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>共通化はまず分類から</h4><p>純粋関数か副作用かを先に見極めると、置き場所とテスト方法が決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>純粋関数はutilsへ</h4><p>フォーマット・変換・計算はそのまま共通のutil関数にできる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>副作用は境界の内側へ</h4><p>DB・API・ファイルなどは呼び出し側から差し替えられる境界を用意する。</p></Card>
      </CardGrid>

      <p>この2つの性質を土台に、次のページでは<code>map</code>/<code>filter</code>/<code>reduce</code>や関数合成など、実際に純粋関数を組み合わせて処理を組み立てる<Link href="/design/paradigm/functional/composition">関数を組み合わせる</Link>技法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional" tag="設計">関数型パラダイム</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional/composition" tag="設計">関数を組み合わせる</RelatedLink>
                    <RelatedLink href="/design/principles/cohesion" tag="設計">保守性の基本4原則(DRY)</RelatedLink>
                    <RelatedLink href="/design/architecture/app/data-access/patterns" tag="設計">永続化層の定石(Repository)</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">ロジックを再利用する(Custom Hooks)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
