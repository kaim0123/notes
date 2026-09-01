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

export const metadata: Metadata = { title: "サーバーとストレージ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>サーバーとストレージ ― 何が応え、どこに置くか</h1>
        <Lead>
          <Link href="/frontend/web">Webの仕組み</Link>ではリクエストを受けて返す相手として、<Link href="/backend/express">Express</Link>では自分が書くプログラムとして、「サーバー」という言葉に別々の顔で出会ってきました。日常では「サーバーが落ちた」の一言が、機械の故障を指すことも1つのプロセスの停止を指すこともあります。ここでは<Term>何が依頼に応えているのか</Term>を2つの軸で整理し、続けてその応答が扱う<Term>データをどこへ置くか</Term> ― ストレージの形と冗長化 ― まで見ます。
        </Lead>
      </Hero>

      <Heading num="01">共通点は「頼まれて、応える側」だけ</Heading>
      <p>
        種類がいくら増えても、定義そのものは単純です。<strong>リクエストを受け取り、それに応じたレスポンスを返す側</strong>。頼む側を<Term>クライアント</Term>と呼び、この関係を<Term>クライアント・サーバーモデル</Term>と呼びます。ブラウザとWebサーバーのやり取りは、その最も身近な一例にすぎません。厄介なのは、この一語が指す<strong>粒度</strong>が場面ごとに違うことです。
      </p>

      <Heading num="02">軸1 ― 「機械」か「その上で動くプログラム」か</Heading>
      <p>
        混乱の第一の原因は、レベルの違う2つを同じ名前で呼んでいることです。
      </p>
      <table>
        <thead>
          <tr><th>レベル</th><th>指しているもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">機械としてのサーバー</td><td>24時間の稼働を前提にした物理マシン、あるいは<Link href="/infra/virtualization">仮想化</Link>で切り出された仮想マシン・コンテナ</td></tr>
          <tr><td className="hl">プログラムとしてのサーバー</td><td>その上で動き、待ち受けて応答するプロセス(Nginx、Express、PostgreSQLなど)</td></tr>
        </tbody>
      </table>
      <p>
        1台の機械に何種類ものサーバープログラムが同居することもあれば、1つの役割のために何百台もの機械が並ぶこともあります。<strong>台数と役割の数は独立</strong>だ、というのがこの軸の要点です。
      </p>

      <Heading num="03">軸2 ― 何の依頼を受け付けるか</Heading>
      <p>
        プログラムとしてのサーバーは、受け付ける依頼の種類でさらに呼び分けられます。
      </p>
      <table>
        <thead>
          <tr><th>種類</th><th>受け付ける依頼</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Webサーバー</td><td>HTTPを受けてHTML・JSON・ファイルを返す</td><td>Nginx、Apache</td></tr>
          <tr><td className="hl">APサーバー</td><td>業務ロジックを実行して結果を組み立てる</td><td>Node.jsプロセス、Express</td></tr>
          <tr><td className="hl">DBサーバー</td><td>データの保存・検索を専門に行う</td><td>PostgreSQL、MySQL</td></tr>
          <tr><td className="hl">メールサーバー</td><td>メールの送受信を中継する</td><td>SMTP / IMAPサーバー</td></tr>
          <tr><td className="hl">ファイルサーバー</td><td>ファイルの共有・保存場所を提供する</td><td>社内ファイル共有、NAS</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="infra-server-roles"
        aspect="760 / 260"
        caption="1つのWebサービスの裏側で、役割の違うサーバーが順に依頼を渡していく流れ。ブラウザがHTTPでWebサーバーに頼み、WebサーバーはAPサーバーへ処理を渡し、APサーバーがDBサーバーへ問い合わせる。破線が示すとおり、これらは1台に同居させることも役割ごとに分けることもできる。だから「サーバーが落ちた」の一言は、機械の停止なのか、この中のどのプログラムの停止なのかを区別していない。"
      />

      <Analogy label="💡 たとえるなら">
        会社の受付(Webサーバー)がまず用件を聞き、担当部署(APサーバー)が処理をこなし、必要な書類は倉庫(DBサーバー)から取り寄せる分業です。小さい会社なら1人が全部を兼ねますし(1台に同居)、大きくなれば部署ごとに建物すら分かれます(役割ごとに別マシン)。どちらでも、外から見た振る舞いは同じです。
      </Analogy>

      <Heading num="04">「落ちた」をまず切り分ける</Heading>
      <p>
        2つの軸を踏まえると、障害対応の第一歩がはっきりします。<strong>機械が止まったのか、特定のプロセスが死んだのか、どの役割か</strong>。物理マシンの電源断、Webサーバーのクラッシュ、DBだけの応答不能は、実害も対処も別物です。切り分けの手順そのものは<Link href="/infra/monitoring">監視と障害対応</Link>で扱いますが、切り分けられる語彙をここで持っておくのが前提になります。壊れにくさを設計として測る見方は<Link href="/computer/system-reliability">システムの信頼性</Link>にあります。
      </p>

      <Aside label="開発サーバーも「サーバー」ではある">
        手元で <code>npm run dev</code> を叩いて立ち上がるものも、役割としては立派なWebサーバーです。違うのは<strong>想定している相手</strong>で、本番の利用者を受け止めるようには作られていません。この差を「環境」という語でどう扱うかは<Link href="/dev/environments">環境の分け方</Link>を参照してください。
      </Aside>

      <Heading num="05">データをどこへ置くか ― 3つの形</Heading>
      <p>
        応答するには、返すものがどこかに置いてある必要があります。置き場所は<Term>アクセスの単位</Term>で3つに分かれ、その単位を決めているのは<strong>ファイルシステムをどちら側が持つか</strong>です。
      </p>

      <DiagramFrame
        slug="infra-server-storage-types"
        aspect="760 / 300"
        caption="ブロック・ファイル・オブジェクトの3つのストレージの形。左のブロックストレージはサーバー側がファイルシステムを持ち、ディスクが直結しているように見える。中央のNASはストレージ側がファイルシステムを持ち、NFSやSMBでファイル単位に読み書きする。右のオブジェクトストレージは階層を持たず、キーとメタデータでフラットに管理してHTTPのAPIで丸ごと出し入れする。一部だけの書き換えが得意なのは左、規模を伸ばしやすいのは右。"
      />

      <table>
        <thead>
          <tr><th></th><th>ブロック</th><th>ファイル</th><th>オブジェクト</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">管理単位</td><td>固定サイズの区画</td><td>フォルダ階層とファイル</td><td>キー+メタデータ(階層なし)</td></tr>
          <tr><td className="hl">ファイルシステム</td><td>サーバー側が持つ</td><td>ストレージ側が持つ</td><td>持たない</td></tr>
          <tr><td className="hl">アクセス</td><td>OSからディスクとして(iSCSI等)</td><td>NFS・SMB</td><td>HTTPのAPI</td></tr>
          <tr><td className="hl">得意なこと</td><td>低遅延・部分書き換え</td><td>複数人での共有</td><td>大量・長期の保存と配信</td></tr>
          <tr><td className="hl">代表例</td><td>SAN、EBS</td><td>NAS、EFS</td><td>S3、Cloud Storage、R2</td></tr>
        </tbody>
      </table>

      <p>
        Webサービスの実装では、この3つの使い分けがそのまま設計判断になります。データベースの実体は低遅延が要るのでブロック、利用者がアップロードした画像はオブジェクトストレージへ ― <Link href="/backend/upload">ファイルアップロード</Link>で「アプリのサーバーに置かない」のが原則になるのは、規模と配信のしやすさがここで決まるためです。データベース1台の物理設計としてのディスクの選び方は<Link href="/database/physical">物理設計と運用</Link>にあります。
      </p>

      <Heading num="06">壊れる前提で冗長化する ― RAID</Heading>
      <p>
        ディスクは消耗品で、いつか必ず壊れます。<Term>RAID</Term>は複数台を1つの論理的なディスクとして扱い、故障や速度をならす構成です。方式ごとに<strong>容量・速度・耐障害性</strong>のどれを取るかが違います。
      </p>

      <DiagramFrame
        slug="infra-server-raid"
        aspect="760 / 340"
        caption="RAID 0・1・5でデータが3台のディスクにどう置かれるか。RAID 0は分散して書くだけなので速いが1台失うと全滅する。RAID 1は丸ごと複製するので1台失っても読めるが容量は半分になる。RAID 5はデータとパリティを分散し、どの1台が欠けても残りから復元でき、目減りは1台分で済む。いずれも冗長化であって、消したファイルや壊れたデータをさかのぼって取り戻す仕組みではない。"
      />

      <table>
        <thead>
          <tr><th>レベル</th><th>仕組み</th><th>耐えられる故障</th><th>実効容量(N台)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">RAID 0</td><td>分散して書く(ストライピング)</td><td>なし</td><td>N台分(100%)</td></tr>
          <tr><td className="hl">RAID 1</td><td>同じ内容を複製(ミラーリング)</td><td>1台(2台構成の場合)</td><td>1台分</td></tr>
          <tr><td className="hl">RAID 5</td><td>データとパリティを分散</td><td>1台</td><td>(N−1)台分</td></tr>
          <tr><td className="hl">RAID 6</td><td>パリティを2重に分散</td><td>2台</td><td>(N−2)台分</td></tr>
          <tr><td className="hl">RAID 10</td><td>複製したペアをさらに分散</td><td>ペアごとに1台まで</td><td>N台の半分</td></tr>
        </tbody>
      </table>

      <Heading num="07">RAIDはバックアップではない</Heading>
      <p>
        ここは取り違えの多いところです。RAIDが守るのは<strong>ディスクという部品の故障</strong>だけで、それ以外の失い方には無力です。誤って削除したファイルは全ディスクから同時に消え、ランサムウェアの暗号化も全ディスクへ同時に書き込まれ、間違ったバッチ処理の結果も忠実に複製されます。<Term>冗長化</Term>は「今この瞬間の可用性」を守る仕組み、<Term>バックアップ</Term>は「過去の時点へ戻れること」を守る仕組みで、目的が別です。
      </p>
      <p>
        だから復旧の設計では、<strong>どこまで失ってよいか</strong>と<strong>どれだけで戻すか</strong>を先に決めます。前者は直近のバックアップからの許容データ損失(RPO)、後者は復旧までの許容時間(RTO)にあたり、この2つが世代管理・保管場所・復旧手順の重さを決めます。バックアップは取ることではなく<Term>戻せると確認できていること</Term>が本体なので、復元の訓練までが仕事です。サーバー構築の実務、ストレージ製品ごとの詳細、バックアップと復旧の手順は、この見出しの配下で個別に扱います。
      </p>

      <Heading num="まとめ">粒度を言い分ける</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>サーバーは2つの軸で決まる</h4>
          <p>機械かプログラムか、どの依頼を受けるか。台数と役割の数は独立している。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>置き場所は単位で選ぶ</h4>
          <p>ブロック・ファイル・オブジェクトの差はファイルシステムの持ち手の差。部分書き換えか、規模かで選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>冗長化と復旧は別の仕事</h4>
          <p>RAIDは部品故障を吸収するだけ。過去へ戻る手段は、戻せると確認したバックアップだけが与える。</p>
        </Card>
      </CardGrid>

      <p>
        土台と置き場所が決まったら、次はそれが正常に動き続けているかを知る番です。<Link href="/infra/monitoring">監視と障害対応</Link>へ進みます。
      </p>

      <DocsFooter href="/infra/server" />
    </DocsPage>
  );
}
