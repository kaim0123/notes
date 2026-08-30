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
  title: "業務ロジックの置き場所",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Domain Model", desc: "業務ロジックをオブジェクトの振る舞いとして表現する、リッチなモデル", tier: "must" },
  { name: "Service Layer", desc: "アプリケーションが提供する操作の境界を、トランザクション単位でまとめて定義する", tier: "must" },
  { name: "Transaction Script", desc: "1つのビジネストランザクションの手続きを、そのまま1つの手続き(関数)として書く", tier: "niche", note: "→ 小規模なCRUD中心のアプリでは十分だが、複雑化するとDomain Modelへ移行する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ &middot; アプリケーション視点 &middot; エンタープライズパターン</Eyebrow>
        <h1>業務ロジックの置き場所 ― Domain ModelとService Layer</h1>
        <Lead>
          同じ業務ロジックでも、「1つの手続きとして書く(<Term>Transaction Script</Term>)」か「オブジェクトの振る舞いとして書く(<Term>Domain Model</Term>)」かで、複雑化したときの保守性が大きく変わります。ここでは両者を比較したうえで、Domain Modelを外部から呼び出す窓口となる<Term>Service Layer</Term>の役割を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">2つ(+1)の選択肢</Heading>
      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th><th>区分</th></tr>
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

      <Heading num="02">Transaction Script ― 手続きとしてそのまま書く</Heading>
      <p><Term>Transaction Script</Term>は、1つのビジネストランザクションを、上から下に読める1つの関数として書くスタイルです。ロジックが単純なうちは最も分かりやすく、余計な抽象化もありません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Transaction Script: 「注文をキャンセルする」手続きをそのまま書く
async function cancelOrder(orderId: string) {
  const order = await db.orders.findById(orderId);
  if (order.status === "shipped") {
    throw new Error("発送済みの注文はキャンセルできません");
  }
  await db.orders.update(orderId, { status: "cancelled" });
  await db.inventory.restock(order.items);
  await mailer.send(order.customerEmail, "注文がキャンセルされました");
}`}</code>
      </pre>
      <p>この関数だけを見ている間は問題ありませんが、「キャンセル可能な条件」が増えたり、他の場所(管理画面・バッチ処理)からも同じキャンセル処理を呼びたくなると、同じ判定ロジックが手続きのあちこちにコピーされ始めます。</p>

      <Heading num="03">Domain Model ― オブジェクトの振る舞いとして書く</Heading>
      <p><Term>Domain Model</Term>では、「キャンセルできるかどうか」の判定ロジックそのものを<code>Order</code>オブジェクトの責務にします。判定条件はクラスの外に漏れず、呼び出し側は「キャンセルして」と依頼するだけになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Domain Model: 「キャンセルできるか」の判定を自分で持つ
class Order {
  private status: "pending" | "shipped" | "cancelled";
  private readonly items: OrderItem[];

  cancel(): OrderCancelledEvent {
    if (this.status === "shipped") {
      throw new Error("発送済みの注文はキャンセルできません");
    }
    this.status = "cancelled";
    return { orderId: this.id, restockItems: this.items };
  }
}

// 呼び出し側は「何を確認すべきか」を知らなくてよい
const event = order.cancel();`}</code>
      </pre>
      <p>判定ロジックが<code>Order</code>クラスの中に閉じているため、キャンセル条件が増えても変更箇所は1つだけで済み、どこから呼んでも同じ判定が保証されます。業務ロジックが複雑になるほど、この差が保守性に直結します。</p>

      <Heading num="04">Service Layer ― Domain Modelを呼び出す窓口を定義する</Heading>
      <p><Term>Service Layer</Term>は、UIやAPIハンドラといった外側の世界と、Domain Model・Repositoryといった内側の世界の間に立つ窓口です。1つのユースケース(トランザクション境界)を1つのメソッドとして提供し、Domain Modelの組み立てや永続化、イベント発行の手配をまとめて担います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// Service Layer: 1つのユースケースを1つの操作として公開する
class OrderService {
  constructor(
    private orders: OrderRepository,
    private inventory: InventoryService,
    private mailer: Mailer,
  ) {}

  async cancelOrder(orderId: string): Promise<void> {
    const order = await this.orders.findById(orderId);
    const event = order.cancel(); // 判定はDomain Modelの責務
    await this.orders.save(order);
    await this.inventory.restock(event.restockItems);
    await this.mailer.send(order.customerEmail, "注文がキャンセルされました");
  }
}`}</code>
      </pre>
      <p>APIハンドラは<code>OrderService.cancelOrder()</code>を呼ぶだけでよく、「業務ルールの判定」と「その周辺の手配(永続化・通知)」がそれぞれDomain ModelとService Layerに分かれて配置されます。</p>

      <Analogy label="💡 たとえるなら">
        Transaction Scriptは「レシピを1枚の手順書として読み上げる」やり方です。Domain Modelは「食材(オブジェクト)自身に調理法を持たせる」やり方で、同じ食材を使う別の料理でも調理法を再利用できます。Service Layerは、注文を受けてキッチンに指示を出す「ホール担当」で、お客(外の世界)とキッチン(Domain Model)を繋ぎます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Transaction Script</h4><p>手続きを1つの関数としてそのまま書く。単純なうちは最も分かりやすい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Domain Model</h4><p>業務ルールの判定をオブジェクトの責務にし、重複と漏れを防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Service Layer</h4><p>外の世界とDomain Modelの間に立ち、1ユースケース=1操作として公開する。</p></Card>
      </CardGrid>

      <p>永続化そのものの定石については<Link href="/design/architecture/app/data-access/patterns">永続化層の定石</Link>を、Domain Modelを中心に据えたアプリケーション全体の構造については<Link href="/design/architecture/app/domain-model">ドメインモデル系アーキテクチャ</Link>を参照してください。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/app/data-access/patterns" tag="設計">永続化層の定石</RelatedLink>
                    <RelatedLink href="/design/architecture/app/domain-model" tag="設計">ドメインモデル系アーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
