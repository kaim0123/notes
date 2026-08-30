import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GoF ― 生成を工夫する" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>生成を工夫する ― Factory MethodとBuilder</h1>
        <Lead>
          <Link href="/design/patterns">設計パターン</Link>で見た生成グループのうち、今も実務でよく使う2つを深掘りします。どちらも「<code>new</code>を直接呼ぶ代わりに、生成そのものを部品として切り出す」という発想は共通していますが、Factory Methodは「何を作るか」を、Builderは「どう組み立てるか」を柔軟にする点で目的が異なります。
        </Lead>
      </Hero>

      <DiagramFrame
        slug="design-patterns-gof-creation-two"
        aspect="680 / 300"
        caption="生成に関する2つのパターン。上段のFactory Methodでは、呼び出し側が生成関数に「メールで」とだけ伝え、生成関数がEmailNotifierかSmsNotifierのどちらを作るかを決めて返すため、呼び出し側は具体的なクラス名を知らない。下段のBuilderでは、必須の項目を渡した後にヘッダや本文を段階的に足し、buildを呼んだ瞬間に完成する。任意の項目を省いても呼び出しコードが崩れない。"
      />

      <Heading num="01">Factory Method ― 何を作るかを外部から差し替える</Heading>
      <p>
        <Term>Factory Method</Term>は、オブジェクトの生成処理を専用の関数(またはメソッド)にまとめ、呼び出し側が具体的なクラスを知らなくても新しいインスタンスを得られるようにする考え方です。GoFのオリジナルは「サブクラスが生成するクラスを決める」という継承ベースの形でしたが、関数を値として扱える現代のTypeScriptでは、クラス階層を作らず生成ロジックを関数にまとめるだけで同じ効果が得られます。
      </p>
      <pre>
        <code>{`interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string) { console.log("[Email] " + message); }
}
class SmsNotifier implements Notifier {
  send(message: string) { console.log("[SMS] " + message); }
}

// クラス階層ではなく、関数が Factory Method の役目を果たす
function createNotifier(channel: "email" | "sms"): Notifier {
  switch (channel) {
    case "email": return new EmailNotifier();
    case "sms": return new SmsNotifier();
  }
}

const notifier = createNotifier("email");
notifier.send("生成が完了しました");`}</code>
      </pre>
      <p>
        ここで効いているのは、呼び出し側が<code>Notifier</code>というインターフェースにしか依存していないことです。新しい通知手段を足すときも、変わるのは生成関数の中だけで済みます ―
        <Link href="/design/principles-solid">開放閉鎖の原則</Link>そのものです。
      </p>

      <Heading num="02">Builder ― どう組み立てるかを段階的に分ける</Heading>
      <p>
        <Term>Builder</Term>は、多くの任意パラメータを持つ複雑なオブジェクトを、コンストラクタに全部詰め込む代わりに、1つずつ設定して最後に組み立てる形にする考え方です。設定の途中経過が読みやすくなり、必須ではない項目を省略しても呼び出しコードが崩れません。
      </p>
      <pre>
        <code>{`class HttpRequestBuilder {
  private headers: Record<string, string> = {};
  private body?: unknown;

  constructor(
    private readonly url: string,
    private readonly method: string,
  ) {}

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
      <p>
        引数が5つも6つも並ぶコンストラクタは、呼び出し側で「3番目の<code>true</code>は何だったか」が分からなくなります。Builderは、その分かりにくさを名前付きの手順に置き換えるパターンだと考えると使いどころが見えてきます。
      </p>

      <Heading num="03">Singletonが敬遠される理由</Heading>
      <p>
        生成グループにはもう1つ<Term>Singleton</Term>という有名なパターンがありますが、現代では自分で書く機会が減りました。Singletonはグローバルな状態そのもので、どこからでも書き換えられるため、テストごとに状態が持ち越されて結果が不安定になるからです。「生成を1つに保つ」という役目は、DIコンテナのシングルトンスコープやモジュールのトップレベル定数に移っています。
      </p>

      <Analogy label="💡 たとえるなら">
        Factory Methodは「注文の種類に応じて、正しい配送窓口を選んでくれる受付」です。窓口の裏側でどのクラスが動いているかを、注文する側は知る必要がありません。Builderは「カスタムオーダーの組み立て工程」で、トッピングを1つずつ選び、最後に「これで完成」と伝えた瞬間に商品ができあがります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Factory Method</h4><p>「何を作るか」の決定を専用の関数に委ね、呼び出し側を具体クラスから切り離す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Builder</h4><p>「どう組み立てるか」を段階に分け、長すぎるコンストラクタを避ける。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Singletonは慎重に</h4><p>グローバル状態はテストを不安定にする。役目はDIコンテナへ移った。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/patterns-gof-creation" />
    </DocsPage>
  );
}
