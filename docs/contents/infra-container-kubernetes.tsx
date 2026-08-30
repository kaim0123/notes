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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Kubernetes",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>Kubernetes ― 無数のコンテナを束ねて操る</h1>
        <Lead>
          <Link href="/infra/container/docker">Docker</Link>は1台のマシンでコンテナを動かすのに最適でした。しかし複数サーバーで数百のコンテナを協調させるには、配置・再起動・負荷分散を自動でさばく<Term>オーケストレーションツール</Term>が要ります。それが<Term>Kubernetes(K8s)</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">Kubernetesとは何か</Heading>
      <p><strong>Kubernetes</strong>はギリシャ語で「舵取り(helmsman)」を意味します。コンテナという船を操るシステム、という名づけです。<strong>K8s</strong>という略記は、KとSの間の8文字を省いたもので、国際化を<strong>i18n</strong>と書くのと同じ命名規則です。</p>
      <p>Googleが<strong>2014年</strong>にオープンソースとして公開しました。社内で2000年代初頭から運用してきた大規模コンテナ管理システム<Term>Borg</Term>のノウハウが基盤になっています。</p>

      <Heading num="02">オーケストレーションの5機能</Heading>
      <p>Kubernetesが自動化してくれる中心的な働きは、次の5つに整理できます。手作業では追いつかない規模の運用を、まとめて肩代わりします。</p>
      <table>
        <thead>
          <tr><th>#</th><th>機能</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1</td><td>スケジューリング</td><td>どのサーバー(ノード)でコンテナを動かすかを、リソースの空きを見て自動決定する</td></tr>
          <tr><td className="hl">2</td><td>オートヒーリング</td><td>コンテナが落ちたら自動再起動。ノード障害時は別ノードで起動し直す自己修復</td></tr>
          <tr><td className="hl">3</td><td>オートスケーリング</td><td>負荷に応じてコンテナの数を自動で増減させる</td></tr>
          <tr><td className="hl">4</td><td>ロードバランシング</td><td>複数コンテナへアクセスを均等に振り分ける</td></tr>
          <tr><td className="hl">5</td><td>ローリングアップデート</td><td>コンテナを少しずつ入れ替え、ダウンタイムゼロで更新する</td></tr>
        </tbody>
      </table>

      <Heading num="03">最重要の設計思想 ― 宣言的管理</Heading>
      <p>Kubernetesを理解する鍵は<Term>宣言的管理</Term>です。「手順」ではなく「あるべき姿」を伝える、という発想の転換にあります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>考え方</th><th>問題点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命令的(従来)</td><td>「サーバー1でコンテナを起動しろ」と具体的な手順を指示する</td><td>途中で失敗したときの復旧が難しく、現在の状態も分かりにくい</td></tr>
          <tr><td className="hl">宣言的(K8s)</td><td>「コンテナは常に3個あるべき」とあるべき姿(desired state)を宣言する</td><td>― K8sが現状を監視し、自動で収束させる</td></tr>
        </tbody>
      </table>
      <p>この自動収束の仕組みを<Term>リコンシリエーション(調整ループ)</Term>と呼びます。3個あるべきコンテナが1個落ちて2個になれば、K8sが差分を検知して自動で1個足す ― これを永続的に繰り返します。あるべき姿をYAMLファイルに書けばインフラ全体をバージョン管理でき、これが<Term>Infrastructure as Code(IaC)</Term>の本質的な実現方法になります。操作は<code>kubectl apply -f ファイル名</code>のようにCLIツール<Term>kubectl</Term>で行います。</p>

      <Analogy label="💡 たとえるなら">
        命令的管理は「エアコンを付けて、5分後に弱にして…」と逐一操作するようなもの。宣言的管理は「室温は常に25℃」とだけ設定し、あとはサーモスタットが自動で強弱を調整してくれるようなものです。目標だけ伝えれば、現状との差を機械が埋め続けてくれます。
      </Analogy>

      <Heading num="04">アーキテクチャ ― 指令塔と作業員</Heading>
      <p>Kubernetesクラスタは、司令塔となる<Term>コントロールプレイン</Term>(脳)と、実際にコンテナを動かす<Term>ワーカーノード</Term>(手足)に分かれます。</p>
      <table>
        <thead>
          <tr><th colSpan={2}>コントロールプレイン(脳)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">API Server</td><td>K8sの心臓部。ユーザー操作もコンポーネント間通信も、すべてここを経由する</td></tr>
          <tr><td className="hl">Scheduler</td><td>新しいPodをどのノードで動かすかを決める</td></tr>
          <tr><td className="hl">Controller Manager</td><td>各種の制御ループを回し、あるべき状態と現状の差分を修正する</td></tr>
          <tr><td className="hl">etcd</td><td>クラスタの全状態を保存する分散キーバリューDB。落ちると全体が止まるため通常は冗長化する</td></tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr><th colSpan={2}>ワーカーノード(手足)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">kubelet</td><td>ノードのエージェント。API Serverの指示でコンテナを起動・停止する</td></tr>
          <tr><td className="hl">kube-proxy</td><td>ネットワークルーティングを担当し、アクセスを適切に振り分ける</td></tr>
          <tr><td className="hl">Container Runtime</td><td>コンテナを実際に動かすエンジン。以前はDocker Engine、現在は<strong>containerd</strong>やCRI-Oが主流</td></tr>
        </tbody>
      </table>
      <Aside label="要注意">
        ランタイムが変わっても、<strong>Dockerで作ったイメージはそのままK8sで動きます</strong>。K8sは<Term>CRI</Term>という規格で特定ランタイムに依存しない設計になっているためです。
      </Aside>

      <Heading num="05">主要リソース</Heading>
      <p>K8sで扱う「部品」はいくつもありますが、まずは次の4つの関係を押さえれば全体像がつかめます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Pod ― 最小単位</h4>
          <p>1つ以上のコンテナをまとめた最小管理単位。通常は1Pod=1コンテナ。同一Pod内のコンテナは<strong>ネットワークを共有</strong>し<code>localhost</code>で通信できます。Podは一時的(ephemeral)な設計で、落ちたら新しく作り直され、IPも変わります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ラベルとセレクター ― 接着剤</h4>
          <p><strong>ラベル</strong>はリソースに付けるタグ(例: <code>app=web</code>)。<strong>セレクター</strong>はそのラベルでリソースを選び紐づけます。名前ではなくラベルで柔軟に対象を束ねられるのがK8sの強みです。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>Service ― アクセス方法</h4>
          <p>PodはIPが変わるため、固定のIP・DNS名でアクセスする窓口が要ります。それがService。複数Podをまとめてロードバランシングも行います。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>Deployment ― 宣言的管理の中核</h4>
          <p>「このアプリを3個動かしたい」と宣言すると実現してくれるリソース。Podの自動再作成やローリングアップデートを担います。裏でReplicaSetがPod数を管理しますが、日常はDeploymentだけ意識すればOK。</p>
        </Card>
      </CardGrid>
      <p>Serviceは公開範囲によって<strong>ClusterIP</strong>(クラスタ内部のみ・デフォルト)、<strong>NodePort</strong>(ノードのポートを開き外部からも)、<strong>LoadBalancer</strong>(クラウドのロードバランサーと連携)を使い分けます。設定値は<strong>ConfigMap</strong>、機密情報は<strong>Secret</strong>、永続データは<strong>PersistentVolume</strong>で扱います。</p>

      <Diagram caption="ユーザーはあるべき姿を宣言し、コントロールプレインがワーカーノード上のPodを収束させ続ける">
        <svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={560} height={70} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={60} y={50} fill="#9a9a9a" fontSize="11">コントロールプレイン</text>
          <rect x={60} y={58} width={110} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.2" />
          <text x={115} y={77} fill="#f2f2f2" fontSize="10" textAnchor="middle">API Server</text>
          <rect x={185} y={58} width={110} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.2" />
          <text x={240} y={77} fill="#f2f2f2" fontSize="10" textAnchor="middle">Scheduler</text>
          <rect x={310} y={58} width={150} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.2" />
          <text x={385} y={77} fill="#f2f2f2" fontSize="10" textAnchor="middle">Controller Manager</text>
          <rect x={475} y={58} width={105} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.2" />
          <text x={527} y={77} fill="#f2f2f2" fontSize="10" textAnchor="middle">etcd</text>

          <rect x={40} y={140} width={270} height={80} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={60} y={160} fill="#9a9a9a" fontSize="11">ワーカーノード</text>
          <rect x={60} y={172} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" />
          <text x={95} y={193} fill="#f2f2f2" fontSize="10" textAnchor="middle">Pod</text>
          <rect x={140} y={172} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" />
          <text x={175} y={193} fill="#f2f2f2" fontSize="10" textAnchor="middle">Pod</text>

          <rect x={330} y={140} width={270} height={80} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={350} y={160} fill="#9a9a9a" fontSize="11">ワーカーノード</text>
          <rect x={350} y={172} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" />
          <text x={385} y={193} fill="#f2f2f2" fontSize="10" textAnchor="middle">Pod</text>
          <rect x={430} y={172} width={70} height={34} fill="none" stroke="#39ff6a" strokeWidth="1.2" />
          <text x={465} y={193} fill="#f2f2f2" fontSize="10" textAnchor="middle">Pod</text>

          <line x1={175} y1={100} x2={175} y2={140} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={465} y1={100} x2={465} y2={140} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </Diagram>

      <Heading num="06">ネットワーク</Heading>
      <p>K8sは<strong>フラットネットワーク</strong>を採る点が特徴です。すべてのPodが同一のネットワーク空間にあり、IPで直接通信できます(Pod間通信にNATは不要)。これを実現するのが<Term>CNI(Container Network Interface)</Term>というプラグイン機構で、シンプルなFlannel、ネットワークポリシーが強力なCalico、高性能なCiliumなどから選べます。</p>
      <p>外部からのHTTP/HTTPSアクセスは<Term>Ingress</Term>で制御します。URLパスによる振り分け(例: <code>example.com/A</code>→Pod A)やSSL終端を行うリバースプロキシに相当し、動作にはIngress Controller(NGINX・Traefikなど)が必要です。Pod間通信を「フロントエンドはDBにのみ」のようにルールで縛る<Term>NetworkPolicy</Term>は、マイクロサービスでは必須のセキュリティ機能です。</p>

      <Heading num="07">課題とエコシステム</Heading>
      <p>強力な一方で、Kubernetesには2つの大きな壁があります。それぞれに定番の対処法が育っています。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>学習・設定の複雑さ</h4>
          <p>概念が多くYAML記述も大変で学習コストが高い。<strong>Helm</strong>(パッケージマネージャー。<code>helm install</code>で一発導入)や<strong>Kustomize</strong>(YAML管理の簡素化)が助けになります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>クラスタ自体の運用</h4>
          <p>バージョンアップ・証明書更新・etcdバックアップなど運用作業が多い。コントロールプレインを事業者が管理する<strong>マネージドK8s</strong>(GKE / EKS / AKS)が現実的な選択肢です。</p>
        </Card>
      </CardGrid>
      <p>Podが動的に増減するため監視も一筋縄ではいきません。定番はPrometheus+Grafana(監視)とEFKスタック(ログ)で、詳しくは「<Link href="/infra/container/observability">オブザーバビリティ</Link>」で扱います。K8sは単体ではなく周辺ツールと組み合わせて使うのが普通で、この全体を<Term>クラウドネイティブエコシステム</Term>と呼び、<Term>CNCF</Term>(Cloud Native Computing Foundation)が推進しています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/container/docker" tag="インフラ">Docker ― コンテナを届けたツール</RelatedLink>
                    <RelatedLink href="/infra/container/observability" tag="インフラ">オブザーバビリティ ― メトリクス・ログ・トレース</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
