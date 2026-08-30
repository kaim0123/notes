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
  title: "データ中心設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>データ中心設計 ― スキーマを最初に固める</h1>
        <Lead>
          <Term>データ中心設計</Term>は、業務ロジックよりも先に<Term>データモデル(テーブル・スキーマ)</Term>を固め、ロジックはそのデータ構造の周りに後付けするという考え方です。特定の提唱者がいる理論というより、エンタープライズのDB実践の中で自然に広まった、実務先行の方法論です。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p>
        データ中心設計では、「このシステムはどんなデータを、どんな形(テーブル・カラム・関連)で持つか」を最初の設計判断とします。業務ロジックは、そのデータに対するCRUD操作や、テーブルをまたぐ集計・レポートとして表現されます。振る舞いよりデータ構造を先に固めるという点で、<Link href="/design/methodology-responsibility-driven">責務駆動設計</Link>とは出発点が逆です。
      </p>

      <DiagramFrame
        slug="design-methodology-data-centric-order"
        aspect="660 / 280"
        caption="データ中心設計とドメイン中心の設計手順の比較。左のデータ中心設計はテーブル設計を最初に固め、CRUD処理、画面の順に進むため見通しは良いが、業務ルールが各所のCRUDに薄く分散しやすい。右のドメイン中心は業務ルールのモデルを最初に決め、保存の仕方、テーブルの順に進むため業務ルールが1箇所に集まるが、単純なCRUDには重い。"
      />

      <Heading num="02">得意な領域と不得意な領域</Heading>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">得意</td>
            <td>CRUD中心の業務システム、ダッシュボードや分析基盤、ETLパイプラインなど、業務ルールが比較的単純でデータ構造が主役の領域</td>
          </tr>
          <tr>
            <td className="hl">不得意</td>
            <td>業務ルールが複雑に絡み合うドメイン。ロジックがデータアクセス処理のあちこちに分散し、「誰がこの値を正しいと保証しているのか」が追いにくくなる</td>
          </tr>
        </tbody>
      </table>

      <p>
        データ中心設計は<Link href="/design/architecture-app-data-access">データアクセス系アーキテクチャ</Link>のActive RecordやTable Moduleと特に相性が良く、ORMがテーブル1つに対応するオブジェクトを自動生成する現代の開発体験も、この発想を色濃く引き継いでいます。テーブル設計そのものについては<Link href="/database/design">ER図と正規化</Link>で扱っています。
      </p>

      <Analogy label="💡 たとえるなら">
        まず倉庫の棚割りを完璧に決めてから、何をどう出し入れするかを後から考えるようなものです。棚割りさえ正しければ在庫管理はシンプルになりますが、「この商品は状況によって置き場所のルールが変わる」といった複雑な業務ルールが増えると、棚割りだけでは表現しきれなくなります。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>
        スキーマという唯一の信頼できる情報源を先に固定できるため、設計初期の見通しがよく、SQLベースの分析やレポーティングとの相性も抜群です。一方で、業務ルールが後から複雑化すると、ロジックが各所のCRUD処理に薄く広く分散する<Term>貧血ドメインモデル</Term>に陥りやすく、この弱点への回答として<Link href="/design/methodology-ddd">ドメイン駆動設計</Link>が生まれました。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>スキーマが先、ロジックは後</h4>
          <p>テーブル構造を最初に固定し、業務ロジックはその周りに実装する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>CRUD・分析基盤に強い</h4>
          <p>単純な業務ルールやレポーティング用途では今も現役。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>複雑な業務ルールには不向き</h4>
          <p>ロジックの分散を招きやすく、DDDが対抗する形で生まれた。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/methodology-data-centric" />
    </DocsPage>
  );
}
