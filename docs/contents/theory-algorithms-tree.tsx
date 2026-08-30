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
  Aside,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "木構造とヒープ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>木構造とヒープ ― 階層で速さを稼ぐ</h1>
        <Lead>
          データを一列に並べると、探すのに全部見る必要があります。<strong>階層に組み替えると、一歩進むごとに候補が半分に減ります</strong>。ファイルシステム、DOM、JSON、データベースの索引、優先度付きキュー ―
          木はコンピュータの中で最も頻繁に現れる構造です。
        </Lead>
      </Hero>

      <Heading num="01">木の基本用語</Heading>
      <p><Term>木(tree)</Term>は、1つの根から枝分かれし、閉路を持たない構造です(閉路を許すと<Link href="/theory/algorithms/graphs">グラフ</Link>になります)。</p>
      <table>
        <tbody>
          <tr><th>用語</th><th>意味</th></tr>
          <tr><td className="hl">根(root)</td><td>いちばん上の節点。木に1つだけ</td></tr>
          <tr><td className="hl">節点(node)・枝(edge)</td><td>データを持つ点と、そのつながり</td></tr>
          <tr><td className="hl">葉(leaf)</td><td>子を持たない節点</td></tr>
          <tr><td className="hl">深さ・高さ</td><td>根からの距離 / 木全体の段数。<strong>性能はここで決まる</strong></td></tr>
          <tr><td className="hl">部分木</td><td>ある節点以下をひとまとめにしたもの。<Link href="/theory/algorithms/recursion">再帰</Link>の単位</td></tr>
        </tbody>
      </table>
      <p>身近な木としては、ファイルシステム、HTMLのDOM、JSONの入れ子、組織図、式の構文木(<Link href="/theory/formal">形式言語</Link>)などがあります。</p>

      <Heading num="02">二分探索木 ― 左は小さく、右は大きい</Heading>
      <p><Term>二分探索木(BST)</Term>は「左部分木のすべての値 &lt; 自分 &lt; 右部分木のすべての値」という規則を保つ木です。この規則があるため、探索は毎回<strong>片側を丸ごと捨てられます</strong>。</p>
      <Diagram caption="8を探す ― 根の10より小さいので左だけ見ればよい">
        <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
          <circle cx={200} cy={25} r={17} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={200} y={30} fill="#f2f2f2" fontSize="11" textAnchor="middle">10</text>
          <circle cx={120} cy={85} r={17} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={120} y={90} fill="#f2f2f2" fontSize="11" textAnchor="middle">5</text>
          <circle cx={280} cy={85} r={17} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={280} y={90} fill="#9a9a9a" fontSize="11" textAnchor="middle">15</text>
          <circle cx={70} cy={140} r={17} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={70} y={145} fill="#9a9a9a" fontSize="11" textAnchor="middle">3</text>
          <circle cx={170} cy={140} r={17} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={170} y={145} fill="#f2f2f2" fontSize="11" textAnchor="middle">8</text>
          <line x1={187} y1={37} x2={133} y2={73} stroke="#39ff6a" strokeWidth="1.5" />
          <line x1={213} y1={37} x2={267} y2={73} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={107} y1={97} x2={83} y2={128} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={133} y1={97} x2={157} y2={128} stroke="#39ff6a" strokeWidth="1.5" />
        </svg>
      </Diagram>
      <p>計算量は木の高さに比例します。バランスが取れていれば O(log n)。ただし<strong>整列済みのデータを順に挿入すると、木は一直線の連結リストになり O(n) に退化します</strong>。これがBSTの弱点です。</p>

      <Heading num="03">平衡木 ― 形が崩れないようにする</Heading>
      <p>退化を防ぐため、挿入・削除のたびに形を整える木が使われます。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>特徴</th><th>使われる場所</th></tr>
          <tr><td className="hl">AVL木</td><td>厳密にバランスを保つ。探索が速い</td><td>検索中心の用途</td></tr>
          <tr><td className="hl">赤黒木</td><td>やや緩く保つ。更新が速い</td><td>言語ランタイムの内部実装</td></tr>
          <tr><td className="hl">B木 / B+木</td><td><strong>1節点に多数の鍵</strong>を持ち、木を低く保つ</td><td><Link href="/database/index">データベース索引</Link>、ファイルシステム</td></tr>
        </tbody>
      </table>
      <Aside label="なぜDBはB+木なのか">
        ディスクやSSDは「1回の読み取りで数KBまとめて読む」性質があります。二分木では1段下がるたびに1回の読み取りが必要ですが、B+木は<strong>1節点に数百の鍵</strong>を詰めるため、数百万件でも<strong>3〜4回の読み取り</strong>で目的の行に到達できます。<Link href="/computer/memory/speed">記憶階層の速度差</Link>を前提にした設計です。
      </Aside>

      <Heading num="04">木のたどり方(走査)</Heading>
      <table>
        <tbody>
          <tr><th>順序</th><th>訪問の順番</th><th>用途</th></tr>
          <tr><td className="hl">先行順(pre-order)</td><td>自分 → 左 → 右</td><td>構造のコピー、ディレクトリの表示</td></tr>
          <tr><td className="hl">中間順(in-order)</td><td>左 → 自分 → 右</td><td><strong>BSTでは昇順に並ぶ</strong></td></tr>
          <tr><td className="hl">後行順(post-order)</td><td>左 → 右 → 自分</td><td>削除、集計(子の結果を使う計算)</td></tr>
          <tr><td className="hl">幅優先(level-order)</td><td>浅い段から順に</td><td>階層ごとの処理、最短の階層探索</td></tr>
        </tbody>
      </table>
      <p>前者3つは再帰で自然に書け、幅優先はキューを使ってループで書きます ― <Link href="/theory/algorithms/graphs">DFSとBFS</Link>の関係と同じ構図です。数式の評価で使う逆ポーランド記法は、構文木の後行順走査に対応します。</p>

      <Heading num="05">ヒープ ― 最大・最小だけを素早く取り出す</Heading>
      <p><Term>ヒープ</Term>は「親は子より必ず大きい(または小さい)」という条件だけを保つ木です。全体は整列していませんが、<strong>根が常に最大(最小)</strong>であることが保証されます。</p>
      <table>
        <tbody>
          <tr><th>操作</th><th>計算量</th></tr>
          <tr><td className="hl">最小値の参照</td><td><strong>O(1)</strong>(根を見るだけ)</td></tr>
          <tr><td className="hl">挿入</td><td>O(log n)(下に追加して上へ持ち上げる)</td></tr>
          <tr><td className="hl">最小値の取り出し</td><td>O(log n)(末尾を根に移し、下へ沈める)</td></tr>
          <tr><td className="hl">全体の整列</td><td>していない ― <strong>順に並べたいなら別の構造</strong></td></tr>
        </tbody>
      </table>
      <p>「全部並べる必要はなく、次に処理すべき1件だけ分かればよい」という状況にぴったり合います。実装上は木でありながら<strong>配列で表現できる</strong>のも利点で、i番目の子は 2i+1 と 2i+2 に置けます。</p>

      <Heading num="06">優先度付きキュー ― ヒープの実務での顔</Heading>
      <p>ヒープを使って「優先度の高いものから取り出す」構造が<Term>優先度付きキュー</Term>です。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ジョブの優先実行</h4><p>緊急のジョブを先に処理する。<Link href="/dev/backend/jobs">ジョブキュー</Link>の優先度機能。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ダイクストラ法</h4><p>最短経路探索で「次に確定する頂点」を選ぶのに使う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>タイマー管理</h4><p>「次に発火する予定」を根に置く。イベントループの実装でも使われる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>上位N件の抽出</h4><p>100万件から上位10件を取るとき、全部整列せずサイズ10のヒープで済む。</p></Card>
      </CardGrid>
      <p>4番目は実務で効きます。全体を整列すれば O(n log n) ですが、サイズNのヒープを保ちながら1回ずつ流し込めば O(n log N) で済み、メモリも N 件分で足ります。</p>

      <Heading num="07">その他の木 ― トライと構文木</Heading>
      <table>
        <tbody>
          <tr><th>種類</th><th>内容</th><th>用途</th></tr>
          <tr><td className="hl">トライ(接頭辞木)</td><td>文字を1つずつ枝にする。共通の接頭辞を共有</td><td>入力補完、辞書、IPルーティング表</td></tr>
          <tr><td className="hl">構文木(AST)</td><td>プログラムの構造を木で表現</td><td>コンパイラ、<Link href="/dev/tooling/build">トランスパイラ</Link>、Lint</td></tr>
          <tr><td className="hl">マークル木</td><td>子のハッシュを親が持つ</td><td>Gitのオブジェクト、改ざん検知、ブロックチェーン</td></tr>
          <tr><td className="hl">セグメント木</td><td>区間の集計値を保持</td><td>範囲の合計・最小値を高速に求める</td></tr>
        </tbody>
      </table>
      <p>マークル木の考え方は「<Link href="/dev/git/basics">Gitの仕組み</Link>」そのものです ― ファイルの中身のハッシュをtreeが持ち、treeのハッシュをcommitが持つため、1バイトの改変が根まで伝わります。</p>

      <Heading num="まとめ">高さが性能、規則が用途を決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>木の高さ=計算量</h4><p>バランスが崩れれば O(n) に退化する。だから平衡木がある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>順序が要るなら木</h4><p>ハッシュ表と違い、範囲検索・整列・近い値の取得ができる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>最大最小だけならヒープ</h4><p>全体を整列しない分だけ速く、メモリも節約できる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/theory/algorithms/hash" tag="情報科学">ハッシュ表</RelatedLink>
            <RelatedLink href="/theory/algorithms/graphs" tag="情報科学">グラフと最短経路</RelatedLink>
            <RelatedLink href="/database/index" tag="データベース">索引とアクセス制御</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
