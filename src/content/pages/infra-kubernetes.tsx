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

export const metadata: Metadata = { title: "Kubernetes" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Kubernetes ― 手順ではなく、あるべき姿を渡す</h1>
        <Lead>
          <Link href="/infra/docker">Docker</Link>は1台のマシンでコンテナを動かすところまでを引き受けました。複数のサーバーに数百のコンテナを配り、落ちたら起こし直し、負荷に応じて増減させ、無停止で入れ替える ― ここから先は人手では回りません。<Term>Kubernetes</Term>が引き受けるのはその領域ですが、本質は自動化の機能一覧ではなく<strong>指示の仕方を変えたこと</strong>にあります。手順を与えるのをやめ、あるべき姿だけを宣言する。この一点さえ掴めば、あとの部品は役割で読めます。
        </Lead>
      </Hero>

      <Heading num="01">何を肩代わりするのか</Heading>
      <p>
        名前はギリシャ語の「舵取り」に由来し、<strong>K8s</strong> という略記はKとSの間の8文字を省いたものです。Googleが社内で長く運用してきた大規模コンテナ管理の知見をもとに、2014年にオープンソースとして公開されました。自動化される働きは、大きく5つに整理できます。
      </p>

      <table>
        <thead>
          <tr><th>働き</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スケジューリング</td><td>どのサーバー(ノード)で動かすかを、空きリソースを見て決める</td></tr>
          <tr><td className="hl">自己修復</td><td>落ちたコンテナを起こし直し、ノードごと落ちれば別のノードで作り直す</td></tr>
          <tr><td className="hl">オートスケーリング</td><td>負荷に応じてコンテナの数を増減させる</td></tr>
          <tr><td className="hl">負荷分散</td><td>複数のコンテナへアクセスを振り分ける</td></tr>
          <tr><td className="hl">ローリングアップデート</td><td>少しずつ入れ替え、止めずに更新する</td></tr>
        </tbody>
      </table>

      <Heading num="02">宣言的管理 ― 差分を埋め続ける</Heading>
      <p>
        5つの働きは、実はどれも同じ1つの仕組みから出てきます。利用者は「コンテナを3個起動しろ」という<strong>手順</strong>ではなく、「常に3個あるべき」という<strong>状態</strong>を宣言します。Kubernetesは現状を観測し、宣言との差を埋め続けます。この繰り返しを<Term>調整ループ</Term>と呼びます。
      </p>

      <DiagramFrame
        slug="infra-kubernetes-reconcile"
        aspect="700 / 300"
        caption="宣言的管理と調整ループ。利用者はレプリカ数を3にするという、あるべき姿だけを宣言する。Kubernetesは現在の状態を絶えず観測し、1つ落ちて2つになれば差分を検知して足りない1つを起こし、多ければ減らす。このループが止まらずに回り続けるため、落ちたPodは黙って起き直る。命令的な運用ではこの修正を人がやるが、宣言的な運用では機械がやる。"
      />

      <table>
        <thead>
          <tr><th>方式</th><th>伝えるもの</th><th>ずれたとき</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命令的</td><td>「サーバー1で起動しろ」という手順</td><td>誰かが気づいて、手で直す</td></tr>
          <tr><td className="hl">宣言的</td><td>「常に3個あるべき」という状態</td><td>機械が差分を検知して、自動で埋める</td></tr>
        </tbody>
      </table>

      <p>
        あるべき姿をYAMLに書いて <code>kubectl apply</code> で渡すという形は、そのまま<strong>インフラの状態をバージョン管理できる</strong>ことを意味します。構成をコードとして扱う考え方(IaC)の、最も実践的な現れ方のひとつです。
      </p>

      <Analogy label="💡 たとえるなら">
        命令的な運用は「エアコンを付けて、5分後に弱にして…」と逐一操作すること。宣言的な運用は「室温は常に25℃」とだけ設定して、あとはサーモスタットに任せることです。前者は指示を出す人がずっと張り付く必要があり、後者は目標だけ決めれば差を埋め続けてくれます。
      </Analogy>

      <Heading num="03">クラスタの形 ― 判断する側と、動かす側</Heading>
      <p>
        クラスタは、判断を担う<Term>コントロールプレイン</Term>と、実際にコンテナを動かす<Term>ワーカーノード</Term>に分かれます。
      </p>

      <DiagramFrame
        slug="infra-kubernetes-architecture"
        aspect="760 / 320"
        caption="Kubernetesクラスタの構成。コントロールプレインには、すべての操作が経由するAPI Server、置き場所を決めるScheduler、あるべき状態との差を埋め続けるController Manager、全状態を保存するetcdが並ぶ。ワーカーノードには、指示を受けてコンテナを起こすkubelet、通信を振り分けるkube-proxy、実際に動かすランタイムがあり、その上でPodが動いている。Podは使い捨てでIPが変わるため、外向きの窓口はServiceとIngressが受け持つ。"
      />

      <table>
        <thead>
          <tr><th>部品</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">API Server</td><td>すべての操作の入口。利用者の指示も内部の連絡も、必ずここを通る</td></tr>
          <tr><td className="hl">Scheduler</td><td>新しいPodをどのノードで動かすかを決める</td></tr>
          <tr><td className="hl">Controller Manager</td><td>調整ループを回し、宣言と現状の差を埋める</td></tr>
          <tr><td className="hl">etcd</td><td>クラスタの全状態を持つ分散キーバリューストア。失えば全体を失うので冗長化する</td></tr>
          <tr><td className="hl">kubelet</td><td>各ノードの担当者。指示に従ってコンテナを起動・停止する</td></tr>
          <tr><td className="hl">ランタイム</td><td>実際にコンテナを動かす。現在はcontainerdやCRI-Oが主流</td></tr>
        </tbody>
      </table>

      <Aside label="ランタイムが変わってもイメージは変わらない">
        Kubernetesは<Term>CRI</Term>という規格を挟んで特定のランタイムに依存しない設計になっています。だから<Link href="/infra/docker">Docker</Link>で作ったイメージはそのまま動きます。「KubernetesがDockerを非推奨にした」という話は、イメージ形式ではなく<strong>ノード上でコンテナを起動する部品</strong>の入れ替えを指しています。
      </Aside>

      <Heading num="04">4つの部品で全体像がつかめる</Heading>
      <p>
        扱うリソースの種類は多いのですが、まずは次の4つの関係だけで読めるようになります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Pod ― 最小単位</h4>
          <p>1つ以上のコンテナをまとめた単位。通常は1Pod = 1コンテナ。同じPodの中はネットワークを共有し <code>localhost</code> で話せる。<strong>使い捨て</strong>が前提で、作り直されるたびにIPが変わる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ラベルとセレクター ― つなぐもの</h4>
          <p>リソースに付けるタグ(<code>app=web</code>)と、それで対象を選ぶ仕組み。名前ではなく条件で束ねるので、増減する相手をそのまま扱える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>Service ― 変わらない窓口</h4>
          <p>PodのIPは変わるので、固定の名前でたどり着ける入口を用意する。同じラベルのPodへ振り分ける負荷分散も兼ねる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>Deployment ― 宣言の置き場所</h4>
          <p>「このイメージを3個」と書くリソース。Podの再作成もローリングアップデートもここが面倒を見る。日常はこれだけ意識すればよい。</p>
        </Card>
      </CardGrid>

      <p>
        外部への公開範囲はServiceの種類で決めます ― クラスタ内部だけ(ClusterIP)、ノードのポートを開ける(NodePort)、クラウドのロードバランサと連携する(LoadBalancer)。HTTPの入口でパスやホスト名による振り分けとTLSの終端を行うのは<Term>Ingress</Term>です。設定値は<Term>ConfigMap</Term>、秘密は<Term>Secret</Term>、消えては困るデータは<Term>PersistentVolume</Term>に置きます ― この分離は<Link href="/dev/dotenv">環境変数と設定</Link>で見た「コードの外に出す」原則の、クラスタ上での置き場所にあたります。
      </p>

      <Heading num="05">ネットワークは平ら</Heading>
      <p>
        Kubernetesのネットワークは<strong>すべてのPodが同じ空間にいて、IPで直接届く</strong>という前提で設計されています(Pod間の通信にアドレス変換を挟みません)。これを実装するのが<Term>CNI</Term>というプラグイン機構で、単純なもの、ネットワークポリシーに強いもの、性能に振ったものから選びます。
      </p>
      <p>
        平らだということは、<strong>既定では誰でも誰に届く</strong>ということでもあります。「フロントエンドからDBへは通すが、その逆や他は通さない」といった制限は<Term>NetworkPolicy</Term>で明示的に書きます。<Link href="/design/architecture-microservices">マイクロサービス</Link>のようにサービス数が増えるほど、この線引きが実質的な内部防御になります(考え方は<Link href="/security/network-defense">ネットワーク層の防御</Link>と同じで、境界が内側にも要るという話です)。
      </p>

      <Heading num="06">重さと、その避け方</Heading>
      <p>
        強力な代わりに、Kubernetesには現実的な2つの壁があります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>概念と設定の量</h4>
          <p>覚える語彙が多く、YAMLも長い。テンプレート化するHelmや、差分で環境ごとの違いを表すKustomizeが定番の緩和策。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>クラスタ自体の運用</h4>
          <p>バージョン更新、証明書の更新、etcdのバックアップ ― クラスタを保守する仕事が別に発生する。コントロールプレインを事業者に任せるマネージドK8s(EKS・GKE・AKS)が現実的。</p>
        </Card>
      </CardGrid>

      <Aside label="そもそも要るのかを先に問う">
        Kubernetesが効くのは、<strong>サービスの数と入れ替えの頻度が人手の限界を超えたとき</strong>です。数個のコンテナを1台で動かしているだけなら、<Link href="/infra/deploy">PaaSやマネージドなコンテナ実行基盤</Link>のほうが総手間は小さくなります。「あるべき姿を宣言する」という発想は魅力的ですが、その維持にも人手がかかることを勘定に入れてから選びます。
      </Aside>

      <p>
        Podが絶えず入れ替わるため、監視も従来のやり方では追いつきません。何をどう観測するかは<Link href="/infra/observability">オブザーバビリティ</Link>で扱います。
      </p>

      <Heading num="まとめ">状態を宣言し、機械に埋めさせる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>機能ではなく仕組みが1つ</h4>
          <p>自己修復もスケールも更新も、宣言と現状の差を埋め続ける同じループから出ている。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Podは使い捨て</h4>
          <p>消えて作り直される前提だから、窓口(Service)と設定(ConfigMap・Secret)と永続データを外に出す。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>導入にも運用費がかかる</h4>
          <p>規模が要求していないなら、マネージドな選択肢のほうが安い。使うならクラスタ運用を誰が持つかを決める。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/kubernetes" />
    </DocsPage>
  );
}
