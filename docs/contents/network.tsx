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
  title: "ネットワーク",
};

const topics = [
  { href: "/network/basics", title: "ネットワークの全体像", desc: "LAN・WAN・パケット交換・転送速度 ― 階層に入る前の地図" },
  { href: "/network/layers", title: "階層モデル", desc: "OSI参照モデルとTCP/IP ― 通信を階層で捉える" },
  { href: "/network/physical", title: "物理層", desc: "信号・ケーブル・光ファイバー ― ビットを電気や光で運ぶ" },
  { href: "/network/link", title: "データリンク層", desc: "MAC・イーサネット・スイッチ・無線・PPP ― 隣の機器へ届ける" },
  { href: "/network/link/wireless", title: "無線LAN(Wi-Fi)", desc: "電波・規格・セキュリティまで、無線LANの実務" },
  { href: "/network/ip", title: "ネットワーク層", desc: "IPアドレス・サブネット・ルーティング・IPv6 ― 別のネットワークへ" },
  { href: "/network/transport", title: "トランスポート層", desc: "TCP・UDPとポート番号 ― どのアプリに届けるか" },
  { href: "/network/applications", title: "アプリケーション層", desc: "SSH・メール・Web(HTTP)・DNS ― 利用者が触れるプロトコル" },
  { href: "/network/topology", title: "トポロジと接続装置", desc: "ネットワークの形と、ルーター・スイッチなどの機器" },
  { href: "/network/control", title: "通信制御コンポーネント", desc: "RP・LB・API Gateway・サービスメッシュ・メッセージングの整理" },
  { href: "/network/internet", title: "インターネット", desc: "歴史・ISP接続・サーバー ― 仕組みが動く現実世界の実務" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ネットワーク</h1>
        <Lead>
          複数のコンピュータをつなぐ仕組みを、OSI参照モデルの各層で下から順に捉えます。物理層・データリンク層からIP・トランスポート・アプリケーション層(Web・DNS・メール)まで積み上げ、最後にその仕組みが動く現実世界=インターネットの実務(歴史・ISP接続・サーバー)へと広げていきます。
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
