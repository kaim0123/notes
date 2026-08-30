import type { Metadata } from "next";
import Link from "next/link";
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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンテナセキュリティ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>コンテナセキュリティ ― 箱と土台を守る</h1>
        <Lead>
          コンテナは便利ですが、使い方を誤ると<strong>ホスト全体が侵害</strong>されかねません。<Link href="/infra/container">仕組み</Link>で見たとおり、コンテナはホストOSのカーネルを共有しているためです。セキュリティは奥が深いものの、基本を押さえれば十分に守れます。ここではリスクの全体像と、イメージ・実行時・監視の3層で固める防御を扱います。
        </Lead>
      </Hero>

      <Heading num="01">コンテナの5大セキュリティリスク</Heading>
      <p>まず敵を知ることから始めます。コンテナ特有のリスクは、大きく次の5つに整理できます。</p>
      <table>
        <thead>
          <tr><th>#</th><th>リスク</th><th>内容</th><th>具体例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1</td><td>イメージの脆弱性</td><td>OS・ライブラリの既知の脆弱性(CVE)を突かれる</td><td>古いOpenSSLの穴からコンテナ内へ侵入される</td></tr>
          <tr><td className="hl">2</td><td>設定ミス</td><td>動いていてもセキュリティホールだらけの状態</td><td>root実行、不要ポートの開放、パスワードの埋め込み</td></tr>
          <tr><td className="hl">3</td><td>コンテナエスケープ</td><td>コンテナから抜け出しホストOSへ侵入する最悪シナリオ</td><td>カーネル脆弱性を突かれ、同一ホスト上の全コンテナが危険に</td></tr>
          <tr><td className="hl">4</td><td>シークレットの漏洩</td><td>パスワード・APIキーなどの機密情報が露出する</td><td><code>docker history</code>でイメージ内のシークレットが丸見え</td></tr>
          <tr><td className="hl">5</td><td>サプライチェーン攻撃</td><td>ソフトの供給経路を悪用し利用者全体を感染させる</td><td>人気イメージに悪意あるコードを仕込む(2023年にも実例)</td></tr>
        </tbody>
      </table>
      <Aside label="要注意">
        Docker Hubのイメージの<strong>約半数</strong>に何らかの脆弱性がある、という調査結果もあります。対策の大前提として、<strong>信頼できるソース</strong>からイメージを取得することが欠かせません。
      </Aside>

      <Heading num="02">防御① 安全なイメージの選び方と管理</Heading>
      <p>すべての土台はイメージです。何を持ってくるか、そして持ってきたものをどう検証するかで、リスクの大半が決まります。</p>
      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">公式イメージを使う</td><td>Docker Hubの<strong>Official</strong>(Dockerチーム検証済み)や<strong>Verified Publisher</strong>(認定企業公開)バッジを確認する</td></tr>
          <tr><td className="hl">最小限のベースイメージ</td><td>パッケージが少ないほど攻撃面が小さい。<strong>Alpine Linux</strong>(約5MB)や、シェルすら持たない<strong>Distroless</strong>が推奨</td></tr>
        </tbody>
      </table>
      <p>選んだイメージは<Term>イメージスキャン</Term>で検証します。全パッケージを調べ既知のCVEがないかを確認する作業で、無料で人気の<Term>Trivy</Term>なら<code>trivy image nginx</code>の1コマンドで実行できます(Clair・Snyk・Anchoreなども)。<strong>Critical / High</strong>以上の脆弱性が出たイメージは使わないのが原則です。さらにビルドのたびに自動スキャンし、脆弱性があれば<strong>ビルドを失敗</strong>させてCI/CDに組み込むのがベストプラクティス。上級者は<strong>Docker Content Trust</strong>や<strong>Sigstore</strong>による署名・検証で、改ざんされていないことまで証明します。</p>

      <Heading num="03">防御② 実行時セキュリティ ― 最小権限の原則</Heading>
      <p>イメージが安全でも、実行時の設定ミスで台無しになります。合言葉は<Term>最小権限の原則</Term> ― 必要な権限だけを与えることです。</p>
      <p>デフォルトではコンテナは<strong>root権限</strong>で動きます。乗っ取られると攻撃者もrootとなり、ホストへの攻撃が容易になります。Dockerfileに<code>USER</code>ディレクティブを書き、一般ユーザーで実行するのが基本です。さらにLinuxカーネルの機能で締めます。</p>
      <table>
        <thead>
          <tr><th>仕組み</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Capabilities</td><td>root権限を細分化した権限セット。<code>--cap-drop</code>で不要なものを削り最小権限に</td></tr>
          <tr><td className="hl">Read-onlyファイルシステム</td><td>侵入されてもファイル書き換えやマルウェア設置を防ぐ。書き込みが要る箇所は<strong>tmpfs</strong>をマウント</td></tr>
          <tr><td className="hl">seccomp</td><td>許可しないシステムコールをブロックし、エクスプロイトを失敗させる</td></tr>
          <tr><td className="hl">AppArmor / SELinux</td><td>プロセスごとにアクセス可能なファイルを細かく制御する強制アクセス制御</td></tr>
        </tbody>
      </table>
      <p>加えて不要なコンテナ間通信を遮断します。Kubernetesなら<Link href="/infra/container/kubernetes">NetworkPolicy</Link>で設定でき、万一侵入されても<Term>ラテラルムーブメント</Term>(横方向への拡散)を防げます。</p>

      <Heading num="04">防御③ 監視・異常検知 ― ランタイムセキュリティ</Heading>
      <p>3層目は、動いているコンテナの<strong>怪しい動き</strong>を見張る<Term>ランタイムセキュリティ</Term>です。パフォーマンス監視とは見るものが違います。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>見るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パフォーマンス監視</td><td>遅い・落ちている・リソース逼迫</td></tr>
          <tr><td className="hl">セキュリティ監視</td><td>普段しないコマンドの実行、未知プロセスの起動など怪しい動き</td></tr>
        </tbody>
      </table>
      <p>代表格が、CNCFプロジェクトの<Term>Falco</Term>です。システムコールを監視し、ルール違反時にアラートを出します。コンテナ内でのシェル起動や<code>/etc/passwd</code>の変更などを検知でき、「このコンテナで<code>curl</code>は使わないはず」といったルールもカスタマイズできます(Sysdig・Aqua Securityなども)。コンテナは頻繁に消えるため、ログは消える前に<Link href="/infra/container/observability">中央へ集約</Link>し、<strong>Kubernetes監査ログ</strong>(誰がいつ何をしたか)を不正調査の証拠として残します。万一の際は次の順で動きます。</p>
      <Steps>
        <li><strong>隔離</strong> ― 侵害されたコンテナのネットワークを切断し、影響を封じ込める。</li>
        <li><strong>フォレンジック</strong> ― メモリダンプやログ解析で攻撃の手口を特定する。</li>
        <li><strong>再発防止</strong> ― 対策を強化し、同じ攻撃を二度と受けないようにする。</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        3層の防御は建物の警備に似ています。<strong>イメージの選定・スキャン</strong>は入館前の持ち物検査、<strong>実行時の最小権限</strong>は各部屋の入室権限を絞ること、<strong>ランタイム監視</strong>は館内を巡回する警備員です。どれか1つでは破られます。3つを重ねて初めて安心できます。
      </Analogy>

      <Heading num="05">これからの潮流 ― シフトレフトとゼロトラスト</Heading>
      <p>最後に、コンテナセキュリティの向かう先を2つの言葉で押さえます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>シフトレフト</h4>
          <p>開発の早い段階(コーディング・ビルド時)からセキュリティチェックを行う考え方。「開発完了後に検査」より、見つかったときの修正コストがずっと低く済みます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ゼロトラスト</h4>
          <p>「内部ネットワークは安全」という前提を捨て、すべてを疑うモデル。コンテナ同士の通信でも毎回認証・認可を行います。<Term>サービスメッシュ</Term>(Istio・Linkerd)が通信の暗号化・認可を自動化し、実装を助けます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/container" tag="インフラ">コンテナの仕組み ― 隔離 ≠ 完全な安全</RelatedLink>
                    <RelatedLink href="/infra/container/observability" tag="インフラ">オブザーバビリティ ― ログの集約</RelatedLink>
                    <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
