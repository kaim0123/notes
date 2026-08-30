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
  title: "アルゴリズムとデータ構造",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>アルゴリズムとデータ構造 ― 効率よく処理する設計</h1>
        <Lead>
          同じ処理でも、データの置き方(データ構造)と手順(アルゴリズム)しだいで、速さは何百倍も変わります。ここでは代表的なデータ構造と、ソート・探索アルゴリズムの考え方、そして「計算量」で速さを比べる感覚を整理します。開発や設計の判断の土台になる部分です。
        </Lead>
      </Hero>

      <Heading num="01">データ構造の役割</Heading>
      <p>
        <Term>データ構造</Term>とは、データをどのような形でメモリ上に配置し、どうアクセスするかを決める設計です。次のような条件によって、適した構造は変わります。
      </p>
      <ul>
        <li>検索(参照)が多いのか</li>
        <li>途中への挿入・削除が多いのか</li>
        <li>先頭・末尾だけ操作できればよいのか</li>
      </ul>
      <p>「万能なデータ構造」はなく、やりたい操作に合わせて選ぶ ― これが出発点です。</p>

      <Heading num="02">基本的なデータ構造</Heading>

      <h3>配列(Array)</h3>
      <p>
        連続したメモリ領域に要素を並べる構造です。添字(インデックス)から任意の要素へ <Term>O(1)</Term>{" "}
        で直接アクセスできます。一方、途中に挿入・削除すると、それ以降の要素をまとめてずらす必要があり、コストが高くなります。
      </p>

      <h3>リスト(List)</h3>
      <p>
        各要素が「次の要素への参照(ポインタ)」を持つ構造です。途中での挿入・削除は前後の参照を付け替えるだけで済み <Term>O(1)</Term>。逆に、任意の位置へのアクセスは先頭からたどる必要があり <Term>O(n)</Term> になります。単方向・双方向・環状などのバリエーションがあります。
        </p>

      <h3>スタック(Stack)とキュー(Queue)</h3>
      <table>
        <tbody>
          <tr>
            <th>構造</th>
            <th>順序</th>
            <th>操作</th>
            <th>使われる場面</th>
          </tr>
          <tr>
            <td className="hl">スタック</td>
            <td>後入れ先出し(LIFO)</td>
            <td>一番上に push / pop</td>
            <td>関数呼び出し、再帰、式の評価</td>
          </tr>
          <tr>
            <td className="hl">キュー</td>
            <td>先入れ先出し(FIFO)</td>
            <td>末尾に追加 / 先頭から取り出し</td>
            <td>待ち行列、印刷ジョブ、タスク管理</td>
          </tr>
        </tbody>
      </table>
      <p>スタックが関数呼び出しの土台になっている様子は、「コンピュータ・OS」のメモリの話でも扱う予定です。</p>

      <h3>木構造(Tree)</h3>
      <p>
        階層構造を表すのに使う構造です。各ノードが最大2つの子を持つものを<Term>2分木</Term>、さらに「左の部分木 &lt; 自分 &lt; 右の部分木」という大小関係を保つものを<Term>2分探索木</Term>と呼びます。2分探索木では、探索が平均 <Term>O(log n)</Term> になります。
      </p>

      <Heading num="03">ソート(整列)アルゴリズム</Heading>
      <p>要素を大小順に並べ替えるアルゴリズムです。代表的なものと、平均計算量・特徴をまとめます。</p>
      <table>
        <tbody>
          <tr>
            <th>アルゴリズム</th>
            <th>平均計算量</th>
            <th>特徴</th>
          </tr>
          <tr>
            <td className="hl">バブルソート</td>
            <td>O(n²)</td>
            <td>隣り合う要素を入れ替え続ける。実装は簡単だが遅い</td>
          </tr>
          <tr>
            <td className="hl">選択ソート</td>
            <td>O(n²)</td>
            <td>未整列部分から最小値を選んで先頭と交換</td>
          </tr>
          <tr>
            <td className="hl">挿入ソート</td>
            <td>O(n²)</td>
            <td>挿入位置を探して要素をずらす。ほぼ整列済みなら速い</td>
          </tr>
          <tr>
            <td className="hl">マージソート</td>
            <td>O(n log n)</td>
            <td>分割してソートし、マージする。安定で大規模向き</td>
          </tr>
          <tr>
            <td className="hl">クイックソート</td>
            <td>O(n log n)</td>
            <td>ピボットで分割。平均は速いが最悪 O(n²)</td>
          </tr>
          <tr>
            <td className="hl">ヒープソート</td>
            <td>O(n log n)</td>
            <td>ヒープ構造を利用。追加メモリが少ない</td>
          </tr>
        </tbody>
      </table>
      <p>
        同じ値の要素の順序が保たれるかどうか(<Term>安定なソート</Term>か)も、実務でしばしば重要になります。
      </p>

      <Heading num="04">探索(検索)アルゴリズム</Heading>

      <h3>線形探索(逐次探索)</h3>
      <p>
        配列やリストの先頭から順に調べていく方法です。データが整列している必要はありませんが、平均計算量は <Term>O(n)</Term> です。
      </p>

      <h3>2分探索</h3>
      <p>
        <Term>整列済み</Term>の配列に対してのみ使える高速な探索です。探索範囲の中央の要素と比較し、目的の値が小さいか大きいかで範囲を毎回半分に絞ります。計算量は <Term>O(log n)</Term>。
      </p>

      <DiagramFrame
        slug="theory-algorithms-binary-search"
        aspect="700 / 270"
        caption="整列済み配列1,3,5,7,9,11,13から9を2分探索で見つける手順。まず全体の中央(index3=7)と比較して右半分に絞り、次に中央(index5=11)と比較して左側に絞り、最後にindex4の9を発見する。"
      />

      <h3>ハッシュ探索</h3>
      <p>
        キーから<Term>ハッシュ関数</Term>で計算した値を使って、目的の場所へほぼ一発でアクセスする方法です。別のキーが同じ場所を指す<Term>衝突</Term>への対処は必要ですが、平均的には非常に高速です。
      </p>

      <Analogy label="💡 たとえるなら">
        線形探索は「辞書を1ページ目からめくって単語を探す」やり方、2分探索は「真ん中を開いて前か後ろかを判断し、半分に絞る」やり方です。ハッシュ探索はさらに進んで、「その単語が載っているページ番号を計算で一発で出す」ようなものです。
      </Analogy>

      <Heading num="05">計算量の比較と選択</Heading>
      <p>
        アルゴリズムの速さは、データ量 n が増えたときに処理量がどう伸びるかを表す<Term>計算量(オーダー記法)</Term>で比べます。n を10, 100, 1000 と増やすと、差は劇的に開きます。
      </p>
      <table>
        <tbody>
          <tr>
            <th>オーダー</th>
            <th>n=10</th>
            <th>n=1000</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">O(log n)</td>
            <td>約3</td>
            <td>約10</td>
            <td>2分探索</td>
          </tr>
          <tr>
            <td className="hl">O(n)</td>
            <td>10</td>
            <td>1000</td>
            <td>線形探索</td>
          </tr>
          <tr>
            <td className="hl">O(n log n)</td>
            <td>約33</td>
            <td>約10000</td>
            <td>マージ・クイックソート</td>
          </tr>
          <tr>
            <td className="hl">O(n²)</td>
            <td>100</td>
            <td>1000000</td>
            <td>バブル・挿入ソート</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-algorithms-complexity"
        aspect="700 / 300"
        caption="データ量nが1から16に増えたときの処理量の伸びを対数目盛りで比較した折れ線グラフ。O(log n)はほぼ横ばいなのに対し、O(n)は緩やかに、O(n log n)はやや急に、O(n²)は最も急に増えていく。"
      />

      <p>選び方の目安は次の通りです。</p>
      <ul>
        <li>データ量が小さい・ほぼ整列済み → 挿入ソートなど単純なものでも十分</li>
        <li>データ量が大きい → O(n log n) クラス(マージ・クイック・ヒープ)を選ぶ</li>
        <li>探索の回数が多い → 2分探索やハッシュ探索を検討する</li>
      </ul>

      <Aside label="実務では">
        多くの言語の標準ライブラリのソートは、内部で O(n log n) の安定ソートを採用しています。自前で実装するより、まず標準の <code>sort</code> を使うのが基本。計算量の知識は「なぜそれで十分速いのか」「どこがボトルネックになりうるか」を判断するために効いてきます。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>操作に合わせて構造を選ぶ</h4>
          <p>参照が多いなら配列、途中の挿入削除が多いならリスト。木は順序付き探索に強い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>整列済みなら2分探索</h4>
          <p>O(n) の線形探索に対し、整列済みなら O(log n) で一気に絞れる。ハッシュはさらに速い。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>計算量で速さを比べる</h4>
          <p>O(n²) と O(n log n) の差は n が大きいほど致命的。オーダーで当たりをつける。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/algorithms" />
    </DocsPage>
  );
}
