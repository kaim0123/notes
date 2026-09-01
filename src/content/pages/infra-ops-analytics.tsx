import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "分析・改善" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>分析・改善 ― 数値を先に決める</h1>
        <Lead>
          公開後の改善で最も多い失敗は、<strong>何を良くしたかったのかが後から分からなくなること</strong>です。手を入れた、たぶん良くなった、でも証拠はない ― この状態を避けるには順序を守るしかありません。<Term>何を良くするかを1つの数値として決めてから、測る</Term>。この順序が逆になると、集めたデータの山だけが残ります。
        </Lead>
      </Hero>

      <Heading num="01">1周の形</Heading>

      <DiagramFrame
        slug="infra-ops-analytics-cycle"
        aspect="700 / 280"
        caption="計測から改善までを1周する流れ。まず何を良くしたいのかを1つの数値として決め、次にその数値が今いくつなのかを測れる状態にする。そのうえで数値を動かしそうな仮説を立てて手を入れ、変えた後にもう一度測って効果を確かめる。効果がなければ仮説が外れたということなので別の仮説へ移る。数値を先に決めておくことが、後から効果を語れるかどうかを分ける。"
      />

      <p>
        鍵は<strong>1度に1つだけ変える</strong>ことです。複数を同時に変えると、どれが効いたのか永久に分かりません。急いでいるときほど複数変えたくなりますが、結果として<strong>次の判断材料が失われます</strong>。
      </p>

      <Heading num="02">何を測るか</Heading>
      <p>
        アクセス数のような総量は、増減の理由が多すぎて判断に使えません。実務で効くのは<strong>比率</strong>と<strong>経路の通過率</strong>です ― 訪れた人のうち登録まで進んだ割合、途中のどの段階で離脱しているか。<Link href="/infra/monitoring-app">ビジネスの指標</Link>として監視に載せているものと、ここで見るものは重なります。
      </p>
      <p>
        測定を仕込む際は、<strong>計測用のコードがページを遅くしない</strong>こと、<strong>個人を特定できる情報を送らない</strong>ことを確認します。後者は<Link href="/infra/ops-compliance">法令・コンプライアンス</Link>の領域と直結します。
      </p>

      <Heading num="03">検索から見つけてもらう</Heading>
      <p>
        流入の設計も運営の仕事です。技術面で効くのは基本的なことに集約されます ― <strong>クロールできる</strong>(robots.txtとサイトマップ、リンクでたどれる構造)、<strong>内容が読み取れる</strong>(適切な見出し構造、意味のあるタイトルと説明)、<strong>速く表示される</strong>(<Link href="/infra/ops-performance">パフォーマンス</Link>)。
      </p>
      <p>
        小手先の対策より、<strong>同じ内容が複数のURLで見えていないか</strong>のような構造の問題を潰すほうが効果があります。これは<Link href="/frontend/nextjs-routing">URL設計</Link>の問題でもあります。
      </p>

      <Aside label="数値を目的にしない">
        指標は目的の代理でしかありません。指標を上げること自体が目的になると、<strong>数値だけが良くなって実態が悪くなる</strong>ことが起きます ― 誤操作を誘う導線で登録数を伸ばす、といった形です。定期的に「この数値は、本当に良くしたいことを表しているか」を問い直します。
      </Aside>

      <Heading num="まとめ">証拠が残る形で進める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>数値を先に決める</h4><p>測ってから考えるのではなく、良くしたいことを1つ決めてから測る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>1度に1つ変える</h4><p>複数変えると、どれが効いたか分からない。次の判断材料が消える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>指標を目的にしない</h4><p>代理でしかない。数値だけ良くなる変更に注意する。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-analytics" />
    </DocsPage>
  );
}
