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
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンテナ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンテナ ― 箱をどこに、いくつ並べるか</h1>
        <Lead>
          <Link href="/infra/docker">Docker</Link>が引き受けるのは箱を作るところまでで、その箱を<strong>どのサーバー群に、何個、どう並べ続けるか</strong>は別の仕組みの仕事です。AWSのコンテナ関連サービスは一見数が多いのですが、選択は2つしかありません ― <Term>束ねる仕組みを何にするか</Term>と、<Term>土台を自分で持つか任せるか</Term>。この2つは独立しているので、掛け合わせの4通りから選ぶことになります。
        </Lead>
      </Hero>

      <Heading num="01">2つの独立した選択</Heading>

      <DiagramFrame
        slug="infra-aws-container-matrix"
        aspect="760 / 300"
        caption="コンテナを動かすときの2つの独立した選択。横軸は束ねる仕組みで、事業者独自のオーケストレーターか標準規格のKubernetesか。前者は覚えることが少なく周辺サービスとの接続も整っている代わりに持ち出せず、後者は知識も定義もそのまま他所で使えるがKubernetes自体の学習が要る。縦軸は土台で、コンテナが載るサーバーを自分で並べるか、その存在ごと任せるか。横の選択は持ち出せるか、縦の選択はサーバーを見るかという別の問いなので、混ぜずに1つずつ決める。"
      />

      <Heading num="02">束ねる仕組み ― 独自か、標準か</Heading>
      <p>
        <Term>ECS</Term>はAWSが自社で作ったオーケストレーターです。どのイメージを、いくつ、どんな設定で動かすかを<strong>タスク定義</strong>として書き、その実行単位を束ねたものを<strong>サービス</strong>、動く土台を<strong>クラスター</strong>と呼びます。権限・ロードバランサ・監視といった周辺との接続が最初から整っているのが強みで、覚える語彙も少なくて済みます。
      </p>
      <p>
        <Term>EKS</Term>は<Link href="/infra/kubernetes">Kubernetes</Link>をマネージドで提供するものです。クラスタの制御部分の運用を肩代わりしてもらえるので、Kubernetesの知識とマニフェストをそのまま使えます。
      </p>

      <table>
        <thead>
          <tr><th></th><th>独自のオーケストレーター</th><th>Kubernetes</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">学習の量</td><td>少ない(その事業者の概念だけ)</td><td>多い(Kubernetes自体の語彙が必要)</td></tr>
          <tr><td className="hl">持ち出せるか</td><td>持ち出せない</td><td>定義も知識もそのまま他所で使える</td></tr>
          <tr><td className="hl">向く状況</td><td>その事業者に寄せてよい、早く始めたい</td><td>他所でも動かす前提、すでに知見がある</td></tr>
        </tbody>
      </table>

      <p>
        判断の実際は「可搬性に<strong>いま</strong>いくら払うか」です。将来の移行に備えて標準を選ぶのは合理的に見えますが、その学習と運用の費用は今日から発生します。移行が具体的な計画として無いなら、少ない語彙で始めるほうが速く動きます。
      </p>

      <Heading num="03">土台 ― 持つか、任せるか</Heading>
      <p>
        どちらの仕組みを選んでも、コンテナが載るサーバーを<strong>自分で並べて管理する</strong>か、<strong>その存在ごと任せる</strong>かを別に選べます。後者(<Term>Fargate</Term>のような形)を選ぶと、台数も更新も空き容量の詰め込みも考えなくてよくなり、<Link href="/infra/aws-lambda">Lambda</Link>に近い感覚でコンテナを扱えます。
      </p>
      <p>
        代わりに単価は上がります。自分でサーバーを並べれば、1台に複数のコンテナを詰め込んで無駄を削れますが、任せる形では<strong>コンテナごとに割り当てた分を払う</strong>ことになるためです。稼働率が高く台数の多い基盤では自分で持つほうが安く、変動が大きく台数が少ないうちは任せるほうが総額で安くなります ― <strong>機械の値段だけでなく、人の時間も勘定に入れて</strong>比べます。
      </p>

      <Heading num="04">イメージの置き場所</Heading>
      <p>
        コンテナを動かすには、イメージを取ってくる先が要ります。<Term>ECR</Term>はそのための非公開のレジストリで、タスク定義やマニフェストはここを参照します。
      </p>
      <p>
        運用上の要点は3つです。<strong>タグの付け方</strong>(<code>latest</code> を本番で参照すると、何が動いているか分からなくなります ― コミットのハッシュなど一意な値を使う)、<strong>脆弱性の検査</strong>(登録時に自動で走らせる)、<strong>古い世代の削除</strong>(放置するとストレージ費用として積み上がります)。どれも<Link href="/infra/container-security">コンテナセキュリティ</Link>と<Link href="/infra/ops">コスト管理</Link>で扱う話が、そのままここに現れたものです。
      </p>

      <Aside label="タグを固定しないと、戻せない">
        <code>latest</code> を参照する構成では、「同じ定義なのに動くものが違う」という状態が起きます。障害時に前の版へ戻そうとしても、何が前の版だったのか分かりません。<Link href="/infra/deploy">戻せる形</Link>にしておくとは、コンテナの世界では<strong>イメージのタグを一意にしておくこと</strong>です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        コンテナは輸送用の箱、オーケストレーターは配送センターです。独自の仕組みは自社専用の配送センター、Kubernetesは業界規格に合わせたセンター。そして土台を任せるというのは、<strong>トラックの手配ごとセンターに委ねる</strong>ことです。箱の中身(アプリ)は、どのセンターを選んでも変わりません。
      </Analogy>

      <Heading num="まとめ">掛け合わせで選ぶ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>束ねる仕組みは可搬性の話</h4>
          <p>持ち出す予定が無いなら、語彙の少ない独自の仕組みのほうが速い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>土台は稼働率の話</h4>
          <p>詰め込めるほど自前が安く、変動が大きく少台数なら任せるほうが総額で安い。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>イメージは一意なタグで</h4>
          <p>参照が動くと、何が本番で動いているか分からなくなり、戻す手段も失われる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-container" />
    </DocsPage>
  );
}
