import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "サーバー構築の実務" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>サーバー構築の実務 ― OSを選び、役割を配る</h1>
        <Lead>
          <Link href="/infra/server">サーバーとストレージ</Link>では、サーバーという語が機械とプログラムの2つのレベルを指すこと、役割ごとに呼び分けられることを整理しました。ここではそれを実際に立てる側に回ります。<strong>どのOSを土台にし、どの役割を持たせ、何台に分けるか</strong> ― この3つは独立した選択に見えて、実は運用の形をまとめて決めてしまう1つの判断です。クラウドで仮想サーバーを立てる場合も、判断の構造は変わりません。
        </Lead>
      </Hero>

      <Heading num="01">土台のOS ― 2つの流儀</Heading>
      <p>
        サーバー用のOSとして広く使われているのは<Term>Windows Server</Term>と<Term>Linux</Term>です。どちらも24時間動き続け、複数の利用者からの依頼を捌く前提で作られていますが、選ばれる場面と運用のスタイルが違います。
      </p>

      <table>
        <thead>
          <tr><th></th><th>Windows Server</th><th>Linux</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">操作</td><td>GUI中心。コマンドでも操作できる</td><td>コマンド中心。GUIを入れない構成が普通</td></tr>
          <tr><td className="hl">ライセンス</td><td>本体と接続するクライアント分の有償ライセンス</td><td>多くのディストリビューションが無償。商用サポートは別契約</td></tr>
          <tr><td className="hl">得意な場面</td><td>ディレクトリサービスを軸にした社内システムの集中管理</td><td>Webサーバー、クラウド基盤、自動化された大規模環境</td></tr>
          <tr><td className="hl">代表例</td><td>Windows Server</td><td>Ubuntu Server、RHEL系、Debian</td></tr>
        </tbody>
      </table>

      <p>
        WebやクラウドでLinuxが主流なのは、軽くて安定していること、無償で使えて周辺のソフトウェアが揃っていること、そして<Link href="/infra/virtualization">コンテナ</Link>との相性 ― というより、コンテナがLinuxカーネルの機能そのものだから ― にあります。一方Windows Serverは、社内の端末がWindowsで揃っている環境での集中管理に強く、現場で使われ続けています。<Link href="/computer/os-linux">Linuxの成り立ち</Link>と<Link href="/computer/os-shell">シェル</Link>の知識が、そのまま日々の操作の土台になります。
      </p>

      <Aside label="GUIを入れないという選択">
        サーバーでは、使わないものを入れないほうが安全で軽くなります。画面を持たない構成にすると、更新の対象も、攻撃者が使える道具も減ります。<Link href="/infra/docker">コンテナのイメージを小さく保つ</Link>のと同じ発想が、OSの選び方にも効いてきます。
      </Aside>

      <Heading num="02">誰が何をしてよいかを、1か所で持つ</Heading>
      <p>
        端末と利用者が増えると、設定を配って回る作業が破綻します。そこで使うのが<Term>ディレクトリサービス</Term>です。Windows環境の<Term>Active Directory</Term>が代表で、中心となるサーバーを<Term>ドメインコントローラー</Term>と呼びます。
      </p>

      <DiagramFrame
        slug="infra-server-build-directory"
        aspect="700 / 280"
        caption="ディレクトリサービスによる集中管理。中央のドメインコントローラーが、社員のアカウント、貸与した端末、適用する規則を1か所で持つ。利用者は1つのアカウントで複数のシステムへログインでき、規則は部署単位でまとめて適用される。中央が無いと、システムごと・端末ごとに同じ設定を繰り返すことになり、退職者のアカウントが消し漏れる事故も起きやすくなる。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利用者</h4>
          <p>アカウントを一元管理する。1回の認証で複数のシステムを使える<Link href="/security/identity">シングルサインオン</Link>の土台になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>端末</h4>
          <p>組織が管理する端末を登録し、どれが参加しているかを把握する。<Link href="/computer/client-asset">資産管理</Link>とつながる部分。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>規則</h4>
          <p>パスワードの強度、ソフトウェアの配布や制限を、部署や端末の単位でまとめて適用する。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        総務部の名簿と規則集です。社員証を1枚発行すればどの部屋にも入れるようにし、貸与品を台帳で管理し、就業規則を全員へ一律に適用する。部署ごとに別々の名簿を作らずに済むことが、集中管理の値打ちです。裏を返せば、<strong>ここが止まると全員が入れなくなる</strong>ので、冗長化が要る筆頭でもあります。
      </Analogy>

      <Heading num="03">社内インフラに並ぶ役割</Heading>
      <p>
        Web・AP・DBのほかにも、組織のネットワークには役割を持つサーバーが並びます。
      </p>

      <table>
        <thead>
          <tr><th>役割</th><th>受け持つこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">DNSサーバー</td><td>社内外の名前解決。ドメイン参加の前提にもなる(<Link href="/network/nat-dhcp-dns">NAT・DHCP・DNS</Link>)</td></tr>
          <tr><td className="hl">DHCPサーバー</td><td>接続してきた機器へIPアドレスを自動で割り当てる</td></tr>
          <tr><td className="hl">ファイルサーバー</td><td>共有フォルダを提供し、部署・個人ごとの権限を管理する</td></tr>
          <tr><td className="hl">プリントサーバー</td><td>プリンタを共有し、印刷の依頼を順に処理する(<Link href="/computer/printer">プリンター</Link>)</td></tr>
          <tr><td className="hl">メールサーバー</td><td>組織内外のメールを中継・保管する</td></tr>
          <tr><td className="hl">認証サーバー</td><td>ログイン情報を検証する。ドメインコントローラーがこれを兼ねることが多い</td></tr>
        </tbody>
      </table>

      <Heading num="04">まとめるか、分けるか</Heading>
      <p>
        役割ごとに1台ずつ、とは限りません。小規模なら1台が複数を兼ねるのが普通ですし、それが間違いというわけでもありません。
      </p>

      <DiagramFrame
        slug="infra-server-build-consolidation"
        aspect="760 / 280"
        caption="役割を1台にまとめる構成と、役割ごとに分ける構成。左は機材もライセンスも管理台数も少なく済むが、その1台が止まればすべてが同時に止まり、1つの役割の負荷が他を巻き添えにする。右は影響範囲が限定され個別に増強もできるが、台数と手間が増える。実務では左から始めて、規模と可用性の要求が上がった役割から順に切り出していく。"
      />

      <p>
        判断の材料は3つです。<strong>負荷</strong>(1つの役割が他を圧迫しないか)、<strong>可用性</strong>(同時に止まって困る組み合わせか)、<strong>変更の頻度</strong>(片方の更新のために、もう片方まで止める羽目にならないか)。この3つ目は見落とされがちですが、日々の運用ではいちばん効いてきます。
      </p>

      <Aside label="クラウドでも判断は同じ">
        仮想サーバーやマネージドサービスを使う場合、機材を買う判断は消えますが、<strong>どこまでを1つのまとまりに載せるか</strong>という問いは残ります。むしろ台数を増やす手間が減ったぶん、分けすぎて管理対象が膨らむ側の失敗が起きやすくなります。分ける理由を都度言えるかどうかが基準になります。
      </Aside>

      <Heading num="05">立てた後に効いてくること</Heading>
      <p>
        構築が終わった時点から運用が始まります。最初に決めておくと後が楽になるのは次の4つです。
      </p>

      <table>
        <thead>
          <tr><th>決めごと</th><th>中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">手順を残す形</td><td>手で入れた設定は必ず忘れられる。構成をコードとして残せば、同じものを作り直せる</td></tr>
          <tr><td className="hl">更新の当て方</td><td>いつ、誰が、どの順で当てるか。無停止にするなら台数と切り替えの仕組みが要る</td></tr>
          <tr><td className="hl">入る経路</td><td>管理用の接続をどこから許すか。踏み台を挟むか(<Link href="/network/device-management">デバイスの管理</Link>)</td></tr>
          <tr><td className="hl">監視の口</td><td>立てた直後に監視へ載せる。後回しにすると、載っていないサーバーが必ず生まれる(<Link href="/infra/monitoring">監視と障害対応</Link>)</td></tr>
        </tbody>
      </table>

      <p>
        1つ目は特に重要で、<strong>手作業で組んだサーバーは同じものを二度と作れません</strong>。障害で作り直すときも、同じ構成の2台目を用意するときも、記憶と勘に頼ることになります。構成を宣言として書いて保管する ― <Link href="/infra/kubernetes">宣言的な管理</Link>と同じ考え方 ― に寄せておくと、この問題は最初から起きません。
      </p>

      <Heading num="まとめ">選択は3つ、影響は運用全体</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>OS選びは運用スタイルの選択</h4>
          <p>GUIと集中管理か、コマンドと自動化か。日々の作業の形がここで決まる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>権限は中央に置く</h4>
          <p>利用者・端末・規則を1か所で持つ。ただしそこは全員が依存する単一障害点でもある。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>分けるのは理由が出てから</h4>
          <p>負荷・可用性・変更頻度。3つのどれかが要求したときに切り出す。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/server-build" />
    </DocsPage>
  );
}
