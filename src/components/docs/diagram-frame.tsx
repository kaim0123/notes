import type { ReactNode } from "react";
import { readDiagram } from "@/lib/diagrams";

// キャプションは図の代替テキストとして必須(docs/02basic-design/app-basic.md §6参照)。
// sandbox="" によりiframe内のスクリプト実行は不可。
export function DiagramFrame({
  slug,
  caption,
  aspect = "16 / 9",
}: {
  slug: string;
  caption: ReactNode;
  aspect?: string;
}) {
  const html = readDiagram(slug);
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-card">
      <iframe
        sandbox=""
        srcDoc={html}
        title={typeof caption === "string" ? caption : slug}
        className="block h-auto w-full"
        style={{ border: "none", aspectRatio: aspect }}
      />
      <figcaption className="border-t border-border px-4 py-3 text-[0.85rem] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
