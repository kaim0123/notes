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
  Timeline,
  TimelineItem,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Docker" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Docker ― コンテナを誰の手にも届けたツール</h1>
        <Lead>
          <Link href="/infra/virtualization">仮想化とコンテナ</Link>で見たとおり、隔離の仕組み自体はLinuxカーネルに元からありました。<Term>Docker</Term>が変えたのは技術ではなく<strong>手の届きやすさ</strong>です。覚えられるコマンド、読めるエラー、そして誰かの作ったイメージをそのまま取ってこられる仕組み ― この3つが揃った結果、コンテナは一部の専門家の道具から開発の共通語になりました。
        </Lead>
      </Hero>

      <Heading num="01">何が解決されたのか</Heading>
      <p>
        Docker以前のチーム開発には、慢性的な痛みが2つありました。ひとつは<strong>環境依存</strong> ― 手元では動くのに本番では動かず、原因はOSのバージョンやライブラリの競合で、突き止めるのに数日かかる。もうひとつは<strong>セットアップの負担</strong> ― 新しく入った人の環境構築に丸一日かかり、手順書どおりにやっても動かない。
      </p>
      <p>
        答えは単純でした。アプリと実行環境をまとめて<Term>イメージ</Term>にし、それを渡す。受け取った側は同じコマンドで同じものを起動できます。この「渡せる形にする」という発想が、<Link href="/dev/environments">環境</Link>の差という問題そのものを畳みました。
      </p>

      <Timeline>
        <TimelineItem era="2013.03">dotCloud が社内ツールをOSSとして公開</TimelineItem>
        <TimelineItem era="2013.10">人気を受けて社名を Docker Inc. へ変更</TimelineItem>
        <TimelineItem era="2014.06">Docker 1.0 ― 企業での本格利用が始まる</TimelineItem>
      </Timeline>

      <Heading num="02">3つの部品</Heading>
      <p>
        Dockerは大きく3つに分かれます。利用者が叩くコマンド(クライアント)、実際に働く本体(デーモン)、イメージの倉庫(レジストリ)です。
      </p>

      <DiagramFrame
        slug="infra-docker-architecture"
        aspect="700 / 260"
        caption="Dockerの3つの部品とやり取り。docker run や docker build はクライアントが受け取り、REST APIでデーモンへ伝える。コンテナの起動、イメージの管理、ネットワークの設定を実際に行うのはデーモンで、イメージの取得と公開はレジストリとの間で行われる。クライアントとデーモンはHTTPで話すため別のマシンにあってもよく、デーモンが既定でroot権限で動くことがそのまま運用上の注意点になる。"
      />

      <table>
        <thead>
          <tr><th>部品</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クライアント</td><td>利用者が触る側。<code>docker run</code>・<code>docker build</code> などを受け付けてデーモンへ伝える</td></tr>
          <tr><td className="hl">デーモン</td><td>常駐して実際に動かす側。コンテナの起動・停止、イメージ管理、ネットワーク設定を行う</td></tr>
          <tr><td className="hl">レジストリ</td><td>イメージの保存・配布場所。公開レジストリの代表がDocker Hub</td></tr>
        </tbody>
      </table>

      <p>
        クライアントとデーモンの間はHTTPなので、両者が別のマシンにあっても構いません。手元のPCから遠隔サーバーのDockerを操作できるのはこのためで、同時に<strong>その口を誰に開けるか</strong>が運用上の判断になります。
      </p>

      <Heading num="03">Dockerfile ― レイヤーを積む順番</Heading>
      <p>
        <Term>Dockerfile</Term>はイメージを作る手順書です。<code>FROM</code>で土台を選び、<code>RUN</code>や<code>COPY</code>で1行ごとに<Link href="/infra/virtualization">レイヤー</Link>を1枚足していきます。ここで効いてくるのが<strong>キャッシュ</strong>です。ある層が変わると、それより上の層はすべて無効になり作り直しになります。
      </p>

      <DiagramFrame
        slug="infra-docker-layer-cache"
        aspect="760 / 320"
        caption="Dockerfileの命令の順序が、ビルドの速さをどう変えるか。左は先にコードをコピーしてから依存を入れる書き方で、コードを1行直すだけで依存のインストールからやり直しになる。右は依存の定義ファイルだけを先にコピーして入れ、そのあとでコードをコピーする書き方で、コードだけ直したときは依存の層をキャッシュから使い回せる。変更頻度の低いものを先に、高いものを後に置くのが原則。"
      />

      <Steps>
        <li><strong>公式のベースイメージから始める</strong> ― <code>node:20</code> のように、必要なランタイムが入った土台を選ぶ。ゼロから組む理由はほとんどない。</li>
        <li><strong>変更頻度の低い順に書く</strong> ― 依存の定義だけを先にコピーしてインストールし、アプリのコードは最後にコピーする。図の右の形。</li>
        <li><strong>マルチステージビルドで仕上げる</strong> ― ビルド用の道具を含んだ段と、実行に必要なものだけを含んだ段を分け、成果物だけを後段へコピーする。イメージが小さくなるだけでなく、<strong>本番に余計な道具を置かない</strong>ことがそのまま攻撃面の削減になる。</li>
      </Steps>

      <Aside label="小さいイメージは、速さだけの話ではない">
        イメージに含まれるものは、すべて脆弱性の検査対象であり、侵入された場合に攻撃者が使える道具でもあります。コンパイラもシェルも要らないなら、入れないほうが安全です。同じ考え方は<Link href="/dev/tooling-security">依存の脆弱性とサプライチェーン</Link>にもあります。
      </Aside>

      <Heading num="04">ネットワークとデータの置き場所</Heading>
      <p>
        コンテナ同士は既定で<Term>ブリッジネットワーク</Term>につながり、組み込みDNSによって<strong>コンテナ名で相手を呼べます</strong>(IPアドレスを覚える必要はありません)。用途に応じてホストのネットワークをそのまま使う、複数ホストをまたぐ、遮断する、といったモードを選びます。
      </p>
      <p>
        データ側は、書き込みがコンテナごとの一時的な層に載るという性質を前提に置き場所を決めます。ホストのディレクトリを直接見せる<Term>バインドマウント</Term>は開発中のコード共有に、Dockerが管理する<Term>名前付きボリューム</Term>はデータベースの実体のように<strong>消えては困るもの</strong>に使います。この層構造とCopy-on-Writeを実現しているのがストレージドライバーで、現在の主流は<code>overlay2</code>です。
      </p>

      <Heading num="05">開発はCompose、本番はオーケストレータ</Heading>
      <p>
        実際のアプリはWeb・DB・キャッシュのように複数のコンテナで動きます。開発中は<Term>Docker Compose</Term>で <code>compose.yaml</code> に一式を書き、1コマンドで立ち上げるのが定番です。ただしComposeは<strong>1台のマシンの中</strong>を前提にしているので、複数サーバーへ広げて落ちたものを起こし直し、負荷に応じて増減させる段になると力不足になります。そこから先が<Link href="/infra/kubernetes">Kubernetes</Link>の領分です。
      </p>

      <Heading num="06">root で動くという前提</Heading>
      <p>
        Dockerデーモンは既定で<strong>root権限</strong>で動きます。つまり<Term>Dockerを操作できる人は、実質的にホストのrootを持つのと同じ</Term>です。CIサーバーやチームの共有マシンでこの口を開けるときは、権限設計としてそれを意識する必要があります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Rootless モード</h4>
          <p>デーモンを一般ユーザー権限で動かす方式。一部機能に制限があるが、事故と侵害の被害範囲を確実に小さくする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>イメージの出所を選ぶ</h4>
          <p>公開レジストリは誰でも公開できる。公式・検証済みの発行者を選び、取得したイメージは脆弱性スキャンにかける。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>コンテナの中もrootにしない</h4>
          <p>実行ユーザーを明示的に一般ユーザーへ落とす。カーネルを共有している以上、中のrootは外に近い。</p>
        </Card>
      </CardGrid>

      <p>
        コンテナエスケープやイメージ経由の混入といった具体的な攻撃と防御は<Link href="/infra/container-security">コンテナセキュリティ</Link>で扱います。
      </p>

      <Heading num="07">Dockerとcontainerdの関係</Heading>
      <p>
        本番でコンテナを動かす<Term>ランタイム</Term>としては、Docker本体から切り出された軽量な<Term>containerd</Term>が主流になりました。Kubernetesも以前はDocker Engineを使っていましたが、現在はcontainerdなどを直接呼びます。
      </p>
      <p>
        とはいえ学んだことは無駄になりません。イメージの形式は<Term>OCI</Term>として標準化されており、<strong>Dockerで作ったイメージはそのまま他のランタイムで動きます</strong>。Dockerは今も、コンテナを手で触って理解するための入口として使われ続けています。
      </p>

      <Analogy label="💡 たとえるなら">
        専門家しか動かせなかった重機に、誰でも握れるハンドルとペダルを付けて開放したのがDockerです。エンジン(カーネルの隔離機能)は前からありました。運転席を作ったことが発明だったので、後にエンジンだけを積み替えても(containerd)、運転の仕方は変わりません。
      </Analogy>

      <Heading num="まとめ">渡せる形にした</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>イメージが単位になった</h4>
          <p>アプリと環境をまとめて渡せるようにしたことで、環境差という問題そのものが消えた。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>順序がビルド時間を決める</h4>
          <p>レイヤーはキャッシュされる。変更頻度の低いものを先に書けば、日常のビルドは最後の層だけで済む。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>デーモンはrootで動く</h4>
          <p>操作権限はホストの管理者権限に等しい。誰に開けるか、中で誰として動かすかを設計する。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/docker" />
    </DocsPage>
  );
}
