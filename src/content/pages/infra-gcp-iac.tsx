import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "IaC" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>IaC ― コードと、状態と、現物</h1>
        <Lead>
          画面で作らずコードで書く理由は<Link href="/infra/aws-iac">AWS</Link>と同じです ― 同じものを作り直せること、差分が見えること、履歴が残ること。ここでは、事業者をまたいで使える道具を選んだときに必ず向き合うことになる<Term>状態の管理</Term>を扱います。コードだけでは足りず、<strong>前回何を作ったか</strong>という記録が要る ― この3つ目の存在が、運用の勘所を生みます。
        </Lead>
      </Hero>

      <Heading num="01">3つを突き合わせる</Heading>

      <DiagramFrame
        slug="infra-gcp-iac-state"
        aspect="760 / 280"
        caption="構成をコードで管理する道具が3つのものを突き合わせて動くことを示した図。自分が書いたコード、前回適用した結果を記録した状態、そして実際にクラウド上に存在している現物である。適用の前にこの3つを比較して、何を作り何を変え何を消すかという計画が示され、人はそれを読んでから実行を決める。状態が壊れたり現物を手で変えたりすると3つの一致が崩れ、意図しない削除が計画に現れる。"
      />

      <p>
        実行前に<strong>計画を読む</strong>という手順が、この方式のいちばんの安全装置です。「変更するだけのつもりが、作り直し(=削除して再作成)になっている」といった危険な計画を、適用前に止められます。<strong>計画を読まずに適用する運用になったら、その時点で安全装置は外れています</strong>。
      </p>

      <Heading num="02">状態をどこに置くか</Heading>
      <p>
        状態の記録は、<strong>共有できる場所</strong>に置き、<strong>同時に書き換えられないようにします</strong>。手元のファイルに置いたままだと、複数人が別々の状態を持ち、現物との対応が壊れます。オブジェクトストレージに置いて排他制御を有効にするのが定番です。
      </p>
      <p>
        あわせて、状態の記録には<strong>秘密の値が含まれることがあります</strong>。だから状態の保存先は、コードのリポジトリではなく、権限を絞った保存先に置きます。
      </p>

      <Heading num="03">ずれを作らない運用</Heading>
      <p>
        緊急対応で画面から手を入れると、コードとの差が残ります。次の適用でその変更が消え、同じ障害が再発する ― <Link href="/infra/aws-iac">よくある事故</Link>です。対策は技術ではなく合意で、<strong>手で変えたら、その日のうちにコードへ戻す</strong>。
      </p>
      <p>
        構造として防ぐなら、<strong>人が本番を直接変更できる権限を持たない</strong>形にします。変更はすべてコードとレビューを経由する ― 厳しく見えますが、これができている組織では構成のずれという問題自体が発生しません。
      </p>

      <Aside label="何から書き始めるか">
        全部を一度にコード化しようとすると止まります。<strong>新しく作るものから</strong>始め、既存のものは変更の機会に取り込む。優先するのは、作り直す可能性が高いものと、複数の環境で同じものが要るもの ― ネットワーク、権限、監視の設定です。
      </Aside>

      <Heading num="まとめ">3つの一致を保つ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>適用前に計画を読む</h4><p>削除と再作成を見つけられる唯一の機会。読まないなら安全装置は無い。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>状態は共有して排他する</h4><p>手元に置くと対応が壊れる。秘密が含まれる前提で置き場所を選ぶ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>手で変えたら戻す</h4><p>構造として防ぐなら、人が直接変更できないようにする。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-iac" />
    </DocsPage>
  );
}
