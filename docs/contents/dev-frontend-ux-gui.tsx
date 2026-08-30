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
  title: "GUIの部品",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>GUIの部品 ― ウィンドウ・アイコンとフォーム部品</h1>
        <Lead>
          <Term>GUI(グラフィカルユーザーインタフェース)</Term>は、アイコンやボタンを画面に表示し、マウスなどで直接操作する方式です。文字コマンドを打ち込むCUIと違い、視覚的で直感的に扱えます。ここでは画面を構成する基本要素と、フォームでよく使う入力部品を整理します。
        </Lead>
      </Hero>

      <Heading num="01">GUIとポインティングデバイス</Heading>
      <p>GUIは、画面上の対象を指し示して操作します。この操作を担う機器が<Term>ポインティングデバイス</Term>で、マウス・タッチパッド・タッチパネル・トラックボールなどがあります。文字で命令を入力する<Term>CUI(キャラクタユーザーインタフェース)</Term>に比べ、GUIは「見えているものを直接触る」感覚で操作できるのが特徴です。</p>
      <p>画面を構成する基本要素として、独立した作業領域を表す<Term>ウィンドウ</Term>、機能やファイルを絵柄で表す<Term>アイコン</Term>、操作対象を選ぶ<Term>メニュー</Term>があります。</p>

      <Analogy label="💡 たとえるなら">
        CUIが「店員に口頭で商品名を伝えて注文する」方式なら、GUIは「棚に並んだ商品を手に取ってカゴに入れる」方式です。何が選べるかが目に見えているぶん、初めてでも迷いにくくなります。
      </Analogy>

      <Heading num="02">フォームの入力部品</Heading>
      <p>入力フォームでは、入力の性質に応じて部品を使い分けます。選択肢の数や「1つだけ選ぶか/複数選べるか」で適切な部品が変わります。</p>
      <table>
        <thead>
          <tr><th>部品</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ラジオボタン</td><td>複数の選択肢から<strong>1つだけ</strong>選ぶ(例: 性別)</td></tr>
          <tr><td className="hl">チェックボックス</td><td>複数の選択肢から<strong>いくつでも</strong>選ぶ(例: 興味のある分野)</td></tr>
          <tr><td className="hl">リストボックス</td><td>一覧から選ぶ。項目が多いときに使う</td></tr>
          <tr><td className="hl">プルダウンメニュー</td><td>ふだんは畳まれ、開くと選択肢が下に展開する</td></tr>
          <tr><td className="hl">ポップアップメニュー</td><td>操作に応じてその場に浮かび上がるメニュー</td></tr>
          <tr><td className="hl">テキストボックス</td><td>自由な文字列を入力する</td></tr>
        </tbody>
      </table>
      <p>選択部品を正しく選ぶことは、入力ミスを減らすうえでも重要です。「1つだけ」の場面でチェックボックスを使うと複数選べてしまい、意図しない入力を招きます。</p>

      <Heading num="まとめ">見えるものを直接操作する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>GUIはポインティングデバイスで操作</h4><p>ウィンドウ・アイコン・メニューを、マウスなどで直接指し示します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>単一選択はラジオ、複数はチェック</h4><p>選択の性質に合った部品を選ぶことが、入力ミスを防ぎます。</p></Card>
      </CardGrid>
      <p>次は、これらの部品を組み合わせて業務画面を設計するときの考え方と、入力値のチェックを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/ux/screen" tag="ユーザーインタフェース">画面設計と入力チェック</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/usability" tag="ユーザーインタフェース">UI・ユーザビリティ・アクセシビリティ</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="フロントエンド">Web基礎</RelatedLink>
                    <RelatedLink href="/dev/frontend/components" tag="フロントエンド">コンポーネント設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
