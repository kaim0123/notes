import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud Monitoring" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud Monitoring ― 目標から逆算して鳴らす</h1>
        <Lead>
          数値を集めて可視化し、しきい値で警報を出す ― この基本は<Link href="/infra/aws-cloudwatch">CloudWatch</Link>と変わりません。ここで扱いたいのは、その一段上の考え方です。<strong>CPUが何%を超えたら</strong>ではなく、<Term>利用者への約束をどれだけ守れているか</Term>から警報を組む。この形にすると、しきい値の議論が「何%が正しいか」ではなく「どこまでなら許せるか」に変わります。
        </Lead>
      </Hero>

      <Heading num="01">目標と、許される失敗の量</Heading>

      <DiagramFrame
        slug="infra-gcp-cloud-monitoring-slo"
        aspect="760 / 300"
        caption="目標値と、そこから許される失敗の量を示した図。まず利用者への約束として保つ水準を決めると、その期間に許される失敗の量が自動的に決まり、これが残りの余裕にあたる。余裕が十分なうちは新しい変更を積極的に出してよく、減ってきたら安定を優先して変更の速度を落とし、使い切ったら機能追加を止めて信頼性の回復に充てる。速く出すことと安定させることの綱引きを、感情ではなく残量で判断できるようにする仕組み。"
      />

      <p>
        この考え方の実務的な効き目は、<strong>議論の相手が変わること</strong>です。「もっと安定させるべきだ」「もっと速く出すべきだ」という水掛け論が、残っている余裕の量という1つの数字に置き換わります。余裕があるなら出す、無いなら止める ― 判断の根拠が共有されます。
      </p>

      <Heading num="02">何を目標にするか</Heading>
      <p>
        目標にする指標は、<strong>利用者から見えるもの</strong>を選びます。CPU使用率は利用者から見えないので目標にはなりません。正常に応答できた割合、一定時間内に応答できた割合、処理を完了できた割合 ― <Link href="/infra/monitoring-app">上の層の指標</Link>がここに来ます。
      </p>
      <p>
        目標値は<strong>高すぎないこと</strong>が重要です。100%に近づけるほど費用は指数的に増え、しかも余裕がゼロになるので何も変更できなくなります。「利用者が実際に困り始める水準」から逆算するのが現実的です。
      </p>

      <Heading num="03">警報の設計</Heading>
      <p>
        余裕の減り方が速いときに鳴らす、という組み方をすると、<strong>1回のエラーでは鳴らず、継続的な悪化では早く鳴ります</strong>。<Link href="/infra/monitoring-data">固定のしきい値</Link>で悩んでいた「誤報と見逃しのトレードオフ」に、別の角度から答える方法です。
      </p>

      <Aside label="ダッシュボードは順序を固定する道具">
        並べ方の原則は<Link href="/infra/aws-cloudwatch">共通</Link>です ― 上に利用者から見た指標、下に土台の指標。深夜でも同じ順序で降りられるようにしておくことが、可視化の目的です。きれいに見せることではありません。
      </Aside>

      <Heading num="まとめ">残量で判断する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>目標から余裕が決まる</h4><p>許される失敗の量が数字になる。出すか止めるかの根拠が共有される。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>利用者から見える指標を選ぶ</h4><p>CPU使用率は目標にならない。困り始める水準から逆算する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>減り方で鳴らす</h4><p>1回では鳴らず、継続的な悪化では早く鳴る。しきい値の悩みに別の答えを出す。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-cloud-monitoring" />
    </DocsPage>
  );
}
