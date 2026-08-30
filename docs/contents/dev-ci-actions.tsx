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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "GitHub Actionsの実務",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>GitHub Actionsの実務 ― 権限・再利用・信頼できる自動化</h1>
        <Lead>
          CIは「動けばいい」で始まりますが、ワークフローが増えるとコピーが散乱し、権限が緩み、外部アクションが野放しになります。CIは<strong>本番の認証情報を持ってソースコードを触る仕組み</strong>である以上、攻撃されれば全部持っていかれます。ここでは、増えても壊れないワークフローの組み方を扱います。
        </Lead>
      </Hero>

      <p>基本形(<code>on</code> / <code>jobs</code> / キャッシュ / 品質ゲート)は「<Link href="/dev/ci">CI/CDパイプライン</Link>」で扱いました。このページはその先 ― トリガーの選び分け、ジョブ間の受け渡し、再利用、そして権限とサプライチェーンです。</p>

      <Heading num="01">トリガーを選び分ける</Heading>
      <p>同じ検査でも「いつ走らせるか」で費用と安全性が変わります。</p>
      <table>
        <tbody>
          <tr><th>イベント</th><th>使いどころ</th><th>注意</th></tr>
          <tr><td className="hl"><code>pull_request</code></td><td>PRごとの検査。基本形</td><td>forkからのPRでは<strong>秘密情報が渡されない</strong>(意図的な安全設計)</td></tr>
          <tr><td className="hl"><code>push</code>(main)</td><td>マージ後の本流の検証、デプロイ</td><td>PRで通っても、マージ結果では壊れることがある</td></tr>
          <tr><td className="hl"><code>workflow_dispatch</code></td><td>手動実行。入力パラメータを受け取れる</td><td>本番デプロイの手動トリガーに向く</td></tr>
          <tr><td className="hl"><code>schedule</code></td><td>夜間の重いE2E、依存の脆弱性スキャン</td><td>時刻はUTC。混雑時は遅延する</td></tr>
          <tr><td className="hl"><code>release</code> / タグ push</td><td>リリース成果物のビルドと配布</td><td>タグ名をバージョンとして扱う設計にする</td></tr>
          <tr><td className="hl"><code>pull_request_target</code></td><td>fork PRでも秘密情報が要る特殊用途</td><td><strong>危険</strong>。ベース側の権限でPRのコードを扱うため、原則避ける</td></tr>
        </tbody>
      </table>
      <p>加えて <code>paths</code> フィルタで「関係するファイルが変わったときだけ走らせる」と、モノレポでは実行時間を大幅に削れます。ただしブランチ保護の必須チェックと組み合わせると、<strong>スキップされた検査が永遠に完了しない</strong>状態になり得るため、その場合は「常に走って中身を判断する」形にします。</p>

      <Heading num="02">ジョブ間で成果物と値を受け渡す</Heading>
      <p>ジョブはそれぞれ別のマシンで動きます。同じジョブ内でしかファイルは共有されないため、ビルド結果を後段へ渡すには明示的な受け渡しが必要です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: \${{ steps.meta.outputs.version }}     # 後段へ値を渡す
    steps:
      - uses: actions/checkout@v4
      - id: meta
        run: echo "version=\$(git rev-parse --short HEAD)" >> "\$GITHUB_OUTPUT"
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4              # 成果物を保存する
        with:
          name: dist
          path: out/

  deploy:
    needs: build                                     # build 成功後にだけ走る
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: out }
      - run: ./scripts/deploy.sh out \${{ needs.build.outputs.version }}`}</code>
      </pre>
      <p>ここで重要なのは<strong>各環境で作り直さない</strong>ことです。ステージングと本番で別々にビルドすると、テストしたものと出したものが別物になります。1度ビルドした成果物を昇格させていくのが原則です。</p>

      <Heading num="03">マトリクスで組み合わせを回す</Heading>
      <p>複数のバージョンやOSで同じ検査を行う場合、<code>matrix</code> で並列展開します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`strategy:
  fail-fast: false          # 1つ落ちても他を最後まで走らせる(原因の切り分けに有用)
  matrix:
    node: [20, 22, 24]
    os: [ubuntu-latest, windows-latest]
    exclude:
      - { node: 20, os: windows-latest }`}</code>
      </pre>
      <p>組み合わせは掛け算で増えるため、費用も掛け算で増えます。<strong>PRでは代表1構成、mainやスケジュール実行で全構成</strong>のように段階を分けるのが実務的です。</p>

      <Heading num="04">再利用 ― コピーを増やさない</Heading>
      <p>ワークフローが10個を超えると、同じ手順のコピーが散らばり、修正漏れが起きます。再利用の手段は2つあります。</p>
      <table>
        <tbody>
          <tr><th></th><th>再利用可能ワークフロー</th><th>複合アクション</th></tr>
          <tr><td className="hl">単位</td><td>ジョブ全体(<code>workflow_call</code>)</td><td>ステップの束(<code>action.yml</code>)</td></tr>
          <tr><td className="hl">呼び方</td><td><code>uses:</code> をジョブに書く</td><td><code>uses:</code> をステップに書く</td></tr>
          <tr><td className="hl">向く用途</td><td>「検査一式」「デプロイ一式」など工程まるごと</td><td>「セットアップ+依存インストール」など前処理</td></tr>
          <tr><td className="hl">秘密情報</td><td><code>secrets: inherit</code> で引き渡せる</td><td>入力として渡す</td></tr>
        </tbody>
      </table>
      <p>共通ワークフローは専用リポジトリに置き、タグで参照すると変更の影響範囲を制御できます。<strong>共通化しすぎて何が起きているか読めなくなる</strong>のも失敗なので、分岐だらけの巨大な共通ワークフローは避けます。</p>

      <Heading num="05">権限は既定で最小にする</Heading>
      <p>ワークフローに渡される <code>GITHUB_TOKEN</code> は、既定でリポジトリへの広い権限を持ちうる資格情報です。<strong>ワークフローの先頭で最小権限を宣言する</strong>のが基本です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`permissions:
  contents: read            # 既定を読み取りのみに絞る

jobs:
  release:
    permissions:
      contents: write       # 必要なジョブにだけ、必要な権限を足す
      id-token: write       # OIDC でクラウドへ認証する場合`}</code>
      </pre>
      <p>権限を絞る理由は、<strong>取り込んだ外部アクションやテストコードがそのトークンを使えてしまう</strong>からです。CIは常に「実行するコード全部にその権限を渡している」と考えます。</p>

      <Heading num="06">クラウドの認証は長期キーをやめる</Heading>
      <p>AWSやGoogle Cloudへデプロイするとき、アクセスキーをシークレットに置く方式は、漏洩時の被害が大きく、失効も手間です。現在の標準は<Term>OIDC(OpenID Connect)</Term>による短命な認証です。</p>
      <Steps>
        <li>クラウド側に「このリポジトリの、このブランチからの実行を信頼する」ロールを作る</li>
        <li>ワークフローに <code>id-token: write</code> 権限を与える</li>
        <li>実行時にGitHubが発行する署名付きトークンをクラウドが検証し、<strong>数十分だけ有効な資格情報</strong>を返す</li>
      </Steps>
      <p>これにより、保存される長期キーが存在しなくなります。信頼条件(subject)にブランチや環境を含めれば、「mainからの実行だけが本番にデプロイできる」という制約も表現できます。認証の背景は「<Link href="/security/identity">認証プロトコルの変遷</Link>」を参照してください。</p>

      <Heading num="07">環境と承認 ― 本番だけ手を挟む</Heading>
      <p>GitHubの<Term>Environment</Term>は、デプロイ先ごとに秘密情報と保護ルールを束ねる仕組みです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>環境ごとの秘密情報</h4><p>staging と production で別の値を持たせ、取り違えを防ぐ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>必須レビュー</h4><p>本番デプロイのジョブだけ、指定した人の承認を待たせる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ブランチ制限</h4><p>production 環境は main からの実行のみ許可する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>デプロイ履歴</h4><p>いつ誰がどのコミットを出したかが記録として残る。</p></Card>
      </CardGrid>
      <p>「本番だけ承認を挟む」は、自動化と統制の折衷として現実的です。すべてに承認を付けると形骸化し、誰も中身を見ずに押すようになります。</p>

      <Heading num="08">サプライチェーンを固める</Heading>
      <p><code>uses: some/action@v3</code> のタグは<strong>動く参照</strong>です。作者(または乗っ取った攻撃者)がタグを付け替えれば、次の実行から別のコードが動きます。</p>
      <table>
        <tbody>
          <tr><th>対策</th><th>内容</th></tr>
          <tr><td className="hl">コミットSHAで固定</td><td><code>uses: some/action@a1b2c3...</code>。更新はツール(Dependabot)に任せる</td></tr>
          <tr><td className="hl">許可リスト</td><td>組織設定で、使用可能なアクションを制限する</td></tr>
          <tr><td className="hl">秘密情報を渡さない</td><td>外部アクションを使うジョブに、本番の資格情報を持ち込まない</td></tr>
          <tr><td className="hl">ログのマスク</td><td>秘密情報は自動マスクされるが、加工して出力すると漏れる(base64化など)</td></tr>
          <tr><td className="hl">fork PRの扱い</td><td>秘密情報を渡さない既定を維持し、必要なら承認制にする</td></tr>
        </tbody>
      </table>
      <Aside label="CIは最も価値の高い攻撃対象">
        CIランナーはソースコード全体と本番の資格情報に触れられます。「テストを走らせるだけの場所」ではありません。依存パッケージの<Link href="/dev/tooling/security">サプライチェーン対策</Link>と同じ厳しさで扱ってください。
      </Aside>

      <Heading num="09">遅い・落ちるCIを直す</Heading>
      <table>
        <tbody>
          <tr><th>症状</th><th>よくある原因と対処</th></tr>
          <tr><td className="hl">毎回10分以上かかる</td><td>依存のキャッシュ未設定、ジョブが直列。並列化と <code>needs</code> の見直し</td></tr>
          <tr><td className="hl">たまに落ちる(フレーキー)</td><td>時刻・順序・外部依存に依存したテスト。再実行で誤魔化さず原因を特定する</td></tr>
          <tr><td className="hl">ローカルでは通る</td><td>環境変数・タイムゾーン・ファイル名の大小文字。コンテナで揃える</td></tr>
          <tr><td className="hl">ログが読めない</td><td>ステップを細かく分け、失敗時に <code>if: failure()</code> で診断情報を出す</td></tr>
          <tr><td className="hl">原因が分からない</td><td><code>act</code> やデバッグ用の <code>workflow_dispatch</code> で手元再現。<code>tmate</code> 等の接続は権限に注意</td></tr>
        </tbody>
      </table>
      <p>フレーキーテストの放置は、CIそのものの信頼を壊します。「赤でも再実行すれば通る」が常態化すると、本物の失敗まで無視されるようになります(「<Link href="/test/strategy">品質戦略とテストピラミッド</Link>」)。</p>

      <Heading num="まとめ">自動化には権限が伴う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1度ビルドして昇格させる</h4><p>環境ごとに作り直さない。成果物と値はジョブ間で受け渡す。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>最小権限とOIDC</h4><p>既定は読み取り。長期キーを置かず、短命な資格情報を使う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>依存はSHA固定</h4><p>外部アクションは動く参照。CIは最も狙われる場所だと考える。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/ci/deploy" tag="実装">デプロイ戦略とロールバック</RelatedLink>
            <RelatedLink href="/dev/tooling/security" tag="実装">依存の脆弱性とサプライチェーン</RelatedLink>
            <RelatedLink href="/cloud/aws/cicd/codepipeline" tag="クラウド">CodePipeline</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
