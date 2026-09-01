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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "CodePipeline" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CodePipeline ― 流れを、目に見える形にする</h1>
        <Lead>
          <Link href="/infra/aws-cicd">CI/CD</Link>の2つの役割のうち、<Term>調整役</Term>にあたる部分です。ビルドもテストも配置も、単体ではスクリプトで書けます。それでも流れを別の仕組みとして持つのは、<strong>いま何がどこまで進んでいるかを、誰でも見られる状態にするため</strong>です。1本のスクリプトに全部を書くと、途中で止まったときに何が終わって何が終わっていないのかが、ログを読まないと分かりません。
        </Lead>
      </Hero>

      <Heading num="01">段階として並べる</Heading>

      <DiagramFrame
        slug="infra-aws-codepipeline-stages"
        aspect="760 / 280"
        caption="ソースの変更からデプロイまでを段階として並べる仕組み。最初の段階で変更を検知し、次にビルドとテストを実行し、検証環境へ配置する。その次に人の承認を挟み、承認されてから本番へ進む。どこかで失敗するとそこで停止して以降には進まない。1つの段階の中には複数の作業を置け、並行にも順番にも走らせられる。どこで止まったかが、そのまま記録として残る。"
      />

      <p>
        段階に分ける利点は3つあります。<strong>進捗が見える</strong>(どこまで進んだかが一目で分かる)、<strong>失敗の位置が分かる</strong>(段階として記録される)、<strong>途中から再開できる</strong>(全部をやり直さずに済む)。1本のスクリプトでは、どれも自前で作り込む必要があります。
      </p>

      <Heading num="02">承認を段階として置く</Heading>
      <p>
        本番への配置の手前に、人の承認を待つ段階を置けます。ここでの要点は、<strong>承認が「止める場所」を明示していること</strong>です。誰がいつ通したかも記録に残るので、後から経緯を追えます。
      </p>
      <p>
        ただし承認は、置けば安全になるものではありません。<strong>何を確認して通すのかが決まっていない承認</strong>は、ただの待ち時間になります。確認項目を明示する ― 検証環境での動作、影響範囲、切り戻しの手順 ― という点は<Link href="/test/acceptance">受入れ基準</Link>と同じ話です。
      </p>

      <Aside label="承認を置く場所">
        「本番配置の直前」に置くのが自然ですが、それだけでは遅いこともあります。データベースの構造変更のように<strong>戻すのが難しい操作</strong>は、その手前に別の確認を置く価値があります。承認の位置は、<strong>そこから先が戻しにくくなる境目</strong>に合わせます。
      </Aside>

      <Heading num="03">環境をまたぐ</Heading>
      <p>
        検証と本番でアカウントを分けている構成では、パイプラインが<strong>アカウントをまたいで</strong>配置することになります。その場合、配置先のアカウント側に「このパイプラインからの操作だけを許す役割」を用意し、パイプラインはそれを借りて実行します ― 鍵を渡すのではなく、<Link href="/infra/aws-security">役割を引き受ける</Link>形です。
      </p>
      <p>
        同じ成果物を各環境へ配ることも重要です。環境ごとにビルドし直すと、<strong>検証したものと本番のものが別物</strong>になりえます。<Link href="/infra/deploy">1度ビルドして、同じものを配る</Link>という原則は、パイプラインの形として担保します。
      </p>

      <Heading num="04">止まったままにしない</Heading>
      <p>
        パイプラインは、失敗したまま放置されがちです。誰も見ていない通知に失敗が流れ、次の変更が積み重なる ― この状態は<strong>いつでも出せる状態を保つ</strong>という目的そのものを失わせます。
      </p>
      <p>
        対策は運用の側にあります。失敗の通知を<strong>人が確実に見る場所</strong>へ出すこと、そして「壊れたまま次の作業へ進まない」という合意です(<Link href="/dev/git-ci">CI/CDパイプライン</Link>で言う、赤いビルドを最優先で直すという原則)。
      </p>

      <Heading num="まとめ">流れを持つと、状態が見える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>段階が進捗と記録になる</h4>
          <p>どこまで進んだか、どこで止まったか。スクリプト1本では自前で作ることになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>承認は境目に置く</h4>
          <p>戻しにくくなる手前に置く。確認項目が無い承認は、ただの待ち時間。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>同じ成果物を配る</h4>
          <p>環境ごとにビルドし直すと、検証したものと本番のものが別になる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-codepipeline" />
    </DocsPage>
  );
}
