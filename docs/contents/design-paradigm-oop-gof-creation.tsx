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
  title: "生成を工夫する",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Factory Method", desc: "生成するクラスの決定をサブクラスに委ねる" },
  { name: "Builder", desc: "複雑なオブジェクトの組み立て手順を分離し、段階的に構築する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; オブジェクト指向 &middot; GoFパターン</Eyebrow>
        <h1>生成を工夫する ― Factory MethodとBuilder</h1>
        <Lead>
          <Link href="/design/patterns">設計パターン一覧</Link>で見た生成(Creational)グループのうち、今も実務でよく使う2つを深掘りします。どちらも「<code>new</code>を直接呼ぶ代わりに、生成そのものを部品として切り出す」という発想は共通していますが、Factory Methodは「何を作るか」を、Builderは「どう組み立てるか」を柔軟にする点で目的が異なります。
        </Lead>
      </Hero>

      <Heading num="01">2つのパターン</Heading>
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

      <Heading num="02">Factory Method ― 「何を作るか」を外部から差し替える</Heading>
      <p><Term>Factory Method</Term>は、オブジェクトの生成処理を専用の関数(またはメソッド)にまとめ、呼び出し側が具体的なクラスを知らなくても新しいインスタンスを得られるようにする考え方です。GoFのオリジナルは「サブクラスが生成するクラスを決める」という継承ベースの形でしたが、第一級関数を持つ現代のTypeScriptでは、クラス階層を作らず「生成ロジックを持つ関数を渡す」だけで同じ効果を得られることが多く、こちらのほうが実務ではよく使われます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string) { console.log(\`[Email] \${message}\`); }
}
class SmsNotifier implements Notifier {
  send(message: string) { console.log(\`[SMS] \${message}\`); }
}

// クラス階層ではなく、関数がFactory Methodの役目を果たす
function createNotifier(channel: "email" | "sms"): Notifier {
  switch (channel) {
    case "email": return new EmailNotifier();
    case "sms": return new SmsNotifier();
  }
}

const notifier = createNotifier("email");
notifier.send("生成が完了しました");`}</code>
      </pre>

      <Heading num="03">Builder ― 「どう組み立てるか」を段階的に分離する</Heading>
      <p><Term>Builder</Term>は、多くの任意パラメータを持つ複雑なオブジェクトを、コンストラクタに全部詰め込む代わりに、メソッドチェーンで1つずつ設定して最後に組み立てる形にする考え方です。設定の途中経過が読みやすくなり、必須ではない項目を省略しても呼び出しコードが崩れません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`class HttpRequestBuilder {
  private headers: Record<string, string> = {};
  private body?: unknown;

  constructor(private readonly url: string, private readonly method: string) {}

  withHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }
  withBody(body: unknown): this {
    this.body = body;
    return this;
  }
  build() {
    return { url: this.url, method: this.method, headers: this.headers, body: this.body };
  }
}

const request = new HttpRequestBuilder("/api/users", "POST")
  .withHeader("Content-Type", "application/json")
  .withBody({ name: "taro" })
  .build();`}</code>
      </pre>

      <Analogy label="💡 たとえるなら">
        Factory Methodは「注文の種類(メール便・SMS便)に応じて、正しい配送窓口を選んでくれる受付」です。窓口の裏側でどのクラスが動いているかを、注文する側は知る必要がありません。Builderは「カスタムオーダーの組み立て工程」で、トッピングを1つずつ選び、最後に「これで完成」と伝えた瞬間に商品が出来上がります。どちらも生成そのものを部品化することで、呼び出し側のコードをシンプルに保ちます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Factory Method</h4><p>生成するクラス(何を作るか)の決定を、専用の関数・メソッドに委ねる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Builder</h4><p>複雑な組み立て手順(どう作るか)を、メソッドチェーンで段階的に分離する。</p></Card>
      </CardGrid>

      <p>次は、オブジェクトをどう包み、どう繋ぐかに関わる<Link href="/design/paradigm/oop/gof/structure">構造を包む・繋ぐ</Link>パターンを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/oop/gof/structure" tag="設計">構造を包む・繋ぐ</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop/gof/algorithms" tag="設計">振る舞いをオブジェクト化する</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
