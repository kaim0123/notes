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
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Gitとブランチ戦略",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>Gitとブランチ戦略 ― 統合の頻度がすべてを決める</h1>
        <Lead>
          <Link href="/dev/sdlc/management/config">構成管理</Link>で「変更を統制する」という考え方を見ました。ここでは、それを実現する道具であるGitの<strong>使い方の設計</strong>を扱います。コマンドの説明ではなく、<Term>ブランチ戦略</Term>という「チームで変更をどう合流させるか」の取り決めが主題です。この選択は、リリースの速度と<strong>コンフリクトの苦痛</strong>を直接左右します。
        </Lead>
      </Hero>

      <Heading num="01">コミットは「意味の単位」で切る</Heading>
      <p>まず基本から。コミットは<strong>作業の区切り</strong>ではなく<strong>変更の意味の単位</strong>です。「1日の終わりにまとめて」ではなく、「1つの意図が完結したところで」切ります。</p>
      <table>
        <thead>
          <tr><th>良いコミット</th><th>悪いコミット</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1つのことだけをしている</td><td>機能追加とリファクタリングと整形が混ざっている</td></tr>
          <tr><td className="hl">単体でビルド・テストが通る</td><td>そのコミットでは壊れている</td></tr>
          <tr><td className="hl"><strong>なぜ</strong>変えたかが書いてある</td><td>「修正」「wip」「いろいろ」</td></tr>
          <tr><td className="hl">後から取り消せる</td><td>取り消すと無関係な変更まで消える</td></tr>
        </tbody>
      </table>
      <p>メッセージは<strong>「何を」より「なぜ」</strong>です。何を変えたかは差分を見れば分かりますが、なぜ変えたかはコミットメッセージにしか残りません。<code>fix: 注文合計が税抜きで計算されていた</code>のように、1行目に要約、必要なら空行の後に背景を書きます。</p>
      <Aside label="Conventional Commits">
        <code>feat:</code> <code>fix:</code> <code>refactor:</code>のような接頭辞を付ける規約があります。人間にとって読みやすいだけでなく、<strong>変更履歴の自動生成やバージョン番号の自動決定</strong>に使えるのが利点です。チームで採用するなら、コミット時のフックで機械的に検査すると形骸化を防げます。
      </Aside>

      <Heading num="02">ブランチ戦略の3つの型</Heading>
      <table>
        <thead>
          <tr><th>戦略</th><th>構成</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>Git Flow</Term></td><td>main / develop / feature / release / hotfix と多層</td><td>複数バージョンを並行保守する製品、パッケージソフト</td></tr>
          <tr><td className="hl"><Term>GitHub Flow</Term></td><td>mainと短命なfeatureブランチのみ</td><td><strong>Webサービス。多くのチームの標準解</strong></td></tr>
          <tr><td className="hl"><Term>トランクベース開発</Term></td><td>ほぼmainに直接。ブランチは数時間〜1日</td><td>高頻度デプロイ。<strong>成熟したテストとフラグが前提</strong></td></tr>
        </tbody>
      </table>
      <p>Git Flowは長く標準とされましたが、<strong>継続的にデプロイするWebサービスには重すぎます</strong>。developとmainの二重管理、長命なreleaseブランチが、統合を遅らせる原因になります。「常に最新版が1つだけ動いている」サービスなら、GitHub Flowで十分です。</p>

      <Heading num="03">本質は統合の頻度 ― マージ地獄はなぜ起きるか</Heading>
      <p>ブランチ戦略の議論は形式的に見えますが、実は1点に集約されます。<strong>ブランチが長生きするほど、統合は指数的に苦しくなる。</strong></p>
      <table>
        <thead>
          <tr><th>ブランチの寿命</th><th>起きること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1日</td><td>ほぼ衝突しない。レビューも数分で終わる</td></tr>
          <tr><td className="hl">1週間</td><td>時々衝突する。解決は可能</td></tr>
          <tr><td className="hl">1か月</td><td><strong>大量の衝突</strong>。解決の過程で新しいバグが生まれる</td></tr>
          <tr><td className="hl">3か月</td><td>マージそのものが1つのプロジェクトになる。レビューは事実上不可能</td></tr>
        </tbody>
      </table>
      <p>だから戦略選びの本質は「<strong>どうすればブランチを短く保てるか</strong>」です。機能が大きくて1日で終わらない場合の答えは、ブランチを長く持つことではなく、<strong>未完成のまま安全にマージする</strong>ことです。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>フィーチャーフラグ</Term></td><td>コードはマージするが、<strong>設定で無効にしておく</strong>。完成したら有効化する</td></tr>
          <tr><td className="hl">縦に薄く切る</td><td>「画面だけ」「APIだけ」ではなく、<strong>小さくても動く機能</strong>を1本ずつ通す</td></tr>
          <tr><td className="hl">土台を先に入れる</td><td>リファクタリングや共通部品を、機能追加と別のPRで先に入れる</td></tr>
          <tr><td className="hl">こまめにmainを取り込む</td><td>ブランチ側から定期的にmainをマージし、差を小さく保つ</td></tr>
        </tbody>
      </table>
      <p>フィーチャーフラグは強力ですが、<strong>消す責任</strong>が伴います。放置されたフラグは条件分岐として永久に残り、組み合わせが指数的に増えて手が付けられなくなります。有効化したら削除する、をチケットとして管理します。</p>

      <Heading num="04">マージ・リベース・スカッシュ</Heading>
      <p>統合の方法は3つあり、<strong>残したい履歴の形</strong>で選びます。</p>
      <table>
        <thead>
          <tr><th>方法</th><th>結果</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">マージコミット</td><td>分岐と合流がそのまま残る</td><td>履歴を事実として保存したいとき</td></tr>
          <tr><td className="hl">スカッシュマージ</td><td><strong>PR全体が1コミットになる</strong></td><td><strong>最も一般的</strong>。mainが読みやすく、取り消しも簡単</td></tr>
          <tr><td className="hl">リベース</td><td>分岐が無かったかのように積み直す</td><td>直線的な履歴を保ちたいとき</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ 共有ブランチをリベースしない">
        リベースは<strong>コミットを作り直す</strong>操作です。他の人が取得済みのブランチに対して行うと、履歴が食い違って全員が混乱します。<strong>自分だけが触っているブランチ</strong>に限って使うのが鉄則です。強制プッシュ(<code>--force</code>)も同じで、共有ブランチでは<code>--force-with-lease</code>すら避けるべきです。
      </Aside>

      <Heading num="05">Pull Requestの実務</Heading>
      <p>PRはレビューの単位です。<strong>大きさが品質を決めます</strong> ― 400行を超えると、レビューの指摘率は急激に落ちることが知られています。人間は大きな差分を「なんとなく良さそう」としか読めません。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">差分の大きさ</td><td><strong>200〜400行以内</strong>。超えるなら分割を検討する</td></tr>
          <tr><td className="hl">説明に書くこと</td><td><strong>なぜ</strong>この変更が必要か、どう検証したか、レビューで見てほしい点</td></tr>
          <tr><td className="hl">自動チェック</td><td>整形・lint・型・テストは<Link href="/dev/ci">CI</Link>に任せる。人間は設計と意図を見る</td></tr>
          <tr><td className="hl">レビューの速度</td><td>放置されたPRは日々腐る。<strong>1営業日以内</strong>を目標にする</td></tr>
          <tr><td className="hl">ドラフト</td><td>方針の相談は、実装しきる前にドラフトPRで行う</td></tr>
        </tbody>
      </table>
      <p>レビューで何を見るかは<Link href="/test/code-review">コードレビュー</Link>で扱っています。ここで強調したいのは、<strong>レビューしやすいPRを作るのは書き手の責任</strong>だという点です。整形の変更と機能追加を混ぜない、コミットを意味の単位で切る ― これだけでレビューの質は大きく変わります。</p>

      <Heading num="06">タグとリリース</Heading>
      <table>
        <thead>
          <tr><th>要素</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">タグ</td><td>リリースした時点のコミットに印を付ける。<strong>何を本番に出したかを特定できる</strong></td></tr>
          <tr><td className="hl">セマンティックバージョニング</td><td><code>MAJOR.MINOR.PATCH</code>。<strong>破壊的変更でMAJOR</strong>を上げる。ライブラリでは必須</td></tr>
          <tr><td className="hl">日付ベース</td><td>継続的にデプロイするサービスでは<code>2026.08.08</code>のような形も自然</td></tr>
          <tr><td className="hl">変更履歴</td><td>コミットから自動生成する。人が手で書くと必ず途切れる</td></tr>
        </tbody>
      </table>
      <p>「本番で動いているのはどのコミットか」を即答できることは、障害対応の速度に直結します。ビルド成果物にコミットハッシュを埋め込み、<code>/version</code>のようなエンドポイントで確認できるようにしておくと確実です。</p>

      <Heading num="07">やってはいけないこと</Heading>
      <table>
        <thead>
          <tr><th>禁止</th><th>理由と対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><strong>秘密情報のコミット</strong></td><td>履歴に永久に残る。<strong>消しても取得済みの人の手元には残る</strong> ― 発覚したら鍵の無効化が最優先。<Link href="/dev/dotenv">.gitignore</Link>と秘密情報の検出フックで予防する</td></tr>
          <tr><td className="hl">公開済み履歴の書き換え</td><td>他の人の作業が壊れる。取り消したいなら<code>revert</code>で<strong>打ち消すコミットを積む</strong></td></tr>
          <tr><td className="hl">巨大バイナリのコミット</td><td>リポジトリが肥大化し、以後永久に重くなる。Git LFSかオブジェクトストレージへ</td></tr>
          <tr><td className="hl">生成物のコミット</td><td>ビルド結果や依存ライブラリ本体は入れない(ロックファイルは<strong>入れる</strong>)</td></tr>
          <tr><td className="hl">mainへの直接push</td><td>ブランチ保護を設定し、レビューとCI通過を必須にする</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ブランチは、本流から引いた分水路です。少し引いてすぐ戻せば何も起きませんが、長く引き回している間に本流の地形が変わってしまうと、戻すときに大工事になります。だから治水の要点は「立派な合流点を設計すること」ではなく、<strong>そもそも長い水路を引かないこと</strong>です。どうしても大きな工事が必要なら、水は流さずに水路だけ先に繋いでおく ― それがフィーチャーフラグの発想です。
      </Analogy>

      <Heading num="まとめ">短く切って、早く戻す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>統合の頻度が本質</h4><p>ブランチが長生きするほど苦痛は指数的に増える。戦略選びはその手段にすぎない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>未完成のままマージする</h4><p>フィーチャーフラグで無効化して入れる。ただし消す責任とセット。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>PRは400行まで</h4><p>大きな差分は読まれない。レビューしやすくするのは書き手の責任。</p></Card>
      </CardGrid>
      <p>次は、このPRごとに自動で検査を回し、本番まで届ける仕組みです。<Link href="/dev/ci">CI/CDパイプライン</Link>へ進みます。</p>

      <Heading num="発展">Gitをもう一段深く</Heading>
      <IndexGrid>
        <IndexCard href="/dev/git/basics" num="01" title="Gitの仕組み">
          スナップショット・3つの領域・ブランチの正体 ― 操作の裏側にあるデータ構造
        </IndexCard>
        <IndexCard href="/dev/git/conflict" num="02" title="マージ・リベースとコンフリクト解決">
          3-wayマージの原理、解決の手順、Gitが検知できない意味的な衝突
        </IndexCard>
        <IndexCard href="/dev/git/recovery" num="03" title="履歴のやり直しと復旧">
          amend・reset・revert・reflog・bisect ― 状況別の早見表
        </IndexCard>
        <IndexCard href="/dev/git/release" num="04" title="バージョニングとリリース">
          SemVerとタグ運用、変更履歴の自動生成、hotfixの流し方
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
            <RelatedLink href="/test/code-review" tag="テスト">コードレビュー</RelatedLink>
            <RelatedLink href="/dev/sdlc/process/agile" tag="開発工程">スクラムとアジャイル実践</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
