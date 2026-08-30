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
  title: "パイプラインアーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 1970年代後半</Eyebrow>
        <h1>パイプラインアーキテクチャ ― データを一方向に流す</h1>
        <Lead>
          前のページ「<Link href="/design/architecture/sys/layered">レイヤードアーキテクチャ</Link>」が責務を階層で分けたのに対し、<Term>パイプラインアーキテクチャ</Term>は、データの変換処理を一方向の流れとして分割します。1970年代後半、コンパイラのようにデータを何段階にも加工していく処理を、再利用可能な部品の組み合わせにしたいという要求から生まれました。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>データを何段階にも変換する処理(コンパイラの構文解析、ETL処理など)を1つの巨大な関数で書いてしまうと、途中の1段階だけを差し替えたい・再利用したいときに手が出せません。処理を独立した部品に分け、好きな順番で組み合わせられるようにしたいというのが出発点です。</p>

      <Heading num="02">フィルターとパイプ</Heading>
      <p>パイプラインアーキテクチャは<Term>フィルター</Term>と<Term>パイプ</Term>という2つの部品だけで構成されます。フィルターは1つの変換処理だけを担当する独立した部品で、パイプはフィルター同士を繋ぐ一方向の経路です。フィルターには4種類の役割があります。</p>

      <table>
        <thead>
          <tr><th>フィルターの種類</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロデューサーフィルター</td><td>パイプラインの起点。データを生成・取得する</td></tr>
          <tr><td className="hl">トランスフォーマーフィルター</td><td>受け取ったデータを加工して次に渡す</td></tr>
          <tr><td className="hl">テスター(判定)フィルター</td><td>条件に応じてデータを通す/止める・分岐させる</td></tr>
          <tr><td className="hl">コンシューマーフィルター</td><td>パイプラインの終点。最終結果を保存・出力する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        UNIXのシェルでおなじみの<code>cat file | grep error | sort | uniq</code>がまさにパイプラインです。「読む」「絞り込む」「並べ替える」「重複を消す」という独立したコマンド(フィルター)を、<code>|</code>(パイプ)で繋いでいるだけで、それぞれのコマンドは他のコマンドの中身を知りません。コンパイラの「字句解析 → 構文解析 → 最適化 → コード生成」という流れも同じ発想です。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>各フィルターが独立しているため、部品単位でのテスト・再利用・並び替えがしやすいのが利点です。一方で、フィルター間はデータを順番に受け渡すだけの一方向の流れなので、複雑な分岐や、複数のフィルターが互いにやり取りするような処理には向きません。データ変換が主目的のバッチ処理・ETL・コンパイラ・画像処理パイプラインなどでよく使われます。</p>

      <p>次のページでは、本体の機能を最小限にして拡張機能を後から差し込む<Link href="/design/architecture/sys/microkernel">マイクロカーネルアーキテクチャ</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>フィルターは単機能</h4><p>1つの変換だけを担当する独立部品として実装する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>パイプは一方向の経路</h4><p>フィルター同士を繋ぐだけで、互いの中身には関与しない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>データ変換の連鎖に強い</h4><p>コンパイラ・ETL・バッチ処理など、段階的な加工が主目的の処理に向く。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/sys/layered" tag="設計">レイヤードアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microkernel" tag="設計">マイクロカーネルアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
