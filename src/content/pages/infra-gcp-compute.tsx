import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンピューティング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンピューティング ― 何を単位に動かすか</h1>
        <Lead>
          <Link href="/infra/gcp">抽象度の階段</Link>で見た選択肢を、別の切り口で整理します。管理範囲ではなく<Term>何を単位に動かすか</Term> ― 常に動かし続けるのか、要求が来たときだけか、出来事が起きたときだけか。この問い方をすると、料金の形と設計上の制約が同時に決まるので、選択が速くなります。
        </Lead>
      </Hero>

      <Heading num="01">3つの単位</Heading>

      <DiagramFrame
        slug="infra-gcp-compute-choice"
        aspect="760 / 280"
        caption="処理を動かす場所を、何を単位に動かすかで3つに分けた図。常に動かす形は仮想マシンを自分で用意し、止めない限り課金が続くので常駐する処理や特殊な環境に向く。要求が来たら動かす形はコンテナを置いておくと呼ばれた分だけ起動し、呼ばれない間はゼロまで縮む。出来事に反応する形は関数を置いておき、ファイル追加や通知をきっかけに動く。右へ行くほど運用は軽く、左へ行くほど自由が利く。"
      />

      <Heading num="02">仮想マシン ― 自由と、割引の仕組み</Heading>
      <p>
        <Term>Compute Engine</Term>は仮想マシンを借りる形です。特徴的なのは料金の仕組みで、<strong>長く動かすほど自動で割引される</strong>ものや、あらかじめ使用量を確約して割り引くもの、そして<strong>いつ止められてもよい代わりに大幅に安い</strong>ものが用意されています。
      </p>
      <p>
        最後のものは、<Link href="/infra/aws-compute">余剰容量を借りる方式</Link>と同じ考え方です。中断に耐えられる作り ― 途中から再開できる、失敗しても再実行すればよい ― にできるかどうかが、そのまま費用の差になります。
      </p>

      <Heading num="03">コンテナを置くだけの形</Heading>
      <p>
        Webサービスの既定として使いやすいのが、<strong>コンテナイメージを置くと、要求が来た分だけ起動する</strong>形です。呼ばれない間はゼロまで縮むので、検証環境や利用の少ないサービスでは費用がほとんどかかりません。
      </p>
      <p>
        設計上の制約は2つ。<strong>要求と要求の間で状態を保てない</strong>こと(必要な状態は外に置く)と、<strong>起動の遅れ</strong>があること。後者は、最小の稼働数を1以上にしておくことで避けられますが、その分は常時課金になります ― <Link href="/infra/aws-lambda">同じトレードオフ</Link>がここにもあります。
      </p>

      <Aside label="コンテナにしておくと選び直せる">
        <Link href="/infra/virtualization">イメージにする</Link>という一手間をかけておくと、仮想マシン・マネージドな実行基盤・Kubernetesのどれにも載せ替えられます。最初の選択を間違えても移動できる、というのは実務では大きな安心材料です。
      </Aside>

      <Heading num="まとめ">単位が決まれば、料金も制約も決まる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>常駐が要るかを先に問う</h4><p>要らないなら、要求単位か出来事単位へ。稼働率が低いほど差が大きい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>中断耐性は値引きになる</h4><p>止まっても再開できる作りにできれば、仮想マシンの単価は大きく下がる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>イメージにしておく</h4><p>載せ替えられる形にしておけば、最初の選択を間違えてもやり直せる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-compute" />
    </DocsPage>
  );
}
