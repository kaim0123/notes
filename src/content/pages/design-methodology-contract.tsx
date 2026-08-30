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
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "契約による設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>契約による設計 ― モジュール間の約束を明文化する</h1>
        <Lead>
          Bertrand Meyerが自身の設計するEiffel言語とともに広めた<Term>契約による設計(Design by Contract)</Term>は、モジュール同士の関係を「呼び出す側」と「呼び出される側」の間の<Term>契約</Term>として捉え、互いの責任範囲を事前に明文化する方法論です。
        </Lead>
      </Hero>

      <Aside label="ルーツ">
        1969年にTony Hoareが考案した、事前条件と事後条件によるプログラム検証(Hoare論理)が理論的な土台です。Meyerはこれを、実務で使える言語機能として体系化しました。
      </Aside>

      <Heading num="01">何を軸にするか</Heading>
      <p>
        契約による設計は、「このメソッドを呼ぶ側は何を保証すべきか」「呼ばれる側は何を保証するか」という<Term>責任の分界点</Term>を軸にモジュールを設計します。データ構造でも処理手順でもなく、モジュール境界をまたぐ約束事そのものを最初に固めるという点で、独自の軸を持つ方法論です。
      </p>

      <DiagramFrame
        slug="design-methodology-contract-parts"
        aspect="660 / 250"
        caption="契約による設計の3要素。呼び出す側と呼ばれる側の境界をまたぐ約束として、呼び出す側が保証する事前条件と、呼ばれる側が保証する事後条件があり、呼ばれる側の内部には常に満たしているべきクラス不変条件がある。契約があるから、失敗したときにどちらの責任かを機械的に切り分けられる。"
      />

      <table>
        <thead>
          <tr>
            <th>契約の要素</th>
            <th>内容</th>
            <th>破られたら</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">事前条件</td>
            <td>呼び出す側が満たすべき条件</td>
            <td>呼び出す側のバグ</td>
          </tr>
          <tr>
            <td className="hl">事後条件</td>
            <td>呼ばれる側が処理後に保証する条件</td>
            <td>呼ばれる側のバグ</td>
          </tr>
          <tr>
            <td className="hl">クラス不変条件</td>
            <td>オブジェクトが常に満たしているべき条件</td>
            <td>どちらかがオブジェクトの整合性を壊した</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        宅配便の契約に似ています。差出人は「正しく梱包された荷物を渡す」(事前条件)、配送業者は「壊さず届ける」(事後条件)という約束を交わします。荷物が壊れて届いたとき、梱包が最初から不十分だったなら差出人の責任、梱包に問題がなかったのに配送中に壊れたなら配送業者の責任だと、契約があるおかげで即座に切り分けられます。
      </Analogy>

      <Heading num="02">特徴と向き不向き</Heading>
      <p>
        契約を明文化しておくと、バグが起きたときに「事前条件を破ったのは呼び出す側か、事後条件を守らなかったのは呼ばれる側か」を機械的に切り分けられ、防御的なnullチェックだらけのコードを書かずに済みます。Eiffelのように契約を言語機能として持つ環境は多くありませんが、考え方は現代の随所に分散して引き継がれています。
      </p>
      <table>
        <thead>
          <tr>
            <th>契約の要素</th>
            <th>現代での現れ方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">事前条件</td>
            <td>型システムによる静的な保証、引数のバリデーション、APIスキーマ</td>
          </tr>
          <tr>
            <td className="hl">事後条件</td>
            <td>単体テストによる検証、戻り値の型</td>
          </tr>
          <tr>
            <td className="hl">不変条件</td>
            <td>
              <code>assert</code>によるランタイムチェック、コンストラクタでの検証
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <Link href="/design/methodology-ddd-tactical">値オブジェクト</Link>がコンストラクタでバリデーションを行い、以降は不正な状態が存在しないことを保証するのは、まさにクラス不変条件の実践です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>責任の分界点を軸にする</h4>
          <p>「誰が何を保証するか」というモジュール間の約束を最初に設計する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3つの契約要素</h4>
          <p>事前条件・事後条件・不変条件で、バグの責任範囲を切り分けられる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>型・テスト・検証に分散</h4>
          <p>言語機能としては少数派だが、考え方は現代の設計に広く息づいている。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/methodology-contract" />
    </DocsPage>
  );
}
