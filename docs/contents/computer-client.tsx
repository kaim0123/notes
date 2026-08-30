import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  Aside,
  Diagram,
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クライアント管理の実務",
};

const topics = [
  {
    href: "/computer/client/asset",
    title: "資産管理 ― 台帳・在庫・棚卸",
    desc: "「何を、誰が、どこで使っているか」を台帳で把握し、予備を切らさず、実機と帳簿を突き合わせる",
  },
  {
    href: "/computer/client/kitting",
    title: "キッティングと配布・回収",
    desc: "PCを使える状態に仕立て、入社・異動・退職に合わせて貸与し、返却させる",
  },
  {
    href: "/computer/client/license",
    title: "ライセンス管理",
    desc: "Office・Adobe などソフトウェアの利用権を、契約数と実インストール数のズレなく管理する",
  },
  {
    href: "/computer/client/security",
    title: "端末セキュリティ管理",
    desc: "BitLocker・MDM・ウイルス対策・USB制御で、端末からの情報漏えいと侵入を防ぐ",
  },
  {
    href: "/computer/client/maintenance",
    title: "更新管理と保守・故障対応",
    desc: "OS・ファームウェアを最新に保ち、壊れたときは修理・代替機で業務を止めない",
  },
  {
    href: "/computer/client/disposal",
    title: "廃棄管理",
    desc: "役目を終えた端末を、データを確実に消してから安全に手放し、証跡を残す",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>クライアント管理の実務 ― 端末のライフサイクルを回す</h1>
        <Lead>
          従業員が使うPCやスマートフォンは、届いた瞬間から退職・廃棄されるまで、組織として管理し続ける「資産」です。この一連の流れを担うのが企業の<Term>情報システム部門(情シス)</Term>で、その仕事は「調達 → キッティング → 配布 → 運用 → 回収 → 廃棄」という<Term>ライフサイクル</Term>として捉えると全体像が見えてきます。ここでは各段階の業務を、時系列に沿って個別ページで掘り下げます。
        </Lead>
      </Hero>

      <Heading num="01">端末のライフサイクルという地図</Heading>
      <p>情シスの端末管理業務は、バラバラに存在するのではなく、1台のPCが会社に来てから去るまでの<Term>時間軸</Term>の上に並んでいます。まず調達した端末をキッティングで使える状態にし、入社者へ配布します。利用期間中は資産台帳で状態を把握し、セキュリティを効かせ、更新と故障対応で動き続けさせます。そして退職・故障・老朽化のタイミングで回収し、データを消してから廃棄します。</p>
      <p>この時間軸に沿った流れとは別に、<Term>資産管理・在庫管理・棚卸・ライセンス管理</Term>は特定の時点の業務ではなく、ライフサイクル全体を通じて<Term>常に走り続ける</Term>横断的な管理です。「いつの業務か」ではなく「全期間を支える帳簿」だと捉えると整理しやすくなります。</p>

      <Diagram caption="端末のライフサイクル(上段の流れ)と、それを全期間支える横断的な管理(下段)">
        <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
          {[
            { x: 10, label: "調達", sub: "購入・リース" },
            { x: 122, label: "キッティング", sub: "初期構築" },
            { x: 234, label: "配布", sub: "貸与・入社" },
            { x: 346, label: "運用", sub: "更新・保守" },
            { x: 458, label: "回収", sub: "返却・退職" },
            { x: 570, label: "廃棄", sub: "データ消去" },
          ].map((n, i) => (
            <g key={n.label}>
              <rect x={n.x} y={30} width={100} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
              <text x={n.x + 50} y={52} fill="#f2f2f2" fontSize="12" textAnchor="middle">{n.label}</text>
              <text x={n.x + 50} y={68} fill="#9a9a9a" fontSize="10" textAnchor="middle">{n.sub}</text>
              {i < 5 && (
                <line x1={n.x + 100} y1={54} x2={n.x + 112} y2={54} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowLc)" />
              )}
            </g>
          ))}

          <rect x={10} y={120} width={660} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={340} y={142} fill="#9a9a9a" fontSize="11" textAnchor="middle">全期間を通じて継続する横断的な管理</text>
          <text x={340} y={164} fill="#f2f2f2" fontSize="11" textAnchor="middle">資産管理(台帳) ・ 在庫管理 ・ 棚卸 ・ ライセンス管理 ・ セキュリティ管理</text>
          <text x={340} y={182} fill="#9a9a9a" fontSize="10" textAnchor="middle">「今どの段階か」に関わらず、常に把握・維持し続ける</text>

          <defs>
            <marker id="arrowLc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Heading num="02">各段階を掘り下げる</Heading>
      <p>以下の6ページで、ライフサイクルの各段階と横断的な管理を順に見ていきます。上から順に読むと、1台の端末が会社に来てから去るまでを追体験できる構成になっています。</p>

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

      <Analogy label="💡 たとえるなら">
        端末管理は<strong>従業員の入社から退職までの人事の流れ</strong>によく似ています。採用(調達)して、研修で戦力化(キッティング)し、配属(配布)して、在職中は勤怠や評価で状態を把握(資産管理・運用)し、退職時には貸与物を返却させ、アカウントを閉じる(回収・廃棄)。情シスは「モノ版の人事部」として、端末一人ひとりの一生に責任を持ちます。
      </Analogy>

      <Aside label="豆知識">
        端末のライフサイクル管理は、英語では <strong>IT Asset Management(ITAM)</strong> や <strong>PC ライフサイクル管理(PCLM)</strong> と呼ばれます。近年は個々の作業を人手で行うのではなく、MDM やクラウド管理サービスで自動化し、調達から廃棄までを1つのダッシュボードで追える形が主流になりつつあります。
      </Aside>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/basics" tag="コンピュータ">PCハードウェアの基礎</RelatedLink>
                    <RelatedLink href="/security/basics" tag="セキュリティ">情報セキュリティの目的と脅威</RelatedLink>
                    <RelatedLink href="/ops/cost" tag="サービス運営">コスト管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
