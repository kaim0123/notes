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

export const metadata: Metadata = { title: "CI/CD" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CI/CD ― 実行エンジンと、調整役</h1>
        <Lead>
          パイプラインの考え方そのものは<Link href="/dev/git-ci">Git・CI/CD</Link>で扱っています。ここで見るのは、それをクラウドの部品として組むときの構造です。名前は複数ありますが、役割は2つしかありません ― <Term>決まった手順を走らせる側</Term>と、<Term>その順序と承認を管理する側</Term>。この分離が、後から流れを変えるときの効きに直結します。
        </Lead>
      </Hero>

      <Heading num="01">2つの役割</Heading>

      <DiagramFrame
        slug="infra-aws-cicd-roles"
        aspect="700 / 260"
        caption="自動化を2つの役割に分けて捉えた図。実行エンジンは1つの箱の中で、環境を用意しコマンドを実行し成果物を出して環境を捨てる。調整役は箱と箱のつなぎ方を管理し、どの順番で動かすか、どこで人が承認するか、失敗したらどこで止めるかを決める。役割を分けておくと、実行の中身を変えても流れは変わらず、流れを変えても中身は変わらない。"
      />

      <p>
        分けておく意味は、変更の影響範囲です。テストの内容を増やすのは実行側の話、承認の段階を足すのは調整側の話。<strong>混ぜて1つのスクリプトに書くと、片方を触るたびにもう片方が壊れます</strong>。
      </p>

      <Heading num="02">どこまで自動にするか</Heading>
      <p>
        「継続的インテグレーション」は<strong>変更を頻繁に統合して壊れていないか確かめる</strong>こと、「継続的デリバリー」は<strong>いつでも出せる状態を保つ</strong>ことです。実際の運用では、環境ごとに自動化の度合いを変えるのが普通です。
      </p>
      <table>
        <thead>
          <tr><th>環境</th><th>起動</th><th>承認</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">検証</td><td>変更のたびに自動</td><td>不要 ― 壊れてもよい場所にしておく</td></tr>
          <tr><td className="hl">本番</td><td>自動、または指定した契機で</td><td>要件による ― 承認の段階を明示的に置く</td></tr>
        </tbody>
      </table>
      <p>
        承認を挟むかどうかは、技術ではなく<strong>戻せるかどうか</strong>で決めます。数秒で切り戻せる構成なら承認は薄くてよく、戻すのに時間がかかる構成ほど手前で止める価値が上がります(<Link href="/infra/deploy">デプロイと公開</Link>)。
      </p>

      <Heading num="03">パイプラインにも権限が要る</Heading>
      <p>
        見落とされがちですが、<strong>パイプラインは本番を変更できる強い権限を持ちます</strong>。ここが乗っ取られれば、権限管理の努力は迂回されます。
      </p>
      <ul>
        <li><strong>必要な操作だけを許す</strong> ― 配置に要る権限だけを与え、それ以外は与えない(<Link href="/security/authz">最小権限</Link>)。</li>
        <li><strong>秘密は保管サービスから取る</strong> ― 設定画面に直接書かず、実行時に取得する(<Link href="/infra/aws-secrets-manager">Secrets Manager</Link>)。</li>
        <li><strong>誰が実行したかを残す</strong> ― 手動での実行や承認は、記録として残る形にする。</li>
      </ul>

      <Aside label="外部のサービスを使う場合も同じ">
        リポジトリの提供元が持つ自動化の仕組みを使う構成も一般的です。その場合も考え方は変わりませんが、<strong>外部から本番を変更できる経路</strong>ができることは意識しておきます。長期の鍵を渡すのではなく、短命な資格情報を都度受け取る連携方式を選べるなら、そちらを使います。
      </Aside>

      <Heading num="まとめ">分けて、絞る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>実行と調整を分ける</h4>
          <p>箱の中身と、箱のつなぎ方。混ぜると、片方の変更がもう片方を壊す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>承認は戻せなさで決める</h4>
          <p>数秒で戻せるなら薄くてよい。戻すのに時間がかかるほど、手前で止める価値が上がる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>パイプラインの権限を絞る</h4>
          <p>本番を変えられる強い経路。ここが緩いと、他の権限管理が意味を失う。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-cicd" />
    </DocsPage>
  );
}
