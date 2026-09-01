import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "保守" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>保守 ― 目立たない仕事を、止めない</h1>
        <Lead>
          リリース後に手を入れ続ける作業をまとめて保守と呼びますが、中身は性質の違う4種類が混ざっています。<Term>直す・追従する・良くする・備える</Term>。このうち目立つのは最初の2つで、削られるのはたいてい最後の1つです。しかし<strong>備えを止めると、良くする速度が落ち、やがて直す仕事が増えます</strong> ― 順番に効いてくるので、削った影響は半年後に現れます。
        </Lead>
      </Hero>

      <Heading num="01">4つに分けて見る</Heading>

      <DiagramFrame
        slug="infra-ops-maintenance-types"
        aspect="760 / 280"
        caption="リリース後に手を入れる作業を目的で4つに分けた図。不具合を直す修正、依存や動作環境の変化への追従、使い勝手や性能を良くする改善、そして将来の問題を減らすための予防。急ぎで目立つのは最初の2つだが、4つ目を止めると3つ目の速度が落ち、やがて最初の2つが増える。どれか1つに偏らせないことが、長く動かすための条件になる。"
      />

      <p>
        4つの比率を意識すると、チームの状態が読めます。直す仕事ばかりになっているなら、それは予防を削り続けた結果です。逆に、良くする仕事に時間を割けているなら、追従と予防が回っているということです。<strong>比率そのものが指標になります</strong>。
      </p>

      <Heading num="02">追従は、期限のある仕事</Heading>
      <p>
        依存ライブラリ、動作環境、外部サービスのAPI ― どれも自分の都合とは関係なく古くなります。<strong>やらなくても今日は困らない</strong>のが厄介な点で、放置した分は<strong>ある日まとめて</strong>返ってきます。
      </p>
      <p>
        実務での定石は、<strong>小さく頻繁に</strong>です。更新を自動で提案する仕組みを入れ、テストが通れば取り込む(<Link href="/dev/tooling-deps">依存管理</Link>)。半年に一度まとめて上げると、変更が大きすぎて壊れた原因を特定できません。脆弱性を含む依存は<Link href="/dev/tooling-security">別枠</Link>で、期限を切って対応します。
      </p>

      <Heading num="03">予防を、見える形にする</Heading>
      <p>
        予防的な作業 ― 整理、作り直し、テストの追加 ― は成果が見えないため、優先度の議論で必ず負けます。対策は<strong>見える形に変換する</strong>ことです。
      </p>
      <ul>
        <li><strong>数字に結び付ける</strong> ― この整理で、この作業にかかる時間がどれだけ減るか。</li>
        <li><strong>枠を確保する</strong> ― 各期間の一定割合を予防に充てると先に決める。都度の交渉にしない。</li>
        <li><strong>障害の振り返りから引く</strong> ― <Link href="/infra/monitoring">ポストモーテム</Link>で出た再発防止策は、予防の作業として最も通しやすい形をしている。</li>
      </ul>

      <Aside label="変えられる状態を保つことが本体">
        保守の目的は、コードを綺麗にすることではありません。<strong>必要なときに、安全に変えられる状態を保つこと</strong>です。だから判断の基準も「綺麗かどうか」ではなく「次に変更するとき、どれだけ怖いか」になります。怖い場所にテストを足し、読めない場所を整理する ― <Link href="/design/principles-foundations">設計の原則</Link>が運用の文脈で効いてくる場面です。
      </Aside>

      <Heading num="まとめ">比率を見て、枠を守る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>4種類が混ざっている</h4><p>比率がチームの状態を表す。直す仕事ばかりなら、予防を削った結果。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>追従は小さく頻繁に</h4><p>まとめて上げると、壊れた原因が特定できなくなる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>予防は枠として確保する</h4><p>都度の交渉では必ず負ける。先に割合を決めておく。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-maintenance" />
    </DocsPage>
  );
}
