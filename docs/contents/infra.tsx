import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "インフラ",
};

const topics = [
  {
    href: "/infra/virtualization",
    title: "仮想化の仕組み",
    desc: "ハイパーバイザー型・コンテナ型 ― 物理基盤を抽象化する技術",
  },
  {
    href: "/infra/container",
    title: "コンテナ",
    desc: "namespaces・cgroupsの仕組みから、Docker・Kubernetes・観測・セキュリティまで",
  },
  {
    href: "/infra/storage",
    title: "ストレージの仕組み",
    desc: "NAS・SAN・RAID・ファイル共有と、バックアップ・復旧",
  },
  {
    href: "/infra/monitoring",
    title: "監視",
    desc: "メトリクス・ログ・トレースと、死活監視・アラート・インシデント対応",
  },
  {
    href: "/infra/incident",
    title: "障害の切り分け",
    desc: "物理からアプリまで階層順に原因を特定する",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>インフラ基盤 ― 仮想化・コンテナ・ストレージ</h1>
        <Lead>
          アプリケーションが実際に載る土台です。物理基盤を抽象化する<Term>仮想化</Term>や<Term>コンテナ</Term>、データを保存・冗長化する<Term>ストレージ</Term>、そしてその土台をどう監視し障害をどう切り分けるかまでを扱います。事業者から借りる<Term>クラウド</Term>は独立した「<Link href="/cloud">クラウド</Link>」セクションにまとめています。
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
