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
  title: "知的財産とライセンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>知的財産とライセンス ― 誰のもので、どう使ってよいか</h1>
        <Lead>
          プログラムやデータ、アイデアには、それを生み出した人の権利があります。開発では、自分たちが作るものの権利と、他者が作ったものを使う条件の両方を理解しておく必要があります。中心となるのが<Term>著作権</Term>と<Term>特許</Term>、そして利用条件を定める<Term>ライセンス</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">知的財産権 ― 著作権と特許</Heading>
      <p><Term>知的財産権</Term>は、創作や発明を保護する権利の総称です。ソフトウェア開発で特に関わるのが次の2つです。</p>
      <table>
        <thead>
          <tr><th>権利</th><th>保護する対象</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">著作権</td><td>表現されたもの（プログラム、文書、画像など）</td><td>創作した時点で自動的に発生。登録は不要</td></tr>
          <tr><td className="hl">特許（特許権）</td><td>発明（技術的アイデア）</td><td>出願・審査・登録が必要。一定期間、独占的に実施できる</td></tr>
        </tbody>
      </table>
      <p>プログラムそのものは著作権で守られ、その背後にある新規な技術的アイデアは特許の対象になり得ます。「表現」を守るのが著作権、「アイデア」を守るのが特許、と捉えると区別しやすくなります。</p>

      <Heading num="02">職務著作 ― 会社で作ったものは誰のものか</Heading>
      <p>従業員が業務として作成したプログラムの著作権は、原則として<Term>職務著作</Term>（法人著作）として会社に帰属します。個人が趣味で作ったものとは扱いが異なる点が、実務でも試験でもよく問われます。</p>

      <Analogy label="💡 たとえるなら">
        著作権と特許は「小説」と「新しい調理法」の違いに似ています。書き上げた小説の文章は書いた瞬間に守られます（著作権）が、誰でも似た物語は書けます。一方、新しい調理法を独占したいなら、届け出て認められる必要があります（特許）。会社の仕事として書いた小説の権利が会社のものになるのが、職務著作です。
      </Analogy>

      <Heading num="03">ライセンスと利用制限</Heading>
      <p><Term>ライセンス</Term>は、著作物やソフトウェアを「どう使ってよいか」を定めた利用許諾です。オープンソースソフトウェアにも種類ごとに条件があり、改変物の公開義務の有無などが異なります。他者の成果物を使うときは、ライセンス条件の確認が欠かせません。</p>
      <p>また、無断複製を防ぐ技術として<Term>コピーガード</Term>や、デジタルコンテンツの利用を制御する<Term>DRM</Term>（Digital Rights Management）があります。</p>
      <p>なお、<Link href="/ops/compliance">法令・コンプライアンス</Link>で扱う個人情報保護やCookie規制は、知的財産とは別の論点です。「誰の創作物か」を扱うのが本ページ、「個人のデータをどう守るか」を扱うのがコンプライアンス、と区別してください。</p>

      <Heading num="まとめ">知的財産で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>表現とアイデア</h4><p>表現を守るのが著作権、技術的アイデアを守るのが特許です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>職務著作は会社に帰属</h4><p>業務として作ったプログラムの著作権は、原則として法人のものになります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>使う前に条件を確認</h4><p>他者の成果物はライセンス条件を確認してから利用します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
                    <RelatedLink href="/ops/compliance" tag="サービス運営">法令・コンプライアンス</RelatedLink>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
