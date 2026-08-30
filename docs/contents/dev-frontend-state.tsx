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
  title: "状態管理設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>状態管理設計 ― どの状態を、どこに、どう持つか</h1>
        <Lead>
          <Link href="/dev/frontend/components">コンポーネント設計</Link>で「state をどこに置くか」の原則を触れましたが、実務では<Term>UI 状態</Term>・<Term>サーバー状態</Term>・<Term>URL 状態</Term>・<Term>フォーム状態</Term>が混在し、<code>useState</code> だけでは足りなくなります。ここでは<Term>状態管理設計</Term>として、種類ごとに置き場所と道具を選ぶ考え方を整理します。React の更新の書き方(<Link href="/dev/frontend/react/state">Stateと更新</Link>)や Context の使い方(<Link href="/dev/frontend/react/context">Context</Link>)は別ページで扱います。
        </Lead>
      </Hero>

      <Heading num="01">まず「状態」を分類する</Heading>
      <p>「状態管理」と聞くと Redux や Zustand を思い浮かべがちですが、フロントエンドの「状態」は1種類ではありません。まず<Term>何の状態か</Term>で分類し、それぞれに適した置き場所とライブラリが決まります。</p>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>内容</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">UI 状態</td>
            <td>画面の見え方・操作の一時的な状態。サーバーに保存しない</td>
            <td>モーダルの開閉、選択中タブ、ドロップダウンの展開</td>
          </tr>
          <tr>
            <td className="hl">サーバー状態</td>
            <td>API や DB から取得したデータ。キャッシュ・再取得・整合性が課題</td>
            <td>ユーザー一覧、商品詳細、在庫数</td>
          </tr>
          <tr>
            <td className="hl">URL 状態</td>
            <td>アドレスバーに載せ、共有・ブックマーク・戻る操作と連動させる状態</td>
            <td>検索キーワード、ページ番号、フィルタ条件</td>
          </tr>
          <tr>
            <td className="hl">フォーム状態</td>
            <td>入力途中の値・バリデーション・送信。完了後はサーバー側へ移る</td>
            <td>登録フォーム、設定画面の編集中データ</td>
          </tr>
          <tr>
            <td className="hl">セッション / グローバル</td>
            <td>アプリ全体で長く保持するクライアント側の文脈</td>
            <td>ログインユーザー、テーマ、言語、カート</td>
          </tr>
        </tbody>
      </table>
      <p>分類を間違えると、たとえば「サーバーから取った一覧を <code>useState</code> に入れて手動で再取得・キャッシュ・ローディングを全部書く」といった<Term>車輪の再発明</Term>になります。逆に「モーダルの開閉まで Redux に載せる」と、更新のたびに不要な購読が広がります。</p>

      <Heading num="02">UI 状態 ― 使う場所の近くに置く</Heading>
      <p>UI 状態の基本原則は<Link href="/dev/frontend/react/state">colocation</Link>です。その state を<Term>読む・書くコンポーネントのうち、最も共通の祖先</Term>に置きます(<Term>リフトアップ</Term>)。1 コンポーネント内で完結するなら <code>useState</code> で十分です。</p>
      <table>
        <thead>
          <tr>
            <th>共有範囲</th>
            <th>置き場所の目安</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1 コンポーネントだけ</td>
            <td><code>useState</code> / <code>useReducer</code></td>
          </tr>
          <tr>
            <td className="hl">兄弟コンポーネント間</td>
            <td>共通の親コンポーネント</td>
          </tr>
          <tr>
            <td className="hl">画面内の深い階層</td>
            <td>ページまたは機能ブロックの親。必要なら Custom Hook に抽出(<Link href="/dev/frontend/react/logic-reuse">ロジックを再利用する</Link>)</td>
          </tr>
          <tr>
            <td className="hl">アプリ全体・更新頻度が低い</td>
            <td><Link href="/dev/frontend/react/context">Context</Link>(テーマ・認証情報など)</td>
          </tr>
          <tr>
            <td className="hl">アプリ全体・更新頻度が高い</td>
            <td>外部ストア(Zustand など。04 節)</td>
          </tr>
        </tbody>
      </table>
      <p>「この state を URL に載せるべきか？」も UI 状態の設計で最初に問います。検索条件やページ番号のように<Term>共有・再現したい</Term>ものは URL に移します(06 節)。</p>

      <Heading num="03">サーバー状態 ― 取得・キャッシュ・同期を任せる</Heading>
      <p>サーバー状態は「クライアントの store にコピーして持つ」より、<Term>取得・キャッシュ・再検証・ローディング・エラー</Term>を専用レイヤーに任せる設計が主流です。手動で <code>useState</code> + <code>useEffect</code> + <code>fetch</code> を書くと、次の問題が毎回発生します。</p>
      <table>
        <thead>
          <tr>
            <th>課題</th>
            <th>手書きだと…</th>
            <th>専用レイヤーだと…</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">重複取得</td>
            <td>同じ API を複数コンポーネントが別々に叩く</td>
            <td>キャッシュキーで1 回にまとめる</td>
          </tr>
          <tr>
            <td className="hl">鮮度</td>
            <td>「いつ再取得するか」を都度判断</td>
            <td>stale 時間・フォーカス時再取得などを宣言</td>
          </tr>
          <tr>
            <td className="hl">更新後の整合性</td>
            <td>ミューテーション後に関連クエリを手動で invalidate</td>
            <td>タグやキーで一括 invalidation</td>
          </tr>
          <tr>
            <td className="hl">ローディング / エラー</td>
            <td>各所で <code>isLoading</code> を複製</td>
            <td>フックが状態を返す</td>
          </tr>
        </tbody>
      </table>
      <p>SPA では <Term>TanStack Query</Term>(React Query) や <Term>SWR</Term> が定番です。Next.js App Router では、Server Component や <Link href="/dev/frontend/nextjs/data">use cache・revalidate</Link> がサーバー側のキャッシュ層になり、Client Component 側の TanStack Query と<Term>役割分担</Term>する構成も多いです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サーバー状態は「store にコピー」より専用フックへ
const { data, isLoading, error } = useQuery({
  queryKey: ["users", filters],
  queryFn: () => fetchUsers(filters),
});

// 更新後は関連キャッシュを invalidation
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
});`}</code>
      </pre>
      <p>「サーバーが正(source of truth)で、クライアントはキャッシュを持つ」というモデルを明示すると、Redux に API レスポンスを全部載せる必要がなくなります。</p>

      <Heading num="04">クライアント全体の状態 ― Context と外部ストア</Heading>
      <p>複数画面・深い階層で共有する<Term>クライアント側</Term>の状態だけが、いわゆる「グローバル state 管理」の対象です。手段は次のように選び分けます。</p>
      <table>
        <thead>
          <tr>
            <th>手段</th>
            <th>向くケース</th>
            <th>注意</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">リフトアップ + props</td>
            <td>共有範囲が1 画面内で済む</td>
            <td>props が深くなる前に Hook や Context を検討</td>
          </tr>
          <tr>
            <td className="hl">Context + useReducer</td>
            <td>テーマ・認証・言語など更新頻度が低〜中</td>
            <td>1 Context に詰め込みすぎると再描画が広がる(<Link href="/dev/frontend/react/context">Contextの分割</Link>)</td>
          </tr>
          <tr>
            <td className="hl">Zustand / Jotai</td>
            <td>中規模。必要な slice だけ購読したい</td>
            <td>ボイラープレートが少なく実務でよく使われる</td>
          </tr>
          <tr>
            <td className="hl">Redux Toolkit</td>
            <td>大規模・更新フローが複雑・DevTools で追跡したい</td>
            <td>小さなアプリには過剰になりやすい</td>
          </tr>
        </tbody>
      </table>
      <p>選定の目安は「<strong>更新頻度</strong>」と「<strong>購読範囲</strong>」です。めったに変わらない値は Context、カートのように頻繁に変わり複数画面から触る値は外部ストア、サーバー由来の一覧は TanStack Query、という<Term>混在</Term>が普通です。1 つのライブラリに全部載せる必要はありません。</p>

      <Analogy label="💡 たとえるなら">
        状態管理設計は「倉庫の種類を決める」作業です。冷蔵( UI 状態・すぐ使う)、常温倉庫( クライアントの共有 state )、外部の配送センター( サーバー・API )、看板( URL )で在庫場所を示す、と用途で分けます。全部を1 つの巨大冷凍庫に入れると、取り出すたびに全体を開け閉めすることになります。
      </Analogy>

      <Heading num="05">URL 状態とフォーム状態</Heading>
      <p><Term>URL 状態</Term>は、ブラウザの履歴・共有・リロードと自然に連動します。検索・一覧のフィルタ・ページネーション・タブ ID など「この画面を再現したい」条件は、可能なら <code>searchParams</code> やルートパラメータに載せます。Next.js では Server Component が searchParams を受け取り、初期データ取得に使えます(<Link href="/dev/frontend/nextjs/components">Server/Clientコンポーネントの境界</Link>)。</p>
      <p><Term>フォーム状態</Term>は入力中の一時値・ touched ・エラーメッセージが絡み、自前実装は冗長になりがちです。複数フィールド・非同期バリデーション・配列フィールドがあるなら <Term>React Hook Form</Term> などに任せ、送信成功後はサーバー状態側(TanStack Query の invalidation や Server Actions)へ結果を反映する流れが定石です(<Link href="/dev/frontend/react/forms">フォームの値を管理する</Link>)。</p>
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>載せる場所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">検索 q、sort、page</td>
            <td>URL の query(<code>?q=...</code>)</td>
          </tr>
          <tr>
            <td className="hl">リソース ID</td>
            <td>パス(<code>/users/123</code>)</td>
          </tr>
          <tr>
            <td className="hl">入力途中のメールアドレス</td>
            <td>フォームライブラリ or ローカル state( URL には載せない)</td>
          </tr>
          <tr>
            <td className="hl">送信後の確定データ</td>
            <td>サーバー → キャッシュ層で再取得</td>
          </tr>
        </tbody>
      </table>

      <Heading num="06">Next.js での境界 ― サーバーとクライアント</Heading>
      <p>App Router では「どこで state を持てるか」に<Term>Server / Client の境界</Term>が加わります。Server Component は <code>useState</code> を使えず、リクエストごとに実行されます。永続化やキャッシュは <Link href="/dev/frontend/nextjs/data">use cache・revalidate</Link>、インタラクションは Client Component、という分担が設計の起点になります。</p>
      <table>
        <thead>
          <tr>
            <th>やりたいこと</th>
            <th>置き場所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">初回表示用データ</td>
            <td>Server Component で fetch / DB 直読み</td>
          </tr>
          <tr>
            <td className="hl">ボタンクリック・入力</td>
            <td>Client Component の UI state</td>
          </tr>
          <tr>
            <td className="hl">更新( POST / PATCH )</td>
            <td>Server Actions + revalidate</td>
          </tr>
          <tr>
            <td className="hl">クライアント側の楽観的 UI</td>
            <td>TanStack Query の mutation + Client state</td>
          </tr>
        </tbody>
      </table>
      <p>「全部 Client Component にして <code>useEffect</code> で fetch」は可能ですが、初期表示・SEO・キャッシュの面で Server 側に寄せた設計の方が Next.js の強みを活かせます。</p>

      <Heading num="07">設計の手順 ― 迷ったときのチェックリスト</Heading>
      <p>新しい state が生まれたら、次の順で問いを立てます。</p>
      <ol>
        <li><strong>サーバーが正か？</strong> ― API/DB 由来なら TanStack Query や Server Component + cache。Redux に載せない。</li>
        <li><strong>URL に載せるべきか？</strong> ― 共有・再現・戻る操作と連動させたいなら query/path へ。</li>
        <li><strong>入力フォームか？</strong> ― 複雑ならフォームライブラリ。送信後はサーバー状態へ。</li>
        <li><strong>共有範囲は？</strong> ― 1 コンポーネント → <code>useState</code>。1 画面 → 親 or Hook。アプリ全体 → Context or 外部ストア。</li>
        <li><strong>更新頻度と購読粒度は？</strong> ― 高頻度・広範囲なら Zustand 等。低頻度なら Context で足りる。</li>
      </ol>
      <p>この順序で決めると、「とりあえず Redux」や「全部 <code>useState</code>」の両方を避けられます。</p>

      <Heading num="まとめ">種類で分け、それぞれに適した層を選ぶ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>状態を5種類に分ける</h4>
          <p>UI・サーバー・URL・フォーム・グローバル。混同しないことが設計の第一歩です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>サーバー状態は専用層へ</h4>
          <p>fetch の手書きを減らし、キャッシュと再検証を TanStack Query や Next.js cache に任せます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>クライアント共有は用途で選ぶ</h4>
          <p>Context・Zustand・Redux を更新頻度と規模で使い分け、1 つに統一する必要はありません。</p>
        </Card>
      </CardGrid>

      <p>Button・Dialog など<Term>部品ごとの state 戦略</Term>は<Link href="/dev/frontend/components/state">コンポーネント別の状態設計</Link>、リフトアップの原則は<Link href="/dev/frontend/components">コンポーネント設計</Link>、<code>useState</code> の更新の書き方は<Link href="/dev/frontend/react/state">Stateと更新</Link>、ライブラリの位置づけは<Link href="/dev/frontend/framework">フレームワーク・ライブラリ</Link>の分類表を参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/components/state" tag="フロントエンド">
              コンポーネント別の状態設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/components" tag="フロントエンド">
              コンポーネント設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/state" tag="フロントエンド">
              Stateと更新
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/context" tag="フロントエンド">
              Context
            </RelatedLink>
            <RelatedLink href="/dev/frontend/nextjs/data" tag="フロントエンド">
              データフェッチ・キャッシュ・再検証
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
