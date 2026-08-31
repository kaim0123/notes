import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ユーザビリティとアクセシビリティ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>ユーザビリティとアクセシビリティ ― マウスと視覚を前提にしない</h1>
        <Lead>
          ユーザビリティが<Term>特定の人にとっての使いやすさ</Term>を指すのに対し、アクセシビリティは<Term>使える人の幅の広さ</Term>を指します。重なりつつも別の概念で、前者を突き詰めても後者は自動的には満たされません。ここでは考え方の整理から始め、<Term>コードで何をすれば実際に使えるようになるのか</Term>まで降ります。
        </Lead>
      </Hero>

      <Heading num="01">情報アーキテクチャ ― 迷わせないための構造</Heading>
      <p>
        使いにくさの多くは、部品ではなく<Term>情報の並べ方</Term>から来ます。大量の情報を迷わず辿れるようにする設計が<Term>情報アーキテクチャ</Term>で、中心にあるのは3つです。
      </p>

      <table>
        <thead>
          <tr><th>要素</th><th>中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ラベル</td><td>項目に付ける名前。社内用語ではなく利用者の言葉にする</td></tr>
          <tr><td className="hl">チャンク</td><td>把握しやすいかたまりに区切る。一度に扱える情報量には限りがある</td></tr>
          <tr><td className="hl">ナビゲーション</td><td>いまどこにいて、どこへ行けるかを常に示す</td></tr>
        </tbody>
      </table>

      <p>
        チャンク化は、長い数字列をハイフンで区切ると覚えやすくなるのと同じ原理です。項目が10個並ぶフォームも、3つの見出しで区切るだけで負担が下がります。
      </p>

      <Heading num="02">「セマンティックに書く」だけでは足りない</Heading>
      <p>
        アクセシビリティを「障害のある人のための追加対応」と捉えると後回しになりますが、実際には<Term>入力手段と出力手段の前提を外す</Term>作業です。キーボードしか使えない人、読み上げで操作する人、拡大表示している人、そして単にマウスを使いたくない人 ― すべて同じ実装で救われます。
      </p>
      <p>
        問題の多くは、素のHTML要素を使わずに<code>div</code>で部品を自作したときに生まれます。<code>&lt;button&gt;</code>は、クリック・Enter・Spaceでの発火、Tabでの到達、読み上げ時の役割通知を<Term>最初から全部持っています</Term>。
      </p>

      <table>
        <thead>
          <tr><th>実装</th><th>キーボードで押せる</th><th>読み上げの役割</th><th>フォーカス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;button&gt;</code></td><td>できる</td><td>「ボタン」</td><td>Tabで到達する</td></tr>
          <tr><td className="hl"><code>&lt;div onClick&gt;</code></td><td>できない</td><td>役割なし</td><td>到達しない</td></tr>
        </tbody>
      </table>

      <Aside label="第一原則">
        <Term>ARIAを書かずに済むなら、書かないのが最善です。</Term>ボタンには<code>button</code>、リンクには<code>a href</code>、チェックボックスには<code>input</code>を使う ― ネイティブ要素で表現できるものをARIAで再実装するのは、車輪の再発明であるうえに必ず抜けが出ます。
      </Aside>

      <Heading num="03">キーボード操作 ― Tabで辿れて、Escで戻れる</Heading>
      <p>
        最も費用対効果が高い検証は、<Term>マウスを触らずに自分のアプリを一周してみること</Term>です。ログイン・検索・送信までTabとEnterだけで到達できなければ、その画面はキーボード利用者に使えません。
      </p>

      <table>
        <thead>
          <tr><th>キー</th><th>期待される動作</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Tab / Shift+Tab</td><td>操作可能な要素を、見た目の順序どおりに前後移動する</td></tr>
          <tr><td className="hl">Enter</td><td>リンクの移動、ボタンの実行、フォームの送信</td></tr>
          <tr><td className="hl">Space</td><td>ボタンの実行、チェックの切り替え、ページのスクロール</td></tr>
          <tr><td className="hl">Esc</td><td>モーダル・ドロップダウンを閉じる</td></tr>
          <tr><td className="hl">矢印キー</td><td>タブ・メニュー・ラジオなど「1つのまとまりの中」の移動</td></tr>
        </tbody>
      </table>

      <p>
        <code>tabindex</code>は3つの値で意味が変わります。<code>0</code>は本来到達しない要素をTab順に加える(順序はDOM順)、<code>-1</code>はTabでは到達しないがJSからフォーカスできる、<code>1</code>以上はDOM順を無視して優先的に回る ― 最後は<Term>使いません</Term>。順序が破綻します。
      </p>
      <p>
        また、フォーカスの枠線を消してはいけません。見た目を変えたいときは<code>:focus-visible</code>で<Term>キーボード操作時だけ</Term>目立つ枠を出すのが現在の作法です。
      </p>

      <pre>
        <code>{`/* 悪い例: 誰もフォーカス位置が分からなくなる */
button:focus { outline: none; }

/* 良い例: マウス操作では出さず、キーボード操作時だけ出す */
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}`}</code>
      </pre>

      <Heading num="04">フォーカス管理 ― 開いたら移し、閉じたら戻す</Heading>
      <p>
        モーダルのように「画面の上に別の文脈を重ねる」部品では、フォーカスの制御が必須です。制御しないと、開いたのにフォーカスは背後に残り、Tabを押すと見えない要素の上を延々と彷徨うことになります。
      </p>

      <DiagramFrame
        slug="frontend-ux-a11y-focus"
        aspect="640 / 310"
        caption="モーダルを開いてから閉じるまでのフォーカスの流れを示した図。まず利用者が開くボタンを押した時点で、そのボタンを記憶しておく。開いたらモーダル内の先頭要素へフォーカスを移し、開いている間はTabがモーダルの外へ出ないよう閉じ込め、背後のコンテンツは操作対象から外す。Escまたは閉じるボタンで閉じたら、記憶しておいた元のボタンへフォーカスを戻す。この戻しを省くと、閉じた後にフォーカスがページ先頭へ飛び、利用者は自分がどこにいたか分からなくなる。"
      />

      <table>
        <thead>
          <tr><th>タイミング</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開く直前</td><td>いまフォーカスしている要素を覚えておく</td></tr>
          <tr><td className="hl">開いたとき</td><td>モーダル内の先頭要素へフォーカスを移す</td></tr>
          <tr><td className="hl">開いている間</td><td>Tabが外へ出ないよう閉じ込める(フォーカストラップ)</td></tr>
          <tr><td className="hl">背後のコンテンツ</td><td><code>inert</code>で操作対象から外す</td></tr>
          <tr><td className="hl">閉じたとき</td><td>覚えておいた要素へフォーカスを戻す</td></tr>
        </tbody>
      </table>

      <Aside label="自作より標準">
        ここまでの制御(トラップ・Esc・背景の無効化・復帰)は、ネイティブの<code>&lt;dialog&gt;</code>要素や、挙動だけを提供するヘッドレスUIライブラリが最初から備えています。<Link href="/frontend/ux-system">デザインシステム</Link>で見たとおり、<Term>振る舞いは既製品に任せ、見た目だけ自分で作る</Term>のが最も安全です。
      </Aside>

      <p>
        もう1つ定番なのが<Term>スキップリンク</Term>です。ナビゲーションのリンクを何十回もTabで抜けなくても本文へ飛べるよう、フォーカスされたときだけ現れるリンクをページ先頭に置きます。
      </p>

      <Heading num="05">アクセシブルな名前 ― 何と読み上げられるか</Heading>
      <p>
        読み上げソフトは、要素の<Term>役割</Term>と<Term>名前</Term>を読み上げます。アイコンだけのボタンは、視覚的には意味が明らかでも、名前が空なら「ボタン」としか読まれません。
      </p>

      <table>
        <thead>
          <tr><th>要素</th><th>名前の付け方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テキスト付きボタン</td><td>中のテキストがそのまま名前になる(何もしなくてよい)</td></tr>
          <tr><td className="hl">アイコンのみのボタン</td><td><code>aria-label</code>を付ける</td></tr>
          <tr><td className="hl">入力欄</td><td><code>&lt;label&gt;</code>で紐づける(クリック範囲も広がる)</td></tr>
          <tr><td className="hl">画像</td><td><code>alt</code>。装飾目的なら<strong>空で書く</strong>(省略しない)</td></tr>
          <tr><td className="hl">既存の見出しを名前にしたい</td><td><code>aria-labelledby</code></td></tr>
          <tr><td className="hl">補足説明を添えたい</td><td><code>aria-describedby</code>(エラーメッセージやヒント)</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`{/* アイコンだけのボタン: 名前を明示し、装飾のアイコンは読み上げから隠す */}
<button aria-label="メニューを開く">
  <MenuIcon aria-hidden="true" />
</button>

{/* 入力欄: label と id を紐づけ、エラーは describedby で結ぶ */}
<label htmlFor="email">メールアドレス</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <p id="email-error">{error}</p>}`}</code>
      </pre>

      <Heading num="06">ARIA ― 状態を伝えるための最小限</Heading>
      <p>
        <Term>WAI-ARIA</Term>は、HTMLだけでは表現できない役割・状態・関係を補う属性群です。重要なのは<Term>ARIAは見た目も挙動も一切変えない</Term>こと。<code>role=&quot;button&quot;</code>と書いてもキーボードで押せるようにはなりません ― 支援技術への説明書きを足すだけです。
      </p>

      <table>
        <thead>
          <tr><th>属性</th><th>伝える内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>aria-expanded</code></td><td>アコーディオンやメニューが開いているか</td></tr>
          <tr><td className="hl"><code>aria-selected</code></td><td>タブやリストの項目が選択中か</td></tr>
          <tr><td className="hl"><code>aria-current</code></td><td>ナビゲーション内の「いま見ているページ」</td></tr>
          <tr><td className="hl"><code>aria-disabled</code></td><td>無効状態(ただしフォーカスは残したい場合)</td></tr>
          <tr><td className="hl"><code>aria-hidden</code></td><td>装飾要素を読み上げ対象から外す</td></tr>
          <tr><td className="hl"><code>aria-controls</code></td><td>この要素がどの領域を制御しているか</td></tr>
        </tbody>
      </table>

      <Aside label="⚠️ aria-hidden の誤用">
        <code>aria-hidden</code>を、<Term>フォーカス可能な要素やその祖先に付けてはいけません</Term>。Tabでは到達できるのに読み上げには存在しない、という最悪の状態になります。隠したいものが操作対象でもあるなら、<code>inert</code>か<code>display: none</code>を使います。
      </Aside>

      <Heading num="07">動的な変化を伝える</Heading>
      <p>
        SPAでは、ボタンを押しても<Term>画面遷移が起きません</Term>。視覚的には「保存しました」と出ていても、読み上げソフトは何も知らせないままです。この非同期な変化を伝えるのが<Term>ライブリージョン</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>指定</th><th>読み上げのタイミング</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>aria-live=&quot;polite&quot;</code></td><td>いまの読み上げが終わってから</td><td>保存完了・件数の更新</td></tr>
          <tr><td className="hl"><code>aria-live=&quot;assertive&quot;</code></td><td>読み上げを中断して即座に</td><td>致命的なエラーのみ。多用しない</td></tr>
          <tr><td className="hl"><code>role=&quot;status&quot;</code></td><td>politeの省略記法</td><td>通知・ステータス表示</td></tr>
          <tr><td className="hl"><code>role=&quot;alert&quot;</code></td><td>assertiveの省略記法</td><td>フォームの検証エラー</td></tr>
        </tbody>
      </table>

      <p>
        注意点として、ライブリージョンの要素は<Term>変化が起きる前からDOMに存在している</Term>必要があります。空の入れ物を先に置き、そこへ文言を差し込む形にします。要素ごと後から追加すると、通知が発火しないことがあります。同じ理由で、読み込み中であることも言葉で伝える必要があります ― スピナーの回転は読み上げには見えません。
      </p>

      <Heading num="08">見え方への配慮</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>基準</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コントラスト比</td><td>通常の文字は4.5:1以上、大きな文字は3:1以上</td></tr>
          <tr><td className="hl">色だけで伝えない</td><td>エラーは赤色<strong>かつ</strong>アイコンと文言を添える</td></tr>
          <tr><td className="hl">拡大表示</td><td>200%まで拡大しても内容が失われない。<code>rem</code>を使う</td></tr>
          <tr><td className="hl">操作対象の大きさ</td><td>タップ領域を十分に確保する</td></tr>
          <tr><td className="hl">動きの抑制</td><td>OSの「視差効果を減らす」設定を尊重する</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</code>
      </pre>

      <Heading num="09">検証する ― 自動と手動を組み合わせる</Heading>
      <p>
        自動チェックで見つかるのは問題全体の一部にすぎません。<Term>機械が検出できるもの</Term>と<Term>人が確かめるしかないもの</Term>を分けて考えます。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>見つかるもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">エディタ上の静的解析</td><td>書いている最中の明らかな誤り(代替テキストやラベルの欠落)</td></tr>
          <tr><td className="hl">検査ツール</td><td>コントラスト不足、ARIAの不正な組み合わせ、名前のない部品</td></tr>
          <tr><td className="hl">CIでの自動検査</td><td>回帰の防止。落ちる条件にできる</td></tr>
          <tr><td className="hl">キーボードのみで一周</td><td>Tab順の破綻、フォーカスの迷子、Escで閉じない</td></tr>
          <tr><td className="hl">読み上げソフト</td><td>名前が伝わらない、状態変化が伝わらない</td></tr>
        </tbody>
      </table>

      <Aside label="テストの書き方にも効く">
        「役割と名前で要素を探す」という書き方は、<Term>まさに支援技術と同じ見方</Term>でDOMを探しています。この記法でテストが書けない部品は、読み上げソフトからも扱えない部品だということです。テストの書き方をそろえるだけで、a11yの検査を兼ねられます。
      </Aside>

      <Analogy label="💡 たとえるなら">
        アクセシビリティは建物のスロープと点字ブロックです。後から付け足すと段差の脇に無理やり坂を貼ることになりますが、設計段階で織り込めば追加コストはほとんどかかりません。そしてスロープは、車椅子の人だけでなくベビーカーを押す人にも台車を引く配達員にも効きます。標準の部品を使い、名前と状態を正しく伝えるという地味な作業が、結果的に全員の使いやすさを底上げします。
      </Analogy>

      <Heading num="まとめ">標準部品を使い、名前と状態を伝える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ネイティブ要素を使う</h4>
          <p><code>button</code>や<code>label</code>の振る舞いを<code>div</code>で再実装しない。ARIAは足りない分だけ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>キーボードで一周する</h4>
          <p>Tabで辿れ、Escで戻れるか。モーダルは開いたら移し、閉じたら元へ返す。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>変化を言葉で伝える</h4>
          <p>SPAの画面更新は読み上げに届かない。完了とエラーを通知する。</p>
        </Card>
      </CardGrid>

      <p>
        UX・UIの配下はここまでです。次は、ここで決めた画面を<Term>どの単位でコードに切るか</Term> ―
        <Link href="/frontend/components">コンポーネントと状態</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-a11y" />
    </DocsPage>
  );
}
