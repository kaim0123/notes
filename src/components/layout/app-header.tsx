"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function AppHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
    }
  }

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur">
      {searchOpen ? (
        <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center gap-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="タイトル・本文を検索"
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setSearchOpen(false)}
          >
            <X />
            <span className="sr-only">検索を閉じる</span>
          </Button>
        </form>
      ) : (
        <>
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <div className="min-w-0 flex-1">
            <Breadcrumbs />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
            <span className="sr-only">検索</span>
          </Button>
        </>
      )}
    </header>
  );
}
