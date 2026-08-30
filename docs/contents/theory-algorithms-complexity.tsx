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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "計算量とP対NP",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>計算量とP対NP ― 速さを「量」で語る</h1>
        <Lead>
          「このコードは遅い」を感覚で語ると議論が終わりません。計算量は、データが増えたときに処理量がどう伸びるかを<strong>データ量の関数</strong>として表し、実装や機種に依存せずに比較するための道具です。さらにその先には「そもそも現実的な時間で解ける問題なのか」という、より根本的な区別があります。
        </Lead>
      </Hero>

      <p>オーダー記法の基本と代表的なソート・探索の比較は「<Link href="/theory/algorithms">アルゴリズムとデータ構造</Link>」で扱いました。ここでは、その読み方をもう一段深めます。</p>

      <Heading num="01">オーダー記法が捨てているもの</Heading>
      <p><Term>O(n²)</Term> のような記法は、データ量 n が大きくなったときの<strong>増え方の形</strong>だけを表します。次の2つは意図的に無視されます。</p>
      <table>
        <tbody>
          <tr><th>捨てるもの</th><th>理由</th><th>例</th></tr>
          <tr><td className="hl">定数倍</td><td>機種や実装で変わり、増え方の形には影響しない</td><td><code>3n</code> も <code>100n</code> も O(n)</td></tr>
          <tr><td className="hl">低次の項</td><td>nが大きくなると最高次の項が支配する</td><td><code>n² + 5n + 9</code> は O(n²)</td></tr>
        </tbody>
      </table>
      <p>だからこそ<strong>「Oが小さいほうが常に速い」とは限りません</strong>。定数倍が100倍違えば、n が小さい範囲では O(n²) のほうが速いことは普通にあります。標準ライブラリのソートが、小さな部分配列では挿入ソートに切り替えるのはこの理由です。</p>
      <Aside label="3つの記法">
        <strong>O(上界)</strong>は「これより悪くならない」、<strong>Ω(下界)</strong>は「これより良くはならない」、<strong>Θ</strong>は上下から挟んで「まさにこの増え方」を表します。日常的にはOだけで話しますが、厳密には別物です。
      </Aside>

      <Heading num="02">最悪・平均・最良を区別する</Heading>
      <p>同じアルゴリズムでも、入力の性質で計算量は変わります。</p>
      <table>
        <tbody>
          <tr><th>アルゴリズム</th><th>最良</th><th>平均</th><th>最悪</th></tr>
          <tr><td className="hl">クイックソート</td><td>O(n log n)</td><td>O(n log n)</td><td><strong>O(n²)</strong>(偏った分割が続く)</td></tr>
          <tr><td className="hl">マージソート</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td></tr>
          <tr><td className="hl">ハッシュ表の検索</td><td>O(1)</td><td>O(1)</td><td><strong>O(n)</strong>(全部衝突する場合)</td></tr>
          <tr><td className="hl">線形探索</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr>
        </tbody>
      </table>
      <p>Webサービスでは<strong>最悪ケースが攻撃になりうる</strong>点が重要です。ハッシュの衝突を意図的に起こす入力を大量に送りつけて処理を O(n²) に落とす攻撃(ハッシュ衝突DoS)は実在します。「平均は速いから大丈夫」は、外部入力を扱う場面では通用しません。</p>

      <Heading num="03">償却計算量 ― たまに高いが、ならせば安い</Heading>
      <p>配列(可変長リスト)への追加は、通常 O(1) ですが、容量が尽きた瞬間だけ全要素をコピーするため O(n) かかります。それでも<strong>n回の操作全体でならすと1回あたり O(1)</strong> になります。これを<Term>償却計算量</Term>と呼びます。</p>
      <Analogy label="💡 たとえるなら">
        毎月の家賃は安いが、2年に1度だけ更新料がかかる契約のようなものです。更新月だけを見れば高額ですが、24か月でならせば月々の負担はわずかしか増えません。
      </Analogy>
      <p>ただし<strong>個々のリクエストの応答時間</strong>を問題にする場面では、この「たまに高い1回」が問題になります。平均で語ってよいバッチ処理と、最悪値で語るべきオンライン処理を混同しないようにします(応答時間の見方は「<Link href="/infra/monitoring/data">監視データと統計</Link>」)。</p>

      <Heading num="04">時間だけでなく空間も見る</Heading>
      <p>アルゴリズムの評価軸には<Term>空間計算量</Term>(必要なメモリ量)もあり、時間との間にトレードオフがあります。</p>
      <table>
        <tbody>
          <tr><th>手法</th><th>時間</th><th>空間</th></tr>
          <tr><td className="hl">毎回計算し直す</td><td>遅い</td><td>少ない</td></tr>
          <tr><td className="hl">結果を表に持つ(メモ化・キャッシュ)</td><td>速い</td><td><strong>多い</strong></td></tr>
          <tr><td className="hl">マージソート</td><td>O(n log n)</td><td>O(n) の作業領域が必要</td></tr>
          <tr><td className="hl">クイックソート</td><td>O(n log n)</td><td>O(log n)(その場で並べ替える)</td></tr>
        </tbody>
      </table>
      <p>「<Link href="/dev/cache">キャッシュ</Link>」や「<Link href="/theory/algorithms/dp">動的計画法</Link>」は、この<strong>空間を払って時間を買う</strong>という取引そのものです。</p>

      <Heading num="05">再帰の計算量を見積もる</Heading>
      <p>再帰アルゴリズムでは「1回の呼び出しで問題がどれだけ小さくなるか」「何回呼ぶか」で決まります。</p>
      <table>
        <tbody>
          <tr><th>形</th><th>計算量</th><th>例</th></tr>
          <tr><td className="hl">半分にして1回呼ぶ</td><td>O(log n)</td><td>2分探索</td></tr>
          <tr><td className="hl">半分にして2回呼び、各段でn回の統合</td><td>O(n log n)</td><td>マージソート</td></tr>
          <tr><td className="hl">1つ減らして1回呼ぶ</td><td>O(n)</td><td>単純な線形再帰</td></tr>
          <tr><td className="hl">1つ減らして2回呼ぶ</td><td><strong>O(2ⁿ)</strong></td><td>素朴なフィボナッチ</td></tr>
        </tbody>
      </table>
      <p>最後の行が、素朴な再帰が実用にならない理由です。同じ計算を何度も繰り返しているだけなので、<strong>結果を覚えておく</strong>だけで O(n) に落ちます ― これが「<Link href="/theory/algorithms/recursion">再帰と分割統治</Link>」および動的計画法の出発点です。</p>

      <Heading num="06">現実的に解ける問題・解けない問題</Heading>
      <p>個々のアルゴリズムではなく、<strong>問題そのもの</strong>の難しさを分類する枠組みがあります。</p>
      <CardGrid>
        <Card>
          <CardNumber>P</CardNumber>
          <h4>多項式時間で解ける</h4>
          <p>O(n)・O(n²)・O(n³) など、nのべき乗で収まる。「現実的に解ける」の目安。</p>
        </Card>
        <Card>
          <CardNumber>NP</CardNumber>
          <h4>答えの検証が速い</h4>
          <p>解を見つけるのは大変でも、<strong>与えられた解が正しいかの確認</strong>は多項式時間でできる。</p>
        </Card>
        <Card>
          <CardNumber>NP完</CardNumber>
          <h4>NP完全</h4>
          <p>NPの中で最も難しい一群。1つが多項式時間で解ければ、全部が解ける。</p>
        </Card>
        <Card>
          <CardNumber>?</CardNumber>
          <h4>P = NP か</h4>
          <p>未解決。多くの研究者は P ≠ NP(検証は速くても発見は速くできない)と予想している。</p>
        </Card>
      </CardGrid>
      <Analogy label="💡 たとえるなら">
        ジグソーパズルの完成には長時間かかりますが、完成品を見て「正しく組めているか」を判断するのは一瞬です。この<strong>作るのは大変・確かめるのは簡単</strong>という非対称性がNPの直感です。
      </Analogy>

      <Heading num="07">身近なNP完全問題</Heading>
      <table>
        <tbody>
          <tr><th>問題</th><th>実務での顔</th></tr>
          <tr><td className="hl">巡回セールスマン問題</td><td>配送ルートの最適化</td></tr>
          <tr><td className="hl">ナップサック問題</td><td>限られた予算・容量への割り当て</td></tr>
          <tr><td className="hl">スケジューリング</td><td>シフト表・会議室・タスク割り当て</td></tr>
          <tr><td className="hl">グラフ彩色</td><td>レジスタ割り当て、周波数割り当て</td></tr>
        </tbody>
      </table>
      <p>これらは<strong>厳密な最適解を大規模で求めることは諦める</strong>のが実務の常識です。代わりに使う手段は3つ ― <strong>近似アルゴリズム</strong>(最適の何倍以内かを保証する)、<strong>ヒューリスティック</strong>(良い解を素早く見つける)、<strong>問題を小さくする</strong>(対象を絞る・制約を緩める)。</p>
      <Aside label="暗号との関係">
        「解くのは難しいが、検証は簡単」という非対称性は、そのまま公開鍵暗号の土台でもあります(素因数分解の困難性)。詳しくは「<Link href="/security/crypto">暗号の歴史と公開鍵暗号</Link>」を参照してください。
      </Aside>

      <Heading num="08">実務でどう使うか</Heading>
      <p>計算量の知識が効くのは、コードを書く前の見積もりと、遅くなったときの原因特定です。</p>
      <table>
        <tbody>
          <tr><th>場面</th><th>判断</th></tr>
          <tr><td className="hl">ループの中でDBを引いている</td><td>O(n)回の往復。<Link href="/dev/backend/data/pool">N+1問題</Link>。まとめて1回にする</td></tr>
          <tr><td className="hl">配列に対して <code>includes</code> をループで呼ぶ</td><td>O(n²)。<Link href="/theory/algorithms/hash">Set / Map</Link> に変えて O(n) にする</td></tr>
          <tr><td className="hl">件数が10万件を超える</td><td>O(n²) は現実的でない。O(n log n) 以下に収める設計にする</td></tr>
          <tr><td className="hl">100件しか扱わない</td><td>計算量より<strong>読みやすさを優先</strong>してよい</td></tr>
        </tbody>
      </table>
      <p>最後の行も同じくらい重要です。データ量が小さいと分かっているなら、素朴で読みやすい実装が正解です。<strong>最適化は測ってから</strong>、が原則です。</p>

      <Heading num="まとめ">増え方を見る、そして限界を知る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>形だけを比べる</h4><p>定数倍は捨てる。だから小さなnでは逆転しうる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>最悪ケースを見る</h4><p>外部入力を扱う処理では、平均ではなく最悪が安全性に直結する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>解けない問題がある</h4><p>NP完全と分かったら、厳密解を諦め近似で行く判断が正解になる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/theory/algorithms" tag="情報科学">アルゴリズムとデータ構造</RelatedLink>
            <RelatedLink href="/theory/algorithms/recursion" tag="情報科学">再帰と分割統治</RelatedLink>
            <RelatedLink href="/theory/formal" tag="情報科学">形式言語</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
