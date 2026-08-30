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
  title: "Context",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; Hooks</Eyebrow>
        <h1>Context ― 階層をまたいで値を配る仕組み</h1>
        <Lead>
          <Link href="/dev/frontend/react/props">props</Link>は隣接する親子でしか渡せず、深い子に値を届けるには全階層を経由する<Term>props drilling</Term>が必要でした。<Term>Context</Term>は、この中間層を飛ばして「必要な子が直接読みに行く」ための機構です。テーマ・ログイン中のユーザー・言語設定のような「アプリ全体で共有する値」に向きます。ここではその仕組みと、使うときの注意点を扱います。
        </Lead>
      </Hero>

      <Heading num="01">useContext ― drillingを避ける</Heading>
      <p>Contextは3ステップで使います。<code>createContext</code>で入れ物を作り、上位で<code>&lt;Provider&gt;</code>として値を渡し、下位の任意のコンポーネントが<code>useContext</code>で読み取ります。間にいるコンポーネントは、その値を素通しするための記述を一切書かずに済みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");   // ① 入れ物

function App() {
  return (
    <ThemeContext.Provider value="dark">           {/* ② 値を配る */}
      <Layout />  {/* Layout は theme を素通ししなくてよい */}
    </ThemeContext.Provider>
  );
}

function Badge() {
  const theme = useContext(ThemeContext);          // ③ 直接読む
  return <span className={theme}>Badge</span>;
}`}</code>
      </pre>

      <Heading num="02">Provider / Consumerパターン</Heading>
      <p>値を配る側が<Term>Provider</Term>、読む側が<Term>Consumer</Term>です。現在は読み取りに<code>useContext</code>フックを使うのが標準で、古い<code>&lt;Context.Consumer&gt;</code>のrender props形式はほぼ使いません。<code>Provider</code>より上位や外側で<code>useContext</code>を呼ぶと、<code>createContext</code>に渡した<Term>既定値</Term>が返ります。</p>

      <Heading num="03">値が変わると配下が再描画される</Heading>
      <p>Contextの重要な性質は、<Term>Providerに渡した値が変わると、その値を読んでいる全Consumerが再描画される</Term>ことです。ここで注意が要ります。<code>value</code>にオブジェクトをインラインで渡すと、親が再描画されるたびに<Term>毎回新しいオブジェクト</Term>になり、中身が同じでも全Consumerが再描画されてしまいます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// NG: 描画のたびに新しいオブジェクト → 中身が同じでも全Consumerが再描画
<AuthContext.Provider value={{ user, login }}>

// OK: useMemo で参照を安定させる
const value = useMemo(() => ({ user, login }), [user, login]);
<AuthContext.Provider value={value}>`}</code>
      </pre>

      <Heading num="04">state管理に使うなら分割する</Heading>
      <p>Contextを状態管理に使うと、1つのContextに詰め込みすぎたとき、その一部が変わっただけで無関係なConsumerまで再描画されます。対策は<Term>Contextの分割</Term>です。「めったに変わらない値(dispatch関数など)」と「頻繁に変わる値(現在のstate)」を別のContextに分ければ、片方の更新がもう片方のConsumerに波及しません。<code>useReducer</code>と組み合わせ、stateとdispatchを2つのContextに分けるのは定番の構成です。</p>

      <Heading num="05">Context vs 外部ストア</Heading>
      <p>Contextは「値を配る」仕組みであって、それ自体は状態<Term>管理</Term>ライブラリではありません。更新が頻繁で、細かい粒度で「変わった部分だけ」を再描画したいような大規模な状態には、再描画の最適化を備えた外部ストア(Zustand・Reduxなど)の方が適します。「どこで足りて、どこから外部ストアか」の目安は次の通りです。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>向いている手段</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テーマ・言語・ログイン情報など低頻度更新</td><td>Context で十分</td></tr>
          <tr><td className="hl">1つの親で足りる共有</td><td><Link href="/dev/frontend/react/state">state のリフトアップ</Link></td></tr>
          <tr><td className="hl">高頻度更新・広範囲・細かい購読</td><td>外部ストア(Zustand / Redux)</td></tr>
        </tbody>
      </table>
      <p>なお、Contextを土台に「複数コンポーネントが暗黙に状態を共有して1つの部品として振る舞う」設計が、<Link href="/dev/frontend/react/composition">コンポーネントを組み合わせる</Link>で扱うCompound Componentsです。Contextは機構、あちらはその応用パターン、という関係になります。</p>

      <Analogy label="💡 たとえるなら">
        propsのバケツリレーが「隣の人へ順番に手渡し」なら、Contextは「館内放送」です。放送(Provider)を流せば、聞きたい人(useContext)はどのフロアにいても直接受け取れ、間の階を経由する必要がありません。ただし放送の内容を変えると、聞いている全員が反応します ― だから「めったに変えない放送」と「頻繁に変える放送」はチャンネルを分ける(Contextを分割する)と、無用な反応を避けられます。
      </Analogy>

      <Heading num="まとめ">共有値を配る機構、更新の波及に注意</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>drillingを飛ばして配る</h4><p>createContext→Provider→useContextの3ステップ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>値の変更は全Consumerに波及</h4><p>valueはuseMemoで安定させ、用途ごとにContextを分割する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>低頻度はContext、高頻度は外部ストア</h4><p>Contextは配布の仕組み。管理は用途で使い分ける。</p></Card>
      </CardGrid>
      <p>ここまでで基礎と中核フックが揃いました。次はこれらを土台にした実践パターン ―<Link href="/dev/frontend/react/logic-reuse">ロジックを再利用する</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">ロジックを再利用する</RelatedLink>
            <RelatedLink href="/dev/frontend/react/composition" tag="開発">コンポーネントを組み合わせる</RelatedLink>
            <RelatedLink href="/dev/frontend/react/props" tag="開発">Propsと一方向データフロー</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
