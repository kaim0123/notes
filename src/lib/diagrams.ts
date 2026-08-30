import fs from "node:fs";
import path from "node:path";

// 図解HTMLをビルド時に読み込む(docs/02basic-design/app-basic.md §4.1参照)。
export function readDiagram(slug: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/diagrams", `${slug}.html`),
    "utf-8"
  );
}
