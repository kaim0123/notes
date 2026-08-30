import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "データアクセス系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>データアクセス系 ― オブジェクトとDBをどう対応させるか</h1>
        <Lead>
          <Link href="/design/architecture-app-domain-model">ドメインモデル系</Link>で表現したオブジェクトを、実際にどうデータベースへ読み書きするかという問いへの答えです。「オブジェクト自身にDB操作をどこまで持たせるか」という結合度の違いで、選択肢が並びます。
        </Lead>
      </Hero>

      <Heading num="01">結合度のグラデーション</Heading>

      <DiagramFrame
        slug="design-architecture-app-data-access-coupling"
        aspect="680 / 280"
        caption="オブジェクトとデータベースの対応づけ方を結合度の順に並べた図。左のActive Recordはオブジェクト自身がsaveやfindByIdを持ち最も密結合。中央のData Mapperは変換専任のマッパーを挟むためドメインオブジェクトはDBを知らない。右のRepositoryはコレクションのように振る舞う窓口の裏にDBやAPI、キャッシュを隠す。右へ行くほど疎結合になるが、用意する部品は増える。"
      />

      <Heading num="02">Active Record ― 1レコード=1オブジェクト</Heading>
      <p>
        <Term>Active Record</Term>は、DBの1レコードを1オブジェクトに対応させ、そのオブジェクト自身に保存・更新・削除といったDB操作のメソッドも持たせる方法です。<code>user.save()</code>のように直感的に書けるため学習コストが低く、多くのフレームワークの標準的なORMとして採用されています。一方でテーブル構造とオブジェクトの構造が密結合になりやすく、業務ロジックが複雑な場合はData Mapperのほうが向きます。
      </p>
      <pre>
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

      <Heading num="03">Data Mapper ― 変換を専任クラスに任せる</Heading>
      <p>
        <Term>Data Mapper</Term>は、ドメインオブジェクトとDBの行データを直接結びつけず、両者を変換する専用のマッパーを間に置く設計です。ドメインオブジェクト自身は「自分がどう保存されるか」を一切知らなくてよいため、ドメインモデルを純粋に保てます。
      </p>
      <pre>
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

      <Heading num="04">Repository ― コレクションのように振る舞う窓口</Heading>
      <p>
        <Term>Repository</Term>は、メモリ上のコレクションであるかのように振る舞う窓口を用意し、その裏側でDBへのクエリを実行する方法です。呼び出し側は「SQLをどう書くか」を意識せずにデータを取得できます。取得元(DB・外部API・キャッシュ)そのものを隠せるため、テスト時はインメモリ実装に差し替えられます。
      </p>
      <pre>
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

      <Heading num="05">Unit of Work ― 変更をまとめて1回でコミットする</Heading>
      <p>
        <Term>Unit of Work</Term>は、1つの処理単位の中で行われた複数の変更を追跡し、最後にまとめてコミットする仕組みです。自前で実装する機会は少なく、多くのORMのトランザクションAPIやセッション管理に内包されています。
      </p>
      <pre>
        <code>{`await prisma.$transaction(async (tx) => {
  await tx.order.update({ where: { id: orderId }, data: { status: "paid" } });
  await tx.inventory.update({ where: { sku }, data: { stock: { decrement: qty } } });
  // どちらかが失敗すれば、両方ロールバックされる
});`}</code>
      </pre>

      <Heading num="06">Lazy Load ― 必要になるまで読み込まない</Heading>
      <p>
        <Term>Lazy Load</Term>は、関連するデータを実際にアクセスされるまで読み込まない仕組みです。多くのORMが自動的に実現しますが、ループの中で関連データに1件ずつアクセスすると、ループの回数分だけ追加のクエリが発行される<Term>N+1問題</Term>を引き起こす原因にもなります。
      </p>
      <pre>
        <code>{`// 危険な例: orders の件数分だけ追加の SELECT が発行される
for (const order of orders) {
  const customer = await order.customer; // アクセスした瞬間に読み込まれる
}

// 対策: 事前にまとめて読み込む
const orders = await db.order.findMany({ include: { customer: true } });`}</code>
      </pre>

      <Aside label="自動でやってくれるものほど、挙動を知っておく">
        Lazy LoadもUnit of WorkもORMが裏で担ってくれます。だからこそ、遅いクエリを追うときに「なぜここでSELECTが飛んでいるのか」を説明できるかどうかが分かれ目になります。クエリの読み方は<Link href="/database/performance">パフォーマンスチューニング</Link>で扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        Active Recordは「自分で会計処理までできる社員」です。話は早いですが、業務とDB操作が同じ人に混ざっています。Data Mapperは専任の経理担当を別に置くやり方、Repositoryは「棚から欲しいものを取ってきてくれる倉庫係」で、どこに何が保管されているかを意識せずに済みます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Active Record</h4><p>1レコード=1オブジェクトに、DB操作そのものも持たせる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Data Mapper / Repository</h4><p>変換や取得元を別の層へ切り出し、ドメインをDBから独立させる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Unit of Work / Lazy Load</h4><p>ORMが裏で担う仕組み。挙動を知らないとN+1問題を踏む。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-data-access" />
    </DocsPage>
  );
}
