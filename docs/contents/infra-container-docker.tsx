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
  Timeline,
  TimelineItem,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Docker",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>Docker ― コンテナを誰の手にも届けたツール</h1>
        <Lead>
          コンテナの<Link href="/infra/container">仕組み</Link>そのものはLinuxカーネルに元からありました。それを<strong>シンプルなコマンドと分かりやすい仕組み</strong>で誰でも使えるようにし、コンテナを一気に普及させたのが<Term>Docker</Term>です。開発ワークフロー全体を変えた、この定番ツールの中身を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">Dockerが解決した問題</Heading>
      <p>Docker以前、チーム開発には2つの慢性的な痛みがありました。ひとつは<strong>環境依存</strong> ― 開発者のPCでは動くのに、本番サーバーではOSの違いやライブラリの競合で動かず、原因究明に数日かかることもありました。もうひとつは<strong>セットアップの負担</strong> ― 新メンバーの環境構築に丸一日かかり、手順書どおりでも動かないことが頻発しました。</p>
      <p>Dockerの答えは明快です。アプリと実行環境をまとめて<Term>Dockerイメージ</Term>にし、それを渡すだけ。受け取った側は誰のPCでも同じように、数分〜数秒でアプリを起動できます。技術的な新しさだけでなく、覚えやすいコマンド・読みやすいエラー・充実したドキュメントという<strong>使いやすさ</strong>が、普及を決定づけました。</p>

      <Timeline>
        <TimelineItem era="2013.03">dotCloud<br />社内ツールをOSS公開</TimelineItem>
        <TimelineItem era="2013.10">Docker Inc.<br />人気を受け社名変更</TimelineItem>
        <TimelineItem era="2014.06">Docker 1.0<br />企業での本格利用へ</TimelineItem>
      </Timeline>
      <p>PaaS企業だったdotCloudが社内ツールをオープンソースとして公開したのが始まりです。公開直後から開発者の間で大ブームとなり、単なる仮想化ツールではなく開発の進め方そのものを変える存在になりました。</p>

      <Heading num="02">アーキテクチャ ― 3つの主要パーツ</Heading>
      <p>Dockerは大きく3つの部品でできています。ユーザーが叩くコマンド(クライアント)、実際に働く本体(デーモン)、イメージの倉庫(レジストリ)という役割分担です。</p>
      <table>
        <thead>
          <tr><th>コンポーネント</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Dockerクライアント</td><td>ユーザーが直接触る部分。<code>docker run</code>・<code>docker build</code>などのコマンドを受け付け、デーモンへ命令を伝える仲介役</td></tr>
          <tr><td className="hl">Dockerデーモン</td><td>バックグラウンドで常時動く実働部隊。コンテナの起動・停止、イメージ管理、ネットワーク設定を実行する</td></tr>
          <tr><td className="hl">Dockerレジストリ</td><td>イメージの保存・配布場所。代表例が<strong>Docker Hub</strong>(GitHubのDocker版)</td></tr>
        </tbody>
      </table>
      <p>クライアントとデーモンは<Term>REST API</Term>(HTTP通信)で連携するため、別マシンにあっても構いません。手元のPCからリモートサーバーのDockerを操作できるのはこのためです。Docker Hubには世界中の開発者が公開したイメージが集まっており、nginxやPostgreSQLなどをゼロから作らずに<code>docker pull</code>ですぐ利用できます。</p>

      <Diagram caption="クライアントの命令をデーモンが実行し、イメージはレジストリとやり取りする">
        <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={80} width={140} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={100} y={100} fill="#f2f2f2" fontSize="12" textAnchor="middle">クライアント</text>
          <text x={100} y={117} fill="#9a9a9a" fontSize="10" textAnchor="middle">docker run / build</text>

          <rect x={250} y={80} width={140} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={100} fill="#f2f2f2" fontSize="12" textAnchor="middle">デーモン</text>
          <text x={320} y={117} fill="#9a9a9a" fontSize="10" textAnchor="middle">実働部隊</text>

          <rect x={470} y={80} width={140} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={540} y={100} fill="#f2f2f2" fontSize="12" textAnchor="middle">レジストリ</text>
          <text x={540} y={117} fill="#9a9a9a" fontSize="10" textAnchor="middle">Docker Hub</text>

          <line x1={170} y1={105} x2={248} y2={105} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={209} y={96} fill="#9a9a9a" fontSize="10" textAnchor="middle">REST API</text>
          <line x1={390} y1={105} x2={468} y2={105} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={429} y={96} fill="#9a9a9a" fontSize="10" textAnchor="middle">pull / push</text>

          <rect x={250} y={30} width={140} height={30} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={50} fill="#f2f2f2" fontSize="11" textAnchor="middle">コンテナ</text>
          <line x1={320} y1={80} x2={320} y2={60} stroke="#5f5f5f" strokeWidth="1" />
        </svg>
      </Diagram>

      <Heading num="03">DockerイメージとDockerfile</Heading>
      <p><Term>Dockerfile</Term>は、イメージを作るための<strong>設計図・レシピ</strong>です。OSの準備、ライブラリのインストール、コードのコピーといった手順を上から順に書きます。<code>RUN</code>や<code>COPY</code>といった各命令は、それぞれ<Link href="/infra/container">コンテナの仕組み</Link>で見た<strong>レイヤーを1枚追加</strong>します。うまく書くコツは3つです。</p>
      <Steps>
        <li><strong>ベースイメージを使う</strong> ― ゼロから作らず、<code>python:3.9</code>のような公式イメージを土台にする。Pythonが最初から入った状態から始められる。</li>
        <li><strong>レイヤーの順序を最適化する</strong> ― 変更頻度の低い処理(ライブラリのインストール)を前に、高い処理(アプリコードのコピー)を後に書く。Dockerはレイヤーを<strong>キャッシュ</strong>するため、コードだけ直したときもライブラリ層を再利用でき、ビルドが速くなる。</li>
        <li><strong>マルチステージビルド(上級)</strong> ― 1つのDockerfile内でビルド段階と実行段階を分け、コンパイル用ツールを最終イメージに含めず必要なファイルだけコピーする。イメージサイズを数百MB単位で削れることもある。</li>
      </Steps>

      <Heading num="04">ネットワークとストレージ</Heading>
      <p>Dockerは<Term>libnetwork</Term>というライブラリでネットワークを管理し、前ページのブリッジ・ホストなどのモードを実現しています。ブリッジネットワークでは<code>docker0</code>という仮想ブリッジ(仮想スイッチングハブ)を作ってコンテナ同士を接続します。さらに<strong>組み込みDNS</strong>を備えており、IPアドレスを覚えなくても<code>app</code>のような<strong>コンテナ名</strong>で相手にアクセスできます。</p>
      <p>ストレージ側で<Term>レイヤー構造とCopy-on-Write</Term>を実現しているのが<strong>ストレージドライバー</strong>です。現在の主流は<Term>overlay2</Term>で、複数のディレクトリを重ねて1つに見せ、下層は読み取り専用・上層に書き込みという、まさにCoWの原理で動きます。device mapperやBtrfsなどもありますが、性能と安定性で優れるoverlay2が自動選択されます。</p>

      <Heading num="05">実践的な使い方 ― 開発はCompose、本番はK8s</Heading>
      <p>Web・DB・キャッシュなど複数コンテナを組み合わせるのが普通なので、それらをまとめて扱う道具を環境に応じて使い分けます。</p>
      <table>
        <thead>
          <tr><th>環境</th><th>推奨ツール</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">開発</td><td>Docker Compose</td><td>複数コンテナを<code>docker-compose.yml</code>に定義し、<code>docker compose up</code>の1コマンドで一括起動できる</td></tr>
          <tr><td className="hl">本番(大規模)</td><td>Kubernetes(K8s)</td><td>数百〜数千コンテナの管理はComposeでは力不足。自動スケールや障害復旧など高度なオーケストレーションが要る</td></tr>
        </tbody>
      </table>
      <p>Kubernetesの詳細は「<Link href="/infra/container/kubernetes">Kubernetes</Link>」で扱います。</p>

      <Heading num="06">セキュリティの勘どころ</Heading>
      <p>Dockerデーモンは基本的に<strong>root権限</strong>で動きます。つまりDockerを操作できる人は、実質的にホストのroot権限を持つのと同等です。この点は運用設計で強く意識すべきポイントです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Rootlessモード</h4>
          <p>root権限なしでDockerを動かすモードが用意されています。一部機能に制限があり完全移行は途上ですが、リスクを下げる有力な選択肢です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>イメージの出所を選ぶ</h4>
          <p>Docker Hubは誰でも公開できるため悪意あるイメージも混じります。<strong>Official</strong>や<strong>Verified Publisher</strong>のイメージを選び、Trivyで脆弱性スキャンをかけます。</p>
        </Card>
      </CardGrid>
      <Aside label="豆知識">
        コンテナ全般のセキュリティ ― コンテナエスケープやサプライチェーン攻撃、実行時の締め方 ― は「<Link href="/infra/container/security">コンテナセキュリティ</Link>」でまとめて掘り下げます。
      </Aside>

      <Heading num="07">Dockerの今後 ― containerd への流れ</Heading>
      <p>Dockerは今や開発の標準ツールですが、本番のコンテナ<strong>ランタイム</strong>としては、Docker本体から分離した軽量な<Term>containerd</Term>の採用が増えています。Kubernetesも、以前はDocker Engineを使っていましたが、現在はcontainerdを直接使うのが主流です。</p>
      <p>ただし学んだ知識は無駄になりません。イメージ形式(<Term>OCI</Term>)や基本概念は共通で、Dockerはこれからもコンテナ技術の<strong>入り口</strong>として重要な役割を果たします。</p>

      <Analogy label="💡 たとえるなら">
        Dockerは、専門家しか運転できなかった重機に、誰でも操れる<strong>ハンドルとペダル</strong>を付けて一般に開放したようなものです。エンジン(コンテナの仕組み)自体は前からありましたが、操作性を整えたことで一気に日常の道具になりました。
      </Analogy>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/container" tag="インフラ">コンテナの仕組み ― namespaces・cgroups・イメージ</RelatedLink>
                    <RelatedLink href="/infra/container/kubernetes" tag="インフラ">Kubernetes ― 大量のコンテナを束ねる</RelatedLink>
                    <RelatedLink href="/dev/tooling" tag="開発">パッケージ管理とビルド</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
