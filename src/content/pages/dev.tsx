import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "開発の進め方" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="開発の進め方"
      topics={[
        "開発プロセス",
        "開発環境とツール",
        "Git・CI/CD",
        "デバッグと性能改善",
      ]}
    />
  );
}
