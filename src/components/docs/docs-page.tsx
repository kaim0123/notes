import type { ReactNode } from "react";

export function DocsPage({ children }: { children: ReactNode }) {
  return (
    <div className="docs-content mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      {children}
    </div>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return <div className="mb-10">{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-[0.85rem] font-medium text-primary">{children}</p>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function Heading({
  num,
  children,
}: {
  num: string;
  children: ReactNode;
}) {
  return (
    <h2 className="mt-14 mb-4 flex items-baseline gap-3 text-xl font-semibold tracking-tight text-foreground first:mt-0">
      <span className="font-mono text-[0.8rem] font-normal text-primary">
        {num}
      </span>
      {children}
    </h2>
  );
}
