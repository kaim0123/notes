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
  Mark,
  MarkNote,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "セキュリティ、アイデンティティ、コンプライアンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>セキュリティ、アイデンティティ、コンプライアンス ― 「誰が」「何に」「何をできるか」</h1>
        <Lead>
          GCPのあらゆる操作の中心には<Term>IAM</Term>があります。<Link href="/security/authz">認可</Link>ページで見た「誰が・何をしてよいか」という発想を、GCP上のすべてのリソースに対して一貫した形で適用する仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">IAM ― 誰に何を許可するか</Heading>
      <p><Term>IAM(Identity and Access Management)</Term>は、GCPリソースへのアクセスを制御するサービスで、AWSのIAMと同じ概念です。GCPでは<Term>Principal</Term>(誰が)に<Term>Role</Term>(何ができるか)を<Term>Policy</Term>で割り当てます。</p>

      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Googleアカウント / グループ</td><td>人間の利用者。Organizationやプロジェクトにロールを付与する。</td></tr>
          <tr><td className="hl">サービスアカウント</td><td>アプリケーションやVMが使う非人間のアイデンティティ。AWSのIAMロールに近い使い方。</td></tr>
          <tr><td className="hl">ロール</td><td>権限の束。基本ロール(owner/editor/viewer)より、サービス別の<Term>事前定義ロール</Term>を使うのが推奨。</td></tr>
        </tbody>
      </table>

      <p>実務では、長期間有効な鍵(JSONキー)をサービスアカウントに付与するより、<Term>Workload Identity</Term>や<Term>短期トークン</Term>で一時的な権限を借りることが推奨されます。<Term>最小権限の原則</Term>は<Link href="/design/principles">設計原則</Link>ページで見た「関心の分離」と同じく、被害範囲を小さく保つための考え方です。</p>

      <Heading num="02">Cloud KMSとSecret Manager ― 鍵と秘密の管理</Heading>
      <p><Term>Cloud KMS(Key Management Service)</Term>は、データを暗号化するための鍵を安全に生成・保管・ローテーションするサービスで、AWSの<Term>KMS</Term>に相当します。</p>
      <p><Term>Secret Manager</Term>は、データベースの接続情報やAPIキーといった「秘密の値」を保管し、有効期限が来ると自動的にローテーションできるサービスで、AWSの<Term>Secrets Manager</Term>に相当します。詳細は<Link href="/cloud/gcp/security/secret-manager">Secret Managerのページ</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        IAMは「オフィスビルの入館証システム」、Cloud KMSは「鍵の管理室」、Secret Managerは「金庫に入れた封筒(接続情報)を、必要な時だけ中身を見せる仕組み」です。
      </Analogy>

      <Heading num="03">その他のセキュリティサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud Armor</h4>
          <p>Cloud Load Balancingの手前でDDoSや<Term>WAF</Term>ルールを適用し、悪意あるリクエストをブロックする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Security Command Center</h4>
          <p>プロジェクト全体の脆弱性・不審な設定を一覧し、セキュリティ posture を可視化する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Identity-Aware Proxy(IAP)</h4>
          <p>VPNなしで、Googleアカウントによる認可だけで内部アプリへHTTPSアクセスを許可する。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Organization Policyで「外部IPを付けられない」「特定リージョン以外にリソースを作れない」といった組織全体の制約を課せる。</MarkNote>

      <Heading num="まとめ">「権限」「鍵」「監視」の3本柱</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>IAMがすべての操作の入口</h4><p>Principal・Role・Policyの組み合わせで、最小権限の原則を実現する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud KMS・Secret Managerが秘密を守る</h4><p>暗号鍵や接続情報をコードに埋め込まず、一元管理・自動ローテーションする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud Armor・Security Command Centerが脅威を見張る</h4><p>外部攻撃の遮断と、設定ミス・脆弱性の検知を分担する。</p></Card>
      </CardGrid>
      <p>次は「<Link href="/cloud/gcp/database">データベース</Link>」、その後「<Link href="/cloud/gcp/monitoring">モニタリングと管理</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/monitoring" tag="Google Cloud">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/cloud/gcp/network" tag="Google Cloud">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/security" tag="AWS">セキュリティ(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
