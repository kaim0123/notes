"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NotebookText,
  Home,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  sections,
  isSectionActive,
  normalizePath,
  type NavNode,
  type NavSection,
} from "@/lib/nav";

function nodeKey(node: NavNode, parentKey: string) {
  return `${parentKey}/${node.href ?? node.title}`;
}

function containsPath(node: NavNode, pathname: string): boolean {
  if (node.href && (pathname === node.href || pathname.startsWith(`${node.href}/`))) {
    return true;
  }
  return node.children?.some((child) => containsPath(child, pathname)) ?? false;
}

const depthTextClass = ["text-sm font-medium", "text-sm text-sidebar-foreground/80", "text-[13px] text-sidebar-foreground/65"];

function NavTree({
  nodes,
  pathname,
  parentKey,
  depth,
  overrides,
  onToggle,
  onNavigate,
}: {
  nodes: NavNode[];
  pathname: string;
  parentKey: string;
  depth: number;
  overrides: Record<string, boolean>;
  onToggle: (key: string, currentOpen: boolean) => void;
  onNavigate: () => void;
}) {
  const textClass = depthTextClass[Math.min(depth, depthTextClass.length - 1)];

  return (
    <ul
      className={cn(
        "flex flex-col gap-0.5",
        depth > 0 && "ml-3 border-l-2 border-sidebar-primary/60 pl-3"
      )}
    >
      {nodes.map((node) => {
        const key = nodeKey(node, parentKey);
        const hasChildren = !!node.children?.length;
        const isOpen = overrides[key] ?? containsPath(node, pathname);
        const isActive = node.href === pathname;

        const chevron = (
          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-sidebar-foreground/40 transition-transform duration-150",
              isOpen && "rotate-90"
            )}
          />
        );

        return (
          <li key={key}>
            {hasChildren && node.href ? (
              // 索引ページを持つグループ。ラベルはページへのリンク、開閉は右の
              // シェブロンだけに割り当てる(リンクとトグルを両立させる)。
              <div className="flex min-w-0 items-center">
                <Link
                  href={node.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex min-w-0 flex-1 items-center truncate rounded-md px-2 py-1.5",
                    textClass,
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
                      : "hover:bg-sidebar-accent/60"
                  )}
                >
                  <span className="truncate">{node.title}</span>
                </Link>
                <button
                  type="button"
                  aria-label={`${node.title}の下位ページを${isOpen ? "閉じる" : "開く"}`}
                  aria-expanded={isOpen}
                  onClick={() => onToggle(key, isOpen)}
                  className="shrink-0 cursor-pointer rounded-md p-1.5 hover:bg-sidebar-accent/60"
                >
                  {chevron}
                </button>
              </div>
            ) : hasChildren ? (
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => onToggle(key, isOpen)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onToggle(key, isOpen);
                  }
                }}
                className="flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/60"
              >
                <span className={cn("min-w-0 flex-1 truncate", textClass)}>
                  {node.title}
                </span>
                {chevron}
              </div>
            ) : (
              <Link
                href={node.href!}
                onClick={onNavigate}
                className={cn(
                  "flex min-w-0 items-center truncate rounded-md px-2 py-1.5",
                  textClass,
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
                    : "hover:bg-sidebar-accent/60"
                )}
              >
                <span className="truncate">{node.title}</span>
              </Link>
            )}
            {hasChildren && isOpen && (
              <NavTree
                nodes={node.children!}
                pathname={pathname}
                parentKey={key}
                depth={depth + 1}
                overrides={overrides}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SectionFlyout({
  section,
  onNavigate,
}: {
  section: NavSection;
  onNavigate: () => void;
}) {
  // trailingSlash: true のため usePathname() は末尾スラッシュ付きで返る。
  // nav の href と直接比較するので正規化しておく。
  const pathname = normalizePath(usePathname());
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});

  const handleToggle = React.useCallback((key: string, currentOpen: boolean) => {
    setOverrides((prev) => ({ ...prev, [key]: !(prev[key] ?? currentOpen) }));
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <section.icon className="text-sidebar-foreground/70 size-4 shrink-0" />
        <span className="truncate text-sm font-semibold">{section.title}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <Link
          href={section.href}
          onClick={onNavigate}
          className={cn(
            "mb-1 flex items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            pathname === section.href &&
              "bg-sidebar-accent text-sidebar-primary shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
          )}
        >
          目次
        </Link>
        {section.tree.length > 0 && (
          <NavTree
            nodes={section.tree}
            pathname={pathname}
            parentKey={section.href}
            depth={0}
            overrides={overrides}
            onToggle={handleToggle}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const [openSection, setOpenSection] = React.useState<string | null>(null);
  const flyoutRef = React.useRef<HTMLDivElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!openSection || isMobile) return;
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        flyoutRef.current?.contains(target) ||
        railRef.current?.contains(target)
      ) {
        return;
      }
      setOpenSection(null);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenSection(null);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSection, isMobile]);

  const activeSection = sections.find((section) => section.href === openSection);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link href="/" onClick={() => setOpenSection(null)}>
                  <NotebookText className="text-primary" />
                  <span className="truncate text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
                    notes
                  </span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div ref={railRef} className="contents">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/"}
                    tooltip="ホーム"
                    render={
                      <Link href="/" onClick={() => setOpenSection(null)}>
                        <Home />
                        <span className="truncate group-data-[collapsible=icon]:hidden">
                          ホーム
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mx-0" />

          <SidebarGroup>
            <SidebarGroupLabel>セクション</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.map((section) => {
                  const hasPages = section.tree.length > 0;
                  const isOpen = openSection === section.href;
                  return (
                    <SidebarMenuItem key={section.href}>
                      {hasPages ? (
                        <SidebarMenuButton
                          isActive={isSectionActive(section, pathname)}
                          tooltip={section.title}
                          className={cn(isOpen && "bg-sidebar-accent text-sidebar-primary shadow-[inset_2px_0_0_0_var(--sidebar-primary)]")}
                          onClick={() =>
                            setOpenSection((prev) =>
                              prev === section.href ? null : section.href
                            )
                          }
                        >
                          <section.icon />
                          <span className="truncate group-data-[collapsible=icon]:hidden">
                            {section.title}
                          </span>
                          <ChevronRight className="ml-auto size-4 shrink-0 text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden" />
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          isActive={isSectionActive(section, pathname)}
                          tooltip={section.title}
                          render={
                            <Link href={section.href} onClick={() => setOpenSection(null)}>
                              <section.icon />
                              <span className="truncate group-data-[collapsible=icon]:hidden">
                                {section.title}
                              </span>
                            </Link>
                          }
                        />
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail />

      {activeSection && !isMobile && (
        <div
          ref={flyoutRef}
          className="bg-sidebar fixed inset-y-0 z-30 w-64 border-r shadow-lg"
          style={{
            left: state === "collapsed" ? "var(--sidebar-width-icon)" : "var(--sidebar-width)",
          }}
        >
          <SectionFlyout section={activeSection} onNavigate={() => {}} />
        </div>
      )}

      {activeSection && isMobile && (
        <div className="bg-sidebar absolute inset-0 z-30 flex flex-col">
          <button
            type="button"
            onClick={() => setOpenSection(null)}
            className="hover:bg-sidebar-accent flex h-12 shrink-0 items-center gap-2 border-b px-3 text-sm"
          >
            <ChevronLeft className="size-4" />
            戻る
          </button>
          <div className="min-h-0 flex-1">
            <SectionFlyout
              section={activeSection}
              onNavigate={() => setOpenSection(null)}
            />
          </div>
        </div>
      )}
    </Sidebar>
  );
}
