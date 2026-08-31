import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンポーネントと状態" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネントと状態 ― どこで切り、どこに置くか</h1>
        <Lead>
          <Link href="/frontend/ux-system">デザインシステム</Link>で「どんな部品が要るか」を決めたら、次はそれを<Term>コードの単位に落とす</Term>作業です。決めることは2つ ― どこで切るか(分割)と、状態をどこに置くか(所在)。この2つは独立ではなく、<Term>状態の置き場所が分割の位置を決める</Term>という関係にあります。
        </Lead>
      </Hero>

      <Heading num="01">なぜ分割するのか</Heading>
      <p>
        画面全体を1つの関数に書くと、変更のたびに全体を読み直し、同じパターンをコピーしてばらけさせ、テストも難しくなります。分割の目的は3つです。
      </p>

      <table>
        <thead>
          <tr><th>目的</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再利用</td><td>同じ部品を複数画面で使い回せる</td></tr>
          <tr><td className="hl">変更の局所化</td><td>ボタンの見た目を変えるとき、その部品だけ直せばよい</td></tr>
          <tr><td className="hl">読みやすさとテスト</td><td>小さな単位で「この入力ならこの出力」を確かめられる</td></tr>
        </tbody>
      </table>

      <p>
        判断基準は<Link href="/design/principles-cohesion">凝集度と結合度</Link>と同じです。1つのコンポーネントは<Term>1つの理由で変更される</Term>粒度を目指し、外との依存は少ないほどよい ― 設計原則がそのまま当てはまります。
      </p>

      <Heading num="02">3つの層で切る</Heading>
      <p>
        「小さすぎる」と受け渡しが増え、「大きすぎる」と再利用もテストもできません。実務では次の3層で切ることが多くなります。
      </p>

      <DiagramFrame
        slug="frontend-components-layers"
        aspect="640 / 320"
        caption="コンポーネントを3つの層に分け、それぞれが何を知っているかを示した図。いちばん上がページで、URL1つ分に対応し、データ取得と画面全体の状態を持つ。中間が機能ブロックで、画面内の独立した機能単位にあたり、渡された値を扱うがデータの取得元は知らない。いちばん下が汎用部品で、ボタンや入力欄のようにプロダクト横断で使われ、状態を持たず外から渡された値だけで描画する。右側に、上へ行くほど固有の事情を知り、下へ行くほど何も知らない、という軸が示されている。状態は原則として上の層が持ち、下へは値と通知だけを渡す。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>役割</th><th>知っていること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ページ</td><td>URL 1つ分。データ取得の入口とレイアウト</td><td>どこからデータを取るか、画面全体の状態</td></tr>
          <tr><td className="hl">機能ブロック</td><td>画面内の独立した機能単位</td><td>渡された値の扱い方。取得元は知らない</td></tr>
          <tr><td className="hl">汎用部品</td><td>プロダクト横断で使うUI部品</td><td>見た目と操作の通知だけ</td></tr>
        </tbody>
      </table>

      <p>
        <Link href="/frontend/ux-system">Atomic Design</Link>の粒度は<Term>見た目</Term>の分類でした。こちらは<Term>何を知っているか</Term>の分類で、軸が違います。迷ったときは「この塊を別の画面でもそのまま使えるか」で切ります。
      </p>

      <Analogy label="💡 たとえるなら">
        コンポーネント設計は引き出しの整理です。箸・スプーン・包丁(汎用部品)を混ぜずに置き、朝食セット(機能ブロック)としてまとめ、食事全体(ページ)の流れが自然になるよう配置します。引き出しが1つに全部入っていると、箸1本を替えるのにも全体をひっくり返すことになります。
      </Analogy>

      <Heading num="03">状態の所在 ― 最も近い共通の祖先へ</Heading>
      <p>
        最も迷いやすいのが状態の置き場所です。原則は1つで、<Term>その状態を必要とするコンポーネントのうち、最も近い共通の祖先に置く</Term>。これより上に置けば無関係な部分まで再描画され、下に置けば必要なところへ届きません。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力中のフォーム値</td><td>フォーム全体を束ねる親、またはフォームの管理層</td></tr>
          <tr><td className="hl">モーダルの開閉</td><td>開くボタンとモーダル本体の共通の親</td></tr>
          <tr><td className="hl">サーバーから取った一覧</td><td>ページ、またはデータ取得を担う層</td></tr>
          <tr><td className="hl">テーマ・ログインユーザー</td><td>アプリ全体 ― <Link href="/frontend/react-context">Context</Link>や外部ストア</td></tr>
        </tbody>
      </table>

      <p>
        言い換えると、<Term>汎用部品は状態を持たない</Term>のが基本です。ボタンもダイアログも、外から渡された値で描き、操作があったことを通知するだけ。持たせた瞬間に、その部品は特定の使い方に縛られます。
      </p>

      <Heading num="04">propsは取扱説明書</Heading>
      <p>
        コンポーネントの外向きの面がpropsです。ここが雑だと、使う側が内部実装を読む羽目になります。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">最小限にする</td><td>本当に外から変えたいものだけ公開する。内部の都合は隠す</td></tr>
          <tr><td className="hl">意味のある名前</td><td><code>isOpen</code>・<code>onClose</code>・<code>items</code>。<Link href="/design/conventions-functions">命名規約</Link>と同じ考え方</td></tr>
          <tr><td className="hl">状態は数えられる形に</td><td>真偽値を並べるより、取りうる値を1つの列挙にまとめる</td></tr>
          <tr><td className="hl">合成を許す</td><td>中身を差し替えられるようにしておくと、分岐が増えない</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`// ✗ 見た目の都合で真偽値が増殖し、矛盾した組み合わせも作れてしまう
<Button primary large rounded shadow />

// ○ 取りうる値を列挙にまとめる ― 矛盾した状態を表現できなくする
<Button variant="primary" size="lg" />`}</code>
      </pre>

      <Aside label="真偽値の増殖が悪い理由">
        真偽値が4つあれば、組み合わせは16通りです。そのうち意味があるのは数通りで、残りは<Term>表現できてしまうが定義されていない状態</Term>になります。列挙にまとめると、存在しない組み合わせをそもそも書けなくなります。<Link href="/language/js-types">型を使いこなす</Link>で見た「不正な状態を表現不能にする」の実践例です。
      </Aside>

      <Heading num="05">データを知る層と、知らない層</Heading>
      <p>
        分割のもう1つの軸が<Term>データを知っているか</Term>です。見た目だけを担う部品はpropsを受け取ってJSXを返すだけにし、データ取得や状態更新は別の層に置きます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>知っていること</th><th>知らないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">表示に徹する層</td><td>見た目・レイアウト・操作の通知</td><td>APIのURL、ストアの構造</td></tr>
          <tr><td className="hl">データを扱う層</td><td>データの取得元、業務ルール、状態の更新</td><td>ボタンの角丸や余白</td></tr>
        </tbody>
      </table>

      <p>
        ファイルを必ず2つに分ける必要はありません。「このコンポーネントはデータを知っているか」という問いで責務を切ると、<Term>テストしやすい表示部品が残る</Term>のが要点です。ロジックだけを<Link href="/frontend/react-logic-reuse">カスタムフックに抜き出す</Link>方法も、この2層の中間として使われます。Next.jsでの<Link href="/frontend/nextjs-components">サーバーとクライアントの境界</Link>も、同系統の分け方です。
      </p>

      <Heading num="まとめ">状態の所在が分割を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>3層で切る</h4>
          <p>ページ・機能ブロック・汎用部品。軸は「何を知っているか」。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>汎用部品は状態を持たない</h4>
          <p>持たせた瞬間に、特定の使い方へ縛られる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>propsは矛盾を作れない形に</h4>
          <p>真偽値を並べず、取りうる値を列挙にまとめる。</p>
        </Card>
      </CardGrid>

      <p>
        配下では、部品ごとの具体的な判断を<Link href="/frontend/components-state">コンポーネント別の状態設計</Link>で、アプリ全体の状態の分類と道具選びを<Link href="/frontend/state">状態管理設計</Link>で扱います。
      </p>

      <DocsFooter href="/frontend/components" />
    </DocsPage>
  );
}
