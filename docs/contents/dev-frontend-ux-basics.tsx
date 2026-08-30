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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "UXの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>UXの基礎 ― 誰のために、何を作るか</h1>
        <Lead>
          フロントエンド実装は「見た目を整える」作業だけではありません。利用者が目的を達成できるか(<Term>UX</Term>)、その接点としての画面(<Term>UI</Term>)、そして反復して改善する設計の進め方を押さえておくと、ReactやTailwindで組み立てる判断の軸がはっきりします。
        </Lead>
      </Hero>

      <Heading num="01">UX・UI・ユーザビリティ ― 指す範囲が違う</Heading>
      <p>3つはよく一緒に語られますが、レイヤーが異なります。</p>
      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">UX(ユーザーエクスペリエンス)</td>
            <td>利用者が製品・サービス全体を通じて得る体験。目的達成のしやすさ、満足度、感情まで含む</td>
          </tr>
          <tr>
            <td className="hl">UI(ユーザーインタフェース)</td>
            <td>人とシステムが接する画面・ボタン・入力欄など、触れる部分そのもの</td>
          </tr>
          <tr>
            <td className="hl">ユーザビリティ</td>
            <td>特定の利用者が、目的をどれだけ効果的・効率的・満足に達成できるかという「使いやすさ」</td>
          </tr>
        </tbody>
      </table>
      <p>UIはUXを形にする手段のひとつです。ボタンの配置や色(UI)が整っていても、全体の流れが分かりにくければUXは悪いままです。逆に、体験設計(UX)が固まっていれば、UIの判断も一貫します。用語の整理は<Link href="/dev/frontend/ux/usability">UI・ユーザビリティ・アクセシビリティ</Link>でも扱います。</p>

      <Analogy label="💡 たとえるなら">
        レストランにたとえると、UXは「料理の味・待ち時間・接客・店内の雰囲気を含めた食事全体の体験」、UIは「メニュー表・テーブル配置・注文端末」です。メニュー(UI)が読みやすくても、料理が来るまで1時間待てば体験(UX)は良くありません。
      </Analogy>

      <Heading num="02">UXの5要素 ― 体験を層で捉える</Heading>
      <p>Jesse James Garrettが示した<Term>UXの5要素</Term>は、体験設計を抽象(戦略)から具体(表面)へと段階的に落としていく枠組みです。下の層ほど変更コストが高く、上の層ほど利用者に直接見えます。</p>
      <Diagram caption="下から上へ積み上げる ― 戦略が揺れると表面のUIも迷子になる">
        <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={80} y={170} width={360} height={32} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={260} y={190} fill="#f2f2f2" fontSize="11" textAnchor="middle">
            ①戦略 ― 誰のために、何を達成させるか
          </text>
          <rect x={100} y={130} width={320} height={32} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={260} y={150} fill="#f2f2f2" fontSize="11" textAnchor="middle">
            ②範囲 ― 何を作り、何を作らないか
          </text>
          <rect x={120} y={90} width={280} height={32} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={260} y={110} fill="#f2f2f2" fontSize="11" textAnchor="middle">
            ③構造 ― 情報と操作の流れ
          </text>
          <rect x={140} y={50} width={240} height={32} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={260} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">
            ④骨格 ― 画面の配置とナビゲーション
          </text>
          <rect x={160} y={10} width={200} height={32} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={260} y={30} fill="#f2f2f2" fontSize="11" textAnchor="middle">
            ⑤表面 ― 色・タイポ・ビジュアル
          </text>
        </svg>
      </Diagram>
      <p>フロントエンド実装者は④骨格・⑤表面に直接触れることが多いですが、③構造(画面遷移・情報の優先順位)を理解していないと、コンポーネントをいくら整えても使いにくい画面になります。</p>

      <Heading num="03">UCDとHCD ― 利用者を中心に反復する</Heading>
      <p><Term>ユーザー中心設計(UCD)</Term>と<Term>人間中心設計(HCD)</Term>は、どちらも「作り手の思い込みではなく、実際の利用者にもとづいて設計し、評価して改善する」という考え方です。UCDはビジネス文脈で、HCDは国際規格(JIS Z 8530など)で体系化された呼び方として使われることが多く、実務上はほぼ同義で語られます。</p>
      <p>共通のポイントは、一度作って終わりにせず、<strong>理解 → 設計 → 評価 → 改善</strong>を繰り返すことです。HCDの反復プロセスや評価手法の詳細は<Link href="/dev/frontend/ux/hcd">人間中心設計と評価</Link>を参照してください。</p>

      <Heading num="04">ダブルダイヤモンド ― 発散と収束を2回回す</Heading>
      <p><Term>ダブルダイヤモンド</Term>は、英国デザイン協会(D&AD)が示した、問題探索と解決を2サイクルで進める枠組みです。</p>
      <table>
        <thead>
          <tr>
            <th>フェーズ</th>
            <th>やること</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">発見(発散)</td>
            <td>利用者・文脈・制約を広く調べ、問題の候補を洗い出す</td>
          </tr>
          <tr>
            <td className="hl">定義(収束)</td>
            <td>本当に解くべき課題を1つに絞り、要求を言語化する</td>
          </tr>
          <tr>
            <td className="hl">開発(発散)</td>
            <td>解決案を複数考え、試作で形にする</td>
          </tr>
          <tr>
            <td className="hl">提供(収束)</td>
            <td>利用者でテストし、最良案を選んでリリース・改善する</td>
          </tr>
        </tbody>
      </table>
      <p>「幅広く探してから絞る」「案を出してから選ぶ」という<strong>発散と収束のリズム</strong>が、ダブルダイヤモンドの核心です。次章のデザイン思考も、この流れを実践向けに具体化したものと捉えると整理しやすくなります。</p>

      <Heading num="まとめ">体験の全体像を押さえてから実装へ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>UXは体験、UIは接点</h4>
          <p>UIだけ整えてもUXは改善しません。体験全体を見てから画面を決めます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>5要素で抽象から具体へ</h4>
          <p>戦略・範囲が揺れると、骨格・表面の実装も迷子になります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>反復と発散・収束</h4>
          <p>UCD/HCDの反復と、ダブルダイヤモンドの2サイクルが設計の骨格です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/ux/usability" tag="設計">
              UI・ユーザビリティ・アクセシビリティ
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/hcd" tag="設計">
              人間中心設計と評価
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/design-thinking" tag="フロントエンド">
              デザイン思考
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
