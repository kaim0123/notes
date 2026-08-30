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
  Analogy,
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クライアント管理の実務",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>クライアント管理の実務 ― 端末のライフサイクルを回す</h1>
        <Lead>
          従業員が使うPCやスマートフォンは、届いた瞬間から退職・廃棄されるまで、組織として管理し続ける「資産」です。この一連の流れを担うのが企業の<Term>情報システム部門(情シス)</Term>で、その仕事は「調達 → キッティング → 配布 → 運用 → 回収 → 廃棄」という<Term>ライフサイクル</Term>として捉えると全体像が見えてきます。ここでは各段階の業務を、時系列に沿って個別ページで掘り下げます。
        </Lead>
      </Hero>

      <Heading num="01">端末のライフサイクルという地図</Heading>
      <p>情シスの端末管理業務は、バラバラに存在するのではなく、1台のPCが会社に来てから去るまでの<Term>時間軸</Term>の上に並んでいます。まず調達した端末をキッティングで使える状態にし、入社者へ配布します。利用期間中は資産台帳で状態を把握し、セキュリティを効かせ、更新と故障対応で動き続けさせます。そして退職・故障・老朽化のタイミングで回収し、データを消してから廃棄します。</p>
      <p>この時間軸に沿った流れとは別に、<Term>資産管理・在庫管理・棚卸・ライセンス管理</Term>は特定の時点の業務ではなく、ライフサイクル全体を通じて<Term>常に走り続ける</Term>横断的な管理です。「いつの業務か」ではなく「全期間を支える帳簿」だと捉えると整理しやすくなります。</p>

      <DiagramFrame
        slug="computer-client-lifecycle"
        aspect="680 / 220"
        caption="端末のライフサイクル。上段は調達(購入・リース)→キッティング(初期構築)→配布(貸与・入社)→運用(更新・保守)→回収(返却・退職)→廃棄(データ消去)と左から右へ進む。下段の破線の枠は、資産管理(台帳)・在庫管理・棚卸・ライセンス管理・セキュリティ管理という、どの段階かに関わらず全期間を通じて続く横断的な管理を表す。"
      />

      <Heading num="02">各段階を掘り下げる</Heading>
      <p>以下の6ページで、ライフサイクルの各段階と横断的な管理を順に見ていきます。上から順に読むと、1台の端末が会社に来てから去るまでを追体験できる構成になっています。</p>

      <ul>
        <li>
          <Link href="/computer/client-asset">資産管理 ― 台帳・在庫・棚卸</Link>
          ― 「何を、誰が、どこで使っているか」を台帳で把握し、予備を切らさず、実機と帳簿を突き合わせる
        </li>
        <li>
          <Link href="/computer/client-kitting">キッティングと配布・回収</Link>
          ― PCを使える状態に仕立て、入社・異動・退職に合わせて貸与し、返却させる
        </li>
        <li>
          <Link href="/computer/client-license">ライセンス管理</Link>
          ― Office・Adobe などソフトウェアの利用権を、契約数と実インストール数のズレなく管理する
        </li>
        <li>
          <Link href="/computer/client-security">端末セキュリティ管理</Link>
          ― BitLocker・MDM・ウイルス対策・USB制御で、端末からの情報漏えいと侵入を防ぐ
        </li>
        <li>
          <Link href="/computer/client-maintenance">更新管理と保守・故障対応</Link>
          ― OS・ファームウェアを最新に保ち、壊れたときは修理・代替機で業務を止めない
        </li>
        <li>
          <Link href="/computer/client-disposal">廃棄管理</Link>
          ― 役目を終えた端末を、データを確実に消してから安全に手放し、証跡を残す
        </li>
      </ul>

      <Analogy label="💡 たとえるなら">
        端末管理は<strong>従業員の入社から退職までの人事の流れ</strong>によく似ています。採用(調達)して、研修で戦力化(キッティング)し、配属(配布)して、在職中は勤怠や評価で状態を把握(資産管理・運用)し、退職時には貸与物を返却させ、アカウントを閉じる(回収・廃棄)。情シスは「モノ版の人事部」として、端末一人ひとりの一生に責任を持ちます。
      </Analogy>

      <Aside label="豆知識">
        端末のライフサイクル管理は、英語では <strong>IT Asset Management(ITAM)</strong> や <strong>PC ライフサイクル管理(PCLM)</strong> と呼ばれます。近年は個々の作業を人手で行うのではなく、MDM やクラウド管理サービスで自動化し、調達から廃棄までを1つのダッシュボードで追える形が主流になりつつあります。
      </Aside>

      <DocsFooter href="/computer/client" />
    </DocsPage>
  );
}
