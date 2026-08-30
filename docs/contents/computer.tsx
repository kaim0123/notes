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
  title: "コンピュータ",
};

const topics = [
  { href: "/computer/history", title: "コンピュータの歴史", desc: "計算する機械はどう生まれ、どう小さくなったか" },
  { href: "/computer/basics", title: "PCハードウェアの基礎", desc: "CPU・GPU・ストレージ ― 1台を構成する物理部品" },
  { href: "/computer/semiconductor", title: "半導体", desc: "トランジスタから足し算まで ― ただの物質が計算になる原理" },
  { href: "/computer/cpu", title: "CPUと命令実行", desc: "命令サイクル・レジスタ・割込みと、クロック・CPI・MIPS" },
  { href: "/computer/memory", title: "メモリの仕組み", desc: "速さと容量のトレードオフを埋める記憶の階層" },
  { href: "/computer/io/bus", title: "入出力とバス", desc: "バス・USB・DMA・入出力装置 ― 部品と外界をつなぐ" },
  { href: "/computer/system/architecture", title: "システム構成", desc: "処理形態・冗長化・RASIS・スループット・TCO ― 1台を超えた設計と評価" },
  { href: "/computer/client", title: "クライアント管理の実務", desc: "資産管理・キッティング・ライセンス・セキュリティ・保守・廃棄 ― 端末のライフサイクルを回す" },
  { href: "/computer/printer", title: "プリンターの仕組み", desc: "共有プリンタ・ドライバー・スキャン ― 社内の周辺機器" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>コンピュータ</h1>
        <Lead>
          すべての土台となる1台のマシン。OSがハードウェアをどう束ねるか、メモリがなぜ階層構造なのか、そして物理部品の役割まで、コンピュータの内側を順番に見ていきます。
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
