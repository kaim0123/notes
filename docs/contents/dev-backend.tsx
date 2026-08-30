import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "バックエンド",
};

const topics = [
  { href: "/dev/backend/api", title: "APIとは", desc: "窓口・バックエンド・DBの違い ― どこまでがAPIなのか" },
  { href: "/dev/backend/api/styles", title: "APIの種類と選び方", desc: "REST・GraphQL・gRPC ― 何を基準に選ぶか" },
  { href: "/dev/backend/api/rest", title: "REST API", desc: "リソースとHTTPメソッドで表現する設計スタイル" },
  { href: "/dev/backend/api/design", title: "API設計（LSUD / SSKD）", desc: "誰向けの窓口か ― 公開と内部で設計の優先順位が変わる" },
  { href: "/dev/backend/api/orchestration", title: "オーケストレーションとBFF", desc: "コアAPIと画面の間に挟む、SSKD向けの組み立て層" },
  { href: "/dev/backend/api/openapi", title: "OpenAPIと契約", desc: "LSUD向けAPIの説明書を機械可読に固定する" },
  { href: "/dev/backend/express", title: "Express", desc: "Node.jsで最小のHTTPサーバーを立て、ルーティングを組む" },
  { href: "/dev/backend/express/middleware", title: "ミドルウェアとエラー処理", desc: "リクエストが通る一本道 ― 共通処理をどこに置くか" },
  { href: "/dev/backend/express/design", title: "API設計・認証・DB連携", desc: "実運用に必要な設計判断とデータベースとの接続" },
  { href: "/dev/backend/layers", title: "層に分けて組み立てる", desc: "ルーター・ユースケース・リポジトリ ― 設計をコードの構造に落とす" },
  { href: "/dev/backend/data/transaction", title: "データ層", desc: "トランザクション境界・コネクションプール・マイグレーション" },
  { href: "/dev/backend/jobs", title: "非同期処理", desc: "ジョブキューとワーカー・サーバーサイドキャッシュ" },
  { href: "/dev/backend/upload", title: "機能実装", desc: "ファイルアップロード・メール送信と通知" },
  { href: "/dev/backend/auth/token", title: "認証", desc: "トークンの運用・外部IdP連携・パスワードとアカウント回復" },
  { href: "/dev/backend/ops/rate-limit", title: "本番運用", desc: "レート制限・障害の遮断・起動と停止・トレーシング・テスト" },
  { href: "/dev/frontend", title: "フロントエンド", desc: "APIを呼ぶ側 ― 画面側の実装(フロントエンドセクション)" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>バックエンド</h1>
        <Lead>
          画面の向こう側でリクエストを受け取り、データを返すサーバー側の実装です。まず「APIとは何か」を押さえてから、REST
          APIの設計、Node.js上のExpressによる実装(ルーティング・ミドルウェア・認証・データベース連携)へと進みます。データベースそのものは<Link href="/database">データベース</Link>セクション、サーバーの運用は<Link href="/infra">インフラ</Link>セクションで扱います。
        </Lead>
      </Hero>

      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter />
    </DocsPage>
  );
}
