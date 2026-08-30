import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "バックエンド" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="バックエンド"
      topics={[
        "API設計",
        "層に分けて組み立てる",
        "データ層",
        "認証",
        "本番運用",
      ]}
    />
  );
}
