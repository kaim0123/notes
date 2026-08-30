// TODO: DocsPage/Hero等の本文コンポーネント一式ができたら置き換える。
// セクション索引ページの暫定表示(計画中の第二階層を可視化するだけの仮実装)。
export function SectionPlaceholder({
  title,
  description,
  topics,
}: {
  title: string;
  description?: string;
  topics: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="mb-1 text-[0.85rem] text-primary">{title}</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="mb-8 max-w-xl text-muted-foreground">{description}</p>
      )}
      <p className="mb-2 text-sm font-medium text-foreground">
        予定しているトピック(未執筆)
      </p>
      <ul className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-[0.85rem] text-muted-foreground"
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}
