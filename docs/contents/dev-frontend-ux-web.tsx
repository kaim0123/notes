import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Web UIデザイン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Web UIデザイン ― ブラウザ向けの見せ方</h1>
        <Lead>
          Webの画面は、PC・スマートフォン・タブレットなど、大きさの異なる多様な画面で見られます。ここでは、見た目とHTMLを分けるスタイルシートの考え方、設計を素早く検討するワイヤーフレーム、そして画面幅に応じて表示を変えるレスポンシブデザインを整理します。
        </Lead>
      </Hero>

      <Heading num="01">Webデザインとスタイルシート</Heading>
      <p>Webページは、文書の<strong>構造</strong>を表すHTMLと、<strong>見た目</strong>を表す<Term>スタイルシート(CSS)</Term>に役割を分けて作ります。文字の色・大きさ・余白・配置といった装飾をCSSにまとめることで、同じHTMLでもデザインだけを差し替えたり、複数ページの見た目を一括で変えたりできます。</p>
      <p>この「構造と見た目の分離」は、保守性を大きく高めます。デザインを変えたいときにHTML本文を触らずに済み、逆に内容を書き換えてもデザインは保たれます。HTML/CSSの実装そのものは「<Link href="/dev/frontend/web-basics">Web基礎</Link>」で扱います。</p>

      <Analogy label="💡 たとえるなら">
        HTMLとCSSの関係は「原稿」と「レイアウト指定」です。原稿(内容)はそのままに、フォントや余白の指示書(CSS)だけを差し替えれば、雑誌風にも新聞風にも仕上げられます。内容とデザインを別々に管理できるのが利点です。
      </Analogy>

      <Heading num="02">ワイヤーフレーム ― 設計の下書き</Heading>
      <p><Term>ワイヤーフレーム</Term>は、色や装飾を省き、どこに何を置くかという<strong>骨組み</strong>だけを描いた設計図です。作り込む前に配置を検討できるため、早い段階で「情報の優先順位」や「操作の流れ」を関係者と合意できます。装飾に入る前に構造を固めることで、後戻りを減らせます。</p>

      <Heading num="03">レスポンシブWebデザイン ― 画面幅に応じて変える</Heading>
      <p><Term>レスポンシブWebデザイン</Term>は、1つのHTMLで、画面の幅に応じてレイアウトを自動的に切り替える手法です。PCでは横に並ぶ要素を、スマートフォンでは縦に積み替える、といった調整を行います。これを実現する中心的な仕組みが<Term>メディアクエリ</Term>で、「画面幅が〇〇px以下ならこのスタイルを適用する」という条件をCSSに書けます。</p>
      <p>PC用とスマホ用で別々のページを用意するのではなく、1つのページが画面に「応答(レスポンス)」して見た目を変えるため、管理の手間が減り、どの端末でも同じ内容を届けられます。</p>

      <Heading num="まとめ">分離・下書き・応答</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>構造(HTML)と見た目(CSS)を分ける</h4><p>スタイルシートに装飾をまとめ、保守性と再利用性を高めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ワイヤーフレームで骨組みを先に決める</h4><p>装飾前に配置を検討し、関係者と早く合意します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>レスポンシブで多様な画面に応える</h4><p>メディアクエリで、画面幅に応じてレイアウトを切り替えます。</p></Card>
      </CardGrid>
      <p>次は、誰もが使えるように配慮する人間中心設計と、その評価の方法を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/ux/hcd" tag="ユーザーインタフェース">人間中心設計と評価</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="開発">Web基礎</RelatedLink>
                    <RelatedLink href="/dev/frontend/tailwind" tag="フロントエンド">Tailwind CSS</RelatedLink>
                    <RelatedLink href="/dev/frontend/layout" tag="フロントエンド">CSSレイアウト</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/visual" tag="フロントエンド">視覚デザイン</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
