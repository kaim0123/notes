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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "フレーキーテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>フレーキーテスト ― 「再実行したら通った」を放置しない</h1>
        <Lead>
          同じコードなのに、通ったり落ちたりするテストを<Term>フレーキーテスト</Term>と呼びます。厄介なのは失敗そのものではなく、<strong>チームがCIの赤を信じなくなること</strong>です。「またあれか」と再実行する習慣がつくと、本物の不具合まで同じ扱いで見逃されます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ最優先で対処すべきか</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>信頼が失われる</h4><p>赤を見ても調べなくなる。テストが「儀式」になり、本来の目的を失う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>時間が溶ける</h4><p>再実行のたびにCI時間と待ち時間を消費する。開発の流れが途切れる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>本物のバグを隠す</h4><p>フレーキーだと思って再実行した先に、実は<strong>本物の競合バグ</strong>が潜んでいることがある。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>増殖する</h4><p>1つ許容すると基準が緩む。「このくらいなら」が積み上がる。</p></Card>
      </CardGrid>
      <Aside label="不安定なテストは本番の警告かもしれない">
        「たまに落ちる」の原因が<Link href="/dev/concurrency/race">競合状態</Link>や<Link href="/dev/concurrency/deadlock">タイムアウト</Link>である場合、それは<strong>テストの問題ではなく製品の問題</strong>です。テスト側を緩めて黙らせると、本番で同じ事象がユーザーに起きます。原因を分類する前に「テストが悪い」と決めつけないでください。
      </Aside>

      <Heading num="02">原因の分類</Heading>
      <table>
        <tbody>
          <tr><th>原因</th><th>典型的な症状</th><th>対処</th></tr>
          <tr><td className="hl">待ち方(タイミング)</td><td>E2Eで「要素が見つからない」。速いマシンでは通る</td><td>固定の <code>sleep</code> をやめ、<strong>条件で待つ</strong></td></tr>
          <tr><td className="hl">実行順序への依存</td><td>単体では通るが、全体実行だと落ちる</td><td>テスト間の状態共有を断つ(「<Link href="/test/data">テストデータ管理</Link>」)</td></tr>
          <tr><td className="hl">並列実行の衝突</td><td>ワーカー数を増やすと落ちる</td><td>データ・ポート・一時ファイルをテストごとに分離する</td></tr>
          <tr><td className="hl">時刻・タイムゾーン</td><td>特定の時間帯や月末に落ちる</td><td>時刻を注入して固定する</td></tr>
          <tr><td className="hl">外部依存</td><td>ネットワークや外部APIの調子で落ちる</td><td>スタブ化する。実物を叩くテストは最小限にして分離する</td></tr>
          <tr><td className="hl">順不同の結果</td><td>配列の順序を期待している</td><td>順序を保証しないものは、集合として比較する</td></tr>
          <tr><td className="hl">リソース不足</td><td>CIでだけ落ちる。メモリ・CPUの逼迫</td><td>並列度を下げる、リソースを増やす</td></tr>
          <tr><td className="hl">製品側の競合</td><td>再現性が低く、ログに異常が残る</td><td><strong>テストではなく実装を直す</strong></td></tr>
        </tbody>
      </table>

      <Heading num="03">最も多い原因 ― 待ち方</Heading>
      <p>E2Eテストのフレーキーの大半はこれです。固定時間の待機は、遅ければ落ち、速すぎれば無駄になります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 悪い ― 環境の速度に賭けている。CIが混んでいれば落ちる
await page.click("#save");
await page.waitForTimeout(2000);
expect(await page.textContent(".status")).toBe("保存しました");

// 良い ― 「その状態になるまで」待つ。速ければ即座に進む
await page.click("#save");
await expect(page.locator(".status")).toHaveText("保存しました");`}</code>
      </pre>
      <p>「状態を条件として待つ」書き方にすると、速いマシンでは速く終わり、遅いマシンでも落ちません。<strong>時間ではなく状態を待つ</strong> ― これが原則です。</p>

      <Heading num="04">見つける仕組みを作る</Heading>
      <p>フレーキーは「たまに」なので、意識して探さないと見つかりません。</p>
      <Steps>
        <li><strong>失敗を記録する</strong> ― 再実行で通ったケースも含め、テスト単位で失敗率を集計する</li>
        <li><strong>繰り返し実行する</strong> ― 夜間に同じテストを50回・100回まわす専用ジョブを用意する</li>
        <li><strong>順序を変えて実行する</strong> ― ランダム順で実行し、順序依存を炙り出す</li>
        <li><strong>並列度を変える</strong> ― ワーカー数を増減させて、衝突を検出する</li>
        <li><strong>負荷をかけた環境で回す</strong> ― CPUを意図的に逼迫させ、タイミング依存を露出させる</li>
      </Steps>
      <Analogy label="💡 たとえるなら">
        雨漏りの調査です。晴れの日にいくら見ても分かりません ― <strong>意図的に水をかけて</strong>再現させる必要があります。繰り返し実行やランダム順は、その放水にあたります。
      </Analogy>

      <Heading num="05">見つけたときの手順</Heading>
      <Steps>
        <li><strong>記録する</strong> ― チケット化する。「気付いた人が直す」に任せると放置される</li>
        <li><strong>隔離する</strong> ― 原因調査に時間がかかる場合、本流のCIからは外して<strong>専用ジョブに移す</strong></li>
        <li><strong>期限を決める</strong> ― 隔離は一時避難であって解決ではない。期限を切る</li>
        <li><strong>原因を分類する</strong> ― 上の表のどれかを特定する。「たぶんタイミング」で止めない</li>
        <li><strong>直したら検証する</strong> ― 修正後に100回連続で通ることを確認する</li>
      </Steps>
      <Aside label="スキップして放置しない">
        <code>skip</code> を付けて放置されたテストは、<strong>存在しないのに存在するふりをする</strong>最悪の状態です。守っているつもりの箇所が守られていません。直せないなら削除するほうが誠実です ― 少なくとも「テストがない」という事実は正しく伝わります。
      </Aside>

      <Heading num="06">自動再実行(リトライ)の是非</Heading>
      <table>
        <tbody>
          <tr><th></th><th>利点</th><th>危険</th></tr>
          <tr><td className="hl">再実行あり</td><td>CIが止まらない。開発の流れを保てる</td><td><strong>問題が見えなくなる</strong>。競合バグを隠蔽する</td></tr>
          <tr><td className="hl">再実行なし</td><td>問題が必ず表面化する</td><td>1件のフレーキーで全体が止まる</td></tr>
        </tbody>
      </table>
      <p>現実的な折衷は<strong>「再実行は許すが、必ず記録して可視化する」</strong>です。再実行で通ったこと自体をメトリクスとして集計し、週次で上位のテストに対処します。記録なしの自動再実行は、問題を静かに積み上げるだけです。</p>

      <Heading num="07">そもそも減らす設計</Heading>
      <table>
        <tbody>
          <tr><th>方針</th><th>効果</th></tr>
          <tr><td className="hl">E2Eの数を絞る</td><td>フレーキーの発生源は圧倒的にE2E。下の層に寄せる(「<Link href="/test/strategy">テストピラミッド</Link>」)</td></tr>
          <tr><td className="hl">非同期を待つAPIを使う</td><td>状態待ちの仕組みが備わったツールを選ぶ</td></tr>
          <tr><td className="hl">テストごとに独立したデータ</td><td>順序・並列の問題が原理的に起きなくなる</td></tr>
          <tr><td className="hl">外部依存をスタブ化</td><td>ネットワーク由来の不安定さを排除する</td></tr>
          <tr><td className="hl">時刻・乱数を注入</td><td>環境と時期に左右されなくなる</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">赤は常に意味があるべき</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>時間ではなく状態を待つ</h4><p>固定 <code>sleep</code> はフレーキーの最大の原因。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>再実行を無記録で許さない</h4><p>通ったこと自体を記録し、可視化して潰す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>製品側の競合を疑う</h4><p>テストを緩める前に、本番でも起きる問題ではないか確かめる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/data" tag="テスト">テストデータ管理</RelatedLink>
            <RelatedLink href="/dev/concurrency/race" tag="実装">競合状態とデータ競合</RelatedLink>
            <RelatedLink href="/dev/ci/actions" tag="実装">GitHub Actionsの実務</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
