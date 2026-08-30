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
  title: "視覚デザイン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>視覚デザイン ― レイアウト・配色・文字</h1>
        <Lead>
          UXの骨格が決まったら、利用者が実際に目にする<Term>視覚デザイン</Term>に入ります。ここでは、情報の並べ方(レイアウト)、色、文字(タイポグラフィ)の原則を整理します。CSSやTailwindで実装するときの判断軸として使えます。
        </Lead>
      </Hero>

      <Heading num="01">レイアウト ― グリッド・余白・視線誘導</Heading>
      <p>画面は要素を並べるだけでは整いません。<Term>グリッド</Term>は、列と行の枠組みで要素を揃える仕組みです。12列グリッドなど、分割数を決めておくと、PCとスマートフォンで一貫した配置にしやすくなります。</p>
      <p><Term>余白(ホワイトスペース)</Term>は「空いている無駄な部分」ではなく、要素同士の関係や重要度を伝える手段です。余白が狭い画面は情報が詰まって読みにくく、適切な余白は視線の休息とグルーピングを生みます。</p>
      <p><Term>視線誘導</Term>は、利用者の目の動きを意図した順序(左上→右下、大きい要素→小さい要素、コントラストの強い部分)で設計することです。見出し・ボタン・CTA(行動喚起)を、自然な順で辿れるように配置します。</p>

      <Heading num="02">情報設計 ― 何を先に見せるか</Heading>
      <p>レイアウトとセットで考えるのが<Term>情報設計(IA: Information Architecture)</Term>です。どの情報を目立たせ、どれを下位に置くかで、利用者の理解速度が変わります。ナビゲーションの階層、一覧と詳細の関係、フォームの入力順序も、視覚デザインの前段階として決めておくとCSSの迷いが減ります。</p>
      <p>情報の整理の基本(ラベル・チャンク・ナビゲーション)は<Link href="/dev/frontend/ux/usability">UI・ユーザビリティ・アクセシビリティ</Link>で詳述しています。フロントエンド実装者は、セマンティックなHTML(<Link href="/dev/frontend/web-basics">Web基礎</Link>の<code>&lt;nav&gt;</code>・<code>&lt;main&gt;</code>など)でその構造をコードに反映します。</p>

      <Analogy label="💡 たとえるなら">
        レイアウトと情報設計は「新聞の版面」です。見出しの大きさ、段組み、余白で「どこから読むか」が決まります。文字サイズだけ整えても、記事の優先順位が逆なら読者は迷います。
      </Analogy>

      <Heading num="03">配色 ― 色彩理論とアクセント</Heading>
      <p><Term>色彩理論</Term>では、色相環上の関係(補色・類似色・トライアド)を使って調和や対比を設計します。実務では、次の3層に分けると管理しやすくなります。</p>
      <table>
        <thead>
          <tr>
            <th>層</th>
            <th>役割</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ベース</td>
            <td>背景・面の主色。画面全体のトーンを決める</td>
            <td>白、オフホワイト、ダークグレー</td>
          </tr>
          <tr>
            <td className="hl">テキスト</td>
            <td>本文・見出し。背景とのコントラスト比が重要</td>
            <td>WCAGでは4.5:1以上(通常テキスト)が目安</td>
          </tr>
          <tr>
            <td className="hl">アクセント</td>
            <td>ボタン・リンク・強調。操作すべき場所を示す</td>
            <td>ブランドカラー1色に絞ると迷いが減る</td>
          </tr>
        </tbody>
      </table>
      <p><Term>ダークモード</Term>は、暗い背景に明るい文字へ配色を反転したテーマです。単に色を反転するだけではコントラストや境界線の見え方が変わるため、ベース・テキスト・アクセントを別セットで定義するのが一般的です。Tailwind CSSでは<code>dark:</code>プレフィックスで切り替えられます(<Link href="/dev/frontend/tailwind">Tailwind CSS</Link>)。</p>

      <Heading num="04">タイポグラフィ ― フォント・行間・可読性</Heading>
      <p><Term>タイポグラフィ</Term>は文字の選び方と組版の設計です。Webでは次の3点が実装に直結します。</p>
      <table>
        <thead>
          <tr>
            <th>要素</th>
            <th>ポイント</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">フォント</td>
            <td>本文用と見出し用を分ける。システムフォントかWebフォントか、読み込み速度との兼ね合いを考える</td>
          </tr>
          <tr>
            <td className="hl">サイズと階層</td>
            <td>見出し(h1〜h4)・本文・補足で段階を付け、1画面にサイズ種類を出し過ぎない</td>
          </tr>
          <tr>
            <td className="hl">行間(ラインハイト)</td>
            <td>本文は font-size の 1.4〜1.7 倍程度が読みやすい目安。行が詰まると長文が読みにくい</td>
          </tr>
        </tbody>
      </table>
      <p>可読性は「美しさ」とは別軸です。装飾的なフォントを本文に使う、行長を画面幅いっぱいに伸ばす、色だけで重要度を伝える、といった選択は、特にモバイルやアクセシビリティの観点で不利になりやすいです。</p>

      <Heading num="まとめ">構造・色・文字の3層</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>レイアウトで優先順位を見せる</h4>
          <p>グリッド・余白・視線誘導で、何から読むかを決めます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>配色は役割で分ける</h4>
          <p>ベース・テキスト・アクセント。ダークモードは別セットで設計します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>タイポは可読性優先</h4>
          <p>フォント・サイズ階層・行間を揃え、CSS/Tailwindに落とし込みます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/web-basics" tag="フロントエンド">
              Web基礎
            </RelatedLink>
            <RelatedLink href="/dev/frontend/tailwind" tag="フロントエンド">
              Tailwind CSS
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/web" tag="設計">
              Web UIデザイン
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/system" tag="フロントエンド">
              コンポーネントとデザインシステム
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
