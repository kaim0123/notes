import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "要件の表現方法" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>要件の表現方法 ― 言葉のあいまいさを図と表で減らす</h1>
        <Lead>
          <Link href="/dev/requirements">要件定義</Link>で「何を作るか」を決めても、文章だけでは受け取り方に幅が出ます。そこで<Term>ユースケース</Term>や<Term>DFD</Term>、<Term>UML</Term>といった図・表を使い、利用者の使い方や情報の流れを目に見える形にします。あわせて、要件を最後まで追える<Term>トレーサビリティ</Term>の考え方を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">利用者の視点で表す</Heading>
      <p>まず「誰が、システムを使って何を実現したいか」を、利用者の視点でとらえます。</p>

      <table>
        <thead>
          <tr><th>表現</th><th>内容</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ユースケース</td>
            <td>利用者(アクター)とシステムのやり取りを、目的単位でまとめたもの</td>
            <td>「商品を検索する」のように、機能のまとまりを表す</td>
          </tr>
          <tr>
            <td className="hl">ユーザーストーリー</td>
            <td>「〜として、〜したい。なぜなら〜」という短い文で要求を表す</td>
            <td>反復型でよく使う。会話のきっかけとして軽く書く</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ユースケースは取扱説明書の目次に似ています。利用者がこの製品で何をしたいのか(検索する・注文する・返品する)を目的ごとに並べることで、作るべき機能の全体像が一望できます。細かい手順は後で詰めるとして、まず「何のための機能か」を取り違えないための地図です。
      </Analogy>

      <p>
        この視点をそのまま設計まで貫くのが<Link href="/design/methodology-use-case-driven">ユースケース中心設計</Link>で、要件の表現と設計手法がひと続きになっています。
      </p>

      <Heading num="02">業務と情報の流れを表す</Heading>
      <p>
        個々の機能だけでなく、業務全体の流れも押さえます。<Term>業務モデル</Term>は、現状の業務(As-Is)やあるべき業務(To-Be)を図で表し、システム化の範囲を見極めるために使います。<Term>運用シナリオ</Term>は、システムが実際に使われる場面を時間の流れに沿って具体的に描き、要件の抜け漏れを洗い出します。
      </p>

      <Heading num="03">図で表す ― DFD・ER図・UML</Heading>
      <p>
        要件段階では、次の図を<Term>読める</Term>ようになっておくのが目標です。詳細な設計での使い方は、それぞれの設計手法のページに委ねます。
      </p>

      <table>
        <thead>
          <tr><th>図</th><th>表すもの</th><th>詳しく</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">DFD</td>
            <td>データの流れ(どこから来て、どう処理され、どこへ行くか)</td>
            <td>
              <Link href="/design/paradigm-structured">構造化</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">ER図</td>
            <td>データの構造(実体と、その間の関連)</td>
            <td>
              <Link href="/database/design">ER図と正規化</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">UML</td>
            <td>ユースケース図・クラス図など、オブジェクト指向の共通言語</td>
            <td>
              <Link href="/design/paradigm-oop">オブジェクト指向</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">要件を最後まで追う ― トレーサビリティ</Heading>
      <p>
        <Term>双方向トレーサビリティ</Term>とは、1つの要件が「設計・実装・テスト」のどこで実現され検証されたかを前向きにたどれ、逆にあるプログラムやテストが「どの要件のためか」を後ろ向きにもたどれる状態のことです。
      </p>

      <DiagramFrame
        slug="dev-requirements-traceability"
        aspect="640 / 260"
        caption="双方向トレーサビリティ。要件・設計・実装・テストが前向きの矢印でつながり、ある要件がどこで実現され検証されたかをたどれる。逆向きの矢印は、あるテストやコードがどの要件のために存在するかをたどれることを示す。前向きが切れていれば実装漏れ、後ろ向きが切れていればどの要件にも紐づかない過剰な機能だと分かる。"
      />

      <p>
        これが保たれていると、要件が変わったときの影響範囲を漏れなく把握でき、作ったのに要件に紐づかない機能(過剰)や、要件はあるのに実装されていない機能(漏れ)を防げます。
      </p>

      <Aside label="重い管理表を作る話ではない">
        トレーサビリティは専用の管理表がないと実現できないものではありません。<Link href="/dev/git-ci">コミットやPRに課題番号を書く</Link>、テストに要件のIDを添える、といった小さな習慣でも、前向き・後ろ向きの両方がたどれるようになります。大事なのは管理表の形式ではなく<Term>つながりが切れていないこと</Term>です。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利用者視点でとらえる</h4>
          <p>
            「誰が何をしたいか」を目的単位に整理すると、機能の全体像が見えます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>図はまず読めること</h4>
          <p>
            DFD・ER図・UMLは、要件段階では何を表す図かを理解できれば十分です。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>双方向にたどれる状態に</h4>
          <p>
            トレーサビリティが、要件の漏れ・過剰と変更時の影響把握を支えます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/requirements-modeling" />
    </DocsPage>
  );
}
