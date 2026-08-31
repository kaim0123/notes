import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "フォーム作成時の注意" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>フォーム作成時の注意 ― 入力欄を並べただけでは終わらない</h1>
        <Lead>
          フォームは、Webアプリで<Term>状態が変わる数少ない入口</Term>です。だからこそ、二重送信・再送信・権限・改ざん・保存の一貫性まで、確認すべき点が広く散らばります。実装前に一度通して確かめられるよう、観点を並べます。
        </Lead>
      </Hero>

      <Heading num="01">確認すべき観点</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>代表的な対策</th><th>どちらで守るか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">二重送信</td><td>送信中の無効化と、冪等な受け付け</td><td>両方</td></tr>
          <tr><td className="hl">再送信</td><td>送信後にリダイレクトして表示はGETで行う</td><td>サーバー</td></tr>
          <tr><td className="hl">入力の検査</td><td>形式・範囲・照合。<Link href="/frontend/ux-screen">画面設計と入力チェック</Link>の各種</td><td>両方</td></tr>
          <tr><td className="hl">改ざん</td><td>隠しフィールドの値を信用しない</td><td>サーバー</td></tr>
          <tr><td className="hl">権限</td><td>その利用者がその操作をしてよいかの判定</td><td>サーバー</td></tr>
          <tr><td className="hl">大量アクセス</td><td>回数制限</td><td>サーバー</td></tr>
          <tr><td className="hl">ファイル</td><td>サイズ・実体・保存先の検査</td><td>サーバー</td></tr>
          <tr><td className="hl">保存の一貫性</td><td>複数更新をまとめる</td><td>サーバー</td></tr>
          <tr><td className="hl">失敗時の入力保持</td><td>値を返して再表示する</td><td>両方</td></tr>
          <tr><td className="hl">アクセシビリティ</td><td>ラベルの関連付け、キーボード操作、エラーの通知</td><td>フロント</td></tr>
        </tbody>
      </table>

      <p>
        表を見て分かるとおり、<Term>大半はサーバー側の責任</Term>です。フロントエンドでできるのは体験を良くすることまでで、守ることはできません。この線引きが曖昧なままだと、「フロントで検査しているから大丈夫」という危険な思い込みが生まれます。
      </p>

      <Heading num="02">二重送信と再送信</Heading>
      <p>
        送信ボタンを連打すると、同じリクエストが複数回届きます。フロント側では送信中にボタンを無効化しますが、<Term>それだけでは防げません</Term>。回線の遅延、タブの復帰、開発者ツールからの直接送信 ― 抜け道はいくらでもあります。
      </p>

      <DiagramFrame
        slug="frontend-ux-form-flow"
        aspect="640 / 320"
        caption="フォーム送信の経路と、二重送信への対策を示した図。上段は連打された場合で、同じ内容の送信が2回サーバーに届く。サーバーは冪等キーを見て、1回目は処理し2回目は同じ結果を返すだけにするため、二重登録にならない。下段は送信後の再読み込みへの対策で、POSTを処理したあとリダイレクトを返し、表示はGETで行う。こうすると再読み込みで繰り返されるのはGETだけになり、意図しない再送信が起きない。フロント側の無効化は体験のための一次対策で、サーバー側の冪等性が本体である。"
      />

      <Steps>
        <li>
          フロント: 送信開始と同時にボタンを無効化し、処理中であることを表示する
        </li>
        <li>
          フロント: 送信ごとに一意なキーを添える(同じ送信の再試行では同じキーを使う)
        </li>
        <li>
          サーバー: キーが既に処理済みなら、もう一度実行せず同じ結果を返す(<Term>冪等</Term>)
        </li>
        <li>
          サーバー: 処理後はリダイレクトを返し、結果表示はGETで行う
        </li>
      </Steps>

      <p>
        4番目が<Term>送信後の再読み込み</Term>への対策です。POSTのまま結果を表示すると、利用者が再読み込みした瞬間に同じPOSTが飛びます。リダイレクトを挟めば、繰り返されるのはGETだけになります。
      </p>

      <Heading num="03">信用してよい値、してはいけない値</Heading>
      <p>
        ブラウザから届く値は<Term>すべて利用者が書き換えられる</Term>という前提に立ちます。とくに事故が多いのが隠しフィールドです。
      </p>

      <table>
        <thead>
          <tr><th>値</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">価格・数量の合計</td><td>再計算する。送られてきた金額をそのまま使わない</td></tr>
          <tr><td className="hl">ユーザーID・所有者</td><td>セッションから取る。フォームの値は使わない</td></tr>
          <tr><td className="hl">権限・ロール</td><td>サーバー側で引き直す</td></tr>
          <tr><td className="hl">選択肢の値</td><td>許容される集合に含まれるか照合する</td></tr>
          <tr><td className="hl">遷移元・戻り先URL</td><td>自サイト内かを検証する(外部への誘導に悪用される)</td></tr>
        </tbody>
      </table>

      <Aside label="⚠️ 検査と認可は別物">
        入力が形式的に正しいこと(検査)と、その人がその操作をしてよいこと(認可)は別の話です。他人のIDを指定した正しい形式のリクエストは、検査をすべて通過します。<Term>対象ごとに、その利用者が触れてよいかを毎回確かめる</Term>必要があります。攻撃の原理そのものはセキュリティセクションの担当です。
      </Aside>

      <Heading num="04">失敗したときに何を残すか</Heading>
      <p>
        フォームの品質は、成功したときではなく<Term>失敗したときに現れます</Term>。
      </p>

      <table>
        <thead>
          <tr><th>やること</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力値を保持して返す</td><td>空に戻されると、長いフォームほど離脱する</td></tr>
          <tr><td className="hl">エラーを該当欄の近くに出す</td><td>上部にまとめるだけでは、どこを直すか分からない</td></tr>
          <tr><td className="hl">最初のエラー欄へフォーカスを移す</td><td>画面外にエラーがあると気付けない</td></tr>
          <tr><td className="hl">原因と直し方を書く</td><td>「不正な値です」では何をすればよいか分からない</td></tr>
          <tr><td className="hl">色以外でも示す</td><td>アイコンと文言を添える</td></tr>
        </tbody>
      </table>

      <p>
        検査の実行タイミングも体験に効きます。入力中に逐一赤くするのは煩わしく、送信時にまとめて出すのは遅い。実務では<Term>欄を離れたときに初めて検査し、以後は入力のたびに更新する</Term>方式が落としどころとしてよく使われます。
      </p>

      <Heading num="05">ファイル・保存・回数制限</Heading>
      <p>
        ファイルの受け取りでは、拡張子だけでなく<Term>実体</Term>と<Term>サイズ上限</Term>を確かめ、保存先は公開ディレクトリの外に置きます。名前もそのまま使わず、こちらで採番します。
      </p>
      <p>
        複数のテーブルを更新する処理は<Link href="/database/transaction">トランザクション</Link>でまとめ、途中で失敗しても中途半端なデータが残らないようにします。ログインや問い合わせのように悪用されやすい入口には、回数制限を設けます。
      </p>

      <Analogy label="💡 たとえるなら">
        フォームは受付カウンターです。入口で書類の不備を指摘し(検査)、整理券で同じ用紙の二重提出を防ぎ(冪等とリダイレクト)、窓口の裏で本人確認と記録を行い(認可と保存)、混雑時は列を制限します(回数制限)。見える部分だけ整えても、裏が抜けていれば事故になります。
      </Analogy>

      <Heading num="まとめ">フロントは体験、サーバーは防御</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>抑止と冪等性はセット</h4>
          <p>無効化は一次対策。二重実行を無害にするのはサーバーの仕事。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>届いた値は全部疑う</h4>
          <p>金額も所有者も権限もサーバーで引き直す。検査と認可は別物。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>失敗しても入力を失わせない</h4>
          <p>値の保持、該当欄への表示、フォーカス移動。ここに品質が出る。</p>
        </Card>
      </CardGrid>

      <p>
        Reactでの実装は<Link href="/frontend/react-forms">フォームの値を管理する</Link>で扱います。次は、ブラウザ向けの見せ方をまとめた<Link href="/frontend/ux-web">Web UIデザイン</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-form" />
    </DocsPage>
  );
}
