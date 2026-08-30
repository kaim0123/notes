import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ドキュメンテーション" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ドキュメンテーション ― コードに書けないことを書く</h1>
        <Lead>
          多くの現場でドキュメントは「作られては放置される」を繰り返します。原因ははっきりしていて、<Term>コードを見れば分かることを書いている</Term>からです。書くべきなのは、コードのどこにも残らない情報 ―
          意図・制約・経緯だけです。
        </Lead>
      </Hero>

      <Heading num="01">なぜドキュメントは腐るのか</Heading>
      <table>
        <thead>
          <tr><th>腐る原因</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">コードから導ける内容を手で書き写している</td>
            <td>書かない。生成するか、コードを読んでもらう</td>
          </tr>
          <tr>
            <td className="hl">更新する動機が誰にもない</td>
            <td>変更と同じPRで直す。レビュー対象に含める</td>
          </tr>
          <tr>
            <td className="hl">コードから離れた場所にある</td>
            <td>リポジトリ内に置き、コードと一緒にバージョン管理する</td>
          </tr>
          <tr>
            <td className="hl">読み手が想定されていない</td>
            <td>誰が何のために読むかを決めてから書く</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">何を書き、何を書かないか</Heading>

      <DiagramFrame
        slug="design-docs-what-to-write"
        aspect="680 / 300"
        caption="ドキュメントに何を書き、何を書かないかの分岐。左の機械的に導ける情報(APIの型、DBのスキーマ、依存パッケージ、設定値、ルーティング定義)は生成するかコードを見ればよく、手で書き写した瞬間から腐り始める。右の導けない情報(なぜその方式を選んだか、外部の制約、試して駄目だった案、運用上の暗黙の前提、最短で動かす手順)だけを人が書く。"
      />

      <p>
        判断基準は単純です ―
        <Term>コードから機械的に導けるか</Term>。導けるなら生成し、導けない情報だけを人間が書きます。型定義やスキーマを文書に転記した瞬間から、その文書は嘘になり始めます。
      </p>

      <Heading num="03">READMEに書くこと</Heading>
      <p>
        READMEの読み手は「明日このリポジトリを初めて触る人」です。その人が最短で動かせることを目標にします。
      </p>
      <table>
        <thead>
          <tr><th>項目</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">これは何か</td><td>1〜2文。何を解決するものか</td></tr>
          <tr><td className="hl">動かし方</td><td>コピー&amp;ペーストで動くコマンド列</td></tr>
          <tr><td className="hl">前提</td><td>必要なランタイム・環境変数・外部サービス</td></tr>
          <tr><td className="hl">構成</td><td>主要なディレクトリと、そこに何があるか</td></tr>
          <tr><td className="hl">つまずきどころ</td><td>初回だけ必要な手順、よくある失敗</td></tr>
        </tbody>
      </table>

      <Heading num="04">コメントの方針</Heading>
      <p>
        コメントの原則は1つ ―
        <Term>「何を」ではなく「なぜ」を書く</Term>。何をしているかはコードを読めば分かります。読んでも分からないのは、検討して捨てた代替案、外部の制約、直感に反する処理の理由です。
      </p>
      <p>
        コメントが必要だと感じたときは、まず<Term>名前を変える・関数に切り出す</Term>ことで解消できないかを考えます。それでも残る「なぜ」だけがコメントになります。
      </p>

      <Aside label="コメントアウトされたコードは消す">
        「戻すかもしれないから」と残された古いコードは、読む人に「これは生きているのか」を毎回考えさせます。バージョン管理があれば履歴から復元できるので、消して構いません。
      </Aside>

      <Heading num="05">図をどう使うか</Heading>
      <p>
        文章より図が有効なのは、<Term>関係と流れ</Term>を伝える場面です。ただし維持コストがかかるため、対象は絞ります。全体の構成、複数サービスにまたがるフロー、状態遷移 ―
        この3つくらいが目安です。
      </p>
      <p>
        図はできるだけ<Term>テキストで書ける形式</Term>にしてリポジトリに置きます。画像ファイルは差分が見えず、編集できる人が限られ、確実に腐ります。
      </p>

      <Heading num="06">ドキュメントもコードとして扱う</Heading>
      <p>
        リポジトリの中に置き、変更と同じPRで直し、レビューの対象に含める ―
        この3つが揃って初めて、ドキュメントは現実に追従します。別の場所に置かれた文書は、更新する動機が誰にもないため必ず置き去りになります。
      </p>

      <Heading num="07">読み手ごとに分ける</Heading>
      <p>
        利用者向けの使い方、開発者向けの内部構造、運用者向けの障害対応 ―
        これらを1つの文書に混ぜると、どの読み手にとっても「自分に関係ない情報が9割」の文書になり、読まれなくなります。読み手が違えば、別のファイルにします。
      </p>

      <Analogy label="💡 たとえるなら">
        コードが「今どうなっているか」を語るのに対し、ドキュメントは「なぜそうなったか」を語ります。前者は現物を見れば分かりますが、後者は記録した人がいなくなれば永久に失われます。書くべきものは、失われたら復元できない側です。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>導けることは書かない</h4><p>型もスキーマもコードにある。転記した瞬間に嘘になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>意図をコードの隣に</h4><p>リポジトリ内に置き、同じPRで直し、レビュー対象に含める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>読み手ごとに分ける</h4><p>混ぜた文書は、誰にとっても他人事の情報が9割になる。</p></Card>
      </CardGrid>

      <p>
        設計判断そのものを記録する仕組みは、次の<Link href="/design/docs-adr">ADR</Link>で扱います。
      </p>

      <DocsFooter href="/design/docs" />
    </DocsPage>
  );
}
