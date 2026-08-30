"use client";

import { useEffect, useState, useTransition } from "react";

type PagefindResultData = {
  url: string;
  excerpt: string;
  meta: { title?: string };
};

type PagefindResult = {
  data: () => Promise<PagefindResultData>;
};

type PagefindApi = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
  init?: () => Promise<void>;
};

declare global {
  interface Window {
    pagefind?: PagefindApi;
  }
}

async function loadPagefind(): Promise<PagefindApi> {
  if (!window.pagefind) {
    window.pagefind = await import(
      /* webpackIgnore: true */ `${window.location.origin}/pagefind/pagefind.js`
    );
    await window.pagefind?.init?.();
  }
  return window.pagefind!;
}

export function usePagefindSearch(query: string) {
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [isPending, startTransition] = useTransition();

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!trimmedQuery) {
      return;
    }

    let cancelled = false;

    startTransition(async () => {
      const pagefind = await loadPagefind();
      const search = await pagefind.search(trimmedQuery);
      const data = await Promise.all(search.results.map((result) => result.data()));
      if (!cancelled) setResults(data);
    });

    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

  return {
    results: trimmedQuery ? results : [],
    loading: trimmedQuery ? isPending : false,
  };
}
