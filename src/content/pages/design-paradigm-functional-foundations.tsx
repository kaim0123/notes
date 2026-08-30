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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "純粋関数とイミュータビリティ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>純粋関数とイミュータビリティ ― 関数型の2つの基本性質</h1>
        <Lead>
          <Link href="/design/paradigm-functional">関数型パラダイム</Link>の考え方は、実際のコードでは<Term>純粋関数</Term>と<Term>イミュータビリティ(不変性)</Term>という2つの性質として現れます。<Link href="/design/paradigm-functional-composition">関数を組み合わせる</Link>以降の技法は、すべてこの2つを土台にしています。
        </Lead>
      </Hero>

      <Heading num="01">純粋関数 ― 同じ入力には同じ出力</Heading>
      <p>
        <Term>純粋関数</Term>は、①同じ引数を渡せば必ず同じ値を返し、②引数以外の外部状態を読み書きしない関数です。外部の変数を書き換えたり、DBやAPIを呼んだりする関数は、呼ぶタイミングや回数によって結果が変わりうるため純粋ではありません。
      </p>
      <p>
        <strong>不純な例</strong> ― 外部の変数を書き換えている(副作用)。
      </p>
      <pre>
        <code>{`let total = 0;
function addToTotal(price) {
  total += price; // 呼ぶたびに total の値が変わる
  return total;
}`}</code>
      </pre>
      <p>
        <strong>純粋な例</strong> ― 引数だけから結果が決まり、外部に何も影響しない。
      </p>
      <pre>
        <code>{`function add(total: number, price: number): number {
  return total + price;
}`}</code>
      </pre>
      <p>
        純粋関数は入力と出力だけを確認すればテストでき、呼び出す順序や回数を気にする必要がありません。この性質を<Term>参照透過性</Term>と呼びます。
      </p>

      <Heading num="02">イミュータビリティ ― 変更せず、新しい値を作る</Heading>
      <p>
        データを直接書き換える(<Term>ミューテーション</Term>)代わりに、変更が必要な箇所だけ新しい値を作って差し替えます。配列やオブジェクトを直接変更するメソッドを避け、新しいコピーを返す操作に置き換えるのが基本です。
      </p>
      <p>
        <strong>可変な例</strong> ― 呼び出し元の配列まで書き換わってしまう。
      </p>
      <pre>
        <code>{`function addItem(cart, item) {
  cart.push(item); // 呼び出し元の cart も変わる
  return cart;
}`}</code>
      </pre>
      <p>
        <strong>不変な例</strong> ― 新しい配列を作って返し、元の配列には触れない。
      </p>
      <pre>
        <code>{`function addItem(cart: Item[], item: Item): Item[] {
  return [...cart, item];
}

// オブジェクトも同様に、変更したいプロパティだけ上書きする
const updated = { ...user, name: "新しい名前" }; // user は変更されない`}</code>
      </pre>

      <Heading num="03">なぜこの2つはセットで語られるか</Heading>
      <p>
        純粋関数は「外部状態を書き換えない」ことが条件ですが、引数として渡されたオブジェクトの中身を関数内で書き換えてしまえば、呼び出し元から見て予期しない変化が起き、実質的に副作用と同じ問題になります。イミュータビリティを徹底することで、渡したデータが関数の中で勝手に書き換えられる心配がなくなり、純粋であることが保証しやすくなります。この2つは片方だけでは効果が薄く、セットで初めて「状態がいつの間にか変わる」問題を防げます。
      </p>

      <Analogy label="💡 たとえるなら">
        純粋関数は「同じ材料を渡せば必ず同じ料理ができ、外の調味料に手を加えないレシピ」です。イミュータビリティは「切った野菜と切る前の野菜を別々の皿に置き、元の野菜には二度と包丁を入れない」ことに相当します。レシピ(関数)が材料(引数)そのものを変えてしまわない限り、誰が何度作っても結果は同じになります。
      </Analogy>

      <Heading num="04">共通化するときは、まず純粋か副作用かを見極める</Heading>
      <p>
        実務で共通化の候補を洗い出すと、認証・API層・UIコンポーネント・フォーム処理・ユーティリティ・通知・ファイル処理など多くのカテゴリが挙がります。共通化する際は、まず<Term>その処理が純粋関数か副作用か</Term>を見極めることが重要です。純粋なら入力と出力の確認だけでテストでき、呼び出す場所・回数・順序を気にせず使い回せます。副作用を持つ処理は外部の状態に依存するため、テストにはモック(代役)が必要で、業務ロジックのあちこちに直接書くと何が起きているかを追いにくくなります。
      </p>

      <table>
        <thead>
          <tr>
            <th>共通化カテゴリ</th>
            <th>性質</th>
            <th>補足</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">認証・認可</td>
            <td>副作用中心</td>
            <td>ログイン・トークン検証は外部とのやり取り。ただし「この権限で操作可能か」を引数だけで判定する部分は純粋関数に切り出せる</td>
          </tr>
          <tr>
            <td className="hl">API層</td>
            <td>副作用</td>
            <td>通信そのものが外部とのやり取り</td>
          </tr>
          <tr>
            <td className="hl">UIコンポーネント</td>
            <td>混在</td>
            <td>描画自体は外部への出力だが、propsから見た目や並び順を決める計算は純粋関数に分離できる</td>
          </tr>
          <tr>
            <td className="hl">フォーム処理</td>
            <td>混在</td>
            <td>入力チェックは純粋、送信・エラー表示は副作用</td>
          </tr>
          <tr>
            <td className="hl">ユーティリティ</td>
            <td>純粋中心</td>
            <td>日付・金額・文字列などの変換や整形はほぼ純粋関数</td>
          </tr>
          <tr>
            <td className="hl">通知・ファイル・ログ</td>
            <td>副作用</td>
            <td>メール送信・アップロード・記録はすべて外部への書き込み</td>
          </tr>
          <tr>
            <td className="hl">型定義・定数</td>
            <td>対象外</td>
            <td>実行時の処理を持たないため、純粋か副作用かという軸が当てはまらない</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="design-paradigm-functional-boundary"
        aspect="660 / 320"
        caption="純粋なコアと副作用の境界。中心にフォーマット・変換・計算・バリデーションといった純粋関数だけのコアがあり、テストにモックが要らない。その外側にリポジトリ・外部API・認証・ログといった副作用を閉じ込める層があり、テストではダミー実装に差し替える。さらに外側がServer ActionsやCustom Hooksなどの入口で、外部世界とのやり取りは必ずこの層を通る。"
      />

      <p>
        これをディレクトリ構成に落とすと、純粋関数はどこから呼んでも安全なので<code>lib/utils/</code>にフラットに置き、副作用を持つ処理は種類ごとにディレクトリを分けて閉じ込め、画面やServer Actionsといった入口だけがそれらを呼ぶ形になります。
      </p>
      <pre>
        <code>{`src/
├─ lib/
│  ├─ utils/           純粋関数 ― 日付・金額の整形、バリデーション、ソート
│  ├─ repositories/    副作用 ― DBアクセスを境界の内側に閉じ込める
│  ├─ api/             副作用 ― 外部API・通知の呼び出し
│  └─ auth/            副作用 ― ログイン・トークン検証
├─ hooks/              副作用 ― DOM操作・購読などをカプセル化
└─ app/
   └─ actions/         副作用の入口 ― repositories / api を呼ぶ`}</code>
      </pre>
      <p>
        <code>lib/utils/</code>の中身はテストでモックが一切不要ですが、それ以外はテスト時にダミー実装へ差し替える対象になる ―
        という違いがディレクトリ単位で一目で分かるようになります。差し替えられる境界の作り方そのものは<Link href="/design/architecture-app-data-access">データアクセス系</Link>のRepositoryで扱います。
      </p>

      <Heading num="05">純粋関数になりやすいもの、ならないもの</Heading>
      <p>
        日付・金額・電話番号の整形、ファイルサイズの表示、Base64やJSONの相互変換、ハッシュ化、バリデーション、引数だけで完結する権限判定、ページネーション計算、ソート条件の生成、Enum変換、エラーメッセージ生成、URL生成 ―
        これらはいずれも「渡された引数だけから結果を計算し、外部の状態を読み書きしない」ため、純粋関数として実装できます。
      </p>
      <p>
        ただし同じユーティリティに見えても、<Term>UUID生成</Term>や<Term>ランダム文字列生成</Term>は純粋関数になりません。<code>crypto.randomUUID()</code>や<code>Math.random()</code>は同じ呼び出しでも毎回異なる値を返すため、「同じ入力には同じ出力」という条件を満たさないからです。実行環境が持つ乱数源という外部状態を読んでいる、という意味で副作用の一種として扱います。現在時刻の取得も同じ理由で副作用です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>純粋関数</h4>
          <p>同じ入力には同じ出力。外部の状態を読み書きしない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>イミュータビリティ</h4>
          <p>データを直接変更せず、変更のたびに新しい値を作る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>2つはセット</h4>
          <p>不変なデータを渡すことで、純粋関数であることが保証しやすくなる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-functional-foundations" />
    </DocsPage>
  );
}
