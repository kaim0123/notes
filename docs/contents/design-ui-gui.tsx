import type { Metadata } from "next";
import { RedirectTo } from "@/components/redirect";

export const metadata: Metadata = {
  title: "移動しました",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RedirectTo href="/dev/frontend/ux/gui" />;
}
