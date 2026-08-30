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
  title: "黎明期の原則",
};

const rows = [
  { era: "1968", name: "関心の分離(Separation of Concerns)", author: "Edsger W. Dijkstra", why: "1つの変更が全体へ波及する問題を防ぐため" },
  { era: "1972", name: "情報隠蔽(Information Hiding)", author: "David Parnas", why: "実装変更が利用者へ影響しないモジュール設計を実現するため" },
  { era: "1975", name: "最小権限の原則", author: "Jerome Saltzer, Michael Schroeder", why: "セキュリティ事故や誤操作を防ぐため" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計原則 1968-75</Eyebrow>
        <h1>黎明期の原則 ― 複雑さを分割する</h1>
        <Lead>
          ソフトウェアが複雑になり始めた1960〜70年代、まず出てきたのは「関心事を分けて考える」という基本姿勢でした。<Term>関心の分離</Term>・<Term>情報隠蔽</Term>・<Term>最小権限の原則</Term>の3つは、今なお設計判断のもっとも土台にある考え方です。
        </Lead>
      </Hero>

      <Heading num="01">3つの原則</Heading>
      <table>
        <thead>
          <tr><th>年代</th><th>原則</th><th>提唱者</th><th>なぜ生まれたか</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.era}</td>
              <td>{row.name}</td>
              <td>{row.author}</td>
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">関心の分離 ― 1つの変更を1箇所に閉じ込める</Heading>
      <p><Term>関心の分離</Term>は、プログラムを「関心事(concern)」ごとに分割し、それぞれを独立に理解・変更できるようにする考え方です。画面表示・業務ロジック・データ保存を1つの巨大な処理に混在させると、画面のちょっとした変更が業務ロジックやデータ保存の挙動まで壊しかねません。関心事ごとに分割しておけば、変更の影響範囲を1箇所に閉じ込められます。</p>

      <Heading num="03">情報隠蔽 ― 変わりやすい判断を隠す</Heading>
      <p><Term>情報隠蔽</Term>は関心の分離をさらに具体化し、「変わりやすい設計判断」をモジュールの内部に隠し、外部には安定したインターフェースだけを見せる考え方です。例えばデータの保存方法(配列かハッシュマップか、ファイルかDBか)を内部実装として隠しておけば、利用側のコードを変えずに保存方法だけを差し替えられます。</p>

      <Heading num="04">最小権限の原則 ― 必要な分だけ渡す</Heading>
      <p><Term>最小権限の原則</Term>は元々セキュリティの文脈(OSのアクセス制御)で生まれた考え方ですが、ソフトウェア設計にもそのまま応用されます。あるモジュールや関数には、その仕事に必要な最小限の権限・情報だけを与え、それ以上を渡さない ― こうすることで、誤操作やバグによる影響範囲を狭められます。</p>

      <Analogy label="💡 たとえるなら">
        オフィスのオペレーションに例えると、関心の分離は「経理・営業・開発を別の部署にする」こと、情報隠蔽は「各部署の内部手順は公開せず、依頼窓口(インターフェース)だけを外部に見せる」こと、最小権限の原則は「新入社員には必要な業務システムの権限だけを渡し、全社の管理者権限は渡さない」ことに相当します。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>関心の分離</h4><p>関心事ごとにコードを分割し、変更の影響範囲を1箇所に閉じ込める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>情報隠蔽</h4><p>変わりやすい実装判断を内部に隠し、安定したインターフェースだけを見せる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>最小権限の原則</h4><p>必要な権限・情報だけを渡し、それ以上を渡さない。</p></Card>
      </CardGrid>

      <p>次のページでは、この3原則をさらに実践レベルに落とし込んだ<Link href="/design/principles/cohesion">保守性の基本4原則</Link>(高凝集・低結合・KISS・DRY・YAGNI)を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/principles" tag="設計">設計原則一覧</RelatedLink>
                    <RelatedLink href="/design/principles/cohesion" tag="設計">保守性の基本4原則</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/layered" tag="設計">レイヤードアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
