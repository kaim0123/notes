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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "アクセシビリティ実装",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>アクセシビリティ実装 ― マウスと視覚を前提にしない</h1>
        <Lead>
          <Link href="/dev/frontend/ux/usability">UI・ユーザビリティ・アクセシビリティ</Link>で「誰もが使えること」の考え方を、<Link href="/dev/frontend/web-basics">Web基礎</Link>でセマンティックなタグを見ました。ここではその先 ― <strong>コードで何をすれば実際に使えるようになるのか</strong>を扱います。キーボードだけで操作できるか、読み上げソフトに何と伝わるか、状態の変化が伝わるか。この3点を押さえるだけで、大半の問題は消えます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ「セマンティックに書く」だけでは足りないのか</Heading>
      <p>アクセシビリティ(<Term>a11y</Term>)を「障害のある人のための追加対応」と捉えると後回しになりますが、実際には<strong>入力手段と出力手段の前提を外す</strong>作業です。キーボードしか使えない人、画面を見ずに読み上げで操作する人、拡大表示している人、そして単に「マウスを使いたくない」だけの人 ― すべて同じ実装で救われます。</p>
      <p>問題の多くは、素のHTML要素を使わずに<code>div</code>で部品を自作したときに生まれます。<code>&lt;button&gt;</code>は、クリック・Enter・Spaceでの発火、Tabでの到達、読み上げ時の「ボタン」という役割の通知を<strong>最初から全部持っています</strong>。<code>&lt;div onClick&gt;</code>はその一切を持ちません。</p>
      <table>
        <thead>
          <tr><th>実装</th><th>キーボードで押せる</th><th>読み上げの役割</th><th>フォーカス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;button&gt;</code></td><td>できる(Enter/Space)</td><td>「ボタン」</td><td>Tabで到達する</td></tr>
          <tr><td className="hl"><code>&lt;div onClick&gt;</code></td><td>できない</td><td>役割なし(ただの文字)</td><td>到達しない</td></tr>
        </tbody>
      </table>
      <Aside label="第一原則">
        <strong>ARIAを書かずに済むなら、書かないのが最善です。</strong>ボタンには<code>button</code>、リンクには<code>a href</code>、チェックボックスには<code>input type=&quot;checkbox&quot;</code>を使う ― ネイティブ要素で表現できるものをARIAで再実装するのは、車輪の再発明であるうえに必ず抜けが出ます。
      </Aside>

      <Heading num="02">キーボード操作 ― Tabで辿れて、Escで戻れる</Heading>
      <p>最も費用対効果が高い検証は、<strong>マウスを触らずに自分のアプリを一周してみること</strong>です。ログイン・検索・フォーム送信までTabとEnterだけで到達できなければ、その画面はキーボード利用者に使えません。</p>
      <table>
        <thead>
          <tr><th>キー</th><th>期待される動作</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Tab / Shift+Tab</td><td>操作可能な要素を、見た目の順序どおりに前後移動する</td></tr>
          <tr><td className="hl">Enter</td><td>リンクの移動、ボタンの実行、フォームの送信</td></tr>
          <tr><td className="hl">Space</td><td>ボタンの実行、チェックボックスの切り替え、ページのスクロール</td></tr>
          <tr><td className="hl">Esc</td><td>モーダル・ドロップダウンを閉じる</td></tr>
          <tr><td className="hl">矢印キー</td><td>タブ・メニュー・ラジオなど「1つのまとまりの中」の移動</td></tr>
        </tbody>
      </table>
      <p><Term>tabindex</Term>は3つの値の意味を区別します。乱用しがちなので注意が必要です。</p>
      <table>
        <thead>
          <tr><th>値</th><th>意味</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>tabindex=&quot;0&quot;</code></td><td>本来到達しない要素をTab順に加える(順序はDOM順)</td><td>自作部品にどうしても必要なとき</td></tr>
          <tr><td className="hl"><code>tabindex=&quot;-1&quot;</code></td><td>Tabでは到達しないが、JSからフォーカスは当てられる</td><td>モーダルを開いた直後の移動先</td></tr>
          <tr><td className="hl"><code>tabindex=&quot;1&quot;</code>以上</td><td>DOM順を無視して優先的に回る</td><td><strong>使わない</strong>。順序が破綻する</td></tr>
        </tbody>
      </table>
      <p>また、<code>outline: none</code>でフォーカスの枠線を消してはいけません。どうしても見た目を変えたいときは、<code>:focus-visible</code>で<strong>キーボード操作時だけ</strong>目立つ枠を出すのが現在の作法です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`/* 悪い例: 誰もフォーカス位置が分からなくなる */
button:focus { outline: none; }

/* 良い例: マウスクリック時は出さず、キーボード操作時だけ出す */
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}`}</code>
      </pre>

      <Heading num="03">フォーカス管理 ― 開いたら移し、閉じたら戻す</Heading>
      <p>モーダルやドロワーのように「画面の上に別の文脈を重ねる」部品では、フォーカスの制御が必須です。制御しないと、モーダルを開いたのにフォーカスは背後のページに残り、Tabを押すと見えない要素の上を延々と彷徨うことになります。</p>
      <table>
        <thead>
          <tr><th>タイミング</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開いたとき</td><td>モーダル内の先頭要素(または閉じるボタン)へフォーカスを移す</td></tr>
          <tr><td className="hl">開いている間</td><td>Tabがモーダルの外へ出ないよう閉じ込める(<Term>フォーカストラップ</Term>)</td></tr>
          <tr><td className="hl">背後のコンテンツ</td><td><code>inert</code>属性で操作対象から外す</td></tr>
          <tr><td className="hl">閉じたとき</td><td><strong>開く操作をした要素へフォーカスを戻す</strong></td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function Modal({ open, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // 開く直前にフォーカスしていた要素を覚えておく
    openerRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    return () => {
      // 閉じたら元の場所へ返す
      openerRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <h2 id="modal-title">設定</h2>
      {children}
    </div>,
    document.body,
  );
}`}</code>
      </pre>
      <Aside label="自作より標準">
        ここまでの制御(トラップ・Esc・背景の無効化・フォーカス復帰)は、ネイティブの<code>&lt;dialog&gt;</code>要素や、Base UI・Radix といったヘッドレスUIライブラリが最初から備えています。<Link href="/dev/frontend/ux/system">デザインシステム</Link>で見たとおり、<strong>振る舞いは既製品に任せ、見た目だけ自分で作る</strong>のが最も安全です。
      </Aside>
      <p>もう1つ、ページ先頭に置く<Term>スキップリンク</Term>も定番です。ナビゲーションのリンクを何十回もTabで抜けなくても本文へ飛べるように、フォーカスされたときだけ現れるリンクを最初に置きます。</p>

      <Heading num="04">アクセシブルな名前 ― 読み上げソフトは何と言うか</Heading>
      <p>読み上げソフトは、要素の<Term>役割(role)</Term>と<Term>名前(accessible name)</Term>を読み上げます。アイコンだけのボタンは、視覚的には意味が明らかでも、名前が空なら「ボタン」としか読まれません。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>名前の付け方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テキスト付きボタン</td><td>中のテキストがそのまま名前になる(何もしなくてよい)</td></tr>
          <tr><td className="hl">アイコンのみのボタン</td><td><code>aria-label=&quot;閉じる&quot;</code>を付ける</td></tr>
          <tr><td className="hl">入力欄</td><td><code>&lt;label htmlFor&gt;</code>で紐づける(クリック範囲も広がる)</td></tr>
          <tr><td className="hl">画像</td><td><code>alt</code>。装飾目的なら<code>alt=&quot;&quot;</code>と<strong>空で書く</strong>(省略しない)</td></tr>
          <tr><td className="hl">既存の見出しを名前にしたい</td><td><code>aria-labelledby=&quot;その要素のid&quot;</code></td></tr>
          <tr><td className="hl">補足説明を添えたい</td><td><code>aria-describedby</code>(エラーメッセージやヒント)</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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

      <Heading num="05">ARIA ― 状態を伝えるための最小限の追加</Heading>
      <p><Term>WAI-ARIA</Term>は、HTMLだけでは表現できない<strong>役割・状態・関係</strong>を補うための属性群です。重要なのは、<strong>ARIAは見た目も挙動も一切変えない</strong>ということです。<code>role=&quot;button&quot;</code>を書いてもキーボードで押せるようにはなりません ― 支援技術への「説明書き」を足すだけです。</p>
      <table>
        <thead>
          <tr><th>属性</th><th>伝える内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>aria-expanded</code></td><td>アコーディオンやメニューが開いているか</td></tr>
          <tr><td className="hl"><code>aria-selected</code></td><td>タブやリストの項目が選択中か</td></tr>
          <tr><td className="hl"><code>aria-current=&quot;page&quot;</code></td><td>ナビゲーション内で「いま見ているページ」を示す</td></tr>
          <tr><td className="hl"><code>aria-disabled</code></td><td>無効状態(ただしフォーカスは残したい場合)</td></tr>
          <tr><td className="hl"><code>aria-hidden=&quot;true&quot;</code></td><td>装飾要素を読み上げ対象から外す</td></tr>
          <tr><td className="hl"><code>aria-controls</code></td><td>この要素がどの領域を制御しているかを結ぶ</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ aria-hidden の誤用">
        <code>aria-hidden=&quot;true&quot;</code>を、<strong>フォーカス可能な要素やその祖先に付けてはいけません</strong>。Tabでは到達できるのに読み上げには存在しない、という最悪の状態になります。隠したいものが操作対象でもあるなら、<code>inert</code>か<code>display:none</code>を使います。
      </Aside>

      <Heading num="06">動的な変化を伝える ― aria-live</Heading>
      <p>SPAでは、ボタンを押しても<strong>画面遷移が起きません</strong>。視覚的には「保存しました」というトーストが出ていても、読み上げソフトは何も知らせないままです。この非同期な変化を伝えるのが<Term>ライブリージョン</Term>です。</p>
      <table>
        <thead>
          <tr><th>指定</th><th>読み上げのタイミング</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>aria-live=&quot;polite&quot;</code></td><td>いまの読み上げが終わってから</td><td>保存完了・検索件数の更新</td></tr>
          <tr><td className="hl"><code>aria-live=&quot;assertive&quot;</code></td><td>読み上げを中断して即座に</td><td>致命的なエラーのみ。多用しない</td></tr>
          <tr><td className="hl"><code>role=&quot;status&quot;</code></td><td><code>polite</code>相当の省略記法</td><td>トースト・ステータス表示</td></tr>
          <tr><td className="hl"><code>role=&quot;alert&quot;</code></td><td><code>assertive</code>相当の省略記法</td><td>フォームの検証エラー</td></tr>
        </tbody>
      </table>
      <p>注意点として、ライブリージョンの要素は<strong>変化が起きる前からDOMに存在している</strong>必要があります。空の<code>&lt;div role=&quot;status&quot;&gt;</code>を先に置いておき、そこへ文言を差し込む形にします。要素ごと後から追加すると、通知が発火しないことがあります。</p>
      <p>同じ理由で、<Link href="/dev/frontend/react/boundary">ローディング状態</Link>も伝える必要があります。スピナーの回転は読み上げソフトには見えないので、<code>aria-busy</code>やライブリージョンでの「読み込み中」の通知を添えます。</p>

      <Heading num="07">見え方への配慮 ― コントラスト・拡大・モーション</Heading>
      <p>実装で担保できる視覚面の要件は、主に次の4つです。<Term>WCAG</Term>のレベルAAが実務上の基準になります。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>基準</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">文字色と背景色の<Term>コントラスト比</Term></td><td>通常文字は4.5:1以上、大きな文字は3:1以上</td></tr>
          <tr><td className="hl">色だけで情報を伝えない</td><td>エラーは赤色<strong>かつ</strong>アイコンと文言を添える</td></tr>
          <tr><td className="hl">拡大表示</td><td>200%まで拡大しても内容が失われない(<code>px</code>固定を避け<code>rem</code>を使う)</td></tr>
          <tr><td className="hl">操作対象の大きさ</td><td>タップ領域は24×24px以上を確保する</td></tr>
        </tbody>
      </table>
      <p>アニメーションについては、前庭障害のある人が目眩を起こすことがあるため、OSの「視差効果を減らす」設定を尊重します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</code>
      </pre>

      <Heading num="08">検証する ― 自動と手動を組み合わせる</Heading>
      <p>自動チェックで見つかるのは問題全体の3〜4割程度と言われます。「機械が検出できるもの」と「人が確かめるしかないもの」を分けて考えます。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>見つかるもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>eslint-plugin-jsx-a11y</code></td><td>書いている最中の明らかな誤り(alt漏れ、labelの欠落)</td></tr>
          <tr><td className="hl">axe / Lighthouse</td><td>コントラスト不足、ARIAの不正な組み合わせ、名前のない部品</td></tr>
          <tr><td className="hl"><Link href="/test/e2e">E2Eテスト</Link>での<code>axe-core</code>連携</td><td>回帰の防止(CIで落とせる)</td></tr>
          <tr><td className="hl"><strong>キーボードのみで一周</strong></td><td>Tab順の破綻、フォーカスの迷子、Escで閉じない</td></tr>
          <tr><td className="hl"><strong>読み上げソフト</strong>(VoiceOver / NVDA)</td><td>名前が伝わらない、状態変化が伝わらない</td></tr>
        </tbody>
      </table>
      <Aside label="テストにも効く">
        Testing Libraryの<code>getByRole(&quot;button&quot;, {"{"} name: &quot;保存&quot; {"}"})</code>という書き方は、<strong>まさに支援技術と同じ見方</strong>でDOMを探しています。この記法でテストが書けない部品は、読み上げソフトからも扱えない部品だということです。<Link href="/test/unit">Unitテスト</Link>がそのままa11yの検査になります。
      </Aside>

      <Analogy label="💡 たとえるなら">
        アクセシビリティは、建物のスロープと点字ブロックです。後から付け足すと段差の脇に無理やり坂を貼り付けることになりますが、設計段階で織り込めば追加コストはほとんどかかりません。そしてスロープは、車椅子の人だけでなく、ベビーカーを押す人にも、台車を引く配達員にも効きます。標準の部品を使い、名前と状態を正しく伝えるという地味な作業が、結果的に全員の使いやすさを底上げします。
      </Analogy>

      <Heading num="まとめ">標準部品を使い、名前と状態を伝える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ネイティブ要素を使う</h4><p><code>button</code>や<code>label</code>が持つ振る舞いを<code>div</code>で再実装しない。ARIAは足りない分だけ補う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>キーボードで一周する</h4><p>Tabで辿れ、Escで戻れるか。モーダルは開いたら移し、閉じたら元へ返す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>変化を言葉で伝える</h4><p>SPAの画面更新は読み上げに届かない。ライブリージョンで完了とエラーを通知する。</p></Card>
      </CardGrid>
      <p>ここまでで画面そのものの作りは揃いました。次は通信に話を移し、<Link href="/dev/frontend/http">HTTP通信</Link>で1往復のやり取りを押さえてから、<Link href="/dev/frontend/realtime">リアルタイム通信</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/ux/usability" tag="設計">UI・ユーザビリティ・アクセシビリティ</RelatedLink>
            <RelatedLink href="/dev/frontend/web-basics" tag="フロントエンド">Web基礎</RelatedLink>
            <RelatedLink href="/dev/frontend/ux/system" tag="フロントエンド">コンポーネントとデザインシステム</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
