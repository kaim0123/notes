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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Vitest・Playwright",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Vitest・Playwright ― JS/TSのテストピラミッドを実行する2本柱</h1>
        <Lead>
          ここまで見てきたUnit・Integration・E2Eという考え方を、実際にコードとして動かすには専用のツールが必要です。JavaScript/TypeScriptのエコシステムでは、<Term>Vitest</Term>がUnit・Integrationの層を、<Term>Playwright</Term>がE2Eの層を担うのが定番の組み合わせです。
        </Lead>
      </Hero>

      <Heading num="01">Vitest ― 高速なUnit・Integrationテストランナー</Heading>
      <p>Vitestは、コードの実行結果を検証する<Term>テストランナー</Term>です。テスト対象のファイルを変更するたびに、影響のあるテストだけを瞬時に再実行できる点が特徴で、<Link href="/test/unit">Unitテスト</Link>のFIRST原則の「Fast(速い)」をツールの側から後押しします。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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

      <p>この例のように、<code>describe</code>でテスト対象をグループ化し、<code>it</code>(または<code>test</code>)で1件のテストケースを定義します。<Link href="/test/unit">Unitテスト</Link>の章で扱ったArrange-Act-Assertの3段構成が、コード上でもそのまま対応していることが分かります。<code>vi.fn()</code>や<code>vi.mock()</code>を使えば、依存をスタブやモックに差し替えることもでき、<Link href="/test/integration">Integrationテスト</Link>でテスト用DBに接続する際にも同じランナー上で実行できます。</p>

      <Heading num="02">Playwright ― 複数ブラウザを自動操作するE2Eツール</Heading>
      <p>Playwrightは、Chromium・Firefox・WebKitといった複数のブラウザエンジンを実際に起動し、クリックや入力といった操作をコードで自動化するツールです。<Link href="/test/e2e">E2Eテスト</Link>の章で扱ったページオブジェクトパターンと組み合わせて使うのが一般的です。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test("正しい認証情報でログインできる", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");

  await expect(page).toHaveURL("/dashboard");
});`}</code>
      </pre>

      <p>テストコード自体は<code>LoginPage</code>というページオブジェクトのメソッドを呼ぶだけで、実際のセレクタや待機処理はページオブジェクト側に閉じ込められています。Playwrightは要素が表示・操作可能になるまで自動的に待機する仕組みを持っており、<Term>フレーキーテスト</Term>(不安定なテスト)の主要因である「早すぎるクリック」を減らせるよう設計されています。</p>

      <Heading num="03">2つのツールをどう組み合わせるか</Heading>
      <p>Vitestで<Link href="/test/unit">Unitテスト</Link>と<Link href="/test/integration">Integrationテスト</Link>を大量に実行し、Playwrightで<Link href="/test/e2e">E2Eテスト</Link>を少数の代表的な動線だけ実行する ― この役割分担が、そのままテストピラミッドの実装になります。</p>

      <table>
        <thead>
          <tr><th>層</th><th>ツール</th><th>実行速度</th><th>件数の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Unit</td><td>Vitest</td><td>ミリ秒単位</td><td>多い</td></tr>
          <tr><td className="hl">Integration</td><td>Vitest(テスト用DB・APIモック併用)</td><td>秒単位</td><td>中程度</td></tr>
          <tr><td className="hl">E2E</td><td>Playwright</td><td>数秒〜数十秒</td><td>少ない</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Vitestは「作業台の上での部品検査」、Playwrightは「実際に組み上がった製品の試運転」に似ています。作業台の検査は道具を揃えれば何百回でも素早く回せますが、試運転は実機を用意して動かす分、回数を絞って重要な動作確認に使う ― という役割分担がそのまま両ツールの使い分けに対応します。
      </Analogy>

      <Heading num="まとめ">Vitest・Playwrightで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割で使い分ける</h4><p>Vitestは Unit/Integration、PlaywrightはE2Eというテストピラミッドの層に対応させます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Arrange-Act-Assertをコードに反映する</h4><p>Vitestのテストコードは3段構成をそのまま書き写せます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ページオブジェクトと組み合わせる</h4><p>Playwrightのテストコードを画面構造から独立させ、変更に強くします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
                    <RelatedLink href="/test/e2e" tag="テスト">E2Eテスト</RelatedLink>
                    <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
