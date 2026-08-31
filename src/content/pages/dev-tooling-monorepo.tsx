import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "モノレポとワークスペース" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>モノレポとワークスペース ― 1つのリポジトリに複数のプロジェクト</h1>
        <Lead>
          フロントエンドとAPIとバッチを、別々のリポジトリにするか1つにまとめるか。この選択は好みではなく、<Term>変更をまたぐときの手間</Term>と<Term>CIの複雑さ</Term>のトレードオフです。共有の型を変えるたびに3つのリポジトリでPRを出す苦痛を知っていれば、モノレポの動機はすぐ理解できます。
        </Lead>
      </Hero>

      <Heading num="01">ポリレポとモノレポ</Heading>

      <DiagramFrame
        slug="dev-tooling-monorepo"
        aspect="640 / 300"
        caption="共有する型を変更したときの手間の比較。上段のポリレポでは、型のリポジトリを直して公開し、それを使うWebとAPIでそれぞれ版を上げるため、3つのPRと公開・取り込みの順序管理が必要になる。下段のモノレポでは3つが同じリポジトリにあるため、1つのPRで完結し、CIが全体をその場で検証できる。ただし変更に関係する部分だけを実行する仕組みが無いと、パッケージが増えるほどCIが破綻する。"
      />

      <table>
        <thead>
          <tr><th></th><th>ポリレポ(分割)</th><th>モノレポ(統合)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">横断する変更</td>
            <td>リポジトリごとにPR。順序と互換性の調整が要る</td>
            <td>1つのPRで完結する</td>
          </tr>
          <tr>
            <td className="hl">共有コード</td>
            <td>パッケージとして公開・版管理する</td>
            <td>直接参照できる</td>
          </tr>
          <tr>
            <td className="hl">CI</td>
            <td>単純(1リポジトリ = 1パイプライン)</td>
            <td>変更検出が必須。全部を毎回ビルドすると破綻する</td>
          </tr>
          <tr>
            <td className="hl">権限</td>
            <td>リポジトリ単位で明確に分けられる</td>
            <td>ディレクトリ単位の担当設定で分ける必要がある</td>
          </tr>
          <tr>
            <td className="hl">向いている状況</td>
            <td>独立性の高い製品、外部公開、チームが完全に別</td>
            <td>同じ製品を構成する複数アプリ、型やUIを共有する</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ポリレポは「部署ごとに別のビルに入る」、モノレポは「同じフロアで席を分ける」構成です。別のビルなら独立性は高い一方、合同で何かを変えるたびに行き来が発生します。同じフロアなら相談は一瞬ですが、席のルールと騒音対策(CIと権限の設計)が必要になります。
      </Analogy>

      <Heading num="02">ワークスペース ― 依存を1か所で管理する</Heading>
      <p>
        パッケージ管理ツールには、1つのリポジトリで複数パッケージを扱う<Term>ワークスペース</Term>機能があります。
      </p>

      <pre>
        <code>{`# pnpm-workspace.yaml
packages:
  - "apps/*"      # web, api, batch
  - "packages/*"  # ui, config, types

# apps/web/package.json ― 社内パッケージをそのまま依存に書ける
{
  "dependencies": {
    "@acme/ui": "workspace:*",
    "@acme/types": "workspace:*"
  }
}`}</code>
      </pre>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>単一のロックファイル</h4>
          <p>
            全パッケージの依存を一括で解決し、<Link href="/dev/tooling-deps">版のずれ</Link>を防ぎます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>社内パッケージのリンク</h4>
          <p>公開せずに参照でき、編集が即座に反映されます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>一括コマンド</h4>
          <p>
            全パッケージに対して、テストやビルドをまとめて実行できます。
          </p>
        </Card>
      </CardGrid>

      <Heading num="03">タスクランナー ― 全部ビルドしない</Heading>
      <p>
        モノレポの成否を決めるのは<Term>変更に関係する部分だけを実行できるか</Term>です。パッケージが20個あるのに毎回全部テストしていては、CIが何十分もかかります。
      </p>

      <table>
        <thead>
          <tr><th>仕組み</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">依存グラフ</td>
            <td>パッケージ間の依存を解析し、正しい順序で実行する</td>
          </tr>
          <tr>
            <td className="hl">影響範囲の特定</td>
            <td>変更されたパッケージと、それに依存するものだけを対象にする</td>
          </tr>
          <tr>
            <td className="hl">キャッシュ</td>
            <td>入力が同じなら、前回の結果を再利用する</td>
          </tr>
          <tr>
            <td className="hl">共有キャッシュ</td>
            <td>CIと開発者の間で結果を共有し、他人のビルド結果を使う</td>
          </tr>
        </tbody>
      </table>

      <p>
        専用のツールもありますが、変更ファイルの一覧から対象パッケージを絞る簡易な実装から始めることもできます。
      </p>

      <Heading num="04">CIをモノレポ向けに組む</Heading>

      <Steps>
        <li>変更されたパスを検出し、影響を受けるパッケージを決める</li>
        <li>そのパッケージだけを検査する</li>
        <li>共有パッケージが変わった場合は、依存している全アプリを対象にする</li>
        <li>デプロイも変更のあったアプリだけ実行する</li>
        <li>必須チェックは「スキップされても完了扱いになる」形にする</li>
      </Steps>

      <Aside label="落とし穴 ― スキップと必須チェック">
        パスの条件で実行そのものを止めると、そのチェックは「完了していない」状態のままになり、PRがマージできなくなることがあります。<Term>常に起動して中で判断し、対象外なら成功で終わる</Term>ジョブにしておくと、この問題を避けられます(<Link href="/dev/ci-actions">GitHub Actionsの実務</Link>)。
      </Aside>

      <Heading num="05">バージョニングとリリース</Heading>

      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>向いている場合</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">固定バージョン</td>
            <td>全パッケージが同じ番号で同時にリリースされる</td>
            <td>一体の製品として出す</td>
          </tr>
          <tr>
            <td className="hl">独立バージョン</td>
            <td>パッケージごとに番号を管理する</td>
            <td>外部にも公開するライブラリ群</td>
          </tr>
          <tr>
            <td className="hl">バージョンなし</td>
            <td>アプリだけをデプロイし、社内パッケージには番号を付けない</td>
            <td>公開しない社内アプリのみの構成</td>
          </tr>
        </tbody>
      </table>

      <p>
        3つ目が最も単純で、Webサービスのモノレポでは十分なことが多いでしょう。外部公開がある場合は、変更内容から版を決める仕組みを入れます(<Link href="/dev/git-release">バージョニングとリリース</Link>)。
      </p>

      <Heading num="06">大きくなったリポジトリへの対処</Heading>

      <table>
        <thead>
          <tr><th>問題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">取得が重い</td>
            <td>必要な履歴・オブジェクトだけを取る部分クローンを使う</td>
          </tr>
          <tr>
            <td className="hl">作業ツリーが巨大</td>
            <td>必要なディレクトリだけを展開する</td>
          </tr>
          <tr>
            <td className="hl">誰がどこを見るか不明</td>
            <td>ディレクトリごとにレビュー担当を設定する</td>
          </tr>
          <tr>
            <td className="hl">巨大ファイル</td>
            <td>リポジトリに置かず、専用の保管先へ</td>
          </tr>
          <tr>
            <td className="hl">検索や補完が遅い</td>
            <td>エディタの対象を絞り、索引の設定を見直す</td>
          </tr>
        </tbody>
      </table>

      <p>
        なお、別リポジトリを取り込む仕組みは「モノレポの代用」としては勧められません。参照するコミットの更新を手動で行う必要があり、更新漏れによる不整合が起きやすいためです。
      </p>

      <Heading num="まとめ">選択は手間の置き場所</Heading>
      <p>
        同じ型やUIを複数アプリで共有している、APIとフロントを同時に変えることが多い ―
        こうした状況ではモノレポの利点が勝ちます。逆に、独立性が高くチームも完全に別なら、ポリレポの単純さが勝ちます。<Term>横断変更の手間を取るか、CI設計の手間を取るか</Term>の選択だと考えると、判断しやすくなります。
      </p>

      <DocsFooter href="/dev/tooling-monorepo" />
    </DocsPage>
  );
}
