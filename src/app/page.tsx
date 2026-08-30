export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="mb-1 text-[0.85rem] text-primary">notes</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">
        個人の学習内容をまとめる知識サイト
      </h1>
      <p className="max-w-xl text-muted-foreground">
        レイアウトの雛形です。サイドバー・ヘッダー・パンくず・モバイル下部ナビは
        <code className="mx-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[0.85em]">
          src/lib/nav.ts
        </code>
        のプレースホルダーで動いています。コンテンツページはこれから追加します。
      </p>
    </div>
  );
}
