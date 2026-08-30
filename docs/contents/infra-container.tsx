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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンテナの仕組み",
};

const topics = [
  {
    href: "/infra/container/docker",
    title: "Docker",
    desc: "コンテナ技術を一般化したデファクトツール ― クライアント/デーモン/レジストリとDockerfile",
  },
  {
    href: "/infra/container/kubernetes",
    title: "Kubernetes",
    desc: "大量のコンテナを宣言的に束ねるオーケストレーション ― Pod・Service・Deployment",
  },
  {
    href: "/infra/container/observability",
    title: "オブザーバビリティ",
    desc: "メトリクス・ログ・トレースの3本柱 ― Prometheus・EFK・Jaeger",
  },
  {
    href: "/infra/container/security",
    title: "コンテナセキュリティ",
    desc: "5大リスクと、イメージ・実行時・監視の3層で固める防御",
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>コンテナの仕組み ― アプリを箱ごと持ち運ぶ</h1>
        <Lead>
          「自分の環境では動くのに、本番では動かない」―
          この定番のトラブルを根本から解消したのが<Term>コンテナ</Term>です。アプリケーションと、それを動かすのに必要なOS設定・ライブラリ・依存関係を<strong>ひとつの実行可能なパッケージ</strong>にまとめ、開発者のPCでもテスト環境でも本番サーバーでも同じように動かせるようにします。
        </Lead>
      </Hero>

      <p>「<Link href="/infra/virtualization">仮想化の仕組み</Link>」では、コンテナ型がハイパーバイザー型と違い<Term>ホストOSのカーネルを共有</Term>してプロセス単位で隔離することを見ました。ここではその一段深く、コンテナが<strong>なぜ軽く動くのか</strong>、イメージがどう積み重なり、ネットワークやデータがどう扱われるのかを掘り下げます。</p>

      <Heading num="01">コンテナとは何か ― 中身を問わない同じ形の箱</Heading>
      <p>物流のコンテナは、中身が家電でも食品でも<strong>同じ規格の箱</strong>に収めることで、トラック・船・クレーンといった異なる輸送手段を同じ手順で扱えるようにしました。ソフトウェアのコンテナも発想は同じです。アプリが必要とする「このOS・このライブラリ・この設定」という情報を箱の中にすべて同梱するため、箱を運ぶ側(実行環境)は中身を気にせず同じコマンドで起動できます。</p>
      <p>「私の環境では動く」問題の原因は、マシンごとにOSのバージョンやインストール済みライブラリが微妙に異なることでした。コンテナは依存関係を丸ごと閉じ込めるので、この環境差そのものを消し去ります。</p>

      <Heading num="02">軽さの核心 ― namespaces と cgroups</Heading>
      <p>コンテナの「軽さ」と「隔離」は、魔法ではなくLinuxカーネルに元から備わる2つの機能の組み合わせで実現されています。ゲストOSを丸ごと起動しないぶん、起動は数秒・メモリ消費はMB単位で済みます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>namespaces(名前空間)― 隔離</h4>
          <p>各コンテナに「自分だけがこのマシンを使っている」と錯覚させる技術。たとえばプロセスIDはコンテナごとにPID 1から独立して始まり、互いのプロセスは見えません。PID・ネットワーク・ファイルシステム・ユーザーIDなど<strong>8種類</strong>があり、いわば個室を割り当てます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>cgroups(Control Groups)― 制限</h4>
          <p>各コンテナが使えるCPU・メモリの<strong>上限</strong>を設定する技術。「コンテナAはCPU 30%・メモリ512MBまで」と決めておけば、1つのコンテナがCPU 100%で暴走しても、同居する他コンテナの動作を巻き添えにしません。</p>
        </Card>
      </CardGrid>
      <Aside label="まとめ">
        <strong>namespaces で隔離</strong>し、<strong>cgroups で制限</strong>する ― この2つがコンテナを軽量に動かす土台です。ゲストOSという重い層を省きながら、必要なぶんの独立性とリソース保護だけを実現しています。
      </Aside>

      <Heading num="03">コンテナイメージ ― 設計図とレイヤー構造</Heading>
      <p><Term>コンテナイメージ</Term>は、コンテナを作るための<strong>設計図・テンプレート</strong>です。実行中のコンテナの「写真」ではなく、そこから何個でも同じ状態のコンテナを起こせる型だと捉えてください。イメージはミルフィーユのように<strong>レイヤー(層)</strong>を積み重ねてできています。</p>

      <table>
        <thead>
          <tr><th>層(下→上)</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">最下層</td><td>ベースOS(例: Ubuntu)</td></tr>
          <tr><td>その上</td><td>ランタイム環境(例: Python)</td></tr>
          <tr><td>さらに上</td><td>必要なライブラリ</td></tr>
          <tr><td className="hl">最上層</td><td>アプリ本体</td></tr>
        </tbody>
      </table>

      <p>下位レイヤーは<strong>読み取り専用</strong>で、変更が必要なときは新しい層を上に足します。同じ下位レイヤーは複数のイメージ間で使い回せるため、一度ダウンロードしたUbuntu層は別のコンテナでも再利用でき、ディスクも通信も節約できます。</p>
      <p>書き込みは最上層だけに記録される<Term>Copy-on-Write(CoW)</Term>という仕組みで管理されます。下位層のファイルを書き換えるときは、まずそのファイルを最上層へコピーしてから変更し、元ファイルはそのまま残します。おかげで元イメージは決して壊れず、同じイメージから<strong>常に同一の初期状態</strong>を再現できます。開発環境と本番環境を完全に一致させられるのは、この性質のおかげです。</p>

      <Analogy label="💡 たとえるなら">
        イメージは<strong>料理のレシピ</strong>、コンテナは<strong>そのレシピで作った一皿</strong>です。同じレシピから何皿でも同じ味を再現でき、皿を食べ終えて捨てても(コンテナを削除しても)レシピ(イメージ)は手元に残ります。レイヤー構造は「下ごしらえ済みの共通ソースを何品もの料理で使い回す」ような効率化にあたります。
      </Analogy>

      <Heading num="04">ネットワーク ― 4つの接続モード</Heading>
      <p>コンテナは隔離されているぶん、外や隣のコンテナとどうつなぐかを選ぶ必要があります。用途に応じて主に4つのモードを使い分けます。</p>
      <table>
        <thead>
          <tr><th>モード</th><th>概要</th><th>主な用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Bridge(ブリッジ)</td><td>仮想ネットワークを作りコンテナ同士を接続する<strong>デフォルト</strong>。コンテナ専用のWi-Fiルーターのようなもの</td><td>一般的な開発・単一ホスト運用</td></tr>
          <tr><td className="hl">Host(ホスト)</td><td>ホストマシンのネットワークを直接共有(隔離なし・同一IP)</td><td>パフォーマンス重視の場面</td></tr>
          <tr><td className="hl">Overlay(オーバーレイ)</td><td>複数ホストマシンをまたいでコンテナを接続する</td><td>クラウド・複数サーバー環境</td></tr>
          <tr><td className="hl">None</td><td>ネットワークを完全に遮断する</td><td>外部通信を禁じたいセキュリティ重視の用途</td></tr>
        </tbody>
      </table>

      <Heading num="05">ストレージ ― ボリュームでデータを永続化する</Heading>
      <p>コンテナは削除すると中身のデータも一緒に消えます。使い捨てできる身軽さと引き換えの性質なので、消えては困るデータは<Term>ボリューム</Term>というコンテナの外の領域に保存します。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>概要</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">バインドマウント</td><td>ホストの特定フォルダをコンテナ内のパスに直接マウントする</td><td>ホストの<code>~/data</code>をコンテナの<code>/app/data</code>に接続</td></tr>
          <tr><td className="hl">名前付きボリューム</td><td>コンテナランタイムが管理する専用領域。保存場所を意識しなくてよくバックアップも容易</td><td>データベースのデータなど</td></tr>
        </tbody>
      </table>
      <Aside label="要注意">
        <strong>データベースのデータは必ずボリュームに保存</strong>してください。コンテナ本体に直接書き込んでいると、コンテナを作り直した瞬間にデータが全消失します。
      </Aside>

      <Heading num="06">隔離 ≠ 完全な安全</Heading>
      <p>コンテナは隔離されていますが、完璧な壁ではありません。ハイパーバイザー型と違ってホストOSのカーネルを共有するため、コンテナが侵害され、さらにカーネルの脆弱性を突かれると<strong>ホスト本体まで侵入される</strong>おそれがあります。最低限、次の3点は押さえておきます。</p>
      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">最小権限の原則</td><td>コンテナ内でroot(管理者)権限を使わず、一般ユーザーで実行する</td></tr>
          <tr><td className="hl">イメージスキャン</td><td>イメージ内の既知の脆弱性をTrivyやClairなどのツールで自動チェックする</td></tr>
          <tr><td className="hl">シークレット管理</td><td>パスワードやAPIキーをイメージに直接書かず、専用の管理ツールで扱う</td></tr>
        </tbody>
      </table>
      <p>より踏み込んだ攻撃シナリオと防御は「<Link href="/infra/container/security">コンテナセキュリティ</Link>」でまとめて扱います。</p>

      <Heading num="07">本番運用 ― オーケストレーションと監視</Heading>
      <p>コンテナは軽く起動が速いぶん、本番では数十〜数百個が動くのが当たり前になります。これを人手で管理するのは現実的ではないため、2つの仕組みが欠かせません。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>オーケストレーション</h4>
          <p><Term>Kubernetes(K8s)</Term>が代表格。落ちたコンテナの再起動や、負荷に応じた台数の自動増減を担います。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>モニタリング</h4>
          <p><Term>Prometheus</Term>+<Term>Grafana</Term>でCPU・メモリをリアルタイム監視。起動停止が頻繁なぶんログ収集も重要です。</p>
        </Card>
      </CardGrid>

      <Diagram caption="コンテナ技術の学習マップ ― 仕組みを土台に、実行(Docker)・運用(Kubernetes)・観測・防御へ広がる">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={200} y={20} width={240} height={44} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">コンテナの仕組み</text>
          <text x={320} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">namespaces / cgroups / イメージ</text>

          <line x1={320} y1={64} x2={320} y2={96} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={110} y1={96} x2={530} y2={96} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={110} y1={96} x2={110} y2={120} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={250} y1={96} x2={250} y2={120} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={390} y1={96} x2={390} y2={120} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={530} y1={96} x2={530} y2={120} stroke="#5f5f5f" strokeWidth="1" />

          <rect x={45} y={120} width={130} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={110} y={140} fill="#f2f2f2" fontSize="11" textAnchor="middle">Docker</text>
          <text x={110} y={155} fill="#9a9a9a" fontSize="9" textAnchor="middle">1つの箱を作る</text>
          <rect x={185} y={120} width={130} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={250} y={140} fill="#f2f2f2" fontSize="11" textAnchor="middle">Kubernetes</text>
          <text x={250} y={155} fill="#9a9a9a" fontSize="9" textAnchor="middle">無数の箱を束ねる</text>
          <rect x={325} y={120} width={130} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={390} y={140} fill="#f2f2f2" fontSize="11" textAnchor="middle">観測</text>
          <text x={390} y={155} fill="#9a9a9a" fontSize="9" textAnchor="middle">状態を可視化する</text>
          <rect x={465} y={120} width={130} height={44} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={530} y={140} fill="#f2f2f2" fontSize="11" textAnchor="middle">セキュリティ</text>
          <text x={530} y={155} fill="#9a9a9a" fontSize="9" textAnchor="middle">箱と土台を守る</text>
        </svg>
      </Diagram>

      <Heading num="次に読む">コンテナ技術を深掘りする</Heading>
      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/virtualization" tag="インフラ">仮想化の仕組み ― ハイパーバイザー型とコンテナ型</RelatedLink>
                    <RelatedLink href="/cloud/aws/container" tag="AWS">AWSのコンテナサービス</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み ― カーネルとプロセス</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
