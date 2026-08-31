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

export const metadata: Metadata = { title: "開発の進め方" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>開発の進め方</h1>
        <Lead>
          コードそのものではなく、<Term>開発を回すための手順と道具</Term>を扱うセクションです。どういう順番で進めるかという工程の型から、手元の環境づくり、変更の合流と自動検査、そして詰まったときの調べ方までを順に置いています。本番で動かすための環境はインフラセクションの担当で、境目は<Term>開発中に自分が使うもの / 本番で動かすもの</Term>で分けています。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/dev/process">開発プロセス</Link>
          </h4>
          <p>
            要件定義から保守までの工程の地図と、ウォーターフォールとアジャイルという回し方の型。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/dev/tooling">開発環境とツール</Link>
          </h4>
          <p>
            「環境」の4つの意味、ターミナルとシェル、パッケージ管理とビルド、設定と秘密の受け渡し。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/dev/git-ci">Git・CI/CD</Link>
          </h4>
          <p>
            変更をどう合流させるか(ブランチ戦略)と、壊れていないことをどう確かめるか(自動検査)。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/dev/debug">デバッグと性能改善</Link>
          </h4>
          <p>
            再現・二分探索・仮説検証。勘で直さず、測ってから直すための手順。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev" />
    </DocsPage>
  );
}
