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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "現代の原則",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>現代の原則 ― 早期発見と、現代的な実践</h1>
        <Lead>
          2000年代以降、並行処理や大規模化するシステムへの対応として定着した5つの原則です。<Term>不変性を優先する</Term>は<Link href="/design/paradigm-functional">関数型プログラミング</Link>の普及と、<Term>継承より合成</Term>はオブジェクト指向の実践の中での反省と、それぞれ連動しています。
        </Lead>
      </Hero>

      <Heading num="01">5つの原則</Heading>
      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>原則</th>
            <th>なぜ生まれたか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">2003頃</td>
            <td>Fail Fast</td>
            <td>問題を早期発見し、障害の原因を特定しやすくするため</td>
          </tr>
          <tr>
            <td className="hl">2009頃</td>
            <td>継承より合成</td>
            <td>継承階層が複雑になりすぎる問題を防ぐため</td>
          </tr>
          <tr>
            <td className="hl">2010年代</td>
            <td>不変性を優先する</td>
            <td>並行処理や副作用によるバグを減らすため</td>
          </tr>
          <tr>
            <td className="hl">2010年代</td>
            <td>信頼できる唯一の情報源(SSOT)</td>
            <td>同じデータが複数箇所に存在して矛盾する問題を防ぐため</td>
          </tr>
          <tr>
            <td className="hl">2010年代</td>
            <td>明示は暗黙に勝る</td>
            <td>暗黙の挙動による理解・保守の難しさを減らすため</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">Fail Fast ― 問題を早期に、大きな音で知らせる</Heading>
      <p>
        異常な状態を検知したら、その場ですぐに失敗させて処理を止める考え方です。エラーを握りつぶして処理を継続させると、後になって別の場所で予期しない不具合として表面化し、原因の特定が難しくなります。
      </p>

      <DiagramFrame
        slug="design-principles-modern-failfast"
        aspect="660 / 280"
        caption="Fail Fastの効果を示した図。上段はエラーを握りつぶす場合で、入力の検証で異常を見逃したまま処理が進み、3つ先の集計処理でようやくおかしな数字として気づくため、原因と発覚場所が離れて調査が難しくなる。下段はFail Fastの場合で、入力の検証の時点で即座に失敗させるため、原因と失敗した場所が一致する。"
      />

      <Heading num="03">継承より合成 ― 部品を組み合わせる</Heading>
      <p>
        機能の再利用を「親クラスを継承する」のではなく「小さなオブジェクトを組み合わせる」ことで実現しようという原則です。継承階層が深くなると、親クラスの変更がすべての子クラスへ波及しやすく、柔軟性も失われます。合成であれば、実行時に部品を差し替えることもできます。<Link href="/design/patterns-gof-structure">Decorator</Link>や<Link href="/design/patterns-gof-algorithms">Strategy</Link>は、この原則を形にしたパターンです。
      </p>

      <Heading num="04">不変性を優先する ― 一度作ったら変えない</Heading>
      <p>
        オブジェクトやデータを作成後に変更不可(<Term>イミュータブル</Term>)にする考え方です。可変な状態は「いつ・どこで書き換えられたか」を追うのが難しく、並行処理では競合状態の温床にもなります。変更が必要な場合は、元のデータを書き換えるのではなく新しいデータを作って返します。詳しくは<Link href="/design/paradigm-functional-foundations">純粋関数とイミュータビリティ</Link>で扱います。
      </p>

      <Heading num="05">信頼できる唯一の情報源 ― 置き場所を1つにする</Heading>
      <p>
        <Term>SSOT(Single Source of Truth)</Term>は、同じデータを複数の場所にコピーして持たず、常に1箇所の「正」となるデータソースを参照する考え方です。コピーがあると、片方だけ更新されて矛盾が生じます。コードでも、同じ定数を2箇所に書かない・同じ状態を2つの変数で持たない、といった形で日常的に効いてきます。
      </p>

      <Heading num="06">明示は暗黙に勝る ― 挙動を推測させない</Heading>
      <p>
        Pythonの設計哲学(The Zen of Python)に由来する原則で、コードの挙動をコードから読み取れる形で明示し、暗黙の変換や暗黙のルールに頼らないという考え方です。暗黙の挙動は書くときは楽ですが、後から読む人がその挙動を推測しなければならず、理解と保守のコストを上げます。
      </p>

      <Analogy label="💡 たとえるなら">
        Fail Fastは「異常に気づいたらその場で警報を鳴らす」こと、継承より合成は「万能ロボットを1つ作るのではなく、交換可能な部品を組み合わせる」こと、不変性を優先するは「一度発行した契約書は書き換えず、変更があれば新しい契約書を出す」こと、SSOTは「同じ台帳のコピーを何冊も作らず、原本を1冊だけ管理する」こと、明示は暗黙に勝るは「阿吽の呼吸に頼らず、手順書に書いてあることだけをやる」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Fail Fast</h4>
          <p>異常を検知したらその場で失敗させ、原因と発覚場所を一致させる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>継承より合成</h4>
          <p>継承階層ではなく、小さな部品の組み合わせで機能を再利用する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>不変性・SSOT・明示</h4>
          <p>書き換えを絞り、正を1つにし、推測させない。どれも追跡可能性の話。</p>
        </Card>
      </CardGrid>

      <p>
        エラーをどう検知し、どう伝え、どう回復するかという設計そのものは<Link href="/design/errors">エラー設計</Link>で、原則を実際の構造へ落とし込む話は<Link href="/design/architecture">アーキテクチャ</Link>で扱います。
      </p>

      <DocsFooter href="/design/principles-modern" />
    </DocsPage>
  );
}
