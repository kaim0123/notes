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
  title: "Secrets Manager",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; セキュリティ、アイデンティティ、コンプライアンス</Eyebrow>
        <h1>Secrets Manager ― 秘密の値を保管し、自動でローテーションする</h1>
        <Lead>
          <Term>Secrets Manager</Term>は、データベースの接続情報やAPIキーといった「秘密の値」を安全に保管し、有効期限が来ると自動的に値を作り替える<Term>ローテーション</Term>までこなすサービスです。<Link href="/security/auth">認証</Link>ページで見た「パスワードをコードに直接書かない」原則を、アプリケーションが使うあらゆる秘密情報に広げたものと考えられます。
        </Lead>
      </Hero>

      <Heading num="01">保管の仕組み ― KMSによる暗号化</Heading>
      <p>保管される秘密の値は<Link href="/cloud/aws/security">KMS</Link>によって暗号化された状態でディスクに保存され、アプリケーションがAPI経由で取得するときだけ復号されます。秘密の値そのものをコードやコンテナイメージ、環境変数に直接埋め込む必要がなくなり、コードリポジトリへの誤コミットのようなうっかりミスによる漏洩リスクを減らせます。</p>

      <Heading num="02">自動ローテーション</Heading>
      <p>RDS・Redshift・DocumentDBなどAWSのマネージド型データベースに対しては、あらかじめ用意された<Term>ローテーション用のLambda関数</Term>を使うだけで、パスワードの変更とデータベース側への反映を、指定した周期で完全に自動化できます。独自のAPIキーなど対応していない秘密については、自分でローテーション用のLambda関数を書いて登録することもできます。ローテーション中も新旧の値を一時的に両立させる仕組みがあり、アプリケーションが一瞬でも認証に失敗する空白期間が生まれないよう設計されています。</p>

      <Heading num="03">Parameter Storeとの使い分け</Heading>
      <table>
        <thead>
          <tr><th></th><th>Secrets Manager</th><th>Systems Manager Parameter Store</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自動ローテーション</td><td>対応(RDS等はほぼ設定だけで完了)</td><td>非対応(自分で仕組みを作る必要がある)</td></tr>
          <tr><td className="hl">料金</td><td>保管する秘密の数とAPI呼び出しに応じて課金</td><td>標準パラメータは無料、高度な機能のみ有料</td></tr>
          <tr><td className="hl">クロスアカウント共有</td><td>リソースポリシーで柔軟に共有できる</td><td>やや制約が大きい</td></tr>
          <tr><td className="hl">向いている用途</td><td>DB接続情報など定期的な更新が必要な秘密</td><td>頻繁に変えない設定値や、コスト重視の秘密情報</td></tr>
        </tbody>
      </table>

      <Heading num="04">取得コストを抑えるキャッシュ</Heading>
      <p>Secrets ManagerへのAPI呼び出しにはレイテンシーと料金がかかるため、リクエストのたびに毎回取得しにいくのは非効率です。実務では、公式が提供する<Term>キャッシュライブラリ</Term>をアプリケーション側に組み込み、一定時間だけ値をメモリ上に保持してから、ローテーションのタイミングに合わせて取得し直す構成が推奨されます。</p>

      <Analogy label="💡 たとえるなら">
        Secrets Managerは「定期的に暗証番号を変えてくれる金庫」です。金庫の暗証番号(秘密の値)は自分で覚えて紙に書いておく必要がなく、金庫自身が期限になると新しい番号に自動で変更し、関係者全員(接続先のデータベースなど)にもその変更を伝えてくれます。KMSはこの金庫を作っている錠前そのものにあたります。
      </Analogy>

      <Heading num="まとめ">Secrets Managerが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>秘密の値をコードから切り離す</h4><p>KMSで暗号化して保管し、コードやイメージへの直書きを避けられる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>自動ローテーションでパスワード変更を自動化する</h4><p>RDS等はほぼ設定だけで、値の変更とDB側への反映を継続的に自動化できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Parameter Storeとはコストと機能で使い分ける</h4><p>ローテーションが必要な秘密はSecrets Manager、それ以外はコスト重視でParameter Storeを検討する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/security" tag="AWS">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/aws/database" tag="AWS">データベース</RelatedLink>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
