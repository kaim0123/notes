import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "モニタリングと管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>モニタリングと管理 ― 外から見る3つと、中を見る1つ</h1>
        <Lead>
          <Link href="/infra/monitoring">監視と障害対応</Link>で見た3本柱に、もう1つ加わるのがこの分野の特徴です。数値・記録・処理の内訳という<Term>外から見る</Term>3つに加えて、動いているプログラムの<Term>中で何が重いか</Term>を継続的に採取する仕組みがあります。外を全部見ても原因が分からないとき ― 遅さが自分のコードの中にあるとき ― に効いてきます。
        </Lead>
      </Hero>

      <Heading num="01">4種類の情報</Heading>

      <DiagramFrame
        slug="infra-gcp-monitoring-signals"
        aspect="760 / 280"
        caption="運用のために集める4種類の情報。数値は時間に沿った変化を追い警報に使う。記録は1件ごとの詳細を残す。処理の内訳はサービスをまたいだ要求がどの区間で時間を使ったかを示す。実行時の内訳は動いているプログラムのどの関数がCPUやメモリを使っているかを継続的に採取する。左の3つは外から何が起きているかを見るもので、いちばん右だけが中で何が重いかを見る。"
      />

      <p>
        4つ目が独特です。本番で動いているプログラムから<strong>継続的に、ごく軽い負荷で</strong>実行時の内訳を採取するので、「特定の条件でだけ遅い」「じわじわメモリが増える」といった、再現の難しい問題に対して有効です。手元での計測(<Link href="/dev/debug-profiling">プロファイリング</Link>)では再現できない条件が、本番にはあります。
      </p>

      <Heading num="02">既定で取れるもの、自分で出すもの</Heading>
      <p>
        多くのサービスは、何もしなくても基本的な数値と記録を出します。ただし<Link href="/infra/monitoring-app">業務の意味を持つ数値</Link>は自分で出す必要があり、これは事業者を問いません。「注文が1件も通っていない」は、既定の数値には決して現れません。
      </p>

      <Heading num="03">警報と、その手前</Heading>
      <p>
        警報の設計は<Link href="/infra/monitoring-data">共通</Link>です ― 持続時間を条件に含める、平常からの逸脱で見る、対応が必要なものだけ鳴らす。加えてこの環境では、<strong>目標値からの逆算</strong>で警報を組む方法が用意されています(<Link href="/infra/gcp-cloud-monitoring">Cloud Monitoring</Link>)。
      </p>

      <Aside label="記録の量は費用になる">
        記録は取り込んだ量で課金されるのが一般的です。何も考えずに全部を送ると、月単位で見たときに無視できない額になります。<strong>出す量を制御する</strong>(不要なものを除外する、レベルで絞る)ことと、<strong>保存期間を決める</strong>ことは、監視設計の一部として最初に決めます。
      </Aside>

      <Heading num="まとめ">外と中の両方を見る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3本柱に、実行時の内訳が加わる</h4><p>本番でしか再現しない遅さに、手元の計測は届かない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>業務の数値は自分で出す</h4><p>既定の数値は、外から分かることしか答えない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>量と期間を決める</h4><p>記録は取り込んだ量で課金される。設計の一部として先に決める。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-monitoring" />
    </DocsPage>
  );
}
