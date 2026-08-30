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
  title: "保守性の基本4原則",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>保守性の基本4原則 ― 日々のコーディングの判断基準</h1>
        <Lead>
          <Term>高凝集・低結合</Term>・<Term>KISS</Term>・<Term>DRY</Term>・<Term>YAGNI</Term>は、特定のパラダイムやアーキテクチャを問わず、コードを書くほぼすべての場面で判断基準になる4原則です。<Link href="/design/principles-foundations">黎明期の原則</Link>を、より具体的な行動指針に落とし込んだものと言えます。
        </Lead>
      </Hero>

      <Heading num="01">4つの原則</Heading>
      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>原則</th>
            <th>提唱者</th>
            <th>なぜ生まれたか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1990年代前半</td>
            <td>高凝集・低結合</td>
            <td>多数(体系化は後年)</td>
            <td>保守しやすいモジュール設計を実現するため</td>
          </tr>
          <tr>
            <td className="hl">1995</td>
            <td>KISS</td>
            <td>起源は軍事・工学</td>
            <td>複雑すぎる設計は保守できなくなるため</td>
          </tr>
          <tr>
            <td className="hl">1999</td>
            <td>DRY</td>
            <td>Andy Hunt, Dave Thomas</td>
            <td>知識の重複による保守コストの増加を防ぐため</td>
          </tr>
          <tr>
            <td className="hl">2001</td>
            <td>YAGNI</td>
            <td>Ron Jeffries(XP)</td>
            <td>将来使うか分からない機能を作る無駄を防ぐため</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">高凝集・低結合 ― 近いものは近くに、遠いものは疎に</Heading>
      <p>
        <Term>高凝集</Term>は「1つのモジュールの中身が、互いに関連の強い要素だけで構成されている」状態、<Term>低結合</Term>は「モジュール同士の依存が最小限に保たれている」状態を指します。前ページの関心の分離・情報隠蔽を、モジュール設計の良し悪しを測る指標として言い換えたものです。
      </p>

      <DiagramFrame
        slug="design-principles-cohesion-matrix"
        aspect="620 / 340"
        caption="凝集度と結合度で4つに分けた図。左上の高凝集・低結合が目指す形で、関係の深いものが集まりモジュール間は細い線だけでつながる。右上の高凝集・高結合は中身は整っているが依存が多く常に一緒に変更が必要になる。左下の低凝集・低結合は独立してはいるが1つの機能を直すのに複数箇所を触ることになる。右下の低凝集・高結合が最も避けたい形。"
      />

      <p>
        この2つは同じ操作の裏表です。関係の深いものを1箇所に集めれば、モジュールをまたぐやり取りは自然に減ります。逆に、意味のつながりを無視して機械的にファイルを分けると、凝集は下がり結合は上がります。ファイルを小さくすることと、うまく分けることは別物です。
      </p>

      <Heading num="03">KISS ― 必要以上に複雑にしない</Heading>
      <p>
        <Term>KISS(Keep It Simple, Stupid)</Term>は、同じ問題を解決できるなら、より単純な設計・実装を選ぶという原則です。将来の拡張性を先回りして複雑な抽象化を作り込むと、かえって理解と保守のコストが上がることが多く、次に見るYAGNIとも密接に関係しています。
      </p>

      <Heading num="04">DRY ― 同じ知識を繰り返さない</Heading>
      <p>
        <Term>DRY(Don&apos;t Repeat Yourself)</Term>は、「同じコード」ではなく「同じ知識・仕様」を複数箇所に重複させないという原則です。コードの見た目が似ているだけで背後の仕様が別物なら、無理に共通化するとかえって変更に弱くなります。判断の目安は「その2箇所は、同じ理由で一緒に変更されるか」です。理由が違うなら重複を許します。
      </p>

      <Heading num="05">YAGNI ― 今使わない機能は作らない</Heading>
      <p>
        <Term>YAGNI(You Aren&apos;t Gonna Need It)</Term>は、Extreme Programming(XP)から生まれた原則で、「将来使うかもしれない」という予測だけで機能や抽象化を先回りして作らないという考え方です。KISSが「今ある要件をシンプルに実装する」ことを説くのに対し、YAGNIは「まだない要件のために作り込まない」という、範囲の判断基準です。
      </p>

      <Analogy label="💡 たとえるなら">
        引っ越しに例えると、高凝集・低結合は「同じ部屋で使うものは同じ箱にまとめ、箱同士は独立して運べるようにする」こと、KISSは「必要以上に凝った梱包をしない」こと、DRYは「同じラベルを何枚も手書きせず、1枚のテンプレートを使い回す」こと、YAGNIは「いつか使うかもで不要な家具まで運ばない」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>高凝集・低結合</h4>
          <p>関連の強い要素は同じモジュールに、モジュール間の依存は最小限に。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>KISS</h4>
          <p>同じ問題を解決できるなら、より単純な設計を選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DRY</h4>
          <p>同じコードではなく、同じ知識を複数箇所に重複させない。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>YAGNI</h4>
          <p>将来使うか分からない機能を、先回りして作らない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、この4原則をオブジェクト指向設計に特化する形で体系化した<Link href="/design/principles-solid">SOLID</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/principles-cohesion" />
    </DocsPage>
  );
}
