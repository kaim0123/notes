import type { ReactNode } from "react";

export function Analogy({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border border-border bg-card px-4 py-3.5">
      <p className="mb-1.5 text-[0.8rem] font-medium text-muted-foreground">
        {label}
      </p>
      <p className="text-[0.95rem] leading-relaxed text-foreground">
        {children}
      </p>
    </div>
  );
}

export function Aside({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border-l-2 border-primary bg-card px-4 py-3.5">
      <p className="mb-1.5 text-[0.8rem] font-medium text-primary">{label}</p>
      <p className="text-[0.95rem] leading-relaxed text-foreground">
        {children}
      </p>
    </div>
  );
}
