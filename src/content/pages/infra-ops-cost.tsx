import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コスト管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コスト管理 ― 見えるようにして、止める</h1>
        <Lead>
          クラウドの費用は<Term>誰も担当しないと増える一方</Term>という性質を持ちます。使った分だけ払う仕組みは、使わなくなったものを止める動機を誰にも与えないからです。対策は安いサービスを探すことではなく、<strong>内訳が見える状態を作り、増えたら気づき、止める・消す・期限を切る</strong>という運用に落とすことです。
        </Lead>
      </Hero>

      <Heading num="01">何に払っているのか</Heading>
      <p>
        <Link href="/infra/aws">AWS</Link>で見たとおり、請求を押し上げるのは<strong>持っている時間</strong>・<strong>出ていくデータ</strong>・<strong>保存と回数</strong>の3つです。まずこの内訳で見られるようにします。総額だけを見ていても、どこを直せばよいか分かりません。
      </p>
      <p>
        内訳を見るために必要なのが<Term>ラベル(タグ)</Term>です。サービス名・環境・チームを資源に付けておけば、費用をその軸で集計できます。<strong>作るときに付けるしかない</strong>ので、規約として決めておきます(<Link href="/infra/gcp-basics">Google Cloudの基礎</Link>)。
      </p>

      <Heading num="02">無駄の典型</Heading>

      <DiagramFrame
        slug="infra-ops-cost-waste"
        aspect="760 / 280"
        caption="無駄な費用が生まれる典型的な形を4つ並べた図。使っていないのに残っているもの、余裕を見たまま見直していない過剰な性能、すべてを最高の詳細度で保存し続けている記録、そして内側で済む通信が外を経由していたりキャッシュが効いていなかったりする経路の設計。いずれも1件あたりは小さく、請求書を見るまで気づかない点が共通しているため、定期的に見る仕組みを置く。"
      />

      <p>
        最初に手を付けるのは<strong>1つ目</strong>です。使用率がゼロの資源を一覧すれば、たいてい何かが見つかります ― 検証で作ったまま忘れたもの、消したサーバーのディスク、古いスナップショット。<strong>1回の掃除で数割減る</strong>ことも珍しくありません。
      </p>

      <Heading num="03">仕組みで止める</Heading>
      <table>
        <thead><tr><th>手立て</th><th>効き方</th></tr></thead>
        <tbody>
          <tr><td className="hl">予算と通知</td><td>月の見込みが一定を超えたら知らせる。<strong>気づくのが翌月では遅い</strong></td></tr>
          <tr><td className="hl">保持期間の既定</td><td>ログもスナップショットも、期限を決めてから作る</td></tr>
          <tr><td className="hl">検証環境の自動停止</td><td>夜間と休日に止める。使う時間だけ動かす</td></tr>
          <tr><td className="hl">作れる上限の設定</td><td>意図しない大量作成を防ぐ。事故の被害額を抑える</td></tr>
        </tbody>
      </table>

      <Aside label="費用の異常は、障害の兆候でもある">
        急な費用の増加は、無駄だけでなく<strong>異常の合図</strong>のこともあります ― 無限ループで関数が呼ばれ続けている、想定外の量の通信が出ている、外部から大量にアクセスされている。だから費用の監視は、<Link href="/infra/monitoring">監視</Link>の一部として扱う価値があります。
      </Aside>

      <Heading num="まとめ">見えなければ、減らせない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>内訳で見る</h4><p>総額では手が打てない。ラベルは作るときに付けるしかない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>まず使っていないものを消す</h4><p>1回の掃除で大きく減ることが多い。定期的に一覧する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>期限と上限を仕組みにする</h4><p>人の意識では止まらない。作るときに期限を決め、上限で事故を抑える。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-cost" />
    </DocsPage>
  );
}
