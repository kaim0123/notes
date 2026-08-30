import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "コンピュータ・OS" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="コンピュータ・OS"
      topics={[
        "ハードウェアの基礎",
        "CPU",
        "メモリ",
        "OSの仕組み(プロセス・記憶管理・ファイルシステム)",
      ]}
    />
  );
}
