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
  Steps,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "フレーキーテスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>フレーキーテスト ―「再実行したら通った」を放置しない</h1>
        <Lead>
          <Link href="/test/doubles">テストダブル</Link>・<Link href="/test/data">テストデータ管理</Link>・<Link href="/test/patterns">テストパターン</Link>で手を尽くしても、不安定なテストはゼロになりません。<strong>だから最後に、取りこぼしを拾う側の仕組みが要ります</strong>。ここで扱うのは、書き方ではなく運用です ― どう見つけ、どう分類し、どう直したと言い切るか。
        </Lead>
      </Hero>

      <Heading num="01">なぜ、最優先で対処すべきか</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>信頼が失われる</h4>
          <p>赤を見ても調べなくなる。テストが儀式になり、本来の目的を失う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>時間が溶ける</h4>
          <p>再実行のたびにCIの時間と待ち時間を消費し、開発の流れが途切れる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>本物のバグを隠す</h4>
          <p>フレーキーだと思って再実行した先に、実は本物の競合バグが潜んでいることがある。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>増殖する</h4>
          <p>1つ許容すると基準が緩む。「このくらいなら」が積み上がる。</p>
        </Card>
      </CardGrid>

      <Aside label="不安定さは、本番からの警告かもしれない">
        「たまに落ちる」の原因が<Link href="/language/concurrency-race">競合状態</Link>やタイムアウトである場合、それは<strong>テストの問題ではなく製品の問題</strong>です。テスト側を緩めて黙らせると、本番で同じ事象がユーザーに起きます。原因を分類する前に「テストが悪い」と決めつけないでください。
      </Aside>

      <Heading num="02">原因を8つに分類する</Heading>
      <p>
        「たまに落ちる」の原因は無数にあるように見えて、分類すれば8つに収まります。<strong>特定してから直す</strong>ことが、直したと言い切れるかどうかを分けます。
      </p>

      <DiagramFrame
        slug="test-flaky-causes"
        aspect="700 / 340"
        caption="フレーキーテストの原因8分類と、それぞれの症状・対処。待ち方、実行順序への依存、並列実行の衝突、時刻とタイムゾーン、外部依存、順不同の結果、リソース不足、そして製品側の競合。最後の1つだけは性質が違い、テストではなく実装を直す必要がある。テストを緩めて黙らせると、本番で同じことがユーザーに起きる。「テストが悪い」と決めつけてから調べ始めず、この可能性を毎回いちばん先に潰す。"
      />

      <p>
        表の見方には順序があります ― <strong>最下段の「製品側の競合」を、毎回いちばん先に潰します</strong>。これだけは対処の方向が逆で、テスト側をいくら直しても解決せず、しかも放置したときの損害が最も大きいからです。
      </p>

      <Heading num="03">最も多い原因は、待ち方</Heading>
      <p>
        件数で言えば、圧倒的多数がこれです。<Link href="/test/e2e-waiting">描画待機</Link>で詳しく見たとおり、固定時間の待機は<strong>遅ければ落ち、速すぎれば無駄になります</strong>。
      </p>

      <pre>
        <code>{`// 悪い ― 環境の速度に賭けている。CIが混んでいれば落ちる
await page.click("#save");
await page.waitForTimeout(2000);
expect(await page.textContent(".status")).toBe("保存しました");

// 良い ―「その状態になるまで」待つ。速ければ即座に進む
await page.click("#save");
await expect(page.locator(".status")).toHaveText("保存しました");`}</code>
      </pre>

      <p>
        原則は一言で言えます ― <Term>時間ではなく、状態を待つ</Term>。
      </p>

      <Heading num="04">見つける仕組みと、直したと言い切る手順</Heading>
      <p>
        フレーキーは「たまに」なので、通常のCIでは<strong>原理的に見つかりません</strong>。1回だけ実行するものが、確率的にしか起きない事象を捉えることはできないからです。
      </p>

      <DiagramFrame
        slug="test-flaky-process"
        aspect="640 / 330"
        caption="フレーキーテストを見つけて直すまでの6工程。通常のCIは1回だけ実行するため原理的に見えない。揺さぶる専用ジョブで繰り返し実行し、順序をランダムにし、並列度を変え、負荷をかける。結果を記録し、再実行で通った分も含めて失敗率を集計する。調査に時間がかかるものは期限を切って隔離し、原因を8分類のどれかに特定し、直したあと100回連続で通ることを確認して初めて解決とみなす。スキップを付けて放置されたテストは、存在しないのに存在するふりをする最悪の状態になる。"
      />

      <Steps>
        <li><strong>記録する</strong> ― 再実行で通ったケースも含め、テスト単位で失敗率を集計する</li>
        <li><strong>繰り返し実行する</strong> ― 夜間に同じテストを50回・100回まわす専用ジョブを用意する</li>
        <li><strong>順序を変えて実行する</strong> ― ランダム順で走らせ、順序依存を炙り出す</li>
        <li><strong>並列度を変える</strong> ― ワーカー数を増減させて、衝突を検出する</li>
        <li><strong>負荷をかけた環境で回す</strong> ― CPUを意図的に逼迫させ、タイミング依存を露出させる</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        雨漏りの調査です。晴れの日にいくら眺めても分かりません ― <strong>意図的に水をかけて</strong>再現させる必要があります。繰り返し実行やランダム順は、その放水にあたります。
      </Analogy>

      <Aside label="スキップして放置しない">
        無効化の印を付けて放置されたテストは、<strong>存在しないのに存在するふりをする</strong>最悪の状態です。守っているつもりの箇所が、実際には守られていません。直せないなら削除するほうが誠実です ― 少なくとも「テストがない」という事実は正しく伝わります。
      </Aside>

      <Heading num="05">自動再実行の是非</Heading>
      <p>
        落ちたテストを自動でもう一度走らせる仕組みには、はっきりした利点と危険があります。
      </p>

      <table>
        <thead>
          <tr><th></th><th>利点</th><th>危険</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再実行あり</td><td>CIが止まらず、開発の流れを保てる</td><td><strong>問題が見えなくなる</strong>。競合バグを隠蔽する</td></tr>
          <tr><td className="hl">再実行なし</td><td>不安定さが必ず表面化する</td><td>本流が頻繁に止まり、対処が追いつかない</td></tr>
        </tbody>
      </table>

      <p>
        現実的な落とし所は、<strong>再実行は許すが、再実行したという事実を必ず記録に残し、その回数を監視の対象にする</strong>ことです。記録が残らない自動再実行は、不安定さを見えなくするだけの装置になります。
      </p>

      <Heading num="06">そもそも減らす</Heading>
      <p>
        ここまでは見つけた後の話でした。発生そのものを減らす手立ては、すべて<Link href="/test/stability">テストを安定させる</Link>で見た3つの源への対処に還元されます。
      </p>

      <table>
        <thead>
          <tr><th>設計上の判断</th><th>断てる源</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">外部との境界だけを代役にする</td><td>外部への依存</td></tr>
          <tr><td className="hl">テストごとにデータを作り、片付ける</td><td>共有された状態</td></tr>
          <tr><td className="hl">時刻・乱数・IDを注入して固定する</td><td>実行の時間</td></tr>
          <tr><td className="hl">時間ではなく状態を待つ</td><td>実行の順序</td></tr>
          <tr><td className="hl">外側の段階の本数を絞る</td><td>そもそもの発生確率</td></tr>
        </tbody>
      </table>

      <p>
        最終行が効くことは見落とされがちです ― <strong>E2Eを50本から20本に減らせば、フレーキーの発生源も同じ比率で減ります</strong>。<Link href="/test/levels">段階</Link>の配分は、安定性の問題でもあります。
      </p>

      <Heading num="まとめ">赤は、常に意味があるべき</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>製品の問題かを先に疑う</h4>
          <p>テストを緩めて黙らせると、本番で同じことがユーザーに起きる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>1回の実行では見つからない</h4>
          <p>繰り返し・順序・並列度・負荷で、意図的に揺さぶる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>直したかは記録で判断する</h4>
          <p>1回通っただけでは何も分からない。100回連続で確認する。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>スキップより削除</h4>
          <p>守っているふりをするより、守っていない事実が伝わるほうがよい。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでで、機能が正しく動くことを確かめる話は終わりです。次は、動くだけでは足りないものへ ― <Link href="/test/performance">性能テストと負荷テスト</Link>へ進みます。
      </p>

      <DocsFooter href="/test/flaky" />
    </DocsPage>
  );
}
