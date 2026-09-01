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

export const metadata: Metadata = { title: "デプロイと公開" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>デプロイと公開 ― どこで動かし、どう届けるか</h1>
        <Lead>
          <Link href="/infra/monitoring">監視と障害対応</Link>で、復旧の速さは「戻せるかどうか」でほぼ決まると見ました。戻せるかは、公開の形を決めた時点で先に決まっています。ここでは<Term>どこで動かすか</Term>と<Term>どうやって最新のコードをそこへ届けるか</Term>という2つの問いを分けて扱います。パイプラインの書き方そのものは<Link href="/dev/ci-actions">GitHub Actionsの実務</Link>や<Link href="/dev/ci-deploy">デプロイ戦略とロールバック</Link>が持っているので、こちらは<strong>本番の受け入れ口をどう構えるか</strong>に絞ります。
        </Lead>
      </Hero>

      <Heading num="01">どこで動かすか ― 任せるか、組むか</Heading>
      <p>
        公開先の選択肢は、突き詰めると<strong>どこまでを事業者に任せるか</strong>の一点に整理できます。Gitリポジトリをつなぐだけでビルドから配信までを代行する<Term>PaaS</Term>(Vercel、Netlify、Cloudflare Pages など)か、クラウドの部品を自分で並べて組むかです。
      </p>

      <DiagramFrame
        slug="infra-deploy-hosting"
        aspect="760 / 320"
        caption="同じgit pushから公開までを、PaaSに任せる場合と自分で部品を組む場合で並べた図。左はビルド・成果物の配置・CDN配信・証明書の発行までが一続きで代行され、自分で決めるのはドメインの接続程度。右はCIでのビルド、成果物の置き場所、前段のCDN、DNSと証明書をそれぞれ自分で用意する。工程の数は変わらず、どこまでを自分の責任として持つかだけが違う。"
      />

      <table>
        <thead>
          <tr><th>方式</th><th>代表例</th><th>向くとき</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PaaS(フルマネージド)</td><td>Vercel、Netlify、<Link href="/infra/cloudflare">Cloudflare Pages</Link></td><td>構成に特別な要求が無く、運用の人手をかけたくないとき</td></tr>
          <tr><td className="hl">クラウドの部品を組む</td><td>S3 + CloudFront、ECS、Compute Engine</td><td>ネットワーク構成・コスト・既存資産との接続に固有の要求があるとき</td></tr>
          <tr><td className="hl">自前のサーバー</td><td>オンプレミス、VPS</td><td>設置場所やデータの所在に制約があるとき</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        PaaSは家具付きの賃貸、部品を組む方式は土地を買って家を建てることに似ています。前者はすぐ住める代わりに間取りを変えられず、後者は自由に設計できる代わりに水道・電気の引き込みまで自分の仕事になります。どちらが正しいかではなく、<strong>間取りを変えたい理由があるか</strong>で決まります。
      </Analogy>

      <Heading num="02">ドメインからページが届くまで</Heading>
      <p>
        利用者がURLを入力してから画面が出るまでには、3つの仕組みが順に働きます。<Term>DNS</Term>が名前をIPアドレスに変え(<Link href="/network/nat-dhcp-dns">NAT・DHCP・DNS</Link>)、<Term>TLS</Term>が証明書を確認して通信路を暗号化し、<Term>CDN</Term>が最寄りの拠点から応答を返します。
      </p>

      <DiagramFrame
        slug="infra-deploy-request-path"
        aspect="760 / 260"
        caption="ドメインを入力してからページが届くまでの経路。DNSで名前が解決され、TLSで通信路が暗号化され、最寄りのCDNエッジに届く。エッジにキャッシュがあればそこで返り、オリジンまでは行かない。無いときだけオリジンへ問い合わせ、その応答をエッジが蓄えてから返す。PaaSではこの3つが既定で用意されるため、自分で意識するのはドメインの接続程度になる。"
      />

      <p>
        公開作業として決めるのは、この3つの<strong>持ち主</strong>です。ドメインをどこで買い、DNSをどこで引き、証明書を誰が更新し、CDNのキャッシュをどう無効化するか。とくに証明書の期限切れはサイト全体が即座に見られなくなる重大障害なので、<strong>自動更新に載せて「気づく対象」から外す</strong>のが原則です。何をどれだけキャッシュしてよいかの判断は<Link href="/dev/cache">キャッシュの考え方</Link>と、秘密の混入を防ぐ観点で<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>にあります。
      </p>

      <Heading num="03">デプロイの経路 ― 先に決めておく3つ</Heading>
      <p>
        起点は基本的にGitへのpushです。仕組みの実装はCI/CD側に譲るとして、公開の前に決めておかないと事故になるのは次の3つです。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>何をもって本番反映とするか</h4>
          <p>「<code>main</code>へのマージ = 本番」のように単純な規則にする。人の判断が挟まるほど、状態が分からなくなる。<Link href="/dev/git-release">リリースの進め方</Link>。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>本番前に確認する場所があるか</h4>
          <p>PRごとのプレビューURLやステージング。<Link href="/dev/environments">環境の分け方</Link>で、どこまで本番に似せるかを決める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>戻せるか</h4>
          <p>壊れたときに直前の正常なビルドへ戻せること。次の節で扱う、公開の形そのものの問題。</p>
        </Card>
      </CardGrid>

      <Aside label="本番にだけ効く設定は、コードの外に置く">
        接続先・鍵・機能フラグのように環境ごとに変わる値は、ビルド成果物の中に焼き込まず外から与えます。同じ成果物をそのまま各環境へ配れる形にしておくと、「ステージングでは通ったのに本番では違う物が動いていた」という事故が消えます。扱い方は<Link href="/dev/dotenv">環境変数と設定</Link>にあります。
      </Aside>

      <Heading num="04">戻せる形にしておく</Heading>
      <p>
        切り戻しの速さは、手順の巧拙よりも<strong>公開先の作りで決まります</strong>。公開中のファイルを上書きする方式では、壊れた瞬間に戻る先が残っていません。一方、ビルドごとに別の成果物として残し、公開を「どれを指すか」の参照で表しておけば、切り戻しは参照の付け替えで済みます。
      </p>

      <DiagramFrame
        slug="infra-deploy-rollback"
        aspect="700 / 300"
        caption="上書きデプロイとバージョン付きデプロイの違い。上段は公開先を直接置き換えるため戻る先が残らず、復旧は作り直しから始まる。下段はビルドごとに成果物を残し、公開はどれを指すかという参照の切り替えで行うので、切り戻しは参照を1つ前へ戻すだけで済む。先に止血できるから、原因の調査は落ち着いてからでよい。"
      />

      <p>
        新旧を同時に動かして切り替える方式(ブルーグリーン)や、一部の利用者にだけ新版を出す方式(カナリア)は、この「参照の切り替え」を細かくしたものです。方式ごとの比較と、切り替え中にデータベースの形が変わる場合の扱いは<Link href="/dev/ci-deploy">デプロイ戦略とロールバック</Link>にまとめてあります。ここで押さえるのは、<strong>切り戻せない構成を選んだ時点で、障害対応の選択肢が1つ減る</strong>ということです。
      </p>

      <Heading num="05">出す前に、受け入れの線を引く</Heading>
      <p>
        技術的に反映できることと、出してよいと判断できることは別です。公開の判断には、機能が満たされているかだけでなく、性能・可用性・法令上の要件のような<Link href="/test/non-functional">非機能の観点</Link>も入ります。何を満たせば受け入れたことになるかを事前に決める作業は<Link href="/test/acceptance">受入れ基準とレビュー技法</Link>が扱い、その基準に沿って実際に導入し、切り替えの段取りと利用者への周知まで含めて運ぶ<Term>導入と受入れ</Term>の実務は、この見出しの配下で個別に扱います。
      </p>

      <Heading num="まとめ">公開の形が、復旧の速さを決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>任せる範囲を選ぶ</h4>
          <p>PaaSも自前構成も工程は同じ。違うのは、どこまでを自分の責任として持つか。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DNS・TLS・CDNの持ち主を決める</h4>
          <p>とくに証明書は自動更新に載せ、期限切れという「必ず起きる障害」を消しておく。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>参照の切り替えで公開する</h4>
          <p>上書きすると戻る先が消える。成果物を残し、指し先を変える形にしておく。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでが自分で組む場合も含めた公開の骨格です。実際に部品を貸してくれる事業者側の話 ― <Link href="/infra/aws">AWS</Link>・<Link href="/infra/gcp">Google Cloud</Link>・<Link href="/infra/cloudflare">Cloudflare</Link> へ進みます。
      </p>

      <DocsFooter href="/infra/deploy" />
    </DocsPage>
  );
}
