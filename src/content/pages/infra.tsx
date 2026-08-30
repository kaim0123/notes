import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "インフラ・クラウド・運用" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="インフラ・クラウド・運用"
      topics={[
        "仮想化とコンテナ",
        "クラウド基礎(AWS/GCP/Cloudflare)",
        "ストレージとバックアップ",
        "監視と障害対応",
        "デプロイと公開",
      ]}
    />
  );
}
