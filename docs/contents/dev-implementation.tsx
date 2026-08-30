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
  title: "設計をコードに落とす",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>設計をコードに落とす</h1>
        <Lead>
          設計で決めた仕組みを、実際に動くプログラムへと書き起こす工程が<Term>実装</Term>（コーディング）です。ここで大切なのは「動けばよい」ではなく、他人が読め、後から直せるコードにすること。<Term>コーディング標準</Term>や<Term>構造化プログラミング</Term>といった、品質を揃えるための約束事を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">ソフトウェア構築とコーディング標準</Heading>
      <p>プログラムを作る作業を<Term>ソフトウェア構築</Term>、その中でソースコードを書く作業を<Term>コーディング</Term>といいます。複数人で開発すると、書き方が人によってばらつき、読みにくく保守しづらいコードになりがちです。これを防ぐのが<Term>コーディング標準</Term>（コーディング規約）です。</p>

      <table>
        <thead>
          <tr><th>約束事</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命名規則</td><td>変数・関数などの名前の付け方を統一する</td></tr>
          <tr><td className="hl">書式ルール</td><td>字下げ（インデント）・空白・括弧の位置などを揃える</td></tr>
          <tr><td className="hl">コメント方針</td><td>何を、どの粒度でコメントに残すかを決める</td></tr>
        </tbody>
      </table>

      <p>具体的な命名の付け方は<Link href="/design/conventions">コーディング規約・スタイル</Link>で詳しく扱います。</p>

      <Heading num="02">構造化プログラミング ― 3つの基本構造</Heading>
      <p>プログラムの流れは、たった3つの制御構造の組み合わせで表せます。これを徹底し、分かりやすい流れを保つ考え方が<Term>構造化プログラミング</Term>です。</p>

      <table>
        <thead>
          <tr><th>制御構造</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順次</td><td>上から順に処理を実行する</td></tr>
          <tr><td className="hl">分岐（選択）</td><td>条件によって処理を選び分ける</td></tr>
          <tr><td className="hl">反復（繰り返し）</td><td>条件が満たされる間、処理を繰り返す</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        3つの基本構造は「料理の手順書」に似ています。上から順に作業し（順次）、「肉があれば炒める・なければ省く」と選び（分岐）、「とろみがつくまで混ぜ続ける」と繰り返す（反復）。この3つだけで、どんなに複雑な手順も曖昧さなく書き表せます。
      </Analogy>

      <p>構造化プログラミングそのものの成り立ちや、手続き型パラダイムとの関係は<Link href="/design/paradigm/structured">構造化</Link>で扱います。</p>

      <Heading num="03">部品化・再利用とデバッグ</Heading>
      <p>よく使う処理は<Term>部品化</Term>して切り出し、あちこちから<Term>再利用</Term>できるようにします。同じコードの重複が減り、修正も1か所で済みます。一方、書いたコードに潜む誤りを見つけて取り除く作業が<Term>デバッグ</Term>です。原因を絞り込み、想定と実際の食い違いを1つずつ確かめていきます。</p>

      <p>実装したモジュールは、その場で<Link href="/test/strategy">単体テスト</Link>と組み合わせて確認するのが基本です。実装とテストを近づけるほど、欠陥は早く・安く見つかります。エディタやGitなどの開発環境は<Link href="/dev/workspace">開発環境</Link>や<Link href="/dev/tooling">パッケージ管理とビルド</Link>が担当します。</p>

      <Heading num="まとめ">実装で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>約束事で品質を揃える</h4><p>命名規則や書式を定めたコーディング標準で、読みやすく保守しやすいコードにします。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3つの基本構造</h4><p>順次・分岐・反復だけで流れを組み立てるのが、構造化プログラミングです。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>部品化とテストを近づける</h4><p>再利用できる部品に分け、単体テストとセットで確かめると、欠陥を早く見つけられます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design" tag="設計">設計の全体像</RelatedLink>
                    <RelatedLink href="/design/paradigm/structured" tag="設計">構造化</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                    <RelatedLink href="/dev/debug" tag="実装">デバッグの技法</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
