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
  title: "フロントエンド",
};

const topics = [
  { href: "/dev/frontend/web-basics", title: "Web基礎", desc: "HTML・CSS・DOM ― ブラウザが画面を描く土台" },
  { href: "/dev/frontend/layout", title: "CSSレイアウト", desc: "Flexbox・Grid・position ― 箱をどう並べ、どう重ねるか" },
  { href: "/dev/frontend/a11y", title: "アクセシビリティ実装", desc: "キーボード操作・フォーカス管理・ARIA ― マウスと視覚を前提にしない" },
  { href: "/dev/frontend/http", title: "HTTP通信", desc: "Fetch API・axios ― JavaScriptからサーバーと話す" },
  { href: "/dev/frontend/realtime", title: "リアルタイム通信", desc: "ポーリング・SSE・WebSocket ― サーバーから届く更新を受け取る" },
  { href: "/dev/frontend/storage", title: "ブラウザストレージ", desc: "Cookie・localStorage・IndexedDB ― 何を、どこに、いつまで置くか" },
  { href: "/dev/frontend/ux", title: "UX/UI設計", desc: "UXの基礎・デザイン思考・視覚デザイン・デザインシステム" },
  { href: "/dev/frontend/components", title: "コンポーネント設計", desc: "責務分割・props API ― UIをコードの部品に切り分ける" },
  { href: "/dev/frontend/components/state", title: "コンポーネント別の状態設計", desc: "Button・Dialog・Sidebar など部品ごとの state 戦略" },
  { href: "/dev/frontend/state", title: "状態管理設計", desc: "UI・サーバー・URL・フォーム ― 種類ごとに置き場所と道具を選ぶ" },
  { href: "/dev/frontend/framework", title: "フレームワーク・ライブラリ", desc: "制御の反転 ― あなたのコードと相手のコード、どちらが主導権を持つか" },
  { href: "/dev/frontend/react", title: "React", desc: "コンポーネント・Props・State ― 宣言的にUIを組み立てる" },
  { href: "/dev/frontend/nextjs", title: "Next.js", desc: "Server/Clientの境界・データフェッチ・配信の最適化" },
  { href: "/dev/frontend/tailwind", title: "Tailwind CSS", desc: "ユーティリティクラス ― CSSを書かずに見た目を決める" },
  { href: "/dev/frontend/perf", title: "表示速度を測って直す", desc: "Core Web Vitals・コード分割 ― 何を送らないかを決める" },
  { href: "/dev/frontend/i18n", title: "国際化と日時", desc: "Intl・タイムゾーン ― 言語と時間帯を前提から外す" },
  { href: "/dev/backend", title: "バックエンド", desc: "APIの向こう側 ― サーバー側の実装(バックエンドセクション)" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>フロントエンド</h1>
        <Lead>
          利用者が直接触れる画面側の実装です。ブラウザが解釈するHTML・CSS・DOMという土台から、サーバーとやり取りするHTTP通信、UX/UIの考え方、そしてReact・Next.js・Tailwind
          CSSによる組み立てまでを順に見ていきます。言語そのもの(JavaScript・TypeScript)や実行環境・ビルドツールは<Link href="/dev">実装</Link>セクションで扱います。
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
