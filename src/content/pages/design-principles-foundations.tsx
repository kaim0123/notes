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
  title: "黎明期の原則",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>黎明期の原則 ― 複雑さを分割する</h1>
        <Lead>
          ソフトウェアが複雑になり始めた1960〜70年代、まず出てきたのは「関心事を分けて考える」という基本姿勢でした。<Term>関心の分離</Term>・<Term>情報隠蔽</Term>・<Term>最小権限の原則</Term>の3つは、今なお設計判断のもっとも土台にある考え方です。
        </Lead>
      </Hero>

      <Heading num="01">3つの原則</Heading>
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
            <td className="hl">1968</td>
            <td>関心の分離</td>
            <td>Edsger W. Dijkstra</td>
            <td>1つの変更が全体へ波及する問題を防ぐため</td>
          </tr>
          <tr>
            <td className="hl">1972</td>
            <td>情報隠蔽</td>
            <td>David Parnas</td>
            <td>実装の変更が利用者へ影響しないモジュール設計を実現するため</td>
          </tr>
          <tr>
            <td className="hl">1975</td>
            <td>最小権限の原則</td>
            <td>Jerome Saltzer, Michael Schroeder</td>
            <td>セキュリティ事故や誤操作の影響を狭めるため</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="design-principles-foundations-three"
        aspect="680 / 290"
        caption="黎明期の3原則を3段構えで示した図。まず関心の分離で、画面・業務・保存が混ざった塊を独立したモジュールへ分ける。次に情報隠蔽で、変わりやすい判断をモジュールの内部に隠し、外へは安定した窓口だけを見せる。最後に最小権限の原則で、呼び出す相手には必要な権限だけを渡す。分ける・隠す・絞るという順に効いてくる。"
      />

      <Heading num="02">関心の分離 ― 1つの変更を1箇所に閉じ込める</Heading>
      <p>
        <Term>関心の分離</Term>は、プログラムを関心事ごとに分割し、それぞれを独立に理解・変更できるようにする考え方です。画面表示・業務ロジック・データ保存を1つの巨大な処理に混在させると、画面のちょっとした変更が業務ロジックやデータ保存の挙動まで壊しかねません。関心事ごとに分けておけば、変更の影響範囲を1箇所に閉じ込められます。
      </p>

      <Heading num="03">情報隠蔽 ― 変わりやすい判断を隠す</Heading>
      <p>
        <Term>情報隠蔽</Term>は関心の分離をさらに具体化し、「変わりやすい設計判断」をモジュールの内部に隠し、外部には安定したインターフェースだけを見せる考え方です。データの保存方法(配列かハッシュマップか、ファイルかDBか)を内部実装として隠しておけば、利用側のコードを変えずに保存方法だけを差し替えられます。この考え方をモジュール分割の軸そのものに据えたのが<Link href="/design/methodology-info-hiding">情報隠蔽による設計</Link>です。
      </p>

      <Heading num="04">最小権限の原則 ― 必要な分だけ渡す</Heading>
      <p>
        <Term>最小権限の原則</Term>はもともとセキュリティの文脈(OSのアクセス制御)で生まれた考え方ですが、ソフトウェア設計にもそのまま応用されます。あるモジュールや関数には、その仕事に必要な最小限の権限・情報だけを与え、それ以上を渡さない ―
        こうすることで、誤操作やバグによる影響範囲を狭められます。
      </p>

      <Analogy label="💡 たとえるなら">
        オフィスの運営に例えると、関心の分離は「経理・営業・開発を別の部署にする」こと、情報隠蔽は「各部署の内部手順は公開せず、依頼窓口だけを外に見せる」こと、最小権限の原則は「新入社員には必要な業務システムの権限だけを渡し、全社の管理者権限は渡さない」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>関心の分離</h4>
          <p>関心事ごとにコードを分け、変更の影響範囲を1箇所に閉じ込める。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>情報隠蔽</h4>
          <p>変わりやすい実装判断を内部に隠し、安定した窓口だけを見せる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最小権限の原則</h4>
          <p>必要な権限・情報だけを渡し、それ以上を渡さない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、この3原則をさらに実践レベルに落とし込んだ<Link href="/design/principles-cohesion">保守性の基本4原則</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/principles-foundations" />
    </DocsPage>
  );
}
