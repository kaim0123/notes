import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "データベース" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="データベース"
      topics={[
        "役割と種類・関係モデル",
        "SQLとデータ操作",
        "ER図と正規化",
        "トランザクション",
        "パフォーマンス",
      ]}
    />
  );
}
