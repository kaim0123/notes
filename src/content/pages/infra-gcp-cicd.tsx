import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "CI/CD" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CI/CD ― 同じイメージを、そのまま運ぶ</h1>
        <Lead>
          <Link href="/infra/aws-cicd">実行エンジンと調整役</Link>という役割分担は共通です。Google Cloud側の構成で特徴的なのは、<Term>コンテナイメージが受け渡しの単位になる</Term>ことです。ビルドの仕組みがイメージを作って保管庫に登録し、配置の仕組みがそれを各環境へ運ぶ。<strong>検証したものと本番で動くものが同一である</strong>ことが、構成として担保されます。
        </Lead>
      </Hero>

      <Heading num="01">2つの仕組みで分担する</Heading>

      <DiagramFrame
        slug="infra-gcp-cicd-flow"
        aspect="760 / 260"
        caption="ソースの変更から本番への配置までを2つの道具で分担する構成。前半はビルドの仕組みがソースを取得してテストを走らせ、コンテナのイメージを作って保管庫へ登録する。後半は配置の仕組みが登録されたイメージを検証環境へ配置し、確認できたら承認を経て本番へ配置する。同じイメージがそのまま各環境へ渡るため、検証したものと本番で動くものが一致する。"
      />

      <p>
        この形の値打ちは、<Link href="/infra/deploy">1度ビルドして同じものを配る</Link>という原則が<strong>自然に守られる</strong>ことです。環境ごとにビルドし直す構成では、依存の更新やビルド環境の差で「検証では通ったのに本番で落ちる」が起こりえます。イメージを単位にすれば、その余地が消えます。
      </p>

      <Heading num="02">環境ごとの違いは、外から与える</Heading>
      <p>
        同じイメージを配る以上、環境ごとの違い ― 接続先、鍵、機能フラグ ― は<strong>外から渡します</strong>。設定として渡す、あるいは<Link href="/infra/gcp-secret-manager">秘密の保管サービス</Link>から取得する。イメージの中に環境の情報が入った時点で、この原則は崩れます。
      </p>

      <Heading num="03">段階的に切り替える</Heading>
      <p>
        配置の仕組みには、<strong>新しい版へ少しずつ流す</strong>やり方が用意されています ― 一部の要求だけを新しい版へ回し、問題がなければ比率を上げる。<Link href="/dev/ci-deploy">デプロイ戦略</Link>で扱った考え方が、設定として使える形になっています。
      </p>
      <p>
        あわせて決めておくのは<strong>やめる条件</strong>です。エラー率が上がったら自動で戻す、という仕組みを入れておかないと、「少しずつ流す」は「少しずつ壊す」になります。
      </p>

      <Aside label="パイプラインの権限を絞る">
        本番を変更できる強い経路である点も<Link href="/infra/aws-cicd">共通</Link>です。配置に必要な操作だけを許し、秘密は保管サービスから取得し、誰がいつ承認したかを記録に残します。ここが緩いと、他の権限管理が意味を失います。
      </Aside>

      <Heading num="まとめ">単位を決めると、原則が守られる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>イメージが受け渡しの単位</h4><p>同じものが各環境へ渡る。検証と本番の食い違いが構造的に消える。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>環境の違いは外から</h4><p>イメージに焼き込んだ時点で、同じものを配る意味が失われる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>やめる条件を決める</h4><p>少しずつ流す仕組みは、戻す条件とセットで初めて安全になる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-cicd" />
    </DocsPage>
  );
}
