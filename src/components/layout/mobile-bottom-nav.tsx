"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { sections, isSectionActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/95 fixed inset-x-0 bottom-0 z-10 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="flex overflow-x-auto">
        <li className="shrink-0">
          <Link
            href="/"
            className={cn(
              "flex w-16 flex-col items-center gap-1 py-2 text-[11px]",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="size-5" />
            <span className="truncate">ホーム</span>
          </Link>
        </li>
        {sections.map((section) => {
          const active = isSectionActive(section, pathname);
          return (
            <li key={section.href} className="shrink-0">
              <Link
                href={section.href}
                className={cn(
                  "flex w-16 flex-col items-center gap-1 py-2 text-[11px]",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <section.icon className="size-5" />
                <span className="truncate">{section.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
