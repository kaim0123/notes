import Link from "next/link";
import type { Metadata } from "next";
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
  Diagram,
  Steps,
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "パッケージ管理とビルド",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>パッケージ管理とビルド ― npm・pnpm・Viteでコードから動くアプリへ</h1>
        <Lead>
          今のWeb開発は、自分で書いたコードだけでなく、世界中の開発者が公開している部品(パッケージ)を大量に組み合わせて成り立っています。それらをどう取り込み、どう1つの動くアプリにまとめ上げるか ―
          その道具が<Term>npm</Term>・<Term>pnpm</Term>・<Term>Vite</Term>です。
        </Lead>
      </Hero>

      <p>前のページ「<Link href="/dev/workspace">開発環境</Link>」で、ターミナルとシェルを使ってコマンドを実行できるようになりました。ここからは、そのコマンドを使って実際に何をするのか ― パッケージ管理とビルドの中身を見ていきます。</p>

      <Heading num="01">なぜ「パッケージ管理」が必要か</Heading>
      <p>日付を扱う処理、通信の処理、画面の見た目を整える処理 ― これらを毎回すべて自分でゼロから書いていては時間がいくらあっても足りません。そこで、他の開発者が作って公開している再利用可能な部品を<Term>パッケージ(ライブラリ)</Term>として取り込みます。ただし1つのパッケージが別の何十個ものパッケージに依存していることも多く、バージョンの組み合わせを手作業で管理するのは非現実的です。この依存関係を自動で解決し、取得・整理してくれるのが<Term>パッケージ管理ツール</Term>です。</p>
      <Analogy label="💡 たとえるなら">
        家電を作るとき、ネジや半導体チップまで全部自社工場で作る会社はありません。専門メーカーが作った既製の部品を仕入れて組み立てます。パッケージ管理ツールは、この「必要な部品を、必要なバージョンで、正しい組み合わせで仕入れてくる」調達係です。
      </Analogy>
      <p>JavaScriptのプロジェクトでは、使っているパッケージの一覧やプロジェクトの基本情報を<code>package.json</code>というファイルに記録します。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>name</code> / <code>version</code></td><td>プロジェクト自体の名前とバージョン</td></tr>
          <tr><td className="hl"><code>dependencies</code></td><td>アプリの実行に必要なパッケージ一覧</td></tr>
          <tr><td className="hl"><code>devDependencies</code></td><td>開発時にだけ必要なパッケージ一覧(ビルドツールなど)</td></tr>
          <tr><td className="hl"><code>scripts</code></td><td><code>npm run dev</code>のように名前で呼び出せるコマンド集</td></tr>
        </tbody>
      </table>

      <Heading num="02">npm とは ― JavaScript界の定番パッケージ管理ツール</Heading>
      <p><Term>npm(Node Package Manager)</Term>は、Node.jsをインストールすると標準で付いてくるパッケージ管理ツールで、事実上の業界標準です。世界中の公開パッケージが登録された<Term>npmレジストリ</Term>というオンラインの倉庫から、必要なパッケージをダウンロードしてきます。</p>
      <Diagram caption="package.jsonの依存関係一覧をもとに、npmレジストリから取得しnode_modulesに保存する">
        <svg viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={65} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={95} fill="#f2f2f2" fontSize="12" textAnchor="middle">package.json</text>

          <rect x={220} y={65} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={290} y={88} fill="#f2f2f2" fontSize="12" textAnchor="middle">npm install</text>
          <text x={290} y={104} fill="#9a9a9a" fontSize="10" textAnchor="middle">依存関係を解決</text>

          <rect x={420} y={10} width={180} height={45} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={510} y={37} fill="#9a9a9a" fontSize="12" textAnchor="middle">npmレジストリ(インターネット)</text>

          <rect x={420} y={120} width={180} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={510} y={150} fill="#f2f2f2" fontSize="12" textAnchor="middle">node_modules フォルダ</text>

          <line x1={160} y1={90} x2={218} y2={90} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <line x1={360} y1={80} x2={418} y2={45} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <line x1={420} y1={50} x2={362} y2={85} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={360} y1={100} x2={418} y2={140} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <defs>
            <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>コマンド</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>npm install</code></td><td>package.jsonに書かれた依存パッケージを全てインストール</td></tr>
          <tr><td className="hl"><code>npm install axios</code></td><td>axiosという新しいパッケージを追加でインストール</td></tr>
          <tr><td className="hl"><code>npm run dev</code></td><td>package.jsonの<code>scripts.dev</code>に登録されたコマンドを実行</td></tr>
          <tr><td className="hl"><code>npm uninstall axios</code></td><td>axiosをアンインストール</td></tr>
        </tbody>
      </table>

      <Heading num="03">pnpm とは ― 同じ部品を何度も保存しない工夫</Heading>
      <p>npmには弱点もあります。プロジェクトごとに<code>node_modules</code>フォルダの中身をまるごと複製するため、同じパッケージの同じバージョンをPC内に何十回も重複して保存してしまい、ディスク容量とインストール時間を無駄に消費します。<Term>pnpm</Term>は、この重複を解消するために作られたパッケージ管理ツールです。</p>
      <p>pnpmは、PC内に1つだけ<Term>共有ストア</Term>を持ち、すべてのプロジェクトはそのストアにある実体への「リンク」を通じてパッケージを参照します。同じバージョンのパッケージなら、10個のプロジェクトがあっても実体はディスク上に1つだけです。</p>
      <Diagram caption="npmは各プロジェクトが実体を複製、pnpmは共有ストアの実体をリンクで参照する">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <text x={140} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">npm(プロジェクトごとに複製)</text>
          <rect x={20} y={40} width={100} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={70} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">プロジェクトA</text>
          <rect x={35} y={75} width={70} height={30} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={70} y={94} fill="#c9ffd8" fontSize="9" textAnchor="middle">lodash 実体</text>

          <rect x={140} y={40} width={100} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={190} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">プロジェクトB</text>
          <rect x={155} y={75} width={70} height={30} fill="none" stroke="#39ff6a" strokeWidth="1" />
          <text x={190} y={94} fill="#c9ffd8" fontSize="9" textAnchor="middle">lodash 実体</text>
          <text x={130} y={210} fill="#9a9a9a" fontSize="10" textAnchor="middle">同じlodashが2重に保存される</text>

          <line x1={280} y1={110} x2={330} y2={110} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow3)" />
          <defs>
            <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>

          <text x={490} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">pnpm(1箇所に保存しリンク)</text>
          <rect x={430} y={40} width={90} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={475} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">プロジェクトA</text>
          <rect x={445} y={75} width={60} height={26} fill="none" stroke="#39ff6a" strokeDasharray="3 3" strokeWidth="1" />
          <text x={475} y={92} fill="#c9ffd8" fontSize="9" textAnchor="middle">リンク</text>

          <rect x={540} y={40} width={90} height={150} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={585} y={62} fill="#f2f2f2" fontSize="11" textAnchor="middle">プロジェクトB</text>
          <rect x={555} y={75} width={60} height={26} fill="none" stroke="#39ff6a" strokeDasharray="3 3" strokeWidth="1" />
          <text x={585} y={92} fill="#c9ffd8" fontSize="9" textAnchor="middle">リンク</text>

          <rect x={470} y={140} width={120} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={530} y={165} fill="#f2f2f2" fontSize="10" textAnchor="middle">共有ストア: lodash 実体1つ</text>
          <line x1={475} y1={101} x2={505} y2={138} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={585} y1={101} x2={555} y2={138} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </Diagram>
      <Analogy label="💡 たとえるなら">
        npmは「同じ本を欲しい人がそれぞれ1冊ずつ買って自分の本棚に置く」方式です。pnpmは「図書館の書庫に本を1冊だけ置き、みんなはその本への貸出カード(リンク)だけを持つ」方式。中身を読む分には違いがなく、保管スペースだけ大きく節約できます。
      </Analogy>

      <Heading num="04">「ビルド」とは何か</Heading>
      <p>私たちが書くソースコード(TypeScriptや、複数ファイルに分かれたモジュール)は、そのままではブラウザが効率よく実行できる形になっていないことがあります。<Term>ビルド</Term>とは、開発者にとって書きやすい形のコードを、ブラウザにとって実行しやすい・軽い形に変換する工程全体を指します。主な処理は次の3つです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>トランスパイル</h4><p>TypeScriptやJSXなど、ブラウザが直接理解できない構文を、通常のJavaScriptに変換する</p></Card>
        <Card><CardNumber>2</CardNumber><h4>バンドル</h4><p>分割された多数のファイルを、少数のファイルにまとめる</p></Card>
        <Card><CardNumber>3</CardNumber><h4>最小化(minify)</h4><p>変数名を短くしたり空白を削ったりして、ファイルサイズを小さくする</p></Card>
      </CardGrid>
      <Analogy label="💡 たとえるなら">
        ビルドは料理の「仕込み」です。冷蔵庫にバラバラに入っている食材(ソースファイル)を、切って(トランスパイル)、まとめて盛り付けて(バンドル)、余分な部分を落として(最小化)、お客さんにすぐ出せる1皿の料理(本番用ファイル)に仕上げる工程です。
      </Analogy>

      <Heading num="05">Vite とは ― 開発時は爆速、本番はきちんとバンドル</Heading>
      <p>従来の代表的なビルドツール(webpackなど)は、開発中にコードを1文字変更しただけでも、アプリ全体を毎回バンドルし直す必要があり、アプリが大きくなるほど開発サーバーの起動や更新が遅くなる問題がありました。<Term>Vite</Term>は、この問題を解決するために作られたツールです。</p>
      <p>Viteの開発サーバーは、最近のブラウザが標準で対応している<Term>ESM(ES Modules)</Term>という仕組みを利用し、事前にアプリ全体をバンドルせず、ブラウザが必要とするファイルだけをその都度変換して返します。そのため、アプリの規模が大きくなっても開発サーバーの起動はほぼ一瞬です。一方、本番用に配布するときは、ファイル数が多いままだと読み込みが非効率なため、Viteは内部で<code>Rollup</code>というツールを使ってきちんとバンドル・最小化を行います。</p>
      <Diagram caption="Viteは開発時に全体バンドルを待たず、必要なファイルだけをその場で返す">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <text x={160} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">従来のバンドラー(開発時)</text>
          <rect x={30} y={40} width={260} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={65} fill="#f2f2f2" fontSize="11" textAnchor="middle">全ファイルを事前にまとめてバンドル</text>
          <rect x={30} y={95} width={260} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={120} fill="#f2f2f2" fontSize="11" textAnchor="middle">完成後にようやくサーバー起動</text>
          <text x={160} y={158} fill="#9a9a9a" fontSize="10" textAnchor="middle">アプリが大きいほど待ち時間が伸びる</text>

          <text x={480} y={22} fill="#9a9a9a" fontSize="12" textAnchor="middle">Vite(開発時)</text>
          <rect x={350} y={40} width={260} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={480} y={65} fill="#f2f2f2" fontSize="11" textAnchor="middle">サーバーを即座に起動</text>
          <rect x={350} y={95} width={260} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={480} y={120} fill="#f2f2f2" fontSize="11" textAnchor="middle">ブラウザが要求したファイルだけ変換して返す</text>
          <text x={480} y={158} fill="#9a9a9a" fontSize="10" textAnchor="middle">アプリが大きくても起動時間はほぼ一定</text>
        </svg>
      </Diagram>

      <p>実際にViteでプロジェクトを始めるときの流れは、次のようにとてもシンプルです。</p>
      <Steps>
        <li><strong><code>npm create vite@latest</code></strong>雛形となるプロジェクトを生成する</li>
        <li><strong><code>cd my-app</code></strong>作成されたプロジェクトのフォルダに移動する</li>
        <li><strong><code>npm install</code></strong>package.jsonに書かれた依存パッケージをインストールする</li>
        <li><strong><code>npm run dev</code></strong>Viteの開発サーバーを起動し、ブラウザで確認する</li>
      </Steps>

      <Heading num="まとめ">道具の役割を切り分けて覚える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>npm</h4><p>Node.js標準のパッケージ管理ツール。事実上の業界標準。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>pnpm</h4><p>共有ストア+リンクの仕組みで、ディスク容量とインストール時間を節約する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ビルド</h4><p>開発者向けのコードを、ブラウザが実行しやすい形に変換する工程全体。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Vite</h4><p>開発時は爆速なESM配信、本番はRollupできちんとバンドルするツール。</p></Card>
      </CardGrid>
      <p>ターミナル・シェルでコマンドを実行し、npmやpnpmでパッケージを取り込み、Viteで実行可能な形に組み立てる ― これで、実際にコードを書き始める土台がほぼ整いました。次のページ「<Link href="/dev/environments">環境の全体像</Link>」では、ここまで何度も出てきた「環境」という言葉自体を整理します。</p>

      <Heading num="発展">パッケージとビルドをもう一段深く</Heading>
      <IndexGrid>
        <IndexCard href="/dev/tooling/deps" num="01" title="依存とバージョン">
          semverの範囲指定、ロックファイルが固定するもの、依存の種類と更新戦略
        </IndexCard>
        <IndexCard href="/dev/tooling/security" num="02" title="依存の脆弱性とサプライチェーン">
          SCA・SBOM・インストールスクリプト・出所の検証
        </IndexCard>
        <IndexCard href="/dev/tooling/build" num="03" title="ビルドの中身">
          トランスパイル・モジュール形式・ツリーシェイキング・ソースマップ
        </IndexCard>
        <IndexCard href="/dev/tooling/monorepo" num="04" title="モノレポとワークスペース">
          1リポジトリに複数プロジェクト。変更検出とキャッシュで成立させる
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/workspace" tag="開発">開発環境</RelatedLink>
                    <RelatedLink href="/dev/environments" tag="開発">環境の全体像</RelatedLink>
                    <RelatedLink href="/dev" tag="開発">開発基盤 一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
