import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "データベース" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>データベース ― 用途で分ける</h1>
        <Lead>
          選択肢が多く見える分野ですが、判断は2つの問いで済みます ― <Term>表と関係で扱うか</Term>、そして<Term>画面に出すためか、集計するためか</Term>。この2つで4つに分かれ、残りは規模の話です。<Link href="/infra/aws-database">AWS</Link>と違って目立つのは、<strong>分析用の基盤が最初から選択肢に並んでいる</strong>ことで、「同じデータを画面用と分析用の両方へ流す」構成が組みやすくなっています。
        </Lead>
      </Hero>

      <Heading num="01">選び分けの地図</Heading>

      <DiagramFrame
        slug="infra-gcp-database-choice"
        aspect="760 / 300"
        caption="データの置き場所を用途で選び分ける図。まず表と関係で扱うデータかを問い、そうであれば通常の規模はマネージドなリレーショナルデータベースを選び、地理をまたいで一貫性を保ったまま極端に伸ばす必要があるときだけ分散型を検討する。そうでなければ、アプリから直接読み書きする文書型か、大量の記録をまとめて集計する分析用かに分かれる。同じデータを両方へ流すことも珍しくない。"
      />

      <Heading num="02">画面のためのデータベース</Heading>
      <p>
        利用者の操作に応答する用途では、<strong>低遅延で、少量を正確に読む</strong>ことが求められます。リレーショナル型が既定で、必要な整合性(<Link href="/database/transaction">トランザクション</Link>)がそのまま使えます。文書型は、階層のあるデータをそのまま入れられて水平に伸びやすい一方、<Link href="/infra/aws-database">取り出し方を先に決める</Link>設計が要ります。
      </p>
      <p>
        規模が本当に必要になったときだけ、地理をまたいで一貫性を保つ分散型を検討します。単価も設計の制約も上がるので、<strong>普通のデータベースで捌けなくなってから</strong>で遅くありません。
      </p>

      <Heading num="03">集計のためのデータベース</Heading>
      <p>
        大量の記録をまとめて読む用途は、要求が根本的に違います ― 1件の応答速度ではなく、<strong>数億件を数十秒で走査できるか</strong>。この用途に画面用のデータベースを使うと、集計の重いクエリが本番の応答を巻き添えにします。
      </p>
      <p>
        だから<strong>分けます</strong>。画面用のデータベースの内容を分析用へ流し、集計はそちらで行う。分ける費用より、巻き添えを避ける価値のほうが大きいのが普通です。この分離は<Link href="/design/architecture-app-cqrs">読み書きの分離</Link>と同じ発想で、インフラの層で実現したものだと捉えられます。
      </p>

      <Aside label="分析用は、料金の形が違う">
        分析用の基盤は<strong>読み取ったデータ量で課金される</strong>形が一般的です。うっかり全期間を対象にした集計を繰り返すと、費用が跳ねます。期間で区切る、必要な列だけ読む、結果を保存して使い回す ― この3つが実務での基本です。
      </Aside>

      <Heading num="まとめ">2つの問いで足りる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>表と関係か</h4><p>そうならリレーショナル。規模の心配は、実際に困ってからでよい。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>画面用か、集計用か</h4><p>要求が根本的に違う。同じ場所でやると、集計が本番を巻き添えにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>分析用は読んだ量で課金</h4><p>期間で区切り、列を絞り、結果を使い回す。設計がそのまま費用になる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-database" />
    </DocsPage>
  );
}
