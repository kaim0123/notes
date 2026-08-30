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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "非機能テストの組み込み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>非機能テストの組み込み ― 「動くか」ではなく「使えるか・崩れていないか」を見る</h1>
        <Lead>
          <Link href="/test/e2e/viewpoints">ハッピーパス・バリデーション・排他制御</Link>は、いずれも「機能が正しく動くか」を問う<Term>機能テスト</Term>の観点です。しかし実際のブラウザを起動するE2Eの実行環境は、キーボード操作や画面の見た目といった、機能テストの観点表には収まりにくい種類の確認も同時に行える場です。この章では、なぜそれらを分けて考えるべきか、そしてどう組み込むかを扱います。
        </Lead>
      </Hero>

      <Heading num="01">なぜ非機能テストを独立カテゴリにするか</Heading>
      <p><Link href="/test/quality-plan">品質計画</Link>で見たとおり、「壊れる」にはいくつも種類があります。<Term>アクセシビリティ</Term>や<Term>見た目の崩れ</Term>は、機能テストと同じ画面・同じブラウザを使って確認できるにもかかわらず、次の2点で機能テストとは性質が異なります。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>合否の基準が違う</h4><p>機能テストは「動く/動かない」の二値ですが、アクセシビリティやビジュアル差分は「どこまでの差分・不足を許容するか」という閾値の判断が必要になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>実行の主体・タイミングが違う</h4><p>機能テストは実装者がその場で通すべきものですが、ビジュアル差分の承認や、手動でのスクリーンリーダー確認は、別のタイミング・別の担当が関わることが多い。</p></Card>
      </CardGrid>

      <p>これらを機能テストの観点表(<Link href="/test/e2e/viewpoints">05の項目表</Link>)に混ぜ込むと、「本人以外のキャンセルを拒否できるか」という二値の合否と、「コントラスト比が4.5:1あるか」という閾値の合否が同じ表の同じ列に並んでしまい、どちらの基準で見ればいいのか分からなくなります。だからこそ、非機能は独立したカテゴリとして扱い、後述(04)のとおり実行のタイミングも分けます。</p>

      <Analogy label="💡 たとえるなら">
        機能テストは「注文どおりの料理が出てきたか」の確認、非機能テストは「店内の照明は十分か」「盛り付けは前回と比べて崩れていないか」の確認です。どちらもレストランの品質に関わりますが、前者はホールスタッフがその場で気づける二値の問題、後者は基準を決めて定期的に見回る種類の問題です。同じチェックリストの同じ欄に並べると、確認の仕方そのものが混乱します。
      </Analogy>

      <Heading num="02">アクセシビリティテスト ― E2Eの中でどう検証するか</Heading>
      <p>アクセシビリティの実装そのものの詳細は<Link href="/dev/frontend/a11y">アクセシビリティ</Link>の章で扱っています。ここでは、それを<strong>E2Eの仕組みに乗せて回帰させる</strong>方法を扱います。</p>

      <table>
        <thead>
          <tr><th>手段</th><th>検出できるもの</th><th>E2Eへの組み込み方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>@axe-core/playwright</code></td><td>コントラスト不足・ARIAの誤り・名前のない部品</td><td>既存のE2Eスペック内、あるいは画面の状態ごとに<code>AxeBuilder</code>でスキャンを実行するstepを追加する</td></tr>
          <tr><td className="hl">キーボード操作の自動確認</td><td>Tab順の破綻、フォーカスの迷子、モーダルの閉じ忘れ</td><td><code>{`page.keyboard.press("Tab")`}</code>を連打し、想定した要素にフォーカスが移ることを<code>toBeFocused()</code>で確認する</td></tr>
          <tr><td className="hl">読み上げソフトでの手動確認</td><td>名前や状態変化が実際に読み上げられるか</td><td>自動化せず、リリース前のチェックリストとして人が確認する(04で扱う実行頻度の違い)</td></tr>
        </tbody>
      </table>

      <p>特に重要なのは、初期表示だけでなく<strong>状態が変化した後の画面</strong>もスキャン対象にすることです。モーダルを開いた後、フォームにエラーを出した後、通知を表示した後 ― それぞれのタイミングでaxeのスキャンを差し込むことで、「初期表示は合格したが、動的に追加された要素には<code>alt</code>がない」といった、機能テストの観点表には現れない不足を拾えます。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import AxeBuilder from "@axe-core/playwright";

test("キャンセル確認モーダルにアクセシビリティ上の違反がない", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.gotoOrder(orderId);
  await checkoutPage.openCancelDialog(); // 状態が変化した"後"をスキャンする

  const results = await new AxeBuilder({ page }).include("[role='dialog']").analyze();
  expect(results.violations).toEqual([]);
});`}</code>
      </pre>

      <Heading num="03">ビジュアルリグレッションテスト ― 見た目の崩れを機械的に検出する</Heading>
      <p>CSSの1行の変更が、離れた場所のレイアウトを崩すことがあります。Playwrightの<code>toHaveScreenshot()</code>は、基準となるスクリーンショット(ベースライン画像)と現在の描画結果を比較し、差分がある領域を検出します。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`test("注文詳細画面の見た目が崩れていない", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.gotoOrder(orderId);

  // 変動する要素(注文日時など)はマスクして差分の対象から外す
  await expect(page).toHaveScreenshot("order-detail.png", {
    mask: [page.getByTestId("order-timestamp")],
  });
});`}</code>
      </pre>

      <p>ビジュアル回帰は便利な一方で、フォントレンダリングの違いなど<Link href="/test/flaky">環境差に起因する不安定さ</Link>を持ち込みやすい手法でもあります。次の点を押さえて導入します。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ベースラインはCIと同じ環境で生成する</h4><p>ローカル(macOS)とCI(Linux)ではフォントのレンダリングが異なり、実際には壊れていないのに差分が出る。ベースラインの更新は必ずCI上で行う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>変動する要素はマスクする</h4><p>日時・広告・ランダムなアバター画像など、毎回変わることが分かっている領域は比較対象から外し、意味のある差分だけを残す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>対象はレイアウトが崩れると影響が大きい画面に絞る</h4><p>すべての画面をスクリーンショット比較すると、更新の手間と差分レビューの負荷が跳ね上がる。トップページや主要な購入フローなど、崩れたときの影響が大きい画面を優先する。</p></Card>
      </CardGrid>

      <Aside label="差分は「壊れた」ではなく「変わった」の通知">
        ビジュアル回帰の差分は、バグの検出だけでなく、意図した見た目の変更を可視化する役割も持ちます。差分が出たら、まず「意図した変更か」を人が判断し、意図したものならベースラインを更新する ― という承認のステップが運用上必要になります。
      </Aside>

      <Heading num="04">観点表への組み込み方 ― 実行頻度を分けて共存させる</Heading>
      <p>01で述べたとおり、非機能の観点は機能テストの項目表とは別枠で管理しつつ、同じ機能に対する確認であることは紐づけておきます。実務では、<Link href="/test/e2e/viewpoints">項目表</Link>に「非機能」という行を別カテゴリとして追加し、タグで実行を分離するのが扱いやすい方法です。</p>

      <table>
        <thead>
          <tr><th>カテゴリ</th><th>項目</th><th>実行タグ</th><th>実行頻度</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">機能(ハッピーパス)</td><td>発送前の注文をキャンセルできる</td><td>(なし・既定)</td><td>すべてのプルリクエスト</td></tr>
          <tr><td className="hl">非機能(a11y)</td><td>キャンセル確認モーダルにARIA違反がない</td><td><code>@a11y</code></td><td>すべてのプルリクエスト(実行は速いため)</td></tr>
          <tr><td className="hl">非機能(visual)</td><td>注文詳細画面の見た目が崩れていない</td><td><code>@visual</code></td><td>夜間バッチ、または該当画面のCSSを変更したPRのみ</td></tr>
        </tbody>
      </table>

      <p>Playwrightは<code>{`test("...", { tag: "@visual" }, async () => { ... })`}</code>のようにタグを付け、<code>--grep</code>や<code>--grep-invert</code>で実行対象を絞り込めます。機能テストは毎回全件、a11yは軽量なので毎回、visualは変更頻度と承認コストを考えて夜間や該当領域の変更時だけ ― というように<strong>カテゴリごとに実行頻度を変える</strong>ことが、01で述べた「合否の基準が違う」ものを1つのパイプラインに矛盾なく共存させる鍵になります。</p>

      <Heading num="まとめ">非機能テストの組み込みで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>機能と非機能を同じ表の同じ基準で混ぜない</h4><p>二値の合否と閾値の合否は、判断の仕方そのものが違う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>状態変化の&quot;後&quot;もアクセシビリティをスキャンする</h4><p>初期表示だけでなく、モーダルやエラー表示など動的に追加された要素まで対象にする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ビジュアル回帰はベースラインの環境と対象範囲を絞る</h4><p>CIと同一環境でベースラインを作り、変動要素をマスクし、影響の大きい画面に絞る。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>タグで実行頻度を分けて共存させる</h4><p>機能テストは毎回、非機能はカテゴリごとに適した頻度で走らせる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/e2e" tag="テスト">E2Eテストの全体像</RelatedLink>
            <RelatedLink href="/test/e2e/viewpoints" tag="テスト">テスト観点の洗い出し</RelatedLink>
            <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
            <RelatedLink href="/dev/frontend/a11y" tag="開発">アクセシビリティ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
