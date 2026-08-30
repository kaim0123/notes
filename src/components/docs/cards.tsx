import type { ReactNode } from "react";

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-3">{children}</div>;
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      {children}
    </div>
  );
}

export function CardNumber({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[0.75rem] font-semibold text-primary-foreground">
      {children}
    </span>
  );
}
