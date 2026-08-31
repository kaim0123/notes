import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "UXの基礎" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>UXの基礎 ― 誰のために、何を作るか</h1>
        <Lead>
          フロントエンド実装は「見た目を整える」作業ではありません。利用者が目的を達成できるか、その接点としての画面をどう置くか、そしてどう反復して改善するか ― この3つを押さえておくと、ReactやTailwindで組み立てるときの判断の軸がはっきりします。
        </Lead>
      </Hero>

      <Heading num="01">UXの5要素 ― 体験を層で捉える</Heading>
      <p>
        <Term>UXの5要素</Term>は、体験設計を抽象(戦略)から具体(表面)へ段階的に落としていく枠組みです。下の層ほど変更コストが高く、上の層ほど利用者に直接見えます。
      </p>

      <DiagramFrame
        slug="frontend-ux-five-elements"
        aspect="640 / 300"
        caption="UXの5要素を下から上へ積み上げた図。いちばん下が戦略で、誰のために何を達成させるかを決める。その上が範囲で、何を作り何を作らないかを決める。その上が構造で、情報と操作の流れを決める。その上が骨格で、画面の配置とナビゲーションを決める。いちばん上が表面で、色や文字などの見た目を決める。下の層ほど幅が広く変更コストが高く、上の層ほど利用者に直接見える。右側に、実装者が触れるのは主に骨格と表面だが、構造が決まっていないと上をいくら整えても使いにくいままだという注記がある。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>決めること</th><th>揺れたときの影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">戦略</td><td>誰のために、何を達成させるか</td><td>すべてがやり直しになる</td></tr>
          <tr><td className="hl">範囲</td><td>何を作り、何を作らないか</td><td>機能が際限なく増える</td></tr>
          <tr><td className="hl">構造</td><td>情報と操作の流れ、画面遷移</td><td>個々の画面を整えても迷子になる</td></tr>
          <tr><td className="hl">骨格</td><td>画面内の配置とナビゲーション</td><td>探しにくい・押しにくい</td></tr>
          <tr><td className="hl">表面</td><td>色・文字・ビジュアル</td><td>印象が揃わない</td></tr>
        </tbody>
      </table>

      <p>
        実装者が直接触れるのは骨格と表面ですが、<Term>構造が決まっていないと、コンポーネントをいくら整えても使いにくい画面になります</Term>。「この画面から次にどこへ行くのか」に答えが無いまま作り始めていないかは、着手前に確かめる価値があります。
      </p>

      <Heading num="02">利用者を中心に回す ― UCDとHCD</Heading>
      <p>
        <Term>ユーザー中心設計(UCD)</Term>と<Term>人間中心設計(HCD)</Term>は、どちらも「作り手の思い込みではなく、実際の利用者にもとづいて設計し、評価して改善する」という考え方です。前者はビジネス文脈で、後者は国際規格として体系化された呼び方で、実務ではほぼ同義に使われます。
      </p>
      <p>
        共通するのは、一度作って終わりにせず<Term>理解 → 設計 → 評価 → 改善</Term>を繰り返す点です。反復の具体的な形と評価手法は<Link href="/frontend/ux-hcd">人間中心設計と評価</Link>で扱います。
      </p>

      <Heading num="03">ダブルダイヤモンド ― 発散と収束を2回</Heading>
      <p>
        <Term>ダブルダイヤモンド</Term>は、問題探索と解決を2サイクルで進める枠組みです。
      </p>

      <DiagramFrame
        slug="frontend-ux-double-diamond"
        aspect="640 / 260"
        caption="ダブルダイヤモンドを2つの菱形で示した図。左の菱形は問題の領域で、前半の発見で利用者や制約を広く調べて問題の候補を広げ、後半の定義で本当に解くべき課題を1つに絞る。右の菱形は解決の領域で、前半の開発で解決案を複数考えて試作で形にし、後半の提供で利用者に試してもらい最良案を選ぶ。菱形が2つ並ぶことで、広げてから絞るというリズムを2回繰り返すことが表されている。中央のくびれが、解くべき課題が1つに定まる地点にあたる。"
      />

      <table>
        <thead>
          <tr><th>フェーズ</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">発見(発散)</td><td>利用者・文脈・制約を広く調べ、問題の候補を洗い出す</td></tr>
          <tr><td className="hl">定義(収束)</td><td>本当に解くべき課題を1つに絞り、要求を言語化する</td></tr>
          <tr><td className="hl">開発(発散)</td><td>解決案を複数考え、試作で形にする</td></tr>
          <tr><td className="hl">提供(収束)</td><td>利用者で試し、最良案を選んでリリース・改善する</td></tr>
        </tbody>
      </table>

      <p>
        核心は<Term>広げてから絞る、を2回</Term>というリズムです。最初の菱形を飛ばして解決案から入ると、「うまく作れたが、そもそも解くべき問題ではなかった」という結末になります。<Link href="/frontend/ux-design-thinking">デザイン思考</Link>は、この流れを実践向けに具体化したものと捉えると整理しやすくなります。
      </p>

      <Analogy label="💡 たとえるなら">
        菱形を2つ並べる形は、医者の診察に似ています。前半は問診と検査で症状の候補を広げ、1つの診断名に絞る。後半は治療法をいくつか比べ、1つを選んで処方する。診断を飛ばして薬を出す医者がいないのと同じで、問題の菱形を省いた解決は当たりません。
      </Analogy>

      <Heading num="まとめ">全体像を押さえてから実装へ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>下の層が揺れると上が迷子になる</h4>
          <p>戦略・範囲・構造が定まっていなければ、骨格と表面をいくら整えても効かない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>一度で正解は出ない</h4>
          <p>理解・設計・評価・改善を回す。反復そのものが方法論の本体。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>広げてから絞る、を2回</h4>
          <p>問題の菱形を省くと、正しく作られた間違ったものができる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、この反復を規格として体系化した<Link href="/frontend/ux-hcd">人間中心設計と評価</Link>を見ていきます。
      </p>

      <DocsFooter href="/frontend/ux-basics" />
    </DocsPage>
  );
}
