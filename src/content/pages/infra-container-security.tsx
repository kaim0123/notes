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
  Steps,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンテナセキュリティ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンテナセキュリティ ― 箱と土台を守る</h1>
        <Lead>
          <Link href="/infra/virtualization">仮想化とコンテナ</Link>で見たとおり、コンテナの隔離はカーネルを共有したうえでの隔離です。壁はありますが、床は共通です。ここではその前提で何が起こりうるかを整理し、<Term>入れる前・動かすとき・破られた後</Term>という3つの層で守る方法を扱います。特別な技術というより、<Link href="/security/authz">認可</Link>で見た最小権限の原則を、コンテナという単位に当てはめる作業になります。
        </Lead>
      </Hero>

      <Heading num="01">何が起こりうるか</Heading>
      <p>
        コンテナ特有のリスクは、大きく5つに整理できます。どれも「コンテナだから危ない」のではなく、<strong>使い方の既定値が緩い</strong>ことに由来します。
      </p>

      <table>
        <thead>
          <tr><th>リスク</th><th>中身</th><th>典型例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">イメージの脆弱性</td><td>同梱したOS・ライブラリの既知の穴を突かれる</td><td>古い暗号ライブラリの脆弱性からコンテナ内へ侵入される</td></tr>
          <tr><td className="hl">設定ミス</td><td>動いてはいるが、守りが外れた状態</td><td>root実行、不要なポート開放、特権付き実行</td></tr>
          <tr><td className="hl">コンテナエスケープ</td><td>コンテナから抜け出してホストへ届く</td><td>カーネルの脆弱性を突かれ、同じホストの全コンテナが危うくなる</td></tr>
          <tr><td className="hl">秘密の露出</td><td>鍵やパスワードがイメージや環境に残る</td><td>ビルド履歴からAPIキーが読める</td></tr>
          <tr><td className="hl">供給経路への混入</td><td>取得元のイメージ自体に仕込まれている</td><td>人気イメージの改ざん、よく似た名前のイメージ</td></tr>
        </tbody>
      </table>

      <Aside label="出所を選ぶことが最初の防御">
        公開レジストリのイメージには、既知の脆弱性を含むものが相当な割合で混ざります。<strong>誰が作ったか分からないイメージを土台にしない</strong>だけで、リスクの多くは消えます。名前が似ているだけの別物を掴む事故もあるので、取得元は明示的に固定します。
      </Aside>

      <Heading num="02">3つの層で重ねる</Heading>
      <p>
        対策は1点で決まりません。入れる前に選び、動かすときに締め、破られた後に気づく ― この3層を薄く重ねます。
      </p>

      <DiagramFrame
        slug="infra-container-security-layers"
        aspect="760 / 300"
        caption="コンテナを守る3つの層と、それぞれが受け持つリスク。1層目のイメージでは、公式で最小限の土台を選び、既知の脆弱性を機械的に検査し、署名で出所を確かめる。2層目の実行時では、一般ユーザーで動かし、権限を削り、通信相手を絞る。3層目の監視では、普段しない振る舞いを検知し、監査ログを外へ逃がして残す。どの層も単独では破られるので重ねて使い、見つけるならより手前の層で見つけるほうが直す費用は安い。"
      />

      <Heading num="03">入れる前 ― イメージを選び、調べる</Heading>
      <p>
        土台の選び方で、後の作業量が変わります。含まれるパッケージが少ないほど、検査で引っかかる脆弱性も、侵入後に攻撃者が使える道具も減ります。最小限のベースイメージや、シェルすら持たない構成が推奨されるのはこのためです。
      </p>
      <p>
        選んだ後は<Term>イメージスキャン</Term>で、同梱物に既知の脆弱性が無いかを機械的に確かめます。要点は<strong>ビルドのたびに自動で走らせ、深刻なものが見つかったらビルドを失敗させる</strong>ことです。人が見る運用にすると、忙しい日から順に見なくなります。ここは<Link href="/dev/tooling-security">依存の脆弱性とサプライチェーン</Link>で扱う、アプリの依存に対する検査とまったく同じ考え方で、対象がコンテナの中身に広がっただけです。
      </p>
      <p>
        さらに踏み込むと、イメージに<strong>署名</strong>して、実行前に検証します。取得したものが自分たちのビルドしたものと同一だと確かめられれば、経路上での差し替えを検出できます。
      </p>

      <Heading num="04">動かすとき ― 権限を削る</Heading>
      <p>
        イメージが安全でも、実行時の設定で台無しになります。既定ではコンテナの中はroot権限で動くので、乗っ取られた攻撃者もrootとして振る舞えます。
      </p>

      <table>
        <thead>
          <tr><th>手立て</th><th>効き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一般ユーザーで実行</td><td>イメージに実行ユーザーを明示する。中のrootは、外のrootに近い</td></tr>
          <tr><td className="hl">権限の細分化(Capabilities)</td><td>rootの権限を分割し、要らないものを落とす。ほとんどのアプリは大半を必要としない</td></tr>
          <tr><td className="hl">読み取り専用のファイルシステム</td><td>侵入されても書き換えや道具の設置ができない。書き込みが要る場所だけ一時領域を与える</td></tr>
          <tr><td className="hl">システムコールの制限(seccomp)</td><td>使わないシステムコールを禁じる。攻撃コードは大抵これで失敗する</td></tr>
          <tr><td className="hl">強制アクセス制御(AppArmor / SELinux)</td><td>プロセスごとに触れるファイルを限定する</td></tr>
          <tr><td className="hl">特権付き実行とホストのマウントを禁じる</td><td>境界を自ら外す設定。必要だと感じたら、まず設計を疑う</td></tr>
        </tbody>
      </table>

      <p>
        あわせて、通信できる相手も絞ります。<Link href="/infra/kubernetes">Kubernetes</Link>のネットワークは既定で平ら ― 誰でも誰に届く ― なので、ポリシーで明示的に制限しないと、1つ乗っ取られた時点で内部を自由に動き回られます。この横方向への広がりを<Term>ラテラルムーブメント</Term>と呼び、被害の大きさはここで決まります。
      </p>

      <Heading num="05">なぜエスケープが成立するのか</Heading>
      <p>
        最悪の筋道である<Term>コンテナエスケープ</Term>は、単独の脆弱性では起きません。条件が重なったときに通ります。
      </p>

      <DiagramFrame
        slug="infra-container-security-escape"
        aspect="700 / 300"
        caption="コンテナからホストへ抜け出す攻撃が成立する条件。脆弱なイメージから侵入され、中がroot権限で、特権付き実行やホストのマウントで境界が緩く、共有するカーネルに穴がある ― これらが重なるとホストに到達し、同じホスト上の他のコンテナもまとめて手中に入る。逆に言えばどれか1つを断てば連鎖は止まるので、検査・一般ユーザー実行・特権の禁止・ホストの更新を薄く重ねる。"
      />

      <p>
        この図の読み方は「どれか1つを完璧にする」ではなく、<strong>4か所すべてに薄く手を打つ</strong>です。カーネルの穴は自分では塞げませんが、ホストの更新を続けることと、そこへ届くまでの3段を難しくすることはできます。強い隔離がどうしても要る場合は、そもそも<Link href="/infra/virtualization">ハイパーバイザー型</Link>まで戻すという判断もあります。
      </p>

      <Heading num="06">破られた後 ― 振る舞いを見る</Heading>
      <p>
        3層目は、動いているコンテナの<strong>普段しない動き</strong>を見張ることです。性能の監視とは見るものが違います ― 遅いか落ちているかではなく、シェルが起動した、見慣れないプロセスが立った、設定ファイルが書き換わった、といった振る舞いを検知します。
      </p>
      <p>
        コンテナは消えるので、証拠も消えます。ログと監査記録は<strong>本体が消える前に外へ逃がす</strong>必要があり、その仕組みは<Link href="/infra/observability">オブザーバビリティ</Link>で扱う集約と同じものを使います。何を記録として残すべきかは<Link href="/security/logging">ログ出力設計</Link>にまとまっています。
      </p>

      <Steps>
        <li><Term>隔離</Term> ― 疑わしいコンテナの通信を切り、広がりを止める。止血を先に置くのは<Link href="/infra/monitoring">障害対応</Link>と同じ。</li>
        <li><Term>保全と調査</Term> ― 消える前に状態とログを確保し、どこから入られ何をされたかを追う。</li>
        <li><Term>再発防止</Term> ― 4つの条件のどれが開いていたかを特定し、仕組みとして閉じる。</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        3層の防御は建物の警備です。イメージの選定と検査は入館前の持ち物検査、実行時の権限制限は部屋ごとの入室権限、振る舞いの監視は巡回する警備員。持ち物検査だけでも、鍵だけでも、警備員だけでも破られます。重ねるから守れます。
      </Analogy>

      <Heading num="07">向かっている先</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>手前で見つける</h4>
          <p>本番で見つかった問題は、コードを書いている時点で見つかった問題より何倍も高くつく。検査をビルドの一部にする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>内側も信用しない</h4>
          <p>「内部ネットワークは安全」という前提を外し、コンテナ間の通信にも認証と暗号化を要求する。<Link href="/security/countermeasures">ゼロトラスト</Link>の考え方をクラスタ内に持ち込む形。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">床が共通だという前提で組む</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>既定値は緩い</h4>
          <p>rootで動き、誰にでも届く。危ないのは技術ではなく、締めないまま使うこと。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3層を薄く重ねる</h4>
          <p>入れる前・動かすとき・破られた後。1層で完璧を狙うより、3層に手を打つほうが確実に効く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>エスケープは条件の連鎖</h4>
          <p>脆弱性・root・緩い境界・カーネルの穴。どれか1つ断てば止まる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/container-security" />
    </DocsPage>
  );
}
