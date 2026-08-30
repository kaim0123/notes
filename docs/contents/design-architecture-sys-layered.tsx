import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "レイヤードアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 1970年代</Eyebrow>
        <h1>レイヤードアーキテクチャ ― 責務を階層で分ける</h1>
        <Lead>
          ここからは、<Term>ソフトウェアアーキテクチャ</Term>(システム全体をどう組み立てるか)のスタイルを、登場した時代の順番に見ていきます。最初の<Term>レイヤードアーキテクチャ</Term>は1970年代に生まれた、最も古典的なスタイルです。
        </Lead>
      </Hero>

      <p>ここまで見てきた「<Link href="/design/paradigm">パラダイム</Link>」が1つの関数・クラスの中の書き方だとすると、アーキテクチャはプログラム全体を「どういう単位に分け、どう繋げるか」の話です。当時、画面表示・業務処理・データベース操作が1つのプログラムの中に混在し、どこを直しても他の部分に影響が及ぶという問題がありました。</p>

      <Heading num="01">解決したかった問題</Heading>
      <p>UI(画面)・業務ロジック・DB処理が同じ場所に書かれていると、画面のデザインを変えただけのつもりが業務ロジックまで壊れる、といった事故が起きやすくなります。責務ごとにコードを分離し、変更の影響範囲を狭めたいというのが出発点でした。</p>

      <Heading num="02">レイヤーの分離</Heading>
      <p>レイヤードアーキテクチャでは、システムを役割ごとの水平な層(レイヤー)に分割します。典型的には次のような構成です。</p>

      <table>
        <thead>
          <tr><th>レイヤー</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プレゼンテーション層</td><td>画面表示、ユーザー入力の受け取り</td></tr>
          <tr><td className="hl">ビジネス層</td><td>業務ルール・計算・判断</td></tr>
          <tr><td className="hl">永続化層</td><td>データの読み書きの窓口</td></tr>
          <tr><td className="hl">データベース層</td><td>実際のデータの保管</td></tr>
        </tbody>
      </table>

      <p>各レイヤーは基本的に<Term>隣接するレイヤーとしか話さない</Term>という制約(閉じたレイヤー)を置きます。これにより、例えばプレゼンテーション層はビジネス層の裏でデータベースが何であるかを知る必要がなくなり、変更の影響が層をまたいで広がりにくくなります。</p>

      <Heading num="03">レイヤーの追加</Heading>
      <p>新しい横断的な関心事(例えばキャッシュや認可のチェック)が出てきた場合、既存のレイヤーを書き換える代わりに、新しいレイヤーを1枚追加して差し込むことができます。ただし特定の状況で下位のレイヤーへ直接アクセスすることを許す(開いたレイヤー)場合もあり、その設計判断がレイヤー数や柔軟性を左右します。</p>

      <Analogy label="💡 たとえるなら">
        レイヤードアーキテクチャは、ビルの各フロアのようなものです。1階の入居者(プレゼンテーション層)は3階の配管がどうなっているか(データベース層)を知らなくても生活できます。フロアごとに独立して改装できるのは、フロア間の境界(配管シャフトなどの決まった接続点)がはっきりしているからです。
      </Analogy>

      <p>レイヤードアーキテクチャは今もWebアプリの基本形として広く使われますが、レイヤーを機械的に何往復も経由するだけの「素通りレイヤー」が増えると、かえって冗長になるという弱点もあります。次のページでは、データを一方向に流していく<Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>責務ごとの水平分割</h4><p>UI・業務・永続化を別々のレイヤーに分け、変更の影響範囲を狭める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>隣接レイヤーとだけ通信</h4><p>層をまたいだ直接依存を避け、内部の実装を隠蔽する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>レイヤーの追加で拡張</h4><p>既存レイヤーを壊さず、新しい関心事を1枚のレイヤーとして差し込める。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/pipeline" tag="設計">パイプラインアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
