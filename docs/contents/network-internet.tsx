import type { Metadata } from "next";
import Link from "next/link";
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
  title: "インターネット",
};

const topics = [
  { href: "/network/internet/history", title: "インターネットの歴史", desc: "つながる網はどのように世界規模になったか" },
  { href: "/network/internet/isp", title: "ISP接続とCDN", desc: "LANの外へ ― ISP・PPPoE・IPoEで公衆網につなぐ" },
  { href: "/network/internet/server", title: "サーバーの全体像", desc: "DNS・Web・メール…どんなサーバーがあるか、構築まで" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>インターネット</h1>
        <Lead>
          各層で積み上げてきた仕組みが、現実の「インターネット」としてどう動いているかを見ていきます。網が世界規模になるまでの歴史、家庭や会社をその網へつなぐISP接続、そして実際にサービスを提供するサーバーの全体像と構築の実務まで。個々のプロトコル(Web・DNS・メール)は<Link href="/network/applications">アプリケーション層</Link>で扱っています。
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
