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
  title: "コンポーネント設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネント設計 ― UIをコードの部品として切り分ける</h1>
        <Lead>
          <Link href="/dev/frontend/ux/system">デザインシステム</Link>で「どんな部品が必要か」を決めたあと、Reactで書く前に<Term>コンポーネント設計</Term>で「責務をどう分け、状態をどこに置き、外から何を渡すか」を決めます。見た目のルールではなく、<strong>コードの分割とインタフェース(props)</strong>の話です。
        </Lead>
      </Hero>

      <Heading num="01">なぜコンポーネントに分割するか</Heading>
      <p>画面全体を1つの巨大な関数に書くと、変更のたびに全体を読み直し、同じパターンをコピペしてバラけさせ、テストも難しくなります。コンポーネントに分ける理由は次の3点に集約できます。</p>
      <table>
        <thead>
          <tr>
            <th>目的</th>
            <th>効果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">再利用</td>
            <td>同じボタン・フォーム・一覧を複数画面で使い回せる</td>
          </tr>
          <tr>
            <td className="hl">変更の局所化</td>
            <td>ボタンの見た目を変えるとき、Button だけ直せばよい</td>
          </tr>
          <tr>
            <td className="hl">テストと読みやすさ</td>
            <td>小さな単位で「この入力ならこの出力」を確認できる</td>
          </tr>
        </tbody>
      </table>
      <p>分割の判断基準は<Link href="/design/principles/cohesion">凝集度と結合度</Link>と同じです。1つのコンポーネントは「1つの理由で変更される」粒度を目指し、他への依存(props の数・深さ)は少ないほどよい、という原則がそのまま当てはまります。</p>

      <Heading num="02">粒度の決め方 ― 1コンポーネント = 1責務</Heading>
      <p>「小さすぎる」と props の受け渡しが増え、「大きすぎる」と再利用もテストも難しくなります。実務では次の基準で切ることが多いです。</p>
      <table>
        <thead>
          <tr>
            <th>レイヤー</th>
            <th>役割</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ページ</td>
            <td>URL 1つ分。データ取得の入口・レイアウト</td>
            <td><code>UserListPage</code></td>
          </tr>
          <tr>
            <td className="hl">機能ブロック</td>
            <td>画面内の独立した機能単位</td>
            <td><code>UserFilterPanel</code>、<code>UserTable</code></td>
          </tr>
          <tr>
            <td className="hl">汎用部品</td>
            <td>プロダクト横断で使う UI 部品</td>
            <td><code>Button</code>、<code>Dialog</code>、<code>TextField</code></td>
          </tr>
        </tbody>
      </table>
      <p><Link href="/dev/frontend/ux/system">Atomic Design</Link>の Atoms/Molecules/Organisms は見た目の粒度です。コード上では「ページ → 機能 → 汎用部品」の3段階と対応づけると、フォルダ構成も決めやすくなります。迷ったときは「この塊を別画面でもそのまま使えるか？」で切るとよいです。</p>

      <Analogy label="💡 たとえるなら">
        コンポーネント設計は「引き出しの整理」です。箸・スプーン・包丁(汎用部品)を混ぜずに置き、朝食セット(機能ブロック)として並べ、食事全体(ページ)の流れが自然になるように配置します。引き出しが1つに全部入っていると、箸1本直すのにも全体をひっくり返すことになります。
      </Analogy>

      <Heading num="03">状態の所在 ― 誰が state を持つか</Heading>
      <p>コンポーネント設計で最も迷いやすいのが、<Term>状態(state)をどこに置くか</Term>です。基本原則は「その state を必要とするコンポーネントのうち、<strong>最も共通の祖先</strong>」に置く(<Term>state のリフトアップ</Term>)ことです。</p>
      <table>
        <thead>
          <tr>
            <th>状態の種類</th>
            <th>置き場所の目安</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">入力中のフォーム値</td>
            <td>フォーム全体を束ねる親、またはフォームライブラリの管理下</td>
          </tr>
          <tr>
            <td className="hl">モーダルの開閉</td>
            <td>モーダルを開くボタンとモーダル本体の共通の親</td>
          </tr>
          <tr>
            <td className="hl">サーバーから取った一覧</td>
            <td>ページまたはデータ取得を担うコンテナ</td>
          </tr>
          <tr>
            <td className="hl">テーマ・ログインユーザー</td>
            <td>アプリ全体 ― Context やグローバルストア(<Link href="/dev/frontend/react/context">Context</Link>)</td>
          </tr>
        </tbody>
      </table>
      <p>入力欄の値を親が持ち子は表示だけする(<Term>Controlled</Term>)、子が内部で持ち完成した値だけ親に渡す(<Term>Uncontrolled</Term>)の使い分けも、設計段階で決めておくと props の形が定まります。Button の hover を CSS に任せるか、Dialog の本文だけスクロールさせるかといった<Term>部品ごとの判断</Term>は<Link href="/dev/frontend/components/state">コンポーネント別の状態設計</Link>、フォーム全体は<Link href="/dev/frontend/react/forms">フォームの値を管理する</Link>で詳述します。</p>

      <Heading num="04">props API の設計 ― 外から何を渡すか</Heading>
      <p>コンポーネントの「取扱説明書」が props です。設計時に次を意識すると、使う側・保守する側の両方が楽になります。</p>
      <table>
        <thead>
          <tr>
            <th>原則</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">最小限にする</td>
            <td>本当に外から変えたいものだけ公開。内部実装の詳細は隠す</td>
          </tr>
          <tr>
            <td className="hl">意味のある名前</td>
            <td><code>isOpen</code>、<code>onClose</code>、<code>items</code> など意図が伝わる命名(<Link href="/design/conventions/functions">命名規約</Link>)</td>
          </tr>
          <tr>
            <td className="hl">拡張しやすく</td>
            <td>boolean の乱立より判別可能 Union。将来の variant 追加を想定</td>
          </tr>
          <tr>
            <td className="hl">合成を許す</td>
            <td><code>children</code> やスロット props で中身を差し替え可能に(<Link href="/dev/frontend/react/props">Props</Link>)</td>
          </tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: 見た目の都合で boolean が増殖
<Button primary large rounded shadow />

// OK: variant で意味を1つにまとめる
<Button variant="primary" size="lg" />`}</code>
      </pre>
      <p>型は<Link href="/dev/frontend/react/typescript">TypeScriptでコンポーネントを書く</Link>で props に付け、渡し間違いをコンパイル時に弾きます。</p>

      <Heading num="05">表示とロジックの分離</Heading>
      <p><Term>Presentational(表示)</Term>コンポーネントは props を受け取り JSX を返すだけ。<Term>Container(コンテナ)</Term>コンポーネントはデータ取得・state 管理・イベント処理を担い、Presentational に props を渡します。必ずファイルを2つに分ける必要はありませんが、「このコンポーネントはデータを知っているか？」という問いで責務を切ると、テストしやすい表示部品が残ります。</p>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>知っていること</th>
            <th>知らないこと</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Presentational</td>
            <td>見た目・レイアウト・ユーザー操作の通知(コールバック呼び出し)</td>
            <td>API の URL、グローバル store の詳細</td>
          </tr>
          <tr>
            <td className="hl">Container</td>
            <td>データソース、ビジネスルール、状態の更新</td>
            <td>ボタンの角丸や余白の細部(部品に委ねる)</td>
          </tr>
        </tbody>
      </table>
      <p>カスタム Hook にロジックを抜き出す方法(<Link href="/dev/frontend/react/logic-reuse">ロジックを再利用する</Link>)も、Container と Presentational の中間層としてよく使われます。Next.js では Server Component がデータ取得、Client Component がインタラクション、という分け方も同系統です(<Link href="/dev/frontend/nextjs/components">Server/Clientコンポーネントの境界</Link>)。</p>

      <Heading num="06">ディレクトリ構成の例</Heading>
      <p>プロジェクト規模に応じて次のような置き方が一般的です。Atlas 本体は <code>src/components/docs/</code>(ドキュメント用)と <code>src/components/layout/</code>(アプリ枠)のように、用途でトップを分けています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`src/components/
  ui/           # ボタン・入力など汎用部品(shadcn/ui 等)
  layout/       # ヘッダー・サイドバーなどアプリ枠
  features/     # 機能単位( user-table/, auth-form/ など)
    user-table/
      user-table.tsx
      use-user-filter.ts   # ロジックを Hook に分離`}</code>
      </pre>
      <p>ファイル名は PascalCase のコンポーネント名、または kebab-case の機能名など、<Link href="/design/conventions/files">ファイル・ディレクトリの命名</Link>にプロジェクトで統一します。</p>

      <Heading num="まとめ">UXの部品を、コードの部品に落とす</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>責務で切る</h4>
          <p>1コンポーネント1理由。ページ・機能・汎用部品の3層を意識します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>状態と props を決める</h4>
          <p>state の所在と props API を先に決めると、実装がぶれません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>表示とロジックを分ける</h4>
          <p>データを知る層と、見た目だけ描く層を分け、Hook で再利用します。</p>
        </Card>
      </CardGrid>

      <p>設計が固まったら、<Link href="/dev/frontend/react">React</Link>の props・state・composition で具体コードに進みます。部品の見た目ルールは<Link href="/dev/frontend/ux/system">コンポーネントとデザインシステム</Link>、GUI 部品の歴史的背景は<Link href="/design/architecture/app/gui">GUI系</Link>を参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/components/state" tag="フロントエンド">
              コンポーネント別の状態設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/system" tag="フロントエンド">
              コンポーネントとデザインシステム
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react" tag="フロントエンド">
              React
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/props" tag="フロントエンド">
              Propsと一方向データフロー
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/composition" tag="フロントエンド">
              コンポーネントを組み合わせる
            </RelatedLink>
            <RelatedLink href="/design/principles/cohesion" tag="設計">
              保守性の基本4原則
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
