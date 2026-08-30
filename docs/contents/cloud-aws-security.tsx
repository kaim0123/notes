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
        <Eyebrow>AWS</Eyebrow>
        <h1>セキュリティ、アイデンティティ、コンプライアンス ― 「誰が」「何に」「何をできるか」</h1>
        <Lead>
          AWSのあらゆる操作の中心には<Term>IAM</Term>があります。<Link href="/security/authz">認可</Link>ページで見た「誰が・何をしてよいか」という発想を、AWS上のすべてのリソース(EC2・S3・データベースなど)に対して一貫した形で適用する仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">IAM ― 誰に何を許可するか</Heading>
      <p><Term>IAM(Identity and Access Management)</Term>は、AWSリソースへのアクセスを制御するサービスです。中心になるのは次の3つの要素です。</p>

      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ユーザー</td><td>個人やアプリケーションを表す恒久的な認証情報の持ち主。</td></tr>
          <tr><td className="hl">ロール</td><td>特定の作業のために一時的に借りる権限のセット。EC2やLambdaに直接割り当てることが多い。</td></tr>
          <tr><td className="hl">ポリシー</td><td>「誰が(Principal)」「何に(Resource)」「何を(Action)」してよいかをJSONで記述した許可のルール。</td></tr>
        </tbody>
      </table>

      <p>実務では、長期間有効なアクセスキーを持つユーザーを増やすより、必要な時だけ一時的な権限を借りられる<Term>ロール</Term>を使うことが推奨されます。<Term>最小権限の原則(Least Privilege)</Term>― 必要な操作だけを許可し、それ以上は与えない ― は、<Link href="/design/principles">設計原則</Link>ページで見た「関心の分離」と同じく、被害範囲を最初から小さく保つための考え方です。</p>

      <Heading num="02">KMSとSecrets Manager ― 鍵と秘密の管理</Heading>
      <p><Term>KMS(Key Management Service)</Term>は、データを暗号化するための鍵を安全に生成・保管・ローテーションするサービスです。<Link href="/security/auth">認証</Link>ページで見た「パスワードはハッシュ化して保存する」と同様に、「鍵そのものをアプリケーションのコードに直接書かない」ことが原則で、KMSはこの鍵を一元管理する金庫の役割を果たします。</p>
      <p><Term>Secrets Manager</Term>は、データベースの接続情報やAPIキーといった「秘密の値」を保管し、有効期限が来ると自動的にローテーションできるサービスです。似た用途に<Term>Systems Manager Parameter Store</Term>もありますが、Secrets Managerは自動ローテーションに特化している点が違います。ローテーションの仕組みや使い分けの詳細は<Link href="/cloud/aws/security/secrets-manager">Secrets Managerのページ</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        IAMは「オフィスビルの入館証システム」に似ています。社員証(ユーザー)を発行するのではなく、来客用の「今日だけ有効な仮バッジ(ロール)」を渡し、そのバッジには「3階の会議室にだけ入れる(ポリシー)」という制限を細かく設定します。KMSは「鍵の管理室」で、合鍵を勝手に作らせず、誰がいつどの鍵を使ったかを記録しながら管理します。
      </Analogy>

      <Heading num="03">その他のセキュリティサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>WAF(Web Application Firewall)</h4>
          <p><Link href="/security/injection">インジェクション攻撃</Link>や<Link href="/security/xss">XSS</Link>のパターンを検知し、悪意あるリクエストをCloudFrontやALBの手前でブロックする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Shield</h4>
          <p>DDoS攻撃からインフラを保護するサービス。標準機能はすべての利用者に自動で適用される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>GuardDuty</h4>
          <p>アカウント内の不審な挙動(通常と異なるAPI呼び出しなど)を機械学習で検知する脅威検知サービス。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ 複数のAWSアカウントをまとめて統制する「Organizations」や「SCP(Service Control Policy)」は、組織規模が大きくなった段階で登場する。</MarkNote>

      <Heading num="まとめ">「権限」「鍵」「監視」の3本柱</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>IAMがすべての操作の入口</h4><p>ユーザー・ロール・ポリシーの組み合わせで、最小権限の原則を実現する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>KMS・Secrets Managerが秘密を守る</h4><p>暗号鍵や接続情報をコードに埋め込まず、一元管理・自動ローテーションする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>WAF・GuardDutyが外部の脅威を見張る</h4><p>既知の攻撃パターンの遮断と、未知の不審な挙動の検知を分担する。</p></Card>
      </CardGrid>
      <p>誰が何にアクセスできるかを決めたら、次はそのアクセス先である「<Link href="/cloud/aws/database">データベース</Link>」自体の話です。また、実際に何が起きたかを追跡する仕組みは次のページ「<Link href="/cloud/aws/monitoring">モニタリングと管理</Link>」で扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/monitoring" tag="AWS">モニタリングと管理</RelatedLink>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
