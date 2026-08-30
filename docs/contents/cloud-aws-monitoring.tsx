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
  title: "モニタリングと管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS</Eyebrow>
        <h1>モニタリングと管理 ― 見えないシステムを見えるようにする</h1>
        <Lead>
          クラウド上のリソースは物理的に手で触れられないぶん、「今どう動いているか」「誰が何をしたか」を可視化する仕組みがなければ、障害にも不正操作にも気づけません。<Term>CloudWatch</Term>が「今の状態」を、<Term>CloudTrail</Term>が「誰が何をしたかの記録」を担います。
        </Lead>
      </Hero>

      <Heading num="01">CloudWatch ― 状態を測り、異常を知らせる</Heading>
      <p><Term>CloudWatch</Term>はAWSリソースの状態を継続的に観測するサービスで、役割が異なる3つの機能から成ります。カスタムメトリクスやLogs Insightsによるログ検索の詳細は<Link href="/cloud/aws/monitoring/cloudwatch">CloudWatchのページ</Link>で扱います。</p>

      <table>
        <thead>
          <tr><th>機能</th><th>扱うもの</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メトリクス</td><td>数値の時系列データ</td><td>CPU使用率、リクエスト数、エラー率</td></tr>
          <tr><td className="hl">ログ</td><td>アプリケーションが出力する文字列の記録</td><td>アプリケーションのエラーログ、アクセスログ</td></tr>
          <tr><td className="hl">アラーム</td><td>しきい値超えを検知して通知・自動対応する仕組み</td><td>「CPU使用率が80%を5分超えたら通知する」</td></tr>
        </tbody>
      </table>

      <p>ここで扱う<Term>ログ出力設計</Term>の考え方は、<Link href="/security/logging">セキュリティ側のログ出力設計</Link>ページで見た「異常の予兆に気づき、事後に調査できる記録を残す」という原則がそのままAWS環境にも当てはまります。</p>

      <Heading num="02">CloudTrail ― 「誰が何をしたか」を記録する</Heading>
      <p><Term>CloudTrail</Term>は、AWSアカウント内で行われたすべてのAPI呼び出し(コンソール操作・CLI・SDK経由の操作すべて)を記録する監査ログサービスです。CloudWatchが「システムの健康状態」を見るのに対し、CloudTrailは「誰が、いつ、何を変更したか」という<Term>操作の追跡可能性(トレーサビリティ)</Term>を保証します。セキュリティインシデントが起きた際、まず確認するのがこのCloudTrailの記録です。</p>

      <Analogy label="💡 たとえるなら">
        CloudWatchは「ビルに設置された温度計・人数センサー」に似ています。今の状態をリアルタイムに測り、異常な数値が出たら警報を鳴らします。CloudTrailは「ビルの入退室記録簿」で、後から「誰が何時にどのドアを開けたか」を1件ずつ遡って確認できます。前者は「今、何かおかしくないか」を、後者は「後から、何が起きたか」を担当する、補い合う2つの記録です。
      </Analogy>

      <Heading num="03">その他の管理サービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Systems Manager(SSM)</h4>
          <p>多数のEC2インスタンスへのパッチ適用・コマンド実行を一括管理する。Session Managerを使えばSSHの鍵管理なしに安全にログインできる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Config</h4>
          <p>リソースの設定内容を継続的に記録し、「いつ設定が変わったか」「社内ルールに反していないか」を追跡する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>X-Ray</h4>
          <p>複数サービスをまたぐリクエストの流れを可視化する分散トレーシングサービス。マイクロサービス構成での遅延の原因調査に使う。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ X-Rayは、<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>ページで触れた「サービスが増えるほど、どこで詰まっているか分かりにくくなる」問題への対策の1つ。</MarkNote>

      <Heading num="まとめ">「今の状態」と「過去の記録」の両輪</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>CloudWatchが今を測る</h4><p>メトリクス・ログ・アラームで、システムの健康状態をリアルタイムに把握する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CloudTrailが過去を記録する</h4><p>すべてのAPI呼び出しを記録し、誰が何をしたかを事後に追跡できるようにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Systems Manager・Config・X-Rayが補う</h4><p>日々の運用作業の自動化、設定変更の追跡、リクエストの可視化を分担する。</p></Card>
      </CardGrid>
      <p>最後に、これらのサービスをどう「箱」にまとめてデプロイするかを見るために、次のページでは「<Link href="/cloud/aws/container">コンテナ</Link>」を扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/security" tag="AWS">セキュリティ、アイデンティティ、コンプライアンス</RelatedLink>
                    <RelatedLink href="/cloud/aws/container" tag="AWS">コンテナ</RelatedLink>
                    <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
