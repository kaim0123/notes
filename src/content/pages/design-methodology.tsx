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
  Analogy,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "設計思想・方法論",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計思想・方法論 ― 何を軸にモジュールを切り出すか</h1>
        <Lead>
          <Link href="/design/paradigm">パラダイム</Link>が「どう書くか」という文法レベルの流派だとすると、<Term>設計思想・方法論</Term>は「何を軸にモジュールやクラスを切り出すか」という、もう一段具体的な判断です。変わりやすさを軸にするか、データを軸にするか、責務を軸にするか、業務知識を軸にするかで、同じ機能でもコードの切り分け方はまったく変わります。
        </Lead>
      </Hero>

      <Heading num="01">7つの方法論と、それぞれの軸</Heading>
      <p>
        7つの方法論は互いに置き換わる関係ではなく、それぞれ違う切り口を提供します。まず「何を軸にするか」だけを並べて眺めておくと、後の個別ページが読みやすくなります。
      </p>

      <DiagramFrame
        slug="design-methodology-axes"
        aspect="660 / 330"
        caption="7つの設計方法論を「何を軸にモジュールを切り出すか」で並べた図。同じ要件から、情報隠蔽は変わりやすい設計判断、データ中心設計はテーブル・スキーマ、オブジェクト中心設計は要求仕様の名詞、契約による設計は責任の分界点、責務駆動設計は役割と協力関係、ユースケース中心設計は利用者のシナリオ、ドメイン駆動設計は業務知識とユビキタス言語を軸に取り出す。"
      />

      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>方法論</th>
            <th>提唱者</th>
            <th>軸にするもの</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1972</td>
            <td>
              <Link href="/design/methodology-info-hiding">情報隠蔽</Link>
            </td>
            <td>David Parnas</td>
            <td>変わりやすい設計判断(秘密)</td>
          </tr>
          <tr>
            <td className="hl">1980年代後半</td>
            <td>
              <Link href="/design/methodology-object-centric">オブジェクト中心設計</Link>
            </td>
            <td>Booch, Coad-Yourdon, Rumbaugh</td>
            <td>要求仕様に出てくる名詞</td>
          </tr>
          <tr>
            <td className="hl">1988</td>
            <td>
              <Link href="/design/methodology-contract">契約による設計</Link>
            </td>
            <td>Bertrand Meyer</td>
            <td>モジュール間の責任の分界点</td>
          </tr>
          <tr>
            <td className="hl">1990年代前半</td>
            <td>
              <Link href="/design/methodology-responsibility-driven">責務駆動設計</Link>
            </td>
            <td>Rebecca Wirfs-Brock</td>
            <td>オブジェクトの責務と協力関係</td>
          </tr>
          <tr>
            <td className="hl">1990年代</td>
            <td>
              <Link href="/design/methodology-data-centric">データ中心設計</Link>
            </td>
            <td>(DB実践の中で普及)</td>
            <td>データモデル(スキーマ)</td>
          </tr>
          <tr>
            <td className="hl">1992</td>
            <td>
              <Link href="/design/methodology-use-case-driven">ユースケース中心設計</Link>
            </td>
            <td>Ivar Jacobson</td>
            <td>利用者とシステムのやり取り</td>
          </tr>
          <tr>
            <td className="hl">2003</td>
            <td>
              <Link href="/design/methodology-ddd">ドメイン駆動設計</Link>
            </td>
            <td>Eric Evans</td>
            <td>業務知識とユビキタス言語</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">方法論は、原則とアーキテクチャに連鎖する</Heading>
      <p>
        どの方法論を選ぶかは、そのまま「どのパラダイムで書くか」「どの<Link href="/design/principles">設計原則</Link>を重視するか」「どの<Link href="/design/architecture">アーキテクチャ</Link>を選ぶか」に連鎖します。
      </p>
      <CardGrid>
        <Card>
          <h4>責務駆動設計</h4>
          <p>
            パラダイムはオブジェクト指向、効いてくる原則はSRPと高凝集低結合、行き着くアーキテクチャはDomain Model。
          </p>
        </Card>
        <Card>
          <h4>データ中心設計</h4>
          <p>
            パラダイムは手続き型寄り、効いてくる原則はSSOT、行き着くアーキテクチャはActive RecordやTable Module。
          </p>
        </Card>
        <Card>
          <h4>ドメイン駆動設計</h4>
          <p>
            パラダイムはオブジェクト指向(値オブジェクトは関数型とも相性が良い)、効いてくる原則は関心の分離とDIP、行き着くアーキテクチャはドメイン中心系やマイクロサービス。
          </p>
        </Card>
      </CardGrid>

      <Analogy label="💡 どれか1つを選ぶものではない">
        実務では、システム全体をDDDで分割しつつ、管理画面のような単純なCRUD部分はデータ中心設計で素早く作る、といった混在がごく普通に起きます。方法論は「このシステムはこれ」と決め打ちするものではなく、扱っている部分の性質に合わせて持ち替える道具だと考えるほうが実態に合います。
      </Analogy>

      <p>
        なお、7つのうち<Term>情報隠蔽</Term>だけは他と少し性格が違い、後続すべての土台になっています。責務駆動設計の「責務」も、DDDの「集約」も、突き詰めれば「何を1つの秘密として閉じ込めるか」という同じ問いへの答えだからです。
      </p>

      <DocsFooter href="/design/methodology" />
    </DocsPage>
  );
}
