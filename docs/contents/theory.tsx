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
  title: "情報科学",
};

const topics = [
  { href: "/theory/numbers", title: "数と基数変換", desc: "2進数・基数変換・2の補数・小数の表現 ― すべての土台になる数の扱い方" },
  { href: "/theory/logic", title: "論理と真理値表", desc: "命題・AND/OR/NOT・真理値表・ド・モルガンの法則 ― if文と論理回路の共通言語" },
  { href: "/theory/probability", title: "確率・統計と情報理論", desc: "確率の計算・代表値とばらつき・情報量・符号化 ― データを読む土台" },
  { href: "/theory/encoding", title: "文字コード", desc: "ASCII・Unicode・UTF-8・文字化け ― 文字がバイト列になる仕組み" },
  { href: "/theory/algorithms", title: "アルゴリズムとデータ構造", desc: "配列・リスト・木・ソート・探索・計算量 ― 効率よく処理する設計" },
  { href: "/theory/formal", title: "形式言語", desc: "BNF・正規表現・オートマトン・逆ポーランド記法 ― 言語を厳密に記述する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>情報科学 ― コンピュータの土台になる理論</h1>
        <Lead>
          コンピュータやネットワークを学ぶ前に押さえておきたい、数・論理・確率・アルゴリズムといった理論の土台です。2進数がなぜ使われるのか、if文の条件をどう簡単にできるのか、アルゴリズムの速さをどう比べるのか。仕組みの「なぜ」を支える共通言語を、順番に見ていきます。
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
