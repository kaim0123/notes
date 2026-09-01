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

export const metadata: Metadata = { title: "SQS" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>SQS ― 落ちても失われない受け皿</h1>
        <Lead>
          <Link href="/infra/aws-integration">アプリケーション統合</Link>で見た3つの形のうち、<Term>溜める</Term>役割を担うのがキューです。解決するのは単純な問題 ― <strong>送る側と受け取る側で処理できる速さが違う</strong>こと。そして副産物として、受け手が落ちても仕事が失われなくなります。仕組みの要は2つ、<Term>取りに行く形</Term>であることと、<Term>処理中は隠される</Term>ことです。
        </Lead>
      </Hero>

      <Heading num="01">取りに行く形の意味</Heading>
      <p>
        キューは受け手に送りつけません。受け手が自分の都合で取りに行きます。この向きだから、<strong>受け手は自分が処理できる分だけ受け取れます</strong>。送る側が急に増えても、受け手が押し潰されることはなく、キューに溜まるだけです。
      </p>
      <p>
        <Link href="/backend/ops-rate-limit">レート制限</Link>が「断ることで守る」仕組みだとすれば、キューは「預かることで守る」仕組みです。どちらも下流を守りますが、キューは<strong>断らずに済む</strong>ぶん、利用者から見た体験が変わります ― 受け付けだけ先に返し、処理は後で行う形にできます。
      </p>

      <Heading num="02">処理中は隠される</Heading>

      <DiagramFrame
        slug="infra-aws-sqs-visibility"
        aspect="760 / 300"
        caption="取り出したメッセージが処理中は他から見えなくなる仕組み。受け手が取り出すとそのメッセージは一定時間だけ隠され、他の受け手には配られない。時間内に削除できれば完了し、削除されなければ処理に失敗したと見なされて再び見えるようになり、別の受け手へ配られる。同じものが何度も戻ってくるとキュー全体が進まなくなるため、決めた回数を超えたものは退避用の別のキューへ送る。隠す時間は処理にかかる時間より長く設定する。"
      />

      <p>
        この仕組みのおかげで、<strong>受け手が処理の途中で落ちても、メッセージは失われません</strong>。時間が過ぎれば再び見えるようになり、別の受け手が拾います。逆に言えば、隠す時間を処理時間より短く設定すると、<strong>まだ処理中なのにもう一度配られます</strong> ― 二重実行の典型的な原因です。
      </p>

      <Aside label="二度届く前提で作る">
        キューの保証は「少なくとも一度は届く」であって「ちょうど一度」ではありません。だから処理は、同じ入力で二度実行しても結果が変わらない形にします ― 処理済みのIDを記録して弾く、更新を条件付きにする。この考え方は<Link href="/backend/jobs">非同期処理とジョブ</Link>と共通です。
      </Aside>

      <Heading num="03">順序と重複、どちらを取るか</Heading>
      <table>
        <thead>
          <tr><th></th><th>標準のキュー</th><th>順序を保つキュー</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順序</td><td>保証されない</td><td>指定した単位の中で保たれる</td></tr>
          <tr><td className="hl">重複</td><td>まれに二度届く</td><td>一定時間内の重複は排除される</td></tr>
          <tr><td className="hl">処理量</td><td>実質的に上限なし</td><td>上限がある</td></tr>
        </tbody>
      </table>
      <p>
        原則は<strong>標準のキューを使い、順序に依存しない処理にする</strong>ことです。順序が本当に必要なのは、同じ対象への操作が続く場合に限られます ― その場合も、順序を保つ単位を「利用者ごと」「注文ごと」のように狭く取れば、処理量の制約を受けにくくなります。
      </p>

      <Heading num="04">詰まったときの逃がし方</Heading>
      <p>
        処理できないメッセージが1通あると、それが何度も再配達され、<strong>後続の処理まで滞ります</strong>。だから決めた回数を超えたものは、退避用の別のキューへ送ります。ここに溜まったものを見れば、失敗した内容だけを調べられます。
      </p>
      <p>
        運用としては、<strong>退避先の件数を監視して、増えたら鳴らす</strong>のが定石です。ここが増えているということは、処理できない何かが起き続けているということなので、優先度の高い異常として扱えます(<Link href="/infra/monitoring">監視と障害対応</Link>)。
      </p>

      <Heading num="まとめ">預かることで守る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>取りに行く形が下流を守る</h4>
          <p>受け手は処理できる分だけ受け取る。急な増加はキューに溜まるだけで済む。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>隠す時間は処理時間より長く</h4>
          <p>短いと、処理中にもう一度配られる。二重実行の典型的な原因になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>退避先を監視する</h4>
          <p>詰まりを逃がすだけでなく、そこが増えたことを異常として扱う。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-sqs" />
    </DocsPage>
  );
}
