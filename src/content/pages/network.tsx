import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/docs/section-placeholder";

export const metadata: Metadata = { title: "ネットワーク" };

export default function Page() {
  return (
    <SectionPlaceholder
      title="ネットワーク"
      topics={[
        "ネットワークの基礎",
        "ルーティング",
        "スイッチングとLAN",
        "IPサービスとアドレス",
        "セキュリティ・運用・設計",
      ]}
    />
  );
}
