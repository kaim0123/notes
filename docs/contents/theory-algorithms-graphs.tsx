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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "グラフと最短経路",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>グラフと最短経路 ― つながりを扱うデータ構造</h1>
        <Lead>
          路線図、SNSの友達関係、Webページのリンク、依存関係 ― 「モノどうしのつながり」は、すべて<Term>グラフ</Term>という同じ構造で表せます。「<Link href="/theory/algorithms">アルゴリズムとデータ構造</Link>」の応用として、グラフの表し方・たどり方・最短経路の求め方を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">グラフとは</Heading>
      <p>グラフは、<Term>頂点(ノード)</Term>と、それらを結ぶ<Term>辺(エッジ)</Term>からなる構造です。何を頂点・辺に対応させるかで、さまざまな問題を統一的に扱えます。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>意味</th><th>例</th></tr>
          <tr><td className="hl">無向グラフ</td><td>辺に向きがない(双方向)</td><td>友達関係、路線のつながり</td></tr>
          <tr><td className="hl">有向グラフ</td><td>辺に向きがある(一方向)</td><td>Webのリンク、タスクの依存関係</td></tr>
          <tr><td className="hl">重み付きグラフ</td><td>辺にコスト(距離・時間)が付く</td><td>都市間の距離、通信の遅延</td></tr>
        </tbody>
      </table>

      <Diagram caption="重み付き無向グラフの例。頂点A〜Dを結ぶ辺に、距離(コスト)が付いている">
        <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
          <line x1={90} y1={70} x2={240} y2={40} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={90} y1={70} x2={130} y2={200} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={240} y1={40} x2={390} y2={130} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={130} y1={200} x2={390} y2={130} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={130} y1={200} x2={240} y2={40} stroke="#5f5f5f" strokeWidth="1.5" />

          <text x={158} y={45} fill="#9a9a9a" fontSize="13">2</text>
          <text x={95} y={140} fill="#9a9a9a" fontSize="13">5</text>
          <text x={320} y={78} fill="#9a9a9a" fontSize="13">3</text>
          <text x={265} y={180} fill="#9a9a9a" fontSize="13">1</text>
          <text x={195} y={130} fill="#9a9a9a" fontSize="13">4</text>

          <circle cx={90} cy={70} r={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={75} fill="#f2f2f2" fontSize="14" textAnchor="middle">A</text>
          <circle cx={240} cy={40} r={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={240} y={45} fill="#f2f2f2" fontSize="14" textAnchor="middle">B</text>
          <circle cx={130} cy={200} r={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={205} fill="#f2f2f2" fontSize="14" textAnchor="middle">C</text>
          <circle cx={390} cy={130} r={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={390} y={135} fill="#f2f2f2" fontSize="14" textAnchor="middle">D</text>
        </svg>
      </Diagram>

      <Heading num="02">グラフの表し方</Heading>
      <p>グラフをメモリ上でどう持つかには、主に2つの方法があります。頂点数を V、辺数を E とすると、それぞれ得意・不得意があります。</p>
      <table>
        <tbody>
          <tr><th>表現</th><th>持ち方</th><th>向いている場面</th></tr>
          <tr><td className="hl">隣接行列</td><td>V×V の表で、頂点間に辺があるかを記録</td><td>辺が密なグラフ。2頂点間の確認が O(1)</td></tr>
          <tr><td className="hl">隣接リスト</td><td>各頂点ごとに、つながる頂点の一覧を持つ</td><td>辺が疎なグラフ。メモリ効率がよい</td></tr>
        </tbody>
      </table>
      <p>現実のグラフ(SNSやWebなど)は辺が疎なことが多く、<Term>隣接リスト</Term>が使われる場面が多くなります。</p>

      <Heading num="03">グラフの探索 ― DFS と BFS</Heading>
      <p>ある頂点から、たどれる頂点を体系的に訪れていく操作が<Term>グラフ探索</Term>です。訪れ方の順序で2つに分かれます。</p>
      <table>
        <tbody>
          <tr><th>探索</th><th>進み方</th><th>使う構造</th><th>向いている問題</th></tr>
          <tr><td className="hl">深さ優先探索(DFS)</td><td>行けるところまで進んで、行き止まりで戻る</td><td>スタック(再帰)</td><td>経路の全探索、閉路の検出</td></tr>
          <tr><td className="hl">幅優先探索(BFS)</td><td>近い頂点から順に、波紋状に広げる</td><td>キュー</td><td>辺の数が最小の最短経路</td></tr>
        </tbody>
      </table>
      <p>ここで<Term>スタックとキュー</Term>が効いてきます。DFSは「後に見つけた道を先にたどる」のでスタック(LIFO)、BFSは「先に見つけた頂点から順に処理する」のでキュー(FIFO)と、自然に対応します。</p>

      <Analogy label="💡 たとえるなら">
        DFSは「迷路で片方の壁に手をつき、行けるところまで進む」探し方。BFSは「入口から1歩の場所を全部見て、次に2歩の場所を全部見る」という広げ方です。最短の歩数を知りたいならBFS、とにかく出口までの道を1本見つけたいならDFSが向きます。
      </Analogy>

      <Heading num="04">最短経路 ― ダイクストラ法</Heading>
      <p>辺に<Term>重み(距離・時間)</Term>がある場合、「辺の本数」ではなく「重みの合計」が最小の経路を求めたくなります。カーナビの経路探索がまさにこれです。代表的なアルゴリズムが<Term>ダイクストラ法</Term>です。</p>
      <p>考え方はシンプルで、「スタートから確定した頂点のうち、最も近い頂点を1つずつ確定し、その頂点を経由することで隣の頂点への距離が縮まるなら更新する」を繰り返します。これを全頂点が確定するまで続けると、各頂点への最短距離が求まります。</p>
      <Aside label="注意">
        ダイクストラ法は、辺の重みが負の場合には正しく動きません。負の重みを含む場合はベルマン・フォード法など別のアルゴリズムを使います。「距離は進むほど増える」という前提が崩れるためです。
      </Aside>

      <Heading num="05">動的計画法への入口</Heading>
      <p>最短経路の「隣接する頂点の最適解から、自分の最適解を組み立てる」という発想は、<Term>動的計画法(DP)</Term>という強力な手法につながります。DPは、「大きな問題を小さな部分問題に分け、その答えを記録して使い回す」ことで、素朴には指数時間かかる問題を現実的な時間で解きます。</p>
      <p>部分問題の答えを表に埋めていく感覚は、フィボナッチ数列の計算や、最長共通部分列、ナップサック問題など、幅広い場面で登場します。まずは「一度解いた部分問題は覚えておいて再利用する」という核だけ押さえておけば十分です。</p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>つながりはグラフで表す</h4>
          <p>頂点と辺。向きの有無・重みの有無で、路線図から依存関係まで統一的に扱えます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DFSはスタック、BFSはキュー</h4>
          <p>深さ優先は行き止まりまで、幅優先は近い順に。最小歩数を知りたいならBFS。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>重み付き最短はダイクストラ</h4>
          <p>近い頂点から確定して距離を更新。ただし負の重みには使えません。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/algorithms" tag="情報科学">アルゴリズムとデータ構造</RelatedLink>
                    <RelatedLink href="/network/ip" tag="ネットワーク">IPアドレスとルーティング</RelatedLink>
                    <RelatedLink href="/theory/formal" tag="情報科学">形式言語</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
