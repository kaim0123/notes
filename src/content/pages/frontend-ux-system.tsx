import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンポーネントとデザインシステム" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネントとデザインシステム ― 判断を1回で終わらせる</h1>
        <Lead>
          画面を1枚ずつ手作りすると、ボタンの角丸もエラー表示もページごとにばらけます。<Term>コンポーネント</Term>として部品化し、<Term>デザインシステム</Term>でルールと値を共有する目的は、見た目を揃えること以上に<Term>同じ判断を何度もしなくて済むようにする</Term>ことにあります。
        </Lead>
      </Hero>

      <Heading num="01">繰り返し現れる部品と、その要点</Heading>
      <table>
        <thead>
          <tr><th>部品</th><th>役割</th><th>設計の要点</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ボタン</td>
            <td>操作を促す。主操作と副操作を区別する</td>
            <td>1画面に主操作は1つが目安。無効・処理中の状態も定義する</td>
          </tr>
          <tr>
            <td className="hl">フォーム部品</td>
            <td>入力・選択</td>
            <td>ラベルと入力欄を関連付ける。プレースホルダをラベル代わりにしない</td>
          </tr>
          <tr>
            <td className="hl">ダイアログ</td>
            <td>確認・警告・短い入力</td>
            <td>閉じ方(Esc・背景クリック)とフォーカスの行き先を決める</td>
          </tr>
          <tr>
            <td className="hl">タブ</td>
            <td>同階層の内容を切り替える</td>
            <td>現在位置が分かること。中身が独立ページ相当ならURLも持たせる</td>
          </tr>
          <tr>
            <td className="hl">テーブル</td>
            <td>行と列のデータ一覧</td>
            <td>列が多いときの扱い(横スクロール・列の取捨)を先に決める</td>
          </tr>
          <tr>
            <td className="hl">カード</td>
            <td>関連情報を1枠にまとめる</td>
            <td>全体が押せるなら、その領域を明示する</td>
          </tr>
          <tr>
            <td className="hl">通知</td>
            <td>結果や警告を伝える</td>
            <td>消えるものと残るものを分ける。重要なものを自動で消さない</td>
          </tr>
        </tbody>
      </table>

      <p>
        「設計の要点」の列が本体です。<Term>部品を作る作業の大半は、こうした細部を1回だけ決めること</Term>で、それが済んでいれば以後の画面では悩む必要がなくなります。
      </p>

      <Heading num="02">粒度をどう分けるか</Heading>
      <p>
        <Term>Atomic Design</Term>は、UIを5段階の粒度で分解する考え方です。
      </p>

      <DiagramFrame
        slug="frontend-ux-system-atomic"
        aspect="640 / 300"
        caption="Atomic Designの5段階を左から右へ並べた図。いちばん左が原子で、ボタンや入力欄やラベルといったこれ以上分けられない最小部品。次が分子で、ラベルと入力欄を組み合わせた検索ボックスなど。次が有機体で、分子をまとめたヘッダーやフォーム全体。次がテンプレートで、中身をプレースホルダにしたレイアウトの骨組み。いちばん右がページで、実データを載せた完成形。左へ行くほど再利用され、右へ行くほど固有の事情を持つ。下部に、段階の名前を厳密に守ることより、再利用される部品と固有の部品を分けることが目的だという注記がある。"
      />

      <table>
        <thead>
          <tr><th>段階</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">原子</td><td>これ以上分けられない最小部品</td><td>ボタン、入力欄、ラベル、アイコン</td></tr>
          <tr><td className="hl">分子</td><td>原子の組み合わせ</td><td>ラベル + 入力欄、検索ボックス</td></tr>
          <tr><td className="hl">有機体</td><td>分子のまとまり</td><td>ヘッダー、フォーム全体、カード一覧</td></tr>
          <tr><td className="hl">テンプレート</td><td>レイアウトの骨組み。中身は仮</td><td>2カラム + サイドバーの枠</td></tr>
          <tr><td className="hl">ページ</td><td>実データを載せた完成形</td><td>具体的な商品一覧</td></tr>
        </tbody>
      </table>

      <p>
        実務では、この5段階を<Term>厳密に守ること自体が目的化しやすい</Term>点に注意が要ります。「これは分子か有機体か」で議論が止まるなら、その分類は役に立っていません。本当に必要なのは<Term>再利用される部品と、その画面固有の部品を分ける</Term>ことだけです。コード上の分割の判断は<Link href="/frontend/components">コンポーネントと状態</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        Atomic Designはブロック玩具です。最小ブロックを組み合わせて車を作り、説明書に沿って街を並べます。ただし、同じブロックを使い回すことに価値があるのであって、ブロックを何段階に分類するかは本質ではありません。
      </Analogy>

      <Heading num="03">デザイントークン ― 値に名前を付ける</Heading>
      <p>
        <Term>デザイントークン</Term>は、色・文字サイズ・余白・角丸といったデザイン上の値に名前を付け、コードとデザインツールの両方で共有する仕組みです。
      </p>
      <p>
        効くのは<Term>名前が意味を表しているとき</Term>だけです。<code>gray-700</code>のような「見た目の名前」ではなく、<code>text-muted</code>・<code>surface-raised</code>のような<Term>役割の名前</Term>にしておくと、テーマ切替は値の差し替えだけで済みます。見た目の名前のままだと、ダークテーマで「gray-700が明るい色になる」という破綻が起きます。
      </p>

      <table>
        <thead>
          <tr><th>層</th><th>例</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">基礎トークン</td><td><code>blue-500</code>、<code>space-4</code></td><td>生の値。直接は使わない</td></tr>
          <tr><td className="hl">意味トークン</td><td><code>color-primary</code>、<code>text-muted</code></td><td>役割を表す。コンポーネントはこれを参照する</td></tr>
          <tr><td className="hl">部品トークン</td><td><code>button-padding-x</code></td><td>特定部品だけの値。作りすぎない</td></tr>
        </tbody>
      </table>

      <Aside label="トークンは早く入れるほど安い">
        トークン化は、あとから入れるのが最も高くつく類の作業です。プロジェクト後半で「色を集約しよう」とすると、似た灰色20種類のどれをどのトークンに寄せるかという、答えの出ない作業になります。<Term>最初に少数のトークンだけ決めて、増やすときに理由を求める</Term>運用が現実的です。
      </Aside>

      <Heading num="04">ライブラリとデザインシステムは別物</Heading>
      <p>
        <Term>コンポーネントライブラリ</Term>は実装済み部品の集合です。<Term>デザインシステム</Term>はそれに加えて、<Term>使い方のルール</Term>とトークンを含む共通言語全体を指します。
      </p>
      <p>
        部品だけあってルールが無いと、「主操作のボタンが1画面に5つある」といった状態は防げません。逆にルールだけあって部品が無ければ、誰も守れません。<Term>両方そろって初めて機能します</Term>。
      </p>
      <p>
        実装の選択肢としては、見た目を持たず挙動だけを提供する土台部品に自分でスタイルを当てる方式や、<Link href="/frontend/tailwind">shadcn/ui</Link>のようにソースごとコピーして自分で保守する方式があります。どちらも、ここで見た部品設計とトークンの考え方が前提になります。
      </p>

      <Heading num="まとめ">揃えるためではなく、迷わないために</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>部品化は判断の集約</h4>
          <p>細部を1回だけ決めておけば、以後の画面では悩まなくてよくなる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>粒度の分類は手段</h4>
          <p>段階の名前で議論が止まるなら本末転倒。再利用と固有を分けるだけでよい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>トークンは役割で名付ける</h4>
          <p>見た目の名前のままだと、テーマ切替で破綻する。</p>
        </Card>
      </CardGrid>

      <p>
        UX・UIの最後は、ここまでの設計が<Term>本当に誰にでも使えるか</Term>を確かめる話です。
        <Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-system" />
    </DocsPage>
  );
}
