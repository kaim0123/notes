import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GoF ― 構造を包む・繋ぐ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>構造を包む・繋ぐ ― Adapter・Composite・Decorator・Facade・Proxy</h1>
        <Lead>
          <Link href="/design/patterns-gof-creation">生成を工夫する</Link>2つのパターンに続き、ここではクラス・オブジェクトをどう組み合わせて、より大きな構造を作るかに関わる5つを見ていきます。いずれも「何かを直接使わず、間に何かを挟む」という発想のバリエーションです。
        </Lead>
      </Hero>

      <DiagramFrame
        slug="design-patterns-gof-structure-wrap"
        aspect="700 / 290"
        caption="構造に関する5つのパターンを、何を間に挟むかで整理した図。Adapterは形が合わないものを変換して繋ぎ、Decoratorは元のものを包んで機能を足し、Facadeは複数をまとめて1つの窓口にし、Proxyは本物の手前に代理を立ててアクセスを制御し、Compositeは1つと集合を同じ形で扱う。挟むものが変換なのか、包みなのか、窓口なのか、代理なのかで名前が変わる。"
      />

      <Heading num="01">Adapter ― 形が合わないものを変換して繋ぐ</Heading>
      <p>
        <Term>Adapter</Term>は、既存のインターフェースを変更できないまま、呼び出し側が期待する形に変換して繋ぐパターンです。外部ライブラリやサードパーティAPIのレスポンス形式が、アプリ内部で使いたい形と違う場合によく使います。
      </p>
      <pre>
        <code>{`// 外部SDKが返す形(こちらでは変更できない)
type SdkUser = { user_id: string; full_name: string };

// アプリ内部で使いたい形
type User = { id: string; name: string };

// 変換だけを担う関数がアダプタ
function toUser(raw: SdkUser): User {
  return { id: raw.user_id, name: raw.full_name };
}`}</code>
      </pre>
      <p>
        アダプタを1箇所に集めておくと、外部の仕様変更で書き換えるのはその関数だけになります。逆にアダプタを置かず外部の型をアプリ全体に流すと、外部の都合がコードの隅々まで染み出します。<Link href="/design/methodology-ddd">DDD</Link>の腐敗防止層は、この考え方をコンテキスト境界の粒度で行ったものです。
      </p>

      <Heading num="02">Decorator ― 包んで機能を足す</Heading>
      <p>
        <Term>Decorator</Term>は、元のオブジェクト(または関数)を包んで、動的に機能を追加するパターンです。関数を値として扱える言語では、クラスの継承関係を作らずに高階関数で同じ効果が得られます。
      </p>
      <pre>
        <code>{`type Fetcher = (url: string) => Promise<Response>;

// ログ出力の機能を「包んで」足す
function withLogging(fetcher: Fetcher): Fetcher {
  return async (url) => {
    console.log("request:", url);
    const res = await fetcher(url);
    console.log("status:", res.status);
    return res;
  };
}

// リトライも同じ形で足せる。順番を変えれば挙動も変わる
const fetchWithLogging = withLogging(withRetry(fetch));`}</code>
      </pre>
      <p>
        包む順番がそのまま処理の順番になるため、機能を足したり外したりが1行で済みます。<Link href="/design/principles-modern">継承より合成</Link>という原則が、最も分かりやすく形になったパターンです。
      </p>

      <Heading num="03">Facade ― 複数をまとめて1つの窓口にする</Heading>
      <p>
        <Term>Facade</Term>は、複数のクラス・モジュールからなる複雑なサブシステムに対して、単純な窓口を1つ用意するパターンです。呼び出し側は窓口の向こう側にある複雑さを知らずに済みます。
      </p>
      <pre>
        <code>{`// 決済・在庫・通知という3つのサブシステムを、1つの窓口にまとめる
class CheckoutFacade {
  constructor(
    private payment: PaymentGateway,
    private inventory: InventoryService,
    private notifier: Notifier,
  ) {}

  async checkout(order: Order): Promise<void> {
    await this.payment.charge(order.total);
    await this.inventory.reserve(order.items);
    await this.notifier.send(order.customerEmail, "ご注文ありがとうございます");
  }
}`}</code>
      </pre>
      <p>
        マイクロサービスのAPIゲートウェイは、このFacadeをシステムの粒度で行ったものです。
      </p>

      <Heading num="04">Proxy ― 本物の手前に代理を立てる</Heading>
      <p>
        <Term>Proxy</Term>は、本物のオブジェクトの代わりに立つ代理を用意し、アクセス制御や遅延生成、キャッシュを行うパターンです。呼び出し側からは本物と同じインターフェースに見えます。ORMの遅延読み込みや、画像の遅延ロードはこの形です。
      </p>

      <Heading num="05">Composite ― 1つと集合を同じ形で扱う</Heading>
      <p>
        <Term>Composite</Term>は、単体のオブジェクトとその集合(木構造)を同じインターフェースで扱えるようにするパターンです。呼び出し側は「相手が1つなのか、複数のまとまりなのか」を意識せずに操作できます。
      </p>
      <pre>
        <code>{`interface FileNode {
  size(): number;
}

class FileLeaf implements FileNode {
  constructor(private readonly bytes: number) {}
  size() { return this.bytes; }
}

class Directory implements FileNode {
  constructor(private readonly children: FileNode[]) {}
  size() { return this.children.reduce((sum, c) => sum + c.size(), 0); }
}

// 呼び出し側はファイルかディレクトリかを気にしない
function report(node: FileNode) { console.log(node.size()); }`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        Adapterは変換プラグ、Decoratorはスマホケース(本体を包んで機能を足す)、Facadeは総合受付、Proxyは秘書(本人に取り次ぐ前に用件を確認する)、Compositeは「箱の中に箱が入っていても、まとめて重さを量れる」仕組みです。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Adapter / Decorator</h4><p>形を変える、機能を足す。どちらも元のものには手を入れない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Facade / Proxy</h4><p>複雑さを1つの窓口に隠すか、本物の手前で制御するか。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Composite</h4><p>個と集合を同じ形にして、呼び出し側の分岐をなくす。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/patterns-gof-structure" />
    </DocsPage>
  );
}
