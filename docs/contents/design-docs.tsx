import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Steps,
  IndexGrid,
  IndexCard,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ドキュメンテーション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ドキュメンテーション ― コードに書けないことを書く</h1>
        <Lead>
          「コードがドキュメントだ」は半分正しく、半分間違いです。<strong>何をしているか</strong>はコードを読めば分かりますが、<strong>なぜそうしたのか・何を捨てたのか・どう使えばよいのか</strong>はコードのどこにも書かれていません。書く価値があるのはその部分だけです。
        </Lead>
      </Hero>

      <Heading num="01">なぜドキュメントは腐るのか</Heading>
      <p>多くの現場で、ドキュメントは「作られては放置される」を繰り返します。原因ははっきりしています。</p>
      <table>
        <tbody>
          <tr><th>原因</th><th>対策</th></tr>
          <tr><td className="hl">コードを見れば分かることを書いている</td><td><strong>書かない</strong>。二重管理が生まれ、必ずずれる</td></tr>
          <tr><td className="hl">コードと離れた場所にある</td><td>リポジトリに置き、コードと同じPRで更新する</td></tr>
          <tr><td className="hl">更新の責任者がいない</td><td>変更時の更新をレビュー観点に含める</td></tr>
          <tr><td className="hl">誰が読むのか決まっていない</td><td>読み手を1つに絞る。「全員向け」は誰にも刺さらない</td></tr>
          <tr><td className="hl">生成できるものを手書きしている</td><td>APIの一覧・型・変更履歴は<strong>自動生成</strong>にする</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        料理のレシピに「フライパンを持つ」「火をつける」まで書くと、手順書は長大になり、しかも実際の調理と食い違っていきます。書く価値があるのは<strong>「なぜ弱火なのか」「なぜこの順番なのか」</strong> ― 見ただけでは分からない判断のほうです。
      </Analogy>

      <Heading num="02">何を書き、何を書かないか</Heading>
      <table>
        <tbody>
          <tr><th>書く価値が高い</th><th>書かない(または生成する)</th></tr>
          <tr><td className="hl">なぜその設計にしたか、何を却下したか</td><td>クラス・関数の一覧</td></tr>
          <tr><td className="hl">前提と制約(法令・契約・性能要件)</td><td>コードを日本語に翻訳しただけの説明</td></tr>
          <tr><td className="hl">動かし方・詰まったときの対処</td><td>画面のスクリーンショットを並べた操作手順(すぐ古くなる)</td></tr>
          <tr><td className="hl">運用手順(復旧・切り戻し・定期作業)</td><td>APIの入出力型(定義から生成する)</td></tr>
          <tr><td className="hl">外部との境界の仕様</td><td>変更履歴(コミットから生成する)</td></tr>
          <tr><td className="hl">用語の定義(ドメイン用語集)</td><td>個人のメモ・一時的な調査記録</td></tr>
        </tbody>
      </table>
      <p>判断基準は単純です ― <strong>「コードから機械的に導けるか」</strong>。導けるなら生成し、導けない情報(意図・制約・経緯)だけを人間が書きます。</p>

      <Heading num="03">READMEに書くこと</Heading>
      <p>READMEの読み手は<strong>「明日このリポジトリを初めて触る人」</strong>です。その人が最短で動かせることを目標にします。</p>
      <Steps>
        <li><strong>これは何か</strong> ― 1〜2文。何を解決するシステムか</li>
        <li><strong>動かし方</strong> ― 必要な前提と、コピーして実行できるコマンド列</li>
        <li><strong>構成</strong> ― 主要なディレクトリと役割。全部ではなく地図として</li>
        <li><strong>開発の進め方</strong> ― テストの実行、ブランチ運用、レビューの流れ</li>
        <li><strong>デプロイと運用</strong> ― どこに、どうやって出るか。障害時の連絡先</li>
        <li><strong>詳しい資料への入口</strong> ― 設計・ADR・運用手順へのリンク</li>
      </Steps>
      <Aside label="動く手順であることを検証する">
        セットアップ手順は、書いた直後から劣化します。<strong>CIで実際に手順どおり動かす</strong>(コンテナで初期構築を実行する)ようにすれば、README は自動的に検証され続けます。「動かないREADME」は、無いより有害です。
      </Aside>

      <Heading num="04">コメントの方針</Heading>
      <p>命名規則は「<Link href="/design/conventions">コーディング規約・スタイル</Link>」で扱いました。コメントについての原則は1つです ― <strong>「何を」ではなく「なぜ」を書く</strong>。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 悪い ― コードを読めば分かる
// カウンタを1増やす
count += 1;

// 良い ― コードからは絶対に分からない
// 決済代行APIは 3req/s で 429 を返すため、意図的に間隔を空けている(問い合わせ #4821)
await sleep(350);`}</code>
      </pre>
      <table>
        <tbody>
          <tr><th>書く価値のあるコメント</th><th>消すべきコメント</th></tr>
          <tr><td className="hl">なぜこの実装を選んだか、他をなぜ避けたか</td><td>コードの逐語訳</td></tr>
          <tr><td className="hl">仕様・外部要因への参照(チケット番号、規格)</td><td>古くなった説明(<strong>嘘のコメントは無いより悪い</strong>)</td></tr>
          <tr><td className="hl">直感に反する処理の理由</td><td>コメントアウトされた古いコード(<Link href="/dev/git/basics">履歴に残る</Link>)</td></tr>
          <tr><td className="hl">既知の制限・暫定対応と、その解消条件</td><td>変更履歴(誰がいつ直したか。Gitが持っている)</td></tr>
        </tbody>
      </table>
      <p>コメントが必要だと感じたとき、まず<strong>名前を変える・関数に切り出す</strong>ことで解消できないかを考えます。それでも残る「なぜ」だけがコメントになります。</p>

      <Heading num="05">図をどう使うか</Heading>
      <p>文章より図が有効なのは、<strong>関係と流れ</strong>を伝える場面です。ただし維持コストがかかるため、対象を絞ります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>システム構成図</h4><p>どの要素がどこにあり、何と通信するか。新規参加者が最初に必要とする1枚。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>シーケンス図</h4><p>複数サービスをまたぐ処理の流れ。認証・決済など間違えやすい箇所に。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>状態遷移図</h4><p>注文・申請など、状態を持つものの遷移。実装漏れの発見にも効く。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ER図</h4><p>データ構造の全体像(「<Link href="/database/design">ER図と正規化</Link>」)。スキーマから生成できると理想的。</p></Card>
      </CardGrid>
      <p>図はできるだけ<strong>テキストで書ける形式</strong>(Mermaid など)にしてリポジトリに置きます。画像ファイルは差分が見えず、編集できる人が限られ、確実に腐ります。</p>

      <Heading num="06">ドキュメントもコードとして扱う</Heading>
      <table>
        <tbody>
          <tr><th>方針</th><th>効果</th></tr>
          <tr><td className="hl">リポジトリに置く</td><td>コードと同じPRで更新でき、レビューの対象になる</td></tr>
          <tr><td className="hl">プレーンテキストで書く</td><td>差分が読める。検索できる。誰でも編集できる</td></tr>
          <tr><td className="hl">生成できるものは生成する</td><td>API仕様・型・変更履歴・図。<strong>ずれが原理的に起きない</strong></td></tr>
          <tr><td className="hl">リンク切れを検査する</td><td>CIで検出する。壊れた導線は放置される</td></tr>
          <tr><td className="hl">古いものは消す</td><td>更新しないなら削除する。<strong>間違った情報は無情報より有害</strong></td></tr>
        </tbody>
      </table>

      <Heading num="07">読み手ごとに分ける</Heading>
      <table>
        <tbody>
          <tr><th>読み手</th><th>必要なもの</th><th>置き場所</th></tr>
          <tr><td className="hl">これから触る開発者</td><td>README、構成の地図、用語集</td><td>リポジトリ直下</td></tr>
          <tr><td className="hl">設計を変えようとする人</td><td><Link href="/design/docs/adr">ADR</Link>、制約、却下した案</td><td><code>docs/adr/</code></td></tr>
          <tr><td className="hl">APIの利用者</td><td>入出力仕様、エラー一覧、認証方法</td><td>生成されたAPIドキュメント</td></tr>
          <tr><td className="hl">障害対応する人</td><td>復旧手順、切り戻し、連絡先、既知の問題</td><td>ランブック(「<Link href="/infra/monitoring/incident">インシデント対応の型</Link>」)</td></tr>
          <tr><td className="hl">利用者・顧客</td><td>使い方、変更の告知</td><td>製品ドキュメント・リリースノート</td></tr>
        </tbody>
      </table>
      <p>混ぜると、どの読み手にとっても<strong>「自分に関係ない情報が9割」</strong>の文書になり、読まれなくなります。</p>

      <Heading num="まとめ">意図だけを、コードの隣に</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>「なぜ」だけを書く</h4><p>「何を」はコードにある。二重管理は必ずずれる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>コードと同じ場所・同じPRで</h4><p>離れた場所の文書は、更新されないまま残る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>生成できるものは生成する</h4><p>API仕様・型・履歴・図。人手を使うのは判断の記録だけ。</p></Card>
      </CardGrid>

      <IndexGrid>
        <IndexCard href="/design/docs/adr" num="01" title="ADR ― 設計判断の記録">
          なぜその技術を選んだのか。決定を1件1ファイルで残し、後から覆せるようにする
        </IndexCard>
      </IndexGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/design/docs/adr" tag="設計">ADR ― 設計判断の記録</RelatedLink>
            <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
            <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
