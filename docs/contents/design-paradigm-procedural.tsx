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
  title: "手続き型",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム 1950-60s</Eyebrow>
        <h1>手続き型 ― 「命令の羅列」から「計算の手順」へ</h1>
        <Lead>
          FORTRAN(1957)やCOBOL(1959)とともに広まった、最初期の高級言語パラダイムです。CPUへの命令を1つずつ並べる<Term>機械語・アセンブリ</Term>に代わって、「計算する」「繰り返す」「条件分岐する」という、人間の思考に近い<Term>手続き(プロシージャ)</Term>単位でプログラムを組み立てます。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>アセンブリでは、単純な合計計算1つにもレジスタとメモリ番地を指定した命令列が必要で、少し複雑な処理でも人間が全体を把握するのは困難でした。手続き型プログラミングは、この「CPUへの命令列」を「変数への代入」「四則演算」「<code>if</code>による分岐」「決まった回数の繰り返し」という抽象度の高い記述に置き換え、さらに一連の処理に名前を付けて<Term>手続き(サブルーチン/関数)</Term>として括り出せるようにしました。</p>

      <Heading num="02">基本単位は「手続き」</Heading>
      <p>手続き型プログラミングの基本単位は、データではなく<Term>手続き</Term>です。プログラム全体を「何をする処理か」で分割し、それぞれを手続きとして名前付けし、必要な場所から呼び出します。データは手続きの外側(グローバル変数)か、呼び出し時の引数として渡され、手続き自身は原則としてデータを「所有」しません。</p>

      <table>
        <thead>
          <tr><th>構成要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順次(Sequence)</td><td>命令を上から下へ順番に実行する</td></tr>
          <tr><td className="hl">分岐(Selection)</td><td><code>if</code>/<code>switch</code>で条件に応じて経路を変える</td></tr>
          <tr><td className="hl">反復(Iteration)</td><td><code>for</code>/<code>while</code>で同じ処理を繰り返す</td></tr>
          <tr><td className="hl">手続き呼び出し</td><td>処理のまとまりに名前を付け、再利用・分割する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        手続き型プログラミングは、料理のレシピです。「材料を切る」「炒める」「盛り付ける」という手順(手続き)が上から順に並び、必要なら「下ごしらえ」という手順を別のレシピとして括り出して呼び出せます。主役は食材(データ)ではなく、あくまで「何をどの順番でやるか」です。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>処理の流れをそのまま記述できるため学習コストが低く、バッチ処理やスクリプトのように「上から下へ一度実行して終わり」の処理には今も向いています。一方で、プログラムが大きくなるとグローバル変数がどこからでも書き換えられる状態になりやすく、「このデータは誰が・いつ変更したのか」を追うのが難しくなります。この問題への回答として、次に見る<Term>構造化プログラミング</Term>が登場します。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>手続きが基本単位</h4><p>処理のまとまりに名前を付け、呼び出して再利用する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データは外側にある</h4><p>手続き自身はデータを所有せず、引数やグローバル変数として渡される。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>小規模な処理に強い</h4><p>スクリプトやバッチ処理など、手順通り一度実行するだけの処理に向く。</p></Card>
      </CardGrid>

      <p>次のページでは、GOTO文が引き起こす「スパゲッティコード」問題を、決まった形の制御構造だけで解決しようとした<Link href="/design/paradigm/structured">構造化プログラミング</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm" tag="設計">パラダイム一覧</RelatedLink>
                    <RelatedLink href="/design/paradigm/structured" tag="設計">構造化</RelatedLink>
                    <RelatedLink href="/design/methodology/data-centric" tag="設計">データ中心設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
