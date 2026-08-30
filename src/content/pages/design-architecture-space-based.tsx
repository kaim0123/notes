import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "スペースベースアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>スペースベースアーキテクチャ ― データベースをボトルネックにしない</h1>
        <Lead>
          チケット即完売のように一瞬で大量アクセスが集中する場面では、データベースへの読み書きそのものがボトルネックになり、システム全体がスケールしなくなります。<Term>スペースベースアーキテクチャ</Term>は、データをメモリ上の分散グリッドに置くことで、データベースへの直接アクセスを避けようとする発想です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        アクセスが集中すると、いくらアプリケーションサーバーを増やしても、最終的にはすべてのリクエストが1つのデータベースに集中します。データベースの増強にも限界があるため、そもそもデータベースへのアクセス自体を減らしたい、というのが出発点です。
      </p>

      <Heading num="02">処理ユニットと仮想化ミドルウェア</Heading>
      <p>
        基本単位は<Term>処理ユニット</Term>です。アプリケーションのロジックと、その場で必要なデータのインメモリキャッシュを1つに束ねたもので、これを何個も並列に起動します。処理ユニット同士の連携は<Term>仮想化ミドルウェア</Term>が担います。
      </p>

      <DiagramFrame
        slug="design-architecture-space-based-units"
        aspect="680 / 300"
        caption="スペースベースアーキテクチャの構成。大量のリクエストをメッセージンググリッドが複数の処理ユニットへ振り分ける。各処理ユニットはロジックとインメモリキャッシュを束ねており、データベースを見ずに応答を返す。処理ユニット間はデータグリッドで同期され、データポンプがメモリ上の変更を非同期でデータベースへ書き込む。応答は書き込み完了を待たない。"
      />

      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メッセージンググリッド</td><td>受け取ったリクエストを、空いている処理ユニットへ振り分ける</td></tr>
          <tr><td className="hl">データグリッド</td><td>処理ユニット間でメモリ上のデータのコピーを同期し、一貫性を保つ</td></tr>
          <tr><td className="hl">処理グリッド</td><td>複数の処理ユニットにまたがる処理が必要な場合の調整を担う(任意)</td></tr>
          <tr><td className="hl">デプロイメントマネージャー</td><td>負荷に応じて処理ユニットの数を動的に増減させる</td></tr>
        </tbody>
      </table>

      <Heading num="03">データポンプ ― 永続化は後追いで</Heading>
      <p>
        メモリ上のデータは、いずれ永続化しなければ消えてしまいます。そこで<Term>データライター</Term>がメモリ上の変更を非同期でデータベースへ書き込み、<Term>データリーダー</Term>が起動時などにデータベースからメモリへ読み込みます。この一連の非同期な同期処理の仕組みを<Term>データポンプ</Term>と呼びます。要点は、リクエストへの応答自体はデータベースの書き込み完了を待たずに返せることです。
      </p>

      <Analogy label="💡 たとえるなら">
        一瞬だけ客が殺到するお祭りの屋台をイメージしてください。屋台(処理ユニット)は自分の手元の在庫(メモリ上のデータ)だけを見て即座に売買を成立させ、後で本部の帳簿(データベース)にまとめて反映します。売買のたびに本部へ問い合わせていたら、行列は捌ききれません。
      </Analogy>

      <Heading num="04">向き不向き</Heading>
      <p>
        高いスケーラビリティを実現できますが、メモリ上のデータの整合性管理や、データベースへの反映タイミングのずれ(結果整合性)を扱う複雑さと引き換えです。「一瞬の集中に耐える」という要件が本当にあるかを見極めてから採るべきスタイルです。結果整合性そのものの考え方は<Link href="/database/distributed-transactions">分散トランザクション</Link>で扱っています。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>処理ユニットに閉じる</h4><p>ロジックとメモリ上のデータを束ね、DBへの直接アクセスを避ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>仮想化ミドルウェアが調整</h4><p>振り分け・データ同期・スケーリングを共通基盤が担う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>永続化は非同期・後追い</h4><p>データポンプを介して、応答を止めずにデータベースへ反映する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-space-based" />
    </DocsPage>
  );
}
