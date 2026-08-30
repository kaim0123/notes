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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Secret Manager",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud &middot; セキュリティ、アイデンティティ、コンプライアンス</Eyebrow>
        <h1>Secret Manager ― APIキーや接続情報を安全に保管する</h1>
        <Lead>
          <Term>Secret Manager</Term>は、データベースの接続文字列やAPIキーといった「秘密の値」を安全に保管し、アプリケーションが必要なときだけ取得できるようにするサービスで、AWSの<Term>Secrets Manager</Term>に相当します。
        </Lead>
      </Hero>

      <Heading num="01">秘密をコードに埋め込まない</Heading>
      <p>保管される秘密の値は<Link href="/cloud/gcp/security">Cloud KMS</Link>によって暗号化された状態で保存され、アプリケーションがAPI経由で取得するときだけ復号されます。秘密の値そのものをコードやコンテナイメージ、環境変数に直接埋め込む必要がなくなり、リポジトリへの誤コミットによる漏洩リスクを減らせます。</p>

      <Heading num="02">バージョン管理とローテーション</Heading>
      <p>Secret Managerは秘密の値を<Term>バージョン</Term>単位で管理します。新しい接続情報に更新するときは新バージョンを追加し、アプリケーションは<Term>latest</Term>または固定バージョンを参照します。<Link href="/cloud/gcp/database">Cloud SQL</Link>など一部のサービスでは、ローテーション用のCloud Functionsと連携してパスワード変更を自動化できます。</p>

      <Heading num="03">アクセス制御</Heading>
      <p>秘密へのアクセスは<Term>IAM</Term>の<code>secretmanager.versions.access</code>権限で制御します。<Term>Cloud Run</Term>や<Term>Cloud Functions</Term>には<Term>サービスアカウント</Term>に最小限の権限だけを付与し、そのサービスアカウント経由でSecret Managerから値を読み取るのが定石です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/security" tag="Google Cloud">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/gcp/database" tag="Google Cloud">データベース</RelatedLink>
                    <RelatedLink href="/cloud/aws/security/secrets-manager" tag="AWS">Secrets Manager</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
