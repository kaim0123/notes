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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンポーネントを組み合わせる",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Provider Pattern", desc: "Context経由で、コンポーネント階層をまたいで値を配布する", tier: "must" },
  { name: "Compound Components", desc: "複数のコンポーネントが暗黙的に状態を共有し、1つの部品のように振る舞う", tier: "must" },
  { name: "State Reducer", desc: "コンポーネント内部の状態遷移ロジックを、利用側から差し替え可能にする", tier: "niche", note: "→ ヘッドレスUIライブラリ(downshiftなど)で使われる高度なカスタマイズ手法" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; パターン</Eyebrow>
        <h1>コンポーネントを組み合わせる ― Compound Components・Provider・State Reducer</h1>
        <Lead>
          Reactのコンポーネントは、親から子へpropsを渡すだけでなく、<Term>Context</Term>を介して階層をまたいで値や状態を共有できます。ここでは「値をどう配る(Provider)」「配った値を暗黙に共有して1つの部品として振る舞う(Compound Components)」「内部の状態遷移ロジックまで利用側に開放する(State Reducer)」という、Context活用の3段階を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">3つのパターンの位置づけ</Heading>
      <p>Compound ComponentsとState Reducerは、いずれもProvider Pattern(Context)を土台にした応用形です。まずは全体像をつかみましょう。</p>
      <table>
        <thead><tr><th>パターン</th><th>目的</th><th>区分</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="hl">{r.name}</td>
              <td>{r.desc}</td>
              <td><TierBadge tier={r.tier} />{r.note && <MarkNote>{r.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Provider Pattern ― Contextで値を配る</Heading>
      <p><Term>Provider Pattern</Term>は、propsをバケツリレーせずに、階層の途中にいる任意のコンポーネントへ値を届ける基本形です。<code>createContext</code>で入れ物を作り、上位で<code>&lt;Provider&gt;</code>として値を渡し、下位で<code>useContext</code>で読み取ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>切替</button>
      {children}
    </ThemeContext.Provider>
  );
}

function Badge() {
  const theme = useContext(ThemeContext); // 何階層下でも直接読める
  return <span className={theme}>Badge</span>;
}`}</code>
      </pre>

      <Heading num="03">Compound Components ― 暗黙の状態共有で1つの部品にする</Heading>
      <p><Term>Compound Components</Term>は、Providerパターンを内側に隠したまま、<code>&lt;Tabs&gt;&lt;Tabs.List&gt;&lt;Tabs.Tab/&gt;&lt;/Tabs.List&gt;&lt;/Tabs&gt;</code>のように複数のコンポーネントを親子関係だけで組み合わせて使える形にします。利用側は「選択中のタブがどこで管理されているか」を一切意識しません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button onClick={() => ctx.setActive(id)} aria-selected={ctx.active === id}>
      {children}
    </button>
  );
}

Tabs.Tab = Tab;

// 利用側は状態の実装を知らなくてよい
<Tabs defaultTab="a">
  <Tabs.Tab id="a">A</Tabs.Tab>
  <Tabs.Tab id="b">B</Tabs.Tab>
</Tabs>;`}</code>
      </pre>

      <Heading num="04">State Reducer ― 状態遷移そのものを利用側に開放する</Heading>
      <p><Term>State Reducer</Term>は、<code>useReducer</code>の遷移ロジックの一部を、コンポーネントの利用側から差し替えられるようにする、さらに一段進んだカスタマイズ手法です。既定のreducerに、呼び出し側が渡した処理を挟み込みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type ToggleState = { on: boolean };
type ToggleAction = { type: "toggle" };

function defaultReducer(state: ToggleState, action: ToggleAction): ToggleState {
  switch (action.type) {
    case "toggle":
      return { on: !state.on };
  }
}

function useToggle(stateReducer: typeof defaultReducer = defaultReducer) {
  const [state, dispatch] = useReducer(stateReducer, { on: false });
  return { on: state.on, toggle: () => dispatch({ type: "toggle" }) };
}

// 利用側: 特定の条件では切り替えを無効化したい、というルールだけ差し込む
useToggle((state, action) => (isLocked ? state : defaultReducer(state, action)));`}</code>
      </pre>
      <p>ヘッドレスUIライブラリ(downshiftなど)のuseSelect・useCombobox系フックがこの手法を採用しており、見た目は完全に自由なまま、内部の状態遷移ルールだけを差し替えられるようにしています。</p>

      <Analogy label="💡 たとえるなら">
        Providerは「館内放送で全フロアに情報を届ける仕組み」です。Compound Componentsは、その放送設備を店舗の内側に隠し、客には「1つのお店」として振る舞う駅ビルのテナントのようなもの。State Reducerは、店舗の運営ルール(放送で何を流すか)自体を、本部ではなく各テナントがカスタマイズできるようにする、さらに進んだ権限委譲です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Provider Pattern</h4><p>Contextで、階層をまたいで値を配る基本形。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Compound Components</h4><p>状態共有を隠し、複数コンポーネントを1つの部品として使えるようにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>State Reducer</h4><p>状態遷移ロジックそのものを、利用側からカスタマイズ可能にする。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">ロジックを再利用する</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/forms" tag="開発">フォームの値を管理する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
