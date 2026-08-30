import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "基礎理論" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="基礎理論"
      topics={[
        "数と基数変換",
        "論理と真理値表",
        "確率・統計と情報理論",
        "アルゴリズムとデータ構造",
        "情報メディア",
      ]}
    />
  );
}
