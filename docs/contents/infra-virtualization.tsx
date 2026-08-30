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
  title: "仮想化の仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>仮想化の仕組み ― 1台のハードウェアを複数台に見せる</h1>
        <Lead>
          「サーバーが3台必要だけど、物理マシンを3台買うのは高い」「開発環境を汚さずに試したい」―
          こうした悩みを解決してきたのが<Term>仮想化</Term>です。1台の物理的なコンピュータの中に、複数の独立した実行環境を作り出す技術で、その方式には大きく2つの流派があります。
        </Lead>
      </Hero>

      <p>「<Term>サーバーの全体像</Term>」で見たように、サーバーは「機械そのもの」と「その上で動くソフトウェア」に分けて考えられます。仮想化は、この「機械そのもの」の部分を1台で済ませながら、あたかも複数台あるかのように振る舞わせる技術です。</p>

      <Heading num="01">なぜ仮想化するのか</Heading>
      <p>物理サーバーを1台のアプリのためだけに使うと、CPUやメモリの多くは使われないまま余ってしまいます。かといって複数のアプリを同じOS上にそのまま同居させると、片方の不具合や設定変更がもう片方に影響してしまう危険があります。仮想化は、<strong>1台のハードウェアのリソースを分割・共有しながら、それぞれの環境を隔離する</strong>ことで、この2つの問題を同時に解決します。分割の仕方によって、大きく「ハイパーバイザー型」と「コンテナ型」という2つのアプローチに分かれます。</p>

      <Heading num="02">ハイパーバイザー型 ― ゲストOSごと丸ごと仮想化</Heading>
      <p><Term>ハイパーバイザー</Term>は、物理的なハードウェア(CPU・メモリ・ディスクなど)を仮想的な部品に分割し、その上で独立した<Term>ゲストOS</Term>をまるごと動かすためのソフトウェアです。1台の物理マシンの上に、Windowsの仮想マシンとLinuxの仮想マシンを同時に立ち上げる、といったことが可能になります。</p>

      <table>
        <thead>
          <tr><th>タイプ</th><th>特徴</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Type 1(ベアメタル型)</td><td>ハードウェアの上に直接インストールし、ハイパーバイザー自体がOSの役割を兼ねる。オーバーヘッドが小さく、サーバー用途の主流</td><td>Hyper-V、VMware ESXi、Proxmox</td></tr>
          <tr><td className="hl">Type 2(ホスト型)</td><td>既存のOS(Windows/macOSなど)の上に、通常のアプリケーションとしてインストールする。手軽だが、ホストOSの分だけオーバーヘッドが増える</td><td>VirtualBox、VMware Workstation</td></tr>
        </tbody>
      </table>

      <p>ゲストOSはそれぞれが独立した完全なOSであるため、隔離性が非常に高く、ゲストOSごとに異なるカーネル(例: WindowsとLinuxの混在)を動かせます。反面、ゲストOSごとにOS自体の起動やメモリ消費が発生するため、1台のハードウェア上で動かせる台数には限りがあり、起動にも数十秒〜数分かかります。</p>

      <Heading num="03">コンテナ型 ― OSのカーネルを共有してプロセスを隔離</Heading>
      <p><Term>コンテナ</Term>は、ゲストOSをまるごと用意する代わりに、ホストOSの<Term>カーネル</Term>(OSの中核部分)を複数のプロセスで共有しながら、それぞれのプロセスから見えるファイルシステムやネットワーク、プロセス一覧だけを個別に隔離する技術です。OSを新たに起動する必要がないため、起動は数秒以内と非常に速く、必要なリソースもゲストOSを丸ごと動かすより大幅に少なくて済みます。</p>
      <p>この隔離を実現するソフトウェアを<Term>コンテナランタイム</Term>と呼び、<Term>Docker</Term>が最も広く使われています。より軽量な実装として<Term>LXC(Linux Containers)</Term>もあり、こちらはOSに近い環境をまるごとコンテナ化する用途で使われます。ただしコンテナ型はホストOSのカーネルを共有する構造上、異なる種類のカーネル(例: LinuxコンテナをWindowsホスト上で直接動かす)を混在させることはできません。</p>

      <Diagram caption="ハイパーバイザー型はゲストOSごと仮想化し、コンテナ型はカーネルを共有してプロセス単位で隔離する">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <text x={160} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">ハイパーバイザー型</text>
          <rect x={40} y={200} width={240} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={225} fill="#f2f2f2" fontSize="12" textAnchor="middle">ハードウェア</text>
          <rect x={40} y={155} width={240} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={180} fill="#f2f2f2" fontSize="12" textAnchor="middle">ハイパーバイザー</text>
          <rect x={45} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={79} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">ゲストOS</text>
          <text x={79} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">アプリ</text>
          <rect x={121} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={155} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">ゲストOS</text>
          <text x={155} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">アプリ</text>
          <rect x={197} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={231} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">ゲストOS</text>
          <text x={231} y={90} fill="#9a9a9a" fontSize="10" textAnchor="middle">アプリ</text>

          <line x1={320} y1={30} x2={320} y2={270} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />

          <text x={480} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">コンテナ型</text>
          <rect x={360} y={245} width={240} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={480} y={270} fill="#f2f2f2" fontSize="12" textAnchor="middle">ハードウェア</text>
          <rect x={360} y={200} width={240} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={480} y={225} fill="#f2f2f2" fontSize="12" textAnchor="middle">ホストOS(カーネル共有)</text>
          <rect x={360} y={155} width={240} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={480} y={180} fill="#f2f2f2" fontSize="12" textAnchor="middle">コンテナランタイム</text>
          <rect x={365} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={399} y={95} fill="#f2f2f2" fontSize="11" textAnchor="middle">コンテナ</text>
          <rect x={441} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={475} y={95} fill="#f2f2f2" fontSize="11" textAnchor="middle">コンテナ</text>
          <rect x={517} y={35} width={68} height={110} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={551} y={95} fill="#f2f2f2" fontSize="11" textAnchor="middle">コンテナ</text>
        </svg>
      </Diagram>

      <table>
        <thead>
          <tr><th></th><th>ハイパーバイザー型</th><th>コンテナ型</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">隔離の単位</td><td>ゲストOSごと(カーネルも別)</td><td>プロセスごと(カーネルは共有)</td></tr>
          <tr><td className="hl">起動速度</td><td>数十秒〜数分(OSの起動を伴う)</td><td>数秒以内</td></tr>
          <tr><td className="hl">オーバーヘッド</td><td>大きい(ゲストOS分のリソースを消費)</td><td>小さい(アプリと最小限の依存だけ)</td></tr>
          <tr><td className="hl">隔離の強さ</td><td>非常に強い(カーネルレベルで別)</td><td>ハイパーバイザー型よりは弱い</td></tr>
          <tr><td className="hl">異なるOSの混在</td><td>可能(Windows/Linux混在も可)</td><td>不可(ホストOSのカーネルに依存)</td></tr>
          <tr><td className="hl">主な用途</td><td>複数OSの統合、強い隔離が要る用途</td><td>アプリの配布・実行環境の統一</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        <strong>ハイパーバイザー型</strong>は、1つの土地に完全に独立した家を何棟も建てるようなものです。各家には独自の水道・電気の引き込み(OS)があり、隣家の影響を受けません。<strong>コンテナ型</strong>は、1つの大きな建物の中を間仕切りで区切ったオフィスに近く、水道・電気(カーネル)は建物全体で共有しつつ、各部屋(コンテナ)の中の荷物や活動はきちんと分けられています。部屋を用意するのは家を建てるよりずっと速いですよね。
      </Analogy>

      <Heading num="04">Kubernetes ― 大量のコンテナを束ねて運用する</Heading>
      <p>コンテナは1つ1つの起動が速く軽量なため、実際のシステムでは数十〜数百個のコンテナが動くことも珍しくありません。これを手作業で「どのマシンで動かすか」「落ちたら再起動するか」「アクセスをどう分散するか」まで管理するのは現実的ではありません。この<Term>オーケストレーション(束ねて運用すること)</Term>を自動化するソフトウェアが<Term>Kubernetes(K8s)</Term>です。複数の物理・仮想マシンをまたいでコンテナの配置や再起動、台数の増減を自動で管理してくれますが、その仕組み自体の深掘りは、<Link href="/infra/container">コンテナ</Link>のセクションで取り上げます。</p>

      <Aside label="豆知識">
        Dockerで作った1つの「コンテナ」を動かす仕組みそのものと、大量のコンテナを束ねて管理するKubernetesは役割が異なります。前者は「1つの箱をどう作り、どう動かすか」、後者は「無数の箱をどこに配置し、どう生き続けさせるか」という、レイヤーの異なる話です。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>仮想化は1台を複数台に見せる技術</h4>
          <p>ハードウェアのリソースを分割・共有しながら、環境ごとに隔離することで、コストと安全性を両立します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ハイパーバイザー型はOSごと、コンテナ型はプロセス単位</h4>
          <p>隔離の強さと引き換えに、ハイパーバイザー型は起動が遅く重く、コンテナ型は軽量で高速です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>コンテナが増えるとオーケストレーションが要る</h4>
          <p>Kubernetesのようなツールが、大量のコンテナの配置・再起動・スケールを自動で管理します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                    <RelatedLink href="/infra/storage" tag="インフラ">ストレージの仕組み ― NAS・SAN・RAID</RelatedLink>
                    <RelatedLink href="/computer/client" tag="コンピュータ">クライアント管理の実務</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
