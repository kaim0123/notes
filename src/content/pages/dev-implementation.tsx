import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "設計をコードに落とす" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>設計をコードに落とす</h1>
        <Lead>
          設計で決めた仕組みを、実際に動くプログラムへ書き起こす工程が<Term>実装</Term>です。ここで大切なのは「動けばよい」ではなく、他人が読め、後から直せるコードにすること。<Term>コーディング標準</Term>や<Term>構造化プログラミング</Term>といった、品質を揃えるための約束事を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">コーディング標準 ― 判断を減らす約束事</Heading>
      <p>
        複数人で開発すると、書き方が人によってばらつき、読みにくく保守しづらいコードになりがちです。これを防ぐのが<Term>コーディング標準</Term>(コーディング規約)です。
      </p>

      <table>
        <thead>
          <tr><th>約束事</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">命名規則</td>
            <td>変数・関数などの名前の付け方を統一する</td>
          </tr>
          <tr>
            <td className="hl">書式ルール</td>
            <td>字下げ・空白・括弧の位置などを揃える</td>
          </tr>
          <tr>
            <td className="hl">コメント方針</td>
            <td>何を、どの粒度でコメントに残すかを決める</td>
          </tr>
        </tbody>
      </table>

      <p>
        規約の価値は「美しさ」ではなく<Term>判断を減らすこと</Term>にあります。書式のように機械で決められるものは<Link href="/dev/git-ci">自動整形とCI</Link>に任せ、人間のレビューは設計と意図に集中させます。具体的な命名の付け方は<Link href="/design/conventions">コーディング規約</Link>で詳しく扱っています。
      </p>

      <Heading num="02">構造化プログラミング ― 3つの基本構造</Heading>
      <p>
        プログラムの流れは、たった3つの制御構造の組み合わせで表せます。これを徹底し、分かりやすい流れを保つ考え方が<Term>構造化プログラミング</Term>です。
      </p>

      <DiagramFrame
        slug="dev-implementation-three-structures"
        aspect="640 / 260"
        caption="どんなに複雑な手順も3つの基本構造の組み合わせで書ける。順次は処理が上から下へ一直線に並ぶ形、分岐は条件から2本の経路に分かれてまた合流する形、反復は条件を満たす間だけ処理へ戻る形。3つに共通するのは入口が1つ・出口も1つであることで、この性質があるためどれも「1つの処理」として扱え、入れ子にして組み合わせても流れが追える。"
      />

      <Analogy label="💡 たとえるなら">
        3つの基本構造は料理の手順書に似ています。上から順に作業し(順次)、「肉があれば炒める・なければ省く」と選び(分岐)、「とろみがつくまで混ぜ続ける」と繰り返す(反復)。この3つだけで、どんなに複雑な手順も曖昧さなく書き表せます。
      </Analogy>

      <p>
        構造化プログラミングそのものの成り立ちや、手続き型パラダイムとの関係は<Link href="/design/paradigm-structured">構造化</Link>で扱っています。
      </p>

      <Heading num="03">部品化・再利用</Heading>
      <p>
        よく使う処理は<Term>部品化</Term>して切り出し、あちこちから再利用できるようにします。同じコードの重複が減り、修正も1か所で済みます。ただし「重複しているから」だけでまとめると、たまたま似ているだけの処理が1つに縛られ、かえって変更しにくくなります。まとめる基準は形の一致ではなく<Link href="/design/principles-cohesion">変更理由が同じかどうか</Link>です。
      </p>

      <Aside label="設計から渡ってこないもの">
        設計書に書かれるのは「何をどう分けるか」までで、変数名・エラー時の細かな挙動・境界値の扱いは実装者の判断に委ねられます。ここで迷ったら勝手に決めず、<Term>設計の意図に照らして判断し、判断した内容を残す</Term>のが原則です。残す場所はコメントか、<Link href="/design/docs-adr">ADR</Link>のような決定の記録になります。
      </Aside>

      <Heading num="04">実装とテストを近づける</Heading>
      <p>
        実装したモジュールは、その場でテストと組み合わせて確認するのが基本です。<Term>実装とテストを近づけるほど、欠陥は早く・安く見つかります</Term>。書いた直後なら自分の頭に文脈が残っており、原因の特定も修正も速く済みます。
      </p>
      <p>
        書いたコードに潜む誤りを見つけて取り除く作業が<Term>デバッグ</Term>です。原因を絞り込み、想定と実際の食い違いを1つずつ確かめていく手順は<Link href="/dev/debug">デバッグと性能改善</Link>で扱っています。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>約束事で判断を減らす</h4>
          <p>
            機械で決められるものは自動化に任せ、人間は設計と意図に集中します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3つの基本構造</h4>
          <p>
            順次・分岐・反復。入口と出口が1つずつだから、組み合わせても追えます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>テストを近づける</h4>
          <p>
            書いた直後に確かめるほど、欠陥の発見も修正も安く済みます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/implementation" />
    </DocsPage>
  );
}
