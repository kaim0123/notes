import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "テスト" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="テスト"
      topics={[
        "品質戦略とテストピラミッド",
        "Unit・Integration・E2E",
        "TDD",
        "コードレビュー",
      ]}
    />
  );
}
