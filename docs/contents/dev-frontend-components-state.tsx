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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンポーネント別の状態設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネント別の状態設計 ― 部品ごとに state をどこに置くか</h1>
        <Lead>
          <Link href="/dev/frontend/components">コンポーネント設計</Link>で state のリフトアップを押さえたあと、実装では「ボタンの hover は CSS か？」「モーダルの開閉は誰が持つか？」「本文だけスクロールさせるには？」といった<Term>部品ごとの判断</Term>が必要になります。ここでは汎用 UI 部品ごとに、一般的な状態戦略を整理します。アプリ全体の UI・サーバー・URL 状態の分類は<Link href="/dev/frontend/state">状態管理設計</Link>を参照してください。
        </Lead>
      </Hero>

      <Heading num="01">まず4種類に分ける</Heading>
      <p>部品の状態設計は、次の4分類で考えるとぶれません。React の <code>useState</code> が必要かどうかは、この表を見ればだいたい決まります。</p>
      <table>
        <thead>
          <tr>
            <th>分類</th>
            <th>例</th>
            <th>置き場所</th>
            <th>React state</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">視覚的インタラクション</td>
            <td>hover、active、focus-visible</td>
            <td>CSS 疑似クラス</td>
            <td>不要</td>
          </tr>
          <tr>
            <td className="hl">一時的 UI 状態</td>
            <td>ツールチップ表示、メニュー展開、フォーカストラップ</td>
            <td>Headless プリミティブ内部(Base UI / Radix 等)</td>
            <td>原則不要</td>
          </tr>
          <tr>
            <td className="hl">画面・機能に依存</td>
            <td>モーダル開閉、タブ選択、フォーム値、行選択</td>
            <td>共通の親 or ページ</td>
            <td>必要</td>
          </tr>
          <tr>
            <td className="hl">アプリ横断</td>
            <td>テーマ、サイドバー折りたたみ、ログインユーザー</td>
            <td>Context / Cookie / 外部ストア</td>
            <td>必要</td>
          </tr>
        </tbody>
      </table>
      <p>原則は変わりません。<strong>その state を知る必要があるコンポーネントの、最も近い共通の祖先</strong>に置きます。汎用部品(<code>Button</code>、<code>Dialog</code>)は state を持たず、機能ブロック(<code>UserTable</code>、<code>DeleteConfirmDialog</code>を呼ぶページ)が持つ、という分担が基本です。</p>

      <Heading num="02">Button / Badge / Link ― 静的な部品</Heading>
      <p>操作を促す最小単位の部品は、原則 <Term>state を持ちません</Term>。外から渡す props と CSS だけで足ります。</p>
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>扱い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">hover / active / focus-visible</td>
            <td>CSS(<code>:hover</code>、<code>:active</code>、<code>:focus-visible</code>)。<code>useState</code> で hover を追跡しない</td>
          </tr>
          <tr>
            <td className="hl">disabled</td>
            <td>props。親が非同期処理の結果などから決める</td>
          </tr>
          <tr>
            <td className="hl">loading</td>
            <td>props。<code>disabled</code> とスピナー表示をセットにする</td>
          </tr>
          <tr>
            <td className="hl">variant / size</td>
            <td>props。boolean の乱立より <code>variant</code> で意味を1つにまとめる</td>
          </tr>
          <tr>
            <td className="hl">メニューのトリガーとして「開いている」見た目</td>
            <td>Menu プリミティブが付与する <code>aria-expanded</code> を CSS で反映(<code>aria-expanded:bg-muted</code> 等)</td>
          </tr>
        </tbody>
      </table>
      <p>Atlas の <code>Button</code> は <code>hover:</code> と <code>aria-expanded:</code> を Tailwind で持ち、コンポーネント自身は state なしです。クリック時は <code>onClick</code> で親に意図を通知するだけに留めます。</p>

      <Heading num="03">Input / Textarea ― フォーム部品</Heading>
      <p>入力部品は<Term>値の所在</Term>が設計の中心です。見た目の focus は CSS、値とバリデーションは親 or フォームライブラリが担います。</p>
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>扱い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">入力値</td>
            <td><Term>Controlled</Term>(<code>value</code> + <code>onChange</code>) か <Term>Uncontrolled</Term>(<code>defaultValue</code> + ref)。設計段階で決める</td>
          </tr>
          <tr>
            <td className="hl">バリデーション結果</td>
            <td><code>aria-invalid</code> を props で受け取り、CSS でエラー表示</td>
          </tr>
          <tr>
            <td className="hl">focus の見た目</td>
            <td>CSS(<code>focus-visible:</code>)</td>
          </tr>
          <tr>
            <td className="hl">エラーメッセージ・ラベル</td>
            <td>Input 単体ではなく InputGroup / FormField の責務</td>
          </tr>
        </tbody>
      </table>
      <p>複数フィールド・非同期バリデーション・配列フィールドがあるフォーム全体は<Link href="/dev/frontend/react/forms">フォームの値を管理する</Link>で扱います。Input 部品は「値を透過する薄いラッパー」に留めるのが定石です。</p>

      <Heading num="04">Dialog / Sheet ― オーバーレイ</Heading>
      <p>モーダル系は<Term>開閉</Term>と<Term>内部レイアウト</Term>を分けて設計します。</p>
      <table>
        <thead>
          <tr>
            <th>層</th>
            <th>状態</th>
            <th>誰が持つか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">開閉</td>
            <td><code>open</code> / <code>onOpenChange</code></td>
            <td>モーダルを開くボタンと本体の<strong>共通の親</strong>(ページ or 機能ブロック)</td>
          </tr>
          <tr>
            <td className="hl">UX</td>
            <td>フォーカストラップ、Esc 閉じ、背景スクロールロック</td>
            <td>Dialog プリミティブ内部</td>
          </tr>
          <tr>
            <td className="hl">アニメーション</td>
            <td>fade / zoom</td>
            <td>CSS(<code>data-open:</code> / <code>data-closed:</code>)</td>
          </tr>
          <tr>
            <td className="hl">本文スクロール</td>
            <td>コンテンツが長いときの overflow</td>
            <td>子コンポーネント構成 + CSS(後述)</td>
          </tr>
        </tbody>
      </table>
      <p>コンテンツが多いときは、モーダル<strong>全体</strong>ではなく<strong>本文だけ</strong>スクロールさせます。ヘッダーとフッターを固定し、中間を <code>overflow-y-auto</code> または <code>ScrollArea</code> で包む構成が一般的です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`DialogContent (max-h-[90vh] flex flex-col)
├── DialogHeader   ← flex-shrink-0（固定）
├── DialogBody     ← flex-1 overflow-y-auto（ここだけスクロール）
└── DialogFooter   ← flex-shrink-0（固定）`}</code>
      </pre>
      <p><code>document.body.style.overflow</code> を自前で触らず、プリミティブのスクロールロックに任せます。送信成功後に閉じるかどうかも親が <code>onOpenChange(false)</code> で決めます。</p>

      <Heading num="05">Dropdown / Popover / Tooltip ― フローティング UI</Heading>
      <p>位置計算・開閉・フォーカス移動は Headless プリミティブに任せ、親は<Term>選択結果</Term>だけ知れば足りることが多いです。</p>
      <table>
        <thead>
          <tr>
            <th>部品</th>
            <th>基本戦略</th>
            <th>親が Controlled にするケース</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">DropdownMenu</td>
            <td>Uncontrolled。項目クリックで <code>onSelect</code> → 親が副作用を実行</td>
            <td>特定メニューを開いたままにしたい、外部ボタンで開閉したい</td>
          </tr>
          <tr>
            <td className="hl">Popover</td>
            <td>フィルタパネル等、中身にフォームがある場合は開閉を親が持つことも</td>
            <td>「適用」ボタンで閉じる、外部クリックで値を確定</td>
          </tr>
          <tr>
            <td className="hl">Tooltip</td>
            <td>原則 Uncontrolled(hover / focus で自動表示)</td>
            <td>チュートリアルで強制表示、<code>open</code> を Controlled に</td>
          </tr>
        </tbody>
      </table>
      <p>メニュー項目が viewport をはみ出す場合、Positioner が <code>max-h-(--available-height)</code> などで利用可能高さを計算し、Content に <code>overflow-y-auto</code> を付けるのが定石です。JS で高さを手計算する必要はありません。</p>

      <Heading num="06">Collapsible / Tabs ― 開閉ブロック</Heading>
      <p>同じ画面内で表示を切り替える部品は、<Term>open / value</Term> を Root に渡す Controlled / Uncontrolled パターンが基本です。</p>
      <table>
        <thead>
          <tr>
            <th>部品</th>
            <th>state</th>
            <th>設計の要点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Collapsible(単一)</td>
            <td><code>open</code> / <code>defaultOpen</code> / <code>onOpenChange</code></td>
            <td>高さアニメーションはプリミティブ + CSS。FAQ 1 項目なら Uncontrolled で十分</td>
          </tr>
          <tr>
            <td className="hl">Accordion(複数)</td>
            <td>親が <code>value: string | string[]</code> を保持</td>
            <td>「1 つだけ開く」は親 state から各項目の <code>open</code> を導出</td>
          </tr>
          <tr>
            <td className="hl">Tabs</td>
            <td><code>value</code> / <code>onValueChange</code></td>
            <td>URL と同期したいタブ(<code>/settings/profile</code>)は親(ページ)が <code>searchParams</code> と橋渡し(<Link href="/dev/frontend/state">URL 状態</Link>)</td>
          </tr>
        </tbody>
      </table>

      <Heading num="07">ScrollArea / Sidebar ― スクロールとナビ</Heading>
      <p><Term>ScrollArea</Term>は原則 state 不要です。スクロール位置は DOM が持ち、カスタムスクロールバーの表示はプリミティブ内部で処理します。プログラムでスクロールしたいときだけ <code>ref</code> + <code>scrollTo</code> を使います。</p>
      <p><Term>Sidebar</Term>のように複数の state が絡む部品は、Provider + Context で抽象化します。Atlas の Sidebar は次のように分担しています。</p>
      <table>
        <thead>
          <tr>
            <th>state</th>
            <th>用途</th>
            <th>永続化</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl"><code>open</code></td>
            <td>デスクトップの折りたたみ</td>
            <td>Cookie</td>
          </tr>
          <tr>
            <td className="hl"><code>openMobile</code></td>
            <td>モバイルの Sheet 表示</td>
            <td>セッションのみ</td>
          </tr>
          <tr>
            <td className="hl"><code>{`state: "expanded" | "collapsed"`}</code></td>
            <td>CSS 用の派生値</td>
            <td>不要(<code>open</code> から計算)</td>
          </tr>
          <tr>
            <td className="hl"><code>isMobile</code></td>
            <td>Sheet / インライン表示の切替</td>
            <td>Hook(<code>useIsMobile</code>)</td>
          </tr>
        </tbody>
      </table>
      <p>子コンポーネントには <code>toggleSidebar()</code> だけ渡し、raw な <code>open</code> を深い階層まで props で運ばない設計にすると結合度が下がります(<Link href="/dev/frontend/react/context">Context</Link>)。</p>

      <Heading num="08">機能ブロックでの組み合わせ</Heading>
      <p>汎用部品を組み合わせた<Term>機能ブロック</Term>では、ページ( Container )がデータと UI 状態の両方を持ちます。Presentational 部品には props だけ渡します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`UserListPage          ← fetch, filter, selectedIds, deleteDialogOpen
├── UserFilterPanel   ← filter props + onChange
├── UserTable         ← rows props + onSelect
└── DeleteConfirmDialog ← open/onOpenChange を Page が持つ`}</code>
      </pre>
      <p>サーバーから取った一覧は<Link href="/dev/frontend/state">サーバー状態</Link>(TanStack Query 等)に載せ、モーダルの開閉や行選択はページの UI state に載せる、という<Term>混在</Term>が普通です。全部 <code>useState</code> に入れる必要はありません。</p>

      <Analogy label="💡 たとえるなら">
        汎用部品の state 設計は「電気配線の分電盤」です。Button や Input はコンセント( props でつなぐだけ )、Dialog のフォーカストラップは配線の安全装置( プリミティブ内部 )、ページの state は部屋ごとのスイッチ( 機能単位 )、Context は建物全体のメインブレーカー( テーマ・サイドバー )。全部を1 つの巨大スイッチにまとめると、電気を1 つ消すだけで建物全体が暗くなります。
      </Analogy>

      <Heading num="09">設計チェックリスト</Heading>
      <p>部品を実装・選定するとき、次の4問を順に問います。</p>
      <ol>
        <li><strong>他のコンポーネントもこの state を知る必要があるか？</strong> ― No なら CSS or プリミティブ内部。Yes ならリフトアップ。</li>
        <li><strong>ページを離れたら消えていいか？</strong> ― No なら URL / Cookie / Store(<Link href="/dev/frontend/state">状態管理設計</Link>)。</li>
        <li><strong>Controlled と Uncontrolled、どちらをサポートするか？</strong> ― 汎用部品は <code>value ?? internalValue</code> で両方。</li>
        <li><strong>アクセシビリティ属性は誰が付けるか？</strong> ― <code>aria-expanded</code>、<code>aria-invalid</code>、<code>role</code> はプリミティブ or ラッパー。親は意味のある props だけ渡す。</li>
      </ol>

      <Heading num="10">部品別早見表</Heading>
      <table>
        <thead>
          <tr>
            <th>部品</th>
            <th>state の置き場所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Button, Badge, Separator</td>
            <td>なし(props + CSS)</td>
          </tr>
          <tr>
            <td className="hl">Input, Textarea</td>
            <td>値は親 / form lib。見た目は CSS</td>
          </tr>
          <tr>
            <td className="hl">Dialog, Sheet, Popover</td>
            <td>開閉は親。UX はプリミティブ</td>
          </tr>
          <tr>
            <td className="hl">Dropdown, Tooltip</td>
            <td>基本はプリミティブ。結果だけ親</td>
          </tr>
          <tr>
            <td className="hl">Collapsible, Tabs</td>
            <td>open / value は親 or Root</td>
          </tr>
          <tr>
            <td className="hl">ScrollArea</td>
            <td>基本なし</td>
          </tr>
          <tr>
            <td className="hl">Sidebar, Theme</td>
            <td>Context + 永続化</td>
          </tr>
          <tr>
            <td className="hl">DataTable, List</td>
            <td>ページ / Container(fetch, filter, sort, selection)</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">CSS・プリミティブ・親・Context の4層で分ける</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>hover などは CSS</h4>
          <p>Button の hover を <code>useState</code> で追跡しない。視覚的インタラクションは CSS に任せます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>開閉は親、UX はプリミティブ</h4>
          <p>Dialog の <code>open</code> はページが持ち、フォーカストラップはプリミティブに任せます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>本文だけスクロール</h4>
          <p>モーダルは Header / Body / Footer を分け、長いコンテンツは Body だけ <code>overflow-y-auto</code> にします。</p>
        </Card>
      </CardGrid>

      <p>責務分割と props API の設計は<Link href="/dev/frontend/components">コンポーネント設計</Link>、UI・サーバー・URL 状態の全体像は<Link href="/dev/frontend/state">状態管理設計</Link>、部品の見た目ルールは<Link href="/dev/frontend/ux/system">コンポーネントとデザインシステム</Link>を参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/components" tag="フロントエンド">
              コンポーネント設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/state" tag="フロントエンド">
              状態管理設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/system" tag="フロントエンド">
              コンポーネントとデザインシステム
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/props" tag="フロントエンド">
              Propsと一方向データフロー
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/forms" tag="フロントエンド">
              フォームの値を管理する
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
