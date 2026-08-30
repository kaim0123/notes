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
  title: "エラー境界とフォールバックUI",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React</Eyebrow>
        <h1>エラー境界とフォールバックUI ― 待っている間と、失敗したとき</h1>
        <Lead>
          <Link href="/dev/frontend/react/effects">副作用</Link>や<Link href="/dev/frontend/nextjs/data">データフェッチ</Link>を扱うと、画面には成功以外の状態が現れます。<Term>読み込み中</Term>・<Term>空</Term>・<Term>失敗</Term>の3つです。ここを設計しないと、真っ白な画面や無限に回るスピナー、あるいはアプリ全体のクラッシュになります。Reactの<Term>Error Boundary</Term>と<Term>Suspense</Term>、そしてNext.jsのファイル規約で、これを宣言的に組み立てます。
        </Lead>
      </Hero>

      <Heading num="01">画面には4つの状態がある</Heading>
      <p>データを表示する画面は、必ず次の4状態を持ちます。実装で忘れられやすいのは<strong>空</strong>と<strong>失敗</strong>で、この2つが抜けたまま本番に出ると、利用者には「壊れている」としか見えません。</p>
      <table>
        <thead>
          <tr><th>状態</th><th>見せるもの</th><th>忘れるとどうなるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">読み込み中</td><td>スケルトン / スピナー</td><td>真っ白な画面が数秒続き、故障に見える</td></tr>
          <tr><td className="hl">成功(データあり)</td><td>本来の表示</td><td>―</td></tr>
          <tr><td className="hl">成功(データが0件)</td><td><Term>空状態</Term>の説明と次の行動</td><td>空のリストだけが残り、失敗と区別が付かない</td></tr>
          <tr><td className="hl">失敗</td><td>原因の要約と再試行</td><td>クラッシュ、または永遠に読み込み中のまま</td></tr>
        </tbody>
      </table>
      <p>0件のときに「まだ投稿がありません。最初の1件を書いてみましょう」と<strong>次の行動を促す</strong>のが空状態の設計です。これは<Link href="/dev/frontend/ux/basics">UXの基礎</Link>で扱った「システムの状態を可視化する」原則の、最も具体的な適用例と言えます。</p>

      <Heading num="02">Error Boundary ― 壊れた枝だけを切り離す</Heading>
      <p>Reactでは、描画中に例外が投げられると<strong>コンポーネントツリー全体がアンマウントされます</strong>。1つのカードの中の小さなバグで、画面全体が真っ白になるということです。これを防ぐのが<Term>Error Boundary</Term>で、「自分より下で起きた描画時の例外を受け止め、代わりの表示に差し替える」役割を持ちます。</p>
      <p>重要なのは<strong>捕まえられる範囲</strong>です。Error Boundaryは<Term>描画中</Term>の例外専用で、描画が終わったあとに走るコードは対象外です。</p>
      <table>
        <thead>
          <tr><th>エラーの発生場所</th><th>Error Boundaryで捕まるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">描画中(コンポーネント本体・Hooksの初期化)</td><td><strong>捕まる</strong></td></tr>
          <tr><td className="hl">イベントハンドラ(<code>onClick</code>の中)</td><td>捕まらない</td></tr>
          <tr><td className="hl"><code>setTimeout</code>や<code>fetch</code>の<code>.then</code>の中</td><td>捕まらない</td></tr>
          <tr><td className="hl"><code>startTransition</code>の中</td><td><strong>捕まる</strong>(直近の境界まで上がる)</td></tr>
          <tr><td className="hl">Error Boundary自身の中</td><td>捕まらない(親の境界へ上がる)</td></tr>
        </tbody>
      </table>
      <p>つまり<strong>「ボタンを押したら保存に失敗した」は、Error Boundaryの仕事ではありません</strong>。イベントハンドラの中で<code>try/catch</code>して<code>useState</code>に持ち、その場でメッセージを出すのが正しい扱い方です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`"use client";

export function SaveButton() {
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      await save();
      setError(null);
    } catch {
      // イベントハンドラの失敗は境界に届かない。自分で state に持つ
      setError("保存できませんでした。時間をおいて再度お試しください。");
    }
  };

  return (
    <>
      <button onClick={handleClick}>保存</button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}`}</code>
      </pre>
      <Aside label="role=&quot;alert&quot;">
        エラーメッセージには<code>role=&quot;alert&quot;</code>を付けます。これが無いと、画面上には文言が出ているのに読み上げソフトには何も伝わりません。詳しくは<Link href="/dev/frontend/a11y">アクセシビリティ実装</Link>のライブリージョンを参照してください。
      </Aside>

      <Heading num="03">Suspense ― 「待つ範囲」を宣言する</Heading>
      <p><Term>Suspense</Term>は、Error Boundaryの読み込み版です。<code>&lt;Suspense fallback={"{"}...{"}"}&gt;</code>で囲んだ範囲の中身がまだ準備できていないとき、その範囲だけを<code>fallback</code>に差し替えます。</p>
      <p>本質的な効果は、<strong>「読み込み中かどうか」を各コンポーネントが自分で持たなくてよくなる</strong>ことです。<code>isLoading</code>のフラグをpropsで配り回す代わりに、「どこまでを一緒に待つか」という<strong>境界の位置</strong>だけを決めます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`<div className="dashboard">
  {/* 速い部分は待たずにすぐ表示される */}
  <Header user={user} />

  {/* 遅い集計だけを個別に待つ */}
  <Suspense fallback={<StatsSkeleton />}>
    <MonthlyStats />
  </Suspense>

  <Suspense fallback={<FeedSkeleton />}>
    <ActivityFeed />
  </Suspense>
</div>`}</code>
      </pre>
      <p>境界の粒度が、そのまま体感速度になります。ページ全体を1つの<code>Suspense</code>で囲むと、最も遅い1箇所に全体が引きずられます。逆に細かく分けすぎると、画面のあちこちが順不同に現れてちらつきます。<strong>「意味のあるまとまり」単位</strong>で切るのが基本です。この仕組みを配信側から見たものが、<Link href="/dev/frontend/nextjs/rendering">配信を最適化する</Link>で扱ったストリーミングです。</p>

      <Heading num="04">Next.jsのファイル規約 ― 境界を配置で表す</Heading>
      <p>Next.jsのApp Routerでは、この2つの境界を<strong>ファイルを置くだけ</strong>で設定できます。ルートの階層構造が、そのまま境界の入れ子構造になります。</p>
      <table>
        <thead>
          <tr><th>ファイル</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>loading.tsx</code></td><td>そのセグメントを<code>Suspense</code>で包み、<code>fallback</code>として表示される</td></tr>
          <tr><td className="hl"><code>error.tsx</code></td><td>そのセグメント配下のError Boundary。<strong>Client Componentである必要がある</strong></td></tr>
          <tr><td className="hl"><code>not-found.tsx</code></td><td><code>notFound()</code>が呼ばれたとき、および未定義URLのときの表示</td></tr>
          <tr><td className="hl"><code>global-error.tsx</code></td><td>ルートレイアウト自体が壊れたときの最後の砦。<code>html</code>と<code>body</code>を自前で書く</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/dashboard/error.tsx
"use client"; // エラー境界は必ず Client Component

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // 監視サービスへ送る。digest はサーバー側ログとの突き合わせに使う
    reportError(error);
  }, [error]);

  return (
    <div>
      <h2>データを読み込めませんでした</h2>
      <button onClick={() => unstable_retry()}>再試行</button>
    </div>
  );
}`}</code>
      </pre>
      <Aside label="再試行の受け取り方">
        再試行用の関数は、以前は<code>reset</code>という名前でしたが、現在のNext.jsでは<code>unstable_retry</code>として渡されます。名前が示すとおりまだ安定APIではないため、<strong>実際に使うバージョンの型定義を確認してください</strong>。押されるとそのセグメントを再取得・再描画し直します。
      </Aside>
      <p>境界は<strong>置いた階層より下だけ</strong>を守ります。<code>app/dashboard/error.tsx</code>は<code>app/dashboard/layout.tsx</code>で起きた例外を捕まえられません ― 境界はそのレイアウトの<strong>内側</strong>にあるからです。レイアウトを含めて守りたければ、1つ上の階層に置きます。</p>

      <Heading num="05">エラーの2分類 ― 投げるか、返すか</Heading>
      <p>Next.jsの公式ドキュメントは、エラーを<strong>予期されるエラー</strong>と<strong>捕捉されない例外</strong>に分けています。この区別が、実装方針を決めます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">予期されるエラー</td><td>入力の検証エラー、権限不足、該当なし</td><td><strong>throwせず、戻り値として返す</strong>。UIで文言を出す</td></tr>
          <tr><td className="hl">捕捉されない例外</td><td>DB接続の断絶、想定外のnull、バグ</td><td><strong>throwして境界に任せる</strong></td></tr>
        </tbody>
      </table>
      <p>フォーム送信のような予期されるエラーは、Server Functionの戻り値として返し、<code>useActionState</code>で受け取って表示します。「入力が間違っている」のは<strong>正常な業務フローの一部</strong>であって、異常事態ではないからです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`"use client";
import { useActionState } from "react";
import { createPost } from "@/app/actions";

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, { message: "" });

  return (
    <form action={formAction}>
      <input name="title" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>{pending ? "送信中…" : "作成"}</button>
    </form>
  );
}`}</code>
      </pre>
      <p>一方、「そもそも存在しないリソース」は<code>notFound()</code>を呼び、404として扱います。これも例外的な障害ではなく、<strong>正しい応答</strong>です。</p>

      <Heading num="06">何を見せるか ― メッセージの設計</Heading>
      <p>フォールバックUIの中身は、技術的な正しさより<strong>利用者が次に何をできるか</strong>で決めます。</p>
      <table>
        <thead>
          <tr><th>原則</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">例外メッセージをそのまま出さない</td><td>スタックトレースやSQL断片は情報漏洩になる(<Link href="/security/logging">ログ出力設計</Link>)</td></tr>
          <tr><td className="hl">必ず次の行動を示す</td><td>「再試行」「トップへ戻る」「サポートへ連絡」のいずれかを置く</td></tr>
          <tr><td className="hl">識別子を添える</td><td><code>digest</code>や相関IDを表示しておくと、問い合わせ時にサーバーログと突き合わせられる</td></tr>
          <tr><td className="hl">一時的な失敗と恒久的な失敗を分ける</td><td>ネットワーク断は再試行、権限不足は再試行しても無駄</td></tr>
          <tr><td className="hl">監視サービスへ送る</td><td>利用者が報告しないエラーの方が圧倒的に多い(<Link href="/infra/monitoring/frontend">フロントエンド監視</Link>)</td></tr>
        </tbody>
      </table>

      <Heading num="07">スケルトンとレイアウトシフト</Heading>
      <p>読み込み中の表示は、<strong>本来の中身と同じ大きさ・同じ位置</strong>にするのが原則です。小さなスピナーから大きなコンテンツに切り替わると、画面がガタッと動きます(<Term>レイアウトシフト</Term>)。押そうとしたボタンが逃げる、という最も苛立たしい体験の原因です。</p>
      <p>そのため、スピナーよりも<Term>スケルトン</Term>(実際のレイアウトを灰色の箱で模したもの)が好まれます。<code>loading.tsx</code>に置くのも、多くの場合スケルトンです。この指標は<Link href="/dev/frontend/perf">表示速度</Link>で扱うCLSとして数値で測れます。</p>
      <Aside label="待ち時間の目安">
        200ミリ秒以内に終わるならスピナーを出さない方が滑らかです(出してすぐ消えるとちらつく)。1秒を超えるならスケルトンで構造を見せ、10秒を超える処理なら進捗の割合を出すか、そもそも<Link href="/dev/backend/jobs">非同期ジョブ</Link>にして「完了したら通知する」設計へ切り替えることを検討します。
      </Aside>

      <Analogy label="💡 たとえるなら">
        Error BoundaryとSuspenseは、建物の<strong>防火区画</strong>です。火災を完全に防ぐことはできませんが、区画を切っておけば、燃えるのは一室だけで済み、他の部屋の人は普段どおり過ごせます。区画が大きすぎればフロア全体が使えなくなり、細かすぎれば扉だらけで歩きにくい ― どこに壁を立てるかが設計の勘所です。そして「ボタンを押して失敗した」は火災ではなく落とし物なので、区画の話ではなく、その場で拾って渡す仕事になります。
      </Analogy>

      <Heading num="まとめ">境界を置き、状態を4つ揃える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>4状態を必ず設計する</h4><p>読み込み中・成功・空・失敗。空と失敗の抜けが「壊れて見える画面」を作る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>境界は描画時の例外だけ</h4><p>イベントハンドラや非同期の失敗は届かない。自分でcatchしてstateに持つ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>予期されるエラーは返す</h4><p>検証エラーはthrowせず戻り値に。異常事態だけを境界に任せる。</p></Card>
      </CardGrid>
      <p>次は<Link href="/dev/frontend/nextjs">Next.js</Link>へ進みます。ここで見た境界を、<Link href="/dev/frontend/nextjs/routing">ルーティングとレイアウト</Link>の階層構造の上にファイルとして配置していくことになります。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/nextjs/rendering" tag="フロントエンド">配信を最適化する</RelatedLink>
            <RelatedLink href="/dev/frontend/react/effects" tag="フロントエンド">副作用（Effects）</RelatedLink>
            <RelatedLink href="/infra/monitoring/frontend" tag="インフラ">フロントエンド監視</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
