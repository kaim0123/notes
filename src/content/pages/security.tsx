import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "セキュリティ" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="セキュリティ"
      topics={[
        "目的と脅威",
        "リスクマネジメント",
        "攻撃手法",
        "暗号技術",
        "認証・認可",
      ]}
    />
  );
}
