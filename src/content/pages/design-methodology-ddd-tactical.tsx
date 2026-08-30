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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "戦術的DDDをコードに書く",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>戦術的DDDをコードに書く ― Entity・値オブジェクト・集約・リポジトリ</h1>
        <Lead>
          ユビキタス言語・境界づけられたコンテキスト・コンテキストマップといった概念面は<Link href="/design/methodology-ddd">ドメイン駆動設計</Link>で扱いました。ここではその中身 ―
          エンティティ・値オブジェクト・集約・リポジトリの4つを、実際にTypeScriptのコードへどう落とし込むかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">同一性の考え方が出発点</Heading>
      <p>
        4つのうち、エンティティと値オブジェクトの違いは「<Term>何をもって同じとみなすか</Term>」だけです。ここを取り違えると、以降の設計がすべてずれます。
      </p>

      <DiagramFrame
        slug="design-methodology-ddd-identity"
        aspect="660 / 280"
        caption="エンティティと値オブジェクトの同一性の違い。左のエンティティでは、名前が変わった2つの顧客オブジェクトがIDで比較され、IDが同じなので同一と判定される。右の値オブジェクトでは、別インスタンスとして作られた2つのメールアドレスが値で比較され、値が同じなので同一と判定される。何をもって同じとみなすかが、そのままクラスの性質を決める。"
      />

      <Heading num="02">値オブジェクト ― 値が同じなら同一とみなす</Heading>
      <p>
        <Term>値オブジェクト</Term>は、内部の値がすべて等しければ同じものとみなす、不変なオブジェクトです。コンストラクタで検証を行い、一度作られた後は値を変更する手段を用意しないことで、「不正な状態のメールアドレスは存在しない」ことをクラス自身が保証します。<Link href="/design/methodology-contract">契約による設計</Link>のクラス不変条件を、そのまま形にしたものと言えます。
      </p>
      <pre>
        <code>{`class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!value.includes("@")) {
      throw new Error("invalid email");
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

      <Heading num="03">エンティティ ― IDが同じなら同一とみなす</Heading>
      <p>
        <Term>エンティティ</Term>は値オブジェクトと対照的に、IDによって同一性が決まるオブジェクトです。名前や状態などの属性が変わっても、IDが同じなら「同じ顧客」「同じ注文」として扱います。等価性の比較もIDだけを見ます。
      </p>
      <pre>
        <code>{`class Customer {
  constructor(
    readonly id: string,
    private name: string,
  ) {}

  rename(newName: string): void {
    this.name = newName; // 属性は変わるが、id が同じなら「同じ顧客」
  }

  equals(other: Customer): boolean {
    return this.id === other.id; // 値ではなくIDだけで比較する
  }
}`}</code>
      </pre>

      <Heading num="04">集約 ― 不変条件を守る窓口</Heading>
      <p>
        <Term>集約</Term>は、一緒に整合性を保つべきエンティティ・値オブジェクトのまとまりです。外部からは<Term>集約ルート</Term>を経由してのみ変更でき、内部のコレクションを直接公開しないことで、「発送済みの注文には行を追加できない」といった不変条件を集約自身が強制します。
      </p>
      <pre>
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
      <p>
        集約の大きさは設計判断です。大きくしすぎると更新のたびに広い範囲をロックすることになり、小さくしすぎると整合性を保つ責任が集約の外へ漏れます。目安は「1トランザクションで必ず一緒に更新される範囲」です。
      </p>

      <Heading num="05">リポジトリ ― 集約をコレクションのように扱う</Heading>
      <p>
        <Term>リポジトリ</Term>は、集約の永続化をドメインの外に隠す窓口です。ドメイン層はSQLやORMを一切知らず、コレクションを操作しているかのようなインターフェースだけを見ます。インターフェースをドメイン側に、実装をインフラ側に置くのは<Link href="/design/principles-solid">依存性逆転の原則</Link>そのものです。
      </p>
      <pre>
        <code>{`// インターフェースはドメイン層に置く
interface OrderRepository {
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
        値オブジェクトは「金額が同じなら同じ価値を持つ紙幣」、エンティティは「顔や持ち物が変わっても、同じ番号なら同一人物」です。集約は「受付窓口を通さないと中の書類を書き換えられない役所の手続き」、リポジトリは「倉庫の中身がどう保管されているかを気にせず、番号を渡せば出し入れできる受付」に相当します。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>値オブジェクト</h4>
          <p>値が同じなら同一。検証済みの不変オブジェクトとして扱う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>エンティティ</h4>
          <p>IDが同じなら同一。属性は変わってもよい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>集約</h4>
          <p>集約ルート経由でのみ変更させ、不変条件を守る。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>リポジトリ</h4>
          <p>永続化の詳細を隠し、コレクションのように扱えるようにする。</p>
        </Card>
      </CardGrid>

      <p>
        永続化層のより広いパターンは<Link href="/design/architecture-app-data-access">データアクセス系アーキテクチャ</Link>で扱っています。
      </p>

      <DocsFooter href="/design/methodology-ddd-tactical" />
    </DocsPage>
  );
}
