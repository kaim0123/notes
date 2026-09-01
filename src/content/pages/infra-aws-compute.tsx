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

export const metadata: Metadata = { title: "コンピューティング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンピューティング ― どこで処理を動かすか</h1>
        <Lead>
          コードを実行する場所を提供する分野です。<Term>EC2</Term>のように仮想マシンを丸ごと借りる形から、<Term>Lambda</Term>のようにサーバーの存在を意識しない形まで並びますが、違いは1本の軸に整理できます ― <strong>どこまで自分で面倒を見るか</strong>。そしてもう1つ、見落とされがちな軸があります。<strong>何に対して料金を払うか</strong>です。この2つを分けて考えると、選択がぐっと楽になります。
        </Lead>
      </Hero>

      <Heading num="01">EC2 ― 仮想マシンを借りる</Heading>
      <p>
        <Term>EC2</Term>は、データセンター上の仮想マシンを1台単位で借りるサービスです。<Link href="/infra/virtualization">ハイパーバイザー型の仮想化</Link>で切り出された1台がそのまま手元に来る、と考えると位置づけが分かります。OSもミドルウェアも自分で選び、更新も自分で当てます。
      </p>
      <p>
        自由度と引き換えに、<strong>使っていない時間にも料金が発生します</strong>。停止していれば計算資源の課金は止まりますが、割り当てたディスクや確保したアドレスは残り続けます ― <Link href="/infra/ops">コスト管理</Link>で最初に見つかる無駄はたいていここです。
      </p>

      <Heading num="02">同じ性能に、3つの値段がある</Heading>
      <p>
        EC2の料金は、性能ではなく<strong>確約の度合い</strong>で変わります。同じ機械でも、どう約束するかで単価が数分の1になります。
      </p>

      <DiagramFrame
        slug="infra-aws-compute-pricing"
        aspect="760 / 280"
        caption="仮想サーバーの3つの購入方式を、割引の大きさと中断の可能性で並べた図。使った分だけ払う方式はいつでも止められる代わりに単価が最も高い。長期の利用を約束する方式は大幅に割引されるが、その期間は使い続ける前提になる。余剰容量を借りる方式は最も安いが、事業者の都合でいつでも回収されるため、途中で止まっても困らない処理に限られる。同じ計算資源の値段を分けているのは、確約の度合いと中断への耐性。"
      />

      <p>
        判断の順序は、<strong>まず常時動かすかどうか</strong>。常時なら長期の確約で割引を取り、読めないならそのまま使い、途中で止まっても再開すればよい処理なら余剰容量を使う。学習ジョブやバッチのように<strong>中断に耐えられる設計</strong>ができていれば、費用は劇的に下がります ― つまりここは、アプリの作り方が料金に直結する数少ない場所です。
      </p>

      <Heading num="03">Lambda ― サーバーの存在を消す</Heading>
      <p>
        <Term>Lambda</Term>は、関数を置いておくとイベントが起きたときだけ実行環境が用意され、終われば消える仕組みです。<strong>起動・停止・更新という作業自体が発生せず、実行された時間と回数だけが課金対象</strong>になります。呼ばれていない間はゼロです。
      </p>
      <p>
        代わりに制約を受け入れることになります ― 実行時間の上限、起動時の遅れ、実行環境を跨いだ状態を持てないこと。詳しくは<Link href="/infra/aws-lambda">Lambda</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        EC2は1軒家の長期契約です。使い方は自由ですが、誰も住んでいない間も家賃はかかります。Lambdaは会議室を必要な時間だけ借りること。使った分だけ払い、片付けも込みですが、内装は選べません。どちらが得かは<strong>どれだけの時間そこにいるか</strong>で決まります。
      </Analogy>

      <Heading num="04">間を埋める選択肢</Heading>
      <table>
        <thead>
          <tr><th>選択肢</th><th>受け持つこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Auto Scaling</td><td>台数を負荷に応じて増減させる。EC2の自由度を保ったまま、台数の管理だけを自動にする</td></tr>
          <tr><td className="hl">コンテナ実行基盤</td><td>イメージ単位で載せ替える。土台まで任せる形なら管理範囲はLambdaに近づく(<Link href="/infra/aws-container">コンテナ</Link>)</td></tr>
          <tr><td className="hl">アプリ実行環境の自動構築</td><td>コードを上げるだけで、サーバー・ロードバランサ・スケーリングの組み合わせを用意する</td></tr>
          <tr><td className="hl">バッチ実行基盤</td><td>ジョブの待ち行列と、必要な分だけの資源確保を肩代わりする</td></tr>
        </tbody>
      </table>

      <Aside label="選ぶ順序を1つ決めておく">
        迷ったら「いちばん管理範囲が小さいところから始めて、外れる理由が出たら1段下りる」。先にEC2から入ると、更新もスケールも自分の仕事として抱え込んでから、それが要件だったのかを検証しないまま固定されがちです。逆向きに進むほうが、<strong>持たなくてよい仕事を持たずに済みます</strong>。
      </Aside>

      <Heading num="まとめ">2つの軸で選ぶ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>管理範囲の軸</h4>
          <p>OSまで持つか、コンテナで運ぶか、コードだけ置くか。持つほど自由で、持つほど仕事が増える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>課金単位の軸</h4>
          <p>時間で払うか、実行回数で払うか。稼働率が低いものほど、後者が圧倒的に安くなる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>中断耐性は値引き券</h4>
          <p>止まっても再開できる作りにできれば、余剰容量を使って費用を大きく下げられる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-compute" />
    </DocsPage>
  );
}
