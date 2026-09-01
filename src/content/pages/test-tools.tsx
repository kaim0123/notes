import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Vitest・Playwright" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Vitest・Playwright ― 段階を、実際に動かす道具</h1>
        <Lead>
          <Link href="/test/levels">テストの段階</Link>で見た4つの段階を、JavaScript・TypeScriptの世界では2つの道具が分担します。<Term>Vitest</Term>が内側の3段階を、<Term>Playwright</Term>が最も外側を担当する構成です。<strong>2つに分かれている理由は優劣ではなく、境界の引き方が違うこと</strong> ― 具体的には、ブラウザを本当に起こす必要があるかどうかだけです。
        </Lead>
      </Hero>

      <Heading num="01">分かれ目は1つだけ</Heading>

      <DiagramFrame
        slug="test-tools-split"
        aspect="640 / 320"
        caption="2つのツールの守備範囲を、テストの段階に重ねたもの。Unit・Integration・APIの3段はいずれもプロセスの中で完結するため、同じテストランナーで書ける。1件はミリ秒から秒で終わり、件数は多くなる。最上段のE2Eだけはブラウザを本当に起動して操作する必要があるため別の仕組みが要り、1件は数秒から数十秒かかるので件数を絞る。分かれ目は「同じ言葉で書けるか」ではなく「ブラウザを起こす必要があるか」だけ。"
      />

      <table>
        <thead>
          <tr><th>段階</th><th>道具</th><th>1件あたり</th><th>件数の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Unit</td><td>Vitest</td><td>ミリ秒</td><td>最も多い</td></tr>
          <tr><td className="hl">Integration</td><td>Vitest(テスト用DB・代役と併用)</td><td>秒</td><td>中程度</td></tr>
          <tr><td className="hl">API</td><td>Vitest(HTTPを流し込む補助と併用)</td><td>秒</td><td>中程度</td></tr>
          <tr><td className="hl">E2E</td><td>Playwright</td><td>数秒〜数十秒</td><td>最も少ない</td></tr>
        </tbody>
      </table>

      <Heading num="02">Vitest ― 変更に反応して、必要な分だけ走る</Heading>
      <p>
        テストランナーの役割は、テストを見つけて実行し、結果を報告することです。Vitestの特徴は<strong>変更したファイルに関係するテストだけを即座に再実行する</strong>点にあり、<Link href="/test/unit">Unitテスト</Link>のFIRST原則の「速い」を道具の側から支えます。
      </p>

      <pre>
        <code>{`import { describe, it, expect } from "vitest";
import { calculateTax } from "./tax";

describe("calculateTax", () => {
  it("10%の消費税が加算される", () => {
    // Arrange
    const price = 1000;

    // Act
    const result = calculateTax(price, 0.1);

    // Assert
    expect(result).toBe(1100);
  });
});`}</code>
      </pre>

      <p>
        <code>describe</code>で対象をまとめ、<code>it</code>(または<code>test</code>)で1件を定義します。<Link href="/test/unit">Arrange-Act-Assert</Link>の3段構成がコード上にそのまま現れていることが分かります。依存を代役へ差し替える仕組みも同梱されているので、<Link href="/test/doubles">テストダブル</Link>のために別の道具を足す必要はありません。
      </p>

      <Aside label="Integrationも同じランナーで書ける">
        テスト用DBに接続する<Link href="/test/integration">Integrationテスト</Link>も、ポートを開かずHTTPを流し込む<Link href="/test/api">APIのテスト</Link>も、同じランナーの上で動きます。<strong>設定を分けて実行時間の違うものを別々に走らせられる</strong>ようにしておくと、手元では速いものだけ、CIでは全部、という運用ができます。
      </Aside>

      <Heading num="03">Playwright ― ブラウザを起こして操作する</Heading>
      <p>
        Playwrightは複数のブラウザエンジンを実際に起動し、クリックや入力をコードで自動化します。<Link href="/test/e2e">ページオブジェクトパターン</Link>と組み合わせて使うのが一般的です。
      </p>

      <pre>
        <code>{`import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test("正しい認証情報でログインできる", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");

  await expect(page).toHaveURL("/dashboard");
});`}</code>
      </pre>

      <p>
        テスト本体はページオブジェクトのメソッドを呼ぶだけで、セレクタも待機もそちら側に閉じています。要素が操作可能になるまで自動的に待つ仕組みを標準で持っており、<Link href="/test/e2e-waiting">描画待機</Link>の主要因である「早すぎるクリック」を減らせるよう設計されています ― <strong>ただし、その仕組みを活かす書き方をした場合に限ります</strong>。
      </p>

      <Analogy label="💡 たとえるなら">
        Vitestは作業台の上での部品検査、Playwrightは組み上がった製品の試運転です。作業台の検査は道具を揃えれば何百回でも素早く回せますが、試運転は実機を用意して動かす分、回数を絞って重要な動作に使います。
      </Analogy>

      <Heading num="04">道具を選んでも、配分は決まらない</Heading>
      <p>
        両方を導入したからといって、<Link href="/test/strategy">ピラミッド</Link>の形になるわけではありません。実際には<strong>Playwrightだけが増え続ける</strong>ことがよく起きます ― E2Eは書けば動くものが目に見えるので、書いていて楽しく、成果も説明しやすいからです。
      </p>
      <p>
        道具は境界を提供するだけで、どちらに何本置くかは判断です。E2Eが増えてきたら、<strong>その1本が本当にブラウザを起こさないと確かめられないか</strong>を1件ずつ問い直します。答えがNoなら、内側へ移せます。
      </p>

      <Heading num="まとめ">境界が2つに分けている</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>分かれ目はブラウザだけ</h4>
          <p>プロセスの中で完結する3段は同じランナーで書ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3段構成はコードにそのまま現れる</h4>
          <p>Arrange-Act-Assertは書式の話ではなく、テストの構造そのもの。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>自動待機は、活かす書き方をして初めて効く</h4>
          <p>持っているだけでは、フレーキーは減らない。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>道具は配分を決めてくれない</h4>
          <p>E2Eが増えたら、1件ずつ「本当に外側でしか無理か」を問い直す。</p>
        </Card>
      </CardGrid>

      <p>
        段階の話はここまでです。次は、書いたテストを信用できる状態に保つ手立てへ進みます。<Link href="/test/doubles">テストダブル</Link>へ。
      </p>

      <DocsFooter href="/test/tools" />
    </DocsPage>
  );
}
