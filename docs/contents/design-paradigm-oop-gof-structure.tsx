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
  title: "構造を包む・繋ぐ",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Adapter", desc: "互換性のないインターフェース同士を変換して繋ぐ" },
  { name: "Composite", desc: "個別オブジェクトと、その集合(木構造)を同じインターフェースで扱う" },
  { name: "Decorator", desc: "オブジェクトを包んで、動的に機能を追加する" },
  { name: "Facade", desc: "複雑なサブシステム群に対して単純な窓口を用意する" },
  { name: "Proxy", desc: "代理オブジェクトで、アクセス制御や遅延生成を行う" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; オブジェクト指向 &middot; GoFパターン</Eyebrow>
        <h1>構造を包む・繋ぐ ― Adapter・Composite・Decorator・Facade・Proxy</h1>
        <Lead>
          <Link href="/design/paradigm/oop/gof/creation">生成を工夫する</Link>2つのパターンに続き、ここではクラス・オブジェクトをどう組み合わせて、より大きな構造を作るかに関わる5つのパターンを見ていきます。いずれも「何かを直接使わず、何かを間に挟む」という発想のバリエーションです。
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

      <Heading num="02">Adapter ― 互換性のないインターフェースを変換する</Heading>
      <p><Term>Adapter</Term>は、既存のインターフェースを変更できないまま、呼び出し側が期待する形に変換して繋ぐパターンです。外部ライブラリやサードパーティAPIのレスポンス形式が、アプリ内部で使いたい形と違う場合によく使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サードパーティSDKが返す形(変更できない)
type LegacyUserDto = { user_id: string; full_name: string; email_address: string };

// アプリ内部で使いたい形
type User = { id: string; name: string; email: string };

// Adapter: 外部の形を内部の形に変換する
function toUser(dto: LegacyUserDto): User {
  return { id: dto.user_id, name: dto.full_name, email: dto.email_address };
}`}</code>
      </pre>

      <Heading num="03">Composite ― 個別と集合を同じ形で扱う</Heading>
      <p><Term>Composite</Term>は、単体のオブジェクトと、その集合(木構造)を同じインターフェースで扱えるようにするパターンです。呼び出し側は「相手が1つなのか、複数のまとまりなのか」を意識せずに操作できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface Node {
  getSize(): number;
}

class FileNode implements Node {
  constructor(private size: number) {}
  getSize() {
    return this.size;
  }
}

class FolderNode implements Node {
  private children: Node[] = [];
  add(child: Node) {
    this.children.push(child);
  }
  // フォルダ自身も、内側にあるFile/Folderと同じgetSize()で答えられる
  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }
}`}</code>
      </pre>

      <Heading num="04">Decorator ― オブジェクトを包んで機能を追加する</Heading>
      <p><Term>Decorator</Term>は、元のオブジェクト(または関数)を包んで、動的に機能を追加するパターンです。関数を第一級の値として扱える言語では、クラスの継承関係を作らずに、高階関数で同じ効果を得られます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Fetcher = (url: string) => Promise<Response>;

// fetchを包んで、ログ出力を追加するDecorator
function withLogging(fetcher: Fetcher): Fetcher {
  return async (url) => {
    console.log(\`fetching: \${url}\`);
    return fetcher(url);
  };
}

// さらに包んで、リトライを追加するDecorator
function withRetry(fetcher: Fetcher, times = 3): Fetcher {
  return async (url) => {
    for (let i = 0; i < times; i++) {
      try {
        return await fetcher(url);
      } catch (e) {
        if (i === times - 1) throw e;
      }
    }
    throw new Error("unreachable");
  };
}

const fetchUser = withRetry(withLogging(fetch));`}</code>
      </pre>

      <Heading num="05">Facade ― 複雑なサブシステムに単純な窓口を作る</Heading>
      <p><Term>Facade</Term>は、複数のクラス・モジュールからなる複雑なサブシステムに対して、単純な窓口(入口)を1つ用意するパターンです。呼び出し側は窓口の向こう側にある複雑さを知らずに済みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// PaymentGateway・InventoryService・Notifierという3つの複雑なクライアントを
// checkout()という1つの窓口の裏に隠す
async function checkout(orderId: string) {
  await inventoryService.reserve(orderId);
  await paymentGateway.charge(orderId);
  await notifier.sendReceipt(orderId);
}`}</code>
      </pre>
      <p>FacadeとAdapterはどちらも「間に何かを挟む」点で似ていますが、目的が異なります。<strong>Adapter</strong>は1つのインターフェースを別の形に変換することが目的で、<strong>Facade</strong>は複数のサブシステムをまとめて簡略化することが目的です。</p>

      <Heading num="06">Proxy ― 代理オブジェクトでアクセスを制御する</Heading>
      <p><Term>Proxy</Term>は、本物のオブジェクトの代わりに立つ代理オブジェクトを用意し、アクセス制御や遅延生成を行うパターンです。呼び出し側からは本物と同じインターフェースに見えます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface ImageLoader {
  load(): string;
}

class RealImage implements ImageLoader {
  constructor(private path: string) {
    console.log(\`loading heavy image: \${path}\`); // 生成コストが高い処理
  }
  load() {
    return this.path;
  }
}

// Proxy: 実際にloadされるまでRealImageの生成を遅らせる
class LazyImageProxy implements ImageLoader {
  private real: RealImage | null = null;
  constructor(private path: string) {}
  load() {
    if (!this.real) this.real = new RealImage(this.path);
    return this.real.load();
  }
}`}</code>
      </pre>
      <p>DecoratorとProxyは、どちらも「元のオブジェクトを同じインターフェースで包む」という構造は同じです。違いは目的で、<strong>Decorator</strong>は機能を追加すること、<strong>Proxy</strong>はアクセス制御・遅延生成など「本物へのアクセスそのもの」を管理することが目的です。</p>

      <Analogy label="💡 たとえるなら">
        Adapterは「変換プラグ」、Facadeは「ホテルのフロント」(裏側の清掃・会計・警備を1つの窓口にまとめる)、Proxyは「秘書」(本人に代わって取り次ぎ、必要なときだけ本人につなぐ)、Decoratorは「トッピング」(元の商品を包んで機能を追加する)、Compositeは「入れ子の箱」(箱の中に箱、その中にまた箱があっても、開け方は同じ)です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Adapter</h4><p>1つのインターフェースを、別の形に変換する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Composite</h4><p>個別と集合を、同じインターフェースで扱う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Decorator</h4><p>包んで、機能を追加する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Facade</h4><p>複数のサブシステムを、1つの窓口に簡略化する。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>Proxy</h4><p>包んで、アクセスそのものを管理する。</p></Card>
      </CardGrid>

      <p>次は、アルゴリズム・状態・命令をオブジェクトとして切り出す<Link href="/design/paradigm/oop/gof/algorithms">振る舞いをオブジェクト化する</Link>パターンを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/oop/gof/creation" tag="設計">生成を工夫する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop/gof/algorithms" tag="設計">振る舞いをオブジェクト化する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
