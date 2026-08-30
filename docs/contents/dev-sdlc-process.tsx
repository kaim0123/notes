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
  title: "開発プロセスと手法",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>開発プロセスと手法 ― 計画の立て方・進め方の違い</h1>
        <Lead>
          <Link href="/dev/sdlc">開発の全体像</Link>で見た要件定義から保守までの工程を、実際に「どういう順番で・どの単位で」進めるか。その進め方の型を<Term>開発プロセスモデル</Term>と呼びます。全体をきっちり順番に進める考え方から、小さく作って改善を重ねる考え方まで、代表的なモデルを整理します。
        </Lead>
      </Hero>

      <Heading num="01">ウォーターフォールモデル ― 工程を順番に流す</Heading>
      <p><Term>ウォーターフォールモデル</Term>は、要件定義・設計・実装・テストといった工程を、上流から下流へ一方向に進める考え方です。滝（waterfall）のように前の工程が終わってから次へ進み、各工程の終わりに成果物をレビューして品質を固めてから次に渡します。全体像を早く見通せる一方、後の工程で前工程の誤りが見つかると手戻りが大きくなります。</p>

      <Heading num="02">プロトタイピングと段階的モデル ― 早く形にする</Heading>
      <p>ウォーターフォールの「後戻りが高くつく」弱点を補うため、早い段階で一部を形にして確かめる考え方があります。</p>
      <table>
        <thead>
          <tr><th>モデル</th><th>考え方</th><th>ねらい</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロトタイピングモデル</td><td>試作品（プロトタイプ）を早期に作り、利用者に確認してもらう</td><td>要求の認識ずれを早く発見する</td></tr>
          <tr><td className="hl">段階的モデル</td><td>システムを複数の部分に分け、優先度の高いものから順に開発・リリースする</td><td>重要な機能を早く届け、リスクを分散する</td></tr>
        </tbody>
      </table>

      <Heading num="03">アジャイル ― 変化を前提に小さく回す</Heading>
      <p><Term>アジャイル</Term>は、短い期間で「設計〜実装〜テスト〜リリース」を繰り返し、要求の変化に合わせて計画を見直していく考え方の総称です。その価値観をまとめたのが<Term>アジャイルソフトウェア開発宣言</Term>で、「プロセスやツールよりも個人と対話を」「包括的なドキュメントよりも動くソフトウェアを」「契約交渉よりも顧客との協調を」「計画に従うことよりも変化への対応を」と、左記も尊重しつつ右記により価値を置くと述べています。</p>

      <Analogy label="💡 たとえるなら">
        ウォーターフォールとアジャイルの違いは「フルコースを一度に出す」か「少しずつ料理を運ぶ」かに似ています。前者は献立を最初に確定させて一気に仕上げる。後者は一皿ずつ出して感想を聞き、次の皿に反映する。要求が固まっているならフルコース、変わりやすいなら小出しが向きます。
      </Analogy>

      <table>
        <thead>
          <tr><th>観点</th><th>ウォーターフォール</th><th>アジャイル</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">進め方</td><td>工程を順番に一度だけ</td><td>短い反復を繰り返す</td></tr>
          <tr><td className="hl">要求の変化</td><td>固めてから着手（変更に弱い）</td><td>変化を前提に見直す</td></tr>
          <tr><td className="hl">成果物の確認</td><td>各工程末のレビュー</td><td>反復ごとに動くものを確認</td></tr>
          <tr><td className="hl">向く場面</td><td>要求が明確・大規模で統制が要る</td><td>要求が不確実・素早く価値を出したい</td></tr>
        </tbody>
      </table>

      <Heading num="04">構造化手法 ― 大きな問題を分けて詳しくする</Heading>
      <p>プロセスモデルとは別に、開発の各工程を進める技法として<Term>構造化手法</Term>があります。システムを機能のまとまりで<Term>階層構造化</Term>し、大まかな仕様から少しずつ詳細へ落としていく<Term>段階的詳細化</Term>（トップダウン）で全体を組み立てます。設計面での具体的な手法は<Link href="/design/paradigm/structured">構造化設計</Link>で扱います。</p>

      <Heading num="まとめ">開発プロセスで押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>順番に流すか、反復するか</h4><p>ウォーターフォールは一方向、アジャイルは短い反復。進め方の根本が違います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>弱点を補う中間形</h4><p>プロトタイピングや段階的モデルは、早く形にして手戻りやリスクを抑えます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>要求の性質で選ぶ</h4><p>要求が固いか変わりやすいかで、向くプロセスは変わります。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                    <RelatedLink href="/dev/sdlc/process/agile" tag="開発工程">スクラムとアジャイル実践</RelatedLink>
                    <RelatedLink href="/dev/sdlc/requirements" tag="開発工程">要件定義</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
