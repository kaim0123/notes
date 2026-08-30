import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "パイプラインアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>パイプラインアーキテクチャ ― データを一方向に流す</h1>
        <Lead>
          <Link href="/design/architecture-layered">レイヤードアーキテクチャ</Link>が責務を階層で分けたのに対し、<Term>パイプラインアーキテクチャ</Term>はデータの変換処理を一方向の流れとして分割します。1970年代後半、コンパイラのようにデータを何段階にも加工していく処理を、再利用可能な部品の組み合わせにしたいという要求から生まれました。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        データを何段階にも変換する処理(コンパイラの構文解析、ETL処理など)を1つの巨大な関数で書くと、途中の1段階だけを差し替えたい・再利用したいときに手が出せません。処理を独立した部品に分け、好きな順番で組み合わせられるようにしたいというのが出発点です。
      </p>

      <Heading num="02">フィルターとパイプ</Heading>
      <p>
        構成要素は<Term>フィルター</Term>と<Term>パイプ</Term>の2つだけです。フィルターは1つの変換処理だけを担当する独立した部品、パイプはフィルター同士をつなぐ一方向の経路です。
      </p>

      <DiagramFrame
        slug="design-architecture-pipeline-filters"
        aspect="700 / 250"
        caption="パイプラインアーキテクチャの構成。プロデューサー(データを取得する)、テスター(通すか止めるか判定する)、トランスフォーマー(受け取った値を加工する)、コンシューマー(保存・出力する)が一方向のパイプで数珠つなぎになる。各フィルターは隣が何をしているかを知らないため、単体でテストでき、差し替えも並び替えもできる。"
      />

      <table>
        <thead>
          <tr><th>フィルターの種類</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロデューサー</td><td>パイプラインの起点。データを生成・取得する</td></tr>
          <tr><td className="hl">トランスフォーマー</td><td>受け取ったデータを加工して次へ渡す</td></tr>
          <tr><td className="hl">テスター</td><td>条件に応じてデータを通す・止める・分岐させる</td></tr>
          <tr><td className="hl">コンシューマー</td><td>パイプラインの終点。最終結果を保存・出力する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        UNIXのシェルでおなじみの<code>cat file | grep error | sort | uniq</code>がまさにパイプラインです。読む・絞り込む・並べ替える・重複を消すという独立したコマンドをパイプでつないでいるだけで、それぞれのコマンドは他のコマンドの中身を知りません。<Link href="/design/paradigm-functional-composition">関数合成</Link>も、同じ発想を関数の粒度で行ったものです。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>
        各フィルターが独立しているため、部品単位でのテスト・再利用・並び替えがしやすいのが利点です。一方で、データを順番に受け渡すだけの一方向の流れなので、複雑な分岐や、複数のフィルターが互いにやり取りするような処理には向きません。データ変換が主目的のバッチ処理・ETL・コンパイラ・画像処理などでよく使われます。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>フィルターは単機能</h4><p>1つの変換だけを担当する独立部品として実装する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>パイプは一方向</h4><p>フィルター同士をつなぐだけで、互いの中身には関与しない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>データ変換の連鎖に強い</h4><p>段階的な加工が主目的の処理に向き、複雑な分岐には向かない。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-pipeline" />
    </DocsPage>
  );
}
