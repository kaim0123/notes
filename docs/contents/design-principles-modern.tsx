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
  title: "現代の原則",
};

const rows = [
  { era: "2003頃", name: "Fail Fast", why: "問題を早期発見し、障害原因を特定しやすくするため" },
  { era: "2009頃", name: "継承より合成(Composition over Inheritance)", why: "継承階層が複雑になりすぎる問題を防ぐため" },
  { era: "2010年代", name: "不変性を優先する(Prefer Immutability)", why: "並行処理や副作用によるバグを減らすため" },
  { era: "2010年代", name: "信頼できる唯一の情報源(Single Source of Truth)", why: "同じデータが複数箇所に存在し矛盾する問題を防ぐため" },
  { era: "2010年代", name: "明示は暗黙に勝る(Explicit is Better than Implicit)", why: "暗黙の挙動による理解・保守の難しさを減らすため" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計原則 2003〜</Eyebrow>
        <h1>現代の原則 ― 早期発見・現代的な実践</h1>
        <Lead>
          2000年代以降、並行処理や大規模化するシステムへの対応として定着した5つの原則です。<Term>不変性を優先する</Term>は<Link href="/design/paradigm/functional">関数型プログラミング</Link>の普及と、<Term>継承より合成</Term>はオブジェクト指向の実践の中での反省と、それぞれ前のページまでで見てきた流れと連動しています。
        </Lead>
      </Hero>

      <Heading num="01">5つの原則</Heading>
      <table>
        <thead>
          <tr><th>年代</th><th>原則</th><th>なぜ生まれたか</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.era}</td>
              <td>{row.name}</td>
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Fail Fast ― 問題を早期に、大きな音で知らせる</Heading>
      <p>異常な状態を検知したら、その場ですぐに例外を投げて処理を止める考え方です。エラーを握りつぶして処理を継続させると、後になって別の場所で予期しない不具合として表面化し、原因の特定が難しくなります。早い段階で明示的に失敗させることで、障害の原因を突き止めやすくします。</p>

      <Heading num="03">継承より合成 ― 部品を組み合わせる</Heading>
      <p><Term>継承より合成(Composition over Inheritance)</Term>は、機能の再利用を「親クラスを継承する」のではなく「小さなオブジェクトを組み合わせる(has-a)」ことで実現しようという原則です。継承階層が深くなると、親クラスの変更が全ての子クラスへ波及しやすく、柔軟性も失われます。合成であれば、実行時に部品を差し替えることもできます。</p>

      <Heading num="04">不変性を優先する ― 一度作ったら変えない</Heading>
      <p>オブジェクトやデータを作成後に変更不可(<Term>イミュータブル</Term>)にする考え方です。可変な状態は「いつ・どこで書き換えられたか」を追うのが難しく、並行処理下では競合状態(race condition)の温床にもなります。変更が必要な場合は、元のデータを書き換えるのではなく新しいデータを作って返すようにします。</p>

      <Heading num="05">信頼できる唯一の情報源 ― データの置き場所を1つにする</Heading>
      <p><Term>Single Source of Truth(SSOT)</Term>は、同じデータを複数の場所にコピーして持たず、常に1箇所の「正」となるデータソースを参照する考え方です。複数箇所にコピーがあると、片方だけ更新されて矛盾が生じる問題が起きやすくなります。</p>

      <Heading num="06">明示は暗黙に勝る ― 挙動を推測させない</Heading>
      <p>Pythonの設計哲学(The Zen of Python)に由来する原則で、コードの挙動をコードから読み取れる形で明示し、暗黙の変換や暗黙のルールに頼らないという考え方です。暗黙の挙動は書くときは楽ですが、後から読む人がその挙動を推測しなければならず、理解・保守のコストを上げます。</p>

      <Analogy label="💡 たとえるなら">
        Fail Fastは「異常に気づいたらその場で警報を鳴らす」こと、継承より合成は「1つの万能ロボットを作るのではなく、交換可能な部品を組み合わせて機能を作る」こと、不変性を優先するは「一度発行した契約書は書き換えず、変更があれば新しい契約書を発行する」こと、SSOTは「同じ台帳のコピーを何冊も作らず、原本を1冊だけ管理する」こと、明示は暗黙に勝るは「阿吽の呼吸に頼らず、手順書に書いてあることだけをやる」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Fail Fast</h4><p>異常を検知したらその場で失敗させ、早期発見につなげる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>継承より合成</h4><p>継承階層ではなく、小さな部品の組み合わせで機能を再利用する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>不変性を優先する</h4><p>作成後に変更されないデータを基本にし、副作用によるバグを減らす。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>SSOT</h4><p>同じデータを複数箇所にコピーせず、正となる情報源を1つにする。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>明示は暗黙に勝る</h4><p>暗黙の挙動に頼らず、コードから読み取れる形で明示する。</p></Card>
      </CardGrid>

      <p>ここまで<Link href="/design/principles/foundations">黎明期の原則</Link>・<Link href="/design/principles/cohesion">保守性の基本4原則</Link>・<Link href="/design/principles/solid">SOLID</Link>・現代の原則で、設計原則の全体像を見てきました。次のページからは、これらの原則が実際にどんな構造として現れるかを、システム全体の組み方である<Link href="/design/architecture">アーキテクチャ</Link>で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/principles/solid" tag="設計">SOLID</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional" tag="設計">関数型</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
