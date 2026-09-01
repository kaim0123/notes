import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "セキュリティ、アイデンティティ、コンプライアンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>セキュリティとアイデンティティ ― 階層に沿って引き継がれる</h1>
        <Lead>
          権限の考え方は<Link href="/infra/aws-security">AWS</Link>と共通です ― <strong>誰が、何に、何をできるか</strong>を書き、サービス自身にも同じ枠組みで権限を与えて鍵の配布をなくす。違いは、権限が<Term>組織・フォルダ・プロジェクトという階層に沿って引き継がれる</Term>点です。上位で与えたものは下位で取り消せないため、<strong>どの高さで与えるか</strong>が設計の中心になります。
        </Lead>
      </Hero>

      <Heading num="01">上から下へ引き継がれる</Heading>

      <DiagramFrame
        slug="infra-gcp-security-iam"
        aspect="700 / 300"
        caption="権限が階層に沿って引き継がれる仕組み。組織全体に与えた権限は配下のすべてのフォルダとプロジェクト、その中の資源にまで及ぶ。フォルダに与えた権限は配下のプロジェクトへ、プロジェクトに与えた権限はその中の資源へ引き継がれる。上位で与えた強い権限は下位で取り消せないため、広い範囲へ与える権限ほど慎重に選び、原則として最も狭い範囲へ与える。"
      />

      <p>
        実務の原則は明快です ― <strong>いちばん狭い範囲に与える</strong>。上位に置いてよいのは、監査のように本当に全体で必要なものだけです。「面倒だから組織に付けておく」は、後から絞り込めない負債になります。
      </p>

      <Heading num="02">鍵を配らない</Heading>
      <p>
        アプリが使う認証情報も、鍵ファイルを配布するのではなく<strong>実行しているリソースに役割を割り当てる</strong>形にします。鍵ファイルは有効期限が無く、漏れたときの影響が大きいので、<strong>生成しないで済むならしない</strong>のが最善です。
      </p>
      <p>
        外部のサービスから接続する場合も、長期の鍵を渡す代わりに<strong>信頼関係を結んで短命な資格情報を受け取る</strong>方式が用意されています。<Link href="/security/token">トークンの全体像</Link>で見た発想が、事業者をまたいで適用されている形です。
      </p>

      <Aside label="役割は、まとめて与えて絞る">
        既製の役割は便利ですが、必要以上に広いことがあります。実務では、まず既製のもので動かし、<strong>実際に使われた権限を見て絞る</strong>という順序が現実的です。最初から最小を狙うと、動かない原因の切り分けに時間を取られます。
      </Aside>

      <Heading num="03">鍵と記録</Heading>
      <p>
        暗号鍵は鍵管理のサービスに預け、<strong>鍵そのものを取り出さずに</strong>暗号化と復号を依頼します。秘密の値は<Link href="/infra/gcp-secret-manager">Secret Manager</Link>へ。そして操作の記録は既定で残りますが、<strong>保存期間と保存先</strong>は明示的に決めます ― 記録を消せる権限を持つ人が自分の痕跡を消せる構成では、記録の意味が半減します。
      </p>

      <Heading num="まとめ">高さを間違えない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>与える高さが設計</h4><p>上位で与えたものは下位で取り消せない。いちばん狭い範囲へ与える。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>鍵ファイルを作らない</h4><p>リソースに役割を割り当てる。外部連携も短命な資格情報で。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>記録は消せない場所へ</h4><p>保存期間と保存先を決めて初めて、記録は証拠になる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-security" />
    </DocsPage>
  );
}
