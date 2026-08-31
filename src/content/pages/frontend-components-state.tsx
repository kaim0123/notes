import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンポーネント別の状態設計" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネント別の状態設計 ― 部品ごとの判断</h1>
        <Lead>
          原則は<Link href="/frontend/components">最も近い共通の祖先に置く</Link>で尽きていますが、実装では「ボタンのホバーは状態か」「モーダルの開閉は誰が持つか」「本文だけスクロールさせるには」といった<Term>部品ごとの判断</Term>が要ります。ここを毎回考え直さずに済むよう、代表的な部品について整理します。
        </Lead>
      </Hero>

      <Heading num="01">まず4つに分ける</Heading>
      <p>
        部品の状態は、次の4分類で考えるとぶれません。<Term>そもそもReactの状態が要るのか</Term>は、この表でほぼ決まります。
      </p>

      <DiagramFrame
        slug="frontend-components-state-4"
        aspect="640 / 300"
        caption="部品の状態を4つの層に分けた図。いちばん下がCSSで、ホバーやアクティブやフォーカスといった視覚的な反応を担い、Reactの状態は不要。その上がヘッドレスなプリミティブの内部で、ツールチップの表示やメニューの展開、フォーカストラップを担い、これも原則として自分で状態を持つ必要はない。その上が共通の親で、モーダルの開閉やタブの選択、フォームの値、行の選択など、画面や機能に依存するものを持つ。いちばん上がアプリ横断で、テーマやサイドバーの折りたたみ、ログインユーザーをContextやCookieで持つ。下の2層で済むものを上へ持ち上げないことが要点。"
      />

      <table>
        <thead>
          <tr><th>分類</th><th>例</th><th>置き場所</th><th>Reactの状態</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">視覚的な反応</td><td>ホバー、押下中、フォーカス</td><td>CSSの擬似クラス</td><td>不要</td></tr>
          <tr><td className="hl">一時的なUI状態</td><td>ツールチップ表示、メニュー展開、フォーカストラップ</td><td>プリミティブの内部</td><td>原則不要</td></tr>
          <tr><td className="hl">画面・機能に依存</td><td>モーダル開閉、タブ選択、フォーム値、行選択</td><td>共通の親またはページ</td><td>必要</td></tr>
          <tr><td className="hl">アプリ横断</td><td>テーマ、サイドバー折りたたみ、ログインユーザー</td><td>Context / Cookie / 外部ストア</td><td>必要</td></tr>
        </tbody>
      </table>

      <p>
        <Term>下の2層で済むものを上へ持ち上げない</Term>のが要点です。ホバーを状態で追跡すると、マウスを動かすたびに再描画が走ります。CSSに任せれば0回です。
      </p>

      <Heading num="02">ボタン・バッジ・リンク ― 状態を持たない</Heading>
      <p>
        操作を促す最小単位の部品は、原則として<Term>状態を持ちません</Term>。外から渡す値とCSSだけで足ります。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ホバー・押下・フォーカス</td><td>CSS。状態でホバーを追跡しない</td></tr>
          <tr><td className="hl">無効</td><td>props。親が非同期処理の結果などから決める</td></tr>
          <tr><td className="hl">処理中</td><td>props。無効化と読み込み表示をセットにする</td></tr>
          <tr><td className="hl">種類・サイズ</td><td>props。真偽値を並べず、列挙で1つにまとめる</td></tr>
          <tr><td className="hl">メニューを開いている見た目</td><td>プリミティブが付ける属性をCSSで拾う</td></tr>
        </tbody>
      </table>

      <p>
        最後の行が地味に効きます。「開いているときだけ背景を変える」ために状態を持つ必要はなく、プリミティブが付ける属性をCSSのセレクタで拾えば済みます。<Term>DOMに既にある情報を、状態として二重に持たない</Term>ということです。
      </p>

      <Heading num="03">入力部品 ― 値の所在を決める</Heading>
      <p>
        入力部品は<Term>値を誰が持つか</Term>が設計の中心です。見た目のフォーカスはCSS、値と検証は親またはフォームの管理層が担います。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>扱い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力値</td><td>親が持つか(<Term>制御</Term>)、DOMに持たせるか(<Term>非制御</Term>)を設計段階で決める</td></tr>
          <tr><td className="hl">検証結果</td><td>propsで受け取り、CSSでエラー表示に反映する</td></tr>
          <tr><td className="hl">フォーカスの見た目</td><td>CSS</td></tr>
          <tr><td className="hl">ラベルとエラー文言</td><td>入力欄単体ではなく、それを包む層の責務</td></tr>
        </tbody>
      </table>

      <p>
        入力部品そのものは<Term>値を透過する薄いラッパー</Term>に留めるのが定石です。ここに検証ロジックを持たせると、同じ入力欄を別の規則で使えなくなります。フォーム全体の扱いは<Link href="/frontend/react-forms">フォームの値を管理する</Link>で扱います。
      </p>

      <Heading num="04">モーダル ― 開閉と中身を分ける</Heading>
      <p>
        オーバーレイ系は<Term>開閉</Term>と<Term>内部レイアウト</Term>を分けて設計します。
      </p>

      <table>
        <thead>
          <tr><th>層</th><th>状態</th><th>誰が持つか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開閉</td><td>開いているか、閉じる要求</td><td>開くボタンと本体の<strong>共通の親</strong></td></tr>
          <tr><td className="hl">操作性</td><td>フォーカストラップ、Escで閉じる、背景のスクロール固定</td><td>プリミティブの内部</td></tr>
          <tr><td className="hl">アニメーション</td><td>表示・非表示の遷移</td><td>CSS(状態を表す属性を拾う)</td></tr>
          <tr><td className="hl">本文スクロール</td><td>中身が長いときの扱い</td><td>子の構成 + CSS</td></tr>
        </tbody>
      </table>

      <p>
        中身が多いときは、モーダル<Term>全体</Term>ではなく<Term>本文だけ</Term>をスクロールさせます。ヘッダーとフッターを固定し、中間だけを可動にする構成です。
      </p>

      <pre>
        <code>{`DialogContent   ← 最大高さを指定し、縦方向のflexにする
├── Header      ← 縮まない(固定)
├── Body        ← flex-1 + overflow-y-auto(ここだけスクロール)
└── Footer      ← 縮まない(固定)`}</code>
      </pre>

      <Aside label="スクロール固定を自前でやらない">
        モーダルを開いたときに背景がスクロールしないようにする処理を自前で書くと、モバイルでの挙動、スクロールバーの幅による横ずれ、入れ子で開いたときの復帰順序 ― どれも自分で面倒を見ることになります。プリミティブが持っている機能なので、任せるのが確実です。
      </Aside>

      <Heading num="05">ドロップダウン・ポップオーバー ― 結果だけ知る</Heading>
      <p>
        位置計算・開閉・フォーカス移動はプリミティブに任せ、親は<Term>選択結果</Term>だけ知れば足りることがほとんどです。
      </p>

      <table>
        <thead>
          <tr><th>部品</th><th>基本</th><th>親が開閉を持つケース</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メニュー</td><td>非制御。項目を選んだら親に通知するだけ</td><td>外部のボタンから開きたいとき</td></tr>
          <tr><td className="hl">ポップオーバー</td><td>中にフォームがあるなら開閉を親が持つことも</td><td>「適用」で閉じる、外側クリックで確定</td></tr>
          <tr><td className="hl">ツールチップ</td><td>非制御。ホバーとフォーカスで自動表示</td><td>案内表示で強制的に出したいとき</td></tr>
        </tbody>
      </table>

      <p>
        項目が画面からはみ出す場合も、利用可能な高さをプリミティブが計算してくれるので、<Term>高さをJSで手計算する必要はありません</Term>。
      </p>

      <Heading num="06">タブと開閉ブロック ― URLと繋ぐか</Heading>
      <p>
        表示を切り替える部品は、開いているか / どれが選ばれているかを外から渡せるようにしておくのが基本です。判断が必要なのは1点だけ ― <Term>それをURLに載せるか</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>状況</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1項目の開閉(よくある質問など)</td><td>部品の内部で十分</td></tr>
          <tr><td className="hl">1つだけ開くアコーディオン</td><td>親が「いま開いているもの」を持つ</td></tr>
          <tr><td className="hl">画面の主要な切り替えになるタブ</td><td>URLに載せる。共有・リロード・戻るが効くようになる</td></tr>
        </tbody>
      </table>

      <p>
        最後の判断を後回しにすると、あとから「このタブのリンクを共有したい」と言われた時点で作り直しになります。<Term>この画面を再現したいか</Term>を先に問うておく価値があります。
      </p>

      <Heading num="07">複数の状態が絡む部品 ― Contextで包む</Heading>
      <p>
        サイドバーのように複数の状態が絡む部品は、内部でまとめて持ち、外へは<Term>意味のある操作だけ</Term>を公開します。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>用途</th><th>永続化</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開いているか</td><td>デスクトップでの折りたたみ</td><td>Cookie(サーバー側でも読めるため、ちらつかない)</td></tr>
          <tr><td className="hl">モバイルで開いているか</td><td>重ねて表示する形式</td><td>しない</td></tr>
          <tr><td className="hl">表示形態</td><td>CSSで使う派生値</td><td>不要(上の値から計算する)</td></tr>
          <tr><td className="hl">モバイルかどうか</td><td>表示形式の切り替え</td><td>不要</td></tr>
        </tbody>
      </table>

      <p>
        子には「切り替える」という操作だけを渡し、生の値を深い階層まで運ばないようにすると結合度が下がります。<Term>派生できる値を状態として持たない</Term>のも重要で、上の表の3行目のように計算で出せるものを別の状態にすると、必ずどこかでずれます。
      </p>

      <Analogy label="💡 たとえるなら">
        部品の状態設計は分電盤です。ボタンや入力欄はコンセント(つなぐだけ)、モーダルのフォーカストラップは配線側の安全装置(プリミティブの内部)、ページの状態は部屋ごとのスイッチ、Contextは建物全体のブレーカー。全部を1つの巨大なスイッチにまとめると、電気を1つ消すだけで建物全体が暗くなります。
      </Analogy>

      <Heading num="08">判断の手順</Heading>
      <Steps>
        <li>
          <strong>他のコンポーネントもこの値を知る必要があるか</strong> ― 不要ならCSSかプリミティブの内部で終わり
        </li>
        <li>
          <strong>ページを離れたら消えてよいか</strong> ― よくないならURL・Cookie・ストアへ
        </li>
        <li>
          <strong>他の値から計算できないか</strong> ― できるなら状態にせず、その場で導出する
        </li>
        <li>
          <strong>外から制御できる必要があるか</strong> ― 汎用部品なら、渡されたときはそれを使い、無ければ内部で持つ形にする
        </li>
      </Steps>

      <Heading num="まとめ">下の層で済むものを持ち上げない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ホバーはCSS</h4>
          <p>DOMや擬似クラスが持っている情報を、状態として二重に持たない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>開閉は親、操作性はプリミティブ</h4>
          <p>フォーカストラップもスクロール固定も自前で書かない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>派生できる値は状態にしない</h4>
          <p>計算で出せるものを別に持つと、必ずどこかでずれる。</p>
        </Card>
      </CardGrid>

      <p>
        次は視点を上げて、アプリ全体の状態をどう分類し、どの道具を選ぶか ―
        <Link href="/frontend/state">状態管理設計</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/components-state" />
    </DocsPage>
  );
}
