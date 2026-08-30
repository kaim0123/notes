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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "デプロイ戦略とロールバック",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>デプロイ戦略とロールバック ― 切り替えの瞬間をどう設計するか</h1>
        <Lead>
          新しいコードを本番に出す瞬間は、旧版と新版が入れ替わる一点です。ここをどう設計するかで、無停止で出せるか・すぐ戻せるか・一部の利用者だけで試せるかが決まります。方式は4つ。そして、どの方式を選んでも避けて通れないのが<strong>データベースの変更</strong>です。
        </Lead>
      </Hero>

      <p>ホスティング先の選択やドメイン・TLSの設定は「<Link href="/ops/deploy">公開先とデプロイ経路</Link>」で、パイプラインの組み方は「<Link href="/dev/ci">CI/CDパイプライン</Link>」で扱っています。ここでは<strong>切り替え方式そのもの</strong>に集中します。</p>

      <Heading num="01">4つの切り替え方式</Heading>
      <table>
        <tbody>
          <tr><th>方式</th><th>やり方</th><th>停止時間</th><th>戻しやすさ</th></tr>
          <tr><td className="hl">再作成(recreate)</td><td>旧版を止めて新版を起動する</td><td><strong>あり</strong></td><td>再デプロイが必要</td></tr>
          <tr><td className="hl">ローリング</td><td>インスタンスを1台ずつ入れ替える</td><td>なし</td><td>戻すのも1台ずつで時間がかかる</td></tr>
          <tr><td className="hl">ブルーグリーン</td><td>新版の環境を丸ごと作り、経路を一斉に切り替える</td><td>なし</td><td><strong>経路を戻すだけ。数秒</strong></td></tr>
          <tr><td className="hl">カナリア</td><td>まず数%の利用者だけ新版へ流し、様子を見て広げる</td><td>なし</td><td>影響範囲が小さいまま戻せる</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        ローリングは「営業しながら店内の椅子を1脚ずつ新品に交換する」、ブルーグリーンは「隣に新店舗を作っておいて、看板と入口を一斉に切り替える」、カナリアは「新メニューをまず10人のお客さんにだけ出して反応を見る」やり方です。
      </Analogy>
      <Diagram caption="ブルーグリーンは経路の切り替え。旧環境を残しておけば、戻すのも切り替えるだけ">
        <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={65} width={90} height={36} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={55} y={88} fill="#f2f2f2" fontSize="12" textAnchor="middle">利用者</text>
          <rect x={140} y={65} width={90} height={36} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={185} y={88} fill="#f2f2f2" fontSize="12" textAnchor="middle">ルーター</text>
          <rect x={280} y={15} width={120} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={340} y={39} fill="#9a9a9a" fontSize="12" textAnchor="middle">旧環境(Blue)</text>
          <rect x={280} y={110} width={120} height={40} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={340} y={134} fill="#f2f2f2" fontSize="12" textAnchor="middle">新環境(Green)</text>
          <line x1={100} y1={83} x2={140} y2={83} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={230} y1={75} x2={280} y2={40} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={230} y1={92} x2={280} y2={128} stroke="#39ff6a" strokeWidth="1.5" />
        </svg>
      </Diagram>

      <Heading num="02">どれを選ぶか</Heading>
      <p>方式は好みではなく、<strong>要件と持っている道具</strong>で決まります。</p>
      <table>
        <tbody>
          <tr><th>条件</th><th>適した方式</th></tr>
          <tr><td className="hl">社内ツール、深夜に止めてよい</td><td>再作成。単純で確実、コストも最小</td></tr>
          <tr><td className="hl">常時稼働だが、二重の環境費用は避けたい</td><td>ローリング(コンテナ基盤の既定)</td></tr>
          <tr><td className="hl">数秒で戻せることが最重要</td><td>ブルーグリーン</td></tr>
          <tr><td className="hl">性能や指標の変化を見ながら出したい</td><td>カナリア(監視が整っていることが前提)</td></tr>
        </tbody>
      </table>
      <p>カナリアは最も安全に見えますが、<strong>指標を自動で比較して判断する仕組みが無ければ意味がありません</strong>。「5%に流して30分眺める」だけでは、異常が数字として見えず気付けません。<Link href="/infra/monitoring/app">エラー率とレイテンシの監視</Link>が先です。</p>

      <Heading num="03">切り替えの前提 ― 新旧が同時に動いてよいこと</Heading>
      <p>ローリング・ブルーグリーン・カナリアはいずれも、切り替えの最中に<strong>旧版と新版が同時に動きます</strong>。したがってアプリは次を満たしている必要があります。</p>
      <Steps>
        <li>どのインスタンスが応答しても結果が同じ(状態をインスタンスに持たない)</li>
        <li>セッションはDBや外部ストアに置く ― メモリに持つと切り替えでログアウトする</li>
        <li>新版が書いたデータを旧版が読んでも壊れない(スキーマの後方互換)</li>
        <li>処理中のリクエストを最後まで終わらせてから終了する(<Link href="/dev/backend/ops/lifecycle">グレースフルシャットダウン</Link>)</li>
      </Steps>
      <p>4番目を怠ると、デプロイのたびに一定数のリクエストが失敗します。「デプロイ中はエラー率が上がるもの」と諦めている場合、たいていは終了処理の実装漏れです。</p>

      <Heading num="04">最難関はデータベース ― 拡張・移行・縮小</Heading>
      <p>アプリは切り替えられますが、<strong>データベースは1つしかなく、瞬時に戻せません</strong>。そこで、スキーマ変更は<Term>expand and contract(拡張と縮小)</Term>という3段階で進めます。</p>
      <table>
        <tbody>
          <tr><th>段階</th><th>やること</th><th>この時点の状態</th></tr>
          <tr><td className="hl">1. 拡張</td><td>新しい列やテーブルを<strong>追加だけ</strong>する(NULL許容で)</td><td>旧版も新版も動く</td></tr>
          <tr><td className="hl">2. 移行</td><td>新旧両方に書くコードを出し、既存データを埋める</td><td>旧版も新版も動く</td></tr>
          <tr><td className="hl">3. 縮小</td><td>旧版が完全に消えた後で、古い列を削除する</td><td>新版のみ</td></tr>
        </tbody>
      </table>
      <p>1回のリリースで「列名を変更」してしまうと、切り替えの最中に旧版が存在しない列を参照して落ちます。<strong>名前の変更は「追加 → 両書き → 削除」の3リリースに分解する</strong>のが定石です(「<Link href="/dev/backend/data/migration">マイグレーション</Link>」)。</p>
      <Aside label="ロールバックできない変更">
        削除したデータは戻りません。<code>DROP COLUMN</code> や破壊的な変換を含むリリースは、<strong>アプリだけ戻しても復旧できない</strong>ことを意識してください。危険な操作は、他の変更と同じリリースに混ぜないのが鉄則です。
      </Aside>

      <Heading num="05">ロールバックを一級市民にする</Heading>
      <p>障害対応の最短経路は原因究明ではなく<strong>「まず戻す」</strong>です。そのためには、戻す操作が普段から練習されている必要があります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1コマンドで戻る</h4><p>前のバージョンを指定して再デプロイ、または経路を切り替えるだけ。手順書に書いてある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>成果物が残っている</h4><p>旧版のイメージ・ビルド成果物を破棄しない。再ビルドは時間がかかり、再現しないこともある。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DBが前進のみ</h4><p>スキーマは後方互換に保つ。戻す操作がDBを壊さない設計にしておく。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>定期的に試す</h4><p>使ったことのない手順は本番で失敗する。訓練としてロールバックを実行しておく。</p></Card>
      </CardGrid>
      <p>戻せない場合の代替が<strong>前進復旧(fix forward)</strong>です。修正を出すほうが速い場合もありますが、それは「小さく速いパイプラインがある」ことが前提です。どちらを選べるかは日頃の準備で決まります。</p>

      <Heading num="06">フィーチャーフラグ ― デプロイと公開を分ける</Heading>
      <p>デプロイ(コードを本番に置く)と公開(利用者に見せる)を分離できると、切り替えの怖さは大きく下がります。</p>
      <table>
        <tbody>
          <tr><th>できること</th><th>内容</th></tr>
          <tr><td className="hl">未完成のままマージ</td><td>フラグを無効にしたまま本番へ出す。ブランチを短命に保てる</td></tr>
          <tr><td className="hl">段階的な公開</td><td>社内 → 1% → 10% → 全体、と対象を広げる</td></tr>
          <tr><td className="hl">即時停止</td><td>問題が出たらデプロイなしでフラグを切る(<strong>キルスイッチ</strong>)</td></tr>
          <tr><td className="hl">A/Bテスト</td><td>2つの実装を同時に走らせ、指標で比較する</td></tr>
        </tbody>
      </table>
      <p>代償は<strong>フラグの寿命管理</strong>です。放置されたフラグは条件分岐として残り、組み合わせが指数的に増えます。「有効化したら削除する」までをチケットにするのが必須です(「<Link href="/dev/git">Gitとブランチ戦略</Link>」)。</p>

      <Heading num="07">デプロイの健全性を測る</Heading>
      <p>デプロイ運用の良し悪しは、感覚ではなく4つの指標(DORAメトリクス)で測れます。</p>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th><th>改善の方向</th></tr>
          <tr><td className="hl">デプロイ頻度</td><td>どれだけ小さく頻繁に出せているか</td><td>高いほどよい</td></tr>
          <tr><td className="hl">変更のリードタイム</td><td>コミットから本番稼働までの時間</td><td>短いほどよい</td></tr>
          <tr><td className="hl">変更失敗率</td><td>デプロイのうち障害を起こした割合</td><td>低いほどよい</td></tr>
          <tr><td className="hl">復旧時間(MTTR)</td><td>障害から回復するまでの時間</td><td>短いほどよい</td></tr>
        </tbody>
      </table>
      <p>頻度と安定性は<strong>トレードオフではありません</strong>。小さく頻繁に出すチームのほうが失敗率も復旧時間も良い、というのがこの指標の示すところです。障害対応そのものは「<Link href="/infra/monitoring/incident">インシデント対応の型</Link>」で扱います。</p>

      <Heading num="まとめ">戻せる形で出す</Heading>
      <p>デプロイ戦略の目的は「無停止で出すこと」よりも<strong>「間違えたときにすぐ戻せること」</strong>です。新旧同時稼働に耐える設計、後方互換なスキーマ変更、練習済みのロールバック ― この3つが揃っていれば、方式はローリングでもブルーグリーンでも安全に運用できます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/ci/actions" tag="実装">GitHub Actionsの実務</RelatedLink>
            <RelatedLink href="/dev/backend/data/migration" tag="バックエンド">マイグレーション</RelatedLink>
            <RelatedLink href="/infra/monitoring/incident" tag="インフラ">インシデント対応の型</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
