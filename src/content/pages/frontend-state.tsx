import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "状態管理設計" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>状態管理設計 ― 分類が先、道具は後</h1>
        <Lead>
          「状態管理」と聞くとライブラリ選びの話に聞こえますが、実際に効くのは<Term>状態を種類で分けること</Term>です。種類が分かれば置き場所が決まり、置き場所が決まれば道具は自動的に決まります。逆に分類せずに道具から入ると、サーバーのデータをグローバルストアに全部載せる、といった構成になります。
        </Lead>
      </Hero>

      <Heading num="01">5種類に分ける</Heading>
      <p>
        フロントエンドの「状態」は1種類ではありません。まず<Term>何の状態か</Term>で分けます。
      </p>

      <DiagramFrame
        slug="frontend-state-kinds"
        aspect="640 / 320"
        caption="フロントエンドの状態を5種類に分けた図。1つ目はUI状態で、モーダルの開閉や選択中のタブなど画面の見え方に関するもので、サーバーには保存しない。2つ目はサーバー状態で、APIやデータベースから取得したデータであり、正本はサーバー側にあってクライアントは写しを持つだけ。3つ目はURL状態で、検索条件やページ番号など共有と再現をしたいもの。4つ目はフォーム状態で、入力途中の値と検証結果であり、送信が済めばサーバー状態へ移る。5つ目はグローバル状態で、ログインユーザーやテーマなどアプリ全体で長く保つもの。それぞれ置き場所と道具が違い、1つのライブラリに全部を載せる必要はない。"
      />

      <table>
        <thead>
          <tr><th>種類</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">UI状態</td><td>画面の見え方・操作の一時的な状態</td><td>モーダルの開閉、選択中タブ</td></tr>
          <tr><td className="hl">サーバー状態</td><td>APIやDBから取得したデータ。正本はサーバー</td><td>ユーザー一覧、商品詳細、在庫数</td></tr>
          <tr><td className="hl">URL状態</td><td>共有・再現・戻る操作と連動させる状態</td><td>検索キーワード、ページ番号、フィルタ</td></tr>
          <tr><td className="hl">フォーム状態</td><td>入力途中の値・検証・送信。完了後はサーバー側へ移る</td><td>登録フォーム、編集中のデータ</td></tr>
          <tr><td className="hl">グローバル状態</td><td>アプリ全体で長く保持するクライアント側の文脈</td><td>ログインユーザー、テーマ、言語、カート</td></tr>
        </tbody>
      </table>

      <p>
        分類を誤ると具体的な形で困ります。サーバーから取った一覧を手動の状態に入れると、再取得・キャッシュ・読み込み表示・エラーをすべて自分で書くことになります。逆にモーダルの開閉をグローバルストアに載せると、開くたびに無関係な購読が走ります。
      </p>

      <Heading num="02">サーバー状態は「持つ」のではなく「写す」</Heading>
      <p>
        5つのうち最も扱いを間違えやすいのがサーバー状態です。要点は1つ ― <Term>正本はサーバーにあり、クライアントが持つのは写し(キャッシュ)にすぎない</Term>という見方に切り替えることです。
      </p>

      <table>
        <thead>
          <tr><th>課題</th><th>自分で書くと</th><th>専用の層に任せると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">重複取得</td><td>同じAPIを複数箇所が別々に叩く</td><td>キーが同じなら1回にまとまる</td></tr>
          <tr><td className="hl">鮮度</td><td>いつ再取得するかを都度判断する</td><td>古くなる時間や再取得の条件を宣言する</td></tr>
          <tr><td className="hl">更新後の整合性</td><td>関連する取得を手で呼び直す</td><td>キーを指定して一括で無効化する</td></tr>
          <tr><td className="hl">読み込み・エラー</td><td>各所で同じ真偽値を複製する</td><td>取得の結果として返ってくる</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`// サーバー状態は「ストアにコピー」ではなく、キャッシュ層に任せる
const { data, isLoading, error } = useQuery({
  queryKey: ["users", filters],
  queryFn: () => fetchUsers(filters),
});

// 更新したら、関連するキャッシュを無効化して取り直させる
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
});`}</code>
      </pre>

      <p>
        この見方に立つと、<Term>グローバルストアにAPIのレスポンスを載せる理由がなくなります</Term>。ストアに残る必要があるのは、サーバーが知らないクライアント固有の文脈だけです。
      </p>

      <Heading num="03">URL状態 ― 忘れられがちな置き場所</Heading>
      <p>
        <Term>共有できる・リロードで復元する・戻るボタンが効く</Term>という3つを同時に満たすのはURLだけです。これらが要る状態を通常の状態に閉じ込めると、あとから取り返せません。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>載せる場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">検索語・並び順・ページ番号</td><td>クエリパラメータ</td></tr>
          <tr><td className="hl">リソースの識別子</td><td>パス</td></tr>
          <tr><td className="hl">画面の主要な切り替えになるタブ</td><td>パスまたはクエリ</td></tr>
          <tr><td className="hl">入力途中の値</td><td>URLには載せない</td></tr>
          <tr><td className="hl">モーダルの開閉</td><td>原則載せない。ただし直接リンクしたい詳細表示なら載せる</td></tr>
        </tbody>
      </table>

      <p>
        URLに載せる利点はもう1つあります。<Term>サーバー側で初期データを取れる</Term>ことです。検索条件がURLにあれば、最初のHTMLに結果を含めて返せます。状態の中にあると、画面が表示されてから取りに行くしかありません。
      </p>

      <Heading num="04">クライアント全体で共有する状態</Heading>
      <p>
        複数画面・深い階層で共有する<Term>クライアント側の</Term>状態だけが、いわゆるグローバル状態管理の対象です。選び分けの軸は2つ ― <Term>更新頻度</Term>と<Term>購読範囲</Term>。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>向くケース</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">親へ持ち上げて渡す</td><td>共有範囲が1画面で済む</td><td>受け渡しが深くなる前に次の手を検討する</td></tr>
          <tr><td className="hl">Context</td><td>テーマ・認証・言語など更新頻度が低い</td><td>1つに詰め込むと再描画が広がる</td></tr>
          <tr><td className="hl">軽量な外部ストア</td><td>中規模。必要な部分だけ購読したい</td><td>書く量が少なく、実務でよく使われる</td></tr>
          <tr><td className="hl">本格的なストア</td><td>更新フローが複雑で、履歴を追跡したい</td><td>小さなアプリには過剰になりやすい</td></tr>
        </tbody>
      </table>

      <p>
        <Term>1つのライブラリに全部を載せる必要はありません</Term>。めったに変わらない値はContext、頻繁に変わり複数画面から触る値は外部ストア、サーバー由来の一覧はキャッシュ層 ― この混在が普通の姿です。
      </p>

      <Aside label="Contextは状態管理ではなく配送手段">
        Contextがやっているのは<Term>値を深い階層まで運ぶこと</Term>だけで、更新の最適化は何もしていません。値が変わればその配下は全部再描画されます。だから「更新頻度が低いもの」に向く、という言い方になります。ここを取り違えると、Contextに載せたのに遅い、という結果になります。
      </Aside>

      <Heading num="05">サーバーとクライアントの境界</Heading>
      <p>
        サーバー側で描く仕組みを使う場合、「どこで状態を持てるか」に境界が加わります。サーバー側で実行される部分は状態を持てず、リクエストごとに動きます。
      </p>

      <table>
        <thead>
          <tr><th>やりたいこと</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">初回表示用のデータ</td><td>サーバー側で取得する</td></tr>
          <tr><td className="hl">クリック・入力への反応</td><td>クライアント側のUI状態</td></tr>
          <tr><td className="hl">更新の実行</td><td>サーバー側の処理 + キャッシュの無効化</td></tr>
          <tr><td className="hl">送信中の先行表示</td><td>クライアント側で一時的に見せ、確定したら差し替える</td></tr>
        </tbody>
      </table>

      <p>
        詳しくは<Link href="/frontend/nextjs-components">Server/Clientコンポーネントの境界</Link>と<Link href="/frontend/nextjs-data">データフェッチ・キャッシュ・再検証</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        状態管理設計は倉庫の使い分けです。冷蔵(すぐ使うUI状態)、常温倉庫(クライアントの共有状態)、外部の配送センター(サーバー)、そして店先の看板(URL)。全部を1つの巨大な冷凍庫に入れると、何かを取り出すたびに全体を開け閉めすることになります。
      </Analogy>

      <Heading num="06">迷ったときの順序</Heading>
      <Steps>
        <li>
          <strong>サーバーが正本か</strong> ― API・DB由来ならキャッシュ層へ。グローバルストアには載せない
        </li>
        <li>
          <strong>URLに載せるべきか</strong> ― 共有・再現・戻るを効かせたいならクエリやパスへ
        </li>
        <li>
          <strong>入力フォームか</strong> ― 複雑ならフォームの管理層へ。送信後はサーバー状態に移る
        </li>
        <li>
          <strong>共有範囲はどこまでか</strong> ― 1コンポーネント / 1画面 / アプリ全体で置き場所が変わる
        </li>
        <li>
          <strong>更新頻度はどれくらいか</strong> ― 高頻度で広範囲なら外部ストア、低頻度ならContextで足りる
        </li>
      </Steps>

      <p>
        この順で決めると、「とりあえず大きなストアに載せる」と「全部その場の状態にする」の両方を避けられます。
      </p>

      <Heading num="まとめ">種類で分ければ、道具は決まる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず5種類に分ける</h4>
          <p>UI・サーバー・URL・フォーム・グローバル。混同が設計を壊す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>サーバー状態は写しにすぎない</h4>
          <p>正本はサーバー。キャッシュ層に任せ、ストアには載せない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>URLも置き場所のひとつ</h4>
          <p>共有・復元・戻るが要るなら、状態ではなくURLへ。</p>
        </Card>
      </CardGrid>

      <p>
        コンポーネントと状態の配下はここまでです。次は、ここまでの設計を実際に書くための道具 ―
        <Link href="/frontend/react">React</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/state" />
    </DocsPage>
  );
}
