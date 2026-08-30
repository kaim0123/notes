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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "人間中心設計と評価",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>人間中心設計と評価 ― 誰のために、どう確かめるか</h1>
        <Lead>
          良いUIは、作り手の思い込みではなく、実際の利用者の観察から生まれます。ここでは、利用者を設計の中心に据える人間中心設計、誰もが使えることを目指すユニバーサルデザインとアクセシビリティ規格、そして使いやすさを検証する評価手法を整理します。
        </Lead>
      </Hero>

      <Heading num="01">人間中心設計 ― 利用者を中心に回す</Heading>
      <p><Term>人間中心設計(HCD)</Term>は、利用者の実態を理解し、設計し、評価する、というサイクルを繰り返して使いやすさを高めるアプローチです。国際規格や<Term>JIS Z 8530</Term>で、次のような反復プロセスとして定義されています。</p>
      <Diagram caption="人間中心設計は、利用状況の理解から評価までを繰り返し、満足のいくまでサイクルを回す">
        <svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="11" fill="#f2f2f2" textAnchor="middle">
            <rect x={20} y={55} width={130} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={85} y={73}>①利用状況の</text><text x={85} y={88}>把握・理解</text>
            <rect x={180} y={55} width={130} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={245} y={73}>②要求事項の</text><text x={245} y={88}>明確化</text>
            <rect x={340} y={55} width={130} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={405} y={81}>③設計による解決</text>
            <rect x={500} y={55} width={120} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={560} y={81}>④評価</text>
          </g>
          <g stroke="#5f5f5f" strokeWidth="1.5">
            <line x1={150} y1={77} x2={178} y2={77} markerEnd="url(#arrHcd)" />
            <line x1={310} y1={77} x2={338} y2={77} markerEnd="url(#arrHcd)" />
            <line x1={470} y1={77} x2={498} y2={77} markerEnd="url(#arrHcd)" />
            <path d="M560 55 C560 20, 245 20, 245 53" fill="none" strokeDasharray="4 3" markerEnd="url(#arrHcd)" />
          </g>
          <text x={400} y={18} fill="#9a9a9a" fontSize="10" textAnchor="middle">評価で不足があれば前の工程へ戻る(反復)</text>
          <defs>
            <marker id="arrHcd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>ポイントは、一度作って終わりではなく、評価の結果を次の設計に反映して<strong>繰り返す</strong>ことです。利用者の反応を見て初めて分かる問題があるため、反復こそが使いやすさの源になります。</p>

      <Heading num="02">ユニバーサルデザインとアクセシビリティ規格</Heading>
      <p><Term>ユニバーサルデザイン</Term>は、年齢・能力・状況にかかわらず、できるだけ多くの人がそのまま使えるように最初から設計する考え方です。特別な対応を後付けするのではなく、はじめから誰もが使える形を目指します。</p>
      <p>Webのアクセシビリティには具体的な指針があります。国際的な指針が<Term>WCAG</Term>(W3Cの<Term>WAI</Term>が策定)、日本の規格が<Term>JIS X 8341</Term>です。これらは、色だけに頼らない・キーボードだけで操作できる・画像に代替テキストを付ける、といった具体的な達成基準を定めています。</p>

      <Analogy label="💡 たとえるなら">
        ユニバーサルデザインは「自動ドア」です。車いすの人も、荷物で手がふさがった人も、子どもも、特別な操作なしに通れます。「あとからスロープを付ける」のではなく、最初から誰もが使える形にしておく発想です。
      </Analogy>

      <Heading num="03">評価手法 ― 使いやすさを確かめる</Heading>
      <p>設計した画面が本当に使いやすいかは、確かめて初めて分かります。代表的な2つの手法があります。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ヒューリスティック評価</td><td>専門家が、経験則(ヒューリスティックス)にもとづき問題点を洗い出す。少人数・低コストで実施できる</td></tr>
          <tr><td className="hl">ユーザビリティテスト</td><td>実際の利用者に課題を操作してもらい、つまずく箇所を観察する。生の反応から本当の問題が見える</td></tr>
        </tbody>
      </table>
      <p>専門家によるヒューリスティック評価は手早く問題を見つけられますが、実利用者でしか気づけない問題もあります。両者を組み合わせるのが効果的です。</p>

      <Heading num="まとめ">利用者中心で、繰り返し確かめる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>人間中心設計は反復で磨く</h4><p>理解→要求→設計→評価を繰り返し、使いやすさを高めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>最初から誰もが使える形に</h4><p>ユニバーサルデザインとWCAG/JIS X 8341で、アクセシビリティを担保します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>評価で思い込みを検証する</h4><p>ヒューリスティック評価とユーザビリティテストで、実際の使いやすさを確かめます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/ux/usability" tag="ユーザーインタフェース">UI・ユーザビリティ・アクセシビリティ</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/screen" tag="ユーザーインタフェース">画面設計と入力チェック</RelatedLink>
                    <RelatedLink href="/dev/sdlc/review" tag="開発工程">レビューと品質確認</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/design-thinking" tag="フロントエンド">デザイン思考</RelatedLink>
                    <RelatedLink href="/dev/frontend/a11y" tag="フロントエンド">アクセシビリティ実装</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
