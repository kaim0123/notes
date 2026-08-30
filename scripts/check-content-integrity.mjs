#!/usr/bin/env node
// routes.ts・nav.ts・実ファイルの整合性を検証する(docs/02basic-design/app-basic.md §7)。
// TypeScriptを実行せず、正規表現でソースを読むだけの軽量スクリプト。
import { readFileSync, existsSync } from "node:fs";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routesPath = path.join(root, "src/content/routes.ts");
const navPath = path.join(root, "src/lib/nav.ts");
const pagesDir = path.join(root, "src/content/pages");

const routesSrc = readFileSync(routesPath, "utf-8");
const navSrc = readFileSync(navPath, "utf-8");

// routes.ts: "/url/path": { load: () => import("@/content/pages/module-name") }
const routeEntryRe =
  /"([^"]+)":\s*\{\s*load:\s*\(\)\s*=>\s*import\("@\/content\/pages\/([^"]+)"\)/g;
const routes = new Map(); // urlPath -> moduleName
for (const match of routesSrc.matchAll(routeEntryRe)) {
  routes.set(match[1], match[2]);
}

// nav.ts: href: "/url/path" (セクション自身の href とツリー内ノードの href の両方)
const hrefRe = /href:\s*"([^"]+)"/g;
const navHrefs = new Set([...navSrc.matchAll(hrefRe)].map((m) => m[1]));

const pageFiles = new Set(
  readdirSync(pagesDir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
);

const errors = [];
const warnings = [];

// 1. routes.ts が参照するモジュールが実在するか
for (const [urlPath, moduleName] of routes) {
  if (!pageFiles.has(moduleName)) {
    errors.push(
      `routes.ts の "${urlPath}" が参照する src/content/pages/${moduleName}.tsx が存在しません`
    );
  }
}

// 2. content/pages/ の全ファイルが routes.ts に登録されているか(孤立ファイル)
const routedModules = new Set(routes.values());
for (const moduleName of pageFiles) {
  if (!routedModules.has(moduleName)) {
    errors.push(
      `src/content/pages/${moduleName}.tsx が routes.ts のどのURLにも登録されていません(ビルドされない孤立ファイル)`
    );
  }
}

// 3. routes.ts の全エントリが nav.ts の tree のどこかに存在するか(サイドバーから辿れないページ)
for (const urlPath of routes.keys()) {
  if (!navHrefs.has(urlPath)) {
    warnings.push(
      `routes.ts の "${urlPath}" が nav.ts に登録されていません(サイドバーから辿れない孤立ページ)`
    );
  }
}

// 4. nav.ts の href が routes.ts に存在するか(リンク切れ)
for (const href of navHrefs) {
  if (!routes.has(href)) {
    errors.push(`nav.ts の href "${href}" が routes.ts に存在しません(リンク切れ)`);
  }
}

if (!existsSync(pagesDir)) {
  errors.push(`src/content/pages が存在しません`);
}

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

if (errors.length > 0) {
  console.error(`\n${errors.length}件のエラー、${warnings.length}件の警告`);
  process.exit(1);
}
console.log(
  `OK: routes.ts(${routes.size}件)・nav.ts・content/pages(${pageFiles.size}件)は整合しています(警告${warnings.length}件)`
);
