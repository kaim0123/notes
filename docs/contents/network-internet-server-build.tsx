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
  Aside,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "サーバー構築の実務",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>サーバー構築の実務 ― Windows ServerとLinux</h1>
        <Lead>
          「<Link href="/network/internet/server">サーバーの全体像</Link>」では、「サーバー」という言葉が機械そのものを指すこともあれば、役割ごとのソフトウェアを指すこともあるという分類を見ました。ここでは一歩進んで、実際にそのサーバーを構築・運用する実務 ―
          どんなOSを選び、どんな役割を持たせ、どう管理するのか ― を扱います。
        </Lead>
      </Hero>

      <Heading num="01">サーバーOSの2大陣営 ― Windows ServerとLinux</Heading>
      <p>「<Link href="/network/internet/server">サーバーの全体像</Link>」で見た通り、サーバーソフトはハードウェアの上で動きます。そのハードウェアを土台から動かすOSとして広く使われているのが<Term>Windows Server</Term>と<Term>Linux</Term>です。どちらも「24時間稼働し、複数の利用者・プログラムからの依頼を捌く」という前提で作られている点は共通していますが、選ばれる場面や運用のスタイルは大きく異なります。</p>

      <table>
        <tbody>
          <tr><th></th><th>Windows Server</th><th>Linux</th></tr>
          <tr><td className="hl">操作方法</td><td>GUI(サーバーマネージャーなど)中心。CLIも可能</td><td>CLI(コマンドライン)中心。GUIなしの構成も一般的</td></tr>
          <tr><td className="hl">ライセンス</td><td>OS本体+クライアントアクセスライセンス(CAL)が必要な有償製品</td><td>多くのディストリビューションが無償。商用サポート契約は別途可能</td></tr>
          <tr><td className="hl">得意な領域</td><td>Active Directoryを中心とした社内システムの集中管理</td><td>Webサーバーやクラウドインフラなど、大規模・自動化された環境</td></tr>
          <tr><td className="hl">代表例</td><td>Windows Server 2022など</td><td>Ubuntu Server、RHEL/Rocky Linux、Debianなど</td></tr>
        </tbody>
      </table>

      <p>Linuxが世界のWebサーバーやクラウドインフラの主流になっている理由は、動作が軽量で安定していること、オープンソースゆえに無償で使え、豊富なOSSエコシステムがあること、そしてコンテナやクラウドサービスとの親和性が高いことにあります。一方Windows Serverは、後述するActive Directoryのような集中管理の仕組みと、Windows PCとの親和性の高さから、社内システムの現場で根強く使われ続けています。</p>

      <Heading num="02">Active Directory ― 集中管理の考え方</Heading>
      <p><Term>Active Directory(AD)</Term>は、Windows Serverが提供する<Term>ディレクトリサービス</Term>です。組織内に散らばる「誰が」「どのPCで」「何を許可されているか」という情報を1か所にまとめて管理し、社員が増えても、PCが増えても、都度バラバラに設定して回らずに済むようにします。中心となるサーバーを<Term>ドメインコントローラー</Term>と呼びます。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ユーザー</h4>
          <p>社員1人ひとりのアカウントを一元管理。1回のログイン情報で複数のシステムにアクセスできる、シングルサインオンの土台になります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>PC(コンピュータ)</h4>
          <p>組織が管理する端末を「コンピュータオブジェクト」として登録し、どのPCがドメインに参加しているかを把握します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ポリシー</h4>
          <p><Term>グループポリシー(GPO)</Term>により、パスワードの強度やソフトウェアの配布・利用制限などのルールを、部署やPCの単位でまとめて適用できます。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        Active Directoryは会社の「総務部の名簿と規則集」です。社員証(ユーザーアカウント)を1枚発行すれば建物のどの部屋(社内システム)にも入れるようにし、貸与するPC(コンピュータオブジェクト)を台帳で管理し、就業規則(グループポリシー)を全員に一律で適用します。部署ごとに別々の名簿と規則を作らずに済むのが、集中管理の強みです。
      </Analogy>

      <Heading num="03">代表的なサーバーの役割</Heading>
      <p>「<Link href="/network/internet/server">サーバーの全体像</Link>」ではWeb・AP・DBサーバーを中心に見ましたが、社内インフラの実務ではこれ以外にもさまざまな役割のサーバーが登場します。</p>

      <table>
        <tbody>
          <tr><th>役割</th><th>何をするか</th></tr>
          <tr><td className="hl">DNSサーバー</td><td>社内・社外の名前解決を行う。ADドメインの名前解決には欠かせない</td></tr>
          <tr><td className="hl">DHCPサーバー</td><td>ネットワークに接続した機器へ、自動でIPアドレスを割り当てる</td></tr>
          <tr><td className="hl">ファイルサーバー</td><td>共有フォルダを提供し、部署・個人ごとにアクセス権限を管理する</td></tr>
          <tr><td className="hl">プリントサーバー</td><td>プリンタを共有し、複数人からの印刷依頼をキューで順番に処理する</td></tr>
          <tr><td className="hl">Webサーバー</td><td>社内向けのイントラサイトや、社外向けのWebアプリを公開する</td></tr>
          <tr><td className="hl">メールサーバー</td><td>組織内外とのメールの送受信を中継・保管する</td></tr>
          <tr><td className="hl">認証サーバー</td><td>ログイン情報を検証し、正当な利用者かどうかを判定する。ADのドメインコントローラー自体もこの役割を兼ねる</td></tr>
        </tbody>
      </table>

      <Heading num="04">1台に複数の役割を持たせる ― 実務のポイント</Heading>
      <p>ここまで役割ごとに分けて説明しましたが、実際の現場では<strong>1台の物理サーバー、あるいは1台の仮想サーバーに、複数の役割を同時に持たせる</strong>ことがよくあります。例えば小規模なオフィスでは、1台のWindows Serverが「ドメインコントローラー+DNSサーバー+DHCPサーバー」を兼任するという構成は珍しくありません。</p>

      <Diagram caption="小規模構成の例:1台のサーバーが複数の役割を兼任している">
        <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={200} y={20} width={240} height={150} rx="10" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={44} fill="#f2f2f2" fontSize="13" textAnchor="middle">1台のサーバー</text>

          <rect x={220} y={58} width={90} height={36} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={265} y={80} fill="#f2f2f2" fontSize="11" textAnchor="middle">ドメイン</text>
          <text x={265} y={91} fill="#f2f2f2" fontSize="11" textAnchor="middle">コントローラー</text>

          <rect x={330} y={58} width={90} height={36} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={375} y={80} fill="#f2f2f2" fontSize="12" textAnchor="middle">DNS</text>

          <rect x={220} y={106} width={90} height={36} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={265} y={128} fill="#f2f2f2" fontSize="12" textAnchor="middle">DHCP</text>

          <rect x={330} y={106} width={90} height={36} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={375} y={128} fill="#f2f2f2" fontSize="11" textAnchor="middle">ファイル共有</text>

          <text x={320} y={185} fill="#9a9a9a" fontSize="11" textAnchor="middle">組織が大きくなるにつれ、負荷や障害の影響範囲を絞るために役割ごと別サーバーへ分けていく</text>
        </svg>
      </Diagram>

      <p>役割を1台にまとめる利点は、機材やライセンスのコストを抑えられ、管理する台数も少なく済むことです。Windows Serverでは「役割と機能の追加」ウィザードから必要な役割を後から足していけますし、Linuxでも該当するデーモン(サービス)をパッケージとして追加インストールするだけで、同じマシンに役割を増やせます。</p>
      <p>一方で、組織の規模が大きくなり、アクセスが集中したり、可用性の要求が高まったりすると、1台に役割を集めすぎるリスクが表面化します。ある役割の負荷が高まると他の役割にも影響が及びますし、そのサーバーが1台落ちるだけで複数の役割が同時に止まってしまうためです。そのため実務では、まず1台の兼任構成から始め、必要に応じて役割ごとに専用サーバーへ切り出していく、という段階的な設計がよく取られます。</p>

      <Aside label="豆知識">
        クラウド環境(AWSやAzureなど)では、こうした役割ごとのサーバーを物理的に用意する代わりに、必要な分だけ仮想サーバーやマネージドサービスとして立ち上げるのが一般的です。考え方の土台(役割の分離・集中管理)は、オンプレミスの実務と変わりません。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>OS選びは運用スタイルの選択でもある</h4>
          <p>GUIと集中管理を重視するならWindows Server、軽量さとOSSエコシステムを重視するならLinux、という傾向があります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Active Directoryはユーザー・PC・ポリシーを一元管理する</h4>
          <p>ドメインコントローラーを中心に、組織のアカウントと端末とルールを1か所にまとめます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>役割は「まとめる」も「分ける」も実務判断</h4>
          <p>小規模なら1台に複数の役割を持たせ、規模や可用性の要求が上がるにつれて役割ごとに分離していきます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                    <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
                    <RelatedLink href="/network/internet/isp" tag="インターネット">ISP接続とCDN</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
