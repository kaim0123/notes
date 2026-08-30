import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ADR ― 設計判断の記録" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ADR ― 設計判断の記録</h1>
        <Lead>
          半年後、コードを見て「なぜこうなっているのか」が分からないとき、失われているのは判断そのものではなく<Term>判断の理由</Term>です。<Term>ADR(Architecture Decision Record)</Term>は、重要な設計判断とその背景・却下した選択肢を、1件1ファイルの短い記録として残す仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">何を解決するのか</Heading>
      <p>
        コードは「今どうなっているか」しか語りません。「なぜMySQLではなくPostgreSQLなのか」「なぜここだけ非同期なのか」といった問いに、コードは答えられません。答えを知る人が異動すれば、その判断は根拠を失い、次の担当者は同じ検討を最初からやり直すか、理由の分からない制約として恐る恐る保守することになります。
      </p>

      <Heading num="02">1件のADRに書くこと</Heading>
      <p>
        形式は自由ですが、次の項目が揃っていれば十分です。1ファイル1決定、長さは1ページに収めます。
      </p>
      <table>
        <thead>
          <tr><th>項目</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">タイトル</td><td>決定を一文で。「セッションをJWTで管理する」</td></tr>
          <tr><td className="hl">状態</td><td>提案中 / 採択済み / 置き換え済み</td></tr>
          <tr><td className="hl">背景</td><td>何に困っていたか。判断が必要になった経緯</td></tr>
          <tr><td className="hl">決定</td><td>何を選んだか。断定形で書く</td></tr>
          <tr><td className="hl">結果</td><td>この決定によって何が得られ、何を諦めたか</td></tr>
        </tbody>
      </table>
      <p>
        最も価値があるのは<Term>却下した選択肢とその理由</Term>です。「Cookieも検討したが、モバイルアプリからの利用が決まっていたので見送った」の一文があるだけで、次に同じ検討をする人の時間が丸ごと節約されます。
      </p>

      <Heading num="03">いつ書くか</Heading>
      <p>
        すべての判断を記録すると続きません。基準は<Term>後から変えるのが高くつくか</Term>です。
      </p>
      <table>
        <thead>
          <tr><th>書く</th><th>書かない</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>データベースの選定、認証方式、分割方針、外部サービスの採用、APIの互換性方針</td>
            <td>変数名、ファイル配置、いつでも戻せる実装の詳細</td>
          </tr>
          <tr>
            <td>あえて採用しなかった判断(「今はマイクロサービスにしない」も立派な決定)</td>
            <td>規約に属するもの。それは<Link href="/design/conventions">コーディング規約</Link>へ</td>
          </tr>
        </tbody>
      </table>
      <p>
        書くタイミングは<Term>決めた直後</Term>です。議論の記憶があるうちに書きます。後回しにすると、却下した理由から先に失われます。
      </p>

      <Heading num="04">決定は覆せる ― supersede という考え方</Heading>
      <p>
        ADRは<Term>書き換えません</Term>。前提が変わって別の判断をするときは、新しいADRを作り、古いほうを「置き換え済み」にします。
      </p>

      <DiagramFrame
        slug="design-docs-adr-lifecycle"
        aspect="660 / 260"
        caption="ADRのライフサイクル。セッションをCookieで管理するというADR-0007は書き換えられず、前提が変わったときは新しいADR-0021(セッションをJWTへ移行する)を作り、古い方を置き換え済みとして残す。古い決定を消さないから、いつ・なぜ方針が変わったかの履歴が残り、同じ失敗を繰り返さない材料になる。"
      />

      <Heading num="05">運用を軽く保つ</Heading>
      <p>
        続かないADRの原因は、たいてい重すぎることです。テンプレートを長くしない、承認フローを作らない、1ページを超えたら削る ―
        この3点を守るだけで運用は続きます。<code>docs/adr/0001-xxx.md</code>のように連番で置き、PRに含めてレビューするのが最も軽い形です。
      </p>

      <Heading num="06">コードとの結び付け</Heading>
      <p>
        ADRは参照されて初めて機能します。関係するコードのコメントから「詳細はADR-0021」と番号で参照できるようにしておくと、コードを読んでいる途中で理由にたどり着けます。逆に、どこからも参照されないADRは、書いた本人以外には存在しないのと同じです。
      </p>

      <Aside label="書くこと自体に価値がある">
        ADRを書こうとすると、選択肢を挙げ、比較軸を言語化し、捨てるものを認識する必要が生じます。記録が残ること以上に、この<Term>思考の強制</Term>に価値があります。書けないということは、まだ判断できていないということでもあります。
      </Aside>

      <Analogy label="💡 たとえるなら">
        ADRは航海日誌です。今どこにいるか(コード)は見れば分かりますが、なぜその航路を選んだのか、どの航路を避けたのかは、書き残さなければ誰にも分かりません。日誌があるから、次の航海で同じ暗礁を避けられます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>理由を残す</h4><p>決定そのものより、却下した選択肢とその理由に価値がある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>戻すのが高い判断だけ</h4><p>全部書くと続かない。基準は「後から変えるのが高くつくか」。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>書き換えず、置き換える</h4><p>古い決定を残すことで、方針が変わった履歴そのものが資産になる。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/docs-adr" />
    </DocsPage>
  );
}
