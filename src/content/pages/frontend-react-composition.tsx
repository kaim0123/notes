import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンポーネントを組み合わせる" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネントを組み合わせる ― 設定ではなく構造で渡す</h1>
        <Lead>
          部品に選択肢を足していくと、propsが際限なく増えます。合成のパターンは、その増加を<Term>設定の追加ではなく構造の組み替えで受け止める</Term>ための考え方です。ここではContextを土台にした3段階 ― 値を配る、暗黙に共有する、遷移ルールまで開放する ― を見ます。
        </Lead>
      </Hero>

      <Heading num="01">propsが増え続ける問題</Heading>
      <p>
        よくある経過です。ダイアログに「タイトル」を足し、「閉じるボタンを出すか」を足し、「フッターのボタンの並び」を足し… 気付けばpropsが20個あり、そのうち半分は組み合わせても意味がありません。
      </p>
      <p>
        原因は、<Term>中身の構造をpropsという平らな形で表そうとしている</Term>ことです。構造は構造として渡せば、この増加は起きません。
      </p>

      <DiagramFrame
        slug="frontend-react-composition"
        aspect="640 / 300"
        caption="設定で渡す形と構造で渡す形を比べた図。左側では、ダイアログにタイトル、閉じるボタンの有無、フッターのボタン配列といったpropsを次々に足していく。選択肢が増えるたびにpropsが増え、内部の分岐も増えていく。右側では、ダイアログの中に見出しや本文やフッターを子要素として直接書く。新しい見せ方が必要になっても、使う側が構造を組み替えるだけでよく、部品側は変更しなくてよい。設定は数が増えるが、構造は組み合わせで表現できる。"
      />

      <Heading num="02">値を配る ― Provider</Heading>
      <p>
        まずは基本形です。<Link href="/frontend/react-context">Context</Link>で見たとおり、階層をまたいで値を届けます。これ自体は合成というより、以降のパターンの土台にあたります。
      </p>

      <Heading num="03">暗黙に共有する ― 組み合わせて使う部品</Heading>
      <p>
        タブやアコーディオンのように、<Term>複数のコンポーネントが揃って初めて意味を持つ</Term>部品があります。この場合、状態を親に持たせ、Contextで子へ配ると、使う側は<Term>状態がどこにあるかを意識せずに済みます</Term>。
      </p>

      <pre>
        <code>{`const TabsContext = createContext<{
  active: string;
  setActive: (id: string) => void;
} | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  const value = useMemo(() => ({ active, setActive }), [active]);
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab は Tabs の中で使ってください");
  return (
    <button onClick={() => ctx.setActive(id)} aria-selected={ctx.active === id}>
      {children}
    </button>
  );
}`}</code>
      </pre>

      <pre>
        <code>{`// 使う側 ― 状態の実装を知らなくてよく、並び順も自由に組める
<Tabs defaultTab="a">
  <TabList>
    <Tab id="a">A</Tab>
    <Tab id="b">B</Tab>
  </TabList>
  <TabPanel id="a">Aの中身</TabPanel>
</Tabs>`}</code>
      </pre>

      <Aside label="外で使われたときに落とす">
        上の例で<code>ctx</code>が無いときに例外を投げているのは、単なる型対策ではありません。<Term>この部品は単独では意味を持たない</Term>という契約を、実行時に明示しています。黙って既定値で動くと、使う側は間違いに気付かないまま先へ進みます。
      </Aside>

      <Heading num="04">遷移ルールを開放する</Heading>
      <p>
        さらに一段進んだ形として、内部の状態遷移そのものを利用側から差し替えられるようにする方法があります。見た目を自由にしたまま、<Term>いつ状態が変わるかというルールだけ</Term>を外から書き換えます。
      </p>

      <pre>
        <code>{`function useToggle(reducer = defaultReducer) {
  const [state, dispatch] = useReducer(reducer, { on: false });
  return { on: state.on, toggle: () => dispatch({ type: "toggle" }) };
}

// 使う側: 「ロック中は切り替えない」というルールだけ差し込む
useToggle((state, action) => (isLocked ? state : defaultReducer(state, action)));`}</code>
      </pre>

      <p>
        見た目を持たない部品を提供するライブラリでよく使われる形です。ただし<Term>使う側が内部の遷移を理解している必要がある</Term>ため、公開するライブラリでない限り、ここまでの柔軟性が要ることは多くありません。
      </p>

      <Heading num="05">どこまで開けるか</Heading>
      <p>
        3段階は、そのまま<Term>柔軟性と分かりやすさの取引</Term>になっています。
      </p>

      <table>
        <thead>
          <tr><th>形</th><th>使う側の自由度</th><th>使う側が知るべきこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">propsで設定する</td><td>用意された選択肢のみ</td><td>propsの一覧だけ</td></tr>
          <tr><td className="hl">構造で組み立てる</td><td>並びと中身は自由</td><td>どの部品を組み合わせるか</td></tr>
          <tr><td className="hl">遷移を差し替える</td><td>ほぼ何でもできる</td><td>内部の状態遷移まで</td></tr>
        </tbody>
      </table>

      <p>
        アプリ内の部品なら、<Term>2段目で止めるのがちょうどよい</Term>ことがほとんどです。3段目まで開けると、使う側が内部実装に依存し、部品を直せなくなります。
      </p>

      <Analogy label="💡 たとえるなら">
        propsで設定するのは、注文票のチェックボックスを増やしていくやり方です。選べる範囲は明快ですが、票はどこまでも長くなります。構造で組み立てるのは、部品を並べて自分で組む方式 ― 票は短いままで、組み合わせの数は増えます。そして遷移まで開放するのは、工具ごと渡してしまうことです。何でもできますが、壊れたときに直せるのも渡された側だけになります。
      </Analogy>

      <Heading num="まとめ">増やすなら設定ではなく構造で</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>propsの増殖は構造の問題</h4>
          <p>中身の構造を平らな設定で表そうとすると、際限なく増える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>状態は親、配るのはContext</h4>
          <p>使う側は状態がどこにあるかを知らずに済む。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>2段目で止める</h4>
          <p>遷移まで開けると、使う側が内部実装に依存する。</p>
        </Card>
      </CardGrid>

      <p>
        次は、合成の考え方が最も試される場所 ― <Link href="/frontend/react-forms">フォームの値を管理する</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/react-composition" />
    </DocsPage>
  );
}
