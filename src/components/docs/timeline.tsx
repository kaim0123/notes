import type { ReactNode } from "react";

// 年表。項目数が増えても崩れないよう縦並びにし、左のレールに沿って
// 年代(era)と出来事を積む。
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="my-6 ml-1 list-none space-y-0 border-l border-border pl-0">
      {children}
    </ol>
  );
}

export function TimelineItem({
  era,
  children,
}: {
  era: string;
  children: ReactNode;
}) {
  return (
    <li className="relative list-none py-2.5 pl-6">
      <span className="absolute top-[1.05rem] left-0 size-2 -translate-x-1/2 rounded-full bg-primary" />
      <span className="block font-mono text-[0.75rem] text-primary">{era}</span>
      <span className="block text-[0.95rem] leading-relaxed text-foreground">
        {children}
      </span>
    </li>
  );
}

// 年表全体に添える補足(何を示した年表なのかの一文)。
export function TimelineLabel({ children }: { children: ReactNode }) {
  return (
    <p className="-mt-2 mb-6 text-[0.85rem] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
