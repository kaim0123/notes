import type { Metadata } from "next";
import { RedirectTo } from "@/components/redirect";

export const metadata: Metadata = {
  title: "分散トランザクション",
};

export default function Page() {
  return <RedirectTo href="/database/distributed-transactions" />;
}
