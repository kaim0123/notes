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
  title: "情報メディア",
};

const topics = [
  { href: "/theory/media/basics", title: "マルチメディアの全体像", desc: "コンテンツの種類・コンテナ・ストリーミング" },
  { href: "/theory/media/audio", title: "音声フォーマット", desc: "PCM・サンプリングと、WAV・MP3・MIDI" },
  { href: "/theory/media/image", title: "画像フォーマット", desc: "ラスタとベクター、JPEG・PNG・GIFと解像度" },
  { href: "/theory/media/video", title: "動画フォーマット", desc: "フレーム・コーデックと、MPEG・H.264・HEVC" },
  { href: "/theory/media/compression", title: "圧縮の考え方", desc: "可逆・非可逆と圧縮率、ZIPアーカイブ" },
  { href: "/theory/media/graphics", title: "色・解像度・グラフィックス応用", desc: "RGB/CMY・階調と、CG・AR/VR/MR" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>情報メディア</h1>
        <Lead>
          音声・画像・動画といったデジタルコンテンツが、どんな形式で表され、どう圧縮されて届くのかを見ていきます。全体像から各メディアのフォーマット、圧縮の考え方、そして色やグラフィックスの応用まで、順に整理します。符号化の理論的な側面は「情報科学」と相互に補い合います。
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
