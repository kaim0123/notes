import type { ReactNode } from "react";

// 手順。子に<li>を並べると、番号バッジ付きのカードとして縦に積まれる。
// li側のスタイルは globals.css の .docs-steps に置いている。
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps">{children}</ol>;
}
