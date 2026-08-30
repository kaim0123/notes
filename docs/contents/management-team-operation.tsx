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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "チーム運営と3つの力",
};

const topics = [
  { href: "/management/team/goals", title: "目標設定", desc: "役割・貢献モデルから状態目標（Be）へ落とす" },
  { href: "/management/team/momentum", title: "戦略方針とモメンタム", desc: "方向性を置き、勢いを技術でつくる" },
  { href: "/management/org/structure", title: "組織構造とアサイン", desc: "文鎮型・構造型・プロジェクト型とWill×Can" },
  { href: "/management/org/delegation", title: "権限委譲", desc: "決める／実行するを分けて渡す" },
  { href: "/management/individual/onboarding", title: "採用・オンボーディング・育成", desc: "口説き、立ち上げ、計画的に育てる" },
  { href: "/management/team/rules", title: "ルールと相互理解", desc: "急拡大でも壊れないチームをつくる" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>チーム運営と3つの力 ― 実践編の入口</h1>
        <Lead>
          <Term>チーム運営</Term>とは、経営から逆算して「どんなチームでゴールを達成するか」を組み立て、つくった戦略や組織を<Term>仕組み</Term>で動かしながら目標を達成していく営みです。ここから始まる実践編では、現場のマネージャーが明日から使えるノウハウを、具体的な型として並べていきます。
        </Lead>
      </Hero>

      <Heading num="01">チーム運営とは ― 経営から逆算して組み立てる</Heading>
      <p>チーム運営の根本にあるのは、人と人の<Term>協働</Term>です。どれだけ立派な戦略や組織図を描いても、それを実際に動かすのは一人ひとりの人間であり、その土台となるのが<Term>ピープルマネジメント</Term>です。経営が目指す方向をチームの目標へブレークダウンし、戦略や組織という仕組みでそれを動かしていく ― この一連の流れ全体がチーム運営です。</p>

      <Heading num="02">ピープルマネジメントの3レイヤー</Heading>
      <p>ピープルマネジメントは、下から積み上がる3つの層として整理できます。技術論に飛びつく前に、まず土台の層が据わっているかを確認するのが肝心です。</p>
      <Diagram caption="信頼関係という土台の上に、対話の技術、そしてリーダーシップが積み上がる">
        <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={110} y={24} width={300} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={260} y={44} fill="#f2f2f2" fontSize="12" textAnchor="middle">③ リーダーシップ</text>
          <text x={260} y={60} fill="#9a9a9a" fontSize="10" textAnchor="middle">「あなたの言うことなら従う」と言わせる芯</text>

          <rect x={70} y={78} width={380} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={260} y={98} fill="#f2f2f2" fontSize="12" textAnchor="middle">② 対話の技術</text>
          <text x={260} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">相互理解し、相手を動かす</text>

          <rect x={30} y={132} width={460} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={260} y={152} fill="#f2f2f2" fontSize="12" textAnchor="middle">① 信頼関係の構築・業務指示の基盤</text>
          <text x={260} y={168} fill="#9a9a9a" fontSize="10" textAnchor="middle">日々のコミュニケーションの土台</text>
        </svg>
      </Diagram>
      <p>まず技術論の手前に、<Term>信頼関係の構築</Term>や日々の業務指示といったコミュニケーションの基盤があります。その上に、相互理解し相手を動かす<Term>対話の技術</Term>が乗り、最終的に「あなたの言うことなら従う」と言わせる<Term>リーダーシップ</Term>（マネージャーとしての芯）が積み上がります。下の層が欠けたまま上の層だけを磨いても、思うようには機能しません。</p>

      <Heading num="03">総合格闘技としての統合性</Heading>
      <p>ここで強調したいのは、マネジメントが<Term>総合格闘技</Term>のような統合性を持つということです。個々の技を切り出して磨くだけでは足りず、必要なモジュールがきちんとインストールされていないと、目の前の課題は解けません。</p>
      <Analogy label="💡 たとえるなら">
        メンバーのモチベーション低下が表面化したとき、すぐに「1on1をどうするか」という対話技術の話に落ちがちです。しかし実際には、対話技術の問題以前に<Term>チーム目標そのものがなかった</Term>ことが原因である場合があります。ワンオンワンや対話だけを切り取っても、前提となる目標設定が欠けていれば本質には届きません。だからこそ、各モジュールを一通りそろえたうえで統合して使う視点が要ります。
      </Analogy>

      <Heading num="04">マネージャーの力量を測る3つの軸</Heading>
      <p>マネージャーの力量を測るときは、<Term>チーム運営・マネジメント・リーダーシップ</Term>のバランスで捉えると分かりやすくなります。どれか一つが突出していても、他が欠けていればチームは安定しません。自分がどの軸に偏っているかを意識できると、伸ばすべき方向が見えてきます。</p>

      <Heading num="05">実践編の歩き方</Heading>
      <p>体系が「地図」なら、実践編は「歩き方」です。以下のページを、目標を立てるところから順に読み進めると、チーム運営の一連の流れがつかめます。</p>
      <IndexGrid>
        {topics.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="実践" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="まとめ">まず土台、それから技</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>逆算して組み立てる</h4><p>経営から逆算し、「どんなチームでゴールを達成するか」を仕組みで動かすのがチーム運営です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3レイヤーは土台から</h4><p>信頼関係→対話の技術→リーダーシップ。下の層が欠けたまま上だけ磨いても機能しません。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>統合して使う</h4><p>課題は単一の技ではなく、目標設定・対話・リーダーシップの統合で解けます。</p></Card>
      </CardGrid>

      <p>次は実践の第一歩、<Link href="/management/team/goals">目標設定</Link>から見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team/goals" tag="マネジメント">目標設定</RelatedLink>
                    <RelatedLink href="/management/org/structure" tag="マネジメント">組織構造とアサイン</RelatedLink>
                    <RelatedLink href="/management" tag="マネジメント">マネジメントの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
