import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "アプリケーション統合" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>アプリケーション統合 ― 運ぶ層と、振り分ける層</h1>
        <Lead>
          サービス同士を直接呼び合わせない、という設計は<Link href="/infra/aws-integration">共通</Link>です。Google Cloud側の構造で押さえておきたいのは、<Term>運ぶ仕組みと振り分ける仕組みが層になっている</Term>点です。振り分けの層を使っても、実際にメッセージを運んでいるのは下の層 ― この関係が分かると、どちらを直接使うべきかの判断が付きます。
        </Lead>
      </Hero>

      <Heading num="01">2つの層</Heading>

      <DiagramFrame
        slug="infra-gcp-integration-layers"
        aspect="700 / 280"
        caption="出来事を配る仕組みと、それを土台にした振り分けの仕組みの関係。下の層は送る側と受け取る側を切り離してメッセージを届ける土台で、溜める・再試行する・順序を保つといった運ぶことに専念する。上の層はその土台の上に立ち、どの出来事をどの宛先へ渡すかという条件を設定として持つ。上の層を使っても、実際に運んでいるのは下の層になる。"
      />

      <p>
        使い分けは単純です。<strong>自分のアプリ同士を、決まった相手へつなぐだけ</strong>なら下の層を直接使う。<strong>クラウド側で起きた出来事に反応させたい</strong>、あるいは<strong>種類ごとに宛先を変えたい</strong>なら上の層を使う。上の層は便利ですが、間に1段増えるぶん遅延も加わります。
      </p>

      <Heading num="02">つなぎ方を設定として持つ</Heading>
      <p>
        上の層の値打ちは、<Link href="/infra/aws-eventbridge">EventBridge</Link>と同じく<strong>対応関係がコードの外に出る</strong>ことです。どの出来事がどの処理を呼ぶかが設定として一覧でき、受け手を増やしても送る側は変わりません。
      </p>
      <p>
        裏返しの注意も同じで、<strong>コードを読んでも全体の流れが分からなくなります</strong>。条件の一覧を<Link href="/infra/gcp-iac">構成のコード</Link>として管理し、レビューの対象に含めておかないと、動いている仕組みが誰にも把握できなくなります。
      </p>

      <Aside label="非同期にする理由を言えるか">
        間に何かを挟むと、追跡と整合の手間が確実に増えます。<strong>相手の都合から切り離したい</strong>という理由が言えるときだけ挟み、すぐ結果が要るものは直接呼ぶ ― この線引きは事業者によらず同じです(<Link href="/backend/jobs">非同期処理とジョブ</Link>)。
      </Aside>

      <Heading num="まとめ">層を意識して選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>運ぶ層と振り分ける層</h4><p>上を使っても運ぶのは下。構造が分かると、直接使うべき層が決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>基盤の出来事に反応できる</h4><p>監視して検知するのではなく、起きたことを受け取る形にできる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>設定は仕様</h4><p>流れがコードから消えるぶん、条件の一覧を管理下に置く。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-integration" />
    </DocsPage>
  );
}
