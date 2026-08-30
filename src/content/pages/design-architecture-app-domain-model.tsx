import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ドメインモデル系(アプリ)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ドメインモデル系 ― 業務ロジックをどこに置くか</h1>
        <Lead>
          <Term>ドメインモデル系</Term>は、「業務ルールをコードとしてどう表現するか」という問いに、業務の複雑さに応じて異なる答えを出している系統です。同じ処理でも、1つの手続きとして書くか、オブジェクトの振る舞いとして書くかで、複雑化したときの保守性が大きく変わります。
        </Lead>
      </Hero>

      <Heading num="01">複雑さに応じた3つの選択肢</Heading>
      <table>
        <thead>
          <tr><th>スタイル</th><th>内容</th><th>向く場面</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Transaction Script</td>
            <td>1つの業務処理を、上から下へ読める手続きとして書く</td>
            <td>業務ルールが少なく、呼び出し口も1つのうち</td>
          </tr>
          <tr>
            <td className="hl">Table Module</td>
            <td>テーブル1つに1つのロジッククラスを対応させる</td>
            <td>データセット中心の処理。現代ではORM経由の他2つが主流</td>
          </tr>
          <tr>
            <td className="hl">Domain Model</td>
            <td>業務ルールをオブジェクトのメソッドとして表現する</td>
            <td>業務ルールが複雑で、呼び出し口が複数あるとき</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">Transaction Script ― 手続きとしてそのまま書く</Heading>
      <p>
        <Term>Transaction Script</Term>は、1つのビジネストランザクションを、上から下に読める1つの関数として書くスタイルです。ロジックが単純なうちは最も分かりやすく、余計な抽象化もありません。
      </p>
      <pre>
        <code>{`// 「注文をキャンセルする」手続きをそのまま書く
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
      <p>
        この関数だけを見ている間は問題ありません。しかし「キャンセル可能な条件」が増えたり、管理画面やバッチ処理からも同じキャンセルを呼びたくなると、同じ判定ロジックがあちこちにコピーされ始めます。
      </p>

      <Heading num="03">Domain Model ― オブジェクトの振る舞いとして書く</Heading>

      <DiagramFrame
        slug="design-architecture-app-domain-model-logic"
        aspect="680 / 300"
        caption="業務ロジックの置き場所の比較。左のTransaction Scriptでは「発送済みならキャンセル不可」という判定が手続きの中に直接書かれ、管理画面からも呼びたくなると同じ判定がコピーされる。右のDomain Modelでは、その判定が注文オブジェクトのcancelメソッドの中に閉じており、どこから呼んでも同じ判定が保証され、条件が増えても変更箇所は1つで済む。"
      />

      <p>
        <Term>Domain Model</Term>では、「キャンセルできるかどうか」の判定ロジックそのものを<code>Order</code>オブジェクトの責務にします。判定条件はクラスの外に漏れず、呼び出し側は「キャンセルして」と依頼するだけになります。
      </p>
      <pre>
        <code>{`class Order {
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

      <Heading num="04">Service Layer ― Domain Modelを呼び出す窓口</Heading>
      <p>
        <Term>Service Layer</Term>は、UIやAPIハンドラといった外側の世界と、Domain ModelやRepositoryといった内側の世界の間に立つ窓口です。1つのユースケース(トランザクション境界)を1つのメソッドとして提供し、Domain Modelの組み立て・永続化・イベント発行の手配をまとめて担います。
      </p>
      <pre>
        <code>{`class OrderService {
  constructor(
    private orders: OrderRepository,
    private inventory: InventoryService,
    private mailer: Mailer,
  ) {}

  async cancelOrder(orderId: string): Promise<void> {
    const order = await this.orders.findById(orderId);
    const event = order.cancel();        // 判定は Domain Model の責務
    await this.orders.save(order);
    await this.inventory.restock(event.restockItems);
    await this.mailer.send(order.customerEmail, "注文がキャンセルされました");
  }
}`}</code>
      </pre>
      <p>
        APIハンドラは<code>cancelOrder()</code>を呼ぶだけでよく、「業務ルールの判定」と「その周辺の手配」がそれぞれDomain ModelとService Layerに分かれて配置されます。この構造は<Link href="/design/methodology-use-case-driven">ユースケース中心設計</Link>の制御オブジェクトや、Clean ArchitectureのUse Case層と同じ位置づけです。
      </p>

      <Analogy label="💡 たとえるなら">
        Transaction Scriptは「レシピを1枚の手順書として読み上げる」やり方です。Domain Modelは「食材自身に調理法を持たせる」やり方で、同じ食材を使う別の料理でも調理法を再利用できます。Service Layerは、注文を受けてキッチンに指示を出すホール担当で、お客(外の世界)とキッチン(Domain Model)をつなぎます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Transaction Script</h4><p>手続きを1つの関数としてそのまま書く。単純なうちは最も分かりやすい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Domain Model</h4><p>業務ルールの判定をオブジェクトの責務にし、重複と漏れを防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Service Layer</h4><p>外の世界とDomain Modelの間に立ち、1ユースケース=1操作として公開する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-app-domain-model" />
    </DocsPage>
  );
}
