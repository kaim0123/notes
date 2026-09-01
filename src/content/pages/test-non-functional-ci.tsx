import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "非機能テストの組み込み" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>非機能テストの組み込み ― 別立てにせず、今ある仕組みに乗せる</h1>
        <Lead>
          <Link href="/test/performance">性能</Link>と<Link href="/test/security">セキュリティ</Link>は個別に見てきました。残るのはアクセシビリティと見た目です。この2つは<strong>専用の仕組みを新たに立てる必要がなく、すでにある<Link href="/test/e2e">E2E</Link>の中に検査を差し込むだけで回り始めます</strong>。だからこそ、定着させる鍵は導入の手間ではなく<Term>どこに差し込み、どの頻度で回すか</Term>という配置の判断になります。
        </Lead>
      </Hero>

      <Heading num="01">初期表示だけを検査していないか</Heading>
      <p>
        アクセシビリティの自動検査は、画面を1枚読み込んでスキャンするだけなら簡単に導入できます。問題は<strong>その1枚が、たいてい初期表示だけ</strong>だということです。
      </p>

      <DiagramFrame
        slug="test-non-functional-ci-states"
        aspect="640 / 310"
        caption="画面の状態が変わるたびに検査を差し込む位置。初期表示、モーダルを開いた状態、入力エラーを表示した状態、通知を表示した状態と変化していくが、検査が入っているのはたいてい初期表示のときだけ。動的に足された要素にラベルが無い、開いたのに焦点が移っていない、閉じたあと元に戻らない、通知が支援技術に伝わらないといった不足は、変化したあとの状態でしか現れない。いずれも機能としては正しく動いているため、機能テストの観点表には現れない。"
      />

      <p>
        差し込む場所は、<Link href="/test/e2e-viewpoints">観点表</Link>で「いつ」の着眼点を当てたときに出てくる状態と一致します。<strong>機能の観点を出す作業が、そのまま非機能の検査位置を教えてくれる</strong>ということです。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>検出できるもの</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自動検査ツール</td><td>コントラスト不足、役割指定の誤り、名前のない部品</td><td>既存のE2Eの中に、状態ごとにスキャンを1行足す</td></tr>
          <tr><td className="hl">キーボード操作の自動確認</td><td>移動順の破綻、焦点の迷子、閉じたあとの戻り先</td><td>同上。キー操作を送り、焦点の位置を確かめる</td></tr>
          <tr><td className="hl">支援技術での手動確認</td><td>名前や状態の変化が実際に読み上げられるか</td><td>自動化せず、リリース前のチェックリストへ</td></tr>
        </tbody>
      </table>

      <Aside label="自動検査で見つかるのは一部だけ">
        自動化できる範囲は、アクセシビリティの問題全体の一部にすぎません。<strong>「検査が0件だから使える」ではなく「機械的に分かる範囲の不足は無い」</strong>という意味です。読み上げでの確認を最下層の頻度に必ず残しておくのは、この差を埋めるためです。
      </Aside>

      <Heading num="02">見た目の比較は、運用が9割</Heading>
      <p>
        <Term>ビジュアル回帰テスト</Term>は、基準となる画像と現在の描画結果を比較して差分を検出します。導入は簡単ですが、<strong>放っておくと必ず「常に差分が出る」状態になります</strong>。
      </p>

      <DiagramFrame
        slug="test-non-functional-ci-baseline"
        aspect="640 / 320"
        caption="見た目の比較が不安定になる3つの原因と対処。環境の違いは、手元とCIでフォントの描画が異なるため壊れていないのに差分が出るもので、基準画像の生成と更新を必ずCIと同じ環境で行うことで解決する。毎回変わる要素は、日時や広告が入っていると差分が出続けるもので、変わると分かっている領域を比較対象から外す。対象の広げすぎは、全画面を比較すると更新の手間と差分を見る負荷が跳ね上がるもので、崩れたときの影響が大きい画面に絞る。3つとも放置すれば同じ結末に至り、誰も差分を見なくなって本物の崩れがそのまま承認される。"
      />

      <p>
        3つの原因は、<Link href="/test/flaky">フレーキーテスト</Link>とまったく同じ構造をしています ― <strong>本物でない赤が混ざり続けると、赤そのものが信用を失う</strong>。ビジュアル回帰は<Link href="/test/patterns">Golden Master</Link>の一種なので、更新の承認をどう扱うかが運用の中心になります。
      </p>

      <Heading num="03">実行頻度で層を分ける</Heading>
      <p>
        <Link href="/test/non-functional">機能以外のテスト</Link>で見た3層の配分を、ここまでの手段に当てはめます。<strong>分ける基準は重要度ではなく所要時間</strong>です。
      </p>

      <table>
        <thead>
          <tr><th>頻度</th><th>置くもの</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">毎コミット</td><td>静的解析、依存の脆弱性、自動アクセシビリティ検査、サイズ予算</td><td>合計で数分以内</td></tr>
          <tr><td className="hl">毎日(夜間)</td><td>ビジュアル回帰、主要動線の軽い負荷</td><td>十数分〜数十分</td></tr>
          <tr><td className="hl">リリース前・定期</td><td>本格的な負荷試験、侵入テスト、読み上げでの手動確認</td><td>数時間、または人手</td></tr>
        </tbody>
      </table>

      <p>
        最上段を軽く保てるかどうかが、下の2層まで含めて続けられるかを決めます。<strong>重い検査を最上段に置いた結果、パイプライン全体が敬遠されて全部が止まる</strong> ― これが最もよくある失敗です。
      </p>

      <Heading num="04">観点表に、非機能の行を足す</Heading>
      <p>
        非機能テストを別の表で管理すると、機能の観点表と二重管理になり、片方が更新されなくなります。<strong>同じ観点表に、実行頻度の列を足して共存させます</strong>。
      </p>

      <table>
        <thead>
          <tr><th>観点</th><th>種別</th><th>置き場所</th><th>頻度</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">発送前の注文をキャンセルできる</td><td>機能</td><td>E2E</td><td>毎コミット</td></tr>
          <tr><td className="hl">キャンセル確認の画面に検査違反がない</td><td>非機能</td><td>E2E内に検査を1行</td><td>毎コミット</td></tr>
          <tr><td className="hl">キャンセル確認をキーボードだけで完了できる</td><td>非機能</td><td>E2E内でキー操作</td><td>毎コミット</td></tr>
          <tr><td className="hl">注文詳細の見た目が崩れていない</td><td>非機能</td><td>ビジュアル回帰</td><td>毎日</td></tr>
          <tr><td className="hl">読み上げで状態変化が伝わる</td><td>非機能</td><td>手動チェックリスト</td><td>リリース前</td></tr>
        </tbody>
      </table>

      <p>
        この形にすると、<Term>機能を1つ足したときに非機能の行も一緒に足される</Term>ようになります。別の表に分けた瞬間、新機能の非機能観点は誰も書かなくなります ― <Link href="/test/e2e-viewpoints">観点の洗い出し</Link>で扱った属人化の防止と、同じ理屈です。
      </p>

      <Heading num="05">閾値は、あとから厳しくできる形で入れる</Heading>
      <p>
        既存のプロジェクトに非機能テストを入れると、初回は<strong>必ず大量に違反が出ます</strong>。ここで全部を直すまで導入しない判断をすると、たいてい永久に入りません。
      </p>

      <table>
        <thead>
          <tr><th>段階</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1. 現状を記録する</td><td>いまの違反件数・数値をそのまま基準にする。ビルドは落とさない</td></tr>
          <tr><td className="hl">2. 悪化だけを止める</td><td>基準より悪くなったらビルドを落とす。増やさないことだけを守る</td></tr>
          <tr><td className="hl">3. 基準を下げていく</td><td>直したぶんだけ基準値を更新し、後戻りできなくする</td></tr>
        </tbody>
      </table>

      <p>
        2段階目に入った時点で、<strong>非機能は「いつか対応するもの」から「これ以上悪くならないもの」に変わります</strong>。ここが最も効果の大きい一歩で、しかも既存の違反を1件も直さずに到達できます。
      </p>

      <Heading num="まとめ">新しい仕組みより、置き場所の判断</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>変化したあとの状態を検査する</h4>
          <p>初期表示だけの検査は、機能としては正しい不足を全部見逃す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>見た目の比較は運用が9割</h4>
          <p>環境・変動要素・対象範囲。放置すれば差分は誰にも見られなくなる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>同じ観点表に共存させる</h4>
          <p>別表にした瞬間、新機能の非機能観点は誰も書かなくなる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>まず悪化だけを止める</h4>
          <p>既存の違反を1件も直さずに、後戻りを防ぐところまでは行ける。</p>
        </Card>
      </CardGrid>

      <p>
        機械に確かめさせる話はここまでです。最後に、機械が届かない範囲へ ― <Link href="/test/code-review">コードレビュー</Link>へ進みます。
      </p>

      <DocsFooter href="/test/non-functional-ci" />
    </DocsPage>
  );
}
