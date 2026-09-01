import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "テスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テスト</h1>
        <Lead>
          <Term>「壊れていない」を、感覚ではなく仕組みで言い切る</Term>ためのセクションです。まず、どこにどれだけ積むかという配分を決めます。次に、その段が何をどこまで本物のまま動かすのかを見て、書く順序を反転させるとどうなるかを見ます。そのうえで、書いたテストの判定を信用できる状態に保ち、○×では測れない性質を載せ、最後に機械が届かない範囲を人の目で埋めます。テストの原理そのものではなく<strong>判断のよりどころ</strong>を並べる構成です。設計の良し悪しは<Link href="/design">設計</Link>、工程の回し方は<Link href="/dev">開発の進め方</Link>が担当します。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/test/strategy">品質計画と戦略</Link>
          </h4>
          <p>
            何をどこまでやれば十分か。ピラミッドとその派生形、シフトレフト、リスクに応じた濃淡。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/test/levels">テストの段階</Link>
          </h4>
          <p>
            どこまでを本物のまま動かすか。Unit・Integration・API・E2Eの守備範囲と、その道具。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/test/tdd">テスト駆動開発(TDD)</Link>
          </h4>
          <p>
            動くコードより先に、動いたと判定する基準を書く。設計のフィードバックを数分で受け取る。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/test/stability">テストを安定させる</Link>
          </h4>
          <p>
            「再実行したら通った」を許さない。代役の置き方、データの独立、取りこぼしの検出。
          </p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>
            <Link href="/test/non-functional">機能以外のテスト</Link>
          </h4>
          <p>
            速さ・安全性・使えること・見た目。閾値を決め、実行頻度で分けて共存させる。
          </p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>
            <Link href="/test/review">レビューと品質確認</Link>
          </h4>
          <p>
            動かして確かめられない成果物を人が読む。厳格さの選び方と、工程ごとの観点。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/test" />
    </DocsPage>
  );
}
