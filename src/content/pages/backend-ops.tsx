import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "本番運用" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>本番運用 ― 壊れ方を選ぶ</h1>
        <Lead>
          ここまでは<Term>正しく動くための実装</Term>を扱ってきました。この見出しで扱うのは性質が違います ― <Term>壊れることを前提に、どう壊れるかを選ぶ</Term>ための実装です。全部落ちるのか、一部だけ遅くなるのか。原因に30分で辿り着けるのか、3日かかるのか。その差を決めるのは、この4つを書いたかどうかです。
        </Lead>
      </Hero>

      <Heading num="01">4つの手立てが、それぞれ違う場所を守る</Heading>
      <DiagramFrame
        slug="backend-ops-guards"
        aspect="640 / 350"
        caption="障害がどこから来るかと、それを止める4つの手立てを示した図。中央のアプリケーションに対し、入口にはレート制限が置かれて入ってくる量そのものを絞る。データベースや外部APIへ向かう出口には、タイムアウトとリトライと遮断が置かれ、相手の遅さと故障が自分に伝わるのを止める。上から降りてくるデプロイの受け止めには起動と停止の作法が要る。そして図の全体を横切る形で追跡が置かれ、これだけは壊れることを防ぐのではなく、壊れたあとに原因へ辿り着くためのもの。下部には、入る量を絞る、伝わるのを止める、切り替えを取りこぼさない、起きたことを辿れる、という4つの言葉でまとめられている。"
      />

      <table>
        <thead>
          <tr><th>ページ</th><th>守る場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/backend/ops-rate-limit">レート制限</Link></td><td>入口。<strong>入ってくる量そのもの</strong>を絞る</td></tr>
          <tr><td className="hl"><Link href="/backend/ops-resilience">タイムアウト・リトライ・遮断</Link></td><td>出口。<strong>相手の障害が自分に伝わる</strong>のを止める</td></tr>
          <tr><td className="hl"><Link href="/backend/ops-lifecycle">起動と停止</Link></td><td>入れ替えの瞬間。<strong>取りこぼしを出さない</strong></td></tr>
          <tr><td className="hl"><Link href="/backend/ops-tracing">リクエストIDと分散トレーシング</Link></td><td>全体。<strong>壊れたあとに辿れる</strong>ようにする</td></tr>
        </tbody>
      </table>

      <Heading num="02">共通する考え方 ― 自分より先に壊れるもの</Heading>
      <p>
        4つを貫くのは1つの視点です。<Term>自分のアプリより先に壊れるものは何か</Term>。
      </p>

      <table>
        <thead>
          <tr><th>先に壊れるもの</th><th>壊れ方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">データベースの接続</td><td>本数が有限。使い切れば、以降のリクエストは何もできない</td></tr>
          <tr><td className="hl">外部のサービス</td><td>遅くなる。落ちるより<strong>遅くなるほうが厄介</strong></td></tr>
          <tr><td className="hl">従量課金の処理</td><td>止まらないまま、請求だけが増える</td></tr>
          <tr><td className="hl">自分のプロセス</td><td>入れ替えのたびに、必ず一度死ぬ</td></tr>
        </tbody>
      </table>

      <p>
        2行目が最も重要です。<Term>落ちた相手より、遅い相手のほうが危険</Term>です。落ちていれば即座にエラーが返り、こちらは次に進めます。しかし応答が返らないまま待ち続けると、待っているリクエストが積み上がり、<Term>相手の障害が、自分の障害になります</Term>。
      </p>

      <Heading num="03">境界 ― ここで扱うのはコードで書くこと</Heading>
      <Aside label="インフラセクションとの分け方">
        冗長化・負荷分散・監視基盤・バックアップといった<Term>基盤として用意するもの</Term>はインフラセクションの担当です。ここで扱うのは<Term>アプリケーションのコードに書くこと</Term> ― 上限の判定、待ち時間の設定、停止の合図の受け取り、識別子の引き回しです。同じ「落とさない」でも、書く場所が違います。
      </Aside>

      <p>
        パイプラインの組み方やデプロイの方式は<Link href="/dev/ci-deploy">デプロイ戦略とロールバック</Link>で扱いました。この見出しは、<Term>そのデプロイをアプリ側で受け止める</Term>ところから始まります。
      </p>

      <Analogy label="💡 たとえるなら">
        店の営業を続けるための備えです。入口で人数を絞り、仕入れ先が遅れたら待たずに諦め、閉店作業は客を追い出さずに行い、何かあったときのために伝票に通し番号を振っておく。どれも料理の味を良くはしませんが、<Term>混んだ日に店が回るかどうか</Term>はここで決まります。
      </Analogy>

      <Heading num="まとめ">落ちないためではなく、選ぶために</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>入口と出口の両方を守る</h4>
          <p>入る量を絞り、出ていく先の障害が伝わるのを止める。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>遅い相手が一番危ない</h4>
          <p>落ちていれば次に進める。返らないと、待ちが積み上がる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>辿れることは防御ではない</h4>
          <p>壊れるのは止められない。原因に辿り着く時間だけが変わる。</p>
        </Card>
      </CardGrid>

      <p>
        まずは入口から。<Link href="/backend/ops-rate-limit">レート制限</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/ops" />
    </DocsPage>
  );
}
