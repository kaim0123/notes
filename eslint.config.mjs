import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // pagefind search index, regenerated on build (see docs/02basic-design/app-basic.md)
    "public/pagefind/**",
    // 参考原稿(Atlasからの移植)。アプリの一部としてビルドしない(tsconfig.jsonのexcludeと対応)。
    "docs/contents/**",
  ]),
]);

export default eslintConfig;
