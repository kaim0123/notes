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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "永続化層の定石",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Repository", desc: "コレクションのように振る舞うインターフェースの背後に、永続化の詳細を隠す" },
  { name: "Unit of Work", desc: "1つの処理単位で行われた変更をまとめて追跡し、一括でコミットする" },
  { name: "Data Mapper", desc: "ドメインオブジェクトとDBスキーマを分離し、両者の変換を専用のクラスが担う" },
  { name: "Active Record", desc: "1つのオブジェクトが自身のデータと、保存・削除などの永続化ロジックを両方持つ" },
  { name: "Lazy Load", desc: "関連するデータを、実際に必要になるまで読み込みを遅延させる" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ &middot; アプリケーション視点 &middot; エンタープライズパターン</Eyebrow>
        <h1>永続化層の定石 ― Repository・Unit of Work・Data Mapper・Active Record・Lazy Load</h1>
        <Lead>
          Martin Fowlerのエンタープライズパターンのうち、業務システムの永続化層で日常的に使われる5つを扱います。GoFの23パターンと違い、こちらは「DBとどう向き合うか」という1つの問題に絞られている分、実務での出番が多いパターン集です。
        </Lead>
      </Hero>

      <Heading num="01">5つのパターン</Heading>
      <table>
        <thead>
          <tr><th>パターン</th><th>目的</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Repository ― 永続化をコレクションのように扱う</Heading>
      <p><Term>Repository</Term>は、DBの具体的な操作(SQL・クライアントAPI)を隠し、呼び出し側からは配列やコレクションを操作しているかのように振る舞うインターフェースです。ドメイン層はDBの存在を意識せずに済み、テスト時はインメモリ実装に差し替えられます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class PrismaUserRepository implements UserRepository {
  constructor(private db: PrismaClient) {}

  async findById(id: string) {
    const row = await this.db.user.findUnique({ where: { id } });
    return row ? toUser(row) : null;
  }

  async save(user: User) {
    await this.db.user.upsert({
      where: { id: user.id },
      update: toRow(user),
      create: toRow(user),
    });
  }
}`}</code>
      </pre>

      <Heading num="03">Unit of Work ― 変更をまとめて1回でコミットする</Heading>
      <p><Term>Unit of Work</Term>は、1つの処理単位(1リクエストや1トランザクション)の中で行われた複数の変更を追跡し、最後にまとめてコミットする仕組みです。自前で実装する機会は少なく、多くのORMのトランザクションAPI・セッション管理に内包されています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// PrismaのInteractive Transactionが実質的にUnit of Workを担う
await prisma.$transaction(async (tx) => {
  await tx.order.update({ where: { id: orderId }, data: { status: "paid" } });
  await tx.inventory.update({ where: { sku }, data: { stock: { decrement: qty } } });
  // どちらかが失敗すれば、両方ロールバックされる
});`}</code>
      </pre>

      <Heading num="04">Data Mapper ― ドメインとDBの変換を専任クラスに任せる</Heading>
      <p><Term>Data Mapper</Term>は、ドメインオブジェクトとDBの行データを直接結びつけず、両者を変換する専用のマッパーを間に置く設計です。ドメインオブジェクト自身は「自分がどう保存されるか」を一切知らなくてよいため、ドメインモデルを純粋に保てます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type UserRow = { id: string; display_name: string; email: string };

// DBの行 → ドメインオブジェクト
function toUser(row: UserRow): User {
  return new User(row.id, row.display_name, new Email(row.email));
}

// ドメインオブジェクト → DBの行
function toRow(user: User): UserRow {
  return { id: user.id, display_name: user.name, email: user.email.value };
}`}</code>
      </pre>

      <Heading num="05">Active Record ― データと永続化ロジックを1つのオブジェクトにまとめる</Heading>
      <p><Term>Active Record</Term>はData Mapperと対になる設計選択です。1つのオブジェクトが自分のデータと、保存・削除などの永続化ロジックを両方持ちます。マッパーを別に用意する必要がなく小規模なアプリでは書く量が少なくて済みますが、ドメインロジックと永続化ロジックが同じクラスに混在します。Ruby on Rails・Laravelなどのフレームワークが標準採用しています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class User {
  constructor(public id: string, public name: string) {}

  static async findById(id: string): Promise<User | null> {
    const row = await db.user.findUnique({ where: { id } });
    return row ? new User(row.id, row.display_name) : null;
  }

  async save(): Promise<void> {
    await db.user.upsert({
      where: { id: this.id },
      update: { display_name: this.name },
      create: { id: this.id, display_name: this.name },
    });
  }
}`}</code>
      </pre>

      <Heading num="06">Lazy Load ― 必要になるまで関連データを読み込まない</Heading>
      <p><Term>Lazy Load</Term>は、関連するデータ(1対多・多対多の関連レコードなど)を、実際にアクセスされるまで読み込みを遅延させる仕組みです。多くのORMがgetterやプロキシで自動的に実現しますが、ループの中で関連データに1件ずつアクセスすると、ループの回数分だけ追加のクエリが発行される<Term>N+1問題</Term>を引き起こす原因にもなるため、挙動を正しく理解しておく必要があります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 危険な例: ordersの件数分だけ追加のSELECTが発行される(N+1問題)
for (const order of orders) {
  const customer = await order.customer; // アクセスした瞬間に遅延読み込み
}

// 対策: 事前にまとめて読み込む(Eager Loading)
const orders = await db.order.findMany({ include: { customer: true } });`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        Repositoryは「本棚の中身を意識させない図書館の受付」、Unit of Workは「会計をまとめて1回で済ませるレジ」です。Data MapperとActive Recordは、荷物(データ)と運び方(永続化ロジック)を別の人が担うか、荷物自身が運び方まで知っているかの違いに相当します。Lazy Loadは「聞かれるまで説明しない」窓口で、聞かれるたびに1人ずつ別窓口に並ばせると(N+1問題)、行列がどんどん伸びてしまいます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Repository</h4><p>永続化の詳細を隠し、コレクションのように扱える窓口を用意する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Unit of Work</h4><p>1処理単位の変更をまとめて追跡し、一括でコミットする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Data Mapper / Active Record</h4><p>ドメインとDBの変換を分離するか、1つのオブジェクトに両方持たせるかを選ぶ。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Lazy Load</h4><p>必要になるまで読み込みを遅らせつつ、N+1問題に注意する。</p></Card>
      </CardGrid>

      <p>これらのパターンが実際のアプリケーションのどの層に位置づけられるかは、<Link href="/design/architecture/app/data-access">データアクセス系アーキテクチャ</Link>で扱っています。業務ロジックをどこに置くかという次の問いは、<Link href="/design/architecture/app/domain-model/patterns">業務ロジックの置き場所</Link>で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/domain-model/patterns" tag="設計">業務ロジックの置き場所</RelatedLink>
                    <RelatedLink href="/design/architecture/app/data-access" tag="設計">データアクセス系アーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
