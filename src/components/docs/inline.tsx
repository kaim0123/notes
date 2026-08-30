import type { ReactNode } from "react";

export function Term({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>;
}
