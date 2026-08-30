import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "言語" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>言語</h1>
        <Lead>
          プログラミング言語そのものを扱うセクションです。言語同士を見分ける<Term>軸</Term>を押さえたうえで、実際に手を動かすJavaScript・TypeScriptを見て、最後に「同時に走らせると何が壊れるのか」までを順に読めるように並べています。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/language/basics">言語の仕組み</Link>
          </h4>
          <p>
            パラダイム・実行方式・型システムという3つの軸。書いた文字が動く命令になるまで。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/language/js">JavaScript・TypeScript</Link>
          </h4>
          <p>
            動的型付けの自由さと代償、型という契約の足し方、非同期処理の書き表し方。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/language/concurrency">並行処理</Link>
          </h4>
          <p>
            並行と並列の違い、壊れ方の3分類、単一スレッドでも競合状態が起きる理由。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language" />
    </DocsPage>
  );
}
