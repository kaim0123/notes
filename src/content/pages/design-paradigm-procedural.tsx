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
  title: "手続き型",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>手続き型 ― 命令の羅列から、計算の手順へ</h1>
        <Lead>
          FORTRAN(1957)やCOBOL(1959)とともに広まった、最初期の高級言語パラダイムです。CPUへの命令を1つずつ並べる<Term>機械語・アセンブリ</Term>に代わって、「計算する」「繰り返す」「条件で分ける」という人間の思考に近い<Term>手続き(プロシージャ)</Term>単位でプログラムを組み立てます。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        アセンブリでは、単純な合計計算1つにもレジスタとメモリ番地を指定した命令列が必要で、少し複雑な処理になると人間が全体を把握できませんでした。手続き型プログラミングは、この命令列を「変数への代入」「四則演算」「<code>if</code>による分岐」「決まった回数の繰り返し」という抽象度の高い記述へ置き換え、さらに一連の処理に名前を付けて<Term>手続き(サブルーチン・関数)</Term>として括り出せるようにしました。
      </p>

      <Heading num="02">基本単位は「手続き」</Heading>
      <p>
        手続き型プログラミングの基本単位は、データではなく<Term>手続き</Term>です。プログラム全体を「何をする処理か」で分割し、それぞれに名前を付けて必要な場所から呼び出します。データは手続きの外側(グローバル変数)にあるか、呼び出し時の引数として渡されるもので、手続き自身はデータを所有しません。
      </p>

      <DiagramFrame
        slug="design-paradigm-procedural-data"
        aspect="660 / 300"
        caption="手続き型プログラムの構造。中央のグローバルなデータに対して、集計する・出力する・検証するという3つの手続きがいずれも読み書きできる形になっている。手続き自身はデータを所有しないため、規模が大きくなると「このデータを誰がいつ書き換えたのか」を追いにくくなる。"
      />

      <table>
        <thead>
          <tr>
            <th>構成要素</th>
            <th>役割</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">順次</td>
            <td>命令を上から下へ順番に実行する</td>
          </tr>
          <tr>
            <td className="hl">分岐</td>
            <td>
              <code>if</code>・<code>switch</code>で条件に応じて経路を変える
            </td>
          </tr>
          <tr>
            <td className="hl">反復</td>
            <td>
              <code>for</code>・<code>while</code>で同じ処理を繰り返す
            </td>
          </tr>
          <tr>
            <td className="hl">手続き呼び出し</td>
            <td>処理のまとまりに名前を付け、再利用・分割する</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        手続き型プログラミングは料理のレシピです。「材料を切る」「炒める」「盛り付ける」という手順が上から順に並び、必要なら「下ごしらえ」を別のレシピとして括り出して呼び出せます。主役は食材(データ)ではなく、あくまで「何をどの順番でやるか」です。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>
        処理の流れをそのまま書けるため学習コストが低く、バッチ処理やスクリプトのように「上から下へ一度実行して終わり」の処理には今も向いています。一方で、プログラムが大きくなるとグローバル変数がどこからでも書き換えられる状態になりやすく、「このデータは誰が・いつ変更したのか」を追うのが難しくなります。この問題への回答として、次の<Link href="/design/paradigm-structured">構造化プログラミング</Link>が登場します。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>手続きが基本単位</h4>
          <p>処理のまとまりに名前を付け、呼び出して再利用する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>データは外側にある</h4>
          <p>手続き自身はデータを所有せず、引数やグローバル変数として渡される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>小規模な処理に強い</h4>
          <p>スクリプトやバッチ処理など、手順どおり一度実行するだけの処理に向く。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-procedural" />
    </DocsPage>
  );
}
