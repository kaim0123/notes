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
  title: "再帰と分割統治",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>再帰と分割統治 ― 自分と同じ形の小問題に落とす</h1>
        <Lead>
          再帰は「関数が自分を呼ぶ」というトリックではなく、
          <strong>問題の構造をそのままコードにする書き方</strong>
          です。木構造をたどる、ディレクトリを走査する、大きな配列を半分ずつ処理する ―
          対象が自分と同じ形をしているなら、再帰で書くほうが素直で短くなります。
        </Lead>
      </Hero>

      <Heading num="01">再帰の2つの部品</Heading>
      <p>再帰関数は必ず次の2つで構成されます。どちらが欠けても正しく動きません。</p>
      <table>
        <tbody>
          <tr>
            <th>部品</th>
            <th>役割</th>
            <th>欠けると</th>
          </tr>
          <tr>
            <td className="hl">ベースケース(基底)</td>
            <td>これ以上分解しない最小の場合の答え</td>
            <td>
              <strong>無限再帰</strong> → スタックオーバーフロー
            </td>
          </tr>
          <tr>
            <td className="hl">再帰ケース</td>
            <td>
              問題を<strong>より小さい同じ問題</strong>に置き換える
            </td>
            <td>そもそも進まない</td>
          </tr>
        </tbody>
      </table>
      <pre>
        <code>{`function sumTree(node) {
  if (node === null) return 0;                       // ベースケース
  return node.value                                   // 再帰ケース
    + sumTree(node.left)
    + sumTree(node.right);
}`}</code>
      </pre>
      <p>
        書くときのコツは、<strong>「小さい問題の答えはすでに手に入る」と信じること</strong>です。
        <code>sumTree(node.left)</code>{" "}
        の中身を追いかけようとすると混乱します。「左部分木の合計は正しく返ってくる」と仮定して、自分の階層ですべきことだけを書きます。
      </p>
      <Analogy label="💡 たとえるなら">
        書類の山を数えるとき、「上の1枚を数え、残りの山は部下に任せる」と決めるのが再帰です。部下も同じルールで動くので、最後は「0枚なら0」という基底に行き着きます。部下の作業を全部追跡する必要はありません。
      </Analogy>

      <Heading num="02">再帰はスタックの上で動いている</Heading>
      <p>
        呼び出しのたびに、戻り先アドレスとローカル変数が<Term>コールスタック</Term>
        に積まれます。深く再帰するほどスタックを消費し、限界を超えるとスタックオーバーフローで停止します。
      </p>

      <DiagramFrame
        slug="theory-recursion-callstack"
        aspect="820 / 320"
        caption="階乗を求める再帰 fact(4) のコールスタック。呼び出すたびにフレームが上へ積まれ、ベースケース fact(1) に達すると、そこから戻り値が下の階層へ順に返って積み上がったフレームがほどけていく。深く再帰するほどスタックの消費が増える。"
      />

      <table>
        <tbody>
          <tr>
            <th>対象</th>
            <th>深さの目安</th>
            <th>再帰の可否</th>
          </tr>
          <tr>
            <td className="hl">二分探索木(平衡)</td>
            <td>要素100万で約20</td>
            <td>安全</td>
          </tr>
          <tr>
            <td className="hl">ディレクトリ階層</td>
            <td>数十</td>
            <td>安全</td>
          </tr>
          <tr>
            <td className="hl">連結リストを1要素ずつ</td>
            <td>要素数と同じ</td>
            <td>
              <strong>危険</strong>。ループで書く
            </td>
          </tr>
          <tr>
            <td className="hl">ユーザー入力由来の深いJSON</td>
            <td>制限なし</td>
            <td>
              <strong>危険</strong>。深さ上限を設ける
            </td>
          </tr>
        </tbody>
      </table>
      <Aside label="末尾再帰と最適化">
        再帰呼び出しが関数の<strong>最後の操作</strong>である形を<Term>末尾再帰</Term>
        と呼び、原理的にはループに変換できます(末尾呼び出し最適化)。ただしJavaScriptの主要エンジンはこれを実装していないため、
        <strong>深い再帰はJSでは安全になりません</strong>
        。深さが読めない処理は、明示的なスタック(配列)を使ったループに書き換えます。
      </Aside>

      <Heading num="03">分割統治 ― 分けて、解いて、合わせる</Heading>
      <p>
        <Term>分割統治法</Term>は再帰の代表的な使い方で、3段階で構成されます。
      </p>
      <ol>
        <li>
          <strong>分割</strong> ― 問題を同じ形の小問題に分ける
        </li>
        <li>
          <strong>統治</strong> ― 小問題を再帰的に解く(十分小さければ直接解く)
        </li>
        <li>
          <strong>統合</strong> ― 小問題の答えを合わせて全体の答えにする
        </li>
      </ol>

      <DiagramFrame
        slug="theory-recursion-divide-merge"
        aspect="820 / 340"
        caption="マージソートの分割統治。配列[5,2,8,1]を要素1個になるまで半分に分け続け(下向き)、戻るときに2つの整列済み列を併合しながら上へたどると全体が整列する(上向き)。分割の深さがlog n段、各段の併合がn回の処理でO(n log n)になる。"
      />

      <table>
        <tbody>
          <tr>
            <th>アルゴリズム</th>
            <th>分割の仕方</th>
            <th>統合の仕方</th>
            <th>計算量</th>
          </tr>
          <tr>
            <td className="hl">2分探索</td>
            <td>中央で半分に絞る</td>
            <td>不要(片方だけ見る)</td>
            <td>O(log n)</td>
          </tr>
          <tr>
            <td className="hl">マージソート</td>
            <td>要素数で半分</td>
            <td>2つの整列済み列を併合</td>
            <td>O(n log n)</td>
          </tr>
          <tr>
            <td className="hl">クイックソート</td>
            <td>基準値で大小に分ける</td>
            <td>不要(その場で並ぶ)</td>
            <td>平均 O(n log n)</td>
          </tr>
        </tbody>
      </table>
      <p>
        「分割が均等か」が性能を決めます。クイックソートが最悪 O(n²)
        になるのは、基準値の選び方が悪く<strong>1対(n−1)の偏った分割</strong>
        が続く場合です。
      </p>

      <Heading num="04">なぜ半分にすると log になるのか</Heading>
      <p>
        n個を半分にし続けて1個になるまでの回数が
        log₂n です。100万件でも約20回、10億件でも約30回にしかなりません。
      </p>
      <table>
        <tbody>
          <tr>
            <th>要素数</th>
            <th>半分にする回数</th>
          </tr>
          <tr>
            <td className="hl">1,000</td>
            <td>約10</td>
          </tr>
          <tr>
            <td className="hl">1,000,000</td>
            <td>約20</td>
          </tr>
          <tr>
            <td className="hl">1,000,000,000</td>
            <td>約30</td>
          </tr>
        </tbody>
      </table>
      <p>
        この「増えてもほとんど増えない」性質が、2分探索・
        <Link href="/theory/tree">平衡木</Link>・
        <Link href="/database/index">データベースのインデックス</Link>・
        <code>git bisect</code> など、あらゆる場所で使われる理由です。
      </p>

      <Heading num="05">同じ計算を繰り返さない ― メモ化</Heading>
      <p>
        再帰の落とし穴は、<strong>同じ小問題を何度も解いてしまう</strong>
        ことです。素朴なフィボナッチはその典型で、n=40程度で実用的な時間を超えます。
      </p>
      <pre>
        <code>{`// O(2ⁿ) ― fib(n-2) が何度も再計算される
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// O(n) ― 一度計算した答えを覚えておく(メモ化)
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}`}</code>
      </pre>
      <p>
        変えたのは「答えを表に持つ」ことだけですが、計算量は指数から線形になります。この発想を体系化したのが「
        <Link href="/theory/dp">動的計画法</Link>」です。
      </p>

      <Heading num="06">再帰で書くべきとき・ループで書くべきとき</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>再帰が向く</h4>
          <p>
            対象が階層構造(木・入れ子のJSON・ファイルシステム・構文解析)。深さが対数的に収まる。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ループが向く</h4>
          <p>単純な列の走査。深さが入力サイズに比例する。性能が最重要。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>明示スタックで書き換える</h4>
          <p>
            深い探索が必要だがスタックが不安なとき、配列をスタックとして使いループで回す。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>外部入力には上限を</h4>
          <p>深さを利用者が決められる場合、再帰の深さ制限を設けないとDoSになる。</p>
        </Card>
      </CardGrid>

      <Heading num="07">バックトラッキング ― 試して、戻る</Heading>
      <p>
        再帰のもう一つの典型が<Term>バックトラッキング</Term>
        です。候補を1つ選んで進み、行き詰まったら1手戻して別の候補を試します。
      </p>
      <table>
        <tbody>
          <tr>
            <th>用途</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">組み合わせの全列挙</td>
            <td>順列・部分集合の生成</td>
          </tr>
          <tr>
            <td className="hl">制約充足</td>
            <td>数独、Nクイーン、時間割</td>
          </tr>
          <tr>
            <td className="hl">経路探索</td>
            <td>
              迷路の全経路、<Link href="/theory/graphs">深さ優先探索</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">パターン照合</td>
            <td>正規表現エンジンの一部の実装</td>
          </tr>
        </tbody>
      </table>
      <p>
        探索空間は指数的に広がるため、<strong>枝刈り</strong>
        (明らかに解になり得ない枝を早く捨てる)が実用性を左右します。最後の行に関連して、正規表現の実装によっては特定の入力で爆発的に遅くなる問題(ReDoS)があり、外部入力を扱う際の注意点になっています。
      </p>

      <Heading num="まとめ">構造が再帰的なら、コードも再帰的に</Heading>
      <p>
        再帰は難しい技法ではなく、<strong>問題の形をそのまま写す</strong>
        手段です。ベースケースを決め、小問題の答えを信じ、統合の仕方を書く ―
        この3点に集約されます。同じ小問題が何度も現れるなら、答えを覚えて線形に落とす ―
        次の動的計画法へつながります。
      </p>

      <DocsFooter href="/theory/recursion" />
    </DocsPage>
  );
}
