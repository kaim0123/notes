"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBreadcrumbTrail } from "@/lib/nav";

export function Breadcrumbs() {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(pathname);
  const isHome = trail.length === 0;

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem>
          {isHome ? (
            <BreadcrumbPage>ホーム</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<Link href="/">ホーム</Link>} />
          )}
        </BreadcrumbItem>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <Fragment key={crumb.href ?? `${index}-${crumb.label}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className={isLast ? "min-w-0" : undefined}>
                {isLast ? (
                  <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                ) : crumb.href ? (
                  <BreadcrumbLink render={<Link href={crumb.href}>{crumb.label}</Link>} />
                ) : (
                  // インデックスページを持たないグループ階層。リンクにはしない。
                  <span>{crumb.label}</span>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
