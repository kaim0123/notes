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
  title: "UI・ユーザビリティ・アクセシビリティ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>UI・ユーザビリティ・アクセシビリティ ― 使いやすさの土台</h1>
        <Lead>
          <Term>ユーザーインタフェース(UI)</Term>は、人とシステムが接する境界そのものです。ここでは混同しやすい「ユーザビリティ」「アクセシビリティ」の違い、情報を整理して見せる情報アーキテクチャ、そして音声や画像など多様な入力方式を整理します。
        </Lead>
      </Hero>

      <Heading num="01">UI・ユーザビリティ・アクセシビリティ</Heading>
      <p>3つはよく一緒に語られますが、指す範囲が異なります。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ユーザーインタフェース(UI)</td><td>画面・ボタン・音声など、人とシステムが接する接点そのもの</td></tr>
          <tr><td className="hl">ユーザビリティ</td><td>特定の利用者が、目的をどれだけ効果的・効率的・満足に達成できるかという「使いやすさ」</td></tr>
          <tr><td className="hl">アクセシビリティ</td><td>高齢者や障害のある人を含め、誰もが利用できる度合い(近づきやすさ)</td></tr>
        </tbody>
      </table>
      <p>ユーザビリティが「特定の人にとっての使いやすさ」を指すのに対し、アクセシビリティは「利用できる人の幅の広さ」を指します。両者は重なりつつも別の概念です。人がシステムと対話しながら進めるシステムを<Term>インタラクティブシステム</Term>と呼びます。</p>

      <Analogy label="💡 たとえるなら">
        建物にたとえると、ユーザビリティは「中が使いやすく設計されているか」、アクセシビリティは「スロープや点字ブロックがあり、そもそも誰もが入れるか」です。どんなに中が快適でも、入口の段差で入れない人がいれば、アクセシビリティが低いことになります。
      </Analogy>

      <Heading num="02">情報アーキテクチャ ― 情報を整理して見せる</Heading>
      <p><Term>情報アーキテクチャ(IA)</Term>は、大量の情報を利用者が迷わず辿れるように構造化する設計です。中心となる考え方に、項目に付ける名前を分かりやすくする<Term>ラベル</Term>、情報を人が把握しやすいかたまりに区切る<Term>チャンク</Term>、目的の情報へ導く<Term>ナビゲーション</Term>があります。</p>
      <p>チャンク化は、人が一度に記憶できる情報量に限りがあることへの対策です。長い数字列をハイフンで区切ると覚えやすくなるように、情報を意味のあるまとまりに分けることで、認知の負担を減らします。</p>

      <Heading num="03">多様な入力方式 ― 音声・画像・自然言語</Heading>
      <p>UIはキーボードやマウスだけではありません。近年は、より自然な操作を目指したインタフェースが広がっています。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">音声認識・VUI</td><td>話しかけて操作する音声ユーザーインタフェース(スマートスピーカーなど)</td></tr>
          <tr><td className="hl">画像認識</td><td>カメラで捉えた顔・文字・物体を認識して入力に使う</td></tr>
          <tr><td className="hl">自然言語インタフェース</td><td>日常の言葉で指示・質問できる仕組み</td></tr>
          <tr><td className="hl">ジェスチャー・NUI</td><td>タッチや身振りなど、直感的な操作(ナチュラルユーザーインタフェース)</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">使いやすさは接点の質</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>UIは接点、ユーザビリティは使いやすさ</h4><p>アクセシビリティは「誰もが使えるか」という利用者の幅を指します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>情報アーキテクチャで迷わせない</h4><p>ラベル・チャンク・ナビゲーションで、情報を辿りやすく構造化します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>入力は多様化している</h4><p>音声・画像・自然言語・ジェスチャーなど、より自然な操作が広がっています。</p></Card>
      </CardGrid>
      <p>次は、GUIを構成する具体的な部品を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/ux/gui" tag="ユーザーインタフェース">GUIの部品</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/hcd" tag="ユーザーインタフェース">人間中心設計と評価</RelatedLink>
                    <RelatedLink href="/design/architecture/app/gui" tag="設計">GUIアーキテクチャ</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/basics" tag="フロントエンド">UXの基礎</RelatedLink>
                    <RelatedLink href="/dev/frontend/a11y" tag="フロントエンド">アクセシビリティ実装</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
