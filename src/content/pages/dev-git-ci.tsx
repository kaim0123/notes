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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Git・CI/CD",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>Git・CI/CD ― 変更を合流させ、壊れていないことを確かめる</h1>
        <Lead>
          複数人で1つのコードベースを触るとき、決めるべきことは2つです。<Term>変更をどう合流させるか</Term>と、<Term>合流したものが壊れていないことをどう確かめるか</Term>。前者がブランチ戦略、後者がCI/CDで、この2つは独立した話題ではありません。頻繁に合流するには毎回自動で検査する仕組みが要り、検査が速いからこそ頻繁に合流できます。
        </Lead>
      </Hero>

      <Heading num="01">コミットは「意味の単位」で切る</Heading>
      <p>
        コミットは<Term>作業の区切り</Term>ではなく<Term>変更の意味の単位</Term>です。「1日の終わりにまとめて」ではなく、「1つの意図が完結したところで」切ります。
      </p>

      <table>
        <thead>
          <tr>
            <th>良いコミット</th>
            <th>避けたいコミット</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1つのことだけをしている</td>
            <td>機能追加とリファクタリングと整形が混ざっている</td>
          </tr>
          <tr>
            <td className="hl">単体でビルド・テストが通る</td>
            <td>そのコミットの時点では壊れている</td>
          </tr>
          <tr>
            <td className="hl">
              <Term>なぜ</Term>変えたかが書いてある
            </td>
            <td>「修正」「wip」「いろいろ」</td>
          </tr>
          <tr>
            <td className="hl">後から取り消せる</td>
            <td>取り消すと無関係な変更まで消える</td>
          </tr>
        </tbody>
      </table>

      <p>
        メッセージは<Term>「何を」より「なぜ」</Term>です。何を変えたかは差分を見れば分かりますが、なぜ変えたかはコミットメッセージにしか残りません。1行目に要約、必要なら空行の後に背景を書きます。
      </p>

      <Aside label="接頭辞を付ける規約">
        <code>feat:</code>・<code>fix:</code>・<code>refactor:</code>のような接頭辞を付ける規約があります。読みやすさだけでなく、<Term>変更履歴の自動生成やバージョン番号の自動決定</Term>に使えるのが利点です。採用するなら、コミット時のフックで機械的に検査すると形骸化を防げます。
      </Aside>

      <Heading num="02">ブランチ戦略の3つの型</Heading>

      <table>
        <thead>
          <tr>
            <th>戦略</th>
            <th>構成</th>
            <th>向いている場面</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Git Flow</td>
            <td>main / develop / feature / release / hotfix と多層</td>
            <td>複数バージョンを並行保守する製品、パッケージソフト</td>
          </tr>
          <tr>
            <td className="hl">GitHub Flow</td>
            <td>mainと短命なfeatureブランチのみ</td>
            <td>Webサービス。多くのチームの標準解</td>
          </tr>
          <tr>
            <td className="hl">トランクベース開発</td>
            <td>ほぼmainに直接。ブランチは数時間〜1日</td>
            <td>高頻度デプロイ。成熟したテストとフラグが前提</td>
          </tr>
        </tbody>
      </table>

      <p>
        Git Flowは長く標準とされましたが、<Term>継続的にデプロイするWebサービスには重すぎます</Term>。developとmainの二重管理、長命なreleaseブランチが、統合を遅らせる原因になります。「常に最新版が1つだけ動いている」サービスなら、GitHub Flowで十分です。
      </p>

      <Heading num="03">本質は統合の頻度</Heading>
      <p>
        ブランチ戦略の議論は形式的に見えますが、実は1点に集約されます ―
        <Term>ブランチが長生きするほど、統合は指数的に苦しくなる</Term>。
      </p>

      <DiagramFrame
        slug="dev-git-branch-lifetime"
        aspect="640 / 290"
        caption="ブランチの寿命と統合の苦しさ。上段の短命なブランチは、mainから短く枝分かれしてすぐ戻る。枝分かれしている間にmainが進む量が小さいため、衝突はほとんど起きない。下段の長命なブランチは、伸びている間にmainへ他の変更が何度も入るため、合流の時点で差が大きく、大量の衝突とその解決に伴う新しいバグを生む。"
      />

      <p>
        だから戦略選びの本質は「どうすればブランチを短く保てるか」です。機能が大きくて1日で終わらない場合の答えは、ブランチを長く持つことではなく、<Term>未完成のまま安全にマージする</Term>ことです。
      </p>

      <table>
        <thead>
          <tr>
            <th>手法</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">フィーチャーフラグ</td>
            <td>コードはマージするが、設定で無効にしておく。完成したら有効化する</td>
          </tr>
          <tr>
            <td className="hl">縦に薄く切る</td>
            <td>「画面だけ」「APIだけ」ではなく、小さくても動く機能を1本ずつ通す</td>
          </tr>
          <tr>
            <td className="hl">土台を先に入れる</td>
            <td>リファクタリングや共通部品を、機能追加と別のPRで先に入れる</td>
          </tr>
          <tr>
            <td className="hl">こまめにmainを取り込む</td>
            <td>ブランチ側から定期的にmainをマージし、差を小さく保つ</td>
          </tr>
        </tbody>
      </table>

      <p>
        フィーチャーフラグは強力ですが、<Term>消す責任</Term>が伴います。放置されたフラグは条件分岐として永久に残り、組み合わせが指数的に増えて手が付けられなくなります。有効化したら削除する、をチケットとして管理します。
      </p>

      <Analogy label="💡 たとえるなら">
        ブランチは、本流から引いた分水路です。少し引いてすぐ戻せば何も起きませんが、長く引き回している間に本流の地形が変わってしまうと、戻すときに大工事になります。だから治水の要点は「立派な合流点を設計すること」ではなく、<strong>そもそも長い水路を引かないこと</strong>です。
      </Analogy>

      <Heading num="04">マージ・リベース・スカッシュ</Heading>
      <p>統合の方法は3つあり、<Term>残したい履歴の形</Term>で選びます。</p>

      <table>
        <thead>
          <tr>
            <th>方法</th>
            <th>結果</th>
            <th>使いどころ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">マージコミット</td>
            <td>分岐と合流がそのまま残る</td>
            <td>履歴を事実として保存したいとき</td>
          </tr>
          <tr>
            <td className="hl">スカッシュマージ</td>
            <td>PR全体が1コミットになる</td>
            <td>最も一般的。mainが読みやすく、取り消しも簡単</td>
          </tr>
          <tr>
            <td className="hl">リベース</td>
            <td>分岐が無かったかのように積み直す</td>
            <td>直線的な履歴を保ちたいとき</td>
          </tr>
        </tbody>
      </table>

      <Aside label="共有ブランチをリベースしない">
        リベースは<Term>コミットを作り直す</Term>操作です。他の人が取得済みのブランチに対して行うと、履歴が食い違って全員が混乱します。自分だけが触っているブランチに限って使うのが鉄則で、強制プッシュも同様です。
      </Aside>

      <Heading num="05">Pull Requestの実務</Heading>
      <p>
        PRはレビューの単位で、<Term>大きさが品質を決めます</Term>。400行を超えると指摘率が急激に落ちることが知られており、人間は大きな差分を「なんとなく良さそう」としか読めません。
      </p>

      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>目安</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">差分の大きさ</td>
            <td>200〜400行以内。超えるなら分割を検討する</td>
          </tr>
          <tr>
            <td className="hl">説明に書くこと</td>
            <td>なぜこの変更が必要か、どう検証したか、見てほしい点</td>
          </tr>
          <tr>
            <td className="hl">自動チェック</td>
            <td>整形・lint・型・テストはCIに任せ、人間は設計と意図を見る</td>
          </tr>
          <tr>
            <td className="hl">レビューの速度</td>
            <td>放置されたPRは日々腐る。1営業日以内を目標にする</td>
          </tr>
          <tr>
            <td className="hl">ドラフト</td>
            <td>方針の相談は、実装しきる前にドラフトの段階で行う</td>
          </tr>
        </tbody>
      </table>

      <p>
        強調したいのは、<Term>レビューしやすいPRを作るのは書き手の責任</Term>だという点です。整形の変更と機能追加を混ぜない、コミットを意味の単位で切る ―
        これだけでレビューの質は大きく変わります。
      </p>

      <Heading num="06">CIとCDは別のこと</Heading>

      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">継続的インテグレーション(CI)</td>
            <td>変更を頻繁にmainへ統合し、そのたびに自動で検査する</td>
          </tr>
          <tr>
            <td className="hl">継続的デリバリー(CD)</td>
            <td>いつでもリリースできる状態を保つ。本番反映は人が判断する</td>
          </tr>
          <tr>
            <td className="hl">継続的デプロイメント(CD)</td>
            <td>検査を通れば自動で本番へ出す</td>
          </tr>
        </tbody>
      </table>

      <p>
        目的は自動化そのものではありません。<Term>問題を早く小さく発見する</Term>ことです。1か月分の変更をまとめて検査すれば、失敗の原因は無数の候補から探すことになります。1コミットごとに検査すれば、原因は常に「いま入れた変更」に限定されます。
      </p>

      <Heading num="07">パイプラインの段階と、成果物の昇格</Heading>
      <p>
        基本の並びは、<Term>速くて安いものを先に、遅くて高いものを後に</Term>です。早い段階で落ちれば、後続の時間を節約できます。
      </p>

      <DiagramFrame
        slug="dev-ci-pipeline"
        aspect="640 / 300"
        caption="CIパイプラインの段階と成果物の昇格。上段は検査の並びで、整形とlint(数秒)、型検査(十数秒)、Unitテスト(数十秒)、結合テスト(数分)、ビルド(数分)と、速くて安いものから並ぶ。全体で10分以内に収めないと結果が読まれなくなる。下段はビルドを1度だけ行い、同じ成果物を開発・検証・本番へタグを付け替えて進める形。環境ごとにビルドし直すと、検証したものと本番に出すものが別物になる。"
      />

      <pre>
        <code>{`name: CI
on:
  pull_request:
  push:
    branches: [main]

# 同じPRに新しい push が来たら、古い実行を打ち切る
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
          cache: npm      # 依存のダウンロードをキャッシュする
      - run: npm ci       # install ではなく ci(ロックファイルに厳密に従う)
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test`}</code>
      </pre>

      <p>
        デプロイの設計で最も重要な原則が、<Term>環境ごとにビルドし直さない</Term>ことです。同じ成果物にタグを付け替えて進め、環境ごとの違いは<Link href="/dev/tooling">実行時の設定</Link>で吸収します。「検証環境では動いたのに本番で動かない」の原因の多くは、この原則の違反です。
      </p>

      <Heading num="08">CIに置く鍵と、品質ゲート</Heading>
      <p>
        CIは<Term>依存ライブラリのインストールスクリプトをそのまま実行します</Term>。侵害されたパッケージが1つ混ざれば、CIの環境変数がそのまま盗まれます。
      </p>

      <table>
        <thead>
          <tr>
            <th>原則</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">長命な鍵を置かない</td>
            <td>身元を検証して短命な権限を発行する仕組みを使う</td>
          </tr>
          <tr>
            <td className="hl">権限を最小に</td>
            <td>既定の広い権限に頼らず、明示的に絞る</td>
          </tr>
          <tr>
            <td className="hl">アクションを固定する</td>
            <td>第三者の部品はコミットハッシュで固定する。タグは書き換えられる</td>
          </tr>
          <tr>
            <td className="hl">ログへの出力</td>
            <td>秘密情報は自動でマスクされるが、加工すると漏れる</td>
          </tr>
        </tbody>
      </table>

      <p>
        そして検査は、<Term>失敗したらマージできない</Term>ようにして初めて意味を持ちます。lint・型・テストを必須チェックに指定し、カバレッジは絶対値より「低下しないこと」を条件にします。<Term>警告を許容すると必ず形骸化します</Term>。
      </p>

      <Heading num="09">壊れたら止める</Heading>
      <p>最後は文化の話です。<Term>mainが壊れている状態を放置しない</Term>のがCIの前提です。</p>

      <table>
        <thead>
          <tr>
            <th>規律</th>
            <th>理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">mainが赤いなら最優先で直す</td>
            <td>他の全員が「自分の変更のせいか」を判断できなくなる</td>
          </tr>
          <tr>
            <td className="hl">不安定なテストは即座に対処</td>
            <td>「再実行すれば通る」を許すと、本物の失敗も無視されるようになる</td>
          </tr>
          <tr>
            <td className="hl">CIをスキップしない</td>
            <td>「今回だけ」が常態化する</td>
          </tr>
          <tr>
            <td className="hl">失敗の原因が分かる出力にする</td>
            <td>ログを読んでも分からない失敗は、無視される</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        CIは、工場の製造ラインに置く検査工程です。完成品をまとめて検査するより、各工程の直後に検査するほうが原因を特定しやすく、手戻りも小さくて済みます。そして最も重要なのは、<strong>検査で不合格が出たらラインを止める</strong>という規律です。赤いランプが点いたまま誰も気にしない工場は、ランプの無い工場と変わりません。
      </Analogy>

      <Heading num="まとめ">短く切って、早く戻す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>統合の頻度が本質</h4>
          <p>
            ブランチが長生きするほど苦痛は指数的に増えます。戦略選びはその手段です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>安い検査を先に</h4>
          <p>
            lint → 型 → Unit → 結合。10分以内を保たないと、結果が読まれなくなります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ビルドは1度だけ</h4>
          <p>
            同じ成果物を環境間で昇格させ、差異は実行時の設定で吸収します。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/git-ci" />
    </DocsPage>
  );
}
