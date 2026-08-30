import type { Metadata } from "next";

export const metadata: Metadata = { title: "その他" };

// TODO: プレースホルダー。docs コンポーネント一式ができたら書き直す。
export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="mb-1 text-[0.85rem] text-primary">その他</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">その他</h1>
      <p className="max-w-xl text-muted-foreground">
        プログラミング以外の学習内容を置くセクション。特定の分野を先に用意せず、
        学んだ内容が出てきた時点でページを追加する
        (詳しくは docs/03content-plan/nav-structure.md 参照)。
      </p>
    </div>
  );
}
