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
  title: "データベース",
};

const topics = [
  { href: "/database/basics", title: "役割と種類", desc: "なぜファイルではなくDBMSを使うのか。関係DB・NoSQLなど方式の概要" },
  { href: "/database/model", title: "関係モデルと3層スキーマ", desc: "テーブル・キー・関連と、外部・概念・内部スキーマ" },
  { href: "/database/design", title: "ER図と正規化", desc: "要件からエンティティを抽出し、テーブルを段階的に分割する" },
  { href: "/database/sql", title: "SQLとデータ操作", desc: "DDL・DMLと、SELECT・JOIN・集計の基本" },
  { href: "/database/transaction", title: "トランザクションと整合性", desc: "ACID・ロック・分離レベル・ログ・バックアップ" },
  { href: "/database/distributed-transactions", title: "分散トランザクション", desc: "2PC・Saga・TCC と結果整合性" },
  { href: "/database/index", title: "索引とアクセス制御", desc: "B-treeインデックスの考え方とアクセス権限(発展)" },
  { href: "/database/physical", title: "物理設計と運用", desc: "インデックス・RAID・レプリケーション・バックアップ・リカバリ" },
  { href: "/database/performance", title: "パフォーマンスチューニング", desc: "インデックス設計・オプティマイザ・パーティションで遅いクエリを速くする" },
  { href: "/database/features", title: "アプリ機能とDB設計", desc: "検索・タイムライン・通知など機能別に押さえるDBの検討事項" },
  { href: "/database/antipattern", title: "設計のアンチパターン", desc: "避けるべき設計と、条件つきで許されるグレーノウハウ" },
  { href: "/database/history", title: "データベースの歴史", desc: "階層型・網型からRDB、そしてNoSQLへの流れ" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>データベース</h1>
        <Lead>
          データを一箇所で安全に共有し、複数の利用者が同時に使っても矛盾が起きないようにする仕組みがデータベースです。役割と種類から、関係モデル・設計・SQL・トランザクションまで、試験でも実務でも土台になる考え方を順に見ていきます。より開発者寄りの物理設計・運用は「開発」セクションの「データベース」で扱います。
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
