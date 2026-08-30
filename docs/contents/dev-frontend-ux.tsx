import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "UX/UI設計",
};

const topics = [
  {
    href: "/dev/frontend/ux/basics",
    title: "UXの基礎",
    desc: "UXとUIの違い・5要素・UCD/HCD・ダブルダイヤモンド",
  },
  {
    href: "/dev/frontend/ux/usability",
    title: "UI・ユーザビリティ・アクセシビリティ",
    desc: "使いやすさの基本用語と、情報の見せ方",
  },
  {
    href: "/dev/frontend/ux/hcd",
    title: "人間中心設計と評価",
    desc: "ユニバーサルデザイン・WCAG・ユーザビリティ評価",
  },
  {
    href: "/dev/frontend/ux/design-thinking",
    title: "デザイン思考",
    desc: "共感からテストまで ― ペルソナ・試作・改善サイクル",
  },
  {
    href: "/dev/frontend/ux/visual",
    title: "視覚デザイン",
    desc: "レイアウト・配色・タイポグラフィ ― 見た目の原則",
  },
  {
    href: "/dev/frontend/ux/gui",
    title: "GUIの部品",
    desc: "ウィンドウ・アイコンと、フォームの標準部品",
  },
  {
    href: "/dev/frontend/ux/screen",
    title: "画面設計と入力チェック",
    desc: "画面構成・入力値の検査・コード設計",
  },
  {
    href: "/dev/frontend/ux/form-caution",
    title: "フォーム作成時の注意",
    desc: "二重送信・セキュリティ・DB更新など実装前のチェックリスト",
  },
  {
    href: "/dev/frontend/ux/web",
    title: "Web UIデザイン",
    desc: "スタイルシート・ワイヤーフレーム・レスポンシブ",
  },
  {
    href: "/dev/frontend/ux/system",
    title: "コンポーネントとデザインシステム",
    desc: "部品化・Atomic Design・Design Token",
  },
  {
    href: "/dev/frontend/a11y",
    title: "アクセシビリティ実装",
    desc: "キーボード操作・フォーカス管理・ARIA",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>UX/UI設計</h1>
        <Lead>
          画面を実装する前に、利用者が何を求め、どう操作するかを整理します。UX・ユーザビリティ・アクセシビリティの用語から、デザイン思考、視覚デザインの原則、GUI部品と画面設計、そして部品として再利用するデザインシステムまでを、ReactやTailwindで組み立てる前提知識として順に見ていきます。実装そのものは
          <Link href="/dev/frontend/layout">CSSレイアウト</Link>・
          <Link href="/dev/frontend/a11y">アクセシビリティ実装</Link>で扱います。
        </Lead>
      </Hero>

      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter />
    </DocsPage>
  );
}
