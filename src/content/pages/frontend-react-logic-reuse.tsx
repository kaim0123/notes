import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ロジックを再利用する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>ロジックを再利用する ― 器を経由しない形へ</h1>
        <Lead>
          「状態やデータ取得のロジックを表示から分離して再利用する」という目的は、Reactの歴史を通じて変わっていません。変わったのは手段です。ここでは同じロジックを4つの技法で書き直しながら、<Term>なぜ最後の形に落ち着いたのか</Term>を1本の流れで見ます。古い形も、ライブラリの内部にはまだ残っています。
        </Lead>
      </Hero>

      <Heading num="01">4つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>いま</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Container / Presentational</td>
            <td>データ取得と表示をコンポーネント単位で分ける</td>
            <td>役割分担の考え方は有効。分割の手段としては使わない</td>
          </tr>
          <tr>
            <td className="hl">高階コンポーネント</td>
            <td>コンポーネントを受け取り、機能を足した別のコンポーネントを返す</td>
            <td>ライブラリ内部に残る</td>
          </tr>
          <tr>
            <td className="hl">Render Props</td>
            <td>描画する内容を関数として渡す</td>
            <td>ライブラリ内部に残る</td>
          </tr>
          <tr>
            <td className="hl">カスタムフック</td>
            <td>ロジックだけを関数として切り出す</td>
            <td>標準的な答え</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="frontend-react-logic-reuse"
        aspect="640 / 320"
        caption="ロジック再利用の4つの技法を、コンポーネント階層への影響という観点で並べた図。左端のContainerとPresentationalの分離では、ロジックを持つコンポーネントと表示するコンポーネントが親子として固定され、再利用はコピーするしかない。次の高階コンポーネントでは、コンポーネントを別のコンポーネントで包むため、重ねるほど階層が深くなる。次のRender Propsでは階層は増えないが、JSXの中に関数を渡す入れ子が深くなる。右端のカスタムフックでは、ロジックが関数として切り出されるためコンポーネント階層に一切影響せず、入れ子も生まれない。器を経由しないことが、この形の要点。"
      />

      <Heading num="02">最初の形 ― コンポーネントを2つに割る</Heading>
      <p>
        データ取得を担う側と、受け取った値を表示するだけの側に分けます。役割の分離としては正しいのですが、<Term>ロジックの再利用は「コピーする」ことでしか実現できません</Term>。別の画面で同じ取得処理が要るなら、また書くことになります。
      </p>
      <p>
        いまでも<Term>データを知る層と知らない層を分ける</Term>という考え方自体は有効です。無くなったのは「そのために必ずコンポーネントを2つ作る」という部分だけです。
      </p>

      <Heading num="03">包む ― 高階コンポーネント</Heading>
      <p>
        コンポーネントを受け取り、ロジックを注入した新しいコンポーネントを返す関数です。これで再利用はできるようになりました。
      </p>

      <pre>
        <code>{`function withUsers<P extends object>(Component: ComponentType<P & { users: User[] }>) {
  return function WithUsers(props: P) {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
      fetch("/api/users").then((r) => r.json()).then(setUsers);
    }, []);
    return <Component {...props} users={users} />;
  };
}

const UserListWithData = withUsers(UserList);`}</code>
      </pre>

      <p>
        問題は重ねたときです。<code>withA(withB(withC(Component)))</code>のように階層が深くなり、<Term>どのpropsがどこから来たのか追えなくなります</Term>。型の合成も難しく、名前の衝突にも気付けません。
      </p>

      <Heading num="04">渡す ― Render Props</Heading>
      <p>
        包む代わりに、「取得したデータをどう描画するか」を関数として渡します。階層は増えません。
      </p>

      <pre>
        <code>{`function UsersProvider({ render }: { render: (users: User[]) => ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users").then((r) => r.json()).then(setUsers);
  }, []);
  return <>{render(users)}</>;
}

<UsersProvider render={(users) => <UserList users={users} />} />;`}</code>
      </pre>

      <p>
        今度はJSXの中の入れ子が深くなります。2つ3つと組み合わせると、右へ右へと字下がりが進み、<Term>どの値がどのスコープにあるのか</Term>が読み取りづらくなります。
      </p>

      <Heading num="05">切り出す ― カスタムフック</Heading>
      <p>
        コンポーネントという単位を経由せず、状態と副作用のロジックだけを関数として切り出します。階層にも入れ子にも影響しません。
      </p>

      <pre>
        <code>{`function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users").then((r) => r.json()).then(setUsers);
  }, []);
  return users;
}

// 使う側 ― ラップも関数の受け渡しも不要
function UserListScreen() {
  const users = useUsers();
  return <UserList users={users} />;
}`}</code>
      </pre>

      <p>
        前の3つが抱えていた問題は、<Term>どれも「器を経由していた」ことから来ていました</Term>。器がコンポーネントなら階層が深くなり、関数なら入れ子が深くなる。器そのものをやめると、両方が消えます。
      </p>

      <Heading num="06">カスタムフックの作法</Heading>
      <table>
        <thead>
          <tr><th>作法</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">名前を<code>use</code>で始める</td><td>フックの規則が適用される対象だと、人にも道具にも伝わる</td></tr>
          <tr><td className="hl">状態は呼び出しごとに独立する</td><td>共有されない。共有したいならContextか外部ストア</td></tr>
          <tr><td className="hl">返り値は使う側が名前を付けられる形に</td><td>1つの値か、意味のあるオブジェクト。順序に頼らせない</td></tr>
          <tr><td className="hl">条件分岐の中で呼ばない</td><td>呼び出し順が変わると、状態の対応が崩れる</td></tr>
        </tbody>
      </table>

      <Aside label="⚠️ 状態は共有されない">
        最も多い誤解が「同じカスタムフックを2か所で呼べば状態が共有される」というものです。共有されません ― <Term>呼び出すたびに独立した状態が作られます</Term>。共有したいなら、上位で1回だけ呼んでContextで配るか、外部ストアを使います。この誤解は、動いているうちは気付かれず、2つ目の呼び出しを足した瞬間に表面化します。
      </Aside>

      <Heading num="07">何を切り出すか</Heading>
      <p>
        「2回書いたから切り出す」は、必ずしも正解ではありません。切り出す価値があるのは、<Term>まとまった1つの関心を表しているとき</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>切り出す価値がある</th><th>やめたほうがよい</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">外部との同期を伴うもの(購読・通信・保存)</td><td>単に行数を減らすためだけの抽出</td></tr>
          <tr><td className="hl">後始末が要るもの</td><td>1か所でしか使わず、名前も付けにくいもの</td></tr>
          <tr><td className="hl">複数の状態が連動して1つの意味を持つもの</td><td>たまたま似ているだけの2つ</td></tr>
        </tbody>
      </table>

      <p>
        右列の3つ目は特に注意が要ります。似ているという理由でまとめると、片方だけ仕様が変わったときに<Term>引数で分岐する見通しの悪いフック</Term>が育ちます。
      </p>

      <Analogy label="💡 たとえるなら">
        4つの技法は荷物の運び方の進化です。最初は荷物と運搬係が同じ台車に固定された状態。次は台車をさらに台車で包む入れ子。その次は「荷物が届いたらどうするか」を紙に書いて渡す方式。カスタムフックは台車そのものをやめ、荷物を直接手渡しできるようにしたものです ― 器を経由しないぶん、いちばん身軽になります。
      </Analogy>

      <Heading num="まとめ">器をやめると、両方の問題が消える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>問題は器にあった</h4>
          <p>コンポーネントで包めば階層が、関数で渡せば入れ子が深くなる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>状態は共有されない</h4>
          <p>呼び出すたびに独立する。共有したいならContextか外部ストア。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>切り出す基準は関心</h4>
          <p>行数ではない。似ているだけの2つをまとめない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、複数のコンポーネントが連携して1つの部品として振る舞う ―
        <Link href="/frontend/react-composition">コンポーネントを組み合わせる</Link>パターンを見ます。
      </p>

      <DocsFooter href="/frontend/react-logic-reuse" />
    </DocsPage>
  );
}
