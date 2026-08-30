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
  Aside,
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "設計パターン",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string; href?: string };

const creational: Row[] = [
  { name: "Singleton", desc: "インスタンスを1つに制限し、グローバルにアクセス可能にする", tier: "legacy", note: "→ グローバル状態がテストを困難にするため敬遠されがちで、DIコンテナの「シングルトンスコープ」に役目が移った" },
  { name: "Factory Method", desc: "生成するクラスの決定をサブクラスに委ねる", tier: "must", href: "/design/paradigm/oop/gof/creation" },
  { name: "Abstract Factory", desc: "関連する一連のオブジェクト群をまとめて生成する", tier: "niche", note: "→ UIテーマ切り替え、クロスプラットフォーム対応など特定の文脈で有効" },
  { name: "Builder", desc: "複雑なオブジェクトの組み立て手順を分離し、段階的に構築する", tier: "must", href: "/design/paradigm/oop/gof/creation" },
  { name: "Prototype", desc: "既存オブジェクトを複製(clone)して新しいインスタンスを作る", tier: "niche", note: "→ 生成コストが高いオブジェクトの複製など、限られた場面で使う" },
];

const structural: Row[] = [
  { name: "Adapter", desc: "互換性のないインターフェース同士を変換して繋ぐ", tier: "must", href: "/design/paradigm/oop/gof/structure" },
  { name: "Bridge", desc: "抽象(何をするか)と実装(どうするか)を分離し、それぞれ独立に拡張できるようにする", tier: "niche" },
  { name: "Composite", desc: "個別オブジェクトと、その集合(木構造)を同じインターフェースで扱う", tier: "must", href: "/design/paradigm/oop/gof/structure" },
  { name: "Decorator", desc: "オブジェクトを包んで、動的に機能を追加する", tier: "must", href: "/design/paradigm/oop/gof/structure" },
  { name: "Facade", desc: "複雑なサブシステム群に対して単純な窓口(入口)を用意する", tier: "must", href: "/design/paradigm/oop/gof/structure" },
  { name: "Flyweight", desc: "共有可能なオブジェクトを使い回し、メモリ消費を抑える", tier: "niche", note: "→ 大量の類似オブジェクトを扱う特定の性能最適化でのみ効いてくる" },
  { name: "Proxy", desc: "本物の代わりに立つ代理オブジェクトで、アクセス制御や遅延生成を行う", tier: "must", href: "/design/paradigm/oop/gof/structure" },
];

const behavioral: Row[] = [
  { name: "Chain of Responsibility", desc: "複数のハンドラを鎖状につなぎ、順番に処理できるか試す", tier: "must", href: "/design/paradigm/oop/gof/collaboration" },
  { name: "Command", desc: "「命令」そのものをオブジェクトとしてカプセル化し、キューイングや取り消しを可能にする", tier: "must", href: "/design/paradigm/oop/gof/algorithms" },
  { name: "Interpreter", desc: "文法規則をクラスで表現し、文(センテンス)を解釈・実行する", tier: "legacy", note: "→ 自前実装は稀で、パーサジェネレータやDSLライブラリに置き換わっている" },
  { name: "Iterator", desc: "集合(コレクション)の内部構造を隠したまま、要素を順に走査する", tier: "must", note: "→ 考え方自体はfor-of・generatorとして現代言語に標準装備されている", href: "/design/paradigm/oop/gof/collaboration" },
  { name: "Mediator", desc: "オブジェクト同士が直接やり取りせず、仲介役に通信を集約する", tier: "niche" },
  { name: "Memento", desc: "オブジェクトの内部状態をカプセル化を破らずに保存し、後で復元する", tier: "niche" },
  { name: "Observer", desc: "状態の変化を、登録された複数の購読者へ通知する", tier: "must", href: "/design/paradigm/oop/gof/collaboration" },
  { name: "State", desc: "状態ごとに異なる振る舞いを、状態オブジェクトとして切り出す", tier: "must", href: "/design/paradigm/oop/gof/algorithms" },
  { name: "Strategy", desc: "アルゴリズムを交換可能な部品として切り出し、実行時に差し替える", tier: "must", href: "/design/paradigm/oop/gof/algorithms" },
  { name: "Template Method", desc: "処理全体の骨組みを親クラスで定め、詳細な手順はサブクラスに任せる", tier: "niche", note: "→ 「継承より合成」の流れから、関数を渡すStrategyパターンに置き換えられることが多い" },
  { name: "Visitor", desc: "データ構造(クラス)を変更せずに、新しい操作を追加できるようにする", tier: "niche", note: "→ 二重ディスパッチが複雑になりやすく、コンパイラ・AST処理など限られた場面で使う" },
];

const enterprise: Row[] = [
  { name: "Repository", desc: "コレクションのように振る舞うインターフェースの背後に、永続化の詳細を隠す", tier: "must", href: "/design/architecture/app/data-access/patterns" },
  { name: "Unit of Work", desc: "1つの処理単位で行われた変更をまとめて追跡し、一括でコミットする", tier: "must", note: "→ ORMのトランザクション/セッション管理に内包されることが多い", href: "/design/architecture/app/data-access/patterns" },
  { name: "Identity Map", desc: "同一のレコードを1リクエスト内で複数回読み込まないよう、キャッシュして再利用する", tier: "niche", note: "→ Prisma・TypeORMなどが内部で自動的に行うため、意識する機会は少ない" },
  { name: "Data Mapper", desc: "ドメインオブジェクトとDBスキーマを分離し、両者の変換を専用のクラスが担う", tier: "must", href: "/design/architecture/app/data-access/patterns" },
  { name: "Active Record", desc: "1つのオブジェクトが自身のデータと、保存・削除などの永続化ロジックを両方持つ", tier: "must", note: "→ Data Mapperと対になる設計選択。Rails・Laravelなどのフレームワークが採用", href: "/design/architecture/app/data-access/patterns" },
  { name: "Table Data Gateway", desc: "テーブル単位でSQLをまとめたクラスを用意し、行はただのデータとして扱う", tier: "legacy", note: "→ ORMのRepository/Data Mapperに役目が移った" },
  { name: "Row Data Gateway", desc: "テーブルの1行に対応するオブジェクトが、その行に対するSQL操作を持つ", tier: "legacy", note: "→ Active RecordやORMに役目が移った" },
  { name: "Service Layer", desc: "アプリケーションが提供する操作の境界を、トランザクション単位でまとめて定義する", tier: "must", href: "/design/architecture/app/domain-model/patterns" },
  { name: "Domain Model", desc: "業務ロジックをオブジェクトの振る舞いとして表現する、リッチなモデル", tier: "must", href: "/design/architecture/app/domain-model/patterns" },
  { name: "Transaction Script", desc: "1つのビジネストランザクションの手続きを、そのまま1つの手続き(関数)として書く", tier: "niche", note: "→ 小規模なCRUD中心のアプリでは十分だが、複雑化するとDomain Modelへ移行する", href: "/design/architecture/app/domain-model/patterns" },
  { name: "Lazy Load", desc: "関連するデータを、実際に必要になるまで読み込みを遅延させる", tier: "must", note: "→ N+1問題の原因にもなるため、挙動を理解しておく必要がある", href: "/design/architecture/app/data-access/patterns" },
  { name: "Identity Field", desc: "DBの主キーをオブジェクト側のフィールドとして保持し、同一性の基準にする", tier: "niche", note: "→ ORMが自動でマッピングするため、意識する機会は少ない" },
  { name: "Optimistic Offline Lock", desc: "更新時にバージョン番号を比較し、競合があれば検知して弾く", tier: "niche" },
  { name: "Pessimistic Lock", desc: "処理中のレコードを排他ロックし、他者の同時アクセスを防ぐ", tier: "niche" },
];

const ddd: Row[] = [
  { name: "Entity", desc: "IDによって同一性が決まるオブジェクト(属性が変わっても「同じもの」)", tier: "must", href: "/design/methodology/ddd/tactical" },
  { name: "Value Object", desc: "属性の値によって同一性が決まる、不変(イミュータブル)なオブジェクト", tier: "must", href: "/design/methodology/ddd/tactical" },
  { name: "Aggregate / Aggregate Root", desc: "整合性を保つべきオブジェクトのまとまりと、その代表窓口", tier: "must", href: "/design/methodology/ddd/tactical" },
  { name: "Repository", desc: "集約をコレクションのように取得・保存する窓口", tier: "must", href: "/design/methodology/ddd/tactical" },
  { name: "Domain Service", desc: "特定のEntity/Value Objectに属さない業務ロジックを表現する", tier: "niche" },
  { name: "Domain Event", desc: "ドメイン内で起きた出来事の表現", tier: "niche" },
  { name: "Factory", desc: "集約など複雑なオブジェクトの生成手順をカプセル化する", tier: "niche" },
  { name: "Specification", desc: "「条件」自体をオブジェクトとして表現し、組み合わせ可能にする", tier: "niche" },
  { name: "Bounded Context", desc: "1つのモデルが一貫した意味を持つ境界を明示する", tier: "must" },
  { name: "Ubiquitous Language", desc: "その境界の中で、業務専門家とエンジニアが共有する統一語彙", tier: "must" },
  { name: "Anti-Corruption Layer", desc: "異なる境界のモデルが混ざらないよう、変換層で隔離する", tier: "niche" },
];

const microservices: Row[] = [
  { name: "API Gateway", desc: "外部からの入口を1箇所に集約し、認証・ルーティングをまとめて担う", tier: "must" },
  { name: "Backend for Frontend (BFF)", desc: "クライアントの種類ごとに専用のAPI層を用意する", tier: "niche" },
  { name: "Saga", desc: "サービス間をまたぐ処理を段階的に実行し、失敗時は補償処理で取り消す", tier: "must", href: "/database/distributed-transactions/saga" },
  { name: "TCC", desc: "Tryでリソースを予約し、成功ならConfirm、失敗ならCancelで整合性を保つ", tier: "must", href: "/database/distributed-transactions/tcc" },
  { name: "Circuit Breaker", desc: "呼び先の障害を検知したら、一定期間呼び出し自体を遮断する", tier: "must" },
  { name: "Retry", desc: "一時的な失敗に対して、間隔を空けながら呼び出しをやり直す", tier: "must" },
  { name: "Bulkhead", desc: "リソースをサービス・機能ごとに区切り、障害の連鎖を防ぐ", tier: "niche" },
  { name: "CQRS", desc: "更新系(Command)と参照系(Query)のモデル・経路を分離する", tier: "must" },
  { name: "Event Sourcing", desc: "状態そのものではなく、状態を変化させたイベントの列を記録する", tier: "niche", note: "→ CQRSと組み合わせて使われることが多い、高度な設計" },
  { name: "Outbox Pattern", desc: "DB更新とイベント発行を1つのトランザクションで確実に両立させる", tier: "niche" },
  { name: "Service Discovery", desc: "サービスの現在の場所(アドレス)を動的に解決する", tier: "legacy", note: "→ Kubernetesなどのオーケストレーターが自動で担うことが多く、自前実装する機会は減った" },
  { name: "Strangler Fig", desc: "既存システムを少しずつ新システムへ置き換えていく移行戦略", tier: "must" },
  { name: "Sidecar", desc: "本体とは別のプロセスとして、ログ収集や通信制御などの補助機能を並走させる", tier: "niche" },
  { name: "Ambassador", desc: "外部サービスとの通信を代理プロセスに委ね、リトライなどを肩代わりさせる", tier: "niche" },
];

const concurrency: Row[] = [
  { name: "Producer–Consumer", desc: "生成する側と消費する側をキューで分離し、処理速度の違いを吸収する", tier: "must" },
  { name: "Reactor", desc: "1つのイベントループがI/Oの完了を監視し、ハンドラを呼び出す", tier: "must", note: "→ Node.js・nginxのイベントループの土台になっている考え方" },
  { name: "Proactor", desc: "OSに非同期I/Oを依頼し、完了時にハンドラが呼び出される", tier: "niche", note: "→ Windows IOCPなど特定のOS非同期I/Oモデルに関連" },
  { name: "Half-Sync/Half-Async", desc: "同期処理層と非同期処理層を分け、両者をキューで橋渡しする", tier: "niche" },
  { name: "Thread Pool", desc: "スレッドを使い捨てず、あらかじめ用意した集合から再利用する", tier: "must", note: "→ DBコネクションプール、Node.jsのlibuvワーカープールなどに現れる" },
  { name: "Leader-Follower", desc: "複数スレッドが1つのイベントソースを共有し、順番にリーダーとしてイベントを処理する", tier: "niche" },
  { name: "Active Object", desc: "メソッド呼び出しをメッセージとしてキューに積み、別スレッドで非同期に実行する", tier: "niche" },
  { name: "Actor Model", desc: "状態を持つ主体(アクター)同士が、共有メモリなしにメッセージだけでやり取りする", tier: "must", note: "→ Erlang/Elixir、Akka、Rustのactixなどで採用" },
  { name: "Read-Copy-Update (RCU)", desc: "読み取りをロックなしで行い、更新時はコピーを作って差し替える", tier: "legacy", note: "→ Linuxカーネルなど低レイヤの特殊な最適化技法" },
];

const reactPatterns: Row[] = [
  { name: "Container / Presentational", desc: "データ取得・状態管理(Container)と表示(Presentational)をコンポーネント単位で分離する", tier: "legacy", note: "→ Hooksの登場で状態ロジックはCustom Hooksへ切り出すのが主流になり、この分離は下火に", href: "/dev/frontend/react/logic-reuse" },
  { name: "Compound Components", desc: "複数のコンポーネントが暗黙的に状態を共有し、1つの部品のように振る舞う(<Select><Option/></Select>のような形)", tier: "must", href: "/dev/frontend/react/composition" },
  { name: "Custom Hooks", desc: "状態と副作用のロジックを、useから始まる関数として切り出し再利用する", tier: "must", href: "/dev/frontend/react/logic-reuse" },
  { name: "Render Props", desc: "描画したい内容を関数として子コンポーネントに渡し、ロジックとUIを分離する", tier: "legacy", note: "→ Hooksの登場でほぼCustom Hooksに置き換わった", href: "/dev/frontend/react/logic-reuse" },
  { name: "Higher-Order Component (HOC)", desc: "コンポーネントを受け取り、機能を追加した新しいコンポーネントを返す関数", tier: "legacy", note: "→ Hooksの登場でほぼCustom Hooksに置き換わったが、ライブラリ内部にはまだ残る", href: "/dev/frontend/react/logic-reuse" },
  { name: "Provider Pattern", desc: "Context経由で、コンポーネント階層をまたいで値を配布する", tier: "must", href: "/dev/frontend/react/composition" },
  { name: "State Reducer", desc: "コンポーネント内部の状態遷移ロジックを、利用側から差し替え可能にする", tier: "niche", note: "→ ヘッドレスUIライブラリ(downshiftなど)で使われる高度なカスタマイズ手法", href: "/dev/frontend/react/composition" },
  { name: "Controlled Component", desc: "フォーム要素の値をReactのstateで管理し、常に単一の情報源(source of truth)を保つ", tier: "must", href: "/dev/frontend/react/forms" },
  { name: "Uncontrolled Component", desc: "DOM自身に値を持たせ、refを通じて必要なときだけ読み取る", tier: "must", href: "/dev/frontend/react/forms" },
];

const nextjsPatterns: Row[] = [
  { name: "Server/Clientコンポーネントの境界", desc: "何も書かなければサーバー側でのみ実行され、JSにバンドルされない", tier: "must", href: "/dev/frontend/nextjs/components" },
  { name: "Composition Pattern(Server→Client)", desc: "Server ComponentをClient Componentのchildren/propsとして渡し、サーバー側に留める", tier: "must", href: "/dev/frontend/nextjs/components" },
  { name: "\"use cache\"ディレクティブ", desc: "関数・コンポーネントの出力を明示的にキャッシュ対象にする", tier: "must", note: "→ このバージョンではfetchが自動キャッシュされないため、明示的な指定が必要になった", href: "/dev/frontend/nextjs/data" },
  { name: "cacheLife / cacheTag", desc: "キャッシュの有効期限や、後から無効化するためのタグを指定する", tier: "niche", href: "/dev/frontend/nextjs/data" },
  { name: "revalidatePath / revalidateTag / updateTag", desc: "キャッシュ済みデータを、パス指定・タグ指定・即時反映の3段階で再検証する", tier: "must", href: "/dev/frontend/nextjs/data" },
  { name: "Server Actions(Server Functions)", desc: "\"use server\"で、クライアントから直接呼べるサーバー側の関数を定義する", tier: "must", href: "/dev/frontend/nextjs/data" },
  { name: "Streaming & Suspense", desc: "時間のかかる部分を<Suspense>で後から流し込み、他の部分を先に返す", tier: "must", href: "/dev/frontend/nextjs/rendering" },
  { name: "Partial Prerendering (PPR)", desc: "静的な部分と動的な部分を1つのレスポンスの中で組み合わせて配信する", tier: "niche", href: "/dev/frontend/nextjs/rendering" },
  { name: "Proxy(旧Middleware)", desc: "リクエストがルートに到達する前に実行される、認証やリダイレクトなどの共通処理", tier: "must", note: "→ Next.js 16でMiddlewareからProxyに改称された。機能は同じ", href: "/dev/frontend/nextjs/rendering" },
];

function PatternTable({ rows }: { rows: Row[] }) {
  return (
    <table>
      <thead><tr><th>パターン</th><th>目的</th><th>区分</th></tr></thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name}>
            <td className="hl">{p.href ? <Link href={p.href}>{p.name}</Link> : p.name}</td>
            <td>{p.desc}</td>
            <td><TierBadge tier={p.tier} />{p.note && <MarkNote>{p.note}</MarkNote>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const functional: Row[] = [
  { name: "Pure Function(純粋関数)", desc: "副作用がない関数", tier: "must", href: "/design/paradigm/functional/foundations" },
  { name: "Immutability(不変性)", desc: "データを変更しない", tier: "must", href: "/design/paradigm/functional/foundations" },
  { name: "Higher-Order Function(高階関数)", desc: "関数を引数・戻り値にする", tier: "must", href: "/design/paradigm/functional/composition" },
  { name: "Function Composition(関数合成)", desc: "小さな関数を組み合わせる", tier: "must", href: "/design/paradigm/functional/composition" },
  { name: "Pipeline", desc: "処理を上から下へ流す", tier: "must", href: "/design/paradigm/functional/composition" },
  { name: "Map / Filter / Reduce", desc: "コレクション操作", tier: "must", href: "/design/paradigm/functional/composition" },
  { name: "Lazy Evaluation(遅延評価)", desc: "必要になるまで計算しない", tier: "niche", note: "→ 大量データの中間配列を作らずに済ませたい場面で効いてくる", href: "/design/paradigm/functional/composition" },
  { name: "Currying(カリー化)", desc: "引数を分割する", tier: "niche", href: "/design/paradigm/functional/currying" },
  { name: "Partial Application(部分適用)", desc: "一部の引数だけ固定する", tier: "niche", href: "/design/paradigm/functional/currying" },
  { name: "Pattern Matching(パターンマッチング)", desc: "条件分岐をシンプルに", tier: "niche", href: "/design/paradigm/functional/safety" },
  { name: "Option / Maybe", desc: "nullをなくす", tier: "niche", note: "→ TypeScriptには専用の型はなく、Union型やOptional Chainingで代替する", href: "/design/paradigm/functional/safety" },
  { name: "Either / Result", desc: "エラー処理", tier: "niche", href: "/design/paradigm/functional/safety" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計パターン ― クラス数個の粒度で繰り返し現れる定石</h1>
        <Lead>
          「設計パターン」と言うと1994年のGoF(Gang of Four)の23個を指すことが多いですが、実際にはエンタープライズ開発・DDD・マイクロサービス・並行処理・関数型・UIコンポーネントなど、文脈ごとに独自のパターン集が育っています。ここまで見てきた<Link href="/design/architecture">アーキテクチャ</Link>がシステムやアプリ全体の構造だとすると、設計パターンはクラス・オブジェクト数個の粒度で、似た問題に何度も現れる解決策のカタログです。このページでは①GoF ②エンタープライズ ③DDD ④マイクロサービス ⑤並行処理 ⑥関数型 ⑦React UI ⑧Next.jsの8系統に分けて整理します。
        </Lead>
      </Hero>

      <Aside label="この一覧の見方:">
        GoF・エンタープライズ・DDD・関数型・React・Next.jsの6系統は、それぞれ内容的に一番近いオブジェクト指向・アーキテクチャ・方法論・フレームワークのページの配下に詳細ページを置いています(パターン名から直接飛べます)。マイクロサービス・並行処理の2系統は、この一覧ページ自体が唯一の解説場所です。
      </Aside>

      <Heading num="01">学習優先度の見方</Heading>
      <p>パターン集の多くは、まとめられた当時の言語・実行環境を前提にしています。第一級関数やマネージドランタイム、コンテナオーケストレーターを持つ現代の環境では、一部のパターンは「言語機能そのもの」や「インフラが自動でやってくれること」に置き換わっています。<strong>「史」の項目は自分で実装する機会は少なく、矢印の先にある考え方・代替手段を押さえれば十分です</strong>。この区分は8系統すべてのテーブルで共通して使います。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>今の実務コードでも頻繁に登場し、名前で会話に使われるパターン。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の文脈(性能最適化、大規模分散システムなど)で使う。必要になったら読めば十分。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>言語機能・フレームワーク・インフラ側の自動化に置き換わった。歴史的な位置づけとして知っておく程度でよい。</p></Card>
      </CardGrid>

      <Heading num="02">① GoFデザインパターン(23個) ― 生成(Creational)</Heading>
      <p>1994年、Erich Gamma・Richard Helm・Ralph Johnson・John Vlissidesの4名(通称<Term>GoF</Term>)が著書『Design Patterns』でまとめた最も有名なパターン集です。まず「どうやってインスタンスを作るか」に関わるグループから見ていきます。</p>
      <PatternTable rows={creational} />

      <Heading num="03">GoF ― 構造(Structural)</Heading>
      <p>クラスやオブジェクトをどう組み合わせて、より大きな構造を作るかに関わるパターンです。</p>
      <PatternTable rows={structural} />

      <Heading num="04">GoF ― 振る舞い(Behavioral)</Heading>
      <p>オブジェクト同士がどう責務を分担し、どう通信するかに関わるパターンです。GoFの中で最も数が多いグループです。</p>
      <PatternTable rows={behavioral} />

      <Analogy label="💡 アーキテクチャとの関係">
        設計パターンは、アーキテクチャの中で実際に使われる部品でもあります。例えば<Term>Strategy</Term>は<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>のハンドラ切り替えに、<Term>Observer</Term>はイベント通知の仕組みそのものに、<Term>Command</Term>は<Link href="/design/architecture/app/cqrs">CQRS</Link>の書き込み処理の表現によく使われます。「アーキテクチャ」が骨組みだとすれば、「設計パターン」はその骨組みの中の関節部分の作り方です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>生成(5種)</h4><p>オブジェクトの作り方を柔軟にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>構造(7種)</h4><p>クラス・オブジェクトの組み合わせ方を整理する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>振る舞い(11種)</h4><p>責務の分担と、オブジェクト間の通信を整理する。</p></Card>
      </CardGrid>

      <Heading num="05">② エンタープライズパターン(Martin Fowler)</Heading>
      <p>業務システムの「データをどう永続化し、業務ロジックをどう配置するか」を体系化したパターン集です。GoF以上に、業務システムの実務では日常的に使われます。</p>
      <PatternTable rows={enterprise} />

      <Heading num="06">③ DDDパターン</Heading>
      <p><Term>Domain-Driven Design(ドメイン駆動設計)</Term>で体系化されたパターンです。業務知識をコードにそのまま表現することを目的とし、Repositoryなどエンタープライズパターンと重なる語彙も持ちます。</p>
      <PatternTable rows={ddd} />
      <p>DDDの戦術的パターン(Entity・Value Object・Aggregate)と戦略的パターン(Bounded Context・コンテキストマップ)の関係は、<Link href="/design/methodology/ddd">設計方法論のDDDページ</Link>で詳しく扱っています。</p>

      <Heading num="07">④ マイクロサービスパターン</Heading>
      <p>1つのアプリケーションを複数の独立したサービスに分割する、クラウド時代の分散システムでよく使われるパターン群です。</p>
      <PatternTable rows={microservices} />
      <p>分散トランザクション(2PC)や結果整合性の考え方については<Link href="/database/distributed-transactions">分散トランザクション</Link>を、<Link href="/database/distributed-transactions/saga">Saga</Link>と<Link href="/database/distributed-transactions/tcc">TCC</Link>はそれぞれ専用ページで詳しく扱います。マイクロサービス全体の文脈は<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>を、Command/Queryの分離については<Link href="/design/architecture/app/cqrs">CQRS</Link>を参照してください。</p>

      <Heading num="08">⑤ 並行処理パターン</Heading>
      <p>複数の処理を同時に(並行・非同期に)進める際に繰り返し現れる、低レイヤ寄りの定石です。多くはランタイムやフレームワークの内部実装として、意識せずに使っています。</p>
      <PatternTable rows={concurrency} />

      <Heading num="09">⑥ 関数型パターン ― 関数を第一級の値として扱う言語での定石</Heading>
      <p>GoFの23パターンはクラスベースのオブジェクト指向を前提にまとめられたものですが、関数を第一級の値として扱う言語では、同じ「繰り返し現れる定石」でも別の形を取ります。純粋関数・イミュータビリティを土台にした12個の技法で、各パターン名からそれぞれの詳細ページに飛べます。</p>
      <PatternTable rows={functional} />

      <Heading num="10">⑦ Reactでよく使われるUIパターン</Heading>
      <p>UIフレームワークの世界にも、独自の定石があります。React(Hooks以降)を前提に、コンポーネントの分割・状態共有・値の制御でよく使われるパターンです。</p>
      <PatternTable rows={reactPatterns} />

      <Heading num="11">⑧ Next.jsパターン</Heading>
      <p>Reactの上に立つメタフレームワークであるNext.jsにも、独自の定石があります。特にこのバージョン(Next.js 16系)ではキャッシュの前提やMiddlewareの名称など破壊的な変更が入っているため、最新の考え方を押さえておく必要があります。</p>
      <PatternTable rows={nextjsPatterns} />

      <p>次のページでは、これらのパターンをさらに特定の言語機能に落とし込んだ、より実装レベルの<Link href="/design/idioms">実装パターン・イディオム</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional/foundations" tag="設計">関数型パターン</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">Reactパターン(ロジックの再利用)</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs/components" tag="開発">Next.jsパターン(Server/Client境界)</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop/gof/structure" tag="設計">GoFパターン(構造)</RelatedLink>
                    <RelatedLink href="/design/methodology/ddd/tactical" tag="設計">DDD戦術パターンをコードに書く</RelatedLink>
                    <RelatedLink href="/design/methodology/ddd" tag="設計">DDD(ドメイン駆動設計)</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/app/cqrs" tag="設計">高度な設計系(CQRS)</RelatedLink>
                    <RelatedLink href="/design/idioms" tag="設計">実装パターン・イディオム</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
