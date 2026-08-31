import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Context" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Context ― 配るための機構であって、管理する道具ではない</h1>
        <Lead>
          <Link href="/frontend/react-props">props</Link>は隣接する親子でしか渡せず、深い子に値を届けるには全階層を経由する必要がありました。Contextはこの中間層を飛ばし、<Term>必要な子が直接読みに行く</Term>ための機構です。押さえるべきは、これが<Term>配送手段であって状態管理ではない</Term>という点です。
        </Lead>
      </Hero>

      <Heading num="01">3つのステップ</Heading>
      <p>
        入れ物を作り、上位で値を渡し、下位で読む ― これだけです。間にいるコンポーネントは、値を素通しする記述を一切書かずに済みます。
      </p>

      <pre>
        <code>{`type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");   // ① 入れ物

function App() {
  return (
    <ThemeContext.Provider value="dark">              {/* ② 値を配る */}
      <Layout />   {/* Layout は theme を素通ししなくてよい */}
    </ThemeContext.Provider>
  );
}

function Badge() {
  const theme = useContext(ThemeContext);             // ③ 直接読む
  return <span className={theme}>Badge</span>;
}`}</code>
      </pre>

      <p>
        値を配る側と読む側の間に階層がいくつあっても関係ありません。読む側から見て<Term>上のほうにある一番近い提供元</Term>の値が返り、提供元が1つも無ければ、入れ物を作るときに指定した既定値が返ります。
      </p>

      <Heading num="02">値が変わると配下が再描画される</Heading>
      <p>
        Contextの最も重要な性質は、<Term>渡した値が変わると、それを読んでいる全員が再描画される</Term>ことです。ここに落とし穴があります。
      </p>

      <DiagramFrame
        slug="frontend-react-context-split"
        aspect="640 / 320"
        caption="Contextを1つにまとめた場合と分割した場合を比べた図。上段では、ログイン中のユーザーと頻繁に変わるカウンタを1つのContextに詰め込んでいる。カウンタだけが変わっても、ユーザーしか読んでいないコンポーネントまで再描画される。下段では、めったに変わらない値と頻繁に変わる値を別のContextに分けている。カウンタが変わっても、ユーザーを読んでいるコンポーネントは再描画されない。Contextには変わった部分だけを配る仕組みがないため、分けることそのものが最適化になる。"
      />

      <pre>
        <code>{`// ✗ 描画のたびに新しいオブジェクト → 中身が同じでも全員が再描画される
<AuthContext.Provider value={{ user, login }}>

// ○ 参照を安定させる
const value = useMemo(() => ({ user, login }), [user, login]);
<AuthContext.Provider value={value}>`}</code>
      </pre>

      <p>
        オブジェクトをその場で作って渡すと、親が再描画されるたびに<Term>毎回別のオブジェクト</Term>になります。中身が同じでも参照が違うので、読んでいる全員が再描画されます。
      </p>

      <Heading num="03">分けることが最適化になる</Heading>
      <p>
        Contextには<Term>「変わった部分だけを配る」仕組みがありません</Term>。1つに詰め込むと、その一部が変わっただけで無関係な読み手まで巻き込まれます。
      </p>
      <p>
        対策は分割です。<Term>めったに変わらないもの</Term>と<Term>頻繁に変わるもの</Term>を別の入れ物にすれば、片方の更新がもう片方に波及しません。状態と更新手段を2つに分けるのは定番の構成で、更新手段だけを読んでいるコンポーネントは<Term>状態がいくら変わっても再描画されなくなります</Term>。
      </p>

      <Aside label="Contextは状態管理ではない">
        Contextがやっているのは<Term>値を深い階層まで運ぶこと</Term>だけです。更新の最適化は何もしていません。「Contextに載せたのに遅い」という相談は、たいていここを取り違えています。細かい粒度で購読を分けたいなら、それを備えた外部ストアの領分です。
      </Aside>

      <Heading num="04">どこまでContextで足りるか</Heading>
      <table>
        <thead>
          <tr><th>状況</th><th>向いている手段</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テーマ・言語・ログイン情報など低頻度</td><td>Contextで十分</td></tr>
          <tr><td className="hl">1つの親で足りる共有</td><td><Link href="/frontend/react-state">親へ持ち上げる</Link></td></tr>
          <tr><td className="hl">高頻度・広範囲・細かい購読が要る</td><td>外部ストア</td></tr>
          <tr><td className="hl">サーバー由来のデータ</td><td><Link href="/frontend/state">キャッシュ層</Link>。Contextに載せない</td></tr>
        </tbody>
      </table>

      <p>
        最後の行は見落とされがちです。取得したデータをContextで配ると、キャッシュも再検証も自分で書くことになります。<Term>配送手段としては使えても、サーバー状態の置き場所ではありません</Term>。
      </p>

      <Heading num="05">合成パターンの土台として</Heading>
      <p>
        Contextには、値の配送とは別のもう1つの使い道があります。<Term>複数のコンポーネントが暗黙に状態を共有し、まとまって1つの部品として振る舞う</Term>設計 ― タブやアコーディオンのように、親と子が組み合わさって初めて機能するものです。
      </p>
      <p>
        この場合、Contextはアプリ全体に配るためではなく、<Term>その部品の内側だけに閉じた通信路</Term>として使われます。詳しくは<Link href="/frontend/react-composition">コンポーネントを組み合わせる</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        propsのバケツリレーが隣の人への手渡しなら、Contextは館内放送です。放送を流せば、聞きたい人はどのフロアにいても直接受け取れ、間の階を経由する必要がありません。ただし放送内容を変えると聞いている全員が反応します ― だから「めったに変えない放送」と「頻繁に変える放送」はチャンネルを分けます。
      </Analogy>

      <Heading num="まとめ">配るための仕組み</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中間層を飛ばして配る</h4>
          <p>間のコンポーネントは、値を知らずに済むようになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>変わった部分だけは配れない</h4>
          <p>だから分割そのものが最適化になる。参照の安定も必須。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>管理はしていない</h4>
          <p>高頻度・細かい購読は外部ストア、サーバー由来はキャッシュ層。</p>
        </Card>
      </CardGrid>

      <p>
        中核の語彙が揃いました。次からは実践 ― まず<Link href="/frontend/react-logic-reuse">ロジックを再利用する</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/react-context" />
    </DocsPage>
  );
}
