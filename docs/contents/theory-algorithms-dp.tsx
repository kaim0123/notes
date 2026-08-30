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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "動的計画法と貪欲法",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>動的計画法と貪欲法 ― 覚えるか、その場で決めるか</h1>
        <Lead>
          同じ小問題が何度も現れるなら、答えを覚えておけばよい ― これが<Term>動的計画法</Term>です。一方、その場で最も良さそうな選択をし続ける ― これが<Term>貪欲法</Term>です。どちらを使えるかは問題の性質で決まり、判断を誤ると「速いが間違った答え」を返すコードが出来上がります。
        </Lead>
      </Hero>

      <p>「<Link href="/theory/algorithms/recursion">再帰と分割統治</Link>」で見たメモ化を、体系的な設計手法として整理します。</p>

      <Heading num="01">動的計画法が使える条件</Heading>
      <p>次の2つを満たすとき、動的計画法(DP)が適用できます。</p>
      <table>
        <tbody>
          <tr><th>条件</th><th>意味</th></tr>
          <tr><td className="hl">最適部分構造</td><td>全体の最適解が、部分問題の最適解から組み立てられる</td></tr>
          <tr><td className="hl">部分問題の重複</td><td>同じ部分問題が何度も現れる(だから覚える価値がある)</td></tr>
        </tbody>
      </table>
      <p>マージソートのように部分問題が重複しない場合は、覚えても意味がありません(単なる分割統治)。逆にフィボナッチや経路数のように<strong>同じ計算が指数的に繰り返される</strong>問題では、覚えるだけで劇的に速くなります。</p>

      <Heading num="02">2つの実装方向 ― 上から / 下から</Heading>
      <table>
        <tbody>
          <tr><th></th><th>メモ化再帰(トップダウン)</th><th>表を埋める(ボトムアップ)</th></tr>
          <tr><td className="hl">書き方</td><td>再帰のまま、結果をキャッシュする</td><td>小さい順に表を埋めていくループ</td></tr>
          <tr><td className="hl">利点</td><td>元の再帰から機械的に書ける。必要な部分問題しか解かない</td><td>スタックを使わない。定数倍が速い</td></tr>
          <tr><td className="hl">欠点</td><td>深い再帰でスタックを消費する</td><td>不要な部分問題まで計算することがある</td></tr>
        </tbody>
      </table>
      <p>まずメモ化で正しさを確認し、必要なら表方式へ書き換える ― この順が安全です。</p>

      <Heading num="03">例1 ― 階段の上り方(数え上げ)</Heading>
      <p>「1段または2段ずつ上るとき、n段の上り方は何通りか」。n段目に来る直前は n−1段目か n−2段目なので、答えは2つの和になります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function countWays(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;                     // 0段の上り方は「何もしない」1通り
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];   // 直前の2つの結果だけを使う
  }
  return dp[n];
}`}</code>
      </pre>
      <p>DPの設計は、この<strong>漸化式(いまの答えを、より小さい答えで表す式)</strong>を見つける作業がすべてです。式さえ立てば、実装はループに落とすだけになります。</p>
      <Aside label="必要な分だけ持つ">
        この例では直前2つしか使わないため、配列ではなく変数2つで足ります。DPは<strong>空間を払って時間を買う</strong>手法ですが、参照範囲が狭ければメモリも節約できます。
      </Aside>

      <Heading num="04">例2 ― ナップサック問題(選択)</Heading>
      <p>容量Wのかばんに、重さと価値の異なる品物を詰めて価値を最大化する問題です。「i番目まで見て、容量wを使ったときの最大価値」を表にします。</p>
      <Steps>
        <li>状態を決める ― <code>dp[i][w]</code> =「i番目までの品物で、容量wのときの最大価値」</li>
        <li>選択肢を書く ― その品物を<strong>入れない</strong>か、<strong>入れる</strong>か</li>
        <li>漸化式にする ― <code>dp[i][w] = max(dp[i-1][w], dp[i-1][w - 重さ] + 価値)</code></li>
        <li>初期条件を決める ― 品物0個なら価値0</li>
        <li>表を埋め、<code>dp[n][W]</code> を読む</li>
      </Steps>
      <p>計算量は O(nW) です。品物の数だけでなく<strong>容量にも比例する</strong>点が特徴で、Wが極端に大きいと現実的でなくなります(このため厳密には多項式時間ではなく擬多項式時間と呼ばれます ― <Link href="/theory/algorithms/complexity">NP完全</Link>である理由もここにあります)。</p>

      <Heading num="05">例3 ― 編集距離(文字列の比較)</Heading>
      <p>2つの文字列を一致させるのに必要な、挿入・削除・置換の最小回数を求める問題です。実用性が高く、次のような場面で使われます。</p>
      <table>
        <tbody>
          <tr><th>用途</th><th>内容</th></tr>
          <tr><td className="hl">スペル訂正</td><td>「もしかして」の候補選び</td></tr>
          <tr><td className="hl">あいまい検索</td><td>表記ゆれを許容した名前照合</td></tr>
          <tr><td className="hl">差分表示</td><td><code>git diff</code> の行単位の対応付け(最長共通部分列)</td></tr>
          <tr><td className="hl">DNA配列の比較</td><td>バイオインフォマティクスの基本手法</td></tr>
        </tbody>
      </table>
      <p>いずれも「2つの列を先頭から突き合わせ、各位置での最小コストを表に記録する」という同じ骨格で解けます。<strong>DPは特定の問題の解法ではなく、表を設計する技術</strong>だと分かる例です。</p>

      <Heading num="06">貪欲法 ― その場の最善を選び続ける</Heading>
      <p><Term>貪欲法</Term>は、各段階で最も良さそうな選択を確定させ、後戻りしません。単純で高速ですが、<strong>常に正しいとは限りません</strong>。</p>
      <table>
        <tbody>
          <tr><th>問題</th><th>貪欲法</th></tr>
          <tr><td className="hl">硬貨で金額を作る(日本の硬貨)</td><td><strong>正しい</strong> ― 大きい硬貨から選べば最小枚数になる</td></tr>
          <tr><td className="hl">硬貨が1・3・4円の場合に6円</td><td><strong>誤る</strong> ― 4+1+1の3枚を選ぶが、正解は3+3の2枚</td></tr>
          <tr><td className="hl">区間スケジューリング</td><td>正しい ― 終了時刻の早い順に選ぶと最大数になる</td></tr>
          <tr><td className="hl">ナップサック(分割不可)</td><td>誤る ― 価値密度順に詰めても最適にならない</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        目の前の分かれ道で「下り坂のほう」を選び続ける登山です。谷底には早く着きますが、それが目的地とは限りません。全体を見渡してから決めるのがDP、その場で決めるのが貪欲法です。
      </Analogy>
      <p>貪欲法が正しいことを示すには証明が要ります。実務では「小さな反例を探す」ことから始め、見つからなければ<strong>DPで求めた答えと突き合わせて検証する</strong>のが現実的です。</p>

      <Heading num="07">使い分けと現実的な落としどころ</Heading>
      <table>
        <tbody>
          <tr><th>状況</th><th>選ぶ手法</th></tr>
          <tr><td className="hl">最適解が必要、状態数が現実的</td><td>動的計画法</td></tr>
          <tr><td className="hl">最適解が必要、状態数が爆発する</td><td>近似・ヒューリスティック(または問題を小さくする)</td></tr>
          <tr><td className="hl">十分良い解を素早く得たい</td><td>貪欲法。ただし品質の確認は必要</td></tr>
          <tr><td className="hl">選択に後戻りが必要</td><td>バックトラッキング(枝刈りとセット)</td></tr>
        </tbody>
      </table>
      <p>業務システムでDPそのものを書く場面は多くありませんが、<strong>考え方はあちこちで使われています</strong> ― 差分計算、料金の最適な組み合わせ、リソース割り当て、テキスト整形(改行位置の最適化)、経路探索など。「同じ計算を繰り返していないか」「その場の判断で最適になるか」という問いは、日常のコードにも効きます。</p>

      <Heading num="まとめ">表を設計する技術</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>状態を決める</h4><p>「何をどこまで見たときの答え」を1つの箱にする。ここが設計の核。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>漸化式を書く</h4><p>いまの答えを、より小さい答えの組み合わせで表す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>貪欲は反例を疑う</h4><p>速くて単純だが、正しさは自明ではない。必ず小さな反例を探す。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/theory/algorithms/recursion" tag="情報科学">再帰と分割統治</RelatedLink>
            <RelatedLink href="/theory/algorithms/graphs" tag="情報科学">グラフと最短経路</RelatedLink>
            <RelatedLink href="/theory/algorithms/complexity" tag="情報科学">計算量とP対NP</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
