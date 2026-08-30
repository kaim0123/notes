import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "実装",
};

type Topic = { href: string; title: string; desc: string };

const entryTopic: Topic = {
  href: "/dev/implementation",
  title: "設計をコードに落とす",
  desc: "コーディング標準・構造化プログラミング・部品化・デバッグ",
};

const envTopics: Topic[] = [
  {
    href: "/dev/workspace",
    title: "ターミナルとシェル",
    desc: "文字でコンピュータと話す ― GUIとCLI、シェルの役割",
  },
  {
    href: "/dev/environments",
    title: "環境の全体像",
    desc: "「環境」という言葉の4つの意味を整理する",
  },
  {
    href: "/dev/dotenv",
    title: ".envと.gitignore",
    desc: "環境ごとの設定と、コミットしてはいけないもの",
  },
  {
    href: "/dev/tooling",
    title: "パッケージ管理とビルド",
    desc: "npm・pnpm・Vite ― 依存・脆弱性・バンドル・モノレポまで",
  },
  {
    href: "/dev/git",
    title: "Gitとブランチ戦略",
    desc: "仕組み・合流・コンフリクト・やり直し・リリース",
  },
  {
    href: "/dev/ci",
    title: "CI/CDパイプライン",
    desc: "GitHub Actionsの実務とデプロイ戦略 ― 人間が繰り返さない",
  },
];

const languageTopics: Topic[] = [
  {
    href: "/dev/language-basics",
    title: "プログラミング言語の仕組み",
    desc: "コンパイル・型システム・メモリ管理 ― 言語はどう動くか",
  },
  {
    href: "/dev/language-basics/history",
    title: "プログラミング言語の歴史",
    desc: "命令から高級言語へ ― 言語がこうして進化した",
  },
  {
    href: "/dev/language",
    title: "JavaScript・TypeScript",
    desc: "実際に書く言語 ― 型と表現力を手に入れる",
  },
  {
    href: "/dev/regex",
    title: "正規表現",
    desc: "文字列のパターンを書く小さな言語 ― 限界とReDoSも含めて",
  },
];

const debugTopics: Topic[] = [
  {
    href: "/dev/debug",
    title: "デバッグの技法",
    desc: "再現・二分探索・スタックトレース ― 勘で直さない手順",
  },
  {
    href: "/dev/debug/profiling",
    title: "プロファイリング",
    desc: "遅い場所を推測しない ― 測ってから1つだけ直す",
  },
];

const concurrencyTopics: Topic[] = [
  {
    href: "/dev/concurrency",
    title: "並行処理の全体像",
    desc: "並行と並列の違い、何が壊れるのか ― このグループの地図",
  },
  {
    href: "/dev/concurrency/race",
    title: "競合状態とデータ競合",
    desc: "読んでから書くまでの隙間 ― 二重販売はこうして起きる",
  },
  {
    href: "/dev/concurrency/lock",
    title: "排他制御",
    desc: "ミューテックス・セマフォと、複数プロセスでの現実的な排他",
  },
  {
    href: "/dev/concurrency/deadlock",
    title: "デッドロックと枯渇",
    desc: "止まって動かなくなる4条件と、予防・検出・回復",
  },
  {
    href: "/dev/concurrency/models",
    title: "並行モデル",
    desc: "スレッド・イベントループ・コルーチン・アクターの選び方",
  },
  {
    href: "/dev/concurrency/patterns",
    title: "実装パターン",
    desc: "並列度制御・キャンセル・バックプレッシャー・冪等性",
  },
];

const runtimeTopics: Topic[] = [
  {
    href: "/dev/runtime",
    title: "ランタイム",
    desc: "Node・ブラウザ ― コードが動く実行環境",
  },
  {
    href: "/dev/stack",
    title: "技術スタックの組み合わせ",
    desc: "フロント・API・ORM・DB ― 相性で選ぶおすすめ構成",
  },
  {
    href: "/dev/cache",
    title: "キャッシュの全体像",
    desc: "場所や規模が変わっても変わらない、キャッシュの定義",
  },
];

const appTopics: Topic[] = [
  {
    href: "/dev/frontend",
    title: "フロントエンド",
    desc: "Web基礎・React・Next.js ― 画面側の実装",
  },
  {
    href: "/dev/backend",
    title: "バックエンド",
    desc: "API・Express ― サーバー側の実装",
  },
];

const processTopics: Topic[] = [
  {
    href: "/dev/sdlc",
    title: "開発工程",
    desc: "要件定義から保守まで、システム開発の進め方と開発管理",
  },
];

function IndexSection({
  topics,
  startNum,
}: {
  topics: Topic[];
  startNum: number;
}) {
  return (
    <IndexGrid>
      {topics.map((topic, i) => (
        <IndexCard
          key={topic.href}
          href={topic.href}
          num={String(startNum + i).padStart(2, "0")}
          title={topic.title}
        >
          {topic.desc}
        </IndexCard>
      ))}
    </IndexGrid>
  );
}

export default function Page() {
  const n1 = 1;
  const n2 = n1 + 1;
  const n3 = n2 + envTopics.length;
  const n4 = n3 + languageTopics.length;
  const n5 = n4 + concurrencyTopics.length;
  const n6 = n5 + debugTopics.length;
  const n7 = n6 + runtimeTopics.length;
  const n8 = n7 + appTopics.length;

  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>実装</h1>
        <Lead>
          コードを書いて動かすための技術と道具を集めたセクションです。開発環境を整え、言語とランタイムを押さえ、<Link href="/dev/frontend">フロントエンド</Link>と<Link href="/dev/backend">バックエンド</Link>でアプリを組み立てます。要件定義から保守までの進め方は<Link href="/dev/sdlc">開発工程</Link>セクションへ。
        </Lead>
      </Hero>

      <Heading num="01">設計をコードに落とす</Heading>
      <IndexSection topics={[entryTopic]} startNum={n1} />

      <Heading num="02">開発環境</Heading>
      <IndexSection topics={envTopics} startNum={n2} />

      <Heading num="03">言語</Heading>
      <IndexSection topics={languageTopics} startNum={n3} />

      <Heading num="04">並行処理</Heading>
      <p className="text-muted-foreground mb-6 text-sm">
        同時に走らせたときに壊れないコードを書くための考え方です。<Link href="/os/process">OSのプロセスとスレッド</Link>と<Link href="/database/transaction">DBのトランザクション</Link>の間を埋めます。
      </p>
      <IndexSection topics={concurrencyTopics} startNum={n4} />

      <Heading num="05">デバッグ</Heading>
      <IndexSection topics={debugTopics} startNum={n5} />

      <Heading num="06">実行と構成</Heading>
      <IndexSection topics={runtimeTopics} startNum={n6} />

      <Heading num="07">アプリを組み立てる</Heading>
      <IndexSection topics={appTopics} startNum={n7} />

      <Heading num="08">開発工程へ</Heading>
      <p className="text-muted-foreground mb-6 text-sm">
        実装は開発全体の一工程です。要件定義・レビュー・導入・保守といった前後の工程は、独立した<Link href="/dev/sdlc">開発工程</Link>セクションにまとまっています。
      </p>
      <IndexSection topics={processTopics} startNum={n8} />

      <DocsFooter />
    </DocsPage>
  );
}
