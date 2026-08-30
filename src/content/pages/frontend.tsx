import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "フロントエンド" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="フロントエンド"
      topics={[
        "Web基礎",
        "スタイリング",
        "通信とデータ保存",
        "UX・UI",
        "コンポーネントと状態",
      ]}
    />
  );
}
