import Link from "next/link";
import { getPager, getRelated } from "@/lib/nav";

// 前へ/次へ・関連ページはすべてnav.tsのtreeから機械的に計算する(手動指定しない)。
// ページ追加時にnav.tsのtreeを更新するだけで全ページのフッターが追従する。
export function DocsFooter({ href }: { href: string }) {
  const { prev, next } = getPager(href);
  const related = getRelated(href);

  return (
    <footer className="mt-16 border-t border-border pt-8">
      {related.length > 0 && (
        <div className="mb-8">
          <p className="mb-3 text-[0.8rem] font-medium text-muted-foreground">
            関連ページ
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50"
                >
                  <span>{page.title}</span>
                  <span className="shrink-0 text-[0.75rem] text-muted-foreground">
                    {page.sectionTitle}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(prev || next) && (
        <div className="flex items-stretch justify-between gap-4 text-sm">
          {prev ? (
            <Link
              href={prev.href}
              className="flex flex-1 flex-col rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50"
            >
              <span className="text-[0.75rem] text-muted-foreground">← 前へ</span>
              <span className="text-foreground">{prev.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={next.href}
              className="flex flex-1 flex-col items-end rounded-lg border border-border bg-card px-4 py-3 text-right transition-colors hover:border-primary/50"
            >
              <span className="text-[0.75rem] text-muted-foreground">次へ →</span>
              <span className="text-foreground">{next.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </div>
      )}
    </footer>
  );
}
