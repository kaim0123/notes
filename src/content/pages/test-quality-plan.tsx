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
  Analogy,
  Aside,
  Steps,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "品質計画" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>品質計画 ― 壊れ方ごとに、担当を割り当てる</h1>
        <Lead>
          <Link href="/test/strategy">品質計画と戦略</Link>で決めたのは、どこにどれだけ積むかという配分でした。ここで作るのはその一段下 ― <Term>実際にどのチェックを何本並べるか</Term>の一覧です。コードを書き終えたあと、毎回人力で全画面をクリックして回るわけにはいきません。<strong>「壊れる」の中身を分解し、それぞれに担当を割り当てて、抜けを無くす</strong>のが品質計画です。
        </Lead>
      </Hero>

      <Heading num="01">壊れ方は1種類ではない</Heading>
      <p>
        「壊れる」と一口に言っても中身はさまざまです。型が合わない、ロジックが想定と違う値を返す、画面をまたぐ操作の途中でエラーになる、キーボードだけでは操作できない、見た目が意図せず崩れる、表示が遅くなる、リンクが切れる、使っているライブラリに脆弱性が見つかる、配信するJavaScriptが膨れ上がる。
      </p>
      <p>
        これらは<strong>すべて別の種類の「壊れる」</strong>であり、1つのテスト手法で全部をカバーすることはできません。品質計画とは、この壊れ方ごとに担当のチェック手段を割り当てる設計のことです。
      </p>

      <Analogy label="💡 たとえるなら">
        健康診断のフルコースです。血液検査(静的解析)、体力測定(ユニットテスト)、実際に歩いてもらう歩行検査(E2E)、視力・聴力検査(アクセシビリティ)、心電図の波形比較(ビジュアル回帰)、持久力テスト(性能計測)。1つの検査だけで「健康です」とは言い切れないのと同じです。
      </Analogy>

      <Heading num="02">9つの観点と、その担当</Heading>
      <p>
        並べるべきチェックは、大きく3つのまとまりに整理できます。<Term>コードの正しさ</Term>、<Term>体験の質</Term>、そして<Term>取り込んだものと配るもの</Term>です。
      </p>

      <DiagramFrame
        slug="test-quality-plan-coverage"
        aspect="700 / 340"
        caption="品質計画が並べる9つの観点を3つのまとまりに分けたもの。コードの正しさは静的解析・ユニットテスト・E2Eが、体験の質はアクセシビリティ検査・ビジュアル回帰・性能計測が、取り込んだものと配るものは依存の脆弱性検査・バンドルサイズ予算・リンクとsitemapの検査が担当する。9つはすべて別の壊れ方に対応しており、どれか1つで全部をカバーすることはできない。手で回せる数を超えているため、CIのパイプラインに載せて毎回自動で走らせて初めて計画として機能する。"
      />

      <table>
        <thead>
          <tr><th>観点</th><th>見つかる壊れ方</th><th>掘り下げ先</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">静的解析</td><td>型の不一致、危険なパターン、未使用のコード</td><td>一次防波堤。最も速く最も安い</td></tr>
          <tr><td className="hl">ユニットテスト</td><td>ロジックの回帰</td><td><Link href="/test/unit">Unitテスト</Link></td></tr>
          <tr><td className="hl">E2Eテスト</td><td>画面をまたぐ動線の断絶</td><td><Link href="/test/e2e">E2Eテストの全体像</Link></td></tr>
          <tr><td className="hl">アクセシビリティ検査</td><td>支援技術で操作できない、ラベルや代替テキストの欠落</td><td><Link href="/test/non-functional-ci">非機能テストの組み込み</Link></td></tr>
          <tr><td className="hl">ビジュアル回帰</td><td>離れた場所のレイアウト崩れ</td><td><Link href="/test/non-functional-ci">非機能テストの組み込み</Link></td></tr>
          <tr><td className="hl">性能計測</td><td>表示速度・応答の劣化</td><td><Link href="/test/performance">性能テストと負荷テスト</Link></td></tr>
          <tr><td className="hl">依存の脆弱性検査</td><td>自分が書いていないコードの欠陥</td><td><Link href="/test/security">セキュリティテスト</Link></td></tr>
          <tr><td className="hl">バンドルサイズ予算</td><td>配信するJavaScriptの肥大化</td><td><Link href="/frontend/perf">フロントエンドの性能</Link></td></tr>
          <tr><td className="hl">リンク・sitemap</td><td>リンク切れ、sitemapからの漏れ</td><td>巡回ツールをCIに置く</td></tr>
        </tbody>
      </table>

      <p>
        右の列が示すとおり、<strong>個々の中身はそれぞれの担当ページが持ちます</strong>。この一覧の役目は、深さではなく<Term>抜けが無いこと</Term>です。9行のうち1行でも担当が空欄なら、その壊れ方は誰も見ていないことになります。
      </p>

      <Aside label="静的解析を最初に置く理由">
        コストが最も低く、フィードバックが最も速いからです。型の不一致をユニットテストで検出することもできますが、それは<strong>実行してみないと分からない形にわざわざ落としている</strong>ことになります。机上で防げるものは机上で防ぎ、実行を伴うチェックの通過本数を減らします。
      </Aside>

      <Heading num="03">純粋関数として切り出す ― テストしやすさは設計で決まる</Heading>
      <p>
        9つの観点のうち、テストの書きやすさが設計に最も左右されるのがユニットテストです。鍵になるのは、<Term>純粋関数として切り出せる処理を意識的に分離する</Term>という判断です。切り出せるかどうかは2つの問いで決まります。
      </p>

      <Steps>
        <li><strong>同じ入力なら、常に同じ出力になるか</strong> ― 引数だけで結果が決まり、実行するたびに答えが変わらないか(現在時刻・乱数・外部APIの応答に依存していないか)</li>
        <li><strong>関数の外の世界に触れていないか</strong> ― DOMの書き換え、DBへの書き込み、ファイル操作、グローバル変数の読み書きをしていないか</li>
      </Steps>

      <DiagramFrame
        slug="test-quality-plan-pure"
        aspect="640 / 300"
        caption="純粋関数として切り出せるかの2つの判定条件と、切り出す前後の比較。切り出す前はロジックと副作用が同じ関数の中に混ざっているため、テストには周辺を丸ごと用意する必要がある。切り出した後はロジックが引数と戻り値だけの関数になり、呼んで結果を比べるだけで済む。副作用の側は消えないが、確かめる相手が減り、外側の段階に任せる範囲がはっきりする。テストしやすさは、テストの書き方ではなくこの分け方で決まる。"
      />

      <p>
        税込み価格の計算、入力値の検証、文字列の整形、配列の並べ替えや絞り込みは、この2条件を満たしやすい処理です。逆に「ボタンを押したらAPIを呼ぶ」「フォーム送信でDBに書き込む」は、副作用を起こすこと自体が目的なので純粋関数にはできません。<strong>無理に分離せず、外側の段階に任せます</strong>。判断の基礎は<Link href="/design/paradigm-functional-foundations">関数型の考え方</Link>にあります。
      </p>

      <Aside label="判断の合言葉">
        迷ったら「この関数を100回呼んだら100回とも同じ結果になるか、そして呼ぶ前後で何も変わらないか」を自問します。両方Yesなら純粋関数の候補、どちらかNoなら副作用ありのコードです。
      </Aside>

      <Heading num="04">数値の基準を持つ観点と、持たない観点</Heading>
      <p>
        9つのうち、性能・バンドルサイズ・アクセシビリティ・ビジュアル回帰の4つは、<strong>合否が閾値の設定に依存します</strong>。「速いこと」は基準になりません。代表的な指標には目安があります。
      </p>

      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">LCP</td><td>最も大きい要素が表示されるまでの時間</td><td>2.5秒以内</td></tr>
          <tr><td className="hl">INP</td><td>操作への応答速度</td><td>200ミリ秒以内</td></tr>
          <tr><td className="hl">CLS</td><td>表示中のレイアウトのズレの大きさ</td><td>0.1以内</td></tr>
        </tbody>
      </table>

      <p>
        バンドルサイズも同じ形で扱えます。「このファイルは何KB以内」という予算を先に決めておけば、便利なライブラリを1つ足した時点でCIが気づきます。閾値の決め方そのものは<Link href="/test/non-functional">機能以外のテスト</Link>で扱います。
      </p>

      <Heading num="05">CI/CDで束ねて、初めて計画になる</Heading>
      <p>
        ここまでの9つを、コードを変更するたびに手動で回すのは不可能です。<Link href="/dev/git-ci">CI/CD</Link>のパイプラインに組み込み、プッシュのたびに自動で一式が走る状態にして、初めて品質計画として機能します。
      </p>
      <p>
        ただし全部を毎回走らせると、今度はパイプラインが遅すぎて誰も待たなくなります。<strong>所要時間で層を分ける</strong>という配分の問題がここで発生します ― その解き方は<Link href="/test/non-functional">機能以外のテスト</Link>で見たとおりです。
      </p>

      <Heading num="まとめ">抜けを無くすための一覧</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>壊れ方を先に分解する</h4>
          <p>型・ロジック・動線・操作性・見た目・速度・依存・サイズ・リンク。全部が別の壊れ方。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>担当が空欄の行を作らない</h4>
          <p>この一覧の価値は深さではなく、抜けが無いこと。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>純粋関数を切り出す</h4>
          <p>テストしやすさは、テストの書き方ではなく処理の分け方で決まる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>自動で走って初めて計画</h4>
          <p>手で回せる数を超えている。CIに載せるところまでが設計に含まれる。</p>
        </Card>
      </CardGrid>

      <p>
        並べるチェックが決まったら、次はその1本ずつの中身をどう作るかです。<Link href="/test/design-techniques">テスト設計技法</Link>へ進みます。
      </p>

      <DocsFooter href="/test/quality-plan" />
    </DocsPage>
  );
}
