import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "デプロイ戦略とロールバック" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>デプロイ戦略とロールバック ― 戻せる形で出す</h1>
        <Lead>
          パイプラインの組み方は<Link href="/dev/git-ci">Git・CI/CD</Link>で扱いました。ここでは<Term>切り替え方式そのもの</Term>に集中します。どう切り替えるかは、そのまま<Term>どれだけ速く戻せるか</Term>を決めます。戻せないデプロイは、デプロイではなく賭けです。
        </Lead>
      </Hero>

      <Heading num="01">4つの切り替え方式</Heading>

      <table>
        <thead>
          <tr><th>方式</th><th>やり方</th><th>停止時間</th><th>戻しやすさ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">再作成</td>
            <td>旧版を止めて新版を起動する</td>
            <td>あり</td>
            <td>再デプロイが必要</td>
          </tr>
          <tr>
            <td className="hl">ローリング</td>
            <td>インスタンスを1台ずつ入れ替える</td>
            <td>なし</td>
            <td>戻すのも1台ずつで時間がかかる</td>
          </tr>
          <tr>
            <td className="hl">ブルーグリーン</td>
            <td>新版の環境を丸ごと作り、経路を一斉に切り替える</td>
            <td>なし</td>
            <td>経路を戻すだけ。数秒</td>
          </tr>
          <tr>
            <td className="hl">カナリア</td>
            <td>まず数%の利用者だけ新版へ流し、様子を見て広げる</td>
            <td>なし</td>
            <td>影響範囲が小さいまま戻せる</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">どれを選ぶか</Heading>
      <p>方式は好みではなく、<Term>要件と持っている道具</Term>で決まります。</p>

      <table>
        <thead>
          <tr><th>条件</th><th>適した方式</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">社内ツール、深夜に止めてよい</td>
            <td>再作成。単純で確実、コストも最小</td>
          </tr>
          <tr>
            <td className="hl">常時稼働だが、二重の環境費用は避けたい</td>
            <td>ローリング</td>
          </tr>
          <tr>
            <td className="hl">数秒で戻せることが最重要</td>
            <td>ブルーグリーン</td>
          </tr>
          <tr>
            <td className="hl">指標の変化を見ながら出したい</td>
            <td>カナリア(監視が整っていることが前提)</td>
          </tr>
        </tbody>
      </table>

      <p>
        カナリアは最も安全に見えますが、<Term>指標を比較して判断する仕組みが無ければ意味がありません</Term>。「5%に流して30分眺める」だけでは、異常が数字として見えず気付けません。エラー率と応答時間の監視が先です。
      </p>

      <Heading num="03">切り替えの前提 ― 新旧が同時に動いてよいこと</Heading>
      <p>
        再作成以外はいずれも、切り替えの最中に<Term>旧版と新版が同時に動きます</Term>。したがってアプリは次を満たしている必要があります。
      </p>

      <Steps>
        <li>どのインスタンスが応答しても結果が同じ(状態をインスタンスに持たない)</li>
        <li>セッションは外部に置く ― メモリに持つと切り替えでログアウトする</li>
        <li>新版が書いたデータを旧版が読んでも壊れない</li>
        <li>処理中のリクエストを最後まで終わらせてから終了する</li>
      </Steps>

      <p>
        4番目を怠ると、デプロイのたびに一定数のリクエストが失敗します。「デプロイ中はエラー率が上がるもの」と諦めている場合、たいていは終了処理の実装漏れです。
      </p>

      <Heading num="04">最難関はデータベース</Heading>
      <p>
        アプリは切り替えられますが、<Term>データベースは1つしかなく、瞬時に戻せません</Term>。そこでスキーマ変更は<Term>拡張と縮小</Term>の3段階で進めます。
      </p>

      <DiagramFrame
        slug="dev-ci-expand-contract"
        aspect="640 / 300"
        caption="列名の変更を3つのリリースに分解する手順。①拡張では新しい列を追加するだけで既存の列は残し、旧版も新版も動く状態を保つ。②移行では新旧両方に書くコードを出し、既存データを新しい列へ埋める。③縮小では旧版が完全に消えた後で古い列を削除する。切り替えの最中は旧版と新版が同じデータベースを同時に読み書きするため、両方から触られても壊れないことが前提になる。"
      />

      <table>
        <thead>
          <tr><th>段階</th><th>やること</th><th>この時点の状態</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1. 拡張</td>
            <td>新しい列やテーブルを追加だけする</td>
            <td>旧版も新版も動く</td>
          </tr>
          <tr>
            <td className="hl">2. 移行</td>
            <td>新旧両方に書くコードを出し、既存データを埋める</td>
            <td>旧版も新版も動く</td>
          </tr>
          <tr>
            <td className="hl">3. 縮小</td>
            <td>旧版が完全に消えた後で、古い列を削除する</td>
            <td>新版のみ</td>
          </tr>
        </tbody>
      </table>

      <p>
        1回のリリースで列名を変更してしまうと、切り替えの最中に旧版が存在しない列を参照して落ちます。<Term>名前の変更は3リリースに分解する</Term>のが定石です(<Link href="/database/physical">物理設計と運用</Link>)。
      </p>

      <Aside label="戻せない変更もある">
        列の削除、データの不可逆な変換、外部への通知の送信 ―
        これらは戻せません。だからこそ、削除は「旧版がもう存在しない」と確認できてから最後に行い、通知のような外部への作用は<Link href="/language/concurrency-patterns">冪等に</Link>設計しておきます。
      </Aside>

      <Heading num="05">ロールバックを一級市民にする</Heading>
      <p>
        障害対応の最短経路は原因究明ではなく<Term>まず戻す</Term>です。そのためには、戻す操作が普段から練習されている必要があります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>1コマンドで戻る</h4>
          <p>
            前のバージョンを指定して再デプロイ、または経路を切り替えるだけ。手順書に書いてあります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>成果物が残っている</h4>
          <p>
            旧版の成果物を破棄しません。再ビルドは時間がかかり、再現しないこともあります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DBが前進のみ</h4>
          <p>
            スキーマは後方互換に保ち、戻す操作がDBを壊さない設計にしておきます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>定期的に試す</h4>
          <p>
            使ったことのない手順は本番で失敗します。訓練として実行しておきます。
          </p>
        </Card>
      </CardGrid>

      <p>
        戻せない場合の代替が<Term>前進復旧</Term>です。修正を出すほうが速い場合もありますが、それは「小さく速いパイプラインがある」ことが前提です。どちらを選べるかは日頃の準備で決まります。
      </p>

      <Heading num="06">フィーチャーフラグ ― デプロイと公開を分ける</Heading>
      <p>
        デプロイ(コードを本番に置く)と公開(利用者に見せる)を分離できると、切り替えの怖さは大きく下がります。
      </p>

      <table>
        <thead>
          <tr><th>できること</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">未完成のままマージ</td>
            <td>
              無効にしたまま本番へ出す。<Link href="/dev/git-ci">ブランチを短命に保てる</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">段階的な公開</td>
            <td>社内 → 1% → 10% → 全体、と対象を広げる</td>
          </tr>
          <tr>
            <td className="hl">即時停止</td>
            <td>問題が出たらデプロイなしで切る(キルスイッチ)</td>
          </tr>
          <tr>
            <td className="hl">比較実験</td>
            <td>2つの実装を同時に走らせ、指標で比較する</td>
          </tr>
        </tbody>
      </table>

      <p>
        代償は<Term>フラグの寿命管理</Term>です。放置されたフラグは条件分岐として残り、組み合わせが指数的に増えます。「有効化したら削除する」までを課題として管理するのが必須です。
      </p>

      <Analogy label="💡 たとえるなら">
        ブルーグリーンは「隣に同じ舞台をもう1つ組み、幕が上がる瞬間に照明を切り替える」やり方です。何かあれば照明を戻すだけで元の舞台に戻れます。カナリアは「最初の数列のお客さんにだけ新しい演出を見せて、反応を確かめてから全席へ広げる」やり方です。
      </Analogy>

      <Heading num="07">デプロイの健全性を測る</Heading>
      <p>
        デプロイ運用の良し悪しは、感覚ではなく指標で測れます。<Term>デプロイ頻度</Term>(小さく頻繁に出せているか)、<Term>変更のリードタイム</Term>(書いてから本番までの時間)、<Term>変更失敗率</Term>(出した変更のうち障害になった割合)、<Term>復旧時間</Term>(壊れてから戻すまで)の4つです。
      </p>
      <p>
        重要なのは、この4つが<Term>トレードオフではない</Term>ことです。速く出せるチームほど失敗率も低く復旧も速い、という関係が知られています。小さく出すことが、そのまま安全につながります。
      </p>

      <Heading num="まとめ">戻し方から設計する</Heading>
      <p>
        切り替え方式の違いは、突き詰めれば<Term>戻すのに何秒かかるか</Term>の違いです。そしてどの方式でも、新旧が同時に動くこととDBの後方互換が前提になります。<Term>出す手順より先に、戻す手順を決める</Term> ―
        これがデプロイ設計の出発点です。
      </p>

      <DocsFooter href="/dev/ci-deploy" />
    </DocsPage>
  );
}
