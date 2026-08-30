import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "レイヤードアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>レイヤードアーキテクチャ ― 責務を階層で分ける</h1>
        <Lead>
          1970年代に生まれた、システムアーキテクチャの中で最も古典的なスタイルです。当時は画面表示・業務処理・データベース操作が1つのプログラムに混在し、どこを直しても他へ影響が及ぶという問題がありました。<Term>レイヤードアーキテクチャ</Term>は、責務ごとの水平な層に分けることでこれに答えます。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        UI・業務ロジック・DB処理が同じ場所に書かれていると、画面のデザインを変えただけのつもりが業務ロジックまで壊れる、といった事故が起きやすくなります。責務ごとにコードを分離し、変更の影響範囲を狭めたいというのが出発点でした。
      </p>

      <Heading num="02">レイヤーの分離</Heading>
      <table>
        <thead>
          <tr><th>レイヤー</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プレゼンテーション層</td><td>画面表示、利用者の入力の受け取り</td></tr>
          <tr><td className="hl">ビジネス層</td><td>業務ルール・計算・判断</td></tr>
          <tr><td className="hl">永続化層</td><td>データの読み書きの窓口</td></tr>
          <tr><td className="hl">データベース層</td><td>実際のデータの保管</td></tr>
        </tbody>
      </table>
      <p>
        各レイヤーは基本的に<Term>隣接するレイヤーとしか話さない</Term>という制約(閉じたレイヤー)を置きます。これにより、プレゼンテーション層はビジネス層の裏でデータベースが何であるかを知る必要がなくなり、変更の影響が層をまたいで広がりにくくなります。
      </p>

      <DiagramFrame
        slug="design-architecture-layered-closed-open"
        aspect="660 / 300"
        caption="閉じたレイヤーと開いたレイヤーの違い。左の閉じたレイヤーでは、矢印は必ず隣接する層の間だけを通る。右の開いたレイヤーでは、素通りするだけの共通ロジック層を飛び越えてビジネス層から永続化層へ直接向かう矢印があり、冗長さを避けられる代わりに層をまたぐ依存が生まれる。"
      />

      <Heading num="03">レイヤーの追加と、素通りレイヤー</Heading>
      <p>
        キャッシュや認可チェックのような新しい横断的関心事が出てきた場合、既存のレイヤーを書き換える代わりに、新しいレイヤーを1枚追加して差し込めます。一方で、特定の状況で下位のレイヤーへ直接アクセスすることを許す(開いたレイヤー)場合もあり、その判断がレイヤー数と柔軟性を左右します。
      </p>
      <p>
        今もWebアプリの基本形として広く使われますが、レイヤーを機械的に何往復も経由するだけの<Term>素通りレイヤー</Term>が増えると、分けた意味より冗長さが勝ちます。層を1枚足す前に「この層は何の変更を吸収するのか」を言えるかどうかが目安になります。アプリ1つの内部に同じ発想を適用した形は<Link href="/design/architecture-app-layered">レイヤー系(アプリ)</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        ビルの各フロアのようなものです。1階の入居者は3階の配管がどうなっているかを知らなくても生活できます。フロアごとに独立して改装できるのは、フロア間の境界がはっきりしているからです。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>責務ごとの水平分割</h4><p>UI・業務・永続化を別々の層に分け、変更の影響範囲を狭める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>隣接レイヤーとだけ通信</h4><p>層をまたいだ直接依存を避け、内部の実装を隠す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>素通りレイヤーに注意</h4><p>何も吸収しない層は、冗長さだけを増やす。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-layered" />
    </DocsPage>
  );
}
