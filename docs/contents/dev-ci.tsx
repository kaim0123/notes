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
  Diagram,
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CI/CDパイプライン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>CI/CDパイプライン ― 人間が繰り返さない</h1>
        <Lead>
          <Link href="/dev/git">Gitとブランチ戦略</Link>で「頻繁に統合する」ことの重要性を見ました。頻繁に統合するには、<strong>統合が壊れていないことを毎回確かめる仕組み</strong>が要ります。それが<Term>CI(継続的インテグレーション)</Term>です。ここでは実際にワークフローを書き、検査・ビルド・デプロイをつなぐパイプラインを組み立てます。<Link href="/dev/sdlc/deployment">導入と受入れ</Link>で扱った工程を、自動化として実装する回です。
        </Lead>
      </Hero>

      <Heading num="01">CIとCDは別のこと</Heading>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>継続的インテグレーション(CI)</Term></td><td>変更を頻繁にmainへ統合し、<strong>そのたびに自動で検査する</strong></td></tr>
          <tr><td className="hl"><Term>継続的デリバリー(CD)</Term></td><td>いつでもリリースできる状態を保つ。<strong>本番反映は人が判断する</strong></td></tr>
          <tr><td className="hl"><Term>継続的デプロイメント(CD)</Term></td><td>検査を通れば<strong>自動で本番へ出す</strong></td></tr>
        </tbody>
      </table>
      <p>目的は「自動化そのもの」ではありません。<strong>問題を早く小さく発見する</strong>ことです。1か月分の変更をまとめて検査すれば、失敗の原因は無数の候補から探すことになります。1コミットごとに検査すれば、原因は常に「いま入れた変更」に限定されます。</p>

      <Heading num="02">パイプラインの段階</Heading>
      <p>基本の並びは、<strong>速くて安いものを先に、遅くて高いものを後に</strong>です。早い段階で落ちれば、後続の時間を節約できます。</p>
      <Diagram caption="左ほど速く安い。落ちる可能性が高いものほど前に置く">
        <svg viewBox="0 0 540 120" xmlns="http://www.w3.org/2000/svg">
          {[
            { x: 15, label: "lint / format", sub: "数秒" },
            { x: 120, label: "型検査", sub: "十数秒" },
            { x: 225, label: "Unitテスト", sub: "数十秒" },
            { x: 330, label: "結合テスト", sub: "数分" },
            { x: 435, label: "ビルド/配備", sub: "数分" },
          ].map((s) => (
            <g key={s.x}>
              <rect x={s.x} y={35} width={92} height={44} rx="7" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
              <text x={s.x + 46} y={56} fill="#f2f2f2" fontSize="11" textAnchor="middle">{s.label}</text>
              <text x={s.x + 46} y={72} fill="#9a9a9a" fontSize="10" textAnchor="middle">{s.sub}</text>
            </g>
          ))}
          <path d="M107 57 l10 0 M212 57 l10 0 M317 57 l10 0 M422 57 l10 0" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={15} y={105} fill="#6a6a6a" fontSize="10">前段が落ちれば後段は走らせない。開発者への通知は早いほど価値が高い</text>
        </svg>
      </Diagram>

      <Heading num="03">GitHub Actionsで書く</Heading>
      <p>実際のワークフローを見ます。<code>.github/workflows/ci.yml</code>に置くと、指定したイベントで自動実行されます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`name: CI

on:
  pull_request:
  push:
    branches: [main]

# 同じPRに新しいpushが来たら、古い実行を打ち切る(無駄な時間を使わない)
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm          # 依存のダウンロードをキャッシュする
      - run: npm ci           # install ではなく ci(ロックファイルに厳密に従う)
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>on</code></td><td>実行のきっかけ。PR・push・スケジュール・手動</td></tr>
          <tr><td className="hl"><code>jobs</code></td><td>並列に走る単位。それぞれ独立した環境で動く</td></tr>
          <tr><td className="hl"><code>needs</code></td><td>ジョブ間の依存。前段が成功したときだけ走らせる</td></tr>
          <tr><td className="hl"><code>concurrency</code></td><td>重複実行の打ち切り。<strong>費用と待ち時間を減らす</strong></td></tr>
          <tr><td className="hl"><code>cache</code></td><td>依存の再ダウンロードを避ける</td></tr>
          <tr><td className="hl"><code>matrix</code></td><td>複数バージョン・複数OSでの並列実行</td></tr>
        </tbody>
      </table>
      <p><Link href="/dev/backend/test">DBを使うテスト</Link>には、サービスコンテナを併用します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready --health-interval 10s --health-retries 5
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run migrate            # 本番と同じ経路でスキーマを作る
        env: { DATABASE_URL: postgres://postgres:test@localhost:5432/postgres }
      - run: npm run test:integration
        env: { DATABASE_URL: postgres://postgres:test@localhost:5432/postgres }`}</code>
      </pre>

      <Heading num="04">速さを保つ</Heading>
      <p>CIは<strong>遅くなると価値が下がります</strong>。20分待たされるなら、開発者は結果を見ずに次の作業へ移り、失敗の発見が遅れます。<strong>10分以内</strong>を目安に保ちます。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ジョブを並列にする</td><td>lint・型検査・テストは互いに独立。同時に走らせる</td></tr>
          <tr><td className="hl">キャッシュ</td><td>依存のインストール、ビルド成果物、テストの中間結果</td></tr>
          <tr><td className="hl">変更検出</td><td>モノレポでは、変更のあったパッケージだけを検査する</td></tr>
          <tr><td className="hl">テストの分割</td><td>複数ジョブに分けて並列実行する</td></tr>
          <tr><td className="hl">段階を分ける</td><td>PRでは速い検査だけ、mainへのマージ後に重いE2Eを回す</td></tr>
        </tbody>
      </table>

      <Heading num="05">秘密情報の扱い</Heading>
      <p>CIは強い権限を持つため、<strong>攻撃対象として非常に価値が高い</strong>場所です。</p>
      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">長命な鍵を置かない</td><td><strong>OIDCによる一時credentialを使う</strong>。AWSやGCPは、GitHubの身元を検証して短命な権限を発行できる</td></tr>
          <tr><td className="hl">権限を最小に</td><td><code>permissions</code>を明示的に絞る。既定の広い権限に頼らない</td></tr>
          <tr><td className="hl">アクションを固定する</td><td>サードパーティのアクションは<strong>コミットハッシュで固定</strong>する。タグは書き換えられる</td></tr>
          <tr><td className="hl">フォークからのPR</td><td>秘密情報を渡さない。<code>pull_request_target</code>の使用は極めて慎重に</td></tr>
          <tr><td className="hl">ログへの出力</td><td>秘密情報は自動でマスクされるが、加工すると漏れる(Base64化など)</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ サプライチェーン">
        CIは、依存ライブラリのインストールスクリプトを<strong>そのまま実行します</strong>。侵害されたパッケージが1つ混ざれば、CIの環境変数(=本番の鍵)がそのまま盗まれます。ロックファイルの固定、<code>npm audit</code>や依存の自動更新、そして<strong>そもそもCIに本番の長命な鍵を置かない</strong>ことが対策になります。
      </Aside>

      <Heading num="06">品質ゲート ― 通さない条件を決める</Heading>
      <p>検査は、<strong>失敗したらマージできない</strong>ようにして初めて意味を持ちます。GitHubのブランチ保護で必須チェックに指定します。</p>
      <table>
        <thead>
          <tr><th>ゲート</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">lint・型・テスト</td><td>基本。<strong>警告を許容すると必ず形骸化する</strong></td></tr>
          <tr><td className="hl">カバレッジ</td><td>絶対値より<strong>低下しないこと</strong>を条件にする</td></tr>
          <tr><td className="hl"><Link href="/dev/frontend/perf">バンドルサイズ</Link></td><td>増加をPRに表示し、閾値を超えたら落とす</td></tr>
          <tr><td className="hl">脆弱性スキャン</td><td>依存の既知脆弱性、秘密情報の混入検出</td></tr>
          <tr><td className="hl"><Link href="/dev/backend/api/versioning">API契約の差分</Link></td><td>破壊的変更の検出</td></tr>
          <tr><td className="hl">レビュー承認</td><td>人による確認。自動化で代替しない部分</td></tr>
        </tbody>
      </table>

      <Heading num="07">同じ成果物を昇格させる</Heading>
      <p>デプロイの設計で最も重要な原則です。<strong>環境ごとにビルドし直してはいけません。</strong></p>
      <table>
        <thead>
          <tr><th></th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">✗ 環境ごとにビルド</td><td>ステージングで検証したものと、本番に出すものが<strong>別のバイナリ</strong>になる</td></tr>
          <tr><td className="hl">○ 1度ビルドして昇格</td><td>同じイメージを<code>dev → stg → prod</code>と<strong>タグを付け替えて進める</strong></td></tr>
        </tbody>
      </table>
      <p>環境ごとの違いは、ビルド時ではなく<strong>実行時の設定</strong>(環境変数)で吸収します。<Link href="/dev/environments">環境の全体像</Link>と<Link href="/dev/dotenv">.envと.gitignore</Link>で見た分離が、ここで効いてきます。「ステージングでは動いたのに本番で動かない」の原因の多くは、この原則の違反です。</p>
      <p>デプロイの方式(ブルーグリーン、カナリア、ローリング)と、その前提となる<Link href="/dev/backend/ops/lifecycle">起動と停止</Link>の作法は、<Link href="/ops/deploy">デプロイ戦略</Link>で扱います。あわせて、<strong>ロールバックの手順を最初に用意する</strong>こと ― 戻せないデプロイは、デプロイではなく賭けです。</p>

      <Heading num="08">壊れたら止める</Heading>
      <p>最後に文化の話です。<strong>mainが壊れている状態を放置しない</strong>のがCIの前提です。</p>
      <table>
        <thead>
          <tr><th>規律</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">mainが赤いなら最優先で直す</td><td>他の全員が「自分の変更のせいか」を判断できなくなる</td></tr>
          <tr><td className="hl">不安定なテストは即座に対処</td><td>「再実行すれば通る」を許すと、本物の失敗も無視されるようになる</td></tr>
          <tr><td className="hl">CIをスキップしない</td><td>「今回だけ」が常態化する</td></tr>
          <tr><td className="hl">失敗の原因が分かる出力にする</td><td>ログを読んでも分からない失敗は、無視される</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        CIは、工場の製造ラインに置く検査工程です。完成品を出荷前にまとめて検査するより、各工程の直後に検査する方が、不良の原因を特定しやすく、手戻りも小さくて済みます。そして最も重要なのは、<strong>検査で不合格が出たらラインを止める</strong>という規律です。「不合格だが後で直す」と流し続ければ、検査工程は存在するだけで機能しなくなります。赤いランプが点いたまま誰も気にしない工場は、ランプの無い工場と変わりません。
      </Analogy>

      <Heading num="まとめ">早く落とし、同じものを進める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>安い検査を先に</h4><p>lint→型→Unit→結合。10分以内を保たないと、結果が読まれなくなる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>長命な鍵を置かない</h4><p>OIDCで短命な権限を発行し、権限は最小に、アクションはハッシュで固定する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ビルドは1度だけ</h4><p>同じ成果物を環境間で昇格させる。差異は実行時の設定で吸収する。</p></Card>
      </CardGrid>
      <p>これで開発の土台が揃いました。実際の運用工程は<Link href="/ops/deploy">デプロイ戦略</Link>や<Link href="/infra/monitoring">監視</Link>のセクションへ続きます。</p>

      <Heading num="発展">CI/CDをもう一段深く</Heading>
      <IndexGrid>
        <IndexCard href="/dev/ci/actions" num="01" title="GitHub Actionsの実務">
          トリガーの選び分け、成果物の受け渡し、再利用、最小権限とOIDC、サプライチェーン
        </IndexCard>
        <IndexCard href="/dev/ci/deploy" num="02" title="デプロイ戦略とロールバック">
          ローリング・ブルーグリーン・カナリア、スキーマ変更の3段階、戻せる形で出す
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/sdlc/deployment" tag="開発工程">導入と受入れ</RelatedLink>
            <RelatedLink href="/ops/deploy" tag="サービス運営">デプロイ戦略</RelatedLink>
            <RelatedLink href="/dev/git" tag="実装">Gitとブランチ戦略</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
