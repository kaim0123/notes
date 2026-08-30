import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "設計" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="設計"
      topics={[
        "パラダイム",
        "設計原則",
        "アーキテクチャ",
        "設計パターン",
        "コーディング規約",
      ]}
    />
  );
}
