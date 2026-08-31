import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "エラー境界とフォールバックUI" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>エラー境界とフォールバックUI ― 待っている間と、失敗したとき</h1>
        <Lead>
          データを扱うと、画面には成功以外の状態が現れます。ここを設計しないと、真っ白な画面や永遠に回る読み込み表示、あるいはアプリ全体のクラッシュになります。Reactの<Term>エラー境界</Term>と<Term>Suspense</Term>は、それを<Term>境界の位置を決めるだけ</Term>で宣言的に扱う仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">画面には4つの状態がある</Heading>
      <p>
        データを表示する画面は、必ず4つの状態を持ちます。忘れられやすいのは<Term>空</Term>と<Term>失敗</Term>で、この2つが抜けたまま出ると、利用者には「壊れている」としか見えません。
      </p>

      <DiagramFrame
        slug="frontend-react-boundary-states"
        aspect="640 / 300"
        caption="データを表示する画面が持つ4つの状態を並べた図。読み込み中は本来の中身と同じ形のスケルトンを見せる。成功してデータがある場合は本来の表示になる。成功したがデータが0件の場合は、空であることの説明と次にとれる行動を見せる。失敗した場合は原因の要約と再試行の手段を見せる。空と失敗の2つは実装で忘れられやすく、抜けると空のリストだけが残ったり真っ白な画面になったりして、利用者には壊れているようにしか見えない。"
      />

      <table>
        <thead>
          <tr><th>状態</th><th>見せるもの</th><th>忘れるとどうなるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">読み込み中</td><td>本来の形に近いスケルトン</td><td>真っ白な画面が続き、故障に見える</td></tr>
          <tr><td className="hl">成功(データあり)</td><td>本来の表示</td><td>―</td></tr>
          <tr><td className="hl">成功(0件)</td><td>空である説明と、次にとれる行動</td><td>空のリストだけが残り、失敗と区別が付かない</td></tr>
          <tr><td className="hl">失敗</td><td>原因の要約と再試行</td><td>クラッシュ、または永遠に読み込み中のまま</td></tr>
        </tbody>
      </table>

      <p>
        0件のときに<Term>次の行動を促す</Term>のが空状態の設計です。「まだ投稿がありません」で止めず、「最初の1件を書いてみましょう」まで書きます。
      </p>

      <Heading num="02">エラー境界 ― 壊れた枝だけを切り離す</Heading>
      <p>
        描画中に例外が投げられると、<Term>コンポーネントツリー全体が消えます</Term>。小さなカード1つのバグで、画面全体が真っ白になるということです。これを防ぐのがエラー境界で、「自分より下で起きた描画時の例外を受け止め、代わりの表示に差し替える」役割を持ちます。
      </p>
      <p>
        重要なのは<Term>捕まえられる範囲</Term>です。境界は<Term>描画中</Term>の例外専用で、描画が終わったあとに走るコードは対象外です。
      </p>

      <DiagramFrame
        slug="frontend-react-boundary-scope"
        aspect="640 / 300"
        caption="エラー境界が捕まえる範囲と捕まえない範囲を示した図。捕まえるのは描画中に投げられた例外で、コンポーネント本体やフックの初期化で起きたものが該当する。捕まえないのは、イベントハンドラの中で起きた失敗、タイマーや非同期処理の中で起きた失敗、そして境界自身の中で起きた例外である。境界が捕まえない失敗は、その場で受け止めて状態に持ち、画面に表示する必要がある。ボタンを押して保存に失敗したというのは境界の仕事ではない、という区別が実務上いちばん重要になる。"
      />

      <table>
        <thead>
          <tr><th>エラーの発生場所</th><th>境界で捕まるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">描画中(コンポーネント本体・フックの初期化)</td><td><strong>捕まる</strong></td></tr>
          <tr><td className="hl">イベントハンドラの中</td><td>捕まらない</td></tr>
          <tr><td className="hl">タイマーや非同期処理の中</td><td>捕まらない</td></tr>
          <tr><td className="hl">境界自身の中</td><td>捕まらない(親の境界へ上がる)</td></tr>
        </tbody>
      </table>

      <p>
        つまり<Term>「ボタンを押したら保存に失敗した」は境界の仕事ではありません</Term>。ハンドラの中で受け止め、状態に持って、その場でメッセージを出すのが正しい扱いです。
      </p>

      <pre>
        <code>{`export function SaveButton() {
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

      <Aside label="role=&quot;alert&quot; を忘れない">
        エラーメッセージには読み上げ用の役割を付けます。これが無いと、画面には文言が出ているのに読み上げソフトには何も伝わりません。<Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>のライブリージョンの話がそのまま当てはまります。
      </Aside>

      <Heading num="03">Suspense ― 待つ範囲を宣言する</Heading>
      <p>
        Suspenseはエラー境界の読み込み版です。囲んだ範囲の中身がまだ準備できていないとき、<Term>その範囲だけ</Term>を代わりの表示に差し替えます。
      </p>
      <p>
        本質的な効果は、<Term>「読み込み中かどうか」を各コンポーネントが自分で持たなくてよくなる</Term>ことです。真偽値を配り回す代わりに、<Term>どこまでを一緒に待つか</Term>という境界の位置だけを決めます。
      </p>

      <pre>
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

      <p>
        境界の粒度が、そのまま体感速度になります。ページ全体を1つで囲むと<Term>最も遅い1か所に全体が引きずられ</Term>、細かく分けすぎると画面のあちこちが順不同に現れてちらつきます。<Term>意味のあるまとまり</Term>単位で切るのが基本です。
      </p>

      <Heading num="04">境界は置いた階層より下だけを守る</Heading>
      <p>
        エラー境界もSuspenseも、<Term>自分の内側</Term>で起きたことしか扱えません。あるレイアウトを含めて守りたければ、境界はそのレイアウトより外側に置く必要があります。
      </p>
      <p>
        Next.jsではこの配置を<Term>ファイルを置くだけ</Term>で表せます。ルートの階層構造がそのまま境界の入れ子になるので、「どこに置いたか」が「どこまで守るか」に直結します。詳しくは<Link href="/frontend/nextjs-routing">ルーティングとレイアウト</Link>で扱います。
      </p>

      <Heading num="05">投げるか、返すか</Heading>
      <p>
        失敗の扱いは2つに分けると整理できます。この区別が実装方針を決めます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>例</th><th>扱い方</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">予期している失敗</td>
            <td>入力の検証エラー、権限不足、該当なし</td>
            <td><strong>投げず、戻り値として返す</strong>。UIで文言を出す</td>
          </tr>
          <tr>
            <td className="hl">予期していない例外</td>
            <td>接続の断絶、想定外の値、バグ</td>
            <td><strong>投げて境界に任せる</strong></td>
          </tr>
        </tbody>
      </table>

      <p>
        「入力が間違っている」のは<Term>正常な業務フローの一部</Term>であって、異常事態ではありません。異常として扱うと、境界に飛んで画面が差し替わり、利用者は入力内容を失います。同じ理由で「存在しないリソース」も例外ではなく、404という<Term>正しい応答</Term>です。
      </p>

      <Heading num="06">何を見せるか</Heading>
      <table>
        <thead>
          <tr><th>原則</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">例外メッセージをそのまま出さない</td><td>内部構造やクエリの断片は情報漏洩になる</td></tr>
          <tr><td className="hl">必ず次の行動を示す</td><td>再試行・戻る・問い合わせのいずれかを置く</td></tr>
          <tr><td className="hl">識別子を添える</td><td>問い合わせ時にサーバー側のログと突き合わせられる</td></tr>
          <tr><td className="hl">一時的か恒久的かを分ける</td><td>接続断は再試行、権限不足は再試行しても無駄</td></tr>
          <tr><td className="hl">記録を送る</td><td>利用者が報告しないエラーのほうが圧倒的に多い</td></tr>
        </tbody>
      </table>

      <Heading num="07">待たせ方</Heading>
      <p>
        読み込み中の表示は、<Term>本来の中身と同じ大きさ・同じ位置</Term>にするのが原則です。小さな読み込み表示から大きな中身に切り替わると画面がガタッと動き、押そうとしたボタンが逃げます。だから回転するアイコンより<Term>スケルトン</Term>が好まれます。
      </p>

      <Aside label="待ち時間の目安">
        200ミリ秒以内に終わるなら、読み込み表示は出さないほうが滑らかです(出してすぐ消えるとちらつく)。1秒を超えるならスケルトンで構造を見せ、10秒を超えるなら進捗を出すか、そもそも<Term>完了したら通知する</Term>形へ設計を切り替えることを検討します。「待たせない」ことと「待っていると分かるようにする」ことは別の問題です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        境界は建物の防火区画です。火災を完全に防ぐことはできませんが、区画を切っておけば燃えるのは一室だけで済み、他の部屋の人は普段どおり過ごせます。区画が大きすぎればフロア全体が使えなくなり、細かすぎれば扉だらけで歩きにくい。そして「ボタンを押して失敗した」は火災ではなく落とし物なので、区画の話ではなく、その場で拾って渡す仕事になります。
      </Analogy>

      <Heading num="まとめ">境界を置き、状態を4つ揃える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>4状態を必ず設計する</h4>
          <p>空と失敗の抜けが、「壊れて見える画面」を作る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>境界は描画時の例外だけ</h4>
          <p>ハンドラや非同期の失敗は届かない。その場で受け止めて状態に持つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>予期している失敗は返す</h4>
          <p>検証エラーを投げると、画面ごと差し替わって入力内容が消える。</p>
        </Card>
      </CardGrid>

      <p>
        Reactの配下はここまでです。次は、ここで見た境界を階層構造の上に配置していく ―
        <Link href="/frontend/nextjs">Next.js</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/react-boundary" />
    </DocsPage>
  );
}
