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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ロジックを再利用する",
};

type Tier = "must" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="legacy">史</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Container / Presentational", desc: "データ取得・状態管理(Container)と表示(Presentational)をコンポーネント単位で分離する", tier: "legacy", note: "→ Hooksの登場で状態ロジックはCustom Hooksへ切り出すのが主流になり、この分離は下火に" },
  { name: "Higher-Order Component (HOC)", desc: "コンポーネントを受け取り、機能を追加した新しいコンポーネントを返す関数", tier: "legacy", note: "→ Hooksの登場でほぼCustom Hooksに置き換わったが、ライブラリ内部にはまだ残る" },
  { name: "Render Props", desc: "描画したい内容を関数として子コンポーネントに渡し、ロジックとUIを分離する", tier: "legacy", note: "→ Hooksの登場でほぼCustom Hooksに置き換わった" },
  { name: "Custom Hooks", desc: "状態と副作用のロジックを、useから始まる関数として切り出し再利用する", tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; パターン</Eyebrow>
        <h1>ロジックを再利用する ― Container/PresentationalからCustom Hooksまで</h1>
        <Lead>
          「状態やデータ取得のロジックを、表示から分離して再利用する」という目的自体は、Reactの歴史を通じて変わっていません。変わってきたのは、その目的を達成する手段です。ここでは「ユーザー一覧をfetchして表示する」という同じロジックを、4つの技法で書き直しながら、Hooks登場前後で解決手段がどう進化してきたかを1本の流れで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">4つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Container / Presentational ― コンポーネントを2つに割る</Heading>
      <p>最初の解決策は単純です。データ取得・状態管理を担う<Term>Container</Term>と、受け取ったpropsをただ表示するだけの<Term>Presentational</Term>コンポーネントに分けます。ロジックの再利用は「Containerをコピーする」ことでしか実現できません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Presentational: 表示だけ
function UserList({ users }: { users: User[] }) {
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Container: データ取得・状態管理
class UserListContainer extends React.Component<{}, { users: User[] }> {
  state = { users: [] as User[] };
  async componentDidMount() {
    const res = await fetch("/api/users");
    this.setState({ users: await res.json() });
  }
  render() {
    return <UserList users={this.state.users} />;
  }
}`}</code>
      </pre>
      <p>別の画面で同じ「ユーザー一覧を取得する」ロジックが必要になっても、コンポーネントの階層構造に縛られているため、Containerをそのまま再利用することはできません。</p>

      <Heading num="03">Higher-Order Component (HOC) ― コンポーネントを関数で包む</Heading>
      <p><Term>HOC</Term>は、コンポーネントを受け取り、ロジックを注入した新しいコンポーネントを返す関数です。これで「ユーザー一覧を取得する」ロジックを関数として抽出し、複数のコンポーネントに横断的に適用できるようになりました。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function withUsers<P extends object>(Component: React.ComponentType<P & { users: User[] }>) {
  return function WithUsers(props: P) {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
      fetch("/api/users").then((res) => res.json()).then(setUsers);
    }, []);
    return <Component {...props} users={users} />;
  };
}

const UserListWithData = withUsers(UserList);`}</code>
      </pre>
      <p>ロジックの再利用は解決しましたが、複数のHOCを重ねると<code>withA(withB(withC(Component)))</code>のように入れ子が深くなり(<Term>Wrapper Hell</Term>)、どのpropsがどのHOCから来たのか追いにくくなります。</p>

      <Heading num="04">Render Props ― 描画そのものを関数として渡す</Heading>
      <p><Term>Render Props</Term>は、コンポーネントを包む代わりに、「取得したデータをどう描画するか」を関数(render prop)として子に渡します。HOCのようにコンポーネント階層を暗黙的に増やさない点が改善点です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function UsersProvider({ render }: { render: (users: User[]) => React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users").then((res) => res.json()).then(setUsers);
  }, []);
  return <>{render(users)}</>;
}

// 使う側
<UsersProvider render={(users) => <UserList users={users} />} />;`}</code>
      </pre>
      <p>Wrapper Hellは解消しましたが、代わりにJSXの中に関数を渡すコールバックの入れ子(<Term>Callback Hell</Term>)が発生しやすく、複数のRender Propsを組み合わせるとやはりネストが深くなります。</p>

      <Heading num="05">Custom Hooks ― ロジックだけを関数として切り出す</Heading>
      <p><Term>Custom Hooks</Term>は、コンポーネントという単位すら経由せず、状態と副作用のロジックだけを<code>use</code>から始まる関数として切り出します。コンポーネント階層に一切影響を与えないため、Wrapper HellもCallback Hellも発生しません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users").then((res) => res.json()).then(setUsers);
  }, []);
  return users;
}

// 使う側 ― ラップも関数コールバックも不要
function UserListScreen() {
  const users = useUsers();
  return <UserList users={users} />;
}`}</code>
      </pre>
      <p>ロジックを関数として直接呼び出せるので、コンポーネントの階層構造やJSXのネストと無関係に再利用できます。React Hooks以降、この4つの中でCustom Hooksが標準的な答えになりました。</p>

      <Analogy label="💡 たとえるなら">
        4つの技法は「荷物を運ぶ手段」の進化に似ています。Container/Presentationalは荷物と運搬係が同じ台車に固定された状態、HOCは台車をさらに台車で包んで運ぶ入れ子構造、Render Propsは「荷物が届いたらどうするか」だけを紙に書いて渡す方式です。Custom Hooksは台車そのものをやめて、荷物(ロジック)を直接手渡しできるようにした ― 運ぶための器を経由しない分、一番身軽です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Container/Presentational</h4><p>データと表示をコンポーネント単位で分離。再利用はコピーのみ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>HOC</h4><p>コンポーネントを関数で包んでロジックを注入。Wrapper Hellが課題。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Render Props</h4><p>描画を関数として渡す。Callback Hellが課題。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Custom Hooks</h4><p>ロジックを関数として直接再利用。コンポーネント階層に影響しない。</p></Card>
      </CardGrid>

      <p>次は、複数のコンポーネントが暗黙的に状態を共有しながら連携する<Link href="/dev/frontend/react/composition">コンポーネントを組み合わせる</Link>パターンを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/react/composition" tag="開発">コンポーネントを組み合わせる</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/forms" tag="開発">フォームの値を管理する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
