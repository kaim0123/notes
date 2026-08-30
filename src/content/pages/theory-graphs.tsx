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
  title: "グラフと最短経路",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>グラフと最短経路 ― つながりを扱うデータ構造</h1>
        <Lead>
          路線図、SNSの友達関係、Webページのリンク、依存関係 ― 「モノどうしのつながり」は、すべて
          <Term>グラフ</Term>という同じ構造で表せます。「
          <Link href="/theory/algorithms">アルゴリズムとデータ構造</Link>
          」の応用として、グラフの表し方・たどり方・最短経路の求め方を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">グラフとは</Heading>
      <p>
        グラフは、<Term>頂点(ノード)</Term>と、それらを結ぶ<Term>辺(エッジ)</Term>
        からなる構造です。何を頂点・辺に対応させるかで、さまざまな問題を統一的に扱えます。
      </p>
      <table>
        <tbody>
          <tr>
            <th>種類</th>
            <th>意味</th>
            <th>例</th>
          </tr>
          <tr>
            <td className="hl">無向グラフ</td>
            <td>辺に向きがない(双方向)</td>
            <td>友達関係、路線のつながり</td>
          </tr>
          <tr>
            <td className="hl">有向グラフ</td>
            <td>辺に向きがある(一方向)</td>
            <td>Webのリンク、タスクの依存関係</td>
          </tr>
          <tr>
            <td className="hl">重み付きグラフ</td>
            <td>辺にコスト(距離・時間)が付く</td>
            <td>都市間の距離、通信の遅延</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-graphs-weighted"
        aspect="820 / 300"
        caption="重み付き無向グラフの例。頂点A〜Dを結ぶ辺に距離(コスト)が付いている。AからDへ行くには A→B→D が合計5、A→C→D が合計6となり、辺の本数が同じでも重みの合計は異なる。"
      />

      <Heading num="02">グラフの表し方</Heading>
      <p>
        グラフをメモリ上でどう持つかには、主に2つの方法があります。頂点数を V、辺数を E
        とすると、それぞれ得意・不得意があります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>表現</th>
            <th>持ち方</th>
            <th>向いている場面</th>
          </tr>
          <tr>
            <td className="hl">隣接行列</td>
            <td>V×V の表で、頂点間に辺があるかを記録</td>
            <td>辺が密なグラフ。2頂点間の確認が O(1)</td>
          </tr>
          <tr>
            <td className="hl">隣接リスト</td>
            <td>各頂点ごとに、つながる頂点の一覧を持つ</td>
            <td>辺が疎なグラフ。メモリ効率がよい</td>
          </tr>
        </tbody>
      </table>
      <p>
        現実のグラフ(SNSやWebなど)は辺が疎なことが多く、<Term>隣接リスト</Term>
        が使われる場面が多くなります。
      </p>

      <Heading num="03">グラフの探索 ― DFS と BFS</Heading>
      <p>
        ある頂点から、たどれる頂点を体系的に訪れていく操作が<Term>グラフ探索</Term>
        です。訪れ方の順序で2つに分かれます。
      </p>

      <DiagramFrame
        slug="theory-graphs-dfs-bfs"
        aspect="820 / 340"
        caption="同じグラフを深さ優先探索と幅優先探索でたどったときの訪問順の違い。DFSはスタックを使って行けるところまで潜り、行き止まりで戻る。BFSはキューを使って始点から近い頂点を波紋状にすべて訪れてから次の段へ進むため、辺の本数が最小の経路が求まる。"
      />

      <table>
        <tbody>
          <tr>
            <th>探索</th>
            <th>進み方</th>
            <th>使う構造</th>
            <th>向いている問題</th>
          </tr>
          <tr>
            <td className="hl">深さ優先探索(DFS)</td>
            <td>行けるところまで進んで、行き止まりで戻る</td>
            <td>スタック(再帰)</td>
            <td>経路の全探索、閉路の検出</td>
          </tr>
          <tr>
            <td className="hl">幅優先探索(BFS)</td>
            <td>近い頂点から順に、波紋状に広げる</td>
            <td>キュー</td>
            <td>辺の数が最小の最短経路</td>
          </tr>
        </tbody>
      </table>
      <p>
        ここで<Term>スタックとキュー</Term>
        が効いてきます。DFSは「後に見つけた道を先にたどる」のでスタック(LIFO)、BFSは「先に見つけた頂点から順に処理する」のでキュー(FIFO)と、自然に対応します。
      </p>

      <Analogy label="💡 たとえるなら">
        DFSは「迷路で片方の壁に手をつき、行けるところまで進む」探し方。BFSは「入口から1歩の場所を全部見て、次に2歩の場所を全部見る」という広げ方です。最短の歩数を知りたいならBFS、とにかく出口までの道を1本見つけたいならDFSが向きます。
      </Analogy>

      <Heading num="04">最短経路 ― ダイクストラ法</Heading>
      <p>
        辺に<Term>重み(距離・時間)</Term>
        がある場合、「辺の本数」ではなく「重みの合計」が最小の経路を求めたくなります。カーナビの経路探索がまさにこれです。代表的なアルゴリズムが
        <Term>ダイクストラ法</Term>です。
      </p>
      <p>
        考え方はシンプルで、「スタートから確定した頂点のうち、最も近い頂点を1つずつ確定し、その頂点を経由することで隣の頂点への距離が縮まるなら更新する」を繰り返します。これを全頂点が確定するまで続けると、各頂点への最短距離が求まります。「次に確定する最も近い頂点」を取り出すために、
        <Link href="/theory/tree">優先度付きキュー(ヒープ)</Link>が使われます。
      </p>
      <Aside label="注意">
        ダイクストラ法は、辺の重みが負の場合には正しく動きません。負の重みを含む場合はベルマン・フォード法など別のアルゴリズムを使います。「距離は進むほど増える」という前提が崩れるためです。
      </Aside>

      <Heading num="05">動的計画法への入口</Heading>
      <p>
        最短経路の「隣接する頂点の最適解から、自分の最適解を組み立てる」という発想は、
        <Term>動的計画法(DP)</Term>
        という強力な手法につながります。DPは、「大きな問題を小さな部分問題に分け、その答えを記録して使い回す」ことで、素朴には指数時間かかる問題を現実的な時間で解きます。
      </p>
      <p>
        部分問題の答えを表に埋めていく感覚は、フィボナッチ数列の計算や、最長共通部分列、ナップサック問題など、幅広い場面で登場します。まずは「一度解いた部分問題は覚えておいて再利用する」という核だけ押さえておけば十分です(詳しくは「
        <Link href="/theory/dp">動的計画法と貪欲法</Link>」)。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>つながりはグラフで表す</h4>
          <p>
            頂点と辺。向きの有無・重みの有無で、路線図から依存関係まで統一的に扱えます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DFSはスタック、BFSはキュー</h4>
          <p>
            深さ優先は行き止まりまで、幅優先は近い順に。最小歩数を知りたいならBFS。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>重み付き最短はダイクストラ</h4>
          <p>近い頂点から確定して距離を更新。ただし負の重みには使えません。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/graphs" />
    </DocsPage>
  );
}
