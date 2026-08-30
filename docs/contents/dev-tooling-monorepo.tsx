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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "モノレポとワークスペース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>モノレポとワークスペース ― 1つのリポジトリに複数のプロジェクト</h1>
        <Lead>
          フロントエンドとAPIとバッチを、別々のリポジトリにするか1つにまとめるか。この選択は「好み」ではなく、<strong>変更をまたぐときの手間</strong>と<strong>CIの複雑さ</strong>のトレードオフです。共有の型定義を変えるたびに3つのリポジトリでPRを出す苦痛を知っている人なら、モノレポの動機はすぐ理解できるはずです。
        </Lead>
      </Hero>

      <Heading num="01">ポリレポとモノレポ</Heading>
      <table>
        <tbody>
          <tr><th></th><th>ポリレポ(分割)</th><th>モノレポ(統合)</th></tr>
          <tr><td className="hl">横断する変更</td><td>リポジトリごとにPR。順序と互換性の調整が要る</td><td><strong>1つのPRで完結する</strong></td></tr>
          <tr><td className="hl">共有コード</td><td>パッケージとして公開・バージョン管理する</td><td>直接参照できる</td></tr>
          <tr><td className="hl">CI</td><td>単純(1リポジトリ=1パイプライン)</td><td><strong>変更検出が必須</strong>。全部を毎回ビルドすると破綻する</td></tr>
          <tr><td className="hl">権限</td><td>リポジトリ単位で明確に分けられる</td><td>CODEOWNERSなどで分ける必要がある</td></tr>
          <tr><td className="hl">向いている状況</td><td>独立性の高い製品、外部公開、チームが完全に別</td><td>同じ製品を構成する複数アプリ、型やUIを共有する</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        ポリレポは「部署ごとに別のビルに入る」、モノレポは「同じフロアで席を分ける」構成です。別のビルなら独立性は高い一方、合同で何かを変えるたびに行き来が発生します。同じフロアなら相談は一瞬ですが、席のルールと騒音対策(=CIと権限の設計)が必要になります。
      </Analogy>

      <Heading num="02">ワークスペース ― 依存を1か所で管理する</Heading>
      <p>npm / pnpm / yarn には、1つのリポジトリで複数パッケージを扱う<Term>ワークスペース</Term>機能があります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# pnpm-workspace.yaml
packages:
  - "apps/*"          # web, api, batch
  - "packages/*"      # ui, config, types

# apps/web/package.json ― 社内パッケージをそのまま依存に書ける
{
  "dependencies": {
    "@acme/ui": "workspace:*",
    "@acme/types": "workspace:*"
  }
}`}</code>
      </pre>
      <p>ワークスペースが提供するのは主に3つです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>単一のロックファイル</h4><p>全パッケージの依存を一括で解決し、版のずれを防ぐ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>社内パッケージのリンク</h4><p>公開せずに <code>@acme/ui</code> として参照できる。編集が即座に反映される。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>一括コマンド</h4><p>全パッケージに対してテストやビルドをまとめて実行できる。</p></Card>
      </CardGrid>

      <Heading num="03">タスクランナー ― 全部ビルドしない</Heading>
      <p>モノレポの成否を決めるのは<strong>「変更に関係する部分だけを実行できるか」</strong>です。パッケージが20個あるのに毎回全部テストしていては、CIが何十分もかかります。</p>
      <table>
        <tbody>
          <tr><th>仕組み</th><th>内容</th></tr>
          <tr><td className="hl">依存グラフ</td><td>パッケージ間の依存を解析し、正しい順序で実行する</td></tr>
          <tr><td className="hl">影響範囲の特定</td><td>変更されたパッケージと、それに依存するものだけを対象にする</td></tr>
          <tr><td className="hl">キャッシュ</td><td>入力(ファイル内容+設定)が同じなら、前回の結果を再利用する</td></tr>
          <tr><td className="hl">リモートキャッシュ</td><td>CIと開発者間でキャッシュを共有し、他人のビルド結果を使う</td></tr>
        </tbody>
      </table>
      <p>Turborepo・Nx・Bazel などがこの役割を担います。Gitの側では <code>git diff --name-only origin/main</code> で変更ファイルを取り、対象パッケージを絞る簡易な実装から始めることもできます。</p>

      <Heading num="04">CIをモノレポ向けに組む</Heading>
      <Steps>
        <li>変更されたパスを検出し、影響を受けるパッケージを決める</li>
        <li>そのパッケージだけを lint / 型検査 / テストする</li>
        <li>共有パッケージが変わった場合は、<strong>依存している全アプリを対象にする</strong></li>
        <li>デプロイも変更のあったアプリだけ実行する</li>
        <li>ブランチ保護の必須チェックは「スキップされても完了扱いになる」形にする</li>
      </Steps>
      <Aside label="落とし穴 ― スキップと必須チェック">
        <code>paths</code> フィルタで実行を止めると、そのチェックは「完了していない」状態のままになり、PRがマージできなくなることがあります。<strong>常に起動して中で判断し、対象外なら成功で終わる</strong>ジョブにしておくと、この問題を避けられます(「<Link href="/dev/ci/actions">GitHub Actionsの実務</Link>」)。
      </Aside>

      <Heading num="05">バージョニングとリリース</Heading>
      <p>モノレポでは、複数パッケージの版をどう扱うかを決める必要があります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>内容</th><th>向いている場合</th></tr>
          <tr><td className="hl">固定バージョン</td><td>全パッケージが同じ番号で同時にリリースされる</td><td>一体の製品として出す</td></tr>
          <tr><td className="hl">独立バージョン</td><td>パッケージごとに番号を管理する</td><td>外部にも公開するライブラリ群</td></tr>
          <tr><td className="hl">バージョンなし</td><td>アプリだけをデプロイし、社内パッケージには番号を付けない</td><td>公開しない社内アプリのみの構成</td></tr>
        </tbody>
      </table>
      <p>3つ目が最も単純で、Webサービスのモノレポでは十分なことが多いでしょう。外部公開がある場合は、変更内容から版を決めてリリースする仕組み(Changesets など)を入れます(「<Link href="/dev/git/release">バージョニングとリリース</Link>」)。</p>

      <Heading num="06">大きくなったリポジトリへの対処</Heading>
      <table>
        <tbody>
          <tr><th>問題</th><th>対処</th></tr>
          <tr><td className="hl">cloneが重い</td><td><code>--filter=blob:none</code> の部分クローン、<code>--depth</code> の浅いクローン</td></tr>
          <tr><td className="hl">作業ツリーが巨大</td><td>sparse-checkout で必要なディレクトリだけ展開する</td></tr>
          <tr><td className="hl">誰がどこを見るか不明</td><td>CODEOWNERS でディレクトリごとにレビュー担当を設定する</td></tr>
          <tr><td className="hl">巨大ファイル</td><td>Git LFS、またはリポジトリに置かずオブジェクトストレージへ</td></tr>
          <tr><td className="hl">検索や補完が遅い</td><td>エディタの対象を絞る。ツール側のインデックス設定を見直す</td></tr>
        </tbody>
      </table>
      <p>なお、別リポジトリを取り込む <code>submodule</code> / <code>subtree</code> は「モノレポの代用」としては勧められません。submodule は参照するコミットの更新を手動で行う必要があり、更新漏れによる不整合が起きやすいためです。</p>

      <Heading num="07">どちらを選ぶか</Heading>
      <p>判断は、次の問いにいくつ当てはまるかで決めます。</p>
      <table>
        <tbody>
          <tr><th>問い</th><th>Yesが多いなら</th></tr>
          <tr><td className="hl">同じ型やUIを複数アプリで共有しているか</td><td rowSpan={4} className="hl"><strong>モノレポ</strong></td></tr>
          <tr><td className="hl">APIとフロントを同時に変えることが多いか</td></tr>
          <tr><td className="hl">同じチームが全体を触るか</td></tr>
          <tr><td className="hl">リリースを揃えたいか</td></tr>
          <tr><td className="hl">外部の別チームに公開・提供するか</td><td rowSpan={3} className="hl"><strong>ポリレポ</strong></td></tr>
          <tr><td className="hl">技術スタックが根本的に違うか</td></tr>
          <tr><td className="hl">リポジトリ単位で権限を厳密に分けたいか</td></tr>
        </tbody>
      </table>
      <p>迷ったら、<strong>小規模なうちはモノレポ</strong>が扱いやすい選択です。分割は後からでもできますが、散らばったリポジトリを統合するほうが手間は大きくなります。</p>

      <Heading num="まとめ">統合の利点は、CIの工夫で買う</Heading>
      <p>モノレポの本質的な利点は「横断する変更が1つのPRで完結すること」です。その代償として、<strong>変更検出とキャッシュを備えたCI</strong>が必須になります。ワークスペースで依存を束ね、タスクランナーで実行範囲を絞る ― この2つを最初に用意できるなら、モノレポは強力な選択肢です。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/tooling/deps" tag="実装">依存とバージョン</RelatedLink>
            <RelatedLink href="/dev/ci/actions" tag="実装">GitHub Actionsの実務</RelatedLink>
            <RelatedLink href="/design/architecture/sys/modular-monolith" tag="設計">モジュラーモノリス</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
