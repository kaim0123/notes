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

export const metadata: Metadata = { title: "IaC" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>IaC ― 画面で作らない</h1>
        <Lead>
          管理画面をクリックして作った構成は、<strong>同じものを二度と作れません</strong>。何を選んだか、どの順で設定したかは記憶の中にしか残らず、障害で作り直すときも、2つ目の環境を用意するときも、勘に頼ることになります。<Term>構成をコードとして書く</Term>という発想は、この一点を解きます。副産物として、変更が差分として見え、レビューでき、履歴が残り、元に戻せるようになります ― <Link href="/dev/git-basics">Git</Link>がコードにもたらしたものが、そのままインフラにも来ます。
        </Lead>
      </Hero>

      <Heading num="01">宣言して、寄せてもらう</Heading>
      <p>
        書き方の基本は<strong>手順ではなく、あるべき姿</strong>です。「サーバーを作れ」ではなく「この構成のサーバーが2台ある状態」と書き、現状との差分は仕組みが埋めます。<Link href="/infra/kubernetes">Kubernetes</Link>で見た調整の考え方と同じで、<strong>何度実行しても同じ結果になる</strong>という性質がここから生まれます。
      </p>
      <p>
        実行前に<strong>差分を確認できる</strong>のも重要な性質です。「この変更で何が作られ、何が消えるか」を適用前に見られるので、消してはいけないものが消える計画になっていないかを、実行前に止められます。
      </p>

      <Heading num="02">抽象度を選ぶ</Heading>

      <DiagramFrame
        slug="infra-aws-iac-abstraction"
        aspect="760 / 300"
        caption="インフラをコードで書くときの抽象度の階段。いちばん下は事業者の定義と1対1で対応する層で、全項目を指定する代わりにできることは事業者の機能そのもの。中間はよく使う構成をまとめた層で、既定値があるので短く書け、安全側の設定が最初から入っている。いちばん上は用途ごとの型で、一式をまとめて組み立てられる。上の層ほど書く量は減るが、細かい調整のために下の層へ降りられることが条件になる。"
      />

      <p>
        実務での勘所は、<strong>降りられるかどうか</strong>です。抽象度の高い書き方は短く安全ですが、既定値が要件に合わないときに<strong>下の層へ降りて個別に上書きできる</strong>設計になっていなければ、いずれ抽象そのものを捨てることになります。道具を選ぶときは、この「逃げ道」の有無を確かめます。
      </p>

      <Heading num="03">状態をどこに置くか</Heading>
      <p>
        構成のコードは、<strong>実際に何を作ったか</strong>という状態と対で管理されます。この状態が壊れたり、複数人が同時に書き換えたりすると、実物とコードの対応が崩れます。事業者が状態を持つ方式なら意識せずに済みますが、自分で管理する方式では<strong>状態の保存先と排他制御</strong>を最初に決めます。
      </p>

      <Aside label="手で変えたものが、ずれを生む">
        コード管理を導入しても、緊急対応で画面から手を入れると、その差分がコードに戻らないまま残ります。次の適用でその変更が消え、同じ障害が再発する ― よくある事故です。<strong>手で変えたら、その日のうちにコードへ戻す</strong>という運用の合意まで含めて初めて仕組みになります。
      </Aside>

      <Heading num="04">何から始めるか</Heading>
      <p>
        既存の環境を一気に全部コード化しようとすると、たいてい途中で止まります。順序としては、<strong>新しく作るものから</strong>コードで書き始め、既存のものは変更の機会が来たときに取り込むのが現実的です。
      </p>
      <p>
        優先すべきは<strong>作り直す可能性が高いもの</strong>と<strong>複数の環境で同じものが要るもの</strong> ― ネットワーク構成、権限の定義、監視の設定。逆に、一度作ってほとんど触らないものは後回しでかまいません。目的は網羅ではなく、<strong>作り直せる状態にすること</strong>です。
      </p>

      <Analogy label="💡 たとえるなら">
        画面での構築は口頭での指示、コードでの構築は図面です。1回作るだけなら口頭で足りますが、同じものをもう1棟建てるとき、災害で建て直すとき、他の人に引き継ぐときに、図面の有無が決定的な差になります。そして図面には、<strong>後から誰でも変更点を読める</strong>という利点もあります。
      </Analogy>

      <Heading num="まとめ">作り直せる状態を作る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>宣言して、差分を見る</h4>
          <p>手順ではなくあるべき姿を書く。適用前に何が消えるかを確認できる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>降りられる抽象を選ぶ</h4>
          <p>短く書ける層から始め、要件が外れたら下の層へ。降りられない抽象は捨てることになる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>手で変えたら戻す</h4>
          <p>ずれを放置すると、次の適用で消える。運用の合意まで含めて初めて仕組みになる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-iac" />
    </DocsPage>
  );
}
