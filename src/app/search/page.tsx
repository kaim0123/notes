import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";

function SearchFallback() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="mb-1 text-[0.85rem] text-primary">検索</p>
      <h1 className="text-2xl font-semibold">検索キーワードを入力してください</h1>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
