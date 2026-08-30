import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  IndexGrid,
  IndexCard,
  Analogy,
  Diagram,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "マネジメント",
};

const framework = [
  { href: "/management/basics", title: "人事マネジメントとは", desc: "人事の目的・人的資本経営 ― すべての土台" },
  { href: "/management/individual", title: "個人のマネジメント（ミクロ）", desc: "採用・育成・評価・モチベーション・労務" },
  { href: "/management/team", title: "チームのマネジメント（メゾ）", desc: "チームビルディング・リーダーシップ・対話・ナレッジ" },
  { href: "/management/org", title: "組織のマネジメント（マクロ）", desc: "組織設計・人事制度・人材戦略・文化・組織開発" },
  { href: "/management/context", title: "経営・社会とのつながり", desc: "人事戦略・労働市場・法律・HRテクノロジー" },
  { href: "/management/theory", title: "マネジメント理論家", desc: "マズロー・ハーズバーグ・ドラッカーからデミングまで" },
];

const practice = [
  { href: "/management/individual/onboarding", parent: "個人", title: "採用・オンボーディング・育成", desc: "口説く・立ち上げる・計画的に育てる" },
  { href: "/management/team/operation", parent: "チーム", title: "チーム運営と3つの力", desc: "コミュニケーション・対話・リーダーシップの統合" },
  { href: "/management/team/goals", parent: "チーム", title: "目標設定", desc: "役割・貢献モデル・状態目標（Be）で描く" },
  { href: "/management/team/momentum", parent: "チーム", title: "戦略方針とモメンタム", desc: "方向性を置き、勢いを技術でつくる" },
  { href: "/management/team/rules", parent: "チーム", title: "ルールと相互理解", desc: "急拡大でも壊れないチームのつくり方" },
  { href: "/management/org/structure", parent: "組織", title: "組織構造とアサイン", desc: "文鎮型・構造型・Will×Canのアサイン" },
  { href: "/management/org/delegation", parent: "組織", title: "権限委譲", desc: "決める／実行するを分け、渡して任せる" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>マネジメント ― 人と組織で成果を出す</h1>
        <Lead>
          技術やプロダクトがどれほど優れていても、それを動かすのは人です。<Term>マネジメント</Term>とは、経営から逆算して「どんなチームでゴールを達成するか」を組み立て、つくった戦略や組織を仕組みで動かしながら目標を達成していく営みです。ここでは人事マネジメントの<Term>体系</Term>（個人→チーム→組織→社会）を俯瞰したうえで、各テーマの下に現場で使える<Term>実践トピック</Term>をぶら下げています。
        </Lead>
      </Hero>

      <Heading num="01">3つのレイヤー ― 対象の広がりで整理する</Heading>
      <p>人事マネジメントは、誰を対象にするかで3つのレイヤーに分けて捉えると見通しがよくなります。一人ひとりを対象にする<Term>ミクロ</Term>、チーム・部署を対象にする<Term>メゾ</Term>、組織全体を対象にする<Term>マクロ</Term>です。下にいくほど対象が広がり、扱うテーマも「日々の関わり」から「制度・戦略」へと移っていきます。</p>
      <Diagram caption="対象が広がるほど、日々の関わりから制度・戦略へとテーマが移る">
        <svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={20} width={480} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">ミクロ ― 個人</text>
          <text x={280} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">採用・育成・評価・モチベーション・労務</text>

          <rect x={80} y={74} width={400} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={94} fill="#f2f2f2" fontSize="12" textAnchor="middle">メゾ ― チーム・部署</text>
          <text x={280} y={110} fill="#9a9a9a" fontSize="10" textAnchor="middle">チームビルディング・リーダーシップ・対話</text>

          <rect x={120} y={128} width={320} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={148} fill="#f2f2f2" fontSize="12" textAnchor="middle">マクロ ― 組織・経営・社会</text>
          <text x={280} y={164} fill="#9a9a9a" fontSize="10" textAnchor="middle">組織設計・人事制度・戦略・法律</text>
        </svg>
      </Diagram>

      <Heading num="02">体系で学ぶ</Heading>
      <p>まず全体像をつかむための章立てです。基礎から始めて、ミクロ・メゾ・マクロと対象を広げ、最後に理論家の系譜を押さえます。</p>
      <IndexGrid>
        {framework.map((topic, i) => (
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

      <Heading num="03">実践トピック ― 各テーマを深掘りする</Heading>
      <p>体系が「地図」なら、実践トピックは「歩き方」です。目標設定・戦略方針・組織構造・権限委譲・採用育成・チームづくりといった、現場のマネージャーが明日から使える型を、それぞれ上の<Term>個人・チーム・組織</Term>ページの下にぶら下げています。関心のあるレイヤーから降りていってください。</p>
      <IndexGrid>
        {practice.map((topic) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={topic.parent}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Analogy label="💡 たとえるなら">
        マネジメントは<Term>総合格闘技</Term>に近いものです。メンバーのモチベーションが下がったとき、すぐ1on1の技術に話が飛びがちですが、実際には「チーム目標そのものがなかった」ことが原因のこともあります。目標設定・対話・リーダーシップといった各モジュールがきちんとインストールされていないと、目の前の課題は解けません。だから体系で全体像を持ちつつ、実践トピックで個別の技を磨く ― その両輪が要ります。
      </Analogy>

      <p>マネジメントは<Link href="/dev/sdlc">開発工程</Link>や<Link href="/ops/compliance">運用の法令・コンプライアンス</Link>とも地続きです。組織で成果を出すという観点から、あわせて読むと理解が深まります。</p>

      <DocsFooter />
    </DocsPage>
  );
}
