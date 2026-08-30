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
  title: "戦術的DDDをコードに書く",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Entity", desc: "IDによって同一性が決まるオブジェクト" },
  { name: "Value Object", desc: "属性の値によって同一性が決まる、不変なオブジェクト" },
  { name: "Aggregate / Aggregate Root", desc: "整合性を保つべきオブジェクトのまとまりと、その代表窓口" },
  { name: "Repository", desc: "集約をコレクションのように取得・保存する窓口" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計思想・方法論 &middot; DDD &middot; パターン</Eyebrow>
        <h1>戦術的DDDをコードに書く ― Entity・Value Object・Aggregate・Repository</h1>
        <Lead>
          概念・戦略的DDD(<Term>ユビキタス言語</Term>・<Term>境界づけられたコンテキスト</Term>・コンテキストマップ)は<Link href="/design/methodology/ddd">設計方法論のDDDページ</Link>で扱いました。ここではその中身、Entity・Value Object・Aggregate・Repositoryの4つを実際にTypeScriptのコードにどう落とし込むかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">4つのパターン</Heading>
      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th><th>区分</th></tr>
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

      <Heading num="02">Value Object ― 値が同じなら同一とみなす</Heading>
      <p><Term>値オブジェクト</Term>は、内部の値がすべて等しければ「同じもの」とみなす、不変(イミュータブル)なオブジェクトです。コンストラクタでバリデーションを行い、一度作られた後は値を変更する手段を用意しないことで、「不正な状態のEmailは存在しない」ことをクラス自身が保証します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      throw new Error(\`invalid email: \${value}\`);
    }
    this.value = value; // 以降、このインスタンスは変更されない
  }

  equals(other: Email): boolean {
    return this.value === other.value; // 値が同じなら同一
  }

  toString(): string {
    return this.value;
  }
}

const a = new Email("a@example.com");
const b = new Email("a@example.com");
a.equals(b); // true ― 別インスタンスでも値が同じなら同一`}</code>
      </pre>

      <Heading num="03">Entity ― IDが同じなら同一とみなす</Heading>
      <p><Term>エンティティ</Term>はValue Objectと対照的に、IDによって同一性が決まるオブジェクトです。名前や状態などの属性が変わっても、IDが同じなら「同じ顧客」「同じ注文」として扱います。等価性の比較もIDだけを見ます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class Customer {
  constructor(
    readonly id: string,
    private name: string,
  ) {}

  rename(newName: string): void {
    this.name = newName; // 属性は変わるが、idが同じなら「同じ顧客」
  }

  equals(other: Customer): boolean {
    return this.id === other.id; // 値ではなくIDだけで比較する
  }
}`}</code>
      </pre>

      <Heading num="04">Aggregate / Aggregate Root ― 不変条件を守る窓口</Heading>
      <p><Term>集約</Term>は、一緒に整合性を保つべきEntity・Value Objectのまとまりです。外部からは<Term>集約ルート</Term>(この例では<code>Order</code>)を経由してのみ変更でき、内部のコレクションを直接公開しないことで、「発送済みの注文には行を追加できない」といった不変条件を集約自身が強制します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class OrderLine {
  constructor(readonly productId: string, readonly quantity: number) {}
}

class Order {
  private readonly lines: OrderLine[] = [];
  private status: "draft" | "shipped" = "draft";

  constructor(readonly id: string) {}

  addLine(line: OrderLine): void {
    if (this.status === "shipped") {
      throw new Error("発送済みの注文には追加できません"); // 不変条件をここで守る
    }
    this.lines.push(line);
  }

  ship(): void {
    if (this.lines.length === 0) throw new Error("空の注文は発送できません");
    this.status = "shipped";
  }

  get lineItems(): readonly OrderLine[] {
    return this.lines; // 配列そのものは渡さず、読み取り専用として公開
  }
}`}</code>
      </pre>

      <Heading num="05">Repository ― 集約をコレクションのように扱う</Heading>
      <p><Term>リポジトリ</Term>は、集約の永続化(DBへの保存・取得)をドメインの外に隠す窓口です。ドメイン層はSQLやORMを一切知らず、「配列やコレクションを操作している」かのようなインターフェースだけを見ます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// 実装はドメイン層の外(インフラ層)に置く
class PrismaOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    const record = await prisma.order.findUnique({ where: { id } });
    return record ? toDomain(record) : null;
  }

  async save(order: Order): Promise<void> {
    await prisma.order.upsert({
      where: { id: order.id },
      update: toRecord(order),
      create: toRecord(order),
    });
  }
}`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        Value Objectは「金額が同じなら同じ価値を持つ紙幣」、Entityは「顔や持ち物が変わっても、マイナンバーが同じなら同一人物」です。Aggregateは「受付窓口(集約ルート)を通さないと中の書類を書き換えられない役所の手続き」、Repositoryは「倉庫の中身がどう保管されているかを気にせず、番号を渡せば出し入れできる受付」に相当します。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Value Object</h4><p>値が同じなら同一。バリデーション済みの不変オブジェクトとして扱う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Entity</h4><p>IDが同じなら同一。属性は変わってもよい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Aggregate</h4><p>集約ルート経由でのみ変更させ、不変条件を守る。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Repository</h4><p>永続化の詳細を隠し、コレクションのように扱えるようにする。</p></Card>
      </CardGrid>

      <p>戦略的DDD(境界づけられたコンテキスト・コンテキストマップ)との関係は<Link href="/design/methodology/ddd">設計方法論のDDDページ</Link>を、永続化層のより広いパターンは<Link href="/design/architecture/app/data-access/patterns">エンタープライズパターン(永続化層の定石)</Link>を参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology/ddd" tag="設計">DDD(ドメイン駆動設計)</RelatedLink>
                    <RelatedLink href="/design/architecture/app/data-access/patterns" tag="設計">エンタープライズパターン(永続化層の定石)</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
